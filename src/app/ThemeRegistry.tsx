"use client";

import * as React from "react";

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

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: GoogleRobotoFont.style.fontFamily,
          body1: { fontFamily: GoogleRobotoFont.style.fontFamily },
          body2: { fontFamily: GoogleRobotoFont.style.fontFamily },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
