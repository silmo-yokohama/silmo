import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SITE } from '@/lib/constants';
import { MOCK_CAREERS } from '@/lib/mock';
import { getAllCareerIds, getCareerById } from '@/lib/microcms/careers';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { formatPeriod } from '@/lib/utils';

export const revalidate = 86400; // 24時間

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * 職務経歴詳細ページのメタデータを動的生成する
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const career = await getCareerById(id);
    return genMeta({
      title: career.title,
      description: `${career.title} - ${career.role || ''}`,
      path: `/career/${id}`,
    });
  } catch {
    const mock = MOCK_CAREERS.find((c) => c.id === id);
    if (mock) {
      return genMeta({
        title: mock.title,
        description: `${mock.title} - ${mock.role || ''}`,
        path: `/career/${id}`,
      });
    }
    return genMeta({ title: '経歴が見つかりません', noIndex: true });
  }
}

/**
 * 静的パス生成（ISR用）
 */
export async function generateStaticParams() {
  try {
    const ids = await getAllCareerIds();
    const mockIds = MOCK_CAREERS.map((c) => c.id);
    const allIds = [...new Set([...ids, ...mockIds])];
    return allIds.map((id) => ({ id }));
  } catch {
    return MOCK_CAREERS.map((c) => ({ id: c.id }));
  }
}

/**
 * 職務経歴詳細ページ（RPGクエスト報告書風）
 * 案件の詳細情報を表示する
 */
export default async function CareerDetailPage({ params }: Props) {
  const { id } = await params;
  let career;

  try {
    career = await getCareerById(id);
  } catch {
    career = MOCK_CAREERS.find((c) => c.id === id);
    if (!career) notFound();
  }

  return (
    <Section>
      <Container size="md">
        {/* パンくずリスト風ナビ */}
        <div className="mb-6 flex items-center gap-2 font-[family-name:var(--font-pixel)] text-xs text-text-dark">
          <Link href="/career" className="transition-colors hover:text-primary">
            CAREER
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="text-text-sub">{career.title}</span>
        </div>

        {/* メインコンテンツ */}
        <div className="rpg-box p-6 sm:p-8">
          <span className="rpg-label">QUEST REPORT</span>

          <div className="space-y-6 pt-2">
            {/* ヘッダー情報 */}
            <div className="border-b border-text-dark/20 pb-4">
              {/* 期間・ロール */}
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-[family-name:var(--font-press-start)] text-[9px] text-primary">
                  {formatPeriod(career.start, career.period)}
                </span>
                {career.role && (
                  <Badge variant="accent">{career.role}</Badge>
                )}
              </div>

              {/* 会社名（入力されている場合のみ表示） */}
              {career.companyName && (
                <p className="mb-2 font-[family-name:var(--font-pixel)] text-xs text-text-dark">
                  &gt; {career.companyName}
                </p>
              )}

              {/* タイトル */}
              <h1 className="font-[family-name:var(--font-pixel)] text-2xl text-text-main pixel-text-shadow sm:text-3xl">
                {career.title}
              </h1>
            </div>

            {/* サムネイル */}
            {career.thumbnail && (
              <div className="relative aspect-video overflow-hidden border-2 border-text-dark/30">
                <Image
                  src={career.thumbnail.url}
                  alt={career.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>
            )}

            {/* チーム規模 */}
            {career.teamSize && (
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                  PARTY
                </span>
                <span className="font-[family-name:var(--font-pixel)] text-sm text-text-sub">
                  {career.teamSize}
                </span>
              </div>
            )}

            {/* 詳細説明 */}
            <div>
              <p className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                DESCRIPTION
              </p>
              <div
                className="prose-microcms"
                dangerouslySetInnerHTML={{ __html: career.description }}
              />
            </div>

            {/* 成果・工夫点 */}
            {career.achievements && (
              <div className="border-l-2 border-accent pl-4">
                <p className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] text-accent">
                  ACHIEVEMENTS
                </p>
                <p className="text-sm leading-relaxed text-text-sub">{career.achievements}</p>
              </div>
            )}

            {/* 使用技術（装備風） */}
            {career.technologies && career.technologies.length > 0 && (
              <div className="border-t border-text-dark/20 pt-4">
                <p className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                  EQUIPMENT
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {career.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="mt-8">
          <Link href="/career">
            <Button variant="ghost" pixel>
              ← 一覧に戻る
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
