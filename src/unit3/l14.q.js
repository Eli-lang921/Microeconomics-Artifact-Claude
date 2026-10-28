/* ===== Lesson 14: Utility Maximization: Marginal Utility per Dollar (Modern States video 3.1, middle part; slides 6-11) =====
   Common mistakes: M1 buy the good with the higher marginal utility · M2 at the optimum the marginal utilities are equal
   M3 keep buying until marginal utility is zero · M4 more MU per dollar means buy less of it · M5 spend everything on your favorite good
   M6 equal MU per dollar is enough, even with money left over or over budget */
const psMUTbl = (pp=2) => atable(['Unit','Soda: marginal utility','Pizza: marginal utility'], SODA_MU.map((m,i)=>[ordinal(i+1), m, PIZZA_MU[i]]), { cls:'compact' }) + `<p class="small muted" style="margin:.2rem 0 .6rem">Soda costs $1 a can, pizza $${pp} a slice, and the budget is $5.</p>`;
const joseMUTbl = () => atable(['Unit','T-shirt MU ($14 each)','Movie MU ($7 each)'], JOSE_T.slice(1).map((v,i)=>[ordinal(i+1), v-JOSE_T[i], JOSE_M[i+1]-JOSE_M[i]]), { cls:'compact' });
const psBudgetGraph = (marks=[]) => gchart2({ xmax:3, ymax:6, xlab:'Slices of pizza ($2 each)', ylab:'Cans of soda ($1 each)', xt:[0,1,2,2.5,3], yt:[0,1,2,3,4,5,6], aria:'Budget line for $5, pizza $2 and soda $1',
  body:(X,Y)=>({ under: gline([[0,5],[2.5,0]],X,Y,'var(--accent)','',2.6), over: marks.map(([q,s,l])=>gdot(X,Y,q,s,l,'var(--g1)')).join('') + gtext(X(2.5)+4, Y(0)-6, 'budget line', 'var(--accent)') }) });

mc('l14-rule','l14','Which of the following describes a consumer\'s utility-maximizing choice between goods X and Y?',
  [`The whole budget is spent and MU<sub>X</sub> ÷ P<sub>X</sub> = MU<sub>Y</sub> ÷ P<sub>Y</sub>`,`The whole budget is spent and MU<sub>X</sub> = MU<sub>Y</sub>`,`The consumer buys each good until its marginal utility is zero`,`The consumer buys only the good with the higher marginal utility`,`The consumer buys equal quantities of X and Y`],0,
  `<p>Your course textbook: "the utility-maximizing choice between consumption goods occurs where the marginal utility per dollar is the same for both goods," MU₁ ÷ P₁ = MU₂ ÷ P₂, on the budget line. Your course: at the optimum, "the marginal utility for each dollar that we spent on soda is exactly equal to the marginal utility for each dollar that we spent on pizza."</p><p>The tempting "MU<sub>X</sub> = MU<sub>Y</sub>" leaves out prices. If X costs twice as much, its last unit must give twice the marginal utility. Buying until marginal utility is zero ignores the budget.</p>`);
gen('l14-g-mup','l14',()=>{
  const p=pick([2,3,4,5]), per=pick([3,4,5,6,8]), mu=p*per; const good=pick([['a museum ticket','tickets'],['a smoothie','smoothies'],['a phone game','games'],['a bag of popcorn','bags']]);
  return { type:'num', kind:'num', prompt:`Made-up numbers. One more ${good[0].replace(/^an? /,'')} gives Theo <b>${mu} utils</b> of marginal utility, and it costs <b>${money(p)}</b>. What is its marginal utility per dollar?`, answer:per, unit:'utils per dollar',
    explain:`<p>Marginal utility per dollar = marginal utility ÷ price = ${mu} ÷ ${p} = <b>${per} utils per dollar</b>.</p><p>The common slips are multiplying (${mu} × ${p} = ${mu*p}) or dividing the wrong way (${p} ÷ ${mu} = ${fmt(p/mu)}). "Per dollar" means divide by the dollars.</p>` };
});
mc('l14-which-more','l14','Made-up numbers. Priya\'s last dollar spent on books gives her 6 utils; her last dollar spent on movies gives her 4 utils. To raise her total utility without spending more, what should she do?',
  [`Spend more on books and less on movies`,`Spend more on movies and less on books`,`Keep the same spending, since both give positive utility`,`Spend more on both`,`Spend less on both and save the money`],0,
  `<p>Moving a dollar from movies to books gives up about 4 utils and gains about 6: a net gain. She should keep shifting until the last dollar on each gives the same utility. As she buys more books, their marginal utility falls; as she buys fewer movies, theirs rises.</p><p>The tempting "more on movies" is backwards: you buy <b>more</b> of the good with the <b>higher</b> utility per dollar. Spending more on both isn't possible without a bigger budget.</p>`);
mc('l14-bundle-tu','l14',`Your course's pizza and soda:${psMUTbl()}What is the total utility of <b>3 cans of soda and 1 slice of pizza</b>?`,
  [`41`,`44`,`30`,`21`,`20`],0,
  `<p>Add the marginal utilities of every unit bought: soda 8 + 7 + 6 = 21, pizza 20. Total: 21 + 20 = <b>41 utils</b> (your course's second option).</p><p>21 counts only the soda; 20 only the pizza; 44 is the best bundle (1 soda, 2 slices); 30 is 5 sodas.</p>`);
mc('l14-best','l14',`Made-up numbers. Omar has <b>$6</b> for lunch snacks. Chips cost $1 a bag; juice costs $2 a bottle.${atable(['Unit','Chips: MU ($1 a bag)','Juice: MU ($2 a bottle)'],[['1st','8','16'],['2nd','6','12'],['3rd','5','8'],['4th','4','6'],['5th','3','–'],['6th','2','–']],{cls:'compact'})}Which combination gives Omar the most total utility?`,
  [`2 bags of chips and 2 bottles of juice`,`6 bags of chips and no juice`,`No chips and 3 bottles of juice`,`4 bags of chips and 1 bottle of juice`,`3 bags of chips and 2 bottles of juice`],0,
  `<p>Total utility of each bundle that spends $6: 6 chips = 28; 4 chips + 1 juice = 23 + 16 = 39; <b>2 chips + 2 juice = 14 + 28 = 42</b>; 3 juice = 36. Check with the rule: the 2nd bag of chips gives 6 ÷ $1 = 6 per dollar and the 2nd juice 12 ÷ $2 = 6 per dollar. Equal.</p><p>"3 bags and 2 juices" would be 47 utils, but it costs $7, over the budget. "3 juices" buys only the good with the biggest marginal utility. "6 chips" spends everything on the cheaper good.</p>`);
tf('l14-tf-highmu','l14','To maximize utility, a consumer should buy more of whichever good gives the higher marginal utility.',false,
  `<p>False. Compare marginal utility <b>per dollar</b>. In your course's example, a slice of pizza gives more marginal utility than a soda (16 versus 8), but it costs twice as much, so per dollar they're equal (8 and 8). Your course textbook: "A sensible economizer will pay twice as much for something only if, in the marginal comparison, the item confers twice as much utility."</p>`);
lazy('l14-gr-budget','l14',()=>({ type:'mc', kind:'graph',
  prompt:`Your course's budget: $5 to spend, pizza $2 a slice, soda $1 a can.${psBudgetGraph()}Which bundle lies <b>on</b> the budget line?`,
  options:[`2 slices of pizza and 1 can of soda`,`2 slices of pizza and 2 cans of soda`,`1 slice of pizza and 2 cans of soda`,`3 slices of pizza and no soda`,`No pizza and 4 cans of soda`], answer:0,
  explain:`<p>A bundle is on the line when it costs exactly $5: 2 × $2 + 1 × $1 = <b>$5</b>.</p><p>2 slices + 2 sodas costs $6, beyond the line (not affordable). 1 slice + 2 sodas and 4 sodas each cost $4: inside the line, with $1 unspent. 3 slices cost $6.</p>` }));
gen('l14-g-opt','l14',()=>{
  const goods = pick([['bagels','smoothies'],['granola bars','iced teas'],['stickers','comic books']]);
  let inst=null;
  for(let t=0;t<400 && !inst;t++){
    const a=pick([8,9,10,11,12]), MUA=[a]; for(let i=1;i<6;i++) MUA.push(Math.max(1, MUA[i-1]-pick([1,2,3])));
    const b=pick([16,18,20,22,24]), MUB=[b]; for(let i=1;i<4;i++) MUB.push(Math.max(2, MUB[i-1]-pick([2,4,6])));
    if(new Set(MUA).size<6 || new Set(MUB).size<4) continue;
    const I=pick([6,7,8]); let best=null, second=-1;
    for(let qa=0;qa<=6;qa++) for(let qb=0;qb<=4;qb++){ if(qa+2*qb>I) continue; const tu=MUA.slice(0,qa).reduce((s,v)=>s+v,0)+MUB.slice(0,qb).reduce((s,v)=>s+v,0);
      if(!best || tu>best.tu){ if(best) second=Math.max(second,best.tu); best={qa,qb,tu}; } else second=Math.max(second,tu); }
    if(best.tu-second<1 || best.qa+2*best.qb!==I || !best.qa || !best.qb || MUA[best.qa-1]*2!==MUB[best.qb-1]) continue;
    inst={MUA,MUB,I,best};
  }
  if(!inst) inst={MUA:[10,8,6,5,3,2],MUB:[20,16,12,6],I:6,best:{qa:2,qb:2,tu:54}};   // fallback: 2 + 2: 8 per dollar each; checked unique
  const {MUA,MUB,I,best}=inst, rows=[];
  for(let qb=0;qb<=Math.min(4,Math.floor(I/2));qb++){ const qa=I-2*qb; if(qa>6) continue; rows.push(`${qa} ${goods[0]} + ${qb} ${goods[1]} = ${MUA.slice(0,qa).reduce((s,v)=>s+v,0)+MUB.slice(0,qb).reduce((s,v)=>s+v,0)}`); }
  return { type:'num', kind:'num', prompt:`Made-up numbers. Lena has <b>$${I}</b>. ${goods[0][0].toUpperCase()+goods[0].slice(1)} cost $1 each and ${goods[1]} cost $2 each.${atable(['Unit',`${goods[0][0].toUpperCase()+goods[0].slice(1)}: MU ($1)`,`${goods[1][0].toUpperCase()+goods[1].slice(1)}: MU ($2)`], MUA.map((m,i)=>[ordinal(i+1), m, i<4?MUB[i]:'–']),{cls:'compact'})}To get the most total utility, how many <b>${goods[0]}</b> should she buy?`, answer:best.qa, unit:goods[0],
    explain:`<p>Total utility of each way to spend exactly $${I}: ${rows.join('; ')}. The highest is <b>${best.qa} ${goods[0]}</b> and ${best.qb} ${goods[1]} (${best.tu} utils).</p><p>Check with the rule: the last ${goods[0].replace(/s$/,'')} gives ${MUA[best.qa-1]} ÷ $1 = ${MUA[best.qa-1]} utils per dollar and the last of the ${goods[1]} gives ${MUB[best.qb-1]} ÷ $2 = ${MUB[best.qb-1]/2}. Equal.</p><p>A tempting wrong answer is ${Math.min(I,6)}: spending (almost) everything on the cheaper good gives only ${MUA.slice(0,Math.min(I,6)).reduce((s,v)=>s+v,0)} utils. Another is comparing marginal utilities without dividing by price, which overweights the ${goods[1]}.</p>` };
});
mc('l14-equal-mu','l14','In your course\'s example, pizza costs $2 a slice and soda $1 a can. At the consumer\'s best bundle, how does the marginal utility of the last slice compare with that of the last can of soda?',
  [`It is twice as large`,`It is the same`,`It is half as large`,`It is 2 utils larger`,`Both are zero`],0,
  `<p>The rule says MU ÷ P is equal: MU<sub>pizza</sub> ÷ $2 = MU<sub>soda</sub> ÷ $1, so MU<sub>pizza</sub> = 2 × MU<sub>soda</sub>. In your course's example, 16 for the 2nd slice and 8 for the 1st soda.</p><p>The tempting "the same" forgets the prices. "Both zero" would mean buying until satisfaction stops rising, which the $5 budget never allows.</p>`);
mc('l14-jose','l14',`Your course textbook's José has $56. T-shirts cost $14 and movies $7.${joseMUTbl()}At which combination is his marginal utility per dollar the <b>same</b> for both goods?`,
  [`1 T-shirt and 6 movies`,`2 T-shirts and 4 movies`,`No T-shirts and 8 movies`,`4 T-shirts and no movies`,`3 T-shirts and 2 movies`],0,
  `<p>At 1 T-shirt and 6 movies: T-shirt 22 ÷ $14 ≈ 1.57 and 6th movie 11 ÷ $7 ≈ 1.57 utils per dollar. The textbook: "the marginal utility from the first T-shirt, of 22 is exactly twice the marginal utility of the sixth movie, which is 11," matching the price ratio of 2. It is his best choice (point S, 103 utils).</p><p>At 2 T-shirts and 4 movies, the 2nd T-shirt gives 21 ÷ 14 = 1.5 but the 4th movie 13 ÷ 7 ≈ 1.86: movies are the better buy, so he should trade a T-shirt for two movies.</p>`);
tf('l14-tf-mu-zero','l14','A utility-maximizing consumer keeps buying each good until its marginal utility reaches zero.',false,
  `<p>False. The budget runs out long before that. With limited money, the consumer stops where the last dollar on each good gives the same marginal utility. In your course's example the last soda and last slice still give 8 and 16 utils; the $5 is simply spent.</p>`);
mc('l14-corner','l14','In your course\'s example, spending all $5 on soda gives 30 utils, while 1 soda and 2 slices of pizza give 44. Why does the mix win?',
  [`Diminishing marginal utility: the 2nd to 5th sodas add only 7, 6, 5 and 4 utils, while the money they cost buys two slices worth 20 and 16`,`Soda is cheaper, so buying more of it always adds more utility`,`Pizza costs more, so it must give more utility per dollar`,`Total utility from soda turns negative after the 3rd can`,`Mixing goods lowers the total cost of the bundle`],0,
  `<p>Each extra soda adds less than the one before. The same $4 that buys sodas 2 to 5 (7 + 6 + 5 + 4 = 22 utils) buys two slices (20 + 16 = 36 utils). Spreading spending across goods avoids the low-value last units of any one good.</p><p>The tempting "soda is cheaper, so more is better" ignores diminishing marginal utility. Both bundles cost exactly $5, so cost isn't the difference.</p>`);
/* L14 more */
mc('l14-ms-mup','l14','In your course\'s example, the 2nd slice of pizza has a marginal utility of 16 and pizza costs $2 a slice. What is its marginal utility per dollar?',
  [`8`,`16`,`32`,`2`,`10`],0,
  `<p>16 ÷ $2 = <b>8 utils per dollar</b> (your course's slide 11). 16 is the marginal utility before dividing; 32 multiplies; 10 is the 1st slice (20 ÷ 2).</p>`);
gen('l14-g-cost','l14',()=>{
  const p1=pick([3,4,5,6]), p2=pick([1,2]), n=pick([1,2,3]), extra=pick([2,3,4,5]), B=n*p1+extra*p2; const ans=extra;
  return { type:'num', kind:'num', prompt:`Made-up numbers. Kai has <b>${money(B)}</b> for school supplies. Notebooks cost ${money(p1)} each and pens cost ${money(p2)} each. If he buys <b>${n}</b> notebook${n>1?'s':''} and spends the rest on pens, how many pens can he buy?`, answer:ans, unit:'pens',
    explain:`<p>Notebooks cost ${n} × ${money(p1)} = ${money(n*p1)}. That leaves ${money(B)} − ${money(n*p1)} = ${money(B-n*p1)} for pens: ${money(B-n*p1)} ÷ ${money(p2)} = <b>${ans} pens</b>. Every point on his budget line spends exactly ${money(B)}.</p><p>The common slip is dividing the whole budget by the pen price (${fmt(B/p2)}), forgetting the money already spent on notebooks.</p>` };
});
mc('l14-net','l14','Your course textbook\'s José considers moving from point P (4 T-shirts, 0 movies) to point Q (3 T-shirts, 2 movies). He loses the 4th T-shirt\'s 18 utils and gains the first two movies\' 16 and 15 utils. What is the net change in his total utility?',
  [`+13`,`−18`,`+31`,`+2`,`−3`],0,
  `<p>Gain 16 + 15 = 31, lose 18: 31 − 18 = <b>+13</b>. The textbook: "This is just another way of saying that the total utility at Q (94 ...) is 13 more than the total utility at P (81)."</p><p>+31 forgets the T-shirt he gives up; +2 and −3 are the later moves R → S and S → T.</p>`);
tf('l14-tf-equal','l14','At the utility-maximizing bundle, the marginal utility per dollar is the same for each good.',true,
  `<p>True. Your course: at the optimal consumption point, the marginal utility for each dollar spent on soda "is exactly equal to" that for pizza (8 and 8). If one good gave more per dollar, shifting money toward it would raise total utility.</p>`);
mc('l14-slope','l14','Your course textbook\'s José can afford at most 8 movies or 4 T-shirts with his $56. What is the slope of his budget line (T-shirts across, movies up), and what does it mean?',
  [`−2: each T-shirt costs him 2 movies`,`−0.5: each T-shirt costs him half a movie`,`2: each movie costs him 2 T-shirts`,`−8: each T-shirt costs 8 movies`,`−4: each movie costs 4 T-shirts`],0,
  `<p>Rise over run = −8 ÷ 4 = <b>−2</b> (the textbook: "The slope of the budget constraint line is rise/run or –8/4=–2"). A T-shirt ($14) costs as much as two movies ($7 each), so each T-shirt he buys means giving up 2 movies. Lesson 1 showed the same idea with Alphonso's burgers and bus tickets.</p>`);
mc('l14-unspent','l14','Made-up numbers. Ella has $10. After spending $7, the last dollar she spent on each of her two goods gives the same 5 utils. What should she do with the other $3?',
  [`Spend it on whichever good gives more utility per dollar next, since the rule also requires spending the whole budget`,`Nothing: equal marginal utility per dollar means she is already at her best bundle`,`Return one of the goods to get more money back`,`Spend it only on the good with the higher price`,`Save it, because extra units always lower total utility`],0,
  `<p>The rule has two parts: marginal utility per dollar equal <b>and</b> the whole budget spent (a point on the budget line). With $3 left and goods that still add satisfaction, she can raise total utility by buying more.</p><p>The tempting "already at her best bundle" checks only the first part. Points inside the budget line leave satisfaction on the table.</p>`);
lazy('l14-gr-mup','l14',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. The bars show the marginal utility per dollar of the <b>next</b> unit of each good Mia could buy:${hbars([['Next coffee ($3)',6],['Next muffin ($2)',4],['Next juice ($4)',3]], { max:7, left:130, fmt:v=>v+' utils per $' })}She has money left. Which should she buy next?`,
  options:[`The coffee, because it gives the most utility per dollar`,`The juice, because it costs the most`,`The muffin, because it is the cheapest`,`The juice, because its total utility is highest`,`None of them, because their marginal utilities are diminishing`], answer:0,
  explain:`<p>Spend the next dollars where they buy the most satisfaction: the coffee gives 6 utils per dollar, more than the muffin (4) or juice (3). Your course textbook's José does the same: "José will continue to purchase the good which gives him the highest marginal utility per dollar until he exhausts the budget."</p><p>Price alone doesn't decide it, and diminishing marginal utility doesn't mean stop: each still adds utility.</p>` }));
gen('l14-g-move','l14',()=>{
  let s, c; do{ s=pick([14,16,18,20,22,24]); const c1=pick([8,9,10]); c=[c1, c1-pick([1,2]), 0, 0]; c[2]=c[1]-pick([1,2]); c[3]=Math.max(1,c[2]-pick([1,2])); } while(c.reduce((a,b)=>a+b,0)===s);
  const gain=c.reduce((a,b)=>a+b,0), ans=gain-s;
  return { type:'num', kind:'num', prompt:`Made-up numbers. Noah gives up his last sandwich, which costs $4 and had a marginal utility of <b>${s} utils</b>. He spends the $4 on 4 cookies at $1 each, with marginal utilities of <b>${c.join(', ')}</b> utils. By how much does his total utility change? (Use a minus sign for a fall.)`, answer:ans, unit:'utils',
    explain:`<p>Gain from cookies: ${c.join(' + ')} = ${gain}. Loss from the sandwich: ${s}. Net change: ${gain} − ${s} = <b>${ans>0?'+':''}${ans} utils</b>. ${ans>0?'The trade raises his total utility, so the sandwich was the worse buy per dollar.':'The trade lowers his total utility, so he should keep the sandwich.'}</p><p>The common slip is answering ${gain > 0 ? '+' : ''}${gain}, which counts only the cookies: every move along a budget line gives up one thing to get another. This is your course textbook's step-by-step method with José.</p>` };
});
mc('l14-cons-eq','l14','Your course textbook calls the utility-maximizing choice the <b>consumer equilibrium</b>. Which of the following holds there?',
  [`P₁ ÷ P₂ = MU₁ ÷ MU₂`,`P₁ = P₂`,`MU₁ = MU₂`,`P₁ × MU₁ = P₂ × MU₂`,`MU₁ = MU₂ = 0`],0,
  `<p>The textbook: "the ratio of the prices of the two goods should be equal to the ratio of the marginal utilities." For José: $14 ÷ $7 = 2 = 22 ÷ 11. It is the same rule as MU₁ ÷ P₁ = MU₂ ÷ P₂, rearranged.</p><p>The tempting "MU₁ = MU₂" holds only if the prices happen to be equal.</p>`);
tf('l14-tf-ratio','l14','At the utility-maximizing choice, the ratio of the two goods\' prices equals the ratio of their marginal utilities.',true,
  `<p>True. Your course textbook calls this the consumer equilibrium: P₁ ÷ P₂ = MU₁ ÷ MU₂. In your course's example: $2 ÷ $1 = 16 ÷ 8 = 2.</p>`);
mc('l14-why44','l14','In your course\'s example, at 1 soda and 2 slices of pizza the last soda gives 8 ÷ $1 = 8 utils per dollar and the last slice gives 16 ÷ $2 = 8. What does this equality tell you?',
  [`No shift of spending between soda and pizza can raise total utility, so this is the best bundle`,`Soda and pizza give the same total utility`,`Soda and pizza have the same marginal utility`,`The consumer should buy more pizza`,`The consumer should buy more soda`],0,
  `<p>Equal utility per dollar on the last unit of each good, with the whole $5 spent, means any dollar moved from one good to the other would lose about as much as it gains (in fact, here every move loses). That's why your course finds 44 utils, the highest total.</p><p>The tempting "same marginal utility" is wrong: 16 versus 8. It's the utility <b>per dollar</b> that matches.</p>`);
mc('l14-first','l14','Your course textbook\'s José chooses one purchase at a time. A movie\'s first unit gives 16 utils for $7 and a T-shirt\'s first unit gives 22 utils for $14. Which does he buy first, and why?',
  [`A movie, because 16 ÷ $7 ≈ 2.3 utils per dollar beats 22 ÷ $14 ≈ 1.6`,`A T-shirt, because 22 utils is more than 16`,`A T-shirt, because it costs more`,`A movie, because it has the higher marginal utility`,`Either one, because both have positive marginal utility`],0,
  `<p>The textbook: "José's first purchase will be a movie. Why? Because it gives him the highest marginal utility per dollar and it is affordable."</p><p>The tempting "22 utils is more" compares marginal utility without prices. "A movie has the higher marginal utility" gets the choice right for the wrong reason: 16 is less than 22.</p>`);
mc('l14-cheap','l14','Made-up numbers. A $1 snack gives 6 utils; a $4 sandwich gives 16 utils. Which gives more satisfaction per dollar?',
  [`The snack: 6 utils per dollar versus 4 for the sandwich`,`The sandwich, because 16 utils is more than 6`,`They give the same, because both are food`,`The sandwich: 16 utils per dollar`,`Neither; you can\'t compare goods with different prices`],0,
  `<p>Snack: 6 ÷ $1 = 6. Sandwich: 16 ÷ $4 = 4. The snack wins per dollar, even though the sandwich gives more satisfaction in total.</p>`);
tf('l14-tf-all','l14','Spending your whole budget on your favorite good gives you the highest possible total utility.',false,
  `<p>False. Because of diminishing marginal utility, the last units of any one good add little. In your course's example, all soda gives 30 utils; a mix gives 44. Your course textbook's José does best with a mix too (103 utils, versus 100 for all movies and 81 for all T-shirts).</p>`);
mc('l14-why-converge','l14','When a consumer shifts spending toward the good with the higher marginal utility per dollar, why does the advantage eventually disappear?',
  [`Buying more of it lowers its marginal utility, and buying less of the other good raises that good\'s marginal utility`,`The price of the good rises as she buys more`,`Her budget grows as she shifts spending`,`Total utility turns negative`,`The other good becomes free`],0,
  `<p>Diminishing marginal utility works on both goods: more of A means a smaller MU<sub>A</sub>; less of B means you're back to B's more valuable units, so MU<sub>B</sub> is higher. The two utilities per dollar move toward each other until they're equal. Prices and the budget stay the same the whole time.</p>`);
lazy('l14-gr-points','l14',()=>({ type:'mc', kind:'graph',
  prompt:`Your course textbook's José: $56, T-shirts $14, movies $7.${gchart2({ xmax:5, ymax:9, xlab:'T-shirts ($14)', ylab:'Movies ($7)', xt:[0,1,2,3,4], yt:[0,2,4,6,8], aria:'José budget line with points S and V',
    body:(X,Y)=>({ under: gline([[0,8],[4,0]],X,Y,'var(--accent)','',2.6), over: gdot(X,Y,1,6,'S') + gdot(X,Y,2,6,'V','var(--g1)') }) })}Point V is 2 T-shirts and 6 movies. Why can't José choose it?`,
  options:[`It costs $70, more than his $56`,`It gives less total utility than S`,`It costs less than $56, so money is left over`,`Its marginal utilities per dollar are equal`,`T-shirts have diminishing marginal utility`], answer:0,
  explain:`<p>2 × $14 + 6 × $7 = $28 + $42 = <b>$70</b>, beyond his $56: V lies outside the budget line. He might well like V more than S; he just can't pay for it.</p><p>The tempting "less total utility" is the wrong test: utility only ranks bundles he can afford.</p>` }));

/* ===== Lesson 14 quick checks ===== */
mc('l14c-budget','l14','Made-up numbers. Sofia has $12. Notebooks cost $3 and pens $2. Which bundle is on her budget line?',
  [`2 notebooks and 3 pens`,`3 notebooks and 3 pens`,`1 notebook and 3 pens`,`4 notebooks and 1 pen`,`0 notebooks and 4 pens`],0,
  `<p>2 × $3 + 3 × $2 = $12, exactly her budget. 3 notebooks + 3 pens costs $15 (too much); 1 + 3 costs $9 and 0 + 4 costs $8 (money left); 4 + 1 costs $14.</p>`);
mc('l14c-tu','l14',`Your course's pizza and soda:${psMUTbl()}What is the total utility of 5 cans of soda and no pizza?`,
  [`30`,`4`,`8`,`40`,`44`],0,
  `<p>8 + 7 + 6 + 5 + 4 = <b>30 utils</b>, your course's first option. 4 is only the 5th can; 44 is the best bundle.</p>`);
mc('l14c-rule','l14','Made-up numbers. Jay\'s last dollar on games gives him 3 utils and his last dollar on snacks gives him 5 utils. What should he do?',
  [`Spend a little less on games and a little more on snacks`,`Spend more on games, since he likes them`,`Nothing, since both give positive utility`,`Stop buying snacks`,`Spend more on both`],0,
  `<p>Snacks give more per dollar (5 versus 3), so moving a dollar from games to snacks raises his total utility. He should keep shifting until the two are equal.</p>`);
mc('l14c-next','l14','Made-up numbers. With money left, Zoe can buy a next song (4 utils, $1) or a next video ($3, 9 utils). Which gives more utility per dollar?',
  [`The song: 4 per dollar versus 3`,`The video: 9 utils versus 4`,`They are equal`,`The video: 3 per dollar versus 0.25`,`Neither, because both have diminishing marginal utility`],0,
  `<p>Song: 4 ÷ $1 = 4 per dollar. Video: 9 ÷ $3 = 3 per dollar. The song is the better next buy per dollar.</p>`);
mc('l14c-jose','l14','Your course textbook\'s José is at point R: 2 T-shirts and 4 movies. His 2nd T-shirt gives 21 utils ($14) and his 4th movie 13 utils ($7). What should he do?',
  [`Trade a T-shirt for 2 more movies, because movies give more utility per dollar (1.86 versus 1.5)`,`Trade 2 movies for another T-shirt, because a T-shirt gives more utility (21 versus 13)`,`Stay at R, because both goods give positive utility`,`Buy more of both`,`Stop buying movies`],0,
  `<p>T-shirt: 21 ÷ 14 = 1.5 utils per dollar. Movie: 13 ÷ 7 ≈ 1.86. Movies are the better buy, so he moves to S (1 T-shirt, 6 movies), raising total utility from 101 to 103.</p>`);
mc('l14c-skill','l14','Made-up numbers. Last cup of tea: MU 9, price $3. Last scone: MU 8, price $2. Which way should spending move?',
  [`More scones and less tea, because scones give 4 utils per dollar versus 3`,`More tea and fewer scones, because tea has the higher marginal utility`,`Neither; the mix is already the best`,`More of both`,`Less of both`],0,
  `<p>Tea: 9 ÷ 3 = 3 per dollar. Scone: 8 ÷ 2 = 4 per dollar. Shift toward scones.</p>`);

/* Course materials checked 2026-10-27: video 3.1 transcript ($5, pizza $2, soda $1; bundles 30, 41, 44; MU per dollar 8 = 8), Module 3 slides 6-11,
   course textbook §6.1 (budget constraint, José Tables 6.2-6.5, MU per dollar, utility-maximizing rule, consumer equilibrium).
   Source problems noted in the lesson: slides 8-9 print the 1-soda-2-pizza bundle as (9) + (20 + 16) = 45; slide 10 and the video give 44.
   Textbook Table 6.4 prints "31 from 0 movies" for point Q (2 movies); Table 6.5 prints the 7th T-shirt as 12/$14 = 1.2 (it is 0.86). */
const L14TAGS = {
  'l14-rule':['MS3 OS61 CED16','max','terms','M2 M3 M1'], 'l14-g-mup':['OS61 MS3','max','data','M1'], 'l14-which-more':['OS61 MS3','max','models','M4'],
  'l14-bundle-tu':['MS3','max','data','M1'], 'l14-best':['OS61 MS3','max','data','M1 M5 M6'], 'l14-tf-highmu':['MS3 OS61','max','terms','M1'],
  'l14-gr-budget':['MS3 OS61','max','graphs','M6'], 'l14-g-opt':['OS61 MS3','max','data','M1'], 'l14-equal-mu':['MS3 OS61','max','models','M2 M3'],
  'l14-jose':['OS61','max','data','M2 M1'], 'l14-tf-mu-zero':['MS3 OS61','max','terms','M3'], 'l14-corner':['MS3 OS61','max','models','M5'],
  'l14-ms-mup':['MS3','max','data','M1'], 'l14-g-cost':['OS61 OS21','max','data','M6'], 'l14-net':['OS61','max','data','M1'],
  'l14-tf-equal':['MS3 OS61','max','terms','M2'], 'l14-slope':['OS61 OS21','max','graphs','M1'], 'l14-unspent':['OS61','max','models','M6'],
  'l14-gr-mup':['OS61','max','graphs','M1'], 'l14-g-move':['OS61','max','data','M4'], 'l14-cons-eq':['OS61','max','terms','M2'],
  'l14-tf-ratio':['OS61 MS3','max','terms','M2'], 'l14-why44':['MS3','max','models','M2 M4'], 'l14-first':['OS61','max','models','M1'],
  'l14-cheap':['OS61','max','data','M1'], 'l14-tf-all':['MS3 OS61','max','terms','M5'], 'l14-why-converge':['OS61 MS3','max','models','M4'],
  'l14-gr-points':['OS61 OS21','max','graphs','M6'],
  'l14c-budget':['OS61 OS21','max','data','M6'], 'l14c-tu':['MS3','max','data','M1'], 'l14c-rule':['OS61','max','models','M4'],
  'l14c-next':['OS61','max','data','M1'], 'l14c-jose':['OS61','max','data','M1'], 'l14c-skill':['OS61','max','models','M1 M4']
};
u3tag(L14TAGS);

U3_CARDS.l14 = [
  ['Optimal consumption bundle','What is the optimal consumption bundle?','The affordable combination of goods that gives the highest total utility. Your course: the point "where he reaches the highest level of total utility."','$5, pizza $2, soda $1: 1 soda and 2 slices (44 utils) beats 3 sodas and 1 slice (41) and 5 sodas (30).','It must be affordable; a bundle outside the budget line doesn\'t count.'],
  ['Marginal utility per dollar','What is marginal utility per dollar, and how do you calculate it?','A unit\'s marginal utility divided by its price: how much extra satisfaction each dollar spent on it buys.','2nd slice of pizza: 16 utils ÷ $2 = 8 utils per dollar.','Divide by the price; don\'t multiply.'],
  ['Utility-maximizing rule','What is the rule for getting the most total utility from a budget?','Spend the whole budget so that MU₁ ÷ P₁ = MU₂ ÷ P₂: the last dollar on each good gives the same marginal utility.','Course: last soda 8 ÷ $1 = 8, last slice 16 ÷ $2 = 8.','Not MU₁ = MU₂; prices matter.'],
  ['Why equal MU per dollar is best','Why can\'t a consumer do better once MU per dollar is equal?','If one good gave more per dollar, moving a dollar toward it would gain more than it loses. Diminishing marginal utility closes the gap as she shifts, and once they\'re equal no shift helps.','Books 6 per $ versus movies 4 per $: move money to books until they match.','Buy more of the good with the higher MU per dollar, not less.'],
  ['Two conditions','What two conditions describe the best bundle?','1) It is on the budget line (the whole budget is spent). 2) Marginal utility per dollar is equal across goods.','Equal MU per dollar with $3 still unspent is not the best bundle.','Checking only one condition is a common trap.'],
  ['Consumer equilibrium','What is consumer equilibrium in your course textbook?','The utility-maximizing choice, where the ratio of prices equals the ratio of marginal utilities: P₁ ÷ P₂ = MU₁ ÷ MU₂.','José: $14 ÷ $7 = 2 = 22 ÷ 11 at 1 T-shirt and 6 movies.','It\'s the same rule as MU₁ ÷ P₁ = MU₂ ÷ P₂, rearranged.'],
  ['Method 1: add up total utility','How do you find the best bundle by adding up total utility?','List the bundles that spend the whole budget, add the marginal utilities of every unit in each, and pick the highest total.','Course: 5 sodas = 30; 3 sodas + 1 slice = 41; 1 soda + 2 slices = 44.','Count only affordable bundles.'],
  ['Method 2: one purchase at a time','How does the dollar-by-dollar method work?','Buy the unit that gives the most marginal utility per dollar, then repeat until the budget is gone.','José buys a movie first: 16 ÷ $7 ≈ 2.3 beats 22 ÷ $14 ≈ 1.6.','Compare per dollar, not marginal utility alone.'],
  ['Higher MU isn\'t a better buy','Does the good with the higher marginal utility always deserve the next dollar?','No. A pricier good must give proportionally more utility. Compare marginal utility per dollar.','Taxi 50 utils for $20 (2.5 per $) versus bus 10 utils for $2 (5 per $): the bus is the better buy.','Your course textbook: pay twice as much only for twice the marginal utility.'],
  ['Why mixes beat corners','Why does spending everything on one good usually give less utility?','Diminishing marginal utility makes the last units of any one good add little; the same money buys more satisfaction from the first units of another good.','Course: all soda 30 utils versus a mix 44.','"More of the cheap good" isn\'t automatically better.'],
  ['José\'s choice','What is José\'s best choice in your course textbook, and how can you check it?','1 T-shirt and 6 movies (point S, 103 utils). Check: 22 ÷ $14 ≈ 1.57 = 11 ÷ $7 ≈ 1.57; and each move P → Q → R → S raised utility (+13, +7, +2) while S → T lowered it (−3).','$56 budget, T-shirts $14, movies $7.','The textbook\'s Table 6.5 shows the 7th T-shirt as 1.2 per dollar; it\'s 12 ÷ 14 ≈ 0.86.'],
  ['Budget line review','What does the budget line show in this lesson, and what is its slope?','Every bundle that spends the whole budget. Slope = −(price of the good across ÷ price of the good up): what one more of the horizontal good costs in the other.','José: −$14 ÷ $7 = −2, so each T-shirt costs 2 movies.','A point outside the line isn\'t affordable, however much utility it would give.']
];

Object.assign(U3_WRITE, {
  'w-l14-1':{lesson:'l14',prompt:'Using your course\'s pizza and soda example ($5, pizza $2, soda $1), explain why 1 soda and 2 slices of pizza is the best bundle. Show it two ways: by total utility and by marginal utility per dollar.',
    model:'The bundles that spend exactly $5 are 5 sodas (8 + 7 + 6 + 5 + 4 = 30 utils), 3 sodas and 1 slice (21 + 20 = 41) and 1 soda and 2 slices (8 + 20 + 16 = 44). 1 soda and 2 slices gives the highest total, 44. The marginal utility per dollar check agrees: the last soda gives 8 ÷ $1 = 8 utils per dollar and the second slice gives 16 ÷ $2 = 8 utils per dollar. Because the last dollar on each good gives the same utility and the whole budget is spent, no shift between soda and pizza can raise total utility.',
    checklist:['Lists the affordable bundles with correct total utilities (30, 41, 44)','Identifies 1 soda and 2 slices as the best bundle','Computes marginal utility per dollar for the last unit of each good (8 and 8)','Explains that equal MU per dollar with the budget spent means no shift can raise total utility']},
  'w-l14-2':{lesson:'l14',prompt:'Explain in your own words why a consumer should make the marginal utility per dollar equal across goods. Use an example where it starts out unequal and say what the consumer should do.',
    model:'Marginal utility per dollar shows how much extra satisfaction a dollar buys from each good. Suppose my last dollar on coffee gives 6 utils and my last dollar on snacks gives 3. If I move a dollar from snacks to coffee, I lose about 3 utils and gain about 6, so my total utility rises. As I buy more coffee its marginal utility falls, and as I buy fewer snacks their marginal utility rises, so the two numbers move toward each other. Once the last dollar on each gives the same utility, and I\'ve spent my whole budget, moving money either way can\'t make me better off. That is the utility-maximizing bundle.',
    checklist:['Defines marginal utility per dollar as MU ÷ price','Gives an example with unequal MU per dollar and says to shift spending toward the higher one','Explains that diminishing marginal utility closes the gap','States that the best bundle has equal MU per dollar and spends the whole budget']}
});

U3_PLAN.l14 = {
  core:['l14-rule','l14-g-mup','l14-which-more','l14-bundle-tu','l14-best','l14-tf-highmu','l14-gr-budget','l14-g-opt','l14-equal-mu','l14-jose','l14-tf-mu-zero','l14-corner'],
  more:['l14-ms-mup','l14-g-cost','l14-net','l14-tf-equal','l14-slope','l14-unspent','l14-gr-mup','l14-g-move','l14-cons-eq','l14-tf-ratio','l14-why44','l14-first','l14-cheap','l14-tf-all','l14-why-converge','l14-gr-points']
};

U3_LESSONS.push({ id:'l14', unit:3, title:'Utility Maximization: Marginal Utility per Dollar', mins:45, src:'Modern States video 3.1 (middle part) and Module 3 slides 6-11 · Course textbook (OpenStax) §6.1',
  sources:['MS3','OS61','CB','CED16','ELM'],
  oneline:'With a limited budget, you get the most total utility by spending so that the last dollar on each good buys the same extra satisfaction: equal marginal utility per dollar.',
  body:`
<p>Lesson 13 measured how much satisfaction each unit adds. Lesson 1's ${dt('budget-constraint','budget line')} showed what a person can afford. This lesson puts the two together: with a fixed budget, which combination of goods gives the most ${dt('total-utility','total utility')}?</p>

<h2>A budget and two goods</h2>
<!-- src: MS3 (video 3.1: "a consumer that has a choice between the consumption of two goods, and he has a given budget"; "$5 budget to spend on pizza and soda ... pizza costs two dollars, and soda costs one dollar"; slides 6-7); OS61 ("The budget constraint line shows the various combinations of two goods that are affordable given consumer income"); OS21 (budget line review) -->
<p>Your course's problem: you have "a five dollar budget to spend on pizza and soda." Pizza costs $2 a slice and soda costs $1 a can. Your course textbook: the budget line "shows the various combinations of two goods that are affordable given consumer income."</p>
<div class="math">Cost of a bundle = $1 × (cans of soda) + $2 × (slices of pizza) ≤ $5</div>
${FIG3.l14budget()}
<p>Your course's question: "What combination of the two goods should he consume to maximize his level of satisfaction?" Its answer: "the optimal consumption point is going to come at the point where he reaches the highest level of total utility." That point is the ${dt('optimal-bundle','<b>optimal consumption bundle</b>')}. It always sits <b>on</b> the line: a point inside leaves money that could buy more satisfaction, and a point outside can't be paid for.</p>
<div data-check="l14c-budget"></div>

<h2>Method 1: add up total utility</h2>
<!-- src: MS3 (video 3.1: all five dollars on soda = 30 utils; three dollars on soda... "three cans of soda, and one slice of pizza" = 41; one can and two slices = 44; slides 7-10). Source problem: slides 8 and 9 print the third bundle as (9) + (20 + 16) = 45; the video and slide 10 give 44. -->
<p>Your course lists each unit's ${dt('marginal-utility','marginal utility')}:</p>
${psMUTbl()}
<p><b>Worked example: your course's three bundles.</b> Add the marginal utilities of every unit in the bundle (Lesson 13: total utility is the sum of the marginal utilities).</p>
<div class="math">5 sodas, 0 pizza ($5): 8 + 7 + 6 + 5 + 4 = <b>30 utils</b><br>3 sodas, 1 slice ($3 + $2): (8 + 7 + 6) + 20 = <b>41 utils</b><br>1 soda, 2 slices ($1 + $4): 8 + (20 + 16) = <b>44 utils</b></div>
${FIG3.l14totals()}
<p>Check: all three cost exactly $5, and the winner, 44, mixes both goods. Spending everything on soda wastes money on the 4th and 5th cans, which add only 5 and 4 utils.</p>
<div data-check="l14c-tu"></div>

<h2>Method 2: marginal utility per dollar</h2>
<!-- src: MS3 (video 3.1: soda MU 8 ÷ $1 = 8; second slice 16 ÷ $2 = 8; "the marginal utility for each dollar that we spent on soda is exactly equal to the marginal utility for each dollar that we spent on pizza"; slide 11); OS61 (marginal utility per dollar = MU ÷ price; "the utility-maximizing choice between consumption goods occurs where the marginal utility per dollar is the same for both goods"; "A sensible economizer will pay twice as much for something only if, in the marginal comparison, the item confers twice as much utility"); CED16 (CBA-2.A.4: the marginal utility of the last dollar spent on each good); ELM (Rhoads: "sensible choice requires comparing marginal utilities and marginal costs") -->
<p>Adding up every bundle works for two goods and $5. Real shoppers need a shortcut. Divide each unit's marginal utility by its price to get its ${dt('mu-per-dollar','<b>marginal utility per dollar</b>')}: how much satisfaction one dollar buys.</p>
<div class="math">Marginal utility per dollar = marginal utility ÷ price</div>
${FIG3.l14mup()}
<p>At your course's best bundle, the last soda gives 8 ÷ $1 = 8 utils per dollar and the second slice gives 16 ÷ $2 = 8. Your course: at the optimum, "the marginal utility for each dollar that we spent on soda is exactly equal to the marginal utility for each dollar that we spent on pizza." That's the ${dt('utility-max-rule','<b>utility-maximizing rule</b>')}:</p>
<div class="math">MU<sub>soda</sub> ÷ P<sub>soda</sub> = MU<sub>pizza</sub> ÷ P<sub>pizza</sub>, with the whole budget spent<br>8 ÷ $1 = 16 ÷ $2 = <b>8</b></div>
<p><b>Why it works:</b> if one good gives more per dollar, moving a dollar toward it gains more than it loses. Diminishing marginal utility then closes the gap.</p>
${FIG3.l14flow()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>At a supermarket with two open checkout lanes, people leave the long line for the short one. That makes the short line longer and the long line shorter, and switching stops once the waits are equal. Your dollars behave the same way: they move toward the good with more satisfaction per dollar until both give the same.</p></div>
${FIG3.l14lanes()}
<p><b>So what:</b> notice that pizza's marginal utility (16) is <b>twice</b> soda's (8), because pizza costs twice as much. Your course textbook: "A sensible economizer will pay twice as much for something only if, in the marginal comparison, the item confers twice as much utility." Comparing marginal utilities without prices is the most common trap here.</p>
<p>Try it: move along the budget line and watch both numbers. The textbook's José example (next sections) is there too.</p>
<div data-widget="bundle"></div>
<p>What to notice: total utility is highest exactly where the two utility-per-dollar numbers match. Everywhere else, the message tells you which way to move, and moving that way raises the bar.</p>
<div data-check="l14c-rule"></div>

<h2>Spending one purchase at a time</h2>
<!-- src: OS61 ("José's first purchase will be a movie. Why? Because it gives him the highest marginal utility per dollar and it is affordable. José will continue to purchase the good which gives him the highest marginal utility per dollar until he exhausts the budget"); MS3 (data, slides 11 and 13-18 for the $1 price) -->
<p>Your course textbook describes a third way that people actually shop: buy whichever unit gives the most marginal utility per dollar, then repeat "until he exhausts the budget." Step through it with your course's numbers:</p>
<div data-widget="shopper"></div>
<p>What to notice: spending one purchase at a time lands on the same bundle as adding up totals (1 soda and 2 slices at $2), and it ends with equal utility per dollar. Switch to $1 pizza for a preview of Lesson 15: the best bundle changes when a price changes.</p>
<div data-check="l14c-next"></div>

<h2>Your course textbook's example: José</h2>
<!-- src: OS61 (José $56, T-shirts $14, movies $7; intercepts 8 and 4; slope −2; Tables 6.2-6.5; step-by-step gains 13, 7, 2, −3; "This step-by-step approach will reach the same conclusion regardless of José's starting point"; 22 is "exactly twice" 11; consumer equilibrium "the ratio of the prices of the two goods should be equal to the ratio of the marginal utilities"). Source problems: Table 6.4 prints "31 from 0 movies" at Q (2 movies); Table 6.5 prints the 7th T-shirt as 12/$14 = 1.2 (it is 0.86); neither changes the result. -->
<p>José has $56. T-shirts cost $14 and movies $7, so he can afford at most 4 T-shirts or 8 movies, and each T-shirt costs him 2 movies (the budget line's slope is −2). His marginal utilities:</p>
${joseMUTbl()}
<p><b>The step-by-step test.</b> Start at P (4 T-shirts, no movies). Trading the 4th T-shirt (−18) for two movies (+16 + 15) gains 13 utils. Keep trading one T-shirt for two movies while the trade pays:</p>
<div class="math">P → Q: −18 + (16 + 15) = <b>+13</b><br>Q → R: −20 + (14 + 13) = <b>+7</b><br>R → S: −21 + (12 + 11) = <b>+2</b><br>S → T: −22 + (10 + 9) = <b>−3</b> → stop at S</div>
${FIG3.l14jose()}
<p>Check with the rule at S (1 T-shirt, 6 movies): 22 ÷ $14 ≈ 1.57 and 11 ÷ $7 ≈ 1.57 utils per dollar. The textbook: "the marginal utility from the first T-shirt, of 22 is exactly twice the marginal utility of the sixth movie, which is 11," just as a T-shirt costs twice as much. The textbook also writes the rule as a ratio, the ${dt('consumer-equilibrium','<b>consumer equilibrium</b>')}:</p>
<div class="math">P<sub>T-shirt</sub> ÷ P<sub>movie</sub> = MU<sub>T-shirt</sub> ÷ MU<sub>movie</sub><br>$14 ÷ $7 = 22 ÷ 11 = <b>2</b></div>
<p>All three methods agree, and the textbook adds that the step-by-step approach "will reach the same conclusion regardless of José's starting point." <span class="small muted">(Two small typos in the textbook's tables: Table 6.4 lists point Q as "31 from 0 movies," which should read 2 movies, and Table 6.5 gives the 7th T-shirt as 12 ÷ $14 = 1.2 utils per dollar; it's about 0.86. Neither changes José's choice.)</span></p>
<div data-check="l14c-jose"></div>

<h2>Which way should spending move?</h2>
<!-- src: OS61 (MU per dollar comparison and its direction). Exam skill: computing MU ÷ P for two goods and deciding which way to shift spending. -->
<p>The CLEP's favorite version of this lesson gives two goods' marginal utilities and prices and asks what the consumer should do. The move: divide each marginal utility by its price, then shift spending toward the bigger number.</p>
<div data-widget="mupsort"></div>
<div data-check="l14c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L14TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Buy more of the good with the higher marginal utility."</span>Compare marginal utility <b>per dollar</b>. A taxi ride worth 50 utils for $20 is a worse buy than a bus ride worth 10 utils for $2.</li>
<li><span class="wrong">"At the best bundle, the two goods' marginal utilities are equal."</span>Their marginal utilities <b>per dollar</b> are equal. Pizza's last slice gives 16 and the last soda 8, because pizza costs twice as much.</li>
<li><span class="wrong">"Keep buying each good until its marginal utility reaches zero."</span>The budget runs out first. With limited money, stop where the last dollar on each good gives the same utility.</li>
<li><span class="wrong">"If a good gives more utility per dollar, buy less of it."</span>Buy <b>more</b> of it (and less of the other); its marginal utility then falls until the two match.</li>
<li><span class="wrong">"Spending everything on your favorite good gives the most utility."</span>Diminishing marginal utility makes the last units of any one good add little. All soda gives 30 utils; a mix gives 44.</li>
<li><span class="wrong">"Equal utility per dollar is enough, even with money left over."</span>The best bundle also spends the whole budget: it lies on the budget line.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>The <b>optimal consumption bundle</b> is the affordable combination with the highest total utility; it lies on the budget line.</li>
<li>Method 1: add up <b>total utility</b> for each bundle that spends the budget, and pick the highest (your course: 44 utils at 1 soda and 2 slices).</li>
<li>Method 2: the <b>utility-maximizing rule</b>, MU₁ ÷ P₁ = MU₂ ÷ P₂ with the budget spent. Shift spending toward the good with more <b>marginal utility per dollar</b> until they match.</li>
<li>Buying one unit at a time, always the best buy per dollar, reaches the same bundle.</li>
<li>Your course textbook's José: 1 T-shirt and 6 movies, where 22 ÷ $14 = 11 ÷ $7; written as a ratio, P₁ ÷ P₂ = MU₁ ÷ MU₂ is the <b>consumer equilibrium</b>.</li>
<li>On the exam: divide each marginal utility by its price, then move spending toward the larger number.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Utility maximization: equalizing marginal utility per dollar" under Theory of consumer choice (5% to 10% of the exam). Expect a table of marginal utilities with prices and a budget, asking for the best bundle, or two goods' MU and prices, asking which way the consumer should shift spending.</p>
</div>`,
  deeper:`
<h3>More than two goods</h3>
<p>The rule extends to any number of goods: MU₁ ÷ P₁ = MU₂ ÷ P₂ = MU₃ ÷ P₃, and so on. The AP framework describes it as comparing "the marginal utility of the last dollar spent on each good."</p>
<h3>The "Washington Monument" strategy</h3>
<p>Your course textbook asks about agencies facing a budget cut that threaten to close a popular attraction like the Washington Monument, and calls the tactic misleading. Marginal thinking says a sensible cut drops what has the <b>lowest</b> marginal utility per dollar, not the most valued and visible item.</p>
<h3>Whole units</h3>
<p>With some budgets, whole slices can't make the per-dollar numbers exactly equal. Then the best bundle is simply the one with the highest total utility; your course's examples are built to come out equal.</p>`,
  links:[ {k:'Textbook',t:'6.1 Consumption Choices',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/6-1-consumption-choices',w:'José\'s full example, with the three ways of finding his best choice.'},
          {k:'Exam',t:'CLEP Principles of Microeconomics outline',s:'College Board',u:'https://clep.collegeboard.org/exam/microeconomics',w:'See where "Utility maximization: equalizing marginal utility per dollar" sits in the exam outline.'} ]
});
