# Modern Data & AI Platform Academy

A 10-module interactive curriculum covering cloud-native data strategy, platform engineering, and AI data infrastructure — from foundations to production. Built on the [learn-template](https://github.com/szaher/learn-template) Next.js platform.

## Quick Start

```bash
pnpm install
cp .env.example .env.local
pnpm validate
pnpm test
pnpm dev
```

## What This Covers

- **Module 1** — Data strategy, operating model, reference architecture
- **Module 2** — Platform foundations: cloud, Kubernetes, security, FinOps
- **Module 3** — Storage, persistence, and table design
- **Module 4** — Ingestion, events, and change data capture
- **Module 5** — Processing and data transformation
- **Module 6** — Lakehouse, query serving, and data products
- **Module 7** — Trust plane: quality, lineage, catalog, governance
- **Module 8** — ML data infrastructure
- **Module 9** — LLM and agent data infrastructure
- **Module 10** — Production architecture and platform evolution

50 lessons with interactive quizzes, Mermaid diagrams, worked examples, and code blocks.

## Project Structure

```text
content/
  module-1/  … module-10/     # Rendered lesson content (MDX)
  tutorials/                   # TutorialSpec JSON files, when used
docs/                          # Architecture and authoring flow
presentations/                 # Marp slide decks
prompts/                       # JSON-first generation and repair prompts
prompts/schemas/               # JSON Schema contracts
scripts/validate.mjs           # Local quality gates
src/components/learning.tsx    # Reusable MDX education components
src/lib/                       # Curriculum, MDX, validation, pipeline helpers
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server |
| `pnpm preview` | Alias for local preview |
| `pnpm update:template` | Sync platform changes from learn-template |
| `pnpm validate` | Run deterministic content quality gates |
| `pnpm test` | Run Vitest tests |
| `pnpm lint` | Run ESLint |
| `pnpm build` | Build the app |

## Quality Gates

Deterministic checks for tutorial-spec structure, MDX compilation, local links, declared citation identifiers, selected accessibility attributes (including Diagram and MermaidDiagram fallback text), duplicate paragraphs, and heuristic risky-claim wording. These checks do not establish factual accuracy, legal compliance, pedagogical quality, or complete accessibility conformance.

## Authoring Flow

1. Create or repair a `TutorialSpec` JSON file with `prompts/01-curriculum-design.md`.
2. Plan sources and claim coverage before writing lessons.
3. Generate lesson, assessment, and artifact JSON with the staged prompts.
4. Move approved MDX into `content/module-N/`.
5. Run `pnpm validate`, `pnpm test`, `pnpm lint`, and `pnpm build`.
6. Complete human review for subject matter, accessibility, localization, and any `verify` claims.

See [docs/architecture.md](docs/architecture.md) and [docs/authoring-flow.md](docs/authoring-flow.md) for details.

## Requirements

- Node.js 22+
- pnpm
- Optional Google Cloud credentials for the AI chat tutor
