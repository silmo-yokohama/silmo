import React, { useState, useEffect, useCallback } from "react";
import { Link } from "@inertiajs/react";
import { useSpring, animated } from "@react-spring/web";
import { throttle } from "lodash"; // lodashをインストールしてください

/**
 * お問い合わせリンクコンポーネント
 * PC画面では左端に固定され、ホバーで拡大するアニメーション付きリンク
 * スマホ画面では下部に固定表示されるリンク
 * 100vh分スクロールした後にフェードイン、上に戻すとフェードアウト
 */
const ContactLink: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ホバーアニメーションの設定
  const linkAnimation = useSpring({
    width: isHovered ? 240 : 80,
    config: { tension: 300, friction: 20 },
  });

  // フェードインアニメーションの設定
  const fadeAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    config: { duration: 300 },
  });

  const handleScroll = useCallback(
    throttle(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollY > windowHeight);
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* PC用のリンク */}
      <animated.div
        style={{
          ...linkAnimation,
          ...fadeAnimation,
        }}
        className="fixed left-0 bottom-[10vw] transform -translate-y-1/2 bg-primary text-primary-content rounded-r-md overflow-hidden cursor-pointer hidden md:flex items-center z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/contact" className="flex items-center w-full h-full px-5 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="ml-3 text-lg font-semibold whitespace-nowrap overflow-hidden">
            お問い合わせ
          </span>
        </Link>
      </animated.div>

      {/* スマホ用のリンク */}
      <animated.div
        style={fadeAnimation}
        className="fixed bottom-0 left-0 right-0 bg-primary text-primary-content md:hidden z-10"
      >
        <Link href="/contact" className="flex items-center justify-center w-full px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-lg font-semibold">お問い合わせ</span>
        </Link>
      </animated.div>
    </>
  );
};

export default ContactLink;
