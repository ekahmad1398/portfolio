import { portfolio } from "@/data/portfolio";
import type { PortfolioGithubData } from "@/lib/github";

type PortfolioStructuredDataProps = {
  githubData: PortfolioGithubData;
};

export function PortfolioStructuredData({
  githubData,
}: PortfolioStructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.fullName,
    url: portfolio.siteUrl,
    image: githubData.profile.avatarUrl,
    jobTitle: portfolio.role,
    email: portfolio.email,
    sameAs: portfolio.socialLinks.map((item) => item.href),
    knowsAbout: portfolio.techStack,
    worksFor: {
      "@type": "Organization",
      name: "Independent",
    },
    mainEntityOfPage: portfolio.siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
