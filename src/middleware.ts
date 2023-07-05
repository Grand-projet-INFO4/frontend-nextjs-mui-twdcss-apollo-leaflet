import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "./features/auth/auth.constants";
import { NEXTAUTH_SECRET } from "./lib/next-auth/next-auth.config";

const authPaths = [`/${SIGNIN_PAGE_PATH}`, `/${SIGNUP_PAGE_PATH}`];

export async function middleware(req: NextRequest) {
  let res;
  const pathname = req.nextUrl.pathname;

  // Do not allow the authenticated user to enter the `sign in` or `sign up` page
  if (authPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req,
      secret: NEXTAUTH_SECRET,
    });
    if (token) {
      return NextResponse.redirect("/");
    }
  }

  res ||= NextResponse.next();

  return res;
}
