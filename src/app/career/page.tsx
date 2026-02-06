import type { Metadata } from 'next';

import { CareerTimeline } from '@/components/features/career-timeline';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';

import { getCareers } from '@/lib/microcms/careers';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const revalidate = 86400; // 24時間

export const metadata: Metadata = genMeta({
  title: '職務経歴',
  description:
    'SilMo（清水陽平）の受託開発・職務経歴一覧。フロントエンド開発を中心とした案件実績を紹介します。',
  path: '/career',
});

/**
 * 職務経歴ページ
 * microCMSからデータ取得し、タイムライン形式で表示する
 */
export default async function CareerPage() {
  const careersData = await getCareers().catch(() => null);
  const careers = careersData?.contents ?? [];

  return (
    <Section>
      <Container size="md">
        <SectionTitle as="h1" sub="Career">
          職務経歴
        </SectionTitle>

        <CareerTimeline careers={careers} />
      </Container>
    </Section>
  );
}
