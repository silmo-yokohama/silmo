import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

interface Skill {
  name: string;
  level: number;
}

const skillsData: Skill[] = [
  { name: "React", level: 90 },
  { name: "Laravel", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "GraphQL", level: 70 },
  { name: "Docker", level: 65 },
];

/**
 * Skillsコンポーネント
 * @returns {JSX.Element} Skills セクションの要素
 */
const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillBarsRef = useRef<HTMLDivElement>(null);

  // タイトルのアニメーション
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  // スキルバーのアニメーション
  useEffect(() => {
    if (inView && skillBarsRef.current) {
      gsap.from(skillBarsRef.current.children, {
        width: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="container mx-auto px-4 py-16 md:py-24 bg-neutral text-neutral-content"
    >
      <animated.h2 style={titleSpring} className="text-3xl font-bold mb-8 text-center">
        My Skills
      </animated.h2>
      <div ref={skillBarsRef} className="space-y-4">
        {skillsData.map((skill, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/4 font-bold mb-2 md:mb-0">{skill.name}</div>
            <div className="w-full md:w-3/4 bg-neutral-content rounded-full h-6">
              <div
                className="bg-primary h-6 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
