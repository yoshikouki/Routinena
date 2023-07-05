"use client";

import { Button, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import { useThemeMode } from "./ThemeRegistry";

interface Props {
  message?: string;
}

const ThemeModeToggleButton = ({ message }: Props) => {
  const { mode, toggleThemeMode } = useThemeMode();
  return (
    <IconButton onClick={toggleThemeMode} aria-label={`${mode} mode`}>
      {mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};

export default ThemeModeToggleButton;
