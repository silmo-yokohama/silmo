<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * ApiControllers
 */

use App\Http\Controllers\Api\PostController as ApiPosts;
use App\Http\Controllers\Api\SkillsController as ApiSkills;
use App\Http\Controllers\Api\WorksController as ApiWorks;
use App\Http\Controllers\Api\HistoryController as ApiHistories;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkController;

Route::get('/', function () {
  return Inertia::render('Home');
});
Route::get('/profile', [ProfileController::class, 'index'])->name('about');

// 実績一覧ページ（1ページ目）
Route::get('/works', [WorkController::class, 'index'])->name('works.index');

// 実績一覧ページ（2ページ以降）
Route::get('/works/{page}', [WorkController::class, 'index'])
  ->where('page', '[2-9]|[1-9][0-9]+')
  ->name('works.page');

// 実績詳細ページ
Route::get('/work/{id}', [WorkController::class, 'show'])->name('works.show');

//  お問い合わせ
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// API routes
Route::prefix('api')->group(function () {
  Route::get('/news/latest', [ApiPosts::class, 'getLatestPosts'])->name('api.latestNews');
  Route::get('/works', [ApiWorks::class, 'getWorkList'])->name('api.workIndex');
  Route::get('/works/latest', [ApiWorks::class, 'getLatestWorks'])->name('api.latestWorks');
  Route::get('/work/{workId}', [ApiWorks::class, 'getWork'])->name('api.work');
  Route::get('/profile/histories', [ApiHistories::class, 'getHistories'])->name('api.histories');
  Route::get('/profile/skills', [ApiSkills::class, 'getAllSkills'])->name('api.skills');
});
