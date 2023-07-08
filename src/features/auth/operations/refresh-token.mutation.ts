import { gql } from "@apollo/client";
export type { RefreshTokenMutation, RefreshTokenMutationVariables } from "@/graphql/graphql";

// Access token refresh
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      expiresAt
    }
  }
`;
