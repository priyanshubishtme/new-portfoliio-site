/**
 * Nav.jsx — Floating pill navigation.
 * Highlights the active section via IntersectionObserver.
 * On mobile: hamburger → full-screen menu.
 */
import { useState, useEffect, useCallback } from 'react';
import siteData from '../content/site.json';
import './nav.css';

const SECTION_IDS = ['scene', 'what', 'projects', 'wins', 'notes'];

export default function Nav() {
  const [active, setActive] = useState('scene');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      let current = 'scene';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on nav click
  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  return (
    <>
      <nav className="nav" aria-label="Main">
        <a className="nav__brand" href="#scene">
          {siteData.brand}
        </a>

        {/* Desktop links */}
        {siteData.nav.map((link) => {
          const sectionId = link.href.replace('#', '');
          return (
            <a
              key={link.label}
              className={`nav__link ${active === sectionId ? 'active' : ''}`}
              href={link.href}
              data-sec={sectionId}
            >
              {link.label}
            </a>
          );
        })}

        {/* CTA */}
        <a className="nav__cta" href={siteData.cta.href}>
          {siteData.cta.label}
        </a>

        {/* Mobile hamburger */}
        <button
          className={`nav__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`nav__mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {siteData.nav.map((link) => {
          const sectionId = link.href.replace('#', '');
          return (
            <a
              key={link.label}
              className={active === sectionId ? 'active' : ''}
              href={link.href}
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          );
        })}
        <a className="nav__cta" href={siteData.cta.href} onClick={handleNavClick}>
          {siteData.cta.label}
        </a>
      </div>
    </>
  );
}
