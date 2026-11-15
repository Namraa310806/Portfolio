import type {
  Education,
  ExperienceItem,
  FlagshipContribution,
  SelectedContribution,
} from "@/types";

export const siteConfig = {
  name: "Namraa Patel",
  title: "Namraa Patel — Backend & Systems Engineer",
  description:
    "Merged fixes in Celery, Django, Microsoft Agent Framework and Open Food Facts. Concurrency, distributed systems and a C++ matching engine, built by a third-year CS student.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://namraa310806.github.io/Portfolio",
  github: "https://github.com/Namraa310806",
  linkedin: "https://www.linkedin.com/in/namraa-patel/",
  email: "patelnamraa88@gmail.com",
  phone: "+918780388389",
  resumePath: "/Namraa_Patel.pdf",
  leetcode: "https://leetcode.com/u/patelnamraa08/",
  codeforces: "https://codeforces.com/profile/hacker08",
  location: "Ahmedabad, India",
};

/** Ratings, kept in one place so every section stays consistent. */
export const ratings = {
  leetcode: 2207,
  codeforcesMax: 1738,
  codeforcesCurrent: 1704,
  cgpa: 9.61,
};

/**
 * The upstream work worth reading in full. Every claim here is taken from the
 * PR itself or from the resume; release tags are only listed when confirmed.
 */
export const flagshipContributions: FlagshipContribution[] = [
  {
    id: "pr-celery-10998",
    org: "celery",
    repository: "celery/celery",
    number: 10998,
    url: "https://github.com/celery/celery/pull/10998",
    title: "Redis chord race: one callback, not two",
    kind: "Race condition",
    category: "Concurrency",
    problem:
      "Concurrent workers could both complete a Redis chord and both publish its callback, so the callback ran twice.",
    fix: "Completion detection and dispatch became one atomic, Lua-scripted claim with unique claim tokens and ownership-validated cleanup, so a stale claim can never release a newer one. Added regression tests.",
  },
  {
    id: "pr-django-22177",
    org: "django",
    repository: "django/django",
    number: 22177,
    url: "https://github.com/django/django/pull/22177",
    title: "Django ORM: deferred fetch stopped overwriting data",
    kind: "Overwritten state",
    category: "Backend",
    problem:
      "With FETCH_PEERS, fetching a deferred field overwrote already-loaded or locally modified values on peer instances (Trac #37436).",
    fix: "Kept the fix confined to DeferredAttribute, with regression tests and release notes. Maintainer review narrowed the patch to this smaller change before it merged.",
  },
  {
    id: "pr-agent-framework-8819",
    org: "microsoft",
    repository: "microsoft/agent-framework",
    number: 8819,
    url: "https://github.com/microsoft/agent-framework/pull/8819",
    title: "Workflows: a failed run no longer haunts the next one",
    kind: "State leak",
    category: "Backend",
    problem:
      "Writes staged during a failed or cancelled superstep leaked into later, successful runs.",
    fix: "Workflows now discard pending state across the core, declarative and foundry-hosting packages, including concurrent edge runners. Added failure and cancellation regression tests.",
    shipped: "Python 1.22.0",
  },
  {
    id: "pr-celery-10493",
    org: "celery",
    repository: "celery/celery",
    number: 10493,
    url: "https://github.com/celery/celery/pull/10493",
    title: "Hard-timeout memory leak behind a silent no-op",
    kind: "Memory leak",
    category: "Concurrency",
    problem:
      "traceback_clear(exc) silently failed on a live frame, so a traceback–frame reference cycle kept memory alive after hard timeouts.",
    fix: "Broke the cycle with exc.__traceback__ = None and added regression and smoke tests.",
    shipped: "Celery 5.7.0",
  },
  {
    id: "pr-celery-10497",
    org: "celery",
    repository: "celery/celery",
    number: 10497,
    url: "https://github.com/celery/celery/pull/10497",
    title: "Redis result backend deadlock",
    kind: "Deadlock",
    category: "Concurrency",
    problem:
      "A redundant UNSUBSCRIBE re-entered redis-py's non-reentrant PubSub lock and deadlocked the result consumer.",
    fix: "Guarded the redundant call and added regression tests.",
    shipped: "Celery 5.7.0",
  },
  {
    id: "pr-agent-framework-7944",
    org: "microsoft",
    repository: "microsoft/agent-framework",
    number: 7944,
    url: "https://github.com/microsoft/agent-framework/pull/7944",
    title: "Context compaction stopped losing its summaries",
    kind: "Lost context",
    category: "AI",
    problem:
      "Synthetic summaries produced by compaction strategies were silently discarded on the next agent run.",
    fix: "Reworked reconciliation in before_run to retain them, so summarized history and tool results survive across runs.",
    shipped: "Python 1.19.0",
  },
  {
    id: "pr-celery-10510",
    org: "celery",
    repository: "celery/celery",
    number: 10510,
    url: "https://github.com/celery/celery/pull/10510",
    title: "Expired certificates no longer pass verification",
    kind: "Time-of-use gap",
    category: "Security",
    problem:
      "A certificate that expired after it was loaded could still pass signature verification.",
    fix: "Added an explicit expiry check before verification, with regression tests.",
  },
  {
    id: "pr-openfoodfacts-explorer-1766",
    org: "off",
    repository: "openfoodfacts/openfoodfacts-explorer",
    number: 1766,
    url: "https://github.com/openfoodfacts/openfoodfacts-explorer/pull/1766",
    title: "Brand autocomplete for Open Food Facts search",
    kind: "Feature",
    category: "Backend",
    problem: "Search had no brand autocomplete (issue #1685).",
    fix: "Added brand autocomplete through the taxonomy suggester as a classic fallback, keeping categories and labels on search-a-licious.",
  },
  {
    id: "pr-django-22244",
    org: "django",
    repository: "django/django",
    number: 22244,
    url: "https://github.com/django/django/pull/22244",
    title: "JSONL import broke on Unicode line separators",
    kind: "Parsing bug",
    category: "Backend",
    problem:
      "JSONL deserialization failed when a JSON string contained Unicode line separators (U+2028/U+2029), which Python's str.splitlines treats as line breaks even though they are valid inside JSON strings (Trac #37442).",
    fix: "Switched deserialization to split on the JSONL record separator only, with regression tests for strings containing Unicode separators.",
  },
  {
    id: "pr-agent-framework-9796",
    org: "microsoft",
    repository: "microsoft/agent-framework",
    number: 9796,
    url: "https://github.com/microsoft/agent-framework/pull/9796",
    title: "Parallel tool results were silently dropped",
    kind: "Lost results",
    category: "AI",
    problem:
      "When an assistant issued parallel tool calls, their results could arrive as separate consecutive messages. Processing the first result cleared the pending tool-use IDs, so the Bedrock request went out with an incomplete set of results.",
    fix: "Preserved pending tool-use IDs across consecutive tool messages, consumed only the matching ID per result, and merged consecutive results into one Bedrock user message, with regression tests for parallel and edge cases.",
  },
  {
    id: "pr-openfoodfacts-explorer-1851",
    org: "off",
    repository: "openfoodfacts/openfoodfacts-explorer",
    number: 1851,
    url: "https://github.com/openfoodfacts/openfoodfacts-explorer/pull/1851",
    title: "The map showed fake zeros for countries with no data",
    kind: "Data conflation",
    category: "Backend",
    problem:
      "CountriesMap.svelte treated countries missing from the facet response as having 0 products (?? 0), conflating absent data with an explicit zero — which skewed the choropleth legend and blocked the noData styling.",
    fix: "Separated taxonomy membership from facet data: countryData now only contains countries present in facet.tags, explicit zeros are preserved, and missing countries fall back to the noData theme — covered by regression tests on the extracted buildCountryData helper.",
  },
  {
    id: "pr-openfoodfacts-explorer-1225",
    org: "off",
    repository: "openfoodfacts/openfoodfacts-explorer",
    number: 1225,
    url: "https://github.com/openfoodfacts/openfoodfacts-explorer/pull/1225",
    title: "Crop resize handles were invisible to keyboards and screen readers",
    kind: "Accessibility",
    category: "Backend",
    problem:
      "The image editor's crop resize handles were interactive elements with no role, tabindex, or keyboard support, triggering an a11y warning and leaving them unusable for assistive tech.",
    fix: "Added role=\"button\", tabindex=\"0\", Enter/Space keyboard handling and kept the aria-label on the resize handles in PhotoEditDialog.svelte, clearing the build's accessibility warning.",
  },
];

/** Community open source: the featured picks outside the four flagship projects. */
export const selectedContributions: SelectedContribution[] = [
  {
    title: "Distributed Rate Limiting",
    repository: "Eventra",
    description:
      "Implemented Redis-backed distributed rate limiting eliminating instance-hopping bypass attacks.",
    outcome: "Rate limits hold across multiple app instances.",
    category: "Security",
    url: "https://github.com/SandeepVashishtha/Eventra/pull/8655",
    prNumber: 8655,
  },
  {
    title: "Concurrency Synchronization",
    repository: "AegisGraph",
    description:
      "Eliminated race conditions across async services in runtime state management.",
    outcome: "Synchronized shared runtime state across async services.",
    category: "Concurrency",
    url: "https://github.com/Puneet04-tech/AegisGraph-Sentinel-2.0/pull/1054",
    prNumber: 1054,
  },
  {
    title: "Thread-Safe AI Inference",
    repository: "pdf-qa-bot",
    description:
      "Resolved concurrent model execution failures in the RAG inference pipeline.",
    outcome: "Reliable parallel document processing under load.",
    category: "AI",
    url: "https://github.com/FireFistisDead/pdf-qa-bot/pull/69",
    prNumber: 69,
  },
  {
    title: "Authentication Architecture",
    repository: "LegalEase",
    description:
      "Refactored to a unified identity model with secure JWT and API key separation.",
    outcome: "Consistent auth flows with reduced security surface area.",
    category: "Security",
    url: "https://github.com/AnuranjanJain/LegalEase/pull/350",
    prNumber: 350,
  },
  {
    title: "IP Header Validation",
    repository: "Eventra",
    description:
      "Validated forwarded IP headers before use to prevent IP spoofing attacks.",
    outcome: "Enhanced security against header manipulation.",
    category: "Security",
    url: "https://github.com/SandeepVashishtha/Eventra/pull/8687",
    prNumber: 8687,
  },
];

/** Every contribution that gets its own detail page (flagship first). */
export const detailContributions: SelectedContribution[] = [
  ...flagshipContributions.map((c) => ({
    title: c.title,
    repository: c.repository.split("/")[1],
    description: c.problem,
    outcome: c.shipped ? `${c.fix} Shipped in ${c.shipped}.` : c.fix,
    category: c.category,
    url: c.url,
    prNumber: c.number,
  })),
  ...selectedContributions,
];

export const experience: ExperienceItem[] = [
  {
    role: "Open Source Contributor",
    org: "Celery · Django · Microsoft Agent Framework · Open Food Facts",
    place: "Remote",
    period: "Apr 2026 – Present",
    current: true,
    bullets: [
      "Root-cause analysis, fixes and regression tests for concurrency, memory and shared-state bugs in widely used projects.",
      "Worked through maintainer review on every PR, including a Django patch that was narrowed to a smaller change.",
    ],
    tags: ["Python", "Redis", "Concurrency", "ORM internals", "Regression tests"],
  },
  {
    role: "Django Backend Intern",
    org: "Techaronic IT Solutions Pvt. Ltd.",
    place: "Ahmedabad, India",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Cut average API response time by 25% under production load with database indexing and ORM query tuning.",
      "Built authentication and authorization workflows with request validation and access control.",
      "Deployed and maintained services on AWS EC2, including production debugging under live traffic.",
    ],
    tags: ["Django REST", "PostgreSQL", "AWS EC2", "Auth"],
  },
];

export const education: Education[] = [
  {
    institution: "Pandit Deendayal Energy University",
    degree: "B.Tech Computer Science and Business Systems (CSBS)",
    cgpa: 9.61,
    period: "2025–2028",
  },
  {
    institution: "Government Polytechnic Ahmedabad",
    degree: "Diploma Computer Engineering",
    cgpa: 9.78,
    period: "2022–2025",
  },
];

export const projects = [
  {
    title: "Matching Engine",
    description:
      "A price-time-priority limit order book and matching engine in C++20: limit and market orders, partial fills, cancels and multiple instruments. Profiled, benchmarked and race-checked with ThreadSanitizer.",
    stack: ["C++20", "CMake", "GoogleTest", "Google Benchmark", "ThreadSanitizer", "ASan", "UBSan"],
    outcome:
      "Cancel-heavy throughput rose from 13.7K to 3.81M ops/s (278×) after swapping a map/deque book for a sorted vector with intrusive lists.",
    github: "https://github.com/Namraa310806/Matching-Engine",
    liveDemo: null,
    challenges: [
      "O(1) cancels with intrusive lists",
      "Lock-free SPSC ingestion queue",
      "Chunked freelist object pool",
      "Benchmark integrity checks",
    ],
  },
  {
    title: "ContribIQ",
    description:
      "Engineering intelligence platform that turns GitHub history into verifiable evidence of real work — PR-centric contribution analysis, an auditable repo-eligibility engine, deterministic six-dimension scoring, and evidence-backed resume bullets and STAR answers.",
    stack: ["FastAPI", "MongoDB", "Motor", "Pydantic", "React", "TypeScript", "Vite", "Tailwind CSS", "Playwright", "GitHub OAuth", "LLM"],
    outcome:
      "Built a snapshot-safe evidence pipeline where every resume claim must link to the PRs that prove it — claims without evidence are dropped.",
    github: "https://github.com/Namraa310806/ContribIQ",
    liveDemo: null,
    challenges: [
      "Partitioned GitHub Search past the 1,000-result ceiling",
      "Repo eligibility engine with org-role verdicts",
      "Snapshot-safe per-collection evidence persistence",
      "Deterministic scoring with evidence confidence",
    ],
  },
  {
    title: "TeamSense",
    description:
      "AI-powered HR analytics platform built for a hackathon. An async Celery and Redis pipeline moves compute-heavy feedback processing off the request cycle, backed by a multi-entity PostgreSQL schema and a Dockerized stack.",
    stack: ["Django", "DRF", "PostgreSQL", "Redis", "Celery", "Docker", "React", "Nginx", "JWT"],
    outcome:
      "Cut synchronous processing load by 60% by moving feedback processing into an async Celery–Redis pipeline.",
    github: "https://github.com/Namraa310806/TeamSense",
    liveDemo: null,
    challenges: [
      "Async task queues with Celery",
      "Redis caching strategies",
      "PostgreSQL relationship modeling",
      "Docker containerization",
    ],
  },
  {
    title: "Personal Cloud Assistant",
    description:
      "Fully serverless AWS application for secure note and file management. Lambda and API Gateway serve the REST APIs, S3 presigned URLs handle file I/O, DynamoDB stores data, Cognito secures access and CloudWatch tracks custom metrics.",
    stack: ["AWS", "Lambda", "API Gateway", "DynamoDB", "S3", "Cognito", "Amplify", "React", "CloudWatch", "IAM"],
    outcome:
      "Shipped a secure serverless backend with Cognito JWT auth, least-privilege IAM and an admin-only monitoring dashboard.",
    github: "https://github.com/Namraa310806/AWSPeronsalCloudAssistant",
    liveDemo: "https://main.d1xrjjt0e3swym.amplifyapp.com/",
    challenges: [
      "Serverless architecture design",
      "S3 presigned URL security",
      "DynamoDB data modeling",
      "Cognito authentication flows",
    ],
  },
  {
    title: "ProfiLens",
    description:
      "Full-stack career development platform with gamified learning, MCQ and coding exams, resume generation and a coin-based reward store. Built with Django, DRF, PostgreSQL and WeasyPrint for PDF generation.",
    stack: ["Django", "DRF", "PostgreSQL", "Python", "Bootstrap", "WeasyPrint", "JWT", "Celery", "Redis"],
    outcome: "Built async resume and PDF generation with RBAC-backed learning workflows.",
    github: "https://github.com/Namraa310806/ProfiLens",
    liveDemo: null,
    challenges: [
      "RBAC authorization system",
      "Async PDF generation pipeline",
      "PostgreSQL schema design & indexing",
      "Service-oriented architecture",
    ],
  },
  {
    title: "Animal Classification",
    description:
      "Deep learning project classifying images into 15 animal categories using MobileNetV2 transfer learning. Features data augmentation, early stopping, and a Streamlit web app for predictions.",
    stack: ["TensorFlow", "MobileNetV2", "Python", "Streamlit", "scikit-learn", "NumPy", "Pandas"],
    outcome: "Trained and deployed transfer-learning inference for 15-class image classification.",
    github: "https://github.com/Namraa310806/AnimalClassification",
    liveDemo: null,
    challenges: [
      "Transfer learning with MobileNetV2",
      "Data augmentation strategies",
      "Early stopping implementation",
      "Model deployment pipeline",
    ],
  },
  {
    title: "Color Classifier",
    description:
      "ML web app that analyzes and visualizes dominant color distribution in images. Uses Random Forest classifier on custom-labeled color dataset with OpenCV for feature extraction and Streamlit for the UI.",
    stack: ["Python", "scikit-learn", "OpenCV", "NumPy", "Streamlit", "Pandas", "Matplotlib"],
    outcome: "Delivered real-time dominant-color prediction with OpenCV feature extraction.",
    github: "https://github.com/Namraa310806/ColorClassifierML",
    liveDemo: "https://namraapatel-colorclassifier.streamlit.app/",
    challenges: [
      "Custom dataset labeling",
      "Feature extraction with OpenCV",
      "Random Forest model training",
      "Streamlit real-time inference",
    ],
  },
  {
    title: "GestureMediaPlayer",
    description:
      "Computer vision application that controls media playback using hand gestures. Uses MediaPipe for real-time hand tracking and gesture recognition with OpenCV for video processing.",
    stack: ["Python", "MediaPipe", "OpenCV", "NumPy", "CV2", "PyAutoGUI", "Threading"],
    outcome: "Implemented low-latency hand-gesture controls for desktop media playback.",
    github: "https://github.com/Namraa310806/GestureMediaPlayer",
    liveDemo: null,
    challenges: [
      "Real-time hand tracking",
      "Gesture recognition accuracy",
      "Low-latency video processing",
      "Cross-platform compatibility",
    ],
  },
  {
    title: "n8n Workflow",
    description:
      "Custom n8n workflow automation for data processing and integration. Features automated triggers, API integrations, and conditional logic for complex business processes.",
    stack: ["n8n", "JavaScript", "Node.js", "REST APIs", "Webhooks"],
    outcome: "Automated API-triggered workflows with conditional routing and retry-aware handling.",
    github: "https://github.com/Namraa310806/n8n-workflows",
    liveDemo: null,
    challenges: [
      "Workflow orchestration",
      "API integration patterns",
      "Error handling and retry logic",
      "Data transformation pipelines",
    ],
  },
  {
    title: "Automated Book Workflow",
    description:
      "End-to-end automation system for book processing and management. Integrates multiple APIs for metadata extraction, content processing, and automated publishing workflows.",
    stack: ["Python", "n8n", "REST APIs", "Docker", "PostgreSQL"],
    outcome: "Orchestrated multi-service book processing with resilient workflow state management.",
    github: "https://github.com/Namraa310806/AutomatedBookWorkflow",
    liveDemo: null,
    challenges: [
      "Multi-service integration",
      "Workflow state management",
      "Error recovery mechanisms",
      "Scalable architecture design",
    ],
  },
];

export const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#opensource", label: "Upstream" },
  { href: "#systems", label: "Systems" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];
