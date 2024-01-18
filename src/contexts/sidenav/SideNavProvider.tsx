"use client";

import React, { PropsWithChildren, useMemo, useState } from "react";

import sideNavContext, { type SideNavContextValue } from "./sidenav.context";

export default function SideNavProvider({ children }: PropsWithChildren) {
  const [show, setShow] = useState(false);

  function toggle(_show?: boolean) {
    setShow(_show === undefined ? !show : _show);
  }

  const value = useMemo<SideNavContextValue>(
    () => ({
      show,
      toggle,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show],
  );

  return <sideNavContext.Provider value={value}>{children}</sideNavContext.Provider>;
}
