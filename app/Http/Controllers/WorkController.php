<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
  /**
   * 実績一覧ページを表示
   *
   * @return \Inertia\Response
   */
  public function index()
  {
    // ここで実績データを取得する処理を追加
    $works = []; // 仮のデータ

    return Inertia::render('Works/Index', [
      'works' => $works
    ]);
  }

  /**
   * 実績詳細ページを表示
   *
   * @param  int  $id
   * @return \Inertia\Response
   */
  public function show($id)
  {
    // ここで特定の実績データを取得する処理を追加
    $work = []; // 仮のデータ

    return Inertia::render('Works/Show', [
      'work' => $work
    ]);
  }
}
