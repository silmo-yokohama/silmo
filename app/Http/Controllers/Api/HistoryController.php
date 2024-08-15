<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WordPressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
  private $wordpressService;

  private const _GET_HISTORIES_QUERY = '
      query getHistories {
        allHistories(where: {orderby: {field: TITLE, order: ASC}}) {
          nodes {
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
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

  /**
   * 最新の投稿を取得
   *
   * @return JsonResponse
   */
  public function getHistories(Request $request): JsonResponse
  {
    $works = $this->wordpressService->get(self::_GET_HISTORIES_QUERY);

    if ($works === null) {
      return response()->json(['error' => 'Failed to fetch posts'], 500);
    }

    return
      response()->json($works['allHistories']['nodes'], Response::HTTP_OK);
  }
}
