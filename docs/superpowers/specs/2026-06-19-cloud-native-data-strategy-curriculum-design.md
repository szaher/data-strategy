# Modern Data & AI Platform Academy — Curriculum Specification

## Overview

**Academy name:** Modern Data & AI Platform Academy
**Slug:** data-strategy
**Full title:** The Modern Data and AI Platform: Foundations to Production
**Audience:** AI engineers, AI/MLOps engineers, data application engineers, data infrastructure engineers, platform engineers
**Depth:** Beginner to advanced
**Structure:** 10 modules, 5 lessons each (50 lessons total)
**Instructional runtime:** ~10h 23min
**Estimated practical completion time:** 25–35 hours (includes environment setup, code labs, architecture exercises, debugging, and review)

## Prerequisites

**Required knowledge:**
- SQL fundamentals — SELECT, JOIN, GROUP BY, window functions, DDL
- Python familiarity — scripting, package management, virtual environments
- Docker basics — building images, running containers, docker-compose
- Kubernetes basics — pods, deployments, services, namespaces, kubectl; no operator or CRD authoring experience required
- Git — branching, merging, basic collaboration workflows

**Environment expectations:**
- A laptop with 16GB+ RAM and Docker Desktop (or equivalent) for local exercises
- Access to a cloud account (AWS, GCP, or Azure) for managed-service comparison labs — free-tier sufficient for most exercises
- Optional: shared Kubernetes sandbox (kind/k3d locally, or a managed cluster) for multi-component labs in Modules 4-6 and 8-10

The 25–35 hour practical estimate assumes a local Docker/kind environment. A pre-provisioned cloud or shared Kubernetes sandbox reduces setup overhead by approximately 3–5 hours.

## Architectural Approach

**"Layer Cake with Cross-Cutting AI and Trust Planes"**

The curriculum follows the data platform stack bottom-up (foundations → storage → movement → processing → serving → governance → AI/ML → production) with two cross-cutting planes woven throughout:

1. **AI plane** — AI/ML examples appear in every module, demonstrating that AI reliability depends on core data-platform disciplines. Modules 8 and 9 provide dedicated depth for ML and LLM/agent data infrastructure respectively.
2. **Trust plane** — Governance, lineage, quality, contracts, and security are introduced in context from Module 1 onward. Module 7 is where these threads converge into a unified trust architecture.

This structure teaches the central thesis: **one platform, multiple data-serving modes — analytics, operational systems, ML models, and LLM/agent applications.**

## Design Principles

### Reference Stack Positioning

The open-source/Kubernetes stack is a **teaching reference**, not the default production prescription. Every tool deep-dive retains managed-service and hybrid alternatives. The curriculum teaches decision frameworks for workload placement, not a single deployment model.

### Four-Part Teaching Pattern

Applied inside every lesson (not merely per module):

1. **Architectural problem** — why this capability exists
2. **Opinionated default** — reference implementation
3. **Decision framework** — when the default is wrong
4. **Failure modes and operational signals** — what breaks, how to observe it, how to recover

### Recurring Integration Scenario

A single end-to-end flow threads through all modules, giving learners a continuous reference:

> Source DB change → CDC event (M4) → validated & enriched processing (M5) → versioned lakehouse table (M6) → governed & lineage-tracked (M7) → ML feature materialized (M8) → RAG index updated (M9) → observable in production (M10)

### Per-Module Learner Artifacts

Each module produces a concrete artifact based on the recurring scenario, building an integrated architecture portfolio:

| Module | Artifact |
|--------|----------|
| 1 | Strategy and operating-model canvas |
| 2 | Workload-placement architecture decision record (ADR) |
| 3 | Storage decision matrix |
| 4 | Event contract and CDC design |
| 5 | Processing and orchestration design |
| 6 | Lakehouse/table/catalog design |
| 7 | Trust and policy architecture |
| 8 | Feature and training-data design |
| 9 | RAG/retrieval governance design |
| 10 | Production reference architecture and migration roadmap |

---

## Module 1: Data Strategy, Operating Model & Reference Architecture

**Color:** #68d391
**Focus:** Business outcomes, maturity model, domains, data products, ownership, platform principles
**Estimated time:** 63 min

### Lessons

#### 01-why-data-strategy-matters
- **Title:** Why Data Strategy Matters
- **Description:** Business outcomes of intentional data architecture vs accidental complexity; the cost of no strategy — broken analytics, duplicated pipelines, ungoverned AI, and organizational friction
- **Estimated minutes:** 12
- **Diagram types:** architecture
- **Has code:** false
- **Has quiz:** true

#### 02-data-domains-ownership-and-data-products
- **Title:** Data Domains, Ownership & Data Products
- **Description:** Domain-driven data design; data mesh positioned as a set of useful principles, not the default operating model; explicit comparison of centralized, federated, and hybrid ownership models — most successful platforms are hybrid; AI data ownership: training data, embedding corpora, retrieval sources, model-consumption data products
- **Estimated minutes:** 14
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 03-maturity-model-and-assessment
- **Title:** Maturity Model & Assessment
- **Description:** Assessing current state across data management, platform capabilities, governance, and AI readiness; capability gaps and maturity levels from ad-hoc to self-service; connecting assessment to investment priorities
- **Estimated minutes:** 10
- **Diagram types:** comparison, flowchart
- **Has code:** false
- **Has quiz:** true

#### 04-reference-architecture-patterns
- **Title:** Reference Architecture Patterns
- **Description:** Three reference-architecture archetypes: managed-cloud-first, Kubernetes-centric, and hybrid/regulated enterprise; composable building blocks and integration points; AI accountability — ownership of training data, embedding corpora, retrieval sources, and model-consumption data products
- **Estimated minutes:** 15
- **Diagram types:** architecture
- **Has code:** false
- **Has quiz:** true

#### 05-building-your-data-strategy-roadmap
- **Title:** Building Your Data Strategy Roadmap
- **Description:** Hands-on: translating assessment to a prioritized roadmap; produces a concrete artifact with capability gaps, owners, sequencing, investment bands, and success metrics
- **Estimated minutes:** 12
- **Diagram types:** flowchart
- **Has code:** false
- **Has quiz:** false

**Learner artifact:** Strategy and operating-model canvas — domain map, ownership model, maturity assessment, prioritized capability roadmap with success metrics.

---

## Module 2: Platform Foundations — Cloud, Kubernetes, Security & FinOps

**Color:** #4fd1c5
**Focus:** Workload placement, tenancy, IAM, secrets, network controls, cost allocation, resilience
**Estimated time:** 58 min

### Lessons

#### 01-why-platform-foundations-matter
- **Title:** Why Platform Foundations Matter
- **Description:** The platform as a product; what a data platform team actually provides; the platform interface — golden paths, templates, self-service APIs, documentation, and paved-road developer experience
- **Estimated minutes:** 10
- **Diagram types:** architecture
- **Has code:** false
- **Has quiz:** true

#### 02-kubernetes-as-data-platform-runtime
- **Title:** Kubernetes as Data Platform Runtime
- **Description:** Primary objective: workload placement and operating-model decisions, not Kubernetes mechanics; decision framework: managed service vs self-hosted on Kubernetes vs VM/bare-metal; operators, StatefulSets, and resource management as implementation detail; K8s manifests as lab artifacts supporting the decision framework
- **Estimated minutes:** 14
- **Diagram types:** architecture, comparison
- **Has code:** true
- **Has quiz:** true

#### 03-security-identity-and-network-controls
- **Title:** Security, Identity & Network Controls
- **Description:** Workload identity, IAM, secrets management (Vault, cloud-native), encryption and key management, tenant isolation patterns, network policies and boundaries; data-policy enforcement deferred to Module 7
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** true
- **Has quiz:** true

#### 04-finops-and-cost-allocation
- **Title:** FinOps & Cost Allocation
- **Description:** Tagging, showback/chargeback, rightsizing, spot/preemptible for batch workloads; unit economics: cost per pipeline run, TB processed, active topic/partition, query, feature retrieval, AI request; connecting FinOps to engineering design decisions rather than treating it as tagging hygiene
- **Estimated minutes:** 10
- **Diagram types:** comparison
- **Has code:** true
- **Has quiz:** false

#### 05-resilience-and-disaster-recovery
- **Title:** Resilience & Disaster Recovery
- **Description:** HA patterns, failure domains, cross-zone replication; replication is not disaster recovery — include restore testing, service-tiered RPO/RTO, data-consistency tradeoffs during recovery, and disaster-recovery exercises; backup verification and recovery-time validation
- **Estimated minutes:** 12
- **Diagram types:** architecture, sequence
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Workload-placement ADR — decision record for where each platform component runs (managed, K8s, hybrid), with rationale, security model, cost model, and resilience requirements.

---

## Module 3: Storage, Persistence & Table Design

**Color:** #63b3ed
**Focus:** Object storage, databases, stateful workloads, schemas, partitioning, retention, backup
**Estimated time:** 58 min

**Boundary with Module 6:**

| Module 3 covers | Module 6 covers |
|---|---|
| Object, block, file, and database storage | Iceberg/Delta/Hudi table semantics |
| OLTP vs OLAP workload design | Snapshots, time travel, compaction |
| Relational schema and indexing fundamentals | Lakehouse partition evolution |
| Durability, performance, lifecycle, backup | Query-engine interoperability |
| Managed vs self-hosted decisions | Catalog-driven table management |

### Lessons

#### 01-why-storage-architecture-matters
- **Title:** Why Storage Architecture Matters
- **Description:** Data gravity, durability guarantees, access patterns, cost tiers; AI cross-cut: retaining raw documents, model artifacts, and multimodal assets; storage decisions constrain everything downstream
- **Estimated minutes:** 10
- **Diagram types:** architecture
- **Has code:** false
- **Has quiz:** true

#### 02-object-storage-and-data-lake-foundations
- **Title:** Object Storage & Data Lake Foundations
- **Description:** S3-compatible object storage as the architectural primitive; MinIO as the local/Kubernetes reference implementation (not the implied production default); lifecycle policies, tiering, versioning, multimodal asset storage
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** true
- **Has quiz:** true

#### 03-databases-on-the-data-platform
- **Title:** Databases on the Data Platform
- **Description:** PostgreSQL as primary reference; OLTP vs OLAP workload design, connection pooling, replication topologies, backup/restore, workload isolation; managed vs operator-based deployment (CloudNativePG); MySQL as comparison rather than co-equal deep-dive
- **Estimated minutes:** 14
- **Diagram types:** comparison, architecture
- **Has code:** true
- **Has quiz:** true

#### 04-schema-design-partitioning-and-retention
- **Title:** Schema Design, Partitioning & Retention
- **Description:** Relational and file-level schema design, indexing strategies, time-based partitioning, retention policies, lifecycle automation; schema evolution scoped to relational and file-level design (event-schema compatibility → M4, table-format schema evolution → M6)
- **Estimated minutes:** 12
- **Diagram types:** flowchart
- **Has code:** true
- **Has quiz:** false

#### 05-storage-decision-framework
- **Title:** Storage Decision Framework
- **Description:** Decision tree for block vs object vs database; managed vs self-hosted; document, search, and vector storage placement at the decision-framework level (vector retrieval and RAG design reserved for M9); cost, performance, durability, and operational tradeoffs
- **Estimated minutes:** 10
- **Diagram types:** comparison, flowchart
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Storage decision matrix — maps each data type in the recurring scenario to a storage tier, with rationale for managed vs self-hosted, durability requirements, and cost projections.

---

## Module 4: Ingestion, Events & Change Data Capture

**Color:** #b794f4
**Focus:** Batch ingestion, Kafka, event design, CDC/Debezium, schema evolution, contracts
**Estimated time:** 63 min

### Lessons

#### 01-why-data-movement-architecture-matters
- **Title:** Why Data Movement Architecture Matters
- **Description:** Push vs pull, batch vs streaming ingestion; events alongside APIs, commands, batch extracts, and query federation — events are not the universal integration mechanism; AI cross-cut: keeping product/customer knowledge synchronized for retrieval systems
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 02-apache-kafka-on-kubernetes
- **Title:** Apache Kafka on Kubernetes
- **Description:** Strimzi operator, topics, partitions, consumer groups, retention; ordering guaranteed only within a partition; practical delivery target is at-least-once with idempotent consumers (not blanket "exactly once"); production topology and capacity planning; replay, backfill, dead-letter handling, idempotency keys, poison-message handling
- **Estimated minutes:** 15
- **Diagram types:** architecture, sequence
- **Has code:** true
- **Has quiz:** true

#### 03-event-design-and-schema-contracts
- **Title:** Event Design & Schema Contracts
- **Description:** Three distinct concerns: schema compatibility (Avro/Protobuf/JSON Schema evolution, forward/backward/full), semantic compatibility (field meaning, event timing, ownership, business behavior preserving consumer expectations), and data contracts (ownership, SLAs, quality expectations, classification, access policy, deprecation rules)
- **Estimated minutes:** 14
- **Diagram types:** flowchart, comparison
- **Has code:** true
- **Has quiz:** true

#### 04-change-data-capture-with-debezium
- **Title:** Change Data Capture with Debezium
- **Description:** Log-based CDC for keeping derived systems synchronized; four patterns compared separately: dual write, transactional outbox, log-based CDC, event sourcing — outbox and CDC are often complementary (application writes outbox record transactionally, Debezium captures and publishes); AI cross-cut: triggering incremental embedding updates from database changes; failure modes: slot lag, schema-breaking DDL, connector crashes, ordering violations
- **Estimated minutes:** 12
- **Diagram types:** sequence, architecture
- **Has code:** true
- **Has quiz:** false

#### 05-comparing-ingestion-and-streaming-platforms
- **Title:** Comparing Ingestion & Streaming Platforms
- **Description:** Kafka vs Redpanda vs Pulsar vs NATS vs cloud-native (Kinesis, Pub/Sub); decision framework covering ordering guarantees, latency, operational complexity, cost, and managed vs self-hosted tradeoffs
- **Estimated minutes:** 10
- **Diagram types:** comparison
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Event contract and CDC design — an event contract (schema, ownership, SLA, compatibility policy) plus a CDC design decision record for a customer-profile-to-RAG-index synchronization flow.

---

## Module 5: Processing & Data Transformation

**Color:** #ed8936
**Focus:** SQL, Spark, Flink, dbt, orchestration, batch vs stream, distributed-compute tradeoffs
**Estimated time:** 64 min

**Sequence rationale:** bounded batch transformations → unbounded/stateful processing → orchestration and reliability → engine-selection tradeoffs. This is a staff-level mental model rather than a product survey.

### Lessons

#### 01-why-processing-architecture-matters
- **Title:** Why Processing Architecture Matters
- **Description:** Unified vs specialized processing paths (replacing Lambda/Kappa with modern architectural choices); materialized views, event-driven projections, operational data products; when to share a single pipeline across batch and streaming vs maintaining separate serving paths
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 02-batch-processing-with-apache-spark
- **Title:** Batch Processing with Apache Spark
- **Description:** Spark Operator on K8s, DataFrame API, Spark SQL, large-scale transformations; explicit failure modes: data skew, small files, shuffle amplification, failed/backfilled jobs (not merely tuning topics); AI cross-cut: embedding generation pipelines, dataset preparation at scale
- **Estimated minutes:** 15
- **Diagram types:** architecture, flowchart
- **Has code:** true
- **Has quiz:** true

#### 03-stream-processing-with-apache-flink
- **Title:** Stream Processing with Apache Flink
- **Description:** Stateful streaming, windows, exactly-once semantics, Flink on K8s; event time vs processing time, watermarks, late-arriving data, state TTL, checkpoint recovery; AI cross-cut: real-time feature computation, fraud signals, customer-event enrichment
- **Estimated minutes:** 14
- **Diagram types:** sequence, state
- **Has code:** true
- **Has quiz:** true

#### 04-sql-transformation-and-pipeline-orchestration
- **Title:** SQL Transformation & Pipeline Orchestration
- **Description:** dbt as a transformation and modeling framework (testing, documentation, built-in lineage); Airflow as orchestrator (DAGs, K8s executor, scheduling); roles clarified: dbt transforms, Airflow orchestrates; comparison with at least one alternative orchestration model (asset-centric, K8s-native workflows, or managed); pipeline SLAs, retry behavior, freshness guarantees
- **Estimated minutes:** 13
- **Diagram types:** flowchart, architecture
- **Has code:** true
- **Has quiz:** false

#### 05-processing-decision-framework
- **Title:** Processing Decision Framework
- **Description:** Comparing engines by workload fit: Spark (batch), Flink (stateful streaming), dbt (SQL transforms), Ray (distributed Python and AI workloads — explicitly not a Spark/Flink substitute but the right tool for distributed Python, model training, and inference); decision dimension for language/runtime fit: SQL, JVM streaming, Python-native distributed compute, warehouse-native transformation; cost and operational complexity tradeoffs
- **Estimated minutes:** 10
- **Diagram types:** comparison
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Processing and orchestration design — pipeline architecture for the recurring scenario: which engine handles which transformation, orchestration strategy, SLA definitions, retry/backfill design.

---

## Module 6: Lakehouse, Query Serving & Data Products

**Color:** #fc8181
**Focus:** Iceberg/Delta/Hudi, catalogs, query engines, semantic layers, APIs, self-service consumption
**Estimated time:** 62 min

### Lessons

#### 01-why-the-lakehouse-matters
- **Title:** Why the Lakehouse Matters
- **Description:** Evolution from warehouse to lake to lakehouse; open formats, decoupled compute and storage, reproducibility; AI cross-cut: training-data snapshots, reproducible retrieval corpora (governed source documents, parsed chunks, embedding versions, index build metadata)
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 02-apache-iceberg-and-open-table-formats
- **Title:** Apache Iceberg & Open Table Formats
- **Description:** Iceberg deep-dive: snapshots, time travel, hidden partitioning, schema evolution, compaction; reference architecture explicitly: object store + Iceberg tables + catalog + query/processing engines; catalog selection taught alongside table-format selection — the catalog is where discoverability, table metadata, controlled evolution, and multi-engine coordination converge; Delta Lake and Hudi as comparisons with format-selection criteria
- **Estimated minutes:** 15
- **Diagram types:** architecture, comparison
- **Has code:** true
- **Has quiz:** true

#### 03-query-engines-and-analytical-serving
- **Title:** Query Engines & Analytical Serving
- **Description:** Trino for federated queries, DuckDB for embedded analytics, engine placement decisions, performance tuning, caching; workload management and guardrails: queueing, concurrency limits, source-system protection for federated queries, query-cost controls, tenant isolation
- **Estimated minutes:** 13
- **Diagram types:** architecture, comparison
- **Has code:** true
- **Has quiz:** true

#### 04-data-products-and-self-service-consumption
- **Title:** Data Products & Self-Service Consumption
- **Description:** Data-as-a-product: a data product needs an explicit contract — owner, interface/schema, freshness/SLA, quality expectations, access policy, cost attribution, support model, deprecation lifecycle; a semantic layer alone does not make a data product; discovery, self-service analytics; bridge to Module 7 governance
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** false

#### 05-lakehouse-decision-framework
- **Title:** Lakehouse Decision Framework
- **Description:** Lakehouse vs warehouse is rarely binary; practical enterprise pattern: warehouse for governed BI and high-concurrency interactive SQL, lakehouse for open data, multi-engine access, large-scale processing, reproducible datasets, and interoperability, hybrid where each serves its comparative strength; catalog-driven table management
- **Estimated minutes:** 10
- **Diagram types:** comparison, flowchart
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Lakehouse/table/catalog design — table format selection, catalog architecture, query-engine placement, data-product contract for one domain in the recurring scenario.

---

## Module 7: Trust Plane — Quality, Lineage, Catalog & Governance

**Color:** #ecc94b
**Focus:** Data contracts, active metadata, OpenLineage, catalogs, tests, SLAs, privacy, policy enforcement
**Estimated time:** 63 min

**Relationship to earlier trust touchpoints:** Modules 1-6 introduce trust concepts in context (ownership in M1, schema contracts in M4, pipeline SLAs in M5, table-level governance in M6). Module 7 is where those threads converge into a unified trust architecture — the dedicated platform capabilities that make per-module trust practices enforceable and observable.

### Lessons

#### 01-why-trust-is-a-platform-concern
- **Title:** Why Trust Is a Platform Concern
- **Description:** The cost of untrustworthy data — broken dashboards, poisoned models, compliance failures; trust as an architectural property, not a team; data contracts as the foundational mechanism; the trust plane connects quality, lineage, catalog, and governance into a coherent system
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 02-data-quality-observability-and-testing
- **Title:** Data Quality, Observability & Testing
- **Description:** Great Expectations as reference framework, Soda as comparison; quality checks, freshness, volume, schema drift, lineage, and operational alerts taught as one asset-health system; quality gates embedded in pipelines (not bolted on after); failure modes: silent data corruption, schema drift undetected, SLA breach without alerting, false positives drowning alerts, quality checks passing on empty datasets
- **Estimated minutes:** 14
- **Diagram types:** flowchart, sequence
- **Has code:** true
- **Has quiz:** true

#### 03-data-lineage-with-openlineage
- **Title:** Data Lineage with OpenLineage
- **Description:** OpenLineage specification and Marquez as reference implementation; dataset/job lineage as the dependable baseline; column-level lineage where supported — depends on emitting systems, SQL parsing, and metadata integrations (do not imply universal column-level coverage); impact analysis, cross-system lineage (Spark → Iceberg → Trino → dashboard); AI cross-cut: tracing training-data provenance from source through transformation to model consumption
- **Estimated minutes:** 13
- **Diagram types:** architecture, flowchart
- **Has code:** true
- **Has quiz:** true

#### 04-data-catalogs-and-active-metadata
- **Title:** Data Catalogs & Active Metadata
- **Description:** DataHub as reference, OpenMetadata as comparison; discovery, classification, tagging, ownership registration, usage analytics; the catalog as the trust index — connecting quality results, lineage graphs, contracts, and access policies in one interface; distinction: metadata/catalog visibility vs actual policy enforcement (catalogs describe and expose policy context; enforcement occurs in the query engine, storage layer, API, or retrieval path)
- **Estimated minutes:** 12
- **Diagram types:** architecture, comparison
- **Has code:** true
- **Has quiz:** false

#### 05-governance-privacy-and-policy-enforcement
- **Title:** Governance, Privacy & Policy Enforcement
- **Description:** Access control at the data layer (row/column/tag-based), PII detection and masking, data residency requirements, GDPR/regulatory retention, retention/deletion propagation across systems, policy-as-code enforcement; policy enforcement points across lakehouse, APIs, and vector retrieval; AI cross-cut: PII-aware retrieval, embedding-corpus access control, auditability of what data influenced which model output
- **Estimated minutes:** 12
- **Diagram types:** flowchart, architecture
- **Has code:** true
- **Has quiz:** true

**Learner artifact:** Trust and policy architecture — quality gate design, lineage topology, catalog integration plan, access-control model, and policy enforcement points for the recurring scenario.

---

## Module 8: ML Data Infrastructure

**Color:** #68d391
**Focus:** Feature engineering, offline/online serving, feature stores, training-data lineage, model-data consistency
**Estimated time:** 63 min

**Scope boundary:** This module owns training-data reproducibility, features, point-in-time correctness, and data lineage. It does not cover model registry, deployment, or experiment tracking except at integration points where ML data infrastructure connects to broader MLOps.

### Lessons

#### 01-why-ml-needs-dedicated-data-infrastructure
- **Title:** Why ML Needs Dedicated Data Infrastructure
- **Description:** Training-serving skew, feature consistency, the gap between notebook experiments and production predictions; the data problems that break ML systems are not model problems — they are feature, freshness, correctness, and reproducibility problems
- **Estimated minutes:** 12
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 02-feature-engineering-pipelines
- **Title:** Feature Engineering Pipelines
- **Description:** Batch and streaming feature computation, point-in-time correctness, backfilling, managing feature dependencies; connecting to processing engines from M5 (Spark for batch features, Flink for streaming features); feature transformation patterns
- **Estimated minutes:** 14
- **Diagram types:** flowchart, sequence
- **Has code:** true
- **Has quiz:** true

#### 03-feature-stores-with-feast
- **Title:** Feature Stores with Feast
- **Description:** Feast as reference: offline store (historical joins), online store (low-latency serving), materialization pipeline; registry, feature services, push vs pull sources; comparison with Tecton and platform-native alternatives; failure modes: materialization lag causing stale features, online/offline skew, registry drift, cold-start with missing feature values
- **Estimated minutes:** 15
- **Diagram types:** architecture, sequence
- **Has code:** true
- **Has quiz:** true

#### 04-training-data-labels-and-model-traceability
- **Title:** Training Data, Labels & Model Traceability
- **Description:** Dataset versioning and snapshots (connecting to Iceberg time-travel from M6), reproducibility, label management, data splits, bias detection at the data layer; the link from immutable training snapshot → feature definitions → model version / model registry reference; training-data lineage from source through feature to model
- **Estimated minutes:** 12
- **Diagram types:** flowchart, architecture
- **Has code:** true
- **Has quiz:** false

#### 05-ml-data-decision-framework
- **Title:** ML Data Decision Framework
- **Description:** When you need a feature store vs when direct queries suffice; online-only vs offline-only vs full feature platform; model-data consistency patterns; operational complexity vs correctness guarantees; connecting ML data governance to the trust plane (M7)
- **Estimated minutes:** 10
- **Diagram types:** comparison, flowchart
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Feature and training-data design — feature store architecture, feature computation pipeline, training-data versioning strategy, and traceability chain for the recurring scenario.

---

## Module 9: LLM & Agent Data Infrastructure

**Color:** #4fd1c5
**Focus:** RAG pipelines, vector/hybrid search, document processing, embeddings, knowledge freshness, evaluation, retrieval governance
**Estimated time:** 66 min

**Boundary with Module 8:**

| Module 8 (ML Data) | Module 9 (LLM & Agent Data) |
|---|---|
| Structured/tabular features | Unstructured documents, multimodal assets |
| Point-in-time feature correctness | Knowledge freshness and staleness |
| Online/offline feature serving | Vector search and hybrid retrieval |
| Training dataset versioning | Embedding versioning and index management |
| Feature store architecture | RAG pipeline architecture |
| Model-data consistency | Retrieval-generation alignment |

### Lessons

#### 01-why-llm-applications-need-data-infrastructure
- **Title:** Why LLM Applications Need Data Infrastructure
- **Description:** Knowledge freshness, hallucination grounding, the retrieval problem; LLM data infrastructure is not a separate platform — it consumes the same governed data products through a different serving path; the data problems that break LLM applications are retrieval, freshness, access control, and evaluation problems
- **Estimated minutes:** 12
- **Diagram types:** architecture
- **Has code:** false
- **Has quiz:** true

#### 02-document-processing-and-embedding-pipelines
- **Title:** Document Processing & Embedding Pipelines
- **Description:** Parsing (PDF, HTML, structured docs), normalization, chunking strategies (fixed, semantic, hierarchical), embedding generation, versioning embeddings as data artifacts; connecting to CDC (M4) for incremental updates, processing engines (M5) for scale; failure modes: chunk boundary splitting key information, embedding version mismatch between index and query-time model, parsing failures on edge-case formats
- **Estimated minutes:** 15
- **Diagram types:** flowchart, sequence
- **Has code:** true
- **Has quiz:** true

#### 03-vector-search-and-retrieval-architecture
- **Title:** Vector Search & Retrieval Architecture
- **Description:** Vector databases (pgvector, Milvus, Weaviate, Qdrant), hybrid search (dense + sparse + keyword), reranking, index management and rebuild strategies; decision framework: dedicated vector DB vs vector-enabled database vs search engine; failure modes: index staleness, embedding drift, query-index model mismatch
- **Estimated minutes:** 14
- **Diagram types:** architecture, comparison
- **Has code:** true
- **Has quiz:** true

#### 04-rag-pipeline-design-and-evaluation
- **Title:** RAG Pipeline Design & Evaluation
- **Description:** End-to-end RAG architecture; two-layered evaluation stack — retrieval layer: recall@k, precision@k, ranking quality, index freshness; end-to-end layer: groundedness, citation correctness, answer correctness, safety, authorization leakage, task success, latency, and cost; evaluation datasets, systematic testing of retrieval and generation; failure modes: context poisoning, stale knowledge, retrieval drift, chunk boundary artifacts
- **Estimated minutes:** 13
- **Diagram types:** flowchart, architecture
- **Has code:** true
- **Has quiz:** true

#### 05-agent-data-patterns-and-retrieval-governance
- **Title:** Agent Data Patterns & Retrieval Governance
- **Description:** Agent memory architecture — ephemeral, durable, and shared memory as distinct categories (not one generic "memory store"); tool-data boundaries, multi-step retrieval; retrieval authorization vs action authorization — an agent may read a document but not execute a tool action derived from it; access control at retrieval time, retrieval lineage, audit records for both retrieval and actions; prompt/context observability; connecting to the trust plane (M7)
- **Estimated minutes:** 12
- **Diagram types:** architecture, sequence
- **Has code:** true
- **Has quiz:** false

**Learner artifact:** RAG/retrieval governance design — document processing pipeline, embedding versioning strategy, retrieval architecture, evaluation framework, and authorization model for the recurring scenario.

---

## Module 10: Production Architecture & Platform Evolution

**Color:** #63b3ed
**Focus:** Multi-tenancy, reliability, SRE, cost, migration, reference architectures, platform roadmaps
**Estimated time:** 63 min

### Lessons

#### 01-why-production-data-platforms-are-different
- **Title:** Why Production Data Platforms Are Different
- **Description:** Day-2 operations, what changes at scale; the gap between "it works in dev" and "it runs in production" — reliability, cost, multi-tenancy, observability, and organizational scaling; production reveals integration failures that component testing cannot
- **Estimated minutes:** 10
- **Diagram types:** architecture
- **Has code:** false
- **Has quiz:** true

#### 02-reference-architectures
- **Title:** Reference Architectures
- **Description:** Three composable blueprints from Modules 1-9: managed-cloud-first, Kubernetes-centric, and hybrid/regulated enterprise; the cross-module scenario end-to-end (source change → CDC → processing → lakehouse → analytics/ML/retrieval); tradeoffs between blueprints for different organizational contexts
- **Estimated minutes:** 15
- **Diagram types:** architecture, flowchart
- **Has code:** false
- **Has quiz:** true

#### 03-multi-tenancy-reliability-and-sre-for-data
- **Title:** Multi-Tenancy, Reliability & SRE for Data
- **Description:** Tenant isolation patterns (namespace, cluster, logical); data-native SLIs: freshness, completeness, pipeline success rate, consumer lag, data-quality pass rate, query availability, recovery time, retrieval-index freshness; error budgets, burn-rate alerting, dependency-aware incident response; "data incident" runbooks alongside infrastructure incidents; chaos engineering for data pipelines
- **Estimated minutes:** 14
- **Diagram types:** architecture, comparison
- **Has code:** true
- **Has quiz:** true

#### 04-cost-optimization-at-scale
- **Title:** Cost Optimization at Scale
- **Description:** Unit economics revisited (from M2) at platform scale, storage tiering automation, compute right-sizing, spot/preemptible for batch vs reserved for streaming, chargeback models; cost-aware architecture decisions — choosing managed vs self-hosted based on total cost of ownership, not just compute price
- **Estimated minutes:** 12
- **Diagram types:** comparison, flowchart
- **Has code:** true
- **Has quiz:** false

#### 05-migration-strategies-and-platform-roadmaps
- **Title:** Migration Strategies & Platform Roadmaps
- **Description:** Incremental migration patterns (strangler fig, parallel run, shadow mode); migration exit criteria: validation thresholds, rollback plan, ownership transfer, decommission milestones; platform evolution over 6-18 months, team structure and operating model, building the business case, success metrics; hands-on: drafting a platform evolution roadmap
- **Estimated minutes:** 12
- **Diagram types:** flowchart
- **Has code:** false
- **Has quiz:** true

**Learner artifact:** Production reference architecture and migration roadmap — composable architecture selection, SLI/SLO definitions, migration exit criteria, and phased platform evolution plan.

---

## Curriculum Summary

| # | Module | Lessons | Est. Time | Key Topics |
|---|--------|---------|-----------|------------|
| 1 | Data Strategy, Operating Model & Reference Architecture | 5 | 63 min | Strategy, domains, ownership, data products, maturity, roadmaps |
| 2 | Platform Foundations — Cloud, Kubernetes, Security & FinOps | 5 | 58 min | Workload placement, security, FinOps, unit economics, resilience, DR |
| 3 | Storage, Persistence & Table Design | 5 | 58 min | Object storage, databases, OLTP/OLAP, schema design, decision framework |
| 4 | Ingestion, Events & Change Data Capture | 5 | 63 min | Kafka/Strimzi, event design, schema contracts, CDC/Debezium, platform comparison |
| 5 | Processing & Data Transformation | 5 | 64 min | Spark, Flink, dbt, Airflow, unified vs specialized processing, Ray positioning |
| 6 | Lakehouse, Query Serving & Data Products | 5 | 62 min | Iceberg, catalogs, Trino/DuckDB, data products, lakehouse vs warehouse |
| 7 | Trust Plane — Quality, Lineage, Catalog & Governance | 5 | 63 min | Great Expectations, OpenLineage/Marquez, DataHub, policy enforcement |
| 8 | ML Data Infrastructure | 5 | 63 min | Feature engineering, Feast, training data management, ML-data consistency |
| 9 | LLM & Agent Data Infrastructure | 5 | 66 min | Document processing, embeddings, vector search, RAG, retrieval governance |
| 10 | Production Architecture & Platform Evolution | 5 | 63 min | Reference architectures, multi-tenancy, SRE, cost optimization, migration |
| **Total** | | **50** | **~10h 23min** | |

**Instructional runtime:** ~10h 23min
**Estimated practical completion time:** 25–35 hours (includes environment setup, code labs, architecture exercises, debugging, and review)

## Module Ordering Rationale

The sequence follows three phases:

1. **Foundation (Modules 1-3):** Strategy, platform runtime, and storage establish the base architectural decisions before any data moves.
2. **Movement and Serving (Modules 4-6):** Ingestion, processing, and lakehouse teach how data flows through the platform into consumable forms.
3. **Trust and Consumption (Modules 7-10):** Governance converges the trust threads from earlier modules, then ML and LLM infrastructure show two distinct consumption paths built on the same governed platform, culminating in production architecture.

The AI plane threads through all modules via cross-cut examples. The trust plane is introduced in M1 (ownership), developed through M4 (contracts), M5 (SLAs), M6 (governance), formalized in M7, and applied in M8 (training-data lineage), M9 (retrieval governance), and M10 (data SLIs).

The recurring integration scenario provides continuity: source change → CDC → processing → lakehouse → trust → ML features → RAG index → production observability.

---

## Capstone Assessment

### Portfolio Review

Completion requires submitting the ten learner artifacts as an integrated architecture portfolio. The artifacts are not graded independently — they are reviewed as a coherent platform design where decisions in earlier artifacts constrain and inform later ones.

**Completion criteria:**

| Dimension | Requirement |
|-----------|-------------|
| Completeness | All 10 artifacts present, addressing the recurring integration scenario |
| Internal consistency | Storage decisions (M3) align with processing choices (M5); governance model (M7) is enforced in ML (M8) and retrieval (M9) designs; reference architecture (M10) composes the individual designs |
| Decision rationale | Each artifact includes explicit tradeoff reasoning, not just a chosen tool — the "decision framework" and "when the default is wrong" elements from the four-part teaching pattern |
| Failure awareness | Each artifact identifies at least two realistic failure modes and the operational signals that would detect them |
| Production readiness | The Module 10 artifact ties the portfolio together with SLI/SLO definitions, migration exit criteria, and a phased evolution plan |

### Quiz Performance

Learners should achieve a passing score (70%+) across all module quizzes. Quizzes test architectural reasoning and decision-making, not tool-specific trivia.

### Self-Assessment

After completing the portfolio, learners answer:

1. For the recurring scenario, trace a data quality issue from source through every downstream consumer (dashboard, ML prediction, LLM response). Where would it be detected? Where would it not?
2. If the organization needed to migrate from the Kubernetes-centric reference architecture to managed-cloud-first, which artifacts would change and which would remain stable?
3. What is the most expensive architectural decision in the portfolio, and what would a cost-constrained alternative look like?

---

## Reference Environment

### Assumed Setup

The curriculum assumes a **local-first development environment** with cloud access for comparison labs:

| Component | Local (default) | Cloud (optional) |
|-----------|----------------|-------------------|
| Container runtime | Docker Desktop or Podman | — |
| Kubernetes | kind or k3d (single-node) | GKE/EKS/AKS sandbox |
| Object storage | MinIO (containerized) | S3/GCS/ADLS |
| Databases | PostgreSQL via Docker | Cloud SQL / RDS |
| Kafka | Strimzi on kind | Confluent Cloud / MSK |
| Processing | Spark/Flink via Docker | Dataproc / EMR / managed Flink |
| Vector DB | pgvector via Docker | Managed vector service |

### Impact on Practical Completion Time

| Environment | Est. Practical Time | Notes |
|-------------|-------------------|-------|
| Local Docker/kind | 30–35 hours | Includes ~5 hours of environment setup and troubleshooting |
| Pre-provisioned cloud sandbox | 25–28 hours | Setup time reduced; managed services simplify multi-component labs |
| Hybrid (local dev + cloud comparison) | 28–32 hours | Recommended for the fullest learning experience |

Labs that require managed-service comparison (Lessons M2-02, M3-05, M5-05, M6-05) can be completed with documentation review and architecture diagrams if cloud access is unavailable.

---

## Versioning Policy

### Curriculum Versioning

The curriculum follows **semantic versioning** scoped to content impact:

| Change type | Version bump | Examples |
|-------------|-------------|----------|
| Tool version updates, link fixes, typo corrections | Patch (1.0.x) | Strimzi 0.40 → 0.42, updated CLI flags |
| Lesson content revision, diagram updates, quiz changes | Minor (1.x.0) | Rewriting a lesson to cover Iceberg v3 features, adding a new failure mode |
| Module restructuring, lesson addition/removal, scope change | Major (x.0.0) | Adding a Module 11, splitting a module, changing the recurring scenario |

### Review Cadence

| Frequency | Action |
|-----------|--------|
| Quarterly | Review reference-stack versions (Kafka, Spark, Flink, Iceberg, Feast, vector DBs); update version-specific content; check for deprecated APIs or renamed concepts |
| Semi-annually | Review module structure against industry shifts; assess whether new categories (e.g., a new class of AI data infrastructure) warrant lesson or module changes |
| Annually | Full curriculum review: validate architectural patterns against production experience; refresh reference architectures; update practical completion estimates based on tooling maturity |

### Fast-Moving Areas

These topics are expected to require the most frequent updates:

- **Module 9 (LLM & Agent Data):** RAG patterns, vector DB capabilities, evaluation frameworks, and agent architectures are evolving rapidly. Expect minor-version updates quarterly.
- **Module 6 (Lakehouse):** Iceberg catalog ecosystem (Nessie, Polaris, Unity) and query-engine integrations are consolidating. Expect updates as the catalog landscape stabilizes.
- **Module 8 (ML Data):** Feature store and ML data tooling is maturing but shifting toward platform-native solutions. Monitor Feast vs managed alternatives.
- **Module 2 (Platform Foundations):** Kubernetes operator ecosystem and FinOps tooling evolve steadily but rarely break architectural patterns.

### Version Tracking

Each `meta.json` file includes a `version` field. The curriculum summary table in this spec is updated with each major or minor version bump. The spec itself is versioned alongside the content.
