export default function Background() {
  return (
    <div id="bg-fx" aria-hidden="true">
      <div className="mesh">
        <div className="depth depth--1">
          <i className="blob b1"></i>
          <i className="blob b3"></i>
          <i className="ribbon ribbon--a"></i>
        </div>
        <div className="depth depth--2">
          <i className="blob b2"></i>
          <i className="blob b5"></i>
        </div>
        <div className="depth depth--3">
          <i className="blob b4"></i>
          <i className="ribbon ribbon--b"></i>
        </div>
      </div>
      <canvas id="bg-canvas"></canvas>
      <div className="bg-vignette"></div>
    </div>
  );
}
