import { CONTACT_EMAIL, GUMROAD_URL, X_URL } from '../config';

export default function Sidebar() {
  return (
    <aside id="sidebar" className="hidden w-64 shrink-0 lg:block">
      <nav aria-label="Pages" className="flex flex-col gap-1">
        <p className="side-label">Discover</p>
        <a
          href="#/home"
          data-route-link="home"
          data-theme="cyan"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>Home</span>
        </a>
        <a
          href="#/how-it-works"
          data-route-link="how-it-works"
          data-theme="rose"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>How it works</span>
        </a>
        <a
          href="#/kits"
          data-route-link="kits"
          data-theme="cyan"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>Kits</span>
        </a>
        <a
          href="#/documents"
          data-route-link="documents"
          data-theme="violet"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>Documents</span>
        </a>
        <p className="side-label">Try it</p>
        <a
          href="#/playground"
          data-route-link="playground"
          data-theme="violet"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>Playground</span>
        </a>
        <a
          href="#/roi"
          data-route-link="roi"
          data-theme="cyan"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>ROI Calculator</span>
        </a>
        <p className="side-label">Learn</p>
        <a
          href="#/blog"
          data-route-link="blog"
          data-theme="emerald"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>Blog</span>
        </a>
        <a
          href="#/home?doc=contact"
          data-doc="contact"
          data-theme="neutral"
          className="side-link flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--muted)] transition-colors hover:text-white"
        >
          <span className="soft-square h-8 w-8">
            <svg className="atom h-[18px] w-[18px]" aria-hidden="true">
              <use href="#atom-icon" />
            </svg>
          </span>
          <span>Contact</span>
        </a>
        <div className="side-foot">
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="side-social">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
            X / Twitter
          </a>
          <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer" className="side-social">
            <svg className="gum-logo h-4 w-4" aria-hidden="true">
              <use href="#gumroad-logo" />
            </svg>
            Gumroad Store
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="side-social">
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
        </div>
      </nav>
    </aside>
  );
}
