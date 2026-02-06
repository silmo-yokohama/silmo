import type { MicroCMSQueries } from 'microcms-js-sdk';

import type { Career } from '@/types/career';

import { client } from './client';

/**
 * 職務経歴一覧を取得する
 * 完全非公開の案件はフィルタリングして除外する
 * @param queries - microCMSクエリパラメータ
 * @returns 職務経歴の配列と総数
 */
export async function getCareers(queries?: MicroCMSQueries) {
  const data = await client.getList<Career>({
    endpoint: 'careers',
    queries: {
      orders: '-order',
      filters: 'disclosureLevel[not_equals]完全非公開',
      ...queries,
    },
  });
  return data;
}
