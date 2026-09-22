import './RocketIcon.css';

export default function RocketIcon() {
  return (
    <div className="rocket-wrapper" aria-hidden="true">
      <svg className="rocket-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flame */}
        <path className="rocket-flame rocket-flame--outer" d="M12 22C10 22 9 19 9 17C9 15 10.5 14 12 14C13.5 14 15 15 15 17C15 19 14 22 12 22Z" fill="#ff7b00" />
        <path className="rocket-flame rocket-flame--inner" d="M12 21C11.5 21 10.5 19 10.5 17.5C10.5 16.5 11 15.5 12 15.5C13 15.5 13.5 16.5 13.5 17.5C13.5 19 12.5 21 12 21Z" fill="#ffea00" />
        
        {/* Left Fin */}
        <path d="M9 13C8 13 6 15 6 17C7.5 17 8 16 9 15V13Z" fill="#d1c6b1"/>
        {/* Right Fin */}
        <path d="M15 13C16 13 18 15 18 17C16.5 17 16 16 15 15V13Z" fill="#d1c6b1"/>
        
        {/* Body */}
        <path d="M12 2C9 5 9 10 9 14H15C15 10 15 5 12 2Z" fill="#f3ead9"/>
        
        {/* Window */}
        <circle cx="12" cy="8" r="1.5" fill="#121629" stroke="#d1c6b1" strokeWidth="0.5"/>
      </svg>
    </div>
  );
}
