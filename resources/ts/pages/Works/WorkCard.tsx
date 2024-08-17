// resources/ts/components/works/WorkCard.tsx

import React from "react";
import { Link } from "@inertiajs/react";
import { useSpring, animated } from "@react-spring/web";
import { Work } from "../../types/Works";

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const [props, set] = useSpring(() => ({
    scale: 1,
    y: 0,
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  return (
    <Link href={`/work/${work.id}`}>
      <animated.div
        className="relative h-96 rounded-lg overflow-hidden shadow-lg cursor-pointer"
        style={{
          ...props,
          backgroundImage: `url(${work.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => set({ scale: 1.05, y: -10 })}
        onMouseLeave={() => set({ scale: 1, y: 0 })}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 hover:opacity-90"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-semibold mb-2">{work.title}</h3>
          <p className="text-base">{work.description}</p>
        </div>
      </animated.div>
    </Link>
  );
};

export default WorkCard;
