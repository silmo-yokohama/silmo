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
 * ブログ記事カード
 * ホバー時にピクセルアート風グロー・スキャンラインエフェクトが発動する
 */
export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`} className="group">
      <motion.div
        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-text-dark/20 bg-bg-card transition-colors duration-300 group-hover:border-primary/60"
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
        {blog.thumbnail && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={blog.thumbnail.url}
              alt={blog.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        {/* コンテンツ */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* カテゴリとタグ */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">{blog.category}</Badge>
            <span className="text-xs text-text-dark">{formatDateShort(blog.publishedAt!)}</span>
          </div>

          {/* タイトル */}
          <h3 className="text-lg font-bold text-text-main transition-colors duration-200 group-hover:text-primary">
            {blog.title}
          </h3>

          {/* 概要 */}
          {blog.description && (
            <p className="text-sm leading-relaxed text-text-sub">
              {truncate(blog.description, 100)}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
