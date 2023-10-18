import React, { PropsWithChildren } from "react";
import { headers } from "next/headers";

import "./AuthPageLayout.scss";
import { SIGNIN_PAGE_PATH, SIGNUP_PAGE_PATH } from "@/features/auth/auth.constants";
import AuthPageIllustration from "@/app/auth/AuthPageIllustration";
import AppBarLogo from "@/components/AppBarLogo";
import AppTopBarThemeSwitch from "@/components/AppBarThemeSwitch";
import AuthenticatedPageGuard from "@/features/auth/components/AuthenticatedPageGuard";

export default function AuthPageLayout({ children }: PropsWithChildren) {
  const pathname = headers().get("x-pathname") as string;

  // Authentication page: Whether the current page is Sign in or the Sign up page
  const isAuthPage = pathname.startsWith(SIGNIN_PAGE_PATH) || pathname.startsWith(SIGNUP_PAGE_PATH);

  // If we are not in an authentication page, the children are not be wrapped in layout down below.
  if (!isAuthPage) return children;

  return (
    <AuthenticatedPageGuard authenticated={false}>
      <div className="auth-page-layout flex">
        <div className="auth-page-layout__illustration w-1/2 max-w-xl sticky top-0">
          <AuthPageIllustration />
        </div>
        <div className="auth-page-layout__content pt-3 px-10 grow shrink basis-auto">
          <div className="mb-9 flex justify-between">
            <AppBarLogo />
            <AppTopBarThemeSwitch />
          </div>
          {children}
        </div>
      </div>
    </AuthenticatedPageGuard>
  );
}
