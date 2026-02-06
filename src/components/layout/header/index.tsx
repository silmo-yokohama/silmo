'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SocialLinks } from '@/components/features/social-links';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { useMobileMenu } from '@/hooks/use-mobile-menu';

/**
 * サイトヘッダー
 * ロゴ + PCナビゲーション + ハンバーガーメニュー（モバイル）
 */
export function Header() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <header className="sticky top-0 z-50 border-b border-text-dark/20 bg-bg-main/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ロゴ */}
        <Link
          href="/"
          className="font-[family-name:var(--font-pixel)] text-xl text-primary transition-colors hover:text-primary-light"
          onClick={close}
        >
          SilMo
        </Link>

        {/* PC用ナビゲーション */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-text-sub hover:bg-bg-secondary hover:text-text-main',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ハンバーガーボタン（モバイル） */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-text-sub transition-colors hover:text-primary md:hidden"
          onClick={toggle}
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="relative h-5 w-6">
            {/* ハンバーガーアイコンの3本線 */}
            <span
              className={cn(
                'absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300',
                isOpen ? 'top-2.5 rotate-45' : 'top-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-2.5 block h-0.5 w-6 bg-current transition-opacity duration-300',
                isOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300',
                isOpen ? 'top-2.5 -rotate-45' : 'top-5',
              )}
            />
          </div>
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={isOpen}
        className={cn(
          'fixed inset-0 top-16 z-40 bg-bg-main/95 backdrop-blur-md transition-all duration-300 md:hidden',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <nav
          className="flex flex-col items-center gap-2 px-4 pt-8"
          aria-label="モバイルナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={cn(
                'w-full rounded-md px-4 py-3 text-center text-lg transition-colors',
                pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-sub hover:bg-bg-secondary hover:text-text-main',
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* SNSリンク */}
          <div className="mt-8 border-t border-text-dark/20 pt-6">
            <SocialLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}
