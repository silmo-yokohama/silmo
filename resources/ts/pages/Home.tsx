/**
 * ホームページコンポーネント
 * アプリケーションのメインページを表示
 */

import React from "react";
import MainLayout from "../component/layouts/MainLayout";
import FirstView from "../component/layouts/sections/Home/FirstView";

/**
 * ホームページコンポーネント
 */
const Home: React.FC = () => {
  return (
    <MainLayout>
      <FirstView />
    </MainLayout>
  );
};

export default Home;
