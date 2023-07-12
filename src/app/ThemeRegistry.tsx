"use client";

import {
  type ReactNode,
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";
import { type ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, type PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";

const GoogleRobotoFont = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const lightThemePalette: ThemeOptions["palette"] = {
  mode: "light",
  background: {
    default: "#FEFCF7",
  },
  primary: {
    main: "#F29D52",
    dark: "#A6705D",
  },
  secondary: {
    main: "#509AB2",
  },
  text: {
    primary: "#40221B",
    secondary: grey[800], // #424242
  },
};
const darkThemePalette: ThemeOptions["palette"] = {
  mode: "dark",
  background: {
    default: "#40221B",
  },
  primary: {
    main: "#F29D52",
  },
  secondary: {
    main: "#509AB2",
  },
  text: {
    primary: "#FFFCF5",
    secondary: grey[500], // #9e9e9e
  },
};

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
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
  const changeThemeMode = (theme: "light" | "dark") => {
    localStorage.theme = theme;
    setMode(theme);
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const themeMode = useMemo(
    () => ({
      mode,
      toggleThemeMode: () => changeThemeMode(mode === "light" ? "dark" : "light"),
    }),
    [mode]
  );
  const background =
    mode === "light"
      ? `linear-gradient(${theme.palette.background.default}, #ffffff)`
      : `linear-gradient(${theme.palette.background.default}, ${grey[900]})`;

  useEffect(() => {
    const isDarkMode =
      !("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (localStorage.theme === "dark" || isDarkMode) {
      changeThemeMode("dark");
    } else {
      changeThemeMode("light");
    }
  }, [mode]);

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
