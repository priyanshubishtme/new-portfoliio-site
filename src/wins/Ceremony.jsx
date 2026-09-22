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
      {/* Confetti layer */}
      <svg
        ref={confettiRef}
        viewBox="0 0 400 260"
        className="ceremony__confetti"
      />

      {/* Podium SVG */}
      <svg viewBox="0 0 400 260" className="ceremony__svg">
        {/* Shadow */}
        <ellipse cx="200" cy="238" rx="120" ry="14" fill="#000" opacity=".28" />
        {/* Podium */}
        <rect x="150" y="196" width="100" height="42" rx="4" fill="#3a2413" />
        <rect x="150" y="196" width="100" height="6" fill="#F2B441" opacity=".7" />

        {/* Figure */}
        <g transform="translate(200 150)">
          <ellipse cx="0" cy="86" rx="30" ry="7" fill="#000" opacity=".22" />
          {/* Body */}
          <path d="M-24 88c-2-34 3-58 24-58s26 24 24 58z" fill="#181210" />
          <path
            d="M-24 30c0-24 11-38 24-38s24 14 24 38c0 4-2 8-6 10l-6 46h-24l-6-46c-4-2-6-6-6-10z"
            fill="#1c1512"
          />
          {/* Head */}
          <g className="ceremony__head">
            <circle cx="0" cy="-34" r="19" fill="#e2a06a" />
            <path
              d="M-19-34a19 19 0 0 1 38 0c0-14-38-16-38 0z"
              fill="#241a12"
            />
          </g>
          {/* Medal */}
          <g className="ceremony__medal" opacity="0">
            <path
              d="M-4-58 -14-14M4-58 14-14"
              stroke="#F2B441"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle
              cx="0"
              cy="-6"
              r="17"
              fill="#F2B441"
              stroke="#c9891e"
              strokeWidth="2"
            />
            <circle
              cx="0"
              cy="-6"
              r="9"
              fill="none"
              stroke="#fff6dc"
              strokeWidth="2"
              opacity=".8"
            />
          </g>
        </g>
      </svg>

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
