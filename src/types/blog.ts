import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

/** ブログ記事の型定義 */
export type Blog = {
  /** タイトル */
  title: string;
  /** 本文（リッチエディタHTML） */
  body: string;
  /** サムネイル画像（OGP兼用） */
  thumbnail?: MicroCMSImage;
  /** カテゴリ（セレクトフィールド。microCMSから配列で返る） */
  category?: string[];
  /** タグ（カンマ区切り） */
  tags?: string;
  /** 概要（SEO meta description用） */
  description?: string;
} & MicroCMSDate & {
    id: string;
  };
