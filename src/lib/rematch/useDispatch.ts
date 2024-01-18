import { useDispatch as rematchUseDispatch } from "react-redux";

import { Dispatch } from "./store";

// Wrapper around the `useDispatch` hook from react-redux that provides typings for the store
export default function useDispatch() {
  return rematchUseDispatch<Dispatch>();
}
