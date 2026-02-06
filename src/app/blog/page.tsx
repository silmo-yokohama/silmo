import type { Metadata } from 'next';

import { BlogCard } from '@/components/features/blog-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';

import { getBlogs } from '@/lib/microcms/blogs';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const revalidate = 3600; // 1時間

export const metadata: Metadata = genMeta({
  title: 'ブログ',
  description:
    'SilMo（清水陽平）の技術ブログ。フロントエンド開発の知見やTipsを発信しています。',
  path: '/blog',
});

/**
 * ブログ一覧ページ
 * microCMSから記事を取得し、カードリストで表示する
 */
export default async function BlogPage() {
  const blogsData = await getBlogs().catch(() => null);

  return (
    <Section>
      <Container>
        <SectionTitle as="h1" sub="Blog">
          ブログ
        </SectionTitle>

        {blogsData && blogsData.contents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogsData.contents.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-sub">記事がまだありません。</p>
        )}
      </Container>
    </Section>
  );
}
