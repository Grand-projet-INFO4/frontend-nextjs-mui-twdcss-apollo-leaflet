import React from "react";
import { redirect } from "next/navigation";

import { HomePageRedirectionReason, SIGNUP_PAGE_PATH } from "@/features/auth/auth.constants";
import { getServerSession } from "@/lib/next-auth";
import {
  REDIRECTION_PREVIOUS_URL_QUERY_PARAM,
  REDIRECTION_REASON_QUERY_PARAM,
} from "@/constants/redirection.constants";

export interface SignupPageSearchParams {
  redirect?: HomePageRedirectionReason;
}

export default async function SignupPage() {
  // The current user must not be able to sign up when authenticated
  const session = await getServerSession();
  if (session) {
    const toHome = `/?${REDIRECTION_REASON_QUERY_PARAM}=${HomePageRedirectionReason.SignUpNotAllowed}&${REDIRECTION_PREVIOUS_URL_QUERY_PARAM}=${SIGNUP_PAGE_PATH}`;
    redirect(toHome);
    return;
  }

  return <div>Sign up</div>;
}
