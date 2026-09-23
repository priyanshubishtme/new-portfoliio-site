/**
 * Home.jsx — The full portfolio page.
 * Phase 8: Scroll-reveal polish applied to all sections.
 */
import Nav from '../components/Nav';
import ScrollScene from '../scene/ScrollScene';
import Reader from '../projects/Reader';
import Ceremony from '../wins/Ceremony';
import siteData from '../content/site.json';
import winsData from '../content/wins.json';
import journeyData from '../content/journey.json';
import { parseFrontmatter } from '../lib/frontmatter';
import { useScrollReveal } from '../lib/useScrollReveal';
import TechStackStrip from '../components/TechStackStrip';
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
  useScrollReveal();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main-content">
        {/* ===== SCROLL SCENE (night to dawn) ===== */}
        <ScrollScene />

        {/* ===== TRANSITION TO EMBER ===== */}
        <div className="handoff" aria-hidden="true" />

        <div className="content-aurora">

        {/* ===== WHAT I DO ===== */}
        <section id="what" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title reveal">What I do</h2>
            <div className="what-rows reveal-stagger">
              {journeyData.whatIDo.map((item, i) => (
                <div key={i} className="what-row">
                  <h3 className="what-row__heading">{item.heading}</h3>
                  <p className="what-row__body">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="wrap" style={{ textAlign: 'center', marginBottom: '32px', marginTop: '100px' }}>
              <h3 className="section-title reveal" style={{ fontSize: '1.8rem' }}>Tools & Technologies</h3>
              <p className="section-sub reveal" style={{ margin: '14px auto 0' }}>The stack I use to build scalable, premium experiences.</p>
            </div>
            <TechStackStrip />
          </div>
        </section>

        {/* ===== JOURNEY ===== */}
        <section id="journey" className="section after-scene" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="section-title reveal">Where I've been</h2>
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

        {/* ===== PROJECTS (3D Book Shelf + Reader) ===== */}
        <section id="projects" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title reveal">Projects</h2>
            <p className="section-sub reveal">
              Two books on the shelf. Open one to read the story.
            </p>
            <Reader />
          </div>
        </section>

        {/* ===== WINS (Medal Ceremony + Shelf) ===== */}
        <section id="wins" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title reveal">Wins</h2>
            <p className="section-sub reveal">
              Coding, design, quizzes and stages. Some first places, and some
              finals I'm just as proud of.
            </p>

            {/* Medal ceremony — plays once on scroll */}
            <Ceremony />

            {/* Medal shelf */}
            <div style={{ marginTop: 64 }}>
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
          </div>
        </section>

        {/* ===== NOTES ===== */}
        <section id="notes" className="section after-scene">
          <div className="wrap">
            <h2 className="section-title reveal">Notes and conversations</h2>
            <p className="section-sub reveal">{siteData.notesIntro}</p>
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
        </div>

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
        <span>© {new Date().getFullYear()} {siteData.name}</span>
        <span>Designed & built with intention</span>
      </footer>
    </>
  );
}
