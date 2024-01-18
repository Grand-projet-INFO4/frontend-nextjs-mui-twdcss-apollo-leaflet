import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AppBarLogo() {
  return (
    <Link
      href="/"
      id="app-bar-logo"
      className="flex items-center"
      aria-label="Back to landing page"
    >
      <Image src="/logo.svg" alt="Zaha Dia logo" width={42} height={42} />
      <span className="font-bold text-2xl ml-2">Zaha Dia</span>
    </Link>
  );
}
