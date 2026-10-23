/* TEST NOTE (2026-10-22): smooth (monotone) base demand passes through the course schedule ($7,10) ($6,12) ($5,13); base supply through ($5,10) ($6,12) ($7,13).
   Every demand event: right = +4 units at every price, left = −4 (made-up size); price change moves A($7,10) → B($5,13).
   Every supply event: right = +4, left = −4; price change moves A($5,10) → B($7,13). Directions checked against course video 2.1a and textbook §3.2. */
W.shifters = el => {
  /* smooth curves through the course's schedule points (monotone interpolation, quantity as a function of price) */
  const smooth = (ps, qs) => { const f = monotone(ps, qs); const out=[]; for(let p=ps[0]; p<=ps[ps.length-1]+1e-9; p+=0.1) out.push([f(p), round(p,2)]); return out; };
  const D0 = smooth([3,4,5,6,7,8,9],[15,14,13,12,10,8,6]), S0 = smooth([3,4,5,6,7,8,9],[6,8,10,12,13,14,15]);
  const EV = {
    demand:[
      ['inc-n','Income rises (lattes, a normal good)',4,'<b>Income, normal good.</b> With more money, buyers want more lattes at every price, like Sally after her raise. Demand shifts <b>right</b>.'],
      ['inc-i','Income rises (gas-station coffee, an inferior good)',-4,'<b>Income, inferior good.</b> With more money, buyers switch to something they prefer, so they want less at every price. Demand shifts <b>left</b>.'],
      ['comp','Price of hot dogs rises (market for buns, a complement)',-4,'<b>Price of a complement.</b> Pricier hot dogs mean fewer hot dogs eaten, so fewer buns are needed at every bun price. Demand for buns shifts <b>left</b>.'],
      ['sub','Price of hot dogs rises (market for hamburgers, a substitute)',4,'<b>Price of a substitute.</b> Buyers switch from pricier hot dogs to hamburgers, so they want more hamburgers at every price. Demand shifts <b>right</b>.'],
      ['taste','Summer arrives (market for flip-flops)',4,'<b>Tastes and preferences.</b> Warm weather makes flip-flops more appealing at every price. Demand shifts <b>right</b>.'],
      ['buyers','Laptops become popular and easy to use',4,'<b>Number of buyers.</b> More people in the market want laptops at every price. Demand shifts <b>right</b>.'],
      ['expect','A big holiday sale is announced for next month (TVs)',-4,'<b>Expectations.</b> Buyers expect a lower price soon, so they wait. Demand <b>today</b> shifts <b>left</b>.'],
      ['own','The good\'s own price falls from $7 to $5',0,'<b>The good\'s own price.</b> Nothing about buyers changed, so the curve stays put. Buyers slide <b>along</b> it from A to B: quantity demanded rises from 10 to 13 (your course\'s numbers).']
    ],
    supply:[
      ['input','Wood gets more expensive (market for tables)',-4,'<b>Price of inputs.</b> Each table costs more to make, so at every price firms offer fewer. Supply shifts <b>left</b>.'],
      ['tech','Robots speed up car factories',4,'<b>Technology.</b> Each car costs less to make, so at every price firms offer more. Supply shifts <b>right</b>.'],
      ['sellers','More firms enter the market',4,'<b>Number of sellers.</b> More sellers means more offered at every price. Supply shifts <b>right</b>.'],
      ['exp-p','Sellers expect a higher price for the good next month',-4,'<b>Expectations (price of the good).</b> Sellers hold some back to sell later at the better price. Supply <b>today</b> shifts <b>left</b>.'],
      ['exp-i','Sellers expect inputs to cost more next month',4,'<b>Expectations (price of inputs).</b> Producing now, while inputs are cheap, beats producing later. Supply <b>today</b> shifts <b>right</b>.'],
      ['nature','A drought hits the growing region (textbook)',-4,'<b>Natural conditions.</b> Bad weather cuts the harvest and raises the cost of each unit. Supply shifts <b>left</b>.'],
      ['subsidy','The government pays producers a subsidy per unit (textbook)',4,'<b>Government policy.</b> A subsidy lowers producers\' costs, so they offer more at every price. Supply shifts <b>right</b>. A tax would do the reverse.'],
      ['own','The good\'s own price rises from $5 to $7',0,'<b>The good\'s own price.</b> Sellers\' costs didn\'t change, so the curve stays put. Sellers slide <b>along</b> it from A to B: quantity supplied rises from 10 to 13 (your course\'s numbers).']
    ]
  };
  let side='demand', ev=null;
  el.innerHTML = `<p class="widget-title">Shift or slide? The shifter lab</p><p class="hint">Pick demand or supply, then tap an event. Made-up shift sizes; the curves pass through your course's schedules.</p>
  <div class="seg sides" role="group" aria-label="Which curve"><button data-s="demand" aria-pressed="true">Demand events</button><button data-s="supply" aria-pressed="false">Supply events</button></div>
  <div class="evs" style="display:grid;gap:6px;margin-top:10px"></div>
  <div class="svgbox" style="margin-top:10px"><svg viewBox="0 0 380 260" width="100%" role="img" aria-label="Demand or supply curve showing the chosen change"></svg></div>
  <div class="msg"></div>`;
  const svg=$('svg',el), evs=$('.evs',el), msg=$('.msg',el);
  const x0=46,y0=220,w=310,h=200,xm=20,ym=10; const X=v=>x0+w*v/xm, Y=v=>y0-h*v/ym;
  const drawButtons = () => {
    evs.innerHTML = EV[side].map(([k,t])=>`<button class="chipbtn" style="text-align:left;border-radius:8px" data-k="${k}" aria-pressed="${ev===k}">${t}</button>`).join('');
    $$('button',evs).forEach(b=>b.onclick=()=>{ ev=b.dataset.k; drawButtons(); draw(); });
  };
  const draw = () => {
    svg.innerHTML='';
    axes(svg,{x0,y0,w,h,xmax:xm,ymax:ym,xlab:'Quantity',ylab:'Price ($)',xt:[0,5,10,15,20],yt:[0,2,4,6,8,10]});
    const base = side==='demand' ? D0 : S0, name = side==='demand' ? 'D' : 'S';
    const e = ev ? EV[side].find(x=>x[0]===ev) : null;
    const shifted = e && e[2]!==0;
    svgEl('path',{d:wpath(base,X,Y),fill:'none',stroke: shifted?'var(--muted)':'var(--accent)','stroke-width':shifted?2:3,'stroke-dasharray':shifted?'5 4':''},svg);
    wlabel(svg, X(base[base.length-1][0])+6, Y(base[base.length-1][1])+4, shifted?name+'0':name, shifted?'var(--muted)':'var(--accent)');
    if(shifted){
      const nb = base.map(([q,p])=>[q+e[2],p]);
      svgEl('path',{d:wpath(nb,X,Y),fill:'none',stroke:'var(--accent)','stroke-width':3},svg);
      wlabel(svg, X(nb[nb.length-1][0])+6, Y(nb[nb.length-1][1])+4, name+'1', 'var(--accent)');
      const mid = base[Math.round(base.length/2)]; warrow(svg, X(mid[0])+(e[2]>0?6:-6), Y(mid[1])-14, X(mid[0]+e[2])+(e[2]>0?-6:6), Y(mid[1])-14, 'var(--g2)');
    }
    if(e && e[2]===0){
      const A = side==='demand' ? [10,7] : [10,5], B = side==='demand' ? [13,5] : [13,7];
      [[A,'A',-10,'end'],[B,'B',10,'start']].forEach(([[q,p],L,dx,anc])=>{ svgEl('circle',{cx:X(q),cy:Y(p),r:5.5,fill:'var(--g2)',stroke:'var(--surface)','stroke-width':2},svg); wlabel(svg, X(q)+dx, Y(p)+4, `${L} ($${p}, ${q})`, null, anc); });
      warrow(svg, X(A[0])+4, Y(A[1])+(side==='demand'?6:-6), X(B[0])-6, Y(B[1])+(side==='demand'?-4:4), 'var(--g2)');
    }
    msg.className = 'msg' + (e ? (e[2]===0?'':' good') : '');
    msg.innerHTML = e ? e[3] + (e[2]!==0 ? ` <span class="small muted">The dashed curve is where it started.</span>` : '') : `Tap an event above. Ask: is it the good's own price (slide along) or something else (shift)?`;
  };
  $$('.sides button',el).forEach(b=>b.onclick=()=>{ side=b.dataset.s; ev=null; $$('.sides button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); drawButtons(); draw(); });
  drawButtons(); draw();
};

/* TEST NOTE (2026-10-22): 8 items; answers checked against course video 2.1a and textbook §3.2
   (health study → tastes; own price → movement; drought → natural conditions; driving-age children → population;
   bread is a complement of peanut butter; steel → input; Honda/Ford substitutes; gasoline is the messenger company's input). */
W.shiftsort = el => sorterWidget(el, {
  title:'Shift or slide?', hint:'For each event, decide what happens in the market named. First ask: is it the good\'s own price?', aria:'What happens',
  kinds:[['DR','Demand right'],['DL','Demand left'],['SR','Supply right'],['SL','Supply left'],['MV','Move along']],
  items:[
    ['Coffee market: a major study finds coffee improves health.','DR','A change in tastes toward coffee: buyers want more at every price.'],
    ['Tablet market: the price of tablets falls.','MV','The good\'s own price changed, so buyers slide along the demand curve to a larger quantity demanded.'],
    ['Wheat market: a severe drought hits the main growing region.','SL','A natural condition that cuts output at every price.'],
    ['Car insurance market: more families now have teenagers of driving age.','DR','A change in the makeup of the population adds buyers. Your course textbook uses this example.'],
    ['Peanut butter market: the price of bread rises.','DL','Bread and peanut butter are complements. Pricier bread means fewer sandwiches, so less peanut butter is wanted at every price.'],
    ['Car market: the price of steel falls.','SR','Steel is an input. Cheaper inputs lower costs, so carmakers offer more at every price.'],
    ['Ford market: the price of Hondas falls.','DL','Hondas and Fords are substitutes. Cheaper Hondas pull buyers away from Fords.'],
    ['Delivery-service market: the price of gasoline falls.','SR','Gasoline is the delivery company\'s main input, so its cost falls and it can serve more at every price (your course textbook\'s messenger example).']
  ]
});
