import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** コンテンツの最大幅（デフォルト: max-w-6xl） */
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
} as const;

/**
 * レスポンシブコンテナ
 * ページ内コンテンツの横幅を制限し、中央揃えする
 */
export function Container({ children, className, size = 'lg' }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)}>
      {children}
    </div>
  );
}
