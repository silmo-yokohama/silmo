import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Themes, ThemeName } from "../../../values/themes";
import LightIcon from "../../../assets/svg/LightIcon";
import DarkIcon from "../../../assets/svg/DarkIcon";

const ThemeToggleButton: React.FC = () => {
  const { activeTheme, changeTheme } = useTheme();

  const onChangeHandler = () => {
    const newTheme: ThemeName = activeTheme === Themes.light ? Themes.dark : Themes.light;

    changeTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="hidden"
        checked={activeTheme === Themes.light}
        onChange={onChangeHandler}
      />

      <LightIcon className="swap-off h-10 w-10 fill-secondary" viewBox="0 0 24 24" />

      <DarkIcon className="swap-on h-10 w-10 fill-primary" viewBox="0 0 24 24" />
    </label>
  );
};

export default ThemeToggleButton;
