/* ===== Lesson 21 figures ===== */
const RF_MC_PTS = RF.slice(1).map(r=>[r.q, r.mc]);   // marginal cost per pack, plotted at the end of each 10-pack step (textbook Table 8.3)

/* L21 V1: marginal revenue for a price taker and for a firm that must cut its price (textbook Tables 8.3 and 9.3) */
FIG5.l21mr = () => figs([
  ['Raspberry farm: price stays $4', `<div class="qg">${ubars([4,4,4,4,4,4,4,4], { labels:['10','20','30','40','50','60','70','80'], ylab:'MR ($ per pack)', xlab:'Packs (end of each 10-pack step)', ymax:5, fmtv:v=>'$'+v, colorOf:()=> 'var(--accent)' })}</div>`],
  ['HealthPill: price falls as it sells more', `<div class="qg">${ubars(HP.map(r=>r.mr), { labels:HP.map(r=>r.q), ylab:'MR ($ per unit)', xlab:'Units sold', fmtv:v=>v<0?'−'+Math.abs(v):v, colorOf:v=> v<0 ? 'var(--bad)' : 'var(--g1)' })}</div>`]
], 'Your course textbook\'s two firms. The raspberry farm sells every pack at the market price, so each extra pack adds $4 of revenue. HealthPill can sell more only by cutting its price on every unit, so each extra unit adds less: $1,200, $1,000, $800 ... and then nothing or less than nothing. Lesson 25 explains the falling bars.');

/* L21 V2: marginal cost per pack from the total cost column (textbook Tables 8.1 and 8.3) */
FIG5.l21mctbl = () => fig(atable(['Packs','Total cost','Change in total cost','Marginal cost per pack'],
  RF.map((r,i)=>[r.q, '$'+r.tc, i ? `$${r.tc} − $${RF[i-1].tc} = $${r.tc-RF[i-1].tc}` : '–', i ? `$${r.tc-RF[i-1].tc} ÷ 10 = <b>${d2(r.mc)}</b>` : '–']), { hl:{8:{row:'u3z2'}}, cls:'compact wrap' }),
  'Your course textbook\'s raspberry farm counts output in steps of 10 packs, so the change in total cost is divided by 10. Marginal cost dips (increasing returns at low output), then climbs: diminishing returns (Lesson 16), which make marginal cost rise (Lesson 18). The highlighted step, 70 to 80 packs, costs $4.00 a pack.');

/* L21 V3: the MR = MC rule as cause and effect (course slides 189-190) */
FIG5.l21flow = () => fig(flow([
  'Make one more unit. It adds <b>MR</b> to revenue and <b>MC</b> to cost, so it adds <b>MR − MC</b> to profit.',
  {split:[
    [{t:'<b>MR &gt; MC</b>',c:'u3amb'}, 'The unit adds more to revenue than to cost.', {t:'Profit <b>rises</b>: produce more.',c:'u3up'}],
    [{t:'<b>MR = MC</b>',c:'u3amb'}, 'The unit adds the same to both.', {t:'Profit can\'t rise either way: <b>stop here</b>.',c:'u3end'}],
    [{t:'<b>MR &lt; MC</b>',c:'u3amb'}, 'The unit adds more to cost than to revenue.', {t:'Profit <b>falls</b>: produce less.',c:'u3down'}] ]}
]), 'Your course: "If marginal revenue is greater than marginal cost the best thing to do is for the firm to produce more. On the other hand if marginal revenue is below marginal cost the best thing for the firm to do is to produce less." Only at MR = MC is there nothing left to gain.');

/* L21 V4: MR and MC on one graph, with the direction of change (textbook Figure 8.3 data) */
FIG5.l21graph = () => fig(sdg({ xmax:105, ymax:9, xt:[0,20,40,60,80,100], yt:[0,2,4,6,8], xlab:'Packs of raspberries', ylab:'Dollars per pack', aria:'Marginal revenue line at four dollars and the rising marginal cost curve crossing it at 80 packs',
  lines:[ {pts:[[0,4],[105,4]], c:'var(--accent)', label:'MR = $4', lx:-4, ly:-6, anchor:'end'}, {pts:RF_MC_PTS, c:'var(--g2)', label:'MC', lx:-6, ly:2, anchor:'end'} ],
  arrows:[ {a:[16,5.6],b:[40,5.6],c:'var(--ok)'}, {a:[103,1.6],b:[89,1.6],c:'var(--bad)'} ],
  labels:[[30,6.3,'MR > MC: produce more','var(--ok)'],[95,0.7,'MR < MC','var(--bad)']],
  dots:[{q:80,p:4,label:'MR = MC at 80',c:'var(--ink)',lx:-8,ly:-24,anchor:'end'}], vls:[{q:80,p:4}] }),
  'Your course textbook\'s raspberry farm at a price of $4 (marginal cost plotted at the end of each 10-pack step). Left of 80 packs, the marginal revenue line is above marginal cost: each step adds profit. Right of 80, marginal cost is above it: each step loses money. The firm stops where they meet.');

/* L21 V5: marginal profit and total profit (textbook Table 9.4) */
FIG5.l21mprofit = () => { const R = HP.slice(0,7);
  /* tick labels with a true minus sign, and the axis title nudged left so it clears them */
  const hpFix = h => h.replace(/>-(\d+)</g,'>−$1<').replace('x="14" y="98"','x="13" y="98"').replace('rotate(-90 14 98)','rotate(-90 13 98)');
  return figs([
    ['Marginal profit (MR − MC)', `<div class="qg">${ubars(R.map(r=>r.mr-r.mc), { labels:R.map(r=>r.q), ylab:'Dollars', xlab:'Unit', fmtv:v=>v<0?'−'+Math.abs(v):v, colorOf:v=> v>0 ? 'var(--ok)' : v<0 ? 'var(--bad)' : 'var(--g2)' })}</div>`],
    ['Total profit', hpFix(gchart2({ xmax:7.5, ymin:-1600, ymax:1000, xlab:'Units produced', ylab:'Profit ($)', xt:[1,2,3,4,5,6,7], yt:[-1400,-800,0,800], aria:'Total profit rising to 800 at 3 and 4 units, then falling',
      body:(X,Y)=>({ under: `<line x1="${X(0)}" x2="${X(7.5)}" y1="${Y(0)}" y2="${Y(0)}" stroke="var(--muted)" stroke-width="1"/>` + gline(R.map(r=>[r.q,r.profit]),X,Y,'var(--accent)','',2.6),
        over: R.map(r=>`<circle cx="${X(r.q).toFixed(1)}" cy="${Y(r.profit).toFixed(1)}" r="${r.q===4?5.5:3.5}" fill="${r.q===4?'var(--g2)':'var(--accent)'}"/>`).join('') + gtext(X(4)+6, Y(800)-8, '$800', 'var(--ink)') }) }))]
  ], 'Your course textbook\'s HealthPill (Table 9.4). Total profit is the running sum of the marginal profits: −$300, then +$700, +$400, +$0. While a bar is positive, total profit climbs. At the 4th unit MR = MC ($600 = $600), the bar is zero and total profit has reached its top ($800). After that the bars are negative and profit falls.'); };

/* L21 V7: total revenue and total cost, with the biggest gap (textbook Figure 8.2, Table 8.1) */
FIG5.l21trtc = () => fig(sdg({ xmax:105, ymax:440, xt:[0,20,40,60,80,100], yt:[0,100,200,300,400], xlab:'Packs of raspberries', ylab:'Dollars', aria:'Straight total revenue line and curved total cost curve with the largest gap marked',
  lines:[ {pts:[[0,0],[100,400]], c:'var(--accent)'}, {pts:RF.map(r=>[r.q,r.tc]), c:'var(--g1)'} ],
  spans:[ {q:80, p1:264, p2:320, c:'var(--g2)', label:'$56', lx:-20, ly:4} ],
  labels:[[28,370,'Profit = vertical gap','var(--ink)'],[44,215,'TR','var(--accent)'],[66,165,'TC','var(--g1)']] }),
  'Your course textbook\'s raspberry farm at $4 a pack. Total revenue is a straight line (each pack adds $4). Total cost starts at the $62 fixed cost and bends upward. Profit is the vertical gap. The gap is widest, $56, at 70 to 80 packs, exactly where MR = MC. Where the lines cross, profit is zero.');

/* ===== Lesson 21: Profit Maximization: The MR = MC Rule (Modern States video 5.1, second part; Module 5 slides 187-192) =====
   Common mistakes: M1 maximize profit by selling as much as possible (max revenue) · M2 if MR > MC, produce less
   M3 stop where MR − MC (marginal profit) is largest · M4 at MR = MC total profit is zero
   M5 MR = MC means price equals average cost · M6 marginal revenue always equals price */
const rfTbl = (P=4) => atable(['Packs','Total cost','Total revenue at $'+P], RF.map(r=>[r.q, '$'+r.tc, '$'+(P*r.q)]), { cls:'compact' });

mc('l21-mr-def','l21','Which of the following is marginal revenue?',
  [`The change in total revenue divided by the change in quantity`,`Total revenue divided by quantity`,`Price times quantity`,`The change in total cost divided by the change in quantity`,`Total revenue minus total cost`],0,
  `<p>Your course: "Marginal Revenue = Change in TR / Change in Q." It "captures the change in a firm\'s revenue from one additional unit produced."</p><p>Price times quantity is total revenue itself. Total revenue ÷ quantity is revenue per unit. The change in total cost ÷ the change in quantity is marginal cost, and TR − TC is profit.</p>`);
gen('l21-g-mr','l21',()=>{
  let p1, d, k, P, TR, ans;
  do { p1 = pick([20,24,30,36,40]); d = pick([2,3,4]); k = pick([2,3,4]);
    P = q => p1 - d*(q-1); TR = q => P(q)*q; ans = TR(k) - TR(k-1); } while(ans < 2);   /* keep MR positive so "revenue rises" is true */
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A bakery can sell more cakes a day only by cutting its price on all of them:${atable(['Cakes a day','Price','Total revenue'], [1,2,3,4].map(q=>[q, '$'+P(q), '$'+TR(q)]), { cls:'compact' })}What is the marginal revenue of the <b>${ordinal(k)}</b> cake?`, answer:ans,
    explain:`<p>Marginal revenue = change in total revenue = $${TR(k)} − $${TR(k-1)} = <b>$${ans}</b>.</p><p>The common slip is answering the price, $${P(k)}. The ${ordinal(k)} cake brings in $${P(k)}, but selling it means cutting the price by $${d} on the other ${k-1} cake${k>2?'s':''} too, so revenue rises by only $${ans} (M6).</p>` };
});
mc('l21-rule-more','l21','Made-up numbers. At its current output, a firm\'s marginal revenue is $12 and its marginal cost is $9. To raise its profit, the firm should',
  [`produce more, because the next unit adds $3 more to revenue than to cost`,`produce less, because its marginal cost is positive`,`keep output the same, because it is already making a profit`,`produce less, because marginal revenue is greater than marginal cost`,`raise its marginal cost until it equals $12`],0,
  `<p>Each extra unit adds MR to revenue and MC to cost. With MR $12 above MC $9, the next unit adds about $3 to profit, so the firm should expand. Your course: "If MR &gt; MC: Increase profits by producing more."</p><p>"Produce less because MR is greater" flips the rule (M2). A firm can be making a profit and still be able to make more.</p>`);
mc('l21-rasp','l21',`Your course textbook\'s raspberry farm sells packs at $4 each:${rfTbl()}Using the MR = MC rule, how many packs should it produce?`,
  [`80`,`60`,`100`,`90`,`50`],0,
  `<p>Each 10-pack step adds $40 of revenue ($4 a pack). Marginal cost per pack: 60 to 70 costs $32 ÷ 10 = $3.20 (below $4: produce); 70 to 80 costs $40 ÷ 10 = $4.00 (equal: MR = MC); 80 to 90 costs $60 ÷ 10 = $6.00 (above $4: stop). MR = MC at <b>80 packs</b>, where profit is $320 − $264 = $56.</p><p>100 packs maximizes revenue, not profit (M1). At 90 packs profit falls to $36.</p>`);
tf('l21-tf-zero','l21','At the output where marginal revenue equals marginal cost, the firm\'s total profit is zero.',false,
  `<p>False. At MR = MC the <b>marginal</b> profit, the profit from one more unit, is zero. Your course: "the additional profits that the firm would get from producing one more unit is equal to 0." Total profit is at its highest there: $56 for the raspberry farm, $800 for HealthPill (M4).</p>`);
lazy('l21-gr-mrmc','l21',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A firm\'s marginal revenue (MR) and marginal cost (MC):${sdg({ xmax:10, ymax:10, xt:[0,2,4,6,8,10], yt:[0,2,4,6,8,10], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Downward sloping marginal revenue and upward sloping marginal cost with output Q1 marked to the left of where they cross',
    lines:[ {a:[0,9],b:[10,4],label:'MR',c:'var(--accent)',lx:-4,ly:-6,anchor:'end'}, {a:[0,1],b:[10,9],label:'MC',c:'var(--g2)',lx:-4,ly:-6,anchor:'end'} ], vls:[{q:3}], labels:[[3,0.6,'Q1','var(--ink)']] })}The firm is producing Q1 = 3 units. What should it do to raise its profit?`,
  options:[`Produce more, because MR is above MC at Q1`,`Produce less, because MR is above MC at Q1`,`Stay at Q1, because MR is falling`,`Produce less, because MC is rising`,`Produce where MR is highest, at zero output`], answer:0,
  explain:`<p>At 3 units, MR (about $7.50) is above MC (about $3.40). Each unit past Q1 adds more to revenue than to cost until the curves meet near 6.2 units, so the firm should expand toward that point.</p><p>"Produce less because MR is above MC" reverses the rule (M2). A falling MR or rising MC alone doesn\'t say which way to move; compare the two.</p>` }));
gen('l21-g-best','l21',()=>{
  const P = pick([8,10,12,15]), FC = pick([10,15,20,25]);
  let MC; do { const m1 = pick([2,3,4,5]); MC=[m1]; while(MC.length<6) MC.push(MC[MC.length-1] + pick([1,2,3,4])); } while(MC.includes(P) || MC.filter(m=>m<P).length<2 || MC.filter(m=>m<P).length>5);
  const TC=[FC]; MC.forEach(m=>TC.push(TC[TC.length-1]+m)); const ans = MC.filter(m=>m<P).length;
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. A perfectly competitive firm can sell all it wants at a market price of <b>$${P}</b>. Its total cost:${atable(['Quantity','Total cost'], TC.map((t,q)=>[q,'$'+t]), { cls:'compact' })}How many units should it produce to maximize profit?`, answer:ans,
    explain:`<p>Each unit adds $${P} of revenue (MR = price for this firm). Marginal costs: ${MC.map((m,i)=>`unit ${i+1}: $${TC[i+1]} − $${TC[i]} = $${m}`).join('; ')}. Produce every unit whose marginal cost is below $${P}: that is <b>${ans} units</b>. Unit ${ans+1} would cost $${MC[ans]}, more than the $${P} it brings in.</p><p>The common slip is producing all 6 units because revenue keeps rising (M1). Total profit at ${ans} units: $${P*ans} − $${TC[ans]} = $${P*ans-TC[ans]}.</p>` };
});
mc('l21-hp','l21','Your course textbook\'s HealthPill earns its highest total <b>revenue</b> ($4,200) at 6 or 7 units, but the MR = MC rule picks 4 units. Why does the profit-maximizing firm stop at 4?',
  [`Beyond 4 units each extra unit adds less to revenue than to cost (the 5th: MR $400, MC $700)`,`Because total revenue is falling after 4 units`,`Because marginal revenue is negative after 4 units`,`Because a firm should always produce where price equals average cost`,`Because marginal cost is lowest at 4 units`],0,
  `<p>The textbook\'s Table 9.3: the 5th unit brings in MR $400 but costs MC $700, so it would cut profit by $300. Revenue still rises (to $4,000), but cost rises faster. Maximizing revenue isn\'t the goal (M1).</p><p>Total revenue keeps rising until 6 units, and MR stays positive until the 7th, so those reasons are wrong. Marginal cost is lowest at the 2nd unit ($300).</p>`);
tf('l21-tf-revenue','l21','A profit-maximizing firm produces the quantity at which its total revenue is largest.',false,
  `<p>False. Revenue ignores cost. Past the MR = MC point, extra units still bring in revenue but cost even more. HealthPill\'s revenue peaks at 6 to 7 units, yet its profit is highest at 4 (M1).</p>`);
mc('l21-mprofit','l21','Your course textbook defines marginal profit as marginal revenue minus marginal cost. As a firm expands output, its total profit is at its maximum when marginal profit',
  [`falls to zero`,`is at its largest`,`first turns positive`,`equals total profit`,`is negative`],0,
  `<p>Total profit is the running sum of marginal profits. While marginal profit is positive, each unit adds to the total; once it hits zero there is nothing more to add, and after that units subtract. Your course: at the profit-maximizing point "the marginal profit is equal to 0."</p><p>"At its largest" is the trap (M3): when marginal profit is biggest, the next units still add profit, just less of it.</p>`);
lazy('l21-gr-profit','l21',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. The bars show the marginal profit (MR − MC) of each unit a shop could make:<div class="qg">${ubars([30,20,5,-10,-25], { labels:['1st','2nd','3rd','4th','5th'], ylab:'Marginal profit ($)', xlab:'Unit', colorOf:v=> v>0 ? 'var(--ok)' : 'var(--bad)' })}</div>How many units maximize the shop\'s total profit?`,
  options:[`3`,`1`,`5`,`4`,`2`], answer:0, keepOrder:false,
  explain:`<p>Make every unit that adds profit: the 1st (+$30), 2nd (+$20) and 3rd (+$5). The 4th would subtract $10. So <b>3 units</b>, where total profit (before fixed cost) is $30 + $20 + $5 = $55.</p><p>Stopping at 1 unit, where marginal profit is largest, gives up $25 of profit (M3). Making all 5 units loses $35 of it.</p>` }));
mc('l21-table-best','l21',`Made-up numbers. A perfectly competitive firm sells at a market price of $9:${atable(['Quantity','Total cost'],[[0,'$8'],[1,'$12'],[2,'$18'],[3,'$26'],[4,'$37'],[5,'$50']],{cls:'compact'})}Which quantity maximizes its profit?`,
  [`3`,`1`,`4`,`5`,`2`],0,
  `<p>Marginal costs: $4, $6, $8, $11, $13. Each unit brings in $9. Units 1 to 3 cost less than $9 each; unit 4 costs $11. So produce <b>3</b>: profit = $27 − $26 = $1, versus $36 − $37 = −$1 at 4 units.</p><p>Choosing 5 units maximizes revenue (M1). Choosing 1 unit stops where marginal profit is biggest ($5) and leaves profit on the table (M3).</p>`);
/* L21 more */
mc('l21-tr-def','l21','According to your course, how is total revenue calculated?',
  [`Price × quantity`,`Price − average cost`,`Change in revenue ÷ change in quantity`,`Total cost + profit − fixed cost`,`Marginal revenue × price`],0,
  `<p>Your course: "Total Revenue (TR) = Price X Quantity." The change in revenue ÷ the change in quantity is marginal revenue. Price − average cost is profit per unit, used in Lesson 24.</p>`);
gen('l21-g-mc','l21',()=>{
  const step = 10, base = pick([40,50,60]), tc0 = pick([200,240,300]), add1 = pick([30,40,50]), add2 = add1 + pick([10,20,30]);
  const ans = add2/step;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A farm counts output in steps of 10 crates:${atable(['Crates','Total cost'],[[base,'$'+tc0],[base+10,'$'+(tc0+add1)],[base+20,'$'+(tc0+add1+add2)]],{cls:'compact'})}What is the marginal cost <b>per crate</b> of going from ${base+10} to ${base+20} crates?`, answer:ans,
    explain:`<p>Marginal cost = change in total cost ÷ change in quantity = ($${tc0+add1+add2} − $${tc0+add1}) ÷ 10 = $${add2} ÷ 10 = <b>${d2(ans)}</b> per crate.</p><p>The common slip is stopping at $${add2}, the cost of all 10 extra crates together. Your course\'s formula divides by the change in quantity, like the textbook\'s raspberry farm.</p>` };
});
mc('l21-rule-less','l21','Made-up numbers. At its current output a firm\'s marginal revenue is $5 and its marginal cost is $8. What should it do?',
  [`Produce less, since the last unit added $3 more to cost than to revenue`,`Produce more, since marginal cost is above marginal revenue`,`Keep output the same, since marginal revenue is positive`,`Raise output until marginal revenue is zero`,`Shut down, since marginal cost is above marginal revenue`],0,
  `<p>Your course: "If MR &lt; MC: Increase profits by producing less." Cutting the last unit saves $8 of cost and loses only $5 of revenue, so profit rises by about $3.</p><p>"Produce more" flips the rule (M2). Shutting down entirely is a different decision (Lesson 23); here the firm just trims output toward MR = MC.</p>`);
tf('l21-tf-mpzero','l21','At the profit-maximizing output, the last unit produced adds about as much to revenue as it adds to cost.',true,
  `<p>True. That is what MR = MC means: the last unit\'s marginal revenue equals its marginal cost, so it adds nothing to profit. Your course: "the additional revenue that a firm generates from producing one more unit is exactly equal to the additional cost of producing one more unit." Total profit is at its maximum, not zero (M4).</p>`);
mc('l21-step','l21',`Your course textbook\'s raspberry farm, price $4 a pack:${rfTbl()}By how much does profit change if the farm expands from 80 to 90 packs?`,
  [`−$20`,`$20`,`$36`,`−$2`,`$40`],0,
  `<p>The 10 extra packs add $40 of revenue and $324 − $264 = $60 of cost, so profit falls by <b>$20</b> (from $56 to $36). Per pack, MR is $4 and MC is $6.</p><p>$40 counts only the revenue; $36 is the new total profit, not the change. −$2 is the loss per pack, not for all 10.</p>`);
mc('l21-why','l21','Why does producing more than the MR = MC quantity lower a firm\'s profit?',
  [`Each unit beyond that point adds more to cost than to revenue`,`Total revenue falls as soon as output passes that point`,`Fixed costs rise as output rises`,`The firm has to lower its marginal cost`,`Average cost is always lowest at MR = MC`],0,
  `<p>Past the MR = MC point, marginal cost is above marginal revenue, so every extra unit has negative marginal profit. Your course: "If MR &lt; MC: Increase profits by producing less."</p><p>Revenue can keep rising past that point (the raspberry farm\'s revenue rises all the way to 100 packs). Fixed costs don\'t change with output, and MR = MC is not where average cost is lowest (M5).</p>`);
gen('l21-g-mp','l21',()=>{
  const P = pick([15,20,25]), FC = pick([10,20,30]);
  let MC; do { MC=[pick([4,5,6,7,8])]; while(MC.length<5) MC.push(MC[MC.length-1]+pick([2,3,4,5])); } while(MC.includes(P) || MC.filter(m=>m<P).length<2 || MC.filter(m=>m<P).length>4);
  const k = MC.filter(m=>m<P).length, ans = MC.slice(0,k).reduce((a,m)=>a+P-m,0) - FC;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A firm gets marginal revenue of <b>$${P}</b> for every unit. The marginal costs of its 1st to 5th units are <b>${MC.map(m=>'$'+m).join(', ')}</b>, and its fixed cost is <b>$${FC}</b>. What is its total profit at the profit-maximizing output? (Type a negative number for a loss.)`, answer:ans,
    explain:`<p>Produce while MR &gt; MC: units 1 to ${k}. Their marginal profits are ${MC.slice(0,k).map(m=>`$${P} − $${m} = $${P-m}`).join(', ')}, which add to $${ans+FC}. Subtract the fixed cost: $${ans+FC} − $${FC} = <b>${usd(ans)}</b>.</p><p>The common slip is forgetting the fixed cost ($${ans+FC}). Fixed cost doesn\'t change the best output, but it does come out of profit.</p>` };
});
mc('l21-hp-mr','l21','In your course textbook\'s HealthPill example, the 3rd unit sells for $1,000, but its marginal revenue is only $800. Why?',
  [`To sell a 3rd unit the firm must cut its price from $1,100 to $1,000 on the first two units as well`,`The firm\'s marginal cost of the 3rd unit is $200`,`The firm pays a $200 tax on each unit`,`Marginal revenue is always 80% of price`,`The 3rd unit is sold at a discount but the others are not`],0,
  `<p>Total revenue goes from 2 × $1,100 = $2,200 to 3 × $1,000 = $3,000, a rise of $800. The new unit adds $1,000, but the two earlier units now sell for $100 less each: $1,000 − $200 = $800. The textbook: "all the previous units ... now sell for less."</p><p>This is why MR can be below price (M6). The price cut applies to every unit, not just the new one.</p>`);
tf('l21-tf-mrp','l21','A firm\'s marginal revenue always equals the price of its product.',false,
  `<p>False. It equals the price only for a price taker, like the raspberry farm, which sells every pack at $4 (Lesson 22). A firm that must cut its price to sell more, like HealthPill, has marginal revenue below the price: the 3rd unit sells for $1,000 but adds only $800 (M6).</p>`);
lazy('l21-gr-trtc','l21',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A firm\'s total revenue (TR) and total cost (TC):${sdg({ xmax:10.5, ymax:140, xt:[0,2,4,6,8,10], yt:[0,40,80,120], xlab:'Output (units)', ylab:'Dollars', aria:'Straight total revenue line and curved total cost line with outputs A to D marked',
    lines:[ {a:[0,0],b:[10.5,126],label:'TR',c:'var(--accent)',lx:-4,ly:-6,anchor:'end'}, {pts:[0,1,2,3,4,5,6,7,8,9,10].map(q=>[q, 10+2*q+q*q]), c:'var(--g1)', label:'TC', lx:-6, ly:8, anchor:'end'} ],
    vls:[{q:1.13},{q:5},{q:8.87},{q:10}], labels:[[1.13,6,'A'],[5,6,'B'],[8.87,6,'C'],[10,6,'D']] })}At which marked output is profit largest?`,
  options:[`B, where TR is farthest above TC`,`A, where TR first rises above TC`,`D, where TR is highest`,`C, where TR and TC meet again`,`At zero output, where total cost is lowest`], answer:0,
  explain:`<p>Profit is the vertical gap between TR and TC. It is widest at <b>B</b> (5 units: TR $60, TC $45, profit $15). There the two curves have the same slope: MR = MC.</p><p>At A and C the curves cross, so profit is zero. At D revenue is highest but cost is higher still (TR $120, TC $130), a mistake of maximizing revenue (M1).</p>` }));
mc('l21-allfirms','l21','According to your course, which firms use the MR = MC rule to choose their output?',
  [`All profit-maximizing firms, in every market structure`,`Only perfectly competitive firms`,`Only monopolies`,`Only firms whose marginal revenue equals price`,`Only firms earning economic profit`],0,
  `<p>Your course\'s key takeaway: "Point of maximizing profits is where MR = MC for all firms." What differs between market structures is how marginal revenue behaves, not the rule (M6).</p><p>A firm making a loss uses the same rule to keep its loss as small as possible (Lesson 23).</p>`);
mc('l21-tie','l21',`Your course textbook\'s raspberry farm at $4 a pack earns $56 of profit at both 70 and 80 packs. On the step from 70 to 80 packs, marginal revenue and marginal cost are both $4 a pack. What does this show?`,
  [`That step adds as much to cost as to revenue, so profit is the same; the MR = MC rule names 80 packs`,`The farm should produce 75 packs to split the difference`,`The farm\'s total profit is zero at 80 packs`,`The textbook\'s numbers must contain an error`,`The farm should stop at 70 packs because profit stops rising`],0,
  `<p>When the last step\'s MR exactly equals its MC, that step adds $0 of profit, so profit ties. The textbook: "From a level of 70 to 80, marginal cost and marginal revenue are equal so profit doesn\'t change," and the farm "will not know they\'ve maximized profit until they reach 80, where MR = MC."</p><p>Profit is $56 at 80, not zero (M4). Your course\'s own tables have the same kind of tie (Lessons 22 and 25).</p>`);
mc('l21-maxrev','l21',`Your course textbook\'s HealthPill:${atable(['Units','Price','Total revenue','Total cost'], HP.map(r=>[r.q,'$'+r.p.toLocaleString('en-US'),'$'+r.tr.toLocaleString('en-US'),'$'+r.tc.toLocaleString('en-US')]), {cls:'compact'})}At what output is <b>total revenue</b> highest?`,
  [`6 or 7 units (revenue $4,200)`,`4 units`,`8 units`,`1 unit`,`5 units`],0,
  `<p>Revenue: $1,200, $2,200, $3,000, $3,600, $4,000, $4,200, $4,200, $4,000. It peaks at <b>6 or 7 units</b>. Profit, though, peaks at 4 units ($800), where MR = MC. Revenue and profit peaks differ because profit subtracts cost (M1).</p><p>8 units sells the most but at a price low enough that revenue falls.</p>`);
lazy('l21-gr-mpbars','l21',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. For each unit a workshop could make, green is its marginal revenue and blue its marginal cost:<div class="qg" style="max-width:420px">${(()=>{ const MR=[20,18,16,14,12], MC=[8,10,13,17,22], W_=320, x0=40, y0=150, pw=260, ph=130, Y=v=>y0-ph*v/25, bw=pw/5; let s=`<svg class="u2bars" viewBox="0 0 ${W_} 190" role="img" aria-label="Paired bars of marginal revenue and marginal cost for units 1 to 5">`;
    s+=`<line x1="${x0}" x2="${x0+pw}" y1="${y0}" y2="${y0}" class="ax"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y0-ph}" class="ax"/><text x="${x0-5}" y="${Y(25)+4}" text-anchor="end" class="lbl">$25</text><text x="${x0-5}" y="${y0+4}" text-anchor="end" class="lbl">0</text>`;
    MR.forEach((m,i)=>{ const x=x0+i*bw+6; s+=`<rect x="${x}" y="${Y(m)}" width="${bw/2-7}" height="${y0-Y(m)}" fill="var(--accent)" opacity=".8"/><text x="${x+(bw/2-7)/2}" y="${Y(m)-3}" text-anchor="middle" class="lbl halo">${m}</text><rect x="${x+bw/2-5}" y="${Y(MC[i])}" width="${bw/2-7}" height="${y0-Y(MC[i])}" fill="var(--g1)" opacity=".8"/><text x="${x+bw/2-5+(bw/2-7)/2}" y="${Y(MC[i])-3}" text-anchor="middle" class="lbl halo">${MC[i]}</text><text x="${x+bw/2-6}" y="${y0+14}" text-anchor="middle" class="lbl">Unit ${i+1}</text>`; });
    s+=`<rect x="${x0}" y="172" width="10" height="10" fill="var(--accent)" opacity=".8"/><text x="${x0+14}" y="181" class="lbl">MR ($)</text><rect x="${x0+80}" y="172" width="10" height="10" fill="var(--g1)" opacity=".8"/><text x="${x0+94}" y="181" class="lbl">MC ($)</text>`; return s+'</svg>'; })()}</div>What is the last unit the workshop should make?`,
  options:[`Unit 3`,`Unit 1`,`Unit 5`,`Unit 4`,`Unit 2`], answer:0,
  explain:`<p>Compare the pairs: unit 1 ($20 vs $8), unit 2 ($18 vs $10) and unit 3 ($16 vs $13) all add profit. Unit 4 brings in $14 but costs $17. So the last unit worth making is <b>unit 3</b>.</p><p>Unit 1 has the biggest gap, but stopping there gives up the profit from units 2 and 3 (M3). Unit 5 has the highest cost and adds the least revenue.</p>` }));
tf('l21-tf-falling','l21','A firm can still raise its total profit by producing a unit whose marginal profit is smaller than the previous unit\'s, as long as it is still positive.',true,
  `<p>True. Total profit rises whenever marginal profit is positive, even if each unit adds less than the one before. HealthPill\'s 2nd unit adds $700 and its 3rd adds $400; producing the 3rd still raises profit. Stopping where marginal profit is largest is a common mistake (M3).</p>`);
mc('l21-mc-rise','l21','Why does a firm\'s marginal cost eventually rise as it produces more, which is what gives the MR = MC rule a stopping point?',
  [`Diminishing marginal returns: with some inputs fixed, each extra unit takes more of the variable inputs`,`Fixed costs rise with every unit produced`,`Marginal revenue falls`,`Workers hired later are always less skilled`,`Average cost always falls as output rises`],0,
  `<p>Lesson 16: with fixed inputs, each added worker adds less output (diminishing returns), so each extra unit costs more (Lesson 18). Econlib\'s Lemieux: "marginal cost is increasing in the short-run (and often in the long-run too)." Rising MC is why the firm eventually reaches MR = MC.</p><p>Fixed costs don\'t change with output; falling MR is a demand-side reason that applies only to some firms; and Lesson 16 showed the cause isn\'t worker skill.</p>`);

/* ===== Lesson 21 quick checks ===== */
mc('l21c-mr','l21','Made-up numbers. A food truck\'s total revenue rises from $300 to $340 when it sells 10 more meals. What is its marginal revenue per meal?',
  [`$4`,`$40`,`$34`,`$30`,`$340`],0,
  `<p>MR = change in TR ÷ change in Q = $40 ÷ 10 = <b>$4</b>. $40 is the change for all 10 meals; $34 is $340 ÷ 10, revenue per meal on all of them.</p>`);
mc('l21c-mc','l21','Your course textbook\'s raspberry farm: total cost is $192 at 60 packs and $224 at 70 packs. What is the marginal cost per pack?',
  [`$3.20`,`$32`,`$3.73`,`$22.40`,`$2.60`],0,
  `<p>($224 − $192) ÷ 10 = $32 ÷ 10 = <b>$3.20</b>. $32 is the cost of all 10 packs; $3.73 would be $224 ÷ 60. $2.60 is the previous step\'s marginal cost.</p>`);
mc('l21c-rule','l21','Made-up numbers. A bakery\'s next batch of bread would bring in $90 and cost $70 to make. Then the following batch would bring in $90 and cost $95. How many more batches should it make?',
  [`One more batch`,`Two more batches`,`None`,`As many as it can sell`,`Half a batch`],0,
  `<p>The first extra batch adds $90 − $70 = $20 of profit (MR &gt; MC); the second would lose $5 (MR &lt; MC). So make one more batch.</p>`);
mc('l21c-mp','l21','Made-up numbers. A firm\'s marginal profits for units 1 to 5 are $50, $30, $10, $0 and −$20. Which statement is true?',
  [`Total profit is highest at 3 or 4 units, and the MR = MC rule names 4`,`Total profit is highest at 1 unit`,`Total profit is zero at 4 units`,`Total profit is highest at 5 units`,`The firm should produce 2 units, halfway`],0,
  `<p>Total profit (before fixed cost) is $50, $80, $90, $90, $70. The 4th unit adds $0, so profit ties at 3 and 4; MR = MC at the 4th unit. Profit isn\'t zero there; marginal profit is.</p>`);
mc('l21c-gap','l21','On a graph of total revenue and total cost, where is profit largest?',
  [`Where total revenue is farthest above total cost`,`Where the two curves cross`,`Where total revenue is highest`,`Where total cost is lowest`,`Where total cost starts to bend upward`],0,
  `<p>Profit = TR − TC, the vertical gap. Where the curves cross, profit is zero. The largest gap is also where the slopes match: MR = MC.</p>`);
mc('l21c-skill','l21','Made-up numbers. If a firm produces 10 more units, its revenue rises by $80 and its cost rises by $120. What should it do?',
  [`Not produce them: MR $8 per unit is below MC $12`,`Produce them: revenue rises`,`Produce them: MR is positive`,`Produce them: $120 is more than $80`,`Raise output by 20 units instead`],0,
  `<p>Per unit, MR = $80 ÷ 10 = $8 and MC = $120 ÷ 10 = $12. MR &lt; MC, so those units would cut profit by $40. A rise in revenue alone isn\'t enough.</p>`);

/* Course materials checked 2026-10-28: video 5.1 transcript (TR = P × Q; MR = change in TR ÷ change in Q; MC = change in TC ÷ change in Q; "the best point of production will be where marginal revenue is equal to marginal cost";
   MR > MC produce more; MR < MC produce less; "the marginal profit is equal to 0"), Module 5 slides 187-192; course textbook §8.2 (raspberry farm Tables 8.1, 8.3: MC 2.80 ... 8.00, profit $56 at 70-80; "From a level of 70 to 80 ... profit doesn't change";
   Figure 8.2 vertical gap), §9.2 (HealthPill Tables 9.2-9.4, marginal profit; MR below price); Econlib, Lemieux ("marginal cost is increasing in the short-run"); CLEP outline and sample question 8 (price-taker table). */
const L21TAGS = {
  'l21-mr-def':['MS5','mrmc','terms','M6'], 'l21-g-mr':['OS92 MS5','mrmc','data','M6'], 'l21-rule-more':['MS5','mrmc','models','M2'],
  'l21-rasp':['OS82','mrmc','data','M1'], 'l21-tf-zero':['MS5 OS92','mrmc','terms','M4'], 'l21-gr-mrmc':['MS5 OS82','mrmc','graphs','M2'],
  'l21-g-best':['OS82 CBS','mrmc','data','M1'], 'l21-hp':['OS92','mrmc','data','M1'], 'l21-tf-revenue':['OS92','mrmc','terms','M1'],
  'l21-mprofit':['OS92 MS5','mrmc','terms','M3'], 'l21-gr-profit':['OS92','mrmc','graphs','M3'], 'l21-table-best':['CBS OS82','mrmc','data','M1 M3'],
  'l21-tr-def':['MS5','mrmc','terms',''], 'l21-g-mc':['MS5 OS82','mrmc','data',''], 'l21-rule-less':['MS5','mrmc','models','M2'],
  'l21-tf-mpzero':['MS5','mrmc','terms','M4'], 'l21-step':['OS82','mrmc','data','M1'], 'l21-why':['MS5','mrmc','models','M5'],
  'l21-g-mp':['OS92','mrmc','data',''], 'l21-hp-mr':['OS92','mrmc','models','M6'], 'l21-tf-mrp':['OS82 OS92','mrmc','terms','M6'],
  'l21-gr-trtc':['OS82','mrmc','graphs','M1'], 'l21-allfirms':['MS5','mrmc','terms','M6'], 'l21-tie':['OS82','mrmc','data','M4'],
  'l21-maxrev':['OS92','mrmc','data','M1'], 'l21-gr-mpbars':['MS5','mrmc','graphs','M3'], 'l21-tf-falling':['OS92','mrmc','terms','M3'], 'l21-mc-rise':['OS82 ELL','mrmc','models',''],
  'l21c-mr':['MS5','mrmc','data',''], 'l21c-mc':['OS82','mrmc','data',''], 'l21c-rule':['MS5','mrmc','models','M2'],
  'l21c-mp':['OS92','mrmc','data','M4'], 'l21c-gap':['OS82','mrmc','graphs','M1'], 'l21c-skill':['MS5','mrmc','models','M1']
};
u5tag(L21TAGS);

U5_CARDS.l21 = [
  ['Total revenue','How is total revenue calculated?','Price × quantity sold.','The raspberry farm sells 80 packs at $4: $320.','Revenue is not profit; costs still come out.'],
  ['Marginal revenue','What is marginal revenue, and how do you calculate it?','The extra revenue from one more unit: change in total revenue ÷ change in quantity.','Raspberry farm, 70 → 80 packs: ($320 − $280) ÷ 10 = $4 a pack.','Divide by the change in quantity when output moves in steps (here 10).'],
  ['Marginal cost (review)','What is marginal cost?','The extra cost of one more unit: change in total cost ÷ change in quantity (Lesson 18).','Raspberry farm, 80 → 90 packs: ($324 − $264) ÷ 10 = $6 a pack.','It rises at higher output because of diminishing returns.'],
  ['The MR = MC rule','Where does a profit-maximizing firm produce?','At the quantity where marginal revenue equals marginal cost.','Raspberry farm at $4: MR = MC = $4 on the step to 80 packs.','Your course: this holds "for all firms," in every market structure.'],
  ['MR greater than MC','What should a firm do if MR > MC at its current output?','Produce more: the next unit adds more to revenue than to cost.','MR $12, MC $9: the next unit adds about $3 of profit.','Don\'t flip it: MR > MC means expand, not cut.'],
  ['MR less than MC','What should a firm do if MR < MC at its current output?','Produce less: the last unit added more to cost than to revenue.','MR $5, MC $8: cutting that unit raises profit by about $3.','This is a reason to trim output, not necessarily to shut down.'],
  ['Marginal profit','What is marginal profit, and what is it at the best output?','MR − MC: the profit from one more unit. At the profit-maximizing output it is zero.','HealthPill\'s 4th unit: MR $600 − MC $600 = $0.','Zero marginal profit, not zero total profit.'],
  ['Total profit at MR = MC','What is total profit where MR = MC?','At its maximum: every unit that added profit has been made, and the next would subtract.','Raspberry farm: $56; HealthPill: $800.','It may still be a loss if price is below average cost (Lesson 23).'],
  ['Profit vs revenue maximization','Does a firm produce where total revenue is highest?','No. It produces where profit is highest (MR = MC), which is usually less output than the revenue peak.','HealthPill: revenue peaks at 6-7 units, profit at 4.','Selling more isn\'t the goal; earning more than it costs is.'],
  ['Profit on a TR and TC graph','Where is profit largest on a total revenue and total cost graph?','Where TR is farthest above TC (the biggest vertical gap), which is where their slopes are equal: MR = MC.','Raspberry farm: the gap is $56 at 70 to 80 packs.','Where the curves cross, profit is zero.'],
  ['A tie at MR = MC','Why do some tables show the same profit at two outputs?','When the last step\'s MR exactly equals its MC, that step adds $0, so profit is equal with or without it. The rule names the larger output.','Raspberry farm: $56 at 70 and 80 packs.','Both outputs earn the maximum profit; neither is a loss.'],
  ['Why MR can fall','Why can marginal revenue be below price?','A firm that must cut its price to sell more loses revenue on every earlier unit too.','HealthPill\'s 3rd unit sells for $1,000 but adds only $800.','For a price taker, MR = price (Lesson 22).']
];

Object.assign(U5_WRITE, {
  'w-l21-1':{lesson:'l21',prompt:'Explain in your own words why a firm maximizes profit where marginal revenue equals marginal cost. Use what happens to profit when MR > MC and when MR < MC.',
    model:'Each extra unit a firm makes adds its marginal revenue to total revenue and its marginal cost to total cost, so it changes profit by MR − MC. If MR is greater than MC, the next unit adds more to revenue than to cost, so profit rises and the firm should make it. If MR is less than MC, the last unit added more to cost than to revenue, so cutting it raises profit. Because marginal cost rises as output grows, these gains run out. At the output where MR = MC, the next unit would add nothing, and nothing produced so far loses money, so total profit is as high as it can be. For example, the textbook\'s raspberry farm earns $4 a pack; packs up to 80 cost $4 or less, and packs beyond cost $6, so it stops at 80.',
    checklist:['Explains that each unit changes profit by MR − MC','States MR > MC → produce more, with the reason','States MR < MC → produce less, with the reason','Concludes that at MR = MC total profit is at its maximum (marginal profit zero), ideally with an example']},
  'w-l21-2':{lesson:'l21',prompt:'A friend says, "To make the most money, a business should sell as much as it possibly can." Use the textbook\'s HealthPill numbers (revenue peaks at 6-7 units; profit peaks at 4) or your own example to explain why this is wrong.',
    model:'Selling as much as possible maximizes revenue, not profit. HealthPill\'s revenue is highest at 6 or 7 units ($4,200), but its profit is highest at 4 units ($800). Past 4 units, each extra unit still brings in some revenue (the 5th adds $400) but costs more to make (the 5th costs $700), so profit falls by $300. A business should keep expanding only while each extra unit adds more to revenue than to cost, which is where marginal revenue equals marginal cost. Beyond that point, more sales mean less profit.',
    checklist:['Distinguishes revenue maximization from profit maximization','Uses numbers to show that extra units past MR = MC lower profit','Names the MR = MC rule as the right stopping point','Explains the reason: marginal cost exceeds marginal revenue past that point']}
});

U5_PLAN.l21 = {
  core:['l21-mr-def','l21-g-mr','l21-rule-more','l21-rasp','l21-tf-zero','l21-gr-mrmc','l21-g-best','l21-hp','l21-tf-revenue','l21-mprofit','l21-gr-profit','l21-table-best'],
  more:['l21-tr-def','l21-g-mc','l21-rule-less','l21-tf-mpzero','l21-step','l21-why','l21-g-mp','l21-hp-mr','l21-tf-mrp','l21-gr-trtc','l21-allfirms','l21-tie','l21-maxrev','l21-gr-mpbars','l21-tf-falling','l21-mc-rise']
};

U5_LESSONS.push({ id:'l21', unit:5, title:'Profit Maximization: The MR = MC Rule', mins:40, src:'Modern States video 5.1 (second part) and Module 5 slides 187-192 · Course textbook (OpenStax) §8.2 and §9.2',
  sources:['MS5','OS82','OS92','CB','CBS','ELL'],
  oneline:'A firm keeps producing while the next unit adds more to revenue (MR) than to cost (MC), and stops where MR = MC: there marginal profit is zero and total profit is as large as it can be.',
  body:`
<p>Lesson 20 settled what counts as a cost, so profit now means ${dt('economic-profit','economic profit')}. Lesson 5 said good decisions compare marginal benefit with marginal cost. For a firm, the benefit of one more unit is the revenue it brings in. This lesson turns that idea into the rule every firm in this unit uses.</p>

<h2>Total revenue and marginal revenue</h2>
<!-- src: MS5 (video 5.1: "total revenue—price times quantity—as well as marginal revenue, which is going to be the change in total revenue divided by the change in quantity"; "Marginal revenue is going to capture the change in a firm's revenue from producing one more unit of a good"; slide 187); OS82 (raspberry farm, $4 a pack; marginal revenue = change in total revenue ÷ change in quantity; MR = price for a price taker); OS92 (HealthPill Table 9.3: MR 1,200, 1,000, 800 ...; "all the previous units ... now sell for less") -->
<p>${dt('total-revenue','Total revenue')} is price × quantity. ${dt('marginal-revenue','<b>Marginal revenue</b>')} (MR) is what one more unit adds to it: your course\'s formula is "the change in total revenue divided by the change in quantity."</p>
<div class="math">Marginal revenue = change in total revenue ÷ change in quantity</div>
<p><b>Worked example: your course textbook\'s raspberry farm.</b> Packs sell for $4 and output is counted in steps of 10 packs.</p>
<div class="math">70 packs: total revenue = 70 × $4 = $280<br>80 packs: total revenue = 80 × $4 = $320<br>Marginal revenue = ($320 − $280) ÷ 10 = <b>$4 a pack</b></div>
<p>Check: for this farm marginal revenue always equals the price, because each extra pack sells for the same $4. That isn\'t true for every firm. The textbook\'s HealthPill can sell a 3rd unit only by cutting its price from $1,100 to $1,000 on all three, so revenue rises from $2,200 to $3,000: an MR of $800, below the $1,000 price.</p>
${FIG5.l21mr()}
<p><b>So what:</b> the rule below works for both kinds of firm. What differs between market structures is the shape of MR, which Lessons 22 and 25 explain.</p>
<div data-check="l21c-mr"></div>

<h2>Marginal cost, one step at a time</h2>
<!-- src: MS5 (video 5.1: "Marginal cost is going to be, recall from module 4, change in total cost divided by the change in quantity"; "marginal cost is going to capture the change in the firm's cost from producing one additional unit"; slide 187); OS82 (Table 8.3: MC 2.80, 2.00, 1.60, 1.80, 2.20, 2.60, 3.20, 4.00, 6.00, 8.00; "marginal cost at first declines ... But then marginal costs start to increase, displaying the typical pattern of diminishing marginal returns"); ELL (Lemieux: "marginal cost is increasing in the short-run") -->
<p>The other side of each decision is ${dt('marginal-cost','marginal cost')} (MC), from Lesson 18: "change in total cost divided by the change in quantity." Here is the raspberry farm\'s:</p>
${FIG5.l21mctbl()}
<p><b>Why it climbs:</b> the farm\'s land and equipment are fixed in the short run, so past some point each extra pack takes more labor than the last (${dt('dim-returns','diminishing returns')}, Lesson 16). Econlib\'s Lemieux: "marginal cost is increasing in the short-run." Rising marginal cost is what gives the firm a place to stop.</p>
<div data-check="l21c-mc"></div>

<h2>The MR = MC rule</h2>
<!-- src: MS5 (video 5.1: "the best point of production will be where marginal revenue is equal to marginal cost"; "If marginal revenue is greater than marginal cost the best thing to do is for the firm to produce more. On the other hand if marginal revenue is below marginal cost the best thing for the firm to do is to produce less"; slides 189-190); OS82 ("If the firm is producing at a quantity where MR > MC ... it can increase profit by increasing output ... where MC > MR ... it can increase profit by reducing output"; raspberry MR $4, MR = MC at 80; profits 48, 56, 56, 36) -->
<p>Your course: "the best point of production will be where marginal revenue is equal to marginal cost." This is the ${dt('mr-mc','<b>MR = MC rule</b>')}.</p>
${FIG5.l21flow()}
<p><b>Why it works:</b> making one more unit adds MR to revenue and MC to cost, so it changes profit by MR − MC. Positive: make it. Negative: don\'t. The firm keeps going until the gain shrinks to zero.</p>
<p><b>Worked example: the raspberry farm at $4.</b> Look at three steps:</p>
<div class="math">60 → 70 packs: MR $4, MC $3.20 → profit rises by ($4 − $3.20) × 10 = <b>+$8</b> (to $56)<br>70 → 80 packs: MR $4, MC $4.00 → profit changes by ($4 − $4) × 10 = <b>$0</b> (stays $56)<br>80 → 90 packs: MR $4, MC $6.00 → profit changes by ($4 − $6) × 10 = <b>−$20</b> (to $36)</div>
${FIG5.l21graph()}
<p>Check: profit at 80 packs is $320 − $264 = $56, the highest in the textbook\'s table. Because the 70-to-80 step adds exactly $0, profit is also $56 at 70. The textbook: the farm "will not know they\'ve maximized profit until they reach 80, where MR = MC." When a table shows a tie like this, the MR = MC rule names the larger quantity.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture walking up a hill in the fog. Each step, you check whether the ground still rises (MR &gt; MC). Keep going while it does. When a step is flat (MR = MC), you are at the top. Take another and you start down (MR &lt; MC). You don\'t need to see the whole hill, only the next step, which is how firms really find their best output.</p></div>
<div data-check="l21c-rule"></div>

<h2>Marginal profit is zero at the best output</h2>
<!-- src: MS5 (video 5.1: "the firm cannot increase their profits by producing any more or any less than at the point where marginal revenue is equal to marginal cost. So at this point what we say is that the marginal profit is equal to 0. Or in other words, the additional profits that the firm would get from producing one more unit is equal to 0"; slides 190-192); OS92 (Table 9.4: marginal profit = MR − MC; total profit = sum of marginal profits; maximum profit at 4 units) -->
<p>${dt('marginal-profit','<b>Marginal profit</b>')} is MR − MC: what one more unit adds to profit. Your course: at the best output, "the marginal profit is equal to 0." Total profit is the running sum of the marginal profits, so it climbs while they are positive and peaks when they reach zero.</p>
${FIG5.l21mprofit()}
<p><b>Worked example: the textbook\'s HealthPill.</b> Units 2, 3 and 4 add $700, $400 and $0 of profit; unit 5 would subtract $300. Total profit reaches $800 at 3 units and stays $800 at 4, because the 4th unit adds as much revenue as cost (MR = MC = $600); the MR = MC rule names 4, as the textbook does. Revenue keeps rising after that (to $4,200 at 6 or 7 units), but profit falls.</p>
<p>Step through both of the textbook\'s firms below.</p>
<div data-widget="mrmc"></div>
<p>What to notice: total profit stops rising at the step where marginal profit hits zero, not at the step where it is largest. A firm that stopped when its gains first started shrinking would leave profit behind.</p>
<div data-check="l21c-mp"></div>

<h2>Seeing it with total revenue and total cost</h2>
<!-- src: OS82 (Figure 8.2 and Table 8.1: "the vertical gap between total revenue and total cost represents either profit ... or losses"; "The highest total profits ... occur at an output of 70-80, when profits will be $56"; TR is "a straight line sloping up. The slope is equal to the price"; total cost begins at fixed cost) -->
<p>The same answer appears on a graph of totals. Your course textbook: "the vertical gap between total revenue and total cost represents either profit ... or losses."</p>
${FIG5.l21trtc()}
<p><b>Why the two methods agree:</b> the gap stops widening exactly when TR and TC rise at the same rate, that is, when one more unit adds the same to each: MR = MC. The marginal method is the practical one, because firms "do not have the necessary data they need to draw a complete total cost curve" (the textbook) but can test small changes.</p>
<div data-check="l21c-gap"></div>

<h2>Produce more, produce less, or stay?</h2>
<!-- src: MS5, OS82, CBS (sample question 8: a total-cost table for a price taker). Exam skill: compare MR and MC to decide the direction. -->
<p>Many CLEP questions give MR and MC at the current output, or a cost table, and ask what the firm should do. The move: compute the next unit\'s MR and MC, then compare them. Don\'t look at totals or at whether profit is positive.</p>
<div data-widget="mrsort"></div>
<p>What to notice: rising marginal cost or falling marginal revenue doesn\'t decide anything by itself. Only the comparison of the two does.</p>
<div data-check="l21c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L21TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"To maximize profit, sell as much as you can."</span>That maximizes revenue. Past MR = MC each unit costs more than it brings in (HealthPill: revenue peaks at 6 or 7 units, profit at 4).</li>
<li><span class="wrong">"If MR is greater than MC, produce less."</span>The reverse: the next unit adds MR − MC &gt; 0 to profit, so produce more.</li>
<li><span class="wrong">"Stop where marginal profit is largest."</span>Units after that still add profit, just less. Stop where marginal profit falls to zero.</li>
<li><span class="wrong">"At MR = MC, profit is zero."</span>Marginal profit is zero; total profit is at its maximum.</li>
<li><span class="wrong">"MR = MC means price equals average cost."</span>Those are different conditions. MR = MC picks the output; price versus average cost tells how much profit that output earns (Lesson 24).</li>
<li><span class="wrong">"Marginal revenue always equals the price."</span>Only for a ${dt('price-taker','price taker')}. A firm that must cut its price to sell more has MR below price.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Total revenue</b> = price × quantity, and <b>marginal revenue</b> = change in total revenue ÷ change in quantity; MR is below price when a firm must cut its price to sell more.</li>
<li><b>Marginal cost</b> = change in total cost ÷ change in quantity, and it eventually rises because of diminishing returns.</li>
<li>The <b>MR = MC rule</b>: produce more while MR &gt; MC, less when MR &lt; MC, and stop where they are equal.</li>
<li>At that output <b>marginal profit</b> is zero and total profit is at its maximum (raspberry farm $56, HealthPill $800).</li>
<li>On a total revenue and total cost graph, profit is the vertical gap, widest where MR = MC.</li>
<li>On the exam, compare the next unit\'s MR with its MC; totals and rising or falling curves don\'t decide it alone.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Profit maximization: MR = MC rule" under Profit. Expect a cost table for a firm with a given price asking for the profit-maximizing quantity (like the College Board sample question), or a graph asking what the firm should do at an output where MR and MC differ.</p>
</div>`,
  deeper:`
<h3>Why firms think at the margin</h3>
<p>Your course textbook points out that firms rarely know their whole total cost curve, "because they have not tried it." Instead they "experiment": produce a little more or less and watch what happens to profit. That is the MR = MC rule in practice.</p>
<h3>The same rule as Lesson 5</h3>
<p>Lesson 5\'s pizza slices used marginal benefit and marginal cost: keep eating while the next slice is worth more than it costs. For a firm, the marginal benefit of a unit is its marginal revenue. Lesson 14\'s utility rule and Lesson 19\'s least-cost rule are the same idea in other clothes.</p>
<h3>When the best choice is to make nothing</h3>
<p>MR = MC finds the best output if the firm produces at all. Sometimes even the best output loses more than producing nothing would. Lesson 23 adds that check: the shutdown rule.</p>`,
  links:[ {k:'Textbook',t:'8.2 How Perfectly Competitive Firms Make Output Decisions',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/8-2-how-perfectly-competitive-firms-make-output-decisions',w:'The raspberry farm worked both ways: total revenue minus total cost, and marginal revenue against marginal cost.'},
          {k:'Exam',t:'CLEP Principles of Microeconomics sample questions',s:'College Board',u:'https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf',w:'Includes an official question that asks for the profit-maximizing quantity from a total-cost table.'} ]
});
