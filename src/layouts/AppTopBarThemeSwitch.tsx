"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

export default function AppTopBarThemeSwitch() {
  const { setTheme, resolvedTheme: theme } = useTheme();

  const [themeIsSet, setThemeIsSet] = useState(false);

  const faIcon = !themeIsSet || theme === "light" ? faSun : faMoon;
  const title = theme === "light" ? "Mode clair activé" : "Mode sombre activé";
  const label = "Basculer vers mode " + theme === "light" ? "sombre" : "clair";

  useEffect(() => {
    setThemeIsSet(true);
  }, []);

  function handleThemeToggle() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-foreground/80"
          aria-label={label}
          onClick={handleThemeToggle}
        >
          <FontAwesomeIcon icon={faIcon} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="bg-tooltip text-tooltip-foreground px-2 py-1 rounded-sm mt-1">
          <p className="text-xs">{title}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
