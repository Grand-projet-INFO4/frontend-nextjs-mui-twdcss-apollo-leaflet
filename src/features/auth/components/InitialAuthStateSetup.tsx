"use client";

import { useQuery } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { GetMeQuery } from "@/graphql/graphql";
import { useDispatch } from "@/lib/rematch";
import { GET_ME_QUERY } from "../auth.operations";
import { ACCESS_TOKEN_EXPIRATION_OFFSET } from "../auth.constants";
import { useComponentDidMount } from "@/hooks";

export interface InitialAuthStateSetupProps {
  initialSession: Session | null;
}

// Sets up the authentication state when the application mounts
export default function InitialAuthStateSetup({ initialSession }: InitialAuthStateSetupProps) {
  const { data: session, update: updateSession } = useSession();

  const dispatch = useDispatch();

  const isAuthenticated = initialSession !== null && initialSession !== undefined;

  useComponentDidMount(() => {
    // If the user is initially not authenticated,
    // then there's no data to fetch and the authentication state remains as not authenticated
    if (!isAuthenticated) {
      dispatch.auth.setAuthenticationState({
        hasFetched: true,
      });
    } else {
      // We immediataly set the tokens dat from the initial session
      dispatch.auth.setAuthenticationState({
        isAuthenticated: true,
        accessToken: initialSession.accessToken,
        refreshToken: initialSession.refreshToken,
        expiresAt: initialSession.expiresAt,
      });
    }

    // Setting the CSRF token
    dispatch.auth.setCsrfToken();
  });

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
  useQuery<GetMeQuery>(GET_ME_QUERY, {
    skip: !isAuthenticated,
    onCompleted(data) {
      const { me } = data;
      // Set the authenticated user in the store
      dispatch.auth.setAuthenticationState({
        hasFetched: true,
        authUser: me,
      });
    },
  });

  return null;
}
