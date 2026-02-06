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
  primary: 'bg-primary text-bg-main hover:bg-primary-light active:bg-primary-dark',
  secondary: 'bg-accent text-bg-main hover:bg-accent-light active:bg-accent-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  ghost: 'text-text-sub hover:bg-bg-secondary hover:text-text-main',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
} as const;

/**
 * 汎用ボタンコンポーネント
 * ピクセル風デザインとモダンデザインの両方に対応
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
        'inline-flex items-center justify-center font-bold transition-all duration-200',
        pixel ? 'pixel-border rounded-none' : 'rounded-lg',
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
