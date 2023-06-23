import { gql } from "@apollo/client";

// Sign in
export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        username
        photo
        email
        createdAt
        updatedAt
      }
      accessToken
      expiresAt
      refreshToken
    }
  }
`;

// Gets the currently authenticated user
export const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      username
      photo
      email
      createdAt
      updatedAt
    }
  }
`;

// Access token refresh
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
      expiresAt
    }
  }
`;
