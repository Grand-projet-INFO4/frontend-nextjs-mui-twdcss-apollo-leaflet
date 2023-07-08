import { gql } from "@apollo/client";
export type { GetMeQuery, GetMeQueryVariables } from "@/graphql/graphql";

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
