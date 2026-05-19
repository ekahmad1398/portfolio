"use client";

import { useEffect } from "react";

export function Spotlight() {
  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <div className="pointer-events-none fixed inset-0 z-0 spotlight-mask" aria-hidden="true" />;
}
