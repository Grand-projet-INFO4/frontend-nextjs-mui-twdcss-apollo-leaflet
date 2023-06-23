import { GraphQLErrors } from "@apollo/client/errors";

/**
 * Type guard that tells if an error is a GraphQL operation error or not
 *
 * @param error The error to be be checked
 */
export function areGqlOperationErrors(error: unknown): error is GraphQLErrors {
  return (
    error !== undefined && Array.isArray(error) && error.some((e) => "message" in e && "extensions" in e)
  );
}

/**
 * Checks if an array of GraphQL operation errors contain a forbidden error from the GraphQL server
 *
 * @param errors The array of errors to be checked
 */
export function containsForbiddenError(errors: GraphQLErrors) {
  for (const e of errors) {
    if (e.extensions.code === "FORBIDDEN") return true;
  }
  return false;
}
