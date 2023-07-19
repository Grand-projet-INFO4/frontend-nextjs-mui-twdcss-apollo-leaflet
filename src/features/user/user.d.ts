import { UserRole } from "./user.constants";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: string | null;
  email: string;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}
