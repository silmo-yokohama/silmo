/**
 * ローディングUI
 * ページ遷移時やデータ取得中に表示される
 */
export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* ピクセル風ローディングアニメーション */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-4 w-4 bg-primary"
              style={{
                animation: 'pixel-pulse 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <p className="font-[family-name:var(--font-pixel)] text-sm text-text-dark">Loading...</p>
      </div>
    </div>
  );
}
