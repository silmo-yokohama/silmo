import type { Metadata } from 'next';

import Image from 'next/image';

import { TechStackGrid } from '@/components/features/tech-stack-grid';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';
import { PROFILE } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

/** 趣味データ（ピクセルアートPNGアイコン付き） */
const HOBBIES = [
  {
    icon: '/images/hobbies/game.png',
    label: 'ゲーム',
    name: 'GAME',
    description: '一人で黙々とRPGするのも、みんなで一緒に狩りに行ったりパーティゲームするのも好き。',
  },
  {
    icon: '/images/hobbies/baseball.png',
    label: '野球',
    name: 'BASEBALL',
    description: '横浜DeNAベイスターズファンですが、プロ野球自体が好き。小中高と野球やってました。',
  },
  {
    icon: '/images/hobbies/basketball.png',
    label: 'バスケ',
    name: 'BASKETBALL',
    description: 'B.LEAGUEを見てます。横浜エクセレンスを応援。スラムダンクだとリョーちん推し。',
  },
  {
    icon: '/images/hobbies/beer.png',
    label: 'お酒',
    name: 'SAKE',
    description: '何でも飲みますが、カクテルが特に好きです。Bar巡りが趣味。',
  },
  {
    icon: '/images/hobbies/cooking.png',
    label: '料理',
    name: 'COOKING',
    description: '最近ハマりはじめました。色んな人のレシピを参考に作ってます。',
  },
] as const;

export const metadata: Metadata = genMeta({
  title: 'プロフィール',
  description: `${PROFILE.handle}（${PROFILE.name}）のプロフィール。${PROFILE.role}として活動中。フロントエンド開発の技術スキルと趣味を紹介。`,
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
            プロフィール
          </SectionTitle>

          {/* RPG風ステータスウィンドウ */}
          <div className="rpg-box mb-12 p-6">
            <span className="rpg-label">STATUS</span>

            <div className="space-y-6 pt-2">
              {/* 名前・ロール（アバター付き） */}
              <div className="flex items-center gap-5 border-b border-text-dark/20 pb-4">
                {/* ピクセルアートアバター */}
                <div className="shrink-0 border-2 border-primary/40 bg-bg-main p-1">
                  <Image
                    src="/images/avatar.png"
                    alt={PROFILE.name}
                    width={80}
                    height={80}
                    className="block"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </div>

                {/* テキスト情報 */}
                <div>
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
              </div>

              {/* 自己紹介文 */}
              <p className="leading-relaxed text-text-sub">神奈川県横浜市を拠点に活動するフロントエンドエンジニアです。仕事と趣味に生きてます。<br />愛猫（きなこ）に貢ぐため、一生懸命働いてます。</p>

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

      {/* 趣味セクション */}
      <Section secondary>
        <Container size="md">
          <SectionTitle sub="Hobbies">趣味</SectionTitle>

          <div className="rpg-box p-6">
            <span className="rpg-label">HOBBIES</span>

            <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {HOBBIES.map((hobby) => (
                <div
                  key={hobby.name}
                  className="group flex items-start gap-4 border-2 border-text-dark/20 bg-bg-secondary p-4 transition-all duration-300 hover:border-primary/50"
                >
                  {/* ピクセルアートPNGアイコン */}
                  <div className="flex shrink-0 items-center justify-center rounded-none border border-text-dark/30 bg-bg-main p-2 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_8px_rgba(0,161,151,0.3)]">
                    <Image
                      src={hobby.icon}
                      alt={hobby.label}
                      width={48}
                      height={48}
                      className="image-rendering-pixelated"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>

                  {/* テキスト */}
                  <div className="flex-1">
                    <p className="mb-1 font-[family-name:var(--font-press-start)] text-[8px] text-primary">
                      {hobby.name}
                    </p>
                    <p className="font-[family-name:var(--font-pixel)] text-sm text-text-main">
                      {hobby.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-sub">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 技術スキルセクション */}
      <Section>
        <Container size="md">
          <SectionTitle sub="Skills">技術スキル</SectionTitle>
          <TechStackGrid />
        </Container>
      </Section>
    </>
  );
}
