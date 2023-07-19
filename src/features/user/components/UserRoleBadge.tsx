"use client";

import React from "react";
import Typography from "@mui/material/Typography";

import { UserRole, userRoleTranslationMap } from "../user.constants";

export type UserRoleBadgeProps = {
  component?: React.ElementType;
  fontSize?: string;
  role: UserRole;
};

export default function UserRoleBadge({
  component = "span",
  fontSize = "0.75rem",
  role,
}: UserRoleBadgeProps) {
  let color: string;
  switch (role) {
    case UserRole.Manager:
      color = "primary.main";
      break;
    case UserRole.Regulator:
      color = "#2f9e14";
      break;
    case UserRole.Driver:
      color = "#d18504"; //#d18504
      break;
    case UserRole.Admin:
      color = "secondary.main";
      break;
    case UserRole.SuperAdmin:
      color = "#D1382E";
      break;
    default:
      color = "transparent";
      break;
  }

  return (
    <Typography
      component={component}
      fontWeight="400"
      className="py-0.5 px-2"
      sx={{ backgroundColor: color, color: "#fff", fontSize, borderRadius: fontSize }}
    >
      {userRoleTranslationMap.get(role)}
    </Typography>
  );
}
