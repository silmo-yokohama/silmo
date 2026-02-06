import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * microCMS Webhookによるオンデマンドキャッシュ破棄APIルート
 * microCMSでコンテンツが更新された際にWebhookから呼ばれる
 */
export async function POST(request: Request) {
  // シークレットトークンによる認証
  const secret = request.headers.get('X-REVALIDATION-SECRET');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: '認証に失敗しました。' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // microCMS Webhookのペイロードからエンドポイント名を取得
    const { api } = body;

    if (!api) {
      return NextResponse.json({ message: 'APIエンドポイント名がありません。' }, { status: 400 });
    }

    // エンドポイント名に対応するパスのキャッシュを破棄
    const pathMap: Record<string, string[]> = {
      blogs: ['/blog', '/'],
      careers: ['/career'],
      sandboxes: ['/sandbox', '/'],
    };

    const paths = pathMap[api] || ['/'];
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      message: `キャッシュを破棄しました: ${api}`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error('Revalidationエラー:', error);
    return NextResponse.json(
      { message: 'キャッシュ破棄に失敗しました。' },
      { status: 500 },
    );
  }
}
