import { useCallback, useEffect, useRef } from 'react';

function useThrottleFn<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current === null) {
        fn(...args);
        timer.current = setTimeout(() => {
          timer.current = null;
        }, delay);
      }
    },
    [fn, delay],
  );
}

export default useThrottleFn;
