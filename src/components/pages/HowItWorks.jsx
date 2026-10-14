export default function HowItWorks() {
  return (
    <section id="how-it-works" data-view="how-it-works" data-theme="cyan" className="relative isolate overflow-hidden">
      <div className="page-aurora" aria-hidden="true"></div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div data-rv="" className="max-w-2xl">
          <h1 className="h-page">The hidden cost of drafting by hand</h1>
          <p className="lead mt-4">
            Every report, dossier or script you start from scratch consumes hours your team could spend deciding, selling or creating.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <article data-rv="" data-theme="rose" className="glass card-pad lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="soft-square h-11 w-11">
                <svg className="atom h-6 w-6" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              <h3 className="card-t">The Traditional Method</h3>
            </div>
            <p className="card-s">Manual, slow and prone to broken formatting.</p>
            <ul className="mt-8 space-y-6">
              <li className="pain">
                <svg className="atom h-5 w-5" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
                <div>
                  <p className="pain-t">Copy-pasting between tools</p>
                  <p className="pain-d">Data, notes and drafts travel by hand from one app to another.</p>
                </div>
              </li>
              <li className="pain">
                <svg className="atom h-5 w-5" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
                <div>
                  <p className="pain-t">Slow, repetitive drafting</p>
                  <p className="pain-d">Every document starts from a blank page.</p>
                </div>
              </li>
              <li className="pain">
                <svg className="atom h-5 w-5" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
                <div>
                  <p className="pain-t">Broken formatting</p>
                  <p className="pain-d">Styles, tables and margins fall apart on every Word revision.</p>
                </div>
              </li>
              <li className="pain">
                <svg className="atom h-5 w-5" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
                <div>
                  <p className="pain-t">Inconsistent quality</p>
                  <p className="pain-d">
                    The output changes depending on who writes it and how much time they have.
                  </p>
                </div>
              </li>
            </ul>
          </article>
          <article data-rv="" data-theme="cyan" className="glass glass--lit card-pad lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="soft-square h-11 w-11">
                <svg className="atom h-6 w-6" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              <h3 className="card-t">The Empiric Labs Flow</h3>
            </div>
            <p className="card-s">Automated, fast and consistently formatted.</p>
            <ol className="pipe mt-9">
              <li className="pipe-node">
                <span className="soft-square h-12 w-12">
                  <svg className="atom h-7 w-7" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                </span>
                <p className="pipe-t">Ingest</p>
                <p className="pipe-d">Load notes, transcripts or raw data without preparing them first.</p>
              </li>
              <li className="pipe-link" aria-hidden="true">
                <span className="beam"></span>
              </li>
              <li className="pipe-node">
                <span className="soft-square h-12 w-12">
                  <svg className="atom h-7 w-7" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                </span>
                <p className="pipe-t">
                  Process
                  {" "}
                  <span className="chip-mono" data-no-i18n="">Prompt + Python</span>
                </p>
                <p className="pipe-d">
                  A Claude Master Prompt structures the content; Python validates and orders it.
                </p>
              </li>
              <li className="pipe-link" aria-hidden="true">
                <span className="beam beam--2"></span>
              </li>
              <li className="pipe-node">
                <span className="soft-square h-12 w-12">
                  <svg className="atom h-7 w-7" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                </span>
                <p className="pipe-t">Flawless .docx</p>
                <p className="pipe-d">The file comes out formatted, with consistent styles, ready to send.</p>
              </li>
            </ol>
            <p className="same-result">
              <i data-lucide="check-circle-2" className="h-4 w-4" aria-hidden="true"></i>
              Same result, every time.
            </p>
          </article>
          <div data-rv="" className="ba glass lg:col-span-12" aria-hidden="true" data-no-i18n="">
            <div className="ba-pane ba-raw">
              <div className="mv-bar">
                <i></i>
                <i></i>
                <i></i>
                <span>notes_final_v3 (copy).txt</span>
              </div>
              <p>client meeting - q3 numbers 412 388 521 !!</p>
              <p>fix table formatting??? headings broken</p>
              <p>todo: paste into word, rebuild styles</p>
              <p>revenue by month — copy from sheet again</p>
            </div>
            <div className="ba-arrow">
              <span className="ba-orb">
                <svg className="atom h-6 w-6" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              <span className="ba-line"></span>
            </div>
            <div className="ba-pane ba-doc">
              <div className="doc-mini">
                <b>Quarterly Revenue Report</b>
                <small>Northbridge Capital, Q3 2026</small>
                <span className="rule"></span>
                <i></i>
                <i></i>
                <i className="short"></i>
                <div className="bars">
                  <u style={{ height: "46%" }}></u>
                  <u style={{ height: "38%" }}></u>
                  <u style={{ height: "72%" }}></u>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
