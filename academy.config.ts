export const academy = {
  name: "Modern Data & AI Platform Academy",
  slug: "data-strategy",
  description: "The Modern Data and AI Platform: Foundations to Production",
  tagline: "One platform, multiple data-serving modes — analytics, operations, ML, and LLM applications",

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
- Use \`\`\`mermaid code blocks for architecture diagrams, flowcharts, and sequence diagrams
- Use \`\`\`python code blocks for code examples
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

  accentColor: "#63b3ed",

  moduleColors: [
    "#68d391", "#4fd1c5", "#63b3ed", "#b794f4",
    "#ed8936", "#fc8181", "#ecc94b", "#68d391",
    "#4fd1c5", "#63b3ed",
  ],

  presentation: {
    theme: "academy",
    header: "Modern Data & AI Platform Academy",
  },
} as const;

export const storageKeys = {
  progress: `${academy.slug}-progress`,
  notes: `${academy.slug}-notes`,
  chat: `${academy.slug}-chat`,
  theme: `${academy.slug}-theme`,
  ttsVoice: `${academy.slug}-tts-voice`,
} as const;
