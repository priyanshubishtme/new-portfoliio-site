import React, { useState, useCallback, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import projectsData from '../content/projects.json';
import './reader.css';
import TypewriterText from './../components/TypewriterText';

// SVG book covers (shelf version)
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

// Reusable Page Component for HTMLFlipBook
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <div className="page-content">{props.children}</div>
    </div>
  );
});

export default function Reader() {
  const [openBook, setOpenBook] = useState(null); // index or null
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef(null);
  const closeRef = useRef(null);

  const isOpen = openBook !== null;
  const project = isOpen ? projectsData[openBook] : null;

  const handleFlip = useCallback((e) => {
    setCurrentPage(e.data);
  }, []);

  // Open a book
  const handleOpen = useCallback((index) => {
    setOpenBook(index);
    setCurrentPage(0);
    document.body.style.overflow = 'hidden';
  }, []);

  // Close the book
  const handleClose = useCallback(() => {
    setOpenBook(null);
    setCurrentPage(0);
    document.body.style.overflow = '';
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight' && bookRef.current) {
        bookRef.current.pageFlip().flipNext();
      }
      if (e.key === 'ArrowLeft' && bookRef.current) {
        bookRef.current.pageFlip().flipPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    setTimeout(() => closeRef.current?.focus(), 100);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

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
            <div className="flipbook-wrapper">
              <HTMLFlipBook
                width={450}
                height={560}
                size="stretch"
                minWidth={300}
                maxWidth={450}
                minHeight={400}
                maxHeight={560}
                showCover={true}
                mobileScrollSupport={true}
                className="real-book"
                ref={bookRef}
                usePortrait={true}
                onFlip={handleFlip}
              >
                {/* Cover Page */}
                <Page>
                  <div className="pg pg--cover">
                    <h3>{project.title}</h3>
                    <div className="pg__kind">{project.kind}</div>
                    <BookCover index={openBook} />
                  </div>
                </Page>

                {/* Facts Page */}
                <Page>
                  <div className="pg">
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
                  </div>
                </Page>

                {/* Story Pages */}
                {project.story.map((para, idx) => {
                  const pageIndex = idx + 2; // Cover is 0, Facts is 1
                  const isActive = Math.abs(currentPage - pageIndex) <= 1;
                  return (
                    <Page key={idx}>
                      <div className="pg">
                        <div className="pg__label">
                          Page {idx + 1} of {project.story.length}
                        </div>
                        <p>
                          <TypewriterText text={para} isActive={isActive} />
                        </p>
                      </div>
                    </Page>
                  );
                })}

                {/* Back Cover / End */}
                <Page>
                  <div className="pg pg--end">
                    <div className="pg__label">The end</div>
                    <p style={{ marginTop: 10 }}>
                      Thanks for reading. More projects are on the way.
                    </p>
                    <span className="pg__link">
                      {project.github ? `GitHub → ${project.github}` : 'GitHub → TODO repo link'}
                    </span>
                  </div>
                </Page>
              </HTMLFlipBook>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
