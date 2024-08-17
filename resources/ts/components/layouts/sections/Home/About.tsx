import React from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import SectionButton from "../../../ui/buttons/SectionButton";
import Cording from "../../../../assets/lottie/Cording";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const titleAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-100px)",
    config: config.slow,
    delay: 300,
  });

  const contentAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(100px)",
    config: config.slow,
    delay: 300,
  });

  return (
    <section
      ref={ref}
      className="relative md:h-screen flex items-center justify-center bg-base-200 overflow-hidden py-40 md:py-0 "
    >
      <div className="container mx-auto px-4 text-center z-10">
        <animated.h1
          style={titleAnimation}
          className="en-title text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-wider text-accent"
        >
          CRAFT YOUR WEB!!
        </animated.h1>
        <animated.div style={contentAnimation} className="text-base-content">
          <h2 className="text-xl md:text-2xl mb-8 md:mb-12">
            SilMoは横浜で活動する
            <br className="inline md:hidden" />
            フリーランスWebクリエイター
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto">
            横浜のワークスペースを起点に、コーポレートサイトの制作からWebシステムの開発まで幅広く対応しています。
            <br />
            クライアントサイド・サーバーサイドの設計と実装、ローンチ後の保守管理まで一気通貫でサービスを提供しております。
          </p>
        </animated.div>
        <SectionButton href="/profile">ABOUT</SectionButton>
      </div>
      <div className="absolute bottom-1 right-1 md:bottom-10 md:right-10">
        <Cording />
      </div>
    </section>
  );
};

export default About;
