import { UserRole } from "./user.constants";
import { EmbeddedCity } from "../city/city";
import { WithTimestamps } from "@/types/timestamps";

export type User = WithTimestamps<{
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  photo?: string | null;
  email: string;
  phone?: string;
  city: EmbeddedCity;
  roles: UserRole[];
}>;
