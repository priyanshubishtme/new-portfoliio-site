import { useState, useEffect, useRef } from 'react';

export default function TypewriterText({ text, autoStart = false }) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(autoStart);
  const containerRef = useRef(null);

  useEffect(() => {
    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      return;
    }

    if (autoStart) {
      setIsTyping(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isTyping && displayed.length === 0) {
          setIsTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [displayed.length, isTyping, text, autoStart]);

  useEffect(() => {
    if (isTyping) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.substring(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
        }
      }, 15); // ms per char
      return () => clearInterval(interval);
    }
  }, [isTyping, text]);

  return (
    <span ref={containerRef}>
      {displayed}
      <span style={{ 
        opacity: isTyping || displayed.length > 0 ? 1 : 0, 
        animation: 'blink 1s step-end infinite' 
      }}>|</span>
      {/* Invisible text to reserve space */}
      <span style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}>
        {text.substring(displayed.length)}
      </span>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </span>
  );
}
