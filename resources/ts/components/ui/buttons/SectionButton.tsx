import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { router } from "@inertiajs/react";

interface SectionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SectionButton: React.FC<SectionButtonProps> = ({ href, children, className = "" }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !textRef.current || !bgRef.current) return;

    const button = buttonRef.current;
    const text = textRef.current;
    const bg = bgRef.current;

    gsap.set(button, { overflow: "hidden" });
    gsap.set(text, { display: "inline-block" });
    gsap.set(bg, {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0)", // 透明な背景から開始
      opacity: 0,
    });
  }, []);

  const handleHover = (enter: boolean) => {
    if (!buttonRef.current || !textRef.current || !bgRef.current) return;

    const tl = gsap.timeline();
    if (enter) {
      tl.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      })
        .to(
          bgRef.current,
          {
            backgroundColor: "rgba(255, 255, 255, 1)", // 白色に変更
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          textRef.current,
          {
            y: "-100%",
            color: "#000000", // 黒色に変更
            duration: 0.2,
            ease: "power2.in",
          },
          "<"
        )
        .set(textRef.current, { y: "100%" })
        .to(textRef.current, {
          y: "0%",
          duration: 0.2,
          ease: "power2.out",
        });
    } else {
      tl.to(buttonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.in",
      })
        .to(
          bgRef.current,
          {
            backgroundColor: "rgba(255, 255, 255, 0)", // 透明に戻す
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          textRef.current,
          {
            color: "#ffffff", // 白色に戻す
            duration: 0.2,
            ease: "power2.inOut",
          },
          "<"
        );
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            router.visit(href);
          },
        });
      },
    });
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={handleClick}
    >
      <div ref={bgRef} />
      <span ref={textRef}>{children}</span>
    </button>
  );
};

export default SectionButton;
