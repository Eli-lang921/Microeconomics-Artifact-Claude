/* =====================================================================
   UNIT 6: FACTOR MARKETS (Lessons 29-32)
   Built 2026-11-04 from Modern States video 6.1 (transcript) and Module 6 slides (global numbers 247-269), the course textbook
   (OpenStax Principles of Microeconomics, 2016 edition) ch. 4 introduction, §4.1, §15.1 and §15.3, the CLEP outline and sample questions 4 and 6,
   OpenStax Principles of Microeconomics 2e §14.1-§14.2 (a newer edition, used only as a cross-check and labelled as such), Econlib (Gorman, Reynolds)
   and Federal Reserve Education. Source problems found in the course materials are listed in docs/unit6-build-notes.md and flagged in the lessons.
   ===================================================================== */

/* ---------- Unit 6 sources ---------- */
Object.assign(SOURCES, {
  MS6:  { t:'Modern States, Principles of Microeconomics, Module 6 video (6.1) and slides', u:'https://modernstates.org/course/principles-of-microeconomics/' },
  OS40: { t:'OpenStax, Principles of Microeconomics (your course textbook), ch. 4 introduction (labor markets)', u:'https://openstax.org/books/principles-economics-3e/pages/4-introduction-to-labor-and-financial-markets' },
  OS151:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §15.1 (unions)', u:'https://openstax.org/books/principles-economics-3e/pages/15-1-unions' },
  OS153:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §15.3 (immigration)', u:'https://openstax.org/books/principles-economics-3e/pages/15-3-immigration' },
  OSE141:{ t:'OpenStax, Principles of Microeconomics 2e (a newer edition, not your course textbook), §14.1', u:'https://openstax.org/books/principles-microeconomics-2e/pages/14-1-the-theory-of-labor-markets' },
  OSE142:{ t:'OpenStax, Principles of Microeconomics 2e (a newer edition, not your course textbook), §14.2', u:'https://openstax.org/books/principles-microeconomics-2e/pages/14-2-wages-and-employment-in-an-imperfectly-competitive-labor-market' },
  ELMW: { t:'Econlib, "Minimum Wages" (Linda Gorman)', u:'https://www.econlib.org/library/Enc/MinimumWages.html' },
  ELLU: { t:'Econlib, "Labor Unions" (Morgan O. Reynolds)', u:'https://www.econlib.org/library/Enc/LaborUnions.html' },
  FEDL: { t:'Federal Reserve Education, "The Labor Market" (video assignment)', u:'https://www.federalreserveeducation.org/teaching-resources/economics/labor-income/the-labor-market' }
});
/* Existing keys reused: CB (CLEP outline), CBS (CLEP sample questions: Q4 least-cost inputs, Q6 marginal factor cost), OS41 (§4.1), OS92 (§9.2, MR below price). */

/* ---------- Unit 6 glossary (tap-to-define). Reused: factors, labor, capital, land, household, firm, production-function, total-product, marginal-product,
   dim-returns, price-taker, marginal-revenue, monopoly, mr-mc, marginal-profit, equilibrium, excess-supply, shortage, price-floor, inputs, complements, substitutes. ---------- */
Object.assign(GLOSS, {
  'factor-market':{ t:'Factor market', d:'A market where the inputs of production (labor, capital, natural resources) are bought and sold. Firms are the buyers and households are the sellers.', home:'l29', src:['MS6','OS40'] },
  'product-market':{ t:'Product market', d:'A market for goods and services. Firms are the sellers and households are the buyers, the reverse of a factor market.', home:'l29', src:['OS40'] },
  'derived-demand':{ t:'Derived demand', d:'Demand for an input that comes from the demand for the good or service it helps make. Example: the demand for chefs depends on the demand for restaurant meals.', home:'l29', src:['MS6','OS41','FEDL'] },
  'labor-demand':{ t:'Demand for labor', d:'How many workers employers want to hire at each wage. Employers are the demanders, and the curve slopes down: at a lower wage they want more workers.', home:'l29', src:['OS41','MS6'] },
  'market-power':{ t:'Market power', d:'A firm\'s ability to set its own price. A firm with market power must cut its price to sell more, so its marginal revenue is below the price.', home:'l30', src:['OS92'] },
  'labor-supply':{ t:'Supply of labor', d:'How many people want to work at each wage. Households are the suppliers, and the market curve slopes up: at a higher wage more people give up leisure to work.', home:'l29', src:['OS41','MS6'] },
  compensation:{ t:'Labor compensation', d:'The full price of labor: wage or salary plus benefits. Benefits can be as much as 30 percent of it.', home:'l29', src:['OS41'] },
  vmp:{ t:'Value of the marginal product (VMP)', d:'The dollar value of what one more worker adds: marginal product of labor × the price of the output. Your course: the firm\'s "willingness to pay for labor."', home:'l30', src:['MS6','OSE141'] },
  mrp:{ t:'Marginal revenue product (MRP)', d:'The extra revenue from one more worker: marginal product × marginal revenue. For a price taker, MR = price, so MRP equals the value of the marginal product.', home:'l30', src:['MS6','OSE141','CB'] },
  'hiring-rule':{ t:'Hiring rule', d:'A profit-maximizing firm hires workers until the value of the last worker\'s output (MRP) equals what that worker adds to cost (the wage, or marginal factor cost).', home:'l30', src:['MS6','OSE141'] },
  'tech-substitute':{ t:'Technology as a substitute for labor', d:'A technology that does a job workers used to do, so it lowers the demand for those workers. Word processing reduced the demand for typists.', home:'l31', src:['OS41'] },
  'tech-complement':{ t:'Technology as a complement to labor', d:'A technology that makes some workers more useful, so it raises the demand for them. Office software raised the demand for IT professionals.', home:'l31', src:['OS41'] },
  mfc:{ t:'Marginal factor cost (MFC)', d:'What one more unit of an input adds to the firm\'s total cost: change in total cost ÷ change in the input. When the wage stays the same however many are hired, MFC = the wage.', home:'l32', src:['MS6','CBS'] },
  'competitive-labor-market':{ t:'Perfectly competitive labor market', d:'A labor market where each firm can hire all the workers it wants at the going market wage, because it is too small to move that wage.', home:'l32', src:['OSE141','CBS'] },
  'market-wage':{ t:'Market wage', d:'The equilibrium wage set by the supply of labor from households and the demand for labor from firms. In a competitive labor market each firm takes it as given.', home:'l32', src:['OS41','MS6'] },
  monopsony:{ t:'Monopsony', d:'A market with a single buyer, such as the only employer in a town. To hire more workers it must raise the wage for all of them, so its marginal factor cost is above the wage.', home:'l32', src:['OSE142'] },
  'labor-union':{ t:'Labor union', d:'An organization of workers that negotiates with employers over wages and working conditions.', home:'l32', src:['OS151'] }
});

/* ---------- tags: [src, clep key, skill, mistakes] ---------- */
const U6CLEP = { der:'Derived factor demand', mrp:'Marginal revenue product', lab:'Labor market and firms\' hiring of labor' };
function u6tag(TAGS){ Object.entries(TAGS).forEach(([id,[src,clep,skill,mis]]) => { if(Q[id]) Object.assign(Q[id], { src: src.split(' '), clep: U6CLEP[clep], skill, mis: mis ? mis.split(' ') : [] }); else console.warn('tag for missing question', id); }); }

/* Unit 6 containers; each lesson file adds to these. */
const U6_LESSONS = [], U6_CARDS = {}, U6_WRITE = {}, U6_PLAN = {};
const FIG6 = {};

/* ---------- course and textbook data (all values checked by script; see docs/unit6-build-notes.md) ---------- */
/* Your course's toaster company (video 6.1, slides 253-257): workers 0..6, output, $10 a toaster, $100 a day per worker.
   Slide 253 labels the last row "7"; slides 254-257 and the video use 6. Same production numbers as Lesson 16's Firm A (FA_TP). */
const TO_P = 10, TO_W = 100;
const TO = FA_TP.map((q,L)=>({ L, q, mp: L ? q - FA_TP[L-1] : null }));
TO.forEach(r => { if(r.L){ r.vmp = r.mp*TO_P; r.mprof = r.vmp - TO_W; } r.cost = r.L*TO_W; });   // MP 50..0; VMP 500..0; marginal profit 400..−100
/* Your course textbook's nurses (§4.1, Table 4.1): annual salary, quantity demanded and supplied (thousands of nurses) */
const NU_W = [55,60,65,70,75,80], NU_D = [45,40,37,34,33,32], NU_S = [20,27,31,34,38,41];
/* OpenStax 2e (newer edition) Table 14.2: MPL 4,3,2,1 at an output price of $4 */
const OE_MP = [4,3,2,1], OE_P = 4;

const usd6 = x => (x<0?'−':'') + '$' + Math.abs(x).toLocaleString('en-US',{minimumFractionDigits: Number.isInteger(Math.round(x*100)/100)?0:2, maximumFractionDigits:2});
const k$ = n => '$' + n + ',000';
const shuf6 = a => shuffle(a);
/* label helpers so curve names stay inside the chart at phone width */
const dE = (a,b,label,extra={}) => dem(a,b,label,Object.assign({lx:-4,ly:-8,anchor:'end'},extra));
const wLab = (W, ymax, xmax=6.5, txt) => [W>=ymax*0.5 ? xmax-0.1 : 0.15, W + ymax*0.035, txt || ('Wage $'+W), 'var(--g2)', W>=ymax*0.5 ? 'end' : 'start'];
const vLab = (v1, ymax, txt='Value of MP', c=DC) => [1.3, v1 + ymax*0.025, txt, c, 'start'];

/* ---------- small graphs used as answer choices (and in a few flashcards) ----------
   u6mini: a 150 × 124 chart on a 0-10 grid. Axis titles are neutral (given by the caller); no title, no answer hint.
   lines: {a:[x,y], b:[x,y], c, dash, label, lx, ly} or {pts}; arrows: {a:[x,y], b:[x,y], c}; dots: {x, y, c, label}; hls: horizontal guides {y, c, label}. */
function u6mini({ lines=[], arrows=[], dots=[], hls=[], vls=[], xlab='Quantity of labor', ylab='Wage', aria='Graph' }={}){
  const x0=26, y0=100, pw=114, ph=88, X=v=>x0+pw*v/10, Y=v=>y0-ph*v/10;
  let s = `<svg class="u6m" viewBox="0 0 150 124" role="img" aria-label="${esc(aria)}">`;
  s += `<line x1="${x0}" x2="${x0+pw}" y1="${y0}" y2="${y0}" class="ax"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y0-ph}" class="ax"/>`;
  s += `<text x="${x0+pw/2}" y="${y0+18}" text-anchor="middle" class="lbl">${xlab}</text><text x="11" y="${y0-ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90 11 ${y0-ph/2})">${ylab}</text>`;
  hls.forEach(h => { s += `<line x1="${x0}" x2="${X(h.x||10)}" y1="${Y(h.y).toFixed(1)}" y2="${Y(h.y).toFixed(1)}" stroke="${h.c||'var(--muted)'}" stroke-width="1.3" stroke-dasharray="3 3"/>`; if(h.label) s += `<text x="${x0-3}" y="${(Y(h.y)+4).toFixed(1)}" text-anchor="end" class="lbl" style="font-size:10px">${h.label}</text>`; });
  vls.forEach(v => { s += `<line x1="${X(v.x).toFixed(1)}" x2="${X(v.x).toFixed(1)}" y1="${y0}" y2="${Y(v.y||10).toFixed(1)}" stroke="${v.c||'var(--muted)'}" stroke-width="1.3" stroke-dasharray="3 3"/>`; if(v.label) s += `<text x="${X(v.x).toFixed(1)}" y="${y0+10}" text-anchor="middle" class="lbl" style="font-size:10px">${v.label}</text>`; });
  lines.forEach(l => {
    const pts = l.pts || [l.a, l.b];
    s += `<path d="M${pts.map(([x,y])=>X(x).toFixed(1)+','+Y(y).toFixed(1)).join('L')}" fill="none" stroke="${l.c||'var(--accent)'}" stroke-width="${l.w||2.4}"${l.dash?` stroke-dasharray="${l.dash}"`:''}/>`;
    if(l.label){ const e = l.at==='start' ? pts[0] : pts[pts.length-1]; s += `<text x="${(X(e[0])+(l.lx===undefined?3:l.lx)).toFixed(1)}" y="${(Y(e[1])+(l.ly===undefined?4:l.ly)).toFixed(1)}" text-anchor="${l.anchor||'start'}" class="lbl-ink halo" style="font-size:11px;fill:${l.c||'var(--accent)'}">${l.label}</text>`; }
  });
  arrows.forEach(a => { const id='u6a'+(++SDGN), c=a.c||'var(--ink)';
    s += `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker></defs><line x1="${X(a.a[0]).toFixed(1)}" y1="${Y(a.a[1]).toFixed(1)}" x2="${X(a.b[0]).toFixed(1)}" y2="${Y(a.b[1]).toFixed(1)}" stroke="${c}" stroke-width="1.8" marker-end="url(#${id})"/>`; });
  dots.forEach(d => { s += `<circle cx="${X(d.x).toFixed(1)}" cy="${Y(d.y).toFixed(1)}" r="3.6" fill="${d.c||'var(--ink)'}"/>`; if(d.label) s += `<text x="${(X(d.x)+(d.lx||5)).toFixed(1)}" y="${(Y(d.y)+(d.ly||-5)).toFixed(1)}" class="lbl-ink halo" style="font-size:10px">${d.label}</text>`; });
  return s + '</svg>';
}
/* The five standard labor-market pictures (made-up curves, no numbers): demand or supply shifts right or left, or no shift (a move along demand). */
const LD1 = [[1,9],[8,2]], LD2 = [[3,9],[10,2]], LS1 = [[1,2],[8,9]], LS2 = [[3,2],[10,9]];
function u6shift(kind, aria, xlab, ylab){
  const D = (p,lab,dash) => ({ a:p[0], b:p[1], c:DC, label:lab, dash: dash?'4 3':'' , at:'start', lx:-1, ly:-3 });
  const Sx = (p,lab,dash) => ({ a:p[0], b:p[1], c:SC, label:lab, dash: dash?'4 3':'', lx:-1, ly:-3, anchor:'end' });
  const spec = {
    Dr:{ lines:[D(LD1,'D1',true), D(LD2,'D2'), Sx(LS1,'S')], arrows:[{a:[4.2,5.6],b:[6.2,5.6]}] },
    Dl:{ lines:[D(LD2,'D1',true), D(LD1,'D2'), Sx(LS1,'S')], arrows:[{a:[6.6,4.8],b:[4.6,4.8]}] },
    Sr:{ lines:[Sx(LS1,'S1',true), Sx(LS2,'S2'), D(LD2,'D')], arrows:[{a:[4.2,5.4],b:[6.2,5.4]}] },
    Sl:{ lines:[Sx(LS2,'S1',true), Sx(LS1,'S2'), D(LD2,'D')], arrows:[{a:[6.6,6.2],b:[4.6,6.2]}] },
    mv:{ lines:[D(LD2,'D'), Sx(LS1,'S')], arrows:[{a:[4.5,7.5],b:[6.5,5.5]}], hls:[{y:7.5,x:4.5},{y:5.5,x:6.5}] },
    mvUp:{ lines:[D(LD2,'D'), Sx(LS1,'S')], arrows:[{a:[6.5,5.5],b:[4.5,7.5]}], hls:[{y:7.5,x:4.5},{y:5.5,x:6.5}] }
  }[kind];
  return u6mini({ ...spec, aria: aria || 'Graph', ...(xlab ? { xlab } : {}), ...(ylab ? { ylab } : {}) });
}
const SHIFT_DESC = { Dr:'labor demand shifts right (D1 to D2)', Dl:'labor demand shifts left (D1 to D2)', Sr:'labor supply shifts right (S1 to S2)', Sl:'labor supply shifts left (S1 to S2)', mv:'no curve shifts; a movement down along the demand curve', mvUp:'no curve shifts; a movement up along the demand curve' };
/* A larger, annotated version of one standard picture, for explanations (the question's own graph, marked up). */
function u6shiftBig(kind, note, w1='W1', w2='W2', xlab='Quantity of labor', ylab='Wage'){
  // equilibria of the standard curves: D1 x+y=10, D2 x+y=12, S1 y=x+1, S2 y=x-1
  const eq = (d,s) => { const k = d===1?10:12, b = s===1?1:-1; const x=(k-b)/2; return [x, x+b]; };
  const E = { Dr:[eq(1,1),eq(2,1)], Dl:[eq(2,1),eq(1,1)], Sr:[eq(2,1),eq(2,2)], Sl:[eq(2,2),eq(2,1)] }[kind];
  const lines = { Dr:[{a:LD1[0],b:LD1[1],c:OLD,dash:'5 4',w:2,label:'D1',lx:-4,ly:-8,anchor:'end'},{a:LD2[0],b:LD2[1],c:DC,label:'D2',lx:-4,ly:-8,anchor:'end'},{a:LS1[0],b:LS1[1],c:SC,label:'S',lx:-6,ly:14,anchor:'end'}],
    Dl:[{a:LD2[0],b:LD2[1],c:OLD,dash:'5 4',w:2,label:'D1',lx:-4,ly:-8,anchor:'end'},{a:LD1[0],b:LD1[1],c:DC,label:'D2',lx:-4,ly:-8,anchor:'end'},{a:LS1[0],b:LS1[1],c:SC,label:'S',lx:-6,ly:14,anchor:'end'}],
    Sr:[{a:LS1[0],b:LS1[1],c:OLD,dash:'5 4',w:2,label:'S1',lx:-6,ly:14,anchor:'end'},{a:LS2[0],b:LS2[1],c:SC,label:'S2',lx:-6,ly:14,anchor:'end'},{a:LD2[0],b:LD2[1],c:DC,label:'D',lx:-4,ly:-8,anchor:'end'}],
    Sl:[{a:LS2[0],b:LS2[1],c:OLD,dash:'5 4',w:2,label:'S1',lx:-6,ly:14,anchor:'end'},{a:LS1[0],b:LS1[1],c:SC,label:'S2',lx:-6,ly:14,anchor:'end'},{a:LD2[0],b:LD2[1],c:DC,label:'D',lx:-4,ly:-8,anchor:'end'}] }[kind];
  if(!lines) return '';
  const [e1,e2] = E;
  return fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab, ylab, aria:'Marked-up answer graph',
    lines, vls:[{q:e1[0],p:e1[1]},{q:e2[0],p:e2[1]}], hl:[{p:e1[1],q:e1[0],c:'var(--muted)'},{p:e2[1],q:e2[0],c:'var(--g2)'}],
    dots:[{q:e1[0],p:e1[1],label:'E1',c:'var(--muted)',lx:0,ly:-10,anchor:'middle'},{q:e2[0],p:e2[1],label:'E2',c:'var(--ink)',lx:0,ly:-10,anchor:'middle'}],
    labels:[[0.9,e1[1]+(e1[1]>e2[1]?0.55:-0.95),w1,'var(--muted)','start'],[0.9,e2[1]+(e2[1]>e1[1]?0.55:-0.95),w2,'var(--g2)','start']] }), note);
}

/* Visual multiple choice: graphs as the answer choices. choices = [{svg:(letter)=>svgString, desc, ok}]. Shuffled each time it is built (lazy and gen items),
   then kept in that order (keepOrder) so the letters A-E, the screen-reader labels ("Graph A") and the explanation agree. */
function visMC({ prompt, choices, explain, order }){
  const idx = order || shuf6(choices.map((_,i)=>i)), L = 'ABCDE';
  const opts = idx.map((ci,k) => choices[ci]);
  const answer = opts.findIndex(c => c.ok), letter = L[answer];
  return { type:'mc', kind:'graph', visual:true, keepOrder:true, prompt, answer,
    options: opts.map((c,k) => `<span class="u6vis">${c.svg(L[k])}</span>`),
    optDesc: opts.map(c => c.desc),
    explain: typeof explain === 'function' ? explain(letter, opts.map(c=>c.desc)) : explain };
}
/* A choice whose graph is one of the five standard pictures. */
const shiftChoice = (kind, ok) => ({ svg: L => u6shift(kind, 'Graph ' + L), desc: SHIFT_DESC[kind], ok: !!ok });

/* Number choices listed smallest to largest (workbook convention), for Unit 6 fixed and generated multiple-choice items whose choices all start with a number. */
function u6SortNumeric(){
  const U6L = new Set(['l29','l30','l31','l32']);
  const lead = t => { const m = String(t).replace(/<[^>]+>/g,'').replace(/−/g,'-').replace(/,(?=\d{3}\b)/g,'').match(/^\s*([+-]?)\$?\s*([+-]?\d+(?:\.\d+)?)/); return m ? parseFloat((m[1]||'')+m[2]) : null; };
  const sortInst = q => {
    if(q.type!=='mc' || q.kind==='tf' || q.visual || !Array.isArray(q.options) || q.keepOrder) return q;
    const v = q.options.map(lead); if(v.some(x => x===null)) return q;
    const idx = q.options.map((t,i)=>i).sort((a,b)=> v[a]-v[b] || String(q.options[a]).localeCompare(String(q.options[b])));
    const ans = q.answer; q.options = idx.map(i=>q.options[i]); q.answer = idx.indexOf(ans); q.keepOrder = true; return q;
  };
  Object.entries(Q).forEach(([id,q]) => {
    if(!U6L.has(q.lesson)) return;
    if(q.build){ const f = q.build; q.build = () => sortInst(f()); return; }
    if(q.gen){ const f = q.gen; q.gen = () => sortInst(f()); return; }
    sortInst(q);
  });
}

/* ---------- shared exhibits ---------- */
/* The toaster table with chosen columns; hl marks a row (index = workers) with the u3z2 highlight. */
function toTbl(cols=['q'], { hl=-1, rows=[0,1,2,3,4,5,6], P=TO_P, W=TO_W }={}){
  const head = { q:'Output (toasters)', mp:'Marginal product', vmp:`Value of MP (MP × $${P})`, w:'Wage', mprof:'Marginal profit', cost:'Labor cost', mfc:'MFC' };
  const cell = (r,c) => {
    if(c==='q') return r.q;
    if(c==='mp') return r.L ? r.mp : '–';
    if(c==='vmp') return r.L ? usd6(r.mp*P) : '–';
    if(c==='w') return r.L ? usd6(W) : '–';
    if(c==='mprof') return r.L ? usd6(r.mp*P - W) : '–';
    if(c==='cost') return usd6(r.L*W);
    if(c==='mfc') return r.L ? usd6(W) : '–';
  };
  const hlo = {}; if(hl>=0) hlo[rows.indexOf(hl)] = { row:'u3z2' };
  return atable(['Workers', ...cols.map(c=>head[c])], rows.map(L => [L, ...cols.map(c=>cell(TO[L],c))]), { cls:'compact', hl:hlo });
}
const toIntro = (P=TO_P, W=TO_W) => `Your course\'s toaster company sells each toaster for $${P} and pays each worker $${W} a day:`;
/* Nurses table (textbook Table 4.1), with an optional highlighted row */
function nuTbl(hl=-1){ const h={}; if(hl>=0) h[hl]={row:'u3z2'}; return atable(['Annual salary','Nurses demanded','Nurses supplied'], NU_W.map((w,i)=>[k$(w), NU_D[i].toLocaleString('en-US')+',000', NU_S[i]+',000']), { cls:'compact', hl:h }); }

/* Add an explanation visual and/or one more "why the tempting answer is wrong" sentence to fixed (non-generated) items.
   map: { id: [visualHtml or '', sentence or ''] }. Runs once, right after a lesson's items are defined. */
function u6xv(map){ Object.entries(map).forEach(([id,[vis,why]]) => { const q = Q[id];
  if(!q || typeof q.explain !== 'string'){ console.warn('u6xv: not a fixed item', id); return; }
  q.explain += (why ? `<p>${why}</p>` : '') + (vis || ''); }); }
/* Give built-in flashcards a picture (6th card field) by card title. */
function u6cv(lesson, map){ (U6_CARDS[lesson]||[]).forEach(c => { if(map[c[0]] !== undefined) c[5] = map[c[0]]; });
  Object.keys(map).forEach(t => { if(!(U6_CARDS[lesson]||[]).some(c => c[0]===t)) console.warn('u6cv: no card', lesson, t); }); }
