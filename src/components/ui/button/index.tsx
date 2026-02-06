import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** ピクセル風ボーダーを使用するか */
  pixel?: boolean;
};

const variantStyles = {
  primary: 'border-transparent bg-primary text-bg-main hover:bg-primary-light active:bg-primary-dark',
  secondary: 'border-transparent bg-accent text-bg-main hover:bg-accent-light active:bg-accent-dark',
  outline: 'border-primary text-primary hover:bg-primary/10',
  ghost: 'border-transparent text-text-sub hover:bg-bg-secondary hover:text-text-main',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
} as const;

/**
 * 汎用ボタンコンポーネント
 * ピクセル風デザイン（pixel=true）は角丸なし + ピクセルフォント + pixel-border
 * 通常デザインは角丸なし + 標準フォントで統一
 */
export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  pixel = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-none border-2 font-bold transition-all duration-200',
        pixel && 'pixel-border font-[family-name:var(--font-pixel)]',
        variantStyles[variant],
        sizeStyles[size],
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
