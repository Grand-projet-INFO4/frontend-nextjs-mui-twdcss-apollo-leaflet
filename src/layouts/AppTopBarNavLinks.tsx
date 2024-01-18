import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";

import AppTopBarNavLink from "./AppTopBarNavLink";
import { cn } from "@/lib/utils";

const links: Record<"href" | "label", string>[] = [
  { href: "/", label: "Accueil" },
  { href: "/trips", label: "Voyages" },
  { href: "/cooperatives", label: "Coopératives" },
  { href: "/bus-stations", label: "Gares routières" },
];

const miscLinks: Record<"href" | "label", string>[] = [
  { href: "/contact", label: "Nous contacter" },
  { href: "/about", label: "A-propos" },
  { href: "/add-cooperative", label: "Ajouter votre coopérative" },
];

export default function AppTopBarNavLinks() {
  const { resolvedTheme } = useTheme();

  return (
    <NavigationMenu
      aria-label="Navigation secondaire"
      viewportStart="right"
      className="top-bar-show-flex-lg ml-0"
    >
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <AppTopBarNavLink href={link.href} label={link.label} />
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn("text-foreground/60 hover:text-foreground/80 px-2 py-1", {
              "data-[state=open]:bg-accent": resolvedTheme === "light",
              "data-[state=open]:bg-accent/30": resolvedTheme === "dark",
            })}
          >
            Divers
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="list-none flex flex-col w-52 py-2 px-1 bg-background text-left">
              {miscLinks.map((link) => (
                <li key={link.href}>
                  <AppTopBarNavLink
                    href={link.href}
                    label={link.label}
                    className="w-full justify-start"
                  />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
