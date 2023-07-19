"use client";

import React, { useRef, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import MuiLink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import SvgIcon from "@mui/material/SvgIcon";

const authLinks: { href: Url; label: string; IconComponent: typeof SvgIcon }[] = [
  { label: "Se connecter", href: "/auth/signin", IconComponent: LockOutlinedIcon },
  { label: "S'inscrire", href: "/auth/signup", IconComponent: PersonAddOutlinedIcon },
];

export default function AppBarAuthLinks() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event: Event | React.SyntheticEvent) {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Tooltip title="Authentification" placement="top" arrow>
        <IconButton
          ref={anchorRef}
          id="authentication-links-toggle"
          aria-label="Liens pour authentication"
          aria-controls={open ? "authentication-links" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        id="authentication-links"
        aria-labelledby="authentication-links-toggle"
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: "right bottom" }}>
            <Paper
              className="p-2"
              sx={{ borderColor: "divider", borderWidth: 1, borderStyle: "solid" }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} sx={{ borderColor: "divider" }}>
                  {authLinks.map(({ href, label, IconComponent }) => (
                    <MenuItem key={href.toString()} sx={{ padding: 0 }} onClick={handleClose}>
                      <MuiLink
                        component={Link}
                        href={href as string}
                        underline="none"
                        color="text.secondary"
                        className="flex items-center py-3 px-4"
                        sx={{ fontWeight: "medium" }}
                      >
                        <IconComponent className="mr-2" />
                        {label}
                      </MuiLink>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
