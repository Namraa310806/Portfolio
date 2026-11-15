import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { buildData, isExcluded } from "./pr-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// In CI (GitHub Actions) GH_TOKEN/GITHUB_TOKEN is set and we call the REST API
// directly. Locally we fall back to the authenticated `gh` CLI.
const TOKEN = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;

async function apiGet(path) {
  const endpoint = path.startsWith("/") ? path : `/${path}`;
  if (TOKEN) {
    const res = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio-fetch-prs",
      },
    });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    return res.json();
  }
  const out = execSync(`gh api "${endpoint}"`, { encoding: "utf8" });
  return JSON.parse(out);
}

async function fetchAllMergedPRs() {
  const perPage = 100;
  let page = 1;
  const items = [];

  while (true) {
    const path = `search/issues?q=author:Namraa310806+type:pr+is:merged&per_page=${perPage}&page=${page}`;
    const data = await apiGet(path);
    items.push(...data.items);
    if (items.length >= data.total_count || data.items.length < perPage) break;
    page += 1;
  }

  return items;
}

const items = await fetchAllMergedPRs();

const raw = items
  .map((item) => {
    const match = item.repository_url.match(/repos\/([^/]+)\/([^/]+)/);
    const owner = match?.[1] ?? "";
    const name = match?.[2] ?? item.repository_url.split("/").pop() ?? "";
    const nameWithOwner = `${owner}/${name}`;

    return {
      number: item.number,
      title: item.title,
      url: item.html_url,
      mergedAt: item.closed_at ?? null,
      repository: { name, nameWithOwner },
    };
  })
  .filter((pr) => !isExcluded(pr.repository.nameWithOwner));

const { contributions, meta } = buildData(raw);

writeFileSync(
  join(__dirname, "../src/data/merged-prs.json"),
  JSON.stringify(raw, null, 2),
);

writeFileSync(
  join(__dirname, "../src/data/contributions.json"),
  JSON.stringify(contributions, null, 2),
);

writeFileSync(
  join(__dirname, "../src/data/contributions-meta.json"),
  JSON.stringify(meta, null, 2),
);

console.log(
  `Generated ${contributions.length} PRs across ${meta.totalRepositories} repositories (${meta.flagshipRepos.length} flagship, ${meta.communityRepos.length} community)`,
);
