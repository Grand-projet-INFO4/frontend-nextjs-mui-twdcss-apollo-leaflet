import { redirect } from "next/navigation";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { BACKEND_GRAPHQL_URL } from "@/config/urls.config";
import {
  FORBIDDEN_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  SigninRedirectionReason,
} from "@/features/auth/auth.constants";
import { REDIRECTION_REASON_QUERY_PARAM } from "@/constants/redirection.constants";
import { getServerSession } from "../../next-auth";

// Options passed to the apollo client instance getter
export interface ServerClientOptions {
  // Whether the client instance's operations should be authenticated with the access token or not
  auth?: boolean;

  // Refresh token as the authentication token on refresh token operations
  refreshToken?: string;
}

/**
 * Gets a new apollo client instance on the server
 *
 * A new apollo client instance should be returned on every server-side requests
 * so that the client's cache is not shared across different users that makes requests
 * in order to avoid data leaks between users.
 *
 * @param options The client instance's options
 * @returns An apollo client instance
 */
export function getClient(options: ServerClientOptions = {}) {
  const { auth = false, refreshToken } = options;

  const httpLink = new HttpLink({
    uri: BACKEND_GRAPHQL_URL,
  });

  let links: ApolloLink[] = [];

  // If the client's requests are to be authenticated, ...
  if (auth || refreshToken) {
    // Include the access token inside each request's authorization header
    const authLink = setContext(async function (_, { headers }) {
      let token: string;

      if (auth) {
        const session = await getServerSession();

        // If there's no session (not authenticated), the user must be redirected to the sign in page
        if (!session) {
          const toSignin = `${SIGNIN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${SigninRedirectionReason.Unauthenticated}`;
          redirect(toSignin);
          return;
        }

        token = session.accessToken;
      } else {
        token = refreshToken as string;
      }

      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    });

    links.push(authLink);
  }

  // Error handler link
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        const { message, locations, path, extensions } = error;
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

        // Whether the user should be redirected to the forbidden page
        let isForbidden = false;

        switch (extensions.code) {
          // If the request is unauthorized and the operation is not the sign in operation,
          // then the user should be redirected to the forbidden page
          case "FORBIDDEN": {
            if (operation.operationName !== "SignIn") {
              isForbidden = true;
            }
            break;
          }

          // In case of a 5XX status request error from the GraphQL server,
          // or a GraphQL validation error,
          // we throw those errors in application
          case "INTERNAL_SERVER_ERROR":
          case "GRAPHQL_VALIDATION_FAILED":
            throw error;

          default:
            break;
        }

        if (isForbidden) {
          const toForbidden = `/${FORBIDDEN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${SigninRedirectionReason.Unauthorized}`;
          redirect(toForbidden);
          break;
        }
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  links.push(errorLink);
  links.push(httpLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from(links),
  });
}
