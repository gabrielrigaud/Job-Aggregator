import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,      // Plante si le port est pris (évite les conflits silencieux)
        hmr: {
            host: 'localhost',
            port: 5173,        // Fixe le port HMR explicitement
        },
        watch: {
            usePolling: true,
            interval: 500,     // 500ms = bon compromis vitesse/CPU sous Docker+Windows
            ignored: ['**/node_modules/**', '**/vendor/**', '**/.git/**', '**/storage/**'],
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
