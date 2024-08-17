<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WordPressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class SkillsController extends Controller
{
  private $wordpressService;

  private const _GET_ALL_SKILLS_QUERY = '
      query getAllSkills {
        allSkill(first: 50) {
          nodes {
            name
            id
            description
            skillId
            slug
            parentId
            skillACF {
              rate
              logo {
                node {
                  slug
                  sourceUrl
                }
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
  public function getAllSkills(Request $request): JsonResponse
  {
    $skills = $this->wordpressService->get(self::_GET_ALL_SKILLS_QUERY);

    if ($skills === null) {
      return response()->json(['error' => 'Failed to fetch posts'], 500);
    }

    return
      response()->json($skills['allSkill']['nodes'], Response::HTTP_OK);
  }
}
