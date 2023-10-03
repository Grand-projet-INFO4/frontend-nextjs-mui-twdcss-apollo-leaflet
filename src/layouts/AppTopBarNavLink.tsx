import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import useIsActiveHref from "@/hooks/useIsActiveHref";
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export type AppTopBarNavLinkProps = PropsWithChildren<{
  href: string;
  label?: string;
  className?: string;
}>;

export default function AppTopBarNavLink({
  href,
  label,
  children,
  className,
}: AppTopBarNavLinkProps) {
  const isActive = useIsActiveHref({
    href: href,
  });

  const { resolvedTheme } = useTheme();

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
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
      >
        {children ?? label}
      </NavigationMenuLink>
    </Link>
  );
}
