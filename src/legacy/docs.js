/* Legacy (framework-agnostic) behaviour module: docs. Started from src/legacy/start.js after React mounts. */

export function initDocs() {
  (function () {
    var root = document.getElementById('dw');
    if (!root) return;

    /* ---------- utilities ---------- */
    function $(id) { return document.getElementById(id); }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function fmt(s) { return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); }
    function L() { return Array.prototype.join.call(arguments, '\n'); }
    var reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    function sleep(ms) { return new Promise(function (r) { setTimeout(r, reduce ? Math.min(ms, 80) : ms); }); }

    var REF = new Date(2026, 9, 14);   /* reference date of the demo library (Oct 14, 2026) */
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function fdate(iso) { var p = iso.split('-'); return MONTHS[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0]; }
    function daysAgo(iso) { var p = iso.split('-'); return Math.round((REF - new Date(+p[0], +p[1] - 1, +p[2])) / 864e5); }

    var WF = { clip: 'ClipScript AI™', estate: 'Estate Dossier AI™', platform: 'Platform' };
    var STATUS = { draft: 'Draft', approved: 'Approved', synced: 'Synced' };
    var TOOL = { data: 'Input', python: 'Python', claude: 'Claude', word: 'python-docx' };

    var IC = {
      check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
      draft: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
      synced: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/>',
      folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
      file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
      chev: '<path d="M9 18l6-6-6-6"/>',
      down: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
      play: '<path d="M6 4l14 8-14 8z"/>',
      flow: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.2 7.2l7.6 3.6M8.2 16.8l7.6-3.6"/>',
      retry: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>'
    };
    function ic(n, s, w) { s = s || 14; return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="' + (w || 2.2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[n] + '</svg>'; }

    /* =====================================================================
       DOCUMENT DATA
       ===================================================================== */
    var D = {};
    function add(o) { D[o.id] = o; }

    add({ id: 'd-estate-overview', title: 'Estate Dossier: overview', kind: 'Guide', wf: 'estate', status: 'synced', tags: ['workflow', 'docx', 'real-estate'], updated: '2026-10-08', version: '2.1', owner: 'Content Ops',
      summary: 'How loose viewing notes become a formatted luxury dossier in a single run.',
      blocks: [
        { t: 'p', x: 'Estate Dossier AI™ turns loose viewing notes into a formatted `.docx` dossier. One run reads the notes, extracts the facts, drafts the editorial copy against a fixed schema and lays everything out in your corporate template.' },
        { t: 'wf', title: 'Estate dossier run', trigger: 'Agent uploads viewing notes', inputs: ['viewing_notes.txt'], outputs: ['dossier_EST-0142.docx'], steps: '5', runtime: 'About 40 seconds', owner: 'Content Ops' },
        { t: 'h', x: 'How a run works' },
        { t: 'flow', title: 'Dossier pipeline', nodes: [
          { label: 'Ingest notes', kind: 'data', time: '1 s', i: 'viewing_notes.txt', o: 'Raw text', d: 'The notes are loaded as plain text. Nothing needs to be cleaned or restructured first.' },
          { label: 'Extract facts', kind: 'python', time: '2 s', i: 'Raw text', o: 'Facts dictionary', d: 'Python picks out price, area, bedrooms, bathrooms and recognised features. Anything missing is marked as pending instead of guessed.' },
          { label: 'Draft copy', kind: 'claude', time: '18 s', i: 'Facts and master prompt', o: 'JSON draft', d: 'The master prompt asks Claude for a title, an editorial description and a list of key features, in a fixed JSON schema.' },
          { label: 'Validate', kind: 'python', time: '1 s', i: 'JSON draft', o: 'Checked data', d: 'Python parses the JSON, checks every required field and compares prices and areas with the extracted facts.' },
          { label: 'Render .docx', kind: 'word', time: '6 s', i: 'Checked data and template', o: 'dossier.docx', d: 'python-docx fills the corporate template, so styles, tables and headers stay consistent.' }
        ], retry: { from: 3, label: 'If validation fails, the error goes back to Claude. Up to 2 retries.' } },
        { t: 'h', x: 'What the notes can contain' },
        { t: 'ul', items: ['Property type, location, area, bedrooms and bathrooms.', 'Asking price in any of £, €, $ or ¥.', 'Features such as terraces, parking, flooring, views and building services.', 'Internal remarks from the vendor, which stay out of the printed dossier.'] },
        { t: 'note', kind: 'warn', title: 'Pending items are never invented', x: 'A note such as "co-ownership charges to be confirmed" appears in the dossier as **To be confirmed**. The workflow does not fill it in.' },
        { t: 'h', x: 'Run it' },
        { t: 'code', lang: 'python', file: 'run_dossier.py', code: L('from estate_dossier import run', '', 'result = run(', '    notes="viewing_notes.txt",', '    template="corporate_template.docx",', '    output="dossier_EST-0142.docx",', ')', 'print(result.pending)  # ["Energy certificate pending"]') }
      ] });

    add({ id: 'd-estate-schema', title: 'Viewing notes schema', kind: 'Reference', wf: 'estate', status: 'approved', tags: ['schema', 'prompts', 'real-estate'], updated: '2026-10-06', version: '1.4', owner: 'Content Ops',
      summary: 'Fields the master prompt must return, with types and what happens when one is missing.',
      blocks: [
        { t: 'p', x: 'Claude replies with one JSON object. Python rejects the reply if a required field is missing or has the wrong type.' },
        { t: 'table', head: ['Field', 'Type', 'Required', 'Notes'], rows: [
          ['`title`', 'string', 'Yes', 'Type, adjective and location, for example "Luxury Penthouse in Mayfair, London".'],
          ['`property.type`', 'string', 'Yes', 'Penthouse, apartment, loft, villa and so on.'],
          ['`property.area`', 'object', 'Yes', '`value` and `unit` (`sq ft` or `m²`).'],
          ['`property.bedrooms`', 'integer', 'Yes', 'Whole number.'],
          ['`property.bathrooms`', 'number', 'Yes', 'Halves allowed, for example 2.5.'],
          ['`property.price`', 'object', 'No', 'Missing price prints "Price to be confirmed".'],
          ['`features`', 'string[]', 'No', 'Printed in the key features section.'],
          ['`internal_notes`', 'string[]', 'No', 'Never printed in the dossier.']
        ] },
        { t: 'h', x: 'Example reply' },
        { t: 'code', lang: 'json', file: 'reply.json', code: L('{', '  "title": "Luxury Penthouse in Mayfair, London",', '  "property": {', '    "type": "penthouse",', '    "area": { "value": 3200, "unit": "sq ft" },', '    "bedrooms": 4,', '    "bathrooms": 4,', '    "price": { "amount": 8950000, "currency": "GBP" }', '  },', '  "features": ["Private terrace of 650 sq ft", "24h concierge"],', '  "internal_notes": ["Vendor flexible on completion date"]', '}') }
      ] });

    add({ id: 'd-estate-sections', title: 'Dossier sections and tone', kind: 'Guide', wf: 'estate', status: 'draft', tags: ['style', 'docx', 'real-estate'], updated: '2026-09-22', version: '0.9', owner: 'Editorial',
      summary: 'The fixed section order of every dossier and the writing rules for each.',
      blocks: [
        { t: 'p', x: 'Every dossier follows the same order, so buyers always know where to find a given fact.' },
        { t: 'ol', items: ['**Cover**: title, price and a one-line summary.', '**Executive summary**: three sentences at most.', '**Fact sheet**: the table of verified data.', '**Key features**: short, scannable items.', '**Location and surroundings**.', '**Terms of sale**: price, completion and open items.'] },
        { t: 'h', x: 'Tone' },
        { t: 'table', head: ['Do', 'Avoid'], rows: [
          ['Write in the third person.', 'Superlatives that cannot be verified.'],
          ['Keep paragraphs under 60 words.', 'Long lists inside a paragraph.'],
          ['State measured facts with their unit.', 'Unconfirmed figures.']
        ] },
        { t: 'note', kind: 'info', title: 'Draft', x: 'Section names are still being agreed with the editorial team.' }
      ] });

    add({ id: 'd-estate-mayfair', title: 'Sample: Mayfair penthouse dossier', kind: 'Sample', wf: 'estate', status: 'synced', tags: ['sample', 'docx', 'real-estate'], updated: '2026-10-12', version: '1.0', owner: 'Content Ops',
      summary: 'A finished cover and index, generated from one set of raw viewing notes.',
      blocks: [
        { t: 'p', x: 'This page shows the cover and index produced from the Mayfair viewing notes. The same template is used for every listing.' },
        { t: 'sheet', id: 'estate-cover' },
        { t: 'note', kind: 'info', title: 'Fictional data', x: 'The agency, address and price are invented for illustration.' }
      ] });

    add({ id: 'd-estate-paris', title: 'Sample: Paris fact sheet', kind: 'Sample', wf: 'estate', status: 'approved', tags: ['sample', 'docx', 'real-estate'], updated: '2026-09-29', version: '1.0', owner: 'Content Ops',
      summary: 'A fact-sheet table and key features with Word styles applied.',
      blocks: [
        { t: 'p', x: 'The fact sheet is a styled Word table, so rows can be added or removed without touching the layout.' },
        { t: 'sheet', id: 'estate-fact' }
      ] });

    add({ id: 'd-clip-overview', title: 'ClipScript: overview', kind: 'Guide', wf: 'clip', status: 'synced', tags: ['workflow', 'video', 'x-thread'], updated: '2026-10-10', version: '1.8', owner: 'Growth',
      summary: 'From a transcript to a Shorts and Reels script and an X thread in under two minutes.',
      blocks: [
        { t: 'p', x: 'ClipScript AI™ reads a `.txt` or `.srt` transcript and returns a timed script for Shorts and Reels, plus an X thread within the character limit.' },
        { t: 'wf', title: 'ClipScript run', trigger: 'Transcript uploaded', inputs: ['talk.srt', 'talk.txt'], outputs: ['script.docx', 'x_thread.docx'], steps: '5', runtime: 'Under 2 minutes', owner: 'Growth' },
        { t: 'h', x: 'Pipeline' },
        { t: 'flow', title: 'Transcript to scripts', nodes: [
          { label: 'Load transcript', kind: 'data', time: '1 s', i: '.srt or .txt', o: 'Raw lines', d: 'The file is read as text. Timestamps and cue numbers are kept for the duration estimate.' },
          { label: 'Clean text', kind: 'python', time: '1 s', i: 'Raw lines', o: 'Sentences', d: 'Timestamps, cue numbers and filler words such as "um" are removed, then the text is split into sentences.' },
          { label: 'Write scripts', kind: 'claude', time: '22 s', i: 'Sentences and master prompt', o: 'Hook, points, thread', d: 'Claude picks a hook, up to three key points and a closing line, and drafts the X thread.' },
          { label: 'Check limits', kind: 'python', time: '1 s', i: 'Draft', o: 'Valid posts', d: 'Every post is checked against 280 characters. A post that is too long is sent back for a rewrite.' },
          { label: 'Export .docx', kind: 'word', time: '5 s', i: 'Valid posts and template', o: 'script.docx', d: 'The script, thread and publishing calendar are laid out in the ClipScript template.' }
        ], retry: { from: 3, label: 'Posts over 280 characters are sent back to Claude once.' } },
        { t: 'h', x: 'Outputs' },
        { t: 'ul', items: ['A timed Shorts and Reels script with visual cues.', 'An X thread of up to five posts.', 'A publishing calendar by platform.'] },
        { t: 'code', lang: 'python', file: 'run_clipscript.py', code: L('from clipscript import run', '', 'run(', '    transcript="b2b-summit_ny.srt",', '    template="clipscript_template.docx",', '    output="script_001.docx",', ')') }
      ] });

    add({ id: 'd-clip-srt', title: 'SRT parsing rules', kind: 'Reference', wf: 'clip', status: 'approved', tags: ['schema', 'python', 'video'], updated: '2026-09-15', version: '1.2', owner: 'Growth',
      summary: 'What the parser removes from a transcript before it reaches the master prompt.',
      blocks: [
        { t: 'table', head: ['Rule', 'Example', 'Result'], rows: [
          ['Remove cue numbers', '`12`', 'Dropped'],
          ['Remove timestamps', '`00:00:04,200 --> 00:00:08,600`', 'Dropped, last end time kept as duration'],
          ['Remove filler words', '"Um, so the question is…"', '"The question is…"'],
          ['Split into sentences', 'Text ending in `.`, `!` or `?`', 'One entry per sentence'],
          ['Ignore fragments', 'Fewer than 13 characters', 'Dropped']
        ] },
        { t: 'h', x: 'Reference implementation' },
        { t: 'code', lang: 'python', file: 'parse_srt.py', code: L('import re', '', 'STAMP = re.compile(r"^\\d{2}:\\d{2}:\\d{2}[,.]\\d{1,3}\\s*-->")', '', 'def parse(text: str) -> list[str]:', '    kept = []', '    for line in text.splitlines():', '        line = line.strip()', '        if not line or line.isdigit() or STAMP.match(line):', '            continue', '        kept.append(line)', '    joined = " ".join(kept)', '    return [s for s in re.split(r"(?<=[.!?])\\s+", joined) if len(s) > 12]') }
      ] });

    add({ id: 'd-clip-shorts', title: 'Sample: Shorts and Reels script', kind: 'Sample', wf: 'clip', status: 'approved', tags: ['sample', 'video', 'docx'], updated: '2026-10-02', version: '1.0', owner: 'Growth',
      summary: 'A timed 30-second script with visual cues, taken from a conference transcript.',
      blocks: [
        { t: 'p', x: 'The script is split into blocks with a time range and a visual cue for each, so an editor can cut the video directly from it.' },
        { t: 'sheet', id: 'clip-script' }
      ] });

    add({ id: 'd-clip-thread', title: 'Sample: X thread and calendar', kind: 'Sample', wf: 'clip', status: 'draft', tags: ['sample', 'x-thread', 'docx'], updated: '2026-10-11', version: '0.6', owner: 'Growth',
      summary: 'A five-post thread inside the character limit, with a publishing calendar.',
      blocks: [
        { t: 'p', x: 'Each post shows its character count. Posts are checked against the 280-character limit before export.' },
        { t: 'sheet', id: 'clip-thread' },
        { t: 'note', kind: 'warn', title: 'Draft', x: 'The publishing days are placeholders until the client confirms their schedule.' }
      ] });

    add({ id: 'd-prompt-anatomy', title: 'Master prompt anatomy', kind: 'Guide', wf: 'platform', status: 'synced', tags: ['prompts', 'validation', 'python'], updated: '2026-10-06', version: '3.0', owner: 'Platform',
      summary: 'The five parts every master prompt needs so Claude returns data your script can trust.',
      blocks: [
        { t: 'p', x: 'When a response feeds a script or a document, free-form prose is a problem. A structured master prompt makes Claude a predictable part of the workflow.' },
        { t: 'h', x: 'The five parts' },
        { t: 'ol', items: ['**Role and task** in one sentence.', '**Output schema** with every field, type and allowed value.', '**Data in tags**, so instructions and content stay separate.', '**One complete example** of input and output.', '**Validation in code**, with a limited number of retries.'] },
        { t: 'h', x: 'Template' },
        { t: 'code', lang: 'text', file: 'master_prompt.txt', code: L('You are a contract analyst. Extract the data from the text', 'inside <data> and reply ONLY with valid JSON:', '', '{', '  "summary": "string, maximum 40 words",', '  "key_points": ["string", "..."],', '  "risk": "high | medium | low"', '}', '', '<data>', '{{ document_text }}', '</data>') },
        { t: 'note', kind: 'info', title: 'Why tags matter', x: 'If the input text contains a sentence that looks like an order, tags let Claude treat it as content to analyse rather than an instruction to follow.' }
      ] });

    add({ id: 'd-prompt-schema', title: 'Output schemas', kind: 'Reference', wf: 'platform', status: 'approved', tags: ['schema', 'prompts'], updated: '2026-09-29', version: '1.1', owner: 'Platform',
      summary: 'How to describe fields so the reply can be validated automatically.',
      blocks: [
        { t: 'p', x: 'Describe every field with a type and, where possible, an allowed range or set of values.' },
        { t: 'table', head: ['Pattern', 'Write it as', 'Why'], rows: [
          ['Free text with a limit', '"string, maximum 40 words"', 'Keeps layouts from overflowing.'],
          ['Closed set', '"high | medium | low"', 'Python can reject anything else.'],
          ['List', '["string", "..."]', 'Maps to bullets or table rows.'],
          ['Optional value', '"price": object or null', 'Missing data becomes "To be confirmed".']
        ] }
      ] });

    add({ id: 'd-prompt-retry', title: 'Validation and retries', kind: 'Guide', wf: 'platform', status: 'draft', tags: ['validation', 'python', 'prompts'], updated: '2026-10-09', version: '0.8', owner: 'Platform',
      summary: 'Parse, check and, if needed, send the error back to Claude, with a hard limit.',
      blocks: [
        { t: 'p', x: 'Never accept a reply without checking it. If the check fails, send the exact error back so Claude can correct it.' },
        { t: 'flow', title: 'Validation loop', nodes: [
          { label: 'Call Claude', kind: 'claude', time: '15 s', i: 'Master prompt and data', o: 'Raw reply', d: 'The prompt is sent with the data inside tags.' },
          { label: 'Parse JSON', kind: 'python', time: '< 1 s', i: 'Raw reply', o: 'Python object', d: 'A parsing error is a failed check, not a crash.' },
          { label: 'Check fields', kind: 'python', time: '< 1 s', i: 'Python object', o: 'Pass or error list', d: 'Required fields, types and allowed values are verified against the schema.' },
          { label: 'Accept', kind: 'data', time: '0 s', i: 'Checked data', o: 'Downstream step', d: 'Only checked data continues to the document step.' }
        ], retry: { from: 2, label: 'On failure, return the error message to Claude. Limit: 2 or 3 attempts.' } },
        { t: 'code', lang: 'python', file: 'validate.py', code: L('import json', '', 'REQUIRED = {"summary", "key_points", "risk"}', '', 'def parse(response: str) -> dict:', '    data = json.loads(response)', '    missing = REQUIRED - data.keys()', '    if missing:', '        raise ValueError(f"Missing fields: {missing}")', '    return data') },
        { t: 'note', kind: 'warn', title: 'Limit the retries', x: 'If a well-designed prompt keeps failing, change the prompt. More retries only hide the problem.' }
      ] });

    add({ id: 'd-docx-template', title: 'Corporate template guide', kind: 'Guide', wf: 'platform', status: 'approved', tags: ['docx', 'python', 'template'], updated: '2026-09-29', version: '2.0', owner: 'Platform',
      summary: 'Start from a template with named styles so documents do not break on every revision.',
      blocks: [
        { t: 'p', x: 'Create a `.docx` template with your margins, typography, heading styles and header. The script only fills in content; the design stays out of the code.' },
        { t: 'table', head: ['Style', 'Use for'], rows: [['Heading 1', 'Section titles'], ['Normal', 'Body text'], ['Quote', 'Call-outs and production notes'], ['Table Grid', 'Data tables']] },
        { t: 'code', lang: 'python', file: 'build_report.py', code: L('from docx import Document', '', 'doc = Document("corporate_template.docx")', 'doc.add_heading("Quarterly report", level=1)', 'doc.add_paragraph("Executive summary generated from data.")', '', 'table = doc.add_table(rows=1, cols=3, style="Table Grid")', 'for cell, text in zip(table.rows[0].cells, ["Month", "Sales", "Change"]):', '    cell.text = text', '', 'doc.save("report_q3.docx")') },
        { t: 'note', kind: 'warn', title: 'Check the style names', x: 'The `"Table Grid"` style exists in the default template. If you use your own, make sure it contains every style the script names.' }
      ] });

    add({ id: 'd-docx-qa', title: 'Document QA checklist', kind: 'Template', wf: 'platform', status: 'draft', tags: ['qa', 'docx', 'template'], updated: '2026-08-30', version: '0.4', owner: 'Quality',
      summary: 'A checklist to run before a generated document is sent to a client.',
      blocks: [
        { t: 'ul', items: ['Opens without warnings in Word and in LibreOffice.', 'Headings, numbering and table of contents are correct.', 'No placeholder text such as "[TODO]" remains.', 'Pending items are marked "To be confirmed".', 'A human has reviewed names, figures and dates.'] },
        { t: 'table', head: ['Test', 'How', 'Expected'], rows: [['Long text', 'Paste a 400-word description', 'No overflow, table still fits'], ['Empty table', 'Run with no rows', 'Header only, no error'], ['Missing price', 'Remove the price from the notes', '"Price to be confirmed"']] }
      ] });

    add({ id: 'd-runbook', title: 'Runbook: custom B2B workflow', kind: 'Runbook', wf: 'platform', status: 'synced', tags: ['runbook', 'workflow', 'template'], updated: '2026-07-21', version: '1.3', owner: 'Delivery',
      summary: 'The steps from a first call to a workflow running on your own documents.',
      blocks: [
        { t: 'wf', title: 'Custom workflow delivery', trigger: 'Scoping call', inputs: ['Sample documents', 'Corporate template'], outputs: ['Python workflow', 'Master prompts', '.docx template'], steps: '6', runtime: 'About 2 to 3 weeks', owner: 'Delivery' },
        { t: 'h', x: 'Delivery steps' },
        { t: 'flow', title: 'From scoping to hand-over', nodes: [
          { label: 'Intake', kind: 'data', time: '1 day', i: 'Sample documents', o: 'Scope', d: 'We review 5 to 10 real documents and agree which one to automate first.' },
          { label: 'Map fields', kind: 'python', time: '1 day', i: 'Scope', o: 'Schema', d: 'Each variable part of the document becomes a typed field.' },
          { label: 'Master prompt', kind: 'claude', time: '2 days', i: 'Schema', o: 'Prompt and example', d: 'The prompt is written and tested against your samples.' },
          { label: 'Template', kind: 'word', time: '2 days', i: 'Brand rules', o: '.docx template', d: 'Styles, headers and tables are built into a template.' },
          { label: 'Pilot', kind: 'python', time: '1 week', i: 'Live documents', o: 'Feedback', d: 'The workflow runs on real work with a person reviewing every output.' },
          { label: 'Hand-over', kind: 'data', time: '1 day', i: 'Pilot results', o: 'Runbook', d: 'You receive the scripts, prompts and this runbook.' }
        ], retry: { from: 4, label: 'Pilot feedback may send the work back to the prompt or the template.' } },
        { t: 'table', head: ['Phase', 'Who', 'Typical time'], rows: [['Scoping', 'Empiric Labs and client', '1 to 2 days'], ['Prompt and schema', 'Empiric Labs', '2 to 3 days'], ['Template', 'Client and Empiric Labs', '1 to 2 days'], ['Pilot', 'Both', '1 week']] },
        { t: 'note', kind: 'info', title: 'Timings are indicative', x: 'They depend on how many document types are in scope and how quickly feedback arrives.' }
      ] });

    var TREE = [
      { id: 'f-estate', title: 'Estate Dossier AI™', kids: [
        { doc: 'd-estate-overview', kids: [{ doc: 'd-estate-schema' }, { doc: 'd-estate-sections' }] },
        { doc: 'd-estate-mayfair' }, { doc: 'd-estate-paris' }] },
      { id: 'f-clip', title: 'ClipScript AI™', kids: [
        { doc: 'd-clip-overview', kids: [{ doc: 'd-clip-srt' }] },
        { doc: 'd-clip-shorts' }, { doc: 'd-clip-thread' }] },
      { id: 'f-platform', title: 'Platform', kids: [
        { id: 'f-prompts', title: 'Master prompts', kids: [{ doc: 'd-prompt-anatomy', kids: [{ doc: 'd-prompt-schema' }, { doc: 'd-prompt-retry' }] }] },
        { id: 'f-docx', title: 'Word output', kids: [{ doc: 'd-docx-template' }, { doc: 'd-docx-qa' }] },
        { doc: 'd-runbook' }] }
    ];

    /* ---------- indexes ---------- */
    var ORDER = [], PATH = {}, PARENT = {}, NODE = {}, FOLDER_DOCS = {};
    (function walk(nodes, path, parent) {
      nodes.forEach(function (n) {
        var id = n.doc || n.id;
        NODE[id] = n; PARENT[id] = parent;
        if (n.doc) { ORDER.push(n.doc); PATH[n.doc] = path.slice(); }
        if (n.kids) { walk(n.kids, path.concat(n.doc ? D[n.doc].title : n.title), id); }
      });
    })(TREE, [], null);
    (function countDocs() {
      function c(n) { var k = 0; (n.kids || []).forEach(function (x) { k += (x.doc ? 1 : 0) + c(x); }); return k; }
      Object.keys(NODE).forEach(function (id) { FOLDER_DOCS[id] = c(NODE[id]); });
    })();
    /* workflow of each doc comes from its data; derive searchable text */
    function plain(b) {
      switch (b.t) {
        case 'p': case 'h': case 'h3': return b.x;
        case 'ul': case 'ol': return b.items.join(' ');
        case 'code': return b.code;
        case 'note': return b.title + ' ' + b.x;
        case 'table': return b.head.join(' ') + ' ' + b.rows.map(function (r) { return r.join(' '); }).join(' ');
        case 'wf': return [b.title, b.trigger, b.inputs.join(' '), b.outputs.join(' '), b.owner].join(' ');
        case 'flow': return b.title + ' ' + b.nodes.map(function (n) { return n.label + ' ' + n.d; }).join(' ') + ' ' + (b.retry ? b.retry.label : '');
        case 'sheet': var t = sheetTpl(b.id); return t ? t.getAttribute('data-title') + ' ' + t.getAttribute('data-caption') : '';
      }
      return '';
    }
    function sheetTpl(id) { return document.querySelector('template[data-sheet="' + id + '"]'); }
    Object.keys(D).forEach(function (id) {
      var d = D[id];
      d._text = d.blocks.map(plain).join(' ').replace(/[`*]/g, '').replace(/\s+/g, ' ');
      d._hay = (d.title + ' ' + d.summary + ' ' + d.tags.join(' ') + ' ' + d.kind + ' ' + WF[d.wf] + ' ' + d._text).toLowerCase();
      d._min = Math.max(1, Math.ceil(d._text.split(' ').length / 190));
    });
    var ALLTAGS = (function () { var s = {}; ORDER.forEach(function (id) { D[id].tags.forEach(function (t) { s[t] = 1; }); }); return Object.keys(s).sort(); })();
    var KINDS = (function () { var s = {}; ORDER.forEach(function (id) { s[D[id].kind] = 1; }); return Object.keys(s).sort(); })();

    /* ---------- state ---------- */
    var LS = 'el-docs-status', ST = {}, SYNCED_NOW = {}, BUSY = {};
    try { var raw = localStorage.getItem(LS); if (raw) { var o = JSON.parse(raw); Object.keys(o).forEach(function (k) { if (D[k] && STATUS[o[k]]) { ST[k] = o[k]; } }); } } catch (e) { /* storage unavailable */ }
    function persist() { try { localStorage.setItem(LS, JSON.stringify(ST)); } catch (e) { /* ignore */ } }
    function eff(d) { return ST[d.id] || d.status; }

    var S = { doc: 'd-estate-overview', q: '', wf: 'all', type: '', status: '', date: '', tags: [] };
    var OPEN = {};
    TREE.forEach(function (n) { OPEN[n.id] = true; });
    function reveal(id) { var p = PARENT[id]; while (p) { OPEN[p] = true; p = PARENT[p]; } }
    function active() { return !!(S.q.trim() || S.wf !== 'all' || S.type || S.status || S.date || S.tags.length); }
    function tokens() { return S.q.toLowerCase().split(/\s+/).filter(Boolean); }
    function match(d) {
      if (S.wf !== 'all' && d.wf !== S.wf) return false;
      if (S.type && d.kind !== S.type) return false;
      if (S.status && eff(d) !== S.status) return false;
      if (S.date && daysAgo(d.updated) > +S.date) return false;
      for (var i = 0; i < S.tags.length; i++) { if (d.tags.indexOf(S.tags[i]) < 0) return false; }
      var tk = tokens();
      for (var j = 0; j < tk.length; j++) { if (d._hay.indexOf(tk[j]) < 0) return false; }
      return true;
    }
    function hilite(text) {
      var tk = tokens();
      if (!tk.length) return esc(text);
      var re = new RegExp('(' + tk.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'gi');
      return esc(text.replace(re, '\u0001$1\u0002')).replace(/\u0001/g, '<mark>').replace(/\u0002/g, '</mark>');
    }
    function snippet(d) {
      var tk = tokens(), t = d._text, lc = t.toLowerCase(), at = -1, i;
      for (i = 0; i < tk.length; i++) { var p = lc.indexOf(tk[i]); if (p > -1 && (at < 0 || p < at)) { at = p; } }
      if (at < 0) return d.summary;
      var a = Math.max(0, at - 50), b = Math.min(t.length, at + 110);
      return (a > 0 ? '…' : '') + t.slice(a, b).trim() + (b < t.length ? '…' : '');
    }

    /* ---------- badges ---------- */
    function sbadge(st) { return '<span class="bd bd-' + st + '">' + ic(st === 'approved' ? 'check' : st === 'draft' ? 'draft' : 'synced', 12, 2.4) + STATUS[st] + '</span>'; }

    /* =====================================================================
       LIBRARY: filters, tree, results
       ===================================================================== */
    var q = $('dw-q'), tree = $('dw-tree'), results = $('dw-results'), emptyEl = $('dw-empty'), countEl = $('dw-count'), clearBtn = $('dw-clear');
    var wfBox = $('dw-wf'), typeSel = $('dw-type'), statusSel = $('dw-status'), dateSel = $('dw-date'), tagsBox = $('dw-tags'), moreEl = $('dw-more'), fcEl = $('dw-fc');
    var lib = $('dw-lib'), toggle = $('dw-toggle');

    function buildFilters() {
      wfBox.innerHTML = [['all', 'All']].concat(Object.keys(WF).map(function (k) { return [k, WF[k]]; })).map(function (p) {
        return '<button type="button" class="dw-chip" data-wf="' + p[0] + '" aria-pressed="false">' + esc(p[1]) + '</button>';
      }).join('');
      typeSel.innerHTML = '<option value="">All types</option>' + KINDS.map(function (k) { return '<option>' + esc(k) + '</option>'; }).join('');
      statusSel.innerHTML = '<option value="">Any status</option>' + Object.keys(STATUS).map(function (k) { return '<option value="' + k + '">' + STATUS[k] + '</option>'; }).join('');
      dateSel.innerHTML = '<option value="">Any time</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option>';
      tagsBox.innerHTML = ALLTAGS.map(function (t) { return '<button type="button" class="dw-chip" data-tag="' + esc(t) + '" aria-pressed="false">' + esc(t) + '</button>'; }).join('');
    }
    function syncFilters() {
      Array.prototype.forEach.call(wfBox.children, function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-wf') === S.wf ? 'true' : 'false'); });
      Array.prototype.forEach.call(tagsBox.children, function (b) { b.setAttribute('aria-pressed', S.tags.indexOf(b.getAttribute('data-tag')) > -1 ? 'true' : 'false'); });
      typeSel.value = S.type; statusSel.value = S.status; dateSel.value = S.date;
      var n = (S.type ? 1 : 0) + (S.status ? 1 : 0) + (S.date ? 1 : 0) + S.tags.length;
      fcEl.hidden = !n; fcEl.textContent = n;
      if (n && !moreEl.open && !moreEl.__touched) { moreEl.open = true; }
      clearBtn.hidden = !active();
    }

    function treeHtml(nodes, lv) {
      return nodes.map(function (n) {
        var id = n.doc || n.id, d = n.doc ? D[n.doc] : null, kids = n.kids && n.kids.length, open = !!OPEN[id];
        var sel = d && S.doc === id;
        var h = '<li role="treeitem" tabindex="-1" aria-level="' + (lv + 1) + '" data-id="' + id + '"' + (d ? ' data-peek="' + id + '"' : ' class="tr-folder"') +
          (kids ? ' aria-expanded="' + open + '"' : '') + (d ? ' aria-selected="' + sel + '"' : '') + '>';
        h += '<div class="tr-row" style="--lv:' + lv + '">' + (kids ? '<span class="tr-chev" data-chev>' + ic('chev', 12, 2.6) + '</span>' : '<span class="tr-chev"></span>');
        h += '<span class="tr-ico">' + ic(d ? 'file' : 'folder', 15, 2) + '</span><span class="tr-name">' + esc(d ? d.title : n.title) + '</span>';
        if (d) { var st = eff(d); h += '<span class="mini mini-' + st + '" title="' + STATUS[st] + '">' + ic(st === 'approved' ? 'check' : st === 'draft' ? 'draft' : 'synced', 10, 2.6) + '</span><span class="sr-only">' + STATUS[st] + '</span>'; }
        else { h += '<span class="tr-count">' + FOLDER_DOCS[id] + '</span>'; }
        h += '</div>';
        if (kids) { h += '<ul role="group"' + (open ? '' : ' hidden') + '>' + treeHtml(n.kids, lv + 1) + '</ul>'; }
        return h + '</li>';
      }).join('');
    }
    function focusedId() { var a = document.activeElement; var li = a && a.closest ? a.closest('#dw-tree li[role="treeitem"]') : null; return li && a === li ? li.getAttribute('data-id') : null; }
    function visibleItems() { return Array.prototype.filter.call(tree.querySelectorAll('li[role="treeitem"]'), function (li) { return !li.parentElement.closest('ul[hidden]'); }); }
    function syncTab() {
      var items = visibleItems(), pick = null;
      items.forEach(function (li) { li.tabIndex = -1; if (li.getAttribute('data-id') === S.doc) { pick = li; } });
      if (!pick) { pick = items[0]; }
      if (pick) { pick.tabIndex = 0; }
    }
    function renderLib() {
      var act = active(), list = act ? ORDER.filter(function (id) { return match(D[id]); }) : ORDER;
      countEl.textContent = act ? list.length + ' of ' + ORDER.length + ' documents' : ORDER.length + ' documents';
      tree.hidden = act; results.hidden = !act || !list.length; emptyEl.hidden = !(act && !list.length); if (!emptyEl.hidden) { renderEmpty(); }
      if (!act) {
        var keep = focusedId();
        tree.innerHTML = treeHtml(TREE, 0);
        syncTab();
        if (keep) { var el = tree.querySelector('li[data-id="' + keep + '"]'); if (el) { el.focus(); } }
      } else {
        results.innerHTML = list.map(function (id) {
          var d = D[id];
          return '<li><button type="button" class="rs" data-open="' + id + '" data-peek="' + id + '"' + (S.doc === id ? ' aria-current="true"' : '') + '>' +
            '<span class="rs-t">' + hilite(d.title) + '</span><span class="rs-p">' + esc(['Library'].concat(PATH[id]).join(' / ')) + '</span>' +
            '<span class="rs-b">' + sbadge(eff(d)) + '<span class="bd bd-kind">' + esc(d.kind) + '</span></span>' +
            '<span class="rs-s">' + hilite(snippet(d)) + '</span></button></li>';
        }).join('');
      }
      syncFilters();
      $('dw-toggle-cur').textContent = D[S.doc].title;
    }

    /* tree interactions */
    function toggleNode(id) { OPEN[id] = !OPEN[id]; renderLib(); var el = tree.querySelector('li[data-id="' + id + '"]'); if (el) { el.focus(); } }
    tree.addEventListener('click', function (e) {
      var row = e.target.closest('.tr-row'); if (!row) return;
      var li = row.parentElement, id = li.getAttribute('data-id'), n = NODE[id];
      if (e.target.closest('[data-chev]') && n.kids) { toggleNode(id); return; }
      if (n.doc) { if (n.kids && !OPEN[id]) { OPEN[id] = true; } select(id, { keepFocus: true }); var again = tree.querySelector('li[data-id="' + id + '"]'); if (again) { again.focus(); } }
      else { toggleNode(id); }
    });
    tree.addEventListener('focusin', function (e) { var li = e.target; if (li.matches && li.matches('li[role="treeitem"]')) { Array.prototype.forEach.call(tree.querySelectorAll('li[tabindex="0"]'), function (x) { x.tabIndex = -1; }); li.tabIndex = 0; } });
    tree.addEventListener('keydown', function (e) {
      var li = e.target; if (!li.matches || !li.matches('li[role="treeitem"]')) return;
      var items = visibleItems(), i = items.indexOf(li), id = li.getAttribute('data-id'), n = NODE[id], k = e.key;
      if (k === 'ArrowDown') { e.preventDefault(); if (items[i + 1]) items[i + 1].focus(); }
      else if (k === 'ArrowUp') { e.preventDefault(); if (items[i - 1]) items[i - 1].focus(); }
      else if (k === 'Home') { e.preventDefault(); items[0].focus(); }
      else if (k === 'End') { e.preventDefault(); items[items.length - 1].focus(); }
      else if (k === 'ArrowRight') { e.preventDefault(); if (n.kids) { if (!OPEN[id]) { toggleNode(id); } else { var c = li.querySelector('ul > li'); if (c) c.focus(); } } }
      else if (k === 'ArrowLeft') { e.preventDefault(); if (n.kids && OPEN[id]) { toggleNode(id); } else { var p = li.parentElement.closest('li[role="treeitem"]'); if (p) p.focus(); } }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); if (n.doc) { if (n.kids && !OPEN[id]) { OPEN[id] = true; } select(id, { keepFocus: true }); var again = tree.querySelector('li[data-id="' + id + '"]'); if (again) again.focus(); } else { toggleNode(id); } }
    });
    results.addEventListener('click', function (e) { var b = e.target.closest('[data-open]'); if (b) { select(b.getAttribute('data-open'), { focusTitle: true }); } });

    /* filter interactions */
    q.addEventListener('input', function () { S.q = q.value; renderLib(); });
    q.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (q.value) { q.value = ''; S.q = ''; renderLib(); } else { q.blur(); } } });
    wfBox.addEventListener('click', function (e) { var b = e.target.closest('[data-wf]'); if (b) { S.wf = b.getAttribute('data-wf'); renderLib(); } });
    tagsBox.addEventListener('click', function (e) { var b = e.target.closest('[data-tag]'); if (!b) return; var t = b.getAttribute('data-tag'), i = S.tags.indexOf(t); if (i > -1) S.tags.splice(i, 1); else S.tags.push(t); renderLib(); });
    typeSel.addEventListener('change', function () { S.type = typeSel.value; renderLib(); });
    statusSel.addEventListener('change', function () { S.status = statusSel.value; renderLib(); });
    dateSel.addEventListener('change', function () { S.date = dateSel.value; renderLib(); });
    moreEl.addEventListener('toggle', function () { moreEl.__touched = true; });
    function clearAll() { S.q = ''; S.wf = 'all'; S.type = ''; S.status = ''; S.date = ''; S.tags = []; q.value = ''; moreEl.__touched = false; moreEl.open = false; renderLib(); }
    function renderEmpty() {
      var extra = S.wf !== 'all' || S.type || S.status || S.date || S.tags.length, term = S.q.trim();
      $('dw-empty-msg').textContent = term ? 'Nothing matches \u201c' + term + '\u201d' + (extra ? ' with the current filters.' : '.') : 'No document matches the current filters.';
      $('dw-try').innerHTML = '<small>Try</small>' + ['schema', 'validation', 'docx', 'prompts'].map(function (w) { return '<button type="button" class="dw-chip" data-try="' + w + '">' + w + '</button>'; }).join('');
    }
    clearBtn.addEventListener('click', function () { clearAll(); q.focus(); });
    emptyEl.addEventListener('click', function (e) {
      if (e.target.closest('#dw-reset')) { clearAll(); q.focus(); return; }
      var t = e.target.closest('[data-try]'); if (!t) return;
      clearAll(); S.q = t.getAttribute('data-try'); q.value = S.q; renderLib();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !/^(input|textarea|select)$/i.test(e.target.tagName) && window.RT && window.RT.view === 'documents') { e.preventDefault(); if (innerWidth < 1280) { setPanel(true); } q.focus(); }
    });
    function setPanel(open) { if (open) { lib.setAttribute('data-open', ''); } else { lib.removeAttribute('data-open'); } toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    toggle.addEventListener('click', function () { setPanel(!lib.hasAttribute('data-open')); });
    $('dw-close').addEventListener('click', function () { setPanel(false); toggle.focus(); });

    /* =====================================================================
       QUICK PREVIEW (hover / keyboard focus)
       ===================================================================== */
    var peek = document.createElement('div');
    peek.id = 'dw-peek'; peek.setAttribute('role', 'tooltip'); peek.setAttribute('data-no-i18n', '');
    document.body.appendChild(peek);
    var peekT = null, peekEl = null;
    function showPeek(el) {
      var d = D[el.getAttribute('data-peek')]; if (!d) return;
      clearTimeout(peekT);
      peekT = setTimeout(function () {
        var st = eff(d);
        peek.innerHTML = '<div class="pk-row">' + sbadge(st) + '<span class="bd bd-kind">' + esc(d.kind) + '</span></div><h4>' + esc(d.title) + '</h4><p>' + esc(d.summary) + '</p>' +
          '<div class="pk-row" style="margin-top:.6rem">' + d.tags.map(function (t) { return '<span class="bd bd-tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
          '<div class="pk-meta">' + esc(WF[d.wf]) + ' | Updated ' + fdate(d.updated) + ' | v' + d.version + ' | ' + d._min + ' min read</div>';
        var r = el.getBoundingClientRect(), w = peek.offsetWidth, h = peek.offsetHeight, vw = innerWidth, vh = innerHeight, x, y;
        if (r.right + 12 + w <= vw - 8) { x = r.right + 12; y = r.top - 6; }
        else if (r.left - 12 - w >= 8) { x = r.left - 12 - w; y = r.top - 6; }
        else { x = Math.min(Math.max(8, r.left), vw - w - 8); y = r.bottom + 8; if (y + h > vh - 8) { y = Math.max(8, r.top - h - 8); } }
        y = Math.min(Math.max(8, y), vh - h - 8);
        peek.style.left = x + 'px'; peek.style.top = y + 'px';
        peek.setAttribute('data-show', '');
        if (peekEl && peekEl !== el) { peekEl.removeAttribute('aria-describedby'); }
        peekEl = el; el.setAttribute('aria-describedby', 'dw-peek');
      }, 240);
    }
    function hidePeek() { clearTimeout(peekT); peek.removeAttribute('data-show'); if (peekEl) { peekEl.removeAttribute('aria-describedby'); peekEl = null; } }
    var canHover = !!(window.matchMedia && matchMedia('(hover: hover)').matches);
    root.addEventListener('mouseover', function (e) { if (!canHover) return; var el = e.target.closest('[data-peek]'); if (el) { showPeek(el); } });
    root.addEventListener('mouseout', function (e) { var el = e.target.closest('[data-peek]'); if (el && !el.contains(e.relatedTarget)) { hidePeek(); } });
    root.addEventListener('focusin', function (e) { var el = e.target.closest ? e.target.closest('[data-peek]') : null; if (el && e.target.matches && e.target.matches(':focus-visible')) { showPeek(el); } });
    root.addEventListener('focusout', hidePeek);
    root.addEventListener('click', hidePeek);
    window.addEventListener('scroll', hidePeek, { passive: true });
    $('dw-scroll').addEventListener('scroll', hidePeek, { passive: true });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { hidePeek(); } });
    document.addEventListener('viewchange', hidePeek);

    /* =====================================================================
       READER
       ===================================================================== */
    var dv = $('dv'), head = $('dv-head'), body = $('dv-body');
    var KW = /(#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(\d+(?:\.\d+)?)\b|\b(from|import|def|return|if|else|elif|for|in|not|and|or|None|True|False|with|as|raise|try|except|class|while|print)\b/g;
    function hl(code, lang) {
      if (lang !== 'python' && lang !== 'json') return esc(code);
      var out = '', last = 0, m; KW.lastIndex = 0;
      while ((m = KW.exec(code))) {
        out += esc(code.slice(last, m.index));
        out += '<span class="t-' + (m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : 'k') + '">' + esc(m[0]) + '</span>';
        last = KW.lastIndex;
      }
      return out + esc(code.slice(last));
    }
    var FL = {}, RUN = 0;

    function fmDetail(b, i) {
      var n = b.nodes[i];
      return '<div class="fm-dh"><span class="fm-n">' + (i + 1) + '</span><h4>' + esc(n.label) + '</h4><span class="fm-tag k-' + n.kind + '">' + TOOL[n.kind] + '</span></div>' +
        '<p>' + esc(n.d) + '</p><dl><div><dt>Input</dt><dd>' + esc(n.i) + '</dd></div><div><dt>Output</dt><dd>' + esc(n.o) + '</dd></div><div><dt>Typical time</dt><dd>' + esc(n.time) + '</dd></div></dl>' +
        (b.retry && b.retry.from === i ? '<p class="fm-rt"><strong>Retry loop:</strong> ' + esc(b.retry.label) + '</p>' : '');
    }
    function sheetBlock(id) {
      var t = sheetTpl(id); if (!t) return '';
      return '<div class="dv-sheet"><div class="dv-sheet-frame" data-sheet-id="' + id + '" role="img" aria-label="' + esc(t.getAttribute('data-title') + ': ' + t.getAttribute('data-caption')) + '"><div class="sheet-scale" aria-hidden="true"></div></div>' +
        '<p class="dv-sheet-cap">' + esc(t.getAttribute('data-caption')) + '</p></div>';
    }
    function blk(b, i, d, mode) {
      var ex = mode === 'export';
      switch (b.t) {
        case 'p': return '<p>' + fmt(b.x) + '</p>';
        case 'h': return '<h2 id="sec-' + i + '">' + esc(b.x) + '</h2>';
        case 'h3': return '<h3 class="sub">' + esc(b.x) + '</h3>';
        case 'ul': return '<ul>' + b.items.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ul>';
        case 'ol': return '<ol>' + b.items.map(function (x) { return '<li>' + fmt(x) + '</li>'; }).join('') + '</ol>';
        case 'code':
          if (ex) return '<pre><code>' + esc(b.code) + '</code></pre>';
          return '<figure class="dv-code"><figcaption><span class="dv-code-name">' + esc(b.file) + '</span><span class="dv-code-lang">' + esc(b.lang) + '</span><button type="button" class="dv-copy" data-copy>Copy</button></figcaption><pre tabindex="0"><code>' + hl(b.code, b.lang) + '</code></pre></figure>';
        case 'note': return '<aside class="dv-note dv-note--' + b.kind + '"><span style="flex:none;margin-top:.15rem">' + ic(b.kind === 'warn' ? 'warn' : 'info', 18, 2) + '</span><div><b>' + esc(b.title) + '</b>' + fmt(b.x) + '</div></aside>';
        case 'table': return '<div class="dv-tw"' + (ex ? '' : ' tabindex="0" role="region" aria-label="Table, scrollable"') + '><table class="dv-table"><thead><tr>' + b.head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          b.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + fmt(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
        case 'wf':
          function chips(a) { return a.map(function (x) { return '<span class="chipf">' + esc(x) + '</span>'; }).join(''); }
          return '<section class="dv-wf" aria-label="Workflow summary: ' + esc(b.title) + '"><header><span class="dv-wf-ic">' + ic('flow', 18, 2) + '</span><div><p class="dv-wf-k">Workflow summary</p><h3>' + esc(b.title) + '</h3></div></header><dl>' +
            '<div><dt>Trigger</dt><dd>' + esc(b.trigger) + '</dd></div><div><dt>Inputs</dt><dd>' + chips(b.inputs) + '</dd></div><div><dt>Outputs</dt><dd>' + chips(b.outputs) + '</dd></div>' +
            '<div><dt>Steps</dt><dd>' + esc(b.steps) + '</dd></div><div><dt>Typical run time</dt><dd>' + esc(b.runtime) + '</dd></div><div><dt>Owner</dt><dd>' + esc(b.owner) + '</dd></div></dl></section>';
        case 'flow':
          if (ex) return '<h3>' + esc(b.title) + '</h3><ol>' + b.nodes.map(function (n) { return '<li><strong>' + esc(n.label) + '</strong> (' + TOOL[n.kind] + ', ' + esc(n.time) + '): ' + esc(n.d) + '</li>'; }).join('') + '</ol>' + (b.retry ? '<p><em>Retry: ' + esc(b.retry.label) + '</em></p>' : '');
          var key = d.id + '-' + i; FL[key] = { b: b };
          return '<section class="fm" data-fm="' + key + '" aria-label="Interactive flow: ' + esc(b.title) + '"><header class="fm-head"><div><p class="dv-wf-k">Interactive flow</p><h3>' + esc(b.title) + '</h3></div>' +
            '<div class="fm-ctl"><button type="button" class="dv-btn" data-fm-run>' + ic('play', 12, 2.2) + 'Run simulation</button><button type="button" class="dv-btn" data-fm-reset>Reset</button></div></header>' +
            '<div class="fm-lane" role="group" aria-label="Steps. Select a step to see its details.">' + b.nodes.map(function (n, k) {
              return (k ? '<i class="fm-link" aria-hidden="true"></i>' : '') + '<button type="button" class="fm-node" data-i="' + k + '" data-st="idle" aria-pressed="' + (k === 0) + '"><span class="fm-n">' + (k + 1) + '</span><span class="fm-l">' + esc(n.label) + '</span><span class="fm-tag k-' + n.kind + '">' + TOOL[n.kind] + '</span><span class="fm-t">' + esc(n.time) + '</span></button>';
            }).join('') + '</div>' +
            (b.retry ? '<p class="fm-retry"><span aria-hidden="true">' + ic('retry', 16, 2.2) + '</span><span><strong>Retry loop after step ' + (b.retry.from + 1) + '.</strong> ' + esc(b.retry.label) + '</span></p>' : '') +
            '<div class="fm-detail" aria-live="polite">' + fmDetail(b, 0) + '</div></section>';
        case 'sheet':
          if (ex) { var t = sheetTpl(b.id); return t ? '<p><em>Sample page: ' + esc(t.getAttribute('data-title')) + '. ' + esc(t.getAttribute('data-caption')) + '</em></p>' : ''; }
          return sheetBlock(b.id);
      }
      return '';
    }

    function renderHead() {
      var d = D[S.doc], st = eff(d), path = PATH[d.id], idx = ['draft', 'approved', 'synced'].indexOf(st), busy = !!BUSY[d.id];
      var h = '<nav class="dv-crumb" aria-label="Breadcrumb"><span>Library</span>' + path.map(function (p) { return '<span aria-hidden="true">/</span><span>' + esc(p) + '</span>'; }).join('') + '</nav>';
      h += '<h2 id="dv-title" class="dv-title" tabindex="-1">' + esc(d.title) + '</h2><p class="dv-sum">' + esc(d.summary) + '</p>';
      h += '<div class="dv-badges">' + sbadge(st) + '<span class="bd bd-kind">' + esc(d.kind) + '</span><span class="bd bd-wf">' + esc(WF[d.wf]) + '</span>' + d.tags.map(function (t) { return '<span class="bd bd-tag">' + esc(t) + '</span>'; }).join('') + '</div>';
      h += '<dl class="dv-meta"><div><dt>Updated</dt><dd>' + fdate(d.updated) + '</dd></div><div><dt>Version</dt><dd>v' + d.version + '</dd></div><div><dt>Owner</dt><dd>' + esc(d.owner) + '</dd></div><div><dt>Reading time</dt><dd>' + d._min + ' min</dd></div></dl>';
      h += '<ol class="dv-steps" aria-label="Document status">' + ['draft', 'approved', 'synced'].map(function (s, i) {
        return '<li data-s="' + (i < idx ? 'done' : i === idx ? 'now' : 'todo') + '"' + (i === idx ? ' aria-current="step"' : '') + '><span class="dv-step-dot">' + (i <= idx ? ic('check', 11, 3) : '') + '</span>' + STATUS[s] + '</li>';
      }).join('') + '</ol>';
      var act;
      if (busy) { act = '<button type="button" class="dv-btn dv-btn--pri" id="dv-act" disabled><span class="dv-spin" aria-hidden="true"></span>Syncing</button>'; }
      else if (st === 'draft') { act = '<button type="button" class="dv-btn dv-btn--pri" id="dv-act" data-act="advance">' + ic('check', 14, 2.6) + 'Approve document</button>'; }
      else if (st === 'approved') { act = '<button type="button" class="dv-btn dv-btn--pri" id="dv-act" data-act="advance">' + ic('synced', 14, 2.4) + 'Sync to workspace</button>'; }
      else { act = '<button type="button" class="dv-btn" id="dv-act" data-act="revert">Revert to draft</button>'; }
      h += '<div class="dv-bar">' + act +
        '<details class="dv-menu" id="dv-menu"><summary class="dv-btn">' + ic('down', 14, 2.2) + 'Export<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>' +
        '<div class="dv-menu-list"><div class="dv-menu-head"><span>Export</span><button type="button" class="soft-square close-btn dv-mclose" data-menu-close aria-label="Close export menu"><svg class="atom be-x" aria-hidden="true"><use href="#be-x-icon"/></svg></button></div><button type="button" data-exp="md">Download Markdown<small>.md</small></button><button type="button" data-exp="html">Download HTML<small>.html</small></button><button type="button" data-exp="json">Download JSON<small>.json</small></button><button type="button" data-exp="copy">Copy as Markdown</button></div></details>' +
        '<button type="button" class="dv-btn" data-act="link">' + ic('link', 14, 2.2) + 'Copy link</button>' +
        '<span id="dv-msg" class="dv-msg" role="status"></span></div>';
      if (st === 'synced') { h += '<p class="dv-msg" style="margin:.6rem 0 0;color:#05485F">' + (SYNCED_NOW[d.id] ? 'Synced just now.' : 'In sync with the workspace.') + '</p>'; }
      head.innerHTML = h;
    }
    function renderBody() {
      var d = D[S.doc], h = '', toc = [];
      d.blocks.forEach(function (b, i) { if (b.t === 'h') toc.push([i, b.x]); });
      if (toc.length > 1) { h += '<nav class="dv-toc" aria-label="On this page"><span>On this page</span>' + toc.map(function (t) { return '<button type="button" data-goto="sec-' + t[0] + '">' + esc(t[1]) + '</button>'; }).join('') + '</nav>'; }
      h += '<div class="dv-prose">' + d.blocks.map(function (b, i) { return blk(b, i, d, 'view'); }).join('') + '</div>';
      var rel = ORDER.filter(function (id) { return id !== d.id && (D[id].wf === d.wf || D[id].tags.some(function (t) { return d.tags.indexOf(t) > -1; })); }).sort(function (a, b) {
        var sa = (D[a].wf === d.wf ? 2 : 0) + D[a].tags.filter(function (t) { return d.tags.indexOf(t) > -1; }).length, sb = (D[b].wf === d.wf ? 2 : 0) + D[b].tags.filter(function (t) { return d.tags.indexOf(t) > -1; }).length; return sb - sa;
      }).slice(0, 3);
      var pos = ORDER.indexOf(d.id), prev = ORDER[pos - 1], next = ORDER[pos + 1];
      h += '<div class="dv-foot">';
      if (rel.length) { h += '<h3>Related documents</h3><div class="dv-rel">' + rel.map(function (id) { var r = D[id]; return '<button type="button" class="dv-card" data-open="' + id + '" data-peek="' + id + '"><span>' + sbadge(eff(r)) + '</span><b>' + esc(r.title) + '</b><span class="s">' + esc(r.summary) + '</span></button>'; }).join('') + '</div>'; }
      h += '<div class="dv-pn">' + (prev ? '<button type="button" class="dv-card" data-open="' + prev + '"><small>Previous</small><b>' + esc(D[prev].title) + '</b></button>' : '<span></span>') +
        (next ? '<button type="button" class="dv-card" data-open="' + next + '" style="text-align:right"><small>Next</small><b>' + esc(D[next].title) + '</b></button>' : '') + '</div></div>';
      body.innerHTML = h;
      fillSheets();
    }
    function fillSheets() {
      Array.prototype.forEach.call(body.querySelectorAll('.dv-sheet-frame'), function (f) {
        var t = sheetTpl(f.getAttribute('data-sheet-id')), sc = f.querySelector('.sheet-scale');
        if (t && sc && !sc.firstChild) { sc.appendChild(t.content.cloneNode(true)); }
      });
      fitSheets();
    }
    function fitSheets() {
      Array.prototype.forEach.call(body.querySelectorAll('.dv-sheet-frame'), function (f) {
        var w = f.clientWidth, sc = f.querySelector('.sheet-scale');
        if (w && sc) { sc.style.transform = 'scale(' + (w / 794) + ')'; sc.classList.add('is-fit'); }
      });
    }
    if (window.ResizeObserver) { new ResizeObserver(fitSheets).observe(dv); }
    window.addEventListener('resize', fitSheets);
    document.addEventListener('viewchange', function () { setTimeout(fitSheets, 40); });

    function renderDoc() {
      RUN++; FL = {};
      renderHead(); renderBody();
      dv.classList.remove('dv-fade'); void dv.offsetWidth; dv.classList.add('dv-fade');
    }

    function setHash() { try { history.replaceState(null, '', '#/documents?d=' + S.doc); } catch (e) { /* restricted environment */ } }
    function select(id, o) {
      o = o || {};
      if (!D[id]) return;
      S.doc = id; reveal(id);
      renderDoc(); renderLib(); setHash();
      var skel = !reduce && o.skeleton !== false;
      if (skel) {
        dv.classList.add('is-loading'); dv.setAttribute('aria-busy', 'true'); clearTimeout(select.t);
        select.t = setTimeout(function () { dv.classList.remove('is-loading'); dv.removeAttribute('aria-busy'); fitSheets(); if (o.focusTitle) { $('dv-title').focus({ preventScroll: true }); } }, 260);
      }
      if (window.innerWidth < 1280) { setPanel(false); dv.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
      else { var r = dv.getBoundingClientRect(); if (r.top < 70) { window.scrollBy(0, r.top - 80); } }
      if (o.focusTitle && !skel) { $('dv-title').focus({ preventScroll: true }); }
    }

    /* ---------- status workflow ---------- */
    function msg(text, bad) {
      var el = $('dv-msg'); if (!el) return;
      el.textContent = text; el.setAttribute('data-bad', bad ? 'true' : 'false');
      clearTimeout(msg.t); msg.t = setTimeout(function () { var e2 = $('dv-msg'); if (e2) e2.textContent = ''; }, 5000);
    }
    function refreshStatus(id) { renderHead(); renderLib(); var b = $('dv-act'); if (b && !b.disabled) { b.focus(); } }
    async function advance() {
      var d = D[S.doc], st = eff(d), id = d.id;
      if (BUSY[id]) return;
      if (st === 'draft') { ST[id] = 'approved'; persist(); refreshStatus(id); msg('Marked as approved.'); }
      else if (st === 'approved') {
        BUSY[id] = true; renderHead();
        await sleep(1100);
        BUSY[id] = false; ST[id] = 'synced'; SYNCED_NOW[id] = true; persist();
        if (S.doc === id) { refreshStatus(id); msg('Synced with the workspace.'); } else { renderLib(); }
      }
    }
    function revert() { var id = S.doc; ST[id] = 'draft'; delete SYNCED_NOW[id]; persist(); refreshStatus(id); msg('Back to draft.'); }

    /* ---------- clipboard + export ---------- */
    function legacyCopy(t) {
      var ta = document.createElement('textarea'), ok = false;
      ta.value = t; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta); return ok;
    }
    function copyText(t) {
      if (navigator.clipboard && navigator.clipboard.writeText) { return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return legacyCopy(t); }); }
      return Promise.resolve(legacyCopy(t));
    }
    function toMD(d) {
      var o = ['# ' + d.title, '', '> ' + STATUS[eff(d)] + ' | ' + d.kind + ' | ' + WF[d.wf] + ' | v' + d.version + ' | Updated ' + fdate(d.updated) + ' | Owner: ' + d.owner, '', d.summary, ''];
      d.blocks.forEach(function (b) {
        switch (b.t) {
          case 'p': o.push(b.x, ''); break;
          case 'h': o.push('## ' + b.x, ''); break;
          case 'h3': o.push('### ' + b.x, ''); break;
          case 'ul': b.items.forEach(function (x) { o.push('- ' + x); }); o.push(''); break;
          case 'ol': b.items.forEach(function (x, i) { o.push((i + 1) + '. ' + x); }); o.push(''); break;
          case 'code': o.push('```' + (b.lang === 'text' ? '' : b.lang), b.code, '```', ''); break;
          case 'note': o.push('> **' + b.title + '.** ' + b.x, ''); break;
          case 'table': o.push('| ' + b.head.join(' | ') + ' |', '| ' + b.head.map(function () { return '---'; }).join(' | ') + ' |'); b.rows.forEach(function (r) { o.push('| ' + r.join(' | ').replace(/\n/g, ' ') + ' |'); }); o.push(''); break;
          case 'wf': o.push('**Workflow summary: ' + b.title + '**', '', '- Trigger: ' + b.trigger, '- Inputs: ' + b.inputs.join(', '), '- Outputs: ' + b.outputs.join(', '), '- Steps: ' + b.steps, '- Typical run time: ' + b.runtime, '- Owner: ' + b.owner, ''); break;
          case 'flow': o.push('**' + b.title + '**', ''); b.nodes.forEach(function (n, i) { o.push((i + 1) + '. **' + n.label + '** (' + TOOL[n.kind] + ', ' + n.time + '): ' + n.d + ' Input: ' + n.i + '. Output: ' + n.o + '.'); }); if (b.retry) { o.push('', '_Retry: ' + b.retry.label + '_'); } o.push(''); break;
          case 'sheet': var t = sheetTpl(b.id); if (t) { o.push('_Sample page: ' + t.getAttribute('data-title') + '. ' + t.getAttribute('data-caption') + '_', ''); } break;
        }
      });
      return o.join('\n');
    }
    function toHTML(d) {
      var css = 'body{margin:0;background:#fff;color:#0B1220;font:17px/1.7 Georgia,serif}main{max-width:46rem;margin:0 auto;padding:2.5rem 1.25rem 4rem}h1,h2,h3{font-family:system-ui,sans-serif;line-height:1.25}h1{font-size:2rem}h2{margin-top:2.2rem;border-top:1px solid #B4BDD0;padding-top:1rem}.meta{font:14px system-ui,sans-serif;color:#2F3A54}pre{background:#0B1020;color:#E6EDF7;padding:1rem;border-radius:.6rem;overflow:auto;font-size:13.5px}code{font-family:ui-monospace,Menlo,monospace;font-size:.88em}table{border-collapse:collapse;width:100%;font:15px system-ui,sans-serif}th{background:#0E1A2B;color:#fff;text-align:left}th,td{padding:.5rem .7rem;border:1px solid #B4BDD0;vertical-align:top}aside{border-left:5px solid #1F6FD1;background:#EAF3FF;padding:.7rem 1rem;margin:1.2rem 0;font-family:system-ui,sans-serif}aside.dv-note--warn{border-color:#A86A0C;background:#FFF4D6}';
      return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + esc(d.title) + '</title><style>' + css + '</style></head><body><main><h1>' + esc(d.title) + '</h1><p class="meta">' +
        esc(STATUS[eff(d)] + ' | ' + d.kind + ' | ' + WF[d.wf] + ' | v' + d.version + ' | Updated ' + fdate(d.updated) + ' | Owner: ' + d.owner) + '</p><p>' + esc(d.summary) + '</p>' +
        d.blocks.map(function (b, i) { return blk(b, i, d, 'export'); }).join('\n').replace(/<aside class="dv-note dv-note--(\w+)"><span[^>]*>.*?<\/span><div>/g, '<aside class="dv-note--$1"><div>') + '</main></body></html>';
    }
    function toJSON(d) { return JSON.stringify({ id: d.id, title: d.title, kind: d.kind, workflow: WF[d.wf], status: eff(d), tags: d.tags, updated: d.updated, version: d.version, owner: d.owner, summary: d.summary, blocks: d.blocks }, null, 2); }
    function getDl() {
      try { if (window.claude && typeof window.claude.use === 'function') { return window.claude.use('downloads').then(function (x) { return x || null; }, function () { return null; }); } } catch (e) { /* no runtime */ }
      return Promise.resolve(null);
    }
    function saveFile(name, data, mime) {
      return getDl().then(function (dl) {
        if (dl) {
          return dl.save({ filename: name, data: data }).then(function () { msg('Saved ' + name + '.'); }, function (err) { msg(err && err.code === 'declined' ? 'Download cancelled.' : 'This file could not be saved here.', !(err && err.code === 'declined')); });
        }
        try {
          var blob = new Blob([data], { type: mime }), url = URL.createObjectURL(blob), a = document.createElement('a');
          a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a);
          setTimeout(function () { URL.revokeObjectURL(url); }, 1500); msg('Download started: ' + name);
        } catch (e) { return copyText(data).then(function (ok) { msg(ok ? 'Download is not available here. Content copied instead.' : 'Export is not available in this browser.', !ok); }); }
      });
    }
    function exportDoc(kind) {
      var d = D[S.doc];
      if (kind === 'md') return saveFile(d.id + '.md', toMD(d), 'text/markdown');
      if (kind === 'html') return saveFile(d.id + '.html', toHTML(d), 'text/html');
      if (kind === 'json') return saveFile(d.id + '.json', toJSON(d), 'application/json');
      if (kind === 'copy') return copyText(toMD(d)).then(function (ok) { msg(ok ? 'Markdown copied to the clipboard.' : 'Could not access the clipboard.', !ok); });
    }

    /* ---------- flow map behaviour ---------- */
    function fmSelect(el, i) {
      var f = FL[el.getAttribute('data-fm')]; if (!f) return;
      Array.prototype.forEach.call(el.querySelectorAll('.fm-node'), function (n) { n.setAttribute('aria-pressed', +n.getAttribute('data-i') === i ? 'true' : 'false'); });
      el.querySelector('.fm-detail').innerHTML = fmDetail(f.b, i);
    }
    function fmReset(el) {
      RUN++;
      Array.prototype.forEach.call(el.querySelectorAll('.fm-node'), function (n) { n.setAttribute('data-st', 'idle'); });
      var r = el.querySelector('[data-fm-run]'); r.disabled = false; r.lastChild.nodeValue = 'Run simulation';
      fmSelect(el, 0);
    }
    async function fmRun(el) {
      var f = FL[el.getAttribute('data-fm')]; if (!f) return;
      var tok = ++RUN, nodes = el.querySelectorAll('.fm-node'), btn = el.querySelector('[data-fm-run]');
      btn.disabled = true; btn.lastChild.nodeValue = 'Running';
      Array.prototype.forEach.call(nodes, function (n) { n.setAttribute('data-st', 'idle'); });
      for (var i = 0; i < nodes.length; i++) {
        if (tok !== RUN) return;
        nodes[i].setAttribute('data-st', 'active'); fmSelect(el, i);
        await sleep(900);
        if (tok !== RUN) return;
        nodes[i].setAttribute('data-st', 'done');
      }
      btn.disabled = false; btn.lastChild.nodeValue = 'Run again';
    }

    /* ---------- reader events ---------- */
    dv.addEventListener('click', function (e) {
      var t = e.target, el;
      if ((el = t.closest('.fm-node'))) { fmSelect(el.closest('.fm'), +el.getAttribute('data-i')); return; }
      if ((el = t.closest('[data-fm-run]'))) { fmRun(el.closest('.fm')); return; }
      if ((el = t.closest('[data-fm-reset]'))) { fmReset(el.closest('.fm')); return; }
      if ((el = t.closest('[data-copy]'))) {
        var code = el.closest('.dv-code').querySelector('pre').textContent;
        copyText(code).then(function (ok) { el.textContent = ok ? 'Copied' : 'Copy failed'; setTimeout(function () { el.textContent = 'Copy'; }, 1600); });
        return;
      }
      if ((el = t.closest('[data-menu-close]'))) { var mm = $('dv-menu'); if (mm) { mm.removeAttribute('open'); var sm = mm.querySelector('summary'); if (sm) { sm.focus(); } } return; }
      if ((el = t.closest('[data-exp]'))) { var m = $('dv-menu'); if (m) { m.removeAttribute('open'); } exportDoc(el.getAttribute('data-exp')); return; }
      if ((el = t.closest('[data-act]'))) {
        var a = el.getAttribute('data-act');
        if (a === 'advance') { advance(); } else if (a === 'revert') { revert(); }
        else if (a === 'link') { copyText(location.href).then(function (ok) { msg(ok ? 'Link copied.' : 'Could not access the clipboard.', !ok); }); }
        return;
      }
      if ((el = t.closest('[data-goto]'))) { var s = $(el.getAttribute('data-goto')); if (s) { s.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); } return; }
      if ((el = t.closest('[data-open]'))) { select(el.getAttribute('data-open'), { focusTitle: true }); }
    });
    dv.addEventListener('keydown', function (e) {
      var n = e.target.closest ? e.target.closest('.fm-node') : null;
      if (n && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        var all = Array.prototype.slice.call(n.closest('.fm-lane').querySelectorAll('.fm-node')), i = all.indexOf(n) + (e.key === 'ArrowRight' ? 1 : -1);
        if (all[i]) { e.preventDefault(); all[i].focus(); fmSelect(n.closest('.fm'), i); }
      }
    });
    document.addEventListener('click', function (e) { var m = $('dv-menu'); if (m && m.open && !m.contains(e.target)) { m.removeAttribute('open'); } });
    document.addEventListener('keydown', function (e) { var m = $('dv-menu'); if (e.key === 'Escape' && m && m.open) { m.removeAttribute('open'); var s = m.querySelector('summary'); if (s) s.focus(); } });

    /* ---------- deep links ---------- */
    function fromHash() { var m = (location.hash || '').match(/^#\/documents\?(?:.*&)?d=([\w-]+)/); return m && D[m[1]] ? m[1] : null; }
    window.addEventListener('hashchange', function () { var id = fromHash(); if (id && id !== S.doc) { S.doc = id; reveal(id); renderDoc(); renderLib(); } });

    /* ---------- init ---------- */
    buildFilters();
    var start = fromHash(); if (start) { S.doc = start; }
    reveal(S.doc);
    renderDoc(); renderLib();
  })();
  
}
