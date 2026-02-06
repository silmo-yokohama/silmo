import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/** サンドボックスのステータス値 */
export type SandboxStatusValue = '開発中' | '完成' | 'メンテナンス中' | 'アーカイブ';

/** サンドボックス（個人開発プロジェクト）の型定義 */
export type Sandbox = {
  /** プロジェクト名 */
  title: string;
  /** 説明（リッチエディタHTML） */
  description: string;
  /** サムネイル */
  thumbnail?: MicroCMSImage;
  /** 使用技術 */
  technologies?: string[];
  /** 公開URL（デモサイト等） */
  siteUrl?: string;
  /** GitHubリポジトリURL */
  githubUrl?: string;
  /** 開発目的 */
  purpose?: string;
  /** ステータス（セレクトフィールド。microCMSから配列で返る） */
  status?: SandboxStatusValue[];
} & MicroCMSDate & {
    id: string;
  };
