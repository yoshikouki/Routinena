"use client";

import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const GoogleRobotoFont = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// When needed::: first argument is needed if you have common enterprise theme, and second argument is to override your enterprise theme.
// apply fonts to all other typography options like headings, subtitles, etc...
const defaultTheme = createTheme({
  typography: {
    fontFamily: GoogleRobotoFont.style.fontFamily,
    body1: { fontFamily: GoogleRobotoFont.style.fontFamily },
    body2: { fontFamily: GoogleRobotoFont.style.fontFamily },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
