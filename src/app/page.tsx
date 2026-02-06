import Link from 'next/link';

import { BlogCard } from '@/components/features/blog-card';
import { Hero } from '@/components/features/hero';
import { SandboxCard } from '@/components/features/sandbox-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';

import { getBlogs } from '@/lib/microcms/blogs';
import { getSandboxes } from '@/lib/microcms/sandboxes';
import { getPersonJsonLd, getWebSiteJsonLd } from '@/lib/seo/json-ld';

export const revalidate = 3600; // 1時間

/**
 * ホームページ
 * ヒーローセクション、最新ブログ3件、サンドボックスハイライト、CTAを表示
 */
export default async function HomePage() {
  // microCMSからデータ取得（並行実行）
  const [blogsData, sandboxesData] = await Promise.all([
    getBlogs({ limit: 3 }).catch(() => null),
    getSandboxes({ limit: 3 }).catch(() => null),
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

      {/* 最新ブログ */}
      {blogsData && blogsData.contents.length > 0 && (
        <Section secondary>
          <Container>
            <SectionTitle sub="Blog">最新の記事</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogsData.contents.map((blog) => (
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
      )}

      {/* サンドボックスハイライト */}
      {sandboxesData && sandboxesData.contents.length > 0 && (
        <Section>
          <Container>
            <SectionTitle sub="Sandbox">個人開発</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sandboxesData.contents.map((sandbox) => (
                <SandboxCard key={sandbox.id} sandbox={sandbox} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/sandbox">
                <Button variant="outline">すべてのプロジェクトを見る</Button>
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section secondary>
        <Container size="sm">
          <div className="text-center">
            <h2 className="mb-4 font-[family-name:var(--font-pixel)] text-2xl text-text-main sm:text-3xl">
              一緒に働きませんか？
            </h2>
            <p className="mb-8 text-text-sub">
              フロントエンド開発のご相談、お見積もりなど、お気軽にお問い合わせください。
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg" pixel>
                お問い合わせ
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
