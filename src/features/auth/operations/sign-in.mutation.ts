import { gql } from "@apollo/client";
export type { SignInMutation, SignInMutationVariables } from "@/graphql/graphql";

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
