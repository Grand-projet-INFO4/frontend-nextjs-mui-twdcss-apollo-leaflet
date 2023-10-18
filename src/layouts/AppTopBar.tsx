"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUserCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

import AppTopBarNavLinks from "./AppTopBarNavLinks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/features/auth/auth.constants";
import AppTopBarThemeSwitch from "../components/AppBarThemeSwitch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import "./AppTopBar.css";
import AppTopBarSideNavToggle from "./AppTopBarSideNavToggle";
import { cn } from "@/lib/utils";
import { COOPERATIVE_PANEL_PATH } from "@/features/cooperative/cooperative.constants";
import { AUTH_USER_PANEL_PATH } from "@/features/user/user.constants";
import AppBarLogo from "@/components/AppBarLogo";

// Authentication links: Sign in + Sign up
const authLinks: { href: string; label: string; icon: IconDefinition }[] = [
  { href: SIGNUP_PAGE_PATH, label: "Créer un compte", icon: faUserCircle },
  { href: SIGNIN_PAGE_PATH, label: "Se connecter", icon: faLock },
];

export default function AppTopBar() {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith(SIGNIN_PAGE_PATH) || pathname.startsWith(SIGNUP_PAGE_PATH);
  if (isAuthPage) return null;

  const isPanelPage =
    pathname.startsWith(AUTH_USER_PANEL_PATH) || pathname.startsWith(COOPERATIVE_PANEL_PATH);

  return (
    <header className="border-b border-b-border bg-background sticky top-0 z-20">
      <div
        className={cn("px-3 flex items-center justify-between", {
          container: !isPanelPage,
        })}
        style={{ height: "var(--topbar-height)" }}
      >
        <div className="flex items-center">
          {/* Navigation sidebar toggle */}
          <AppTopBarSideNavToggle />
          {/* Logo */}
          <AppBarLogo />
          {!isPanelPage && (
            <>
              <Separator orientation="vertical" className="top-bar-show-lg h-[25px] ml-5 mr-6" />
              {/* Secondary navigation links */}
              <AppTopBarNavLinks />
            </>
          )}
        </div>
        <div className="flex items-center">
          {!isPanelPage && (
            <>
              {/* Link for booking a trip */}
              <Button asChild className="top-bar-show-sm">
                <Link href="/book-trip">Réserver un voyage</Link>
              </Button>
              <Separator orientation="vertical" className="top-bar-show-sm h-[25px] mx-3" />
            </>
          )}
          {/* Color theme toggle */}
          <AppTopBarThemeSwitch />
          <Separator orientation="vertical" className="top-bar-show-md h-[25px] ml-3 mr-1" />
          {/* Authentication navigation links */}
          <NavigationMenu
            aria-label="Navigation d'authentification"
            viewportStart="right"
            className="top-bar-show-md"
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground/60 hover:text-foreground/80 px-2 py-1">
                  S'authentifer
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="list-none flex flex-col w-[178px] py-2 px-1 bg-background">
                    {authLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} passHref legacyBehavior>
                          <NavigationMenuLink className="flex items-center rounded-sm text-sm font-medium text-foreground/60 hover:text-foreground/80 p-3 hover:bg-accent focus:text-foreground/80 focus:bg-accent duration-300">
                            <FontAwesomeIcon icon={link.icon} className="mr-3 text-lg" />
                            {link.label}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
