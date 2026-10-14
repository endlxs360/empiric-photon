import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import PromoPlayer from './PromoPlayer';

// Right-hand card of the hero: a tabbed panel with the promo video and the live pipeline preview.
export default function HeroCard() {
  const [tab, setTab] = useState('video');
  const root = useRef(null);

  // Keep the language selector working on text that React swaps in.
  useEffect(() => {
    if (window.EL && root.current) window.EL.apply(root.current);
  }, [tab]);

  return (
    <div data-rv="" className="lg:col-span-5" ref={root}>
      <div className="mx-auto w-full max-w-md lg:max-w-none">
        <div className="hero-tabs" role="tablist" aria-label="Hero preview">
          <button
            type="button"
            role="tab"
            id="hero-tab-video"
            aria-selected={tab === 'video'}
            aria-controls="hero-panel"
            tabIndex={tab === 'video' ? 0 : -1}
            className="hero-tab"
            onClick={() => setTab('video')}
          >
            <Icon name="film" className="h-3.5 w-3.5" />
            <span>Demo video</span>
          </button>
          <button
            type="button"
            role="tab"
            id="hero-tab-pipeline"
            aria-selected={tab === 'pipeline'}
            aria-controls="hero-panel"
            tabIndex={tab === 'pipeline' ? 0 : -1}
            className="hero-tab"
            onClick={() => setTab('pipeline')}
          >
            <Icon name="terminal-square" className="h-3.5 w-3.5" />
            <span>Live pipeline</span>
          </button>
        </div>

        <div className="relative">
          <div className="halo-glow" aria-hidden="true"></div>
          <div className="halo" aria-hidden="true"></div>
          <div id="hero-panel" role="tabpanel" aria-labelledby={`hero-tab-${tab}`}>
            {tab === 'video' ? <PromoPlayer onFallback={() => setTab('pipeline')} /> : <PipelineCard />}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineCard() {
  return (
    <div className="glass-fill hero-card relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Icon name="terminal-square" className="h-4 w-4 text-cyan-neon" />
          <span className="font-mono text-xs text-slate-300" data-no-i18n="">generate_report.py</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-300" data-no-i18n="">200 OK</span>
      </div>
      <div className="px-4 pt-4">
        <p className="mb-2 text-xs font-medium text-[color:var(--muted)]">Input: raw data</p>
        <pre
          data-no-i18n=""
          className="overflow-x-auto rounded-lg border border-white/[0.06] bg-ink p-3 font-mono text-[12px] leading-relaxed text-slate-300"
        >
          <code>
            <span className="text-white/60">{"{"}</span>
            {"\n  "}
            <span className="text-[#7DE9F1]">{"\"client\""}</span>
            {": "}
            <span className="text-[#C9A2FF]">{"\"Northbridge Capital\""}</span>
            {",\n  "}
            <span className="text-[#7DE9F1]">{"\"period\""}</span>
            {": "}
            <span className="text-[#C9A2FF]">{"\"Q3 2026\""}</span>
            {",\n  "}
            <span className="text-[#7DE9F1]">{"\"revenue\""}</span>
            {": [412, 388, 521],\n  "}
            <span className="text-[#7DE9F1]">{"\"notes\""}</span>
            {": "}
            <span className="text-[#C9A2FF]">{"\"unformatted, unreviewed\""}</span>
            {"\n"}
            <span className="text-white/60">{"}"}</span>
          </code>
        </pre>
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-2 text-slate-300">
            <Icon name="bot" className="h-3.5 w-3.5 text-violet-400" />
            {" "}
            Claude Master Prompt + Python
          </span>
          <span className="font-mono text-cyan-neon" data-no-i18n="">2.6 s</span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"
          role="progressbar"
          aria-label="Document generation"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="100"
        >
          <div className="bar-fill h-full rounded-full bg-gradient-to-r from-cyan-neon to-violet-neon"></div>
        </div>
      </div>
      <div className="border-t border-white/[0.08] bg-raised/60 px-4 pb-5 pt-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-medium text-[color:var(--muted)]">
          <Icon name="file-text" className="h-3.5 w-3.5 text-cyan-neon" />
          <span>Output: northbridge_q3_report.docx</span>
        </p>
        <div className="rounded-lg bg-[#F4F6FB] p-4 text-ink shadow-xl shadow-black/40">
          <div className="space-y-2.5">
            <div className="doc-line">
              <p className="text-[13px] font-bold leading-tight">Quarterly Revenue Report</p>
              <p className="text-[10px] text-slate-600">Northbridge Capital, Q3 2026</p>
            </div>
            <div className="doc-line h-px bg-slate-300"></div>
            <div className="doc-line space-y-1.5">
              <div className="h-1.5 w-full rounded bg-slate-300"></div>
              <div className="h-1.5 w-11/12 rounded bg-slate-300"></div>
              <div className="h-1.5 w-4/5 rounded bg-slate-300"></div>
            </div>
            <div className="doc-line flex items-end gap-1.5 pt-1" aria-hidden="true">
              <div className="h-6 w-6 rounded-sm bg-[#7F00FF]/70"></div>
              <div className="h-5 w-6 rounded-sm bg-[#7F00FF]/50"></div>
              <div className="h-8 w-6 rounded-sm bg-[#00B9C4]"></div>
              <span className="ml-2 text-[10px] text-slate-600">Executive summary and charts included</span>
            </div>
            <div className="doc-line space-y-1.5">
              <div className="h-1.5 w-full rounded bg-slate-300"></div>
              <div className="h-1.5 w-2/3 rounded bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
