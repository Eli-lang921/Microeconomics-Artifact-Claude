# Unit 2 build notes (Supply and Demand) — working file

## Decisions from Eli (2026-10-22, this chat)
- Copy = STAGING. Build Unit 2 in staging artifact https://claude.ai/artifact/UYh8rWtQp51YXzRZ9b3WZC; promote to live (NcS17Vqfj1fYxqC93TBAki) only with Eli's OK.
- Scope "80-90% exam + 10-20% extra" = EMPHASIS: cover every Unit 2 CLEP topic; extra goes in collapsed Go deeper.
- Practice: match Lesson 4 = 12 core + 16 more (rubric's 6-8 overridden by Eli).
- T/F and numeric items: misconception-based (T/F statement tests a Common-mistakes belief; numeric feedback names the typical wrong answer).
- Prompt file ended mid-line; nothing more. Unit 2 = Supply and Demand (videos 2.1a-2.4).
- Audit: separate auditor agent runs rubric audit before promotion.
- Weekly routine: Eli removed the scheduled task.
- Unit 2 quiz: 20 five-choice items, submit-then-reveal.

## Source status
| Source org | Pages | Status |
|---|---|---|
| Modern States | Transcripts 2.1a, 2.1b, 2.1c, 2.2a, 2.2b, 2.2c, 2.3, 2.4; Module 2 slides (109 pp, Principles_of_Microeconomics_2S_All.pdf); course overview page | Provided, read in full. Course Content Mapping PDF (assigned reading pages) NOT provided -> readings assumed OS ch 3, 4.1, 5, 20.1 |
| OpenStax Principles of Microeconomics 2016 (course textbook) | Ch 3 (3.1-3.5), Ch 4 §4.1 (min wage, nonbinding floor), Ch 5 (5.1-5.4), Ch 20 §20.1 (import quotas) | Provided, read (ch3 & ch5 in full; 4.1 & 20.1 excerpts) |
| College Board | CLEP exam page outline (opened), CLEP fact sheet PDF (opened, sample Q2 oranges/apples), AP Micro CED (opened via fetch summary: topics 2.3-2.9) | Opened |
| Econlib | Price Controls (Hugh Rockoff, Enc) opened; Rent Control (Walter Block, Enc) opened; Topics College pricecontrols opened; Demand (David R. Henderson, Enc) opened; Topics HighSchool Elasticity of Demand opened; EconLog "Deadweight Loss Computations" (Henderson 2021) opened | Opened |
| Marginal Revolution University | "Who Pays the Tax?", "Commodity Taxes", "Elasticity of Demand" lesson pages | Partially available: descriptions only, no transcripts |
| Khan Academy | elasticity article | Unavailable (page renders by script; fetch returned no body) |

## Source problems found (record; do not repeat as fact)
1. MS 2.1b orange example: says supply decrease -> new eq $4 and 25; demand decrease -> $2 and 25. Inconsistent with the course's own schedule (at $4 Qd=20; at $2 Qs=20). Slide for combined shift shows C at $3 and 10, which matches shifts of 20 units -> single shifts give $4/20 and $2/20. Lesson uses 20 and notes the difference. Affects L7.
2. MS 2.2b bread: PED reported -0.216; correct midpoint value is -0.212 (0.0202/0.0952). Salmon: reported -4.86 from rounded steps; unrounded = -4.85. Lesson shows unrounded and notes course rounding. Affects L9.
3. MS 2.2c pretzels: denominator stated 0.287 (positive); correct is -0.286 (price fell). Result -0.636 correct. Affects L10.
4. MS 2.3 + slide 112: "equilibrium maximizes both consumer and producer surplus." Incorrect: equilibrium maximizes TOTAL surplus (OS §3.5: "Social surplus is larger at equilibrium quantity and price than it would be at any other quantity"; AP CED MKT-4.A.5). A ceiling can raise CS; a floor can raise PS (OS §3.5). Slide 114 itself says "maximized total surplus". Affects L11.
5. MS slide 105: water price falls to $1.50, WTP $2 -> slide says CS $1; video says $0.50 (correct). Slide 104 has stray "$70 per day / $100 / $85" text from another example. Affects L11.
6. MS 2.4: "it doesn't matter who pays the tax ... The tax will be equally levied on both of them so they will both share the burden of the tax even if one is paying or the other is paying." The sock example then assumes a 50/50 split. First half right (statutory payer doesn't matter); an equal split holds only with equal elasticities (the video itself says so later; OS §5.3). Lesson quotes the transcript exactly and flags it. Affects L12.
7. MS 2.1c: "the supply of house cleaners increases ... the demand for house cleaners is going to be lower" — a floor causes movements along curves (quantity supplied rises, quantity demanded falls), not shifts (OS §3.4 "Do price ceilings and floors change demand or supply?"). Affects L8.
8. MS 2.2a: nuclear power given as inelastic supply because "not a lot of substitutes in terms of how it can be used" — substitutes are a demand-side idea; supply is inelastic because plants take years to build/expand capacity (OS §5.3 long run vs short run; AP CED MKT-3.E.8). Affects L9.
9. MS 2.2c: calls income elasticity > 1 "an elastic good" and |cross-price| > 1 "elastic". Nonstandard; OS §5.4 uses sign for normal/inferior and substitutes/complements. Present sign as the tested idea; mention >1 = income elastic (luxury-like) only as course wording. Affects L10.
10. MS 2.1b frost treated as "decrease in the number of sellers"; OS calls weather a natural condition. The lessons describe the frost simply as a supply decrease (weather) and do not repeat the "number of sellers" label; the direction is the same either way. Affects L6/L7.
11. MS 2.1c "We tend to decide as economists that government intervention is not the best way forward" — normative framing; slide 75 adds "Policies are put in place many times due to the social benefits outweighing the economic costs." Lesson presents positive effects plus OS's trade-off framing.
12. MS slide 122 labels seller price "Pb = $4.50" (typo for Ps).
13. MS lists 4 supply shifters; OS adds natural conditions and government policies (taxes, regulations, subsidies). Lesson teaches course's 4 + OS's extras, labeled.
14. MS overview titles 2.2b "Elasticity of Supply", 2.2c "Elasticity and Total Revenue" differ from the video content (2.2b = PED calc + TR + PES; 2.2c = income and cross-price). Lessons follow the videos.
15. OS 2016 §3.1 typo "from 500 gallons to 720 gallons" (millions). Not quoted.

## CLEP outline (Supply and demand 15-20%)
Market equilibrium; Determinants of supply and demand; Price and quantity controls; Elasticity (price, income, cross-price of demand; PED and total revenue; price elasticity of supply); Consumer surplus, producer surplus, and market efficiency; Tax incidence and deadweight loss.

## Verified links (OpenStax 3e for links only; quotes from 2016 ed.)
3-1 .../principles-microeconomics-3e/pages/3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services
3-2 .../3-2-shifts-in-demand-and-supply-for-goods-and-services ; 3-3 .../3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process
3-4 .../3-4-price-ceilings-and-price-floors ; 3-5 .../3-5-demand-supply-and-efficiency ; 4-1 .../4-1-demand-and-supply-at-work-in-labor-markets
5-1 .../5-1-price-elasticity-of-demand-and-price-elasticity-of-supply ; 5-2 .../5-2-polar-cases-of-elasticity-and-constant-elasticity
5-3 .../5-3-elasticity-and-pricing ; 5-4 .../5-4-elasticity-in-areas-other-than-price ; 20-1 .../20-1-protectionism-an-indirect-subsidy-from-consumers-to-producers
Econlib: Enc/PriceControls.html (Rockoff), Enc/RentControl.html (Block), Topics/College/pricecontrols.html, Enc/Demand.html (Henderson), Topics/HighSchool/ElasticityofDemand.html, deadweight-loss-computations/ (Henderson 2021), Topics/College/supplyanddemand.html (Kling excerpts)
MRU (descriptions only): learn.mru.org/lessons/tax-burden-elasticity-affordable-care-act-health-insurance-mandate ("Who Pays the Tax?"), /taxes-subsidies-definition-tax-wedge ("Commodity Taxes"), /elasticity-demand-definition, mru.org/courses/principles-economics-microeconomics/price-ceiling-shortages-reduce-quality, learn.mru.org/lessons/consumer-surplus
CB: clep.collegeboard.org/exam/microeconomics ; fact sheet PDF ; AP CED apcentral.collegeboard.org/media/pdf/ap-microeconomics-course-and-exam-description.pdf

## Lesson map (Modern States order; global lesson numbers continue Unit 1)
l6  Lesson 6  Demand and Supply ............ MS 2.1a · OS 3.1, 3.2 · CLEP: Determinants of supply and demand
l7  Lesson 7  Market Equilibrium ............ MS 2.1b · OS 3.1, 3.3 · CLEP: Market equilibrium
l8  Lesson 8  Price and Quantity Controls .... MS 2.1c · OS 3.4, 4.1, 20.1 · CLEP: Price and quantity controls
l9  Lesson 9  Price Elasticity of Demand and Supply ... MS 2.2a, 2.2b · OS 5.1-5.3 · CLEP: Elasticity (PED, TR, PES)
l10 Lesson 10 Income and Cross-Price Elasticity ...... MS 2.2c · OS 5.4 · CLEP: Elasticity (income, cross-price)
l11 Lesson 11 Consumer and Producer Surplus .......... MS 2.3 · OS 3.5 · CLEP: Consumer surplus, producer surplus, and market efficiency
l12 Lesson 12 Taxes, Incidence and Deadweight Loss ... MS 2.4 · OS 5.3, 3.5 · CLEP: Tax incidence and deadweight loss (+ DWL of price controls/quotas)

## Coverage map (CLEP subtopic -> lesson sections; filled as built)
Market equilibrium -> l7 (equilibrium; surplus/shortage; single shifts; double shifts)
Determinants of supply and demand -> l6 (demand shifters; supply shifters; movement vs shift)
Price and quantity controls -> l8 (ceilings, floors, binding; quotas) + l12 (DWL of controls)
Elasticity: price/income/cross of demand -> l9 (PED), l10 (income, cross)
Elasticity: PED and total revenue -> l9
Elasticity: PES -> l9
CS, PS, efficiency -> l11
Tax incidence and DWL -> l12

## Quiz blueprint (u2-*, 20 items, five-choice, separate pool)
Equilibrium 3 · Determinants 3 · Controls 3 · PED+determinants 2 · TR 2 · PES 1 · Income 1 · Cross 1 · Surplus/efficiency 2 · Tax incidence 1 · DWL 1  = 20

## ID scheme
Questions l6-*, quick checks l6c-*, quiz u2-*, cards c-l6-N, writing w-l6-N, widgets W.<name>. Unit 2 quiz results in S.quiz2 (separate from S.quiz). Quiz draft in localStorage 'micro-quiz2-draft' (per-device convenience).


## Audit (2026-10-22, separate auditor agent, rubric rev 16)
Verdicts before fixes: L6 100; L7 fail (l7-equal key not guaranteed) → 100 after fix; L8 92.5; L9 100; L10 100; L11 100; L12 87.5; quiz pass with fixes.
Fixed: l7-equal stem (equal vertical shifts); L12 misquote of video 2.4, L12 section order now follows the video (order note in src comment), quick check added to "Why tax at all?" (l12c-why);
L8 Rockoff quotes corrected to the page's wording; salmon and Magic Hat shown with unrounded operands; quiz items q2-det-3, q2-ped-2, q2-tr-1 replaced with new scenarios;
order.js ties broken alphabetically; quiz hints use a stricter 'quizhint' tutor rule (no answer even in follow-ups); CLEP coverage map on the Unit 2 home card;
all flashcards have a watch-out line; supply vs. quantity supplied card added (glossary terms covered in card text); unused sources removed from L6/L11/L12 source lines;
silently corrected quotes marked or paraphrased; l9-g-pct shows 3 decimals; new glossary terms (market-clearing price, perfectly elastic/inelastic, welfare economics, efficiency) and tappable "decentralized";
public-good definition now standard (non-rival, non-excludable); em dashes removed from learner text (widget uses "no sale"); L10 Go deeper beer claim relabeled as a made-up illustration.
Not changed (match Lesson 4's accepted pattern): single mistake id on many MC tags; no "what to notice" line after sorter widgets.
Could not verify: OS §20.1 and AP CED quotes (not in provided files), MRU (description pages only).
