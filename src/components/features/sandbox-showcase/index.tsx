'use client';

import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

import { SandboxCard } from '@/components/features/sandbox-card';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import type { Sandbox } from '@/types/sandbox';

type SandboxShowcaseProps = {
  sandboxes: Sandbox[];
};

/**
 * サンドボックスショーケース
 * TOPページの目玉セクション。個人開発プロジェクトを
 * スタガーアニメーション付きのグリッドで目立つ形に表示する。
 */
export function SandboxShowcase({ sandboxes }: SandboxShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* 背景装飾: ドットパターン */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      {/* 背景装飾: 左右のグローライン */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 h-px w-1/4 -translate-y-1/2"
        style={{
          background: 'linear-gradient(to right, transparent, var(--color-primary), transparent)',
          opacity: 0.2,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-px w-1/4 -translate-y-1/2"
        style={{
          background: 'linear-gradient(to left, transparent, var(--color-primary), transparent)',
          opacity: 0.2,
        }}
        aria-hidden="true"
      />

      <Container>
        {/* セクションヘッダー */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          {/* ピクセル装飾ドット */}
          <motion.div
            className="mb-4 flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="h-2 w-2 bg-primary" />
            <div className="h-2 w-2 bg-accent" />
            <div className="h-2 w-2 bg-primary-light" />
          </motion.div>

          <p className="mb-2 font-[family-name:var(--font-press-start)] text-[10px] tracking-widest text-accent sm:text-xs">
            SANDBOX
          </p>
          <h2 className="font-[family-name:var(--font-pixel)] text-3xl text-text-main sm:text-4xl">
            個人開発
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-sub">
            技術検証・スキル研鑽のために開発した個人プロジェクトです。
            新しい技術への挑戦やアイデアの具現化に取り組んでいます。
          </p>

          {/* 装飾ライン */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-primary" />
            <div className="h-1 w-4 bg-accent" />
            <div className="h-1 w-2 bg-primary-light" />
          </div>
        </motion.div>

        {/* プロジェクトグリッド */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sandboxes.map((sandbox, i) => (
            <motion.div
              key={sandbox.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <SandboxCard sandbox={sandbox} />
            </motion.div>
          ))}
        </div>

        {/* すべて見るボタン */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link href="/sandbox">
            <Button variant="outline" size="lg">
              すべてのプロジェクトを見る
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
