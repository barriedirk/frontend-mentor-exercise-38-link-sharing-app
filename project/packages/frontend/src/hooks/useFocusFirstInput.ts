import { useEffect, useRef } from "react";

export function useFocusFirstInput<T extends HTMLElement>() {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const firstInput = containerRef.current.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLElement
      >('input, textarea, select, [tabindex]:not([tabindex="-1"])');

      firstInput?.focus();
    }
  }, []);

  return containerRef;
}
