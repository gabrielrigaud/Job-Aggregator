# Schéma de Base de Données & API REST

## 1. Modèle Relationnel (PostgreSQL)

Les migrations se trouvent dans `database/migrations/`. La persistance Docker est assurée par le volume nommé `pgdata` dans `docker-compose.yml`.

### Tables principales

| Table | Rôle | Contraintes clés |
|---|---|---|
| `users` | Comptes utilisateurs (`name`, `email`, `password`, `job_title`, `bio`, `linkedin_url`) | `PRIMARY KEY (id)`, `UNIQUE (email)` |
| `roles` / `model_has_roles` | Gestion RBAC Spatie (`user`, `admin`) | `FOREIGN KEY` avec cascade |
| `sources` | Sources de collecte (`name`, `url`, `type`) | `PRIMARY KEY (id)` |
| `companies` | Entreprises normalisées (`name`, `website_url`, `logo_url`) | `PRIMARY KEY (id)`, `UNIQUE (name)` |
| `job_offers` | Offres normalisées (`title`, `description`, `location`, `country`, `is_remote`, `contract_type`, `date_of_publi`, `date_of_collect`, `salary_min`, `salary_max`, `salary_currency`, `salary_period`, `content_hash`) | `FK (company_id -> companies.id)`, `FK (source_internal_id -> sources.id)`, `UNIQUE (content_hash)`, `UNIQUE (source_internal_id, source_external_id)` |
| `offer_views` | Historique de consultation et favoris (`user_id`, `job_offer_id`, `is_saved`, `viewed_at`) | `FK (user_id -> users.id)`, `FK (job_offer_id -> job_offers.id)` |

---

## 2. API REST (`routes/api.php`)

Toutes les routes API retournent du JSON (`shouldRenderJsonWhen` dans `bootstrap/app.php`).

### `POST /api/login`
- **Auth** : Public, protégé par `throttle:5,1`
- **Body** : `{ "email": "string", "password": "string" }`
- **Réponses** :
  - `200 OK` : `{ "access_token": "...", "token_type": "Bearer" }`
  - `401 Unauthorized` : `{ "message": "Identifiants incorrects" }`
  - `422 Unprocessable Entity` : erreurs de validation

### `GET /api/user`
- **Auth** : `auth:sanctum`
- **Réponses** : `200 OK` (profil utilisateur) ou `401 Unauthorized`

### `POST /api/jobs`
- **Auth** : `auth:sanctum` + middleware `admin`
- **Validation** : `App\Http\Requests\StoreJobOfferRequest`
- **Réponses** :
  - `201 Created` : offre créée
  - `401 Unauthorized` / `403 Forbidden` : accès refusé
  - `422 Unprocessable Entity` : erreurs de validation
