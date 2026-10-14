export default function DocDialog() {
  return (
    <dialog
      id="doc-dialog"
      data-theme="cyan"
      aria-labelledby="doc-title"
      className="m-auto w-[min(94vw,46rem)] rounded-2xl border border-white/10 bg-surface p-0 text-[color:var(--text)] shadow-2xl shadow-black/60"
    >
      <div className="flex max-h-[86vh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-7">
          <h2 id="doc-title" className="text-lg font-semibold leading-snug text-white sm:text-xl"></h2>
          <button
            id="doc-close"
            type="button"
            aria-label="Close window"
            className="soft-square close-btn h-9 w-9 shrink-0"
          >
            <svg className="atom be-x h-5 w-5" aria-hidden="true">
              <use href="#be-x-icon" />
            </svg>
          </button>
        </div>
        <div id="doc-body" className="legal overflow-y-auto px-5 py-6 sm:px-7 sm:py-7"></div>
      </div>
    </dialog>
  );
}
