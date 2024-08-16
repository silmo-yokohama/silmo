import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { useSpring, animated } from "@react-spring/web";
import { useSilmoAPI } from "../../../../hooks/useSilmoAPI";
import { Work } from "../../../../types/responses/Works";
import SectionHeader from "../../header/SectionHeader";
import SectionButton from "../../../ui/buttons/SectionButton";
import { format } from "date-fns";

/**
 * 実績セクションを表示するコンポーネント
 */
const Works: React.FC = () => {
  const { get } = useSilmoAPI();
  const [works, setWorks] = useState<Work[] | null>(null);

  useEffect(() => {
    // APIから最新の実績データを取得
    get<Work[]>("/api/works/latest").then((data) => {
      setWorks(data);
    });
  }, []);

  return (
    <section className="bg-base-100">
      <SectionHeader title="Works" subtitle="SilMoの実績紹介" image="/images/photo/workdesk.jpg" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 mt-5 md:-mt-[100px] pb-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {works?.map((work) => (
              <WorkItem key={work.workId} work={work} />
            ))}
          </div>
          <SectionButton href="/works">もっと見る</SectionButton>
        </div>
      </div>
    </section>
  );
};

/**
 * 個別の実績アイテムを表示するコンポーネント
 * @param {Work} work - 実績データ
 */
const WorkItem: React.FC<{ work: Work }> = ({ work }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { scale, shadow } = useSpring({
    scale: isHovered ? 1.05 : 1,
    shadow: isHovered ? "0 5px 15px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.15)",
    filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={{ scale, boxShadow: shadow }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-base-100 rounded-lg overflow-hidden"
    >
      <Link href={`/works/${work.workId}`} className="block">
        <animated.img
          src={work.workACF.eyecatch.node.sourceUrl}
          alt={work.title}
          className="w-full h-64 object-cover transition-all duration-300 ease-in-out md:grayscale md:hover:grayscale-0"
        />
        <div className="p-4 bg-base-200">
          <h3 className="text-lg font-semibold text-base-content mb-2">{work.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {work.skill.nodes.map((skill) => (
              <span key={skill.skillId} className="badge badge-secondary badge-sm text-gray-900">
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-base-content">
              {format(new Date(work.date), "yyyy.MM.dd")}
            </span>
            <button className="btn btn-primary text-gray-100 btn-sm">LEARN MORE</button>
          </div>
        </div>
      </Link>
    </animated.div>
  );
};

export default Works;
