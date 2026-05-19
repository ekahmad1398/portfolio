"use client";

import { Command } from "cmdk";
import { ArrowUpRight, Github, Search } from "lucide-react";
import { useEffect, useState } from "react";

import type { SectionLink, SocialLink } from "@/data/portfolio";

type CommandPaletteProps = {
  sections: SectionLink[];
  socials: SocialLink[];
};

export function CommandPalette({ sections, socials }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function navigateToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }

  return (
    <>
      <button type="button" className="icon-button gap-2 px-3 text-sm" onClick={() => setOpen(true)}>
        <Search size={16} />
        <span className="hidden sm:inline">Quick Nav</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-slate-950/36 px-4 pt-24 backdrop-blur-md dark:bg-slate-950/70">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
          />
          <div className="surface-card relative z-[91] w-full max-w-2xl overflow-hidden">
            <Command label="Quick navigation" className="flex flex-col">
              <div className="flex items-center gap-3 border-b border-[color:var(--border-soft)] px-5 py-4">
                <Search size={18} className="text-[color:var(--text-soft)]" />
                <Command.Input
                  autoFocus
                  placeholder="Jump to a section or open a link"
                  className="w-full bg-transparent text-sm text-[color:var(--text-main)] outline-none placeholder:text-[color:var(--text-soft)]"
                />
              </div>

              <Command.List className="max-h-[24rem] overflow-y-auto p-3">
                <Command.Empty className="px-3 py-8 text-center text-sm text-[color:var(--text-soft)]">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Sections" className="palette-group">
                  {sections.map((section) => (
                    <Command.Item
                      key={section.id}
                      value={section.label}
                      className="palette-item"
                      onSelect={() => navigateToSection(section.id)}
                    >
                      <span>{section.label}</span>
                      <ArrowUpRight size={16} />
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Links" className="palette-group">
                  {socials.map((social) => (
                    <Command.Item
                      key={social.href}
                      value={social.label}
                      className="palette-item"
                      onSelect={() => {
                        window.open(social.href, "_blank", "noopener,noreferrer");
                        setOpen(false);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Github size={16} />
                        {social.label}
                      </span>
                      <ArrowUpRight size={16} />
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      ) : null}
    </>
  );
}
