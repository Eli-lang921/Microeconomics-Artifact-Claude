/* ===== Unit 5 quiz pool (separate from lesson questions; five choices only; submit-then-reveal) =====
   Blueprint: 2 items for each of the 20 CLEP outline subtopics in "Firm behavior and market structure" (40 items):
   accounting vs economic profit 2 · normal profit 2 · MR = MC 2 · market structures 2 · PC profit max 2 · PC short-run supply and shutdown 2 · PC short- and long-run equilibria 2 · PC efficiency 2 ·
   monopoly market power 2 · monopoly profit max 2 · monopoly inefficiency 2 · price discrimination 2 · natural monopoly 2 · oligopoly collusion and cartels 2 · game theory and payoff matrix 2 ·
   dominant strategies and Nash equilibrium 2 · product differentiation and advertising 2 · MC profit max 2 · MC short- and long-run equilibrium 2 · excess capacity and inefficiency 2.
   Every item is a new scenario or question shape (not copied from lesson practice), with distractors built from the lesson's Common mistakes (codes refer to Q[id].lesson's box).
   Answers, correctness and explanations appear only after the whole quiz is submitted (quiz5 renderer). Numbers checked by script 2026-10-28. */
const QUIZ5 = [];
function qz5(id, lesson, prompt, options, answer, explain, keepOrder){ Q[id] = { lesson, type:'mc', kind:'mc', prompt, options, answer, explain, quiz:true, unitQuiz:5, keepOrder:!!keepOrder }; QUIZ5.push(id); }

/* --- Profit: accounting vs economic (Lesson 20) --- */
qz5('q5-acc-1','l20','Made-up numbers. A dentist\'s practice brings in $400,000 a year. She pays $250,000 for staff, rent and supplies. She could instead earn $120,000 a year at a clinic, and the $100,000 of her savings tied up in the practice could earn $5,000 a year elsewhere. What are her accounting profit and economic profit?',
  [`Accounting profit $150,000; economic profit $25,000`,`Accounting profit $150,000; economic profit $150,000`,`Accounting profit $25,000; economic profit $150,000`,`Accounting profit $150,000; economic profit $30,000`,`Accounting profit $30,000; economic profit $25,000`],0,
  `<p>Accounting profit = revenue − explicit costs = $400,000 − $250,000 = <b>$150,000</b>. Economic profit also subtracts implicit costs: $150,000 − $120,000 (forgone salary) − $5,000 (forgone interest) = <b>$25,000</b>.</p><p>$150,000 for both treats implicit costs as unreal (M1, M2). $30,000 leaves out the forgone interest.</p>`);
qz5('q5-acc-2','l20','Which of the following is an implicit cost for a farmer who works her own farm?',
  [`The salary she gives up by not taking a job in town`,`The wages she pays her hired hands`,`The rent she pays for an extra field`,`The interest she pays on a bank loan for a tractor`,`The money she spends on seed and fuel`],0,
  `<p>An implicit cost is an opportunity cost with no payment: the value of the owner\'s own time or resources in their next best use. Her forgone salary is one.</p><p>Wages, rent, loan interest and seed are all paid out to someone, so they are explicit costs. Loan interest is explicit, which is why borrowing isn\'t automatically costlier than using your own savings (M1, M4).</p>`);

/* --- Profit: normal profit (Lesson 20) --- */
qz5('q5-norm-1','l20','A firm\'s economic profit is exactly zero. Which statement is true?',
  [`Its accounting profit just covers its implicit costs, so its owners earn as much as their next best alternative`,`Its owners earn nothing for their time and money`,`Its accounting profit is also zero`,`It should shut down, because it is not covering its costs`,`It is earning the average profit of its industry`],0,
  `<p>Zero economic profit is a <b>normal profit</b>: revenue covers explicit and implicit costs, so the owners do exactly as well as in their best alternative. Their accounting profit is positive (it equals the implicit costs).</p><p>"Earn nothing" (M3) and "the industry average" (M6) are the two common misreadings.</p>`);
qz5('q5-norm-2','l20','Made-up numbers. Luis\'s bike shop has an accounting profit of $60,000. Luis could earn $45,000 working for another shop, and the money he has invested could earn $15,000 elsewhere. Which describes his situation?',
  [`He earns a normal profit: his economic profit is zero, so staying is as good as his best alternative`,`He earns an economic profit of $60,000`,`He has an economic loss of $60,000`,`He earns an above-normal profit of $15,000`,`He should close, since $60,000 is too small a profit`],0,
  `<p>Economic profit = $60,000 − $45,000 − $15,000 = $0: a normal profit. He is as well off as in his next best option, so he has no reason to leave.</p><p>$60,000 ignores implicit costs (M2); "too small" assumes positive accounting profit decides it (M5).</p>`);

/* --- Profit: MR = MC (Lesson 21) --- */
qz5('q5-mrmc-1','l21',`Made-up numbers. A firm\'s marginal revenue and marginal cost for each unit:${atable(['Unit','MR','MC'],[['1st','$20','$8'],['2nd','$18','$9'],['3rd','$16','$12'],['4th','$14','$13'],['5th','$12','$16'],['6th','$10','$21']],{cls:'compact'})}How many units maximize profit?`,
  [`4`,`6`,`1`,`3`,`5`],0,
  `<p>Make each unit whose MR is at least its MC. The 4th adds $14 − $13 = $1; the 5th would add $12 − $16 = −$4. So stop at <b>4</b>.</p><p>6 sells the most (MR is still positive, so revenue is highest) but profit is lower (M1). 1 has the largest MR − MC, but stopping there leaves profit on the table (M3).</p>`);
qz5('q5-mrmc-2','l21',`Made-up numbers. A firm\'s daily total revenue and total cost:${atable(['Units','Total revenue','Total cost'],[['0','$0','$20'],['1','$30','$32'],['2','$56','$40'],['3','$78','$52'],['4','$96','$68'],['5','$110','$96']],{cls:'compact'})}How many units should it produce to maximize profit?`,
  [`1`,`2`,`3`,`4`,`5`],3,
  `<p>Work out each unit\'s marginal revenue and marginal cost from the changes. MR: $30, $26, $22, $18, $14. MC: $12, $8, $12, $16, $28. Units 1 to 4 each add more to revenue than to cost (the 4th: $18 against $16); the 5th adds $14 of revenue but $28 of cost. Produce <b>4</b>, where profit is $96 − $68 = $28, the highest in the table.</p><p>5 units gives the most revenue ($110) but profit falls to $14 (M1). 2 units is where the gap between MR and MC is widest ($26 − $8 = $18, tied with the 1st unit), but units 3 and 4 still add profit (M3).</p>`, true);

/* --- Characteristics of market structures (Lesson 22) --- */
qz5('q5-str-1','l22','What most clearly separates oligopoly from monopolistic competition?',
  [`Oligopoly has a few interdependent firms behind barriers to entry; monopolistic competition has many firms and free entry`,`Oligopolists sell differentiated products; monopolistic competitors sell identical ones`,`Only oligopolists face downward-sloping demand`,`Oligopolists are price takers`,`Monopolistic competitors are protected by patents`],0,
  `<p>The number of sellers and the ease of entry decide it. A few firms that must watch each other, with barriers, is oligopoly; many firms with free entry and differentiated products is monopolistic competition. Both can sell differentiated products, and both face downward-sloping demand.</p>`);
qz5('q5-str-2','l22','Made-up example. Thousands of farms sell identical eggs, anyone can start a farm, and each farm sells at the going price. Which describes the market and one farm\'s demand curve?',
  [`Perfect competition; each farm\'s demand is horizontal at the market price`,`Perfect competition; each farm faces the downward-sloping market demand curve`,`Monopolistic competition; each farm\'s demand slopes down`,`Oligopoly; each farm\'s demand depends on its rivals`,`Monopoly; the farms act as one seller`],0,
  `<p>Many sellers, an identical product and free entry make each farm a price taker: it can sell as much as it wants at the market price, so its demand is flat. The market demand curve slopes down, but no single farm faces it (M6). "Many firms" alone isn\'t enough; identical products and free entry matter too (M5).</p>`);

/* --- Perfect competition: profit maximization (Lesson 22) --- */
qz5('q5-pcmax-1','l22','Made-up numbers. A perfectly competitive firm can sell at the market price of $12. The marginal cost of its 1st to 5th units is $4, $6, $9, $11 and $15. How many units should it produce?',
  [`2`,`3`,`4`,`5`,`All five, since every unit sells for $12`],2,
  `<p>For a price taker MR = P = $12 on every unit. Units 1 to 4 cost less than $12, so each adds to profit; the 5th costs $15, more than it brings in. Produce <b>4</b>.</p><p>Selling every unit it could ignores rising MC. Its MR doesn\'t fall as it sells more (M3).</p>`, true);
qz5('q5-pcmax-2','l22',`Made-up numbers. A perfectly competitive firm\'s costs:${atable(['Units','Marginal cost','Average variable cost'],[['1','$9','$9.00'],['2','$6','$7.50'],['3','$7','$7.33'],['4','$10','$8.00'],['5','$14','$9.20'],['6','$19','$10.83']],{cls:'compact'})}How many units does it produce if the market price is $15, and how many if the price is $7?`,
  [`5 at $15; 0 at $7`,`5 at $15; 3 at $7`,`6 at $15; 2 at $7`,`4 at $15; 3 at $7`,`6 at $15; 0 at $7`],0,
  `<p>At $15 (MR = P for a price taker), the 4th unit ($10) and 5th ($14) cost less than $15 and the 6th ($19) costs more, so it makes <b>5</b>; $15 is above its AVC there ($9.20). At $7 the price is below the lowest average variable cost ($7.33), so it can\'t even cover its variable costs: it produces <b>0</b> in the short run.</p><p>"3 at $7" finds where price meets MC but forgets to check AVC. "6 at $15" sells every unit as if MR fell or price could change; the 6th unit costs more than it brings in (M3, M4).</p>`);
/* --- Perfect competition: short-run supply and shutdown (Lesson 23) --- */
qz5('q5-pcsr-1','l23','Made-up numbers. At its best output, a perfectly competitive firm has a price of $8, average total cost of $11 and average variable cost of $7. In the short run, it should',
  [`keep producing, because the price covers its variable cost and part of its fixed cost`,`shut down at once, because it is losing money`,`shut down, because the price is below average total cost`,`raise its price to $11`,`exit the industry today`],0,
  `<p>It loses money either way. Producing: P &gt; AVC, so each unit covers its variable cost and adds $1 toward fixed costs, making the loss smaller than its fixed cost. Shutting down would lose all of the fixed cost. Shut down only if P &lt; AVC.</p><p>"Losing money, so shut down" (M1) and "P &lt; ATC, so shut down" (M2) are the common mistakes. Exit is a long-run choice (M3).</p>`);
qz5('q5-pcsr-2','l23',`Made-up numbers. A perfectly competitive firm\'s marginal cost (MC), average variable cost (AVC) and average total cost (ATC). Points: A = lowest point of MC ($1.20), B = where MC crosses AVC ($2.40), C = ATC at 6 units ($6.67), D = where MC crosses ATC ($6).${sdg({ xmax:10.5, ymax:12, xt:[0,2,4,6,8,10], yt:[0,1.2,2.4,6,9,12], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Cost curves with points A at the bottom of MC, B at the bottom of AVC, C on ATC above B, and D at the bottom of ATC', lines:l23curves(), dots:[{q:4,p:1.2,label:'A',c:'var(--ink)',lx:-14,ly:-4},{q:6,p:2.4,label:'B',c:'var(--ink)',lx:0,ly:16},{q:6,p:L23C.atc(6),label:'C',c:'var(--ink)',lx:-12,ly:-6},{q:8,p:6,label:'D',c:'var(--ink)',lx:6,ly:16}] })}Below which price will the firm produce nothing in the short run?`,
  [`$2.40, at point B`,`$6, at point D`,`$1.20, at point A`,`$6.67, at point C`,`No price: it always produces because it must pay its fixed costs`],0,
  `<p>MC crosses AVC at AVC\'s lowest point, so B is the shutdown point: below $2.40 the firm can\'t cover its variable costs, so producing loses more than its fixed cost. Above $2.40 its supply follows MC upward.</p><p>Point D ($6) is the break-even point: below it the firm loses money but keeps producing while price covers AVC (M2). Point A treats the whole MC curve as supply (M5). Fixed costs are owed either way, so they don\'t decide whether to produce.</p>`);

/* --- Perfect competition: short- and long-run equilibria (Lesson 24) --- */
qz5('q5-pclr-1','l24','A constant-cost perfectly competitive industry is in long-run equilibrium. Then demand falls permanently. What happens?',
  [`The price falls and firms lose money; some exit until the price returns to its old level, with fewer firms`,`The price falls and stays lower for good`,`New firms enter, because buyers want lower prices`,`The price rises above its old level as firms exit`,`Nothing, because firms are price takers`],0,
  `<p>Short run: the price drops below ATC, so firms make losses. Long run: some firms exit, market supply shifts left and the price rises until it is back at minimum ATC. In a constant-cost industry that is the original price; the market is smaller and has fewer firms.</p><p>"Price stays lower" ignores exit (M4). Exit stops once losses are gone, so the price doesn\'t overshoot.</p>`);
qz5('q5-pclr-2','l24','Made-up numbers. A perfectly competitive firm sells 50 units at a price of $20. Its average total cost at 50 units is $16. What is its profit, and what happens in the long run?',
  [`$200; new firms enter and the price falls`,`$200; new firms enter and the price rises`,`$1,000; firms exit and the price rises`,`$200; firms exit and the price rises`,`$800; nothing changes`],0,
  `<p>Profit = (P − ATC) × Q = ($20 − $16) × 50 = <b>$200</b>. An economic profit attracts entry; market supply shifts right and the price falls until profit is zero.</p><p>$1,000 is revenue. Entry lowers the price (M2).</p>`);

/* --- Perfect competition: efficiency (Lesson 24) --- */
qz5('q5-pceff-1','l24','A market produces the quantity at which the value buyers place on the last unit equals the cost of producing it. The market is',
  [`allocatively efficient`,`productively efficient`,`earning zero economic profit`,`a natural monopoly`,`in a prisoner\'s dilemma`],0,
  `<p>That is P = MC: <b>allocative</b> efficiency, producing the right amount. Productive efficiency means producing at the lowest possible average cost, a different condition (M5). Long-run perfect competition has both.</p>`);
qz5('q5-pceff-2','l24','Made-up numbers. In a market at its current output, buyers value the last unit at $9 and it costs $6 to make. What would raise society\'s total surplus?',
  [`Producing more, until the value of the last unit equals its cost`,`Producing less, because the price is too high`,`Nothing; the market is already efficient`,`Raising the price to $12`,`Lowering average total cost to $6`],0,
  `<p>P &gt; MC: one more unit adds $9 of value for $6 of cost, so total surplus rises by about $3. Keep going until P = MC. Producing less would make it worse.</p>`);

/* --- Monopoly: sources of market power (Lesson 25) --- */
qz5('q5-msrc-1','l25','Made-up example. A city gives one company the only license to run a ferry across its harbor. What kind of barrier to entry is this?',
  [`A government-created barrier`,`Control of a key resource`,`A natural monopoly from economies of scale`,`Predatory pricing`,`Product differentiation`],0,
  `<p>A law or license that bars other sellers creates a legal (government-created) monopoly, like a patent. Nothing about the ferry\'s costs or inputs keeps rivals out; the license does.</p>`);
qz5('q5-msrc-2','l25','Made-up example. A software firm makes 70% of all word-processing programs sold, but buyers can easily switch to several similar free programs. Is it a monopoly?',
  [`No: with close substitutes available, it has little power over its price`,`Yes: any firm with over half the market is a monopoly`,`Yes: it is the largest seller`,`No: monopolies must have 100% of sales and a patent`,`Yes: software always has economies of scale`],0,
  `<p>A monopoly sells a product with no close substitutes. Your course textbook\'s DuPont cellophane case turned on the same question: a big share of a narrow market isn\'t monopoly power if buyers have similar options (M6).</p>`);

/* --- Monopoly: profit maximization (Lesson 25) --- */
qz5('q5-mmax-1','l25',`Made-up numbers. A monopoly\'s demand and costs:${atable(['Units','Price','Total cost'],[['1','$90','$60'],['2','$80','$85'],['3','$70','$115'],['4','$60','$150'],['5','$50','$195'],['6','$40','$250']],{cls:'compact'})}Fixed cost is $40. What output and price maximize its profit?`,
  [`3 units at $70`,`5 units at $50`,`3 units at $30`,`4 units at $60`,`6 units at $40`],0,
  `<p>Total revenue is 90, 160, 210, 240, 250, 240, so MR is $90, $70, $50, $30, $10, −$10. MC (from total cost, starting at $40) is $20, $25, $30, $35, $45, $55. The 3rd unit adds $50 against $30; the 4th adds $30 against $35, so stop at <b>3 units</b> and charge what buyers will pay for 3: <b>$70</b>. Profit $210 − $115 = $95, the highest in the table.</p><p>5 units at $50 keeps producing while price covers MC, treating the monopoly\'s MR as if it were the price (M3); it is also where revenue is highest. "$30" reads the price off MC instead of the demand row (M2).</p>`);
qz5('q5-mmax-2','l25','Made-up numbers. A monopoly maximizes its profit by selling 6 units a day at $14, earning $30 a day. Its landlord then raises the rent by $10 a day. The rent is a fixed cost: it is owed whatever the monopoly produces. What should the monopoly do?',
  [`Keep selling 6 units at $14; its profit falls to $20 a day`,`Raise its price enough to pass the $10 on to buyers`,`Sell fewer units, since its costs have risen`,`Shut down, since its profit has fallen`,`Sell more units to spread the rent over more output`],0,
  `<p>The rent changes neither marginal revenue nor marginal cost: no unit costs more to make, and demand is the same. So MR still equals MC at 6 units, and buyers still pay $14 for 6. The best choice doesn\'t move; profit simply falls by the $10, to $20.</p><p>Raising the price moves it off MR = MC and lowers profit further: demand, not cost, limits what it can charge (M1). Cutting or adding output for the same reason moves it away from MR = MC. It still earns $20, so shutting down would be worse.</p>`);
/* --- Monopoly: inefficiency (Lesson 26) --- */
qz5('q5-mineff-1','l26','Made-up numbers. A monopoly faces demand P = 28 − 2Q (so MR = 28 − 4Q) and constant marginal cost of $8, with no fixed cost. Compared with the efficient output, buyers lose $75 of consumer surplus under the monopoly. How much of that $75 becomes the monopoly\'s profit, and how much is lost to everyone (deadweight loss)?',
  [`$50 becomes profit; $25 is deadweight loss`,`$25 becomes profit; $50 is deadweight loss`,`All $75 becomes profit; nothing is lost`,`None becomes profit; all $75 is lost`,`$37.50 becomes profit; $37.50 is deadweight loss`],0,
  `<p>Monopoly: 28 − 4Q = 8, so Q = 5 and P = $18. Efficient: 28 − 2Q = 8, so Q = 10 and P = $8. Consumer surplus falls from ½ × 10 × $20 = $100 to ½ × 5 × $10 = $25, a $75 loss. Of that, ($18 − $8) × 5 = <b>$50</b> moves to the firm as profit, and ½ × (10 − 5) × ($18 − $8) = <b>$25</b> is deadweight loss: surplus on units 6 to 10 that nobody gets.</p><p>"All $75 becomes profit" treats the monopoly\'s only harm as a transfer (M1). The $25/$50 swap mixes up the profit rectangle and the deadweight-loss triangle (M3).</p>`);
qz5('q5-mineff-2','l26','What do economists mainly object to about a single-price monopoly?',
  [`It produces too little: units worth more to buyers than they cost to make go unproduced`,`Its profits are high`,`It produces too much`,`It sets price equal to marginal cost`,`It charges different buyers different prices`],0,
  `<p>Your course textbook: "what economists object to is that monopolies do not supply enough output to be allocatively efficient." P &gt; MC at the monopoly\'s output, so there is a deadweight loss. High profit is mainly a transfer from buyers (M1, M3).</p>`);

/* --- Monopoly: price discrimination (Lesson 26) --- */
qz5('q5-pd-1','l26',`Made-up numbers. An airline's cost is $50 per passenger, with no other costs on this route. How many seats each group buys at each fare:${atable(['Fare','Business travelers','Leisure travelers'],[['$400','60','10'],['$200','70','80']],{cls:'compact'})}Business travelers can't use leisure fares (those require a Saturday-night stay). How much more profit does the airline make by charging business travelers $400 and leisure travelers $200 than by charging everyone its best single fare?`,
  [`$8,500`,`$0`,`$2,000`,`$10,500`,`$33,000`],0,
  `<p>Best single fare: at $400, 70 seats × ($400 − $50) = $24,500; at $200, 150 seats × $150 = $22,500. So $400 is best. Separate fares: business 60 × $350 = $21,000, plus leisure 80 × $150 = $12,000, total $33,000. Gain: $33,000 − $24,500 = <b>$8,500</b>. The low fare goes to the price-sensitive group (leisure seats jump from 10 to 80 when the fare drops), and the Saturday-night rule stops resale.</p><p>$2,000 compares the two single fares. $10,500 compares against the worse single fare. $33,000 is total profit, not the gain. Every seat costs the same $50, so this is not a cost-based price difference (M4).</p>`);
qz5('q5-pd-2','l26','Made-up numbers. A monopoly faces demand P = 20 − Q and constant marginal cost of $4. It becomes able to charge every buyer the most that buyer will pay. What are its output and consumer surplus?',
  [`16 units; consumer surplus $0`,`8 units; consumer surplus $32`,`16 units; consumer surplus $128`,`8 units; consumer surplus $0`,`12 units; consumer surplus $0`],0,
  `<p>A perfectly discriminating monopoly sells to every buyer who values the good at least at MC, down to where demand meets MC: 16 units. Each buyer pays their maximum, so consumer surplus is $0, and the whole $128 of surplus becomes profit. There is no deadweight loss (M5).</p>`);

/* --- Monopoly: natural monopoly (Lesson 26) --- */
qz5('q5-nat-1','l26','Made-up numbers. Regulators order a natural monopoly to charge a price equal to marginal cost. At that price it sells 1,000 units a month, its marginal cost is $3 and its average cost is $5. How big a monthly subsidy would it need to stay in business?',
  [`$2,000`,`$0`,`$3,000`,`$5,000`,`$8,000`],0,
  `<p>Revenue = $3 × 1,000 = $3,000; total cost = $5 × 1,000 = $5,000. The gap, ($5 − $3) × 1,000 = <b>$2,000</b>, must come from a subsidy. In a natural monopoly average cost is still falling where demand meets MC, so MC is below AC and P = MC can\'t cover costs. That is why regulators often set P = AC instead (M6).</p><p>$3,000 is its revenue and $5,000 its total cost. $0 assumes P = MC always covers costs.</p>`);
qz5('q5-nat-2','l26','Which business is most likely a natural monopoly?',
  [`The company that lays and runs the gas pipes into every home in a city`,`A coffee shop on a busy corner`,`One of thousands of wheat farms`,`A clothing brand with a famous logo`,`One of two airlines on a route`],0,
  `<p>Huge fixed costs (the pipe network) and a low cost of serving one more home mean one firm can serve the whole city more cheaply than two. A second network would be "costly and duplicative" (your course textbook).</p>`);

/* --- Oligopoly: interdependence, collusion, cartels (Lesson 27) --- */
qz5('q5-ocol-1','l27','Which of the following makes a cartel more likely to hold together?',
  [`It has only a few members, who can easily see each other\'s output and prices`,`It has many small members`,`Each member can secretly expand its output`,`Members have very different costs and want different prices`,`Each member earns more by cheating than by keeping its quota`],0,
  `<p>Every member is tempted to cheat, so a cartel lasts only if few members need to agree and cheating is easy to spot. Econlib\'s Dick: cartels are less likely to form and last where "numerous small sellers currently are producing," and a cartel needs "a system to detect and punish cheating." The St. Louis Fed adds that when members\' costs differ, the profit "won\'t be evenly split," and weaker members have broken rank.</p><p>"Each member earns more by cheating" is the reason cartels break apart, not a reason they last (M3).</p>`);
qz5('q5-ocol-2','l27','Made-up numbers. Three firms share a market with demand P = 120 − Q and zero marginal cost. They agree to produce 20 units each (60 in total, the monopoly output), so the price is $60. One firm cheats and produces 30 while the other two keep to 20. What are the profits?',
  [`Cheater $1,500; each of the others $1,000`,`$1,200 each`,`Cheater $1,800; each of the others $1,200`,`$1,000 each`,`Cheater $1,000; each of the others $1,500`],0,
  `<p>Market quantity = 30 + 20 + 20 = 70, so the price falls to $50. Cheater: 30 × $50 = <b>$1,500</b> (up from $1,200). Each of the others: 20 × $50 = <b>$1,000</b>. Total profit falls from $3,600 to $3,500. $1,800 and $1,200 use the old $60 price (M6).</p>`);
/* --- Oligopoly: game theory and payoff matrix (Lesson 27) --- */
qz5('q5-ogame-1','l27',`Made-up numbers (profits in thousands). Two firms each decide whether to launch a new product. Firm A\'s profit is listed first.${pmatrix({ rowName:'A', colName:'B', rows:['Launch','Don\'t'], cols:['Launch','Don\'t'], pay:[[[3,5],[9,2]],[[6,8],[4,6]]], fmtp:v=>'$'+v+'k' })}Which statement about dominant strategies is true?`,
  [`Only Firm B has a dominant strategy: launch`,`Both firms have a dominant strategy: launch`,`Only Firm A has one: launch, because $9k is its biggest payoff`,`Neither firm has a dominant strategy`,`Only Firm A has one: don\'t launch`],0,
  `<p>Firm B: if A launches, launching pays $5k against $2k; if A doesn\'t, $8k against $6k. Launch is best whatever A does: a dominant strategy. Firm A: if B launches, A does better not launching ($6k against $3k); if B doesn\'t, launching is better ($9k against $4k). A\'s best choice depends on B, so A has no dominant strategy. Expecting B to launch, A stays out ($6k, $8k).</p><p>A dominant strategy is the best reply to every choice the rival might make, not the choice with the single biggest payoff (M2). Not every player has one (M5).</p>`);

qz5('q5-ogame-2','l27','Two firms will face each other in the same market every week for years. Which strategy is most likely to keep both charging high prices?',
  [`Charge a high price as long as the rival did last week, and cut the price only if the rival cut last week`,`Always cut the price`,`Always charge a high price whatever the rival does`,`Change prices at random`,`Cut the price every other week`],0,
  `<p>This is tit for tat. Econlib\'s Dixit and Nalebuff: in repeated games "you cheat if and only if your rival cheated in the previous round," which makes cheating unprofitable as long as it can be detected. Always charging high invites the rival to cheat.</p>`);

/* --- Oligopoly: dominant strategies and Nash equilibrium (Lesson 27) --- */
qz5('q5-onash-1','l27',`Made-up numbers (profits in thousands). Firm X\'s profit is listed first.${pmatrix({ rowName:'X', colName:'Y', rows:['Expand','Hold'], cols:['Expand','Hold'], pay:[[[40,20],[60,30]],[[30,40],[50,35]]], fmtp:v=>'$'+v+'k' })}Which outcome is the Nash equilibrium?`,
  [`X expands, Y holds`,`Both expand`,`Both hold`,`X holds, Y expands`,`There is no Nash equilibrium`],0,
  `<p>X\'s dominant strategy is Expand ($40k &gt; $30k and $60k &gt; $50k). Y has none: it prefers Hold if X expands ($30k &gt; $20k) but Expand if X holds ($40k &gt; $35k). Given X expands, Y holds. At (Expand, Hold) neither gains by switching alone: X would get $50k, Y $20k.</p><p>Not every player has a dominant strategy (M5); "both expand" wrongly assumes Y copies X.</p>`);

qz5('q5-onash-2','l27','In some box of a payoff matrix, Firm A earns $70. If A switched its choice while Firm B kept its own, A would earn $90. Is that box a Nash equilibrium?',
  [`No, because A could do better by switching on its own`,`Yes, if it has the largest total payoff`,`Yes, if B is happy with its payoff`,`Yes, because $70 is a profit`,`It depends on whether A has a dominant strategy`],0,
  `<p>At a Nash equilibrium no player can gain by changing only its own choice. A would gain $20, so this box isn\'t one, whatever the totals or B\'s payoff (M1).</p>`);

/* --- Monopolistic competition: differentiation and advertising (Lesson 28) --- */
qz5('q5-mcdif-1','l28','A furniture store sets itself apart with free delivery and a 10-year guarantee. In your course textbook\'s terms, this is differentiation by',
  [`intangible aspects of the product`,`physical aspects of the product`,`location`,`perception created only by advertising`,`lower marginal cost`],0,
  `<p>The textbook lists four kinds: physical aspects, location, intangible aspects (such as guarantees, reputation and services like free delivery) and perceptions. Delivery and a guarantee are intangible: the furniture itself is unchanged.</p>`);
qz5('q5-mcdif-2','l28','A monopolistic competitor\'s ad campaign makes its customers more loyal, so fewer of them would switch if it raised its price. How does this change its demand curve?',
  [`It becomes steeper (less elastic), so the firm can raise its price without losing many customers`,`It becomes flat, like a price taker\'s`,`It becomes more elastic`,`It shifts left`,`It doesn\'t change; ads only affect costs`],0,
  `<p>Your course textbook: advertising can cause "a firm\'s perceived demand curve to become more inelastic (that is, ... steeper)" or shift it right. Either can let a firm sell more or charge more. Advertising isn\'t limited to monopolistic competition, though (M4).</p>`);

/* --- Monopolistic competition: profit maximization (Lesson 28) --- */
qz5('q5-mcmax-1','l28',`Made-up numbers. A monopolistically competitive firm\'s demand (D), marginal revenue (MR), marginal cost (MC) and average total cost (ATC):${sdg({ xmax:14.5, ymax:16, xt:[0,4,7,14], yt:[0,6,10,13], xlab:'Output', ylab:'Dollars per unit', aria:'Firm whose ATC curve lies above its demand curve; MR crosses MC at 4 units, where demand is 10 dollars and ATC is 13 dollars', lines:[ {pts:[[0,14],[14,0]], c:'var(--accent)', label:'D', lx:4, ly:-4}, {pts:[[0,14],[7,0]], c:'var(--muted)', label:'MR', lx:4, ly:-4, w:2}, {pts:[[0,2],[12,14]], c:'var(--g2)', label:'MC', lx:-4, ly:-4, anchor:'end', w:2}, {pts:Array.from({length:41},(_,i)=>3+i*0.25).map(q=>[q,36/q+2+0.5*q]), c:'var(--g1)', label:'ATC', lx:4, ly:4, w:2} ], vls:[{q:4,p:13}], dots:[{q:4,p:10,label:'',c:'var(--ink)'},{q:4,p:13,label:'',c:'var(--ink)'},{q:4,p:6,label:'',c:'var(--ink)'}] })}What is its total profit or loss at its profit-maximizing output?`,
  [`−$12 (a loss)`,`−$3 (a loss)`,`$0 (it breaks even)`,`$12`,`$16`],0,
  `<p>MR crosses MC at 4 units. Go up to demand: buyers pay $10. ATC at 4 units is $13. Profit = ($10 − $13) × 4 = <b>−$12</b>. The ATC curve lies above demand at every output, so this is the smallest loss available; in the long run some firms would leave.</p><p>−$3 is the loss per unit, not the total. $16 uses MC ($6) as the cost per unit instead of ATC. $0 assumes a monopolistic competitor always breaks even, which holds only in the long run (M1). $12 gets the size right but the sign wrong: price is below ATC, so it is a loss.</p>`);
qz5('q5-mcmax-2','l28',`Made-up numbers. A monopolistically competitive candle shop\'s demand for its own candles and its marginal cost:${atable(['Candles a day','Price','Marginal cost'],[['1','$15','$4'],['2','$14','$5'],['3','$13','$6'],['4','$12','$7'],['5','$11','$8'],['6','$10','$9']],{cls:'compact'})}What price does it charge, and what is its markup over the marginal cost of its last candle?`,
  [`$12, a markup of $5`,`$10, a markup of $1`,`$11, a markup of $3`,`$13, a markup of $7`,`$15, a markup of $11`],0,
  `<p>Total revenue is 15, 28, 39, 48, 55, 60, so marginal revenue is $15, $13, $11, $9, $7, $5. The 4th candle adds $9 against a cost of $7; the 5th adds $7 against $8. Stop at 4 and charge what buyers pay for 4: <b>$12</b>. Markup = $12 − $7 = <b>$5</b>. Its demand slopes down, so price sits above MC.</p><p>$10 keeps going until price nearly meets MC, the perfect-competition rule (M2). $11 makes one candle too many: the 5th adds $7 to revenue but $8 to cost. $13 and $15 stop too early: every candle up to the 4th adds more to revenue than to cost.</p>`);
/* --- Monopolistic competition: short- and long-run equilibrium (Lesson 28) --- */
qz5('q5-mclr-1','l28','Made-up numbers. A monopolistically competitive juice bar now sells 7 smoothies an hour at $10.75, with average total cost of about $7.32. Its average total cost would be lowest ($7) at 10 smoothies an hour. After new rivals stop entering, which outcome could describe the juice bar?',
  [`5 smoothies at $8.25, with ATC $8.25 and MC $4.50`,`10 smoothies at $7, with ATC $7 and MC $7`,`5 smoothies at $9, with ATC $8.25 and MC $4.50`,`8 smoothies at $12, with ATC $7.13 and MC $6`,`7 smoothies at $10.75, with ATC $7.32 and MC $5.50`],0,
  `<p>The long-run end state has three features. Price equals ATC, so economic profit is zero. Price is still above MC, because the juice bar\'s demand slopes down. Output is below the lowest-ATC output of 10 (excess capacity). Only "5 smoothies at $8.25, with ATC $8.25 and MC $4.50" has all three.</p><p>"10 smoothies at $7" is perfect competition\'s long run, with P = MC at minimum ATC (M2). "5 smoothies at $9" with ATC $8.25 leaves a profit that would keep drawing rivals in (M1). "8 smoothies at $12" has the juice bar\'s demand rising, but entry pushes each firm\'s demand down (M3). "7 smoothies at $10.75" is today\'s profit, which entry competes away.</p>`);
qz5('q5-mclr-2','l28','A monopolistically competitive firm is in long-run equilibrium. Its price is $15 and its marginal cost is $9. What is its average total cost?',
  [`$15, so its economic profit is zero`,`$9, the same as marginal cost`,`$12, so it earns $3 a unit`,`$18, so it is losing money`,`It can\'t be in equilibrium, because P must equal MC`],0,
  `<p>In the long run entry and exit make P = ATC, so ATC = $15 and profit is zero. The price stays above MC ($9) because the firm\'s demand slopes down. P = MC is perfect competition, not monopolistic competition (M2).</p>`);

/* --- Monopolistic competition: excess capacity and inefficiency (Lesson 28) --- */
qz5('q5-mcexc-1','l28','Made-up numbers. In long-run equilibrium a monopolistically competitive restaurant serves 300 meals a day. Its average total cost would be lowest at 450 meals. Which statement is true?',
  [`It has excess capacity of 150 meals and is not productively efficient`,`It has 150 unsold meals left over each day`,`It is productively efficient, since its profit is zero`,`It should serve 450 meals to earn a profit`,`It has a shortage of 150 meals`],0,
  `<p>Excess capacity is the gap between actual output and the output that minimizes ATC: 450 − 300 = 150. It sells all 300 meals; it could make them more cheaply at a larger scale but can\'t sell more without cutting its price (M5).</p>`);
qz5('q5-mcexc-2','l28','Monopolistically competitive firms earn zero economic profit in the long run. Why is the market still not allocatively efficient?',
  [`Price is above marginal cost, so units worth more than they cost aren\'t produced`,`Price is above average total cost`,`Firms earn large profits`,`Firms produce too much`,`Firms are price takers`],0,
  `<p>Allocative efficiency needs P = MC. Each firm faces downward-sloping demand, so at MR = MC the price is above MC: a markup and a small deadweight loss, "the same argument we made about monopoly, but in this case to a lesser degree" (your course textbook) (M2).</p>`);

/* src: [sources] · clep key · skill · mistakes (codes from the item's own lesson) */
const QZ5T = {
  'q5-acc-1':['MS5 OS71','acc','data','M1 M2'], 'q5-acc-2':['MS5 OS71','acc','terms','M1 M4'],
  'q5-norm-1':['OS101 OS113','norm','terms','M3 M6'], 'q5-norm-2':['MS5 OS71','norm','data','M2 M5'],
  'q5-mrmc-1':['MS5 OS82','mrmc','data','M1 M3'], 'q5-mrmc-2':['MS5 OS82','mrmc','data','M1 M3'],
  'q5-str-1':['OS70 OS101 OS102','str','terms',''], 'q5-str-2':['MS5 OS81','str','models','M6 M5'],
  'q5-pcmax-1':['MS5 OS82','pcmax','data','M3'], 'q5-pcmax-2':['MS5 OS82','pcmax','data','M3 M4'],
  'q5-pcsr-1':['MS5 OS82','pcsr','models','M1 M2 M3'], 'q5-pcsr-2':['OS82 MS5','pcsr','graphs','M2 M5'],
  'q5-pclr-1':['OS83 MS5','pclr','models','M4'], 'q5-pclr-2':['MS5 OS82','pclr','data','M2'],
  'q5-pceff-1':['OS84','pceff','terms','M5'], 'q5-pceff-2':['OS84','pceff','models','M5'],
  'q5-msrc-1':['MS5 OS91','msrc','terms',''], 'q5-msrc-2':['OS92','msrc','models','M6'],
  'q5-mmax-1':['MS5 OS92','mmax','data','M2 M3'], 'q5-mmax-2':['OS92 MS5','mmax','models','M1'],
  'q5-mineff-1':['MS5','mineff','data','M1 M3'], 'q5-mineff-2':['OS92 MS5','mineff','terms','M1 M3'],
  'q5-pd-1':['T2UPD','pd','data','M4'], 'q5-pd-2':['CBAP','pd','data','M5'],
  'q5-nat-1':['OS113','nat','data','M6'], 'q5-nat-2':['OS91 OS113','nat','terms',''],
  'q5-ocol-1':['ELCA FEDC OS102','ocol','models','M3'], 'q5-ocol-2':['MS5','ocol','data','M6'],
  'q5-ogame-1':['OS102 MS5','ogame','data','M2 M5'], 'q5-ogame-2':['ELPD MS5','ogame','models',''],
  'q5-onash-1':['MS5','onash','data','M5 M1'], 'q5-onash-2':['MS5','onash','terms','M1'],
  'q5-mcdif-1':['OS101','mcdif','terms',''], 'q5-mcdif-2':['OS101','mcdif','models','M4'],
  'q5-mcmax-1':['MS5 OS101','mcmax','graphs','M1'], 'q5-mcmax-2':['OS101 OS92','mcmax','data','M2 M3'],
  'q5-mclr-1':['MS5 OS101','mclr','data','M1 M2 M3'], 'q5-mclr-2':['MS5','mclr','data','M2'],
  'q5-mcexc-1':['OS101 MS5','mcexc','data','M5'], 'q5-mcexc-2':['OS101','mcexc','terms','M2']
};
Object.entries(QZ5T).forEach(([id,[src,clep,skill,mis]]) => { if(Q[id]) Object.assign(Q[id], { src: src.split(' '), clep: U5CLEP[clep], skill, mis: mis ? mis.split(' ') : [] }); });
