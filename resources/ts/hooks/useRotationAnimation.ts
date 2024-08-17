import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export const useRotationAnimation = (ref: RefObject<SVGSVGElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animation: gsap.core.Tween;

    const handleMouseEnter = () => {
      animation = gsap.to(element, {
        rotation: 360,
        duration: 0.6,
        ease: "power2.inOut",
      });
    };

    const handleMouseLeave = () => {
      if (animation) {
        animation.kill();
      }
      gsap.to(element, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
};
