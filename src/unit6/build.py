#!/usr/bin/env python3
"""Merge Unit 6 (Lessons 29-32 and the Unit 6 quiz) into a workbook page that already has Units 1-5.

Usage: python3 build.py BASE.html OUT.html
BASE is the live page (Units 1-5, Review upgrades 1-3 and the flashcard auto-add). Every patch must match exactly once,
so the script fails loudly instead of silently skipping a change. The page title and brand are left as they are.
Besides the Unit 6 content, it adds small, general hooks that only change anything for questions marked `visual`
(graphs as answer choices) and for built-in flashcards that carry a picture (6th element of a CARD_LIST entry).
"""
import sys, re, pathlib
HERE = pathlib.Path(__file__).resolve().parent
LESSON_FILES = ['l29.js','l30.js','l31.js','l32.js']

def read(name): return (HERE/name).read_text(encoding='utf-8')

def once(src, old, new, label):
    n = src.count(old)
    if n != 1: raise SystemExit(f'patch "{label}": expected 1 match, found {n}')
    return src.replace(old, new)

def render6_from(base):
    """Copy the Unit 5 quiz renderer (submit-then-reveal), rename it for Unit 6 and let it show graphs as choices."""
    a = base.index('/* ===== Unit 5 quiz: submit-then-reveal')
    end_marker = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz5') QZ5R = null; });"
    b = base.index(end_marker) + len(end_marker)
    s = base[a:b]
    reps = [('QZ5_DRAFT_KEY','QZ6_DRAFT_KEY'),("'micro-quiz5-draft'","'micro-quiz6-draft'"),('QZ5R','QZ6R'),('QZ5','QZ6'),('qz5','qz6'),('QUIZ5','QUIZ6'),
            ('renderQuiz5Results','renderQuiz6Results'),('renderQuiz5','renderQuiz6'),('submitQuiz5','submitQuiz6'),('S.quiz5','S.quiz6'),("'#quiz5'","'#quiz6'"),
            ('quizSwitch(5)','quizSwitch(6)'),('Unit 5 · Firm Behavior and Market Structure','Unit 6 · Factor Markets'),('Unit 5 quiz','Unit 6 quiz'),
            ('across Lessons 20 to 28','across Lessons 29 to 32'),
            ('separate from Units 1-4 (S.quiz, S.quiz2, S.quiz3, S.quiz4)','separate from Units 1-5 (S.quiz, S.quiz2, S.quiz3, S.quiz4, S.quiz5)')]
    for o,n in reps: s = s.replace(o,n)
    s = re.sub(r'\bq5(resume|new|last|card|opt|prev|next|submit|confirm|yes|no|res|again)\b', r'q6\1', s)
    s = s.replace("'q5r-'", "'q6r-'")
    # graphs as answer choices: grid class, and Claude's context describes each graph instead of reading SVG labels
    s = once(s, '<div class="opts" role="radiogroup" aria-label="Answer choices">', '<div class="opts${q.visual?\' vis\':\'\'}" role="radiogroup" aria-label="Answer choices">', 'q6 vis class')
    s = once(s, '<div class="opts">${order.map(', '<div class="opts${q.visual?\' vis\':\'\'}">${order.map(', 'q6 results vis class')
    s = once(s, "`${letters[k]}. ${textOf(Object.assign(document.createElement('div'),{innerHTML:q.options[oi]}))}`", "`${letters[k]}. ${optPlain(q,oi)}`", 'q6 hint ctx')
    s = once(s, "const t = j => textOf(Object.assign(document.createElement('div'),{innerHTML:q.options[order[j]]}));", "const t = j => optPlain(q, order[j]);", 'q6 results ctx')
    left = [m.group(0) for m in re.finditer(r'.{30}(QZ5|quiz5|\bq5).{20}', s[s.index('*/'):])]
    assert not left, ('leftover Unit 5 names in renderer', left)
    s = once(s, '/* ===== Unit 6 quiz: submit-then-reveal (a renamed copy of the Unit 4 renderer, so Units 1-4 quiz code stays untouched)',
                  '/* ===== Unit 6 quiz: submit-then-reveal (a renamed copy of the Unit 5 renderer that can also show graphs as answer choices; Units 1-5 quiz code stays untouched)', 'q6 header comment')
    return '\n\n' + s + '\n'

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    base = pathlib.Path(args[0]).read_text(encoding='utf-8')
    out = base

    # 1. CSS
    out = once(out, '.u3tbl.u5tight th,.u3tbl.u5tight td{padding:4px 4px;font-size:.86rem}\n</style>',
               '.u3tbl.u5tight th,.u3tbl.u5tight td{padding:4px 4px;font-size:.86rem}\n' + read('u6.css') + '</style>', 'css')
    # 2. Unit 6 data, figures, lessons, questions, cards, writing, plan
    unit = read('head6.js') + '\n' + '\n'.join(read(f) for f in LESSON_FILES)
    out = once(out, '/* ===== Unit quiz (separate pool, 5 choices like the CLEP) ===== */', unit + '\n/* ===== Unit quiz (separate pool, 5 choices like the CLEP) ===== */', 'unit6 block')
    # 3. Unit 6 quiz pool (after the Unit 5 pool and its numeric sort)
    out = once(out, 'u5SortNumeric();\n/* ===== Flashcards (key terms) =====', 'u5SortNumeric();\n' + read('quiz6.js') + '\nu6SortNumeric();\n/* ===== Flashcards (key terms) =====', 'quiz6 pool')
    # 4-6. cards (with optional built-in picture), writing, plan
    out = once(out, 'Object.assign(CARD_LIST, U5_CARDS);', 'Object.assign(CARD_LIST, U5_CARDS); Object.assign(CARD_LIST, U6_CARDS);', 'cards')
    out = once(out, "list.forEach(([t,q,d,ex,tip],i)=>{ BASE_CARDS[`c-${lid}-${i}`] = { lesson:lid, t, q, d, ex, tip }; })",
               "list.forEach(([t,q,d,ex,tip,vis],i)=>{ BASE_CARDS[`c-${lid}-${i}`] = { lesson:lid, t, q, d, ex, tip, ...(vis ? { vis } : {}) }; })", 'base cards vis')
    out = once(out, "${c.tip?`<p class=\"fc-tip\"><span class=\"fc-lab\">Watch out</span>${esc(c.tip)}</p>`:''}</div>`;",
               "${c.tip?`<p class=\"fc-tip\"><span class=\"fc-lab\">Watch out</span>${esc(c.tip)}</p>`:''}${c.vis && !c.custom ? `<div class=\"fc-vis\">${c.vis}</div>` : ''}</div>`;", 'card back vis')
    out = once(out, 'Object.assign(WRITE, U5_WRITE);', 'Object.assign(WRITE, U5_WRITE); Object.assign(WRITE, U6_WRITE);', 'writing')
    out = once(out, 'Object.assign(PLAN, U5_PLAN);', 'Object.assign(PLAN, U5_PLAN); Object.assign(PLAN, U6_PLAN);', 'plan')
    # 7. report topics
    out = once(out, "quiz5:'Unit 5 quiz', ", "quiz5:'Unit 5 quiz', quiz6:'Unit 6 quiz', ", 'report topics')
    out = once(out, "quiz5:'#quiz5', ", "quiz5:'#quiz5', quiz6:'#quiz6', ", 'report hrefs')
    out = once(out, "['quiz5','Unit 5 quiz'],", "['quiz5','Unit 5 quiz'],['quiz6','Unit 6 quiz'],", 'report picker')
    # 8. widgets
    out = once(out, '/* ---------- lessons ---------- */\nconst LESSONS = [', read('widgets6.js') + '\n/* ---------- lessons ---------- */\nconst LESSONS = [', 'widgets')
    # 9-11. lessons, later units, unit card
    out = once(out, 'LESSONS.push(...U5_LESSONS);', 'LESSONS.push(...U5_LESSONS); LESSONS.push(...U6_LESSONS);', 'lessons push')
    out = once(out, "const LATER = ['Factor Markets','Market Failure and the Role of Government'];", "const LATER = ['Market Failure and the Role of Government'];", 'later')
    out = once(out, "['Monopolistic competition: product differentiation and advertising; profit maximization; short-run and long-run equilibrium; excess capacity and inefficiency','Lesson 28']] }\n];",
               "['Monopolistic competition: product differentiation and advertising; profit maximization; short-run and long-run equilibrium; excess capacity and inefficiency','Lesson 28']] },\n" + read('unit6card.js').rstrip() + "\n];", 'units')
    # 12-16. routes, home count, quiz switcher, renderer
    out = once(out, "(v==='quiz2' || v==='quiz3' || v==='quiz4' || v==='quiz5')", "(v==='quiz2' || v==='quiz3' || v==='quiz4' || v==='quiz5' || v==='quiz6')", 'tab')
    out = once(out, "['quiz','quiz2','quiz3','quiz4','quiz5','review','reports','cards']", "['quiz','quiz2','quiz3','quiz4','quiz5','quiz6','review','reports','cards']", 'route list')
    out = once(out, "else if(view==='quiz5') renderQuiz5();", "else if(view==='quiz5') renderQuiz5(); else if(view==='quiz6') renderQuiz6();", 'dispatch')
    out = once(out, '({1:QUIZ, 2:QUIZ2, 3:QUIZ3, 4:QUIZ4, 5:QUIZ5})', '({1:QUIZ, 2:QUIZ2, 3:QUIZ3, 4:QUIZ4, 5:QUIZ5, 6:QUIZ6})', 'home count')
    out = once(out, '<a class="chipbtn" href="#quiz5" aria-pressed="${u===5}" style="text-decoration:none">Unit 5 quiz</a></div>`;',
               '<a class="chipbtn" href="#quiz5" aria-pressed="${u===5}" style="text-decoration:none">Unit 5 quiz</a><a class="chipbtn" href="#quiz6" aria-pressed="${u===6}" style="text-decoration:none">Unit 6 quiz</a></div>`;', 'quiz switch')
    endm = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz5') QZ5R = null; });"
    out = once(out, endm, endm + render6_from(base), 'renderer')
    # 17. storage: quiz6 kept separately; old records load unchanged
    out = once(out, 'quiz5:{best:null,last:null,attempts:0,history:[]}, review:{}', 'quiz5:{best:null,last:null,attempts:0,history:[]}, quiz6:{best:null,last:null,attempts:0,history:[]}, review:{}', 'blankState')
    out = once(out, 'st.quiz5=st.quiz5||{best:null,last:null,attempts:0,history:[]};', 'st.quiz5=st.quiz5||{best:null,last:null,attempts:0,history:[]}; st.quiz6=st.quiz6||{best:null,last:null,attempts:0,history:[]};', 'normalize')

    # 18. graphs as answer choices in the shared question card (only items with inst.visual change)
    out = once(out, "function correctText(inst){\n  if(!inst) return '';\n  if(inst.type==='mc') return plainOf(inst.options[inst.answer]);",
               "/* Plain text of answer choice i; graph choices use their description (sent to Claude only, never shown as a hint on screen). */\n"
               "const optPlain = (inst, i) => inst && inst.optDesc ? 'Graph: ' + inst.optDesc[i] : plainOf(inst.options[i]);\n"
               "/* Exhibits a written version keeps: the prompt's tables and graphs, plus graph answer choices A-E. */\n"
               "function qExhibits(inst){ if(!inst) return ''; let s = exhibitsOf(inst.prompt); if(inst.visual && Array.isArray(inst.options)) s += `<div class=\"opts vis wr-vis\">${inst.options.map((o,k)=>`<div class=\"opt\"><span class=\"ol\">${'ABCDE'[k]}</span><span>${o}</span></div>`).join('')}</div>`; return s; }\n"
               "function correctText(inst){\n  if(!inst) return '';\n  if(inst.type==='mc') return inst.visual ? `Graph ${'ABCDE'[inst.answer]}${inst.optDesc ? ': ' + inst.optDesc[inst.answer] : ''}` : plainOf(inst.options[inst.answer]);", 'correctText')
    out = once(out, "if(!Q[qid].gen){ try{ const b = instance(qid); ex = exhibitsOf(b.prompt); explain = b.explain || ''; }catch(e){} }",
               "if(!Q[qid].gen && !w.vis){ try{ const b = instance(qid); ex = qExhibits(b); explain = b.explain || ''; }catch(e){} }", 'writtenInst')
    out = once(out, "const choices = inst.type==='mc' ? '\\nChoices:\\n' + inst.options.map((o,i)=>`${letters[i]}. ${plainOf(o)}${i===inst.answer?'  (correct)':''}`).join('\\n') : '';\n  const hasEx = !!exhibitsOf(inst.prompt);",
               "const choices = inst.type==='mc' ? '\\nChoices:\\n' + inst.options.map((o,i)=>`${letters[i]}. ${optPlain(inst,i)}${i===inst.answer?'  (correct)':''}`).join('\\n') : '';\n  const hasEx = !!qExhibits(inst);", 'rewrite choices')
    out = once(out, "- Ask for the answer and a short reason (why, or how you know), so a lucky guess cannot pass.",
               "${inst.visual ? '- The answer choices are graphs labeled A to E, and all five stay on screen under your question. Ask which graph (by its letter) is correct and why. Do not describe the graphs in a way that gives the answer away.\\n' : ''}- Ask for the answer and a short reason (why, or how you know), so a lucky guess cannot pass.", 'rewrite visual rule')
    out = once(out, "      if(Q[qid].gen){\n        rec.ex = exhibitsOf(inst.prompt); rec.explain = String(inst.explain || '');",
               "      if(Q[qid].gen || inst.visual){\n        rec.ex = qExhibits(inst); rec.explain = String(inst.explain || ''); if(inst.visual) rec.vis = true;", 'freeze visual')
    out = once(out, "<div class=\"wr-prev\"><p style=\"margin:0\">${esc(p)}</p>${exhibitsOf(inst.prompt)?", "<div class=\"wr-prev\"><p style=\"margin:0\">${esc(p)}</p>${qExhibits(inst)?", 'preview note')
    out = once(out, "b.options.map((o,i)=>`${'ABCDE'[i]}. ${plainOf(o)}`).join('\\n')", "b.options.map((o,i)=>`${'ABCDE'[i]}. ${optPlain(b,i)}`).join('\\n')", 'variant ctx')
    # qCard: grid class for graph choices; Claude's context uses the graph descriptions
    a = out.index('function qCard(qid, { ctx, label, onAnswer, onNext, nextLabel }){'); b = out.index('/* ---------- flashcard ---------- */', a)
    qc = out[a:b]
    qc = once(qc, "<div class=\"opts${kind==='tf'?' tf':''}\">", "<div class=\"opts${kind==='tf'?' tf':''}${inst.visual?' vis':''}\">", 'qCard vis class')
    qc = once(qc, "${textOf(Object.assign(document.createElement('div'),{innerHTML:o.t}))}", "${optPlain(inst,o.i)}", 'qCard ctx choices')
    assert qc.count("${textOf(Object.assign(document.createElement('div'),{innerHTML:shown[k].t}))}") == 2, 'qCard pick/right ctx'
    qc = qc.replace("${textOf(Object.assign(document.createElement('div'),{innerHTML:shown[k].t}))}", "${optPlain(inst,shown[k].i)}")
    out = out[:a] + qc + out[b:]

    pathlib.Path(args[1]).write_text(out, encoding='utf-8')
    print('wrote', args[1], len(out), 'bytes')

if __name__ == '__main__':
    main()
