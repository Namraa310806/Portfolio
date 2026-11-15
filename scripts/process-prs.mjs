import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { buildData, isExcluded } from "./pr-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  readFileSync(join(__dirname, "../src/data/merged-prs.json"), "utf8"),
).filter((pr) => !isExcluded(pr.repository.nameWithOwner));

const { contributions, meta } = buildData(raw);

writeFileSync(
  join(__dirname, "../src/data/contributions.json"),
  JSON.stringify(contributions, null, 2),
);
writeFileSync(
  join(__dirname, "../src/data/contributions-meta.json"),
  JSON.stringify(meta, null, 2),
);

console.log(
  `Processed ${contributions.length} PRs across ${meta.totalRepositories} repositories`,
);
