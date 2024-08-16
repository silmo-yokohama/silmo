/**
 * メインレイアウトコンポーネント
 * アプリケーション全体の共通レイアウトを提供し、テーマの初期化を行う
 */

import React, { ReactNode, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import Header from "./header/Header";
import LoadingOverlay from "./loading/LoadingOverlay";
import { useSilmoAPI } from "../../hooks/useSilmoAPI";
import Footer from "./footer/Footer";
import ContactSection from "./sections/Home/ContactBox";
import Contact from "./common/Contact";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * メインレイアウトコンポーネント
 * @param {ReactNode} children - レイアウト内に表示する子要素
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { getCurrent, changeTheme } = useTheme();
  const { isLoading } = useSilmoAPI();

  /**
   * コンポーネントマウント時にテーマを初期化
   */
  useEffect(() => {
    const currentTheme = getCurrent();
    changeTheme(currentTheme);
  }, []);

  return (
    <main className="t bg-base-content">
      <LoadingOverlay isLoading={isLoading} />
      <Header />
      {children}

      <ContactSection />
      <Contact />
      <Footer />
    </main>
  );
};

export default MainLayout;
