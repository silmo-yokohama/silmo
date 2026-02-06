import type { MicroCMSQueries } from 'microcms-js-sdk';

import type { Blog } from '@/types/blog';

import { client } from './client';

/**
 * ブログ記事一覧を取得する
 * @param queries - microCMSクエリパラメータ
 * @returns ブログ記事の配列と総数
 */
export async function getBlogs(queries?: MicroCMSQueries) {
  return client.getList<Blog>({
    endpoint: 'blogs',
    queries: {
      orders: '-publishedAt',
      ...queries,
    },
  });
}

/**
 * ブログ記事を1件取得する
 * @param slug - 記事のスラッグ（contentId）
 * @param queries - microCMSクエリパラメータ
 * @returns ブログ記事
 */
export async function getBlogBySlug(slug: string, queries?: MicroCMSQueries) {
  return client.get<Blog>({
    endpoint: 'blogs',
    contentId: slug,
    queries,
  });
}

/**
 * 全ブログ記事のスラッグ一覧を取得する（サイトマップ用）
 * @returns スラッグの配列
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const data = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: {
      fields: 'id',
      limit: 100,
    },
  });
  return data.contents.map((blog) => blog.id);
}
