#!/usr/bin/env python3
"""Review upgrades 3 (2026-11-02), asked for by Eli:
1. "Change to written response": a button next to the 1-3 rating on every question (lesson core, More practice,
   quick checks, Review, practice sets, the single-question view and the Unit 2-5 quiz results). Claude rewrites the
   question in the page as a short typed answer (same idea, same numbers, same correct answer); Eli previews it and
   keeps it or tries again. From then on the question shows as a written response everywhere except while taking
   a unit quiz. Claude checks typed answers against its model answer AND the original correct answer.
   "Switch back to the original" undoes it. Stored in the progress doc as `written`.
2. "Ask for a new version": a button next to the rating on every question. It files a request in the Reports tab
   (report doc with where "variant:<qid>"). In a fix pass Claude writes the new version (new numbers, graph look,
   story and choices; same concept) into VARIANTS. All versions share one review schedule (same question id);
   lessons and Review pick a version at random; unit quizzes always use version 1.
3. The 1-3 rating now also shows on the Unit 2-5 quiz results cards (it already showed everywhere else).
Patches index.html in place. Every patch must match the stated number of times, or nothing is written.
Usage: python3 src/review3/patch.py [path/to/index.html]"""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'index.html')
s = open(PATH, encoding='utf8').read()
if 'function qExtras(' in s: sys.exit('Already patched: ' + PATH)

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count: sys.exit(f'PATCH FAILED ({n} matches, expected {count}): {old[:90]!r}')
    s = s.replace(old, new)

# 1. CSS
rep(".rate{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.85rem;color:var(--muted)}",
".rate{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.85rem;color:var(--muted)}\n"
"/* Review upgrades 3: written response, new-version requests */\n"
".qx{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;margin-top:8px}\n"
".qx-box{flex-basis:100%;margin-top:4px;padding:10px 12px;border:1px dashed var(--line);border-radius:8px;background:var(--surface-2);min-width:0}\n"
".qx-box p{margin:.3rem 0}\n"
".qx-box textarea{width:100%;margin-top:4px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit;line-height:1.5;resize:vertical}\n"
".wr-prev{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:8px;padding:10px 12px;margin:8px 0;overflow-wrap:anywhere}\n"
".wr-prev details{margin-top:6px;font-size:.92rem}\n"
".wr-note{font-size:.82rem;color:var(--muted);margin:0 0 6px}")

# 2. Progress doc gains `written`
rep("st.ratings=st.ratings||{}; return st; }",
    "st.ratings=st.ratings||{}; st.written=st.written||{}; return st; }")

# 3. Helpers
rep("/* Miss choice: how a missed item comes back.",
r"""/* ---------- Review upgrades 3: written-response versions and new-version requests ---------- */
/* Extra versions of a question, written in fix passes for "variant:<qid>" requests. Q[qid] is version 1.
   Each entry is a question object like Q's (type, kind, prompt, options, answer, explain, keepOrder; or gen()).
   Versions share the question id, so they share one review schedule, rating and report history. */
const VARIANTS = {};
function versionsOf(qid){ return [Q[qid], ...(VARIANTS[qid] || [])]; }
function pickVersion(qid){
  const vs = versionsOf(qid); if(vs.length < 2) return instance(qid);
  const k = Math.floor(Math.random() * vs.length), b = vs[k];
  const inst = b.gen ? b.gen() : b.build ? b.build() : { ...b };
  inst._ver = k + 1; inst._vers = vs.length; return inst;
}
const plainOf = html => textOf(Object.assign(document.createElement('div'), { innerHTML: html || '' }));
function exhibitsOf(html){
  const d = document.createElement('div'); d.innerHTML = html || ''; const picked = [];
  d.querySelectorAll('.tbl-wrap,.qg,figure,table,svg,img,pre').forEach(n => { if(!picked.some(p => p.contains(n))) picked.push(n); });
  return picked.map(n => n.outerHTML).join('');
}
function correctText(inst){
  if(!inst) return '';
  if(inst.type==='mc') return plainOf(inst.options[inst.answer]);
  if(inst.type==='num') return `${inst.unit==='dollars'?money(inst.answer):fmt(inst.answer)} ${inst.unit||''}`.trim();
  return plainOf(inst.model || '');
}
/* The written version of a question, or null. Unit quizzes never use it (qInst checks ctx). */
function writtenInst(qid){
  const w = (S.written || {})[qid]; if(!w || !Q[qid]) return null;
  let ex = w.ex || '', explain = w.explain || '';
  if(!Q[qid].gen){ try{ const b = instance(qid); ex = exhibitsOf(b.prompt); explain = b.explain || ''; }catch(e){} }
  return { type:'text', kind:'written', _written:true,
    prompt: `<p>${esc(w.prompt)}</p>${ex}`,
    model: esc(w.model),
    points: [...(w.points || []), `The correct answer in the original version of this question: ${w.key}`],
    explain };
}
function qInst(qid, ctx){
  if(ctx === 'quiz') return instance(qid);
  return writtenInst(qid) || pickVersion(qid);
}
function writtenRewritePrompt(qid, inst){
  const L = LBYID[Q[qid].lesson];
  const kind = inst.type==='mc' ? (Q[qid].kind==='tf' ? 'true-or-false' : 'multiple-choice') : inst.type==='num' ? 'numeric worked problem' : 'practice';
  const letters = 'ABCDE';
  const choices = inst.type==='mc' ? '\nChoices:\n' + inst.options.map((o,i)=>`${letters[i]}. ${plainOf(o)}${i===inst.answer?'  (correct)':''}`).join('\n') : '';
  const hasEx = !!exhibitsOf(inst.prompt);
  return `You are rewriting one practice question from a beginner's microeconomics workbook (CLEP Principles of Microeconomics${L?`, Lesson ${L.n}: ${L.title}`:''}) as a short written-response question. The student will type 1-3 sentences in their own words, and Claude will later check that answer against your model answer.

Original ${kind} question:
${plainOf(inst.prompt)}${choices}
Correct answer: ${correctText(inst)}
Explanation from the workbook: ${plainOf(inst.explain).slice(0,1500)}

Rules:
- Test the same idea with the same correct answer. Keep every number, name and setting from the original.
- ${hasEx ? 'The original table or graph stays on screen right below your question, so refer to it ("the table below", "the graph below") instead of repeating its numbers.' : 'The question must make sense on its own.'}
- Ask for the answer and a short reason (why, or how you know), so a lucky guess cannot pass.
- Do not reveal or hint at the answer. Do not list choices. Do not write "Which of the following".
- Plain text only: no markdown, no bullet points, no em dashes. Keep the question under 60 words.
- Model answer: 1-3 plain sentences a strong beginner could write. Key points: 2 or 3 short phrases a correct answer must contain.

Reply with only JSON in this shape:
{"prompt":"the written question","model":"the model answer","points":["key point","key point"]}`;
}
function qExtras(qid, inst, host, ctx, onSwitch){
  if(!Q[qid]) return;
  const row = document.createElement('div'); row.className = 'qx'; host.appendChild(row);
  const isWritten = () => !!(S.written || {})[qid];
  const canWrite = inst && Q[qid].type !== 'text' && (inst._written || inst.type==='mc' || inst.type==='num');
  const wb = document.createElement('button'); wb.type = 'button'; wb.className = 'btn ghost sm';
  const vb = document.createElement('button'); vb.type = 'button'; vb.className = 'btn ghost sm'; vb.textContent = 'Ask for a new version';
  const tag = document.createElement('span'); tag.dataset.rep = 'variant:' + qid;
  const label = () => { wb.textContent = isWritten() ? 'Switch back to the original' : 'Change to written response'; };
  const closeBox = () => { const b = row.querySelector('.qx-box'); if(b) b.remove(); };
  const openBox = html => { closeBox(); const b = document.createElement('div'); b.className = 'qx-box'; b.innerHTML = html; row.appendChild(b); return b; };
  if(canWrite){ label(); row.appendChild(wb); }
  row.appendChild(vb); row.appendChild(tag); fillTag(tag);
  wb.onclick = async () => {
    if(isWritten()){
      delete S.written[qid]; save(); label(); onSwitch && onSwitch();
      openBox('<p class="small">Switched back. Next time you\'ll see the original question.</p>'); return;
    }
    if(!inst || inst._written){ openBox('<p class="small">Already switched back. Open the question again to make a new written version.</p>'); return; }
    const box = openBox('<p class="small">Claude is rewriting this as a written question…</p><div class="row"><button class="btn ghost sm stop" type="button">Stop</button></div>');
    const sample = await getSample();
    if(!sample){ box.innerHTML = '<p class="small">Rewriting needs Claude, which isn\'t available in this view. Open the workbook in the Claude app while signed in.</p>'; return; }
    const ctl = new AbortController(); $('.stop', box).onclick = () => ctl.abort();
    wb.disabled = true;
    try{
      const r = await sample.json(writtenRewritePrompt(qid, inst), { ...OPUS_LOW, signal: ctl.signal });
      const p = String((r && r.prompt) || '').trim(), m = String((r && r.model) || '').trim();
      if(p.length < 10 || p.length > 700 || m.length < 3) throw { code:'invalid_json' };
      const pts = Array.isArray(r.points) ? r.points.map(x => String(x).slice(0,200)).filter(Boolean).slice(0,4) : [];
      const rec = { prompt:p, model:m.slice(0,800), points:pts, key:correctText(inst).slice(0,400), from:inst.type, at:Date.now() };
      if(Q[qid].gen){
        rec.ex = exhibitsOf(inst.prompt); rec.explain = String(inst.explain || '');
        if(rec.ex.length + rec.explain.length > 40000){ box.innerHTML = '<p class="small">This question\'s graph is too large to save as a written version. Try a different one, or ask for a new version instead.</p>'; return; }
      }
      box.innerHTML = `<p class="small"><b>Here's the written version.</b> Keep it, or have Claude try again.</p><div class="wr-prev"><p style="margin:0">${esc(p)}</p>${exhibitsOf(inst.prompt)?'<p class="wr-note" style="margin-top:6px">The same table or graph will show under it.</p>':''}<details><summary>Model answer</summary><p>${esc(m)}</p>${pts.length?`<p class="small muted">Key points: ${esc(pts.join('; '))}</p>`:''}</details></div><p class="wr-note">It replaces this question in lessons and Review (unit quizzes keep the original). Your schedule, rating and reports stay with it. You can switch back any time.</p><div class="row"><button class="btn sm keep" type="button">Use this version</button><button class="btn ghost sm again" type="button">Try again</button><button class="btn ghost sm no" type="button">Cancel</button></div>`;
      $('.keep', box).onclick = () => { S.written = S.written || {}; S.written[qid] = rec; save(); label(); box.innerHTML = '<p class="small">Saved. From now on this question comes up as a written response. You can switch back any time.</p>'; };
      $('.again', box).onclick = () => { closeBox(); wb.click(); };
      $('.no', box).onclick = closeBox;
    }catch(err){
      box.innerHTML = `<p class="small">${esc(err && err.code==='invalid_json' ? 'Claude\'s rewrite didn\'t come back in a usable form. Try again.' : sampleErrorMsg(err && err.code))}</p>`;
    }finally{ wb.disabled = false; }
  };
  vb.onclick = () => {
    if(row.querySelector('.qx-box textarea')) return;
    const box = openBox(`<label class="small muted" for="vr-${esc(qid)}">What should change? (optional: numbers, graph, story, choices)</label><textarea id="vr-${esc(qid)}" rows="2" maxlength="1000" placeholder="Leave blank for all of them"></textarea><p class="wr-note">Claude writes it the next time you ask it to fix your workbook reports. Both versions stay and share one review schedule.</p><div class="row"><button class="btn sm" type="button">Send request</button><button class="btn ghost sm" type="button">Cancel</button></div>`);
    const [send, cancel] = box.querySelectorAll('button'), ta = $('textarea', box);
    cancel.onclick = closeBox;
    send.onclick = async () => {
      send.disabled = true; cancel.disabled = true;
      const note = ta.value.trim() || 'New version: new numbers, graph look, story and choices; same concept.';
      let ctxText = '';
      try{ const b = (inst && !inst._written) ? inst : instance(qid);
        ctxText = `Question as shown:\n${plainOf(b.prompt)}${b.type==='mc'?'\nChoices:\n'+b.options.map((o,i)=>`${'ABCDE'[i]}. ${plainOf(o)}`).join('\n'):''}\nCorrect answer: ${correctText(b)}${inst && inst._ver ? `\n(Shown as version ${inst._ver} of ${inst._vers}.)` : ''}`; }catch(e){}
      const how = await addReport('variant:' + qid, note, ctxText);
      box.innerHTML = how==='sent'
        ? '<p class="small" style="margin:0">Requested. Track it under <a href="#reports">Reports</a>. Ask Claude to "fix my workbook reports" when you want it built.</p>'
        : '<p class="small" style="margin:0">Saved on this device. It will be sent when you\'re signed in to Claude and online.</p>';
      fillTag(tag); setTimeout(() => { if(box.isConnected) box.remove(); }, 5000);
    };
    ta.focus();
  };
}
/* Miss choice: how a missed item comes back.""")

# 4. Question card: written or random version, labels, switch back, extras next to the rating
rep("const KIND_LABEL = { mc:'Multiple choice', tf:'True or false', graph:'Graph', num:'Worked problem', text:'Typed answer' };",
    "const KIND_LABEL = { mc:'Multiple choice', tf:'True or false', graph:'Graph', num:'Worked problem', text:'Typed answer', written:'Written response' };")
rep("let inst = instance(qid), chosen = null, shown = null;",
    "let inst = qInst(qid, ctx), chosen = null, shown = null;")
rep("${Q[qid].gen?' · new numbers each time':''}",
    "${Q[qid].gen&&!inst._written?' · new numbers each time':''}${inst._written?' · your version':''}${inst._vers?` · version ${inst._ver} of ${inst._vers}`:''}")
rep("mountReport('question:'+qid, $('.q-tools > .rep-slot', el));",
    "mountReport('question:'+qid, $('.q-tools > .rep-slot', el));\n"
    "    if(inst._written){ const sb = document.createElement('button'); sb.type='button'; sb.className='rep-link'; sb.textContent='Switch back to the original';\n"
    "      sb.onclick = () => { delete S.written[qid]; save(); if(!chosen){ inst = qInst(qid, ctx); draw(); } else { sb.replaceWith(Object.assign(document.createElement('span'),{className:'small muted',textContent:'Switched back. Next time you\\'ll see the original.'})); } };\n"
    "      $('.q-tools > .rep-slot', el).appendChild(sb); }")
rep("if(Q[qid].gen && ctx==='practice'){ const b=document.createElement('button'); b.className='btn ghost sm'; b.textContent='Try new numbers'; b.onclick=()=>{ inst = instance(qid); draw(); }; foot.appendChild(b); }",
    "if(Q[qid].gen && ctx==='practice' && !inst._written){ const b=document.createElement('button'); b.className='btn ghost sm'; b.textContent='Try new numbers'; b.onclick=()=>{ inst = qInst(qid, ctx); draw(); }; foot.appendChild(b); }")
rep("rr.appendChild(rateBox(qid)); fb.appendChild(rr);",
    "rr.appendChild(rateBox(qid)); if(ctx!=='quiz') qExtras(qid, inst, rr, ctx); fb.appendChild(rr);")

# 5. Unit 2-5 quiz results: rating plus the two buttons on each results card
rep("mountReport('question:'+id, $('.rep-slot', el));\n    box.appendChild(el);",
    "mountReport('question:'+id, $('.rep-slot', el));\n"
    "    { const rr = document.createElement('div'); rr.className = 'rate-row'; rr.appendChild(rateBox(id)); qExtras(id, Q[id].gen ? null : Q[id], rr, 'results'); el.appendChild(rr); }\n"
    "    box.appendChild(el);", count=4)

# 6. Reports: name new-version requests
rep("if(where.startsWith('explain:')){",
    "if(where.startsWith('variant:')){ const inner = describeWhere('question:'+where.slice(8)); return { title: inner.title + ' · New version request', snip: inner.snip, href: inner.href }; }\n"
    "  if(where.startsWith('explain:')){")
rep("tag.innerHTML = `${r.status==='fixed'?'Fixed':'Checked'} ${shortDay(r.fixedAt||r.at)}",
    "tag.innerHTML = `${String(r.where).startsWith('variant:') ? (r.status==='fixed'?'New version added':'Version request checked') : r.status==='fixed'?'Fixed':'Checked'} ${shortDay(r.fixedAt||r.at)}")
rep("} else tag.textContent = r.status==='unsent' ? 'Reported (not sent yet)' : `Reported ${shortDay(r.at)} · open`;",
    "} else if(String(r.where).startsWith('variant:')) tag.textContent = r.status==='unsent' ? 'New version requested (not sent yet)' : `New version requested ${shortDay(r.at)} · open`;\n"
    "  else tag.textContent = r.status==='unsent' ? 'Reported (not sent yet)' : `Reported ${shortDay(r.at)} · open`;")
rep("It works through the open ones, updates the page, and leaves a note on each report here.</p>",
    "It works through the open ones, updates the page, and leaves a note on each report here.</p><p class=\"small\">Requests from <b>Ask for a new version</b> under a question show here too; Claude writes the new version in the same pass.</p>")

open(PATH, 'w', encoding='utf8').write(s)
print('Patched', PATH)
