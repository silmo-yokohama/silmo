import { createClient } from 'microcms-js-sdk';

/** microCMSクライアントインスタンスの型 */
type CMSClient = ReturnType<typeof createClient>;

/**
 * microCMS APIクライアントを安全に初期化するファクトリ
 * ビルド時に環境変数がない場合でもエラーを回避する
 */
function createSafeClient(apiKeyEnv: string): CMSClient {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env[apiKeyEnv];

  if (!serviceDomain || !apiKey) {
    // 環境変数未設定時はダミークライアントを返す（ビルド時のみ）
    // 実際のAPI呼び出し時にはcatchで処理される
    return new Proxy({} as CMSClient, {
      get: () => {
        return () => {
          throw new Error(`microCMS環境変数が未設定です（${apiKeyEnv}）`);
        };
      },
    });
  }

  return createClient({ serviceDomain, apiKey });
}

/**
 * microCMS APIクライアント（GET用）
 * サーバーサイドでのみ使用する
 */
export const client = createSafeClient('MICROCMS_API_KEY');

/**
 * microCMS APIクライアント（WRITE用）
 * お問い合わせ送信専用。APIルート内でのみ使用する
 * ※ Hobbyプランではキーが1つのため、GET用と同じキーを使用
 */
export const writeClient = createSafeClient('MICROCMS_API_KEY');
