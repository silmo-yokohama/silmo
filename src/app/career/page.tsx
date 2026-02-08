import type { Metadata } from 'next';

import { CareerTimeline } from '@/components/features/career-timeline';
import { ProductionCard } from '@/components/features/production-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';

import { getCareers } from '@/lib/microcms/careers';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const revalidate = 86400; // 24時間

export const metadata: Metadata = genMeta({
  title: 'キャリア',
  description:
    'SilMo（清水陽平）の受託開発・キャリア一覧。フロントエンド開発を中心とした案件実績を紹介します。',
  path: '/career',
});

/**
 * 職務経歴ページ
 * 常駐案件（タイムライン）と受託制作（カードグリッド）の2セクションで表示する
 */
export default async function CareerPage() {
  const careersData = await getCareers().catch(() => null);
  const allCareers = careersData?.contents ?? [];

  /** isProductionフラグでグループ分け（未設定/false=常駐案件） */
  const clientWork = allCareers.filter((c) => !c.isProduction);
  const productions = allCareers.filter((c) => c.isProduction);

  return (
    <Section>
      <Container size="md">
        <SectionTitle as="h1" sub="Career">
          キャリア
        </SectionTitle>

        {/* 常駐案件セクション */}
        {clientWork.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-6 border-b border-text-dark/20 pb-2 font-[family-name:var(--font-pixel)] text-lg text-text-main">
              <span className="text-primary" aria-hidden="true">▶ </span>
              CLIENT WORK
              <span className="ml-2 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                — 常駐案件
              </span>
            </h2>
            <CareerTimeline careers={clientWork} />
          </div>
        )}

        {/* 受託制作セクション */}
        {productions.length > 0 && (
          <div>
            <h2 className="mb-6 border-b border-text-dark/20 pb-2 font-[family-name:var(--font-pixel)] text-lg text-text-main">
              <span className="text-accent" aria-hidden="true">▶ </span>
              WEB PRODUCTION
              <span className="ml-2 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                — 受託制作
              </span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productions.map((career) => (
                <ProductionCard key={career.id} career={career} />
              ))}
            </div>
          </div>
        )}

        {/* データなし */}
        {allCareers.length === 0 && (
          <p className="text-center font-[family-name:var(--font-pixel)] text-sm text-text-dark">
            NO DATA AVAILABLE
          </p>
        )}
      </Container>
    </Section>
  );
}
