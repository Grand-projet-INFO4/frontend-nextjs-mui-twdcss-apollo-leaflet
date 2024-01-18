"use client";

import React, { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import {
  HomePageRedirectionReason,
  SIGNIN_PAGE_PATH,
  SIGNUP_PAGE_PATH,
  SigninRedirectionReason,
} from "../auth.constants";
import { REDIRECTION_REASON_QUERY_PARAM } from "@/constants/redirection.constants";
import useComponentDidMount from "@/hooks/useComponentDidMount";

export interface ProtectedGuardGrants {
  // The required authentication state in order to to access rendered children
  authState: "authenticated" | "unauthenticated";
}

export type ProtectedGuardProps = PropsWithChildren<{
  grants?: ProtectedGuardGrants;
}>;

const defaultGrants: ProtectedGuardGrants = {
  authState: "authenticated",
};

export default function ProtectedGuard({ children, grants = defaultGrants }: ProtectedGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { status } = useSession();

  useComponentDidMount(() => {
    // If user is unauthenticated but the rendered children require authentication,
    // redirect to the sign in page along with the redirection reason
    if (status === "unauthenticated") {
      const toSignin = `${SIGNIN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${SigninRedirectionReason.Unauthenticated}`;
      router.push(toSignin);
    }
    // If the user is authenticated but the rendered children require an unauthenticated user,
    // redirect to the home page along with the redirection reason
    else {
      let redirectionReason: string;
      if (pathname?.startsWith(SIGNIN_PAGE_PATH)) {
        redirectionReason = HomePageRedirectionReason.SignInNotAllowed;
      } else if (pathname?.startsWith(SIGNUP_PAGE_PATH)) {
        redirectionReason = HomePageRedirectionReason.SignUpNotAllowed;
      }
      redirectionReason ||= HomePageRedirectionReason.Default;
      const toHomePage = `/?${REDIRECTION_REASON_QUERY_PARAM}=${redirectionReason}`;
      router.push(toHomePage);
    }
  });

  if (status === "loading" || status === grants.authState) {
    return children;
  }
}
