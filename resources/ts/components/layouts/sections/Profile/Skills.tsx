import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";
import gsap from "gsap";
import { useSilmoAPI } from "../../../../hooks/useSilmoAPI";
import { Skill, SkillCategory, SkillNode } from "../../../../types/responses/Skills";
import ProfileSectionTitle from "./ProfileSectionTitle";
import { useToast } from "../../../../hooks/useToast";

export const organizeSkillData = (data: SkillNode[]): SkillCategory[] => {
  const categories: SkillCategory[] = [];
  const skillMap: { [key: string]: Skill } = {};

  data.forEach((node) => {
    if (node.parentId === null) {
      categories.push({
        id: node.id,
        name: node.name,
        slug: node.slug,
        skills: [],
      });
    } else {
      skillMap[node.id] = {
        id: node.id,
        name: node.name,
        slug: node.slug,
        rate: node.skillACF.rate,
        description: node.description,
        logo: node.skillACF.logo
          ? {
              slug: node.skillACF.logo.node.slug,
              sourceUrl: node.skillACF.logo.node.sourceUrl,
            }
          : null,
      };
    }
  });

  data.forEach((node) => {
    if (node.parentId !== null) {
      const category = categories.find((cat) => cat.id === node.parentId);
      if (category && skillMap[node.id]) {
        category.skills.push(skillMap[node.id]);
      }
    }
  });

  return categories;
};

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(50px)",
    delay: index * 100,
    config: { tension: 300, friction: 30 },
  });

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${skill.rate * 10}%`,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [inView, skill.rate]);

  return (
    <animated.div
      ref={ref}
      style={cardSpring}
      className="bg-base-200 rounded-lg shadow-md p-4 mb-4 w-full"
    >
      <div className="flex items-center mb-2">
        {skill.logo && (
          <img src={skill.logo.sourceUrl} alt={skill.logo.slug} className="w-8 h-8 mr-2" />
        )}
        <h4 className="text-lg font-semibold">{skill.name}</h4>
      </div>
      <p className="text-sm h-24 overflow-y-auto">{skill.description}</p>
      <div className="bg-base-300 rounded-full h-6 relative">
        <div ref={progressRef} className="bg-primary h-full rounded-full" style={{ width: "0%" }}>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
            Lv.{skill.rate}
          </span>
        </div>
      </div>
    </animated.div>
  );
};

const Skills: React.FC = () => {
  const { get } = useSilmoAPI();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      get<SkillNode[]>("/api/profile/skills").then((response) => {
        const organizedData = organizeSkillData(response);
        setSkillCategories(organizedData);
        setLoading(false);
      });
    } catch {
      showToast("通信中にエラーが発生しました。");
    }
  }, []);

  return (
    <div className="t bg-base-200 py-16 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <ProfileSectionTitle>Skills</ProfileSectionTitle>
        {loading ? (
          <div>Loading...</div>
        ) : (
          skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4">
                <span className="text-accent"># </span>
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Skills;
