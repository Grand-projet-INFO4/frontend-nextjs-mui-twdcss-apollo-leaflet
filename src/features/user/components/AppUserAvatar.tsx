"use client";

import React, { PropsWithChildren } from "react";
import Avatar from "@mui/material/Avatar";

import { User } from "../user";
import { concatFirstLetters } from "@/utils/string.utils";

export interface AppUserAvatarProps {
  width?: number;
  height?: number;
  user: User;
}

export default function AppUserAvatar({ width = 30, height = 30, user }: AppUserAvatarProps) {
  const fullName = user.firstName + " " + user.lastName;

  return (
    <Avatar
      src={user.photo ?? undefined}
      alt={fullName}
      sx={{ width, height, backgroundColor: "secondary.main" }}
    >
      {!user.photo && concatFirstLetters(user.firstName, user.lastName)}
    </Avatar>
  );
}
