# Architecture Decision Records (ADR) & Sécurité

Ce document formalise les décisions techniques, produit, data, IA, sécurité et CI du projet **JobMind**.

---

## ADR-01 : Choix Produit
- **Why** : Les candidats tech (étudiants, juniors, développeurs) perdent du temps à consulter plusieurs plateformes hétérogènes sans vision claire des salaires ou de la pertinence par rapport à leur profil.
- **How** : Centralisation multi-sources (WeLoveDevs + Indeed + Arbeitnow + Remotive) dans une interface split-view (`resources/js/Pages/Discover.jsx`) avec pagination (30 offres/page), filtrage multicritères, favoris (`Saved.jsx`) et analyse salariale (`SalaryInsights.jsx`).
- **Trade-off** : Priorisation de la recherche rapide et du split-view desktop/mobile plutôt que d'ajouter des fonctionnalités sociales ou de messagerie interne hors périmètre.

---

## ADR-02 : Choix du Tableau de Bord
- **Why** : L'utilisateur doit pouvoir explorer les offres tout en voyant immédiatement les tendances du marché et la pertinence de chaque annonce sans navigation superflue.
- **How** : `JobController::discover()` (`app/Http/Controllers/JobController.php`) injecte directement `marketSummary` (salaire moyen observé, part de CDI, part de télétravail issus de PostgreSQL) et `ai_match_score` sur chaque carte de `Discover.jsx`.
- **Trade-off** : Les graphiques détaillés par spécialité et la carte de France restent sur `/insights` (`SalaryInsights.jsx`) pour ne pas surcharger le flux principal.

---

## ADR-03 : Choix d'Architecture
- **Why** : Séparer proprement l'application web, le SGBD et le scraping navigateur (Playwright) dans une stack maintenable et conteneurisée.
- **How** : Architecture MVC Laravel + Inertia.js (React) pour le web/API REST, PostgreSQL pour le stockage relationnel, et microservice FastAPI (`scraper_api/main.py`) orchestré via `docker-compose.yml`. Logique métier isolée dans `app/Services/` (`JobQueryService`, `JobNormalizer`, `JobIngestor`, `AdminMetricsService`).
- **Alternative rejetée** : Exécuter Playwright directement en PHP/Node depuis les requêtes web Laravel — rejeté pour éviter les blocages de workers PHP et isoler les dépendances Chromium dans un conteneur dédié.
- **Trade-off** : Nécessite une communication HTTP interne (`SCRAPER_URL`) entre Laravel et FastAPI.

---

## ADR-04 : Choix Data (Collecte, Normalisation, Rate Limiting)
- **Why** : L'API WeLoveDevs impose `1 request/second/student` et les sources externes ont des formats hétérogènes.
- **How** :
  - `app/Console/Commands/FetchWeLoveDevsJobs.php` interroge `https://epi-api.welovedevs.com/v1` avec `X-API-Key`, applique `sleep(1)` entre les pages et gère le code `429`.
  - `FetchIndeedJobs.php` complète avec des offres locales Indeed via Playwright (justifié pour couvrir un volume plus large d'annonces françaises non présentes sur WeLoveDevs).
  - `FetchArbeitnowJobs.php` et `FetchRemotiveJobs.php` collectent des offres tech européennes et remote filtrées sur la France/Europe (exclusion des annonces uniquement germanophones).
  - `app/Services/JobNormalizer.php` mappe chaque source vers le modèle pivot (nettoyage HTML vers Markdown, extraction des salaires horaires/journaliers/mensuels/annuels depuis le texte si absents des métadonnées) ; `app/Services/CompanyLogoResolver.php` et `jobs:enrich-logos` résolvent automatiquement les logos d'entreprises ; `app/Services/JobIngestor.php` assure l'idempotence via `content_hash` (SHA-256) et `(source_internal_id, source_external_id)`.
- **Alternative rejetée** : Stockage brut JSON sans normalisation préalable — rejeté car il empêcherait le filtrage SQL rapide et les statistiques salariales fiables.
- **Trade-off** : Les URLs Indeed contenant un identifiant `jk` sont normalisées en `https://fr.indeed.com/viewjob?jk=<id>` (sinon hash SHA-256 si > 255 caractères) pour respecter la contrainte d'unicité `VARCHAR(255)` tout en gardant un lien cliquable.

---

## ADR-05 : Choix IA
- **Why** : Fournir un scoring de pertinence immédiat sur le tableau de bord et normaliser les descriptions scrapées souvent bruitées.
- **How** :
  - **Scoring de pertinence local** (`JobQueryService::attachRelevanceScores` dans `app/Services/JobQueryService.php`) : tokenisation et pondération TF sur le titre, la description, le profil utilisateur (`job_title`, `bio`) et la requête de recherche, retournant un score `0-98%` et les mots-clés correspondants sans latence réseau ni coût API.
  - **Enrichissement & traduction IA (`scraper_api/main.py` + `app/Services/JobAiEnricher.php`)** : extraction structurée des salaires/contrats, reformatage Markdown et traduction automatique en français des annonces anglophones via `POST /clean` (`nvidia/nemotron-3.5-lightning-30b-a3b` sans mode *thinking* pour <2s de latence), avec repli regex déterministe et commande de rattrapage `php artisan jobs:translate-enrich`.
- **Alternative rejetée** : Appeler un LLM externe à chaque recherche utilisateur — rejeté pour des raisons de latence, de coût et de dépendance réseau.
- **Trade-off** : Le scoring local lexical est très rapide et explicable, mais ne capture pas les synonymes sémantiques complexes sans dictionnaire.

---

## ADR-06 : Choix de Sécurité (`Why / How / What`)
- **Why** : Protéger les comptes utilisateurs, les routes d'administration, les clés API et prévenir les injections/XSS/brute-force.
- **How / What** :
  - **Secrets** : Clés API (`WELOVEDEVS_API_KEY`, `NVIDIA_API_KEY`) stockées exclusivement dans `.env` (git-ignoré), chargées via `config/services.php`. Vérification TLS active sur les requêtes HTTP (`FetchWeLoveDevsJobs.php`).
  - **CSRF & Sessions** : Protection CSRF active sur toutes les routes web stateful (`bootstrap/app.php`), authentification API stateless via Sanctum.
  - **Contrôle d'accès (RBAC)** : Rôles `user` et `admin` appliqués côté serveur via Spatie `role:admin` (`routes/web.php`) et `AdminAccessMiddleware` (`routes/api.php`), avec blocage de l'auto-suppression et de l'auto-révocation admin.
  - **Force brute** : `RateLimiter` (5 tentatives) sur le login web (`LoginRequest.php`) et middleware `throttle:5,1` sur `POST /api/login` (`routes/api.php`).
  - **Injections & XSS** : Requêtes Eloquent paramétrées ; suppression du HTML brut dans les logs d'audit admin (`AdminMetricsService.php` + échappement natif React dans `Admin/Jobs.jsx`).
- **Trade-off** : Le rate-limiting strict sur `/api/login` bloque temporairement après 5 échecs (mitigation standard).

---

## ADR-07 : Choix CI (`.github/workflows/ci.yml`)
- **Why** : Garantir qu'aucune régression de build, style ou logique métier ne soit mergée sur `main`.
- **How** : Pipeline GitHub Actions sur `push` / `pull_request` vers `main` ciblant **`runs-on: self-hosted`**, exécutant :
  1. Laravel Pint (`./vendor/bin/pint --test`)
  2. Tests automatisés Pest (`./vendor/bin/pest` — incluant `tests/Unit/JobNormalizerTest.php`, `tests/Feature/JobIngestorTest.php` et `tests/Feature/ApiRoutesTest.php`)
  3. Build frontend Vite (`npm run build`)
- **Trade-off** : Exige un runner `self-hosted` configuré avec PHP 8.3+, Composer et Node.js.
