<?php

use App\Models\Company;
use App\Models\Source;
use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
    Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
});

test('POST /api/login issues Sanctum token for valid credentials and rejects invalid ones', function () {
    $user = User::factory()->create([
        'password' => bcrypt('Secret123!'),
    ]);

    $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])->assertStatus(401);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'Secret123!',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure(['access_token', 'token_type']);
});

test('POST /api/jobs requires admin role and validates payload', function () {
    $regularUser = User::factory()->create();
    $regularUser->assignRole('user');

    $adminUser = User::factory()->create();
    $adminUser->assignRole('admin');

    // Non authentifié -> 401
    $this->postJson('/api/jobs', [])->assertStatus(401);

    // Rôle user -> 403
    $this->actingAs($regularUser, 'sanctum')
        ->postJson('/api/jobs', [
            'title' => 'Test Job',
            'company_name' => 'Acme',
            'source_name' => 'Manual',
        ])
        ->assertStatus(403);

    // Rôle admin avec payload invalide -> 422
    $this->actingAs($adminUser, 'sanctum')
        ->postJson('/api/jobs', [])
        ->assertStatus(422);

    // Rôle admin avec payload valide -> 201
    $company = Company::create(['name' => 'JobMind Corp']);
    $source = Source::create(['name' => 'Manual', 'url' => 'https://jobmind.local', 'type' => 'API']);

    $this->actingAs($adminUser, 'sanctum')
        ->postJson('/api/jobs', [
            'company_id' => $company->id,
            'source_internal_id' => $source->id,
            'source_external_id' => 'ext-job-001',
            'title' => 'Développeur Backend PHP',
            'description' => 'Architecture Laravel et PostgreSQL.',
            'location' => 'Paris',
            'country' => 'France',
            'contract_type' => 'CDI',
            'is_remote' => true,
            'date_of_publi' => now()->toDateTimeString(),
            'date_of_collect' => now()->toDateTimeString(),
            'salary_min' => 45000,
            'salary_max' => 55000,
            'content_hash' => hash('sha256', 'job-001'),
        ])
        ->assertStatus(201);
});

test('GET /api/user returns authenticated user', function () {
    $user = User::factory()->create();

    $this->getJson('/api/user')->assertStatus(401);

    $this->actingAs($user, 'sanctum')
        ->getJson('/api/user')
        ->assertStatus(200)
        ->assertJson(['email' => $user->email]);
});
