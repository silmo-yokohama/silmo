import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

interface HistoryItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

const historyData: HistoryItem[] = [
  {
    year: "2018",
    title: "プログラミングを始める",
    description: "独学でWebプログラミングの基礎を学び始めました。",
    image: "/images/profile/sample.png",
  },
  {
    year: "2019",
    title: "最初のWebアプリケーションを開発",
    description: "個人プロジェクトとして、シンプルなタスク管理アプリを作成しました。",
    image: "/images/history/2019.jpg",
  },
  {
    year: "2020",
    title: "フリーランスとしてキャリアをスタート",
    description: "小規模なWebサイトの制作や既存サイトの改修を請け負いました。",
    image: "/images/history/2020.jpg",
  },
  {
    year: "2021",
    title: "大規模プロジェクトに参加",
    description: "チームの一員として、企業向けの大規模Webアプリケーション開発に携わりました。",
    image: "/images/history/2021.jpg",
  },
  {
    year: "2022",
    title: "技術ブログの執筆を開始",
    description: "学んだ知識や経験を共有するため、技術ブログの運営を始めました。",
    image: "/images/history/2022.jpg",
  },
  {
    year: "2023",
    title: "オープンソースプロジェクトにコントリビュート",
    description: "複数のオープンソースプロジェクトに貢献し、コミュニティに参加しました。",
    image: "/images/history/2023.jpg",
  },
];

/**
 * Historyコンポーネント
 * @returns {JSX.Element} History セクションの要素
 */
const History: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const timelineRef = useRef<HTMLUListElement>(null);

  // タイトルのアニメーション
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // タイムラインのアニメーション
  useEffect(() => {
    if (inView && timelineRef.current) {
      gsap.from(timelineRef.current.children, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [inView]);

  return (
    <div ref={ref} className="bg-neutral-content text-neutral py-16 md:py-24">
      <div className="container mx-auto px-4">
        <animated.h2 style={titleSpring} className="text-3xl font-bold mb-8 text-center">
          My Journey
        </animated.h2>
        <ul
          ref={timelineRef}
          className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
        >
          {historyData.map((item, index) => (
            <li key={index}>
              {index > 0 && <hr />}
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={`timeline-${index % 2 === 0 ? "start" : "end"} mb-10 md:text-${
                  index % 2 === 0 ? "end" : "start"
                }`}
              >
                <time className="font-mono italic">{item.year}</time>
                <div className="text-lg font-black">{item.title}</div>
                <p className="mt-2">{item.description}</p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="mt-4 rounded-lg shadow-md w-full md:w-3/4 mx-auto"
                />
              </div>
              {index < historyData.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
