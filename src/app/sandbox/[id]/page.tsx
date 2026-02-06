import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { getAllSandboxIds, getSandboxById } from '@/lib/microcms/sandboxes';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { SITE } from '@/lib/constants';

export const revalidate = 3600; // 1時間

type Props = {
  params: Promise<{ id: string }>;
};

/** ステータスに対応する英語ラベル */
const statusLabel: Record<string, string> = {
  完成: 'COMPLETE',
  開発中: 'IN DEV',
  メンテナンス中: 'MAINT',
  アーカイブ: 'ARCHIVE',
};

/** ステータスに対応するバッジバリアント */
const statusVariant: Record<string, 'primary' | 'accent' | 'outline' | 'muted'> = {
  完成: 'primary',
  開発中: 'accent',
  メンテナンス中: 'outline',
  アーカイブ: 'muted',
};

/**
 * サンドボックス詳細ページのメタデータを動的生成する
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const sandbox = await getSandboxById(id);
    return genMeta({
      title: sandbox.title,
      description: sandbox.purpose || `${sandbox.title} - ${SITE.name}の個人開発プロジェクト`,
      path: `/sandbox/${id}`,
      ogImage: sandbox.thumbnail?.url,
    });
  } catch {
    return genMeta({ title: 'プロジェクトが見つかりません', noIndex: true });
  }
}

/**
 * 静的パス生成（ISR用）
 */
export async function generateStaticParams() {
  try {
    const ids = await getAllSandboxIds();
    return ids.map((id) => ({ id }));
  } catch {
    return [];
  }
}

/**
 * サンドボックス詳細ページ（RPGアイテム詳細風）
 * プロジェクトの詳細情報を表示する
 */
export default async function SandboxDetailPage({ params }: Props) {
  const { id } = await params;
  let sandbox;

  try {
    sandbox = await getSandboxById(id);
  } catch {
    notFound();
  }

  return (
    <Section>
      <Container size="md">
        {/* パンくずリスト風ナビ */}
        <div className="mb-6 flex items-center gap-2 font-[family-name:var(--font-pixel)] text-xs text-text-dark">
          <Link href="/sandbox" className="transition-colors hover:text-primary">
            SANDBOX
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="text-text-sub">{sandbox.title}</span>
        </div>

        {/* メインコンテンツ */}
        <div className="rpg-box p-6 sm:p-8">
          <span className="rpg-label">PROJECT DETAIL</span>

          <div className="space-y-6 pt-2">
            {/* ヘッダー */}
            <div className="border-b border-text-dark/20 pb-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant={statusVariant[sandbox.status] || 'muted'}>
                  {statusLabel[sandbox.status] || sandbox.status}
                </Badge>
              </div>
              <h1 className="font-[family-name:var(--font-pixel)] text-2xl text-text-main pixel-text-shadow sm:text-3xl">
                {sandbox.title}
              </h1>
            </div>

            {/* サムネイル */}
            {sandbox.thumbnail && (
              <div className="relative aspect-video overflow-hidden border-2 border-text-dark/30">
                <Image
                  src={sandbox.thumbnail.url}
                  alt={sandbox.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>
            )}

            {/* 使用技術（EQUIPMENT風） */}
            {sandbox.technologies && sandbox.technologies.length > 0 && (
              <div>
                <p className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                  EQUIPMENT
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {sandbox.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* 開発目的（MISSION風） */}
            {sandbox.purpose && (
              <div className="border-l-2 border-accent pl-4">
                <p className="mb-1 font-[family-name:var(--font-press-start)] text-[8px] text-accent">
                  MISSION
                </p>
                <p className="text-sm leading-relaxed text-text-sub">{sandbox.purpose}</p>
              </div>
            )}

            {/* 詳細説明 */}
            <div>
              <p className="mb-2 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
                DESCRIPTION
              </p>
              <div
                className="prose-microcms"
                dangerouslySetInnerHTML={{ __html: sandbox.description }}
              />
            </div>

            {/* リンク（RPGコマンド風） */}
            <div className="flex flex-wrap gap-4 border-t border-text-dark/20 pt-4">
              {sandbox.siteUrl && (
                <a
                  href={sandbox.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" pixel>
                    ▶ DEMO
                  </Button>
                </a>
              )}
              {sandbox.githubUrl && (
                <a
                  href={sandbox.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" pixel>
                    ▶ SOURCE
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="mt-8">
          <Link href="/sandbox">
            <Button variant="ghost" pixel>
              ← 一覧に戻る
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
