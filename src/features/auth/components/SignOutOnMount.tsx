"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

// Signs out the authenticated user on mount
export default function SignOutOnMount() {
  useEffect(() => {
    signOut();
  }, []);

  return null;
}
