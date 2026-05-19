export type SectionLink = {
  id: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type SkillCard = {
  name: string;
  description: string;
  proficiency: number;
  icon: "html" | "css" | "javascript" | "react" | "next" | "tailwind" | "github";
};

export type ServiceCard = {
  title: string;
  description: string;
};

export type JourneyItem = {
  year: string;
  title: string;
  description: string;
};

export const portfolio = {
  displayName: "Ahmad Shah",
  fullName: "Ahmad Shah Gouhari",
  role: "Frontend Developer",
  heroTitle: "I build clean websites that feel modern, easy to use, and ready for real people.",
  heroDescription:
    "I focus on frontend work with HTML, CSS, JavaScript, React, and Next.js. I enjoy taking a simple idea and turning it into a website that feels clear, responsive, and pleasant to use.",
  shortBio:
    "I am a frontend developer who likes building websites that feel clean, friendly, and reliable on both desktop and mobile.",
  about:
    "I started this portfolio as a simple place to show my work, but over time I wanted it to represent me better. Now I use it to share projects in a clearer way and show how I think about layout, detail, and usability.",
  personalInterests:
    "Outside coding, I enjoy games, movies, and noticing small design details that make websites feel more human and memorable.",
  githubUsername: "ekahmad1398",
  githubUrl: "https://github.com/ekahmad1398",
  siteUrl: "https://portfolio-phi-olive-94.vercel.app",
  avatarUrl: "https://avatars.githubusercontent.com/u/137905017?v=4",
  email: "a78250006437@gmail.com",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/ekahmad1398",
    },
  ] satisfies SocialLink[],
  sectionLinks: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ] satisfies SectionLink[],
  strengths: [
    "Responsive layouts that stay clean on every screen",
    "React and Next.js pages with clear structure",
    "Tailwind styling with organized spacing and rhythm",
    "Interfaces that feel calm, readable, and intentional",
    "Thoughtful details that help a website feel finished",
    "Frontend work prepared for real deployment",
  ],
  skills: [
    {
      name: "HTML5",
      description: "Semantic page structure and clean content foundations for modern interfaces.",
      proficiency: 95,
      icon: "html",
    },
    {
      name: "CSS3",
      description: "Responsive layout systems, visual rhythm, and precise styling details.",
      proficiency: 92,
      icon: "css",
    },
    {
      name: "JavaScript",
      description: "Interactive behavior, reusable logic, and richer user-facing frontend features.",
      proficiency: 88,
      icon: "javascript",
    },
    {
      name: "React",
      description: "Component-driven UI development with scalable, reusable interface patterns.",
      proficiency: 90,
      icon: "react",
    },
    {
      name: "Next.js",
      description: "App Router structure, deployment-ready pages, and modern React workflows.",
      proficiency: 84,
      icon: "next",
    },
    {
      name: "Tailwind CSS",
      description: "Fast styling systems for expressive interfaces with clean responsive behavior.",
      proficiency: 91,
      icon: "tailwind",
    },
    {
      name: "GitHub",
      description: "Code publishing, version control, and public project presentation.",
      proficiency: 82,
      icon: "github",
    },
  ] satisfies SkillCard[],
  techStack: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Responsive Design",
    "Accessibility",
    "Vercel",
  ],
  services: [
    {
      title: "Frontend Development",
      description:
        "Landing pages, portfolios, and modern websites built with a React and Next.js workflow.",
    },
    {
      title: "UI Implementation",
      description:
        "Design-to-code execution with attention to typography, visual fidelity, responsive behavior, and interaction polish.",
    },
    {
      title: "Portfolio and Brand Sites",
      description:
        "Personal brand and showcase websites that present projects clearly and feel premium across desktop and mobile.",
    },
  ] satisfies ServiceCard[],
  journey: [
    {
      year: "2023",
      title: "Started publishing on GitHub",
      description:
        "Public GitHub activity began in June 2023, creating the base for a visible portfolio and project history.",
    },
    {
      year: "2026",
      title: "Built and shipped portfolio work",
      description:
        "Released personal web projects and iterated on a public portfolio presence with deployed frontend work.",
    },
    {
      year: "2026",
      title: "Launched Rumi International School website",
      description:
        "Published a live website for Rumi International School and used it as a stronger showcase project.",
    },
  ] satisfies JourneyItem[],
  stats: [
    { value: "7", label: "Core frontend skills" },
    { value: "2023", label: "GitHub since" },
    { value: "Next.js", label: "Primary framework" },
  ],
  featuredRepoNames: ["Rumiint", "portfolio"],
  qualityThreshold: 500,
} as const;

export type PortfolioData = typeof portfolio;
