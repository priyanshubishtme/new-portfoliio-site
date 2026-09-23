import { useState, useEffect, useRef } from 'react';

/**
 * TypewriterText — Types out text character by character
 * when the element becomes visible in the viewport.
 */
export default function TypewriterText({ text, speed = 16 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chapterEl = el.closest('.chapter');
    if (!chapterEl) {
      setStarted(true);
      return;
    }

    // Check initial opacity
    if (parseFloat(chapterEl.style.opacity || 0) > 0.4) {
      setStarted(true);
    }

    // Watch for opacity changes set by ScrollScene
    const observer = new MutationObserver(() => {
      const opacity = parseFloat(chapterEl.style.opacity || 0);
      if (opacity > 0.4) {
        setStarted(true);
      } else if (opacity < 0.1) {
        // Reset when scrolled out of view so it replays
        setStarted(false);
        setDone(false);
        setDisplayed('');
      }
    });

    observer.observe(chapterEl, {
      attributes: true,
      attributeFilter: ['style']
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
