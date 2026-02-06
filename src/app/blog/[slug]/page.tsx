import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SITE } from '@/lib/constants';
import { getAllBlogSlugs, getBlogBySlug } from '@/lib/microcms/blogs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { getBlogPostingJsonLd, getPersonJsonLd } from '@/lib/seo/json-ld';
import { formatDate } from '@/lib/utils';

export const revalidate = 3600; // 1時間

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * ブログ詳細ページのメタデータを動的生成する
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    return genMeta({
      title: blog.title,
      description: blog.description || `${blog.title} - ${SITE.name}のブログ記事`,
      path: `/blog/${slug}`,
      ogImage: blog.thumbnail?.url,
    });
  } catch {
    return genMeta({ title: '記事が見つかりません', noIndex: true });
  }
}

/**
 * 静的パス生成（ISR用）
 */
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/**
 * ブログ詳細ページ
 * 記事本文の表示、OGP動的生成、JSON-LD構造化データを実装
 */
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  let blog;

  try {
    blog = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  // タグをカンマ区切りから配列に変換
  const tags: string[] = blog.tags ? blog.tags.split(',').map((t: string) => t.trim()) : [];

  return (
    <>
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getPersonJsonLd(), getBlogPostingJsonLd(blog)]),
        }}
      />

      <Section>
        <Container size="sm">
          {/* パンくずリスト風ナビ */}
          <div className="mb-6 flex items-center gap-2 font-[family-name:var(--font-pixel)] text-xs text-text-dark">
            <Link href="/blog" className="transition-colors hover:text-primary">
              BLOG
            </Link>
            <span aria-hidden="true">&gt;</span>
            <span className="text-text-sub">{blog.title}</span>
          </div>

          {/* メインコンテンツ */}
          <div className="rpg-box p-6 sm:p-8">
            <span className="rpg-label">ARTICLE</span>

            <article>
              {/* ヘッダー */}
              <header className="mb-8 space-y-4 pt-2">
                {/* カテゴリとタグ */}
                <div className="flex flex-wrap items-center gap-2">
                  {blog.category?.map((cat) => (
                    <Badge key={cat} variant="primary">{cat}</Badge>
                  ))}
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* タイトル */}
                <h1 className="font-[family-name:var(--font-pixel)] text-2xl text-text-main pixel-text-shadow sm:text-3xl">
                  {blog.title}
                </h1>

                {/* 公開日・更新日 */}
                <div className="flex flex-wrap gap-4 border-b border-text-dark/20 pb-4 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                  {blog.publishedAt && (
                    <time dateTime={blog.publishedAt}>POST: {formatDate(blog.publishedAt)}</time>
                  )}
                  {blog.updatedAt && blog.updatedAt !== blog.publishedAt && (
                    <time dateTime={blog.updatedAt}>UPDATE: {formatDate(blog.updatedAt)}</time>
                  )}
                </div>

                {/* サムネイル */}
                {blog.thumbnail && (
                  <div className="relative aspect-video overflow-hidden border-2 border-text-dark/30">
                    <Image
                      src={blog.thumbnail.url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 720px"
                      priority
                    />
                  </div>
                )}
              </header>

              {/* 本文 */}
              <div
                className="prose-microcms"
                dangerouslySetInnerHTML={{ __html: blog.body }}
              />
            </article>
          </div>

          {/* 戻るボタン */}
          <div className="mt-8">
            <Link href="/blog">
              <Button variant="ghost" pixel>
                ← 一覧に戻る
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
