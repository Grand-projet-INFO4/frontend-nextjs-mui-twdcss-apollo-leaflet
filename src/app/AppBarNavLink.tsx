import React, { PropsWithChildren } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import useIsActiveHref from "@/hooks/useIsActiveHref";

export type AppBarNavLinkProps = PropsWithChildren<{
  href: Url;
}>;

export default function AppBarNavLink({ href, children }: AppBarNavLinkProps) {
  const isActive = useIsActiveHref({
    href,
  });

  return (
    <Link href={href} className="h-full flex items-center relative no-underline">
      <MenuItem
        component="span"
        sx={{
          color: isActive ? "text.primary" : "text.secondary",
          fontWeight: 500,
          fontSize: "0.9375rem", // 15px
          height: "100%",
        }}
      >
        {children}
      </MenuItem>
      <Box
        component="span"
        className="absolute bottom-0 left-0 w-full duration-300"
        sx={{
          height: 4,
          backgroundColor: "text.primary",
          opacity: isActive ? "1" : "0",
        }}
      />
    </Link>
  );
}
