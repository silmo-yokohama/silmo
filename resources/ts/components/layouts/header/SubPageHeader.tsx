import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

interface SubPageHeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ title, subtitle, image }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const subtitleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    delay: 200,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <div
      ref={ref}
      className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // パララックス効果を追加
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <animated.h1 style={titleSpring} className="text-5xl md:text-7xl font-bold mb-6 en-title">
          {title}
        </animated.h1>
        <animated.p style={subtitleSpring} className="text-xl md:text-3xl">
          {subtitle}
        </animated.p>
      </div>
    </div>
  );
};

export default SubPageHeader;
