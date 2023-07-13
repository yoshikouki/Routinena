"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/material";

const ThemeModeToggleButton = () => {
  const { mode, setMode } = useColorScheme();
  const modeString = mode === "light" ? "dark" : "light";
  return (
    <IconButton
      onClick={() => {
        setMode(modeString);
      }}
      aria-label={`${modeString} mode`}
    >
      {mode === "light" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeModeToggleButton;
