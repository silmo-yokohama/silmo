import type { Metadata } from 'next';

import { ContactForm } from '@/components/features/contact-form';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionTitle } from '@/components/ui/section-title';
import { generateMetadata as genMeta } from '@/lib/seo/metadata';
import { getContactPageJsonLd, getPersonJsonLd } from '@/lib/seo/json-ld';

export const metadata: Metadata = genMeta({
  title: 'お問い合わせ',
  description:
    'SilMo（清水陽平）へのお問い合わせページ。案件のご相談、お見積もりなど、お気軽にご連絡ください。',
  path: '/contact',
});

/**
 * お問い合わせページ
 * フォームUI + 送信処理（クライアントコンポーネント）
 */
export default function ContactPage() {
  return (
    <>
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getPersonJsonLd(), getContactPageJsonLd()]),
        }}
      />

      <Section>
        <Container size="sm">
          <SectionTitle as="h1" sub="Contact">
            お問い合わせ
          </SectionTitle>

          <div className="rpg-box mb-8 p-4">
            <span className="rpg-label">INFO</span>
            <p className="pt-1 text-sm text-text-sub">
              案件のご相談、お見積もりのご依頼など、お気軽にお問い合わせください。
              <br />
              通常2営業日以内にご返信いたします。
            </p>
          </div>

          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
