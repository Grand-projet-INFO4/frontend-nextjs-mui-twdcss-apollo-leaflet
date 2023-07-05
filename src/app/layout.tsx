import { Metadata } from "next";

import "./globals.css";
import Providers from "./Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="main-body">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Taskify",
};
