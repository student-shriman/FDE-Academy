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
  Compass
} from 'lucide-react';

export default function Home({ user, curriculum, onNavigate, onSelectChapter }) {
  const p0Phase = curriculum?.phases?.find(p => p.phase_id === 'P0') || curriculum?.phases?.[0];
  const p0Topics = p0Phase?.topics || [];
  const allPhases = curriculum?.phases || [];
  const deliverables = curriculum?.deliverables || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            Welcome back, {user.name}
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Forward Deployed <span className="text-amber-400">AI Architect</span> Academy
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A 36-week, production-hardened engineering curriculum. Bridging the gap between 
            high-level enterprise AI strategy and low-level, mission-critical production systems.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onSelectChapter('chapter-1')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Reading Phase 0 (Chapter 1)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('preface')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Read Preface & Operating Model</span>
            </button>

            <button
              onClick={() => onNavigate('contents')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>View Full Hierarchy Tree</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Curriculum Scope</div>
          <div className="text-3xl font-black text-slate-900">36 Weeks</div>
          <div className="text-xs text-slate-500 mt-1">Across 13 comprehensive phases</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Phase 0 Status</div>
          <div className="text-3xl font-black text-emerald-600 flex items-center gap-2">
            30 / 30
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="text-xs text-slate-500 mt-1">Chapters ready with diagrams & code</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Architecture Diagrams</div>
          <div className="text-3xl font-black text-amber-600">16 Custom</div>
          <div className="text-xs text-slate-500 mt-1">Embedded high-res visual assets</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Portfolio Milestones</div>
          <div className="text-3xl font-black text-blue-600">17 Projects</div>
          <div className="text-xs text-slate-500 mt-1">Production-ready deliverables</div>
        </div>
      </div>

      {/* Phase 0 Spotlight: Topics Preview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Phase 0: Baseline & Engineering Foundations</h2>
            <p className="text-sm text-slate-500 mt-1">The essential technical depth and delivery discipline of a Forward Deployed Engineer.</p>
          </div>
          <button
            onClick={() => onNavigate('contents')}
            className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1.5"
          >
            <span>Explore All 30 Chapters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {p0Topics.map((topic, idx) => {
            const chapterCount = topic.subtopics?.length || 0;
            const firstChapterId = topic.subtopics?.[0]?.chapter_id || 'chapter-1';
            
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                      Module 0{idx + 1}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {chapterCount} Chapters Ready
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {topic.topic_name}
                  </h3>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {topic.subtopics?.slice(0, 3).map((sub, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <span className="truncate">{sub.name}</span>
                      </li>
                    ))}
                    {chapterCount > 3 && (
                      <li className="text-slate-400 italic text-[11px] pt-1">
                        + {chapterCount - 3} more chapters
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {topic.week || 'Week 1'}
                  </span>
                  
                  <button
                    onClick={() => onSelectChapter(firstChapterId)}
                    className="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The 7-Day Rhythm */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="max-w-2xl">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">Weekly Operating Rhythm</div>
          <h2 className="text-2xl font-bold mt-1">The 13.5h/Week Mastery Engine</h2>
          <p className="text-slate-400 text-sm mt-1">
            Structured for working engineers: 1–1.25h weekday blocks, plus dedicated weekend project build and CTO-level system explanations.
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
