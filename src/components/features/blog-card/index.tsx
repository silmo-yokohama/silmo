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
 * 記事一覧やホームページの最新記事表示に使用する
 */
export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-text-dark/20 bg-bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(0,161,151,0.15)]"
    >
      {/* サムネイル */}
      {blog.thumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={blog.thumbnail.url}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
        <h3 className="text-lg font-bold text-text-main transition-colors group-hover:text-primary">
          {blog.title}
        </h3>

        {/* 概要 */}
        {blog.description && (
          <p className="text-sm leading-relaxed text-text-sub">
            {truncate(blog.description, 100)}
          </p>
        )}
      </div>
    </Link>
  );
}
