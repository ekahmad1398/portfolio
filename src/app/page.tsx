import { FeaturedProjectsSection } from "@/components/portfolio/project-showcase";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  SkillsSection,
} from "@/components/portfolio/sections/home-sections";
import { portfolio } from "@/data/portfolio";
import { getPortfolioGithubData } from "@/lib/github";

export default async function HomePage() {
  const githubData = await getPortfolioGithubData();
  const availableRepos = githubData.repos;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="relative isolate min-h-screen">
        <div aria-hidden="true" className="site-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="site-grid absolute inset-0" />
          <div className="site-wave site-wave-one absolute" />
          <div className="site-wave site-wave-two absolute" />
          <div className="site-wave site-wave-three absolute" />
          <div className="site-glow site-glow-one absolute" />
          <div className="site-glow site-glow-two absolute" />
        </div>

        <SiteHeader
          sections={portfolio.sectionLinks}
          email={portfolio.email}
        />

        <main id="main-content" className="relative z-10">
          <HeroSection githubData={githubData} />
          <AboutSection avatarUrl="/naruto-profile.jpeg" />
          <SkillsSection />
          {availableRepos.length ? <FeaturedProjectsSection repos={availableRepos} /> : null}
          <ExperienceSection />
          <ContactSection />
        </main>

        <div className="relative z-10">
          <SiteFooter
            name={portfolio.fullName}
            role={portfolio.role}
            githubUsername={portfolio.githubUsername}
            socials={portfolio.socialLinks}
          />
        </div>
      </div>
    </>
  );
}
