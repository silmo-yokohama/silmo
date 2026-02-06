import { PROFILE, SITE, SOCIAL_LINKS } from '@/lib/constants';
import type { Blog } from '@/types/blog';

/**
 * Person構造化データ（全ページ共通）
 * フリーランスエンジニアとしての情報を検索エンジンに伝える
 */
export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: PROFILE.handle,
    jobTitle: PROFILE.role,
    url: SITE.url,
    sameAs: [SOCIAL_LINKS.twitter.url, SOCIAL_LINKS.github.url],
    knowsAbout: [
      'React',
      'Next.js',
      'Vue.js',
      'Nuxt',
      'TypeScript',
      'フロントエンド開発',
      'Web開発',
    ],
  };
}

/**
 * WebSite構造化データ（ホームページ用）
 */
export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    author: getPersonJsonLd(),
  };
}

/**
 * BlogPosting構造化データ（ブログ詳細用）
 * @param blog - ブログ記事データ
 */
export function getBlogPostingJsonLd(blog: Blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description || '',
    image: blog.thumbnail?.url || `${SITE.url}/images/og-default.png`,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: PROFILE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Person',
      name: PROFILE.name,
    },
    url: `${SITE.url}/blog/${blog.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${blog.id}`,
    },
  };
}

/**
 * ContactPage構造化データ（お問い合わせページ用）
 */
export function getContactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'お問い合わせ',
    url: `${SITE.url}/contact`,
    description: 'SilMo（清水陽平）へのお問い合わせページです。',
    mainEntity: {
      '@type': 'Person',
      name: PROFILE.name,
      url: SITE.url,
    },
  };
}
