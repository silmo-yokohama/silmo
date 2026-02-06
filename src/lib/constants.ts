/**
 * サイト全体の定数定義
 * プロフィール情報、ナビゲーション、サイト情報を一元管理
 */

/** サイト基本情報 */
export const SITE = {
  name: 'SilMo',
  title: 'SilMo - フリーランスフロントエンドエンジニア',
  description:
    'フリーランスフロントエンドエンジニア SilMo（清水陽平）のポートフォリオサイト。受託開発の実績、個人開発プロジェクト、技術ブログを公開しています。',
  url: 'https://silmo.jp',
  locale: 'ja_JP',
  language: 'ja',
} as const;

/** プロフィール情報 */
export const PROFILE = {
  name: '清水 陽平',
  nameEn: 'Yohei Shimizu',
  handle: 'SilMo',
  role: 'フリーランス フロントエンドエンジニア',
  location: '横浜',
  bio: 'Nuxt3/Next.jsを中心としたフロントエンド開発を得意とするフリーランスエンジニア。ユーザー体験を重視した高品質なWebアプリケーションの開発に取り組んでいます。',
  birthday: '1990-02-06',
  career: {
    startYear: 2015,
    freelanceStartYear: 2021,
  },
} as const;

/** SNSリンク */
export const SOCIAL_LINKS = {
  twitter: {
    url: 'https://x.com/silmo_yokohama',
    label: 'X (Twitter)',
    handle: '@silmo_yokohama',
  },
  github: {
    url: 'https://github.com/silmo-yokohama',
    label: 'GitHub',
    handle: 'silmo-yokohama',
  },
} as const;

/** ナビゲーション定義 */
export const NAV_ITEMS = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '自己紹介' },
  { href: '/career', label: '職務経歴' },
  { href: '/sandbox', label: 'サンドボックス' },
  { href: '/blog', label: 'ブログ' },
  { href: '/contact', label: 'お問い合わせ' },
] as const;

/** 技術スキル一覧 */
export const TECH_SKILLS = {
  frontend: {
    label: 'フロントエンド',
    skills: [
      { name: 'React / Next.js', level: 5 },
      { name: 'Vue.js / Nuxt 3', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'HTML / CSS', level: 5 },
      { name: 'JavaScript', level: 5 },
    ],
  },
  backend: {
    label: 'バックエンド',
    skills: [
      { name: 'Node.js', level: 3 },
      { name: 'Go', level: 2 },
      { name: 'PHP / Laravel', level: 3 },
    ],
  },
  tools: {
    label: 'ツール・その他',
    skills: [
      { name: 'Git / GitHub', level: 5 },
      { name: 'Docker', level: 3 },
      { name: 'Figma', level: 3 },
      { name: 'Vercel', level: 4 },
      { name: 'microCMS', level: 4 },
    ],
  },
} as const;

/** お問い合わせの件名選択肢 */
export const CONTACT_SUBJECTS = [
  { value: 'general', label: '一般的なお問い合わせ' },
  { value: 'consultation', label: '案件のご相談' },
  { value: 'estimate', label: 'お見積もりのご依頼' },
  { value: 'bug', label: '不具合のご報告' },
  { value: 'other', label: 'その他' },
] as const;

/** ブログカテゴリ */
export const BLOG_CATEGORIES = [
  { value: 'tech', label: '技術' },
  { value: 'diary', label: '日記' },
  { value: 'review', label: 'レビュー' },
] as const;

/** ISR再検証期間（秒） */
export const REVALIDATE_TIME = {
  short: 3600, // 1時間
  long: 86400, // 24時間
} as const;
