"use client";

import React from "react";
import {
  BarChart4,
  ParkingSquare,
  CalendarDays,
  CalendarCheck,
  Users,
  Info,
  Settings,
  Bus,
  BusFront,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute, faTruckMoving, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { COOPERATIVE_PANEL_PATH } from "../cooperative.constants";
import { cn } from "@/lib/utils";
import NavLink from "@/components/NavLink";
import { Separator } from "@radix-ui/react-separator";

type LinkWithIcon = {
  pathname: string;
  label: string;
  icon: React.ReactElement;
};
const links: LinkWithIcon[] = [
  {
    pathname: "/dashboard",
    label: "Tableau de bord",
    icon: <BarChart4 />,
  },
  {
    pathname: "/parking-lots",
    label: "Stationnements",
    icon: <ParkingSquare />,
  },
  {
    pathname: "/routes",
    label: "Itinéraires",
    icon: <FontAwesomeIcon icon={faRoute} />,
  },
  {
    pathname: "/vehicles",
    label: "Véhicules",
    icon: <BusFront />,
  },
  {
    pathname: "/planned-trips",
    label: "Planning",
    icon: <CalendarDays />,
  },
  {
    pathname: "/bookings",
    label: "Réservations",
    icon: <CalendarCheck />,
  },
  {
    pathname: "/trips",
    label: "Voyages",
    icon: <Bus />,
  },
  {
    pathname: "/map",
    label: "Carte",
    icon: <FontAwesomeIcon icon={faMapMarkedAlt} />,
  },
  {
    pathname: "/staffs",
    label: "Staffs",
    icon: <Users />,
  },
  {
    pathname: "/presentation",
    label: "Présentation",
    icon: <Info />,
  },
  {
    pathname: "/settings",
    label: "Paramètres",
    icon: <Settings />,
  },
];

export default function CooperativePanelSideNav() {
  return (
    <nav>
      <Separator orientation="horizontal" />
      <h2 id="app-sidenav-title" className="font-medium text-foreground text-lg mb-3">
        Espace coopérative
      </h2>
      <Separator orientation="horizontal" />
      <ul className="list-none m-0 p-0">
        {links.map((link) => (
          <li key={link.pathname}>
            <NavLink
              href={COOPERATIVE_PANEL_PATH + link.pathname}
              className="flex items-center py-3 px-4 hover:bg-accent/80 text-foreground/60 font-medium hover:text-foreground duration-300 rounded-md"
              activeClassName="bg-primary/100 hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground"
            >
              <span className="text-xl w-6 h-6 mr-3 block text-center">{link.icon}</span>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
