/* ===== Lesson 7: Market Equilibrium (Modern States video 2.1b) =====
   Common mistakes: M1 price above equilibrium causes a shortage · M2 the new price shifts the curves again
   M3 price and quantity always move the same way · M4 a double shift always settles both price and quantity
   M5 equilibrium means everyone who wants the good gets it · M6 a shortage is the same as scarcity */
const PQ = (p,q) => `Price: ${p} · Quantity: ${q}`;
mc('l7-def','l7','The <b>equilibrium price</b> in a market is the price at which which of the following is true?',
  [`Quantity demanded equals quantity supplied`,`Every buyer who wants the good can afford it`,`Sellers earn the highest possible profit`,`Demand equals supply at every price`,`The government is satisfied with the price`],0,
  `<p>Your course textbook: "The equilibrium price is the only price where the plans of consumers and the plans of producers agree," where quantity demanded equals quantity supplied. Nothing pushes the price up or down from there.</p><p>The tempting wrong answer is "every buyer who wants the good can afford it." Buyers whose maximum price is below the equilibrium price don't buy at all. Equilibrium means the market clears, not that everyone is served.</p>`);
gen('l7-g-schedule','l7',()=>{
  const pe=pick([3,4,5,6]), qe=pick([20,30,40]), bd=pick([5,10]), bs=pick([5,10]);
  const ps=[pe-2,pe-1,pe,pe+1,pe+2];
  const tbl=table(['Price',...ps.map(money)],[['Quantity demanded',...ps.map(p=>qe-bd*(p-pe))],['Quantity supplied',...ps.map(p=>qe+bs*(p-pe))]]);
  return { type:'num', kind:'num', prompt:`Made-up numbers for a market:${tbl}What is the equilibrium price, in dollars?`, answer:pe, unit:'dollars',
    explain:`<p>Look for the price where the two rows match: at ${money(pe)}, buyers want ${qe} and sellers offer ${qe}. That is the equilibrium price, and ${qe} is the equilibrium quantity.</p><p>At any higher price the supplied row is bigger (a surplus); at any lower price the demanded row is bigger (a shortage). Your course textbook: if you have only the schedules, "you could find the equilibrium by looking for the price level on the tables where the quantity demanded and the quantity supplied are equal."</p>` };
});
mc('l7-surplus','l7','The price of a good is set above its equilibrium price. Which of the following happens?',
  [`Quantity supplied exceeds quantity demanded, and the surplus pushes the price down`,`Quantity demanded exceeds quantity supplied, and the shortage pushes the price up`,`Quantity supplied exceeds quantity demanded, and the surplus pushes the price up`,`The supply curve shifts left until the market clears`,`Nothing changes, because sellers are happy with the higher price`],0,
  `<p>Above equilibrium, buyers want less and sellers offer more, so unsold goods pile up: a <b>surplus</b>. Your course: "we need to have downward pressure on the price." Sellers cut prices rather than sell nothing, which raises quantity demanded and lowers quantity supplied until they meet.</p><p>The tempting wrong answer reverses it: a <b>shortage</b> comes from a price <b>below</b> equilibrium. And no curve shifts; the price moves buyers and sellers along their curves.</p>`);
gen('l7-g-gap','l7',()=>{
  const rows=[[1.00,800,500],[1.20,700,550],[1.40,600,600],[1.60,550,640],[1.80,500,680],[2.00,460,700],[2.20,420,720]];
  const r=pick(rows.filter(x=>x[1]!==x[2])); const gap=Math.abs(r[1]-r[2]); const kind=r[1]>r[2]?'shortage':'surplus';
  return { type:'num', kind:'num', prompt:`Your course textbook\'s gasoline market (Table 3.3, millions of gallons):${table(['Price','Quantity demanded','Quantity supplied'],rows.map(x=>[money(x[0]),x[1],x[2]]))}If the price were <b>${money(r[0])}</b> a gallon, how large would the shortage or surplus be, in millions of gallons?`,
    answer:gap, unit:'million gallons',
    explain:`<p>At ${money(r[0])}: quantity demanded ${r[1]}, quantity supplied ${r[2]}. The gap is |${r[1]} − ${r[2]}| = <b>${gap} million gallons</b>, a <b>${kind}</b>, because the price is ${kind==='shortage'?'below':'above'} the equilibrium of $1.40.</p><p>The common slip is reporting one of the quantities instead of the difference between them. A shortage or surplus is always the gap between the two rows at the same price.</p>` };
});
tf('l7-tf-above','l7','When the price is above the equilibrium price, the market has a shortage.',false,
  `<p>False. Above equilibrium, quantity supplied is greater than quantity demanded: a <b>surplus</b>. Shortages happen below equilibrium, where buyers want more than sellers offer.</p>`);
lazy('l7-gr-surplus','l7',()=>({ type:'mc', kind:'graph',
  prompt:`The price is stuck at P1.${sdg({xmax:10,ymax:10,xt:[0,3,5,7,10],yt:[0,5,7,10],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,0],b:[10,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:7,label:'P1'}],dots:[{q:3,p:7,label:'',c:'var(--accent)'},{q:7,p:7,label:'',c:'var(--g1)'}],labels:[[3,1.2,'Qd = 3','var(--accent)'],[7,1.2,'Qs = 7','var(--g1)']]})}Which of the following is true at P1?`,
  options:[`There is a surplus of 4 units, and the price will tend to fall`,`There is a shortage of 4 units, and the price will tend to rise`,`There is a surplus of 7 units, and the price will tend to fall`,`The market is in equilibrium at P1`,`There is a surplus of 4 units, and the supply curve will shift left`], answer:0,
  explain:`<p>At P1, buyers want 3 units (on the demand curve) and sellers offer 7 (on the supply curve). 7 − 3 = <b>4 units of surplus</b>. With goods piling up, sellers cut the price toward equilibrium.</p><p>Tempting wrong answers: calling it a shortage (that's below equilibrium), reporting 7 (the quantity supplied, not the gap), or saying the supply curve shifts. Price changes move sellers along their curve; they don't shift it.</p>` }));
mc('l7-frost','l7','An unusually cold winter in Florida destroys many orange groves. In the market for oranges, what happens to the equilibrium price and quantity?',
  [PQ('increases','decreases'),PQ('increases','increases'),PQ('decreases','decreases'),PQ('decreases','increases'),PQ('increases','does not change')],0,
  `<p>This is your course's example. The frost cuts what growers can sell at every price: <b>supply shifts left</b>. Along the unchanged demand curve, the new equilibrium has a higher price and a smaller quantity (your course: $3 to $4).</p><p>The tempting wrong answer is "price increases, quantity increases." When <b>supply</b> shifts, price and quantity move in <b>opposite</b> directions; only a demand shift moves them the same way.</p>`);
mc('l7-substitute','l7','Coffee and tea are close substitutes. If the price of tea falls, how do the equilibrium price and quantity of <b>coffee</b> change?',
  [PQ('decreases','decreases'),PQ('increases','increases'),PQ('increases','decreases'),PQ('decreases','increases'),PQ('does not change','decreases')],0,
  `<p>Cheaper tea pulls some buyers away from coffee, so <b>demand for coffee shifts left</b>. Moving down the coffee supply curve, both price and quantity fall. (The official CLEP sample questions include a question like this with apples and oranges.)</p><p>The tempting wrong answer is "price decreases, quantity increases," which is what a <b>supply</b> increase does. Here nothing changed for coffee sellers; the change came from buyers.</p>`);
lazy('l7-gr-shift','l7',()=>({ type:'mc', kind:'graph',
  prompt:`Demand shifts from D0 to D1.${sdg({xmax:10,ymax:10,xt:[0,4,5,10],yt:[0,4,5,10],lines:[{a:[0,9],b:[9,0],label:'D0',c:'var(--muted)',dash:'5 4'},{a:[1,10],b:[10,1],label:'D1'},{a:[0,0],b:[10,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],dots:[{q:4.5,p:4.5,label:'E0',c:'var(--muted)'},{q:5.5,p:5.5,label:'E1'}]})}Compared with E0, the new equilibrium E1 has which of the following?`,
  options:[`A higher price and a higher quantity`,`A higher price and a lower quantity`,`A lower price and a higher quantity`,`A lower price and a lower quantity`,`A higher price and the same quantity`], answer:0,
  explain:`<p>D1 is to the right: demand increased. Sliding up the unchanged supply curve, the new equilibrium E1 has both a higher price and a higher quantity.</p><p>The tempting wrong answer, "higher price, lower quantity," is the pattern for a <b>supply decrease</b>. A demand shift moves price and quantity together; a supply shift moves them apart.</p>` }));
mc('l7-double','l7','A cold winter is forecast, so more people want sweaters. At the same time, wool, the main input, becomes cheaper. In the sweater market, which of the following must be true?',
  [`Equilibrium quantity rises, but the change in price can\'t be predicted without knowing which shift is larger`,`Equilibrium price and quantity both rise`,`Equilibrium price rises and quantity can\'t be predicted`,`Equilibrium price falls and quantity rises`,`Neither price nor quantity changes, because the shifts cancel out`],0,
  `<p>Your course's example. More buyers' interest: demand shifts right (pushes price up, quantity up). Cheaper wool: supply shifts right (pushes price down, quantity up). Both push quantity <b>up</b>, so that is certain. They push price in <b>opposite</b> directions, so the price change depends on which shift is bigger.</p><p>The tempting wrong answer is "price and quantity both rise." That's right only if the demand shift is the larger one, which the question doesn't say.</p>`);
tf('l7-tf-lee','l7','A drought shifts the wheat supply curve left and raises the price. The higher price then shifts the supply curve back to the right as farmers grow more.',false,
  `<p>False. This is the mistake your course textbook calls out with its student "Lee." The drought shifts supply left once. The higher price then moves farmers <b>along</b> the new supply curve and buyers <b>along</b> the demand curve. "A higher or lower price never shifts the supply curve."</p>`);
gen('l7-g-neweq','l7',()=>{
  const ps=[2,3,4,5,6]; const s=ps.map(p=>10*p); const sh=pick([10,20]); const d0=ps.map(p=>80-10*p); const d1=d0.map(q=>q+sh*2);
  /* eq0: 80-10p = 10p -> p=4. eq1: 80+2sh-10p = 10p -> p = 4 + sh/10 */
  const ans=4+sh/10;
  return { type:'num', kind:'num', prompt:`Made-up numbers. Demand for concert tickets increases from D0 to D1:${table(['Price',...ps.map(money)],[['Quantity supplied',...s],['Quantity demanded (D0)',...d0],['Quantity demanded (D1)',...d1]])}What is the <b>new</b> equilibrium price, in dollars?`, answer:ans, unit:'dollars',
    explain:`<p>Compare the <b>new</b> demand row with the supply row: at ${money(ans)}, quantity demanded (D1) is ${80+2*sh-10*ans} and quantity supplied is ${10*ans}. They match, so the new equilibrium price is <b>${money(ans)}</b> (up from $4).</p><p>The common slip is matching supply with the old D0 row, which gives the old equilibrium of $4. After a shift, always use the new curve.</p>` };
});
/* L7 more */
mc('l7-shortage-def','l7','A <b>shortage</b> (excess demand) exists when which of the following is true?',
  [`At the current price, quantity demanded is greater than quantity supplied`,`At the current price, quantity supplied is greater than quantity demanded`,`The good is scarce in the economic sense`,`Demand has fallen below supply at every price`,`The equilibrium price is too high for most buyers`],0,
  `<p>Your course textbook: excess demand means "at the existing price, the quantity demanded exceeds the quantity supplied; also called a shortage." It happens when the price is below equilibrium.</p><p>The tempting wrong answer is "the good is scarce." Every good is scarce (Lesson 1), but a shortage is a specific gap at one price, and it closes when the price rises.</p>`);
mc('l7-clearing','l7','Economists call the equilibrium price the "market-clearing" price because at that price which of the following happens?',
  [`Everything sellers bring to market at that price is bought, with no surplus or shortage`,`Sellers clear out old stock at a discount`,`The government clears the market of price controls`,`All buyers leave the market satisfied`,`Supply and demand curves stop shifting`],0,
  `<p>At the market-clearing price, the amount sellers offer is exactly the amount buyers want, so the market is "cleared" of both surpluses and shortages. Your course: "The price clears the market, bringing demand and supply equal to each other."</p><p>The tempting wrong answer is "all buyers leave satisfied." Buyers whose maximum price is below the equilibrium price buy nothing; the market still clears.</p>`);
mc('l7-gas','l7','In your course textbook\'s gasoline market, the equilibrium is $1.40 a gallon and 600 million gallons. At $1.80, quantity demanded is 500 and quantity supplied is 680 (millions of gallons). Which of the following describes the market at $1.80?',
  [`A surplus of 180 million gallons`,`A shortage of 180 million gallons`,`A surplus of 80 million gallons`,`A shortage of 100 million gallons`,`A surplus of 500 million gallons`],0,
  `<p>680 supplied − 500 demanded = <b>180 million gallons</b> of excess supply. The textbook: "gasoline accumulates at gas stations, in tanker trucks, in pipelines," and sellers start cutting prices.</p><p>Tempting wrong answers measure from the equilibrium quantity instead of comparing the two quantities at $1.80 (80 = 680 − 600; 100 = 600 − 500). A surplus is the gap between quantity supplied and quantity demanded at the same price.</p>`);
mc('l7-salmon','l7','In the summer of 2000, excellent weather increased the supply of California salmon. Your course textbook\'s table shows equilibrium moving from $3.25 a pound and 250 (thousand) salmon to $2.50 and 550. Which of the following best describes this change?',
  [`Supply shifted right, so price fell and quantity rose, with the demand curve unchanged`,`Demand shifted right, so price fell and quantity rose`,`Supply shifted left, so price fell`,`Both curves shifted, so the change can\'t be explained`,`The lower price caused demand to shift right`],0,
  `<p>Good weather is a natural condition that raises supply. Moving down the unchanged demand curve, price fell from $3.25 to $2.50 and quantity rose from 250 to 550. The textbook adds: "the equilibrium quantity demanded increased, even though the demand curve did not move."</p><p>The tempting wrong answer, "the lower price caused demand to shift right," is the shift-versus-movement mistake: the lower price moved buyers along their curve.</p>`);
mc('l7-coffee','l7','The FDA announces that coffee helps people stay healthy, and at the same time a drought in Ecuador destroys part of the coffee crop. Which of the following must be true in the coffee market?',
  [`The equilibrium price rises, but the change in quantity can\'t be predicted`,`The equilibrium quantity rises, but the change in price can\'t be predicted`,`Both price and quantity rise`,`Price rises and quantity falls`,`Both price and quantity fall`],0,
  `<p>Your course's example. The health news shifts demand right (price up, quantity up). The drought shifts supply left (price up, quantity down). Both push the price <b>up</b>, so that is certain; they push quantity in opposite directions, so quantity depends on which shift is larger.</p><p>The tempting wrong answer, "price rises and quantity falls," assumes the supply shift is bigger. Without sizes, the quantity change is ambiguous.</p>`);
mc('l7-snowboard','l7','Ski gear becomes cheaper than snowboard gear, and several major snowboard makers switch to making bicycles. In the snowboard market, which of the following must be true?',
  [`Equilibrium quantity falls, but the change in price can\'t be predicted`,`Equilibrium price falls, but the change in quantity can\'t be predicted`,`Both price and quantity fall`,`Price rises and quantity falls`,`Nothing can be said about price or quantity`],0,
  `<p>Your course's example. Cheaper skiing (a substitute) shifts snowboard demand left; fewer sellers shift supply left. Both cut <b>quantity</b>, so it falls for certain. Demand falling pushes price down while supply falling pushes it up, so the price change is ambiguous.</p><p>The tempting wrong answer, "both price and quantity fall," is true only if the demand shift is the bigger one.</p>`);
mc('l7-ecar','l7','Gas prices fall, so fewer people want electric cars. Meanwhile, new production methods make electric cars cheaper to build. In the electric-car market, which of the following must be true?',
  [`Equilibrium price falls, but the change in quantity can\'t be predicted`,`Equilibrium quantity falls, but the change in price can\'t be predicted`,`Both price and quantity fall`,`Price falls and quantity rises`,`Price rises and quantity can\'t be predicted`],0,
  `<p>Your course's example. Lower demand pushes price down and quantity down; higher supply (better technology) pushes price down and quantity up. The price falls for certain; the quantity depends on which shift is larger.</p><p>The tempting wrong answers each pick a winner for quantity. Opposite-direction shifts settle the price, never the quantity.</p>`);
tf('l7-tf-both','l7','If demand and supply both increase, the equilibrium price must rise.',false,
  `<p>False. Both increases raise the equilibrium <b>quantity</b>, but they pull the price in opposite directions: more demand pushes it up, more supply pushes it down. Your course: there is "an ambiguous change in the price, that's going to depend on which of the shifts is larger."</p>`);
lazy('l7-gr-double','l7',()=>({ type:'mc', kind:'graph',
  prompt:`Both curves shifted: demand from D0 to D1 and supply from S0 to S1.${sdg({xmax:10,ymax:10,xt:[0,5,10],yt:[0,5,10],lines:[{a:[0,9],b:[9,0],label:'D0',c:'var(--muted)',dash:'5 4'},{a:[2,9],b:[10,1],label:'D1'},{a:[0,1],b:[8,9],label:'S0',c:'var(--muted)',dash:'5 4',lx:-6,ly:12,anchor:'end'},{a:[2,1],b:[10,9],label:'S1',c:'var(--g1)',lx:-6,ly:12,anchor:'end'}],dots:[{q:4,p:5,label:'A',c:'var(--muted)'},{q:6,p:5,label:'B'}]})}The market moves from A to B. Which of the following is true?`,
  options:[`Both curves shifted right by similar amounts, so quantity rose and price stayed about the same`,`Demand shifted right and supply shifted left, so price rose`,`Both curves shifted left, so quantity fell`,`Only demand shifted, so price and quantity both rose`,`Price fell because supply shifted farther than demand`], answer:0,
  explain:`<p>D1 and S1 are both to the right of the originals, by about the same distance. Both shifts raise quantity (from 4 to 6). Their pulls on price cancel here, so the price is about the same at 5.</p><p>This is your course's rule in picture form: when both curves increase, quantity definitely rises and the price depends on which shift is larger. Here they are equal, so the price barely moves.</p>` }));
tf('l7-tf-scarcity','l7','A shortage and scarcity mean the same thing in economics.',false,
  `<p>False. Scarcity (Lesson 1) is the permanent condition that wants exceed resources, and it applies to almost everything. A shortage is a gap at one price, quantity demanded greater than quantity supplied, and it disappears when the price rises to equilibrium.</p>`);
mc('l7-income','l7','Incomes rise across the country, and restaurant meals are a normal good. What happens to the equilibrium price and quantity of restaurant meals?',
  [PQ('increases','increases'),PQ('increases','decreases'),PQ('decreases','increases'),PQ('decreases','decreases'),PQ('does not change','increases')],0,
  `<p>Higher income raises demand for a normal good: <b>demand shifts right</b>. Sliding up the supply curve, both price and quantity rise.</p><p>The tempting wrong answer is "price increases, quantity decreases," the supply-decrease pattern. Ask first which curve moved: here, the buyers' curve.</p>`);
mc('l7-tech','l7','A new machine cuts the cost of making bicycles. What happens to the equilibrium price and quantity of bicycles?',
  [PQ('decreases','increases'),PQ('increases','increases'),PQ('decreases','decreases'),PQ('increases','decreases'),PQ('decreases','does not change')],0,
  `<p>Cheaper production is better technology: <b>supply shifts right</b>. Sliding down the demand curve, price falls and quantity rises. (Your course's robots in car factories work the same way.)</p><p>The tempting wrong answer is "price increases, quantity increases," which is what a demand increase would do. Lower costs push the price down, not up.</p>`);
gen('l7-g-both','l7',()=>{
  const k=pick([10,20,30]), m=pick([10,20,30].filter(x=>x!==k));
  /* oranges: Qd = 60-10P-k, Qs = 10P-m  ->  P = (60-k+m)/20, Q = 10P-m */
  const P=(60-k+m)/20, Qn=10*P-m; const ps=[1.5,2,2.5,3,3.5,4,4.5];
  return { type:'num', kind:'num', prompt:`Your course\'s orange market starts at $3 and 30 units. Made-up shifts: demand falls by ${k} and supply falls by ${m} at every price. The new schedules:${table(['Price',...ps.map(money)],[['New quantity demanded',...ps.map(p=>Math.max(0,60-10*p-k))],['New quantity supplied',...ps.map(p=>Math.max(0,10*p-m))]])}What is the new equilibrium price, in dollars?`, answer:P, unit:'dollars',
    explain:`<p>The rows match at ${money(P)}: ${Qn} demanded and ${Qn} supplied. The new equilibrium is ${money(P)} and ${Qn} units, down from 30.</p><p>Quantity had to fall (both curves moved left). The price ${P>3?'rose, because the supply shift was larger':P<3?'fell, because the demand shift was larger':'stayed the same, because the shifts were equal'}: your course's rule that a double shift leaves one variable "ambiguous" until you know which shift is bigger.</p>` };
});
mc('l7-adjust','l7','The price of a popular toy is below equilibrium, and stores keep running out. According to your course textbook, what moves the price toward equilibrium?',
  [`Sellers see they can sell what they have at a higher price, and buyers compete for the toys`,`The government orders a price increase`,`The supply curve shifts left until the shortage ends`,`Buyers lose interest, so demand shifts left`,`Nothing; shortages last until new firms enter`],0,
  `<p>In a shortage, eager buyers find empty shelves, and sellers "recognize that they have an opportunity to make higher profits by selling ... at a higher price" (your course textbook's gasoline example). The rising price trims quantity demanded and raises quantity supplied until they meet.</p><p>The tempting wrong answers move a curve. The adjustment happens <b>along</b> the curves; nothing about buyers' or sellers' underlying plans has changed.</p>`);
mc('l7-equal','l7','Demand for a good increases and its supply decreases, and both curves shift <b>up</b> by the same vertical distance (the same number of dollars). Which of the following is most likely?',
  [`The price rises and the quantity stays about the same`,`The price and quantity both rise`,`The price stays the same and the quantity falls`,`The price falls and the quantity stays the same`,`Both price and quantity fall`],0,
  `<p>Demand up and supply down both push the <b>price up</b>: that part is certain. Their effects on quantity are opposite (demand up raises it, supply down lowers it). When both curves shift up by the same number of dollars, the new crossing point sits directly above the old one: the price rises by that amount and the quantity stays the same.</p><p>This is your course's rule applied with sizes given: when the shifts oppose each other on quantity, the larger shift decides, and equal shifts cancel.</p>`);
lazy('l7-gr-supply','l7',()=>({ type:'mc', kind:'graph',
  prompt:`Supply shifts from S0 to S1.${sdg({xmax:10,ymax:10,xt:[0,5,10],yt:[0,5,10],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,1],b:[8,9],label:'S0',c:'var(--muted)',dash:'5 4',lx:-6,ly:12,anchor:'end'},{a:[2,1],b:[10,9],label:'S1',c:'var(--g1)',lx:-6,ly:12,anchor:'end'}],dots:[{q:4.5,p:5.5,label:'E0',c:'var(--muted)'},{q:5.5,p:4.5,label:'E1'}]})}Which of the following could have caused this shift, and what happens to the equilibrium?`,
  options:[`More firms entered the market; price falls and quantity rises`,`Buyers\' incomes rose; price and quantity both rise`,`An input became more expensive; price rises and quantity falls`,`The price of the good fell; quantity supplied fell`,`More firms entered the market; price and quantity both rise`], answer:0,
  explain:`<p>S1 is to the right: more is offered at every price. More sellers does that. Sliding down the demand curve, the new equilibrium E1 has a lower price and a higher quantity.</p><p>Income changes move demand, not supply. A pricier input shifts supply <b>left</b>. The last choice gets the cause right but the price wrong: more supply lowers the price.</p>` }));

/* ===== Lesson 7 quick checks ===== */
mc('l7c-eq','l7','Your course\'s two schedules from video 2.1a: at $5, buyers want 13 and sellers offer 10; at $6, 12 and 12; at $7, 10 and 13. What are the equilibrium price and quantity?',
  [`$6 and 12 units`,`$5 and 13 units`,`$7 and 13 units`,`$6 and 24 units`,`$5 and 10 units`],0,
  `<p>Equilibrium is the price where the two quantities match: at $6, 12 demanded and 12 supplied. The equilibrium quantity is 12, the amount actually bought and sold.</p><p>The tempting wrong answer adds the two quantities (24). The 12 units are the same units, bought by buyers and sold by sellers, so they aren't added.</p>`);
mc('l7c-surplus','l7','Your course\'s orange market: at $4, buyers want 20 oranges and sellers offer 40. Which of the following describes the market at $4?',
  [`A surplus of 20, so the price will tend to fall toward $3`,`A shortage of 20, so the price will tend to rise`,`A surplus of 40, so the price will fall`,`Equilibrium, because sellers are earning more`,`A surplus of 20, so demand will shift right`],0,
  `<p>40 supplied − 20 demanded = a <b>surplus of 20</b>. Unsold oranges push sellers to cut prices; as the price falls, buyers want more and sellers offer less, until both reach 30 at $3.</p><p>The tempting wrong answer, "demand will shift right," confuses a movement along the curve with a shift. A lower price moves buyers down their existing curve.</p>`);
mc('l7c-shift','l7','Starting from equilibrium in the orange market, the price of apples (a substitute) falls. Using your course textbook\'s four steps, which of the following is the correct analysis?',
  [`Demand for oranges shifts left; the new equilibrium has a lower price and lower quantity`,`Supply of oranges shifts left; price rises and quantity falls`,`Demand for oranges shifts right; price and quantity rise`,`The quantity of oranges demanded falls along the curve; supply is unchanged and price stays at $3`,`Supply of oranges shifts right; price falls and quantity rises`],0,
  `<p>Step 2: the event affects buyers (a related good's price), so demand. Step 3: cheaper apples pull buyers away, so demand for oranges <b>decreases</b>. Step 4: the new equilibrium has a lower price and a lower quantity (your course: $3 down to $2).</p><p>The tempting wrong answer calls it a supply change. Apples are bought by the same shoppers; nothing changed for orange growers.</p>`);
mc('l7c-four','l7','A popular study says almond milk is bad for the environment, and many shoppers stop buying it. In the almond-milk market, what happens to equilibrium price and quantity?',
  [PQ('decreases','decreases'),PQ('increases','decreases'),PQ('decreases','increases'),PQ('increases','increases'),PQ('does not change','decreases')],0,
  `<p>Tastes turn against almond milk, so <b>demand shifts left</b>. Sliding down the supply curve, price and quantity both fall. A demand shift moves price and quantity in the same direction.</p><p>The tempting wrong answer is "price increases, quantity decreases," the pattern for a supply decrease.</p>`);
mc('l7c-lee','l7','A drought shifts the supply of wheat to the left, and the price of wheat rises. What does the higher price do?',
  [`It moves buyers up along the demand curve to a smaller quantity demanded; neither curve shifts again`,`It shifts the demand curve left`,`It shifts the supply curve back to the right`,`It shifts both curves, so the final result can\'t be predicted`,`It has no effect on buyers`],0,
  `<p>Your course textbook: "a shift in one curve never causes a shift in the other curve. Rather, a shift in one curve causes a movement along the second curve." The drought is the only shift; the higher price is the result, and buyers respond along their demand curve.</p><p>The tempting wrong answers treat the price change as a new shifter. A price change is never a shifter for its own market.</p>`);
mc('l7c-double','l7','Demand for a good decreases while its supply increases. Which of the following can be predicted with certainty?',
  [`The equilibrium price falls`,`The equilibrium quantity falls`,`The equilibrium quantity rises`,`The equilibrium price rises`,`Both price and quantity fall`],0,
  `<p>Lower demand pushes the price down; higher supply also pushes the price down. Both agree, so the price <b>falls</b> for certain. On quantity they disagree (demand down lowers it, supply up raises it), so quantity depends on the sizes.</p><p>Your course's electric-car example works exactly this way.</p>`);
mc('l7c-skill','l7','The cost of cocoa beans rises, and at the same time a health study boosts the popularity of dark chocolate. In the dark-chocolate market, which of the following is certain?',
  [`The equilibrium price rises`,`The equilibrium quantity rises`,`The equilibrium quantity falls`,`The equilibrium price falls`,`Both price and quantity rise`],0,
  `<p>Pricier cocoa (an input): supply shifts left, pushing price up. The health study (tastes): demand shifts right, also pushing price up. So the price <b>rises</b> for certain. Quantity is pulled down by the supply shift and up by the demand shift, so it can't be predicted.</p>`);

/* Course materials checked 2026-10-22: video 2.1b transcript, Module 2 slides 23-37, course textbook §3.1 and §3.3; CLEP sample question 2 (fact sheet) for format. */
const L7TAGS = {
  'l7-def':['OS31 MS2','eq','terms','M5'], 'l7-g-schedule':['OS31','eq','data','M1'], 'l7-surplus':['MS2 OS31','eq','models','M1 M2'],
  'l7-g-gap':['OS31','eq','data','M1'], 'l7-tf-above':['MS2 OS31','eq','terms','M1'], 'l7-gr-surplus':['MS2','eq','graphs','M1 M2'],
  'l7-frost':['MS2','eq','models','M3'], 'l7-substitute':['MS2 CBS','eq','models','M3'], 'l7-gr-shift':['OS33','eq','graphs','M3'],
  'l7-double':['MS2','eq','models','M4'], 'l7-tf-lee':['OS33','eq','terms','M2'], 'l7-g-neweq':['OS33','eq','data','M2'],
  'l7-shortage-def':['OS31','eq','terms','M6'], 'l7-clearing':['MS2 ELSD','eq','terms','M5'], 'l7-gas':['OS31','eq','data','M1'],
  'l7-salmon':['OS33','eq','data','M2'], 'l7-coffee':['MS2','eq','models','M4 M3'], 'l7-snowboard':['MS2','eq','models','M4'],
  'l7-ecar':['MS2','eq','models','M4'], 'l7-tf-both':['MS2 OS33','eq','terms','M4'], 'l7-gr-double':['MS2','eq','graphs','M4'],
  'l7-tf-scarcity':['OS31','eq','terms','M6'], 'l7-income':['OS32 OS33','eq','models','M3'], 'l7-tech':['MS2 OS33','eq','models','M3'],
  'l7-g-both':['MS2','eq','data','M4'], 'l7-adjust':['OS31','eq','models','M2'], 'l7-equal':['MS2','eq','models','M4 M3'],
  'l7-gr-supply':['OS33','eq','graphs','M3'],
  'l7c-eq':['MS2','eq','data',''], 'l7c-surplus':['MS2','eq','data','M1 M2'], 'l7c-shift':['MS2 OS33','eq','models','M3'],
  'l7c-four':['OS33','eq','models','M3'], 'l7c-lee':['OS33','eq','terms','M2'], 'l7c-double':['MS2','eq','models','M4'], 'l7c-skill':['MS2','eq','models','M4']
};
u2tag(L7TAGS);

U2_CARDS.l7 = [
  ['Equilibrium','What is market equilibrium?','The price and quantity where quantity demanded equals quantity supplied. At that point buyers\' and sellers\' plans agree, so there is no pressure for the price to change.','Your course\'s orange market: at $3, buyers want 30 and sellers offer 30.','Equilibrium doesn\'t mean everyone gets the good: buyers whose maximum price is below it buy nothing.'],
  ['Market-clearing price','Why is the equilibrium price called the market-clearing price?','Because at that price everything sellers bring to market is bought: there is no surplus or shortage left over.','At $6 in your course\'s 2.1a schedules, 12 are demanded and 12 supplied.','Market-clearing doesn\'t mean every buyer who wants the good gets it; buyers who value it below the price don\'t buy.'],
  ['Surplus (excess supply)','What is a surplus, when does it happen, and what happens next?','Quantity supplied exceeds quantity demanded at the current price. It happens when the price is above equilibrium. Sellers with unsold goods cut prices, which raises quantity demanded and lowers quantity supplied until they meet.','Oranges at $4: 40 offered, 20 wanted, a surplus of 20.','Above equilibrium = surplus, not shortage.'],
  ['Shortage (excess demand)','What is a shortage, when does it happen, and what happens next?','Quantity demanded exceeds quantity supplied at the current price. It happens when the price is below equilibrium. Buyers compete and sellers see they can charge more, so the price rises until the gap closes.','Gasoline at $1.20: 700 wanted, 550 offered, a shortage of 150 (millions of gallons).','A shortage is not scarcity. Scarcity is permanent; a shortage disappears when the price adjusts.'],
  ['Demand increase','What does an increase in demand do to equilibrium price and quantity?','Both rise. Demand shifts right, and the market slides up the unchanged supply curve.','Incomes rise and restaurant meals are a normal good: more meals at a higher price.','A demand shift moves price and quantity in the same direction.'],
  ['Demand decrease','What does a decrease in demand do to equilibrium price and quantity?','Both fall. Demand shifts left, and the market slides down the supply curve.','Apples get cheaper: orange demand falls, and oranges sell for less ($3 to $2 in your course).','Supply doesn\'t change here; sellers move down along the same supply curve.'],
  ['Supply increase','What does an increase in supply do to equilibrium price and quantity?','Price falls and quantity rises. Supply shifts right, and the market slides down the demand curve.','Good weather in 2000: salmon fell from $3.25 to $2.50 a pound while the catch rose from 250 to 550 thousand (your course textbook).','A supply shift moves price and quantity in opposite directions.'],
  ['Supply decrease','What does a decrease in supply do to equilibrium price and quantity?','Price rises and quantity falls. Supply shifts left, and the market slides up the demand curve.','A frost in Florida: oranges rise from $3 to $4 and fewer are sold (your course).','The higher price doesn\'t shift demand; buyers move up along the same demand curve.'],
  ['Four-step process','What are your course textbook\'s four steps for analyzing a change in a market?','1. Draw the market before the event. 2. Decide whether the event affects demand or supply. 3. Decide whether it shifts that curve right or left. 4. Compare the new equilibrium price and quantity with the old.','Good weather → supply → right → lower price, higher quantity.','Don\'t skip step 2: decide whether the event shifts demand or supply before drawing anything.'],
  ['Shifts cause movements, not more shifts','When one curve shifts, what happens to the other curve?','Nothing: the other curve stays put, and the market moves along it to the new equilibrium. A price change never shifts a curve in its own market.','A drought shifts wheat supply left; buyers move up along the same demand curve as the price rises.','Don\'t "chain" shifts: the higher price doesn\'t push supply back to the right.'],
  ['Both curves shift the same way','If demand and supply both increase (or both decrease), what can you predict?','Quantity, for certain: both increase it (or both decrease it). The price change is ambiguous; it depends on which shift is larger.','A cold winter (more demand for sweaters) and cheaper wool (more supply): more sweaters sold, price uncertain.','The price is indeterminate unless you know which shift is bigger.'],
  ['Curves shift in opposite directions','If demand increases while supply decreases (or the reverse), what can you predict?','Price, for certain: demand up and supply down both raise it (demand down and supply up both lower it). The quantity change is ambiguous.','Coffee: a health report raises demand while a drought cuts supply. The price rises; quantity depends on the sizes.','Same direction → quantity is certain. Opposite directions → price is certain.']
];

Object.assign(U2_WRITE, {
  'w-l7-1':{lesson:'l7',prompt:'Explain why a price above the equilibrium price does not last. Walk through what buyers and sellers do.',
    model:'At a price above equilibrium, buyers want less and sellers offer more, so quantity supplied is greater than quantity demanded: a surplus. Sellers are stuck with unsold goods and would rather sell at a lower price than not sell at all, so some cut prices and others follow. As the price falls, buyers move down their demand curve and buy more, and sellers move down their supply curve and offer less. This continues until quantity demanded equals quantity supplied at the equilibrium price. Neither curve shifts; the adjustment happens along them.',
    checklist:['Identifies that quantity supplied exceeds quantity demanded (a surplus) above equilibrium','Explains why sellers cut the price (unsold goods, better to sell at a lower price)','Describes buyers and sellers adjusting along their curves as the price falls','Concludes the price settles where quantity demanded equals quantity supplied']},
  'w-l7-2':{lesson:'l7',prompt:'The FDA says coffee helps people stay healthy, and at the same time a drought hits coffee farms in Ecuador. What can you say for sure about the equilibrium price and quantity of coffee, and what can\'t you say? Explain why.',
    model:'The FDA news raises demand for coffee, which on its own would raise both price and quantity. The drought lowers supply, which on its own would raise the price and lower the quantity. Both shifts push the price up, so the equilibrium price rises for sure. They push quantity in opposite directions, so quantity could rise, fall or stay the same depending on which shift is larger: if the demand shift is bigger, quantity rises; if the supply shift is bigger, it falls.',
    checklist:['Says the news shifts demand right and the drought shifts supply left','States that the price definitely rises because both shifts push it up','States that the quantity change is ambiguous because the shifts push it in opposite directions','Explains that the larger shift decides the quantity change']}
});

U2_PLAN.l7 = {
  core:['l7-def','l7-g-schedule','l7-surplus','l7-g-gap','l7-tf-above','l7-gr-surplus','l7-frost','l7-substitute','l7-gr-shift','l7-double','l7-tf-lee','l7-g-neweq'],
  more:['l7-shortage-def','l7-clearing','l7-gas','l7-salmon','l7-coffee','l7-snowboard','l7-ecar','l7-tf-both','l7-gr-double','l7-tf-scarcity','l7-income','l7-tech','l7-g-both','l7-adjust','l7-equal','l7-gr-supply']
};

U2_LESSONS.push({ id:'l7', unit:2, title:'Market Equilibrium', mins:45, src:'Modern States video 2.1b and Module 2 slides 23-37 · Course textbook (OpenStax) §3.1, §3.3',
  sources:['MS2','OS31','OS33','CB','CBS','ELSD'],
  oneline:'The market settles where the amount buyers want equals the amount sellers offer. When something shifts demand or supply, the price and quantity move to a new balance you can predict.',
  body:`
<h2>Where demand meets supply</h2>
<!-- src: MS2 (video 2.1b: equilibrium, P*, Q*, market-clearing; slide 24); OS31 (equilibrium definition, "only price where the plans ... agree", finding it from tables). Combining the two 2.1a schedules is our worked example; the course numbers are unchanged. -->
<p>Lesson 6 built the ${dt('demand-curve','demand curve')} (buyers) and the ${dt('supply','supply curve')} (sellers) separately. Put them on the same graph and the point where they cross is the ${dt('equilibrium','<b>market equilibrium</b>')}. Its price is the <b>equilibrium price</b> (P*) and its quantity is the <b>equilibrium quantity</b> (Q*).</p>
<p>Your course textbook: "The equilibrium price is the only price where the plans of consumers and the plans of producers agree." At that price, ${dt('quantity-demanded','quantity demanded')} equals ${dt('quantity-supplied','quantity supplied')}.</p>
<p><b>Worked example: your course's two schedules from video 2.1a, side by side.</b></p>
${table(['Price','$5','$6','$7'],[['Quantity demanded','13','12','10'],['Quantity supplied','10','12','13']],[[0,2],[1,2]])}
<div class="math">At $6: quantity demanded 12 = quantity supplied 12<br>Equilibrium: <b>P* = $6, Q* = 12</b></div>
<p>Check: at every other price the two rows differ, so $6 is the only price where the market clears. Q* is 12, not 24: the same 12 units are bought by buyers and sold by sellers.</p>
${FIG.l7eq()}
<p>Your course also calls P* the ${dt('market-clearing-price','<b>market-clearing price</b>')}: at that price, everything sellers bring is bought, with nothing left over and no one turned away who is willing to pay it.</p>
<div data-check="l7c-eq"></div>

<h2>Surpluses, shortages and how prices adjust</h2>
<!-- src: MS2 (video 2.1b: price above P* → surplus → downward pressure, below → shortage → upward pressure; slides 25-26; orange schedule slide 27); OS31 (gasoline $1.80: 500 vs 680; $1.20: 700 vs 550; sellers cut prices; stations run short) -->
<p>Why does the market end up at equilibrium? Because any other price creates pressure that pushes it back.</p>
<div class="terms">
${term(dt('excess-supply','Surplus'),'Price <b>above</b> equilibrium: quantity supplied is greater than quantity demanded. Goods pile up unsold.')}
${term(dt('shortage','Shortage'),'Price <b>below</b> equilibrium: quantity demanded is greater than quantity supplied. Shelves run empty.')}
</div>
${FIG.l7gaps()}
<p><b>The mechanism.</b> In a surplus, sellers would rather sell at a lower price than not sell at all, so they cut prices. Your course: the falling price signals buyers to "buy more" and sellers to "supply less," until the two quantities meet. In a shortage the reverse happens: buyers compete for scarce goods and sellers see they can charge more, so the price rises, buyers want less and sellers offer more.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of a farmers' market near closing time. A stand with crates of unsold peaches marks them down; a stand that sold out by noon will charge more next week. Nobody plans it, but every stand drifts toward the price where its peaches just sell out.</p></div>
<p><b>Worked example: your course textbook's gasoline market</b> (millions of gallons; equilibrium $1.40 and 600):</p>
<div class="math">At $1.80: supplied 680 − demanded 500 = <b>surplus of 180</b> → price falls<br>At $1.20: demanded 700 − supplied 550 = <b>shortage of 150</b> → price rises</div>
<p>Check: the gap is always measured between the two quantities <b>at the same price</b>, and its sign tells you which way the price moves.</p>
<p>Your course's orange market has the same shape. Slide the price and watch the pressure:</p>
<div data-widget="eqlab"></div>
<div data-check="l7c-surplus"></div>

<h2>When one curve shifts</h2>
<!-- src: OS33 (four-step process; salmon 2000: $3.25/250 → $2.50/550); MS2 (video 2.1b orange example: frost, apples; slides 28-30). Source problem: the course says the new equilibria are $4/25 and $2/25, which don't fit its own schedule; we use shifts of 20 units, which match the course's combined result of $3 and 10 (slide 31). -->
<p>Your course textbook gives a <b>four-step process</b> for any event:</p>
<ol><li>Draw the market <b>before</b> the event and find the equilibrium.</li><li>Decide whether the event affects ${dt('demand','<b>demand</b>')} or <b>supply</b> (Lesson 6's shifters).</li><li>Decide whether that curve shifts <b>right</b> or <b>left</b>, and draw it.</li><li><b>Compare</b> the new equilibrium price and quantity with the old ones.</li></ol>
<p><b>Worked example: your course's orange market.</b> Start at $3 and 30 oranges.</p>
<ul><li><b>A frost ruins Florida groves.</b> Step 2: it hits growers, so supply. Step 3: less to sell at every price, so supply shifts <b>left</b>. Step 4: the price rises to $4 and quantity falls.</li>
<li><b>Apples (a ${dt('substitutes','substitute')}) get cheaper.</b> Step 2: it changes what buyers want, so demand. Step 3: buyers switch to apples, so demand shifts <b>left</b>. Step 4: the price falls to $2 and quantity falls.</li></ul>
<p class="small muted">Your course video says quantity falls to 25 in both cases, but that doesn't fit its own schedule (at $4, buyers want only 20). With made-up shifts of 20 oranges at every price, the new quantity is 20 in each case, and the combined case below lands exactly where your course's slide puts it ($3 and 10). The directions, which are what the exam tests, are the same either way.</p>
<p><b>The pattern to remember.</b> A demand shift moves price and quantity in the <b>same</b> direction. A supply shift moves them in <b>opposite</b> directions. Why: a demand shift slides the market along the upward-sloping supply curve, while a supply shift slides it along the downward-sloping demand curve.</p>
${table(['Event','Price','Quantity'],[['Demand increases','Rises','Rises'],['Demand decreases','Falls','Falls'],['Supply increases','Falls','Rises'],['Supply decreases','Rises','Falls']])}
${FIG.l7four()}
<p>Real example from your course textbook: excellent weather for California salmon in 2000 shifted supply right; the price fell from $3.25 to $2.50 a pound and the catch rose from 250 to 550 thousand fish, with no change in demand.</p>
<div data-check="l7c-shift,l7c-four"></div>

<h2>A shift moves the market along the other curve</h2>
<!-- src: OS33 (Clear It Up: Lee's drought reasoning; "A shift in one curve never causes a shift in the other curve") -->
<p>Your course textbook tells the story of Lee, a student who reasons: a drought shifts wheat supply left and raises the price; then the higher price makes farmers grow more, so supply shifts back right; then the higher price makes buyers want less, so demand shifts left... At that point Lee suspects something is wrong.</p>
<p>Lee's first step is right. Everything after it mixes up shifts with movements. The higher price is the <b>result</b> of the shift, and buyers and sellers respond to it by moving <b>along</b> their curves. The textbook: "a shift in one curve never causes a shift in the other curve. Rather, a shift in one curve causes a movement along the second curve."</p>
${FIG.l7frost()}
<p>Keep the timeline straight: <b>event → one curve shifts → price changes → movement along the other curve → new equilibrium</b>. Stop there.</p>
<div data-check="l7c-lee"></div>

<h2>When both curves shift</h2>
<!-- src: MS2 (video 2.1b four cases: sweaters, coffee/FDA/Ecuador, snowboards, electric cars; orange combined; slides 31-35); OS33 (postal service combined example; "typically we can determine the overall effect on price or on quantity, but not on both") -->
<p>Often two things happen at once. Analyze each shift separately (four steps each, holding everything else equal: ${dt('ceteris-paribus','ceteris paribus')}), then combine them. One variable is pushed the same way by both shifts and is certain; the other is pushed in opposite directions and depends on which shift is bigger.</p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Shifts</th><th>Your course's example</th><th>Certain</th><th>Ambiguous</th></tr></thead><tbody>
<tr><td>Demand up, supply up</td><td>Sweaters: a cold winter is coming, and wool gets cheaper</td><td>Quantity rises</td><td>Price</td></tr>
<tr><td>Demand up, supply down</td><td>Coffee: the FDA says it's healthy, and a drought hits Ecuador</td><td>Price rises</td><td>Quantity</td></tr>
<tr><td>Demand down, supply down</td><td>Snowboards: ski gear gets cheaper, and big makers switch to bicycles</td><td>Quantity falls</td><td>Price</td></tr>
<tr><td>Demand down, supply up</td><td>Electric cars: gas gets cheaper, and new methods cut production costs</td><td>Price falls</td><td>Quantity</td></tr>
</tbody></table></div>
<p><b>The shortcut:</b> curves shift the <b>same way</b> → quantity is certain. Curves shift <b>opposite ways</b> → price is certain. Your course textbook: "we can determine the overall effect on price or on quantity, but not on both."</p>
<p><b>Worked example: your course's oranges, both events at once</b> (made-up shift sizes of 20 each):</p>
<div class="math">Frost alone: $3 → $4 (price up) · Cheaper apples alone: $3 → $2 (price down)<br>Both: the price pulls cancel → <b>$3</b>; quantity falls from 30 to <b>10</b></div>
${FIG.l7both()}
<p>Check: quantity fell, as the rule promised for two leftward shifts. The price ended where it started only because these two shifts happen to be the same size; with a bigger frost it would have risen. Try "Both" in the orange market above.</p>
<div data-check="l7c-double"></div>

<h2>Predict the new equilibrium</h2>
<!-- src: MS2; OS33. Exam skill: from an event (or two) to the direction of price and quantity. -->
<p>The CLEP loves this move: a short story, then "what happens to the equilibrium price and quantity?" Run Lesson 6's sort (which curve, which way), then use the pattern table. For two events, find the variable both shifts agree on.</p>
<div data-widget="predict"></div>
<div data-check="l7c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L7TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"A price above equilibrium causes a shortage."</span>Above equilibrium, sellers offer more than buyers want: a surplus. Shortages come from prices below equilibrium.</li>
<li><span class="wrong">"After supply falls and the price rises, the higher price shifts supply back to the right."</span>A price change never shifts a curve in its own market. The higher price moves buyers and sellers along their curves; the original shift is the only shift.</li>
<li><span class="wrong">"When a curve shifts, price and quantity always move the same way."</span>Only for demand shifts. A supply shift moves price and quantity in opposite directions.</li>
<li><span class="wrong">"When both curves shift, you can predict both price and quantity."</span>One of them is always ambiguous unless you know which shift is larger. Same-direction shifts settle quantity; opposite-direction shifts settle price.</li>
<li><span class="wrong">"At equilibrium, everyone who wants the good gets it."</span>Only buyers willing to pay the equilibrium price buy. The market clears, but people whose maximum price is lower go without.</li>
<li><span class="wrong">"A shortage is the same thing as scarcity."</span>${dt('scarcity','Scarcity')} is permanent: wants exceed resources. A shortage is a gap at one price, and it closes when the price rises to equilibrium.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Equilibrium</b> is where quantity demanded equals quantity supplied; the equilibrium price is the <b>market-clearing</b> price.</li>
<li>Above equilibrium there is a <b>surplus</b> and the price falls; below it there is a <b>shortage</b> and the price rises. The adjustment happens along the curves.</li>
<li>Use the <b>four steps</b>: before, which curve, which way, compare. Demand shifts move price and quantity together; supply shifts move them apart.</li>
<li>A shift in one curve causes a <b>movement along</b> the other, never a second shift.</li>
<li>When <b>both curves</b> shift, the variable both shifts agree on is certain and the other is <b>ambiguous</b>.</li>
<li>To predict an outcome: sort the event (which curve, which way), then read the pattern; for two events, look for the variable they agree on.</li>
</ol>
<p><b>How the CLEP tests this:</b> "Market equilibrium" is the first item under Supply and Demand (15% to 20% of the exam). Expect paired-answer questions ("the equilibrium price and quantity would change in which of the following ways?"), schedules where you find the equilibrium or the size of a shortage, and graphs showing a shift.</p>
</div>`,
  deeper:`
<h3>Two blades of a pair of scissors</h3>
<p>Does demand or supply set the price? Your course textbook quotes Alfred Marshall (1890): asking that is like arguing "whether it is the upper or the under blade of a pair of scissors that cuts a piece of paper." Both always do the cutting.</p>
<h3>Real markets don't jump straight to equilibrium</h3>
<p>The four steps make the move from old to new equilibrium look instant. Your course textbook notes that in practice "prices and quantities often do not zoom straight to equilibrium." They head toward it, and often another shift arrives before they get there.</p>
<h3>Why organic food stays pricier</h3>
<p>Your course textbook's chapter-opening puzzle: demand for organic food has grown (tastes, plus higher incomes), and supply has grown too as more farmers converted. Both shifts raise quantity, which is why organic food is now in most grocery stores. The price falls only if supply grows faster than demand, and organic methods also cost more, so the price gap may never close.</p>`,
  links:[ {k:'Textbook',t:'3.3 Changes in Equilibrium Price and Quantity: The Four-Step Process',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process',w:'The newer edition of your course textbook\'s §3.3: salmon, newspapers and the postal-service double shift.'},
          {k:'Practice',t:'CLEP Principles of Microeconomics sample questions (PDF)',s:'College Board',u:'https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf',w:'The official fact sheet. Its second sample question is a substitute-goods equilibrium question like the ones in this lesson.'} ]
});
