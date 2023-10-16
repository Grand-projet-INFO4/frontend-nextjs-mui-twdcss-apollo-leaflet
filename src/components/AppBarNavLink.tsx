import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { NavLinkProps } from "./NavLink";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import useIsActiveHref from "@/hooks/useIsActiveHref";

export type AppBarNavLinkProps = Omit<NavLinkProps, "activeClassName">;

export default function AppBarNavLink({ className, href, children, ...props }: AppBarNavLinkProps) {
  const isActive = useIsActiveHref({
    href: href,
  });

  const { resolvedTheme } = useTheme();

  return (
    <Link
      href={href}
      className={cn(
        navigationMenuTriggerStyle(),
        "block w-full h-auto",
        {
          "text-primary": resolvedTheme === "light" && isActive,
          "hover:text-primary": resolvedTheme === "light" && isActive,
          "text-primary-light": resolvedTheme === "dark" && isActive,
          "hover:text-primary-light": resolvedTheme === "dark" && isActive,
          "bg-primary/20": isActive,
          "hover:bg-primary/30": isActive,
          // "bg-primary/20": resolvedTheme === "light" && isActive,
          // "hover:bg-primary/10":  resolvedTheme === "light" && isActive,
          "hover:bg-accent/30": resolvedTheme === "dark" && !isActive,
          "text-foreground/60": !isActive,
          "hover:text-foreground/80": !isActive,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
