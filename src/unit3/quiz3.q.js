/* ===== Unit 3 quiz pool (separate from lesson questions; five choices only; submit-then-reveal) ===== */
const QUIZ3 = [];
function qz3(id, lesson, prompt, options, answer, explain, keepOrder){ Q[id] = { lesson, type:'mc', kind:'mc', prompt, options, answer, explain, quiz:true, unitQuiz:3, keepOrder:!!keepOrder }; QUIZ3.push(id); }
