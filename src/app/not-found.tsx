import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

/**
 * 404ページ（ピクセルアート風）
 * 存在しないURLにアクセスした際に表示される
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center">
      <Container size="sm">
        <div className="text-center">
          {/* ピクセルアート風404表示 */}
          <div className="mb-8">
            <p className="font-[family-name:var(--font-press-start)] text-6xl text-primary sm:text-8xl">
              404
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {/* ピクセルアート風の装飾ライン */}
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className="h-2 w-2"
                  style={{
                    backgroundColor:
                      i % 3 === 0
                        ? 'var(--color-primary)'
                        : i % 3 === 1
                          ? 'var(--color-accent)'
                          : 'transparent',
                  }}
                />
              ))}
            </div>
          </div>

          {/* メッセージ */}
          <h1 className="mb-2 font-[family-name:var(--font-pixel)] text-2xl text-text-main">
            ページが見つかりません
          </h1>
          <p className="mb-8 text-text-sub">
            お探しのページは存在しないか、移動された可能性があります。
          </p>

          {/* ホームに戻る */}
          <Link href="/">
            <Button variant="primary" pixel>
              ホームに戻る
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
