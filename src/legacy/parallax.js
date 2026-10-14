/* Legacy (framework-agnostic) behaviour module: parallax. Started from src/legacy/start.js after React mounts. */

export function initParallax() {
  (function () {
    var fx = document.getElementById('bg-fx'), root = document.documentElement;
    if (!fx || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var q = 0, x = 0, y = 0;
      addEventListener('pointermove', function (e) {
        x = e.clientX / innerWidth - .5; y = e.clientY / innerHeight - .5;
        if (q) return;
        q = requestAnimationFrame(function () { q = 0; fx.style.setProperty('--px', x.toFixed(3)); fx.style.setProperty('--py', y.toFixed(3)); });
      }, { passive: true });
    }
    function sync() {
      var off = document.hidden || root.classList.contains('overflow-hidden');
      if (root.classList.contains('fx-paused') !== off) { root.classList.toggle('fx-paused', off); }
    }
    document.addEventListener('visibilitychange', sync);
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['class'] });
  })();
  
}
