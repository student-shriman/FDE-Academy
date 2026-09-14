import React from 'react';
import { BookOpen, Compass, ListTree, LogOut, GraduationCap, CheckCircle2, Layers, Sparkles, Shield } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl p-[1.5px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-black text-sm">
              FDE
            </div>
          </div>
          <div>
            <div className="font-extrabold tracking-tight text-lg flex items-center gap-2">
              <span className="text-white">FDE</span>
              <span className="rgb-gradient-text">Academy</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                RGB Edition
              </span>
            </div>
            <div className="text-xs text-slate-400">Masterclass &bull; Forward Deployed Architect</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'courses' && currentView.startsWith('course/'));
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/25 to-cyan-500/20 text-white border border-purple-500/50 shadow-md shadow-purple-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
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
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-purple-400 text-xs cursor-pointer transition-all hover:shadow-md hover:shadow-purple-500/20"
              title="Click to view full coverage in Table of Contents"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <div className="text-left leading-tight">
                <div className="text-slate-300 font-mono text-[11px]">
                  {progress.total_completed} / {progress.total_subtopics} Done
                </div>
                <div className="rgb-gradient-text font-black font-mono text-[11px]">
                  {progress.overall_percentage}% &middot; {progress.completed_hours}h
                </div>
              </div>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-2.5 text-right">
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 flex items-center justify-center overflow-hidden">
              {user.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-cyan-300 font-bold text-xs">
                  {(user.name || user.identifier || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="text-left text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-200 truncate max-w-[100px]">{user.name}</span>
                {user.role === 'admin' ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-300 border border-rose-500/40">
                    Admin
                  </span>
                ) : user.role === 'reviewer' ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Reviewer
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                    Student
                  </span>
                )}
              </div>
              <div className="text-slate-400 font-mono text-[10px] truncate max-w-[130px]" title={user.identifier || user.email || user.phone}>
                {user.identifier || user.email || user.phone}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Animated RGB Laser Running Line */}
      <div className="rgb-laser-line"></div>
    </header>
  );
}
