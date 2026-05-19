import "server-only";

import { portfolio } from "@/data/portfolio";

type GithubProfileResponse = {
  login: string;
  name: string | null;
  html_url: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

type GithubRepoResponse = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  languages_url: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  updated_at: string;
  size: number;
};

type GithubEventResponse = {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload?: {
    ref_type?: string;
    commits?: Array<{ sha: string }>;
  };
};

export type GithubRepoCard = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string;
  deploymentHost: string;
  stars: number;
  primaryLanguage: string;
  languages: string[];
  topics: string[];
  pushedAt: string;
  updatedAt: string;
  size: number;
  score: number;
};

export type GithubActivityItem = {
  id: string;
  title: string;
  repoName: string;
  createdAt: string;
};

export type PortfolioGithubData = {
  profile: {
    login: string;
    name: string;
    url: string;
    avatarUrl: string;
    bio: string;
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
    updatedAt: string;
  };
  repos: GithubRepoCard[];
  featuredRepos: GithubRepoCard[];
  liveRepos: GithubRepoCard[];
  activity: GithubActivityItem[];
};

const GITHUB_API_BASE = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60 * 6;

async function fetchGithubJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": `${portfolio.githubUsername}-portfolio`,
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function formatEventTitle(event: GithubEventResponse) {
  if (event.type === "PushEvent") {
    const commitCount = event.payload?.commits?.length ?? 1;
    return `${commitCount} commit${commitCount > 1 ? "s" : ""} pushed`;
  }

  if (event.type === "CreateEvent") {
    const refType = event.payload?.ref_type ?? "project";
    return `Created ${refType}`;
  }

  if (event.type === "WatchEvent") {
    return "Starred a repository";
  }

  return event.type.replace(/Event$/, "");
}

function scoreRepo(repo: GithubRepoCard) {
  let score = 0;

  if (portfolio.featuredRepoNames.some((name) => name === repo.name)) {
    score += 12;
  }

  if (repo.homepage) {
    score += 8;
  }

  if (repo.description.trim().length > 0) {
    score += 5;
  }

  if (repo.languages.length > 1) {
    score += 3;
  }

  score += Math.min(repo.stars * 2, 10);
  score += Math.min(repo.size / 750, 12);

  const recencyDays =
    (Date.now() - new Date(repo.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
  score += Math.max(0, 8 - recencyDays / 45);

  return Number(score.toFixed(2));
}

function isPolishedRepo(repo: GithubRepoCard) {
  const searchableText = `${repo.name} ${repo.description}`.toLowerCase();

  return (
    repo.size >= portfolio.qualityThreshold &&
    !/test|practice|demo only|unfinished/.test(searchableText)
  );
}

function normalizeRepo(
  repo: GithubRepoResponse,
  languagesMap: Record<string, number>
): GithubRepoCard {
  const languages = Object.keys(languagesMap);
  const primaryLanguage = repo.language ?? languages[0] ?? "JavaScript";
  const homepage = repo.homepage ?? "";
  let deploymentHost = "";

  if (homepage) {
    try {
      const parsed = new URL(homepage);
      deploymentHost = parsed.hostname.replace(/^www\./, "");
    } catch {
      deploymentHost = "";
    }
  }

  const normalized: GithubRepoCard = {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? "No repository description was provided.",
    url: repo.html_url,
    homepage,
    deploymentHost,
    stars: repo.stargazers_count,
    primaryLanguage,
    languages: languages.length ? languages : [primaryLanguage],
    topics: repo.topics ?? [],
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    size: repo.size,
    score: 0,
  };

  return {
    ...normalized,
    score: scoreRepo(normalized),
  };
}

export async function getPortfolioGithubData(): Promise<PortfolioGithubData> {
  try {
    const [profileResponse, repoResponse, activityResponse] = await Promise.all([
      fetchGithubJson<GithubProfileResponse>(
        `${GITHUB_API_BASE}/users/${portfolio.githubUsername}`
      ),
      fetchGithubJson<GithubRepoResponse[]>(
        `${GITHUB_API_BASE}/users/${portfolio.githubUsername}/repos?per_page=100&sort=updated`
      ),
      fetchGithubJson<GithubEventResponse[]>(
        `${GITHUB_API_BASE}/users/${portfolio.githubUsername}/events/public?per_page=6`
      ),
    ]);

    const repositories = await Promise.all(
      repoResponse
        .filter((repo) => !repo.fork && !repo.archived)
        .map(async (repo) => {
          const languagesMap = await fetchGithubJson<Record<string, number>>(
            repo.languages_url
          );

          return normalizeRepo(repo, languagesMap);
        })
    );

    const polishedRepos = repositories
      .filter(isPolishedRepo)
      .sort((left, right) => right.score - left.score);

    const featuredRepos = polishedRepos.slice(0, 3);
    const liveRepos = repositories
      .filter((repo) => repo.homepage)
      .sort(
        (left, right) =>
          new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
      )
      .slice(0, 6);
    const activity = activityResponse.slice(0, 4).map((event) => ({
      id: event.id,
      title: formatEventTitle(event),
      repoName: event.repo.name.replace(`${portfolio.githubUsername}/`, ""),
      createdAt: event.created_at,
    }));

    return {
      profile: {
        login: profileResponse.login,
        name: profileResponse.name ?? portfolio.fullName,
        url: profileResponse.html_url,
        avatarUrl: profileResponse.avatar_url,
        bio:
          profileResponse.bio ??
          "Frontend-focused developer building polished web experiences.",
        publicRepos: profileResponse.public_repos,
        followers: profileResponse.followers,
        following: profileResponse.following,
        createdAt: profileResponse.created_at,
        updatedAt: profileResponse.updated_at,
      },
      repos: polishedRepos,
      featuredRepos,
      liveRepos,
      activity,
    };
  } catch {
    return {
      profile: {
        login: portfolio.githubUsername,
        name: portfolio.fullName,
        url: portfolio.githubUrl,
        avatarUrl: portfolio.avatarUrl,
        bio: "Frontend-focused developer building polished web experiences.",
        publicRepos: 0,
        followers: 0,
        following: 0,
        createdAt: "2023-06-27T13:46:23Z",
        updatedAt: new Date().toISOString(),
      },
      repos: [],
      featuredRepos: [],
      liveRepos: [],
      activity: [],
    };
  }
}
