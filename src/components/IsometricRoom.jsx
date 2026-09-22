/**
 * IsometricRoom.jsx — Lo-fi anime room hero section.
 * A full-viewport isometric room with the winning animation video
 * playing on the computer monitor. Scrolls into the night sky.
 */
import roomImg from '../assets/isometric-room.jpg';
import winVideo from '../assets/everything_is_okay_make_it_ani.mp4';
import './isometric-room.css';

export default function IsometricRoom() {
  return (
    <section className="iso-room" aria-label="Welcome">
      {/* Room background */}
      <img
        className="iso-room__img"
        src={roomImg}
        alt="Lo-fi anime-style bedroom workspace at night"
        width="1792"
        height="1024"
        fetchPriority="high"
      />

      {/* Video on the monitor */}
      <div className="iso-room__video-wrap">
        <video
          className="iso-room__video"
          src={winVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Ambient glow */}
      <div className="iso-room__glow" aria-hidden="true" />

      {/* Floating particles */}
      <div className="iso-room__particles" aria-hidden="true">
        <div className="iso-room__particle" style={{ left: '15%' }} />
        <div className="iso-room__particle" />
        <div className="iso-room__particle" />
        <div className="iso-room__particle" />
      </div>

      {/* Vignette */}
      <div className="iso-room__vignette" aria-hidden="true" />

      {/* Scroll hint */}
      <div className="iso-room__scroll-hint">
        <div className="iso-room__scroll-arrow" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
