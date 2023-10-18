import React, { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/next-auth";
import {
  HomePageRedirectionReason,
  SIGNIN_PAGE_PATH,
  SigninRedirectionReason,
} from "../auth.constants";
import { REDIRECTION_REASON_QUERY_PARAM } from "@/constants/redirection.constants";

export type AuthenticatedPageGuardProps = PropsWithChildren<{
  // Whether the current user must be authenticated or not in order to access the route
  authenticated?: boolean;
  // The redirection reason in the query params
  redirectionReason?: string;
}>;

export default async function AuthenticatedPageGuard({
  authenticated = true,
  redirectionReason,
  children,
}: AuthenticatedPageGuardProps) {
  const session = await getServerSession();

  if (authenticated && !session) {
    const reason = redirectionReason ?? SigninRedirectionReason.Unauthenticated;
    const to = `${SIGNIN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${reason}`;
    redirect(to);
  } else if (!authenticated && session) {
    const reason = redirectionReason ?? HomePageRedirectionReason.SignInNotAllowed;
    const to = `/?${REDIRECTION_REASON_QUERY_PARAM}=${reason}`;
    redirect(to);
  }

  return <>{children}</>;
}
