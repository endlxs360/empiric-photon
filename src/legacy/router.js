/* Legacy (framework-agnostic) behaviour module: router. Started from src/legacy/start.js after React mounts. */

export function initRouter() {
  /* Internal hash router: #/<page> shows one view at a time; #/<page>?doc=<name> also opens a document modal. */
  (function () {
    var ROUTES = ['home', 'how-it-works', 'kits', 'documents', 'playground', 'roi', 'blog'];
    var LABEL = { 'home': 'Home', 'how-it-works': 'How it works', 'kits': 'Kits', 'documents': 'Documents', 'playground': 'Playground', 'roi': 'ROI Calculator', 'blog': 'Blog' };
    var T = function (s, v) { return window.EL.t(s, v); };
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    var cur = null, curDoc = null, started = false;

    function parse() {
      var h = location.hash || '', view = 'home', doc = null, m = h.match(/^#\/([\w-]*)(?:\?(.*))?$/);
      if (m) {
        if (ROUTES.indexOf(m[1]) > -1) { view = m[1]; }
        var q = (m[2] || '').match(/(?:^|&)doc=([\w-]+)/);
        if (q) { doc = q[1]; }
      } else if (h.length > 1) {                       /* legacy links such as #kits or #privacy */
        var n = h.slice(1);
        if (ROUTES.indexOf(n) > -1) { view = n; } else if (document.getElementById('tpl-' + n)) { doc = n; view = cur || 'home'; }
      }
      return { view: view, doc: doc };
    }
    function hashFor(view, doc) { return '#/' + view + (doc ? '?doc=' + doc : ''); }

    function setDoc(name) {
      curDoc = name || null;
      var h = hashFor(cur || 'home', curDoc);
      if (location.hash !== h) { try { history.replaceState(null, '', h); } catch (e) { /* restricted environment */ } }
    }

    function updateNav() {
      Array.prototype.forEach.call(document.querySelectorAll('[data-route-link]'), function (a) {
        if (a.getAttribute('data-route-link') === cur) { a.setAttribute('aria-current', 'page'); } else { a.removeAttribute('aria-current'); }
      });
    }
    var ARROW_L = '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
    var ARROW_R = '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';
    function updatePager() {
      var box = document.getElementById('pager-inner');
      if (!box) return;
      var i = ROUTES.indexOf(cur), html = '';
      if (i > 0) {
        html += '<a href="#/' + ROUTES[i - 1] + '" class="pager-card glass flex items-center gap-4 rounded-2xl p-5">' + ARROW_L +
          '<span><span class="block text-xs text-[color:var(--muted)]">' + esc(T('Previous')) + '</span><span class="mt-0.5 block text-lg font-semibold text-white">' + esc(T(LABEL[ROUTES[i - 1]])) + '</span></span></a>';
      }
      if (i < ROUTES.length - 1) {
        html += '<a href="#/' + ROUTES[i + 1] + '" class="pager-card glass flex items-center justify-end gap-4 rounded-2xl p-5 text-right' + (i === 0 ? ' sm:col-start-2' : '') + '">' +
          '<span><span class="block text-xs text-[color:var(--muted)]">' + esc(T('Next')) + '</span><span class="mt-0.5 block text-lg font-semibold text-white">' + esc(T(LABEL[ROUTES[i + 1]])) + '</span></span>' + ARROW_R + '</a>';
      }
      box.innerHTML = html;
    }

    function show(view, user) {
      var changed = view !== cur;
      cur = view;
      document.documentElement.setAttribute('data-route', view);
      updateNav(); updatePager(); window.EL.meta();
      if (changed && started) {
        window.scrollTo(0, 0);
        if (window.RV) {
          window.RV.reset(Array.prototype.slice.call(document.querySelectorAll('[data-view="' + view + '"]')));
        }
        document.dispatchEvent(new CustomEvent('viewchange', { detail: { view: view } }));
      }
      if (changed && user) {
        var h = document.querySelector('[data-view="' + view + '"] h1');
        if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
        var ann = document.getElementById('route-announcer');
        if (ann) { ann.textContent = T('Page: {name}', { name: T(LABEL[view]) }); }
      }
    }

    function onHash() {
      var p = parse();
      show(p.view, true);
      if (p.doc !== curDoc) {
        curDoc = p.doc;
        document.dispatchEvent(new CustomEvent('routechange', { detail: { view: p.view, doc: p.doc } }));
      }
    }

    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target : null;
      var a = t && t.closest('a[href^="#/"]');
      if (a) {
        var m = a.getAttribute('href').match(/^#\/([\w-]*)$/);
        if (m && m[1] === cur && !curDoc) { e.preventDefault(); window.scrollTo(0, 0); }
        return;
      }
      if (t && t.closest('[data-scroll-top]')) { window.scrollTo(0, 0); return; }
      var skip = t && t.closest('[data-skip]');
      if (skip) { e.preventDefault(); var mn = document.getElementById('main'); if (mn) { mn.focus(); } }
    });
    document.addEventListener('langchange', function () { if (cur) { updatePager(); window.EL.meta(); } });

    window.RT = {
      routes: ROUTES,
      get view() { return cur; },
      label: function (v) { return LABEL[v] || v; },
      setDoc: setDoc,
      parse: parse,
      go: function (v) { location.hash = '#/' + v; },
      init: function () {
        var p = parse();
        show(p.view, false);
        started = true;
        window.addEventListener('hashchange', onHash);
        if (p.doc) { curDoc = p.doc; document.dispatchEvent(new CustomEvent('routechange', { detail: { view: p.view, doc: p.doc } })); }
      }
    };
  })();
  
}
