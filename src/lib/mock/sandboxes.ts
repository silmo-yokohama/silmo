import type { Sandbox } from '@/types/sandbox';

/**
 * サンドボックスのモックデータ
 * microCMSにデータがない開発時にUIを確認するためのフィクスチャ
 */
export const MOCK_SANDBOXES: Sandbox[] = [
  {
    id: 'mock-sandbox-1',
    title: 'SilMo Portfolio',
    description:
      '<p>Next.js 16 + Tailwind CSS v4で構築したポートフォリオサイト。レトロゲーム風のピクセルアート美学をテーマに、microCMSでコンテンツ管理を行っています。</p>',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'microCMS'],
    siteUrl: 'https://silmo.jp',
    githubUrl: 'https://github.com/silmo-yokohama/silmo-portfolio',
    purpose: 'ポートフォリオサイトの新規構築。ピクセルアート風デザインとモダンWebの融合を実験。',
    status: '開発中',
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-02-01T00:00:00.000Z',
    publishedAt: '2025-01-15T00:00:00.000Z',
    revisedAt: '2025-02-01T00:00:00.000Z',
  },
  {
    id: 'mock-sandbox-2',
    title: 'Pixel Chat',
    description:
      '<p>WebSocketを使ったリアルタイムチャットアプリ。レトロゲーム風のUIで、メッセージがピクセルアニメーションで表示されます。</p>',
    technologies: ['Nuxt 3', 'Socket.io', 'Prisma', 'PostgreSQL'],
    siteUrl: 'https://pixel-chat.example.com',
    githubUrl: 'https://github.com/silmo-yokohama/pixel-chat',
    purpose: 'WebSocket通信とリアルタイムUIの技術検証。Nuxt 3のServer Engine活用。',
    status: '完成',
    createdAt: '2024-08-10T00:00:00.000Z',
    updatedAt: '2024-12-20T00:00:00.000Z',
    publishedAt: '2024-08-10T00:00:00.000Z',
    revisedAt: '2024-12-20T00:00:00.000Z',
  },
  {
    id: 'mock-sandbox-3',
    title: 'Task Quest',
    description:
      '<p>タスク管理をRPG風にゲーミフィケーション化したWebアプリ。タスク完了でEXPが貯まり、レベルアップする仕組み。</p>',
    technologies: ['React', 'TypeScript', 'Zustand', 'Tailwind CSS'],
    githubUrl: 'https://github.com/silmo-yokohama/task-quest',
    purpose: 'ゲーミフィケーションの設計パターンとZustandによる状態管理の学習。',
    status: '完成',
    createdAt: '2024-05-01T00:00:00.000Z',
    updatedAt: '2024-07-15T00:00:00.000Z',
    publishedAt: '2024-05-01T00:00:00.000Z',
    revisedAt: '2024-07-15T00:00:00.000Z',
  },
  {
    id: 'mock-sandbox-4',
    title: 'Go API Boilerplate',
    description:
      '<p>Go + Echo + SQLCで構築したREST APIのボイラープレート。DDD風のレイヤードアーキテクチャを採用。</p>',
    technologies: ['Go', 'Echo', 'SQLC', 'Docker', 'PostgreSQL'],
    githubUrl: 'https://github.com/silmo-yokohama/go-api-boilerplate',
    purpose: 'バックエンド（Go）の学習とDDDアーキテクチャの実践。',
    status: '開発中',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-02-01T00:00:00.000Z',
    publishedAt: '2025-01-01T00:00:00.000Z',
    revisedAt: '2025-02-01T00:00:00.000Z',
  },
  {
    id: 'mock-sandbox-5',
    title: 'Yokohama Gourmet Map',
    description:
      '<p>横浜のグルメスポットをマップ上にプロットするWebアプリ。Mapbox GL JSでインタラクティブな地図を表示。</p>',
    technologies: ['Next.js', 'Mapbox GL JS', 'Supabase', 'TypeScript'],
    siteUrl: 'https://yokohama-gourmet.example.com',
    purpose: '地理情報データの扱いとMapbox APIの技術検証。趣味のグルメ探索を兼ねて。',
    status: 'メンテナンス中',
    createdAt: '2023-11-01T00:00:00.000Z',
    updatedAt: '2024-09-10T00:00:00.000Z',
    publishedAt: '2023-11-01T00:00:00.000Z',
    revisedAt: '2024-09-10T00:00:00.000Z',
  },
  {
    id: 'mock-sandbox-6',
    title: 'Retro Snake Game',
    description:
      '<p>Canvas APIで作ったクラシックなスネークゲーム。ピクセルアート風のグラフィックとチップチューン風サウンド。</p>',
    technologies: ['TypeScript', 'Canvas API', 'Web Audio API'],
    siteUrl: 'https://snake.example.com',
    githubUrl: 'https://github.com/silmo-yokohama/retro-snake',
    purpose: 'Canvas APIとWeb Audio APIの学習。ゲーム開発の基礎を体験。',
    status: '完成',
    createdAt: '2023-06-01T00:00:00.000Z',
    updatedAt: '2023-08-15T00:00:00.000Z',
    publishedAt: '2023-06-01T00:00:00.000Z',
    revisedAt: '2023-08-15T00:00:00.000Z',
  },
];
