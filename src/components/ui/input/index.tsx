import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
};

/**
 * テキスト入力コンポーネント
 * React Hook Formとの連携のためforwardRefを使用
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-[family-name:var(--font-pixel)] text-xs text-text-sub">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'rounded-none border-2 bg-bg-secondary px-4 py-2.5 text-text-main outline-none transition-all',
            'placeholder:text-text-dark',
            'focus:border-primary focus:shadow-[0_0_8px_rgba(0,161,151,0.3)]',
            error ? 'border-red-500' : 'border-text-dark/30',
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
