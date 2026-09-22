import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Note from './pages/Note';

/**
 * App shell — two routes:
 *   /           → Home (the full portfolio)
 *   /notes/:slug → Individual blog post
 */
export default function App() {
  return (
    <>
      {/* Film grain overlay */}
      <div className="grain" aria-hidden="true" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:slug" element={<Note />} />
      </Routes>
    </>
  );
}
