"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUserCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import AppTopBarNavLinks from "./AppTopBarNavLinks";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/features/auth/auth.constants";
import AppTopBarThemeSwitch from "./AppTopBarThemeSwitch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import "./AppTopBar.css";
import AppTopBarSideNavToggle from "./AppTopBarSideNavToggle";

// Authentication links: Sign in + Sign up
const authLinks: { href: string; label: string; icon: IconDefinition }[] = [
  { href: SIGNUP_PAGE_PATH, label: "Créer un compte", icon: faUserCircle },
  { href: SIGNIN_PAGE_PATH, label: "Se connecter", icon: faLock },
];

export default function AppTopBar() {
  return (
    <header className="border-b bg-background">
      <div className="px-3 h-[60px] flex items-center justify-between">
        <div className="flex items-center">
          {/* Navigation sidebar toggle */}
          <AppTopBarSideNavToggle />
          {/* Logo */}
          <Link
            href="/"
            id="app-bar-logo"
            className="flex items-center"
            aria-label="Back to landing page"
          >
            <Image src="/logo.svg" alt="Zaha Dia logo" width={42} height={42} />
            <span className="font-bold text-2xl ml-2">Zaha Dia</span>
          </Link>
          <Separator orientation="vertical" className="top-bar-show-lg h-[25px] ml-5 mr-6" />
          {/* Secondary navigation links */}
          <AppTopBarNavLinks />
        </div>
        <div className="flex items-center">
          {/* Link for booking a trip */}
          <Button asChild className="top-bar-show-md">
            <Link href="/book-trip">Réserver un voyage</Link>
          </Button>
          <Separator orientation="vertical" className="top-bar-show-md h-[25px] mx-3" />
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
                        <Link
                          href={link.href}
                          className="flex items-center rounded-sm text-sm font-medium text-foreground/60 hover:text-foreground/80 p-3 hover:bg-accent"
                        >
                          <FontAwesomeIcon icon={link.icon} className="mr-3 text-lg" />
                          {link.label}
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
