/* Legacy (framework-agnostic) behaviour module: playground. Started from src/legacy/start.js after React mounts. */

export function initPlayground() {
  (function () {
    if (!document.getElementById('playground')) return;

    /* ---------- utilities ---------- */
    function $(id) { return document.getElementById(id); }
    var T = function (s, v) { return window.EL.t(s, v); };
    function lang() { return window.EL.getLang(); }
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function sleep(ms) { return new Promise(function (r) { setTimeout(r, reduce ? Math.min(ms, 30) : ms); }); }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function low(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
    function cut(s, n) {
      if (s.length <= n) return s;
      var c = s.slice(0, n), i = c.lastIndexOf(' ');
      if (i > n * 0.6) c = c.slice(0, i);
      return c.replace(/[\s,;:.]+$/, '') + '…';
    }
    function countWords(t) { return (t.trim().match(/\S+/g) || []).length; }
    function sentences(t) {
      var p = t.replace(/(\d)\.(\d)/g, '$1\u0001$2').replace(/(\d),(\d)/g, '$1\u0002$2');
      return (p.match(/[^.!?]+[.!?]*/g) || []).map(function (s) {
        return s.replace(/\u0001/g, '.').replace(/\u0002/g, ',').trim();
      }).filter(function (s) { return s.length > 12; });
    }
    function grp(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, lang() === 'es' ? '.' : ','); }
    function num(str) {            /* "3,200" | "4.200.000" | "2.5" -> number */
      str = String(str).replace(/[.,]+$/, '');
      if (/^\d{1,3}([.,]\d{3})+$/.test(str)) { return parseFloat(str.replace(/[.,]/g, '')); }
      return parseFloat(str.replace(',', '.'));
    }

    /* ---------- sample inputs (international, English) ---------- */
    function srt(rows) {
      var out = [], t = 2.1;
      rows.forEach(function (txt, i) {
        var a = t, b = t + 4.4 + (i % 3);
        function f(x) { x = Math.round(x * 10) / 10; var s = Math.floor(x), ms = Math.round((x - s) * 1000); return '00:00:' + String(s).padStart(2, '0') + ',' + String(ms).padStart(3, '0'); }
        out.push(String(i + 1), f(a) + ' --> ' + f(b), txt, '');
        t = b + 0.1;
      });
      return out.join('\n').trim();
    }
    var CLIP_NY = srt([
      'So what I wanted to share today is that most B2B teams still lose hours copying and pasting information between tools.',
      'And the real cost is not just the time: the document formatting breaks and somebody has to rebuild it from scratch.',
      'We tested a different workflow: you upload the transcript, a master prompt structures the key ideas and a script lays everything out.',
      'The result is a script with a hook, three key points and a closing line, ready to publish as Shorts and Reels.',
      'On top of that, the same session turns into an X thread without rewriting a single sentence.',
      'Try it on your next conference talk and you will see the difference from day one.'
    ]);
    var CLIP_LDN = srt([
      'Um, the question we keep hearing from operations leaders is how to scale reporting without scaling headcount.',
      'Well, our answer is to treat every recurring report as a data pipeline instead of a writing task.',
      'You feed in the raw figures, the model drafts the narrative against a fixed schema and Python validates every field.',
      'That means finance, legal and sales all get documents that look identical and follow the same structure.',
      'Auditors love it because every output can be traced back to the source data.',
      'If you remember one thing from this panel, automate the format first and the writing second.'
    ]);
    var EST_LDN = 'Viewing 12/10 - luxury penthouse in Mayfair, London. Approx. 3,200 sq ft, 4 bedrooms and 4 bathrooms. Private terrace of 650 sq ft with open skyline views, south-facing. Refurbished 2 years ago, Poggenpohl kitchen, oak flooring. Underground parking for 2 cars and storage room. Building with 24h concierge and lift. Asking price £8,950,000. Vendor flexible on completion date. Note: energy certificate pending.';
    var EST_PAR = 'Viewing 14/10 - Haussmannian apartment in 8th Arrondissement, Paris. About 190 sq m, 3 bedrooms and 2 bathrooms. Original mouldings, herringbone parquet and 3.4 m ceilings. Two balconies with views over the avenue, south-west facing. Fully renovated last year, marble fireplaces. Cellar and storage room. Building with doorman and lift. Asking price €4,200,000. Seller prefers a quick closing. Note: co-ownership charges to be confirmed.';
    var EST_TYO = 'Viewing 16/10 - skyline apartment in Minato City, Tokyo. Around 120 sq m, 2 bedrooms and 2 bathrooms. Floor-to-ceiling windows with open city views, south-east facing. Refurbished 1 year ago, Miele kitchen, walnut flooring. Parking for 1 car and storage. Tower with 24h concierge, gym and lift. Asking price ¥420,000,000. Owner flexible on handover date. Note: management fees pending.';
    var EST_NYC = 'Viewing 18/10 - designer loft in Tribeca, New York. Roughly 2,400 sq ft, 3 bedrooms and 2.5 bathrooms. Cast-iron columns, exposed brick and 12 ft ceilings. Private roof terrace of 500 sq ft with open skyline views, west-facing. Renovated 3 years ago, Gaggenau kitchen, oak flooring. Storage unit. Building with doorman and lift. Asking price $9,750,000. Seller open to offers. Note: board approval process to be confirmed.';

    var PRESETS = {
      clip: [{ id: 'ny', label: 'New York keynote', text: CLIP_NY }, { id: 'ldn', label: 'London panel', text: CLIP_LDN }],
      estate: [{ id: 'ldn', label: 'London', text: EST_LDN }, { id: 'par', label: 'Paris', text: EST_PAR }, { id: 'tyo', label: 'Tokyo', text: EST_TYO }, { id: 'nyc', label: 'New York', text: EST_NYC }]
    };

    /* ---------- case 1: ClipScript AI ---------- */
    function cleanSentence(s) {
      s = s.replace(/\b(um+|uh+|eh+|em+|mm+)\b[.,…]*\s*/gi, '')
           .replace(/^(so|well|okay|ok|and|but|now|then|bueno|pues|vale|entonces|y|pero|además)[,\s]+/i, '')
           .replace(/^(what i wanted to (?:share|say|tell you)(?: today)? is that|lo que quería contaros hoy es que)\s+/i, '')
           .replace(/\s+/g, ' ').trim();
      return cap(s);
    }
    function parseClip(text) {
      var lines = text.replace(/\r/g, '').split('\n'), kept = [], stamps = 0, last = null;
      lines.forEach(function (l) {
        l = l.trim();
        if (!l) return;
        if (/^\d{1,2}:\d{2}:\d{2}[,.]\d{1,3}\s*-->/.test(l)) {
          stamps++;
          var m = l.match(/-->\s*(\d{1,2}):(\d{2}):(\d{2})/);
          if (m) last = [+m[1], +m[2], +m[3]];
          return;
        }
        if (/^\d+$/.test(l)) return;
        kept.push(l);
      });
      var clean = kept.join(' ').replace(/\s+/g, ' ').trim();
      var segs = stamps || Math.max(1, text.split(/\n\s*\n/).filter(function (b) { return b.trim(); }).length);
      var dur = last ? last.map(function (n) { return String(n).padStart(2, '0'); }).join(':') : null;
      return {
        text: clean,
        sentences: sentences(clean).map(cleanSentence).filter(function (s) { return s.length > 12; }),
        segments: segs, words: countWords(clean), duration: dur, isSrt: stamps > 0
      };
    }
    function buildClip(p) {
      var s = p.sentences.length ? p.sentences : [cut(p.text, 120)];
      var d = { kind: 'clip', format: p.isSrt ? 'srt' : 'txt', segments: p.segments, words: p.words, duration: p.duration,
                hook: cut(s[0], 120), points: s.slice(1, 4).map(function (x) { return cut(x, 140); }) };
      return d;
    }
    function viewClip(d) {
      var cta = T('Save this and try it on your next conference talk.');
      var posts = [d.hook + ' 🧵'].concat(d.points, [cta]), total = posts.length;
      var thread = posts.map(function (x, i) {
        var txt = cut((i + 1) + '/' + total + ' ' + x, 280);
        return { n: i + 1, text: txt, chars: txt.length };
      });
      return {
        case: 'clipscript',
        source: { format: d.format, segments: d.segments, words: d.words, duration: d.duration },
        hook: d.hook,
        key_points: d.points,
        reels: [
          { time: '0–3 s', block: T('Hook'), text: d.hook },
          { time: '3–25 s', block: T('Development'), text: d.points.length ? d.points.join(' ') : T('The text does not have enough sentences to develop key points.') },
          { time: '25–30 s', block: T('Close'), text: cta }
        ],
        x_thread: thread,
        file: 'clipscript_script_001.docx'
      };
    }
    function docClip(v) {
      var h = '<article class="pg-page">';
      h += '<p class="pg-kicker">' + esc(T('ClipScript script')) + '</p><h3 class="pg-title">' + esc(v.hook) + '</h3>';
      h += '<div><span class="pg-chip">' + v.source.segments + ' ' + esc(T(v.source.segments === 1 ? 'segment' : 'segments')) + '</span><span class="pg-chip">' + v.source.words + ' ' + esc(T('words')) + '</span>';
      if (v.source.duration) h += '<span class="pg-chip">' + esc(T('Duration')) + ' ' + esc(v.source.duration) + '</span>';
      h += '<span class="pg-chip hl">' + esc(T('Format')) + ' ' + esc(v.source.format) + '</span></div>';
      h += '<h4 class="pg-h">' + esc(T('Shorts and Reels script')) + '</h4>';
      v.reels.forEach(function (r) {
        h += '<div class="pg-row"><div><span class="pg-time">' + esc(r.time) + '</span></div><div><strong>' + esc(r.block) + '.</strong> ' + esc(r.text) + '</div></div>';
      });
      h += '<h4 class="pg-h">' + esc(T('X thread')) + '</h4>';
      v.x_thread.forEach(function (t) {
        h += '<div class="pg-tweet"><div>' + esc(t.text) + '</div><small><span>' + esc(T('Post {n} of {total}', { n: t.n, total: v.x_thread.length })) + '</span><span>' + t.chars + '/280</span></small></div>';
      });
      return h + '<p class="pg-file">' + esc(v.file) + '</p></article>';
    }

    /* ---------- case 2: Estate Dossier AI ---------- */
    var TYPES = {
      penthouse: ['Penthouse', 'Ático', 'm'], apartment: ['Apartment', 'Apartamento', 'm'], flat: ['Flat', 'Piso', 'm'],
      loft: ['Loft', 'Loft', 'm'], townhouse: ['Townhouse', 'Casa adosada', 'f'], villa: ['Villa', 'Villa', 'f'],
      house: ['House', 'Casa', 'f'], duplex: ['Duplex', 'Dúplex', 'm'], studio: ['Studio', 'Estudio', 'm'], mansion: ['Mansion', 'Mansión', 'f'],
      'ático': ['Penthouse', 'Ático', 'm'], 'dúplex': ['Duplex', 'Dúplex', 'm'], piso: ['Flat', 'Piso', 'm'], apartamento: ['Apartment', 'Apartamento', 'm'],
      casa: ['House', 'Casa', 'f'], chalet: ['Villa', 'Chalé', 'm'], finca: ['Estate', 'Finca', 'f']
    };
    var ADJ = {
      luxury: ['Luxury', 'de lujo', 'de lujo'], haussmannian: ['Haussmannian', 'haussmanniano', 'haussmanniana'], period: ['Period', 'de época', 'de época'],
      modern: ['Modern', 'moderno', 'moderna'], designer: ['Designer', 'de diseño', 'de diseño'], skyline: ['Skyline', 'skyline', 'skyline'],
      historic: ['Historic', 'histórico', 'histórica'], waterfront: ['Waterfront', 'frente al agua', 'frente al agua'], riverside: ['Riverside', 'junto al río', 'junto al río'],
      contemporary: ['Contemporary', 'contemporáneo', 'contemporánea']
    };
    var AREA_RE = '(\\d[\\d.,]*)\\s*(sq\\.?\\s?ft|sqft|square feet|sq\\.?\\s?m|sqm|square (?:metres|meters)|m2|m²|metros cuadrados)';
    function areaObj(v, u) { return { v: num(v), u: /ft|feet/i.test(u) ? 'sq ft' : 'm²' }; }
    function fmtArea(a) { return grp(a.v) + ' ' + a.u; }
    var CUR = { '£': 'GBP', '€': 'EUR', '$': 'USD', '¥': 'JPY' };
    var SYM = { GBP: '£', EUR: '€', USD: '$', JPY: '¥' };
    function fmtMoney(p) { return lang() === 'es' ? grp(p.amount) + ' ' + SYM[p.cur] : SYM[p.cur] + grp(p.amount); }
    var DIR = { south: 'sur', north: 'norte', east: 'este', west: 'oeste', 'south-east': 'sureste', 'south-west': 'suroeste', 'north-east': 'noreste', 'north-west': 'noroeste' };
    var VIEWS = { open: ['Open views', 'Vistas despejadas'], panoramic: ['Panoramic views', 'Vistas panorámicas'], skyline: ['Skyline views', 'Vistas al skyline'], city: ['City views', 'Vistas a la ciudad'], river: ['River views', 'Vistas al río'], park: ['Park views', 'Vistas al parque'], sea: ['Sea views', 'Vistas al mar'], garden: ['Garden views', 'Vistas al jardín'], avenue: ['Avenue views', 'Vistas a la avenida'] };
    var FLOOR = { oak: ['Oak flooring', 'Suelos de roble'], walnut: ['Walnut flooring', 'Suelos de nogal'], marble: ['Marble flooring', 'Suelos de mármol'] };
    function L(en, es_) { return lang() === 'es' ? es_ : en; }
    var LB = {
      pool: function () { return L('Swimming pool', 'Piscina'); },
      terrace: function (a) { return L('Terrace of ', 'Terraza de ') + fmtArea(a); },
      terrace_plain: function () { return L('Terrace', 'Terraza'); },
      balconies: function (a) { return L(a + ' balconies', a + ' balcones'); },
      balcony: function () { return L('Balcony', 'Balcón'); },
      views: function (a) { return VIEWS[a][lang() === 'es' ? 1 : 0]; },
      orient: function (a) { return L(cap(a) + (a.indexOf('-') > -1 ? ' facing' : '-facing'), 'Orientación ' + (DIR[a] || a)); },
      garden: function () { return L('Garden', 'Jardín'); },
      parking_n: function (a) { return L('Parking for ' + a + (a === 1 ? ' car' : ' cars'), 'Garaje con ' + a + (a === 1 ? ' plaza' : ' plazas')); },
      parking: function () { return L('Parking', 'Garaje'); },
      storage: function () { return L('Storage', 'Trastero'); },
      cellar: function () { return L('Cellar', 'Bodega'); },
      reno_n: function (a) { return L('Renovated ' + a + (a === 1 ? ' year ago' : ' years ago'), 'Reformado hace ' + a + (a === 1 ? ' año' : ' años')); },
      reno_last: function () { return L('Renovated last year', 'Reformado el año pasado'); },
      kitchen: function (a) { return L(a + ' kitchen', 'Cocina ' + a); },
      floor: function (a) { return FLOOR[a][lang() === 'es' ? 1 : 0]; },
      parquet: function () { return L('Herringbone parquet', 'Parqué en espiga'); },
      ceilings: function (a) { return L(a + ' ceilings', 'Techos de ' + a.replace('.', ',')); },
      mouldings: function () { return L('Original mouldings', 'Molduras originales'); },
      fireplace: function (a) { return a ? L('Marble fireplaces', 'Chimeneas de mármol') : L('Fireplace', 'Chimenea'); },
      windows: function () { return L('Floor-to-ceiling windows', 'Ventanales de suelo a techo'); },
      brick: function () { return L('Exposed brick', 'Ladrillo visto'); },
      columns: function () { return L('Cast-iron columns', 'Columnas de hierro fundido'); },
      lift: function () { return L('Lift', 'Ascensor'); },
      concierge24: function () { return L('24h concierge', 'Conserjería 24 h'); },
      concierge: function () { return L('Concierge', 'Conserjería'); },
      gym: function () { return L('Gym', 'Gimnasio'); },
      ac: function () { return L('Air conditioning', 'Aire acondicionado'); }
    };
    /* [regex, key, group, paramFn] */
    var FEATS = [
      [/swimming pool|\bpool\b|piscina/i, 'pool', 'pool'],
      [new RegExp('terrace[^.]*?' + AREA_RE, 'i'), 'terrace', 'terrace', function (m) { return areaObj(m[1], m[2]); }],
      [/terrace|terraza/i, 'terrace_plain', 'terrace'],
      [/\b(two|three|four|\d)\s+balconies/i, 'balconies', 'balcony', function (m) { return ({ two: 2, three: 3, four: 4 })[m[1].toLowerCase()] || m[1]; }],
      [/balcon/i, 'balcony', 'balcony'],
      [/\b(open|panoramic|skyline|city|river|park|sea|garden|avenue)\s+views?\b/i, 'views', 'views', function (m) { return m[1].toLowerCase(); }],
      [/views? over the (avenue|park|river|city|sea|garden)/i, 'views', 'views', function (m) { return m[1].toLowerCase(); }],
      [/\b(south|north|east|west|south-east|south-west|north-east|north-west)[- ]facing|orientaci[oó]n\s+(sur|norte|este|oeste)/i, 'orient', 'orient', function (m) { var d = (m[1] || ({ sur: 'south', norte: 'north', este: 'east', oeste: 'west' })[m[2].toLowerCase()]).toLowerCase(); return d; }],
      [/jard[ií]n|\bgarden\b(?!\s+views)/i, 'garden', 'garden'],
      [/(?:parking|garage|garaje)[^.]*?(?:for\s+)?(\d+)\s*(?:cars?|spaces?|plazas?)/i, 'parking_n', 'parking', function (m) { return +m[1]; }],
      [/parking|garage|garaje/i, 'parking', 'parking'],
      [/storage|trastero/i, 'storage', 'storage'],
      [/\bcellar\b|bodega/i, 'cellar', 'cellar'],
      [/(?:refurbished|renovated|reformad[oa])\s+(\d+)\s+years?\s+ago|reformad[oa] hace (\d+) años?/i, 'reno_n', 'reno', function (m) { return +(m[1] || m[2]); }],
      [/(?:fully\s+)?(?:refurbished|renovated)\s+last year/i, 'reno_last', 'reno'],
      [/\b([A-Z][A-Za-z]+) kitchen\b/, 'kitchen', 'kitchen', function (m) { return m[1]; }],
      [/\b(oak|walnut|marble)\s+(?:flooring|floors?)/i, 'floor', 'floor', function (m) { return m[1].toLowerCase(); }],
      [/herringbone parquet/i, 'parquet', 'parquet'],
      [/(\d+(?:[.,]\d)?\s?(?:m|ft))\s+ceilings?/i, 'ceilings', 'ceilings', function (m) { return m[1].replace(/\s+/g, ' ').replace(/(\d)(m|ft)/, '$1 $2'); }],
      [/original (?:mouldings|moldings)|cornicing/i, 'mouldings', 'mouldings'],
      [/fireplaces?|chimenea/i, 'fireplace', 'fireplace', function (m, t) { return /marble\s+fireplace/i.test(t); }],
      [/floor-to-ceiling windows/i, 'windows', 'windows'],
      [/exposed brick/i, 'brick', 'brick'],
      [/cast-iron columns/i, 'columns', 'columns'],
      [/\b(lift|elevator)\b|ascensor/i, 'lift', 'lift'],
      [/24\s?h\s+(?:concierge|doorman)|(?:concierge|doorman)[^.]{0,12}24\s?h/i, 'concierge24', 'concierge'],
      [/concierge|doorman|portero|conserje/i, 'concierge', 'concierge'],
      [/\bgym\b|gimnasio/i, 'gym', 'gym'],
      [/air[- ]conditioning|aire acondicionado/i, 'ac', 'ac']
    ];

    function parseEstate(text) {
      var t = text.replace(/\s+/g, ' ').trim();
      return { text: t, words: countWords(t) };
    }
    function buildEstate(p) {
      var t = p.text, m, d = { kind: 'estate' };
      var typeRe = new RegExp('(?:^|[^A-Za-zÁ-ú])(?:(' + Object.keys(ADJ).join('|') + ')\\s+)?(' + Object.keys(TYPES).join('|') + ')(?=[^A-Za-zÁ-ú]|$)', 'i');
      if ((m = t.match(typeRe))) { d.type = m[2].toLowerCase(); d.adj = m[1] ? m[1].toLowerCase() : null; }
      if ((m = t.match(/\b(?:in|en)\s+(?:the\s+)?([A-Z0-9][\w'’\-]*(?:\s+[A-Z0-9][\w'’\-]*)*(?:,\s*[A-Z][\w'’\-]*(?:\s+[A-Z][\w'’\-]*)*)?)/))) { d.loc = m[1]; }
      if ((m = t.match(new RegExp(AREA_RE, 'i')))) { d.area = areaObj(m[1], m[2]); }
      if ((m = t.match(/(\d+)[\s-]*(?:bedrooms?|beds?|br\b|dormitorios|habitaciones)/i))) { d.bed = +m[1]; }
      if ((m = t.match(/(\d+(?:[.,]5)?)[\s-]*(?:bathrooms?|baths?|baños|aseos)/i))) { d.bath = parseFloat(m[1].replace(',', '.')); }
      if ((m = t.match(/([£€$¥])\s?(\d[\d.,]*)\s?(million|mn|m\b|bn|billion)?/i))) {
        var mult = /million|mn|^m$/i.test(m[3] || '') ? 1e6 : (/bn|billion/i.test(m[3] || '') ? 1e9 : 1);
        d.price = { amount: num(m[2]) * mult, cur: CUR[m[1]] };
      } else if ((m = t.match(/(\d[\d.,]*)\s?(million|m\b)?\s?(gbp|eur|usd|jpy|euros?|pounds?|dollars?|yen)/i))) {
        var u = m[3].toLowerCase(), cur = /gbp|pound/.test(u) ? 'GBP' : /usd|dollar/.test(u) ? 'USD' : /jpy|yen/.test(u) ? 'JPY' : 'EUR';
        d.price = { amount: num(m[1]) * (m[2] ? 1e6 : 1), cur: cur };
      }
      var used = {}; d.feats = [];
      FEATS.forEach(function (f) {
        if (used[f[2]]) return;
        var mm = t.match(f[0]);
        if (!mm) return;
        used[f[2]] = true;
        d.feats.push({ k: f[1], a: f[3] ? f[3](mm, t) : undefined });
      });
      d.pending = []; d.notes = [];
      sentences(t).forEach(function (s) {
        if (/\b(note|pending|awaiting|to be confirmed|tbc|tbd|missing|to confirm|ojo|pendiente|falta|por confirmar)\b/i.test(s)) { d.pending.push(cap(s.replace(/^(note|ojo)[:,]?\s*/i, '').replace(/[.]+$/, ''))); }
        else if (/\b(vendor|seller|owner|flexible|negotiable|open to offers|keys|completion|handover|closing|propietario|llaves|entrega)\b/i.test(s)) { d.notes.push(cap(s.replace(/[.]+$/, ''))); }
      });
      d.found = [d.type, d.loc, d.area, d.bed, d.bath, d.price].filter(function (v) { return v !== undefined && v !== null; }).length;
      return d;
    }
    function viewEstate(d) {
      var es_ = lang() === 'es', ty = d.type ? TYPES[d.type] : null, ad = d.adj ? ADJ[d.adj] : null;
      var typeLabel = ty ? ty[es_ ? 1 : 0] : T('Property');
      var title;
      if (es_) { title = typeLabel + (ad ? ' ' + (ty && ty[2] === 'f' ? ad[2] : ad[1]) : '') + (d.loc ? ' en ' + d.loc : ''); }
      else { title = (ad ? ad[0] + ' ' : '') + typeLabel + (d.loc ? ' in ' + d.loc : ''); }
      var feats = d.feats.map(function (f) { return LB[f.k](f.a); });
      var terrace = null;
      d.feats.forEach(function (f) { if (f.k === 'terrace') { terrace = fmtArea(f.a); } });
      var price = d.price ? fmtMoney(d.price) : null;
      var sizes = [];
      if (d.bed !== undefined) sizes.push(d.bed + ' ' + T(d.bed === 1 ? 'bedroom' : 'bedrooms'));
      if (d.bath !== undefined) sizes.push(grpDec(d.bath) + ' ' + T(d.bath === 1 ? 'bathroom' : 'bathrooms'));
      var desc = title;
      if (sizes.length) { desc += (es_ ? ', con ' : ', with ') + sizes.join(es_ ? ' y ' : ' and '); }
      if (d.area) { desc += (es_ ? ', de ' : ', spanning ') + fmtArea(d.area); }
      desc += '.';
      if (feats.length) { desc += (es_ ? ' Destacan ' : ' Highlights include ') + feats.slice(0, 4).map(low).join(', ') + '.'; }
      if (price) { desc += (es_ ? ' Precio: ' : ' Offered at ') + price + '.'; }
      var tbc = T('To be confirmed');
      return {
        title: title, desc: desc, feats: feats, pending: d.pending, notes: d.notes, price: price, file: 'estate_dossier_001.docx',
        rows: [
          [T('Type'), ty ? typeLabel : null], [T('Location'), d.loc || null], [T('Built area'), d.area ? fmtArea(d.area) : null],
          [T('Bedrooms'), d.bed !== undefined ? String(d.bed) : null], [T('Bathrooms'), d.bath !== undefined ? grpDec(d.bath) : null],
          [T('Terrace'), terrace]
        ],
        tbc: tbc,
        json: {
          case: 'estate_dossier', title: title,
          property: { type: d.type || null, location: d.loc || null, area: d.area ? { value: d.area.v, unit: d.area.u } : null, bedrooms: d.bed === undefined ? null : d.bed, bathrooms: d.bath === undefined ? null : d.bath, price: d.price ? { amount: d.price.amount, currency: d.price.cur } : null },
          description: desc, features: feats, pending: d.pending, internal_notes: d.notes, file: 'estate_dossier_001.docx'
        }
      };
    }
    function grpDec(n) { return String(n).replace('.', lang() === 'es' ? ',' : '.'); }
    function docEstate(v) {
      function val(x) { return x === null ? '<span class="pg-miss">' + esc(v.tbc) + '</span>' : esc(x); }
      var h = '<article class="pg-page">';
      h += '<p class="pg-kicker">' + esc(T('Property dossier')) + '</p><h3 class="pg-title">' + esc(v.title) + '</h3>';
      h += '<p class="pg-price">' + (v.price ? esc(v.price) : '<span class="pg-miss" style="font-size:15px;font-weight:400">' + esc(T('Price to be confirmed')) + '</span>') + '</p>';
      h += '<h4 class="pg-h">' + esc(T('Fact sheet')) + '</h4><table class="pg-table"><tbody>';
      v.rows.forEach(function (r) { h += '<tr><td>' + esc(r[0]) + '</td><td>' + val(r[1]) + '</td></tr>'; });
      h += '</tbody></table>';
      h += '<h4 class="pg-h">' + esc(T('Description')) + '</h4><p style="margin:0">' + esc(v.desc) + '</p>';
      h += '<h4 class="pg-h">' + esc(T('Key features')) + '</h4><div>';
      if (v.feats.length) { v.feats.forEach(function (c) { h += '<span class="pg-chip hl">' + esc(c) + '</span>'; }); }
      else { h += '<span class="pg-miss">' + esc(T('No features were detected in the notes.')) + '</span>'; }
      h += '</div>';
      if (v.notes.length) {
        h += '<h4 class="pg-h">' + esc(T('Internal notes')) + '</h4><ul style="margin:0;padding-left:18px">';
        v.notes.forEach(function (n) { h += '<li>' + esc(n) + '</li>'; });
        h += '</ul>';
      }
      if (v.pending.length) {
        h += '<h4 class="pg-h">' + esc(T('Pending confirmation')) + '</h4><ul class="pg-todo">';
        v.pending.forEach(function (n) { h += '<li>' + esc(n) + '</li>'; });
        h += '</ul>';
      }
      return h + '<p class="pg-file">' + esc(v.file) + '</p></article>';
    }

    /* ---------- case definitions ---------- */
    var CASES = {
      clip: { label: 'Input: raw transcript', format: '.srt', empty: 'The Shorts and Reels script and the X thread will appear here. Edit the transcript if you like and run the pipeline.',
              parse: parseClip, build: buildClip, view: viewClip, doc: docClip, json: function (v) { return v; }, tab: 'pg-tab-clip',
              d1: function (p) { return T('{n} segments, {w} words', { n: p.segments, w: p.words }) + (p.duration ? ', ' + T('duration') + ' ' + p.duration : ''); },
              d2: function (d) { return T('Hook, key points ({n}) and thread ({m} posts)', { n: d.points.length, m: d.points.length + 2 }); } },
      estate: { label: 'Input: raw viewing notes', format: '.txt', empty: 'The property dossier will appear here. Edit the notes if you like and run the pipeline.',
              parse: parseEstate, build: buildEstate, view: viewEstate, doc: docEstate, json: function (v) { return v.json; }, tab: 'pg-tab-estate',
              d1: function (p) { return T('Notes read: {w} words', { w: p.words }); },
              d2: function (d) { return T('{n} of 6 key data points and {m} features extracted', { n: d.found, m: d.feats.length }); } }
    };

    /* ---------- DOM ---------- */
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.pg-tab'));
    var panel = $('pg-panel'), input = $('pg-input'), inputLabel = $('pg-input-label'), formatEl = $('pg-format'), presetsEl = $('pg-presets');
    var countEl = $('pg-count'), resetBtn = $('pg-reset'), runBtn = $('pg-run'), runLabel = $('pg-run-label'), errEl = $('pg-error');
    var stageEl = $('pg-stage'), pctEl = $('pg-pct'), barEl = $('pg-bar'), fillEl = $('pg-bar-fill');
    var steps = Array.prototype.slice.call(document.querySelectorAll('.pg-step'));
    var emptyEl = $('pg-empty'), emptyText = $('pg-empty-text'), docEl = $('pg-doc'), jsonEl = $('pg-json');
    var viewBtns = Array.prototype.slice.call(document.querySelectorAll('.pg-view'));
    var dlBtn = $('pg-dl'), dlLabel = $('pg-dl-label'), dlMsg = $('pg-dl-msg');

    var state = {
      clip: { text: PRESETS.clip[0].text, preset: 'ny', out: null, details: null, status: 'idle' },
      estate: { text: PRESETS.estate[0].text, preset: 'ldn', out: null, details: null, status: 'idle' }
    };
    var cur = 'clip', view = 'doc', running = false;

    /* ---------- UI helpers ---------- */
    function updateCount() { var w = countWords(input.value); countEl.textContent = w === 1 ? T('1 word') : T('{n} words', { n: w }); }
    function showError(msg) { errEl.textContent = msg; errEl.classList.remove('hidden'); }
    function hideError() { errEl.textContent = ''; errEl.classList.add('hidden'); }
    function setProgress(p) {
      var v = Math.round(p);
      fillEl.style.width = v + '%'; pctEl.textContent = v + '%'; barEl.setAttribute('aria-valuenow', String(v));
    }
    function tween(from, to, ms) {
      return new Promise(function (resolve) {
        if (reduce) { setProgress(to); setTimeout(resolve, 30); return; }
        var t0 = performance.now();
        (function frame(now) {
          var k = Math.min(1, (now - t0) / ms);
          setProgress(from + (to - from) * (1 - Math.pow(1 - k, 2)));
          if (k < 1) { requestAnimationFrame(frame); } else { resolve(); }
        })(t0);
      });
    }
    function setStep(i, st) { steps[i].setAttribute('data-state', st); }
    function paintDetails() {
      var dt = state[cur].details;
      steps.forEach(function (s, i) { s.querySelector('.pg-detail').textContent = dt && dt[i] ? dt[i]() : ''; });
    }
    function setStage(key) { state[cur].status = key; stageEl.textContent = stageText(key); }
    function stageText(key) {
      var map = {
        idle: 'Ready to run', s1: null, s2: null, s3: null,
        done: 'Completed. Review the result and download the template.',
        modified: 'Text modified. Run again to update the result.',
        restored: 'Example restored. Run again to update the result.',
        previous: 'Previous result. Run again to update it.'
      };
      if (key === 's1') return '[1/3] Parsing TXT/SRT…';
      if (key === 's2') return '[2/3] Executing Claude Master Prompt…';
      if (key === 's3') return '[3/3] Generating .docx Layout…';
      return T(map[key] || map.idle);
    }
    function setBusy(b) {
      running = b;
      runBtn.disabled = b;
      runLabel.textContent = T(b ? 'Running…' : 'Run Python + Claude Pipeline');
      tabs.forEach(function (t) { t.setAttribute('aria-disabled', b ? 'true' : 'false'); });
      resetBtn.disabled = b;
      input.readOnly = b;
      Array.prototype.forEach.call(presetsEl.children, function (p) { p.disabled = b; });
    }
    function applyView() {
      var has = !!state[cur].out;
      docEl.classList.toggle('hidden', !(has && view === 'doc'));
      jsonEl.classList.toggle('hidden', !(has && view === 'json'));
      viewBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-pgview') === view ? 'true' : 'false'); });
    }
    function highlight(json) {
      return json.replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?|[{}\[\],]/g, function (m, str, colon, bool) {
        if (str) { return colon ? '<span class="tok-k">' + esc(str) + '</span><span class="tok-p">:</span>' : '<span class="tok-s">' + esc(str) + '</span>'; }
        if (bool) { return '<span class="tok-b">' + m + '</span>'; }
        if (/^-?\d/.test(m)) { return '<span class="tok-n">' + m + '</span>'; }
        return '<span class="tok-p">' + m + '</span>';
      });
    }
    function renderOutput() {
      var c = CASES[cur], out = state[cur].out;
      emptyText.textContent = T(c.empty);
      emptyEl.classList.toggle('hidden', !!out);
      if (out) {
        var v = c.view(out);
        docEl.innerHTML = c.doc(v);
        jsonEl.innerHTML = highlight(JSON.stringify(c.json(v), null, 2));
      } else { docEl.innerHTML = ''; jsonEl.innerHTML = ''; }
      applyView();
      dlBtn.disabled = !out || running;
    }
    function renderPresets() {
      presetsEl.innerHTML = '';
      PRESETS[cur].forEach(function (p) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = T(p.label);
        b.className = 'rounded-md border px-2.5 py-1 text-xs transition-colors ' +
          (state[cur].preset === p.id ? 'border-cyan-neon/60 bg-cyan-neon/10 text-cyan-neon' : 'border-white/10 bg-ink text-slate-300 hover:text-white');
        b.setAttribute('aria-pressed', state[cur].preset === p.id ? 'true' : 'false');
        b.addEventListener('click', function () {
          if (running) return;
          state[cur].preset = p.id; state[cur].text = p.text; input.value = p.text;
          updateCount(); hideError(); renderPresets();
          if (state[cur].out) { setStage('restored'); }
        });
        presetsEl.appendChild(b);
      });
    }
    function renderLabels() {
      var c = CASES[cur];
      inputLabel.textContent = T(c.label);
      formatEl.textContent = c.format;
      runLabel.textContent = T(running ? 'Running…' : 'Run Python + Claude Pipeline');
      dlLabel.textContent = T('Download structured .docx template');
      updateCount();
      renderPresets();
      stageEl.textContent = stageText(state[cur].status);
      paintDetails();
    }

    /* ---------- switching use case ---------- */
    function setCase(name) {
      if (!CASES[name] || name === cur) return;
      state[cur].text = input.value;
      cur = name;
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-case') === cur;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
      });
      panel.setAttribute('aria-labelledby', CASES[cur].tab);
      input.value = state[cur].text;
      hideError();
      dlMsg.classList.add('hidden'); dlMsg.textContent = '';
      steps.forEach(function (s) { setStep(steps.indexOf(s), state[cur].out ? 'done' : 'pending'); });
      setProgress(state[cur].out ? 100 : 0);
      state[cur].status = state[cur].out ? 'previous' : 'idle';
      renderLabels();
      renderOutput();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { if (!running) setCase(tab.getAttribute('data-case')); });
      tab.addEventListener('keydown', function (e) {
        var idx = i;
        if (e.key === 'ArrowRight') idx = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') idx = 0;
        else if (e.key === 'End') idx = tabs.length - 1;
        else return;
        e.preventDefault();
        if (running) return;
        tabs[idx].focus();
        setCase(tabs[idx].getAttribute('data-case'));
      });
    });
    viewBtns.forEach(function (b) { b.addEventListener('click', function () { view = b.getAttribute('data-pgview'); applyView(); }); });

    input.addEventListener('input', function () {
      updateCount(); hideError();
      if (state[cur].out && !running) { setStage('modified'); }
    });
    resetBtn.addEventListener('click', function () {
      var p = PRESETS[cur].filter(function (x) { return x.id === state[cur].preset; })[0] || PRESETS[cur][0];
      input.value = p.text; state[cur].text = p.text;
      updateCount(); hideError();
      if (state[cur].out) { setStage('restored'); }
    });

    /* ---------- pipeline ---------- */
    async function run() {
      if (running) return;
      var text = input.value;
      if (!text.trim()) { showError(T('Type or paste some text to process.')); input.focus(); return; }
      hideError();
      var name = cur, c = CASES[name];
      state[name].text = text; state[name].out = null; state[name].details = null;
      setBusy(true);
      dlMsg.classList.add('hidden'); dlMsg.textContent = '';
      steps.forEach(function (s, i) { setStep(i, 'pending'); });
      setProgress(0); paintDetails(); renderOutput();

      setStep(0, 'active'); setStage('s1');
      await tween(0, 33, 750);
      var parsed = c.parse(text);
      state[name].details = [function () { return c.d1(parsed); }];
      setStep(0, 'done'); paintDetails();

      setStep(1, 'active'); setStage('s2');
      await tween(33, 66, 1500);
      var built = c.build(parsed);
      state[name].details = [function () { return c.d1(parsed); }, function () { return c.d2(built); }];
      setStep(1, 'done'); paintDetails();

      setStep(2, 'active'); setStage('s3');
      await tween(66, 100, 1000);
      state[name].details.push(function () { return name === 'clip' ? 'clipscript_script_001.docx' : 'estate_dossier_001.docx'; });
      setStep(2, 'done'); paintDetails();

      state[name].out = built;
      setStage('done');
      setBusy(false);
      renderOutput();
    }
    runBtn.addEventListener('click', run);

    /* ---------- simulated download ---------- */
    dlBtn.addEventListener('click', async function () {
      var out = state[cur].out;
      if (!out || dlBtn.disabled) return;
      var file = CASES[cur].view(out).file || CASES[cur].view(out).json.file;
      dlBtn.disabled = true;
      dlMsg.classList.add('hidden');
      dlLabel.textContent = T('Preparing file…');
      await sleep(1100);
      dlLabel.textContent = T('Download structured .docx template');
      dlBtn.disabled = false;
      dlMsg.textContent = T('Simulation complete: in the Gumroad kits this button downloads {file} with styles and layout already applied.', { file: file });
      dlMsg.classList.remove('hidden');
    });

    /* ---------- language changes ---------- */
    document.addEventListener('langchange', function () {
      renderLabels(); renderOutput();
      if (!dlMsg.classList.contains('hidden')) { dlMsg.classList.add('hidden'); dlMsg.textContent = ''; }
    });

    /* ---------- initial state ---------- */
    input.value = state[cur].text;
    renderLabels();
    renderOutput();
  })();
  
}
