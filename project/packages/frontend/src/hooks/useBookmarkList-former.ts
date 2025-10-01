import type { MediaItem } from "@/models/media";
import { useTypedSelector } from "./useTypedSelector";

export function useBookmarkList() {
  return useTypedSelector<MediaItem[]>(({ bookmarks }) => {
    const { list, data } = bookmarks;

    return list.map((id) => data[id] ?? null).filter(Boolean);
  });
}

/*

  I got a warning in the browser

  Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.

  Googling I got the following explication

  Why This Is a Problem

"React Redux internally compares the result of useSelector() using reference equality (===). If a selector returns a new object or array each time, React thinks the data has changed and will re-render the component — even if the contents are the same."

  and 
  
  return list.map((id) => data[id] ?? null).filter(Boolean);
  
  always returns a new array every time it is called, even though it returns the same data

  for that reason I have installed "reselect"

  this is a small library (created by the Redux team) for creating memoized selectors.

*/
