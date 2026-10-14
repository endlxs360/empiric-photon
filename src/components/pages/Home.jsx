import HeroCard from '../HeroCard';
import { CONTACT_EMAIL, GUMROAD_URL } from '../../config';

export default function Home() {
  return (
    <>
      <section id="home" data-view="home" data-theme="cyan" className="relative isolate overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
        <div
          className="pointer-events-none absolute -left-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-neon/[0.10] blur-[120px]"
          aria-hidden="true"
        >
        </div>
        <div
          className="pointer-events-none absolute -right-32 top-40 -z-10 h-[460px] w-[460px] rounded-full bg-violet-neon/[0.18] blur-[130px]"
          aria-hidden="true"
        >
        </div>
        <div className="hero-atom" aria-hidden="true">
          <svg viewBox="0 0 400 400" focusable="false">
            <defs>
              <radialGradient id="hgCore" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#9BFAFF" />
                <stop offset=".35" stopColor="#00F2FE" />
                <stop offset="1" stopColor="#7F00FF" />
              </radialGradient>
              <radialGradient id="hgHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#00F2FE" stopOpacity=".45" />
                <stop offset=".5" stopColor="#7F00FF" stopOpacity=".18" />
                <stop offset="1" stopColor="#7F00FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="none" stroke="#00F2FE" strokeOpacity=".08" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#7F00FF" strokeOpacity=".22" strokeDasharray="2 7" />
            <ellipse
              cx="200"
              cy="200"
              rx="120"
              ry="52"
              fill="none"
              stroke="#00F2FE"
              strokeOpacity=".5"
              strokeWidth="1.4"
              transform="rotate(-28 200 200)"
            />
            <circle cx="200" cy="200" r="70" fill="url(#hgHalo)" />
            <circle cx="200" cy="200" r="14" fill="url(#hgCore)" />
          </svg>
          <div className="hero-orbit">
            <span className="ox">
              <span className="oy">
                <i className="electron"></i>
              </span>
            </span>
          </div>
        </div>
        <div
          className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24"
        >
          <div className="lg:col-span-7">
            <p data-rv="" className="pill">
              <svg className="atom h-4 w-4" aria-hidden="true">
                <use href="#atom-icon" />
              </svg>
              {" "}
              Claude Master Prompts + Python automation
            </p>
            <h1 data-rv="" className="h-hero mt-7 max-w-3xl">From Raw Data to Corporate Documents in Seconds.</h1>
            <p data-rv="" className="lead lead--lg mt-6">
              We automate complex B2B workflows by combining Claude Master Prompts with Python scripts. Generate .docx files and perfectly formatted content with zero manual effort.
            </p>
            <div data-rv="" className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold"
              >
                Explore Kits on Gumroad
                {" "}
                <i data-lucide="external-link" className="h-4 w-4" aria-hidden="true"></i>
              </a>
              <a
                href="#/playground"
                className="btn-secondary inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold"
              >
                <i data-lucide="play-circle" className="h-5 w-5 text-[#B77DFF]" aria-hidden="true"></i>
                {" "}
                View ClipScript AI Demo
              </a>
            </div>
            <ul data-rv="" className="stat-strip mt-14 max-w-2xl" aria-label="Key results">
              <li className="stat">
                <i data-lucide="zap" className="stat-i" aria-hidden="true"></i>
                <span className="stat-n">
                  <span data-count="85" data-suffix="%">85%</span>
                </span>
                <span className="stat-l">less drafting time</span>
              </li>
              <li className="stat">
                <i data-lucide="file-text" className="stat-i" aria-hidden="true"></i>
                <span className="stat-n">
                  <span data-count="10000" data-suffix="+">10,000+</span>
                </span>
                <span className="stat-l">documents generated</span>
              </li>
              <li className="stat">
                <i data-lucide="bot" className="stat-i" aria-hidden="true"></i>
                <span className="stat-n">
                  <span data-count="100" data-suffix="%">100%</span>
                </span>
                <span className="stat-l">automated</span>
              </li>
            </ul>
          </div>
          <HeroCard />
        </div>
      </section>
      <section id="home-explore" data-view="home" data-theme="cyan" className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-32">
          <div data-rv="" className="max-w-2xl">
            <h2 className="h-sec">Explore the platform</h2>
            <p className="lead mt-4">
              Everything you need to go from raw data to finished documents, organised in focused pages.
            </p>
          </div>
          <ul role="list" className="bento-grid mt-12">
            <li data-rv="" className="b-play">
              <a href="#/playground" data-theme="violet" className="bento group">
                <div className="bento-vis" aria-hidden="true" data-no-i18n="">
                  <div className="mv-win">
                    <div className="mv-bar">
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>keynote_ny.srt</span>
                    </div>
                    <div className="mv-split">
                      <div className="mv-col mv-raw">
                        <span>so what i wanted to share today is that most b2b teams</span>
                        <span>still lose hours copying and pasting information</span>
                        <span>between tools. and the real cost is not just the time:</span>
                        <span>the document formatting breaks and somebody has to</span>
                        <span>rebuild it from scratch…</span>
                      </div>
                      <div className="mv-run">
                        <b>Run</b>
                      </div>
                      <div className="mv-col mv-out">
                        <em className="tg tg-cy">hook</em>
                        <span>Most B2B teams still lose hours copying and pasting.</span>
                        <em className="tg tg-vi">key points</em>
                        <span>Broken formatting costs more than the writing.</span>
                        <em className="tg tg-em">x thread</em>
                        <span>1/5 Most B2B teams still lose hours…</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bento-txt">
                  <div className="flex items-center gap-3">
                    <span className="soft-square h-9 w-9">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                    </span>
                    <h3 className="bento-title">Playground</h3>
                  </div>
                  <p className="bento-desc">Run the pipeline on your own text, right in your browser.</p>
                  <span className="bento-cta">
                    Open page
                    <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </li>
            <li data-rv="" className="b-kits">
              <a href="#/kits" data-theme="cyan" className="bento group">
                <div className="bento-vis" aria-hidden="true" data-no-i18n="">
                  <div className="mv-stack">
                    <div className="mv-chip">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                      <span>ClipScript AI™</span>
                      <small>.srt → Shorts, Reels, X</small>
                    </div>
                    <div className="mv-chip mv-chip--vi">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                      <span>Estate Dossier AI™</span>
                      <small>notes → .docx</small>
                    </div>
                    <div className="mv-chip mv-chip--ne">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                      <span>Custom B2B Workflows</span>
                      <small>Python + Claude API</small>
                    </div>
                  </div>
                </div>
                <div className="bento-txt">
                  <div className="flex items-center gap-3">
                    <span className="soft-square h-9 w-9">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                    </span>
                    <h3 className="bento-title">Kits</h3>
                  </div>
                  <p className="bento-desc">
                    ClipScript AI™, Estate Dossier AI™ and custom B2B workflows, ready to deploy.
                  </p>
                  <span className="bento-cta">
                    Open page
                    <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </li>
            <li data-rv="" className="b-roi">
              <a href="#/roi" data-theme="cyan" className="bento group">
                <div className="bento-vis" aria-hidden="true" data-no-i18n="">
                  <div className="mv-roi">
                    <div>
                      <small>ROI</small>
                      <b>264%</b>
                      <small>Break-even 3.5 mo</small>
                    </div>
                    <svg viewBox="0 0 220 80" className="mv-spark" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="mvSpk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#00F2FE" stopOpacity=".45" />
                          <stop offset="1" stopColor="#00F2FE" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 70 L20 66 L40 58 L60 47 L80 36 L100 28 L120 21 L140 15 L160 11 L190 7 L220 4 L220 80 L0 80 Z"
                        fill="url(#mvSpk)"
                      />
                      <path
                        d="M0 70 L20 66 L40 58 L60 47 L80 36 L100 28 L120 21 L140 15 L160 11 L190 7 L220 4"
                        fill="none"
                        stroke="#00F2FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="60" cy="47" r="4" fill="#FCD34D" stroke="#04060B" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="bento-txt">
                  <div className="flex items-center gap-3">
                    <span className="soft-square h-9 w-9">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                    </span>
                    <h3 className="bento-title">ROI Calculator</h3>
                  </div>
                  <p className="bento-desc">Estimate the hours and the money you recover every month.</p>
                  <span className="bento-cta">
                    Open page
                    <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </li>
            <li data-rv="" className="b-docs">
              <a href="#/documents" data-theme="violet" className="bento group">
                <div className="bento-vis" aria-hidden="true" data-no-i18n="">
                  <div className="mv-sheets">
                    <div className="mv-sheet s1">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="mv-sheet s2">
                      <i></i>
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>
                    <div className="mv-sheet s3">
                      <b></b>
                      <i></i>
                      <i></i>
                      <i></i>
                      <u></u>
                    </div>
                  </div>
                </div>
                <div className="bento-txt">
                  <div className="flex items-center gap-3">
                    <span className="soft-square h-9 w-9">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                    </span>
                    <h3 className="bento-title">Documents</h3>
                  </div>
                  <p className="bento-desc">Browse A4 samples of the dossiers and scripts the workflow produces.</p>
                  <span className="bento-cta">
                    Open page
                    <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </li>
            <li data-rv="" className="b-how">
              <a href="#/how-it-works" data-theme="rose" className="bento group">
                <div className="bento-vis" aria-hidden="true" data-no-i18n="">
                  <div className="mv-pipe">
                    <span className="n"></span>
                    <span className="l"></span>
                    <span className="n n2"></span>
                    <span className="l"></span>
                    <span className="n"></span>
                  </div>
                </div>
                <div className="bento-txt">
                  <div className="flex items-center gap-3">
                    <span className="soft-square h-9 w-9">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                    </span>
                    <h3 className="bento-title">How it works</h3>
                  </div>
                  <p className="bento-desc">
                    See why drafting by hand is expensive and how the Empiric Labs flow replaces it.
                  </p>
                  <span className="bento-cta">
                    Open page
                    <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </li>
            <li data-rv="" className="b-blog">
              <a href="#/blog" data-theme="emerald" className="bento group">
                <div className="bento-vis" aria-hidden="true" data-no-i18n="">
                  <pre className="mv-code">
                    {"{\n  \"summary\": \"string\",\n  \"key_points\": [...],\n  \"risk\": \"high|medium|low\"\n}"}
                  </pre>
                </div>
                <div className="bento-txt">
                  <div className="flex items-center gap-3">
                    <span className="soft-square h-9 w-9">
                      <svg className="atom h-5 w-5" aria-hidden="true">
                        <use href="#atom-icon" />
                      </svg>
                    </span>
                    <h3 className="bento-title">Blog</h3>
                  </div>
                  <p className="bento-desc">Technical guides and case studies on Claude and Python automation.</p>
                  <span className="bento-cta">
                    Open page
                    <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                  </span>
                </div>
              </a>
            </li>
          </ul>
          <div data-rv="" data-theme="cyan" className="cta-band">
            <div className="cta-aurora" aria-hidden="true"></div>
            <div className="relative max-w-2xl">
              <h2 className="h-sec">Ready to automate your documents?</h2>
              <p className="lead mt-3">
                Get the kits on Gumroad, or tell us about your workflow and we will design it with you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={GUMROAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold"
                >
                  Explore Kits on Gumroad
                  <i data-lucide="external-link" className="h-4 w-4" aria-hidden="true"></i>
                </a>
                <a
                  href="#/home?doc=contact"
                  data-doc="contact"
                  className="btn-secondary inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold"
                >
                  <i data-lucide="mail" className="h-5 w-5 text-[#B77DFF]" aria-hidden="true"></i>
                  Talk to us
                </a>
              </div>
              <p className="mt-5 text-sm text-[color:var(--muted)]">
                <span>Or write to us directly:</span>
                {" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  data-no-i18n=""
                  className="font-medium text-cyan-neon underline underline-offset-4 hover:text-white"
                >{CONTACT_EMAIL}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
