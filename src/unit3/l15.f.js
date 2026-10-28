/* ===== Lesson 15 figures ===== */
/* L15 V1: before and after, MU per dollar for pizza at $2 and at $1 (course slides 11 and 13-14) */
FIG3.l15mupBA = () => figs([
  ['Before: pizza $2', atable(['Slice','MU','MU ÷ $2'], PIZZA_MU.map((m,i)=>[ordinal(i+1), m, m/2]), { hl:{1:{2:'u3hi'}}, cls:'compact' })],
  ['After: pizza $1', atable(['Slice','MU','MU ÷ $1'], PIZZA_MU.map((m,i)=>[ordinal(i+1), m, m]), { hl:{3:{2:'u3hi'}}, cls:'compact' })]
], 'Your course\'s pizza, before and after the price falls. Marginal utility (MU) doesn\'t change; MU per dollar doubles. The first soda still gives 8 per dollar, so the slice that matches it moves from the 2nd (16 ÷ $2 = 8) to the 4th (8 ÷ $1 = 8): the consumer buys 4 slices instead of 2.');

/* L15 V2: the course's bundles at $1 pizza, with the slide's arithmetic slip marked */
FIG3.l15totals = () => fig(atable(['Soda','Pizza','Total utility'], [
  [5,0,'8+7+6+5+4 = 30'],[4,1,'26 + 20 = 46*'],[3,2,'21 + 36 = 57'],[2,3,'15 + 48 = 63'],[1,4,'8 + 56 = <b>64 ★</b>'],[0,5,'20+16+12+8+4 = 60 (course: 56)']],
  { hl:{4:{row:'u3z2'}, 5:{2:'u3fix'}}, cls:'wrap',
    note:`<p><b>★ Best: 1 soda and 4 slices, 64 utils.</b></p><p class="small muted">* Your course doesn't list 4 sodas and 1 slice; it's added so every way to spend $5 is shown. For 5 slices, your course's slides add only four slices (20 + 16 + 12 + 8 = 56) and the video also says 56; with the 5th slice's 4 utils the total is 60. Either way, 64 is still the best.</p>` }),
  'Your course\'s bundles when pizza costs $1 (slides 14-18). Every row spends the full $5. Read across: soda utility + pizza utility = total.');

/* L15 V4: deriving the demand curve, budget lines and best bundles above, demand curve below (course slides 10, 18, 19) */
FIG3.l15derive = () => figs([
  ['Best bundles at two prices', gchart2({ xmax:5.5, ymax:6, xlab:'Slices of pizza', ylab:'Cans of soda', xt:[0,1,2,3,4,5], yt:[0,1,3,5], aria:'Budget lines for pizza at $2 and $1 with best bundles',
    body:(X,Y)=>({ under: gline([[0,5],[2.5,0]],X,Y,'var(--muted)','5 4',2) + gline([[0,5],[5,0]],X,Y,'var(--accent)','',2.6) + `<line x1="${X(2)}" x2="${X(2)}" y1="${Y(1)}" y2="${Y(0)}" stroke="var(--g2)" stroke-dasharray="3 3"/><line x1="${X(4)}" x2="${X(4)}" y1="${Y(1)}" y2="${Y(0)}" stroke="var(--g2)" stroke-dasharray="3 3"/>`,
      over: `<circle cx="${X(2)}" cy="${Y(1)}" r="5" fill="var(--muted)"/><circle cx="${X(4)}" cy="${Y(1)}" r="5" fill="var(--g2)"/>` + gtext(X(2)-8, Y(1)-7, 'at $2', 'var(--muted)', 'end') + gtext(X(4), Y(1)-11, 'at $1', 'var(--g2)', 'middle') + gtext(X(1.3)-6, Y(2.4)+12, '$2 line', 'var(--muted)', 'end') + gtext(X(2.6)+6, Y(2.4)-3, '$1 line', 'var(--accent)', 'start') }) })],
  ['Your demand curve for pizza', gchart2({ xmax:5.5, ymax:3, xlab:'Slices of pizza', ylab:'Price of pizza ($)', xt:[0,1,2,3,4,5], yt:[0,1,2,3], aria:'Individual demand curve through 2 slices at $2 and 4 slices at $1',
    body:(X,Y)=>({ under: gline([[1,2.5],[5,0.5]],X,Y,'var(--accent)','',2.6) + `<line x1="${X(2)}" x2="${X(2)}" y1="${Y(2)}" y2="${Y(3)}" stroke="var(--g2)" stroke-dasharray="3 3"/><line x1="${X(4)}" x2="${X(4)}" y1="${Y(1)}" y2="${Y(3)}" stroke="var(--g2)" stroke-dasharray="3 3"/>`,
      over: gdot(X,Y,2,2,'($2, 2)','var(--ink)') + gdot(X,Y,4,1,'($1, 4)','var(--g2)') + gtext(X(5)+2, Y(0.5)-4, 'D', 'var(--accent)') }) })]
], 'Your course\'s pizza. Top: when the price falls from $2 to $1, the budget line pivots out along the pizza axis (the $5 now buys up to 5 slices), and the best bundle moves from 2 slices to 4, with soda staying at 1 can. Bottom: plot each price with the quantity chosen, and the points trace the consumer\'s demand curve (your course\'s slide 19). The dashed guides line up the same quantities.');

/* L15 V6: market demand is the horizontal sum of individual demands (course: you; made-up: Lee) */
FIG3.l15market = () => { const panel = (pts, lab, xmax=8) => gchart2({ xmax, ymax:3, xlab:'Slices', ylab:'Price ($)', xt:[0,2,4,6,8].filter(v=>v<=xmax), yt:[0,1,2,3], aria:`Demand curve: ${lab}`,
    body:(X,Y)=>({ under: gline(pts.map(([q,p])=>[q,p]),X,Y,'var(--accent)','',2.6), over: pts.map(([q,p])=>gdot(X,Y,q,p,`${q}`,'var(--g2)')).join('') }) });
  return figs([['You (course)', panel([[2,2],[4,1]],'you')], ['Lee (made-up)', panel([[1,2],[3,1]],'Lee')], ['Market: you + Lee', panel([[3,2],[7,1]],'market')]],
    'Add quantities, not prices. At $2: you 2 + Lee 1 = <b>3 slices</b>. At $1: you 4 + Lee 3 = <b>7 slices</b>. The market demand curve is the individual curves added sideways (horizontally), one price at a time. Lee\'s numbers are made-up; yours are your course\'s.'); };

/* L15 V7: relative price, what one soda costs in pizza, before and after (course: "the amount of pizzas that we need to give up to get one soda") */
FIG3.l15relp = () => { const slice = (x,y,c) => `<path d="M${x},${y+34} L${x+15},${y} L${x+30},${y+34} Z" fill="${c}" opacity=".75" stroke="var(--ink)" stroke-width=".8"/>`;
  const can = (x,y) => `<rect x="${x}" y="${y}" width="22" height="36" rx="5" fill="var(--g1)" opacity=".7" stroke="var(--ink)" stroke-width=".8"/>`;
  let s=`<svg class="u2bars u3sm" viewBox="0 0 330 200" role="img" aria-label="One soda equals half a slice before and one slice after">`;
  s+=`<text x="8" y="16" class="lbl-ink">Before: pizza $2, soda $1</text>` + can(20,28) + `<text x="56" y="52" class="lbl-ink" style="font-size:16px">=</text>` + `<path d="M80,62 L95,28 L95,62 Z" fill="var(--g2)" opacity=".75" stroke="var(--ink)" stroke-width=".8"/><path d="M95,28 L110,62 L95,62 Z" fill="none" stroke="var(--muted)" stroke-dasharray="3 2"/>` + `<text x="122" y="44" class="lbl-ink">$1 ÷ $2 = ½ slice</text><text x="122" y="60" class="lbl">1 slice costs 2 sodas</text>`;
  s+=`<line x1="8" x2="322" y1="86" y2="86" class="gl"/>`;
  s+=`<text x="8" y="110" class="lbl-ink">After: pizza $1, soda $1</text>` + can(20,122) + `<text x="56" y="146" class="lbl-ink" style="font-size:16px">=</text>` + slice(80,122,'var(--g2)') + `<text x="122" y="138" class="lbl-ink">$1 ÷ $1 = 1 slice</text><text x="122" y="154" class="lbl">1 slice costs 1 soda</text>`;
  s+=`<text x="8" y="190" class="lbl">Soda's dollar price is the same; its pizza price doubled.</text>`;
  return fig(s+'</svg>', 'Relative price in your course\'s example. Before, one soda costs half a slice; after pizza falls to $1, one soda costs a whole slice. Pizza became relatively cheaper and soda relatively more expensive, which is what drives the substitution effect.'); };

/* L15 V8: the two effects of a price fall (course video 3.1 and slides 20-21; textbook §6.2) */
FIG3.l15flow = () => fig(flow([
  'The price of pizza falls from $2 to $1. Your $5 budget and the price of soda stay the same.',
  { split:[
    [{t:'<b>Substitution effect</b>',c:'u3amb'}, 'Pizza is now <b>relatively cheaper</b>; soda is relatively more expensive (1 soda costs 1 slice, not ½).', {t:'More pizza ↑, less soda ↓',c:'u3up'}],
    [{t:'<b>Income effect</b>',c:'u3amb'}, 'The same $5 buys more: your <b>purchasing power</b> rises, as if you were a little richer.', {t:'More of normal goods: more pizza ↑ and more soda ↑',c:'u3up'}] ]},
  { split:[ [{t:'<b>Pizza:</b> both effects say more → pizza rises (2 → 4 slices in your course).',c:'u3end'}], [{t:'<b>Soda:</b> the effects pull opposite ways → it could rise, fall or stay the same (your course: stays at 1).',c:'u3amb'}] ]}
]), 'The two effects of one price cut. For the good whose price fell, both push the same way (if it\'s a normal good). For the other good they disagree, so its quantity depends on which effect is stronger.');

/* L15 V10: the textbook's Kimberly, a rise in income shifts the budget line out in parallel (§6.2, Figure 6.3) */
FIG3.l15income = () => fig(gchart2({ xmax:11, ymax:44, xlab:'Overnight getaways ($200 each)', ylab:'Concert tickets ($50 each)', xt:[0,3,5,10], yt:[0,8,20,40], aria:'Budget line shifts out in parallel from $1,000 to $2,000',
  body:(X,Y)=>({ under: gline([[0,20],[5,0]],X,Y,'var(--muted)','5 4',2) + gline([[0,40],[10,0]],X,Y,'var(--accent)','',2.6) + `<line x1="${X(3)}" x2="${X(3)}" y1="${Y(0)}" y2="${Y(44)}" stroke="var(--muted)" stroke-dasharray="3 3"/><line x1="${X(0)}" x2="${X(11)}" y1="${Y(8)}" y2="${Y(8)}" stroke="var(--muted)" stroke-dasharray="3 3"/>`,
    over: gdot(X,Y,3,8,'M','var(--ink)') + gdot(X,Y,5,20,'N: more of both','var(--g2)') + gdot(X,Y,2,32,'P','var(--g1)') + gdot(X,Y,9,4,'Q','var(--g1)') + gtext(X(5)+3, Y(1.5), '$1,000', 'var(--muted)') + gtext(X(7.6)+6, Y(12), '$2,000', 'var(--accent)', 'start') }) }),
  'Your course textbook\'s Kimberly (§6.2). Her budget for concerts and getaways rises from $1,000 to $2,000 with prices unchanged, so the budget line shifts out <b>parallel</b>. From her old choice M (8 concerts, 3 getaways), N gives more of both (both normal goods). P means fewer getaways (getaways inferior for her); Q means fewer concerts (concerts inferior).');
