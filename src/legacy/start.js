import './lucide.js';
import { initI18n } from './i18n.js';
import { initUI } from './ui.js';
import { initDocDialog } from './doc-dialog.js';
import { initDocs } from './docs.js';
import { initPlayground } from './playground.js';
import { initRoi } from './roi.js';
import { initRouter } from './router.js';
import { initReveal } from './reveal.js';
import { initBackground } from './bgfx.js';
import { initParallax } from './parallax.js';
import { initWizard } from './wizard.js';
import { initSkeleton } from './skeleton.js';

let started = false;

// Starts every behaviour module once, in dependency order, after React has rendered the markup.
export function startLegacy() {
  if (started) return;
  started = true;

  initI18n();        // window.EL (translations)
  initUI();          // menu, language selector, scroll progress, glow, counters; window.UI
  initDocDialog();   // legal / article modals
  initDocs();        // documentation workspace
  initPlayground();  // live playground simulation
  initRoi();         // ROI calculator
  initRouter();      // window.RT (hash router)
  initReveal();      // window.RV (scroll reveal)
  initBackground();  // photon canvas (window.BGFX)
  initParallax();    // background depth parallax + pause
  initWizard();      // Custom Workflow questionnaire
  initSkeleton();    // section-switch skeleton

  if (window.lucide) window.lucide.createIcons();
  window.EL.init();
  if (window.RT) window.RT.init();

  // Reveal the page once fonts and styles are ready (no flash of unstyled or untranslated content).
  const go = () => requestAnimationFrame(() => requestAnimationFrame(window.__markReady));
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(go);
  } else {
    go();
  }
}
