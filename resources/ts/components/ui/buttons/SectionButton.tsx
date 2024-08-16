import React, { useState, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import { router } from "@inertiajs/react";

interface SectionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * アニメーション付きのセクションボタンコンポーネント
 * @param href - ボタンのリンク先URL
 * @param children - ボタン内のコンテンツ
 * @param className - 追加のCSSクラス
 */
const SectionButton: React.FC<SectionButtonProps> = ({ href, children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // ボタンのスケールとテキストのY位置のアニメーション
  const { scale, y } = useSpring({
    scale: isHovered ? 1.05 : 1,
    y: isHovered ? 0 : 100, // ホバー時に0%, 非ホバー時に100%（下に隠れる）
    config: { tension: 200, friction: 20 },
  });

  // ホバー状態の変更をハンドル
  const handleHover = useCallback((enter: boolean) => {
    setIsHovered(enter);
  }, []);

  // クリックイベントのハンドル
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.visit(href);
    },
    [href]
  );

  return (
    <div className="text-center mt-12 mb-16 md:mt-16 md:mb-24">
      <animated.button
        className={`relative overflow-hidden transition-all duration-300 border-2 border-base-content px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold text-neutral rounded-full ${
          isHovered ? "bg-primary" : "bg-base-100"
        } ${className}`}
        style={{
          scale,
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handleClick}
      >
        <div className="relative">
          {/* 非ホバー時のテキスト */}
          <animated.span
            className="block text-secondary"
            style={{
              transform: y.to((value) => `translateY(-${value}%)`),
              opacity: y.to((value) => 1 - value / 100),
            }}
          >
            {children}
          </animated.span>
          {/* ホバー時のテキスト */}
          <animated.span
            className="absolute top-0 left-0 w-full text-primary"
            style={{
              transform: y.to((value) => `translateY(${100 - value}%)`),
              opacity: y.to((value) => value / 100),
            }}
          >
            {children}
          </animated.span>
        </div>
      </animated.button>
    </div>
  );
};

export default SectionButton;
