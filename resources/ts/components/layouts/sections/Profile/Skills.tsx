import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import gsap from "gsap";

interface Skill {
  name: string;
  icon: string;
  description: string;
  level: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "フロントエンド",
    skills: [
      { name: "React", icon: "/icons/react.svg", description: "モダンなUI開発", level: 9 },
      { name: "React", icon: "/icons/react.svg", description: "モダンなUI開発", level: 9 },
      { name: "React", icon: "/icons/react.svg", description: "モダンなUI開発", level: 9 },
      { name: "React", icon: "/icons/react.svg", description: "モダンなUI開発", level: 9 },
      { name: "TypeScript", icon: "/icons/typescript.svg", description: "型安全な開発", level: 8 },
      // 他のフロントエンドスキルを追加
    ],
  },
  {
    name: "バックエンド",
    skills: [
      {
        name: "Node.js",
        icon: "/icons/nodejs.svg",
        description: "サーバーサイドJavaScript",
        level: 7,
      },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      { name: "PHP", icon: "/icons/php.svg", description: "Webアプリケーション開発", level: 8 },
      // 他のバックエンドスキルを追加
    ],
  },
  // 他のカテゴリーを追加
];

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(50px)",
    delay: index * 100,
  });

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${skill.level * 10}%`,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [inView, skill.level]);

  return (
    <animated.div
      ref={ref}
      style={cardSpring}
      className="bg-base-200 rounded-lg shadow-md p-4 mb-4"
    >
      <div className="flex items-center mb-2">
        <img src={skill.icon} alt={skill.name} className="w-8 h-8 mr-2" />
        <h4 className="text-lg font-semibold">{skill.name}</h4>
      </div>
      <p className="text-sm mb-2">{skill.description}</p>
      <div className="bg-base-300 rounded-full h-6 relative">
        <div ref={progressRef} className="bg-primary h-full rounded-full" style={{ width: "0%" }}>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
            Lv.{skill.level}
          </span>
        </div>
      </div>
    </animated.div>
  );
};

const Skills: React.FC = () => {
  return (
    <div className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">#{category.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <SkillCard key={skillIndex} skill={skill} index={skillIndex} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
