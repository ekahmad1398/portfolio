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
  category: string;
  proficiency: number;
  icon: "html" | "css" | "javascript" | "typescript" | "react" | "next" | "tailwind" | "github" | "mongodb" | "express" | "node";
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
  role: "Full Stack Developer",
  heroTitle: "Ideas made into digital products.",
  heroDescription:
    "I build end-to-end web applications with MongoDB, Express, React, and Node.js, connecting polished interfaces to reliable backend systems.",
  shortBio:
    "My work spans the MERN stack, with the interface, API, and data layer designed as parts of one product.",
  about:
    "I start with what a product needs to do, then shape its interface, define the API, and connect the data flow that makes it work in practice.",
  personalInterests:
    "Outside coding, I enjoy games, movies, and noticing small design details that make websites feel more human and memorable.",
  githubUsername: "ekahmad1398",
  githubUrl: "https://github.com/ekahmad1398",
  siteUrl: "https://portfolio-phi-olive-94.vercel.app",
  avatarUrl: "https://avatars.githubusercontent.com/u/137905017?v=4",
  resumePath: "/ahmad-shah-gouhari-cv.pdf",
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
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ] satisfies SectionLink[],
  strengths: [
    "Full stack applications from UI to database",
    "React interfaces with reusable components",
    "Node.js and Express REST APIs",
    "MongoDB data models and persistence",
    "Authentication, validation, and error handling",
    "Responsive products ready for deployment",
  ],
  skills: [
    { name: "MongoDB", category: "01 / DATA", description: "Document database design, data modeling, and persistence for real application workflows.", proficiency: 82, icon: "mongodb" },
    { name: "Express.js", category: "02 / API", description: "REST endpoints, middleware, validation, and clear server-side routing.", proficiency: 80, icon: "express" },
    { name: "React", category: "03 / INTERFACE", description: "Reusable components and interactive interfaces built around real product needs.", proficiency: 90, icon: "react" },
    { name: "Node.js", category: "04 / RUNTIME", description: "JavaScript runtime for API development, application logic, and integrations.", proficiency: 82, icon: "node" },
    { name: "JavaScript", category: "LANGUAGE", description: "Modern JavaScript across the browser and server, with practical reusable patterns.", proficiency: 88, icon: "javascript" },
    { name: "TypeScript", category: "LANGUAGE", description: "Typed application code used across full-stack projects and the personal portfolio.", proficiency: 84, icon: "typescript" },
    { name: "HTML", category: "FOUNDATION", description: "Semantic page structure for accessible, well-organized web experiences.", proficiency: 86, icon: "html" },
    { name: "CSS", category: "STYLING", description: "Responsive layouts, visual styling, and polished interface details.", proficiency: 86, icon: "css" },
    { name: "Next.js", category: "FRAMEWORK", description: "Production-ready React applications, routing, rendering, and deployment workflows.", proficiency: 84, icon: "next" },
    { name: "Tailwind CSS", category: "STYLING", description: "Responsive interfaces with consistent spacing, typography, and visual detail.", proficiency: 91, icon: "tailwind" },
    { name: "Git & GitHub", category: "WORKFLOW", description: "Version control, collaboration, and maintaining a clear project history.", proficiency: 82, icon: "github" },
  ] satisfies SkillCard[],
  techStack: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "TypeScript", "HTML", "CSS", "Next.js", "Tailwind CSS", "REST APIs", "Git", "Vercel"],
  services: [
    {
      title: "Full Stack Development",
      description:
        "End-to-end web applications with React interfaces, Express APIs, and MongoDB data.",
    },
    {
      title: "Backend & API Development",
      description:
        "REST API design, server-side logic, authentication, and database integration with Node.js and Express.",
    },
    {
      title: "Product UI & Integration",
      description:
        "Responsive React experiences connected to real data and built to feel fast, clear, and polished.",
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
        "Released personal web projects and grew a full stack development practice.",
    },
    {
      year: "2026",
      title: "Launched Rumi International School website",
      description:
        "Published a live website for Rumi International School and used it as a stronger showcase project.",
    },
  ] satisfies JourneyItem[],
  stats: [
    { value: "0", label: "Public repositories" },
    { value: "2023", label: "GitHub since" },
    { value: "Next.js", label: "Primary framework" },
  ],
  featuredRepoNames: ["Rumiint", "portfolio"],
  qualityThreshold: 500,
} as const;

export type PortfolioData = typeof portfolio;
