/* =====================================================================
   UNIT 2: SUPPLY AND DEMAND (Lessons 6-12)
   Built 2026-10-22 from Modern States videos 2.1a-2.4 and Module 2 slides, the course textbook
   (OpenStax Principles of Microeconomics, 2016 edition) ch. 3, 4.1, 5 and 20.1, the CLEP outline,
   the AP Microeconomics CED, Econlib and MRU. Source problems found in the course materials are
   listed in the project notes and flagged in the lessons where they could cost an exam point.
   ===================================================================== */

/* ---------- Unit 2 sources (keys used in question tags, glossary entries and source lines) ---------- */
Object.assign(SOURCES, {
  MS2:  { t:'Modern States, Principles of Microeconomics, Module 2 videos and slides', u:'https://modernstates.org/course/principles-of-microeconomics/' },
  OS31: { t:'OpenStax, Principles of Microeconomics (your course textbook), §3.1', u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services' },
  OS32: { t:'OpenStax, Principles of Microeconomics (your course textbook), §3.2', u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services' },
  OS33: { t:'OpenStax, Principles of Microeconomics (your course textbook), §3.3', u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process' },
  OS34: { t:'OpenStax, Principles of Microeconomics (your course textbook), §3.4', u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-4-price-ceilings-and-price-floors' },
  OS35: { t:'OpenStax, Principles of Microeconomics (your course textbook), §3.5', u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-5-demand-supply-and-efficiency' },
  OS41: { t:'OpenStax, Principles of Microeconomics (your course textbook), §4.1', u:'https://openstax.org/books/principles-microeconomics-3e/pages/4-1-demand-and-supply-at-work-in-labor-markets' },
  OS51: { t:'OpenStax, Principles of Microeconomics (your course textbook), §5.1', u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply' },
  OS52: { t:'OpenStax, Principles of Microeconomics (your course textbook), §5.2', u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-2-polar-cases-of-elasticity-and-constant-elasticity' },
  OS53: { t:'OpenStax, Principles of Microeconomics (your course textbook), §5.3', u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-3-elasticity-and-pricing' },
  OS54: { t:'OpenStax, Principles of Microeconomics (your course textbook), §5.4', u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-4-elasticity-in-areas-other-than-price' },
  OS201:{ t:'OpenStax, Principles of Microeconomics (your course textbook), §20.1', u:'https://openstax.org/books/principles-microeconomics-3e/pages/20-1-protectionism-an-indirect-subsidy-from-consumers-to-producers' },
  CBS:  { t:'College Board, CLEP Principles of Microeconomics sample questions (fact sheet)', u:'https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf' },
  CED:  { t:'College Board, AP Microeconomics Course and Exam Description, Unit 2', u:'https://apcentral.collegeboard.org/media/pdf/ap-microeconomics-course-and-exam-description.pdf' },
  ELPC: { t:'Econlib, "Price Controls" (Hugh Rockoff)', u:'https://www.econlib.org/library/Enc/PriceControls.html' },
  ELRC: { t:'Econlib, "Rent Control" (Walter Block)', u:'https://www.econlib.org/library/Enc/RentControl.html' },
  ELD:  { t:'Econlib, "Demand" (David R. Henderson)', u:'https://www.econlib.org/library/Enc/Demand.html' },
  ELE:  { t:'Econlib, Elasticity of Demand (topic page)', u:'https://www.econlib.org/library/Topics/HighSchool/ElasticityofDemand.html' },
  ELSD: { t:'Econlib, Supply and Demand, Markets and Prices (topic page)', u:'https://www.econlib.org/library/Topics/College/supplyanddemand.html' },
  ELDW: { t:'Econlib, "Deadweight Loss Computations" (David R. Henderson)', u:'https://www.econlib.org/deadweight-loss-computations/' },
  MRUT: { t:'Marginal Revolution University, "Who Pays the Tax?" (video page)', u:'https://learn.mru.org/lessons/tax-burden-elasticity-affordable-care-act-health-insurance-mandate' },
  MRUE: { t:'Marginal Revolution University, "Elasticity of Demand" (video page)', u:'https://learn.mru.org/lessons/elasticity-demand-definition' }
});

/* ---------- Unit 2 glossary (tap-to-define). Existing Unit 1 entries are reused, not redefined. ---------- */
Object.assign(GLOSS, {
  'competitive-market':{ t:'Competitive market', d:'A market with many buyers and sellers of an identical good, where no single buyer or seller can set the price.', home:'l6', src:['MS2'] },
  demand:{ t:'Demand', d:'The whole relationship between a good\'s price and how much buyers are willing and able to buy at each price: the entire schedule or curve.', home:'l6', src:['OS31'] },
  'quantity-demanded':{ t:'Quantity demanded', d:'How much buyers want to buy at one particular price: a single point on the demand curve.', home:'l6', src:['OS31'] },
  'law-of-demand':{ t:'Law of demand', d:'Other things equal, a higher price leads to a lower quantity demanded, and a lower price to a higher quantity demanded.', home:'l6', src:['OS31','MS2'] },
  'demand-schedule':{ t:'Demand schedule', d:'A table listing the quantity demanded at each price.', home:'l6', src:['OS31'] },
  'demand-curve':{ t:'Demand curve', d:'A graph of the demand schedule, with price on the vertical axis and quantity on the horizontal axis. It slopes down.', home:'l6', src:['OS31'] },
  'ceteris-paribus':{ t:'Ceteris paribus', d:'Latin for "other things being equal": the assumption that only the one factor being studied changes.', home:'l6', src:['OS32'] },
  'normal-good':{ t:'Normal good', d:'A good people buy more of when their income rises (and less of when it falls).', home:'l6', src:['OS32','MS2'] },
  'inferior-good':{ t:'Inferior good', d:'A good people buy less of when their income rises, such as generic groceries or gas-station coffee. "Inferior" is about the income response, not quality.', home:'l6', src:['OS32','MS2'] },
  complements:{ t:'Complements', d:'Goods used together, like hot dogs and buns. If one gets more expensive, demand for the other falls.', home:'l6', src:['OS32','MS2'] },
  substitutes:{ t:'Substitutes', d:'Goods that can replace each other, like hot dogs and hamburgers. If one gets more expensive, demand for the other rises.', home:'l6', src:['OS32','MS2'] },
  supply:{ t:'Supply', d:'The whole relationship between a good\'s price and how much sellers are willing to sell at each price: the entire schedule or curve.', home:'l6', src:['OS31'] },
  'quantity-supplied':{ t:'Quantity supplied', d:'How much sellers want to sell at one particular price: a single point on the supply curve.', home:'l6', src:['OS31'] },
  'law-of-supply':{ t:'Law of supply', d:'Other things equal, a higher price leads to a higher quantity supplied, and a lower price to a lower quantity supplied.', home:'l6', src:['OS31','MS2'] },
  inputs:{ t:'Inputs', d:'The labor, materials and machinery used to make a good. When inputs cost more, supply falls.', home:'l6', src:['OS32'] },
  equilibrium:{ t:'Equilibrium', d:'The price and quantity where quantity demanded equals quantity supplied, so there is no pressure for the price to change.', home:'l7', src:['OS31','MS2'] },
  'excess-supply':{ t:'Surplus (excess supply)', d:'At the current price, quantity supplied is greater than quantity demanded. It happens when the price is above equilibrium and pushes the price down.', home:'l7', src:['OS31'] },
  shortage:{ t:'Shortage (excess demand)', d:'At the current price, quantity demanded is greater than quantity supplied. It happens when the price is below equilibrium and pushes the price up.', home:'l7', src:['OS31'] },
  'price-control':{ t:'Price control', d:'A law that sets a maximum or minimum price instead of letting supply and demand set it.', home:'l8', src:['OS34','MS2'] },
  'price-ceiling':{ t:'Price ceiling', d:'A legal maximum price. It matters (binds) only when set below the equilibrium price, and then it causes a shortage.', home:'l8', src:['OS34','MS2'] },
  'price-floor':{ t:'Price floor', d:'A legal minimum price, such as a minimum wage. It matters (binds) only when set above the equilibrium price, and then it causes a surplus.', home:'l8', src:['OS34','MS2'] },
  binding:{ t:'Binding control', d:'A price control that stops the market from reaching equilibrium: a ceiling below the equilibrium price or a floor above it.', home:'l8', src:['MS2','OS41'] },
  elasticity:{ t:'Elasticity', d:'How strongly one thing responds to a change in another, measured as a percentage change divided by a percentage change.', home:'l9', src:['OS51'] },
  ped:{ t:'Price elasticity of demand', d:'The percentage change in quantity demanded divided by the percentage change in price. Read as a positive number.', home:'l9', src:['OS51','ELD'] },
  'midpoint-method':{ t:'Midpoint method', d:'Computing a percentage change by dividing the change by the average of the two values, so you get the same answer whether the price rises or falls.', home:'l9', src:['OS51','MS2'] },
  elastic:{ t:'Elastic', d:'Elasticity greater than 1: quantity changes by a bigger percentage than price.', home:'l9', src:['OS51'] },
  inelastic:{ t:'Inelastic', d:'Elasticity less than 1: quantity changes by a smaller percentage than price.', home:'l9', src:['OS51'] },
  'unit-elastic':{ t:'Unit elastic', d:'Elasticity exactly 1: quantity changes by the same percentage as price.', home:'l9', src:['OS51'] },
  'total-revenue':{ t:'Total revenue', d:'Price times quantity sold: all the money a seller takes in from a good.', home:'l9', src:['MS2','OS53'] },
  pes:{ t:'Price elasticity of supply', d:'The percentage change in quantity supplied divided by the percentage change in price. It is positive.', home:'l9', src:['OS51','MS2'] },
  'income-elasticity':{ t:'Income elasticity of demand', d:'The percentage change in quantity demanded divided by the percentage change in income. Positive for normal goods, negative for inferior goods.', home:'l10', src:['OS54','MS2'] },
  'cross-price-elasticity':{ t:'Cross-price elasticity of demand', d:'The percentage change in quantity demanded of one good divided by the percentage change in the price of another. Positive for substitutes, negative for complements.', home:'l10', src:['OS54','MS2'] },
  'willingness-to-pay':{ t:'Willingness to pay', d:'The most a buyer would pay for one more unit. The demand curve traces it.', home:'l11', src:['MS2','OS35'] },
  'consumer-surplus':{ t:'Consumer surplus', d:'What buyers were willing to pay minus what they actually paid. On a graph: the area below the demand curve and above the price.', home:'l11', src:['OS35','MS2'] },
  'producer-surplus':{ t:'Producer surplus', d:'The price sellers receive minus the lowest price they would have accepted (their cost). On a graph: the area above the supply curve and below the price.', home:'l11', src:['OS35','MS2'] },
  'total-surplus':{ t:'Total surplus (social surplus)', d:'Consumer surplus plus producer surplus: value to buyers minus cost to sellers. It is largest at the equilibrium quantity.', home:'l11', src:['OS35','MS2'] },
  'tax-wedge':{ t:'Tax wedge', d:'The gap a per-unit tax opens between the price buyers pay and the price sellers keep. It equals the tax.', home:'l12', src:['MS2','OS53'] },
  'tax-incidence':{ t:'Tax incidence', d:'How the burden of a tax is split between buyers and sellers. The more inelastic side bears more of it.', home:'l12', src:['OS53','MS2'] },
  'deadweight-loss':{ t:'Deadweight loss', d:'The total surplus lost when a market produces less (or more) than the equilibrium quantity, because trades worth more than they cost no longer happen.', home:'l12', src:['OS35','MS2'] },
  'market-clearing-price':{ t:'Market-clearing price', d:'Another name for the equilibrium price: the price at which quantity supplied equals quantity demanded, so nothing is left unsold and no willing buyer is turned away.', home:'l7', src:['MS2'] },
  'perfectly-inelastic':{ t:'Perfectly inelastic', d:'An elasticity of zero: quantity doesn\'t respond to price at all. The curve is vertical.', home:'l9', src:['OS52'] },
  'perfectly-elastic':{ t:'Perfectly elastic', d:'An infinite elasticity: any price rise drops quantity to zero. The curve is horizontal.', home:'l9', src:['OS52'] },
  'welfare-economics':{ t:'Welfare economics', d:'The study of how the allocation of resources and market outcomes affect economic well-being, measured with consumer, producer and total surplus. "Welfare" means well-being, not government aid.', home:'l11', src:['MS2'] },
  'efficiency':{ t:'Efficiency', d:'A situation where no one can be made better off without making someone else worse off. For a market: total surplus is as large as possible.', home:'l11', src:['OS35'] },
  'public-goods':{ t:'Public good', d:'A good that is non-excludable (people who don\'t pay can\'t easily be kept from using it) and non-rival (one person\'s use doesn\'t leave less for others), such as national defense. Because people can use it without paying, private markets tend to provide too little of it. Unit 7 covers it.', home:'Unit 7', src:['MS2'] }
});

/* ---------- supply-and-demand graph for question prompts (static SVG markup, built on gchart) ----------
   lines: [{a:[q,p], b:[q,p], label, c (color var), dash}]  hl: horizontal lines [{p, label, c}]  dots: [{q,p,label,c}]
   areas: [{pts:[[q,p],...], c, label:[q,p,text]}] */
/* sdg: supply-and-demand chart (SVG string). Optional extras used by the lesson figures:
   lines[].pts (a polyline instead of a/b); vls: dashed vertical guides {q, p, c};
   arrows: {a:[q,p], b:[q,p], c}; spans: two-headed brackets, horizontal {p, q1, q2} or vertical {q, p1, p2}, with label/c/lx/ly/anchor. */
let SDGN = 0;
/* gchart2: gchart with an optional non-zero origin (xmin/ymin, shown with a small axis-break mark) and a clip region,
   so zoomed figures keep their lines inside the plot. Same size and styling as gchart. */
function gchart2({xmin=0,xmax,ymin=0,ymax,xlab,ylab,xt=[],yt=[],body,aria}){
  const x0=46,y0=176,pw=236,ph=156; const X=v=>x0+pw*(v-xmin)/(xmax-xmin), Y=v=>y0-ph*(v-ymin)/(ymax-ymin);
  const cid='sc'+(++SDGN);
  let s=`<defs><clipPath id="${cid}"><rect x="${x0-1}" y="${y0-ph-1}" width="${pw+2}" height="${ph+2}"/></clipPath></defs>`;
  yt.forEach(t=>{ const y=Y(t); s+=`<line x1="${x0}" x2="${x0+pw}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" class="gl"/><text x="${x0-6}" y="${(y+4).toFixed(1)}" text-anchor="end" class="lbl">${t}</text>`; });
  xt.forEach(t=>{ const x=X(t); s+=`<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="${y0}" y2="${y0-ph}" class="gl"/><text x="${x.toFixed(1)}" y="${y0+15}" text-anchor="middle" class="lbl">${t}</text>`; });
  s+=`<line x1="${x0}" x2="${x0+pw}" y1="${y0}" y2="${y0}" class="ax"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y0-ph}" class="ax"/>`;
  if(ymin>0) s+=`<path d="M${x0-5},${y0-8} l10,-4 M${x0-5},${y0-3} l10,-4" stroke="var(--muted)" stroke-width="1.2"/>`;
  if(xmin>0) s+=`<path d="M${x0+6},${y0+5} l4,-10 M${x0+11},${y0+5} l4,-10" stroke="var(--muted)" stroke-width="1.2"/>`;
  s+=`<text x="${x0+pw/2}" y="${y0+32}" text-anchor="middle" class="lbl-ink">${xlab}</text><text x="14" y="${y0-ph/2}" text-anchor="middle" class="lbl-ink" transform="rotate(-90 14 ${y0-ph/2})">${ylab}</text>`;
  const b = body(X,Y);
  s += `<g clip-path="url(#${cid})">${b.under}</g>${b.over}`;
  return `<div class="qg"><svg viewBox="0 0 300 215" role="img" aria-label="${esc(aria||`Graph: ${ylab} on the vertical axis, ${xlab} on the horizontal axis`)}">${s}</svg></div>`;
}
/* clip segment a-b (data units) to the box; returns null if outside */
function clipSeg([x1,y1],[x2,y2],xa,xb,ya,yb){
  let t0=0,t1=1; const dx=x2-x1, dy=y2-y1;
  for(const [p,q] of [[-dx,x1-xa],[dx,xb-x1],[-dy,y1-ya],[dy,yb-y1]]){
    if(p===0){ if(q<0) return null; continue; }
    const r=q/p; if(p<0){ if(r>t1) return null; if(r>t0) t0=r; } else { if(r<t0) return null; if(r<t1) t1=r; }
  }
  return [[x1+t0*dx,y1+t0*dy],[x1+t1*dx,y1+t1*dy]];
}
/* sdg: supply-and-demand chart (SVG string). Optional extras used by the lesson figures:
   xmin/ymin (zoomed origin); lines[].pts (a polyline instead of a/b); vls: dashed vertical guides {q, p, c};
   arrows: {a:[q,p], b:[q,p], c}; spans: two-headed brackets, horizontal {p, q1, q2} or vertical {q, p1, p2}, with label/c/lx/ly/anchor;
   dots[].lx/ly/anchor move a dot's label. */
function sdg({xmin=0, xmax=10, ymin=0, ymax=10, xlab='Quantity', ylab='Price', xt=[], yt=[], lines=[], hl=[], dots=[], areas=[], labels=[], vls=[], arrows=[], spans=[], aria}){
  return gchart2({ xmin, xmax, ymin, ymax, xlab, ylab, xt, yt, aria, body:(X,Y)=>{
    let u='', o='';
    const mk = c => { const id='sa'+(++SDGN); o += `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker></defs>`; return id; };
    areas.forEach(a => { u += `<polygon points="${a.pts.map(([q,p])=>X(q).toFixed(1)+','+Y(p).toFixed(1)).join(' ')}" fill="${a.c||'var(--accent-soft)'}" opacity="${a.o||0.8}"${a.stroke?` stroke="${a.stroke}" stroke-width="1"`:''}/>`; if(a.label) o += gtext(X(a.label[0]), Y(a.label[1]), a.label[2], a.lc||'var(--ink)', 'middle'); });
    vls.forEach(v => { u += `<line x1="${X(v.q).toFixed(1)}" x2="${X(v.q).toFixed(1)}" y1="${Y(ymin)}" y2="${Y(v.p===undefined?ymax:v.p).toFixed(1)}" stroke="${v.c||'var(--muted)'}" stroke-width="1.6" stroke-dasharray="4 4"/>`; });
    hl.forEach(h => { const qe = h.q===undefined?xmax:h.q; u += `<line x1="${X(xmin)}" x2="${X(qe).toFixed(1)}" y1="${Y(h.p).toFixed(1)}" y2="${Y(h.p).toFixed(1)}" stroke="${h.c||'var(--g2)'}" stroke-width="2" stroke-dasharray="6 4"/>`; if(h.label) o += gtext(X(qe)-2, Y(h.p)+(h.ly||-5), h.label, h.c||'var(--g2)', 'end'); });
    lines.forEach(l => {
      let pts = l.pts ? l.pts.filter(([q,p])=>q>=xmin&&q<=xmax&&p>=ymin&&p<=ymax) : (clipSeg(l.a,l.b,xmin,xmax,ymin,ymax)||[]);
      if(pts.length<2) return; const end = pts[pts.length-1];
      u += gline(pts, X, Y, l.c||'var(--accent)', l.dash||'', l.w||2.6);
      if(l.label) o += gtext(X(end[0])+(l.lx||4), Y(end[1])+(l.ly||4), l.label, l.c||'var(--accent)', l.anchor||'start'); });
    arrows.forEach(a => { const c=a.c||'var(--g2)', id=mk(c); o += `<line x1="${X(a.a[0]).toFixed(1)}" y1="${Y(a.a[1]).toFixed(1)}" x2="${X(a.b[0]).toFixed(1)}" y2="${Y(a.b[1]).toFixed(1)}" stroke="${c}" stroke-width="2.2" marker-end="url(#${id})"/>`; });
    spans.forEach(sp => { const c=sp.c||'var(--g2)', id=mk(c);
      const [x1,y1,x2,y2] = sp.q===undefined ? [X(sp.q1),Y(sp.p),X(sp.q2),Y(sp.p)] : [X(sp.q),Y(sp.p1),X(sp.q),Y(sp.p2)];
      o += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c}" stroke-width="2" marker-start="url(#${id})" marker-end="url(#${id})"/>`;
      if(sp.label) o += gtext((x1+x2)/2+(sp.lx||0), (y1+y2)/2+(sp.ly===undefined?-7:sp.ly), sp.label, c, sp.anchor||'middle'); });
    dots.forEach(d => { if(d.lx===undefined && d.ly===undefined && !d.anchor){ o += gdot(X, Y, d.q, d.p, d.label||'', d.c||'var(--ink)'); return; }
      o += `<circle cx="${X(d.q).toFixed(1)}" cy="${Y(d.p).toFixed(1)}" r="5" fill="${d.c||'var(--ink)'}"/>` + (d.label ? gtext(X(d.q)+(d.lx||8), Y(d.p)+(d.ly===undefined?-8:d.ly), d.label, 'var(--ink)', d.anchor||'start') : ''); });
    labels.forEach(([q,p,t,c,anchor]) => { o += gtext(X(q), Y(p), t, c||'var(--ink)', anchor||'middle'); });
    return { under:u, over:o }; } });
}
/* Lesson figures: one chart, or a row of small charts, with a caption. Static pictures (no state), so no TEST NOTE needed;
   each figure's numbers are listed in the <!-- src: --> comment of its section. */
const fig = (inner, cap) => `<figure class="u2fig">${inner}<figcaption>${cap}</figcaption></figure>`;
const figs = (cells, cap) => `<figure class="u2fig"><div class="u2row">${cells.map(([t,svg])=>`<div class="u2cell">${t?`<p class="u2t">${t}</p>`:''}${svg}</div>`).join('')}</div><figcaption>${cap}</figcaption></figure>`;
/* A demand line from (0, pmax) down to (qmax, 0) clipped to the chart, and a supply line up from (0, pmin). */
const lin = (p0, slope) => q => p0 + slope*q;   // price as a function of quantity

/* ---------- shared tag helper (same shape as L4TAGS/L5TAGS: [src, clep key, skill, mistakes]) ---------- */
const U2CLEP = {
  eq:'Market equilibrium', det:'Determinants of supply and demand', ctl:'Price and quantity controls',
  ela:'Elasticity', ped:'Elasticity: price elasticity of demand', tr:'Elasticity: price elasticity of demand and total revenue',
  pes:'Elasticity: price elasticity of supply', inc:'Elasticity: income elasticity of demand', xpe:'Elasticity: cross-price elasticity of demand',
  cs:'Consumer surplus, producer surplus, and market efficiency', tax:'Tax incidence and deadweight loss'
};
function u2tag(TAGS){ Object.entries(TAGS).forEach(([id,[src,clep,skill,mis]]) => { if(Q[id]) Object.assign(Q[id], { src: src.split(' '), clep: U2CLEP[clep], skill, mis: mis ? mis.split(' ') : [] }); else console.warn('tag for missing question', id); }); }

/* Unit 2 containers; each lesson file adds to these. */
const U2_LESSONS = [], U2_CARDS = {}, U2_WRITE = {}, U2_PLAN = {};
