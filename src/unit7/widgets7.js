/* ===================== Unit 7 widgets ===================== */
/* L33 widget: how big is the pollution damage? (your course textbook's refrigerator market, Table 12.2)
   Straight lines through the table: Qd = 110,000 − 100P; private supply Qs = 100P − 20,000; with external cost e per refrigerator, social supply Qs = 100(P − e) − 20,000.
   Market: 45,000 at $650 whatever e is. Optimum: Q = 45,000 − 50e, P = 650 + e/2. Deadweight loss = ½ × e × 50e = 25e².
   TEST NOTE (2026-11-19), expected (checked by script): e $0 → optimum 45,000 at $650, extra 0, DWL $0; e $100 → 40,000 at $700, extra 5,000, DWL $250,000;
   e $200 → 35,000 at $750, extra 10,000, DWL $1,000,000. */
W.extlab = el => {
  el.innerHTML = `<p class="widget-title">How big is the pollution damage?</p><p class="hint">Your course textbook\'s refrigerator market. Move the slider to set the pollution damage per refrigerator that firms don\'t pay. At $100 you get the textbook\'s numbers.</p>
  <div class="slider"><label for="xl-e">Damage per refrigerator</label><input id="xl-e" type="range" min="0" max="200" step="25" value="100"><output></output></div>
  <div class="xl-g"></div>
  <div class="readout"><div><b class="xl-m"></b><span>market (firms ignore the damage)</span></div><div><b class="xl-o"></b><span>social optimum (MSB = MSC)</span></div><div><b class="xl-d"></b><span>deadweight loss</span></div></div>
  <div class="msg"></div>`;
  const S7 = $('#xl-e', el);
  const draw = () => {
    const e = +S7.value; S7.nextElementSibling.textContent = usd7(e);
    const qo = 45 - 0.05*e, po = 650 + e/2, dwl = 25*e*e, extra = 45 - qo;
    $('.xl-g', el).innerHTML = sdg({ xmin:25, xmax:60, ymin:550, ymax:900, xt:[30,35,40,45,50,55], yt:[600,650,700,750,800,850], xlab:'Refrigerators (thousands)', ylab:'Price ($)', aria:`Refrigerator market with damage of ${usd7(e)} per unit`,
      lines:[ {a:[25,850],b:[60,500],c:DC,label:'D',lx:-4,ly:-8,anchor:'end'}, {a:[25,450],b:[60,800],c:SC,label:'MPC',lx:-4,ly:16,anchor:'end'}, ...(e ? [{a:[25,450+e],b:[60,800+e],c:'var(--bad)',label:'MSC',lx:-4,ly:-8,anchor:'end'}] : []) ],
      areas: e ? [ Object.assign({ pts:[[qo,po],[45,650],[45,650+e]] }, DWLF) ] : [], vls:[{q:45,p:650},{q:qo,p:po}],
      dots:[ {q:45,p:650,label:'Market',c:'var(--muted)',lx:9,ly:14}, ...(e ? [{q:qo,p:po,label:'Optimum',c:'var(--ink)',lx:-9,ly:-8,anchor:'end'}] : []) ] });
    $('.xl-m', el).textContent = '45,000 at $650'; $('.xl-o', el).textContent = `${(qo*1000).toLocaleString('en-US')} at ${usd7(po)}`; $('.xl-d', el).textContent = usd7(dwl);
    $('.msg', el).innerHTML = !e ? 'No spillover: marginal social cost equals the supply curve, so the market quantity is already the best one. No deadweight loss.'
      : `The market makes <b>${(extra*1000).toLocaleString('en-US')}</b> refrigerators too many. Each of those costs society more than buyers value it; the triangle adds up the loss: ½ × ${usd7(e)} × ${(extra*1000).toLocaleString('en-US')} = <b>${usd7(dwl)}</b>.`;
  };
  S7.addEventListener('input', draw); draw();
};

/* L33 exam skill: too much or too little? Made-up scenarios plus your course's and textbook's examples.
   TEST NOTE (2026-11-19): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.extsort = el => sorterWidget(el, { title:'Too much or too little?', hint:'Made-up scenarios unless marked. Find the bystander, decide whether the spillover is a cost or a benefit, then say what the free market does.', aria:'Market outcome',
  kinds:[['much','Too much (negative)'],['little','Too little (positive)'],['none','About right (no spillover)']],
  items:[
    ['A coal-powered factory\'s smoke harms nearby residents (your course\'s example). The factory\'s output is ...','much','The smoke is a cost to bystanders; MSC is above MPC, so the market overproduces.'],
    ['Education lowers crime and leads to better-informed voters (your course\'s example). The amount of schooling chosen is ...','little','The spillover is a benefit; MSB is above private demand, so the market underproduces.'],
    ['A drug company\'s research teaches other firms how to treat an illness (your textbook\'s Big Drug). Research spending is ...','little','Others gain from the ideas without paying, so the inventor does less research than society wants.'],
    ['Loud parties keep a whole apartment building awake. The number of loud parties is ...','much','Neighbors bear a cost the party host ignores.'],
    ['A shopper buys a sweater; no one else is affected. The number of sweaters sold is ...','none','No bystander is affected, so private and social costs and benefits match.'],
    ['A neighbor keeps bees that pollinate nearby farms\' crops. The number of beehives kept is ...','little','The farms benefit without paying the beekeeper.']
  ]});

/* L34 widget: set a pollution tax (your course textbook's particulate example, Figure 12.3).
   The firm cuts each 10-pound step whose cost is at or below the tax (at a tie it is indifferent; the widget counts it as cut and says so).
   TEST NOTE (2026-11-19), expected (checked by script): tax $0 → cut 0, emit 50, cutting cost $0, tax paid $0; tax $1,000 → cut 30, emit 20, cutting cost $1,700, tax paid $2,000, total $3,700;
   tax $1,500 (tie) → cut 40, emit 10, cutting cost $3,200, tax paid $1,500; tax $2,500 (tie) → cut 50, tax paid $0; tax $200 → cut 0, tax paid $1,000; tax $3,000 → cut 50, emit 0, cutting cost $5,700, tax paid $0.
   Messages: n = 0 → "cuts nothing"; ties → "no more than the tax" plus the tie note; n = 5 → "at or above every step"; step/steps by count. Dashed line marks the tax. */
W.taxlab = el => {
  el.innerHTML = `<p class="widget-title">Set a pollution tax</p><p class="hint">Your course textbook\'s firm emits 50 pounds of soot a year. Each further 10 pounds costs more to cut: $300, $500, $900, $1,500, $2,500. Choose the tax on each 10 pounds still emitted.</p>
  <div class="slider"><label for="tl-t">Tax per 10 pounds</label><input id="tl-t" type="range" min="0" max="3000" step="100" value="1000"><output></output></div>
  <div class="tl-g"></div>
  <div class="readout"><div><b class="tl-c"></b><span>pounds cut</span></div><div><b class="tl-k"></b><span>spent on cutting</span></div><div><b class="tl-p"></b><span>tax paid on the rest</span></div></div>
  <div class="msg"></div>`;
  const S7 = $('#tl-t', el);
  const draw = () => {
    const T = +S7.value; S7.nextElementSibling.textContent = usd7(T);
    const n = AB_C.filter(c => c <= T).length, cutCost = AB_C.slice(0,n).reduce((a,b)=>a+b,0), taxPaid = (5-n)*T, tie = AB_C.includes(T);
    $('.tl-g', el).innerHTML = `<div class="qg" style="max-width:420px">${u7barsTax(AB_C, T, { labels:['1st 10 lb','2nd','3rd','4th','5th'], ylab:'Cost to cut ($)', xlab:'Each 10 pounds cut', ymax:3200, colorOf:(v)=> v <= T ? 'var(--accent)' : 'var(--bad)' })}</div>`;
    $('.tl-c', el).textContent = `${n*10} of 50`; $('.tl-k', el).textContent = usd7(cutCost); $('.tl-p', el).textContent = usd7(taxPaid);
    const steps = k => k === 1 ? '1 step' : `${k} steps`;
    $('.msg', el).innerHTML = !T ? 'With no tax, polluting is free, so the firm cuts nothing.'
      : n === 0 ? `Every step costs more than the ${usd7(T)} tax, so the firm cuts nothing and pays the tax on all 50 pounds.`
      : `The green steps cost no more than the ${usd7(T)} tax, so the firm cuts <b>${n*10} pounds</b>` + (n < 5 ? ` and pays ${usd7(T)} on each of the other ${steps(5-n)}.` : ' and pays no tax: the tax is at or above every step.') + (tie ? ` One step costs exactly the tax, so the firm doesn\'t care which it does; this widget counts it as cut.` : '');
  };
  S7.addEventListener('input', draw); draw();
};

/* L34 exam skill: which kind of remedy? Course, textbook and made-up policies.
   TEST NOTE (2026-11-19): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.remsort = el => sorterWidget(el, { title:'Which kind of remedy?', hint:'Classify each policy. Made-up unless marked.', aria:'Kind of remedy',
  kinds:[['cc','Command-and-control'],['tax','Market-based: tax or permits'],['sub','Market-based: subsidy or tax break']],
  items:[
    ['The EPA sets the maximum amount of a pollutant a power plant may emit (your course\'s slide 262).','cc','A direct limit enforced by penalties is command-and-control.'],
    ['Firms receive permits for 300 tons of pollution and may sell them to each other (your course\'s slide 264).','tax','Permits put a price on pollution and let firms trade: market-based.'],
    ['The government pays part of the cost of each year of college.','sub','A payment that raises the private benefit of a helpful activity is a subsidy.'],
    ['Every car must have a catalytic converter installed.','cc','Requiring a particular technology is command-and-control.'],
    ['A city charges households for each bag of garbage they put out (your textbook\'s "pay as you throw").','tax','A charge per unit of waste is a pollution charge: market-based.'],
    ['Homeowners get a tax credit for installing home insulation that cuts energy use.','sub','A tax break that rewards a helpful choice works like a subsidy.']
  ]});

/* L35 widget: is a public good worth providing, and will anyone buy it alone? (made-up streetlight; same numbers as the lesson's figure at the start)
   Total value = households × value each; worth providing if total ≥ cost; one household buys alone only if its own value ≥ cost.
   TEST NOTE (2026-11-19), expected (checked by script): 50 households × $40, cost $1,500 → total $2,000, Yes, equal share $30;
   10 × $40 → $400, No; 200 × $10 → $2,000, Yes; 5 × $100 → $500, No; tie 150 × $10 or 30 × $50 → $1,500, Break-even. */
W.pgcalc = el => {
  el.innerHTML = `<p class="widget-title">Worth building, but who pays?</p><p class="hint">Made-up numbers. A streetlight costs $1,500 and lights the whole street for everyone. Set how many households live on the street and what it is worth to each.</p>
  <div class="slider"><label for="pg-n">Households</label><input id="pg-n" type="range" min="5" max="200" step="5" value="50"><output></output></div>
  <div class="slider"><label for="pg-v">Value to each household</label><input id="pg-v" type="range" min="10" max="100" step="5" value="40"><output></output></div>
  <div class="pg-g"></div>
  <div class="readout"><div><b class="pg-t"></b><span>total value to the street</span></div><div><b class="pg-w"></b><span>worth building? (total vs $1,500)</span></div><div><b class="pg-a"></b><span>each household\'s share if all pay equally</span></div></div>
  <div class="msg"></div>`;
  const N = $('#pg-n', el), V = $('#pg-v', el), C = 1500;
  const draw = () => {
    const n = +N.value, v = +V.value, tot = n*v; N.nextElementSibling.textContent = n; V.nextElementSibling.textContent = usd7(v);
    $('.pg-g', el).innerHTML = `<div class="u2row"><div class="u2cell">${hbars([['One household\'s value',v],['Cost of the streetlight',C,'var(--bad)'],[`All ${n} households`,tot,'var(--accent)']], { max:Math.max(tot,C)*1.1, left:170, fmt:x=>'$'+x.toLocaleString('en-US') })}</div></div>`;
    $('.pg-t', el).textContent = usd7(tot); $('.pg-w', el).textContent = tot > C ? 'Yes' : tot === C ? 'Break-even' : 'No'; $('.pg-a', el).textContent = usd7(Math.round(C/n*100)/100);
    $('.msg', el).innerHTML = tot > C ? `Together the street values the light at ${usd7(tot)}, more than its ${usd7(C)} cost, so building it adds ${usd7(tot-C)} of value. If everyone paid an equal ${usd7(Math.round(C/n*100)/100)}, each would come out ahead, but each household gets only ${usd7(v)} of value and hopes the others will pay: free riding. Taxes make everyone chip in.`
      : tot === C ? `The total value exactly equals the ${usd7(C)} cost, so building it neither adds nor loses value for the street.`
      : `Added up, the light is worth only ${usd7(tot)}, less than its ${usd7(C)} cost, so it isn\'t worth building even for the whole street. Here the market\'s "no" is the right answer.`;
  };
  N.addEventListener('input', draw); V.addEventListener('input', draw); draw();
};

/* L35 exam skill: which kind of good? Course examples and made-up ones.
   TEST NOTE (2026-11-19): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.goodsort = el => sorterWidget(el, { title:'Which kind of good is it?', hint:'Ask the two questions in order: can nonpayers be kept out? Does one person\'s use leave less for others?', aria:'Type of good',
  kinds:[['pr','Private'],['cl','Club'],['cm','Common resource'],['pu','Public']],
  items:[
    ['A sandwich from a deli.','pr','You pay to get it (excludable), and once you eat it no one else can (rival).'],
    ['National defense (your course\'s example).','pu','No one in the country can be left out, and one person\'s protection doesn\'t reduce another\'s.'],
    ['Fish in the ocean (your course\'s example).','cm','No one can be kept from fishing, but every fish caught is one fewer for others.'],
    ['A streaming service that needs a paid login.','cl','Nonpayers are locked out, but one more viewer doesn\'t use up the show.'],
    ['A city park\'s open lawn, free and uncrowded.','pu','Anyone can walk in, and one more person doesn\'t reduce others\' enjoyment (until it gets crowded).'],
    ['Grass on a public pasture where anyone may graze cattle.','cm','Anyone can graze, but grass one cow eats is gone for the others: the original "commons."']
  ]});

/* L36 widget: concentration with and without a merger (your course textbook's markets, §11.1).
   TEST NOTE (2026-11-19), expected (checked by script): windshields → CR4 40, HHI 744; merged → CR4 46, HHI 1,064. Five 20% firms → 80, 2,000; merged → 100, 2,800.
   77% + 23 × 1% → 80, 5,952; merged → 81, 6,106. 100 × 1% → 4, 100; merged → 5, 102. Monopoly → 100, 10,000 (no merger possible). */
W.hhi = el => {
  const MK = { ws:['Windshield repair (textbook, 18 firms)', WS], five:['Five equal firms (textbook)', [20,20,20,20,20]], giant:['One giant and 23 small firms (textbook)', [77, ...Array(23).fill(1)]], many:['100 tiny firms (textbook)', Array(100).fill(1)], mono:['Monopoly (textbook)', [100]] };
  el.innerHTML = `<p class="widget-title">Measure the market</p><p class="hint">Pick one of your course textbook\'s markets, then merge its two largest firms and compare the two measures.</p>
  <div class="seg" role="group" aria-label="Market">${Object.entries(MK).map(([k,[t]])=>`<button data-k="${k}" aria-pressed="${k==='ws'}">${t}</button>`).join('')}</div>
  <label class="small" style="display:block;margin:.6rem 0"><input type="checkbox" class="hh-m"> Merge the two largest firms</label>
  <div class="hh-g"></div>
  <div class="readout"><div><b class="hh-c"></b><span>four-firm concentration ratio</span></div><div><b class="hh-h"></b><span>HHI</span></div><div><b class="hh-z"></b><span>1980s FTC guideline (for a merger)</span></div></div>
  <div class="msg"></div>`;
  let cur = 'ws';
  const draw = () => {
    const base = MK[cur][1], canMerge = base.length > 1, m = $('.hh-m', el); m.disabled = !canMerge; if(!canMerge) m.checked = false;
    const sh = m.checked ? mergeTop2(base) : [...base].sort((a,b)=>b-a), c = cr4(sh), h = hhiOf(sh), c0 = cr4(base), h0 = hhiOf(base);
    const shown = sh.slice(0,10);
    $('.hh-g', el).innerHTML = `<div class="qg" style="max-width:420px">${ubars(shown, { labels:shown.map((_,i)=>String(i+1)), ylab:'Market share (%)', xlab: sh.length>10 ? `Largest 10 of ${sh.length} firms` : 'Firm', ymax:100, colorOf:(v,i)=> i<4 ? 'var(--accent)' : 'var(--line)' })}</div>`;
    $('.hh-c', el).textContent = c; $('.hh-h', el).textContent = h.toLocaleString('en-US'); $('.hh-z', el).textContent = m.checked ? hhiZone(h) : 'applies only to a merger';
    $('.msg', el).innerHTML = (cur==='mono' ? 'One firm with 100%: the HHI hits its maximum, 100² = 10,000.' : m.checked
      ? `Merging the two largest firms raised the ratio from ${c0} to <b>${c}</b> and the HHI from ${h0.toLocaleString('en-US')} to <b>${h.toLocaleString('en-US')}</b> (a rise of ${(h-h0).toLocaleString('en-US')}).`
      : `Green bars are the four largest firms; their shares add to the ratio, ${c}. The HHI squares every firm\'s share, so a few big firms push it up fast.`);
  };
  $$('.seg button', el).forEach(b => b.onclick = () => { cur = b.dataset.k; $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', String(x===b))); draw(); });
  $('.hh-m', el).addEventListener('change', draw); draw();
};

/* L36 exam skill: which policy fits? Made-up scenarios unless marked.
   TEST NOTE (2026-11-19): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.polsort = el => sorterWidget(el, { title:'Which policy fits?', hint:'Ask what causes the market power: an agreement or merger (antitrust), a natural monopoly (regulate the price), or being better (usually legal).', aria:'Policy',
  kinds:[['anti','Antitrust action'],['reg','Regulate the price'],['ok','Legal: no action needed']],
  items:[
    ['A city\'s water is supplied by one company through one set of pipes.','reg','A second set of pipes would raise average cost: a natural monopoly, so regulate its price.'],
    ['Vitamin makers secretly agree on prices and which customers each will serve (textbook).','anti','A cartel fixing prices and dividing customers is illegal under the Sherman Act.'],
    ['The two largest of three cement makers plan to merge, leaving one dominant firm.','anti','A merger that would substantially lessen competition can be blocked under the Clayton Act.'],
    ['A bakery wins most of its town\'s customers by making better bread at a lower price.','ok','A large share won by being better is not illegal: monopoly itself is not a violation.'],
    ['A drug company sells a new medicine it holds a patent on, and no one else may make it.','ok','A patent is a legal source of monopoly; the law rewards innovation for a time.'],
    ['One electricity company delivers power over the only wires in a region.','reg','Duplicating the wires would raise costs; regulators set the price instead.']
  ]});

/* L37 widget: build a Lorenz curve (your course textbook's 1980 and 2013 quintiles, perfect equality, and a made-up very unequal country).
   Gini estimated from the five points by the trapezoid rule. TEST NOTE (2026-11-19), expected (checked by script):
   equality → points 20, 40, 60, 80, 100, Gini 0; 1980 → 4.2, 14.4, 31.2, 55.9, 100, Gini ≈ 0.377; 2013 → 3.2, 11.6, 26.0, 49.0, 100, Gini ≈ 0.441; made-up 1, 4, 10, 20, 65 → 1, 5, 15, 35, 100, Gini ≈ 0.576. */
W.lorenz = el => {
  const SETS = { eq:['Perfect equality',[20,20,20,20,20]], y80:['U.S. 1980 (textbook)',Q80], y13:['U.S. 2013 (textbook)',Q13], mu:['Made-up: very unequal',[1,4,10,20,65]] };
  el.innerHTML = `<p class="widget-title">Build a Lorenz curve</p><p class="hint">Pick a distribution. The table turns each quintile\'s share into a cumulative share; those are the points of the curve.</p>
  <div class="seg" role="group" aria-label="Distribution">${Object.entries(SETS).map(([k,[t]])=>`<button data-k="${k}" aria-pressed="${k==='y13'}">${t}</button>`).join('')}</div>
  <label class="small" style="display:block;margin:.6rem 0"><input type="checkbox" class="lz-a" checked> Shade area A (between the line of equality and the curve)</label>
  <div class="lz-t"></div><div class="lz-g"></div>
  <div class="readout"><div><b class="lz-b"></b><span>income share of the bottom 40%</span></div><div><b class="lz-q"></b><span>income share of the top 20%</span></div><div><b class="lz-gi"></b><span>Gini (estimate from five points)</span></div></div>
  <div class="msg"></div>`;
  let cur = 'y13';
  const draw = () => {
    const [t, sh] = SETS[cur], cum = cumOf(sh), g = giniQ(sh), shade = $('.lz-a', el).checked && g > 0;
    $('.lz-t', el).innerHTML = atable(['Quintile','Share','Cumulative'], sh.map((s,i)=>[i+1, s+'%', `<b>${cum[i]}%</b>`]), { cls:'u7t compact' });
    $('.lz-g', el).innerHTML = u7lorenz([{sh, label:t, c:'var(--bad)'}], { shade, ab:shade, aria:`Lorenz curve: ${t}` });
    $('.lz-b', el).textContent = cum[1] + '%'; $('.lz-q', el).textContent = sh[4] + '%'; $('.lz-gi', el).textContent = g.toFixed(2);
    $('.msg', el).innerHTML = g === 0 ? 'Every fifth gets 20%, so the curve is the diagonal itself: area A is zero and the Gini is 0.'
      : `The bottom 40% get ${cum[1]}% instead of 40%, and the richest fifth gets ${sh[4]}% instead of 20%. The curve sags below the diagonal; area A divided by the whole triangle gives a Gini of about <b>${g.toFixed(2)}</b>.`;
  };
  $$('.seg button', el).forEach(b => b.onclick = () => { cur = b.dataset.k; $$('.seg button', el).forEach(x=>x.setAttribute('aria-pressed', String(x===b))); draw(); });
  $('.lz-a', el).addEventListener('change', draw); draw();
};

/* L37 widget: a negative income tax (Econlib's $10,000 threshold), with an adjustable rate.
   Payment = rate × (10,000 − earned) when earned < 10,000; total = earned + payment.
   TEST NOTE (2026-11-19), expected (checked by script): 25%: earned $0 → pay $2,500, total $2,500; $8,000 → $500, $8,500; 50%: $0 → $5,000; $4,000 → $3,000, $7,000;
   100%: $0 → $10,000, total $10,000; $6,000 → $4,000, total $10,000 (keeps $0 of each extra dollar: the poverty trap). */
W.nit = el => {
  el.innerHTML = `<p class="widget-title">A negative income tax</p><p class="hint">Econlib\'s example: below a $10,000 threshold, a family receives the negative tax rate times the gap. Set the rate and the family\'s earnings.</p>
  <div class="slider"><label for="nt-r">Negative tax rate</label><input id="nt-r" type="range" min="25" max="100" step="25" value="25"><output></output></div>
  <div class="slider"><label for="nt-e">Family\'s earnings</label><input id="nt-e" type="range" min="0" max="12000" step="1000" value="8000"><output></output></div>
  <div class="nt-g"></div>
  <div class="readout"><div><b class="nt-p"></b><span>payment from the tax system</span></div><div><b class="nt-t"></b><span>total income</span></div><div><b class="nt-k"></b><span>kept from each extra $1 earned</span></div></div>
  <div class="msg"></div>`;
  const R = $('#nt-r', el), E = $('#nt-e', el), T = 10000;
  const draw = () => {
    const r = +R.value/100, e = +E.value, pay = e < T ? r*(T-e) : 0, tot = e + pay; R.nextElementSibling.textContent = Math.round(r*100)+'%'; E.nextElementSibling.textContent = usd7(e);
    $('.nt-g', el).innerHTML = `<div class="u2row"><div class="u2cell">${hbars([['Earnings',e,'var(--accent)'],['Payment',pay,'var(--g2)'],['Total income',tot,'var(--ink)']], { max:13000, left:120, fmt:x=>usd7(x) })}</div></div>`;
    $('.nt-p', el).textContent = usd7(pay); $('.nt-t', el).textContent = usd7(tot); $('.nt-k', el).textContent = e < T ? usd7(1-r) : '$1';
    $('.msg', el).innerHTML = (r===1 ? `At 100%, each $1 earned cuts the payment by $1, so total income stays at ${usd7(T)} until earnings pass the threshold: the <b>poverty trap</b>.` : `A family with no earnings gets ${usd7(r*T)}. Each extra $1 earned cuts the payment by only ${usd7(r)}, so working more raises total income.`) + (e >= T ? ' Earnings are at or above the threshold, so no payment.' : '');
  };
  R.addEventListener('input', draw); E.addEventListener('input', draw); draw();
};

/* L37 exam skill: does the change make the Lorenz curve move away from the line of equality (Gini up), toward it (Gini down), or neither?
   TEST NOTE (2026-11-19): each item clicked with its right and a wrong choice: feedback shows the right answer and reason; score text counts correctly. */
W.lorsort = el => sorterWidget(el, { title:'Which way does the Lorenz curve move?', hint:'Made-up changes. Ask whether the poorer groups\' share of total income rises or falls.', aria:'Lorenz curve change',
  kinds:[['away','Away from the line (Gini up)'],['toward','Toward the line (Gini down)'],['none','No change']],
  items:[
    ['The richest fifth\'s share of income rises from 44% to 51% (as in your textbook from 1980 to 2013).','away','More income at the top means the poorer groups\' cumulative shares fall, so the curve sags further.'],
    ['Every household\'s income rises by exactly 10%.','none','Everyone\'s share of the total stays the same, so the Lorenz curve doesn\'t move.'],
    ['A transfer program moves income from the top fifth to the bottom fifth.','toward','The bottom\'s share rises and the top\'s falls, so the curve moves toward equality.'],
    ['The incomes of the top 1% double while everyone else\'s are unchanged.','away','The top\'s share grows, so every cumulative point for poorer groups falls.'],
    ['Wages of the lowest-paid workers rise faster than everyone else\'s.','toward','The poorest groups\' shares grow, lifting the curve toward the diagonal.'],
    ['Prices of all goods double, and every income doubles too.','none','Shares of total income are unchanged; inequality measures don\'t move.']
  ]});
