import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Preface from './pages/Preface';
import Contents from './pages/Contents';
import Reader from './pages/Reader';
import curriculumData from './data/curriculum.json';
import { apiGetProgress, apiToggleProgress } from './services/api';

export default function App() {
  // Session State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fde_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Progress State from SQLite
  const [progress, setProgress] = useState(null);

  // Routing State: 'login', 'home', 'preface', 'contents', 'reader'
  const [currentView, setCurrentView] = useState('home');
  const [activeChapterId, setActiveChapterId] = useState('chapter-1');

  // Fetch user progress whenever user changes
  const refreshProgress = useCallback(async (userId) => {
    if (!userId) return;
    try {
      const data = await apiGetProgress(userId);
      setProgress(data);
    } catch (err) {
      console.error('Failed to load user progress:', err);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      refreshProgress(user.id);
    }
  }, [user, refreshProgress]);

  // Toggle subtopic progress
  const handleToggleProgress = async (subtopicId, chapterId) => {
    if (!user?.id) return;
    try {
      const updated = await apiToggleProgress(user.id, subtopicId, chapterId);
      setProgress(updated);
    } catch (err) {
      console.error('Failed to toggle progress:', err);
    }
  };

  // Handle URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '';
      if (!user) {
        setCurrentView('login');
        return;
      }
      if (hash.startsWith('reader/')) {
        const cId = hash.replace('reader/', '');
        setActiveChapterId(cId || 'chapter-1');
        setCurrentView('reader');
      } else if (hash === 'preface') {
        setCurrentView('preface');
      } else if (hash === 'contents') {
        setCurrentView('contents');
      } else if (hash === 'home' || hash === '') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('fde_user', JSON.stringify(userData));
    } catch (e) {
      console.error(e);
    }
    window.location.hash = 'home';
    setCurrentView('home');
    refreshProgress(userData.id);
  };

  const handleLogout = () => {
    setUser(null);
    setProgress(null);
    try {
      localStorage.removeItem('fde_user');
    } catch (e) {
      console.error(e);
    }
    window.location.hash = 'login';
    setCurrentView('login');
  };

  const navigateTo = (viewId) => {
    if (viewId === 'reader') {
      window.location.hash = `reader/${activeChapterId}`;
    } else {
      window.location.hash = viewId;
    }
    setCurrentView(viewId);
  };

  const handleSelectChapter = (chapterId) => {
    setActiveChapterId(chapterId);
    window.location.hash = `reader/${chapterId}`;
    setCurrentView('reader');
  };

  // If unauthenticated, show Login
  if (!user || currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-500 selection:text-white">
      {/* Global Navigation Bar with Live Progress */}
      <Navbar
        currentView={currentView}
        user={user}
        progress={progress}
        onNavigate={navigateTo}
        onLogout={handleLogout}
      />

      {/* Main Routed View */}
      <div className="flex-1">
        {currentView === 'home' && (
          <Home
            user={user}
            curriculum={curriculumData}
            progress={progress}
            onNavigate={navigateTo}
            onSelectChapter={handleSelectChapter}
          />
        )}

        {currentView === 'preface' && (
          <Preface
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'contents' && (
          <Contents
            curriculum={curriculumData}
            progress={progress}
            onToggleProgress={handleToggleProgress}
            onSelectChapter={handleSelectChapter}
          />
        )}

        {currentView === 'reader' && (
          <Reader
            curriculum={curriculumData}
            chapterId={activeChapterId}
            progress={progress}
            onToggleProgress={handleToggleProgress}
            onSelectChapter={handleSelectChapter}
            onNavigate={navigateTo}
          />
        )}
      </div>
    </div>
  );
}
