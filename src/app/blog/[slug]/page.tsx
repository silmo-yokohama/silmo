import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
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
          <article>
            {/* ヘッダー */}
            <header className="mb-10">
              {/* カテゴリとタグ */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="primary">{blog.category}</Badge>
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* タイトル */}
              <h1 className="mb-4 font-[family-name:var(--font-pixel)] text-2xl text-text-main sm:text-3xl">
                {blog.title}
              </h1>

              {/* 公開日・更新日 */}
              <div className="flex flex-wrap gap-4 text-sm text-text-dark">
                {blog.publishedAt && <time dateTime={blog.publishedAt}>公開: {formatDate(blog.publishedAt)}</time>}
                {blog.updatedAt && blog.updatedAt !== blog.publishedAt && (
                  <time dateTime={blog.updatedAt}>更新: {formatDate(blog.updatedAt)}</time>
                )}
              </div>

              {/* サムネイル */}
              {blog.thumbnail && (
                <div className="relative mt-6 aspect-video overflow-hidden rounded-lg">
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
        </Container>
      </Section>
    </>
  );
}
