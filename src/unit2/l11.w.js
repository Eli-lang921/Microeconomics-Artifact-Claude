/* TEST NOTE (2026-10-22): buyers' values $5.00 and $2.00 and vendors' minimums $2.00 (C), $2.75 (B), $3.00 (A) are from course video 2.3;
   buyers at $4.00, $3.50, $1.00 and sellers D $4.50, E $5.50 are made-up. Quantity traded = the smaller of buyers willing and sellers willing
   (the short side); the highest-value buyers and lowest-cost sellers are assumed to trade. Checked by hand:
   $3.00 to $3.50 → 3 bottles, total surplus $4.75 (max). $2.50 → 1 bottle (shortage), CS $2.50, PS $0.50, TS $3.00.
   $4.00 → 2 bottles (excess supply), TS $4.25. "Force a 4th sale" adds the $2.00 buyer and the $4.50 seller: TS always $2.25 ($2.50 lost);
   that buyer or seller can show a negative surplus, which is the point. */
W.surplus = el => {
  const B=[5,4,3.5,2,1], C=[2,2.75,3,4.5,5.5];
  const CN=['C*','B*','A*','D','E'], d2 = x => (x<0?'−':'')+'$'+Math.abs(x).toFixed(2);
  el.innerHTML = `<p class="widget-title">Surplus at the concert</p><p class="hint">Five fans, five vendors, one bottle each. In each pair of bars, the left one is the fan's consumer surplus (same color as demand) and the right one is the vendor's producer surplus (same color as supply).</p>
  <div class="slider"><label for="su-p">Price</label><input id="su-p" type="range" min="1" max="6" step="0.25" value="2.5"><output></output></div>
  <div class="seg" role="group" aria-label="Quantity"><button class="su-f" aria-pressed="false">Force a 4th sale</button></div>
  <div class="svgbox"><svg viewBox="0 0 380 250" width="100%" role="img" aria-label="Step demand and supply curves with the price line and surplus bars"></svg></div>
  <div class="readout"><div><b class="su-q"></b><span>bottles sold</span></div><div><b class="su-cs"></b><span>consumer surplus</span></div><div><b class="su-ps"></b><span>producer surplus</span></div><div><b class="su-ts"></b><span>total surplus</span></div></div>
  <div class="tbl-wrap su-tbl"></div><div class="msg"></div>`;
  const svg=$('svg',el), P=$('#su-p',el), F=$('.su-f',el); let force=false;
  const draw = () => {
    const p=+P.value; P.nextElementSibling.textContent=money(p);
    const nb=B.filter(v=>v>=p).length, ns=C.filter(c=>c<=p).length, qm=Math.min(nb,ns), q=force?4:qm;
    let cs=0, ps=0; for(let i=0;i<q;i++){ cs+=B[i]-p; ps+=p-C[i]; } const ts=cs+ps;
    svg.innerHTML='';
    const x0=46,y0=210,w=310,h=180, X=v=>x0+w*v/5, Y=v=>y0-h*v/6;
    axes(svg,{x0,y0,w,h,xmax:5,ymax:6,xlab:'Bottles',ylab:'Dollars',xt:[0,1,2,3,4,5],yt:[0,2,4,6]});
    for(let i=0;i<q;i++){
      const bw=(X(1)-X(0))*0.42;
      const cy1=Math.min(Y(B[i]),Y(p)), ch=Math.abs(Y(B[i])-Y(p)); if(ch>0.5) svgEl('rect',{x:X(i)+3,y:cy1,width:bw,height:ch,fill:B[i]>=p?'var(--accent-soft)':'var(--bad-soft)',stroke:B[i]>=p?'var(--accent)':'var(--bad)','stroke-width':1},svg);
      const py1=Math.min(Y(C[i]),Y(p)), ph=Math.abs(Y(C[i])-Y(p)); if(ph>0.5) svgEl('rect',{x:X(i)+3+bw+2,y:py1,width:bw,height:ph,fill:C[i]<=p?'var(--surface-2)':'var(--bad-soft)',stroke:C[i]<=p?'var(--g1)':'var(--bad)','stroke-width':1},svg);
    }
    const step = arr => 'M'+arr.map((v,i)=>`${X(i).toFixed(1)},${Y(v).toFixed(1)} L${X(i+1).toFixed(1)},${Y(v).toFixed(1)}`).join(' L');
    svgEl('path',{d:step(B),fill:'none',stroke:'var(--accent)','stroke-width':2.5},svg);
    svgEl('path',{d:step(C),fill:'none',stroke:'var(--g1)','stroke-width':2.5},svg);
    svgEl('line',{x1:X(0),x2:X(5),y1:Y(p),y2:Y(p),stroke:'var(--muted)','stroke-width':1.6,'stroke-dasharray':'5 4'},svg);
    wlabel(svg, X(5)-2, Y(B[4])+15, 'D (values)', 'var(--accent)', 'end');
    wlabel(svg, X(5)-2, Y(C[4])-6, 'S (costs)', 'var(--g1)', 'end');
    wlabel(svg, X(5)-2, p>=4.9 ? Y(p)+14 : Y(p)-5, `price ${money(p)}`, 'var(--muted)', 'end');
    $('.su-q',el).textContent=q; $('.su-cs',el).textContent=d2(cs); $('.su-ps',el).textContent=d2(ps); $('.su-ts',el).textContent=d2(ts);
    const rows=[]; for(let i=0;i<5;i++){ rows.push([d2(B[i])+([0,3].includes(i)?'*':''), `${CN[i]} ${d2(C[i])}`, i<q?d2(B[i]-p):'no sale', i<q?d2(p-C[i]):'no sale']); }
    $('.su-tbl',el).innerHTML = table(['Fan values','Vendor needs','CS','PS'], rows) + '<p class="small muted">* from your course; the rest are made-up.</p>';
    const m=$('.msg',el);
    if(force) m.innerHTML = `Forced 4th sale: the $2.00 fan values it at $2.00, but the cheapest remaining vendor needs $4.50. That bottle <b>destroys $2.50</b> of surplus, so total surplus falls to ${d2(ts)} at any price. Red bars show who loses on it.`;
    else if(q===3) m.innerHTML = `Equilibrium: 3 bottles, total surplus <b>${d2(ts)}</b>, the most possible. Every bottle worth more to a fan than it costs a vendor is sold. Move the price within $3.00 to $3.50: the total stays ${d2(ts)}; only the split changes.`;
    else if(nb>ns) m.innerHTML = `Shortage: ${nb} fans want water but only ${ns} vendor${ns===1?'':'s'} will sell at ${money(p)}. ${3-q} bottle${3-q===1?' that is':'s that are'} worth more than ${3-q===1?'it costs':'they cost'} go unsold, so total surplus is only ${d2(ts)}.`;
    else m.innerHTML = `Excess supply: ${ns} vendors will sell but only ${nb} fan${nb===1?'':'s'} will buy at ${money(p)}. Total surplus is only ${d2(ts)}, below the $4.75 at equilibrium.`;
  };
  F.onclick=()=>{ force=!force; F.setAttribute('aria-pressed',force); draw(); };
  P.addEventListener('input',draw); draw();
};

/* TEST NOTE (2026-10-22): graph D: P = 10 − Q, S: P = 1 + Q/2, equilibrium Q 6, P $4 (made-up, same as practice l11-gr-ps).
   W = CS (½·6·6 = $18), X = PS (½·6·3 = $9), Y = sellers' cost under supply (trapezoid: ½·($1 + $4)·6 = $15),
   Z = between the curves right of Q* (not traded). Spending = X + Y = $24 = 6 × $4. Value to buyers = W + X + Y = $42. */
W.areas = el => {
  el.innerHTML = `<p class="widget-title">Which area is it?</p><p class="hint">Made-up market in equilibrium at E. For each item, pick the area that shows it.</p>
  <div class="svgbox ar-g"></div><div class="ar-s"></div>`;
  $('.ar-g',el).innerHTML = sdg({xmax:10,ymax:10,xt:[0,6,10],yt:[0,1,4,10],
    areas:[{pts:[[0,10],[0,4],[6,4]],c:'var(--accent-soft)',label:[1.6,5.8,'W']},{pts:[[0,4],[0,1],[6,4]],c:'var(--ok-soft)',label:[1.5,3.0,'X']},
           {pts:[[0,1],[6,4],[6,0],[0,0]],c:'var(--surface-2)',label:[3,1.2,'Y']},{pts:[[6,4],[10,6],[10,0]],c:'var(--bad-soft)',label:[9.0,2.2,'Z']}],
    lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,1],b:[10,6],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],
    hl:[{p:4,label:'P*',c:'var(--muted)'}], dots:[{q:6,p:4,label:'E'}]});
  sorterWidget($('.ar-s',el), { title:'Name the area', hint:'Anchor on the price line and the quantity traded (6).', aria:'Area',
    kinds:[['W','W'],['X','X'],['Y','Y'],['Z','Z'],['WX','W + X'],['XY','X + Y'],['WXY','W + X + Y']],
    items:[
      ['Consumer surplus','W','Below demand, above the price, left of the quantity traded.'],
      ['Producer surplus','X','Above supply, below the price, left of the quantity traded.'],
      ['Total surplus','WX','Consumer plus producer surplus: the whole triangle between the curves up to E.'],
      ['What buyers spend (the sellers\' revenue)','XY','Price × quantity: the rectangle under the price line out to 6. It includes producer surplus X and sellers\' cost Y.'],
      ['Sellers\' cost of the units sold','Y','The area under the supply curve out to 6. Revenue (X + Y) minus cost (Y) leaves producer surplus (X).'],
      ['Total value of the units to the buyers who get them','WXY','The area under the demand curve out to 6. Value (W + X + Y) minus spending (X + Y) leaves consumer surplus (W).'],
      ['Units that would cost more to make than they are worth','Z','Right of E, supply is above demand. These units aren\'t traded at equilibrium; making them would lower total surplus.']
    ]});
};
