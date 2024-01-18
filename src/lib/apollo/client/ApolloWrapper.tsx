"use client";

import { PropsWithChildren } from "react";
import { ApolloClient, ApolloLink, HttpLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { BACKEND_GRAPHQL_URL } from "@/config/urls.config";
import { store } from "../../rematch";

type GqlException = {
  status?: number;
};

/**
 * Generates the apollo client instance on the client
 */
function makeClient() {
  const httpLink = new HttpLink({
    uri: BACKEND_GRAPHQL_URL,
  });

  // Authorization link
  const authLink = setContext(async (_, { headers: prevHeaders }) => {
    // The access token must already be available because of the auth state initialization
    let accessToken = store.getState().auth.accessToken;
    const headers: any = {
      ...prevHeaders,
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return {
      headers,
    };
  });

  // Error handler link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        const { message, locations, path, extensions } = error;
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);

        switch (extensions.code) {
          // In case of a 5XX status request error from the GraphQL server,
          // or a GraphQL validation error,
          // we throw those errors in application
          case "INTERNAL_SERVER_ERROR":
          case "GRAPHQL_VALIDATION_FAILED":
            // We need to add this extra check because the GraphQL server still sends the 'INTERNAL_SERVER_ERROR' code
            // on some Bad Request Exceptions in some cases
            if (
              extensions.code === "INTERNAL_SERVER_ERROR" &&
              (extensions?.exception as GqlException)?.status === 400
            ) {
              break;
            }

            throw error;
          default:
            break;
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  // Concatening links
  const links = ApolloLink.from([authLink, errorLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: links,
  });
}

// The Apollo client instance
const client = makeClient();

export default function ApolloWrapper({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
