"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { REDIRECTION_PREVIOUS_URL_QUERY_PARAM } from "@/constants/redirection.constants";
import { SIGNIN_PAGE_PATH } from "@/features/auth/auth.constants";

// Page for the showing an unauthorized action
export default function ForbiddenPage() {
  const { status } = useSession();

  const router = useRouter();
  const search = useSearchParams();

  // Page where the unauthorized action came from
  // If not specified, it defaults to the home page
  const toRetryPage = search?.get(REDIRECTION_PREVIOUS_URL_QUERY_PARAM) ?? "/";

  return (
    <div>
      <header>
        <h1>403 forbidden</h1>
        <p>Vous n'êtes pas autorisé à effectuer l'action que vous aviez faite précédemment.</p>
        <div className="flex justify-center gap-x-4">
          <button onClick={() => router.push(toRetryPage)}>Réessayer</button>
          {status === "authenticated" && (
            <button onClick={() => signOut({ callbackUrl: SIGNIN_PAGE_PATH })}>Se déconnecter</button>
          )}
        </div>
      </header>
    </div>
  );
}
