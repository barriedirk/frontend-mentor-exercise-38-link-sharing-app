import type { MediaItem } from "@/models/media";
import { useTypedSelector } from "./useTypedSelector";
import type { BookmarksStateData } from "@/models/bookmarksState";

export function useIsBookmarkHosted(item: MediaItem) {
  const idBookmark = `${item.category}-${item.id}`;

  const data = useTypedSelector<BookmarksStateData>(
    ({ bookmarks }) => bookmarks.data
  );

  return { idBookmark, isBookmarkHosted: Boolean(data[idBookmark]) };
}
