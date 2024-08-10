import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "../Utils/useTheme";
import { themeChange } from "../Redux/themeSlicer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = useTheme();
    const themeName = theme.getCurrent();

    dispatch(themeChange(themeName));
  }, []);

  return <div>{children}</div>;
};

export default MainLayout;
