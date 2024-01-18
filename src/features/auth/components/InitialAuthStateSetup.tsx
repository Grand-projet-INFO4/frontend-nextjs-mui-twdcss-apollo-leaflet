"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

import { useDispatch } from "@/lib/rematch";
import { ACCESS_TOKEN_EXPIRATION_OFFSET } from "../auth.constants";
import useComponentDidMount from "@/hooks/useComponentDidMount";
import { RestApiError } from "@/types/api";
import { AuthUser } from "../auth";

// Sets up the authentication state when the application mounts
export default function InitialAuthStateSetup() {
  const { data: session, status, update: updateSession } = useSession();

  const dispatch = useDispatch();

  useComponentDidMount(() => {
    // Setting the CSRF token
    dispatch.auth.setCsrfToken();
  });

  // Updating the authentication data whenever the session data changes
  useEffect(() => {
    if (session && session.expires_at) {
      // Updating the tokens data in the store
      dispatch.auth.setAuthenticationState({
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at,
      });

      // Amount of time in milliseconds before the next session update
      const NEXT_SESSION_UPDATE_IN =
        new Date(session.expires_at).getTime() - Date.now() - ACCESS_TOKEN_EXPIRATION_OFFSET;
      // Setting the timeout that will update the session
      const sessionUpdateTimeout = setTimeout(updateSession, NEXT_SESSION_UPDATE_IN);
      return () => clearTimeout(sessionUpdateTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.expires_at]);

  useEffect(() => {
    if (status !== "loading") {
      // The session data has been fetched
      if (status === "authenticated") {
        // If the current user is authenticated, then we can fetch the authenticated user's data
        getMe();
      } else {
        // If the current user is not authenticated,
        // then we can set the authentication state as being fetched
        // and the authenticated user to null
        dispatch.auth.setAuthenticationState({
          authUser: null,
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
          hasFetched: true,
        });
      }
    }
  }, [status]);

  /**
   * Fetches the authenticated user
   */
  async function getMe() {
    if (!session?.access_token) {
      throw new Error("Cannot fetch the authenticated user with a missing access token");
    }
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        // Error handling
        const error = (await res.json()) as RestApiError;
        if (error.statusCode === 403 || error.statusCode === 401) {
          // Sign out if the the request was not authorized
          signOut();
          return;
        }
        throw error;
      }
      const authUser = (await res.json()) as AuthUser;
      // Setting the auth user state in the Redux store
      dispatch.auth.setAuthenticationState({
        hasFetched: true,
        authUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}
