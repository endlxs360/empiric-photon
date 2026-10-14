/* Legacy (framework-agnostic) behaviour module: skeleton. Started from src/legacy/start.js after React mounts. */

export function initSkeleton() {
  /* Skeleton while a section is switched: the new view is revealed once the placeholder has been shown briefly */
  (function () {
    var root = document.documentElement, main = document.getElementById('main'), t = null, t2 = null;
    if (!main || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    document.addEventListener('viewchange', function () {
      root.classList.add('is-switching'); main.setAttribute('aria-busy', 'true');
      clearTimeout(t); clearTimeout(t2);
      t = setTimeout(function () {
        root.classList.remove('is-switching'); main.removeAttribute('aria-busy'); root.classList.add('view-in');
        window.dispatchEvent(new Event('resize'));       /* views measured while hidden refit (charts, A4 samples) */
        t2 = setTimeout(function () { root.classList.remove('view-in'); }, 420);
      }, 320);
    });
  })();
  
}
