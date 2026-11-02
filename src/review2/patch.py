#!/usr/bin/env python3
"""Review upgrades 2 (2026-11-02), asked for by Eli:
1. Miss choice: after a wrong answer in Review sessions (Due review, Review ahead, practice sets) and on flashcards
   ("Didn't know"), pick how the item is scheduled: Back to day one (default), Drop one step, Keep the same step,
   or Count it as right. The choice can be changed until you move on. Lesson pages and unit quizzes are unchanged.
2. Practice scope: on the Review tab, after picking lessons/units, choose "Everything in these lessons" or
   "Only due or overdue" for both questions and flashcards. The choice is remembered on the device.
Patches index.html in place. Every patch must match exactly once, or nothing is written.
Usage: python3 src/review2/patch.py [path/to/index.html]"""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'index.html')
s = open(PATH, encoding='utf8').read()
if 'function missBox(' in s: sys.exit('Already patched: ' + PATH)

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1: sys.exit(f'PATCH FAILED ({n} matches): {old[:90]!r}')
    s = s.replace(old, new)

# 1. CSS
rep(".del-list{display:grid;gap:10px;margin-top:.6rem}",
".del-list{display:grid;gap:10px;margin-top:.6rem}\n"
"/* Review upgrades 2: miss choice, practice scope */\n"
".miss-box{margin-top:12px;padding:12px 14px;border:1px solid var(--line);border-left:4px solid var(--g2);border-radius:8px;background:var(--surface)}\n"
".miss-box .seg button{font-size:.88rem}\n"
".miss-out{margin:8px 0 0}\n"
".scope-row{margin-top:12px;gap:8px}")

# 2. Helpers: snapshot the schedule before an answer, then re-apply the miss the way the learner picks
rep("function dueList(){",
"""/* Miss choice: how a missed item comes back. Default is the normal rule (back to day one). */
function snapReview(id){ return { r: S.review[id] ? { ...S.review[id] } : null, m: (S.mastered||{})[id] || null }; }
function missStep(snap){ return snap.r ? snap.r.box : snap.m ? LADDER.length-1 : null; }
function applyMiss(id, snap, how, mode){
  if(snap.r) S.review[id] = { ...snap.r }; else delete S.review[id];
  if(snap.m) S.mastered[id] = snap.m; else delete S.mastered[id];
  if(how==='right') return schedule(id, true, mode);
  const cur = missStep(snap);
  if(how==='reset' || cur===null) return schedule(id, false, mode);
  const box = how==='drop' ? Math.max(0, cur-1) : cur;
  delete S.mastered[id];
  S.review[id] = { box, due: daysFromToday(LADDER[box]), t: Date.now() };
  return how;
}
function missBox(id, snap, mode, onPick){
  const cur = missStep(snap), w = document.createElement('div'); w.className = 'miss-box';
  const gap = n => n===1 ? '1 day' : n + ' days';
  const opts = [['reset', 'Back to day one'],
    ...(cur ? [['drop', `Drop one step (${gap(LADDER[cur-1])})`], ['same', `Keep the same step (${gap(LADDER[cur])})`]] : []),
    ['right', 'Count it as right']];
  let chosen = 'reset';
  const result = () => {
    if((S.mastered||{})[id]) return 'Stays mastered.';
    const r = S.review[id]; if(!r) return 'Not scheduled.';
    return `Comes back ${fmtDay(r.due)} · step ${r.box+1} of ${LADDER.length}${chosen==='right' && snap.r && r.due===snap.r.due ? ' (it wasn\\'t due yet, so it keeps its date)' : ''}.`;
  };
  const draw = () => {
    w.innerHTML = `<p style="margin:0 0 8px"><b>You missed this. How should it come back?</b></p><div class="seg" role="group" aria-label="How should this item be scheduled">${opts.map(([k,t])=>`<button type="button" data-k="${k}" aria-pressed="${k===chosen}">${t}</button>`).join('')}</div><p class="small muted miss-out" aria-live="polite">${esc(result())} You can change this until you move on.</p><div class="miss-next"></div>`;
    $$('button[data-k]', w).forEach(b => b.onclick = () => { if(b.dataset.k===chosen) return; chosen = b.dataset.k; applyMiss(id, snap, chosen, mode); save(); refreshChrome(); onPick && onPick(chosen); const nx = $('.miss-next', w).innerHTML; draw(); $('.miss-next', w).innerHTML = nx; w.bindNext && w.bindNext(); });
  };
  draw(); return w;
}
function dueList(){""")

# 3. Session: show the miss choice under the item; flashcards wait for Next after a miss
rep("""<div class="qset" id="rbox"></div><div class="rv-tools">""",
    """<div class="qset" id="rbox"></div><div id="rv-miss"></div><div class="rv-tools">""")
rep("""  const onAnswer = ok => { if(ok) RV.right++; RV.i++; RV.answered = true; const sb=$('#rv-skip'), sn=$('#rv-skipnote'); if(sb) sb.hidden = true; if(sn) sn.hidden = true; schedule(id, ok, RV.mode); save(); refreshChrome(); };""",
"""  const onAnswer = ok => { const snap = snapReview(id); if(ok) RV.right++; RV.i++; RV.answered = true; const sb=$('#rv-skip'), sn=$('#rv-skipnote'); if(sb) sb.hidden = true; if(sn) sn.hidden = true; schedule(id, ok, RV.mode); save(); refreshChrome();
    if(!ok){ const mb = $('#rv-miss'), foot = $('#rbox .fb .q-foot'), box = missBox(id, snap, RV.mode, how => { RV.over = RV.over || {}; if(how==='reset') delete RV.over[id]; else RV.over[id] = how; });
      if(foot) foot.before(box); else if(mb){ mb.innerHTML = ''; mb.appendChild(box); } } };
  const cardNext = () => {
    const mb = $('#rv-miss'), box = mb && mb.firstChild;
    if(!box) return advance();
    const put = () => { const slot = $('.miss-next', box); slot.innerHTML = `<div class="row" style="margin-top:10px"><button class="btn sm" type="button">${RV.i>=RV.items.length?'Finish':'Next'}</button></div>`; const b = $('button', slot); b.onclick = advance; return b; };
    box.bindNext = () => { $('button', $('.miss-next', box)).onclick = advance; };
    put().focus({preventScroll:true}); box.scrollIntoView({block:'nearest'});
  };""")
rep("""  if(CARDS[id]) $('#rbox').appendChild(flashCard(id, { label, onAnswer, onNext: advance }));""",
    """  if(CARDS[id]) $('#rbox').appendChild(flashCard(id, { label, onAnswer, onNext: cardNext }));""")

# 4. End-of-session summary: say how many misses were scheduled another way
rep("""    const msg = RV.mode==='due' ? 'Right answers moved to a longer gap; misses come back tomorrow.' : 'Done. Due items you got right moved to a longer gap; misses come back tomorrow. Other dates didn\\'t change.';""",
"""    const msg = RV.mode==='due' ? 'Right answers moved to a longer gap; misses come back tomorrow unless you chose otherwise.' : 'Done. Due items you got right moved to a longer gap; misses come back tomorrow unless you chose otherwise. Other dates didn\\'t change.';""")
rep("""    const extra = [sk ? `Skipped ${sk} (not scored${RV.mode==='due'?', still due':''})` : '', dl ? `Deleted ${dl}` : ''].filter(Boolean).join(' · ');""",
"""    const ov = Object.values(RV.over||{}), ovn = k => ov.filter(x=>x===k).length;
    const extra = [sk ? `Skipped ${sk} (not scored${RV.mode==='due'?', still due':''})` : '', dl ? `Deleted ${dl}` : '',
      ovn('right') ? `${ovn('right')} miss${ovn('right')>1?'es':''} counted as right` : '', ovn('same') ? `${ovn('same')} kept on the same step` : '', ovn('drop') ? `${ovn('drop')} dropped one step` : ''].filter(Boolean).join(' · ');""")

# 5. Practice scope: everything in the chosen lessons, or only what is due or overdue
rep("""function setSel(v){ try{ localStorage.setItem(RVSEL_KEY, JSON.stringify(v)); }catch(e){} }""",
"""function setSel(v){ try{ localStorage.setItem(RVSEL_KEY, JSON.stringify(v)); }catch(e){} }
const RVSCOPE_KEY = 'micro-rv-scope';
function getScope(){ try{ return localStorage.getItem(RVSCOPE_KEY)==='due' ? 'due' : 'all'; }catch(e){ return 'all'; } }
function setScope(v){ try{ localStorage.setItem(RVSCOPE_KEY, v); }catch(e){} }
const isDueNow = id => !!(S.review[id] && S.review[id].due <= Date.now());""")
rep("""  const qPool = ALLQ().filter(k=>sel.includes(Q[k].lesson) && !isDeleted(k));
  const cPool = Object.keys(CARDS).filter(k=>sel.includes(CARDS[k].lesson) && !isDeleted(k));""",
"""  const scope = getScope();
  const qAll = ALLQ().filter(k=>sel.includes(Q[k].lesson) && !isDeleted(k));
  const cAll = Object.keys(CARDS).filter(k=>sel.includes(CARDS[k].lesson) && !isDeleted(k));
  const qPool = scope==='due' ? qAll.filter(isDueNow) : qAll;
  const cPool = scope==='due' ? cAll.filter(isDueNow) : cAll;""")
rep("""    <p class="muted small">Pick lessons (or a whole unit), then choose questions or flashcards.</p>""",
    """    <p class="muted small">Pick lessons (or a whole unit), choose everything in them or only what's due, then choose questions or flashcards.</p>""")
rep("""    <p class="small muted" style="margin:8px 0 4px">${qPool.length} questions and ${cPool.length} flashcards in your selection</p>
    <div class="row"><button class="btn sm" data-n="10">10 questions</button><button class="btn sm" data-n="20">20 questions</button><button class="btn ghost sm" data-n="all">All ${qPool.length}</button><button class="btn ghost sm" id="rv-cards">Flashcards (${cPool.length})</button></div>""",
"""    <div class="row scope-row"><span class="small muted">Include:</span><span class="seg" role="group" aria-label="Which items to include">${[['all','Everything in these lessons'],['due','Only due or overdue']].map(([k,t])=>`<button type="button" data-scope="${k}" aria-pressed="${scope===k}">${t}</button>`).join('')}</span></div>
    <p class="small muted" style="margin:8px 0 4px">${scope==='due' ? `${qPool.length} of ${qAll.length} questions and ${cPool.length} of ${cAll.length} flashcards in your selection are due or overdue` : `${qPool.length} questions and ${cPool.length} flashcards in your selection`}</p>
    <div class="row"><button class="btn sm" data-n="10"${qPool.length?'':' disabled'}>10 questions</button><button class="btn sm" data-n="20"${qPool.length?'':' disabled'}>20 questions</button><button class="btn ghost sm" data-n="all"${qPool.length?'':' disabled'}>All ${qPool.length}</button><button class="btn ghost sm" id="rv-cards"${cPool.length?'':' disabled'}>Flashcards (${cPool.length})</button></div>
    ${scope==='due' && !qPool.length && !cPool.length ? `<div class="empty" style="margin-top:10px">Nothing in these lessons is due or overdue. Switch to <b>Everything in these lessons</b> to refresh on all of it.</div>` : ''}""")
rep("""  $$('[data-n]').forEach(b=>b.onclick=()=>{ const n=b.dataset.n==='all'?qPool.length:+b.dataset.n; startSession({ title: sel.length===LESSONS.length?'Mixed practice':'Practice: '+sel.map(x=>'Lesson '+LBYID[x].n).join(', '), items: shuffle(qPool).slice(0,n), mode:'free' }); });
  $('#rv-cards').onclick=()=>startSession({ title:'Flashcards', items: shuffle(cPool), mode:'free' });""",
"""  const dueTag = scope==='due' ? ' (due only)' : '';
  $$('[data-scope]').forEach(b=>b.onclick=()=>{ setScope(b.dataset.scope); renderReview(); });
  $$('[data-n]').forEach(b=>b.onclick=()=>{ const n=b.dataset.n==='all'?qPool.length:+b.dataset.n; startSession({ title: (sel.length===LESSONS.length?'Mixed practice':'Practice: '+sel.map(x=>'Lesson '+LBYID[x].n).join(', '))+dueTag, items: shuffle(qPool).slice(0,n), mode:'free' }); });
  $('#rv-cards').onclick=()=>startSession({ title:'Flashcards'+dueTag, items: shuffle(cPool), mode:'free' });""")

# 6. "How the schedule works" explains the new choices
rep("""<p><b>Skip</b> moves on without scoring; the item stays due.""",
"""<p><b>After a miss</b> (Review, practice sets and flashcards), you choose how it comes back: <b>Back to day one</b> (the normal rule), <b>Drop one step</b>, <b>Keep the same step</b>, or <b>Count it as right</b>. Lesson pages and unit quizzes always use the normal rule.</p><p><b>Include</b> under Practice any time: <b>Everything in these lessons</b> to refresh on all of it, or <b>Only due or overdue</b> for just what your schedule says needs review.</p><p><b>Skip</b> moves on without scoring; the item stays due.""")

open(PATH, 'w', encoding='utf8').write(s)
print('Patched', PATH)
