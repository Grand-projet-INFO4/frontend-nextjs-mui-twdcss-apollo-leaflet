"use client";

import { useLazyQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useDispatch } from "@/lib/rematch";
import { GET_ME_QUERY, GetMeQuery } from "../operations/get-me.query";
import { ACCESS_TOKEN_EXPIRATION_OFFSET } from "../auth.constants";
import useComponentDidMount from "@/hooks/useComponentDidMount";

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
    if (session && session.expiresAt) {
      // Updating the tokens data in the store
      dispatch.auth.setAuthenticationState({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        expiresAt: session.expiresAt,
      });

      // Amount of time in milliseconds before the next session update
      const NEXT_SESSION_UPDATE_IN =
        new Date(session.expiresAt).getTime() - Date.now() - ACCESS_TOKEN_EXPIRATION_OFFSET;
      // Setting the timeout that will update the session
      const sessionUpdateTimeout = setTimeout(updateSession, NEXT_SESSION_UPDATE_IN);
      return () => clearTimeout(sessionUpdateTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.expiresAt]);

  // Only fetching the current user if the user is authenticated
  const [getMe] = useLazyQuery<GetMeQuery>(GET_ME_QUERY, {
    onCompleted(data) {
      const { me } = data;
      // Set the authenticated user in the store
      dispatch.auth.setAuthenticationState({
        hasFetched: true,
        authUser: me,
      });
    },
  });

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

  return null;
}
