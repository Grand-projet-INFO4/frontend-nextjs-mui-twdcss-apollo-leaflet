import React from "react";
import IconButton from "@mui/material/IconButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { PaletteMode } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { useColorModeContext } from "@/contexts/color-mode";

const modeTranslation: Record<PaletteMode, string> = {
  light: "clair",
  dark: "sombre",
};

export default function AppBarColorModeToggle() {
  const { mode, toggleMode } = useColorModeContext();

  const title = "Mode " + modeTranslation[mode] + " activé";
  const label = "Basculer vers le mode " + modeTranslation[mode];

  return (
    <Tooltip title={title} placement="bottom" arrow>
      <IconButton onClick={toggleMode} aria-label={label}>
        {mode === "light" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}
