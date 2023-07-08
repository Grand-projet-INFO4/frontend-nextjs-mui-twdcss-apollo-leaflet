import { SigninRedirectionReason } from "@/features/auth/auth.constants";
import { PageProps } from "@/lib/next/next";

export interface SigninPageSearchParams {
  redirect?: SigninRedirectionReason;
}

export default async function SigninPage(props: PageProps<{}, SigninPageSearchParams>) {
  return <div>Sign in</div>;
}
