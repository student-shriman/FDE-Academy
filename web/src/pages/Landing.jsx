import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Layers, 
  Terminal, 
  Users, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  Star, 
  Clock, 
  Flame,
  ChevronRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export default function Landing({ onNavigate, onSelectCourse, user }) {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTags = [
    'Generative AI',
    'Forward Deployed',
    'Agentic AI',
    'Enterprise RAG',
    'System Design',
    'Kubernetes GPU'
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
    }
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
      onSelectCourse(courseId);
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

      {/* CLEAN NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
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
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#tracks" className="hover:text-cyan-400 transition-colors">Flagship Tracks</a>
            <a href="#super30" className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
              <span>Super 30</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 animate-pulse">Cohort 10</span>
            </a>
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
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-24 overflow-hidden">
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
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
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
                    placeholder="What do you want to learn? (e.g. LangGraph, RAG, FastAPI)..."
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
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      const el = document.getElementById('tracks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="rgb-glow-btn px-6 py-3.5 rounded-2xl text-base font-extrabold flex items-center gap-2.5 cursor-pointer shadow-xl shadow-purple-500/20"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#tracks"
                  className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <span>Explore 2 Tracks</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Device Frame / Live Cohort Preview */}
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
                      <span className="text-slate-500 text-[10px] ml-2">fde-cluster ~ bash</span>
                    </div>
                    <div className="text-pink-400">$ python -m fde.deploy</div>
                    <div className="text-slate-400">Loading vLLM engine (A100 x 8)...</div>
                    <div className="text-emerald-400">✓ KV cache initialized: 128k context</div>
                    <div className="text-cyan-300">✓ LangGraph state-machine online</div>
                    <div className="text-purple-400">Ready: Production residency active.</div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">Work &amp; Learn Apprenticeship</h3>
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
      <section className="py-10 overflow-hidden bg-slate-950/20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            Our learners &amp; alumni ship production systems at
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

      {/* 2 FLAGSHIP COURSES SECTION */}
      <section id="tracks" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Flagship Curricula</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Two World-Class Engineering Tracks
            </h2>
            <p className="text-slate-400 text-base mt-2">
              From foundational Transformer mechanics to multi-phase enterprise AI architecture.
            </p>
          </div>

          {/* 2 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="rgb-glow-card rounded-3xl bg-slate-900/70 border border-slate-800 p-8 flex flex-col justify-between hover:border-slate-700 transition-all relative group"
              >
                <div>
                  {/* Badge & Duration */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {course.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {course.subtitle}
                  </p>

                  {/* Highlights */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-5">
                    <div className="text-xs font-mono text-purple-300 font-bold">
                      {course.stats}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Instructor: {course.instructor}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Included in Academy</span>
                  <button
                    onClick={() => handleEnrollClick(course.id)}
                    className="px-5 py-2.5 rounded-xl rgb-glow-btn text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow"
                  >
                    <span>{user ? 'View Syllabus' : 'Sign In to Access'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Unlock More Banner */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20 border border-purple-500/30 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="font-black text-white text-base">Looking for specialized sprints and cloud labs?</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Sign in to unlock all 4 specialized sprints, the 01–07 domain roadmaps, in-browser GPU labs, and AI code review.
              </div>
            </div>
            <button
              onClick={() => onNavigate('login')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs shrink-0 cursor-pointer transition-all"
            >
              <span>Create Free Account →</span>
            </button>
          </div>

        </div>
      </section>

      {/* SUPER 30 TEASER */}
      <section id="super30" className="py-16 relative overflow-hidden bg-gradient-to-b from-[#070b14] to-[#030712] border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rgb-border-box p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-wider border border-pink-500/40">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Work &amp; Learn Apprenticeship</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Stop only studying. <span className="rgb-gradient-text">Start working.</span>
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Super 30 is a rigorous 6-month residency where you tackle production tickets and architecture design docs alongside senior leads.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate('login')}
                    className="rgb-glow-btn px-6 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Apply for Super 30</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono">30 Seats Max &bull; Strict Selection</span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-3 text-xs">
                <div className="font-bold text-white uppercase text-[11px] tracking-wider text-slate-400">Cohort 10 Highlights</div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-mono text-slate-200">6 Months Intensive</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Workload</span>
                  <span className="font-mono text-slate-200">15-20 hrs / week</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Sandboxes</span>
                  <span className="font-mono text-cyan-400">Dedicated A100 GPU</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CLEAN FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg p-[1px] bg-gradient-to-tr from-pink-500 to-cyan-400">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center text-white font-black text-xs">
                AI
              </div>
            </div>
            <span className="font-extrabold text-white text-sm">AI Academy</span>
            <span className="text-slate-500">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <button onClick={() => onNavigate('login')} className="hover:text-cyan-400 cursor-pointer">Sign In</button>
            <button onClick={() => onNavigate('login')} className="hover:text-cyan-400 cursor-pointer">Create Account</button>
            <a href="#tracks" className="hover:text-cyan-400">Curricula</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
