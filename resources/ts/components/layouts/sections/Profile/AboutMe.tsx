import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
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
      <h2 className="en-title text-5xl font-bold mb-4 text-center">About Me</h2>
      <p className="mb-4 text-center">
        こんにちは😊SilMoの清水陽平です。Web系のエンジニアです。
        <br />
        イラストは写真を元にAIに作ってもらいました。実物はこんなにイケメンじゃないです。
      </p>
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="md:w-1/2  mb-8 md:mb-0">
          <img
            ref={photoRef}
            src="/images/profile/youhei-shimizu.jpg"
            alt="Youhei Shimizu"
            className="rounded-full w-64 h-64 object-cover mx-auto"
          />
        </div>
        <animated.div style={textSpring} className="md:w-1/2">
          <table className="table w-full">
            <tbody>
              <tr>
                <td className="font-bold">屋号</td>
                <td>SilMo</td>
              </tr>
              <tr>
                <td className="font-bold">代表</td>
                <td>清水 陽平</td>
              </tr>
              <tr>
                <td className="font-bold">事業</td>
                <td>
                  <ul className="flex flex-col md:flex-row gap-1 flex-wrap">
                    <li className="md:after:content-['/']">フロントエンド開発</li>
                    <li className="md:after:content-['/']">バックエンド開発</li>
                    <li className="md:after:content-['/']">WordPress</li>
                    <li className="md:after:content-['/']">ホームページ制作</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="font-bold">所在地</td>
                <td>
                  神奈川県横浜市西区 <br />
                  <span className="text-xs">※事務所兼住居なので住所は非公開</span>
                </td>
              </tr>
              <tr>
                <td className="font-bold">趣味</td>
                <td>
                  <ul className="flex flex-col md:flex-row gap-1 flex-wrap">
                    <li className="md:after:content-['/']">スポーツ全般（特に野球）</li>
                    <li className="md:after:content-['/']">ゲーム</li>
                    <li className="md:after:content-['/']">食べること</li>
                    <li className="md:after:content-['/']">旅行</li>
                    <li>お酒</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="font-bold">
                  <span className="hidden md:inline">
                    適格請求書発行事業者
                    <br />
                  </span>
                  登録番号
                </td>
                <td>T-9810899112904</td>
              </tr>
            </tbody>
          </table>
        </animated.div>
      </div>
    </div>
  );
};

export default AboutMe;
