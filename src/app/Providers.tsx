"use client";

import { PropsWithChildren } from "react";

import { NextAuthProvider } from "@/lib/next-auth";
import { StoreProvider } from "@/lib/rematch";
import { ApolloWrapper } from "@/lib/apollo";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <NextAuthProvider>
        <StoreProvider>{children}</StoreProvider>
      </NextAuthProvider>
    </ApolloWrapper>
  );
}
