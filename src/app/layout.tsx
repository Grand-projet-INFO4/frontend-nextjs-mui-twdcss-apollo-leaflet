import { Metadata } from "next";

import "./globals.css";
import Providers from "./Providers";
import { InitialAuthStateSetup } from "@/features/auth/components";
import { getServerSession } from "@/lib/next-auth";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning={true}>
        <Providers>
          <InitialAuthStateSetup initialSession={session} />
          <div className="main-body">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taskify",
};
