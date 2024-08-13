import React from "react";
import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer";
import SectionButton from "../../../ui/buttons/SectionButton";

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
      className="min-h-screen flex items-center justify-center bg-neutral overflow-hidden py-16 md:py-0"
    >
      <div className="container mx-auto px-4 text-center">
        <animated.h1
          style={titleAnimation}
          className="en-title text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-wider text-neutral-content"
        >
          WELCOME TO <br className="inline md:hidden" />
          SilMo
        </animated.h1>
        <animated.div style={contentAnimation} className="text-neutral-content">
          <h2 className="text-xl md:text-2xl mb-8 md:mb-12">
            横浜で活動する
            <br className="inline md:hidden" />
            フリーランスWebエンジニア
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-3xl mx-auto">
            横浜の事務所を拠点に、ホームページ制作やWebアプリ開発などを請け負っております。
            フロントエンド・バックエンドの設計開発、リリース後の運用サポートなど一貫して承っております。
          </p>
          <p className="text-base md:text-lg mb-10 md:mb-12 max-w-3xl mx-auto text-primary">
            SilMoは「適格請求書発行事業者」として登録された事業者です。
          </p>
        </animated.div>
        <SectionButton
          href="/about"
          className="border-2 border-neutral-content px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold text-neutral-content rounded-full"
        >
          ABOUT
        </SectionButton>
      </div>
    </section>
  );
};

export default About;
