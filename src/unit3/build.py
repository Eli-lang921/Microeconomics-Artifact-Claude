#!/usr/bin/env python3
"""Assemble the workbook with Unit 3: the current live page (index.html, which already has Units 1-2) + Unit 3 files + minimal app patches.
Every patch must match exactly once, or the build stops. Usage: python3 build.py OUT.html [--live]
Without --live the page is labeled Staging (title and brand only)."""
import os, sys, subprocess, tempfile
W = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(W))
OUT = sys.argv[1]; LIVE = '--live' in sys.argv
src = open(os.path.join(ROOT, 'index.html'), encoding='utf8').read()
rd = lambda f: open(os.path.join(W, f), encoding='utf8').read()
has = lambda f: os.path.exists(os.path.join(W, f))
LESSON_IDS = [x for x in ['l13','l14','l15'] if has(x+'.q.js')]

def rep(s, old, new, count=1):
    n = s.count(old)
    if n != count: sys.exit(f'PATCH FAILED ({n} matches): {old[:90]!r}')
    return s.replace(old, new)

s = src
if not LIVE:
    s = rep(s, '<title>Microeconomics Workbook</title>', '<title>Microeconomics Workbook (Unit 3 Staging)</title>')
    s = rep(s, '<a class="brand" href="#home">Microeconomics Workbook</a>', '<a class="brand" href="#home">Microeconomics Workbook · Unit 3 Staging</a>')

# CSS additions (Unit 3 figures: flowcharts, annotated tables, paired cards). Neutral colors only; quiz styling is reused from Unit 2.
CSS = r'''
/* Unit 3 figures */
.u3flow{display:grid;gap:4px;justify-items:stretch;margin:.2rem 0}.u3step{background:var(--surface-2);border:1px solid var(--line);border-radius:8px;padding:8px 11px;font-size:.93rem;line-height:1.4}
.u3step.u3end{background:var(--accent-soft);border-color:var(--accent)}.u3step.u3up{border-left:4px solid var(--ok)}.u3step.u3down{border-left:4px solid var(--bad)}.u3step.u3amb{border-left:4px solid var(--g2)}
.u3arrow{text-align:center;color:var(--muted);font-weight:700;line-height:1}
.u3split{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:10px}.u3col{display:grid;gap:4px;align-content:start}
.u3tbl th{white-space:normal}.u3tbl td{white-space:nowrap}.u3tbl.wrap td{white-space:normal}.u3tbl tr.u3z1 td{background:var(--ok-soft)}.u3tbl tr.u3z2 td{background:var(--accent-soft);font-weight:700}.u3tbl tr.u3z3 td{background:var(--bad-soft)}
.u3tbl td.u3hi{background:var(--accent-soft);font-weight:700;outline:2px solid var(--accent);outline-offset:-2px}.u3tbl td.u3x{color:var(--muted);text-decoration:line-through}.u3tbl td.u3fix{color:var(--g2);font-weight:700}
.u3tbl.compact th,.u3tbl.compact td{padding:4px 8px}
.u3notes{font-size:.9rem;margin:.3rem 0 0}.u3notes p{margin:.2rem 0}.u3key{display:inline-block;width:.9rem;height:.9rem;border-radius:3px;vertical-align:-2px;margin-right:6px;border:1px solid var(--line)}
.u3key.u3z1{background:var(--ok-soft)}.u3key.u3z2{background:var(--accent-soft)}.u3key.u3z3{background:var(--bad-soft)}
.u3pair{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:10px}.u3card{border:1px solid var(--line);border-radius:8px;padding:10px 12px;background:var(--surface)}
.u3card p{margin:.25rem 0}.u3card .u3h{font-weight:700}.u3card.ok{border-left:4px solid var(--ok)}.u3card.no{border-left:4px solid var(--bad)}
.qcheck>*{min-width:0}
.u2fig svg.u3sm{max-width:440px;margin:0 auto}
.u3log{font-size:.9rem;margin:.4rem 0 0;padding-left:1.2rem}.u3log li{margin:.15rem 0}
'''
s = rep(s, '.unit-quiz{margin-top:4px}\n</style>', '.unit-quiz{margin-top:4px}' + CSS + '</style>')

# state: separate Unit 3 quiz results (Unit 1 S.quiz and Unit 2 S.quiz2 untouched)
s = rep(s, "quiz2:{best:null,last:null,attempts:0,history:[]}, review:{}", "quiz2:{best:null,last:null,attempts:0,history:[]}, quiz3:{best:null,last:null,attempts:0,history:[]}, review:{}")
s = rep(s, "st.quiz2=st.quiz2||{best:null,last:null,attempts:0,history:[]};", "st.quiz2=st.quiz2||{best:null,last:null,attempts:0,history:[]}; st.quiz3=st.quiz3||{best:null,last:null,attempts:0,history:[]};")

# A: Unit 3 core, figures, lesson questions/cards/writing/plans (after Unit 2's fixes, before the Unit 1 order fix line)
figfiles = [x+'.f.js' for x in LESSON_IDS if has(x+'.f.js')]
partA = rd('core.js') + '\n' + '\n'.join(rd(f) for f in figfiles) + '\n' + '\n'.join(rd(x+'.q.js') for x in LESSON_IDS) + '\n'
s = rep(s, "['l1-shift','l3-terms','l3-terms2'].forEach(id => { Q[id].keepOrder = true; });", partA + "['l1-shift','l3-terms','l3-terms2'].forEach(id => { Q[id].keepOrder = true; });")
# B: Unit 3 quiz pool, after the Unit 2 quiz pool; then the numeric-order convention for all Unit 3 items
partB = rd('quiz3.q.js') + ('\n' + rd('quiz3.items.js') if has('quiz3.items.js') else '') + '\nu3SortNumeric();\n'
s = rep(s, "/* ===== Flashcards (key terms) =====", partB + "/* ===== Flashcards (key terms) =====")
# C, D, E: cards, writing, plans (new ids only; existing ids untouched)
s = rep(s, "Object.assign(CARD_LIST, U2_CARDS);", "Object.assign(CARD_LIST, U2_CARDS); Object.assign(CARD_LIST, U3_CARDS);")
s = rep(s, "Object.assign(WRITE, U2_WRITE);", "Object.assign(WRITE, U2_WRITE); Object.assign(WRITE, U3_WRITE);")
s = rep(s, "Object.assign(PLAN, U2_PLAN);", "Object.assign(PLAN, U2_PLAN); Object.assign(PLAN, U3_PLAN);")
# F: widgets
partF = '\n'.join(rd(x+'.w.js') for x in LESSON_IDS if has(x+'.w.js')) + '\n'
s = rep(s, "/* ---------- lessons ---------- */\nconst LESSONS = [", partF + "/* ---------- lessons ---------- */\nconst LESSONS = [")
# G: lessons list, later units, unit cards
s = rep(s, "LESSONS.push(...U2_LESSONS);", "LESSONS.push(...U2_LESSONS); LESSONS.push(...U3_LESSONS);")
s = rep(s, "const LATER = ['Theory of Consumer Choice',", "const LATER = [")
s = rep(s, "cover:[['Determinants of supply and demand','Lesson 6'],", "weight:'Supply and demand is about 15% to 20% of the exam (College Board outline).', cover:[['Determinants of supply and demand','Lesson 6'],")
s = rep(s, "['Tax incidence and deadweight loss','Lesson 12']] }\n];",
  "['Tax incidence and deadweight loss','Lesson 12']] },\n"
  "  { n:3, title:'Theory of Consumer Choice', quiz:'#quiz3', qkey:'quiz3', blurb:'Where demand curves come from: utility, spending a budget for the most satisfaction, and how people react when prices change.',\n"
  "    weight:'Theory of consumer choice is about 5% to 10% of the exam (College Board outline).',\n"
  "    cover:[['Total utility and marginal utility','Lesson 13'],['Utility maximization: equalizing marginal utility per dollar','Lesson 14'],['Individual and market demand curves','Lesson 15'],['Income and substitution effects','Lesson 15']] }\n];")
s = rep(s, "nq = U.n===1 ? QUIZ.length : QUIZ2.length", "nq = ({1:QUIZ, 2:QUIZ2, 3:QUIZ3})[U.n].length")
s = rep(s, "${U.n===2?'; results after you submit':''}", "${U.n>=2?'; results after you submit':''}")
s = rep(s, "<p class=\"muted\" style=\"margin:.3rem 0 0\">Supply and demand is about 15% to 20% of the exam (College Board outline).</p></details>`:''}",
           "<p class=\"muted\" style=\"margin:.3rem 0 0\">${U.weight||''}</p></details>`:''}")

# routing: #quiz3
s = rep(s, "v==='quiz2' ? 'quiz'", "(v==='quiz2' || v==='quiz3') ? 'quiz'")
s = rep(s, "['quiz','quiz2','review','reports','cards'].includes(h)", "['quiz','quiz2','quiz3','review','reports','cards'].includes(h)")
s = rep(s, "else if(view==='quiz2') renderQuiz2();", "else if(view==='quiz2') renderQuiz2(); else if(view==='quiz3') renderQuiz3();")
# unit quiz switcher (shared by all quiz pages): add Unit 3
s = rep(s, 'aria-pressed="${u===2}" style="text-decoration:none">Unit 2 quiz</a></div>`;',
           'aria-pressed="${u===2}" style="text-decoration:none">Unit 2 quiz</a><a class="chipbtn" href="#quiz3" aria-pressed="${u===3}" style="text-decoration:none">Unit 3 quiz</a></div>`;')
# Unit 3 quiz renderer after the Unit 2 one
END2 = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz2') QZ2R = null; });"
s = rep(s, END2, END2 + "\n" + rd('quiz3.render.js'))
# reports: name the Unit 3 quiz
s = rep(s, "quiz2:'Unit 2 quiz', cards:'Flashcards page'", "quiz2:'Unit 2 quiz', quiz3:'Unit 3 quiz', cards:'Flashcards page'")
s = rep(s, "quiz2:'#quiz2', cards:'#cards' };", "quiz2:'#quiz2', quiz3:'#quiz3', cards:'#cards' };")
s = rep(s, "['quiz2','Unit 2 quiz'],['review','Review tab']", "['quiz2','Unit 2 quiz'],['quiz3','Unit 3 quiz'],['review','Review tab']")

open(OUT, 'w', encoding='utf8').write(s)
i = s.index('<script>')+8; j = s.rindex('</script>')
tf = tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, dir=os.environ.get('TMPDIR','/tmp')); tf.write(s[i:j]); tf.close()
r = subprocess.run(['node','--check',tf.name], capture_output=True, text=True); os.unlink(tf.name)
if r.returncode: sys.exit('SYNTAX ERROR\n'+r.stderr[:1500])
print('built', OUT, len(s), 'bytes; lessons:', LESSON_IDS, '(live)' if LIVE else '(staging)')
