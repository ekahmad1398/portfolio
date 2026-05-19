import { portfolio } from "@/data/portfolio";
import type { PortfolioGithubData } from "@/lib/github";
import { getSiteUrl } from "@/lib/site-url";

type PortfolioStructuredDataProps = {
  githubData: PortfolioGithubData;
};

export function PortfolioStructuredData({
  githubData,
}: PortfolioStructuredDataProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.fullName,
    url: siteUrl,
    image: githubData.profile.avatarUrl,
    jobTitle: portfolio.role,
    email: portfolio.email,
    sameAs: portfolio.socialLinks.map((item) => item.href),
    knowsAbout: portfolio.techStack,
    worksFor: {
      "@type": "Organization",
      name: "Independent",
    },
    mainEntityOfPage: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
