import { useState, useEffect, useRef } from 'react';

export default function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // We watch the parent's opacity. If it becomes visible (>0.1), we type.
    const observer = new MutationObserver(() => {
      // Traverse up to find the .chapter element which has the opacity set
      const chapterEl = el.closest('.chapter');
      if (chapterEl) {
        const opacity = parseFloat(chapterEl.style.opacity || '0');
        if (opacity > 0.1 && !isTyping && displayed.length === 0) {
          setIsTyping(true);
        }
      }
    });

    const parent = el.closest('.chapter');
    if (parent) {
      observer.observe(parent, { attributes: true, attributeFilter: ['style'] });
    }

    return () => observer.disconnect();
  }, [displayed.length, isTyping, text]);

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
