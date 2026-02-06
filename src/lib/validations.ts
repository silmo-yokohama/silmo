import { z } from 'zod';

/**
 * お問い合わせフォームのバリデーションスキーマ
 * クライアント側・サーバー側の両方で使用する
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前を入力してください')
    .max(100, 'お名前は100文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
  subject: z.enum(['general', 'consultation', 'estimate', 'bug', 'other'], {
    error: '件名を選択してください',
  }),
  message: z
    .string()
    .min(10, 'メッセージは10文字以上で入力してください')
    .max(5000, 'メッセージは5000文字以内で入力してください'),
  honeypot: z.string().max(0, 'スパムと判定されました').optional(),
});

/** バリデーション済みお問い合わせフォームの型 */
export type ContactSchemaType = z.infer<typeof contactSchema>;
