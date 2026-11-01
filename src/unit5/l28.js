/* ===== Lesson 28 figures ===== */
/* Made-up monopolistic competitor used in Lesson 28's figures and widget: TC = 16 + q + 0.25q² (MC = 1 + 0.5q; ATC = 16/q + 1 + 0.25q, lowest $5 at q = 8, where MC = $5).
   Its own demand: P = a − 0.75q, so MR = a − 1.5q and MR = MC at q = (a − 1)/2. Checked by script:
   a 12 → q 5.5, P $7.875, ATC $5.284, profit $14.25 (short run, entry follows); a 9 → q 4, P $6 = ATC $6 (demand just touches ATC: long run), MC $3, excess capacity 8 − 4 = 4;
   a 8 → q 3.5, P $5.375, ATC $6.446, loss $3.75 (exit follows). */
const MCM = { atc:q=>16/q+1+0.25*q, mc:q=>1+0.5*q, q:a=>(a-1)/2, P:a=>a-0.75*(a-1)/2 };
const mcmCost = () => { const qs=[]; for(let q=1.6;q<=14;q+=0.2) qs.push(Math.round(q*10)/10);
  return [ {pts:qs.filter(q=>MCM.atc(q)<=12).map(q=>[q,MCM.atc(q)]).reverse(), c:'var(--muted)', label:'ATC', lx:6, ly:4, w:2}, {pts:[[0,1],[14,8]], c:'var(--accent)', label:'MC', lx:-4, ly:-6, anchor:'end'} ]; };
const mcmDem = (a, lab, old) => { const qe=Math.min(14, a/0.75), qm=Math.min(14, (a-1.4)/1.5); return [
  {a:[0,a], b:[qe, a-0.75*qe], label:lab?'D'+lab:'D', c:old?'var(--muted)':'var(--ink)', dash:old?'5 4':'', w:old?1.8:2.6, lx:-4, ly:-6, anchor:'end'},
  {a:[0,a], b:[qm, a-1.5*qm], label:old?'':(lab?'MR'+lab:'MR'), c:old?'var(--muted)':'var(--g2)', dash:old?'5 4':'', w:old?1.6:2.2, lx:5, ly:4} ]; };   /* MR stops just above the axis so its label clears the tick labels */

/* L28 V1: four ways to differentiate a product (textbook §10.1) */
FIG5.l28diff = () => fig(`<div class="u3split">
  <div class="u3col"><div class="u3step u3amb"><b>Physical</b></div><div class="u3step">"Unbreakable bottle, nonstick surface ... extra spicy"</div></div>
  <div class="u3col"><div class="u3step u3amb"><b>Location</b></div><div class="u3step">A gas station at a busy intersection</div></div>
  <div class="u3col"><div class="u3step u3amb"><b>Intangible</b></div><div class="u3step">Money-back guarantee, free delivery, a reputation for quality</div></div>
  <div class="u3col"><div class="u3step u3amb"><b>Perception</b></div><div class="u3step">Beer brands many people can\'t tell apart blindfolded</div></div></div>`,
  'Your course textbook\'s four kinds of product differentiation, with its own examples. Each gives a firm "a mini-monopoly on its particular style or flavor or brand name," but it still competes with many similar products.');

/* L28 V2: the demand curve each kind of firm faces (textbook §10.1 Figure 10.2; shapes only) */
FIG5.l28perc = () => figs([
  ['Perfect competitor', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'Flat demand', lines:[ {pts:[[0,5],[10,5]], c:'var(--ink)', label:'D', lx:-4, ly:-6, anchor:'end'} ] })],
  ['Monopolistic competitor', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'Gently sloping demand', lines:[ dem([0,7.5],[10,2.5]) ] })],
  ['Monopoly', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'Steep market demand', lines:[ dem([0,9.5],[8,0]) ] })]
], 'Shapes only, after your course textbook\'s Figure 10.2. A monopolistic competitor\'s demand slopes down, because its product is a bit different, but it is flatter (more elastic) than a monopoly\'s, because buyers have close substitutes. The textbook: if it raises its price, "it will not lose as many customers as would a perfectly competitive firm, but it will lose more customers than would a monopoly."');

/* L28 V3: Authentic Chinese Pizza (textbook §10.1 Table 10.1) */
FIG5.l28tbl = () => fig(atable(['Qty','Price','MR','MC','AC'],
  ACP.map(r=>[r.q, usd(r.p), r.mr===null?'–':usd(r.mr), r.mc===null?'–':usd(r.mc), usd2(r.ac)]), { hl:{2:{row:'u3z1'},3:{row:'u3z2'}}, cls:'compact u5tight' }),
  'Your course textbook\'s Authentic Chinese Pizza (Qty = pizzas). MR and MC are per pizza for each step of 10. They are equal ($10) on the step to 40 pizzas (darker row): price $16, average cost $14.50, profit ($16 − $14.50) × 40 = $60. Profit is also $60 at 30 pizzas (lighter row); the step from 30 to 40 adds as much revenue as cost. The textbook names 40.');

/* L28 V4: short run to long run as rivals enter (course slides 238-241; textbook Figure 10.4; made-up numbers MCM) */
FIG5.l28lr = () => figs([
  ['Short run: a profit', sdg({ xmax:14, ymax:12, xt:[0,4,5.5,8], yt:[0,5.28,7.88,12], xlab:'Output', ylab:'Dollars per unit', aria:'Firm with demand above ATC at 5.5 units, profit rectangle',
    areas:[{pts:[[0,MCM.atc(5.5)],[5.5,MCM.atc(5.5)],[5.5,7.875],[0,7.875]], c:'var(--accent)', o:0.35}],
    lines:[ ...mcmCost(), ...mcmDem(12,'₁') ], vls:[{q:5.5,p:7.875}], dots:[{q:5.5,p:7.875,label:'',c:'var(--ink)'}] })],
  ['Long run: rivals enter', sdg({ xmax:14, ymax:12, xt:[0,4,8], yt:[0,3,6,12], xlab:'Output', ylab:'Dollars per unit', aria:'Demand shifted left until it just touches ATC at 4 units and 6 dollars',
    lines:[ ...mcmCost(), ...mcmDem(12,'₁',true), ...mcmDem(9,'₂') ], vls:[{q:4,p:6}],
    dots:[{q:4,p:6,label:'P = ATC',c:'var(--ink)',lx:8,ly:-14},{q:4,p:3,label:'',c:'var(--accent)'}] })]
], 'Made-up numbers. First panel: the firm\'s demand (D₁) is high enough that at its MR = MC output (5.5 units) the price, $7.88, is above ATC, $5.28: a profit of $14.25. Second panel: profits draw in rivals with similar products, so each firm\'s demand shifts left (to D₂) until it just touches ATC: 4 units at $6, zero economic profit. The price is still above MC ($3).');

/* L28 V5: markup and excess capacity in the long run (course slide 246; textbook "Monopolistic Competition and Efficiency") */
FIG5.l28excess = () => fig(sdg({ xmax:14, ymax:12, xt:[0,4,8,12], yt:[0,3,6,12], xlab:'Output', ylab:'Dollars per unit', aria:'Long-run monopolistic competitor at 4 units; lowest ATC at 8 units; markup between 6 and 3 dollars',
  lines:[ ...mcmCost(), ...mcmDem(9).slice(0,1) ], vls:[{q:4,p:6},{q:8,p:5}],
  spans:[{q1:4,q2:8,p:1.2,label:'excess capacity',c:'var(--bad)'},{q:3.4,p1:3,p2:6,label:'markup',lx:-6,ly:4,anchor:'end',c:'var(--g2)'}],
  dots:[{q:4,p:6,label:'',c:'var(--ink)'},{q:4,p:3,label:'',c:'var(--accent)'},{q:8,p:5,label:'min ATC',c:'var(--muted)',lx:8,ly:-8}] }),
  'The same made-up firm in the long run. It produces 4 units at $6, where price equals ATC (zero profit). Two differences from perfect competition: the price is above marginal cost ($6 against $3), a markup; and it produces less than the 8 units where ATC is lowest ($5), so it has excess capacity. Your course: monopolistic competitors "have some excess capacity and mark up because have some price control."');

/* L28 V6: two ways advertising can work (textbook §10.1 "How does advertising impact monopolistic competition?"; shapes only) */
FIG5.l28ads = () => figs([
  ['Steeper (less elastic)', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'Demand pivoting to become steeper after advertising',
    lines:[ oldL([0,7],[10,2],''), dem([1.2,9.5],[7.4,2.5],'') ], labels:[[0.3,7.7,'before','var(--muted)','start'],[2.5,9.4,'after','var(--ink)','start']] })],
  ['Shifts right (more demand)', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'Demand shifting right after advertising',
    lines:[ oldL([0,6.5],[6.5,0],''), dem([0,9],[9,0],'') ], labels:[[0.3,5.5,'before','var(--muted)','start'],[0.8,9.3,'after','var(--ink)','start']], arrows:[{a:[3.4,3.4],b:[4.8,4.8],c:'var(--ok)'}] })]
], 'Shapes only. Your course textbook: advertising "causes a firm\'s perceived demand curve to become more inelastic (that is, it causes the perceived demand curve to become steeper); or advertising causes demand for the firm\'s product to increase (that is, it causes the firm\'s perceived demand curve to shift to the right). In either case, a successful advertising campaign may allow a firm to sell either a greater quantity or to charge a higher price, or both."');

/* L28 V7: the four market structures side by side (CLEP outline topic 2; course slides; textbook ch. 8-10) */
FIG5.l28four = () => fig(atable(['Structure','Long run'], [
  ['<b>Perfect competition</b><br><span class="small">Many sellers, identical product, free entry; price taker (P = MR)</span>','Zero profit; P = MC = minimum ATC: allocatively and productively efficient'],
  ['<b>Monopolistic competition</b><br><span class="small">Many sellers, differentiated products, free entry; some price control</span>','Zero profit (P = ATC), but P &gt; MC and excess capacity'],
  ['<b>Oligopoly</b><br><span class="small">A few interdependent sellers, barriers to entry</span>','Profits can last; between monopoly (collude) and competition (cheat)'],
  ['<b>Monopoly</b><br><span class="small">One seller, no close substitutes, barriers to entry</span>','Profits can last; P &gt; MR = MC; deadweight loss']
], { cls:'compact wrap' }),
  'A summary built from Lessons 22 to 28 (your course\'s videos 5.2 to 5.5 and your course textbook, chapters 8 to 10). Only perfect competition ends up both allocatively (P = MC) and productively (minimum ATC) efficient.');

/* ===== Lesson 28: Monopolistic Competition (Modern States video 5.5; Module 5 slides 235-246) =====
   Common mistakes: M1 monopolistic competitors keep economic profits in the long run · M2 in the long run they act exactly like perfect competitors (P = MC, lowest ATC)
   M3 when rivals enter, each firm's demand shifts right (or its supply shifts) · M4 only monopolistic competitors advertise
   M5 excess capacity means unsold goods piling up · M6 a monopolistic competitor faces the whole market demand curve, like a monopoly */

mc('l28-def','l28','Which set of features describes monopolistic competition in your course?',
  [`Many buyers and sellers, similar but differentiated products, and free entry and exit`,`Many sellers of an identical product and free entry`,`A few interdependent sellers behind barriers to entry`,`One seller with no close substitutes`,`Many sellers with government-set prices`],0,
  `<p>Your course (slide 236): "Have many buyers and sellers; Sell similar but differentiated products; Free entry and exit in the market." So firms "have some price control." Identical products are perfect competition; a few sellers is oligopoly.</p>`);
mc('l28-diff','l28','A gas station at a busy intersection sells more than one on a quiet side street, even at the same price. Which kind of product differentiation is this, in your course textbook\'s terms?',
  [`Location`,`Physical aspects of the product`,`Intangible aspects, such as a guarantee`,`Perception created by advertising`,`It isn\'t differentiation; the gasoline is identical`],0,
  `<p>The textbook lists four ways to differentiate: physical aspects, location, intangible aspects and perceptions. "A gas station located at a heavily traveled intersection can probably sell more gas, because more cars drive by that corner." The gasoline can be identical; where it is sold differs.</p>`);
mc('l28-perceived','l28','How does a monopolistic competitor\'s demand curve compare with a monopoly\'s?',
  [`Both slope down, but the monopolistic competitor\'s is more elastic because buyers have close substitutes`,`The monopolistic competitor\'s is flat, like a price taker\'s`,`They are the same market demand curve`,`The monopolistic competitor\'s is steeper because it has no rivals`,`The monopolistic competitor\'s slopes up`],0,
  `<p>Your course textbook: "Since there are substitutes, the demand curve facing a monopolistically competitive firm is more elastic than that of a monopoly." And "a monopolist faces the market demand curve and a monopolistic competitor does not": its demand is one firm\'s share (M6).</p>`);
mc('l28-pizza','l28','Your course textbook\'s Authentic Chinese Pizza has MR and MC per pizza of $17 and $6 (step to 20 pizzas), $14 and $8 (to 30), $10 and $10 (to 40), and $6 and $12 (to 50). Prices are $20, $18, $16 and $14 at 20, 30, 40 and 50 pizzas. What does it do?',
  [`Sells 40 pizzas at $16`,`Sells 40 pizzas at $10`,`Sells 50 pizzas at $14`,`Sells 20 pizzas at $20`,`Sells 60 pizzas at $12`],0,
  `<p>MR = MC ($10 = $10) on the step to 40, and the demand price for 40 is $16. The textbook: "MR and MC intersect at a quantity of 40 ... it should charge a price of $16 per pizza." It decides "in much the same way as a monopolist."</p><p>$10 is where MR meets MC, not the price. At 50 the extra pizzas add $6 each to revenue but $12 to cost.</p>`);
mc('l28-pizza-profit','l28','Authentic Chinese Pizza sells 40 pizzas at $16. Its average cost at 40 pizzas is $14.50. What is its profit, and what happens next?',
  [`$60, which will draw in rival restaurants`,`$640, which will draw in rivals`,`$60, which barriers to entry will protect`,`$240, because P − MC = $6`,`−$60, so it will exit`],0,
  `<p>Profit = ($16 − $14.50) × 40 = <b>$60</b> (textbook: revenue $640, cost $580). Unlike a monopoly, it has no barriers: "a monopolistic competitor who earns profits must expect the entry of firms with similar, but differentiated, products." $240 uses MC instead of AC.</p>`);
tf('l28-tf-lrprofit','l28','Because each monopolistic competitor has a mini-monopoly on its own product, it can keep earning economic profits in the long run.',false,
  `<p>False. Free entry means profits attract rivals with similar products until profits are zero. Your course: "in the long run because of free entry and exit into the market the long-run equilibrium is going to yield zero economic profits" (M1).</p>`);
mc('l28-entry','l28','A monopolistically competitive restaurant earns economic profits, and new restaurants open nearby. What happens to the original restaurant\'s demand curve?',
  [`It shifts left: at each price it sells less, until price equals average total cost`,`It shifts right, because the area gets busier`,`It becomes flat, as for a price taker`,`It doesn\'t change; only market supply shifts`,`It becomes vertical`],0,
  `<p>Your course textbook: "As more firms enter the market, the quantity demanded at a given price for any particular firm will decline, and the firm\'s perceived demand curve will shift to the left." Your course\'s slide 241: "As new firms enter → supply in the market goes up. But for each individual firm → demand goes down." Both views describe the same entry (M3).</p>`);
lazy('l28-gr-lr','l28',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A monopolistically competitive firm after rivals have finished entering:${sdg({ xmax:14, ymax:12, xt:[0,4,8,12], yt:[0,3,6,12], xlab:'Output', ylab:'Dollars per unit', aria:'Demand just touching ATC at 4 units and 6 dollars; MC 3 dollars there; ATC lowest at 8 units',
    lines:[ ...mcmCost(), ...mcmDem(9) ], vls:[{q:4,p:6}], dots:[{q:4,p:6,label:'',c:'var(--ink)'},{q:4,p:3,label:'',c:'var(--accent)'},{q:8,p:5,label:'',c:'var(--muted)'}] })}Which statement is true at its output of 4 units?`,
  options:[`Price ($6) equals ATC but is above MC ($3), and ATC is not at its lowest`,`Price equals MC and the lowest ATC, as in perfect competition`,`Price is above ATC, so the firm earns a profit`,`Price is below ATC, so the firm will exit`,`MR is above MC, so the firm should expand`], answer:0,
  explain:`<p>The demand curve just touches ATC at 4 units, so P = ATC = $6: zero economic profit. MR = MC there, and the price is above MC ($3): a markup. ATC is lowest ($5) at 8 units, so the firm has excess capacity. Your course: in the long run "P &gt; MC due to firm facing a downward sloping demand curve; P = ATC due to free entry and exit" (M2).</p>` }));
mc('l28-excess','l28','What does it mean that a monopolistic competitor has "excess capacity" in the long run?',
  [`It produces less than the quantity at which its average total cost would be lowest`,`It has unsold goods piling up in storage`,`It produces more than buyers want`,`It earns more than a normal profit`,`Its factory is shut down`],0,
  `<p>In long-run equilibrium its demand touches ATC on the downward-sloping part of the ATC curve. Your course textbook: firms "end up with a price that lies on the downward-sloping portion of the average cost curve, not at the very bottom." It could lower its average cost by producing more, but it can\'t sell more without cutting its price (M5).</p>`);
gen('l28-g-sr','l28',()=>{
  const Q = pick([30,40,50,60,80]), P = pick([12,14,15,16,18,20]), atc = P + pick([-4,-3,-2,-1.5,1,2,3]);
  const prof = (P-atc)*Q;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A monopolistically competitive bakery makes <b>${Q}</b> cakes a week, where MR = MC. Its demand says it can charge <b>$${P}</b> a cake, and its average total cost is <b>${d2(atc)}</b>. What is its weekly economic profit? (Type a negative number for a loss.) Then think: will bakeries enter or leave?`, answer:prof,
    explain:`<p>Profit = (P − ATC) × Q = ($${P} − ${d2(atc)}) × ${Q} = <b>${usd(prof)}</b>. ${prof>0?'A profit draws in new bakeries; each one\'s demand shifts left until P = ATC.':'A loss makes some bakeries leave; each remaining one\'s demand shifts right until P = ATC.'}</p><p>The common slip is using P × Q (${usd(P*Q)}), which is revenue.</p>` };
});
mc('l28-adv','l28','According to your course textbook, a successful advertising campaign by a monopolistic competitor can',
  [`make its demand curve steeper (less elastic) or shift it to the right, so it can sell more or charge more`,`make its demand curve perfectly flat`,`lower its marginal cost to zero`,`turn it into a price taker`,`only lower the price it can charge`],0,
  `<p>The textbook: advertising "causes a firm\'s perceived demand curve to become more inelastic ... or ... causes demand for the firm\'s product to increase." Either way, it "may allow a firm to sell either a greater quantity or to charge a higher price, or both." Econlib\'s Kasper adds that advertising lets sellers "inform buyers and save them some search costs."</p>`);
mc('l28-compare','l28','In long-run equilibrium, which market structure is both allocatively efficient (P = MC) and productively efficient (minimum ATC)?',
  [`Perfect competition only`,`Monopolistic competition only`,`Both perfect competition and monopolistic competition, since both earn zero profit`,`Monopoly`,`Oligopoly`],0,
  `<p>Your course textbook: monopolistic competition "does not display productive and allocative efficiency in either the short run ... nor in the long run." Zero profit is shared with perfect competition, but P &gt; MC and output is below minimum ATC (M2). Monopoly and oligopoly also price above MC.</p>`);
/* L28 more */
mc('l28-examples','l28','Which of these is your course textbook\'s example of monopolistic competition?',
  [`Restaurants: the U.S. has over 600,000, each with its own food and style`,`The Boeing and Airbus jet market`,`A town\'s water company`,`Wheat farming`,`The lysine cartel`],0,
  `<p>The textbook lists clothing stores, restaurants, grocery stores, golf balls and beer, and notes "There are over 600,000 restaurants in the United States." Boeing and Airbus are an oligopoly, water a natural monopoly, wheat perfect competition.</p>`);
tf('l28-tf-pmc','l28','In long-run equilibrium, a monopolistically competitive firm sets price equal to marginal cost, just like a perfectly competitive firm.',false,
  `<p>False. Its demand slopes down, so MR is below price, and MR = MC means P &gt; MC. Your course: in the long run firms operate at "P &gt; MC due to firm facing a downward sloping demand curve." It shares only the zero profit with perfect competition (M2).</p>`);
mc('l28-exit','l28','Made-up example. Monopolistically competitive nail salons in a town are losing money. In the long run,',
  [`some salons close, demand for each remaining salon rises, and losses shrink until price equals average total cost`,`all the salons close`,`the remaining salons cut prices to below marginal cost`,`new salons open`,`demand for each remaining salon falls`],0,
  `<p>Your course (slide 242): "firms exit market to avoid losses ... Increase in demand for each firm\'s differentiated good ... Increase in price for firms that stay in market until P = ATC." Exit shifts each survivor\'s demand right (M3).</p>`);
mc('l28-markup','l28','Your course says monopolistic competitors charge a "markup." What is it?',
  [`The amount by which price exceeds marginal cost`,`The amount by which price exceeds average total cost in the long run`,`A tax on differentiated products`,`The cost of advertising`,`The difference between MR and MC`],0,
  `<p>Your course: "there\'s going to be some markup over cost because price is greater than marginal cost and that\'s because they have some price control." In the made-up long-run example the price is $6 and MC $3. In the long run P = ATC, so the markup isn\'t a profit.</p>`);
lazy('l28-gr-sr','l28',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A monopolistically competitive firm in the short run:${sdg({ xmax:14, ymax:12, xt:[0,5.5,8], yt:[0,5.28,7.88,12], xlab:'Output', ylab:'Dollars per unit', aria:'Firm with demand above ATC at 5.5 units',
    areas:[{pts:[[0,MCM.atc(5.5)],[5.5,MCM.atc(5.5)],[5.5,7.875],[0,7.875]], c:'var(--accent)', o:0.35, label:[2.75,6.6,'?']}],
    lines:[ ...mcmCost(), ...mcmDem(12) ], vls:[{q:5.5,p:7.875}] })}What does the shaded area show, and what happens next?`,
  options:[`An economic profit of about $14.25, which will attract new firms and shift this firm\'s demand left`,`An economic profit that barriers to entry will protect`,`A loss, which will make firms exit`,`Total revenue, which will stay the same`,`Consumer surplus, which will grow as firms enter`], answer:0,
  explain:`<p>The rectangle runs from ATC ($5.28) up to the price ($7.88) across 5.5 units: about ($7.875 − $5.284) × 5.5 = $14.25. With free entry, rivals come in and this firm\'s demand shifts left until the profit is gone (M1, M3).</p>` }));
mc('l28-pigou','l28','Economist A. C. Pigou wrote in 1920 that advertising by competing firms may "simply neutralise one another." What did he mean?',
  [`If rivals spend equally to win each other\'s customers, they may end up where they started, having spent money for nothing`,`Advertising always raises total sales`,`Advertising lowers prices for everyone`,`Advertising makes products identical`,`Only one firm in a market can advertise`],0,
  `<p>Your course textbook quotes Pigou: such spending may "leave the industrial position exactly as it would have been if neither had expended anything." This is one reason critics call some product differentiation and advertising "socially wasteful."</p>`);
mc('l28-kasper','l28','Econlib\'s Kasper describes a useful side of advertising. What is it?',
  [`It informs buyers about products and saves them some search costs`,`It always lowers production costs`,`It lets firms become price takers`,`It guarantees higher quality`,`It removes the need for prices`],0,
  `<p>Kasper: advertising is "a means for sellers to inform buyers and save them some search costs." Your course textbook\'s view of advertising is more mixed: it can raise profits by differentiating products, but rival campaigns may cancel out.</p>`);
tf('l28-tf-adonly','l28','Advertising only happens in monopolistically competitive markets.',false,
  `<p>False. Your course\'s slide 246 says advertising works "only in M.C. markets," but your course textbook describes oligopolies like Coca-Cola and Pepsi, where "creating a brand name and marketing effort" is itself a barrier to entry. Monopolies advertise too. What is true is that a perfect competitor has no reason to advertise an identical product it can sell at the market price (M4).</p>`);
mc('l28-variety','l28','Your course textbook says monopolistic competition is not efficient. What benefit does it offer in return?',
  [`Variety and innovation: many kinds of products and firms competing on service and quality`,`The lowest possible prices`,`Zero advertising`,`Allocative efficiency in the short run`,`Guaranteed profits for firms`],0,
  `<p>The textbook: "Product differentiation is based on variety and innovation. Many people would prefer to live in an economy with many kinds of clothes, foods, and car styles." Whether markets produce the right amount of variety, it says, "may never be fully resolved."</p>`);
gen('l28-g-excess','l28',()=>{
  const qs = pick([6,8,10]), F = pick([2,4,8]) * qs * qs / 4, k = F/(qs*qs), cur = qs - pick([2,3,4]);
  const rows = []; for(let q=qs-4; q<=qs+2; q++) if(q>0) rows.push([q, d2(F/q + k*q)]);
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. A monopolistically competitive firm is in long-run equilibrium, producing <b>${cur}</b> units a day. Its average total cost at different outputs:${atable(['Units','ATC'], rows, { cls:'compact' })}How much excess capacity does it have (in units)?`, answer: qs-cur,
    explain:`<p>ATC is lowest at ${qs} units (${d2(F/qs + k*qs)}). The firm produces ${cur}, so its excess capacity is ${qs} − ${cur} = <b>${qs-cur}</b> units.</p><p>The common slip is reading the firm\'s own output, or the lowest cost, instead of the gap between the two (M5).</p>` };
});
mc('l28-vs-mono','l28','Your course textbook names two differences between a monopolistic competitor and a monopoly. Which pair is right?',
  [`Its demand depends on how many rivals it has rather than being the market demand, and it faces entry rather than barriers`,`It sets price where MR = MC; a monopoly doesn\'t`,`It is a price taker; a monopoly is a price maker`,`It never earns profits; a monopoly always does`,`Its MR curve lies above demand`],0,
  `<p>The textbook: "the monopolist\'s perceived demand curve is the market demand curve, while the perceived demand curve for a monopolistic competitor is based on the extent of its product differentiation and how many competitors it faces. Second, a monopolist is surrounded by barriers to entry ... but a monopolistic competitor who earns profits must expect the entry of firms" (M6).</p>`);
tf('l28-tf-unsold','l28','A monopolistic competitor with excess capacity has unsold goods piling up in its warehouse.',false,
  `<p>False. It sells everything it makes; the "excess" is capacity it doesn\'t use. It produces less than the output that would minimize average total cost, because selling more would mean cutting its price (M5).</p>`);
mc('l28-pizza-tie','l28','Your course textbook\'s Authentic Chinese Pizza: total revenue is $540 at 30 pizzas and $640 at 40; total cost is $480 at 30 and $580 at 40. It earns $60 at both 30 and 40 pizzas. Why are they equal?',
  [`The step from 30 to 40 pizzas adds $10 a pizza to revenue and $10 to cost, so it adds nothing to profit`,`Its price is the same at 30 and 40`,`Its average cost is the same`,`The textbook made an error`,`Marginal revenue is zero at 40`],0,
  `<p>MR = MC = $10 on that step, so profit is unchanged: $540 − $480 = $60 at 30 and $640 − $580 = $60 at 40. The textbook names 40, the end of the MR = MC step, as your course does with De Beers.</p>`);
mc('l28-lr-cond','l28','Which conditions describe a monopolistic competitor in long-run equilibrium?',
  [`MR = MC, P = ATC and P > MC`,`MR = MC, P = MC and P = minimum ATC`,`MR > MC and P > ATC`,`P = AVC and MR = MC`,`P < ATC and P = MC`],0,
  `<p>Your course: "the price is equal to average total cost, and the price is greater than marginal cost so we have some markup. But marginal revenue is equal to marginal cost." P = MC = minimum ATC is perfect competition (M2).</p>`);
mc('l28-regulate','l28','Your course\'s slide 245 says monopolistic competition has costs to society, as monopoly does. Why does it say regulation is not the answer?',
  [`There are too many firms to regulate`,`The firms earn huge profits`,`Regulation would make prices too low`,`The firms are natural monopolies`,`There is no deadweight loss`],0,
  `<p>Slide 245: "Because P &gt; MC → some costs to society as with monopoly outcome. Regulation of these firms would be very difficult → too many firms to regulate." Your course textbook adds that the loss is the same kind as monopoly\'s "but in this case to a lesser degree."</p>`);
mc('l28-golf','l28','Your course textbook: over 1,800 golf balls from more than 100 companies pass the U.S. Golf Association\'s tests, so they are "much more alike than different," yet makers have "a powerful incentive to persuade players that golf balls are highly differentiated." Which market structure is this?',
  [`Monopolistic competition: similar products differentiated in buyers\' minds`,`Perfect competition, since the balls are almost identical`,`Monopoly, since each brand is unique`,`Oligopoly, since a few companies make them all`,`A natural monopoly`],0,
  `<p>The textbook concludes that "golf ball manufacturers are monopolistically competitive": the products are close substitutes, but differentiation by brand and reputation gives each maker a little control over its price.</p>`);

/* ===== Lesson 28 quick checks ===== */
mc('l28c-diff','l28','Which product is most likely sold in a monopolistically competitive market?',
  [`Haircuts from the many salons in a city, each with its own style`,`Corn from thousands of farms`,`Electricity from the only power company`,`Large passenger jets`,`A patented medicine`],0,
  `<p>Many sellers, free entry, and services that differ by stylist, location and reputation.</p>`);
mc('l28c-perc','l28','A pizzeria in a town with many pizzerias raises its price by 10%. Compared with a town\'s only pizzeria raising its price by 10%, it will probably',
  [`lose more of its customers, because buyers can switch to similar pizzerias`,`lose all of its customers, because it is a price taker`,`lose fewer customers, because its pizza is unique`,`lose exactly as many customers`,`gain customers`],0,
  `<p>Its demand slopes down (its pizza is a bit different), but it is more elastic than a monopoly\'s, because rivals sell close substitutes (M6).</p>`);
mc('l28c-sr','l28','In the short run, a monopolistic competitor chooses output and price',
  [`like a monopoly: quantity where MR = MC, price from its demand curve`,`like a price taker: P = MC`,`where demand meets MC`,`at the lowest point of ATC`,`where MR = 0`],0,
  `<p>Your course: "In the short run ... market outcome looks similar to monopoly. Profit Max Point: MR = MC. Price &gt; MR = MC."</p>`);
mc('l28c-lr','l28','Monopolistic competitors in a city are earning economic profits. Over time,',
  [`new firms enter and each existing firm\'s demand shifts left until profits are zero`,`profits rise as the city grows`,`existing firms raise prices`,`firms merge into a monopoly`,`demand for each firm shifts right`],0,
  `<p>Free entry erodes the profit; each firm\'s share of buyers shrinks (M1, M3).</p>`);
mc('l28c-excess','l28','In long-run equilibrium, a monopolistic competitor\'s demand curve touches its ATC curve',
  [`on the downward-sloping part of ATC, to the left of its minimum`,`at the minimum of ATC`,`on the upward-sloping part of ATC`,`nowhere; demand is always above ATC`,`where ATC crosses MC`],0,
  `<p>The demand curve slopes down, so it can only just touch ATC where ATC also slopes down. That is why output is below the minimum-ATC quantity: excess capacity.</p>`);
mc('l28c-adv','l28','Which is your course textbook\'s view of advertising in monopolistic competition?',
  [`It aims to make buyers see a firm\'s product as different, which can raise sales or price, though rival ads may cancel out`,`It has no effect on demand`,`It always lowers prices`,`It is illegal`,`It makes the market perfectly competitive`],0,
  `<p>"Advertising is all about explaining to people, or making people believe, that the products of one firm are differentiated from the products of another firm." Pigou worried rival ads "neutralise one another."</p>`);
mc('l28c-skill','l28','Which statement is true of BOTH perfect competition and monopolistic competition in the long run?',
  [`Firms earn zero economic profit because of free entry and exit`,`Price equals marginal cost`,`Firms produce at minimum ATC`,`Firms are price takers`,`Firms face barriers to entry`],0,
  `<p>Free entry drives profit to zero in both. Only perfect competition also has P = MC and minimum ATC (M2).</p>`);

/* Course materials checked 2026-10-28: video 5.5 transcript and Module 5 slides 235-246 (characteristics; short run like monopoly; long run P > MC, P = ATC; entry: supply up, each firm's demand down; exit; welfare; excess capacity and markup; advertising slide);
   course textbook §10.1 (four kinds of differentiation; 600,000 restaurants; golf balls; perceived demand more elastic than monopoly; Authentic Chinese Pizza Table 10.1; entry and Figure 10.4; efficiency; variety; advertising, Pigou), §10.2 (Coke and Pepsi branding; tradeoffs).
   Cross-checks read: Econlib, Kasper, "Competition" (advertising informs buyers and saves search costs; differentiated products give a "market niche" that is "never entirely secure"). */
const L28TAGS = {
  'l28-def':['MS5 OS101','mcdif','terms',''], 'l28-diff':['OS101','mcdif','terms',''], 'l28-perceived':['OS101','mcmax','models','M6'],
  'l28-pizza':['OS101','mcmax','data',''], 'l28-pizza-profit':['OS101','mcmax','data','M1'], 'l28-tf-lrprofit':['MS5 OS101','mclr','terms','M1'],
  'l28-entry':['OS101 MS5','mclr','models','M3'], 'l28-gr-lr':['MS5 OS101','mclr','graphs','M2'], 'l28-excess':['OS101 MS5','mcexc','terms','M5'],
  'l28-g-sr':['OS101','mclr','data','M1'], 'l28-adv':['OS101 ELCO','mcdif','models','M4'], 'l28-compare':['OS101 OS84','mcexc','models','M2'],
  'l28-examples':['OS101','mcdif','terms',''], 'l28-tf-pmc':['MS5 OS101','mcexc','terms','M2'], 'l28-exit':['MS5 OS101','mclr','models','M3'],
  'l28-markup':['MS5','mcexc','terms',''], 'l28-gr-sr':['OS101 MS5','mclr','graphs','M1 M3'], 'l28-pigou':['OS101','mcdif','terms','M4'],
  'l28-kasper':['ELCO','mcdif','terms','M4'], 'l28-tf-adonly':['MS5 OS102','mcdif','terms','M4'], 'l28-variety':['OS101','mcexc','models',''],
  'l28-g-excess':['OS101 MS5','mcexc','data','M5'], 'l28-vs-mono':['OS101','mcmax','models','M6'], 'l28-tf-unsold':['OS101','mcexc','terms','M5'],
  'l28-pizza-tie':['OS101','mcmax','data',''], 'l28-lr-cond':['MS5','mclr','terms','M2'], 'l28-regulate':['MS5 OS101','mcexc','terms',''], 'l28-golf':['OS101','mcdif','models',''],
  'l28c-diff':['OS101','mcdif','terms',''], 'l28c-perc':['OS101','mcmax','models','M6'], 'l28c-sr':['MS5','mcmax','terms',''], 'l28c-lr':['MS5 OS101','mclr','models','M1 M3'],
  'l28c-excess':['OS101','mcexc','graphs','M5'], 'l28c-adv':['OS101','mcdif','terms','M4'], 'l28c-skill':['MS5 OS101','str','models','M2']
};
u5tag(L28TAGS);

U5_CARDS.l28 = [
  ['Monopolistic competition','What defines monopolistic competition?','Many buyers and sellers, similar but differentiated products, free entry and exit.','Restaurants, clothing stores, golf balls.','Firms have some price control.'],
  ['Product differentiation','What are your course textbook\'s four ways to differentiate a product?','Physical aspects, location, intangible aspects, and buyers\' perceptions.','A gas station at a busy corner (location).','Advertising can shape perceptions.'],
  ['Its demand curve','How does a monopolistic competitor\'s demand compare with a monopoly\'s?','Downward sloping but more elastic, because buyers have close substitutes; it is one firm\'s share, not the market\'s.','It loses more customers than a monopoly when it raises its price.','Not flat like a price taker\'s.'],
  ['Short run','How does a monopolistic competitor choose output and price?','Like a monopoly: MR = MC for quantity, demand for price.','Authentic Chinese Pizza: 40 at $16, profit $60.','Profits or losses are possible in the short run.'],
  ['Entry','What happens to a firm when rivals enter its market?','Its demand (and MR) shift left until P = ATC.','Your course: market supply rises; each firm\'s demand falls.','Exit does the reverse.'],
  ['Long-run equilibrium','What are the long-run conditions?','MR = MC, P = ATC (zero profit), P > MC.','Made-up example: 4 units at $6, MC $3.','Zero profit but not efficient.'],
  ['Markup','What is the markup?','The amount by which price exceeds marginal cost.','$6 price against $3 MC.','It reflects some price control, not long-run profit.'],
  ['Excess capacity','What is excess capacity?','Producing less than the quantity that minimizes ATC.','Made-up example: 4 units made, ATC lowest at 8.','Not unsold goods.'],
  ['Efficiency','Is monopolistic competition efficient?','No: P > MC (not allocatively efficient) and not at minimum ATC (not productively efficient).','Only perfect competition has both.','The loss is smaller than under monopoly.'],
  ['Advertising','How can advertising help a monopolistic competitor?','By making its demand steeper (less elastic) or shifting it right.','Kasper: it informs buyers and saves search costs.','Pigou: rival ads may "neutralise one another."'],
  ['Variety','What benefit offsets monopolistic competition\'s inefficiency?','Variety and innovation in products and service.','Many kinds of clothes, foods and car styles.','Whether there is too much variety is debated.'],
  ['Four structures','Which structures earn zero profit in the long run?','Perfect competition and monopolistic competition (free entry).','Monopoly and oligopoly can keep profits behind barriers.','Only perfect competition is fully efficient.']
];

Object.assign(U5_WRITE, {
  'w-l28-1':{lesson:'l28',prompt:'Explain how a monopolistically competitive firm moves from short-run profits to long-run equilibrium. Describe what happens to its demand curve, its profit, and the relationship between price, marginal cost and average total cost.',
    model:'In the short run a monopolistic competitor acts like a monopoly. It produces where marginal revenue equals marginal cost and charges the price its own demand curve allows. If that price is above average total cost, it earns an economic profit, as Authentic Chinese Pizza does at 40 pizzas and $16. Because entry is free, the profit attracts rivals with similar but different products. Each new rival takes some customers, so the original firm\'s demand curve and marginal revenue curve shift left. Entry continues until the demand curve just touches the average total cost curve, so price equals average total cost and economic profit is zero. At that point the firm still produces where MR = MC, and since its demand slopes down, its price is above marginal cost. The tangency is on the downward-sloping part of ATC, so the firm produces less than the output that minimizes average cost: it has excess capacity.',
    checklist:['Describes short-run choice (MR = MC, price from demand) and profit when P > ATC','Explains that entry shifts the firm\'s demand and MR left','States the long-run result: P = ATC, zero economic profit','Notes P > MC (markup) and excess capacity in the long run']},
  'w-l28-2':{lesson:'l28',prompt:'Compare monopolistic competition with perfect competition and with monopoly. Name one way it is like each and one way it differs from each.',
    model:'Monopolistic competition is like perfect competition in that there are many sellers and entry and exit are free, so firms earn zero economic profit in the long run. It differs because each firm sells a differentiated product and faces a downward-sloping demand curve, so in the long run its price is above marginal cost and it doesn\'t produce at the lowest point of average total cost. Perfect competition, by contrast, ends at P = MC = minimum ATC. Monopolistic competition is like monopoly in that each firm has some control over its price and chooses output where MR = MC, setting the price from its demand curve. It differs because a monopoly is protected by barriers to entry and can keep its profits, while a monopolistic competitor\'s profits are competed away by entry. Its demand is also more elastic than a monopoly\'s because buyers have close substitutes.',
    checklist:['Similarity with perfect competition: many sellers, free entry, zero long-run profit','Difference from perfect competition: P > MC and excess capacity','Similarity with monopoly: downward demand, MR = MC, some price control','Difference from monopoly: entry erodes profit; demand more elastic']}
});

U5_PLAN.l28 = {
  core:['l28-def','l28-diff','l28-perceived','l28-pizza','l28-pizza-profit','l28-tf-lrprofit','l28-entry','l28-gr-lr','l28-excess','l28-g-sr','l28-adv','l28-compare'],
  more:['l28-examples','l28-tf-pmc','l28-exit','l28-markup','l28-gr-sr','l28-pigou','l28-kasper','l28-tf-adonly','l28-variety','l28-g-excess','l28-vs-mono','l28-tf-unsold','l28-pizza-tie','l28-lr-cond','l28-regulate','l28-golf']
};

U5_LESSONS.push({ id:'l28', unit:5, title:'Monopolistic Competition', mins:50, src:'Modern States video 5.5 and Module 5 slides 235-246 · Course textbook (OpenStax) §10.1',
  sources:['MS5','OS84','OS101','OS102','ELCO','CB'],
  oneline:'Many firms sell similar but differentiated products with free entry. In the short run each acts like a small monopoly; in the long run entry drives profit to zero, but price stays above marginal cost and firms keep excess capacity.',
  body:`
<p>The last structure sits between ${dt('perfect-competition','perfect competition')} and ${dt('monopoly','monopoly')}. Your course: "lots and lots of buyers and lots and lots of sellers but each seller is selling a similar but slightly differentiated good."</p>

<h2>Many sellers, different products</h2>
<!-- src: MS5 (video 5.5: "each seller is selling a similar but slightly differentiated good. We still have free entry and exit ... the firm has some price control because their product is slightly different"; slide 236); OS101 ("many firms competing against each other, but selling products that are distinctive in some way"; clothing, restaurants, grocery stores, golf balls, beer; "over 600,000 restaurants"; "a mini-monopoly on its particular style or flavor or brand name"; four ways to differentiate: physical, location, intangible, perceptions; golf balls); ELCO (Kasper: "Differentiated products may give pioneering suppliers a 'market niche.' Such a niche is never entirely secure") -->
<p>${dt('monopolistic-competition','<b>Monopolistic competition</b>')} has many sellers and free entry, like perfect competition, but each firm sells a ${dt('differentiated-product','<b>differentiated product</b>')}. Your course textbook: each firm has "a mini-monopoly on its particular style or flavor or brand name," yet must "compete with other styles and flavors and brand names." There are over 600,000 restaurants in the United States.</p>
${FIG5.l28diff()}
<div data-check="l28c-diff"></div>

<h2>A demand curve between the extremes</h2>
<!-- src: OS101 (Figure 10.2; "Since there are substitutes, the demand curve facing a monopolistically competitive firm is more elastic than that of a monopoly"; "a monopolist faces the market demand curve and a monopolistic competitor does not") -->
<p>Because its product is a bit different, the firm can raise its price without losing every customer. Because close substitutes exist, it loses more customers than a monopoly would.</p>
${FIG5.l28perc()}
<p><b>The key difference from Lesson 25:</b> a monopoly faces the whole market\'s demand. A monopolistic competitor\'s demand is its own share, and that share depends on how many rivals it has.</p>
<div data-check="l28c-perc"></div>

<h2>The short run: acting like a small monopoly</h2>
<!-- src: MS5 (video 5.5: "their decisions look very similar to those of a monopoly ... They're going to produce at the point where marginal revenue is equal to marginal cost—let's call that point A—and they're going to set their price above marginal cost ... at point B"; slide 237: "Profit Max Point: MR = MC; Price > MR = MC"); OS101 (Authentic Chinese Pizza Table 10.1; MR = MC at 40, price $16; "total revenue is $640 and its total cost is $580, so profits are $60") -->
<p>Your course: in the short run "their decisions look very similar to those of a monopoly." Produce where MR = MC; charge what demand will pay.</p>
<p><b>Worked example: your course textbook\'s Authentic Chinese Pizza.</b></p>
${FIG5.l28tbl()}
<div class="math">MR = MC = $10 on the step to 40 pizzas → price from demand $16<br>Profit = ($16 − $14.50) × 40 = <b>$60</b></div>
<p>Check: revenue 40 × $16 = $640, cost $580, profit $60, as in the textbook.</p>
<div data-check="l28c-sr"></div>

<h2>The long run: entry erases the profit</h2>
<!-- src: MS5 (video 5.5: "more and more firms are going to enter ... this is going to cause a shift in the supply curve ... the price is going to reach a point where it's equal to the average total cost"; "both the demand curve shifts in and the marginal revenue curve shifts in"; exit: "the demand curve shifts up"; slides 239-244: "As new firms enter → supply in the market goes up. But for each individual firm → demand goes down"); OS101 ("As more firms enter the market, the quantity demanded at a given price for any particular firm will decline, and the firm's perceived demand curve will shift to the left"; long-run equilibrium where "the firm's perceived demand curve touches the average cost curve"; zero economic profit is not zero accounting profit). Source problem recorded: the course describes entry as "a shift in the supply curve" (market view) and then each firm's demand shifting in (firm view); both shown. -->
<p>Unlike a monopoly, a monopolistic competitor has no barriers, so ${dt('entry','entry')} and ${dt('exit','exit')} (Lesson 23) work as in perfect competition. Your course textbook: a firm earning profits "must expect the entry of firms with similar, but differentiated, products." Your course describes entry two ways: the <b>market</b> gets more sellers ("supply in the market goes up"), and <b>each firm\'s</b> demand falls as customers spread across more choices.</p>
<p><b>Worked example (made-up numbers).</b> A firm\'s ${dt('average-cost','average total cost')} is lowest, $5, at 8 units.</p>
<div class="math">Short run: demand P = 12 − 0.75q → MR = MC at 5.5 units, price $7.88, ATC $5.28 → profit ≈ <b>$14.25</b><br>Rivals enter; demand falls to P = 9 − 0.75q → MR = MC at 4 units, price $6 = ATC $6 → profit <b>$0</b></div>
${FIG5.l28lr()}
<p>Check: at 4 units ATC = 16/4 + 1 + 0.25 × 4 = $6, equal to the price. Losses work in reverse: firms exit, each survivor\'s demand shifts right, until P = ATC.</p>
<div data-widget="mcentry"></div>
<p>What to notice: profit is zero only where demand just touches ATC, and even there the price is above MC and output is below the 8 units where ATC is lowest.</p>
<div data-check="l28c-lr"></div>

<h2>Markup and excess capacity</h2>
<!-- src: MS5 (video 5.5: "firms are going to operate at a point where the price is greater than marginal cost—there's some markup—but because of the free entry and exit price is going to be equal to average total cost"; slide 238: "P > MC due to firm facing a downward sloping demand curve; P = ATC due to free entry and exit"; slide 245: "Because P > MC → some costs to society as with monopoly outcome. Regulation of these firms would be very difficult → too many firms to regulate"; slide 246: "Have some excess capacity and mark up"); OS101 ("firms end up with a price that lies on the downward-sloping portion of the average cost curve, not at the very bottom ... will not be productively efficient"; "When P > MC ... society loses the net benefit of those extra units. This is the same argument we made about monopoly, but in this case to a lesser degree"; benefits of variety; "may never be fully resolved"). Source problem recorded: the course says in the long run the firm "act[s] as a firm in perfect competition"; it shares only the zero profit. -->
<p>Your course says that in the long run the firm acts "as a firm in perfect competition." That is true of profit (zero) but not of efficiency. Two gaps remain.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a street with six coffee shops, each a little different. On a typical afternoon each one is half full. Every shop could serve more customers at a lower cost per cup, but it would have to cut its price to win them from the others, and its prices only just cover its costs. Half-empty tables at prices above the cost of one more cup are the markup and the excess capacity this section describes.</p></div>
${FIG5.l28excess()}
<p><b>${dt('markup','Markup')}:</b> price is above ${dt('marginal-cost','marginal cost')} ($6 against $3), because demand slopes down. So, as with monopoly, some units worth more than they cost aren\'t made: the market is not ${dt('allocative-efficiency','allocatively efficient')}, though your course textbook says the loss is smaller. <b>${dt('excess-capacity','Excess capacity')}:</b> the firm makes 4 units, not the 8 where ATC is lowest, so it is not ${dt('productive-efficiency','productively efficient')} either.</p>
<p><b>So what:</b> your course\'s slide 245 notes regulating this would be "very difficult → too many firms to regulate." And your course textbook points to a benefit perfect competition lacks: variety. "Many people would prefer to live in an economy with many kinds of clothes, foods, and car styles."</p>
<div data-check="l28c-excess"></div>

<h2>The role of advertising</h2>
<!-- src: OS101 ("Advertising is all about explaining to people, or making people believe, that the products of one firm are differentiated from the products of another firm"; steeper or shifts right; Pigou: may "simply neutralise one another"); OS102 (Coke and Pepsi: brand building as a barrier to entry); ELCO (Kasper: advertising "a means for sellers to inform buyers and save them some search costs"); MS5 (slide 246). Source problem recorded: slide 246 says advertising works "only in M.C. markets"; the textbook shows oligopolists advertise heavily too. -->
<p>Your course textbook: "Advertising is all about explaining to people, or making people believe, that the products of one firm are differentiated from the products of another firm." It can work two ways:</p>
${FIG5.l28ads()}
<p><b>Is it worth it?</b> Econlib\'s Kasper: advertising lets sellers "inform buyers and save them some search costs." The textbook quotes Pigou (1920): rival campaigns may "simply neutralise one another, and leave the industrial position exactly as it would have been." (Your course\'s slide says advertising works "only in M.C. markets"; the textbook\'s Coke and Pepsi show oligopolists advertise heavily too.)</p>
<div data-check="l28c-adv"></div>

<h2>Compare the four structures</h2>
<!-- src: CB (outline topic 2: characteristics of different market structures); MS5 (videos 5.2-5.5); OS84, OS92, OS101, OS102. Exam skill: match long-run outcomes (profit, P vs MC, minimum ATC) to the four structures. -->
<p>The CLEP often asks which structure fits a description, or which long-run outcome goes with which structure. Two questions sort most of them: is entry free (then long-run profit is zero), and is the firm a ${dt('price-taker','price taker')} (then P = MC)?</p>
${FIG5.l28four()}
<div data-widget="mcsort"></div>
<p>What to notice: "zero long-run profit" is not enough to say perfect competition; check for P = MC and minimum ATC.</p>
<div data-check="l28c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L28TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Each firm\'s mini-monopoly lets it keep profits in the long run."</span>Entry is free, so rivals with similar products compete the profit away.</li>
<li><span class="wrong">"In the long run it acts exactly like a perfect competitor."</span>Only profit is the same (zero). Price stays above MC, and output is below the minimum-ATC quantity.</li>
<li><span class="wrong">"When rivals enter, the firm\'s demand shifts right."</span>Each firm\'s demand shifts left. (Your course\'s "supply shifts" describes the whole market getting more sellers.)</li>
<li><span class="wrong">"Only monopolistic competitors advertise."</span>Oligopolists such as Coke and Pepsi advertise heavily; a perfect competitor is the one with no reason to.</li>
<li><span class="wrong">"Excess capacity means unsold goods."</span>It means producing less than the output where ATC is lowest; the firm sells what it makes.</li>
<li><span class="wrong">"It faces the market demand curve, like a monopoly."</span>Its demand is its own share and is more ${dt('elastic','elastic')}, because buyers have close substitutes.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Monopolistic competition</b>: many sellers, differentiated products (physical, location, intangible, perception), ${dt('free-entry','free entry')}.</li>
<li>Its <b>demand</b> slopes down but is more elastic than a monopoly\'s.</li>
<li><b>Short run</b>: MR = MC, price from demand; profit possible (Authentic Chinese Pizza: 40 at $16, $60).</li>
<li><b>Long run</b>: entry shifts each firm\'s demand left until P = ATC: zero profit, with MR = MC and P &gt; MC.</li>
<li>It keeps a <b>markup</b> (P &gt; MC) and <b>excess capacity</b> (output below minimum ATC): not efficient, but it offers variety.</li>
<li><b>Advertising</b> tries to make demand steeper or shift it right; rival ads may cancel out.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Product differentiation and role of advertising," "Profit maximization," "Short-run and long-run equilibrium" and "Excess capacity and inefficiency," plus "Characteristics of different market structures." Expect a long-run graph where demand touches ATC, a question on excess capacity, or a comparison of the four structures.</p>
</div>`,
  deeper:`
<h3>Two externalities of entry</h3>
<!-- src: MS5 (slide 245: product-variety externality and business-stealing externality of entry) -->
<p>Your course\'s slide 245 names two side effects of a new firm entering. The <b>product-variety externality</b>: a new product gives buyers more choice, a benefit the entrant doesn\'t collect, which argues for more entry. The <b>business-stealing externality</b>: much of the entrant\'s sales come from rivals, a loss to them that the entrant ignores, which argues for less. Which is larger varies by market, which is one reason your course textbook says the right amount of variety "may never be fully resolved."</p>
<h3>Who named it?</h3>
<p>Your course textbook: Edward Chamberlin (Harvard) and Joan Robinson (Cambridge) developed the theory independently in 1933, in <i>The Economics of Imperfect Competition</i> (Robinson) and, for Chamberlin, a book the textbook calls <i>The Economics of Monopolistic Competition</i>; its actual title is <i>The Theory of Monopolistic Competition</i>.</p>`,
  links:[ {k:'Textbook',t:'10.1 Monopolistic Competition',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/10-1-monopolistic-competition',w:'Product differentiation, the pizza example, entry and exit, efficiency and advertising.'},
          {k:'Article',t:'Competition',s:'Econlib, Concise Encyclopedia of Economics (Wolfgang Kasper)',u:'https://econlib.org/library/Enc/Competition.html',w:'Competition as rivalry in products, prices and advertising, not just the textbook model.'} ]
});
