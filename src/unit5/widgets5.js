/* ---------- Unit 5 widgets ---------- */

/* TEST NOTE (2026-10-28): your course's Caroline (video 5.1): $300,000 needed; loan and savings both at the same rate r.
   Explicit = 300,000 + r × borrowed; implicit = r × (300,000 − borrowed); economic = 300,000 × (1 + r); accounting cost = explicit.
   Expected (checked by script): r 5%, borrow 0 → 300,000 / 15,000 / 315,000 (Choice A); borrow 200,000 → 310,000 / 5,000 / 315,000 (Choice B);
   borrow 300,000 → 315,000 / 0 / 315,000. r 10%, borrow 100,000 → 310,000 / 20,000 / 330,000. r 1%, borrow 0 → 300,000 / 3,000 / 303,000.
   UI to check: 375, 390 and 1100 px, light and dark; sliders move with arrow keys; preset buttons work with Enter/Space. */
W.finance = el => {
  el.innerHTML = `<p class="widget-title">Borrow or use savings?</p><p class="hint">Your course's Caroline needs $300,000. Choose how much she borrows (the rest comes from savings) and the interest rate, which is the same for the loan and her savings account.</p>
  <div class="seg" role="group" aria-label="Course choices"><button data-b="0" data-r="5" aria-pressed="false">Choice A (course)</button><button data-b="200000" data-r="5" aria-pressed="false">Choice B (course)</button></div>
  <div class="slider"><label for="fi-b">Amount borrowed</label><input id="fi-b" type="range" min="0" max="300000" step="25000" value="200000"><output></output></div>
  <div class="slider"><label for="fi-r">Interest rate</label><input id="fi-r" type="range" min="1" max="10" step="0.5" value="5"><output></output></div>
  <div class="fi-g"></div>
  <div class="readout"><div><b class="fi-ex"></b><span>explicit cost (accounting cost)</span></div><div><b class="fi-im"></b><span>implicit cost</span></div><div><b class="fi-ec"></b><span>economic cost</span></div></div>
  <div class="msg"></div>`;
  const SB=$('#fi-b', el), SR=$('#fi-r', el), NEED=300000;
  const draw = () => {
    const b=+SB.value, r=+SR.value/100, own=NEED-b, ex=NEED+b*r, im=own*r, ec=ex+im;
    SB.nextElementSibling.textContent = usd(b); SR.nextElementSibling.textContent = (+SR.value).toFixed(1).replace(/\.0$/,'')+'%';
    $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', +x.dataset.b===b && +x.dataset.r===+SR.value));
    const W_=340, left=8, right=W_-8, max=NEED*1.11, X=v=>left+(right-left)*v/max;
    $('.fi-g', el).innerHTML = `<svg class="u2bars" viewBox="0 0 ${W_} 62" role="img" aria-label="Explicit and implicit cost as one stacked bar">
      <rect x="${left}" y="6" width="${(X(ex)-left).toFixed(1)}" height="24" fill="var(--g1)" opacity=".8"/><rect x="${X(ex).toFixed(1)}" y="6" width="${Math.max(0,X(ec)-X(ex)).toFixed(1)}" height="24" fill="var(--g2)" opacity=".9"/>
      <line x1="${X(NEED).toFixed(1)}" x2="${X(NEED).toFixed(1)}" y1="2" y2="34" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 3"/>
      <text x="${(X(NEED)+4).toFixed(1)}" y="48" text-anchor="end" class="lbl">dashed line: $300,000 spent on the business</text></svg>
      <p class="small muted" style="margin:.1rem 0 0">Blue: explicit (money paid, including ${usd(b*r)} of loan interest). Amber: implicit (${usd(im)} of interest her ${usd(own)} of savings no longer earn).</p>`;
    $('.fi-ex', el).textContent = usd(ex); $('.fi-im', el).textContent = usd(im); $('.fi-ec', el).textContent = usd(ec);
    const m=$('.msg', el);
    m.className='msg good';
    m.innerHTML = b===0 ? `All savings: an accountant sees ${usd(ex)}, but she also gives up ${usd(im)} of interest. Economic cost: <b>${usd(ec)}</b>.`
      : b===NEED ? `All borrowed: she pays ${usd(b*r)} of interest and gives up nothing on savings. Economic cost: <b>${usd(ec)}</b>, the same as using savings.`
      : `Borrowing ${usd(b)} shifts ${usd(b*r)} of cost from implicit to explicit. The accountant's number changes; the economic cost stays <b>${usd(ec)}</b> = $300,000 × (1 + ${(+SR.value).toFixed(1).replace(/\.0$/,'')}%). Only the interest rate moves it.`;
  };
  $$('.seg button', el).forEach(btn => btn.onclick = () => { SB.value = btn.dataset.b; SR.value = btn.dataset.r; draw(); });
  SB.addEventListener('input', draw); SR.addEventListener('input', draw); draw();
};

/* L20 exam skill: explicit or implicit? All examples made-up except the home ground floor (textbook §7.1). */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.costsort = el => sorterWidget(el, { title:'Explicit or implicit cost?', hint:'Made-up costs for Rosa\'s flower shop. Ask: does money leave the business to pay someone?', aria:'Kind of cost',
  kinds:[['ex','Explicit'],['im','Implicit']],
  items:[
    ['The $24,000 Rosa pays her assistant each year.','ex','Money paid out to someone: explicit.'],
    ['The $52,000 salary Rosa gave up when she left her job to run the shop.','im','No one is paid, but Rosa gives up her next best use of her time: implicit.'],
    ['The wholesale flowers Rosa buys each week.','ex','Paid for in money: explicit.'],
    ['Rent Rosa could earn by leasing out the shop\'s ground floor, which she owns, instead of using it herself.','im','Your course textbook\'s own example: using "the ground floor of a home as a retail store" has an implicit cost, the rent given up.'],
    ['Interest Rosa pays on a bank loan for a delivery van.','ex','Interest paid to a bank is money leaving the business: explicit, like Caroline\'s $10,000 in Choice B.'],
    ['Interest Rosa\'s savings would have earned if she hadn\'t spent them on refrigerators.','im','Interest given up on her own money: implicit, like Caroline\'s $15,000 in Choice A. The refrigerators themselves were an explicit cost.']
  ]});

/* TEST NOTE (2026-10-28): two data sets from your course textbook. Raspberry farm at $4 (Tables 8.1, 8.3): steps of 10 packs;
   MR $4 every step; MC 2.80, 2.00, 1.60, 1.80, 2.20, 2.60, 3.20, 4.00, 6.00, 8.00; profit −62, −50, −30, −6, 16, 34, 48, 56, 56, 36, −4.
   HealthPill (Tables 9.3-9.4): MR 1200, 1000, 800, 600, 400, 200, 0, −200; MC 1500, 300, 400, 600, 700, 700, 1400, 1800; profit −300, 400, 800, 800, 500, 0, −1400, −3400.
   Expected messages: raspberry step to 70: MR > MC, profit +8 to 56; step to 80: MR = MC, profit unchanged at 56 ("stop here"); step to 90: MR < MC, −20 to 36.
   HealthPill step to 4: MR = MC = 600, profit stays 800; step to 5: −300 to 500; step to 1: profit −300 (MC 1,500 > MR 1,200, but still the first unit).
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys; data-set buttons work with Enter/Space. */
W.mrmc = el => {
  const SETS = {
    rf:{ name:'Raspberry farm, $4 a pack (textbook)', unit:'packs', step:10, rows: RF.slice(1).map((r,i)=>({ q:r.q, mr:4, mc:r.mc, prof: 4*r.q - r.tc, prev: 4*RF[i].q - RF[i].tc })), start:7 },
    hp:{ name:'HealthPill (textbook)', unit:'units', step:1, rows: HP.map((r,i)=>({ q:r.q, mr:r.mr, mc:r.mc, prof:r.profit, prev: i ? HP[i-1].profit : 0 })), start:3 } };
  let k='rf';
  el.innerHTML = `<p class="widget-title">Step up output, one step at a time</p><p class="hint">Pick a firm, then move the slider one step at a time. Each step adds its marginal revenue and subtracts its marginal cost.</p>
  <div class="seg" role="group" aria-label="Data set"><button data-k="rf" aria-pressed="true">Raspberry farm</button><button data-k="hp" aria-pressed="false">HealthPill</button></div>
  <div class="slider"><label for="mm-i">Step</label><input id="mm-i" type="range" min="1" max="10" step="1" value="7"><output></output></div>
  <div class="mm-g"></div>
  <div class="readout"><div><b class="mm-mr"></b><span>marginal revenue</span></div><div><b class="mm-mc"></b><span>marginal cost</span></div><div><b class="mm-mp"></b><span>change in profit this step</span></div><div><b class="mm-tp"></b><span>total profit after it</span></div></div>
  <div class="msg"></div>`;
  const SL = $('#mm-i', el);
  const draw = () => {
    const S = SETS[k], R = S.rows; SL.max = R.length; const i = Math.min(+SL.value, R.length); SL.value = i; const r = R[i-1], from = i>1 ? R[i-2].q : 0;
    SL.nextElementSibling.textContent = `${from} → ${r.q}`;
    const fm = v => k==='rf' ? d2(v) : usd(v);
    $('.mm-g', el).innerHTML = `<div class="qg" style="max-width:440px">${ubars(R.map(x=>x.prof), { labels:R.map(x=>x.q), ylab:'Total profit ($)', xlab:'Output ('+S.unit+')', w:330, fmtv:v=> v<0?'−'+Math.abs(v).toLocaleString('en-US'):v.toLocaleString('en-US'), colorOf:(v,j)=> j===i-1 ? 'var(--g2)' : v<0 ? 'var(--bad)' : 'var(--accent)' })}</div>`;
    const dp = r.prof - r.prev;
    $('.mm-mr', el).textContent = fm(r.mr) + (k==='rf'?' a pack':''); $('.mm-mc', el).textContent = fm(r.mc) + (k==='rf'?' a pack':'');
    $('.mm-mp', el).textContent = (dp>0?'+':dp<0?'−':'') + usd(Math.abs(dp)); $('.mm-tp', el).textContent = usd(r.prof);
    const m = $('.msg', el), eq = Math.abs(r.mr - r.mc) < 1e-9;
    if(eq){ m.className='msg good'; m.innerHTML = `MR = MC (${fm(r.mr)}): this step adds nothing, so total profit stays at <b>${usd(r.prof)}</b>, the highest it gets. <b>Stop here</b>: the MR = MC rule picks ${r.q} ${S.unit}.`; }
    else if(r.mr > r.mc){ m.className='msg good'; m.innerHTML = `MR (${fm(r.mr)}) is above MC (${fm(r.mc)}), so this step adds ${usd(dp)} and profit rises to ${usd(r.prof)}. Keep going.`; }
    else { m.className='msg bad'; m.innerHTML = i===1 ? `The first step costs more than it brings in (MC ${fm(r.mc)} vs MR ${fm(r.mr)}), so profit is ${usd(r.prof)}. Later steps are cheaper: keep stepping to see where profit peaks.` : `MR (${fm(r.mr)}) is below MC (${fm(r.mc)}), so this step <b>loses</b> ${usd(Math.abs(dp))} and profit falls to ${usd(r.prof)}. Go back one step.`; }
  };
  $$('.seg button', el).forEach(b => b.onclick = () => { k=b.dataset.k; $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', x===b)); SL.value = SETS[k].start; draw(); });
  SL.addEventListener('input', draw); draw();
};

/* L21 exam skill: produce more, less, or stay? All numbers made-up. */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.mrsort = el => sorterWidget(el, { title:'What should the firm do next?', hint:'Made-up numbers at a firm\'s current output. Compare marginal revenue with marginal cost.', aria:'Next move',
  kinds:[['more','Produce more'],['less','Produce less'],['stay','Stay put']],
  items:[
    ['Marginal revenue $15, marginal cost $11.','more','The next unit adds about $4 more to revenue than to cost.'],
    ['Marginal revenue $9, marginal cost $13.','less','The last unit cost $4 more than it brought in; cutting it raises profit.'],
    ['Marginal revenue $7, marginal cost $7.','stay','MR = MC: one more unit adds nothing, one fewer loses nothing. Profit is at its maximum.'],
    ['Marginal cost is rising: it went from $6 to $8, and marginal revenue is $10.','more','The trap: MC is rising, but it is still below MR, so the next unit still adds profit.'],
    ['Producing 10 more units would add $50 of revenue and $70 of cost.','less','Per unit, MR = $5 and MC = $7. Those units would lower profit by $20, so the firm is already past MR = MC.'],
    ['The firm is making a $500 profit. Marginal revenue $20, marginal cost $26.','less','A profit doesn\'t mean it is at the best output. MR &lt; MC, so it is producing too much.']
  ]});

/* TEST NOTE (2026-10-28): your course's Firm A (video 5.2, slides 196-200): TC 1.50, 2.00, 3.00, 4.50, 6.50, 9.50, 12.75, 16.25, 20.00, 24.00 for 0-9 balls.
   Best output = highest profit; ties go to the larger output (the MR = MC step). Expected (checked by script):
   $3 → 5 balls, profit $5.50 (tie with 4); $4 → 9 balls, $12.00 (tie with 8); $3.50 → 7 balls, $8.25; $2 → 4 balls, $1.50 (tie with 3); $1.50 → 3 balls, $0 (ties 2,3);
   $1 → 2 balls, −$1.00 (ties 1, 2; loss smaller than the $1.50 fixed cost); $0.50 → 1 ball, −$1.50 (equal to shutting down); $4.50 → 9 balls, $16.50 (most it can make).
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys. */
W.pricetaker = el => {
  el.innerHTML = `<p class="widget-title">Set the market price</p><p class="hint">Your course's Firm A takes the market price as given. Move the price and see how many ping-pong balls it makes and what it earns.</p>
  <div class="slider"><label for="pt-p">Market price</label><input id="pt-p" type="range" min="0.5" max="4.5" step="0.25" value="3"><output></output></div>
  <div class="pt-g"></div>
  <div class="readout"><div><b class="pt-q"></b><span>balls produced</span></div><div><b class="pt-tr"></b><span>total revenue</span></div><div><b class="pt-tc"></b><span>total cost</span></div><div><b class="pt-pr"></b><span>profit</span></div></div>
  <div class="msg"></div>`;
  const SP=$('#pt-p', el);
  const draw = () => {
    const P=+SP.value; SP.nextElementSibling.textContent = d2(P);
    const prof = PP_TC.map((t,q)=>P*q-t); let best=0; prof.forEach((v,q)=>{ if(v>prof[best]+1e-9 || Math.abs(v-prof[best])<1e-9) best=q; });
    const ties = prof.map((v,q)=>Math.abs(v-prof[best])<1e-9?q:-1).filter(q=>q>=0);
    $('.pt-g', el).innerHTML = sdg({ xmax:10, ymax:4.8, xt:[0,1,2,3,4,5,6,7,8,9], yt:[0,1,2,3,4], xlab:'Ping-pong balls', ylab:'Dollars per ball', aria:'Marginal cost curve and the price line',
      lines:[ {pts:PP_MC.map((m,i)=>[i+1,m]), c:'var(--g2)', label:'MC', lx:4, ly:4}, {pts:[[0,P],[10,P]], c:'var(--accent)'} ], labels:[[1.2, P+0.25, 'MR = P', 'var(--accent)']],
      vls: best ? [{q:best, p:P}] : [], dots: best ? [{q:best, p:P, label:`${best} balls`, c:'var(--ink)', lx:-8, ly:-10, anchor:'end'}] : [] });
    $('.pt-q', el).textContent = best; $('.pt-tr', el).textContent = d2(P*best); $('.pt-tc', el).textContent = d2(PP_TC[best]); $('.pt-pr', el).textContent = (prof[best]<0?'−':'')+d2(Math.abs(prof[best]));
    const m=$('.msg', el), mcLast = best ? PP_MC[best-1] : null, mcNext = best<9 ? PP_MC[best] : null;
    let s = `At ${d2(P)}, every ball adds ${d2(P)} of revenue. Firm A makes ${best} ball${best===1?'':'s'}: ${best?`the ${ordinal(best)} costs ${d2(mcLast)}`:''}${mcNext!==null?`${best?', and ':''}the next would cost ${d2(mcNext)}, more than the price`:', the most it can make here'}.`;
    if(ties.length>1) s += ` Profit is the same at ${ties.join(' and ')} balls because the last ball's MC equals the price; the MR = MC rule names ${best}.`;
    if(prof[best] < -1e-9) s += ` Even at its best output it loses ${d2(-prof[best])}, no more than its $1.50 fixed cost. Lesson 23 asks whether a firm in this spot should keep producing.`;
    m.className = 'msg' + (prof[best]>1e-9?' good':prof[best]<-1e-9?' bad':''); m.innerHTML = s;
  };
  SP.addEventListener('input', draw); draw();
};

/* L22 exam skill: which market structure? Examples from the course textbook (wheat, water, restaurants, Boeing/Airbus, patents) and made-up ones. */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.structsort = el => sorterWidget(el, { title:'Which market structure?', hint:'Count the sellers, then check whether products are identical and whether new firms can get in.', aria:'Market structure',
  kinds:[['pc','Perfect competition'],['mc','Monopolistic competition'],['ol','Oligopoly'],['mo','Monopoly']],
  items:[
    ['Thousands of farmers grow the same variety of wheat and sell at the going price.','pc','Many sellers, an identical product, easy entry: your course textbook\'s own example.'],
    ['A town\'s only water company, which owns the pipes under every street.','mo','One seller and no close substitute. The textbook lists water companies as natural monopolies (Lesson 25).'],
    ['Hundreds of restaurants in a city, each with its own menu, style and location.','mc','Many sellers and free entry, but each restaurant\'s food is a bit different, so each has some control over its price.'],
    ['Two companies build almost all large passenger jets in the world.','ol','A few firms behind high barriers to entry. Your course textbook names Boeing and Airbus.'],
    ['A drug company is the only seller of a new medicine it has patented.','mo','A patent is a legal barrier to entry, so the firm is the only seller for now (Lesson 25).'],
    ['Many small shops sell their own designs of T-shirts online, and anyone can open one.','mc','Many sellers and free entry, but each shop\'s designs are differentiated.']
  ]});

/* TEST NOTE (2026-10-28): your course textbook's raspberry farm (Tables 8.1, 8.6), fixed cost $62. Best producing output = highest profit among 10..100 packs (ties to the larger).
   Expected (checked by script): $1.80 → best producing 40 packs, −$72 vs shut −$62 → shut down; $2.05 → 40 packs, −$62 = −$62 → indifferent;
   $2.20 → 50 packs (tie 40), −$56 → keep producing at a loss; $3.00 → 60 packs, −$12; $3.20 → 70 packs (tie 60), $0 → zero profit; $4.00 → 80 packs (tie 70), +$56; $5.00 → 80 packs, +$136; $6.00 → 90 packs (tie 80), +$216.
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys. */
W.shutdown = el => {
  el.innerHTML = `<p class="widget-title">Produce or shut down?</p><p class="hint">Your course textbook's raspberry farm has a $62 fixed cost it owes either way. Set the market price and compare its best result if it produces with the result of shutting down.</p>
  <div class="slider"><label for="sd-p">Price per pack</label><input id="sd-p" type="range" min="1.5" max="6" step="0.05" value="2.2"><output></output></div>
  <div class="sd-g"></div>
  <div class="readout"><div><b class="sd-q"></b><span>best output if it produces</span></div><div><b class="sd-pp"></b><span>profit if it produces</span></div><div><b class="sd-ps"></b><span>profit if it shuts down</span></div></div>
  <div class="msg"></div>`;
  const SP=$('#sd-p', el);
  const draw = () => {
    const P=+SP.value; SP.nextElementSibling.textContent = d2(P);
    const b = rfBestProducing(P), prod=b.profit, shut=-RF_FC, avc = RF.find(r=>r.q===b.q).avc;
    const lo=Math.min(prod,shut,-80), hi=Math.max(prod,0,40), W_=340, left=110, right=W_-60, X=v=>left+(right-left)*(v-lo)/(hi-lo);
    const bar=(y,lab,v,c)=>`<text x="${left-6}" y="${y+14}" text-anchor="end" class="lbl-ink">${lab}</text><rect x="${Math.min(X(0),X(v)).toFixed(1)}" y="${y+3}" width="${Math.max(1,Math.abs(X(v)-X(0))).toFixed(1)}" height="16" fill="${c}" opacity=".85"/><text x="${(Math.max(X(0),X(v))+4).toFixed(1)}" y="${y+15}" class="lbl-ink halo">${v<0?'−':''}$${Math.abs(v).toFixed(2).replace(/\.00$/,'')}</text>`;
    $('.sd-g', el).innerHTML = `<svg class="u2bars" viewBox="0 0 ${W_} 66" role="img" aria-label="Profit if it produces compared with profit if it shuts down">${bar(4,'produce '+b.q+' packs',prod,prod>=0?'var(--accent)':'var(--bad)')}${bar(32,'shut down',shut,'var(--g2)')}<line x1="${X(0).toFixed(1)}" x2="${X(0).toFixed(1)}" y1="2" y2="56" stroke="var(--muted)" stroke-dasharray="3 3"/></svg>`;
    $('.sd-q', el).textContent = b.q+' packs'; $('.sd-pp', el).textContent = (prod<0?'−':'')+'$'+Math.abs(prod).toFixed(2); $('.sd-ps', el).textContent = '−$62';
    const m=$('.msg', el);
    if(prod > 1e-9){ m.className='msg good'; m.innerHTML = `At ${d2(P)} the price is above the $3.20 bottom of average total cost: the farm makes an <b>economic profit</b> of ${usd(prod)} at ${b.q} packs. In the long run, profits like this attract new farms (Lesson 24).`; }
    else if(Math.abs(prod) < 1e-9){ m.className='msg good'; m.innerHTML = `At ${d2(P)} the price equals the bottom of average total cost: <b>zero economic profit</b>, a normal profit. No reason to enter or exit.`; }
    else if(prod > shut + 1e-9){ m.className='msg'; m.innerHTML = `A loss either way, but producing ${b.q} packs loses ${usd(-prod)}, less than the $62 it loses by shutting down. The price (${d2(P)}) is above average variable cost (${d2(avc)}), so revenue covers the variable costs and ${usd(prod+62)} of the fixed cost. <b>Keep producing</b> in the short run; exit in the long run if the price stays below $3.20.`; }
    else if(Math.abs(prod-shut) < 1e-9){ m.className='msg'; m.innerHTML = `At ${d2(P)} producing loses $62, exactly the same as shutting down: this is the <b>shutdown point</b>, the bottom of average variable cost.`; }
    else { m.className='msg bad'; m.innerHTML = `Even at its best output (${b.q} packs) the farm loses ${usd(-prod)}, more than the $62 fixed cost. The price (${d2(P)}) is below average variable cost (${d2(avc)}), so it can't even pay its workers. <b>Shut down</b> and lose only the $62.`; }
  };
  SP.addEventListener('input', draw); draw();
};

/* L23 exam skill: profit, loss or shut down? All numbers made-up. */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.shutsort = el => sorterWidget(el, { title:'Profit, loss or shut down?', hint:'Made-up numbers for a perfectly competitive firm at its best output. Compare the price with ATC, then with AVC.', aria:'What the firm does',
  kinds:[['profit','Profit or break even: keep producing'],['loss','Loss, but keep producing'],['shut','Shut down now']],
  items:[
    ['Price $10, average total cost $8, average variable cost $6.','profit','P > ATC: an economic profit, which in the long run attracts entry.'],
    ['Price $7, average total cost $9, average variable cost $6.','loss','P < ATC means a loss, but P > AVC, so revenue covers the variable costs and $1 per unit of the fixed costs.'],
    ['Price $5, average total cost $9, average variable cost $6.','shut','P < AVC: each unit loses even its variable cost. Shutting down cuts the loss to the fixed cost.'],
    ['Price $8, average total cost $8.50, average variable cost $7.90.','loss','The trap: it barely covers AVC ($8 > $7.90), so it keeps producing in the short run, at a small loss.'],
    ['Price $12, minimum average total cost $12.','profit','P = minimum ATC: zero economic profit, a normal profit. The firm is covering all its costs, including implicit ones, so it stays.'],
    ['Revenue $900, variable cost $1,000, fixed cost $300.','shut','Revenue doesn\'t cover variable cost: producing loses $400, shutting down loses $300.']
  ]});

/* L24 widget: entry and exit in a made-up constant-cost market (see LR in l24.js). Firm TC = 100 + 0.25q², so q = 2P and profit per firm = P² − 100.
   Market supply Q = 2nP; demand Q = A − 100P with A = 1,600 (low), 2,000 (D1) or 2,400 (D2). Price P = A ÷ (100 + 2n).
   TEST NOTE (2026-10-28), expected (checked by script): D1, 50 firms → P $10.00, q 20, Q 1,000, profit $0 (long-run equilibrium);
   D2, 50 firms → P $12.00, q 24, Q 1,200, profit $44; D2, 60 firms → P $10.91, q 21.8, profit $19.01; D2, 70 firms → P $10.00, Q 1,400, profit $0;
   low, 50 firms → P $8.00, q 16, profit −$36; low, 30 firms → P $10.00, Q 600, profit $0; D1, 90 firms → P $7.14, profit −$48.98.
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys; demand buttons reachable by Tab. */
W.lrmarket = el => {
  const DEM = [['low',1600,'Low demand'],['d1',2000,'D1 (start)'],['d2',2400,'D2 (higher)']];
  el.innerHTML = `<p class="widget-title">Let firms enter or exit</p><p class="hint">Made-up market. Every firm has the same costs; average total cost is lowest, $10, at 20 units. Pick a demand level, then change the number of firms until no one wants to enter or leave.</p>
  <div class="seg" role="group" aria-label="Demand level">${DEM.map(([k,,t])=>`<button type="button" data-d="${k}" aria-pressed="${k==='d1'}">${t}</button>`).join('')}</div>
  <div class="slider"><label for="lr-n">Number of firms</label><input id="lr-n" type="range" min="20" max="90" step="5" value="50"><output></output></div>
  <div class="lr-g"></div>
  <div class="readout"><div><b class="lr-p"></b><span>market price</span></div><div><b class="lr-q"></b><span>each firm makes</span></div><div><b class="lr-Q"></b><span>market quantity</span></div><div><b class="lr-pr"></b><span>profit per firm</span></div></div>
  <div class="msg"></div>`;
  let A = 2000; const SN = $('#lr-n', el);
  el.querySelectorAll('[data-d]').forEach(b => b.addEventListener('click', () => { A = DEM.find(d=>d[0]===b.dataset.d)[1]; el.querySelectorAll('[data-d]').forEach(x=>x.setAttribute('aria-pressed', String(x===b))); draw(); }));
  const draw = () => {
    const n = +SN.value; SN.nextElementSibling.textContent = n;
    const P = LR.P(A,n), q = 2*P, Qm = n*q, prof = P*P - 100, zero = Math.abs(prof) < 0.005;
    const sEnd = Math.min(2400, 2*n*24);
    $('.lr-g', el).innerHTML = sdg({ xmax:2400, ymax:24, xt:[0,800,1600,2400], yt:[0,10,20], xlab:'Market quantity', ylab:'Price ($)', aria:`Market demand and supply with ${n} firms; price ${d2(P)}`,
      lines:[ dem([0,A/100],[A,0],'D'), {a:[0,0], b:[sEnd, sEnd/(2*n)], label:`S (${n} firms)`, c:'var(--g1)', lx:-6, ly:14, anchor:'end'}, {pts:[[0,10],[2400,10]], c:'var(--muted)', dash:'2 4', w:1.6, label:'min ATC $10', lx:-4, ly:-6, anchor:'end'} ],
      vls:[{q:Qm,p:P}], dots:[{q:Qm,p:P,label:d2(P),c:'var(--ink)',lx:8,ly:-8}] });
    $('.lr-p', el).textContent = d2(P); $('.lr-q', el).textContent = (Math.round(q*10)/10)+' units'; $('.lr-Q', el).textContent = Math.round(Qm).toLocaleString('en-US');
    $('.lr-pr', el).textContent = zero ? '$0' : (prof<0?'−':'')+d2(Math.abs(prof));
    const m = $('.msg', el);
    if(zero){ m.className='msg good'; m.innerHTML = `<b>Long-run equilibrium.</b> The price is $10, the bottom of average total cost, so each firm earns zero economic profit. No one wants to enter or leave. ${n} firms × 20 units = ${(n*20).toLocaleString('en-US')}.`; }
    else if(prof > 0){ m.className='msg'; m.innerHTML = `At ${d2(P)} each firm earns an economic profit of ${d2(prof)}. That attracts new firms: <b>add firms</b> and watch supply shift right and the price fall.`; }
    else { m.className='msg bad'; m.innerHTML = `At ${d2(P)} each firm loses ${d2(-prof)}. Some firms leave in the long run: <b>remove firms</b> and watch supply shift left and the price rise.`; }
  };
  SN.addEventListener('input', draw); draw();
};

/* L24 exam skill: read the firm, predict the market. All numbers made-up. */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.lrsort = el => sorterWidget(el, { title:'Enter, exit or stay?', hint:'Made-up numbers for a typical firm in a perfectly competitive industry. Compare the price with average total cost at the firm\'s output.', aria:'What happens in the long run',
  kinds:[['enter','Firms enter; price falls'],['exit','Firms exit; price rises'],['stay','No entry or exit']],
  items:[
    ['Price $15; at its best output the firm\'s ATC is $12.','enter','P > ATC: economic profit. Entry shifts market supply right until the price falls to minimum ATC.'],
    ['Price $8; minimum ATC is $10; AVC at its best output is $7.','exit','P < ATC: a loss. It keeps producing for now (P > AVC), but in the long run some firms leave and the price rises.'],
    ['Price $20, equal to the bottom of the firm\'s ATC curve.','stay','P = minimum ATC: zero economic profit, a normal profit. This is long-run equilibrium.'],
    ['Demand has just risen; price $14, the firm\'s ATC $11.','enter','The short-run profit after a demand rise draws in new firms until the price is back at minimum ATC.'],
    ['Accounting profit $50,000; the owners could earn $50,000 elsewhere.','stay','Economic profit is $50,000 − $50,000 = $0: a normal profit, so no one has a reason to move.'],
    ['Revenue $40,000; total cost including implicit costs $46,000.','exit','An economic loss of $6,000: over time firms leave the industry.']
  ]});

/* L25 widget: De Beers picks a price (course slides 214-218). Rows from DB (head5.js).
   TEST NOTE (2026-10-28), expected (checked by script): $2,000 → 0 diamonds, revenue $0, cost $25,000, profit −$25,000, next 100: MR $1,800 > MC $750 → sell more;
   $1,800 → 100, profit $80,000, next MR $1,400 > MC $900; $1,600 → 200, profit $130,000, next MR $1,000 = MC $1,000 → no change; $1,400 → 300, profit $130,000, next MR $600 < MC $1,100 → MR = MC point;
   $1,200 → 400, profit $80,000, last step MR $600 < MC $1,100 → sell less; $1,000 → 500, revenue $500,000 (largest), profit −$25,000.
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys. */
W.monchoose = el => {
  el.innerHTML = `<p class="widget-title">Set De Beers\' price</p><p class="hint">Your course\'s De Beers numbers. Pick a price; demand decides how many diamonds sell. Watch profit and the MR and MC of the next 100 diamonds.</p>
  <div class="slider"><label for="mo-p">Price per diamond</label><input id="mo-p" type="range" min="0" max="5" step="1" value="0" aria-valuetext="$2,000"><output></output></div>
  <div class="mo-g"></div>
  <div class="readout"><div><b class="mo-q"></b><span>diamonds sold</span></div><div><b class="mo-tr"></b><span>total revenue</span></div><div><b class="mo-tc"></b><span>total cost</span></div><div><b class="mo-pr"></b><span>profit</span></div></div>
  <div class="msg"></div>`;
  const SP = $('#mo-p', el);
  const draw = () => {
    const i = +SP.value, r = DB[i], prof = r.tr - r.tc, nx = DB[i+1], pv = DB[i];
    SP.nextElementSibling.textContent = usd(r.p); SP.setAttribute('aria-valuetext', usd(r.p));
    const W_=340, H=150, left=34, bw=38, gap=12, base=92, sc=60/130000;
    let svg = `<svg class="u2bars" viewBox="0 0 ${W_} ${H}" role="img" aria-label="Profit at each quantity of diamonds; ${r.q} selected">`;
    svg += `<line x1="${left-4}" x2="${W_-6}" y1="${base}" y2="${base}" stroke="var(--muted)" stroke-width="1"/>`;
    DB.forEach((d,k)=>{ const pr=d.tr-d.tc, x=left+k*(bw+gap), h=Math.abs(pr)*sc, y=pr>=0?base-h:base, on=k===i;
      svg += `<rect x="${x}" y="${y.toFixed(1)}" width="${bw}" height="${Math.max(1,h).toFixed(1)}" rx="3" fill="${pr>=0?'var(--accent)':'var(--bad)'}" opacity="${on?1:.35}"/>`;
      svg += `<text x="${x+bw/2}" y="${(pr>=0?y-4:y+h+12).toFixed(1)}" text-anchor="middle" class="lbl-ink" style="font-size:10px">${pr<0?'−':''}${Math.abs(pr/1000)}k</text>`;
      svg += `<text x="${x+bw/2}" y="${H-24}" text-anchor="middle" class="lbl"${on?' style="font-weight:700"':''}>${d.q}</text>`; });
    svg += `<text x="${left+2.5*(bw+gap)+bw/2}" y="${H-6}" text-anchor="middle" class="lbl">diamonds sold (profit in $ thousands)</text></svg>`;
    $('.mo-g', el).innerHTML = svg;
    $('.mo-q', el).textContent = r.q; $('.mo-tr', el).textContent = usd(r.tr); $('.mo-tc', el).textContent = usd(r.tc); $('.mo-pr', el).textContent = usd(prof); $('.mo-pr', el).style.whiteSpace='nowrap';
    const m = $('.msg', el);
    if(nx && nx.mr > nx.mc){ m.className='msg'; m.innerHTML = `Selling 100 more (at ${usd(nx.p)}) would add MR ${usd(nx.mr)} per diamond against MC ${usd(nx.mc)}. MR &gt; MC: <b>lower the price and sell more</b>; profit would rise to ${usd(nx.tr-nx.tc)}.`; }
    else if(nx && nx.mr === nx.mc){ m.className='msg good'; m.innerHTML = `The next 100 diamonds add MR ${usd(nx.mr)} and MC ${usd(nx.mc)} per diamond: profit stays ${usd(prof)}. Your course goes on to 300 diamonds, where MR = MC.`; }
    else if(r.q === 300){ m.className='msg good'; m.innerHTML = `<b>MR = MC.</b> The step to 300 added MR $1,000 = MC $1,000. The next 100 would add only MR ${usd(nx.mr)} against MC ${usd(nx.mc)}. This is your course\'s answer: 300 diamonds at $1,400, profit $130,000.`; }
    else { m.className='msg bad'; m.innerHTML = `The last 100 diamonds added MR ${usd(pv.mr)} per diamond but cost ${usd(pv.mc)}. MR &lt; MC: <b>raise the price and sell less</b>.${r.q===500?' Revenue is at its largest here ($500,000), but profit is negative: the most revenue is not the most profit.':''}`; }
  };
  SP.addEventListener('input', draw); draw();
};

/* L25: which barrier to entry? Examples from the course (De Beers, patents) and textbook (ALCOA, water pipes, copyrights) plus made-up ones. */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.barsort = el => sorterWidget(el, { title:'Which barrier to entry?', hint:'Ask what stops a rival from selling the same thing.', aria:'Kind of barrier',
  kinds:[['res','Key resource'],['gov','Government-created'],['nat','Natural monopoly'],['none','No barrier']],
  items:[
    ['De Beers once owned more than 80% of the world\'s diamond production.','res','Your course\'s example: rivals can\'t get the input they need.'],
    ['A drug company holds a 20-year patent on a new medicine.','gov','A patent is a legal right granted by government, your course\'s example of a government-created monopoly.'],
    ['One company owns the water pipes under every street in a town.','nat','A second set of pipes would be "costly and duplicative" (your course textbook): one firm can serve the town more cheaply.'],
    ['In the 1930s ALCOA controlled most of the bauxite needed to make aluminum.','res','Your course textbook\'s example of controlling a scarce physical resource.'],
    ['A publisher holds the copyright on a best-selling novel.','gov','Copyright is a legal right, like a patent; no one else may sell that book.'],
    ['Made-up: a popular food truck sells a new taco, and other trucks can copy it next week.','none','Nothing stops rivals, so profits will draw in competition.']
  ]});

/* L26 widget: deadweight loss with a marginal-cost slider and a perfect price discrimination switch (made-up market: demand P = 12 − Q, constant MC c; see DW in l26.js).
   TEST NOTE (2026-10-28), expected (checked by script): c $4 → monopoly 4 units at $8, CS $8, profit $16, DWL $8; perfect PD → 8 units, CS $0, profit $32, DWL $0;
   c $2 → 5 units at $7, CS $12.50, profit $25, DWL $12.50; c $8 → 2 units at $10, CS $2, profit $4, DWL $2; c $10 → 1 unit at $11, CS $0.50, profit $1, DWL $0.50.
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys; switch reachable by Tab and toggles with Space. */
W.dwl = el => {
  el.innerHTML = `<p class="widget-title">How big is the deadweight loss?</p><p class="hint">Made-up market: demand P = 12 − Q. Change the monopoly\'s marginal cost, or let it charge every buyer a different price.</p>
  <div class="slider"><label for="dw-c">Marginal cost</label><input id="dw-c" type="range" min="1" max="10" step="1" value="4"><output></output></div>
  <div class="seg" role="group" aria-label="Pricing"><button type="button" data-m="one" aria-pressed="true">One price</button><button type="button" data-m="pd" aria-pressed="false">Perfect price discrimination</button></div>
  <div class="dw-g"></div>
  <div class="readout"><div><b class="dw-q"></b><span>units sold</span></div><div><b class="dw-cs"></b><span>consumer surplus</span></div><div><b class="dw-pr"></b><span>profit</span></div><div><b class="dw-l"></b><span>deadweight loss</span></div></div>
  <div class="msg"></div>`;
  const SC = $('#dw-c', el); let pd = false;
  el.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { pd = b.dataset.m==='pd'; el.querySelectorAll('[data-m]').forEach(x=>x.setAttribute('aria-pressed', String(x===b))); draw(); }));
  const draw = () => {
    const c = +SC.value; SC.nextElementSibling.textContent = usd(c);
    const r = DW(c), q = pd ? r.qe : r.qm, cs = pd ? 0 : r.cs, prof = pd ? r.ppd : r.profit, dl = pd ? 0 : r.dwl;
    const areas = pd ? [{pts:[[0,c],[r.qe,c],[0,12]], c:'var(--accent)', o:0.35}]
      : [{pts:[[0,r.pm],[r.qm,r.pm],[0,12]], c:'var(--g1)', o:0.3}, {pts:[[0,c],[r.qm,c],[r.qm,r.pm],[0,r.pm]], c:'var(--accent)', o:0.35}, {pts:[[r.qm,r.pm],[r.qm,c],[r.qe,c]], c:'var(--bad)', o:0.35}];
    $('.dw-g', el).innerHTML = sdg({ xmax:12, ymax:12, xt:[0,4,8,12], yt:[0,4,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:`Demand, MR and MC at ${usd(c)}; ${pd?'perfect price discrimination':'single-price monopoly'}`,
      areas, lines:[ dem([0,12],[12,0]), ...(pd?[]:[{a:[0,12],b:[6,0],label:'MR',c:'var(--g2)',lx:6,ly:-2}]), {pts:[[0,c],[12,c]], c:'var(--accent)', label:'MC', lx:-4, ly:-6, anchor:'end'} ],
      vls: pd ? [{q:r.qe,p:c}] : [{q:r.qm,p:r.pm}], dots: pd ? [{q:r.qe,p:c,label:'',c:'var(--ink)'}] : [{q:r.qm,p:r.pm,label:usd(r.pm),c:'var(--ink)',lx:8,ly:-8}] });
    $('.dw-q', el).textContent = q; $('.dw-cs', el).textContent = usd(cs); $('.dw-pr', el).textContent = usd(prof); $('.dw-l', el).textContent = usd(dl);
    const m = $('.msg', el);
    if(pd){ m.className='msg'; m.innerHTML = `Each buyer pays the most they will pay, down to ${usd(c)} where demand meets MC. The firm sells the efficient ${r.qe} units: <b>no deadweight loss</b>, but all ${usd(r.ppd)} of surplus is profit and buyers keep <b>nothing</b>.`; }
    else { m.className='msg bad'; m.innerHTML = `MR = MC at ${r.qm} units, and demand says ${usd(r.pm)}. The efficient output is ${r.qe} units (demand = MC), so ${r.qe-r.qm} units worth more than they cost go unmade: a <b>deadweight loss of ${usd(r.dwl)}</b>. Blue is consumer surplus, green is profit, red is the loss.`; }
  };
  SC.addEventListener('input', draw); draw();
};

/* L26: price discrimination or not? Examples from tutor2u and Econlib (Kling) plus made-up ones. */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.pdsort = el => sorterWidget(el, { title:'Price discrimination or not?', hint:'Same product, same cost to serve, different prices for different buyers? Then it is price discrimination.', aria:'Price discrimination or not',
  kinds:[['pd','Price discrimination'],['no','Not price discrimination']],
  items:[
    ['A museum charges seniors $8 and other adults $15 for the same visit.','pd','Same visit, same cost; seniors tend to be more price-sensitive. tutor2u lists senior discounts.'],
    ['A software company sells the same program more cheaply to schools than to businesses.','pd','Econlib\'s Kling: Microsoft charges schools and home users less than business users.'],
    ['A moving company charges more to move a family 500 miles than 50 miles.','no','The longer move costs more to provide, so the higher price reflects cost, not willingness to pay.'],
    ['An airline charges more for a seat bought the day before the flight than for the same seat bought months ahead.','pd','Last-minute travelers (often on business) will pay more. tutor2u lists advance-purchase airfares.'],
    ['A bakery raises the price of all its bread for every customer after flour prices rise.','no','Everyone pays the same new price, and the change reflects higher cost.'],
    ['Made-up: a theme park charges local residents less than tourists for the same ticket.','pd','Same ticket, same cost; locals have more choices about when to visit, so they are more price-sensitive.']
  ]});

/* L27 widget: Jack and Jill choose how much water to bring (course video 5.4: P = 120 − Q, MC = 0).
   TEST NOTE (2026-10-28), expected (checked by script): 30/30 → Q 60, P $60, $1,800 each, total $3,600; 40/30 → Q 70, P $50, Jack $2,000, Jill $1,500; 40/40 → Q 80, P $40, $1,600 each (Nash equilibrium);
   20/20 → Q 40, P $80, $1,600 each; 20/40 → Q 60, P $60, Jack $1,200, Jill $2,400. Jack's best reply is 40 whatever Jill picks (to 20: $2,400; to 30: $2,000; to 40: $1,600).
   UI to check: 375, 390 and 1100 px, light and dark; all six buttons reachable by Tab. */
W.duopoly = el => {
  const OPT = [20,30,40];
  el.innerHTML = `<p class="widget-title">Cooperate or cheat?</p><p class="hint">Your course\'s Jack and Jill. They agreed on 30 gallons each. Pick how much each one brings; the price is $120 minus the total.</p>
  <p class="small" style="margin:.2rem 0">Jack brings</p><div class="seg" role="group" aria-label="Jack's gallons">${OPT.map(q=>`<button type="button" data-p="j" data-q="${q}" aria-pressed="${q===30}">${q}</button>`).join('')}</div>
  <p class="small" style="margin:.6rem 0 .2rem">Jill brings</p><div class="seg" role="group" aria-label="Jill's gallons">${OPT.map(q=>`<button type="button" data-p="l" data-q="${q}" aria-pressed="${q===30}">${q}</button>`).join('')}</div>
  <div class="dp-g" style="margin-top:.6rem"></div>
  <div class="readout"><div><b class="dp-p"></b><span>price per gallon</span></div><div><b class="dp-j"></b><span>Jack\'s profit</span></div><div><b class="dp-l"></b><span>Jill\'s profit</span></div><div><b class="dp-t"></b><span>total</span></div></div>
  <div class="msg"></div>`;
  const st = { j:30, l:30 };
  el.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => { st[b.dataset.p] = +b.dataset.q; el.querySelectorAll(`[data-p="${b.dataset.p}"]`).forEach(x=>x.setAttribute('aria-pressed', String(x===b))); draw(); }));
  const prof = (mine, other) => mine * JJ_P(mine + other);
  const draw = () => {
    const P = JJ_P(st.j + st.l), pj = prof(st.j, st.l), pl = prof(st.l, st.j);
    $('.dp-g', el).innerHTML = stackbars([{label:'Profits', parts:[{v:pj,c:'var(--g1)',t:'Jack '+usd(pj)},{v:pl,c:'var(--g2)',t:'Jill '+usd(pl)}]}], { max:3600, left:64, w:360, aria:`Jack ${usd(pj)}, Jill ${usd(pl)}` });
    $('.dp-p', el).textContent = usd(P); $('.dp-j', el).textContent = usd(pj); $('.dp-l', el).textContent = usd(pl); $('.dp-t', el).textContent = usd(pj+pl);
    const bj = OPT.reduce((a,q)=>prof(q,st.l)>prof(a,st.l)?q:a, OPT[0]), bl = OPT.reduce((a,q)=>prof(q,st.j)>prof(a,st.j)?q:a, OPT[0]);
    const m = $('.msg', el);
    if(st.j===bj && st.l===bl){ m.className='msg good'; m.innerHTML = `<b>Nash equilibrium.</b> Each is making its best reply: neither can earn more by changing alone. But together they earn ${usd(pj+pl)}, less than the $3,600 from keeping the deal.`; }
    else { const who = [];
      if(st.j!==bj) who.push(`Jack could earn ${usd(prof(bj,st.l))} instead of ${usd(pj)} by bringing ${bj}`);
      if(st.l!==bl) who.push(`Jill could earn ${usd(prof(bl,st.j))} instead of ${usd(pl)} by bringing ${bl}`);
      m.className='msg'; m.innerHTML = `${st.j+st.l} gallons sell at ${usd(P)}. Not stable: ${who.join('; ')}.${st.j===30&&st.l===30?' This is the deal (the monopoly outcome), but each is tempted to cheat.':''}`; }
  };
  draw();
};

/* L27 widget: tap a box to test it for a Nash equilibrium. Games: course's Jack and Jill (JJ_PAY), textbook Table 10.3 (TB_PAY), made-up advertising game (AD_PAY), in l27.js.
   TEST NOTE (2026-10-28), expected: Jack and Jill: only (Cheat, Cheat) is a Nash equilibrium; (Cooperate, Cooperate): both would switch. Textbook: only (Increase, Increase).
   Advertising: only (Advertise, Advertise); (Don't, Don't): A would switch ($70k > $60k), B would not. "Show best replies" underlines them.
   UI to check: 375, 390 and 1100 px, light and dark; boxes reachable by Tab and selectable with Enter or Space. */
W.nash = el => {
  const G = [
    { k:'jj', t:'Jack and Jill', rn:'Jack', cn:'Jill', rows:['Cheat','Cooperate'], cols:['Cheat','Cooperate'], pay:JJ_PAY, f:v=>usd(v) },
    { k:'tb', t:'Textbook duopoly', rn:'A', cn:'B', rows:['Hold down','Increase'], cols:['Hold down','Increase'], pay:TB_PAY, f:v=>usd(v) },
    { k:'ad', t:'Advertising (made-up)', rn:'A', cn:'B', rows:['Advertise','Don\'t'], cols:['Advertise','Don\'t'], pay:AD_PAY, f:v=>'$'+v+'k' } ];
  el.innerHTML = `<p class="widget-title">Is it a Nash equilibrium?</p><p class="hint">Pick a game, then tap a box. You\'ll see whether either player would gain by switching on its own.</p>
  <div class="seg" role="group" aria-label="Game">${G.map((g,i)=>`<button type="button" data-g="${i}" aria-pressed="${i===0}">${g.t}</button>`).join('')}</div>
  <div class="nx-m u5mxw" style="margin-top:.6rem"></div>
  <p><button type="button" class="btn ghost sm nx-br" aria-pressed="false">Show best replies</button></p>
  <div class="msg">Tap a box to test it.</div>`;
  let gi = 0, br = false, sel = null;
  const render = () => { const g = G[gi];
    $('.nx-m', el).innerHTML = pmatrix({ rowName:g.rn, colName:g.cn, rows:g.rows, cols:g.cols, pay:g.pay, mark:{br}, hl: sel ? [sel] : [], fmtp:g.f });
    el.querySelectorAll('td.u5mx-c').forEach((td,i)=>{ const r=Math.floor(i/2), c=i%2; td.tabIndex=0; td.setAttribute('role','button'); td.setAttribute('aria-label',`${g.rn} ${g.rows[r]}, ${g.cn} ${g.cols[c]}`);
      const go = () => { sel=[r,c]; render(); explain(r,c); el.querySelectorAll('td.u5mx-c')[i].focus(); };
      td.addEventListener('click', go); td.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); go(); } }); }); };
  const explain = (r,c) => { const g=G[gi], p=g.pay, [a,b]=p[r][c], ra=p[1-r][c][0], cb=p[r][1-c][1], m=$('.msg', el);
    const rowSw = ra > a, colSw = cb > b;
    const s1 = rowSw ? `${g.rn} would switch to ${g.rows[1-r]} (${g.f(ra)} instead of ${g.f(a)}).` : `${g.rn} wouldn\'t switch (${g.rows[1-r]} gives ${g.f(ra)}, not more than ${g.f(a)}).`;
    const s2 = colSw ? `${g.cn} would switch to ${g.cols[1-c]} (${g.f(cb)} instead of ${g.f(b)}).` : `${g.cn} wouldn\'t switch (${g.cols[1-c]} gives ${g.f(cb)}, not more than ${g.f(b)}).`;
    m.className = 'msg' + (!rowSw && !colSw ? ' good' : ' bad');
    m.innerHTML = `${!rowSw && !colSw ? '<b>Yes, a Nash equilibrium.</b> ' : '<b>Not a Nash equilibrium.</b> '}${s1} ${s2}`; };
  el.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => { gi=+b.dataset.g; sel=null; el.querySelectorAll('[data-g]').forEach(x=>x.setAttribute('aria-pressed', String(x===b))); const m=$('.msg', el); m.className='msg'; m.textContent='Tap a box to test it.'; render(); }));
  $('.nx-br', el).addEventListener('click', e => { br=!br; e.currentTarget.setAttribute('aria-pressed', String(br)); e.currentTarget.textContent = br ? 'Hide best replies' : 'Show best replies'; render(); });
  render();
};

/* L28 widget: rivals enter or leave a monopolistically competitive market (made-up firm MCM in l28.js: TC = 16 + q + 0.25q²; demand P = a − 0.75q).
   TEST NOTE (2026-10-28), expected (checked by script): a 12 → q 5.5, P $7.88, ATC $5.28, profit $14.25 → entry; a 10 → q 4.5, P $6.63, ATC $5.68, profit $4.25;
   a 9 → q 4, P $6.00 = ATC $6.00, profit $0, MC $3.00, excess capacity 4 units → long run; a 8 → q 3.5, P $5.38, ATC $6.45, loss $3.75 → exit.
   UI to check: 375, 390 and 1100 px, light and dark; slider moves with arrow keys. */
W.mcentry = el => {
  el.innerHTML = `<p class="widget-title">Let rivals enter or leave</p><p class="hint">Made-up firm. Move the slider left as more rivals open (each takes some of this firm\'s customers) or right as rivals close. The firm always picks MR = MC.</p>
  <div class="slider"><label for="me-a">Demand for this firm</label><input id="me-a" type="range" min="8" max="12" step="0.5" value="12" aria-valuetext="high"><output></output></div>
  <div class="me-g"></div>
  <div class="readout"><div><b class="me-q"></b><span>output</span></div><div><b class="me-p"></b><span>price</span></div><div><b class="me-c"></b><span>ATC</span></div><div><b class="me-pr"></b><span>profit</span></div></div>
  <div class="msg"></div>`;
  const SA = $('#me-a', el);
  const draw = () => {
    const a = +SA.value, q = MCM.q(a), P = MCM.P(a), atc = MCM.atc(q), mc = MCM.mc(q), prof = (P-atc)*q, zero = Math.abs(prof) < 0.01;
    SA.nextElementSibling.textContent = a===12 ? 'few rivals' : a===8 ? 'many rivals' : `P = ${a} − 0.75q`; SA.setAttribute('aria-valuetext', `demand P = ${a} minus 0.75 q`);
    const area = zero ? [] : [{pts:[[0,atc],[q,atc],[q,P],[0,P]], c: prof>0?'var(--accent)':'var(--bad)', o:0.35}];
    $('.me-g', el).innerHTML = sdg({ xmax:14, ymax:12, xt:[0,4,8,12], yt:[0,5,10], xlab:'Output', ylab:'Dollars per unit', aria:`Firm demand P = ${a} − 0.75q; output ${q}, price ${d2(P)}, ATC ${d2(atc)}`,
      areas:area, lines:[ ...mcmCost(), ...mcmDem(a) ], vls:[{q, p:P}], dots:[{q, p:P, label:d2(P), c:'var(--ink)', lx:8, ly:-8},{q:8,p:5,label:'',c:'var(--muted)'}] });
    $('.me-q', el).textContent = q+' units'; $('.me-p', el).textContent = d2(P); $('.me-c', el).textContent = d2(atc);
    $('.me-pr', el).textContent = zero ? '$0' : (prof<0?'−':'')+d2(Math.abs(prof)); $('.me-pr', el).style.whiteSpace='nowrap';
    const m = $('.msg', el);
    if(zero){ m.className='msg good'; m.innerHTML = `<b>Long-run equilibrium.</b> Demand just touches ATC: P = ATC = ${d2(P)}, zero profit. But P is above MC (${d2(mc)}): a markup. And output (${q}) is below the 8 units where ATC is lowest ($5): excess capacity of ${8-q} units.`; }
    else if(prof>0){ m.className='msg'; m.innerHTML = `Price (${d2(P)}) is above ATC (${d2(atc)}): a profit of ${d2(prof)}. That draws in rivals: <b>move the slider left</b>.`; }
    else { m.className='msg bad'; m.innerHTML = `Price (${d2(P)}) is below ATC (${d2(atc)}): a loss of ${d2(-prof)}. Some rivals will close: <b>move the slider right</b>.`; }
  };
  SA.addEventListener('input', draw); draw();
};

/* L28 exam skill: which market structure matches this long-run description? */
/* TEST NOTE (2026-10-28): each item to be clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.mcsort = el => sorterWidget(el, { title:'Which structure fits?', hint:'Check entry first (free entry means zero long-run profit), then whether P = MC.', aria:'Market structure',
  kinds:[['pc','Perfect competition'],['mc','Monopolistic competition'],['ol','Oligopoly'],['mo','Monopoly']],
  items:[
    ['In the long run, P = MC = minimum ATC and profit is zero.','pc','Only perfect competition is both allocatively and productively efficient in the long run.'],
    ['In the long run, P = ATC but P > MC, and output is below the minimum-ATC quantity.','mc','Zero profit from free entry, but a markup and excess capacity because demand slopes down.'],
    ['Each firm\'s best choice depends on what its few rivals do; a cartel would raise everyone\'s profit if it held.','ol','Interdependence and the temptation to cheat define oligopoly.'],
    ['A single seller earns profits year after year behind a patent.','mo','Barriers to entry let a monopoly keep its profit; P > MR = MC.'],
    ['Firms sell differentiated products and advertise; profits attract copycats.','mc','Free entry with differentiated products. (Oligopolists advertise too, but they face barriers, not easy entry.)'],
    ['Thousands of farms sell identical eggs at the going price.','pc','Many sellers of an identical product, each a price taker.']
  ]});
