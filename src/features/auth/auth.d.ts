import { RawMongoDocument } from "@/types/mongo";
import { City } from "../city/city";
import { User } from "../user/user";

export interface SigninCredentials {
  identifier: string; // Email or Phone number
  password: string;
}

// Authentication result data after sign in or sign up operation
export interface AuthResult {
  access_token: string;
  expires_at: string; // Access token expiry date-time
  refresh_token: string;
}

// Access token data after token refresh
export interface AccessToken {
  access_token: string;
  expires_at: string; // Access token expiry date-time
}

// Only access token related fields. Used for refresh token operation result
export type AccessToken = Pick<AuthResult, "access_token" | "expires_at">;

// The authenticated user data that is stored globally inside the redux store
export type AuthUser = RawMongoDocument<
  Omit<User, "city"> & {
    city: RawDocument<Omit<City, "region"> & { region: RawMongoDocument<Region> }>;
  }
>;
