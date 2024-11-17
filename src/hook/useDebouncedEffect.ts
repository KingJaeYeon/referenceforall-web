import { useEffect, useRef } from "react";

type Effect = () => void | (() => void | undefined);

function useDebouncedEffect(effect: Effect, delay: number, deps: any[] = []) {
  const effectRef = useRef<Effect>(effect);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const cleanupRef = useRef<void | (() => void)>(null);

  // 최신의 effect를 항상 참조하도록 업데이트
  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    // 기존 타이머가 있으면 클리어
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 지정된 지연 시간 이후에 effect 실행
    timeoutRef.current = setTimeout(() => {
      // 이전 클린업 함수가 있으면 실행
      if (cleanupRef.current) {
        cleanupRef.current();
      }

      // effect 실행 및 클린업 함수 저장
      const cleanup = effectRef.current();
      if (typeof cleanup === "function") {
        cleanupRef.current = cleanup;
      } else {
        cleanupRef.current = undefined;
      }
    }, delay);

    // 언마운트 시 타이머 클리어 및 클린업 실행
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [...deps, delay]);
}

export default useDebouncedEffect;
