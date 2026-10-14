/* Legacy (framework-agnostic) behaviour module: roi. Started from src/legacy/start.js after React mounts. */
import { SAVING, model } from '../lib/roi-model.js';

export function initRoi() {
  (function () {
    if (!document.getElementById('roi-results')) return;

    function $(id) { return document.getElementById(id); }
    var T = function (s, v) { return window.EL.t(s, v); };
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var LS = 'el-roi';

    /* ====================== state ====================== */
    var DEF = { cur: 'USD', invest: 15000, months: 12, traffic: 8000, cr0: 1, cr1: 1.3, ticket: 120, docs: 40, rate: 35, hpd: 1.5, ramp: 2, incl: true, tf: 'period' };
    var PRESETS = {
      solo:   { invest: 4000,   months: 12, traffic: 3000,  cr0: 0.8, cr1: 1.1, ticket: 90,  docs: 20,  rate: 30, hpd: 1.5, ramp: 2 },
      agency: { invest: 15000,  months: 12, traffic: 8000,  cr0: 1,   cr1: 1.3, ticket: 120, docs: 40,  rate: 35, hpd: 1.5, ramp: 2 },
      scale:  { invest: 150000, months: 18, traffic: 90000, cr0: 1.4, cr1: 1.8, ticket: 240, docs: 160, rate: 55, hpd: 2,   ramp: 3 }
    };
    var FIELDS = [
      { k: 'invest',  id: 'roi-invest',  min: 1000, max: 250000, step: 500, f: 'money' },
      { k: 'months',  id: 'roi-months',  min: 3,    max: 36,     step: 1,   f: 'int' },
      { k: 'traffic', id: 'roi-traffic', min: 1000, max: 250000, step: 500, f: 'int' },
      { k: 'cr0',     id: 'roi-cr0',     min: 0.1,  max: 10,     step: 0.1, f: 'pct' },
      { k: 'cr1',     id: 'roi-cr1',     min: 0.1,  max: 15,     step: 0.1, f: 'pct' },
      { k: 'ticket',  id: 'roi-ticket',  min: 10,   max: 5000,   step: 10,  f: 'money' },
      { k: 'docs',    id: 'roi-docs',    min: 5,    max: 200,    step: 1,   f: 'int' },
      { k: 'rate',    id: 'roi-rate',    min: 15,   max: 100,    step: 1,   f: 'money' },
      { k: 'hpd',     id: 'roi-hpd',     min: 0.5,  max: 4,      step: 0.25, f: 'dec' },
      { k: 'ramp',    id: 'roi-ramp',    min: 0,    max: 6,      step: 1,   f: 'int' }
    ];
    var S = {};
    Object.keys(DEF).forEach(function (k) { S[k] = DEF[k]; });
    function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
    function snap(v, f) {
      var d = String(f.step).indexOf('.') > -1 ? String(f.step).split('.')[1].length : 0;
      return +(Math.round(v / f.step) * f.step).toFixed(d);
    }
    try {
      var raw = localStorage.getItem(LS);
      if (raw) {
        var o = JSON.parse(raw);
        Object.keys(DEF).forEach(function (k) { if (o && typeof o[k] === typeof DEF[k]) { S[k] = o[k]; } });
        if (S.cur !== 'USD' && S.cur !== 'EUR') { S.cur = 'USD'; }
        if (['month', 'period', 'year'].indexOf(S.tf) < 0) { S.tf = 'period'; }
        FIELDS.forEach(function (f) { S[f.k] = snap(clamp(+S[f.k] || DEF[f.k], f.min, f.max), f); });
      }
    } catch (e) { /* storage unavailable or corrupt: keep defaults */ }
    function persist() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { /* ignore */ } }

    /* ====================== formatting ====================== */
    function es() { return window.EL.getLang() === 'es'; }
    function tsep() { return es() ? '.' : ','; }
    function dsep() { return es() ? ',' : '.'; }
    function grp(n) { return String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, tsep()); }
    function trimZ(s) { return s.indexOf('.') < 0 ? s : s.replace(/0+$/, '').replace(/\.$/, ''); }
    function sym() { return S.cur === 'EUR' ? '€' : '$'; }
    function money(n, o) {
      o = o || {};
      var r = Math.round(n), neg = r < 0, a = Math.abs(n), body;
      if (o.compact && a >= 1000) {
        var div = a >= 1e6 ? 1e6 : 1e3, v = a / div;
        body = trimZ(v.toFixed(v >= 100 ? 0 : 1)).replace('.', dsep()) + (a >= 1e6 ? 'M' : 'k');
      } else { body = grp(a); }
      var sign = neg ? '−' : (o.signed && r > 0 ? '+' : '');
      return es() ? sign + body + ' ' + sym() : sign + sym() + body;
    }
    function num(n, d) {                       /* locale decimal with grouping */
      var s = Math.abs(n).toFixed(d), p = s.split('.');
      return (n < 0 && +s !== 0 ? '−' : '') + p[0].replace(/\B(?=(\d{3})+(?!\d))/g, tsep()) + (p[1] ? dsep() + p[1] : '');
    }
    function pct(n, d) { return num(n, d === undefined ? (Math.abs(n) >= 100 ? 0 : 1) : d) + '%'; }
    function mo(n) { return num(n, 1); }
    function fieldText(f, v) {
      if (f.f === 'money') return money(v, { compact: true });
      if (f.f === 'pct') return pct(v, 1);
      if (f.f === 'dec') return trimZ(String(v)).replace('.', dsep());
      return grp(v);
    }

    /* ====================== model: see src/lib/roi-model.js ====================== */
    /* ====================== tweened view state ====================== */
    var NUM = ['net', 'roi', 'steady', 'rw0', 'rw1'];
    var shown = null, target = null, raf = null, last = null;

    function buildTarget(m) {
      var r = m.rev[S.tf];
      return { N: m.N, net: m.net, roi: m.roi, be: m.be, steady: m.steady, rw0: r.w0, rw1: r.w1, cum: m.cum };
    }
    function tweenTo(t) {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      var from = shown;
      if (!from || reduce) { shown = t; paint(t); return; }
      var t0 = performance.now(), dur = 420, same = from.cum.length === t.cum.length;
      (function frame(now) {
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3), cur = { N: t.N };
        NUM.forEach(function (key) { cur[key] = from[key] + (t[key] - from[key]) * e; });
        cur.be = (isFinite(from.be) && isFinite(t.be)) ? from.be + (t.be - from.be) * e : t.be;
        cur.cum = same ? t.cum.map(function (v, i) { return from.cum[i] + (v - from.cum[i]) * e; }) : t.cum;
        shown = cur; paint(cur);
        if (k < 1) { raf = requestAnimationFrame(frame); } else { shown = t; paint(t); raf = null; }
      })(t0);
    }

    /* ====================== paint (runs every animation frame) ====================== */
    function beText(be) { return isFinite(be) ? (be > 120 ? '120+' : mo(be)) : '—'; }
    function paint(v) {
      var neg = v.net < 0;
      var big = function (n) { return money(n, { compact: Math.abs(n) >= 1e6 }); };
      $('k-net').textContent = big(v.net);
      $('k-roi').textContent = pct(v.roi);
      $('k-be').textContent = beText(v.be) + (isFinite(v.be) ? ' ' + T('months') : '');
      $('k-gain').textContent = big(v.steady);
      $('kpi-net').setAttribute('data-tone', neg ? 'neg' : 'pos');
      $('kpi-roi').setAttribute('data-tone', v.roi < 0 ? 'neg' : 'pos');
      $('kpi-gain').setAttribute('data-tone', v.steady < 0 ? 'neg' : 'pos');
      $('rb-roi').textContent = pct(v.roi);
      $('rb-net').textContent = money(v.net, { compact: true });
      $('rb-be').textContent = beText(v.be) + (isFinite(v.be) ? ' ' + T('mo') : '');

      /* revenue comparison */
      var upl = v.rw1 - v.rw0, max = Math.max(v.rw0, v.rw1, 1);
      $('rv0-val').textContent = money(v.rw0);
      $('rv1-val').textContent = money(v.rw1);
      $('rv0-bar').style.width = (v.rw0 / max * 100) + '%';
      $('rv1-base').style.width = (Math.min(v.rw0, v.rw1) / max * 100) + '%';
      $('rv1-upl').style.width = (Math.max(0, upl) / max * 100) + '%';
      var d = $('rv-delta'), p = v.rw0 > 0 ? upl / v.rw0 * 100 : 0;
      d.textContent = T('Revenue difference: {d} ({p})', { d: money(upl, { signed: true }), p: (p > 0 ? '+' : '') + pct(p) });
      d.setAttribute('data-tone', upl < 0 ? 'neg' : 'pos');

      drawChart(v);
    }

    /* ====================== static render (state-driven, CSS-transitioned) ====================== */
    function renderStatic(m) {
      var st, N = m.N, none = m.steady <= 0 || !isFinite(m.be);
      if (none) { st = ['none', T('No payback: with these inputs the monthly gain is zero or negative. Raise the optimized conversion rate or the average ticket.')]; }
      else if (m.be <= N * 0.5) { st = ['great', T('Strong case: the investment is recovered in {be} months.', { be: mo(m.be) })]; }
      else if (m.be <= N) { st = ['ok', T('On track: break-even at month {be}, within your {n}-month period.', { be: mo(m.be), n: N })]; }
      else { st = ['late', T('Slow payback: break-even takes about {be} months, beyond your {n}-month period.', { be: beText(m.be), n: N })]; }
      var sEl = $('roi-status'); sEl.setAttribute('data-state', st[0]); $('roi-status-text').textContent = st[1];

      $('k-net-sub').textContent = T('over {n} months', { n: N });
      $('k-be-sub').textContent = none ? T('Not reached') : (m.be <= N ? T('Month {m} of {n}', { m: mo(m.be), n: N }) : T('After your {n}-month period', { n: N }));

      /* break-even bar */
      var within = isFinite(m.be) && m.be <= N, pos = within ? m.be / N * 100 : 100;
      var fill = $('be-fill'); fill.style.width = (none ? 0 : pos) + '%'; fill.setAttribute('data-state', within ? 'ok' : 'late');
      var mk = $('be-marker');
      mk.hidden = !within; mk.style.left = pos + '%';
      $('be-marker-label').textContent = isFinite(m.be) ? T('Month {m}', { m: mo(m.be) }) : '';
      mk.setAttribute('data-edge', pos > 78 ? 'right' : (pos < 14 ? 'left' : 'mid'));
      $('be-t0').textContent = '0'; $('be-t1').textContent = String(Math.round(N / 2)); $('be-t2').textContent = String(N) + ' ' + T('mo');
      var rec = m.I > 0 ? clamp(m.totalGain / m.I * 100, 0, 9999) : 0;
      $('be-recovered').textContent = T('Investment recovered by month {n}: {p}', { n: N, p: pct(rec, 0) });
      $('be-track').setAttribute('aria-label', none ? T('Break-even not reached') : T('Break-even at month {m} of {n}', { m: mo(m.be), n: N }));
      $('be-caption').textContent = none ? T('The investment is not recovered with the current inputs.')
        : (within ? T('You pass the break-even point at month {m}; from then on every month adds {g} of net gain.', { m: mo(m.be), g: money(m.steady) })
                  : T('Only {p} of the investment is recovered within {n} months. At the current pace break-even takes about {be} months.', { p: pct(rec, 0), n: N, be: beText(m.be) }));

      /* gain breakdown */
      var upl = m.upl * m.N, sav = m.save * m.N, tot = Math.max(1, Math.abs(m.upl) + m.save);
      $('bd-upl-val').textContent = money(upl, { signed: true });
      $('bd-sav-val').textContent = money(sav, { signed: true });
      $('bd-bar-upl').style.width = (Math.max(0, m.upl) / tot * 100) + '%';
      $('bd-bar-sav').style.width = (m.save / tot * 100) + '%';
      $('bd-h0').textContent = num(m.hMan, m.hMan % 1 ? 1 : 0); $('bd-h1').textContent = num(m.hWith, 1);
      $('bd-hb0').style.width = '100%'; $('bd-hb1').style.width = ((1 - SAVING) * 100) + '%';
      $('bd-hours').style.opacity = S.incl ? '1' : '.4';
      $('bd-note').hidden = S.incl;

      /* cta hint + a11y */
      $('roi-hint').textContent = m.I > 0 ? T('Every {unit} invested returns about {ret} over {n} months.', { unit: money(1), ret: (es() ? '' : sym()) + num(m.totalGain / m.I, 1) + (es() ? ' ' + sym() : ''), n: N }) : '';
      clearTimeout(srT);
      srT = setTimeout(function () {
        $('roi-sr').textContent = T('Net profit {net}, ROI {roi}, break-even {be} months.', { net: money(m.net), roi: pct(m.roi), be: beText(m.be) });
      }, 600);
    }
    var srT = null;

    /* ====================== chart ====================== */
    var chart = $('roi-chart'), svg = $('roi-svg'), tip = $('roi-tip');
    var VB = { w: 560, h: 260 }, M = { l: 58, r: 16, t: 18, b: 30 };
    var geo = null, active = null;

    svg.innerHTML =
      '<defs>' +
      '<linearGradient id="rcPos" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--atom-a,#00F2FE)" stop-opacity=".42"/><stop offset="1" style="stop-color:var(--atom-a,#00F2FE)" stop-opacity=".03"/></linearGradient>' +
      '<linearGradient id="rcNeg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FB7185" stop-opacity=".5"/><stop offset="1" stop-color="#FB7185" stop-opacity=".04"/></linearGradient>' +
      '<clipPath id="rcClipPos"><rect id="rcClipPosR" x="0" y="0" width="1" height="1"/></clipPath>' +
      '<clipPath id="rcClipNeg"><rect id="rcClipNegR" x="0" y="0" width="1" height="1"/></clipPath>' +
      '</defs>' +
      '<g id="rc-grid"></g>' +
      '<path id="rc-area-neg" clip-path="url(#rcClipNeg)" fill="url(#rcNeg)"></path>' +
      '<path id="rc-area-pos" clip-path="url(#rcClipPos)" fill="url(#rcPos)"></path>' +
      '<path id="rc-line" fill="none" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" style="stroke:var(--atom-a,#00F2FE)"></path>' +
      '<g id="rc-be"></g>' +
      '<g id="rc-hover" visibility="hidden"><line id="rc-xh" stroke="#fff" stroke-opacity=".35" stroke-dasharray="3 3"></line><circle id="rc-dot" r="5" stroke="#090D16" stroke-width="2" style="fill:var(--atom-a,#00F2FE)"></circle></g>';

    function niceTicks(lo, hi, count) {
      var span = (hi - lo) || 1, raw = span / count, pow = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), err = raw / pow;
      var step = pow * (err >= 7.5 ? 10 : err >= 3.5 ? 5 : err >= 1.5 ? 2 : 1);
      var start = Math.floor(lo / step) * step, end = Math.ceil(hi / step) * step, t = [];
      for (var v = start; v <= end + step / 2; v += step) { t.push(+v.toFixed(6)); }
      return t;
    }
    function sizeChart() {
      var w = chart.clientWidth || 560;
      VB.w = w; VB.h = Math.max(220, Math.min(300, Math.round(w * 0.5)));
      svg.setAttribute('viewBox', '0 0 ' + VB.w + ' ' + VB.h);
      svg.setAttribute('width', VB.w); svg.setAttribute('height', VB.h);
    }
    function drawChart(v) {
      var W = VB.w, H = VB.h, pw = W - M.l - M.r, ph = H - M.t - M.b, N = v.N, cum = v.cum, i;
      var lo = Math.min(Math.min.apply(null, cum), 0), hi = Math.max(Math.max.apply(null, cum), 0);
      if (hi === lo) { hi = lo + 1; }
      var ticks = niceTicks(lo, hi, 4), y0 = ticks[0], y1 = ticks[ticks.length - 1];
      function X(m) { return M.l + (m / N) * pw; }
      function Y(val) { return M.t + (1 - (val - y0) / (y1 - y0)) * ph; }
      geo = { X: X, Y: Y, N: N, cum: cum, W: W, H: H };
      var zero = Y(0), g = '';
      for (i = 0; i < ticks.length; i++) {
        var ty = Y(ticks[i]);
        g += '<line x1="' + M.l + '" x2="' + (W - M.r) + '" y1="' + ty + '" y2="' + ty + '" stroke="#fff" stroke-opacity="' + (ticks[i] === 0 ? '.32' : '.08') + '"/>' +
             '<text x="' + (M.l - 8) + '" y="' + (ty + 4) + '" text-anchor="end" font-size="11" fill="#9AA6BD">' + esc(money(ticks[i], { compact: true })) + '</text>';
      }
      var xs = Math.max(1, Math.ceil(N / 6));
      for (var m = 0; m <= N; m += xs) {
        g += '<text x="' + X(m) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="11" fill="#9AA6BD">' + m + '</text>';
      }
      g += '<text x="' + (W - M.r) + '" y="' + (H - 10) + '" text-anchor="end" font-size="11" fill="#9AA6BD" opacity="0">.</text>';
      var inv = Y(cum[0]);
      g += '<line x1="' + M.l + '" x2="' + (W - M.r) + '" y1="' + inv + '" y2="' + inv + '" stroke="#FB7185" stroke-opacity=".7" stroke-dasharray="2 4"/>';
      $('rc-grid').innerHTML = g;

      var pts = [], area;
      for (i = 0; i <= N; i++) { pts.push(X(i).toFixed(1) + ' ' + Y(cum[i]).toFixed(1)); }
      var line = 'M' + pts.join(' L');
      area = line + ' L' + X(N).toFixed(1) + ' ' + zero.toFixed(1) + ' L' + X(0).toFixed(1) + ' ' + zero.toFixed(1) + ' Z';
      $('rc-line').setAttribute('d', line);
      $('rc-area-pos').setAttribute('d', area); $('rc-area-neg').setAttribute('d', area);
      var cp = $('rcClipPosR'), cn = $('rcClipNegR');
      cp.setAttribute('x', M.l); cp.setAttribute('y', M.t); cp.setAttribute('width', pw); cp.setAttribute('height', Math.max(0, zero - M.t));
      cn.setAttribute('x', M.l); cn.setAttribute('y', zero); cn.setAttribute('width', pw); cn.setAttribute('height', Math.max(0, M.t + ph - zero));

      var be = '';
      if (isFinite(v.be) && v.be <= N) {
        var bx = X(v.be), anchor = bx > W - 120 ? 'end' : 'start', lx = anchor === 'end' ? bx - 10 : bx + 10;
        be = '<line x1="' + bx + '" x2="' + bx + '" y1="' + M.t + '" y2="' + (M.t + ph) + '" stroke="#FCD34D" stroke-opacity=".55" stroke-dasharray="4 4"/>' +
             '<circle cx="' + bx + '" cy="' + zero + '" r="9" fill="#FCD34D" fill-opacity=".2"/><circle cx="' + bx + '" cy="' + zero + '" r="5" fill="#FCD34D" stroke="#090D16" stroke-width="2"/>' +
             '<text x="' + lx + '" y="' + (zero - 12) + '" text-anchor="' + anchor + '" font-size="11.5" font-weight="600" fill="#FCD34D">' + esc(T('Break-even') + ': ' + T('Month {m}', { m: mo(v.be) })) + '</text>';
      }
      $('rc-be').innerHTML = be;
      if (active !== null) { showActive(active); }
    }

    function monthAt(clientX) {
      var r = svg.getBoundingClientRect();
      if (!geo || !r.width) return null;
      var px = (clientX - r.left) * (VB.w / r.width), pw = VB.w - M.l - M.r;
      return clamp(Math.round((px - M.l) / pw * geo.N), 0, geo.N);
    }
    function showActive(m) {
      if (!geo || !last) return;
      active = clamp(m, 0, geo.N);
      var x = geo.X(active), y = geo.Y(geo.cum[active]);
      $('rc-hover').setAttribute('visibility', 'visible');
      var xh = $('rc-xh'); xh.setAttribute('x1', x); xh.setAttribute('x2', x); xh.setAttribute('y1', M.t); xh.setAttribute('y2', VB.h - M.b);
      var dot = $('rc-dot'); dot.setAttribute('cx', x); dot.setAttribute('cy', y);
      var net = last.cum[active], gain = last.gain[active];
      tip.innerHTML = '<b>' + esc(active === 0 ? T('Start') : T('Month {m}', { m: active })) + '</b>' +
        '<span>' + esc(T('Net position')) + ': <i>' + esc(money(net)) + '</i></span>' +
        (active > 0 ? '<span>' + esc(T('Monthly gain')) + ': <i>' + esc(money(gain)) + '</i></span>' : '<span>' + esc(T('Initial investment')) + ': <i>' + esc(money(last.I)) + '</i></span>');
      tip.hidden = false;
      var tw = tip.offsetWidth || 150;
      tip.style.left = clamp(x, tw / 2 + 4, VB.w - tw / 2 - 4) + 'px';
      $('roi-chart-sr').textContent = T('Month {m}: net position {v}.', { m: active, v: money(net) });
    }
    function hideActive() { active = null; $('rc-hover').setAttribute('visibility', 'hidden'); tip.hidden = true; }

    chart.addEventListener('pointermove', function (e) { var m = monthAt(e.clientX); if (m !== null) { showActive(m); } });
    chart.addEventListener('pointerdown', function (e) { var m = monthAt(e.clientX); if (m !== null) { showActive(m); } });
    chart.addEventListener('pointerleave', function () { if (document.activeElement !== chart) { hideActive(); } });
    chart.addEventListener('blur', hideActive);
    chart.addEventListener('focus', function () { if (geo && active === null) { showActive(Math.min(geo.N, Math.max(1, Math.round(geo.N / 2)))); } });
    chart.addEventListener('keydown', function (e) {
      if (!geo) return;
      var cur = active === null ? 0 : active, nxt = null;
      if (e.key === 'ArrowRight') nxt = cur + 1; else if (e.key === 'ArrowLeft') nxt = cur - 1;
      else if (e.key === 'Home') nxt = 0; else if (e.key === 'End') nxt = geo.N; else return;
      e.preventDefault(); showActive(nxt);
    });
    if (window.ResizeObserver) {
      new ResizeObserver(function () { var w = chart.clientWidth; if (w && Math.abs(w - VB.w) > 1) { sizeChart(); if (shown) { drawChart(shown); } } }).observe(chart);
    }
    sizeChart();

    /* ====================== inputs ====================== */
    function syncField(f) {
      var rng = $(f.id), nm = $(f.id + '-num');
      rng.value = S[f.k];
      if (document.activeElement !== nm) { nm.value = S[f.k]; }
      rng.style.setProperty('--p', ((S[f.k] - f.min) / (f.max - f.min) * 100) + '%');
      $(f.id + '-min').textContent = fieldText(f, f.min); $(f.id + '-max').textContent = fieldText(f, f.max);
      rng.setAttribute('aria-valuetext', fieldText(f, S[f.k]));
    }
    function syncAll() {
      FIELDS.forEach(syncField);
      Array.prototype.forEach.call(document.querySelectorAll('[data-cur-sym]'), function (e) { e.textContent = sym(); });
      Array.prototype.forEach.call(document.querySelectorAll('[data-cur]'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cur') === S.cur ? 'true' : 'false'); });
      if (S.months === 12 && S.tf === 'year') { S.tf = 'period'; }
      var labs = { month: T('Monthly'), period: T('{n} months', { n: S.months }), year: T('12 months') };
      Array.prototype.forEach.call(document.querySelectorAll('[data-tf]'), function (b) {
        var k = b.getAttribute('data-tf'); b.textContent = labs[k]; b.hidden = (k === 'year' && S.months === 12);
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-tf]'), function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-tf') === S.tf ? 'true' : 'false'); });
      Array.prototype.forEach.call(document.querySelectorAll('[data-preset]'), function (b) {
        var p = PRESETS[b.getAttribute('data-preset')], same = Object.keys(p).every(function (k) { return S[k] === p[k]; });
        b.setAttribute('aria-pressed', same ? 'true' : 'false');
      });
      $('roi-incl').checked = S.incl;
      $('roi-time').setAttribute('data-off', S.incl ? 'false' : 'true');
      $('roi-time').inert = !S.incl;
      var warn = S.cr1 < S.cr0, up = S.cr0 > 0 ? (S.cr1 / S.cr0 - 1) * 100 : 0, h = $('roi-cr-hint');
      h.textContent = warn ? T('The optimized rate is below the current rate: the project would lose revenue.')
        : T('Relative uplift: {u} ({d} pp)', { u: (up > 0 ? '+' : '') + pct(up), d: (S.cr1 - S.cr0 >= 0 ? '+' : '−') + num(Math.abs(S.cr1 - S.cr0), 1) });
      h.setAttribute('data-tone', warn ? 'neg' : 'pos');
    }

    function update(noTween) {
      var m = model(S);
      last = m;
      syncAll();
      renderStatic(m);
      target = buildTarget(m);
      if (noTween) { shown = null; }
      tweenTo(target);
      persist();
    }

    FIELDS.forEach(function (f) {
      var rng = $(f.id), nm = $(f.id + '-num');
      rng.addEventListener('input', function () { S[f.k] = snap(+rng.value, f); nm.value = S[f.k]; update(); });
      nm.addEventListener('input', function () { var v = parseFloat(nm.value); if (isNaN(v)) return; S[f.k] = snap(clamp(v, f.min, f.max), f); update(); });
      nm.addEventListener('change', function () { var v = parseFloat(nm.value); if (isNaN(v)) { v = S[f.k]; } S[f.k] = snap(clamp(v, f.min, f.max), f); nm.value = S[f.k]; update(); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-cur]'), function (b) {
      b.addEventListener('click', function () { S.cur = b.getAttribute('data-cur'); update(true); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-tf]'), function (b) {
      b.addEventListener('click', function () { S.tf = b.getAttribute('data-tf'); update(); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-preset]'), function (b) {
      b.addEventListener('click', function () {
        var p = PRESETS[b.getAttribute('data-preset')];
        Object.keys(p).forEach(function (k) { S[k] = p[k]; });
        S.incl = true; hideActive(); update();
      });
    });
    $('roi-incl').addEventListener('change', function () { S.incl = !!$('roi-incl').checked; update(); });
    $('roi-reset').addEventListener('click', function () {
      var cur = S.cur; Object.keys(DEF).forEach(function (k) { S[k] = DEF[k]; }); S.cur = cur; hideActive(); update();
    });

    /* ====================== summary + export ====================== */
    function summaryText() {
      var m = last, L = [];
      L.push(T('Empiric Labs ROI summary') + ' (' + S.cur + ')');
      L.push(T('Initial investment') + ': ' + money(S.invest) + ' | ' + T('Amortization period (months)') + ': ' + S.months);
      L.push(T('Estimated monthly traffic (visits)') + ': ' + grp(S.traffic) + ' | ' + T('Conversion rate') + ': ' + pct(S.cr0) + ' → ' + pct(S.cr1) + ' | ' + T('Average ticket per customer') + ': ' + money(S.ticket));
      L.push(T('Monthly revenue') + ': ' + money(m.base) + ' → ' + money(m.full) + ' (' + money(m.upl, { signed: true }) + ')');
      if (S.incl) { L.push(T('Time savings') + ': ' + money(m.save) + ' / ' + T('month') + ' (' + S.docs + ' ' + T('documents') + ', ' + num(S.hpd, 2) + ' h, 85%)'); }
      L.push(T('Projected net profit') + ': ' + money(m.net) + ' | ROI: ' + pct(m.roi) + ' | ' + T('Break-even') + ': ' + (isFinite(m.be) ? mo(m.be) + ' ' + T('months') : '—'));
      return L.join('\n');
    }
    function csvText() {
      var m = last, rows = ['month,monthly_gain,cumulative_gain,net_position,revenue_without,revenue_with,currency'], cg = 0;
      for (var i = 0; i <= m.N; i++) {
        cg += (i > 0 ? m.gain[i] : 0);
        rows.push([i, m.gain[i].toFixed(2), cg.toFixed(2), m.cum[i].toFixed(2), (m.base * i).toFixed(2), ((i === 0 ? 0 : (m.base * i + (m.cum[i] + m.I - m.save * i)))).toFixed(2), S.cur].join(','));
      }
      return rows.join('\n');
    }
    function legacyCopy(t) {
      var ta = document.createElement('textarea'), ok = false;
      ta.value = t; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta); return ok;
    }
    function copyText(t) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return legacyCopy(t); });
      }
      return Promise.resolve(legacyCopy(t));
    }
    var msgT = null;
    function say(text, bad) {
      var el = $('roi-act-msg'); el.textContent = text; el.setAttribute('data-bad', bad ? 'true' : 'false');
      clearTimeout(msgT); msgT = setTimeout(function () { el.textContent = ''; }, 5000);
    }
    $('roi-copy').addEventListener('click', function () {
      copyText(summaryText()).then(function (ok) { say(ok ? T('Summary copied to the clipboard.') : T('Could not access the clipboard. Select the text manually.'), !ok); });
    });
    $('roi-csv').addEventListener('click', function () {
      var csv = csvText(), downloaded = false;
      try {
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }), url = URL.createObjectURL(blob), a = document.createElement('a');
        a.href = url; a.download = 'empiric-labs-roi.csv'; document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500); downloaded = true;
      } catch (e) { downloaded = false; }
      copyText(csv).then(function (ok) {
        say(ok ? T('CSV exported and also copied to your clipboard.') : (downloaded ? T('CSV exported.') : T('Could not export the CSV in this browser.')), !ok && !downloaded);
      });
    });

    /* ====================== compact bar for small screens ====================== */
    var inputsOn = false, resultsOn = false, bar = $('roi-bar');
    function syncBar() {
      var show = inputsOn && !resultsOn;
      bar.setAttribute('data-show', show ? 'true' : 'false');
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      $('rb-go').tabIndex = show ? 0 : -1;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { inputsOn = en[0].isIntersecting; syncBar(); }, { threshold: 0.15 }).observe($('roi-inputs'));
      new IntersectionObserver(function (en) { resultsOn = en[0].isIntersecting; syncBar(); }, { threshold: 0.05 }).observe($('roi-results'));
    }
    $('rb-go').addEventListener('click', function () { $('roi-results').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); });

    document.addEventListener('langchange', function () { update(true); if (shown) { drawChart(shown); } });
    update(true);
  })();
  
}
