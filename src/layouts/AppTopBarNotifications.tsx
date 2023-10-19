"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function AppTopBarNotifications() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-foreground/80 ml-2 relative"
          aria-label="Voir les notifications"
        >
          <span
            className="absolute top-0 left-full -translate-x-1/2 text-white px-1 bg-destructive rounded-sm"
            style={{ fontSize: "0.625rem" }}
          >
            4
          </span>
          <Bell className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="py-0 px-0 border-none">
        <div className="bg-tooltip text-tooltip-foreground px-2 py-1 rounded-sm mt-1">
          <p className="text-xs">Notifications</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
