import type { Metadata } from 'next';

import { TechStackGrid } from '@/components/features/tech-stack-grid';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { PixelBorder } from '@/components/ui/pixel-border';
import { SectionTitle } from '@/components/ui/section-title';
import { PROFILE } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: '自己紹介',
  description: `${PROFILE.handle}（${PROFILE.name}）のプロフィール。${PROFILE.role}として活動中。`,
  path: '/about',
});

/**
 * 自己紹介ページ
 * プロフィール情報と技術スキル一覧を表示する
 */
export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  const totalExp = currentYear - PROFILE.career.startYear;
  const freelanceExp = currentYear - PROFILE.career.freelanceStartYear;

  return (
    <>
      {/* プロフィールセクション */}
      <Section>
        <Container size="md">
          <SectionTitle as="h1" sub="About">
            自己紹介
          </SectionTitle>

          <PixelBorder className="mb-12 bg-bg-card">
            <div className="space-y-6">
              {/* 名前・ロール */}
              <div>
                <p className="font-[family-name:var(--font-press-start)] text-xs text-primary">
                  {PROFILE.nameEn}
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-pixel)] text-2xl text-text-main">
                  {PROFILE.name}
                </h2>
                <p className="mt-1 text-sm text-accent">{PROFILE.role}</p>
              </div>

              {/* 自己紹介文 */}
              <p className="leading-relaxed text-text-sub">{PROFILE.bio}</p>

              {/* 経歴サマリー */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-md bg-bg-secondary p-4 text-center">
                  <p className="font-[family-name:var(--font-pixel)] text-2xl text-primary">
                    {totalExp}+
                  </p>
                  <p className="mt-1 text-xs text-text-dark">年の開発経験</p>
                </div>
                <div className="rounded-md bg-bg-secondary p-4 text-center">
                  <p className="font-[family-name:var(--font-pixel)] text-2xl text-accent">
                    {freelanceExp}+
                  </p>
                  <p className="mt-1 text-xs text-text-dark">年のフリーランス</p>
                </div>
                <div className="rounded-md bg-bg-secondary p-4 text-center">
                  <p className="font-[family-name:var(--font-pixel)] text-2xl text-primary-light">
                    {PROFILE.location}
                  </p>
                  <p className="mt-1 text-xs text-text-dark">拠点</p>
                </div>
              </div>
            </div>
          </PixelBorder>
        </Container>
      </Section>

      {/* 技術スキルセクション */}
      <Section secondary>
        <Container size="md">
          <SectionTitle sub="Skills">技術スキル</SectionTitle>
          <TechStackGrid />
        </Container>
      </Section>
    </>
  );
}
