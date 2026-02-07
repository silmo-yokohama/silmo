import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/** サンドボックスの目的値 */
export type SandboxPurposeValue = '学習' | '技術検証' | 'プロダクト' | 'ポートフォリオ';

/** サンドボックス（個人開発プロジェクト）の型定義 */
export type Sandbox = {
  /** プロジェクト名 */
  title: string;
  /** 説明（リッチエディタHTML） */
  description: string;
  /** サムネイル */
  thumbnail?: MicroCMSImage;
  /** 使用技術（カンマ区切りテキスト） */
  technologies?: string;
  /** 公開URL（デモサイト等） */
  siteUrl?: string;
  /** GitHubリポジトリURL */
  githubUrl?: string;
  /** 開発目的（セレクトフィールド。microCMSから配列で返る） */
  purpose?: SandboxPurposeValue[];
} & MicroCMSDate & {
    id: string;
  };
