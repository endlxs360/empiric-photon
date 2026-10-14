/* Legacy (framework-agnostic) behaviour module: wizard. Started from src/legacy/start.js after React mounts. */
import { CONTACT_EMAIL } from '../config.js';
import { TOOLS, METRICS, blank, volLabel, budLabel, buildBrief } from '../lib/wizard-brief.js';

export function initWizard() {
  (function () {
    var dlg = document.getElementById('wiz-dialog');
    if (!dlg) return;
    var MAIL = CONTACT_EMAIL, LS = 'el-wizard', TOTAL = 4;
    function $(id) { return document.getElementById(id); }
    var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

    var NAMES = ['Project', 'Details', 'Impact', 'Contact'];

    var W = blank();
    try {
      var raw = localStorage.getItem(LS);
      if (raw) { var o = JSON.parse(raw), b = blank(); Object.keys(b).forEach(function (k) { if (o && typeof o[k] === typeof b[k]) { W[k] = o[k]; } }); if (W.cur !== 'USD' && W.cur !== 'EUR') { W.cur = 'USD'; } W.consent = false; }
    } catch (e) { /* storage unavailable or corrupt */ }
    var saveT = null;
    function save() { clearTimeout(saveT); saveT = setTimeout(function () { try { localStorage.setItem(LS, JSON.stringify(W)); } catch (e) { /* ignore */ } }, 250); }
    function hasAnswers() { return !!(W.type || W.desc || W.tools.length || W.metrics.length || W.timeline || W.name || W.company || W.email); }

    /* ---------- chips ---------- */
    var toolsBox = $('wz-tools'), metBox = $('wz-metrics');
    function chip(label, pressed, custom) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip-btn'; b.textContent = label; b.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      if (custom) { b.setAttribute('data-custom', ''); b.title = 'Click to remove'; }
      return b;
    }
    function buildChips() {
      toolsBox.innerHTML = ''; metBox.innerHTML = '';
      TOOLS.forEach(function (t) { toolsBox.appendChild(chip(t, W.tools.indexOf(t) > -1)); });
      W.tools.filter(function (t) { return TOOLS.indexOf(t) < 0; }).forEach(function (t) { toolsBox.appendChild(chip(t, true, true)); });
      METRICS.forEach(function (m) { metBox.appendChild(chip(m, W.metrics.indexOf(m) > -1)); });
    }
    function readChips(box) { return Array.prototype.filter.call(box.children, function (c) { return c.getAttribute('aria-pressed') === 'true'; }).map(function (c) { return c.textContent; }); }
    toolsBox.addEventListener('click', function (e) {
      var c = e.target.closest('.chip-btn'); if (!c) return;
      if (c.hasAttribute('data-custom')) { c.remove(); } else { c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }
      read();
    });
    metBox.addEventListener('click', function (e) { var c = e.target.closest('.chip-btn'); if (!c) return; c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); read(); clearErr(); });
    function addTool() {
      var inp = $('wz-tool-add'), v = inp.value.replace(/\s+/g, ' ').trim();
      if (!v) return;
      var dup = Array.prototype.some.call(toolsBox.children, function (c) { return c.textContent.toLowerCase() === v.toLowerCase(); });
      if (dup) { Array.prototype.forEach.call(toolsBox.children, function (c) { if (c.textContent.toLowerCase() === v.toLowerCase()) { c.setAttribute('aria-pressed', 'true'); } }); }
      else if (toolsBox.querySelectorAll('[data-custom]').length < 6) { toolsBox.appendChild(chip(v, true, true)); }
      inp.value = ''; read();
    }
    $('wz-tool-btn').addEventListener('click', addTool);
    $('wz-tool-add').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); addTool(); } });

    /* ---------- description toolbar ---------- */
    var desc = $('wz-desc');
    document.querySelector('.wz-tb').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-tpl')) {
        var tpl = 'Trigger: \nSteps: \nOutput: \nExceptions: ', cur0 = desc.value.trim();
        desc.value = cur0 ? cur0 + '\n\n' + tpl : tpl;
        desc.focus(); var tp = cur0 ? cur0.length + 2 + 9 : 9; desc.setSelectionRange(tp, tp);
      } else {
        var ins = b.getAttribute('data-ins'), pos = desc.selectionStart, v = desc.value, pre = v.slice(0, pos), post = v.slice(desc.selectionEnd);
        var lead = pre && !/\n$/.test(pre) ? '\n' : '';
        desc.value = pre + lead + ins + post;
        var p = (pre + lead + ins).length; desc.focus(); desc.setSelectionRange(p, p);
      }
      read();
    });

    /* ---------- read DOM -> state, write state -> DOM ---------- */
    function checked(name) { var r = dlg.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ''; }
    function read() {
      W.type = checked('type'); W.other = $('wz-other').value; W.desc = desc.value;
      W.tools = readChips(toolsBox); W.vol = +$('wz-vol').value; W.freq = checked('freq') || 'ondemand';
      W.metrics = readChips(metBox); W.hours = +$('wz-hours').value; W.timeline = checked('timeline');
      W.bud = +$('wz-budget').value; W.unsure = $('wz-unsure').checked;
      W.name = $('wz-name').value; W.company = $('wz-company').value; W.email = $('wz-email').value; W.notes = $('wz-notes').value; W.consent = $('wz-consent').checked;
      ui(); save();
    }
    function write() {
      ['type', 'freq', 'timeline'].forEach(function (n) { Array.prototype.forEach.call(dlg.querySelectorAll('input[name="' + n + '"]'), function (r) { r.checked = r.value === W[n]; }); });
      $('wz-other').value = W.other; desc.value = W.desc; $('wz-vol').value = W.vol; $('wz-hours').value = W.hours; $('wz-budget').value = W.bud; $('wz-unsure').checked = W.unsure;
      $('wz-name').value = W.name; $('wz-company').value = W.company; $('wz-email').value = W.email; $('wz-notes').value = W.notes; $('wz-consent').checked = W.consent;
      buildChips(); ui();
    }
    function setRange(el, out, text) { var min = +el.min, max = +el.max; el.style.setProperty('--p', ((el.value - min) / (max - min) * 100) + '%'); out.textContent = text; }
    function ui() {
      $('wz-other-wrap').hidden = W.type !== 'other';
      $('wz-desc-n').textContent = desc.value.length + ' / 1200';
      setRange($('wz-vol'), $('wz-vol-out'), 'About ' + volLabel(W.vol));
      var h = W.hours;
      setRange($('wz-hours'), $('wz-hours-out'), h === 0 ? 'No target' : h + (h === 1 ? ' hour' : ' hours') + ' a week (about ' + (h * 4.33 / 8).toFixed(1).replace(/\.0$/, '') + ' working days a month)');
      var bud = $('wz-budget'); bud.classList.toggle('is-off', W.unsure);
      setRange(bud, $('wz-budget-out'), W.unsure ? 'Not sure yet' : budLabel(W, W.bud));
      $('wz-bud-min').textContent = budLabel(W, 0); $('wz-bud-max').textContent = budLabel(W, 4);
      Array.prototype.forEach.call(dlg.querySelectorAll('[data-wcur]'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-wcur') === W.cur ? 'true' : 'false'); });
      $('wz-reset').hidden = !hasAnswers();
    }
    $('wz-form').addEventListener('input', function (e) {
      if (e.target.id === 'wz-budget' && W.unsure) { $('wz-unsure').checked = false; }
      read(); if (e.target.getAttribute && e.target.getAttribute('aria-invalid')) { e.target.removeAttribute('aria-invalid'); }
      clearErr();
    });
    $('wz-form').addEventListener('change', function () { read(); clearErr(); });
    $('wz-unsure').addEventListener('change', function () { read(); });
    Array.prototype.forEach.call(dlg.querySelectorAll('[data-wcur]'), function (b) { b.addEventListener('click', function () { W.cur = b.getAttribute('data-wcur'); ui(); save(); }); });

    /* ---------- validation ---------- */
    function clearErr() { $('wz-err').textContent = ''; Array.prototype.forEach.call(dlg.querySelectorAll('[aria-invalid]'), function (x) { x.removeAttribute('aria-invalid'); }); }
    function fail(el, msg) { if (el && el.setAttribute) { el.setAttribute('aria-invalid', 'true'); } return { el: el, msg: msg }; }
    function validate(n) {
      var r = [];
      if (n === 1) {
        if (!W.type) { r.push(fail(dlg.querySelector('input[name="type"]'), 'Choose the area that fits your project best.')); }
        else if (W.type === 'other' && W.other.trim().length < 3) { r.push(fail($('wz-other'), 'Add a few words about the project.')); }
      } else if (n === 2) {
        if (W.desc.trim().length < 20) { r.push(fail(desc, 'Describe the flow in at least 20 characters.')); }
      } else if (n === 3) {
        if (!W.metrics.length) { r.push(fail(metBox.firstChild, 'Select at least one metric to improve.')); }
        else if (!W.timeline) { r.push(fail(dlg.querySelector('input[name="timeline"]'), 'Choose when you need it.')); }
      } else if (n === 4) {
        if (!W.name.trim()) { r.push(fail($('wz-name'), 'Enter your name.')); }
        else if (!W.company.trim()) { r.push(fail($('wz-company'), 'Enter your company or project.')); }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(W.email.trim())) { r.push(fail($('wz-email'), 'Enter a valid email address, for example name@company.com.')); }
        else if (!W.consent) { r.push(fail($('wz-consent'), 'Please accept the data protection notice to continue.')); }
      }
      return r;
    }

    /* ---------- navigation ---------- */
    var cur = 1, opener = null, sent = false, editFrom = false, sendT = null;
    function go(n, focus) {
      cur = n; if (n <= TOTAL && n > W.max) { W.max = n; } W.step = Math.min(n, TOTAL);
      Array.prototype.forEach.call(dlg.querySelectorAll('.wz-sec'), function (s) { s.hidden = +s.getAttribute('data-step') !== n; });
      var done = n > TOTAL, pos = Math.min(n, TOTAL);
      Array.prototype.forEach.call($('wz-steps').querySelectorAll('.wz-step'), function (b) {
        var i = +b.getAttribute('data-goto');
        b.setAttribute('data-s', done || i < pos ? 'done' : i === pos ? 'now' : 'todo');
        b.disabled = n === 6 || i > W.max; if (i === pos && !done) { b.setAttribute('aria-current', 'step'); } else { b.removeAttribute('aria-current'); }
        b.querySelector('.wz-dot').innerHTML = (done || i < pos) ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : String(i);
      });
      var pct = done ? 100 : Math.round(pos / TOTAL * 100);
      $('wz-bar-fill').style.width = pct + '%'; $('wz-bar').setAttribute('aria-valuenow', String(pct));
      $('wz-count').textContent = n === 6 ? 'Request prepared' : done ? 'All steps completed. Review your request.' : 'Step ' + pos + ' of ' + TOTAL + ': ' + NAMES[pos - 1];
      $('wz-foot').hidden = n === 6;
      $('wz-back').hidden = n === 1;
      $('wz-next').hidden = done;
      $('wz-send').hidden = n !== 5;
      $('wz-next').firstChild.nodeValue = editFrom ? 'Back to review' : n === TOTAL ? 'Review request' : 'Continue';
      clearErr();
      if (n === 5) { editFrom = false; renderSummary(); }
      var body = $('wz-form'); body.scrollTop = 0;
      if (focus !== false) { var h = dlg.querySelector('.wz-sec:not([hidden]) .wz-h'); if (h) { h.focus({ preventScroll: true }); } }
      if (!sent) { save(); }
    }
    function next() {
      read();
      var errs = validate(cur);
      if (errs.length) { $('wz-err').textContent = errs[0].msg; var el = errs[0].el; if (el && el.focus) { el.focus(); } return; }
      if (editFrom) { go(5); } else { go(cur + 1); }
    }
    $('wz-next').addEventListener('click', next);
    $('wz-back').addEventListener('click', function () { read(); go(cur > TOTAL ? TOTAL : cur - 1); });
    $('wz-steps').addEventListener('click', function (e) {
      var b = e.target.closest('.wz-step'); if (!b || b.disabled) return;
      var t = +b.getAttribute('data-goto');
      read();
      if (t > cur) { for (var s = cur; s < t; s++) { if (validate(s).length) { go(s); $('wz-err').textContent = validate(s)[0].msg; return; } } }
      go(t);
    });
    $('wz-form').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox' && e.target.type !== 'radio' && e.target.id !== 'wz-tool-add') { e.preventDefault(); if (cur <= TOTAL) { next(); } }
    });
    $('wz-form').addEventListener('submit', function (e) { e.preventDefault(); });
    var resetArmed = false, resetT = null;
    $('wz-reset').addEventListener('click', function () {
      var b = $('wz-reset');
      if (!resetArmed) { resetArmed = true; b.textContent = 'Click again to clear'; clearTimeout(resetT); resetT = setTimeout(function () { resetArmed = false; b.textContent = 'Start over'; }, 3500); return; }
      resetArmed = false; clearTimeout(resetT); b.textContent = 'Start over';
      W = blank(); sent = false; editFrom = false; try { localStorage.removeItem(LS); } catch (e) { /* ignore */ } write(); go(1);
    });

    /* ---------- summary + email ---------- */
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    var lastBrief = null;
    function renderSummary() {
      lastBrief = buildBrief(W);
      $('wz-sum').innerHTML = lastBrief.groups.map(function (g) {
        return '<section class="wz-grp"><header><h4>' + esc(g.title) + '</h4><button type="button" class="wz-link" data-edit="' + g.step + '">Edit</button></header><dl>' +
          g.rows.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl></section>';
      }).join('');
      $('wz-mail').innerHTML = '<p class="k">The email that will be prepared</p><dl><div><dt>To</dt><dd>' + esc(MAIL) + '</dd></div><div><dt>Subject</dt><dd>' + esc(lastBrief.subject) + '</dd></div></dl>' +
        '<details><summary>Preview the message text</summary><pre>' + esc(lastBrief.text) + '</pre></details>';
      $('wz-send').setAttribute('href', lastBrief.href); $('wz-send2').setAttribute('href', lastBrief.href);
      $('wz-ok').textContent = '';
      $('wz-note').textContent = lastBrief.href.length > 1900 ? 'This request is long, so some email apps may shorten it. If that happens, use Copy summary instead.' : 'Use Send request by email below. Your email app opens with the subject and message ready; press send there to finish.';
    }
    $('wz-sum').addEventListener('click', function (e) { var b = e.target.closest('[data-edit]'); if (!b) return; read(); editFrom = true; go(+b.getAttribute('data-edit')); });

    function legacyCopy(t) {
      var ta = document.createElement('textarea'), ok = false;
      ta.value = t; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      dlg.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      dlg.removeChild(ta); return ok;
    }
    function copyBrief(out) {
      var t = 'Para: ' + MAIL + '\nAsunto: ' + lastBrief.subject + '\n\n' + lastBrief.text;
      function done(ok) { out.textContent = ok ? 'Summary copied. Paste it into an email to ' + MAIL + '.' : 'Could not access the clipboard. Select the text in the preview and copy it manually.'; }
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(legacyCopy(t)); }); } else { done(legacyCopy(t)); }
    }
    $('wz-copy').addEventListener('click', function () { copyBrief($('wz-ok')); });
    $('wz-copy2').addEventListener('click', function () { copyBrief($('wz-ok2')); });

    /* sending: the mailto link opens the prepared email; then the success card is shown */
    function finish() {
      if (!lastBrief) { return; }
      sent = true; clearTimeout(saveT);
      try { localStorage.removeItem(LS); } catch (e) { /* ignore */ }
      var first = W.name.trim().split(/\s+/)[0];
      $('wz-ok-title').textContent = 'Thank you, ' + first + '!';
      $('wz-ok-text').textContent = 'Your Custom Workflow request for ' + W.company.trim() + ' is ready. If your email app opened, press send there to complete it.';
      $('wz-ok-email').textContent = W.email.trim();
      $('wz-ok2').textContent = '';
      go(6);
    }
    $('wz-send').addEventListener('click', function () { clearTimeout(sendT); sendT = setTimeout(finish, 450); });
    $('wz-done').addEventListener('click', function () { window.UI.closeDialog(dlg); });
    $('wz-new').addEventListener('click', function () { W = blank(); sent = false; editFrom = false; write(); go(1); });

    /* ---------- open / close ---------- */
    function openWiz(trigger) {
      if (typeof dlg.showModal !== 'function') { window.location.href = 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Custom workflow enquiry'); return; }
      opener = trigger || null; sent = false; editFrom = false;
      write();
      if (!dlg.open) { dlg.showModal(); }
      document.documentElement.classList.add('overflow-hidden');
      go(Math.min(Math.max(W.step || 1, 1), TOTAL), true);
    }
    window.openWizard = openWiz;
    $('wz-close').addEventListener('click', function () { if (!sent) { read(); } window.UI.closeDialog(dlg); });
    window.UI.bindDialog(dlg);
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('overflow-hidden');
      if (sent) { W = blank(); sent = false; editFrom = false; try { localStorage.removeItem(LS); } catch (e) { /* ignore */ } }
      if (opener && document.contains(opener)) { opener.focus(); }
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-wizard]') : null;
      if (t) { e.preventDefault(); openWiz(t); }
    });
  })();
  
}
