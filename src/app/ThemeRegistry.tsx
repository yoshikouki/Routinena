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
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GoogleRobotoFont = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const ThemeModeContext = createContext<{ mode: "light" | "dark"; toggleThemeMode: () => void }>({
  mode: "dark",
  toggleThemeMode: () => undefined,
});
export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
        typography: {
          fontFamily: GoogleRobotoFont.style.fontFamily,
          body1: { fontFamily: GoogleRobotoFont.style.fontFamily },
          body2: { fontFamily: GoogleRobotoFont.style.fontFamily },
        },
      }),
    [mode]
  );
  const themeMode = useMemo(
    () => ({
      mode,
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
