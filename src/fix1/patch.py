#!/usr/bin/env python3
"""Small live-page fixes (2026-11-12), found by the Unit 6 reviewers, asked for by Eli:
1. First render after a reload: progress saved on this device was loaded after the first render and, without an
   account connection, the page never re-rendered, so home showed blank progress until you navigated. Now it
   re-renders as soon as the saved progress is loaded.
2. "Lucky guess" showed on a unit-quiz question opened on its own page (#q-q6-...), where the answer isn't scored,
   so tapping it only changed the text. It now shows only where it does something: when the card has a lucky-guess
   handler (lesson pages, Review) or an Add to Review box (quick checks, extra practice).
Usage: python3 src/fix1/patch.py path/to/page.html   (edits in place; every patch must match once or nothing is written)"""
import sys
p = sys.argv[1]; s = open(p, encoding='utf8').read()
if '/* fix1 */' in s: sys.exit('Already patched')
def rep(a, b):
    global s
    n = s.count(a)
    if n != 1: sys.exit(f'PATCH FAILED ({n}): {a[:80]!r}')
    s = s.replace(a, b)
rep("const local = loadLocal(); if(local) S = normalize(local);", "const local = loadLocal(); if(local){ S = normalize(local); render(); } /* fix1 */")
rep("if(!(window.claude && typeof window.claude.use==='function')){ syncAutoCards(); refreshChrome(); return; }", "if(!(window.claude && typeof window.claude.use==='function')){ syncAutoCards(); render(); refreshChrome(); return; }")
rep("    if(!db || !uid){ syncAutoCards(); setSync(", "    if(!db || !uid){ syncAutoCards(); render(); setSync(")
rep("    setSync('local','Could not reach your account. Progress is saved on this device for now.');\n    syncAutoCards();\n  }", "    setSync('local','Could not reach your account. Progress is saved on this device for now.');\n    syncAutoCards(); render();\n  }")
rep("    if(ok && ctx!=='quiz'){\n      const v = $('.verdict', fb), lk", "    if(ok && ctx!=='quiz' && (onLucky || ob)){\n      const v = $('.verdict', fb), lk")
open(p, 'w', encoding='utf8').write(s); print('patched', p)
