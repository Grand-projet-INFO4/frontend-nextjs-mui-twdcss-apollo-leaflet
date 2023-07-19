"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import Box from "@mui/material/Box";

import { createTheme } from "./theme";
import { useColorModeContext } from "@/contexts/color-mode";

type Props = {
  children: ReactNode;
};

export default function MUISetup({ children }: Props) {
  const { mode } = useColorModeContext();

  const theme = useMemo(() => createTheme(mode), [mode]);

  return (
    <>
      <CssBaseline />
      {/* MUI (but actually underlying Emotion) isn't ready to work with Next's experimental `app/` directory feature.
          I'm using the lowest-code approach suggested by this guy here: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1386197925 */}
      <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
        <ThemeProvider theme={theme}>
          <Box className="main-body" sx={{ backgroundColor: "background.default" }}>
            {children}
          </Box>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
}
