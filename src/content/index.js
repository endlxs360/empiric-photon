// Raw HTML content (legal notices, articles, A4 samples). Tokens {{CONTACT_EMAIL}}, {{GUMROAD_URL}} and {{X_URL}} are filled from src/config.js.
import sheetEstateCover from './sheets/estate-cover.html?raw';
import sheetEstateFact from './sheets/estate-fact.html?raw';
import sheetClipScript from './sheets/clip-script.html?raw';
import sheetClipThread from './sheets/clip-thread.html?raw';
import docTplPrivacy from './docs/tpl-privacy.html?raw';
import docTplCookies from './docs/tpl-cookies.html?raw';
import docTplLegalNotice from './docs/tpl-legal-notice.html?raw';
import docTplTerms from './docs/tpl-terms.html?raw';
import docTplContact from './docs/tpl-contact.html?raw';
import docTplArtPrompts from './docs/tpl-art-prompts.html?raw';
import docTplArtDocx from './docs/tpl-art-docx.html?raw';
import docTplArtCase from './docs/tpl-art-case.html?raw';
import docTplPrivacyEs from './docs/tpl-privacy-es.html?raw';
import docTplCookiesEs from './docs/tpl-cookies-es.html?raw';
import docTplLegalNoticeEs from './docs/tpl-legal-notice-es.html?raw';
import docTplTermsEs from './docs/tpl-terms-es.html?raw';
import docTplContactEs from './docs/tpl-contact-es.html?raw';
import docTplArtPromptsEs from './docs/tpl-art-prompts-es.html?raw';
import docTplArtDocxEs from './docs/tpl-art-docx-es.html?raw';
import docTplArtCaseEs from './docs/tpl-art-case-es.html?raw';

export const SHEETS = [
  { id: "estate-cover", product: "Estate Dossier AI™", cls: "estate", title: "Dossier cover and index", caption: "Editorial cover with an index, generated from raw viewing notes.", html: sheetEstateCover },
  { id: "estate-fact", product: "Estate Dossier AI™", cls: "estate", title: "Fact sheet and key features", caption: "Fact-sheet table and key features, with Word styles applied.", html: sheetEstateFact },
  { id: "clip-script", product: "ClipScript AI™", cls: "clip", title: "Shorts and Reels script", caption: "Timed script with visual cues, extracted from a conference .srt transcript.", html: sheetClipScript },
  { id: "clip-thread", product: "ClipScript AI™", cls: "clip", title: "X thread and publishing calendar", caption: "X thread within the character limit, with an index and a publishing calendar.", html: sheetClipThread },
];

export const DOC_TEMPLATES = [
  { id: "tpl-privacy", title: "Privacy Policy", html: docTplPrivacy },
  { id: "tpl-cookies", title: "Cookie Policy", html: docTplCookies },
  { id: "tpl-legal-notice", title: "Legal Notice", html: docTplLegalNotice },
  { id: "tpl-terms", title: "Terms of Service", html: docTplTerms },
  { id: "tpl-contact", title: "B2B Contact", html: docTplContact },
  { id: "tpl-art-prompts", title: "How to Structure Master Prompts in Claude for Structured Data Output", html: docTplArtPrompts },
  { id: "tpl-art-docx", title: "Automating Complex .docx Files with Python", html: docTplArtDocx },
  { id: "tpl-art-case", title: "Case Study: How We Saved a Consultancy 15 Hours a Week", html: docTplArtCase },
  { id: "tpl-privacy-es", title: "Política de Privacidad", html: docTplPrivacyEs },
  { id: "tpl-cookies-es", title: "Política de Cookies", html: docTplCookiesEs },
  { id: "tpl-legal-notice-es", title: "Aviso Legal", html: docTplLegalNoticeEs },
  { id: "tpl-terms-es", title: "Términos de Servicio", html: docTplTermsEs },
  { id: "tpl-contact-es", title: "Contacto B2B", html: docTplContactEs },
  { id: "tpl-art-prompts-es", title: "Cómo estructurar Master Prompts en Claude para salida de datos estructurada", html: docTplArtPromptsEs },
  { id: "tpl-art-docx-es", title: "Automatización de archivos .docx complejos usando Python", html: docTplArtDocxEs },
  { id: "tpl-art-case-es", title: "Casos de estudio: Cómo ahorramos 15 horas semanales a una consultora", html: docTplArtCaseEs },
];
