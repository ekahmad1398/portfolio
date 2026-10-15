import { Github } from "lucide-react";

import type { SocialLink } from "@/data/portfolio";

type SiteFooterProps = {
  name: string;
  role: string;
  githubUsername: string;
  socials: SocialLink[];
};

export function SiteFooter({ name, role, githubUsername, socials }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();
  const githubLink = socials.find((social) =>
    social.label.toLowerCase().includes("github")
  );

  return (
    <footer className="mt-10 border-t border-[color:var(--border-soft)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-lg font-semibold text-[color:var(--text-main)]">
            {name}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--text-muted)]">{role}</p>
        </div>

        <div className="flex items-center gap-4">
          {githubLink ? (
            <a
              href={githubLink.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${githubUsername}'s GitHub profile`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-md"
            >
              <Github size={16} />
              <span>GitHub</span>
              <span className="border-l border-border pl-2 text-muted-foreground">@{githubUsername}</span>
            </a>
          ) : null}

          <p className="text-sm text-[color:var(--text-soft)]">&copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
