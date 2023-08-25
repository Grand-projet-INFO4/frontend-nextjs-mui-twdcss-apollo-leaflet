import { getToken as nextAuthGetToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { NEXTAUTH_SECRET } from "./next-auth.config";

export type GetTokenParams = {
  req: NextRequest;
};

/**
 * Wrapper around the `getToken` halper of `next-auth`
 */
export async function getToken({ req }: GetTokenParams) {
  return nextAuthGetToken({
    req,
    secret: NEXTAUTH_SECRET,
  });
}
