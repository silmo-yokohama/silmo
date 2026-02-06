import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  /** バッジのバリアント */
  variant?: 'primary' | 'accent' | 'outline' | 'muted';
};

const variantStyles = {
  primary: 'bg-primary/15 text-primary-light border-primary/30',
  accent: 'bg-accent/15 text-accent-light border-accent/30',
  outline: 'bg-transparent text-text-sub border-text-dark',
  muted: 'bg-bg-secondary text-text-sub border-text-dark/50',
} as const;

/**
 * バッジコンポーネント
 * 技術タグやカテゴリ表示に使用する
 */
export function Badge({ children, className, variant = 'primary' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
