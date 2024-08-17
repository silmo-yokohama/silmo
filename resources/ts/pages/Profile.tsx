import React from "react";
import AboutMe from "../components/layouts/sections/Profile/AboutMe";
import History from "../components/layouts/sections/Profile/History";
import Skills from "../components/layouts/sections/Profile/Skills";
import SubPageLayout from "../components/layouts/page/SubPageLayout";

/**
 * Aboutページコンポーネント
 *
 * @returns {JSX.Element} Aboutページの要素
 */
const Profile: React.FC = () => {
  return (
    <SubPageLayout
      title="SilMoについて"
      headerTitle="Profile"
      headerSubtitle="SilMoについて"
      headerImage="/images/photo/yokohama-night.jpg"
    >
      {/*
      写真付きで簡単な自己紹介文と
      概要をテーブルで
      */}
      <AboutMe />
      {/* スキル紹介（ReactやLaravelなど） */}
      <Skills />

      {/* 遠隔を表示 */}
      <History />
    </SubPageLayout>
  );
};

export default Profile;
