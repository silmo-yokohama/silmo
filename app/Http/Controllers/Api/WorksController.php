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
              featuredImage {
                node {
                  slug
                  sourceUrl
                }
              }
            }
          }
        }';

  private const _GET_WORK_LIST_QUERY = '
        query getWorks($first: Int!, $after: String) {
          works(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
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
              featuredImage {
                node {
                  slug
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
  public function getLatestWorks(Request $request): JsonResponse
  {
    $works = $this->wordpressService->get(self::_GET_LATEST_WORKS_QUERY);

    if ($works === null) {
      return response()->json(['error' => 'Failed to fetch posts'], 500);
    }

    return
      response()->json($works['works']['nodes'], Response::HTTP_OK);
  }

  /**
   * 指定件数の投稿を取得
   *
   * @return JsonResponse
   */

  public function getWorkList(Request $request): JsonResponse
  {
    $variable = [
      'first' => (int)$request->input('per_page', 6),
      'after' => $request->input('after', null)
    ];

    $response = $this->wordpressService->executeQuery(self::_GET_WORK_LIST_QUERY, $variable);

    return response()->json([
      'works' => $response['data']['works']['nodes'],
      'pageInfo' => $response['data']['works']['pageInfo'],
    ]);
  }
}
