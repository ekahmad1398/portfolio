"use client";

import Image from "next/image";
import { ArrowRight, Circle, Database, Download, ExternalLink, Github, Mail, Server, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { IconType } from "react-icons";
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si";

import { portfolio } from "@/data/portfolio";
import type { PortfolioGithubData } from "@/lib/github";
import { Button } from "@/components/ui/button";

import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const skillIcons: Record<
  (typeof portfolio.skills)[number]["icon"],
  { icon: IconType; color: string; surface: string; hover: string; accent: string }
> = {
  javascript: { icon: SiJavascript, color: "text-[#806000] dark:text-[#ffe45e]", surface: "border-[#f7df1e]/60 bg-[#f7df1e]/15 dark:bg-[#f7df1e]/[0.08]", hover: "", accent: "#f7df1e" },
  typescript: { icon: SiTypescript, color: "text-[#3178c6] dark:text-[#60a5fa]", surface: "border-[#3178c6]/30 bg-[#3178c6]/[0.08]", hover: "", accent: "#3178c6" },
  html: { icon: SiHtml5, color: "text-[#e34f26] dark:text-[#fb7047]", surface: "border-[#e34f26]/30 bg-[#e34f26]/[0.08]", hover: "", accent: "#e34f26" },
  css: { icon: SiCss, color: "text-[#1572b6] dark:text-[#49a7ed]", surface: "border-[#1572b6]/30 bg-[#1572b6]/[0.08]", hover: "", accent: "#1572b6" },
  react: { icon: SiReact, color: "text-[#149eca] dark:text-[#61dafb]", surface: "border-[#61dafb]/35 bg-[#61dafb]/10", hover: "", accent: "#61dafb" },
  next: { icon: SiNextdotjs, color: "text-[#171717] dark:text-white", surface: "border-slate-500/20 bg-slate-500/10", hover: "", accent: "#71717a" },
  tailwind: { icon: SiTailwindcss, color: "text-[#0891b2] dark:text-[#38bdf8]", surface: "border-[#38bdf8]/35 bg-[#38bdf8]/10", hover: "", accent: "#38bdf8" },
  github: { icon: SiGithub, color: "text-[#171717] dark:text-white", surface: "border-slate-500/20 bg-slate-500/10", hover: "", accent: "#a1a1aa" },
  mongodb: { icon: SiMongodb, color: "text-[#13aa52]", surface: "border-[#13aa52]/30 bg-[#13aa52]/10", hover: "", accent: "#13aa52" },
  express: { icon: SiExpress, color: "text-[#171717] dark:text-white", surface: "border-slate-500/20 bg-slate-500/10", hover: "", accent: "#a1a1aa" },
  node: { icon: SiNodedotjs, color: "text-[#43853d] dark:text-[#68a063]", surface: "border-[#68a063]/35 bg-[#68a063]/10", hover: "", accent: "#68a063" },
};

const liveCode = `const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      published: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
}`;
const liveReactCode = `return (\n  <ProjectList\n    projects={projects}\n  />\n)`;

function LiveCode({ code = liveCode, lineCount = 13 }: { code?: string; lineCount?: number }) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    let cursor = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      if (!deleting && cursor < code.length) {
        cursor += 1;
        setVisibleChars(cursor);
        timer = window.setTimeout(tick, 24);
      } else if (!deleting) {
        deleting = true;
        timer = window.setTimeout(tick, 1100);
      } else if (cursor > 0) {
        cursor -= 1;
        setVisibleChars(cursor);
        timer = window.setTimeout(tick, 8);
      } else {
        deleting = false;
        timer = window.setTimeout(tick, 450);
      }
    };
    timer = window.setTimeout(tick, 650);
    return () => window.clearTimeout(timer);
  }, [code]);

  const shownCode = code.slice(0, visibleChars);
  const parts = shownCode.split(/(getProjects|ProjectList|projects|const|async|try|await|true|catch|return|200|=>|-1)/g);

  return <>
    <div className="select-none text-right text-slate-600">{Array.from({ length: lineCount }, (_, index) => <span key={index}>{String(index + 1).padStart(2, "0")}{index < lineCount - 1 && <br />}</span>)}</div>
    <pre className="overflow-hidden text-slate-300"><code aria-label="Live code sample">{parts.map((part, index) => {
      const color = ["getProjects", "ProjectList"].includes(part) ? "text-sky-200" : ["const", "async", "try", "await", "catch", "return", "=>"].includes(part) ? "text-violet-300" : ["true", "-1"].includes(part) ? "text-amber-200" : ["200", "projects"].includes(part) ? "text-emerald-200" : undefined;
      return color ? <span key={index} className={color}>{part}</span> : part;
    })}<span className="typing-caret" aria-hidden="true" /></code></pre>
  </>;
}

export function HeroSection({ githubData }: { githubData: PortfolioGithubData }) {
  const featuredRepo = githubData.liveRepos[0] ?? githubData.featuredRepos[0] ?? githubData.repos[0];
  const featuredRepoDescription = featuredRepo?.name.toLowerCase().includes("multi-vendor-ecommerce")
    ? "A multi-vendor marketplace bringing products from multiple sellers together in one place."
    : featuredRepo?.name.toLowerCase() === "rumiint"
      ? "Official website for Rumi International School."
      : featuredRepo?.description || "Full-stack applications, APIs, and product interfaces.";
  const trackPanelPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-x", `${((x - 0.5) * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${((0.5 - y) * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${(x * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--glow-y", `${(y * 100).toFixed(1)}%`);
  };
  const resetPanelPointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section id="hero" className="hero-section relative isolate flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden px-5 pb-14 pt-14 sm:px-7 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-6rem)] lg:px-8 lg:pb-20 lg:pt-16">
      <div className="relative z-10 mx-auto grid w-full max-w-[80rem] items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-8 xl:gap-14">
        <div className="relative z-10">
          <Reveal><p className="inline-flex items-center gap-2 rounded-full border border-cyan-800/10 bg-cyan-100/70 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-950 dark:border-cyan-200/15 dark:bg-cyan-100/[0.045] dark:text-cyan-100 sm:text-[11px]"><span className="size-1.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(103,232,249,0.85)] dark:bg-cyan-300" /> Full-Stack Developer <span className="text-slate-500 dark:text-slate-600">|</span> MERN Stack</p></Reveal>
          <Reveal className="mt-6 space-y-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 sm:text-xs">{portfolio.fullName} <span className="px-1.5 text-cyan-700 dark:text-cyan-300">/</span> Full stack + IT operations</p>
            <h1 className="max-w-3xl font-heading text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">Building <span className="hero-gradient-text">Powerful Digital Experiences</span></h1>
            <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">I&apos;m a Full-Stack Developer specializing in the MERN stack, building modern, responsive web applications from intuitive user interfaces to scalable backend systems. With experience in IT management, database integration, REST APIs, and technical problem-solving, I combine development expertise with practical IT operations.</p>
          </Reveal>
          <Reveal className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-11 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 text-white shadow-[0_10px_32px_rgba(48,107,220,0.24)] transition hover:-translate-y-0.5 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 sm:h-12 sm:px-6"><a href="#projects">Explore My Projects <ArrowRight size={16} /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-11 rounded-full border-slate-300 bg-white px-5 text-slate-800 transition hover:border-cyan-500/50 hover:bg-cyan-50 dark:border-white/15 dark:bg-white/[0.035] dark:text-white dark:hover:border-cyan-200/35 dark:hover:bg-white/[0.075] sm:h-12 sm:px-6"><a href={"mailto:" + portfolio.email}><Mail size={16} /> Contact Me</a></Button>
          </Reveal>
        </div>

        <Reveal className="w-full">
          <div className="hero-workspace relative mx-auto min-h-[480px] max-w-[650px] sm:min-h-[570px] lg:min-h-[600px]">
            <div onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer} className="hero-panel hero-editor absolute left-[3%] top-[4%] z-10 w-[88%] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a1020]/90 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:left-[5%] sm:top-[3%] sm:w-[78%]">
              <div className="flex h-11 items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4"><div className="flex items-center gap-1.5" aria-hidden="true"><span className="size-2 rounded-full bg-rose-400/80" /><span className="size-2 rounded-full bg-amber-300/80" /><span className="size-2 rounded-full bg-emerald-300/80" /></div><div className="flex items-center gap-4 font-mono text-[9px] text-slate-500"><span className="text-cyan-100">project.controller.js</span><span className="hidden sm:inline">api.routes.js</span></div><span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.6)]" aria-label="Editor ready" /></div>
              <div className="grid min-h-[24.7em] grid-cols-[2rem_1fr] gap-3 px-3 py-4 font-mono text-[9px] leading-[1.9] sm:grid-cols-[2.25rem_1fr] sm:gap-4 sm:px-5 sm:py-5 sm:text-[10px]"><LiveCode /></div>
              <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-500"><span>Node.js · Express</span><span className="flex items-center gap-1.5"><Circle size={6} className="fill-emerald-300 text-emerald-300" /> Full-stack flow</span></div>
            </div>
            <div onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer} className="hero-panel hero-api absolute right-0 top-[33%] z-20 w-[55%] rounded-xl border border-cyan-200/[0.18] bg-[#0b1422]/95 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:right-[1%] sm:top-[31%] sm:w-[47%] sm:p-4">
              <div className="mb-3 flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-medium text-slate-200 sm:text-xs"><Server size={13} className="text-cyan-200" /> API routes</span><span className="rounded-full bg-emerald-300/10 px-2 py-1 font-mono text-[8px] text-emerald-200">REST</span></div>
              <div className="space-y-2 font-mono text-[8px] sm:text-[9px]"><div className="flex items-center justify-between gap-1 rounded-lg bg-white/[0.035] px-2 py-2"><span className="text-emerald-200">GET</span><span className="truncate text-slate-300">/api/projects</span><span className="text-emerald-200">200</span></div><div className="flex items-center justify-between gap-1 rounded-lg bg-white/[0.035] px-2 py-2"><span className="text-blue-200">POST</span><span className="truncate text-slate-300">/api/auth/login</span><span className="text-emerald-200">201</span></div><div className="flex items-center gap-1.5 pt-0.5 text-slate-500"><ShieldCheck size={11} className="text-violet-200" /> Validation · middleware</div></div>
            </div>
            <div onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer} className="hero-panel hero-stat absolute right-0 top-[55%] z-20 hidden w-[45%] rounded-xl border border-blue-200/[0.14] bg-[#0b1322]/95 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:block sm:right-[1%] sm:p-4"><p className="mb-3 font-mono text-[8px] uppercase tracking-[0.15em] text-blue-200">Project scope</p><div className="grid grid-cols-2 gap-3"><div><p className="text-[10px] font-medium text-slate-200">Full-stack</p><p className="mt-1 text-[8px] leading-4 text-slate-500">UI / API / data</p></div><div><p className="text-[10px] font-medium text-slate-200">IT operations</p><p className="mt-1 text-[8px] leading-4 text-slate-500">Management / support</p></div></div></div>
            <div onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer} className="hero-panel hero-database absolute bottom-[13%] left-0 z-20 w-[54%] rounded-xl border border-violet-200/[0.16] bg-[#101024]/95 p-3 shadow-[0_20px_58px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:bottom-[12%] sm:left-[2%] sm:w-[48%] sm:p-4">
              <div className="mb-3 flex items-center justify-between"><span className="flex items-center gap-2 text-[10px] font-medium text-slate-200 sm:text-xs"><Database size={13} className="text-violet-200" /> MongoDB</span><span className="font-mono text-[8px] text-slate-500">DATA MODEL</span></div><div className="space-y-2 font-mono text-[8px] sm:text-[9px]"><div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/10 px-2.5 py-2"><span className="text-slate-300">users</span><span className="text-violet-200">_id · profile</span></div><div className="mx-auto h-2 w-px bg-violet-300/50" /><div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/10 px-2.5 py-2"><span className="text-slate-300">projects</span><span className="text-cyan-200">ownerId · data</span></div></div>
            </div>
            <a onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer} href={featuredRepo?.url ?? portfolio.githubUrl} target="_blank" rel="noreferrer" className="hero-panel hero-github absolute bottom-[3%] right-0 z-30 block w-[55%] rounded-xl border border-white/[0.14] bg-[#111522]/95 p-3 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-100/30 sm:bottom-[3%] sm:right-[1%] sm:w-[47%] sm:p-4">
              <div className="flex items-start justify-between gap-2"><div><p className="mb-2 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500"><Github size={11} /> Featured repository</p><p className="truncate text-[11px] font-semibold text-white sm:text-sm">{featuredRepo?.name ?? "GitHub projects"}</p></div><ExternalLink size={13} className="mt-1 shrink-0 text-slate-500" /></div><p className="mt-2 line-clamp-2 text-[9px] leading-4 text-slate-400 sm:text-[10px]">{featuredRepoDescription}</p><div className="mt-3 flex items-center gap-2 border-t border-white/[0.08] pt-2.5 font-mono text-[8px] text-slate-500"><span className="size-1.5 rounded-full bg-cyan-300" />{featuredRepo?.primaryLanguage ?? "JavaScript"}<span className="ml-auto">GitHub <ArrowRight size={10} className="ml-1 inline" /></span></div>
            </a>
            <div onPointerMove={trackPanelPointer} onPointerLeave={resetPanelPointer} className="hero-panel hero-role absolute -right-1 top-[4%] z-20 hidden w-[43%] rounded-xl border border-sky-200/[0.16] bg-[#101526]/95 p-3 text-[9px] text-slate-300 shadow-xl backdrop-blur-xl sm:block sm:right-0 sm:top-[1%]"><p className="mb-2 flex items-center gap-1.5 font-mono uppercase tracking-[0.12em] text-sky-200"><SiReact size={12} /> React component</p><div className="grid min-h-[6.5em] grid-cols-[1.5rem_1fr] gap-2 font-mono leading-[1.3]"><LiveCode code={liveReactCode} lineCount={5} /></div></div>
            <div className="hero-tech-icon hero-tech-react absolute left-[53%] top-[42%] z-30 hidden size-10 items-center justify-center rounded-2xl border border-sky-200/20 bg-[#101b2a]/90 text-sky-200 shadow-[0_12px_34px_rgba(0,0,0,0.35)] sm:flex"><SiReact size={20} /></div>
            <div className="hero-tech-icon hero-tech-node absolute bottom-[31%] right-[2%] z-30 hidden size-10 items-center justify-center rounded-2xl border border-emerald-200/20 bg-[#101b2a]/90 text-emerald-200 shadow-[0_12px_34px_rgba(0,0,0,0.35)] sm:flex"><SiNodedotjs size={19} /></div>
            <div className="hero-tech-icon hero-tech-mongo absolute bottom-[25%] left-[49%] z-30 hidden size-9 items-center justify-center rounded-xl border border-violet-200/20 bg-[#151326]/90 text-violet-200 shadow-[0_12px_34px_rgba(0,0,0,0.35)] sm:flex"><SiMongodb size={17} /></div>
            <div className="hero-tech-icon hero-tech-express absolute right-[13%] top-[62%] z-30 hidden size-8 items-center justify-center rounded-xl border border-white/10 bg-[#141624]/90 text-white shadow-[0_12px_34px_rgba(0,0,0,0.35)] sm:flex"><SiExpress size={15} /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function AboutSection({ avatarUrl }: { avatarUrl: string }) {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <Reveal>
          <div className="max-w-sm">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image src={avatarUrl} alt={`${portfolio.fullName} portrait`} fill sizes="(max-width: 768px) 320px, 420px" className="object-cover object-center grayscale-[18%]" />
            </div>
            <div className="mt-4 flex items-center justify-between border-b border-border pb-3">
              <p className="font-heading text-sm font-semibold text-foreground">{portfolio.fullName}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Full Stack / MERN</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{portfolio.personalInterests}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">A little about how I build</p>
            <h2 className="mt-5 max-w-2xl font-heading text-3xl font-medium leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">From the first click to the last query.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{portfolio.shortBio} {portfolio.about}</p>

            <Button asChild variant="outline" className="mt-6 rounded-full px-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_8px_24px_rgba(34,211,238,0.16)]">
              <a href={portfolio.resumePath} download>
                <Download size={16} /> Download CV
              </a>
            </Button>

            <div className="mt-10 border-t border-border">
              {portfolio.services.map((service, index) => (
                <div key={service.title} className="grid gap-2 border-b border-border py-4 sm:grid-cols-[3rem_0.7fr_1fr] sm:items-baseline">
                  <span className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading text-sm font-medium text-foreground">{service.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const rows = [
    { title: "Frontend", note: "Interfaces and product experience", skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"] },
    { title: "Backend & data", note: "Application logic and persistence", skills: ["Node.js", "Express.js", "MongoDB"] },
  ];

  return (
    <section id="skills" className="section-shell">
      <div className="space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="A stack for the whole product."
            description="The tools I use across interfaces, application logic, APIs, and data."
          />
        </Reveal>

        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={row.title} className="space-y-3">
              <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
                <div><h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">{row.title}</h3><p className="mt-1 text-sm text-muted-foreground">{row.note}</p></div>
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:block">{rowIndex === 0 ? "01 / Client" : "02 / Server"}</span>
              </div>
              <div className="skill-marquee rounded-2xl py-1">
                <div className={`skill-marquee-track gap-0 ${rowIndex % 2 ? "skill-marquee-track-reverse" : ""}`}>
                  {[0, 1, 2, 3].map((copy) => (
                    <div key={copy} aria-hidden={copy > 0} className="flex shrink-0 gap-3 pr-3">
                      {row.skills.map((name) => {
                        const skill = portfolio.skills.find((item) => item.name === name);
                        if (!skill) return null;
                        const skillMeta = skillIcons[skill.icon];
                        const SkillIcon = skillMeta.icon;
                        return (
                          <div key={skill.name} title={skill.name} style={{ "--skill-border-hover": skillMeta.accent, "--skill-surface-hover": `color-mix(in srgb, ${skillMeta.accent} 12%, var(--card))`, "--skill-glow": `color-mix(in srgb, ${skillMeta.accent} 18%, transparent)` } as CSSProperties & { "--skill-border-hover": string; "--skill-surface-hover": string; "--skill-glow": string }} className={`group flex min-w-[10.5rem] items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3.5 text-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${skillMeta.hover}`}>
                            <span className={`skill-icon flex size-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${skillMeta.surface}`}><SkillIcon className={`${skill.icon === "javascript" ? "size-7" : "size-6"} transition-colors ${skillMeta.color}`} aria-hidden="true" /></span>
                            <span className="font-heading text-sm font-semibold tracking-tight">{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Workflow</span>
            {portfolio.skills.filter((skill) => skill.icon === "github").map((skill) => {
              const SkillIcon = skillIcons[skill.icon].icon;
              const meta = skillIcons[skill.icon];
              return <span key={skill.name} className={`group inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 text-xs font-medium text-foreground transition hover:border-transparent ${meta.hover}`}><SkillIcon className={`size-4 ${meta.color} ${meta.hover}`} />{skill.name}</span>;
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell pb-12">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="A path built by making and shipping real work."
            description="Selected milestones from my development journey and the projects I have brought online."
          />
        </Reveal>
        <div className="border-t border-border">
          {portfolio.journey.map((item, index) => (
            <Reveal key={`${item.year}-${item.title}`}>
              <article className="grid gap-2 border-b border-border py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
                <p className="font-mono text-xs text-primary">{item.year} <span className="ml-1 text-muted-foreground">/ {String(index + 1).padStart(2, "0")}</span></p>
                <div>
                  <h3 className="font-heading text-base font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section-shell pb-20 pt-12 sm:pb-28">
      <Reveal>
        <div className="border-t border-border pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Have something in mind?</p>
          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-2xl font-heading text-4xl font-medium tracking-[-0.05em] text-foreground sm:text-6xl">Let&apos;s make it work.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <Button asChild size="lg" className="h-11 rounded-lg bg-primary px-5 text-primary-foreground hover:bg-primary/90"><a href={`mailto:${portfolio.email}`}><Mail size={16} /> Email me</a></Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

