import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

// アニメーションファイルのインポート
import animationData from "../../assets/json/Complate.json";

/**
 * Lottieアニメーションを表示するコンポーネント
 */
const Complete: React.FC = () => {
  return (
    <Player
      autoplay={true}
      loop={false}
      src={animationData}
      keepLastFrame={true}
      className="w-44 md:w-96"
    />
  );
};

export default Complete;
