/* Legacy (framework-agnostic) behaviour module: bgfx. Started from src/legacy/start.js after React mounts. */

export function initBackground() {
  /* Photon field: a single, adaptive 2D canvas behind the page.
     - drawImage() of pre-rendered glow sprites (no per-frame gradients or shadowBlur)
     - typed arrays, zero allocations per frame, DPR capped, fps capped on weaker devices
     - pauses when the tab is hidden or a modal is open; renders one static frame with reduced motion
     - measures its own cost and steps down (full -> light -> off) if the device struggles */
  (function () {
    var cv = document.getElementById('bg-canvas');
    if (!cv) return;
    var root = document.documentElement;
    var nav = navigator, conn = nav.connection || {};
    var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var cores = nav.hardwareConcurrency || 4, mem = nav.deviceMemory || 4;
    var PALETTES = {
      'home': ['#00F2FE', '#7F00FF'], 'how-it-works': ['#FB7185', '#00F2FE'], 'kits': ['#00F2FE', '#7F00FF'], 'documents': ['#C026D3', '#00F2FE'],
      'playground': ['#00F2FE', '#7F00FF'], 'roi': ['#00F2FE', '#34D399'], 'blog': ['#34D399', '#00F2FE']
    };

    /* quality tiers: 2 = full, 1 = light (fewer particles, 1x DPR, 40 fps cap), 0 = canvas off (mesh only) */
    var tier = (conn.saveData || mem <= 1) ? 0 : ((cores <= 4 || mem <= 4 || window.innerWidth < 768) ? 1 : 2);
    if (tier === 0) { cv.style.display = 'none'; root.setAttribute('data-fx', 'mesh'); return; }

    var ctx = null;
    try { ctx = cv.getContext('2d', { alpha: true, desynchronized: true }); } catch (e) { ctx = null; }
    if (!ctx) { ctx = cv.getContext('2d'); }
    if (!ctx) { cv.style.display = 'none'; return; }

    var MAXN = 110;
    var X = new Float32Array(MAXN), Y = new Float32Array(MAXN), VX = new Float32Array(MAXN), VY = new Float32Array(MAXN);
    var RS = new Float32Array(MAXN), Z = new Float32Array(MAXN), PH = new Float32Array(MAXN), TW = new Float32Array(MAXN), AL = new Float32Array(MAXN);
    var CI = new Uint8Array(MAXN);
    var near = new Uint8Array(10);
    var n = 0, W = 0, H = 0, dpr = 1, sprites = [];
    var px = -9999, py = -9999, pvx = 0, pvy = 0, ptrT = -1e9, R = 170, R2 = R * R;
    var sy = window.scrollY || 0, lastSy = sy;
    var streaks = [], nextStreak = 6000;

    function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
    function rgb(hex) { return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]; }
    function sprite(hex, white) {
      var s = 64, c = document.createElement('canvas'), g = c.getContext('2d'), k = rgb(hex), col = k[0] + ',' + k[1] + ',' + k[2];
      c.width = c.height = s;
      var gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(white ? .3 : .16, white ? 'rgba(255,255,255,.55)' : 'rgba(' + col + ',.95)');
      gr.addColorStop(.5, 'rgba(' + col + ',.2)');
      gr.addColorStop(1, 'rgba(' + col + ',0)');
      g.fillStyle = gr; g.fillRect(0, 0, s, s);
      return c;
    }
    function setPalette() {
      var p = PALETTES[root.getAttribute('data-route')] || PALETTES.home;
      sprites = [sprite(p[0]), sprite(p[1]), sprite('#BFD4FF', true)];
    }
    function seed(i) {
      X[i] = Math.random() * W; Y[i] = Math.random() * H;
      VX[i] = (Math.random() - .5) * 12; VY[i] = (Math.random() - .5) * 12;
      Z[i] = .35 + Math.random() * .65;
      RS[i] = 4 + Math.random() * 9 * Z[i];
      PH[i] = Math.random() * 6.283; TW[i] = .0006 + Math.random() * .0016;
      AL[i] = .14 + Math.random() * .46 * Z[i];
      var r = Math.random(); CI[i] = r < .5 ? 0 : (r < .85 ? 1 : 2);
    }
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, tier === 2 ? 1.5 : 1);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var per = tier === 2 ? 21000 : 34000, k = W < 768 ? .6 : 1, target = clamp(Math.round(W * H / per * k), 16, MAXN);
      for (var i = n; i < target; i++) { seed(i); }
      n = target;
      for (var j = 0; j < n; j++) { if (X[j] > W) X[j] = Math.random() * W; if (Y[j] > H) Y[j] = Math.random() * H; }
      if (reduce) { drawStatic(); }
    }

    /* ---------- frame ---------- */
    var raf = 0, last = 0, lastRaw = 0, emaDt = 16.7, emaWork = 1, frames = 0, running = false;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      var raw = now - lastRaw; lastRaw = now;
      if (document.hidden || root.classList.contains('overflow-hidden')) { last = now; return; }
      var minDt = tier === 2 ? 0 : 24;
      if (now - last < minDt) return;
      var dt = Math.min(now - last, 50) / 1000; last = now;
      var t0 = performance.now();
      step(dt, now);
      emaWork += (performance.now() - t0 - emaWork) * .08;
      emaDt += (Math.min(raw, 100) - emaDt) * .06;
      if (++frames > 100) { adapt(); }
    }
    function adapt() {
      frames = 0;
      if (tier === 2 && (emaDt > 25 || emaWork > 5)) { downgrade(1); }
      else if (tier === 1 && (emaDt > 36 || emaWork > 6)) { downgrade(0); }
    }
    function downgrade(to) {
      tier = to; emaDt = 16.7; emaWork = 1;
      if (to === 0) { stop(); cv.classList.remove('is-on'); cv.style.display = 'none'; root.setAttribute('data-fx', 'mesh'); return; }
      streaks.length = 0; root.setAttribute('data-fx', 'light'); resize();
    }
    function step(dt, now) {
      var ds = clamp(sy - lastSy, -60, 60); lastSy = sy;
      var ptrOn = now - ptrT < 2600, nn = 0, i;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < n; i++) {
        var x = X[i], y = Y[i], z = Z[i];
        var a = Math.sin(x * .0034 + now * .00017 + PH[i]) + Math.cos(y * .0041 - now * .00013);
        var ang = a * 1.55, sp = 9 + 16 * z;
        VX[i] += (Math.cos(ang) * sp - VX[i]) * .7 * dt;
        VY[i] += (Math.sin(ang) * sp - 3 * z - VY[i]) * .7 * dt;
        var boost = 0;
        if (ptrOn) {
          var dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            var d = Math.sqrt(d2) + .001, f = 1 - d / R; f *= f; boost = f;
            VX[i] += (dx / d * 360 - dy / d * 120 + pvx * .35) * f * dt;      /* push away + a little swirl + wake of the pointer */
            VY[i] += (dy / d * 360 + dx / d * 120 + pvy * .35) * f * dt;
            if (nn < 9 && d < R * .8) { near[nn++] = i; }
          }
        }
        x += VX[i] * dt * (.5 + z); y += VY[i] * dt * (.5 + z) - ds * (.12 + .3 * z);
        if (x < -24) x += W + 48; else if (x > W + 24) x -= W + 48;
        if (y < -24) y += H + 48; else if (y > H + 24) y -= H + 48;
        X[i] = x; Y[i] = y;
        var al = AL[i] * (.62 + .38 * Math.sin(now * TW[i] + PH[i])) + boost * .5, s = RS[i] * (1 + boost * .4);
        ctx.globalAlpha = al > .85 ? .85 : al;
        ctx.drawImage(sprites[CI[i]], x - s, y - s, s * 2, s * 2);
      }
      if (nn > 0) {                                                            /* photon beams from the pointer to the nearest particles */
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = .22; ctx.lineWidth = .8; ctx.strokeStyle = '#8CF7FF';
        ctx.beginPath();
        for (i = 0; i < nn; i++) { ctx.moveTo(px, py); ctx.lineTo(X[near[i]], Y[near[i]]); }
        ctx.stroke();
        ctx.globalCompositeOperation = 'lighter';
      }
      if (tier === 2) { streak(dt, now); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      pvx *= .92; pvy *= .92;
      if (!cv.classList.contains('is-on')) { cv.classList.add('is-on'); }
    }
    function streak(dt, now) {                                                 /* an occasional fast photon crossing the screen */
      if (now > nextStreak && streaks.length < 2) {
        var fromLeft = Math.random() < .5, sp = 520 + Math.random() * 280, an = (fromLeft ? 1 : -1) * (.25 + Math.random() * .35);
        streaks.push({ x: fromLeft ? -20 : W + 20, y: Math.random() * H * .6, vx: (fromLeft ? 1 : -1) * Math.cos(an) * sp, vy: Math.abs(Math.sin(an)) * sp * .6, h: [], life: 0 });
        nextStreak = now + 7000 + Math.random() * 7000;
      }
      for (var i = streaks.length - 1; i >= 0; i--) {
        var s = streaks[i]; s.x += s.vx * dt; s.y += s.vy * dt; s.life += dt;
        s.h.push(s.x, s.y); if (s.h.length > 20) { s.h.splice(0, 2); }
        for (var k = 0; k < s.h.length; k += 2) {
          var q = k / s.h.length;
          ctx.globalAlpha = .55 * q * q; var r = 3 + 8 * q;
          ctx.drawImage(sprites[2], s.h[k] - r, s.h[k + 1] - r, r * 2, r * 2);
        }
        if (s.x < -60 || s.x > W + 60 || s.y > H + 60 || s.life > 4) { streaks.splice(i, 1); }
      }
    }
    function drawStatic() {                                                    /* reduced motion: one still frame of dust, no loop */
      if (!sprites.length) { setPalette(); }
      ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < n; i++) { ctx.globalAlpha = AL[i] * .8; ctx.drawImage(sprites[CI[i]], X[i] - RS[i], Y[i] - RS[i], RS[i] * 2, RS[i] * 2); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; cv.classList.add('is-on');
    }

    /* ---------- lifecycle ---------- */
    function start() { if (running || reduce || tier === 0) return; running = true; last = lastRaw = performance.now(); raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    document.addEventListener('visibilitychange', function () { if (document.hidden) { stop(); } else { start(); } });
    var rz = 0; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(resize, 160); });
    window.addEventListener('scroll', function () { sy = window.scrollY || 0; }, { passive: true });
    window.addEventListener('pointermove', function (e) {
      var now = performance.now(); if (ptrT > 0 && now - ptrT < 100) { pvx = clamp((e.clientX - px) * 10, -400, 400); pvy = clamp((e.clientY - py) * 10, -400, 400); }
      px = e.clientX; py = e.clientY; ptrT = now;
    }, { passive: true });
    document.addEventListener('pointerleave', function () { ptrT = -1e9; });
    document.addEventListener('viewchange', function () { setPalette(); if (reduce) { drawStatic(); } });

    function init() {
      setPalette(); resize();
      if (reduce) { drawStatic(); root.setAttribute('data-fx', 'mesh-static'); return; }
      root.setAttribute('data-fx', tier === 2 ? 'full' : 'light');
      start();
    }
    if (root.classList.contains('is-ready')) { init(); } else { document.addEventListener('elready', init, { once: true }); }
    window.BGFX = { get tier() { return tier; }, stop: stop, start: start };
  })();
  
}
