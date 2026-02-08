import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { JetBrains_Mono, Noto_Sans_JP, Press_Start_2P } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

import './globals.css';

// --- フォント読み込み ---
const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// --- メタデータ ---
export const metadata: Metadata = genMeta();

/**
 * ルートレイアウト
 * 全ページ共通のHeader/Footer、フォント、メタデータを提供する
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${pressStart2P.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        {/* CRTスキャンラインオーバーレイ（レトロゲーム感を演出） */}
        <div className="scanline-overlay" aria-hidden="true" />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google Analytics 4（環境変数未設定時はスキップ） */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_ID} />
        )}
      </body>
    </html>
  );
}
