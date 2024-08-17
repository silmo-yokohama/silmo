// components/works/WorkLink.tsx

import React from "react";
import { Link } from "@inertiajs/react";
import { useSpring, animated } from "@react-spring/web";

interface WorkLinkProps {
  work: {
    workId: number;
    title: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
  } | null;
  isPrev: boolean;
}

const WorkLink: React.FC<WorkLinkProps> = ({ work, isPrev }) => {
  const [springs, api] = useSpring(() => ({
    x: 0,
  }));

  if (!work) return <div className="w-full md:w-[calc(50%-1rem)]" />;

  return (
    <Link
      href={`/work/${work.workId}`}
      className={`group flex items-center w-full md:w-[calc(50%-1rem)] ${
        isPrev && "flex-row-reverse"
      } bg-base-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}
      onMouseEnter={() => api.start({ x: isPrev ? -10 : 10 })}
      onMouseLeave={() => api.start({ x: 0 })}
    >
      <div className="w-1/3 h-24 overflow-hidden">
        <img
          src={work.featuredImage?.node.sourceUrl || "/images/photo/noimage.png"}
          alt={work.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`w-2/3 p-4 flex items-center ${
          isPrev && "flex-row-reverse"
        } justify-between gap-2 md:gap-5`}
      >
        <div>
          <span className="text-xs md:text-base font-medium text-gray-500">
            {isPrev ? "前の実績" : "次の実績"}
          </span>
          <h3 className="text-sm md:text-lg font-semibold">{work.title}</h3>
        </div>
        <animated.div style={springs} className="text-primary text-2xl">
          {isPrev ? "＜" : "＞"}
        </animated.div>
      </div>
    </Link>
  );
};

export default WorkLink;
