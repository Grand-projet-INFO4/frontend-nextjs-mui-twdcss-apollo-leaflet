"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import InitialAuthStateSetup from "@/features/auth/components/InitialAuthStateSetup";

export type NextAuthProviderProps = PropsWithChildren<{
  session: Session | null;
}>;

export default function NextAuthProvider({ session, children }: NextAuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <InitialAuthStateSetup />
      {children}
    </SessionProvider>
  );
}
