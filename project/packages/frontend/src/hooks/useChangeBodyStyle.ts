import { useRef, useEffect } from "react";

export default function useChangeBodyStyle(style: string) {
  const currentStyle = useRef<string>(null);

  useEffect(() => {
    currentStyle.current = document.body.style.cssText;

    document.body.style.cssText = style;

    return () => {
      document.body.style.cssText = currentStyle.current ?? "";
    };
  }, []);
}
