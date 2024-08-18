/**
 * メインレイアウトコンポーネント
 * アプリケーション全体の共通レイアウトを提供し、テーマの初期化を行う
 */

import React, { ReactNode, useEffect } from "react";
import { useTheme } from "../../../hooks/useTheme";
import LoadingOverlay from "../loading/LoadingOverlay";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import FooterContact from "../footer/ContactBox";
import ContactLink from "../../ui/links/ContactLink";
import { ToastContainer } from "../../ui/toasts/ToastContainer";
import { Head } from "@inertiajs/react";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * メインレイアウトコンポーネント
 * @param {ReactNode} children - レイアウト内に表示する子要素
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { getCurrent, changeTheme } = useTheme();

  /**
   * コンポーネントマウント時にテーマを初期化
   */
  useEffect(() => {
    const currentTheme = getCurrent();
    changeTheme(currentTheme);
  }, []);

  return (
    <main className="t bg-base-content">
      <Head>
        <title>SilMo</title>

        <meta
          name="description"
          content="SilMoのポートフォリオサイトです。実績などをご紹介してます。更新頻度は低めですが、お仕事のご依頼もお待ちしております。"
        />
        <meta
          name="keywords"
          content="SilMo, 神奈川, 横浜 ,フリーランスエンジニア ,ポートフォリオ"
        />

        <meta property="og:site_name" content="SilMo" />
        <meta property="og:type" content="website" />

        <meta property="og:title" content="SilMo" />
        <meta
          property="og:description"
          content="SilMoのポートフォリオサイトです。実績などをご紹介してます。更新頻度は低めですが、お仕事のご依頼もお待ちしております。"
        />
        <meta property="og:image" content="https://silmo.jp/images/logo/silmo.png" />
        <meta property="og:url" content="https://silmo.jp"></meta>
      </Head>

      <LoadingOverlay />
      <Header />
      {children}

      <ContactLink />
      <FooterContact />
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default MainLayout;
