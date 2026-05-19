"use client";

import { ExternalLink, Github, Sparkles, Star } from "lucide-react";
import { useState } from "react";

import type { GithubActivityItem, GithubRepoCard } from "@/lib/github";

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

function RepoCard({
  repo,
  compact = false,
}: {
  repo: GithubRepoCard;
  compact?: boolean;
}) {
  const hostLabel = repo.deploymentHost
    ? repo.deploymentHost.includes("vercel")
      ? "Live on Vercel"
      : `Live on ${repo.deploymentHost}`
    : "GitHub Project";

  return (
    <article
      className={`surface-card interactive-lift flex h-full flex-col ${
        compact ? "rounded-[1.4rem] p-4" : "rounded-[1.6rem] p-5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface-faint)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
            <Sparkles size={12} />
            {repo.primaryLanguage}
          </span>
          <h3 className="mt-4 truncate text-xl font-semibold tracking-tight text-[color:var(--text-main)]">
            {repo.name}
          </h3>
        </div>

        <div className="chip-soft rounded-2xl px-3 py-2 text-right">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--text-soft)]">
            Updated
          </p>
          <p className="mt-1 text-xs font-medium text-[color:var(--text-main)]">
            {formatDate(repo.updatedAt)}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[color:var(--text-muted)]">
        {repo.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip-soft rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]">
          {hostLabel}
        </span>
        {repo.languages.slice(0, compact ? 2 : 3).map((language) => (
          <span
            key={language}
            className="chip-soft rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[color:var(--text-muted)]"
          >
            {language}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--text-muted)]">
          <Star size={15} className="fill-current text-sky-400" />
          {repo.stars} stars
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="primary-button px-4 py-2.5 text-[0.7rem]"
            >
              <ExternalLink size={14} />
              Live
            </a>
          ) : null}

          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="secondary-button px-4 py-2.5 text-[0.7rem]"
          >
            <Github size={14} />
            Code
          </a>
        </div>
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
            eyebrow="Live Projects"
            title="Some of my GitHub projects that are already deployed online."
            description="These cards come from my public GitHub repositories and show the projects that have a live homepage, including the ones hosted on Vercel."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo) => (
            <Reveal key={repo.id}>
              <RepoCard repo={repo} compact />
            </Reveal>
          ))}
        </div>
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
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {activity.map((item) => (
                <div key={item.id} className="glass-card rounded-[1.35rem] p-4">
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
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  activeFilter === filter
                    ? "border-sky-300/40 bg-sky-100 text-sky-700 shadow-[0_10px_24px_rgba(56,189,248,0.12)] dark:bg-sky-400/14 dark:text-sky-100"
                    : "border-[color:var(--border-soft)] bg-[color:var(--chip-bg)] text-[color:var(--text-muted)] hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-soft)] dark:bg-white/5"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRepos.length ? (
            filteredRepos.slice(0, 6).map((repo) => (
              <Reveal key={repo.id}>
                <RepoCard repo={repo} compact />
              </Reveal>
            ))
          ) : (
            <Reveal>
              <div className="glass-card p-6 text-sm leading-7 text-[color:var(--text-muted)] md:col-span-2 xl:col-span-3">
                No repositories matched this filter right now. Try another technology tag.
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
