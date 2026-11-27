# Produit, Gestion de Projet & Audit Accessibilité

## 1. Découverte Marché & Proposition de Valeur

### Problème & Constat
Les offres tech sont fragmentées entre jobboards généralistes (Indeed, LinkedIn) et plateformes spécialisées (WeLoveDevs), avec des formats incohérents (salaires en texte libre ou absents, localisations bruitées, doublons).

### Proposition de Valeur
**JobMind** unifie la recherche d'emploi tech en normalisant les offres multi-sources dans un format structuré, en affichant des indicateurs salariaux réels et en calculant un score de pertinence immédiat par rapport au profil candidat.

### Wireframes des vues clés
- **Découverte (`/`)** : Barre de recherche unifiée (Quoi + Où) + filtres (Contrat, Salaire min, Télétravail, Tri) -> Grille d'offres paginée (30 offres/page, flèches et numéros de page) avec badge `ai_match_score`, descriptions traduites en français et structurées en Markdown + Volet latéral droit Split-View (`JobDetailPanel`) + Widget "Aperçu du marché".
- **Insights (`/insights`)** : KPIs temps réel, répartition télétravail, salaires moyens par spécialité, carte géographique de France (`FranceMap.jsx`).
- **Administration (`/panel/dashboard`, `/panel/jobs`, `/panel/users`, `/panel/admins`)** : Modération des offres, gestion des utilisateurs/rôles, logs système paginés.

---

## 2. Suivi & Gestion de Projet (What / Who / When)

| Phase | Livrable (What) | Responsable (Who) | Période (When) |
|---|---|---|---|
| Phase 1 | Setup Laravel + PostgreSQL + Docker Compose + Schéma BDD | Backend / DevOps | Semaine 1 |
| Phase 2 | Collecteur WeLoveDevs + Scraper Playwright Indeed + Normalisation | Data / Scraper | Semaine 2 |
| Phase 3 | Auth, RBAC (`user`/`admin`), Pages Inertia/React (`Discover`, `Insights`, `Admin`) | Fullstack / Frontend | Semaine 3 |
| Phase 4 | Durcissement sécurité (CSRF, rate-limit, XSS), tests Pest, CI `self-hosted`, WCAG 2.1 AA & Docs | Équipe complète | Semaine 4 |

---

## 3. Audit d'Accessibilité (WCAG 2.1 AA)

Conformément au cahier des charges, les 3 parcours clés ont été audités et corrigés pour le niveau **WCAG 2.1 AA** :

1. **Inscription (`resources/js/Pages/Auth/Register.jsx`)** :
   - Landmark `<main>`, navigation onglets avec `aria-current="page"`.
   - Chaque champ possède un `<label htmlFor>` explicite, `autoComplete`, et des messages d'erreur visibles.
   - Icônes décoratives masquées via `aria-hidden="true"`.
2. **Recherche d'offres (`resources/js/Pages/Discover.jsx`)** :
   - Champs de recherche et localisation dotés d'`aria-label` explicites ; boutons d'effacement et de sauvegarde dotés d'`aria-label` et `aria-pressed`.
   - Cartes d'offres navigables au clavier (`role="button"`, `tabIndex={0}`, support `Enter`/`Space`, `focus-visible:ring-2`).
   - Suppression des `<main>` imbriqués (remplacé par `<section aria-label="Détail de l'offre">`).
3. **Détail d'une offre (`resources/js/Components/JobDetailPanel.jsx` & `Pages/JobDetail.jsx`)** :
   - Boutons d'action (fermer, sauvegarder, partager) munis d'`aria-label`, `aria-pressed` et zone `aria-live="polite"` pour la confirmation de copie de lien.
   - Icônes Material Symbols marquées `aria-hidden="true"` pour éviter la lecture vocale des ligatures.
