/* Legacy (framework-agnostic) behaviour module: reveal. Started from src/legacy/start.js after React mounts. */

export function initReveal() {
  (function () {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-rv]'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.__revealOK = true;
    if (!('IntersectionObserver' in window) || reduce || !els.length) {
      els.forEach(function (el) { el.classList.add('is-in', 'rv-done'); });
      return;
    }
    var STEP = 90, MAX_STEPS = 6, SETTLE = 1000;

    function stagger(list) {
      var g = new Map();
      list.forEach(function (el) {
        var p = el.parentElement, i = g.get(p) || 0;
        g.set(p, i + 1);
        el.style.setProperty('--rv-delay', (Math.min(i, MAX_STEPS) * STEP) + 'ms');
      });
    }
    function settle(el) {            /* after the entrance finishes: no delay on hover transitions, release the GPU layer */
      var d = parseInt(el.style.getPropertyValue('--rv-delay'), 10) || 0;
      clearTimeout(el.__rvT);
      el.__rvT = setTimeout(function () { el.style.setProperty('--rv-delay', '0ms'); el.classList.add('rv-done'); }, d + SETTLE);
    }

    /* threshold 0 + a bottom margin: an element reveals as soon as its top edge enters, however tall it is */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        el.classList.add('is-in');
        io.unobserve(el);
        settle(el);
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

    stagger(els);
    var started = false;
    function start() {
      if (started) return;
      started = true;
      els.forEach(function (el) { io.observe(el); });
    }
    /* wait until fonts + Tailwind are ready, so the entrance is never played behind a hidden page */
    if (document.documentElement.classList.contains('is-ready')) { start(); }
    else { document.addEventListener('elready', start, { once: true }); }

    /* Replay the entrance when a view is shown again (used by the router) */
    window.RV = {
      reset: function (roots) {
        var list = [];
        roots.forEach(function (root) {
          Array.prototype.forEach.call(root.querySelectorAll('[data-rv]'), function (el) { list.push(el); });
        });
        stagger(list);
        list.forEach(function (el) {
          clearTimeout(el.__rvT);
          el.classList.remove('is-in', 'rv-done');
          io.observe(el);
        });
      }
    };
  })();
  
}
