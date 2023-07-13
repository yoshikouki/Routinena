"use client";

import { type ReactNode } from "react";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { cssVarsThemeOptions } from "./theme";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const theme = extendTheme(cssVarsThemeOptions);

  return (
    <CssVarsProvider theme={theme}>
      {getInitColorSchemeScript()}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
