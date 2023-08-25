import React, { PropsWithChildren } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

import useIsActiveHref from "@/hooks/useIsActiveHref";
import { useColorModeContext } from "@/contexts/color-mode";

export type AppBarNavLinkProps = PropsWithChildren<{
  href: Url;
}>;

export default function AppBarNavLink({ href, children }: AppBarNavLinkProps) {
  const { mode } = useColorModeContext();

  const isActive = useIsActiveHref({
    href,
  });

  let contentActiveColor = mode === "dark" ? "primary.light" : "primary.main";

  return (
    <Link href={href} className="h-full flex items-center relative no-underline">
      <MenuItem
        component="span"
        sx={{
          color: isActive ? contentActiveColor : "text.secondary",
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
          backgroundColor: contentActiveColor,
          opacity: isActive ? "1" : "0",
        }}
      />
    </Link>
  );
}
