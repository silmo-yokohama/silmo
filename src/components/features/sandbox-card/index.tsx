'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import type { Sandbox } from '@/types/sandbox';

type SandboxCardProps = {
  sandbox: Sandbox;
};

/** ステータスに対応するバッジバリアント */
const statusVariant: Record<string, 'primary' | 'accent' | 'outline' | 'muted'> = {
  完成: 'primary',
  開発中: 'accent',
  メンテナンス中: 'outline',
  アーカイブ: 'muted',
};

/**
 * サンドボックス（個人開発プロジェクト）カード
 * ホバー時にピクセルアート風グロー・スキャンラインエフェクトが発動する
 */
export function SandboxCard({ sandbox }: SandboxCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-lg border border-text-dark/20 bg-bg-card transition-colors duration-300 hover:border-primary/60"
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 24px 2px rgba(0, 161, 151, 0.2), 0 0 48px 4px rgba(248, 182, 43, 0.08)',
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

      {/* ホバー時 上部アクセントライン */}
      <div className="absolute left-0 right-0 top-0 z-10 h-[2px] scale-x-0 bg-gradient-to-r from-primary via-accent to-primary-light transition-transform duration-500 group-hover:scale-x-100" />

      {/* サムネイル */}
      {sandbox.thumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={sandbox.thumbnail.url}
            alt={sandbox.title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* 画像オーバーレイグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}

      {/* コンテンツ */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* ステータス */}
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[sandbox.status] || 'muted'}>{sandbox.status}</Badge>
        </div>

        {/* タイトル */}
        <h3 className="text-lg font-bold text-text-main transition-colors duration-200 group-hover:text-primary">
          {sandbox.title}
        </h3>

        {/* 使用技術 */}
        {sandbox.technologies && sandbox.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {sandbox.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        {/* 開発目的 */}
        {sandbox.purpose && (
          <p className="text-sm leading-relaxed text-text-sub">{sandbox.purpose}</p>
        )}

        {/* リンク */}
        <div className="mt-auto flex gap-3 pt-2">
          {sandbox.siteUrl && (
            <a
              href={sandbox.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary-light"
            >
              <span>サイトを見る</span>
              <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          )}
          {sandbox.githubUrl && (
            <a
              href={sandbox.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-1 text-sm text-text-sub transition-colors hover:text-text-main"
            >
              <span>GitHub</span>
              <span className="inline-block transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
