import type { Blog } from '@/types/blog';

/**
 * ブログ記事のモックデータ
 * microCMSにデータがない開発時にUIを確認するためのフィクスチャ
 */
export const MOCK_BLOGS: Blog[] = [
  {
    id: 'mock-blog-1',
    title: 'Next.js 16のApp Routerで変わったこと - 移行ガイド',
    body: '<h2>はじめに</h2><p>Next.js 16がリリースされ、App Routerにいくつかの重要な変更が入りました。この記事では移行時に注意すべきポイントをまとめます。</p><h2>主な変更点</h2><p>revalidateTagの仕様変更、非同期paramsの導入など...</p>',
    category: '技術',
    tags: 'Next.js,React,TypeScript',
    description:
      'Next.js 16で変わったApp Routerの仕様と、既存プロジェクトからの移行ガイド。revalidateTag、非同期params等の変更点を解説。',
    createdAt: '2025-02-01T00:00:00.000Z',
    updatedAt: '2025-02-01T00:00:00.000Z',
    publishedAt: '2025-02-01T00:00:00.000Z',
    revisedAt: '2025-02-01T00:00:00.000Z',
  },
  {
    id: 'mock-blog-2',
    title: 'Tailwind CSS v4が最高だった話',
    body: '<h2>CSS-firstのアプローチ</h2><p>Tailwind CSS v4では設定ファイルが不要になり、CSSファイル内で@themeディレクティブを使ってカスタマイズできるようになりました。</p>',
    category: '技術',
    tags: 'Tailwind CSS,CSS,フロントエンド',
    description:
      'Tailwind CSS v4の@theme inlineディレクティブ、CSS変数ベースの設計、v3からの移行体験について。',
    createdAt: '2025-01-20T00:00:00.000Z',
    updatedAt: '2025-01-20T00:00:00.000Z',
    publishedAt: '2025-01-20T00:00:00.000Z',
    revisedAt: '2025-01-20T00:00:00.000Z',
  },
  {
    id: 'mock-blog-3',
    title: 'フリーランス3年目の振り返り - 年収1000万達成までの道のり',
    body: '<h2>フリーランスになったきっかけ</h2><p>2021年にフリーランスとして独立し、3年が経ちました。ここまでの道のりと学びを振り返ります。</p>',
    category: '日記',
    tags: 'フリーランス,キャリア',
    description:
      'フリーランスフロントエンドエンジニアとして独立3年目の振り返り。案件獲得、スキルアップ、収入の変遷について。',
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2025-01-10T00:00:00.000Z',
    publishedAt: '2025-01-10T00:00:00.000Z',
    revisedAt: '2025-01-10T00:00:00.000Z',
  },
  {
    id: 'mock-blog-4',
    title: 'Zodバリデーションの実践パターン集',
    body: '<h2>Zodとは</h2><p>ZodはTypeScript向けのスキーマバリデーションライブラリです。React Hook Formとの組み合わせが強力です。</p>',
    category: '技術',
    tags: 'Zod,TypeScript,React Hook Form',
    description:
      'ZodとReact Hook Formを組み合わせたフォームバリデーションの実践パターン。エラーハンドリングからカスタムバリデーションまで。',
    createdAt: '2024-12-15T00:00:00.000Z',
    updatedAt: '2024-12-15T00:00:00.000Z',
    publishedAt: '2024-12-15T00:00:00.000Z',
    revisedAt: '2024-12-15T00:00:00.000Z',
  },
  {
    id: 'mock-blog-5',
    title: '横浜のおすすめ作業カフェ5選',
    body: '<h2>フリーランスの作業場所</h2><p>横浜在住のフリーランスエンジニアが厳選した、作業がはかどるカフェを紹介します。</p>',
    category: 'レビュー',
    tags: '横浜,カフェ,リモートワーク',
    description:
      '横浜エリアでフリーランスエンジニアが作業するのにおすすめのカフェ5選。Wi-Fi、電源、雰囲気を評価。',
    createdAt: '2024-11-20T00:00:00.000Z',
    updatedAt: '2024-11-20T00:00:00.000Z',
    publishedAt: '2024-11-20T00:00:00.000Z',
    revisedAt: '2024-11-20T00:00:00.000Z',
  },
  {
    id: 'mock-blog-6',
    title: 'microCMS + Next.jsでブログを作る完全ガイド',
    body: '<h2>構成</h2><p>microCMSとNext.jsの組み合わせは、日本語コンテンツのブログに最適です。ISRによる高速表示とWebhookによる即時更新を両立できます。</p>',
    category: '技術',
    tags: 'microCMS,Next.js,ヘッドレスCMS',
    description:
      'microCMSとNext.js App Routerを使ったブログ構築の完全ガイド。ISR、Webhook、プレビューモードの実装方法を解説。',
    createdAt: '2024-10-05T00:00:00.000Z',
    updatedAt: '2024-10-05T00:00:00.000Z',
    publishedAt: '2024-10-05T00:00:00.000Z',
    revisedAt: '2024-10-05T00:00:00.000Z',
  },
];
