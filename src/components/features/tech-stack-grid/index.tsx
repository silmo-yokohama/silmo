'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import { TECH_SKILLS } from '@/lib/constants';

/** スキルレベルに対応するバーの色 */
const levelColors = [
  'bg-text-dark',
  'bg-red-500',
  'bg-accent',
  'bg-primary',
  'bg-primary-light',
  'bg-accent-light',
] as const;

/** スキルレベルに対応するラベル */
const levelLabels = ['', 'E', 'D', 'C', 'B', 'A'] as const;

/**
 * 技術スタック表示グリッド（RPG風ステータス画面）
 * HPバー風のスキルレベルメーターでゲーム感を演出する
 */
export function TechStackGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(TECH_SKILLS).map(([key, category], catIndex) => (
        <motion.div
          key={key}
          className="rpg-box rounded-none p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: catIndex * 0.15 }}
        >
          {/* RPGラベル */}
          <span className="rpg-label">{category.label}</span>

          {/* カテゴリ名 */}
          <h3 className="mb-5 font-[family-name:var(--font-pixel)] text-lg text-primary">
            {category.label}
          </h3>

          {/* スキル一覧（RPG風HPバー） */}
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: catIndex * 0.15 + skillIndex * 0.08,
                }}
              >
                {/* スキル名とランク */}
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-pixel)] text-xs text-text-sub">
                    {skill.name}
                  </span>
                  <span
                    className="font-[family-name:var(--font-press-start)] text-[8px]"
                    style={{ color: `var(--color-${skill.level >= 4 ? 'accent' : 'text-sub'})` }}
                  >
                    Lv.{skill.level}
                    <span className="ml-1 text-[7px]">{levelLabels[skill.level]}</span>
                  </span>
                </div>

                {/* HPバー風スキルメーター */}
                <div className="rpg-bar">
                  <motion.div
                    className={`rpg-bar-fill ${levelColors[skill.level]}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(skill.level / 5) * 100}%` } : { width: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: catIndex * 0.15 + skillIndex * 0.08 + 0.3,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
