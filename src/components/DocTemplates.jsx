import { SHEETS, DOC_TEMPLATES } from '../content';
import { CONTACT_EMAIL, GUMROAD_URL, X_URL } from '../config';

// Legal notices, articles and A4 samples live in src/content as plain HTML.
// They are mounted as inert <template> elements and cloned on demand by the
// document viewer / modals (src/legacy/docs.js, src/legacy/doc-dialog.js).
const fill = (html) =>
  html
    .replaceAll('{{CONTACT_EMAIL}}', CONTACT_EMAIL)
    .replaceAll('{{GUMROAD_URL}}', GUMROAD_URL)
    .replaceAll('{{X_URL}}', X_URL);

export default function DocTemplates() {
  return (
    <>
      {SHEETS.map((s) => (
        <template
          key={s.id}
          data-sheet={s.id}
          data-product={s.product}
          data-class={s.cls}
          data-title={s.title}
          data-caption={s.caption}
          dangerouslySetInnerHTML={{ __html: fill(s.html) }}
        />
      ))}
      {DOC_TEMPLATES.map((d) => (
        <template key={d.id} id={d.id} data-title={d.title} dangerouslySetInnerHTML={{ __html: fill(d.html) }} />
      ))}
    </>
  );
}
