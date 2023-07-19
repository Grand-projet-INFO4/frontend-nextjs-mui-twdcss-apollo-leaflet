import { useContext } from "react";
import colorModeContext from "./color-mode.context";

export default function useColorModeContext() {
  return useContext(colorModeContext);
}
