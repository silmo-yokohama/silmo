import type { MicroCMSQueries } from 'microcms-js-sdk';

import type { Sandbox } from '@/types/sandbox';

import { client } from './client';

/**
 * サンドボックス一覧を取得する
 * @param queries - microCMSクエリパラメータ
 * @returns サンドボックスの配列と総数
 */
export async function getSandboxes(queries?: MicroCMSQueries) {
  return client.getList<Sandbox>({
    endpoint: 'sandboxes',
    queries: {
      orders: '-publishedAt',
      ...queries,
    },
  });
}

/**
 * サンドボックスを1件取得する
 * @param id - コンテンツID
 * @param queries - microCMSクエリパラメータ
 * @returns サンドボックス
 */
export async function getSandboxById(id: string, queries?: MicroCMSQueries) {
  return client.get<Sandbox>({
    endpoint: 'sandboxes',
    contentId: id,
    queries,
  });
}

/**
 * 全サンドボックスのID一覧を取得する（静的パス生成用）
 * @returns IDの配列
 */
export async function getAllSandboxIds(): Promise<string[]> {
  const data = await client.getList<Sandbox>({
    endpoint: 'sandboxes',
    queries: {
      fields: 'id',
      limit: 100,
    },
  });
  return data.contents.map((s) => s.id);
}
