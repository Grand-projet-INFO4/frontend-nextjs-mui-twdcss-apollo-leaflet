import { Metadata } from "next";

import "./globals.css";
import Providers from "./Providers";
import InitialAuthStateSetup from "@/features/auth/components/InitialAuthStateSetup";
import AppTopBar from "@/layouts/AppTopBar";
import SideNavLayout from "./SideNavLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>
          <InitialAuthStateSetup />
          <div className="main-body flex">
            <div className="sticky top-0">
              <SideNavLayout />
            </div>
            <div className="main-body-content grow shrink auto">
              <AppTopBar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Zaha Dia | Facilitez les voyages en taxi-brousse",
  icons: "/favicon.png",
};
