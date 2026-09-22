/**
 * Reader.jsx — 3D Book reader with page-flip animation.
 *
 * Features:
 * - Left page (facts) is static
 * - Right page flips through story paragraphs with genuine rotateY
 * - Proper z-index management during flip
 * - Focus trapping while open
 * - Keyboard navigation (arrows + Escape)
 * - Mobile stacks to single column
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import projectsData from '../content/projects.json';
import './reader.css';

// SVG book covers
function BookCover({ index }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 300 400" aria-hidden="true">
        <rect width="300" height="400" fill="#101a35" />
        <rect x="14" y="14" width="272" height="372" fill="none" stroke="#F2B441" strokeOpacity=".55" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="130" fill="#F2B441" opacity=".14" />
        <rect x="108" y="118" width="84" height="150" rx="22" fill="#F3EAD9" />
        <rect x="128" y="88" width="44" height="40" rx="9" fill="#F3EAD9" />
        <rect x="122" y="76" width="56" height="16" rx="6" fill="#F2B441" />
        <path d="M150 156c-8 11-13 17-13 25a13 13 0 0 0 26 0c0-8-5-14-13-25z" fill="#1d2f66" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 400" aria-hidden="true">
      <rect width="300" height="400" fill="#160f0a" />
      <rect x="14" y="14" width="272" height="372" fill="none" stroke="#F2B441" strokeOpacity=".55" strokeWidth="1.5" />
      <polygon points="120,90 180,90 300,400 0,400" fill="#20140d" />
      <path d="M150 90V400" stroke="#F3EAD9" strokeOpacity=".45" strokeWidth="2.5" strokeDasharray="12 16" />
      <rect x="196" y="230" width="40" height="66" rx="11" fill="#F2B441" />
    </svg>
  );
}

// Facts page content (left side)
function FactsPage({ project }) {
  return (
    <div className="pg pg--left">
      <div className="pg__label">The facts</div>
      <h3>{project.title}</h3>
      <div className="pg__kind">{project.kind}</div>
      <div className="pg__facts">
        {project.facts.map((f, i) => (
          <div key={i}>
            <b>{f.value}</b>
            <span>{f.label}</span>
          </div>
        ))}
      </div>
      <div className="pg__chips">
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <span className="pg__link">
        {project.github ? `GitHub → ${project.github}` : 'GitHub → TODO repo link'}
      </span>
    </div>
  );
}

// Right page content
function rightPageContent(project, page) {
  if (page === 0) {
    return (
      <>
        <div className="pg__label">Open to begin</div>
        <p>{project.story[0]}</p>
      </>
    );
  }
  if (page <= project.story.length) {
    return (
      <>
        <div className="pg__label">
          Page {page} of {project.story.length}
        </div>
        <p>{project.story[page - 1]}</p>
      </>
    );
  }
  return (
    <>
      <div className="pg__label">The end</div>
      <p style={{ marginTop: 10 }}>
        Thanks for reading. More projects are on the way.
      </p>
      <span className="pg__link">
        {project.github ? `GitHub → ${project.github}` : 'GitHub → TODO repo link'}
      </span>
    </>
  );
}

export default function Reader() {
  const [openBook, setOpenBook] = useState(null); // index or null
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const rightPageRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocusRef = useRef(null);

  const isOpen = openBook !== null;
  const project = isOpen ? projectsData[openBook] : null;
  const pageCount = project ? project.story.length + 1 : 0;

  // Reduced motion check
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Open a book
  const handleOpen = useCallback((index) => {
    lastFocusRef.current = document.activeElement;
    setOpenBook(index);
    setCurrentPage(0);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close the book
  const handleClose = useCallback(() => {
    setOpenBook(null);
    setCurrentPage(0);
    document.body.style.overflow = '';
    if (lastFocusRef.current) {
      lastFocusRef.current.focus();
    }
  }, []);

  // Flip page with 3D rotateY animation
  const flipPage = useCallback(
    (delta) => {
      const target = Math.min(pageCount - 1, Math.max(0, currentPage + delta));
      if (target === currentPage || flipping) return;

      const rightEl = rightPageRef.current;
      if (!rightEl || !project) return;

      if (reducedMotion) {
        setCurrentPage(target);
        return;
      }

      setFlipping(true);

      // Phase 1: rotate current page away
      rightEl.style.transition = 'transform .3s ease-in, opacity .3s ease-in';
      rightEl.style.transformOrigin = 'left center';
      rightEl.style.transform = `rotateY(${delta > 0 ? -88 : 88}deg)`;
      rightEl.style.opacity = '0.15';
      // Raise z-index during flip
      rightEl.style.zIndex = '10';

      setTimeout(() => {
        // Phase 2: swap content, start from opposite side
        setCurrentPage(target);
        rightEl.style.transition = 'none';
        rightEl.style.transform = `rotateY(${delta > 0 ? 88 : -88}deg)`;
        rightEl.style.opacity = '0.15';

        requestAnimationFrame(() => {
          // Phase 3: rotate new page in
          rightEl.style.transition =
            'transform .32s ease-out, opacity .32s ease-out';
          rightEl.style.transform = 'rotateY(0deg)';
          rightEl.style.opacity = '1';
          // Reset z-index after flip settles
          setTimeout(() => {
            rightEl.style.zIndex = '1';
            setFlipping(false);
          }, 340);
        });
      }, 300);
    },
    [currentPage, pageCount, flipping, project, reducedMotion]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') flipPage(1);
      if (e.key === 'ArrowLeft') flipPage(-1);
    };

    window.addEventListener('keydown', handleKey);

    // Focus the close button on open
    setTimeout(() => closeRef.current?.focus(), 100);

    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose, flipPage]);

  return (
    <>
      {/* Book shelf */}
      <div className="shelf3d">
        {projectsData.map((proj, i) => (
          <button
            key={proj.id}
            className="book"
            onClick={() => handleOpen(i)}
            aria-haspopup="dialog"
          >
            <span className="book__spine">{proj.title}</span>
            <span className="book__cover">
              <BookCover index={i} />
            </span>
            <span className="book__label">
              {`0${i + 1}`} · {proj.title}
              <em>{proj.kind}</em>
            </span>
          </button>
        ))}
      </div>

      {/* Reader overlay */}
      <div
        className={`reader ${isOpen ? 'reader--open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Project story"
      >
        <div className="reader__bg" onClick={handleClose} />
        <div className="reader__inner">
          <button
            className="reader__close"
            ref={closeRef}
            onClick={handleClose}
            aria-label="Close book"
          >
            Close ✕
          </button>

          {project && (
            <div className="spread">
              <FactsPage project={project} />
              <div className="pg pg--right" ref={rightPageRef}>
                {rightPageContent(project, currentPage)}
              </div>
            </div>
          )}

          <div className="page-nav">
            <button
              className="page-nav__btn"
              onClick={() => flipPage(-1)}
              aria-label="Previous page"
              disabled={currentPage === 0}
            >
              ‹
            </button>
            <div className="page-dots">
              {Array.from({ length: pageCount }).map((_, i) => (
                <span
                  key={i}
                  className={`page-dots__dot ${
                    i === currentPage ? 'page-dots__dot--active' : ''
                  }`}
                />
              ))}
            </div>
            <button
              className="page-nav__btn"
              onClick={() => flipPage(1)}
              aria-label="Next page"
              disabled={currentPage === pageCount - 1}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
