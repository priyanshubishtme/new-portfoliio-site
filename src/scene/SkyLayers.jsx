/**
 * SkyLayers.jsx — Four gradient layers for the night-to-dawn sky.
 * Opacity is controlled by the parent ScrollScene via inline styles.
 */
export default function SkyLayers({ refs }) {
  return (
    <>
      <div className="sky sky--night" />
      <div className="sky sky--dusk" ref={refs.dusk} />
      <div className="sky sky--ember" ref={refs.ember} />
      <div className="sky sky--dawn" ref={refs.dawn} />
    </>
  );
}
