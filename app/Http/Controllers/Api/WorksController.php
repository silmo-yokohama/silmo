<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WordPressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class WorksController extends Controller
{
  private $wordpressService;

  private const _GET_LATEST_WORKS_QUERY = '
        query getLatestWorks {
          works(first: 3) {
            nodes {
              date
              content
              title
              workACF {
                eyecatch {
                  node {
                    sourceUrl
                  }
                }
                eyecatch_sp {
                  node {
                    sourceUrl
                  }
                }
                github
                targetUrl
              }
              workCategory {
                nodes {
                  name
                }
              }
              skill {
                nodes {
                  skillId
                  name
                }
              }
              workId
            }
          }
        }';

  /**
   * WorksController constructor.
   */
  public function __construct(WordPressService $wordpressService)
  {
    $this->wordpressService = $wordpressService;
  }

  public function index(Request $request)
  {
    $page = $request->input('page', 1);
    $perPage = 6; // 1ページあたりの表示件数

    $works = [
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      [
        'id' => 1,
        'title' => 'プロジェクトA',
        'description' => 'Webアプリケーション開発',
        'image' => '/images/works/project-a.jpg',
      ],
      // ... 他の仮データ（合計18個程度）
    ];

    $total = count($works);
    $works = array_slice($works, ($page - 1) * $perPage, $perPage);

    return response()->json([
      'works' => $works,
      'current_page' => (int)$page,
      'per_page' => $perPage,
      'total' => $total,
    ]);
  }

  /**
   * 最新の投稿を取得
   *
   * @return JsonResponse
   */
  public function getLatestWorks(Request $request): JsonResponse
  {
    $works = $this->wordpressService->get(self::_GET_LATEST_WORKS_QUERY);

    if ($works === null) {
      return response()->json(['error' => 'Failed to fetch posts'], 500);
    }

    return
      response()->json($works['works']['nodes'], Response::HTTP_OK);
  }
}
