import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/** 開示レベル */
export type DisclosureLevel = '公開' | '社名非公開' | '完全非公開';

/** 職務経歴の型定義 */
export type Career = {
  /** プロジェクト名 */
  title: string;
  /** 詳細説明（リッチエディタHTML） */
  description: string;
  /** 期間（"2023年4月〜2024年3月" 形式） */
  period: string;
  /** 担当ロール */
  role?: string;
  /** 使用技術 */
  technologies?: string[];
  /** 会社名（開示可能な場合のみ） */
  companyName?: string;
  /** 開示レベル */
  disclosureLevel: DisclosureLevel;
  /** スクリーンショット */
  thumbnail?: MicroCMSImage;
  /** 成果・工夫点 */
  achievements?: string;
  /** チーム規模 */
  teamSize?: string;
  /** 表示順（新しい順） */
  order: number;
} & MicroCMSDate & {
    id: string;
  };
