import React from "react";
import { IPlayerProps, Player } from "@lottiefiles/react-lottie-player";

/**
 * Lottieアニメーションを表示するコンポーネント
 */
const LottieAnimation: React.FC<IPlayerProps> = (props) => {
  return <Player {...props} />;
};

export default LottieAnimation;
