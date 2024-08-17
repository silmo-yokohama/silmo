<?php

namespace App\Http\Controllers;

use App\Services\WordPressService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkController extends Controller
{
  private $wordpressService;

  private const _GET_WORK_QUERY = '
        query getWork($workId: ID!) {
          work(id: $workId, idType: DATABASE_ID) {
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
              companyname
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
          allWorks: works(first: 1000, where: {orderby: {field: DATE, order: DESC}}) {
            nodes {
              workId
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }';


  public function __construct(WordPressService $wordPressService)
  {
    $this->wordpressService = $wordPressService;
  }
  /**
   * 実績一覧ページを表示
   *
   * @param  Request  $request
   * @param  int|null  $page
   * @return \Inertia\Response
   */
  public function index(Request $request, $page = 1)
  {
    return Inertia::render('Works/Index', [
      'currentPage' => (int)$page,
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
    $variable = [
      'workId' => $id
    ];

    $response = $this->wordpressService->executeQuery(self::_GET_WORK_QUERY, $variable);

    return Inertia::render('Works/Show', [
      'work' => $response['data']['work'],
      'allWorks' => $response['data']['allWorks']['nodes'],
    ]);
  }
}
