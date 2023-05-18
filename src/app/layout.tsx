import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// App custom global styles
import "./globals.css";

// Blocks the insertion of style tag in the HTML
config.autoAddCss = false;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "Zaha dia",
};
