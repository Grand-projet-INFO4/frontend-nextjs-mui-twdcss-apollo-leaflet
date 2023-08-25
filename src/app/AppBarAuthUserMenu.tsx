"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useAuthModel } from "@/features/auth/model";
import AppBarAuthUserAvatarLoader from "./AppBarAuthUserAvatarLoader";
import { useColorModeContext } from "@/contexts/color-mode";
import AppUserAvatar from "@/features/user/components/AppUserAvatar";
import UserRoleBadge from "@/features/user/components/UserRoleBadge";
import { UserRole, adminRolesSet, cooperativeRolesSet } from "@/features/user/user.constants";

export default function AppBarAuthUserMenu() {
  /* const { authUser } = useAuthModel();

  // Showing a skeleton loader if the authenticated user is not available yet
  if (!authUser) {
    return <AppBarAuthUserAvatarLoader />;
  }

  const { mode } = useColorModeContext();

  const [isOpen, setOpen] = useState(false);

  const anchorRef = useRef<HTMLButtonElement>(null);

  // const cooperativeRole = useMemo<UserRole | null>(() => {
  //   return authUser.roles.find((role) => cooperativeRolesSet.has(role)) ?? null;
  // }, authUser.roles);

  // const adminRole = useMemo<UserRole | null>(() => {
  //   return authUser.roles.find((role) => adminRolesSet.has(role)) ?? null;
  // }, authUser.roles);

  const fullName = authUser.firstName + " " + authUser.lastName;

  function handleClose(): void {
    setOpen(false);
  }

  return (
    <>
      <Tooltip title="Menu d'utilisateur" placement="bottom" arrow>
        <Box
          ref={anchorRef}
          component="button"
          id="auth-user-menu-toggle"
          aria-label="Menu d'utilisateur"
          aria-controls={isOpen ? "auth-user-menu" : undefined}
          aria-haspopup="true"
          className={isOpen ? "open" : undefined}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            borderWidth: "0",
            backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "0.3s",
            cursor: "pointer",
            "&:hover, &.open": {
              backgroundColor:
                mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
            },
          }}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <AppUserAvatar user={authUser} />
        </Box>
      </Tooltip>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        id="auth-user-menu"
        aria-labelledby="auth-user-menu-toggle"
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{ borderWidth: "1px", borderColor: "divider", width: 225 }}>
            <section aria-label="Compte d'utilisateur" className="pb-2">
              <div className="flex p-2">
                <AppUserAvatar width={45} height={45} user={authUser} />
                <div className="flex flex-col ml-2">
                  <Typography component="strong" sx={{ fontSize: "0.875rem", fontWeight: "500" }}>
                    {fullName}
                  </Typography>
                  <Typography
                    component="em"
                    className="not-italic"
                    sx={{ color: "text.secondary", fontSize: "0.875rem", fontWeight: "300" }}
                  >
                    @{authUser.username}
                  </Typography>
                </div>
              </div>
              <MenuItem component={Link} href="/account" onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <Typography component="span" fontSize="0.875rem" fontWeight={400}>
                  Mon compte utilisateur
                </Typography>
              </MenuItem>
            </section>
            {/* {true && (
              <>
                <Divider />
                <section aria-label="Attributs en coopératives">
                  <UserRoleBadge component="strong" role={UserRole.Driver} /> chez XXXX
                </section>
              </>
            )} 
            <Divider />
            <section aria-label="Déconnexion" className="py-2">
              <div className="px-2">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<LogoutIcon />}
                  disableElevation
                  sx={{ width: "100%", textAlign: "center" }}
                >
                  Se déconnecter
                </Button>
              </div>
            </section>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  ); */
  return <div>Hello</div>;
}
