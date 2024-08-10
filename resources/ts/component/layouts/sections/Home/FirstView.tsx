import React from "react";
import { useTheme } from "../../../../hooks/useTheme";
import { Themes } from "../../../../values/themes";

const FirstView: React.FC = () => {
  const { activeTheme } = useTheme();
  const imgPath: string = activeTheme === Themes.light
    ? "/images/photo/yokohama-day.jpg"
    : "/images/photo/yokohama-night.jpg";

  return (
    <div
      className="hero min-h-screen fixed -z-10"
      style={{
        backgroundImage: `url(${imgPath})`,
      }}
    >
      <div className="t hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg">
          <h1 className="t digital text-5xl md:text-7xl mb-5 font-bold">
            Hello World!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FirstView;
