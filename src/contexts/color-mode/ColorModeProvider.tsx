"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { PaletteMode } from "@mui/material";

import colorModeContext, { ColorModeContextValue } from "./color-mode.context";

export type ColorModeProviderProps = PropsWithChildren;

export default function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const value = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleMode: () => setMode(mode === "light" ? "dark" : "light"),
    }),
    [mode],
  );

  // Setup of the color mode based on the user's system preference on mount
  useEffect(() => {
    const prefersDarkMode =
      typeof window.matchMedia !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setMode(prefersDarkMode ? "dark" : "light");

    // Updates the color mode when the system preference changes
    function handleSystemPreferenceColorChange(e: MediaQueryListEvent) {
      setMode(e.matches ? "dark" : "light");
    }
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", handleSystemPreferenceColorChange);

    return () => {
      matchMedia.removeEventListener("change", handleSystemPreferenceColorChange);
    };
  }, []);

  return <colorModeContext.Provider value={value}>{children}</colorModeContext.Provider>;
}
