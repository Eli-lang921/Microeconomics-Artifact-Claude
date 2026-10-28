/* =====================================================================
   UNIT 3: THEORY OF CONSUMER CHOICE (Lessons 13-15)
   Built 2026-10-27 from Modern States video 3.1 (transcript) and Module 3 slides 1-22, the course textbook
   (OpenStax Principles of Microeconomics, 2016 edition) ch. 6, the CLEP outline and sample questions, the
   AP Microeconomics CED (topics 1.6 and 2.1) and Econlib. Source problems found in the course materials are
   listed in docs/unit3-build-notes.md and flagged in the lessons where they could cost an exam point.
   ===================================================================== */

/* ---------- Unit 3 sources ---------- */
Object.assign(SOURCES, {
  MS3:  { t:'Modern States, Principles of Microeconomics, Module 3 video (3.1) and slides', u:'https://modernstates.org/course/principles-of-microeconomics/' },
  OS61: { t:'OpenStax, Principles of Microeconomics (your course textbook), §6.1', u:'https://openstax.org/books/principles-microeconomics-3e/pages/6-1-consumption-choices' },
  OS62: { t:'OpenStax, Principles of Microeconomics (your course textbook), §6.2', u:'https://openstax.org/books/principles-economics-3e/pages/6-2-how-changes-in-income-and-prices-affect-consumption-choices' },
  OS6X: { t:'OpenStax, Principles of Microeconomics (your course textbook), §6.3 to §6.4', u:'https://openstax.org/books/principles-economics-3e/pages/6-introduction-to-consumer-choices' },
  CED16:{ t:'College Board, AP Microeconomics Course and Exam Description, Topics 1.6 and 2.1', u:'https://apcentral.collegeboard.org/media/pdf/ap-microeconomics-course-and-exam-description.pdf' }
});
/* Existing keys reused: CB (CLEP outline), CBS (CLEP sample questions), ELM (Econlib, Marginalism, Rhoads), ELD (Econlib, Demand, Henderson), OS21 (§2.1 budget constraint). */

/* ---------- Unit 3 glossary (tap-to-define). utility and dmu (Lesson 5) are reused, not redefined. ---------- */
Object.assign(GLOSS, {
  util:{ t:'Util', d:'A made-up unit for measuring one person\'s satisfaction, so choices can be compared with numbers. Utils can\'t be compared between two people.', home:'l13', src:['OS61','MS3'] },
  'total-utility':{ t:'Total utility', d:'The total satisfaction a person gets from consuming a given quantity of a good: the sum of the marginal utilities of every unit.', home:'l13', src:['MS3','OS61'] },
  'marginal-utility':{ t:'Marginal utility', d:'The extra satisfaction from consuming one more unit: the change in total utility divided by the change in quantity.', home:'l13', src:['MS3','OS61'] },
  'budget-constraint':{ t:'Budget constraint (budget line)', d:'Every combination of two goods a person can buy by spending the whole budget. Points inside it leave money unspent; points outside it cost too much.', home:'l1', src:['OS21','OS61'] },
  'mu-per-dollar':{ t:'Marginal utility per dollar', d:'A unit\'s marginal utility divided by its price (MU ÷ P): how much extra satisfaction each dollar spent on it buys.', home:'l14', src:['OS61','MS3'] },
  'utility-max-rule':{ t:'Utility-maximizing rule', d:'Spend the whole budget so that the marginal utility per dollar is the same for every good: MU₁ ÷ P₁ = MU₂ ÷ P₂.', home:'l14', src:['OS61','MS3','CED16'] },
  'optimal-bundle':{ t:'Optimal consumption bundle', d:'The affordable combination of goods that gives a person the highest total utility. Your course calls it the optimal consumption choice.', home:'l14', src:['MS3'] },
  'consumer-equilibrium':{ t:'Consumer equilibrium', d:'The utility-maximizing choice, where the ratio of the two goods\' prices equals the ratio of their marginal utilities (P₁ ÷ P₂ = MU₁ ÷ MU₂).', home:'l14', src:['OS61'] },
  'individual-demand':{ t:'Individual demand curve', d:'One buyer\'s quantity demanded at each price. Each point is that buyer\'s utility-maximizing choice at that price.', home:'l15', src:['MS3','OS62'] },
  'market-demand':{ t:'Market demand curve', d:'The sum of all buyers\' individual demand curves: at each price, add up the quantities every buyer wants.', home:'l15', src:['MS3','CED16'] },
  'income-effect':{ t:'Income effect', d:'When a price changes, the buying power of your income changes (your money income doesn\'t). A lower price leaves you able to buy more, so you buy more normal goods.', home:'l15', src:['MS3','OS62','CBS'] },
  'substitution-effect':{ t:'Substitution effect', d:'When a price changes, the good that became relatively cheaper is substituted for the one that became relatively more expensive.', home:'l15', src:['MS3','OS62'] },
  'relative-price':{ t:'Relative price', d:'The price of one good measured in units of another: how many of the other good you give up to buy one. Pizza at $2 and soda at $1 means one soda costs half a slice.', home:'l15', src:['MS3'] },
  'purchasing-power':{ t:'Purchasing power (real income)', d:'How much your money income can actually buy at current prices. A price cut raises it even though your money income is the same.', home:'l15', src:['OS62','CBS'] }
});

/* ---------- tags: [src, clep key, skill, mistakes] ---------- */
const U3CLEP = { tu:'Total utility and marginal utility', max:'Utility maximization: equalizing marginal utility per dollar', dem:'Individual and market demand curves', eff:'Income and substitution effects' };
function u3tag(TAGS){ Object.entries(TAGS).forEach(([id,[src,clep,skill,mis]]) => { if(Q[id]) Object.assign(Q[id], { src: src.split(' '), clep: U3CLEP[clep], skill, mis: mis ? mis.split(' ') : [] }); else console.warn('tag for missing question', id); }); }

const ordinal = n => n + (n%100>=11 && n%100<=13 ? 'th' : ['th','st','nd','rd'][n%10] || 'th');
/* Unit 3 containers; each lesson file adds to these. */
const U3_LESSONS = [], U3_CARDS = {}, U3_WRITE = {}, U3_PLAN = {};

/* ---------- course data used in many places (Modern States video 3.1 and slides 3, 7-18) ---------- */
const CANDY_TU = [0,25,45,60,70,75,75,70,60,45,25];           // candy bars 0..10, slide 3
const SODA_MU = [8,7,6,5,4], PIZZA_MU = [20,16,12,8,4];        // slides 7-18
const psTU = (s,k) => SODA_MU.slice(0,s).reduce((a,b)=>a+b,0) + PIZZA_MU.slice(0,k).reduce((a,b)=>a+b,0);
/* José (course textbook §6.1, Table 6.2): T-shirts $14, movies $7, income $56 */
const JOSE_T = [0,22,43,63,81,97,111,123,133], JOSE_M = [0,16,31,45,58,70,81,91,100];
/* best affordable soda-and-pizza bundle at a pizza price (soda $1, budget $5), any unspent money allowed. Unique at $1-$4 in $0.50 steps (checked 2026-10-27). */
function psBest(pp, budget=5, ps=1){
  let best=null;
  for(let s=0;s<=5;s++) for(let k=0;k<=5;k++){ const c=ps*s+pp*k; if(c<=budget+1e-9){ const t=psTU(s,k); if(!best || t>best.tu) best={s,k,tu:t,left:round(budget-c,2)}; } }
  return best;
}

/* ---------- Unit 3 figure helpers (HTML/SVG, theme-aware via CSS variables) ---------- */
/* flow([...steps]) : vertical cause-and-effect chain; a step can be ['text'] or {split:[[...],[...]]} for two branches */
function flow(steps){
  const one = s => typeof s==='string' ? `<div class="u3step">${s}</div>` : `<div class="u3step${s.c?' '+s.c:''}">${s.t}</div>`;
  return `<div class="u3flow">${steps.map((s,i)=>(i?'<div class="u3arrow" aria-hidden="true">↓</div>':'') + (Array.isArray(s.split) ? `<div class="u3split">${s.split.map(col=>`<div class="u3col">${col.map((x,j)=>(j?'<div class="u3arrow" aria-hidden="true">↓</div>':'')+one(x)).join('')}</div>`).join('')}</div>` : one(s))).join('')}</div>`;
}
/* annotated HTML table: rows of cells; hl = {r:{c:'class'}} ; notes appear beside or under the table */
function atable(head, rows, { hl={}, note='', cls='' }={}){
  return `<div class="tbl-wrap"><table class="u3tbl ${cls}"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${
    rows.map((r,ri)=>`<tr${hl[ri]&&hl[ri].row?` class="${hl[ri].row}"`:''}>${r.map((c,ci)=>`<td${hl[ri]&&hl[ri][ci]?` class="${hl[ri][ci]}"`:''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${note?`<div class="u3notes">${note}</div>`:''}`;
}
/* simple bar chart with negative values allowed (utility per unit); returns SVG string */
function ubars(vals, { labels, hi=-1, ymin, ymax, ylab='Utils', xlab='Unit', w=300, h=200, fmtv=v=>v, colorOf }={}){
  ymax = ymax===undefined ? Math.max(0,...vals) : ymax; ymin = ymin===undefined ? Math.min(0,...vals) : ymin;
  if(ymin<0) h += 14;   // room for value labels under negative bars
  const x0=40, y0top=14, pw=w-56, ph=h-(ymin<0?72:58), n=vals.length, lab=ymin<0?28:14;
  const Y = v => y0top + ph*(ymax-v)/(ymax-ymin), bw = pw/n;
  let s = `<svg class="u2bars" viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart of ${esc(ylab)} by ${esc(xlab)}">`;
  s += `<line x1="${x0}" x2="${x0+pw}" y1="${Y(0).toFixed(1)}" y2="${Y(0).toFixed(1)}" class="ax"/><line x1="${x0}" x2="${x0}" y1="${y0top}" y2="${y0top+ph}" class="ax"/>`;
  [ymax, 0, ymin].filter((v,i,a)=>a.indexOf(v)===i).forEach(t=>{ s+=`<text x="${x0-5}" y="${(Y(t)+4).toFixed(1)}" text-anchor="end" class="lbl">${t}</text>`; });
  vals.forEach((v,i)=>{ const x=x0+i*bw+bw*0.15, bwi=bw*0.7, top=Math.min(Y(v),Y(0)), ht=Math.abs(Y(v)-Y(0));
    const c = colorOf ? colorOf(v,i) : (i===hi ? 'var(--g2)' : v<0 ? 'var(--bad)' : 'var(--accent)');
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bwi.toFixed(1)}" height="${Math.max(ht,0.8).toFixed(1)}" rx="2" fill="${c}" opacity="${i===hi?1:.75}"/>`;
    s += `<text x="${(x+bwi/2).toFixed(1)}" y="${(v>=0?top-3:top+ht+11).toFixed(1)}" text-anchor="middle" class="lbl halo">${fmtv(v)}</text>`;
    s += `<text x="${(x+bwi/2).toFixed(1)}" y="${(y0top+ph+lab).toFixed(1)}" text-anchor="middle" class="lbl">${labels?labels[i]:i+1}</text>`; });
  s += `<text x="${x0+pw/2}" y="${h-6}" text-anchor="middle" class="lbl-ink">${xlab}</text><text x="12" y="${y0top+ph/2}" text-anchor="middle" class="lbl-ink" transform="rotate(-90 12 ${y0top+ph/2})">${ylab}</text>`;
  return s + '</svg>';
}
/* a total-utility line chart from a TU array (index = quantity) */
function tuChart(TU, { hi=-1, xlab='Quantity', ymax, yt, xt } = {}){
  const n = TU.length-1; ymax = ymax || Math.ceil(Math.max(...TU)/20)*20+10;
  return gchart2({ xmax:n, ymax, xlab, ylab:'Total utility (utils)', xt: xt || Array.from({length:n+1},(_,i)=>i).filter(i=>i%2===0), yt: yt || [0, Math.round(ymax/2/10)*10, ymax-ymax%10],
    aria:`Total utility graph, quantity across, utils up`,
    body:(X,Y)=>({ under: gline(TU.map((v,i)=>[i,v]),X,Y,'var(--accent)','',2.6), over: TU.map((v,i)=>`<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="${i===hi?5.5:3}" fill="${i===hi?'var(--g2)':'var(--accent)'}"/>`).join('') + (hi>=0?gtext(X(hi)+7, Y(TU[hi])-8, `${TU[hi]}`, 'var(--g2)'):'') }) });
}
/* Number choices listed smallest to largest (workbook convention), for Unit 3 fixed multiple-choice items whose choices all start with a number. */
function u3SortNumeric(){
  const U3L = new Set(['l13','l14','l15']);
  const lead = t => { const m = String(t).replace(/<[^>]+>/g,'').replace(/−/g,'-').replace(/,(?=\d{3}\b)/g,'').match(/^\s*([+-]?)\$?\s*([+-]?\d+(?:\.\d+)?)/); return m ? parseFloat((m[1]||'')+m[2]) : null; };
  Object.entries(Q).forEach(([id,q]) => {
    if(!U3L.has(q.lesson) || q.type!=='mc' || q.kind==='tf' || !Array.isArray(q.options) || q.gen || q.build) return;
    const v = q.options.map(lead); if(v.some(x => x===null)) return;
    const idx = q.options.map((t,i)=>i).sort((a,b)=> v[a]-v[b] || String(q.options[a]).localeCompare(String(q.options[b])));
    const ans = q.answer; q.options = idx.map(i=>q.options[i]); q.answer = idx.indexOf(ans); q.keepOrder = true;
  });
}
