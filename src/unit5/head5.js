/* =====================================================================
   UNIT 5: FIRM BEHAVIOR AND MARKET STRUCTURE (Lessons 20-28)
   Built 2026-10-28 from Modern States videos 5.1-5.5 (transcripts) and Module 5 slides (numbered 180-247), the course textbook
   (OpenStax Principles of Microeconomics, 2016 edition) §7.1, ch. 8, ch. 9, ch. 10, §11.1 and §11.3, the CLEP outline and sample questions,
   College Board AP materials, Econlib, the Federal Reserve Bank of St. Louis and tutor2u. Source problems found in the course materials are
   listed in docs/unit5-build-notes.md and flagged in the lessons where they could cost an exam point.
   ===================================================================== */

/* ---------- Unit 5 sources ---------- */
Object.assign(SOURCES, {
  MS5:  { t:'Modern States, Principles of Microeconomics, Module 5 videos (5.1-5.5) and slides', u:'https://modernstates.org/course/principles-of-microeconomics/' },
  OS70: { t:'OpenStax, Principles of Microeconomics (your course textbook), ch. 7 introduction (market structure)', u:'https://openstax.org/books/principles-microeconomics/pages/7-introduction-to-cost-and-industry-structure' },
  OS81: { t:'OpenStax, Principles of Microeconomics (your course textbook), §8.1', u:'https://openstax.org/books/principles-economics-3e/pages/8-1-perfect-competition-and-why-it-matters' },
  OS82: { t:'OpenStax, Principles of Microeconomics (your course textbook), §8.2', u:'https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions' },
  OS83: { t:'OpenStax, Principles of Microeconomics (your course textbook), §8.3', u:'https://openstax.org/books/principles-economics-3e/pages/8-3-entry-and-exit-decisions-in-the-long-run' },
  OS84: { t:'OpenStax, Principles of Microeconomics (your course textbook), §8.4', u:'https://openstax.org/books/principles-economics-3e/pages/8-4-efficiency-in-perfectly-competitive-markets' },
  OS91: { t:'OpenStax, Principles of Microeconomics (your course textbook), §9.1', u:'https://openstax.org/books/principles-economics-3e/pages/9-1-how-monopolies-form-barriers-to-entry' },
  OS92: { t:'OpenStax, Principles of Microeconomics (your course textbook), §9.2', u:'https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price' },
  OS101:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §10.1', u:'https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition' },
  OS102:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §10.2', u:'https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly' },
  OS111:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §11.1', u:'https://openstax.org/books/principles-economics-3e/pages/11-1-corporate-mergers' },
  OS113:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §11.3', u:'https://openstax.org/books/principles-economics-3e/pages/11-3-regulating-natural-monopolies' },
  CBAP: { t:'College Board, AP Microeconomics 2024 free-response question 1 (Set 2): scoring guidelines and chief reader report', u:'https://apcentral.collegeboard.org/media/pdf/ap24-cr-report-microeconomics-set-2.pdf' },
  ELMO: { t:'Econlib, "Monopoly" (George J. Stigler)', u:'https://econlib.org/library/Enc/Monopoly.html' },
  ELPR: { t:'Econlib, "Profits" (Lester C. Thurow)', u:'https://econlib.org/library/Enc1/Profits.html' },
  ELCO: { t:'Econlib, "Competition" (Wolfgang Kasper)', u:'https://econlib.org/library/Enc/Competition.html' },
  ELPD: { t:'Econlib, "Prisoners\' Dilemma" (Avinash Dixit and Barry Nalebuff)', u:'https://www.econlib.org/library/Enc/PrisonersDilemma.html' },
  ELCA: { t:'Econlib, "Cartels" (Andrew R. Dick)', u:'https://www.econlib.org/library/Enc/Cartels.html' },
  ELK:  { t:'Econlib, "Price Discrimination and Profitability" (Arnold Kling, 2003)', u:'https://www.econlib.org/archives/2003/11/price_discrimin_1.html' },
  FEDC: { t:'Federal Reserve Bank of St. Louis, "Cartels: Breaking Up Ain\'t Hard to Do" (Adam M. Zaretsky, 1999)', u:'https://www.stlouisfed.org/publications/regional-economist/july-1999/cartels-breaking-up-aint-hard-to-do' },
  T2UPD:{ t:'tutor2u, Importance of price discrimination in economics', u:'https://www.tutor2u.net/economics/reference/importance-of-price-discrimination-in-economics' }
});
/* Existing keys reused: CB (CLEP outline), CBS (CLEP sample questions: Q5 shutdown, Q8 corn), ELL (Econlib, Lemieux, rising marginal cost; competitive firm faces a horizontal demand curve),
   OS71 (§7.1 explicit/implicit costs). */

/* ---------- Unit 5 glossary (tap-to-define). Reused: profit, total-revenue, total-cost, marginal-cost, average-cost, avc, opp-cost, sunk-cost,
   fixed-cost, variable-cost, short-run, long-run, firm, market, efficiency, deadweight-loss, consumer-surplus, producer-surplus, economies-of-scale, lratc, elastic, inelastic. ---------- */
Object.assign(GLOSS, {
  'explicit-cost':{ t:'Explicit cost', d:'An out-of-pocket payment the firm actually makes, such as wages, rent or interest on a loan.', home:'l20', src:['MS5','OS71'] },
  'implicit-cost':{ t:'Implicit cost', d:'The opportunity cost of using resources the owner already has, such as the owner\'s own time, building or savings. No money changes hands, but something is given up.', home:'l20', src:['MS5','OS71'] },
  'accounting-profit':{ t:'Accounting profit', d:'Total revenue minus explicit costs only: dollars in minus dollars paid out.', home:'l20', src:['OS71'] },
  'economic-profit':{ t:'Economic profit', d:'Total revenue minus all costs, explicit and implicit. Positive economic profit means the owner\'s resources earn more here than in their next best use.', home:'l20', src:['OS71','MS5'] },
  'normal-profit':{ t:'Normal profit', d:'The accounting profit that just covers the owner\'s implicit costs, so economic profit is zero. The resources earn exactly what they could earn in their next best use.', home:'l20', src:['CB','OS101','OS113','ELPR'] },
  'marginal-revenue':{ t:'Marginal revenue (MR)', d:'The extra total revenue from selling one more unit: change in total revenue ÷ change in quantity.', home:'l21', src:['MS5','OS82'] },
  'mr-mc':{ t:'MR = MC rule', d:'A firm maximizes profit by producing the quantity where marginal revenue equals marginal cost: expand while MR is greater than MC, cut back when MR is less.', home:'l21', src:['MS5','OS82','CB'] },
  'marginal-profit':{ t:'Marginal profit', d:'The profit from one more unit: marginal revenue minus marginal cost. Total profit stops rising when marginal profit reaches zero.', home:'l21', src:['MS5','OS92'] },
  'market-structure':{ t:'Market structure', d:'The conditions in an industry: how many sellers there are, how similar their products are, and how easy it is for new firms to enter.', home:'l22', src:['OS70','OS81'] },
  'perfect-competition':{ t:'Perfect competition', d:'A market with many buyers and sellers, identical products and free entry and exit, so no single firm can affect the price.', home:'l22', src:['MS5','OS81'] },
  'price-taker':{ t:'Price taker', d:'A firm that must accept the market price as given. If it charged even a penny more, it would lose all its sales to rivals.', home:'l22', src:['MS5','OS81'] },
  'free-entry':{ t:'Free entry and exit', d:'Firms can start selling in the market, or leave it, without special costs or legal barriers.', home:'l22', src:['MS5','OS81'] },
  'shutdown':{ t:'Shutdown (temporary)', d:'A short-run decision to produce nothing for now. The firm still pays its fixed costs and stays in the industry. It is not the same as exiting.', home:'l23', src:['MS5','OS82'] },
  'shutdown-point':{ t:'Shutdown point', d:'The price at the bottom of the average variable cost curve, where marginal cost crosses it. Below this price the firm shuts down in the short run.', home:'l23', src:['OS82','MS5'] },
  'zero-profit-point':{ t:'Zero-profit (break-even) point', d:'The price at the bottom of the average total cost curve, where marginal cost crosses it. At this price economic profit is zero.', home:'l23', src:['OS82'] },
  'sr-supply':{ t:'Firm\'s short-run supply curve', d:'For a perfectly competitive firm, the part of its marginal cost curve above the minimum of average variable cost.', home:'l23', src:['MS5','OS82'] },
  'exit':{ t:'Exit', d:'The long-run process of firms leaving an industry, or cutting production, in response to economic losses.', home:'l23', src:['OS83','MS5'] },
  'entry':{ t:'Entry', d:'The long-run process of new firms joining an industry, or existing firms expanding, in response to economic profits.', home:'l23', src:['OS83','MS5'] },
  'lr-equilibrium':{ t:'Long-run equilibrium (perfect competition)', d:'Where firms produce at MR = MC and price equals average total cost, so economic profit is zero and no firm wants to enter or exit.', home:'l24', src:['MS5','OS83'] },
  'allocative-efficiency':{ t:'Allocative efficiency', d:'Producing the quantity where the value of the last unit to buyers (price) equals its cost to society (marginal cost): P = MC.', home:'l24', src:['OS84','OS92'] },
  'productive-efficiency':{ t:'Productive efficiency', d:'Producing at the lowest possible average cost. In long-run perfect competition, price equals minimum average total cost.', home:'l24', src:['OS84'] },
  'constant-cost':{ t:'Constant-cost industry', d:'An industry whose firms\' costs do not change as it grows, so after entry the price returns to the same level and the long-run supply curve is flat.', home:'l24', src:['OS83'] },
  'increasing-cost':{ t:'Increasing-cost industry', d:'An industry whose firms\' costs rise as it grows (for example, scarce skilled workers get dearer), so after entry the long-run price ends up higher and the long-run supply curve slopes up.', home:'l24', src:['OS83'] },
  'decreasing-cost':{ t:'Decreasing-cost industry', d:'An industry whose firms\' costs fall as it grows (for example, better technology or a more skilled workforce), so after entry the long-run price ends up lower and the long-run supply curve slopes down.', home:'l24', src:['OS83'] },
  monopoly:{ t:'Monopoly', d:'A market with one firm selling a product that has no close substitutes, protected by barriers to entry.', home:'l25', src:['MS5','OS91'] },
  'barriers-to-entry':{ t:'Barriers to entry', d:'Legal, technological or market forces that keep new competitors out, such as patents, control of a key resource or large economies of scale.', home:'l25', src:['OS91','MS5'] },
  'price-maker':{ t:'Price maker', d:'A firm that chooses its price, as a monopoly does, but must accept the quantity buyers will purchase at that price (its demand curve).', home:'l25', src:['MS5','OS92'] },
  patent:{ t:'Patent', d:'A government grant giving an inventor the exclusive right to make, use or sell an invention for a limited time (20 years in the United States).', home:'l25', src:['OS91','MS5'] },
  'natural-monopoly':{ t:'Natural monopoly', d:'An industry where economies of scale are so large relative to demand that one firm can supply the whole market at a lower average cost than two or more firms.', home:'l25', src:['MS5','OS91','OS113'] },
  'legal-monopoly':{ t:'Legal (government-created) monopoly', d:'A monopoly protected by law, such as a patent, copyright or license that bars other sellers.', home:'l25', src:['MS5','OS91'] },
  'price-discrimination':{ t:'Price discrimination', d:'Charging different customers different prices for the same product, based on what they are willing to pay rather than on cost differences.', home:'l26', src:['OS111','T2UPD','ELK'] },
  'perfect-pd':{ t:'Perfect (first-degree) price discrimination', d:'Charging each buyer the most he or she is willing to pay. Consumer surplus falls to zero, and the firm sells every unit buyers value above marginal cost.', home:'l26', src:['CBAP','T2UPD'] },
  'socially-efficient':{ t:'Socially efficient outcome', d:'Your course\'s name for the quantity where the demand curve meets marginal cost (P = MC), where total surplus is largest.', home:'l26', src:['MS5','OS92'] },
  oligopoly:{ t:'Oligopoly', d:'A market dominated by a few firms, selling identical or similar products, whose decisions depend on each other.', home:'l27', src:['MS5','OS102'] },
  interdependence:{ t:'Interdependence', d:'In an oligopoly, each firm\'s profit depends on what the other firms do, so each must think about its rivals\' choices.', home:'l27', src:['OS102','MS5'] },
  collusion:{ t:'Collusion', d:'Firms acting together to hold down output and keep prices high instead of competing. It is illegal in the United States.', home:'l27', src:['OS102','MS5'] },
  cartel:{ t:'Cartel', d:'A group of firms with a formal agreement to collude: to produce the monopoly output and charge the monopoly price. OPEC is the best-known example.', home:'l27', src:['OS102','MS5','FEDC'] },
  'game-theory':{ t:'Game theory', d:'The study of decisions where each player\'s payoff depends on what the other players choose.', home:'l27', src:['OS102','MS5'] },
  'payoff-matrix':{ t:'Payoff matrix', d:'A table that shows each player\'s payoff for every combination of the players\' choices.', home:'l27', src:['OS102','MS5'] },
  'dominant-strategy':{ t:'Dominant strategy', d:'A choice that gives a player the best payoff no matter what the other player does.', home:'l27', src:['OS102','ELPD'] },
  'nash-equilibrium':{ t:'Nash equilibrium', d:'A set of choices where each player is doing the best it can given what the others are doing, so no one wants to change on its own.', home:'l27', src:['MS5'] },
  'prisoners-dilemma':{ t:'Prisoner\'s dilemma', d:'A game in which each player\'s self-interest leads to an outcome that is worse for both than if they had cooperated.', home:'l27', src:['OS102','ELPD'] },
  duopoly:{ t:'Duopoly', d:'An oligopoly with only two firms, like your course\'s Jack and Jill.', home:'l27', src:['OS102'] },
  'monopolistic-competition':{ t:'Monopolistic competition', d:'A market with many firms selling similar but differentiated products, with free entry and exit.', home:'l28', src:['MS5','OS101'] },
  'differentiated-product':{ t:'Differentiated product', d:'A product buyers see as different from its rivals in some way: features, location, service, or image created by branding and advertising.', home:'l28', src:['OS101'] },
  'excess-capacity':{ t:'Excess capacity', d:'In long-run monopolistic competition, the gap between the firm\'s output and the larger output where its average total cost would be lowest.', home:'l28', src:['MS5','OS101'] },
  markup:{ t:'Markup', d:'The amount by which price is above marginal cost. Firms with some price control (monopoly, monopolistic competition) charge one.', home:'l28', src:['MS5'] }
});

/* ---------- tags: [src, clep key, skill, mistakes] ---------- */
const U5CLEP = {
  acc:'Profit: accounting versus economic profits', norm:'Profit: normal profit', mrmc:'Profit: profit maximization, MR = MC rule',
  str:'Characteristics of different market structures',
  pcmax:'Perfect competition: profit maximization', pcsr:'Perfect competition: short-run supply and shut-down decision',
  pclr:'Perfect competition: firm and market behaviors in short-run and long-run equilibria', pceff:'Perfect competition: efficiency and perfect competition',
  msrc:'Monopoly: sources of market power', mmax:'Monopoly: profit maximization', mineff:'Monopoly: inefficiency of monopoly',
  pd:'Monopoly: price discrimination', nat:'Monopoly: natural monopoly',
  ocol:'Oligopoly: interdependence, collusion, and cartels', ogame:'Oligopoly: game theory and strategic behavior with payoff matrix', onash:'Oligopoly: dominant strategies and Nash equilibrium',
  mcdif:'Monopolistic competition: product differentiation and role of advertising', mcmax:'Monopolistic competition: profit maximization',
  mclr:'Monopolistic competition: short-run and long-run equilibrium', mcexc:'Monopolistic competition: excess capacity and inefficiency'
};
function u5tag(TAGS){ Object.entries(TAGS).forEach(([id,[src,clep,skill,mis]]) => { if(Q[id]) Object.assign(Q[id], { src: src.split(' '), clep: U5CLEP[clep], skill, mis: mis ? mis.split(' ') : [] }); else console.warn('tag for missing question', id); }); }

/* Unit 5 containers; each lesson file adds to these. */
const U5_LESSONS = [], U5_CARDS = {}, U5_WRITE = {}, U5_PLAN = {};
const FIG5 = {};

/* ---------- course and textbook data used in many places (all values checked by script; see docs/unit5-build-notes.md) ---------- */
/* Your course textbook's raspberry farm (§8.2, Tables 8.1, 8.3, 8.6): packs 0..100 in tens; fixed cost $62. */
const RF_Q = [0,10,20,30,40,50,60,70,80,90,100], RF_TC = [62,90,110,126,144,166,192,224,264,324,404], RF_FC = 62;
const RF = RF_Q.map((q,i)=>({ q, tc:RF_TC[i], vc:RF_TC[i]-RF_FC, atc: q ? RF_TC[i]/q : null, avc: q ? (RF_TC[i]-RF_FC)/q : null, mc: i ? (RF_TC[i]-RF_TC[i-1])/10 : null }));
/* best output for a price taker at price P: the quantity with the highest profit (0 = shut down); ties go to the larger quantity (the MR = MC step) */
function rfBest(P){ let best=0, bp=-RF_FC; RF.forEach(r=>{ const pr=P*r.q-r.tc; if(pr>bp+1e-9 || (Math.abs(pr-bp)<1e-9 && r.q>best)){ best=r.q; bp=pr; } }); return { q:best, profit:bp }; }
/* Your course's ping-pong balls (video 5.2, slides 196-199): output 0..9; fixed cost $1.50. */
const PP_TC = [1.50,2.00,3.00,4.50,6.50,9.50,12.75,16.25,20.00,24.00], PP_FC = 1.50;
const PP_MC = PP_TC.slice(1).map((t,i)=>t-PP_TC[i]);                         // .50,1,1.5,2,3,3.25,3.5,3.75,4
/* Your course textbook's HealthPill monopoly (§9.2, Tables 9.2-9.4): quantity 1..8 */
const HP_Q = [1,2,3,4,5,6,7,8], HP_P = [1200,1100,1000,900,800,700,600,500], HP_TC = [1500,1800,2200,2800,3500,4200,5600,7400];
const HP = HP_Q.map((q,i)=>({ q, p:HP_P[i], tr:HP_P[i]*q, tc:HP_TC[i], mr: HP_P[i]*q - (i ? HP_P[i-1]*HP_Q[i-1] : 0), mc: HP_TC[i] - (i ? HP_TC[i-1] : 0) }));
HP.forEach(r=>{ r.profit = r.tr - r.tc; r.ac = r.tc / r.q; });               // MR 1200..−200; MC 1500,300,400,600,700,700,1400,1800; profit −300,400,800,800,500,0,−1400,−3400
/* Your course's De Beers (video 5.3, slides 214-218): diamonds 0..500 in hundreds */
const DB_P = [2000,1800,1600,1400,1200,1000], DB_Q = [0,100,200,300,400,500], DB_TC = [25000,100000,190000,290000,400000,525000];
const DB = DB_Q.map((q,i)=>({ q, p:DB_P[i], tr:DB_P[i]*q, tc:DB_TC[i], mr: i ? (DB_P[i]*q - DB_P[i-1]*DB_Q[i-1])/100 : null, mc: i ? (DB_TC[i]-DB_TC[i-1])/100 : null }));
DB.forEach(r=>{ r.profit = r.tr - r.tc; r.atc = r.q ? r.tc/r.q : null; });  // MR 1800,1400,1000,600,200; MC 750,900,1000,1100,1250; profit −25k,80k,130k,130k,80k,−25k
/* Your course textbook's natural monopoly (§11.3, Table 11.3; textbook rounds some prices) */
const NM_Q = [1,2,3,4,5,6,7,8,9], NM_P = [14.7,12.4,10.6,9.3,8.0,6.5,5.0,3.5,2.0], NM_TC = [11.0,19.5,25.5,31.0,35.0,39.0,42.0,45.5,49.5];
const NM_MC = [null,8.5,6.0,5.5,4.0,4.0,3.0,3.5,4.0], NM_AC = [11.00,9.75,8.50,7.75,7.00,6.50,6.00,5.70,5.50], NM_MR = [14.7,10.0,7.0,5.5,2.8,-1.0,-4.0,-7.0,-10.0];
/* Your course's Jack and Jill (video 5.4, slides 228-233): price = 120 − total gallons, marginal cost 0 */
const JJ_P = Q => 120 - Q;
/* Your course textbook's Authentic Chinese Pizza (§10.1, Table 10.1) */
const ACP_Q = [10,20,30,40,50,60,70,80], ACP_P = [23,20,18,16,14,12,10,8], ACP_TC = [340,400,480,580,700,840,1020,1280];
const ACP = ACP_Q.map((q,i)=>({ q, p:ACP_P[i], tr:ACP_P[i]*q, tc:ACP_TC[i], ac:ACP_TC[i]/q, mr: i ? (ACP_P[i]*q - ACP_P[i-1]*ACP_Q[i-1])/10 : null, mc: i ? (ACP_TC[i]-ACP_TC[i-1])/10 : null }));
ACP.forEach(r=>{ r.profit = r.tr - r.tc; });                                 // MR 17,14,10,6,2,−2,−6; MC 6,8,10,12,14,18,26; profit −110,0,60,60,0,−120,−320,−640

const usd = x => (x<0?'−':'') + '$' + Math.abs(x).toLocaleString('en-US',{minimumFractionDigits: Number.isInteger(Math.round(x*100)/100)?0:2, maximumFractionDigits:2});
const usd2 = x => (x<0?'−':'') + '$' + Math.abs(x).toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2});
const kusd = x => usd(x);   // thousands separators come from toLocaleString

/* payoff matrix (HTML). rows: Row player's choices; cols: Column player's choices; pay[r][c] = [rowPayoff, colPayoff].
   opts.mark = { br:true } underlines each player's best responses; opts.hl = [[r,c],...] outlines cells; opts.unit prefix. */
function pmatrix({ rowName, colName, rows, cols, pay, unit='$', mark={}, hl=[], note='', fmtp }){
  const f = fmtp || (v => unit==='$' ? '$'+Number(v).toLocaleString('en-US') : v + (unit?' '+unit:''));
  const bestRow = c => Math.max(...pay.map(r=>r[c][0])), bestCol = r => Math.max(...pay[r].map(x=>x[1]));
  const cell = (r,c) => { const [a,b]=pay[r][c], ua = mark.br && a===bestRow(c), ub = mark.br && b===bestCol(r);
    return `<td class="u5mx-c${hl.some(([x,y])=>x===r&&y===c)?' u5mx-hl':''}"><span class="u5mx-a">${ua?'<u>':''}${rowName}: ${f(a)}${ua?'</u>':''}</span><span class="u5mx-b">${ub?'<u>':''}${colName}: ${f(b)}${ub?'</u>':''}</span></td>`; };
  return `<div class="tbl-wrap"><table class="u5mx"><thead><tr><th class="u5mx-corner"><span>${rowName} ↓</span><span>${colName} →</span></th>${cols.map(c=>`<th>${colName}: ${c}</th>`).join('')}</tr></thead><tbody>${
    rows.map((rn,r)=>`<tr><th>${rowName}: ${rn}</th>${cols.map((_,c)=>cell(r,c)).join('')}</tr>`).join('')}</tbody></table></div>${note?`<p class="small muted" style="margin:.2rem 0 0">${note}</p>`:''}`;
}
/* Jack and Jill's payoff matrix (course slide 233): rows Jack, columns Jill; order Cheat, Cooperate */
const JJ_PAY = [[[1600,1600],[2000,1500]],[[1500,2000],[1800,1800]]];

/* Number choices listed smallest to largest (workbook convention), for Unit 5 fixed multiple-choice items whose choices all start with a number. */
function u5SortNumeric(){
  const U5L = new Set(['l20','l21','l22','l23','l24','l25','l26','l27','l28']);
  const lead = t => { const m = String(t).replace(/<[^>]+>/g,'').replace(/−/g,'-').replace(/,(?=\d{3}\b)/g,'').match(/^\s*(?:Unit\s+)?([+-]?)\$?\s*([+-]?\d+(?:\.\d+)?)/); return m ? parseFloat((m[1]||'')+m[2]) : null; };
  const sortInst = q => {
    if(q.type!=='mc' || q.kind==='tf' || !Array.isArray(q.options) || q.keepOrder) return q;
    const v = q.options.map(lead); if(v.some(x => x===null)) return q;
    const idx = q.options.map((t,i)=>i).sort((a,b)=> v[a]-v[b] || String(q.options[a]).localeCompare(String(q.options[b])));
    const ans = q.answer; q.options = idx.map(i=>q.options[i]); q.answer = idx.indexOf(ans); q.keepOrder = true; return q;
  };
  Object.entries(Q).forEach(([id,q]) => {
    if(!U5L.has(q.lesson)) return;
    if(q.build){ const f = q.build; q.build = () => sortInst(f()); return; }       // lazy exhibit items: sort each built instance
    if(q.gen){ if(q.kind==='mc'){ const f = q.gen; q.gen = () => sortInst(f()); } return; }
    sortInst(q);
  });
}
