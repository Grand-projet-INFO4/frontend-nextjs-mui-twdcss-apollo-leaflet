import { Metadata } from "next";

import "./globals.css";
import Providers from "./Providers";
import AppBar from "./AppBar";
import InitialAuthStateSetup from "@/features/auth/components/InitialAuthStateSetup";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <InitialAuthStateSetup />
          <div className="main-body">
            <AppBar />
            {children}
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
