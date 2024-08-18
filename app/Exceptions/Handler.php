<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
  protected $dontFlash = [
    'current_password',
    'password',
    'password_confirmation',
  ];

  public function register(): void
  {
    $this->renderable(function (Throwable $e, $request) {
      if ($this->shouldRenderInertiaErrorPage($e)) {
        return Inertia::render('NotFound', [
          'status' => $e->getCode(),
        ])->toResponse($request);
      }
    });
  }

  private function shouldRenderInertiaErrorPage(Throwable $e): bool
  {
    return !$this->isHttpException($e) && !config('app.debug');
  }
}
