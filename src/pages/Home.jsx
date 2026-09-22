/**
 * Home.jsx — The full portfolio page with proper layout and typography.
 * Phase 3: Isometric room + scroll scene replace hero/story placeholders.
 */
import Nav from '../components/Nav';
import IsometricRoom from '../components/IsometricRoom';
import ScrollScene from '../scene/ScrollScene';
import siteData from '../content/site.json';
import projectsData from '../content/projects.json';
import winsData from '../content/wins.json';
import journeyData from '../content/journey.json';
import { parseFrontmatter } from '../lib/frontmatter';
import './Home.css';

// Import blog posts
const postModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const posts = Object.entries(postModules).map(([, raw]) => {
  const { attributes } = parseFrontmatter(raw);
  return attributes;
});

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main-content">
        {/* ===== ISOMETRIC ROOM HERO ===== */}
        <IsometricRoom />

        {/* ===== SCROLL SCENE (night to dawn) ===== */}
        <ScrollScene />

        {/* ===== TRANSITION TO EMBER ===== */}
        <div className="handoff" aria-hidden="true" />


        {/* ===== WHAT I DO ===== */}
        <section id="what" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title">What I do</h2>
            <div className="what-rows">
              {journeyData.whatIDo.map((item, i) => (
                <div key={i} className="what-row">
                  <h3 className="what-row__heading">{item.heading}</h3>
                  <p className="what-row__body">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="what-skills">{journeyData.skills}</p>
          </div>
        </section>

        {/* ===== JOURNEY ===== */}
        <section id="journey" className="section after-scene" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="section-title">Where I've been</h2>
            <div className="journey-cols">
              {/* Experience */}
              <div className="timeline">
                <h3 className="timeline__heading">Experience</h3>
                {journeyData.experience.map((exp, i) => (
                  <div key={i} className="timeline__item">
                    <span className="timeline__when">{exp.period}</span>
                    <h4 className="timeline__title">
                      {exp.title}, {exp.company}
                    </h4>
                    {exp.description.map((d, j) => (
                      <p key={j} className="timeline__desc">{d}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="timeline">
                <h3 className="timeline__heading">Education</h3>
                {journeyData.education.map((edu, i) => (
                  <div key={i} className="timeline__item">
                    <span className="timeline__when">{edu.period}</span>
                    <h4 className="timeline__title">{edu.school}</h4>
                    <p className="timeline__desc">
                      {edu.degree}. {edu.grade}.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title">Projects</h2>
            <p className="section-sub">
              Two books on the shelf. Open one to read the story.
            </p>
            <div className="projects-grid">
              {projectsData.map((project) => (
                <article key={project.id} className="project-card">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__kind">{project.kind}</p>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__facts">
                    {project.facts.map((f, i) => (
                      <div key={i} className="project-card__fact">
                        <strong>{f.value}</strong>
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="project-card__stack">
                    {project.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WINS ===== */}
        <section id="wins" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title">Wins</h2>
            <p className="section-sub">
              Coding, design, quizzes and stages. Some first places, and some
              finals I'm just as proud of.
            </p>
            <ul className="medal-shelf">
              {winsData.tiers.map((tier) =>
                tier.items.map((item, i) => (
                  <li
                    key={`${tier.tier}-${i}`}
                    className={`medal medal--t${tier.tier}`}
                  >
                    <span className="medal__icon">{item.position}</span>
                    <strong className="medal__title">{item.title}</strong>
                    {item.subtitle && (
                      <span className="medal__sub">{item.subtitle}</span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* ===== NOTES ===== */}
        <section id="notes" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title">Notes and conversations</h2>
            <p className="section-sub">{siteData.notesIntro}</p>
            <div className="notes-list">
              {posts.map((post) => (
                <a
                  key={post.slug}
                  className="note-row"
                  href={`/notes/${post.slug}`}
                >
                  <div className="note-row__top">
                    <h3 className="note-row__title">{post.title}</h3>
                    <div className="note-row__meta">
                      {post.tag} · {post.readTime} min
                      {post.sample && (
                        <em className="note-row__sample">Sample post</em>
                      )}
                    </div>
                  </div>
                  <div className="note-row__excerpt">
                    <div>
                      <p>{post.excerpt}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="contact-section">
          <div className="contact-sun" />
          <div className="contact-inner wrap">
            <h2 className="contact-headline">Let's talk.</h2>
            <p className="contact-lead">
              Book a session to connect, share ideas and have a meaningful
              conversation.
            </p>
            <div className="contact-btns">
              <a
                className="btn btn--primary"
                href={siteData.links.linktree}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a session
              </a>
              <a
                className="btn btn--secondary"
                href={`mailto:${siteData.links.email}`}
              >
                Send an email
              </a>
            </div>
            <div className="contact-social">
              <a href={siteData.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={siteData.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={siteData.links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={siteData.links.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Built by {siteData.name}</span>
        <span>{siteData.brand}, {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
