import { PixelHeading } from '@/components/ui/pixel-heading';
import { cn } from '@/lib/utils';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  /** 英語サブテキスト */
  sub?: string;
  /** 見出しレベル */
  as?: 'h1' | 'h2' | 'h3';
  /** 中央揃え */
  center?: boolean;
};

/**
 * セクションタイトル
 * PixelHeadingに装飾ラインを追加したバリエーション
 */
export function SectionTitle({
  children,
  className,
  sub,
  as = 'h2',
  center = false,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-10', center && 'text-center', className)}>
      <PixelHeading as={as} sub={sub}>
        {children}
      </PixelHeading>
      {/* 装飾ライン */}
      <div className={cn('mt-3 flex items-center gap-2', center && 'justify-center')}>
        <div className="h-1 w-8 bg-primary" />
        <div className="h-1 w-3 bg-accent" />
        <div className="h-1 w-1.5 bg-primary-light" />
      </div>
    </div>
  );
}
