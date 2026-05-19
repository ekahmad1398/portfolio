import { portfolio } from "@/data/portfolio";

const SITE_URL_CANDIDATES = [
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
  portfolio.siteUrl,
];

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  for (const candidate of SITE_URL_CANDIDATES) {
    if (!candidate) {
      continue;
    }

    const normalized = normalizeSiteUrl(candidate);

    if (normalized) {
      return normalized;
    }
  }

  return portfolio.siteUrl;
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl());
}
