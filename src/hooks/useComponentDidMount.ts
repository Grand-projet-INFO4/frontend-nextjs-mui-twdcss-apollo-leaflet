import { useEffect, useRef } from "react";

/**
 * Custom hook simulates `componentDidMount` lifecycle hook on top of `useEffect`
 *
 * @param effect The effect that `useEffect()` should run on the mounting phase
 */
export default function useComponentDidMount(effect: () => void | (() => void)) {
  const wasMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!wasMountedRef.current) {
      wasMountedRef.current = true;
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
