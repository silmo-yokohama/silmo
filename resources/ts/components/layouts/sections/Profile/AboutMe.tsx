import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

/**
 * AboutMeコンポーネント
 * @returns {JSX.Element} AboutMe セクションの要素
 */
const AboutMe: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const photoRef = useRef<HTMLImageElement>(null);

  // テキストのアニメーション
  const textSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50px)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // 写真のアニメーション
  useEffect(() => {
    if (inView && photoRef.current) {
      gsap.from(photoRef.current, {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        rotate: -10,
        ease: "power3.out",
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="container mx-auto px-4 py-16 md:py-24 bg-neutral text-neutral-content"
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img
            ref={photoRef}
            src="/images/profile-photo.jpg"
            alt="SilMo"
            className="rounded-full w-64 h-64 object-cover mx-auto"
          />
        </div>
        <animated.div style={textSpring} className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About SilMo</h2>
          <p className="mb-4">
            こんにちは、SilMoです。Webエンジニアとして、クリエイティブで革新的なソリューションを提供することに情熱を注いでいます。
          </p>
          <table className="table w-full">
            <tbody>
              <tr>
                <td className="font-bold">名前</td>
                <td>SilMo</td>
              </tr>
              <tr>
                <td className="font-bold">職業</td>
                <td>Webエンジニア</td>
              </tr>
              <tr>
                <td className="font-bold">場所</td>
                <td>横浜</td>
              </tr>
              <tr>
                <td className="font-bold">趣味</td>
                <td>プログラミング、読書、旅行</td>
              </tr>
            </tbody>
          </table>
        </animated.div>
      </div>
    </div>
  );
};

export default AboutMe;
