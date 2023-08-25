import { WithTimestamps, WithoutTimestamps } from "@/types/timestamps";
import { Region } from "../region/region";

export type City = WithTimestamps<{
  id: string;
  cityName: string;
  region: Region;
}>;

export type EmbeddedCity = WithoutTimestamps<City>;
