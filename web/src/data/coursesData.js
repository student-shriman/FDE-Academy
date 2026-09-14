// Structured Curriculum Data for AI Masterclass and Forward Deployed AI Architect (FDE)

export const coursesData = {
  'ai-masterclass': {
    id: 'ai-masterclass',
    title: 'AI Masterclass: Foundations to Production Generative AI',
    shortTitle: 'AI Masterclass',
    badge: 'Core Foundation to Advanced',
    tagline: 'Master LLMs, Prompt Reasoning, Vector Search, Enterprise RAG, Agentic Systems & Fine-Tuning',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    borderGlow: 'border-blue-500/30',
    accentColor: 'blue',
    duration: '12 Weeks',
    estimatedHours: '80+ Hours',
    level: 'Intermediate → Advanced',
    modulesCount: 8,
    topicsCount: 48,
    labsCount: 10,
    capstone: 'Autonomous Multi-Agent Enterprise Research Copilot with Hybrid RAG & Evaluation Pipeline',
    description: 'A comprehensive, engineering-first masterclass on modern Generative AI. Designed for software engineers, data scientists, and ML practitioners seeking to bridge theoretical machine learning and production-grade LLM applications.',
    targetRoles: [
      'Generative AI Engineer',
      'LLM Application Developer',
      'AI/ML Systems Engineer',
      'Applied AI Researcher'
    ],
    prerequisites: [
      'Proficiency in Python & async programming',
      'Familiarity with REST APIs & web architecture',
      'Basic intuition of linear algebra and probability'
    ],
    highlights: [
      'Attention & Transformer Internals from Scratch',
      'Structured Outputs & Chain-of-Thought Reasoning',
      'Dense/Sparse Vector Search & HNSW Indexing',
      'Production Hybrid RAG with Re-ranking & Context Compression',
      'Multi-Agent State Graphs (LangGraph & CrewAI)',
      'PEFT & LoRA / QLoRA Model Fine-Tuning with Unsloth',
      'Automated Evaluation & LLMOps Guardrails'
    ],
    modules: [
      {
        id: 'aim-m1',
        moduleNumber: 1,
        title: 'Foundations of Modern LLMs & Generative AI',
        duration: 'Week 1–2',
        hours: 10,
        description: 'Deep dive into Transformer architectures, self-attention mechanics, tokenization, context windows, and modern frontier model families.',
        topics: [
          'Transformer Architecture: Self-Attention, Multi-Head Attention & Positional Encoding',
          'Tokenization Algorithms: BPE, WordPiece, and Token Cost Economics',
          'Autoregressive Generation: Temperature, Top-p, Top-k, and Repetition Penalties',
          'Frontier Model Landscape: GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.3, and DeepSeek R1',
          'Context Windows: KV Caching, Rotary Embeddings (RoPE), and Needle-in-a-Haystack Benchmarks'
        ],
        lab: 'Build a custom Byte-Pair Tokenizer from scratch and visualize multi-head attention weights on sample prompts.',
        tools: ['PyTorch', 'Transformers', 'Tiktoken', 'Matplotlib']
      },
      {
        id: 'aim-m2',
        moduleNumber: 2,
        title: 'Advanced Prompt Engineering & Structured Reasoning',
        duration: 'Week 3',
        hours: 8,
        description: 'Systematic techniques for steering LLMs reliably: Chain-of-Thought, ReAct, Tree-of-Thoughts, and strict JSON/Pydantic schema validation.',
        topics: [
          'Core Steering: Zero-Shot, Few-Shot In-Context Learning, and System Framing',
          'Reasoning Frameworks: Chain-of-Thought (CoT), Self-Consistency, and Tree-of-Thoughts',
          'ReAct Pattern: Interleaving Reasoning Steps with Action Observations',
          'Structured Output Guarantees: JSON Schema mode, Pydantic validation, and Instructor',
          'System Prompt Architecture: Contextual delimiters, security sandboxing, and persona anchoring'
        ],
        lab: 'Construct a resilient data extraction pipeline with schema enforcement, automated retry corrections, and schema drift detection.',
        tools: ['Instructor', 'Pydantic v2', 'OpenAI SDK', 'Anthropic SDK']
      },
      {
        id: 'aim-m3',
        moduleNumber: 3,
        title: 'Embeddings & High-Dimensional Vector Search',
        duration: 'Week 4',
        hours: 10,
        description: 'Mathematical foundations and hands-on systems for vector representations, similarity metrics, and production vector databases.',
        topics: [
          'Vector Embeddings: Dense representations, sentence transformers, and semantic geometry',
          'Similarity Metrics: Cosine similarity, Dot Product, Euclidean Distance, and normalization',
          'Approximate Nearest Neighbor (ANN): HNSW graph indexing, IVF, and product quantization',
          'Vector Database Architecture: Qdrant, Pinecone, Chroma, and pgvector in PostgreSQL',
          'Vector Index Optimization: Payload filtering, sharding, and memory-mapped indexes'
        ],
        lab: 'Benchmark ANN latency vs recall on a 1,000,000 document embedding collection using Qdrant and HNSW tuning.',
        tools: ['Qdrant', 'Sentence-Transformers', 'pgvector', 'FAISS']
      },
      {
        id: 'aim-m4',
        moduleNumber: 4,
        title: 'Enterprise Retrieval-Augmented Generation (RAG)',
        duration: 'Week 5–6',
        hours: 14,
        description: 'Moving beyond naive RAG: sophisticated chunking, hybrid search (BM25 + Dense), re-ranking, query transformation, and citation grounding.',
        topics: [
          'Advanced Chunking: Recursive character splitting, semantic boundary detection, parent-document retrieval',
          'Hybrid Search: Combining BM25 keyword matching with dense semantic vectors via Reciprocal Rank Fusion (RRF)',
          'Re-Ranking: Cohere Rerank and Cross-Encoder architectures for high-precision context filtering',
          'Query Transformation: Hypothetical Document Embeddings (HyDE), sub-query generation, and query expansion',
          'Context Compression & Lost-in-the-Middle mitigation strategies'
        ],
        lab: 'Deploy a production-grade multi-format financial PDF QA pipeline with tables, citations, and source verification.',
        tools: ['LangChain', 'LlamaIndex', 'Cohere Rerank', 'BM25Okapi']
      },
      {
        id: 'aim-m5',
        moduleNumber: 5,
        title: 'Agentic Systems & Multi-Agent Orchestration',
        duration: 'Week 7–8',
        hours: 14,
        description: 'Building autonomous, stateful agentic workflows using function calling, tool use, memory systems, and collaborative multi-agent teams.',
        topics: [
          'Tool Use & Function Calling: OpenAPI spec bindings and sandboxed execution',
          'Stateful Graph Architecture: Directed cyclic graphs with LangGraph and checkpointing',
          'Multi-Agent Collaboration: Supervisor models, hierarchical planning, and peer delegation',
          'Agent Memory Architectures: Short-term scratchpads, episodic buffer memory, and long-term vector recall',
          'Human-in-the-Loop (HITL): Approval gates, step rollback, and supervised agent steering'
        ],
        lab: 'Develop an autonomous coding and bug-fixing agent with terminal access, test execution, and git branch isolation.',
        tools: ['LangGraph', 'CrewAI', 'AutoGen', 'Docker Sandbox']
      },
      {
        id: 'aim-m6',
        moduleNumber: 6,
        title: 'Fine-Tuning, LoRA & Domain Adaptation',
        duration: 'Week 9',
        hours: 10,
        description: 'Adapting open-weights models to specialized domains using Parameter-Efficient Fine-Tuning (PEFT), LoRA, QLoRA, and preference alignment.',
        topics: [
          'When to Fine-Tune vs RAG: Capability steering vs factual knowledge injection',
          'Parameter-Efficient Fine-Tuning: LoRA, QLoRA, rank matrices, and 4-bit quantization',
          'Dataset Preparation: Instruction curating, synthetic dataset generation, and deduplication',
          'Training Execution: Unsloth, Hugging Face SFTTrainer, and GPU memory optimization',
          'Alignment: Direct Preference Optimization (DPO) and RLHF concepts'
        ],
        lab: 'Fine-tune a 7B Llama/Mistral model on enterprise SQL generation, achieving 90%+ execution accuracy on complex joins.',
        tools: ['Unsloth', 'Hugging Face PEFT', 'BitsAndBytes', 'TRL']
      },
      {
        id: 'aim-m7',
        moduleNumber: 7,
        title: 'Multimodal AI & Vision-Language Processing',
        duration: 'Week 10',
        hours: 8,
        description: 'Integrating vision, audio, and multimodal LLMs for document understanding, charts, visual grounding, and real-time voice streaming.',
        topics: [
          'Vision-Language Models (VLMs): Visual tokens, cross-attention, and high-resolution patch slicing',
          'Visual Document QA: Processing diagrams, complex invoices, scanned receipts, and engineering schematics',
          'Visual Grounding: Object detection bounding boxes, spatial coordinates, and visual pointing',
          'Audio Streaming: Real-time STT with Whisper and bidirectional live streaming (Gemini 2.0 Live API)',
          'Multimodal RAG: Indexing image clips, diagrams, and video timestamps alongside text'
        ],
        lab: 'Build an engineering schematic analysis assistant that reads CAD/architecture diagrams and flags compliance issues.',
        tools: ['Gemini 1.5 Pro Multimodal', 'GPT-4o Vision', 'Whisper', 'ColPali']
      },
      {
        id: 'aim-m8',
        moduleNumber: 8,
        title: 'Production LLMOps, Evaluation & Guardrails',
        duration: 'Week 11–12',
        hours: 12,
        description: 'Deploying robust, secure, and observable AI services at scale. Automated evaluation benchmarks, red-teaming, latency optimization, and cost governance.',
        topics: [
          'Automated RAG Evaluation: Faithfulness, Answer Relevance, and Context Precision using Ragas',
          'Security & Guardrails: Prompt injection defense, jailbreak mitigation (Llama Guard, NeMo Guardrails)',
          'High-Throughput Model Serving: vLLM, PagedAttention, continuous batching, and Tensor Parallelism',
          'Observability & Telemetry: Distributed tracing with OpenTelemetry, Langfuse, and Arize Phoenix',
          'Token Economics & Cost Optimization: Semantic caching, prompt compression, and dynamic fallback routing'
        ],
        lab: 'Capstone Project: Ship an end-to-end Enterprise Copilot with automated regression testing, CI/CD evaluation gates, and live tracing.',
        tools: ['Ragas', 'vLLM', 'Langfuse', 'NeMo Guardrails', 'OpenTelemetry']
      }
    ]
  },

  'fde': {
    id: 'fde',
    title: 'Forward Deployed AI Architect (FDE)',
    shortTitle: 'FDE AI Architect',
    badge: 'Flagship Enterprise Program',
    tagline: 'Bridging Raw AI to Mission-Critical Enterprise Production Systems at Scale',
    gradient: 'from-amber-500 via-amber-600 to-orange-600',
    borderGlow: 'border-amber-500/30',
    accentColor: 'amber',
    duration: '36 Weeks',
    estimatedHours: '400+ Hours',
    level: 'Senior Engineer → AI Architect',
    modulesCount: 13,
    topicsCount: 61,
    labsCount: 223,
    capstone: '17 Production Portfolio Deliverables with Client PoV-to-Production Lifecycle Gates',
    description: 'A 36-week, production-hardened engineering curriculum. Teaches software engineers how to operate as elite Forward Deployed Engineers at top AI institutions (Palantir, OpenAI, Anthropic, Scale AI). Covers production Python, high-throughput enterprise data pipelines, Kubernetes, AI security, and client engagement lifecycles.',
    targetRoles: [
      'Forward Deployed Engineer (FDE)',
      'Enterprise AI Solutions Architect',
      'Staff AI Systems Engineer',
      'Technical Engagement Lead'
    ],
    prerequisites: [
      'Strong backend software engineering background',
      'Solid understanding of distributed systems & databases',
      'Comfort with Linux terminal, Docker, and CI/CD pipelines'
    ],
    highlights: [
      'Phase 0 Fully Live: 30 In-Depth Chapters with Verified Code & 16 Custom Diagrams',
      'The 4-Stage Delivery Lifecycle: PoV ➔ PoC ➔ MVP ➔ Production',
      'The 5 Pillars: Technical Depth, Customer Empathy, Velocity, Rigor, and ROI',
      'Enterprise Identity & Access Governance (OAuth2, Keycloak, RBAC/ABAC)',
      'High-Throughput Distributed Data Architecture (Kafka, Redis, PostgreSQL)',
      'Kubernetes GPU Workloads, Helm Charts & Infrastructure as Code (Terraform)',
      'Enterprise Observability, Distributed Tracing & Reliability Engineering'
    ],
    phases: [
      {
        phaseId: 'P0',
        title: 'FDE Foundations & Engineering Baseline',
        weeks: 'Weeks 1–3',
        hours: 30,
        status: 'Available & Complete',
        chaptersCount: 30,
        description: 'The core engineering baseline: FDE operating model, asynchronous Python (AsyncIO), production FastAPI, SOLID principles, 12-factor apps, and testing strategies.',
        topics: [
          '0.0 FDE Role & Responsibilities (Genesis at Palantir, competency model, solutions engineering overlap)',
          '0.0 FDE Delivery Lifecycle (PoV to Production gates, business-process mapping, vertical slices)',
          '0.1 Production Python (AsyncIO, concurrency, connection pooling, Pydantic v2, structured logging)',
          '0.2 Backend Engineering (FastAPI architecture, routers, middleware, SSE streaming, OpenAPI contracts)',
          '0.3 Engineering Standards (SOLID design, 12-factor apps, trunk-based Git, unit & integration testing)'
        ],
        deliverable: 'Async FastAPI Production Service with Connection Pooling, Health Probes & Streaming SSE'
      },
      {
        phaseId: 'P1',
        title: 'AI System Design & Scalability',
        weeks: 'Weeks 4–6',
        hours: 32,
        status: 'Curriculum Outlined',
        chaptersCount: 17,
        description: 'Architecting distributed, scalable AI systems. Latency budgets, TTFT optimization, caching topologies, and model routing.',
        topics: [
          'Latency Budgets & Time-to-First-Token (TTFT) calculations',
          'Hierarchical Caching: Semantic, prompt-level, and response caching',
          'Load Balancing & Dynamic Fallback Routing across cloud LLM providers',
          'Asynchronous Queue Processing for long-horizon batch inferences'
        ],
        deliverable: 'High-Throughput LLM Gateway with Dynamic Provider Failover & Latency-Aware Routing'
      },
      {
        phaseId: 'P2',
        title: 'Enterprise Identity & Access Governance',
        weeks: 'Weeks 7–9',
        hours: 30,
        status: 'Curriculum Outlined',
        chaptersCount: 16,
        description: 'Securing enterprise AI pipelines: OAuth2, OpenID Connect, Keycloak, Role-Based (RBAC) and Attribute-Based Access Control (ABAC).',
        topics: [
          'OAuth2.0 / OIDC flows in enterprise multi-tenant architectures',
          'Fine-grained data entitlements & metadata permission boundaries',
          'Audit logging, compliance trails, and cryptographic signature validation'
        ],
        deliverable: 'RBAC/ABAC Gated Knowledge Retrieval Service with Token Introspection'
      },
      {
        phaseId: 'P3',
        title: 'Enterprise Database & Data Architecture',
        weeks: 'Weeks 10–12',
        hours: 32,
        status: 'Curriculum Outlined',
        chaptersCount: 18,
        description: 'Designing high-throughput ingestion pipelines using PostgreSQL, Redis clusters, and Apache Kafka event streaming.',
        topics: [
          'High-throughput document streaming with Apache Kafka',
          'Relational & vector co-location using pgvector in PostgreSQL',
          'Distributed state management and distributed locking with Redis'
        ],
        deliverable: 'Distributed Event-Driven Ingestion Engine with Kafka & PostgreSQL'
      },
      {
        phaseId: 'P4',
        title: 'Advanced Enterprise RAG at Scale',
        weeks: 'Weeks 13–15',
        hours: 34,
        status: 'Curriculum Outlined',
        chaptersCount: 20,
        description: 'Production RAG across millions of enterprise documents: OCR pipelines, metadata filtering, chunking strategies, and re-ranking.',
        topics: [
          'Multi-tenant vector partitioning & security boundaries',
          'Complex document parsing: PDF tables, multi-column layouts, and OCR',
          'Reciprocal Rank Fusion (RRF) and Cross-Encoder validation'
        ],
        deliverable: 'Enterprise Knowledge Engine with Multi-Tenant Partitioning'
      },
      {
        phaseId: 'P5',
        title: 'Production Agentic Systems & Workflows',
        weeks: 'Weeks 16–18',
        hours: 34,
        status: 'Curriculum Outlined',
        chaptersCount: 20,
        description: 'Building mission-critical state machines, approval gates, and autonomous execution pipelines with strict audit trails.',
        topics: [
          'Deterministic state graphs vs non-deterministic autonomous agents',
          'Human-in-the-loop approval workflows for critical write operations',
          'Sandboxed code execution environments and memory persistence'
        ],
        deliverable: 'Audited Enterprise Workflow Automation Agent with Approval Gates'
      },
      {
        phaseId: 'P6',
        title: 'Enterprise AI Security & Compliance',
        weeks: 'Weeks 19–21',
        hours: 30,
        status: 'Curriculum Outlined',
        chaptersCount: 16,
        description: 'Hardening enterprise AI against prompt injections, data exfiltration, model denial-of-service, and regulatory compliance (SOC2, HIPAA).',
        topics: [
          'Indirect prompt injection attack surfaces & perimeter validation',
          'PII detection, real-time redaction, and Data Loss Prevention (DLP)',
          'Compliance frameworks: SOC2 Type II, HIPAA, and GDPR AI requirements'
        ],
        deliverable: 'AI Security Gateway with Automated Redaction & Jailbreak Interception'
      },
      {
        phaseId: 'P7',
        title: 'Cloud & Production Deployment',
        weeks: 'Weeks 22–24',
        hours: 32,
        status: 'Curriculum Outlined',
        chaptersCount: 18,
        description: 'Deploying mission-critical AI applications to AWS, GCP, and Azure with zero-downtime rolling updates.',
        topics: [
          'Cloud-native containerization with multi-stage Docker builds',
          'Managed Kubernetes (EKS/GKE) and GPU node group provisioning',
          'Blue/Green and Canary deployment pipelines with automated rollback'
        ],
        deliverable: 'Production Multi-Region Cloud Deployment with Canary Rollouts'
      },
      {
        phaseId: 'P8',
        title: 'Kubernetes for AI Workloads',
        weeks: 'Weeks 25–27',
        hours: 34,
        status: 'Curriculum Outlined',
        chaptersCount: 19,
        description: 'Managing GPU clusters, NVIDIA Triton inference server, KEDA auto-scaling, and persistent storage on Kubernetes.',
        topics: [
          'NVIDIA Container Toolkit & GPU sharing (MIG, time-slicing)',
          'Event-driven autoscaling based on inference queue depth with KEDA',
          'Helm charts and GitOps deployment with ArgoCD'
        ],
        deliverable: 'Auto-Scaling GPU Inference Cluster on Kubernetes with KEDA & Helm'
      },
      {
        phaseId: 'P9',
        title: 'Infrastructure as Code & DevOps',
        weeks: 'Weeks 28–30',
        hours: 30,
        status: 'Curriculum Outlined',
        chaptersCount: 16,
        description: 'Automating reproducible cloud environments using Terraform, GitHub Actions, and GitOps methodologies.',
        topics: [
          'Modular Terraform for multi-environment enterprise clouds',
          'Automated CI/CD pipelines with security linting and contract tests',
          'Secret management with HashiCorp Vault and AWS Secrets Manager'
        ],
        deliverable: 'End-to-End Terraform Infrastructure Repository with CI/CD Automation'
      },
      {
        phaseId: 'P10',
        title: 'AI Performance Engineering',
        weeks: 'Weeks 31–32',
        hours: 24,
        status: 'Curriculum Outlined',
        chaptersCount: 14,
        description: 'Extracting maximum throughput and minimum latency: Quantization (AWQ, GPTQ), KV-cache optimization, and model distillation.',
        topics: [
          'High-efficiency serving with vLLM, TensorRT-LLM, and TGI',
          'Quantization trade-offs: FP16, INT8, and INT4 perplexity impact',
          'Batching strategies: Continuous batching and chunked prefill'
        ],
        deliverable: 'Benchmarked Low-Latency Inference Engine with 4x Throughput Gain'
      },
      {
        phaseId: 'P11',
        title: 'Observability, Reliability & Client Operations',
        weeks: 'Weeks 33–34',
        hours: 24,
        status: 'Curriculum Outlined',
        chaptersCount: 14,
        description: 'Operating production AI at client sites: OpenTelemetry tracing, Prometheus metrics, SLOs/SLAs, and incident response.',
        topics: [
          'Distributed request tracing across LLMs, vectors, and relational stores',
          'Token cost accounting and budget alerts per enterprise business unit',
          'SLO/SLA definitions, circuit breaking, and automated disaster recovery'
        ],
        deliverable: 'Full-Stack Observability Dashboard with Token Cost ROI Attribution'
      },
      {
        phaseId: 'P12',
        title: 'AI Product & FDE Delivery Leadership',
        weeks: 'Weeks 35–36',
        hours: 24,
        status: 'Curriculum Outlined',
        chaptersCount: 15,
        description: 'The human and strategic dimensions of being an FDE: Client stakeholder management, technical negotiation, executive presentations, and turning PoVs into multi-year enterprise contracts.',
        topics: [
          'Client Discovery: Translating business executive pain into technical architectures',
          'The 14-Day PoV Sprint: Designing undeniable proof-of-value demonstrations',
          'Enterprise Technical Architecture Review Board (ARB) presentation',
          'Production handoff protocols and client engineering team enablement'
        ],
        deliverable: 'Complete Enterprise Architecture Blueprint & 14-Day PoV Proposal Package'
      }
    ]
  }
};
