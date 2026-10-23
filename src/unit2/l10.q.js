/* ===== Lesson 10: Income and Cross-Price Elasticity (Modern States video 2.2c) =====
   Common mistakes: M1 inferior means low quality · M2 negative cross-price elasticity means substitutes
   M3 the price on the bottom is the good's own price · M4 every normal good is a luxury
   M5 the sign doesn't matter (as with price elasticity of demand) · M6 a cross-price elasticity near zero means complements */
mc('l10-ied-def','l10','The <b>income elasticity of demand</b> is calculated as which of the following?',
  [`The percentage change in quantity demanded divided by the percentage change in income`,`The percentage change in income divided by the percentage change in quantity demanded`,`The percentage change in quantity demanded divided by the percentage change in price`,`The change in income divided by the price of the good`,`The percentage change in price divided by the percentage change in income`],0,
  `<p>Your course textbook: "the income elasticity of demand is the percentage change in quantity demanded divided by the percentage change in income." Your course: "by how much does quantity demanded respond to a change in income?"</p><p>The tempting wrong answer puts price on the bottom: that is the <b>price</b> elasticity of demand from Lesson 9. Here the thing that changes is income.</p>`);
gen('l10-g-ied','l10',()=>{
  const i1=pick([30000,40000,50000,60000]), i2=i1+pick([5000,10000]), q1=pick([4,6,8,10,12]); const up=Math.random()<0.6; const q2=up?q1+pick([1,2,3]):q1-pick([1,2]);
  const e=midE(q1,q2,i1,i2), ans=round(e,2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. When a household\'s income rises from ${money(i1)} to ${money(i2)} a year, its monthly purchases of takeout meals change from ${q1} to ${q2}. Using the midpoint method, what is the income elasticity of demand? (Keep the sign; round to two decimals.)`,
    answer:ans, unit:'',
    explain:`<p>%Δ quantity = (${q2} − ${q1}) ÷ ${(q1+q2)/2} = ${fmt((q2-q1)/((q1+q2)/2)*100)}%. %Δ income = ${money(i2-i1)} ÷ ${money((i1+i2)/2)} = ${fmt((i2-i1)/((i1+i2)/2)*100)}%.</p><p>Income elasticity = <b>${fmt(ans)}</b>. ${ans>0?`Positive, so takeout is a <b>normal good</b> for this household${ans>1?', and greater than 1 (income elastic)':''}.`:'Negative, so takeout is an <b>inferior good</b> for this household: they buy less as income rises.'}</p><p>Unlike Lesson 9, <b>keep the sign</b>: it is the whole point here.</p>` };
});
mc('l10-inferior-sign','l10','A study finds that the income elasticity of demand for bus travel is −0.6. Which of the following is true?',
  [`Bus travel is an inferior good: as incomes rise, people take fewer bus trips`,`Bus travel is a normal good, because the number is less than 1`,`Bus travel is a luxury`,`Bus travel has inelastic price demand`,`Bus travel is a complement to income`],0,
  `<p>A <b>negative</b> income elasticity means quantity demanded falls as income rises: an inferior good. Your course textbook: "When the income elasticity of demand is negative, the good is called an inferior good." Econlib's Henderson names "urban mass transit and railroad transportation" as classic inferior goods, since people with more income often drive or fly instead.</p><p>The tempting wrong answer reads only the size (0.6). For income elasticity the sign decides normal versus inferior; this is about income, not price.</p>`);
mc('l10-magic','l10','In your course\'s example, a 23-year-old\'s income rises from $45,000 to $50,000, and his Magic Hat purchases rise from 5 to 9 a month. His income elasticity of demand is about 5.43. Which of the following is true?',
  [`Magic Hat is a normal good for him, and his demand is very responsive to income`,`Magic Hat is an inferior good, because he buys more`,`Magic Hat is a normal good with income elasticity below 1`,`Magic Hat has elastic price demand`,`The calculation must be wrong, because elasticities can\'t exceed 1`],0,
  `<p>%Δ quantity = 4 ÷ 7 = 57.1%; %Δ income = 5,000 ÷ 47,500 = 10.5%; 0.5714 ÷ 0.1053 = <b>5.43</b> (unrounded). Positive means <b>normal</b>; above 1 means purchases grow much faster than income. Your course calls this "an elastic good"; economists also say "income elastic."</p><p>The tempting "price elastic" mixes this up with Lesson 9. This number tells you how purchases respond to <b>income</b>, not to Magic Hat's price.</p>`);
tf('l10-tf-inferior','l10','An inferior good is a good of low quality.',false,
  `<p>False. "Inferior" describes how demand responds to income: people buy less of it when their income rises. Your course's examples (ramen, cheap beer, gas-station coffee) are bought less as income rises, whatever their quality. A good can be well made and still be inferior if people switch away from it when they can afford something else.</p>`);
mc('l10-xed-def','l10','The <b>cross-price elasticity of demand</b> for good A with respect to good B is calculated as which of the following?',
  [`The percentage change in quantity demanded of A divided by the percentage change in the price of B`,`The percentage change in quantity demanded of A divided by the percentage change in the price of A`,`The percentage change in the price of B divided by the percentage change in quantity of A`,`The percentage change in quantity demanded of B divided by the percentage change in income`,`The change in the price of A minus the change in the price of B`],0,
  `<p>Your course textbook: "the percentage change in the quantity of good A that is demanded as a result of a percentage change in the price of good B." The quantity of one good on top, the price of the <b>other</b> good on the bottom.</p><p>The tempting wrong answer uses A's own price, which is A's price elasticity of demand (Lesson 9).</p>`);
gen('l10-g-xed','l10',()=>{
  const sub=Math.random()<0.5; const p1=pick([2,3,4,5]), p2=p1+pick([1,-1]); const q1=pick([100,200,300]);
  const dir = (p2>p1)===sub ? 1 : -1; const q2=q1+dir*pick([10,20,30,40]);
  const e=midE(q1,q2,p1,p2), ans=round(e,2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. When the price of ${sub?'tea':'peanut butter'} changes from ${money(p1)} to ${money(p2)}, weekly sales of ${sub?'coffee':'jelly'} at a store go from ${q1} to ${q2}. Using the midpoint method, what is the cross-price elasticity of demand for ${sub?'coffee':'jelly'} with respect to the price of ${sub?'tea':'peanut butter'}? (Keep the sign; round to two decimals.)`,
    answer:ans, unit:'',
    explain:`<p>%Δ quantity of ${sub?'coffee':'jelly'} = (${q2} − ${q1}) ÷ ${(q1+q2)/2} = ${fmt((q2-q1)/((q1+q2)/2)*100)}%. %Δ price of ${sub?'tea':'peanut butter'} = (${p2} − ${p1}) ÷ ${(p1+p2)/2} = ${fmt((p2-p1)/((p1+p2)/2)*100)}%.</p><p>Cross-price elasticity = <b>${fmt(ans)}</b>. ${ans>0?'Positive: the goods are <b>substitutes</b> (a pricier tea sends buyers to coffee, a cheaper tea pulls them away).':'Negative: the goods are <b>complements</b> (they are used together, so they move in opposite directions to the other good\'s price).'}</p><p>The common slip is dropping the sign, or dividing by the change in the ${sub?'coffee':'jelly'} price instead of the ${sub?'tea':'peanut butter'} price.</p>` };
});
mc('l10-pretzels','l10','In your course\'s example, the price of pretzels falls from $4 to $3, and beer purchases rise from 100 to 120 units. The cross-price elasticity of demand for beer is about −0.64. Which of the following is true?',
  [`Beer and pretzels are complements`,`Beer and pretzels are substitutes`,`Beer is an inferior good`,`Beer and pretzels are unrelated`,`Beer has inelastic price demand`],0,
  `<p>%Δ beer = 20 ÷ 110 = 18.2%; %Δ price of pretzels = −1 ÷ 3.5 = −28.6%; 18.2 ÷ −28.6 = <b>−0.64</b>. A <b>negative</b> cross-price elasticity means complements: cheaper pretzels led people to buy more beer, because they go together. (Your course video writes the price change as +0.287, but the price fell, so it is −0.286; the final answer, −0.636, is right.)</p><p>The tempting "substitutes" reverses the sign rule. Substitutes have positive cross-price elasticities.</p>`);
tf('l10-tf-negxed','l10','A negative cross-price elasticity of demand means the two goods are substitutes.',false,
  `<p>False. Negative means <b>complements</b>: when the price of one rises, people buy less of it and less of the other too. Substitutes have a <b>positive</b> cross-price elasticity: a pricier tea means more coffee sold. Your course textbook: "Substitute goods have positive cross-price elasticities ... Complement goods have negative cross-price elasticities."</p>`);
mc('l10-substitutes','l10','The price of tea rises by 10%, and the quantity of coffee demanded rises by 5%. Which of the following is true?',
  [`The cross-price elasticity is +0.5, so coffee and tea are substitutes`,`The cross-price elasticity is −0.5, so they are complements`,`The cross-price elasticity is +2, so they are substitutes`,`The cross-price elasticity is +0.5, so they are complements`,`Coffee is an inferior good`],0,
  `<p>Cross-price elasticity = %Δ quantity of coffee ÷ %Δ price of tea = 5% ÷ 10% = <b>+0.5</b>. Positive: substitutes. Your course textbook uses coffee and tea as its example of substitutes.</p><p>Tempting wrong answers flip the division (+2) or the sign rule (complements).</p>`);
mc('l10-luxury','l10','Good X has an income elasticity of demand of 2.5. Good Y has an income elasticity of 0.3. Which of the following is true?',
  [`Both are normal goods; demand for X grows faster than income, while demand for Y grows more slowly`,`X is normal and Y is inferior`,`Y is a luxury and X is a necessity`,`Both are inferior goods`,`X is inferior because its elasticity is above 1`],0,
  `<p>Both numbers are positive, so both are <b>normal</b> goods. X's purchases rise 2.5% for each 1% rise in income, faster than income, like the luxury cars and European vacations for which, your course textbook says, "the effect of a rise in income can be especially pronounced." Y's rise only 0.3% per 1%: a normal good that behaves like a necessity.</p><p>The tempting "Y is inferior" treats a small positive number as negative. Inferior requires a <b>negative</b> income elasticity.</p>`);
tf('l10-tf-sign','l10','For income and cross-price elasticities, only the size of the number matters, just as with price elasticity of demand.',false,
  `<p>False. With price elasticity of demand the sign is always negative, so you can drop it. With income and cross-price elasticities, the sign carries the answer: income elasticity positive = normal, negative = inferior; cross-price positive = substitutes, negative = complements.</p>`);
/* L10 more */
mc('l10-unrelated','l10','The cross-price elasticity of demand between toothpaste and running shoes is close to 0. Which of the following is the best interpretation?',
  [`The goods are unrelated: a change in one\'s price has little effect on demand for the other`,`They are complements`,`They are substitutes`,`Both are inferior goods`,`Both have perfectly inelastic demand`],0,
  `<p>The AP framework: cross-price elasticity shows "whether goods are substitutes, complements, or not related." Near zero means the price of one barely affects demand for the other: unrelated.</p><p>The tempting "complements" needs a clearly negative number.</p>`);
gen('l10-g-ied-pct','l10',()=>{
  const di=pick([2,4,5,10]), k=pick([-1.5,-0.5,0.4,0.8,1.5,3]); const dq=round(k*di,1);
  return { type:'num', kind:'num', prompt:`Average incomes rise by ${di}%, and the quantity of a good demanded ${dq>=0?'rises':'falls'} by ${Math.abs(dq)}%. What is the income elasticity of demand for the good? (Keep the sign.)`,
    answer:k, unit:'',
    explain:`<p>Income elasticity = %Δ quantity ÷ %Δ income = ${dq}% ÷ ${di}% = <b>${fmt(k)}</b>. ${k<0?'Negative: an <b>inferior</b> good.':k>1?'Positive and above 1: a normal good whose demand grows faster than income.':'Positive and below 1: a normal good whose demand grows more slowly than income, like a necessity.'}</p><p>The common slip is dividing income by quantity, or dropping the minus sign when quantity falls.</p>` };
});
mc('l10-transit','l10','Econlib\'s David Henderson calls urban mass transit a classic inferior good. What does that predict as a city\'s incomes rise?',
  [`Demand for mass transit falls, as more people can afford to drive`,`Demand for mass transit rises, because people travel more`,`Mass transit gets worse in quality`,`The price of mass transit falls along the demand curve`,`Nothing, because transit is a public service`],0,
  `<p>Inferior means demand falls when income rises: with more income, some riders switch to cars or taxis. Henderson: "Urban mass transit and railroad transportation are classic examples of inferior goods."</p><p>The tempting "it gets worse in quality" takes "inferior" literally. It describes the income response only.</p>`);
mc('l10-steak','l10','Your course textbook says that people with higher incomes "might buy fewer hamburgers, because they are buying more steak instead." For these buyers, what are the signs of the income elasticities?',
  [`Hamburgers negative (inferior); steak positive (normal)`,`Both positive, because both are food`,`Hamburgers positive; steak negative`,`Both negative`,`Both zero, because food is a necessity`],0,
  `<p>Fewer hamburgers as income rises: negative income elasticity, an inferior good for these buyers. More steak: positive, a normal good.</p><p>The tempting "both positive because both are food" ignores that income moves the two in opposite directions here.</p>`);
mc('l10-camry','l10','When the price of Toyota Camrys rises, demand for Nissan Maximas rises (Econlib\'s example). What is the sign of the cross-price elasticity of demand for Maximas with respect to the price of Camrys?',
  [`Positive, because the cars are substitutes`,`Negative, because the cars are substitutes`,`Negative, because the cars are complements`,`Zero, because they are different brands`,`Positive, because the cars are complements`],0,
  `<p>Camry price up (+), Maxima quantity up (+): positive ÷ positive = <b>positive</b>, the sign of substitutes. Henderson: when Camrys get pricier, demand for Maximas, "a substitute, rises."</p><p>Tempting wrong answers attach the wrong sign to substitutes. Same direction = positive = substitutes.</p>`);
mc('l10-gas-cars','l10','When gasoline prices rise, demand for large SUVs falls. What does this suggest about the cross-price elasticity of demand for SUVs with respect to the price of gasoline?',
  [`It is negative, because gasoline and SUVs are complements`,`It is positive, because they are substitutes`,`It is negative, because they are substitutes`,`It is zero`,`It is positive, because SUVs are normal goods`],0,
  `<p>Gas price up (+), SUV quantity down (−): negative. Gasoline and SUVs are used together, so they are complements. Your course textbook lists "gasoline and sport utility vehicles" among its complements, and Henderson notes "When the price of gasoline rises, the demand for cars falls."</p><p>The tempting "positive, because SUVs are normal goods" mixes in income elasticity, which isn't what changed here.</p>`);
mc('l10-which-price','l10','To compute the cross-price elasticity of demand for beer with respect to pretzels, which price change goes on the bottom of the formula?',
  [`The percentage change in the price of pretzels`,`The percentage change in the price of beer`,`The percentage change in income`,`The average of the two prices`,`The percentage change in the quantity of pretzels`],0,
  `<p>Cross-price elasticity asks how demand for beer responds to the price of the <b>other</b> good, pretzels. Your course: "in our denominator, what we are using is the change in the price of Good B, whereas in the numerator, we're still looking at the response in the quantity of Good A."</p><p>The tempting "price of beer" would give beer's own price elasticity.</p>`);
mc('l10-shift-size','l10','Two normal goods face the same 5% rise in buyers\' incomes. Good A has an income elasticity of 2; good B has 0.4. According to your course textbook, which of the following is true?',
  [`A\'s demand curve shifts right by more than B\'s`,`B\'s demand curve shifts right by more than A\'s`,`Both shift right by the same amount`,`A\'s demand shifts right and B\'s shifts left`,`Neither shifts, because only prices shift demand`],0,
  `<p>Income elasticity measures how far demand shifts when income changes. Your course textbook: "How far the demand shifts depends on the income elasticity of demand. A higher income elasticity means a larger shift." About 10% more of A is demanded at each price versus 2% more of B.</p><p>The tempting "B shifts left" would need a negative elasticity; 0.4 is positive, so B is still normal.</p>`);
tf('l10-tf-luxury','l10','Any good with a positive income elasticity of demand is a luxury.',false,
  `<p>False. Positive just means <b>normal</b>. A positive number below 1 means purchases rise more slowly than income, which is typical of necessities like food or electricity. Only a number above 1 means purchases rise faster than income, the luxury-like case.</p>`);
gen('l10-g-xed-pct','l10',()=>{
  const dp=pick([5,10,20]), k=pick([-0.8,-0.4,0.3,0.6,1.2]); const dq=round(k*dp,1); const rise=Math.random()<0.5;
  const sp=rise?dp:-dp, sq=rise?dq:-dq;
  return { type:'num', kind:'num', prompt:`The price of good B ${rise?'rises':'falls'} by ${dp}%, and the quantity of good A demanded ${sq>=0?'rises':'falls'} by ${Math.abs(sq)}%. What is the cross-price elasticity of demand for A with respect to the price of B? (Keep the sign.)`,
    answer:k, unit:'',
    explain:`<p>Cross-price elasticity = %Δ quantity of A ÷ %Δ price of B = ${sq}% ÷ ${sp}% = <b>${fmt(k)}</b>. ${k>0?'Positive: <b>substitutes</b>.':'Negative: <b>complements</b>.'}</p><p>Watch the signs: a price <b>fall</b> is a negative change, so a quantity rise after a price fall gives a negative elasticity (complements), as in your course's pretzels.</p>` };
});
mc('l10-recession','l10','During a recession, many households\' incomes fall. Demand for which of the following is most likely to <b>rise</b>?',
  [`Store-brand (generic) groceries`,`Restaurant meals`,`New cars`,`Vacations abroad`,`Designer clothing`],0,
  `<p>When income falls, demand for <b>inferior</b> goods rises. Your course textbook: "As incomes rise, many people will buy fewer generic brand groceries," so as incomes fall, they buy more. The other choices are normal goods (several luxury-like), whose demand falls in a recession.</p>`);
mc('l10-table','l10','A study reports these elasticities for three goods:'+table(['Good','Income elasticity','Cross-price elasticity with good Z'],[['A','1.8','+0.9'],['B','−0.7','0.0'],['C','0.4','−1.2']])+'Which of the following is true?',
  [`B is inferior, and C is a complement of Z`,`A is inferior, and A is a complement of Z`,`C is inferior, and B is a substitute for Z`,`All three are normal goods`,`A is a complement of Z, and C is a substitute for Z`],0,
  `<p>Read the signs. Income elasticity: A (+1.8) and C (+0.4) are normal; B (−0.7) is inferior. Cross-price with Z: A (+0.9) is a substitute, B (0) is unrelated, C (−1.2) is a complement.</p><p>The tempting wrong answers swap the sign rules. For both elasticities: positive and negative mean opposite things, and both signs matter.</p>`);
mc('l10-ied-order','l10','Which of the following goods most likely has the highest income elasticity of demand?',
  [`Cruise vacations`,`Bread`,`Table salt`,`Instant ramen`,`Electricity`],0,
  `<p>Luxuries see demand rise much faster than income. Your course textbook names "luxury cars, vacations in Europe, and fine jewelry" as goods where "the effect of a rise in income can be especially pronounced." Bread, salt and electricity are necessities (small positive elasticities), and ramen is inferior for many buyers (negative).</p>`);
tf('l10-tf-zero','l10','A cross-price elasticity of demand of zero means the two goods are complements.',false,
  `<p>False. Zero means a change in one good's price has no effect on demand for the other: the goods are <b>unrelated</b>. Complements need a negative value.</p>`);
mc('l10-wording','l10','Your course video calls a good with income elasticity greater than 1 "an elastic good." What does an income elasticity of 3 actually tell you?',
  [`Each 1% rise in income raises the quantity demanded by about 3%`,`Each 1% rise in price lowers the quantity demanded by 3%`,`The good is inferior`,`The good\'s price will triple when incomes rise`,`Demand doesn\'t respond to income`],0,
  `<p>An elasticity is a ratio of percentage changes: 3 means quantity changes 3% for every 1% change in income, so purchases grow three times as fast as income. Economists call this "income elastic," and it is the luxury-like pattern.</p><p>The tempting "1% rise in price" describes the <b>price</b> elasticity of demand. "Elastic" alone usually means price elasticity on exams, which is why it helps to say "income elastic."</p>`);
lazy('l10-gr-income','l10',()=>({ type:'mc', kind:'graph',
  prompt:`When buyers\' incomes rise, the demand for a good moves from D0 to D1.${sdg({xmax:10,ymax:10,xt:[0,5,10],yt:[0,5,10],lines:[{a:[3,9],b:[10,2],label:'D0',c:'var(--muted)',dash:'5 4'},{a:[0,8],b:[7,1],label:'D1'}]})}Which of the following is true about the good\'s income elasticity of demand?`,
  options:[`It is negative, because the good is inferior`,`It is positive, because the good is normal`,`It is zero, because the curve kept the same slope`,`It is greater than 1`,`It can\'t be determined, because only price is on the graph`], answer:0,
  explain:`<p>D1 is to the left of D0: when incomes rose, buyers wanted less at every price. That is an inferior good, so the income elasticity is <b>negative</b>.</p><p>The tempting "positive, because the good is normal" would need demand to shift <b>right</b>. A graph shows income effects through the direction of the shift.</p>` }));

/* ===== Lesson 10 quick checks ===== */
mc('l10c-general','l10','Your course textbook says elasticity "can be measured for any determinant of supply and demand, not just the price." Which of the following is an elasticity of demand with respect to something other than the good\'s own price?',
  [`The percentage change in quantity of laptops demanded divided by the percentage change in buyers\' incomes`,`The percentage change in quantity of laptops demanded divided by the percentage change in the price of laptops`,`The percentage change in quantity of laptops supplied divided by the percentage change in the price of laptops`,`The slope of the laptop demand curve`,`The change in laptop revenue divided by the change in price`],0,
  `<p>Income is one of Lesson 6's demand shifters, so the response of quantity to income is the income elasticity of demand. The general pattern is always %Δ in one variable ÷ %Δ in the thing that caused it.</p><p>The tempting second choice is laptops' own price elasticity (Lesson 9), and the third is a supply elasticity.</p>`);
mc('l10c-ied','l10','When incomes in a town rise by 10%, purchases of new furniture rise by 15%. What is the income elasticity of demand for furniture, and what kind of good is it?',
  [`1.5: a normal good whose demand grows faster than income`,`0.67: a normal good whose demand grows more slowly than income`,`−1.5: an inferior good`,`1.5: an inferior good`,`15: a luxury`],0,
  `<p>15% ÷ 10% = <b>1.5</b>. Positive, so normal; above 1, so demand grows faster than income.</p><p>The tempting 0.67 divides the wrong way (income ÷ quantity).</p>`);
mc('l10c-ied2','l10','When a college student graduates and her income jumps, she buys much less instant ramen. For her, what is the sign of ramen\'s income elasticity of demand?',
  [`Negative: ramen is an inferior good for her`,`Positive: ramen is a normal good`,`Zero: income doesn\'t affect ramen`,`Positive, because she is buying a different quantity`,`It depends on ramen\'s price`],0,
  `<p>Income up, quantity down: a negative change over a positive change gives a <b>negative</b> income elasticity, the mark of an inferior good. Your course uses ramen as an example.</p>`);
mc('l10c-xed','l10','When a streaming service raises its monthly price, subscriptions to a rival service rise. What is the sign of the cross-price elasticity, and how are the services related?',
  [`Positive: they are substitutes`,`Negative: they are substitutes`,`Negative: they are complements`,`Positive: they are complements`,`Zero: they are unrelated`],0,
  `<p>Price of one up, quantity of the other up: same direction, so a <b>positive</b> cross-price elasticity, the sign of substitutes. Viewers switch to the cheaper service.</p>`);
mc('l10c-sign','l10','Which pair of results correctly reads the signs?',
  [`Income elasticity −0.4: inferior. Cross-price elasticity −0.4: complements`,`Income elasticity −0.4: normal. Cross-price elasticity −0.4: substitutes`,`Income elasticity −0.4: inferior. Cross-price elasticity −0.4: substitutes`,`Income elasticity −0.4: luxury. Cross-price elasticity −0.4: complements`,`Both mean the good is inelastic, so the sign doesn\'t matter`],0,
  `<p>Negative income elasticity = inferior; negative cross-price elasticity = complements. The last choice applies Lesson 9's "ignore the sign" rule, which only works for price elasticity of demand.</p>`);
mc('l10c-skill','l10','When the price of printers falls 10%, sales of ink cartridges rise 6%. What is the cross-price elasticity of demand for ink with respect to the price of printers, and what does it show?',
  [`−0.6: ink and printers are complements`,`+0.6: they are substitutes`,`−1.67: they are complements`,`+0.6: they are complements`,`−0.6: they are substitutes`],0,
  `<p>%Δ quantity of ink ÷ %Δ price of printers = +6% ÷ −10% = <b>−0.6</b>. Negative: complements, used together. The common slips are forgetting that a price fall is a negative change, and dividing the wrong way (−1.67).</p>`);

/* Course materials checked 2026-10-22: video 2.2c transcript, Module 2 slides 91-99, course textbook §5.4 and §3.2 (normal/inferior, complements, substitutes). */
const L10TAGS = {
  'l10-ied-def':['OS54 MS2','inc','terms','M3'], 'l10-g-ied':['MS2 OS54','inc','data','M5'], 'l10-inferior-sign':['OS54 ELD','inc','data','M5 M1'],
  'l10-magic':['MS2','inc','data','M1 M4'], 'l10-tf-inferior':['MS2 OS32','inc','terms','M1'], 'l10-xed-def':['OS54 MS2','xpe','terms','M3'],
  'l10-g-xed':['MS2 OS54','xpe','data','M2 M3'], 'l10-pretzels':['MS2','xpe','data','M2'], 'l10-tf-negxed':['OS54','xpe','terms','M2'],
  'l10-substitutes':['OS54','xpe','data','M2 M3'], 'l10-luxury':['OS32 OS54','inc','data','M4 M1'], 'l10-tf-sign':['OS54 MS2','ela','terms','M5'],
  'l10-unrelated':['CED','xpe','terms','M6'], 'l10-g-ied-pct':['OS54','inc','data','M5'], 'l10-transit':['ELD','inc','models','M1'],
  'l10-steak':['OS54','inc','models','M1 M4'], 'l10-camry':['ELD','xpe','models','M2'], 'l10-gas-cars':['OS32 ELD','xpe','models','M2'],
  'l10-which-price':['MS2','xpe','terms','M3'], 'l10-shift-size':['OS54','inc','models','M4'], 'l10-tf-luxury':['OS32','inc','terms','M4'],
  'l10-g-xed-pct':['OS54','xpe','data','M2'], 'l10-recession':['OS32','inc','models','M1'], 'l10-table':['OS54 CED','ela','data','M2 M5'],
  'l10-ied-order':['OS32','inc','models','M4'], 'l10-tf-zero':['CED','xpe','terms','M6'], 'l10-wording':['MS2 OS54','inc','terms','M3 M4'],
  'l10-gr-income':['OS54','inc','graphs','M5'],
  'l10c-general':['OS54','ela','terms','M3'], 'l10c-ied':['OS54','inc','data','M4'], 'l10c-ied2':['MS2','inc','models','M1 M5'],
  'l10c-xed':['OS54','xpe','models','M2'], 'l10c-sign':['OS54','ela','terms','M5 M2'], 'l10c-skill':['MS2 OS54','xpe','data','M2 M3']
};
u2tag(L10TAGS);

U2_CARDS.l10 = [
  ['Income elasticity of demand','How is the income elasticity of demand calculated?','%Δ quantity demanded ÷ %Δ income, using the midpoint method. Keep the sign.','Magic Hat: income $45,000 → $50,000, purchases 5 → 9 a month: 0.5714 ÷ 0.1053 = 5.43 (your course).','Income goes on the bottom, not the good\'s own price.'],
  ['Normal good (by elasticity)','What income elasticity marks a normal good?','A positive one: quantity demanded rises as income rises.','Lattes for Sally after her raise; Magic Hat for the 23-year-old.','Positive is enough to be normal; it doesn\'t need to be above 1.'],
  ['Inferior good (by elasticity)','What income elasticity marks an inferior good?','A negative one: quantity demanded falls as income rises.','Instant ramen, gas-station coffee (your course); urban mass transit (Econlib).','"Inferior" isn\'t about quality.'],
  ['Luxury vs. necessity','How does the size of a positive income elasticity separate luxury-like goods from necessities?','Above 1: purchases grow faster than income (luxury-like; "income elastic"). Between 0 and 1: purchases grow more slowly than income (necessity-like). Both are normal goods.','Cruise vacations above 1; bread and electricity between 0 and 1.','Positive alone doesn\'t make a good a luxury.'],
  ['Cross-price elasticity of demand','How is the cross-price elasticity of demand calculated?','%Δ quantity demanded of good A ÷ %Δ price of good B. Keep the sign.','Pretzels $4 → $3, beer 100 → 120: 18.2% ÷ −28.6% = −0.64 (your course).','The bottom is the other good\'s price, not A\'s own price.'],
  ['Substitutes (by elasticity)','What cross-price elasticity marks substitutes?','A positive one: when B gets pricier, people buy more A.','Coffee and tea; Camrys and Maximas (Econlib).','Positive means substitutes; don\'t reverse the sign rule.'],
  ['Complements (by elasticity)','What cross-price elasticity marks complements?','A negative one: when B gets pricier, people buy less A, because they use them together.','Beer and pretzels (your course); gasoline and SUVs (your course textbook).','Negative means complements, even though a negative number feels like "opposites".'],
  ['Unrelated goods','What does a cross-price elasticity near zero mean?','The goods are unrelated: one\'s price barely affects demand for the other.','Toothpaste and running shoes.','Zero is not "complements."'],
  ['Sign matters here','How is reading income and cross-price elasticities different from reading price elasticity of demand?','For price elasticity of demand, the sign is always negative, so you read the absolute value. For income and cross-price elasticities, the sign is the answer: it decides normal vs. inferior and substitutes vs. complements.','Income elasticity −0.4: inferior. Cross-price −0.4: complements.','Don\'t drop the sign as you do for price elasticity of demand; here the sign is the answer.'],
  ['Elasticity and shift size','What does a larger income elasticity mean for the demand curve?','For the same change in income, the demand curve shifts further. Your course textbook: "A higher income elasticity means a larger shift."','A 5% income rise: about 10% more demanded at each price if the elasticity is 2, about 2% more if it is 0.4.','A bigger income elasticity means a bigger shift for the same income change, not a different direction.'],
  ['General elasticity pattern','What is the general recipe for any elasticity?','%Δ in the thing that responds ÷ %Δ in the thing that caused it. It works for price, income, other goods\' prices, wages and interest rates.','Wage elasticity of labor supply = %Δ hours worked ÷ %Δ wage (your course textbook).','The responding variable goes on top; the cause goes on the bottom.']
];

Object.assign(U2_WRITE, {
  'w-l10-1':{lesson:'l10',prompt:'Explain how an economist uses the income elasticity of demand to tell normal goods from inferior goods, and luxury-like goods from necessities. Give an example of each.',
    model:'The income elasticity of demand is the percentage change in quantity demanded divided by the percentage change in income. Its sign tells normal from inferior: positive means people buy more as income rises (normal, like restaurant meals), and negative means they buy less (inferior, like instant ramen or gas-station coffee). Among normal goods, the size matters: above 1 means purchases grow faster than income, like cruise vacations, which is the luxury-like case; between 0 and 1 means they grow more slowly than income, like bread or electricity, which is the necessity-like case.',
    checklist:['Defines income elasticity as %Δ quantity demanded ÷ %Δ income','Uses the sign: positive = normal, negative = inferior, with examples','Uses the size for normal goods: above 1 luxury-like, between 0 and 1 necessity-like, with examples','Notes that "inferior" is about the income response, not quality, or that the sign must be kept']},
  'w-l10-2':{lesson:'l10',prompt:'A store manager notices that when pretzels go on sale, beer sales rise. Use the cross-price elasticity of demand to explain what is happening and suggest how the store might use it.',
    model:'The cross-price elasticity of demand for beer with respect to pretzels is the percentage change in beer bought divided by the percentage change in the price of pretzels. A pretzel sale is a price cut (a negative change), and beer sales rose (a positive change), so the elasticity is negative. That means beer and pretzels are complements: people consume them together, so cheaper pretzels bring in more pretzel buyers who also buy beer. The store might put pretzels on sale to draw shoppers and earn more on beer, or display the two together.',
    checklist:['Defines cross-price elasticity correctly (quantity of one good, price of the other)','Works out that the elasticity is negative (a price cut paired with a quantity rise)','Concludes the goods are complements and explains why (used together)','Gives a sensible business use, such as discounting one to sell more of the other']}
});

U2_PLAN.l10 = {
  core:['l10-ied-def','l10-g-ied','l10-inferior-sign','l10-magic','l10-tf-inferior','l10-xed-def','l10-g-xed','l10-pretzels','l10-tf-negxed','l10-substitutes','l10-luxury','l10-tf-sign'],
  more:['l10-unrelated','l10-g-ied-pct','l10-transit','l10-steak','l10-camry','l10-gas-cars','l10-which-price','l10-shift-size','l10-tf-luxury','l10-g-xed-pct','l10-recession','l10-table','l10-ied-order','l10-tf-zero','l10-wording','l10-gr-income']
};

U2_LESSONS.push({ id:'l10', unit:2, title:'Income and Cross-Price Elasticity', mins:35, src:'Modern States video 2.2c and Module 2 slides 91-99 · Course textbook (OpenStax) §5.4',
  sources:['MS2','OS54','OS32','CB','CED','ELD'],
  oneline:'The same elasticity recipe works for income and for the prices of other goods. Here the sign is the answer: it tells normal goods from inferior ones and substitutes from complements.',
  body:`
<h2>Elasticity beyond price</h2>
<!-- src: OS54 ("Elasticity can be measured for any determinant of supply and demand, not just the price"; general pattern; Table 5.4); MS2 (video 2.2c: quantify responses to income and related-good prices) -->
<p>Lesson 9 measured how quantity responds to a good's own price. But Lesson 6 listed other things that move demand: income and the prices of related goods. Your course textbook: "Elasticity can be measured for any determinant of supply and demand, not just the price."</p>
<p>The recipe never changes: <b>percentage change in the thing that responds ÷ percentage change in the thing that caused it</b>, each computed with the midpoint method. This lesson applies it twice:</p>
<div class="terms">
${term(dt('income-elasticity','Income elasticity of demand'),'%Δ quantity demanded ÷ %Δ <b>income</b>')}
${term(dt('cross-price-elasticity','Cross-price elasticity of demand'),'%Δ quantity demanded of good A ÷ %Δ <b>price of good B</b>')}
</div>
<p><b>One big difference from Lesson 9:</b> the price elasticity of demand is always negative, so you dropped the sign. Here the sign can go either way, and <b>the sign is the answer</b>.</p>
<div data-check="l10c-general"></div>

<h2>Income elasticity of demand</h2>
<!-- src: MS2 (video 2.2c: Magic Hat $45,000 → $50,000, 5 → 9, 0.571 ÷ 0.105 = 5.43; positive normal, negative inferior; ">1 elastic"; slides 92-94); OS54 (definition; positive = normal, negative = inferior; hamburgers/steak, cheap wine; larger elasticity → larger shift); OS32 (luxury cars, vacations in Europe, fine jewelry; generic groceries); ELD (urban mass transit inferior) -->
<p>Your course asks: "by how much does quantity demanded respond to a change in income?" Lesson 6 showed the direction: more income raises demand for a ${dt('normal-good','normal good')} and lowers it for an ${dt('inferior-good','inferior good')}. The income elasticity puts a number on it.</p>
<p><b>Worked example: your course's Magic Hat beer.</b> A 23-year-old's income rises from $45,000 to $50,000, and he goes from 5 to 9 Magic Hats a month.</p>
<div class="math">%Δ quantity = (9 − 5) ÷ [(9 + 5) ÷ 2] = 4 ÷ 7 = 0.571 = 57.1%<br>%Δ income = (50,000 − 45,000) ÷ [(50,000 + 45,000) ÷ 2] = 5,000 ÷ 47,500 = 0.105 = 10.5%<br>Income elasticity = 0.5714 ÷ 0.1053 = <b>5.43</b> (dividing the rounded percents, 57.1 ÷ 10.5, gives 5.44)</div>
<p>Check: his beer purchases grew more than five times as fast as his income, so a number above 5 fits.</p>
<p><b>Reading the result:</b></p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Income elasticity</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td><b>Negative</b></td><td>Inferior good: buy less as income rises</td><td>Ramen, gas-station coffee (your course); urban mass transit (Econlib)</td></tr>
<tr><td><b>Between 0 and 1</b></td><td>Normal good; purchases grow more slowly than income (necessity-like)</td><td>Bread, electricity</td></tr>
<tr><td><b>Above 1</b></td><td>Normal good; purchases grow faster than income (luxury-like, "income elastic")</td><td>Magic Hat for this buyer (5.43); "luxury cars, vacations in Europe, and fine jewelry" (your course textbook)</td></tr>
</tbody></table></div>
<p><b>Why the sign works:</b> for a normal good, income and quantity move together (both changes positive, or both negative), so the ratio is positive. For an inferior good they move apart, so the ratio is negative. The size tells you how far demand shifts: your course textbook says "A higher income elasticity means a larger shift."</p>
<p class="small muted">Your course video calls an income elasticity above 1 "an elastic good." On exams, "elastic" alone usually means <b>price</b> elasticity, so think "income elastic" here.</p>
<div data-check="l10c-ied,l10c-ied2"></div>

<h2>Cross-price elasticity of demand</h2>
<!-- src: MS2 (video 2.2c: pretzels $4 → $3, beer 100 → 120; 0.182 ÷ −0.286 = −0.636; negative = complements, positive = substitutes; slides 95-98); OS54 (definition; coffee/tea substitutes positive, coffee/sugar complements negative; plane and train tickets; bread and peanut butter); CED (MKT-3.E.11 "substitutes, complements, or not related"). Source problem: the video gives the denominator as 0.287; the price fell, so it is −0.286. -->
<p>Cross-price elasticity measures how demand for good A responds to the price of a <b>different</b> good, B. Your course: in the denominator "we are using ... the change in the price of Good B, whereas in the numerator, we're still looking at the response in the quantity of Good A."</p>
<p><b>Worked example: your course's beer and pretzels.</b> Pretzels fall from $4 to $3, and beer purchases rise from 100 to 120.</p>
<div class="math">%Δ quantity of beer = (120 − 100) ÷ [(120 + 100) ÷ 2] = 20 ÷ 110 = +0.182<br>%Δ price of pretzels = (3 − 4) ÷ [(3 + 4) ÷ 2] = −1 ÷ 3.5 = −0.286<br>Cross-price elasticity = 0.182 ÷ (−0.286) = <b>−0.64</b></div>
<p>Check: a price cut (negative) paired with more beer (positive) has to give a negative number. (Your course video writes the price change as 0.287 without the minus sign; its final answer, −0.636, is right.)</p>
<p><b>Reading the sign:</b></p>
<div class="terms">
${term('Positive','<b>'+dt('substitutes','Substitutes')+'</b>: B gets pricier, so people switch to A. Coffee and tea (your course textbook).')}
${term('Negative','<b>'+dt('complements','Complements')+'</b>: B gets pricier, so people use less of both. Beer and pretzels (−0.64).')}
${term('About zero','<b>Unrelated</b>: B\'s price barely affects A. The AP framework uses cross-price elasticity "to determine whether goods are substitutes, complements, or not related."')}
</div>
<p><b>Why the sign works:</b> for substitutes, B's price and A's quantity move the same way (pricier tea, more coffee), so the ratio is positive. For complements they move in opposite ways (cheaper pretzels, more beer), so it is negative.</p>
<div data-check="l10c-xed"></div>

<h2>Reading the signs</h2>
<!-- src: OS54; MS2; CED. Summary table of the three demand elasticities. -->
<p>Three elasticities of demand, three different rules for the sign:</p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Elasticity</th><th>Bottom of the fraction</th><th>Sign tells you</th><th>Size tells you</th></tr></thead><tbody>
<tr><td>Price (Lesson 9)</td><td>The good's own price</td><td>Nothing (always negative)</td><td>Elastic (above 1) or inelastic (below 1)</td></tr>
<tr><td>Income</td><td>Income</td><td>Normal (+) or inferior (−)</td><td>For normal goods: luxury-like (above 1) or necessity-like (below 1)</td></tr>
<tr><td>Cross-price</td><td>Another good's price</td><td>Substitutes (+) or complements (−)</td><td>How closely the goods are related</td></tr>
</tbody></table></div>
<p>Try your course's two examples, then your own numbers:</p>
<div data-widget="xclass"></div>
<div data-check="l10c-sign"></div>

<h2>Name the relationship</h2>
<!-- src: OS54; MS2; ELD. Exam skill: from data or a story to normal, inferior, substitutes, complements or unrelated. -->
<p>CLEP questions often describe what happened ("when incomes rose 5%, purchases fell 2%") and ask what kind of good it is. First ask which variable changed (income or another good's price), then read the direction of the response.</p>
<div data-widget="relsort"></div>
<div data-check="l10c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L10TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"An inferior good is a low-quality good."</span>Inferior means people buy less of it as income rises. It is about the income response, not quality.</li>
<li><span class="wrong">"A negative cross-price elasticity means substitutes."</span>Negative means complements (used together). Substitutes have a positive cross-price elasticity.</li>
<li><span class="wrong">"In the cross-price elasticity of beer, the price on the bottom is beer's price."</span>It's the other good's price (pretzels). Beer's own price gives beer's price elasticity.</li>
<li><span class="wrong">"Any good with a positive income elasticity is a luxury."</span>Positive means normal. Only above 1 is luxury-like; between 0 and 1 is necessity-like.</li>
<li><span class="wrong">"Drop the sign, as with price elasticity of demand."</span>For income and cross-price elasticities, the sign is the answer: normal vs. inferior, substitutes vs. complements.</li>
<li><span class="wrong">"A cross-price elasticity near zero means complements."</span>Near zero means unrelated: one good's price doesn't affect the other.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>Any elasticity is %Δ in the response ÷ %Δ in the cause; income and cross-price elasticities use the same midpoint method as Lesson 9.</li>
<li><b>Income elasticity</b> = %Δ quantity demanded ÷ %Δ income. Positive: <b>normal</b>; negative: <b>inferior</b>; above 1: purchases grow faster than income.</li>
<li><b>Cross-price elasticity</b> = %Δ quantity of A ÷ %Δ price of B. Positive: <b>substitutes</b>; negative: <b>complements</b>; near zero: unrelated.</li>
<li>Unlike price elasticity of demand, <b>keep the sign</b>: it carries the answer.</li>
<li>To classify from data, find what changed (income or another price) and whether quantity moved with it or against it.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Price, income, and cross-price elasticities of demand" under Supply and Demand (15% to 20% of the exam). Expect a number to classify ("an income elasticity of −0.5 indicates..."), a short calculation from percentage changes, and stories about related goods.</p>
</div>`,
  deeper:`
<h3>Elasticity in labor and savings markets</h3>
<p>Your course textbook (§5.4) applies the same recipe beyond goods. The <b>wage elasticity of labor supply</b> (%Δ hours worked ÷ %Δ wage) is thought to be fairly elastic for teenagers and fairly inelastic for adults in their thirties and forties. The <b>elasticity of savings</b> (%Δ savings ÷ %Δ interest rate) decides whether tax breaks for saving raise savings much; the textbook says the evidence is "controversial" and savings appear fairly inelastic in the short run. Unit 6 returns to labor markets.</p>
<h3>Goods can change category</h3>
<p>Whether a good is normal or inferior can depend on who is buying and how much they earn. Made-up illustration: a cheap brand could be a normal good for someone on a very tight budget whose income rises a little (they buy more of it), and an inferior good for someone who can now afford the brand they prefer (they buy less). Elasticities are estimates for a group of buyers over a range of incomes and prices.</p>`,
  links:[ {k:'Textbook',t:'5.4 Elasticity in Areas Other Than Price',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-4-elasticity-in-areas-other-than-price',w:'The newer edition of your course textbook\'s §5.4: income, cross-price, labor and savings elasticities.'},
          {k:'Article',t:'Demand',s:'David R. Henderson, Econlib',u:'https://www.econlib.org/library/Enc/Demand.html',w:'Real examples of inferior goods, substitutes and complements.'} ]
});
