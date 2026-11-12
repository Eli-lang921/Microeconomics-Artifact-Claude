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
- Review tab: everything is spaced. Miss → back tomorrow; right first time → back in 7 days; each correct due review moves it up 1 → 3 → 7 → 21 → 60 days, then mastered. Practice anytime by lesson, mixed 10/20/all sets, flashcards, and review ahead. Since Oct 28 2026, a right answer in practice (pick-a-unit/lesson sets or the lesson page) on an item that is due today counts as its due review and moves it up the ladder; items not yet due keep their dates; misses always count. Unit-quiz questions are kept out of free practice so the quiz stays unseen. Since Nov 2 2026, after a miss in Review, practice sets or flashcards Eli picks how it comes back (see Review upgrades 2), and practice by lesson can be limited to due or overdue items.
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
- Fix pass (when Eli asks "fix my workbook reports"): ArtifactData list `data/users/me/micro-workbook/reports` → fix the page (questions, cards, the prompts `gradePrompt` / `cardGradePrompt` / `xpPrompt` / `writtenRewritePrompt`, or new versions in `VARIANTS` for "variant:<qid>" requests) and republish → for each handled report, `update` status, reply and fixedAt (pin if_version).
- The weekly Claude Code routine that ran the fix pass was removed by Eli (Oct 22 2026); run the fix pass on request.

## Review upgrades (built Oct 28 2026; live and in Unit 3 staging)
- **Skip** (review and practice sessions, questions and flashcards): not scored, not in the session score, schedule untouched, so a due item stays due. Hidden once you answer.
- **Delete** (same places): optional reasons (Too easy, Confusing, Not useful for the exam, Repetitive, Wrong or broken, Just don't like it) plus an optional note. The item leaves daily review, review ahead and practice pools; it stays on its lesson page and still counts for lesson completion; its schedule entry is kept so Restore puts it back exactly. "Deleted (n)" list at the bottom of the Review tab with Restore.
- **Rating 1-3** (1 worst, 3 best): optional, shown after answering every question (review, practice, lesson pages, Unit 1 quiz, quick checks, and since Nov 2 the Unit 2-5 quiz results) and on the back of every flashcard; tap the same number again to clear. Stored only; no algorithm uses it yet.
- Storage (progress doc, synced): `deleted` {id: {at, kind:"question"|"card", lesson, reasons[], note, txt (prompt or card text, 300 chars)}}; `ratings` {id: {r:1-3, at}}. Ids are question ids or card ids.
- To learn what Eli dislikes: ArtifactData get `data/users/me` doc `micro-workbook`, read `deleted` (reasons, notes, text) and low `ratings`. A "Wrong or broken" deletion is not a report; the delete box tells Eli to also use Report a problem.
- Code: `src/review/patch.py` (applied once to `index.html`; every patch must match exactly once). `isDeleted`, `reviewable`, `DEL_REASONS`, `rateBox`, `deletedSection`, and the Skip/Delete handlers in `runSession`. Unit 3 staging is rebuilt from the patched page with `src/unit3/build.py`, so promoting Unit 3 keeps these features.

## Review upgrades 2 (built Nov 2 2026; live)
Eli's request (Nov 2 2026), with his answers to 4 questions: all three alternatives to "back to day one" available; applies to daily review, practice sets and flashcards (not lesson pages or unit quizzes); "needs review" means due today or overdue, as an optional toggle; build straight to live with a GitHub backup and notes.
- **Miss choice**: after a wrong answer, a box under the explanation (flashcards: under the card, with its own Next button) asks "How should it come back?": Back to day one (default, the old rule, applied at once), Drop one step, Keep the same step (both shown with their gap in days, only when the item was already on a step above day one or mastered), Count it as right (exactly what a right answer would do in that session: a due item moves up the ladder, a not-yet-due item keeps its date, a new item starts at 7 days, a mastered item stays mastered). Changeable until Next. The session score stays honest (a miss is still a miss); the summary lists how many misses were counted as right, kept or dropped.
- **Practice scope**: under "Practice any time", an Include toggle: "Everything in these lessons" or "Only due or overdue" (due date today or earlier). Applies to the 10/20/All question buttons and to Flashcards; counts show "x of y ... are due or overdue"; buttons disable when nothing matches. Remembered per device (localStorage `micro-rv-scope`).
- Storage: nothing new in the progress doc; choices write the normal `review`/`mastered` entries.
- Code: `src/review2/patch.py` (applied once to `index.html`). `snapReview`, `missStep`, `applyMiss`, `missBox`, `cardNext` in `runSession`, `getScope`/`setScope`/`isDueNow`.

## Review upgrades 3 (built Nov 2 2026; live)
Eli's request (Nov 2 2026), with his answers to 16 questions: ratings unchanged and still only tracked; a written-response button and a new-version button next to the 1-3 rating on every question; duplicate search skipped; build straight to live with a GitHub backup.
- **Change to written response** (every question except native typed ones; not shown while taking a unit quiz): Claude (Opus, low effort, via sample) rewrites the question in the page as a short typed answer: same idea, numbers and correct answer, asks for a reason, never reveals the answer; the original table or graph stays under it. Eli previews it (Use this version / Try again / Cancel). Then it replaces the question in lessons, quick checks, Review, practice sets and the single-question view; unit quizzes keep the original. Typed answers are checked by `qTextGradePrompt` against Claude's model answer, key points and the original correct answer. "Switch back to the original" (next to the rating, and in the tools row before answering) undoes it. Generators are frozen at the numbers shown when converted.
- **Ask for a new version** (every question): optional note, then a report doc with `where` "variant:<qid>" (Reports tab title "... · New version request"; tag "New version requested · open" / "New version added").
- **Versions**: `VARIANTS[qid]` holds extra versions (question objects like Q's, or with gen()). Q[qid] is version 1. All versions share the question id, so one review schedule, rating and report history. Lessons and Review pick a version at random (meta shows "version k of n"); unit quizzes always use version 1.
- The 1-3 rating and both buttons now also show on Unit 2-5 quiz results cards.
- Storage: progress doc `written` {qid: {prompt, model, points[], key, from, at, ex?, explain?}} (ex/explain only for generators).
- Code: `src/review3/patch.py` (applied once to `index.html`). `VARIANTS`, `pickVersion`, `writtenInst`, `qInst`, `writtenRewritePrompt` (the rewrite prompt to adjust if rewrites are off), `qExtras`.
- Fix pass for "variant:<qid>" reports: write the new version into `VARIANTS` (edit the `const VARIANTS = {};` line or add `VARIANTS['<qid>'] = [...]` after it): new numbers, graph look, story and choices, same concept and CLEP topic; recompute the key; numeric choices smallest to largest; then mark the report fixed with a one-line reply.

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
- Oct 28 2026: Review upgrades (skip, delete with reasons and restore, 1-3 rating, practice counts as review) added to the live workbook and the Unit 3 staging copy. Snapshots and details in the GitHub audit log.
- Oct 28 2026: Unit 4 built into the Units 3-4 staging copy and audited by a separate agent (first-pass L16 92.5, L17 85, L18 92.5, L19 77.5; two one-answer problems, a missing mechanism, a widget edge case and five quiz near-duplicates, all fixed before publishing). Details in docs/unit4-build-notes.md.
- Nov 2 2026: Review upgrades 2 (miss choice, due-only practice toggle) added to the live workbook (artifact version 1793576775-2229 → 1793621123-a957). GitHub snapshot before = bb7ceeb (identical to the live page); details in the GitHub audit log.
- Nov 2 2026: Review upgrades 3 (written-response conversion, new-version requests and VARIANTS, rating on Unit 2-5 quiz results) added to the live workbook (artifact version 1793621123-a957 → 1793668520-6f88). GitHub snapshot before = b01cd80 (identical to the live page); details in the GitHub audit log.
- Oct 28 2026: Units 3 and 4 added to the live workbook on Eli's "Move to live" (artifact version 1793210645-1479), built with `--live` from the live page (version 1793186535-a9d1, identical to repo index.html). Progress carries over: `normalize()` adds `quiz3` and `quiz4`. Tests on the live build: 156 Unit 4 items, 0 bad; old progress kept; every route at 390px with no errors. No GitHub snapshot: this session had read-only repo access.

## Useful official resources
- Free official sample questions: https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf
- CLEP Principles of Microeconomics Examination Guide (PDF, $10, College Board) as a later calibration check.
- Exam weighting: Basic Economic Concepts is about 10-16% of the exam; product markets (supply/demand, consumer choice, costs, market structure) are 55-70%.

## Unit 3: Theory of Consumer Choice (built Oct 27 2026; live since Oct 28 2026)
- Staging: https://claude.ai/artifact/JmD52HyAjdCYJfgXoCdD6G (new "Unit 3 Staging" copy with its own empty progress; the Oct 22 Unit 2 staging copy is unchanged).
- Lessons: 13 Total Utility and Marginal Utility (utility explorer, table sorter) · 14 Utility Maximization: Marginal Utility per Dollar (bundle explorer, one-purchase-at-a-time shopper, which-way sorter) · 15 From Utility to Demand: Income and Substitution Effects (demand builder, effects predictor, which-effect sorter). 12 core + 16 more questions each, 7/8/9 instructional visuals, 12 flashcards and 2 writing prompts each.
- Unit 3 quiz (`#quiz3`): 20 five-choice items (TU/MU 5, MU per dollar 6, demand 4, income/substitution 5), submit-then-reveal, stored as `quiz3` in the progress doc.
- Source: `src/unit3/` (build.py patches the live index.html). Details, source problems, coverage map, visual inventory, quiz blueprint and test record: docs/unit3-build-notes.md.
- Audited by a separate agent against the rubric; fixes applied (see notes).

## Unit 4: Production and Costs (built Oct 28 2026; live since Oct 28 2026)
- Built into the same staging copy as Unit 3 (https://claude.ai/artifact/JmD52HyAjdCYJfgXoCdD6G, now titled "Units 3-4 Staging"; its separate test progress is kept). Eli's choices: update the Unit 3 staging copy, 4 lessons, leave explicit/implicit costs and accounting vs economic profit for Unit 5, and show the course's broken per-unit table corrected while teaching the U-curves with the textbook's longer Clip Joint table.
- Lessons: 16 Production: Short Run, Long Run and Diminishing Returns (production explorer, returns sorter) · 17 Short-Run Costs: Fixed, Variable, Total and Average Cost (spread-the-fixed-cost explorer, cost-table fill-in) · 18 Marginal Cost and the Short-Run Cost Curves (what-moves-MC builder, MC-pulls-the-average explorer, MC vs ATC sorter) · 19 Long-Run Costs: Economies of Scale and the Least-Cost Input Mix (plant-size chooser, scale sorter, least-cost park cleaning, which-input sorter). 12 core + 16 more questions, 12 flashcards and 2 writing prompts each.
- Unit 4 quiz (`#quiz4`): 20 five-choice items (short/long run 3, marginal product 4, short-run costs 5, productivity and MC 2, long-run costs 4, least-cost inputs 2), submit-then-reveal, stored as `quiz4` in the progress doc.
- Course slips flagged in the lessons: per-unit table AVC/ATC values, the video's marginal costs (1.25/2.5 should be 0.25/0.50), a slide's worker label, and the "LRATC meets the lowest points" wording.
- Source: `src/unit4/` (build.py patches the Unit 3 staging build; `--live` for promotion). Audited by a separate agent; all must-fix and should-fix items applied. Details and test record: docs/unit4-build-notes.md.

## Unit 5: Firm Behavior and Market Structure (live; Lessons 20-28)
- Details in docs/unit5-build-notes.md.

## Review upgrades 4 (built Nov 9 2026; live Version 25)
- "More practice" questions and quick checks are optional: they join Review only via "Add to Review" (one-time move parked existing ones in `S.parked`, schedule kept). "Lucky guess? Count it as a miss" (with Undo) after right answers outside unit quizzes. Code: `src/review4/patch.py`.

## Unit 6: Factor Markets (built Nov 4-11 2026; live since Nov 11 2026, Version 26)
- Decisions (Eli, Nov 4): build on the live page with a GitHub backup first; 20-item quiz; reading mapping labelled as inference (core: video 6.1, slides 247-269, textbook ch. 4 intro and §4.1; go deeper: §15.1, §15.3, monopsony); commit straight to main; independent audits until every gate passes, no cap; publish only after Eli's OK (given Nov 11).
- Lessons: 29 Factor Markets and Derived Demand (toaster widget, product-to-labor sorter) · 30 Marginal Revenue Product and the Hiring Rule (hire widget, value-of-MP fill-in) · 31 Shifts in the Demand for Labor (what-moves-demand widget, shifter sorter) · 32 Labor Supply, MFC and the Equilibrium Wage (labor-market widget, wage sorter). 12 core + 16 more questions, quick checks, 12 flashcards (all with pictures) and 2 writing prompts each; graph answer choices for choose-a-graph skills; explanation visuals after answering.
- Unit 6 quiz (`#quiz6`): 20 five-choice items (derived demand 5, MRP 6, labor market and hiring 9), submit-then-reveal, stored as `quiz6`.
- App additions: graph answer choices (`visual` items, `.opts.vis`), written-response conversion keeps the graphs (`written[qid].vis`), flashcard pictures (6th card field).
- Audits: 5 rounds; final L29 90, L30 100, L31 97.5, L32 90, quiz 90%, all gates pass. Source: `src/unit6/`; full notes: docs/unit6-build-notes.md.

## Next
- Unit 7 (the last CLEP area: market failure and the role of government).
- Done Nov 12 (live Version 27): Unit 6 polish, and fixes for the blank first render with device-only progress and the do-nothing "Lucky guess" on unit-quiz single-question views (src/fix1/patch.py).
- Later (Eli, Nov 2: ratings stay tracking-only for now): use the 1-3 ratings and the Deleted list to weight which questions Review shows.
