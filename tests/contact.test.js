import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { CONTACT_EMAIL, GUMROAD_URL, X_URL, PROMO_VIDEO_SRC } from '../src/config.js';

const root = path.resolve(import.meta.dirname, '..');
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'tests'].includes(f.name)) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(jsx?|html|css|json|md|ya?ml)$/.test(f.name) && f.name !== 'package-lock.json') files.push(p);
  }
})(root);
const text = (f) => fs.readFileSync(f, 'utf8');
const rel = (f) => path.relative(root, f);

// Examples shown to the visitor inside form fields.
const PLACEHOLDERS = new Set(['you@company.com', 'name@company.com', 'tu@empresa.com']);

test('every e-mail address in the project is the official contact address (or a form placeholder)', () => {
  const offenders = [];
  for (const f of files) {
    for (const m of text(f).matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)) {
      const e = m[0].replace(/\.$/, '');
      if (e === CONTACT_EMAIL || PLACEHOLDERS.has(e)) continue;
      if (/^[\w-]+@\d/.test(e)) continue; // package@version (e.g. lucide@0.263.1)
      offenders.push(`${rel(f)}: ${e}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test('the official contact address is empiricphoton@gmail.com', () => {
  assert.equal(CONTACT_EMAIL, 'empiricphoton@gmail.com');
});

test('every mailto: link targets the contact address', () => {
  const bad = [];
  for (const f of files) for (const m of text(f).matchAll(/mailto:([^"'`?\s<>)]*)/g)) {
    const to = m[1];
    if (![CONTACT_EMAIL, '${CONTACT_EMAIL}', '{{CONTACT_EMAIL}}', ''].includes(to)) bad.push(`${rel(f)}: mailto:${to}`);
  }
  assert.deepEqual(bad, []);
});

test('every Gumroad link points to the Empiric Photon store', () => {
  const bad = [];
  for (const f of files) for (const m of text(f).matchAll(/https?:\/\/[\w.-]*gumroad\.com[^\s"'`<>)]*/g)) {
    if (m[0] !== GUMROAD_URL && m[0] !== 'https://empiricphoton.gumroad.com') bad.push(`${rel(f)}: ${m[0]}`);
  }
  assert.deepEqual(bad, []);
  assert.equal(GUMROAD_URL, 'https://empiricphoton.gumroad.com/');
  assert.equal(X_URL, 'https://x.com/Empiricphoton');
});

test('the buy buttons of the kits use the Gumroad constant', () => {
  const kits = text(path.join(root, 'src/components/pages/Kits.jsx'));
  assert.ok(/Get ClipScript AI/.test(kits) && /Get Estate Dossier AI/.test(kits));
  assert.ok([...kits.matchAll(/href=\{GUMROAD_URL\}/g)].length >= 2);
});

test('the hero video player points to /promo.mp4 (served from public/)', () => {
  assert.equal(PROMO_VIDEO_SRC, '/promo.mp4');
  assert.ok(/src=\{PROMO_VIDEO_SRC\}/.test(text(path.join(root, 'src/components/PromoPlayer.jsx'))));
});
