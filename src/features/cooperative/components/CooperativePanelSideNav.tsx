/* eslint-disable @next/next/no-img-element */
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
import { faRoute, faIdBadge, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { COOPERATIVE_PANEL_PATH } from "../cooperative.constants";
import NavLink from "@/components/NavLink";
import { Separator } from "@/components/ui/separator";
import { useAuthModel } from "@/features/auth/model";
import { Cooperative } from "@/graphql/graphql";

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
    pathname: "/drivers",
    label: "Chauffeurs",
    icon: <FontAwesomeIcon icon={faIdBadge} />,
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
  const { authUser } = useAuthModel();

  let cooperative: Cooperative | null = null;
  if (authUser?.cooperativeRole && authUser.cooperativeRole !== "none") {
    switch (authUser.cooperativeRole) {
      case "DRIVER":
        cooperative = authUser.coopDriverAccount.cooperative;
        break;
      case "MANAGER":
        cooperative = authUser.coopManagerAccounts[0].cooperative;
        break;
      case "REGULATOR":
        cooperative = authUser.coopRegulatorAccount.cooperative;
        break;
      default:
        break;
    }
  }

  return (
    <nav>
      <h2 id="app-sidenav-title" className="font-semibold text-foreground/60 mb-3 px-3">
        Espace coopérative
      </h2>
      <div className="flex flex-col items-center mb-3 px-3">
        {cooperative && (
          <>
            <img
              src={cooperative.profilePhoto}
              alt={cooperative.coopName}
              className="[max-width:200px] max-h-52"
            />
            <h2 className="mt-3 font-semibold text-foreground text-sm">{cooperative.coopName}</h2>
          </>
        )}
      </div>
      <div className="px-3">
        <Separator className="mb-3" />
      </div>
      <ul className="list-none m-0 py-0 px-1">
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
