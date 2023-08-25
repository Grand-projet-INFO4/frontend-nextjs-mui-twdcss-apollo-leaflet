"use client";

import React, { Suspense } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useSession } from "next-auth/react";

import AppBarNavLink from "./AppBarNavLink";
import AppBarAuthLinks from "./AppBarAuthLinks";
import AppBarColorModeToggle from "./AppBarColorModeToggle";
import VerticalDivider from "@/components/VerticalDivider";
import AppBarAuthUserAvatarLoader from "./AppBarAuthUserAvatarLoader";

const AppBarAuthUserMenu = React.lazy(() => import("./AppBarAuthUserMenu"));

const secondaryNavLinks: { label: string; href: Url }[] = [
  { label: "Accueil", href: "/" },
  { label: "Voyages", href: "/trips" },
  { label: "Coopératives", href: "/cooperatives" },
  { label: "Gares routières", href: "/bus-stations" },
];

export default function AppBar() {
  const { status: sessionStatus } = useSession();

  return (
    <Box
      component="header"
      sx={{
        height: "65px",
        borderWidth: 0,
        borderBottomWidth: "1px",
        borderStyle: "solid",
        borderColor: "divider",
      }}
      className="bg-inherit"
    >
      <div className="flex items-center justify-between px-4 h-full">
        {/* Logo / Brand */}
        <MuiLink
          component={Link}
          underline="none"
          href="/"
          className="flex items-center"
          aria-label="Retour à la page d'accueil"
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            fontSize: 26,
          }}
        >
          <img src="/logo.svg" alt="Zaha Dia logo" className="block" style={{ height: "42px" }} />
          <span className="flex items-center ml-4">Zaha Dia</span>
        </MuiLink>
        {/* Secondary navigation */}
        <Box
          component="nav"
          id="secondary-navigation"
          aria-label="Navigation secondaire"
          className="h-full flex items-center"
        >
          <ul className="flex flex-row list-none m-0 p-0 h-full">
            {/* Main links */}
            {secondaryNavLinks.map((link) => (
              <li key={link.href.toString()}>
                <AppBarNavLink href={link.href}>{link.label}</AppBarNavLink>
              </li>
            ))}
            {/* CTA link to a trip booking */}
            <li className="flex items-center ml-2">
              <Button
                component={Link}
                href="/book-trip"
                variant="contained"
                color="primary"
                title="Réserver un voyage"
              >
                Réserver
              </Button>
            </li>
          </ul>
        </Box>
        <div className="flex items-center gap-x-1">
          {/* Light/Dark mode switch */}
          <AppBarColorModeToggle />
          <VerticalDivider height={25} />
          {/* Add a new cooperative */}
          <Tooltip title="Ajouter votre coopérative" placement="bottom" arrow>
            <IconButton
              component={Link}
              href="/add-cooperative"
              aria-label="Ajouter votre coopérative"
            >
              <AddBusinessIcon />
            </IconButton>
          </Tooltip>
          {/* Authentication links | Authenticated user menu */}
          {sessionStatus !== "authenticated" ? (
            <AppBarAuthLinks />
          ) : (
            <Suspense fallback={<AppBarAuthUserAvatarLoader />}>
              <AppBarAuthUserMenu />
            </Suspense>
          )}
        </div>
      </div>
    </Box>
  );
}
