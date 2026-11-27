<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Opcodes\LogViewer\Facades\LogViewer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        try {
            LogViewer::auth(function ($request) {
                return $request->user() && $request->user()->hasRole('admin');
            });
        } catch (\Throwable $e) {
            // Silently ignore if LogViewer is not yet bound (e.g., during package discovery)
        }
    }
}
