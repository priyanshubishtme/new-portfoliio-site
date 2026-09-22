# Build prompt: "Dream with Priyanshu" personal story site

> How to use this file
> 1. Put this whole package (this file, `design_visualization.html`, and the `assets/` folder) in an empty project folder.
> 2. Open `design_visualization.html` yourself first and scroll through it. Then open the folder in your AI coding agent and paste everything below the line into it as the first message.
> 3. The agent works **one phase at a time** and stops after each. Check the result in the browser before you say "continue".
> 4. The agent also writes a short "What you just learned" note after each phase, so you understand what was built.

---

## 1. Your role and the goal

You are a senior front-end engineer and motion designer building a personal story website for **Priyanshu Bisht**, a 19-year-old builder and creator and BCA (AI & Data Science) student in India. The site tells his story to the world: who he is, what he does, his projects, his wins, and his blog. It should feel **cinematic, immersive, and soft**.

Open `design_visualization.html` in a browser first and **scroll through it, with the intro, the scroll scene and every section**. It is a working prototype (plain HTML, CSS and JavaScript) that is the visual reference for colors, type, layout, motion and mood. Its script contains the exact scroll ranges and easing used for the night-to-dawn scene, the chapter cross-fades, the campus pan, the project stack effect and the notes hover. Rebuild it properly in the stack below (React, GSAP ScrollTrigger and Lenis) and match how it looks and moves. `design_board.html` is a static sheet of the palette, type and illustration list. Where this prompt and the prototype disagree, this prompt wins.

**The one idea: "Night warms into dawn."** The site starts under a dark starry sky. As the visitor scrolls, the sky slowly warms to sunrise. That journey carries the story. Spend the animation budget on this one continuous scroll scene and keep everything else calm.

## 2. Working rules (read carefully)

1. **Work phase by phase** (section 10). After each phase: run the dev server and a production build, fix errors, summarize what you did in plain English, write the "What you just learned" note (5 lines max, explain the technique for a learner), commit with a clear message, then **stop and wait** for me to say "continue".
2. **Do not invent facts.** All text lives in the content files in section 7. If something is missing, use a clearly marked placeholder such as `TODO: add link` and list it at the end of the phase.
3. **Do not add libraries** beyond the stack in section 3 without asking me.
4. Explain choices simply. I am learning, so prefer readable code with short comments over clever code.
5. Never publish my phone number anywhere on the site.

## 3. Stack (already decided)

- **Vite + React (JavaScript, not TypeScript)** with **React Router** for two routes: `/` and `/notes/:slug`.
- **Plain CSS** with custom properties (no Tailwind, no UI kit). One `tokens.css`, one `base.css`, and one CSS file per component.
- **GSAP + ScrollTrigger** for the scroll scene and other motion. **Lenis** for smooth scrolling, wired into ScrollTrigger.
- **marked** to render blog Markdown. Blog posts are `.md` files with a small front-matter block parsed by a tiny helper you write (no heavy dependency).
- Fonts from Google Fonts: **Bricolage Grotesque** (headlines and UI) and **Newsreader** (story and blog prose). Preload them and use `font-display: swap`.
- Deploy target: static hosting (Vercel or Netlify). Add a short `DEPLOY.md` at the end.

## 4. Project structure

```
/public
  favicon.png            (crop from avatar)
  og-image.jpg           (1200x630, avatar on night background)
/src
  main.jsx  App.jsx
  /styles     tokens.css  base.css
  /components Nav.jsx  Intro.jsx  CursorGlow.jsx  Footer.jsx
  /scene      ScrollScene.jsx  SkyLayers.jsx  ChapterText.jsx  scene.css
  /sections   WhatIDo.jsx  Journey.jsx  Notes.jsx  Contact.jsx
  /projects   Shelf.jsx  BookCover.jsx  Reader.jsx  books.json
  /wins       Ceremony.jsx  MedalShelf.jsx
  /pages      Home.jsx  Note.jsx
  /content    site.json  story.json  projects.json  wins.json  journey.json
              /posts    *.md
  /lib        lenis.js  frontmatter.js  useReducedMotion.js
  /assets     avatar.png  campus-banner.png  (plus optimized webp versions you generate)
```

## 5. Design tokens (put in `tokens.css`)

```css
:root{
  --night:#05070D;      /* page start, deepest sky */
  --midnight:#0F1B3D;   /* rim-light blue from the avatar */
  --ember:#2B1B12;      /* warm dark brown */
  --gold:#F2B441;       /* stars, sun, accents, focus rings */
  --cream:#F3EAD9;      /* text */
  --muted:rgba(243,234,217,.66);
  --line:rgba(243,234,217,.14);
  --display:'Bricolage Grotesque',system-ui,sans-serif;
  --prose:'Newsreader',Georgia,serif;
  --ease-soft:cubic-bezier(.22,1,.36,1);
  --dur-soft:.8s;
  --radius-panel:20px; --radius-frame:14px; --radius-pill:999px;
}
```

Type scale: fluid `clamp()` sizes. Headlines 800 weight, tight tracking (-0.02em). Prose in Newsreader at 1.15–1.3rem with 1.55 line height and a max line length of about 62 characters. **Sentence case everywhere. No all-caps labels, no tracked-out eyebrows above headings, no arrows appended to every link.** Do not highlight a single word in a headline with a different color or italic.

Body background is `--night` at the top. The sky colors change **only** through the scroll scene layers (section 8), and after the scene the page background settles on `--ember`.

## 6. Assets

| File | What it is | How to use it |
|---|---|---|
| `assets/avatar.png` | Illustrated portrait, dark hoodie, navy rim light, opaque near-black background | Hero. Fade its edges into the sky with a radial `mask-image` so it looks lit by the sky, not pasted on. |
| `assets/campus-banner.png` | Illustrated GEHU campus at golden hour, 2048x768, student in foreground | The campus layer of the scroll scene. It is a wide panorama, so pan it horizontally. |

- Generate optimized WebP versions (avatar 900px, campus 2400px wide) plus a 1200px campus version for mobile, and use `<picture>` or `srcset`.
- More illustrations will be added later (see the appendix). Build the scene with **layers that can each be swapped for a new image by changing one filename in `site.json`**. Until those exist, use CSS gradient fallbacks so nothing is broken.

## 7. Content (source of truth)

Create the JSON files from this. Keep it easy for me to edit.

### site.json
- Name: Priyanshu Bisht. Brand: Dream with Priyanshu.
- Hero headline: `Hi, I'm Priyanshu.`
- Hero line: `Nineteen, a builder and creator, curious about tech, people, ideas and life.`
- Scroll hint: `Scroll to walk through my story`
- Nav links: Story, What I do, Projects, Wins, Notes, and a "Let's talk" button.
- Location line (footer only): Rudrapur, Uttarakhand, India.
- Links: LinkedIn `https://linkedin.com/in/priyanshubishtme`, GitHub `https://github.com/priyanshubishtme`, Instagram `@priyanshubishtme` (TODO: full URL), YouTube `@priyanshubishtme` (TODO: full URL), Linktree `https://linktr.ee/priyanshubisht.me`, Email `priyanshubisht.me@gmail.com`, Booking link TODO.
- Resume: `/resume.pdf` (TODO: I will add the file).

### story.json (draft copy, rewritten for a more professional tone; keep the meaning)
1. **The signal** (Why I started coding)
   "Computer science was the first subject where I could build, not just memorize. In classes 11 and 12, that hands-on process pulled me in completely, and by the end I knew what I wanted: to make things, not just study them."
2. **A beginning, not an end** (The first hackathon)
   "My first hackathon ended in a project that didn't work the way we planned. It taught me more than any course could: that shipping something imperfect beats not shipping at all. That failure became the starting point for everything after it."
3. **Learning to speak** (The stage)
   "For a long time I stayed quiet in rooms full of people. The first time I walked on stage to introduce myself, unprepared and unsure, changed that. It's a habit I'm still building, one event at a time."
4. **Eight minutes** (Budget Lens)
   "At Budget Lens, an eight-minute presentation and a sharper Q&A round earned us first prize. It was proof that preparation and a clear point of view can hold up under pressure."
5. **What drives me** (closing chapter, shown at the end of the scroll scene)
   "I'm drawn to building things that work, learning in public, and helping the people a step behind me. I don't have it all figured out, and I don't think anyone does at nineteen. But I'd rather try and adjust than wait for certainty."

### journey.json (What I do, experience, education)
- **What I do** (three short statements, not cards):
  - Build: "I build client-focused web products across frontend, backend, APIs and databases."
  - Explore: "I'm studying AI and data science, and I like teaching machines things, like driving a car."
  - Create and connect: "I make content, share ideas, and help the juniors coming after me."
- Skills line: Java and JavaScript (advanced), Python (intermediate), React.js, Node.js, MySQL, Git and GitHub, data structures and algorithms.
- **Experience:** Software Engineer Intern at ElvoraGo, Sep 2026 to present. "Develop client-focused web solutions across frontend, backend, APIs and databases, turning requirements into functional, scalable work." "Lead client outreach and networking: prospecting, requirement gathering, project coordination and delivery."
- **Education:** Graphic Era Hill University, Bachelor of Computer Applications (AI & Data Science), Jul 2024 to Jul 2027, CGPA 9.48 (TODO confirm). Jaycees Public School, Intermediate (Senior Secondary), May 2022 to May 2024, 86%.

### projects.json
1. **AshaPure**, a smart milk delivery platform. "A MERN dairy e-commerce platform supporting shopping, checkout, orders, subscriptions, rewards and admin operations." Facts: 18 frontend routes, 25 REST API endpoints, JWT authentication with role-based access control, responsive QA across 4 viewport sizes, production build verified with API smoke tests. Stack: React.js, Node.js, Express.js, MongoDB. GitHub: TODO repo link.
2. **Arena Self-Driving**, an autonomous highway driving simulator. "A reinforcement learning simulator where an agent learns to drive with tabular SARSA." Facts: 864 discretized states, 5 driving actions, a 4,320-entry Q-table, human demonstration recording with warm-start training, and browser streaming of 4 training metrics for evaluation and agent playback. Stack: Python, HighwayEnv, Gymnasium, NumPy, SARSA, FastAPI, PyGame. GitHub: TODO repo link.
- No screenshots yet. Use an abstract dark illustrated placeholder per project and read an optional `image` field so I can drop screenshots in later.

### wins.json (tier controls medal size)
- Tier 1 (large gold): **CodeCraft 2025, Hack the Spring, Bhimtal**: 1st position, coding competition. **Budget Lens 2026**: first prize (TODO confirm the exact title; an older portfolio said "Best Budget Analyst").
- Tier 2 (medium silver): **Design Spark 2026**: runner up. **Webathon 2.0**: second runner up (TODO confirm year). **Tech Quiz**: 2nd position, twice, university level.
- Tier 3 (small, quiet): **Watch the Code**: national-level hackathon, final round. **Nirvan**: national-level hackathon, final round. **Monthly Coding Series**: gold, silver and bronze across three university-level contests.

### posts/*.md (sample posts, marked `sample: true` in front matter)
Show a small "Sample post" tag on these until I replace them. Write a short body (about 120 to 180 words, two or three paragraphs) for each using only facts from this file. Front matter fields: `title`, `slug`, `date` (use placeholders in September 2026), `tag`, `readTime`, `excerpt`, `sample`.
1. "Why coding was the first place I felt included" (Story, 4 min)
2. "Our first hackathon failed. Here is what it gave me" (Reflection, 5 min)
3. "Building AshaPure: 18 routes, 25 endpoints" (Build log, 7 min)
4. "Teaching a car to drive with SARSA" (Machine learning, 6 min)
5. "Speaking when you're scared: notes from my first stage" (Reflection, 4 min)
6. "Notes for juniors: what I wish I'd known in first year" (Guide, 5 min)

Notes section intro: "A place to share ideas and have meaningful conversations." Each post ends with "Want to talk about this? Book a session or send me an email."

## 8. The scroll scene (the signature moment)

Build `ScrollScene.jsx` as one section about **500vh tall** (400vh on mobile) that contains a `position: sticky; top: 0; height: 100vh` stage. One GSAP timeline is scrubbed by ScrollTrigger (`scrub: 1`), so the whole scene is reversible when scrolling back.

**Layers, back to front:**
1. `sky-night`, `sky-dusk`, `sky-ember`, `sky-dawn`: four full-bleed gradient layers whose opacities cross-fade. Night `#05070D` to midnight glow; dusk `#14121a` to `#2B1B12`; ember `#2B1B12` to `#5c3719`; dawn `#5c3719` to `#c27a26` to `#F2B441` at the horizon.
2. `stars`: a canvas or CSS star field, about 120 stars, a few tinted gold, slow twinkle. Fades to 0 by the end.
3. `glow`: a soft midnight-blue radial glow behind the avatar. Later a gold orb (chapter 1) and a rising sun (end).
4. `avatar`: the portrait, masked so it melts into the sky. Moves slower than the scroll (parallax).
5. `campus`: the campus panorama, height 100vh, width auto, translated horizontally across the scene with a slight zoom from 1.0 to 1.08. A soft gradient hides its top edge so it appears to rise from the sky.
6. `text`: the hero copy and chapter text, always readable (add a subtle dark gradient behind text if needed).

**Timeline (fraction of total scroll):**
- 0.00 to 0.12: hero holds. Stars twinkle. Avatar drifts up a few pixels.
- 0.12 to 0.32: hero text fades out. Sky moves night to dusk. The avatar slides left and fades to 30%. A gold orb glows in. **Chapter 1: The light** appears.
- 0.32 to 0.52: sky moves to ember. Stars dim. **Chapter 2: A beginning, not an end.**
- 0.48 to 0.56: campus fades and rises in from the bottom (overlaps with chapter 2 leaving).
- 0.52 to 0.72: campus pans slowly. **Chapter 3: The first time I spoke.**
- 0.72 to 0.90: **Chapter 4: Eight minutes.** Campus continues to pan.
- 0.90 to 1.00: campus fades down, sun rises, sky reaches dawn. **Chapter 5: How I see the world** appears in cream text over the warm sky. Then the scene ends and the next section begins with `--ember` as the page background.

Each chapter shows a small progress bar (five thin segments, gold for the current one), the chapter title in Newsreader italic, and the body in Newsreader. Chapters cross-fade (opacity plus 12px vertical drift, 600ms, `--ease-soft`). Text must be readable at every scroll position.

**Reduced motion and mobile:** if `prefers-reduced-motion` is on, do not pin. Render each chapter as a normal stacked block with its still image and a static gradient. On mobile use the same timeline but shorter, position the avatar lower right, and use `object-position` on the campus image instead of a long pan.

## 9. Two signature interactions (built and proven in the prototype)

These are not decoration. They are the parts that make this portfolio different from a template, and the prototype's JavaScript is a working reference implementation, so read it before you build the React version.

### 9a. Projects as books

Each project is a closed book standing on a shelf: an illustrated cover (SVG, not a photo), a spine with the title, and a title beneath it. Clicking a book opens a full-screen reader: a two-page spread on a cream paper background (`#efe6d3`), rendered over a dimmed, blurred backdrop of the page behind it.

- **The left page never changes.** It's the facts page: title, one-line description, a 2x2 grid of big numbers with labels, stack chips, and a GitHub link.
- **The right page flips through the story**, one paragraph at a time, using Previous and Next controls plus arrow keys. The flip is a genuine `rotateY` transform on the page element (not a slide or a fade): the current page rotates away to about 88 degrees and fades, its content is swapped, then it rotates back in from the opposite side. Page dots below the book show position.
- **Content is just an array per project:** a title, a kind, a list of facts, a stack list, a link, and a list of story paragraphs (strings). Adding a paragraph later means pushing one string, not touching layout code. Build the real content model this way (a `books.json`-style array) so it's easy for Priyanshu to maintain: he writes plain paragraphs, the book handles the presentation.
- Close via an explicit Close button, clicking the dimmed backdrop, or Escape. Trap focus while open, restore focus to the book cover on close, and disable body scroll while the reader is open.
- On narrow screens the spread stacks into one column (facts on top, story below) instead of two side-by-side pages.

### 9b. The medal ceremony

At the top of the Wins section, before the shelf list, there's a small illustrated scene: a character standing on a podium. The first time it scrolls into view (`IntersectionObserver`, fires once), it plays a short ceremony: the head tilts down slightly, a medal on a ribbon drops in from above with a soft bounce (`cubic-bezier(.34,1.56,.64,1)`) and settles around the neck, and a burst of about 25 small gold and cream confetti rectangles animate outward and downward with random rotation, drifting off after a couple of seconds. A caption line changes from "Scroll here for a small medal ceremony" to "A small round of applause, every time."

- The character and podium are hand-built SVG in the site's own palette (gold, cream, night), not a stock icon or a photo, so they belong to the same illustrated world as the avatar and campus art.
- Build the confetti with the Web Animations API or a small set of CSS keyframes driven by randomized inline transforms, exactly like the prototype: cheap, no library needed.
- Respect `prefers-reduced-motion`: skip the confetti and the drop bounce, just fade the medal in.
- The medal shelf (the full list of wins, sized by tier) sits right below this scene, unchanged from before.

## 9c. Other sections and motion rules

- **Intro (once):** a single gold star twinkles on black, then "Dream with Priyanshu" writes itself, then the overlay lifts. About 2 seconds. Store `seen` in `sessionStorage` so it plays once per visit. Skip it entirely for reduced motion. Provide a Skip button after 0.6s.
- **Nav:** a floating pill at the top with `backdrop-filter: blur`, thin border, and the "Let's talk" button in cream. Highlights the active section. On mobile it becomes a compact button that opens a full-screen menu. Keyboard accessible.
- **What I do:** three big left-aligned statements with generous space and the skills line beneath. No cards.
- **Journey:** a quiet vertical timeline for experience and education (a real sequence, so a line and dates are fine). Newsreader for descriptions.
- **Projects:** large panels that **stack over each other** as you scroll, using `position: sticky` with a growing `top` offset (about 6rem plus 1.5rem per card), and each card scales to about 0.96 as the next one covers it. Each panel: title, one-sentence description, three facts as big numbers with labels, stack chips, and links.
- **Wins:** a horizontal "shelf" of medals sized by tier with a soft gold glow on tier 1. Hover or focus shows a small tooltip. Render as an accessible `<ul>`, not just decoration.
- **Notes:** an editorial list, not a card grid. Each row: title in Newsreader (large), tag, read time, excerpt. Rows link to `/notes/:slug`. The post page has a slim reading-progress bar in gold and a comfortable reading column.
- **Let's talk (contact):** the sunrise. Headline "Let's talk." with the line "Book a session to connect, share ideas and have a meaningful conversation." Two buttons: **Book a session** and **Send an email**. Beneath: LinkedIn, GitHub, Instagram, YouTube, Linktree. Footer: "Built by Priyanshu Bisht" and the year.
- **Cursor glow (desktop only):** a soft, small radial glow that follows the pointer with a little lag. Hide on touch devices.

**Motion budget:** the scroll scene, the intro, the project stack, and small responses to user actions (hover, focus, press). **Do not** add fade-and-slide-up to every section, hover lifts on every card, marquees, or looping decorative animation elsewhere.

## 10. Phases (stop after each)

1. **Foundation.** Vite + React project, router, `tokens.css`, `base.css`, fonts, content JSON files, asset optimization, and a plain unstyled page that renders all content to prove the data flows. *Done when:* `npm run build` passes and all content shows.
2. **Layout and nav.** Sticky pill nav, page sections in order with real spacing and type, responsive at 360, 768, 1280px. No animation yet. *Done when:* it looks like the design board's calm sections on desktop and mobile.
3. **The scroll scene, static.** Build all scene layers and chapter text with no scroll animation, then verify each state by adding a debug slider (remove it afterward) that sets scene progress 0 to 1. *Done when:* every point on the timeline looks right.
4. **The scroll scene, animated.** Wire the GSAP timeline, ScrollTrigger and Lenis. *Done when:* scrolling up and down is smooth and reversible, chapters are readable throughout, and there is no jank at 60fps on a mid-range laptop.
5. **Story-adjacent sections.** What I do, Journey, Projects as books (section 9a), Wins with the medal ceremony (section 9b). *Done when:* a book opens, the right page flips through every story paragraph without ever showing duplicate or stale text, and the ceremony plays once per visit.
6. **Notes.** Six sample posts, list, post page, reading progress, marked "Sample post". *Done when:* the routes work with refresh and direct links.
7. **Contact, footer, intro, cursor glow.** *Done when:* the intro plays once per session and can be skipped.
8. **Polish.** Reduced-motion fallback, mobile timeline, keyboard focus rings in gold, skip-to-content link, alt text, heading order, contrast AA, meta tags, Open Graph image, favicon. *Done when:* Lighthouse desktop shows Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
9. **Ship.** `DEPLOY.md` with exact steps for Vercel or Netlify, including SPA fallback for `/notes/:slug`. Then a final list of every remaining `TODO`.

## 11. Quality floor (all phases)

- Responsive from 360px up. No horizontal scrolling.
- Images: WebP, `width` and `height` set, lazy-load below the fold, preload the hero avatar.
- Never animate `width`, `height`, `top` or `left`. Animate `transform` and `opacity`.
- Body text contrast at least 4.5:1. Visible keyboard focus on every interactive element.
- Semantic HTML: one `h1`, landmarks (`header`, `nav`, `main`, `section`, `footer`).
- Comment the scroll scene code well, since I want to learn from it.

## 12. Things I will confirm later (list them at the end of Phase 1)

CGPA (9.48 or 9.43), the exact Budget Lens title, the Webathon 2.0 year, whether to mention loopynow, which email to publish, GitHub repo links, the booking link, the resume PDF, and full Instagram and YouTube URLs.

---

---

# Appendix: every asset to generate yourself, with exact prompts

I can't generate images or video here, only code and SVG. Generate these on your own image tools and drop the files into `/src/assets` with the exact names below — the build prompt already wires up those filenames. For anything not ready yet, the agent uses a CSS placeholder, so nothing breaks in the meantime.

**Shared style line — paste this into every prompt below**, and attach your avatar (`profile.png`) as the character/style reference each time:
*Semi-realistic digital illustration, painterly cel-shaded look, clean linework, soft cinematic lighting, warm rim light, rich shadows. Same character as the reference: young man, short dark hair, light mustache, dark hoodie.*

### Scroll-scene illustrations (wide, for the hero and story chapters)
Ask for **21:9 or 2.7:1**, and where possible a second version of just the character on a flat/transparent background, so it can move as its own layer.

| # | Filename | Used for | Prompt (append the shared style line above) |
|---|---|---|---|
| 1 | `scene-window.png` | Hero, the deepest sky layer, behind the avatar | "Him at a desk by a large window, laptop glowing, a huge starry night sky outside with a faint navy glow, a warm small desk lamp, calm and quiet mood." |
| 2 | `scene-hackathon.png` | Chapter 2, "A beginning, not an end" | "A team of four students around laptops late at night in a university lab, tired but focused, a whiteboard behind them, cool blue light with one warm desk lamp." |
| 3 | `scene-stage.png` | Chapter 3, "Learning to speak" | "A university auditorium seen from behind the audience, one raised hand near the front, a lit stage ahead, cool room with a warm spotlight on the stage." |
| 4 | `scene-sunrise.png` | Closing chapter, "What drives me" | "A soft horizon with the first sun, low hills and a few trees, gold and peach sky fading up to deep navy, empty and peaceful." |

### Wins: the medal ceremony
The prototype already has a **working, hand-coded SVG version** of this (a simple flat character on a podium, a medal drops onto his neck, confetti bursts) — open `design_visualization.html` and scroll to Wins to see it. That version ships by default, so the site works with zero image generation. If you'd rather have an actual illustrated scene in your art style instead of the flat SVG, generate this and I'll swap it in as a still image behind the same medal-drop and confetti motion:

| # | Filename | Used for | Prompt |
|---|---|---|---|
| 5 | `wins-podium.png` | Background art for the medal ceremony | Shared style line, plus: "Him standing on a small podium, head slightly bowed, hands loosely at his sides, warm gold spotlight from above, soft dark background with a few blurred out-of-focus figures suggesting a small crowd, celebratory but understated mood." |

### Nav / UI touch (optional, matches the isometric room's toggle)
| # | Filename | Used for | Prompt |
|---|---|---|---|
| 6 | `sun-icon.svg`, `moon-icon.svg` | A small day/night toggle in the nav, if you want one (see note below) | Simple flat line icons, single weight stroke, cream (#F3EAD9) on transparent, minimal sun and crescent moon, no gradients or shading. |

### The lock-screen light-sweep, already built
The moving beam of light you liked from your phone's lock screen is **already implemented in code**, not an image — it's a rotating conic-gradient behind the avatar in the hero, no asset needed. Open the prototype and watch the hero for a few seconds to see it sweep across. It fades out once you start scrolling into the story, so it doesn't compete with the chapters. If you want that same beam-sweep motion reused elsewhere (for example, sweeping once across the Wins ceremony or the closing sunrise), tell me where and I'll extend it — it's cheap to reuse since it's pure CSS.

### One open question for you
When you said *"book animation like given in the image, for our project"* — I read the isometric-room screenshot as a reference for **polish and interactivity** (the smooth day/night toggle, the dimensional feel), not literally a book. I kept the project section as flipping books, since that was your own idea from earlier, and just made sure it's a real page-turn, not a flat card. Let me know if you actually meant something different for that section, and I'll adjust.

