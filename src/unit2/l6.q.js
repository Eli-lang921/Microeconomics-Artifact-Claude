/* ===== Lesson 6: Demand and Supply (Modern States video 2.1a) =====
   Common mistakes (M1-M6, used as distractors; see L6TAGS):
   M1 own price shifts the curve · M2 demand = quantity demanded · M3 more income always means more demand
   M4 related goods all move the same way · M5 "increase in supply" means the curve moves up · M6 expectations run backwards */
mc('l6-law','l6','The law of demand states which of the following?',
  [`Other things equal, a higher price leads to a lower quantity demanded`,`Other things equal, a higher price leads to a higher quantity demanded`,`When demand rises, the price always rises`,`When income rises, people buy more of every good`,`A lower price shifts the demand curve to the right`],0,
  `<p>Your course textbook calls the inverse relationship between price and quantity demanded "the law of demand," and it "assumes that all other variables that affect demand ... are held constant." Price up, quantity demanded down.</p><p>The tempting wrong answer is "a lower price shifts the demand curve to the right." A lower price moves buyers <b>along</b> the same demand curve to a larger quantity demanded; it doesn't shift the curve.</p>`);
mc('l6-dvsqd','l6','Which of the following correctly distinguishes <b>demand</b> from <b>quantity demanded</b>?',
  [`Demand is the whole curve or schedule; quantity demanded is one point on it, at one price`,`They mean the same thing`,`Demand is what one buyer wants; quantity demanded is what the whole market wants`,`Demand changes when the good\'s own price changes; quantity demanded changes when income changes`,`Quantity demanded is the curve; demand is one point on it`],0,
  `<p>Your course textbook: "demand refers to the curve and quantity demanded refers to the (specific) point on the curve." A change in the good's own price changes quantity demanded; anything else that changes buyers' willingness to buy changes demand.</p><p>The tempting wrong answer swaps the two causes: it is the good's own price that changes <b>quantity demanded</b>, and things like income that change <b>demand</b>.</p>`);
lazy('l6-gr-move','l6',()=>({ type:'mc', kind:'graph',
  prompt:`The graph shows the demand for a good. Buyers move from point A to point B.${sdg({xmax:20,ymax:10,xt:[0,10,13,20],yt:[0,5,7,10],lines:[{a:[7,9],b:[16,3],label:'D',lx:4,ly:-2}],dots:[{q:10,p:7,label:'A'},{q:13,p:5,label:'B'}]})}Which of the following most likely caused this move?`,
  options:[`The price of the good fell from $7 to $5`,`Buyers\' incomes rose`,`The price of a substitute rose`,`Buyers came to like the good more`,`More buyers entered the market`], answer:0,
  explain:`<p>A and B are on the <b>same</b> demand curve, so this is a movement along it. Only a change in the good's own price does that: the price fell from $7 to $5 and quantity demanded rose from 10 to 13 (your course's numbers).</p><p>The tempting wrong answers (income, a substitute's price, tastes, more buyers) are all real demand shifters. They would move the <b>whole curve</b>, not slide along it.</p>` }));
tf('l6-tf-ownprice','l6','A fall in a good\'s own price shifts its demand curve to the right.',false,
  `<p>False. A good's own price is on the vertical axis, so a change in it moves buyers <b>along</b> the curve: here, to a larger quantity demanded. Your course textbook: "a change in the price of a good never causes the demand or supply curve for that good to shift."</p>`);
mc('l6-inferior','l6','After graduating and getting a well-paid job, Dev buys far fewer packs of instant ramen, even though ramen\'s price has not changed. For Dev, ramen is which of the following?',
  [`An inferior good`,`A normal good`,`A complement to his income`,`A good whose quantity demanded fell because its price rose`,`A good with no demand`],0,
  `<p>An <b>inferior good</b> is one people buy less of when their income rises. Your course lists ramen, cheap beer and generic products as examples: with more money, people switch to options they like better.</p><p>The tempting wrong answer is "a normal good," the more common case where higher income raises demand. Here income rose and demand <b>fell</b>, which is the definition of inferior. "Inferior" is about how demand responds to income, not about quality.</p>`);
mc('l6-complement','l6','Hot dogs and hot dog buns are complements. If the price of hot dogs rises, which of the following happens in the market for hot dog <b>buns</b>?',
  [`Demand for buns decreases: the demand curve shifts left`,`Demand for buns increases: the demand curve shifts right`,`The quantity of buns demanded falls along the same curve, because buns now cost more`,`Nothing, because the price of buns did not change`,`The supply of buns decreases`],0,
  `<p>Complements are used together. When hot dogs cost more, people buy fewer hot dogs, so they need fewer buns at every bun price: <b>demand for buns falls</b>. Your course's graph shows buns falling from 6 to 5 at $1.50.</p><p>The tempting wrong answer treats it like a substitute (demand rises). That is what happens to <b>hamburgers</b> when hot dogs get pricier. "Quantity demanded falls along the curve" is also wrong: the price of buns didn't change, so it's a shift, not a slide.</p>`);
gen('l6-g-shift','l6',()=>{
  const p0=pick([4,5,6]), base=[pick([14,15,16])]; for(let i=1;i<4;i++) base.push(base[i-1]-pick([1,2]));
  const add=pick([3,4,5]); const prices=[p0,p0+1,p0+2,p0+3]; const k=pick([0,1,2,3]);
  const tbl=table(['Price',...prices.map(money)],[['Quantity demanded before',...base],['Quantity demanded after',...base.map(q=>q+add)]]);
  return { type:'num', kind:'num', prompt:`Made-up numbers. After a popular video praises a sneaker brand, its demand schedule changes:${tbl}At a price of <b>${money(prices[k])}</b>, by how many pairs did the quantity demanded change?`,
    answer:add, unit:'pairs',
    explain:`<p>At ${money(prices[k])}: ${base[k]+add} − ${base[k]} = <b>${add} more pairs</b>. The rise is the same at every price, so the whole demand curve shifted right by ${add}: a change in tastes, one of your course's five demand shifters.</p><p>The common slip is subtracting across prices (reading along one row). That compares two points on the same curve, which is a movement, not the shift this question asks about.</p>` };
});
mc('l6-supply-shifter','l6','The price of wood rises. In the market for wooden tables, which of the following happens?',
  [`Supply decreases: the supply curve shifts left`,`Supply increases: the supply curve shifts right`,`Demand for tables decreases: the demand curve shifts left`,`The quantity of tables supplied rises along the same supply curve`,`Nothing changes until the price of tables changes`],0,
  `<p>Wood is an input. Your course: a higher input price raises the cost of production, so at each table price firms supply fewer tables. In its example, at $100 a table the quantity supplied falls from 150 to 100: the supply curve shifts <b>left</b>.</p><p>The tempting wrong answer is "demand decreases." Buyers' willingness to pay didn't change; the change hit the sellers' costs, so it is a <b>supply</b> shift.</p>`);
lazy('l6-gr-supply','l6',()=>({ type:'mc', kind:'graph',
  prompt:`The supply of a good moved from S0 to S1.${sdg({xmax:20,ymax:10,xt:[0,5,10,15,20],yt:[0,5,10],lines:[{a:[4,2],b:[16,9],label:'S0',c:'var(--muted)',dash:'5 4',lx:-4,ly:-6,anchor:'end'},{a:[0,3],b:[12,9],label:'S1',lx:-4,ly:-6,anchor:'end'}]})}Which of the following could have caused this shift?`,
  options:[`A drought that destroys part of the crop`,`A new technology that cuts the cost of production`,`An increase in the number of sellers`,`A rise in the price of the good`,`A government subsidy to producers`], answer:0,
  explain:`<p>S1 lies to the <b>left</b> of S0: at every price, sellers offer less. That is a decrease in supply. A drought is a natural condition that raises costs and cuts output; your course textbook gives a drought on China's Manchurian Plain as an example.</p><p>Better technology, more sellers and a subsidy all shift supply to the <b>right</b>. A rise in the good's own price moves sellers along the curve. Watch the picture: a leftward shift also looks "higher," which tempts people to call it an increase.</p>` }));
tf('l6-tf-inferior','l6','When people\'s incomes rise, the demand for every good increases.',false,
  `<p>False. That is true for <b>normal goods</b>, but demand for <b>inferior goods</b> falls when income rises. Your course: after Sally's raise she buys Starbucks lattes (normal) and stops buying gas-station coffee (inferior).</p>`);
mc('l6-expect','l6','Farmers expect the price of corn to be much higher three months from now. Which of the following is the most likely effect on the supply of corn <b>today</b>?',
  [`Supply today decreases, because farmers hold some corn back to sell later at the higher price`,`Supply today increases, because farmers expect higher prices`,`Demand for corn today increases`,`Nothing, because only today\'s price matters to sellers`,`The quantity supplied today rises along the supply curve`],0,
  `<p>Your course: if a firm expects a higher price later, it will "hold off" and sell later, so supply <b>today</b> shifts left. Expectations work through the timing of sales.</p><p>The tempting wrong answer is "supply today increases, because farmers expect higher prices." The higher price hasn't happened yet; what farmers expect changes <b>when</b> they want to sell, and later looks better than now.</p>`);
gen('l6-g-schedule','l6',()=>{
  const ps=[5,6,7], q0=pick([8,9,10,11]); const qs=[q0, q0+pick([1,2,3]), 0]; qs[2]=qs[1]+pick([1,2]);
  const from=0, to=2; const ans=qs[to]-qs[from];
  return { type:'num', kind:'num', prompt:`Made-up numbers. A firm\'s supply schedule:${table(['Price',...ps.map(money)],[['Quantity supplied',...qs]])}If the market price rises from $5 to $7 and nothing else changes, by how many units does the quantity supplied change?`,
    answer:ans, unit:'units',
    explain:`<p>Read along the schedule: at $5 the firm supplies ${qs[0]}; at $7 it supplies ${qs[2]}. ${qs[2]} − ${qs[0]} = <b>${ans} more units</b>.</p><p>This is a <b>movement along</b> the supply curve (the law of supply), not a shift: only the good's own price changed. Your course's version: $5 to $7 moves quantity supplied from 10 to 13.</p>` };
});
/* L6 more */
mc('l6-assume','l6','Your course\'s supply and demand model rests on several assumptions. Which of the following is <b>not</b> one of them?',
  [`One large seller sets the market price`,`There are many buyers and sellers`,`The goods sold are identical`,`Everyone has equal access to information`,`There are no externalities`],0,
  `<p>The model assumes perfect competition (many buyers and sellers, identical goods, no cost to enter or leave), equal information and no externalities. The point of these assumptions, in your course's words: "no single economic agent can unilaterally exert any price control."</p><p>"One large seller sets the price" is the opposite: that is a market with market power, which you'll meet in Unit 5 (monopoly).</p>`);
tf('l6-tf-willing','l6','In economics, demand counts everything people would like to have, whether or not they can pay for it.',false,
  `<p>False. Your course textbook defines demand as the amount consumers are "willing <b>and able</b>" to buy at each price: "If you cannot pay for it, you have no effective demand." That is why income is a demand shifter.</p>`);
mc('l6-substitute','l6','Hondas and Fords are substitutes. If the price of Hondas rises, which of the following happens in the market for Fords?',
  [`Demand for Fords increases: the demand curve shifts right`,`Demand for Fords decreases: the demand curve shifts left`,`The quantity of Fords demanded rises along the same demand curve`,`The supply of Fords decreases`,`Nothing, because the price of Fords has not changed`],0,
  `<p>Substitutes replace each other. Pricier Hondas send some buyers to Fords, so at every Ford price more Fords are wanted: demand for Fords shifts <b>right</b>. (Your course textbook uses this pair: "the price of a Honda may affect your demand for a Ford.")</p><p>The tempting wrong answer, "demand for Fords decreases," is what would happen with complements. "Moves along the curve" is wrong because the price of <b>Fords</b> didn't change.</p>`);
mc('l6-tastes','l6','From 1980 to 2014, U.S. chicken consumption per person rose from 48 to 85 pounds a year while beef fell from 77 to 54. Your course textbook says this was largely due to which of the following?',
  [`A change in tastes, shifting demand for chicken right and for beef left`,`A fall in the price of chicken, moving buyers along the demand curve`,`A fall in incomes, since chicken is an inferior good`,`A decrease in the supply of beef`,`A government price control on beef`],0,
  `<p>The textbook says changes like these are "largely due to movements in taste, which change the quantity of a good demanded at every price": demand for chicken shifted right and demand for beef shifted left.</p><p>The tempting wrong answer explains it with chicken's own price. A price change would move buyers along a curve; a shift in what people want changes the whole curve.</p>`);
mc('l6-population','l6','The share of older people in the U.S. population keeps rising. What does this most likely do in the market for hearing aids?',
  [`Increases demand, shifting the demand curve right`,`Increases supply, shifting the supply curve right`,`Raises the quantity demanded along the same demand curve`,`Decreases demand, because older people have lower incomes`,`Has no effect, because population is not a demand shifter`],0,
  `<p>A change in the size or makeup of the population changes the number of buyers. Your course textbook: a society with relatively more elderly people "has a higher demand for nursing homes and hearing aids." More buyers at every price = demand shifts <b>right</b>.</p><p>The tempting wrong answer, "raises the quantity demanded along the curve," mixes up a shift with a movement: nothing happened to the price of hearing aids.</p>`);
tf('l6-tf-supply-up','l6','An increase in supply shifts the supply curve upward on the graph.',false,
  `<p>False, and it's a classic trap. An increase in supply means more is offered at every price, so the curve shifts <b>right</b>, which on the graph looks lower. A decrease in supply shifts it left, which looks higher. Read shifts left and right along the quantity axis.</p>`);
mc('l6-tech','l6','In the 1960s and 1970s, "Green Revolution" seeds roughly doubled wheat and rice harvests per acre in many low-income countries. In those grain markets, what did this do?',
  [`Increased supply: the supply curve shifted right`,`Decreased supply: the supply curve shifted left`,`Increased demand: the demand curve shifted right`,`Raised the price of grain along the supply curve`,`Had no effect on supply, because it did not change the price of grain`],0,
  `<p>Better technology lets farmers grow more with the same land and labor, which lowers the cost per unit. Your course textbook: "A technological improvement that reduces costs of production will shift supply to the right." Your course video gives robots in car factories as its example.</p><p>The tempting wrong answer is "increased demand." The change happened on the farms, to the cost of producing grain, not to buyers' willingness to pay.</p>`);
mc('l6-subsidy','l6','The government starts paying solar-panel makers $50 for every panel they produce. In the solar-panel market, which of the following happens?',
  [`Supply increases, because the subsidy lowers producers\' costs`,`Supply decreases, because the government is now involved`,`Demand increases, because buyers receive the $50`,`The quantity supplied rises only if the price of panels rises`,`Nothing, because subsidies are not a supply shifter`],0,
  `<p>Your course textbook: "Government subsidies reduce the cost of production and increase supply at every given price, shifting supply to the right." A tax or a costly regulation does the opposite.</p><p>The tempting wrong answer is "demand increases, because buyers receive the $50." In this question the payment goes to the <b>producers</b>, so it changes their costs: a supply shift.</p>`);
lazy('l6-gr-demand-right','l6',()=>({ type:'mc', kind:'graph',
  prompt:`Demand for lattes moved from D0 to D1.${sdg({xmax:20,ymax:10,xt:[0,5,10,15,20],yt:[0,5,10],lines:[{a:[2,9],b:[12,2],label:'D0',c:'var(--muted)',dash:'5 4'},{a:[6,9],b:[16,2],label:'D1'}]})}Which of the following could explain the shift? Assume lattes are a normal good.`,
  options:[`Buyers\' incomes rose`,`The price of lattes fell`,`The price of milk, an input to lattes, fell`,`The price of drip coffee, a substitute, fell`,`Coffee shops expect latte prices to rise next month`], answer:0,
  explain:`<p>D1 is to the <b>right</b> of D0: buyers want more lattes at every price. For a normal good, higher income does that, like Sally switching to $4.50 lattes after her raise in your course.</p><p>A fall in the latte price is a movement along D0. Cheaper milk shifts <b>supply</b>, not demand. A cheaper substitute pulls buyers away (demand shifts left). Sellers' expectations affect supply.</p>` }));
gen('l6-g-income','l6',()=>{
  const rows=[[16000,22.0,24.0],[18000,20.0,22.0],[20000,18.0,20.0],[22000,17.0,19.0],[24000,16.5,18.5],[26000,16.0,18.0]];
  const r=pick(rows);
  return { type:'num', kind:'num', prompt:`Your course textbook\'s car example (Table 3.4). When incomes rise, demand moves from D0 to D1:${table(['Price','D0 (millions)','D1 (millions)'],rows.map(x=>[money(x[0]),x[1].toFixed(1),x[2].toFixed(1)]))}At a price of <b>${money(r[0])}</b>, how many more cars (in millions) are demanded after incomes rise?`,
    answer:round(r[2]-r[1],1), unit:'million cars',
    explain:`<p>Compare the two columns at the same price: ${r[2].toFixed(1)} − ${r[1].toFixed(1)} = <b>${fmt(r[2]-r[1])} million</b>. Higher income raises the quantity demanded at every price, so the whole curve shifts right.</p><p>The common slip is comparing two prices in the same column; that is a movement along one curve.</p>` };
},'num');
mc('l6-buyers-expect','l6','Shoppers hear that coffee prices will jump next month because of a bad harvest. What most likely happens to the demand for coffee <b>this week</b>?',
  [`It increases, as shoppers stock up before the price rises`,`It decreases, because coffee will be more expensive`,`It does not change until the price actually rises`,`The supply of coffee this week increases`,`The quantity demanded falls along the demand curve`],0,
  `<p>Your course textbook: "If people learn that the price of a good like coffee is likely to rise in the future, they may head for the store to stock up on coffee now." Expecting a higher price later shifts demand today to the <b>right</b>. (Your course's holiday-sale example runs the other way: expecting a lower price later, buyers wait.)</p><p>The tempting wrong answer, "it decreases, because coffee will be more expensive," reverses the timing: buying now is how shoppers avoid the higher price.</p>`);
tf('l6-tf-related','l6','When the price of a complement rises, demand for the other good rises.',false,
  `<p>False. Complements are used together, so when one costs more, people buy less of it and need less of the other: demand for the other good <b>falls</b>. Demand rises when the price of a <b>substitute</b> rises.</p>`);
mc('l6-qsdef','l6','<b>Quantity supplied</b> is which of the following?',
  [`The amount sellers are willing to sell at one particular price`,`The whole supply curve`,`The amount buyers want to buy at one price`,`The total amount of a good in existence`,`The amount sellers have left over after a sale`],0,
  `<p>Your course: quantity supplied is "the amount of the good that sellers are willing to sell at every price point," one point at a time. The full set of points is <b>supply</b>, the curve.</p><p>The tempting wrong answer is "the whole supply curve," which mixes up supply with quantity supplied, the same trap as demand vs quantity demanded.</p>`);
mc('l6-notshift','l6','Which of the following would <b>not</b> shift the demand curve for pizza?',
  [`A fall in the price of pizza`,`A rise in buyers\' incomes`,`A fall in the price of wings, a complement`,`A new study showing pizza is healthy`,`A large college opening nearby`],0,
  `<p>A change in pizza's own price moves buyers <b>along</b> the pizza demand curve. Everything else on the list changes how much pizza people want at each price (income, a related good's price, tastes, number of buyers), so those shift the curve.</p><p>This is the most-tested idea in Unit 2: own price → movement along; anything else → shift.</p>`);
mc('l6-sellers','l6','Several new food trucks start selling tacos in a town square. In the town\'s taco market, which of the following happens?',
  [`Supply increases: the supply curve shifts right`,`Demand increases: the demand curve shifts right`,`Supply decreases, because each truck sells less`,`The quantity supplied rises along the same supply curve`,`The demand curve shifts left`],0,
  `<p>More sellers means more is offered at every price. Your course: "More sellers means that there's more production at each price," so supply shifts <b>right</b>.</p><p>The tempting wrong answer is "demand increases." New trucks are sellers, not buyers. "Each truck sells less" may happen later, but the market supply still rises.</p>`);
lazy('l6-gr-shiftvsmove','l6',()=>({ type:'mc', kind:'graph',
  prompt:`Points A and B are on demand curve D0. Point C is on D1.${sdg({xmax:20,ymax:10,xt:[0,5,10,15,20],yt:[0,4,7,10],lines:[{a:[2,9],b:[12,2],label:'D0',c:'var(--muted)'},{a:[7,9],b:[17,2],label:'D1'}],dots:[{q:4.857,p:7,label:'A'},{q:9.143,p:4,label:'B'},{q:9.857,p:7,label:'C'}]})}Which move shows an <b>increase in demand</b>?`,
  options:[`From A to C`,`From A to B`,`From B to A`,`From C to A`,`From C to B`], answer:0,
  explain:`<p>An increase in demand is a shift of the whole curve to the right: at the same price ($7), buyers now want more. That moves the market from A on D0 to C on D1.</p><p>A to B and B to A are movements <b>along</b> D0 (a change in quantity demanded, caused by the good's own price). C to A is a <b>decrease</b> in demand, and C to B combines a shift back with a price change.</p>` }));

/* ===== Lesson 6 quick checks (inline; not scheduled from the lesson page) ===== */
mc('l6c-market','l6','In your course\'s model of a competitive market, why can\'t a single seller charge more than the market price?',
  [`Buyers would simply buy the identical good from one of the many other sellers`,`The government sets the price for everyone`,`Sellers agree among themselves to charge the same price`,`Buyers are required to pay the market price by law`,`Each seller has a different product, so prices can\'t be compared`],0,
  `<p>With many sellers of an identical good and well-informed buyers, a seller who asks more loses every customer to the others. Your course: "Nobody will buy from them, they'll simply go to the other sellers." The same logic stops a buyer from paying less.</p><p>The tempting wrong answer is "the government sets the price." In this model nobody sets it; it comes out of everyone's choices.</p>`);
mc('l6c-qd','l6','Your course\'s demand schedule: at $5, buyers want 13 units; at $6, 12 units; at $7, 10 units. If the price rises from $5 to $7, which of the following is true?',
  [`Quantity demanded falls by 3 units, a movement along the demand curve`,`Demand falls by 3 units, so the demand curve shifts left`,`Quantity demanded rises by 3 units`,`Demand rises, because the good is now worth more`,`Nothing changes, because the schedule stays the same`],0,
  `<p>13 − 10 = 3 fewer units. The schedule itself didn't change; buyers just moved to a different row of it. That is a change in <b>quantity demanded</b>: a movement along the curve.</p><p>The tempting wrong answer calls it a fall in <b>demand</b>. Demand (the whole schedule) is the same as before.</p>`);
mc('l6c-move','l6','A coffee shop raises its price for a muffin from $3 to $4 and sells fewer muffins. Nothing else changed. On a graph of muffin demand, this is shown as which of the following?',
  [`A movement up and to the left along the same demand curve`,`A shift of the demand curve to the left`,`A shift of the demand curve to the right`,`A movement along the supply curve only`,`A new demand curve drawn at $4`],0,
  `<p>Only the muffin's own price changed, so buyers slide along the existing demand curve to a higher price and a smaller quantity demanded.</p><p>The tempting wrong answer is "a shift to the left." Buyers' willingness to pay at each price is the same as before; they're simply facing a higher price.</p>`);
mc('l6c-inferior','l6','When Sally gets a raise, she stops buying coffee at the gas station and buys lattes instead. Which of the following is true?',
  [`Gas-station coffee is an inferior good and lattes are a normal good for Sally`,`Both are normal goods`,`Both are inferior goods`,`Lattes are an inferior good because they cost more`,`Gas-station coffee is a normal good because it is cheaper`],0,
  `<p>This is your course's example. When income rises, demand for a <b>normal</b> good rises (lattes) and demand for an <b>inferior</b> good falls (gas-station coffee).</p><p>The tempting wrong answers judge by price or quality. The test is only how demand responds when income changes.</p>`);
mc('l6c-complement','l6','A new law lowers the price of printers. What most likely happens to the demand for printer ink?',
  [`It increases, because printers and ink are complements`,`It decreases, because printers and ink are substitutes`,`It does not change, because the price of ink did not change`,`The supply of ink increases`,`The quantity of ink demanded falls along the curve`],0,
  `<p>Printers and ink are used together. Cheaper printers mean more printers in use, so people want more ink at every ink price: demand for ink shifts <b>right</b>. A lower price of a complement raises demand.</p><p>The tempting wrong answer, "it does not change," forgets that demand depends on the prices of <b>related goods</b>, not only the good's own price.</p>`);
mc('l6c-supply','l6','Why does the supply curve slope upward?',
  [`A higher price makes it worth producing more, because it covers the higher cost of making extra units`,`Sellers are greedy and always want higher prices`,`Buyers demand more when prices rise`,`The government requires firms to produce more at higher prices`,`Costs fall as prices rise`],0,
  `<p>Your course: sellers want "at the very least" to cover their costs. Your course textbook: a higher price "makes it more profitable for gasoline producers to expand their output." Producing more usually costs more per extra unit, so firms supply more only at a higher price.</p><p>The tempting wrong answer, "buyers demand more when prices rise," gets the law of demand backwards and is about buyers, not sellers.</p>`);
mc('l6c-expect','l6','A bakery expects the price of flour to rise sharply next month. Using your course\'s reasoning, what happens to the bakery\'s supply of bread <b>this month</b>?',
  [`It increases, because the bakery bakes more now while flour is still cheap`,`It decreases, because flour will cost more`,`It does not change until the flour price actually rises`,`Demand for bread increases`,`The bakery moves down along its supply curve`],0,
  `<p>Your course: "if they expect the inputs to become more expensive in a few months ... they'll produce more today to sell today." Expecting costlier inputs later makes producing <b>now</b> relatively attractive, so supply this month shifts right.</p><p>The tempting wrong answer, "it decreases, because flour will cost more," applies next month's cost to this month. Flour is still cheap today.</p>`);
mc('l6c-input','l6','The price of steel, a key input in making cars, falls. According to your course textbook, what happens in the car market?',
  [`Supply of cars increases: at every price, carmakers supply more`,`Demand for cars increases`,`Supply of cars decreases`,`The price of cars rises along the supply curve`,`Nothing, until car prices change`],0,
  `<p>Cheaper steel lowers the cost of making each car, so making cars is more profitable at any given price. Your course textbook: the supply curve shifts right, from 18 to 19.8 million cars at $20,000.</p><p>The tempting wrong answer is "demand for cars increases." Steel is the carmakers' cost, not something buyers pay for directly.</p>`);
mc('l6c-skill','l6','In the market for umbrellas, which of the following events shifts the <b>supply</b> curve rather than the demand curve?',
  [`A cheaper fabric for umbrella canopies is invented`,`A rainy season is forecast`,`The price of raincoats, a substitute, rises`,`More tourists visit the city`,`The price of umbrellas falls`],0,
  `<p>Cheaper fabric lowers sellers' costs: a <b>supply</b> shift (right). The forecast, raincoat prices and more tourists all change what buyers want: <b>demand</b> shifts. The umbrella's own price is a movement along a curve.</p><p>The quick test: ask whose plans changed first, the buyers' or the sellers'.</p>`);

/* Course materials checked 2026-10-22: video 2.1a transcript, Module 2 slides 1-22, course textbook §3.1-3.2. */
const L6TAGS = {
  'l6-law':['OS31 MS2','det','terms','M1 M4'], 'l6-dvsqd':['OS31','det','terms','M2 M1'], 'l6-gr-move':['MS2','det','graphs','M1'],
  'l6-tf-ownprice':['OS33 MS2','det','terms','M1'], 'l6-inferior':['MS2 OS32','det','models','M3'], 'l6-complement':['MS2','det','models','M4 M1'],
  'l6-g-shift':['MS2','det','data','M1 M2'], 'l6-supply-shifter':['MS2','det','models','M5 M1'], 'l6-gr-supply':['OS32','det','graphs','M5 M1'],
  'l6-tf-inferior':['MS2 OS32','det','terms','M3'], 'l6-expect':['MS2','det','models','M6 M1'], 'l6-g-schedule':['MS2','det','data','M1 M2'],
  'l6-assume':['MS2','det','terms',''], 'l6-tf-willing':['OS31','det','terms','M2'], 'l6-substitute':['OS32 MS2','det','models','M4 M1'],
  'l6-tastes':['OS32','det','data','M1'], 'l6-population':['OS32','det','models','M1 M3'], 'l6-tf-supply-up':['OS32','det','graphs','M5'],
  'l6-tech':['OS32 MS2','det','models','M5 M1'], 'l6-subsidy':['OS32','det','models','M5 M1'], 'l6-gr-demand-right':['MS2 OS32','det','graphs','M1 M4'],
  'l6-g-income':['OS32','det','data','M1 M2'], 'l6-buyers-expect':['OS32 MS2','det','models','M6 M1'], 'l6-tf-related':['MS2 OS32','det','terms','M4'],
  'l6-qsdef':['MS2 OS31','det','terms','M2'], 'l6-notshift':['OS32 MS2','det','models','M1 M4'], 'l6-sellers':['MS2','det','models','M1'],
  'l6-gr-shiftvsmove':['OS32','det','graphs','M1 M2'],
  'l6c-market':['MS2','det','models',''], 'l6c-qd':['MS2','det','data','M2 M1'], 'l6c-move':['MS2 OS33','det','models','M1'],
  'l6c-inferior':['MS2','det','terms','M3'], 'l6c-complement':['MS2 OS32','det','models','M4 M1'], 'l6c-supply':['MS2 OS31','det','terms',''],
  'l6c-expect':['MS2','det','models','M6'], 'l6c-input':['OS32','det','models','M5'], 'l6c-skill':['MS2 OS32','det','models','M1 M4']
};
u2tag(L6TAGS);

U2_CARDS.l6 = [
  ['Competitive market','What makes a market "competitive" in your course\'s supply and demand model, and why does it matter?','Many buyers and sellers, identical goods, no cost to enter or leave, equal information and no externalities. Because of this, no single buyer or seller can set the price; it comes out of everyone\'s choices together.','A farmer at a big wheat market can\'t charge more than the going price: buyers would buy identical wheat from someone else.','Competitive doesn\'t mean firms fight with ads. It means no one has power over the price.'],
  ['Demand vs. quantity demanded','What is the difference between demand and quantity demanded?','Demand is the whole relationship between price and the amount buyers want, shown as a demand schedule (a table) or a demand curve (its graph, sloping down). Quantity demanded is the amount at one specific price (one point on the curve).','Your course\'s schedule: $5 → 13, $6 → 12, $7 → 10. The whole table is demand; "12 units at $6" is a quantity demanded.','A change in the good\'s own price changes quantity demanded, not demand.'],
  ['Law of demand','What does the law of demand say, and why does demand slope down?','Other things equal, a higher price means a lower quantity demanded. Each buyer has a maximum price they\'ll pay, so at a higher price fewer buyers are still willing; and people find ways to use less or switch to something else.','Gas gets pricier: people carpool, combine errands and take trips closer to home (your course textbook).','The law holds only "other things equal." If incomes also change, you have to analyze both changes.'],
  ['Movement along vs. shift','What causes a movement along a demand curve, and what causes the whole curve to shift?','A change in the good\'s own price causes a movement along the curve. A change in anything else that affects buyers (income, related goods\' prices, tastes, number of buyers, expectations) shifts the whole curve.','Price falls from $7 to $5: quantity demanded rises from 10 to 13 along the curve. Incomes rise: at $7, buyers now want 15 instead of 10, a shift.','A price change never shifts that good\'s own demand or supply curve.'],
  ['Normal good','What is a normal good? Give an example.','A good whose demand rises when income rises (and falls when income falls). Most goods are normal.','After her raise, Sally starts buying $4.50 Starbucks lattes (your course).','Normal doesn\'t mean ordinary or good quality; it\'s about demand rising with income.'],
  ['Inferior good','What is an inferior good? Is it a low-quality good?','A good whose demand falls when income rises, because people switch to options they prefer. It describes how demand responds to income, not the good\'s quality.','Ramen, cheap beer, generic products and Sally\'s gas-station coffee (your course).','Higher income doesn\'t raise demand for everything.'],
  ['Complements','What are complements, and how does a change in one\'s price affect the other?','Goods used together. If the price of one rises, people buy less of it and need less of the other, so demand for the other falls (and vice versa).','Hot dogs get pricier: demand for hot dog buns falls; at $1.50, buns drop from 6 to 5 (your course).','Opposite of substitutes: don\'t mix up the direction.'],
  ['Substitutes','What are substitutes, and how does a change in one\'s price affect the other?','Goods that can replace each other. If the price of one rises, people switch to the other, so demand for the other rises.','Hot dogs get pricier: demand for hamburgers rises from 7 to 8 at $4 (your course).','The other good\'s price changes demand for this one (a shift), not its quantity demanded.'],
  ['Five demand shifters','List your course\'s five factors that shift demand.','1. Income (normal or inferior goods). 2. Prices of related goods (complements, substitutes). 3. Tastes and preferences. 4. Number of buyers. 5. Expectations about future prices and income.','Flip-flops in summer (tastes), laptops getting popular (buyers), waiting for a holiday sale (expectations).','The good\'s own price is not on the list.'],
  ['Expectations and demand','How do buyers\' expectations about future prices shift demand today?','Expecting a higher price later makes buyers buy more now (demand today shifts right). Expecting a lower price later, like a sale, makes them wait (demand today shifts left).','A coming holiday sale: you hold off buying a TV (your course). A coffee price hike announced: shoppers stock up now (your course textbook).','An expected price rise raises demand today; don\'t run it backwards.'],
  ['Law of supply','What does the law of supply say, and why does supply slope up?','Other things equal, a higher price means a higher quantity supplied. Sellers want at least to cover their costs, and a higher price makes it worth producing extra units that cost more to make.','Your course\'s supply schedule: $5 → 10, $6 → 12, $7 → 13.','A higher price moves sellers along the supply curve; it doesn\'t shift supply.'],
  ['Supply shifters','What shifts supply? Give your course\'s four and the textbook\'s extras.','Course: prices of inputs (the materials, labor and machines used to make the good), production technology, number of sellers, expectations. Textbook adds natural conditions (weather) and government policies (taxes and regulations shift supply left; subsidies shift it right).','Pricier wood: at $100, tables supplied fall from 150 to 100 (your course).','Anything that raises costs shifts supply left.'],
  ['Expectations and supply','How do sellers\' expectations shift supply today?','Expecting a higher price for the good later: sellers hold back now (supply today shifts left). Expecting inputs to cost more later: they produce more now (supply today shifts right).','Farmers expecting higher corn prices store corn instead of selling it today.','Think about timing: when is it better to sell or produce?'],
  ['Increase vs. decrease in supply','On a graph, which way does the supply curve move when supply increases?','To the right: more is offered at every price. That looks lower on the graph. A decrease moves it left, which looks higher.','New technology lowers costs: the supply curve shifts right.','Don\'t read "increase" as "up." Read shifts along the quantity axis.'],
  ['Ceteris paribus','What does ceteris paribus mean, and why do economists use it?','"Other things being equal." A demand or supply curve shows how quantity responds to price with everything else held fixed, so economists change one factor at a time and then combine the results.','If price rises and income falls at the same time, analyze each separately; both cut the amount bought (your course textbook).','When something else does change, the curve shifts; it\'s no longer a move along one curve.'],
  ['Supply vs. quantity supplied','What is the difference between supply and quantity supplied?','Supply is the whole relationship between price and the amount sellers are willing and able to sell (the supply schedule or curve). Quantity supplied is the amount at one specific price (one point on the curve).','Your course\'s supply schedule: $5 → 10, $6 → 12, $7 → 13. The whole table is supply; "12 units at $6" is a quantity supplied.','A change in the good\'s own price changes quantity supplied, not supply.']
];

Object.assign(U2_WRITE, {
  'w-l6-1':{lesson:'l6',prompt:'Explain the difference between a change in demand and a change in quantity demanded. Use one example of each from the same market.',
    model:'Demand is the whole relationship between price and the amount buyers want; quantity demanded is the amount at one price. A change in quantity demanded comes only from a change in the good\'s own price and is a movement along the same curve: if pizza goes from $10 to $8, people buy more pizza. A change in demand comes from something else, like income, the price of a related good, tastes, the number of buyers or expectations, and shifts the whole curve: if a big college opens nearby, people want more pizza at every price, so the curve moves right.',
    checklist:['Defines demand as the whole curve or schedule and quantity demanded as one point or price','Says a change in the good\'s own price causes a movement along the curve','Says a non-price factor shifts the whole curve, naming one such factor','Gives a correct example of each in the same market']},
  'w-l6-2':{lesson:'l6',prompt:'Pick a good you buy often. Describe one event that would shift its demand and one that would shift its supply. For each, say which way the curve moves and why.',
    model:'Take coffee. If a study found coffee improves health, tastes would shift toward it, so people would want more at every price and demand would shift right. If a drought hit coffee farms in Brazil, growing coffee would cost more and there would be less to sell at each price, so supply would shift left. The demand shift comes from buyers\' side (willingness to buy); the supply shift comes from sellers\' costs (willingness to sell).',
    checklist:['Gives an event that shifts demand and names the factor (income, related good, tastes, buyers or expectations)','Gives the correct direction for the demand shift with a reason','Gives an event that shifts supply and names the factor (input price, technology, sellers, expectations, nature or policy)','Gives the correct direction for the supply shift with a reason']}
});

U2_PLAN.l6 = {
  core:['l6-law','l6-dvsqd','l6-gr-move','l6-tf-ownprice','l6-inferior','l6-complement','l6-g-shift','l6-supply-shifter','l6-gr-supply','l6-tf-inferior','l6-expect','l6-g-schedule'],
  more:['l6-assume','l6-tf-willing','l6-substitute','l6-tastes','l6-population','l6-tf-supply-up','l6-tech','l6-subsidy','l6-gr-demand-right','l6-g-income','l6-buyers-expect','l6-tf-related','l6-qsdef','l6-notshift','l6-sellers','l6-gr-shiftvsmove']
};

U2_LESSONS.push({ id:'l6', unit:2, title:'Demand and Supply', mins:45, src:'Modern States video 2.1a and Module 2 slides 1-22 · Course textbook (OpenStax) §3.1, §3.2',
  sources:['MS2','OS31','OS32','OS33','CB'],
  oneline:'Buyers want low prices and sellers want high ones. Demand and supply curves show how much each side wants at every price, and a short list of factors decides when those curves shift.',
  body:`
<h2>What a competitive market is</h2>
<!-- src: MS2 (video 2.1a: decentralized decisions, self-interest, three assumptions, "no single economic agent can unilaterally exert any price control"; slides 2-5) -->
<p>Lesson 4 showed that in a market economy, prices coordinate millions of choices with no one in charge. Unit 2 shows exactly how those prices are set. Your course starts with the place it happens: a ${dt('market','market')}, where buyers and sellers meet.</p>
<p>A ${dt('competitive-market','<b>competitive market</b>')} brings together the ${dt('decentralized','<b>decentralized</b>')} decisions of many buyers and sellers. Each acts in their own interest: buyers try to pay the lowest price they can, and sellers try to get the highest price they can.</p>
<p>Your course's supply and demand model makes three assumptions:</p>
<ol><li><b>Perfect competition:</b> many buyers and sellers, identical goods, and no cost to entering or leaving the market.</li><li><b>Equal access to information:</b> everyone knows what is going on in the market.</li><li><b>No externalities:</b> no side effects on people outside the deal (Unit 7 covers what happens when there are some).</li></ol>
<p><b>Why these assumptions matter:</b> together they mean no one can set the price alone. A seller who asks more than the going price loses every customer to sellers of the identical good. A buyer who offers less gets turned away, because other buyers will pay the going price. So the price has to come from everyone's choices together, which is what the rest of this unit studies.</p>
<div data-check="l6c-market"></div>

<h2>Demand and the law of demand</h2>
<!-- src: MS2 (video 2.1a: maximum price, apples, demand schedule $5/13 $6/12 $7/10; slides 7-8); OS31 (willing and able, demand vs quantity demanded, gasoline, law of demand held constant) -->
<p>${dt('demand','<b>Demand</b>')} comes from buyers. Your course textbook defines it as the amount of a good consumers are "willing and able to purchase at each price." Both parts count: "If you cannot pay for it, you have no effective demand."</p>
<p>Every buyer walks into a store with a <b>maximum price</b> in mind, whether they know it or not. Above it they walk out; below it they buy and are happy to pay less. The amount buyers want at one particular price is the ${dt('quantity-demanded','<b>quantity demanded</b>')}.</p>
<p><b>Worked example: your course's demand schedule.</b> A ${dt('demand-schedule','demand schedule')} lists the quantity demanded at each price:</p>
${table(['Price','$5','$6','$7'],[['Quantity demanded','13','12','10']])}
<p>Drawn on a graph, with price on the vertical axis and quantity on the horizontal axis, these points form the ${dt('demand-curve','<b>demand curve</b>')}. It slopes down. That is the ${dt('law-of-demand','<b>law of demand</b>')}: other things equal, a higher price means a lower quantity demanded.</p>
<p><b>Why it slopes down.</b> Two things happen when the price rises. First, it passes more buyers' maximum price, so they drop out. Second, people still buying find ways to use less. Your course textbook's example: when gas gets pricier, people combine errands, carpool or vacation closer to home. Both push the quantity demanded down.</p>
<p class="small muted">Watch the vocabulary: <b>demand</b> means the whole schedule or curve; <b>quantity demanded</b> means one point on it. Exams use the two words precisely.</p>
<div data-check="l6c-qd"></div>

<h2>Moving along the curve versus shifting it</h2>
<!-- src: MS2 (video 2.1a: movement $7→$5, 10→13; shift at $7 10→15 and $5 13→17; slides 9-10); OS33 (Clear It Up: a price change never shifts its own curve) -->
<p>Two very different things can change how much people buy, and the exam tests whether you can tell them apart.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a line of shoppers, each holding a card with the most they'd pay. If the store changes its price tag, some shoppers buy and others don't, but nobody's card changes: that is a <b>movement along</b> the curve. If something rewrites the cards (everyone gets a raise) or new shoppers join the line, the whole curve moves: a <b>shift</b>.</p></div>
<div class="terms">
${term('Movement along the curve','The good\'s <b>own price</b> changes. Buyers\' willingness to buy is the same, so they slide to a new point on the same curve. Your course: the price falls from $7 to $5 and quantity demanded rises from 10 to 13, from point A to point B.')}
${term('Shift of the curve','Something <b>other than the good\'s own price</b> changes how much buyers want at every price. Your course: at $7 buyers now want 15 instead of 10; at $5, 17 instead of 13. The whole curve moves right (an increase in demand) or left (a decrease).')}
</div>
<p><b>Why the own price can't shift its own curve:</b> the curve already shows what buyers do at every price. A new price just picks a different point on it. Your course textbook: "a change in the price of a good never causes the demand or supply curve for that good to shift."</p>
<div data-check="l6c-move"></div>

<h2>What shifts demand</h2>
<!-- src: MS2 (video 2.1a five factors; Sally $4.50 lattes 0→1, gas-station coffee, ramen, buns 6→5 at $1.50, hamburgers 7→8 at $4, flip-flops, laptops, holiday sales, suit; slides 11-14); OS32 (ceteris paribus, chicken/beef, population, coffee stock-up) -->
<p>Your course names <b>five factors</b> that shift demand. Each one changes buyers' <b>willingness or ability to buy</b> at every price:</p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Factor</th><th>Example from your course</th><th>Demand</th></tr></thead><tbody>
<tr><td><b>1. Income</b></td><td>Sally gets a raise and starts buying $4.50 lattes: a ${dt('normal-good','normal good')}. She stops buying gas-station coffee: an ${dt('inferior-good','inferior good')}.</td><td>Normal: right. Inferior: left.</td></tr>
<tr><td><b>2. Prices of related goods</b></td><td>Hot dogs get pricier. Buns, their ${dt('complements','complement')}, fall from 6 to 5 at $1.50. Hamburgers, a ${dt('substitutes','substitute')}, rise from 7 to 8 at $4.</td><td>Complement: left. Substitute: right.</td></tr>
<tr><td><b>3. Tastes and preferences</b></td><td>Flip-flops in summer; sunscreen after a move to the Southwest.</td><td>Toward the good: right.</td></tr>
<tr><td><b>4. Number of buyers</b></td><td>Laptops become popular and easy to use, so more people buy them.</td><td>More buyers: right.</td></tr>
<tr><td><b>5. Expectations</b></td><td>A holiday sale is coming, so you wait to buy a TV. A student with a job starting soon buys a suit now.</td><td>Depends on what is expected.</td></tr>
</tbody></table></div>
<p><b>The mechanism behind each.</b> Income changes the <b>ability</b> to pay; with more of it, people buy more of most goods but switch away from the ones they bought only because they were cheap. A related good changes what this good is worth to you: a pricier hot dog means fewer hot dogs eaten, so fewer buns needed, while hamburgers become the better deal. Tastes and the number of buyers change who wants it and how much. Expectations change <b>when</b> people buy: your course textbook notes that if coffee "is likely to rise in the future, they may head for the store to stock up on coffee now."</p>
<p>Try each factor. Notice which ones slide along the curve and which move it:</p>
<div data-widget="shifters"></div>
<div data-check="l6c-inferior,l6c-complement"></div>

<h2>Supply and the law of supply</h2>
<!-- src: MS2 (video 2.1a: sellers want highest price, cover costs; supply schedule $5/10 $6/12 $7/13; movement $5→$7 10→13; slides 15-18); OS31 (law of supply, gasoline producers expand output) -->
<p>${dt('supply','<b>Supply</b>')} comes from sellers, the people or firms producing the good. Each seller tries to get the highest price it can, and at the very least wants to <b>cover its costs</b>. The amount sellers are willing to sell at one price is the ${dt('quantity-supplied','<b>quantity supplied</b>')}.</p>
<p><b>Worked example: your course's supply schedule.</b></p>
${table(['Price','$5','$6','$7'],[['Quantity supplied','10','12','13']])}
<p>As the price rises, sellers offer more. That positive relationship is the ${dt('law-of-supply','<b>law of supply</b>')}, and the supply curve slopes up. If the price rises from $5 to $7, quantity supplied rises from 10 to 13: a movement along the supply curve.</p>
<p><b>Why it slopes up.</b> Making extra units usually costs more (overtime, older machines, less suitable land), so a firm only produces them when the price is high enough to cover that cost. Your course textbook's example: when gasoline prices rise, firms explore for more oil, drill more and keep stations open longer, because a higher price "makes it more profitable ... to expand their output."</p>
<div data-check="l6c-supply"></div>

<h2>What shifts supply</h2>
<!-- src: MS2 (video 2.1a four factors: wood/tables $100 150→100, robots, number of sellers, expectations of price and input prices; slides 19-20); OS32 (natural conditions: Manchurian Plain drought 2014; Green Revolution; taxes, regulations, subsidies; cars and steel 18→16.5/19.8 million; pizza cheese +$0.75) -->
<p>A supply shift means sellers offer a different quantity at <b>every</b> price. Your course lists four factors; your course textbook adds two more:</p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Factor</th><th>Example</th><th>Supply</th></tr></thead><tbody>
<tr><td><b>1. Prices of ${dt('inputs','inputs')}</b></td><td>Wood gets pricier, so at $100 a table firms supply 100 tables instead of 150 (your course).</td><td>Input up: left.</td></tr>
<tr><td><b>2. Production technology</b></td><td>Robots replace workers in car factories (your course). "Green Revolution" seeds doubled grain harvests per acre (textbook).</td><td>Better technology: right.</td></tr>
<tr><td><b>3. Number of sellers</b></td><td>More sellers means more produced at each price (your course).</td><td>More sellers: right.</td></tr>
<tr><td><b>4. Expectations</b></td><td>Expect a higher price for the good later: hold back now. Expect inputs to cost more later: produce more now (your course).</td><td>Depends on what is expected.</td></tr>
<tr><td><b>5. Natural conditions</b> (textbook)</td><td>A severe drought on China's Manchurian Plain in 2014 cut grain supply.</td><td>Bad weather: left.</td></tr>
<tr><td><b>6. Government policies</b> (textbook)</td><td>Taxes and costly regulations act like higher costs; a ${dt('subsidy','subsidy')} lowers costs.</td><td>Tax: left. Subsidy: right.</td></tr>
</tbody></table></div>
<p><b>The mechanism:</b> almost every supply shifter works through <b>cost</b>. Your course textbook: when costs fall while the price stays the same, profits rise, so "a firm will tend to supply a larger quantity at any given price." When costs rise, the opposite. Expectations work through timing instead: sellers move sales to whichever month pays better.</p>
<p><b>Worked example (your course textbook's cars, Table 3.5).</b> At $20,000 a car, carmakers supply 18 million cars. Steel, an input, gets more expensive:</p>
<div class="math">At $20,000: 18 million → 16.5 million cars supplied<br>Change: 16.5 − 18 = <b>−1.5 million</b> at the same price → supply shifts left</div>
<p>Check: the price of cars never changed in this example, so the drop can't be a movement along the curve. It has to be a shift.</p>
<p>Watch the picture: a <b>decrease</b> in supply moves the curve left, which also looks higher on the graph. An <b>increase</b> moves it right, which looks lower. Read supply shifts left and right, never up and down.</p>
<div data-check="l6c-expect,l6c-input"></div>

<h2>Shift or slide?</h2>
<!-- src: MS2; OS32; OS33. Exam skill: classifying an event as a shift of demand, a shift of supply or a movement along a curve. -->
<p>Most Unit 2 exam questions start with an event. Before drawing anything, sort it with two questions:</p>
<ol><li><b>Is it the good's own price?</b> Then it is a movement along a curve, not a shift.</li><li><b>If not, whose plans changed first?</b> Buyers' willingness or ability to buy → demand shifts. Sellers' costs, numbers or expectations → supply shifts. Then pick the direction.</li></ol>
<div data-widget="shiftsort"></div>
<div data-check="l6c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6; each is used as a wrong choice in this lesson's questions (see L6TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"A lower price shifts the demand curve to the right."</span>A change in the good's own price moves buyers along the same curve. Only other factors shift it, because the curve already shows every price.</li>
<li><span class="wrong">"Demand and quantity demanded mean the same thing."</span>Demand is the whole curve; quantity demanded is one point on it. The same goes for supply and quantity supplied.</li>
<li><span class="wrong">"When income rises, people buy more of everything."</span>That holds for normal goods. Demand for inferior goods (ramen, generic brands) falls, because people switch to what they prefer.</li>
<li><span class="wrong">"If a related good gets pricier, demand for this good falls."</span>Only for complements (used together). For substitutes, demand rises, because buyers switch to the cheaper option.</li>
<li><span class="wrong">"An increase in supply moves the supply curve up."</span>An increase moves it right (more at every price), which looks lower. A decrease moves it left, which looks higher.</li>
<li><span class="wrong">"Expecting a higher price later makes buyers buy less now and sellers sell more now."</span>It's the reverse. Buyers stock up now (demand today rises) and sellers hold back to sell later (supply today falls).</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A <b>competitive market</b> has many buyers and sellers of an identical good with equal information, so no one can set the price alone.</li>
<li><b>Demand</b> is how much buyers are willing and able to buy at each price. The <b>law of demand</b>: a higher price means a lower quantity demanded.</li>
<li>A change in the good's <b>own price</b> is a movement along the curve; anything else that changes buyers' plans <b>shifts</b> the whole curve.</li>
<li>The five <b>demand shifters</b>: income (normal or inferior), prices of related goods (complements or substitutes), tastes, number of buyers and expectations.</li>
<li><b>Supply</b> is how much sellers are willing to sell at each price. The <b>law of supply</b>: a higher price means a higher quantity supplied.</li>
<li>The <b>supply shifters</b> work mostly through cost: input prices, technology, number of sellers, expectations, natural conditions and government taxes, regulations or subsidies. Sort every event by asking whose plans changed first.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Determinants of supply and demand" under Supply and Demand (15% to 20% of the exam). Expect "Which of the following would shift the demand curve to the left?" questions, graph questions that ask what caused a move from one curve to another, and traps that mix up a shift with a movement along a curve.</p>
</div>`,
  deeper:`
<h3>Ceteris paribus: one change at a time</h3>
<p>Every demand or supply curve is drawn holding everything else fixed. Your course textbook calls this <b>${dt('ceteris-paribus','ceteris paribus')}</b>, "other things being equal." When two things change at once (the price rises and incomes fall), economists analyze each separately and then combine them: here, both reduce the amount bought.</p>
<h3>Reading a supply curve the other way</h3>
<p>Your course textbook's "Work It Out" reads the supply curve sideways: for each quantity, it shows the <b>lowest price</b> a firm will accept to make it. That price covers the cost of production plus the profit the firm needs. If cheese gets $0.75 more expensive per pizza, the firm needs $0.75 more for every pizza, so the whole supply curve moves up by $0.75. Up by the cost increase and left in quantity terms are the same shift viewed two ways, which is why the textbook calls it "an upward (or a leftward) shift."</p>
<h3>Market demand is a total</h3>
<p>The market demand curve adds up every buyer. A shift doesn't mean every buyer changes by the same amount. Your course textbook: "not everyone would have higher or lower income ... Instead, a shift in a demand curve captures [a] pattern for the market as a whole." Unit 3 shows how individual demand curves add up to the market curve.</p>`,
  links:[ {k:'Textbook',t:'3.2 Shifts in Demand and Supply for Goods and Services',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-2-shifts-in-demand-and-supply-for-goods-and-services',w:'The newer edition of your course textbook\'s §3.2, with the car tables and the full list of shifters. Wording differs in a few places.'},
          {k:'Video',t:'What Shifts the Demand Curve?',s:'Marginal Revolution University',u:'https://mru.org/courses/principles-economics-microeconomics/what-shifts-demand-curve',w:'A short second explanation of the demand shifters, if the table above didn\'t fully click.'},
          {k:'Article',t:'Demand',s:'David R. Henderson, Econlib',u:'https://www.econlib.org/library/Enc/Demand.html',w:'Encyclopedia entry on demand, with real examples of substitutes, complements and inferior goods.'} ]
});
