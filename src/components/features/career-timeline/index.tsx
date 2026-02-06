'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import { CareerCard } from '@/components/features/career-card';
import type { Career } from '@/types/career';

type CareerTimelineProps = {
  careers: Career[];
};

/**
 * 職務経歴タイムライン（RPGクエストログ風）
 * 各案件をクエスト完了報告のように表示する
 */
export function CareerTimeline({ careers }: CareerTimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative space-y-8">
      {/* タイムラインの縦線（RPG風ピクセルライン） */}
      <div
        className="absolute left-4 top-0 h-full w-[3px] sm:left-6"
        style={{
          background: 'repeating-linear-gradient(to bottom, var(--color-primary) 0px, var(--color-primary) 8px, transparent 8px, transparent 16px)',
        }}
        aria-hidden="true"
      />

      {careers.map((career, index) => (
        <motion.div
          key={career.id}
          className="relative pl-12 sm:pl-16"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* タイムラインのドット（RPG風アイコン） */}
          <div
            className="absolute left-2 top-6 flex h-5 w-5 items-center justify-center bg-bg-main sm:left-4"
            aria-hidden="true"
          >
            <div className="h-3 w-3 border-2 border-primary bg-primary/30" />
          </div>

          {/* クエスト番号 */}
          <span className="absolute left-0 top-2 font-[family-name:var(--font-press-start)] text-[7px] text-accent sm:left-0">
            Q{String(index + 1).padStart(2, '0')}
          </span>

          <CareerCard career={career} />
        </motion.div>
      ))}

      {/* タイムライン終端マーカー */}
      <div className="relative pl-12 sm:pl-16" aria-hidden="true">
        <div className="absolute left-2 top-0 flex h-5 w-5 items-center justify-center bg-bg-main sm:left-4">
          <div
            className="h-3 w-3 border-2 border-accent bg-accent/30"
            style={{ animation: 'retro-blink 1.5s step-end infinite' }}
          />
        </div>
        <p className="font-[family-name:var(--font-press-start)] text-[8px] text-text-dark">
          QUEST LOG END...
        </p>
      </div>
    </div>
  );
}
