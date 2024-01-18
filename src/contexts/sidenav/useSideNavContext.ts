import { useContext } from "react";

import sideNavContext from "./sidenav.context";

/**
 * Wrapper hook around the sidenav context selector
 */
export default function useSideNavContext() {
  return useContext(sideNavContext)
}