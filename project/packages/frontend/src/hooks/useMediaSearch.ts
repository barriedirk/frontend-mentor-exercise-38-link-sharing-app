import { useSignal } from "@preact/signals-react";
import { useDebouncedSignal } from "./useDebouncedSignal";
import { useMemo } from "react";
import type { MediaItem } from "@/models/media";

export function useMediaSearch(items: MediaItem[]) {
  const searchTerm = useSignal("");
  const debouncedSearchTerm = useDebouncedSignal(searchTerm, 500);

  const filteredItems = useMemo(() => {
    const term = debouncedSearchTerm.value.toLowerCase();

    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => item.title.toLowerCase().includes(term));
  }, [items, debouncedSearchTerm.value]);

  return {
    searchTerm,
    debouncedSearchTerm,
    filteredItems,
  };
}
