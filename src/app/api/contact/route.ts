import { NextResponse } from 'next/server';

import { createContact } from '@/lib/microcms/contacts';
import { contactSchema } from '@/lib/validations';

/**
 * レート制限用のシンプルなメモリキャッシュ（IP別）
 * 注意: サーバーレス環境ではインスタンス間で共有されないため、完全なレート制限にはならない
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

/** 1分あたりの最大リクエスト数 */
const RATE_LIMIT = 3;
/** レート制限のウィンドウ（ミリ秒） */
const RATE_WINDOW = 60 * 1000;

/**
 * お問い合わせ送信APIルート
 * バリデーション → Honeypotチェック → レート制限 → microCMS WRITE API
 */
export async function POST(request: Request) {
  try {
    // レート制限チェック（x-forwarded-forはカンマ区切りの場合があるため先頭IPを取得）
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData) {
      if (now < rateData.resetAt) {
        if (rateData.count >= RATE_LIMIT) {
          return NextResponse.json(
            { message: '送信回数の上限に達しました。しばらく経ってからお試しください。' },
            { status: 429 },
          );
        }
        rateData.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    }

    // リクエストボディをパース
    const body = await request.json();

    // Zodバリデーション
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { message: '入力内容にエラーがあります。', errors },
        { status: 400 },
      );
    }

    // Honeypotチェック（ボットが自動入力するフィールドが空でなければスパム判定）
    if (result.data.honeypot) {
      // スパムと判定するが、ボットにはバレないよう200を返す
      return NextResponse.json({ message: '送信しました。' }, { status: 200 });
    }

    // microCMS WRITE APIでお問い合わせデータを保存
    const { honeypot: _, ...contactData } = result.data;
    await createContact(contactData);

    return NextResponse.json({ message: 'お問い合わせを受け付けました。' }, { status: 200 });
  } catch (error) {
    console.error('お問い合わせ送信エラー:', error);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました。しばらく経ってからお試しください。' },
      { status: 500 },
    );
  }
}
