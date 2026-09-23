/**
 * useScrollReveal.js — Applies IntersectionObserver to all elements
 * with class "reveal" or "reveal-stagger", adding "visible" on scroll.
 *
 * Call once from the page component.
 */
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // Skip if reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
