# JobMind — Agrégateur d'offres d'emploi Tech

JobMind est une plateforme d'agrégation d'offres d'emploi et de stages qui collecte des annonces depuis plusieurs sources (API **WeLoveDevs**, **Arbeitnow**, **Remotive** et scraping **Indeed**), les normalise vers un schéma pivot unifié en PostgreSQL, enrichit les logos et traductions françaises, et propose des outils de recherche, d'analyse salariale et de scoring de pertinence.

## Architecture

- **Backend** : Laravel (PHP 8.4+), Sanctum (API REST), Spatie Permission (`user` / `admin`)
- **Base de données** : PostgreSQL 16 (persistance via volume Docker `pgdata`)
- **Frontend** : React 18, Inertia.js, Tailwind CSS, Vite
- **Scraper** : Microservice Python FastAPI + Playwright (`scraper_api/`)

## Démarrage rapide (Docker Compose)

```bash
cp .env.docker .env
# Renseigner WELOVEDEVS_API_KEY dans .env
docker compose up -d --build
```

L'application est accessible sur `http://localhost` (Nginx) et le scraper sur `http://localhost:8000`.

## Démarrage en local

```bash
composer install
npm install --legacy-peer-deps && npm run build
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Pour le microservice scraper :
```bash
python -m venv scraper_api/.venv
scraper_api/.venv/Scripts/pip install -r scraper_api/requirements.txt
scraper_api/.venv/Scripts/python -m uvicorn main:app --app-dir scraper_api --host 127.0.0.1 --port 8001
```

## Collecte manuelle & enrichissement des données

```bash
php artisan jobs:fetch-welovedevs --pages=3
php artisan jobs:fetch-indeed "Développeur" "Paris"
php artisan jobs:fetch-arbeitnow --pages=2 --limit=20
php artisan jobs:fetch-remotive --limit=20
php artisan jobs:enrich-logos
php artisan jobs:translate-enrich
```

## Tests et qualité

```bash
./vendor/bin/pint --test
./vendor/bin/pest
npm run build
```

## Documentation

- [Décisions d'architecture & Sécurité (ADR)](docs/ADR.md)
- [Schéma Base de Données & API REST](docs/DATABASE_AND_API.md)
- [Produit, Gestion de Projet & Audit Accessibilité WCAG 2.1 AA](docs/PRODUCT_AND_PROJECT.md)
