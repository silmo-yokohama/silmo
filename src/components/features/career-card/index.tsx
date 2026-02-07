'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { Career } from '@/types/career';
import { formatPeriod, parseTechnologies } from '@/lib/utils';

type CareerCardProps = {
  career: Career;
};

/**
 * 職務経歴カード（RPGクエスト報告書風）
 * companyNameの有無で会社名の表示を制御する
 */
export function CareerCard({ career }: CareerCardProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <div className="rpg-box rounded-none p-5 transition-all duration-300 hover:border-accent">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* サムネイル */}
        {career.thumbnail && (
          <div className="relative h-32 w-full shrink-0 overflow-hidden border-2 border-text-dark/30 sm:w-48">
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
          {/* 期間とロール（クエスト情報風） */}
          <div className="flex flex-wrap items-center gap-3 border-b border-text-dark/20 pb-2">
            <span className="font-[family-name:var(--font-press-start)] text-[8px] text-primary">
              {formatPeriod(career.start, career.period)}
            </span>
            {career.role && (
              <span className="font-[family-name:var(--font-pixel)] text-xs text-accent">
                [{career.role}]
              </span>
            )}
            {career.teamSize && (
              <span className="font-[family-name:var(--font-pixel)] text-[10px] text-text-dark">
                PT: {career.teamSize}
              </span>
            )}
          </div>

          {/* 会社名（入力されている場合のみ表示） */}
          {career.companyName && (
            <p className="font-[family-name:var(--font-pixel)] text-[10px] text-text-dark">
              &gt; {career.companyName}
            </p>
          )}

          {/* タイトル */}
          <h3 className="font-[family-name:var(--font-pixel)] text-base text-text-main">
            {career.title}
          </h3>

          {/* 詳細説明（アコーディオン） */}
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDescriptionOpen(!isDescriptionOpen);
              }}
              className="group flex w-full items-center justify-between border-b border-text-dark/20 pb-2 font-[family-name:var(--font-pixel)] text-xs text-text-dark transition-colors hover:text-primary"
            >
              <span>詳細説明</span>
              <motion.span
                className="text-accent"
                aria-hidden="true"
                animate={{ rotate: isDescriptionOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                ▶
              </motion.span>
            </button>
            <AnimatePresence>
              {isDescriptionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-3">
                    {/* 詳細説明 */}
                    <div
                      className="prose-microcms text-sm"
                      dangerouslySetInnerHTML={{ __html: career.description }}
                    />

                    {/* 成果・工夫点（RPG風「獲得報酬」） */}
                    {career.achievements && (
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="border-l-2 border-accent pl-3"
                      >
                        <p className="mb-1 font-[family-name:var(--font-press-start)] text-[7px] text-accent">
                          ACHIEVEMENTS
                        </p>
                        <p className="text-sm text-text-sub">{career.achievements}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 使用技術（装備アイテム風） */}
          {career.technologies && parseTechnologies(career.technologies).length > 0 && (
            <div className="pt-1">
              <p className="mb-2 font-[family-name:var(--font-press-start)] text-[7px] text-text-dark">
                EQUIPMENT
              </p>
              <div className="flex flex-wrap gap-1.5">
                {parseTechnologies(career.technologies).map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 詳細リンク（RPGコマンド風） */}
          <div className="mt-auto border-t border-text-dark/20 pt-3">
            <Link
              href={`/career/${career.id}`}
              className="flex items-center gap-1.5 font-[family-name:var(--font-pixel)] text-[10px] text-primary transition-colors hover:text-accent"
            >
              <span className="text-accent" aria-hidden="true">▶</span>
              DETAIL
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
