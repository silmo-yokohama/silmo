import type { ContactFormData } from '@/types/contact';

import { writeClient } from './client';

/**
 * お問い合わせデータをmicroCMSに送信する（WRITE API）
 * APIルート内でのみ使用すること
 * @param data - お問い合わせフォームデータ
 * @returns microCMS APIレスポンス
 */
export async function createContact(data: Omit<ContactFormData, 'honeypot'>) {
  return writeClient.create({
    endpoint: 'contacts',
    content: {
      name: data.name,
      email: data.email,
      // microCMSのセレクトフィールドは配列型で送信する必要がある
      subject: [data.subject],
      message: data.message,
    },
  });
}
