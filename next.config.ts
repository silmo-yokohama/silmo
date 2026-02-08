import type { NextConfig } from 'next';

/** セキュリティヘッダー定義 */
const securityHeaders = [
  {
    // XSSフィルター（レガシーブラウザ向け）
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // クリックジャッキング対策
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    // HTTPS強制（Vercelでは自動適用だが明示的に設定）
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // リファラー情報の制御
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    // ブラウザ機能の制限
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    // コンテンツセキュリティポリシー
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.microcms-assets.io https://www.googletagmanager.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io', // microCMS画像CDN
      },
    ],
  },
  async headers() {
    return [
      {
        // 全ルートにセキュリティヘッダーを適用
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
