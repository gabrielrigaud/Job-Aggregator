#!/bin/bash
set -e

echo "[entrypoint] Starting JobMind Application..."

# Wait for PostgreSQL to be ready
echo "[entrypoint] Waiting for database..."
until php -r "new PDO('pgsql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}');" 2>/dev/null; do
    echo "[entrypoint] Database not ready yet, retrying in 2s..."
    sleep 2
done
echo "[entrypoint] Database is ready."

# Clear any cached bootstrap files that might have been copied from host
echo "[entrypoint] Clearing bootstrap cache..."
rm -f bootstrap/cache/*.php

# Generate app key if not set
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
    echo "[entrypoint] Generating application key..."
    php artisan key:generate --force --no-interaction 2>/dev/null || echo "[entrypoint] Warning: key:generate had issues, continuing..."
fi

# Run migrations
echo "[entrypoint] Running migrations..."
php artisan migrate --force --no-interaction 2>/dev/null || echo "[entrypoint] Warning: migrations had issues, continuing..."

# Cache config, routes, views for production
if [ "$APP_ENV" = "production" ]; then
    echo "[entrypoint] Caching configuration..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

# Ensure storage link exists
php artisan storage:link 2>/dev/null || true

# Fix permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

echo "[entrypoint] Application ready."

exec "$@"
