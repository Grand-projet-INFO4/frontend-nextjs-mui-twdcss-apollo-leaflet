"use client";

import { PaletteMode } from "@mui/material";
import { createContext } from "react";

export type ColorModeContextValue = {
  mode: PaletteMode;

  // Toggles the between the color modes
  toggleMode(): void;
};

const colorModeContext = createContext<ColorModeContextValue>({
  mode: "light",
  toggleMode() {},
});

export default colorModeContext;
