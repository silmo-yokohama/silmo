# My Portfolio Website

これは SilMo（シルモ）Web サイトのソースコードです。

## 技術スタック

このプロジェクトは以下の技術スタックを使用しています：

- [Laravel 11](https://laravel.com/)
- [Inertia.js](https://inertiajs.com/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [WordPress](https://wordpress.org/)

## 概要

このサイトは私のホームページであると同時にポートフォリオです。主な特徴は以下の通りです：

- WordPress と連動したヘッドレス CMS
- Laravel で API を作成
- バックエンド側で GraphQL クエリを発行し、WordPress からコンテンツを取得
- その他これから追記予定

## 利用ライブラリ

プロジェクトで使用している主要なライブラリは以下の通りです：

- [DaisyUI](https://daisyui.com/)
- [Redux](https://redux.js.org/)
- [React-Scroll-Parallax](https://react-scroll-parallax.damnthat.tv/)
- [React-Spring](https://www.react-spring.dev/)

## 開発ツール

開発プロセスを支援するために以下のツールを使用しています：

- フォーマッタ：[Prettier](https://prettier.io/)
- Lint：[ESLint](https://eslint.org/)
- 単体テスト：[Jest](https://jestjs.io/)

## こだわったところ

ユーザー体験を損なわない UI 設計を意識しました。
UI/UX 分野に明るくないので、これが正解かどうかはわかりませんが、
私自身が利用して「わかりやすい！」「かっこいい！」と思うようなデザインで構築しました。

また、WordPress は元々得意な分野<sup>\*</sup>でしたが昨今ではかなり下火気味なので、
モダンなフロントエンドを取り入れながらヘッドレス CMS として活用することにしました。
※とはいえ WordPress 側の機能はほぼプラグインで対応したのでほとんど開発していません…。

## 苦労したところ

Laravel は ver.9 から学習し始めたのですが、あっという間に 11 までバージョンが上がって
キャッチアップが追いついていない部分が多々あり、
「あれ？なんで動かない？」ってなったことが何度かありました。

調べたらすぐ出てきたので大きく詰まったわけではなかったですが、
API 作成時に route/api.php に Route 設定をしても 404 になってしまったときは面食らいました…。

## 今後の展望

TechBlog などをやりたい！とは思うのですが文章を書くのが得意ではないので思案中です。。。
実績とはいえないレベルの新しいスキル・ライブラリのお試し系を掲載できるようなコンテンツは作っていきたいなと考えてます。
