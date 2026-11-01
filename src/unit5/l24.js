/* ===== Lesson 24 figures ===== */
/* Made-up market used in Lesson 24's figures and widget: every firm has TC = 100 + 0.25q² (MC = 0.5q; ATC = 100/q + 0.25q, lowest $10 at q = 20).
   Each firm supplies q = 2P, so n firms supply Q = 2nP. Demand D1: Q = 2000 − 100P; D2: Q = 2400 − 100P.
   Profit per firm at price P = P² − 100 (zero at $10). Checked by script: n 50 + D1 → P 10, Q 1000, profit 0; n 50 + D2 → P 12, Q 1200, q 24, profit 44; n 70 + D2 → P 10, Q 1400, profit 0. */
const LR = { atc:q=>100/q+0.25*q, mc:q=>0.5*q, P:(A,n)=>A/(100+2*n) };
const lrFirmLines = () => { const qs=[]; for(let q=4;q<=40;q+=1) qs.push(q); return [ {pts:qs.filter(q=>LR.atc(q)<=24).map(q=>[q,LR.atc(q)]).reverse(), c:'var(--accent)', label:'ATC', lx:6, ly:4}, {pts:[[0,0],[40,20]], c:'var(--g2)', label:'MC', lx:-4, ly:-6, anchor:'end'} ]; };

/* L24 V1: profit and loss as rectangles (course slide 206; textbook §8.2, raspberry farm at $5 and $2.20) */
FIG5.l24rect = () => { const atcPts = RF_ATC_PTS.filter(([q])=>q>=30), mcPts = RF_MC_PTS.filter(([q,m])=>m<=7.2);
  return figs([
    ['Price $5: profit', sdg({ xmax:105, ymax:7, xt:[0,40,80], yt:[0,3.3,5,7], xlab:'Packs', ylab:'Dollars per pack', aria:'Profit rectangle between price 5 and ATC 3.30 at 80 packs',
      areas:[{pts:[[0,3.3],[80,3.3],[80,5],[0,5]], c:'var(--accent)', o:0.35, label:[58,4.15,'profit $136']}],
      lines:[ {pts:atcPts, c:'var(--muted)', label:'ATC', lx:4, ly:4, w:2}, {pts:mcPts, c:'var(--g2)', label:'MC', lx:-4, ly:4, anchor:'end', w:2}, {pts:[[0,5],[105,5]], c:'var(--accent)', label:'P = MR', lx:-4, ly:-6, anchor:'end'} ],
      vls:[{q:80,p:5}], dots:[{q:80,p:3.3,label:'',c:'var(--ink)'}] })],
    ['Price $2.20: loss', sdg({ xmax:105, ymax:7, xt:[0,50,100], yt:[0,2.2,3.32,5,7], xlab:'Packs', ylab:'Dollars per pack', aria:'Loss rectangle between ATC 3.32 and price 2.20 at 50 packs',
      areas:[{pts:[[0,2.2],[50,2.2],[50,3.32],[0,3.32]], c:'var(--bad)', o:0.3, label:[25,2.76,'loss $56']}],
      lines:[ {pts:atcPts, c:'var(--muted)', label:'ATC', lx:4, ly:4, w:2}, {pts:mcPts, c:'var(--g2)', label:'MC', lx:-4, ly:4, anchor:'end', w:2}, {pts:[[0,2.2],[105,2.2]], c:'var(--accent)', label:'P = MR', lx:-4, ly:14, anchor:'end'} ],
      vls:[{q:50,p:3.32}], dots:[{q:50,p:3.32,label:'',c:'var(--ink)'}] })]
  ], 'Your course textbook\'s raspberry farm. Each rectangle is (price − average total cost) × quantity. First panel: at $5 the farm makes 80 packs, the last 10-pack step whose marginal cost ($4 a pack) is below the price (the next step costs $6, so the drawn MC line crosses $5 between 80 and 90). ATC there is $3.30, so profit = ($5.00 − $3.30) × 80 = $136. Second panel: at $2.20 it makes 50 packs at an ATC of $3.32, so the loss = ($2.20 − $3.32) × 50 = −$56. The rectangle sits above ATC for a profit and below it for a loss.'); };

/* L24 V2: long-run equilibrium, P = MR = MC = minimum ATC (course slide 207; textbook §8.3, raspberry farm at $3.20) */
FIG5.l24lre = () => fig(cchart({ xmax:105, ymax:7, xt:[0,20,40,60,70,100], yt:[0,2,3.2,5,7], xlab:'Packs of raspberries', ylab:'Dollars per pack', aria:'Price line at 3.20 dollars touching the bottom of the ATC curve where MC crosses it',
  lines:[ {pts:RF_ATC_PTS.filter(([q])=>q>=30), c:'var(--accent)', label:'ATC', lx:4, ly:2}, {pts:RF_MC_PTS.filter(([q,m])=>m<=7.2), c:'var(--g2)', label:'MC', lx:-4, ly:4, anchor:'end'}, {pts:[[0,3.2],[105,3.2]], c:'var(--ink)', label:'P = MR = $3.20', lx:-4, ly:14, anchor:'end', w:2} ],
  dots:[{q:70,p:3.2,label:'E',c:'var(--ink)',lx:-8,ly:-10,anchor:'end'}], vls:[{q:70,p:3.2}] }),
  'Your course\'s long-run equilibrium (slide 207) drawn with the textbook farm. At $3.20 the price line just touches the bottom of ATC, where MC also crosses. The farm produces 70 packs (MR = MC), and price equals average total cost, so profit = ($3.20 − $3.20) × 70 = $0: zero economic profit, a normal profit. Point E is where MR = MC and P = ATC.');

/* L24 V3: how entry and exit push price to the bottom of ATC (course video 5.2; textbook §8.3) */
FIG5.l24flow = () => fig(flow([
  {split:[
    [{t:'<b>P &gt; ATC</b>: economic profit',c:'u3up'}, 'New firms enter (free entry).', 'Market supply shifts <b>right</b>.', 'Price <b>falls</b>; each firm\'s profit shrinks.'],
    [{t:'<b>P &lt; ATC</b>: economic loss',c:'u3down'}, 'Some firms exit.', 'Market supply shifts <b>left</b>.', 'Price <b>rises</b>; the loss shrinks.'] ]},
  {t:'Entry or exit continues until <b>P = minimum ATC</b>: zero economic profit, so no one wants to enter or leave.',c:'u3end'}
]), 'Your course: firms "will continue to enter up until the point where the price is equal to average total cost," and with losses "firms will exit that market and that will cause the price to rise." No single firm moves the price; the number of firms does. Your course textbook: "the combination of many firms entering or exiting the market will affect overall supply."');

/* L24 V4: a demand increase in the short run and the long run, market and firm (course slides 208-209; made-up numbers, constant-cost industry) */
FIG5.l24shift = () => figs([
  ['The market', sdg({ xmax:2700, ymax:24, xt:[0,1000,1400,2400], yt:[0,10,12,20], xlab:'Market quantity', ylab:'Price ($)', aria:'Market demand rising from D1 to D2 and supply rising from S1 to S2, price returning to 10 dollars',
    lines:[ oldL([0,20],[2000,0],'D1'), dem([0,24],[2400,0],'D2'), {a:[0,0],b:[2000,20],label:'S1',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}, {a:[0,0],b:[2400,240/14],label:'S2',c:'var(--g1)',dash:'5 3',lx:-6,ly:14,anchor:'end'}, {pts:[[0,10],[2400,10]], c:'var(--muted)', dash:'2 4', w:1.6} ],
    labels:[[2680,11.2,'LR supply','var(--muted)','end']],
    dots:[{q:1000,p:10,label:'A',c:'var(--muted)',lx:-14,ly:-6},{q:1200,p:12,label:'B',c:'var(--g2)'},{q:1400,p:10,label:'C',c:'var(--ink)',lx:6,ly:16}] })],
  ['One firm', sdg({ xmax:40, ymax:24, xt:[0,20,24,40], yt:[0,10,12,20], xlab:'Firm output', ylab:'Price ($)', aria:'Firm cost curves with the price rising from 10 to 12 dollars and a profit rectangle at 24 units',
    areas:[{pts:[[0,LR.atc(24)],[24,LR.atc(24)],[24,12],[0,12]], c:'var(--accent)', o:0.35}],
    lines:[ ...lrFirmLines(), {pts:[[0,10],[40,10]], c:'var(--muted)', label:'MR₁ = $10', lx:-4, ly:14, anchor:'end', dash:'5 4', w:2}, {pts:[[0,12],[40,12]], c:'var(--accent)', label:'MR₂ = $12', lx:-4, ly:-6, anchor:'end'} ],
    dots:[{q:20,p:10,label:'A',c:'var(--muted)',lx:-14,ly:16},{q:24,p:12,label:'B',c:'var(--g2)',lx:6,ly:-8}] })]
], 'Made-up numbers that follow your course\'s story (slides 208-209). Start at A: price $10, 50 firms making 20 units each, zero profit. Demand rises (D1 to D2): the price jumps to $12 (B), each firm moves up its MC to 24 units and earns a profit (shaded). Profits draw in 20 new firms; supply shifts right (S1 to S2) until the price is back at $10 (C). Each firm is back at 20 units, but 70 firms now sell 1,400. Joining A and C gives a flat long-run supply line (dotted, LR supply): this is a constant-cost industry.');

/* L24 V5: long-run supply in constant-, increasing- and decreasing-cost industries (textbook §8.3, Figure 8.8; shapes only) */
FIG5.l24lrs = () => { const pan = (t, p2, lab, aria) => [t, sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Market quantity', ylab:'Price', aria,
    lines:[ {pts:[[1,5],[9,p2]], c:'var(--accent)', label:'LRS', lx:-4, ly:p2<5?18:-8, anchor:'end'} ],
    dots:[{q:3,p:5+(p2-5)*0.25,label:'before',c:'var(--muted)',lx:-8,ly:p2<5?16:-10,anchor:'end'},{q:7,p:5+(p2-5)*0.75,label:'after',c:'var(--ink)',lx:6,ly:p2<5?-8:16}], labels:[[5,p2<5?8.8:1.2,lab,'var(--muted)']] })];
  return figs([ pan('Constant cost', 5, 'price returns to the same level', 'Flat long-run supply line'),
                pan('Increasing cost', 8, 'new price is higher', 'Upward-sloping long-run supply line'),
                pan('Decreasing cost', 2, 'new price is lower', 'Downward-sloping long-run supply line') ],
  'Shapes only, from your course textbook (Figure 8.8). Each line joins the long-run equilibrium before a demand increase with the one after entry has finished. If firms\' costs don\'t change as the industry grows, the line is flat. If inputs such as skilled labor get dearer, it slopes up; if growth brings lower costs, it slopes down.'); };

/* L24 V6: allocative efficiency, value of the last unit against its cost (textbook §8.4 flowers example; made-up numbers) */
FIG5.l24eff = () => fig(`<div class="u3split">
  <div class="u3col"><div class="u3step u3up"><b>Too little</b>: P &gt; MC</div><div class="u3step">Last unit worth $9 to a buyer, costs $5 to make.</div><div class="u3step">Society gains $4 more from one more unit: produce more.</div></div>
  <div class="u3col"><div class="u3step u3end"><b>Just right</b>: P = MC</div><div class="u3step">Last unit worth $7, costs $7.</div><div class="u3step">No further gain either way: allocatively efficient.</div></div>
  <div class="u3col"><div class="u3step u3down"><b>Too much</b>: P &lt; MC</div><div class="u3step">Last unit worth $5, costs $9.</div><div class="u3step">Society loses $4 on it: produce less.</div></div></div>`,
  'Made-up numbers for your course textbook\'s flower market. Price measures what the last flower is worth to a buyer; marginal cost measures what it costs society to grow. The textbook: when firms produce where P = MC, "the social benefits received from producing a good are in line with the social costs of production." Perfect competition gets there because every firm sets P = MC.');

/* ===== Lesson 24: Perfect Competition: Long-Run Equilibrium and Efficiency (Modern States video 5.2, last part; Module 5 slides 206-210) =====
   Common mistakes: M1 zero economic profit means firms lose money and want to leave · M2 entry raises the market price
   M3 profit = (P − MC) × Q · M4 after a demand increase the price stays higher in the long run (constant-cost industry)
   M5 allocative efficiency means producing at the lowest average cost · M6 long-run firms earn positive profit because P = MC */

mc('l24-rect-calc','l24','Your course textbook\'s raspberry farm sells at $5 a pack. At its profit-maximizing output of 80 packs, its average total cost is $3.30. What is its profit?',
  [`$136`,`$400`,`$264`,`$120`,`$160`],0,
  `<p>Your course: "Profit = (P − ATC) × Q" = ($5.00 − $3.30) × 80 = $1.70 × 80 = <b>$136</b>. Check with totals: revenue $400 − total cost $264 = $136.</p><p>$400 is total revenue and $264 total cost. $120 uses an ATC of $3.50 (the textbook\'s text slips here; its table says $3.30 at 80 packs). $160 uses $3.00.</p>`);
gen('l24-g-pl','l24',()=>{
  const Q = pick([20,40,50,60,100]), atc = pick([6,7.5,8,9,12]), P = atc + pick([-3,-2,-1.5,1,2,2.5,4]);
  const ans = (P-atc)*Q;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A perfectly competitive firm sells at a price of <b>${d2(P)}</b>. At its profit-maximizing output of <b>${Q}</b> units, its average total cost is <b>${d2(atc)}</b>. What is its economic profit? (Type a negative number for a loss.)`, answer:ans,
    explain:`<p>Profit = (P − ATC) × Q = (${d2(P)} − ${d2(atc)}) × ${Q} = ${P-atc<0?'−':''}${d2(Math.abs(P-atc))} × ${Q} = <b>${usd(ans)}</b>.</p><p>The common slips are using P × Q (${usd(P*Q)}, which is revenue) or leaving out the minus sign when price is below ATC.</p>` };
});
mc('l24-lre-cond','l24','Which of the following is true of a perfectly competitive firm in long-run equilibrium?',
  [`Price = marginal revenue = marginal cost = minimum average total cost, so economic profit is zero`,`Price is above average total cost, so it earns an economic profit`,`Price equals average variable cost, so it is about to shut down`,`Marginal revenue is above marginal cost, so it should expand`,`Price is below marginal cost because of entry`],0,
  `<p>Your course: "the long-run equilibrium will tell us that we\'re producing at the profit-maximizing point of production where marginal revenue equals marginal cost, and this corresponds to the point where the price is equal to average total cost. So therefore we have zero economic profits."</p><p>P = MC holds in the short run too; it doesn\'t mean a profit (M6). With P &gt; ATC, entry would still be going on.</p>`);
tf('l24-tf-zero','l24','In long-run equilibrium, perfectly competitive firms earn zero economic profit, so their owners would be better off leaving the industry.',false,
  `<p>False. Zero economic profit is a normal profit (Lesson 20): revenue covers every cost, including the owners\' implicit costs, so they earn exactly what they could earn elsewhere. Leaving gains them nothing, which is why no one exits (M1).</p>`);
mc('l24-entry','l24','Made-up example. Firms in a perfectly competitive industry are earning economic profits. What happens in the long run?',
  [`New firms enter, market supply rises and the price falls until profits are zero`,`New firms enter and the price rises`,`Existing firms raise their prices to keep profits`,`Nothing, because each firm is a price taker`,`Firms exit because profits are too high`],0,
  `<p>Profits attract entry. Your course: as firms enter, "they drive down the price of the good and therefore they will continue to enter up until the point where the price is equal to average total cost." More sellers shift market supply right, and the price falls.</p><p>Entry doesn\'t raise the price (M2). Price takers can\'t raise their own prices; the number of firms is what changes.</p>`);
lazy('l24-gr-rect','l24',()=>{ const atc = q => 6/q + 4 + 0.5*q, qs = []; for(let q=0.8;q<=10.01;q+=0.2) qs.push(Math.round(q*10)/10);
  /* made-up firm: TC = 6 + 4q + 0.5q², so MC = 4 + q and ATC = 6/q + 4 + 0.5q; at P = $10, MC = P at q = 6, where ATC = $8 (lowest ATC ≈ $7.46 at q ≈ 3.5, where MC crosses it) */
  return { type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm sells at a price of $10 and produces 6 units, where P = MC:${sdg({ xmax:10, ymax:14, xt:[0,2,4,6,8,10], yt:[0,4,8,10,14], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Firm graph with a price line at 10 dollars, marginal cost crossing it at 6 units, average total cost 8 dollars there, and a shaded rectangle between 8 and 10 dollars',
    areas:[{pts:[[0,8],[6,8],[6,10],[0,10]], c:'var(--accent)', o:0.3, label:[2.2,9,'?']}],
    lines:[ {pts:qs.filter(q=>atc(q)<=14).map(q=>[q,atc(q)]), c:'var(--muted)', w:2}, {pts:[[0,4],[10,14]], c:'var(--g2)', label:'MC', lx:-6, ly:2, anchor:'end', w:2}, {pts:[[0,10],[10,10]], c:'var(--accent)'} ], labels:[[1.15,12.9,'ATC','var(--muted)','start'],[2.6,10.6,'P = $10','var(--accent)','start']],
    vls:[{q:6,p:10}], dots:[{q:6,p:10,label:'',c:'var(--ink)'},{q:6,p:8,label:'',c:'var(--muted)'}] })}The shaded rectangle runs from ATC ($8) up to the price ($10) and across 6 units. What does it show?`,
  options:[`The firm\'s economic profit: (P − ATC) × Q = $12`,`The firm\'s total revenue: P × Q = $60`,`The firm\'s total cost: ATC × Q = $48`,`The firm\'s profit: (P − MC) × Q = $0`,`The firm\'s loss, because ATC is below price`], answer:0,
  explain:`<p>The rectangle\'s height is price minus average total cost ($10 − $8 = $2 per unit) and its width is the quantity (6), so its area is profit: $2 × 6 = $12. Your course: "Profit = (P − ATC) × Q." (Here TC = 6 + 4Q + 0.5Q², so ATC = 6/Q + 4 + 0.5Q = $1 + $4 + $3 = $8 at 6 units, and MC = 4 + Q = $10.)</p><p>Total revenue is the whole area from $0 to $10 ($60); total cost is the area below ATC ($48). Using MC instead of ATC is a common slip (M3); with ATC below price this is a profit, not a loss.</p>` }; });
mc('l24-demand-up','l24','In your course\'s example, demand for a perfectly competitive good rises. Which sequence describes what happens?',
  [`Price rises and firms earn profits; new firms enter; supply rises until the price falls back to its original level`,`Price rises and stays higher, and firms keep their profits`,`Price falls at once because more firms enter`,`Firms raise their prices; the market price doesn\'t change`,`Price rises, firms exit, and supply falls`],0,
  `<p>Your course: "with the increase in demand in the short-run firms experience positive economic profits but in the long run as more firms enter into the market to take advantage of those positive economic profits ... price lowers and we return back to a point of zero economic profits." The course\'s graph goes A → B → C, with C at the original price.</p><p>"Price stays higher" ignores entry (M4). Entry follows the price rise; it doesn\'t come first.</p>`);
tf('l24-tf-lrprice','l24','In a constant-cost perfectly competitive industry, a permanent rise in demand leaves the price permanently higher.',false,
  `<p>False. The higher price brings short-run profits, new firms enter, and supply keeps rising until the price is back at the minimum of average total cost. In a constant-cost industry, where firms\' costs don\'t change as the industry grows, that is the original price. Only the market quantity and the number of firms end up higher (M4).</p>`);
mc('l24-alloc','l24','A market is allocatively efficient when it produces the quantity at which',
  [`price equals marginal cost`,`price equals minimum average total cost`,`total revenue is largest`,`average total cost is lowest`,`marginal revenue is zero`],0,
  `<p>Your course textbook: allocative efficiency means "the benefits to consumers of what they are buying, as measured by the price they are willing to pay, is equal to the costs to society of producing the marginal units, as measured by the marginal costs." That is P = MC.</p><p>Producing at the lowest average cost is <b>productive</b> efficiency, a different idea (M5).</p>`);
mc('l24-prod-eff','l24','Why is a perfectly competitive market productively efficient in the long run?',
  [`Entry and exit push the price to the minimum of average total cost, so goods are made at the lowest possible cost per unit`,`Firms set price equal to marginal cost`,`Firms earn large economic profits that they reinvest`,`The government sets prices at average cost`,`Each firm produces as much as it can`],0,
  `<p>Your course textbook: "because of the process of entry and exit, the price in the market is equal to the minimum of the long-run average cost curve. In other words, goods are being produced and sold at the lowest possible average cost."</p><p>P = MC is the source of <b>allocative</b> efficiency (M5). Firms earn zero economic profit in the long run.</p>`);
lazy('l24-gr-market','l24',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers for a constant-cost perfectly competitive market. It starts at A. Demand then rises from D1 to D2:${sdg({ xmax:12, ymax:12, xt:[0,4,5,6,8,12], yt:[0,6,7,12], xlab:'Market quantity (thousands)', ylab:'Price ($)', aria:'Market with demand rising from D1 to D2 and supply rising from S1 to S2; points A, B and C',
    lines:[ oldL([0,10],[10,0],'D1'), dem([0,12],[12,0],'D2'), {a:[0,2],b:[10,12],label:'S1',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}, {a:[2,2],b:[12,12],label:'S2',c:'var(--g1)',dash:'5 3',lx:-6,ly:14,anchor:'end'} ],
    dots:[{q:4,p:6,label:'A',c:'var(--muted)',lx:-14,ly:-6},{q:5,p:7,label:'B',c:'var(--g2)',lx:-16,ly:-6},{q:6,p:6,label:'C',c:'var(--ink)',lx:6,ly:16}] })}Where is the market in the long run, after firms finish entering?`,
  options:[`At C: the original $6 price with a larger quantity`,`At B: a higher price of $7`,`At A: back where it started`,`On D1 below A, because supply rose`,`Above B, because demand keeps rising`], answer:0,
  explain:`<p>In the short run the price rises to $7 (B) and firms profit. Entry shifts supply from S1 to S2 until the price is back at $6, the minimum of average total cost, at C. The market sells more (6 thousand instead of 4) at the old price (M4).</p><p>B is only the short-run stop. The market can\'t return to A, because demand is now D2.</p>` }));
gen('l24-g-firms','l24',()=>{
  const q = pick([10,20,25,40,50]), p = pick([4,5,6,8,10]), a = pick([3000,4000,5000,6000]), b = pick([100,200,250]);
  if((a - b*p) <= 0 || (a - b*p) % q) return Q['l24-g-firms'].gen();
  const Qm = a - b*p, ans = Qm/q;
  return { type:'num', kind:'num', unit:'firms', prompt:`Made-up numbers. In a perfectly competitive industry, every firm\'s average total cost is lowest at <b>${q}</b> units, where it is <b>$${p}</b>. Market demand is <b>Q = ${a.toLocaleString('en-US')} − ${b}P</b>. In long-run equilibrium, how many firms are in the industry?`, answer:ans,
    explain:`<p>In the long run the price is the minimum of average total cost, $${p}, and each firm makes ${q} units. At $${p}, buyers want ${a.toLocaleString('en-US')} − ${b} × ${p} = ${Qm.toLocaleString('en-US')} units. Number of firms = ${Qm.toLocaleString('en-US')} ÷ ${q} = <b>${ans}</b>.</p><p>The common slip is using a different price; in long-run equilibrium P = minimum ATC.</p>` };
});
/* L24 more */
mc('l24-loss-calc','l24','Your course textbook\'s raspberry farm sells at $2.20 a pack and produces 50 packs, where its average total cost is $3.32. What is its profit?',
  [`−$56`,`−$62`,`$110`,`$56`,`−$166`],0,
  `<p>Profit = (P − ATC) × Q = ($2.20 − $3.32) × 50 = −$1.12 × 50 = <b>−$56</b>. Check: revenue $110 − total cost $166.</p><p>−$62 is what it would lose by shutting down. $110 is revenue; −$166 subtracts total cost from zero.</p>`);
mc('l24-exit-adj','l24','Made-up example. Firms in a perfectly competitive industry are making economic losses. What happens in the long run?',
  [`Some firms exit, market supply falls and the price rises until losses disappear`,`Firms exit and the price falls further`,`All firms shut down permanently`,`The remaining firms cut their prices to win customers`,`New firms enter to replace them`],0,
  `<p>Your course: "if a market is experiencing a loss firms will exit that market and that will cause the price to rise. As the price rises firms are going to continue adjusting until we get to a point where the price is equal to average total cost."</p><p>Exit reduces supply, so the price rises, not falls. Price takers can\'t cut their prices to gain sales.</p>`);
tf('l24-tf-eff','l24','In long-run equilibrium, a perfectly competitive firm produces at the lowest point of its average total cost curve.',true,
  `<p>True. Entry and exit drive the price to the minimum of ATC, and the firm produces where P = MC, which crosses ATC at its minimum. That is why perfect competition is productively efficient (M5).</p>`);
mc('l24-flowers','l24','Your course textbook\'s flower market produces a quantity at which the price of a flower is higher than its marginal cost. What does this mean?',
  [`Society would gain from producing more flowers, because buyers value the next flower more than it costs to grow`,`Too many flowers are being produced`,`The market is allocatively efficient`,`Flower farms are earning zero economic profit`,`The market is productively efficient`],0,
  `<p>The textbook: when P &gt; MC, "the benefit to society as a whole of producing additional goods ... would be higher than the cost of the inputs ... needed to produce the marginal good." Producing more raises total benefit. Too many would mean P &lt; MC; efficiency needs P = MC.</p>`);
lazy('l24-gr-lre','l24',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm\'s marginal cost (MC) and average total cost (ATC), with four possible market prices:${sdg({ xmax:40, ymax:24, xt:[0,20,40], yt:[0,6,10,14,20], xlab:'Firm output', ylab:'Dollars per unit', aria:'Firm cost curves with four price lines at 6, 10, 14 and 20 dollars',
    lines:[ ...lrFirmLines(), {pts:[[0,6],[40,6]], c:'var(--muted)', label:'P = $6', lx:-4, ly:-4, anchor:'end', w:1.6}, {pts:[[0,10],[40,10]], c:'var(--muted)', label:'P = $10', lx:-4, ly:-4, anchor:'end', w:1.6}, {pts:[[0,14],[40,14]], c:'var(--muted)', label:'P = $14', lx:-4, ly:-4, anchor:'end', w:1.6}, {pts:[[0,20],[40,20]], c:'var(--muted)', label:'P = $20', lx:-4, ly:-4, anchor:'end', w:1.6} ] })}At which price is the market in long-run equilibrium?`,
  options:[`$10, where the price line just touches the bottom of ATC`,`$6, the lowest price`,`$14, where the firm earns a modest profit`,`$20, where MC is highest`,`Any of them, because firms are price takers`], answer:0,
  explain:`<p>Long-run equilibrium needs P = MC = minimum ATC, so that economic profit is zero. Here ATC bottoms out at $10 (at 20 units), so the long-run price is $10. At $14 or $20 firms earn profits and entry pushes the price down; at $6 they lose money and exit pushes it up (M2, M6).</p>` }));
mc('l24-normal','l24','In long-run equilibrium, perfectly competitive firms earn zero economic profit. What are their owners earning?',
  [`A normal profit: exactly what their time and money could earn in their next best use`,`Nothing at all, so they will leave soon`,`Large accounting losses`,`More than they could earn anywhere else`,`Only enough to cover variable costs`],0,
  `<p>Zero economic profit means accounting profit just covers implicit costs (Lesson 20). Owners are as well off as in their best alternative, so there is no pull to leave or to enter (M1).</p>`);
mc('l24-sr-profit','l24','In this lesson\'s made-up market, each firm has TC = 100 + 0.25q². When demand rises, the price jumps to $12 and each firm produces 24 units. What is each firm\'s short-run profit?',
  [`$44`,`$288`,`$244`,`$48`,`$0`],0,
  `<p>Revenue = $12 × 24 = $288. Total cost = 100 + 0.25 × 24² = 100 + 144 = $244. Profit = $288 − $244 = <b>$44</b>. (Per unit: ATC = $244 ÷ 24 ≈ $10.17, so ($12 − $10.17) × 24 ≈ $44.)</p><p>$288 is revenue, $244 total cost. $0 is the long-run profit, after entry brings the price back to $10.</p>`);
tf('l24-tf-entry','l24','When new firms enter a perfectly competitive market, the market price rises.',false,
  `<p>False. Entry adds sellers, so market supply shifts right and the price falls. That is how profits are competed away: your course\'s graph moves from P2 back down to P1 (M2).</p>`);
mc('l24-incost','l24','Your course textbook describes an increasing-cost industry, where wages for scarce skilled workers rise as the industry grows. After a permanent rise in demand, what happens to the long-run price?',
  [`It ends up higher than before, because every firm\'s costs have risen`,`It returns to the original price, as in a constant-cost industry`,`It ends up lower, because of economies of scale`,`It stays at the short-run peak`,`It falls to zero, because of entry`],0,
  `<p>The textbook: in an increasing-cost industry "the old and new firms experience increases in their costs of production, which makes the new zero-profit level intersect at a higher price than before," and the long-run supply curve slopes up. In a constant-cost industry it would return to the original price (M4 applies only there).</p>`);
mc('l24-why-zero','l24','Why does entry into a perfectly competitive industry stop once the price falls to the minimum of average total cost?',
  [`At that price economic profit is zero, so there is nothing extra to attract new firms`,`The government bans further entry`,`Firms run out of buyers`,`Marginal cost becomes zero`,`Existing firms raise their prices to block entry`],0,
  `<p>Entry is driven by economic profit. Your course: "When the price is equal to average total cost there\'s no incentive for the firm to enter or exit the market." Newcomers would earn only what they could earn elsewhere.</p>`);
lazy('l24-gr-eff','l24',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive market\'s demand (D) and supply (S, the sum of the firms\' marginal cost curves):${sdg({ xmax:10, ymax:10, xt:[0,3,5,10], yt:[0,3,5,7,10], xlab:'Quantity', ylab:'Price ($)', aria:'Demand and supply crossing at 5 units and 5 dollars, with 3 units marked',
    lines:[ dem([0,10],[10,0]), sup([0,0],[10,10]) ], vls:[{q:3,p:7}], dots:[{q:3,p:7,label:'',c:'var(--accent)'},{q:3,p:3,label:'',c:'var(--g1)'}], labels:[[3,0.6,'3 units','var(--ink)']] })}Suppose only 3 units were produced. Which statement is true?`,
  options:[`Buyers value the 3rd unit at $7 but it costs $3 to make, so producing more would raise total surplus`,`3 units is allocatively efficient because the price is high`,`3 units is efficient because costs are low`,`Too much is being produced, since price is above marginal cost`,`The market is in long-run equilibrium`], answer:0,
  explain:`<p>At 3 units the demand curve says the last unit is worth $7 and the supply (marginal cost) curve says it costs $3. P &gt; MC, so each extra unit up to 5 adds more value than cost. The efficient quantity is 5, where P = MC = $5.</p><p>Too much would mean P &lt; MC (M5 confuses which comparison matters).</p>` }));
tf('l24-tf-pmc','l24','A perfectly competitive firm produces where price equals marginal cost both in the short run and in the long run.',true,
  `<p>True. P = MR = MC is its profit-maximizing rule at any time. What changes in the long run is that price also equals minimum ATC, so profit is zero. P = MC alone doesn\'t tell you whether the firm earns a profit (M6).</p>`);
mc('l24-caveat','l24','Your course textbook warns that the efficiency of perfect competition "need[s] to be taken with a few grains of salt." Why?',
  [`"Efficiency" is meant in a specific sense; for example, willingness to pay reflects how income is distributed`,`Perfectly competitive markets always produce too much`,`Perfectly competitive firms earn large profits`,`Efficiency means the same as fairness`,`Firms in perfect competition set prices above marginal cost`],0,
  `<p>The textbook: economists use efficiency "in a particular and specific sense, not as a synonym for \'desirable in every way.\' For one thing, consumers\' ability to pay reflects the income distribution." A person with little income may not be able to pay for housing. Unit 7 returns to income distribution.</p>`);
mc('l24-lrs-flat','l24','In a constant-cost perfectly competitive industry, the long-run industry supply curve is',
  [`horizontal at the minimum of average total cost`,`the same as each firm\'s marginal cost curve`,`vertical at the current quantity`,`downward sloping`,`the market demand curve`],0,
  `<p>Your course textbook: when the before and after long-run equilibriums are joined in a constant-cost industry, "the resulting line is the long run supply (LRS) curve ... In this case, it is a flat curve." Firms can be added at the same cost, so the market can supply more at the same price.</p>`);
mc('l24-firm-same','l24','In your course\'s example, after demand rises and new firms finish entering, what is true of the original firm, Firm A?',
  [`It is back to its original price and output, earning zero economic profit, but there are more firms in the market`,`It keeps producing more at a higher price`,`It earns a larger profit than before`,`It has exited the market`,`It now sets the market price`],0,
  `<p>Your course: "for Firm A, what they are experiencing is that previously they had an increase in the price but now as new firms enter in the long run, over time the price returns back to its original level." Firm A moves from A to B and back to A; the market moves A → B → C with more sellers.</p>`);
gen('l24-g-entry','l24',()=>{
  const q = pick([20,25,40,50]), add = q * pick([4,5,6,8,10,12]);
  return { type:'num', kind:'num', unit:'firms', prompt:`Made-up numbers. A constant-cost perfectly competitive industry is in long-run equilibrium, with each firm making <b>${q}</b> units at the bottom of its average total cost curve. A permanent rise in demand means buyers will want <b>${add.toLocaleString('en-US')}</b> more units at that same price. How many new firms enter in the long run?`, answer: add/q,
    explain:`<p>In a constant-cost industry the price returns to the minimum of ATC, and each firm again makes ${q} units. The extra ${add.toLocaleString('en-US')} units must come from new firms: ${add.toLocaleString('en-US')} ÷ ${q} = <b>${add/q}</b>.</p><p>The common slip is thinking existing firms produce the extra output; in the long run each firm returns to its original output (M4).</p>` };
});

/* ===== Lesson 24 quick checks ===== */
mc('l24c-rect','l24','Made-up numbers. A competitive firm sells 200 units at $6; its average total cost is $7. What is its profit?',
  [`−$200`,`$1,200`,`$200`,`−$1,400`,`$0`],0,
  `<p>(P − ATC) × Q = ($6 − $7) × 200 = <b>−$200</b>. $1,200 is revenue; −$1,400 is −ATC × Q.</p>`);
mc('l24c-lre','l24','Which pair of conditions defines long-run equilibrium for a perfectly competitive firm in your course?',
  [`MR = MC and P = ATC`,`MR = MC and P > ATC`,`P = AVC and MR = MC`,`P > MC and P = ATC`,`MR > MC and P < ATC`],0,
  `<p>Your course\'s slide 207: "MR = MC, P = ATC": maximizing profit, and that profit is zero.</p>`);
mc('l24c-adj','l24','Made-up example. Corn farmers earn economic profits this year. Over the next few years, what do you expect?',
  [`More land goes into corn and the price of corn falls`,`The price of corn rises further`,`Corn farmers raise their own prices`,`Farmers leave corn for other crops`,`Nothing changes, because farmers are price takers`],0,
  `<p>Profits attract entry: more farmers grow corn, market supply rises and the price falls until profits disappear. Your course textbook\'s chapter story is exactly this: North Dakota farmers switching from wheat to corn.</p>`);
mc('l24c-demand','l24','In a constant-cost competitive industry, demand rises permanently. Compared with the original long-run equilibrium, the new one has',
  [`the same price, more firms and a larger market quantity`,`a higher price and the same number of firms`,`a lower price and fewer firms`,`the same price and the same quantity`,`a higher price and higher profits`],0,
  `<p>Entry returns the price to the minimum of ATC; the extra quantity comes from new firms.</p>`);
mc('l24c-eff','l24','Which matching is correct?',
  [`Allocative efficiency: P = MC. Productive efficiency: P = minimum ATC`,`Allocative efficiency: P = minimum ATC. Productive efficiency: P = MC`,`Both mean P = MR`,`Allocative efficiency: zero profit. Productive efficiency: positive profit`,`Both mean producing as much as possible`],0,
  `<p>Allocative: the value of the last unit equals its cost (P = MC). Productive: lowest possible cost per unit (P = min ATC). Long-run perfect competition has both.</p>`);
mc('l24c-skill','l24','Made-up numbers. In a competitive industry the price is $9 and each firm\'s minimum ATC is $11. What happens in the long run?',
  [`Firms exit, and the price rises toward $11`,`Firms enter, and the price falls`,`Nothing, because firms cover their variable costs`,`The price stays at $9 forever`,`Firms raise their prices to $11`],0,
  `<p>P &lt; ATC means losses, so some firms exit; supply falls and the price rises until it reaches $11.</p>`);

/* Course materials checked 2026-10-28: video 5.2 transcript, last part (profit = (price − ATC) × quantity; P > ATC profit, P < ATC loss; long-run equilibrium MR = MC and P = ATC, zero economic profit;
   entry drives price down, exit drives it up; demand increase: A → B (short-run profits) → C (entry, price back to P1)), Module 5 slides 206-210; course textbook §8.2 (Figure 8.5; Table 8.4; raspberry farm at $2.20: −$56;
   text slips on Fig 8.5(a) noted), §8.3 (entry and exit lead to zero profits; constant-, increasing- and decreasing-cost industries; flat LRS), §8.4 (productive and allocative efficiency; flowers; "grains of salt"). */
const L24TAGS = {
  'l24-rect-calc':['MS5 OS82','pclr','data','M3'], 'l24-g-pl':['MS5 OS82','pclr','data','M3'], 'l24-lre-cond':['MS5 OS83','pclr','terms','M6 M1'],
  'l24-tf-zero':['MS5 OS83 OS101','pclr','terms','M1'], 'l24-entry':['MS5 OS83','pclr','models','M2'], 'l24-gr-rect':['MS5 OS82','pclr','graphs','M3'],
  'l24-demand-up':['MS5 OS83','pclr','models','M4'], 'l24-tf-lrprice':['OS83 MS5','pclr','terms','M4'], 'l24-alloc':['OS84','pceff','terms','M5'],
  'l24-prod-eff':['OS84','pceff','models','M5'], 'l24-gr-market':['MS5 OS83','pclr','graphs','M4'], 'l24-g-firms':['OS83','pclr','data',''],
  'l24-loss-calc':['OS82','pclr','data','M3'], 'l24-exit-adj':['MS5 OS83','pclr','models','M2'], 'l24-tf-eff':['OS84 OS83','pceff','terms','M5'],
  'l24-flowers':['OS84','pceff','models','M5'], 'l24-gr-lre':['MS5 OS83','pclr','graphs','M6 M2'], 'l24-normal':['OS101 OS83','pclr','models','M1'],
  'l24-sr-profit':['MS5','pclr','data',''], 'l24-tf-entry':['MS5 OS83','pclr','terms','M2'], 'l24-incost':['OS83','pclr','models','M4'],
  'l24-why-zero':['MS5','pclr','models','M1'], 'l24-gr-eff':['OS84','pceff','graphs','M5'], 'l24-tf-pmc':['OS84 MS5','pceff','terms','M6'],
  'l24-caveat':['OS84','pceff','terms',''], 'l24-lrs-flat':['OS83','pclr','terms','M4'], 'l24-firm-same':['MS5','pclr','models','M4'], 'l24-g-entry':['OS83','pclr','data','M4'],
  'l24c-rect':['MS5','pclr','data','M3'], 'l24c-lre':['MS5','pclr','terms','M6'], 'l24c-adj':['OS83 OS81','pclr','models','M2'],
  'l24c-demand':['OS83','pclr','models','M4'], 'l24c-eff':['OS84','pceff','terms','M5'], 'l24c-skill':['MS5 OS83','pclr','models','M2']
};
u5tag(L24TAGS);

U5_CARDS.l24 = [
  ['Profit on a firm graph','How do you find a competitive firm\'s profit or loss on a graph?','Profit = (P − ATC) × Q: the rectangle between the price and ATC at the chosen output.','Raspberry farm at $5: ($5 − $3.30) × 80 = $136.','Use ATC, not MC.'],
  ['Profit, zero profit or loss','How does price compare with ATC in each case?','P > ATC: economic profit. P = ATC: zero economic profit. P < ATC: loss.','At $2.20 the farm\'s ATC is $3.32: a $56 loss.','A loss isn\'t a shutdown unless P < AVC.'],
  ['Long-run equilibrium','What are the conditions for long-run equilibrium in perfect competition?','MR = MC and P = ATC (at minimum ATC): zero economic profit, no entry or exit.','Raspberry farm at $3.20, 70 packs.','Zero economic profit is a normal profit.'],
  ['Entry lowers price','What happens when economic profits attract new firms?','Market supply shifts right and the price falls until P = minimum ATC.','Your course: P2 back to P1.','Entry never raises the price.'],
  ['Exit raises price','What happens when losses push firms out?','Market supply shifts left and the price rises until P = minimum ATC.','Your course: firms exit "and that will cause the price to rise."','The remaining firms return to zero economic profit.'],
  ['Demand increase: short run','What happens right after demand rises in a competitive market?','The price rises; each firm moves up its MC curve and earns an economic profit.','Made-up example: $10 → $12; 20 → 24 units; profit $44.','This is the short run, before entry.'],
  ['Demand increase: long run','What happens in the long run after demand rises (constant-cost industry)?','New firms enter until the price is back at minimum ATC; each firm makes its old output, but the market sells more.','50 firms × 20 → 70 firms × 20 at $10.','The price does not stay higher.'],
  ['Long-run supply (industry)','What does the long-run industry supply curve look like in a constant-cost industry?','Horizontal at the minimum of ATC.','The textbook: agricultural markets are generally constant-cost.','Increasing-cost: slopes up. Decreasing-cost: slopes down.'],
  ['Allocative efficiency','What is allocative efficiency, and what condition gives it?','Producing the quantity where the value of the last unit equals its cost to society: P = MC.','Flowers: at P > MC society wants more; at P < MC, less.','Not the same as lowest cost.'],
  ['Productive efficiency','What is productive efficiency, and why does long-run perfect competition have it?','Producing at the lowest possible average cost; entry and exit push price to minimum ATC.','Each firm produces at the bottom of its ATC.','Allocative = P = MC; productive = P = min ATC.'],
  ['Zero economic profit','Why do firms stay in an industry with zero economic profit?','Their accounting profit just covers their implicit costs: they earn as much as anywhere else.','A normal profit (Lesson 20).','Zero economic profit is not a loss.'],
  ['Efficiency caveat','What warning does your course textbook give about efficiency?','It is meant in a specific sense; willingness to pay reflects income, so efficient isn\'t "desirable in every way."','A person with little income may not be able to pay for housing.','Efficiency is not the same as fairness.']
];

Object.assign(U5_WRITE, {
  'w-l24-1':{lesson:'l24',prompt:'Using your course\'s example, explain what happens in a perfectly competitive market after demand rises, first in the short run and then in the long run. Describe both the market and a single firm.',
    model:'When demand rises, the market demand curve shifts right and the market price rises. Each firm is a price taker, so its marginal revenue line rises with the price and it moves up its marginal cost curve, producing more. Because the price is now above average total cost, every firm earns an economic profit in the short run. Those profits attract new firms, which is easy because entry is free. As firms enter, market supply shifts right and the price falls. Entry continues until the price is back at the minimum of average total cost, where profits are zero. In a constant-cost industry that is the original price. Each firm ends up producing its original quantity at zero economic profit, while the market as a whole sells more because there are more firms.',
    checklist:['Describes the short-run price rise and the firm moving up its MC curve','States that firms earn short-run economic profits (P > ATC)','Explains entry shifting supply right and lowering the price','States the long-run result: price back at minimum ATC, zero profit, more firms and a larger market quantity']},
  'w-l24-2':{lesson:'l24',prompt:'Explain the difference between allocative efficiency and productive efficiency, and why a perfectly competitive market in long-run equilibrium has both.',
    model:'Allocative efficiency means producing the right amount of a good: the quantity where the value of the last unit to buyers, shown by its price, equals the cost to society of producing it, its marginal cost. If price were above marginal cost, society would gain from more output; if below, from less. Productive efficiency means producing at the lowest possible cost per unit, the bottom of the average total cost curve. A perfectly competitive firm always produces where P = MC, which gives allocative efficiency. In the long run, entry and exit push the price down to the minimum of average total cost, and since the firm produces where P = MC, which crosses ATC at its minimum, it produces at the lowest average cost. So long-run perfect competition has both.',
    checklist:['Defines allocative efficiency as P = MC with the reasoning (value of last unit = its cost)','Defines productive efficiency as producing at minimum average total cost','Explains that P = MC comes from price-taking firms maximizing profit','Explains that entry and exit drive price to minimum ATC in the long run']}
});

U5_PLAN.l24 = {
  core:['l24-rect-calc','l24-g-pl','l24-lre-cond','l24-tf-zero','l24-entry','l24-gr-rect','l24-demand-up','l24-tf-lrprice','l24-alloc','l24-prod-eff','l24-gr-market','l24-g-firms'],
  more:['l24-loss-calc','l24-exit-adj','l24-tf-eff','l24-flowers','l24-gr-lre','l24-normal','l24-sr-profit','l24-tf-entry','l24-incost','l24-why-zero','l24-gr-eff','l24-tf-pmc','l24-caveat','l24-lrs-flat','l24-firm-same','l24-g-entry']
};

U5_LESSONS.push({ id:'l24', unit:5, title:'Perfect Competition: Long-Run Equilibrium and Efficiency', mins:45, src:'Modern States video 5.2 (last part) and Module 5 slides 206-210 · Course textbook (OpenStax) §8.2-§8.4',
  sources:['MS5','OS82','OS83','OS84','CB','ELPR'],
  oneline:'Short-run profits and losses don\'t last in perfect competition: entry and exit move the market price until it equals the bottom of average total cost, where firms earn zero economic profit and the market is both allocatively and productively efficient.',
  body:`
<p>Lesson 23 gave each firm its own rules: produce if P ≥ AVC, stay in the long run if P ≥ ATC, and firms ${dt('entry','enter')} when there are profits. This lesson adds up what happens when many firms follow those rules at once.</p>

<h2>Profit and loss as rectangles</h2>
<!-- src: MS5 (video 5.2: "if we look at total revenue as price times quantity and total cost as average total cost times quantity, the profit equation is going to be (price - average total cost) times quantity ... when price is greater than average total cost we have profits. When the price is below average total cost the firm is experiencing a loss"; slide 206); OS82 (Figure 8.5; Table 8.4: P > ATC profit, P = ATC zero, P < ATC loss; raspberry farm at $2.20: 50 packs, loss $56; Table 8.6 ATC $3.30 at 80 packs, $3.32 at 50). Note: the textbook's text for Figure 8.5(a) mixes 80 and 90 packs and uses ATC $3.50; this lesson uses its Table 8.6. -->
<p>Your course rewrites profit so it can be read straight off a graph. ${dt('total-revenue','Total revenue')} is P × Q and total cost is ATC × Q, so:</p>
<div class="math">Profit = P × Q − ATC × Q = <b>(P − ATC) × Q</b></div>
<p>The height of the rectangle is profit per unit (P − ATC); the width is the quantity.</p>
<p><b>Worked example: your course textbook\'s raspberry farm</b> (${dt('average-cost','average total cost')} from its Table 8.6).</p>
<div class="math">Price $5: produce 80 packs (the 70-to-80 step costs $4 a pack, below $5; the next step costs $6); ATC = $3.30 → profit = ($5.00 − $3.30) × 80 = <b>$136</b><br>Price $2.20: P = MC at 50 packs; ATC = $3.32 → profit = ($2.20 − $3.32) × 50 = <b>−$56</b></div>
${FIG5.l24rect()}
<p>Check: $136 matches revenue minus total cost ($400 − $264), and −$56 matches $110 − $166. (The textbook\'s own text for this figure slips between 80 and 90 packs; its table is consistent.)</p>
<div data-check="l24c-rect"></div>

<h2>Long-run equilibrium: zero economic profit</h2>
<!-- src: MS5 (video 5.2: "The long-run equilibrium is going to occur at the point where marginal revenue is equal to marginal cost and the price is equal to average total cost ... So therefore we have zero economic profits"; slide 207); OS83 ("a long-run equilibrium will be attained when no new firms want to enter the market and existing firms do not want to leave the market, as economic profits have been driven down to zero"; key term long-run equilibrium: P = MR = MC and P = AC); OS101 (zero economic profit is not zero accounting profit) -->
<p>Your course: the ${dt('lr-equilibrium','<b>long-run equilibrium</b>')} is where "marginal revenue is equal to marginal cost and the price is equal to average total cost." The only price that does both is the bottom of the ATC curve, where MC crosses it.</p>
${FIG5.l24lre()}
<p><b>Why zero is the resting point:</b> any profit would draw new firms in; any loss would push firms out. Only at zero ${dt('economic-profit','economic profit')} does nobody want to move. Remember Lesson 20: zero economic profit is a ${dt('normal-profit','normal profit')}, so owners are earning what their resources could earn elsewhere.</p>
<div data-check="l24c-lre"></div>

<h2>How entry and exit get there</h2>
<!-- src: MS5 (video 5.2: "when we have positive economic profits in the short run over the long run firms are going to enter into this market to try to take advantage of those profits. By doing so they drive down the price of the good and therefore they will continue to enter up until the point where the price is equal to average total cost. On the flip side, if a market is experiencing a loss firms will exit that market and that will cause the price to rise"; slides 208-209); OS83 ("No perfectly competitive firm acting alone can affect the market price. However, the combination of many firms entering or exiting the market will affect overall supply in the market"; "Entry and exit to and from the market are the driving forces behind a process that, in the long run, pushes the price down to minimum average total costs"); ELPR (Thurow: "New investment enters until profits are competed down") -->
<p>No single ${dt('price-taker','price taker')} can change the price. But the <b>number</b> of firms can. Your course textbook: "the combination of many firms entering or exiting the market will affect overall supply in the market."</p>
${FIG5.l24flow()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture checkout lines at a supermarket. If one line moves fast, shoppers drift into it until it is no faster than the rest; if one crawls, people leave it. Soon every line takes about the same time. Firms do the same with industries: they crowd into profitable ones and leave losing ones until each earns about what it could earn elsewhere.</p></div>
<div data-check="l24c-adj"></div>

<h2>A rise in demand: short run and long run</h2>
<!-- src: MS5 (video 5.2: increase in demand moves the market from A to B, raising the price; "for Firm A this tells Firm A that their marginal revenue has risen ... in the short run Firm A is experiencing positive profits"; "In the long run other firms observe that there is positive economic profit occurring in this market and they try to enter. As they enter into this market the supply curve shifts, increasing the number of sellers ... We move from P2 back to P1 ... point C, the new long run equilibrium"; slides 208-209); OS83 (constant-cost industry: "the supply curve shifts to the right with new firms' entry and stops at the point where the new long-run equilibrium intersects at the same market price as before"; flat long-run supply; increasing-cost industry: higher new price, upward-sloping LRS; decreasing-cost: lower price) -->
<p>Your course walks through a demand increase in three points. <b>A</b>: long-run equilibrium. <b>B</b>: demand rises, the price jumps, and every firm earns a short-run profit. <b>C</b>: new firms enter, supply rises and the price falls back.</p>
<p><b>Worked example (made-up numbers).</b> Each firm\'s average total cost is lowest, $10, at 20 units. 50 firms supply the market.</p>
<div class="math">A: price $10, each firm makes 20 units, market quantity 50 × 20 = 1,000, profit $0<br>B: demand rises; price $12, each firm makes 24 units (P = MC), market quantity 1,200, profit = $288 − $244 = <b>$44</b> each<br>C: 20 new firms enter; price back to $10, each makes 20 units, market quantity 70 × 20 = <b>1,400</b>, profit $0</div>
${FIG5.l24shift()}
<p>Check: at B, 50 firms × 24 units = 1,200, the quantity buyers want at $12. At C, 1,400 units sell at the old $10 price. Your course: "the price returns back to its original level."</p>
<p>This is a ${dt('constant-cost','constant-cost industry')}: firms\' costs don\'t change as the industry grows, so the long-run supply curve is flat. Your course textbook adds two other cases. In an ${dt('increasing-cost','increasing-cost industry')} (say, skilled workers get scarcer and their wages rise), the long-run price ends up higher. In a ${dt('decreasing-cost','decreasing-cost industry')} it ends up lower.</p>
${FIG5.l24lrs()}
<p>Run the adjustment yourself below.</p>
<div data-widget="lrmarket"></div>
<p>What to notice: whatever demand does, the only number of firms that leaves profit at zero is the one that brings the price back to $10. Profit per firm is positive above $10 and negative below it.</p>
<div data-check="l24c-demand"></div>

<h2>Why perfect competition is efficient</h2>
<!-- src: OS84 ("Productive efficiency means producing without waste ... In the long run in a perfectly competitive market, because of the process of entry and exit, the price in the market is equal to the minimum of the long-run average cost curve"; "In a perfectly competitive market, price will be equal to the marginal cost of production"; flowers: P > MC and P < MC; "they are thus ensuring that the social benefits received from producing a good are in line with the social costs of production"; "a few grains of salt ... consumers' ability to pay reflects the income distribution"); CB (outline: Efficiency and perfect competition) -->
<p>Your course textbook says long-run ${dt('perfect-competition','perfect competition')} delivers two kinds of efficiency.</p>
<p>${dt('productive-efficiency','<b>Productive efficiency</b>')}: goods are made at the lowest possible cost per unit. Entry and exit push the price to the minimum of average total cost, and every firm produces right there.</p>
<p>${dt('allocative-efficiency','<b>Allocative efficiency</b>')}: the market makes the right amount. Price measures what the last unit is worth to a buyer; ${dt('marginal-cost','marginal cost')} measures what it costs society to make. Every competitive firm produces where P = MC, so the two match.</p>
${FIG5.l24eff()}
<p><b>Why P = MC is the right amount:</b> at a smaller output, P &gt; MC and one more unit would add more value than cost. At a larger one, P &lt; MC and the last unit costs more than it is worth. Only at P = MC is there nothing left to gain.</p>
<p><b>So what:</b> this is the benchmark for Lessons 25 to 28. The textbook adds two cautions: efficiency is meant "in a particular and specific sense," because ${dt('willingness-to-pay','willingness to pay')} depends on income; and real markets have problems (pollution, missing information) that the model leaves out.</p>
<div data-check="l24c-eff"></div>

<h2>Read the firm, predict the market</h2>
<!-- src: MS5, OS83. Exam skill: from P and ATC, predict entry or exit and the direction of the market price. -->
<p>The CLEP often shows one firm\'s graph and asks what happens next. The move: compare price with ATC at the firm\'s output. Profit means entry and a falling price; a loss means exit and a rising price; zero means stay put.</p>
<div data-widget="lrsort"></div>
<p>What to notice: the direction of the price change is always toward the bottom of ATC, whichever side it starts on.</p>
<div data-check="l24c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L24TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Zero economic profit means firms are losing money and want to leave."</span>It is a normal profit: owners earn what they could earn elsewhere, so no one leaves.</li>
<li><span class="wrong">"When new firms enter, the price rises."</span>Entry adds supply, so the price falls; that is how profits are competed away.</li>
<li><span class="wrong">"Profit = (P − MC) × Q."</span>Use average total cost: profit = (P − ATC) × Q.</li>
<li><span class="wrong">"After demand rises, the price stays higher for good."</span>In a constant-cost industry entry brings it back to the minimum of ATC; only the quantity and number of firms stay higher.</li>
<li><span class="wrong">"Allocative efficiency means producing at the lowest cost."</span>That is productive efficiency (P = min ATC). Allocative efficiency is P = MC.</li>
<li><span class="wrong">"In the long run firms earn a profit because P = MC."</span>P = MC is the profit-maximizing rule at any time; in the long run P also equals ATC, so profit is zero.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Profit = (P − ATC) × Q</b>: a rectangle above ATC for a profit, below it for a loss (raspberry farm: $136 at $5; −$56 at $2.20).</li>
<li><b>Long-run equilibrium</b>: MR = MC and P = ATC at the bottom of ATC, so economic profit is zero (a normal profit).</li>
<li><b>Entry</b> (after profits) shifts supply right and lowers the price; <b>exit</b> (after losses) shifts supply left and raises it.</li>
<li>After a <b>demand increase</b>, firms profit in the short run; in a constant-cost industry entry returns the price to its original level, with more firms and a larger market quantity.</li>
<li>Long-run perfect competition is <b>allocatively</b> (P = MC) and <b>productively</b> (P = min ATC) efficient.</li>
<li>On the exam, compare P with ATC to predict entry or exit, and expect the price to move toward the bottom of ATC.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Firm and market behaviors in short-run and long-run equilibria" and "Efficiency and perfect competition." Expect side-by-side market and firm graphs asking what happens after a demand or cost change, a question about long-run profit, or a question matching P = MC and P = minimum ATC to the two kinds of efficiency.</p>
</div>`,
  deeper:`
<h3>Increasing- and decreasing-cost industries</h3>
<p>Your course textbook: in an increasing-cost industry, limited inputs such as skilled labor get more expensive as the industry grows, so "the new zero-profit level intersect[s] at a higher price than before" and the long-run supply curve slopes up. In a decreasing-cost industry, growth brings lower costs (better technology, a more skilled workforce), so the long-run price falls; the textbook suggests high-tech industries as an example.</p>
<h3>Wheat to corn in North Dakota</h3>
<p>The textbook\'s chapter story: as corn and wheat prices converged, farmers switched acres from wheat to corn. North Dakota planted 11.6 million acres of wheat and 780,000 acres of corn in 1997; corn acreage more than doubled later. That is entry and exit at work, crop by crop.</p>`,
  links:[ {k:'Textbook',t:'8.3 Entry and Exit Decisions in the Long Run',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/8-3-entry-and-exit-decisions-in-the-long-run',w:'How entry and exit lead to zero profit, with the constant-, increasing- and decreasing-cost cases.'},
          {k:'Textbook',t:'8.4 Efficiency in Perfectly Competitive Markets',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/8-4-efficiency-in-perfectly-competitive-markets',w:'Productive and allocative efficiency, and why the textbook says to take them "with a few grains of salt."'} ]
});
