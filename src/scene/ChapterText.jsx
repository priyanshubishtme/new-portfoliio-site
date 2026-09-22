/**
 * ChapterText.jsx — A single story chapter in the scroll scene.
 * Visibility is controlled by the parent via ref + inline styles.
 */
export default function ChapterText({ chapter, isWide, innerRef }) {
  return (
    <article
      className={`chapter ${isWide ? 'chapter--wide' : ''}`}
      ref={innerRef}
    >
      <div className="chapter__label">{chapter.subtitle}</div>
      <h2 className="chapter__title">{chapter.title}</h2>
      <p className="chapter__body">{chapter.body}</p>
    </article>
  );
}
