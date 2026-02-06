import { cn } from '@/lib/utils';

type PixelBorderProps = {
  children: React.ReactNode;
  className?: string;
  /** ボーダーの色バリアント */
  variant?: 'primary' | 'accent';
};

/**
 * ピクセルアート風ボーダーで囲むラッパーコンポーネント
 * box-shadowでドット風のボーダーを表現する
 */
export function PixelBorder({ children, className, variant = 'primary' }: PixelBorderProps) {
  const color = variant === 'primary' ? 'var(--color-primary)' : 'var(--color-accent)';

  return (
    <div
      className={cn('p-6', className)}
      style={{
        boxShadow: `
          0 -4px 0 0 ${color},
          4px 0 0 0 ${color},
          0 4px 0 0 ${color},
          -4px 0 0 0 ${color},
          -4px -4px 0 0 ${color},
          4px -4px 0 0 ${color},
          4px 4px 0 0 ${color},
          -4px 4px 0 0 ${color}
        `,
      }}
    >
      {children}
    </div>
  );
}
