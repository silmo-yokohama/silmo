import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

// アニメーションファイルのインポート
import animationData from "../../assets/json/Loading.json";

/**
 * Lottieアニメーションを表示するコンポーネント
 * @param {number | string} width - アニメーションの幅
 * @param {number | string} height - アニメーションの高さ
 */
const Loading: React.FC = () => {
  return <Player autoplay={true} loop={true} src={animationData} className="w-80 md:w-96" />;
};

export default Loading;
