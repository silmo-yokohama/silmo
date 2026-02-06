'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { contactSchema, type ContactSchemaType } from '@/lib/validations';
import type { ContactResult } from '@/types/contact';

/**
 * お問い合わせフォームの送信ロジックを管理するフック
 * バリデーション、送信状態、エラーハンドリングを一元化する
 */
export function useContactForm() {
  const [result, setResult] = useState<ContactResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: 'general',
      message: '',
      honeypot: '',
    },
  });

  /**
   * フォーム送信処理
   * APIルートにPOSTし、結果をstateに反映する
   */
  const onSubmit = async (data: ContactSchemaType) => {
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.ok) {
        setResult({ success: true, message: 'お問い合わせを送信しました。ありがとうございます。' });
        form.reset();
      } else {
        setResult({
          success: false,
          message: json.message || '送信に失敗しました。しばらく経ってからお試しください。',
        });
      }
    } catch {
      setResult({
        success: false,
        message: 'ネットワークエラーが発生しました。通信状況を確認してください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    result,
  };
}
