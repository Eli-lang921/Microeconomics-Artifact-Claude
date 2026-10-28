/* ===== Lesson 15: From Utility to Demand: Income and Substitution Effects (Modern States video 3.1, last part; slides 12-22) =====
   Common mistakes: M1 an own-price change shifts the demand curve · M2 the income effect means money income changed
   M3 the substitution effect raises both goods · M4 market demand adds prices (or averages) · M5 the other good's change is always one direction
   M6 a rise in income raises purchases of every good */
const ps1Tbl = () => atable(['Unit','Soda: MU ($1)','Pizza: MU (now $1)'], SODA_MU.map((m,i)=>[ordinal(i+1), m, PIZZA_MU[i]]), { cls:'compact' }) + `<p class="small muted" style="margin:.2rem 0 .6rem">Budget: $5. Pizza has fallen from $2 to $1 a slice; soda is still $1.</p>`;
const demGraph = (pts, opts={}) => gchart2({ xmax:opts.xmax||6, ymax:opts.ymax||3, xlab:opts.xlab||'Slices of pizza', ylab:opts.ylab||'Price ($)', xt:opts.xt||[0,1,2,3,4,5,6], yt:opts.yt||[0,1,2,3], aria:'Demand curve',
  body:(X,Y)=>({ under: gline(pts,X,Y,'var(--accent)','',2.6), over: pts.map(([q,p])=>gdot(X,Y,q,p,`(${q}, ${money(p)})`,'var(--g2)')).join('') }) });

mc('l15-price-mup','l15','According to your course, when the price of a good falls, what happens to its marginal utility per dollar, and how does the consumer respond?',
  [`It rises, so the consumer buys more of the good`,`It falls, so the consumer buys less of the good`,`It rises, so the consumer buys less of the good`,`It stays the same, because marginal utility doesn\'t depend on price`,`It falls, so the consumer buys more of the good`],0,
  `<p>Your course: "If the price of pizza decreases, the marginal utility for each dollar that we spent on pizza is higher, and consumers will buy more of the good." Marginal utility itself doesn't change, but each dollar now buys more of it (16 ÷ $1 = 16 instead of 16 ÷ $2 = 8).</p><p>The tempting "stays the same" is true of marginal utility, not of marginal utility <b>per dollar</b>.</p>`);
mc('l15-new-opt','l15',`Your course's example after the price of pizza falls:${ps1Tbl()}Which bundle gives the most total utility?`,
  [`1 soda and 4 slices`,`2 sodas and 3 slices`,`No soda and 5 slices`,`3 sodas and 2 slices`,`1 soda and 2 slices`],0,
  `<p>Totals: 1 soda + 4 slices = 8 + (20 + 16 + 12 + 8) = <b>64</b>; 2 + 3 = 15 + 48 = 63; 0 + 5 = 60; 3 + 2 = 21 + 36 = 57. Check: the last soda gives 8 ÷ $1 = 8 and the 4th slice 8 ÷ $1 = 8 utils per dollar.</p><p>"1 soda and 2 slices" was the best bundle at $2; at $1 it costs only $3, leaving $2 unspent.</p>`);
mc('l15-demand-pts','l15','In your course\'s example, the consumer buys 2 slices of pizza when it costs $2 and 4 slices when it costs $1. Which of the following describes her demand curve for pizza?',
  [`It slopes down, passing through (2 slices, $2) and (4 slices, $1)`,`It slopes up, passing through (2 slices, $1) and (4 slices, $2)`,`It shifts to the right when the price falls to $1`,`It is vertical at 2 slices`,`It is horizontal at $1`],0,
  `<p>Your course: "When the price of pizza is one dollar, we consume four slices of pizza. When the price of pizza is two dollars, we consume two." Each price and its best quantity is one point on the curve; the lower price goes with the larger quantity, so the curve slopes down.</p><p>The tempting "shifts to the right" is Lesson 6's trap: a change in the good's own price moves the consumer <b>along</b> her demand curve.</p>`);
lazy('l15-gr-demand','l15',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. Each point on Rosa's demand curve for movie tickets came from her best choice at that price, with her income, other prices and tastes held constant.${demGraph([[1,12],[2,9],[4,6]],{ xmax:5, ymax:14, xlab:'Movie tickets per month', ylab:'Price of a ticket ($)', xt:[0,1,2,3,4,5], yt:[0,6,9,12] })}What does the point (2 tickets, $9) tell you?`,
  options:[`At $9, buying 2 tickets gives Rosa the most total utility she can get from her budget`,`At $9, 2 tickets is the only quantity Rosa can afford`,`The 2nd ticket gives Rosa more marginal utility than the 1st`,`Sellers are willing to sell 2 tickets at $9`,`Rosa\'s demand for tickets shifts right at $9`], answer:0,
  explain:`<p>Your course: "the demand curve that we see for an individual directly reflects the points that maximize his or her level of satisfaction." At $9, 2 tickets is her utility-maximizing quantity. She could afford other amounts; 2 is the best one.</p><p>"Sellers are willing to sell" describes supply. The 2nd ticket gives <b>less</b> marginal utility than the 1st (diminishing marginal utility).</p>` }));
gen('l15-g-market','l15',()=>{
  const P=[1,2,3], A=[pick([6,7]),pick([4,5]),pick([2,3])], B=[pick([5,6]),pick([3,4]),pick([1,2])], C=[pick([3,4]),pick([2]),pick([0,1])];
  const i=pick([0,1,2]), ans=A[i]+B[i]+C[i];
  return { type:'num', kind:'num', prompt:`Made-up numbers. Three friends are the only buyers of bubble tea at a small kiosk. Cups each would buy per week:${atable(['Price','Ana','Ben','Cal'], P.map((p,j)=>[money(p),A[j],B[j],C[j]]), {cls:'compact'})}What is the <b>market</b> quantity demanded at ${money(P[i])}?`, answer:ans, unit:'cups',
    explain:`<p>Market demand adds the quantities every buyer wants at the same price: ${A[i]} + ${B[i]} + ${C[i]} = <b>${ans} cups</b> at ${money(P[i])}. Your course: market demand "is the sum of all of the individual demand curves of all of the buyers."</p><p>The common slips are averaging the quantities (${fmt(ans/3)}) or adding the prices. You add sideways: quantities, one price at a time.</p>` };
});
mc('l15-inc-def','l15','When the price of a good falls, a consumer\'s income buys more than before, and she buys more of the good. This is known as which of the following?',
  [`The income effect`,`The substitution effect`,`Income elasticity of demand`,`Cross-price elasticity of demand`,`Diminishing marginal utility`],0,
  `<p>A lower price raises the purchasing power of the same money income, so she buys more (of a normal good): the <b>income effect</b>. Your course: "peoples' income or budget do not change, but in a way, we feel wealthier." College Board's own sample question describes the same effect from a price rise: "a consumer's real income decreases."</p><p>The substitution effect is about the good becoming <b>relatively</b> cheaper than others. Income elasticity (Lesson 10) measures the response to a change in money income itself.</p>`);
mc('l15-sub-def','l15','The <b>substitution effect</b> of a fall in the price of pizza is best described as which of the following?',
  [`Buying more pizza, which became relatively cheaper, and less of goods that became relatively more expensive, like soda`,`Buying more pizza and more soda`,`Feeling wealthier because the same budget now buys more`,`A shift of the demand curve for pizza to the right`,`Buying less pizza, because it is now cheaper`],0,
  `<p>Your course: soda "becomes more expensive in terms of" pizza when pizza's price falls, so consumers "consume more pizza, and less soda." Your course textbook: the substitution effect gives consumers "an incentive to consume less of the good with a relatively higher price and more of the good with a relatively lower price."</p><p>"More of both" and "feeling wealthier" describe the income effect (for normal goods). A price change moves along the demand curve; it doesn't shift it.</p>`);
tf('l15-tf-inc','l15','The income effect of a price change happens because the consumer\'s money income changes.',false,
  `<p>False. Money income stays the same. Your course textbook: a higher price means "the buying power of income has been reduced (even though actual income has not changed)." A raise at work is a change in money income, which shifts demand (Lesson 6); it isn't the income effect of a price change.</p>`);
mc('l15-rel','l15','In your course\'s example, pizza falls from $2 to $1 a slice and soda stays at $1 a can. How does the price of one soda, measured in slices of pizza, change?',
  [`From half a slice to one slice`,`From two slices to one slice`,`From one slice to half a slice`,`From $1 to $2`,`It doesn\'t change, because soda still costs $1`],0,
  `<p>Price of soda ÷ price of pizza: before, $1 ÷ $2 = <b>½ slice</b>; after, $1 ÷ $1 = <b>1 slice</b>. Your course: "the relative price of soda in terms of how many pizzas we need to give up, for one additional can, has gone up." That's why the substitution effect shifts buying away from soda.</p><p>The tempting "doesn't change" looks only at soda's dollar price. Relative prices compare goods with each other.</p>`);
mc('l15-other-good','l15','Pizza gets cheaper and soda is a normal good. What do the two effects do to the quantity of soda?',
  [`The substitution effect lowers it and the income effect raises it, so the total change depends on which is stronger`,`Both effects lower it, so soda purchases must fall`,`Both effects raise it, so soda purchases must rise`,`The substitution effect raises it and the income effect lowers it`,`Neither effect touches soda, because its price didn\'t change`],0,
  `<p>Substitution: soda is now relatively more expensive, so buy less. Income: the same budget stretches further, so buy more of normal goods, including soda. They pull opposite ways. Your course: what happens to soda "is going to depend on the income, and the substitution effects." In its example, soda stayed at 1 can.</p><p>The tempting "must fall" counts only the substitution effect.</p>`);
tf('l15-tf-market','l15','The market demand curve is found by adding up, at each price, the quantities that all buyers demand.',true,
  `<p>True. Your course: the market demand curve "is the sum of all of the individual demand curves of all of the buyers." The AP framework says the same: market demand "is derived from the summation of individual demand curves." You add quantities at each price, not prices.</p>`);
mc('l15-inferior','l15','Prices stay the same, but a student\'s income rises, and she buys fewer packs of instant noodles. For her, instant noodles are which of the following?',
  [`An inferior good`,`A normal good`,`A substitute for her income`,`A good with a substitution effect`,`A good whose demand curve slopes up`],0,
  `<p>A good bought less when income rises is an <b>inferior good</b> (Lesson 6). Your course textbook: an inferior good "occurs when people trim back on a good as income rises, because they can now afford the more expensive choices that they prefer."</p><p>The tempting "normal good" is the usual case, but not here. No price changed, so there is no substitution effect.</p>`);
/* L15 more */
mc('l15-slide-56','l15',`Your course's example at the new price:${ps1Tbl()}What is the total utility of spending all $5 on pizza (5 slices, no soda)?`,
  [`60`,`56`,`64`,`20`,`4`],0,
  `<p>20 + 16 + 12 + 8 + 4 = <b>60 utils</b>. Your course's slides and video give 56, which leaves out the 5th slice's 4 utils. Either way it's below the best bundle (1 soda, 4 slices: 64).</p>`);
gen('l15-g-mupnew','l15',()=>{
  const [p0,p1]=pick([[4,3],[3,2],[6,4],[4,2]]), mu=pick([12,24,36]);
  return { type:'num', kind:'num', prompt:`Made-up numbers. The next scoop of ice cream gives Leo <b>${mu} utils</b>. Its price falls from ${money(p0)} to ${money(p1)}. What is its marginal utility per dollar <b>now</b>?`, answer:mu/p1, unit:'utils per dollar',
    explain:`<p>${mu} ÷ ${money(p1)} = <b>${fmt(mu/p1)} utils per dollar</b> (up from ${mu} ÷ ${money(p0)} = ${fmt(mu/p0)}). The marginal utility is the same; each dollar buys more of it, so Leo buys more ice cream.</p><p>The common slip is using the old price (${fmt(mu/p0)}).</p>` };
});
mc('l15-why-slope','l15','According to consumer choice theory, why does an individual\'s demand curve slope downward?',
  [`A lower price raises the good\'s marginal utility per dollar, so she buys more until diminishing marginal utility brings it back in line with other goods`,`A lower price shifts her demand curve to the right`,`A lower price raises her money income`,`Sellers offer more at lower prices`,`Marginal utility rises as she buys more`],0,
  `<p>At a lower price each dollar on the good buys more satisfaction, so it beats other goods per dollar. She buys more, and diminishing marginal utility lowers the per-dollar figure until it matches again, at a larger quantity. The AP framework lists diminishing marginal utility and the income and substitution effects as the explanations for downward-sloping demand.</p><p>"Sellers offer more" is the law of supply. "Marginal utility rises" is backwards.</p>`);
tf('l15-tf-move','l15','A change in the price of pizza moves a consumer along her demand curve for pizza; it doesn\'t shift the curve.',true,
  `<p>True. Each price gives a new best bundle, and each price-quantity pair is a point on the same curve (Lesson 6: a change in own price changes quantity demanded, not demand).</p>`);
lazy('l15-gr-sum','l15',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. Ana and Ben are the only buyers of fresh bread at a farm stand.<div class="u2row">${['Ana','Ben'].map((n,j)=>`<div class="u2cell"><p class="u2t">${n}</p>${demGraph(j?[[1,4],[3,2]]:[[2,4],[5,2]],{ xmax:6, ymax:5, xlab:'Loaves per week', ylab:'Price ($)', xt:[0,1,2,3,4,5,6], yt:[0,2,4] })}</div>`).join('')}</div>What is the market quantity demanded at a price of $2?`,
  options:[`8 loaves`,`4 loaves`,`3 loaves`,`5 loaves`,`2 loaves`], answer:0,
  explain:`<p>At $2, Ana wants 5 loaves and Ben 3: market quantity demanded = 5 + 3 = <b>8 loaves</b>. Add quantities at the same price (sideways), not prices.</p><p>"4 loaves" averages them; "3" or "5" reads only one buyer.</p>` }));
gen('l15-g-relp','l15',()=>{
  const [c0,c1,b]=pick([[4,3,2],[6,4,2],[5,3,2],[8,6,4],[6,3,4]]);
  return { type:'num', kind:'num', prompt:`Made-up numbers. A latte costs ${money(c0)} and a bagel costs ${money(b)}. The latte's price falls to ${money(c1)}. Measured in bagels, what does one latte cost <b>now</b>?`, answer:c1/b, unit:'bagels',
    explain:`<p>Relative price = price of the latte ÷ price of a bagel = ${money(c1)} ÷ ${money(b)} = <b>${fmt(c1/b)} bagels</b> (it was ${fmt(c0/b)}). Lattes became relatively cheaper, and bagels relatively more expensive: the substitution effect pushes toward lattes.</p><p>The common slip is dividing the other way (${fmt(b/c1)}), which gives the price of a bagel in lattes.</p>` };
});
mc('l15-both','l15','For a normal good whose price falls, what do the substitution effect and the income effect do to its quantity demanded?',
  [`Both increase it`,`They cancel out`,`Both decrease it`,`The substitution effect increases it and the income effect decreases it`,`Neither affects it`],0,
  `<p>Substitution: the good is relatively cheaper, so buy more. Income: the budget stretches further, and for a normal good that means buy more. Both push the same way, which is why your course's consumer buys more pizza (2 → 4 slices). Your course textbook makes the same point for a price rise: the higher price cuts purchases "for both reasons."</p><p>"Substitution up, income down" happens only for an inferior good.</p>`);
mc('l15-kimberly','l15','Your course textbook\'s Kimberly spends on concerts and overnight getaways. Her budget doubles from $1,000 to $2,000, prices stay the same, and she moves to a choice with more of both. What does that tell you?',
  [`Both are normal goods for her`,`Both are inferior goods for her`,`Concerts are inferior for her`,`Getaways are inferior for her`,`Nothing, because only prices change demand`],0,
  `<p>Buying more of a good when income rises makes it a normal good. The textbook: "When income rises, the most common reaction is to purchase more of both goods, like choice N." If she had bought fewer getaways (choice P), getaways would be inferior for her.</p>`);
lazy('l15-budget-pivot','l15',()=>({ type:'mc', kind:'graph',
  prompt:`A consumer splits a fixed budget between pizza and soda. Her budget line moves from the dashed line to the solid line.${gchart2({ xmax:6, ymax:6, xlab:'Slices of pizza', ylab:'Cans of soda', xt:[0,1,2,3,4,5,6], yt:[0,1,2,3,4,5,6], aria:'Two budget lines for pizza and soda',
    body:(X,Y)=>({ under: gline([[0,5],[2.5,0]],X,Y,'var(--muted)','5 4',2) + gline([[0,5],[5,0]],X,Y,'var(--accent)','',2.6), over:'' }) })}Which of the following caused this change?`,
  options:[`The price of pizza fell`,`Her income rose`,`The price of soda fell`,`The price of pizza rose`,`Her income fell`], answer:0,
  explain:`<p>The line still starts at 5 sodas, so soda's price and her income didn't change. It now reaches 5 slices instead of 2.5, so a slice costs half as much: the price of pizza fell (your course: $2 to $1). A price change <b>pivots</b> the line on the other good's axis.</p><p>A rise in income would shift the whole line out <b>parallel</b>, raising both ends.</p>` }));
tf('l15-tf-subboth','l15','The substitution effect of a price cut increases the quantity demanded of both goods.',false,
  `<p>False. It increases the quantity of the good that became relatively cheaper and decreases the quantity of the one that became relatively more expensive. Your course: pizza becomes cheaper, so "the consumer buys more pizza but less soda." "More of both" is what the income effect can do (for normal goods).</p>`);
mc('l15-sergei','l15','In your course textbook, the price of baseball bats rises. Sergei keeps buying the same number of bats but buys fewer cameras. How can a higher price for bats lower his purchases of cameras?',
  [`He buys both from the same budget, so paying more for bats leaves less for cameras`,`The price of cameras also rose`,`His income rose`,`Bats and cameras are inferior goods`,`His demand for bats shifted right`],0,
  `<p>The textbook: "Since Sergei purchases all his products out of the same budget, a change in the price of one good can also have a range of effects, either positive or negative, on the quantity consumed of other goods." Keeping the same bats at a higher price takes a bigger share of his budget.</p>`);
mc('l15-income-shift','l15','With prices unchanged, a consumer\'s income rises. How does her budget line move?',
  [`It shifts out, parallel to the old line`,`It pivots out along one axis only`,`It shifts in, parallel to the old line`,`It pivots in along one axis only`,`It doesn\'t move, because prices didn\'t change`],0,
  `<p>More income buys more of both goods at the same prices, so both ends of the line move out by the same proportion and the slope (the price ratio) stays the same: a parallel shift. Your course textbook's Kimberly: $1,000 to $2,000 shifts her line out "to the right."</p><p>A pivot means one good's price changed.</p>`);
mc('l15-ms-income','l15','Your course says that when pizza gets cheaper, the consumer may buy more of both goods "if the income effect dominates." Which of the following describes that case?',
  [`More pizza and more soda`,`More pizza and less soda`,`Less pizza and more soda`,`Less of both`,`The same amounts of both`],0,
  `<p>Your course: "if the income effect dominates, it tells us that, in fact, we're gonna consume more of both goods, because we feel wealthier." If the substitution effect dominates for soda, the consumer buys more pizza but less soda.</p>`);
mc('l15-ceteris','l15','Along one consumer\'s demand curve for pizza, which of the following is held constant?',
  [`Her income, the price of soda and her tastes`,`The price of pizza`,`The quantity of pizza she buys`,`Her marginal utility per dollar from pizza`,`The number of slices she can afford`],0,
  `<p>The curve shows how her best quantity changes as <b>pizza's</b> price changes, with everything else fixed. Your course textbook draws its demand curve "ceteris paribus" (other things equal). If income, other prices or tastes change, the whole curve shifts (Lesson 6).</p>`);
mc('l15-heating','l15','In your course textbook, home heating prices rose sharply in the winter of 2005 and demand for heating was inelastic. Besides heating, how did households respond?',
  [`They cut spending on other things they valued least on the margin, such as dinners out`,`They bought more of everything`,`They stopped heating their homes`,`Their demand for dinners out shifted right`,`Nothing else changed`],0,
  `<p>The textbook: because heating bills rose, "Each household cut back on what it valued least on the margin; for some it might have been some dinners out, or a vacation." A higher price for one necessity squeezes the rest of the budget.</p>`);
mc('l15-optimal-point','l15',`Your course's example at the new price:${ps1Tbl()}At the new best bundle, 1 soda and 4 slices, what is the marginal utility per dollar of the last unit of each good?`,
  [`8 for both`,`20 for pizza and 8 for soda`,`4 for pizza and 8 for soda`,`16 for pizza and 8 for soda`,`64 for both`],0,
  `<p>Last soda: 8 ÷ $1 = 8. Fourth slice: 8 ÷ $1 = 8. Equal again, at a larger pizza quantity than before. Your course: "we observe once again that our marginal utility for each dollar that we spend is going to be eight."</p><p>20 is the first slice; 64 is total utility.</p>`);

/* ===== Lesson 15 quick checks ===== */
mc('l15c-mup','l15','Made-up numbers. A song download gives 6 utils. Its price rises from $1 to $2. What happens?',
  [`Its marginal utility per dollar falls from 6 to 3, so the buyer downloads fewer songs`,`Its marginal utility falls from 6 to 3`,`Its marginal utility per dollar rises, so she buys more`,`Nothing, since the song is the same`,`Her demand curve for songs shifts left`],0,
  `<p>Marginal utility stays 6; per dollar it falls from 6 ÷ $1 = 6 to 6 ÷ $2 = 3. Downloads are now a worse buy per dollar, so she buys fewer: a movement along her demand curve.</p>`);
mc('l15c-new','l15',`Your course's example at the new price:${ps1Tbl()}Why isn't 1 soda and 2 slices (the best bundle at $2) still the best?`,
  [`It now costs only $3, leaving $2 that can buy more satisfaction`,`It now costs more than $5`,`Soda\'s marginal utility changed`,`Pizza\'s marginal utility doubled`,`It is still the best`],0,
  `<p>At $1 a slice, 1 soda + 2 slices costs $3. The other $2 buys slices 3 and 4 (12 + 8 = 20 more utils), reaching 64. A point inside the budget line can't be the best.</p>`);
mc('l15c-demand','l15','Made-up numbers. At $3 a smoothie, Kim\'s best choice is 2 a week; at $2, it is 3 a week. On her demand curve for smoothies, these are:',
  [`Two points on the same downward-sloping curve`,`Two different demand curves`,`A shift of her demand curve to the right`,`Points on her supply curve`,`Points on her budget line only`],0,
  `<p>Each price paired with her best quantity is one point on her individual demand curve. A lower price, a larger quantity: a movement along one downward-sloping curve.</p>`);
mc('l15c-market','l15','Made-up numbers. At $4, Dana would buy 3 sandwiches a week, Eli 1 and Fay 2. They are the only buyers. What is the market quantity demanded at $4?',
  [`6`,`2`,`4`,`12`,`3`],0,
  `<p>Add quantities at the same price: 3 + 1 + 2 = <b>6 sandwiches</b>. 2 is the average; 12 multiplies by the price.</p>`);
mc('l15c-sub','l15','Bus fares rise while bike-share rides stay the same price. A commuter switches some trips from the bus to bike-share. Which effect is this?',
  [`The substitution effect`,`The income effect`,`A shift in demand from higher income`,`Diminishing marginal utility`,`A rise in money income`],0,
  `<p>Bus rides became relatively more expensive than bike-share, so the commuter substitutes toward the relatively cheaper option.</p>`);
mc('l15c-inc','l15','In your course\'s example, the old bundle (1 soda, 2 slices) cost $5 at $2 a slice. After pizza falls to $1, it costs $3. What does the freed-up $2 illustrate?',
  [`The income effect: the same money income now buys more`,`The substitution effect`,`A raise in money income`,`A shift of the budget line inward`,`Diminishing marginal utility`],0,
  `<p>The consumer could buy her old bundle and still have $2 left: the price cut raised her purchasing power, as if she were $2 richer, even though her $5 budget didn't change. That is the income effect.</p>`);
mc('l15c-income','l15','A family\'s income rises and, at the same prices, it buys fewer used cars and more new cars. For this family:',
  [`Used cars are an inferior good and new cars a normal good`,`Both are normal goods`,`Both are inferior goods`,`Used cars are a normal good and new cars inferior`,`This is a substitution effect from a price change`],0,
  `<p>Fewer purchases as income rises: inferior (used cars). More: normal (new cars). Your course textbook gives this example: a higher-income household might "be less likely to buy a used car, and instead ... buy a new car." No price changed, so it isn't a substitution effect.</p>`);
mc('l15c-skill','l15','You get a raise at work and buy more concert tickets at the same price. Which of the following is this?',
  [`A shift in demand from higher money income, not an income effect of a price change`,`The income effect of a price change`,`The substitution effect`,`A movement along the demand curve`,`Diminishing marginal utility`],0,
  `<p>No price changed. Your money income rose, which shifts your demand for concert tickets (a normal good) to the right. The income effect is the change in purchasing power caused by a price change.</p>`);

/* Course materials checked 2026-10-27: video 3.1 transcript (price changes, pizza at $1: 30, 57, 63, 64, 56; demand points $2 → 2, $1 → 4; market demand = sum;
   income and substitution effects), Module 3 slides 12-22, course textbook §6.2 (Kimberly, Sergei, housing demand, heating, inferior goods), §6.3-6.4 for Go deeper.
   Source problems noted: video and slides total 5 slices at $1 as 56 (it is 60); the video says we "for sure" buy more of the cheaper good (true for the
   substitution effect and for normal goods; the textbook calls the opposite "theoretically possible but highly unlikely"). */
const L15TAGS = {
  'l15-price-mup':['MS3','dem','models','M1'], 'l15-new-opt':['MS3','dem','data','M4'], 'l15-demand-pts':['MS3 OS62','dem','graphs','M1'],
  'l15-gr-demand':['MS3 OS62','dem','graphs','M1'], 'l15-g-market':['MS3 CED16','dem','data','M4'], 'l15-inc-def':['MS3 OS62 CBS','eff','terms','M2 M3'],
  'l15-sub-def':['MS3 OS62','eff','terms','M3 M1 M2'], 'l15-tf-inc':['OS62 CBS','eff','terms','M2'], 'l15-rel':['MS3','eff','data','M3'],
  'l15-other-good':['MS3 OS62','eff','models','M5'], 'l15-tf-market':['MS3 CED16','dem','terms','M4'], 'l15-inferior':['OS62 ELD','eff','models','M6 M2'],
  'l15-slide-56':['MS3','dem','data',''], 'l15-g-mupnew':['MS3','dem','data','M1'], 'l15-why-slope':['CED16 MS3 OS62','dem','models','M1 M2'],
  'l15-tf-move':['MS3 OS62','dem','terms','M1'], 'l15-gr-sum':['MS3 CED16','dem','graphs','M4'], 'l15-g-relp':['MS3','eff','data','M3'],
  'l15-both':['OS62 MS3','eff','models','M5'], 'l15-kimberly':['OS62','eff','data','M6'], 'l15-budget-pivot':['OS62 MS3','eff','graphs','M2'],
  'l15-tf-subboth':['MS3 OS62','eff','terms','M3'], 'l15-sergei':['OS62','eff','models','M5'], 'l15-income-shift':['OS62','eff','graphs','M2'],
  'l15-ms-income':['MS3','eff','models','M5 M3'], 'l15-ceteris':['OS62','dem','terms','M1'], 'l15-heating':['OS62','eff','models','M5'],
  'l15-optimal-point':['MS3','dem','data','M4'],
  'l15c-mup':['MS3','dem','models','M1'], 'l15c-new':['MS3','dem','data',''], 'l15c-demand':['MS3 OS62','dem','graphs','M1'], 'l15c-market':['MS3 CED16','dem','data','M4'],
  'l15c-sub':['MS3 OS62','eff','models','M3'], 'l15c-inc':['MS3 OS62','eff','data','M2'], 'l15c-income':['OS62','eff','models','M6'], 'l15c-skill':['OS62 CBS','eff','terms','M2']
};
u3tag(L15TAGS);

U3_CARDS.l15 = [
  ['Price change and MU per dollar','What does a price change do to a good\'s marginal utility per dollar, and what follows?','Marginal utility stays the same, but per dollar it rises when the price falls (and falls when the price rises). The consumer buys more (or less) of the good until the per-dollar numbers match again.','Pizza $2 → $1: the 2nd slice goes from 8 to 16 utils per dollar; best bundle goes from 2 slices to 4.','Marginal utility itself doesn\'t depend on price.'],
  ['Individual demand curve','Where does one consumer\'s demand curve come from?','Each point pairs a price with the quantity in her utility-maximizing bundle at that price, with income, other prices and tastes held constant.','Your course: $2 → 2 slices, $1 → 4 slices.','A change in the good\'s own price moves along the curve; it doesn\'t shift it.'],
  ['Why demand slopes down','Why does consumer choice theory predict a downward-sloping demand curve?','A lower price raises a good\'s MU per dollar, so the consumer buys more until diminishing marginal utility evens things out again. The income and substitution effects explain it too.','Pizza at $1 beats soda per dollar until the 4th slice.','Sellers offering more at lower prices would be supply, not demand.'],
  ['Market demand curve','How is the market demand curve built from individual demand curves?','Add the quantities all buyers demand at each price (a horizontal sum).','At $2: you 2 slices + Lee 1 = 3; at $1: 4 + 3 = 7.','Add quantities, not prices, and don\'t average.'],
  ['Income effect','What is the income effect of a price change?','A price change changes the purchasing power of a fixed money income. A lower price lets you buy more, so you buy more normal goods (less of inferior goods).','Pizza falls to $1: your old $5 bundle now costs $3, as if you had $2 more.','Money income doesn\'t change; a raise is a demand shift, not the income effect.'],
  ['Substitution effect','What is the substitution effect of a price change?','When one good becomes relatively cheaper, consumers buy more of it and less of goods that became relatively more expensive.','Pizza $2 → $1: more pizza, less soda.','It never raises both goods.'],
  ['Relative price','What is a relative price, and how do you calculate it?','The price of one good in units of another: price of A ÷ price of B.','Soda in pizza: $1 ÷ $2 = ½ slice before; $1 ÷ $1 = 1 slice after.','A good\'s relative price can rise even when its dollar price doesn\'t change.'],
  ['Both effects on the cheaper good','For a normal good whose price falls, what do the two effects do?','Both raise its quantity demanded: it\'s relatively cheaper (substitution) and the budget stretches further (income).','Your course: pizza rises from 2 to 4 slices.','For an inferior good the income effect pushes the other way.'],
  ['The other good','When pizza gets cheaper, what happens to soda (a normal good)?','Substitution lowers soda; income raises it. The net change depends on which is stronger.','Your course: soda stays at 1 can.','Don\'t assume it must fall or must rise.'],
  ['Income change vs. price change','How do a change in income and a change in price move the budget line differently?','Income change: a parallel shift (slope unchanged). Price change: a pivot around the other good\'s axis.','Kimberly $1,000 → $2,000: parallel. Pizza $2 → $1: the pizza end moves from 2.5 to 5 slices.','A parallel shift never comes from one good\'s price.'],
  ['Normal and inferior goods (from Lesson 6)','How do normal and inferior goods respond when income rises?','Normal goods: buy more. Inferior goods: buy less, because people can afford what they prefer.','More income: more new cars, fewer used cars (your course textbook).','"Inferior" is about the income response, not quality.'],
  ['Ceteris paribus on a demand curve','What is held constant along an individual demand curve?','Income, the prices of other goods and tastes. Only the good\'s own price changes.','If soda gets cheaper, the whole pizza demand curve may shift.','Own price moves along; everything else shifts.']
];

Object.assign(U3_WRITE, {
  'w-l15-1':{lesson:'l15',prompt:'Using your course\'s pizza and soda example, explain how the consumer\'s demand curve for pizza is derived from her best choices. Why does it slope down?',
    model:'With $5, soda at $1 and pizza at $2, the best bundle is 1 soda and 2 slices, where the last soda and the last slice each give 8 utils per dollar. When pizza falls to $1, every slice gives twice as much utility per dollar, so pizza becomes the better buy and she buys more until the per-dollar numbers match again: 1 soda and 4 slices, with 8 utils per dollar each. Plotting price against the best quantity gives two points on her demand curve: $2 and 2 slices, $1 and 4 slices. It slopes down because a lower price raises pizza\'s marginal utility per dollar, and diminishing marginal utility means she has to buy more slices before it falls back in line.',
    checklist:['States the best bundle at $2 (1 soda, 2 slices) and at $1 (1 soda, 4 slices)','Explains the role of marginal utility per dollar (it rises when the price falls)','Identifies ($2, 2 slices) and ($1, 4 slices) as points on her demand curve','Explains the downward slope using MU per dollar and diminishing marginal utility']},
  'w-l15-2':{lesson:'l15',prompt:'When the price of pizza falls, explain the income effect and the substitution effect, and what each does to the quantities of pizza and soda. Why can\'t you be sure what happens to soda?',
    model:'The substitution effect: pizza becomes relatively cheaper (a soda now costs a whole slice instead of half), so the consumer swaps some soda for pizza: more pizza, less soda. The income effect: her $5 now buys more than before, so it\'s as if she were richer; she buys more of normal goods, both pizza and soda. For pizza, both effects point up, so pizza rises. For soda they point in opposite directions: substitution lowers it and income raises it. So soda could rise, fall or stay the same depending on which effect is stronger; in the course example it stayed at 1 can.',
    checklist:['Explains the substitution effect using relative prices (more pizza, less soda)','Explains the income effect as higher purchasing power with the same money income (more of normal goods)','Concludes that pizza rises because both effects agree','Explains that soda is uncertain because the effects pull in opposite directions']}
});

U3_PLAN.l15 = {
  core:['l15-price-mup','l15-new-opt','l15-demand-pts','l15-gr-demand','l15-g-market','l15-inc-def','l15-sub-def','l15-tf-inc','l15-rel','l15-other-good','l15-tf-market','l15-inferior'],
  more:['l15-slide-56','l15-g-mupnew','l15-why-slope','l15-tf-move','l15-gr-sum','l15-g-relp','l15-both','l15-kimberly','l15-budget-pivot','l15-tf-subboth','l15-sergei','l15-income-shift','l15-ms-income','l15-ceteris','l15-heating','l15-optimal-point']
};

U3_LESSONS.push({ id:'l15', unit:3, title:'From Utility to Demand: Income and Substitution Effects', mins:50, src:'Modern States video 3.1 (last part) and Module 3 slides 12-22 · Course textbook (OpenStax) §6.2',
  sources:['MS3','OS62','CB','CBS','CED16','ELD'],
  oneline:'When a price changes, the best bundle changes. Plot each price with the quantity chosen and you get a demand curve. The response comes from two effects: the good becomes relatively cheaper or dearer, and your budget buys more or less.',
  body:`
<p>Lesson 14 found the best bundle at fixed prices. Now let a price change. The new best bundle at each price gives a point on the consumer's ${dt('demand-curve','demand curve')}, which finally explains where Unit 2's demand curves come from.</p>

<h2>A price change changes marginal utility per dollar</h2>
<!-- src: MS3 (slide 12: "If the price of one good changes, it will change the marginal utility per dollar spent on the good – therefore the optimal consumption bundle will change"; video: price up → MU per dollar lower → buy less; price down → higher → buy more; slides 13-14 pizza at $1) -->
<p>Your course's slide: "If the price of one good changes, it will change the ${dt('mu-per-dollar','marginal utility per dollar')} spent on the good – therefore the optimal consumption bundle will change."</p>
<div class="math">Price rises → MU ÷ P falls → the good is a worse buy → buy <b>less</b><br>Price falls → MU ÷ P rises → the good is a better buy → buy <b>more</b></div>
<p><b>Worked example: your course's pizza falls from $2 to $1.</b> Each slice's marginal utility is unchanged (20, 16, 12, 8, 4). Per dollar, every slice doubles:</p>
${FIG3.l15mupBA()}
<p>Check: at $2 the 2nd slice matched the first soda (8 per dollar). At $1 the 2nd slice gives 16 per dollar, far more than soda's 8, so the consumer should buy more pizza.</p>
<div data-check="l15c-mup"></div>

<h2>The new best bundle</h2>
<!-- src: MS3 (video 3.1: 5 soda = 30; 3 soda + 2 slices = 57; 2 + 3 = 63; 1 + 4 = 64; 0 + 5 "= 56"; slides 14-18). Source problem: the video and slides give 56 for 5 slices (20 + 16 + 12 + 8 + 4 = 60); the best bundle is unaffected. -->
<p>With pizza at $1, the $5 can buy up to 5 slices. Your course adds up each bundle:</p>
${FIG3.l15totals()}
<div class="math">Best: 1 soda + 4 slices = 8 + (20 + 16 + 12 + 8) = <b>64 utils</b><br>Rule check: last soda 8 ÷ $1 = 8; 4th slice 8 ÷ $1 = 8</div>
<p>Your course: "we observe once again that our marginal utility for each dollar that we spend is going to be eight." The rule from Lesson 14 holds at the new price; it's just met at a larger quantity of pizza. (The course gives 56 for 5 slices; it's 60, which doesn't change the answer.)</p>
<div data-check="l15c-new"></div>

<h2>Deriving the individual demand curve</h2>
<!-- src: MS3 (video 3.1: "When the price of pizza is one dollar, we consume four slices ... When the price of pizza is two dollars, we consume two"; "the individual demand curve for a given good, such as pizza, comes directly from the optimal consumption choices"; slide 19); OS62 (Figure 6.5 housing: budget constraint rotates, quantity falls, "ceteris paribus"; "The shape of a demand curve is ultimately determined by the underlying choices about maximizing utility subject to a budget constraint"); CED16 (MKT-3.A.5: downward-sloping demand explained by income and substitution effects and by diminishing marginal utility) -->
<p>Put the two best choices side by side: at $2, 2 slices; at $1, 4 slices. That's a demand schedule. Your course: "the ${dt('individual-demand','individual demand curve')} for a given good, such as pizza, comes directly from the optimal consumption choices." Your course textbook: "The shape of a demand curve is ultimately determined by the underlying choices about maximizing utility subject to a budget constraint."</p>
${FIG3.l15derive()}
<p><b>The mechanism:</b> a lower price makes each dollar on pizza buy more satisfaction, so the consumer shifts spending to pizza. Because of ${dt('dmu','diminishing marginal utility')}, each extra slice adds less, and she stops once the last slice's utility per dollar falls back to soda's. The lower the price, the more slices it takes to get there. That's why the curve slopes down, and why the AP framework names diminishing marginal utility as one explanation of the ${dt('law-of-demand','law of demand')}.</p>
<p>Everything else is held constant along this curve (${dt('ceteris-paribus','ceteris paribus')}): her $5, soda's $1 and her tastes. Moving from $2 to $1 is a movement <b>along</b> her demand curve, not a shift (Lesson 6).</p>
<p>Build the curve yourself. Your course gives two prices; the in-between prices are made-up, using the course's utility numbers:</p>
<div data-widget="demandbuild"></div>
<p>What to notice: every point is a best choice, and higher prices never bring more slices. At $3.50 she buys none: one slice plus one soda (28 utils, with 50 cents that buys nothing) loses to five sodas (30 utils). At $4 the first slice gives only 5 utils per dollar, less than the 5.5 per dollar of the four sodas it would replace.</p>
<div data-check="l15c-demand"></div>

<h2>Market demand: add up the buyers</h2>
<!-- src: MS3 (video 3.1: "The market demand curve, on the other hand, is the sum of all of the individual demand curves of all of the buyers of that good or service"; slide 19 "Sum of all individual demand curves determines market demand curve"); CED16 (MKT-3.A.6 "The market demand curve (schedule) is derived from the summation of individual demand curves (schedules)") -->
<p>Your course: "The ${dt('market-demand','market demand curve')} ... is the sum of all of the individual demand curves of all of the buyers." At each price, add up how much every buyer wants.</p>
<p><b>Worked example.</b> Your course's consumer, plus a made-up second buyer, Lee:</p>
<div class="math">At $2: you 2 slices + Lee 1 slice = <b>3 slices</b><br>At $1: you 4 slices + Lee 3 slices = <b>7 slices</b></div>
${FIG3.l15market()}
<p>Check: the market curve is further right (more slices at each price), and it slopes down because each buyer's curve does. Your course: those market quantities "come directly from the optimal choices that consumers make." Watch out: add <b>quantities</b> at each price. Adding prices, or averaging, is a common slip.</p>
<div data-check="l15c-market"></div>

<h2>The income effect and the substitution effect</h2>
<!-- src: MS3 (video 3.1: income effect "if the price of Good X falls, peoples' income or budget do not change, but in a way, we feel wealthier ... if the income effect dominates ... we're gonna consume more of both goods"; substitution effect "Good Y becomes more expensive in terms of Good X ... consume more pizza, and less soda"; "the relative price of soda in terms of how many pizzas we need to give up, for one additional can, has gone up"; soda "is going to depend on the income, and the substitution effects"; slides 20-21); OS62 (definitions; "even though actual income has not changed"; "both effects can occur simultaneously"; L "theoretically possible but highly unlikely"); CBS (CLEP sample question 3: a price increase means "a consumer's real income decreases" → income effect). Source note: the video says we "for sure" buy more of the good whose price fell; that holds for the substitution effect and for normal goods, and the textbook treats the opposite as "highly unlikely". -->
<p>Your course splits the response to a price change into two effects. Both happen at once (your course textbook: "both effects can occur simultaneously").</p>
<div class="terms">${term(dt('substitution-effect','Substitution effect'),'When pizza gets cheaper, soda "becomes more expensive in terms of" pizza, so consumers "consume more pizza, and less soda."')}${term(dt('income-effect','Income effect'),'When pizza gets cheaper, "income or budget do not change, but in a way, we feel wealthier," so consumers can buy more in general.')}</div>
<p><b>The substitution effect runs on</b> ${dt('relative-price','<b>relative prices</b>')}: what one good costs in units of another. Soda's dollar price didn't move, yet it became more expensive in pizza:</p>
${FIG3.l15relp()}
<p><b>The income effect runs on</b> ${dt('purchasing-power','<b>purchasing power</b>')}. Worked example: your old bundle (1 soda, 2 slices) cost $5 at $2 a slice. At $1 a slice it costs $1 + $2 = $3, so <b>$2 is freed up</b>, as if you'd been handed a small raise. Your money income is still $5. College Board's own sample question puts it the same way from the other direction: when a price rises, "a consumer's real income decreases."</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a store-wide coupon that cuts the price of just one item you buy every week. Two things happen. That item now looks like a bargain next to everything else on the shelf (substitution). And at the checkout your total bill is lower, so you have money left for other things too (income).</p></div>
<p>Put together:</p>
${FIG3.l15flow()}
<p>For the good whose price fell (if it's a ${dt('normal-good','normal good')}), both effects say buy more: pizza goes from 2 to 4 slices. For the other good, they disagree. Your course: what happens to soda "is going to depend on the income, and the substitution effects." In its example soda stays at 1 can, so the two effects offset. A price <b>rise</b> runs everything in reverse.</p>
<p>Because everything comes out of one budget, a price change can reach goods you'd never connect to it. Your course textbook's Sergei pays more for baseball bats and keeps buying the same number, so he buys fewer cameras: "a change in the price of one good can also have a range of effects, either positive or negative, on the quantity consumed of other goods." When home heating prices soared in 2005, households paid the bills and "cut back on what it valued least on the margin," such as dinners out.</p>
<p>Try the combinations, including ${dt('inferior-good','inferior goods')} (Lesson 6), where the income effect flips:</p>
<div data-widget="effects"></div>
<p>What to notice: the substitution effect always favors the good that got relatively cheaper. The income effect follows normal or inferior. Wherever they disagree, the total is uncertain without knowing which is stronger.</p>
<div data-check="l15c-sub,l15c-inc"></div>

<h2>When income itself changes</h2>
<!-- src: OS62 (Kimberly: $1,000 → $2,000, concerts $50, getaways $200, M = 8 concerts and 3 getaways; N 5 getaways and 20 concerts, P 2 and 32, Q 9 getaways and 4 concerts; budget line shifts out; normal and inferior goods; higher-income households eat fewer hamburgers, buy fewer used cars); ELD (Henderson: "As real income rises, people buy more of some goods (which economists call 'normal goods') and less of others") -->
<p>The income effect comes from a price change. A change in <b>money income</b> itself, with prices fixed, works differently: it shifts the budget line out (or in) <b>parallel</b>, because both goods cost the same as before. Your course textbook's Kimberly has $1,000 a year for concerts ($50) and overnight getaways ($200) and chooses 8 concerts and 3 getaways. Her budget rises to $2,000:</p>
${FIG3.l15income()}
<p>"When income rises, the most common reaction is to purchase more of both goods," which means both are normal goods. But a good can be inferior: Econlib's article on demand notes that as real income rises, "people buy more of some goods ... and less of others." The textbook's examples: a higher-income household might eat fewer hamburgers and buy a new car instead of a used one.</p>
<p><b>So what:</b> a change in money income <b>shifts</b> demand curves (Lesson 6), while a change in the good's own price moves along them. A pivoting budget line means a price changed; a parallel shift means income changed.</p>
<div data-check="l15c-income"></div>

<h2>Which effect is it?</h2>
<!-- src: OS62; MS3. Exam skill: telling the income effect, the substitution effect and a demand shift apart (CLEP sample question 3 style). -->
<p>CLEP questions describe a situation and ask you to name the effect. The move: first ask whether a <b>price</b> changed. If not, it's a shift in demand. If so, ask whether the story is about the good being relatively cheaper or dearer (substitution) or about the budget stretching further or less far (income).</p>
<div data-widget="effsort"></div>
<div data-check="l15c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L15TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"A change in pizza's price shifts the demand curve for pizza."</span>It moves the consumer along the curve: each price gives a new best bundle, and each is a point on the same curve.</li>
<li><span class="wrong">"The income effect means your money income changed."</span>Money income stays the same; its purchasing power changes. A raise at work shifts demand instead.</li>
<li><span class="wrong">"The substitution effect makes you buy more of both goods."</span>It shifts buying toward the relatively cheaper good and away from the other.</li>
<li><span class="wrong">"Market demand adds up the prices buyers will pay."</span>Add the <b>quantities</b> all buyers want at each price.</li>
<li><span class="wrong">"When pizza gets cheaper, soda purchases must fall."</span>Substitution lowers soda, but the income effect raises it (if it's normal). The net can go either way; in your course's example it didn't change.</li>
<li><span class="wrong">"A rise in income raises purchases of every good."</span>Purchases of inferior goods fall when income rises.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A price change changes <b>marginal utility per dollar</b>: a lower price makes the good a better buy, so the consumer buys more.</li>
<li>Your course's new best bundle at $1 pizza: 1 soda and 4 slices (64 utils), again with 8 utils per dollar on each good.</li>
<li>Each price paired with its best quantity is a point on the <b>individual demand curve</b> ($2 → 2 slices, $1 → 4); diminishing marginal utility makes it slope down.</li>
<li>The <b>market demand curve</b> adds every buyer's quantity at each price.</li>
<li>A price cut has a <b>substitution effect</b> (more of the relatively cheaper good, less of the other) and an <b>income effect</b> (more purchasing power: more of normal goods). For the cheaper normal good both say "more"; for the other good the net is uncertain.</li>
<li>A change in money income shifts the budget line parallel and shifts demand; normal goods rise and inferior goods fall.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Individual and market demand curves" and "Income and substitution effects" under Theory of consumer choice (5% to 10% of the exam). Expect a scenario asking you to name the income or substitution effect (College Board's sample question does exactly this; first ask whether a price changed), a market demand calculation from individual schedules, and questions on why demand slopes down.</p>
</div>`,
  deeper:`
<p class="small muted">The rest of your course textbook's Chapter 6 (§6.3 to §6.4) applies the same tools beyond the CLEP outline, so it isn't in the practice questions.</p>
<h3>A wage and an interest rate are prices too</h3>
<p>§6.3: when Vivian's wage rises from $10 to $12 an hour, she "can choose whether to receive the benefits of her wage increase in the form of more income, or more leisure, or some mixture of these two." A higher wage makes leisure cost more (pushing toward work) but also makes her richer (pushing toward leisure), which is why the textbook draws a "backward-bending" labor supply curve for some high earners. Unit 6 covers labor markets. §6.4 does the same for saving: when the return on saving rises, "the quantity of saving may rise, fall, or remain the same, depending on the preferences of individuals."</p>
<h3>Behavioral economics</h3>
<p>The chapter ends with economists who study choices the utility model misses, such as loss aversion ("a $1 loss pains us 2.25 times more than a $1 gain helps us," citing Kahneman and Tversky) and treating found money differently from earned money.</p>`,
  links:[ {k:'Textbook',t:'6.2 How Changes in Income and Prices Affect Consumption Choices',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/6-2-how-changes-in-income-and-prices-affect-consumption-choices',w:'The newer edition of your course textbook\'s §6.2: Kimberly\'s income, Sergei\'s prices and the foundations of demand.'},
          {k:'Exam',t:'CLEP sample questions',s:'College Board',u:'https://clep.collegeboard.org/prepare-for-an-exam/practice-questions-study-guides/sample-questions-principles-microeconomics',w:'Question 3 is an income-effect question in exactly the style this lesson practices.'} ]
});
