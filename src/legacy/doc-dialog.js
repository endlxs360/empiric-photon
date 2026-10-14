/* Legacy (framework-agnostic) behaviour module: doc-dialog. Started from src/legacy/start.js after React mounts. */
import { CONTACT_EMAIL } from '../config.js';

export function initDocDialog() {
  (function () {
    /* ============ CONFIG ============ */
  

    var dlg = document.getElementById('doc-dialog');
    if (!dlg) return;
    var T = function (s, v) { return window.EL.t(s, v); };
    var titleEl = document.getElementById('doc-title');
    var bodyEl = document.getElementById('doc-body');
    var closeBtn = document.getElementById('doc-close');
    var lastTrigger = null, current = null;
    var DOC_THEME = { 'art-prompts': 'cyan', 'art-docx': 'violet', 'art-case': 'emerald' };

    function findTpl(name) {
      var l = window.EL.getLang();
      var loc = l !== 'en' ? document.getElementById('tpl-' + name + '-' + l) : null;
      return loc || document.getElementById('tpl-' + name);   /* languages without a long-form translation fall back to English */
    }

    function openDoc(name, trigger) {
      var tpl = findTpl(name);
      if (!tpl || typeof dlg.showModal !== 'function') return false;
      titleEl.textContent = tpl.getAttribute('data-title') || '';
      bodyEl.innerHTML = '';
      bodyEl.appendChild(tpl.content.cloneNode(true));
      bodyEl.scrollTop = 0;
      Array.prototype.forEach.call(bodyEl.querySelectorAll('[data-email]'), function (a) {
        a.textContent = CONTACT_EMAIL;
        a.setAttribute('href', 'mailto:' + CONTACT_EMAIL);
      });
      if (window.lucide) { window.lucide.createIcons(); }
      if (trigger && !dlg.contains(trigger)) { lastTrigger = trigger; }
      if (!dlg.open) { dlg.showModal(); }
      document.documentElement.classList.add('overflow-hidden');
      current = name;
      dlg.setAttribute('data-theme', DOC_THEME[name] || 'cyan');
      if (window.RT) { window.RT.setDoc(name); }
      return true;
    }

    function onClose() {
      document.documentElement.classList.remove('overflow-hidden');
      if (current && window.RT) { window.RT.setDoc(null); }
      current = null;
      if (lastTrigger && document.contains(lastTrigger)) { lastTrigger.focus(); }
    }

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('[data-doc]') : null;
      if (!a) return;
      e.preventDefault();
      openDoc(a.getAttribute('data-doc'), a);
    });
    closeBtn.addEventListener('click', function () { window.UI.closeDialog(dlg); });
    window.UI.bindDialog(dlg);
    dlg.addEventListener('close', onClose);

    /* Router events: a deep link (#/blog?doc=art-prompts) or the Back button open / close the modal */
    document.addEventListener('routechange', function (e) {
      var d = e.detail && e.detail.doc;
      if (d && d !== current && findTpl(d)) { openDoc(d, null); }
      else if (!d && dlg.open) { window.UI.closeDialog(dlg); }
    });
    document.addEventListener('langchange', function () {
      if (dlg.open && current) { openDoc(current, null); }
    });

    /* B2B contact form: opens the visitor's email client with the enquiry prepared */
    bodyEl.addEventListener('submit', function (e) {
      var f = e.target;
      if (!f.matches || !f.matches('[data-contact]')) return;
      e.preventDefault();
      var d = new FormData(f);
      var nombre = d.get('nombre') || '';
      var empresa = d.get('empresa') || '';
      var interes = d.get('interes') || '';
      var asunto = T('B2B enquiry: {company} ({interest})', { company: empresa || nombre, interest: interes || '-' });
      var cuerpo = T('Company') + ': ' + empresa + '\n' + T('Job title') + ': ' + (d.get('cargo') || '-') + '\n' +
        T('Interest') + ': ' + interes + '\n' + T('Estimated volume') + ': ' + (d.get('volumen') || '') + '\n\n' +
        (d.get('mensaje') || '') + '\n\n' + nombre + ' (' + (d.get('email') || '') + ')';
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
      var ok = f.querySelector('[data-sent]');
      if (ok) { ok.classList.remove('hidden'); }
    });
  })();
  
}
