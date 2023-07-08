import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  HomePageRedirectionReason,
  SIGNIN_PAGE_PATH,
  SIGNOUT_PAGE_PATH,
  SIGNUP_PAGE_PATH,
} from "./features/auth/auth.constants";
import { NEXTAUTH_SECRET } from "./lib/next-auth/next-auth.config";
import { REDIRECTION_REASON_QUERY_PARAM } from "./constants/redirection.constants";

const authPaths = [SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH];

export async function middleware(req: NextRequest) {
  let res;
  const pathname = req.nextUrl.pathname;

  // Authentication related guards
  if (pathname.startsWith("/auth")) {
    const token = await getToken({
      req,
      secret: NEXTAUTH_SECRET,
    });

    // Do not allow the authenticated user to enter the `sign in` or `sign up` page
    if (token && authPaths.some((path) => pathname.startsWith(path))) {
      // Redirection to the home page
      const redirectionReason = pathname.startsWith(SIGNIN_PAGE_PATH)
        ? HomePageRedirectionReason.SignInNotAllowed
        : HomePageRedirectionReason.SignUpNotAllowed;
      const toHomePageURL = `/?${REDIRECTION_REASON_QUERY_PARAM}=${redirectionReason}`;
      return NextResponse.redirect(toHomePageURL);
    }

    // Do allow a non-authenticated current user to sign out
    if (pathname.startsWith(SIGNOUT_PAGE_PATH) && !token) {
      // Redirection to the home page
      const toHomePageURL = `/?${REDIRECTION_REASON_QUERY_PARAM}=${HomePageRedirectionReason.SignOutNotAllowed}`;
      return NextResponse.redirect(toHomePageURL);
    }
  }

  res ||= NextResponse.next();

  return res;
}
