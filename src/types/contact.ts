/** お問い合わせの件名 */
export type ContactSubject = 'general' | 'consultation' | 'estimate' | 'bug' | 'other';

/** お問い合わせフォームの入力値 */
export type ContactFormData = {
  /** お名前 */
  name: string;
  /** メールアドレス */
  email: string;
  /** 件名 */
  subject: ContactSubject;
  /** メッセージ */
  message: string;
  /** Honeypotフィールド（スパム対策：空であること） */
  honeypot?: string;
};

/** お問い合わせAPI送信結果 */
export type ContactResult = {
  success: boolean;
  message: string;
};
