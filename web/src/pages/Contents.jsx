import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Filter, 
  Award, 
  Database,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Compass,
  FileCode2,
  CheckSquare,
  Square,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function Contents({ curriculum, progress, onToggleProgress, onSelectChapter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all'); // 'all', 'core', 'mandatory', 'optional'
  const [activeModalSubtopic, setActiveModalSubtopic] = useState(null);

  const allPhases = curriculum?.phases || [];
  const completedSubs = new Set(progress?.completed_subtopics || []);

  // Filter phases, topics, subtopics while keeping whole content displayed
  const displayedPhases = useMemo(() => {
    return allPhases.map(phase => {
      const filteredTopics = phase.topics.map(topic => {
        const filteredSubs = topic.subtopics.filter(sub => {
          // Track filter
          if (selectedTrack === 'core' && sub.track !== 'Core') return false;
          if (selectedTrack === 'mandatory' && !sub.track?.includes('Mandatory')) return false;
          if (selectedTrack === 'optional' && !sub.track?.includes('Optional')) return false;

          // Search query
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          return (
            sub.name.toLowerCase().includes(q) ||
            (sub.details && sub.details.toLowerCase().includes(q)) ||
            topic.topic_name.toLowerCase().includes(q) ||
            phase.name.toLowerCase().includes(q) ||
            phase.phase_id.toLowerCase().includes(q)
          );
        });

        if (filteredSubs.length === 0 && searchQuery.trim()) return null;

        return {
          ...topic,
          subtopics: filteredSubs
        };
      }).filter(Boolean);

      if (filteredTopics.length === 0 && searchQuery.trim()) return null;

      return {
        ...phase,
        topics: filteredTopics
      };
    }).filter(Boolean);
  }, [allPhases, selectedTrack, searchQuery]);

  const scrollToPhase = (phaseId) => {
    const el = document.getElementById(`phase-${phaseId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubtopicClick = (sub, phase, topic) => {
    if (sub.has_content && sub.chapter_id) {
      onSelectChapter(sub.chapter_id);
    } else {
      setActiveModalSubtopic({ sub, phase, topic });
    }
  };

  const handleTopicClick = (topic) => {
    const firstSub = topic.subtopics?.[0];
    if (firstSub && firstSub.has_content && firstSub.chapter_id) {
      onSelectChapter(firstSub.chapter_id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      
      {/* 1. Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Master Table of Contents
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
            <Database className="w-3 h-3 text-cyan-400" />
            SQLite-Backed Coverage Tracker (`user_progress` table)
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Master Curriculum <span className="rgb-gradient-text animate-rgb-flow">Table of Contents</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-4xl leading-relaxed">
          The entire 36-week body of knowledge. Check off completed topics using the interactive checkboxes{' '}
          <code className="text-cyan-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">[✓]</code>{' '}
          to save your progress directly into the SQLite database.
        </p>
      </div>

      {/* 2. Master Progress Summary Card */}
      {progress && (
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5 rgb-glow-card overflow-hidden">
          <div className="absolute top-0 left-0 right-0">
            <div className="rgb-laser-line opacity-50"></div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Live Curriculum Coverage
              </div>
              <h2 className="text-2xl font-black mt-1">
                Your Learning Milestone Tracker
              </h2>
            </div>

            <div className="text-right flex items-center gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 font-mono">
                  {progress.overall_percentage}%
                </div>
                <div className="text-xs text-slate-400">Total Curriculum Covered</div>
              </div>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-400 to-emerald-400 animate-rgb-flow rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progress.overall_percentage, 1)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>{progress.total_completed} of {progress.total_subtopics} Sub-topics Completed</span>
              <span>{progress.completed_hours} of {progress.total_hours} Hours Logged</span>
            </div>
          </div>

          {/* Phase 0 Mini Spotlight */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">Phase 0 Foundations:</span>
              <span className="text-emerald-400 font-mono font-semibold">
                {progress.p0_completed_count} / {progress.p0_total_subtopics} Chapters ({progress.p0_percentage}%)
              </span>
            </div>
            <span className="text-slate-500">All progress is synchronized with your SQLite account in real time.</span>
          </div>
        </div>
      )}

      {/* 3. Top Sticky Bar: Search + Track Filter + Phase Jump */}
      <div className="sticky top-16 z-30 bg-slate-950/90 backdrop-blur-md pt-2 pb-4 border-b border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 223 topics (e.g. FastAPI, AsyncIO, ColPali, RAGAS, MCP, Kubernetes, pgvector)..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Track Filters */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Tracks (223)' },
              { id: 'core', label: 'Core (201)' },
              { id: 'mandatory', label: 'Mandatory (14)' },
              { id: 'optional', label: 'Optional (8)' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTrack === t.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

        </div>

        {/* Phase Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Jump to:
          </span>
          {allPhases.map(p => (
            <button
              key={p.phase_id}
              onClick={() => scrollToPhase(p.phase_id)}
              className={`px-2.5 py-1 rounded-md font-mono font-bold whitespace-nowrap transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                p.phase_id === 'P0'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-slate-850'
              }`}
            >
              {p.phase_id}
            </button>
          ))}
        </div>
      </div>

      {/* 4. The Full Master Curriculum Hierarchy (Whole Content Displayed) */}
      <div className="space-y-12">
        {displayedPhases.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400">
            No topics match: <strong>"{searchQuery}"</strong>
          </div>
        ) : (
          displayedPhases.map((phase) => {
            const isP0 = phase.phase_id === 'P0';
            const totalSubtopics = phase.topics.reduce((acc, t) => acc + t.subtopics.length, 0);
            const completedCountInPhase = phase.topics.reduce(
              (acc, t) => acc + t.subtopics.filter(s => completedSubs.has(s.id)).length, 0
            );
            const phasePct = totalSubtopics ? Math.round((completedCountInPhase / totalSubtopics) * 100) : 0;

            return (
              <section 
                key={phase.phase_id} 
                id={`phase-${phase.phase_id}`}
                className="scroll-mt-40 space-y-5 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl rgb-glow-card hover:border-cyan-500/40 transition-all"
              >
                
                {/* Phase Level Header */}
                <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-md ${
                        isP0 
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                          : 'bg-slate-800 text-slate-200 border border-slate-700'
                      }`}>
                        {phase.phase_id}
                      </span>
                      
                      <span className="text-xs font-semibold text-slate-400">
                        {phase.weeks}
                      </span>

                      {isP0 ? (
                        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          30 Interactive Chapters Available
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                          Curriculum Roadmap
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                      {phase.name}
                    </h2>
                  </div>

                  {/* Phase Coverage Metric */}
                  <div className="sm:text-right shrink-0">
                    <div className="text-xs font-bold text-slate-300 font-mono">
                      {completedCountInPhase} / {totalSubtopics} Completed ({phasePct}%)
                    </div>
                    <div className="w-32 h-2 bg-slate-950 rounded-full overflow-hidden mt-1 sm:ml-auto border border-slate-800">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${phasePct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Phase Deliverable Banner */}
                {phase.deliverables && phase.deliverables.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/30 flex items-start gap-3">
                    <Award className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="font-bold text-pink-300 text-sm">
                        Portfolio Milestone: {phase.deliverables[0].project}
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {phase.deliverables[0].scope}
                      </p>
                      <div className="text-[11px] text-pink-400 font-mono">
                        Evidence: {phase.deliverables[0].evidence}
                      </div>
                    </div>
                  </div>
                )}

                {/* Topics Container (Whole content openly displayed) */}
                <div className="space-y-6 pt-2">
                  {phase.topics.map((topic, tIdx) => {
                    const hasFirstChapter = topic.subtopics?.[0]?.has_content;

                    return (
                      <div 
                        key={topic.topic_id || tIdx} 
                        id={`topic-${topic.topic_id}`}
                        className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-4 hover:border-slate-700/80 transition-colors"
                      >
                        
                        {/* Topic Header (Hyperlinked) */}
                        <div className="flex items-center justify-between gap-3 border-b border-slate-800/60 pb-3">
                          <div 
                            onClick={() => handleTopicClick(topic)}
                            className={`flex items-center gap-2.5 flex-wrap ${
                              hasFirstChapter ? 'cursor-pointer group' : ''
                            }`}
                          >
                            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                              {topic.topic_code || `Topic 0${tIdx + 1}`}
                            </span>

                            <h3 className={`text-base sm:text-lg font-bold ${
                              hasFirstChapter 
                                ? 'text-white group-hover:text-cyan-300 group-hover:underline' 
                                : 'text-white'
                            }`}>
                              {topic.topic_name}
                            </h3>

                            {hasFirstChapter && (
                              <ArrowRight className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>

                          <span className="text-xs text-slate-400 font-medium shrink-0">
                            {topic.subtopics.length} sub-topics
                          </span>
                        </div>

                        {/* Sub-topics List (Every item hyperlinked with completion checkbox) */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {topic.subtopics.map((sub, sIdx) => {
                            const isDone = completedSubs.has(sub.id);
                            const isClickable = Boolean(sub.has_content && sub.chapter_id);
                            const isMandatory = sub.track?.includes('Mandatory');
                            const isOptional = sub.track?.includes('Optional');

                            return (
                              <div
                                key={sub.id || sIdx}
                                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                  isDone
                                    ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                    : isClickable
                                    ? 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] text-slate-200'
                                    : 'bg-slate-900/40 border-slate-800/60 text-slate-300'
                                }`}
                              >
                                
                                {/* Left: Completion Checkbox + Title & Details */}
                                <div className="flex items-start gap-3 flex-1 pr-2">
                                  
                                  {/* Interactive SQLite Checkbox */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleProgress(sub.id, sub.chapter_id);
                                    }}
                                    title={isDone ? 'Mark Incomplete' : 'Mark Completed in SQLite DB'}
                                    className={`mt-0.5 p-1 rounded-md transition-colors cursor-pointer ${
                                      isDone 
                                        ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/15' 
                                        : 'text-slate-600 hover:text-cyan-400 hover:bg-slate-800'
                                    }`}
                                  >
                                    {isDone ? (
                                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                                    ) : (
                                      <Square className="w-5 h-5" />
                                    )}
                                  </button>

                                  <div 
                                    className="space-y-1 flex-1 cursor-pointer"
                                    onClick={() => handleSubtopicClick(sub, phase, topic)}
                                  >
                                    <div className="flex items-center gap-2 flex-wrap">
                                      {/* Number & Hyperlinked Title */}
                                      <span className="text-xs font-mono text-slate-500 font-semibold">
                                        {String(sIdx + 1).padStart(2, '0')}.
                                      </span>

                                      <span className={`text-sm font-semibold transition-colors ${
                                        isDone
                                          ? 'text-emerald-300 font-bold'
                                          : isClickable
                                          ? 'text-slate-200 hover:text-cyan-300 hover:underline'
                                          : 'text-slate-300'
                                      }`}>
                                        {sub.name}
                                      </span>

                                      {/* Status Badges */}
                                      {isDone && (
                                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-xs">
                                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                          Completed
                                        </span>
                                      )}

                                      {isMandatory && (
                                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                                          Mandatory Addition
                                        </span>
                                      )}
                                      {isOptional && (
                                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                          Optional Depth
                                        </span>
                                      )}
                                    </div>

                                    {sub.details && (
                                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 pl-5">
                                        {sub.details}
                                      </p>
                                    )}
                                  </div>

                                </div>

                                {/* Right: Hours + Action Link */}
                                <div className="flex items-center gap-3 self-end sm:self-center shrink-0 pl-8 sm:pl-0">
                                  {sub.hours && (
                                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {sub.hours}h
                                    </span>
                                  )}

                                  {isClickable ? (
                                    <button 
                                      onClick={() => onSelectChapter(sub.chapter_id)}
                                      className="px-3 py-1.5 rounded-lg rgb-glow-btn text-white font-bold text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                    >
                                      <span>Read Chapter</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => setActiveModalSubtopic({ sub, phase, topic })}
                                      className="px-2.5 py-1 rounded text-xs font-medium text-slate-400 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                      <span>View Details</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>

                              </div>
                            );
                          })}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </section>
            );
          })
        )}
      </div>

      {/* 5. Subtopic Detail Modal (For Roadmap Subtopics in P1–P12) */}
      {activeModalSubtopic && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalSubtopic(null)}
        >
          <div 
            className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 space-y-6 relative max-h-[90vh] overflow-y-auto rgb-glow-card text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalSubtopic(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {activeModalSubtopic.phase.phase_id}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeModalSubtopic.phase.name}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs text-slate-400">
                  {activeModalSubtopic.topic.topic_name}
                </span>
              </div>

              <h2 className="text-2xl font-black text-white">
                {activeModalSubtopic.sub.name}
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sub-Topic Scope & Expected Architectural Depth
                </div>
                <p className="leading-relaxed text-slate-300">
                  {activeModalSubtopic.sub.details || "Comprehensive technical architecture, design patterns, and production implementation."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="text-slate-400 font-semibold">Planned Hours</div>
                  <div className="text-sm font-bold text-white mt-0.5">{activeModalSubtopic.sub.hours || 2.0} Hours</div>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="text-slate-400 font-semibold">Track</div>
                  <div className="text-sm font-bold text-white mt-0.5">{activeModalSubtopic.sub.track || "Core"}</div>
                </div>
              </div>

              {activeModalSubtopic.phase.deliverables?.[0] && (
                <div className="p-4 rounded-xl bg-slate-950 border border-pink-500/30 text-xs text-pink-300 space-y-1">
                  <div className="font-bold">Phase Deliverable Milestone:</div>
                  <div className="text-slate-200">{activeModalSubtopic.phase.deliverables[0].project}</div>
                  <div className="text-[11px] text-pink-400 italic">
                    {activeModalSubtopic.phase.deliverables[0].scope}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onToggleProgress(activeModalSubtopic.sub.id, activeModalSubtopic.sub.chapter_id);
                  setActiveModalSubtopic(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  completedSubs.has(activeModalSubtopic.sub.id)
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedSubs.has(activeModalSubtopic.sub.id) ? 'Mark as Incomplete' : 'Mark as Completed in SQLite'}
                </span>
              </button>

              <button
                onClick={() => setActiveModalSubtopic(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
