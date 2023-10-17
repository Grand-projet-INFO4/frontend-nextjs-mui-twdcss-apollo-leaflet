import { redirect } from "next/navigation";

import { SigninRedirectionReason } from "@/features/auth/auth.constants";
import SignInForm from "@/features/auth/components/SignInForm";
import { PageProps } from "@/lib/next/next";

export interface SigninPageSearchParams {
  redirect?: SigninRedirectionReason;
}

export default async function SigninPage(props: PageProps<{}, SigninPageSearchParams>) {
  return (
    <div className="[max-width:330px]">
      <h1 className="font-bold text-2xl mb-2">Se connecter à votre compte</h1>
      <p className="text-foreground/80 mb-7">Accédez à vos données personnelles.</p>
      <SignInForm />
    </div>
  );
}
