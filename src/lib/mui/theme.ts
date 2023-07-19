import { createTheme as muiCreateTheme, PaletteMode } from "@mui/material";

export function createTheme(mode: PaletteMode) {
  return muiCreateTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#1976D2",
      },
      secondary: {
        main: "#D12EAE",
      },
    },
  });
}
