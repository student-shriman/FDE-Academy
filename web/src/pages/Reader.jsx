import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  ListTree, 
  CheckCircle2, 
  Maximize2, 
  X,
  Sidebar,
  Clock,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';

export default function Reader({ 
  curriculum, 
  chapterId = 'chapter-1', 
  progress,
  onToggleProgress,
  onSelectChapter, 
  onNavigate 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);

  const chapters = curriculum?.chapters || {};
  const currentChapter = chapters[chapterId] || chapters['chapter-1'];

  // All Phase 0 chapters in order
  const p0Phase = curriculum?.phases?.find(p => p.phase_id === 'P0') || curriculum?.phases?.[0];
  const p0Topics = p0Phase?.topics || [];
  
  const orderedChapterIds = [];
  p0Topics.forEach(t => {
    t.subtopics?.forEach(s => {
      if (s.chapter_id) orderedChapterIds.push({
        id: s.chapter_id,
        subId: s.id,
        name: s.name,
        track: s.track,
        topicName: t.topic_name
      });
    });
  });

  const currentIndex = orderedChapterIds.findIndex(c => c.id === chapterId);
  const currentItem = orderedChapterIds[currentIndex] || orderedChapterIds[0];
  const prevChapter = currentIndex > 0 ? orderedChapterIds[currentIndex - 1] : null;
  const nextChapter = currentIndex < orderedChapterIds.length - 1 ? orderedChapterIds[currentIndex + 1] : null;

  const isCompleted = currentItem && progress?.completed_subtopics?.includes(currentItem.subId);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId]);

  // Handle clicking on images inside the reader for zoom modal
  const handleContentClick = (e) => {
    if (e.target.tagName === 'IMG') {
      setZoomImage({
        src: e.target.src,
        alt: e.target.alt || 'Architecture Diagram'
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 relative">
      
      {/* 1. Left Navigation Sidebar Drawer */}
      <aside 
        className={`${
          sidebarOpen ? 'w-80 border-r' : 'w-0 border-r-0'
        } transition-all duration-300 bg-white border-slate-200 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden md:block z-30`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Phase 0 ({orderedChapterIds.length} Chapters)
            </span>
            <button
              onClick={() => onNavigate('contents')}
              className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Full Tree</span>
            </button>
          </div>

          <div className="space-y-6">
            {p0Topics.map((topic, tIdx) => (
              <div key={tIdx} className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide px-2">
                  Module {tIdx + 1}: {topic.topic_name}
                </div>
                
                <div className="space-y-1">
                  {topic.subtopics?.map((sub, sIdx) => {
                    const isActive = sub.chapter_id === chapterId;
                    const isSubDone = progress?.completed_subtopics?.includes(sub.id);

                    return (
                      <button
                        key={sIdx}
                        onClick={() => onSelectChapter(sub.chapter_id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : isSubDone
                            ? 'text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <span className="truncate pr-2 flex items-center gap-1.5">
                          {isSubDone && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />}
                          <span className="truncate">{sub.name}</span>
                        </span>
                        {sub.track?.includes('Mandatory') && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title="Mandatory Addition"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* 2. Main Reader Canvas */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-10">
        
        {/* Top Floating Utility Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hidden md:flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Toggle chapter sidebar"
            >
              <Sidebar className="w-4 h-4" />
              <span>{sidebarOpen ? 'Hide' : 'Show'} Syllabus</span>
            </button>

            <button
              onClick={() => onNavigate('contents')}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            >
              <ListTree className="w-4 h-4" />
              <span>Contents Page</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Mark Chapter Complete Button */}
            {currentItem && (
              <button
                onClick={() => onToggleProgress(currentItem.subId, chapterId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm hover:scale-105 active:scale-95'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-600' : 'text-slate-950'}`} />
                <span>{isCompleted ? 'Completed in SQLite' : 'Mark Completed'}</span>
              </button>
            )}

            <div className="text-xs text-slate-400 font-mono font-medium hidden sm:block">
              Chapter {currentIndex + 1} of {orderedChapterIds.length}
            </div>
          </div>
        </div>

        {/* Chapter Header */}
        {currentChapter && (
          <article className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  {currentChapter.number}
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  currentChapter.track?.includes('Mandatory')
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {currentChapter.track}
                </span>
                {isCompleted && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Completed
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {currentChapter.title}
              </h1>
            </div>

            {/* Injected Book Content (Theory, Diagrams, Code, Checklists, Pitfalls) */}
            <div 
              className="reader-content bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-slate-800"
              onClick={handleContentClick}
              dangerouslySetInnerHTML={{ __html: currentChapter.html }}
            />

            {/* Completion Toggle Card at bottom of chapter */}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="font-bold text-sm text-slate-900">Finished this chapter?</div>
                <div className="text-xs text-slate-500">Save your progress directly into the SQLite database.</div>
              </div>

              {currentItem && (
                <button
                  onClick={() => onToggleProgress(currentItem.subId, chapterId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed (Click to undo)' : 'Mark Chapter Complete'}</span>
                </button>
              )}
            </div>

            {/* Bottom Chapter Navigation Buttons */}
            <div className="pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
              {prevChapter ? (
                <button
                  onClick={() => onSelectChapter(prevChapter.id)}
                  className="px-5 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all hover:-translate-x-1 cursor-pointer text-left"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Previous</div>
                    <div className="truncate max-w-[140px] sm:max-w-xs">{prevChapter.name}</div>
                  </div>
                </button>
              ) : <div></div>}

              {nextChapter ? (
                <button
                  onClick={() => onSelectChapter(nextChapter.id)}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all hover:translate-x-1 cursor-pointer text-right"
                >
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-800">Next Chapter</div>
                    <div className="truncate max-w-[140px] sm:max-w-xs">{nextChapter.name}</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('contents')}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Phase 0 Complete! Return to Syllabus</span>
                </button>
              )}
            </div>

          </article>
        )}

      </main>

      {/* 3. Image Full-Screen Zoom Modal */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] bg-white p-4 rounded-2xl shadow-2xl overflow-auto">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={zoomImage.src} 
              alt={zoomImage.alt} 
              className="w-full h-auto rounded-lg"
            />
            <p className="text-center text-xs text-slate-500 italic mt-3">
              {zoomImage.alt}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
