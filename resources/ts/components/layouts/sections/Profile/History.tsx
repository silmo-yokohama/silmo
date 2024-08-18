import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useSilmoAPI } from "../../../../hooks/useSilmoAPI";
import { HistoryItem, HistoryItems } from "../../../../types/responses/ProfileHistory";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import ProfileSectionTitle from "./ProfileSectionTitle";
import { useToast } from "../../../../hooks/useToast";

/**
 * Historyコンポーネント
 * @returns {JSX.Element} History セクションの要素
 */
const History: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { get } = useSilmoAPI();
  const [histories, setHistories] = useState<HistoryItems>([]);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      get<HistoryItems>("/api/profile/histories").then((data) => {
        const lastData: HistoryItem = {
          title: "そして伝説へ…",
          content: `<p>俺たちの冒険はこれからだ！（完）</p>
          <p>ということで、これからも日々研鑽し続け、<br>どこかの業界で勇者になれるように精進していきます。</p>
          <p>ここまで見てくれてありがとうございました🙌</p>
          `,
          featuredImage: {
            node: {
              sourceUrl: "/images/profile/yuusya_game.png",
            },
          },
        };

        setHistories([...data, lastData]);
      });
    } catch {
      showToast("通信中にエラーが発生しました。");
    }
  }, []);

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
    <div ref={ref} className="t bg-base-100 text-base-content py-16 md:py-24">
      <div className="max-w-[1536px] mx-auto px-4">
        <animated.div style={titleSpring} className="text-3xl font-bold mb-8 text-center">
          <ProfileSectionTitle>Journey</ProfileSectionTitle>
        </animated.div>
        <ul
          ref={timelineRef}
          className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
        >
          {histories.map((item, index) => {
            const sanitizedContent = DOMPurify.sanitize(item.content);
            const isTimelineStart = index % 2 === 0;

            return (
              <li key={index}>
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
                  className={`timeline-${isTimelineStart ? "start" : "end"} md:w-5/6 ${
                    isTimelineStart ? "md:text-end" : "md:text-start"
                  } pb-16`}
                >
                  <div className="md:flex md:items-start md:gap-4">
                    <div className={`grow ${isTimelineStart ? "md:order-2" : "md:order-1"}`}>
                      <time className="font-mono italic text-2xl">{item.title}</time>
                      <div className="prose prose-sm max-w-none text-base text-left">
                        {parse(sanitizedContent)}
                      </div>
                    </div>
                    <div
                      className={`md:w-40 flex-shrink-0 ${
                        isTimelineStart ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <img
                        src={item.featuredImage.node.sourceUrl}
                        alt={item.title}
                        className="w-full rounded-lg shadow-md mb-4 md:mb-0"
                      />
                    </div>
                  </div>
                </div>
                {index < histories.length - 1 && <hr className="bg-base-content" />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default History;
