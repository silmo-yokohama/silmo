import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Themes } from "../../../values/themes";

interface HeaderLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ className, ...options }) => {
  const { activeTheme } = useTheme()


  const imgPath =
    activeTheme === Themes.light
      ? "/images/logo/logo-h-black.png"
      : "/images/logo/logo-h-white.png";

  return <img src={imgPath} alt="SilMo" className={className} {...options} />;
};

export default HeaderLogo;
