#!/usr/bin/env python3
"""Review upgrades (2026-10-28): Skip, Delete (with reasons, restorable), 1-3 rating, and practice that counts as review.
Patches index.html in place (the live page). Every patch must match exactly once, or nothing is written.
Unit 3 staging is then rebuilt from the patched page with src/unit3/build.py, so both copies get the same code.
Usage: python3 src/review/patch.py [path/to/index.html]"""
import os, sys, subprocess, tempfile
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'index.html')
s = open(PATH, encoding='utf8').read()
if 'function rateBox(' in s: sys.exit('Already patched: ' + PATH)

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1: sys.exit(f'PATCH FAILED ({n} matches): {old[:90]!r}')
    s = s.replace(old, new)

# 1. CSS
rep(".linkbtn.danger{color:var(--bad)}",
".linkbtn.danger{color:var(--bad)}\n"
"/* Review upgrades: skip, delete, rating */\n"
".rv-tools{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:12px}\n"
".rate-row{margin-top:10px}\n"
".rate{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.85rem;color:var(--muted)}\n"
".rate .seg button{padding:3px 12px}\n"
".del-box{margin-top:10px;padding:12px 14px;border:1px dashed var(--line);border-radius:8px;background:var(--surface-2)}\n"
".del-box textarea{width:100%;margin-top:4px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit;resize:vertical}\n"
".del-list{display:grid;gap:10px;margin-top:.6rem}")

# 2. State: deleted items and ratings (synced with the rest of the progress record)
rep("mastered:{}, writing:{}, reports:[] }; }", "mastered:{}, writing:{}, reports:[], deleted:{}, ratings:{} }; }")
rep("st.reports=st.reports||[]; return st; }", "st.reports=st.reports||[]; st.deleted=st.deleted||{}; st.ratings=st.ratings||{}; return st; }")

# 3. Practice counts as review: a right answer on an item that is due today moves it up the ladder, as in Due review
rep("  const today = startOfDay(Date.now()), r = S.review[id];\n",
    "  const today = startOfDay(Date.now()), r = S.review[id];\n"
    "  if(ok && r && (mode==='free' || mode==='practice') && r.due <= Date.now()) mode = 'due';\n")

# 4. Deleted items leave Review and practice (they stay on lesson pages)
rep("const reviewable = id => !!(Q[id] || CARDS[id]);",
    "const isDeleted = id => !!(S.deleted && S.deleted[id]);\n"
    "const reviewable = id => !!(Q[id] || CARDS[id]) && !isDeleted(id);\n"
    "const DEL_REASONS = { easy:'Too easy', confusing:'Confusing', offtopic:'Not useful for the exam', repetitive:'Repetitive', wrong:'Wrong or broken', dislike:'Just don\\'t like it' };\n"
    "/* 1-3 rating (1 = worst, 3 = best). Stored only, for a future algorithm. */\n"
    "function rateBox(id){\n"
    "  const w = document.createElement('span'); w.className = 'rate';\n"
    "  const draw = () => {\n"
    "    const cur = ((S.ratings||{})[id]||{}).r || 0;\n"
    "    w.innerHTML = `<span>Rate it (1 worst, 3 best)</span><span class=\"seg\" role=\"group\" aria-label=\"Rate this from 1, worst, to 3, best\">${[1,2,3].map(n=>`<button type=\"button\" data-v=\"${n}\" aria-pressed=\"${cur===n}\">${n}</button>`).join('')}</span>${cur?`<span>${['','Worst','Okay','Best'][cur]} · tap again to clear</span>`:''}`;\n"
    "    w.querySelectorAll('button').forEach(b => b.onclick = () => { const v = +b.dataset.v; S.ratings = S.ratings || {}; if(cur===v) delete S.ratings[id]; else S.ratings[id] = { r:v, at:Date.now() }; save(); draw(); });\n"
    "  };\n"
    "  draw(); return w;\n"
    "}")

# 5. Rating on questions (after answering, everywhere qCard shows feedback)
rep("    onAnswer && onAnswer(ok);\n  };\n  draw();\n  return el;\n}\n\n/* ---------- flashcard",
    "    const rr = document.createElement('div'); rr.className = 'rate-row'; rr.appendChild(rateBox(qid)); fb.appendChild(rr);\n"
    "    onAnswer && onAnswer(ok);\n  };\n  draw();\n  return el;\n}\n\n/* ---------- flashcard")

# 6. Rating on flashcards (back of the card, before Knew it / Didn't know)
rep("      body = gradeHTML() + backHTML(c) +", "      body = gradeHTML() + backHTML(c) + '<div class=\"rate-row\"></div>' +")
rep("    const back = state==='back';\n", "    const back = state==='back';\n    if(back){ const rr = $('.rate-row', el); if(rr) rr.appendChild(rateBox(cid)); }\n")

# 7. Review tab: pools skip deleted items, updated explainer, Deleted list
rep("  const qPool = ALLQ().filter(k=>sel.includes(Q[k].lesson));\n  const cPool = Object.keys(CARDS).filter(k=>sel.includes(CARDS[k].lesson));",
    "  const qPool = ALLQ().filter(k=>sel.includes(Q[k].lesson) && !isDeleted(k));\n  const cPool = Object.keys(CARDS).filter(k=>sel.includes(CARDS[k].lesson) && !isDeleted(k));")
rep("<p>Practicing ahead or by lesson never pushes items further out, but misses always count, so anything you miss comes back tomorrow.</p>",
    "<p>Practice by lesson or unit counts too: get a question right that is <b>due today</b> and it moves up the ladder, just as in Due review. Items that aren't due yet keep their dates (Review ahead works the same way). Misses always count, so anything you miss comes back tomorrow.</p>"
    "<p><b>Skip</b> moves on without scoring; the item stays due. <b>Delete</b> takes an item out of Review and practice (it stays on its lesson page); restore it any time under Deleted at the bottom of this page.</p>")
rep("  $('#rv-cards').onclick=()=>startSession({ title:'Flashcards', items: shuffle(cPool), mode:'free' });\n}",
    "  $('#rv-cards').onclick=()=>startSession({ title:'Flashcards', items: shuffle(cPool), mode:'free' });\n  app.appendChild(deletedSection());\n}\n"
    "function deletedSection(){\n"
    "  const wrap = document.createElement('div'), D = S.deleted || {};\n"
    "  const ids = Object.keys(D).sort((a,b) => (D[b].at||0) - (D[a].at||0));\n"
    "  if(!ids.length) return wrap;\n"
    "  wrap.innerHTML = `<details class=\"deeper\" id=\"rv-deleted\" style=\"margin-top:1.4rem\"><summary>Deleted (${ids.length})</summary><div class=\"deeper-body\"><p class=\"small muted\" style=\"margin-top:0\">Questions and flashcards you took out of Review and practice. They still appear on their lesson pages. Claude can read this list and your reasons to learn what you don't like.</p><div class=\"del-list\"></div></div></details>`;\n"
    "  const list = $('.del-list', wrap);\n"
    "  ids.forEach(id => {\n"
    "    const d = D[id], L = LBYID[d.lesson], it = document.createElement('div'); it.className = 'rep-item';\n"
    "    it.innerHTML = `<div class=\"rep-top\"><span class=\"rep-where\">${d.kind==='card'?'Flashcard':'Question'}${L?' · Lesson '+L.n:''}</span><span class=\"small muted\">Deleted ${shortDay(d.at)}</span></div><p class=\"rep-snip\">${esc(d.txt||id)}</p>${(d.reasons||[]).length?`<div class=\"chips\">${d.reasons.map(r=>`<span class=\"chip\">${esc(DEL_REASONS[r]||r)}</span>`).join('')}</div>`:''}${d.note?`<p class=\"rep-note\">${esc(d.note)}</p>`:''}<div class=\"rep-foot\"><button type=\"button\" class=\"linkbtn restore\">Restore</button></div>`;\n"
    "    $('.restore', it).onclick = () => { delete S.deleted[id]; save(); refreshChrome(); renderReview(); const det = $('#rv-deleted'); if(det) det.open = true; };\n"
    "    list.appendChild(it);\n"
    "  });\n"
    "  return wrap;\n"
    "}")

# 8. Session: Skip and Delete buttons, score leaves out skipped items
rep("    const msg = RV.mode==='due' ? 'Right answers moved to a longer gap; misses come back tomorrow.' : 'Done. Anything you missed comes back in Review tomorrow; your other schedule dates didn\\'t change.';\n"
    "    app.innerHTML = `<div class=\"lesson-head\"><div class=\"eyebrow\">${RV.title} · finished</div><p class=\"score-big num\">${RV.right}/${RV.items.length}</p><p>${msg}</p></div>",
    "    const msg = RV.mode==='due' ? 'Right answers moved to a longer gap; misses come back tomorrow.' : 'Done. Due items you got right moved to a longer gap; misses come back tomorrow. Other dates didn\\'t change.';\n"
    "    const sk = RV.skipped||0, dl = RV.deleted||0;\n"
    "    const extra = [sk ? `Skipped ${sk} (not scored${RV.mode==='due'?', still due':''})` : '', dl ? `Deleted ${dl}` : ''].filter(Boolean).join(' · ');\n"
    "    app.innerHTML = `<div class=\"lesson-head\"><div class=\"eyebrow\">${RV.title} · finished</div><p class=\"score-big num\">${RV.right}/${RV.items.length-sk}</p><p>${msg}</p>${extra?`<p class=\"muted\">${extra}.</p>`:''}</div>")
rep("<div class=\"qset\" id=\"rbox\"></div>`;\n  $('#rv-quit').onclick=()=>{ RV.items = RV.items.slice(0, RV.i); runSession(); };",
    "<div class=\"qset\" id=\"rbox\"></div><div class=\"rv-tools\"><button class=\"btn ghost sm\" id=\"rv-skip\" type=\"button\">Skip</button><button class=\"btn ghost sm\" id=\"rv-del\" type=\"button\">Delete</button><span class=\"small muted\" id=\"rv-skipnote\">Skip: not scored${RV.mode==='due'?', stays due':''}</span></div><div id=\"rv-delbox\"></div>`;\n"
    "  $('#rv-quit').onclick=()=>{ RV.items = RV.items.slice(0, RV.i); runSession(); };\n"
    "  RV.answered = false;")
rep("  const onAnswer = ok => { if(ok) RV.right++; RV.i++; schedule(id, ok, RV.mode); save(); refreshChrome(); };",
    "  const onAnswer = ok => { if(ok) RV.right++; RV.i++; RV.answered = true; const sb=$('#rv-skip'), sn=$('#rv-skipnote'); if(sb) sb.hidden = true; if(sn) sn.hidden = true; schedule(id, ok, RV.mode); save(); refreshChrome(); };\n"
    "  $('#rv-skip').onclick = () => { if(RV.answered) return; RV.skipped = (RV.skipped||0) + 1; RV.i++; advance(); };\n"
    "  $('#rv-del').onclick = () => {\n"
    "    const box = $('#rv-delbox'); if(box.firstChild){ box.innerHTML = ''; return; }\n"
    "    box.innerHTML = `<div class=\"del-box\"><p style=\"margin:0 0 6px\"><b>Delete from Review and practice?</b> It stays on its lesson page. You can restore it under Deleted on the Review tab.</p><p class=\"small muted\" style=\"margin:0 0 4px\">Why? Tap any that fit (optional):</p><div class=\"chips\">${Object.entries(DEL_REASONS).map(([k,v])=>`<button type=\"button\" class=\"chipbtn\" data-r=\"${k}\" aria-pressed=\"false\">${v}</button>`).join('')}</div><label class=\"small muted\" for=\"del-note\" style=\"display:block;margin-top:8px\">Anything else? (optional)</label><textarea id=\"del-note\" rows=\"2\" maxlength=\"500\"></textarea><p class=\"small muted\" id=\"del-wrong\" hidden>To get a wrong item fixed rather than hidden, use Report a problem on it too.</p><div class=\"row\" style=\"margin-top:8px\"><button class=\"btn sm\" id=\"del-go\" type=\"button\">Delete it</button><button class=\"btn ghost sm\" id=\"del-cancel\" type=\"button\">Cancel</button></div></div>`;\n"
    "    $$('.chipbtn', box).forEach(b => b.onclick = () => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed')==='true' ? 'false' : 'true'); $('#del-wrong').hidden = !$('.chipbtn[data-r=\"wrong\"][aria-pressed=\"true\"]', box); });\n"
    "    $('#del-cancel').onclick = () => { box.innerHTML = ''; };\n"
    "    $('#del-go').onclick = () => {\n"
    "      const isCard = !!CARDS[id] && !Q[id], c = CARDS[id];\n"
    "      let txt = ''; try{ txt = isCard ? `${c.t}${c.q?': '+c.q:''}` : textOf($('.q-prompt', $('#rbox'))); }catch(e){}\n"
    "      S.deleted = S.deleted || {};\n"
    "      S.deleted[id] = { at:Date.now(), kind: isCard?'card':'question', lesson:(Q[id]||CARDS[id]).lesson, reasons: $$('.chipbtn[aria-pressed=\"true\"]', box).map(b=>b.dataset.r), note: $('#del-note').value.trim().slice(0,500), txt: String(txt).replace(/\\s+/g,' ').trim().slice(0,300) };\n"
    "      save(); refreshChrome(); RV.deleted = (RV.deleted||0) + 1;\n"
    "      if(RV.answered) advance(); else { RV.items.splice(RV.i, 1); advance(); }\n"
    "    };\n"
    "    $('#del-note').focus();\n"
    "  };")

open(PATH, 'w', encoding='utf8').write(s)
i = s.index('<script>') + 8; j = s.rindex('</script>')
tf = tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, dir=os.environ.get('TMPDIR', '/tmp')); tf.write(s[i:j]); tf.close()
r = subprocess.run(['node', '--check', tf.name], capture_output=True, text=True); os.unlink(tf.name)
if r.returncode: sys.exit('SYNTAX ERROR\n' + r.stderr[:1500])
print('patched', PATH, len(s), 'bytes')
