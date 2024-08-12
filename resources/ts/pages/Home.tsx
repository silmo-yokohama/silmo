/**
 * ホームページコンポーネント
 * アプリケーションのメインページを表示
 */

import React, { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import FirstView from "../components/layouts/sections/Home/FirstView";
import OpeningAnimation from "../components/layouts/loading/OpeningAnimation";

/**
 * ホームページコンポーネント
 */
const Home: React.FC = () => {
  const [showOpening, setShowOpening] = useState(true);
  const handleAnimationComplete = () => {
    setShowOpening(false);
  };

  return (
    <MainLayout>
      {showOpening && <OpeningAnimation onAnimationComplete={handleAnimationComplete} />}
      <FirstView />
    </MainLayout>
  );
};

export default Home;
