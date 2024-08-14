/**
 * ホームページコンポーネント
 * アプリケーションのメインページを表示
 */

import React, { useState } from "react";
import MainLayout from "../components/layouts/MainLayout";
import FirstView from "../components/layouts/sections/Home/FirstView";
import About from "../components/layouts/sections/Home/About";
import OpeningAnimation from "../components/layouts/loading/OpeningAnimation";
import NewsStatus from "../components/layouts/sections/Home/NewsStatus";
import Service from "../components/layouts/sections/Home/Service";

const Home: React.FC = () => {
  const [showOpening, setShowOpening] = useState(true);
  const handleAnimationComplete = () => {
    setShowOpening(false);
  };

  return (
    <MainLayout>
      {showOpening && <OpeningAnimation onAnimationComplete={handleAnimationComplete} />}
      <FirstView />
      <About />
      <NewsStatus />

      <Service />
    </MainLayout>
  );
};

export default Home;
