# Unit 6 build notes (Factor Markets)

Built 2026-11-04 in one chat from Eli's Unit 6 build prompt (the generic unit-build prompt with project decisions 1-10), the Golden Standard rubric (docs/lesson-rubric.md) and the Unit 2-5 decisions.
Source files: `src/unit6/` (head6.js, l29.js … l32.js, widgets6.js, quiz6.js, unit6card.js, u6.css, build.py), merged by `src/unit6/build.py BASE OUT`, which patches a page that already has Units 1-5 (every patch must match exactly once).
Base = the live artifact as of 2026-11-04 (version 1793707589-eafc, Units 1-5, Review upgrades 1-3 and the Nov 3 flashcard auto-add), committed to GitHub first as 598616d ("Snapshot before Unit 6"). index.html in the repo is that page.

## Decisions (Eli, 2026-11-04)
- Build Unit 6 on the current live page (not the stale Oct 29 staging copy); back up to GitHub first. Live gets it only after Eli says go, once he has seen the results.
- If the final audit still lists blockers, stop and show him; don't publish.
- Quiz: 20 five-choice items.
- Readings: the course content-mapping PDF wasn't attached. Mapping used (my inference, labelled as such): core = video 6.1, slides 247-269, textbook ch. 4 introduction and §4.1; textbook §15.1 (unions) and §15.3 (immigration) only in collapsed Go deeper; monopsony from OpenStax 2e §14.2 in Go deeper.
- GitHub main for snapshot, source and notes; also the Project docs (unit6-build-notes, workbook plan).
- Independent audits until every gate passes, no cap on rounds. Old "Units 3-5 Staging" artifact left alone.
Reused without asking (settled for Units 2-5): 12 core + 16 more per lesson; T/F items test a Common-mistakes belief; numeric explanations name the typical wrong answer; five-choice quiz, submit-then-reveal, separate pool; numeric choices smallest to largest; every CLEP outline topic in core.
New for Unit 6 (from this prompt): graphs as answer choices where the skill is reading or choosing a graph; explanation visuals after answering; flashcard backs with pictures; six or more instructional visuals per lesson.

## Lesson boundaries
Module 6 is one 17-minute video (6.1) and 23 slides. CLEP weight 6%-12% (more than Unit 3's 5%-10%, which has 3 lessons), so 4 lessons, split at the video's natural breaks:
| Lesson | Title | Modern States | Textbook | CLEP |
|---|---|---|---|---|
| l29 | Factor Markets and Derived Demand | 6.1 first part, slides 247-254 | ch. 4 intro, §4.1 | A |
| l30 | Marginal Revenue Product and the Hiring Rule | 6.1 middle, slides 255-260 | §4.1, §9.2 | B, C |
| l31 | Shifts in the Demand for Labor | 6.1, slides 261-262 | §4.1 (Table 4.2) | A, C |
| l32 | Labor Supply, Marginal Factor Cost and the Equilibrium Wage | 6.1 last part, slides 263-269 | §4.1 (Tables 4.1, 4.3; Figure 4.3) | C |

## CLEP outline (III. Factor Markets, 6%-12%) and coverage map
- A. Derived factor demand → L29 "Derived demand" (+ worked nurses example, two-market figure), "Trace it back from the product"; L31 "A change in the price of the output". Quiz q6-der-1..5.
- B. Marginal revenue product → L30 "The value of the marginal product", "Marginal revenue product", "The demand curve for labor", "Why the curve slopes down"; L31 price shift. Quiz q6-mrp-1..7.
- C. Labor market and firms' hiring of labor → L30 "The hiring rule", "How many workers?"; L31 all sections; L32 all sections (MFC, firm vs market supply, supply shifts, equilibrium, four-step, linkages). Quiz q6-lab-1..8.
Nothing on the outline is only in Go deeper. Monopsony is not on the CLEP outline; it is in L32 Go deeper because CLEP sample question 6's wrong answers describe it, and L32's core MFC section gives a one-paragraph boundary case.

## Source status
| Source org | Pages used | Status |
|---|---|---|
| Modern States | Video 6.1 transcript; Module 6 slides 247-269 | Provided, read in full |
| OpenStax Principles of Microeconomics 2016 (course textbook) | ch. 4 introduction, §4.1; §15.1; §15.3 | Provided (textbook zip), read; quotes from this edition. The 2016 edition has no marginal product, MRP or monopsony. |
| OpenStax Principles of Microeconomics 2e (newer edition) | §14.1, §14.2 | Opened (labelled "a newer edition, not your course textbook") |
| College Board | CLEP exam page and fact sheet (Factor Markets 6%-12%, A-C; sample questions 4 and 6) | Opened |
| Econlib | Gorman "Minimum Wages"; Reynolds "Labor Unions" | Opened |
| Federal Reserve Education | "The Labor Market" | Opened |
| Marginal Revolution University | "The Marginal Product of Labor" | Partially available (page description only; no transcript) |
| Khan Academy | AP factor markets unit | Unavailable (page body not readable) |
| AP CED | Unit 5 | Not opened |
| Course content mapping PDF | Module 6 assigned readings | Unavailable (not attached) |

Cross-reference orgs per lesson (besides Modern States): L29 OpenStax, College Board, Econlib, Federal Reserve Education · L30 OpenStax, College Board, Econlib · L31 OpenStax, College Board, Federal Reserve Education · L32 OpenStax, College Board, Econlib.

## Source problems found (recorded; not repeated as fact)
1. MS slide 253 labels the last toaster row "7" (slides 254-257 and the video use 6); already noted in Unit 4.
2. MS video: "150 minus 40 divided by five minus four" for the 5th worker; the table gives 150 − 140 = 10. L29 notes it.
3. MS slide 259: "Wage of each worker = Value of output they each produce"; the course's own table pays every worker $100, which equals the value of the last worker's output. L30 flags it (M6, l30-tf-ownvmp).
4. MS video/slide 262: technological progress means the "firm needs less labor." The textbook (§4.1 Table 4.2) says technology can be a substitute (demand falls) or a complement (demand rises). L31 teaches both and flags the course's one-way rule (FIG6.l31claim, l31-tf-tech, l31-ms-vs-textbook).
5. MS video: "the supply of labor by the household is going to reflect the point where the Marginal Factor Cost is equal to the Marginal Wage Rate" runs together the market supply (slide 266's upward "Supply by Households") and one firm's flat MFC = wage line. L32 explains both lines.
6. MS video (linkages): "measuring the impact of the event of the Marginal Product on that factor" is garbled; L32 quotes it with a bracketed correction.
7. Textbook Figure 4.2 caption: "At this below-equilibrium salary, excess demand or a surplus exists"; the paragraph correctly says "excess demand or a shortage." L32 flags it (l32-caption).
8. MS slide 267 lists "Expectations: retirement age/pension, life expectancy, health" with no direction; L32 labels the direction it uses as a reading of the slide.
9. MS: the toaster example has a tie at the 5th worker (value $100 = wage); the course says the firm is "indifferent between hiring the fourth or the fifth worker" and names the 5th. L30 follows that and never offers the tie as a separate distractor.

## Visual inventory (instructional visuals; question exhibits, graph choices and sorters not counted)
L29 (9): production function machine and worked numbers · product vs factor market roles · derived-demand chain · meals and chefs before/after (2 panels) · why some workers earn more · toaster MPL table · MPL bars and total output (2 panels) · W toaster (add a worker) · W dersort (exam skill).
L30 (9): value of MP table · marginal profit bars · MRP price taker vs market power · hiring rule graph · labor demand curve (wage moves) · diminishing returns chain · Unit 5 vs Unit 6 rule table · W hire (wage and price sliders) · W vmpfill.
L31 (9): movement vs shift (2 panels) · price rise table · D1 → D2 graph · typists vs IT (2 panels) · course vs textbook on technology · other inputs flow · all shifters table · W ldshift · W ldsort.
L32 (9): MFC table · market sets wage / firm takes it (2 panels) · why supply slopes up · supply shifters table · nurses equilibrium with surplus and shortage · four-step technology (2 panels) · linkages flow · W labormkt · W wagesort.

## Question counts (distinct items; a generator or lazy item counts once)
Every lesson: 12 core, 16 more, 6-7 quick checks, 12 flashcards (c-l29-0..11 etc.), 2 writing prompts (w-l29-1/2 etc.).
Graph-choice items: l29-gr-derived, l29-gr-mplbars, l29-gr-tp, l30-gr-demand, l30-gr-dmr, l31-gr-price, l31-gr-tech, l31-gr-movement, l31-g-shiftpick (generated), l32-gr-firmsupply, l32-gr-immig, l32-gr-supplyleft; quiz q6-der-3, q6-mrp-5, q6-lab-7.
Generators: l29-g-prodfn, -mpl, -prodchg, -mpl2 · l30-g-vmp, -hire, -mrp, -gr-hire, -mprof, -maxwage · l31-g-pricehire, -vmpshift, -shiftpick · l32-g-mfc, -surplus, -shift.

## Quiz blueprint (q6-*, 20 items, five-choice, separate pool, submit-then-reveal)
Derived factor demand 5 (q6-der-1..5) · Marginal revenue product 7 (q6-mrp-1..7) · Labor market and firms' hiring of labor 8 (q6-lab-1..8). Exhibit items: q6-mrp-1, q6-mrp-4, q6-lab-2, q6-lab-5 (tables), q6-lab-3 (graph), q6-der-3, q6-mrp-5, q6-lab-7 (graph choices, fixed order so a saved draft keeps its meaning).

## ID scheme and storage
Questions l29-* … l32-*; quick checks l29c-* … l32c-*; quiz q6-*; cards c-l29-N …; writing w-l29-N …; containers U6_LESSONS, U6_CARDS, U6_WRITE, U6_PLAN, FIG6; tags U6CLEP/u6tag.
Widgets: W.toaster, W.dersort, W.hire, W.vmpfill, W.ldshift, W.ldsort, W.labormkt, W.wagesort.
Unit 6 quiz results in `S.quiz6` {best, last, attempts, history, lastAttempt}, added to blankState/normalize so old records load unchanged. Draft in localStorage `micro-quiz6-draft`. New source keys MS6, OS40, OS151, OS153, OSE141, OSE142, ELMW, ELLU, FEDL. No existing id, storage path or record changed.

## App changes (all in src/unit6/build.py; additive)
Unit 6 CSS; UNITS gains Unit 6 with its cover map; LATER drops "Factor Markets"; home quiz-count map gains 6; `#quiz6` route, tab highlight and render (a renamed copy of the Unit 5 renderer that also shows graph choices); quiz switcher chip; Reports know "Unit 6 quiz".
General hooks that change nothing for existing items:
- Graph answer choices: questions with `visual:true` get `.opts.vis` (two per row on a phone, three on wider screens); `optDesc` holds a plain description of each graph for Claude's context (Explain this, rewrites, new-version requests), never shown on screen. Graph SVGs are labelled "Graph A" … for screen readers.
- `optPlain`, `qExhibits`, `correctText`: written versions of graph-choice questions keep graphs A-E under the typed question, freeze the order on screen (`written[qid].vis`, `.ex`, `.explain`), and key the answer as "Graph X: description". `writtenRewritePrompt` tells Claude to ask which graph and why.
- Flashcards: a 6th element in a CARD_LIST entry is a picture (HTML) shown at the end of the card back; an edited built-in card keeps it under the edited text; custom cards have none.

## Test record (2026-11-04, Playwright/Chromium, build /home/claude/build/workbook_unit6.html)
- Every Unit 6 item built (generators 400 times each, lazy items 20 times): no NaN/undefined, no duplicate choices, answer index valid, five choices on every multiple-choice item, every graph item has five SVG choices and five descriptions.
- Every Unit 6 lesson at 375 px (light) and 1100 px (dark), all extra practice opened and Go deeper expanded: no page errors, no horizontal overflow, 7 figures and 2 widgets each; graph choices 2 per row at 375 px (3 rows) and 3 per row at 1100 px (2 rows). Label collisions found in screenshots were fixed (curve labels moved inside the chart, four tables narrowed).
- Regression against the live base page: 1,073 existing questions, 345 built-in cards, 28 Unit 1-5 lessons and the Unit 1-5 quiz pools identical (SVG clip ids normalized); lesson order Units 1-5 then l29-l32; all old widgets present; 158 new questions.
- Flashcard auto-add: first core answer in l29 added its 10 eligible cards plus a custom l29 card, due today at step 1; a card already in Review kept its step and date; mastered and deleted cards skipped; a second sync added nothing; a "more practice" answer added nothing; a core answer in l30 added its 12.
- Quiz: during the quiz no option colors, verdicts, explanations, ratings or written/new-version buttons; graph-choice items shown as grids; after submit 20 result cards with explanations, ratings and both buttons; exhibits inside the cards; `S.quiz6` saved and `S.quiz5` untouched; quiz answers added no flashcards; missed items scheduled.
- Change to written response (Claude mocked): l29-gr-derived (graph choices), l31-g-shiftpick (generated graph choices), l30-g-hire (generated numbers), q6-mrp-5 (quiz item, from results): preview → Use this version saved to `written`; the question then shows as a typed answer with graphs A-E (or the frozen table) under it; key "Graph X: …"; rewrite prompt includes the graph descriptions and the A-E instruction; the unit quiz still shows the original; Switch back removes it.
- Ask for a new version: request queued as `variant:l29-gr-derived` with graph descriptions; Reports tab shows "New version request".
- Flashcards: picture on the back of c-l29-4; after editing that built-in card, the edited text shows and the picture stays under it; custom cards have no picture.
- Widgets reproduce every TEST NOTE value (hire 6 settings, ldshift 4, labormkt 6, toaster 5, vmpfill all-correct); all 18 sorter items show the reason and right answer; slider arrow keys and sorter Enter work.
- Old state (no quiz6; Unit 5 quiz, lesson practice, a written conversion) loads unchanged and gains an empty quiz6; home shows the Unit 6 card with a 20-question quiz.
- localStorage blocked (getItem and setItem throw): lesson, written-response box and quiz work with no page errors. Claude unavailable: written response says it needs Claude; Explain this shows "Explanations need Claude, which isn't available in this view."
- Cloud store mocked: `unavailable` retries; `quota_exceeded` shows "Progress storage is full..."; other errors show "Could not reach your account..."; progress kept on the device each time.
Not tested here: a real phone (touch), a screen reader, the live claude.ai runtime (sample/db capabilities), Claude's actual rewrite quality.

## Audits
(filled in after the independent audits)
