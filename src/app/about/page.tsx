import type { Metadata } from 'next';

import { TechStackGrid } from '@/components/features/tech-stack-grid';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';
import { PROFILE } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = genMeta({
  title: '自己紹介',
  description: `${PROFILE.handle}（${PROFILE.name}）のプロフィール。${PROFILE.role}として活動中。`,
  path: '/about',
});

/**
 * 自己紹介ページ（RPGキャラクターステータス画面風）
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

          {/* RPG風ステータスウィンドウ */}
          <div className="rpg-box mb-12 p-6">
            <span className="rpg-label">STATUS</span>

            <div className="space-y-6 pt-2">
              {/* 名前・ロール */}
              <div className="border-b border-text-dark/20 pb-4">
                <p className="font-[family-name:var(--font-press-start)] text-[10px] text-primary">
                  {PROFILE.nameEn}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-pixel)] text-2xl text-text-main pixel-text-shadow">
                  {PROFILE.name}
                </h2>
                <p className="mt-1 font-[family-name:var(--font-pixel)] text-sm text-accent">
                  {PROFILE.role}
                </p>
              </div>

              {/* 自己紹介文 */}
              <p className="leading-relaxed text-text-sub">{PROFILE.bio}</p>

              {/* ステータスパラメータ（RPGステータス画面風） */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-2 border-primary/40 bg-bg-secondary p-4 text-center">
                  <p className="mb-1 font-[family-name:var(--font-press-start)] text-[8px] text-primary">
                    EXP
                  </p>
                  <p className="font-[family-name:var(--font-pixel)] text-2xl text-primary">
                    {totalExp}<span className="text-sm text-text-dark">年+</span>
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-pixel)] text-[10px] text-text-dark">
                    開発経験
                  </p>
                </div>
                <div className="border-2 border-accent/40 bg-bg-secondary p-4 text-center">
                  <p className="mb-1 font-[family-name:var(--font-press-start)] text-[8px] text-accent">
                    FREE
                  </p>
                  <p className="font-[family-name:var(--font-pixel)] text-2xl text-accent">
                    {freelanceExp}<span className="text-sm text-text-dark">年+</span>
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-pixel)] text-[10px] text-text-dark">
                    フリーランス
                  </p>
                </div>
                <div className="border-2 border-primary-light/40 bg-bg-secondary p-4 text-center">
                  <p className="mb-1 font-[family-name:var(--font-press-start)] text-[8px] text-primary-light">
                    AREA
                  </p>
                  <p className="font-[family-name:var(--font-pixel)] text-2xl text-primary-light">
                    {PROFILE.location}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-pixel)] text-[10px] text-text-dark">
                    拠点
                  </p>
                </div>
              </div>
            </div>
          </div>
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
