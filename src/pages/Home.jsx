/**
 * Home.jsx — The full portfolio page.
 * Phase 1: renders all content unstyled to prove data flows correctly.
 * Later phases will replace each section block with its styled component.
 */
import siteData from '../content/site.json';
import storyData from '../content/story.json';
import projectsData from '../content/projects.json';
import winsData from '../content/wins.json';
import journeyData from '../content/journey.json';

// Import blog post metadata (Vite glob import)
const postModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Parse frontmatter from each post
import { parseFrontmatter } from '../lib/frontmatter';
const posts = Object.entries(postModules).map(([path, raw]) => {
  const { attributes, body } = parseFrontmatter(raw);
  return { ...attributes, body, path };
});

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <main id="main-content">
        {/* ===== HERO ===== */}
        <section id="hero" style={{ padding: '80px 24px' }}>
          <h1>{siteData.hero.headline}</h1>
          <p>{siteData.hero.line}</p>
          <p style={{ opacity: 0.6 }}>{siteData.hero.scrollHint}</p>
        </section>

        {/* ===== STORY CHAPTERS ===== */}
        <section id="scene" style={{ padding: '60px 24px' }}>
          <h2>My Story</h2>
          {storyData.map((chapter) => (
            <article key={chapter.id} style={{ marginBottom: '40px' }}>
              <h3>
                {chapter.title}{' '}
                <span style={{ fontWeight: 400, opacity: 0.6 }}>
                  — {chapter.subtitle}
                </span>
              </h3>
              <p>{chapter.body}</p>
            </article>
          ))}
        </section>

        {/* ===== WHAT I DO ===== */}
        <section id="what" style={{ padding: '60px 24px' }}>
          <h2>What I do</h2>
          {journeyData.whatIDo.map((item, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <h3>{item.heading}</h3>
              <p>{item.body}</p>
            </div>
          ))}
          <p style={{ opacity: 0.6 }}>{journeyData.skills}</p>
        </section>

        {/* ===== JOURNEY ===== */}
        <section id="journey" style={{ padding: '60px 24px' }}>
          <h2>Where I've been</h2>

          <h3>Experience</h3>
          {journeyData.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <p style={{ opacity: 0.6 }}>{exp.period}</p>
              <h4>
                {exp.title}, {exp.company}
              </h4>
              {exp.description.map((d, j) => (
                <p key={j}>{d}</p>
              ))}
            </div>
          ))}

          <h3>Education</h3>
          {journeyData.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <p style={{ opacity: 0.6 }}>{edu.period}</p>
              <h4>{edu.school}</h4>
              <p>
                {edu.degree}, {edu.grade}
              </p>
            </div>
          ))}
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" style={{ padding: '60px 24px' }}>
          <h2>Projects</h2>
          {projectsData.map((project) => (
            <article key={project.id} style={{ marginBottom: '40px' }}>
              <h3>{project.title}</h3>
              <p style={{ opacity: 0.6 }}>{project.kind}</p>
              <p>{project.description}</p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  margin: '16px 0',
                }}
              >
                {project.facts.map((f, i) => (
                  <div key={i}>
                    <strong>{f.value}</strong> {f.label}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: '2px 10px',
                      border: '1px solid var(--line)',
                      borderRadius: '99px',
                      fontSize: '0.8rem',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <h4 style={{ marginTop: '16px' }}>Story pages:</h4>
              {project.story.map((p, i) => (
                <p key={i} style={{ marginBottom: '8px' }}>
                  Page {i + 1}: {p}
                </p>
              ))}
            </article>
          ))}
        </section>

        {/* ===== WINS ===== */}
        <section id="wins" style={{ padding: '60px 24px' }}>
          <h2>Wins</h2>
          {winsData.tiers.map((tier) => (
            <div key={tier.tier} style={{ marginBottom: '24px' }}>
              <h3>
                Tier {tier.tier} — {tier.label}
              </h3>
              <ul>
                {tier.items.map((item, i) => (
                  <li key={i}>
                    <strong>{item.position}</strong> — {item.title}
                    {item.subtitle && (
                      <span style={{ opacity: 0.6 }}> ({item.subtitle})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ===== NOTES ===== */}
        <section id="notes" style={{ padding: '60px 24px' }}>
          <h2>Notes and conversations</h2>
          <p style={{ opacity: 0.6 }}>{siteData.notesIntro}</p>
          {posts.map((post) => (
            <article
              key={post.slug}
              style={{
                padding: '16px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <h3>{post.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                {post.tag} · {post.readTime} min
                {post.sample && (
                  <span style={{ color: 'var(--gold)', marginLeft: '10px' }}>
                    Sample post
                  </span>
                )}
              </p>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" style={{ padding: '60px 24px' }}>
          <h2>Let's talk.</h2>
          <p>
            Book a session to connect, share ideas and have a meaningful
            conversation.
          </p>
          <div style={{ display: 'flex', gap: '16px', margin: '24px 0' }}>
            <a
              href={siteData.links.linktree}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a session
            </a>
            <a href={`mailto:${siteData.links.email}`}>Send an email</a>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href={siteData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={siteData.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={siteData.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={siteData.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </section>
      </main>

      <footer style={{ padding: '20px 24px', opacity: 0.6 }}>
        <span>Built by {siteData.name}</span>
        <span style={{ marginLeft: '24px' }}>
          {siteData.brand}, {new Date().getFullYear()}
        </span>
      </footer>
    </>
  );
}
