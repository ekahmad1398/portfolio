import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { portfolio } from "@/data/portfolio";
import { getSiteUrl, getSiteUrlObject } from "@/lib/site-url";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fbff" },
    { media: "(prefers-color-scheme: dark)", color: "#08111f" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: `${portfolio.fullName} | ${portfolio.role}`,
    template: `%s | ${portfolio.fullName}`,
  },
  description:
    "Frontend developer portfolio for Ahmad Shah Gouhari with clean layouts, human-centered copy, and polished React and Next.js UI.",
  keywords: [
    "Ahmad Shah Gouhari",
    "Frontend Developer",
    "React Portfolio",
    "Next.js Portfolio",
    "JavaScript Developer",
    "Tailwind CSS",
  ],
  authors: [
    {
      name: portfolio.fullName,
      url: portfolio.githubUrl,
    },
  ],
  openGraph: {
    title: `${portfolio.fullName} | ${portfolio.role}`,
    description:
      "Modern frontend portfolio with GitHub-powered projects, deployed work, and a cleaner light and dark experience.",
    url: siteUrl,
    siteName: `${portfolio.fullName} Portfolio`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${portfolio.fullName} portfolio preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.fullName} | ${portfolio.role}`,
    description:
      "Modern frontend portfolio with GitHub-powered projects, deployed work, and a cleaner light and dark experience.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${sora.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
