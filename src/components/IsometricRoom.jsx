/**
 * IsometricRoom.jsx — Scroll-triggered "enter the room" zoom hero.
 * 
 * A tall outer container (300vh) with a sticky inner viewport (100vh).
 * As the user scrolls, the room image scales from 1→4 with the
 * transform-origin aimed at the glowing pink monitor (~60% 45%).
 * The "I am Priyanshu" text and avatar are removed per user request.
 */
import { useRef, useEffect, useState } from 'react';
import roomImg from '../assets/isometric-room.jpg';
import './isometric-room.css';

export default function IsometricRoom() {
  const outerRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let animId;

    const update = () => {
      const outer = outerRef.current;
      const img = imgRef.current;
      const overlay = overlayRef.current;
      if (!outer || !img) return;

      const rect = outer.getBoundingClientRect();
      const scrollable = outer.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      // Scale from 1 to 4
      const scale = 1 + progress * 3;
      img.style.transform = `scale(${scale})`;

      // Fade overlay from 0 to 0.85 in the last 30% of scroll
      if (overlay) {
        const fadeProgress = Math.max(0, (progress - 0.7) / 0.3);
        overlay.style.opacity = fadeProgress * 0.85;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="iso-room" ref={outerRef} aria-label="Welcome">
      <div className="iso-room__sticky">
        {/* Room image with zoom */}
        <img
          className="iso-room__img"
          ref={imgRef}
          src={roomImg}
          alt="Lo-fi anime-style bedroom workspace at night"
          width="1792"
          height="1024"
          fetchPriority="high"
        />

        {/* Ambient glow on lamp */}
        <div className="iso-room__glow" aria-hidden="true" />

        {/* Floating particles */}
        <div className="iso-room__particles" aria-hidden="true">
          <div className="iso-room__particle" style={{ left: '15%' }} />
          <div className="iso-room__particle" />
          <div className="iso-room__particle" />
          <div className="iso-room__particle" />
        </div>

        {/* Vignette */}
        <div className="iso-room__vignette" aria-hidden="true" />

        {/* Dark overlay that fades in during zoom */}
        <div className="iso-room__fade-overlay" ref={overlayRef} aria-hidden="true" />

        {/* Scroll hint */}
        <div className="iso-room__scroll-hint">
          <div className="iso-room__scroll-arrow" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
