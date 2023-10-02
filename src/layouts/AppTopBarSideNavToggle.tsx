import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import "./AppTopBarSideNavToggle.css";

export default function AppTopBarSideNavToggle() {
  const label = "Ouvrir le menu de navigation";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          id="top-bar-sidenav-toggle"
          arial-label={label}
          className="top-bar-hide-lg p-2 mr-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="21"
            viewBox="0 0 310 259.344"
            version="1.1"
          >
            <g transform="translate(10.016 -803.031)">
              <g
                id="top-bar-sidenav-toggle-paths"
                fill="none"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeLinejoin="miter"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeWidth="49.336"
              >
                <path d="M19.668 1032.694h250.646"></path>
                <path d="M19.668 932.694h250.646"></path>
                <path d="M19.668 832.694h250.646"></path>
              </g>
            </g>
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent className="border-none shadow-none p-0 pl-2">
        <div className="bg-tooltip text-tooltip-foreground px-2 py-1 rounded-sm mt-1">
          <p className="text-xs">{label}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
