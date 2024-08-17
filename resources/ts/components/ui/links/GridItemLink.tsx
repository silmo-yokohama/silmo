// resources/ts/components/common/GridItemLink.tsx

import React from "react";
import { Link } from "@inertiajs/react";
import { useSpring, animated, config } from "@react-spring/web";

interface GridItemLinkProps {
  href: string;
  image: string;
  title: string;
  description?: string | null;
  badges: string[];
}

const GridItemLink: React.FC<GridItemLinkProps> = ({ href, image, title, description, badges }) => {
  const [props, set] = useSpring(() => ({
    transform: "translate3d(0px, 0px, 0px) scale(1)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    config: config.gentle,
  }));

  const [imageProps, setImage] = useSpring(() => ({
    transform: "scale(1)",
    config: config.gentle,
  }));

  const [arrowProps, setArrow] = useSpring(() => ({
    transform: "translateX(0px)",
    config: config.gentle,
  }));

  const onHover = () => {
    set({
      transform: "translate3d(0px, -5px, 0px) scale(1.02)",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    });
    setImage({ transform: "scale(1.05)" });
    setArrow({ transform: "translateX(4px)" });
  };

  const onLeave = () => {
    set({
      transform: "translate3d(0px, 0px, 0px) scale(1)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    });
    setImage({ transform: "scale(1)" });
    setArrow({ transform: "translateX(0px)" });
  };

  return (
    <Link href={href} className="block">
      <animated.div
        className="bg-base-100 rounded-lg overflow-hidden"
        style={props}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
          <animated.img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
            style={imageProps}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/80 text-primary-content text-xs rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          {description && (
            <p className="text-sm text-base-content mb-4 line-clamp-2">{description}</p>
          )}
          <div className="flex items-center text-primary">
            <span className="text-sm font-medium mr-2">詳細を見る</span>
            <animated.svg
              className="w-4 h-4"
              style={arrowProps}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </animated.svg>
          </div>
        </div>
      </animated.div>
    </Link>
  );
};

export default GridItemLink;
