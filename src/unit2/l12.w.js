/* TEST NOTE (2026-10-22): all three cases pass through the course's sock equilibrium ($5, 300). Curves are made-up.
   Equal: D P = 6.5 − Q/200, S P = 3.5 + Q/200 → $1 tax: buyers $5.50, sellers $4.50, Q 200, revenue $200, CS $100, PS $100, DWL $50 (matches course + lesson table).
   Inelastic demand: D P = 11 − Q/50 → $1 tax: buyers $5.80, sellers $4.80, Q 260, revenue $260, DWL $20 (buyers bear 80%).
   Inelastic supply: S P = −1 + Q/50 (zero price below 50 pairs) → $1 tax: buyers $5.20, sellers $4.20, Q 260, revenue $260, DWL $20 (sellers bear 80%).
   Checked by hand: totals before = CS + PS + revenue + DWL after for each case. Tax $0 shows the equilibrium with no wedge. */
W.taxlab = el => {
  const CASES = {
    eq:{t:'Equal elasticity (your course)', a:6.5, b:1/200, c:3.5, d:1/200, ymax:8},
    id:{t:'Inelastic demand', a:11, b:1/50, c:3.5, d:1/200, ymax:12},
    is:{t:'Inelastic supply', a:6.5, b:1/200, c:-1, d:1/50, ymax:8}
  };
  let k='eq';
  el.innerHTML = `<p class="widget-title">Tax lab: the sock market</p><p class="hint">Made-up curves through your course's equilibrium ($5, 300 pairs). Pick the elasticity, then move the tax.</p>
  <div class="seg tx-c" role="group" aria-label="Elasticity">${Object.entries(CASES).map(([key,v])=>`<button data-k="${key}" aria-pressed="${key==='eq'}">${v.t}</button>`).join('')}</div>
  <div class="slider"><label for="tx-t">Tax per pair</label><input id="tx-t" type="range" min="0" max="2" step="0.25" value="1"><output></output></div>
  <div class="svgbox"><svg viewBox="0 0 380 250" width="100%" role="img" aria-label="Sock market with a tax wedge, consumer surplus, producer surplus, tax revenue and deadweight loss"></svg></div>
  <div class="readout"><div><b class="tx-pb"></b><span>buyers pay</span></div><div><b class="tx-ps"></b><span>sellers keep</span></div><div><b class="tx-q"></b><span>pairs sold</span></div></div>
  <div class="readout"><div><b class="tx-rev"></b><span>tax revenue</span></div><div><b class="tx-dwl"></b><span>deadweight loss</span></div><div><b class="tx-cs"></b><span>CS / PS</span></div></div>
  <p class="small muted">Shading: consumer surplus (top), tax revenue (middle band), producer surplus (bottom), deadweight loss (red triangle).</p>
  <div class="msg"></div>`;
  const svg=$('svg',el), T=$('#tx-t',el);
  const d2 = x => '$'+x.toFixed(2), d0 = x => '$'+Math.round(x).toLocaleString('en-US');
  const solve = (C,t) => {
    const Q=(C.a-C.c-t)/(C.b+C.d), pb=C.a-C.b*Q, ps=pb-t, q0=Math.max(0,-C.c/C.d);
    const supInt = q => q<=q0 ? 0 : 0.5*C.d*(q-q0)*(q-q0) + (C.c>0 ? C.c*q : 0);
    const cs=0.5*Q*(C.a-pb), psur=ps*Q-supInt(Q);
    return {Q,pb,ps,cs,psur,rev:t*Q,q0};
  };
  const draw = () => {
    const C=CASES[k], t=+T.value; T.nextElementSibling.textContent=d2(t);
    const e=solve(C,0), r=solve(C,t), dwl=(e.cs+e.psur)-(r.cs+r.psur+r.rev);
    svg.innerHTML='';
    const x0=46,y0=210,w=310,h=180, X=v=>x0+w*v/600, Y=v=>y0-h*v/C.ymax;
    axes(svg,{x0,y0,w,h,xmax:600,ymax:C.ymax,xlab:'Pairs of socks',ylab:'Price ($)',xt:[0,200,300,600],yt:C.ymax===12?[0,5,10]:[0,4,8]});
    const poly=(pts,fill,stroke)=>svgEl('polygon',{points:pts.map(([q,p])=>X(q).toFixed(1)+','+Y(p).toFixed(1)).join(' '),fill,stroke:stroke||'none','stroke-width':1,opacity:0.9},svg);
    if(t>0){
      poly([[0,C.a],[0,r.pb],[r.Q,r.pb]],'var(--accent-soft)');
      poly([[0,r.pb],[r.Q,r.pb],[r.Q,r.ps],[0,r.ps]],'var(--surface-2)','var(--muted)');
      const sQ=C.c+C.d*r.Q; poly(C.c<0?[[0,r.ps],[r.Q,r.ps],[r.Q,sQ],[r.q0,0],[0,0]]:[[0,r.ps],[r.Q,r.ps],[r.Q,sQ],[0,C.c]],'var(--ok-soft)');
      poly([[r.Q,r.pb],[e.Q,e.pb],[r.Q,r.ps]],'var(--bad-soft)','var(--bad)');
    } else {
      poly([[0,C.a],[0,e.pb],[e.Q,e.pb]],'var(--accent-soft)');
      poly(C.c<0?[[0,e.pb],[e.Q,e.pb],[e.q0,0],[0,0]]:[[0,e.pb],[e.Q,e.pb],[0,C.c]],'var(--ok-soft)');
    }
    const dq0=Math.max(0,(C.a-C.ymax)/C.b), dq1=Math.min(600,C.a/C.b);
    svgEl('line',{x1:X(dq0),y1:Y(C.a-C.b*dq0),x2:X(dq1),y2:Y(C.a-C.b*dq1),stroke:'var(--accent)','stroke-width':2.6},svg);
    const sq0=C.c<0?r.q0:0, sq1=Math.min(600,(C.ymax-C.c)/C.d);
    svgEl('line',{x1:X(sq0),y1:Y(Math.max(0,C.c+C.d*sq0)),x2:X(sq1),y2:Y(C.c+C.d*sq1),stroke:'var(--g1)','stroke-width':2.6},svg);
    if(C.c<0) svgEl('line',{x1:X(0),y1:Y(0),x2:X(r.q0),y2:Y(0),stroke:'var(--g1)','stroke-width':2.6},svg);
    wlabel(svg, X(dq1)-4, Y(C.a-C.b*dq1)-8, 'D', 'var(--accent)', 'end');
    wlabel(svg, X(sq1)-8, Y(C.c+C.d*sq1)+14, 'S', 'var(--g1)', 'end');
    svgEl('circle',{cx:X(e.Q),cy:Y(e.pb),r:4.5,fill:'var(--ink)'},svg);
    $('.tx-pb',el).textContent=d2(r.pb); $('.tx-ps',el).textContent=d2(r.ps); $('.tx-q',el).textContent=Math.round(r.Q);
    $('.tx-rev',el).textContent=d0(r.rev); $('.tx-dwl',el).textContent=d0(dwl); $('.tx-cs',el).textContent=`${d0(r.cs)} / ${d0(r.psur)}`;
    const m=$('.msg',el);
    if(t===0){ m.innerHTML=`No tax: buyers and sellers both face $5.00 and 300 pairs sell. Total surplus is ${d0(e.cs+e.psur)}, the most this market can produce.`; return; }
    const bb=r.pb-5, sb=5-r.ps, pct=Math.round(100*bb/t);
    const who = k==='eq' ? 'The two sides are equally elastic, so they split it evenly.' : k==='id' ? 'Demand is the inelastic side: buyers keep buying, so they bear most of it.' : 'Supply is the inelastic side: sellers can\'t cut back, so they bear most of it.';
    m.innerHTML = `Buyers bear <b>${d2(bb)}</b> (${pct}%) and sellers <b>${d2(sb)}</b> (${100-pct}%) of the ${d2(t)} tax. ${who} Total surplus falls from ${d0(e.cs+e.psur)} to ${d0(r.cs+r.psur+r.rev)} counting revenue; the ${d0(dwl)} gap is deadweight loss.`;
  };
  $$('.tx-c button',el).forEach(b=>b.onclick=()=>{ k=b.dataset.k; $$('.tx-c button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(); });
  T.addEventListener('input',draw); draw();
};

/* TEST NOTE (2026-10-22): 8 items checked against textbook §5.3 (cigarettes, beachfront hotels, short-run energy), course video 2.4 (equal elasticities; who pays doesn't matter);
   parking spaces, insulin, one bottled-water brand and a tax collected from buyers are made-up applications of the same rule. */
W.burden = el => sorterWidget(el, {
  title:'Who bears more of the tax?', hint:'Find the more inelastic side: which one has fewer alternatives? Who writes the check doesn\'t matter.', aria:'Bears more',
  kinds:[['B','Buyers'],['S','Sellers'],['E','About equal']],
  items:[
    ['A tax on cigarettes, where regular smokers barely cut back when prices rise.','B','Inelastic demand: smokers can\'t easily escape, so most of the tax shows up as a higher price (your course textbook).'],
    ['A tax on beachfront hotel rooms; the hotels can\'t move, and tourists can vacation elsewhere.','S','Inelastic supply: owners have no alternative but to accept a lower price (your course textbook).'],
    ['A tax on insulin, which patients need whatever the price, made by many producers who could make other drugs.','B','Demand is very inelastic and supply is more elastic, so buyers bear most of it.'],
    ['A tax on one brand of bottled water, sold next to many similar brands.','S','Buyers switch brands easily (elastic demand), so the price can\'t rise much; the seller absorbs most of the tax.'],
    ['A tax on downtown parking spaces; the number of spaces is fixed, and drivers can take the bus.','S','A fixed number of spaces is perfectly inelastic supply, so owners bear most of the tax.'],
    ['A $1 tax on socks, where demand and supply are equally elastic, as in your course\'s example.','E','Equal elasticities split the burden evenly: $0.50 each.'],
    ['A gasoline tax next week, before drivers can change cars or commutes; refiners can ship fuel to other states.','B','Short-run demand for gasoline is inelastic (your course textbook), and supply to one state is fairly elastic.'],
    ['The same cigarette tax, but now collected from smokers at the register instead of from sellers.','B','Who writes the check doesn\'t matter. Demand is still the inelastic side, so smokers still bear most of it.']
  ]
});
