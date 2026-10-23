/* ===== Report fixes (2026-10-23) =====
   Reports r1792630873454-vq8k and r1792631027487-pdrz: l4-mktsoc and l4-capitalism become typed answers checked by Claude
   (same grader style as typed flashcards). Ids, tags and lesson placement are unchanged, so progress and review dates carry over. */
function typedQ(id, prompt, model, points, explain){
  const q = Q[id]; delete q.options; delete q.answer; delete q.keepOrder;
  Object.assign(q, { type:'text', kind:'text', prompt, model, points, explain });
}
typedQ('l4-mktsoc', 'Economic systems can be classified by who owns resources and how resources are allocated. What is an economy called that combines <b>government ownership</b> of resources with <b>market allocation</b>? Type the name and say why it fits.',
  'Market socialism: the government owns the resources (the socialism side), but markets allocate them (the market side).',
  ['Names market socialism', 'Links government ownership to the socialism side and market allocation to the market side'],
  '<p>Government owns (the socialism side), markets allocate (the market side): <b>market socialism</b>.</p><p>The common slip is "socialism," which answers only the ownership question. In your course\'s grid, socialism means government ownership <i>and</i> planned allocation.</p>');
typedQ('l4-capitalism', 'An economy has <b>private ownership</b> of resources and <b>market (private) allocation</b>. What is this system called? Type the name and say why it fits.',
  'Capitalism: private individuals and firms own the resources, and markets (prices) decide how they are allocated.',
  ['Names capitalism', 'Mentions both private ownership and market allocation'],
  '<p>Private + market = <b>capitalism</b>, the box closest to the U.S.</p><p>The common slip is "command capitalism," which keeps private ownership but swaps in planned allocation. Check both questions: who owns, and who allocates.</p>');
function qTextGradePrompt(q, text){
  return `You are checking a beginner's typed answer to a practice question in an introductory microeconomics course (preparing for the CLEP Principles of Microeconomics exam). Judge the meaning, not the wording: accept paraphrases, everyday language and small spelling mistakes when the economics is right.

Question: ${textOf(Object.assign(document.createElement('div'),{innerHTML:q.prompt}))}
Model answer: ${q.model}
Key points: ${(q.points||[]).join('; ')}

Student's answer:
"""
${text}
"""

Reply with only JSON in this shape:
{"verdict":"correct","got":"one sentence on what the answer gets right, or an empty string","missing":"one or two specific sentences on what is missing or wrong, or an empty string","error":"one sentence naming any factually wrong economics, or an empty string"}
verdict must be "correct" (names the right answer and gives an acceptable reason), "partial" (right name with no or a weak reason, or a reason with the wrong name) or "incorrect" (wrong, off-topic or blank).`;
}
const textFb = q => { const g = q._grade; let s='';
  if(g){ if(g.got) s+=`<p><b>What you got:</b> ${esc(g.got)}</p>`; if(g.missing) s+=`<p><b>Missing:</b> ${esc(g.missing)}</p>`; if(g.error) s+=`<p><b>Watch out:</b> ${esc(g.error)}</p>`; }
  return s + `<p class="muted small">Model answer: ${q.model}</p>`; };
