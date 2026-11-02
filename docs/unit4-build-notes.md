# Unit 4 build notes (Production and Costs)

Built 2026-10-28 in one chat from Eli's request "Build unit 4 ... on the Unit 3 staging copy", the Golden Standard rubric (docs/lesson-rubric.md) and the Unit 2-3 decisions.
Source files: `src/unit4/` (merged by `src/unit4/build.py BASE OUT [--live]`, which patches a page that already has Units 1-3; every patch must match exactly once).
Staging page = `src/unit3/build.py OUT` (Unit 3 staging, byte-identical to the published Unit 3 staging artifact on 2026-10-28) → `src/unit4/build.py` on top.
Promotion later: `src/unit3/build.py live3.html --live` then `src/unit4/build.py live3.html OUT --live`.

## Decisions (Eli, 2026-10-28, asked before building)
- Build into the existing Unit 3 staging artifact (same link, its test progress kept); the page is retitled "Units 3-4 Staging".
- 4 lessons (exam weight 10%-15%, more than Unit 3's 5%-10%).
- Explicit/implicit costs and accounting vs economic profit left for Unit 5 (course 5.1 and the CLEP outline put them under Profit).
- The course's broken per-unit table is shown with corrections flagged, and the U-shaped curves are taught with the textbook's longer table (The Clip Joint).
Earlier decisions reused without asking: 12 core + 16 more practice questions per lesson; T/F items test a Common-mistakes belief; numeric explanations name the typical wrong answer; 20-item five-choice quiz, submit-then-reveal, separate pool (`S.quiz4`); at least 6 instructional visuals per lesson; every CLEP outline topic taught in core lessons; separate auditor before promotion.
Lesson split change during the build: L17 first taught marginal cost before average cost. The video teaches averages first, so (rubric gate G2) L17 became fixed/variable/total/average cost and L18 marginal cost, productivity and the curves.

## Source status
| Source org | Pages used | Status |
|---|---|---|
| Modern States | Video 4.1 transcript (Principles_of_Microeconomics_4_1T.pdf, 4,240 words); Module 4 slides (Principles_of_Microeconomics_4S_All.pdf); course overview (Module 4 = one video, 4.1) | Provided, read in full. Course content map not provided; reading assumed to be OpenStax ch. 7 |
| OpenStax Principles of Microeconomics 2016 (course textbook) | Ch. 7 §7.1-§7.3, key terms, summary, self-check and review questions | Provided (Chapter_7 PDF), read in full. Quotes from this edition; Principles of Economics 3e pages (7.2, 7.3, 7.5) used for links only (the Principles of Microeconomics 3e pages return "retired") |
| College Board | CLEP exam page (Production and costs 10%-15%, five subtopics); CLEP sample questions (Q4 least-cost inputs, Q8 total-cost table) | Opened |
| Econlib | Pierre Lemieux, "Toilet Paper: Increasing Marginal Cost" (EconLog 2020); "Monopoly" (Stigler; natural monopoly section by Henderson) | Opened |
| AP Microeconomics CED | Units 3 and 5 | Unavailable this time (PDF returned as binary; direct download blocked) |
| Khan Academy | production and cost videos | Unavailable (pages have no readable content without JavaScript) |
| Marginal Revolution University | OpenStax video map | Opened: no videos mapped to chapter 7 |

Note: the 2016 textbook never uses the term "marginal product" or teaches the production function; those come from the course video. The relationship MC = wage ÷ MP is derived in the lesson from the definitions (one more worker adds the wage to cost and MP to output) and checked against the textbook's own MC column ($80 ÷ 16, 24, 20 ...); the textbook and Econlib state the direction (diminishing returns make MC rise).

## Source problems found (recorded; not repeated as fact)
1. MS slides 6-9 label the last row of Firm A's table "7" workers; slide 10 and the video use 6. L16 follows 6 and notes it.
2. MS 4.1 per-unit table (slides 20-21, video): AVC at 200 and 250 units given as 1.25 and 1.50; correct 150/200 = 0.75 and 175/250 = 0.70. ATC given as 5.25 and 4.70; correct 950/200 = 4.75 and 975/250 = 3.90. AFC (8.00, 4.00, 3.20) is right. L17 shows the table with the slips struck through (figure l17fix; questions l17-course-fix, l17-course-atc).
3. MS 4.1 marginal cost (slide 25, video): (950 − 925)/(200 − 100) given as 1.25 and (975 − 950)/(250 − 200) as 2.5; correct 0.25 and 0.50. L18 notes it (question l18-course-mc).
4. MS 4.1: average variable cost "is going to be increasing, because variable cost increase with the quantity." The textbook says AVC is "typically U-shaped or upward-sloping", and the course's own corrected numbers fall (1.25, 0.75, 0.70). L17 flags it (l17-tf-avc, M3).
5. MS 4.1: the long-run ATC "is going to meet the lowest points of the short run average total cost curves." Looser than the textbook's "bottom edge of the family of SRAC curves"; the course's own coffee table shows the difference (at 200 customers, 1 location is at its own minimum, $0.45, but 2 locations cost $0.40). L19 notes it (l19-env, M4).
6. OpenStax 2016 Table 7.3 rounds down: $3.33 printed $3.30, $6.67 printed $6.60 (ATC at 60 and 72, MC 60 → 72). The lessons use $3.33 and $6.67 and say so.
7. OpenStax 2016 Table 7.6 pipe figures round 50.27 to 50.2 (twice). Not used numerically (the lesson quotes "four times as much material").
8. MS slide 3's production function Q = 100K + 25L has constant marginal products, so it never shows diminishing returns. Not an error; L16 says so in a note and in Go deeper.

## CLEP outline: Production and costs (10%-15%)
Production functions: short and long run · Marginal product and diminishing returns · Short-run costs (fixed, variable, average, marginal and total cost; the relationship between productivity and marginal cost) · Long-run costs and economies of scale · Long-run cost minimizing input combination.

## Unit map (Modern States order; global lesson numbers continue Unit 3)
| Lesson | Title | Modern States | Textbook | CLEP subtopics |
|---|---|---|---|---|
| l16 | Production: Short Run, Long Run and Diminishing Returns | 4.1 first part, slides 2-10 | §7.2 (Clip Joint output, diminishing returns, irrigation); §7.3 (long run definition) | Production functions: short and long run; Marginal product and diminishing returns |
| l17 | Short-Run Costs: Fixed, Variable, Total and Average Cost | 4.1 middle, slides 11-21 | §7.2 (Tables 7.2-7.3, Figures 7.3-7.4, U-shaped averages) | Short-run costs: fixed, variable, total, average |
| l18 | Marginal Cost and the Short-Run Cost Curves | 4.1 middle, slides 22-25 | §7.2 (MC, Clear it Up on MC and AC, grades analogy) | Short-run costs: marginal cost; productivity and marginal cost |
| l19 | Long-Run Costs: Economies of Scale and the Least-Cost Input Mix | 4.1 last part, slides 26-33 | §7.3 (production technology, park cleaning, economies of scale, LRAC, diseconomies) | Long-run costs and economies of scale; cost-minimizing input combination |

Order inside lessons follows the video. Two outline topics the video never teaches go where they fit: productivity and marginal cost right after marginal cost (L18), and the least-cost input combination after economies of scale at the end of L19 (the outline's last item).

## Coverage map (CLEP subtopic → lesson sections)
- Production functions: short and long run → l16 "The short run and the long run", "The production function"; l19 "Costs in the short run and the long run".
- Marginal product and diminishing returns → l16 "Total product", "Marginal product of labor", "Diminishing marginal returns", "Read a production table".
- Short-run costs (FC, VC, TC, AC) → l17 all sections.
- Short-run costs (MC) → l18 "Marginal cost", "Marginal cost pulls the average", "The short-run cost curves together", exam skill.
- Productivity and marginal cost → l18 "Productivity and marginal cost".
- Long-run costs and economies of scale → l19 "Choosing a size", "The long-run average total cost curve", "Economies of scale, constant returns and diseconomies".
- Cost-minimizing input combination → l19 "The least-cost combination of inputs", "Which input should the firm use more of?".
All are taught in core, practiced and quizzed. Nothing on the outline is only in Go deeper.

## Visual inventory (instructional visuals only; question exhibits and sorters not counted)
L16 (8): V1 short/long-run input cards · V2 production-function diagram (Q = 100K + 25L) · V3 Firm A total product curve · V4 annotated MP table (slide-label slip noted) · V5 TP curve beside MP bars · V6 why-returns-diminish flowchart · V7 Clip Joint MP bars in three zones · W production explorer (Firm A / Clip Joint).
L17 (9): V1 profit equation · V2 fixed vs variable cards · V3 course $800 + $25 stacked bars · V4 Clip Joint FC/VC/TC curves · V5 corrected course per-unit table · V6 AFC curve ($800 spread) · V7 ATC = AVC + AFC stacked bars · V8 U-shaped ATC and AVC · W spread-the-fixed-cost.
L18 (8): V1 MC from the TC column · V2 MP and MC mirror bars · V3 productivity → MC flowchart · V4 grades analogy table · V5 MC vs ATC three-case flow · V6 Clip Joint ATC/AVC/MC curves · W what-moves-MC (cost builder) · W MC-pulls-the-average explorer (Clip Joint / T-shirt printer).
L19 (10): V1 short/long-run cost cards · V2 coffee-shop table, best size outlined · V3 SRATC family and LRATC envelope · V4 LRATC three zones · V5 alarm-clock bars · V6 diminishing returns vs economies of scale cards · V7 park-cleaning costs at three wages · V8 MP-per-dollar flowchart · W plant-size chooser · W least-cost park cleaning.
Exam-skill sorters/fill-ins (returnsort, costfill, mcatcsort, scalesort, leastsort) are practice, not counted.

## Question counts (distinct items; a generator counts once)
| Lesson | Core | More | Quick checks | Generators (core/more) |
|---|---|---|---|---|
| l16 | 12 | 16 | 6 | l16-g-mp, l16-g-pf / l16-g-tp, l16-g-zone, l16-g-mpdec |
| l17 | 12 | 16 | 7 | l17-g-tc, l17-g-avg / l17-g-vc, l17-g-tcq |
| l18 | 12 | 16 | 5 | l18-g-mc, l18-g-wmp, l18-g-pull / l18-g-mcfromtable |
| l19 | 12 | 16 | 6 | l19-g-tech, l19-g-mpd / l19-g-coffee |
Flashcards: 12 per lesson (c-l16-0..11 … c-l19-0..11). Writing: 2 per lesson (w-l16-1/2 … w-l19-1/2).

## Quiz blueprint (q4-*, 20 items, five-choice, separate pool)
Production functions: short and long run 3 (q4-sr-1..3) · Marginal product and diminishing returns 4 (q4-mp-1..4) · Short-run costs 5 (q4-sc-1..5) · Productivity and marginal cost 2 (q4-prod-1..2) · Long-run costs and economies of scale 4 (q4-lr-1..4) · Cost-minimizing input combination 2 (q4-min-1..2). Graph items: q4-mp-2, q4-sc-2, q4-sc-4; data/table items: q4-sr-2, q4-mp-1, q4-mp-4, q4-sc-1, q4-sc-5, q4-prod-2, q4-lr-1, q4-lr-4, q4-min-1. q4-mp-2, q4-sc-4, q4-prod-2, q4-lr-1 and q4-min-1 were rewritten after the audit so no quiz item repeats a practice item's numbers or shape.

## ID scheme and storage
Questions l16-* … l19-*; quick checks l16c-* … l19c-*; quiz q4-*; cards c-l16-N …; writing w-l16-N …; widgets W.production, W.returnsort, W.spread, W.costfill, W.costbuild, W.curves, W.mcatcsort, W.plantsize, W.scalesort, W.inputmix, W.leastsort.
Unit 4 quiz results in `S.quiz4` {best, last, attempts, history, lastAttempt}, added to blankState/normalize so old records load unchanged. Quiz draft in localStorage `micro-quiz4-draft`. Glossary homes: `average-cost`, `afc` and `avc` point to Lesson 17, `marginal-cost` and `efficient-scale` to Lesson 18. New glossary terms `increasing-returns` and `negative-returns` (Lesson 16). New source key OS71 (textbook §7.1, used for profit = TR − TC). No other existing id, storage path or record changed.

## App changes (all in src/unit4/build.py; additive)
CSS for Unit 4 figures (u4 classes). UNITS gains Unit 4; LATER drops "Production and Costs"; home quiz count map gains 4; `#quiz4` route, tab highlight and render; quiz switcher gains a Unit 4 chip; Reports know "Unit 4 quiz"; staging title/brand "Units 3-4 Staging". Unit 1-3 quiz code untouched (Unit 4's renderer is a renamed copy of Unit 3's).

## Independent audit (2026-10-28) and what changed
A separate agent audited L16-L19 and the quiz against the rubric (gates G1-G8, ten scored criteria). It recomputed every number and script-matched every quote against the transcript, slides and textbook: no wrong numbers, no misquotes, all 20 quiz keys right.
First-pass scores: L16 92.5, L17 85 (failed G3 and G8), L18 92.5, L19 77.5 (failed G5 and G7). All must-fix and should-fix items were applied:
- G7 one answer: `l19-g-mpd` lost the rule-style choices that could match the key ("use more of the cheaper input", "use more of the input with the higher MP"); `l19-gr-env` now asks about 8 units (large plant $9.25 vs medium $12.40), so "lowest minimum overall" is clearly wrong.
- G3 sources (L17): added OS71 (§7.1, profit) and Econlib's Lemieux (fixed capital → diminishing marginal productivity, quoted after a live check of the article); `l17-why-rise` tagged ELL.
- G5 mechanism (L19): new "Why costs can stay flat" paragraph (textbook: "economies of scale have been exhausted ... allowing all inputs to expand does not much change the average cost of production"; the four-plants comparison), and the zones caption now names all three causes. Zone axes now have units.
- G8 widget (L17 W.spread): at $0 fixed cost the one-barber message now says there is nothing to spread (ATC = AVC); "stays the same to" wording fixed.
- Quiz: five near-duplicates rewritten (see Quiz blueprint); `q4-sc-2` labels no longer clipped; header claim corrected.
- `l18-print` no longer shows the answer in its own table (table stops at 5 shirts); `l19c-lr` reworded (long run starts after year three).
- Tap-to-define: more terms in L18 (fixed cost, variable cost, ATC, AVC) and L19 (short run, diminishing returns); glossary homes fixed.
- Each sorter or fill-in now has a "What to notice" line; W.costbuild notes that it combines two course examples ($925 buys 150 units there, not 100).
Not verified by the auditor (network blocked for it): cited slide numbers, OpenStax 3e link targets. Lemieux, OpenStax §7.1 and §7.5 wording were checked live afterwards.

## Test record (2026-10-28, Playwright/Chromium, build u4_test.html)
- Every Unit 4 question and quick check rendered (156 items): no errors, no overflow at 375 px.
- Every generator run 400 times (l19-g-mpd 2,000 times): no NaN, no duplicate choices, keys in range.
- Widgets: TEST NOTE values reproduced; every sorter shows its reason on a wrong pick; no overflow outside any widget at 375, 390 and 1100 px in light and dark; sliders move with arrow keys and buttons work with Enter/Space.
- State: old progress (Units 1-3 quizzes, lessons, review, writing) loads unchanged; `quiz4` starts empty; submit-then-reveal shows nothing before submit; missed quiz items are scheduled; draft kept during a quiz and cleared after submit.
- Pages home, L13-L19, all four quizzes, Review, Flashcards, Reports: no page errors, no horizontal scroll at 375 and 1100 px.

## Live
2026-10-28: promoted to the live workbook (https://claude.ai/artifact/NcS17Vqfj1fYxqC93TBAki, version 1793210645-1479) together with Unit 3. The live build is the tested staging build with the staging title and brand removed.
