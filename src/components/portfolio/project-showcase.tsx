"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";

import type { GithubActivityItem, GithubRepoCard } from "@/lib/github";
import { Button } from "@/components/ui/button";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type FeaturedProjectsSectionProps = {
  repos: GithubRepoCard[];
};

type GithubProjectsSectionProps = {
  repos: GithubRepoCard[];
  activity: GithubActivityItem[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

const projectAccents = ["#38bdf8", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#facc15"];

function RepoCard({ repo, index, featured = false }: { repo: GithubRepoCard; index: number; featured?: boolean }) {
  const accent = projectAccents[index % projectAccents.length];
  const isRumiSchool = repo.name.toLowerCase() === "rumiint";
  const isMultiVendorStore = repo.name.toLowerCase().includes("multi-vendor-ecommerce");
  const description = isRumiSchool
    ? "Official website for Rumi International School."
    : isMultiVendorStore
      ? "A multi-vendor marketplace bringing products from multiple sellers together in one place."
      : repo.description || "A project from my public GitHub portfolio.";

  return (
    <article
      style={{ "--project-accent": accent, "--project-tint": `color-mix(in srgb, ${accent} 7%, var(--card))` } as CSSProperties & { "--project-accent": string; "--project-tint": string }}
      className={`project-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition duration-300 sm:p-6 ${featured ? "min-h-[17rem] sm:p-8" : ""}`}
    >
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-[color:var(--project-accent)] opacity-50 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center justify-between gap-3 pl-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{featured ? "Featured project" : `Project ${String(index + 1).padStart(2, "0")}`}</span>
        {repo.homepage ? <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-2.5 py-1 font-mono text-[9px] text-emerald-700 dark:text-emerald-300">{isRumiSchool ? "Education website" : "Live"}</span> : null}
      </div>
      <div className="mt-5 pl-2">
        <h3 className={`font-heading font-semibold tracking-tight text-foreground transition-colors group-hover:text-[color:var(--project-accent)] ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>{isRumiSchool ? "Rumi International School" : repo.name}</h3>
        <p className={`mt-3 max-w-2xl text-sm leading-6 text-muted-foreground ${featured ? "line-clamp-4 sm:text-base sm:leading-7" : "line-clamp-3"}`}>{description}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/70 pt-5 mt-6 pl-2">
        {repo.homepage ? <Button asChild size="sm" className="h-9 rounded-full bg-primary px-4 text-xs text-primary-foreground hover:bg-primary/90"><a href={repo.homepage} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={13} /></a></Button> : null}
        <a href={repo.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium text-foreground transition hover:border-[color:var(--project-accent)] hover:bg-muted/50"><Github size={14} /> Source code</a>
      </div>
    </article>
  );
}

export function FeaturedProjectsSection({ repos }: FeaturedProjectsSectionProps) {
  return (
    <section id="projects" className="section-shell">
      <div className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects built from idea to launch."
            description="A selection of products and experiments, with a live link where one is available."
          />
        </Reveal>

        {repos[0] ? <Reveal><RepoCard repo={repos[0]} index={0} featured /></Reveal> : null}
        {repos.length > 1 ? <div className="grid gap-4 pt-1 md:grid-cols-2 xl:gap-5">{repos.slice(1).map((repo, index) => <Reveal key={repo.id}><RepoCard repo={repo} index={index + 1} /></Reveal>)}</div> : null}
      </div>
    </section>
  );
}

export function GithubProjectsSection({ repos, activity }: GithubProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const allFilters = Array.from(new Set(["All", ...repos.flatMap((repo) => repo.languages)])).slice(
    0,
    9
  );

  const filteredRepos =
    activeFilter === "All" ? repos : repos.filter((repo) => repo.languages.includes(activeFilter));

  return (
    <section id="github" className="section-shell pt-0">
      <div className="space-y-8">
        <Reveal>
          <SectionHeading
            eyebrow="GitHub"
            title="More public work from my GitHub, grouped by technology."
            description="If you want to see more code, you can browse the repositories below and filter them by the tools used in each project."
          />
        </Reveal>

        {activity.length ? (
          <Reveal>
            <div className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
              {activity.map((item) => (
                <div key={item.id} className="border-t border-border py-4">
                  <p className="text-sm font-semibold text-[color:var(--text-main)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[color:var(--text-muted)]">{item.repoName}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="flex flex-wrap gap-3">
            {allFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`rounded-md border px-3 py-2 text-[10px] font-mono uppercase tracking-[0.14em] transition ${
                  activeFilter === filter
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRepos.length ? (
            filteredRepos.slice(0, 6).map((repo, index) => (
              <Reveal key={repo.id}>
                <RepoCard repo={repo} index={index} />
              </Reveal>
            ))
          ) : (
            <Reveal>
              <div className="border-t border-border py-8 text-sm leading-7 text-muted-foreground">
                No repositories matched this filter right now. Try another technology tag.
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
