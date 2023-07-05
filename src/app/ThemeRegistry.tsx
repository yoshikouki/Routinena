"use client";

import {
  type ReactNode,
  createContext,
  useMemo,
  useContext,
  useState,
} from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";
import { type ThemeOptions, ThemeProvider, makeStyles, styled, SxProps } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, type PaletteMode } from "@mui/material";
import { cyan, deepOrange, grey, indigo, orange } from "@mui/material/colors";

const GoogleRobotoFont = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const lightThemePalette: ThemeOptions["palette"] = {
  mode: "light",
  background: {
    default: grey[100], // #f5f5f5
  },
  primary: {
    main: cyan[100], // #b2ebf2
  },
  secondary: {
    main: deepOrange[100], // #ffccbc
  },
  text: {
    primary: grey[900], // #212121
    secondary: grey[800], // #424242
  },
};
const darkThemePalette: ThemeOptions["palette"] = {
  mode: "dark",
  background: {
    default: grey[800], // #424242
  },
  primary: {
    main: indigo[800], // #283593
  },
  secondary: {
    main: orange[800], // #ef6c00
  },
  text: {
    primary: grey[50], // #fafafa
    secondary: grey[500], // #9e9e9e
  },
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: mode === "light" ? lightThemePalette : darkThemePalette,
  typography: {
    fontFamily: GoogleRobotoFont.style.fontFamily,
    body1: { fontFamily: GoogleRobotoFont.style.fontFamily },
    body2: { fontFamily: GoogleRobotoFont.style.fontFamily },
  },
});

export const ThemeModeContext = createContext<{
  mode: "light" | "dark";
  toggleThemeMode: () => void;
}>({
  mode: "dark",
  toggleThemeMode: () => undefined,
});
export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const themeMode = useMemo(
    () => ({
      mode,
      toggleThemeMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    [mode]
  );
  const background =
    mode === "light"
      ? `linear-gradient(${theme.palette.background.default}, ${orange[50]})`
      : `linear-gradient(${theme.palette.background.default}, ${grey[900]})`;

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            background,
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
