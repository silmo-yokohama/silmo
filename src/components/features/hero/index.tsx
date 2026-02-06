'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GlitchText, PixelParticles } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { PROFILE, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

/** タイプライターで表示するコマンド */
const TYPING_COMMANDS = [
  { cmd: 'skill --list', output: 'React / Next.js / Vue / Nuxt3' },
  { cmd: 'lang --primary', output: 'TypeScript' },
  { cmd: 'status', output: 'Freelance - Available' },
  { cmd: 'location', output: 'Yokohama, Kanagawa' },
];

/** ステータスバーの表示情報 */
const STATUS_ITEMS = [
  { label: 'EXP', value: `${new Date().getFullYear() - PROFILE.career.startYear}年+`, color: 'var(--color-primary)' },
  { label: 'CLASS', value: 'Frontend', color: 'var(--color-accent)' },
  { label: 'LV', value: '35', color: 'var(--color-primary-light)' },
];

/**
 * ヒーローセクション
 * レトロゲームのターミナル風UIをモチーフとした自己紹介エリア。
 * パーティクル背景、グリッチタイトル、タイプライターコマンド、
 * ステータスバーを組み合わせたインパクトのあるデザイン。
 *
 * ターミナルは高さ固定（常に1コマンド分のみ表示）で
 * モバイル時にレイアウトがズレないようにする。
 */
export function Hero() {
  const [currentCmd, setCurrentCmd] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [phase, setPhase] = useState<'typing' | 'output' | 'pause'>('typing');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const command = TYPING_COMMANDS[currentCmd];

    if (phase === 'typing') {
      if (charIndex < command.cmd.length) {
        const timer = setTimeout(() => {
          setDisplayText(command.cmd.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 60);
        return () => clearTimeout(timer);
      }
      // タイピング完了 → 出力表示
      const timer = setTimeout(() => {
        setShowOutput(true);
        setPhase('output');
      }, 300);
      return () => clearTimeout(timer);
    }

    if (phase === 'output') {
      const timer = setTimeout(() => {
        setPhase('pause');
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (phase === 'pause') {
      const timer = setTimeout(() => {
        // 次のコマンドへ切り替え（前のコマンドは消去して常に1つだけ表示）
        setCurrentCmd((prev) => (prev + 1) % TYPING_COMMANDS.length);
        setDisplayText('');
        setShowOutput(false);
        setCharIndex(0);
        setPhase('typing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [charIndex, currentCmd, phase]);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* ピクセルパーティクル背景 */}
      <PixelParticles count={30} />

      {/* グリッドパターン背景 */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* ビネットオーバーレイ（画面端を暗く） */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15, 15, 35, 0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* コンテンツ: モバイルは上寄せ、PCは垂直中央 */}
      <div className="mx-auto flex w-full max-w-6xl items-start px-4 pt-16 sm:px-6 lg:items-center lg:px-8 lg:pt-0">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* 左カラム: メイン情報 */}
          <div className="flex flex-1 flex-col gap-6">
            {/* ステータスバー */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {STATUS_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <span
                    className="font-[family-name:var(--font-press-start)] text-[8px] sm:text-[10px]"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                  <span className="font-[family-name:var(--font-pixel)] text-sm text-text-main sm:text-base">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* サブテキスト */}
            <motion.p
              className="font-[family-name:var(--font-press-start)] text-[10px] tracking-wider text-primary sm:text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              FREELANCE FRONTEND ENGINEER
            </motion.p>

            {/* メインタイトル（グリッチ付き） */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <GlitchText
                as="h1"
                className="font-[family-name:var(--font-pixel)] text-5xl text-text-main pixel-text-shadow sm:text-6xl md:text-7xl"
              >
                {SITE.name}
              </GlitchText>
            </motion.div>

            {/* 説明文 */}
            <motion.p
              className="max-w-2xl leading-relaxed text-text-sub"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              {PROFILE.bio}
            </motion.p>

            {/* CTAボタン群 */}
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Link href="/sandbox">
                <Button variant="primary" size="lg" pixel>
                  作品を見る
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" pixel>
                  プロフィール
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* 右カラム: ターミナルウィンドウ */}
          <motion.div
            className="w-full max-w-md lg:flex-shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div className="overflow-hidden rounded-lg border border-text-dark/30 bg-bg-secondary/80 backdrop-blur-sm">
              {/* ウィンドウタイトルバー */}
              <div className="flex items-center gap-2 border-b border-text-dark/20 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 font-[family-name:var(--font-pixel)] text-xs text-text-dark">
                  silmo@terminal
                </span>
              </div>

              {/* ===== PC用ターミナル（履歴蓄積・高さ可変） ===== */}
              <div className="hidden p-4 font-[family-name:var(--font-code)] text-sm lg:block">
                {/* 過去のコマンド履歴 */}
                {TYPING_COMMANDS.slice(0, currentCmd).map((cmd, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">$</span>
                      <span className="text-text-sub">{cmd.cmd}</span>
                    </div>
                    <div className="ml-4 text-accent">{cmd.output}</div>
                  </div>
                ))}

                {/* 現在入力中のコマンド */}
                <div className="mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-text-main">{displayText}</span>
                    {!showOutput && (
                      <motion.span
                        className="inline-block h-4 w-2 bg-primary"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], ease: 'linear' }}
                      />
                    )}
                  </div>
                  {showOutput && (
                    <motion.div
                      className="ml-4 text-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {TYPING_COMMANDS[currentCmd].output}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* ===== モバイル用ターミナル（1コマンド固定高さ） ===== */}
              <div className="h-[120px] p-4 font-[family-name:var(--font-code)] text-sm lg:hidden">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-text-main">{displayText}</span>
                    {!showOutput && (
                      <motion.span
                        className="inline-block h-4 w-2 bg-primary"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 1], ease: 'linear' }}
                      />
                    )}
                  </div>
                  {showOutput && (
                    <motion.div
                      className="ml-4 mt-1 text-accent"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {TYPING_COMMANDS[currentCmd].output}
                    </motion.div>
                  )}
                </div>

                {/* 次のコマンドプロンプト（待機演出） */}
                {showOutput && (
                  <motion.div
                    className="mt-3 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <span className="text-primary">$</span>
                    <motion.span
                      className="inline-block h-4 w-2 bg-primary"
                      animate={{ opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, times: [0, 0.5, 1], ease: 'linear' }}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* ターミナル下のコマンド履歴ドットインジケーター（モバイルのみ） */}
            <div className="mt-3 flex items-center justify-center gap-2 lg:hidden">
              {TYPING_COMMANDS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-all duration-300',
                    i === currentCmd ? 'scale-125 bg-primary' : 'bg-text-dark/40',
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
