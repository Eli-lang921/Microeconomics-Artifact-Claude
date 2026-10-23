/* ===== Unit 2 quiz: submit-then-reveal =====
   Nothing on screen shows whether an answer is right until the whole quiz is submitted: no score counter, no colored options,
   and "Explain this" runs in hint mode (it never sees the answer or the explanation). Results are stored in S.quiz2,
   separate from Unit 1's S.quiz. An unfinished attempt is kept on this device only (localStorage), as a convenience. */
const QZ2_DRAFT_KEY = 'micro-quiz2-draft';
let QZ2 = null, QZ2R = null; // active attempt; results being shown
const qz2Load = () => { try{ const v=JSON.parse(localStorage.getItem(QZ2_DRAFT_KEY)); if(v && Array.isArray(v.order) && v.order.every(id=>Q[id] && Q[id].quiz)) return v; }catch(e){} return null; };
const qz2Save = () => { try{ if(QZ2) localStorage.setItem(QZ2_DRAFT_KEY, JSON.stringify(QZ2)); else localStorage.removeItem(QZ2_DRAFT_KEY); }catch(e){} };
function qz2New(){
  const order = shuffle(QUIZ2), opts = {};
  order.forEach(id => { const q = Q[id]; const idx = q.options.map((_,i)=>i); opts[id] = q.keepOrder ? idx : shuffle(idx); });
  return { order, opts, ans:{}, i:0, started:Date.now() };
}
const quizSwitch = u => `<div class="chips" role="group" aria-label="Which unit quiz" style="margin:.2rem 0 1rem"><a class="chipbtn" href="#quiz" aria-pressed="${u===1}" style="text-decoration:none">Unit 1 quiz</a><a class="chipbtn" href="#quiz2" aria-pressed="${u===2}" style="text-decoration:none">Unit 2 quiz</a></div>`;
function renderQuiz2(){
  if(QZ2R) return renderQuiz2Results();
  if(!QZ2){
    const d = qz2Load(), st = S.quiz2, n = QUIZ2.length;
    const answered = d ? Object.keys(d.ans).length : 0;
    app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Unit 2 · Supply and Demand</div><h1 style="margin-top:.4rem">Unit 2 quiz</h1>
      ${quizSwitch(2)}
      <p class="oneline">${n} exam-style questions across Lessons 6 to 12, with five answer choices like the real CLEP. Like the real exam, you find out how you did only after you submit.</p></div>
      ${st.best!==null?`<div class="readout"><div><b>${st.best}%</b><span>best score</span></div><div><b>${st.last}%</b><span>last score</span></div><div><b>${st.attempts}</b><span>attempts</span></div></div>`:''}
      <ul class="small" style="margin-top:1rem"><li>Move back and forth and change any answer until you submit.</li><li>"Explain this" gives hints only during the quiz. Full explanations appear after you submit.</li><li>Missed questions come back in Review the next day. Target: 80% or higher.</li></ul>
      <div class="row" style="margin-top:1rem">${d?`<button class="btn" id="q2resume">Resume (${answered} of ${d.order.length} answered)</button><button class="btn ghost" id="q2new">Start over</button>`:`<button class="btn" id="q2new">${st.best===null?'Start the quiz':'Take it again'}</button>`}
      ${st.lastAttempt?`<button class="btn ghost" id="q2last">See my last results</button>`:''}</div>`;
    const r=$('#q2resume'); if(r) r.onclick=()=>{ QZ2=d; renderQuiz2(); };
    $('#q2new').onclick=()=>{ QZ2=qz2New(); qz2Save(); renderQuiz2(); window.scrollTo(0,0); };
    const l=$('#q2last'); if(l) l.onclick=()=>{ QZ2R=st.lastAttempt; renderQuiz2(); window.scrollTo(0,0); };
    return;
  }
  const n = QZ2.order.length, qid = QZ2.order[QZ2.i], q = Q[qid], L = LBYID[q.lesson];
  const answered = Object.keys(QZ2.ans).length, letters='ABCDE';
  app.innerHTML = `<div class="quiz-top"><div class="eyebrow">Unit 2 quiz · question ${QZ2.i+1} of ${n}</div><span class="small muted num">${answered} of ${n} answered</span></div>
    <div class="bar"><span style="width:${answered/n*100}%"></span></div>
    <div class="qset"><div class="q" id="q2card"><div class="q-meta"><span>From Lesson ${L.n}</span><span>Multiple choice</span></div>
      <div class="q-prompt">${q.prompt}</div>
      <div class="opts" role="radiogroup" aria-label="Answer choices">${QZ2.opts[qid].map((oi,k)=>`<button class="opt q2opt${QZ2.ans[qid]===oi?' sel':''}" role="radio" aria-checked="${QZ2.ans[qid]===oi}" data-k="${k}"><span class="ol">${letters[k]}</span><span>${q.options[oi]}</span></button>`).join('')}</div>
      <div class="q-tools"><span class="xp-slot"></span><span class="rep-slot"></span></div></div></div>
    <div class="row cf-nav" style="margin-top:12px"><button class="btn ghost sm" id="q2prev" ${QZ2.i===0?'disabled':''}>← Previous</button><button class="btn sm" id="q2next">${QZ2.i===n-1?'Review and submit':'Next →'}</button></div>
    <p class="small muted" style="margin:1.2rem 0 .4rem">Jump to a question (filled = answered):</p>
    <div class="qpal" role="group" aria-label="Questions">${QZ2.order.map((id,k)=>`<button type="button" data-k="${k}" class="${QZ2.ans[id]!==undefined?'done':''}${k===QZ2.i?' cur':''}" aria-label="Question ${k+1}${QZ2.ans[id]!==undefined?', answered':', not answered'}">${k+1}</button>`).join('')}</div>
    <div class="row" style="margin-top:1.2rem"><button class="btn" id="q2submit">Submit quiz</button><span class="small muted">You can still change answers before you submit.</span></div><div id="q2confirm"></div>`;
  const card = $('#q2card');
  /* option buttons carry their display position (data-k), not the source index, so the markup never hints at the answer.
     hint-only explanations: the context has the question and choices, never the answer or explanation */
  $('.xp-slot', card).appendChild(explainBox('question:'+qid, () => `Unit quiz question (the quiz is still in progress, so do not reveal or hint at the answer):\n${textOf($('.q-prompt', card))}\n\nChoices:\n` + QZ2.opts[qid].map((oi,k)=>`${letters[k]}. ${textOf(Object.assign(document.createElement('div'),{innerHTML:q.options[oi]}))}`).join('\n'), () => 'quizhint', 'Hint'));
  mountReport('question:'+qid, $('.rep-slot', card), () => `Unit 2 quiz question, reported during the quiz (no answer shown):\n${textOf($('.q-prompt', card))}`);
  $$('.q2opt', card).forEach(b => b.onclick = () => { QZ2.ans[qid] = QZ2.opts[qid][+b.dataset.k]; qz2Save();
    $$('.q2opt', card).forEach(x => { const on = x===b; x.classList.toggle('sel', on); x.setAttribute('aria-checked', on); });
    const a = Object.keys(QZ2.ans).length; $('.quiz-top .num').textContent = `${a} of ${n} answered`; $('.bar>span').style.width = `${a/n*100}%`;
    const pal = $(`.qpal button[data-k="${QZ2.i}"]`); if(pal){ pal.classList.add('done'); pal.setAttribute('aria-label',`Question ${QZ2.i+1}, answered`); } });
  const go = k => { QZ2.i = Math.max(0, Math.min(n-1, k)); qz2Save(); renderQuiz2(); window.scrollTo(0,0); };
  $('#q2prev').onclick = () => go(QZ2.i-1);
  $('#q2next').onclick = () => { if(QZ2.i===n-1){ $('#q2submit').scrollIntoView({block:'center'}); $('#q2submit').focus(); } else go(QZ2.i+1); };
  $$('.qpal button').forEach(b => b.onclick = () => go(+b.dataset.k));
  $('#q2submit').onclick = () => {
    const left = QZ2.order.filter(id => QZ2.ans[id]===undefined).length, box = $('#q2confirm');
    if(left && !box.firstChild){ box.innerHTML = `<div class="msg bad" style="margin-top:10px"><p style="margin:0 0 8px">${left} question${left===1?' is':'s are'} unanswered and will count as wrong. Submit anyway?</p><div class="row"><button class="btn sm" id="q2yes">Submit anyway</button><button class="btn ghost sm" id="q2no">Keep working</button></div></div>`;
      $('#q2yes').onclick = submitQuiz2; $('#q2no').onclick = () => { box.innerHTML=''; const k = QZ2.order.findIndex(id => QZ2.ans[id]===undefined); go(k); }; return; }
    if(!left) submitQuiz2();
  };
}
function submitQuiz2(){
  const at = Date.now(), res = QZ2.order.map(id => ({ id, pick: QZ2.ans[id]===undefined ? null : QZ2.ans[id], ok: QZ2.ans[id]===Q[id].answer }));
  const right = res.filter(r=>r.ok).length, pct = Math.round(right/res.length*100);
  const st = S.quiz2; st.last = pct; st.best = Math.max(st.best ?? 0, pct); st.attempts = (st.attempts||0)+1;
  st.history = [...(st.history||[]), { at, pct, right, n:res.length }].slice(-20);
  st.lastAttempt = { at, pct, right, order: QZ2.order, opts: QZ2.opts, ans: QZ2.ans };
  res.forEach(r => schedule(r.id, r.ok, 'quiz'));
  save(); refreshChrome();
  QZ2R = st.lastAttempt; QZ2 = null; qz2Save();
  renderQuiz2(); window.scrollTo(0,0);
}
function renderQuiz2Results(){
  const A = QZ2R, letters='ABCDE', ids = A.order.filter(id => Q[id]);
  const missed = ids.filter(id => A.ans[id]!==Q[id].answer);
  const byL = {}; missed.forEach(id => { const l=Q[id].lesson; byL[l]=(byL[l]||0)+1; });
  const weak = Object.entries(byL).sort((a,b)=>b[1]-a[1]);
  app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Unit 2 quiz result · ${new Date(A.at).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</div><p class="score-big num">${A.pct}%</p>
    <p>${A.right} of ${ids.length} correct. ${A.pct>=80?'Solid. You\'re ready to move on.':A.pct>=60?'Close. Revisit the lessons below, then try again.':'Worth another pass through the lessons below before retrying.'}</p></div>
    ${weak.length?`<h2>Where you lost points</h2><ul class="links">${weak.map(([l,k])=>`<li><a href="#${l}">Lesson ${LBYID[l].n}: ${LBYID[l].title}</a> <span class="small muted">· ${k} missed</span></li>`).join('')}</ul><p class="muted small">Missed questions come back in Review tomorrow.</p>`:'<p>No misses.</p>'}
    <h2>Every question, with explanations</h2><div class="qset" id="q2res"></div>
    <div class="row" style="margin-top:1.4rem"><button class="btn" id="q2again">Take it again</button><a class="btn ghost" href="#home">Back to course</a></div>`;
  const box = $('#q2res');
  ids.forEach((id, k) => {
    const q = Q[id], pick = A.ans[id], ok = pick===q.answer, order = (A.opts && A.opts[id]) || q.options.map((_,i)=>i);
    const el = document.createElement('div'); el.className='q'; el.id = 'q2r-'+id;
    el.innerHTML = `<div class="q-meta"><span>Question ${k+1} · From Lesson ${LBYID[q.lesson].n}</span><span>${pick===undefined?'Not answered':ok?'Correct':'Missed'}</span></div>
      <div class="q-prompt">${q.prompt}</div>
      <div class="opts">${order.map((oi,j)=>`<div class="opt${oi===q.answer?' right':''}${oi===pick&&!ok?' wrong':''}"><span class="ol">${letters[j]}</span><span>${q.options[oi]}${oi===pick?' <span class="small muted">(your answer)</span>':''}</span></div>`).join('')}</div>
      <p class="verdict ${ok?'good':'bad'}">${ok?'Correct.':pick===undefined?'Not answered.':'Not quite. Here\'s how it works:'}</p><div class="explain">${q.explain}</div>${qSrcLine(id)}
      <div class="q-tools"><span class="xp-slot"></span><span class="rep-slot"></span></div>`;
    $('.xp-slot', el).appendChild(explainBox('question:'+id, () => {
      const t = j => textOf(Object.assign(document.createElement('div'),{innerHTML:q.options[order[j]]}));
      let s = `Unit quiz question (already submitted):\n${textOf($('.q-prompt', el))}\n\nChoices:\n` + order.map((oi,j)=>`${letters[j]}. ${t(j)}`).join('\n');
      const pj = order.indexOf(pick), cj = order.indexOf(q.answer);
      s += `\n\nThe student answered: ${pj<0?'nothing':letters[pj]+'. '+t(pj)} (${ok?'correct':'incorrect'}).\nCorrect answer: ${letters[cj]}. ${t(cj)}\nExplanation shown in the workbook: ${textOf($('.explain', el))}`;
      return s; }, () => 'full', 'Explain this'));
    mountReport('question:'+id, $('.rep-slot', el));
    box.appendChild(el);
  });
  $('#q2again').onclick = () => { QZ2R = null; QZ2 = qz2New(); qz2Save(); renderQuiz2(); window.scrollTo(0,0); };
}
window.addEventListener('hashchange', () => { if(location.hash!=='#quiz2') QZ2R = null; });
