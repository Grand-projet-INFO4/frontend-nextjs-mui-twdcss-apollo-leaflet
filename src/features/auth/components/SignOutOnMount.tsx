"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// Signs out the authenticated user on mount
export default function SignOutOnMount() {
  const router = useRouter();

  const { data: session } = useSession();

  // If the current user is authenticated, then sign out the user
  // Otherwise redirect to the home page
  useEffect(() => {
    if (session) {
      signOut();
    } else {
      router.replace("/");
    }
  }, []);

  return null;
}
