// Shared shaping logic for merged-PR data. Used by fetch-prs.mjs (live GitHub
// API) and process-prs.mjs (re-run from merged-prs.json) so both always produce
// the same schema the site expects.

export function categorize(title) {
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

// Repos treated as flagship upstream work. Keyed by "owner/name".
export const FLAGSHIP_ORGS = {
  "celery/celery": { org: "celery" },
  "django/django": { org: "django" },
  "microsoft/agent-framework": { org: "microsoft" },
  "openfoodfacts/openfoodfacts-explorer": { org: "off" },
};

// Own repos and hackathon/assessment repos are not "open source contributions".
export const EXCLUDE_OWNERS = new Set(["Namraa310806"]);
export const EXCLUDE_REPOSITORIES = new Set([
  "Animesh26526/ODOO-Hackathon-Virtual-Round",
  "bettrhq-assessments/flask-react-assessment-Namraa310806",
  "cfgmumbai26/Team-8",
]);

export const DISPLAY_NAMES = {
  celery: "Celery",
  django: "Django",
  "agent-framework": "Microsoft Agent Framework",
  "openfoodfacts-explorer": "Open Food Facts",
  "AegisGraph-Sentinel-2.0": "AegisGraph",
  "pdf-qa-bot": "PDF QA Bot",
  "pathfinder-ai": "Pathfinder AI",
};

export function isExcluded(nameWithOwner) {
  const [owner] = nameWithOwner.split("/");
  return EXCLUDE_OWNERS.has(owner) || EXCLUDE_REPOSITORIES.has(nameWithOwner);
}

/**
 * @param {Array<{number:number,title:string,url:string,
 *   repository:{name:string,nameWithOwner:string},mergedAt?:string|null}>} raw
 */
export function buildData(raw) {
  const contributions = raw.map((pr) => {
    const flagship = FLAGSHIP_ORGS[pr.repository.nameWithOwner];
    return {
      id: `pr-${pr.repository.name}-${pr.number}`,
      number: pr.number,
      title: pr.title,
      repository: pr.repository.name,
      repositoryOwner: pr.repository.nameWithOwner,
      repositoryUrl: `https://github.com/${pr.repository.nameWithOwner}`,
      url: pr.url,
      status: "Merged",
      category: categorize(pr.title),
      tier: flagship ? "flagship" : "community",
      org: flagship?.org ?? null,
      mergedAt: pr.mergedAt ?? null,
    };
  });

  const repoCounts = {};
  const repoUrl = {};
  for (const pr of contributions) {
    repoCounts[pr.repository] = (repoCounts[pr.repository] ?? 0) + 1;
    repoUrl[pr.repository] ??= pr.repositoryUrl;
  }

  const repoEntries = Object.entries(repoCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      displayName: DISPLAY_NAMES[name] ?? name,
      repositoryUrl: repoUrl[name],
      prCount: count,
    }));

  const flagshipRepos = repoEntries
    .filter((r) => {
      const owner = contributions.find((c) => c.repository === r.name).repositoryOwner;
      return FLAGSHIP_ORGS[owner];
    })
    .map((r) => ({
      ...r,
      org: FLAGSHIP_ORGS[contributions.find((c) => c.repository === r.name).repositoryOwner].org,
    }));

  const communityRepos = repoEntries.filter(
    (r) => !flagshipRepos.some((f) => f.name === r.name),
  );

  const meta = {
    totalPRs: contributions.length,
    totalRepositories: repoEntries.length,
    flagshipRepos,
    communityRepos,
    productionRepos: repoEntries,
  };

  return { contributions, meta };
}
