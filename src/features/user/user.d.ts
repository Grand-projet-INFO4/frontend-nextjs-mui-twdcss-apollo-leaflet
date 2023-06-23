export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}
