import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  Award, 
  Activity,
  Layers,
  Terminal,
  Cpu,
  Workflow,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Preface({ onNavigate }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16 text-slate-100">
      
      {/* 1. Header Banner */}
      <div className="border-b border-slate-800 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
          <BookOpen className="w-3.5 h-3.5" />
          The Manifesto
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Preface: The <span className="rgb-gradient-text animate-rgb-flow">Forward Deployed AI Architect</span>
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Why 85% of enterprise AI initiatives fail in production, and how the Forward Deployed Engineering (FDE) 
          operating model closes the gap between frontier models and enterprise reality.
        </p>
      </div>

      {/* 2. Section: The Genesis of the FDE Role */}
      <section className="space-y-5 text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-mono text-xl">01.</span>
          The Genesis of the Forward Deployed Engineer
        </h2>
        
        <p>
          The title <em>Forward Deployed Software Engineer (FDSE)</em> was originated by <strong>Palantir Technologies</strong> in the mid-2000s. 
          When Palantir deployed software into defense, intelligence, and large financial institutions, they realized a critical truth: 
          <strong> enterprise environments cannot be served by software engineers writing code in a distant Silicon Valley headquarters</strong>. 
          Client data is messy, networks are air-gapped, security controls are draconian, and the users are operational analysts—not software developers.
        </p>
        
        <p>
          Palantir’s answer was to take their most elite engineers and deploy them <em>forward</em>—physically and organizationally embedded inside the client's operational trenches. 
          As Palantir framed it: <em className="text-cyan-300 font-medium">"An FDE operates like the CTO of a high-stakes startup inside the enterprise client."</em>
        </p>

        <p>
          Today, with the explosion of generative AI and foundation models, the FDE has become the most coveted and strategically vital role at companies like 
          <strong> OpenAI, Anthropic, Scale AI, Databricks, and modern AI consultancies</strong>. Frontier models like GPT-4 and Claude are readily accessible via APIs, 
          yet enterprises cannot simply plug them in. Turning raw model weights into a resilient, compliant, multi-tenant production system requires an engineer who is 
          <strong> 80% hardcore systems architect and 20% high-stakes business strategist</strong>.
        </p>
      </section>

      {/* 3. Section: Why Traditional Software Engineering Fails in Enterprise AI */}
      <section className="space-y-6 text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-mono text-xl">02.</span>
          The Anatomy of AI Delivery Failures
        </h2>
        
        <p>
          Industry research consistently shows that between <strong>80% and 87% of enterprise AI proofs-of-concept (PoCs) die before reaching production</strong>. 
          This high failure rate stems from four structural traps:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 rgb-glow-card hover:border-pink-500/30 transition-all">
            <div className="text-pink-400 font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              1. The Staging Mirage
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In a clean staging sandbox with 5 clean PDF samples, standard LangChain chunkers work fine. In production, the client uploads a 600-page encrypted TIFF scan 
              containing nested multi-column balance sheets and handwritten notary stamps, causing the retrieval pipeline to return total gibberish.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 rgb-glow-card hover:border-cyan-500/30 transition-all">
            <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              2. The Context & Latency Crunch
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toy demos ignore time-to-first-token (TTFT) and token costs. When 5,000 corporate employees query the system simultaneously on Monday morning at 9:00 AM, 
              downstream rate limits choke, LLM latency spikes to 45 seconds, and worker processes run out of memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 rgb-glow-card hover:border-purple-500/30 transition-all">
            <div className="text-purple-400 font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              3. The Permission & Compliance Chasm
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard vector databases index text blindly. If a junior analyst asks a question and the vector search retrieves executive compensation memos or HIPAA-regulated patient records, 
              the entire project is abruptly terminated by corporate legal and compliance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 rgb-glow-card hover:border-emerald-500/30 transition-all">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              4. The ROI Ambiguity
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Engineers measure cosine similarity, precision, and perplexity. Chief Financial Officers (CFOs) measure operational expenditure, headcount reallocation, and compliance penalties. 
              If the engineering team cannot mathematically prove dollar savings, budget is cancelled during the next quarterly review.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Section: The 5 Pillars of the FDE DNA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono text-xl">03.</span>
          The Five Pillars of the FDE Operating Model
        </h2>

        <div className="space-y-4">
          
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 rgb-glow-card hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Pillar 1: Uncompromising Technical Depth</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An FDE cannot hide behind abstractions. When an Azure VNet refuses to route traffic to a private endpoint, or an async event loop freezes under a blocking DB query, 
                the FDE inspects network sockets, profiles memory with `tracemalloc`, and writes production patches on the spot.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 rgb-glow-card hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Pillar 2: Customer Empathy & Active Discovery</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Clients describe symptoms, rarely causes. When a VP of Logistics asks for "an AI dashboard," the FDE sits with warehouse dispatchers to discover that 
                their true bottleneck is manually reconciling EDI 204 shipping manifests against disparate SQL databases.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 rgb-glow-card hover:border-pink-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Pillar 3: Rapid Prototyping Velocity (Speed as a Weapon)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Instead of spending 3 months writing abstract 50-page architecture documents, an FDE delivers a functional vertical slice in 72 hours. 
                Iterative reality beats theoretical design every single time.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 rgb-glow-card hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Pillar 4: Production Ownership from Day One</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An FDE never writes throwaway "hackathon demo code." From the very first sprint, the code implements structured JSON logging, 
                RFC-7807 error envelopes, correlation IDs (`X-Request-ID`), health probes (`/healthz`, `/ready`), and automated contract tests.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 rgb-glow-card hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Pillar 5: Measurable ROI & Executive Translation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The FDE speaks two languages fluently: Python and Business. They quantify outcomes in enterprise currency: 
                reduced human review time, eliminated cloud compute waste, and verified compliance with regulatory frameworks.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Section: The 4-Stage Delivery Lifecycle */}
      <section className="space-y-6 text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 font-mono text-xl">04.</span>
          The FDE Delivery Lifecycle & Exit Gates
        </h2>

        <p>
          Every engagement follows four rigorous phases. Progression is governed by strict exit criteria:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 text-white space-y-2 border border-slate-800 rgb-glow-card hover:border-pink-500/40 transition-all">
            <div className="text-xs font-mono text-pink-400 font-bold">STAGE 01 &bull; 1–2 WEEKS</div>
            <div className="font-bold text-base">PoV (Proof of Value)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identify the single highest-value bottleneck. Frame technical feasibility and mathematically quantify expected business ROI.
            </p>
            <div className="text-[11px] text-pink-300 font-medium pt-2 border-t border-slate-800">
              Gate: Executive sign-off on target KPIs.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 text-white space-y-2 border border-slate-800 rgb-glow-card hover:border-purple-500/40 transition-all">
            <div className="text-xs font-mono text-purple-400 font-bold">STAGE 02 &bull; 2–4 WEEKS</div>
            <div className="font-bold text-base">PoC (Proof of Concept)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build a thin vertical slice running against representative client data. Validate accuracy, token consumption, and edge cases.
            </p>
            <div className="text-[11px] text-purple-300 font-medium pt-2 border-t border-slate-800">
              Gate: Accuracy &gt; 92% on golden evaluation test set.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 text-white space-y-2 border border-slate-800 rgb-glow-card hover:border-blue-500/40 transition-all">
            <div className="text-xs font-mono text-blue-400 font-bold">STAGE 03 &bull; 4–8 WEEKS</div>
            <div className="font-bold text-base">MVP (Minimum Viable)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deploy to client environment. Integrate Entra ID / Okta SSO, tenant-isolated databases, audit trails, and role-based access.
            </p>
            <div className="text-[11px] text-blue-300 font-medium pt-2 border-t border-slate-800">
              Gate: Security, infosec & compliance approval.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 text-white space-y-2 border border-slate-800 rgb-glow-card hover:border-cyan-500/40 transition-all">
            <div className="text-xs font-mono text-cyan-400 font-bold">STAGE 04 &bull; PRODUCTION</div>
            <div className="font-bold text-base">Production Ownership</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sustained multi-tenant traffic. OpenTelemetry tracing, Prometheus alerting, automated regression evaluations, and runbooks.
            </p>
            <div className="text-[11px] text-cyan-300 font-medium pt-2 border-t border-slate-800">
              Gate: 99.9% uptime SLA under full concurrency.
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: The 4-Volume Curriculum Roadmap */}
      <section className="space-y-6 text-slate-300 leading-relaxed">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono text-xl">05.</span>
          The 36-Week Curriculum Roadmap (4 Volumes)
        </h2>

        <p>
          The master curriculum is divided into four thematic volumes spanning 36 weeks and 13 phases:
        </p>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rgb-glow-card hover:border-emerald-500/40 transition-all">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase font-mono">Volume I &bull; Weeks 1–8</div>
              <div className="text-base font-bold text-white mt-0.5">Foundations, System Design & Enterprise Identity</div>
              <p className="text-xs text-slate-400 mt-1">Phases 0, 1, 2: Async Python, FastAPI, Distributed Queues, Microservices, OAuth2, Entra ID, RBAC/ABAC.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 self-start sm:self-center shadow-xs">
              Phase 0 Complete
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rgb-glow-card hover:border-cyan-500/40 transition-all">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase font-mono">Volume II &bull; Weeks 9–14</div>
              <div className="text-base font-bold text-white mt-0.5">Enterprise Data Architecture & Advanced RAG</div>
              <p className="text-xs text-slate-400 mt-1">Phases 3, 4: PostgreSQL internals, pgvector, hybrid search, ColPali multimodal parsing, HyDE, ACL-aware retrieval, RAGAS.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-center">
              Roadmap
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rgb-glow-card hover:border-purple-500/40 transition-all">
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase font-mono">Volume III &bull; Weeks 15–20</div>
              <div className="text-base font-bold text-white mt-0.5">Autonomous Agentic Systems & AI Security</div>
              <p className="text-xs text-slate-400 mt-1">Phases 5, 6: LangGraph state machines, Model Context Protocol (MCP), layered memory, OWASP LLM Top 10, STRIDE threat models.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-center">
              Roadmap
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rgb-glow-card hover:border-pink-500/40 transition-all">
            <div>
              <div className="text-xs font-bold text-pink-400 uppercase font-mono">Volume IV &bull; Weeks 21–36</div>
              <div className="text-base font-bold text-white mt-0.5">Cloud, Kubernetes, AI Performance & Capstone</div>
              <p className="text-xs text-slate-400 mt-1">Phases 7–12: Azure/AWS private clouds, Kubernetes & Helm, Terraform IaC, vLLM gateways, FinOps, OpenTelemetry & Executive Demo.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 self-start sm:self-center">
              Roadmap
            </span>
          </div>
        </div>
      </section>

      {/* 7. Section: Rules of Engagement */}
      <section className="p-6 rounded-2xl bg-slate-900/90 border border-pink-500/30 text-slate-200 space-y-3 rgb-glow-card">
        <h3 className="text-base font-bold text-pink-300 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-pink-400" />
          The Five Rules of the Forward Deployed Architect
        </h3>
        <ul className="text-xs sm:text-sm space-y-2 font-medium text-slate-300">
          <li><strong className="text-white">Rule 1:</strong> The client does not care about your tech stack; they care about their business problem.</li>
          <li><strong className="text-white">Rule 2:</strong> Code that never reaches production has exactly zero enterprise value.</li>
          <li><strong className="text-white">Rule 3:</strong> Never optimize latency before verifying permission security.</li>
          <li><strong className="text-white">Rule 4:</strong> Speed is achieved through thin vertical slices, not through skipped tests.</li>
          <li><strong className="text-white">Rule 5:</strong> Speak fluent Python to your terminal, and fluent Economics to your stakeholders.</li>
        </ul>
      </section>

      {/* Call to action footer */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-white">Ready to explore the Master Curriculum?</div>
          <div className="text-xs text-slate-400">Dive into all 13 phases or jump directly into Phase 0 chapters.</div>
        </div>

        <button
          onClick={() => onNavigate('contents')}
          className="px-6 py-3.5 rounded-xl rgb-glow-btn text-white font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Open Curriculum Table of Contents</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
