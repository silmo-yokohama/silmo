'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { formatDateShort, truncate } from '@/lib/utils';
import type { Blog } from '@/types/blog';

type BlogCardProps = {
  blog: Blog;
};

/**
 * ブログ記事カード（RPGメッセージログ風）
 * ホバー時にピクセルグロー・スキャンラインエフェクトが発動する
 */
export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`} className="group">
      <motion.div
        className="relative flex h-full flex-col overflow-hidden border-2 border-text-dark/30 bg-bg-card transition-all duration-300 group-hover:border-primary"
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
        {blog.thumbnail ? (
          <div className="relative aspect-video overflow-hidden border-b-2 border-text-dark/20">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
          </div>
        ) : (
          /* サムネイルなし時のピクセルパターン */
          <div className="flex aspect-video items-center justify-center border-b-2 border-text-dark/20 bg-bg-secondary">
            <span className="font-[family-name:var(--font-pixel)] text-2xl text-text-dark/30" aria-hidden="true">
              BLOG
            </span>
          </div>
        )}

        {/* コンテンツ */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          {/* カテゴリと日付 */}
          <div className="flex items-center gap-2">
            <Badge variant="accent">{blog.category}</Badge>
            <span className="font-[family-name:var(--font-press-start)] text-[7px] text-text-dark">
              {formatDateShort(blog.publishedAt!)}
            </span>
          </div>

          {/* タイトル */}
          <h3 className="font-[family-name:var(--font-pixel)] text-sm text-text-main transition-colors duration-200 group-hover:text-primary">
            {blog.title}
          </h3>

          {/* 概要 */}
          {blog.description && (
            <p className="text-xs leading-relaxed text-text-sub">
              {truncate(blog.description, 80)}
            </p>
          )}

          {/* READ MORE（RPGコマンド風） */}
          <div className="mt-auto border-t border-text-dark/20 pt-2">
            <span className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[10px] text-primary transition-colors group-hover:text-accent">
              <span className="text-accent" aria-hidden="true">▶</span>
              READ MORE
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
