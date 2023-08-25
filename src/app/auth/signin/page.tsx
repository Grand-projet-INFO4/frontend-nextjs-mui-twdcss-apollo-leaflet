import { SigninRedirectionReason } from "@/features/auth/auth.constants";
import ProtectedGuard from "@/features/auth/components/ProtectedGuard";
import SignInForm from "@/features/auth/components/SignInForm";
import { PageProps } from "@/lib/next/next";

export interface SigninPageSearchParams {
  redirect?: SigninRedirectionReason;
}

export default async function SigninPage(props: PageProps<{}, SigninPageSearchParams>) {
  return (
    <ProtectedGuard grants={{ authState: "unauthenticated" }}>
      <div>
        <h1>Sign in</h1>
        <SignInForm />
      </div>
    </ProtectedGuard>
  );
}
