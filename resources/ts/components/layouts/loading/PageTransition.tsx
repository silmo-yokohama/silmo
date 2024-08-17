import React from "react";
import { useTransition, animated } from "@react-spring/web";
import { usePage } from "@inertiajs/react";

interface SpringTransitionProps {
  children: React.ReactNode;
}

/**
 * React Springを使用したページトランジションコンポーネント
 * @param {React.ReactNode} children - 子コンポーネント
 */
const PageTransition: React.FC<SpringTransitionProps> = ({ children }) => {
  const { component } = usePage();

  const transitions = useTransition(component, {
    from: { opacity: 0, transform: "translate3d(0,10px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    config: { duration: 500 },
  });

  return transitions((style, item) => (
    <animated.div style={style}>{item === component && children}</animated.div>
  ));
};

export default PageTransition;
