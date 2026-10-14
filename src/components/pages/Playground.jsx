import { GUMROAD_URL } from '../../config';

export default function Playground() {
  return (
    <section
      id="playground"
      data-view="playground"
      data-theme="violet"
      className="relative isolate overflow-hidden border-t border-white/[0.07]"
    >
      <div
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[420px] w-[420px] rounded-full bg-violet-neon/[0.12] blur-[130px]"
        aria-hidden="true"
      >
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div data-rv="" className="max-w-2xl">
          <h1 className="h-page">Live Playground: try it with your own text</h1>
          <p className="lead mt-4">
            Pick a use case, edit the draft and run the pipeline. This is a simulation that runs in your browser: nothing is sent to a server and Claude is not called.
          </p>
        </div>
        <div data-rv="" role="tablist" aria-label="Playground use cases" className="mt-10 grid gap-3 sm:grid-cols-2">
          <button
            id="pg-tab-clip"
            type="button"
            role="tab"
            aria-selected="true"
            aria-controls="pg-panel"
            data-case="clip"
            tabIndex="0"
            data-theme="cyan"
            className="pg-tab flex items-center gap-4 rounded-xl p-4 text-left"
            style={{ "--accent": "0, 242, 254" }}
          >
            <span className="soft-square h-11 w-11">
              <svg className="atom h-6 w-6" aria-hidden="true">
                <use href="#atom-icon" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-white">ClipScript AI™</span>
              <span className="block text-sm text-[color:var(--muted)]">{"(Video/Podcast → X & Reels Scripts)"}</span>
            </span>
          </button>
          <button
            id="pg-tab-estate"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="pg-panel"
            data-case="estate"
            tabIndex="-1"
            data-theme="violet"
            className="pg-tab flex items-center gap-4 rounded-xl p-4 text-left"
            style={{ "--accent": "127, 0, 255" }}
          >
            <span className="soft-square h-11 w-11">
              <svg className="atom h-6 w-6" aria-hidden="true">
                <use href="#atom-icon" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-white">Estate Dossier AI™</span>
              <span className="block text-sm text-[color:var(--muted)]">(Viewing Notes → .docx Dossier)</span>
            </span>
          </button>
        </div>
        <div id="pg-panel" role="tabpanel" aria-labelledby="pg-tab-clip" className="mt-6 grid gap-6 lg:grid-cols-2">
          <div data-rv="" className="glass flex min-w-0 flex-col overflow-hidden rounded-2xl">
            <div className="win-head flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
              <label id="pg-input-label" htmlFor="pg-input" className="text-sm font-medium text-white">Input: raw transcript</label>
              <span
                id="pg-format"
                className="rounded-md border border-white/10 bg-ink px-2 py-0.5 font-mono text-[11px] text-slate-300"
                data-no-i18n=""
              >.srt</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] bg-ink/40 px-4 py-2.5">
              <span className="text-xs text-[color:var(--muted)]">Load example:</span>
              <span id="pg-presets" className="flex min-h-[1.75rem] flex-wrap gap-1.5"></span>
            </div>
            <textarea
              id="pg-input"
              rows="13"
              spellCheck="false"
              autoComplete="off"
              className="min-h-[18rem] w-full resize-y bg-ink p-4 font-mono text-[13px] leading-relaxed text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-neon/60"
              placeholder="Paste your text here"
            >
            </textarea>
            <div
              className="flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-2.5 text-xs text-[color:var(--muted)]"
            >
              <span id="pg-count">0 words</span>
              <button
                id="pg-reset"
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:text-white"
              >
                <i data-lucide="rotate-ccw" className="h-3.5 w-3.5" aria-hidden="true"></i>
                Restore example
              </button>
            </div>
            <div className="border-t border-white/[0.08] p-4 sm:p-5">
              <button
                id="pg-run"
                type="button"
                className="btn-primary inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i data-lucide="play" className="h-4 w-4" aria-hidden="true"></i>
                <span id="pg-run-label">Run Python + Claude Pipeline</span>
              </button>
              <p id="pg-error" role="alert" className="mt-3 hidden text-sm text-rose-300"></p>
              <div className="mt-5" aria-label="Pipeline status">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span id="pg-stage" role="status" aria-live="polite" className="text-[color:var(--muted)]">Ready to run</span>
                  <span id="pg-pct" className="shrink-0 font-mono text-cyan-neon" data-no-i18n="">0%</span>
                </div>
                <div
                  id="pg-bar"
                  className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]"
                  role="progressbar"
                  aria-label="Pipeline progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow="0"
                >
                  <div
                    id="pg-bar-fill"
                    className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon"
                    style={{ width: "0%" }}
                  >
                  </div>
                </div>
                <ol className="mt-4 space-y-3">
                  <li className="pg-step" data-state="pending">
                    <span className="pg-dot">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="pg-name block font-mono text-[13px] text-slate-200" data-no-i18n="">[1/3] Parsing TXT/SRT</span>
                      <span className="pg-detail block text-xs text-[color:var(--muted)]"></span>
                    </span>
                  </li>
                  <li className="pg-step" data-state="pending">
                    <span className="pg-dot">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="pg-name block font-mono text-[13px] text-slate-200" data-no-i18n="">[2/3] Executing Claude Master Prompt</span>
                      <span className="pg-detail block text-xs text-[color:var(--muted)]"></span>
                    </span>
                  </li>
                  <li className="pg-step" data-state="pending">
                    <span className="pg-dot">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="pg-name block font-mono text-[13px] text-slate-200" data-no-i18n="">[3/3] Generating .docx Layout</span>
                      <span className="pg-detail block text-xs text-[color:var(--muted)]"></span>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div data-rv="" className="glass flex min-w-0 flex-col overflow-hidden rounded-2xl">
            <div
              className="win-head flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3"
            >
              <p className="text-sm font-medium text-white">Structured output</p>
              <div
                role="group"
                aria-label="Output view"
                className="inline-flex rounded-lg border border-white/10 bg-ink p-0.5 text-xs"
              >
                <button
                  type="button"
                  data-pgview="doc"
                  aria-pressed="true"
                  className="pg-view rounded-md px-3 py-1.5 font-medium transition-colors"
                >Document</button>
                <button
                  type="button"
                  data-pgview="json"
                  aria-pressed="false"
                  className="pg-view rounded-md px-3 py-1.5 font-medium transition-colors"
                  data-no-i18n=""
                >JSON</button>
              </div>
            </div>
            <div id="pg-out" className="relative min-h-[28rem] flex-1 overflow-auto p-4 sm:p-5">
              <div
                id="pg-empty"
                className="grid h-full min-h-[24rem] place-items-center rounded-lg border border-dashed border-white/15 px-6 text-center"
              >
                <div>
                  <i data-lucide="file-text" className="mx-auto h-8 w-8 text-slate-500" aria-hidden="true"></i>
                  <p id="pg-empty-text" className="mt-3 max-w-[32ch] text-sm leading-relaxed text-[color:var(--muted)]"></p>
                </div>
              </div>
              <div id="pg-doc" className="hidden"></div>
              <pre
                id="pg-json"
                data-no-i18n=""
                className="m-0 hidden overflow-x-auto rounded-lg border border-white/[0.08] bg-[#070A12] p-4 font-mono text-[12.5px] leading-relaxed text-slate-300"
                tabIndex="0"
                aria-label="Output in JSON format"
              >
              </pre>
            </div>
            <div className="border-t border-white/[0.08] p-4 sm:p-5">
              <button
                id="pg-dl"
                type="button"
                disabled
                className="btn-secondary inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i data-lucide="download" className="h-4 w-4" aria-hidden="true"></i>
                <span id="pg-dl-label">Download structured .docx template</span>
              </button>
              <p id="pg-dl-msg" role="status" className="mt-3 hidden text-sm leading-relaxed text-emerald-300"></p>
              <p className="mt-3 text-xs leading-relaxed text-[color:var(--muted)]">
                Local simulation with simple rules. The real kits use Claude and Python for a complete result.
                {" "}
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cyan-neon underline underline-offset-4 hover:text-white"
                >Get them on Gumroad</a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
