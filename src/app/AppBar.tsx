"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { useSession } from "next-auth/react";

const secondaryNavLinks: { label: string; href: Url }[] = [
  { label: "Accueil", href: "/" },
  { label: "Voyages", href: "/trips" },
  { label: "Coopératives", href: "/cooperatives" },
  { label: "Gares routières", href: "/bus-stations" },
];

export default function AppBar() {
  const { status: sessionStatus } = useSession();

  return (
    <nav>Hey!</nav>
  );
}
