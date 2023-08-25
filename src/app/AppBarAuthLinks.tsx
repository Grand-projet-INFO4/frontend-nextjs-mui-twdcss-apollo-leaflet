"use client";

import React, { useRef, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Url } from "next/dist/shared/lib/router/router";
import SvgIcon from "@mui/material/SvgIcon";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

const authLinks: { href: Url; label: string; IconComponent: typeof SvgIcon }[] = [
  { label: "Se connecter", href: "/auth/signin", IconComponent: LockOutlinedIcon },
  { label: "S'inscrire", href: "/auth/signup", IconComponent: PersonAddOutlinedIcon },
];

export default function AppBarAuthLinks() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event: Event | React.SyntheticEvent) {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  }

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
            <Paper sx={{ borderColor: "divider", borderWidth: 1, borderStyle: "solid" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} sx={{ borderColor: "divider" }}>
                  {authLinks.map(({ href, label, IconComponent }) => (
                    <MenuItem
                      key={href.toString()}
                      sx={{ padding: "0.5rem 1rem" }}
                      onClick={(e) => {
                        handleClose(e);
                        router.push(href);
                      }}
                    >
                      <ListItemIcon>
                        <IconComponent fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography>{label}</Typography>
                      </ListItemText>
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
