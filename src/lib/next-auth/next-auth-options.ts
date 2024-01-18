import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { substractDate } from "@/utils/date-time.utils";
import { ACCESS_TOKEN_EXPIRATION_OFFSET, SIGNIN_PAGE_PATH } from "@/features/auth/auth.constants";
import AuthService from "@/features/auth/auth.service";
import type { RestApiError } from "@/types/api";

// Next Auth's authentication options
export const authOptions: AuthOptions = {
  providers: [
    // Credentials provider because we authenticate using our own email/password authentication
    CredentialsProvider({
      name: "Crendentials",
      credentials: {
        identifier: {
          label: "Email or Phone number",
          type: "string",
          placeholder: "E-mail address",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const authResult = await AuthService.signin({
          identifier: credentials.identifier,
          password: credentials.password,
        });
        if (!authResult) return null;
        // The access token and its expiry date-time and the refresh token from authentication
        // are to ben passed next to the session as the authentication payload
        return {
          id: "", // Fix
          access_token: authResult.access_token,
          expires_at: authResult.expires_at,
          refresh_token: authResult.refresh_token,
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
        // Right after sign in
        token.access_token = user.access_token;
        token.expires_at = user.expires_at;
        token.refresh_token = user.refresh_token;
      }
      const now = new Date();
      // If the request's time is within the access token expiration offset delay before the access token's expiry date-time
      // or past the access token's expiry date-time
      if (now > substractDate(token.expires_at as string, ACCESS_TOKEN_EXPIRATION_OFFSET)) {
        // Refreshing the token and updating the JWT payload
        const { access_token, expires_at } = await AuthService.refreshToken(
          token.refresh_token as string,
        );
        return {
          ...token,
          access_token,
          expires_at,
        };
      }
      return token;
    },
    // Defines what data are exposed from the session after the JWT had been decrypted
    async session({ session, token }) {
      // @ts-ignore
      session.access_token = token.access_token;
      // @ts-ignore
      session.expires_at = token.expires_at;
      // @ts-ignore
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
  events: {
    async signOut({ token, session }) {
      console.log({ token, session });
      try {
        await AuthService.signout(token.refresh_token as string);
      } catch (err) {
        const error = err as RestApiError;
        // If the error is not a forbidden error, throw the error,
        // Forbidden errors are allowed to occur on sign out
        if (!error.statusCode || error.statusCode !== 403) {
          throw error;
        }
      }
    },
  },
  pages: {
    // The route segment of the authentication page
    // Used for instance when redirecting the user on authenticated routes
    signIn: `/${SIGNIN_PAGE_PATH}`,
  },
};
