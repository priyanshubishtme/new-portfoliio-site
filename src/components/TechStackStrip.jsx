import './TechStackStrip.css';

const TECH_STACK = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'Vite', color: '#bd34fe' },
  { name: 'Figma', color: '#f24e1e' },
  { name: 'Git', color: '#f05032' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'MongoDB', color: '#47a248' },
];

export default function TechStackStrip() {
  // Triple the array for seamless infinite scroll
  const loop = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <div className="tech-strip" aria-label="Tech stack">
      <div className="tech-strip__track">
        {loop.map((tech, i) => (
          <span key={i} className="tech-strip__tag">
            <span
              className="tech-strip__dot"
              style={{ background: tech.color }}
            />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
