/**
 * テーマ操作のためのカスタムフック
 * テーマの取得、変更、現在のテーマの状態管理を提供
 */

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setTheme } from "../store/slices/themeSlice";
import { Themes, ThemeStorageKey } from "../values/themes";

/**
 * テーマ操作のためのカスタムフック
 * @returns テーマ操作のためのメソッドと現在のテーマ
 */
export const useTheme = () => {
  const dispatch = useDispatch();
  const activeTheme = useSelector((state: RootState) => state.theme.activeTheme);

  /**
   * 現在のテーマを取得
   * @returns 現在のテーマ名
   */
  const getCurrent = (): string => {
    return localStorage.getItem(ThemeStorageKey) || Themes.light;
  };

  /**
   * テーマを変更
   * @param theme 新しいテーマ名
   */
  const changeTheme = (theme: string) => {
    dispatch(setTheme(theme));
  };

  return {
    activeTheme,
    getCurrent,
    changeTheme,
  };
};
