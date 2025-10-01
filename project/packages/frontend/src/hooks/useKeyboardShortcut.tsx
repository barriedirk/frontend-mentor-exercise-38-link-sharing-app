import { useEffect } from "react";

type ModifierKey = "ctrl" | "alt" | "meta" | "shift";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers?: ModifierKey[]
) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const tagName = (event.target as HTMLElement)?.tagName;
      const isTyping =
        ["INPUT", "TEXTAREA", "SELECT"].includes(tagName) ||
        (event.target as HTMLElement)?.isContentEditable;

      if (isTyping) return;

      const keyMatch = event.key.toLowerCase() === key.toLowerCase();

      const modifiersMatch = (modifiers ?? []).every((mod) => {
        switch (mod) {
          case "ctrl":
            return event.ctrlKey;
          case "alt":
            return event.altKey;
          case "meta":
            return event.metaKey;
          case "shift":
            return event.shiftKey;
          default:
            return false;
        }
      });

      // Also ensure no extra modifier keys are pressed
      const noExtraModifiers =
        event.ctrlKey === !!modifiers?.includes("ctrl") &&
        event.altKey === !!modifiers?.includes("alt") &&
        event.metaKey === !!modifiers?.includes("meta") &&
        event.shiftKey === !!modifiers?.includes("shift");

      if (keyMatch && modifiersMatch && noExtraModifiers) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [key, callback, modifiers?.join(",")]); // Join to track changes properly
}
