import { useState, useEffect } from 'react';

/**
 * TypewriterText — Types out text character by character.
 * 
 * Props:
 *   text     — The string to type out.
 *   isActive — When true, starts typing. Defaults to true.
 *   speed    — Ms per character. Defaults to 18.
 */
export default function TypewriterText({ text, isActive = true, speed = 18 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayed('');
    setDone(false);
  }, [text]);

  // Start typing when isActive becomes true
  useEffect(() => {
    if (!isActive || done) return;

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
  }, [isActive, text, speed, done]);

  return (
    <span className="typewriter-text">
      {displayed}
      <span
        className="typewriter-cursor"
        style={{
          opacity: !done ? 1 : 0,
          animation: 'blink 1s step-end infinite',
          transition: 'opacity 0.3s',
        }}
      >
        |
      </span>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
}
