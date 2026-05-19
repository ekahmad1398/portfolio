"use client";

import Image from "next/image";
import { ArrowRight, Download, Github, Mail, Sparkles } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

import { portfolio } from "@/data/portfolio";
import type { PortfolioGithubData } from "@/lib/github";

import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const skillIcons: Record<
  (typeof portfolio.skills)[number]["icon"],
  { icon: IconType; color: string }
> = {
  html: { icon: SiHtml5, color: "text-orange-400" },
  css: { icon: SiCss, color: "text-sky-500" },
  javascript: { icon: SiJavascript, color: "text-amber-500" },
  react: { icon: SiReact, color: "text-cyan-500" },
  next: { icon: SiNextdotjs, color: "text-[color:var(--text-main)]" },
  tailwind: { icon: SiTailwindcss, color: "text-sky-400" },
  github: { icon: SiGithub, color: "text-[color:var(--text-main)]" },
};

function heroStats(githubData: PortfolioGithubData) {
  return [
    {
      value: String(githubData.profile.publicRepos || portfolio.stats[0]?.value || "0"),
      label: "Public Repositories",
    },
    {
      value: new Date(githubData.profile.createdAt).getFullYear().toString(),
      label: "GitHub Since",
    },
    {
      value: `${portfolio.skills.length}+`,
      label: "Core Skills",
    },
  ];
}

export function HeroSection({ githubData }: { githubData: PortfolioGithubData }) {
  return (
    <section id="hero" className="section-shell flex min-h-[calc(100vh-5rem)] items-center pt-24">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-8">
          <Reveal>
            <span className="glass-card inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              <Sparkles size={16} className="text-[color:var(--accent-strong)]" />
              Available for frontend work
            </span>
          </Reveal>

          <Reveal className="space-y-5">
            <p className="section-eyebrow">{portfolio.fullName}</p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-tight text-[color:var(--text-main)] md:text-7xl">
              {portfolio.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
              {portfolio.heroDescription}
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap gap-4">
            <a href="#projects" className="primary-button px-6 py-3.5">
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href={portfolio.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="secondary-button px-6 py-3.5"
            >
              <Github size={16} />
              GitHub
            </a>
            <a href="/ahmad-shah-gouhari-cv.txt" download className="soft-button px-6 py-3.5">
              <Download size={16} />
              Download CV
            </a>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-3">
            {heroStats(githubData).map((stat) => (
              <div key={stat.label} className="surface-card p-5">
                <p className="text-2xl font-semibold text-[color:var(--text-main)]">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="w-full">
          <div className="relative mx-auto w-full max-w-[31rem]">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-[1.75rem] border border-[color:var(--border-soft)] bg-[rgba(242,233,218,0.9)] blur-[1px] dark:border-sky-300/18 dark:bg-sky-400/8" />
            <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full border border-[color:var(--border-soft)] bg-[rgba(214,228,237,0.9)] dark:border-sky-300/14 dark:bg-blue-400/10" />

            <div className="surface-card relative z-10 overflow-hidden p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                    Frontend Focus
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-[color:var(--text-main)]">
                    Clean UI, real deployment
                  </h2>
                </div>
                <div className="panel-soft rounded-2xl px-4 py-3 font-mono text-2xl text-[color:var(--accent-strong)] dark:bg-white/5">
                  {"</>"}
                </div>
              </div>

              <div className="panel-accent mt-7 space-y-4 rounded-[1.6rem] p-5 dark:bg-slate-950/76">
                <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                  I care about simple structure, readable layouts, and websites that still look
                  good after they go live.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="chip-soft rounded-2xl px-4 py-3 dark:border-white/0 dark:bg-[color:var(--surface-faint)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                      Main Stack
                    </p>
                    <p className="mt-2 text-sm font-medium text-[color:var(--text-main)]">
                      React, Next.js, Tailwind CSS
                    </p>
                  </div>
                  <div className="chip-soft rounded-2xl px-4 py-3 dark:border-white/0 dark:bg-[color:var(--surface-faint)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                      Deployment
                    </p>
                    <p className="mt-2 text-sm font-medium text-[color:var(--text-main)]">
                      GitHub + Vercel workflow
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {portfolio.techStack.slice(0, 6).map((item) => (
                  <span
                    key={item}
                    className="chip-soft rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-main)] dark:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutSection({ avatarUrl }: { avatarUrl: string }) {
  return (
    <section id="about" className="section-shell py-8 sm:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <div className="space-y-3">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-[1.75rem] bg-sky-100 blur-2xl dark:bg-sky-400/10" />
              <div className="absolute -right-5 bottom-6 h-28 w-28 rounded-full bg-cyan-100 blur-3xl dark:bg-cyan-400/10" />

              <div className="surface-card relative overflow-hidden rounded-[1.75rem] p-3">
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={avatarUrl}
                    alt={`${portfolio.fullName} portrait`}
                    fill
                    sizes="(max-width: 768px) 288px, 360px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-3 rounded-[1.2rem] bg-[color:var(--surface-faint)] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                    Frontend Approach
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-muted)]">
                    Clear layout, smooth responsiveness, and details that make the interface feel finished.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="glass-card rounded-[1.2rem] px-4 py-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                  Focus
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-main)]">
                  Personal websites, landing pages, and polished frontend UI.
                </p>
              </div>

              <div className="glass-card rounded-[1.2rem] px-4 py-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                  Workflow
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-main)]">
                  Design direction, React structure, GitHub versioning, then Vercel deployment.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-4">
            <SectionHeading
              eyebrow="About Me"
              title="I like turning simple ideas into interfaces that feel clear, useful, and easy to trust."
              description="My goal is not just to make a page look good. I want it to feel organized, readable, and comfortable for the person using it on a real screen."
            />

            <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
              <div className="glass-card p-4 sm:p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                  My Story
                </p>
                <div className="mt-3 space-y-3 text-sm leading-6 text-[color:var(--text-muted)]">
                  <p>{portfolio.shortBio}</p>
                  <p>{portfolio.about}</p>
                  <p>{portfolio.personalInterests}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="surface-card p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                    What I Care About
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {portfolio.strengths.slice(0, 4).map((strength) => (
                      <span
                        key={strength}
                        className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface-faint)] px-3 py-1.5 text-[12px] font-medium text-[color:var(--text-main)]"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="surface-card p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                    Highlights
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {portfolio.journey.slice(-2).map((item) => (
                      <div key={`${item.year}-${item.title}`} className="chip-soft rounded-[1rem] px-4 py-3 dark:bg-white/4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                          {item.year}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[color:var(--text-main)]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <div className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="The tools I use most in day-to-day frontend work."
            description="These are the main technologies I rely on when I build landing pages, personal websites, and responsive user interfaces."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {portfolio.skills.map((skill) => {
            const skillMeta = skillIcons[skill.icon];
            const SkillIcon = skillMeta.icon;

            return (
              <Reveal key={skill.name}>
                <article className="surface-card interactive-lift flex h-full flex-col rounded-[1.5rem] p-5">
                  <div className="flex items-center gap-4">
                    <div className="chip-soft rounded-2xl p-3 dark:bg-white/5">
                      <SkillIcon className={`h-8 w-8 ${skillMeta.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[color:var(--text-main)]">
                        {skill.name}
                      </h3>
                      <p className="mt-1 text-sm text-[color:var(--text-soft)]">
                        {skill.proficiency}% proficiency
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
                    {skill.description}
                  </p>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[color:var(--surface-muted)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section-shell py-14 sm:py-16">
      <div className="grid gap-7 lg:grid-cols-[0.96fr_1.04fr] lg:gap-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="If you have a website idea, I am happy to talk about it."
            description="You can reach me for freelance work, landing pages, personal portfolios, or frontend help on an existing project."
          />
        </Reveal>

        <Reveal>
          <div className="glass-card p-6">
            <div className="grid gap-3 md:grid-cols-2">
              <a
                href={`mailto:${portfolio.email}`}
                className="surface-card interactive-lift rounded-[1.35rem] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--surface-faint)] text-[color:var(--accent-strong)]">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                      Email
                    </p>
                    <p className="mt-1.5 break-all text-base font-semibold text-[color:var(--text-main)]">
                      {portfolio.email}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                  Best for project ideas, direct questions, and collaboration.
                </p>
              </a>

              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="surface-card interactive-lift rounded-[1.35rem] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="chip-soft flex h-12 w-12 items-center justify-center rounded-2xl text-[color:var(--text-main)] dark:bg-white/8">
                    <Github size={18} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                      GitHub
                    </p>
                    <p className="mt-1.5 text-base font-semibold text-[color:var(--text-main)]">
                      @{portfolio.githubUsername}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                  See repositories, commits, and the projects that are already online.
                </p>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${portfolio.email}`} className="primary-button px-5 py-3">
                <Mail size={16} />
                Send Email
              </a>
              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="secondary-button px-5 py-3"
              >
                <Github size={16} />
                Open GitHub
              </a>
              <a href="/ahmad-shah-gouhari-cv.txt" download className="soft-button px-5 py-3">
                <Download size={16} />
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
