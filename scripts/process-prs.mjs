import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  readFileSync(join(__dirname, "../src/data/merged-prs.json"), "utf8"),
);

function categorize(title) {
  const t = title.toLowerCase();
  if (
    /security|auth|jwt|csrf|cors|ssrf|rate.?limit|honeypot|secret|api.?key|fail.?closed|ssrf|cookie|deserial/.test(
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

const contributions = raw.map((pr) => ({
  id: `pr-${pr.repository.name}-${pr.number}`,
  number: pr.number,
  title: pr.title,
  repository: pr.repository.name,
  repositoryOwner: pr.repository.nameWithOwner,
  repositoryUrl: `https://github.com/${pr.repository.nameWithOwner}`,
  url: pr.url,
  status: "Merged",
  category: categorize(pr.title),
}));

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
  join(__dirname, "../src/data/contributions.json"),
  JSON.stringify(contributions, null, 2),
);
writeFileSync(
  join(__dirname, "../src/data/contributions-meta.json"),
  JSON.stringify(meta, null, 2),
);

console.log(`Processed ${contributions.length} PRs across ${productionRepos.length} repositories`);
