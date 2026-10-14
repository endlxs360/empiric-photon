import { GUMROAD_URL } from '../../config';

export default function Kits() {
  return (
    <section id="kits" data-view="kits" data-theme="cyan" className="relative isolate overflow-hidden">
      <div className="page-aurora page-aurora--r" aria-hidden="true"></div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div data-rv="" className="max-w-2xl">
          <h1 className="h-page">Ready-to-deploy kits</h1>
          <p className="lead mt-4">Packaged automations you get on Gumroad and run with your own data.</p>
          <span className="gum-pill">
            <svg className="gum-logo h-6 w-6" aria-hidden="true">
              <use href="#gumroad-logo" />
            </svg>
            Available on Gumroad
          </span>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <article data-rv="" data-theme="cyan" className="kit glass lg:col-span-7">
            <div className="kit-vis">
              <div className="mock" aria-hidden="true" data-no-i18n="">
                <div className="mv-bar">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span>episode_042.srt → script.docx</span>
                </div>
                <div className="mock-rows">
                  <div>
                    <em className="tg tg-cy">0–3 s</em>
                    <b>Hook</b>
                    <span>Most B2B teams still lose hours copying and pasting…</span>
                  </div>
                  <div>
                    <em className="tg tg-vi">3–10 s</em>
                    <b>Problem</b>
                    <span>Broken formatting costs more than the writing.</span>
                  </div>
                  <div>
                    <em className="tg tg-em">10–20 s</em>
                    <b>Solution</b>
                    <span>A master prompt structures the ideas; a script lays out…</span>
                  </div>
                  <div className="fade">
                    <em className="tg tg-am">20–27 s</em>
                    <b>Result</b>
                    <span>A script with a hook, three key points and a close…</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="kit-body">
              <div className="flex items-start justify-between gap-4">
                <span className="soft-square h-12 w-12">
                  <i data-lucide="scissors" className="h-6 w-6" aria-hidden="true"></i>
                </span>
                <span className="badge">
                  <i data-lucide="timer" className="h-3.5 w-3.5" aria-hidden="true"></i>
                  Under 2 min
                </span>
              </div>
              <h3 className="kit-t">ClipScript AI™</h3>
              <p className="kit-d">
                Repurpose videos, podcasts and transcripts into Shorts and Reels scripts and X threads.
              </p>
              <div className="flow-chips" aria-label="Input and output formats">
                <span className="fc fc-in" data-no-i18n="">.txt</span>
                <span className="fc fc-in" data-no-i18n="">.srt</span>
                <i data-lucide="arrow-right" className="h-4 w-4 text-cyan-neon" aria-hidden="true"></i>
                <span className="fc fc-out">Shorts</span>
                <span className="fc fc-out">Reels</span>
                <span className="fc fc-out">X thread</span>
              </div>
              <ul className="feat-list">
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Works from videos, podcasts or transcripts in .txt and .srt.</span>
                </li>
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Generates Shorts and Reels scripts with a hook and a close.</span>
                </li>
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Writes X threads ready to publish.</span>
                </li>
              </ul>
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary kit-cta inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold"
              >
                Get ClipScript AI™
                <i data-lucide="external-link" className="h-4 w-4" aria-hidden="true"></i>
              </a>
            </div>
          </article>
          <article data-rv="" data-theme="violet" className="kit glass lg:col-span-5">
            <div className="kit-vis">
              <div className="mock" aria-hidden="true" data-no-i18n="">
                <div className="mv-bar">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span>dossier_EST-0142.docx</span>
                </div>
                <div className="mock-doc">
                  <p className="mock-title">Luxury Penthouse in Mayfair, London</p>
                  <p className="mock-price">£8,950,000</p>
                  <dl>
                    <div>
                      <dt>Area</dt>
                      <dd>3,200 sq ft</dd>
                    </div>
                    <div>
                      <dt>Bedrooms</dt>
                      <dd>4</dd>
                    </div>
                    <div>
                      <dt>Terrace</dt>
                      <dd>650 sq ft</dd>
                    </div>
                    <div className="fade">
                      <dt>Parking</dt>
                      <dd>2 cars</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="kit-body">
              <div className="flex items-start justify-between gap-4">
                <span className="soft-square h-12 w-12">
                  <i data-lucide="building-2" className="h-6 w-6" aria-hidden="true"></i>
                </span>
                <span className="badge">
                  <i data-lucide="file-text" className="h-3.5 w-3.5" aria-hidden="true"></i>
                  .docx output
                </span>
              </div>
              <h3 className="kit-t">Estate Dossier AI™</h3>
              <p className="kit-d">
                Automatically generate luxury real estate dossiers from loose notes, from Mayfair to Tribeca.
              </p>
              <div className="flow-chips" aria-label="From loose notes to dossier">
                <span className="fc fc-in">Loose notes</span>
                <i data-lucide="arrow-right" className="h-4 w-4 text-[#B77DFF]" aria-hidden="true"></i>
                <span className="fc fc-out">Luxury dossier</span>
              </div>
              <ul className="feat-list">
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Turns viewing notes into an editorial property description.</span>
                </li>
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Lays out the dossier with a professional Word structure.</span>
                </li>
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Keeps a consistent premium tone across every listing.</span>
                </li>
              </ul>
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary kit-cta inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold"
              >
                Get Estate Dossier AI™
                <i data-lucide="external-link" className="h-4 w-4" aria-hidden="true"></i>
              </a>
            </div>
          </article>
          <article data-rv="" data-theme="neutral" className="kit kit--wide glass lg:col-span-12">
            <div className="kit-body">
              <span className="soft-square h-12 w-12">
                <i data-lucide="code-2" className="h-6 w-6" aria-hidden="true"></i>
              </span>
              <h3 className="kit-t">Custom B2B Workflows</h3>
              <p className="kit-d">
                Custom integrations built with Python and the Claude API, designed around your documents and the way your team works.
              </p>
              <ul className="feat-list">
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Python scripts connected to the Claude API.</span>
                </li>
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>.docx outputs with your company's corporate formatting.</span>
                </li>
                <li className="feat">
                  <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                    <use href="#atom-icon" />
                  </svg>
                  <span>Built for repetitive, high-volume B2B workflows.</span>
                </li>
              </ul>
              <div className="flow-chips" aria-label="Project types we cover" data-no-i18n="">
                <span className="fc fc-in">Content automation</span>
                <span className="fc fc-in">Web audit</span>
                <span className="fc fc-in">Lead capture</span>
                <span className="fc fc-in">API and n8n</span>
                <span className="fc fc-in">Documents</span>
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                Answer four short questions and we will reply with an indicative proposal.
              </p>
              <button
                type="button"
                data-wizard=""
                className="btn-ghost kit-cta inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold"
              >
                Enquire about a custom workflow
                <i data-lucide="arrow-right" className="h-4 w-4" aria-hidden="true"></i>
              </button>
            </div>
            <div className="kit-vis kit-vis--code">
              <div className="mock mock--code" aria-hidden="true" data-no-i18n="">
                <div className="mv-bar">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span>workflow.py</span>
                </div>
                <pre>
                  <span className="k">{"from"}</span>
                  {" docx "}
                  <span className="k">{"import"}</span>
                  {" Document\n\nreply = client.messages.create(model=MODEL, messages=msgs)\ndata  = json.loads(reply.content[0].text)\n\ndoc = Document("}
                  <span className="s">{"\"corporate_template.docx\""}</span>
                  {")\ndoc.add_heading(data["}
                  <span className="s">{"\"title\""}</span>
                  {"], "}
                  <span className="n">{"1"}</span>
                  {")\ndoc.save("}
                  <span className="s">{"\"report.docx\""}</span>
                  {")"}
                </pre>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
