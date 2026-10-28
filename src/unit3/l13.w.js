/* TEST NOTE (2026-10-27): data from your course (candy bars, slide 3: TU 0,25,45,60,70,75,75,70,60,45,25) and the course textbook
   (José's T-shirts, Table 6.2: TU 0,22,43,63,81,97,111,123,133). MU = TU(q) − TU(q−1). Checked by script:
   candy q=1 → TU 25, MU 25 (rising); q=6 → TU 75, MU 0 (peak); q=10 → TU 25, MU −20 (falling); q=0 → TU 0, no MU.
   T-shirts q=4 → TU 81, MU 18; q=8 → TU 133, MU 10 (always rising). 
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: slider moves with arrow keys. */
W.utility = el => {
  const SETS = { candy:{ TU:CANDY_TU, unit:'candy bar', units:'candy bars', src:'your course', start:3 }, shirts:{ TU:JOSE_T, unit:'T-shirt', units:'T-shirts', src:'your course textbook (José)', start:4 } };
  let k='candy';
  el.innerHTML = `<p class="widget-title">Total and marginal utility explorer</p><p class="hint">Pick a data set, then add or remove units with the slider. Watch both graphs together.</p>
  <div class="seg" role="group" aria-label="Data set"><button data-k="candy" aria-pressed="true">Candy bars (course)</button><button data-k="shirts" aria-pressed="false">T-shirts (textbook)</button></div>
  <div class="slider"><label for="ut-q">Units consumed</label><input id="ut-q" type="range" min="0" max="10" step="1" value="3"><output></output></div>
  <div class="u2row ut-g"></div>
  <div class="readout"><div><b class="ut-tu"></b><span>total utility</span></div><div><b class="ut-mu"></b><span>marginal utility of the last unit</span></div></div>
  <div class="msg"></div>`;
  const SL = $('#ut-q', el);
  const draw = () => {
    const S = SETS[k], TU = S.TU, n = TU.length-1; SL.max = n; const q = Math.min(+SL.value, n); SL.value = q; SL.nextElementSibling.textContent = q;
    const MU = TU.slice(1).map((v,i)=>v-TU[i]), mu = q ? MU[q-1] : null;
    $('.ut-g', el).innerHTML = `<div class="u2cell"><p class="u2t">Total utility</p>${tuChart(TU, { hi:q, xlab:S.units, ymax: Math.ceil(Math.max(...TU)/25)*25+10, yt:[0, Math.ceil(Math.max(...TU)/25)*25] })}</div>`
      + `<div class="u2cell"><p class="u2t">Marginal utility</p><div class="qg">${ubars(MU, { hi:q-1, xlab:S.units, ylab:'Marginal utility (utils)', ymax:Math.max(...MU), ymin:Math.min(0,...MU), colorOf:(v,i)=> i===q-1 ? 'var(--g2)' : i<q ? (v<0?'var(--bad)':'var(--accent)') : 'var(--line)' })}</div></div>`;
    $('.ut-tu', el).textContent = TU[q] + ' utils';
    $('.ut-mu', el).textContent = q ? (mu>0?'+':mu<0?'−':'') + Math.abs(mu) + ' utils' : 'none yet';
    const m = $('.msg', el);
    if(!q){ m.className='msg'; m.innerHTML = `No ${S.units} yet, so total utility is 0. Move the slider to add the first ${S.unit}.`; }
    else if(mu>0){ m.className='msg good'; m.innerHTML = `The ${ordinal(q)} ${S.unit} adds <b>${mu}</b> utils, so total utility <b>rises</b> to ${TU[q]}. ${q>1 && mu<MU[q-2] ? `That's less than the ${MU[q-2]} the one before added: diminishing marginal utility.` : q===1 ? 'The first unit adds the most.' : ''}`; }
    else if(mu===0){ m.className='msg'; m.innerHTML = `The ${ordinal(q)} ${S.unit} adds <b>nothing</b> (marginal utility 0), so total utility stays at ${TU[q]}: its <b>maximum</b>. Eating more would only lower it.`; }
    else { m.className='msg bad'; m.innerHTML = `The ${ordinal(q)} ${S.unit} has marginal utility <b>−${Math.abs(mu)}</b>: it makes you worse off, so total utility <b>falls</b> to ${TU[q]}. Total utility is still positive, but it's shrinking.`; }
  };
  $$('.seg button', el).forEach(b => b.onclick = () => { k = b.dataset.k; $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', x===b)); SL.value = SETS[k].start; draw(); });
  SL.addEventListener('input', draw); draw();
};

/* L13 exam skill: read a utility table. Made-up party-pizza numbers: TU 0,12,22,30,35,37,37,34 → MU 12,10,8,5,2,0,−3. */
/* TEST NOTE (2026-10-27): every item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly.
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: buttons work with Tab and Enter/Space. */
W.zonesort = el => {
  const TU=[0,12,22,30,35,37,37,34];
  el.innerHTML = `<p class="widget-title">Read the utility table</p><p class="hint">Made-up numbers: slices of pizza at a party. Find each slice's marginal utility (its total minus the one above), then pick what it does to total utility.</p>
  ${atable(['Slices','Total utility'], TU.map((v,i)=>[i,v]), { cls:'compact' })}<div class="zs"></div>`;
  sorterWidget($('.zs', el), { title:'What does this slice do?', hint:'Marginal utility positive, zero or negative?', aria:'Effect on total utility',
    kinds:[['up','MU > 0: TU rises'],['top','MU = 0: TU at its max'],['down','MU < 0: TU falls']],
    items:[
      ['The 2nd slice','up','22 − 12 = +10. Positive, so total utility rises, even though it rises by less than the first slice\'s 12.'],
      ['The 6th slice','top','37 − 37 = 0. It adds nothing; total utility is at its highest, 37.'],
      ['The 7th slice','down','34 − 37 = −3. Negative, so total utility falls.'],
      ['The 5th slice','up','37 − 35 = +2. Small, but still positive: total utility rises. Diminishing marginal utility doesn\'t mean total utility falls.'],
      ['The 4th slice','up','35 − 30 = +5. Positive and smaller than the 3rd slice\'s +8: diminishing marginal utility while total utility keeps rising.']
    ]});
};
