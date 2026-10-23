/* TEST NOTE (2026-10-22): orange market from course video 2.1b: Qd = 60 − 10P, Qs = 10P (matches the course schedule $0-$5).
   Base: P* $3, Q* 30. At $4: Qd 20, Qs 40 → surplus 20. At $2: Qd 40, Qs 20 → shortage 20. At $5: surplus 40; at $1: shortage 40.
   Frost (supply −20): P* $4, Q* 20. Cheaper apples (demand −20): P* $2, Q* 20. Both: P* $3, Q* 10 (course slide 31's point C).
   Demand +20: P* $4, Q* 40. Supply +20: P* $2, Q* 40. Quantities clamp at 0 (no negative amounts drawn or reported). */
W.eqlab = el => {
  const SH = { base:[0,0,'Your course\'s orange market before any change.'], frost:[0,-20,'<b>Frost in Florida:</b> growers can sell 20 fewer oranges at every price, so supply shifts left.'],
    apples:[-20,0,'<b>Apples get cheaper:</b> buyers switch, wanting 20 fewer oranges at every price, so demand shifts left.'],
    both:[-20,-20,'<b>Both at once:</b> supply and demand each shift left by 20. Quantity must fall; the price pulls cancel because the shifts are the same size.'],
    dup:[20,0,'<b>Demand rises</b> (made-up: oranges become trendy): 20 more wanted at every price.'], sup:[0,20,'<b>Supply rises</b> (made-up: a bumper crop): 20 more offered at every price.'] };
  let sh='base';
  el.innerHTML = `<p class="widget-title">The orange market</p><p class="hint">Your course's orange schedule (video 2.1b). Drag the price to see the shortage or surplus, then try a shift. Shift sizes are made-up.</p>
  <div class="slider"><label for="eq-p">Price of oranges</label><input id="eq-p" type="range" min="0.5" max="5.5" step="0.5" value="4"><output></output></div>
  <div class="seg shifts" role="group" aria-label="Shift a curve" style="margin-top:6px">${[['base','No change'],['frost','Frost'],['apples','Cheaper apples'],['both','Both'],['dup','Demand up'],['sup','Supply up']].map(([k,t])=>`<button data-k="${k}" aria-pressed="${k==='base'}">${t}</button>`).join('')}</div>
  <div class="svgbox" style="margin-top:8px"><svg viewBox="0 0 380 260" width="100%" role="img" aria-label="Supply and demand for oranges with the chosen price"></svg></div>
  <div class="readout"><div><b class="qd"></b><span>quantity demanded</span></div><div><b class="qs"></b><span>quantity supplied</span></div><div><b class="gap"></b><span class="gapl">gap</span></div><div><b class="eqv"></b><span>equilibrium</span></div></div>
  <div class="msg shm"></div><div class="msg pm"></div>`;
  const svg=$('svg',el), P=$('#eq-p',el);
  const x0=46,y0=220,w=310,h=200,xm=80,ym=6; const X=v=>x0+w*v/xm, Y=v=>y0-h*v/ym;
  const draw = () => {
    const [dD,dS,txt]=SH[sh], p=+P.value; P.nextElementSibling.textContent=money(p);
    const qd=Math.max(0,60-10*p+dD), qs=Math.max(0,10*p+dS);
    const pe=(60+dD-dS)/20, qe=10*pe+dS;
    svg.innerHTML='';
    axes(svg,{x0,y0,w,h,xmax:xm,ymax:ym,xlab:'Oranges',ylab:'Price ($)',xt:[0,20,40,60,80],yt:[0,1,2,3,4,5,6]});
    const line=(f,pa,pb)=>[[f(pa),pa],[f(pb),pb]];
    const dLine = d => { const pTop=Math.min(6,(60+d)/10); return line(pp=>60-10*pp+d, 0, pTop); };
    const sLine = s => { const pLow=Math.max(0,-s/10); return line(pp=>10*pp+s, pLow, 6); };
    if(sh!=='base'){ svgEl('path',{d:wpath(dLine(0),X,Y),fill:'none',stroke:'var(--muted)','stroke-width':1.5,'stroke-dasharray':'5 4'},svg); svgEl('path',{d:wpath(sLine(0),X,Y),fill:'none',stroke:'var(--muted)','stroke-width':1.5,'stroke-dasharray':'5 4'},svg); }
    svgEl('path',{d:wpath(dLine(dD),X,Y),fill:'none',stroke:'var(--accent)','stroke-width':3},svg);
    svgEl('path',{d:wpath(sLine(dS),X,Y),fill:'none',stroke:'var(--g1)','stroke-width':3},svg);
    wlabel(svg, X(Math.max(0,60+dD))+5, Y(0)-8, sh==='base'?'D':(dD?'D1':'D'), 'var(--accent)');
    wlabel(svg, X(Math.min(80,60+dS))+4, Y(6)+12, sh==='base'?'S':(dS?'S1':'S'), 'var(--g1)');
    const yp=Y(p); svgEl('line',{x1:X(0),x2:X(xm),y1:yp,y2:yp,stroke:'var(--g2)','stroke-width':2,'stroke-dasharray':'6 4'},svg);
    if(Math.abs(qd-qs)>1e-9){ svgEl('line',{x1:X(qd),x2:X(qs),y1:yp,y2:yp,stroke:qd>qs?'var(--bad)':'var(--g2)','stroke-width':5,opacity:.55},svg); }
    svgEl('circle',{cx:X(qd),cy:yp,r:5,fill:'var(--accent)'},svg); svgEl('circle',{cx:X(qs),cy:yp,r:5,fill:'var(--g1)'},svg);
    svgEl('circle',{cx:X(qe),cy:Y(pe),r:6,fill:'none',stroke:'var(--ink)','stroke-width':2},svg); wlabel(svg, X(qe)+9, Y(pe)+4, 'E');
    $('.qd',el).textContent=qd; $('.qs',el).textContent=qs; $('.gap',el).textContent=Math.abs(qd-qs);
    $('.gapl',el).textContent = qd>qs ? 'shortage' : qs>qd ? 'surplus' : 'no gap';
    $('.eqv',el).textContent=`${money(pe)}, ${qe}`;
    $('.shm',el).innerHTML = txt + (sh!=='base' ? ` New equilibrium: <b>${money(pe)} and ${qe} oranges</b> (was $3 and 30).` : '');
    const pm=$('.pm',el);
    if(qd>qs){ pm.className='msg bad pm'; pm.innerHTML=`At ${money(p)} buyers want ${qd} but sellers offer only ${qs}: a <b>shortage of ${qd-qs}</b>. Buyers compete and sellers raise prices, so the price is pushed <b>up</b> toward ${money(pe)}.`; }
    else if(qs>qd){ pm.className='msg bad pm'; pm.innerHTML=`At ${money(p)} sellers offer ${qs} but buyers want only ${qd}: a <b>surplus of ${qs-qd}</b>. Unsold oranges push sellers to cut prices, so the price is pushed <b>down</b> toward ${money(pe)}.`; }
    else { pm.className='msg good pm'; pm.innerHTML=`At ${money(p)} quantity demanded equals quantity supplied (${qd}). This is the equilibrium: no pressure to change.`; }
  };
  P.addEventListener('input',draw);
  $$('.shifts button',el).forEach(b=>b.onclick=()=>{ sh=b.dataset.k; $$('.shifts button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); draw(); });
  draw();
};

/* TEST NOTE (2026-10-22): 8 items. Single shifts follow the pattern table (demand: same direction; supply: opposite);
   double shifts: same-direction shifts make price ambiguous, opposite-direction shifts make quantity ambiguous (course video 2.1b). */
W.predict = el => sorterWidget(el, {
  title:'Predict the new equilibrium', hint:'Sort each event: which curve, which way? Then pick what happens to the equilibrium price and quantity.', aria:'Outcome',
  kinds:[['UU','Price up, quantity up'],['UD','Price up, quantity down'],['DU','Price down, quantity up'],['DD','Price down, quantity down'],['AMB','One of them can\'t be predicted']],
  items:[
    ['Movie tickets: incomes rise, and movies are a normal good.','UU','Demand shifts right; sliding up the supply curve raises both.'],
    ['Solar panels: a new method cuts production costs.','DU','Supply shifts right; sliding down the demand curve lowers the price and raises the quantity.'],
    ['Pizza: the price of cheese, a key input, jumps.','UD','Supply shifts left; price up, quantity down.'],
    ['Butter: the price of margarine, a substitute, falls.','DD','Buyers switch to margarine, so butter demand shifts left; both price and quantity fall.'],
    ['Avocados: a health trend raises demand while a new orchard region raises supply.','AMB','Both shifts raise quantity (certain). They pull the price in opposite directions, so price depends on which shift is bigger.'],
    ['Lumber: a housing boom raises demand while wildfires cut supply.','AMB','Both shifts raise the price (certain). Demand up raises quantity while supply down lowers it, so quantity is ambiguous.'],
    ['Taxi rides: several taxi companies close.','UD','Fewer sellers: supply shifts left. Price up, quantity down.'],
    ['TVs: shoppers expect big holiday discounts next month.','DD','Buyers wait, so demand today shifts left; price and quantity both fall now.']
  ]
});
