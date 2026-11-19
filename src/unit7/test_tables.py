import sys, asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width':375,'height':900}); res = {}
        for lid in ['l33','l34','l35','l36','l37']:
            await pg.goto('file://'+sys.argv[1]+'#'+lid); await pg.wait_for_timeout(700)
            await pg.evaluate("()=>{ document.querySelectorAll('details').forEach(d=>d.open=true); [...document.querySelectorAll('button')].filter(b=>/More practice/.test(b.textContent)).forEach(b=>b.click()); }"); await pg.wait_for_timeout(400)
            res[lid] = await pg.evaluate("()=>[...document.querySelectorAll('main .tbl-wrap')].filter(w=>w.scrollWidth>w.clientWidth+2).map(w=>{ const f=w.closest('figure'), q=w.closest('[data-qid],.qcard,.card'); return (f?'FIG: ':'Q: ')+w.querySelector('th').textContent+' | '+[...w.querySelectorAll('th')].map(t=>t.textContent).join('/')+' ('+w.scrollWidth+'>'+w.clientWidth+')'; })")
        await pg.goto('file://'+sys.argv[1]+'#quiz7'); await br.close(); print(json.dumps(res, indent=1))
asyncio.run(main())
