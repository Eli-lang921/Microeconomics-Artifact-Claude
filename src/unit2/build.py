#!/usr/bin/env python3
"""Assemble the staging workbook: live snapshot + Unit 2 files + minimal app patches.
Every patch must match exactly once, or the build stops."""
import os, sys
W = os.path.dirname(os.path.abspath(__file__)); U = os.path.join(W, 'u2')
src = open(os.path.join(W, 'live-snapshot-2026-10-22.html'), encoding='utf8').read()
rd = lambda f: open(os.path.join(U, f), encoding='utf8').read()
LESSON_IDS = [x for x in ['l6','l7','l8','l9','l10','l11','l12'] if os.path.exists(os.path.join(U, x+'.q.js'))]

def rep(s, old, new, count=1):
    n = s.count(old)
    if n != count: sys.exit(f'PATCH FAILED ({n} matches): {old[:90]!r}')
    return s.replace(old, new)

s = src
# staging identity (title + brand only)
LIVE = os.environ.get('LIVE') == '1'
if not LIVE:
    s = rep(s, '<title>Microeconomics Workbook</title>', '<title>Microeconomics Workbook (Staging)</title>')
    s = rep(s, '<a class="brand" href="#home">Microeconomics Workbook</a>', '<a class="brand" href="#home">Microeconomics Workbook · Staging</a>')

# CSS additions (quiz 2 selection state and question palette; neutral colors only, never right/wrong colors)
s = rep(s, '@media (max-width:520px){.widget[data-widget="circular"] svg text.halo{font-size:13.5px!important}}\n</style>',
  '@media (max-width:520px){.widget[data-widget="circular"] svg text.halo{font-size:13.5px!important}}\n'
  '/* Unit 2 quiz: selected answer (neutral) and question palette */\n'
  '/* Unit 2 lesson figures */\n'
  '.u2fig{margin:1.2rem 0;padding:12px 14px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface)}.u2fig>.qg{max-width:440px;margin:0 auto}.u2fig figcaption{font-size:.9rem;color:var(--muted);margin-top:8px;line-height:1.45}\n'
  '.u2row{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:12px}.u2cell .qg{max-width:none;margin:.2rem 0 0}.u2t{margin:0;font-weight:700;font-size:.92rem;text-align:center}.u2fig svg.u2bars{width:100%;height:auto;display:block}\n'
  '.opt.sel{border-color:var(--accent);background:var(--accent-soft)}.opt.sel .ol{border-color:var(--accent);color:var(--accent)}\n'
  '.qpal{display:flex;flex-wrap:wrap;gap:6px}.qpal button{width:2.3rem;height:2.3rem;border-radius:8px;border:1px solid var(--line);background:var(--surface);font-weight:600;font-size:.88rem;color:var(--muted)}\n'
  '.qpal button.done{background:var(--surface-2);color:var(--ink)}.qpal button.cur{border:2px solid var(--accent);color:var(--ink)}\n'
  '.unit-quiz{margin-top:4px}\n</style>')

# state: separate Unit 2 quiz results
s = rep(s, "function blankState(){ return { v:1, updated:0, lessons:{}, quiz:{best:null,last:null,attempts:0}, review:{}",
           "function blankState(){ return { v:1, updated:0, lessons:{}, quiz:{best:null,last:null,attempts:0}, quiz2:{best:null,last:null,attempts:0,history:[]}, review:{}")
s = rep(s, "function normalize(st){ st.lessons=st.lessons||{}; st.quiz=st.quiz||{best:null,last:null,attempts:0};",
           "function normalize(st){ st.lessons=st.lessons||{}; st.quiz=st.quiz||{best:null,last:null,attempts:0}; st.quiz2=st.quiz2||{best:null,last:null,attempts:0,history:[]};")

# A: Unit 2 questions, tags, cards, writing, plans, lesson objects (after Unit 1 tags, before the number-order fix line)
partA = rd('core.js') + '\n' + rd('figs.js') + '\n' + '\n'.join(rd(x+'.q.js') for x in LESSON_IDS) + '\n' + rd('fixes.js') + '\n'
s = rep(s, "['l1-shift','l3-terms','l3-terms2'].forEach(id => { Q[id].keepOrder = true; });", partA + "['l1-shift','l3-terms','l3-terms2'].forEach(id => { Q[id].keepOrder = true; });")
# B: Unit 2 quiz pool, after Unit 1 quiz pool
partB = rd('quiz2.q.js') + ('\n' + rd('quiz2.items.js') if os.path.exists(os.path.join(U,'quiz2.items.js')) else '') + ('\n' + rd('order.js') if os.path.exists(os.path.join(U,'order.js')) else '') + '\n'
s = rep(s, "/* ===== Flashcards (key terms) =====", partB + "/* ===== Flashcards (key terms) =====")
# C: cards
s = rep(s, "const CARDS = {}, BASE_CARDS = {};", "Object.assign(CARD_LIST, U2_CARDS);\nconst CARDS = {}, BASE_CARDS = {};")
# D, E: writing and plans
s = rep(s, "/* ===== Per-lesson plan: core (on page), more (behind \"More practice\"), writing, cards ===== */", "Object.assign(WRITE, U2_WRITE);\n/* ===== Per-lesson plan: core (on page), more (behind \"More practice\"), writing, cards ===== */")
s = rep(s, "Object.keys(PLAN).forEach(lid=>{ PLAN[lid].writing", "Object.assign(PLAN, U2_PLAN); /* report r1792717134119-9n7c: l5-g-net removed */ PLAN.l5.more = PLAN.l5.more.filter(id => id!=='l5-g-net'); delete Q['l5-g-net'];\nObject.keys(PLAN).forEach(lid=>{ PLAN[lid].writing")
# F: widgets
partF = rd('w-core.js') + '\n' + '\n'.join(rd(x+'.w.js') for x in LESSON_IDS if os.path.exists(os.path.join(U, x+'.w.js'))) + '\n'
s = rep(s, "/* ---------- lessons ---------- */\nconst LESSONS = [", partF + "/* ---------- lessons ---------- */\nconst LESSONS = [")
# G: lessons list
s = rep(s, "];\nLESSONS.forEach(l=>{ Object.assign(l, PLAN[l.id]);", "];\nLESSONS.push(...U2_LESSONS); LESSONS.forEach(l=>{ l.unit = l.unit || 1; });\nLESSONS.forEach(l=>{ Object.assign(l, PLAN[l.id]);")
s = rep(s, "const LATER = ['Supply and Demand','Theory of Consumer Choice',", "const LATER = ['Theory of Consumer Choice',")
UNITS = """const UNITS = [
  { n:1, title:'Basic Economic Concepts', quiz:'#quiz', qkey:'quiz', blurb:'From "you can\\'t have everything" to how trade makes everyone richer.' },
  { n:2, title:'Supply and Demand', quiz:'#quiz2', qkey:'quiz2', blurb:'How markets set prices: demand and supply, equilibrium, price controls, elasticity, surplus and taxes.',
    cover:[['Determinants of supply and demand','Lesson 6'],['Market equilibrium','Lesson 7'],['Price and quantity controls','Lessons 8 and 12'],['Elasticity: price elasticity of demand, its determinants and total revenue; price elasticity of supply','Lesson 9'],['Elasticity: income and cross-price elasticity of demand','Lesson 10'],['Consumer surplus, producer surplus, and market efficiency','Lesson 11'],['Tax incidence and deadweight loss','Lesson 12']] }
];
const unitOf = n => UNITS.find(u=>u.n===n);
"""
s = rep(s, "/* ---------- views ---------- */\nlet view='home';", UNITS + "/* ---------- views ---------- */\nlet view='home';")

# routing: #quiz2
s = rep(s, "const tabOf = v => LBYID[v] ? 'home' : v.startsWith('q-') ? 'reports'", "const tabOf = v => LBYID[v] ? 'home' : v==='quiz2' ? 'quiz' : v.startsWith('q-') ? 'reports'")
s = rep(s, "(['quiz','review','reports','cards'].includes(h) ? h", "(['quiz','quiz2','review','reports','cards'].includes(h) ? h")
s = rep(s, "if(view==='home') renderHome(); else if(view==='quiz') renderQuiz();", "if(view==='home') renderHome(); else if(view==='quiz') renderQuiz(); else if(view==='quiz2') renderQuiz2();")

# home page: one card per built unit
i0 = s.index('function renderHome(){'); i1 = s.index('let PENDING = null;')
HOME = r'''function renderHome(){
  const prog = LESSONS.map(lessonProgress);
  const answered = prog.reduce((a,p)=>a+p.done,0);
  const next = LESSONS.find((l,i)=>!prog[i].complete) || null;
  const due = dueList().length;
  const curUnit = next ? next.unit : UNITS[UNITS.length-1].n, CU = unitOf(curUnit);
  const unitCard = U => {
    const ls = LESSONS.filter(l=>l.unit===U.n), pr = ls.map(lessonProgress);
    const doneCount = pr.filter(p=>p.complete).length, ans = pr.reduce((a,p)=>a+p.done,0), total = pr.reduce((a,p)=>a+p.total,0);
    const best = S[U.qkey].best, nq = U.n===1 ? QUIZ.length : QUIZ2.length;
    return `<section class="unit">
    <div class="unit-head"><h2 style="margin:0;font-size:1.15rem">Unit ${U.n}: ${U.title}</h2><span class="small muted num">${doneCount} of ${ls.length} done · ${ans}/${total} core practice</span></div>
    <p class="small muted" style="margin:.3rem 0 0">${U.blurb}</p>
    ${U.cover?`<details class="small" style="margin-top:.5rem"><summary>What the CLEP outline lists for this unit, and where it's taught</summary><ul style="margin:.4rem 0 0">${U.cover.map(([t,w])=>`<li>${t}: <span class="muted">${w}</span></li>`).join('')}</ul><p class="muted" style="margin:.3rem 0 0">Supply and demand is about 15% to 20% of the exam (College Board outline).</p></details>`:''}
    <div class="bar" style="margin-top:10px"><span style="width:${total?ans/total*100:0}%"></span></div>
    <ol class="lesson-list">${ls.map(l=>{ const p=lessonProgress(l); return `<li><a class="lesson-row" href="#${l.id}"><span class="lnum">${LBYID[l.id].n}</span><span class="lt">${l.title}<br><span class="small muted" style="font-weight:400">${l.oneline}</span></span><span class="ls ${p.complete?'done':''}">${p.complete?'Done':p.done?`${p.done}/${p.total}`:`~${l.mins} min`}${p.more?`<br><span class="muted" style="font-weight:400">+${p.more} extra</span>`:''}</span></a></li>`; }).join('')}
      <li><a class="lesson-row" href="${U.quiz}"><span class="lnum">✓</span><span class="lt">Unit ${U.n} quiz<br><span class="small muted" style="font-weight:400">${nq} exam-style questions across all ${ls.length} lessons${U.n===2?'; results after you submit':''}</span></span><span class="ls ${best!==null&&best>=80?'done':''}">${best===null?'Not taken':`Best ${best}%`}</span></a></li></ol>
  </section>`; };
  app.innerHTML = `
  <section class="hero">
    <div class="eyebrow">Principles of Microeconomics · CLEP prep</div>
    <h1 style="margin-top:.4rem">Unit ${CU.n}: ${CU.title}</h1>
    <p>Each lesson has interactive graphs, 12 practice questions with 16 more on demand, optional writing prompts and flashcards. Everything you answer comes back in Review on a spaced schedule.</p>
    <div class="row" style="margin-top:1rem">${next?`<a class="btn" href="#${next.id}">${answered?'Continue':'Start'}: Lesson ${LBYID[next.id].n}</a>`:`<a class="btn" href="${CU.quiz}">Take the Unit ${CU.n} quiz</a>`}<a class="btn ghost" href="#review">Review${due?` (${due} due)`:''}</a></div>
  </section>
  ${UNITS.map(unitCard).join('')}
  <div class="callout"><p><b>About the free CLEP voucher.</b> Modern States gives you a voucher for the real CLEP exam once you score 75% or higher on their course's final exam (<a href="https://modernstates.org/blog/how-requests-work/" target="_blank" rel="noopener">how it works</a>). Aim for 80%+ on each unit quiz here so you have margin.</p></div>
  <section class="later"><h2 style="font-size:1.05rem">Later units</h2><p class="small muted">Not built yet. They'll be added to this page one unit at a time, and your progress here will carry over.</p><ol start="${UNITS.length+1}">${LATER.map(t=>`<li>${t}</li>`).join('')}</ol></section>`;
}

'''
s = s[:i0] + HOME + s[i1:]

# lesson page: unit-aware eyebrow and pager
s = rep(s, '<div class="lesson-head"><div class="eyebrow">Unit 1 · Lesson ${L.n} of ${LESSONS.length} · about ${L.mins} min</div>',
           '<div class="lesson-head"><div class="eyebrow">Unit ${L.unit} · Lesson ${L.n} (${LESSONS.filter(x=>x.unit===L.unit).indexOf(LESSONS[i])+1} of ${LESSONS.filter(x=>x.unit===L.unit).length}) · about ${L.mins} min</div>')
s = rep(s, "const prev = LESSONS[i-1], next = LESSONS[i+1];", "const prev = LESSONS[i-1], next = LESSONS[i+1] && LESSONS[i+1].unit===L.unit ? LESSONS[i+1] : null;")
s = rep(s, ":'<a class=\"btn\" href=\"#quiz\">Unit quiz →</a>'}</nav>`;", ":`<a class=\"btn\" href=\"${unitOf(L.unit).quiz}\">Unit ${L.unit} quiz →</a>`}</nav>`;")

# Unit 1 quiz page: add the unit switcher (Unit 1 quiz itself is unchanged)
s = rep(s, '<h1 style="margin-top:.4rem">Unit quiz</h1>\n    <p class="oneline">20 exam-style questions across all five lessons',
           '<h1 style="margin-top:.4rem">Unit 1 quiz</h1>\n    ${quizSwitch(1)}\n    <p class="oneline">20 exam-style questions across all five lessons')
# Unit 2 quiz renderer after the Unit 1 quiz renderer
s = rep(s, "/* review */\nlet RV = null;", rd('quiz2.render.js') + "\n/* review */\nlet RV = null;")

# review page: all units, plus unit chips
s = rep(s, '''app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Unit 1</div><h1 style="margin-top:.4rem">Review</h1>''',
           '''app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Units 1 to ${UNITS.length}</div><h1 style="margin-top:.4rem">Review</h1>''')
s = rep(s, '<p class="muted small">Pick lessons, then choose questions or flashcards. Select all five for a mixed set across the unit.</p>',
           '<p class="muted small">Pick lessons (or a whole unit), then choose questions or flashcards.</p>')
s = rep(s, '''<button class="chipbtn" data-l="${l.id}" aria-pressed="${sel.includes(l.id)}">Lesson ${LBYID[l.id].n}</button>`).join('')}<button class="chipbtn all" data-l="all">All</button></div>''',
           '''<button class="chipbtn" data-l="${l.id}" aria-pressed="${sel.includes(l.id)}">Lesson ${LBYID[l.id].n}</button>`).join('')}${UNITS.map(U=>`<button class="chipbtn all" data-l="u${U.n}">Unit ${U.n}</button>`).join('')}<button class="chipbtn all" data-l="all">All</button></div>''')
s = rep(s, "if(b.dataset.l==='all') s=LESSONS.map(l=>l.id); else {",
           "if(b.dataset.l==='all') s=LESSONS.map(l=>l.id); else if(/^u\\d+$/.test(b.dataset.l)) s=LESSONS.filter(l=>'u'+l.unit===b.dataset.l).map(l=>l.id); else {")
# flashcard library eyebrow
s = rep(s, '''app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Unit 1</div><h1 style="margin-top:.4rem">Flashcards</h1>''',
           '''app.innerHTML = `<div class="lesson-head"><div class="eyebrow">Units 1 to ${UNITS.length}</div><h1 style="margin-top:.4rem">Flashcards</h1>''')
# reports: name the unit quiz
s = rep(s, "const GENERAL_TOPICS = { workbook:'General · the workbook overall', idea:'Idea or feature request', review:'Review tab', quiz:'Unit quiz',",
           "const GENERAL_TOPICS = { workbook:'General · the workbook overall', idea:'Idea or feature request', review:'Review tab', quiz:'Unit 1 quiz', quiz2:'Unit 2 quiz',")
s = rep(s, "const GENERAL_HREF = { review:'#review', quiz:'#quiz', cards:'#cards' };", "const GENERAL_HREF = { review:'#review', quiz:'#quiz', quiz2:'#quiz2', cards:'#cards' };")
s = rep(s, "['quiz','Unit quiz'],['review','Review tab']", "['quiz','Unit 1 quiz'],['quiz2','Unit 2 quiz'],['review','Review tab']")
s = rep(s, "return { title: q.quiz ? `Unit quiz · from Lesson ${L.n}`", "return { title: q.quiz ? `Unit ${L.unit||1} quiz · from Lesson ${L.n}`")

# typed answers checked by Claude (reports on l4-mktsoc and l4-capitalism)
s = rep(s, "const KIND_LABEL = { mc:'Multiple choice', tf:'True or false', graph:'Graph', num:'Worked problem' };", "const KIND_LABEL = { mc:'Multiple choice', tf:'True or false', graph:'Graph', num:'Worked problem', text:'Typed answer' };")
s = rep(s, "             : `<form class=\"numrow\">", "             : inst.type==='text' ? `<form class=\"txtq\"><textarea rows=\"3\" class=\"fc-ta\" aria-label=\"Your answer\" placeholder=\"Type your answer in your own words\"></textarea><div class=\"row\" style=\"margin-top:8px\"><button class=\"btn sm\" type=\"submit\">Check with Claude</button><button class=\"btn ghost sm stop\" type=\"button\" hidden>Stop</button></div></form>` : `<form class=\"numrow\">")
s = rep(s, "      else s += `\\n\\n(The student types a number", "      else if(inst.type==='text') s += '\\n\\n(The student types a short answer in their own words.)';\n      else s += `\\n\\n(The student types a number")
s = rep(s, ": `${inst.unit==='dollars'?money(inst.answer):fmt(inst.answer)} ${inst.unit||''}`;\n        s += `\\n\\nThe student answered:", ": inst.type==='text' ? inst.model : `${inst.unit==='dollars'?money(inst.answer):fmt(inst.answer)} ${inst.unit||''}`;\n        s += `\\n\\nThe student answered:")
s = rep(s, "    } else {\n      const form = $('form', el), input = $('input', el);", """    } else if(inst.type==='text'){
      const form = $('form', el), ta = $('textarea', el), go = $('button[type=submit]', el), stop = $('.stop', el); let ctl2 = null;
      const lock = () => { ta.disabled = true; go.disabled = true; stop.hidden = true; };
      const selfRate = (typed, msg) => { const fb = $('.fb', el); fb.innerHTML = `<p class="msg">${esc(msg)}</p><p class="muted small">Model answer: ${inst.model}</p><div class="row"><button class="btn sm" data-ok="1">I got it</button><button class="btn ghost sm" data-ok="0">I missed it</button></div>`;
        $$('button[data-ok]', fb).forEach(b => b.onclick = () => { chosen = { v: typed, ok: b.dataset.ok==='1' }; finish(chosen.ok); }); };
      stop.onclick = () => ctl2 && ctl2.abort();
      form.addEventListener('submit', async e => {
        e.preventDefault(); const fb = $('.fb', el), typed = ta.value.trim(); inst._grade = null;
        if(typed.length < 2){ fb.innerHTML = '<p class="verdict bad">Type an answer first.</p>'; ta.focus(); return; }
        const sample = await getSample();
        if(!sample){ lock(); selfRate(typed, 'Claude checking isn\\'t available in this view. Compare with the model answer, then mark yourself.'); return; }
        go.disabled = true; stop.hidden = false; ctl2 = new AbortController(); fb.innerHTML = '<p class="msg">Claude is checking your answer…</p>';
        try{
          const r = await sample.json(qTextGradePrompt(inst, typed), { signal: ctl2.signal, modelTier:'quick' });
          if(!r || !VERDICT[r.verdict]) throw { code:'invalid_json' };
          inst._grade = { verdict:r.verdict, got:String(r.got||'').slice(0,400), missing:String(r.missing||'').slice(0,500), error:String(r.error||'').slice(0,300) };
          lock(); chosen = { v: typed, ok: r.verdict==='correct' }; finish(chosen.ok);
        }catch(err){
          if(err && err.code==='cancelled'){ fb.innerHTML = '<p class="msg">Stopped.</p>'; go.disabled = false; stop.hidden = true; }
          else { lock(); selfRate(typed, sampleErrorMsg(err && err.code)); }
        }finally{ ctl2 = null; }
      });
      ta.addEventListener('keydown', e => { if(e.key==='Enter' && (e.ctrlKey||e.metaKey)) go.click(); });
    } else {
      const form = $('form', el), input = $('input', el);""")
s = rep(s, "'Not quite. Here\\'s how it works:'}</p>${ok?'':ansTxt}", "(inst._grade && inst._grade.verdict==='partial' ? 'Partly right. Here\\'s how it works:' : 'Not quite. Here\\'s how it works:')}</p>${inst.type==='text' ? textFb(inst) : ok?'':ansTxt}")
# unit-quiz hints: a stricter tutor rule that never reveals the answer, even in follow-ups
s = rep(s, "  const rule = mode==='hint'\n", "  const rule = mode==='quizhint'\n    ? 'IMPORTANT: This is a question on a unit quiz the student is taking right now. Explain what is being asked and the idea or method they need, but never reveal, eliminate or hint at which choice is correct, and never work out the final number, even if they ask in a follow-up or say they have already answered. If they ask for the answer, say kindly that answers and full explanations appear after they submit the quiz.'\n    : mode==='hint'\n")
open(os.path.join(W, 'workbook-live.html' if LIVE else 'workbook-staging.html'), 'w', encoding='utf8').write(s)
import subprocess, tempfile
i=s.index('<script>')+8; j=s.rindex('</script>'); tf=tempfile.NamedTemporaryFile('w',suffix='.js',delete=False,dir=os.environ.get('TMPDIR','/tmp')); tf.write(s[i:j]); tf.close()
r=subprocess.run(['node','--check',tf.name],capture_output=True,text=True); os.unlink(tf.name)
if r.returncode: sys.exit('SYNTAX ERROR\n'+r.stderr[:1500])
print('built', len(s), 'bytes; lessons:', LESSON_IDS)
