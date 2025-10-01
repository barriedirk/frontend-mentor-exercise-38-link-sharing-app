import { useSignal, type Signal } from "@preact/signals-react";
import { useEffect } from "react";

export function useDebouncedSignal<T>(
  inputSignal: Signal<T>,
  delay = 300
): Signal<T> {
  const debounced = useSignal<T>(inputSignal.value as T);

  useEffect(() => {
    const handler = setTimeout(() => {
      debounced.value = inputSignal.value;
    }, delay);

    return () => clearTimeout(handler);
  }, [inputSignal.value, delay, debounced]);

  return debounced;
}
