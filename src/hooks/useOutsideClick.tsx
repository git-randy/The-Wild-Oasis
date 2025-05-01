import { useEffect, useRef } from "react";

export function useOutsideClick(handler: () => void, listenCapture = true) {
  const ref = useRef<any>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapture);
      return () =>
        document.removeEventListener("click", handleClick, listenCapture);
    },
    [handler, listenCapture]
  );

  return ref;
}
