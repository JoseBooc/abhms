<?php

use Illuminate\Support\Facades\Route;

// Define web routes for the application
Route::get('/', function () {
    return view('welcome');
});

// Additional web routes can be defined below
// Route::get('/example', [ExampleController::class, 'index']);