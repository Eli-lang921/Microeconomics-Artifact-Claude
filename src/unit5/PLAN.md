# Unit 5 build plan (Firm Behavior and Market Structure) — working spec

Base page: staging artifact JmD52HyAjdCYJfgXoCdD6G version 1793203522-a524 (`work/staging_base.html`, md5 e7cb528e…).
Build: `python3 src/unit5/build.py BASE OUT` patches the Units 3-4 page (every patch must match exactly once). Staging title becomes "Units 3-5 Staging". `--live` drops the staging title/brand.
IDs: lessons l20-l28 (global Lessons 20-28); questions l2N-*; quick checks l2Nc-*; quiz q5-*; cards c-l2N-k; writing w-l2N-1/2;
containers U5_LESSONS, U5_CARDS, U5_WRITE, U5_PLAN, FIG5; tags U5CLEP/u5tag; quiz state S.quiz5; draft localStorage `micro-quiz5-draft`.
Decisions reused (settled earlier, not re-asked): 12 core + 16 more per lesson; T/F items test a Common-mistakes belief; numeric explanations name the typical wrong answer;
five-choice quiz, submit-then-reveal, separate pool; ≥6 instructional visuals per lesson; every CLEP outline topic taught in core; separate auditor before promotion; numbers listed smallest to largest.
Rubric rule used for quiz size: "at least 2 questions per outline subtopic" → 20 subtopics → 40 items.

## CLEP outline: D. Firm behavior and market structure (23–33%) — fact sheet wording
1 Profit: a accounting vs economic profits; b normal profit; c profit maximization MR=MC rule
2 Characteristics of different market structures
3 Perfect competition: a profit maximization; b short-run supply and shut-down decision; c firm and market behaviors in SR and LR equilibria; d efficiency and perfect competition
4 Monopoly: a sources of market power; b profit maximization; c inefficiency of monopoly; d price discrimination; e natural monopoly
5 Oligopoly: a interdependence, collusion, cartels; b game theory and strategic behavior with payoff matrix; c dominant strategies and Nash equilibrium
6 Monopolistic competition: a product differentiation and role of advertising; b profit maximization; c SR and LR equilibrium; d excess capacity and inefficiency

## Lesson map (Modern States order)
| id | title | MS | textbook | CLEP |
| l20 | Economic Profit: Explicit and Implicit Costs | 5.1 first part, slides 180-186 | §7.1; §10.1 zero economic profit; §11.3 normal rate of profit | 1a, 1b |
| l21 | Profit Maximization: The MR = MC Rule | 5.1 second part, slides 187-192 | §8.2 (raspberry farm TR/TC, MR/MC); §9.2 (HealthPill marginal profit) | 1c |
| l22 | Perfect Competition: Price Takers | 5.2 first part, slides 193-200 | ch.7 intro (spectrum); §8.1; §8.2 | 2; 3a |
| l23 | Perfect Competition: Shutdown, Exit and Supply | 5.2 middle, slides 201-205 | §8.2 (yoga center, shutdown point, MC = supply); §8.3 | 3b; 3c |
| l24 | Perfect Competition: Long-Run Equilibrium and Efficiency | 5.2 last part, slides 206-210 | §8.2 (profit areas); §8.3; §8.4 | 3c; 3d |
| l25 | Monopoly: Market Power and the Profit-Maximizing Price | 5.3 first part, slides 211-220 | §9.1; §9.2 | 4a; 4b; (4e source) |
| l26 | Monopoly: Inefficiency, Price Discrimination and Natural Monopoly | 5.3 last part, slides 221-224 | §9.2 inefficiency; §11.1 (price discrimination definition); §9.1/§11.3 natural monopoly | 4c; 4d; 4e |
| l27 | Oligopoly and Game Theory | 5.4, slides 225-234 | §10.2 | 5a-5c |
| l28 | Monopolistic Competition | 5.5, slides 235-246 | §10.1; §10.2 tradeoffs | 6a-6d; 2 (wrap-up table) |

Inserted prerequisite/supporting material (not in MS videos): four-structures spectrum at the start of l22 (textbook ch.7 intro Fig 7.2; CLEP topic 2);
price discrimination in l26 (CLEP 4d; MS never teaches it); best-response method for Nash equilibrium without a dominant strategy (l27);
excess capacity and productive/allocative efficiency (l28; MS slide 246 names excess capacity; textbook §10.1); constant-cost long-run supply (l24; textbook §8.3).
Optional (Go deeper only): N/(N+1) oligopoly formula (MS 5.4, corrected), product-variety and business-stealing externalities (MS slide 245), increasing/decreasing-cost industries, kinked demand curve, cost-plus vs price-cap regulation.

## Core data (all checked by script)
- Caroline (MS 5.1): A explicit 300,000, implicit 15,000, economic 315,000, accounting cost 300,000. B explicit 200,000+100,000+10,000=310,000, implicit 5,000, economic 315,000, accounting 310,000.
- Fred (OS §7.1): revenue 200,000; explicit 85,000 (office 50,000 + clerk 35,000); accounting profit 115,000; implicit 125,000 salary; economic −10,000.
- OS §7.1 self-check: revenue 1,000,000; labor 600,000, capital 150,000, materials 200,000 → accounting 50,000; land rent forgone 30,000 → economic 20,000.
- Raspberry farm (OS Tables 8.1, 8.3, 8.6): Q 0..100 by 10; TC 62,90,110,126,144,166,192,224,264,324,404; FC 62. MC per pack 2.80,2.00,1.60,1.80,2.20,2.60,3.20,4.00,6.00,8.00.
  ATC 9.00,5.50,4.20,3.60,3.32,3.20,3.20,3.30,3.60,4.04; AVC 2.80,2.40,2.13,2.05,2.08,2.17,2.31,2.52,2.91,3.42. Min AVC 2.05 (shutdown); MC = ATC 3.20 at 70 (zero-profit point).
  P $4: profit 56 at 70 and 80 (MR=MC on 70→80). P $5: Q 80, profit 136 (=(5−3.30)×80). P $2.20: Q 50, loss 56 (=(2.20−3.32)×50) < FC 62 → stay open. P $1.80: Q 40 TR 72 TC 144 loss 72 > 62 → shut down.
  Textbook slips: Fig 8.5(a) text mixes 80/90 packs, $3.50 vs table $3.60, profit $135; Fig 8.5(c) "($1.75 − $3.30) × 50"; §8.2 Work it Out says price $30 but tables use $28; Table 8.11 AVC 16.40/ATC 20.40/MC 30 vs Table 8.8 16.00/20.00/28.
- HealthPill (OS Tables 9.2-9.4): Q 1..8; P 1200..500; TC 1500,1800,2200,2800,3500,4200,5600,7400; MR 1200,1000,800,600,400,200,0,−200; MC 1500,300,400,600,700,700,1400,1800; profit −300,400,800,800,500,0,−1400,−3400; MR=MC at 4 (P 900, AC 700, profit 800).
- Ping pong (MS 5.2 slides 196-199): Q 0..9; TC 1.50,2.00,3.00,4.50,6.50,9.50,12.75,16.25,20.00,24.00; MC .50,1.00,1.50,2.00,3.00,3.25,3.50,3.75,4.00.
  P $3: profit −1.50,1,3,4.50,5.50,5.50,5.25,4.75,4,3 (MR=MC at 5; tie 4/5). P $4: … 12.00 at 8 and 9 (MR=MC at 9).
- De Beers (MS 5.3 slides 214-218): P 2000..1000 by 200; Q 0..500 by 100; TC 25k,100k,190k,290k,400k,525k; MR 1800,1400,1000,600,200; MC 750,900,1000,1100,1250; profit −25k,80k,130k,130k,80k,−25k; MR=MC at 300 (P 1400, ATC 966.67 (course 966), profit 130,000).
- Natural monopoly (OS Table 11.3): A Q4 P9.3 AC7.75; split B: each Q2 AC9.75; C P=MC Q8 P3.5 AC5.7 (loss); F P=AC Q6 P6.5.
- Jack & Jill (MS 5.4, slides 228-233): P = 120 − Q, MC 0. Cooperate 30+30: P60, 1800 each; one cheats 40+30: P50, 2000/1500; both 40: P40, 1600 each. Monopoly Q60 P60 profit 3600. Competitive outcome P = MC = 0, Q = 120 (course says 90 at $30: error; 90 at $30 is the 3-firm N/(N+1) outcome). 2/3 × 120 = 80 = both-cheat.
- Authentic Chinese Pizza (OS Table 10.1): Q 10..80; P 23,20,18,16,14,12,10,8; TC 340,400,480,580,700,840,1020,1280; MR 17,14,10,6,2,−2,−6; MC 6,8,10,12,14,18,26; AC 34,20,16,14.50,14,14,14.57,16; MR=MC at 40 (P16, AC 14.50, profit 60; tie with 30).
- Made-up L26 monopoly model: D P = 12 − Q, MC = 4 constant. Monopoly Q4 P8 profit 16 CS 8; efficient Q8 P4 CS 32; DWL 8. Perfect PD: Q8, CS 0, profit 32, DWL 0. Widget generalizes to MC c: Qm=(12−c)/2, DWL=(12−c)²/8.
- Made-up L26 movie theater (MC $2): adults 12→100, 10→110, 8→120, 6→130; students 12→10, 10→30, 8→60, 6→100. Single price best $10 profit 1120; two prices adults $12 (1000) + students $6 (400) = 1400.
- Made-up L24 market: firm TC = 100 + 0.25q² (MC 0.5q, ATC min $10 at q 20); market supply Q = n·2P; D1 Q = 2000 − 100P, D2 Q = 2400 − 100P.
  n 50, D1: P 10, Q 1000, q 20, profit 0. D2: P 12, Q 1200, q 24, ATC 10.17, profit 44. n 60: P 10.91. n 70: P 10, Q 1400 (constant cost).
- Made-up L28 monopolistic competitor: TC = 16 + q + 0.25q² (MC 1 + 0.5q; ATC min 5 at q 8); demand P = a − 0.75q (MR a − 1.5q). a 9: q 4, P 6 = ATC, MC 3 (long run); a 12: q 5.5, P 7.875, profit 14.25; a 8: loss.

## Source problems to record (do not repeat as fact)
1 MS 5.2: "subtract total revenue from total cost" for profit (reversed); slides compute TR − TC correctly.
2 MS 5.2 "total cost ... is the sum of costs and variable costs" (fixed).
3 MS slide 201: "AVC = VC X Q" → AVC = VC ÷ Q.
4 MS 5.2/slides 204-205: firm's long-run supply = MC above ATC — firm-level; the textbook's market long-run supply is flat for a constant-cost industry. Both taught, labeled.
5 MS 5.3: "the firm is making a profit because it is charging more than the point where MR = MC" → profit exists because P > ATC; P > MC is why it is inefficient.
6 MS slide 218: ATC 966 (= 966.67); profit 130,000 correct.
7 MS 5.3/5.1/5.2 tables: profit ties at the MR = MC step (DeBeers 200/300, ping pong 4/5 and 8/9); course names the larger quantity. Lessons explain ties; questions avoid offering the tied quantity.
8 MS 5.4: "in a monopoly market structure ... few firms" (means oligopoly); "cheat so to reach the monopoly outcome" (cheating moves away from it).
9 MS 5.4 / slide 232: competitive outcome "90 units at $30 ... where marginal revenue equals marginal cost" → competitive outcome is P = MC = 0, Q = 120; MR = MC (=0) at Q 60 is the monopoly outcome.
10 MS 5.4 and slide 226: oligopolists sell "an identical good" → textbook: "identical or similar products".
11 MS 5.5: entry causes "a shift in the supply curve" and later "both the demand curve shifts in": the market view (more sellers) vs each firm's view (its demand shifts left). Lessons show both.
12 MS 5.5 / slide 235: in the long run the firm "act[s] as a firm in perfect competition" → only zero profit is shared; P > MC and output is below the minimum-ATC quantity (excess capacity).
13 MS slide 246: "Advertising only works when there are similar but differentiated products – only in M.C. markets" → textbook: oligopolies (Coke, Pepsi) also advertise heavily; advertising can be a barrier to entry (§9.1, §10.2).
14 OS §8.2 slips listed above (Fig 8.5 text; $30 vs $28; Table 8.11).
15 OS Fig 9.6 caption: TR box "marginal revenue on the vertical axis", TC box "marginal cost" → price and average cost.

## Source status (fill on build): see build notes.
