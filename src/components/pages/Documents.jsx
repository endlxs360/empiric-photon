import { CONTACT_EMAIL } from '../../config';

export default function Documents() {
  return (
    <section id="documents" data-view="documents" data-theme="violet" className="relative isolate">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div data-rv="" className="max-w-2xl">
          <h1 className="h-page">Documentation library</h1>
          <p className="lead mt-4">
            Guides, schemas, runbooks and sample outputs for every workflow. Search, filter, preview and export.
          </p>
        </div>
        <div id="dw" className="dw" data-no-i18n="">
          <aside id="dw-lib" className="dw-lib" aria-label="Document library">
            <button
              id="dw-toggle"
              type="button"
              className="dw-toggle"
              aria-expanded="false"
              aria-controls="dw-lib-body"
            >
              <span>
                <b>Library</b>
                <small id="dw-toggle-cur"></small>
              </span>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div id="dw-lib-body">
              <div className="dw-closebar">
                <span>Browse documents</span>
                <button type="button" id="dw-close" className="soft-square close-btn" aria-label="Close library">
                  <svg className="atom be-x" aria-hidden="true">
                    <use href="#be-x-icon" />
                  </svg>
                </button>
              </div>
              <div className="dw-pad">
                <div className="dw-search">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                  </svg>
                  <input
                    id="dw-q"
                    type="search"
                    placeholder="Search documents"
                    aria-label="Search documents"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <kbd aria-hidden="true">/</kbd>
                </div>
                <div id="dw-wf" className="dw-chips" role="group" aria-label="Filter by workflow"></div>
                <details id="dw-more" className="dw-more">
                  <summary>
                    <span>
                      More filters
                      {" "}
                      <span id="dw-fc" className="dw-fc" hidden></span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="dw-more-body">
                    <label>
                      Type
                      {" "}
                      <select id="dw-type" className="dw-sel"></select>
                    </label>
                    <label>
                      Status
                      {" "}
                      <select id="dw-status" className="dw-sel"></select>
                    </label>
                    <label>
                      Updated
                      {" "}
                      <select id="dw-date" className="dw-sel"></select>
                    </label>
                    <div className="dw-lbl">
                      <span id="dw-tags-l">Tags</span>
                      <div
                        id="dw-tags"
                        className="dw-chips"
                        style={{ marginTop: ".1rem" }}
                        role="group"
                        aria-labelledby="dw-tags-l"
                      >
                      </div>
                    </div>
                  </div>
                </details>
              </div>
              <div className="dw-bar">
                <span id="dw-count" role="status" aria-live="polite"></span>
                <button id="dw-clear" type="button" className="dw-clear" hidden>Clear filters</button>
              </div>
              <div id="dw-scroll" className="dw-scroll">
                <ul id="dw-tree" role="tree" aria-label="Documents"></ul>
                <ul id="dw-results" role="list" hidden></ul>
                <div id="dw-empty" className="dw-empty" hidden>
                  <span className="dw-empty-ico" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5M8.5 8.5l5 5M13.5 8.5l-5 5" />
                    </svg>
                  </span>
                  <b>No documents found</b>
                  <p id="dw-empty-msg"></p>
                  <button type="button" id="dw-reset" className="dw-reset">Reset search and filters</button>
                  <div className="dw-empty-try" id="dw-try"></div>
                </div>
              </div>
            </div>
          </aside>
          <article id="dv" className="dv" aria-label="Document">
            <div className="dv-skel" aria-hidden="true">
              <div className="sk sk--light" style={{ height: ".8rem", width: "34%" }}></div>
              <div className="sk sk--light" style={{ height: "2.2rem", width: "62%", marginTop: "1rem" }}></div>
              <div className="sk sk--light" style={{ height: "1rem", width: "80%", marginTop: "1rem" }}></div>
              <div className="sk sk--light" style={{ height: "1.5rem", width: "46%", marginTop: "1.25rem" }}></div>
              <div className="sk sk--light" style={{ height: "6.5rem", marginTop: "2rem" }}></div>
              <div className="sk sk--light" style={{ height: "1rem", width: "92%", marginTop: "1.5rem" }}></div>
              <div className="sk sk--light" style={{ height: "1rem", width: "84%", marginTop: ".7rem" }}></div>
              <div className="sk sk--light" style={{ height: "1rem", width: "90%", marginTop: ".7rem" }}></div>
              <div className="sk sk--light" style={{ height: "9rem", marginTop: "1.5rem", background: "#CBD3E4" }}></div>
            </div>
            <header id="dv-head" className="dv-head"></header>
            <div id="dv-body" className="dv-body"></div>
          </article>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-[color:var(--muted)]">
          Illustrative documentation with fictional data and brands. Statuses can be changed in the reader to try the workflow; they are only kept in this browser. The reader and library are in English. Questions about a document?
          {" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-no-i18n=""
            className="font-medium text-cyan-neon underline underline-offset-4 hover:text-white"
          >{CONTACT_EMAIL}</a>
        </p>
      </div>
    </section>
  );
}
