import { PropsWithChildren } from "react";

import { StoreProvider } from "@/lib/rematch";
import ApolloWrapper from "@/lib/apollo/ApolloWrapper";
import { getServerSession } from "@/lib/next-auth";
import NextAuthProvider from "@/lib/next-auth/NextAuthProvider";

export default async function Providers({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <ApolloWrapper>
      <StoreProvider>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </StoreProvider>
    </ApolloWrapper>
  );
}
