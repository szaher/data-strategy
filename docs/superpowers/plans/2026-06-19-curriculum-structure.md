# Curriculum Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the complete content directory structure for the Modern Data & AI Platform Academy — 10 modules with meta.json files and placeholder MDX lessons, update academy config, and fix tests.

**Architecture:** The academy platform discovers modules by scanning `content/module-N/` directories at build time. Each module needs a `meta.json` (module metadata + lesson manifest) and one `.mdx` file per lesson. This plan creates the full directory structure with all 50 lesson placeholders so the app builds and renders correctly. Lesson content will be authored separately using the `02-lesson-writing.md` prompt.

**Tech Stack:** Next.js (build-time content discovery), MDX, JSON, Vitest

## Global Constraints

- Do NOT modify files in `src/`, or root config files other than `academy.config.ts`
- Module directories must be named `module-N` where N matches the `id` field in `meta.json`
- Lesson slugs must exactly match MDX filenames without extension
- MDX files must have YAML frontmatter with at least a `title` field
- Use `##` for section headings in MDX body (never `#`)
- Use `<MermaidDiagram>` in MDX lessons (not `<div class="mermaid">`)
- Colors from spec: `#68d391`, `#4fd1c5`, `#63b3ed`, `#b794f4`, `#ed8936`, `#fc8181`, `#ecc94b`
- Spec: `docs/superpowers/specs/2026-06-19-cloud-native-data-strategy-curriculum-design.md`

## File Map

```
academy.config.ts                          <- Modify: update moduleColors (7 → 10), update tutor prompts
content/
  module-1/                                <- Replace: remove sample content, create spec-defined meta.json + 5 MDX stubs
    meta.json
    01-why-data-strategy-matters.mdx
    02-data-domains-ownership-and-data-products.mdx
    03-maturity-model-and-assessment.mdx
    04-reference-architecture-patterns.mdx
    05-building-your-data-strategy-roadmap.mdx
  module-2/ through module-10/             <- Create: meta.json + 5 MDX stubs each
__tests__/lib/curriculum.test.ts           <- Modify: update expected module count (7 → 10), titles, lesson counts
```

---

### Task 1: Update academy.config.ts

**Files:**
- Modify: `academy.config.ts`

**Interfaces:**
- Produces: `moduleColors` array with 10 entries (consumed by sidebar rendering), updated tutor system prompt

- [ ] **Step 1: Update moduleColors to 10 entries**

The current array has 7 colors. Add 3 more entries to match the 10 modules. Colors are assigned per the spec — modules 8 and 10 reuse earlier colors since the palette has 7 values.

```typescript
  moduleColors: [
    "#68d391", "#4fd1c5", "#63b3ed", "#b794f4",
    "#ed8936", "#fc8181", "#ecc94b", "#68d391",
    "#4fd1c5", "#63b3ed",
  ],
```

- [ ] **Step 2: Update tutor system prompt**

Replace the tutor configuration to reflect the academy's full scope:

```typescript
  tutor: {
    systemPrompt: `You are an expert tutor for the Modern Data & AI Platform Academy. You teach cloud-native data strategy, platform engineering, and AI data infrastructure.

Your expertise covers:
- Data strategy, operating models, and reference architectures
- Platform foundations: Kubernetes, security, FinOps, resilience
- Storage and persistence: object storage, databases, schema design
- Data movement: Kafka, event-driven architecture, CDC with Debezium
- Processing: Spark, Flink, dbt, Airflow, orchestration patterns
- Lakehouse architecture: Iceberg, table formats, query engines (Trino, DuckDB)
- Trust plane: data quality, lineage (OpenLineage), catalogs (DataHub), governance
- ML data infrastructure: feature stores (Feast), training data management
- LLM/agent data infrastructure: RAG pipelines, vector search, retrieval governance
- Production operations: SRE for data, multi-tenancy, cost optimization, migration

Your role:
- Explain concepts clearly with visual diagrams and code examples
- Use \\\`\\\`\\\`mermaid code blocks for architecture diagrams, flowcharts, and sequence diagrams
- Use \\\`\\\`\\\`python code blocks for code examples
- Apply the four-part teaching pattern: architectural problem, opinionated default, decision framework, failure modes
- Break complex topics into digestible pieces
- Use analogies to connect new concepts to familiar ones
- Be encouraging and patient

When generating diagrams, always use mermaid syntax.`,
    codeLanguage: "python",
    chatPlaceholder: "Ask about data strategy, platform engineering, streaming, processing, lakehouse, ML/AI data infrastructure, governance...",
    chatWelcome: "Welcome to the Modern Data & AI Platform Academy! Ask me anything about building data and AI platforms.",
    chatSubtext: "I'll explain with diagrams, code examples, and architecture patterns",
  },
```

- [ ] **Step 3: Verify the file is valid TypeScript**

Run: `cd /Users/szaher/go/src/github.com/szaher/saad/learn/data-strategy && npx tsc --noEmit academy.config.ts 2>&1 || echo "TypeScript check not available standalone — will verify via build later"`

Expected: No type errors (or deferred to build step)

- [ ] **Step 4: Commit**

```bash
git add academy.config.ts
git commit -m "feat: update academy config for 10-module curriculum

Update name, tagline, moduleColors (7 → 10), and tutor system prompt
to reflect the Modern Data & AI Platform Academy curriculum.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Replace module-1 with spec-defined content

**Files:**
- Delete: `content/module-1/01-sample-lesson.mdx`
- Delete: `content/module-1/02-sample-with-quiz.mdx`
- Modify: `content/module-1/meta.json`
- Create: `content/module-1/01-why-data-strategy-matters.mdx`
- Create: `content/module-1/02-data-domains-ownership-and-data-products.mdx`
- Create: `content/module-1/03-maturity-model-and-assessment.mdx`
- Create: `content/module-1/04-reference-architecture-patterns.mdx`
- Create: `content/module-1/05-building-your-data-strategy-roadmap.mdx`

**Interfaces:**
- Produces: Module 1 directory with valid `meta.json` and 5 MDX stubs that pass `pnpm build`

- [ ] **Step 1: Delete sample lesson files**

```bash
rm content/module-1/01-sample-lesson.mdx content/module-1/02-sample-with-quiz.mdx
```

- [ ] **Step 2: Write meta.json**

Write `content/module-1/meta.json`:

```json
{
  "id": 1,
  "title": "Data Strategy, Operating Model & Reference Architecture",
  "description": "Business outcomes, maturity model, domains, data products, ownership, platform principles",
  "color": "#68d391",
  "lessons": [
    {
      "slug": "01-why-data-strategy-matters",
      "title": "Why Data Strategy Matters",
      "description": "Business outcomes of intentional data architecture vs accidental complexity; the cost of no strategy",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-data-domains-ownership-and-data-products",
      "title": "Data Domains, Ownership & Data Products",
      "description": "Domain-driven data design; centralized, federated, and hybrid ownership models; AI data ownership",
      "estimatedMinutes": 14,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "03-maturity-model-and-assessment",
      "title": "Maturity Model & Assessment",
      "description": "Assessing current state across data management, platform capabilities, governance, and AI readiness",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "04-reference-architecture-patterns",
      "title": "Reference Architecture Patterns",
      "description": "Three reference-architecture archetypes: managed-cloud-first, Kubernetes-centric, and hybrid/regulated enterprise",
      "estimatedMinutes": 15,
      "diagramTypes": ["architecture"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "05-building-your-data-strategy-roadmap",
      "title": "Building Your Data Strategy Roadmap",
      "description": "Hands-on: translating assessment to a prioritized roadmap with capability gaps, owners, and success metrics",
      "estimatedMinutes": 12,
      "diagramTypes": ["flowchart"],
      "hasCode": false,
      "hasQuiz": false
    }
  ]
}
```

- [ ] **Step 3: Create 5 placeholder MDX files**

Each placeholder has frontmatter with the lesson title and a body indicating content is pending. For lessons with `hasQuiz: false`, omit the quiz frontmatter.

Write `content/module-1/01-why-data-strategy-matters.mdx`:

```mdx
---
title: "Why Data Strategy Matters"
---

## Coming Soon

This lesson is under development. It will cover:

- Business outcomes of intentional data architecture vs accidental complexity
- The cost of no strategy — broken analytics, duplicated pipelines, ungoverned AI
- How a deliberate data strategy aligns technology investments with business outcomes
```

Write `content/module-1/02-data-domains-ownership-and-data-products.mdx`:

```mdx
---
title: "Data Domains, Ownership & Data Products"
---

## Coming Soon

This lesson is under development. It will cover:

- Domain-driven data design and data mesh as a set of useful principles
- Centralized, federated, and hybrid ownership models
- AI data ownership: training data, embedding corpora, retrieval sources
```

Write `content/module-1/03-maturity-model-and-assessment.mdx`:

```mdx
---
title: "Maturity Model & Assessment"
---

## Coming Soon

This lesson is under development. It will cover:

- Assessing current state across data management, platform capabilities, governance, and AI readiness
- Capability gaps and maturity levels from ad-hoc to self-service
- Connecting assessment to investment priorities
```

Write `content/module-1/04-reference-architecture-patterns.mdx`:

```mdx
---
title: "Reference Architecture Patterns"
---

## Coming Soon

This lesson is under development. It will cover:

- Three reference-architecture archetypes: managed-cloud-first, Kubernetes-centric, and hybrid/regulated enterprise
- Composable building blocks and integration points
- AI accountability in architecture decisions
```

Write `content/module-1/05-building-your-data-strategy-roadmap.mdx`:

```mdx
---
title: "Building Your Data Strategy Roadmap"
---

## Coming Soon

This lesson is under development. It will cover:

- Translating assessment to a prioritized roadmap
- Capability gaps, owners, sequencing, investment bands, and success metrics
- Producing a concrete strategy and operating-model canvas
```

- [ ] **Step 4: Verify meta.json is valid JSON**

Run: `python3 -c "import json; json.load(open('content/module-1/meta.json')); print('OK')"`

Expected: `OK`

- [ ] **Step 5: Commit**

```bash
git add content/module-1/
git commit -m "feat: replace module-1 sample content with curriculum structure

Remove sample lessons. Add meta.json and 5 placeholder MDX files for
Data Strategy, Operating Model & Reference Architecture module.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Create modules 2-4

**Files:**
- Create: `content/module-2/meta.json` + 5 MDX stubs
- Create: `content/module-3/meta.json` + 5 MDX stubs
- Create: `content/module-4/meta.json` + 5 MDX stubs

**Interfaces:**
- Produces: 3 module directories with valid `meta.json` and MDX stubs

- [ ] **Step 1: Create module-2 directory and meta.json**

```bash
mkdir -p content/module-2
```

Write `content/module-2/meta.json`:

```json
{
  "id": 2,
  "title": "Platform Foundations — Cloud, Kubernetes, Security & FinOps",
  "description": "Workload placement, tenancy, IAM, secrets, network controls, cost allocation, resilience",
  "color": "#4fd1c5",
  "lessons": [
    {
      "slug": "01-why-platform-foundations-matter",
      "title": "Why Platform Foundations Matter",
      "description": "The platform as a product; golden paths, templates, self-service APIs, and paved-road developer experience",
      "estimatedMinutes": 10,
      "diagramTypes": ["architecture"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-kubernetes-as-data-platform-runtime",
      "title": "Kubernetes as Data Platform Runtime",
      "description": "Workload placement and operating-model decisions; managed service vs self-hosted on Kubernetes vs VM/bare-metal",
      "estimatedMinutes": 14,
      "diagramTypes": ["architecture", "comparison"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-security-identity-and-network-controls",
      "title": "Security, Identity & Network Controls",
      "description": "Workload identity, IAM, secrets management, encryption, tenant isolation, network policies",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-finops-and-cost-allocation",
      "title": "FinOps & Cost Allocation",
      "description": "Tagging, showback/chargeback, rightsizing, unit economics per pipeline run, TB, query, and AI request",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-resilience-and-disaster-recovery",
      "title": "Resilience & Disaster Recovery",
      "description": "HA patterns, failure domains, service-tiered RPO/RTO, restore testing, disaster-recovery exercises",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "sequence"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 2: Create module-2 MDX stubs**

Write `content/module-2/01-why-platform-foundations-matter.mdx`:

```mdx
---
title: "Why Platform Foundations Matter"
---

## Coming Soon

This lesson is under development. It will cover the platform as a product, golden paths, templates, self-service APIs, and paved-road developer experience.
```

Write `content/module-2/02-kubernetes-as-data-platform-runtime.mdx`:

```mdx
---
title: "Kubernetes as Data Platform Runtime"
---

## Coming Soon

This lesson is under development. It will cover workload placement decisions, operators, StatefulSets, and the decision framework for managed vs self-hosted.
```

Write `content/module-2/03-security-identity-and-network-controls.mdx`:

```mdx
---
title: "Security, Identity & Network Controls"
---

## Coming Soon

This lesson is under development. It will cover workload identity, IAM, secrets management, encryption, tenant isolation, and network boundaries.
```

Write `content/module-2/04-finops-and-cost-allocation.mdx`:

```mdx
---
title: "FinOps & Cost Allocation"
---

## Coming Soon

This lesson is under development. It will cover tagging, showback/chargeback, rightsizing, and unit economics for data platform operations.
```

Write `content/module-2/05-resilience-and-disaster-recovery.mdx`:

```mdx
---
title: "Resilience & Disaster Recovery"
---

## Coming Soon

This lesson is under development. It will cover HA patterns, failure domains, RPO/RTO, restore testing, and disaster-recovery exercises.
```

- [ ] **Step 3: Create module-3 directory and meta.json**

```bash
mkdir -p content/module-3
```

Write `content/module-3/meta.json`:

```json
{
  "id": 3,
  "title": "Storage, Persistence & Table Design",
  "description": "Object storage, databases, stateful workloads, schemas, partitioning, retention, backup",
  "color": "#63b3ed",
  "lessons": [
    {
      "slug": "01-why-storage-architecture-matters",
      "title": "Why Storage Architecture Matters",
      "description": "Data gravity, durability guarantees, access patterns, cost tiers; retaining raw documents and model artifacts",
      "estimatedMinutes": 10,
      "diagramTypes": ["architecture"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-object-storage-and-data-lake-foundations",
      "title": "Object Storage & Data Lake Foundations",
      "description": "S3-compatible object storage as the architectural primitive; MinIO as local/Kubernetes reference implementation",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-databases-on-the-data-platform",
      "title": "Databases on the Data Platform",
      "description": "PostgreSQL as primary reference; OLTP vs OLAP, connection pooling, replication, backup/restore, workload isolation",
      "estimatedMinutes": 14,
      "diagramTypes": ["comparison", "architecture"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-schema-design-partitioning-and-retention",
      "title": "Schema Design, Partitioning & Retention",
      "description": "Relational and file-level schema design, indexing strategies, time-based partitioning, retention policies",
      "estimatedMinutes": 12,
      "diagramTypes": ["flowchart"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-storage-decision-framework",
      "title": "Storage Decision Framework",
      "description": "Decision tree for block vs object vs database; managed vs self-hosted; document, search, and vector storage placement",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 4: Create module-3 MDX stubs**

Write `content/module-3/01-why-storage-architecture-matters.mdx`:

```mdx
---
title: "Why Storage Architecture Matters"
---

## Coming Soon

This lesson is under development. It will cover data gravity, durability guarantees, access patterns, and cost tiers.
```

Write `content/module-3/02-object-storage-and-data-lake-foundations.mdx`:

```mdx
---
title: "Object Storage & Data Lake Foundations"
---

## Coming Soon

This lesson is under development. It will cover S3-compatible object storage, MinIO, lifecycle policies, and tiering.
```

Write `content/module-3/03-databases-on-the-data-platform.mdx`:

```mdx
---
title: "Databases on the Data Platform"
---

## Coming Soon

This lesson is under development. It will cover PostgreSQL, OLTP vs OLAP, connection pooling, replication, and backup/restore.
```

Write `content/module-3/04-schema-design-partitioning-and-retention.mdx`:

```mdx
---
title: "Schema Design, Partitioning & Retention"
---

## Coming Soon

This lesson is under development. It will cover relational schema design, indexing strategies, time-based partitioning, and retention policies.
```

Write `content/module-3/05-storage-decision-framework.mdx`:

```mdx
---
title: "Storage Decision Framework"
---

## Coming Soon

This lesson is under development. It will cover the decision tree for block vs object vs database and managed vs self-hosted tradeoffs.
```

- [ ] **Step 5: Create module-4 directory and meta.json**

```bash
mkdir -p content/module-4
```

Write `content/module-4/meta.json`:

```json
{
  "id": 4,
  "title": "Ingestion, Events & Change Data Capture",
  "description": "Batch ingestion, Kafka, event design, CDC/Debezium, schema evolution, contracts",
  "color": "#b794f4",
  "lessons": [
    {
      "slug": "01-why-data-movement-architecture-matters",
      "title": "Why Data Movement Architecture Matters",
      "description": "Push vs pull, batch vs streaming ingestion; events alongside APIs, commands, batch extracts, and query federation",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-apache-kafka-on-kubernetes",
      "title": "Apache Kafka on Kubernetes",
      "description": "Strimzi operator, topics, partitions, consumer groups, at-least-once with idempotent consumers, production topology",
      "estimatedMinutes": 15,
      "diagramTypes": ["architecture", "sequence"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-event-design-and-schema-contracts",
      "title": "Event Design & Schema Contracts",
      "description": "Schema compatibility, semantic compatibility, and data contracts as three distinct concerns",
      "estimatedMinutes": 14,
      "diagramTypes": ["flowchart", "comparison"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-change-data-capture-with-debezium",
      "title": "Change Data Capture with Debezium",
      "description": "Log-based CDC; four patterns: dual write, transactional outbox, log-based CDC, event sourcing",
      "estimatedMinutes": 12,
      "diagramTypes": ["sequence", "architecture"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-comparing-ingestion-and-streaming-platforms",
      "title": "Comparing Ingestion & Streaming Platforms",
      "description": "Kafka vs Redpanda vs Pulsar vs NATS vs cloud-native; decision framework for ordering, latency, and cost",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 6: Create module-4 MDX stubs**

Write `content/module-4/01-why-data-movement-architecture-matters.mdx`:

```mdx
---
title: "Why Data Movement Architecture Matters"
---

## Coming Soon

This lesson is under development. It will cover push vs pull, batch vs streaming ingestion, and events alongside other integration mechanisms.
```

Write `content/module-4/02-apache-kafka-on-kubernetes.mdx`:

```mdx
---
title: "Apache Kafka on Kubernetes"
---

## Coming Soon

This lesson is under development. It will cover Strimzi, topics, partitions, consumer groups, and delivery guarantees.
```

Write `content/module-4/03-event-design-and-schema-contracts.mdx`:

```mdx
---
title: "Event Design & Schema Contracts"
---

## Coming Soon

This lesson is under development. It will cover schema compatibility, semantic compatibility, and data contracts as three distinct concerns.
```

Write `content/module-4/04-change-data-capture-with-debezium.mdx`:

```mdx
---
title: "Change Data Capture with Debezium"
---

## Coming Soon

This lesson is under development. It will cover log-based CDC, the outbox pattern, and four integration patterns compared.
```

Write `content/module-4/05-comparing-ingestion-and-streaming-platforms.mdx`:

```mdx
---
title: "Comparing Ingestion & Streaming Platforms"
---

## Coming Soon

This lesson is under development. It will cover Kafka vs Redpanda vs Pulsar vs NATS vs cloud-native alternatives.
```

- [ ] **Step 7: Validate all three meta.json files**

Run: `for f in content/module-{2,3,4}/meta.json; do python3 -c "import json; json.load(open('$f')); print('OK: $f')"; done`

Expected:
```
OK: content/module-2/meta.json
OK: content/module-3/meta.json
OK: content/module-4/meta.json
```

- [ ] **Step 8: Commit**

```bash
git add content/module-2/ content/module-3/ content/module-4/
git commit -m "feat: add modules 2-4 structure (platform, storage, ingestion)

Create meta.json and placeholder MDX files for:
- Module 2: Platform Foundations
- Module 3: Storage, Persistence & Table Design
- Module 4: Ingestion, Events & Change Data Capture

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4: Create modules 5-7

**Files:**
- Create: `content/module-5/meta.json` + 5 MDX stubs
- Create: `content/module-6/meta.json` + 5 MDX stubs
- Create: `content/module-7/meta.json` + 5 MDX stubs

**Interfaces:**
- Produces: 3 module directories with valid `meta.json` and MDX stubs

- [ ] **Step 1: Create module-5 directory and meta.json**

```bash
mkdir -p content/module-5
```

Write `content/module-5/meta.json`:

```json
{
  "id": 5,
  "title": "Processing & Data Transformation",
  "description": "SQL, Spark, Flink, dbt, orchestration, batch vs stream, distributed-compute tradeoffs",
  "color": "#ed8936",
  "lessons": [
    {
      "slug": "01-why-processing-architecture-matters",
      "title": "Why Processing Architecture Matters",
      "description": "Unified vs specialized processing paths; materialized views, event-driven projections, operational data products",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-batch-processing-with-apache-spark",
      "title": "Batch Processing with Apache Spark",
      "description": "Spark Operator on K8s, DataFrame API, Spark SQL; failure modes: data skew, small files, shuffle amplification",
      "estimatedMinutes": 15,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-stream-processing-with-apache-flink",
      "title": "Stream Processing with Apache Flink",
      "description": "Stateful streaming, windows, exactly-once, event time, watermarks, late-arriving data, checkpoint recovery",
      "estimatedMinutes": 14,
      "diagramTypes": ["sequence", "state"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-sql-transformation-and-pipeline-orchestration",
      "title": "SQL Transformation & Pipeline Orchestration",
      "description": "dbt as transformation framework, Airflow as orchestrator; pipeline SLAs, retry behavior, freshness guarantees",
      "estimatedMinutes": 13,
      "diagramTypes": ["flowchart", "architecture"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-processing-decision-framework",
      "title": "Processing Decision Framework",
      "description": "Comparing engines by workload fit: Spark, Flink, dbt, Ray; language/runtime dimension; cost tradeoffs",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 2: Create module-5 MDX stubs**

Write `content/module-5/01-why-processing-architecture-matters.mdx`:

```mdx
---
title: "Why Processing Architecture Matters"
---

## Coming Soon

This lesson is under development. It will cover unified vs specialized processing paths, replacing the Lambda/Kappa debate with modern architectural choices.
```

Write `content/module-5/02-batch-processing-with-apache-spark.mdx`:

```mdx
---
title: "Batch Processing with Apache Spark"
---

## Coming Soon

This lesson is under development. It will cover Spark Operator on K8s, DataFrame API, Spark SQL, and production failure modes.
```

Write `content/module-5/03-stream-processing-with-apache-flink.mdx`:

```mdx
---
title: "Stream Processing with Apache Flink"
---

## Coming Soon

This lesson is under development. It will cover stateful streaming, windows, event time, watermarks, and checkpoint recovery.
```

Write `content/module-5/04-sql-transformation-and-pipeline-orchestration.mdx`:

```mdx
---
title: "SQL Transformation & Pipeline Orchestration"
---

## Coming Soon

This lesson is under development. It will cover dbt as a transformation framework and Airflow as orchestrator, with pipeline SLAs and freshness guarantees.
```

Write `content/module-5/05-processing-decision-framework.mdx`:

```mdx
---
title: "Processing Decision Framework"
---

## Coming Soon

This lesson is under development. It will compare Spark, Flink, dbt, and Ray by workload fit, language/runtime, and cost.
```

- [ ] **Step 3: Create module-6 directory and meta.json**

```bash
mkdir -p content/module-6
```

Write `content/module-6/meta.json`:

```json
{
  "id": 6,
  "title": "Lakehouse, Query Serving & Data Products",
  "description": "Iceberg/Delta/Hudi, catalogs, query engines, semantic layers, APIs, self-service consumption",
  "color": "#fc8181",
  "lessons": [
    {
      "slug": "01-why-the-lakehouse-matters",
      "title": "Why the Lakehouse Matters",
      "description": "Evolution from warehouse to lake to lakehouse; open formats, decoupled compute and storage, reproducibility",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-apache-iceberg-and-open-table-formats",
      "title": "Apache Iceberg & Open Table Formats",
      "description": "Iceberg deep-dive: snapshots, time travel, hidden partitioning; catalog selection alongside table-format selection",
      "estimatedMinutes": 15,
      "diagramTypes": ["architecture", "comparison"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-query-engines-and-analytical-serving",
      "title": "Query Engines & Analytical Serving",
      "description": "Trino for federated queries, DuckDB for embedded analytics; workload management, guardrails, tenant isolation",
      "estimatedMinutes": 13,
      "diagramTypes": ["architecture", "comparison"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-data-products-and-self-service-consumption",
      "title": "Data Products & Self-Service Consumption",
      "description": "Data-as-a-product with explicit contracts: owner, schema, freshness, quality, access, cost, deprecation lifecycle",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": false
    },
    {
      "slug": "05-lakehouse-decision-framework",
      "title": "Lakehouse Decision Framework",
      "description": "Lakehouse vs warehouse vs hybrid; practical enterprise patterns; catalog-driven table management",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 4: Create module-6 MDX stubs**

Write `content/module-6/01-why-the-lakehouse-matters.mdx`:

```mdx
---
title: "Why the Lakehouse Matters"
---

## Coming Soon

This lesson is under development. It will cover the evolution from warehouse to lake to lakehouse, open formats, and decoupled compute/storage.
```

Write `content/module-6/02-apache-iceberg-and-open-table-formats.mdx`:

```mdx
---
title: "Apache Iceberg & Open Table Formats"
---

## Coming Soon

This lesson is under development. It will cover Iceberg snapshots, time travel, hidden partitioning, and catalog selection alongside table-format selection.
```

Write `content/module-6/03-query-engines-and-analytical-serving.mdx`:

```mdx
---
title: "Query Engines & Analytical Serving"
---

## Coming Soon

This lesson is under development. It will cover Trino, DuckDB, workload management, and query-cost controls.
```

Write `content/module-6/04-data-products-and-self-service-consumption.mdx`:

```mdx
---
title: "Data Products & Self-Service Consumption"
---

## Coming Soon

This lesson is under development. It will cover data-as-a-product contracts, semantic layers, discovery, and self-service analytics.
```

Write `content/module-6/05-lakehouse-decision-framework.mdx`:

```mdx
---
title: "Lakehouse Decision Framework"
---

## Coming Soon

This lesson is under development. It will cover lakehouse vs warehouse vs hybrid patterns and catalog-driven table management.
```

- [ ] **Step 5: Create module-7 directory and meta.json**

```bash
mkdir -p content/module-7
```

Write `content/module-7/meta.json`:

```json
{
  "id": 7,
  "title": "Trust Plane — Quality, Lineage, Catalog & Governance",
  "description": "Data contracts, active metadata, OpenLineage, catalogs, tests, SLAs, privacy, policy enforcement",
  "color": "#ecc94b",
  "lessons": [
    {
      "slug": "01-why-trust-is-a-platform-concern",
      "title": "Why Trust Is a Platform Concern",
      "description": "The cost of untrustworthy data; trust as an architectural property; data contracts as the foundational mechanism",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-data-quality-observability-and-testing",
      "title": "Data Quality, Observability & Testing",
      "description": "Great Expectations as reference; quality checks, freshness, volume, schema drift as one asset-health system",
      "estimatedMinutes": 14,
      "diagramTypes": ["flowchart", "sequence"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-data-lineage-with-openlineage",
      "title": "Data Lineage with OpenLineage",
      "description": "OpenLineage and Marquez; dataset/job lineage as dependable baseline; column-level lineage where supported",
      "estimatedMinutes": 13,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-data-catalogs-and-active-metadata",
      "title": "Data Catalogs & Active Metadata",
      "description": "DataHub as reference; catalog visibility vs policy enforcement; the catalog as the trust index",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "comparison"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-governance-privacy-and-policy-enforcement",
      "title": "Governance, Privacy & Policy Enforcement",
      "description": "Access control, PII, data residency, retention/deletion propagation, policy enforcement across lakehouse, APIs, and vector retrieval",
      "estimatedMinutes": 12,
      "diagramTypes": ["flowchart", "architecture"],
      "hasCode": true,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 6: Create module-7 MDX stubs**

Write `content/module-7/01-why-trust-is-a-platform-concern.mdx`:

```mdx
---
title: "Why Trust Is a Platform Concern"
---

## Coming Soon

This lesson is under development. It will cover the cost of untrustworthy data, trust as an architectural property, and data contracts.
```

Write `content/module-7/02-data-quality-observability-and-testing.mdx`:

```mdx
---
title: "Data Quality, Observability & Testing"
---

## Coming Soon

This lesson is under development. It will cover Great Expectations, quality checks, freshness, volume, and schema drift as one asset-health system.
```

Write `content/module-7/03-data-lineage-with-openlineage.mdx`:

```mdx
---
title: "Data Lineage with OpenLineage"
---

## Coming Soon

This lesson is under development. It will cover OpenLineage, Marquez, dataset/job lineage, and column-level lineage where supported.
```

Write `content/module-7/04-data-catalogs-and-active-metadata.mdx`:

```mdx
---
title: "Data Catalogs & Active Metadata"
---

## Coming Soon

This lesson is under development. It will cover DataHub, OpenMetadata, catalog visibility vs policy enforcement, and the catalog as the trust index.
```

Write `content/module-7/05-governance-privacy-and-policy-enforcement.mdx`:

```mdx
---
title: "Governance, Privacy & Policy Enforcement"
---

## Coming Soon

This lesson is under development. It will cover access control, PII, data residency, retention/deletion, and policy enforcement points.
```

- [ ] **Step 7: Validate all three meta.json files**

Run: `for f in content/module-{5,6,7}/meta.json; do python3 -c "import json; json.load(open('$f')); print('OK: $f')"; done`

Expected:
```
OK: content/module-5/meta.json
OK: content/module-6/meta.json
OK: content/module-7/meta.json
```

- [ ] **Step 8: Commit**

```bash
git add content/module-5/ content/module-6/ content/module-7/
git commit -m "feat: add modules 5-7 structure (processing, lakehouse, trust)

Create meta.json and placeholder MDX files for:
- Module 5: Processing & Data Transformation
- Module 6: Lakehouse, Query Serving & Data Products
- Module 7: Trust Plane — Quality, Lineage, Catalog & Governance

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5: Create modules 8-10

**Files:**
- Create: `content/module-8/meta.json` + 5 MDX stubs
- Create: `content/module-9/meta.json` + 5 MDX stubs
- Create: `content/module-10/meta.json` + 5 MDX stubs

**Interfaces:**
- Produces: 3 module directories with valid `meta.json` and MDX stubs

- [ ] **Step 1: Create module-8 directory and meta.json**

```bash
mkdir -p content/module-8
```

Write `content/module-8/meta.json`:

```json
{
  "id": 8,
  "title": "ML Data Infrastructure",
  "description": "Feature engineering, offline/online serving, feature stores, training-data lineage, model-data consistency",
  "color": "#68d391",
  "lessons": [
    {
      "slug": "01-why-ml-needs-dedicated-data-infrastructure",
      "title": "Why ML Needs Dedicated Data Infrastructure",
      "description": "Training-serving skew, feature consistency, the data problems that break ML systems",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-feature-engineering-pipelines",
      "title": "Feature Engineering Pipelines",
      "description": "Batch and streaming feature computation, point-in-time correctness, backfilling, feature dependencies",
      "estimatedMinutes": 14,
      "diagramTypes": ["flowchart", "sequence"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-feature-stores-with-feast",
      "title": "Feature Stores with Feast",
      "description": "Feast: offline store, online store, materialization; comparison with Tecton and platform-native alternatives",
      "estimatedMinutes": 15,
      "diagramTypes": ["architecture", "sequence"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-training-data-labels-and-model-traceability",
      "title": "Training Data, Labels & Model Traceability",
      "description": "Dataset versioning with Iceberg snapshots, label management, bias detection, training-data lineage to model",
      "estimatedMinutes": 12,
      "diagramTypes": ["flowchart", "architecture"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-ml-data-decision-framework",
      "title": "ML Data Decision Framework",
      "description": "When you need a feature store vs direct queries; model-data consistency patterns; connecting to the trust plane",
      "estimatedMinutes": 10,
      "diagramTypes": ["comparison", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 2: Create module-8 MDX stubs**

Write `content/module-8/01-why-ml-needs-dedicated-data-infrastructure.mdx`:

```mdx
---
title: "Why ML Needs Dedicated Data Infrastructure"
---

## Coming Soon

This lesson is under development. It will cover training-serving skew, feature consistency, and the data problems that break ML systems.
```

Write `content/module-8/02-feature-engineering-pipelines.mdx`:

```mdx
---
title: "Feature Engineering Pipelines"
---

## Coming Soon

This lesson is under development. It will cover batch and streaming feature computation, point-in-time correctness, and backfilling.
```

Write `content/module-8/03-feature-stores-with-feast.mdx`:

```mdx
---
title: "Feature Stores with Feast"
---

## Coming Soon

This lesson is under development. It will cover Feast offline/online stores, materialization, and comparison with alternatives.
```

Write `content/module-8/04-training-data-labels-and-model-traceability.mdx`:

```mdx
---
title: "Training Data, Labels & Model Traceability"
---

## Coming Soon

This lesson is under development. It will cover dataset versioning, label management, bias detection, and training-data lineage.
```

Write `content/module-8/05-ml-data-decision-framework.mdx`:

```mdx
---
title: "ML Data Decision Framework"
---

## Coming Soon

This lesson is under development. It will cover when to use feature stores, model-data consistency patterns, and trust plane integration.
```

- [ ] **Step 3: Create module-9 directory and meta.json**

```bash
mkdir -p content/module-9
```

Write `content/module-9/meta.json`:

```json
{
  "id": 9,
  "title": "LLM & Agent Data Infrastructure",
  "description": "RAG pipelines, vector/hybrid search, document processing, embeddings, knowledge freshness, evaluation, retrieval governance",
  "color": "#4fd1c5",
  "lessons": [
    {
      "slug": "01-why-llm-applications-need-data-infrastructure",
      "title": "Why LLM Applications Need Data Infrastructure",
      "description": "Knowledge freshness, hallucination grounding; LLM data infrastructure consumes governed data products through a retrieval serving path",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-document-processing-and-embedding-pipelines",
      "title": "Document Processing & Embedding Pipelines",
      "description": "Parsing, normalization, chunking strategies, embedding generation, versioning embeddings as data artifacts",
      "estimatedMinutes": 15,
      "diagramTypes": ["flowchart", "sequence"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "03-vector-search-and-retrieval-architecture",
      "title": "Vector Search & Retrieval Architecture",
      "description": "Vector databases, hybrid search, reranking, index management; dedicated vector DB vs vector-enabled DB vs search engine",
      "estimatedMinutes": 14,
      "diagramTypes": ["architecture", "comparison"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-rag-pipeline-design-and-evaluation",
      "title": "RAG Pipeline Design & Evaluation",
      "description": "End-to-end RAG; two-layered evaluation: retrieval metrics and end-to-end quality (groundedness, citation, safety, cost)",
      "estimatedMinutes": 13,
      "diagramTypes": ["flowchart", "architecture"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "05-agent-data-patterns-and-retrieval-governance",
      "title": "Agent Data Patterns & Retrieval Governance",
      "description": "Agent memory types, retrieval vs action authorization, access control at retrieval time, audit records",
      "estimatedMinutes": 12,
      "diagramTypes": ["architecture", "sequence"],
      "hasCode": true,
      "hasQuiz": false
    }
  ]
}
```

- [ ] **Step 4: Create module-9 MDX stubs**

Write `content/module-9/01-why-llm-applications-need-data-infrastructure.mdx`:

```mdx
---
title: "Why LLM Applications Need Data Infrastructure"
---

## Coming Soon

This lesson is under development. It will cover knowledge freshness, hallucination grounding, and the retrieval problem.
```

Write `content/module-9/02-document-processing-and-embedding-pipelines.mdx`:

```mdx
---
title: "Document Processing & Embedding Pipelines"
---

## Coming Soon

This lesson is under development. It will cover parsing, chunking strategies, embedding generation, and versioning.
```

Write `content/module-9/03-vector-search-and-retrieval-architecture.mdx`:

```mdx
---
title: "Vector Search & Retrieval Architecture"
---

## Coming Soon

This lesson is under development. It will cover vector databases, hybrid search, reranking, and index management strategies.
```

Write `content/module-9/04-rag-pipeline-design-and-evaluation.mdx`:

```mdx
---
title: "RAG Pipeline Design & Evaluation"
---

## Coming Soon

This lesson is under development. It will cover end-to-end RAG architecture and two-layered evaluation: retrieval metrics and end-to-end quality.
```

Write `content/module-9/05-agent-data-patterns-and-retrieval-governance.mdx`:

```mdx
---
title: "Agent Data Patterns & Retrieval Governance"
---

## Coming Soon

This lesson is under development. It will cover agent memory types, retrieval vs action authorization, and audit records.
```

- [ ] **Step 5: Create module-10 directory and meta.json**

```bash
mkdir -p content/module-10
```

Write `content/module-10/meta.json`:

```json
{
  "id": 10,
  "title": "Production Architecture & Platform Evolution",
  "description": "Multi-tenancy, reliability, SRE, cost, migration, reference architectures, platform roadmaps",
  "color": "#63b3ed",
  "lessons": [
    {
      "slug": "01-why-production-data-platforms-are-different",
      "title": "Why Production Data Platforms Are Different",
      "description": "Day-2 operations, the gap between dev and production; reliability, cost, multi-tenancy, observability at scale",
      "estimatedMinutes": 10,
      "diagramTypes": ["architecture"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "02-reference-architectures",
      "title": "Reference Architectures",
      "description": "Three composable blueprints: managed-cloud-first, Kubernetes-centric, hybrid/regulated; end-to-end integration scenario",
      "estimatedMinutes": 15,
      "diagramTypes": ["architecture", "flowchart"],
      "hasCode": false,
      "hasQuiz": true
    },
    {
      "slug": "03-multi-tenancy-reliability-and-sre-for-data",
      "title": "Multi-Tenancy, Reliability & SRE for Data",
      "description": "Tenant isolation, data-native SLIs, error budgets, burn-rate alerting, data incident runbooks",
      "estimatedMinutes": 14,
      "diagramTypes": ["architecture", "comparison"],
      "hasCode": true,
      "hasQuiz": true
    },
    {
      "slug": "04-cost-optimization-at-scale",
      "title": "Cost Optimization at Scale",
      "description": "Unit economics at platform scale, storage tiering, compute right-sizing, chargeback models, TCO-based decisions",
      "estimatedMinutes": 12,
      "diagramTypes": ["comparison", "flowchart"],
      "hasCode": true,
      "hasQuiz": false
    },
    {
      "slug": "05-migration-strategies-and-platform-roadmaps",
      "title": "Migration Strategies & Platform Roadmaps",
      "description": "Strangler fig, parallel run, shadow mode; exit criteria, rollback plans, ownership transfer, decommission milestones",
      "estimatedMinutes": 12,
      "diagramTypes": ["flowchart"],
      "hasCode": false,
      "hasQuiz": true
    }
  ]
}
```

- [ ] **Step 6: Create module-10 MDX stubs**

Write `content/module-10/01-why-production-data-platforms-are-different.mdx`:

```mdx
---
title: "Why Production Data Platforms Are Different"
---

## Coming Soon

This lesson is under development. It will cover day-2 operations and the gap between dev and production at scale.
```

Write `content/module-10/02-reference-architectures.mdx`:

```mdx
---
title: "Reference Architectures"
---

## Coming Soon

This lesson is under development. It will cover three composable blueprints and the end-to-end integration scenario.
```

Write `content/module-10/03-multi-tenancy-reliability-and-sre-for-data.mdx`:

```mdx
---
title: "Multi-Tenancy, Reliability & SRE for Data"
---

## Coming Soon

This lesson is under development. It will cover tenant isolation, data-native SLIs, error budgets, and data incident runbooks.
```

Write `content/module-10/04-cost-optimization-at-scale.mdx`:

```mdx
---
title: "Cost Optimization at Scale"
---

## Coming Soon

This lesson is under development. It will cover unit economics, storage tiering, compute right-sizing, and chargeback models.
```

Write `content/module-10/05-migration-strategies-and-platform-roadmaps.mdx`:

```mdx
---
title: "Migration Strategies & Platform Roadmaps"
---

## Coming Soon

This lesson is under development. It will cover incremental migration patterns, exit criteria, and platform evolution roadmaps.
```

- [ ] **Step 7: Validate all three meta.json files**

Run: `for f in content/module-{8,9,10}/meta.json; do python3 -c "import json; json.load(open('$f')); print('OK: $f')"; done`

Expected:
```
OK: content/module-8/meta.json
OK: content/module-9/meta.json
OK: content/module-10/meta.json
```

- [ ] **Step 8: Commit**

```bash
git add content/module-8/ content/module-9/ content/module-10/
git commit -m "feat: add modules 8-10 structure (ML data, LLM/agent, production)

Create meta.json and placeholder MDX files for:
- Module 8: ML Data Infrastructure
- Module 9: LLM & Agent Data Infrastructure
- Module 10: Production Architecture & Platform Evolution

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6: Update tests and verify build

**Files:**
- Modify: `__tests__/lib/curriculum.test.ts`

**Interfaces:**
- Consumes: All 10 module directories created in Tasks 2-5
- Produces: Passing test suite and successful build

- [ ] **Step 1: Update curriculum test expectations**

The existing test expects 7 modules with specific titles. Update to match the new 10-module curriculum.

Replace the full contents of `__tests__/lib/curriculum.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { getCurriculum, getModuleMeta, getLessonPath } from "@/lib/curriculum";

describe("getCurriculum", () => {
  it("returns all 10 modules", async () => {
    const curriculum = await getCurriculum();
    expect(curriculum.modules).toHaveLength(10);
  });

  it("module 1 has 5 lessons", async () => {
    const curriculum = await getCurriculum();
    expect(curriculum.modules[0].lessons).toHaveLength(5);
  });

  it("module IDs are sequential starting at 1", async () => {
    const curriculum = await getCurriculum();
    const ids = curriculum.modules.map((m) => m.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

describe("getModuleMeta", () => {
  it("returns module by ID", async () => {
    const mod = await getModuleMeta(1);
    expect(mod?.title).toBe(
      "Data Strategy, Operating Model & Reference Architecture"
    );
  });

  it("returns undefined for invalid ID", async () => {
    const mod = await getModuleMeta(99);
    expect(mod).toBeUndefined();
  });
});

describe("getLessonPath", () => {
  it("returns correct MDX path", () => {
    const p = getLessonPath(1, "01-why-data-strategy-matters");
    expect(p).toContain("content/module-1/01-why-data-strategy-matters.mdx");
  });
});
```

- [ ] **Step 2: Run tests**

Run: `cd /Users/szaher/go/src/github.com/szaher/saad/learn/data-strategy && pnpm test`

Expected: All tests pass. If curriculum tests fail, check that module directories exist and meta.json files are valid.

- [ ] **Step 3: Run build**

Run: `cd /Users/szaher/go/src/github.com/szaher/saad/learn/data-strategy && pnpm build`

Expected: Build succeeds. All 10 modules with 50 lessons are discovered and compiled.

- [ ] **Step 4: Commit**

```bash
git add __tests__/lib/curriculum.test.ts
git commit -m "test: update curriculum tests for 10-module structure

Update expected module count from 7 to 10, module 1 lesson count from 4
to 5, and module/lesson names to match the new curriculum.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 5: Verify content structure**

Run: `for d in content/module-{1,2,3,4,5,6,7,8,9,10}; do echo "--- $d ---"; ls "$d"; done`

Expected: Each module directory contains `meta.json` and exactly 5 `.mdx` files.

Run: `find content -name "*.mdx" | wc -l`

Expected: `50`

Run: `find content -name "meta.json" | wc -l`

Expected: `10`
