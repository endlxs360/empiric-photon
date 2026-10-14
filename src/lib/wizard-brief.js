import { CONTACT_EMAIL } from '../config.js';

// Questionnaire options and the e-mail brief builder (pure functions, no DOM).

export const TYPES = { content: 'Content automation', docs: 'Document generation', audit: 'Web audit', leads: 'Lead capture', integrations: 'API and n8n integrations', data: 'Data extraction', reporting: 'Reporting and analytics', other: 'Something else' };
export const TOOLS = ['Google Sheets or Excel', 'Notion', 'Slack', 'Gmail or Outlook', 'HubSpot or Salesforce', 'n8n, Zapier or Make', 'WordPress or Shopify', 'Google Drive', 'Airtable', 'Python scripts'];
export const METRICS = ['Hours saved', 'Cost per document', 'Error rate', 'Turnaround time', 'Lead volume', 'Conversion rate', 'Consistency', 'Compliance'];
export const VOL = [10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
export const FREQ = { ondemand: 'On demand', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', realtime: 'Real time (webhook)' };
export const TIME = { asap: 'As soon as possible (under 2 weeks)', short: '2 to 4 weeks', mid: '1 to 2 months', long: '3 months or more', flex: 'Flexible' };
export const BUD = [1000, 3000, 7500, 15000]; // band edges: <1k, 1k-3k, 3k-7.5k, 7.5k-15k, >15k

export function blank() {
  return { step: 1, max: 1, type: '', other: '', desc: '', tools: [], vol: 2, freq: 'ondemand', metrics: [], hours: 10, timeline: '', bud: 2, unsure: true, cur: 'USD', name: '', company: '', email: '', notes: '', consent: false };
}

export function grp(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
export function volLabel(i) { return i >= 8 ? '10,000+' : grp(VOL[i]); }
export function budLabel(W, i, es) {
  const s = W.cur === 'EUR' ? '€' : '$';
  if (i === 0) return (es ? 'Menos de ' : 'Under ') + s + grp(BUD[0]);
  if (i === 4) return (es ? 'Más de ' : 'Over ') + s + grp(BUD[3]);
  return s + grp(BUD[i - 1]) + (es ? ' a ' : ' to ') + s + grp(BUD[i]);
}

const TYPES_ES = { content: 'Automatización de contenidos', docs: 'Generación de documentos', audit: 'Auditoría web', leads: 'Captura de leads', integrations: 'Integraciones API / n8n', data: 'Extracción de datos', reporting: 'Informes y analítica', other: 'Otro' };
const FREQ_ES = { ondemand: 'bajo demanda', daily: 'diaria', weekly: 'semanal', monthly: 'mensual', realtime: 'en tiempo real (webhook)' };
const TIME_ES = { asap: 'Lo antes posible (menos de 2 semanas)', short: '2 a 4 semanas', mid: '1 a 2 meses', long: '3 meses o más', flex: 'Flexible' };
const MET_ES = { 'Hours saved': 'Horas ahorradas', 'Cost per document': 'Coste por documento', 'Error rate': 'Tasa de errores', 'Turnaround time': 'Plazo de entrega', 'Lead volume': 'Volumen de leads', 'Conversion rate': 'Tasa de conversión', 'Consistency': 'Consistencia', 'Compliance': 'Cumplimiento' };
const TOOLS_ES = { 'Google Sheets or Excel': 'Google Sheets o Excel', 'Gmail or Outlook': 'Gmail u Outlook', 'HubSpot or Salesforce': 'HubSpot o Salesforce', 'n8n, Zapier or Make': 'n8n, Zapier o Make', 'WordPress or Shopify': 'WordPress o Shopify' };
// The e-mail is written in Spanish for the team; the on-screen review stays in English.
export const MAIL_SUBJECT = 'Nueva Solicitud de Custom Workflow - ';

// Answers grouped by questionnaire step. es=true gives the Spanish version used in the e-mail.
export function collect(W, es) {
  const t = (en, sp) => (es ? sp : en);
  const type = W.type === 'other' ? t(TYPES.other, TYPES_ES.other) + ': ' + W.other.trim() : (es ? TYPES_ES : TYPES)[W.type];
  const tools = W.tools.length ? W.tools.map((x) => (es && TOOLS_ES[x] ? TOOLS_ES[x] : x)).join(', ') : t('Not specified', 'No indicadas');
  const vol = es ? 'Unas ' + volLabel(W.vol) + ' al mes, ejecución ' + FREQ_ES[W.freq] : 'About ' + volLabel(W.vol) + ' per month, ' + FREQ[W.freq].toLowerCase();
  const mets = W.metrics.map((m) => (es ? MET_ES[m] || m : m)).join(', ');
  const hours = W.hours ? (es ? W.hours + ' horas a la semana' : W.hours + ' hours a week') : t('No target', 'Sin objetivo');
  const budget = W.unsure ? t('Not sure yet', 'Aún no lo sé') : budLabel(W, W.bud, es) + ' (' + W.cur + ')';
  const contact = [[t('Name', 'Nombre'), W.name.trim()], [t('Company or project', 'Empresa o proyecto'), W.company.trim()], [t('Email', 'Correo de contacto'), W.email.trim()]];
  if (W.notes.trim()) contact.push([t('Other notes', 'Otras notas'), W.notes.trim()]);
  return [
    { step: 1, title: t('Project', 'Tipo de proyecto'), rows: [[t('Project type', 'Tipo de proyecto'), type]] },
    { step: 2, title: t('Details', 'Detalles y especificaciones'), rows: [[t('Flow description', 'Descripción del flujo'), W.desc.trim()], [t('Current tools', 'Herramientas actuales'), tools], [t('Volume and frequency', 'Volumen y frecuencia'), vol]] },
    { step: 3, title: t('Impact', 'Objetivos e impacto esperado'), rows: [[t('Metrics to improve', 'Métricas a mejorar'), mets], [t('Time to save', 'Ahorro de tiempo'), hours], [t('Timeline', 'Plazo'), (es ? TIME_ES : TIME)[W.timeline]], [t('Budget', 'Presupuesto'), budget]] },
    { step: 4, title: t('Contact', 'Datos del cliente'), rows: contact },
  ];
}

// Builds the mailto: link (to CONTACT_EMAIL) with subject and body filled from the answers.
export function buildBrief(W) {
  const es = collect(W, true);
  const company = W.company.trim();
  const subject = MAIL_SUBJECT + company;
  const text = 'Nueva solicitud de Custom Workflow\n\nProyecto: ' + company + '\n\n' + es.map((g) =>
    '== ' + g.title + ' ==\n' + g.rows.map((r) => r[0] + ': ' + (/\n/.test(r[1]) ? '\n' + r[1] : r[1])).join('\n')).join('\n\n') + '\n\nEnviado desde el cuestionario de Custom Workflows de Empiric Labs.\n';
  const href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
  return { groups: collect(W, false), subject, text, href };
}
