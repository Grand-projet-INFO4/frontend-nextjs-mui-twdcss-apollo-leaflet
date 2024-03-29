import { PropsWithChildren } from "react";

import { StoreProvider } from "@/lib/rematch";
import ApolloWrapper from "@/lib/apollo/client/ApolloWrapper";
import NextAuthProvider from "@/lib/next-auth/NextAuthProvider";
import { ThemeProvider } from "@/lib/next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SideNavProvider } from "@/contexts/sidenav";

export default async function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloWrapper>
      <StoreProvider>
        <NextAuthProvider>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <SideNavProvider>{children}</SideNavProvider>
            </TooltipProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </StoreProvider>
    </ApolloWrapper>
  );
}
