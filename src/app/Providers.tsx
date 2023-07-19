import { PropsWithChildren } from "react";

import { StoreProvider } from "@/lib/rematch";
import ApolloWrapper from "@/lib/apollo/client/ApolloWrapper";
import NextAuthProvider from "@/lib/next-auth/NextAuthProvider";
import MUISetup from "@/lib/mui/MUISetup";
import { ColorModeProvider } from "@/contexts/color-mode";

export default async function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <StoreProvider>
        <NextAuthProvider>
          <ColorModeProvider>
            <MUISetup>{children}</MUISetup>
          </ColorModeProvider>
        </NextAuthProvider>
      </StoreProvider>
    </ApolloWrapper>
  );
}
