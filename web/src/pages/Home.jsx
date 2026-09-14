import React from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Code2, 
  ShieldCheck, 
  FileText,
  Clock,
  Compass,
  Cpu,
  GraduationCap,
  ListTree,
  Terminal,
  Workflow,
  Wrench,
  Award
} from 'lucide-react';
import { coursesData } from '../data/coursesData';

export default function Home({ user, curriculum, onNavigate, onSelectChapter, onSelectCourse }) {
  const aiMasterclass = coursesData['ai-masterclass'];
  const fdeCourse = coursesData['fde'];

  const handleOpenCourse = (courseId) => {
    if (onSelectCourse) onSelectCourse(courseId);
    window.location.hash = `course/${courseId}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Intro & Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            Welcome back, {user.name}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The AI Engineering & <span className="text-amber-400">Architect</span> Academy
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Choose your specialized learning track below. From modern <strong>Generative AI & LLM Engineering</strong> 
            to high-stakes <strong>Forward Deployed Enterprise Architecture</strong>, our curricula provide hands-on, 
            production-verified code, visual architectures, and portfolio-ready deliverables.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Browse All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectChapter('chapter-1')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Continue Phase 0 Reader</span>
            </button>

            <button
              onClick={() => onNavigate('preface')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Read FDE Manifesto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Courses Hub Section */}
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
            Core Curriculum Tracks
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Select Your Specialization
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Pick a track to view detailed syllabi, weekly modules, code repositories, and project milestones.
          </p>
        </div>

        {/* 2 Flagship Courses Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* COURSE 1: AI Masterclass */}
          <div className="group relative bg-slate-900 rounded-3xl border border-blue-500/30 p-8 flex flex-col justify-between hover:border-blue-400 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  <Cpu className="w-3.5 h-3.5" />
                  Course 1 &middot; 12 Weeks
                </span>
                <span className="text-xs font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  Intermediate → Advanced
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  AI Masterclass
                </h3>
                <div className="text-sm font-semibold text-blue-300 mt-1">
                  Foundations to Production Generative AI
                </div>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Deep-dive into modern LLM engineering. Learn the internal mechanics of Transformers, 
                  chain-of-thought prompt reasoning, high-dimensional vector search, hybrid enterprise RAG, 
                  stateful LangGraph agents, LoRA fine-tuning, and LLMOps evaluation.
                </p>
              </div>

              {/* Module badges */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Curriculum Highlights:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Transformer Internals',
                    'Prompt Reasoning (CoT/ReAct)',
                    'Vector DBs (Qdrant/Pinecone)',
                    'Hybrid Enterprise RAG',
                    'Multi-Agent Graphs',
                    'LoRA/QLoRA Fine-Tuning',
                    'LLMOps & Ragas Eval'
                  ].map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800 text-center">
                <div>
                  <div className="text-lg font-black text-white">8</div>
                  <div className="text-[11px] text-slate-400">Modules</div>
                </div>
                <div>
                  <div className="text-lg font-black text-blue-400">48</div>
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
                className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer group-hover:scale-[1.01]"
              >
                <span>View AI Masterclass Details & Syllabus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COURSE 2: FDE (Forward Deployed AI Architect) */}
          <div className="group relative bg-slate-900 rounded-3xl border border-amber-500/30 p-8 flex flex-col justify-between hover:border-amber-400 transition-all hover:shadow-2xl hover:shadow-amber-500/10">
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
                  Enterprise AI Systems & Production Delivery
                </div>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  The flagship 36-week enterprise delivery program. Learn to build and deploy zero-failure 
                  AI systems inside Fortune 500 environments: production Python & FastAPI, enterprise identity (OAuth/RBAC), 
                  Kafka pipelines, Kubernetes GPU clusters, AI security, and client PoV-to-production exit gates.
                </p>
              </div>

              {/* Module badges */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Curriculum Highlights:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Phase 0: 30 Live Chapters',
                    'Production Python AsyncIO',
                    'Enterprise AI System Design',
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
              </div>

              {/* Stats Bar */}
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
                className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer group-hover:scale-[1.01]"
              >
                <span>View FDE Curriculum & Chapters</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Side-by-Side Track Comparison Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
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
                <th className="py-3 px-4 font-bold text-blue-400">AI Masterclass</th>
                <th className="py-3 px-4 font-bold text-amber-400">FDE AI Architect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Target Roles</td>
                <td className="py-3.5 px-4">AI Engineer, LLM Engineer, Applied ML Developer</td>
                <td className="py-3.5 px-4">Forward Deployed Engineer, Enterprise AI Architect</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Duration</td>
                <td className="py-3.5 px-4">12 Weeks (80+ Hours)</td>
                <td className="py-3.5 px-4">36 Weeks (400+ Hours)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Primary Focus</td>
                <td className="py-3.5 px-4">Model steering, advanced RAG, multi-agent graphs & fine-tuning</td>
                <td className="py-3.5 px-4">Production backend, identity, data pipelines, Kubernetes & client delivery</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Interactive Reading</td>
                <td className="py-3.5 px-4">8 Detailed Module Breakdowns & Lab Blueprints</td>
                <td className="py-3.5 px-4">30 Ready Textbook Chapters with Code & 16 Architecture Diagrams</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-white">Capstone Project</td>
                <td className="py-3.5 px-4">Autonomous Multimodal Research Agent with Evaluation</td>
                <td className="py-3.5 px-4">17 Real-World Production Deliverables across 13 Phases</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The 7-Day Weekly Mastery Rhythm */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="max-w-2xl">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">Operating Rhythm</div>
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
            { day: 'Sat', mode: 'Build', desc: 'Hands-on Deliverable', time: '4.0h', highlight: true },
            { day: 'Sun', mode: 'Explain', desc: 'CTO-Level Narrative', time: '3.5h', highlight: true },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border text-center ${
                item.highlight 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider">{item.day}</div>
              <div className="text-sm font-bold text-white mt-1">{item.mode}</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
              <div className="text-xs font-mono font-semibold text-amber-400 mt-2">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
