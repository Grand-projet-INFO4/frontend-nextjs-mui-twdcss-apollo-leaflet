import NextAuth, { DefaultSession, JWT as NextAuthJWT } from "next-auth";

declare module "next-auth" {
  interface User {
    access_token: string;
    expires_at: string; // Access Token expiration date
    refresh_token: string;
  }

  type Session = DefaultSession["user"] & User;
}
