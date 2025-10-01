import { useTypedSelector } from "./useTypedSelector";
import { selectBookmarkedItems } from "@/state/selectors/bookmarkSelectors";

export function useBookmarkList() {
  return useTypedSelector(selectBookmarkedItems);
}
