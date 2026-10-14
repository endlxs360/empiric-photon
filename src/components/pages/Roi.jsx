import { GUMROAD_URL } from '../../config';

export default function Roi() {
  return (
    <section
      id="roi"
      data-view="roi"
      data-theme="cyan"
      className="relative isolate overflow-clip border-t border-white/[0.07] bg-surface/40"
    >
      <div
        className="pointer-events-none absolute -left-32 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-neon/[0.09] blur-[130px]"
        aria-hidden="true"
      >
      </div>
      <div
        className="pointer-events-none absolute -right-40 bottom-10 -z-10 h-[380px] w-[380px] rounded-full bg-violet-neon/[0.10] blur-[130px]"
        aria-hidden="true"
      >
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div data-rv="" className="max-w-2xl">
          <h1 className="h-page">Calculate the ROI of your project</h1>
          <p className="lead mt-4">
            Set your investment, traffic, conversion rates and team time to see the net profit, ROI and break-even point update in real time.
          </p>
        </div>
        <div data-rv="" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[color:var(--muted)]">Currency</span>
            <div role="group" aria-label="Currency" className="seg">
              <button type="button" className="seg-btn" data-cur="USD" aria-pressed="true" data-no-i18n="">USD $</button>
              <button type="button" className="seg-btn" data-cur="EUR" aria-pressed="false" data-no-i18n="">EUR €</button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[color:var(--muted)]">Scenario</span>
            <button type="button" className="chip-btn" data-preset="solo" aria-pressed="false">Solo consultant</button>
            <button type="button" className="chip-btn" data-preset="agency" aria-pressed="true">Growing agency</button>
            <button type="button" className="chip-btn" data-preset="scale" aria-pressed="false">Scale-up team</button>
          </div>
          <button
            id="roi-reset"
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
          >
            <i data-lucide="rotate-ccw" className="h-4 w-4" aria-hidden="true"></i>
            Reset
          </button>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-start">
          <div id="roi-inputs" data-rv="" className="glass rounded-3xl p-6 sm:p-8 lg:col-span-5">
            <fieldset className="roi-group">
              <legend className="roi-legend">Investment and period</legend>
              <div className="roi-f">
                <div className="flex items-end justify-between gap-4">
                  <label
                    id="roi-invest-label"
                    htmlFor="roi-invest"
                    className="text-[15px] font-medium leading-snug text-white"
                  >Initial investment</label>
                  <span className="roi-input-wrap">
                    <span className="roi-affix" data-cur-sym="">$</span>
                    <input
                      id="roi-invest-num"
                      type="number"
                      inputMode="decimal"
                      min="1000"
                      max="250000"
                      step="500"
                      defaultValue="15000"
                      className="roi-num roi-num--wide"
                      aria-labelledby="roi-invest-label"
                    />
                  </span>
                </div>
                <input
                  id="roi-invest"
                  type="range"
                  min="1000"
                  max="250000"
                  step="500"
                  defaultValue="15000"
                  className="roi-range mt-3"
                />
                <div
                  className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                  aria-hidden="true"
                  data-no-i18n=""
                >
                  <span id="roi-invest-min"></span>
                  <span id="roi-invest-max"></span>
                </div>
              </div>
              <div className="roi-f">
                <div className="flex items-end justify-between gap-4">
                  <label
                    id="roi-months-label"
                    htmlFor="roi-months"
                    className="text-[15px] font-medium leading-snug text-white"
                  >Amortization period (months)</label>
                  <span className="roi-input-wrap">
                    <input
                      id="roi-months-num"
                      type="number"
                      inputMode="decimal"
                      min="3"
                      max="36"
                      step="1"
                      defaultValue="12"
                      className="roi-num"
                      aria-labelledby="roi-months-label"
                    />
                    <span className="roi-affix" data-no-i18n="">mo</span>
                  </span>
                </div>
                <input
                  id="roi-months"
                  type="range"
                  min="3"
                  max="36"
                  step="1"
                  defaultValue="12"
                  className="roi-range mt-3"
                />
                <div
                  className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                  aria-hidden="true"
                  data-no-i18n=""
                >
                  <span id="roi-months-min"></span>
                  <span id="roi-months-max"></span>
                </div>
              </div>
            </fieldset>
            <fieldset className="roi-group">
              <legend className="roi-legend">Traffic and conversion</legend>
              <div className="roi-f">
                <div className="flex items-end justify-between gap-4">
                  <label
                    id="roi-traffic-label"
                    htmlFor="roi-traffic"
                    className="text-[15px] font-medium leading-snug text-white"
                  >Estimated monthly traffic (visits)</label>
                  <span className="roi-input-wrap">
                    <input
                      id="roi-traffic-num"
                      type="number"
                      inputMode="decimal"
                      min="1000"
                      max="250000"
                      step="500"
                      defaultValue="8000"
                      className="roi-num roi-num--wide"
                      aria-labelledby="roi-traffic-label"
                    />
                  </span>
                </div>
                <input
                  id="roi-traffic"
                  type="range"
                  min="1000"
                  max="250000"
                  step="500"
                  defaultValue="8000"
                  className="roi-range mt-3"
                />
                <div
                  className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                  aria-hidden="true"
                  data-no-i18n=""
                >
                  <span id="roi-traffic-min"></span>
                  <span id="roi-traffic-max"></span>
                </div>
              </div>
              <div className="roi-f">
                <div className="flex items-end justify-between gap-4">
                  <label
                    id="roi-cr0-label"
                    htmlFor="roi-cr0"
                    className="text-[15px] font-medium leading-snug text-white"
                  >Current conversion rate</label>
                  <span className="roi-input-wrap">
                    <input
                      id="roi-cr0-num"
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      max="10"
                      step="0.1"
                      defaultValue="1"
                      className="roi-num"
                      aria-labelledby="roi-cr0-label"
                    />
                    <span className="roi-affix" data-no-i18n="">%</span>
                  </span>
                </div>
                <input
                  id="roi-cr0"
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  defaultValue="1"
                  className="roi-range mt-3"
                />
                <div
                  className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                  aria-hidden="true"
                  data-no-i18n=""
                >
                  <span id="roi-cr0-min"></span>
                  <span id="roi-cr0-max"></span>
                </div>
              </div>
              <div className="roi-f">
                <div className="flex items-end justify-between gap-4">
                  <label
                    id="roi-cr1-label"
                    htmlFor="roi-cr1"
                    className="text-[15px] font-medium leading-snug text-white"
                  >Optimized conversion rate</label>
                  <span className="roi-input-wrap">
                    <input
                      id="roi-cr1-num"
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      max="15"
                      step="0.1"
                      defaultValue="1.3"
                      className="roi-num"
                      aria-labelledby="roi-cr1-label"
                    />
                    <span className="roi-affix" data-no-i18n="">%</span>
                  </span>
                </div>
                <input
                  id="roi-cr1"
                  type="range"
                  min="0.1"
                  max="15"
                  step="0.1"
                  defaultValue="1.3"
                  className="roi-range mt-3"
                />
                <div
                  className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                  aria-hidden="true"
                  data-no-i18n=""
                >
                  <span id="roi-cr1-min"></span>
                  <span id="roi-cr1-max"></span>
                </div>
                <p id="roi-cr-hint" className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]"></p>
              </div>
              <div className="roi-f">
                <div className="flex items-end justify-between gap-4">
                  <label
                    id="roi-ticket-label"
                    htmlFor="roi-ticket"
                    className="text-[15px] font-medium leading-snug text-white"
                  >Average ticket per customer</label>
                  <span className="roi-input-wrap">
                    <span className="roi-affix" data-cur-sym="">$</span>
                    <input
                      id="roi-ticket-num"
                      type="number"
                      inputMode="decimal"
                      min="10"
                      max="5000"
                      step="10"
                      defaultValue="120"
                      className="roi-num roi-num--wide"
                      aria-labelledby="roi-ticket-label"
                    />
                  </span>
                </div>
                <input
                  id="roi-ticket"
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  defaultValue="120"
                  className="roi-range mt-3"
                />
                <div
                  className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                  aria-hidden="true"
                  data-no-i18n=""
                >
                  <span id="roi-ticket-min"></span>
                  <span id="roi-ticket-max"></span>
                </div>
              </div>
            </fieldset>
            <fieldset className="roi-group">
              <legend className="roi-legend">Team time</legend>
              <label className="roi-switch">
                <input id="roi-incl" type="checkbox" defaultChecked />
                <span className="roi-switch-ui" aria-hidden="true"></span>
                <span className="text-sm text-slate-200">Include time savings (85% fewer drafting hours)</span>
              </label>
              <div id="roi-time" className="space-y-7">
                <div className="roi-f">
                  <div className="flex items-end justify-between gap-4">
                    <label
                      id="roi-docs-label"
                      htmlFor="roi-docs"
                      className="text-[15px] font-medium leading-snug text-white"
                    >Documents / Scripts generated per month</label>
                    <span className="roi-input-wrap">
                      <input
                        id="roi-docs-num"
                        type="number"
                        inputMode="decimal"
                        min="5"
                        max="200"
                        step="1"
                        defaultValue="40"
                        className="roi-num"
                        aria-labelledby="roi-docs-label"
                      />
                    </span>
                  </div>
                  <input
                    id="roi-docs"
                    type="range"
                    min="5"
                    max="200"
                    step="1"
                    defaultValue="40"
                    className="roi-range mt-3"
                  />
                  <div
                    className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                    aria-hidden="true"
                    data-no-i18n=""
                  >
                    <span id="roi-docs-min"></span>
                    <span id="roi-docs-max"></span>
                  </div>
                </div>
                <div className="roi-f">
                  <div className="flex items-end justify-between gap-4">
                    <label
                      id="roi-rate-label"
                      htmlFor="roi-rate"
                      className="text-[15px] font-medium leading-snug text-white"
                    >Average hourly cost of your team</label>
                    <span className="roi-input-wrap">
                      <span className="roi-affix" data-cur-sym="">$</span>
                      <input
                        id="roi-rate-num"
                        type="number"
                        inputMode="decimal"
                        min="15"
                        max="100"
                        step="1"
                        defaultValue="35"
                        className="roi-num"
                        aria-labelledby="roi-rate-label"
                      />
                      <span className="roi-affix" data-no-i18n="">/h</span>
                    </span>
                  </div>
                  <input
                    id="roi-rate"
                    type="range"
                    min="15"
                    max="100"
                    step="1"
                    defaultValue="35"
                    className="roi-range mt-3"
                  />
                  <div
                    className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                    aria-hidden="true"
                    data-no-i18n=""
                  >
                    <span id="roi-rate-min"></span>
                    <span id="roi-rate-max"></span>
                  </div>
                </div>
              </div>
            </fieldset>
            <details className="roi-adv">
              <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-300">
                <span>Advanced assumptions</span>
                <i
                  data-lucide="chevron-down"
                  className="roi-chevron h-4 w-4 shrink-0 text-cyan-neon"
                  aria-hidden="true"
                >
                </i>
              </summary>
              <div className="mt-5 space-y-7">
                <div className="roi-f">
                  <div className="flex items-end justify-between gap-4">
                    <label
                      id="roi-hpd-label"
                      htmlFor="roi-hpd"
                      className="text-[15px] font-medium leading-snug text-white"
                    >Manual hours per document</label>
                    <span className="roi-input-wrap">
                      <input
                        id="roi-hpd-num"
                        type="number"
                        inputMode="decimal"
                        min="0.5"
                        max="4"
                        step="0.25"
                        defaultValue="1.5"
                        className="roi-num"
                        aria-labelledby="roi-hpd-label"
                      />
                      <span className="roi-affix" data-no-i18n="">h</span>
                    </span>
                  </div>
                  <input
                    id="roi-hpd"
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.25"
                    defaultValue="1.5"
                    className="roi-range mt-3"
                  />
                  <div
                    className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                    aria-hidden="true"
                    data-no-i18n=""
                  >
                    <span id="roi-hpd-min"></span>
                    <span id="roi-hpd-max"></span>
                  </div>
                </div>
                <div className="roi-f">
                  <div className="flex items-end justify-between gap-4">
                    <label
                      id="roi-ramp-label"
                      htmlFor="roi-ramp"
                      className="text-[15px] font-medium leading-snug text-white"
                    >Ramp-up (months to reach the optimized rate)</label>
                    <span className="roi-input-wrap">
                      <input
                        id="roi-ramp-num"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="6"
                        step="1"
                        defaultValue="2"
                        className="roi-num"
                        aria-labelledby="roi-ramp-label"
                      />
                      <span className="roi-affix" data-no-i18n="">mo</span>
                    </span>
                  </div>
                  <input
                    id="roi-ramp"
                    type="range"
                    min="0"
                    max="6"
                    step="1"
                    defaultValue="2"
                    className="roi-range mt-3"
                  />
                  <div
                    className="mt-1 flex justify-between text-xs text-[color:var(--muted)]"
                    aria-hidden="true"
                    data-no-i18n=""
                  >
                    <span id="roi-ramp-min"></span>
                    <span id="roi-ramp-max"></span>
                  </div>
                </div>
              </div>
            </details>
          </div>
          <div id="roi-results" className="space-y-6 lg:col-span-7">
            <div id="roi-status" data-state="ok" className="rc-status" role="status" aria-live="polite">
              <span className="rc-status-dot" aria-hidden="true"></span>
              <p id="roi-status-text"></p>
            </div>
            <div className="roi-sticky">
              <dl className="grid grid-cols-2 gap-3 2xl:grid-cols-4">
                <div className="kpi" id="kpi-net">
                  <dt className="kpi-label">Projected net profit</dt>
                  <dd className="kpi-value" id="k-net">$0</dd>
                  <dd className="kpi-sub" id="k-net-sub"></dd>
                </div>
                <div className="kpi" id="kpi-roi">
                  <dt className="kpi-label">ROI</dt>
                  <dd className="kpi-value" id="k-roi">0%</dd>
                  <dd className="kpi-sub">Return on investment</dd>
                </div>
                <div className="kpi" id="kpi-be">
                  <dt className="kpi-label">Break-even</dt>
                  <dd className="kpi-value" id="k-be">0</dd>
                  <dd className="kpi-sub" id="k-be-sub"></dd>
                </div>
                <div className="kpi" id="kpi-gain">
                  <dt className="kpi-label">Monthly gain</dt>
                  <dd className="kpi-value" id="k-gain">$0</dd>
                  <dd className="kpi-sub">At full effect</dd>
                </div>
              </dl>
            </div>
            <div data-rv="" className="rc-card glass">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="rc-title">Break-even point</h2>
                <p id="be-recovered" className="text-sm text-[color:var(--muted)]"></p>
              </div>
              <div className="be-wrap">
                <div className="be-track" role="img" id="be-track">
                  <div id="be-fill" className="be-fill"></div>
                  <div id="be-marker" className="be-marker" hidden>
                    <span id="be-marker-label" className="be-flag"></span>
                  </div>
                </div>
                <div className="be-ticks" aria-hidden="true" data-no-i18n="">
                  <span id="be-t0"></span>
                  <span id="be-t1"></span>
                  <span id="be-t2"></span>
                </div>
              </div>
              <p id="be-caption" className="mt-3 text-sm leading-relaxed text-slate-300"></p>
            </div>
            <div data-rv="" className="rc-card glass">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="rc-title">Cumulative net position</h2>
                <ul className="flex flex-wrap items-center gap-4 text-xs text-[color:var(--muted)]" aria-hidden="true">
                  <li className="flex items-center gap-1.5">
                    <span className="rc-key rc-key--line"></span>
                    Net position
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="rc-key rc-key--be"></span>
                    Break-even
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="rc-key rc-key--inv"></span>
                    Investment
                  </li>
                </ul>
              </div>
              <div
                id="roi-chart"
                className="rc-chart mt-4"
                tabIndex="0"
                role="group"
                aria-roledescription="interactive chart"
                aria-label="Cumulative net position by month. Use the left and right arrow keys to inspect each month."
              >
                <svg id="roi-svg" aria-hidden="true" focusable="false"></svg>
                <div id="roi-tip" className="rc-tip" hidden></div>
              </div>
              <p id="roi-chart-sr" className="sr-only" role="status" aria-live="polite"></p>
            </div>
            <div data-rv="" className="rc-card glass">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="rc-title">Revenue comparison</h2>
                <div role="group" aria-label="Timeframe" className="seg">
                  <button type="button" className="seg-btn" data-tf="month" aria-pressed="false"></button>
                  <button type="button" className="seg-btn" data-tf="period" aria-pressed="true"></button>
                  <button type="button" className="seg-btn" data-tf="year" aria-pressed="false"></button>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rv-row" tabIndex="0" aria-describedby="rv-delta">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-300">Without optimization</span>
                    <span id="rv0-val" className="font-mono text-slate-100">$0</span>
                  </div>
                  <div className="rv-track">
                    <div id="rv0-bar" className="rv-seg rv-seg--base"></div>
                  </div>
                </div>
                <div className="rv-row" tabIndex="0" aria-describedby="rv-delta">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-white">With Empiric Photon</span>
                    <span id="rv1-val" className="font-mono text-cyan-neon">$0</span>
                  </div>
                  <div className="rv-track">
                    <div id="rv1-base" className="rv-seg rv-seg--base"></div>
                    <div id="rv1-upl" className="rv-seg rv-seg--upl"></div>
                  </div>
                </div>
              </div>
              <p id="rv-delta" className="rv-delta mt-4"></p>
            </div>
            <div data-rv="" className="rc-card glass">
              <h2 className="rc-title">Where the gain comes from</h2>
              <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden="true">
                <div id="bd-bar-upl" className="bd-seg bd-seg--upl"></div>
                <div id="bd-bar-sav" className="bd-seg bd-seg--sav"></div>
              </div>
              <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="rc-key rc-key--upl"></span>
                    Conversion uplift
                  </span>
                  <span id="bd-upl-val" className="font-mono text-slate-100"></span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="rc-key rc-key--sav"></span>
                    Time savings
                  </span>
                  <span id="bd-sav-val" className="font-mono text-slate-100"></span>
                </li>
              </ul>
              <div id="bd-hours" className="mt-5 space-y-3 border-t border-white/[0.08] pt-5">
                <div>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-300">Manual hours (traditional method)</span>
                    <span className="font-mono text-slate-100">
                      <span id="bd-h0" data-no-i18n="">60</span>
                      {" "}
                      h
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 rounded-full bg-white/[0.07]" aria-hidden="true">
                    <div id="bd-hb0" className="roi-bar h-full w-full rounded-full bg-slate-500"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-slate-100">Hours with Empiric Labs</span>
                    <span className="font-mono text-cyan-neon">
                      <span id="bd-h1" data-no-i18n="">9</span>
                      {" "}
                      h
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 rounded-full bg-white/[0.07]" aria-hidden="true">
                    <div
                      id="bd-hb1"
                      className="roi-bar h-full rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon"
                      style={{ width: "15%" }}
                    >
                    </div>
                  </div>
                </div>
              </div>
              <p id="bd-note" className="mt-4 text-xs leading-relaxed text-[color:var(--muted)]" hidden>
                Time savings are switched off. Enable them in the Team time group to include them.
              </p>
            </div>
            <div data-rv="" className="rc-card glass">
              <h2 className="rc-title">Summary and export</h2>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  id="roi-copy"
                  type="button"
                  className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
                >
                  <i data-lucide="copy" className="h-4 w-4" aria-hidden="true"></i>
                  Copy summary
                </button>
                <button
                  id="roi-csv"
                  type="button"
                  className="btn-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
                >
                  <i data-lucide="download" className="h-4 w-4" aria-hidden="true"></i>
                  Export CSV
                </button>
              </div>
              <p id="roi-act-msg" role="status" className="mt-3 min-h-[1.25rem] text-sm text-emerald-300"></p>
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-center text-base font-semibold leading-snug"
              >
                Start optimizing with the Gumroad Kits
                {" "}
                <i data-lucide="external-link" className="h-4 w-4 shrink-0" aria-hidden="true"></i>
              </a>
              <p id="roi-hint" className="mt-3 min-h-[1.25rem] text-center text-sm text-[color:var(--muted)]"></p>
            </div>
            <p id="roi-sr" className="sr-only" role="status" aria-live="polite"></p>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[color:var(--muted)]">
          Indicative projection driven entirely by the values you enter: it is not a guarantee of results. Revenue is traffic × conversion rate × average ticket. Time savings apply an 85% reduction to manual drafting hours. Amounts use the selected currency with no exchange-rate conversion.
        </p>
      </div>
      <div id="roi-bar" className="roi-bar-mobile glass-fill" aria-hidden="true">
        <span className="rbm">
          <span className="rbm-l">ROI</span>
          <b id="rb-roi">0%</b>
        </span>
        <span className="rbm">
          <span className="rbm-l">Net</span>
          <b id="rb-net">$0</b>
        </span>
        <span className="rbm">
          <span className="rbm-l">Break-even</span>
          <b id="rb-be">0</b>
        </span>
        <button id="rb-go" type="button" tabIndex="-1">View results</button>
      </div>
    </section>
  );
}
