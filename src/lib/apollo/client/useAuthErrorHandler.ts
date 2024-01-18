import {
  REDIRECTION_PREVIOUS_URL_QUERY_PARAM,
  REDIRECTION_REASON_QUERY_PARAM,
} from "@/constants/redirection.constants";
import {
  FORBIDDEN_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  SigninRedirectionReason,
} from "@/features/auth/auth.constants";
import { GraphQLErrors } from "@apollo/client/errors";
import { usePathname, useRouter } from "next/navigation";

/**
 * Custom for handling Auth (Authentication + Authorization) error from a GraphQL response errors
 */
export default function useAuthErrorHandler() {
  const router = useRouter();
  const pathname = usePathname() as string;

  /**
   * The auth error handler
   *
   * @param errors The GQL errors object
   */
  function handleAuthError(errors: GraphQLErrors) {
    let isAuthError = false;
    for (const error of errors) {
      switch (error.extensions.code) {
        case "UNAUTHENTICATED": {
          // Redirection to the sign in page
          const toSignInPage = `${SIGNIN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${SigninRedirectionReason.Unauthenticated}&${REDIRECTION_PREVIOUS_URL_QUERY_PARAM}=${pathname}`;
          router.push(toSignInPage);
          isAuthError = true;
          break;
        }

        case "FORBIDDEN": {
          // Redirection to the forbidden page
          const toForbiddenPage = `${FORBIDDEN_PAGE_PATH}?${REDIRECTION_PREVIOUS_URL_QUERY_PARAM}=${pathname}`;
          router.push(toForbiddenPage);
          isAuthError = true;
          break;
        }
      }
      if (isAuthError) break;
    }
  }

  return { handleAuthError };
}
