import React, { PropsWithChildren } from "react";
import Link from "next/link";

import useIsActiveHref from "@/hooks/useIsActiveHref";
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export type AppTopBarNavLinkProps = PropsWithChildren<{
  href: string;
  label: string;
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

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          {
            "text-primary": isActive,
            "hover:text-primary/80": isActive,
            "bg-accent": isActive,
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
