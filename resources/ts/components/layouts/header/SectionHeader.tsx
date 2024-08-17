import React from "react";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

/**
 * タイトルセクションコンポーネント
 * @param {string} title - メインタイトル
 * @param {string} subtitle - サブタイトル（最大50文字）
 * @param {string} image - 背景画像のパス
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, image }) => {
  return (
    <ParallaxBanner>
      <ParallaxBannerLayer
        image={image}
        speed={-20}
        opacity={[1, 0.8]}
        scale={[1.05, 1, "easeOutCubic"]}
        translateY={[0, 50]}
      />
      <ParallaxBannerLayer>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      </ParallaxBannerLayer>
      <div className="relative flex flex-col items-center justify-center h-full text-white py-10 md:pt-20 md:pb-36">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 en-title text-center">{title}</h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-md md:text-lg mx-auto text-center">{subtitle}</p>
        </div>
      </div>
    </ParallaxBanner>
  );
};

export default SectionHeader;
