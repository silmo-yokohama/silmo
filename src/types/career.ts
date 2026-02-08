import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/** 職務経歴の型定義 */
export type Career = {
  /** プロジェクト名 */
  title: string;
  /** 詳細説明（リッチエディタHTML） */
  description: string;
  /** 開始日（ISO 8601 日付文字列） */
  start: string;
  /** 終了日（ISO 8601 日付文字列。進行中の場合は未設定） */
  period?: string;
  /** 担当ロール */
  role?: string;
  /** 使用技術（カンマ区切りテキスト） */
  technologies?: string;
  /** 会社名（未入力の場合は「非公開」扱い） */
  companyName?: string;
  /** スクリーンショット */
  thumbnail?: MicroCMSImage;
  /** 成果・工夫点 */
  achievements?: string;
  /** チーム規模 */
  teamSize?: string;
  /** 受託制作フラグ（true=受託制作、未設定/false=常駐案件） */
  isProduction?: boolean;
  /** 表示順（新しい順） */
  order: number;
} & MicroCMSDate & {
    id: string;
  };
