import './TechStackStrip.css';

const TECH_STACK = [
  { name: 'React', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25 21.25 17.1 21.25 12 17.1 2.75 12 2.75z"/><ellipse cx="12" cy="12" rx="4.5" ry="1.5" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="4.5" ry="1.5" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="4.5" ry="1.5" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1"/></svg>' },
  { name: 'JavaScript', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v20H2z" fill="#f7df1e"/><path d="M16 16.5c-1 1-2 1.5-3.5 1.5-2 0-3-1-3-2.5V11h2v4.5c0 1 .5 1.5 1.5 1.5s2-.5 2-1V11h2v5.5zm-5-3c0 2.5-2 4.5-4.5 4.5S2 16 2 13.5v-2h2v2c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5v-2h2v2z" fill="#000"/></svg>' },
  { name: 'TypeScript', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 2h20v20H2z" fill="#3178c6"/><path d="M14.5 17.5c-1.5 1.5-3.5 1.5-5 1.5s-3.5-.5-5-2v-2h2.5v1.5c0 1 1.5 1.5 2.5 1.5s2.5-.5 2.5-1.5v-1.5c0-1-1-1.5-2-1.5h-1c-2 0-3.5-1-3.5-3s1.5-3 3.5-3 3.5.5 4.5 2v2h-2.5V10c0-1-1.5-1.5-2.5-1.5s-2.5.5-2.5 1.5v1.5c0 1 1 1.5 2 1.5h1c2 0 3.5 1 3.5 3s-1.5 3-3.5 3z" fill="#fff"/></svg>' },
  { name: 'Python', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 8 4 8 4L8 6 16 6 16 8 8 8C5.5 8 5.5 10 5.5 12 5.5 14 5.5 16 8 16L10 16 10 14C10 13 11 12 12 12 13 12 16 12 16 12 18 12 18 10 18 10L18 8C18 8 18 6 16 6 14 6 12 6 12 6L12 4C12 3 11 2 12 2zM10.5 3.5A1 1 0 1 1 10.5 5.5 1 1 0 1 1 10.5 3.5z" fill="#3776ab"/><path d="M12 22C16 22 16 20 16 20L16 18 8 18 8 16 16 16C18.5 16 18.5 14 18.5 12 18.5 10 18.5 8 16 8L14 8 14 10C14 11 13 12 12 12 11 12 8 12 8 12 6 12 6 14 6 14L6 16C6 16 6 18 8 18 10 18 12 18 12 18L12 20C12 21 13 22 12 22zM13.5 20.5A1 1 0 1 1 13.5 18.5 1 1 0 1 1 13.5 20.5z" fill="#ffd343"/></svg>' },
  { name: 'Tailwind', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" fill="#38bdf8"/></svg>' },
  { name: 'Vite', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 2l-2 19.5L12 24 2 21.5 0 2l12 18L22 2z" fill="#646cff"/><path d="M12 20L2 21.5 0 2l12 18z" fill="#41d1ff"/><path d="M12 2l10 19.5L12 24V2z" fill="#bd34fe"/></svg>' },
  { name: 'Figma', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4.5A4.5 4.5 0 1 1 11.5 9h4.5V4.5z" fill="#1abcfe"/><path d="M8 9A4.5 4.5 0 1 1 12.5 4.5V9H8z" fill="#0acf83"/><path d="M8 13.5a4.5 4.5 0 1 1 4.5-4.5V13.5H8z" fill="#ff7262"/><path d="M16 13.5a4.5 4.5 0 1 1-4.5-4.5h4.5v4.5z" fill="#f24e1e"/><path d="M12.5 18a4.5 4.5 0 1 1-4.5-4.5V18z" fill="#a259ff"/></svg>' },
  { name: 'Node.js', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 1.5L20.5 8v8L12 21.5 3.5 16V8L12 3.5zm-1 2.5v12l1 .5 1-.5v-12l-1-.5-1 .5zm2.5 1.5v9l2-1V8.5l-2-1zm-6 0l-2 1v9l2 1v-11z" fill="#339933"/></svg>' }
];

export default function TechStackStrip() {
  const loop = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK]; // Duplicate more for smooth loop on big screens

  return (
    <div className="tech-strip">
      <div className="tech-strip__label">TECH STACK</div>
      <div className="tech-strip__inner">
        {loop.map((tech, i) => (
          <div 
            key={i} 
            className="tech-strip__item"
            dangerouslySetInnerHTML={{ __html: tech.svg }}
            title={tech.name}
          />
        ))}
      </div>
    </div>
  );
}
