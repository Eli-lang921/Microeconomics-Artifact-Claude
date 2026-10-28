/* ===== Unit 3 quiz: submit-then-reveal (same behavior as the Unit 2 quiz; copied so Unit 2 code stays untouched) =====
   Nothing on screen shows whether an answer is right until the whole quiz is submitted: no score counter, no colored options,
   and "Explain this" runs in hint mode (it never sees the answer or the explanation). Results are stored in S.quiz3,
   separate from Unit 1's S.quiz and Unit 2's S.quiz2. An unfinished attempt is kept on this device only (localStorage), as a convenience. */
const QZ3_DRAFT_KEY = 'micro-quiz3-draft';
let QZ3 = null, QZ3R = null; // active attempt; results being shown
const qz3Load = () => { try{ const v=JSON.parse(localStorage.getItem(QZ3_DRAFT_KEY)); if(v && Array.isArray(v.order) && v.order.every(id=>Q[id] && Q[id].quiz)) return v; }catch(e){} return null; };
const qz3Save = () => { try{ if(QZ3) localStorage.setItem(QZ3_DRAFT_KEY, JSON.stringify(QZ3)); else localStorage.removeItem(QZ3_DRAFT_KEY); }catch(e){} };
function qz3New(){
  const order = shuffle(QUIZ3), opts = {};
  order.forEach(id => { const q = Q[id]; const idx = q.options.map((_,i)=>i); opts[id] = q.keepOrder ? idx : shuffle(idx); });
  return { order, opts, ans:{}, i:0, started:Date.now() };
}
function renderQuiz3(){
  if(QZ3R) return renderQuiz3Results();
  if(!QZ3){
    const d = qz3Load(), st = S.quiz3, n = QUIZ3.length;
    const answered = d ? Object.keys(d.ans).length : 0;
    app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Unit 3 · Theory of Consumer Choice</div><h1 style="margin-top:.4rem">Unit 3 quiz</h1>
      ${quizSwitch(3)}
      <p class="oneline">${n} exam-style questions across Lessons 13 to 15, with five answer choices like the real CLEP. Like the real exam, you find out how you did only after you submit.</p></div>
      ${st.best!==null?`<div class="readout"><div><b>${st.best}%</b><span>best score</span></div><div><b>${st.last}%</b><span>last score</span></div><div><b>${st.attempts}</b><span>attempts</span></div></div>`:''}
      <ul class="small" style="margin-top:1rem"><li>Move back and forth and change any answer until you submit.</li><li>"Explain this" gives hints only during the quiz. Full explanations appear after you submit.</li><li>Missed questions come back in Review the next day. Target: 80% or higher.</li></ul>
      <div class="row" style="margin-top:1rem">${d?`<button class="btn" id="q3resume">Resume (${answered} of ${d.order.length} answered)</button><button class="btn ghost" id="q3new">Start over</button>`:`<button class="btn" id="q3new">${st.best===null?'Start the quiz':'Take it again'}</button>`}
      ${st.lastAttempt?`<button class="btn ghost" id="q3last">See my last results</button>`:''}</div>`;
    const r=$('#q3resume'); if(r) r.onclick=()=>{ QZ3=d; renderQuiz3(); };
    $('#q3new').onclick=()=>{ QZ3=qz3New(); qz3Save(); renderQuiz3(); window.scrollTo(0,0); };
    const l=$('#q3last'); if(l) l.onclick=()=>{ QZ3R=st.lastAttempt; renderQuiz3(); window.scrollTo(0,0); };
    return;
  }
  const n = QZ3.order.length, qid = QZ3.order[QZ3.i], q = Q[qid], L = LBYID[q.lesson];
  const answered = Object.keys(QZ3.ans).length, letters='ABCDE';
  app.innerHTML = `<div class="quiz-top"><div class="eyebrow">Unit 3 quiz · question ${QZ3.i+1} of ${n}</div><span class="small muted num">${answered} of ${n} answered</span></div>
    <div class="bar"><span style="width:${answered/n*100}%"></span></div>
    <div class="qset"><div class="q" id="q3card"><div class="q-meta"><span>From Lesson ${L.n}</span><span>Multiple choice</span></div>
      <div class="q-prompt">${q.prompt}</div>
      <div class="opts" role="radiogroup" aria-label="Answer choices">${QZ3.opts[qid].map((oi,k)=>`<button class="opt q3opt${QZ3.ans[qid]===oi?' sel':''}" role="radio" aria-checked="${QZ3.ans[qid]===oi}" data-k="${k}"><span class="ol">${letters[k]}</span><span>${q.options[oi]}</span></button>`).join('')}</div>
      <div class="q-tools"><span class="xp-slot"></span><span class="rep-slot"></span></div></div></div>
    <div class="row cf-nav" style="margin-top:12px"><button class="btn ghost sm" id="q3prev" ${QZ3.i===0?'disabled':''}>← Previous</button><button class="btn sm" id="q3next">${QZ3.i===n-1?'Review and submit':'Next →'}</button></div>
    <p class="small muted" style="margin:1.2rem 0 .4rem">Jump to a question (filled = answered):</p>
    <div class="qpal" role="group" aria-label="Questions">${QZ3.order.map((id,k)=>`<button type="button" data-k="${k}" class="${QZ3.ans[id]!==undefined?'done':''}${k===QZ3.i?' cur':''}" aria-label="Question ${k+1}${QZ3.ans[id]!==undefined?', answered':', not answered'}">${k+1}</button>`).join('')}</div>
    <div class="row" style="margin-top:1.2rem"><button class="btn" id="q3submit">Submit quiz</button><span class="small muted">You can still change answers before you submit.</span></div><div id="q3confirm"></div>`;
  const card = $('#q3card');
  /* option buttons carry their display position (data-k), not the source index, so the markup never hints at the answer.
     hint-only explanations: the context has the question and choices, never the answer or explanation */
  $('.xp-slot', card).appendChild(explainBox('question:'+qid, () => `Unit quiz question (the quiz is still in progress, so do not reveal or hint at the answer):\n${textOf($('.q-prompt', card))}\n\nChoices:\n` + QZ3.opts[qid].map((oi,k)=>`${letters[k]}. ${textOf(Object.assign(document.createElement('div'),{innerHTML:q.options[oi]}))}`).join('\n'), () => 'quizhint', 'Hint'));
  mountReport('question:'+qid, $('.rep-slot', card), () => `Unit 3 quiz question, reported during the quiz (no answer shown):\n${textOf($('.q-prompt', card))}`);
  $$('.q3opt', card).forEach(b => b.onclick = () => { QZ3.ans[qid] = QZ3.opts[qid][+b.dataset.k]; qz3Save();
    $$('.q3opt', card).forEach(x => { const on = x===b; x.classList.toggle('sel', on); x.setAttribute('aria-checked', on); });
    const a = Object.keys(QZ3.ans).length; $('.quiz-top .num').textContent = `${a} of ${n} answered`; $('.bar>span').style.width = `${a/n*100}%`;
    const pal = $(`.qpal button[data-k="${QZ3.i}"]`); if(pal){ pal.classList.add('done'); pal.setAttribute('aria-label',`Question ${QZ3.i+1}, answered`); } });
  const go = k => { QZ3.i = Math.max(0, Math.min(n-1, k)); qz3Save(); renderQuiz3(); window.scrollTo(0,0); };
  $('#q3prev').onclick = () => go(QZ3.i-1);
  $('#q3next').onclick = () => { if(QZ3.i===n-1){ $('#q3submit').scrollIntoView({block:'center'}); $('#q3submit').focus(); } else go(QZ3.i+1); };
  $$('.qpal button').forEach(b => b.onclick = () => go(+b.dataset.k));
  $('#q3submit').onclick = () => {
    const left = QZ3.order.filter(id => QZ3.ans[id]===undefined).length, box = $('#q3confirm');
    if(left && !box.firstChild){ box.innerHTML = `<div class="msg bad" style="margin-top:10px"><p style="margin:0 0 8px">${left} question${left===1?' is':'s are'} unanswered and will count as wrong. Submit anyway?</p><div class="row"><button class="btn sm" id="q3yes">Submit anyway</button><button class="btn ghost sm" id="q3no">Keep working</button></div></div>`;
      $('#q3yes').onclick = submitQuiz3; $('#q3no').onclick = () => { box.innerHTML=''; const k = QZ3.order.findIndex(id => QZ3.ans[id]===undefined); go(k); }; return; }
    if(!left) submitQuiz3();
  };
}
function submitQuiz3(){
  const at = Date.now(), res = QZ3.order.map(id => ({ id, pick: QZ3.ans[id]===undefined ? null : QZ3.ans[id], ok: QZ3.ans[id]===Q[id].answer }));
  const right = res.filter(r=>r.ok).length, pct = Math.round(right/res.length*100);
  const st = S.quiz3; st.last = pct; st.best = Math.max(st.best ?? 0, pct); st.attempts = (st.attempts||0)+1;
  st.history = [...(st.history||[]), { at, pct, right, n:res.length }].slice(-20);
  st.lastAttempt = { at, pct, right, order: QZ3.order, opts: QZ3.opts, ans: QZ3.ans };
  res.forEach(r => schedule(r.id, r.ok, 'quiz'));
  save(); refreshChrome();
  QZ3R = st.lastAttempt; QZ3 = null; qz3Save();
  renderQuiz3(); window.scrollTo(0,0);
}
function renderQuiz3Results(){
  const A = QZ3R, letters='ABCDE', ids = A.order.filter(id => Q[id]);
  const missed = ids.filter(id => A.ans[id]!==Q[id].answer);
  const byL = {}; missed.forEach(id => { const l=Q[id].lesson; byL[l]=(byL[l]||0)+1; });
  const weak = Object.entries(byL).sort((a,b)=>b[1]-a[1]);
  app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Unit 3 quiz result · ${new Date(A.at).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</div><p class="score-big num">${A.pct}%</p>
    <p>${A.right} of ${ids.length} correct. ${A.pct>=80?'Solid. You\'re ready to move on.':A.pct>=60?'Close. Revisit the lessons below, then try again.':'Worth another pass through the lessons below before retrying.'}</p></div>
    ${weak.length?`<h2>Where you lost points</h2><ul class="links">${weak.map(([l,k])=>`<li><a href="#${l}">Lesson ${LBYID[l].n}: ${LBYID[l].title}</a> <span class="small muted">· ${k} missed</span></li>`).join('')}</ul><p class="muted small">Missed questions come back in Review tomorrow.</p>`:'<p>No misses.</p>'}
    <h2>Every question, with explanations</h2><div class="qset" id="q3res"></div>
    <div class="row" style="margin-top:1.4rem"><button class="btn" id="q3again">Take it again</button><a class="btn ghost" href="#home">Back to course</a></div>`;
  const box = $('#q3res');
  ids.forEach((id, k) => {
    const q = Q[id], pick = A.ans[id], ok = pick===q.answer, order = (A.opts && A.opts[id]) || q.options.map((_,i)=>i);
    const el = document.createElement('div'); el.className='q'; el.id = 'q3r-'+id;
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
  $('#q3again').onclick = () => { QZ3R = null; QZ3 = qz3New(); qz3Save(); renderQuiz3(); window.scrollTo(0,0); };
}
window.addEventListener('hashchange', () => { if(location.hash!=='#quiz3') QZ3R = null; });
