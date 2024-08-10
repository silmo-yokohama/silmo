/**
 * メインレイアウトコンポーネント
 * アプリケーション全体の共通レイアウトを提供し、テーマの初期化を行う
 */

import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "../../hooks/useTheme";
import { setTheme } from "../../store/slices/themeSlice";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * メインレイアウトコンポーネント
 * @param {ReactNode} children - レイアウト内に表示する子要素
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { getCurrent } = useTheme();

  /**
   * コンポーネントマウント時にテーマを初期化
   */
  useEffect(() => {
    const currentTheme = getCurrent();
    dispatch(setTheme(currentTheme));
  }, []);

  return <div>{children}</div>;
};

export default MainLayout;
