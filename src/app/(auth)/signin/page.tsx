import { redirect } from "next/navigation";
import React from "react";

import {
  HomePageRedirectionReason,
  SIGNIN_PAGE_PATH,
  SigninRedirectionReason,
} from "@/features/auth/auth.constants";
import { getServerSession } from "@/lib/next-auth";
import { SignOutOnMount } from "@/features/auth/components";
import {
  REDIRECTION_PREVIOUS_URL_QUERY_PARAM,
  REDIRECTION_REASON_QUERY_PARAM,
} from "@/constants/redirection.constants";
import { PageProps } from "@/lib/next/next";

export interface SigninPageSearchParams {
  redirect?: SigninRedirectionReason;
}

export default async function SigninPage({ searchParams }: PageProps<{}, SigninPageSearchParams>) {
  // If there's a redirect search param that orders a sign out, and the current user is authenticated,
  // then the authenticated user should sign out
  if (
    searchParams?.redirect &&
    [SigninRedirectionReason.Unauthenticated, SigninRedirectionReason.Unauthorized].includes(
      searchParams.redirect,
    )
  ) {
    const session = await getServerSession();
    if (session) {
      return <SignOutOnMount />;
    }
  }

  // The current user must not be able to sign in when authenticated
  const session = await getServerSession();
  if (session) {
    const toHome = `/?${REDIRECTION_REASON_QUERY_PARAM}=${HomePageRedirectionReason.SignInNotAllowed}&${REDIRECTION_PREVIOUS_URL_QUERY_PARAM}=${SIGNIN_PAGE_PATH}`;
    redirect(toHome);
    return;
  }

  return <div>Sign in</div>;
}
