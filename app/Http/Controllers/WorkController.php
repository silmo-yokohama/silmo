<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
  /**
   * 実績一覧ページを表示
   *
   * @param  Request  $request
   * @param  int|null  $page
   * @return \Inertia\Response
   */
  public function index(Request $request, $page = 1)
  {
    $perPage = 10; // 1ページあたりの表示件数

    // ここで実績データを取得する処理を追加
    // 例: $works = Work::paginate($perPage);
    $works = []; // 仮のデータ

    return Inertia::render('Works/Index', [
      'works' => $works,
      'currentPage' => (int)$page,
      'perPage' => $perPage,
      // 'total' => $works->total(), // 実際のpaginateを使用する場合
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
    // 例: $work = Work::findOrFail($id);
    $work = []; // 仮のデータ

    return Inertia::render('Works/Show', [
      'work' => $work
    ]);
  }
}
