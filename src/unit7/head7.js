/* =====================================================================
   UNIT 7: MARKET FAILURE AND THE ROLE OF GOVERNMENT (Lessons 33-37)
   Built 2026-11-19 from Modern States videos 7.1-7.3 (transcripts) and Module 7 slides (printed numbers 256-265 for 7.1; the 7.2 and 7.3
   slides are unnumbered), the course textbook (OpenStax Principles of Microeconomics, 2016 edition) ch. 11-14, the CLEP outline and sample
   question 7, Econlib (Caplan, Cowen, McChesney, Allen), Federal Reserve sources (FRBSF Dr. Econ; FRED Gini series note) and the BEA Gini primer.
   Source problems found in the course materials are listed in docs/unit7-build-notes.md and flagged in the lessons.
   ===================================================================== */

/* ---------- Unit 7 sources ---------- */
Object.assign(SOURCES, {
  MS7:  { t:'Modern States, Principles of Microeconomics, Module 7 videos (7.1-7.3) and slides', u:'https://modernstates.org/course/principles-of-microeconomics/' },
  USDAFS: { t:'USDA Economic Research Service, Food security in the U.S.: measurement', u:'https://ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/measurement' },
  MS5S: { t:'Modern States, Principles of Microeconomics, Module 5 slide 223 (ways to deal with monopoly)', u:'https://modernstates.org/course/principles-of-microeconomics/' },
  OS112:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §11.2 (anticompetitive behavior); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/11-2-regulating-anticompetitive-behavior' },
  OS114:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §11.4 (deregulation and regulatory capture); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/11-4-the-great-deregulation-experiment' },
  OS121:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §12.1 (the economics of pollution); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/12-1-the-economics-of-pollution' },
  OS122:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §12.2 (command-and-control regulation); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/12-2-command-and-control-regulation' },
  OS123:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §12.3 (market-oriented environmental tools); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/12-3-market-oriented-environmental-tools' },
  OS131:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §13.1 (positive externalities of new technology); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/13-1-investments-in-innovation' },
  OS132:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §13.2 (how governments encourage innovation); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/13-2-how-governments-can-encourage-innovation' },
  OS133:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §13.3 (public goods); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/13-3-public-goods' },
  OS141:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §14.1 (the poverty line); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/15-1-drawing-the-poverty-line' },
  OS142:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §14.2 (the poverty trap); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/15-2-the-poverty-trap' },
  OS143:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §14.3 (the safety net); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/15-3-the-safety-net' },
  OS144:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §14.4 (income inequality: measurement and causes); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/15-4-income-inequality-measurement-and-causes' },
  OS145:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §14.5 (policies to reduce income inequality); the link opens the same section in OpenStax Principles of Economics 3e', u:'https://openstax.org/books/principles-economics-3e/pages/15-5-government-policies-to-reduce-income-inequality' },
  ELEX: { t:'Econlib, "Externalities" (Bryan Caplan)', u:'https://www.econlib.org/library/Enc/Externalities.html' },
  ELPG: { t:'Econlib, "Public Goods" (Tyler Cowen)', u:'https://www.econlib.org/library/Enc/PublicGoods.html' },
  ELAT: { t:'Econlib, "Antitrust" (Fred S. McChesney)', u:'https://www.econlib.org/library/Enc/Antitrust.html' },
  ELNIT:{ t:'Econlib, "Negative Income Tax" (Jodie T. Allen)', u:'https://www.econlib.org/library/Enc/NegativeIncomeTax.html' },
  FRBSF:{ t:'Federal Reserve Bank of San Francisco, Dr. Econ: "What is the difference between private and social costs, and how do they relate to pollution and production?" (2002)', u:'https://www.frbsf.org/?p=6126' },
  FREDG:{ t:'Federal Reserve Bank of St. Louis (FRED), GINI Index for the United States: series notes (World Bank data)', u:'https://fred.stlouisfed.org/graph/?g=12BAp' },
  BEAG: { t:'U.S. Bureau of Economic Analysis, "Measuring Income Distribution: A Primer on the Gini Coefficient" (Kyle Hood, August 2025)', u:'https://apps.bea.gov/scb/issues/2025/08-august/0825-gini-primer.htm' }
});
/* Existing keys reused: CB (CLEP outline), CBS (CLEP sample questions; Q7 externalities), OS111 (§11.1), OS113 (§11.3), ELC (Hardin, tragedy of the commons),
   ELP (property rights), ELMO (Monopoly), ELMW (Gorman, minimum wages), MS5 (Module 5, slide 223: ways to deal with monopoly). */

/* ---------- Unit 7 glossary (tap-to-define). Reused: market-failure, public-goods, commons, subsidy, natural-monopoly, cartel, collusion, deadweight-loss,
   patent, monopoly, price-floor, efficiency, allocative-efficiency, socially-efficient, supply, demand, marginal-cost, prisoners-dilemma, incentive, labor-demand, labor-supply. ---------- */
Object.assign(GLOSS, {
  'market-failure':{ t:'Market failure', d:'A situation where a market on its own produces too much or too little of something compared with what is best for society. Externalities and public goods are the main examples.', home:'l33', src:['OS121','CB'] },
  'public-goods':{ t:'Public good', d:'A good that is non-excludable (people who don\'t pay can\'t easily be kept from using it) and non-rival (one person\'s use doesn\'t leave less for others), such as national defense. Because people can use it without paying, private markets tend to provide too little of it or none.', home:'l35', src:['MS7','OS133','ELPG'] },
  externality:{ t:'Externality', d:'The uncompensated effect of a buyer\'s or seller\'s choice on a bystander who is not part of the deal. Also called a spillover.', home:'l33', src:['MS7','OS121'] },
  'neg-externality':{ t:'Negative externality', d:'A spillover that harms a bystander, such as pollution from a factory. The market produces too much of the good.', home:'l33', src:['MS7','OS121'] },
  'pos-externality':{ t:'Positive externality', d:'A spillover that benefits a bystander, such as the gains to society from education or new inventions. The market produces too little of the good.', home:'l33', src:['MS7','OS131'] },
  'private-cost':{ t:'Private cost', d:'The cost the producer itself pays, such as labor, materials and equipment. The ordinary supply curve reflects private cost only.', home:'l33', src:['MS7','FRBSF'] },
  'external-cost':{ t:'External cost', d:'A cost of making or using a good that falls on bystanders, not on the buyer or seller. Example: health damage from a factory\'s smoke.', home:'l33', src:['FRBSF','OS121'] },
  'social-cost':{ t:'Social cost', d:'The full cost to society: private cost plus external cost.', home:'l33', src:['FRBSF','MS7'] },
  msc:{ t:'Marginal social cost (MSC)', d:'The full cost of producing one more unit: the producer\'s marginal private cost plus the external cost of that unit.', home:'l33', src:['CB','CBS','FRBSF'] },
  mpc:{ t:'Marginal private cost (MPC)', d:'What one more unit costs the producer itself. The market supply curve is the marginal private cost curve.', home:'l33', src:['CBS','MS7'] },
  msb:{ t:'Marginal social benefit (MSB)', d:'The full benefit of one more unit: the buyer\'s own (private) benefit plus the benefit that spills over to others.', home:'l33', src:['CB','CBS','MS7'] },
  mpb:{ t:'Marginal private benefit (MPB)', d:'What one more unit is worth to the buyer. The market demand curve is the marginal private benefit curve.', home:'l33', src:['CBS','MS7'] },
  'social-optimum':{ t:'Socially optimal quantity', d:'The quantity where marginal social benefit equals marginal social cost. Producing more or less than this loses surplus for society.', home:'l33', src:['CB','CBS','OS121'] },
  internalize:{ t:'Internalizing an externality', d:'Changing incentives so that people take the external effects of their actions into account, for example with a tax on pollution or a subsidy for education.', home:'l34', src:['MS7'] },
  epa:{ t:'Environmental Protection Agency (EPA)', d:'The U.S. federal agency that writes and enforces rules on pollution, such as maximum amounts firms may emit.', home:'l34', src:['MS7','OS122'] },
  'pollution-charge':{ t:'Pollution charge', d:'A tax on each unit of pollution a firm emits, so the firm pays for the harm and decides for itself how much to cut.', home:'l34', src:['OS122'] },
  'command-control':{ t:'Command-and-control regulation', d:'Rules that set allowable amounts of pollution or require a specific technology, with penalties for breaking them.', home:'l34', src:['MS7','OS122'] },
  'corrective-tax':{ t:'Corrective (Pigovian) tax', d:'A tax designed to make decision makers account for the social cost of a negative externality, ideally equal to the external cost per unit. Your textbook calls a tax on emissions a pollution charge.', home:'l34', src:['MS7','OS123'] },
  'pollution-permit':{ t:'Tradable pollution permit', d:'A permit to emit a set amount of pollution that firms can buy and sell. The total allowed is capped; firms that can cut cheaply sell permits to firms that can\'t. Also called cap-and-trade.', home:'l34', src:['MS7','OS123','ELEX'] },
  'property-rights-ext':{ t:'Property rights approach (Coase)', d:'Clearly assigning who has the legal right (the polluter or the neighbor) so the two sides can bargain over the spillover. Ronald Coase made this argument.', home:'l34', src:['OS123','ELEX'] },
  excludable:{ t:'Excludable', d:'A good is excludable if a person can be prevented from using it, usually by charging a price.', home:'l35', src:['MS7','OS133'] },
  rival:{ t:'Rival in consumption', d:'A good is rival if one person\'s use leaves less for others. A slice of pizza is rival; a radio broadcast is not.', home:'l35', src:['MS7','OS133'] },
  'private-good':{ t:'Private good', d:'A good that is both excludable and rival, such as an ice-cream cone or clothing. Markets provide these well.', home:'l35', src:['MS7','OS133'] },
  'club-good':{ t:'Club good', d:'A good that is excludable but not rival, such as a movie theater showing or cable TV.', home:'l35', src:['MS7'] },
  'common-resource':{ t:'Common resource', d:'A good that is rival but not excludable, such as fish in the ocean. Because no one can be kept out, it tends to be overused.', home:'l35', src:['MS7','OS133'] },
  'free-rider':{ t:'Free-rider problem', d:'People who benefit from a good without paying for it have an incentive to let others pay, so too little gets paid for and the good may not be provided at all.', home:'l35', src:['MS7','OS133','ELPG'] },
  antitrust:{ t:'Antitrust laws', d:'Laws that let government block mergers, break up large firms and outlaw practices that reduce competition, such as price fixing. Main U.S. laws: the Sherman Act (1890) and the Clayton Act (1914).', home:'l36', src:['OS111','ELAT'] },
  merger:{ t:'Merger', d:'Two separate firms combining into one. When one firm buys another it is called an acquisition.', home:'l36', src:['OS111'] },
  'conc-ratio':{ t:'Four-firm concentration ratio', d:'The combined market share of the four largest firms in an industry. A higher number means the market is more concentrated.', home:'l36', src:['OS111','ELAT'] },
  hhi:{ t:'Herfindahl-Hirschman Index (HHI)', d:'A measure of market concentration: the sum of the squared market shares of every firm. A monopoly scores 10,000.', home:'l36', src:['OS111'] },
  'restrictive-practices':{ t:'Restrictive practices', d:'Business practices that are not outright price fixing but can reduce competition, such as tying sales, some exclusive deals, minimum resale prices and predatory pricing.', home:'l36', src:['OS112'] },
  'tying-sale':{ t:'Tying sale', d:'Requiring a customer who buys one product to also buy a second product.', home:'l36', src:['OS112','ELAT'] },
  'predatory-pricing':{ t:'Predatory pricing', d:'Cutting prices very low to drive a new competitor out, then raising them again. Illegal under U.S. antitrust law but hard to prove.', home:'l36', src:['OS112'] },
  'cost-plus':{ t:'Cost-plus regulation', d:'Regulators let a natural monopoly charge its average cost plus a normal profit. Weakness: the firm has little reason to keep costs down.', home:'l36', src:['OS113'] },
  'price-cap':{ t:'Price cap regulation', d:'Regulators set the price a natural monopoly may charge for the next few years, often falling over time. If the firm cuts costs faster, it keeps the extra profit.', home:'l36', src:['OS113'] },
  'regulatory-capture':{ t:'Regulatory capture', d:'When the firms a regulator oversees end up with strong influence over it, so regulation serves the industry instead of the public.', home:'l36', src:['OS114'] },
  'income-inequality':{ t:'Income inequality', d:'The uneven distribution of income across a population: the gap between the rich and everyone else.', home:'l37', src:['MS7','OS141'] },
  'poverty-line':{ t:'Poverty line', d:'The income needed for a basic standard of living. In the U.S. it is based on three times the cost of a nutritionally adequate diet, adjusted for family size and prices.', home:'l37', src:['OS141'] },
  quintile:{ t:'Quintile', d:'One fifth (20%) of households, after ranking them from lowest to highest income.', home:'l37', src:['OS144'] },
  'lorenz-curve':{ t:'Lorenz curve', d:'A graph of the cumulative share of income (up the side) received by the cumulative share of households (along the bottom), poorest first. The 45-degree line is perfect equality; the farther the curve bows below it, the more unequal.', home:'l37', src:['OS144','FREDG'] },
  gini:{ t:'Gini coefficient', d:'A one-number measure of inequality: the area between the line of equality and the Lorenz curve divided by the whole area under the line. 0 is perfect equality, 1 (or 100) is perfect inequality.', home:'l37', src:['FREDG','BEAG'] },
  'in-kind':{ t:'In-kind transfer', d:'Help given as goods or services instead of cash, such as food assistance (SNAP), housing assistance or Medicaid.', home:'l37', src:['MS7','OS143'] },
  nit:{ t:'Negative income tax', d:'A plan where households below an income threshold receive a payment from the tax system instead of paying tax; the payment shrinks gradually as income rises.', home:'l37', src:['MS7','ELNIT'] },
  eitc:{ t:'Earned income tax credit (EITC)', d:'A U.S. tax credit for low-income workers that grows with earnings up to a point and phases out slowly, so working more still pays.', home:'l37', src:['OS143','ELNIT'] },
  'poverty-trap':{ t:'Poverty trap', d:'When aid is cut by about a dollar for each dollar earned, a poor person gains little or nothing by working more.', home:'l37', src:['OS142'] },
  'real-wage':{ t:'Real wage', d:'A wage adjusted for inflation, so it measures buying power: what the pay can actually buy.', home:'l37', src:['MS7'] },
  'food-insecure':{ t:'Food insecurity', d:'A household is food insecure if, at some time during the year, it did not always have enough food for an active, healthy life for all its members because it lacked money or other resources (USDA).', home:'l37', src:['MS7','USDAFS'] },
  'winner-take-all':{ t:'Winner-take-all market', d:'A market where the very best performers earn far more than those only slightly less skilled, such as top athletes, entertainers and executives.', home:'l37', src:['OS144'] },
  wealth:{ t:'Wealth', d:'The value of everything a household owns minus its debts, measured at a point in time. Income is a flow over a period; wealth is a stock.', home:'l37', src:['OS145'] },
  'progressive-tax':{ t:'Progressive tax', d:'A tax that takes a higher percentage of income from people with higher incomes, like the U.S. federal income tax.', home:'l37', src:['OS145'] }
});

/* ---------- tags: [src, clep key, skill, mistakes] ---------- */
const U7CLEP = {
  msb:'Externalities: marginal social benefit and marginal social cost', pos:'Externalities: positive externalities', neg:'Externalities: negative externalities', rem:'Externalities: remedies',
  exc:'Public goods and private goods: excludability, rivalry, and free-rider problem', prov:'Public goods and private goods: provision of public goods',
  anti:'Public policy to promote competition: antitrust policy', reg:'Public policy to promote competition: regulation',
  ineq:'Income distribution: income inequality', srcs:'Income distribution: sources of income inequality', lor:'Income distribution: Lorenz curve and Gini coefficient'
};
function u7tag(TAGS){ Object.entries(TAGS).forEach(([id,[src,clep,skill,mis]]) => { if(Q[id]) Object.assign(Q[id], { src: src.split(' '), clep: U7CLEP[clep], skill, mis: mis ? mis.split(' ') : [] }); else console.warn('tag for missing question', id); }); }

/* Unit 7 containers; each lesson file adds to these. */
const U7_LESSONS = [], U7_CARDS = {}, U7_WRITE = {}, U7_PLAN = {};
const FIG7 = {};

/* Explanation visual and one more "why the tempting answer is wrong" sentence for fixed items, and card pictures (same as Unit 6's helpers, for Unit 7 containers). */
function u7xv(map){ Object.entries(map).forEach(([id,[vis,why]]) => { const q = Q[id];
  if(!q || typeof q.explain !== 'string'){ console.warn('u7xv: not a fixed item', id); return; }
  q.explain += (why ? `<p>${why}</p>` : '') + (vis || ''); }); }
function u7cv(lesson, map){ (U7_CARDS[lesson]||[]).forEach(c => { if(map[c[0]] !== undefined) c[5] = map[c[0]]; });
  Object.keys(map).forEach(t => { if(!(U7_CARDS[lesson]||[]).some(c => c[0]===t)) console.warn('u7cv: no card', lesson, t); }); }

/* Number choices listed smallest to largest (workbook convention), for Unit 7 items whose choices all start with a number. */
function u7SortNumeric(){
  const U7L = new Set(['l33','l34','l35','l36','l37']);
  const lead = t => { const m = String(t).replace(/<[^>]+>/g,'').replace(/−/g,'-').replace(/,(?=\d{3}\b)/g,'').match(/^\s*(?:About\s+)?([+-]?)\$?\s*([+-]?\d+(?:\.\d+)?)/); return m ? parseFloat((m[1]||'')+m[2]) : null; };
  const sortInst = q => {
    if(q.type!=='mc' || q.kind==='tf' || q.visual || !Array.isArray(q.options) || q.keepOrder) return q;
    const v = q.options.map(lead); if(v.some(x => x===null)) return q;
    const idx = q.options.map((t,i)=>i).sort((a,b)=> v[a]-v[b] || String(q.options[a]).localeCompare(String(q.options[b])));
    const ans = q.answer; q.options = idx.map(i=>q.options[i]); q.answer = idx.indexOf(ans); q.keepOrder = true; return q;
  };
  Object.entries(Q).forEach(([id,q]) => {
    if(!U7L.has(q.lesson)) return;
    if(q.build){ const f = q.build; q.build = () => sortInst(f()); return; }
    if(q.gen){ const f = q.gen; q.gen = () => sortInst(f()); return; }
    sortInst(q);
  });
}

const usd7 = x => (x<0?'−':'') + '$' + Math.abs(x).toLocaleString('en-US',{minimumFractionDigits: Number.isInteger(Math.round(x*100)/100)?0:2, maximumFractionDigits:2});
const pct7 = x => (Math.round(x*10)/10).toLocaleString('en-US') + '%';

/* ---------- the standard externality picture (made-up straight lines on a 0-10 grid) ----------
   Negative: D (= MPB = MSB) p = 9 − 0.8q; S (= MPC) p = 1 + 0.8q; MSC = MPC + 2: p = 3 + 0.8q.
     Market: q = 5, p = 5. Social optimum: 9 − 0.8q = 3 + 0.8q → q = 3.75, p = 6. Deadweight loss: triangle (3.75,6), (5,5), (5,7).
   Positive: S (= MPC = MSC) p = 1 + 0.8q; D (= MPB) p = 9 − 0.8q; MSB = MPB + 2: p = 11 − 0.8q.
     Market: q = 5, p = 5. Social optimum: 11 − 0.8q = 1 + 0.8q → q = 6.25, p = 6. Deadweight loss: triangle (5,5), (5,7), (6.25,6). (checked by script) */
const EXN = { mkt:[5,5], opt:[3.75,6], dwl:[[3.75,6],[5,5],[5,7]] }, EXP = { mkt:[5,5], opt:[6.25,6], dwl:[[5,5],[5,7],[6.25,6]] };
function extGraph(kind, { dwl=true, aria, xlab='Quantity', ylab='Price', marks=true, tax=false, sub=false }={}){
  const neg = kind==='neg';
  const lines = neg
    ? [ {a:[0,9],b:[10,1],c:DC,label:'D = MPB = MSB',lx:-4,ly:-8,anchor:'end'}, {a:[0,1],b:[10,9],c:SC,label:'S = MPC',lx:-4,ly:16,anchor:'end'}, {a:[0,3],b:[7.5,9],c:'var(--bad)',label:tax?'S + tax = MSC':'MSC',lx:-4,ly:-8,anchor:'end'} ]
    : [ {a:[0,1],b:[10,9],c:SC,label:'S = MPC = MSC',lx:-4,ly:16,anchor:'end'}, {a:[0,9],b:[10,1],c:DC,label:'D = MPB',lx:-4,ly:-8,anchor:'end'}, {a:[0,11],b:[10,3],c:'var(--g2)',label:sub?'D + subsidy = MSB':'MSB',lx:-4,ly:-8,anchor:'end'} ];
  const T = neg ? EXN : EXP;
  const dots = marks ? [ {q:T.mkt[0],p:T.mkt[1],label:'Market',c:'var(--muted)',lx:neg?8:-8,ly:neg?14:14,anchor:neg?'start':'end'}, {q:T.opt[0],p:T.opt[1],label:'Social optimum',c:'var(--ink)',lx:neg?-8:8,ly:-8,anchor:neg?'end':'start'} ] : [];
  return sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab, ylab, aria: aria || (neg ? 'Negative externality graph' : 'Positive externality graph'),
    lines, areas: dwl ? [Object.assign({ pts:T.dwl }, DWLF)] : [],
    vls: marks ? [{q:T.mkt[0],p:T.mkt[1]},{q:T.opt[0],p:T.opt[1]}] : [], dots });
}

/* Small externality pictures for answer choices (150 × 124, neutral axes, no title, no hint in the label).
   kinds: neg (MSC above supply, market quantity beyond the optimum), pos (MSB above demand, market quantity short of it),
   negBelow (the "social" curve drawn below supply), posBelow (the "social" curve drawn below demand), none (one supply and one demand only). */
const XDESC = {
  neg:'a second cost curve above the supply curve; the market quantity is larger than the quantity where the higher cost curve meets demand',
  pos:'a second benefit curve above the demand curve; the market quantity is smaller than the quantity where the higher benefit curve meets supply',
  negBelow:'a second cost curve below the supply curve; the market quantity is smaller than where the lower cost curve meets demand',
  posBelow:'a second benefit curve below the demand curve; the market quantity is larger than where the lower benefit curve meets supply',
  none:'one supply curve and one demand curve, with no second curve'
};
function u7ext(kind, aria){
  const D = {a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:-2,ly:-3,anchor:'end'}, S = {a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4};
  const spec = {
    neg:{ lines:[D, S, {a:[1,3],b:[7,9],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:5,y:5},{x:4,y:6}], dots:[{x:5,y:5},{x:4,y:6}] },
    pos:{ lines:[S, D, {a:[3,9],b:[9,3],c:'var(--g2)',label:'X',lx:2,ly:4}], vls:[{x:5,y:5},{x:6,y:6}], dots:[{x:5,y:5},{x:6,y:6}] },
    negBelow:{ lines:[D, S, {a:[3,1],b:[9,7],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:5,y:5},{x:6,y:4}], dots:[{x:5,y:5},{x:6,y:4}] },
    posBelow:{ lines:[S, D, {a:[1,7],b:[7,1],c:'var(--g2)',label:'X',lx:2,ly:-3}], vls:[{x:5,y:5},{x:4,y:4}], dots:[{x:5,y:5},{x:4,y:4}] },
    none:{ lines:[D, S], vls:[{x:5,y:5}], dots:[{x:5,y:5}] } }[kind];
  return u6mini({ ...spec, xlab:'Quantity', ylab:'Price', aria: aria || 'Graph' });
}
/* Bar chart of costs with a dashed horizontal "Tax" line at T (ubars default size: plot top 14, plot height 142, x from 40 to 284). */
function u7barsTax(vals, T, opts){ const ymax = opts.ymax || Math.max(...vals, T) * 1.1, y = 14 + 142 * (1 - T/ymax);
  return ubars(vals, { ...opts, ymax }).replace(/<\/svg>\s*$/, `<line x1="40" x2="284" y1="${y}" y2="${y}" stroke="var(--ink)" stroke-dasharray="6 4" stroke-width="1.6"/><text x="282" y="${y-5}" text-anchor="end" class="lbl-ink" style="font-size:11px">Tax ${usd7(T)}</text></svg>`); }

/* Full-size, marked-up version of u7ext (same lines: D p = 10 − q, S p = q, X as in u7ext), for explanations of graph-choice items.
   neg: market (5,5), optimum where X (p = q + 2) meets D: (4,6); DWL triangle (4,6), (5,5), (5,7). pos: X p = 12 − q meets S at (6,6); DWL (5,5), (5,7), (6,6). (checked by hand) */
function u7extBig(kind, note){
  const neg = kind==='neg', D = {a:[1,9],b:[9,1],c:DC,label:'D (MPB)',lx:-4,ly:-8,anchor:'end'}, S = {a:[1,1],b:[9,9],c:SC,label:'S (MPC)',lx:-4,ly:16,anchor:'end'};
  const X = neg ? {a:[1,3],b:[7,9],c:'var(--bad)',label:'X = MSC',lx:-4,ly:-8,anchor:'end'} : {a:[3,9],b:[9,3],c:'var(--g2)',label:'X = MSB',lx:-4,ly:-8,anchor:'end'};
  const opt = neg ? [4,6] : [6,6], tri = neg ? [[4,6],[5,5],[5,7]] : [[5,5],[5,7],[6,6]];
  return fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'Marked-up answer graph', lines: neg ? [D,S,X] : [S,D,X],
    areas:[Object.assign({ pts:tri }, DWLF)], vls:[{q:5,p:5},{q:opt[0],p:opt[1]}],
    dots:[{q:5,p:5,label:'Market',c:'var(--muted)',lx:neg?9:-9,ly:14,anchor:neg?'start':'end'},{q:opt[0],p:opt[1],label:'Optimum',c:'var(--ink)',lx:neg?-9:9,ly:-8,anchor:neg?'end':'start'}] }), note);
}
const extChoice = (k, ok) => ({ svg: L => u7ext(k, 'Graph ' + L), desc: XDESC[k], ok: !!ok });
