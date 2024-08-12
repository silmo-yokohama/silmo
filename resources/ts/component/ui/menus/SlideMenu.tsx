import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useMenu } from "../../../hooks/useMenu";
import { menuItems } from "../../../values/menuItems";
import MenuLink from "../links/MenuLink";
import MenuFooter from "./SlideMenuFooter";

const SlideMenu: React.FC = () => {
  const { isOpen } = useMenu();
  const menuRef = useRef<HTMLDivElement>(null);
  const polygonsRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!menuRef.current || !polygonsRef.current) return;

    const menu = menuRef.current;
    const menuItems = menu.querySelectorAll(".menu-item");
    const footerLinks = menu.querySelectorAll(".footer-link");
    const polygons = polygonsRef.current.querySelectorAll("polygon");

    gsap.set(menu, { yPercent: -100 });
    gsap.set(menuItems, { y: 30, opacity: 0 });
    gsap.set(footerLinks, { opacity: 0 });

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(menu, {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.inOut",
      })
      .to(
        menuItems,
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        footerLinks,
        {
          opacity: 1,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );

    // ポリゴンアニメーション
    polygons.forEach((polygon) => {
      gsap.to(polygon, {
        rotation: gsap.utils.random(0, 360),
        x: gsap.utils.random(-10, 10),
        y: gsap.utils.random(-10, 10),
        scale: gsap.utils.random(0.8, 1.2),
        opacity: gsap.utils.random(0.1, 0.5),
        duration: gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center",
        delay: gsap.utils.random(0, 5),
      });
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [isOpen]);

  // ポリゴンを生成する関数
  const generatePolygons = (count: number) => {
    const polygons = [];
    for (let i = 0; i < count; i++) {
      const points = [];
      const sides = gsap.utils.random(3, 6, 1);
      for (let j = 0; j < sides; j++) {
        const angle = (j / sides) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * gsap.utils.random(20, 40);
        const y = 50 + Math.sin(angle) * gsap.utils.random(20, 40);
        points.push(`${x},${y}`);
      }
      polygons.push(
        <polygon
          key={i}
          fill={`rgba(${gsap.utils.random(0, 255)}, ${gsap.utils.random(
            0,
            255
          )}, ${gsap.utils.random(0, 255)}, 0.1)`}
          points={points.join(" ")}
        />
      );
    }
    return polygons;
  };


  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-20 h-screen overflow-hidden bg-[#00A197]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(0, 161, 151, 1) 0%, rgba(0, 113, 106, 1) 90%)",
      }}
    >
      <svg
        ref={polygonsRef}
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {generatePolygons(50)}
      </svg>
      <div className="container mx-auto h-full flex flex-col justify-between px-4 py-8 relative z-10">
        <nav className="flex flex-col items-start justify-center flex-grow">
          <ul className="list-none p-0">
            {menuItems.map((item, index) => (
              <li key={index} className="my-4">
                <MenuLink name={item.name} path={item.path} />
              </li>
            ))}
          </ul>
        </nav>
        <MenuFooter />
      </div>
    </div>
  );
};

export default SlideMenu;
