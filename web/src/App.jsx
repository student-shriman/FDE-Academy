import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
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

  // Routing State: 'landing', 'login', 'home', 'courses', 'course-detail', 'preface', 'contents', 'reader'
  const [currentView, setCurrentView] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '') || '';
      const saved = localStorage.getItem('fde_user');
      const parsedUser = saved ? JSON.parse(saved) : null;
      if (!parsedUser) {
        return (hash === 'login' || hash === 'signup') ? 'login' : 'landing';
      }
      if (hash === 'landing') return 'landing';
      return hash || 'home';
    } catch {
      return 'landing';
    }
  });

  const [activeChapterId, setActiveChapterId] = useState('chapter-1');
  const [selectedCourseId, setSelectedCourseId] = useState('ai-masterclass');

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
        if (hash === 'login' || hash === 'signup') {
          setCurrentView('login');
        } else {
          setCurrentView('landing');
        }
        return;
      }
      if (hash === 'landing') {
        setCurrentView('landing');
      } else if (hash.startsWith('reader/')) {
        const cId = hash.replace('reader/', '');
        setActiveChapterId(cId || 'chapter-1');
        setCurrentView('reader');
      } else if (hash.startsWith('course/')) {
        const cId = hash.replace('course/', '');
        setSelectedCourseId(cId || 'ai-masterclass');
        setCurrentView('course-detail');
      } else if (hash === 'courses') {
        setCurrentView('courses');
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
    window.location.hash = '';
    setCurrentView('landing');
  };

  const navigateTo = (viewId) => {
    if (viewId === 'reader') {
      window.location.hash = `reader/${activeChapterId}`;
    } else if (viewId === 'courses') {
      window.location.hash = 'courses';
    } else if (viewId === 'landing') {
      window.location.hash = 'landing';
    } else if (viewId === 'login') {
      window.location.hash = 'login';
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

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    window.location.hash = `course/${courseId}`;
    setCurrentView('course-detail');
  };

  // View: Landing Page (Available to both visitors and logged in users who explore)
  if (currentView === 'landing') {
    return (
      <Landing
        onNavigate={navigateTo}
        onSelectCourse={handleSelectCourse}
        user={user}
      />
    );
  }

  // View: Login/Sign-Up for unauthenticated visitors
  if (!user || currentView === 'login') {
    return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white relative">
      {/* Ambient background RGB glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
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
            onSelectCourse={handleSelectCourse}
          />
        )}

        {(currentView === 'courses' || currentView === 'course-detail') && (
          <CourseDetail
            courseId={selectedCourseId}
            onSelectCourse={handleSelectCourse}
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
