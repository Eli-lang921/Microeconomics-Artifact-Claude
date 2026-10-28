/* ===== Unit 3 lesson figures (static). Numbers come from the course (Modern States 3.1 / Module 3 slides), the course textbook,
   or made-up examples that the caption labels as made-up. Colors: utility = accent (green), negative = bad (red), highlight = g2 (amber). ===== */
const FIG3 = {};
const CANDY_MU = CANDY_TU.slice(1).map((v,i)=>v-CANDY_TU[i]);   // 25,20,15,10,5,0,-5,-10,-15,-20

/* L13 V7: utils compare one person's choices, not two people's feelings (course textbook §6.1) */
FIG3.l13utils = () => fig(`<div class="u3pair">
  <div class="u3card ok"><p class="u3h">✓ One person, two choices</p><p>Ana: coffee <b>20 utils</b>, tea <b>12 utils</b>.</p><p class="small">Ana prefers coffee. Utils rank <b>her</b> options.</p></div>
  <div class="u3card no"><p class="u3h">✗ Two people, one choice</p><p>Ana: coffee <b>20 utils</b>. Ben: coffee <b>10 utils</b>.</p><p class="small">This does <b>not</b> mean Ana enjoys coffee twice as much as Ben. Their util scales aren't the same ruler.</p></div></div>`,
  'Made-up numbers. Utils are a private scoreboard: they let one person compare their own options, but they can\'t be compared between people (your course textbook\'s coffee example).');

/* L13 V3: total utility is built from marginal-utility blocks (course candy bars 1-4) */
FIG3.l13stack = () => { const mus=[25,20,15,10], W=320, H=230, x0=34, base=190, sc=1.95, cw=52, gap=20;
  let s=`<svg class="u2bars u3sm" viewBox="0 0 ${W} ${H}" role="img" aria-label="Stacked blocks: total utility built from marginal utilities">`;
  s+=`<line x1="${x0-6}" x2="${W-8}" y1="${base}" y2="${base}" class="ax"/>`;
  mus.forEach((_,col)=>{ let y=base; const x=x0+col*(cw+gap);
    for(let k=0;k<=col;k++){ const hgt=mus[k]*sc; y-=hgt; const isNew=k===col;
      s+=`<rect x="${x}" y="${y.toFixed(1)}" width="${cw}" height="${(hgt-1.5).toFixed(1)}" rx="3" fill="${isNew?'var(--g2)':'var(--accent)'}" opacity="${isNew?0.95:0.55}"/><text x="${x+cw/2}" y="${(y+hgt/2+4).toFixed(1)}" text-anchor="middle" class="lbl-ink">${mus[k]}</text>`; }
    const tot=mus.slice(0,col+1).reduce((a,b)=>a+b,0);
    s+=`<text x="${x+cw/2}" y="${(y-6).toFixed(1)}" text-anchor="middle" class="lbl-ink halo">TU ${tot}</text><text x="${x+cw/2}" y="${base+15}" text-anchor="middle" class="lbl">${col+1} bar${col?'s':''}</text>`; });
  s+=`<rect x="${x0}" y="${H-18}" width="12" height="10" fill="var(--g2)"/><text x="${x0+17}" y="${H-9}" class="lbl">new block = marginal utility of that bar</text>`;
  return fig(s+'</svg>', 'Your course\'s candy bars. Each column is total utility after 1, 2, 3 and 4 bars; the amber block on top is the marginal utility the newest bar added (25, then 20, 15, 10). Total utility is the sum of the marginal utilities: 25 + 20 + 15 + 10 = 70.'); };

/* L13 V1: everyday illustration, ten candy bars with what each one adds */
FIG3.l13candy = () => { const W=320, H=250, cw=50, gap=12, x0=12;
  let s=`<svg class="u2bars u3sm" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ten candy bars, each labeled with its marginal utility">`;
  CANDY_MU.forEach((mu,i)=>{ const r=Math.floor(i/5), c=i%5, x=x0+c*(cw+gap), y=r*112, col = mu>0 ? 'var(--accent)' : mu===0 ? 'var(--g2)' : 'var(--bad)';
    s+=`<text x="${x+cw/2}" y="${y+16}" text-anchor="middle" class="lbl">bar ${i+1}</text>`;
    s+=`<rect x="${x}" y="${y+22}" width="${cw}" height="52" rx="7" fill="var(--surface-2)" stroke="${col}" stroke-width="2"/><rect x="${x+6}" y="${y+33}" width="${cw-12}" height="30" rx="4" fill="${col}" opacity=".35"/>`;
    s+=`<text x="${x+cw/2}" y="${y+95}" text-anchor="middle" class="lbl-ink" style="fill:${col};font-size:15px">${mu>0?'+':''}${mu}</text>`; });
  s+=`<text x="${x0}" y="${H-6}" class="lbl">utils each bar adds (its marginal utility)</text>`;
  return fig(s+'</svg>', 'Your course\'s candy bars, one at a time. The first adds 25 utils. Each later bar adds less; the 6th adds nothing; from the 7th on, each bar makes you worse off (stomach ache, sugar high).'); };

/* L13 V2: annotated total and marginal utility table with the three zones (course slide 3) */
FIG3.l13zones = () => { const rows=[], hl={};
  for(let q=0;q<=10;q++){ const mu = q? CANDY_TU[q]-CANDY_TU[q-1] : null;
    rows.push([q, CANDY_TU[q], q? (mu>0?'+':'')+mu : '', q? `${CANDY_TU[q]} − ${CANDY_TU[q-1]}` : '']);
    hl[q] = { row: q===0 ? '' : mu>0 ? 'u3z1' : mu===0 ? 'u3z2' : 'u3z3' }; }
  return fig(atable(['Candy bars','Total utility','Marginal utility','How MU is found'], rows, { hl, cls:'u3zone',
    note:`<p><span class="u3key u3z1"></span><b>Bars 1-5:</b> MU is positive, so TU rises (but by less each time).</p><p><span class="u3key u3z2"></span><b>Bar 6:</b> MU is 0, so TU stops rising: 75 is the most it gets.</p><p><span class="u3key u3z3"></span><b>Bars 7-10:</b> MU is negative, so TU falls.</p>` }),
    'Your course\'s candy bar table (slide 3) with the zones marked. Read across a row: marginal utility is this row\'s total minus the row above it.'); };

/* L13 V4: total and marginal utility graphs, lined up */
FIG3.l13graphs = () => figs([
  ['Total utility', tuChart(CANDY_TU, { hi:6, xlab:'Candy bars eaten', ymax:90, yt:[0,25,50,75], xt:[0,2,4,6,8,10] })],
  ['Marginal utility', `<div class="qg">${ubars(CANDY_MU, { hi:5, ymax:25, ymin:-20, xlab:'Candy bars eaten', ylab:'Marginal utility (utils)' })}</div>`]
], 'Your course\'s candy bars graphed. The total utility curve climbs while the marginal utility bars are above zero, flattens at bar 6 (amber) where marginal utility is 0, and falls once the bars drop below zero. Marginal utility is the slope of the total utility curve: how much it climbs per bar.');

/* L13 V6: why marginal utility diminishes (course textbook's José, Table 6.2) */
FIG3.l13dmu = () => figs([
  ['', flow(['You have no T-shirts. The first one goes to the use you care about most: <b>your favorite</b> (+22 utils).',
             'With one already, the next one fills a <b>slightly less important</b> need (+21, then +20).',
             'By the 4th, it\'s only "something to wear when all his other clothes are in the wash" (+18).',
             {t:'Each extra unit serves a less valuable use, so it adds less: <b>diminishing marginal utility</b>.', c:'u3end'}])],
  ['José\'s marginal utility per T-shirt', `<div class="qg">${ubars(JOSE_T.slice(1).map((v,i)=>v-JOSE_T[i]), { ymax:22, ymin:0, xlab:'T-shirts', ylab:'Marginal utility (utils)', hi:3 })}</div>`]
], 'Your course textbook\'s José (Table 6.2): the chain of reasons, then his marginal utility from each T-shirt, falling from 22 to 10. Total utility still rises the whole time (22, 43, 63, 81 ...), just more slowly.');
