/**
 * lenis.js — Lenis smooth scrolling setup.
 * Creates a shared Lenis instance and wires it to
 * requestAnimationFrame. Can optionally wire to GSAP
 * ScrollTrigger in Phase 4.
 */
import Lenis from 'lenis';

let lenisInstance = null;

/**
 * Initialize Lenis smooth scrolling.
 * Call once from the app root or the scroll scene.
 * Returns the Lenis instance for cleanup.
 */
export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    // Smooth scrolling config
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  });

  // Animation frame loop
  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenisInstance;
}

/**
 * Destroy Lenis instance.
 */
export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

/**
 * Get the current Lenis instance.
 */
export function getLenis() {
  return lenisInstance;
}
