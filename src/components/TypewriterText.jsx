import { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText — Types out text character by character
 * when the parent chapter element becomes active (data-active="true").
 *
 * Falls back to showing all text immediately if not inside a chapter.
 */
export default function TypewriterText({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const hasStartedRef = useRef(false);

  // Poll for chapter activation using MutationObserver on data-active attribute
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chapterEl = el.closest('.chapter');
    if (!chapterEl) {
      // Not inside a chapter — start immediately
      setStarted(true);
      hasStartedRef.current = true;
      return;
    }

    // Check if already active
    if (chapterEl.dataset.active === 'true' && !hasStartedRef.current) {
      setStarted(true);
      hasStartedRef.current = true;
      return;
    }

    // Watch for the data-active attribute change
    const observer = new MutationObserver(() => {
      if (chapterEl.dataset.active === 'true' && !hasStartedRef.current) {
        setStarted(true);
        hasStartedRef.current = true;
        observer.disconnect();
      }
    });

    observer.observe(chapterEl, {
      attributes: true,
      attributeFilter: ['data-active'],
    });

    return () => observer.disconnect();
  }, []);

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
