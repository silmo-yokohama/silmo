<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProfileController extends Controller
{
  /**
   * Aboutページを表示する
   *
   * @return \Inertia\Response
   */
  public function index()
  {
    return Inertia::render('About');
  }
}
