// Pure ROI model for the calculator (no DOM). All figures are derived from the inputs.
//
//  revenue            = traffic x conversion rate x average ticket
//  uplift (monthly)   = revenue(optimized rate) - revenue(current rate), reached after a linear ramp-up
//  time savings       = documents per month x manual hours per document x 85% x hourly cost
//  net position (m)   = -investment + sum of monthly gains up to month m
//  ROI                = net position at the end of the period / investment
//  break-even         = month (fractional) where the net position crosses zero
export const SAVING = 0.85;

export function model(p) {
  var N = p.months, I = p.invest;
  var base = p.traffic * p.cr0 / 100 * p.ticket;
  var full = p.traffic * p.cr1 / 100 * p.ticket;
  var upl = full - base;
  var hMan = p.docs * p.hpd, hWith = hMan * (1 - SAVING);
  var save = p.incl ? (hMan - hWith) * p.rate : 0;
  function f(m) { return p.ramp > 0 ? Math.min(1, m / p.ramp) : 1; }
  var cum = [-I], gain = [0], revW = [0], revO = [0], m;
  for (m = 1; m <= Math.max(N, 12); m++) {
    var g = upl * f(m) + save;
    gain.push(g);
    revO.push(base * m);                                   /* cumulative revenue without optimization */
    revW.push((revW[m - 1] || 0) + base + upl * f(m));     /* cumulative revenue with optimization */
    if (m <= N) { cum.push(cum[m - 1] + g); }
  }
  var steady = upl + save, net = cum[N], roi = I > 0 ? net / I * 100 : 0, be = Infinity;
  for (m = 1; m <= N; m++) {
    if (cum[m] >= 0) { be = (m - 1) + (-cum[m - 1]) / gain[m]; break; }
  }
  if (!isFinite(be) && steady > 0) { be = N + (-net) / steady; }
  var up12 = 0; for (m = 1; m <= 12; m++) { up12 += upl * f(m); }
  return {
    N: N, I: I, base: base, full: full, upl: upl, save: save, steady: steady, cum: cum, gain: gain, net: net, roi: roi, be: be,
    hMan: hMan, hWith: hWith, totalGain: net + I,
    rev: {
      month:  { w0: base,        w1: full },
      period: { w0: base * N,    w1: revW[N] },
      year:   { w0: base * 12,   w1: base * 12 + up12 }
    }
  };
}
