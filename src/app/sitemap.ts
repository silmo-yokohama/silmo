import type { MetadataRoute } from 'next';

import { SITE } from '@/lib/constants';
import { getAllBlogSlugs } from '@/lib/microcms/blogs';

/**
 * 動的サイトマップ生成
 * 静的ページとmicroCMSの動的ページをマージして出力する
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/career`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/sandbox`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // ブログ記事の動的ページ
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllBlogSlugs();
    blogPages = slugs.map((slug) => ({
      url: `${SITE.url}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    // microCMSに接続できない場合はスキップ
  }

  return [...staticPages, ...blogPages];
}
