<?php

use App\Http\Controllers\Api\HistoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SkillsController;
use App\Http\Controllers\Api\WorksController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
  return Inertia::render('Home');
});
Route::get('/profile', [ProfileController::class, 'index'])->name('about');

// API routes
Route::prefix('api')->group(function () {
  Route::get('/news/latest', [PostController::class, 'getLatestPosts'])->name('api.latestNews');
  Route::get('/works/latest', [WorksController::class, 'getLatestWorks'])->name('api.latestWorks');
  Route::get('/profile/histories', [HistoryController::class, 'getHistories'])->name('api.histories');
  Route::get('/profile/skills', [SkillsController::class, 'getAllSkills'])->name('api.skills');
});
