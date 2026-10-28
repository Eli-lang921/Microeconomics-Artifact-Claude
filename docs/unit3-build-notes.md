# Unit 3 build notes (Theory of Consumer Choice)

Built 2026-10-27 in one chat from Eli's Unit 3 build prompt, the Golden Standard rubric (docs/lesson-rubric.md), the approved Lesson 4, and the Unit 2 decisions.
Source files: `src/unit3/` (merged into the page by `src/unit3/build.py`, which patches the current live `index.html`; every patch must match exactly once).

## Decisions used (no new questions asked; all settled earlier)
- Build in a staging copy, run a separate audit, promote to the live workbook only on Eli's OK.
- 12 core + 16 more practice questions per lesson (Eli's Unit 2 decision; the rubric's 6-8 is overridden). Core count drives completion and progress counters.
- True/false items test a Common-mistakes belief; numeric explanations name the typical wrong answer (Unit 2 decision).
- Unit quiz: 20 five-choice items, submit-then-reveal, separate pool, results stored separately (`S.quiz3`).
- At least 6 instructional visuals per lesson; every question exhibit inside its own card.
- Off-outline textbook sections (§6.3 work-leisure, §6.4 saving and behavioral economics) go in collapsed Go deeper only.
- Staging: a new artifact "Microeconomics Workbook (Unit 3 Staging)" instead of overwriting the Oct 22 Unit 2 staging copy (which keeps its own test progress).

## Source status
| Source org | Pages used | Status |
|---|---|---|
| Modern States | Video 3.1 transcript (Principles_of_Microeconomics_3_1T.pdf); Module 3 slides 1-22 (Principles_of_Microeconomics_3S_All.pdf); course overview (Module 3 = one video, 3.1) | Provided, read in full. Course content map (assigned reading pages) not provided; reading assumed to be OpenStax ch. 6 |
| OpenStax Principles of Microeconomics 2016 (course textbook) | Ch. 6 §6.1-§6.4, key terms, summary, review questions | Provided (Chapter_6 PDF), read in full. Quotes taken from this edition; 3e/2e pages used for links only |
| College Board | CLEP exam page (outline: Theory of consumer choice 5%-10%, four subtopics); CLEP sample questions page (Q3 income effect); AP Microeconomics CED Topics 1.6 and 2.1 (via PDF fetch summary: CBA-2.A.1-4, MKT-3.A.5-6) | Opened |
| Econlib | "Marginalism" (Steven E. Rhoads); "Demand" (David R. Henderson) | Opened |
| Khan Academy | consumer theory / marginal utility | Unavailable (no readable pages returned) |
| Marginal Revolution University | consumer choice video | Unavailable (only a blog post with no description; no lesson page found) |

Cross-reference organizations per lesson: L13 OpenStax, College Board, Econlib · L14 OpenStax, College Board, Econlib · L15 OpenStax, College Board, Econlib (3 each, plus Modern States as the skeleton).

## Source problems found (recorded; not repeated as fact)
1. MS 3.1 transcript: "marginal utility is rising up until the fifth candy bar." The course's own table (slide 3) shows MU falling from the first bar (25, 20, 15, 10, 5). Lesson 13 follows the table and flags the slip (l13 section 3; question l13-course-mu).
2. MS 3.1 transcript places the fall in total utility both "after the fifth candy bar" and "after the sixth." Table: TU is 75 at bars 5 and 6 (MU of bar 6 = 0) and first falls at bar 7. Lesson follows the table.
3. MS slide 3 groups bar 6 (MU = 0) with "Marginal Utility is Positive"; slide 4 draws the MU line reaching zero near bar 5 and stopping. Lesson 13's graph follows the table (zero at bar 6, negative after).
4. MS slides 8 and 9 total the 1-soda-2-pizza bundle as "(9) + (20 + 16) = 45"; the video and slide 10 give 44. Lesson 14 uses 44 and notes the slip.
5. MS video and slides total 5 slices at $1 as 56 (slide sums only four slices: 20 + 16 + 12 + 8 = 56). Correct: 20 + 16 + 12 + 8 + 4 = 60. The best bundle (64) is unaffected. Lesson 15 shows 60 and notes the slip (question l15-slide-56).
6. MS 3.1: "we know that for sure we're gonna consume more of the good whose price has fallen." True for the substitution effect and for normal goods; the textbook treats a higher price raising quantity as "theoretically possible but highly unlikely." Lesson 15 states the normal-good case and the textbook's caveat (effects widget).
7. MS 3.1 lists bundles at $1 pizza but skips 4 sodas + 1 slice (46 utils). Lesson 15's table adds it, marked as not in the course's list.
8. OpenStax 2016 Table 6.4 prints Q as "63 from 3 T-shirts + 31 from 0 movies" (should be 2 movies). Lesson 14 notes it.
9. OpenStax 2016 Table 6.5 prints the 7th T-shirt as "12/$14=1.2" (it is 0.86). Lesson 14 notes it. (Also 16/$7 printed 2.3, 15/$7 = 2.14: rounding only.)
10. OpenStax 2016 §6.1 typo "just to something to wear"; not quoted (the lesson quotes "something to wear when all his other clothes are in the wash").

## CLEP outline: Theory of consumer choice (5%-10%)
Total utility and marginal utility · Utility maximization: equalizing marginal utility per dollar · Individual and market demand curves · Income and substitution effects.

## Unit map (Modern States order; global lesson numbers continue Unit 2)
| Lesson | Title | Modern States | Textbook | CLEP subtopics |
|---|---|---|---|---|
| l13 | Total Utility and Marginal Utility | 3.1 first part, slides 2-5 | §6.1 (utility, utils, Table 6.2, diminishing MU, measuring utility) | Total utility and marginal utility |
| l14 | Utility Maximization: Marginal Utility per Dollar | 3.1 middle, slides 6-11 | §6.1 (budget constraint, José, MU per dollar, rule, consumer equilibrium) | Utility maximization: equalizing MU per dollar |
| l15 | From Utility to Demand: Income and Substitution Effects | 3.1 last part, slides 12-22 | §6.2 (income and price changes, foundations of demand); §6.3-6.4 in Go deeper | Individual and market demand curves; Income and substitution effects |

Lesson boundaries: one 3,460-word video split at its three natural turns (TU/MU → optimal choice → price change and demand). Depth: three lessons, the fewest of any unit so far (rubric: Unit 3 gets the fewest).

## Coverage map (CLEP subtopic → lesson sections)
- Total utility and marginal utility → l13: "Utility and utils", "Total utility and marginal utility", "The candy bar example", "Graphing total and marginal utility", "Diminishing marginal utility", "Read a utility table".
- Utility maximization: equalizing MU per dollar → l14: all sections (budget, Method 1, Method 2 rule, one purchase at a time, José, which way to shift).
- Individual and market demand curves → l15: "A price change changes MU per dollar", "The new best bundle", "Deriving the individual demand curve", "Market demand: add up the buyers".
- Income and substitution effects → l15: "The income effect and the substitution effect", "When income itself changes", "Which effect is it?".
All four are taught in core lessons, practiced in core questions and quizzed (see blueprint). Nothing on the outline is only in Go deeper.

## Emphasis estimate
Teaching prose word counts (figures, widgets, quick checks excluded): core 4,386 words, Go deeper 467 words, so about 9.6% optional by prose. Counting the visuals and all questions (all exam-focused), the optional share is well under 10%. Go deeper is collapsed and untested.

## Visual inventory (instructional visuals only; question exhibits not counted)
L13 (7): V1 utils comparison cards (Utility and utils) · V2 stacked MU blocks building TU (TU and MU) · V3 ten candy bars with MU badges (candy example) · V4 annotated TU/MU table with three zones (candy example) · V5 aligned TU curve and MU bars (graphing) · V6 utility explorer widget, course candy and textbook T-shirts (graphing) · V7 why MU diminishes: flowchart plus José's MU bars (diminishing MU).
L14 (8): V1 budget line with the course's three bundles (budget) · V2 stacked MU bars for each bundle's TU (Method 1) · V3 MU-per-dollar tables with matching units outlined (Method 2) · V4 cause-and-effect flowchart of the rule (Method 2) · V5 checkout-lanes analogy picture (Method 2) · V6 bundle explorer widget, course and José (Method 2) · V7 one-purchase-at-a-time stepper widget (progressive) · V8 José budget line plus net-gain bars (José).
L15 (9): V1 MU per dollar before/after the price cut (price change) · V2 bundle table at $1 with the course's slip marked (new best bundle) · V3 two-panel derivation: budget lines and best bundles over the demand curve (deriving demand) · V4 demand-builder widget (deriving demand) · V5 three-panel horizontal summation (market demand) · V6 relative-price picture (effects) · V7 two-effects flowchart (effects) · V8 effects predictor widget with toggles (effects) · V9 Kimberly's parallel budget shift (income changes).
Exam-skill sorters (zonesort, mupsort, effsort) are practice, not counted.

## Question counts (distinct items; a generator counts once)
| Lesson | Core | More | Quick checks | Generators (core/more) |
|---|---|---|---|---|
| l13 | 12 | 16 | 6 | l13-g-mu, l13-g-tu / l13-g-peak |
| l14 | 12 | 16 | 6 | l14-g-mup, l14-g-opt / l14-g-cost, l14-g-move |
| l15 | 12 | 16 | 8 | l15-g-market / l15-g-mupnew, l15-g-relp |
Flashcards: 12 per lesson (c-l13-0..11, c-l14-0..11, c-l15-0..11). Writing: 2 per lesson (w-l13-1/2, w-l14-1/2, w-l15-1/2).

## Quiz blueprint (q3-*, 20 items, five-choice, separate pool)
Total and marginal utility 5 (q3-tu-1..5) · Utility maximization 6 (q3-max-1..6) · Individual and market demand 4 (q3-dem-1..4) · Income and substitution effects 5 (q3-eff-1..5). Graph or data items: q3-tu-1, q3-tu-2, q3-tu-5, q3-max-1, q3-max-4, q3-max-5, q3-dem-1, q3-dem-3, q3-eff-4, q3-eff-5. Skills: terms, data, graphs and models all represented.

## ID scheme and storage
Questions l13-*, l14-*, l15-*; quick checks l13c-*, l14c-*, l15c-*; quiz q3-*; cards c-l13-N etc.; writing w-l13-N etc.; widgets W.utility, W.zonesort, W.bundle, W.shopper, W.mupsort, W.demandbuild, W.effects, W.effsort.
Unit 3 quiz results in `S.quiz3` {best, last, attempts, history, lastAttempt}, added to blankState/normalize so old records load unchanged. Quiz draft in localStorage `micro-quiz3-draft` (per device). No existing id, storage path or record was changed.

## App changes (all in build.py; additive)
CSS for Unit 3 figures (u3 classes) and `.qcheck>*{min-width:0}` (stops wide tables in quick checks from widening the page; existing quick checks unaffected). UNITS gains Unit 3 (with a per-unit `weight` line, so the Unit 2 card text is unchanged); LATER drops "Theory of Consumer Choice"; home quiz count reads from a unit map; `#quiz3` route, tab highlight and render; quiz switcher gains a Unit 3 chip; Reports know "Unit 3 quiz". Unit 2 quiz code is untouched (Unit 3's renderer is a renamed copy).

## Test record (2026-10-27, Playwright/Chromium in the build container; page opened as a file, so no Claude account unless mocked)
Scripts: scratchpad tests (qall, qwide, gens, widgets, state, fail, review, shot). All results below are observed, after the audit fixes.
| Check | Setting | Expected | Observed |
|---|---|---|---|
| Every Unit 3 question in the single-question (reported-question) view | 124 items (84 practice, 20 quick checks, 20 quiz), 390 px | renders, 5 options for MC, no NaN/undefined, exhibit present when referred to | 124/124 pass |
| Page width with each question | 375 px | no horizontal scroll | 0 of 124 overflow |
| Generators (10) | 400 instances each, keys recomputed from the rendered table/text | no wrong key, tie, zero divisor or invalid scenario | 0 failures; l14-g-opt optimum unique, spends budget, equal MU/P |
| Utility explorer | candy 0, 6, 10; T-shirts 4, 8 | TU 0/75/25, MU none/0/−20; 81/+18; 133/+10 | matches |
| Bundle explorer | course pizza 0,1,2; José T 0,1,4 | 30, 41, 44 (8 = 8); 100, 103 (1.57 = 1.57), 81 | matches |
| Shopper | pizza $2 and $1 | 1 soda + 2 pizza, 44; 1 soda + 4 pizza, 64 | matches |
| Demand builder | $1, $2.50, $3.50, $4 | 4, 2, 0, 0 slices; 64, 36, 30, 30 utils; no-pizza message compares 28 vs 30 | matches |
| Effects predictor | all 8 toggle settings | substitution/income/total arrows per TEST NOTE | matches |
| Sorters (3) | right and wrong picks | feedback + correct running score | pass |
| Unit 3 quiz before submit | 20 questions answered | no right/wrong styling, no explanations, no score; tools labeled Hint; draft saved | pass |
| Unit 3 quiz after submit | | results page with 20 cards, all explanations and exhibits; S.quiz3 attempts 1; misses scheduled in Review; draft cleared | pass |
| Old saved progress + new unit | Eli's progress record (version 436) loaded into current live page and the candidate | lessons 1-12 progress, quiz, quiz2, 271 review items, 105 due, 4 writing answers identical | identical; quiz/quiz2 unchanged after a Unit 3 quiz attempt and reload |
| Completion counter | L13 one answer via the page, rest recorded | 1/12, then complete, home shows Done | pass |
| Persistence failures (mocked) | db throws; db write fails; signed out | page works, answers kept on device, correct sync message | pass |
| AI unavailable | Explain this with no sample capability | message saying Claude isn't available | pass |
| Review | Unit 3 chip; question session; flashcards | selects l13-l15; exhibits in session cards; 12 cards per lesson; quiz items excluded from free practice | pass |
| Keyboard | slider arrows, sorter Enter, toggle Space, tap-to-define Enter | value/feedback/pressed state/popover change | pass |
| Layout | 375, 390, 1100 px; light and dark | no page overflow; captions readable | pass (after fixing candy picture size, a clipped bar label and wide tables) |
Not tested: the real claude.ai runtime (sync, Claude explanations and grading), touch devices. Pre-existing (not Unit 3): without a Claude account connection, the home page paints before local progress loads and stays stale until navigation; saved data is unaffected.

## Audit (2026-10-27, separate auditor agent, rubric rev 16; the builder's own grade is not evidence)
Round 1 (before fixes): L13 87.5, L14 92.5, L15 87.5 but failed G8. No wrong answer keys anywhere; economics confirmed.
Must-fix found and fixed: demand-builder reasoning at $3.50 (no pizza because 1 slice + 1 soda = 28 < 30 with 50 cents left over, not because the first slice is a worse buy per dollar; at $4 it is: 5 vs 5.5); l15-optimal-point and l13-tf-first lacked their exhibit (both now include the table; l13-tf-first rewritten as the "MU rises with TU" misconception); textbook quote "does not mean than" now "[that]"; L13 rule quote now matches the transcript; six quiz items too close to practice items rewritten as new shapes (q3-max-1/2/3, q3-dem-2, q3-eff-1/3).
Should-fix done: neutral aria labels on answer-bearing graphs; shopper tie wording; slide citation 14-18; generator explanations name the wrong number; Sergei and heating examples now taught in L15 before being tested; made-up labels; L15 recap to 6 points; duplicated slide-45 note removed; TEST NOTEs include layout/theme/keyboard records; l15c-new mistake tag.
Kept (auditor accepted): quiz items sharing a practice skill but with new scenarios and stems; true T/F items that state the correction of a mapped mistake; L15 link to the verified Principles of Economics 3e §6.2 page.
Round 2 (re-audit after fixes): L13 all gates pass, 100; L15 all gates pass, 100; L14 failed G7 on q3-max-2 (Cal's 0 and 0 utils also met the rule) and scored 97.5 otherwise. Fixed after round 2: Cal now 0 and 6 utils (0 vs 2 per dollar), so Ana is the only answer; g-opt "tempting answer" wording and the heating sentence tidied. This last fix was checked by the builder (keys recomputed, tests re-run), not by a third audit round.
Could not verify: slide geometry (text extract only), the course content map, full AP CED context, Khan Academy and MRU.
