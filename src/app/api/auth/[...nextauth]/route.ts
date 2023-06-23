import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { substractDate } from "@/utils/date-time.utils";
import { ACCESS_TOKEN_EXPIRATION_OFFSET, SIGNIN_PAGE_PATH } from "@/features/auth/auth.constants";
import { getClient } from "@/lib/apollo";
import { RefreshTokenMutation, SignInMutation, SignInMutationVariables } from "@/graphql/graphql";
import { REFRESH_TOKEN_MUTATION, SIGN_IN_MUTATION } from "@/features/auth/auth.operations";

/**
 * Signs in a user to the GraphQL API using the email/password credentials
 *
 * @returns The authentication result
 */
async function signIn(email: string, password: string) {
  const { data, errors } = await getClient().mutate<SignInMutation, SignInMutationVariables>({
    mutation: SIGN_IN_MUTATION,
    variables: {
      email,
      password,
    },
  });
  if (errors) {
    for (const error of errors) {
      if (error.extensions.code === "FORBIDDEN") return null;
    }
  }
  return (data as SignInMutation).signin;
}

/**
 * Refresh an access token with a refresh token
 *
 * @param token The refresh token
 * @returns The refresh access token data
 */
async function refreshToken(token: string) {
  const { data } = await getClient({
    refreshToken: token,
  }).mutate<RefreshTokenMutation>({
    mutation: REFRESH_TOKEN_MUTATION,
  });
  return (data as RefreshTokenMutation).refreshToken;
}

// Next Auth's authentication options
export const authOptions: AuthOptions = {
  providers: [
    // Credentials provider because we authenticate using our own email/password authentication
    CredentialsProvider({
      name: "Crendentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "E-mail address" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const authResult = await signIn(credentials.email, credentials.password);
        if (!authResult) return null;
        // The user id, access token and refresh token from authentication
        // are to ben passed next to the session as the authentication payload
        return {
          id: authResult.user.id,
          accessToken: authResult.accessToken,
          expiresAt: authResult.expiresAt,
          refreshToken: authResult.refreshToken,
        };
      },
    }),
  ],
  session: {
    // JWT session strategy because we do not store any session id into any external database
    // but rather store the authentication payload as JWT into the browser's cookie
    strategy: "jwt",
  },
  callbacks: {
    // Defines the authentication payload to store as JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
        token.refreshToken = user.refreshToken;
      } else if (token) {
        const now = new Date();
        if (now > substractDate(token.expiresAt as string, ACCESS_TOKEN_EXPIRATION_OFFSET)) {
          // Refreshing the token and updating the JWT payload
          const { accessToken, expiresAt } = await refreshToken(token.refreshToken as string);
          return {
            ...token,
            accessToken,
            expiresAt,
          };
        } else {
          return token;
        }
      }
      return token;
    },
    // Defines what data are exposed from the session after the JWT had been decrypted
    async session({ session, token }) {
      // @ts-ignore
      session.id = token.id;
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.expiresAt = token.expiresAt;
      // @ts-ignore
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    // The route segment of the authentication page
    // Used for instance when redirecting the user on authenticated routes
    signIn: `/${SIGNIN_PAGE_PATH}`,
  },
};

// Handler of requests to next-auth operations
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
