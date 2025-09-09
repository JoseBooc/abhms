#!/usr/bin/env bash
set -euo pipefail

# Usage: bash backend/setup.sh
# Requires: PHP, Composer, Node, npm, MySQL DB already created.
# Environment variables required (no defaults set to avoid committing secrets):
#   DB_CONNECTION
#   DB_HOST
#   DB_PORT
#   DB_DATABASE
#   DB_USERNAME
#   DB_PASSWORD
#   MAIL_MAILER
#   MAIL_HOST
#   MAIL_PORT
#   MAIL_USERNAME
#   MAIL_PASSWORD
#   MAIL_ENCRYPTION
#   MAIL_FROM_ADDRESS
#   MAIL_FROM_NAME

APP_DIR="$(cd "$(dirname "$0")" && pwd)/laravel"

if [ -d "$APP_DIR" ]; then
  echo "Laravel app already exists at $APP_DIR" >&2
else
  composer create-project laravel/laravel "$APP_DIR"
fi

cd "$APP_DIR"

# Setup .env from template and inject provided vars
cp -n .env.example .env || true
php -r "file_exists('.env') || copy('.env.example', '.env');"

# Write environment values
php -r '
$env = file_get_contents(".env");
$set = function($k,$v) use (&$env){
  if($v===null||$v==="") return; $v=str_replace(["\\","\n"],["\\\\",""],$v);
  $env = preg_replace("/^{$k}=.*/m","{$k}={$v}",$env);
};
$vars=[
  "DB_CONNECTION"=>getenv("DB_CONNECTION"),
  "DB_HOST"=>getenv("DB_HOST"),
  "DB_PORT"=>getenv("DB_PORT"),
  "DB_DATABASE"=>getenv("DB_DATABASE"),
  "DB_USERNAME"=>getenv("DB_USERNAME"),
  "DB_PASSWORD"=>getenv("DB_PASSWORD"),
  "MAIL_MAILER"=>getenv("MAIL_MAILER"),
  "MAIL_HOST"=>getenv("MAIL_HOST"),
  "MAIL_PORT"=>getenv("MAIL_PORT"),
  "MAIL_USERNAME"=>getenv("MAIL_USERNAME"),
  "MAIL_PASSWORD"=>getenv("MAIL_PASSWORD"),
  "MAIL_ENCRYPTION"=>getenv("MAIL_ENCRYPTION"),
  "MAIL_FROM_ADDRESS"=>getenv("MAIL_FROM_ADDRESS"),
  "MAIL_FROM_NAME"=>getenv("MAIL_FROM_NAME"),
];
foreach($vars as $k=>$v){ $set($k,$v); }
file_put_contents(".env", $env);
'

php artisan key:generate

# Auth scaffolding with Laravel UI (Bootstrap)
composer require laravel/ui
php artisan ui bootstrap --auth
npm install
npm run build

# Spatie Permissions
composer require spatie/laravel-permission
php artisan vendor:publish --provider="Spatie\\Permission\\PermissionServiceProvider" --tag="permission-migrations"
php artisan migrate

# Seeder for roles and admin user
mkdir -p database/seeders
cat > database/seeders/CreateAdminAndRolesSeeder.php << 'PHP'
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateAdminAndRolesSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['Admin','Tenant','Staff'];
        foreach ($roles as $r) {
            Role::firstOrCreate(['name' => $r]);
        }

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole('Admin');
    }
}
PHP

# Update DatabaseSeeder to call our seeder
php -r '
$path = "database/seeders/DatabaseSeeder.php";
$code = file_get_contents($path);
if (strpos($code, "CreateAdminAndRolesSeeder::class") === false) {
  $code = str_replace("public function run(): void\n    {", "public function run(): void\n    {\n        \\App\\Models\\User::factory(0)->create();\n        \$this->call([\\Database\\Seeders\\CreateAdminAndRolesSeeder::class]);", $code);
  file_put_contents($path, $code);
}
'

php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\CreateAdminAndRolesSeeder --force

echo "\n✓ Laravel UI + Spatie permissions installed"
echo "✓ Admin user: admin@example.com / password"
echo "✓ Roles: Admin, Tenant, Staff"
echo "\nRun: php artisan serve (then visit /login)"
