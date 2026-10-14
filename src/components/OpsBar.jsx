export default function OpsBar() {
  return (
    <div className="ops-bar" data-no-i18n="">
      <div className="ops-in">
        <span className="ops-brand">
          <svg className="atom" width="12" height="12" aria-hidden="true">
            <use href="#atom-icon" />
          </svg>
          EMPIRIC PHOTON
        </span>
        <span className="ops-sep" aria-hidden="true"></span>
        <span className="ops-hide-sm">LABS</span>
        <span className="ops-mid">DOCUMENT AUTOMATION SYSTEMS</span>
        <span className="ops-r">
          <span className="ops-hide-sm">REV 2026.10</span>
          <span className="ops-sep ops-hide-sm" aria-hidden="true"></span>
          <i className="ops-dot" aria-hidden="true"></i>
          ALL SYSTEMS NOMINAL
        </span>
      </div>
    </div>
  );
}
