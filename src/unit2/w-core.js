/* ---------- Unit 2 shared widget helpers ---------- */
/* sorterWidget: the same "pick the category" exercise as Unit 1's sorters, reusable.
   items: [text, answerKey, why]; kinds: [[key, label], ...]. A wrong pick shows the right answer plus the reason. */
function sorterWidget(el, { title, hint, items, kinds, aria }){
  let right=0, answered=0;
  el.innerHTML = `<p class="widget-title">${title}</p><p class="hint">${hint}</p><div class="items"></div><div class="msg score">0 of ${items.length} answered</div>`;
  const box=$('.items',el); const labelOf = k => (kinds.find(x=>x[0]===k)||[k,k])[1];
  items.forEach(([txt,ans,why])=>{
    const d=document.createElement('div'); d.className='sort-item';
    d.innerHTML=`<p>${txt}</p><div class="seg" role="group" aria-label="${esc(aria||title)}">${kinds.map(([k,lab])=>`<button data-k="${k}" aria-pressed="false">${lab}</button>`).join('')}</div><p class="small why" hidden></p>`;
    $$('button',d).forEach(b=>b.onclick=()=>{
      if(d.dataset.done) return; d.dataset.done=1; answered++;
      const ok=b.dataset.k===ans; if(ok) right++;
      b.classList.add(ok?'right':'wrong'); if(!ok) $(`button[data-k="${ans}"]`,d).classList.add('right');
      $$('button',d).forEach(x=>x.disabled=true);
      const w=$('.why',d); w.hidden=false; w.innerHTML=(ok?'<b>Right.</b> ':`<b>Not quite: ${labelOf(ans)}.</b> `)+why;
      $('.score',el).textContent = answered<items.length ? `${right} right out of ${answered} so far` : `${right} of ${items.length} right. ${right===items.length?'Perfect.':'Read the note under any you missed.'}`;
    });
    box.appendChild(d);
  });
}
/* polyline helper for widgets: pts in data units → SVG path */
const wpath = (pts, X, Y) => 'M' + pts.map(([q,p]) => X(q).toFixed(1)+','+Y(p).toFixed(1)).join('L');
function warrow(svg, x1, y1, x2, y2, color){
  const id='wa'+Math.random().toString(36).slice(2,7);
  const defs=svgEl('defs',{},svg); const m=svgEl('marker',{id,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'},defs);
  svgEl('path',{d:'M0,0 L10,5 L0,10 z',fill:color},m);
  svgEl('line',{x1,y1,x2,y2,stroke:color,'stroke-width':2.2,'marker-end':`url(#${id})`},svg);
}
function wlabel(svg, x, y, text, color, anchor){ const t=svgEl('text',{x,y,'text-anchor':anchor||'start',class:'lbl-ink halo'},svg); t.textContent=text; if(color) t.setAttribute('style',`fill:${color}`); return t; }
