import React from 'react';
import { BookOpen, Compass, ListTree, LogOut, GraduationCap, CheckCircle2, Layers } from 'lucide-react';

export default function Navbar({ currentView, user, progress, onNavigate, onLogout }) {
  if (!user || currentView === 'login') return null;

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass, hash: '#home' },
    { id: 'courses', label: 'Courses', icon: Layers, hash: '#courses' },
    { id: 'contents', label: 'FDE Syllabus', icon: ListTree, hash: '#contents' },
    { id: 'reader', label: 'Phase 0 Reader', icon: GraduationCap, hash: '#reader/chapter-1' },
    { id: 'preface', label: 'Preface', icon: BookOpen, hash: '#preface' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-amber-400 to-blue-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            AI
          </div>
          <div>
            <div className="font-bold tracking-tight text-lg flex items-center gap-2">
              AI Academy
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Masterclass &bull; FDE
              </span>
            </div>
            <div className="text-xs text-slate-400">AI Engineer &rarr; AI Architect</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'courses' && currentView.startsWith('course/'));
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Live Progress, User profile & Logout */}
        <div className="flex items-center gap-4">
          
          {/* Live Progress Pill */}
          {progress && (
            <div 
              onClick={() => onNavigate('contents')}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs cursor-pointer hover:border-amber-400 transition-colors"
              title="Click to view full coverage in Table of Contents"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div className="text-left leading-tight">
                <div className="text-slate-300 font-mono text-[11px]">
                  {progress.total_completed} / {progress.total_subtopics} Covered
                </div>
                <div className="text-amber-400 font-bold font-mono text-[10px]">
                  {progress.overall_percentage}% &middot; {progress.completed_hours}h Logged
                </div>
              </div>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2 text-right">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-sm">
              {(user.name || user.identifier || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-slate-200 truncate max-w-[130px]">{user.name}</div>
              <div className="text-slate-400 font-mono text-[10px] truncate max-w-[130px]" title={user.identifier || user.email || user.phone}>
                {user.identifier || user.email || user.phone || 'Student'}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
