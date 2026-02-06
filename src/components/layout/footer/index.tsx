import { SocialLinks } from '@/components/features/social-links';
import { PROFILE, SITE } from '@/lib/constants';

/**
 * サイトフッター
 * RPGステータスバー風のデザイン
 * ゲームの画面下部に表示されるステータスウィンドウをモチーフにした
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const totalExp = currentYear - PROFILE.career.startYear;

  return (
    <footer className="border-t-2 border-primary/40 bg-bg-secondary">
      {/* RPG風ステータスライン */}
      <div className="border-b border-text-dark/20 bg-bg-main/50">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
            <span className="text-primary">EXP</span>
            <span className="text-text-sub">{totalExp}年+</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
            <span className="text-accent">CLASS</span>
            <span className="text-text-sub">Frontend</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
            <span className="text-primary-light">AREA</span>
            <span className="text-text-sub">Yokohama</span>
          </span>
          {/* 装飾ドット */}
          <span className="ml-auto flex items-center gap-1" aria-hidden="true">
            <span className="h-2 w-2 bg-primary" />
            <span className="h-2 w-2 bg-accent" />
            <span className="h-2 w-2 bg-primary-light" />
          </span>
        </div>
      </div>

      {/* メインフッター */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {/* コピーライト（ゲーム風） */}
        <p className="font-[family-name:var(--font-press-start)] text-[8px] leading-relaxed text-text-dark sm:text-[9px]">
          &copy; {currentYear} {SITE.name}
          <span className="ml-2 text-text-dark/50">ALL RIGHTS RESERVED</span>
        </p>

        {/* SNSリンク */}
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
