import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useSilmoAPI } from "../../../../hooks/useSilmoAPI";
import { HistoryItems } from "../../../../types/responses/ProfileHistory";

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

  useEffect(() => {
    get<HistoryItems>("/api/profile/histories").then((data) => {
      setHistories(data);
    });
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
    <div ref={ref} className="bg-neutral-content text-neutral py-16 md:py-24">
      <div className="container mx-auto px-4">
        <animated.h2 style={titleSpring} className="text-3xl font-bold mb-8 text-center">
          My Journey
        </animated.h2>
        <ul
          ref={timelineRef}
          className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
        >
          {histories.map((item, index) => (
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
                <time className="font-mono italic">{item.title}</time>
                <div className="text-lg font-black">{item.title}</div>
                <p className="mt-2">{item.content}</p>
                <img
                  src={item.featuredImage.node.sourceUrl}
                  alt={item.title}
                  className="mt-4 rounded-lg shadow-md w-full md:w-3/4 mx-auto"
                />
              </div>
              {index < histories.length - 1 && <hr />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
