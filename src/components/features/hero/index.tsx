'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { PROFILE, SITE } from '@/lib/constants';

/** タイプライターで表示するテキスト */
const TYPING_TEXTS = [
  'Webアプリケーション開発',
  'フロントエンド設計',
  'React / Next.js',
  'Vue.js / Nuxt 3',
  'TypeScript',
];

/**
 * ヒーローセクション
 * タイプライターアニメーション付きの自己紹介エリア
 */
export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // 文字を追加
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        // テキスト全体を表示し終えたら、一定時間後に削除開始
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // 文字を削除
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        // 全削除したら次のテキストへ
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* 背景のグリッドパターン */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* サブテキスト */}
          <p className="font-[family-name:var(--font-press-start)] text-[10px] tracking-wider text-primary sm:text-xs">
            FREELANCE FRONTEND ENGINEER
          </p>

          {/* メインタイトル */}
          <h1 className="font-[family-name:var(--font-pixel)] text-4xl text-text-main pixel-text-shadow sm:text-5xl md:text-6xl">
            {SITE.name}
          </h1>

          {/* タイプライターテキスト */}
          <div className="flex items-center gap-1">
            <span className="text-lg text-text-sub sm:text-xl">&gt; </span>
            <span className="text-lg text-accent sm:text-xl">{displayText}</span>
            <span className="blink-cursor text-lg sm:text-xl" />
          </div>

          {/* 説明文 */}
          <p className="max-w-2xl leading-relaxed text-text-sub">{PROFILE.bio}</p>

          {/* CTAボタン群 */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" pixel>
                お問い合わせ
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                もっと知る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
