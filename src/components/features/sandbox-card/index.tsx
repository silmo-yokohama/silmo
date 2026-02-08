'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { Sandbox } from '@/types/sandbox';
import { parseTechnologies } from '@/lib/utils';

type SandboxCardProps = {
  sandbox: Sandbox;
};

/** 開発目的に対応するバッジバリアント */
const purposeVariant: Record<string, 'primary' | 'accent' | 'outline' | 'muted'> = {
  学習: 'accent',
  技術検証: 'primary',
  プロダクト: 'primary',
  ポートフォリオ: 'outline',
};

/** 開発目的に対応する英語ラベル */
const purposeLabel: Record<string, string> = {
  学習: 'LEARNING',
  技術検証: 'TECH DEMO',
  プロダクト: 'PRODUCT',
  ポートフォリオ: 'PORTFOLIO',
};

/**
 * サンドボックス（個人開発プロジェクト）カード
 * RPGインベントリアイテム風のデザイン
 * ホバー時にピクセルグロー・スキャンラインエフェクトが発動する
 */
export function SandboxCard({ sandbox }: SandboxCardProps) {
  /** セレクトフィールドの配列から最初の値を取得 */
  const purpose = sandbox.purpose?.[0] ?? '';
  const technologies = parseTechnologies(sandbox.technologies);

  return (
    <Link href={`/sandbox/${sandbox.id}`} className="block">
    <motion.div
      className="group relative flex h-full flex-col overflow-hidden border-2 border-text-dark/30 bg-bg-card transition-all duration-300 hover:border-primary"
      whileHover={{
        boxShadow: '0 0 20px 2px rgba(0, 161, 151, 0.25), inset 0 0 20px rgba(0, 161, 151, 0.05)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* ホバー時スキャンラインオーバーレイ */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 161, 151, 0.04) 2px,
            rgba(0, 161, 151, 0.04) 4px
          )`,
        }}
      />

      {/* 上部アクセントライン */}
      <div className="h-[3px] w-full bg-gradient-to-r from-primary via-accent to-primary-light opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      {/* サムネイル */}
      {sandbox.thumbnail ? (
        <div className="relative aspect-video overflow-hidden border-b-2 border-text-dark/20">
          <Image
            src={sandbox.thumbnail.url}
            alt={sandbox.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* 画像オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
          {/* 開発目的バッジ（画像内） */}
          <div className="absolute bottom-2 left-3">
            <Badge variant={purposeVariant[purpose] || 'muted'}>
              {purposeLabel[purpose] || purpose}
            </Badge>
          </div>
        </div>
      ) : (
        /* サムネイルなし時のピクセルパターン */
        <div className="relative flex aspect-video items-center justify-center border-b-2 border-text-dark/20 bg-bg-secondary">
          <div className="grid grid-cols-4 gap-1 opacity-20" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="h-3 w-3"
                style={{
                  backgroundColor:
                    i % 3 === 0
                      ? 'var(--color-primary)'
                      : i % 3 === 1
                        ? 'var(--color-accent)'
                        : 'var(--color-primary-light)',
                  opacity: 0.3 + (i % 4) * 0.2,
                }}
              />
            ))}
          </div>
          {/* 開発目的バッジ */}
          <div className="absolute bottom-2 left-3">
            <Badge variant={purposeVariant[purpose] || 'muted'}>
              {purposeLabel[purpose] || purpose}
            </Badge>
          </div>
        </div>
      )}

      {/* コンテンツ */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* タイトル */}
        <h3 className="font-[family-name:var(--font-pixel)] text-sm text-text-main transition-colors duration-200 group-hover:text-primary">
          {sandbox.title}
        </h3>

        {/* 使用技術（装備リスト風） */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* 詳細リンク（RPGコマンド風） */}
        <div className="mt-auto border-t border-text-dark/20 pt-3">
          <span className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[10px] text-primary transition-colors group-hover:text-accent">
            <span className="text-accent" aria-hidden="true">▶</span>
            DETAIL
          </span>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
