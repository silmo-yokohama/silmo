<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Services\WordPressService;

class SitemapController extends Controller
{
  private $wordPressService;
  private $baseUrl;

  private const _GET_WORK_IDS_QUERY = '
        query getWorkIds {
          works(first: 1000) {
            nodes {
              workId
              modified
            }
          }
        }';

  public function __construct(WordPressService $wordPressService)
  {
    $this->wordPressService = $wordPressService;
    $this->baseUrl = "https://silmo.jp";
  }


  /**
   * URLエントリーを生成する
   *
   * @param string $loc
   * @param string $lastmod
   * @param string $changefreq
   * @param string $priority
   * @return string
   */
  private function createUrlEntry(string $loc, string $lastmod, string $changefreq, string $priority): string
  {
    return "  <url>\n" .
      "    <loc>{$this->baseUrl}{$loc}</loc>\n" .
      "    <lastmod>{$lastmod}</lastmod>\n" .
      "    <changefreq>{$changefreq}</changefreq>\n" .
      "    <priority>{$priority}</priority>\n" .
      "  </url>\n";
  }

  /**
   * サイトマップXMLを生成する
   *
   * @return string
   */
  private function generateSitemapXml(): string
  {
    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

    // 静的ページのURLエントリー
    $xml .= $this->createUrlEntry('/', '2024-08-18', 'daily', '1.0');
    $xml .= $this->createUrlEntry('/profile', '2024-08-18', 'monthly', '0.5');
    $xml .= $this->createUrlEntry('/works', '2024-08-18', 'weekly', '0.8');
    $xml .= $this->createUrlEntry('/contact', '2024-08-18', 'monthly', '0.3');

    // WordPressの記事を追加
    $works = $this->wordPressService->get(self::_GET_WORK_IDS_QUERY);
    foreach ($works['works']['nodes'] as $work) {
      $xml .= $this->createUrlEntry(
        '/work/' . $work['workId'],
        $work['modified'],
        'weekly',
        '0.8'
      );
    }

    $xml .= '</urlset>';

    return $xml;
  }

  /**
   * 動的にサイトマップXMLを生成する
   *
   * @return \Illuminate\Http\Response
   */
  public function index(): Response
  {
    $content = $this->generateSitemapXml();
    return response($content)->header('Content-Type', 'text/xml');
  }
}
