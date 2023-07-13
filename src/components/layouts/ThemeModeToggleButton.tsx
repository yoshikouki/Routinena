"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ThemeModeToggleButton = () => {
  return (
    // <IconButton onClick={toggleThemeMode} aria-label={`${mode} mode`}>
    //   {mode === "dark" ? <DarkMode /> : <LightMode />}
    // </IconButton>
    <IconButton>
      <DarkMode />
      <LightMode />
    </IconButton>
  );
};

export default ThemeModeToggleButton;
