"use client";

import Skeleton from "@mui/material/Skeleton";

export default function AppBarAuthUserAvatarLoader() {
  return (
    <Skeleton
      variant="circular"
      width={40}
      height={40}
      title="Chargement de l'utilisateur courant"
    />
  );
}
