import { CONTACT_EMAIL, GUMROAD_URL, X_URL } from '../config';

export default function Footer() {
  return (
    <footer data-theme="cyan" className="ft border-t border-white/[0.07] bg-ink">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="ft-top">
          <div data-rv="" className="ft-brand">
            <a href="#/home" className="inline-flex items-center gap-2.5" aria-label="Empiric Labs, home">
              <span className="soft-square h-8 w-8">
                <svg className="atom h-5 w-5" aria-hidden="true">
                  <use href="#atom-icon" />
                </svg>
              </span>
              <span className="text-[14px] font-bold tracking-[0.14em] text-white">EMPIRIC LABS</span>
            </a>
            <p className="ft-tag">
              Claude Master Prompts and Python scripts that turn raw data into corporate documents ready to send.
            </p>
          </div>
          <div data-rv="" className="ft-row" role="group" aria-label="Social and contact">
            <a href={X_URL} target="_blank" rel="noopener noreferrer" data-theme="neutral" className="ft-chip">
              <svg viewBox="0 0 24 24" className="ft-i" fill="currentColor" aria-hidden="true">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
              X / Twitter
            </a>
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-theme="cyan"
              className="ft-chip ft-chip--accent"
            >
              <svg className="gum-logo ft-gum" aria-hidden="true">
                <use href="#gumroad-logo" />
              </svg>
              Gumroad Store
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} data-no-i18n="" data-theme="violet" className="ft-chip">
              <svg
                viewBox="0 0 24 24"
                className="ft-i"
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
        </div>
        <div className="ft-navs">
          <nav data-rv="" className="ft-row" aria-label="Explore">
            <span className="ft-label">Explore</span>
            <a href="#/kits" data-route-link="kits" data-theme="cyan" className="ft-chip">Kits</a>
            <a href="#/how-it-works" data-route-link="how-it-works" data-theme="rose" className="ft-chip">How it works</a>
            <a href="#/documents" data-route-link="documents" data-theme="violet" className="ft-chip">Sample documents</a>
            <a href="#/playground" data-route-link="playground" data-theme="violet" className="ft-chip">Playground</a>
            <a href="#/roi" data-route-link="roi" data-theme="cyan" className="ft-chip">ROI Calculator</a>
            <a href="#/blog" data-route-link="blog" data-theme="emerald" className="ft-chip">Blog</a>
          </nav>
          <nav data-rv="" className="ft-row" aria-label="Legal information">
            <span className="ft-label">{"Legal & contact"}</span>
            <a href="#privacy" data-doc="privacy" data-theme="neutral" className="ft-chip">Privacy Policy</a>
            <a href="#cookies" data-doc="cookies" data-theme="neutral" className="ft-chip">Cookie Policy</a>
            <a href="#legal-notice" data-doc="legal-notice" data-theme="neutral" className="ft-chip">Legal Notice</a>
            <a href="#terms" data-doc="terms" data-theme="neutral" className="ft-chip">Terms of Service</a>
            <a href="#contact" data-doc="contact" data-theme="neutral" className="ft-chip">Contact</a>
          </nav>
        </div>
        <div className="ft-bottom">
          <p>© 2026 Empiric Labs. Powered by Empiric Photon.</p>
          <button type="button" data-scroll-top="" className="ft-top-btn">
            Back to top
            <i data-lucide="arrow-up" className="h-3.5 w-3.5" aria-hidden="true"></i>
          </button>
        </div>
        <div className="footer-mark" aria-hidden="true" data-no-i18n="">EMPIRIC LABS</div>
      </div>
    </footer>
  );
}
