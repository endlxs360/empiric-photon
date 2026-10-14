/* Legacy (framework-agnostic) behaviour module: ui. Started from src/legacy/start.js after React mounts. */

export function initUI() {
  (function () {
    function $(id) { return document.getElementById(id); }
    var T = function (s, v) { return window.EL.t(s, v); };

    /* ---- Animated <dialog> close: play the exit animation, then close (Esc, backdrop and X all use it) ---- */
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.UI = {
      closeDialog: function (dlg) {
        if (!dlg || !dlg.open) return;
        if (reduceMotion || dlg.hasAttribute('data-closing')) { dlg.removeAttribute('data-closing'); dlg.close(); return; }
        dlg.setAttribute('data-closing', '');
        var finished = false;
        function fin() { if (finished) return; finished = true; dlg.removeEventListener('animationend', onEnd); dlg.removeAttribute('data-closing'); if (dlg.open) { dlg.close(); } }
        function onEnd(e) { if (e.target === dlg) { fin(); } }
        dlg.addEventListener('animationend', onEnd);
        setTimeout(fin, 320);
      },
      bindDialog: function (dlg) {
        dlg.addEventListener('cancel', function (e) { e.preventDefault(); window.UI.closeDialog(dlg); });
        dlg.addEventListener('click', function (e) { if (e.target === dlg) { window.UI.closeDialog(dlg); } });
      }
    };

    /* ---- Soft squares: guarantee that every one of them holds an atom ---- */
    Array.prototype.forEach.call(document.querySelectorAll('.soft-square'), function (sq) {
      if (!sq.querySelector('svg.atom')) {
        sq.innerHTML = '<svg class="atom h-6 w-6" aria-hidden="true"><use href="#atom-icon"/></svg>';
      }
    });

    /* ---- Hamburger menu ---- */
    var hdr = document.querySelector('header');
    var btn = $('menu-btn'), menu = $('mobile-menu');
    var closeLang = function () {};

    function menuOpen() { return btn.getAttribute('aria-expanded') === 'true'; }
    function setMenu(open) {
      if (open) { menu.setAttribute('data-open', ''); } else { menu.removeAttribute('data-open'); }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', T(open ? 'Close menu' : 'Open menu'));
      if (open) { closeLang(); requestAnimationFrame(function () { var c = $('menu-close'); if (c) { c.focus({ preventScroll: true }); } }); }
    }
    if (btn && menu && hdr) {
      btn.addEventListener('click', function (e) { e.preventDefault(); setMenu(!menuOpen()); });
      menu.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('a')) { setMenu(false); }
      });
      document.addEventListener('click', function (e) {
        if (menuOpen() && !hdr.contains(e.target)) { setMenu(false); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuOpen()) { setMenu(false); btn.focus(); }
      });
      if (window.matchMedia) {
        var mq = window.matchMedia('(min-width: 1024px)');
        var onChange = function (e) { if (e.matches) { setMenu(false); } };
        if (mq.addEventListener) { mq.addEventListener('change', onChange); } else if (mq.addListener) { mq.addListener(onChange); }
      }
      menu.addEventListener('keydown', function (e) {          /* keep Tab inside the open menu */
        if (e.key !== 'Tab' || !menuOpen()) return;
        var f = Array.prototype.filter.call(menu.querySelectorAll('a[href],button'), function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      var mclose = $('menu-close');
      if (mclose) { mclose.addEventListener('click', function () { setMenu(false); btn.focus(); }); }
      document.addEventListener('langchange', function () { btn.setAttribute('aria-label', T(menuOpen() ? 'Close menu' : 'Open menu')); });
      setMenu(false);
    }

    /* ---- Language selector: the trigger always shows the flag of the active language ---- */
    var LANGS = { en: { name: 'English', flag: 'gb' }, es: { name: 'Español', flag: 'es' }, ja: { name: '日本語', flag: 'jp' } };
    var root = $('lang-root'), lb = $('lang-btn'), lm = $('lang-panel'), code = $('lang-code');
    var flagUse = document.querySelector('#lang-flag use');
    if (root && lb && lm) {
      var items = Array.prototype.slice.call(lm.querySelectorAll('[data-lang]'));
      var langOpen = function () { return lm.hasAttribute('data-open'); };
      var openLang = function (o) {
        if (o) { lm.setAttribute('data-open', ''); } else { lm.removeAttribute('data-open'); }
        lb.setAttribute('aria-expanded', String(o));
        if (o) {
          if (btn && menu && menuOpen()) { setMenu(false); }
          var cur = lm.querySelector('[aria-checked="true"]');
          if (cur) { cur.focus(); }
        }
      };
      closeLang = function () { openLang(false); };
      var refresh = function () {
        var l = window.EL.getLang(), info = LANGS[l] || LANGS.en;
        code.textContent = l.toUpperCase();
        if (flagUse) { flagUse.setAttribute('href', '#flag-' + info.flag); }
        lb.setAttribute('aria-label', T('Language') + ': ' + info.name);
        items.forEach(function (i) { i.setAttribute('aria-checked', i.getAttribute('data-lang') === l ? 'true' : 'false'); });
      };
      lb.addEventListener('click', function (e) { e.stopPropagation(); openLang(!langOpen()); });
      lm.addEventListener('click', function (e) {
        var b = e.target.closest('[data-lang]');
        if (!b) return;
        window.EL.setLang(b.getAttribute('data-lang'));
        openLang(false);
        lb.focus();
      });
      var lclose = $('lang-close');
      if (lclose) { lclose.addEventListener('click', function () { openLang(false); lb.focus(); }); }
      lm.addEventListener('keydown', function (e) {
        var i = items.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      });
      document.addEventListener('click', function (e) { if (!root.contains(e.target)) { openLang(false); } });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && langOpen()) { openLang(false); lb.focus(); }
      });
      document.addEventListener('langchange', refresh);
      refresh();
    }

    /* ---- Scroll progress bar + header state ---- */
    var bar = $('scroll-progress'), ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var de = document.documentElement, max = de.scrollHeight - de.clientHeight;
        if (bar) { bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, de.scrollTop / max) : 0) + ')'; }
        if (hdr) { hdr.classList.toggle('is-scrolled', de.scrollTop > 8); }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---- Cursor-reactive glow: one delegated listener lights the hairline/spotlight of whatever surface is under the pointer ---- */
    var GLOW = '.glass, .glass-fill, .bento, .post, .kit, .kpi, .ba, .btn-primary, .btn-secondary, .btn-ghost, .side-link, .seg-btn, .chip-btn, .pager-card, .lang-item';
    var glowQueued = false, glowEvt = null;
    document.addEventListener('pointermove', function (e) {
      glowEvt = e;
      if (glowQueued) return;
      glowQueued = true;
      requestAnimationFrame(function () {
        glowQueued = false;
        var t = glowEvt && glowEvt.target;
        if (!t || !t.closest) return;
        for (var el = t.closest(GLOW); el; el = el.parentElement ? el.parentElement.closest(GLOW) : null) {
          var r = el.getBoundingClientRect();
          el.style.setProperty('--mx', (glowEvt.clientX - r.left) + 'px');
          el.style.setProperty('--my', (glowEvt.clientY - r.top) + 'px');
        }
      });
    }, { passive: true });

    /* ---- Count-up numbers (replayed every time their page is shown) ---- */
    var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    function fmtCount(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, window.EL.getLang() === 'es' ? '.' : ','); }
    function runCount(el) {
      var end = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = fmtCount(end) + suf; return; }
      var t0 = performance.now(), dur = 1200;
      (function frame(now) {
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
        el.textContent = fmtCount(end * e) + suf;
        if (k < 1) { requestAnimationFrame(frame); }
      })(t0);
    }
    if (counters.length && 'IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !en.target.__counted) { en.target.__counted = true; runCount(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
      document.addEventListener('viewchange', function () {
        counters.forEach(function (el) { el.__counted = false; cio.observe(el); });
      });
    }

    /* ---- AdSense: set ADS_LIVE to true once Google approves the site and your ad blocks are in place.
            The visible placeholders disappear but the reserved space is kept. ---- */
    var ADS_LIVE = false;
    document.documentElement.classList.toggle('ads-live', ADS_LIVE);
  })();
  
}
