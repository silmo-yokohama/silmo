import React, { useEffect, useState } from "react";
import { useSilmoAPI } from "../../../../hooks/useSilmoAPI";
import { NewsPost } from "../../../../types/responses/NewsPost";
import { format } from "date-fns";
import { useSpring, animated, useTrail, config } from "react-spring";
import { useInView } from "react-intersection-observer";

/**
 * ニュースとステータスを表示するコンポーネント
 */
const NewsStatus: React.FC = () => {
  const { get } = useSilmoAPI();
  const [news, setNews] = useState<NewsPost[] | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // APIからニュースデータを取得
    get<NewsPost[]>("/api/news/latest").then((data) => {
      setNews(data);
    });
  }, []);

  // セクション全体のアニメーション
  const sectionAnimation = useSpring({
    opacity: inView ? 1 : 0,
    config: config.gentle,
  });

  // 見出しのアニメーション
  const headingAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(-50px)",
    delay: 200,
    config: config.gentle,
  });

  // ニュースリストのアニメーション
  const trail = useTrail(news?.length ?? 0, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(100px)",
    delay: 200,
    config: config.gentle,
  });

  return (
    <animated.section
      ref={ref}
      style={sectionAnimation}
      className="relative py-16 md:py-36 px-2 md:px-4 text-neutral-content"
    >
      <div className="md:max-w-6xl md:m-auto flex flex-col md:flex-row text-neutral-content gap-5 md:gap-20 items-center">
        <animated.h2
          style={headingAnimation}
          className="
            relative text-4xl en-title text-center md:text-left md:text-6xl italic !leading-[0.9] tracking-tighter z-10 mb-6 md:mb-0 w-fit mx-auto md:mx-0
            after:absolute after:content-[''] after:block after:bg-primary after:-z-10
            after:left-0 after:bottom-0 after:h-4 after:w-full
            md:after:-left-10 md:after:-top-10 md:after:w-32 md:after:h-32 md:after:rounded-full
          "
        >
          News & <br className="hidden md:block" />
          Status
        </animated.h2>

        <ul className="flex-grow w-full md:w-auto">
          {trail.map((style, index) => {
            const item = news?.[index];
            if (!item) return null;

            const formattedDate = format(new Date(item.modified), "yyyy.MM.dd");

            return (
              <animated.li
                key={item.id}
                style={style}
                className="flex gap-5 py-5 px-3 mx-3 md:mx-0 items-center border-b border-dashed border-accent"
              >
                <span className="text-sm md:text-base">{formattedDate}</span>
                <p className="text-sm md:text-base">{item.title}</p>
              </animated.li>
            );
          })}
        </ul>
      </div>
    </animated.section>
  );
};

export default NewsStatus;
