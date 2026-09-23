/**
 * ScrollScene.jsx — The signature night-to-dawn scroll experience.
 *
 * Phase 3 (static): All layers rendered, debug slider for manual progress.
 * Phase 4 will wire GSAP ScrollTrigger for real scroll-driven animation.
 *
 * Layers (back to front):
 * 1. Sky gradients (night → dusk → ember → dawn)
 * 2. Stars canvas
 * 3. Gold orb / Sun
 * 4. Light sweep behind avatar
 * 5. Avatar (masked, parallax)
 * 6. Campus panorama (panning)
 * 7. Text scrim + chapter text
 */
import { useRef, useEffect, useCallback, useState } from 'react';
import SkyLayers from './SkyLayers';
import ChapterText from './ChapterText';
import siteData from '../content/site.json';
import storyData from '../content/story.json';
import avatarSrc from '../assets/avatar.png';
import campusSrc from '../assets/campus-banner.png';
import './scene.css';

// Utility functions matching the prototype
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const ease = (t) => t * t * (3 - 2 * t); // smoothstep

// Chapter timeline windows [start, end]
const CHAPTER_WINDOWS = [
  [0.12, 0.28],
  [0.32, 0.48],
  [0.52, 0.68],
  [0.72, 0.88],
  [0.92, 1.05],
];

export default function ScrollScene() {
  // Refs for all animated elements
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const duskRef = useRef(null);
  const emberRef = useRef(null);
  const dawnRef = useRef(null);
  const starsRef = useRef(null);
  const orbRef = useRef(null);
  const sunRef = useRef(null);
  const avatarRef = useRef(null);
  const campusRef = useRef(null);
  const panRef = useRef(null);
  const campusImgRef = useRef(null);
  const scrimRef = useRef(null);
  const heroRef = useRef(null);
  const hintRef = useRef(null);
  const progressRef = useRef(null);
  const chapterRefs = useRef([]);

  const [debugProgress, setDebugProgress] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const panRangeRef = useRef(0);
  const starsDataRef = useRef({ stars: [], W: 0, H: 0 });

  // Initialize star field
  const initStars = useCallback(() => {
    const cv = starsRef.current;
    const stage = stageRef.current;
    if (!cv || !stage) return;

    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = Math.round((W * H) / 8000);
    const stars = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.5 + Math.pow(Math.random(), 3) * 1.7,
      a: 0.35 + Math.random() * 0.65,
      s: 0.5 + Math.random() * 1.6,
      ph: Math.random() * 6.28,
      gold: Math.random() < 0.14,
      d: 0.25 + Math.random() * 0.75,
    }));

    starsDataRef.current = { stars, W, H };
  }, []);

  // Draw stars
  const drawStars = useCallback((time, progress) => {
    const cv = starsRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const { stars, W, H } = starsDataRef.current;
    if (!W) return;

    ctx.clearRect(0, 0, W, H);

    for (const s of stars) {
      const tw = 0.55 + 0.45 * Math.sin(time * 0.001 * s.s + s.ph);
      const y = ((s.y - progress * H * 0.16 * s.d) % H + H) % H;
      ctx.globalAlpha = s.a * tw;
      ctx.fillStyle = s.gold ? '#ffe3a0' : '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, y, s.r, 0, 6.283);
      ctx.fill();

      // Glow on larger stars
      if (s.r > 1.5) {
        ctx.globalAlpha = s.a * tw * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r * 3.4, 0, 6.283);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  // Size the campus panorama for horizontal panning
  const sizeCampus = useCallback(() => {
    const img = campusImgRef.current;
    const stage = stageRef.current;
    if (!img || !stage) return;

    const h = stage.clientHeight;
    const w = stage.clientWidth;
    const ratio = (img.naturalWidth || 2000) / (img.naturalHeight || 750);
    const iw = h * ratio;
    img.style.width = iw + 'px';
    panRangeRef.current = Math.max(0, iw - w);
  }, []);

  // Update all layers based on progress (0 to 1)
  const updateScene = useCallback(
    (p) => {
      // Sky layers
      if (duskRef.current) duskRef.current.style.opacity = ease(seg(p, 0.10, 0.30));
      if (emberRef.current) emberRef.current.style.opacity = ease(seg(p, 0.30, 0.56));
      if (dawnRef.current) dawnRef.current.style.opacity = ease(seg(p, 0.80, 1));

      // Stars fade
      if (starsRef.current) {
        starsRef.current.style.opacity = 1 - 0.9 * ease(seg(p, 0.35, 0.88));
      }

      // Hero text
      const isMobile = window.innerWidth <= 820;
      if (heroRef.current) {
        const hp = ease(seg(p, 0.04, 0.10));
        heroRef.current.style.opacity = 1 - hp;
        heroRef.current.style.transform = isMobile
          ? `translateY(${-hp * 36}px)`
          : `translateY(calc(-52% - ${hp * 36}px))`;
      }

      // Scroll hint
      if (hintRef.current) {
        hintRef.current.style.opacity = 1 - seg(p, 0.02, 0.08);
      }

      // Avatar parallax (stays visible until campus cross-fade)
      if (avatarRef.current) {
        const avOut = ease(seg(p, 0.48, 0.55));
        avatarRef.current.style.opacity = 1 - avOut;
        avatarRef.current.style.transform = `translate3d(0,${-seg(p, 0, 0.5) * 5}vh,0) scale(${1 + 0.05 * seg(p, 0, 0.5)})`;
      }


      // Gold orb
      if (orbRef.current) {
        orbRef.current.style.opacity =
          ease(seg(p, 0.10, 0.18)) * (1 - ease(seg(p, 0.48, 0.55)));
        orbRef.current.style.transform = `scale(${0.85 + 0.3 * seg(p, 0.10, 0.50)})`;
      }

      // Campus (cross-fades directly from avatar)
      if (campusRef.current) {
        const cIn = ease(seg(p, 0.48, 0.55));
        const cOut = ease(seg(p, 0.86, 0.97));
        campusRef.current.style.opacity = cIn * (1 - 0.96 * cOut);
        campusRef.current.style.transform = `translate3d(0,${(1 - ease(seg(p, 0.48, 0.62))) * 7}vh,0) scale(${1 + 0.06 * seg(p, 0.5, 0.95)})`;
        campusRef.current.style.filter = `brightness(${0.55 + 0.45 * ease(seg(p, 0.5, 0.76))}) saturate(${0.8 + 0.2 * seg(p, 0.5, 0.76)})`;

        if (panRef.current) {
          panRef.current.style.transform = `translate3d(${-panRangeRef.current * ease(seg(p, 0.50, 0.93))}px,0,0)`;
        }
      }

      // Scrim
      if (scrimRef.current) {
        const cIn = ease(seg(p, 0.48, 0.58));
        const cOut = ease(seg(p, 0.86, 0.97));
        scrimRef.current.style.opacity = cIn * (1 - 0.55 * cOut);
      }

      // Sun
      if (sunRef.current) {
        const sp = ease(seg(p, 0.84, 1));
        sunRef.current.style.opacity = sp;
        sunRef.current.style.transform = `translate3d(0,${(1 - sp) * 30}vh,0)`;
      }

      // Chapters
      let activeChapter = -1;
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const [a, b] = CHAPTER_WINDOWS[i];
        const inn = ease(seg(p, a - 0.06, a + 0.06));
        const out = i < CHAPTER_WINDOWS.length - 1 ? ease(seg(p, b - 0.06, b + 0.06)) : 0;
        const o = inn * (1 - out);
        el.style.opacity = o;
        const ty = (1 - inn) * 26 - out * 26;
        el.style.transform = isMobile
          ? `translateY(${ty}px)`
          : `translateY(calc(-50% + ${ty}px))`;
          
        // Strict active window for typewriter
        const isActive = p >= a && p <= b;
        if (isActive) {
          activeChapter = i;
        }
        
        if (el.dataset.active !== String(isActive)) {
          el.dataset.active = String(isActive);
        }
      });

      // Progress dots
      if (progressRef.current) {
        progressRef.current.style.opacity = ease(seg(p, 0.10, 0.14));
        const dots = progressRef.current.children;
        for (let i = 0; i < dots.length; i++) {
          dots[i].className =
            'scene-progress__dot' + (i === activeChapter ? ' scene-progress__dot--active' : '');
        }
      }
    },
    []
  );

  // Animation loop — reads scroll position and updates scene
  useEffect(() => {
    initStars();
    sizeCampus();

    const handleResize = () => {
      initStars();
      sizeCampus();
    };
    window.addEventListener('resize', handleResize);

    let animId;
    let target = 0;
    let current = 0;

    const frame = (time) => {
      // Read scroll-based progress
      if (sceneRef.current && stageRef.current) {
        const rect = sceneRef.current.getBoundingClientRect();
        const total = sceneRef.current.offsetHeight - stageRef.current.clientHeight;
        target = clamp(-rect.top / total);
      }

      // Use debug slider if active
      const p = showDebug ? debugProgress : target;

      // Smooth interpolation - reduced to 0.035 for premium silky feel
      current = current + (p - current) * 0.035;
      if (Math.abs(p - current) < 0.0004) current = p;

      updateScene(current);
      drawStars(time, current);
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [initStars, sizeCampus, updateScene, drawStars, debugProgress, showDebug]);

  // Handle campus image load
  const handleCampusLoad = useCallback(() => {
    sizeCampus();
  }, [sizeCampus]);

  return (
    <section id="scene" className="scroll-scene" ref={sceneRef} aria-label="My story">
      <div className="stage" ref={stageRef}>
        {/* Sky layers */}
        <SkyLayers refs={{ dusk: duskRef, ember: emberRef, dawn: dawnRef }} />

        {/* Stars */}
        <canvas className="stars-canvas" ref={starsRef} />

        {/* Gold orb */}
        <div className="scene-orb" ref={orbRef} />

        {/* Sun */}
        <div className="scene-sun" ref={sunRef} />



        {/* Avatar */}
        <div className="scene-avatar" ref={avatarRef}>
          <img
            src={avatarSrc}
            alt="Priyanshu Bisht illustrated portrait"
            width="900"
            height="900"
          />
        </div>

        {/* Campus panorama */}
        <div className="scene-campus" ref={campusRef}>
          <div className="scene-campus__pan" ref={panRef}>
            <img
              ref={campusImgRef}
              src={campusSrc}
              alt="GEHU campus at golden hour"
              onLoad={handleCampusLoad}
            />
          </div>
        </div>

        {/* Text scrim */}
        <div className="scene-scrim" ref={scrimRef} />

        {/* Vignette */}
        <div className="scene-vignette" aria-hidden="true" />

        {/* Hero text */}
        <div className="scene-hero" ref={heroRef}>
          <h1>
            <span className="hero-line-wrap">
              <span>{siteData.hero.headline}</span>
            </span>
          </h1>
          <p className="scene-hero__tag">{siteData.hero.line}</p>
        </div>

        {/* Scroll hint */}
        <div className="scene-hero__hint" ref={hintRef}>
          <span className="scene-hero__hint-line" />
          {siteData.hero.scrollHint}
        </div>

        {/* Chapter text */}
        {storyData.map((chapter, i) => (
          <ChapterText
            key={chapter.id}
            chapter={chapter}
            isWide={i === storyData.length - 1}
            innerRef={(el) => (chapterRefs.current[i] = el)}
          />
        ))}

        {/* Progress dots */}
        <div className="scene-progress" ref={progressRef}>
          {storyData.map((_, i) => (
            <span key={i} className="scene-progress__dot" />
          ))}
        </div>
      </div>

    </section>
  );
}
