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
      <LoadingOverlay />
      <Header />
      {children}

      <ContactLink />
      <FooterContact />
      <Footer />
    </main>
  );
};

export default MainLayout;
