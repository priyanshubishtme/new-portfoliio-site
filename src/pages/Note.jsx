/**
 * Note.jsx — Individual blog post page.
 * Phase 1: basic rendering of a single post by slug.
 * Phase 6 will add reading progress bar, styled layout, etc.
 */
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { parseFrontmatter } from '../lib/frontmatter';

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

  if (!post) {
    return (
      <main style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h1>Post not found</h1>
        <p>
          <Link to="/">← Back home</Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: '80px 24px', maxWidth: '720px', margin: '0 auto' }}>
      <Link to="/" style={{ opacity: 0.6 }}>
        ← Back
      </Link>
      <h1 style={{ marginTop: '24px' }}>{post.title}</h1>
      <p style={{ opacity: 0.6, marginBottom: '32px' }}>
        {post.tag} · {post.readTime} min read
        {post.sample && (
          <span style={{ color: 'var(--gold)', marginLeft: '10px' }}>
            Sample post
          </span>
        )}
      </p>
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: marked(post.body) }}
      />
      <p style={{ marginTop: '48px', opacity: 0.6 }}>
        Want to talk about this? Book a session or send me an email.
      </p>
    </main>
  );
}
