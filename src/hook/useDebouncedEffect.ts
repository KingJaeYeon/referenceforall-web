import { useEffect, useRef } from "react";

export const useDebouncedEffect = (effect: any, delay: number, deps: any) => {
  const callback = useRef();

  useEffect(() => {
    callback.current = effect;
  }, [effect]);

  useEffect(() => {
    //@ts-ignore
    const handler = (...args) => callback.current(...args);

    if (deps !== undefined && deps.length > 0) {
      const timer = setTimeout(handler, delay);
      return () => clearTimeout(timer);
    }
  }, [...(deps || []), delay]);
};
