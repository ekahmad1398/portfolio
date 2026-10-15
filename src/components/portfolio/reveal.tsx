"use client";

import { useEffect, useRef, useState, type CSSProperties, type PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js-ready");
    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "0px 0px -48px 0px", threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className ?? ""}`}
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
        "--reveal-y": `${y}px`,
      } as CSSProperties & { "--reveal-y": string }}
    >
      {children}
    </div>
  );
}
