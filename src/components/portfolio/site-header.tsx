"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import type { SectionLink } from "@/data/portfolio";

import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  sections: SectionLink[];
  email?: string;
};

export function SiteHeader({ sections, email }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4] }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  const navigation = (
    <>
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "location" : undefined}
            className={`nav-link relative rounded-md px-2.5 py-2.5 font-display text-[13px] font-medium transition-all duration-200 after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:after:scale-x-100 ${isActive ? "font-semibold text-primary after:scale-x-100" : "text-muted-foreground after:scale-x-0"}`}
            onClick={() => setMobileOpen(false)}
          >
            {section.label}
          </a>
        );
      })}
    </>
  );

  return (
    <header className="site-header sticky top-0 z-50 w-full border-b border-border/60 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[90rem] items-center justify-between gap-4 py-2">
          <nav className="hidden min-w-0 flex-1 items-center justify-start gap-5 pr-6 lg:flex xl:gap-8" aria-label="Primary navigation">{navigation}</nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
            <span className="hidden lg:block"><ThemeToggle /></span>
            {email ? (
              <Button asChild className="hidden h-10 rounded-full bg-primary px-4 text-xs font-semibold tracking-[0.01em] text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-lg hover:shadow-primary/25 sm:inline-flex">
                <a href={`mailto:${email}`}>Contact <ArrowRight size={14} /></a>
              </Button>
            ) : null}
            <div className="lg:hidden"><ThemeToggle /></div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 rounded-full border border-border bg-muted text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/25 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
      </div>

      {mobileOpen ? (
        <nav id="mobile-navigation" className="mx-auto mb-3 flex w-full flex-col border-t border-border/70 bg-background py-2 lg:hidden" aria-label="Mobile navigation">
          {navigation}
          {email ? <a className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-[#6d28d9]" href={`mailto:${email}`} onClick={() => setMobileOpen(false)}>Let&apos;s Talk <ArrowRight className="ml-1 inline" size={15} /></a> : null}
        </nav>
      ) : null}
    </header>
  );
}
