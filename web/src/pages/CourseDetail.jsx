import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  ExternalLink, 
  ListTree, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp,
  Boxes,
  Code2,
  Workflow,
  Wrench
} from 'lucide-react';
import { coursesData } from '../data/coursesData';

export default function CourseDetail({ 
  courseId = 'ai-masterclass', 
  onSelectCourse, 
  onNavigate, 
  onSelectChapter 
}) {
  const [activeCourseId, setActiveCourseId] = useState(courseId || 'ai-masterclass');
  const [expandedModules, setExpandedModules] = useState({ 0: true });

  const course = coursesData[activeCourseId] || coursesData['ai-masterclass'];
  const isAIMasterclass = activeCourseId === 'ai-masterclass';

  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAll = () => {
    const all = {};
    const items = isAIMasterclass ? course.modules : course.phases;
    items.forEach((_, idx) => { all[idx] = true; });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  const handleSwitchCourse = (id) => {
    setActiveCourseId(id);
    if (onSelectCourse) onSelectCourse(id);
    window.location.hash = `course/${id}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Course Switcher Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Academy Course Directory
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Explore Academy Programs
          </h2>
        </div>

        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => handleSwitchCourse('ai-masterclass')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCourseId === 'ai-masterclass'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Masterclass (12 Weeks)</span>
          </button>

          <button
            onClick={() => handleSwitchCourse('fde')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCourseId === 'fde'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>FDE Architect (36 Weeks)</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className={`relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border ${course.borderGlow} p-8 sm:p-12 overflow-hidden shadow-2xl`}>
        <div className={`absolute top-0 right-0 w-96 h-96 ${isAIMasterclass ? 'bg-blue-500/10' : 'bg-amber-500/10'} rounded-full blur-3xl pointer-events-none`}></div>
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isAIMasterclass 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              {course.badge}
            </span>
            <span className="text-xs font-semibold text-slate-400 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
              {course.level}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {course.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap gap-4">
            {isAIMasterclass ? (
              <>
                <button
                  onClick={() => {
                    const el = document.getElementById('curriculum-syllabus');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore 8 Modules Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('home')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Back to Academy Overview</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onSelectChapter('chapter-1')}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Launch Phase 0 Reader (30 Chapters)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('contents')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                >
                  <ListTree className="w-4 h-4" />
                  <span>View 13-Phase Table of Contents</span>
                </button>

                <button
                  onClick={() => onNavigate('preface')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                >
                  <span>Read FDE Manifesto</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>Duration</span>
          </div>
          <div className="text-3xl font-black text-white">{course.duration}</div>
          <div className="text-xs text-slate-500 mt-1">{course.estimatedHours} intensive curriculum</div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Curriculum Scope</span>
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {isAIMasterclass ? `${course.modulesCount} Modules` : `${course.modulesCount} Phases`}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {isAIMasterclass ? `${course.topicsCount} In-Depth Topics` : `${course.topicsCount} Topics • ${course.labsCount} Subtopics`}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Practical Labs</span>
          </div>
          <div className="text-3xl font-black text-amber-400">
            {isAIMasterclass ? '10 Labs' : '30 Ready Chapters'}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {isAIMasterclass ? 'Executable code & benchmarks' : 'With code, diagrams & pitfalls'}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Capstone Milestone</span>
          </div>
          <div className="text-3xl font-black text-purple-400">
            {isAIMasterclass ? '1 Production' : '17 Deliverables'}
          </div>
          <div className="text-xs text-slate-500 mt-1">Portfolio-grade acceptance criteria</div>
        </div>
      </div>

      {/* Target Roles & Prerequisites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Target Career Outcomes</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {course.targetRoles.map((role, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-slate-300">
            <Wrench className="w-4 h-4 text-blue-400" />
            <span>Prerequisites & Expectations</span>
          </div>
          <ul className="space-y-2 pt-2">
            {course.prerequisites.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Curriculum Section */}
      <div id="curriculum-syllabus" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Curriculum Architecture
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              {isAIMasterclass ? '8 Core Engineering Modules' : '13 Enterprise Engineering Phases'}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {isAIMasterclass ? (
            /* --- AI MASTERCLASS MODULES --- */
            course.modules.map((mod, idx) => {
              const isExpanded = !!expandedModules[idx];
              return (
                <div 
                  key={mod.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleModule(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-850 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm shrink-0">
                        {mod.moduleNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono font-bold text-blue-400">{mod.duration}</span>
                          <span className="text-slate-600">&middot;</span>
                          <span className="text-xs text-slate-400">{mod.hours} Hours</span>
                        </div>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {mod.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-1 rounded-lg text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {mod.description}
                      </p>

                      {/* Topics */}
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Core Topics Covered:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mod.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Lab Box */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                          <div>
                            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                              Hands-On Lab:
                            </div>
                            <div className="text-xs text-slate-200 mt-0.5">
                              {mod.lab}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 shrink-0">
                          {mod.tools.map((tool, toolIdx) => (
                            <span 
                              key={toolIdx}
                              className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-slate-300"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* --- FDE TRACK PHASES --- */
            course.phases.map((phase, idx) => {
              const isExpanded = !!expandedModules[idx];
              const isP0 = phase.phaseId === 'P0';
              return (
                <div 
                  key={phase.phaseId}
                  className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all ${
                    isP0 ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-slate-800'
                  }`}
                >
                  <button
                    onClick={() => toggleModule(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-850 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                        isP0 
                          ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {phase.phaseId}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono font-bold text-amber-400">{phase.weeks}</span>
                          <span className="text-slate-600">&middot;</span>
                          <span className="text-xs text-slate-400">{phase.hours} Hours</span>
                          {isP0 && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              ✓ 30 Chapters Live
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          {phase.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-1 rounded-lg text-slate-400 hover:text-white">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {phase.description}
                      </p>

                      {/* Topics */}
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Key Areas of Depth:
                        </div>
                        <ul className="space-y-1.5">
                          {phase.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverable Box */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                          <div>
                            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                              Portfolio Deliverable:
                            </div>
                            <div className="text-xs text-slate-200 mt-0.5 font-medium">
                              {phase.deliverable}
                            </div>
                          </div>
                        </div>

                        {isP0 && (
                          <button
                            onClick={() => onSelectChapter('chapter-1')}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 shrink-0 transition-all cursor-pointer"
                          >
                            <span>Read Chapters</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Capstone Spotlight Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
          <Sparkles className="w-4 h-4" />
          <span>Program Capstone Milestone</span>
        </div>
        <h3 className="text-2xl font-black text-white">
          {course.capstone}
        </h3>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Every graduate completes a real-world enterprise deployment with complete integration testing, 
          latency benchmarking, security review, and a production architecture proposal package.
        </p>
      </div>

    </div>
  );
}
