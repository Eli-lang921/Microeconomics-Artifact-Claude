/* TEST NOTE (2026-10-22): presets from course video 2.2c. Magic Hat: income 45,000 → 50,000, quantity 5 → 9: 57.14% ÷ 10.53% = 5.43, normal, above 1.
   Pretzels: price of B 4 → 3, beer 100 → 120: 18.18% ÷ −28.57% = −0.64, complements. Custom: equal causes or empty inputs show a message (no NaN);
   |value| < 0.05 is reported as about zero (unrelated / income doesn't matter). */
W.xclass = el => {
  const PRE = { magic:{m:'inc',a1:45000,a2:50000,q1:5,q2:9,t:'Magic Hat (your course)'}, pretz:{m:'cross',a1:4,a2:3,q1:100,q2:120,t:'Pretzels and beer (your course)'} };
  let mode='inc';
  el.innerHTML = `<p class="widget-title">Income or cross-price elasticity</p><p class="hint">Pick an example or type your own. The sign decides the kind of good.</p>
  <div class="seg pre" role="group" aria-label="Examples">${Object.entries(PRE).map(([k,v],i)=>`<button data-k="${k}" aria-pressed="${i===0}">${v.t}</button>`).join('')}</div>
  <div class="seg modes" role="group" aria-label="Which elasticity" style="margin-top:8px"><button data-m="inc" aria-pressed="true">Income</button><button data-m="cross" aria-pressed="false">Cross-price</button></div>
  <div class="tbl-wrap"><table><thead><tr><th></th><th>Before</th><th>After</th></tr></thead><tbody>
    <tr><td class="xl-a">Income ($)</td><td><input class="inline-num" id="xc-a1" type="number" step="any" aria-label="Cause before"></td><td><input class="inline-num" id="xc-a2" type="number" step="any" aria-label="Cause after"></td></tr>
    <tr><td class="xl-q">Quantity demanded</td><td><input class="inline-num" id="xc-q1" type="number" step="any" min="0" aria-label="Quantity before"></td><td><input class="inline-num" id="xc-q2" type="number" step="any" min="0" aria-label="Quantity after"></td></tr></tbody></table></div>
  <div class="math xc-out"></div><div class="msg xc-msg"></div>`;
  const [A1,A2,Q1,Q2]=['#xc-a1','#xc-a2','#xc-q1','#xc-q2'].map(s=>$(s,el));
  const setMode = m => { mode=m; $$('.modes button',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m)); $('.xl-a',el).textContent = m==='inc' ? 'Income ($)' : 'Price of the other good, B ($)'; $('.xl-q',el).textContent = m==='inc' ? 'Quantity demanded' : 'Quantity of good A demanded'; draw(); };
  const load = k => { const v=PRE[k]; A1.value=v.a1; A2.value=v.a2; Q1.value=v.q1; Q2.value=v.q2; setMode(v.m); };
  const pc = x => (x*100).toFixed(2)+'%';
  const draw = () => {
    const a1=parseFloat(A1.value), a2=parseFloat(A2.value), q1=parseFloat(Q1.value), q2=parseFloat(Q2.value), out=$('.xc-out',el), msg=$('.xc-msg',el);
    if([a1,a2,q1,q2].some(x=>!isFinite(x)) || a1<=0 || a2<=0 || q1<0 || q2<0 || q1+q2===0){ out.textContent='Enter positive values for the cause and quantities of zero or more.'; msg.textContent=''; msg.className='msg xc-msg'; return; }
    if(a1===a2){ out.textContent=`The ${mode==='inc'?'income':'price of B'} didn't change, so there is nothing to divide by. Change one value.`; msg.textContent=''; msg.className='msg xc-msg'; return; }
    const dq=(q2-q1)/((q1+q2)/2), da=(a2-a1)/((a1+a2)/2), e=dq/da;
    out.innerHTML = `%Δ ${mode==='inc'?'quantity':'quantity of A'} = ${fmt(q2-q1)} ÷ ${fmt((q1+q2)/2)} = <b>${pc(dq)}</b><br>%Δ ${mode==='inc'?'income':'price of B'} = ${fmt(a2-a1)} ÷ ${fmt((a1+a2)/2)} = <b>${pc(da)}</b><br>${mode==='inc'?'Income':'Cross-price'} elasticity = <b>${e.toFixed(2)}</b>`;
    let s;
    if(Math.abs(e)<0.05) s = mode==='inc' ? 'About zero: demand barely responds to income.' : 'About zero: the goods are <b>unrelated</b>.';
    else if(mode==='inc') s = e<0 ? `Negative: an <b>inferior good</b>. Buyers purchase less as income rises.` : e>1 ? `Positive and above 1: a <b>normal good</b> whose purchases grow faster than income (luxury-like, "income elastic").` : `Positive and below 1: a <b>normal good</b> whose purchases grow more slowly than income (necessity-like).`;
    else s = e>0 ? `Positive: <b>substitutes</b>. When B's price moves, buyers switch toward or away from A in the same direction.` : `Negative: <b>complements</b>. A and B are used together, so A's quantity moves opposite to B's price.`;
    msg.className='msg xc-msg good'; msg.innerHTML = s;
  };
  $$('.pre button',el).forEach(b=>b.onclick=()=>{ $$('.pre button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); load(b.dataset.k); });
  $$('.modes button',el).forEach(b=>b.onclick=()=>setMode(b.dataset.m));
  [A1,A2,Q1,Q2].forEach(i=>i.addEventListener('input',()=>{ $$('.pre button',el).forEach(x=>x.setAttribute('aria-pressed','false')); draw(); }));
  load('magic');
};

/* TEST NOTE (2026-10-22): 8 items checked against textbook §5.4 and §3.2 (generic groceries, coffee/tea, gasoline/SUVs), Econlib (mass transit, Camry/Maxima), course video 2.2c (pretzels). */
W.relsort = el => sorterWidget(el, {
  title:'Name the relationship', hint:'What changed: income, or another good\'s price? Did quantity move with it or against it?', aria:'Relationship',
  kinds:[['N','Normal good'],['I','Inferior good'],['S','Substitutes'],['C','Complements'],['U','Unrelated']],
  items:[
    ['Incomes rise 8%, and purchases of generic-brand cereal fall 3%.','I','Income up, quantity down: negative income elasticity.'],
    ['Incomes rise 5%, and gym memberships rise 9%.','N','Income up, quantity up: positive (and above 1).'],
    ['The price of tea rises, and coffee sales rise.','S','Same direction: positive cross-price elasticity.'],
    ['The price of gasoline rises, and SUV sales fall.','C','Opposite directions: negative cross-price elasticity (used together).'],
    ['The price of pretzels falls, and beer sales rise.','C','Price down, quantity up: negative, as in your course\'s example.'],
    ['The price of Camrys rises, and demand for Maximas rises.','S','Same direction: substitutes (Econlib\'s example).'],
    ['The price of umbrellas rises, and sales of printer paper don\'t change.','U','No response: a cross-price elasticity near zero.'],
    ['A city\'s incomes rise, and bus ridership falls.','I','Income up, quantity down: Econlib calls urban mass transit a classic inferior good.']
  ]
});
