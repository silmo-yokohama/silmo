'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/hooks/use-contact-form';
import { CONTACT_SUBJECTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * お問い合わせフォーム
 * React Hook Form + Zodバリデーション + Honeypotスパム対策
 */
export function ContactForm() {
  const { form, onSubmit, isSubmitting, result } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypotフィールド（スパム対策：非表示） */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      {/* お名前 */}
      <Input
        label="お名前 *"
        placeholder="山田 太郎"
        error={errors.name?.message}
        {...register('name')}
      />

      {/* メールアドレス */}
      <Input
        label="メールアドレス *"
        type="email"
        placeholder="example@mail.com"
        error={errors.email?.message}
        {...register('email')}
      />

      {/* 件名 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-sm font-medium text-text-sub">
          件名 *
        </label>
        <select
          id="subject"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={cn(
            'rounded-lg border bg-bg-secondary px-4 py-2.5 text-text-main outline-none transition-all',
            'focus:border-primary focus:ring-1 focus:ring-primary',
            errors.subject ? 'border-red-500' : 'border-text-dark/30',
          )}
          {...register('subject')}
        >
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="text-sm text-red-400">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* メッセージ */}
      <Textarea
        label="メッセージ *"
        placeholder="お問い合わせ内容をご記入ください（10文字以上）"
        error={errors.message?.message}
        {...register('message')}
      />

      {/* 送信結果メッセージ */}
      {result && (
        <div
          className={cn(
            'rounded-lg border p-4 text-sm',
            result.success
              ? 'border-primary/30 bg-primary/10 text-primary-light'
              : 'border-red-500/30 bg-red-500/10 text-red-400',
          )}
          role="alert"
        >
          {result.message}
        </div>
      )}

      {/* 送信ボタン */}
      <Button type="submit" variant="primary" size="lg" pixel disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '送信する'}
      </Button>
    </form>
  );
}
