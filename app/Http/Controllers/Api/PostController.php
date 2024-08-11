<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WordPressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class PostController extends Controller
{
  private $wordpressService;

  private const _GET_LATEST_NEWS_QUERY = '
            query LatestPosts {
                allNewsStatus(first: 3, where: {orderby: {field: MODIFIED, order: DESC}}) {
                    nodes {
                        title
                        date
                        id
                        modified
                    }
                }
            }
        ';

  /**
   * PostController constructor.
   */
  public function __construct(WordPressService $wordpressService)
  {
    $this->wordpressService = $wordpressService;
  }

  /**
   * 最新の投稿を取得
   *
   * @return JsonResponse
   */
  public function getLatestPosts(Request $request): JsonResponse
  {
    $news = $this->wordpressService->get(self::_GET_LATEST_NEWS_QUERY);

    if ($news === null) {
      return response()->json(['error' => 'Failed to fetch posts'], 500);
    }

    return
      response()->json($news, Response::HTTP_OK);
  }
}
