import { API_AUTHENTICATION_URL } from "@/config/urls.config";
import { AccessToken, AuthResult, AuthUser, SigninCredentials } from "./auth";
import { RestApiError } from "@/types/api";
import { FORBIDDEN_PAGE_PATH, SigninRedirectionReason } from "./auth.constants";
import { REDIRECTION_REASON_QUERY_PARAM } from "@/constants/redirection.constants";
import { redirect } from "next/navigation";

class AuthService {
  /**
   * Sign in operation through credentials to the application's REST API
   *
   * @param credentials Sign in credentials
   * @returns The authentication result
   */
  static async signin(credentials: SigninCredentials) {
    const endpoint = API_AUTHENTICATION_URL + "/signin";
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = (await res.json()) as RestApiError;
      if (res.status === 403) return null; // Wrong credentials
      throw error;
    }
    const authResult = (await res.json()) as AuthResult;
    return authResult;
  }

  /**
   * Gets the authenticated user that owns the provided access token
   *
   * @param accessToken The access token
   * @returns The authenticated user
   */
  static async getAuthUser(accessToken: string) {
    const endpoint = API_AUTHENTICATION_URL + "/me";
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = (await res.json()) as RestApiError;
      throw error;
    }
    return res.json() as Promise<AuthUser>;
  }

  /**
   * Refreshes the access token of the authenticated user that owns the provided refresh token
   *
   * @param refreshToken The refresh token
   */
  static async refreshToken(refreshToken: string) {
    const endpoint = API_AUTHENTICATION_URL + "/token";
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = (await res.json()) as RestApiError;
      throw error;
    }
    return res.json() as Promise<AccessToken>;
  }

  /**
   * Signs out the authenticated user that owns the provided refresh token
   *
   * @param refreshToken The refresh token
   */
  static async signout(refreshToken: string) {
    const endpoint = API_AUTHENTICATION_URL + "/signout";
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = (await res.json()) as RestApiError;
      throw error;
    }
  }

  /**
   * Deletes the account of the authenticated user that owns the provided refresh token
   *
   * @param refreshToken The refresh token
   */
  static async deleteAccount(refreshToken: string) {
    const endpoint = API_AUTHENTICATION_URL + "/delete-account";
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      const error = (await res.json()) as RestApiError;
      throw error;
    }
  }
}

export default AuthService;
