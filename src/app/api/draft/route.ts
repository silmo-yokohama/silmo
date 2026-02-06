import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

/**
 * microCMSプレビューモードAPIルート
 * microCMSのプレビュー機能からアクセスされた際にDraft Modeを有効化する
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const contentType = searchParams.get('type') || 'blogs';

  // シークレットトークンの検証
  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('認証に失敗しました。', { status: 401 });
  }

  if (!slug) {
    return new Response('スラッグが指定されていません。', { status: 400 });
  }

  // Draft Modeを有効化
  const draft = await draftMode();
  draft.enable();

  // 対応するページへリダイレクト
  const pathMap: Record<string, string> = {
    blogs: `/blog/${slug}`,
  };

  const redirectPath = pathMap[contentType] || '/';
  redirect(redirectPath);
}
