/**
 * CursorGlow.jsx — Soft radial glow that follows the pointer.
 * Desktop only — hidden on touch devices.
 */
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const el = glowRef.current;
    if (!el) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const handleMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.opacity = '1';
    };

    const animate = () => {
      cx += (mx - cx) * 0.09;
      cy += (my - cy) * 0.09;
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleMove);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 340,
        height: 340,
        margin: '-170px 0 0 -170px',
        zIndex: 80,
        pointerEvents: 'none',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(242,180,65,0.13), transparent 62%)',
        opacity: 0,
        transition: 'opacity 0.6s',
      }}
      aria-hidden="true"
    />
  );
}
