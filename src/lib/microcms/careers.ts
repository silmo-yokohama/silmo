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

/**
 * 職務経歴を1件取得する
 * @param id - コンテンツID
 * @param queries - microCMSクエリパラメータ
 * @returns 職務経歴
 */
export async function getCareerById(id: string, queries?: MicroCMSQueries) {
  return client.get<Career>({
    endpoint: 'careers',
    contentId: id,
    queries,
  });
}

/**
 * 全職務経歴のID一覧を取得する（静的パス生成用）
 * @returns IDの配列
 */
export async function getAllCareerIds(): Promise<string[]> {
  const data = await client.getList<Career>({
    endpoint: 'careers',
    queries: {
      fields: 'id',
      filters: 'disclosureLevel[not_equals]完全非公開',
      limit: 100,
    },
  });
  return data.contents.map((c) => c.id);
}
