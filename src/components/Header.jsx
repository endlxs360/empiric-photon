import { CONTACT_EMAIL, GUMROAD_URL } from '../config';

export default function Header() {
  return (
    <header
      className="sticky z-50 border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="#/home" data-theme="cyan" className="flex shrink-0 items-center gap-3" aria-label="Empiric Labs, home">
          <span className="soft-square h-9 w-9">
            <svg className="atom h-6 w-6" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span className="flex flex-col leading-none sm:flex-row sm:items-center sm:gap-2.5">
            <span className="text-[15px] font-bold tracking-[0.14em] text-white">EMPIRIC LABS</span>
            <span
              className="mt-1 w-fit rounded-full border border-violet-neon/50 bg-violet-neon/15 px-2 py-[3px] text-[10px] font-medium text-[#C9A2FF] sm:mt-0"
            >by Empiric Photon</span>
          </span>
        </a>
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1.5 md:flex"
            role="status"
            aria-label="API online, version 2.4"
          >
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wide text-emerald-300">
              API ONLINE
              {" "}
              <span className="text-white/60">/</span>
              {" "}
              v2.4
            </span>
          </div>
          <div id="lang-root" className="relative">
            <button
              id="lang-btn"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-controls="lang-panel"
              aria-label="Language: English"
              data-no-i18n=""
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-surface px-3 text-sm font-medium text-slate-200 transition-colors hover:border-white/25 hover:text-white"
            >
              <svg id="lang-flag" className="flag" aria-hidden="true">
                <use href="#flag-gb" />
              </svg>
              <span id="lang-code">EN</span>
              <i data-lucide="chevron-down" className="h-3.5 w-3.5 text-slate-400" aria-hidden="true"></i>
            </button>
            <div
              id="lang-panel"
              data-theme="cyan"
              data-panel=""
              className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-surface p-1.5 shadow-2xl shadow-black/60"
            >
              <div className="flex items-center justify-between gap-3 px-2.5 pb-1.5 pt-1">
                <span className="text-xs font-medium text-[color:var(--muted)]">Language</span>
                <button
                  id="lang-close"
                  type="button"
                  aria-label="Close language menu"
                  className="soft-square close-btn h-8 w-8"
                >
                  <svg className="atom be-x h-4 w-4" aria-hidden="true">
                    <use href="#be-x-icon" />
                  </svg>
                </button>
              </div>
              <ul id="lang-menu" role="menu" aria-label="Language">
                <li role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked="true"
                    data-lang="en"
                    lang="en"
                    data-no-i18n=""
                    className="lang-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 transition-colors hover:bg-white/[0.06]"
                  >
                    <svg className="flag" aria-hidden="true">
                      <use href="#flag-gb" />
                    </svg>
                    <span className="flex-1 font-medium">English</span>
                    <span className="font-mono text-xs text-[color:var(--muted)]">EN</span>
                    <svg className="lang-check" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </button>
                </li>
                <li role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked="false"
                    data-lang="es"
                    lang="es"
                    data-no-i18n=""
                    className="lang-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 transition-colors hover:bg-white/[0.06]"
                  >
                    <svg className="flag" aria-hidden="true">
                      <use href="#flag-es" />
                    </svg>
                    <span className="flex-1 font-medium">Español</span>
                    <span className="font-mono text-xs text-[color:var(--muted)]">ES</span>
                    <svg className="lang-check" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </button>
                </li>
                <li role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked="false"
                    data-lang="ja"
                    lang="ja"
                    data-no-i18n=""
                    className="lang-item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-200 transition-colors hover:bg-white/[0.06]"
                  >
                    <svg className="flag" aria-hidden="true">
                      <use href="#flag-jp" />
                    </svg>
                    <span className="flex-1 font-medium">日本語</span>
                    <span className="font-mono text-xs text-[color:var(--muted)]">JA</span>
                    <svg className="lang-check" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-cyan-neon/60 px-4 py-2 text-sm font-semibold text-cyan-neon transition-colors hover:bg-cyan-neon hover:text-ink sm:inline-flex"
          >
            <svg className="gum-logo h-5 w-5" aria-hidden="true">
              <use href="#gumroad-logo" />
            </svg>
            {" "}
            View on Gumroad
            {" "}
            <i data-lucide="external-link" className="h-3.5 w-3.5" aria-hidden="true"></i>
          </a>
          <button
            id="menu-btn"
            type="button"
            data-no-i18n=""
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-surface text-white transition-colors hover:border-white/25 lg:hidden"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <span className="menu-bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        role="region"
        aria-label="Menu"
        data-theme="cyan"
        data-collapse=""
        className="bg-ink/95 lg:hidden"
      >
        <div className="collapse-inner border-t border-white/[0.07]">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            <div className="mb-1 flex items-center justify-between px-3">
              <p className="text-sm font-medium text-white">Menu</p>
              <button id="menu-close" type="button" aria-label="Close menu" className="menu-close close-btn">
                <svg className="atom be-x" aria-hidden="true">
                  <use href="#be-x-icon" />
                </svg>
                <span>Close menu</span>
              </button>
            </div>
            <a
              href="#/home"
              data-route-link="home"
              data-theme="cyan"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              Home
            </a>
            <a
              href="#/how-it-works"
              data-route-link="how-it-works"
              data-theme="rose"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              How it works
            </a>
            <a
              href="#/kits"
              data-route-link="kits"
              data-theme="cyan"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              Kits
            </a>
            <a
              href="#/documents"
              data-route-link="documents"
              data-theme="violet"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              Documents
            </a>
            <a
              href="#/playground"
              data-route-link="playground"
              data-theme="violet"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              Playground
            </a>
            <a
              href="#/roi"
              data-route-link="roi"
              data-theme="cyan"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              ROI Calculator
            </a>
            <a
              href="#/blog"
              data-route-link="blog"
              data-theme="emerald"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              Blog
            </a>
            <a
              href="#/home?doc=contact"
              data-doc="contact"
              data-theme="neutral"
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <span className="soft-square h-8 w-8">
                <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              Contact
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mobile-link flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-slate-200 hover:bg-white/5"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {CONTACT_EMAIL}
            </a>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
              <span className="flex items-center gap-2 font-mono text-[11px] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                API ONLINE / v2.4
              </span>
              <a
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-neon/60 px-4 py-2 text-sm font-semibold text-cyan-neon"
              >
                <svg className="gum-logo h-5 w-5" aria-hidden="true">
                  <use href="#gumroad-logo" />
                </svg>
                {" "}
                View on Gumroad
                {" "}
                <i data-lucide="external-link" className="h-3.5 w-3.5" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
