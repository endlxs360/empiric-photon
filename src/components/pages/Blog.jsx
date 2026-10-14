export default function Blog() {
  return (
    <section id="blog" data-view="blog" data-theme="emerald" className="relative border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-32 lg:pt-16">
        <div data-rv="" className="max-w-2xl">
          <h1 className="h-page">Technical guides and case studies</h1>
          <p className="lead mt-4">
            What we learn automating documents with Claude and Python, explained step by step with code.
          </p>
        </div>
        <aside className="ad-wrap" aria-label="Advertisement" style={{ margin: "2.5rem 0 0" }}>
          <p className="ad-label">Advertisement</p>
          <div
            id="ad-slot-blog-top"
            className="ad-slot ad-slot--leaderboard"
            data-ad-slot="blog-top"
            data-ad-format="leaderboard 728x90 / mobile 320x100"
          >
            <span className="ad-ph">
              Ad space
              <small>Top banner, 728 × 90</small>
            </span>
          </div>
        </aside>
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article data-rv="" data-theme="cyan" className="post post--feature glass group lg:col-span-7 lg:row-span-2">
            <div className="post-cover post-cover--lg" aria-hidden="true">
              <div className="post-glow"></div>
              <pre data-no-i18n="" className="post-code">
                <code>
                  <span className="text-white/60">{"{"}</span>
                  {"\n  "}
                  <span className="text-[#7DE9F1]">{"\"summary\""}</span>
                  {": "}
                  <span className="text-[#C9A2FF]">{"string"}</span>
                  {",\n  "}
                  <span className="text-[#7DE9F1]">{"\"key_points\""}</span>
                  {": ["}
                  <span className="text-[#C9A2FF]">{"string"}</span>
                  {"],\n  "}
                  <span className="text-[#7DE9F1]">{"\"risk\""}</span>
                  {": "}
                  <span className="text-[#C9A2FF]">{"\"high\" | \"medium\" | \"low\""}</span>
                  {"\n"}
                  <span className="text-white/60">{"}"}</span>
                </code>
              </pre>
            </div>
            <div className="post-body">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="post-tag tag-cy">Prompt engineering</span>
                <span className="inline-flex items-center gap-1.5 text-[color:var(--muted)]">
                  <i data-lucide="clock" className="h-3.5 w-3.5" aria-hidden="true"></i>
                  8 min read
                </span>
              </div>
              <h3 className="post-title">
                <a
                  href="#art-prompts"
                  data-doc="art-prompts"
                  className="after:absolute after:inset-0 after:content-['']"
                >How to Structure Master Prompts in Claude for Structured Data Output</a>
              </h3>
              <p className="post-exc">
                Output schemas, tags to separate data from instructions, and Python validation so every response fits your workflow.
              </p>
              <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                <time dateTime="2026-10-06" className="text-[color:var(--muted)]">Oct 6, 2026</time>
                <span className="post-cta">
                  Read article
                  <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </article>
          <article data-rv="" data-theme="violet" className="post post--row glass group lg:col-span-5">
            <div className="post-cover post-cover--sm" aria-hidden="true">
              <div className="post-glow"></div>
              <pre data-no-i18n="" className="post-code">
                <code>
                  <span className="text-[#C9A2FF]">{"from"}</span>
                  {" docx "}
                  <span className="text-[#C9A2FF]">{"import"}</span>
                  {" Document\n\ndoc = Document("}
                  <span className="text-[#7DE9F1]">{"\"template.docx\""}</span>
                  {")\ndoc.add_heading("}
                  <span className="text-[#7DE9F1]">{"\"Q3 Report\""}</span>
                  {", 1)\ndoc.save("}
                  <span className="text-[#7DE9F1]">{"\"report.docx\""}</span>
                  {")"}
                </code>
              </pre>
            </div>
            <div className="post-body">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="post-tag tag-vi">
                  <span data-no-i18n="">Python</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[color:var(--muted)]">
                  <i data-lucide="clock" className="h-3.5 w-3.5" aria-hidden="true"></i>
                  10 min read
                </span>
              </div>
              <h3 className="post-title">
                <a href="#art-docx" data-doc="art-docx" className="after:absolute after:inset-0 after:content-['']">Automating Complex .docx Files with Python</a>
              </h3>
              <p className="post-exc">
                Corporate templates, named styles, tables and headers: how to generate Word documents that don't fall apart.
              </p>
              <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                <time dateTime="2026-09-29" className="text-[color:var(--muted)]">Sep 29, 2026</time>
                <span className="post-cta">
                  Read article
                  <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </article>
          <article data-rv="" data-theme="emerald" className="post post--row glass group lg:col-span-5">
            <div className="post-cover post-cover--sm" aria-hidden="true">
              <div className="post-glow"></div>
              <div className="post-bars">
                <div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Before</span>
                    <span>Manual drafting</span>
                  </div>
                  <div className="pb-track">
                    <div className="pb-fill" style={{ width: "100%", background: "#64748B" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>After</span>
                    <span>Empiric Labs workflow</span>
                  </div>
                  <div className="pb-track">
                    <div
                      className="pb-fill"
                      style={{ width: "30%", background: "linear-gradient(90deg,#00F2FE,#7F00FF)" }}
                    >
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-emerald-300">−15 hours per week</p>
              </div>
            </div>
            <div className="post-body">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="post-tag tag-em">Case study</span>
                <span className="inline-flex items-center gap-1.5 text-[color:var(--muted)]">
                  <i data-lucide="clock" className="h-3.5 w-3.5" aria-hidden="true"></i>
                  6 min read
                </span>
              </div>
              <h3 className="post-title">
                <a href="#art-case" data-doc="art-case" className="after:absolute after:inset-0 after:content-['']">Case Study: How We Saved a Consultancy 15 Hours a Week</a>
              </h3>
              <p className="post-exc">
                From reports and proposals written by hand to an automated workflow: what we built, how we measured it and what we learned.
              </p>
              <div className="mt-auto flex items-center justify-between pt-5 text-sm">
                <time dateTime="2026-09-15" className="text-[color:var(--muted)]">Sep 15, 2026</time>
                <span className="post-cta">
                  Read article
                  <i data-lucide="arrow-up-right" className="h-4 w-4" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </article>
        </div>
        <aside className="ad-wrap" aria-label="Advertisement" style={{ margin: "3rem 0 0" }}>
          <p className="ad-label">Advertisement</p>
          <div
            id="ad-slot-blog-bottom"
            className="ad-slot ad-slot--display"
            data-ad-slot="blog-bottom"
            data-ad-format="display responsive"
          >
            <span className="ad-ph">
              Ad space
              <small>Responsive display ad, up to 970 × 280</small>
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
