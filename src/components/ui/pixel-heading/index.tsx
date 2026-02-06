import { cn } from '@/lib/utils';

type PixelHeadingProps = {
  children: React.ReactNode;
  className?: string;
  /** 見出しレベル（デフォルト: h2） */
  as?: 'h1' | 'h2' | 'h3';
  /** 英語テキスト（ピクセルフォントで小さく表示） */
  sub?: string;
};

const headingSizes = {
  h1: 'text-3xl sm:text-4xl',
  h2: 'text-2xl sm:text-3xl',
  h3: 'text-xl sm:text-2xl',
} as const;

const subSizes = {
  h1: 'text-xs',
  h2: 'text-[10px]',
  h3: 'text-[9px]',
} as const;

/**
 * ピクセルフォント見出し
 * 日本語ピクセルフォント + 英語サブテキストで統一感を出す
 */
export function PixelHeading({ children, className, as: Tag = 'h2', sub }: PixelHeadingProps) {
  return (
    <div className="flex flex-col gap-1">
      {sub && (
        <span
          className={cn(
            'font-[family-name:var(--font-press-start)] uppercase tracking-widest text-primary',
            subSizes[Tag],
          )}
        >
          {sub}
        </span>
      )}
      <Tag
        className={cn(
          'font-[family-name:var(--font-pixel)] text-text-main pixel-text-shadow',
          headingSizes[Tag],
          className,
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
