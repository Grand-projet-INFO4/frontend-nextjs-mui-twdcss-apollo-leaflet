import { RawMongoDocument } from "@/types/mongo";
import { City } from "../city/city";
import { User } from "../user/user";
import { Cooperative } from "@/graphql/graphql";

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

type TCooperativeAdmin = {
  cooperative: Cooperative;
}
type TCooperativeDriver = {
  cooperative: Cooperative;
}

// Only access token related fields. Used for refresh token operation result
export type AccessToken = Pick<AuthResult, "access_token" | "expires_at">;

// The authenticated user data that is stored globally inside the redux store
export type AuthUser = User & (
  | { cooperativeRole: 'none' } // For typescript intellicense to work correctly
  | {
      cooperativeRole: "MANAGER";
      coopManagerAccounts: TCooperativeAdmin[];
    }
  | {
      cooperativeRole: "REGULATOR";
      coopRegulatorAccount: TCooperativeAdmin;
    }
  | {
      cooperativeRole: "DRIVER";
      coopDriverAccount: TCooperativeDriver;
    }
);
