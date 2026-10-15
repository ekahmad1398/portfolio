"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  FileText,
  FolderKanban,
  Github,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { portfolio, type SectionLink } from "@/data/portfolio";

import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  sections: SectionLink[];
  email?: string;
};

const mobileItems = [
  { id: "hero", label: "Home", icon: House },
  { id: "about", label: "About", icon: UserRound },
  { id: "skills", label: "Skills", icon: BrainCircuit },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "resume", label: "Resume", icon: FileText, href: portfolio.resumePath },
  { id: "contact", label: "Contact", icon: Mail },
];

export function SiteHeader({ sections, email }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnimated, setMenuAnimated] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const animationTokenRef = useRef(0);

  const closeMenu = useCallback(() => {
    animationTokenRef.current += 1;
    setMobileOpen(false);
    setMenuAnimated(false);
    setIsClosing(true);
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setIsClosing(false), 260);
  }, []);

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

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function handleMenuKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleMenuKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleMenuKeyDown);
    };
  }, [mobileOpen, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
      if (desktop.matches) setIsClosing(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const navigation = sections.map((section) => {
    const isActive = activeSection === section.id;
    return (
      <a
        key={section.id}
        href={`#${section.id}`}
        aria-current={isActive ? "location" : undefined}
        className={`nav-link relative flex min-h-11 items-center rounded-md px-2.5 py-2.5 font-display text-[13px] font-medium transition-all duration-200 after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary after:transition-transform hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary hover:after:scale-x-100 ${isActive ? "font-semibold text-primary after:scale-x-100" : "text-muted-foreground after:scale-x-0"}`}
      >
        {section.label}
      </a>
    );
  });

  function toggleMenu() {
    if (mobileOpen) {
      closeMenu();
      return;
    }
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    setIsClosing(false);
    setMenuAnimated(false);
    setMobileOpen(true);
    const animationToken = ++animationTokenRef.current;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (animationTokenRef.current === animationToken) setMenuAnimated(true);
      });
    });
  }

  return (
    <header className={`site-header site-header-frame sticky top-0 z-50 w-full border-b border-border/60 px-3 pt-3 sm:px-5 lg:px-8 lg:pt-0 ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-shell mx-auto flex min-h-[4rem] w-full max-w-[90rem] items-center justify-between gap-3 rounded-2xl px-3 py-2 sm:px-4 lg:min-h-[4.5rem] lg:gap-4 lg:rounded-none lg:px-0">
        <a href="#hero" className="site-brand flex min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden" aria-label="Ahmad Shah, home">
          <span className="site-brand-mark grid size-9 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold tracking-tight">AS</span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-heading text-sm font-semibold text-foreground">Ahmad Shah</span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:block">Full Stack Developer</span>
          </span>
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-start gap-5 pr-6 lg:flex xl:gap-8" aria-label="Primary navigation">
          {navigation}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden lg:block"><ThemeToggle /></span>
          {email ? (
            <Button asChild className="hidden h-10 rounded-full bg-primary px-4 text-xs font-semibold tracking-[0.01em] text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-[#6d28d9] hover:shadow-lg hover:shadow-primary/25 sm:inline-flex">
              <a href={`mailto:${email}`}>Contact <ArrowRight size={14} /></a>
            </Button>
          ) : null}
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-button grid size-11 shrink-0 place-items-center rounded-full text-foreground transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-panel"
            onClick={toggleMenu}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <span className={`mobile-menu-glyph ${mobileOpen ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen || isClosing ? (
        <>
          <button className={`mobile-menu-backdrop ${mobileOpen ? "is-open" : "is-closing"}`} type="button" aria-label="Close navigation menu" tabIndex={mobileOpen ? 0 : -1} onClick={() => { closeMenu(); menuButtonRef.current?.focus(); }} />
          <div
            ref={panelRef}
            id="mobile-navigation-panel"
            className={`mobile-navigation-panel ${mobileOpen && menuAnimated ? "is-open" : "is-closing"}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!mobileOpen}
          >
            <div className="mobile-panel-heading">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Navigation</p>
                <p className="mt-1 text-sm text-white/55">Explore the portfolio</p>
              </div>
              <span className="mobile-panel-index font-mono text-xs">01 — 06</span>
            </div>

            <nav className="mobile-navigation-list" aria-label="Mobile navigation links">
              {mobileItems.map(({ id, label, icon: Icon, href }) => {
                const isActive = activeSection === id;
                const destination = href ?? `#${id}`;
                return (
                  <a
                    key={id}
                    href={destination}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noreferrer" : undefined}
                    aria-current={isActive ? "location" : undefined}
                    className={`mobile-navigation-link ${isActive ? "is-active" : ""}`}
                    onClick={closeMenu}
                  >
                    <span className="mobile-navigation-icon"><Icon size={18} strokeWidth={1.8} /></span>
                    <span>{label}</span>
                    {href ? <ArrowUpRight className="ml-auto text-white/40" size={16} /> : <span className="mobile-navigation-indicator" aria-hidden="true" />}
                  </a>
                );
              })}
            </nav>

            <div className="mobile-panel-footer">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Appearance</span>
                <ThemeToggle />
              </div>
              <div className="mobile-footer-bottom">
                <div className="flex items-center gap-2">
                  {portfolio.socialLinks.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="mobile-social-link">
                      <Github size={17} />
                    </a>
                  ))}
                  {email ? <a href={`mailto:${email}`} aria-label="Email Ahmad Shah" className="mobile-social-link"><Mail size={17} /></a> : null}
                </div>
                <span className="font-mono text-[10px] tracking-wide text-white/40">Building for the web <span className="text-cyan-300">●</span></span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
