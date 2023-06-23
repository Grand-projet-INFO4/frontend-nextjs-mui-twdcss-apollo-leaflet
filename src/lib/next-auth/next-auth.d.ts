import NextAuth, { DefaultSession, JWT as NextAuthJWT } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    expiresAt: string; // Access Token expiration date
    refreshToken: string;
  }

  type Session = DefaultSession["user"] & User;
}
