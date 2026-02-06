import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  /** バッジのバリアント */
  variant?: 'primary' | 'accent' | 'outline' | 'muted';
};

const variantStyles = {
  primary: 'bg-primary/20 text-primary-light border-primary/50',
  accent: 'bg-accent/20 text-accent-light border-accent/50',
  outline: 'bg-transparent text-text-sub border-text-dark/60',
  muted: 'bg-bg-secondary text-text-dark border-text-dark/40',
} as const;

/**
 * バッジコンポーネント（RPGアイテムタグ風）
 * 角丸なし、ピクセルフォントで統一されたレトロゲーム風タグ
 */
export function Badge({ children, className, variant = 'primary' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-none border px-2 py-0.5 font-[family-name:var(--font-pixel)] text-[10px]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
