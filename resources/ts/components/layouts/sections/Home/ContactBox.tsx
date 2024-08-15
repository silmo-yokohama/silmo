import React, { useState } from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import { Link } from "@inertiajs/react";
import { useSpring, animated } from "@react-spring/web";

/**
 * ContactSection コンポーネント
 * お問い合わせページへのリンクを含むセクションを表示します。
 */
const ContactSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // ボタンのアニメーション
  const buttonSpring = useSpring({
    transform: isHovered ? "scale(1.05) translateY(-5px)" : "scale(1) translateY(0px)",
    boxShadow: isHovered
      ? "0 10px 25px rgba(0, 161, 151, 0.5)"
      : "0 5px 15px rgba(0, 161, 151, 0.2)",
    config: { tension: 300, friction: 10 },
  });

  // 光るエフェクトのアニメーション
  const glowSpring = useSpring({
    from: { left: "-100%" },
    to: { left: isHovered ? "100%" : "-100%" },
    config: { duration: 1500 },
    reset: true,
  });

  return (
    <div className="p-3 md:p-5 bg-neutral">
      <ParallaxBanner
        layers={[
          {
            image: "/images/photo/typewriter.jpg",
            speed: -20,
          },
        ]}
        className="relative flex justify-center items-center py-10"
      >
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* コンテンツ */}
        <div className="inset-0 flex flex-col items-center justify-center text-white z-[1]">
          <h2 className="en-title text-4xl font-bold mb-2">CONTACT</h2>
          <h3 className="text-sm text-primary mb-4">お問い合わせ</h3>
          <p className="text-md mb-6">お仕事のご依頼・ご相談などお気軽に！</p>
          <animated.div
            style={buttonSpring}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden"
          >
            <Link
              href="/contact"
              className="
                bg-primary
                text-white
                font-bold
                py-2
                px-4
                rounded
                inline-block
              "
            >
              お問い合わせはこちら
            </Link>
            <animated.div
              style={glowSpring}
              className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            />
          </animated.div>
        </div>
      </ParallaxBanner>
    </div>
  );
};

export default ContactSection;
