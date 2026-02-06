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
