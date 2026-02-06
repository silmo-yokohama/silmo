import { SocialLinks } from '@/components/features/social-links';
import { SITE } from '@/lib/constants';

/**
 * サイトフッター
 * コピーライトとSNSリンクを表示する
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-text-dark/20 bg-bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {/* コピーライト */}
        <p className="font-[family-name:var(--font-pixel)] text-xs text-text-dark">
          &copy; {currentYear} {SITE.name}. All rights reserved.
        </p>

        {/* SNSリンク */}
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
