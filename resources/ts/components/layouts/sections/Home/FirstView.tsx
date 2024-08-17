import React from "react";
import { useTheme } from "../../../../hooks/useTheme";
import { Themes } from "../../../../values/themes";
import { ParallaxBanner } from "react-scroll-parallax";

const FirstView: React.FC = () => {
  const { activeTheme } = useTheme();
  const imgPath: string =
    activeTheme === Themes.light
      ? "/images/photo/yokohama-night.jpg"
      : "/images/photo/yokohama-night.jpg";

  return (
    <ParallaxBanner layers={[{ image: imgPath, speed: -55 }]} className="hero h-screen">
      <div className="t hero-overlay bg-opacity-60 z-[1]"></div>
      <div className="hero-content text-base-100 text-center z-[2]">
        <div className="max-w-lg">
          <h1 className="t digital text-5xl md:text-7xl mb-5 font-bold">Hello World!</h1>
        </div>
      </div>
    </ParallaxBanner>
  );
};

export default FirstView;
