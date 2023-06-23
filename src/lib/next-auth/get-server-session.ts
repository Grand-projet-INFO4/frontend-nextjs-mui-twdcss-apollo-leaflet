import { getServerSession as nextAuthGetServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Wrapper for next-auth's `getServerSession()` that automatically passes down the authentication options
 */
export function getServerSession() {
  return nextAuthGetServerSession(authOptions);
}
