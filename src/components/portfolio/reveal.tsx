"use client";

import type { PropsWithChildren } from "react";

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
  return (
    <div
      className={className}
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
        transform: y ? "translate3d(0, 0, 0)" : undefined,
      }}
    >
      {children}
    </div>
  );
}
