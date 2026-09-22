/**
 * Note.jsx — Individual blog post page.
 * Full reading experience with progress bar, styled prose, and navigation.
 */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { parseFrontmatter } from '../lib/frontmatter';
import './Note.css';

// Glob all posts
const postModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Parse into a lookup by slug
const postsBySlug = {};
Object.values(postModules).forEach((raw) => {
  const { attributes, body } = parseFrontmatter(raw);
  if (attributes.slug) {
    postsBySlug[attributes.slug] = { ...attributes, body };
  }
});

export default function Note() {
  const { slug } = useParams();
  const post = postsBySlug[slug];
  const [progress, setProgress] = useState(0);
  const articleRef = useRef(null);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className="note-page">
        <div className="note-page__inner" style={{ textAlign: 'center', paddingTop: '30vh' }}>
          <h1>Post not found</h1>
          <p style={{ marginTop: 16 }}>
            <Link to="/" className="note-page__back">← Back home</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="note-page" ref={articleRef}>
      {/* Reading progress bar */}
      <div
        className="note-page__progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="note-page__inner">
        <Link to="/" className="note-page__back">
          ← Back
        </Link>

        <h1>{post.title}</h1>

        <div className="note-page__meta">
          <span>{post.tag}</span>
          <span>·</span>
          <span>{post.readTime} min read</span>
          {post.sample && (
            <>
              <span>·</span>
              <span className="note-page__sample">Sample post</span>
            </>
          )}
        </div>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: marked(post.body) }}
        />

        <p className="note-page__footer">
          Want to talk about this? Book a session or send me an email.
        </p>
      </div>
    </main>
  );
}
