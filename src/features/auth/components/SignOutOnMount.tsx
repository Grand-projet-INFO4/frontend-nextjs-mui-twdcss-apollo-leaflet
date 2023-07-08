"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

// Signs out the authenticated user on mount
export default function SignOutOnMount() {
  useEffect(() => {
    signOut();
  }, []);

  return null;
}
