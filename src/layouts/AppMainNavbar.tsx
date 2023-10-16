"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faHouse, faShop, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faBuilding,
  faEnvelope,
  faSquarePlus,
  faUser,
  faCircleQuestion,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";

import AppBarNavLink from "@/components/AppBarNavLink";
import { Separator } from "@/components/ui/separator";
import { SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "../features/auth/auth.constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSideNavContext } from "@/contexts/sidenav";

type LinkData = {
  href: string;
  label: string;
  icon: IconDefinition;
};

const mainLinks: LinkData[] = [
  { href: "/", label: "Accueil", icon: faHouse },
  { href: "/trips", label: "Voyages", icon: faCalendarDays },
  { href: "/cooperatives", label: "Coopératives", icon: faBuilding },
  { href: "/bus-stations", label: "Gares routières", icon: faShop },
];

const secondaryLinks: LinkData[] = [
  { href: "/contact", label: "Nous contacter", icon: faEnvelope },
  { href: "/about", label: "A-propos", icon: faCircleQuestion },
  { href: "/add-cooperative", label: "Ajouter votre coopérative", icon: faSquarePlus },
];

const authLinks: LinkData[] = [
  { href: SIGNUP_PAGE_PATH, label: "Créer un compte", icon: faUser },
  { href: SIGNIN_PAGE_PATH, label: "Se connecter", icon: faLock },
];

export default function AppMainNavbar() {
  const { toggle } = useSideNavContext();

  function handleLinkClick() {
    toggle(false);
  }

  return (
    <nav>
      <h2 className="font-semibold text-lg mb-4">Menu de navigation</h2>
      <ul className="m-0 p-0 list-none">
        {mainLinks.map((link) => (
          <li key={link.href}>
            <AppBarNavLink href={link.href} onClick={handleLinkClick}>
              <div className="flex items-center">
                <span className="block w-9 text-center text-lg">
                  <FontAwesomeIcon icon={link.icon} className="mr-3" />
                </span>
                {link.label}
              </div>
            </AppBarNavLink>
          </li>
        ))}
      </ul>
      <Separator orientation="horizontal" className="my-3" />
      <div>
        <Button asChild>
          <Link href="/book-trip" className="flex items-center w-full" onClick={handleLinkClick}>
            <span className="block w-9 text-center text-lg">
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-3" />
            </span>
            Réserver un voyage
          </Link>
        </Button>
      </div>
      <Separator orientation="horizontal" className="my-3" />
      <ul className="m-0 p-0 list-none">
        {authLinks.map((link) => (
          <li key={link.href}>
            <AppBarNavLink href={link.href} onClick={handleLinkClick}>
              <div className="flex items-center">
                <span className="block w-9 text-center text-lg">
                  <FontAwesomeIcon icon={link.icon} className="mr-3" />
                </span>
                {link.label}
              </div>
            </AppBarNavLink>
          </li>
        ))}
      </ul>
      <Separator orientation="horizontal" className="my-3" />
      <ul className="m-0 p-0 list-none">
        {secondaryLinks.map((link) => (
          <li key={link.href}>
            <AppBarNavLink href={link.href} onClick={handleLinkClick}>
              <div className="flex items-center">
                <span className="block w-9 text-center text-lg">
                  <FontAwesomeIcon icon={link.icon} className="mr-3" />
                </span>
                {link.label}
              </div>
            </AppBarNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
