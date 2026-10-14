import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blank, buildBrief, collect, budLabel, volLabel } from '../src/lib/wizard-brief.js';
import { CONTACT_EMAIL } from '../src/config.js';

const answers = () => ({
  ...blank(),
  type: 'integrations', desc: 'Trigger: new lead\nSteps: enrich and score\nOutput: Slack alert',
  tools: ['Slack', 'Google Sheets or Excel', 'Pipedrive'], vol: 5, freq: 'weekly',
  metrics: ['Hours saved', 'Lead volume'], hours: 12, timeline: 'short', bud: 3, unsure: false, cur: 'EUR',
  name: 'Ana Ruiz', company: 'Northbridge Capital', email: 'ana@northbridge.com', notes: 'Needs it before Q4.', consent: true,
});

test('the brief is addressed to the official contact e-mail', () => {
  const { href } = buildBrief(answers());
  assert.ok(href.startsWith(`mailto:${CONTACT_EMAIL}?subject=`));
  assert.equal(CONTACT_EMAIL, 'empiricphoton@gmail.com');
});

test('subject names the project', () => {
  const { subject, href } = buildBrief(answers());
  assert.equal(subject, 'Nueva Solicitud de Custom Workflow - Northbridge Capital');
  assert.ok(href.includes(encodeURIComponent(subject)));
});

test('the body carries every answer, structured by step', () => {
  const body = decodeURIComponent(new URL(buildBrief(answers()).href).searchParams.get('body'));
  for (const piece of [
    'Proyecto: Northbridge Capital', '== Tipo de proyecto ==', 'Integraciones API / n8n',
    '== Detalles y especificaciones ==', 'Trigger: new lead', 'Slack, Google Sheets o Excel, Pipedrive', 'Unas 1,000 al mes, ejecución semanal',
    '== Objetivos e impacto esperado ==', 'Horas ahorradas, Volumen de leads', '12 horas a la semana', '2 a 4 semanas', '€7,500 a €15,000 (EUR)',
    '== Datos del cliente ==', 'Ana Ruiz', 'ana@northbridge.com', 'Needs it before Q4.',
  ]) assert.ok(body.includes(piece), `missing: ${piece}`);
});

test('"not sure" budget and custom project types are handled', () => {
  const a = { ...answers(), unsure: true, type: 'other', other: 'Onboarding documents' };
  const body = decodeURIComponent(new URL(buildBrief(a).href).searchParams.get('body'));
  assert.ok(body.includes('Presupuesto: Aún no lo sé'));
  assert.ok(body.includes('Otro: Onboarding documents'));
});

test('the on-screen review is in English and groups answers in four steps', () => {
  const groups = collect(answers(), false);
  assert.deepEqual(groups.map((g) => g.step), [1, 2, 3, 4]);
  assert.equal(groups[0].rows[0][1], 'API and n8n integrations');
  assert.equal(groups[2].rows[3][1], '€7,500 to €15,000 (EUR)');
});

test('budget bands and volume labels', () => {
  assert.equal(budLabel({ cur: 'USD' }, 0), 'Under $1,000');
  assert.equal(budLabel({ cur: 'USD' }, 4), 'Over $15,000');
  assert.equal(budLabel({ cur: 'EUR' }, 1, true), '€1,000 a €3,000');
  assert.equal(volLabel(8), '10,000+');
  assert.equal(volLabel(0), '10');
});
