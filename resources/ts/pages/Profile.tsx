import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import SubPageHeader from "../components/layouts/header/SubPageHeader";
import AboutMe from "../components/layouts/sections/Profile/AboutMe";
import History from "../components/layouts/sections/Profile/History";
import Skills from "../components/layouts/sections/Profile/Skills";

/**
 * Aboutページコンポーネント
 *
 * @returns {JSX.Element} Aboutページの要素
 */
const Profile: React.FC = () => {
  return (
    <MainLayout>
      {/* 子ページ共通ヘッダー */}
      <SubPageHeader
        title="Profile"
        subtitle="SilMoについて"
        image="/images/photo/yokohama-night.jpg"
      />

      {/*
      写真付きで簡単な自己紹介文と
      概要をテーブルで
      */}
      <AboutMe />
      {/* スキル紹介（ReactやLaravelなど） */}
      <Skills />

      {/* 遠隔を表示 */}
      <History />
    </MainLayout>
  );
};

export default Profile;
