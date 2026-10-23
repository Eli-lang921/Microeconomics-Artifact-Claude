/* TEST NOTE (2026-10-22): orange market Qd = 60 − 10P, Qs = 10P (course video 2.1b schedule), equilibrium $3 and 30.
   Ceiling $2: Qd 40, Qs 20 → shortage 20, 20 sold. Ceiling $4: non-binding, market at $3/30. Ceiling $0.50: shortage 50, 5 sold.
   Floor $4: Qd 20, Qs 40 → surplus 20, 20 sold. Floor $2: non-binding. Floor $5.50: surplus 55 − 5 = 50, 5 sold.
   Quota 20: buyers pay $4, sellers would accept $2, gap $2. Quota 40: non-binding. Quota 5: buyers $5.50, sellers $0.50. */
W.controls = el => {
  let mode='ceiling';
  el.innerHTML = `<p class="widget-title">Control lab</p><p class="hint">Your course's orange market (equilibrium $3 and 30). Pick a control, then move it above and below the equilibrium.</p>
  <div class="seg modes" role="group" aria-label="Kind of control"><button data-m="ceiling" aria-pressed="true">Price ceiling</button><button data-m="floor" aria-pressed="false">Price floor</button><button data-m="quota" aria-pressed="false">Quota</button></div>
  <div class="slider" style="margin-top:8px"><label for="ct-v" class="ctl-l">Ceiling price</label><input id="ct-v" type="range" min="0.5" max="5.5" step="0.5" value="2"><output></output></div>
  <div class="svgbox"><svg viewBox="0 0 380 260" width="100%" role="img" aria-label="Orange market with a price or quantity control"></svg></div>
  <div class="readout"><div><b class="r1"></b><span class="r1l"></span></div><div><b class="r2"></b><span class="r2l"></span></div><div><b class="r3"></b><span class="r3l"></span></div></div>
  <div class="msg"></div>`;
  const svg=$('svg',el), V=$('#ct-v',el), lab=$('.ctl-l',el);
  const x0=46,y0=220,w=310,h=200,xm=70,ym=6.5; const X=v=>x0+w*v/xm, Y=v=>y0-h*v/ym;
  const setMode = m => { mode=m; $$('.modes button',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m));
    if(m==='quota'){ V.min=5; V.max=55; V.step=5; V.value=20; lab.textContent='Quota (oranges)'; } else { V.min=0.5; V.max=5.5; V.step=0.5; V.value= m==='ceiling'?2:4; lab.textContent= m==='ceiling'?'Ceiling price':'Floor price'; } draw(); };
  const draw = () => {
    const v=+V.value; V.nextElementSibling.textContent = mode==='quota' ? v : money(v);
    svg.innerHTML='';
    axes(svg,{x0,y0,w,h,xmax:xm,ymax:ym,xlab:'Oranges',ylab:'Price ($)',xt:[0,10,20,30,40,50,60,70],yt:[0,1,2,3,4,5,6]});
    svgEl('line',{x1:X(0),y1:Y(6),x2:X(60),y2:Y(0),stroke:'var(--accent)','stroke-width':3},svg); wlabel(svg,X(60)+4,Y(0)-8,'D','var(--accent)');
    svgEl('line',{x1:X(0),y1:Y(0),x2:X(65),y2:Y(6.5),stroke:'var(--g1)','stroke-width':3},svg); wlabel(svg,X(65)-4,Y(6.5)+14,'S','var(--g1)','end');
    svgEl('circle',{cx:X(30),cy:Y(3),r:5,fill:'none',stroke:'var(--ink)','stroke-width':2},svg); wlabel(svg,X(30)+8,Y(3)+4,'E');
    const m=$('.msg',el); let r=[];
    if(mode!=='quota'){
      const qd=Math.max(0,60-10*v), qs=10*v, binds = mode==='ceiling' ? v<3 : v>3;
      svgEl('line',{x1:X(0),x2:X(xm),y1:Y(v),y2:Y(v),stroke:binds?'var(--bad)':'var(--muted)','stroke-width':2.2,'stroke-dasharray':'6 4'},svg);
      wlabel(svg, X(xm)-2, Y(v)-6, `${mode} ${money(v)}`, binds?'var(--bad)':'var(--muted)', 'end');
      if(binds){ svgEl('line',{x1:X(qd),x2:X(qs),y1:Y(v),y2:Y(v),stroke:'var(--bad)','stroke-width':6,opacity:.45},svg);
        svgEl('circle',{cx:X(qd),cy:Y(v),r:5,fill:'var(--accent)'},svg); svgEl('circle',{cx:X(qs),cy:Y(v),r:5,fill:'var(--g1)'},svg); }
      const sold = binds ? Math.min(qd,qs) : 30;
      r = [[binds?qd:30,'quantity demanded'],[binds?qs:30,'quantity supplied'],[sold,'actually sold']];
      if(!binds){ m.className='msg'; m.innerHTML = `A ${mode} at ${money(v)} is ${mode==='ceiling'?'above':'below'} the equilibrium price of $3, so it is <b>non-binding</b>: the market still clears at $3 and 30 oranges.`; }
      else if(mode==='ceiling'){ m.className='msg bad'; m.innerHTML = `The ceiling is below $3, so it <b>binds</b>. At ${money(v)} buyers want ${qd} but sellers offer only ${qs}: a <b>shortage of ${qd-qs}</b>. Only ${sold} are sold, fewer than the 30 at equilibrium. Something other than price (lines, black markets, lower quality) decides who gets them.`; }
      else { m.className='msg bad'; m.innerHTML = `The floor is above $3, so it <b>binds</b>. At ${money(v)} sellers offer ${qs} but buyers want only ${qd}: a <b>surplus of ${qs-qd}</b>. Only ${sold} are sold, fewer than the 30 at equilibrium.`; }
    } else {
      const q=v, binds=q<30, pb=binds?(60-q)/10:3, ps=binds?q/10:3;
      svgEl('line',{x1:X(q),x2:X(q),y1:Y(0),y2:Y(6.3),stroke:binds?'var(--bad)':'var(--muted)','stroke-width':2.2,'stroke-dasharray':'6 4'},svg);
      wlabel(svg, X(q)+4, Y(6.3)+12, `quota ${q}`, binds?'var(--bad)':'var(--muted)');
      if(binds){ svgEl('line',{x1:X(q),x2:X(q),y1:Y(pb),y2:Y(ps),stroke:'var(--bad)','stroke-width':6,opacity:.45},svg);
        svgEl('circle',{cx:X(q),cy:Y(pb),r:5,fill:'var(--accent)'},svg); svgEl('circle',{cx:X(q),cy:Y(ps),r:5,fill:'var(--g1)'},svg); }
      r = [[money(pb),'price buyers pay'],[money(ps),'price sellers would accept'],[binds?q:30,'actually sold']];
      if(!binds){ m.className='msg'; m.innerHTML = `A quota of ${q} is above the 30 oranges the market trades anyway, so it is <b>non-binding</b>: the market stays at $3 and 30.`; }
      else { m.className='msg bad'; m.innerHTML = `The quota <b>binds</b>: only ${q} oranges may be sold. Buyers bid the price up their demand curve to <b>${money(pb)}</b>, where they want exactly ${q}. Sellers would have sold ${q} for ${money(ps)}, so the ${money(pb-ps)} gap per orange goes to whoever holds the right to sell.`; }
    }
    [['.r1','.r1l'],['.r2','.r2l'],['.r3','.r3l']].forEach(([a,b],i)=>{ $(a,el).textContent=r[i][0]; $(b,el).textContent=r[i][1]; });
  };
  V.addEventListener('input',draw); $$('.modes button',el).forEach(b=>b.onclick=()=>setMode(b.dataset.m));
  draw();
};

/* TEST NOTE (2026-10-22): 8 items; each compares the control with the stated equilibrium (ceiling binds below, floor above). */
W.ctlsort = el => sorterWidget(el, {
  title:'Binding? Shortage or surplus?', hint:'Compare the control with the equilibrium. Does it bind? If so, which problem appears?', aria:'Result',
  kinds:[['SH','Binds: shortage'],['SU','Binds: surplus'],['NB','Doesn\'t bind: no effect']],
  items:[
    ['Equilibrium rent is $1,200 a month; the city caps rent at $1,000.','SH','A ceiling below equilibrium binds. At $1,000 more people want apartments than landlords offer.'],
    ['Equilibrium wage for warehouse workers is $18; the minimum wage is $15.','NB','A floor below the market wage doesn\'t bind; employers already pay more than $15.'],
    ['Equilibrium price of milk is $3 a gallon; the government guarantees dairy farmers $4.','SU','A floor above equilibrium binds: farmers offer more milk than buyers want at $4.'],
    ['Equilibrium price of gas is $3.50; a cap is set at $4.','NB','A ceiling above equilibrium doesn\'t bind; the market price of $3.50 is already legal.'],
    ['Equilibrium wage for teen workers is $9; a new minimum wage is $11.','SU','A floor above the market wage binds: more teens want jobs than employers will fill, a surplus of labor.'],
    ['Equilibrium price of a drug is $90; a law caps it at $35.','SH','A ceiling far below equilibrium binds, creating a shortage of the drug at $35.'],
    ['Equilibrium price for resold concert tickets is $80; resale is capped at the $60 face value.','SH','The cap is below what the market would pay, so it binds: more fans want tickets at $60 than are offered.'],
    ['Equilibrium price of corn is $5 a bushel; a support price is set at $4.50.','NB','A floor below equilibrium doesn\'t bind; corn already sells above the support price.']
  ]
});
