/**
 * Ceremony.jsx — Medal ceremony + winning animation video.
 *
 * When this section scrolls into view (IntersectionObserver, fires once):
 * 1. Character's head tilts down
 * 2. Medal drops with bounce easing
 * 3. Confetti burst (Web Animations API)
 * 4. Winning video fades in
 * 5. Caption changes
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import winVideo from '../assets/everything_is_okay_make_it_ani.mp4';
import './ceremony.css';

export default function Ceremony() {
  const ceremonyRef = useRef(null);
  const confettiRef = useRef(null);
  const videoRef = useRef(null);
  const [played, setPlayed] = useState(false);
  const [caption, setCaption] = useState('Scroll here for a small medal ceremony.');

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Confetti burst using Web Animations API
  const burstConfetti = useCallback(() => {
    const svg = confettiRef.current;
    if (!svg) return;

    const colors = ['#F2B441', '#F3EAD9', '#c9891e'];

    for (let i = 0; i < 26; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const x = 160 + Math.random() * 80;
      const size = 3 + Math.random() * 4;

      rect.setAttribute('x', x);
      rect.setAttribute('y', 20);
      rect.setAttribute('width', size);
      rect.setAttribute('height', size * 1.6);
      rect.setAttribute('fill', colors[i % colors.length]);
      rect.setAttribute('opacity', '0');
      rect.style.transformOrigin = 'center';
      svg.appendChild(rect);

      const dx = (Math.random() - 0.5) * 220;
      const dy = 120 + Math.random() * 90;
      const rot = (Math.random() - 0.5) * 720;
      const dur = 1400 + Math.random() * 900;
      const delay = Math.random() * 250;

      if (!reducedMotion) {
        rect.animate(
          [
            { transform: 'translate(0,0) rotate(0deg)', opacity: 0, offset: 0 },
            {
              transform: `translate(${dx * 0.2}px,${dy * 0.25}px) rotate(${rot * 0.3}deg)`,
              opacity: 1,
              offset: 0.12,
            },
            {
              transform: `translate(${dx}px,${dy}px) rotate(${rot}deg)`,
              opacity: 0,
              offset: 1,
            },
          ],
          { duration: dur, delay, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' }
        );
      }
    }

    // Clean up confetti after animation
    setTimeout(() => {
      if (svg) svg.innerHTML = '';
    }, 2800);
  }, [reducedMotion]);

  // IntersectionObserver — fires ceremony once
  useEffect(() => {
    const el = ceremonyRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !played) {
            setPlayed(true);
            setCaption('A small round of applause, every time.');

            if (!reducedMotion) {
              setTimeout(burstConfetti, 550);
            }

            // Play the video when ceremony triggers
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [played, burstConfetti, reducedMotion]);

  return (
    <div
      className={`ceremony ${played ? 'ceremony--play' : ''}`}
      ref={ceremonyRef}
      aria-hidden="true"
    >
      {/* Caption */}
      <p className="ceremony__caption">{caption}</p>

      {/* Winning animation video */}
      <div className="ceremony__video-wrap">
        <div className="ceremony__video-frame">
          <video
            ref={videoRef}
            className="ceremony__video"
            src={winVideo}
            muted
            playsInline
            loop
          />
        </div>
      </div>
    </div>
  );
}
