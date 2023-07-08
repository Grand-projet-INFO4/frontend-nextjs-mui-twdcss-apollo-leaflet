import { PropsWithChildren } from "react";

import { StoreProvider } from "@/lib/rematch";
import ApolloWrapper from "@/lib/apollo/client/ApolloWrapper";
import NextAuthProvider from "@/lib/next-auth/NextAuthProvider";
import MUISetup from "@/lib/mui/MUISetup";

export default async function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <StoreProvider>
        <NextAuthProvider>
          <MUISetup>{children}</MUISetup>
        </NextAuthProvider>
      </StoreProvider>
    </ApolloWrapper>
  );
}
