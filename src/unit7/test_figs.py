import sys, asyncio
from playwright.async_api import async_playwright
from PIL import Image
BUILD, OUT = sys.argv[1], sys.argv[2]
async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width':375,'height':900}, device_scale_factor=1)
        paths = []
        for lid in ['l33','l34','l35','l36','l37']:
            await pg.goto('file://'+BUILD+'#'+lid); await pg.wait_for_timeout(700)
            figs = await pg.query_selector_all('main figure.u2fig')
            for k, f in enumerate(figs):
                path = f'{OUT}/fig-{lid}-{k}.png'; await f.screenshot(path=path); paths.append(path)
            ws = await pg.query_selector_all('main [data-widget]')
            for k, w in enumerate(ws):
                path = f'{OUT}/w-{lid}-{k}.png'; await w.screenshot(path=path); paths.append(path)
        await br.close()
    # montages of 8 per sheet, 2 columns
    for s in range(0, len(paths), 8):
        ims = [Image.open(x) for x in paths[s:s+8]]; W = 2*375; rows = []
        for i in range(0, len(ims), 2):
            pair = ims[i:i+2]; h = max(im.height for im in pair); row = Image.new('RGB', (W, h), 'white')
            for j, im in enumerate(pair): row.paste(im, (j*375, 0))
            rows.append(row)
        H = sum(r.height for r in rows); sheet = Image.new('RGB', (W, H), 'white'); y = 0
        for r in rows: sheet.paste(r, (0, y)); y += r.height
        sheet.save(f'{OUT}/sheet-{s//8}.png'); print(f'sheet-{s//8}.png', W, H, [x.split('/')[-1] for x in paths[s:s+8]])
asyncio.run(main())
