"use client";

import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";

import type { SectionLink } from "@/data/portfolio";

import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  name: string;
  sections: SectionLink[];
  email?: string;
};

export function SiteHeader({ name, sections, email }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkTheme = mounted && resolvedTheme === "dark";

  const shellClass = isDarkTheme
    ? isScrolled
      ? "border-white/10 bg-slate-950/84 shadow-[0_18px_38px_rgba(2,6,23,0.34)]"
      : "border-white/8 bg-slate-950/66"
    : isScrolled
      ? "border-[color:var(--border-soft)] bg-[rgba(244,238,229,0.92)] shadow-[0_18px_38px_rgba(106,125,142,0.16)]"
      : "border-[color:var(--border-soft)] bg-[rgba(240,247,251,0.84)]";

  const brandEyebrowClass = isDarkTheme ? "text-sky-200/70" : "text-[color:var(--accent-strong)]";
  const brandTextClass = isDarkTheme ? "text-white" : "text-[color:var(--text-main)]";
  const navLinkClass = isDarkTheme
    ? "relative px-2 py-2 text-sm font-medium text-slate-300 transition after:absolute after:bottom-0 after:left-2 after:h-px after:w-0 after:bg-sky-300 after:transition-all hover:text-white hover:after:w-[calc(100%-1rem)]"
    : "relative px-2 py-2 text-sm font-medium text-[color:var(--text-muted)] transition after:absolute after:bottom-0 after:left-2 after:h-px after:w-0 after:bg-[color:var(--accent-strong)] after:transition-all hover:text-[color:var(--text-main)] hover:after:w-[calc(100%-1rem)]";

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-6 rounded-[1.35rem] border px-4 py-3 backdrop-blur-xl transition-all duration-300 sm:px-5 ${shellClass}`}
      >
        <Link href="#hero" className="min-w-0 text-left">
          <span
            className={`block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${brandEyebrowClass}`}
          >
            Portfolio
          </span>
          <span
            className={`mt-1 block truncate font-display text-lg font-semibold tracking-[-0.03em] ${brandTextClass}`}
          >
            {name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className={navLinkClass}>
              {section.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {email ? (
            <a href={`mailto:${email}`} className="secondary-button px-4 py-2.5">
              <Mail size={16} />
              Contact
            </a>
          ) : null}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="icon-button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mx-auto mt-3 w-full max-w-7xl px-4 sm:px-6 lg:hidden">
          <div
            id="mobile-navigation"
            className="glass-card flex flex-col gap-1 rounded-[1.15rem] p-2.5"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-[0.9rem] px-4 py-3 text-sm font-medium text-[color:var(--text-main)] transition hover:bg-[color:var(--surface-faint)]"
                onClick={() => setMobileOpen(false)}
              >
                {section.label}
              </a>
            ))}

            {email ? (
              <a
                href={`mailto:${email}`}
                className="secondary-button mt-1 rounded-[0.9rem] px-4 py-3"
                onClick={() => setMobileOpen(false)}
              >
                <Mail size={16} />
                Contact
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
