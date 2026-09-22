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

    document.body.classList.add('custom-cursor-active');

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
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 12,
        height: 12,
        margin: '-6px 0 0 -6px',
        zIndex: 9999,
        pointerEvents: 'none',
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 0 10px 2px rgba(242, 180, 65, 0.8), 0 0 20px 5px rgba(242, 180, 65, 0.4)',
        opacity: 0,
        transition: 'opacity 0.6s',
      }}
      aria-hidden="true"
    />
  );
}
