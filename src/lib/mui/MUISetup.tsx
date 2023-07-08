// src/app/MuiSetup.tsx
"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";

import { muiTheme } from "./theme";

type Props = {
  children: ReactNode;
};

export default function MUISetup({ children }: Props) {
  return (
    <>
      <CssBaseline />
      {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental `app/` directory feature.
          I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
      <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
        <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
}
