import type { Metadata } from 'next';

import { SandboxCard } from '@/components/features/sandbox-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';

import { getSandboxes } from '@/lib/microcms/sandboxes';
import { MOCK_SANDBOXES } from '@/lib/mock';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';

export const revalidate = 3600; // 1時間

export const metadata: Metadata = genMeta({
  title: 'サンドボックス',
  description:
    'SilMo（清水陽平）の個人開発プロジェクト一覧。技術検証や趣味で作ったWebアプリケーションを紹介します。',
  path: '/sandbox',
});

/**
 * サンドボックスページ
 * 個人開発プロジェクトをカードグリッドで表示する
 */
export default async function SandboxPage() {
  const sandboxesData = await getSandboxes().catch(() => null);
  const sandboxes = sandboxesData?.contents.length ? sandboxesData.contents : MOCK_SANDBOXES;

  return (
    <Section>
      <Container>
        <SectionTitle as="h1" sub="Sandbox">
          サンドボックス
        </SectionTitle>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sandboxes.map((sandbox) => (
            <SandboxCard key={sandbox.id} sandbox={sandbox} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
