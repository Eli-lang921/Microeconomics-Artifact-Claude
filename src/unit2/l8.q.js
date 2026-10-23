/* ===== Lesson 8: Price and Quantity Controls (Modern States video 2.1c) =====
   Common mistakes: M1 any ceiling (even above equilibrium) causes a shortage · M2 a floor causes a shortage
   M3 controls shift the demand or supply curve · M4 a ceiling helps every buyer · M5 a minimum wage raises pay in every job
   M6 a quota lowers the price buyers pay */
mc('l8-ceiling-def','l8','A <b>price ceiling</b> is which of the following?',
  [`A legal maximum price`,`A legal minimum price`,`The highest price a buyer is willing to pay`,`The equilibrium price after a shift in demand`,`A limit on the quantity that can be sold`],0,
  `<p>Your course: "With a price ceiling the government is setting the maximum price that a good can be sold for." A <b>floor</b> is the opposite, a legal minimum.</p><p>The tempting wrong answer is "a legal minimum price," which swaps ceiling and floor. Picture a room: you can't go above the ceiling or below the floor. A limit on quantity is a <b>quota</b>, a different control.</p>`);
mc('l8-binding','l8','The equilibrium price of bread is $4 a loaf. Which of the following price ceilings would be <b>binding</b>?',
  [`A ceiling of $3`,`A ceiling of $4.50`,`A ceiling of $5`,`A ceiling of $6`,`Any ceiling, because all price controls change the market`],0,
  `<p>A ceiling binds only when it is set <b>below</b> the equilibrium price: then the market can't reach $4, and quantity demanded exceeds quantity supplied. $3 does that.</p><p>Ceilings of $4.50, $5 or $6 are above $4, so the market price of $4 is already legal: those ceilings are <b>non-binding</b>, like your course's $12 minimum wage for lawyers earning $100. "Any ceiling" is the trap.</p>`);
lazy('l8-gr-ceiling','l8',()=>({ type:'mc', kind:'graph',
  prompt:`The government sets a price ceiling at $2 in this market.${sdg({xmax:60,ymax:6,xt:[0,20,30,40,60],yt:[0,2,3,4,6],lines:[{a:[0,6],b:[60,0],label:'D',lx:-4,ly:-6,anchor:'end'},{a:[0,0],b:[60,6],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:2,label:'ceiling $2',c:'var(--bad)'}],dots:[{q:20,p:2,label:'',c:'var(--g1)'},{q:40,p:2,label:'',c:'var(--accent)'},{q:30,p:3,label:'E',c:'var(--ink)'}]})}Which of the following results?`,
  options:[`A shortage of 20 units`,`A surplus of 20 units`,`A shortage of 40 units`,`No effect, because the ceiling is a maximum`,`A shortage of 10 units`], answer:0,
  explain:`<p>The ceiling ($2) is below the equilibrium price ($3), so it binds. At $2, buyers want 40 (on D) but sellers offer only 20 (on S): a <b>shortage of 40 − 20 = 20</b>. Only 20 are actually sold.</p><p>The tempting wrong answers report one quantity (40) instead of the gap, or measure from the old equilibrium of 30 (10). A shortage is the gap between the two quantities at the controlled price.</p>` }));
tf('l8-tf-floor-short','l8','A binding price floor creates a shortage.',false,
  `<p>False. A binding floor holds the price <b>above</b> equilibrium, where sellers offer more than buyers want: a <b>surplus</b>. Your course's minimum wage example creates a surplus of house cleaners: unemployment.</p>`);
mc('l8-lawyers','l8','Lawyers earn about $100 an hour in equilibrium. The government sets a minimum wage of $12 an hour. In the market for lawyers, what happens?',
  [`Nothing: the minimum wage is non-binding because it is below the equilibrium wage`,`Lawyers\' wages fall to $12`,`A surplus of lawyers appears`,`A shortage of lawyers appears`,`The demand for lawyers shifts left`],0,
  `<p>Your course's example. $12 is far below $100, so the legal minimum doesn't stop the market from reaching its equilibrium: the floor is <b>non-binding</b>. Lawyers still earn $100.</p><p>The tempting wrong answer, "a surplus of lawyers appears," would require the floor to be above the market wage. A minimum is a floor under the wage, not a target it moves to.</p>`);
mc('l8-cleaners','l8','House cleaners earn about $8 an hour in equilibrium. The government sets a minimum wage of $12 an hour. Which of the following results in the market for house cleaners?',
  [`More people want cleaning jobs than there are jobs: a surplus of labor (unemployment)`,`More jobs than people willing to fill them: a shortage of labor`,`No change, because the minimum wage is a floor, not a ceiling`,`Wages rise to $12 and every cleaner who wanted work at $8 keeps a job`,`The supply curve of cleaners shifts right`],0,
  `<p>Your course's example. $12 is above the $8 equilibrium, so the floor <b>binds</b>. At $12, more people want cleaning jobs (quantity supplied rises) while households hire fewer cleaners (quantity demanded falls). The gap is a surplus of labor: unemployment.</p><p>The tempting wrong answer says the supply curve shifts. Your course video words it as "supply ... increases," but the curves don't move: the higher wage moves workers and employers <b>along</b> them (your course textbook: price controls "do not shift the supply curve").</p>`);
gen('l8-g-rent','l8',()=>{
  const rows=[[400,12000,18000,23000],[500,15000,15000,19000],[600,17000,13000,17000],[700,19000,11000,15000],[800,20000,10000,14000]];
  const useNew = Math.random()<0.6; const cap = pick(useNew ? [400,500] : [400]);
  const r = rows.find(x=>x[0]===cap); const qd = useNew ? r[3] : r[2]; const ans = qd - r[1];
  return { type:'num', kind:'num', prompt:`Your course textbook\'s rent-control example (Table 3.7, rental units):${table(['Rent','Quantity supplied','Original quantity demanded','New quantity demanded'],rows.map(x=>[money(x[0]),x[1].toLocaleString(),x[2].toLocaleString(),x[3].toLocaleString()]))}${useNew?'Demand has risen to the "new" column.':'Demand is still at the "original" column.'} The city caps rent at <b>${money(cap)}</b>. How large is the shortage, in rental units?`,
    answer:ans, unit:'units',
    explain:`<p>At ${money(cap)}: quantity demanded (${useNew?'new':'original'} column) ${qd.toLocaleString()} − quantity supplied ${r[1].toLocaleString()} = <b>${ans.toLocaleString()} units short</b>. The cap is below the equilibrium rent (${useNew?'$600 after the demand increase':'$500'}), so it binds.</p><p>The common slip is using the wrong demand column, or comparing with the equilibrium quantity instead of with quantity supplied at the capped rent.</p>` };
});
mc('l8-quality','l8','Rent control has held rents below equilibrium in a city for many years. According to your course textbook and Econlib, which of the following is a likely long-run effect?',
  [`Landlords spend less on maintenance, so the quality of rental housing falls`,`Landlords build many new apartments, because rents are stable`,`The shortage disappears as demand adjusts`,`Every renter in the city pays less and lives better`,`Rents rise above the ceiling legally`],0,
  `<p>With rents capped, landlords earn less from keeping apartments in good shape and have a long line of renters anyway. Your course textbook: "landlords tend to spend less on maintenance and on essentials like heating, cooling, hot water, and lighting." Econlib's Rockoff: "One of the simplest forms of evasion is quality deterioration."</p><p>The tempting wrong answer, "every renter pays less and lives better," ignores the renters who can't find an apartment at all and the falling quality for those who do.</p>`);
tf('l8-tf-shift','l8','A binding price floor shifts the supply curve to the right.',false,
  `<p>False. Your course textbook: "Neither price ceilings nor price floors cause demand or supply to change." A floor changes the price, which moves sellers <b>along</b> their supply curve to a larger quantity supplied.</p>`);
mc('l8-quota','l8','The government limits the quantity of a good that can be sold to less than the equilibrium quantity. Compared with equilibrium, which of the following happens?',
  [PQ('increases','decreases'),PQ('decreases','decreases'),PQ('increases','increases'),PQ('decreases','increases'),PQ('does not change','decreases')],0,
  `<p>A binding <b>quota</b> caps the quantity below equilibrium. With fewer units available, buyers compete for them and the price rises up the demand curve to the point where buyers want exactly the quota amount. The AP framework: "Quotas can be used to alter quantities produced and therefore affect price."</p><p>The tempting wrong answer, "price decreases," treats a quota like a price ceiling. A quota limits quantity, which makes the good scarcer and pricier.</p>`);
gen('l8-g-gas','l8',()=>{
  const P=pick([1.00,1.10,1.20]), G=pick([10,12,15]), mins=pick([30,45,60]), w=pick([8,10,12,16]);
  const wait = mins/60*w; const ans = round(P + wait/G, 2);
  return { type:'num', kind:'num', prompt:`Based on Econlib's 1979 gas-line example (some numbers changed). Gasoline is capped at ${money(P)} a gallon, so there are long lines. A driver waits <b>${mins} minutes</b> to buy <b>${G} gallons</b>, and values her time at ${money(w)} an hour. Counting both the cash and the waiting time, what is her true cost per gallon? (Round to the cent.)`,
    answer:ans, unit:'dollars',
    explain:`<p>Waiting cost: ${mins} minutes = ${fmt(mins/60)} hour × ${money(w)} = ${money(wait)}. Spread over ${G} gallons: ${money(wait)} ÷ ${G} = ${money(wait/G)} a gallon.</p><p>True cost: ${money(P)} + ${money(wait/G)} = <b>${money(ans)}</b> a gallon. Rockoff's point: under the ceiling, "The true price of gasoline, which included both the cash paid and the time spent waiting in line," could end up higher than the price without controls. The common slip is forgetting to divide the waiting cost by the gallons bought.</p>` };
});
lazy('l8-gr-floor','l8',()=>({ type:'mc', kind:'graph',
  prompt:`The government sets a price floor at $4 in this market.${sdg({xmax:60,ymax:6,xt:[0,20,30,40,60],yt:[0,3,4,6],lines:[{a:[0,6],b:[60,0],label:'D',lx:-4,ly:-6,anchor:'end'},{a:[0,0],b:[60,6],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:4,label:'floor $4',c:'var(--bad)'}],dots:[{q:20,p:4,label:'',c:'var(--accent)'},{q:40,p:4,label:'',c:'var(--g1)'},{q:30,p:3,label:'E',c:'var(--ink)'}]})}How many units are actually bought and sold at the floor, and what problem results?`,
  options:[`20 units are sold, with a surplus of 20`,`40 units are sold, with a surplus of 20`,`30 units are sold, with no surplus`,`20 units are sold, with a shortage of 20`,`40 units are sold, with a shortage of 20`], answer:0,
  explain:`<p>At $4 (above the $3 equilibrium), sellers offer 40 but buyers want only 20. Only <b>20</b> change hands, because nobody can be made to buy more than they want: the smaller of the two quantities is what's traded. The other 20 are a <b>surplus</b>.</p><p>The tempting wrong answer says 40 are sold. Sellers offering 40 doesn't mean they can sell 40. With a price floor, buyers are the "short side" of the market.</p>` }));
/* L8 more */
mc('l8-floor-def','l8','A <b>price floor</b> is which of the following?',
  [`A legal minimum price, such as a minimum wage`,`A legal maximum price, such as rent control`,`The lowest price at which a seller will sell`,`The price at the bottom of the demand curve`,`A limit on how much can be produced`],0,
  `<p>Your course textbook: "A price floor is the lowest legal price that can be paid in markets for goods and services, labor, or financial capital." The best-known example is the minimum wage.</p><p>The tempting wrong answer swaps it with a ceiling (rent control is a ceiling). "The lowest price a seller will accept" describes the supply curve, not a law.</p>`);
tf('l8-tf-nonbinding','l8','A price ceiling set above the equilibrium price causes a shortage.',false,
  `<p>False. A ceiling above equilibrium doesn't stop the market from reaching its equilibrium price, so it is <b>non-binding</b> and changes nothing. Only a ceiling <b>below</b> equilibrium causes a shortage.</p>`);
mc('l8-living','l8','In your course textbook\'s living-wage example, the equilibrium wage is $10 and the city hires 1,200 workers. A law requires at least $12 an hour, at which 1,600 people want city jobs and the city hires 700. Which of the following describes the result?',
  [`A surplus of 900 workers`,`A shortage of 900 workers`,`A surplus of 400 workers`,`A surplus of 500 workers`,`No surplus, because 700 workers are hired`],0,
  `<p>At $12: quantity of labor supplied 1,600 − quantity demanded 700 = <b>900</b> more job-seekers than jobs. The textbook: "At the price floor, the quantity supplied exceeds the quantity demanded, and a surplus of labor exists."</p><p>Tempting wrong answers measure from the old 1,200: 400 more people looking and 500 fewer jobs. Each is part of the story, but the surplus is the full gap between the two quantities at $12.</p>`);
mc('l8-fewer','l8','In your course textbook\'s rent-control example, demand rises so that the market rent would be $600 with 17,000 units rented. Rent is instead held at $500, where landlords supply 15,000 units. Which of the following is true?',
  [`Fewer apartments are rented under the ceiling than would be at the market rent`,`More apartments are rented under the ceiling, because rent is lower`,`The same number are rented, at a lower price`,`The ceiling ends the shortage`,`Landlords supply more apartments to make up for the lower rent`],0,
  `<p>Only 15,000 units are rented at $500, versus 17,000 at the market rent of $600. The textbook calls this "one of the ironies of price ceilings": a law meant to help renters leaves fewer apartments rented.</p><p>The tempting wrong answer, "more apartments are rented because rent is lower," looks at buyers only. Renters want more at $500, but landlords decide how many are offered, and they offer fewer at a lower rent.</p>`);
mc('l8-black','l8','When a binding price ceiling creates a shortage, the good still has to be rationed somehow. Which of the following is an example of non-price rationing described by Econlib?',
  [`Long waiting lines and illegal sales above the legal price`,`A fall in demand that ends the shortage`,`A rise in supply caused by the lower price`,`Sellers producing more to meet demand`,`The price rising to equilibrium legally`],0,
  `<p>Econlib's Rockoff: when price can't ration a scarce good, something else does. "A queue ... is one possibility." So are black markets and bribes, where buyers pay above the official price. Lesson 4 called markets like these the underground economy.</p><p>The tempting wrong answers have the market fix itself. With a binding ceiling the price can't legally rise, so the shortage stays and something other than price decides who gets the good.</p>`);
mc('l8-farm','l8','Many governments keep farm prices above equilibrium with "price supports." According to your course textbook, how does the most common type of support work?',
  [`The government buys the surplus, adding to demand to keep the price high`,`The government caps farm prices below equilibrium`,`Farmers are required to grow less`,`The government lowers the price so more people buy food`,`Supports have no effect on the quantity supplied`],0,
  `<p>The textbook: "The most common way price supports work is that the government enters the market and buys up the product, adding to demand to keep prices higher than they otherwise would be." A floor above equilibrium creates a surplus, and the government absorbs it.</p><p>The tempting wrong answer describes a <b>ceiling</b>. Supports are floors: they keep prices up for producers.</p>`);
mc('l8-who','l8','A binding price ceiling is placed on a prescription drug. According to your course textbook, which group is most likely to be <b>worse off</b>?',
  [`Sellers, and buyers who can no longer find the drug at all`,`Every buyer, because prices are lower`,`No one, because the drug is now cheaper`,`Only the government, because it loses tax revenue`,`Only sellers; every buyer gains`],0,
  `<p>The textbook: "Those who manage to purchase the product at the lower price given by the price ceiling will benefit, but sellers of the product will suffer, along with those who are not able to purchase the product at all. Quality is also likely to deteriorate."</p><p>The tempting wrong answer, "only sellers; every buyer gains," forgets the buyers left out by the shortage.</p>`);
gen('l8-g-quota','l8',()=>{
  const q=pick([10,15,20,25]); const pb=(60-q)/10, ps=q/10;
  return { type:'num', kind:'num', prompt:`Your course\'s orange market: quantity demanded = 60 − 10 × price, and quantity supplied = 10 × price (equilibrium $3 and 30). The government sets a <b>quota of ${q}</b> oranges. What price will buyers pay for the ${q} oranges allowed, in dollars?`,
    answer:pb, unit:'dollars',
    explain:`<p>With only ${q} for sale, the price rises until buyers want exactly ${q}: 60 − 10 × price = ${q}, so price = (60 − ${q}) ÷ 10 = <b>${money(pb)}</b>.</p><p>Sellers would have been willing to sell ${q} oranges for just ${money(ps)} each (10 × price = ${q}). The ${money(pb-ps)} gap per orange goes to whoever holds the right to sell. The common slip is reading the price off the supply curve (${money(ps)}): a quota raises the price buyers pay.</p>` };
});
tf('l8-tf-quota','l8','A binding quota lowers the price buyers pay, because less is sold.',false,
  `<p>False. Selling less makes the good scarcer, so buyers bid the price <b>up</b> along the demand curve. Your course's orange market with a quota of 20: buyers pay $4 instead of $3.</p>`);
mc('l8-minwage-evidence','l8','According to your course textbook, what do studies typically find about the effect of raising the U.S. minimum wage?',
  [`A 10% increase reduces hiring of unskilled workers by about 1% to 2%, and some studies find no effect`,`It has no effect on employment in any study`,`It cuts employment of all workers by about 10%`,`It always creates a shortage of workers`,`It raises employment, because higher wages attract more workers`],0,
  `<p>The textbook: "A typical result of such studies is that a 10% increase in the minimum wage would decrease the hiring of unskilled workers by 1 to 2%, which seems a relatively small reduction. In fact, some studies have even found no effect ... although these studies are controversial." It adds that the U.S. minimum has usually been set near or below the equilibrium wage for low-skill labor, which limits its effect.</p><p>The tempting wrong answer, "it always creates a shortage," gets the direction wrong: a binding floor creates a surplus of labor.</p>`);
mc('l8-floor-low','l8','The equilibrium price of milk is $3.50 a gallon. The government sets a price floor of $3.00. Which of the following happens?',
  [`Nothing: the floor is below equilibrium, so it is non-binding`,`A surplus of milk, because the price is held up`,`A shortage of milk, because the floor is below equilibrium`,`The price falls to $3.00`,`The supply curve shifts left`],0,
  `<p>A floor only matters if it is set <b>above</b> equilibrium. At $3.50 the market price is already above the $3.00 minimum, so the market stays at its equilibrium.</p><p>The tempting wrong answer, "the price falls to $3.00," treats the floor as a target. It is only a lower limit, and the market price is already above it.</p>`);
lazy('l8-gr-quota','l8',()=>({ type:'mc', kind:'graph',
  prompt:`The government limits sales to 20 units (the vertical line).${sdg({xmax:60,ymax:6,xt:[0,20,30,60],yt:[0,2,3,4,6],lines:[{a:[0,6],b:[60,0],label:'D',lx:-4,ly:-6,anchor:'end'},{a:[0,0],b:[60,6],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'},{a:[20,0],b:[20,6],label:'quota',c:'var(--bad)',dash:'6 4',lx:4,ly:12}],dots:[{q:20,p:4,label:'A',c:'var(--accent)'},{q:20,p:2,label:'B',c:'var(--g1)'},{q:30,p:3,label:'E',c:'var(--ink)'}]})}What price do buyers pay with the quota?`,
  options:[`$4, at point A on the demand curve`,`$2, at point B on the supply curve`,`$3, the old equilibrium price`,`$6, the highest price on the graph`,`$1, because less is sold`], answer:0,
  explain:`<p>With only 20 units allowed, buyers bid the price up until they want exactly 20: that is point A on the demand curve, $4. Sellers would have accepted $2 (point B) for 20 units; the $2 gap goes to whoever holds the right to sell.</p><p>The tempting wrong answer reads the price off the supply curve at B. The quota limits how much can be sold; buyers' willingness to pay sets the price of those units.</p>` }));
mc('l8-ceiling-why','l8','According to your course textbook, why are price ceilings usually enacted?',
  [`To keep prices low for buyers of a product people see as a necessity`,`To raise prices for sellers`,`To increase the quantity supplied`,`To create a surplus the government can buy`,`To reduce the number of buyers`],0,
  `<p>The textbook: "Price ceilings are enacted in an attempt to keep prices low for those who demand the product," often after "discontent over prices turns into public pressure on politicians," as with rent control in some cities.</p><p>The tempting wrong answer, "to raise prices for sellers," describes the goal of a <b>floor</b>, like farm price supports.</p>`);
mc('l8-import','l8','Your course textbook describes import quotas, such as the U.S. limit on imported Japanese cars in the 1980s. An import quota is which of the following?',
  [`A numerical limit on the quantity of a product that can be imported`,`A tax on each imported unit`,`A minimum price for imported goods`,`A maximum price for imported goods`,`A subsidy paid to importers`],0,
  `<p>The textbook (§20.1) defines import quotas as "numerical limitations on the quantity of products that can be imported." Limiting the quantity raises the price in the importing country, the same way the quota in this lesson's orange market does.</p><p>The tempting wrong answer, "a tax on each imported unit," is a <b>tariff</b>. A quota limits quantity directly.</p>`);
tf('l8-tf-helpall','l8','A binding price ceiling makes every buyer of the good better off.',false,
  `<p>False. Buyers who get the good at the lower price gain, but some buyers can't find it at all because of the shortage, others pay in waiting time, and quality often falls. Your course textbook: "if renters get 'cheaper' housing than the market requires, they tend to also end up with lower quality housing."</p>`);
mc('l8-gaslines','l8','In 1979, U.S. gasoline prices were held below the market level and drivers waited in long lines. Which of the following best explains the lines?',
  [`A binding price ceiling created a shortage, and waiting in line rationed the gas instead of price`,`A price floor created a surplus of gasoline`,`Demand for gasoline fell`,`Gas stations chose to sell less to raise their profits`,`The ceiling was non-binding, so the market was in equilibrium`],0,
  `<p>Econlib's Rockoff uses this example. With price held below equilibrium, quantity demanded exceeded quantity supplied. Since price couldn't ration the gas, time did: Rockoff writes that "drivers had to wait in long lines to buy gasoline."</p><p>The tempting wrong answer calls it a floor and a surplus. Lines form when there isn't enough to go around: a shortage, which comes from a ceiling.</p>`);

/* ===== Lesson 8 quick checks ===== */
mc('l8c-motive','l8','Which of the following is a price control?',
  [`A law that rents may not rise above $1,500 a month`,`A store choosing to put shirts on sale`,`A frost that raises the price of oranges`,`A tax on gasoline`,`A firm raising its price after costs rise`],0,
  `<p>A price control is a <b>law</b> that sets a maximum or minimum price instead of letting supply and demand set it. A legal rent cap is a price ceiling.</p><p>The tempting wrong answers are price changes that come from the market itself (a sale, a frost, a cost increase) or a tax, which changes costs rather than setting the price.</p>`);
mc('l8c-binding','l8','The equilibrium wage for summer lifeguards is $14 an hour. Which of the following minimum wages would be <b>binding</b>?',
  [`$10 an hour`,`$12 an hour`,`$13.50 an hour`,`$14 an hour`,`$16 an hour`],4,
  `<p>A floor binds only if it is set <b>above</b> the equilibrium. Only $16 is above $14; it would create a surplus of lifeguards (more applicants than jobs).</p><p>The other wages are at or below the $14 market wage, so employers already pay more than the minimum: non-binding, like your course's lawyers.</p>`);
mc('l8c-floor','l8','A binding price floor is set on a good. Which of the following describes the result?',
  [`Quantity supplied exceeds quantity demanded, and the amount sold falls`,`Quantity demanded exceeds quantity supplied`,`The amount sold rises, because sellers offer more`,`The supply curve shifts right`,`The market stays at equilibrium`],0,
  `<p>Above equilibrium, sellers offer more and buyers want less. Only the amount buyers want gets sold, so the quantity sold <b>falls</b>, and the rest is a surplus.</p><p>The tempting wrong answer, "the amount sold rises, because sellers offer more," forgets that a sale needs a buyer.</p>`);
mc('l8c-ceiling','l8','A city caps rents below the market level. Using your course textbook\'s reasoning, which of the following is <b>not</b> a likely result?',
  [`More apartments are offered for rent than before`,`A shortage of apartments`,`Lower spending on maintenance`,`Some landlords converting apartments to condos`,`Renters searching longer to find a place`],0,
  `<p>A rent below equilibrium lowers the quantity of apartments landlords offer, so "more apartments are offered" is the result that does <b>not</b> happen.</p><p>The textbook lists the others: a shortage, less spending "on maintenance and on essentials," and landlords converting "apartments to co-ops and condos." Longer searches are how the shortage shows up for renters.</p>`);
mc('l8c-rationing','l8','Free tickets to a popular concert are handed out at noon, and people line up at 6 a.m. Which of the following best explains the line?',
  [`At a price of $0, quantity demanded far exceeds the tickets available, so time rations them instead of price`,`The concert has a surplus of tickets`,`The tickets are an inferior good`,`Demand fell because the tickets are free`,`The supply of tickets rose because the price is zero`],0,
  `<p>A price of zero is far below the equilibrium price, so it works like a binding ceiling: a big shortage. With price not rationing the tickets, waiting does. Lesson 1 called this the opportunity cost of time.</p><p>The tempting wrong answer, "a surplus of tickets," has the gap backwards: people wouldn't line up if there were extras.</p>`);
mc('l8c-quota','l8','A city limits the number of taxi licenses to fewer taxis than the market would otherwise supply. What most likely happens to taxi fares?',
  [`Fares rise, because the limit holds the quantity below equilibrium`,`Fares fall, because fewer taxis compete`,`Fares stay the same, because licenses don\'t affect price`,`Fares fall, because demand shifts left`,`A surplus of taxi rides appears`],0,
  `<p>A cap on the number of taxis is a quota. Fewer rides are available than buyers want at the old fare, so fares rise along the demand curve until riders want only as many rides as the capped fleet provides.</p><p>The tempting wrong answer, "fares fall because fewer taxis compete," gets the direction backwards: less supply means a higher price.</p>`);
mc('l8c-skill','l8','The equilibrium price of a ride-share trip is $25. The city caps the price at $30. Which of the following happens?',
  [`Nothing: the ceiling is above equilibrium, so it is non-binding`,`A shortage of rides`,`A surplus of rides`,`The price rises to $30`,`The quantity of rides falls`],0,
  `<p>A ceiling binds only below equilibrium. $30 is above $25, so the market still settles at $25 and nothing changes.</p><p>The tempting wrong answer, "the price rises to $30," treats the ceiling as a target. It is only an upper limit.</p>`);

/* Course materials checked 2026-10-22: video 2.1c transcript, Module 2 slides 63-75, course textbook §3.4, §4.1 (minimum and living wages), §20.1 (import quotas). */
const L8TAGS = {
  'l8-ceiling-def':['MS2 OS34','ctl','terms','M2'], 'l8-binding':['MS2 OS34','ctl','models','M1'], 'l8-gr-ceiling':['OS34','ctl','graphs','M1'],
  'l8-tf-floor-short':['MS2 OS34','ctl','terms','M2'], 'l8-lawyers':['MS2','ctl','models','M5 M2'], 'l8-cleaners':['MS2 OS34','ctl','models','M2 M3 M5'],
  'l8-g-rent':['OS34','ctl','data','M1'], 'l8-quality':['OS34 ELPC ELRC','ctl','models','M4'], 'l8-tf-shift':['OS34','ctl','terms','M3'],
  'l8-quota':['CED OS201 CB','ctl','models','M6'], 'l8-g-gas':['ELPC','ctl','data','M4'], 'l8-gr-floor':['OS34','ctl','graphs','M2'],
  'l8-floor-def':['OS34','ctl','terms','M2'], 'l8-tf-nonbinding':['MS2 OS41','ctl','terms','M1'], 'l8-living':['OS41','ctl','data','M2'],
  'l8-fewer':['OS34','ctl','data','M4'], 'l8-black':['ELPC','ctl','terms','M4'], 'l8-farm':['OS34','ctl','models','M2'],
  'l8-who':['OS34','ctl','models','M4'], 'l8-g-quota':['CED OS201','ctl','data','M6'], 'l8-tf-quota':['CED OS201','ctl','terms','M6'],
  'l8-minwage-evidence':['OS41','ctl','data','M5 M2'], 'l8-floor-low':['MS2 OS41','ctl','models','M1 M5'], 'l8-gr-quota':['CED OS201','ctl','graphs','M6'],
  'l8-ceiling-why':['OS34','ctl','terms','M2'], 'l8-import':['OS201','ctl','terms','M6'], 'l8-tf-helpall':['OS34','ctl','terms','M4'],
  'l8-gaslines':['ELPC','ctl','models','M2 M1'],
  'l8c-motive':['MS2 OS34','ctl','terms',''], 'l8c-binding':['MS2 OS41','ctl','models','M1 M5'], 'l8c-floor':['MS2 OS34','ctl','models','M2 M3'],
  'l8c-ceiling':['OS34','ctl','models','M4'], 'l8c-rationing':['ELPC','ctl','models','M2'], 'l8c-quota':['CED OS201','ctl','models','M6'], 'l8c-skill':['MS2','ctl','models','M1']
};
u2tag(L8TAGS);
['l8-binding','l8c-binding'].forEach(id => { Q[id].keepOrder = true; }); /* number choices stay smallest to largest */

U2_CARDS.l8 = [
  ['Price control','What is a price control?','A law that sets a maximum or minimum price instead of letting supply and demand set it. The two kinds are price ceilings and price floors.','Rent control (a ceiling) and the minimum wage (a floor).','The control doesn\'t shift demand or supply; it moves the market to a different point on each curve.'],
  ['Price ceiling','What is a price ceiling, and when does it matter?','A legal maximum price. It matters (binds) only when set below the equilibrium price; then quantity demanded exceeds quantity supplied, causing a shortage.','Rents capped at $500 when the market rent would be $600: 19,000 units wanted, 15,000 offered (your course textbook).','A ceiling above equilibrium does nothing.'],
  ['Price floor','What is a price floor, and when does it matter?','A legal minimum price. It matters (binds) only when set above the equilibrium price; then quantity supplied exceeds quantity demanded, causing a surplus.','A $12 minimum wage where house cleaners earn $8: more cleaners want work than there are jobs (your course).','Floors cause surpluses, not shortages.'],
  ['Binding vs. non-binding','What makes a price control binding or non-binding?','Binding: it stops the market from reaching equilibrium (a ceiling below it, or a floor above it), causing a shortage or surplus. Non-binding: the equilibrium price is already legal, so nothing changes.','A $12 minimum wage binds for house cleaners ($8) but not for lawyers ($100) (your course).','A ceiling binds only below equilibrium, a floor only above it. Mixing these up flips the answer.'],
  ['Minimum wage','How does your course use the minimum wage to show binding and non-binding floors?','The minimum wage is a price floor in the labor market. For lawyers at $100 an hour, a $12 minimum is non-binding. For house cleaners at $8, it binds: more people want cleaning jobs and households hire fewer cleaners, creating unemployment.','Your course textbook\'s living wage: $12 instead of $10 means 1,600 job-seekers for 700 jobs, a surplus of 900.','Workers and employers move along their curves; the curves don\'t shift.'],
  ['Rent control effects','What does a binding rent ceiling do, in the short and long run?','A shortage (more renters want apartments than are offered), fewer units actually rented than at the market rent, and over time less maintenance and lower quality, as landlords earn less and can always find tenants.','Capped at $500: 15,000 units rented instead of 17,000 at the market rent of $600 (your course textbook).','It doesn\'t help every renter: some can\'t find a place at all.'],
  ['Non-price rationing','When a binding ceiling causes a shortage, what decides who gets the good?','Something other than price: waiting in line, black markets where people pay above the legal price, favoritism or bribes, and lower quality.','U.S. gasoline price controls in the 1970s: "drivers had to wait in long lines to buy gasoline" (Econlib).','The shortage doesn\'t go away; something other than price decides who gets the good.'],
  ['True cost with waiting','How can a price ceiling make the true cost of a good higher than the market price?','Buyers pay the capped price plus the value of the time spent waiting. If the line is long enough, the total can exceed the price without the ceiling.','Gas at $1.00, 30 minutes in line for 10 gallons, time worth $8 an hour: $1.00 + $4 ÷ 10 = $1.40 a gallon, versus about $1.20 without the cap (Econlib).','Count the value of the time spent waiting, spread over the units bought.'],
  ['Price supports','How do agricultural price supports work?','They are price floors for farm goods. Most commonly the government buys the surplus, adding to demand to keep the price above equilibrium. Farmers gain; taxpayers and food buyers pay the cost.','The European Union spends tens of billions of euros a year supporting farm prices (your course textbook).','Supports cause a surplus that someone (often the government) has to buy or store.'],
  ['Quota (quantity control)','What does a binding quota do to price and quantity?','It limits the quantity sold below equilibrium. Buyers then bid the price up along the demand curve to the point where they want exactly the quota amount. Quantity falls; the price buyers pay rises.','Orange market with a quota of 20: buyers pay $4 (not $3); sellers would have accepted $2.','A quota raises the price; it doesn\'t lower it.'],
  ['Import quota','What is an import quota?','Your course textbook: "numerical limitations on the quantity of products that can be imported." Like any binding quota, it raises the price in the importing country.','The U.S. limit on imported Japanese cars in the early 1980s, and sugar import quotas today.','A tax on imports is a tariff, not a quota.'],
  ['Controls don\'t shift curves','Do price ceilings and floors shift the demand or supply curve?','No. They set a legal price, and buyers and sellers respond by moving along their existing curves.','A $12 minimum wage raises the quantity of labor supplied (movement along supply) and lowers the quantity demanded (movement along demand).','Your course video says supply "increases"; the precise term is quantity supplied.']
];

Object.assign(U2_WRITE, {
  'w-l8-1':{lesson:'l8',prompt:'A $12 minimum wage changes the market for house cleaners (equilibrium wage $8) but not the market for lawyers (equilibrium wage $100). Explain why, and describe what happens in the house-cleaning market.',
    model:'A minimum wage is a price floor: it only matters if it is set above the equilibrium wage. For lawyers, $12 is far below the $100 market wage, so the floor is non-binding and the market stays at its equilibrium. For house cleaners, $12 is above the $8 equilibrium, so it binds. At $12, more people want to work as cleaners (quantity of labor supplied rises along the supply curve), while households hire fewer cleaners (quantity demanded falls along the demand curve). The result is a surplus of labor, which is unemployment. The cleaners who keep their jobs earn more, while others who would have worked at the lower wage can\'t find work.',
    checklist:['Identifies the minimum wage as a price floor that binds only above equilibrium','Explains it is non-binding for lawyers because $12 is below $100','Explains that for cleaners quantity supplied rises and quantity demanded falls at $12','Names the result as a surplus of labor (unemployment), noting who gains and who loses or that curves don\'t shift']},
  'w-l8-2':{lesson:'l8',prompt:'A city caps rents below the equilibrium rent. Describe the short-run and long-run effects, and say who gains and who loses.',
    model:'Because the cap is below equilibrium, it binds. At the capped rent, more people want apartments than landlords offer, so there is a shortage, and fewer apartments are rented than at the market rent. Renters who already have apartments, or who find one, gain because they pay less. Renters who can\'t find a place lose, and searching and waiting take time. Over time, landlords earn less from their buildings, so they spend less on maintenance, some convert units to condos, and fewer new rental buildings are built. Quality falls and the shortage can grow. Landlords lose too.',
    checklist:['Says the cap binds and creates a shortage (quantity demanded exceeds quantity supplied)','Notes fewer units rented than at the market rent','Describes a long-run effect such as lower maintenance or quality, conversions or less new building','Identifies winners (renters who get units) and losers (renters shut out, landlords)']}
});

U2_PLAN.l8 = {
  core:['l8-ceiling-def','l8-binding','l8-gr-ceiling','l8-tf-floor-short','l8-lawyers','l8-cleaners','l8-g-rent','l8-quality','l8-tf-shift','l8-quota','l8-g-gas','l8-gr-floor'],
  more:['l8-floor-def','l8-tf-nonbinding','l8-living','l8-fewer','l8-black','l8-farm','l8-who','l8-g-quota','l8-tf-quota','l8-minwage-evidence','l8-floor-low','l8-gr-quota','l8-ceiling-why','l8-import','l8-tf-helpall','l8-gaslines']
};

U2_LESSONS.push({ id:'l8', unit:2, title:'Price and Quantity Controls', mins:40, src:'Modern States video 2.1c and Module 2 slides 63-75 · Course textbook (OpenStax) §3.4, §4.1, §20.1',
  sources:['MS2','OS34','OS41','OS201','CB','CED','ELPC','ELRC'],
  oneline:'When the law sets a price or a quantity instead of the market, a binding ceiling causes a shortage, a binding floor causes a surplus, and a quota raises the price. Controls that don\'t bind change nothing.',
  body:`
<h2>What price controls are</h2>
<!-- src: MS2 (video 2.1c definitions; slides 64-66); OS34 (price controls, ceiling, floor, "discontent over prices", alternative policy tools) -->
<p>Lesson 7 showed that a market left alone settles at its equilibrium. Sometimes governments step in. Your course textbook: when "discontent over prices turns into public pressure on politicians," they "may then pass legislation to prevent a certain price from climbing 'too high' or falling 'too low.'" These laws are ${dt('price-control','<b>price controls</b>')}, and they come in two kinds:</p>
<div class="terms">
${term(dt('price-ceiling','Price ceiling'),'A legal <b>maximum</b> price. Example: rent control.')}
${term(dt('price-floor','Price floor'),'A legal <b>minimum</b> price. Example: the minimum wage, which is a floor in the labor market.')}
</div>
<p>Picture a room: the price can't go above the ceiling or below the floor. The goals are usually to help one side of the market: buyers (ceilings) or sellers and workers (floors). The model shows how people respond to these laws, often in ways the law didn't intend.</p>
<div data-check="l8c-motive"></div>

<h2>Binding or not binding?</h2>
<!-- src: MS2 (video 2.1c non-binding vs binding; lawyers $100, house cleaners $8, minimum wage $12; slides 69-74); OS41 ("the price floor minimum wage is said to be nonbinding"); CED (POL-1.A.1) -->
<p>Your course's key distinction: a control is ${dt('binding','<b>binding</b>')} only if it stops the market from reaching equilibrium.</p>
<ul><li>A <b>ceiling binds</b> only if it is set <b>below</b> the equilibrium price. A ceiling above equilibrium allows the market price, so nothing changes.</li><li>A <b>floor binds</b> only if it is set <b>above</b> the equilibrium price. A floor below equilibrium allows the market price, so nothing changes.</li></ul>
<p><b>Worked example: your course's minimum wage of $12 an hour.</b></p>
<div class="tbl-wrap"><table class="wrap-cells"><thead><tr><th>Market</th><th>Equilibrium wage</th><th>$12 floor is…</th><th>Result</th></tr></thead><tbody>
<tr><td>Lawyers</td><td>$100</td><td>below equilibrium: <b>non-binding</b></td><td>No effect. "Lawyers are still making a hundred dollars an hour."</td></tr>
<tr><td>House cleaners</td><td>$8</td><td>above equilibrium: <b>binding</b></td><td>More people want cleaning jobs and households hire fewer cleaners: a surplus of labor (unemployment).</td></tr>
</tbody></table></div>
<p>Same law, opposite outcomes, because what matters is where the control sits relative to each market's equilibrium. Your course textbook uses the same word: when the minimum wage is below the market wage, "the price floor minimum wage is said to be nonbinding."</p>
<p>Try it with your course's orange market (equilibrium $3 and 30):</p>
<div data-widget="controls"></div>
<div data-check="l8c-binding"></div>

<h2>Price floors: the minimum wage and farm supports</h2>
<!-- src: MS2 (video 2.1c house cleaners); OS41 (living wage $10/1,200 → $12: 1,600 vs 700; 10% → 1-2%; controversial; set near equilibrium); OS34 (floors, price supports, EU, "taxpayers and consumers of food will pay"; Clear It Up: controls don't shift curves). Source problem: the video says "the supply of house cleaners increases"; the precise statement is that quantity supplied increases (a movement along the curve). -->
<p><b>The mechanism of a binding floor.</b> Holding the price above equilibrium does two things at once. Sellers (here, workers) offer more, moving up their supply curve. Buyers (employers) want less, moving up their demand curve. The gap between them is a ${dt('excess-supply','surplus')}. And only the amount buyers want is actually sold, so the quantity traded <b>falls</b>.</p>
<p class="small muted">Wording note: your course video says the "supply" of house cleaners increases and the "demand" falls. Strictly, the curves don't move; the higher wage changes the <b>quantity</b> supplied and demanded along them. Your course textbook: "Price controls can cause a different choice of quantity supplied along a supply curve, but they do not shift the supply curve."</p>
<p><b>Worked example: your course textbook's living wage.</b> A city's equilibrium wage is $10 an hour, with 1,200 workers hired. A law sets $12:</p>
<div class="math">At $12: 1,600 people want city jobs (quantity supplied)<br>At $12: the city hires 700 (quantity demanded)<br>Surplus of labor = 1,600 − 700 = <b>900</b></div>
<p>Check: 700 is below the old 1,200, so fewer people work, even though those who do earn more. The textbook keeps the trade-off in view: "For workers who continue to have a job at a higher salary, life has improved. For those who were willing to work at the old wage rate but lost their jobs with the wage increase, life has not improved."</p>
<p><b>What the evidence says.</b> The textbook reports that "a 10% increase in the minimum wage would decrease the hiring of unskilled workers by 1 to 2%," that "some studies have even found no effect ... although these studies are controversial," and that the U.S. minimum has usually been set close to the equilibrium wage for low-skill workers, which limits its effect. Economists disagree about how big the job effects are; the model tells you their direction when the floor binds.</p>
<p><b>Farm price supports</b> are floors too. The most common kind works by the government "buy[ing] up the product, adding to demand to keep prices higher than they otherwise would be" (textbook). Farmers gain; "taxpayers and consumers of food will pay the costs."</p>
<div data-check="l8c-floor"></div>

<h2>Price ceilings: rent control and shortages</h2>
<!-- src: OS34 (rent control Table 3.7, ironies, maintenance, condos, quality, who gains/loses); ELPC (Rockoff: shortages, queues, black markets, quality deterioration, 1979 gasoline $1.00/$1.20, 30 minutes at $8/hour); ELRC (Block: deterioration, fewer repairs; survey figures) -->
<p><b>The mechanism of a binding ceiling.</b> Holding the price below equilibrium makes buyers want more (down their demand curve) while sellers offer less (down their supply curve). The gap is a ${dt('shortage','shortage')}, and only the amount sellers offer is sold.</p>
<p><b>Worked example: your course textbook's rent control.</b> A town's rental market starts at $500 and 15,000 apartments. Incomes rise and demand increases; the new equilibrium would be $600 and 17,000. But a rent-control law holds rent at $500:</p>
${table(['Rent','Supplied','New demand'],[['$500 (capped)','15,000','19,000'],['$600 (market)','17,000','17,000']],[[0,1],[0,2]])}
<div class="math">Shortage at $500 = 19,000 − 15,000 = <b>4,000 apartments</b><br>Apartments actually rented: 15,000, fewer than the 17,000 at the market rent</div>
<p>Check: the law meant to help renters leaves 2,000 fewer apartments rented. The textbook calls this one of "the ironies of price ceilings."</p>
<p><b>Who decides who gets the good?</b> With price not allowed to do the rationing, something else does. Econlib's Hugh Rockoff lists the usual replacements: waiting lines ("A queue ... is one possibility"), ${dt('black-market','black markets')} where people pay above the legal price, and lower quality ("One of the simplest forms of evasion is quality deterioration"). Your course textbook adds that landlords "spend less on maintenance" and some convert apartments to condos. So the ceiling helps renters who get an apartment and hurts landlords and the renters who can't find one.</p>
<p><b>Worked example: the true price of capped gasoline</b> (Rockoff's 1979 numbers). Gas is capped at $1.00 a gallon; without the cap it would be about $1.20. A driver waits 30 minutes for 10 gallons and values her time at $8 an hour.</p>
<div class="math">Cash: 10 × $1.00 = $10.00<br>Waiting: ½ hour × $8 = $4.00<br>True cost per gallon: ($10.00 + $4.00) ÷ 10 = <b>$1.40</b></div>
<p>Check: $1.40 is more than the $1.20 she'd pay without the cap. The ceiling lowered the cash price but raised the full price, once time counts as a cost (Lesson 1's opportunity cost).</p>
<p class="small muted">Rockoff also cites a 1992 survey in which 76.3% of economists agreed that a ceiling on rents reduces the quantity and quality of housing available. Supporters of rent control point to stability for current tenants; the model explains why those benefits come with shortages.</p>
<div data-check="l8c-ceiling,l8c-rationing"></div>

<h2>Quantity controls: quotas</h2>
<!-- src: CB (CLEP outline "Price and quantity controls"); CED (POL-1.A.1 "price and quantity regulation", POL-1.B.3 "Quotas can be used to alter quantities produced and therefore affect price"); OS201 (import quotas defined; Japanese cars; sugar). Beyond video 2.1c: added because the CLEP outline names quantity controls. Orange numbers use the course schedule; the quota is made-up. -->
<p>The CLEP outline says "price <b>and quantity</b> controls," and your course video covers only prices, so this section fills the gap. A ${dt('quota','quota')} (Lesson 4's word for a catch limit) is a legal limit on how much can be sold. Your course textbook's version is the <b>import quota</b>: "numerical limitations on the quantity of products that can be imported," such as the U.S. limit on imported Japanese cars in the early 1980s.</p>
<p><b>The mechanism.</b> A quota binds when it is <b>below</b> the equilibrium quantity. With fewer units for sale than buyers want at the old price, buyers compete for them and the price rises along the demand curve until buyers want exactly the quota amount. Sellers, meanwhile, would have been happy to sell that many for much less.</p>
<p><b>Worked example: your course's orange market with a made-up quota of 20.</b> Demand: 60 − 10 × price. Supply: 10 × price.</p>
<div class="math">Buyers want exactly 20 when 60 − 10 × price = 20 → price = <b>$4</b><br>Sellers would supply 20 at 10 × price = 20 → price = $2<br>Gap: $4 − $2 = $2 per orange, kept by whoever holds the right to sell</div>
<p>Check: the quota cut the quantity from 30 to 20 and raised the price buyers pay from $3 to $4, the opposite of what a price ceiling does. You'll see in Lesson 12 that quotas, like ceilings and floors, also cost the market some of its gains from trade.</p>
<div data-check="l8c-quota"></div>

<h2>Binding? Shortage or surplus?</h2>
<!-- src: MS2; OS34; OS41. Exam skill: compare the control with the equilibrium, then name the result. -->
<p>Exam questions give an equilibrium and a control. Two steps: (1) Does it bind? A ceiling binds below equilibrium; a floor binds above. (2) If it binds, a ceiling causes a <b>shortage</b> and a floor causes a <b>surplus</b>. If it doesn't bind, nothing changes.</p>
<div data-widget="ctlsort"></div>
<div data-check="l8c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L8TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Any price ceiling causes a shortage."</span>Only a ceiling below equilibrium binds. A ceiling above equilibrium allows the market price, so nothing changes.</li>
<li><span class="wrong">"A price floor causes a shortage."</span>A binding floor holds the price above equilibrium, where sellers offer more than buyers want: a surplus. Ceilings cause shortages.</li>
<li><span class="wrong">"A minimum wage increases the supply of workers."</span>Controls don't shift curves. The higher wage raises the quantity of labor supplied and lowers the quantity demanded, both along the existing curves.</li>
<li><span class="wrong">"A price ceiling helps every buyer."</span>Buyers who get the good gain, but others can't find it, wait in line or get lower quality. Sellers lose.</li>
<li><span class="wrong">"A minimum wage raises pay in every job."</span>Only where the market wage is below the minimum. For lawyers at $100, a $12 minimum changes nothing.</li>
<li><span class="wrong">"A quota lowers the price, because less is sold."</span>Selling less makes the good scarcer, so buyers bid the price up. Quotas raise the price buyers pay.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A <b>price ceiling</b> is a legal maximum price; a <b>price floor</b> is a legal minimum price.</li>
<li>A control is <b>binding</b> only if it blocks equilibrium: a ceiling below it or a floor above it. Your course's $12 minimum wage binds for house cleaners ($8), not lawyers ($100).</li>
<li>A binding <b>floor</b> causes a <b>surplus</b> and cuts the quantity sold; the minimum wage creates a surplus of labor, and farm supports end with the government buying the surplus.</li>
<li>A binding <b>ceiling</b> causes a <b>shortage</b>; waiting, black markets and lower quality take over the rationing, as with rent control and 1970s gas lines.</li>
<li>A binding <b>quota</b> holds quantity below equilibrium and raises the price buyers pay.</li>
<li>To answer a controls question: compare the control with the equilibrium, then name the shortage, surplus or "no effect."</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Price and quantity controls" under Supply and Demand (15% to 20% of the exam). Expect questions that give an equilibrium and a ceiling or floor and ask whether it binds, graphs where you read the size of a shortage or surplus, and questions on the effects of the minimum wage, rent control or quotas.</p>
</div>`,
  deeper:`
<h3>Alternatives to price controls</h3>
<p>Your course textbook notes that "alternative policy tools can often achieve the desired goals of price control laws, while avoiding at least some of their costs." For example, a government that wants housing to be affordable for low-income families can help those families pay rent directly, which raises their ability to pay without capping the price for everyone. Each option has its own costs and trade-offs; Unit 7 returns to the role of government.</p>
<h3>Anti-price-gouging laws</h3>
<p>Econlib's topic page on price controls notes that laws against "price gouging" after hurricanes and other emergencies work as price ceilings. They keep prices down for people who find supplies, but they also weaken the incentive to rush extra supplies into the disaster area, so shortages last longer. Supporters see them as fairness during a crisis; the model shows the trade-off.</p>
<h3>Your course's view on intervention</h3>
<p>Your course video closes by saying economists tend to think government intervention "is not the best way forward." Its slides add that policies "are put in place many times due to the social benefits outweighing the economic costs." Both points fit the model: controls create shortages or surpluses, and whether those costs are worth a policy's goals is a judgment the model can inform but not settle.</p>`,
  links:[ {k:'Textbook',t:'3.4 Price Ceilings and Price Floors',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-4-price-ceilings-and-price-floors',w:'The newer edition of your course textbook\'s §3.4, with the rent-control table and European farm supports.'},
          {k:'Article',t:'Price Controls',s:'Hugh Rockoff, Econlib',u:'https://www.econlib.org/library/Enc/PriceControls.html',w:'Short encyclopedia entry with the 1979 gas-line math and a history of price controls.'},
          {k:'Video',t:'Price Ceilings: Shortages and Quality Reduction',s:'Marginal Revolution University',u:'https://mru.org/courses/principles-economics-microeconomics/price-ceiling-shortages-reduce-quality',w:'A short video on why ceilings cause shortages and lower quality.'} ]
});
