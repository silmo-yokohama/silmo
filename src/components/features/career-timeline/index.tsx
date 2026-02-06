import { CareerCard } from '@/components/features/career-card';
import type { Career } from '@/types/career';

type CareerTimelineProps = {
  careers: Career[];
};

/**
 * 職務経歴タイムライン
 * 案件をタイムライン形式で表示する
 */
export function CareerTimeline({ careers }: CareerTimelineProps) {
  return (
    <div className="relative space-y-8">
      {/* タイムラインの縦線 */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-text-dark/20 sm:left-6" aria-hidden="true" />

      {careers.map((career, index) => (
        <div key={career.id} className="relative pl-10 sm:pl-16">
          {/* タイムラインのドット */}
          <div
            className="absolute left-2.5 top-6 h-3 w-3 rounded-full border-2 border-primary bg-bg-main sm:left-4.5"
            aria-hidden="true"
          />

          {/* インデックス番号 */}
          <span className="absolute left-0 top-5 font-[family-name:var(--font-press-start)] text-[8px] text-text-dark sm:left-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          <CareerCard career={career} />
        </div>
      ))}
    </div>
  );
}
