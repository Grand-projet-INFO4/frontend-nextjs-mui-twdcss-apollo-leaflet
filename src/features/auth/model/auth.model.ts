import { createModel } from "@rematch/core";

import { RootModel } from "@/lib/rematch";
import { AuthUser } from "../auth";

export interface AuthModelState {
  authUser: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  csrfToken: string | null;
  isAuthenticated: boolean;
  hasFetched: boolean;
}

// Model for global authentication data
export const authModel = createModel<RootModel>()({
  state: {
    authUser: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
    csrfToken: null,
    hasFetched: false,
  } as AuthModelState,
  reducers: {
    // Sets the authentication state
    setAuthenticationState(_, payload: Partial<AuthModelState>) {
      const state: Partial<AuthModelState> = {};
      payload.authUser !== undefined && (state.authUser = payload.authUser);
      payload.accessToken !== undefined && (state.accessToken = payload.accessToken);
      payload.refreshToken !== undefined && (state.refreshToken = payload.refreshToken);
      payload.expiresAt !== undefined && (state.expiresAt = payload.expiresAt);
      payload.hasFetched !== undefined && (state.hasFetched = payload.hasFetched);
      return { ..._, ...state };
    },
    // Sets the authentication state as signed out
    signout(state) {
      return {
        ...state,
        authUser: null,
        accessToken: null,
        refreshToken: null,
        expiresAt: null,
      };
    },
  },
  effects: {
    // Sets the CSRF token
    async setCsrfToken() {
      const csrfTokenURL = "/api/auth/csrf"; // Exposed by next-auth
      try {
        const { csrfToken } = await fetch(csrfTokenURL, {
          credentials: "include",
        }).then((res) => {
          if (!res.ok) {
            throw res.text();
          } else {
            return res.json() as Promise<{ csrfToken: string }>;
          }
        });
        this.setAuthenticationState({
          csrfToken,
        });
      } catch (error) {
        console.log({ error });
      }
    },
  },
});
