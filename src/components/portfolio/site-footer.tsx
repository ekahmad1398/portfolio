import { Github } from "lucide-react";

import type { SocialLink } from "@/data/portfolio";

type SiteFooterProps = {
  name: string;
  role: string;
  socials: SocialLink[];
};

export function SiteFooter({ name, role, socials }: SiteFooterProps) {
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
              className="secondary-button px-4 py-2.5"
            >
              <Github size={16} />
              GitHub
            </a>
          ) : null}

          <p className="text-sm text-[color:var(--text-soft)]">&copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
