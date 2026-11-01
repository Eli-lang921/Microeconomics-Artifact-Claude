/* ===== Lesson 23 figures ===== */
const RF_ATC_PTS = RF.slice(1).map(r=>[r.q, r.atc]), RF_AVC_PTS = RF.slice(1).map(r=>[r.q, r.avc]);
/* the best quantity if the raspberry farm produces at all (ties go to the larger quantity) */
function rfBestProducing(P){ let best=10, bp=P*10-RF[1].tc; RF.slice(2).forEach(r=>{ const pr=P*r.q-r.tc; if(pr>bp-1e-9){ if(pr>bp+1e-9 || r.q>best){ best=r.q; bp=pr; } } }); return { q:best, profit:bp }; }

/* made-up smooth cost curves for Lesson 23's graph questions: VC = 6q − 1.2q² + 0.1q³, FC = 25.6.
   AVC = 6 − 1.2q + 0.1q² (lowest $2.40 at q 6); MC = 6 − 2.4q + 0.3q² (crosses AVC at 6 and ATC at 8); ATC = 25.6/q + AVC (lowest $6.00 at q 8). */
const L23C = { avc:q=>6-1.2*q+0.1*q*q, mc:q=>6-2.4*q+0.3*q*q, atc:q=>25.6/q+6-1.2*q+0.1*q*q };
const l23curves = (extra={}) => { const qs=[]; for(let q=1;q<=10.01;q+=0.25) qs.push(+q.toFixed(2));
  return [ {pts:qs.filter(q=>q>=2.5).map(q=>[q,L23C.atc(q)]), c:'var(--accent)', label:'ATC', lx:4, ly:2}, {pts:qs.map(q=>[q,L23C.avc(q)]), c:'var(--g1)', label:'AVC', lx:4, ly:12}, {pts:qs.filter(q=>q>=1.5 && L23C.mc(q)<=12).map(q=>[q,L23C.mc(q)]), c:'var(--g2)', label:'MC', lx:-4, ly:-4, anchor:'end'} ]; };

/* L23 V1: temporary shutdown versus exit (course video 5.2, slides 201-203; textbook §8.2-§8.3) */
FIG5.l23cards = () => fig(`<div class="u3pair">
  <div class="u3card" style="border-left:4px solid var(--g2)"><p class="u3h">Short run: shut down (for now)</p><p>Produce nothing this period. Stop paying variable costs (workers, materials); lose all revenue.</p><p><b>Still pays fixed costs</b> (the lease, the loan on equipment).</p><p class="small">Your course: "a temporary shutdown is not the same thing as exiting the market."</p></div>
  <div class="u3card no"><p class="u3h">Long run: exit</p><p>Leave the industry for good once leases and contracts end.</p><p><b>No costs at all</b>, and no revenue: "total revenue is equal to 0 and total cost is equal to 0" (your course).</p><p class="small">The textbook: "exit" is "a nice, bloodless word for a more painful process."</p></div></div>`,
  'Two different decisions on two time scales. In the short run some costs are fixed, so the firm can\'t escape them by closing its doors; it can only decide whether to keep paying the variable costs. In the long run nothing is fixed, so it can walk away completely.');

/* L23 V2: the textbook's Yoga Center, loss if open versus loss if shut (Table 8.5) */
FIG5.l23yoga = () => { const rows = [['Scenario 1: revenue $0', 0], ['Scenario 2: revenue $10,000', 10000], ['Scenario 3: revenue $20,000', 20000]], FC = 10000, VC = 15000;
  const W_=360, left=8, right=W_-118, rh=58, top=4, max=25000, X=v=>left+(right-left)*v/max;
  let s=`<svg class="u2bars" viewBox="0 0 ${W_} ${top+rows.length*rh+30}" role="img" aria-label="Bars comparing the loss from staying open with the loss from shutting down in three scenarios">`;
  rows.forEach(([lab,R],i)=>{ const y=top+i*rh, open = FC+VC-R, best = Math.min(open, FC);
    s+=`<text x="${left}" y="${y+12}" class="lbl-ink" style="font-weight:600">${lab}</text>`;
    s+=`<rect x="${left}" y="${y+18}" width="${(X(open)-left).toFixed(1)}" height="14" fill="var(--bad)" opacity="${open===best?.9:.35}"/><text x="${(X(open)+4).toFixed(1)}" y="${y+29}" class="lbl-ink halo">open: lose ${usd(open)}</text>`;
    s+=`<rect x="${left}" y="${y+36}" width="${(X(FC)-left).toFixed(1)}" height="14" fill="var(--g2)" opacity="${FC===best?.9:.35}"/><text x="${(X(FC)+4).toFixed(1)}" y="${y+47}" class="lbl-ink halo">shut: lose ${usd(FC)}</text>`; });
  s+=`<text x="${left}" y="${top+rows.length*rh+18}" class="lbl">Solid bar = smaller loss (better); faded = bigger loss</text>`;
  return fig(s+'</svg>', 'Your course textbook\'s Yoga Center: $10,000 a month of rent it must pay under its lease (fixed) and $15,000 for teachers if it opens (variable). Shutting down always costs the $10,000 rent. Staying open costs $25,000 minus whatever revenue comes in. It should open only in scenario 3, where revenue ($20,000) more than covers the teachers ($15,000).'); };

/* L23 V3: the raspberry farm's three cost curves with the shutdown and zero-profit points (textbook Figure 8.7, Table 8.6) */
FIG5.l23zones = () => fig(cchart({ xmax:105, ymax:7, xt:[0,20,40,60,80,100], yt:[0,2.05,3.2,5,7], xlab:'Packs of raspberries', ylab:'Dollars per pack', aria:'Marginal cost, average total cost and average variable cost curves for the raspberry farm, with the shutdown point and zero-profit point marked',
  lines:[ {pts:RF_ATC_PTS.filter(([q])=>q>=30), c:'var(--accent)', label:'ATC', lx:4, ly:2}, {pts:RF_AVC_PTS, c:'var(--g1)', label:'AVC', lx:4, ly:10}, {pts:RF_MC_PTS.filter(([q,m])=>m<=7.2), c:'var(--g2)', label:'MC', lx:-4, ly:4, anchor:'end'} ],
  dots:[{q:44,p:2.05,label:'shutdown point $2.05',c:'var(--g1)',lx:6,ly:22},{q:70,p:3.2,label:'zero-profit point $3.20',c:'var(--accent)',lx:-4,ly:-26,anchor:'end'}] }),
  'Your course textbook\'s raspberry farm (marginal cost plotted at the end of each 10-pack step). Marginal cost crosses average variable cost near its bottom, about $2.05: the shutdown point. It crosses average total cost at its bottom, $3.20: the zero-profit point. Above $3.20 the farm profits; between $2.05 and $3.20 it loses money but should keep producing; below $2.05 it should shut down.');

/* L23 V5: building the firm's short-run supply curve from its MC curve (course slide 202; textbook §8.2) */
FIG5.l23supply = () => { const mcPts = RF_MC_PTS.filter(([q,m])=>q>44 && m<=7.2);
  return figs([
    ['Cost curves', cchart({ xmax:105, ymax:7, xt:[0,40,80], yt:[0,2.05,4,6], xlab:'Packs', ylab:'Dollars per pack', aria:'Marginal cost and average variable cost',
      lines:[ {pts:RF_AVC_PTS, c:'var(--g1)', label:'AVC', lx:4, ly:10}, {pts:RF_MC_PTS.filter(([q,m])=>m<=7.2), c:'var(--g2)', label:'MC', lx:-4, ly:4, anchor:'end'} ],
      dots:[{q:44,p:2.05,label:'',c:'var(--g1)'}] })],
    ['Short-run supply', sdg({ xmax:105, ymax:7, xt:[0,40,80], yt:[0,2.05,4,6], xlab:'Packs', ylab:'Price ($)', aria:'Short-run supply curve: zero output below 2.05 dollars, then the marginal cost curve',
      lines:[ {pts:[[0,0],[0,2.05]], c:'var(--accent)', w:4}, {pts:[[44,2.05],...mcPts], c:'var(--accent)', w:3.2, label:'S', lx:-4, ly:4, anchor:'end'} ],
      labels:[[6,1.0,'shut down: 0 packs','var(--muted)','start']], dots:[{q:44,p:2.05,label:'',c:'var(--accent)'}] })]
  ], 'First panel: the raspberry farm\'s marginal cost and average variable cost. Second panel: its short-run supply curve. At any price above the bottom of AVC ($2.05), the farm produces where price = MC, so its supply curve is the part of MC above AVC. Below $2.05 it supplies nothing (the thick line along the price axis). Your course: "the short-run supply curve for the firm is going to be the marginal cost curve at any point above average variable cost."'); };

/* L23 V6: the short-run and long-run decision rules side by side (course slides 201, 203-204; textbook Table 8.4 and §8.3) */
FIG5.l23rules = () => fig(`<div class="u3split">
  <div class="u3col"><div class="u3step u3amb"><b>Short run</b> (fixed costs are paid anyway)</div><div class="u3arrow" aria-hidden="true">↓</div>
    <div class="u3step u3up">P ≥ AVC: <b>produce</b> where MR = MC (even at a loss)</div><div class="u3step u3down">P &lt; AVC: <b>shut down</b>, produce zero, lose only fixed cost</div></div>
  <div class="u3col"><div class="u3step u3amb"><b>Long run</b> (no fixed costs)</div><div class="u3arrow" aria-hidden="true">↓</div>
    <div class="u3step u3up">P &gt; ATC: economic profit, so firms <b>enter</b></div><div class="u3step u3end">P = ATC: zero economic profit, <b>no entry or exit</b></div><div class="u3step u3down">P &lt; ATC: economic loss, so firms <b>exit</b></div></div></div>`,
  'Your course\'s two rule boxes (slides 202 and 204). The short-run test uses average <b>variable</b> cost, because fixed costs can\'t be avoided yet. The long-run test uses average <b>total</b> cost, because in the long run every cost can be avoided by leaving.');

/* L23 V7: the firm's long-run supply curve (course slide 205) */
FIG5.l23lrs = () => fig(cchart({ xmax:105, ymax:7, xt:[0,20,40,60,80,100], yt:[0,2.05,3.2,5,7], xlab:'Packs of raspberries', ylab:'Dollars per pack', aria:'Marginal cost above average total cost highlighted as the long-run supply curve',
  lines:[ {pts:RF_ATC_PTS.filter(([q])=>q>=30), c:'var(--muted)', label:'ATC', lx:4, ly:2, w:2}, {pts:RF_AVC_PTS, c:'var(--line)', label:'AVC', lx:4, ly:10, w:2}, {pts:RF_MC_PTS.filter(([q,m])=>m<=7.2), c:'var(--line)', w:2},
          {pts:[[70,3.2],...RF_MC_PTS.filter(([q,m])=>q>70 && m<=7.2)], c:'var(--accent)', w:3.4, label:'long-run supply', lx:-6, ly:4, anchor:'end'} ],
  dots:[{q:70,p:3.2,label:'$3.20',c:'var(--accent)',lx:8,ly:14}] }),
  'Your course\'s rule applied to the textbook farm: "in the long run, a firm will remain in a market only if P ≥ ATC," so its long-run supply is its marginal cost curve above average total cost (green), starting at the $3.20 bottom of ATC. Below that price, in the long run it leaves. Lesson 24 shows what entry and exit by many firms do to the market price.');

/* ===== Lesson 23: Perfect Competition: Shutdown, Exit and the Firm's Supply Curve (Modern States video 5.2, middle; Module 5 slides 201-205) =====
   Common mistakes: M1 a firm losing money should shut down right away · M2 in the short run, shut down whenever price is below ATC
   M3 shutting down means leaving the industry · M4 a shut-down firm's loss is zero
   M5 a competitive firm's supply curve is its whole MC curve · M6 in the long run a firm stays as long as price covers AVC */
const rfCostTbl = () => atable(['Packs','Total cost','AVC','ATC','MC per pack'], RF.slice(1).map(r=>[r.q, '$'+r.tc, d2(r.avc), d2(r.atc), d2(r.mc)]), { cls:'compact' });

mc('l23-shut-rule','l23','In the short run, a perfectly competitive firm should produce nothing (shut down) when the market price is',
  [`below its minimum average variable cost`,`below its minimum average total cost`,`below its average fixed cost`,`equal to its minimum average total cost`,`above its average fixed cost`],0,
  `<p>Your course: shut down when "the price of the good is going to be below the average variable cost," meaning revenue can\'t even cover the variable costs. Fixed costs must be paid either way, so they don\'t enter the short-run decision.</p><p>Price below average <b>total</b> cost means a loss, but the firm should still produce if price covers AVC (M2). At P = minimum ATC the firm breaks even.</p>`);
mc('l23-yoga','l23','Your course textbook\'s Yoga Center pays $10,000 a month in rent under a lease. If it opens this month, it must pay teachers $15,000 and expects revenue of $20,000. What should it do this month, and what is the result?',
  [`Stay open: it loses $5,000, less than the $10,000 it would lose by closing`,`Shut down: it is losing money either way`,`Stay open: it earns a $5,000 profit`,`Shut down: its loss would be zero`,`Stay open only if revenue covers the rent too`],0,
  `<p>Open: $20,000 − ($10,000 + $15,000) = −$5,000. Closed: it still owes the $10,000 rent, so −$10,000. Revenue covers the $15,000 of variable cost with $5,000 to spare toward the rent, so staying open loses less. The textbook: "the center should remain open in the short run."</p><p>"Losing money either way" is true, but a firm compares the two losses (M1). Closing doesn\'t make the loss zero (M4).</p>`);
gen('l23-g-loss','l23',()=>{
  const FC = pick([200,300,400,500]), VC = pick([400,500,600,800]), cover = Math.random()<0.5;
  const TR = cover ? VC + pick([50,100,150]) : VC - pick([50,100,150]);
  const open = TR - VC - FC, ans = Math.max(open, -FC);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A perfectly competitive firm\'s fixed cost this week is <b>$${FC}</b>. At its best output, it would earn revenue of <b>$${TR}</b> and pay variable costs of <b>$${VC}</b>. What is its profit this week if it makes the better short-run choice? (Type a negative number for a loss.)`, answer:ans,
    explain:`<p>Produce: $${TR} − $${VC} − $${FC} = ${usd(open)}. Shut down: it still pays the fixed cost, so ${usd(-FC)}. ${cover ? `Revenue covers variable cost, so producing loses less: <b>${usd(ans)}</b>.` : `Revenue doesn\'t even cover variable cost, so shutting down loses less: <b>${usd(ans)}</b>.`}</p><p>The common slips are answering $0 for a shutdown (fixed costs are still owed, M4) or always choosing to produce.</p>` };
});
tf('l23-tf-shut-atc','l23','In the short run, a perfectly competitive firm should shut down whenever the price is below its average total cost.',false,
  `<p>False. Below average total cost the firm makes a loss, but if price is still above average <b>variable</b> cost it covers all its variable costs and part of its fixed costs, so producing loses less than shutting down. The textbook\'s raspberry farm at $2.20 loses $56 by producing and $62 by shutting down (M2).</p>`);
mc('l23-rasp180','l23',`Your course textbook\'s raspberry farm has a fixed cost of $62:${rfCostTbl()}The market price falls to $1.80 a pack. What should the farm do in the short run?`,
  [`Shut down: at its best output it would lose $72, more than its $62 fixed cost`,`Produce 40 packs: price equals marginal cost there`,`Produce 50 packs to spread its fixed cost`,`Shut down, and its loss will be $0`,`Keep producing, because price is above marginal cost at 30 packs`],0,
  `<p>At $1.80, P = MC at 40 packs: revenue $72, total cost $144, a loss of $72. Shutting down loses only the $62 fixed cost. The price is below average variable cost ($2.05 at 40 packs), so it can\'t even pay its variable costs. The textbook: "shutting down is preferable to selling at a price of $1.80 per pack."</p><p>MR = MC picks the best output if the farm produces, but here producing at all is worse than stopping. Shutting down still costs $62 (M4).</p>`);
lazy('l23-gr-zones','l23',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm\'s cost curves, and the market price P = $4. The lowest AVC is $2.40 and the lowest ATC is $6:${sdg({ xmax:10.5, ymax:12, xt:[0,2,4,6,8,10], yt:[0,2.4,4,6,9,12], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Cost curves with the price line at 4 dollars, between the minimum of average variable cost and the minimum of average total cost',
    lines:[ ...l23curves(), {pts:[[0,4],[10.5,4]], c:'var(--ink)', w:2} ], labels:[[5.2,4.5,'P = $4','var(--ink)']] })}What should the firm do in the short run?`,
  options:[`Produce where P = MC, making a loss smaller than its fixed cost`,`Shut down, because price is below average total cost`,`Produce where P = MC and earn an economic profit`,`Shut down, because price is below marginal cost at high output`,`Produce where price equals average total cost`], answer:0,
  explain:`<p>The $4 price is above the $2.40 bottom of AVC but below the $6 bottom of ATC. At the P = MC output (about 7 units), revenue covers all variable costs and part of the fixed costs: a loss, but a smaller one than shutting down. Your course: produce when "P ≥ AVC."</p><p>Shutting down because P &lt; ATC is the classic mistake (M2). Earning a profit would need a price above $6.</p>` }));
mc('l23-sr-supply','l23','A perfectly competitive firm\'s short-run supply curve is',
  [`its marginal cost curve above the minimum of average variable cost`,`its whole marginal cost curve`,`its average total cost curve`,`its marginal cost curve above the minimum of average fixed cost`,`a horizontal line at the market price`],0,
  `<p>The firm supplies the quantity where P = MC, but only if P ≥ AVC; below that it supplies nothing. So its supply curve is the MC curve "at any point above average variable cost" (your course).</p><p>The whole MC curve includes prices where the firm would shut down (M5). The horizontal line at the market price is the firm\'s demand curve, not its supply curve.</p>`);
tf('l23-tf-exit','l23','A firm that shuts down temporarily in the short run has left the industry.',false,
  `<p>False. Your course: "a temporary shutdown is not the same thing as exiting the market." A shut-down firm still has its fixed inputs and still pays its fixed costs; it can start up again when the price recovers. Exit is a long-run decision to leave for good (M3).</p>`);
mc('l23-lr-exit','l23','Made-up example. A perfectly competitive firm\'s price has been above its average variable cost but below its average total cost for months, and is expected to stay there. What will it do in the long run?',
  [`Exit the industry when its leases and contracts end`,`Keep producing forever, because it covers its variable costs`,`Shut down temporarily and reopen next month`,`Raise its price to cover average total cost`,`Enter a second market with the same costs`],0,
  `<p>In the long run every cost becomes avoidable, so the test is price versus average <b>total</b> cost. Your course: firms "exit if total revenue is less than total cost, or in other words the price is below average total cost." Covering variable costs only keeps a firm going in the short run (M6).</p><p>As a price taker it can\'t raise its price.</p>`);
gen('l23-g-decide','l23',()=>{
  const avc = pick([4,5,6]), atc = avc + pick([2,3,4]), kind = pick(['profit','loss','shut']);
  const P = kind==='profit' ? atc + pick([1,2]) : kind==='loss' ? avc + pick(Array.from({length:atc-avc-1},(_,i)=>i+1)) : avc - pick([1,2]);
  const opts = [`Produce where P = MC and earn an economic profit`,`Produce where P = MC at a loss for now, and exit in the long run if prices stay this low`,`Shut down now, losing only its fixed cost`,`Raise its price to cover its average total cost`,`Produce where price equals average total cost`];
  const ans = kind==='profit' ? 0 : kind==='loss' ? 1 : 2;
  return { type:'mc', kind:'mc', prompt:`Made-up numbers. A perfectly competitive firm\'s minimum average variable cost is <b>$${avc}</b> and its minimum average total cost is <b>$${atc}</b>. The market price is <b>$${P}</b>. What should the firm do?`, options:opts, answer:ans,
    explain:`<p>${kind==='profit' ? `$${P} is above the $${atc} bottom of ATC, so at the P = MC output price exceeds average total cost: an economic profit.` : kind==='loss' ? `$${P} is between the $${avc} bottom of AVC and the $${atc} bottom of ATC. Revenue covers the variable costs and part of the fixed costs, so producing loses less than shutting down. But it can\'t cover all costs, so in the long run the firm exits if the price stays here.` : `$${P} is below the $${avc} bottom of AVC: revenue can\'t even cover variable costs. Shutting down cuts the loss to the fixed cost.`}</p><p>A price taker can\'t raise its price. The usual slips are shutting down just because P &lt; ATC (M2), or producing when P &lt; AVC (M1).</p>` };
});
lazy('l23-gr-supply','l23',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm\'s marginal cost (MC) and average variable cost (AVC). Point B is the bottom of AVC:${sdg({ xmax:10.5, ymax:12, xt:[0,3,6,9], yt:[0,2.4,6,9,12], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Marginal cost and average variable cost curves with points A, B and C on the marginal cost curve',
    lines: l23curves().slice(1),
    dots:[{q:3,p:L23C.mc(3),label:'A',c:'var(--ink)',lx:-14,ly:4},{q:6,p:2.4,label:'B',c:'var(--ink)',lx:6,ly:16},{q:9,p:L23C.mc(9),label:'C',c:'var(--ink)',lx:-16,ly:-4}] })}Which part of the graph is the firm\'s short-run supply curve?`,
  options:[`The MC curve from B upward, through C`,`The whole MC curve, including A`,`The AVC curve`,`The MC curve below B, through A`,`A horizontal line through B`], answer:0,
  explain:`<p>At prices above the bottom of AVC (point B, $2.40), the firm produces where P = MC, so the MC curve from B up (through C) shows how much it supplies at each price. Below B it shuts down and supplies nothing, so point A, where MC is below AVC, isn\'t on its supply curve (M5).</p><p>The AVC curve tells the shutdown price, not the quantity supplied.</p>` }));
mc('l23-loss-fc','l23','Made-up numbers. A competitive firm with fixed costs of $800 a month shuts down for the month. What is its profit for the month?',
  [`−$800`,`$0`,`−$400`,`$800`,`It depends on its marginal cost`],0,
  `<p>Shutting down cuts revenue and variable costs to zero, but the fixed costs (rent, equipment loans) are still owed in the short run: profit = 0 − $800 = <b>−$800</b>. Your course: the firm "still has to pay their fixed costs."</p><p>"$0" is the common slip (M4); a firm escapes fixed costs only by exiting in the long run.</p>`);
/* L23 more */
mc('l23-shut-def','l23','According to your course, what is the difference between a temporary shutdown and exiting the market?',
  [`A shutdown suspends production for now while fixed costs are still paid; exit leaves the market for good`,`They are two names for the same thing`,`A shutdown happens in the long run; exit happens in the short run`,`A shut-down firm pays no costs; an exiting firm still pays fixed costs`,`A shutdown means producing less; exit means producing zero`],0,
  `<p>Your course: "a temporary shutdown is not the same thing as exiting the market. What\'s happening here is that temporarily the firm has decided to suspend production." Exit is the long-run choice, when the firm can escape every cost (M3).</p><p>The cost statement is backwards (M4): it\'s the shut-down firm that still pays fixed costs.</p>`);
mc('l23-why-vc','l23','Why does a firm compare price with average <b>variable</b> cost, not average total cost, when deciding whether to shut down in the short run?',
  [`Its fixed costs must be paid whether it produces or not, so only variable costs depend on the decision`,`Variable costs are always larger than fixed costs`,`Average total cost is too hard to calculate`,`Fixed costs are not real costs`,`Price always equals average total cost in the short run`],0,
  `<p>In the short run the fixed costs are owed either way, so they can\'t tip the decision. What changes is revenue and variable cost: produce if revenue covers variable cost. Your course: "In the short run the firm still has to pay their fixed costs so therefore it is going to base its decision on what is happening with variable costs."</p><p>Fixed costs are real costs; they just aren\'t affected by this choice (like Lesson 5\'s sunk costs).</p>`);
tf('l23-tf-loss0','l23','When a competitive firm shuts down in the short run, its loss is zero.',false,
  `<p>False. Shutting down ends revenue and variable costs, but fixed costs such as rent and equipment loans are still owed. Its loss equals its fixed cost: the Yoga Center loses its $10,000 rent if it closes (M4).</p>`);
mc('l23-rasp220','l23',`Your course textbook\'s raspberry farm (fixed cost $62):${rfCostTbl()}The market price is $2.20 a pack. What should the farm do in the short run?`,
  [`Produce 50 packs: it loses $56, less than the $62 it would lose by shutting down`,`Shut down, because price is below average total cost`,`Produce 50 packs and earn a profit of $56`,`Produce 100 packs to spread its fixed cost`,`Shut down and lose nothing`],0,
  `<p>At $2.20, P = MC at 50 packs: revenue $110, total cost $166, a loss of $56. Shutting down would lose $62. Price is above average variable cost ($2.08 at 50 packs), so producing covers the variable costs plus $6 of the fixed cost. The textbook: "price is above average variable cost and so the firm continues to operate."</p><p>Price below ATC ($3.32) means a loss, not a shutdown (M2).</p>`);
gen('l23-g-shutprice','l23',()=>{
  /* MC dips once, then rises every step (the U shape the lesson teaches), so AVC bottoms out between 3 and 5 units */
  let VC, avc, m, q;
  for(;;){ const a = pick([10,12,15]), MC = [a, a - pick([3,4,5])]; let step = pick([1,2]);
    while(MC.length<6){ MC.push(MC[MC.length-1] + step); step += pick([1,2,3]); }
    VC = []; MC.forEach((c,i)=>VC.push((VC[i-1]||0)+c)); avc = VC.map((v,i)=>v/(i+1)); m = Math.min(...avc); q = avc.indexOf(m)+1;
    if(q>=3 && q<=5 && new Set(avc.map(x=>x.toFixed(4))).size===6) break; }
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A perfectly competitive firm\'s variable cost:${atable(['Quantity','Variable cost'], VC.map((v,i)=>[i+1,'$'+v]), { cls:'compact' })}Below what price will it shut down in the short run? (Give the minimum average variable cost.)`, answer:+m.toFixed(2),
    explain:`<p>Average variable cost = VC ÷ Q: ${avc.map((a,i)=>`${i+1}: ${d2(a)}`).join(', ')}. The lowest is <b>${d2(m)}</b> at ${q} units. Below that price the firm can\'t cover its variable costs at any output, so it shuts down.</p><p>The common slip is multiplying instead of dividing. (Your course\'s slide 201 prints "AVC = VC X Q"; it should be VC ÷ Q.)</p>` };
});
tf('l23-tf-supply','l23','At prices below the minimum of its average variable cost, a perfectly competitive firm supplies zero output in the short run.',true,
  `<p>True. Below the bottom of AVC the firm shuts down, so the quantity it supplies is zero. That is why its supply curve is only the part of MC above AVC, not the whole MC curve (M5).</p>`);
mc('l23-lr-enter','l23','In your course\'s long-run rules, what happens when the price in a perfectly competitive market is above firms\' average total cost?',
  [`New firms enter, because economic profits are earned`,`Existing firms exit, because the price is too high`,`Nothing, because price is above average variable cost`,`Firms shut down temporarily`,`The government sets a price ceiling`],0,
  `<p>Your course\'s slide: "P &gt; ATC: Enter because economic profits are earned." With free entry, profit above the normal level draws in new firms (Lesson 20). Lesson 24 shows that entry pushing the price back down.</p>`);
mc('l23-lr-supply','l23','According to your course, a perfectly competitive firm\'s long-run supply curve is',
  [`its marginal cost curve above average total cost`,`its marginal cost curve above average variable cost`,`its average total cost curve`,`its whole marginal cost curve`,`a vertical line at its current output`],0,
  `<p>Your course: "in the long run, a firm will remain in a market only if P ≥ ATC, the firm\'s long-run supply curve will be its MC above ATC." In the long run the firm must cover all its costs to stay (M6).</p><p>MC above AVC is the <b>short-run</b> supply curve.</p>`);
mc('l23-yoga2','l23','Your course textbook\'s Yoga Center pays $10,000 of rent a month either way. If it opens, it pays teachers $15,000 and earns revenue of $10,000. What should it do this month?',
  [`Shut down: opening would lose $15,000, versus $10,000 by closing`,`Stay open: it earns $10,000 of revenue`,`Stay open: its loss is only $5,000`,`Shut down, and lose nothing`,`Stay open, because the rent is already paid`],0,
  `<p>Open: $10,000 − ($10,000 + $15,000) = −$15,000. Closed: −$10,000 (the rent). Revenue doesn\'t cover the $15,000 of teacher pay, so opening makes the loss bigger. The textbook: "it should shut down immediately."</p><p>Closing still costs the $10,000 rent (M4); $5,000 is the difference between the two losses, not the loss itself.</p>`);
lazy('l23-gr-lr','l23',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm\'s cost curves; the lowest AVC is $2.40 and the lowest ATC is $6. The market price is $5:${sdg({ xmax:10.5, ymax:12, xt:[0,2,4,6,8,10], yt:[0,2.4,5,6,9,12], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Cost curves with a price line at 5 dollars between the minimum of AVC and the minimum of ATC',
    lines:[ ...l23curves(), {pts:[[0,5],[10.5,5]], c:'var(--ink)', label:'P = $5', lx:-4, ly:-6, anchor:'end', w:2} ] })}If the price stays at $5, what happens?`,
  options:[`It keeps producing in the short run, then exits in the long run`,`It shuts down at once and later re-enters`,`It earns profits that attract new firms`,`It exits right away, because price is below ATC`,`It stays in the market forever, because price covers AVC`], answer:0,
  explain:`<p>$5 is above the bottom of AVC ($2.40) but below the bottom of ATC ($6). In the short run, producing covers the variable costs and some fixed costs, so it keeps going. In the long run, when it can escape every cost, a price below ATC means losses, so it exits.</p><p>Exiting at once ignores the fixed costs it can\'t yet escape; staying forever ignores the long-run rule (M6).</p>` }));
mc('l23-avc-formula','l23','Which formula gives average variable cost?',
  [`Variable cost ÷ quantity`,`Variable cost × quantity`,`Total cost ÷ quantity`,`Change in variable cost ÷ change in quantity`,`Fixed cost ÷ quantity`],0,
  `<p>Average variable cost = variable cost ÷ quantity (Lesson 17). Your course\'s slide 201 prints "AVC = VC X Q," a typo. Total cost ÷ quantity is ATC; the change in VC ÷ the change in Q is marginal cost; fixed cost ÷ quantity is AFC.</p>`);
mc('l23-zeroprofit','l23','In your course textbook, the "zero-profit point" is where',
  [`marginal cost crosses average total cost, at the bottom of ATC`,`marginal cost crosses average variable cost`,`price equals marginal revenue`,`total revenue is zero`,`average fixed cost is lowest`],0,
  `<p>The textbook: "The point where MC crosses AC is called the zero-profit point." At a price equal to that minimum ATC, the firm\'s best output just covers all costs. The point where MC crosses AVC is the shutdown point.</p>`);
tf('l23-tf-lr','l23','In the long run, a competitive firm making economic losses will exit even if the price covers its average variable cost.',true,
  `<p>True. Covering variable costs is enough only while fixed costs can\'t be escaped. In the long run every cost is avoidable, so the firm compares price with average total cost and leaves if price stays below it. Your course: "the firm will exit if total revenue is less than total cost" (M6).</p>`);
gen('l23-g-cover','l23',()=>{
  /* price strictly between AVC and ATC, so the firm really is making a loss it reduces by producing */
  const Q = pick([50,80,100,200]), avc = pick([3,4,5,6]), afc = pick([1,2,3]), P = avc + pick([0.5,1,1.5,2,2.5].filter(x=>x<afc));
  const save = (P-avc)*Q;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. At its best output of <b>${Q}</b> units, a competitive firm\'s average variable cost is <b>$${avc}</b> and its average fixed cost is <b>$${afc}</b>. The price is <b>${d2(P)}</b>. Compared with shutting down, by how many dollars does producing <b>reduce</b> its loss this period?`, answer:save,
    explain:`<p>Producing: profit = (P − ATC) × Q = (${d2(P)} − $${avc+afc}) × ${Q} = ${usd((P-avc-afc)*Q)}. Shutting down: it loses its fixed cost, $${afc} × ${Q} = ${usd(afc*Q)}. Producing loses less by ${usd(save)}: the amount by which revenue exceeds variable cost, (P − AVC) × Q = (${d2(P)} − $${avc}) × ${Q} = <b>${usd(save)}</b>.</p><p>That surplus over variable cost goes toward the fixed cost. The common slip is giving the loss itself instead of the difference.</p>` };
});
mc('l23-pricetable','l23',`Made-up numbers. A competitive firm\'s minimum average variable cost is $8 and its minimum average total cost is $11. At which market price would it shut down in the short run?`,
  [`$7`,`$9`,`$10`,`$11`,`$12`],0,
  `<p>It shuts down only when price is below the $8 bottom of AVC: at <b>$7</b>. At $9 and $10 it loses money but covers its variable costs, so it keeps producing. At $11 it breaks even; at $12 it earns a profit (M2).</p>`);
mc('l23-mcshift','l23','Your course textbook: new costs raise a competitive firm\'s marginal cost at every output. What happens to its supply?',
  [`It supplies less at every price: its supply curve (MC above AVC) shifts left`,`It supplies more at every price`,`Nothing, because it is a price taker`,`It raises its price`,`Its supply curve becomes horizontal`],0,
  `<p>The firm\'s supply curve is its MC curve above AVC. The textbook: a cost change that "increases marginal costs at all levels of output ... will cause a perfectly competitive firm to produce less at any given market price." This is the link between Unit 2\'s supply shifters and costs.</p><p>Being a price taker means it can\'t change the price, not that its quantity can\'t change.</p>`);

/* ===== Lesson 23 quick checks ===== */
mc('l23c-shut','l23','Made-up example. A food truck shuts down for January. Which cost does it still pay that month?',
  [`The loan payment on the truck`,`Wages for its cooks`,`Food it would have cooked`,`Gas for driving to events`,`Nothing, because it is closed`],0,
  `<p>The truck loan is a fixed cost: owed whether or not it sells anything. Wages, food and gas are variable costs that stop when production stops.</p>`);
mc('l23c-rule','l23','Made-up numbers. A competitive firm\'s fixed cost is $500. At its best output, revenue would be $1,200 and variable cost $1,000. What should it do in the short run?',
  [`Produce: it loses $300 instead of $500`,`Shut down: it is losing money`,`Produce: it earns a $200 profit`,`Shut down: its loss would be zero`,`Produce: it earns $1,200`],0,
  `<p>Producing: $1,200 − $1,000 − $500 = −$300. Shutting down: −$500. Revenue covers variable cost, so producing loses less.</p>`);
mc('l23c-supply','l23','In your course textbook, the raspberry farm\'s minimum average variable cost is $2.05. How many packs does it supply at a price of $1.90?',
  [`Zero`,`40 packs`,`About 30 packs`,`100 packs`,`It depends on its fixed cost`],0,
  `<p>$1.90 is below the $2.05 shutdown point, so it shuts down and supplies nothing. Its supply curve is MC only above the bottom of AVC.</p>`);
mc('l23c-lr','l23','Made-up numbers. In a competitive industry, price is $12 and every firm\'s minimum average total cost is $10. What happens in the long run?',
  [`Firms enter, because they earn economic profit`,`Firms exit, because price is too high`,`Nothing changes`,`Firms shut down temporarily`,`Firms raise their prices to $14`],0,
  `<p>P &gt; ATC means economic profit, which attracts entry (your course\'s long-run table). Entry will push the price down (Lesson 24).</p>`);
mc('l23c-lrs','l23','For the textbook\'s raspberry farm, the bottom of average total cost is $3.20 and the bottom of average variable cost is $2.05. Below what price does the farm leave in the long run?',
  [`$3.20`,`$2.05`,`$4.00`,`$1.60`,`$62`],0,
  `<p>In the long run the farm must cover all costs, so it stays only if P ≥ ATC: its long-run supply starts at the $3.20 bottom of ATC. $2.05 is the short-run shutdown price.</p>`);
mc('l23c-skill','l23','Made-up numbers. Price $6, minimum AVC $7, minimum ATC $9. What should a competitive firm do?',
  [`Shut down now`,`Produce at a loss in the short run`,`Produce and earn a profit`,`Raise its price to $9`,`Produce where price equals ATC`],0,
  `<p>Price is below the bottom of AVC, so it can\'t cover variable costs: shut down and lose only fixed cost.</p>`);

/* Course materials checked 2026-10-28: video 5.2 transcript, middle (short run: produce or temporarily shut down; "a temporary shutdown is not the same thing as exiting";
   shut down when price is below AVC; "the short-run supply curve for the firm is going to be the marginal cost curve at any point above average variable cost"; long run: exit if P < ATC, enter if P > ATC;
   "the firm's long run supply curve is going to be the marginal cost curve above average total cost"), Module 5 slides 201-205 (slide 201 "AVC = VC X Q" typo);
   course textbook §8.2 (Yoga Center Table 8.5; raspberry farm at $2.20 and $1.80; shutdown point $2.05; zero-profit point; Figure 8.7 zones; MC = supply; cost shifts) and §8.3 (entry, exit);
   CLEP outline and sample question 5 (shutdown); Econlib, Lemieux (rising MC → upward-sloping supply). */
const L23TAGS = {
  'l23-shut-rule':['MS5 OS82 CBS','pcsr','terms','M2'], 'l23-yoga':['OS82','pcsr','data','M1 M4'], 'l23-g-loss':['OS82 MS5','pcsr','data','M4 M1'],
  'l23-tf-shut-atc':['OS82','pcsr','terms','M2'], 'l23-rasp180':['OS82','pcsr','data','M4'], 'l23-gr-zones':['OS82 MS5','pcsr','graphs','M2 M1'],
  'l23-sr-supply':['MS5 OS82','pcsr','terms','M5'], 'l23-tf-exit':['MS5','pcsr','terms','M3'], 'l23-lr-exit':['MS5 OS83','pclr','models','M6'],
  'l23-g-decide':['MS5 OS82','pcsr','models','M2 M1'], 'l23-gr-supply':['MS5 OS82','pcsr','graphs','M5'], 'l23-loss-fc':['MS5 OS82','pcsr','data','M4'],
  'l23-shut-def':['MS5','pcsr','terms','M3 M4'], 'l23-why-vc':['MS5','pcsr','models','M2'], 'l23-tf-loss0':['OS82','pcsr','terms','M4'],
  'l23-rasp220':['OS82','pcsr','data','M2'], 'l23-g-shutprice':['OS82 MS5','pcsr','data',''], 'l23-tf-supply':['MS5 OS82','pcsr','terms','M5'],
  'l23-lr-enter':['MS5 ELPR','pclr','terms',''], 'l23-lr-supply':['MS5','pclr','terms','M6'], 'l23-yoga2':['OS82','pcsr','data','M4'],
  'l23-gr-lr':['MS5 OS83','pclr','graphs','M6'], 'l23-avc-formula':['MS5','pcsr','terms',''], 'l23-zeroprofit':['OS82','pcsr','terms',''],
  'l23-tf-lr':['MS5 OS83','pclr','terms','M6'], 'l23-g-cover':['OS82','pcsr','data',''], 'l23-pricetable':['CBS OS82','pcsr','data','M2'], 'l23-mcshift':['OS82 ELL','pcsr','models',''],
  'l23c-shut':['MS5','pcsr','models','M4'], 'l23c-rule':['OS82','pcsr','data','M1'], 'l23c-supply':['OS82','pcsr','data','M5'],
  'l23c-lr':['MS5','pclr','models',''], 'l23c-lrs':['MS5 OS82','pclr','data','M6'], 'l23c-skill':['MS5 OS82','pcsr','models','M2']
};
u5tag(L23TAGS);

U5_CARDS.l23 = [
  ['Shutdown (temporary)','What does it mean for a firm to shut down in the short run?','It produces nothing for now: no revenue, no variable costs, but it still pays its fixed costs and stays in the industry.','The Yoga Center closes for a month but still owes $10,000 rent.','Not the same as exiting (your course).'],
  ['Shutdown rule','When should a perfectly competitive firm shut down in the short run?','When price is below the minimum of average variable cost (revenue can\'t cover variable cost).','Raspberry farm: below $2.05 a pack.','Not when P < ATC; that is just a loss.'],
  ['Producing at a loss','Why might a firm keep producing while losing money?','If price covers average variable cost, revenue pays all variable costs and part of the fixed costs, so the loss is smaller than the fixed cost it would lose by closing.','Raspberry farm at $2.20: loses $56 open vs $62 shut.','Compare the two losses.'],
  ['Loss from shutting down','What is a firm\'s loss if it shuts down in the short run?','Its fixed cost.','A firm with $800 of fixed cost loses $800.','Not zero.'],
  ['Shutdown point','What is the shutdown point?','Where marginal cost crosses average variable cost, at the bottom of AVC.','Raspberry farm: about $2.05.','Uses AVC, not ATC.'],
  ['Zero-profit point','What is the zero-profit (break-even) point?','Where marginal cost crosses average total cost, at the bottom of ATC.','Raspberry farm: $3.20.','At that price, economic profit is zero (a normal profit).'],
  ['Short-run supply curve','What is a competitive firm\'s short-run supply curve?','Its marginal cost curve above the minimum of average variable cost; zero output below that.','At each price above $2.05, the raspberry farm supplies where P = MC.','Not the whole MC curve.'],
  ['Exit','What is exit, and when does it happen?','Leaving the industry for good, in the long run, when price stays below average total cost (economic losses).','A farm whose price stays at $2.50 (below its $3.20 ATC) leaves when its lease ends.','Covering AVC is not enough in the long run.'],
  ['Entry','When do new firms enter a perfectly competitive industry?','In the long run, when price is above average total cost (economic profit).','Price $12, minimum ATC $10: firms enter.','Free entry is one of the conditions of perfect competition.'],
  ['Long-run supply (firm)','What is a competitive firm\'s long-run supply curve, according to your course?','Its marginal cost curve above average total cost.','Raspberry farm: MC above $3.20.','Short run uses AVC; long run uses ATC.'],
  ['Short run vs long run rules','Which average cost does each decision use?','Short run: compare P with AVC (fixed costs unavoidable). Long run: compare P with ATC (all costs avoidable).','P between AVC and ATC: produce now, exit later.','Mixing them up is the most common error.'],
  ['Cost changes and supply','What happens to a competitive firm\'s supply if its marginal cost rises at every output?','It supplies less at every price: its supply curve shifts left.','Higher wages or input prices.','The price taker can\'t pass it on by raising its own price.']
];

Object.assign(U5_WRITE, {
  'w-l23-1':{lesson:'l23',prompt:'Using your course textbook\'s Yoga Center or raspberry farm, explain why a firm that is losing money might still keep producing in the short run, and when it should shut down instead.',
    model:'In the short run some costs are fixed: the Yoga Center owes $10,000 of rent whether it opens or not. So the choice is not between a loss and no loss; it is between two losses. If it opens and earns $20,000 while paying $15,000 to teachers, it loses $5,000, which is better than the $10,000 it loses by closing. Its revenue covers the variable cost and pays part of the rent. But if revenue were only $10,000, opening would lose $15,000, worse than closing. The rule is to keep producing while price covers average variable cost (revenue covers variable cost) and to shut down when it does not. Price below average total cost means a loss, but not by itself a reason to shut down.',
    checklist:['Explains that fixed costs must be paid either way in the short run','Compares the loss from producing with the loss from shutting down (fixed cost)','States the rule: shut down when price is below average variable cost','Uses numbers from the textbook example correctly']},
  'w-l23-2':{lesson:'l23',prompt:'Explain the difference between the short-run and long-run decisions of a perfectly competitive firm, and how each gives the firm a supply curve.',
    model:'In the short run a firm decides whether to produce or shut down temporarily. Its fixed costs are paid either way, so it compares price with average variable cost: it produces where P = MC as long as P is at least AVC, and shuts down below that. So its short-run supply curve is its marginal cost curve above the minimum of AVC. In the long run there are no fixed costs, so the firm decides whether to stay in the market or exit, and outsiders decide whether to enter. A firm stays only if price covers average total cost; it exits if P is below ATC, and firms enter if P is above ATC. So, as your course puts it, the firm\'s long-run supply curve is its marginal cost curve above ATC. The raspberry farm, for example, shuts down below $2.05 but leaves the industry if the price stays below $3.20.',
    checklist:['Describes the short-run choice (produce or shut down) and the AVC test','Describes the long-run choice (stay, exit or enter) and the ATC test','States both supply curves: MC above AVC (short run) and MC above ATC (long run)','Explains why the tests differ (fixed costs unavoidable only in the short run)']}
});

U5_PLAN.l23 = {
  core:['l23-shut-rule','l23-yoga','l23-g-loss','l23-tf-shut-atc','l23-rasp180','l23-gr-zones','l23-sr-supply','l23-tf-exit','l23-lr-exit','l23-g-decide','l23-gr-supply','l23-loss-fc'],
  more:['l23-shut-def','l23-why-vc','l23-tf-loss0','l23-rasp220','l23-g-shutprice','l23-tf-supply','l23-lr-enter','l23-lr-supply','l23-yoga2','l23-gr-lr','l23-avc-formula','l23-zeroprofit','l23-tf-lr','l23-g-cover','l23-pricetable','l23-mcshift']
};

U5_LESSONS.push({ id:'l23', unit:5, title:'Perfect Competition: Shutdown, Exit and the Firm\'s Supply Curve', mins:45, src:'Modern States video 5.2 (middle part) and Module 5 slides 201-205 · Course textbook (OpenStax) §8.2-§8.3',
  sources:['MS5','OS82','OS83','CB','CBS','ELL','ELPR'],
  oneline:'In the short run a competitive firm keeps producing as long as price covers average variable cost, even at a loss; in the long run it stays only if price covers average total cost. Those rules turn its marginal cost curve into its supply curve.',
  body:`
<p>Lesson 22 showed a ${dt('price-taker','price taker')} choosing output where P = MC. But what if, even at its best output, the price is too low to cover its costs? This lesson adds the firm\'s two "should I be here at all?" decisions: shut down for now, and leave for good.</p>

<h2>Short run: produce or shut down for now?</h2>
<!-- src: MS5 (video 5.2: "when the firm is deciding what to do in the short run it is deciding whether or not it should produce or should it temporarily shut its production down ... a temporary shutdown is not the same thing as exiting the market. What's happening here is that temporarily the firm has decided to suspend production"; slide 201: "Must still pay fixed costs; No longer pays variable costs, no longer receives revenue"); OS82 (Yoga Center: rent $10,000 a month; teachers $15,000; scenarios 1-3; "shutting down can reduce variable costs to zero, but in the short run, the firm has already paid for fixed costs") -->
<p>In the short run a losing firm has a choice: keep producing, or ${dt('shutdown','<b>shut down</b>')} temporarily. Your course: "a temporary shutdown is not the same thing as exiting the market." A shut-down firm stops paying ${dt('variable-cost','variable costs')} and stops earning revenue, but it "must still pay ${dt('fixed-cost','fixed costs')}" (Lesson 17).</p>
${FIG5.l23cards()}
<p><b>Worked example: your course textbook\'s Yoga Center.</b> It rents space for $10,000 a month under a contract. Opening for the month means paying teachers $15,000.</p>
<div class="math">Shut down: profit = 0 − $10,000 = <b>−$10,000</b> (any month)<br>Open, revenue $10,000: profit = $10,000 − ($10,000 + $15,000) = <b>−$15,000</b> → close<br>Open, revenue $20,000: profit = $20,000 − ($10,000 + $15,000) = <b>−$5,000</b> → open</div>
${FIG5.l23yoga()}
<p><b>Why it isn\'t "lose money, so close":</b> the rent is owed either way, so closing can\'t save it. The only question is whether opening brings in more than it adds in cost. In the third scenario revenue covers the teachers with $5,000 left toward the rent.</p>
<div data-check="l23c-shut"></div>

<h2>The shutdown rule: price below average variable cost</h2>
<!-- src: MS5 (video 5.2: shut down "when the price of the good is going to be below the average variable cost. What this is telling us is that the revenue that they can generate is going to be not enough to cover their variable costs. In the short run the firm still has to pay their fixed costs so therefore it is going to base its decision on what is happening with variable costs"; slide 201: "SHUTDOWN WHEN: Total Revenue < Variable Cost ... Shutdown: P < AVC" [the slide prints "AVC = VC X Q"; average variable cost is VC ÷ Q]); OS82 (raspberry farm at $2.20: 50 packs, loss $56, continues; at $1.80: 40 packs, revenue $72, cost $144, loss $72 vs fixed cost $62, shut down; minimum AVC $2.05; shutdown point; zero-profit point; Figure 8.7 three zones); CBS (sample question 5) -->
<p>The Yoga Center\'s test generalizes. Produce if revenue covers variable cost; shut down if it doesn\'t. Divide both sides by quantity and you get your course\'s rule: shut down when <b>P &lt; AVC</b>, where AVC is ${dt('avc','average variable cost')} (Lesson 17).</p>
<div class="math">Shut down when: ${dt('total-revenue','total revenue')} &lt; variable cost, that is, P × Q &lt; AVC × Q, that is, <b>P &lt; AVC</b></div>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a rideshare driver who leases a car for $300 a month. The lease is owed whether she drives or not. A trip is worth taking if the fare covers the gas and her time, even if it doesn\'t help pay the lease. If fares fall below the cost of gas, every trip makes her worse off, so she parks the car for now, but she still owes the $300. The lease is the fixed cost; the gas is the variable cost.</p></div>
<p class="small muted">Your course\'s slide 201 writes "AVC = VC X Q." That is a typo: average variable cost is variable cost ÷ quantity (Lesson 17).</p>
<p><b>Worked example: your course textbook\'s raspberry farm</b> (fixed cost $62).</p>
<div class="math">Price $2.20: P = MC at 50 packs → revenue $110 − total cost $166 = <b>−$56</b>; shutting down = −$62 → <b>keep producing</b> (P $2.20 &gt; AVC $2.08)<br>Price $1.80: P = MC at 40 packs → revenue $72 − total cost $144 = <b>−$72</b>; shutting down = −$62 → <b>shut down</b> (P $1.80 &lt; AVC $2.05)</div>
${FIG5.l23zones()}
<p>Check: the farm\'s lowest average variable cost is $2.05, the ${dt('shutdown-point','<b>shutdown point</b>')}. The bottom of average total cost, $3.20, is the ${dt('zero-profit-point','<b>zero-profit point</b>')}. Try any price below.</p>
<div data-widget="shutdown"></div>
<p>What to notice: between $2.05 and $3.20 the red "producing" loss is always smaller than the $62 fixed cost. Below $2.05 it is bigger, and the farm should close.</p>
<div data-check="l23c-rule"></div>

<h2>The firm\'s short-run supply curve</h2>
<!-- src: MS5 (video 5.2: "at any price above P1 it's going to continue to produce ... the firm will produce according to the point where marginal revenue is equal to marginal cost. Therefore this is the short-run supply curve ... the short-run supply curve for the firm is going to be the marginal cost curve at any point above average variable cost"; slide 202); OS82 ("the marginal cost curve above the minimum point on the average variable cost curve becomes the firm's supply curve"; cost increases shift MC left and the firm produces less at any price); ELL (Lemieux: rising marginal cost means "the supply curve ... has a positive slope") -->
<p>Put Lesson 22 and the shutdown rule together. At any price above the bottom of AVC, the firm produces where P = MC. Below it, the firm produces zero. So the firm\'s ${dt('sr-supply','<b>short-run supply curve</b>')} is "the marginal cost curve at any point above average variable cost" (your course).</p>
${FIG5.l23supply()}
<p><b>Why supply slopes up:</b> ${dt('marginal-cost','marginal cost')} rises with output (diminishing returns), so the firm will make more only if the price rises. Econlib\'s Lemieux: "producers will be incited to increase production <i>only if</i> the price they get increases."</p>
<p><b>So what:</b> anything that raises marginal cost shifts this supply curve left. Your course textbook: a cost increase "will cause a perfectly competitive firm to produce less at any given market price." That is where Unit 2\'s supply shifters come from.</p>
<div data-check="l23c-supply"></div>

<h2>Long run: enter, stay or exit?</h2>
<!-- src: MS5 (video 5.2: "In the long run the firm has to decide between continuing to produce or permanently exiting the market. So if it wants to exit the market it is going to make no profits. It means that exiting the market total revenue is equal to 0 and total cost is equal to 0. Therefore the firm will exit if total revenue is less than total cost, or in other words the price is below average total cost ... the firm will enter if the price is above average total cost"; slides 203-204: P > ATC enter; P = ATC no entry or exit; P < ATC exit); OS83 (entry: "profits are a red cape"; exit: "Losses are the black thundercloud"); ELPR (Thurow: entry until profits fall to what investment earns elsewhere) -->
<p>In the long run nothing is fixed, so a firm that leaves pays nothing at all. Your course: when a firm exits, "total revenue is equal to 0 and total cost is equal to 0." So it stays only if revenue covers <b>all</b> its costs: price at least ${dt('average-cost','average total cost')}.</p>
${FIG5.l23rules()}
<p><b>Worked example: the raspberry farm.</b> At $2.50 a pack the farm keeps producing in the short run ($2.50 &gt; $2.05) but loses money ($2.50 &lt; $3.20). If the price is expected to stay there, it will ${dt('exit','<b>exit</b>')} when its lease and loans can be ended. At $4.00 it earns a profit, which tempts outsiders to ${dt('entry','<b>enter</b>')}.</p>
<p>Your course textbook pictures the two forces: profits are "a red cape that incites businesses to charge," and losses are "the black thundercloud that causes businesses to flee."</p>
<div data-check="l23c-lr"></div>

<h2>The firm\'s long-run supply curve</h2>
<!-- src: MS5 (video 5.2: "So the firm's long run supply curve is going to be the marginal cost curve above average total cost"; slide 205: "Because, in the long run, a firm will remain in a market only if P ≥ ATC, the firm's long-run supply curve will be its MC above ATC") -->
<p>The same reasoning as the short-run supply curve, with ATC in place of AVC: in the long run the firm produces where P = MC, but only at prices at or above the bottom of ATC. Your course: "the firm\'s long run supply curve is going to be the marginal cost curve above average total cost."</p>
${FIG5.l23lrs()}
<p><b>So what:</b> the gap between $2.05 and $3.20 is the zone where the farm survives for now but not for good. Lesson 24 shows what happens to the market price when many firms are in that zone at once.</p>
<div data-check="l23c-lrs"></div>

<h2>Profit, loss or shut down?</h2>
<!-- src: MS5, OS82, CBS (sample question 5: shut down in the short run if price is below average variable cost). Exam skill: classify a firm's situation from P, AVC and ATC. -->
<p>A favorite CLEP question gives a price and the firm\'s average costs and asks what it does. The move: compare price with the bottom of ATC first (profit or loss), then with the bottom of AVC (keep going or shut down).</p>
<div data-widget="shutsort"></div>
<p>What to notice: the middle zone, a loss but keep producing, is where most wrong answers come from. A loss alone is never a reason to shut down in the short run.</p>
<div data-check="l23c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L23TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"A firm that is losing money should shut down right away."</span>If price covers average variable cost, producing loses less than closing (raspberry farm at $2.20: −$56 vs −$62).</li>
<li><span class="wrong">"In the short run, shut down whenever price is below average total cost."</span>The short-run test uses average <b>variable</b> cost, because fixed costs are owed either way.</li>
<li><span class="wrong">"Shutting down means leaving the industry."</span>A shutdown is temporary and the firm still pays fixed costs; exit is the long-run decision to leave.</li>
<li><span class="wrong">"A shut-down firm loses nothing."</span>It loses its fixed cost: the Yoga Center still owes its $10,000 rent.</li>
<li><span class="wrong">"A competitive firm\'s supply curve is its whole MC curve."</span>Only the part above the bottom of AVC; below that it supplies zero.</li>
<li><span class="wrong">"In the long run a firm stays as long as it covers its variable costs."</span>In the long run all costs are avoidable, so it stays only if price covers average total cost.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>In the short run a losing firm chooses between producing and a temporary <b>shutdown</b>, which still costs its fixed costs.</li>
<li>The <b>shutdown rule</b>: produce if P ≥ AVC (even at a loss); shut down if P &lt; AVC (raspberry farm: $2.05).</li>
<li>So the firm\'s <b>short-run supply curve</b> is its MC curve above the bottom of AVC, and it shifts when marginal cost changes.</li>
<li>In the long run firms <b>enter</b> when P &gt; ATC, stay when P = ATC and <b>exit</b> when P &lt; ATC.</li>
<li>Your course: the firm\'s <b>long-run supply curve</b> is its MC curve above ATC (raspberry farm: above $3.20).</li>
<li>On the exam, compare price with the bottom of ATC (profit or loss) and then with the bottom of AVC (produce or shut down).</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Short-run supply and shut-down decision" under ${dt('perfect-competition','perfect competition')}, and "Firm and market behaviors in short-run and long-run equilibria." Expect the College Board\'s own question shape: "A profit-maximizing firm will shut down in the short run if..." (answer: price below average variable cost), or a cost-curve graph with a price line to read.</p>
</div>`,
  deeper:`
<h3>Why the shutdown point is "about" $2.05</h3>
<p>The textbook\'s table gives average variable cost only every 10 packs; its lowest listed value is $2.05 at 40 packs. With a smooth curve the true minimum would sit a little to one side. At exactly $2.05, producing 40 packs loses $62, the same as shutting down, so the farm is indifferent.</p>
<h3>Business failures are part of the system</h3>
<p>Your course textbook notes that in 2011, 409,040 new U.S. firms "entered" and 470,376 failed, and argues that exits are "sometimes a necessary evil if a market-oriented system is going to offer a flexible mechanism for satisfying customers, keeping costs low, and inventing new products."</p>`,
  links:[ {k:'Textbook',t:'8.2 How Perfectly Competitive Firms Make Output Decisions',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions',w:'The Yoga Center, the shutdown point and the three zones of the marginal cost curve.'},
          {k:'Exam',t:'CLEP Principles of Microeconomics sample questions',s:'College Board',u:'https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf',w:'One official sample question asks exactly when a firm shuts down in the short run.'} ]
});
