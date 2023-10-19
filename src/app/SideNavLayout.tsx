"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./SideNavLayout.scss";
import { COOPERATIVE_PANEL_PATH } from "@/features/cooperative/cooperative.constants";
import { AUTH_USER_PANEL_PATH } from "@/features/user/user.constants";
import AppMainNavbar from "@/layouts/AppMainNavbar";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSideNavContext } from "@/contexts/sidenav";
import CooperativePanelSideNav from "@/features/cooperative/components/CooperativePanelSideNav";

// Class names for the animations
const fadeInClassName = "fade-in";
const slideInClassName = "slide-in";

export default function SideNavLayout() {
  const pathname = usePathname();

  const { show, toggle } = useSideNavContext();

  // aria-hidden value of the side nav
  const [ariaHidden, setAriaHidden] = useState(true);

  const isPanelRoute =
    pathname.startsWith(AUTH_USER_PANEL_PATH) || pathname.startsWith(COOPERATIVE_PANEL_PATH);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Manages the focus when the side nav gets open/closed
  useEffect(() => {
    if (show) {
      closeBtnRef.current?.focus();
    } else {
      document.getElementById("top-bar-sidenav-toggle")?.focus();
    }
  }, [show]);

  // Setup of the side nav close when the Escape key is pressed
  useEffect(() => {
    const handleEscPressed = (e: KeyboardEvent) => {
      if (show && e.key === "Escape") {
        toggle(false);
      }
    };
    window.addEventListener("keydown", handleEscPressed);
    return () => {
      window.removeEventListener("keydown", handleEscPressed);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup of the update of the aria-hidden attribute on resize and when the side nav is toggled
  useEffect(() => {
    const updateAriaHiddenOnChange = () => {
      if (window.innerWidth >= 1151) {
        setAriaHidden(isPanelRoute);
      } else {
        setAriaHidden(!show);
      }
    };
    updateAriaHiddenOnChange();
    window.addEventListener("resize", updateAriaHiddenOnChange);
    return () => {
      window.removeEventListener("resize", updateAriaHiddenOnChange);
    };
  }, [isPanelRoute, show]);

  function handleClose() {
    toggle(false);
  }

  return (
    <div
      id="app-sidenav-layout"
      aria-labelledby="app-sidenav-title"
      aria-hidden={ariaHidden}
      className={cn("fixed top-0 left-0 z-30 h-full", {
        open: show,
        "fixed-desktop": isPanelRoute,
      })}
    >
      {/* The backdrop */}
      <div
        className={cn(
          "app-sidenav-backdrop absolute inset-0 w-full h-full bg-background/80 backdrop-blur-sm",
          { [fadeInClassName]: show },
        )}
        onClick={handleClose}
      ></div>
      {/* The box that shapes the bar */}
      <div
        className={cn("app-sidenav-box relative z-[42] py-2 h-full bg-background shadow-lg", {
          [slideInClassName]: show,
        })}
      >
        <div className="flex justify-end px-2">
          {/* Close button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                ref={closeBtnRef}
                id="app-sidenav-close"
                aria-label="Fermer"
                className="px-2 text-foreground/60 hover:text-foreground/80 focus:text-foreground/80 font-semibold duration-300 text-lg"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="border-none shadow-none p-0 pl-2">
              <div className="bg-tooltip text-tooltip-foreground px-2 py-1 rounded-sm mt-1">
                <p className="text-xs">Fermer</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        {/* Content */}
        <div id="app-sidenav-content" className="pb-7">
          {pathname && !isPanelRoute ? <AppMainNavbar /> : <CooperativePanelSideNav />}
        </div>
      </div>
    </div>
  );
}
