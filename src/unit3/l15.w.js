/* TEST NOTE (2026-10-27): budget $5, soda $1, your course's marginal utilities (soda 8,7,6,5,4; pizza 20,16,12,8,4). For each pizza price the widget
   checks every affordable whole-unit bundle (unspent money allowed) and picks the highest total utility. Checked by script; each best bundle is unique:
   $1 → 1 soda + 4 pizza, 64 (course) · $1.50 → 2 + 2, 51 · $2 → 1 + 2, 44 (course) · $2.50 → 0 + 2, 36 · $3 → 2 + 1, 35 · $3.50 → 5 + 0, 30 · $4 → 5 + 0, 30.
   Only $1 and $2 are your course's prices; the others are made-up and labeled so. Low $1, middle $2.50, high $4 recomputed by hand. 
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: slider moves with arrow keys. */
W.demandbuild = el => {
  const seen = new Set([1,2]);
  el.innerHTML = `<p class="widget-title">Build a demand curve from best choices</p><p class="hint">Change the price of pizza. The widget finds the best bundle for $5 (soda stays $1) and plots that price and quantity on the demand curve.</p>
  <div class="slider"><label for="db-p">Price of pizza</label><input id="db-p" type="range" min="1" max="4" step="0.5" value="2"><output></output></div>
  <div class="u2row db-g"></div>
  <div class="readout"><div><b class="db-b"></b><span>best bundle</span></div><div><b class="db-tu"></b><span>total utility</span></div><div><b class="db-q"></b><span>slices demanded</span></div></div>
  <div class="msg"></div><div class="row" style="margin-top:8px"><button class="btn ghost sm db-all">Show every price</button></div>`;
  const SL = $('#db-p', el);
  const draw = () => {
    const pp = +SL.value, b = psBest(pp), course = pp===1 || pp===2; seen.add(pp); SL.nextElementSibling.textContent = money(pp);
    const top = gchart2({ xmax:5.5, ymax:6, xlab:'Slices of pizza', ylab:'Cans of soda', xt:[0,1,2,3,4,5], yt:[0,1,2,3,4,5], aria:'Budget line and best bundle',
      body:(X,Y)=>({ under: gline([[0,5],[5/pp,0]],X,Y,'var(--accent)','',2.6), over: gdot(X,Y,b.k,b.s,`${b.k} pizza, ${b.s} soda`,'var(--g2)') }) });
    const pts = [...seen].sort((a,c)=>a-c).map(p=>[psBest(p).k,p]);
    const bot = gchart2({ xmax:5.5, ymax:4.5, xlab:'Slices of pizza', ylab:'Price of pizza ($)', xt:[0,1,2,3,4,5], yt:[0,1,2,3,4], aria:'Demand points for pizza',
      body:(X,Y)=>({ under: pts.length>1 ? gline(pts.map(([q,p])=>[q,p]),X,Y,'var(--muted)','4 3',1.6) : '', over: pts.map(([q,p])=>`<circle cx="${X(q).toFixed(1)}" cy="${Y(p).toFixed(1)}" r="${p===pp?6:4}" fill="${p===pp?'var(--g2)':(p===1||p===2)?'var(--accent)':'var(--g1)'}"/>`).join('') + gtext(X(b.k)+8, Y(pp)-6, `${money(pp)}: ${b.k}`, 'var(--g2)') }) });
    $('.db-g', el).innerHTML = `<div class="u2cell"><p class="u2t">Best bundle for $5</p>${top}</div><div class="u2cell"><p class="u2t">Demand for pizza</p>${bot}<p class="small muted" style="margin:.2rem 0 0;text-align:center">green: course prices · blue: made-up prices</p></div>`;
    $('.db-b', el).textContent = `${b.s} soda, ${b.k} pizza`; $('.db-tu', el).textContent = `${b.tu} utils`; $('.db-q', el).textContent = b.k;
    const m = $('.msg', el), muP = b.k ? PIZZA_MU[b.k-1]/pp : null, muS = b.s ? SODA_MU[b.s-1] : null;
    const eq = b.k && b.s && Math.abs(muP-muS)<0.001;
    m.className = 'msg' + (course?' good':'');
    m.innerHTML = `${course?'<b>Your course\'s price.</b> ':'<b>Made-up price</b> (course utility numbers). '}At ${money(pp)} a slice, the best way to spend $5 is ${b.s} soda and ${b.k} slice${b.k===1?'':'s'} (${b.tu} utils${b.left?`, ${money(b.left)} unspent`:''}). `
      + (eq ? `Check: last soda ${muS} ÷ $1 = ${muS}, last slice ${PIZZA_MU[b.k-1]} ÷ ${money(pp)} = ${fmt(muP)} utils per dollar. Equal.` : b.k && b.s ? `With whole slices the per-dollar numbers can't match exactly here (soda ${muS}, pizza ${fmt(muP)}), so the best bundle is the one with the highest total.` : b.k ? '' : `No pizza: the best bundle that includes a slice gives only ${(()=>{ let m=0; for(let k=1;k<=5;k++) for(let so=0;so<=5;so++) if(so+pp*k<=5+1e-9) m=Math.max(m,psTU(so,k)); return m; })()} utils, less than ${b.tu} from soda alone.`)
      + ` A higher price means fewer slices: the demand curve slopes down.`;
  };
  $('.db-all', el).onclick = () => { [1,1.5,2,2.5,3,3.5,4].forEach(p=>seen.add(p)); draw(); };
  SL.addEventListener('input', draw); draw();
};

/* TEST NOTE (2026-10-27): logic table. Price of X falls → substitution: X ↑, Y ↓; purchasing power rises → income: normal ↑, inferior ↓.
   Price of X rises → substitution: X ↓, Y ↑; purchasing power falls → income: normal ↓, inferior ↑. Total = the shared direction, or "?" if they disagree.
   Checked all 8 settings: e.g. fall/normal/normal → pizza ↑ ↑ = ↑, soda ↓ ↑ = ?; rise/inferior/normal → pizza ↓ ↑ = ?(usually ↓), soda ↑ ↓ = ?. 
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: buttons work with Tab and Enter/Space. */
W.effects = el => {
  const st = { dir:'fall', x:'normal', y:'normal' };
  el.innerHTML = `<p class="widget-title">Predict the two effects</p><p class="hint">Pick what happens to the price of pizza and whether each good is normal or inferior for this buyer (Lesson 6). Soda's price and the budget stay the same.</p>
  <div class="row"><span class="small">Price of pizza:</span><div class="seg" role="group" aria-label="Price of pizza"><button data-g="dir" data-v="fall" aria-pressed="true">Falls</button><button data-g="dir" data-v="rise" aria-pressed="false">Rises</button></div></div>
  <div class="row" style="margin-top:6px"><span class="small">Pizza is:</span><div class="seg" role="group" aria-label="Pizza type"><button data-g="x" data-v="normal" aria-pressed="true">Normal</button><button data-g="x" data-v="inferior" aria-pressed="false">Inferior</button></div></div>
  <div class="row" style="margin-top:6px"><span class="small">Soda is:</span><div class="seg" role="group" aria-label="Soda type"><button data-g="y" data-v="normal" aria-pressed="true">Normal</button><button data-g="y" data-v="inferior" aria-pressed="false">Inferior</button></div></div>
  <div class="ef-t"></div><div class="msg"></div>`;
  const A = v => v>0 ? '<b style="color:var(--ok)">↑ more</b>' : v<0 ? '<b style="color:var(--bad)">↓ less</b>' : '<b style="color:var(--g2)">? depends</b>';
  const draw = () => {
    const f = st.dir==='fall' ? 1 : -1;
    const sub = { x: f, y: -f }, inc = { x: (st.x==='normal'?1:-1)*f, y: (st.y==='normal'?1:-1)*f };
    const tot = g => sub[g]===inc[g] ? sub[g] : 0;
    $('.ef-t', el).innerHTML = atable(['Effect','Pizza','Soda'], [
      ['Substitution effect', A(sub.x), A(sub.y)], ['Income effect', A(inc.x), A(inc.y)], ['<b>Total</b>', A(tot('x')), A(tot('y'))]], { cls:'wrap' });
    const why = [`<b>Substitution:</b> pizza is now relatively ${f>0?'cheaper':'more expensive'} and soda relatively ${f>0?'more expensive':'cheaper'}, so the buyer shifts toward ${f>0?'pizza':'soda'}.`,
      `<b>Income:</b> the same $5 now buys ${f>0?'more':'less'} (purchasing power ${f>0?'rises':'falls'}), so she buys ${f>0?'more':'less'} of normal goods and ${f>0?'less':'more'} of inferior goods.`];
    if(!tot('x')) why.push(`<b>Pizza:</b> the effects disagree. Your course textbook calls a higher price raising the quantity bought "theoretically possible but highly unlikely," so in practice the substitution effect usually wins and pizza moves ${f>0?'up':'down'}.`);
    if(!tot('y')) why.push(`<b>Soda:</b> the effects disagree, so soda could rise, fall or stay the same. In your course's example (both normal, price falls) it stayed at 1 can.`);
    $('.msg', el).innerHTML = why.map(t=>`<p style="margin:.2rem 0">${t}</p>`).join('');
  };
  $$('.seg button', el).forEach(b => b.onclick = () => { st[b.dataset.g] = b.dataset.v; $$(`.seg button[data-g="${b.dataset.g}"]`, el).forEach(x=>x.setAttribute('aria-pressed', x===b)); draw(); });
  draw();
};

/* L15 exam skill: which effect is it? All scenarios made-up. A change in money income or tastes is a shift in demand, not an income or substitution effect. */
/* TEST NOTE (2026-10-27): every item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly.
   UI checked 2026-10-27 (Playwright/Chromium): 375 px, 390 px and 1100 px, light and dark: no page overflow, labels readable; keyboard: buttons work with Tab and Enter/Space. */
W.effsort = el => sorterWidget(el, { title:'Which effect is it?', hint:'Each change starts from a price change, or not. Decide what is going on.', aria:'Which effect',
  kinds:[['sub','Substitution effect'],['inc','Income effect'],['shift','Neither: demand shifts']],
  items:[
    ['Pizza gets cheaper, so you swap some of your soda money for more pizza.','sub','Pizza became relatively cheaper than soda, so you substitute toward it.'],
    ['Gas prices fall. With money left over each week, a family eats out more often.','inc','Cheaper gas raises their purchasing power, so they buy more of another normal good. Their money income didn\'t change.'],
    ['Movie tickets go up, so you stream more movies at home instead.','sub','Tickets became relatively more expensive than streaming, so you switch toward the substitute.'],
    ['Rent rises. With less left over, a student buys fewer concert tickets.','inc','The higher rent cuts what her budget can buy, so she buys less of a normal good.'],
    ['You get a raise at work and buy more books at the same prices.','shift','No price changed: your money income rose. That shifts your demand for books (Lesson 6); it isn\'t the income effect of a price change.'],
    ['A news story says coffee is healthy, so you buy more coffee at the same price.','shift','A change in tastes shifts demand. No price changed, so neither effect applies.']
  ]});
