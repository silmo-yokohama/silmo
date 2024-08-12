import React from "react";
import HeaderLogo from "../ui/images/HeaderLogo";
import ThemeToggleButton from "../ui/buttons/ThemeToggleButton";
import HamburgerButton from "../ui/buttons/HamburgerButton";
import SlideMenu from "../ui/menus/SlideMenu";

const Header: React.FC = () => {
  return (
    <>
      <header className="t w-full fixed bg-base-content z-30 h-[60px] md:h-[90px] px-5">
        <div className="w-full flex relative justify-start md:justify-center items-center h-full">
          <HeaderLogo className="h-[50px] md:h-[70px]" />

          <div className="absolute flex gap-2 md:gap-4 right-0 top-[50%] translate-y-[-50%]">
            <ThemeToggleButton />
            <HamburgerButton />
          </div>
        </div>
      </header>
      <SlideMenu />
    </>
  );
};

export default Header;
