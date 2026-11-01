#!/usr/bin/env python3
"""Merge Unit 5 (Lessons 20-28 and the Unit 5 quiz) into a workbook page that already has Units 1-4.

Usage: python3 build.py BASE.html OUT.html [--live]
BASE is the Units 3-4 staging page (or the live page, which has the same code). Every patch must match exactly once,
so the script fails loudly instead of silently skipping a change. --live removes the staging title and brand.
"""
import sys, re, pathlib
HERE = pathlib.Path(__file__).resolve().parent
LESSON_FILES = ['l20.js','l21.js','l22.js','l23.js','l24.js','l25.js','l26.js','l27.js','l28.js']

def read(name): return (HERE/name).read_text(encoding='utf-8')

def once(src, old, new, label):
    n = src.count(old)
    if n != 1: raise SystemExit(f'patch "{label}": expected 1 match, found {n}')
    return src.replace(old, new)

def render5_from(base):
    """Copy the Unit 4 quiz renderer (submit-then-reveal) and rename it for Unit 5, so Units 1-4 quiz code stays untouched."""
    a = base.index('/* ===== Unit 4 quiz: submit-then-reveal')
    end_marker = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz4') QZ4R = null; });"
    b = base.index(end_marker) + len(end_marker)
    s = base[a:b]
    reps = [('QZ4_DRAFT_KEY','QZ5_DRAFT_KEY'),("'micro-quiz4-draft'","'micro-quiz5-draft'"),('QZ4R','QZ5R'),('QZ4','QZ5'),('qz4','qz5'),('QUIZ4','QUIZ5'),
            ('renderQuiz4Results','renderQuiz5Results'),('renderQuiz4','renderQuiz5'),('submitQuiz4','submitQuiz5'),('S.quiz4','S.quiz5'),("'#quiz4'","'#quiz5'"),
            ('quizSwitch(4)','quizSwitch(5)'),('Unit 4 · Production and Costs','Unit 5 · Firm Behavior and Market Structure'),('Unit 4 quiz','Unit 5 quiz'),
            ('across Lessons 16 to 19','across Lessons 20 to 28'),('Unit 4 quiz:','Unit 5 quiz:'),
            ('separate from Units 1-3 (S.quiz, S.quiz2, S.quiz3)','separate from Units 1-4 (S.quiz, S.quiz2, S.quiz3, S.quiz4)')]
    for o,n in reps: s = s.replace(o,n)
    s = re.sub(r'\bq4(resume|new|last|card|opt|prev|next|submit|confirm|yes|no|res|again)\b', r'q5\1', s)
    s = s.replace("'q4r-'", "'q5r-'")
    left = [m.group(0) for m in re.finditer(r'.{30}(QZ4|quiz4|\bq4).{20}', s[s.index('*/'):])]
    assert not left, ('leftover Unit 4 names in renderer', left)
    return '\n\n' + s.replace('/* ===== Unit 5 quiz: submit-then-reveal (same behavior as the Unit 2 quiz; copied so Unit 2 code stays untouched)',
                              '/* ===== Unit 5 quiz: submit-then-reveal (a renamed copy of the Unit 4 renderer, so Units 1-4 quiz code stays untouched)') + '\n'

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    live = '--live' in sys.argv
    base = pathlib.Path(args[0]).read_text(encoding='utf-8')
    out = base

    # 1. CSS
    out = once(out, '.u4tbl input.ok{border-color:var(--ok);background:var(--ok-soft)}.u4tbl input.no{border-color:var(--bad);background:var(--bad-soft)}\n</style>',
               '.u4tbl input.ok{border-color:var(--ok);background:var(--ok-soft)}.u4tbl input.no{border-color:var(--bad);background:var(--bad-soft)}\n' + read('u5.css') + '</style>', 'css')
    # 2. Unit 5 data, figures, lessons, questions, cards, writing, plan
    unit = read('head5.js') + '\n' + '\n'.join(read(f) for f in LESSON_FILES)
    out = once(out, '/* ===== Unit quiz (separate pool, 5 choices like the CLEP) ===== */', unit + '\n/* ===== Unit quiz (separate pool, 5 choices like the CLEP) ===== */', 'unit5 block')
    # 3. Unit 5 quiz pool (after the Unit 4 pool and its numeric sort)
    out = once(out, 'u4SortNumeric();\n/* ===== Flashcards (key terms) =====', 'u4SortNumeric();\n' + read('quiz5.js') + '\nu5SortNumeric();\n/* ===== Flashcards (key terms) =====', 'quiz5 pool')
    # 4-6. cards, writing, plan
    out = once(out, 'Object.assign(CARD_LIST, U4_CARDS);', 'Object.assign(CARD_LIST, U4_CARDS); Object.assign(CARD_LIST, U5_CARDS);', 'cards')
    out = once(out, 'Object.assign(WRITE, U4_WRITE);', 'Object.assign(WRITE, U4_WRITE); Object.assign(WRITE, U5_WRITE);', 'writing')
    out = once(out, 'Object.assign(PLAN, U4_PLAN);', 'Object.assign(PLAN, U4_PLAN); Object.assign(PLAN, U5_PLAN);', 'plan')
    # 7. report topics
    out = once(out, "quiz4:'Unit 4 quiz', ", "quiz4:'Unit 4 quiz', quiz5:'Unit 5 quiz', ", 'report topics')
    out = once(out, "quiz4:'#quiz4', ", "quiz4:'#quiz4', quiz5:'#quiz5', ", 'report hrefs')
    out = once(out, "['quiz4','Unit 4 quiz'],", "['quiz4','Unit 4 quiz'],['quiz5','Unit 5 quiz'],", 'report picker')
    # 8. widgets
    out = once(out, '/* ---------- lessons ---------- */\nconst LESSONS = [', read('widgets5.js') + '\n/* ---------- lessons ---------- */\nconst LESSONS = [', 'widgets')
    # 9-11. lessons, later units, unit card
    out = once(out, 'LESSONS.push(...U4_LESSONS);', 'LESSONS.push(...U4_LESSONS); LESSONS.push(...U5_LESSONS);', 'lessons push')
    out = once(out, "const LATER = ['Firm Behavior and Market Structure','Factor Markets','Market Failure and the Role of Government'];", "const LATER = ['Factor Markets','Market Failure and the Role of Government'];", 'later')
    out = once(out, "['Long-run cost minimizing input combination','Lesson 19']] }\n];", "['Long-run cost minimizing input combination','Lesson 19']] },\n" + read('unit5card.js').strip() + "\n];", 'units')
    # 12-16. routes, home count, quiz switcher, renderer
    out = once(out, "(v==='quiz2' || v==='quiz3' || v==='quiz4')", "(v==='quiz2' || v==='quiz3' || v==='quiz4' || v==='quiz5')", 'tab')
    out = once(out, "['quiz','quiz2','quiz3','quiz4','review','reports','cards']", "['quiz','quiz2','quiz3','quiz4','quiz5','review','reports','cards']", 'route list')
    out = once(out, "else if(view==='quiz4') renderQuiz4();", "else if(view==='quiz4') renderQuiz4(); else if(view==='quiz5') renderQuiz5();", 'dispatch')
    out = once(out, '({1:QUIZ, 2:QUIZ2, 3:QUIZ3, 4:QUIZ4})', '({1:QUIZ, 2:QUIZ2, 3:QUIZ3, 4:QUIZ4, 5:QUIZ5})', 'home count')
    out = once(out, '<a class="chipbtn" href="#quiz4" aria-pressed="${u===4}" style="text-decoration:none">Unit 4 quiz</a></div>`;',
               '<a class="chipbtn" href="#quiz4" aria-pressed="${u===4}" style="text-decoration:none">Unit 4 quiz</a><a class="chipbtn" href="#quiz5" aria-pressed="${u===5}" style="text-decoration:none">Unit 5 quiz</a></div>`;', 'quiz switch')
    endm = "window.addEventListener('hashchange', () => { if(location.hash!=='#quiz4') QZ4R = null; });"
    out = once(out, endm, endm + render5_from(base), 'renderer')
    # 17. storage: quiz5 kept separately; old records load unchanged
    out = once(out, 'quiz4:{best:null,last:null,attempts:0,history:[]}, review:{}', 'quiz4:{best:null,last:null,attempts:0,history:[]}, quiz5:{best:null,last:null,attempts:0,history:[]}, review:{}', 'blankState')
    out = once(out, 'st.quiz4=st.quiz4||{best:null,last:null,attempts:0,history:[]};', 'st.quiz4=st.quiz4||{best:null,last:null,attempts:0,history:[]}; st.quiz5=st.quiz5||{best:null,last:null,attempts:0,history:[]};', 'normalize')
    # 18. title and brand
    if live:
        # tolerant: the live page may already carry the plain title and brand
        import re as _re
        out, k = _re.subn(r'<title>Microeconomics Workbook[^<]*</title>', '<title>Microeconomics Workbook</title>', out, count=1)
        assert k == 1, 'title not found'
        out = out.replace('Microeconomics Workbook · Units 3-4 Staging</a>', 'Microeconomics Workbook</a>')
    else:
        out = once(out, '<title>Microeconomics Workbook (Units 3-4 Staging)</title>', '<title>Microeconomics Workbook (Units 3-5 Staging)</title>', 'title')
        out = once(out, 'Microeconomics Workbook · Units 3-4 Staging</a>', 'Microeconomics Workbook · Units 3-5 Staging</a>', 'brand')
    pathlib.Path(args[1]).write_text(out, encoding='utf-8')
    print('wrote', args[1], len(out), 'bytes')

if __name__ == '__main__':
    main()
