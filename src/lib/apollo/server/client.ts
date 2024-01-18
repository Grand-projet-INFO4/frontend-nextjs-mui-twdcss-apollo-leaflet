import { redirect } from "next/navigation";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { BACKEND_GRAPHQL_URL } from "@/config/urls.config";
import {
  FORBIDDEN_PAGE_PATH,
  SIGNIN_PAGE_PATH,
  SigninRedirectionReason,
} from "@/features/auth/auth.constants";
import { REDIRECTION_REASON_QUERY_PARAM } from "@/constants/redirection.constants";
import { getServerSession, getToken } from "../../next-auth";
import { NextRequest } from "next/server";

// Options passed to the apollo client instance getter
export interface ServerClientOptions {
  // Whether the client instance's operations should be authenticated with the access token or not
  auth?: boolean;

  // A request object if the request was wade within a route handler or api handler
  req?: NextRequest;
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
  const { auth = false, req } = options;

  const httpLink = new HttpLink({
    uri: BACKEND_GRAPHQL_URL,
  });

  let links: ApolloLink[] = [];

  // If the client's requests are to be authenticated, ...
  if (auth) {
    // Include the access token inside each request's authorization header
    const authLink = setContext(async function (_, { headers }) {
      let token: string;

      const session = await (req ? getToken({ req }) : getServerSession());

      /* We will be commenting this code until the next.js's `redirect` helper will be stable */
      // // If there's no session (not authenticated), the user must be redirected to the sign in page
      // if (!session) {
      //   const toSignin = `${SIGNIN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${SigninRedirectionReason.Unauthenticated}`;
      //   redirect(toSignin);
      //   return;
      // }
      if (!session) {
        throw new Error("The access token is missing");
      }

      token = session.access_token as string;

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

        switch (extensions.code) {
          // If the request is unauthorized and the operation is not the sign in operation,
          // then the user should be redirected to the forbidden page
          case "FORBIDDEN": {
            /* We are commenting this code for now until the Next.js's `redirect` helper will be stable */
            // const toForbidden = `/${FORBIDDEN_PAGE_PATH}?${REDIRECTION_REASON_QUERY_PARAM}=${SigninRedirectionReason.Unauthorized}`;
            // redirect(toForbidden);
            // break;
            throw error;
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
