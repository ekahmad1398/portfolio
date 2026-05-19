import { FeaturedProjectsSection } from "@/components/portfolio/project-showcase";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  SkillsSection,
} from "@/components/portfolio/sections/home-sections";
import { portfolio } from "@/data/portfolio";
import { getPortfolioGithubData } from "@/lib/github";

export default async function HomePage() {
  const githubData = await getPortfolioGithubData();
  const availableRepos = githubData.liveRepos.length
    ? githubData.liveRepos
    : githubData.featuredRepos.length
      ? githubData.featuredRepos
    : githubData.repos.slice(0, 3);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.22),transparent_58%)]" />
        <div className="pointer-events-none absolute right-0 top-[30rem] -z-10 h-[22rem] w-[22rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-[70rem] -z-10 h-[20rem] w-[20rem] rounded-full bg-blue-500/10 blur-3xl" />

        <SiteHeader
          name={portfolio.displayName}
          sections={portfolio.sectionLinks}
          email={portfolio.email}
        />

        <main id="main-content" className="relative z-10">
          <HeroSection githubData={githubData} />
          <AboutSection avatarUrl={githubData.profile.avatarUrl} />
          <SkillsSection />
          {availableRepos.length ? <FeaturedProjectsSection repos={availableRepos} /> : null}
          <ContactSection />
        </main>

        <SiteFooter
          name={portfolio.fullName}
          role={portfolio.role}
          socials={portfolio.socialLinks}
        />
      </div>
    </>
  );
}
