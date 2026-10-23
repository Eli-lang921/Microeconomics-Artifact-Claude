/* ===== Unit 2 quiz pool (separate from lesson questions; five choices only; submit-then-reveal) ===== */
const QUIZ2 = [];
function qz2(id, lesson, prompt, options, answer, explain, keepOrder){ Q[id] = { lesson, type:'mc', kind:'mc', prompt, options, answer, explain, quiz:true, unitQuiz:2, keepOrder:!!keepOrder }; QUIZ2.push(id); }
