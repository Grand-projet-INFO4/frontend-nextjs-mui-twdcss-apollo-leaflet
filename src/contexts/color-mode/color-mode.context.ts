"use client";

import { createContext } from "react";

export type ColorModeContextValue = {
  mode: "light" | "dark";

  // Toggles the between the color modes
  toggleMode(): void;
};

const colorModeContext = createContext<ColorModeContextValue>({
  mode: "light",
  toggleMode() {},
});

export default colorModeContext;
