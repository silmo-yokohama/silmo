import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import type { Career } from '@/types/career';

type CareerCardProps = {
  career: Career;
};

/**
 * 職務経歴カード
 * 開示レベルに応じて表示内容を制御する
 */
export function CareerCard({ career }: CareerCardProps) {
  const isCompanyVisible = career.disclosureLevel === '公開' && career.companyName;

  return (
    <div className="rounded-lg border border-text-dark/20 bg-bg-card p-6 transition-all duration-300 hover:border-primary/30">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* サムネイル（公開案件のみ） */}
        {career.thumbnail && career.disclosureLevel === '公開' && (
          <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-md sm:w-48">
            <Image
              src={career.thumbnail.url}
              alt={career.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 192px"
            />
          </div>
        )}

        {/* コンテンツ */}
        <div className="flex flex-1 flex-col gap-3">
          {/* 期間とロール */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-text-dark">
            <span>{career.period}</span>
            {career.role && (
              <>
                <span>|</span>
                <span className="text-accent">{career.role}</span>
              </>
            )}
            {career.teamSize && (
              <>
                <span>|</span>
                <span>{career.teamSize}</span>
              </>
            )}
          </div>

          {/* 会社名（公開案件のみ） */}
          {isCompanyVisible && <p className="text-xs text-text-dark">{career.companyName}</p>}

          {/* タイトル */}
          <h3 className="text-lg font-bold text-text-main">{career.title}</h3>

          {/* 詳細説明 */}
          <div
            className="prose-microcms text-sm"
            dangerouslySetInnerHTML={{ __html: career.description }}
          />

          {/* 成果・工夫点 */}
          {career.achievements && (
            <p className="text-sm italic text-text-sub">{career.achievements}</p>
          )}

          {/* 使用技術 */}
          {career.technologies && career.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {career.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
