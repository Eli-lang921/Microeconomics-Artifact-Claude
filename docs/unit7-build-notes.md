# Unit 7 build notes (Market Failure and the Role of Government)

Started 2026-11-19 from Eli's Unit 7 build prompt (email "Re:" 2026-11-19 07:40), the Golden Standard rubric (docs/lesson-rubric.md) and the Unit 2-6 decisions.
Base = live artifact version 1794512096-47ca, byte-identical to index.html at GitHub main 2c467c6 (sha256 05fabcd5…). Tag push was refused by the proxy, so the baseline is recorded by commit hash.
Source files: `src/unit7/` (head7.js, l33.js … l37.js, widgets7.js, quiz7.js, unit7card.js, u7.css, build.py). `python3 src/unit7/build.py BASE OUT`; every patch must match exactly once.

## Decisions (Eli, 2026-11-19)
- Go-live: GitHub backup first; publish straight to live once every gate passes; if blockers remain, stop and show him.
- Extras: keep 16 "More practice" per lesson; they join Review only via "Add to Review" (already how the live page works since Review upgrades 4).
- Textbook: Eli attached the 48 MB textbook zip directly (Drive connector caps downloads at 10 MB).
- Audits: independent reviewers, no cap on rounds.
- Rubric: not attached; the repo copy docs/lesson-rubric.md (same one Units 2-6 used).
Reused without asking (settled for Units 2-6): 12 core + 16 more per lesson; T/F items test a Common-mistakes belief; numeric explanations name the typical wrong answer; five-choice quiz, submit-then-reveal, separate pool; numeric choices smallest to largest; graph answer choices for choose-a-graph skills; explanation visuals; card pictures.

## Inputs
- Modern States: transcripts 7.1 (Externalities), 7.2 (Public Goods), 7.3 (Income Distribution); Module 7 slides (PDF pages 1-29; printed slide numbers 256-265 for 7.1, the rest unnumbered).
- No course content-mapping PDF in the zips (overview pages list modules only). Reading mapping is my inference: OS ch. 12 (§12.1-12.3), ch. 13 (§13.1, §13.3), ch. 14 (§14.1-14.5); ch. 11 for antitrust and regulation, which Modern States Module 7 does not teach.
- Official CLEP outline (clep.collegeboard.org/exam/microeconomics, opened 2026-11-19): Market Failure and the Role of Government 8%-14%: Externalities (MSB and MSC; positive; negative; remedies) · Public goods and private goods (excludability, rivalry, free-rider problem; provision of public goods) · Public policy to promote competition (antitrust policy; regulation) · Income distribution (income inequality; sources of income inequality; Lorenz curve and Gini coefficient). Sample question 7 (externalities, key B) uses MSC vs MPC wording.

## Lesson map
| Lesson | Title | Modern States | Textbook | CLEP |
|---|---|---|---|---|
| l33 | Externalities: Private and Social Costs and Benefits | video 7.1 first part, slides 256-260 | §12.1, §13.1 | MSB/MSC, positive, negative |
| l34 | Fixing Externalities: Taxes, Subsidies, Regulation and Permits | video 7.1 second part, slides 261-265 | §12.2, §12.3, §13.2 | remedies |
| l35 | Public Goods, Common Resources and the Free-Rider Problem | video 7.2, Module 7.2 slides | §13.3 | excludability, rivalry, free rider; provision |
| l36 | Antitrust Policy and Regulation | none (Module 5 slide 223 lists antitrust as a way to deal with monopoly) | §11.1-§11.4 | antitrust; regulation |
| l37 | Income Inequality, Poverty, the Lorenz Curve and the Gini Coefficient | video 7.3, Module 7.3 slides | §14.1-§14.5 | income inequality; sources; Lorenz and Gini |
L36 is inserted between the Modern States 7.2 and 7.3 material, in CLEP outline order, because Modern States has no video on it.

## Source gaps found
- 2016 textbook has no "Gini coefficient" (only the Lorenz curve, §14.4); Gini taught from FRED (World Bank series note) and BEA primer (Hood, Aug 2025).
- 2016 textbook does not mention the negative income tax; taught from Econlib (Jodie Allen).
- Textbook never says "marginal social cost/benefit"; CLEP outline and sample Q7 use the terms; FRBSF Dr. Econ gives Private + External = Social costs.

## CLEP outline coverage map (all in core lesson sections)
- Externalities: MSB and MSC → L33 "Private and social costs and benefits", "The efficient quantity and why the market misses it"; positive → L33 "Positive externalities: education and research"; negative → L33 "Negative externalities: pollution"; remedies → L34 (all sections). Quiz q7-msb-1/2, q7-pos-1/2, q7-neg-1/2, q7-rem-1/2.
- Public goods and private goods: excludability, rivalry, free-rider → L35 "Two questions", "Four types", "Public goods and the free-rider problem"; provision → L35 "Provision of public goods". Common resources (Modern States topic) → L35. Quiz q7-exc-1/2, q7-prov-1/2.
- Public policy to promote competition: antitrust → L36 "Why promote competition?", "The antitrust laws", "Illegal agreements and restrictive practices", "Mergers and measuring concentration"; regulation → L36 "Regulating natural monopolies", "When regulation goes wrong" (natural monopoly A/B/C/F also in L26). Quiz q7-anti-1/2, q7-reg-1/2.
- Income distribution: income inequality → L37 "Income inequality and poverty", "How unequal is U.S. income?", "Policies"; sources → L37 "Sources of income inequality"; Lorenz and Gini → L37 "Measuring inequality", "The Gini coefficient". Quiz q7-ineq-1/2, q7-src-1/2, q7-lor-1/2.

## Visual inventory (instructional visuals; question exhibits, graph choices and explanation visuals not counted)
L33 (9 figures + 2 widgets): who is inside/outside the deal · negative vs positive table · MPC + external = MSC calculation · refrigerator Table 12.2 annotated · refrigerator graph with DWL · education MSB graph · Big Drug table · side-by-side negative/positive graphs · overproduction chain · W extlab (damage slider) · W extsort.
L34 (9 + 2): internalizing table · tax onto MSC graph · subsidy onto MSB graph · command-and-control vs market-based cards · abatement-cost bars vs $1,000 tax · two-firm cost comparison · slide 264 permit trade flow · Table 12.4 permits · Coase railroad flow · W taxlab · W remsort.
L35 (7 + 2): excludable/rival cards · four-types grid · Main Street flow · free-rider payoff table · streetlight value bars · commons chain · common-resource tools table · W pgcalc · W goodsort.
L36 (9 + 2): why-promote-competition chain · antitrust law timeline · allowed/forbidden practices table · windshield CR4/HHI table · same-CR4-different-HHI bars · natural monopoly A/B/C/F graph (from L26) · cost-plus vs price cap cards · regulatory capture chain · airline before/after table · W hhi · W polsort.
L37 (11 + 3): poverty vs inequality cards · 2014 incomes as multiples · real wage bars · poverty bars · quintile-to-cumulative table · Lorenz 1980 vs 2013 · Gini areas A/B · skilled-labor supply and demand graph · sources table · negative income tax calculation · equality-output trade-off flow · W lorenz · W nit · W lorsort.

## Quiz blueprint (q7-*, 22 items, five-choice, separate pool, submit-then-reveal, stored as S.quiz7, draft in localStorage micro-quiz7-draft)
Two per outline subtopic (11 × 2). Graph-choice items: q7-rem-1 (subsidy to sellers), q7-src-2 (skilled-labor shifts), q7-lor-2 (choose the Lorenz curve). Exhibits: lettered areas (q7-msb-2), tables (q7-neg-1, pos-1, rem-2, anti-1, reg-1, ineq-1), two Lorenz curves (q7-lor-1). Fixed order (keepOrder) only where choices are numbers in order, letters, or graphs.

## IDs and storage
Questions l33-* … l37-*; quick checks l33c-* …; quiz q7-*; cards c-l33-N …; writing w-l33-1/2 …; containers U7_LESSONS, U7_CARDS, U7_WRITE, U7_PLAN, FIG7; tags U7CLEP/u7tag. Widgets W.extlab, W.extsort, W.taxlab, W.remsort, W.pgcalc, W.goodsort, W.hhi, W.polsort, W.lorenz, W.nit, W.lorsort.
New source keys MS7, OS112, OS114, OS121-OS123, OS131-OS133, OS141-OS145, ELEX, ELPG, ELAT, ELNIT, FRBSF, FREDG, BEAG. Glossary entries 'market-failure' and 'public-goods' re-pointed to l33/l35 (definitions kept). App changes: Unit 7 card, quiz route #quiz7 (renamed copy of the Unit 6 renderer), quiz switcher chip, report topics, S.quiz7 in blankState/normalize, LATER emptied and the "Later units" section hidden when empty. No existing id, storage path or record changed.

## Source problems found (recorded; not repeated as fact)
1. MS video 7.1 transcript: "uncomplicated impact"; slide 256 says "uncompensated". L33 notes it.
2. MS video 7.1: "the voting behavior of firms is better"; slide 260: "better-educated voters". L33 notes it.
3. MS video 7.1 closes "Thank you ... module 6 on externalities" (module 7). Not repeated.
4. MS video 7.3: top 5% "earned $440,000"; slide: $448,489. L37 uses the slide and notes it.
5. Textbook Figure 14.8 caption says 2011; Table 14.6 and text say 2013. L37 notes it.
6. Textbook §14.4 text gives the top quintile 51.14% in 2011 and 51.0% in 2013 (Table 14.6 uses 51.0). L37 uses Table 14.6.
7. Textbook spells Hardin "Garret"; Econlib "Garrett". L35 notes it.
8. MS 7.3 conclusion ("these measures do not do enough") is a normative view; L37 labels it as the course's view next to the textbook's trade-off view.
9. 2016 textbook lacks the Gini coefficient and the negative income tax; taught from FRED/BEA and Econlib (see Source gaps).

## Test record (2026-11-19, Playwright/Chromium; src/unit7/test7.py BASE BUILD data/progress.json OUT)
- Regression vs the live page: 1,231 existing questions identical after normalizing auto-generated SVG ids; Units 1-6 lesson order, bodies and quiz pools identical; 203 new items.
- All 203 Unit 7 items built (generators 400×, lazy 40×): no NaN/undefined, answer index valid, five choices on every multiple-choice item, every graph item has five SVG choices, five descriptions and "Graph A-E" labels.
- Each lesson at 375 px light and 1100 px dark with extras and Go deeper open: no page errors, no page overflow, no empty or uncaptioned figure; graph choices 2 per row at 375, 3 at 1100. Every table fits at 375 px (src/unit7/test_tables.py). Figures screenshot-checked (src/unit7/test_figs.py); label collisions fixed.
- Quiz: answered all 22 at 375 px: no option colors, verdicts or explanations before submit; graph choices 2 per row; after submit 22 result cards with written/new-version buttons; S.quiz7 saved, S.quiz6 untouched; quiz answers queued no flashcards.
- Flashcards: a "more practice" answer added nothing; the first core answer in l33 added its cards due today at step 1, kept a card already in Review at its step, skipped mastered and deleted cards; a second sync added nothing; l34 core answer added 12. Card pictures present (12/12/12/12 of 12 in L33-L36; 11 of 15 in L37, where the three definition-only cards added in round 1 have no picture).
- Written response (Claude mocked): l33-gr-neg (graph choices: frozen graphs, key "Graph X: …"), l33-g-opt (generator), l33-cbs: preview → saved; new-version requests queued; unit quiz keeps the original.
- Old progress (data/progress.json) loads: lessons, mastered, written, reports, deleted, ratings, quiz1-5 unchanged; review identical to what the live page produces from the same data; quiz7 added empty. Home shows Unit 7; "Later units" hidden.
- localStorage blocked: lessons and quiz load with no page errors. Claude unavailable: written response says it needs Claude.
- Widgets reproduce every TEST NOTE value (extlab 3, taxlab 4, pgcalc 4, hhi 9, lorenz 4, nit 6 settings); all 30 sorter items show the reason.
Not tested here: a real phone (touch), a screen reader, the live claude.ai runtime (sample/db), Claude's actual rewrite quality.

## Independent audit history
Reviewers were separate agents that never saw the builder's grades; each read the rubric, the sources and the built page, and wrote a report to /home/claude/audit/.
### Round 1 (2026-11-19)
| Lesson | Score | Failed gates | Main defects fixed |
| --- | --- | --- | --- |
| L33 | 82.5 | learner checks | self-contained stems (cbs, coal), graph-choice explanation visuals (u7extBig), social-supply item rebuilt as graph choices, MSC/MSB cards |
| L34 | 70 | G1, G8 | permit-trade caption and model answer reversed; taxlab messages at 0, ties and 5 steps; Coase quick check added; patents in core; Pigovian wording |
| L35 | 72.5 | G7, G8 | l35-patent had two defensible answers; pgcalc tie said "Yes" (now "Break-even"; third readout = equal share C/n); Hardin and positive-externality bridge added |
| L36 | 75 | G7 | HHI graph choices unreadable (now labeled bars 80/10/10 vs 50/50); FTC guideline shown only for mergers; capture quick check; source key MS5S; polsort order shuffled |
| L37 | 72.5 | G1, G5 | food-insecurity caption repeated the video's slip (12% is households without children; 14% all households); NIT figure order of operations; in-kind transfers and welfare/housing assistance now explained (textbook §14.3); sources has 2 core questions |
| Quiz | 16/22 well built | n/a | 4 near-copies replaced (prov-1 streetlight count, reg-2 rule comparison table, ineq-2 below-median payment, src-2 demand for less-skilled labor falls); msb-2 explanation corrected (U = Z = 1.25); ineq-1 marked-up table |
Cross-cutting: cell-level table highlights (td.u3z1/u3z2/u3z3) never rendered anywhere in the workbook because no CSS rule targets cells. Fixed for Unit 7 only with `.u3tbl.u7t td.*` in u7.css; Units 1-6 are untouched and still have the bug. Single-curve Lorenz labels moved inside the plot; text-only tables left-aligned (`u7l`). Numeric choices starting with "About" now sort smallest to largest.
Not a Unit 7 change: the live page already drops 336 old question entries from Review when it loads data/progress.json (the earlier Review change that moved practice questions out of Review); the build does exactly the same.
Verified during fixes: USDA ERS food-insecurity definition (new source USDAFS); Econlib "Minimum Wages" is by Linda Gorman and argues minimum wages reduce employment (search result text).

### Round 2 (2026-11-19)
| Lesson | Score | Result | Fixed after |
| --- | --- | --- | --- |
| L33 | 92.5 | failed learner checks | l33-gr-dwl axis labels (were Unit 6 "Wage/Quantity of labor") and hinting descriptions; l33-cbs rewritten (too close to CLEP sample Q7) |
| L34 | 90 | failed G2 | command-and-control moved before corrective taxes (slide order 262, 263); EPA and pollution charge tap-to-define; l34why caption |
| L35 | 95 | pass | amber second highlight; Hardin key no longer repeats stem |
| L36 | 92.5 | pass | predatory-pricing citation now textbook §11.2 quote; merge2 order; breakup quote exact |
| L37 | 87.5 | pass | none required |
| Quiz | 21/22 | q7-reg-2 table inconsistent | rebuilt from MC $6, fixed cost $54, demand P = 30 − 2Q |
Unit-level checks passed (coverage 11/11 in core, ~92% exam-focused, Units 1-6 unchanged, old progress identical, byte-identical rebuild).
### Round 3 (2026-11-19, L33, L34, q7-reg-2 only; Eli approved the narrower scope)
L34 pass (90), q7-reg-2 pass, L33 100 with all gates passing but one uncaptioned explanation table (l33-trumpet). Caption added; Eli approved publishing without a further review.
Published to the live artifact 2026-11-19 (version 1795128292-cfdc). Open minor items: some explanation tables scroll sideways at 375 px (l33-fridge-q, l34 permit items); L34 has no analogy; a few weak numeric distractors; the Units 1-6 cell-highlight bug.
