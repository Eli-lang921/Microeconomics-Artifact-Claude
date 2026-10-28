/* TEST NOTE (2026-10-27): bundles that spend the whole budget.
   Course ($5, soda $1, pizza $2; MU soda 8,7,6,5,4; pizza 20,16,12,8,4): pizza 0 → 5 soda, TU 30, last soda 4/$, next pizza 10/$ (move to pizza);
   pizza 1 → 3 soda, TU 41, last pizza 10/$ vs last soda 6/$ (move to pizza); pizza 2 → 1 soda, TU 44, 8/$ = 8/$ (best).
   Textbook José ($56, T-shirts $14, movies $7; Table 6.2): T 0 → M 8, TU 100, last movie 9/7 = 1.29 vs next T 22/14 = 1.57 (move to T);
   T 1 → M 6, TU 103, 22/14 = 11/7 = 1.57 (best); T 2 → M 4, TU 101, 21/14 = 1.50 vs 13/7 = 1.86 (move to movies);
   T 3 → M 2, TU 94, 1.43 vs 2.14; T 4 → M 0, TU 81, last T 18/14 = 1.29 vs next movie 16/7 = 2.29. Equality tested with a 0.001 tolerance. 
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: slider moves with arrow keys. */
W.bundle = el => {
  const SETS = {
    course:{ x:{n:'pizza', sg:'pizza', unit:'slice', units:'slices of pizza', p:2, MU:PIZZA_MU}, y:{n:'soda', sg:'soda', unit:'can', units:'cans of soda', p:1, MU:SODA_MU}, I:5, src:'your course' },
    jose:{ x:{n:'T-shirts', sg:'T-shirt', unit:'T-shirt', units:'T-shirts', p:14, MU:JOSE_T.slice(1).map((v,i)=>v-JOSE_T[i])}, y:{n:'movies', sg:'movie', unit:'movie', units:'movies', p:7, MU:JOSE_M.slice(1).map((v,i)=>v-JOSE_M[i])}, I:56, src:'your course textbook' } };
  let k='course';
  el.innerHTML = `<p class="widget-title">Find the best bundle</p><p class="hint">Every choice here spends the whole budget. Move the slider to trade one good for the other and watch total utility and the utility per dollar of the last unit of each good.</p>
  <div class="seg" role="group" aria-label="Data set"><button data-k="course" aria-pressed="true">Pizza and soda (course)</button><button data-k="jose" aria-pressed="false">José (textbook)</button></div>
  <div class="slider"><label for="bu-x"></label><input id="bu-x" type="range" min="0" max="2" step="1" value="0"><output></output></div>
  <div class="bu-chart"></div>
  <div class="readout"><div><b class="bu-b"></b><span>bundle</span></div><div><b class="bu-tu"></b><span>total utility</span></div><div><b class="bu-mx"></b><span class="bu-mxl"></span></div><div><b class="bu-my"></b><span class="bu-myl"></span></div></div>
  <div class="msg"></div>`;
  const SL = $('#bu-x', el);
  const sum = (a,n) => a.slice(0,n).reduce((s,v)=>s+v,0);
  const per = (mu,p) => round(mu/p, 2);
  const draw = () => {
    const D = SETS[k], X = D.x, Y = D.y, xmax = Math.floor(D.I/X.p); SL.max = xmax; const qx = Math.min(+SL.value, xmax); SL.value = qx;
    $('label[for="bu-x"]', el).textContent = `${X.units[0].toUpperCase()+X.units.slice(1)} ($${X.p} each)`; SL.nextElementSibling.textContent = qx;
    const qy = (D.I - qx*X.p)/Y.p, tu = sum(X.MU,qx) + sum(Y.MU,qy);
    const rows = []; for(let a=0;a<=xmax;a++){ const b=(D.I-a*X.p)/Y.p; rows.push([`${a} ${a===1?X.sg:X.n}, ${b} ${b===1?Y.sg:Y.n}`, sum(X.MU,a)+sum(Y.MU,b), a===qx?'var(--g2)':undefined]); }
    $('.bu-chart', el).innerHTML = hbars(rows, { max: Math.max(...rows.map(r=>r[1]))*1.15, w:330, left:122, fmt:v=>v+' utils' });
    $('.bu-b', el).textContent = `${qx} ${qx===1?X.sg:X.n} + ${qy} ${qy===1?Y.sg:Y.n}`; $('.bu-tu', el).textContent = tu + ' utils';
    const lx = qx ? per(X.MU[qx-1], X.p) : null, ly = qy ? per(Y.MU[qy-1], Y.p) : null;
    $('.bu-mx', el).textContent = qx ? fmt(lx) : '–'; $('.bu-mxl', el).textContent = `utils per $ on the last ${X.unit}`;
    $('.bu-my', el).textContent = qy ? fmt(ly) : '–'; $('.bu-myl', el).textContent = `utils per $ on the last ${Y.unit}`;
    const m = $('.msg', el), nx = qx<xmax ? per(X.MU[qx], X.p) : null, ny = qy>0 && qx>0 ? null : null;
    if(qx && qy && Math.abs(X.MU[qx-1]/X.p - Y.MU[qy-1]/Y.p) < 0.001){ m.className='msg good'; m.innerHTML = `<b>Best bundle.</b> The last ${X.unit} gives ${X.MU[qx-1]} ÷ $${X.p} = ${fmt(lx)} utils per dollar and the last ${Y.unit} gives ${Y.MU[qy-1]} ÷ $${Y.p} = ${fmt(ly)}. Equal, with the whole $${D.I} spent: no trade between them can raise total utility (${tu}, the highest bar).`; }
    else if(!qx){ m.className='msg'; m.innerHTML = `All ${Y.n}. The last ${Y.unit} gives only ${fmt(ly)} utils per dollar, while a first ${X.unit} would give ${fmt(nx)}. Spending should move toward ${X.n}: slide right.`; }
    else if(!qy){ m.className='msg'; m.innerHTML = `All ${X.n}. The last ${X.unit} gives only ${fmt(lx)} utils per dollar, while a first ${Y.unit} would give ${fmt(per(Y.MU[0],Y.p))}. Spending should move toward ${Y.n}: slide left.`; }
    else if(lx > ly){ m.className='msg'; m.innerHTML = `The last ${X.unit} gives ${fmt(lx)} utils per dollar, more than the last ${Y.unit}'s ${fmt(ly)}. Moving spending toward ${X.n} raises total utility: slide right.`; }
    else { m.className='msg'; m.innerHTML = `The last ${Y.unit} gives ${fmt(ly)} utils per dollar, more than the last ${X.unit}'s ${fmt(lx)}. Moving spending toward ${Y.n} raises total utility: slide left.`; }
  };
  $$('.seg button', el).forEach(b => b.onclick = () => { k = b.dataset.k; $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', x===b)); SL.value = 0; draw(); });
  SL.addEventListener('input', draw); draw();
};

/* TEST NOTE (2026-10-27): course data, budget $5, soda $1. Buys the affordable unit with the highest MU per dollar; on a tie it buys the cheaper unit first.
   Pizza $2: pizza 1 (10/$, $3 left) → tie soda 1 = pizza 2 = 8/$ → soda 1 ($2 left) → pizza 2 (8/$ vs soda 7/$; $0 left). Ends 1 soda + 2 pizza, TU 44.
   Pizza $1: pizza 1 (20), pizza 2 (16), pizza 3 (12) ($2 left) → tie soda 1 = pizza 4 = 8 → soda ($1 left) → pizza 4 (8 vs 7; $0). Ends 1 soda + 4 pizza, TU 64. 
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: buttons work with Tab and Enter/Space. */
W.shopper = el => {
  let pp = 2, st;
  el.innerHTML = `<p class="widget-title">Spend $5 one purchase at a time</p><p class="hint">Your course's pizza and soda. Each click buys the unit that gives the most utility per dollar among those you can still afford.</p>
  <div class="seg" role="group" aria-label="Price of pizza"><button data-p="2" aria-pressed="true">Pizza $2 (course)</button><button data-p="1" aria-pressed="false">Pizza $1 (course, Lesson 15)</button></div>
  <div class="row" style="margin-top:8px"><button class="btn sm sh-go">Buy the next best unit</button><button class="btn ghost sm sh-reset">Start over</button></div>
  <div class="readout"><div><b class="sh-left"></b><span>money left</span></div><div><b class="sh-b"></b><span>bought so far</span></div><div><b class="sh-tu"></b><span>total utility</span></div></div>
  <div class="sh-next msg"></div><ol class="u3log"></ol>`;
  const reset = () => { st = { s:0, k:0, left:5, log:[] }; draw(); };
  const opts = () => { const o=[]; if(st.s<5 && st.left>=1) o.push({g:'soda', mu:SODA_MU[st.s], p:1}); if(st.k<5 && st.left>=pp) o.push({g:'pizza', mu:PIZZA_MU[st.k], p:pp}); o.forEach(x=>x.per=x.mu/x.p); return o; };
  const draw = () => {
    $('.sh-left', el).textContent = money(st.left); $('.sh-b', el).textContent = `${st.s} soda, ${st.k} pizza`; $('.sh-tu', el).textContent = psTU(st.s, st.k) + ' utils';
    const o = opts(), nx = $('.sh-next', el), go = $('.sh-go', el);
    if(!o.length){ go.disabled = true; nx.className='sh-next msg good'; nx.innerHTML = `<b>Done: ${st.s} soda and ${st.k} slices for ${psTU(st.s,st.k)} utils.</b> The last soda gave ${SODA_MU[st.s-1]} ÷ $1 = ${SODA_MU[st.s-1]} utils per dollar and the last slice ${PIZZA_MU[st.k-1]} ÷ $${pp} = ${fmt(PIZZA_MU[st.k-1]/pp)}: equal, as the rule says. ${pp===2?'This matches the best bundle your course finds by adding up total utility.':'This is your course\'s new best bundle at $1 a slice (Lesson 15).'}`; }
    else { go.disabled = false; nx.className='sh-next msg'; nx.innerHTML = 'Next choices: ' + o.map(x=>`${x.g} #${(x.g==='soda'?st.s:st.k)+1}: ${x.mu} ÷ $${x.p} = <b>${fmt(x.per)}</b> utils per dollar`).join(' · '); }
    $('.u3log', el).innerHTML = st.log.map(t=>`<li>${t}</li>`).join('');
  };
  $('.sh-go', el).onclick = () => { const o = opts(); if(!o.length) return; o.sort((a,b)=> b.per-a.per || a.p-b.p); const x=o[0], tie = o.length>1 && o[1].per===x.per;
    if(x.g==='soda') st.s++; else st.k++; st.left = round(st.left - x.p, 2);
    st.log.push(`Bought ${x.g} #${x.g==='soda'?st.s:st.k} (${fmt(x.per)} utils per dollar)${tie?`: a tie with ${o[1].g}${o[1].p>x.p?', so the cheaper one first':' at the same price, so either works'}`:''}. ${money(st.left)} left.`); draw(); };
  $('.sh-reset', el).onclick = reset;
  $$('.seg button', el).forEach(b => b.onclick = () => { pp = +b.dataset.p; $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', x===b)); reset(); });
  reset();
};

/* L14 exam skill: which way should spending move? All numbers made-up. MU per dollar: coffee 12/3 = 4 = muffin 8/2; book 30/10 = 3 < movie 20/5 = 4;
   song 4/1 = 4 > album 24/8 = 3; apple 6/1 = 6 < mango 15/2 = 7.5; bus 10/2 = 5 > taxi 50/20 = 2.5. */
/* TEST NOTE (2026-10-27): every item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly.
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: buttons work with Tab and Enter/Space. */
W.mupsort = el => sorterWidget(el, { title:'Which way should spending move?', hint:'Made-up numbers for the last unit of each good bought. Divide each marginal utility by its price, then compare.', aria:'Best move',
  kinds:[['a','More of the first good, less of the second'],['b','More of the second good, less of the first'],['ok','Already the best mix']],
  items:[
    ['Coffee: MU 12, price $3. Muffin: MU 8, price $2.','ok','12 ÷ 3 = 4 and 8 ÷ 2 = 4 utils per dollar. Equal, so (if the budget is all spent) no shift can raise total utility.'],
    ['Book: MU 30, price $10. Movie ticket: MU 20, price $5.','b','Book 30 ÷ 10 = 3; movie 20 ÷ 5 = 4 per dollar. The movie is the better buy per dollar even though the book\'s marginal utility is higher.'],
    ['Song download: MU 4, price $1. Album: MU 24, price $8.','a','Song 4 ÷ 1 = 4; album 24 ÷ 8 = 3 per dollar. More songs, fewer albums.'],
    ['Apple: MU 6, price $1. Mango: MU 15, price $2.','b','Apple 6 per dollar; mango 15 ÷ 2 = 7.5 per dollar. More mangoes, fewer apples.'],
    ['Bus ride: MU 10, price $2. Taxi ride: MU 50, price $20.','a','Bus 10 ÷ 2 = 5; taxi 50 ÷ 20 = 2.5 per dollar. The taxi feels better (50 utils) but is a worse buy per dollar.']
  ]});
