/**
 * Verifies if the current environment is on the server
 */
export function isServerEnvironment() {
  return typeof window === "undefined";
}

/**
 * Verifies if the current environment is on the client
 */
export function isClientEnvironment() {
  return typeof window !== "undefined";
}
