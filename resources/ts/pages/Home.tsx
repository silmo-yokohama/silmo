/**
 * ホームページコンポーネント
 * アプリケーションのメインページを表示
 */

import React from "react";
import MainLayout from "../component/layouts/MainLayout";
import ThemeToggleButton from "../component/ui/buttons/ThemeToggleButton";

/**
 * ホームページコンポーネント
 */
const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen">
        <span className="">
          <ThemeToggleButton />
        </span>
      </div>
    </MainLayout>
  );
};

export default Home;
