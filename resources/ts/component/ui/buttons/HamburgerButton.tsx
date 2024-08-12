import React, { useRef, useEffect } from 'react';
import { useMenu } from '../../../hooks/useMenu';
import { gsap } from 'gsap';

const HamburgerButton: React.FC = () => {
  const { isOpen, toggle } = useMenu();
  const buttonRef = useRef<HTMLLabelElement>(null);
  const lineRefs = useRef<SVGLineElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      // アニメーション: ハンバーガーから斜線へ
      gsap.to(lineRefs.current[0], {
        attr: { x1: 2, y1: 2, x2: 22, y2: 22 },
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      gsap.to(lineRefs.current[1], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
    } else {
      // アニメーション: 斜線からハンバーガーへ
      gsap.to(lineRefs.current[0], {
        attr: { x1: 2, y1: 8, x2: 22, y2: 8 },
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      gsap.to(lineRefs.current[1], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isOpen]);

  return (
    <label
      ref={buttonRef}
      className="btn btn-square bg-neutral-content border-none shadow-md outline-none hover:bg-neutral-content cursor-pointer"
    >
      <input
        type="checkbox"
        className="hidden"
        onChange={toggle}
        checked={isOpen}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line ref={el => lineRefs.current[0] = el!} x1="2" y1="8" x2="22" y2="8"></line>
        <line ref={el => lineRefs.current[1] = el!} x1="2" y1="16" x2="22" y2="16"></line>
      </svg>
    </label>
  );
};

export default HamburgerButton;
