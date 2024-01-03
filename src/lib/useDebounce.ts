import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    function () {
      const clearTimeoutId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(clearTimeoutId);
    },
    [value, delay]
  );

  return debouncedValue;
}
