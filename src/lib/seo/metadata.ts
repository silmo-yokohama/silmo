import type { Metadata } from 'next';

import { SITE, SOCIAL_LINKS } from '@/lib/constants';

type MetadataParams = {
  /** ページタイトル（サイト名は自動付与） */
  title?: string;
  /** ページの説明文 */
  description?: string;
  /** ページのパス（先頭スラッシュ付き） */
  path?: string;
  /** OGP画像URL */
  ogImage?: string;
  /** noindexにする場合はtrue */
  noIndex?: boolean;
};

/**
 * ページ共通のメタデータを生成するユーティリティ
 * 全ページでこの関数を使ってメタデータを統一する
 * @param params - メタデータパラメータ
 * @returns Next.js Metadataオブジェクト
 */
export function generateMetadata({
  title,
  description = SITE.description,
  path = '',
  ogImage = '/images/og-default.png',
  noIndex = false,
}: MetadataParams = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE.name}` : SITE.title;
  const url = `${SITE.url}${path}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE.url}${ogImage}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      creator: SOCIAL_LINKS.twitter.handle,
      images: [ogImageUrl],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
