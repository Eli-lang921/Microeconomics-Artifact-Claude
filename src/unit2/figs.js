/* ===== Unit 2 lesson figures (static) =====
   Every number below comes from the course, the course textbook, or a made-up example that the caption labels as made-up.
   Colors: demand = accent (green), supply = g1 (blue), old curve = muted dashed, changes = g2 (amber).
   Surplus fills: consumer surplus = accent, producer surplus = g1, tax revenue = g2, deadweight loss = bad. */
const DC = 'var(--accent)', SC = 'var(--g1)', OLD = 'var(--muted)', CH = 'var(--g2)';
const CSF = {c:'var(--accent)', o:0.3}, PSF = {c:'var(--g1)', o:0.25}, REVF = {c:'var(--g2)', o:0.3}, DWLF = {c:'var(--bad)', o:0.3, stroke:'var(--bad)'};
const sup = (a,b,label='S',extra={}) => Object.assign({a,b,label,c:SC,lx:-6,ly:14,anchor:'end'}, extra);
const dem = (a,b,label='D',extra={}) => Object.assign({a,b,label,c:DC}, extra);
const oldL = (a,b,label) => ({a,b,label,c:OLD,dash:'5 4',w:2});

/* horizontal bar chart (own SVG, not a supply-and-demand grid) */
function hbars(rows, {max, ref, refLabel, w=440, left=170, fmt=v=>v}){
  const rh=24, top=8, right=w-60, X=v=>left+(right-left)*v/max, yb=top+rows.length*rh+4, H=yb+30;
  let s=`<svg class="u2bars" viewBox="0 0 ${w} ${H}" role="img" aria-label="Bar chart">`;
  if(ref!==undefined) s+=`<line x1="${X(ref)}" x2="${X(ref)}" y1="${top}" y2="${yb}" stroke="${CH}" stroke-width="2" stroke-dasharray="5 4"/><text x="${X(ref)}" y="${yb+18}" text-anchor="middle" class="lbl-ink" style="fill:${CH}">${refLabel}</text>`;
  rows.forEach(([lab,v,c],i)=>{ const y=top+i*rh; s+=`<text x="${left-8}" y="${y+15}" text-anchor="end" class="lbl-ink" style="font-weight:500">${lab}</text><rect x="${left}" y="${y+4}" width="${(X(v)-left).toFixed(1)}" height="${rh-9}" rx="3" fill="${c||'var(--accent-soft)'}" stroke="${c?'none':'var(--accent)'}"/><text x="${(X(v)+5).toFixed(1)}" y="${y+15}" class="lbl-ink halo">${fmt(v)}</text>`; });
  s+=`<line x1="${left}" x2="${right}" y1="${yb}" y2="${yb}" class="ax"/>`;
  return s+'</svg>';
}
/* number line with shaded regions and marked points; tick values print under the region labels */
function numline({min, max, regions, points, ticks=[0,1], w=440}){
  const L=20, R=w-20, X=v=>L+(R-L)*(v-min)/(max-min), y=50;
  let s=`<svg class="u2bars" viewBox="0 0 ${w} 122" role="img" aria-label="Number line">`;
  regions.forEach(([a,b,lab,c])=>{ s+=`<rect x="${X(a).toFixed(1)}" y="${y-16}" width="${(X(b)-X(a)).toFixed(1)}" height="32" fill="${c}" opacity=".9"/>${lab?`<text x="${((X(a)+X(b))/2).toFixed(1)}" y="${y+34}" text-anchor="middle" class="lbl-ink">${lab}</text>`:''}`; });
  s+=`<line x1="${L}" x2="${R}" y1="${y}" y2="${y}" class="ax"/>`;
  ticks.forEach(t=>{ s+=`<line x1="${X(t)}" x2="${X(t)}" y1="${y-18}" y2="${y+18}" stroke="var(--ink)" stroke-width="1.5"/><text x="${X(t)}" y="${y+56}" text-anchor="middle" class="lbl">${t}</text>`; });
  points.forEach(([v,lab])=>{ s+=`<circle cx="${X(v).toFixed(1)}" cy="${y}" r="6" fill="${CH}"/><text x="${X(v).toFixed(1)}" y="${y-24}" text-anchor="middle" class="lbl-ink halo" style="fill:${CH}">${lab}</text>`; });
  return s+'</svg>';
}

/* orange market from your course (video 2.1b schedule): Qd = 60 − 10P, Qs = 10P → P = 6 − Q/10 and P = Q/10 */
const OR = { xmax:60, ymax:8, xt:[0,20,30,40,60], yt:[0,2,3,4,6] };
/* the two schedules from video 2.1a, zoomed (axes start at 8 units and $4) */
const SCHED = { xmin:8, xmax:15, ymin:4, ymax:8, xt:[10,12,13], yt:[5,6,7] };
/* sock curves (made-up, through your course's $5 and 300): D P = 6.5 − Q/200, S P = 3.5 + Q/200 */
const SOCK = { xmax:600, ymin:3, ymax:7, xlab:'Pairs of socks', xt:[0,200,300,600] };
const sockD = () => dem([0,6.5],[600,3.5]), sockS = () => sup([0,3.5],[600,6.5]);

const FIG = {
/* ---------- Lesson 6 ---------- */
l6demand: () => fig(sdg({...SCHED, xlab:'Quantity demanded',
    lines:[{pts:[[10,7],[12,6],[13,5]], label:'D', c:DC, lx:6, ly:4}], dots:[{q:13,p:5,label:'$5: 13',c:DC},{q:12,p:6,label:'$6: 12',c:DC},{q:10,p:7,label:'$7: 10',c:DC}]}),
  'Your course\'s demand schedule drawn as a curve (axes start at 8 units and $4 to zoom in). Each row of the table is one point; a higher price goes with a smaller quantity demanded, so the curve slopes down.'),
l6movshift: () => figs([
  ['Movement along the curve', sdg({xmax:10, ymax:10, xt:[0,4,6], yt:[0,4,6], lines:[dem([1,9],[9,1])], dots:[{q:4,p:6,label:'A'},{q:6,p:4,label:'B'}], arrows:[{a:[4.3,5.7],b:[5.6,4.4]}], labels:[[6.3,8.6,'own price falls',CH]]})],
  ['Shift of the curve', sdg({xmax:10, ymax:10, xt:[0,4,8], yt:[0,4], lines:[oldL([1,7],[7,1],'D1'), dem([3,9],[9,3],'D2')], arrows:[{a:[4.2,4],b:[7.6,4]}], labels:[[6.2,8.6,'income rises (normal good)',CH]]})]],
  'Left: only the good\'s own price changed, so buyers slide along the same curve from A to B (a change in quantity demanded). Right: something other than the price changed, so buyers want more at every price and the whole curve moves (a change in demand). Made-up curves.'),
l6supply: () => fig(sdg({...SCHED, xlab:'Quantity supplied',
    lines:[{pts:[[10,5],[12,6],[13,7]], label:'S', c:SC, lx:6, ly:4}], dots:[{q:10,p:5,label:'$5: 10',c:SC,lx:-8,anchor:'end'},{q:12,p:6,label:'$6: 12',c:SC,lx:-8,anchor:'end'},{q:13,p:7,label:'$7: 13',c:SC,lx:-8,anchor:'end'}]}),
  'Your course\'s supply schedule drawn as a curve (zoomed the same way). A higher price goes with a larger quantity supplied, so supply slopes up.'),
l6sshift: () => fig(sdg({xmax:240, ymax:160, xlab:'Tables', xt:[0,100,150], yt:[0,100,150],
    lines:[oldL([0,0],[225,150],'S1'), sup([0,33.3],[175,150],'S2',{lx:4,ly:4,anchor:'start'})], hl:[{p:100,q:150,c:OLD}], dots:[{q:150,p:100,label:'',c:OLD},{q:100,p:100,label:'',c:SC}], arrows:[{a:[146,100],b:[106,100]}], labels:[[128,82,'at $100: 150 → 100',CH,'middle']]}),
  'Your course\'s wood example: wood gets more expensive, so at $100 a table firms supply 100 tables instead of 150. The whole supply curve shifts left (the line\'s exact slope is made-up).'),

/* ---------- Lesson 7 ---------- */
l7eq: () => fig(sdg({...SCHED,
    lines:[{pts:[[10,7],[12,6],[13,5]],label:'D',c:DC,lx:6,ly:4},{pts:[[10,5],[12,6],[13,7]],label:'S',c:SC,lx:6,ly:4}], hl:[{p:6,q:12,c:OLD}], vls:[{q:12,p:6}], dots:[{q:12,p:6,label:'E ($6, 12)',lx:-10,anchor:'end'}]}),
  'Your course\'s two schedules from video 2.1a on one graph (zoomed). Demand and supply cross at $6 and 12 units, the only price where buyers want exactly what sellers offer.'),
l7gaps: () => figs([
  ['Price $4: surplus', sdg({...OR, lines:[dem([0,6],[60,0]), sup([0,0],[60,6])], hl:[{p:4,c:CH}], spans:[{p:4,q1:20,q2:40,label:'surplus 20',c:'var(--bad)'}], dots:[{q:30,p:3,label:'E',ly:16}]})],
  ['Price $2: shortage', sdg({...OR, lines:[dem([0,6],[60,0]), sup([0,0],[60,6])], hl:[{p:2,c:CH}], spans:[{p:2,q1:20,q2:40,label:'shortage 20',c:'var(--bad)',ly:16}], dots:[{q:30,p:3,label:'E'}]})]],
  'Your course\'s orange schedule. At $4, sellers offer 40 but buyers want 20, so 20 go unsold and sellers cut the price. At $2, buyers want 40 but sellers offer 20, so buyers bid the price up. Both gaps close at $3.'),
l7four: () => figs([
  ['Demand increases: P up, Q up', sdg({...OR, lines:[oldL([0,6],[60,0],''), dem([0,8],[60,2],'D2'), sup([0,0],[60,6])], dots:[{q:30,p:3,label:'',c:OLD},{q:40,p:4,label:'($4, 40)'}], arrows:[{a:[12,5],b:[28,5]}]})],
  ['Demand decreases: P down, Q down', sdg({...OR, lines:[oldL([0,6],[60,0],''), dem([0,4],[40,0],'D2'), sup([0,0],[60,6])], dots:[{q:30,p:3,label:'',c:OLD},{q:20,p:2,label:'($2, 20)',lx:-8,ly:14,anchor:'end'}], arrows:[{a:[48,1],b:[32,1]}]})],
  ['Supply increases: P down, Q up', sdg({...OR, lines:[oldL([0,0],[60,6],''), sup([20,0],[60,4],'S2'), dem([0,6],[60,0])], dots:[{q:30,p:3,label:'',c:OLD},{q:40,p:2,label:'($2, 40)',ly:16}], arrows:[{a:[12,1],b:[28,1]}]})],
  ['Supply decreases: P up, Q down', sdg({...OR, lines:[oldL([0,0],[60,6],''), sup([0,2],[50,7],'S2'), dem([0,6],[60,0])], dots:[{q:30,p:3,label:'',c:OLD},{q:20,p:4,label:'($4, 20)',lx:-8,anchor:'end'}], arrows:[{a:[48,5],b:[32,5]}]})]],
  'The four single shifts, using your course\'s orange curves and a shift of 20 oranges at every price (made-up size). The dashed line is the curve before the change, the grey dot the old equilibrium ($3, 30), and the arrow the direction of the shift.'),
l7frost: () => fig(sdg({...OR, lines:[oldL([0,0],[60,6],'S1'), sup([0,2],[50,7],'S2',{lx:4,ly:4,anchor:'start'}), dem([0,6],[60,0])], dots:[{q:30,p:3,label:'A'},{q:20,p:4,label:'B'}], arrows:[{a:[28.6,3.2],b:[21.6,3.9],c:DC}], labels:[[8,3.4,'along D',DC]]}),
  'The frost in your course\'s example. Only supply shifts (S1 to S2). The demand curve doesn\'t move; the market slides up along it from A to B: a higher price and a smaller quantity demanded.'),
l7both: () => fig(sdg({...OR, lines:[oldL([0,0],[60,6],''), oldL([0,6],[60,0],''), sup([0,2],[50,7],'S2',{lx:4,ly:4,anchor:'start'}), dem([0,4],[40,0],'D2')], dots:[{q:30,p:3,label:'A',ly:16},{q:10,p:3,label:'C',ly:16}], hl:[{p:3,c:OLD}]}),
  'Your course\'s double shift: frost (supply decreases) and cheaper apples (demand for oranges decreases). Both push quantity down, to 10. They push the price in opposite directions; with these equal-sized shifts it ends where it started, $3. With different sizes it could end higher or lower.'),

/* ---------- Lesson 8 ---------- */
l8binding: () => figs([
  ['Binding ceiling ($2, below E)', sdg({...OR, lines:[dem([0,6],[60,0]), sup([0,0],[60,6])], hl:[{p:2,c:'var(--bad)',label:'ceiling'}], spans:[{p:2,q1:20,q2:40,label:'shortage',c:'var(--bad)',ly:16}], dots:[{q:30,p:3,label:'E'}]})],
  ['Non-binding ceiling ($4, above E)', sdg({...OR, lines:[dem([0,6],[60,0]), sup([0,0],[60,6])], hl:[{p:4,c:OLD,label:'ceiling'}], dots:[{q:30,p:3,label:'E: market stays here',ly:18}]})]],
  'Lesson 7\'s orange market. A ceiling only matters if it is below the equilibrium price; then buyers want 40 and sellers offer 20. A ceiling above $3 changes nothing, because the market price is already lower. Floors work the other way round: they bind only above equilibrium.'),
l8wage: () => fig(sdg({xmax:2000, ymin:4, ymax:16, xlab:'Workers', ylab:'Wage ($/hour)', xt:[0,700,1200,1600], yt:[10,12],
    lines:[dem([0,14.8],[2000,6.8],'D (employers)',{lx:-4,ly:16,anchor:'end'}), sup([0,4],[2000,14],'S (workers)',{lx:-4,ly:-8,anchor:'end'})], hl:[{p:12,c:'var(--bad)'}], spans:[{p:12,q1:700,q2:1600,label:'surplus: 900 workers',c:'var(--bad)',ly:-8}], dots:[{q:1200,p:10,label:'E',ly:18}], vls:[{q:700,p:12},{q:1600,p:12}], labels:[[60,12.6,'floor $12','var(--bad)','start']]}),
  'Your course textbook\'s living wage: equilibrium $10 and 1,200 workers. At a $12 floor, 1,600 want the jobs but the city hires 700. Straight lines drawn through the textbook\'s points; their exact slopes are made-up.'),
l8rent: () => fig(sdg({xmin:10, xmax:22, ymin:300, ymax:800, xlab:'Apartments (thousands)', ylab:'Rent ($)', xt:[15,17,19], yt:[500,600],
    lines:[oldL([9,800],[24,50],''), dem([13,800],[24,250],'D (new)',{lx:-4,ly:-10,anchor:'end'}), sup([5,0],[21,800],'S',{lx:4,ly:12,anchor:'start'})], hl:[{p:500,c:'var(--bad)',label:'rent cap'}], spans:[{p:500,q1:15,q2:19,label:'shortage 4,000',c:'var(--bad)',ly:18}], dots:[{q:17,p:600,label:'$600, 17,000',lx:10,ly:-6}]}),
  'Your course textbook\'s rent control. Demand rises (dashed to solid). The market would move to $600 and 17,000 apartments, but the cap holds rent at $500: renters want 19,000, landlords offer 15,000. Lines drawn through the textbook\'s points; axes zoomed.'),
l8quota: () => fig(sdg({...OR, lines:[dem([0,6],[60,0]), sup([0,0],[60,6]), {a:[20,0],b:[20,6.8],c:'var(--bad)',dash:'6 4',w:2.2,label:'quota 20',lx:4,ly:12}], dots:[{q:20,p:4,label:'buyers pay $4'},{q:20,p:2,label:'20th unit costs $2',c:SC,ly:18},{q:30,p:3,label:'E',c:OLD}], spans:[{q:16,p1:2,p2:4,label:'gap',c:CH,lx:-6,ly:4,anchor:'end'}]}),
  'Lesson 7\'s orange market with a quota of 20. Only 20 can be sold, so buyers bid the price up the demand curve to $4, although the 20th orange costs sellers only $2. Lesson 12 shows the surplus lost in that gap.'),

/* ---------- Lesson 9 ---------- */
l9steepflat: () => figs([
  ['Steep (inelastic here)', sdg({xmax:80, ymax:8, xt:[0,50], yt:[0,4,5], lines:[dem([30,8],[70,0])], hl:[{p:5,q:45,c:OLD},{p:4,q:50,c:OLD}], spans:[{p:1,q1:45,q2:50,label:'−5',c:CH}], dots:[{q:50,p:4,label:''},{q:45,p:5,label:''}]})],
  ['Flat (elastic here)', sdg({xmax:80, ymax:8, xt:[0,25,50], yt:[0,4,5], lines:[dem([0,6],[80,2.8])], hl:[{p:5,q:25,c:OLD},{p:4,q:50,c:OLD}], spans:[{p:1,q1:25,q2:50,label:'−25',c:CH}], dots:[{q:50,p:4,label:''},{q:25,p:5,label:''}]})]],
  'The same $4 to $5 price rise on two made-up demand curves through the same starting point. On the steep one, quantity drops by 5 (inelastic); on the flat one, by 25 (elastic). This comparison works because both start at the same point and use the same scale; elasticity is not the same as slope.'),
l9five: () => { const g = o => sdg(Object.assign({xmax:10, ymax:10, xt:[], yt:[]}, o));
  return figs([
    ['Perfectly inelastic (0)', g({lines:[dem([5,0.5],[5,9.5])]})],
    ['Inelastic (below 1)', g({lines:[dem([3,9.5],[6.5,0.5])]})],
    ['Unit elastic (1)', g({lines:[{pts:Array.from({length:19},(_,i)=>{ const p=9.5-i*0.5; return [9/p, p]; }).filter(([q])=>q<=10),label:'D',c:DC}]})],
    ['Elastic (above 1)', g({lines:[dem([0.5,6.5],[9.5,3.5])]})],
    ['Perfectly elastic (infinite)', g({lines:[dem([0.5,5],[9.5,5])]})]],
  'The range of demand elasticities, from vertical (quantity never responds) to horizontal (any price rise drops quantity to zero). The unit elastic curve bends so that price × quantity is the same at every point. Shapes are illustrations, not data.'); },
l9table52: () => fig(hbars([['Housing',0.12],['Rail transit (rush hour)',0.15],['Electricity',0.20],['Gasoline',0.35],['Beer',0.80],['Rail transit (off-peak)',1.00],['Computers',1.44],['Restaurant meals',2.27]],{max:2.5, ref:1, refLabel:'1 = unit elastic', fmt:v=>v.toFixed(2)}),
  'Selected estimates from your course textbook\'s Table 5.2 (absolute values). Necessities like housing and electricity sit far left of 1; restaurant meals, with many alternatives, sit far right.'),
l9revenue: () => fig(hbars([['Salmon before ($11.00 × 40)',440,'var(--accent-soft)'],['Salmon after ($12.10 × 25)',302.5,'var(--bad-soft)'],['Bread before ($3.00 × 100)',300,'var(--accent-soft)'],['Bread after ($3.30 × 98)',323.4,'var(--ok-soft)']],{max:500, left:205, fmt:v=>'$'+v.toFixed(2)}),
  'Your course\'s two price rises of about 10%, in dollars of total revenue. Salmon (elastic) loses revenue; bread (inelastic) gains it.'),
l9pes: () => fig(sdg({xmax:80, ymax:10, xt:[0,40,53], yt:[0,4,5.6], lines:[oldL([0,8],[80,0],'D1'), dem([20,8],[80,2],'D2'), {a:[34,1.6],b:[46,6.4],label:'S short run',c:SC,lx:4,ly:-2}, {a:[80,6],b:[0,2],label:'S long run',c:SC,dash:'2 3',lx:4,ly:-8,anchor:'start'}], dots:[{q:40,p:4,label:'E',lx:-8,ly:14,anchor:'end'},{q:44,p:5.6,label:'B',lx:-8,anchor:'end'},{q:53.3,p:4.67,label:'C',c:SC,ly:16}]}),
  'Made-up curves. Demand rises from D1 to D2. In the short run supply is steep (sellers can\'t expand quickly), so the market moves from E to B: the price jumps and quantity barely moves. In the long run supply is flatter, so it moves to C instead: more is produced and the price rises less.'),

/* ---------- Lesson 10 ---------- */
l10incshift: () => figs([
  ['Normal good: demand rises', sdg({xmax:10, ymax:10, xt:[], yt:[], lines:[oldL([1,7],[7,1],'D1'), dem([3,9],[9,3],'D2')], arrows:[{a:[4.2,4],b:[7.6,4]}]})],
  ['Inferior good: demand falls', sdg({xmax:10, ymax:10, xt:[], yt:[], lines:[oldL([3,9],[9,3],'D1'), dem([1,7],[7,1],'D2')], arrows:[{a:[7.8,4],b:[4.4,4]}]})]],
  'The same rise in income shifts demand in opposite directions. Positive income elasticity: right. Negative: left. Made-up curves.'),
l10incline: () => fig(numline({min:-2, max:6, regions:[[-2,0,'inferior','var(--bad-soft)'],[0,1,'necessity','var(--ok-soft)'],[1,6,'normal, income elastic (luxury-like)','var(--accent-soft)']], points:[[5.43,'Magic Hat 5.43']]}),
  'Reading an income elasticity. The sign decides normal (positive) or inferior (negative); between 0 and 1, purchases grow more slowly than income; above 1, faster. Your course\'s Magic Hat example lands far to the right.'),
l10crossline: () => fig(numline({min:-2, max:2, ticks:[0], regions:[[-2,-0.1,'complements','var(--bad-soft)'],[-0.1,0.1,'','var(--surface-2)'],[0.1,2,'substitutes','var(--accent-soft)']], points:[[-0.64,'pretzels and beer −0.64']]}),
  'Reading a cross-price elasticity. Negative: complements (used together). Near zero: unrelated. Positive: substitutes. Your course\'s pretzels and beer come out at −0.64.'),

/* ---------- Lesson 11 ---------- */
l11water: () => { const g = (p, cs) => sdg({xmax:2.6, ymax:6, xlab:'Buyers', ylab:'Dollars', xt:[], yt:[0,2,5],
    areas:[{pts:[[0.25,0],[0.25,5],[1.05,5],[1.05,0]],c:'var(--surface-2)',stroke:'var(--line)'},{pts:[[1.45,0],[1.45,2],[2.25,2],[2.25,0]],c:'var(--surface-2)',stroke:'var(--line)'}, ...cs],
    hl:[{p,c:CH,label:'price '+money(p)}], labels:[[0.65,0.4,'$5 fan','var(--muted)'],[1.85,0.4,'$2 fan','var(--muted)']]});
  return figs([
    ['Price $2.50', g(2.5,[{pts:[[0.25,2.5],[0.25,5],[1.05,5],[1.05,2.5]],...CSF,label:[0.65,3.6,'$2.50']}])],
    ['Price $1.50', g(1.5,[{pts:[[0.25,1.5],[0.25,5],[1.05,5],[1.05,1.5]],...CSF,label:[0.65,3.1,'$3.50']},{pts:[[1.45,1.5],[1.45,2],[2.25,2],[2.25,1.5]],...CSF,label:[1.85,2.6,'$0.50']}])]],
  'Your course\'s two concert-goers. Each bar is a buyer\'s willingness to pay; the shaded part above the price is consumer surplus. When the price falls, the $5 fan gains $1 and the $2 fan starts buying.'); },
l11triangle: () => fig(sdg({xmax:100, ymax:10, xt:[0,40,100], yt:[0,6,10], lines:[dem([0,10],[100,0])],
    areas:[{pts:[[0,10],[0,6],[40,6]],...CSF,label:[12,7.2,'CS $80']},{pts:[[0,6],[40,6],[40,0],[0,0]],c:'var(--surface-2)',label:[20,3,'spending $240']}], dots:[{q:40,p:6,label:''}]}),
  'The math refresher\'s made-up numbers. Consumer surplus is the triangle between the demand curve and the price: ½ × 40 × ($10 − $6) = $80. The rectangle below the price is what buyers spend, $6 × 40 = $240.'),
l11vendors: () => { const g = (p, ps, extra=[]) => sdg({xmax:4, ymax:4.6, xlab:'Vendors (lowest cost first)', ylab:'Dollars', xt:[], yt:[0,2,3],
    areas:[[0.2,2,'C'],[1.2,2.75,'B'],[2.2,3,'A']].map(([x,c,n])=>({pts:[[x,0],[x,c],[x+0.8,c],[x+0.8,0]],c:'var(--surface-2)',stroke:'var(--line)',label:[x+0.4,0.4,n]})).concat(ps),
    hl:[{p,c:CH,label:'price '+money(p)}], labels:extra});
  return figs([
    ['Price $2.25: only C sells', g(2.25,[{pts:[[0.2,2],[0.2,2.25],[1,2.25],[1,2]],...PSF}],[[0.6,2.55,'$0.25',SC]])],
    ['Price $3.50: all three sell', g(3.5,[[0.2,2],[1.2,2.75],[2.2,3]].map(([x,c])=>({pts:[[x,c],[x,3.5],[x+0.8,3.5],[x+0.8,c]],...PSF})),[[0.6,4.15,'$1.50',SC],[1.6,4.15,'$0.75',SC],[2.6,4.15,'$0.50',SC]])]],
  'Your course\'s three water vendors, cheapest first. Each bar is the lowest price that vendor will accept; the shaded part up to the market price is producer surplus: $0.25 in total at $2.25, and $2.75 at $3.50.'); },
l11efficient: () => fig(sdg({xmax:10, ymax:10, xt:[0,5,10], yt:[0,5,10], lines:[dem([0,10],[10,0]), sup([0,0],[10,10])],
    areas:[{pts:[[0,10],[5,5],[0,0]],c:'var(--ok-soft)',label:[1.8,5,'value > cost']},{pts:[[5,5],[10,10],[10,0]],c:'var(--bad-soft)',label:[8.3,5,'cost > value']}], dots:[{q:5,p:5,label:'E'}], vls:[{q:5,p:5}]}),
  'Why equilibrium is efficient (made-up curves). Left of E, each unit is worth more to a buyer (demand) than it costs a seller (supply), so trading it adds surplus. Right of E, each extra unit would cost more than it is worth. Stopping exactly at E collects every gain and no loss.'),

/* ---------- Lesson 12 ---------- */
l12wedge: () => fig(sdg({...SOCK, yt:[4.5,5,5.5],
    lines:[sockD(), sockS()], hl:[{p:5.5,q:200,c:OLD},{p:4.5,q:200,c:OLD}], vls:[{q:200,p:5.5}], spans:[{q:170,p1:4.5,p2:5.5,label:'$1 tax',c:CH,lx:-8,ly:4,anchor:'end'}], dots:[{q:300,p:5,label:'E',ly:-10},{q:200,p:5.5,label:'buyers pay $5.50',lx:6,ly:-10},{q:200,p:4.5,label:'sellers keep $4.50',c:SC,lx:6,ly:18}]}),
  'Your course\'s sock tax (axes zoomed to $3 to $7). The $1 tax opens a wedge: at 200 pairs, buyers pay $5.50 and sellers keep $4.50. The wedge only fits between the curves at a smaller quantity, so sales fall from 300 to 200. Straight lines through the course\'s numbers; slopes made-up.'),
l12revenue: () => fig(sdg({...SOCK, yt:[4.5,5.5],
    lines:[sockD(), sockS()], areas:[{pts:[[0,5.5],[200,5.5],[200,4.5],[0,4.5]],...REVF,label:[100,4.9,'revenue $200']}], dots:[{q:300,p:5,label:'E',ly:-10}]}),
  'Tax revenue is the rectangle between the two prices, out to the quantity sold with the tax: $1 × 200 = $200.'),
l12areas: () => fig(sdg({...SOCK, yt:[3.5,4.5,5.5,6.5],
    lines:[sockD(), sockS()],
    areas:[{pts:[[0,6.5],[0,5.5],[200,5.5]],...CSF,label:[60,5.8,'CS $100']},{pts:[[0,5.5],[200,5.5],[200,4.5],[0,4.5]],...REVF,label:[100,4.9,'revenue $200']},{pts:[[0,4.5],[200,4.5],[0,3.5]],...PSF,label:[60,4.1,'PS $100']},{pts:[[200,5.5],[300,5],[200,4.5]],...DWLF}],
    arrows:[{a:[360,6.1],b:[262,5.15],c:'var(--bad)'}], labels:[[365,6.3,'DWL $50','var(--bad)','start']]}),
  'After the tax, using the table\'s numbers. Before the tax, consumer and producer surplus were $225 each ($450). After it: $100 + $100 + $200 of revenue = $400. The missing $50, the red triangle, is deadweight loss: the 100 pairs no longer traded.'),
l12controls: () => { const g = (p, cs, ps, lab) => sdg({xmax:10, ymax:10, xt:[0,4,5], yt:[0,p,10], lines:[dem([0,10],[10,0]), sup([0,0],[10,10])],
    hl:[{p,c:'var(--bad)',label:lab}], areas:[cs, ps, {pts:[[4,6],[5,5],[4,4]],...DWLF}], labels:[[6.8,4.3,'DWL $1','var(--bad)']], dots:[{q:5,p:5,label:'',c:OLD}]});
  return figs([
    ['Ceiling at $4', g(4, {pts:[[0,10],[0,4],[4,4],[4,6]],...CSF,label:[1.6,6.4,'CS $16']}, {pts:[[0,4],[4,4],[0,0]],...PSF,label:[1.1,2.8,'PS $8']}, 'ceiling')],
    ['Floor at $6', g(6, {pts:[[0,10],[0,6],[4,6]],...CSF,label:[1.2,7.2,'CS $8']}, {pts:[[0,6],[4,6],[4,4],[0,0]],...PSF,label:[1.7,3.6,'PS $16']}, 'floor')]],
  'Made-up market (demand P = 10 − Q, supply P = Q) with equilibrium $5 and 5 units, where consumer and producer surplus are $12.50 each. A ceiling hands buyers more surplus and a floor hands sellers more, but either way only 4 units trade and total surplus falls from $25 to $24.'); },
l12incidence: () => figs([
  ['Steep demand: buyers bear more', sdg({xmax:600, ymin:4, ymax:6.5, xt:[0,300], yt:[4.8,5,5.8], lines:[dem([50,10],[550,0]), sup([0,3.5],[600,6.5])], hl:[{p:5,c:OLD}], vls:[{q:260,p:5.8}], spans:[{q:235,p1:5,p2:5.8,label:'buyers $0.80',c:DC,lx:-6,ly:4,anchor:'end'},{q:235,p1:4.8,p2:5,label:'sellers $0.20',c:SC,lx:-6,ly:12,anchor:'end'}]})],
  ['Steep supply: sellers bear more', sdg({xmax:600, ymin:4, ymax:6.5, xt:[0,300], yt:[4.2,5,5.2], lines:[dem([0,6.5],[600,3.5]), sup([50,0],[600,11])], hl:[{p:5,c:OLD}], vls:[{q:260,p:5.2}], spans:[{q:235,p1:5,p2:5.2,label:'buyers $0.20',c:DC,lx:-6,ly:-6,anchor:'end'},{q:235,p1:4.2,p2:5,label:'sellers $0.80',c:SC,lx:-6,ly:4,anchor:'end'}]})]],
  'The same $1 tax in the tax lab\'s two made-up cases, both starting at $5 (dashed line), with axes zoomed to $4 to $6.50. The steeper (more inelastic) side ends up 80 cents away from $5; the flatter side, 20 cents. Read any tax graph this way: measure each side\'s distance from the old price.')
};
