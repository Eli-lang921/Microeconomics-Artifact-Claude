/* ===== Lesson 9: Price Elasticity of Demand and Supply (Modern States videos 2.2a and 2.2b) =====
   Common mistakes: M1 elasticity = slope · M2 read the sign, not the size · M3 a higher price always raises revenue
   M4 necessities with few substitutes have elastic demand · M5 elastic means less than 1 · M6 supply is as elastic in the short run as the long run */
const midE = (q1,q2,p1,p2) => ((q2-q1)/((q2+q1)/2)) / ((p2-p1)/((p2+p1)/2));
mc('l9-def','l9','The <b>price elasticity of demand</b> is calculated as which of the following?',
  [`The percentage change in quantity demanded divided by the percentage change in price`,`The change in price divided by the change in quantity demanded`,`The percentage change in price divided by the percentage change in quantity demanded`,`The slope of the demand curve`,`The change in total revenue divided by the change in price`],0,
  `<p>Your course textbook: "The price elasticity of demand is the percentage change in the quantity demanded of a good or service divided by the percentage change in the price." Quantity response on top, price change on the bottom.</p><p>The tempting wrong answer is "the slope of the demand curve." Slope uses unit changes (dollars per item); elasticity uses <b>percentage</b> changes, so it can differ at every point of a straight line.</p>`);
gen('l9-g-mid','l9',()=>{
  const p1=pick([8,10,12,20]), p2=p1+pick([1,2,4]), q1=pick([100,120,200,300]), q2=q1-pick([10,20,40,60]);
  const e=midE(q1,q2,p1,p2), ans=round(Math.abs(e),2);
  const pq=(q2-q1)/((q2+q1)/2)*100, pp=(p2-p1)/((p2+p1)/2)*100;
  return { type:'num', kind:'num', prompt:`Made-up numbers. When a café raises the price of a smoothie from ${money(p1)} to ${money(p2)}, the number sold per week falls from ${q1} to ${q2}. Using the midpoint method, what is the price elasticity of demand? (Enter it as a positive number, rounded to two decimals.)`,
    answer:ans, unit:'',
    explain:`<p>%Δ quantity = (${q2} − ${q1}) ÷ ((${q2} + ${q1}) ÷ 2) = ${q2-q1} ÷ ${(q1+q2)/2} = ${fmt(pq)}%</p><p>%Δ price = (${p2} − ${p1}) ÷ ((${p2} + ${p1}) ÷ 2) = ${p2-p1} ÷ ${(p1+p2)/2} = ${fmt(pp)}%</p><p>Elasticity = ${fmt(pq)} ÷ ${fmt(pp)} = ${fmt(e)}, read as <b>${fmt(ans)}</b>: ${ans>1?'greater than 1, so demand is elastic here':ans<1?'less than 1, so demand is inelastic here':'exactly 1: unit elastic'}.</p><p>The common slip is dividing by the starting values instead of the averages, or putting price on top.</p>` };
});
mc('l9-classify','l9','A study finds that the price elasticity of demand for bus rides is −0.4. Which of the following is true?',
  [`Demand is inelastic: a 10% fare increase cuts rides by about 4%`,`Demand is elastic: a 10% fare increase cuts rides by about 40%`,`Demand is inelastic: a 10% fare increase cuts rides by about 40%`,`Demand is elastic, because the number is negative`,`Demand is unit elastic`],0,
  `<p>Read the size, ignoring the sign: 0.4 is less than 1, so demand is <b>inelastic</b>. Elasticity says how many percent quantity changes for each 1% price change: 10% × 0.4 = 4%.</p><p>The tempting wrong answers misread 0.4 as 40%, or treat the minus sign as meaningful. Your course: price elasticity of demand is always negative (the law of demand), so "take the absolute value."</p>`);
mc('l9-salmon','l9','Your course\'s grocer raises smoked salmon from $11.00 to $12.10, and sales fall from 40 to 25 units. What happens to his total revenue from salmon?',
  [`It falls by $137.50, because demand is elastic`,`It rises by $137.50, because demand is elastic`,`It rises by $23.40, because demand is inelastic`,`It falls by $15.00, the drop in units`,`It stays the same, because the price rose by only 10%`],0,
  `<p>Total revenue = price × quantity. Before: $11.00 × 40 = $440. After: $12.10 × 25 = $302.50. Change: <b>−$137.50</b>. Demand is elastic (|−4.85| > 1), so the percentage drop in quantity outweighs the percentage rise in price.</p><p>The tempting wrong answer, "+$23.40 because demand is inelastic," is your course's <b>bread</b> example. Reporting −15 counts units, not dollars.</p>`);
tf('l9-tf-slope','l9','The price elasticity of demand is the same as the slope of the demand curve.',false,
  `<p>False. Your course textbook: "It is a common mistake to confuse the slope of either the supply or demand curve with its elasticity." A straight-line demand curve has the same slope everywhere, but its elasticity changes along it (0.45 at one point and 1.47 at another in the textbook's example), because elasticity uses percentages.</p>`);
mc('l9-substitutes','l9','Which of the following is likely to have the <b>most elastic</b> demand?',
  [`One brand of candy bar, such as Kit Kat`,`Insulin for people with diabetes`,`Table salt`,`Electricity for a home`,`Gasoline over the next week`],0,
  `<p>Your course: Kit Kat bars have "many substitutes," so a price rise sends buyers to other candy bars. Many close substitutes means a big quantity response: elastic demand.</p><p>The others are tempting only if you forget the determinants: insulin and electricity are necessities with few substitutes, salt is a tiny share of the budget, and gasoline is hard to cut back in a week. All have inelastic demand.</p>`);
mc('l9-tr-rule','l9','Demand for a good is inelastic at its current price. If the seller raises the price, which of the following happens to total revenue?',
  [`It rises, because the percentage fall in quantity is smaller than the percentage rise in price`,`It falls, because fewer units are sold`,`It stays the same, because price and quantity move in opposite directions`,`It falls, because demand is inelastic`,`It can\'t change, because revenue depends only on costs`],0,
  `<p>Inelastic means quantity responds by a <b>smaller</b> percentage than price. So when price rises, the higher price per unit outweighs the few lost sales and revenue rises. Your course's bread: $3 to $3.30 cut sales only from 100 to 98, and revenue rose from $300 to $323.40.</p><p>The tempting wrong answer, "it falls, because fewer units are sold," ignores that each remaining unit brings in more. Whether revenue rises depends on which percentage change is bigger.</p>`);
lazy('l9-gr-perfect','l9',()=>({ type:'mc', kind:'graph',
  prompt:`The demand curve for a good is a vertical line.${sdg({xmax:10,ymax:10,xt:[0,5,10],yt:[0,5,10],lines:[{a:[5,0.3],b:[5,9.5],label:'D'}]})}Which of the following is true?`,
  options:[`Demand is perfectly inelastic: quantity demanded doesn\'t change when price changes`,`Demand is perfectly elastic: any price increase drops quantity to zero`,`Demand is unit elastic`,`The good has many close substitutes`,`Elasticity can\'t be read from a graph`], answer:0,
  explain:`<p>A vertical demand curve means buyers want exactly the same quantity at every price: zero response, or <b>perfectly inelastic</b> demand. Your course textbook: "necessities with no close substitutes are likely to have highly inelastic demand curves," such as life-saving drugs.</p><p>The tempting wrong answer swaps the extremes. A <b>horizontal</b> curve is perfectly elastic: at any price above that line, quantity demanded drops to zero.</p>` }));
gen('l9-g-tr','l9',()=>{
  const p1=pick([4,5,6,8]), up=Math.random()<0.5; const p2=up?p1+1:p1-1; const q1=pick([200,300,400]);
  const el=pick([0.5,1.5]); /* choose q2 so the change has the chosen elasticity roughly */
  const q2=Math.round(q1*(1 - el*(p2-p1)/p1)/10)*10;
  const tr1=p1*q1, tr2=p2*q2, ans=tr2-tr1;
  return { type:'num', kind:'num', prompt:`Made-up numbers. A movie theater changes its ticket price from ${money(p1)} to ${money(p2)}, and tickets sold per night go from ${q1} to ${q2}. By how much does nightly total revenue change, in dollars? (Use a minus sign for a decrease.)`,
    answer:ans, unit:'dollars',
    explain:`<p>Total revenue = price × quantity. Before: ${money(p1)} × ${q1} = ${money(tr1)}. After: ${money(p2)} × ${q2} = ${money(tr2)}. Change: <b>${money(ans)}</b>.</p><p>Check with the total revenue test: price ${up?'rose':'fell'} and revenue ${ans>0?'rose':ans<0?'fell':'stayed the same'}, so demand here is ${ ans===0 ? 'unit elastic' : (ans>0)===up ? 'inelastic (price and revenue moved the same way)' : 'elastic (price and revenue moved in opposite directions)'}. The common slip is multiplying the changes (Δprice × Δquantity) instead of comparing the two totals.</p>` };
});
mc('l9-pes','l9','Your course\'s grocer finds that when average prices rise from $5 to $7, he supplies 1,250 units instead of 1,000. Using the midpoint method, his price elasticity of supply is about 0.67. Which of the following is true?',
  [`His supply is inelastic, because 0.67 is less than 1`,`His supply is elastic, because the number is positive`,`His supply is elastic, because quantity rose`,`His supply is unit elastic`,`Price elasticity of supply should be negative, so the calculation is wrong`],0,
  `<p>%Δ quantity = 250 ÷ 1,125 = 22.2%; %Δ price = 2 ÷ 6 = 33.3%; 22.2 ÷ 33.3 = <b>0.67</b>. Below 1, so supply is <b>inelastic</b>: quantity supplied rose by a smaller percentage than price.</p><p>The tempting wrong answer calls it elastic because it is positive. Price elasticity of supply is <b>always</b> positive (the law of supply); the size, compared with 1, decides elastic or inelastic.</p>`);
tf('l9-tf-elastic-def','l9','Demand is elastic when the absolute value of the price elasticity of demand is less than 1.',false,
  `<p>False, it's the reverse. Elastic means greater than 1: quantity changes by a <b>bigger</b> percentage than price. Less than 1 is inelastic. Your course: "if the price elasticity of demand ... is greater than one, then this good is an elastic good."</p>`);
mc('l9-time','l9','The price of gasoline doubles and stays high for ten years. According to your course textbook, how does the quantity of gasoline demanded respond over time?',
  [`It falls a little at first and much more in the long run, as people buy efficient cars and move closer to work`,`It falls sharply at first and then recovers fully`,`It doesn\'t change, because gasoline is a necessity`,`It rises over time, because people get used to the price`,`It falls by the same amount in the first month and the tenth year`],0,
  `<p>Your course textbook: energy demand "is somewhat inelastic in the short run, but much more elastic in the long run." In the short run you can only carpool or adjust a thermostat; over years you can "purchase a car that gets more miles to the gallon, choose a job that is closer to where you live."</p><p>The tempting wrong answer, "it doesn't change," confuses inelastic with perfectly inelastic. Inelastic demand still responds, just by less; and time makes the response bigger.</p>`);
/* L9 more */
mc('l9-why-mid','l9','Why do economists use the midpoint method to compute elasticity?',
  [`It gives the same elasticity between two points whether the price rises or falls`,`It always produces a number greater than 1`,`It removes the minus sign from the result`,`It measures the slope of the curve exactly`,`It uses only the starting price and quantity`],0,
  `<p>Dividing each change by the <b>average</b> of the two values, instead of the starting value, means the base is the same in both directions. Your course textbook: "one obtains the same elasticity between two price points whether there is a price increase or decrease."</p><p>The tempting wrong answer, "it uses only the starting values," describes the simple percentage method, which gives different answers going up and going down.</p>`);
mc('l9-bread','l9','Your course\'s grocer raises bread from $3.00 to $3.30, and sales fall from 100 to 98 loaves. Which of the following is true?',
  [`Demand is inelastic (about 0.21), and revenue rises from $300 to $323.40`,`Demand is elastic (about 4.85), and revenue falls`,`Demand is inelastic, and revenue falls from $300 to $294`,`Demand is elastic, and revenue rises`,`Demand is unit elastic, so revenue doesn\'t change`],0,
  `<p>%Δ quantity = −2 ÷ 99 = −2.02%; %Δ price = 0.30 ÷ 3.15 = 9.52%; elasticity = −0.212, read as 0.21: inelastic. Revenue: $3.00 × 100 = $300 → $3.30 × 98 = <b>$323.40</b>.</p><p>The tempting "revenue falls to $294" multiplies the <b>old</b> price by the new quantity. Always use the new price with the new quantity. (Your course video rounds the elasticity to −0.216; the unrounded value is −0.212. Either way it is inelastic.)</p>`);
gen('l9-g-pes','l9',()=>{
  const p1=pick([4,5,8,10]), p2=p1+pick([1,2]), q1=pick([500,800,1000]), q2=q1+pick([50,100,200,300]);
  const e=midE(q1,q2,p1,p2), ans=round(e,2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. When the price of a craft beer rises from ${money(p1)} to ${money(p2)} a bottle, local brewers increase the quantity they supply from ${q1} to ${q2} bottles a week. Using the midpoint method, what is the price elasticity of supply? (Round to two decimals.)`,
    answer:ans, unit:'',
    explain:`<p>%Δ quantity supplied = ${q2-q1} ÷ ${(q1+q2)/2} = ${fmt((q2-q1)/((q1+q2)/2)*100)}%. %Δ price = ${p2-p1} ÷ ${(p1+p2)/2} = ${fmt((p2-p1)/((p1+p2)/2)*100)}%.</p><p>Elasticity of supply = <b>${fmt(ans)}</b>: ${ans>1?'greater than 1, so supply is elastic':'less than 1, so supply is inelastic'}. It is positive, as it always is for supply (the law of supply).</p>` };
});
tf('l9-tf-negative','l9','A price elasticity of demand of −2 means demand is inelastic, because the number is negative.',false,
  `<p>False. Price elasticities of demand are always negative because of the law of demand, so the sign tells you nothing. Read the absolute value: 2 is greater than 1, so demand is <b>elastic</b>.</p>`);
mc('l9-table','l9','Your course textbook lists the price elasticity of demand for restaurant meals as 2.27. If restaurant prices rise by 10%, about how much does the quantity of restaurant meals demanded change?',
  [`It falls by about 22.7%`,`It falls by about 2.27%`,`It rises by about 22.7%`,`It falls by about 10%`,`It falls by about 4.4%`],0,
  `<p>Elasticity × %Δ price = %Δ quantity: 2.27 × 10% = <b>22.7%</b>, a fall (the law of demand). The textbook: "If the price of the restaurant meal increases by 10%, the quantity demanded will decrease by 22.7%."</p><p>The tempting "2.27%" forgets to multiply by the 10% price change; "4.4%" divides instead of multiplying.</p>`);
mc('l9-unit','l9','If demand is <b>unit elastic</b> and a seller raises the price slightly, what happens to total revenue?',
  [`It stays about the same, because the percentage fall in quantity equals the percentage rise in price`,`It rises, because each unit sells for more`,`It falls, because fewer units are sold`,`It doubles`,`It falls to zero`],0,
  `<p>Unit elastic means quantity changes by the same percentage as price. Your course textbook (Table 5.3): "A given % rise in P will be exactly offset by an equal % fall in Q so that total revenue (P × Q) is unchanged."</p><p>The two tempting answers each count only one side of the trade-off: the higher price, or the lost sales.</p>`);
lazy('l9-gr-horizontal','l9',()=>({ type:'mc', kind:'graph',
  prompt:`A curve on this graph is a horizontal line at $4.${sdg({xmax:10,ymax:8,xt:[0,5,10],yt:[0,4,8],lines:[{a:[0.3,4],b:[9.7,4],label:'D'}]})}If this is a demand curve, which of the following is true?`,
  options:[`Demand is perfectly elastic: at any price above $4, quantity demanded falls to zero`,`Demand is perfectly inelastic`,`Demand is unit elastic at every point`,`Buyers will pay any price up to $8`,`The good has no substitutes`], answer:0,
  explain:`<p>A horizontal demand curve is the extreme case of <b>perfectly elastic</b> (infinitely elastic) demand: the tiniest price rise above $4 wipes out quantity demanded. Your course textbook: the curve is "horizontal" when quantity "changes by an infinite amount in response to any change in price."</p><p>The tempting wrong answer, "perfectly inelastic," is the <b>vertical</b> line. Remember: flat = elastic, steep = inelastic, and the extremes are horizontal and vertical.</p>` }));
mc('l9-farm','l9','Demand for wheat is inelastic. An unusually good growing season shifts the supply of wheat to the right. What most likely happens to farmers\' total revenue?',
  [`It falls, because the price drops by a larger percentage than the quantity rises`,`It rises, because farmers sell more wheat`,`It stays the same`,`It rises, because demand is inelastic`,`It falls, because farmers sell less wheat`],0,
  `<p>With inelastic demand, a supply increase needs a big price cut to get buyers to take a little more. Your course textbook: "a surge in production leads to a severe drop in price that can actually decrease the total revenue received by farmers."</p><p>The tempting wrong answer, "it rises, because farmers sell more," counts the extra bushels but not the lower price on every bushel.</p>`);
mc('l9-capacity','l9','According to your course, which of the following firms is most likely to have <b>elastic</b> supply?',
  [`A factory running well below its capacity`,`A farm whose crop takes a year to grow`,`A nuclear power plant`,`A firm whose key input is in very limited supply`,`A diamond mine with no new deposits`],0,
  `<p>Your course: a "firm that's operating below capacity" can "quickly react and adjust its production" when the price changes: elastic supply. Spare machines and space make extra output cheap and fast.</p><p>The others have inelastic supply: crops take time to grow, power plants take years to build, and limited inputs (or deposits) cap output. Your course textbook names "diamond rings or housing in prime locations" as goods with highly inelastic supply.</p>`);
mc('l9-nuclear','l9','Your course lists nuclear power as an example of inelastic supply. Which of the following best explains why the supply of nuclear power is inelastic in the short run?',
  [`New plants take many years to build, so output can\'t rise quickly when the price rises`,`Buyers have few substitutes for electricity`,`Nuclear power is a necessity`,`The government sets the price of electricity`,`Nuclear power is an inferior good`],0,
  `<p>Supply elasticity depends on how easily <b>producers</b> can change output. Building or expanding a nuclear plant takes years, so in the short run quantity supplied barely responds to price. Your course textbook: producers "find it easier to expand production in the long term of several years rather than in the short run of a few months."</p><p>The tempting wrong answers ("few substitutes," "a necessity") are reasons for inelastic <b>demand</b>. Your course video phrases it as "not a lot of substitutes," but substitutes are a buyer-side idea; for supply, think capacity and time.</p>`);
mc('l9-budget','l9','Other things equal, which of the following should have the more elastic demand, and why?',
  [`New cars, because a car takes a large share of a household\'s budget`,`Salt, because it takes a tiny share of the budget`,`Salt, because it has many uses`,`New cars, because they are necessities`,`They are equally elastic, because both are normal goods`],0,
  `<p>The bigger a purchase is relative to your budget, the more a price change hurts and the harder you look for alternatives or wait. Your course textbook lists "goods that take a large share of individuals' income" among those with highly elastic demand, and MRU's list of determinants includes "the size of the purchase relative to the consumer's budget."</p><p>The tempting wrong answer picks salt, but a 20% rise on a $1 box barely registers, so people keep buying it: inelastic.</p>`);
tf('l9-tf-tr','l9','Raising the price always raises a firm\'s total revenue.',false,
  `<p>False. It depends on elasticity. With elastic demand, quantity falls by a bigger percentage than price rises, so revenue <b>falls</b>, as with your course's smoked salmon ($440 to $302.50). Only with inelastic demand does a price rise raise revenue.</p>`);
gen('l9-g-pct','l9',()=>{
  const a=pick([20,40,50,80,100]), dl=pick([10,20,30]), b = (a>dl+10 && Math.random()<0.5) ? a-dl : a+dl; const ans=round((b-a)/((a+b)/2)*100,1);
  return { type:'num', kind:'num', prompt:`Math refresher. Using the midpoint method, what is the percentage change when a quantity goes from ${a} to ${b}? (Enter the percent, with a minus sign if it fell, rounded to one decimal.)`,
    answer:ans, unit:'%',
    explain:`<p>Change ÷ average: (${b} − ${a}) ÷ ((${b} + ${a}) ÷ 2) = ${b-a} ÷ ${(a+b)/2} = ${((b-a)/((a+b)/2)).toFixed(3)} = <b>${fmt(ans)}%</b>.</p><p>The simple method (÷ ${a}) would give ${fmt((b-a)/a*100)}%, and going back from ${b} to ${a} would give yet another number. The midpoint method gives the same size both ways.</p>` };
});
mc('l9-band','l9','A band selling out a 15,000-seat arena wants more ticket revenue. If demand for its tickets is <b>elastic</b> at the current price, what should it do, according to your course textbook?',
  [`Cut the price, because the percentage rise in tickets sold would be larger than the percentage price cut`,`Raise the price, because fans will pay more`,`Keep the price, because elasticity doesn\'t affect revenue`,`Raise the price, because demand is elastic`,`Cut the number of seats`],0,
  `<p>Your course textbook: "If demand is elastic at that price level, then the band should cut the price, because the percentage drop in price will result in an even larger percentage increase in the quantity sold" and so raise total revenue. (If the arena is already full, it would need a bigger arena to sell the extra tickets.)</p><p>The tempting "raise the price" is right only for <b>inelastic</b> demand.</p>`);
lazy('l9-gr-linear','l9',()=>({ type:'mc', kind:'graph',
  prompt:`A straight-line demand curve with points A, B and C.${sdg({xmax:100,ymax:10,xt:[0,50,100],yt:[0,5,10],lines:[{a:[0,10],b:[100,0],label:'D'}],dots:[{q:20,p:8,label:'A'},{q:50,p:5,label:'B'},{q:80,p:2,label:'C'}]})}Along this curve, where is demand <b>elastic</b>?`,
  options:[`Near point A, at high prices and low quantities`,`Near point C, at low prices and high quantities`,`Everywhere, because the line is straight`,`Nowhere, because the slope is constant`,`Only at point B`], answer:0,
  explain:`<p>The slope is constant, but elasticity isn't. Near A, price is high and quantity low, so a 1-unit change in quantity is a big <b>percentage</b> change and a $1 change in price is a small one: elastic. Near C it's the reverse: inelastic. At the midpoint B, demand is unit elastic (and total revenue is at its largest).</p><p>Your course textbook shows this with a line where elasticity is 0.45 lower down and 1.47 higher up. The tempting wrong answers assume a straight line has one elasticity.</p>` }));
mc('l9-cigarettes','l9','Your course textbook says the price elasticity of demand for cigarettes among adults is about 0.3. A tax raises cigarette prices by 10%. Which of the following is most likely?',
  [`Smoking falls by about 3%, and the tax raises substantial revenue`,`Smoking falls by about 30%`,`Smoking falls by about 10%, the same as the price`,`Smoking doesn\'t change at all`,`Smoking rises, because cigarettes are a necessity`],0,
  `<p>0.3 × 10% = about 3% less smoking. The textbook: these taxes "will raise tax revenue for the government, but they will not much affect the quantity of smoking." Inelastic demand means buyers keep buying and pay the higher price.</p><p>The tempting "30%" misreads 0.3 as 3 per 1%. "Doesn't change at all" confuses inelastic (small response) with perfectly inelastic (zero response).</p>`);

/* ===== Lesson 9 quick checks ===== */
mc('l9c-what','l9','A sale cuts the price of a video game by 20%, and the number sold rises by 50%. What does price elasticity of demand measure in this situation?',
  [`How strongly the quantity demanded responded to the price change: 50% ÷ 20% = 2.5`,`How much the demand curve shifted`,`How much revenue the store earned`,`The slope of the demand curve: 50 ÷ 20`,`How much the supply of games changed`],0,
  `<p>Elasticity is the responsiveness of quantity to price, in percentages: 50% ÷ 20% = <b>2.5</b>, so demand is elastic. Your course: "by how much does the quantity respond to the price change?"</p><p>The tempting wrong answer calls it the slope. These are percentages, not units, so the result is an elasticity, not a slope.</p>`);
gen('l9c-calc','l9',()=>{
  const p1=pick([2,3,4]), p2=p1+1, q1=pick([60,80,100]), q2=q1-pick([10,20,30]);
  const e=midE(q1,q2,p1,p2), ans=round(Math.abs(e),2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. A food truck raises the price of tacos from ${money(p1)} to ${money(p2)}, and daily sales fall from ${q1} to ${q2}. Using the midpoint method, what is the price elasticity of demand? (Positive number, two decimals.)`,
    answer:ans, unit:'',
    explain:`<p>%Δ quantity = ${q2-q1} ÷ ${(q1+q2)/2} = ${fmt((q2-q1)/((q1+q2)/2)*100)}%. %Δ price = 1 ÷ ${(p1+p2)/2} = ${fmt(1/((p1+p2)/2)*100)}%. Elasticity = <b>${fmt(ans)}</b> (${ans>1?'elastic':ans<1?'inelastic':'unit elastic'}).</p><p>Check the order: quantity change on top, price change on the bottom, each divided by its average.</p>` };
});
mc('l9c-class','l9','Which of the following elasticities of demand describes <b>elastic</b> demand?',
  [`−1.8`,`−0.9`,`−0.5`,`0`,`−1.0`],0,
  `<p>Read the absolute value and compare with 1. Only 1.8 is greater than 1, so only −1.8 is elastic. 0.9 and 0.5 are inelastic, 1.0 is unit elastic, and 0 is perfectly inelastic.</p><p>The minus signs are there because of the law of demand; they don't change the classification.</p>`);
mc('l9c-det','l9','A town has one gas station, and the next one is 40 miles away. A different town has six gas stations on the same street. In which town would one station face more <b>elastic</b> demand, and why?',
  [`The town with six stations, because drivers have close substitutes nearby`,`The town with one station, because drivers have no choice`,`Both the same, because gasoline is a necessity`,`The town with one station, because its price is higher`,`The town with six stations, because gasoline is a luxury there`],0,
  `<p>Availability of substitutes is the biggest determinant. With five other stations on the same street, raising the price at one sends drivers next door: elastic. The lone station's customers have no nearby alternative: inelastic.</p><p>The tempting wrong answer says "gasoline is a necessity, so the same." Gasoline <b>overall</b> may be a necessity, but one station's gasoline has close substitutes when competitors are near.</p>`);
mc('l9c-tr','l9','A museum raises its ticket price from $10 to $12, and visitors fall from 1,000 to 900 a day. What happens to its ticket revenue, and what does that say about demand?',
  [`Revenue rises from $10,000 to $10,800, so demand is inelastic in this range`,`Revenue falls, so demand is elastic`,`Revenue rises, so demand is elastic`,`Revenue stays the same, so demand is unit elastic`,`Revenue falls from $10,000 to $9,000`],0,
  `<p>$10 × 1,000 = $10,000 → $12 × 900 = $10,800. Price and revenue moved in the <b>same</b> direction, so demand is inelastic here (the midpoint elasticity is about 0.58).</p><p>The tempting "$9,000" uses the old price with the new quantity.</p>`);
mc('l9c-tr2','l9','A coffee chain cuts its price for a latte, and its latte revenue falls. What does this tell you about demand for its lattes?',
  [`It is inelastic in this price range`,`It is elastic in this price range`,`It is unit elastic`,`It is perfectly elastic`,`Nothing; revenue doesn\'t depend on elasticity`],0,
  `<p>With inelastic demand, a price cut brings only a few more sales, not enough to make up for the lower price on every latte, so revenue falls. Price and revenue moving the <b>same</b> way signals inelastic demand.</p><p>The tempting "elastic" reverses the test: with elastic demand, a price cut would <b>raise</b> revenue.</p>`);
mc('l9c-pes','l9','A sudden craze doubles the price of a rare collectible toy that was made only once, years ago. Which of the following describes the supply of that toy?',
  [`Perfectly (or almost perfectly) inelastic: no more can be made, so quantity supplied barely changes`,`Highly elastic, because sellers want the higher price`,`Unit elastic`,`Elastic in the short run and inelastic in the long run`,`Perfectly elastic`],0,
  `<p>The quantity in existence is fixed, so the supply curve is close to vertical: quantity supplied barely responds to price. Your course textbook: goods "with limited supply of inputs are likely to feature highly inelastic supply curves."</p><p>The tempting "highly elastic, because sellers want the higher price" confuses wanting to sell more with being able to. Supply elasticity is about how much output can change.</p>`);
mc('l9c-skill','l9','Which of the following goods most likely has the <b>least elastic</b> demand?',
  [`Heart medication with no generic substitute`,`A particular brand of sneakers`,`Vacation cruises`,`Restaurant meals`,`Designer jeans`],0,
  `<p>A necessity with no close substitute is the textbook case of inelastic demand: people keep buying even when the price rises. Your course lists medicine among inelastic goods.</p><p>The others have substitutes or are luxuries (your course's designer jeans; the textbook's Caribbean cruises and restaurant meals at 2.27), so their demand is elastic.</p>`);

/* Course materials checked 2026-10-22: videos 2.2a and 2.2b transcripts, Module 2 slides 76-90, course textbook §5.1-5.3.
   Source problems noted in the lesson: bread elasticity (−0.212, course says −0.216), salmon rounding (−4.85 vs −4.86), nuclear power's reason. */
const L9TAGS = {
  'l9-def':['OS51 MS2','ped','terms','M1'], 'l9-g-mid':['MS2 OS51','ped','data','M2'], 'l9-classify':['MS2 OS51','ped','data','M2 M5'],
  'l9-salmon':['MS2','tr','data','M3'], 'l9-tf-slope':['OS51','ped','terms','M1'], 'l9-substitutes':['MS2 ELD','ped','models','M4'],
  'l9-tr-rule':['MS2 OS53','tr','models','M3'], 'l9-gr-perfect':['OS52','ped','graphs','M4'], 'l9-g-tr':['MS2 OS53','tr','data','M3'],
  'l9-pes':['MS2','pes','data','M2 M5'], 'l9-tf-elastic-def':['MS2 OS51','ped','terms','M5'], 'l9-time':['OS53','ped','models','M6 M4'],
  'l9-why-mid':['OS51','ped','terms',''], 'l9-bread':['MS2','tr','data','M3 M5'], 'l9-g-pes':['MS2 OS51','pes','data','M2'],
  'l9-tf-negative':['MS2 OS51','ped','terms','M2'], 'l9-table':['OS53','ped','data','M5'], 'l9-unit':['OS53','tr','terms','M3'],
  'l9-gr-horizontal':['OS52','ped','graphs','M1'], 'l9-farm':['OS53','tr','models','M3'], 'l9-capacity':['MS2 OS52','pes','models','M6'],
  'l9-nuclear':['MS2 OS53 CED','pes','models','M6 M4'], 'l9-budget':['OS52 MRUE','ped','models','M4'], 'l9-tf-tr':['MS2 OS53','tr','terms','M3'],
  'l9-g-pct':['OS51','ped','data',''], 'l9-band':['OS53','tr','models','M3'], 'l9-gr-linear':['OS51','ped','graphs','M1'],
  'l9-cigarettes':['OS53','ped','data','M5 M4'],
  'l9c-what':['MS2 OS51','ped','data','M1'], 'l9c-calc':['MS2 OS51','ped','data','M2'], 'l9c-class':['MS2 OS51','ped','terms','M2 M5'],
  'l9c-det':['ELD MS2','ped','models','M4'], 'l9c-tr':['OS53','tr','data','M3'], 'l9c-tr2':['OS53','tr','models','M3'],
  'l9c-pes':['OS52','pes','models','M6'], 'l9c-skill':['MS2 OS52','ped','models','M4']
};
u2tag(L9TAGS);

U2_CARDS.l9 = [
  ['Elasticity','What does elasticity measure?','How strongly one variable responds to a change in another, as a percentage change divided by a percentage change. Price elasticity of demand: how much quantity demanded responds to price.','Your course textbook: a tennis ball bounces more than a brick; it has greater elasticity.','Elasticity compares percentage changes, not unit changes.'],
  ['Price elasticity of demand','How do you calculate the price elasticity of demand?','%Δ quantity demanded ÷ %Δ price. It is always negative (the law of demand), so read its absolute value.','Smoked salmon: −0.4615 ÷ 0.0952 = −4.85, read as 4.85 (your course; it rounds the percents first and gets 4.86).','Quantity on top, price on the bottom.'],
  ['Midpoint method','How does the midpoint method compute a percentage change, and why use it?','Divide the change by the average of the two values: (Q2 − Q1) ÷ ((Q2 + Q1) ÷ 2). It gives the same elasticity whether the price rises or falls.','40 → 25 units: −15 ÷ 32.5 = −46.2%.','Divide by the average of the two values, not the starting value.'],
  ['Elastic, inelastic, unit elastic','How do you classify an elasticity?','Compare its absolute value with 1. Greater than 1: elastic (quantity responds by a bigger percentage). Less than 1: inelastic. Exactly 1: unit elastic.','Salmon 4.85: elastic. Bread 0.21: inelastic (your course).','The minus sign doesn\'t matter for demand.'],
  ['Perfectly elastic and perfectly inelastic','What do the two extreme cases look like on a graph?','Perfectly inelastic: a vertical curve; quantity doesn\'t respond at all. Perfectly elastic: a horizontal curve; any price change sends quantity to zero or infinity.','Life-saving drugs come close to perfectly inelastic demand (your course textbook).','Flat = elastic, steep = inelastic.'],
  ['Elasticity is not slope','Why isn\'t elasticity the same as the slope of a demand curve?','Slope uses unit changes; elasticity uses percentage changes. On a straight-line demand curve the slope is constant, but demand is elastic at high prices and inelastic at low prices.','The textbook\'s line: elasticity 0.45 low on the curve and 1.47 higher up, with the same slope.','A straight demand line has one slope but many elasticities: elastic at high prices, inelastic at low ones.'],
  ['Determinants of demand elasticity','What makes demand more elastic?','1. Many close substitutes. 2. A luxury rather than a necessity. 3. A large share of the buyer\'s budget. 4. More time to adjust.','Kit Kat bars and designer jeans: elastic. Medicine and peak-hour train tickets: inelastic (your course).','Necessities with few substitutes are inelastic, not elastic.'],
  ['Time and elasticity','Why is demand (and supply) usually more elastic in the long run?','With more time, buyers find alternatives and sellers can build capacity. Short-run responses are small; long-run responses are bigger.','Gasoline: in a week you can only carpool; over years you can buy an efficient car or move closer to work (your course textbook).','Short-run and long-run elasticities differ; check which one a question asks about.'],
  ['Total revenue test','How does price elasticity of demand decide what a price change does to total revenue?','Elastic: price and revenue move in opposite directions (raise price → revenue falls). Inelastic: they move in the same direction (raise price → revenue rises). Unit elastic: revenue unchanged.','Salmon (elastic): $440 → $302.50. Bread (inelastic): $300 → $323.40 (your course).','A higher price doesn\'t always mean more revenue.'],
  ['Price elasticity of supply','How do you calculate the price elasticity of supply, and what is its sign?','%Δ quantity supplied ÷ %Δ price, using the midpoint method. It is positive (the law of supply). Greater than 1: elastic; less than 1: inelastic.','Your course\'s grocer: 22.2% ÷ 33.3% = 0.67, inelastic.','Supply elasticity is positive; don\'t attach the demand-side minus sign.'],
  ['What makes supply elastic','What makes supply more elastic?','Spare capacity, inputs that are easy to get, and time. A firm below capacity can expand fast; crops, power plants and fixed resources can\'t.','Elastic: a factory below capacity. Inelastic: farming in the short run, nuclear power, homes facing Central Park.','Substitutes are a demand idea. For supply, think capacity and time.'],
  ['Inelastic demand and big price swings','Why do inelastic demand and shifting supply make prices jump around?','When demand is inelastic, it takes a big price change to get buyers to take a bit more or a bit less, so supply shifts cause large price swings.','Coffee: elasticity about 0.3; a Brazilian frost sent prices up, and Vietnam\'s new output sent them down (your course textbook).','A small supply shift can still cause a big price change when demand is inelastic.']
];

Object.assign(U2_WRITE, {
  'w-l9-1':{lesson:'l9',prompt:'Your course\'s grocer raised the price of smoked salmon and lost revenue, but raised the price of bread and gained revenue. Explain why, using elasticity.',
    model:'Total revenue is price times quantity, and the price elasticity of demand decides which effect wins. Smoked salmon has elastic demand (about 4.85): it is a luxury with substitutes, so the 9.5% price rise cut sales by 46%, and revenue fell from $440 to $302.50. Bread has inelastic demand (about 0.21): people need it and have few close substitutes at the store, so the same 9.5% rise cut sales by only 2%, and revenue rose from $300 to $323.40. With elastic demand, price and revenue move in opposite directions; with inelastic demand, they move together.',
    checklist:['Defines total revenue as price times quantity','Identifies salmon as elastic and bread as inelastic, with figures or a reason','Explains why the percentage change in quantity outweighs (or not) the price change','States the total revenue rule: elastic → opposite directions, inelastic → same direction']},
  'w-l9-2':{lesson:'l9',prompt:'Explain two things that make the demand for a good more elastic, with an example of each. Then explain why the supply of most goods is more elastic in the long run than in the short run.',
    model:'Demand is more elastic when there are close substitutes: if one brand of candy bar gets pricier, people buy another brand, so quantity drops a lot. It is also more elastic when the good is a luxury or a large share of the budget: a 10% rise in the price of a cruise makes many people skip it, while a 10% rise in the price of salt changes almost nothing. Supply is more elastic in the long run because producers need time to expand: in a few months a farm can\'t grow more crops and a utility can\'t build a new plant, but over several years firms can build factories, hire workers and open stores.',
    checklist:['Explains one determinant (such as substitutes) and why it raises elasticity, with an example','Explains a second determinant (necessity or luxury, share of budget, or time) with an example','States that supply is more elastic in the long run','Explains why: producers need time to add capacity or inputs']}
});

U2_PLAN.l9 = {
  core:['l9-def','l9-g-mid','l9-classify','l9-salmon','l9-tf-slope','l9-substitutes','l9-tr-rule','l9-gr-perfect','l9-g-tr','l9-pes','l9-tf-elastic-def','l9-time'],
  more:['l9-why-mid','l9-bread','l9-g-pes','l9-tf-negative','l9-table','l9-unit','l9-gr-horizontal','l9-farm','l9-capacity','l9-nuclear','l9-budget','l9-tf-tr','l9-g-pct','l9-band','l9-gr-linear','l9-cigarettes']
};

U2_LESSONS.push({ id:'l9', unit:2, title:'Price Elasticity of Demand and Supply', mins:55, src:'Modern States videos 2.2a and 2.2b and Module 2 slides 76-90 · Course textbook (OpenStax) §5.1, §5.2, §5.3',
  sources:['MS2','OS51','OS52','OS53','CB','CED','ELD','ELE','MRUE'],
  oneline:'Elasticity measures how strongly buyers and sellers respond to a price change. It decides whether a price rise brings in more revenue or less, and it depends on substitutes, necessity, budget share and time.',
  body:`
<h2>What elasticity measures</h2>
<!-- src: MS2 (video 2.2a: quantify responsiveness; supply shift → movement along demand → PED; demand shift → movement along supply → PES; slides 77-79); OS51 (definition, tennis ball and brick) -->
<p>Lesson 7 told you <b>which way</b> price and quantity move when a curve shifts. This lesson asks <b>how much</b>. The law of demand says a higher price lowers the quantity demanded; ${dt('elasticity','<b>elasticity</b>')} measures by how much.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Your course textbook drops a tennis ball and a brick from a balcony. Same push, very different bounce: the tennis ball has greater elasticity. Buyers are the same. Raise the price of Kit Kat bars and buyers bounce away to other candy; raise the price of insulin and they barely move.</p></div>
<p>Your course shows where each elasticity comes from:</p>
<ul><li>When <b>supply</b> shifts, the price changes and buyers move <b>along the demand curve</b>. How strongly they respond is the ${dt('ped','<b>price elasticity of demand</b>')}.</li><li>When <b>demand</b> shifts, sellers move <b>along the supply curve</b>. How strongly they respond is the ${dt('pes','<b>price elasticity of supply</b>')}.</li></ul>
<p><b>Why percentages?</b> A change of 10 units means a lot for a store that sells 20 a week and little for one that sells 10,000. A $1 change matters for a candy bar, not for a car. Percentages put every good on the same scale.</p>
<div data-check="l9c-what"></div>

<h2>The midpoint method</h2>
<!-- src: MS2 (video 2.2a formula; video 2.2b salmon $11→$12.10, 40→25; slides 81-84); OS51 (midpoint formula, "same elasticity between two price points whether there is a price increase or decrease"). Source problem: the course rounds intermediate steps and reports −4.86; unrounded, −4.85. -->
<p>Elasticity = <b>percentage change in quantity ÷ percentage change in price</b>. Your course computes each percentage change with the ${dt('midpoint-method','<b>midpoint method</b>')}: divide the change by the <b>average</b> of the two values.</p>
<div class="math">%Δ quantity = (Q<sub>B</sub> − Q<sub>A</sub>) ÷ [(Q<sub>B</sub> + Q<sub>A</sub>) ÷ 2]<br>%Δ price = (P<sub>B</sub> − P<sub>A</sub>) ÷ [(P<sub>B</sub> + P<sub>A</sub>) ÷ 2]<br>Elasticity = %Δ quantity ÷ %Δ price</div>
<p><b>Math refresher.</b> Going from 40 to 25 is a change of −15. The simple percentage change (÷ 40) is −37.5%, but going back from 25 to 40 (÷ 25) would be +60%. Dividing by the average, 32.5, gives 46.2% in both directions. That is why your course textbook prefers it: "one obtains the same elasticity between two price points whether there is a price increase or decrease."</p>
<p><b>Worked example: your course's smoked salmon.</b> A grocer raises the price from $11.00 to $12.10, and sales fall from 40 to 25.</p>
<div class="math">%Δ quantity = (25 − 40) ÷ [(25 + 40) ÷ 2] = −15 ÷ 32.5 = −0.4615 = −46.2%<br>%Δ price = (12.10 − 11.00) ÷ [(12.10 + 11.00) ÷ 2] = 1.10 ÷ 11.55 = 0.0952 = 9.5%<br>Elasticity = −0.4615 ÷ 0.0952 = <b>−4.85</b> (with the rounded percents, −46.2 ÷ 9.5 gives −4.86, which is where your course's figure comes from)</div>
<p>Check: quantity changed by about five times as much as price (46% versus 9.5%), so an elasticity near 5 makes sense. (Your course video rounds the steps first and gets −4.86; either way it is far above 1.)</p>
<div data-widget="elcalc"></div>
<div data-check="l9c-calc"></div>

<h2>Elastic, inelastic and unit elastic</h2>
<!-- src: MS2 (video 2.2b: always negative, absolute value, >1 elastic, <1 inelastic; video 2.2a examples; slides 80-81); OS51 (Table 5.1, absolute-value convention); OS52 (perfect elasticity and inelasticity, horizontal and vertical, examples) -->
<p><b>Why the minus sign?</b> Price and quantity demanded always move in opposite directions (the law of demand), so the price elasticity of demand is always negative. Your course textbook: "By convention, we always talk about elasticities as positive numbers." So read the <b>absolute value</b> and compare it with 1:</p>
<div class="terms">
${term(dt('elastic','Elastic (greater than 1)'),'Quantity responds by a <b>bigger</b> percentage than price. Your course\'s examples: designer jeans (a luxury), $15-a-pound gourmet cheese and Kit Kat bars (many substitutes). Smoked salmon: 4.85.')}
${term(dt('inelastic','Inelastic (less than 1)'),'Quantity responds by a <b>smaller</b> percentage than price. Your course\'s examples: food, medicine and peak-hour railroad tickets. Bread: 0.21.')}
${term(dt('unit-elastic','Unit elastic (exactly 1)'),'Quantity responds by the <b>same</b> percentage as price.')}
</div>
<p><b>The two extremes</b> (your course textbook, §5.2). A ${dt('perfectly-inelastic','<b>perfectly inelastic</b>')} curve is vertical: quantity doesn't respond at all, like a life-saving drug with no substitute. A ${dt('perfectly-elastic','<b>perfectly elastic</b>')} curve is horizontal: any price rise drops quantity to zero. Real goods sit in between, but the rule of thumb holds: <b>flatter = more elastic, steeper = more inelastic</b> (for curves drawn on the same scale).</p>
<div data-check="l9c-class"></div>

<h2>What makes demand elastic or inelastic</h2>
<!-- src: MS2 (video 2.2a: luxury designer jeans, cheese and Kit Kat "many substitutes", food, medicine, peak railroad tickets "few substitutes or necessary"); ELD (Henderson: close substitute → elastic; few good substitutes → highly inelastic); OS52 (luxury goods, large share of income, many substitutes → elastic; Caribbean cruises; necessities → inelastic; life-saving drugs, gasoline); OS53 (Table 5.2 values; long run more elastic: energy); MRUE (determinants list: substitutes, time horizon, necessity or luxury, share of budget) -->
<p>The mechanism behind every determinant is the same question: <b>how easy is it for buyers to say no?</b> The easier it is, the more elastic the demand.</p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Determinant</th><th>More elastic when…</th><th>Example</th></tr></thead><tbody>
<tr><td><b>Substitutes</b></td><td>there are many close substitutes</td><td>Kit Kat bars (your course); one gas station on a street of six</td></tr>
<tr><td><b>Necessity or luxury</b></td><td>it's a luxury you can skip</td><td>Designer jeans (elastic) vs. medicine (inelastic)</td></tr>
<tr><td><b>Share of budget</b></td><td>it takes a large share of income</td><td>Cars and cruises (elastic) vs. salt (inelastic)</td></tr>
<tr><td><b>Time to adjust</b></td><td>buyers have longer to respond</td><td>Gasoline over ten years vs. next week</td></tr>
</tbody></table></div>
<p>Substitutes come first: Econlib's David Henderson notes that where there are "few good substitutes," demand is "highly inelastic," and where a close substitute exists, it is elastic. On time, your course textbook: energy demand "is somewhat inelastic in the short run, but much more elastic in the long run," because over years people buy efficient cars and insulate their homes.</p>
<p><b>Real estimates</b> from your course textbook's Table 5.2: housing 0.12, rush-hour rail transit 0.15, gasoline 0.35, beer 0.80, computers 1.44, restaurant meals 2.27. The textbook: "necessities such as housing and electricity are inelastic, while items that are not necessities such as restaurant meals are more price-sensitive."</p>
<div data-check="l9c-det"></div>

<h2>Elasticity and total revenue</h2>
<!-- src: MS2 (video 2.2b: TR = P × Q; salmon $440 → $302.50, −$137.50; bread $300 → $323.40, +$23.40; slides 82-87); OS53 (Table 5.3 band; farm revenue; coffee 0.3; cigarettes 0.3). Source problem: the course reports bread as −0.216; correct midpoint value −0.212. -->
<p>A seller's ${dt('total-revenue','<b>total revenue</b>')} is price × quantity. A price rise does two things at once: each unit brings in more, and fewer units are sold. Elasticity tells you which effect is bigger.</p>
<p><b>Worked example: your course's grocer raises two prices by about 10%.</b></p>
${table(['','Price','Quantity','Total revenue','Elasticity'],[['Salmon before','$11.00','40','$440.00',''],['Salmon after','$12.10','25','$302.50','4.85: elastic'],['Bread before','$3.00','100','$300.00',''],['Bread after','$3.30','98','$323.40','0.21: inelastic']])}
<div class="math">Salmon: $302.50 − $440.00 = <b>−$137.50</b> (price up, revenue down)<br>Bread: $323.40 − $300.00 = <b>+$23.40</b> (price up, revenue up)</div>
<p>Check: salmon buyers cut back by 46% for a 9.5% price rise, so lost sales won. Bread buyers cut back by 2%, so the higher price won. (Your course video reports bread's elasticity as −0.216; the unrounded midpoint value is −0.212. Both say inelastic.)</p>
<p>That gives the <b>total revenue test</b> (your course textbook, Table 5.3):</p>
<div class="terms">
${term('Elastic','Price and revenue move in <b>opposite</b> directions. To raise revenue, cut the price.')}
${term('Inelastic','Price and revenue move in the <b>same</b> direction. To raise revenue, raise the price.')}
${term('Unit elastic','A small price change leaves revenue unchanged.')}
</div>
<p>On a straight-line demand curve, demand is elastic at high prices and inelastic at low prices, so revenue is largest in the middle, where demand is unit elastic. Watch it happen:</p>
<div data-widget="revenue"></div>
<p>Notice: above the middle, raising the price shrinks the revenue rectangle; below it, raising the price grows it. Same slope everywhere, different elasticity, which is why elasticity is not the slope.</p>
<div data-check="l9c-tr,l9c-tr2"></div>

<h2>Price elasticity of supply</h2>
<!-- src: MS2 (video 2.2a: firm below capacity elastic; agriculture short run, nuclear power inelastic; video 2.2b grocer $5 → $7, 1,000 → 1,250, 0.667; slides 79-80, 88-89); OS51 (apartment example 3.53); OS52 (diamond rings, Central Park); OS53 (long run vs short run supply); CED (MKT-3.E.8). Source problem: the course says nuclear power has inelastic supply because of "not a lot of substitutes"; the supply-side reason is capacity and time. -->
<p>The price elasticity of supply is the same idea for sellers: <b>%Δ quantity supplied ÷ %Δ price</b>. It is <b>positive</b>, because of the law of supply.</p>
<p><b>Worked example: your course's grocer.</b> New people move into the neighborhood (more buyers, so demand shifts right). His average prices rise from $5 to $7, and he supplies 1,250 units instead of 1,000.</p>
<div class="math">%Δ quantity supplied = 250 ÷ 1,125 = 22.2%<br>%Δ price = 2 ÷ 6 = 33.3%<br>Elasticity of supply = 22.2% ÷ 33.3% = <b>0.67</b> → inelastic</div>
<p>Check: quantity rose by less than price in percentage terms, so a value below 1 fits.</p>
<p><b>What makes supply elastic?</b> How easily producers can change output:</p>
<ul><li><b>Spare capacity:</b> your course's firm "operating below capacity" can expand quickly, so its supply is elastic.</li><li><b>Time:</b> your course's example of inelastic supply is agriculture in the short run: crops take a season to grow. Your course textbook: producers find it "easier to expand production in the long term of several years rather than in the short run of a few months."</li><li><b>Limited inputs:</b> the textbook's diamond rings and apartments facing Central Park have highly inelastic supply.</li></ul>
<p class="small muted">Your course also lists nuclear power, saying it has "not a lot of substitutes." Substitutes are a buyer-side idea. The supply-side reason is capacity and time: a new plant takes many years to build, so output can't rise quickly when the price does.</p>
<div data-check="l9c-pes"></div>

<h2>Elastic or inelastic?</h2>
<!-- src: MS2; OS52; OS53. Exam skill: classify a good's demand from its determinants. -->
<p>Many CLEP questions ask which good has the most (or least) elastic demand. Run the four determinants: substitutes, necessity or luxury, share of budget and time.</p>
<div data-widget="elsort"></div>
<div data-check="l9c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L9TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Elasticity is the slope of the demand curve."</span>Slope uses unit changes; elasticity uses percentages. A straight line has one slope but is elastic at the top and inelastic at the bottom.</li>
<li><span class="wrong">"An elasticity of −2 is inelastic because it's negative."</span>Demand elasticities are always negative. Read the absolute value: 2 is greater than 1, so elastic.</li>
<li><span class="wrong">"Raising the price always raises revenue."</span>Only when demand is inelastic. With elastic demand, revenue falls, as with your course's smoked salmon.</li>
<li><span class="wrong">"Necessities with few substitutes have elastic demand."</span>It's the reverse. When buyers can't easily say no, quantity barely responds: inelastic.</li>
<li><span class="wrong">"Elastic means the number is less than 1."</span>Elastic is greater than 1 (big response); inelastic is less than 1.</li>
<li><span class="wrong">"Supply responds just as much in a month as in five years."</span>Producers need time to add capacity, so supply is usually more elastic in the long run.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Elasticity</b> measures responsiveness in percentages: how much quantity changes when price changes.</li>
<li>Use the <b>midpoint method</b>: each change divided by the average of the two values; elasticity = %Δ quantity ÷ %Δ price.</li>
<li>Read demand elasticity as a positive number: <b>elastic</b> above 1, <b>inelastic</b> below 1, <b>unit elastic</b> at 1. Vertical = perfectly inelastic; horizontal = perfectly elastic.</li>
<li>Demand is more elastic with <b>close substitutes</b>, for <b>luxuries</b>, for <b>big budget shares</b> and over <b>more time</b>.</li>
<li><b>Total revenue test:</b> elastic → price and revenue move oppositely; inelastic → they move together; unit elastic → no change.</li>
<li><b>Price elasticity of supply</b> is positive and grows with spare capacity and time.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Price elasticity of demand and total revenue" and "Price elasticity of supply" under Supply and Demand (15% to 20% of the exam). Expect midpoint calculations, "which good has the most elastic demand," "if demand is elastic, what happens to total revenue when price rises," and graphs of vertical or horizontal curves.</p>
</div>`,
  deeper:`
<h3>Constant unit elasticity</h3>
<p>Your course textbook §5.2 shows that a demand curve with elasticity 1 at every point is curved, not straight: each step down cuts price by a smaller dollar amount while keeping the percentage the same. A supply curve with constant unit elasticity is a straight line from the origin. You won't need to draw these for the exam.</p>
<h3>Who benefits from cheaper production?</h3>
<p>Your course textbook's aspirin example: when a breakthrough cuts production costs and supply shifts right, consumers gain most when demand is <b>inelastic</b>, because the price falls a lot. Producers can then lose revenue even though they produce more cheaply. The same logic explains why bumper harvests can hurt farmers and why coffee prices swing so widely (demand elasticity about 0.3).</p>
<h3>Netflix's 2011 price increase</h3>
<p>The textbook's chapter-opening case: Netflix raised its combined streaming-and-DVD price by about 60% in 2011, expecting to lose about 600,000 subscribers (an elasticity of roughly 0.05, very inelastic). It lost 810,000 instead. The textbook's explanation: more close substitutes (Hulu, Amazon Prime, Redbox) than the company counted on. Substitutes make demand more elastic.</p>`,
  links:[ {k:'Textbook',t:'5.3 Elasticity and Pricing',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-3-elasticity-and-pricing',w:'The newer edition of your course textbook\'s §5.3: the elasticity table, the band example and long run versus short run.'},
          {k:'Video',t:'Elasticity of Demand',s:'Marginal Revolution University',u:'https://learn.mru.org/lessons/elasticity-demand-definition',w:'A short video on the determinants of elasticity: substitutes, time, necessity and share of budget.'},
          {k:'Article',t:'Elasticity of Demand (topic page)',s:'Econlib',u:'https://www.econlib.org/library/Topics/HighSchool/ElasticityofDemand.html',w:'A short definition and links to related readings.'} ]
});
