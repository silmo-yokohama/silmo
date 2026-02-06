'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

/* ===================================
 * スクロールトリガーアニメーション
 * IntersectionObserver (useInView) を使用して
 * 画面内に入った時にアニメーション発火
 * =================================== */

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** アニメーションの遅延（秒） */
  delay?: number;
  /** アニメーションの方向 */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** 移動距離（px） */
  distance?: number;
  /** アニメーション時間（秒） */
  duration?: number;
};

/**
 * スクロール連動フェードインコンポーネント
 * 画面内に入った要素をフェードイン表示する
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ===================================
 * スタガーコンテナ
 * 子要素を順番に表示する
 * =================================== */

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** 各子要素間の遅延（秒） */
  staggerDelay?: number;
  /** コンテナ自体の遅延（秒） */
  delay?: number;
};

/**
 * スタガーアニメーションコンテナ
 * 子要素を順番にアニメーション表示する
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * StaggerContainer内で使用する個別アイテム
 * コンテナの variants に連動してアニメーションする
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ===================================
 * ホバーカードラッパー
 * ピクセルアート風のホバーエフェクトを付与
 * =================================== */

type PixelHoverCardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * ピクセルアート風ホバーエフェクト付きカード
 * ホバー時にグロー・スケールアニメーションを適用する
 */
export function PixelHoverCard({ children, className }: PixelHoverCardProps) {
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {/* ホバー時スキャンラインオーバーレイ */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 161, 151, 0.03) 2px,
            rgba(0, 161, 151, 0.03) 4px
          )`,
        }}
      />
    </motion.div>
  );
}

/* ===================================
 * グリッチテキスト
 * =================================== */

type GlitchTextProps = {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
};

/**
 * グリッチエフェクト付きテキスト
 * CSSの ::before, ::after 疑似要素でグリッチを表現する
 */
export function GlitchText({ children, className, as: Tag = 'span' }: GlitchTextProps) {
  return (
    <Tag className={cn('glitch-text', className)} data-text={children}>
      {children}
    </Tag>
  );
}

/* ===================================
 * フローティングピクセルパーティクル
 * =================================== */

type PixelParticlesProps = {
  /** パーティクル数 */
  count?: number;
  className?: string;
};

/**
 * フローティングピクセルパーティクル背景
 * ランダムな位置に浮遊するピクセル粒子を描画する
 */
export function PixelParticles({ count = 20, className }: PixelParticlesProps) {
  /* SSR対応: 固定シードでパーティクル位置を生成 */
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i * 137.508;
    return {
      id: i,
      left: `${(seed * 7.3) % 100}%`,
      top: `${(seed * 3.7) % 100}%`,
      size: 2 + (i % 3) * 2,
      delay: (i * 0.5) % 8,
      duration: 6 + (i % 5) * 2,
      color: i % 3 === 0
        ? 'var(--color-primary)'
        : i % 3 === 1
          ? 'var(--color-accent)'
          : 'var(--color-primary-light)',
    };
  });

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -60, -120, -60, 0],
            opacity: [0.2, 0.8, 1, 0.8, 0.2],
            scale: [0.8, 1.2, 1, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ===================================
 * テキストカウンター
 * 数値をカウントアップアニメーションで表示
 * =================================== */

type CountUpProps = {
  /** 表示する数値 */
  value: number;
  /** 接頭辞 */
  prefix?: string;
  /** 接尾辞 */
  suffix?: string;
  className?: string;
};

/**
 * 数値カウントアップコンポーネント
 * 画面内に入った時に0から数値までカウントアップする
 */
export function CountUp({ value, prefix = '', suffix = '', className }: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isInView ? value : 0}
      </motion.span>
      {suffix}
    </motion.span>
  );
}
