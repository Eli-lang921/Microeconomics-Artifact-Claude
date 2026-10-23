# Microeconomics Workbook: build plan

Artifact: https://claude.ai/artifact/NcS17Vqfj1fYxqC93TBAki (one growing page; Units 2-7 get added to it)
Backup, version history and the live audit log: https://github.com/Eli-lang921/microeconomics-artifact-claude (GitHub only holds dated copies; the live artifact is the original).

This file lives in the GitHub repo and in the Claude Project (claude/microeconomics-workbook-plan.md); keep the two in step.
Course: Modern States, Principles of Microeconomics (CLEP). Source files: unit transcripts, slides, OpenStax textbook.

## Decisions (Oct 2026)
- Goal: pass CLEP and genuinely understand the material. Beginner level, every term defined.
- One artifact that grows unit by unit; Unit 1 is the pilot and template.
- Progress saved with the artifact database (per-user, private), so it syncs phone and PC when signed in. Two-device merge fix was offered and declined for now (newest copy wins).
- Each lesson: one-line summary, core section, analogy, worked example with real numbers, interactive widget(s), optional "Go deeper", outside links only when they add value (videos open in a new tab).
- Practice per lesson: 12 core questions on the page + 16 more behind a "More practice" button. Mix: 5-option exam-style multiple choice, true/false, graph questions, worked problems (some with new numbers each time).
- Question style follows College Board's official CLEP samples: five choices A-E, short "Which of the following" stems, some paired or reason-giving choices, a mix of terms, graphs, data tables and simple models. Questions are original, not copied. Number choices listed smallest to largest.
- Difficulty: match the exam, plus a slightly harder tier.
- Writing: 2-3 optional prompts per lesson, graded by Claude in the page (sample capability) against a 4-point checklist, with a model answer.
- Flashcards: 11-16 per lesson (see Flashcards below).
- Review tab: everything is spaced. Miss → back tomorrow; right first time → back in 7 days; each correct due review moves it up 1 → 3 → 7 → 21 → 60 days, then mastered. Practice anytime by lesson, mixed 10/20/all sets, flashcards, and review ahead; free practice never pushes items out, but misses always count. Unit-quiz questions are kept out of free practice so the quiz stays unseen.
- Unit quiz: 20 exam-style questions (5 choices), target 80%+ (Modern States voucher needs 75% on their final).
- "Explain this" under every lesson section, graph, question, flashcard and writing prompt (see below).
- "Report a problem" on every question, lesson, flashcard, Claude's writing grade, Claude's flashcard check and Claude's explanations (see Report inbox below).
- Clean, calm design with a progress bar.

## Explain this (built Oct 13 2026)
- Button under each lesson section (h2 in the body, h3 in Go deeper), each interactive graph (sends its current state), each question (practice, extra, quiz, review), each flashcard, and each writing prompt.
- Claude explains in plain language via the page's sample capability: core idea, everyday example with numbers, step-by-step math, why a wrong choice was tempting, exam relevance; under ~200 words. Follow-ups: "Simpler, please", "Another example", or a typed question. Answers stream in and are reused while the page stays open.
- Modes: unanswered questions and unflipped cards get "hint" mode (explains what's asked and the method, never reveals the answer). After answering: full explanation of why. Graded writing: explains the feedback. Unit 2 quiz in progress: "quizhint" mode (never reveals the answer, even in follow-ups).
- Code: `explainBox`, `xpPrompt` (the tutor prompt to adjust if explanations are off), `addSectionExplains`, `textOf`.
- Each tap uses a little of Eli's Claude usage.

## Flashcards (rebuilt Oct 13 2026)
- Each card: front term, a specific question, a precise answer, a concrete example (real numbers where possible), and a "Watch out" common mistake. 67 built-in cards in Unit 1 (L1 14, L2 14, L3 11, L4 16, L5 12); Unit 2 adds 86 (L6 16, L7 12, L8 12, L9 12, L10 11, L11 12, L12 11).
- Card ids are `c-<lesson>-<index>` and the review schedule uses them, so new built-in cards go at the END of a lesson's list; never reorder.
- Two ways to answer: Show answer (flip, then Knew it / Didn't know) or Type my answer (Claude checks it via sample: correct / partly right / not yet, what you got, what's missing; Claude's verdict pre-selects Knew it / Didn't know). The last mode used is remembered per device.
- Eli can edit any card and add his own: Flashcards page (`#cards`), "Edit this card" on any flipped card. Stored per user at `data/users/<id>/micro-workbook/cards/<cardId>` with fields `lesson, t, q, d, ex, tip, custom, at`. custom:true = his own card (id `u-...`); custom:false = his edit of a built-in (same id), which overrides it for him only; deleting that doc resets it. Signed-out changes wait in localStorage and upload on connect.
- When fixing a reported built-in card, edit CARD_LIST in the page. If Eli has his own edit of that card (a doc in `cards`), his version shows instead; mention it rather than overwriting it.

## Report inbox (built Oct 13 2026)
- Each report is its own document, separate from progress: `data/users/<id>/micro-workbook/reports/<reportId>`.
- Fields: `where` ("question:<qid>", "lesson:<lid>", "card:<cardId>", "cardgrade:<cardId>" for Claude's check of a typed flashcard answer, "grade:<writingId>" for Claude's writing grade, "explain:<target>" for a Claude explanation, where target is question:/card:/writing:/section:<lid>|<heading>/widget:<lid>|<title>), `note`, `ctx` (what was on screen: the card text, Eli's answer plus Claude's verdict, or the explanation thread), `at` (ms), `status` ("open" | "fixed" | "nochange"), `reply` (one line on what changed or why no change), `fixedAt` (ms).
- Reports made signed out or offline wait in localStorage and send when the account connects. Old items in the progress doc's `reports` array migrate automatically.
- "Reports" tab lists every report with what it's about, a link to open it, what was sent, and Claude's note. Questions, lessons and cards show a "Reported · open" or "Fixed" tag. Badge for newly handled reports.
- Fix pass (when Eli asks "fix my workbook reports"): ArtifactData list `data/users/me/micro-workbook/reports` → fix the page (questions, cards, or the prompts `gradePrompt` / `cardGradePrompt` / `xpPrompt`) and republish → for each handled report, `update` status, reply and fixedAt (pin if_version).
- The weekly Claude Code routine that ran the fix pass was removed by Eli (Oct 22 2026); run the fix pass on request.

## Unit 1 (built)
1. Scarcity and opportunity cost (snooze widget, budget-line widget)
2. Production possibilities frontier (PPF explorer: test points, steps, shifts)
3. Comparative advantage and trade (trade lab with editable outputs and trade price)
4. Economic systems (sorting game, circular flow)
5. Marginal analysis and incentives (one-more-slice MB vs MC widget)

## Unit 2: Supply and Demand (live since Oct 23 2026)
- Built and tested in a staging copy (https://claude.ai/artifact/UYh8rWtQp51YXzRZ9b3WZC, separate progress), then added to the live workbook on Eli's OK on Oct 23 2026 (artifact version 1792778489-548b). All Unit 1 progress, review schedule, writing and reports carried over unchanged.
- Decisions (Eli, Oct 22): staging copy first; cover every Unit 2 CLEP topic, extra depth only in "Go deeper"; 12 core + 16 more questions per lesson (like Lesson 4); true/false and numeric items built on common mistakes; separate auditor agent before promotion; unit quiz of 20 five-choice items.
- Lessons: 6 Demand and Supply (shifter graph, shift-or-move sorter) · 7 Market Equilibrium (equilibrium lab, predict-the-change) · 8 Price and Quantity Controls (ceiling/floor/quota lab, sorter) · 9 Price Elasticity of Demand and Supply (elasticity calculator, revenue along a demand line, sorter) · 10 Income and Cross-Price Elasticity (calculator, relationship sorter) · 11 Consumer and Producer Surplus (concert surplus market, which-area drill) · 12 Taxes: Incidence and Deadweight Loss (tax lab with three elasticity cases, who-bears-it sorter). Each: course order, worked examples from the course, quick checks, Common mistakes M1-M6, recap with "How the CLEP tests this", Go deeper, 2 writing prompts, flashcards.
- Unit 2 quiz (`#quiz2`): 20 items by CLEP topic (equilibrium 3, determinants 3, controls 3, PED 2, total revenue 2, PES 1, income 1, cross-price 1, surplus 2, tax incidence 1, DWL 1). Answers, right/wrong and explanations show only after submitting. Results stored separately in the progress doc as `quiz2` {best, last, attempts, history, lastAttempt}; missed items go to Review. Unit 1 quiz data untouched.
- Home page: one card per unit; the Unit 2 card lists the CLEP outline topics and the lesson that teaches each.
- Source problems found in the course and handled in the lessons (not repeated as fact): orange example quantities (25 vs 20), bread and salmon rounding, pretzel sign, "equilibrium maximizes both consumer and producer surplus" (only the total is maximized), slide 105 water surplus typo, "tax equally levied on both" (the split depends on elasticity), slide 122 label typo, plus wording issues. Full list in docs/unit2-build-notes.md.

## Audit log
- Oct 12 2026: full audit of Unit 1 (typos, answer keys, code, phone layout). Fixed budget-line slope wording, factor payments now include profit, quiz double-scoring bug, review double-advance bug, DST-safe due dates, stricter dollar answers, 4 quiz items rewritten (graph item added, circular-flow item replaces micro/macro trivia), ~28 wording fixes. No answer keys were wrong.
- Oct 13 2026: added the report inbox and Reports tab.
- Oct 13 2026: rewrote all 67 flashcards; added typed answers checked by Claude, card editing and own cards, and reports on cards and on Claude's grading.
- Oct 13 2026: added "Explain this" everywhere, with hint mode for unanswered items.
- From Oct 16 2026: weekly routine runs are logged in the GitHub audit log, not here.
- Oct 22 2026: Unit 2 audited by a separate agent against the rubric (rev 16). One answer-key problem (l7-equal) and several should-fix items (a course misquote, L12 topic order, a missing quick check, quiz items too close to practice, quiz-hint follow-ups), all fixed before the staging republish. Details in docs/unit2-build-notes.md.
- Oct 23 2026: GitHub snapshot before (1db7387), Unit 2 added to the live workbook, snapshot after.
- Oct 23 2026 (evening): 30 figures added across Unit 2 (src/unit2/figs.js, `FIG` and `fig`/`figs` helpers; `sdg` now supports zoomed axes, arrows, brackets). Reports fixed: l4-mktsoc and l4-capitalism are typed answers checked by Claude (question type 'text'); l5-g-net deleted; l6-tastes example added to the lesson.

## Useful official resources
- Free official sample questions: https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf
- CLEP Principles of Microeconomics Examination Guide (PDF, $10, College Board) as a later calibration check.
- Exam weighting: Basic Economic Concepts is about 10-16% of the exam; product markets (supply/demand, consumer choice, costs, market structure) are 55-70%.

## Next
- Build Unit 3 (Theory of Consumer Choice) the same way: staging copy, separate audit, then promote on Eli's OK.
