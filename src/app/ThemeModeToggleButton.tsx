"use client";

import { DarkMode, LightMode } from "@mui/icons-material";

import { IconButton } from "@mui/material";
import { useThemeMode } from "./ThemeRegistry";

const ThemeModeToggleButton = () => {
  const { mode, toggleThemeMode } = useThemeMode();
  return (
    <IconButton onClick={toggleThemeMode} aria-label={`${mode} mode`}>
      {mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeModeToggleButton;
