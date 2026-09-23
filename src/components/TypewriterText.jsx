import { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText — Types out text character by character
 * when the element becomes visible in the viewport.
 */
export default function TypewriterText({ text, speed = 16, isActive: propIsActive }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  // If a prop is explicitly passed (e.g., from Reader.jsx), use it directly.
  useEffect(() => {
    if (propIsActive !== undefined) {
      if (propIsActive) {
        setStarted(true);
      } else {
        setStarted(false);
        setDone(false);
        setDisplayed('');
      }
    }
  }, [propIsActive]);

  useEffect(() => {
    // If we're controlled by a prop, skip the DOM observer
    if (propIsActive !== undefined) return;

    const el = ref.current;
    if (!el) return;

    const chapterEl = el.closest('.chapter');
    if (!chapterEl) {
      setStarted(true);
      return;
    }

    // Check initial state
    if (chapterEl.dataset.active === 'true') {
      setStarted(true);
    }

    // Watch for data-active changes set by ScrollScene
    const observer = new MutationObserver(() => {
      const isActive = chapterEl.dataset.active === 'true';
      if (isActive) {
        setStarted(true);
      } else {
        // Reset when scrolled completely out of bounds
        setStarted(false);
        setDone(false);
        setDisplayed('');
      }
    });

    observer.observe(chapterEl, {
      attributes: true,
      attributeFilter: ['data-active']
    });

    return () => observer.disconnect();
  }, [propIsActive]);

  // Start typing when started
  useEffect(() => {
    if (!started || done) return;

    // Reduced motion — show all at once
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.substring(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, done]);

  return (
    <span className="typewriter-text" ref={ref}>
      {displayed}
      <span
        className="typewriter-cursor"
        style={{
          opacity: started && !done ? 1 : 0,
          animation: 'blink 1s step-end infinite',
          transition: 'opacity 0.3s',
          fontWeight: 100,
          marginLeft: '1px',
        }}
      >
        |
      </span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
}
