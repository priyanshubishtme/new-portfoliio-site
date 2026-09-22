import './TechStackStrip.css';

const TECH_STACK = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js', 
  'Vite', 'GSAP', 'CSS3', 'HTML5', 'Python', 'Tailwind', 
  'Figma', 'Git', 'MongoDB', 'PostgreSQL'
];

export default function TechStackStrip() {
  // Duplicate the array to create a seamless infinite loop
  const loop = [...TECH_STACK, ...TECH_STACK];

  return (
    <div className="tech-strip">
      <div className="tech-strip__inner">
        {loop.map((tech, i) => (
          <span key={i} className="tech-strip__item">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
