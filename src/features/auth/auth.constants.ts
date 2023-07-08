// URL path for the sign in page
export const SIGNIN_PAGE_PATH = "/auth/signin";

// URL path for the sign up page
export const SIGNUP_PAGE_PATH = "/auth/signup";

// URL path for the forbidden action page
export const FORBIDDEN_PAGE_PATH = "/auth/403";

// URL path for the sign out page
export const SIGNOUT_PAGE_PATH = "/auth/signout";

// Amount of time in milliseconds before the exact expiration date-time of an access token
// from which we should trigger a access token refresh
// Value: 5 minutes
export const ACCESS_TOKEN_EXPIRATION_OFFSET = 5 * 60 * 1000;

/**
 * Enum of the possible reasons for a redirection to the sign in page
 *
 * The values of the enum should be one-word values so that they are url-friendly
 * as they will be put in the query parameters
 */
export enum SigninRedirectionReason {
  Unauthenticated = "unauthenticated",
  Unauthorized = "unauthorized",
}

/**
 * Enum of the possible reasons for a redirection to the sign in page
 *
 * The values of the enum should be one-word values so that they are url-friendly
 * as they will be put in the query parameters
 */
export enum HomePageRedirectionReason {
  SignInNotAllowed = "signin_not_allowed",
  SignUpNotAllowed = "signup_not_allowed",
  SignOutNotAllowed = "signout_not_allowed",
}
