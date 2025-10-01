import { signal } from "@preact/signals-react";
import { type Signal } from "@preact/signals-react";

const loading: Signal = signal<boolean>(false);

export const loadingSignal = {
  readonly: (loading as any).asReadonly?.() ?? loading,
  show: () => (loading.value = true),
  hide: () => (loading.value = false),
};
