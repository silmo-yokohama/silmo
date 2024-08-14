<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\WorksController;

Route::get('/', function () {
  return Inertia::render('Home');
});

// API routes
Route::prefix('api')->group(function () {
  Route::get('/news/latest', [PostController::class, 'getLatestPosts'])->name('api.latestNews');;
  Route::get('/works/latest', [WorksController::class, 'getLatestWorks'])->name('api.latestWorks');;
});
