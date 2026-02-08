'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { Career } from '@/types/career';
import { formatPeriod, parseTechnologies } from '@/lib/utils';

type ProductionCardProps = {
  career: Career;
};

/**
 * 受託制作カード（サンドボックスカードと同様のグリッドレイアウト）
 * HP制作など個人受託案件を表示する
 */
export function ProductionCard({ career }: ProductionCardProps) {
  return (
    <Link href={`/career/${career.id}`} className="block">
      <motion.div
        className="group relative flex h-full flex-col overflow-hidden border-2 border-text-dark/30 bg-bg-card transition-all duration-300 hover:border-accent"
        whileHover={{
          boxShadow: '0 0 20px 2px rgba(248, 182, 43, 0.25), inset 0 0 20px rgba(248, 182, 43, 0.05)',
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
              rgba(248, 182, 43, 0.04) 2px,
              rgba(248, 182, 43, 0.04) 4px
            )`,
          }}
        />

        {/* 上部アクセントライン */}
        <div className="h-[3px] w-full bg-gradient-to-r from-accent via-primary to-accent-light opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

        {/* サムネイル */}
        {career.thumbnail ? (
          <div className="relative aspect-video overflow-hidden border-b-2 border-text-dark/20">
            <Image
              src={career.thumbnail.url}
              alt={career.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* 画像オーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
            {/* 期間バッジ（画像内） */}
            <div className="absolute bottom-2 left-3">
              <Badge variant="accent">
                {formatPeriod(career.start, career.period)}
              </Badge>
            </div>
          </div>
        ) : (
          /* サムネイルなし時のピクセルパターン */
          <div className="relative flex aspect-video items-center justify-center border-b-2 border-text-dark/20 bg-bg-secondary">
            <span className="font-[family-name:var(--font-pixel)] text-2xl text-text-dark/30" aria-hidden="true">
              WEB
            </span>
            {/* 期間バッジ */}
            <div className="absolute bottom-2 left-3">
              <Badge variant="accent">
                {formatPeriod(career.start, career.period)}
              </Badge>
            </div>
          </div>
        )}

        {/* コンテンツ */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* ロール */}
          {career.role && (
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-accent">
              [{career.role}]
            </span>
          )}

          {/* タイトル */}
          <h3 className="font-[family-name:var(--font-pixel)] text-sm text-text-main transition-colors duration-200 group-hover:text-accent">
            {career.title}
          </h3>

          {/* 使用技術 */}
          {career.technologies && parseTechnologies(career.technologies).length > 0 && (
            <div className="flex flex-wrap gap-1">
              {parseTechnologies(career.technologies).map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* 詳細リンク（RPGコマンド風） */}
          <div className="mt-auto border-t border-text-dark/20 pt-3">
            <span className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[10px] text-accent transition-colors group-hover:text-primary">
              <span className="text-primary" aria-hidden="true">▶</span>
              DETAIL
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
