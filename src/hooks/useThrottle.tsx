import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to throttle a function call
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 */
export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const lastRan = useRef(Date.now());

  return useCallback(
    ((...args) => {
      const now = Date.now();
      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      }
    }) as T,
    [callback, delay]
  );
};
