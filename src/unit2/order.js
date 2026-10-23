/* Number choices listed smallest to largest (workbook convention, as in Unit 1 and Lesson 8).
   Applies to Unit 2 fixed multiple-choice questions whose five choices all start with a number or dollar amount
   (e.g. "$2.75", "0.5, inelastic", "−0.5; an inferior good"). Re-maps the answer index and fixes the order. */
(function u2SortNumeric(){
  const U2L = new Set(['l6','l7','l8','l9','l10','l11','l12']);
  const lead = t => { const m = String(t).replace(/<[^>]+>/g,'').replace(/−/g,'-').replace(/,(?=\d{3}\b)/g,'').match(/^\s*([+-]?)\$?\s*([+-]?\d+(?:\.\d+)?)/); return m ? parseFloat((m[1]||'')+m[2]) : null; };
  Object.entries(Q).forEach(([id,q]) => {
    if(!U2L.has(q.lesson) || q.type!=='mc' || q.kind==='tf' || !Array.isArray(q.options) || q.gen || q.build) return;
    const v = q.options.map(lead); if(v.some(x => x===null)) return;
    const idx = q.options.map((t,i)=>i).sort((a,b)=> v[a]-v[b] || String(q.options[a]).localeCompare(String(q.options[b])));
    const ans = q.answer; q.options = idx.map(i=>q.options[i]); q.answer = idx.indexOf(ans); q.keepOrder = true;
  });
})();
