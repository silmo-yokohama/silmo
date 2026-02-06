import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** ラベルテキスト */
  label?: string;
  /** エラーメッセージ */
  error?: string;
};

/**
 * テキストエリアコンポーネント
 * React Hook Formとの連携のためforwardRefを使用
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="font-[family-name:var(--font-pixel)] text-xs text-text-sub">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-[160px] rounded-none border-2 bg-bg-secondary px-4 py-2.5 text-text-main outline-none transition-all',
            'placeholder:text-text-dark',
            'focus:border-primary focus:shadow-[0_0_8px_rgba(0,161,151,0.3)]',
            'resize-y',
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

Textarea.displayName = 'Textarea';
