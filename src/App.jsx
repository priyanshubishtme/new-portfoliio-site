import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initLenis, destroyLenis } from './lib/lenis';
import Intro from './components/Intro';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import Note from './pages/Note';

/**
 * App shell — two routes:
 *   /           → Home (the full portfolio)
 *   /notes/:slug → Individual blog post
 */
export default function App() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
      {/* Intro animation — plays once per session */}
      <Intro />

      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Cursor glow (desktop only) */}
      <CursorGlow />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:slug" element={<Note />} />
      </Routes>
    </>
  );
}
