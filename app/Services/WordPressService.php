<?php

namespace App\Services;

use DebugBar\DebugBar;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class WordPressService
{
  private $client;
  private $endpoint;

  /**
   * WordPressService constructor.
   */
  public function __construct()
  {
    $this->client = new Client();
    $this->endpoint = config('services.wordpress.endpoint');
  }

  /**
   * GraphQLクエリを実行し、結果を返す
   *
   * @param string $query GraphQLクエリ
   * @param array $variables クエリ変数
   * @return array|null 取得したデータ、エラー時はnull
   */
  public function executeQuery(string $query, array $variables = []): ?array
  {
    try {
      $response = $this->client->post($this->endpoint, [
        'json' => [
          'query' => $query,
          'variables' => $variables,
        ],
      ]);

      return json_decode($response->getBody(), true);
    } catch (\Exception $e) {
      Log::error('GraphQL query failed: ' . $e->getMessage());
      return null;
    }
  }

  /**
   * レスポンスを取得
   *
   * @return array|null 取得したデータ、エラー時はnull
   */
  public function get($query): ?array
  {
    $result = $this->executeQuery($query);

    return $result['data'] ?? null;
  }
}
