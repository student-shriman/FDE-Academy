import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Code2, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Cpu, 
  Database, 
  Server, 
  Globe, 
  Bot, 
  Zap, 
  Video, 
  FileText, 
  MessageSquare, 
  Flame, 
  Briefcase, 
  Award, 
  TrendingUp, 
  ChevronRight,
  Terminal,
  Star
} from 'lucide-react';
import { coursesData } from '../data/coursesData';

export default function Home({ user, curriculum, progress, onNavigate, onSelectChapter, onSelectCourse }) {
  const [selectedSprintFilter, setSelectedSprintFilter] = useState('all');

  const handleOpenCourse = (courseId) => {
    if (onSelectCourse) onSelectCourse(courseId);
    window.location.hash = `course/${courseId}`;
  };

  const sprints = [
    {
      id: 'langgraph-sprint',
      title: 'Agentic RAG & LangGraph Workflows',
      subtitle: 'Build stateful multi-agent systems, cyclic graphs, reflection loops, and human-in-the-loop production workflows.',
      badge: '4-Week Sprint',
      badgeColor: 'from-cyan-500 to-blue-500',
      duration: '4 Weeks',
      stats: '4 Modules • 16 Labs • Real Swarms',
      tags: ['LangGraph', 'Multi-Agent', 'Memory', 'Tools'],
      targetCourse: 'ai-masterclass'
    },
    {
      id: 'fastapi-asyncio',
      title: 'Production Python AsyncIO & FastAPI',
      subtitle: 'Master async Python internals, connection pooling, background tasks, high throughput, and zero-downtime deployment.',
      badge: 'Advanced Systems',
      badgeColor: 'from-emerald-500 to-teal-500',
      duration: '3 Weeks',
      stats: '6 Modules • 18 Topics • Benchmarking',
      tags: ['AsyncIO', 'FastAPI', 'Uvicorn', 'Redis'],
      targetCourse: 'fde'
    },
    {
      id: 'mcp-masters',
      title: 'Model Context Protocol (MCP) Masters',
      subtitle: 'Standardize LLM tool usage, build custom MCP servers, connect database sidecars, and local desktop agents.',
      badge: 'Next-Gen Protocol',
      badgeColor: 'from-amber-500 to-orange-500',
      duration: '2 Weeks',
      stats: '5 Modules • 12 Custom Servers',
      tags: ['MCP', 'JSON-RPC', 'Sidecars', 'Tools'],
      targetCourse: 'fde'
    },
    {
      id: 'vllm-serving',
      title: 'Kubernetes GPU Clusters & vLLM Serving',
      subtitle: 'Provision multi-GPU Kubernetes clusters, setup vLLM continuous batching, dynamic LoRA adapters, and autoscaling.',
      badge: 'DevOps & Cloud',
      badgeColor: 'from-violet-500 to-indigo-500',
      duration: '4 Weeks',
      stats: '8 Production Labs • Helm & Terraform',
      tags: ['Kubernetes', 'vLLM', 'Triton', 'GPU'],
      targetCourse: 'fde'
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
    { id: '08', title: '26 Career Roadmaps Available', count: 'Guided Paths', icon: Compass, desc: 'Pick a role and follow step-by-step from foundations to Staff AI Architect.' },
  ];

  const toolkits = [
    { title: 'Academy Talent Network', desc: 'One profile, verified code deliverables, and direct employer visibility without recruiter noise.', icon: Briefcase, color: 'text-pink-400', badge: 'Active' },
    { title: 'Cloud GPU Labs', desc: 'Instant in-browser Linux & GPU development environments pre-loaded with PyTorch, CUDA, and datasets.', icon: Terminal, color: 'text-cyan-400', badge: 'Online' },
    { title: 'Academy Code Judge', desc: 'Solve hands-on algorithmic and systems engineering tasks with instant test validation.', icon: Code2, color: 'text-purple-400', badge: 'Ready' },
    { title: 'System Evaluator', desc: 'Automated AI grading of your architecture design diagrams, scalability trade-offs, and ADRs.', icon: Award, color: 'text-emerald-400', badge: 'AI Powered' },
    { title: 'Avani Mock Interviewer', desc: 'Real-time AI voice and live coding technical interviews with granular feedback rubrics.', icon: Video, color: 'text-amber-400', badge: 'Voice AI' },
    { title: 'Resume AI Tailor', desc: 'ATS scoring and AI-enhanced bullet points that emphasize quantifiable engineering metrics.', icon: FileText, color: 'text-rose-400', badge: 'ATS v2.4' },
    { title: 'Academy AI Assistant', desc: 'Dedicated multi-model engineering workspace (Claude, GPT, Gemini) embedded in your curriculum.', icon: MessageSquare, color: 'text-blue-400', badge: 'Pro Swarm' },
    { title: 'Engineering Hackathons', desc: 'Monthly client-sponsored production challenges with cash bounties and fast-tracked interviews.', icon: Flame, color: 'text-yellow-400', badge: '₹2.5L Prize' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. STUDENT COMMAND CENTER HERO */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800/80 p-8 sm:p-12 overflow-hidden shadow-2xl rgb-glow-card">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* RGB Laser Top Highlight */}
        <div className="absolute top-0 left-0 right-0">
          <div className="rgb-laser-line opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-700 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-slate-300">Welcome back,</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-bold">
                {user.name}
              </span>
            </div>

            {progress && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-400 font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{progress.total_completed} / {progress.total_subtopics} Completed ({progress.overall_percentage}%)</span>
                <span>&bull;</span>
                <span>{progress.completed_hours}h logged</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The <span className="rgb-gradient-text animate-rgb-flow">AI Engineering &amp; Architect</span> Academy
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            All curriculum tracks, specialized sprints, interactive cloud labs, and architecture evaluators are unlocked. 
            Select your track below to build production-verified systems.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl rgb-glow-btn text-white font-bold text-sm flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-purple-500/20"
            >
              <Layers className="w-4 h-4" />
              <span>Browse All Tracks</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectChapter('chapter-1')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700/80 hover:border-slate-600 transition-all hover:scale-105 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Continue Phase 0 Reader</span>
            </button>

            <button
              onClick={() => onNavigate('contents')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 font-semibold text-sm flex items-center gap-2 border border-slate-700/60 hover:border-slate-600 transition-colors cursor-pointer"
            >
              <span>Table of Contents</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE 2 FLAGSHIP COURSES */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Flagship Curricula
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Select Your Core Specialization
            </h2>
          </div>
          <span className="text-xs text-slate-400">Phase 0 Textbook &bull; 30 Chapters Ready</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* COURSE 1: AI Masterclass */}
          <div className="group relative bg-slate-900/90 rounded-3xl border border-cyan-500/30 p-8 flex flex-col justify-between hover:border-cyan-400 transition-all hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  <Cpu className="w-3.5 h-3.5" />
                  Course 1 &middot; 12 Weeks
                </span>
                <span className="text-xs font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                  Intermediate → Advanced
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  AI Masterclass: Zero to Hero
                </h3>
                <div className="text-sm font-semibold text-cyan-300 mt-1">
                  Foundations to Production Generative AI
                </div>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Deep-dive into modern LLM engineering. Learn the internal mechanics of Transformers, 
                  chain-of-thought prompt reasoning, high-dimensional vector search, hybrid enterprise RAG, 
                  stateful LangGraph agents, LoRA fine-tuning, and LLMOps evaluation.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Transformer Internals',
                  'Prompt Reasoning (CoT/ReAct)',
                  'Vector DBs (Qdrant)',
                  'Hybrid Enterprise RAG',
                  'Multi-Agent Graphs',
                  'LoRA/QLoRA Fine-Tuning',
                  'LLMOps & Ragas'
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/80 text-center">
                <div>
                  <div className="text-lg font-black text-white">8</div>
                  <div className="text-[11px] text-slate-400">Modules</div>
                </div>
                <div>
                  <div className="text-lg font-black text-cyan-400">48</div>
                  <div className="text-[11px] text-slate-400">Topics</div>
                </div>
                <div>
                  <div className="text-lg font-black text-emerald-400">10</div>
                  <div className="text-[11px] text-slate-400">Hands-On Labs</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenCourse('ai-masterclass')}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer group-hover:scale-[1.01]"
              >
                <span>Open AI Masterclass Syllabus &amp; Labs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COURSE 2: FDE (Forward Deployed AI Architect) */}
          <div className="group relative bg-slate-900/90 rounded-3xl border border-pink-500/30 p-8 flex flex-col justify-between hover:border-pink-400 transition-all hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Course 2 &middot; 36 Weeks
                </span>
                <span className="text-xs font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  Senior → AI Architect
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  Forward Deployed AI Architect (FDE)
                </h3>
                <div className="text-sm font-semibold text-amber-300 mt-1">
                  Enterprise AI Systems &amp; Production Delivery
                </div>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  The flagship 36-week enterprise delivery program. Learn to build zero-failure 
                  AI systems inside enterprise environments: production Python AsyncIO &amp; FastAPI, 
                  enterprise identity (OAuth/RBAC), Kafka pipelines, Kubernetes GPU clusters, and client exit gates.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  'Phase 0: 30 Live Chapters',
                  'Production Python AsyncIO',
                  'Enterprise System Design',
                  'Identity & RBAC/ABAC',
                  'Distributed Kafka Streams',
                  'Kubernetes GPU Workloads',
                  '17 Portfolio Deliverables'
                ].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800 text-center">
                <div>
                  <div className="text-lg font-black text-white">13</div>
                  <div className="text-[11px] text-slate-400">Phases</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-400">61</div>
                  <div className="text-[11px] text-slate-400">Topics</div>
                </div>
                <div>
                  <div className="text-lg font-black text-emerald-400">223</div>
                  <div className="text-[11px] text-slate-400">Sub-Topics</div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleOpenCourse('fde')}
                className="w-full py-3.5 px-5 rounded-xl rgb-glow-btn text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:scale-[1.01]"
              >
                <span>Open FDE Curriculum &amp; Reader</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. THE 4 ADVANCED ENGINEERING SPRINTS */}
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Specialized Modular Sprints
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Targeted Technical Sprints
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Short, intensive engineering sprints focusing on high-demand AI infrastructure layers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sprints.map((sprint) => (
            <div 
              key={sprint.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${sprint.badgeColor}`}>
                    {sprint.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{sprint.duration}</span>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {sprint.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {sprint.subtitle}
                </p>
                <div className="text-[11px] font-mono text-purple-300 bg-slate-950 p-2 rounded-lg border border-slate-800/80 mb-4">
                  {sprint.stats}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex gap-1">
                  {sprint.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleOpenCourse(sprint.targetCourse)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                  title="View curriculum"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CHOOSE YOUR AREA OF INTEREST (DOMAINS 01 - 07 & ROADMAPS) */}
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Curriculum Domains
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Choose Your Area of Interest
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Explore specific engineering topics across our 01–07 technical domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((domain) => {
            const Icon = domain.icon;
            const isCallout = domain.id === '08';
            return (
              <div
                key={domain.id}
                onClick={() => onNavigate('contents')}
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

      {/* 5. PLATFORM TOOLKIT (8 PRODUCTS) */}
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-pink-400 font-bold mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Ecosystem Access
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Your Platform Toolkit
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Included in your student account: cloud sandboxes, AI evaluation, voice mock interviews, and talent network.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolkits.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${tool.color}`} />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white mb-2">{tool.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">Unlocked</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. FROM FIRST LESSON TO FIRST OFFER (4-STEP WALKTHROUGH) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/80 space-y-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Progression Blueprint
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            From first lesson to first offer, in one place
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Follow our verified progression path from foundational concepts to production offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 font-mono font-bold flex items-center justify-center text-xs mb-3">
              01
            </div>
            <div className="font-bold text-white text-sm mb-1">Learn live &amp; self-paced</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Phase 0 to Phase 12 textbooks, architectural diagrams, and lab code.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono font-bold flex items-center justify-center text-xs mb-3">
              02
            </div>
            <div className="font-bold text-white text-sm mb-1">Build real systems</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              FastAPI services, pgvector pipelines, and vLLM GPU inference containers.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold flex items-center justify-center text-xs mb-3">
              03
            </div>
            <div className="font-bold text-white text-sm mb-1">Prove with AI scoring</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Automated system design rubric evaluations and code quality reviews.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs mb-3">
              04
            </div>
            <div className="font-bold text-white text-sm mb-1">One profile, direct offers</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Showcase verified code repositories directly to partner engineering leads.
            </div>
          </div>
        </div>
      </div>

      {/* 7. CURRICULUM COMPARISON MATRIX */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 p-8 space-y-6 rgb-glow-card hover:border-purple-500/40">
        <div>
          <div className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Program Overview
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Curriculum Comparison Matrix
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            How the AI Masterclass and Forward Deployed AI Architect curricula complement each other.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-4 font-bold">Dimension</th>
                <th className="py-3 px-4 font-bold text-cyan-400">AI Masterclass</th>
                <th className="py-3 px-4 font-bold text-pink-400">FDE AI Architect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">Target Roles</td>
                <td className="py-3.5 px-4 text-cyan-200">AI Engineer, LLM Engineer, Applied ML Developer</td>
                <td className="py-3.5 px-4 text-pink-200">Forward Deployed Engineer, Enterprise AI Architect</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">Duration</td>
                <td className="py-3.5 px-4">12 Weeks (80+ Hours)</td>
                <td className="py-3.5 px-4">36 Weeks (400+ Hours)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">Primary Focus</td>
                <td className="py-3.5 px-4">Model steering, advanced RAG, multi-agent graphs &amp; fine-tuning</td>
                <td className="py-3.5 px-4">Production backend, identity, data pipelines, Kubernetes &amp; client delivery</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">Interactive Reading</td>
                <td className="py-3.5 px-4">8 Detailed Module Breakdowns &amp; Lab Blueprints</td>
                <td className="py-3.5 px-4">30 Ready Textbook Chapters with Code &amp; 16 Architecture Diagrams</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">Capstone Project</td>
                <td className="py-3.5 px-4">Autonomous Multimodal Research Agent with Evaluation</td>
                <td className="py-3.5 px-4">17 Real-World Production Deliverables across 13 Phases</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. THE 13.5H/WEEK MASTERY ENGINE */}
      <div className="bg-slate-900/90 text-white rounded-3xl p-8 border border-slate-800/80 space-y-6 rgb-glow-card hover:border-cyan-500/40">
        <div className="max-w-2xl">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Operating Rhythm
          </div>
          <h2 className="text-2xl font-bold mt-1">The 13.5h/Week Mastery Engine</h2>
          <p className="text-slate-400 text-sm mt-1">
            Structured for working engineers: 1–1.25h focused weekday blocks, plus dedicated weekend project build and CTO-level system explanations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { day: 'Mon', mode: 'Learn', desc: 'Theory & Core Vocab', time: '1.25h' },
            { day: 'Tue', mode: 'Architect', desc: 'Boundaries & ADRs', time: '1.25h' },
            { day: 'Wed', mode: 'Implement', desc: 'Working Slice', time: '1.25h' },
            { day: 'Thu', mode: 'Harden', desc: 'Security & Edge Cases', time: '1.25h' },
            { day: 'Fri', mode: 'Review', desc: 'Break & Fault Test', time: '1.0h' },
            { day: 'Sat', mode: 'Build', desc: 'Hands-on Deliverable', time: '4.0h', highlight: 'cyan' },
            { day: 'Sun', mode: 'Explain', desc: 'CTO-Level Narrative', time: '3.5h', highlight: 'pink' },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${
                item.highlight === 'pink'
                  ? 'bg-pink-500/10 border-pink-500/30 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                  : item.highlight === 'cyan'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider">{item.day}</div>
              <div className="text-sm font-bold text-white mt-1">{item.mode}</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
              <div className={`text-xs font-mono font-semibold mt-2 ${
                item.highlight === 'pink' ? 'text-pink-400' : item.highlight === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
              }`}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
