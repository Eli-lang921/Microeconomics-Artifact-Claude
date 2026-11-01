/* ===== Lesson 26 figures ===== */
/* Made-up monopoly used in Lesson 26: demand P = 12 − Q, MR = 12 − 2Q, constant MC = ATC = $4 (no fixed cost). Checked by script:
   monopoly Q 4, P 8, profit (8 − 4) × 4 = 16, consumer surplus ½ × 4 × 4 = 8; efficient (D = MC) Q 8, P 4, consumer surplus ½ × 8 × 8 = 32;
   deadweight loss ½ × (8 − 4) × (8 − 4) = 8. Perfect price discrimination: Q 8, consumer surplus 0, profit 32, deadweight loss 0.
   General MC c: Qm = (12 − c)/2, Pm = (12 + c)/2, CS = DWL = (12 − c)²/8, profit = (12 − c)²/4. */
const DW = c => { const qm=(12-c)/2, pm=(12+c)/2, qe=12-c; return { qm, pm, qe, cs:qm*qm/2, profit:(pm-c)*qm, dwl:(qe-qm)*(pm-c)/2, ppd:qe*qe/2 }; };
function stackbars(rows, { max, w=360, left=96, aria='Stacked bars' }={}){
  const rh=34, top=6, right=w-26, X=v=>left+(right-left)*v/max, H=top+rows.length*rh+30;
  let s=`<svg class="u2bars" style="max-width:460px" viewBox="0 0 ${w} ${H}" role="img" aria-label="${esc(aria)}">`;
  rows.forEach((r,i)=>{ const y=top+i*rh; let x0=0;
    s+=`<text x="${left-6}" y="${y+19}" text-anchor="end" class="lbl-ink" style="font-weight:600">${r.label}</text>`;
    r.parts.forEach(p=>{ if(!p.v) return; s+=`<rect x="${X(x0).toFixed(1)}" y="${y+4}" width="${(X(x0+p.v)-X(x0)).toFixed(1)}" height="${rh-10}" fill="${p.c}" opacity=".85"/>`;
      s+=`<text x="${((X(x0)+X(x0+p.v))/2).toFixed(1)}" y="${y+20}" text-anchor="middle" class="lbl-ink" style="font-size:11px;font-weight:600">${p.t}</text>`; x0+=p.v; }); });
  s+=`<line x1="${left}" x2="${right}" y1="${top+rows.length*rh}" y2="${top+rows.length*rh}" class="ax"/>`;
  [0,max/2,max].forEach(v=>{ s+=`<text x="${X(v).toFixed(1)}" y="${top+rows.length*rh+14}" text-anchor="middle" class="lbl">$${v.toLocaleString('en-US')}</text>`; });
  return s+'</svg>';
}

/* L26 V1: monopoly outcome against the socially efficient outcome (course slides 221-222; made-up numbers) */
FIG5.l26dwl = () => fig(sdg({ xmax:12, ymax:12, xt:[0,4,8,12], yt:[0,4,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:'Monopoly at 4 units and 8 dollars; efficient point at 8 units and 4 dollars; deadweight loss triangle between them',
  areas:[{pts:[[4,8],[4,4],[8,4]], c:'var(--bad)', o:0.35, label:[5.3,5.3,'DWL']}],
  lines:[ dem([0,12],[12,0]), {a:[0,12],b:[6,0],label:'MR',c:'var(--g2)',lx:6,ly:-2}, {pts:[[0,4],[12,4]], c:'var(--accent)'} ],
  labels:[[0.3,3.2,'MC = ATC','var(--accent)','start']],
  vls:[{q:4,p:8},{q:8,p:4}], hl:[{p:8,q:4,c:'var(--muted)'}],
  dots:[{q:4,p:8,label:'M: monopoly',c:'var(--ink)',lx:8,ly:-8},{q:8,p:4,label:'E: efficient',c:'var(--accent)',lx:8,ly:-10},{q:4,p:4,label:'',c:'var(--g2)'}] }),
  'Made-up numbers drawn the way your course draws it (slide 222). The monopoly produces where MR = MC (4 units) and charges $8 from demand (M). The socially efficient point is where demand meets MC (E): 8 units at $4. The shaded triangle is the deadweight loss: units 5 to 8 are worth more to buyers than the $4 they cost, but are never made. Its area is ½ × (8 − 4) × ($8 − $4) = $8.');

/* L26 V2: where the surplus goes (made-up numbers above) */
FIG5.l26split = () => fig(stackbars([
  {label:'Monopoly', parts:[{v:8,c:'var(--g1)',t:'CS $8'},{v:16,c:'var(--accent)',t:'profit $16'},{v:8,c:'var(--bad)',t:'lost $8'}]},
  {label:'P = MC', parts:[{v:32,c:'var(--g1)',t:'consumer surplus $32'}]},
  {label:'Perfect PD', parts:[{v:32,c:'var(--accent)',t:'profit $32'}]}
], { max:32, aria:'Consumer surplus, profit and deadweight loss under monopoly, under P = MC, and under perfect price discrimination' }),
  'The same made-up market. With P = MC, total surplus is $32, all of it consumer surplus. A single-price monopoly turns $16 of that into profit, leaves buyers $8 and destroys $8 (the deadweight loss). A perfectly price-discriminating monopoly (later in this lesson) sells all 8 units and keeps the whole $32 as profit: no deadweight loss, but no consumer surplus.');

/* L26 V3: three conditions for price discrimination (tutor2u; Kling; CBAP) */
FIG5.l26cond = () => fig(flow([
  {split:[
    [{t:'<b>1. Market power</b>',c:'u3amb'}, 'The firm sets its own price. A price taker can\'t charge anyone more than the market price.'],
    [{t:'<b>2. Sort the buyers</b>',c:'u3amb'}, 'It can tell groups apart by how much they will pay (age, student ID, when they book).'],
    [{t:'<b>3. Stop resale</b>',c:'u3amb'}, 'Low-price buyers can\'t resell to high-price buyers.'] ]},
  {t:'Then it can charge <b>higher prices to less price-sensitive buyers</b> and lower prices to more price-sensitive ones.',c:'u3end'}
]), 'The conditions as tutor2u lists them: "The firm must have some control over the price of its product"; "Consumers must have different price sensitivities (elasticities of demand)"; "The firm must be able to prevent or limit the resale of the product." Econlib\'s Kling: price discrimination is "the attempt to charge higher prices to customers willing to pay them."');

/* L26 V4: a movie theater with one price or two (made-up numbers; MC $2 a ticket) */
const MT = { p:[6,8,10,12], adult:[130,120,110,100], student:[100,60,30,10], c:2 };
FIG5.l26theater = () => figs([
  ['One price for everyone', atable(['Price','Tickets','Earnings'], MT.p.map((p,i)=>[usd(p), MT.adult[i]+MT.student[i], usd((p-MT.c)*(MT.adult[i]+MT.student[i]))]), { hl:{2:{row:'u3z2'}}, cls:'compact' })],
  ['Two prices', atable(['Price','Adults','Students'], MT.p.map((p,i)=>[usd(p), `${MT.adult[i]} → ${usd((p-MT.c)*MT.adult[i])}`, `${MT.student[i]} → ${usd((p-MT.c)*MT.student[i])}`]), { hl:{3:{1:'u3hi'},0:{2:'u3hi'}}, cls:'compact' })]
], 'Made-up numbers. Each ticket costs the theater $2 (MC); "earnings" are (price − $2) × tickets. With one price, the best is $10: 140 tickets and $1,120. If it can check student IDs, it charges adults $12 (100 tickets, $1,000) and students $6 (100 tickets, $400): $1,400 in all, and 200 tickets instead of 140. Students are far more price-sensitive, so they get the lower price.');

/* L26 V5: natural monopoly and four regulatory choices (textbook §11.3, Figure 11.3, Table 11.3) */
FIG5.l26nat = () => fig(sdg({ xmax:9.6, ymax:15, xt:[0,2,4,6,8], yt:[0,3.5,6.5,9.3,12], xlab:'Quantity', ylab:'Price and cost', aria:'Natural monopoly with falling average cost; points A, B, C and F',
  lines:[ {pts:NM_Q.map((q,i)=>[q,NM_P[i]]), c:'var(--ink)'}, {pts:NM_Q.map((q,i)=>[q,NM_AC[i]]), c:'var(--muted)', label:'AC', lx:6, ly:-4, w:2},
    {pts:NM_Q.slice(1).map((q,i)=>[q,NM_MC[i+1]]), c:'var(--accent)', label:'MC', lx:6, ly:6, w:2}, {pts:NM_Q.slice(0,6).map((q,i)=>[q,NM_MR[i]]), c:'var(--g2)', label:'MR', lx:4, ly:12} ], labels:[[2.9,12.4,'D','var(--ink)','start']],
  dots:[{q:4,p:9.3,label:'A',c:'var(--ink)',lx:8,ly:-6},{q:2,p:9.75,label:'B',c:'var(--muted)',lx:-6,ly:16,anchor:'end'},{q:8,p:3.5,label:'C',c:'var(--accent)',lx:-4,ly:18},{q:6,p:6.5,label:'F',c:'var(--ink)',lx:8,ly:-8}], vls:[{q:4,p:9.3},{q:6,p:6.5},{q:8,p:3.5}] }),
  'Your course textbook\'s natural monopoly (Table 11.3). Average cost falls across the whole market. A: left alone, MR = MC at 4 and the price is $9.30 (AC $7.75: a profit). B: split in half, each firm makes 2 at an AC of $9.75, so costs rise. C: P = MC at 8 and $3.50, efficient, but AC is $5.70, so the firm loses money. F: P = AC at 6 and $6.50: a normal profit, more output than A.');

/* L26 V6: the course's four ways to deal with monopoly (slide 223) */
FIG5.l26ways = () => fig(atable(['Option','Catch'], [
  ['<b>Antitrust laws</b><br><span class="small">Block mergers and break up firms to increase competition</span>','Splitting a natural monopoly raises its costs (textbook point B)'],
  ['<b>Regulate</b><br><span class="small">Bring the price "as close to socially efficient point as possible"</span>','P = MC can mean losses; P = AC is the usual compromise'],
  ['<b>Public ownership</b><br><span class="small">The government takes over and runs the firm</span>','If it prices at MC, taxpayers must cover the loss (the textbook\'s "ongoing public subsidy" at point C)'],
  ['<b>Do nothing</b><br><span class="small">Leave the monopoly alone</span>','Your course: when the "cost to regulation > benefit of regulating"']
], { cls:'compact wrap' }),
  'Your course\'s slide 223, with catches from your course textbook (§11.3) added. The textbook says most U.S. monopolies today are regulated natural monopolies, such as water and electricity companies.');

/* L26 V7: reading surplus areas on a monopoly graph (made-up numbers above) */
FIG5.l26read = () => fig(sdg({ xmax:12, ymax:12, xt:[0,4,8,12], yt:[0,4,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:'Monopoly graph with areas W, X, Y and Z',
  areas:[{pts:[[0,8],[4,8],[0,12]], c:'var(--g1)', o:0.3, label:[1.2,9.2,'W']},{pts:[[0,4],[4,4],[4,8],[0,8]], c:'var(--accent)', o:0.3, label:[2,6,'X']},{pts:[[4,8],[4,4],[8,4]], c:'var(--bad)', o:0.3, label:[5.2,5.2,'Y']},{pts:[[0,0],[4,0],[4,4],[0,4]], c:'var(--muted)', o:0.15, label:[2,2,'Z']}],
  lines:[ dem([0,12],[12,0]), {a:[0,12],b:[6,0],label:'MR',c:'var(--g2)',lx:6,ly:-2}, {pts:[[0,4],[12,4]], c:'var(--accent)', label:'MC = ATC', lx:-4, ly:16, anchor:'end'} ], vls:[{q:4,p:8}] }),
  'Made-up numbers (the same market). W: consumer surplus, under demand and above the $8 price. X: the monopoly\'s profit, ($8 − $4) × 4. Y: deadweight loss, between demand and MC from 4 to 8 units. Z: the cost of making 4 units. With perfect price discrimination, W and Y would both become profit.');

/* ===== Lesson 26: Monopoly: Inefficiency, Price Discrimination and Natural Monopoly (Modern States video 5.3, last part; Module 5 slides 221-224) =====
   Common mistakes: M1 the only problem with monopoly is that buyers pay more · M2 the socially efficient output is where MR = MC
   M3 deadweight loss is the profit the monopoly takes from buyers · M4 price discrimination means charging more when it costs more to serve someone
   M5 perfect price discrimination creates a deadweight loss (or helps buyers) · M6 regulators should always make a natural monopoly charge P = MC */

mc('l26-socially','l26','Your course calls one point on a monopoly graph the "socially efficient outcome." Where is it?',
  [`Where the demand curve crosses marginal cost`,`Where marginal revenue equals marginal cost`,`Where marginal revenue is zero`,`At the bottom of average total cost`,`Where the demand curve meets the price axis`],0,
  `<p>Your course (slide 221): "D = MC → Socially Efficient Outcome; MR = MC → Profit Max Outcome." At D = MC the value of the last unit to buyers equals its cost: allocative efficiency from Lesson 24.</p><p>MR = MC is where the monopoly chooses to produce, which is why it falls short (M2).</p>`);
mc('l26-dwl-calc','l26','Made-up numbers. Demand is P = 12 − Q and marginal cost is a constant $4. The monopoly produces 4 units at $8; the efficient output is 8 units at $4. How large is the deadweight loss?',
  [`$8`,`$16`,`$32`,`$4`,`$24`],0,
  `<p>The deadweight loss is the triangle between demand and MC from 4 to 8 units: ½ × (8 − 4) × ($8 − $4) = <b>$8</b>.</p><p>$16 is the monopoly\'s profit, ($8 − $4) × 4: a transfer from buyers, not a loss to society (M3). $32 is total surplus at P = MC; $24 is total surplus under monopoly.</p>`);
tf('l26-tf-dwlprofit','l26','The deadweight loss of monopoly is the extra profit the monopoly takes from consumers by charging a high price.',false,
  `<p>False. The profit is a transfer: buyers lose it and the firm gains it. The deadweight loss is surplus nobody gets, from units that would be worth more than they cost but are never produced. Your course: it is "the loss to society from the fact that the monopoly is producing at a higher price and a lower quantity than is socially efficient" (M3).</p>`);
lazy('l26-gr-area','l26',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A monopoly with constant marginal cost charges $8 and sells 4 units:${sdg({ xmax:12, ymax:12, xt:[0,4,8,12], yt:[0,4,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:'Monopoly graph with areas W, X, Y and Z',
    areas:[{pts:[[0,8],[4,8],[0,12]], c:'var(--g1)', o:0.3, label:[1.2,9.2,'W']},{pts:[[0,4],[4,4],[4,8],[0,8]], c:'var(--accent)', o:0.3, label:[2,6,'X']},{pts:[[4,8],[4,4],[8,4]], c:'var(--bad)', o:0.3, label:[5.2,5.2,'Y']},{pts:[[0,0],[4,0],[4,4],[0,4]], c:'var(--muted)', o:0.15, label:[2,2,'Z']}],
    lines:[ dem([0,12],[12,0]), {a:[0,12],b:[6,0],label:'MR',c:'var(--g2)',lx:6,ly:-2}, {pts:[[0,4],[12,4]], c:'var(--accent)', label:'MC', lx:-4, ly:16, anchor:'end'} ], vls:[{q:4,p:8}] })}Which area is the deadweight loss?`,
  options:[`Y`,`X`,`W`,`Z`,`X and Y together`], answer:0,
  explain:`<p>Y lies between demand and MC for the units the monopoly doesn\'t make (4 to 8): each is worth more to some buyer than it costs. Your course: "this triangle right here ... is the deadweight loss."</p><p>X is profit (a transfer, M3), W is consumer surplus and Z is the cost of the 4 units made.</p>` }));
gen('l26-g-dwl','l26',()=>{
  const a = pick([10,12,14,16,20]), c = pick([2,4,6,8].filter(x=>x<a-2 && (a-x)%2===0));
  const qm=(a-c)/2, pm=(a+c)/2, dwl=(a-c)*(a-c)/8;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A monopoly faces demand <b>P = ${a} − Q</b> (so MR = ${a} − 2Q) and has a constant marginal cost of <b>$${c}</b>. What is the deadweight loss of monopoly?`, answer:dwl,
    explain:`<p>Monopoly: MR = MC gives ${a} − 2Q = ${c}, so Q = ${qm} and P = $${pm}. Efficient: demand = MC gives Q = ${a-c} at $${c}. Deadweight loss = ½ × (${a-c} − ${qm}) × ($${pm} − $${c}) = <b>${usd(dwl)}</b>.</p><p>The common wrong answer is the profit, ($${pm} − $${c}) × ${qm} = ${usd((pm-c)*qm)} (M3).</p>` };
});
mc('l26-pd-def','l26','Which of these is price discrimination?',
  [`A theater charges students $6 and other adults $12 for the same seat at the same show`,`A delivery company charges more to ship a package farther`,`A store raises all its prices during a busy season because its costs rise`,`A firm charges a lower price because its costs fell`,`Two stores sell the same shirt at different prices`],0,
  `<p>Price discrimination is charging different buyers different prices for the same good when the cost of serving them is the same. tutor2u: "not based on differences in production costs, but on varying willingness to pay." Your course textbook: "different customers are charged different prices for the same product."</p><p>Charging more for a longer trip reflects a higher cost (M4). Two separate stores are different sellers.</p>`);
mc('l26-pd-cond','l26','Which of the following is NOT needed for a firm to price discriminate?',
  [`The firm must be a natural monopoly`,`The firm must have some market power`,`The firm must be able to tell buyer groups apart by willingness to pay`,`The firm must be able to stop resale between groups`,`The groups must differ in how price-sensitive they are`],0,
  `<p>tutor2u lists three conditions: market power ("some control over the price"), "different price sensitivities (elasticities of demand)," and the ability to "prevent or limit the resale." Any firm with market power can do it: airlines, software makers and theaters aren\'t natural monopolies. Econlib\'s Kling notes Microsoft charges schools and home users less than businesses.</p>`);
mc('l26-theater','l26','In this lesson\'s made-up theater, students buy 10 tickets at $12 but 100 at $6, while adults buy 100 at $12 and 130 at $6. Why does the theater give students the lower price?',
  [`Students are much more price-sensitive, so a low price brings in many more of them`,`It costs less to show a film to a student`,`Students are more willing to pay`,`The law requires a student discount`,`Adults would buy more tickets at a high price`],0,
  `<p>Cutting the price from $12 to $6 raises student tickets tenfold but adult tickets by only 30%. Charging adults $12 and students $6 earns $1,000 + $400 = $1,400, against $1,120 at the best single price ($10). The lower price goes to the more elastic group. Costs are the same for both (M4).</p>`);
mc('l26-perfect','l26','A monopoly that charges each buyer the most that buyer is willing to pay is practicing perfect price discrimination. Compared with a single-price monopoly, what happens?',
  [`Consumer surplus falls to zero, output rises to the efficient level, and there is no deadweight loss`,`Consumer surplus rises and output falls`,`Deadweight loss gets larger`,`Output stays the same and price rises`,`The firm earns zero profit`],0,
  `<p>The College Board\'s 2024 AP scoring: consumer surplus "would decrease to zero"; "a perfectly price discriminating monopolist extracts all economic surplus"; and "the lowest price a perfectly price discriminating monopolist charges is from where D=MC." Selling to every buyer who values the good above MC means the efficient quantity, so no deadweight loss. The firm keeps all of the surplus as profit (M5).</p>`);
lazy('l26-gr-nat','l26',()=>({ type:'mc', kind:'graph',
  prompt:`Your course textbook\'s natural monopoly (Table 11.3), with four possible outcomes:${FIG5.l26natBare()}A regulator wants the firm to cover its costs and earn only a normal profit. Which point should it require?`,
  options:[`F: price $6.50, where demand crosses average cost`,`C: price $3.50, where demand crosses marginal cost`,`A: price $9.30, the monopoly\'s own choice`,`B: split the firm so each half makes 2 units`,`The point where MR crosses MC, with price $5.50`], answer:0,
  explain:`<p>The textbook: "Perhaps the most plausible option for the regulator is point F; that is, to set the price where AC crosses the demand curve at an output of 6 and a price of 6.5 ... let the natural monopoly charge enough to cover its average costs and earn a normal rate of profit."</p><p>At C the price ($3.50) is below AC ($5.70), so the firm loses money (M6). A is the unregulated monopoly. B raises AC to $9.75.</p>` }));
tf('l26-tf-pmc','l26','Requiring a natural monopoly to charge a price equal to marginal cost always lets it cover its costs.',false,
  `<p>False. In a natural monopoly average cost is still falling where demand meets MC, so MC is below AC there. Your course textbook\'s example: at point C the price of $3.50 is below the average cost of $5.70, so "the firm will lose money and go out of business" unless it gets "an ongoing public subsidy" (M6).</p>`);
mc('l26-ways','l26','Which list matches your course\'s ways to deal with monopoly power?',
  [`Antitrust laws, regulation, public ownership, or doing nothing`,`Price floors, quotas, tariffs and subsidies`,`Advertising, collusion and cartels`,`Raising taxes on buyers only`,`Breaking every firm into many small firms`],0,
  `<p>Your course (slide 223): "Increase competition with Antitrust Laws; Regulate natural monopolies to bring price as close to socially efficient point as possible; Public Ownership → Government takes over; Do nothing: Cost to regulation > Benefit of regulating."</p>`);
/* L26 more */
mc('l26-vs-eff','l26','Compared with the socially efficient outcome, a single-price monopoly produces',
  [`a smaller quantity at a higher price`,`a larger quantity at a lower price`,`the same quantity at a higher price`,`a smaller quantity at the same price`,`a larger quantity at a higher price`],0,
  `<p>Your course: the monopoly is "producing at a higher price and a lower quantity than is socially efficient." Your course textbook: what economists object to is that "monopolies do not supply enough output to be allocatively efficient" (M1).</p>`);
mc('l26-cs','l26','Made-up numbers. Demand is P = 12 − Q, MC is $4, and the monopoly sells 4 units at $8. What is consumer surplus?',
  [`$8`,`$16`,`$32`,`$24`,`$4`],0,
  `<p>Consumer surplus is the triangle under demand and above the price, out to 4 units: ½ × 4 × ($12 − $8) = <b>$8</b>. At P = MC it would be ½ × 8 × ($12 − $4) = $32. $16 is the monopoly\'s profit.</p>`);
mc('l26-hicks','l26','John Hicks wrote in 1935: "The best of all monopoly profits is a quiet life." Your course textbook uses this to make which point?',
  [`A monopoly protected from competition may slack off on cutting costs, innovating and pleasing customers`,`Monopolies earn small profits`,`Monopolies prefer to stay small`,`Quiet industries are more efficient`,`Monopolies always innovate faster`],0,
  `<p>The textbook: "a monopoly that does not need to fear competition can just produce the same old products in the same old way ... while still ringing up a healthy rate of profit." Hicks "meant that monopolies may bank their profits and slack off on trying to please their customers." This is a cost beyond the deadweight loss (M1).</p>`);
mc('l26-att','l26','Your course textbook says that after AT&T\'s phone monopoly was split up in 1982,',
  [`an explosion of innovation followed: call waiting, caller ID, voice mail, mobile phones and many payment plans`,`phone prices rose sharply`,`phone service got worse`,`AT&T became a natural monopoly`,`nothing changed for customers`],0,
  `<p>The textbook: before, "you could have any color phone you wanted, as long as it was black." After the break-up, "The end of the telephone monopoly brought lower prices, a greater quantity of services, and also a wave of innovation."</p>`);
tf('l26-tf-mrmc','l26','A monopoly that produces where MR = MC is producing the socially efficient quantity.',false,
  `<p>False. MR = MC maximizes the monopoly\'s profit. The socially efficient quantity is where demand meets MC, which is a larger quantity because MR lies below demand (M2).</p>`);
mc('l26-pd-not','l26','Which is NOT an example of price discrimination?',
  [`A pizza shop charges $2 more for a pizza with extra toppings that cost $2 more`,`A software firm sells the same program more cheaply to schools than to businesses`,`An airline charges more for a seat booked the day before than for the same seat booked months ahead`,`A museum charges seniors less than other adults`,`A drug company sells the same medicine for less in poorer countries`],0,
  `<p>The extra charge just covers the extra cost, so it isn\'t price discrimination (M4). The others charge different prices for the same product based on willingness to pay. tutor2u lists student and senior discounts and advance-purchase airline fares; Econlib\'s Kling mentions software for schools and drugs for groups that can pay less.</p>`);
mc('l26-resale','l26','Made-up example. A firm sells a gadget at $50 to students and $90 to everyone else, but nothing stops students from reselling them online. What is likely to happen?',
  [`Students buy extra gadgets and resell them, so few buyers pay $90 and the scheme breaks down`,`The firm earns more than ever`,`Students stop buying`,`Prices rise for students`,`Nothing, because the products are identical`],0,
  `<p>tutor2u: the firm "must be able to prevent or limit the resale of the product among consumers at different prices." If low-price buyers can resell, the high-price buyers buy from them instead.</p>`);
mc('l26-elastic','l26','Under price discrimination, which group of buyers usually gets the lower price?',
  [`The group with the more elastic (more price-sensitive) demand`,`The group with the less elastic demand`,`The group that buys the most at any price`,`The group that costs more to serve`,`The group with higher incomes`],0,
  `<p>Price-sensitive buyers would buy much less at a high price, so the firm earns more by offering them a lower one, and charges more to buyers who will pay it anyway. Econlib\'s Kling: "the attempt to charge higher prices to customers willing to pay them."</p>`);
gen('l26-g-cs','l26',()=>{
  const a = pick([10,12,14,16,20]), c = pick([2,4,6,8].filter(x=>x<a-2 && (a-x)%2===0));
  const qm=(a-c)/2, pm=(a+c)/2, cs=qm*(a-pm)/2;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A single-price monopoly faces demand <b>P = ${a} − Q</b> (so MR = ${a} − 2Q) and has a constant marginal cost of <b>$${c}</b>. What is consumer surplus at the monopoly\'s profit-maximizing output?`, answer:cs,
    explain:`<p>MR = MC: ${a} − 2Q = ${c}, so Q = ${qm}; the price from demand is $${pm}. Consumer surplus = ½ × ${qm} × ($${a} − $${pm}) = <b>${usd(cs)}</b>.</p><p>The common wrong answer uses the triangle down to MC instead of down to the price: ½ × ${qm} × ($${a} − $${c}) = ${usd(qm*(a-c)/2)}.</p>` };
});
tf('l26-tf-ppd','l26','Perfect price discrimination creates a larger deadweight loss than a single-price monopoly.',false,
  `<p>False. A perfectly discriminating monopoly sells to every buyer willing to pay at least MC, so it produces the efficient quantity and there is no deadweight loss. Buyers are worse off, though: their consumer surplus becomes the firm\'s profit (M5).</p>`);
mc('l26-pd-output','l26',`Made-up numbers. A theater\'s tickets cost it $2 each to serve. Tickets wanted each night:${atable(['Price','$6','$8','$10','$12'],[['Adults',130,120,110,100],['Students',100,60,30,10]],{cls:'compact'})}With one price for everyone, its most profitable price is $10. With separate prices, its most profitable prices are $12 for adults and $6 for students. How does charging separate prices change the number of tickets sold?`,
  [`It rises from 140 (one price of $10) to 200 (adults at $12, students at $6)`,`It falls from 140 to 100`,`It stays at 140`,`It rises from 140 to 230`,`It falls from 200 to 140`],0,
  `<p>With one $10 price, 110 adults and 30 students buy: 140. With two prices, 100 adults (at $12) and 100 students (at $6) buy: 200. Here price discrimination brings in buyers a single high price would shut out, as perfect price discrimination does in the extreme.</p>`);
mc('l26-split','l26','In your course textbook\'s natural monopoly, one firm making 4 units has an average cost of $7.75. If regulators split it into two firms making 2 units each, their average cost is $9.75. What does this show?',
  [`Breaking up a natural monopoly raises the cost of production`,`Breaking up a natural monopoly lowers prices`,`Smaller firms are always more efficient`,`The industry is perfectly competitive`,`Average cost doesn\'t depend on output`],0,
  `<p>The textbook: "Because of the declining average cost curve ... two smaller firms will always have higher average costs of production than one larger firm for any quantity of total output." So "the economy would become less productively efficient."</p>`);
mc('l26-costplus','l26','Under cost-plus regulation, regulators set a utility\'s price to cover its average cost plus a normal profit. What problem does your course textbook point out?',
  [`The firm has little reason to keep costs down, since higher costs just raise the allowed price`,`The firm earns huge monopoly profits`,`The firm must charge P = MC and lose money`,`The price is set below average cost`,`Customers pay nothing`],0,
  `<p>The textbook: "If producers are reimbursed for their costs, plus a bit more, then at a minimum, producers have less reason to be concerned with high costs." That is why some regulators moved to price cap regulation in the 1980s and 1990s.</p>`);
mc('l26-pricecap','l26','Under price cap regulation, the regulator sets a price the utility cannot exceed for the next few years. Why might this work better than cost-plus regulation?',
  [`If the firm cuts its costs faster than the cap falls, it keeps the extra profit, so it has a reason to be efficient`,`It guarantees the firm a normal profit every year`,`It sets the price equal to marginal cost`,`It removes all risk of losses`,`It lets the firm charge whatever it wants`],0,
  `<p>The textbook: "If the firm can find ways of reducing its costs more quickly than the price caps, it can make a high level of profits. However, if the firm cannot keep up with the price caps ... it may suffer losses." The incentive is the point; a cap set "unrealistically low" won\'t work.</p>`);
mc('l26-nothing','l26','When does your course say "do nothing" may be the right policy toward a monopoly?',
  [`When the cost of regulating would be greater than the benefit to society`,`Whenever the monopoly earns a profit`,`Whenever the monopoly has a patent`,`When the monopoly charges P = MC`,`Never`],0,
  `<p>Your course: "there\'s always the option to do nothing because the cost of regulating a monopoly will be greater than any benefits to society of the regulation."</p>`);
mc('l26-nat-def','l26','Your course textbook says a natural monopoly arises when',
  [`average costs are falling over the whole range of output that satisfies market demand, usually because fixed costs are large`,`the firm owns a natural resource`,`the government grants a license`,`marginal cost is rising quickly`,`demand is perfectly elastic`],0,
  `<p>The textbook (§11.3): "A natural monopoly arises when average costs are declining over the range of production that satisfies market demand. This typically happens when fixed costs are large relative to variable costs." Water and electricity companies are its leading examples.</p>`);

/* ===== Lesson 26 quick checks ===== */
mc('l26c-eff','l26','Made-up numbers. At a monopoly\'s output, buyers value the last unit at $30 and it costs $12 to make. This shows the monopoly is',
  [`producing too little: more output would add more value than cost`,`producing too much`,`allocatively efficient`,`making a loss`,`a natural monopoly`],0,
  `<p>P &gt; MC means the next units are worth more than they cost, so society wants more. A single-price monopoly always has P &gt; MC.</p>`);
mc('l26c-dwl','l26','The deadweight loss of monopoly comes from',
  [`units that are worth more to buyers than they cost to make but are not produced`,`the monopoly\'s profit`,`the taxes the monopoly pays`,`buyers paying a high price for the units they do buy`,`the monopoly\'s fixed costs`],0,
  `<p>The units between the monopoly quantity and the efficient quantity. The higher price on units bought is a transfer to the firm (M3).</p>`);
mc('l26c-pd','l26','A cinema charges $7 to students with an ID and $13 to other adults for the same seat at the same showing. This is price discrimination because',
  [`the cost of seating each viewer is the same, but the two groups differ in how much they are willing to pay`,`students cost less to serve`,`the cinema is a natural monopoly`,`a student ticket is a different product`,`prices are set by the government`],0,
  `<p>Same seat, same showing, same cost, different prices by willingness to pay. Students tend to be more price-sensitive, and the ID check stops other adults from buying student tickets.</p>`);
mc('l26c-perfect','l26','Under perfect price discrimination, consumer surplus is',
  [`zero`,`the same as under a single price`,`larger than under perfect competition`,`half of total surplus`,`equal to the firm\'s profit under a single price`],0,
  `<p>Each buyer pays exactly the most they are willing to pay, so the firm captures all of the surplus (CBAP).</p>`);
mc('l26c-nat','l26','A regulator forces a natural monopoly to set its price equal to average cost. The firm will',
  [`earn zero economic profit (a normal profit) and produce more than it would unregulated`,`earn large profits`,`lose money and shut down`,`produce less than it would unregulated`,`produce the allocatively efficient quantity exactly`],0,
  `<p>Point F in the textbook: P = AC at 6 units and $6.50, more than the monopoly\'s 4 units at $9.30. It is not quite efficient (P &gt; MC), but the firm covers its costs.</p>`);
mc('l26c-skill','l26','On a single-price monopoly graph, the deadweight loss triangle sits',
  [`between the demand curve and MC, from the monopoly quantity to the quantity where demand meets MC`,`under MR and above MC`,`above the monopoly price under demand`,`between the price and ATC`,`below MC`],0,
  `<p>Its tip is where demand crosses MC. Above the price under demand is consumer surplus; between price and ATC is profit.</p>`);

/* Bare version of the natural monopoly graph for a question (no letters' caption) */
FIG5.l26natBare = () => sdg({ xmax:9.6, ymax:15, xt:[0,2,4,6,8], yt:[0,3.5,6.5,9.3,12], xlab:'Quantity', ylab:'Price and cost', aria:'Natural monopoly with falling average cost; points A, B, C and F',
  lines:[ {pts:NM_Q.map((q,i)=>[q,NM_P[i]]), c:'var(--ink)'}, {pts:NM_Q.map((q,i)=>[q,NM_AC[i]]), c:'var(--muted)', label:'AC', lx:6, ly:-4, w:2},
    {pts:NM_Q.slice(1).map((q,i)=>[q,NM_MC[i+1]]), c:'var(--accent)', label:'MC', lx:6, ly:6, w:2}, {pts:NM_Q.slice(0,6).map((q,i)=>[q,NM_MR[i]]), c:'var(--g2)', label:'MR', lx:4, ly:12} ], labels:[[2.9,12.4,'D','var(--ink)','start']],
  dots:[{q:4,p:9.3,label:'A',c:'var(--ink)',lx:8,ly:-6},{q:2,p:9.75,label:'B',c:'var(--muted)',lx:-6,ly:16,anchor:'end'},{q:8,p:3.5,label:'C',c:'var(--accent)',lx:-4,ly:18},{q:6,p:6.5,label:'F',c:'var(--ink)',lx:8,ly:-8}] });

/* Course materials checked 2026-10-28: video 5.3 transcript (last part: socially efficient D = MC, deadweight loss triangle, four ways to regulate), Module 5 slides 221-224;
   course textbook §9.2 (inefficiency of monopoly; Hicks; AT&T), §11.1 (Clayton Act definition of price discrimination), §11.3 (natural monopoly; Figure 11.3; Table 11.3; cost-plus and price cap).
   Cross-checks read: College Board 2024 AP FRQ 1 chief reader report (perfect price discrimination); tutor2u (definition and three conditions); Econlib, Kling 2003 (examples); Econlib, Stigler, "Monopoly" (society worse off). */
const L26TAGS = {
  'l26-socially':['MS5','mineff','terms','M2'], 'l26-dwl-calc':['MS5','mineff','data','M3'], 'l26-tf-dwlprofit':['MS5','mineff','terms','M3'],
  'l26-gr-area':['MS5 CBAP','mineff','graphs','M3'], 'l26-g-dwl':['MS5','mineff','data','M3'], 'l26-pd-def':['T2UPD OS111','pd','terms','M4'],
  'l26-pd-cond':['T2UPD ELK','pd','models',''], 'l26-theater':['T2UPD','pd','data','M4'], 'l26-perfect':['CBAP T2UPD','pd','models','M5'],
  'l26-gr-nat':['OS113','nat','graphs','M6'], 'l26-tf-pmc':['OS113','nat','terms','M6'], 'l26-ways':['MS5','nat','terms',''],
  'l26-vs-eff':['MS5 OS92','mineff','models','M1'], 'l26-cs':['MS5','mineff','data',''], 'l26-hicks':['OS92','mineff','terms','M1'],
  'l26-att':['OS92','mineff','models','M1'], 'l26-tf-mrmc':['MS5','mineff','terms','M2'], 'l26-pd-not':['T2UPD ELK','pd','models','M4'],
  'l26-resale':['T2UPD','pd','models',''], 'l26-elastic':['T2UPD ELK','pd','models',''], 'l26-g-cs':['MS5','mineff','data',''],
  'l26-tf-ppd':['CBAP','pd','terms','M5'], 'l26-pd-output':['T2UPD','pd','data',''], 'l26-split':['OS113','nat','data',''],
  'l26-costplus':['OS113','nat','terms',''], 'l26-pricecap':['OS113','nat','terms',''], 'l26-nothing':['MS5','nat','terms',''], 'l26-nat-def':['OS113 OS91','nat','terms',''],
  'l26c-eff':['MS5 OS92','mineff','models','M1'], 'l26c-dwl':['MS5','mineff','terms','M3'], 'l26c-pd':['T2UPD','pd','models','M4'],
  'l26c-perfect':['CBAP','pd','terms','M5'], 'l26c-nat':['OS113','nat','models','M6'], 'l26c-skill':['MS5 CBAP','mineff','graphs','M3']
};
u5tag(L26TAGS);

U5_CARDS.l26 = [
  ['Socially efficient outcome','Where is the socially efficient outcome on a monopoly graph?','Where demand crosses marginal cost (D = MC).','Made-up example: 8 units at $4, against the monopoly\'s 4 at $8.','MR = MC is the profit-maximizing outcome, not the efficient one.'],
  ['Why monopoly is inefficient','Why is a single-price monopoly allocatively inefficient?','It produces where P > MC, so units worth more than they cost go unmade.','Your course: "a higher price and a lower quantity than is socially efficient."','Economists object most to the lost output.'],
  ['Deadweight loss of monopoly','What is the deadweight loss of monopoly?','The surplus lost on units between the monopoly quantity and the efficient quantity: the triangle between demand and MC.','½ × (8 − 4) × ($8 − $4) = $8.','Profit is a transfer, not deadweight loss.'],
  ['A quiet life','What did Hicks mean by "The best of all monopoly profits is a quiet life"?','Protected monopolies may slack off on cost-cutting and innovation.','AT&T before 1982: "any color phone you wanted, as long as it was black."','An extra cost beyond the deadweight loss.'],
  ['Price discrimination','What is price discrimination?','Charging different buyers different prices for the same good, based on willingness to pay rather than cost.','Student and senior discounts; advance-purchase airfares.','Charging more when it costs more is not price discrimination.'],
  ['Conditions for price discrimination','What three conditions does a firm need?','Market power; buyer groups that differ in price sensitivity and can be told apart; no resale between groups.','Student ID at a theater.','Without the resale barrier, the scheme breaks down.'],
  ['Who gets the low price','Which buyers get the lower price under price discrimination?','The more price-sensitive (more elastic) group.','Theater: students at $6, adults at $12.','Profit $1,400 vs $1,120 at one price.'],
  ['Perfect price discrimination','What happens under perfect price discrimination?','Each buyer pays the most they will pay: consumer surplus is zero, output is efficient, and there is no deadweight loss.','Made-up example: profit $32, all of the surplus.','The lowest price charged is where D = MC.'],
  ['Natural monopoly','What defines a natural monopoly?','Average cost is still falling at the quantity the market demands, usually because fixed costs are large.','Water pipes, electric lines.','Splitting it raises average cost.'],
  ['Regulating at P = MC','What happens if a natural monopoly must charge P = MC?','It is efficient, but the price is below average cost, so the firm loses money without a subsidy.','Textbook point C: price $3.50, AC $5.70.','Allocative efficiency vs survival.'],
  ['Regulating at P = AC','What happens if a natural monopoly must charge P = AC?','It earns a normal profit and produces more than unregulated.','Textbook point F: 6 units at $6.50.','The most common choice in practice (cost-plus).'],
  ['Ways to deal with monopoly','What four options does your course list?','Antitrust laws, regulation, public ownership, or do nothing.','Do nothing when the cost of regulation exceeds the benefit.','Cost-plus and price cap are two ways to regulate.']
];

Object.assign(U5_WRITE, {
  'w-l26-1':{lesson:'l26',prompt:'Explain why a single-price monopoly is inefficient. Use this lesson\'s made-up market (demand P = 12 − Q, MC $4) to identify the monopoly outcome, the efficient outcome and the deadweight loss.',
    model:'A monopoly maximizes profit where marginal revenue equals marginal cost. With demand P = 12 − Q, MR is 12 − 2Q, which equals the $4 marginal cost at 4 units, and buyers will pay $8 for 4 units. The socially efficient outcome is where demand meets marginal cost, at 8 units and $4, because there the value of the last unit to buyers equals its cost. The monopoly produces 4 fewer units. Each of those units is worth more than $4 to some buyer but is never made. The lost surplus is the triangle between demand and marginal cost from 4 to 8 units: one half × 4 × $4 = $8. The monopoly\'s $16 profit is a transfer from buyers, but the $8 deadweight loss is gone for everyone.',
    checklist:['Finds the monopoly outcome from MR = MC and the price from demand (4 units, $8)','Identifies the efficient outcome where demand meets MC (8 units, $4)','Computes the deadweight loss ($8) and says what it represents','Distinguishes the profit (a transfer) from the deadweight loss']},
  'w-l26-2':{lesson:'l26',prompt:'Explain what conditions a firm needs to price discriminate, and use this lesson\'s theater example to show why it charges students less.',
    model:'A firm needs three things to price discriminate. It needs market power, so it can set its own price. It needs to be able to sort buyers into groups that differ in how much they will pay, such as checking student IDs. And it needs to stop low-price buyers from reselling to high-price buyers. In the theater example, each ticket costs $2. At one price for everyone, the best choice is $10, which sells 140 tickets and earns $1,120. But students are much more price-sensitive than adults: student sales rise from 10 to 100 as the price falls from $12 to $6, while adult sales rise only from 100 to 130. So the theater charges adults $12, earning $1,000, and students $6, earning $400. That totals $1,400, more than with one price, and sells 200 tickets instead of 140.',
    checklist:['Names market power, sorting by willingness to pay, and no resale','Computes the best single price ($10, $1,120)','Shows students are more price-sensitive and gets the two prices ($12 and $6, $1,400)','Notes the cost of serving each group is the same']}
});

U5_PLAN.l26 = {
  core:['l26-socially','l26-dwl-calc','l26-tf-dwlprofit','l26-gr-area','l26-g-dwl','l26-pd-def','l26-pd-cond','l26-theater','l26-perfect','l26-gr-nat','l26-tf-pmc','l26-ways'],
  more:['l26-vs-eff','l26-cs','l26-hicks','l26-att','l26-tf-mrmc','l26-pd-not','l26-resale','l26-elastic','l26-g-cs','l26-tf-ppd','l26-pd-output','l26-split','l26-costplus','l26-pricecap','l26-nothing','l26-nat-def']
};

U5_LESSONS.push({ id:'l26', unit:5, title:'Monopoly: Inefficiency, Price Discrimination and Natural Monopoly', mins:50, src:'Modern States video 5.3 (last part) and Module 5 slides 221-224 · Course textbook (OpenStax) §9.2, §11.3',
  sources:['MS5','OS91','OS92','OS111','OS113','CBAP','T2UPD','ELK','ELMO','CB'],
  oneline:'A single-price monopoly charges more than marginal cost and sells too little, causing a deadweight loss. Price discrimination lets it charge different buyers different prices; natural monopolies are usually regulated, and each way of regulating has a catch.',
  body:`
<p>Lesson 25 showed how a ${dt('monopoly','monopoly')} picks its price and quantity. This lesson asks what that costs everyone else, how a monopoly can charge different buyers different prices, and what governments do about monopoly.</p>

<h2>The monopoly outcome and the efficient outcome</h2>
<!-- src: MS5 (video 5.3: "because the monopoly is charging more than the point where marginal revenue is equal to marginal cost, this yields some costs to society ... total surplus is maximized ... where price is equal to the demand curve which is equal to marginal cost. The point where demand is equal to marginal cost is what we call the socially efficient outcome"; "this triangle right here ... is the deadweight loss or the loss to society from the fact that the monopoly is producing at a higher price and a lower quantity than is socially efficient"; slides 221-222); OS92 ("what economists object to is that monopolies do not supply enough output to be allocatively efficient"; "price is always greater than marginal cost at the profit-maximizing level of output"); ELMO ("customers buy less of the product, less is produced, and society as a whole is worse off"; "monopoly reduces society's income") -->
<p>Your course: "Since monopolies set prices and quantities at MR = MC and MR ≠ P, the monopoly outcome is socially inefficient." The ${dt('socially-efficient','<b>socially efficient outcome</b>')} is where demand meets marginal cost, the P = MC rule for ${dt('allocative-efficiency','allocative efficiency')} from Lesson 24. Producing less than that leaves a ${dt('deadweight-loss','deadweight loss')}: surplus no one gets (Lesson 12).</p>
<p><b>Worked example (made-up numbers).</b> Demand is P = 12 − Q, so MR = 12 − 2Q. ${dt('marginal-cost','Marginal cost')} is a constant $4 (no fixed cost).</p>
<div class="math">Monopoly: 12 − 2Q = 4 → Q = 4; price from demand = 12 − 4 = <b>$8</b><br>Efficient: 12 − Q = 4 → Q = <b>8</b>, price $4<br>Deadweight loss = ½ × (8 − 4) × ($8 − $4) = <b>$8</b></div>
${FIG5.l26dwl()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a concert hall that sets a high ticket price and plays to a hall with empty seats. Many fans would gladly have paid more than the tiny cost of letting them sit in those seats, but the hall would have had to cut the price for everyone to fill them. The empty seats are the deadweight loss: value nobody gets.</p></div>
<p><b>Why it is a loss:</b> the 5th through 8th units are each worth more than $4 to some buyer, and each costs only $4 to make. The monopoly doesn\'t make them because selling them would mean cutting its price on all the others. Your course textbook: what economists object to is not mainly the high price but that "monopolies do not supply enough output to be allocatively efficient."</p>
${FIG5.l26split()}
<p>Check: $8 + $16 + $8 = $32, the ${dt('total-surplus','total surplus')} at P = MC. The $16 profit is a transfer from buyers to the firm, taken out of ${dt('consumer-surplus','consumer surplus')}; the $8 deadweight loss goes to no one.</p>
<p>Try other cost levels below. The deadweight loss shrinks as marginal cost rises toward the top of demand, and the perfect-discrimination switch previews the next section.</p>
<div data-widget="dwl"></div>
<p>What to notice: in this market consumer surplus and deadweight loss are always the same size, and profit is twice either one. With perfect price discrimination the deadweight loss disappears, and so does consumer surplus.</p>
<p><b>A quiet life.</b> Your course textbook adds a cost that graphs don\'t show. John Hicks (1935): "The best of all monopoly profits is a quiet life." A protected monopoly can slack off. Before AT&T\'s phone monopoly was split up in 1982, "you could have any color phone you wanted, as long as it was black"; afterward came call waiting, caller ID, voice mail and mobile phones.</p>
<div data-check="l26c-eff"></div>

<h2>Price discrimination</h2>
<!-- src: T2UPD (definition "The practice of selling the same product or service at different prices to different consumers ... not based on differences in production costs, but on varying willingness to pay"; three conditions; first-, second-, third-degree; student and senior discounts, advance-purchase airline fares); ELK (Kling: "the attempt to charge higher prices to customers willing to pay them"; Microsoft charges educational institutions and home users less than business users; drug companies); OS111 (Clayton Act: "price discrimination (where different customers are charged different prices for the same product)"); CB (outline 4d). Inserted material: the Modern States videos don't teach price discrimination; it is a CLEP outline topic. Theater numbers are made up. -->
<p>So far the monopoly charged everyone the same price. ${dt('price-discrimination','<b>Price discrimination</b>')} means charging different buyers different prices for the same product. tutor2u: it is "not based on differences in production costs, but on varying willingness to pay." (Your course\'s videos skip this topic; the CLEP outline lists it, so it is added here.)</p>
${FIG5.l26cond()}
<p><b>Worked example: a movie theater (made-up numbers).</b> Every ticket costs the theater $2 (cleaning, staff). Students are far more price-sensitive than other adults.</p>
<div class="math">One price: best is $10 → 110 adults + 30 students = 140 tickets → ($10 − $2) × 140 = <b>$1,120</b><br>Two prices: adults $12 → ($12 − $2) × 100 = $1,000; students $6 → ($6 − $2) × 100 = $400 → <b>$1,400</b></div>
${FIG5.l26theater()}
<p>Check: the adult column peaks at $12 ($1,000) and the student column at $6 ($400). Price discrimination raised the theater\'s earnings by $280 and sold 60 more tickets.</p>
<p><b>The extreme case.</b> ${dt('perfect-pd','<b>Perfect price discrimination</b>')} charges every buyer the most that buyer will pay. The College Board\'s 2024 AP scoring: consumer surplus "would decrease to zero," the firm "extracts all economic surplus," and "the lowest price a perfectly price discriminating monopolist charges is from where D=MC." So the firm sells the efficient quantity, with no deadweight loss, but buyers keep nothing. In the made-up market above: 8 units, profit $32, consumer surplus $0.</p>
<div data-widget="pdsort"></div>
<p>What to notice: the test is always the same. Same product, same cost to serve, different price for different buyers.</p>
<div data-check="l26c-pd"></div>
<div data-check="l26c-perfect"></div>

<h2>Natural monopoly and regulation</h2>
<!-- src: MS5 (video 5.3 and slide 223: "Increase competition with Antitrust Laws; Regulate natural monopolies to bring price as close to socially efficient point as possible; Public Ownership → Government takes over; Do nothing: Cost to regulation > Benefit of regulating"); OS113 ("Most true monopolies today in the U.S. are regulated, natural monopolies"; "A natural monopoly arises when average costs are declining over the range of production that satisfies market demand"; Figure 11.3 and Table 11.3: A Q 4 P 9.3 AC 7.75; B each Q 2 AC 9.75; C Q 8 P 3.5 AC 5.7; F Q 6 P 6.5; cost-plus vs price cap); OS91 (natural monopoly, water pipes) -->
<p>Lesson 25 introduced the ${dt('natural-monopoly','natural monopoly')}. Your course textbook: it "arises when average costs are declining over the range of production that satisfies market demand," usually because fixed costs are large. "Most true monopolies today in the U.S. are regulated, natural monopolies."</p>
${FIG5.l26nat()}
<p><b>Worked example: the four choices</b> (your course textbook\'s Table 11.3).</p>
<div class="math">A, leave it alone: Q 4, P $9.30, AC $7.75 → profit ($9.30 − $7.75) × 4 = $6.20<br>B, split it in two: each makes 2 at AC $9.75 → higher cost than A\'s $7.75<br>C, require P = MC: Q 8, P $3.50, AC $5.70 → loss ($3.50 − $5.70) × 8 = −$17.60<br>F, require P = AC: Q 6, P $6.50 = AC → ${dt('normal-profit','normal profit')}</div>
<p><b>Why C fails and F is chosen:</b> with average cost still falling, MC is below AC, so pricing at MC can\'t cover costs without a subsidy. The textbook calls F "perhaps the most plausible option": the firm covers its costs and can keep operating, but can\'t earn monopoly profits.</p>
${FIG5.l26ways()}
<p>Regulators who aim at F usually use <b>cost-plus</b> regulation (price = average cost plus a normal profit), which gives the firm little reason to cut costs. <b>Price cap</b> regulation sets a maximum price for several years, so a firm that cuts costs faster keeps the gain.</p>
<div data-check="l26c-nat"></div>

<h2>Name the area</h2>
<!-- src: MS5 (slide 222: deadweight loss triangle); CBAP (common error: "Shading the CS below MR instead of D"; perfect price discrimination captures all surplus). Exam skill: identify consumer surplus, profit and deadweight loss on a monopoly graph. -->
<p>The CLEP often shades an area on a monopoly graph and asks what it is. Find the price line and the quantity first, then sort the pieces.</p>
${FIG5.l26read()}
<div class="math">Above the price, under demand → <b>consumer surplus</b> (W)<br>Between price and cost, out to the monopoly quantity → <b>profit</b> (X)<br>Between demand and MC, past the monopoly quantity → <b>deadweight loss</b> (Y)</div>
<p>The 2024 AP readers saw students shade consumer surplus "below MR instead of D." Consumer surplus always sits under demand.</p>
<div data-check="l26c-skill"></div>
<div data-check="l26c-dwl"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L26TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"The only problem with monopoly is that buyers pay more."</span>Economists object most to the lost output (deadweight loss), and to the "quiet life" of weak incentives to innovate.</li>
<li><span class="wrong">"The socially efficient output is where MR = MC."</span>That is the monopoly\'s choice. Efficient output is where demand crosses MC.</li>
<li><span class="wrong">"Deadweight loss is the profit the monopoly takes from buyers."</span>Profit is a transfer. Deadweight loss is surplus nobody gets.</li>
<li><span class="wrong">"Charging more when it costs more to serve someone is price discrimination."</span>Price discrimination means the same cost but different prices, based on ${dt('willingness-to-pay','willingness to pay')}.</li>
<li><span class="wrong">"Perfect price discrimination causes a bigger deadweight loss."</span>It produces the efficient quantity, so there is no deadweight loss; consumer surplus falls to zero.</li>
<li><span class="wrong">"Regulators should always make a natural monopoly charge P = MC."</span>That price is below average cost, so the firm loses money; P = AC is the usual compromise.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A single-price monopoly sets <b>P &gt; MC</b>; the <b>socially efficient</b> point is where demand meets MC.</li>
<li>The <b>deadweight loss</b> is the triangle between demand and MC from the monopoly quantity to the efficient one (made-up example: $8; profit $16 is a transfer).</li>
<li>Monopoly can also mean a <b>quiet life</b>: less innovation (AT&T before 1982).</li>
<li><b>Price discrimination</b> needs market power, buyers sorted by willingness to pay, and no resale; the more price-sensitive group gets the lower price (theater: $1,400 vs $1,120).</li>
<li><b>Perfect price discrimination</b>: consumer surplus zero, efficient output, no deadweight loss.</li>
<li><b>Natural monopolies</b> are usually regulated: P = MC means losses, so P = AC is common. Your course\'s options: antitrust, regulation, public ownership, or do nothing.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Inefficiency of monopoly," "Price discrimination" and "Natural monopoly." Expect a graph asking which area is deadweight loss, a question on what perfect price discrimination does to consumer surplus, or a regulation question about P = MC versus P = AC.</p>
</div>`,
  deeper:`
<h3>Three degrees of price discrimination</h3>
<p>tutor2u sorts price discrimination into three kinds. First degree (perfect): "The firm charges each consumer the maximum price they are willing to pay," as in auctions or one-on-one bargaining. Second degree: "Prices vary based on the quantity consumed or the version of the product," such as bulk discounts. Third degree: "Different prices are charged to different segments of the market" by age, location or occupation, such as this lesson\'s theater.</p>
<h3>Is price discrimination good or bad?</h3>
<p>It shifts surplus from buyers to the seller, which buyers dislike. But, as in the theater example, it can also bring in buyers a single high price would shut out, so total output can rise. Econlib\'s Kling calls it "a key survival strategy in markets for information goods" such as software, where the cost of one more copy is close to zero.</p>`,
  links:[ {k:'Textbook',t:'11.3 Regulating Natural Monopolies',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/11-3-regulating-natural-monopolies',w:'The four regulatory choices on one graph, plus cost-plus and price cap regulation.'},
          {k:'Article',t:'Importance of price discrimination in economics',s:'tutor2u',u:'https://www.tutor2u.net/economics/reference/importance-of-price-discrimination-in-economics',w:'A short page on the conditions and the three degrees of price discrimination.'} ]
});
