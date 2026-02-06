import { cn } from '@/lib/utils';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** セクションID（ページ内リンク用） */
  id?: string;
  /** 背景をセカンダリカラーにする */
  secondary?: boolean;
};

/**
 * ページセクション
 * 各セクションに統一されたパディングと背景色を提供する
 */
export function Section({ children, className, id, secondary = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 sm:py-24', secondary && 'bg-bg-secondary', className)}
    >
      {children}
    </section>
  );
}
