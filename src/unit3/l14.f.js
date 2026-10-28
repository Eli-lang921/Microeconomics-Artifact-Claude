/* ===== Lesson 14 figures ===== */
/* L14 V1: the course's budget line, $5, pizza $2 (across), soda $1 (up), with the bundles the course compares */
FIG3.l14budget = () => fig(gchart2({ xmax:3, ymax:6, xlab:'Slices of pizza ($2 each)', ylab:'Cans of soda ($1 each)', xt:[0,1,2,2.5,3], yt:[0,1,2,3,4,5,6],
  aria:'Budget line from 5 sodas to 2.5 slices of pizza, with three bundles marked',
  body:(X,Y)=>({ under: `<polygon points="${X(0)},${Y(0)} ${X(0)},${Y(5)} ${X(2.5)},${Y(0)}" fill="var(--accent-soft)" opacity=".6"/>` + gline([[0,5],[2.5,0]],X,Y,'var(--accent)','',2.6),
    over: gdot(X,Y,0,5,'A: 30 utils') + gdot(X,Y,1,3,'B: 41 utils') + gdot(X,Y,2,1,'C: 44 utils','var(--g2)') + `<circle cx="${X(1)}" cy="${Y(2)}" r="4" fill="none" stroke="var(--muted)" stroke-width="1.6"/>` + gtext(X(1)+8, Y(2)+12, '$4: $1 unspent', 'var(--muted)', 'start') + gtext(X(2.2), Y(4.6), 'not affordable', 'var(--bad)', 'middle') }) }),
  'Your course\'s budget: $5, pizza $2 a slice, soda $1 a can. Every point on the line spends exactly $5; shaded points inside leave money unspent; points beyond the line cost more than $5. A, B and C are the three bundles your course compares, with their total utility.');

/* L14 V2: total utility of each bundle, built from the marginal utilities (course slides 7-10) */
FIG3.l14totals = () => { const B=[[5,0],[3,1],[1,2]], W=470, rowH=46, x0=118, sc=6.2;
  let s=`<svg class="u2bars" viewBox="0 0 ${W} ${B.length*rowH+34}" role="img" aria-label="Stacked bars of marginal utility for three bundles">`;
  B.forEach(([so,pz],r)=>{ const y=8+r*rowH; let x=x0; const best = so===1;
    s+=`<text x="${x0-8}" y="${y+16}" text-anchor="end" class="lbl-ink" style="font-weight:${best?700:500}">${so} soda + ${pz} pizza</text><text x="${x0-8}" y="${y+30}" text-anchor="end" class="lbl">$${so} + $${2*pz} = $5</text>`;
    SODA_MU.slice(0,so).forEach(m=>{ s+=`<rect x="${x.toFixed(1)}" y="${y+4}" width="${(m*sc-1.5).toFixed(1)}" height="28" rx="3" fill="var(--g1)" opacity=".55"/><text x="${(x+m*sc/2).toFixed(1)}" y="${y+22}" text-anchor="middle" class="lbl-ink">${m}</text>`; x+=m*sc; });
    PIZZA_MU.slice(0,pz).forEach(m=>{ s+=`<rect x="${x.toFixed(1)}" y="${y+4}" width="${(m*sc-1.5).toFixed(1)}" height="28" rx="3" fill="var(--accent)" opacity=".55"/><text x="${(x+m*sc/2).toFixed(1)}" y="${y+22}" text-anchor="middle" class="lbl-ink">${m}</text>`; x+=m*sc; });
    s+=`<text x="${(x+6).toFixed(1)}" y="${y+23}" class="lbl-ink halo" style="fill:${best?'var(--g2)':'var(--ink)'};font-weight:700">= ${psTU(so,pz)}${best?' ★':''}</text>`; });
  const ly=B.length*rowH+20; s+=`<rect x="${x0}" y="${ly-9}" width="12" height="10" fill="var(--g1)" opacity=".55"/><text x="${x0+16}" y="${ly}" class="lbl">soda (MU of each can)</text><rect x="${x0+150}" y="${ly-9}" width="12" height="10" fill="var(--accent)" opacity=".55"/><text x="${x0+166}" y="${ly}" class="lbl">pizza (MU of each slice)</text>`;
  return fig(s+'</svg>', 'Your course\'s three ways to spend $5. Each block is one unit\'s marginal utility; the row\'s length is the bundle\'s total utility. One soda and two slices wins with 44 utils. (Your course\'s slides 8 and 9 print this bundle as 9 + 20 + 16 = 45; the first soda adds 8, so it\'s 44, as slide 10 and the video say.)'); };

/* L14 V3: marginal utility per dollar tables (course slide 11) with the chosen units marked */
FIG3.l14mup = () => fig(`<div class="u3pair">
  <div><p class="u2t">Soda ($1 a can)</p>${atable(['Can','MU','MU ÷ $1'], SODA_MU.map((m,i)=>[ordinal(i+1), m, m]), { hl:{0:{2:'u3hi'}}, cls:'compact' })}</div>
  <div><p class="u2t">Pizza ($2 a slice)</p>${atable(['Slice','MU','MU ÷ $2'], PIZZA_MU.map((m,i)=>[ordinal(i+1), m, m/2]), { hl:{1:{2:'u3hi'}}, cls:'compact' })}</div></div>
  <div class="u3notes"><p>The best bundle, 1 soda and 2 slices, stops where the last unit of each good gives the same <b>8 utils per dollar</b> (outlined).</p></div>`,
  'Your course\'s slide 11: each unit\'s marginal utility divided by its price. Pizza\'s marginal utilities are bigger, but each slice costs twice as much, so per dollar the second slice (8) ties the first soda (8).');

/* L14 V4: analogy illustration, checkout lanes even out (made-up picture) */
FIG3.l14lanes = () => {
  const lane = (y, n, lab, moving) => { let s=`<rect x="70" y="${y}" width="270" height="34" rx="6" fill="var(--surface-2)" stroke="var(--line)"/><text x="62" y="${y+22}" text-anchor="end" class="lbl-ink">${lab}</text>`;
    for(let i=0;i<n;i++){ const mv = i>=n-moving; s+=`<circle cx="${92+i*30}" cy="${y+17}" r="10" fill="${mv?'var(--g2)':'var(--accent)'}" opacity="${mv?0.6:0.8}"/>`; } return s; };
  let s=`<svg class="u2bars u3sm" viewBox="0 0 360 200" role="img" aria-label="Two checkout lanes before and after shoppers switch">`;
  s+=`<defs><marker id="u3ln" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--g2)"/></marker></defs>`;
  s+=`<text x="70" y="14" class="lbl">Before: a long wait and a short one</text>` + lane(20,7,'Lane 1',2) + lane(62,3,'Lane 2',0);
  s+=`<path d="M300 40 C 335 52, 335 66, 200 79" fill="none" stroke="var(--g2)" stroke-width="2" marker-end="url(#u3ln)"/>`;
  s+=`<text x="70" y="124" class="lbl">After: shoppers switch until the waits match</text>` + lane(130,5,'Lane 1',0) + lane(166,5,'Lane 2',0);
  return fig(s+'</svg>', 'Analogy, made-up picture: shoppers leave the slow lane for the fast one, which slows the fast lane and speeds up the slow one, until the waits are equal. Spending moves between goods the same way until each good gives the same utility per dollar.'); };

/* L14 V5: the equal-MU-per-dollar rule as a cause-and-effect chain */
FIG3.l14flow = () => fig(flow([
  'Compare the last dollar on each good: <b>MU<sub>A</sub> ÷ P<sub>A</sub></b> versus <b>MU<sub>B</sub> ÷ P<sub>B</sub></b>.',
  { split:[
    [{t:'If A gives more per dollar (say 10 versus 6):',c:'u3up'}, 'Move a dollar from B to A: lose about 6 utils, gain about 10. Total utility <b>rises</b>.', 'Buying more A lowers A\'s marginal utility; buying less B raises B\'s (diminishing marginal utility).'],
    [{t:'Or, if B gives more per dollar:',c:'u3up'}, 'Move a dollar from A to B instead. Total utility rises.', 'B\'s marginal utility falls and A\'s rises.'] ]},
  'The gap closes with each move.',
  {t:'When MU<sub>A</sub> ÷ P<sub>A</sub> = MU<sub>B</sub> ÷ P<sub>B</sub> and the whole budget is spent, no move can raise total utility: this is the <b>best bundle</b>.', c:'u3end'}]),
  'Why the rule works. Each shift toward the better buy raises total utility, and diminishing marginal utility shrinks the gap until the two goods give the same satisfaction per dollar (your course textbook\'s reasoning in §6.1, with made-up numbers 10 and 6).');

/* L14 V8: the textbook's José, budget line points and the step-by-step gains */
FIG3.l14jose = () => { const P=[['P',4,0,81],['Q',3,2,94],['R',2,4,101],['S',1,6,103],['T',0,8,100]];
  return figs([
    ['José\'s budget line', gchart2({ xmax:5, ymax:9, xlab:'T-shirts ($14)', ylab:'Movies ($7)', xt:[0,1,2,3,4], yt:[0,2,4,6,8], aria:'José budget line with points P to T',
      body:(X,Y)=>({ under: gline([[0,8],[4,0]],X,Y,'var(--accent)','',2.6), over: P.map(([n,t,m,u])=>gdot(X,Y,t,m,`${n} ${u}`, n==='S'?'var(--g2)':'var(--accent)')).join('') }) })],
    ['Utility gained by trading 1 T-shirt for 2 movies', `<div class="qg">${ubars([13,7,2,-3], { labels:['P→Q','Q→R','R→S','S→T'], xlab:'Move', ylab:'Net change (utils)', ymax:13, ymin:-3, colorOf:(v)=> v>0?'var(--accent)':'var(--bad)' })}</div>`]
  ], 'Your course textbook\'s José: $56, T-shirts $14, movies $7 (§6.1, Tables 6.3 and 6.4). The labels give total utility at each point. Each move gives up one T-shirt for two movies; the gains shrink (+13, +7, +2) and turn into a loss (−3), so S, with 1 T-shirt and 6 movies, is best.'); };
