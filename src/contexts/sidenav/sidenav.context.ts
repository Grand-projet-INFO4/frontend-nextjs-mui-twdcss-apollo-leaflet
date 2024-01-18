"use client"

import React from "react"

export type SideNavContextValue = {
  // Open state of the side navigation bar
  show: boolean;

  /**
   * Toggles the open state of the side navigation bar
   * 
   * @param show Sets the open state to the this value provided
   */
  toggle(show?: boolean): void;
}

// The context that controls the open state of the side navigation bar
const sideNavContext = React.createContext<SideNavContextValue>({
  show: false,
  toggle() {}
})

export default sideNavContext