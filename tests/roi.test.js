import { test } from 'node:test';
import assert from 'node:assert/strict';
import { model, SAVING } from '../src/lib/roi-model.js';

const agency = { invest: 15000, months: 12, traffic: 8000, cr0: 1, cr1: 1.3, ticket: 120, docs: 40, rate: 35, hpd: 1.5, ramp: 2, incl: true };
const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);

test('time savings are 85% of manual drafting hours', () => {
  assert.equal(SAVING, 0.85);
});

test('agency scenario: revenue, uplift and savings are computed from the inputs', () => {
  const m = model(agency);
  close(m.base, 9600);            // 8000 visits x 1% x $120
  close(m.full, 12480);           // 8000 visits x 1.3% x $120
  close(m.upl, 2880);
  close(m.hMan, 60);              // 40 docs x 1.5 h
  close(m.hWith, 9);              // 15% of the manual hours remain
  close(m.save, 1785);            // 51 h saved x $35
  close(m.steady, 4665);          // monthly gain at full effect
});

test('agency scenario: ramp-up, net profit, ROI and break-even', () => {
  const m = model(agency);
  close(m.gain[1], 2880 * 0.5 + 1785);     // month 1 reaches half of the uplift (ramp = 2)
  close(m.gain[2], 4665);
  close(m.net, -15000 + 3225 + 11 * 4665); // 39,540
  close(m.net, 39540);
  close(m.roi, 39540 / 15000 * 100);
  close(m.be, 3 + 2445 / 4665);            // crosses zero during month 4
  close(m.totalGain, 54540);
});

test('cumulative position starts at -investment and has one entry per month', () => {
  const m = model(agency);
  assert.equal(m.cum.length, agency.months + 1);
  assert.equal(m.cum[0], -agency.invest);
  for (let i = 1; i <= agency.months; i++) close(m.cum[i], m.cum[i - 1] + m.gain[i]);
});

test('switching time savings off removes them from the monthly gain', () => {
  const m = model({ ...agency, incl: false });
  assert.equal(m.save, 0);
  close(m.steady, 2880);
});

test('no ramp-up means the full uplift from month 1', () => {
  const m = model({ ...agency, ramp: 0, incl: false });
  close(m.gain[1], 2880);
  close(m.net, -15000 + 12 * 2880);
});

test('an optimized rate below the current one never pays back', () => {
  const m = model({ ...agency, cr0: 2, cr1: 1.5, incl: false });
  assert.ok(m.upl < 0);
  assert.equal(m.be, Infinity);
});

test('break-even beyond the period is extrapolated from the steady monthly gain', () => {
  const m = model({ invest: 100000, months: 6, traffic: 2000, cr0: 1, cr1: 1.1, ticket: 50, docs: 10, rate: 20, hpd: 1, ramp: 1, incl: true });
  assert.ok(m.be > m.N);
  close(m.be, m.N + (-m.net) / m.steady);
});

test('revenue comparison covers month, period and 12 months', () => {
  const m = model(agency);
  close(m.rev.month.w0, 9600);
  close(m.rev.month.w1, 12480);
  close(m.rev.period.w0, 9600 * 12);
  close(m.rev.year.w0, 9600 * 12);
  assert.ok(m.rev.year.w1 > m.rev.year.w0);
});
