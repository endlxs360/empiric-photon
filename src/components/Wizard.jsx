import { CONTACT_EMAIL } from '../config';

export default function Wizard() {
  return (
    <dialog id="wiz-dialog" data-theme="cyan" aria-labelledby="wiz-title" data-no-i18n="">
      <div className="wz">
        <div className="wz-head">
          <div>
            <p className="wz-kicker">Custom B2B workflow</p>
            <h2 id="wiz-title" className="wz-title">Tell us about your project</h2>
          </div>
          <div className="wz-hbtns">
            <button type="button" id="wz-reset" className="wz-link" hidden>Start over</button>
            <button
              id="wz-close"
              type="button"
              aria-label="Close questionnaire"
              className="soft-square close-btn h-9 w-9"
            >
              <svg className="atom be-x h-5 w-5" aria-hidden="true">
                <use href="#be-x-icon" />
              </svg>
            </button>
          </div>
        </div>
        <div className="wz-prog">
          <ol className="wz-steps" id="wz-steps">
            <li>
              <button type="button" className="wz-step" data-goto="1">
                <span className="wz-dot">1</span>
                <span className="wz-lab">Project</span>
              </button>
            </li>
            <li>
              <button type="button" className="wz-step" data-goto="2">
                <span className="wz-dot">2</span>
                <span className="wz-lab">Details</span>
              </button>
            </li>
            <li>
              <button type="button" className="wz-step" data-goto="3">
                <span className="wz-dot">3</span>
                <span className="wz-lab">Impact</span>
              </button>
            </li>
            <li>
              <button type="button" className="wz-step" data-goto="4">
                <span className="wz-dot">4</span>
                <span className="wz-lab">Contact</span>
              </button>
            </li>
          </ol>
          <div
            id="wz-bar"
            className="wz-bar"
            role="progressbar"
            aria-label="Questionnaire progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="25"
          >
            <i id="wz-bar-fill"></i>
          </div>
          <p id="wz-count" className="wz-count" role="status" aria-live="polite"></p>
        </div>
        <form id="wz-form" className="wz-body" noValidate autoComplete="off">
          <section className="wz-sec" data-step="1">
            <h3 className="wz-h" tabIndex="-1">What do you want to automate?</h3>
            <p className="wz-sub">
              Pick the area that best describes the main goal. You can add detail in the next step.
            </p>
            <fieldset className="wz-opts" id="wz-types">
              <legend className="sr-only">Project type</legend>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="content" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="6" cy="6" r="3" />
                      <path d="M8.12 8.12 12 12" />
                      <path d="M20 4 8.12 15.88" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M14.8 14.8 20 20" />
                    </svg>
                  </span>
                  <span>
                    <b>Content automation</b>
                    <small>Repurpose videos, podcasts and posts at scale.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="docs" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                      <path d="M14 3v5h5M9 13h6M9 17h6" />
                    </svg>
                  </span>
                  <span>
                    <b>Document generation</b>
                    <small>Reports, proposals and dossiers as .docx.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="audit" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                      <path d="m8.5 11 1.8 1.8 3.2-3.3" />
                    </svg>
                  </span>
                  <span>
                    <b>Web audit</b>
                    <small>Automated site checks and findings reports.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="leads" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 4h18l-7 9v6l-4 2v-8z" />
                    </svg>
                  </span>
                  <span>
                    <b>Lead capture</b>
                    <small>Forms, enrichment and routing to your CRM.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="integrations" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="5" cy="6" r="2.5" />
                      <circle cx="19" cy="6" r="2.5" />
                      <circle cx="12" cy="18" r="2.5" />
                      <path d="M7.2 7.4 10.8 16M16.8 7.4 13.2 16M7.5 6h9" />
                    </svg>
                  </span>
                  <span>
                    <b>API and n8n integrations</b>
                    <small>Connect your tools with Python, n8n or webhooks.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="data" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <ellipse cx="12" cy="5" rx="8" ry="3" />
                      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                    </svg>
                  </span>
                  <span>
                    <b>Data extraction</b>
                    <small>Pull structured data from PDFs, emails or pages.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="reporting" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                    </svg>
                  </span>
                  <span>
                    <b>Reporting and analytics</b>
                    <small>Recurring summaries and dashboards.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
              <label className="wz-opt">
                <input className="wz-in" type="radio" name="type" defaultValue="other" />
                <span className="wz-card">
                  <span className="wz-ico">
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
                      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                    </svg>
                  </span>
                  <span>
                    <b>Something else</b>
                    <small>Describe it in your own words.</small>
                  </span>
                  <span className="wz-tick">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                </span>
              </label>
            </fieldset>
            <div className="wz-f" id="wz-other-wrap" hidden>
              <label className="wz-lbl" htmlFor="wz-other">
                What is the project about?
                <span className="wz-req" aria-hidden="true">*</span>
              </label>
              <input
                id="wz-other"
                className="wz-input"
                type="text"
                maxLength="90"
                placeholder="For example: onboarding documents for new clients"
              />
            </div>
          </section>
          <section className="wz-sec" data-step="2" hidden>
            <h3 className="wz-h" tabIndex="-1">Tell us how it works today</h3>
            <p className="wz-sub">The more concrete, the better the proposal. Rough notes are fine.</p>
            <div className="wz-f">
              <label className="wz-lbl" htmlFor="wz-desc">
                Describe the flow you want
                <span className="wz-req" aria-hidden="true">*</span>
              </label>
              <p className="wz-hint" id="wz-desc-h">
                What starts it, what should happen and what comes out. Use the buttons to add a section.
              </p>
              <div className="wz-tb" role="group" aria-label="Insert a section">
                <button type="button" className="chip-btn" data-ins="Trigger: ">+ Trigger</button>
                <button type="button" className="chip-btn" data-ins="Steps: ">+ Steps</button>
                <button type="button" className="chip-btn" data-ins="Output: ">+ Output</button>
                <button type="button" className="chip-btn" data-ins="Exceptions: ">+ Exceptions</button>
                <button type="button" className="chip-btn" data-tpl="">Use template</button>
              </div>
              <textarea
                id="wz-desc"
                className="wz-input"
                maxLength="1200"
                aria-describedby="wz-desc-h wz-desc-n"
                placeholder={"Trigger: a new client signs the contract\nSteps: collect the form data, draft the welcome pack, check it\nOutput: a .docx sent to the account manager\nExceptions: missing fields are flagged, not guessed"}
              >
              </textarea>
              <div className="wz-meta">
                <span>At least 20 characters.</span>
                <span id="wz-desc-n">0 / 1200</span>
              </div>
            </div>
            <div className="wz-f">
              <span className="wz-lbl" id="wz-tools-l">Tools you use today</span>
              <p className="wz-hint">Select all that apply, or add your own and press Enter.</p>
              <div className="wz-tools" id="wz-tools" role="group" aria-labelledby="wz-tools-l"></div>
              <div className="wz-add">
                <input
                  id="wz-tool-add"
                  className="wz-input"
                  type="text"
                  maxLength="30"
                  placeholder="Another tool"
                  aria-label="Add another tool"
                />
                <button type="button" id="wz-tool-btn">Add</button>
              </div>
            </div>
            <div className="wz-grid2 wz-f">
              <div>
                <div className="wz-out">
                  <label className="wz-lbl" htmlFor="wz-vol" style={{ margin: "0" }}>Volume per month</label>
                  <output id="wz-vol-out" htmlFor="wz-vol"></output>
                </div>
                <p className="wz-hint">Documents, leads or runs.</p>
                <input
                  id="wz-vol"
                  className="roi-range wz-range"
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  defaultValue="2"
                />
                <div className="wz-ticks" aria-hidden="true">
                  <span>10</span>
                  <span>10,000+</span>
                </div>
              </div>
              <div>
                <span className="wz-lbl" id="wz-freq-l">How often should it run?</span>
                <p className="wz-hint">Pick the closest option.</p>
                <div className="wz-seg" role="radiogroup" aria-labelledby="wz-freq-l">
                  <label>
                    <input className="wz-in" type="radio" name="freq" defaultValue="ondemand" defaultChecked />
                    <span>On demand</span>
                  </label>
                  <label>
                    <input className="wz-in" type="radio" name="freq" defaultValue="daily" />
                    <span>Daily</span>
                  </label>
                  <label>
                    <input className="wz-in" type="radio" name="freq" defaultValue="weekly" />
                    <span>Weekly</span>
                  </label>
                  <label>
                    <input className="wz-in" type="radio" name="freq" defaultValue="monthly" />
                    <span>Monthly</span>
                  </label>
                  <label>
                    <input className="wz-in" type="radio" name="freq" defaultValue="realtime" />
                    <span>Real time</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
          <section className="wz-sec" data-step="3" hidden>
            <h3 className="wz-h" tabIndex="-1">What should improve?</h3>
            <p className="wz-sub">
              Tell us what success looks like, how soon you need it and the budget you have in mind.
            </p>
            <div className="wz-f">
              <span className="wz-lbl" id="wz-met-l">
                Metrics to improve
                <span className="wz-req" aria-hidden="true">*</span>
              </span>
              <p className="wz-hint">Select at least one.</p>
              <div className="wz-tools" id="wz-metrics" role="group" aria-labelledby="wz-met-l"></div>
            </div>
            <div className="wz-f">
              <div className="wz-out">
                <label className="wz-lbl" htmlFor="wz-hours" style={{ margin: "0" }}>Hours you would like to save per week</label>
                <output id="wz-hours-out" htmlFor="wz-hours"></output>
              </div>
              <p className="wz-hint">Optional. Move to 0 if you are not sure.</p>
              <input
                id="wz-hours"
                className="roi-range wz-range"
                type="range"
                min="0"
                max="80"
                step="1"
                defaultValue="10"
              />
              <div className="wz-ticks" aria-hidden="true">
                <span>0</span>
                <span>80 h</span>
              </div>
            </div>
            <div className="wz-f">
              <span className="wz-lbl" id="wz-time-l">
                When do you need it?
                <span className="wz-req" aria-hidden="true">*</span>
              </span>
              <div className="wz-opts wz-opts--sm" role="radiogroup" aria-labelledby="wz-time-l" id="wz-timeline">
                <label className="wz-opt">
                  <input className="wz-in" type="radio" name="timeline" defaultValue="asap" />
                  <span className="wz-card">
                    <span>
                      <b>As soon as possible</b>
                      <small>Under 2 weeks</small>
                    </span>
                    <span className="wz-tick">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  </span>
                </label>
                <label className="wz-opt">
                  <input className="wz-in" type="radio" name="timeline" defaultValue="short" />
                  <span className="wz-card">
                    <span>
                      <b>2 to 4 weeks</b>
                      <small>A focused pilot</small>
                    </span>
                    <span className="wz-tick">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  </span>
                </label>
                <label className="wz-opt">
                  <input className="wz-in" type="radio" name="timeline" defaultValue="mid" />
                  <span className="wz-card">
                    <span>
                      <b>1 to 2 months</b>
                      <small>Several workflows</small>
                    </span>
                    <span className="wz-tick">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  </span>
                </label>
                <label className="wz-opt">
                  <input className="wz-in" type="radio" name="timeline" defaultValue="long" />
                  <span className="wz-card">
                    <span>
                      <b>3 months or more</b>
                      <small>A larger programme</small>
                    </span>
                    <span className="wz-tick">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  </span>
                </label>
                <label className="wz-opt">
                  <input className="wz-in" type="radio" name="timeline" defaultValue="flex" />
                  <span className="wz-card">
                    <span>
                      <b>Flexible</b>
                      <small>No fixed date</small>
                    </span>
                    <span className="wz-tick">
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="wz-f">
              <div className="wz-out">
                <label className="wz-lbl" htmlFor="wz-budget" style={{ margin: "0" }}>Approximate budget</label>
                <span style={{ display: "inline-flex", alignItems: "center", gap: ".75rem" }}>
                  <output id="wz-budget-out" htmlFor="wz-budget"></output>
                  <span className="seg" role="group" aria-label="Currency">
                    <button type="button" className="seg-btn" data-wcur="USD" aria-pressed="true">USD</button>
                    <button type="button" className="seg-btn" data-wcur="EUR" aria-pressed="false">EUR</button>
                  </span>
                </span>
              </div>
              <p className="wz-hint">One-off project cost. An estimate is enough.</p>
              <input
                id="wz-budget"
                className="roi-range wz-range"
                type="range"
                min="0"
                max="4"
                step="1"
                defaultValue="2"
              />
              <div className="wz-ticks" aria-hidden="true">
                <span id="wz-bud-min"></span>
                <span id="wz-bud-max"></span>
              </div>
              <label className="wz-check">
                <input type="checkbox" id="wz-unsure" defaultChecked />
                <span>I am not sure yet. Suggest a range after reviewing the project.</span>
              </label>
            </div>
          </section>
          <section className="wz-sec" data-step="4" hidden>
            <h3 className="wz-h" tabIndex="-1">Who should we reply to?</h3>
            <p className="wz-sub">We use these details only to answer this enquiry.</p>
            <div className="wz-grid2">
              <div>
                <label className="wz-lbl" htmlFor="wz-name">
                  Full name
                  <span className="wz-req" aria-hidden="true">*</span>
                </label>
                <input
                  id="wz-name"
                  className="wz-input"
                  type="text"
                  autoComplete="name"
                  maxLength="80"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="wz-lbl" htmlFor="wz-company">
                  Company or project
                  <span className="wz-req" aria-hidden="true">*</span>
                </label>
                <input
                  id="wz-company"
                  className="wz-input"
                  type="text"
                  autoComplete="organization"
                  maxLength="80"
                  placeholder="Company or project name"
                />
              </div>
            </div>
            <div className="wz-f">
              <label className="wz-lbl" htmlFor="wz-email">
                Contact email
                <span className="wz-req" aria-hidden="true">*</span>
              </label>
              <input
                id="wz-email"
                className="wz-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength="120"
                placeholder="you@company.com"
              />
            </div>
            <div className="wz-f">
              <label className="wz-lbl" htmlFor="wz-notes">Anything else we should know?</label>
              <textarea
                id="wz-notes"
                className="wz-input"
                style={{ minHeight: "5.5rem" }}
                maxLength="400"
                placeholder="Optional: links, deadlines, constraints"
              >
              </textarea>
            </div>
            <label className="wz-check">
              <input type="checkbox" id="wz-consent" />
              <span>
                I agree to the processing of my data to answer this enquiry. See the
                {" "}
                <a href="#privacy" data-doc="privacy">Privacy Policy</a>
                .
                <span className="wz-req" aria-hidden="true">*</span>
              </span>
            </label>
          </section>
          <section className="wz-sec" data-step="5" hidden>
            <h3 className="wz-h" tabIndex="-1">Review your request</h3>
            <p className="wz-sub">
              This is everything you told us. Use Edit to change a section, then send the request by email.
            </p>
            <div id="wz-sum" className="wz-groups"></div>
            <div id="wz-mail" className="wz-mailbox"></div>
            <div className="wz-actions">
              <button type="button" id="wz-copy" className="wz-btn wz-btn--ghost">Copy summary</button>
            </div>
            <p id="wz-ok" className="wz-ok" role="status"></p>
            <p className="wz-note" id="wz-note">
              Use
              {" "}
              <strong>Send request by email</strong>
              {" "}
              below. Your email app opens with the subject and message ready; press send there to finish.
            </p>
          </section>
          <section className="wz-sec" data-step="6" hidden>
            <div className="wz-success">
              <div className="wz-seal" aria-hidden="true">
                <svg viewBox="0 0 52 52" width="64" height="64" fill="none">
                  <circle className="c" cx="26" cy="26" r="23" stroke="currentColor" strokeWidth="2.5" />
                  <path
                    className="t"
                    d="M15 27l8 8 15-17"
                    stroke="currentColor"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="wz-h wz-h--lg" id="wz-ok-title" tabIndex="-1">Thank you!</h3>
              <p className="wz-sub" id="wz-ok-text" style={{ marginLeft: "auto", marginRight: "auto" }}></p>
              <div className="wz-eta">
                <span className="wz-eta-ico">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>
                  <small>Estimated reply</small>
                  <b>Within 1 to 2 business days</b>
                </span>
                <span>
                  <small>We will write to</small>
                  <b id="wz-ok-email"></b>
                </span>
              </div>
              <ol className="wz-next">
                <li>
                  <b>We review your brief</b>
                  <span>We read the flow, tools and goals you described.</span>
                </li>
                <li>
                  <b>You get an indicative proposal</b>
                  <span>Scope, timeline and a price range by email.</span>
                </li>
                <li>
                  <b>We refine it together</b>
                  <span>A short call if anything needs clarifying.</span>
                </li>
              </ol>
              <div className="wz-actions" style={{ justifyContent: "center" }}>
                <a id="wz-send2" className="wz-btn wz-btn--ghost" href={`mailto:${CONTACT_EMAIL}`}>
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
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  Open the email again
                </a>
                <button type="button" id="wz-copy2" className="wz-btn wz-btn--ghost">Copy summary</button>
                <button type="button" id="wz-done" className="wz-btn wz-btn--pri">Close</button>
              </div>
              <p id="wz-ok2" className="wz-ok" role="status"></p>
              <p className="wz-note">
                If your email app did not open, copy the summary and send it to
                {" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                .
                {" "}
                <button type="button" id="wz-new" className="wz-link">Start a new request</button>
              </p>
            </div>
          </section>
        </form>
        <div className="wz-foot" id="wz-foot">
          <button type="button" id="wz-back" className="wz-btn wz-btn--ghost">Back</button>
          <p id="wz-err" className="wz-err" role="alert"></p>
          <button type="button" id="wz-next" className="wz-btn wz-btn--pri">Continue</button>
          <a id="wz-send" className="wz-btn wz-btn--pri wz-btn--lg" href={`mailto:${CONTACT_EMAIL}`} hidden>
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
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Send request by email
          </a>
        </div>
      </div>
    </dialog>
  );
}
