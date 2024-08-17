import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

// アニメーションファイルのインポート
import animationData from "../../assets/json/Cording.json";

/**
 * Lottieアニメーションを表示するコンポーネント
 */
const Cording: React.FC = () => {
  return <Player autoplay={true} loop={true} src={animationData} className="w-44 md:w-96" />;
};

export default Cording;
