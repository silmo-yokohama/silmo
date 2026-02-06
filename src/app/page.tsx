import Link from 'next/link';

import { BlogCard } from '@/components/features/blog-card';
import { Hero } from '@/components/features/hero';
import { SandboxShowcase } from '@/components/features/sandbox-showcase';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';

import { getBlogs } from '@/lib/microcms/blogs';
import { MOCK_BLOGS, MOCK_SANDBOXES } from '@/lib/mock';
import { getSandboxes } from '@/lib/microcms/sandboxes';
import { getPersonJsonLd, getWebSiteJsonLd } from '@/lib/seo/json-ld';

export const revalidate = 3600; // 1時間

/**
 * ホームページ
 * ヒーローセクション → サンドボックスショーケース → 最新ブログを表示
 */
export default async function HomePage() {
  // microCMSからデータ取得（並行実行）
  const [blogsData, sandboxesData] = await Promise.all([
    getBlogs({ limit: 3 }).catch(() => null),
    getSandboxes({ limit: 6 }).catch(() => null),
  ]);

  return (
    <>
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getPersonJsonLd(), getWebSiteJsonLd()]),
        }}
      />

      {/* ヒーローセクション */}
      <Hero />

      {/* サンドボックスショーケース（メインコンテンツ） */}
      <SandboxShowcase
        sandboxes={
          sandboxesData?.contents.length
            ? sandboxesData.contents
            : MOCK_SANDBOXES.slice(0, 6)
        }
      />

      {/* 最新ブログ */}
      <Section secondary>
        <Container>
          <SectionTitle sub="Blog">最新の記事</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(blogsData?.contents.length
              ? blogsData.contents
              : MOCK_BLOGS.slice(0, 3)
            ).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">すべての記事を見る</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
