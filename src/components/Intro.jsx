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

  const skipImmediately = reducedMotion;

  const endIntro = useCallback(() => {
    setDone(true);
    document.body.classList.add('intro-done');
  }, []);

  useEffect(() => {
    if (skipImmediately) {
      endIntro();
      return;
    }

    // Auto-dismiss after 3.2s (enough time to read and feel the vibe)
    const timer = setTimeout(endIntro, 3200);
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
    </div>
  );
}
