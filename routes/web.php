<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\PostController;

Route::get('/', function () {
  return Inertia::render('Home');
});

// API routes
Route::prefix('api')->group(function () {
  Route::get('/news/latest', [PostController::class, 'getLatestPosts'])->name('api.latestNews');;
});
