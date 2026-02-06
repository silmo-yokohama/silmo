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
 * セクションタイトル（RPG風メニューヘッダー）
 * PixelHeadingにゲーム風の装飾ラインとドットを追加
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
      {/* RPG風装飾ライン */}
      <div className={cn('mt-3 flex items-center gap-1.5', center && 'justify-center')}>
        <div className="h-[3px] w-8 bg-primary" />
        <div className="h-[3px] w-2 bg-accent" />
        <div className="h-[3px] w-1 bg-primary-light" />
        <div className="h-1 w-1 bg-primary" />
        <div className="h-1 w-1 bg-accent" />
      </div>
    </div>
  );
}
