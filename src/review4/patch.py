#!/usr/bin/env python3
"""Review upgrades 4 (2026-11-09), asked for by Eli because Review had grown to 781 items (460 due in one day):
1. Optional extras. "More practice" questions and quick checks no longer join Review on their own.
   Each one shows "Add to Review" after it is answered (and "Remove from Review" once it's in).
   Core lesson questions, unit quiz questions and flashcards still join automatically.
   One-time move: optional items already in Review are taken out and their schedule is kept in S.parked,
   so adding one back restores its step. Nothing is deleted; practice records are untouched.
2. Lucky guess. After a right answer (lesson pages, quick checks, Review, practice sets, single-question view;
   not unit quizzes), "Lucky guess? Count it as a miss" turns it into a miss: the item is rescheduled as a miss,
   Review and practice sets then offer the usual "How should it come back?" choices, and the session score drops
   by one. "Undo" puts it back as right.
Patches index.html in place. Every patch must match the stated number of times, or nothing is written.
Usage: python3 src/review4/patch.py [path/to/index.html]"""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'index.html')
s = open(PATH, encoding='utf8').read()
if 'function isOptional(' in s: sys.exit('Already patched: ' + PATH)

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count: sys.exit(f'PATCH FAILED ({n} matches, expected {count}): {old[:90]!r}')
    s = s.replace(old, new)

# 1. CSS
rep(".miss-box .seg button{font-size:.88rem}",
    ".miss-box .seg button{font-size:.88rem}\n"
    "/* Review upgrades 4: optional extras, lucky guess */\n"
    ".verdict .lucky{margin-left:10px;font-size:.85rem;font-weight:400}\n"
    ".opt-rv{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;margin-left:auto}")

# 2. Progress doc gains `parked`
rep("st.written=st.written||{}; return st; }",
    "st.written=st.written||{}; st.parked=st.parked||{}; return st; }")

# 3. Gate: optional items are never added to Review by answering them
rep("function schedule(id, ok, mode){\n  const today = startOfDay(Date.now()), r = S.review[id];",
    "function schedule(id, ok, mode){\n  if(!S.review[id] && !(S.mastered||{})[id] && (mode==='practice' || mode==='free') && isOptional(id)) return 'optional';\n  const today = startOfDay(Date.now()), r = S.review[id];")

# 4. Helpers
rep("const isDeleted = id => !!(S.deleted && S.deleted[id]);",
r"""/* ---------- Review upgrades 4 (2026-11-09): optional extras and Lucky guess ---------- */
/* "More practice" questions and quick checks are optional: they join Review only when Eli taps Add to Review.
   Core lesson questions, unit quiz questions and flashcards still join automatically.
   S.parked keeps the schedule of optional items taken out of Review, so adding one back restores its step. */
function isOptional(id){ const q = Q[id]; if(!q || q.quiz) return false; const L = LBYID[q.lesson]; return !!L && !L.core.includes(id); }
function parkOptional(){
  if(S.trim1) return 0; let n = 0; S.parked = S.parked || {};
  Object.keys(S.review).forEach(id => { if(isOptional(id)){ S.parked[id] = { ...S.review[id], at: Date.now() }; delete S.review[id]; n++; } });
  S.trim1 = Date.now(); return n || 1;
}
function restoreSnap(id, snap){ if(snap.r) S.review[id] = { ...snap.r }; else delete S.review[id]; if(snap.m) S.mastered[id] = snap.m; else delete S.mastered[id]; }
function addOptional(id, ok){
  S.parked = S.parked || {}; const p = S.parked[id], now = Date.now();
  if(!ok) S.review[id] = { box:0, due: daysFromToday(1), t: now };
  else if(p) S.review[id] = { box: p.box, due: p.due > now ? p.due : daysFromToday(LADDER[p.box]), t: now };
  else S.review[id] = { box:2, due: daysFromToday(LADDER[2]), t: now };
  delete S.parked[id]; delete S.mastered[id];
}
function removeOptional(id){ S.parked = S.parked || {}; if(S.review[id]) S.parked[id] = { ...S.review[id], at: Date.now() }; delete S.review[id]; }
function optBox(qid, getOk){
  const w = document.createElement('span'); w.className = 'opt-rv';
  const draw = () => {
    const r = S.review[qid];
    w.innerHTML = r ? `<span class="small muted">In Review · back ${fmtDay(r.due)}</span><button type="button" class="btn ghost sm">Remove from Review</button>`
                    : `<button type="button" class="btn ghost sm">Add to Review</button><span class="small muted">Optional · not in Review</span>`;
    $('button', w).onclick = () => { if(S.review[qid]) removeOptional(qid); else addOptional(qid, getOk()); save(); refreshChrome(); draw(); };
  };
  w.redraw = draw; draw(); return w;
}
/* onAnswer + onLucky for questions that count as lesson practice (lesson pages, single-question view). */
function practiceHandlers(qid, after){
  let pre = null;
  return {
    onAnswer: ok => { const lid = Q[qid].lesson; pre = { snap: snapReview(qid), prac: (((S.lessons[lid]||{}).practice)||{})[qid] }; recordPractice(qid, ok); after && after(); },
    onLucky: lucky => {
      if(!pre) return; const lid = Q[qid].lesson, wasIn = !!S.review[qid];
      restoreSnap(qid, pre.snap); const P = S.lessons[lid].practice; if(pre.prac) P[qid] = { ...pre.prac }; else delete P[qid];
      recordPractice(qid, !lucky);
      if(wasIn && !S.review[qid]){ addOptional(qid, !lucky); save(); refreshChrome(); }
      after && after();
    }
  };
}
const isDeleted = id => !!(S.deleted && S.deleted[id]);""")

# 5. One-time move runs wherever auto flashcards sync (after local or cloud progress loads)
rep("function syncAutoCards(){ let n = 0; LESSONS.forEach",
    "function syncAutoCards(){ let n = parkOptional(); LESSONS.forEach")

# 6. Question card: Lucky guess link, Add/Remove for optional items
rep("function qCard(qid, { ctx, label, onAnswer, onNext, nextLabel }){",
    "function qCard(qid, { ctx, label, onAnswer, onNext, nextLabel, onLucky }){")
rep("""    fb.innerHTML = `<p class="verdict ${ok?'good':'bad'}">${ok?pick(['Correct.','Right.','Yes, that\\'s it.']):""",
    """    el._ok = ok; const okTxt = pick(['Correct.','Right.','Yes, that\\'s it.']);
    fb.innerHTML = `<p class="verdict ${ok?'good':'bad'}"><span class="vt">${ok?okTxt:""")
rep("""'Not quite. Here\\'s how it works:')}</p>${inst.type==='text' ? textFb(inst)""",
    """'Not quite. Here\\'s how it works:')}</span></p>${inst.type==='text' ? textFb(inst)""")
rep("""    const rr = document.createElement('div'); rr.className = 'rate-row'; rr.appendChild(rateBox(qid)); if(ctx!=='quiz') qExtras(qid, inst, rr, ctx); fb.appendChild(rr);
    onAnswer && onAnswer(ok);""",
    """    const rr = document.createElement('div'); rr.className = 'rate-row'; rr.appendChild(rateBox(qid)); if(ctx!=='quiz') qExtras(qid, inst, rr, ctx); fb.appendChild(rr);
    const ob = ctx!=='quiz' && isOptional(qid) ? optBox(qid, () => el._ok) : null; if(ob) rr.prepend(ob);
    if(ok && ctx!=='quiz'){
      const v = $('.verdict', fb), lk = document.createElement('button'); lk.type = 'button'; lk.className = 'linkbtn lucky'; let lucky = false;
      const drawLk = () => { v.className = 'verdict ' + (lucky ? 'bad' : 'good'); $('.vt', v).textContent = lucky ? 'Counted as a miss (lucky guess).' : okTxt; lk.textContent = lucky ? 'Undo' : 'Lucky guess? Count it as a miss'; };
      lk.onclick = () => { lucky = !lucky; el._ok = !lucky; drawLk(); onLucky && onLucky(lucky); if(ob) ob.redraw(); };
      v.appendChild(lk); drawLk();
    }
    onAnswer && onAnswer(ok);""")

# 7. Lesson page: practice handlers, honest status, note on the More practice bar, quick-check label
rep("""  const status = q => rec[q] ? (rec[q].ok?' · answered ✓':' · answered, review pending') : '';
  const onAns = qid => ok => { recordPractice(qid, ok); const pp=lessonProgress(L); $('#pp').textContent=`${pp.done}/${pp.total} answered`; };""",
    """  const status = q => rec[q] ? (rec[q].ok?' · answered ✓': S.review[q] ? ' · answered, review pending' : ' · answered, missed') : '';
  const onAns = qid => practiceHandlers(qid, () => { const pp=lessonProgress(L); $('#pp').textContent=`${pp.done}/${pp.total} answered`; });""")
rep("onAnswer: onAns(qid) })", "...onAns(qid) })", 2)
rep("""More practice · ${Math.min(4,left)} more (${left} left)</button>` :""",
    """More practice · ${Math.min(4,left)} more (${left} left)</button><p class="small muted" style="margin:6px 0 0">Extra questions are optional: they go into Review only if you tap <b>Add to Review</b> on one.</p>` :""")
rep("Quick check · not scheduled for review", "Quick check · optional, not in Review unless you add it")

# 8. Single-question view
rep("""    onAnswer: ok => { if(!q.quiz) recordPractice(qid, ok); } }));""",
    """    ...(q.quiz ? {} : practiceHandlers(qid)) }));""")

# 9. Review sessions and practice sets
rep("""  const onAnswer = ok => { const snap = snapReview(id); if(ok) RV.right++; RV.i++; RV.answered = true; const sb=$('#rv-skip'), sn=$('#rv-skipnote'); if(sb) sb.hidden = true; if(sn) sn.hidden = true; schedule(id, ok, RV.mode); save(); refreshChrome();
    if(!ok){ const mb = $('#rv-miss'), foot = $('#rbox .fb .q-foot'), box = missBox(id, snap, RV.mode, how => { RV.over = RV.over || {}; if(how==='reset') delete RV.over[id]; else RV.over[id] = how; });
      if(foot) foot.before(box); else if(mb){ mb.innerHTML = ''; mb.appendChild(box); } } };""",
    """  let snap0 = null;
  const showMiss = () => { const mb = $('#rv-miss'), foot = $('#rbox .fb .q-foot'), box = missBox(id, snap0, RV.mode, how => { RV.over = RV.over || {}; if(how==='reset') delete RV.over[id]; else RV.over[id] = how; });
      if(foot) foot.before(box); else if(mb){ mb.innerHTML = ''; mb.appendChild(box); } };
  const onAnswer = ok => { snap0 = snapReview(id); if(ok) RV.right++; RV.i++; RV.answered = true; const sb=$('#rv-skip'), sn=$('#rv-skipnote'); if(sb) sb.hidden = true; if(sn) sn.hidden = true; const res = schedule(id, ok, RV.mode); save(); refreshChrome();
    if(!ok && res!=='optional') showMiss(); };
  const onLucky = lucky => {
    RV.lucky = (RV.lucky||0) + (lucky ? 1 : -1); RV.right += lucky ? -1 : 1;
    $$('.miss-box', app).forEach(b => b.remove()); if(RV.over) delete RV.over[id];
    const wasIn = !!S.review[id]; restoreSnap(id, snap0); const res = schedule(id, !lucky, RV.mode);
    if(wasIn && !S.review[id] && isOptional(id)) addOptional(id, !lucky);
    save(); refreshChrome(); if(lucky && res!=='optional') showMiss(); };""")
rep("qCard(id, { ctx:'review', label, nextLabel: RV.i===RV.items.length-1?'Finish':'Next', onAnswer, onNext: advance }",
    "qCard(id, { ctx:'review', label, nextLabel: RV.i===RV.items.length-1?'Finish':'Next', onAnswer, onLucky, onNext: advance }")
rep("""ovn('drop') ? `${ovn('drop')} dropped one step` : ''].filter(Boolean)""",
    """ovn('drop') ? `${ovn('drop')} dropped one step` : '', RV.lucky ? `${RV.lucky} lucky guess${RV.lucky>1?'es':''} counted as miss${RV.lucky>1?'es':''}` : ''].filter(Boolean)""")

# 10. "How the schedule works"
rep("""<p>Every question and flashcard you answer is scheduled. <b>Miss it</b> and it comes back tomorrow. <b>Get it right</b> the first time and it comes back in a week.</p>""",
    """<p>Every core lesson question, unit quiz question and flashcard you answer is scheduled. <b>Miss it</b> and it comes back tomorrow. <b>Get it right</b> the first time and it comes back in a week.</p><p><b>Extra ("More practice") questions and quick checks are optional.</b> They go into Review only when you tap <b>Add to Review</b> on one, and <b>Remove from Review</b> takes one back out (its step is remembered).</p><p><b>Lucky guess:</b> after a right answer, tap <b>Lucky guess? Count it as a miss</b> if you didn't really know it. It's scheduled as a miss (and in Review and practice sets you choose how it comes back). <b>Undo</b> puts it back as right.</p>""")

open(PATH, 'w', encoding='utf8').write(s)
print('Patched', PATH)
