#!/usr/bin/env python3
"""Unit 7 test suite (Playwright/Chromium). Usage: python3 test7.py BASE.html BUILD.html OLD_PROGRESS.json OUTDIR
Prints a JSON report; screenshots go to OUTDIR. Every check records what was done, what was expected and what was observed."""
import sys, json, asyncio, pathlib
from playwright.async_api import async_playwright
BASE, BUILD, OLD, OUT = sys.argv[1:5]
OUT = pathlib.Path(OUT); OUT.mkdir(parents=True, exist_ok=True)
U7 = ['l33','l34','l35','l36','l37']
R = {}

SNAP = """()=>{ const fixed = {}; Object.entries(Q).forEach(([id,q]) => { if(q.gen || q.build) { fixed[id] = 'dyn'; return; }
    fixed[id] = JSON.stringify([q.lesson, q.prompt, q.options, q.answer, q.explain, q.kind]).replace(/(sa|sc|u6a)\\d+/g,'X'); });
  return { q: fixed, cards: JSON.stringify(CARD_LIST).replace(/(sa|sc|u6a)\\d+/g,'X'), lessons: LESSONS.map(l=>l.id), bodies: Object.fromEntries(LESSONS.map(l=>[l.id, (l.body||'').length])),
    quizzes: [QUIZ, QUIZ2, QUIZ3, QUIZ4, QUIZ5, QUIZ6].map(x=>x.join(',')), gloss: Object.keys(GLOSS).length }; }"""

MOCK_CLAUDE = """window.claude = { use: async (cap) => {
  if(cap==='sample'){ const f = async (msgs, o) => { o && o.onText && o.onText({text:'Mock explanation.'}); return 'Mock explanation.'; };
    f.json = async (p, o) => ({ prompt: 'Written version: explain which choice is correct and why, in one or two sentences.', model: 'Model answer for testing.', points: ['point one','point two'] }); return f; }
  if(cap==='user') return { id: async () => null };
  if(cap==='db') return null; return null; } };"""

async def lesson_checks(pg, url, lid, width, dark):
    await pg.set_viewport_size({'width':width, 'height':900})
    await pg.emulate_media(color_scheme='dark' if dark else 'light')
    await pg.goto(url + '#' + lid); await pg.wait_for_timeout(700)
    # open every "more practice" and every Go deeper
    await pg.evaluate("""()=>{ document.querySelectorAll('details').forEach(d=>d.open=true); [...document.querySelectorAll('button')].filter(b=>/More practice|more practice/.test(b.textContent)).forEach(b=>b.click()); }""")
    await pg.wait_for_timeout(500)
    info = await pg.evaluate("""()=>{ const m = document.querySelector('main'); const vis = [...m.querySelectorAll('.opts.vis')];
      const cols = vis.map(v => getComputedStyle(v).gridTemplateColumns.split(' ').length);
      const svgs = [...m.querySelectorAll('svg')]; const emptyFig = [...m.querySelectorAll('figure')].filter(f=>!f.querySelector('svg,table,.u3flow,.u3pair,.u4io,.math,.u2row')).length;
      const nocap = [...m.querySelectorAll('figure.u2fig')].filter(f=>!(f.querySelector('figcaption')||{}).textContent).length;
      const txt = m.innerText; return { figs: m.querySelectorAll('figure.u2fig').length, widgets: m.querySelectorAll('[data-widget]').length, cards: m.querySelectorAll('.qcard, .q, [data-qid]').length,
        visGrids: vis.length, visCols: [...new Set(cols)], svgCount: svgs.length, nanText: /\\bNaN\\b|undefined/.test(txt), emptyFig, nocap,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1 }; }""")
    shot = OUT / f'{lid}-{width}-{"dark" if dark else "light"}.png'
    await pg.screenshot(path=str(shot), full_page=True)
    return info

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        # ---------- A. regression: Units 1-6 unchanged ----------
        ctx = await br.new_context(); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + BASE); await pg.wait_for_timeout(1200); a = await pg.evaluate(SNAP)
        await pg.goto('file://' + BUILD); await pg.wait_for_timeout(1200); b = await pg.evaluate(SNAP)
        changed = [k for k in a['q'] if a['q'][k] != b['q'].get(k)]
        R['A_regression'] = { 'base_questions': len(a['q']), 'build_questions': len(b['q']), 'new_questions': len([k for k in b['q'] if k not in a['q']]),
            'existing_changed': changed[:20], 'cards_same_prefix': b['cards'].startswith(a['cards'][:-1]) or a['cards'][:-1] in b['cards'],
            'lessons_base': len(a['lessons']), 'lessons_build': len(b['lessons']), 'old_lessons_order_same': b['lessons'][:len(a['lessons'])] == a['lessons'],
            'old_bodies_same': all(a['bodies'][k]==b['bodies'][k] for k in a['bodies']), 'quizzes_1_6_same': a['quizzes']==b['quizzes'], 'gloss_base': a['gloss'], 'gloss_build': b['gloss'], 'page_errors': errs[:5] }
        # ---------- B. generators and lazy items, 400 / 40 runs ----------
        R['B_items'] = await pg.evaluate("""(U7)=>{ const out = {bad:[], counts:{}};
          Object.entries(Q).filter(([id,q])=>U7.includes(q.lesson)).forEach(([id,q])=>{ const n = q.gen ? 400 : q.build ? 40 : 1; const answers = new Set();
            for(let r=0;r<n;r++){ let i; try{ i = instance(id); }catch(e){ out.bad.push(id+' throws '+e.message); break; }
              const txt = JSON.stringify([i.prompt, i.options, i.explain]); if(/NaN|undefined|Infinity/.test(txt)){ out.bad.push(id+' NaN/undefined'); break; }
              if(i.type==='mc'){ if(!(i.answer>=0 && i.answer<i.options.length)){ out.bad.push(id+' answer index'); break; } if(new Set(i.options).size!==i.options.length){ out.bad.push(id+' duplicate choices'); break; }
                if(i.kind!=='tf' && i.options.length!==5){ out.bad.push(id+' choices '+i.options.length); break; }
                if(i.visual && (!i.optDesc || i.optDesc.length!==5 || i.options.some(o=>!/<svg/.test(o)))){ out.bad.push(id+' visual choices'); break; }
                if(i.visual && i.options.some((o,k)=>!o.includes('Graph '+'ABCDE'[k]))){ out.bad.push(id+' aria letters'); break; } }
              if(i.type==='num'){ if(!(typeof i.answer==='number' && isFinite(i.answer))){ out.bad.push(id+' num'); break; } answers.add(i.answer); } }
            out.counts[id] = n; });
          out.items = Object.keys(out.counts).length; return out; }""", U7)
        # ---------- C. every lesson at 375 light and 1100 dark ----------
        R['C_lessons'] = {}
        for lid in U7:
            R['C_lessons'][lid] = { '375_light': await lesson_checks(pg, 'file://'+BUILD, lid, 375, False), '1100_dark': await lesson_checks(pg, 'file://'+BUILD, lid, 1100, True) }
        R['C_page_errors'] = errs[:10]
        # plan/core counts and progress counter
        R['C_plan'] = await pg.evaluate("""(U7)=>Object.fromEntries(U7.map(l=>[l, { core: LBYID[l].core.length, more: (PLAN[l].more||[]).length, checks: Object.keys(Q).filter(k=>k.startsWith(l+'c-')).length, cards: (CARD_LIST[l]||[]).length, cardsWithPicture: (CARD_LIST[l]||[]).filter(c=>c[5]).length, writing: Object.values(WRITE).filter(w=>w.lesson===l).length }]))""", U7)
        await ctx.close()

        # ---------- D. quiz: nothing revealed before submit; results after; storage ----------
        ctx = await br.new_context(viewport={'width':375,'height':900}); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://'+BUILD+'#quiz7'); await pg.wait_for_timeout(900)
        before = await pg.evaluate("()=>JSON.stringify({q6:S.quiz6, rev:Object.keys(S.review).length})")
        start = await pg.query_selector('#q7new') or await pg.query_selector('#q7resume')
        if start: await start.click(); await pg.wait_for_timeout(300)
        leaks = []; vis_cols = set()
        for k in range(22):
            opts = await pg.query_selector_all('main .opt');
            if not opts: break
            await opts[0].click(); await pg.wait_for_timeout(120)
            leak = await pg.evaluate("()=>{ const m=document.querySelector('main'); return { cls: m.querySelectorAll('.opt.right,.opt.wrong,.right,.wrong').length, expl: /That.s right|Not quite|Correct answer|Explanation/.test(m.innerText), vis: m.querySelector('.opts.vis') ? getComputedStyle(m.querySelector('.opts.vis')).gridTemplateColumns.split(' ').length : 0 }; }")
            if leak['cls'] or leak['expl']: leaks.append((k, leak))
            if leak['vis']: vis_cols.add(leak['vis'])
            nxt = await pg.query_selector('#q7next')
            if nxt and await nxt.is_enabled(): await nxt.click(); await pg.wait_for_timeout(120)
        await pg.screenshot(path=str(OUT/'quiz-during-375.png'), full_page=True)
        sub = await pg.query_selector('#q7submit')
        if sub: await sub.click(); await pg.wait_for_timeout(300)
        yes = await pg.query_selector('#q7yes')
        if yes: await yes.click(); await pg.wait_for_timeout(600)
        after = await pg.evaluate("""()=>{ const m=document.querySelector('main'); return { cards: m.querySelectorAll('.q7r, [id^=q7r-], .qres, .result').length, txt: m.innerText.slice(0,300), q7: S.quiz7, q6: S.quiz6,
          writtenBtns: [...m.querySelectorAll('button')].filter(b=>/Change to written response/.test(b.textContent)).length, versionBtns: [...m.querySelectorAll('button')].filter(b=>/Ask for a new version/.test(b.textContent)).length,
          rev: Object.keys(S.review).length, cardsQueued: Object.keys(S.review).filter(k=>k.startsWith('c-l3')).length }; }""")
        await pg.screenshot(path=str(OUT/'quiz-results-375.png'), full_page=True)
        R['D_quiz'] = { 'answered_with_first_choice': 22, 'leaks_during_quiz': leaks, 'graph_choice_columns_at_375': sorted(vis_cols), 'before': before,
            'after': { k: after[k] for k in ['writtenBtns','versionBtns','rev','cardsQueued'] }, 'quiz7_saved': after['q7'], 'quiz6_untouched': json.dumps(after['q6']) == json.dumps(json.loads(before)['q6']), 'results_text': after['txt'], 'page_errors': errs[:5] }
        await ctx.close()

        # ---------- E. flashcard auto-add ----------
        ctx = await br.new_context(); pg = await ctx.new_page()
        await pg.goto('file://'+BUILD); await pg.wait_for_timeout(900)
        R['E_cards'] = await pg.evaluate("""()=>{ const out = {};
          const custom = 'u-test-l33'; S.cards = S.cards || {}; if(typeof CUSTOM !== 'undefined'){}
          const n0 = Object.keys(S.review).length;
          recordPractice('l34-tf-ban', true); out.moreAnswerAdds = Object.keys(S.review).filter(k=>k.startsWith('c-l34')).length;
          S.review['c-l33-3'] = { box:2, due: Date.now()+5*864e5, t:'card', lesson:'l33' }; S.mastered = S.mastered||{}; S.mastered['c-l33-4'] = Date.now(); S.deleted = S.deleted||{}; S.deleted['c-l33-5'] = { at:Date.now(), kind:'card', lesson:'l33', reasons:[] };
          recordPractice('l33-def', true); const l33 = Object.keys(S.review).filter(k=>k.startsWith('c-l33'));
          out.l33Added = l33.length; out.l33KeptStep = S.review['c-l33-3'].box; out.masteredSkipped = !S.review['c-l33-4']; out.deletedSkipped = !S.review['c-l33-5'];
          const today = startOfDay(Date.now()); out.dueTodayStep1 = l33.filter(k=>k!=='c-l33-3').every(k=>S.review[k].box===0 && S.review[k].due===today);
          out.secondSyncAdds = syncAutoCards();
          recordPractice('l34-int-def', true); out.l34Added = Object.keys(S.review).filter(k=>k.startsWith('c-l34')).length;
          const c0 = Object.keys(S.review).filter(k=>k.startsWith('c-l37')).length; recordPractice('q7-lor-1', false); out.quizAnswerAddsCards = Object.keys(S.review).filter(k=>k.startsWith('c-l37')).length - c0;
          out.l33Started = lessonStarted('l33'); out.l36Started = lessonStarted('l36'); return out; }""")
        # card back picture survives a text edit of a built-in card
        R['E_cards']['picture'] = await pg.evaluate("""()=>{ const c = BASE_CARDS['c-l33-0']; return { hasVis: !!c.vis, visHasFigure: /figure|svg/.test(c.vis||'') }; }""")
        await ctx.close()

        # ---------- F. written response and new-version request (Claude mocked) ----------
        ctx = await br.new_context(viewport={'width':375,'height':900}); await ctx.add_init_script(MOCK_CLAUDE); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://'+BUILD+'#l33'); await pg.wait_for_timeout(1000)
        F = {}
        for qid in ['l33-gr-neg','l33-g-opt','l33-cbs']:
            r = await pg.evaluate("""async (qid)=>{ const host = document.createElement('div'); document.querySelector('main').appendChild(host);
              const inst = instance(qid); qExtras(qid, inst, host, {}, ()=>{}); const wb = [...host.querySelectorAll('button')].find(b=>/Change to written response/.test(b.textContent));
              if(!wb) return {err:'no written button'}; wb.click(); await new Promise(r=>setTimeout(r,400)); const keep = host.querySelector('.keep'); if(!keep) return {err:'no preview', html: host.innerText.slice(0,200)};
              const prev = host.innerText; keep.click(); const w = S.written[qid];
              const vb = [...host.querySelectorAll('button')].find(b=>/Ask for a new version/.test(b.textContent)); vb.click(); await new Promise(r=>setTimeout(r,100));
              const ta = host.querySelector('textarea'); if(ta) ta.value = 'different numbers'; const send = host.querySelector('.qx-box button'); if(send) send.click(); await new Promise(r=>setTimeout(r,200));
              const reps = (typeof REPORTS !== 'undefined' ? REPORTS : null); const pending = JSON.stringify(localStorage).includes('variant:'+qid);
              return { preview: /Use this version|Keep|Try again/.test(prev), saved: !!w, vis: !!(w && w.vis), ex: !!(w && w.ex), key: w && w.key.slice(0,80), frozen: !!(w && (w.ex || !Q[qid].gen)), variantQueued: pending }; }""", qid)
            F[qid] = r
        # written version shows in the lesson but the unit quiz keeps the original
        F['quiz_keeps_original'] = await pg.evaluate("()=>{ S.written['q7-neg-2'] = { prompt:'x', model:'y', points:[], key:'k', from:'mc', at:1 }; const i = instance('q7-neg-2'); return i.type==='mc' && i.options.length===5; }")
        F['page_errors'] = errs[:5]
        R['F_written'] = F
        await ctx.close()

        # ---------- G. old saved progress loads unchanged; H. storage blocked and Claude unavailable ----------
        old = pathlib.Path(OLD).read_text()
        ctx = await br.new_context(); await ctx.add_init_script(f"try{{ localStorage.setItem('micro-workbook-v1', {json.dumps(old)}); }}catch(e){{}}"); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://'+BUILD); await pg.wait_for_timeout(1200)
        R['G_old_state'] = await pg.evaluate("""(oldRaw)=>{ const o = JSON.parse(oldRaw); const keys = ['lessons','review','mastered','written','reports','deleted','ratings','quiz','quiz2','quiz3','quiz4','quiz5','quiz6'];
          const same = Object.fromEntries(keys.map(k=>[k, o[k]===undefined ? 'absent in old' : JSON.stringify(o[k])===JSON.stringify(S[k])]));
          return { same, quiz7: S.quiz7, homeHasUnit7: document.querySelector('main').innerText.includes('Market Failure and the Role of Government'), laterHidden: !document.querySelector('section.later') || document.querySelector('section.later').hidden }; }""", old)
        R['G_page_errors'] = errs[:5]
        await pg.screenshot(path=str(OUT/'home-375.png'), full_page=False)
        await ctx.close()
        ctx = await br.new_context(); await ctx.add_init_script("Storage.prototype.getItem = function(){ throw new Error('blocked'); }; Storage.prototype.setItem = function(){ throw new Error('blocked'); };"); pg = await ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        for h in ['#l35', '#quiz7', '#l37']:
            await pg.goto('file://'+BUILD+h); await pg.wait_for_timeout(700)
        await pg.goto('file://'+BUILD+'#l33'); await pg.wait_for_timeout(700)
        ai = await pg.evaluate("""async ()=>{ const host = document.createElement('div'); document.querySelector('main').appendChild(host); qExtras('l33-cbs', instance('l33-cbs'), host, {}, ()=>{});
          const wb = [...host.querySelectorAll('button')].find(b=>/Change to written response/.test(b.textContent)); wb.click(); await new Promise(r=>setTimeout(r,300)); return host.innerText.slice(0,200); }""")
        R['H_storage_blocked_and_no_claude'] = { 'page_errors': errs[:5], 'written_without_claude': ai }
        await ctx.close()

        # ---------- I. widgets at test-note settings ----------
        ctx = await br.new_context(viewport={'width':375,'height':900}); pg = await ctx.new_page()
        async def wset(lid, sel_vals, read):
            await pg.goto('file://'+BUILD+'#'+lid); await pg.wait_for_timeout(600)
            return await pg.evaluate("""([sv, rd])=>{ const out = []; sv.forEach(step => { Object.entries(step).forEach(([sel,val])=>{ const el = document.querySelector(sel); if(el.type==='checkbox'){ el.checked = !!val; el.dispatchEvent(new Event('change')); } else if(el.tagName==='BUTTON'){ el.click(); } else { el.value = val; el.dispatchEvent(new Event('input')); } });
              out.push(rd.map(s => (document.querySelector(s)||{}).textContent)); }); return out; }""", [sel_vals, read])
        I = {}
        I['extlab'] = await wset('l33', [{'#xl-e':0},{'#xl-e':100},{'#xl-e':200}], ['.xl-o','.xl-d'])
        I['taxlab'] = await wset('l34', [{'#tl-t':0},{'#tl-t':1000},{'#tl-t':1500},{'#tl-t':3000}], ['.tl-c','.tl-k','.tl-p'])
        I['pgcalc'] = await wset('l35', [{'#pg-n':50,'#pg-v':40},{'#pg-n':10,'#pg-v':40},{'#pg-n':200,'#pg-v':10},{'#pg-n':5,'#pg-v':100}], ['.pg-t','.pg-w','.pg-a'])
        I['hhi'] = await wset('l36', [{'[data-k="ws"]':1,'.hh-m':0},{'.hh-m':1},{'[data-k="five"]':1,'.hh-m':0},{'.hh-m':1},{'[data-k="giant"]':1,'.hh-m':0},{'.hh-m':1},{'[data-k="many"]':1,'.hh-m':0},{'.hh-m':1},{'[data-k="mono"]':1}], ['.hh-c','.hh-h'])
        I['lorenz'] = await wset('l37', [{'[data-k="eq"]':1},{'[data-k="y80"]':1},{'[data-k="y13"]':1},{'[data-k="mu"]':1}], ['.lz-b','.lz-gi'])
        I['nit'] = await wset('l37', [{'#nt-r':25,'#nt-e':0},{'#nt-e':8000},{'#nt-r':50,'#nt-e':0},{'#nt-e':4000},{'#nt-r':100,'#nt-e':0},{'#nt-e':6000}], ['.nt-p','.nt-t','.nt-k'])
        # sorters: click right answer on item 1 and a wrong one on item 2
        I['sorters'] = {}
        for lid, w in [('l33','extsort'),('l34','remsort'),('l35','goodsort'),('l36','polsort'),('l37','lorsort')]:
            await pg.goto('file://'+BUILD+'#'+lid); await pg.wait_for_timeout(500)
            I['sorters'][w] = await pg.evaluate("""(w)=>{ const el = document.querySelector(`[data-widget="${w}"]`); const items = el.querySelectorAll('.sort-item'); const res = [];
              items.forEach((it,i)=>{ const bs = it.querySelectorAll('button'); bs[i%bs.length].click(); res.push(!it.querySelector('.why').hidden && it.querySelector('.why').textContent.length>10); });
              return { items: items.length, allExplained: res.every(Boolean), score: el.querySelector('.score').textContent }; }""", w)
        R['I_widgets'] = I
        await ctx.close(); await br.close()
    print(json.dumps(R, indent=1, default=str))

asyncio.run(main())
