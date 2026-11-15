import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

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

function categorize(title) {
  const t = title.toLowerCase();
  if (
    /security|auth|jwt|csrf|cors|ssrf|rate.?limit|honeypot|secret|api.?key|fail.?closed|cookie|deserial/.test(
      t,
    )
  )
    return "Security";
  if (
    /concurr|race|sync|async|lifecycle|runtime state|inference concurrency|model loading race/.test(
      t,
    )
  )
    return "Concurrency";
  if (
    /perf|performance|memory|n\+1|query|stream|chunked|upload|buffering/.test(t)
  )
    return "Performance";
  if (/ai|rag|model|inference|llm|chunk|semantic|faiss|sse streaming/.test(t))
    return "AI";
  if (/aws|lambda|cloudinary|docker|cloud/.test(t)) return "Cloud";
  return "Backend";
}

const DISPLAY_NAMES = {
  "AegisGraph-Sentinel-2.0": "AegisGraph",
  "openfoodfacts-explorer": "Open Food Facts",
};

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

const contributions = items.map((item) => {
  const match = item.repository_url.match(/repos\/([^/]+)\/([^/]+)/);
  const owner = match?.[1] ?? "";
  const name = match?.[2] ?? item.repository_url.split("/").pop() ?? "";
  const nameWithOwner = `${owner}/${name}`;

  return {
    id: `pr-${name}-${item.number}`,
    number: item.number,
    title: item.title,
    repository: name,
    repositoryOwner: nameWithOwner,
    repositoryUrl: `https://github.com/${nameWithOwner}`,
    url: item.html_url,
    status: "Merged",
    category: categorize(item.title),
  };
});

const repoCounts = {};
for (const pr of contributions) {
  repoCounts[pr.repository] = (repoCounts[pr.repository] ?? 0) + 1;
}

const productionRepos = Object.entries(repoCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({
    name,
    displayName: DISPLAY_NAMES[name] ?? name,
    repositoryUrl: contributions.find((p) => p.repository === name).repositoryUrl,
    prCount: count,
  }));

const meta = {
  totalPRs: contributions.length,
  totalRepositories: productionRepos.length,
  productionRepos,
};

writeFileSync(
  join(__dirname, "../src/data/merged-prs.json"),
  JSON.stringify(
    contributions.map((c) => ({
      number: c.number,
      repository: { name: c.repository, nameWithOwner: c.repositoryOwner },
      title: c.title,
      url: c.url,
    })),
    null,
    2,
  ),
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
  `Generated ${contributions.length} PRs across ${productionRepos.length} repositories`,
);
