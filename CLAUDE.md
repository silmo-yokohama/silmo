# SilMo ポートフォリオ - 開発ルール

## Git 運用

### ブランチ戦略

- **`main`**: 本番デプロイ用。直接コミット・Push 禁止
- **`develop`**: 開発ブランチ。通常の開発作業はここで行う
- **`feature/*`**: 大きな機能追加時に `develop` から分岐（任意）
- `main` へのマージは **GitHub 上の PR 経由のみ**（ローカルマージ禁止）

### コミットルール

- メッセージは **日本語** で記述する
- Conventional Commits 形式に準拠する
  - `feat:` 新機能
  - `fix:` バグ修正
  - `refactor:` リファクタリング
  - `style:` スタイル変更（UI/CSS）
  - `docs:` ドキュメント
  - `chore:` 雑務（依存更新、設定変更等）
  - `test:` テスト追加・修正
- 例: `feat: ブログ詳細ページにOGP画像を追加`
- `main` への force push は **絶対禁止**

### PR ルール

- `develop` → `main` への PR を作成する
- タイトルは変更内容を端的に（日本語）
- 本文に変更概要とテスト確認事項を記載する

---

## 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Next.js (App Router) | 16 |
| UI | React | 19 |
| 言語 | TypeScript | 5 |
| スタイリング | Tailwind CSS | v4 |
| CMS | microCMS (Hobby プラン) | - |
| ホスティング | Vercel (Free プラン) | - |
| バリデーション | Zod | 4 |
| フォーム | React Hook Form | 7 |
| アニメーション | motion (framer-motion) | - |

### 技術的な注意事項

#### Next.js 16

- `params` は `Promise<{ slug: string }>` 型（非同期パラメータ）
- `export const revalidate = 3600` はリテラル値のみ（定数参照は不可）
- `revalidatePath()` を使用する（`revalidateTag()` は第2引数が必須に変更されたため）

#### microcms-js-sdk v3

- `MicroCMSClient` はパラメータ型であり、インスタンス型ではない
- インスタンス型は `ReturnType<typeof createClient>` で取得する
- `createClient` は空文字列を許容しない → ビルド時に Proxy で回避

#### Tailwind CSS v4

- `@theme inline` ディレクティブでカスタムプロパティを定義
- CSS 変数ベース（`--color-*`, `--font-*`）

#### Zod v4

- `z.enum()` の `errorMap` → `error` プロパティに変更

### 依存追加のルール

- 新しいパッケージを追加する前に、既存の依存で代替できないか検討する
- Vercel Free プランのバンドルサイズ制限を意識する
- `devDependencies` と `dependencies` を正しく分類する

---

## コンポーネント設計

### 3 層分類

| カテゴリ | ディレクトリ | 責務 | 例 |
|---------|-------------|------|-----|
| **ui** | `src/components/ui/` | 再利用可能な最小 UI パーツ。ドメイン知識を持たない | Button, Badge, Input |
| **features** | `src/components/features/` | ドメインに紐づく機能ブロック | CareerCard, BlogCard, ContactForm |
| **layout** | `src/components/layout/` | ページ構造・ナビゲーション | Header, Footer, Container |

### ファイル構成

- 1 コンポーネント = 1 ディレクトリ + `index.tsx`
- 例: `src/components/ui/button/index.tsx`
- コンポーネント固有の型は同ファイル内に定義する
- 複数ページで使う型は `src/types/` に分離する

### 命名規約

- コンポーネント: PascalCase（`CareerCard`）
- ディレクトリ: kebab-case（`career-card/`）
- ユーティリティ関数: camelCase（`formatDate`）
- 定数: UPPER_SNAKE_CASE（`MOCK_BLOGS`）
- CSS クラス（カスタム）: kebab-case（`rpg-box`, `pixel-text-shadow`）

### デザインテーマ

- **ダークテーマのみ**（ライトモード非対応）
- レトロゲーム（16-bit）のドットアート美学 × モダン Web
- RPG 風 UI 要素: `.rpg-box`, `.rpg-label`, `.rpg-bar` 等を活用
- ピクセルフォント: 見出しに PixelMplus12、英語補助に Press Start 2P
- 本文: Noto Sans JP

---

## データフェッチ

- microCMS API 関数は `src/lib/microcms/` に集約する
- モックデータは `src/lib/mock/` に配置し、microCMS 未接続時のフォールバックとして使用する
- ISR（`export const revalidate`）を基本とし、On-demand Revalidation は Webhook 経由で実施する
