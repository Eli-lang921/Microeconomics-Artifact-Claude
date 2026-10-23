/* TEST NOTE (2026-10-22): presets from course video 2.2b. Salmon 11→12.10, 40→25: %ΔQ −46.15%, %ΔP 9.52%, E −4.85; TR $440 → $302.50 (−$137.50).
   Bread 3→3.30, 100→98: %ΔQ −2.02%, %ΔP 9.52%, E −0.21 (−0.212); TR $300 → $323.40 (+$23.40). Grocer supply 5→7, 1000→1250: 22.22%, 33.33%, 0.67.
   Custom input: blank, zero or equal prices show a message instead of NaN; quantities must be zero or more, prices above zero. */
W.elcalc = el => {
  const PRE = { salmon:{d:true,p1:11,p2:12.10,q1:40,q2:25,t:'Smoked salmon (your course)'}, bread:{d:true,p1:3,p2:3.30,q1:100,q2:98,t:'Bread (your course)'}, groc:{d:false,p1:5,p2:7,q1:1000,q2:1250,t:'Grocer\'s supply (your course)'} };
  let isD = true;
  el.innerHTML = `<p class="widget-title">Midpoint elasticity calculator</p><p class="hint">Start with your course's examples, then type your own numbers. Every step is shown.</p>
  <div class="seg pre" role="group" aria-label="Examples">${Object.entries(PRE).map(([k,v],i)=>`<button data-k="${k}" aria-pressed="${i===0}">${v.t}</button>`).join('')}<button data-k="own" aria-pressed="false">Your own</button></div>
  <div class="seg dside" role="group" aria-label="Demand or supply" style="margin-top:8px"><button data-d="1" aria-pressed="true">Demand</button><button data-d="0" aria-pressed="false">Supply</button></div>
  <div class="tbl-wrap"><table><thead><tr><th></th><th>Point A</th><th>Point B</th></tr></thead><tbody>
    <tr><td>Price ($)</td><td><input class="inline-num" id="ec-p1" type="number" step="0.01" min="0" aria-label="Price at A"></td><td><input class="inline-num" id="ec-p2" type="number" step="0.01" min="0" aria-label="Price at B"></td></tr>
    <tr><td>Quantity</td><td><input class="inline-num" id="ec-q1" type="number" step="1" min="0" aria-label="Quantity at A"></td><td><input class="inline-num" id="ec-q2" type="number" step="1" min="0" aria-label="Quantity at B"></td></tr></tbody></table></div>
  <div class="math ec-out"></div><div class="msg ec-msg"></div>`;
  const [P1,P2,Q1,Q2]=['#ec-p1','#ec-p2','#ec-q1','#ec-q2'].map(s=>$(s,el));
  const load = k => { const v=PRE[k]; isD=v.d; P1.value=v.p1; P2.value=v.p2.toFixed(2).replace(/\.00$/,''); Q1.value=v.q1; Q2.value=v.q2; $$('.dside button',el).forEach(b=>b.setAttribute('aria-pressed', (b.dataset.d==='1')===isD)); draw(); };
  const pct = x => (x*100).toFixed(2)+'%';
  const draw = () => {
    const p1=parseFloat(P1.value), p2=parseFloat(P2.value), q1=parseFloat(Q1.value), q2=parseFloat(Q2.value);
    const out=$('.ec-out',el), msg=$('.ec-msg',el);
    if([p1,p2,q1,q2].some(x=>!isFinite(x)) || p1<=0 || p2<=0 || q1<0 || q2<0 || (q1+q2)===0){ out.innerHTML='Enter two prices above zero and two quantities (zero or more).'; msg.className='msg ec-msg'; msg.textContent=''; return; }
    if(p1===p2){ out.innerHTML='The two prices are the same, so there is no price change to divide by. Change one of them.'; msg.className='msg ec-msg'; msg.textContent=''; return; }
    const dq=(q2-q1)/((q2+q1)/2), dp=(p2-p1)/((p2+p1)/2), e=dq/dp, a=Math.abs(e);
    out.innerHTML = `%Δ quantity = (${fmt(q2)} − ${fmt(q1)}) ÷ [(${fmt(q2)} + ${fmt(q1)}) ÷ 2] = ${fmt(q2-q1)} ÷ ${fmt((q1+q2)/2)} = <b>${pct(dq)}</b><br>%Δ price = (${fmt(p2)} − ${fmt(p1)}) ÷ [(${fmt(p2)} + ${fmt(p1)}) ÷ 2] = ${fmt(p2-p1)} ÷ ${fmt((p1+p2)/2)} = <b>${pct(dp)}</b><br>Elasticity = ${pct(dq)} ÷ ${pct(dp)} = <b>${e.toFixed(2)}</b>`;
    const cls = Math.abs(a-1)<0.005 ? 'unit elastic' : a>1 ? 'elastic' : 'inelastic';
    let s = isD ? `Read as ${a.toFixed(2)}: <b>${cls}</b> demand.` : `Price elasticity of supply ${e.toFixed(2)}: <b>${cls}</b> supply.`;
    if(isD && e>0) s += ' Note: quantity demanded moved the same way as price here, which breaks the law of demand. Check the numbers.';
    if(!isD && e<0) s += ' Note: quantity supplied moved opposite to price, which breaks the law of supply. Check the numbers.';
    if(isD){ const t1=p1*q1, t2=p2*q2; s += `<br>Total revenue: ${money(p1)} × ${fmt(q1)} = ${money(t1)} → ${money(p2)} × ${fmt(q2)} = ${money(t2)} (${t2-t1>=0?'+':'−'}${money(Math.abs(t2-t1))}). ` + (Math.abs(t2-t1)<0.005 ? 'Unchanged.' : ((t2>t1)===(p2>p1) ? 'Price and revenue moved the <b>same</b> way: the inelastic pattern.' : 'Price and revenue moved in <b>opposite</b> ways: the elastic pattern.')); }
    msg.className='msg ec-msg ' + (cls==='elastic'?'':'good'); msg.innerHTML=s;
  };
  $$('.pre button',el).forEach(b=>b.onclick=()=>{ $$('.pre button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); if(b.dataset.k==='own'){ P1.focus(); draw(); } else load(b.dataset.k); });
  $$('.dside button',el).forEach(b=>b.onclick=()=>{ isD = b.dataset.d==='1'; $$('.dside button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(); });
  [P1,P2,Q1,Q2].forEach(i=>i.addEventListener('input',()=>{ $$('.pre button',el).forEach(x=>x.setAttribute('aria-pressed',x.dataset.k==='own')); draw(); }));
  load('salmon');
};

/* TEST NOTE (2026-10-22): made-up demand Q = 100 − 10P. P $5: Q 50, TR $250 (maximum). P $7: TR $210; raising to $7.50 → TR $187.50, E 2.64 (elastic).
   P $2: TR $160; raising to $2.50 → TR $187.50, E 0.29 (inelastic). P $4.50 → $5: TR $247.50 → $250, E 0.90. P $5 → $5.50: TR $250 → $247.50, E 1.11.
   Slider limits $0.50-$9.50 keep Q above zero. Both panels redraw on input; the TR curve peaks at Q = 50. */
W.revenue = el => {
  el.innerHTML = `<p class="widget-title">Revenue along a straight demand curve</p><p class="hint">Made-up demand: quantity = 100 − 10 × price. Move the price and watch the revenue rectangle and the total revenue curve.</p>
  <div class="slider"><label for="rv-p">Price</label><input id="rv-p" type="range" min="0.5" max="9.5" step="0.5" value="7"><output></output></div>
  <div class="svgbox"><svg viewBox="0 0 380 400" width="100%" role="img" aria-label="Demand curve with a revenue rectangle, and total revenue against quantity"></svg></div>
  <div class="readout"><div><b class="rq"></b><span>quantity</span></div><div><b class="rtr"></b><span>total revenue</span></div><div><b class="re"></b><span>elasticity for a $0.50 rise</span></div></div>
  <div class="msg"></div>`;
  const svg=$('svg',el), P=$('#rv-p',el);
  const draw = () => {
    const p=+P.value, q=100-10*p, tr=p*q; P.nextElementSibling.textContent=money(p);
    const p2=p+0.5, q2=100-10*p2, tr2=p2*q2, e=Math.abs(((q2-q)/((q2+q)/2))/((p2-p)/((p2+p)/2)));
    svg.innerHTML='';
    /* top: demand */
    let x0=46,y0=170,w=310,h=150; let X=v=>x0+w*v/100, Y=v=>y0-h*v/10;
    axes(svg,{x0,y0,w,h,xmax:100,ymax:10,xlab:'Quantity',ylab:'Price ($)',xt:[0,25,50,75,100],yt:[0,5,10]});
    svgEl('rect',{x:X(0),y:Y(p),width:X(q)-X(0),height:Y(0)-Y(p),fill:'var(--accent-soft)',stroke:'var(--accent)','stroke-width':1},svg);
    svgEl('line',{x1:X(0),y1:Y(10),x2:X(100),y2:Y(0),stroke:'var(--accent)','stroke-width':3},svg);
    svgEl('circle',{cx:X(q),cy:Y(p),r:5.5,fill:'var(--g2)'},svg);
    wlabel(svg, X(q/2), Y(p/2)+4, `TR = ${money(tr)}`, 'var(--ink)', 'middle');
    wlabel(svg, X(50)+6, Y(5)-8, 'unit elastic', 'var(--muted)');
    svgEl('circle',{cx:X(50),cy:Y(5),r:3,fill:'var(--muted)'},svg);
    /* bottom: TR vs quantity */
    x0=46; y0=370; h=130; X=v=>x0+w*v/100; const Yt=v=>y0-h*v/260;
    axes(svg,{x0,y0,w,h,xmax:100,ymax:260,xlab:'Quantity',ylab:'Total revenue ($)',xt:[0,25,50,75,100],yt:[0,125,250]});
    let d=''; for(let i=0;i<=100;i++){ const qq=i, pp=(100-qq)/10; d+=(i?'L':'M')+X(qq).toFixed(1)+','+Yt(pp*qq).toFixed(1); }
    svgEl('path',{d,fill:'none',stroke:'var(--g1)','stroke-width':2.5},svg);
    svgEl('circle',{cx:X(q),cy:Yt(tr),r:5.5,fill:'var(--g2)'},svg);
    $('.rq',el).textContent=q; $('.rtr',el).textContent=money(tr); $('.re',el).textContent=e.toFixed(2);
    const m=$('.msg',el);
    m.innerHTML = p>5 ? `At ${money(p)} demand is <b>elastic</b> (${e.toFixed(2)} for a $0.50 rise). Raising the price to ${money(p2)} would <b>cut</b> revenue to ${money(tr2)}; cutting it would raise revenue, up to the $250 peak at $5.`
      : p<5 ? `At ${money(p)} demand is <b>inelastic</b> (${e.toFixed(2)} for a $0.50 rise). Raising the price to ${money(p2)} would <b>raise</b> revenue to ${money(tr2)}.`
      : `At $5 revenue is at its peak, $250. Demand is unit elastic here: a small price change either way lowers revenue slightly (to ${money(tr2)} at ${money(p2)}).`;
  };
  P.addEventListener('input',draw); draw();
};

/* TEST NOTE (2026-10-22): 8 items, answers from course video 2.2a (designer jeans, Kit Kat, medicine, peak rail tickets) and textbook §5.2-5.3
   (Table 5.2: rush-hour rail 0.15, restaurant meals 2.27; energy short run vs long run). */
W.elsort = el => sorterWidget(el, {
  title:'Elastic or inelastic demand?', hint:'Run the four determinants: substitutes, necessity or luxury, share of budget, time.', aria:'Demand is',
  kinds:[['EL','More elastic'],['IN','More inelastic']],
  items:[
    ['Insulin for a person with diabetes','IN','A necessity with no close substitute: buyers keep buying when the price rises.'],
    ['One brand of candy bar, like Kit Kat','EL','Many close substitutes on the same shelf (your course\'s example).'],
    ['Gasoline over the next week','IN','In the short run there are few ways to drive less (your course textbook).'],
    ['Gasoline over the next ten years','EL','With time, people buy efficient cars, move closer to work or switch to transit.'],
    ['Restaurant meals','EL','Not a necessity: you can cook at home. Your course textbook estimates 2.27.'],
    ['Salt','IN','A tiny share of the budget with few substitutes, so price changes barely register.'],
    ['Designer jeans','EL','A luxury, not a necessity (your course\'s example).'],
    ['Rush-hour train tickets for commuters','IN','Commuters need to get to work at that time; your course lists peak railroad tickets, and the textbook estimates 0.15.']
  ]
});
