import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Layers, 
  Terminal, 
  Users, 
  Award, 
  BookOpen, 
  Code2, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  Server, 
  ExternalLink, 
  CheckCircle2, 
  Star, 
  Globe, 
  Bot, 
  FileText, 
  Video, 
  MessageSquare, 
  TrendingUp, 
  ChevronRight,
  Flame,
  Clock,
  Compass,
  Briefcase
} from 'lucide-react';

export default function Landing({ onNavigate, onSelectCourse, user }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const trendingTags = [
    { label: 'Generative AI', count: 101 },
    { label: 'Forward Deployed', count: 44 },
    { label: 'Agentic AI', count: 36 },
    { label: 'Enterprise RAG', count: 28 },
    { label: 'System Design', count: 24 },
    { label: 'Kubernetes GPU', count: 18 },
  ];

  const stats = [
    { value: '180k+', label: 'Engineers & Learners', icon: Users, sub: 'Worldwide community' },
    { value: '75+', label: 'Modules & Chapters', icon: Layers, sub: 'Deep technical syllabus' },
    { value: '96+', label: 'Production Labs', icon: Terminal, sub: 'Hands-on environments' },
    { value: '300+', label: 'Architecture Exercises', icon: Code2, sub: 'Peer & AI reviewed' },
  ];

  const employerLogos = [
    'Google', 'Microsoft', 'Amazon AWS', 'Meta', 'Apple', 'Netflix', 
    'NVIDIA', 'Databricks', 'OpenAI', 'Scale AI', 'Palantir', 'Uber', 'Snowflake', 'Anthropic'
  ];

  const flagshipCourses = [
    {
      id: 'ai-masterclass',
      title: 'AI Masterclass: Zero to Hero',
      subtitle: 'From Transformer attention mechanics to production fine-tuning, reasoning models, and agent architectures.',
      badge: 'Flagship Cohort',
      badgeColor: 'from-pink-500 to-rose-500',
      duration: '12 Weeks',
      stats: '8 Modules • 48 Topics • 10 Labs',
      instructor: 'Dr. Evelyn Vance & Senior AI Research Leads',
      tags: ['Transformers', 'PyTorch', 'Fine-Tuning', 'RLHF', 'Agents'],
      popular: true
    },
    {
      id: 'fde',
      title: 'Forward Deployed AI Architect (FDE)',
      subtitle: 'Production AI systems architecture, enterprise RAG, high-concurrency FastAPI, distributed GPU orchestration, and OWASP compliance.',
      badge: 'Comprehensive Residency',
      badgeColor: 'from-purple-500 to-cyan-500',
      duration: '36 Weeks',
      stats: '13 Phases • 223 Subtopics • 30 Live Chapters',
      instructor: 'Lead Forward Deployed Engineers',
      tags: ['LangGraph', 'FastAPI', 'vLLM', 'System Design', 'pgvector'],
      popular: true
    },
    {
      id: 'langgraph-sprint',
      title: 'Agentic RAG & LangGraph Workflows',
      subtitle: 'Build stateful multi-agent systems, cyclic graphs, reflection loops, and human-in-the-loop production workflows.',
      badge: '4-Week Sprint',
      badgeColor: 'from-cyan-500 to-blue-500',
      duration: '4 Weeks',
      stats: '4 Modules • 16 Labs • Real Swarms',
      instructor: 'Agent Architecture Guild',
      tags: ['LangGraph', 'Multi-Agent', 'Memory', 'Tools'],
      popular: false
    },
    {
      id: 'fastapi-asyncio',
      title: 'Production Python AsyncIO & FastAPI',
      subtitle: 'Master async Python internals, connection pooling, background tasks, high throughput, and zero-downtime deployment.',
      badge: 'Advanced Systems',
      badgeColor: 'from-emerald-500 to-teal-500',
      duration: '3 Weeks',
      stats: '6 Modules • 18 Topics • Benchmarking',
      instructor: 'Infrastructure Core Team',
      tags: ['AsyncIO', 'FastAPI', 'Uvicorn', 'Redis'],
      popular: false
    },
    {
      id: 'mcp-masters',
      title: 'Model Context Protocol (MCP) Masters',
      subtitle: 'Standardize LLM tool usage, build custom MCP servers, connect database sidecars, and local desktop agents.',
      badge: 'Next-Gen Protocol',
      badgeColor: 'from-amber-500 to-orange-500',
      duration: '2 Weeks',
      stats: '5 Modules • 12 Custom Servers',
      instructor: 'Tooling & Ecosystem Team',
      tags: ['MCP', 'JSON-RPC', 'Sidecars', 'Tools'],
      popular: false
    },
    {
      id: 'vllm-serving',
      title: 'Kubernetes GPU Clusters & vLLM Serving',
      subtitle: 'Provision multi-GPU Kubernetes clusters, setup vLLM continuous batching, dynamic LoRA adapters, and autoscaling.',
      badge: 'DevOps & Cloud',
      badgeColor: 'from-violet-500 to-indigo-500',
      duration: '4 Weeks',
      stats: '8 Production Labs • Helm & Terraform',
      instructor: 'Cloud Operations Lead',
      tags: ['Kubernetes', 'vLLM', 'Triton', 'GPU'],
      popular: false
    }
  ];

  const domains = [
    { id: '01', title: 'AI & Generative AI', count: '116 Items', icon: Sparkles, desc: 'LLMs, Fine-tuning, RLHF, Embeddings & Multimodal Models' },
    { id: '02', title: 'Enterprise AI Architecture', count: '58 Items', icon: Cpu, desc: 'FDE Systems, Scalability, Architecture Decision Records & C4 Models' },
    { id: '03', title: 'Data Engineering & Vector DBs', count: '23 Items', icon: Database, desc: 'Postgres, pgvector, Qdrant, Milvus & Streaming Kafka' },
    { id: '04', title: 'Production Systems & APIs', count: '18 Items', icon: Server, desc: 'FastAPI, AsyncIO, gRPC, WebSockets & High-Concurrency Pipelines' },
    { id: '05', title: 'Agentic Workflows & MCP', count: '14 Items', icon: Bot, desc: 'LangGraph, Multi-Agent Swarms, Tool Calling & MCP Protocols' },
    { id: '06', title: 'Cloud & Kubernetes AI', count: '12 Items', icon: Globe, desc: 'GPU Workloads, vLLM, TensorRT-LLM, Helm Charts & Observability' },
    { id: '07', title: 'AI Security & Governance', count: '10 Items', icon: ShieldCheck, desc: 'OWASP LLM Top 10, Prompt Injection Defense & Red-Teaming' },
    { id: '08', title: '26 Career Roadmaps Available', count: 'Guided Paths', icon: Compass, desc: 'Not sure where to start? Pick a role and follow step-by-step from foundations to Staff AI Architect.' },
  ];

  const toolkits = [
    { title: 'Academy Talent', desc: 'One profile, verified code deliverables, and direct employer visibility without recruiter noise.', icon: Briefcase, color: 'text-pink-400' },
    { title: 'Academy Cloud Labs', desc: 'Instant in-browser Linux & GPU development environments pre-loaded with PyTorch, CUDA, and datasets.', icon: Terminal, color: 'text-cyan-400' },
    { title: 'Academy Code Judge', desc: 'Solve hands-on algorithmic and systems engineering tasks with instant test validation.', icon: Code2, color: 'text-purple-400' },
    { title: 'System Evaluator', desc: 'Automated AI grading of your architecture design diagrams, scalability trade-offs, and ADRs.', icon: Award, color: 'text-emerald-400' },
    { title: 'Avani Mock Interviewer', desc: 'Real-time AI voice and live coding technical interviews with granular feedback rubrics.', icon: Video, color: 'text-amber-400' },
    { title: 'Resume AI Tailor', desc: 'ATS scoring and AI-enhanced bullet points that emphasize quantifiable engineering metrics.', icon: FileText, color: 'text-rose-400' },
    { title: 'Academy AI Assistant', desc: 'Dedicated multi-model engineering workspace (Claude, GPT, Gemini) embedded in your curriculum.', icon: MessageSquare, color: 'text-blue-400' },
    { title: 'Engineering Hackathons', desc: 'Monthly client-sponsored production challenges with cash bounties and fast-tracked interviews.', icon: Flame, color: 'text-yellow-400' },
  ];

  const filteredCourses = flagshipCourses.filter(c => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.title.toLowerCase().includes(q) || 
           c.subtitle.toLowerCase().includes(q) || 
           c.tags.some(t => t.toLowerCase().includes(q));
  });

  const handleEnrollClick = (courseId) => {
    if (user) {
      if (courseId === 'ai-masterclass' || courseId === 'fde') {
        onSelectCourse(courseId);
      } else {
        onNavigate('courses');
      }
    } else {
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-pink-500 selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed top-1/2 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-black text-sm">
                AI
              </div>
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-lg flex items-center gap-2">
                <span className="text-white">AI</span>
                <span className="rgb-gradient-text">Academy</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  RGB Edition
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#tracks" className="hover:text-cyan-400 transition-colors">Courses & Cohorts</a>
            <a href="#domains" className="hover:text-purple-400 transition-colors">Specializations</a>
            <a href="#super30" className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
              <span>Super 30</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 animate-pulse">Open</span>
            </a>
            <a href="#workflow" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#toolkit" className="hover:text-purple-400 transition-colors">Platform Toolkit</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => onNavigate('home')}
                className="rgb-glow-btn px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Enter Classroom</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="rgb-glow-btn px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="rgb-laser-line"></div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Search */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Chip */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-md">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                <span>Live cohorts • Self-paced tracks • Browser Labs • Talent Network</span>
              </div>

              {/* Punchy Dual-Line Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
                Learn it. Build it. <br />
                <span className="rgb-gradient-text">Get hired for it.</span>
              </h1>

              {/* Value Narrative */}
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Courses taught by forward-deployed engineers who ship production systems. 
                Real-world architecture labs to build in, AI that reviews your system designs, 
                and verified portfolio deliverables employers actually search.
              </p>

              {/* Interactive Search Bar */}
              <div className="relative max-w-xl">
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What do you want to learn? (e.g. LangGraph, RAG, FastAPI, Kubernetes)..."
                    className="w-full pl-12 pr-28 py-3.5 bg-slate-900/90 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm md:text-base shadow-xl backdrop-blur-md transition-all"
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById('tracks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="absolute right-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Trending Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 font-medium">Trending:</span>
                {trendingTags.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => {
                      setSearchQuery(tag.label);
                      const el = document.getElementById('tracks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{tag.label}</span>
                    <span className="text-[10px] text-slate-500">({tag.count})</span>
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="rgb-glow-btn px-6 py-3.5 rounded-2xl text-base font-extrabold flex items-center gap-2.5 cursor-pointer shadow-xl shadow-purple-500/20"
                >
                  <span>Explore Academy Plus</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#tracks"
                  className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span>Browse Tracks</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Device Frame / Live Cohort Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 shadow-2xl shadow-purple-500/20">
                <div className="bg-[#090d16] rounded-[23px] p-6 md:p-8 space-y-6 text-left">
                  
                  {/* Floating Tag */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                      Super 30 • Cohort 10 Open
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">30 Seats Only</span>
                  </div>

                  {/* Terminal Simulation */}
                  <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs border border-slate-800/90 shadow-inner space-y-2 text-slate-300">
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-slate-500 text-[10px] ml-2">fde-agent-cluster ~ bash</span>
                    </div>
                    <div className="text-pink-400">$ python -m fde_cluster.deploy</div>
                    <div className="text-slate-400">Loading vLLM Serving engine (A100 x 8)...</div>
                    <div className="text-emerald-400">✓ KV cache initialized: 128k context</div>
                    <div className="text-cyan-300">✓ LangGraph state-machine nodes: 14 online</div>
                    <div className="text-purple-400">Ready: Production residency active.</div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">Work & Learn Apprenticeship</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Stop watching recorded tutorials in isolation. Ship production infrastructure alongside staff engineers.
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Weekly system architecture design reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Dedicated GPU cluster sandbox allocation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Direct hiring referrals to tier-1 AI firms</span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => onNavigate('login')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 font-bold text-sm text-white transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for a Seat</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-slate-300 ml-1">4.9/5</span>
                    </div>
                    <span>1,200+ Verified Reviews</span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-purple-500/40 transition-all group">
                  <div className="flex justify-center mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black rgb-gradient-text font-mono">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-1">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMPLOYER MARQUEE */}
      <section className="py-12 overflow-hidden bg-slate-950/20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            Our learners & alumni ship production systems at
          </p>
        </div>
        
        {/* Infinite Scroll Marquee */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
            {employerLogos.concat(employerLogos).map((company, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/70 text-slate-300 font-bold text-sm tracking-wide hover:text-white hover:border-purple-500/50 transition-all cursor-default shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400"></div>
                <span>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES & COHORTS */}
      <section id="tracks" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Engineered for Production Readiness</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Featured Courses &amp; Flagship Cohorts
              </h2>
              <p className="text-slate-400 text-base mt-2 max-w-2xl">
                Master modern AI engineering from first principles to multi-million parameter deployments.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-slate-400">Showing {filteredCourses.length} programs</span>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="rgb-glow-card rounded-3xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all relative group"
              >
                {course.popular && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Badge & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {course.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {course.subtitle}
                  </p>

                  {/* Highlights */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                    <div className="text-[11px] font-mono text-purple-300 font-semibold">
                      {course.stats}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                      Lead: {course.instructor}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Included in Plus</span>
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <span>View Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DOMAINS & ROADMAPS (01 - 07) */}
      <section id="domains" className="py-20 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Spectrum Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Choose your area of interest
            </h2>
            <p className="text-slate-400 text-base mt-2">
              Deep dive into specialized AI domains or follow an end-to-end verified roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {domains.map((domain) => {
              const Icon = domain.icon;
              const isCallout = domain.id === '08';
              return (
                <div
                  key={domain.id}
                  onClick={() => {
                    if (isCallout) {
                      onNavigate('login');
                    } else {
                      setSearchQuery(domain.title.split('&')[0].trim());
                      const el = document.getElementById('tracks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCallout
                      ? 'bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-slate-900 border-purple-500/50 shadow-xl hover:border-pink-400'
                      : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-sm font-black text-slate-500 group-hover:text-purple-400">
                        {domain.id}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-black text-base text-white mb-2">{domain.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{domain.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono font-semibold">
                    <span className="text-purple-400">{domain.count}</span>
                    <span className="text-slate-400 flex items-center gap-1 group-hover:text-cyan-400">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SUPER 30 SPOTLIGHT */}
      <section id="super30" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070b14] to-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rgb-border-box p-8 sm:p-12 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-wider border border-pink-500/40">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Work &amp; Learn Apprenticeship</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Stop only studying. <br />
                  <span className="rgb-gradient-text">Start working.</span>
                </h2>

                <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                  Tutorials don't prepare you for production outages, distributed training deadlocks, 
                  or multi-tenant vector latency. Super 30 is a rigorous 6-month residency where you 
                  work directly on client briefs with senior engineers.
                </p>

                {/* 4 Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-pink-400" />
                      <span>Real briefs, every week</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Weekly work graded by Staff Engineers at top tech firms.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Agile pods of 5</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Peer code reviews, design docs, and sprint retrospectives.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Ship end-to-end</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">From architecture proposal (ADR) to live Kubernetes deployment.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verifiable deliverables</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Direct portfolio evidence recruiters review without take-home tests.</div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate('login')}
                    className="rgb-glow-btn px-8 py-4 rounded-2xl text-base font-extrabold flex items-center gap-3 cursor-pointer shadow-xl"
                  >
                    <span>Apply for Super 30 Seat</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono">Cohort 10 Starting Soon &bull; Strict Selection</span>
                </div>
              </div>

              {/* Super 30 Meta Box */}
              <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
                <div className="text-center pb-4 border-b border-slate-800">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Cohort Snapshot</div>
                  <div className="text-3xl font-black text-white mt-1">Super 30 Batch 10</div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Seats</span>
                    <span className="font-mono font-bold text-pink-400">30 Engineers Max</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Residency Duration</span>
                    <span className="font-mono font-bold text-slate-200">6 Months Intensive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Commitment</span>
                    <span className="font-mono font-bold text-slate-200">15-20 Hours / Week</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Hardware Access</span>
                    <span className="font-mono font-bold text-cyan-400">Dedicated A100 GPU Pods</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Placement Support</span>
                    <span className="font-mono font-bold text-emerald-400">Direct Recruiter Referrals</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 leading-relaxed">
                  "Super 30 was the closest thing to working inside a real high-growth AI startup. I skipped 3 generic rounds and got hired as an FDE."
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4-STEP WORKFLOW */}
      <section id="workflow" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>The End-to-End Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              From first lesson to first offer, in one place
            </h2>
            <p className="text-slate-400 text-base mt-2">
              A continuous, frictionless progression from theory to verifiable engineering output.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono font-black flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="font-black text-lg text-white mb-2">Learn live or self-paced</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engage with structured curriculum, live architecture deep dives, recorded breakdown sessions, and comprehensive technical textbooks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-pink-400">
                Phase 0 to Phase 12
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono font-black flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="font-black text-lg text-white mb-2">Build real projects</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Write production code in cloud dev containers. Deploy FastAPI services, connect pgvector, and serve open-weights models on Kubernetes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-purple-400">
                Pre-configured GPU Devboxes
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="font-black text-lg text-white mb-2">Prove with AI evaluation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  System architecture designs and code pull requests are graded against production rubrics by AI evaluators and senior engineers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                Automated Rubric Scoring
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-black flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="font-black text-lg text-white mb-2">One profile. Direct offers</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your verified deliverables form an indisputable proof-of-work portfolio. Partner companies search and recruit directly without screening calls.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                Talent Network Inbound
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PLATFORM TOOLKIT (8 PRODUCTS) */}
      <section id="toolkit" className="py-24 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Full Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              More than courses. A whole toolkit.
            </h2>
            <p className="text-slate-400 text-base mt-2">
              Every tool an AI engineer needs to build, test, polish, and get hired.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolkits.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center mb-4">
                      <Icon className={`w-5 h-5 ${tool.color}`} />
                    </div>
                    <h3 className="font-bold text-base text-white mb-2">{tool.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium">Included in Plus</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ONE PLAN BANNER */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-2xl">
            <div className="bg-[#090d16] rounded-[23px] p-8 sm:p-12 text-center space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Unlimited Access Pass</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                One plan. Everything on this page.
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Unlock all 75+ modules, 2 flagship tracks (AI Masterclass &amp; Forward Deployed AI Architect), 
                interactive cloud GPU sandboxes, AI code evaluators, and the verified talent network.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="rgb-glow-btn px-8 py-4 rounded-2xl text-base font-extrabold flex items-center gap-2.5 cursor-pointer shadow-xl"
                >
                  <span>Get Started with Academy Plus</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('tracks');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-base font-semibold transition-all cursor-pointer"
                >
                  Browse Syllabus
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-4">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cancel anytime</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full source code access</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certificate of Engineering</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Col 1: Brand Info */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg p-[1px] bg-gradient-to-tr from-pink-500 to-cyan-400">
                  <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-white font-black text-xs">
                    AI
                  </div>
                </div>
                <span className="font-extrabold text-white text-base">AI Academy</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                The modern engineering academy training the next generation of Forward Deployed AI Architects, 
                Systems Engineers, and Agent Specialists.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Bengaluru, India &bull; Silicon Valley, USA <br />
                contact@fde.academy
              </div>
            </div>

            {/* Col 2: Programs */}
            <div className="space-y-3">
              <div className="font-bold text-white text-sm uppercase tracking-wider">Programs</div>
              <ul className="space-y-2">
                <li><a href="#tracks" className="hover:text-cyan-400 transition-colors">AI Masterclass</a></li>
                <li><a href="#tracks" className="hover:text-cyan-400 transition-colors">FDE Architect Residency</a></li>
                <li><a href="#super30" className="hover:text-pink-400 transition-colors">Super 30 Apprenticeship</a></li>
                <li><a href="#tracks" className="hover:text-cyan-400 transition-colors">Agentic RAG &amp; LangGraph</a></li>
                <li><a href="#tracks" className="hover:text-cyan-400 transition-colors">vLLM GPU Serving</a></li>
              </ul>
            </div>

            {/* Col 3: Platform Toolkit */}
            <div className="space-y-3">
              <div className="font-bold text-white text-sm uppercase tracking-wider">Platform Toolkit</div>
              <ul className="space-y-2">
                <li><a href="#toolkit" className="hover:text-cyan-400 transition-colors">Academy Talent</a></li>
                <li><a href="#toolkit" className="hover:text-cyan-400 transition-colors">Cloud GPU Labs</a></li>
                <li><a href="#toolkit" className="hover:text-cyan-400 transition-colors">System Evaluator</a></li>
                <li><a href="#toolkit" className="hover:text-cyan-400 transition-colors">Avani Mock Interviewer</a></li>
                <li><a href="#toolkit" className="hover:text-cyan-400 transition-colors">Resume AI</a></li>
              </ul>
            </div>

            {/* Col 4: Specializations */}
            <div className="space-y-3">
              <div className="font-bold text-white text-sm uppercase tracking-wider">Domains</div>
              <ul className="space-y-2">
                <li><a href="#domains" className="hover:text-cyan-400 transition-colors">AI &amp; Generative AI</a></li>
                <li><a href="#domains" className="hover:text-cyan-400 transition-colors">Enterprise AI Architecture</a></li>
                <li><a href="#domains" className="hover:text-cyan-400 transition-colors">Vector Databases</a></li>
                <li><a href="#domains" className="hover:text-cyan-400 transition-colors">FastAPI &amp; AsyncIO</a></li>
                <li><a href="#domains" className="hover:text-cyan-400 transition-colors">AI Security &amp; OWASP</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-xs">
              &copy; {new Date().getFullYear()} AI Academy Inc. Inspired by high-performance engineering cultures.
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer">System Status</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
