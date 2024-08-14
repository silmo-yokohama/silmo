import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { useSpring, animated } from "react-spring";
import { useSilmoAPI } from "../../../../hooks/useSilmoAPI";
import { Work } from "../../../../types/responses/Works";
import SectionHeader from "../../header/SectionHeader";

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
    <section className="bg-neutral">
      <SectionHeader title="Works" subtitle="SilMoの実績紹介" image="/images/photo/workdesk.jpg" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 mt-5 md:-mt-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works?.map((work) => (
              <WorkItem key={work.workId} work={work} />
            ))}
          </div>
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
        <div className="p-4 bg-neutral-content">
          <h3 className="text-lg font-semibold text-neutral mb-2">{work.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {work.skill.nodes.map((skill) => (
              <span key={skill.skillId} className="badge badge-primary badge-sm text-gray-100">
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {new Date(work.date).toLocaleDateString()}
            </span>
            <button className="btn btn-primary text-gray-100 btn-sm">LEARN MORE</button>
          </div>
        </div>
      </Link>
    </animated.div>
  );
};

export default Works;
