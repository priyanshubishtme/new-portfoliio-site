/**
 * Tiny front-matter parser for .md files.
 * Splits a markdown string into { attributes, body }.
 *
 * Front matter is delimited by --- on its own line:
 *   ---
 *   title: Hello
 *   slug: hello
 *   ---
 *   Body content here...
 *
 * Values are auto-cast: numbers → Number, true/false → Boolean.
 */
export function parseFrontmatter(raw) {
  const fm = {};
  let body = raw;

  // Check for front matter block
  if (raw.startsWith('---')) {
    const end = raw.indexOf('---', 3);
    if (end !== -1) {
      const block = raw.slice(3, end).trim();
      body = raw.slice(end + 3).trim();

      for (const line of block.split('\n')) {
        const colon = line.indexOf(':');
        if (colon === -1) continue;

        const key = line.slice(0, colon).trim();
        let value = line.slice(colon + 1).trim();

        // Strip surrounding quotes
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // Auto-cast
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (value !== '' && !isNaN(value)) value = Number(value);

        fm[key] = value;
      }
    }
  }

  return { attributes: fm, body };
}
