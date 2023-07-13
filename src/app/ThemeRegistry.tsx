"use client";

import { type ReactNode } from "react";
import {
  Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme
} from "@mui/material/styles";
import { type Options as OptionsOfCreateCache } from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import EmotionCacheProvider from "./EmotionCacheProvider";
import { cssVarsThemeOptions } from "./theme";



export default function ThemeRegistry({
  children,
  options,
}: {
  children: ReactNode;
  options: OptionsOfCreateCache;
}) {
  const theme = extendTheme(cssVarsThemeOptions);

  return (
    <EmotionCacheProvider options={options}>
      <CssVarsProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </EmotionCacheProvider>
  );
}
