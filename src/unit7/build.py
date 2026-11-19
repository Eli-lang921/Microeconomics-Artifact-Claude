#!/usr/bin/env python3
"""Merge Unit 7 (Lessons 33-37 and the Unit 7 quiz) into a workbook page that already has Units 1-6.

Usage: python3 build.py BASE.html OUT.html
BASE is the live page (Units 1-6, Review upgrades 1-4, fix1). Every patch must match exactly once, so the script fails loudly
instead of silently skipping a change. Unit 6 already added the general hooks Unit 7 needs (graph answer choices, card pictures,
written versions of graph-choice questions), so this script adds only Unit 7 content, its quiz route and quiz7 storage.
"""
import sys, re, pathlib
HERE = pathlib.Path(__file__).resolve().parent
LESSON_FILES = [f for f in ['l33.js','l34.js','l35.js','l36.js','l37.js'] if (HERE/f).exists()]

def read(name): return (HERE/name).read_text(encoding='utf-8')

def once(src, old, new, label):
    n = src.count(old)
    if n != 1: raise SystemExit(f'patch "{label}": expected 1 match, found {n}')
    return src.replace(old, new)

def render7_from(base):
    """Copy the Unit 6 quiz renderer (submit-then-reveal, graph choices) and rename it for Unit 7."""
    a = base.index('/* ===== Unit 6 quiz: submit-then-reveal')
    end_marker = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz6') QZ6R = null; });"
    b = base.index(end_marker) + len(end_marker)
    s = base[a:b]
    reps = [('QZ6_DRAFT_KEY','QZ7_DRAFT_KEY'),("'micro-quiz6-draft'","'micro-quiz7-draft'"),('QZ6R','QZ7R'),('QZ6','QZ7'),('qz6','qz7'),('QUIZ6','QUIZ7'),
            ('renderQuiz6Results','renderQuiz7Results'),('renderQuiz6','renderQuiz7'),('submitQuiz6','submitQuiz7'),('S.quiz6','S.quiz7'),("'#quiz6'","'#quiz7'"),
            ('quizSwitch(6)','quizSwitch(7)'),('Unit 6 · Factor Markets','Unit 7 · Market Failure and the Role of Government'),('Unit 6 quiz','Unit 7 quiz'),
            ('across Lessons 29 to 32','across Lessons 33 to 37'),
            ('S.quiz, S.quiz2, S.quiz3, S.quiz4, S.quiz5)','S.quiz, S.quiz2, S.quiz3, S.quiz4, S.quiz5, S.quiz6)')]
    for o,n in reps: s = s.replace(o,n)
    s = re.sub(r'\bq6(resume|new|last|card|opt|prev|next|submit|confirm|yes|no|res|again)\b', r'q7\1', s)
    s = s.replace("'q6r-'", "'q7r-'")
    left = [m.group(0) for m in re.finditer(r'.{30}(QZ6|quiz6|qz6|\bq6|Unit 6).{20}', s)]
    left = [x for x in left if 'Units 1-6' not in x and 'renamed copy of the Unit' not in x and 'S.quiz5, S.quiz6)' not in x]
    assert not left, ('leftover Unit 6 names in renderer', left)
    s = s.replace('/* ===== Unit 7 quiz: submit-then-reveal', '/* ===== Unit 7 quiz: submit-then-reveal (a renamed copy of the Unit 6 renderer; Units 1-6 quiz code stays untouched) ===== */\n/* (original header:', 1)
    return '\n\n' + s + '\n'

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    base = pathlib.Path(args[0]).read_text(encoding='utf-8')
    out = base
    # 1. CSS
    out = once(out, '.fc-vis figure{margin:0}\n</style>', '.fc-vis figure{margin:0}\n' + read('u7.css') + '</style>', 'css')
    # 2. Unit 7 data, figures, lessons, questions, cards, writing, plan
    unit = read('head7.js') + '\n' + '\n'.join(read(f) for f in LESSON_FILES)
    out = once(out, '/* ===== Unit quiz (separate pool, 5 choices like the CLEP) ===== */', unit + '\n/* ===== Unit quiz (separate pool, 5 choices like the CLEP) ===== */', 'unit7 block')
    # 3. Unit 7 quiz pool (after the Unit 6 pool and its numeric sort)
    out = once(out, 'u6SortNumeric();\n/* ===== Flashcards (key terms) =====', 'u6SortNumeric();\n' + read('quiz7.js') + '\nu7SortNumeric();\n/* ===== Flashcards (key terms) =====', 'quiz7 pool')
    # 4-6. cards, writing, plan
    out = once(out, 'Object.assign(CARD_LIST, U5_CARDS); Object.assign(CARD_LIST, U6_CARDS);', 'Object.assign(CARD_LIST, U5_CARDS); Object.assign(CARD_LIST, U6_CARDS); Object.assign(CARD_LIST, U7_CARDS);', 'cards')
    out = once(out, 'Object.assign(WRITE, U5_WRITE); Object.assign(WRITE, U6_WRITE);', 'Object.assign(WRITE, U5_WRITE); Object.assign(WRITE, U6_WRITE); Object.assign(WRITE, U7_WRITE);', 'writing')
    out = once(out, 'Object.assign(PLAN, U5_PLAN); Object.assign(PLAN, U6_PLAN);', 'Object.assign(PLAN, U5_PLAN); Object.assign(PLAN, U6_PLAN); Object.assign(PLAN, U7_PLAN);', 'plan')
    # 7. report topics
    out = once(out, "quiz6:'Unit 6 quiz', ", "quiz6:'Unit 6 quiz', quiz7:'Unit 7 quiz', ", 'report topics')
    out = once(out, "quiz6:'#quiz6', ", "quiz6:'#quiz6', quiz7:'#quiz7', ", 'report hrefs')
    out = once(out, "['quiz6','Unit 6 quiz'],", "['quiz6','Unit 6 quiz'],['quiz7','Unit 7 quiz'],", 'report picker')
    # 8. widgets
    out = once(out, '/* ---------- lessons ---------- */\nconst LESSONS = [', read('widgets7.js') + '\n/* ---------- lessons ---------- */\nconst LESSONS = [', 'widgets')
    # 9-11. lessons, later units (none left: hide the empty section), unit card
    out = once(out, 'LESSONS.push(...U5_LESSONS); LESSONS.push(...U6_LESSONS);', 'LESSONS.push(...U5_LESSONS); LESSONS.push(...U6_LESSONS); LESSONS.push(...U7_LESSONS);', 'lessons push')
    out = once(out, "const LATER = ['Market Failure and the Role of Government'];", "const LATER = [];", 'later')
    out = once(out, '<section class="later"><h2 style="font-size:1.05rem">Later units</h2>', '<section class="later"${LATER.length ? \'\' : \' hidden\'}><h2 style="font-size:1.05rem">Later units</h2>', 'later section')
    out = once(out, "['Labor market and firms\\' hiring of labor','Lessons 30, 31 and 32']] }\n];",
               "['Labor market and firms\\' hiring of labor','Lessons 30, 31 and 32']] },\n" + read('unit7card.js').rstrip() + "\n];", 'units')
    # 12-16. routes, home count, quiz switcher, renderer
    out = once(out, "(v==='quiz2' || v==='quiz3' || v==='quiz4' || v==='quiz5' || v==='quiz6')", "(v==='quiz2' || v==='quiz3' || v==='quiz4' || v==='quiz5' || v==='quiz6' || v==='quiz7')", 'tab')
    out = once(out, "['quiz','quiz2','quiz3','quiz4','quiz5','quiz6','review','reports','cards']", "['quiz','quiz2','quiz3','quiz4','quiz5','quiz6','quiz7','review','reports','cards']", 'route list')
    out = once(out, "else if(view==='quiz5') renderQuiz5(); else if(view==='quiz6') renderQuiz6();", "else if(view==='quiz5') renderQuiz5(); else if(view==='quiz6') renderQuiz6(); else if(view==='quiz7') renderQuiz7();", 'dispatch')
    out = once(out, '({1:QUIZ, 2:QUIZ2, 3:QUIZ3, 4:QUIZ4, 5:QUIZ5, 6:QUIZ6})', '({1:QUIZ, 2:QUIZ2, 3:QUIZ3, 4:QUIZ4, 5:QUIZ5, 6:QUIZ6, 7:QUIZ7})', 'home count')
    out = once(out, '<a class="chipbtn" href="#quiz6" aria-pressed="${u===6}" style="text-decoration:none">Unit 6 quiz</a></div>`;',
               '<a class="chipbtn" href="#quiz6" aria-pressed="${u===6}" style="text-decoration:none">Unit 6 quiz</a><a class="chipbtn" href="#quiz7" aria-pressed="${u===7}" style="text-decoration:none">Unit 7 quiz</a></div>`;', 'quiz switch')
    endm = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz6') QZ6R = null; });"
    out = once(out, endm, endm + render7_from(base), 'renderer')
    # 17. storage: quiz7 kept separately; old records load unchanged
    out = once(out, 'quiz6:{best:null,last:null,attempts:0,history:[]}, review:{}', 'quiz6:{best:null,last:null,attempts:0,history:[]}, quiz7:{best:null,last:null,attempts:0,history:[]}, review:{}', 'blankState')
    out = once(out, 'st.quiz6=st.quiz6||{best:null,last:null,attempts:0,history:[]};', 'st.quiz6=st.quiz6||{best:null,last:null,attempts:0,history:[]}; st.quiz7=st.quiz7||{best:null,last:null,attempts:0,history:[]};', 'normalize')
    pathlib.Path(args[1]).write_text(out, encoding='utf-8')
    print('wrote', args[1], len(out), 'bytes;', 'lessons:', ', '.join(LESSON_FILES))

if __name__ == '__main__':
    main()
