/* ===================== Unit 6 widgets ===================== */
/* L29 widget: add workers one at a time (your course's toaster company, video 6.1, slides 253-254).
   TEST NOTE (2026-11-04), expected (checked by script): 0 workers → output 0, no MP; 1 → 50, MP 50, avg 50; 3 → 120, MP 30, avg 40; 5 → 150, MP 10, avg 30; 6 → 150, MP 0, avg 25.
   UI checked by Playwright (2026-11-08): no overflow at 375 px light and 1100 px dark; the slider moves with arrow keys; at 6 workers it reads "leaves output at 150". */
W.toaster = el => {
  el.innerHTML = `<p class="widget-title">Add a worker</p><p class="hint">Your course\'s toaster company. Move the slider to hire workers one at a time and see what the newest one adds. Grey bars show what each worker not yet hired would add.</p>
  <div class="slider"><label for="tw-n">Workers hired</label><input id="tw-n" type="range" min="0" max="6" step="1" value="3"><output></output></div>
  <div class="tw-g"></div>
  <div class="readout"><div><b class="tw-q"></b><span>toasters a day</span></div><div><b class="tw-mp"></b><span>marginal product of the newest worker</span></div><div><b class="tw-av"></b><span>output per worker (not the same thing)</span></div></div>
  <div class="msg"></div>`;
  const S6 = $('#tw-n', el);
  const draw = () => {
    const n = +S6.value; S6.nextElementSibling.textContent = n;
    const mps = TO.slice(1).map(r=>r.mp);
    $('.tw-g', el).innerHTML = `<div class="qg" style="max-width:420px">${ubars(mps, { labels:['1st','2nd','3rd','4th','5th','6th'], ylab:'Extra toasters', xlab:'Worker', ymax:50, hi: n-1, colorOf:(v,i)=> i===n-1 ? 'var(--g2)' : i<n ? 'var(--accent)' : 'var(--line)' })}</div>`;
    $('.tw-q', el).textContent = TO[n].q; $('.tw-mp', el).textContent = n ? TO[n].mp : '–'; $('.tw-av', el).textContent = n ? fmt(TO[n].q/n) : '–';
    const m = $('.msg', el);
    m.innerHTML = !n ? 'No workers, no toasters. Add one.' :
      (TO[n].mp===0 ? `The ${ordinal(n)} worker leaves output at ${TO[n].q}: a marginal product of <b>0</b>.` : `The ${ordinal(n)} worker raises output from ${TO[n-1].q} to ${TO[n].q}: a marginal product of <b>${TO[n].mp}</b>.`) + (n>1 ? ` That is ${TO[n-1].mp - TO[n].mp} less than the worker before.` : '') + (TO[n].mp===0 ? ' He adds nothing, yet total output stays at 150, not zero.' : ' Output still rises.');
  };
  S6.addEventListener('input', draw); draw();
};

/* L29 exam skill: does the demand for these workers rise, fall or stay? Made-up scenarios plus the textbook's chefs, attorneys and nurses.
   TEST NOTE (2026-11-04): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly.
   UI checked by Playwright (2026-11-08): no overflow at 375 px light and 1100 px dark; choice buttons are native buttons that respond to Enter (sorter Enter key tested by script). */
W.dersort = el => sorterWidget(el, { title:'Trace it back from the product', hint:'Made-up scenarios unless marked. Ask what happens to the product first, then to the workers who make it.', aria:'Effect on labor demand',
  kinds:[['up','Labor demand rises'],['down','Labor demand falls'],['none','Labor demand unchanged']],
  items:[
    ['More people decide to eat at restaurants (your textbook\'s chefs). What happens to the demand for chefs?','up','Chefs make restaurant meals, so more meals demanded means more chefs wanted at every wage.'],
    ['Streaming replaces DVDs, and almost no one buys DVDs. What happens to the demand for workers at DVD factories?','down','Fewer DVDs demanded means factories need fewer workers: derived demand falls.'],
    ['An aging population needs more health care (your textbook\'s example). What happens to the demand for nurses?','up','Nurses produce health care. More health care demanded shifts the demand for nurses right.'],
    ['Many more students enroll in nursing schools. What happens to the demand for nurses?','none','This adds nurses to the market: it is a change in labor supply (Lesson 32), not in employers\' demand.'],
    ['A new law means many more people need legal help (your textbook\'s attorneys). What happens to the demand for attorneys?','up','The demand for attorneys depends on the demand for legal services, which rose.'],
    ['People buy far fewer printed maps because phones give directions. What happens to the demand for map printers?','down','The product\'s demand fell, so the derived demand for the workers who make it falls too.']
  ]});

/* L30 widget: set the wage and the toaster price (your course's toaster company: MP 50, 40, 30, 20, 10, 0).
   Hire while the value of MP ≥ the wage (a tie goes to hiring, as your course names the 5th worker at $100).
   TEST NOTE (2026-11-04), expected (checked by script): P $10, W $100 → 5 workers, gain from labor $1,000; P $10, W $250 → 3, $450; P $15, W $250 → 4, $1,100;
   P $20, W $550 → 3, $750; P $5, W $50 → 5 (5th worker ties), $500; P $5, W $550 → 0, $0. UI checked by Playwright (2026-11-08): no overflow at 375 px light and 1100 px dark; both sliders move with arrow keys; y ticks stay within the chart at $12-14. */
W.hire = el => {
  el.innerHTML = `<p class="widget-title">How many workers?</p><p class="hint">Your course\'s toaster company. Set the daily wage and the price of a toaster; the firm hires every worker whose output is worth at least the wage.</p>
  <div class="slider"><label for="hw-w">Daily wage</label><input id="hw-w" type="range" min="50" max="550" step="25" value="100"><output></output></div>
  <div class="slider"><label for="hw-p">Price of a toaster</label><input id="hw-p" type="range" min="5" max="20" step="1" value="10"><output></output></div>
  <div class="hw-g"></div>
  <div class="readout"><div><b class="hw-n"></b><span>workers hired</span></div><div><b class="hw-last"></b><span>value of the last hire</span></div><div><b class="hw-next"></b><span>value of the next worker</span></div><div><b class="hw-gain"></b><span>output value minus wages</span></div></div>
  <div class="msg"></div>`;
  const SW = $('#hw-w', el), SP = $('#hw-p', el);
  const draw = () => {
    const W = +SW.value, P = +SP.value; SW.nextElementSibling.textContent = '$'+W; SP.nextElementSibling.textContent = '$'+P;
    const v = TO.slice(1).map(r=>r.mp*P), n = hireAt(v, W), gain = v.slice(0,n).reduce((a,b)=>a+b,0) - n*W;
    const ymax = Math.max(560, Math.ceil((v[0]+50)/100)*100);
    $('.hw-g', el).innerHTML = sdg({ xmax:6.5, ymax, xt:[0,1,2,3,4,5,6], yt: (ymax>600 ? [0,250,500,750,1000] : [0,100,200,300,400,500]).filter(t => t <= ymax), xlab:'Workers', ylab:'Dollars per day', aria:`Value of the marginal product at a price of ${P} dollars and a wage line at ${W} dollars`,
      lines:[ {pts:v.map((x,i)=>[i+1,x]), c:DC}, {pts:[[0,W],[6.5,W]], c:'var(--g2)'} ], labels:[ vLab(v[0], ymax), wLab(W, ymax) ],
      dots: v.map((x,i)=>({q:i+1, p:x, c: i<n ? 'var(--ok)' : 'var(--muted)'})), vls: n ? [{q:n, p:v[n-1]}] : [] });
    $('.hw-n', el).textContent = n; $('.hw-last', el).textContent = n ? '$'+v[n-1] : '–'; $('.hw-next', el).textContent = n<6 ? '$'+v[n] : '–'; $('.hw-gain', el).textContent = usd6(gain);
    const m = $('.msg', el);
    let s = n ? `The firm hires <b>${n}</b> worker${n>1?'s':''}: the ${ordinal(n)} worker\'s toasters are worth $${v[n-1]}, at least the $${W} wage` : `At $${W} not even the 1st worker (worth $${v[0]}) pays for himself, so the firm hires <b>no one</b>`;
    if(n && n<6) s += `, and the ${ordinal(n+1)} would be worth only $${v[n]}`;
    s += '.';
    if(n && v[n-1]===W) s += ` The ${ordinal(n)} worker adds exactly what he costs, so profit is the same with ${n-1} or ${n}; your course names the ${ordinal(n)}.`;
    m.className = 'msg' + (n ? ' good' : ' bad'); m.innerHTML = s;
  };
  SW.addEventListener('input', draw); SP.addEventListener('input', draw); draw();
};

/* L30 exam skill: fill in marginal product and value of MP, then decide (made-up café: output 0, 12, 22, 30, 36, 40; $5 a drink; wage $35).
   TEST NOTE (2026-11-04), expected: MP 12, 10, 8, 6, 4; value $60, $50, $40, $30, $20; hire 3. Wrong entries are marked and the right value is shown after "Check";
   fractions and "$" accepted; empty boxes count as wrong. UI checked by Playwright (2026-11-08): no overflow at 375 px light and 1100 px dark; Tab moves from a marginal-product cell to its value cell; inputs -1 and 2.5 ask for a whole number from 0 to 5; wrong cells keep what was typed and the message lists the answers. */
W.vmpfill = el => {
  const Qx = [0,12,22,30,36,40], P = 5, Wg = 35, mp = Qx.slice(1).map((q,i)=>q-Qx[i]), vm = mp.map(m=>m*P), hire = hireAt(vm, Wg);
  el.innerHTML = `<p class="widget-title">Fill in the table, then decide</p><p class="hint">Made-up café: each drink sells for $${P}, and baristas cost $${Wg} a shift. Fill in each barista\'s marginal product and its value, then say how many to hire.</p>
  <div class="tbl-wrap"><table class="u3tbl u4tbl compact" style="font-size:.86em"><thead><tr><th>Baristas</th><th>Drinks</th><th>Marginal product</th><th>Value of MP</th></tr></thead><tbody>
  ${Qx.map((q,i)=>`<tr><td>${i}</td><td>${q}</td><td>${i?`<input class="vf-mp" data-i="${i-1}" inputmode="decimal" aria-label="Marginal product of barista ${i}">`:'–'}</td><td>${i?`<input class="vf-v" data-i="${i-1}" inputmode="decimal" aria-label="Value of marginal product of barista ${i}">`:'–'}</td></tr>`).join('')}
  </tbody></table></div>
  <div class="numrow" style="margin-top:8px"><label for="vf-h" class="small">How many baristas should it hire?</label><input id="vf-h" class="inline-num" inputmode="numeric"><button class="btn sm vf-go" type="button">Check</button><button class="btn ghost sm vf-reset" type="button">Reset</button></div>
  <div class="msg">Fill in what you can, then press Check.</div>`;
  const check = () => {
    let right = 0, total = 0;
    $$('.vf-mp', el).forEach(inp => { total++; const ok = Math.abs(fracParse(inp.value) - mp[+inp.dataset.i]) < 0.01; inp.classList.toggle('ok', ok); inp.classList.toggle('no', !ok); if(ok) right++; });
    $$('.vf-v', el).forEach(inp => { total++; const ok = Math.abs(fracParse(inp.value) - vm[+inp.dataset.i]) < 0.01; inp.classList.toggle('ok', ok); inp.classList.toggle('no', !ok); if(ok) right++; });
    const hin = $('#vf-h', el), h = fracParse(hin.value), hvalid = Number.isInteger(h) && h >= 0 && h <= 5, hok = h === hire; hin.classList.toggle('ok', hok); hin.classList.toggle('no', !hok);
    const m = $('.msg', el); m.className = 'msg' + (hok && right===total ? ' good' : ' bad');
    m.innerHTML = `${right} of ${total} cells right${right<total ? ` (red cells are off; the answers are MP ${mp.join(', ')} and values ${vm.map(v=>'$'+v).join(', ')})` : ''}. ${hok ? `<b>Hire ${hire}: right.</b>` : `<b>Hire ${hire}</b>${!hvalid ? ' (enter a whole number of baristas from 0 to 5)' : hok ? '' : `, not ${h}: ${h>hire ? `the ${ordinal(hire+1)} barista adds only $${vm[hire]}, less than the $${Wg} wage` : `the ${ordinal(h+1)} barista still adds $${vm[h]}, more than the $${Wg} wage`}`}.`} The 3rd barista\'s drinks are worth $${vm[2]}, more than $${Wg}; the 4th\'s are worth only $${vm[3]}. Value of MP = marginal product × $${P}.`;
  };
  $('.vf-go', el).onclick = check;
  $('.vf-reset', el).onclick = () => { $$('input', el).forEach(i => { i.value=''; i.classList.remove('ok','no'); }); const m=$('.msg', el); m.className='msg'; m.textContent='Fill in what you can, then press Check.'; };
};

/* L31 widget: what shifts the demand for labor? Base = your course's toaster company at $10 with normal productivity (MP 50 ... 0).
   Price: $10 / $15 / $20 (made-up). Tools: normal, or better tools that raise every marginal product by 20% (made-up: 60, 48, 36, 24, 12, 0).
   TEST NOTE (2026-11-04), expected (checked by script): $15, normal, wage $250 → before 3, now 4 (shift right); $10, better tools, wage $250 → 3 → 3 (values 600, 480, 360, 240: still 3);
   $20, normal, wage $350 → 2 → 4; $10, normal, any wage → no shift; wage $300 at $10 normal → 3 (tie at the 3rd). UI checked by Playwright (2026-11-08): no overflow at 375 px light and 1100 px dark; the wage slider moves with arrow keys; price and tools buttons respond to Enter and Space; legend replaces on-graph D1/D2 labels. */
W.ldshift = el => {
  el.innerHTML = `<p class="widget-title">What moves the demand for labor?</p><p class="hint">Your course\'s toaster company with made-up changes. The dashed curve is the original ($10 toasters, normal tools). Change the price or the tools, then move the wage.</p>
  <div class="row" style="gap:8px 14px"><span class="small">Toaster price</span><span class="seg ls-p" role="group" aria-label="Toaster price"><button data-v="10" aria-pressed="true">$10</button><button data-v="15" aria-pressed="false">$15</button><button data-v="20" aria-pressed="false">$20</button></span>
  <span class="small">Tools</span><span class="seg ls-t" role="group" aria-label="Tools"><button data-v="1" aria-pressed="true">Normal</button><button data-v="1.2" aria-pressed="false">Better (+20% output)</button></span></div>
  <div class="slider"><label for="ls-w">Daily wage</label><input id="ls-w" type="range" min="50" max="550" step="50" value="250"><output></output></div>
  <p class="small ls-key" style="margin:.3rem 0 0"><span style="color:var(--muted)">- - - D1: original ($10, normal tools)</span><br><span class="ls-k2" style="color:var(--accent)">━ D2: after your change</span></p>
  <div class="ls-g"></div>
  <div class="readout"><div><b class="ls-b"></b><span>workers hired before</span></div><div><b class="ls-n"></b><span>workers hired now</span></div><div><b class="ls-s"></b><span>what happened to demand</span></div></div>
  <div class="msg"></div>`;
  let P = 10, T = 1; const SW = $('#ls-w', el);
  $$('.ls-p button', el).forEach(b => b.onclick = () => { P = +b.dataset.v; $$('.ls-p button', el).forEach(x=>x.setAttribute('aria-pressed', x===b)); draw(); });
  $$('.ls-t button', el).forEach(b => b.onclick = () => { T = +b.dataset.v; $$('.ls-t button', el).forEach(x=>x.setAttribute('aria-pressed', x===b)); draw(); });
  const draw = () => {
    const Wg = +SW.value; SW.nextElementSibling.textContent = '$'+Wg;
    const base = TO.slice(1).map(r=>r.mp*10), now = TO.slice(1).map(r=>Math.round(r.mp*T*P));
    const nb = hireAt(base, Wg), nn = hireAt(now, Wg), shifted = P!==10 || T!==1;
    $('.ls-g', el).innerHTML = sdg({ xmax:6.5, ymax:1250, xt:[0,1,2,3,4,5,6], yt:[0,500,1000], xlab:'Workers', ylab:'$ per day', aria:'Original and new labor demand (value of MP) with a wage line',
      lines:[ {pts:base.map((x,i)=>[i+1,x]), c:OLD, dash:'5 4', w:2}, ...(shifted ? [{pts:now.map((x,i)=>[i+1,x]), c:DC}] : []), {pts:[[0,Wg],[6.5,Wg]], c:'var(--g2)'} ],
      labels:[ wLab(Wg, 1250) ],
      dots: now.map((x,i)=>({q:i+1, p:x, c: i<nn ? 'var(--ok)' : 'var(--muted)'})) });
    $('.ls-k2', el).style.display = shifted ? '' : 'none';
    $('.ls-b', el).textContent = nb; $('.ls-n', el).textContent = nn; $('.ls-s', el).textContent = shifted ? 'shifted right' : 'no shift';
    const m = $('.msg', el);
    m.innerHTML = !shifted ? `With the original price and tools, changing the wage only slides the firm along its one curve: at $${Wg} it hires ${nn}.`
      : `${P!==10?`At $${P} a toaster`:'With better tools'}${P!==10&&T!==1?' and with better tools':''}, every worker\'s output is worth more, so the whole curve moved right. ${nn===nb ? `At the same $${Wg} wage the firm still hires ${nn}: this wage falls between the same two workers on both curves. The curve still moved.` : `At the same $${Wg} wage the firm hires ${nn} instead of ${nb}.`}`;
    m.className = 'msg' + (shifted ? ' good' : '');
  };
  SW.addEventListener('input', draw); draw();
};

/* L31 exam skill: shift or move?
   TEST NOTE (2026-11-04): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.ldsort = el => sorterWidget(el, { title:'Shift or move, and which way?', hint:'Made-up scenarios unless marked. First ask: is it the wage itself? Then ask whether workers became worth more or less to employers.', aria:'Effect on the labor demand curve',
  kinds:[['r','Demand shifts right'],['l','Demand shifts left'],['m','Move along demand']],
  items:[
    ['The price of the bread a bakery sells rises. (Bakers)','r','Each baker\'s output is worth more (value of MP = MP × price), so more bakers are worth hiring at every wage.'],
    ['Bakers\' hourly wage rises, and nothing else changes. (Bakers)','m','Only the wage changed: the bakery moves up its demand curve to fewer bakers.'],
    ['Word processing spreads through offices (your textbook\'s typists).','l','The technology does typists\' work, a substitute, so the demand for typists shifts left.'],
    ['Offices install software that needs IT staff to run it (your textbook\'s IT professionals).','r','The software is a complement to IT workers, so the demand for them rises.'],
    ['The price of flour, which bakers can\'t work without, doubles. (Bakers)','l','Dearer inputs used with labor make production less profitable: "Higher input prices lower demand for labor."'],
    ['A rule says only registered nurses may perform a common procedure (your textbook). (Nurses)','r','The regulation requires more nurses, so the demand for nurses shifts right.']
  ]});

/* L32 widget: a labor market with shiftable curves (made-up numbers). Demand Qd = 600 − 20W + d; supply Qs = −100 + 30W + s; d and s from −150 to +150.
   Equilibrium W = (700 + d − s) ÷ 50, L = 600 − 20W + d.
   TEST NOTE (2026-11-04), expected (checked by script): d 0, s 0 → W $14.00, L 320; d +150 → W $17.00, L 410; s +150 → W $11.00, L 380; d +150, s +150 → W $14.00, L 470;
   d −150, s +150 → W $8.00, L 290; d +150, s −150 → W $20.00, L 350. UI checked by Playwright (2026-11-08): no overflow at 375 px light and 1100 px dark; both sliders move with arrow keys; the D label is clamped inside the chart for positive demand shifts; checked at all four corners and at d/s −150/−100 and −100/−150: when employment falls below the start, "start" moves above its dot and the new label sits below-right, clear of the axis. */
W.labormkt = el => {
  el.innerHTML = `<p class="widget-title">Shift the labor market</p><p class="hint">Made-up market for warehouse workers. Shift employers\' demand or households\' supply and watch the wage and employment. Dashed lines are the starting curves.</p>
  <div class="slider"><label for="lm-d">Demand shift (workers at every wage)</label><input id="lm-d" type="range" min="-150" max="150" step="50" value="0"><output></output></div>
  <div class="slider"><label for="lm-s">Supply shift (workers at every wage)</label><input id="lm-s" type="range" min="-150" max="150" step="50" value="0"><output></output></div>
  <div class="lm-g"></div>
  <div class="readout"><div><b class="lm-w"></b><span>equilibrium hourly wage</span></div><div><b class="lm-l"></b><span>workers employed</span></div><div><b class="lm-c"></b><span>change from the start</span></div></div>
  <div class="msg"></div>`;
  const SD = $('#lm-d', el), SS = $('#lm-s', el);
  const sgn = v => (v>0?'+':v<0?'−':'') + Math.abs(v);
  const draw = () => {
    const d = +SD.value, s = +SS.value; SD.nextElementSibling.textContent = sgn(d); SS.nextElementSibling.textContent = sgn(s);
    const W = (700 + d - s)/50, L = 600 - 20*W + d;
    const dLine = (dd,lab,old) => ({ a:[0,(600+dd)/20], b:[700,(600+dd-700)/20], c: old?OLD:DC, dash: old?'5 4':'', w: old?2:2.6 });
    const sLine = (ss,lab,old) => ({ a:[0,(100-ss)/30], b:[700,(800-ss)/30], c: old?OLD:SC, dash: old?'5 4':'', w: old?2:2.6 });
    $('.lm-g', el).innerHTML = sdg({ xmax:700, ymax:32, xt:[0,200,400,600], yt:[0,10,20,30], xlab:'Workers employed', ylab:'Hourly wage ($)', aria:`Labor market with equilibrium wage ${W} dollars and ${L} workers`,
      lines:[ ...(d? [dLine(0,'',true)] : []), ...(s? [sLine(0,'',true)] : []), dLine(d,'D'), sLine(s,'S') ],
      labels:[ (570+d)/20 + 1.2 <= 30.5 ? [30, (570+d)/20 + 1.2, 'D', DC, 'start'] : [d + 40, 30.5, 'D', DC, 'start'], [640, (640+100-s)/30 + 1.6, 'S', SC, 'end'] ],
      dots:[ ...((d||s) ? [{q:320,p:14,c:'var(--muted)',label:'start',lx: L<320 ? 8 : -8,ly: L<320 ? -8 : 14,anchor: L<320 ? 'start' : 'end'}] : []), {q:L,p:W,label:`$${W.toFixed(2)}, ${L}`,c:'var(--ink)',lx:8, ly: L<320 ? 22 : -8, anchor:'start'}], vls:[{q:L,p:W}], hl:[{p:W,q:L,c:'var(--g2)'}] });
    $('.lm-w', el).textContent = '$'+W.toFixed(2); $('.lm-l', el).textContent = L; $('.lm-c', el).textContent = `${W>14?'+':W<14?'−':''}$${Math.abs(W-14).toFixed(2)}, ${L>320?'+':L<320?'−':''}${Math.abs(L-320)}`;
    const m = $('.msg', el);
    m.innerHTML = !d && !s ? 'Starting point: $14.00 an hour and 320 workers. Shift a curve.' :
      (d && !s ? `Demand ${d>0?'rose':'fell'}: the wage and employment both ${d>0?'rose':'fell'}. Demand shifts move them the same way.` :
       !d && s ? `Supply ${s>0?'rose':'fell'}: the wage ${s>0?'fell':'rose'} and employment ${s>0?'rose':'fell'}. Supply shifts move them in opposite directions.` :
       `Both curves moved. ${Math.sign(d)===Math.sign(s) ? 'They push employment the same way, so employment changes clearly; the wage depends on which shift is bigger.' : 'They push the wage the same way, so the wage changes clearly; employment depends on which shift is bigger.'}`);
  };
  SD.addEventListener('input', draw); SS.addEventListener('input', draw); draw();
};

/* L32 exam skill: which curve, and what happens to the wage and employment?
   TEST NOTE (2026-11-04): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.wagesort = el => sorterWidget(el, { title:'Which curve moves, and what happens?', hint:'Made-up scenarios unless marked. Decide whether employers (demand) or workers (supply) changed, then the direction.', aria:'Effect on the labor market',
  kinds:[['dr','Demand right: wage up, jobs up'],['dl','Demand left: wage down, jobs down'],['sr','Supply right: wage down, jobs up'],['sl','Supply left: wage up, jobs down']],
  items:[
    ['Thousands of people move into a city looking for restaurant work.','sr','An "influx of workers" (your course) adds to supply. With demand unchanged, the wage falls and more people work.'],
    ['Child care costs in a town double, and some parents stop working (your course).','sl','Fewer people offer to work at each wage, so supply shifts left: the wage rises and employment falls.'],
    ['A boom in home building raises the price of new houses. (Carpenters)','dr','Carpenters\' output is worth more, so builders want more of them: demand right, wage and jobs up.'],
    ['New software replaces most file clerks (your textbook\'s low-skill workers).','dl','The software substitutes for clerks: demand left, so their wage and employment fall.'],
    ['A state makes licenses for electricians much harder to get (your textbook\'s government policies).','sl','Fewer people qualify at each wage: supply shifts left, raising the wage and cutting employment.'],
    ['The government subsidizes training for welders (your textbook\'s example of training subsidies).','sr','More people can train, so more welders are available at each wage: supply right.']
  ]});
