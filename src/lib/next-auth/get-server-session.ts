import { getServerSession as nextAuthGetServerSession } from "next-auth";

import { authOptions } from "./next-auth-options";

/**
 * Wrapper for next-auth's `getServerSession()` that automatically passes down the authentication options
 */
export function getServerSession() {
  return nextAuthGetServerSession(authOptions);
}
