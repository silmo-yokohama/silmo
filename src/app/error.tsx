'use client';

import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

/**
 * エラーページ
 * ランタイムエラー発生時に表示される
 */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center">
      <Container size="sm">
        <div className="text-center">
          {/* エラーアイコン */}
          <p className="mb-4 font-[family-name:var(--font-press-start)] text-4xl text-red-400">
            ERROR
          </p>

          <h1 className="mb-2 font-[family-name:var(--font-pixel)] text-2xl text-text-main">
            エラーが発生しました
          </h1>
          <p className="mb-8 text-text-sub">
            予期しないエラーが発生しました。再度お試しいただくか、時間をおいてアクセスしてください。
          </p>

          <Button variant="primary" pixel onClick={reset}>
            もう一度試す
          </Button>
        </div>
      </Container>
    </div>
  );
}
