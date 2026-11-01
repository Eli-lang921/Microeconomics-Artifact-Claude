# Unit 5 build notes (Firm Behavior and Market Structure)

Built 2026-10-28 in one chat from Eli's request "Build unit 5 ... on the Unit 3 and 4 staging copy and not the live artifact ... just add it", the attached Unit 5 build prompt, the Golden Standard rubric (docs/lesson-rubric.md) and the Unit 2-4 decisions.
Source files: `src/unit5/` (head5.js, l20.js … l28.js, widgets5.js, quiz5.js, unit5card.js, u5.css, PLAN.md), merged by `src/unit5/build.py BASE OUT [--live]`, which patches a page that already has Units 1-4 (every patch must match exactly once; `--live` now accepts either title form).
Base = the Units 3-4 staging artifact as published (version 1793203522-a524, md5 e7cb528e…). The staging page is retitled "Units 3-5 Staging".
Promotion later: `src/unit5/build.py LIVE.html OUT --live` on the current live page (it has the same code as staging).

## Decisions
Reused without asking (settled for Units 2-4): 12 core + 16 more per lesson; T/F items test a Common-mistakes belief; numeric explanations name the typical wrong answer; five-choice quiz, submit-then-reveal, separate pool; at least 6 instructional visuals per lesson; every CLEP outline topic in core; staging first, separate auditor before promotion; numeric choices listed smallest to largest.
New for Unit 5: 9 lessons (exam weight 23%-33%, the largest unit); quiz of 40 items = 2 per CLEP subtopic (rubric rule "at least 2 questions per outline subtopic", 20 subtopics). Eli (2026-10-29): the 40-item quiz length is fine. Keep Units 3-5 on staging; do not promote yet.

## Source status
| Source org | Pages used | Status |
|---|---|---|
| Modern States | Videos 5.1-5.5 transcripts; Module 5 slides 180-246 (All-Transcripts zip, 00_materials_slides) | Provided, read in full |
| OpenStax Principles of Microeconomics 2016 (course textbook) | Ch. 7 intro and §7.1; ch. 8 §8.1-§8.4; ch. 9 §9.1-§9.2; ch. 10 §10.1-§10.2; ch. 11 §11.1, §11.3 | Provided (textbook zip), read; quotes from this edition. Principles of Economics 3e pages used for links (8-2, 9-2, 10-2, 11-3, 7-1 opened; 8-1, 8-3, 8-4, 9-1, 10-1, 11-1 follow the same URL pattern, not opened one by one) |
| College Board | CLEP Principles of Microeconomics fact sheet (outline D, 23%-33%; sample Q5 shutdown, Q8 corn); AP Microeconomics 2024 FRQ 1 set 2 chief reader report (monopoly graph errors, patent as legal barrier, perfect price discrimination) | Opened (chief reader report re-opened 2026-10-28 for exact wording) |
| Econlib | Thurow "Profits"; Kasper "Competition"; Stigler "Monopoly"; Dixit and Nalebuff "Prisoners' Dilemma"; Dick "Cartels"; Kling "Price Discrimination and Profitability" (2003); Lemieux "Toilet Paper: Increasing Marginal Cost" | Opened; Stigler, Kasper, Dixit-Nalebuff, Dick and Kling re-opened 2026-10-28 for exact quotes |
| Federal Reserve Bank of St. Louis | Zaretsky, "Cartels: Breaking Up Ain't Hard to Do" (1999) | Opened |
| tutor2u | "Importance of price discrimination in economics" (definition, three conditions, three degrees) | Opened |
| AP Microeconomics CED | Unit 4 | Unavailable (PDF not readable here) |
| Khan Academy, Marginal Revolution University | market-structure videos | Unavailable (no readable content / no mapped videos) |

Cross-reference organizations per lesson (besides Modern States and OpenStax): L20 College Board, Econlib · L21 College Board, Econlib · L22 College Board, Econlib · L23 College Board, Econlib · L24 College Board, Econlib · L25 College Board, Econlib · L26 College Board, tutor2u, Econlib · L27 College Board, Econlib, St. Louis Fed · L28 College Board, Econlib. (OpenStax and College Board count as the independent orgs alongside the course; 3-4 per lesson.)

## Source problems found (recorded; not repeated as fact)
1. MS 5.2: profit as "subtract total revenue from total cost" (reversed); the slides compute TR − TC correctly. L22/L23 use TR − TC.
2. MS 5.2: "total cost ... is the sum of costs and variable costs" (should be fixed and variable).
3. MS slide 201: "AVC = VC X Q" (should be VC ÷ Q). L23 flags it.
4. MS 5.2 / slides 204-205: the firm's long-run supply is MC above ATC (firm level); the textbook's industry long-run supply is flat in a constant-cost industry. Both taught and labelled (L23, L24).
5. MS 5.3: De Beers is "making a profit because it is charging more than the point where marginal revenue is equal to marginal cost"; profit comes from P > ATC (P > MC is the inefficiency). L25 flags it (l25-tf-pmc).
6. MS slide 218: ATC "966" (= 966.67); 300 × (1,400 − 966) = 130,200, while TR − TC = 130,000. L25 uses 966.67 and notes the rounding.
7. Profit ties at the MR = MC step (raspberry 70/80, ping pong 4/5 and 8/9, HealthPill 3/4, De Beers 200/300, pizza 30/40): lessons explain the tie and name the larger quantity as the course does; questions never offer the tied quantity as a distractor.
8. MS 5.4: "in a monopoly market structure ... a few number of firm" (means oligopoly); firms "cheat so to reach the monopoly outcome" (cheating moves away from it). L27 flags the second (l27-tf-cheatmono, M6).
9. MS 5.4 / slide 232: competitive outcome "90 units at a price of thirty ... where marginal revenue is equal to marginal cost"; with MC = 0 the competitive outcome is P = MC = 0, Q = 120, and MR = MC is the monopoly point (60). 90 is the 3-firm N/(N+1) result. L27 Go deeper explains it.
10. MS 5.4 / slide 226: oligopolists sell "an identical good"; the 2016 textbook's examples (cars, Coke and Pepsi) show identical or differentiated products, and it says firms "need not produce differentiated products". L27 flags it (l27-identical).
11. MS 5.5: entry causes "a shift in the supply curve" (market view) and then "the demand curve shifts in" (firm view). L28 shows both.
12. MS 5.5 / slide 236: in the long run the firm "act[s] as a firm in perfect competition"; only zero profit is shared (P > MC, excess capacity). L28 flags it (M2).
13. MS slide 246: advertising works "only in M.C. markets"; the textbook shows oligopolists advertise heavily (brand building as a barrier). L28 flags it (l28-tf-adonly, M4).
14. OpenStax 2016 §8.2 slips: Figure 8.5(a) text mixes 80 and 90 packs and uses ATC $3.50 (table: $3.30 at 80); Figure 8.5(c) "($1.75 − $3.30) × 50"; Work It Out price $30 vs tables' $28; Table 8.11 AVC 16.40/ATC 20.40/MC 30 vs Table 8.8. Lessons use the tables.
15. OpenStax 2016 Figure 9.6 caption labels the TR box "marginal revenue" and the TC box "marginal cost" (should be price and average cost). Not used.
16. Price discrimination: the 2016 textbook only defines it (Clayton Act, §11.1); taught from tutor2u, Kling and the College Board report, and labelled as added material.

## CLEP outline D (23%-33%) and coverage map (subtopic → core sections; quiz items)
- 1a Accounting vs economic profit → L20 "Two kinds of cost", "Accounting profit and economic profit", worked examples; q5-acc-1/2.
- 1b Normal profit → L20 "Normal profit"; L24 zero profit; q5-norm-1/2.
- 1c MR = MC → L21 all sections; reused in L22-L28; q5-mrmc-1/2.
- 2 Characteristics of market structures → L22 "Four market structures"; L28 "Compare the four structures"; q5-str-1/2.
- 3a PC profit maximization → L22 "Price takers", "MR = P = MC"; q5-pcmax-1/2.
- 3b PC short-run supply and shutdown → L23; q5-pcsr-1/2.
- 3c PC firm and market in SR and LR → L23 (exit, LR rules), L24 (profit rectangles, LR equilibrium, entry/exit, demand shift); q5-pclr-1/2.
- 3d PC efficiency → L24 "Why perfect competition is efficient"; q5-pceff-1/2.
- 4a Sources of market power → L25 "What makes a monopoly"; q5-msrc-1/2.
- 4b Monopoly profit maximization → L25 MR below price, De Beers, three steps, exam skill; q5-mmax-1/2.
- 4c Inefficiency of monopoly → L26 "The monopoly outcome and the efficient outcome", "Name the area"; q5-mineff-1/2.
- 4d Price discrimination → L26 "Price discrimination" (added material); q5-pd-1/2.
- 4e Natural monopoly → L25 barriers; L26 "Natural monopoly and regulation"; q5-nat-1/2.
- 5a Interdependence, collusion, cartels → L27 first three sections; q5-ocol-1/2.
- 5b Game theory, payoff matrix → L27 "Game theory", "When cooperation can last"; q5-ogame-1/2.
- 5c Dominant strategies and Nash equilibrium → L27 "Game theory", "Nash equilibrium", exam skill (best-reply method added); q5-onash-1/2.
- 6a Product differentiation and advertising → L28 first section, "The role of advertising"; q5-mcdif-1/2.
- 6b MC profit maximization → L28 "The short run"; q5-mcmax-1/2.
- 6c MC short- and long-run equilibrium → L28 "The long run"; q5-mclr-1/2.
- 6d Excess capacity and inefficiency → L28 "Markup and excess capacity"; q5-mcexc-1/2.
Nothing on the outline is only in Go deeper.

## Unit map (Modern States order; global lesson numbers continue Unit 4)
| Lesson | Title | Modern States | Textbook | CLEP |
|---|---|---|---|---|
| l20 | Economic Profit: Explicit and Implicit Costs | 5.1 first part, slides 180-186 | §7.1; §10.1, §11.3 (zero/normal profit) | 1a, 1b |
| l21 | Profit Maximization: The MR = MC Rule | 5.1 second part, slides 187-192 | §8.2 raspberry farm; §9.2 HealthPill | 1c |
| l22 | Perfect Competition: Price Takers | 5.2 first part, slides 193-200 | ch. 7 intro; §8.1-§8.2 | 2, 3a |
| l23 | Perfect Competition: Shutdown, Exit and Supply | 5.2 middle, slides 201-205 | §8.2-§8.3 | 3b, 3c |
| l24 | Perfect Competition: Long-Run Equilibrium and Efficiency | 5.2 last part, slides 206-210 | §8.2-§8.4 | 3c, 3d |
| l25 | Monopoly: Market Power and the Profit-Maximizing Price | 5.3 first part, slides 211-220 | §9.1-§9.2 | 4a, 4b |
| l26 | Monopoly: Inefficiency, Price Discrimination and Natural Monopoly | 5.3 last part, slides 221-224 | §9.2, §11.1, §11.3 | 4c, 4d, 4e |
| l27 | Oligopoly and Game Theory | 5.4, slides 225-234 | §10.2 | 5a-5c |
| l28 | Monopolistic Competition | 5.5, slides 235-246 | §10.1-§10.2 | 6a-6d, 2 |

## Visual inventory (instructional visuals; question exhibits and sorters not counted)
L20 (7): goal equation · explicit/implicit cost cards · Caroline A vs B costs · Fred's waterfall · two lenses (accounting vs economic) · normal profit diagram · W finance (borrow or use savings).
L21 (7): MR table/bars · raspberry MC table · MR = MC flow · MR/MC graph · marginal profit bars · TR and TC curves · W MR = MC stepper (raspberry / HealthPill).
L22 (7): four-structure spectrum · characteristics table · market vs firm demand panels · Firm A ping-pong table · price $3 → $4 graph · before/after price cards · W price-taker slider.
L23 (7): profit/loss/shutdown cards · yoga center bars · three zones graph · supply = MC above AVC graph · short- vs long-run rules · long-run (firm) supply · W produce-or-shut-down.
L24 (7): profit and loss rectangles (2 panels) · long-run equilibrium graph · entry/exit flow · demand increase, market and firm (2 panels) · constant/increasing/decreasing-cost LRS (3 panels) · allocative efficiency cards · W entry/exit market.
L25 (7): barriers table · perceived demand (2 panels) · MR waterfall (De Beers) · De Beers table · De Beers three-step graph · lettered monopoly graph · W De Beers price chooser.
L26 (8): monopoly vs efficient graph · surplus split bars · price discrimination conditions flow · theater one price vs two prices (2 tables) · natural monopoly A/B/C/F graph · ways to regulate table · lettered surplus areas graph · W deadweight-loss explorer (MC slider, perfect PD switch).
L27 (8): cats-in-a-bag flow · Jack and Jill table · profit bars (cooperate/cheat) · course payoff matrix · prisoner's dilemma matrix · advertising game best replies · W cooperate-or-cheat · W Nash tester.
L28 (8): four kinds of differentiation · perceived demand (3 panels) · pizza table · short run to long run (2 panels) · markup and excess capacity graph · advertising (2 panels) · four-structure comparison table · W rivals enter/leave.
Sorters (practice, not counted): costsort, mrsort, structsort, shutsort, lrsort, barsort, pdsort, mcsort.

## Question counts (distinct items; a generator or lazy exhibit item counts once)
Every lesson: 12 core, 16 more, 6 quick checks (7 in L27 and L28), 12 flashcards (c-l2N-0..11), 2 writing prompts (w-l2N-1/2).
Generators: L20 l20-g-acc, -econ, -normal, -rate, -fred, -implicit · L21 l21-g-mr, -best, -mc, -mp · L22 l22-g-profit, -rise · L23 l23-g-loss, -decide, -shutprice, -cover · L24 l24-g-pl, -firms, -entry · L25 l25-g-mr, -profit, -line · L26 l26-g-dwl, -cs · L27 l27-g-cheat, -nash · L28 l28-g-sr, -excess.

## Quiz blueprint (q5-*, 40 items, five-choice, separate pool, submit-then-reveal)
2 per CLEP subtopic: acc, norm, mrmc, str, pcmax, pcsr, pclr, pceff, msrc, mmax, mineff, pd, nat, ocol, ogame, onash, mcdif, mcmax, mclr, mcexc (ids q5-<key>-1/2). Exhibit items: q5-mrmc-1 (table), q5-ogame-1 and q5-onash-1 (payoff matrices). Distractors use each lesson's Common-mistakes codes (QZ5T).

## ID scheme and storage
Questions l20-* … l28-*; quick checks l20c-* … l28c-*; quiz q5-*; cards c-l20-N …; writing w-l20-N …; containers U5_LESSONS, U5_CARDS, U5_WRITE, U5_PLAN, FIG5; tags U5CLEP/u5tag.
Widgets: W.finance, W.costsort, W.mrmc, W.mrsort, W.pricetaker, W.structsort, W.shutdown, W.shutsort, W.lrmarket, W.lrsort, W.monchoose, W.barsort, W.dwl, W.pdsort, W.duopoly, W.nash, W.mcentry, W.mcsort.
Unit 5 quiz results in `S.quiz5` {best, last, attempts, history, lastAttempt}, added to blankState/normalize so old records load unchanged. Draft in localStorage `micro-quiz5-draft`. New source keys MS5, OS70, OS81-OS84, OS91, OS92, OS101, OS102, OS111, OS113, CBAP, ELMO, ELPR, ELCO, ELPD, ELCA, ELK, FEDC, T2UPD. No existing id, storage path or record changed.

## App changes (all in src/unit5/build.py; additive)
Unit 5 CSS (u5 classes, payoff matrix); UNITS gains Unit 5 with its cover map; LATER drops "Firm Behavior and Market Structure"; home quiz-count map gains 5; `#quiz5` route, tab highlight and render; quiz switcher chip; Reports know "Unit 5 quiz"; staging title/brand "Units 3-5 Staging". Unit 1-4 quiz code untouched (Unit 5's renderer is a renamed copy of Unit 4's).

## Test record (2026-10-28, Playwright/Chromium, build_test.html)
- Every Unit 5 lesson at 375 px (light) and 1100 px (dark), rerun after the audit fixes: 12 core, 16 more, 6-7 checks, 6-7 figures, 2 widgets, 12 cards, 2 writing; all 34 items per lesson render in the single-question view with tags and five choices; no NaN/undefined; no horizontal overflow; no page errors (only the expected blocked-font message).
- Every generator run 300 times: no failures.
- Regression against the base page: all 725 pre-existing questions identical (only auto-generated SVG clip ids renumber), all lessons, cards and Unit 1-4 quiz pools unchanged; 348 new questions, 108 new cards, 18 new widgets.
- Quiz: 40 unique items, all five-choice and tagged, each CLEP subtopic covered twice; during the quiz no option carries right/wrong markers and no explanation text appears; exhibit items show their table/matrix in the quiz card, the results card and the single-question view; submit shows 40 explanations; `S.quiz5` saved locally, `S.quiz4` untouched; draft cleared; all 40 items scheduled for Review.
- Old state (Units 1-4 quizzes, lesson progress, review) loads unchanged and gains an empty `quiz5`.
- localStorage blocked (getItem and setItem throw): lessons and the quiz still work.
- Claude unavailable: "Explain this" shows "Explanations need Claude, which isn't available in this view..."; nothing breaks.
- Cloud store mocked: `unavailable` retries; `quota_exceeded` shows "Progress storage is full..."; other errors show "Could not reach your account..."; progress kept on the device each time.
- Widgets reproduce every TEST NOTE value (lrmarket 7 settings, monchoose 6, dwl 6, duopoly 5, nash 6 boxes, mcentry 4, pricetaker 4, shutdown 6); all 8 sorters show the reason and the right answer on every pick.
- Keyboard: sliders move with arrow keys; Nash boxes select with Enter; segment buttons work with Enter.

## Independent audit (2026-10-29) and what changed
Two separate agents audited the unit against the rubric (gates G1-G8, ten scored criteria), the course transcripts, slides and textbook: one took L20-L24, the other L25-L28 and the quiz. They recomputed every number, ran the generators thousands of times, script-matched quotes against the course corpus and checked web quotes (tutor2u, St. Louis Fed, Econlib Dick).
First-pass result: L20 98, L21 94, L22 95, L25 94, L27 89, L28 87 passed every gate; L23 (91) failed G1 and G7, L24 (91) failed G1 and G6, L26 (92) failed G7. No blockers; every lesson-body number and quiz key was right.
Fixed:
- L23: l23-g-shutprice now builds U-shaped costs (MC dips once, then rises; AVC bottoms out at 3-5 units; 3,000 draws checked); l23-g-cover keeps the price strictly between AVC and ATC and prints two decimals; the shutsort button reads "Profit or break even: keep producing" (the P = min ATC item); l23-g-decide explanation split.
- L24: l24-gr-rect rebuilt on a consistent model (TC = 6 + 4q + 0.5q²: MC $10 = P at 6 units, ATC $8, profit $12, MC drawn); market-figure labels no longer hide point A or clip D2.
- L26: l26c-perfect no longer has a second true choice; l26c-pd now uses a student discount (not peak pricing); source line adds OS91 and OS111.
- L27: new quick check l27c-cheat; four quotes restored to the source wording (Dick "also", OPEC agreements "not legally enforceable", "they're facing", "Can't do any better"); the course's "below the monopoly outcome" slip flagged; Nash answer positions now shuffle.
- L28: new quick check l28c-perc; markup, excess capacity, entry, exit and both efficiencies tappable; slide numbers corrected (Welfare 245, Key Takeaways 246; no slide 247); Chamberlin's book title corrected with the textbook's version noted; OS84 added.
- Quiz: q5-pcmax-2 now stands alone (it depended on the previous item, but the quiz shuffles); q5-pd-2 lost its "two questions above" pointer; q5-ocol-2 (three firms), q5-mineff-1 (P = 30 − 2Q, MC $6, DWL $36) and q5-mmax-2 (negative MR) replaced because they matched lesson practice; q5-mcmax-2 rewritten (MR below price for a café) so it no longer matches the new L28 check; matrix items no longer fix the key at A.
- All lessons: numeric choices on lazy and generated items are now sorted smallest to largest; more tap-to-define (diminishing returns, market-structure names, AVC, fixed and variable cost, ATC, new increasing- and decreasing-cost glossary terms, marginal revenue, economies of scale, consumer surplus, allocative efficiency, duopoly); HealthPill profit tie at 3 and 4 noted and "6 or 7 units" made consistent; diminishing-returns references point to Lesson 16; L22 flags the course's "sum of costs and variable costs"; quoted em dashes replaced with ellipses; label collisions fixed (L21 profit chart, L25 De Beers graph, L26 natural monopoly, L28 graphs and widget); duplicate Thurow quote removed.
Not verified by the auditors: the Econlib Thurow and Lemieux quotes (no Econlib text offline for the first auditor; Lemieux was checked live in the Unit 4 build).

## Second audit (2026-10-29) and what changed
Two fresh agents re-audited (A: L20-L24; B: L25-L28 and the quiz); a third, separate agent then re-verified the fixes.
Fixed from the second audit:
- Lessons: l23-shut-rule distractor; L23 supply curve starts at the $2.05 shutdown point; l21-g-mr never gives MR below $2; L24 worked example (80 packs at $5) and figure number (Figure 8.8); unsupported "CLEP mostly uses constant cost" line removed; l28-pizza-tie, l26-pd-output and l27-both-cheat stems now self-contained; l27-g-nash rebuilt (random 2x2 game with exactly one pure equilibrium, 500 draws checked); payoff-order note (slides 231, 233); "first panel/second panel" captions; an analogy in L22, L23, L26, L27 and L28; more tap-to-define terms in every lesson; L20 explicit/implicit picture redrawn as two columns (readable at 375 px); L21 "Profit ($)" axis title no longer clipped; dwl widget legend; L23 bar legend now "Solid bar = smaller loss" (it pointed the wrong way in dark mode); L23 zero-profit label no longer cut off.
- Quiz: 13 items rewritten so none repeats a lesson question and the two items per subtopic test it differently: q5-mrmc-2 (TR/TC table), q5-pcmax-2 (MC/AVC table, two prices), q5-pcsr-2 (graph, pick the shutdown point), q5-mmax-1 (demand and cost table), q5-mmax-2 (why the revenue-max output is not the profit-max output), q5-mineff-1 (split of lost consumer surplus into profit and deadweight loss), q5-pd-1 (airline fares, profit gain), q5-nat-1 (subsidy at P = MC), q5-ocol-1 (what keeps a cartel together; Econlib and St. Louis Fed quotes checked verbatim), q5-ogame-1 (who has a dominant strategy), q5-mcmax-1 (read the loss off a graph), q5-mcmax-2 (price and markup from a table), q5-mclr-1 (which long-run outcome fits). Wide tables made vertical so nothing is cut off on a phone.
Verifier result before the last round: L20 97, L21 97, L22 96, L23 94 (one gate fail, the legend, now fixed), L24 96, L25 93, L26 96, L27 96, L28 96. Quiz: 40 items, 2 per CLEP subtopic, five choices. The last round (L23 legend and label, five quiz items) was checked by script and screenshot, not by a second independent pass.
Tests after the last round: no page errors; 725 old questions and Units 1-4 unchanged; quiz withholding, scoring, S.quiz5 storage, old-state, blocked storage and cloud-failure tests pass; every Unit 5 lesson has no horizontal overflow at 375 px; all 40 quiz items fit at 375 px; generators clean.
Left open (minor, recorded): misconception tags on every distractor (A-D12, B-#17); l27-mx-br wording (B-#22); some long sentences (B-#24); "Hide explanation" label in quiz hint mode is shared base code (B-#25); 2015 wheat $6.00 kept as the textbook's figure (A-D13); barsort widget has no lead-in sentence. "Perfectly elastic" (L22), "oligopoly"/"deadweight loss" (L28) and "total revenue" (L25) appear only in quotes, captions or comments, not in lesson body text, so they have no tap.
Published to staging only: Version 6 (1793292587-5d98). Live artifact untouched.

## Final review rounds and live publish (2026-11-01)
Round 4 (fresh independent agent, whole unit) flagged quiz items that still overlapped lesson practice or had keys that could be argued. Fixed:
- q5-mclr-1: new juice-bar numbers; the key is the short-run outcome (5 smoothies at $8.25 with ATC $8.25, MC $4.50); explanation names options by content because numeric choices are re-sorted.
- q5-mmax-2: rent rises $10 a day; key "keep selling 6 units at $14; profit falls to $20 a day" (fixed cost doesn't move MR = MC).
- q5-mineff-1: P = 28 - 2Q, MC $8; monopoly 5 at $18, efficient 10 at $8; consumer surplus falls $75, of which $50 becomes profit and $25 is deadweight loss. Tags M1 M3.
- q5-mcmax-1: added why $12 is the right size but the wrong sign (price below ATC is a loss).
- L25: added "Fixed costs don't move the choice" paragraph (De Beers still 300 at $1,400; only profit falls).
Round 5 (separate agent) passed everything except one contradictory sentence in q5-mcmax-2's explanation, now: "$11 makes one candle too many: the 5th adds $7 to revenue but $8 to cost. $13 and $15 stop too early."
Final tests on the live build: no page errors; regress vs the live base, 0 of 725 old questions changed and no Units 1-4 lessons changed; unit5.js all clean; 40 quiz items, 2 per subtopic; no horizontal overflow at 375 px.
Published to live: Version 21 (1793576775-2229), built from live Version 1793210645-1479 plus Unit 5 only. Capabilities (db, sample, user) carried forward. Staging not republished; workbook_units3-5_staging.html has the same fixes.
GitHub: snapshot before (commit 04fedea) and after this publish.

