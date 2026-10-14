export default function ViewSkeleton() {
  return (
    <div id="view-skel" aria-hidden="true" data-no-i18n="">
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="sk sk-h1"></div>
        <div className="sk sk-line" style={{ width: "68%" }}></div>
        <div className="sk sk-line" style={{ width: "46%" }}></div>
        <div className="sk-grid sk-generic">
          <div className="sk-card">
            <div className="sk sk-ico"></div>
            <div className="sk sk-line" style={{ width: "55%" }}></div>
            <div className="sk sk-line"></div>
            <div className="sk sk-line" style={{ width: "80%" }}></div>
          </div>
          <div className="sk-card">
            <div className="sk sk-ico"></div>
            <div className="sk sk-line" style={{ width: "48%" }}></div>
            <div className="sk sk-line"></div>
            <div className="sk sk-line" style={{ width: "72%" }}></div>
          </div>
          <div className="sk-card">
            <div className="sk sk-ico"></div>
            <div className="sk sk-line" style={{ width: "60%" }}></div>
            <div className="sk sk-line"></div>
            <div className="sk sk-line" style={{ width: "64%" }}></div>
          </div>
        </div>
        <div className="sk-ws">
          <div className="sk-card">
            <div className="sk sk-input"></div>
            <div className="sk sk-line" style={{ width: "90%" }}></div>
            <div className="sk sk-line" style={{ width: "70%" }}></div>
            <div className="sk sk-line" style={{ width: "80%" }}></div>
            <div className="sk sk-line" style={{ width: "60%" }}></div>
            <div className="sk sk-line" style={{ width: "75%" }}></div>
          </div>
          <div className="sk-card sk-paper">
            <div className="sk sk-line" style={{ width: "35%" }}></div>
            <div className="sk sk-title"></div>
            <div className="sk sk-line"></div>
            <div className="sk sk-line" style={{ width: "85%" }}></div>
            <div className="sk sk-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
