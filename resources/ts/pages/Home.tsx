/**
 * ホームページコンポーネント
 * アプリケーションのメインページを表示
 */

import React from "react";
import MainLayout from "../layouts/MainLayout";

/**
 * ホームページコンポーネント
 */
const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex justify-center">
        <span className="">test</span>
      </div>
    </MainLayout>
  );
};

export default Home;
