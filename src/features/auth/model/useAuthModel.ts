import { useSelector } from "react-redux";

import type { RootState } from "@/lib/rematch";

/**
 * Wrapper around the react-redux selector that selects the user model
 */
export default function useAuthModel() {
  return useSelector((state: RootState) => state.user);
}
