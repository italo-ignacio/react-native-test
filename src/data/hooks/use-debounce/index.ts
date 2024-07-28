import { useCallback, useEffect } from 'react';
import type { DependencyList } from 'react';

export const useDebounce = (
  effect: () => void,
  dependencies: DependencyList,
  delay: number
): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return (): void => clearTimeout(timeout);
  }, [callback, delay]);
};
