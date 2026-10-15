import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { portfolio } from "@/data/portfolio";
import { getSiteUrl, getSiteUrlObject } from "@/lib/site-url";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b13" },
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
    "Full stack developer portfolio for Ahmad Shah Gouhari, showcasing MERN applications, React interfaces, Node.js APIs, and MongoDB.",
  keywords: [
    "Ahmad Shah Gouhari",
    "Full Stack Developer",
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
      "Full stack portfolio featuring MERN development, deployed projects, and end-to-end web applications.",
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
      "Full stack portfolio featuring MERN development, deployed projects, and end-to-end web applications.",
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
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
