/**
 * Intro.jsx — "Dream with Priyanshu" entrance animation.
 *
 * A gold star twinkles → brand name writes itself letter by letter →
 * overlay lifts after ~2.6s. Plays once per session (sessionStorage).
 * Skip button appears after 0.6s. Skipped for reduced motion.
 */
import { useState, useEffect, useCallback } from 'react';
import './intro.css';

const BRAND = 'Dream with Priyanshu';

export default function Intro() {
  const [done, setDone] = useState(false);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check if intro was already shown this session
  const alreadySeen = (() => {
    try {
      return sessionStorage.getItem('intro_seen') === '1';
    } catch {
      return false;
    }
  })();

  // Skip immediately for reduced motion or already seen
  const skipImmediately = reducedMotion || alreadySeen;

  const endIntro = useCallback(() => {
    setDone(true);
    try {
      sessionStorage.setItem('intro_seen', '1');
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  useEffect(() => {
    if (skipImmediately) {
      endIntro();
      return;
    }

    // Auto-dismiss after 2.6s
    const timer = setTimeout(endIntro, 2600);
    return () => clearTimeout(timer);
  }, [skipImmediately, endIntro]);

  // Don't render at all if immediately skipped
  if (skipImmediately && done) return null;

  return (
    <div
      className={`intro ${done ? 'intro--done' : ''}`}
      aria-hidden="true"
    >
      <div className="intro__inner">
        <div className="intro__star" />
        <div className="intro__name">
          {BRAND.split('').map((char, i) => (
            <span
              key={i}
              style={{ animationDelay: `${0.5 + i * 0.055}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
      <button className="intro__skip" onClick={endIntro}>
        Skip
      </button>
    </div>
  );
}
