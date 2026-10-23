/* ===== Lesson 11: Consumer Surplus, Producer Surplus and Efficiency (Modern States video 2.3) =====
   Common mistakes: M1 consumer surplus = what buyers pay · M2 equilibrium maximizes CS and PS each
   M3 producer surplus = revenue · M4 a lower price lowers consumer surplus · M5 producing more is always better
   M6 consumer surplus means the same as a surplus (excess supply) */
mc('l11-cs-def','l11','<b>Consumer surplus</b> is which of the following?',
  [`The difference between what buyers are willing to pay and what they actually pay`,`The total amount buyers spend on a good`,`The extra goods left over when quantity supplied exceeds quantity demanded`,`The price buyers pay minus the seller\'s cost`,`The amount buyers save by not buying the good`],0,
  `<p>Your course: consumer surplus is "the difference between the willingness to pay and the actual price paid." Your course textbook: "The amount that individuals would have been willing to pay, minus the amount that they actually paid, is called consumer surplus."</p><p>The tempting "extra goods left over" is a <b>surplus</b> in the Lesson 7 sense (excess supply), a different idea that shares the word. "Price minus the seller's cost" is producer surplus.</p>`);
mc('l11-water','l11','At a hot summer concert, you would pay up to $5.00 for a bottle of water. The vendor charges $2.50. What is your consumer surplus?',
  [`$2.50`,`$5.00`,`$7.50`,`$0`,`$1.50`],0,
  `<p>Willingness to pay − price paid = $5.00 − $2.50 = <b>$2.50</b> (your course's example). That is the value you get beyond what you paid.</p><p>The tempting $5.00 is your willingness to pay, not the surplus; $7.50 adds instead of subtracting.</p>`);
gen('l11-g-cs','l11',()=>{
  const wtp=[pick([9,8.5,8]),pick([7,6.5]),pick([5.5,5]),pick([4,3.5]),pick([2.5,2])]; const p=pick([3,4.5,6]);
  const buy=wtp.filter(v=>v>=p), ans=round(buy.reduce((a,v)=>a+v-p,0),2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. Five fans would each buy one concert T-shirt and are willing to pay at most:${table(['Fan','A','B','C','D','E'],[['Willingness to pay',...wtp.map(money)]])}The shirts sell for <b>${money(p)}</b>. What is the total consumer surplus?`,
    answer:ans, unit:'dollars',
    explain:`<p>Only fans willing to pay at least ${money(p)} buy: ${buy.map(money).join(', ')}. Each one's surplus is willingness to pay − ${money(p)}: ${buy.map(v=>money(v-p)).join(' + ')} = <b>${money(ans)}</b>.</p><p>The common slip is including fans whose willingness to pay is below the price. They don't buy, so they get no surplus (not a negative one).</p>` };
});
mc('l11-ps-def','l11','<b>Producer surplus</b> is which of the following?',
  [`The price a seller receives minus the lowest price the seller would have accepted`,`The seller\'s total revenue`,`The price buyers pay minus what they were willing to pay`,`The goods left unsold at the current price`,`The seller\'s profit after all costs, including past investments`],0,
  `<p>Your course: producer surplus is "the difference between the price that the firm actually receives and the price that they are willing to accept to cover their costs." Your course textbook: "The amount that a seller is paid for a good minus the seller's actual cost."</p><p>The tempting "total revenue" counts the whole price, ignoring what it cost the seller to provide the good.</p>`);
mc('l11-vendors','l11','Your course\'s three water vendors will sell a bottle for no less than $3.00 (A), $2.75 (B) and $2.00 (C). If the price is $3.50, what is the total producer surplus?',
  [`$2.75`,`$0.25`,`$1.50`,`$3.50`,`$10.50`],0,
  `<p>All three sell at $3.50. Producer surplus: A $3.50 − $3.00 = $0.50; B $3.50 − $2.75 = $0.75; C $3.50 − $2.00 = $1.50. Total: <b>$2.75</b>.</p><p>Tempting wrong answers: $0.25 is C's surplus at the lower price of $2.25; $1.50 counts only vendor C; $10.50 is total revenue (3 × $3.50).</p>`);
tf('l11-tf-paid','l11','Consumer surplus is the amount buyers actually pay for a good.',false,
  `<p>False. What buyers pay is their spending. Consumer surplus is the <b>extra</b> value they get beyond what they paid: willingness to pay minus price. A buyer who would pay $5 and pays $2.50 spends $2.50 and gets $2.50 of surplus.</p>`);
lazy('l11-gr-areas','l11',()=>({ type:'mc', kind:'graph',
  prompt:`The market is in equilibrium at E.${sdg({xmax:10,ymax:10,xt:[0,5,10],yt:[0,5,10],areas:[{pts:[[0,10],[0,5],[5,5]],c:'var(--accent-soft)',label:[1.6,6.4,'A']},{pts:[[0,5],[0,0],[5,5]],c:'var(--surface-2)',label:[1.6,3.4,'B']}],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,0],b:[10,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:5,label:'P*',c:'var(--muted)'}],dots:[{q:5,p:5,label:'E'}]})}Which area is consumer surplus?`,
  options:[`Area A`,`Area B`,`Areas A and B together`,`The area below the supply curve`,`The rectangle under the price line`], answer:0,
  explain:`<p>Consumer surplus is the area <b>below the demand curve and above the price</b> (your course), out to the quantity bought: area A. Each slice is a buyer whose willingness to pay (the demand curve) is above P*.</p><p>Area B is producer surplus (above the supply curve, below the price). A and B together are total surplus. The rectangle under the price line is what buyers spend.</p>` }));
mc('l11-total','l11','Your course says <b>total surplus</b> equals "the value to buyers minus the cost to sellers." Why does the price drop out?',
  [`The price is part of consumer surplus with a minus sign and part of producer surplus with a plus sign, so it cancels`,`Because the price is always zero in equilibrium`,`Because sellers keep the whole price as profit`,`Because total surplus only counts buyers`,`Because the price equals the cost at equilibrium`],0,
  `<p>Consumer surplus = willingness to pay − price. Producer surplus = price − seller's cost. Add them: willingness to pay − price + price − cost = <b>willingness to pay − cost</b>. The price is just a transfer from buyer to seller; it doesn't create or destroy value.</p><p>The tempting "price equals cost at equilibrium" is wrong: most sellers at equilibrium have costs below the price, which is why they have producer surplus.</p>`);
gen('l11-g-triangle','l11',()=>{
  const a=pick([10,12,15,20]), pe=pick([4,5,6]), qe=pick([20,30,40,50]); const ans=0.5*qe*(a-pe);
  return { type:'num', kind:'num', prompt:`Made-up numbers. A straight-line demand curve starts at a price of ${money(a)} (where quantity demanded is zero). The market is in equilibrium at a price of ${money(pe)} and a quantity of ${qe}. What is the consumer surplus?`,
    answer:ans, unit:'dollars',
    explain:`<p>Consumer surplus is the triangle below the demand curve and above the price. Its base is the quantity (${qe}) and its height is the gap between where demand starts and the price: ${money(a)} − ${money(pe)} = ${money(a-pe)}.</p><p>Area = ½ × base × height = ½ × ${qe} × ${money(a-pe)} = <b>${money(ans)}</b>. The common slip is forgetting the ½: base × height gives a rectangle, twice the triangle.</p>` };
});
mc('l11-efficient','l11','Why do economists say a competitive market at equilibrium is <b>efficient</b>?',
  [`Total surplus is as large as possible: every unit worth more to a buyer than it costs a seller is traded, and no unit worth less is`,`Buyers pay the lowest possible price`,`Sellers earn the highest possible price`,`Every buyer who wants the good gets it`,`Consumer surplus and producer surplus are each as large as possible`],0,
  `<p>Your course textbook: "Social surplus is larger at equilibrium quantity and price than it would be at any other quantity. This demonstrates the economic efficiency of the market equilibrium." Goods go to the buyers who value them most and are made by the sellers with the lowest costs.</p><p>The tempting last choice repeats a claim in your course video and slides ("maximizes both consumer and producer surplus"). It's the <b>sum</b> that is maximized; a lower price would give buyers more surplus and sellers less.</p>`);
tf('l11-tf-each','l11','At equilibrium, consumer surplus and producer surplus are each as large as they could possibly be.',false,
  `<p>False. Equilibrium maximizes <b>total</b> surplus. A binding price ceiling can raise consumer surplus (by moving surplus from sellers to buyers) and a floor can raise producer surplus, but both shrink the total. Your course textbook: "at the efficient level of output, it is impossible to produce greater consumer surplus without reducing producer surplus." (Your course's slides say equilibrium maximizes both; the slide that sums up the lesson says "maximized total surplus," which is the accurate version.)</p>`);
mc('l11-beyond','l11','Suppose a market produced <b>more</b> than the equilibrium quantity. What would happen to total surplus, and why?',
  [`It would fall, because the extra units cost sellers more to make than they are worth to buyers`,`It would rise, because more goods are always better`,`It would stay the same, because the extra units are free`,`It would rise, because consumer surplus grows`,`It would fall, because the price would be too high`],0,
  `<p>Beyond the equilibrium quantity, the supply curve (sellers' cost) is above the demand curve (buyers' value). Each extra unit uses up more in cost than it gives in value, so it subtracts from total surplus.</p><p>The tempting "more goods are always better" ignores cost. Resources used on a unit worth $2 that costs $3 to make could have produced something worth more elsewhere.</p>`);
/* L11 more */
mc('l11-wtp','l11','According to your course textbook, the demand curve can be read as which of the following?',
  [`Buyers\' willingness to pay for each unit`,`Sellers\' costs of each unit`,`The price set by the government`,`Total revenue at each price`,`The quantity supplied at each price`],0,
  `<p>Your course textbook: "the demand curve traces consumers' willingness to pay for different quantities." The height of the demand curve at each quantity is the most someone would pay for that unit, which is why the area between it and the price measures consumer surplus.</p><p>The tempting "sellers' costs" describes the supply curve.</p>`);
mc('l11-price-fall','l11','The price of a bottle of water at the concert falls from $2.50 to $1.50. What happens to consumer surplus?',
  [`It rises: existing buyers pay less, and new buyers who value water at $1.50 to $2.50 now buy`,`It falls, because sellers receive less`,`It stays the same, because the water is the same`,`It rises only for new buyers`,`It falls, because more people now buy`],0,
  `<p>Your course: the new consumer surplus includes "the gain in consumer surplus from the people that were already in the market ... plus the gain in consumer surplus for our new consumers." The $5 buyer's surplus rises from $2.50 to $3.50, and the $2 buyer, who didn't buy before, now gets $0.50.</p><p>The tempting "it falls, because sellers receive less" describes producer surplus.</p>`);
mc('l11-tablets','l11','In your course textbook\'s tablet market, the equilibrium price is $80. Point J on the demand curve shows that buyers of the first 20 million tablets would have paid $90. For a buyer who would have paid $90, what is the consumer surplus on a tablet?',
  [`$10`,`$80`,`$90`,`$170`,`$45`],0,
  `<p>$90 − $80 = <b>$10</b>. The textbook: these consumers "received a benefit beyond what they had to pay for."</p><p>$80 is what they pay and $90 is what they'd pay; the surplus is the gap.</p>`);
mc('l11-ps-rise','l11','When the price of water rises from $2.25 to $3.50, what happens to producer surplus in your course\'s vendor example?',
  [`It rises: vendor C gains more per bottle, and vendors A and B start selling`,`It falls, because buyers pay more`,`It stays at $0.25`,`It rises only for vendor C`,`It falls, because some buyers stop buying`],0,
  `<p>At $2.25 only C sells, with $0.25 of surplus. At $3.50 C's surplus grows to $1.50, and A ($0.50) and B ($0.75) join: total $2.75. Your course: producer surplus is "the gain for firms from receiving a price higher than the minimum that they're willing to accept."</p>`);
tf('l11-tf-ps-revenue','l11','Producer surplus is the same as a seller\'s revenue.',false,
  `<p>False. Revenue is the whole price times quantity. Producer surplus subtracts what the seller needed to cover costs: price − the lowest price the seller would accept. Vendor C sells at $2.25 for revenue of $2.25 but producer surplus of only $0.25.</p>`);
gen('l11-g-ps','l11',()=>{
  const cost=[pick([1,1.5]),pick([2,2.5]),pick([3,3.5]),pick([4.5,5]),pick([6,6.5])]; const p=pick([3,4,5.5]);
  const sell=cost.filter(c=>c<=p), ans=round(sell.reduce((a,c)=>a+p-c,0),2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. Five bakers would each sell one cake for no less than:${table(['Baker','A','B','C','D','E'],[['Lowest acceptable price',...cost.map(money)]])}Cakes sell for <b>${money(p)}</b>. What is the total producer surplus?`,
    answer:ans, unit:'dollars',
    explain:`<p>Only bakers whose lowest acceptable price is at or below ${money(p)} sell: ${sell.map(money).join(', ')}. Each gets ${money(p)} − their minimum: ${sell.map(c=>money(p-c)).join(' + ')} = <b>${money(ans)}</b>.</p><p>The common slip is adding up the prices received (revenue) instead of the gaps.</p>` };
});
lazy('l11-gr-ps','l11',()=>({ type:'mc', kind:'graph',
  prompt:`The market is in equilibrium at E.${sdg({xmax:10,ymax:10,xt:[0,6,10],yt:[0,4,10],areas:[{pts:[[0,10],[0,4],[6,4]],c:'var(--accent-soft)',label:[1.8,5.6,'X']},{pts:[[0,4],[0,1],[6,4]],c:'var(--surface-2)',label:[1.6,3.0,'Y']},{pts:[[6,4],[10,0],[10,6]],c:'var(--bad-soft)',label:[8.6,3.4,'Z']}],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,1],b:[10,6],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:4,c:'var(--muted)'}],dots:[{q:6,p:4,label:'E'}]})}Which area is producer surplus?`,
  options:[`Area Y`,`Area X`,`Area Z`,`Areas X and Y`,`Areas Y and Z`], answer:0,
  explain:`<p>Producer surplus is the area <b>above the supply curve and below the price</b>, out to the quantity sold: area Y. Each slice is a seller whose cost (the supply curve) is below P*.</p><p>X is consumer surplus. Z lies beyond the equilibrium quantity, where the units are never traded at this price; it is not anyone's surplus.</p>` }));
mc('l11-who','l11','At the market equilibrium, which buyers and sellers end up trading, according to your course?',
  [`The buyers who value the good most and the sellers who can produce it at the lowest cost`,`The buyers who arrive first and the sellers with the most stock`,`Every buyer and every seller in the market`,`The buyers with the lowest willingness to pay`,`The sellers with the highest costs`],0,
  `<p>Your course's slide: goods are allocated to "buyers who value them most highly, as measured by their willingness to pay" and to "sellers who can produce them at the lowest cost." Buyers whose willingness to pay is below the price stay out, and so do sellers whose cost is above it.</p><p>That sorting is why total surplus is maximized: the most valuable uses are matched with the cheapest production.</p>`);
tf('l11-tf-words','l11','Consumer surplus means the same thing as a surplus in the market.',false,
  `<p>False. A <b>surplus</b> (Lesson 7) is excess supply: quantity supplied exceeds quantity demanded at the current price. <b>Consumer surplus</b> is the extra value buyers get beyond the price they pay. A market at equilibrium has no surplus but plenty of consumer surplus.</p>`);
gen('l11-g-total','l11',()=>{
  const a=pick([10,12,14]), b=pick([0,1,2]), qe=pick([20,40,60]); const pe=pick([5,6]); const ans=0.5*qe*(a-b);
  return { type:'num', kind:'num', prompt:`Made-up numbers. Straight-line demand and supply curves: demand starts at ${money(a)} and supply starts at ${money(b)} (the prices at zero quantity). They cross at a price of ${money(pe)} and a quantity of ${qe}. What is the total surplus at equilibrium?`,
    answer:ans, unit:'dollars',
    explain:`<p>Total surplus is the triangle between the demand and supply curves, out to the equilibrium quantity. Base: ${qe}. Height: ${money(a)} − ${money(b)} = ${money(a-b)}.</p><p>Area = ½ × ${qe} × ${money(a-b)} = <b>${money(ans)}</b>. You get the same answer by adding consumer surplus (½ × ${qe} × ${money(a-pe)} = ${money(0.5*qe*(a-pe))}) and producer surplus (½ × ${qe} × ${money(pe-b)} = ${money(0.5*qe*(pe-b))}). The price only splits the total; it doesn't change it.</p>` };
});
mc('l11-ceiling','l11','A binding price ceiling lowers the price of a drug from $600 to $400, and the quantity sold falls from 20,000 to 15,000 (your course textbook\'s example). Which of the following is true?',
  [`Some surplus moves from producers to consumers, but total surplus falls`,`Consumer surplus and total surplus both rise`,`Producer surplus rises because fewer units are sold`,`Total surplus stays the same; it is only redistributed`,`Neither consumers nor producers are affected`],0,
  `<p>The textbook: "the price ceiling transfers the area of surplus (V) from producers to consumers," and "the total surplus of society is reduced," because 5,000 doses that buyers valued above their cost are no longer made. So consumer surplus can rise while total surplus falls, which is why equilibrium maximizes the <b>total</b>, not each part (Lesson 12 names the loss).</p><p>The tempting "only redistributed" misses the lost trades.</p>`);
mc('l11-short','l11','A market produces <b>less</b> than the equilibrium quantity. What happens to total surplus?',
  [`It falls, because some units that buyers value more than they cost to make are not produced`,`It rises, because resources are saved`,`It stays the same`,`It rises for buyers and sellers alike`,`It falls only if the price also falls`],0,
  `<p>Up to the equilibrium quantity, each unit's value to a buyer (the demand curve) is above its cost to a seller (the supply curve). Leaving some of those units unmade throws away their surplus. Your course textbook calls total surplus "larger at equilibrium quantity ... than it would be at any other quantity," lower or higher.</p>`);
mc('l11-welfare','l11','<b>Welfare economics</b>, as your course uses the term, studies which of the following?',
  [`How the allocation of resources and market outcomes affect economic well-being`,`Government programs for low-income families`,`How firms maximize profit`,`How prices are set by the government`,`The welfare of workers in factories`],0,
  `<p>Your course's slide: welfare economics looks at "how the allocation of resources and market outcomes affect economic well-being," using consumer surplus, producer surplus and total surplus.</p><p>The tempting "government programs for low-income families" is the everyday meaning of "welfare." In economics the word means well-being.</p>`);
mc('l11-water-new','l11','In your course\'s example, a concert-goer would pay at most $2.00 for water. The price falls from $2.50 to $1.50. What is her consumer surplus now?',
  [`$0.50`,`$1.00`,`$2.00`,`$0`,`$1.50`],0,
  `<p>At $2.50 she didn't buy. At $1.50 she buys: $2.00 − $1.50 = <b>$0.50</b> (your course video). Your course's slide shows $1 here, which is a typo; the video's $0.50 is correct.</p>`);
mc('l11-vendor-who','l11','Your course\'s water vendors accept no less than $3.00 (A), $2.75 (B) and $2.00 (C). If the price is $2.25, which of the following is true?',
  [`Only vendor C sells, with producer surplus of $0.25`,`All three sell, with total producer surplus of $0.75`,`Vendors B and C sell`,`No one sells, because the price is too low`,`Only vendor A sells`],0,
  `<p>A seller sells only if the price is at least their minimum: only C ($2.00) qualifies. Producer surplus: $2.25 − $2.00 = <b>$0.25</b>.</p>`);
lazy('l11-gr-total','l11',()=>({ type:'mc', kind:'graph',
  prompt:`The market is in equilibrium at E.${sdg({xmax:10,ymax:10,xt:[0,5,10],yt:[0,5,10],areas:[{pts:[[0,10],[0,5],[5,5]],c:'var(--accent-soft)',label:[1.6,6.4,'A']},{pts:[[0,5],[0,0],[5,5]],c:'var(--surface-2)',label:[1.6,3.4,'B']}],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,0],b:[10,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:5,label:'P*',c:'var(--muted)'}],dots:[{q:5,p:5,label:'E'}]})}Which area shows <b>total surplus</b> at equilibrium?`,
  options:[`Areas A and B together`,`Area A only`,`Area B only`,`The whole rectangle under P* out to E`,`The area above the demand curve`], answer:0,
  explain:`<p>Total surplus = consumer surplus (A, between demand and price) + producer surplus (B, between price and supply): the whole triangle between the two curves out to E.</p><p>The rectangle under the price line is buyers' spending, which is also sellers' revenue: a transfer, not a surplus.</p>` }));

/* ===== Lesson 11 quick checks ===== */
mc('l11c-wtp','l11','Before a flea market, Jordan decides she will pay at most $40 for a vintage jacket. What is her willingness to pay, and what happens if the price is $45?',
  [`$40; at $45 she doesn\'t buy`,`$45; she buys`,`$40; she buys anyway`,`$5; she buys`,`$85; she buys`],0,
  `<p>Willingness to pay is the maximum a buyer would pay: $40. Your course: "Beyond that maximum price, we're gonna walk out of the store." At $45 she walks.</p>`);
mc('l11c-cs','l11','A buyer would pay up to $30 for a concert T-shirt and buys one for $22. What is his consumer surplus?',
  [`$8`,`$22`,`$30`,`$52`,`$0`],0,
  `<p>$30 − $22 = <b>$8</b>: the value beyond what he paid.</p>`);
mc('l11c-cs2','l11','On a supply and demand graph, consumer surplus is the area between which of the following?',
  [`The demand curve and the price line, out to the quantity bought`,`The supply curve and the price line`,`The demand and supply curves beyond equilibrium`,`The price line and the horizontal axis`,`The vertical axis and the supply curve`],0,
  `<p>Your course: "the area below our demand curve and above the price." Below the price line and above the supply curve is producer surplus; below the price line down to the axis is spending.</p>`);
mc('l11c-ps','l11','A farmer would sell a crate of peaches for as little as $12 and sells it for $20. What is her producer surplus?',
  [`$8`,`$20`,`$12`,`$32`,`$0`],0,
  `<p>Price received − lowest acceptable price = $20 − $12 = <b>$8</b>. The $20 is her revenue, not her surplus.</p>`);
mc('l11c-total','l11','A buyer values a used bike at $150. The seller would part with it for $90. They agree on $120. What is the total surplus from the trade, and how is it split?',
  [`$60 total: $30 to the buyer and $30 to the seller`,`$120 total, all to the seller`,`$60 total, all to the buyer`,`$30 total`,`$150 total`],0,
  `<p>Total surplus = value to buyer − cost to seller = $150 − $90 = <b>$60</b>. The price splits it: buyer $150 − $120 = $30; seller $120 − $90 = $30. A different price would split it differently, but the total stays $60.</p>`);
mc('l11c-eff','l11','A market\'s equilibrium quantity is 500 units. Why would producing a 501st unit lower total surplus?',
  [`Its cost to the seller would be higher than its value to any remaining buyer`,`It would lower the price`,`It would create a shortage`,`It would raise consumer surplus too much`,`It wouldn\'t; more units always add surplus`],0,
  `<p>Past equilibrium, the supply curve (cost) is above the demand curve (value). The 501st unit takes more resources to make than anyone values it at, so total surplus falls.</p>`);
mc('l11c-skill','l11','On a standard supply and demand graph in equilibrium, which area is <b>neither</b> consumer nor producer surplus?',
  [`The area between the two curves to the right of the equilibrium quantity`,`The area below demand and above the price, left of equilibrium`,`The area above supply and below the price, left of equilibrium`,`The triangle between the curves left of equilibrium`,`All of these are surplus`],0,
  `<p>Surplus only comes from units actually traded, to the left of the equilibrium quantity. Beyond it, units cost more than they're worth, so they aren't traded and the area there is no one's surplus.</p>`);

/* Course materials checked 2026-10-22: video 2.3 transcript, Module 2 slides 100-114, course textbook §3.5.
   Source problems noted in the lesson: equilibrium maximizes total surplus (not each part); slide 105 water CS typo ($1 vs $0.50). */
const L11TAGS = {
  'l11-cs-def':['MS2 OS35','cs','terms','M1 M6'], 'l11-water':['MS2','cs','data','M1'], 'l11-g-cs':['MS2 OS35','cs','data','M1'],
  'l11-ps-def':['MS2 OS35','cs','terms','M3'], 'l11-vendors':['MS2','cs','data','M3'], 'l11-tf-paid':['MS2 OS35','cs','terms','M1'],
  'l11-gr-areas':['MS2 OS35','cs','graphs','M1'], 'l11-total':['MS2','cs','models','M3'], 'l11-g-triangle':['OS35','cs','data','M1'],
  'l11-efficient':['OS35 CED','cs','models','M2'], 'l11-tf-each':['OS35 CED','cs','terms','M2'], 'l11-beyond':['OS35','cs','models','M5'],
  'l11-wtp':['OS35','cs','terms',''], 'l11-price-fall':['MS2','cs','models','M4'], 'l11-tablets':['OS35','cs','data','M1'],
  'l11-ps-rise':['MS2','cs','models','M3'], 'l11-tf-ps-revenue':['MS2 OS35','cs','terms','M3'], 'l11-g-ps':['MS2 OS35','cs','data','M3'],
  'l11-gr-ps':['MS2 OS35','cs','graphs','M5'], 'l11-who':['MS2','cs','models','M2'], 'l11-tf-words':['OS31 OS35','cs','terms','M6'],
  'l11-g-total':['MS2 OS35','cs','data','M2'], 'l11-ceiling':['OS35','cs','models','M2'], 'l11-short':['OS35','cs','models','M5'],
  'l11-welfare':['MS2','cs','terms',''], 'l11-water-new':['MS2','cs','data','M4'], 'l11-vendor-who':['MS2','cs','data','M3'],
  'l11-gr-total':['MS2 OS35','cs','graphs','M3'],
  'l11c-wtp':['MS2','cs','terms',''], 'l11c-cs':['MS2','cs','data','M1'], 'l11c-cs2':['MS2 OS35','cs','graphs','M1'],
  'l11c-ps':['MS2 OS35','cs','data','M3'], 'l11c-total':['MS2','cs','data','M3'], 'l11c-eff':['OS35','cs','models','M5'], 'l11c-skill':['OS35','cs','graphs','M5']
};
u2tag(L11TAGS);

U2_CARDS.l11 = [
  ['Welfare economics','What does welfare economics study, as your course uses the term?','How the allocation of resources and market outcomes affect economic well-being, measured with consumer surplus, producer surplus and total surplus.','Comparing how well off buyers and sellers are before and after a tax.','"Welfare" here means well-being, not government aid.'],
  ['Willingness to pay','What is willingness to pay, and where does it appear on a graph?','The most a buyer would pay for one more unit. The demand curve traces it: its height at each quantity is that buyer\'s maximum price.','You\'d pay up to $5 for water at a hot concert (your course).','Willingness to pay is the most a buyer would pay, not the price actually paid.'],
  ['Consumer surplus','What is consumer surplus, and how is it shown on a graph?','Willingness to pay minus the price actually paid. On a graph: the area below the demand curve and above the price, out to the quantity bought.','Willing to pay $5, pay $2.50: $2.50 of consumer surplus (your course).','It isn\'t what buyers spend, and it isn\'t a "surplus" of unsold goods.'],
  ['Producer surplus','What is producer surplus, and how is it shown on a graph?','The price received minus the lowest price the seller would accept (its cost). On a graph: the area above the supply curve and below the price, out to the quantity sold.','Vendor C accepts $2.00 and sells at $3.50: $1.50 (your course).','It isn\'t revenue.'],
  ['Total surplus','What is total surplus, and why doesn\'t the price appear in it?','Consumer surplus + producer surplus = value to buyers − cost to sellers. The price is paid by one side and received by the other, so it cancels.','A bike worth $150 to the buyer and $90 to the seller creates $60 of total surplus at any price between them.','Total surplus isn\'t what buyers spend; spending is a transfer to sellers.'],
  ['Price changes and surplus','How does a price change shift surplus between buyers and sellers?','A lower price raises consumer surplus (existing buyers pay less, and new buyers join) and lowers producer surplus. A higher price does the reverse.','Water falls from $2.50 to $1.50: the $5 buyer\'s surplus rises from $2.50 to $3.50, and the $2 buyer now gets $0.50 (your course).','A lower price raises consumer surplus; it lowers producer surplus.'],
  ['Efficiency of equilibrium','Why is a competitive market at equilibrium efficient?','Total surplus is as large as possible. Every unit worth more to a buyer than it costs a seller is traded, and no unit worth less is. Goods go to the buyers who value them most and are made by the sellers with the lowest costs.','Your course textbook: "Social surplus is larger at equilibrium quantity and price than it would be at any other quantity."','Efficient means total surplus is as large as possible, not that everyone who wants the good gets it.'],
  ['Total, not each part','Does equilibrium maximize consumer surplus and producer surplus separately?','No: it maximizes their sum. A binding ceiling can raise consumer surplus and a floor can raise producer surplus, but each lowers the total.','A price ceiling on a drug moves surplus from producers to consumers while total surplus falls (your course textbook).','Your course\'s slides say "both"; the accurate claim is the total.'],
  ['Producing too much or too little','Why does producing more or less than the equilibrium quantity lower total surplus?','Below equilibrium, units worth more than they cost go unmade. Above it, units cost more than they\'re worth. Either way, total surplus is smaller.','The 501st unit in a market whose equilibrium is 500 costs more to make than any remaining buyer would pay.','More output isn\'t always better; past equilibrium, extra units cost more than they\'re worth.'],
  ['Two kinds of "surplus"','How is consumer surplus different from a surplus in a market?','A market surplus (excess supply) is unsold goods: quantity supplied above quantity demanded at the current price. Consumer surplus is buyers\' gain from trading: willingness to pay minus price.','A market at equilibrium has no surplus of goods but plenty of consumer surplus.','Same word, different idea.'],
  ['Reading surplus on a graph','On a supply and demand graph, where are spending, sellers\' cost and buyers\' value?','Spending (= revenue) is the rectangle under the price line out to the quantity. Sellers\' cost is the area under the supply curve; buyers\' value is the area under the demand curve, both out to the quantity traded.','Value − spending = consumer surplus; revenue − cost = producer surplus.','Only count area to the left of the quantity actually traded.'],
  ['Triangle areas','How do you calculate consumer or producer surplus from straight-line curves?','Area of a triangle = ½ × base × height. Base: the quantity traded. Height: the gap between where the curve starts and the price.','Demand starts at $10, price $6, quantity 40: CS = ½ × 40 × $4 = $80.','Don\'t forget the ½.']
];

Object.assign(U2_WRITE, {
  'w-l11-1':{lesson:'l11',prompt:'Use your course\'s summer-concert water example to explain consumer surplus and producer surplus. What happens to each when the price of water rises?',
    model:'Consumer surplus is the most a buyer would pay minus the price. A fan who would pay $5 and pays $2.50 gets $2.50 of consumer surplus. Producer surplus is the price minus the lowest price a seller would accept to cover costs. At $3.50, vendor C, who would accept $2, gets $1.50. When the price rises, buyers who still buy get less surplus and some buyers drop out, so consumer surplus falls. Sellers who were already selling gain more per bottle and new sellers like vendors A and B join, so producer surplus rises.',
    checklist:['Defines consumer surplus as willingness to pay minus price, with a correct number','Defines producer surplus as price minus the lowest acceptable price, with a correct number','Says consumer surplus falls when the price rises (and some buyers leave)','Says producer surplus rises when the price rises (and some sellers join)']},
  'w-l11-2':{lesson:'l11',prompt:'Explain why a competitive market at equilibrium maximizes total surplus. What goes wrong if it produces more, or less, than the equilibrium quantity?',
    model:'Total surplus is value to buyers minus cost to sellers. At equilibrium, every unit whose value to a buyer (on the demand curve) is at least its cost to a seller (on the supply curve) is traded, and the good goes to buyers who value it most and sellers who make it most cheaply. If the market produced less, some units worth more than they cost would go unmade, losing their surplus. If it produced more, the extra units would cost more than buyers value them, which subtracts from total surplus. That is why equilibrium is efficient, even though a different price could give one side more surplus at the other\'s expense.',
    checklist:['Defines total surplus as value to buyers minus cost to sellers (or CS + PS)','Explains that at equilibrium all units with value at least equal to cost are traded','Explains the loss from producing less (valuable units not made)','Explains the loss from producing more (units cost more than they\'re worth)']}
});

U2_PLAN.l11 = {
  core:['l11-cs-def','l11-water','l11-g-cs','l11-ps-def','l11-vendors','l11-tf-paid','l11-gr-areas','l11-total','l11-g-triangle','l11-efficient','l11-tf-each','l11-beyond'],
  more:['l11-wtp','l11-price-fall','l11-tablets','l11-ps-rise','l11-tf-ps-revenue','l11-g-ps','l11-gr-ps','l11-who','l11-tf-words','l11-g-total','l11-ceiling','l11-short','l11-welfare','l11-water-new','l11-vendor-who','l11-gr-total']
};

U2_LESSONS.push({ id:'l11', unit:2, title:'Consumer and Producer Surplus', mins:40, src:'Modern States video 2.3 and Module 2 slides 100-114 · Course textbook (OpenStax) §3.5',
  sources:['MS2','OS35','CB','CED'],
  oneline:'Buyers gain when they pay less than they would have; sellers gain when they get more than they needed. At equilibrium the total of those gains is as large as it can be, which is what economists mean by an efficient market.',
  body:`
<h2>Welfare economics and willingness to pay</h2>
<!-- src: MS2 (video 2.3: welfare economics, maximum price; slides 101-103); OS35 (demand curve traces willingness to pay; efficiency definition) -->
<p>Lessons 6 to 10 described <b>what</b> markets do. This lesson asks whether the result is <b>good</b> for the people in it. Your course calls this ${dt('welfare-economics','<b>welfare economics</b>')}: "how the allocation of resources and market outcomes affect economic well-being." Welfare here means well-being, not government aid.</p>
<p>It starts with an idea from Lesson 6: every buyer has a maximum price. That maximum is the buyer's ${dt('willingness-to-pay','<b>willingness to pay</b>')}. Your course textbook: "the demand curve traces consumers' willingness to pay for different quantities." The height of the demand curve at each unit is what someone would pay for it.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>You walk into a store ready to pay $40 for a jacket and find it on the rack for $25. That little thrill of a good deal is the feeling this lesson measures: $15 you were willing to give up but didn't have to. Sellers feel the same when a buyer pays more than they needed.</p></div>
<div data-check="l11c-wtp"></div>

<h2>Consumer surplus</h2>
<!-- src: MS2 (video 2.3: water $2.50; max $5 → $2.50; max $2 → no; price $1.50 → $3.50 and $0.50; area below D above price; slides 104-105); OS35 (definition, tablets $80, J $90). Source problem: slide 105 shows $1 for the $2 buyer at $1.50; the video's $0.50 is correct. -->
<p>${dt('consumer-surplus','<b>Consumer surplus</b>')} is willingness to pay minus the price actually paid. On a graph, it is the area <b>below the demand curve and above the price</b>, out to the quantity bought.</p>
<p><b>Worked example: your course's water at a summer concert.</b> It's hot, you've been there all day, and a bottle costs $2.50.</p>
<div class="math">Fan willing to pay $5.00: buys; consumer surplus = $5.00 − $2.50 = <b>$2.50</b><br>Fan willing to pay $2.00: $2.00 &lt; $2.50, so doesn't buy; consumer surplus = $0</div>
<p>Now the price falls to $1.50:</p>
<div class="math">$5.00 fan: $5.00 − $1.50 = <b>$3.50</b> (up $1.00)<br>$2.00 fan: now buys; $2.00 − $1.50 = <b>$0.50</b></div>
<p>Check: both changes point the same way. A lower price raises consumer surplus for buyers already in the market and brings in new buyers who now gain something. (Your course's slide shows $1 for the second fan; the video's $0.50 is right.)</p>
<p><b>Math refresher: triangle areas.</b> With a straight-line demand curve, consumer surplus is a triangle: area = ½ × base × height. <b>Made-up numbers:</b> demand starts at $10, the price is $6 and 40 units are bought. Base 40, height $10 − $6 = $4:</p>
<div class="math">Consumer surplus = ½ × 40 × $4 = <b>$80</b></div>
<div data-check="l11c-cs,l11c-cs2"></div>

<h2>Producer surplus</h2>
<!-- src: MS2 (video 2.3: vendors A $3.00, B $2.75, C $2.00; price $2.25 → C $0.25; $3.50 → $0.50, $0.75, $1.50; area below price above supply; slides 106-110); OS35 (definition, point K $45) -->
<p>${dt('producer-surplus','<b>Producer surplus</b>')} is the price a seller receives minus the lowest price it would accept, which reflects its cost. On a graph, it is the area <b>above the supply curve and below the price</b>, out to the quantity sold.</p>
<p><b>Worked example: your course's three water vendors.</b></p>
${table(['Vendor','A','B','C'],[['Lowest price accepted','$3.00','$2.75','$2.00'],['Producer surplus at $2.25','does not sell','does not sell','$0.25'],['Producer surplus at $3.50','$0.50','$0.75','$1.50']])}
<div class="math">At $2.25: only C sells → total producer surplus = <b>$0.25</b><br>At $3.50: $0.50 + $0.75 + $1.50 = <b>$2.75</b></div>
<p>Check: a higher price raises producer surplus two ways, just as a lower price raised consumer surplus: C gains more per bottle, and A and B, who couldn't cover costs at $2.25, now sell.</p>
<p>Notice what producer surplus is <b>not</b>: it isn't revenue. C's revenue at $2.25 is $2.25, but its surplus is only $0.25, because $2.00 of that was needed to cover costs.</p>
<div data-check="l11c-ps"></div>

<h2>Total surplus</h2>
<!-- src: MS2 (video 2.3: total surplus = CS + PS = value to buyers − cost to sellers, derivation; slide 111); OS35 (social surplus F + G, also economic or total surplus) -->
<p>${dt('total-surplus','<b>Total surplus</b>')} (your course textbook also calls it social or economic surplus) adds the two:</p>
<div class="math">Total surplus = consumer surplus + producer surplus<br>= (willingness to pay − price) + (price − seller's cost)<br>= <b>value to buyers − cost to sellers</b></div>
<p><b>Why the price drops out:</b> every dollar the buyer pays is a dollar the seller receives. The price decides how the gains are <b>split</b>, not how big they are. The gains themselves come from moving a good from someone who values it less (the seller, who'd part with it for its cost) to someone who values it more.</p>
<p>Try it with a small concert market. Buyers' values include your course's $5 and $2 fans and sellers' minimums include its vendors C, B and A; the other buyers and sellers are made-up. Move the price, then try selling a fourth bottle:</p>
<div data-widget="surplus"></div>
<p>Notice: total surplus is largest, $4.75, when exactly 3 bottles change hands, which happens at any price from $3.00 to $3.50. Within that range the price only moves surplus between buyers and sellers. At your course's $2.50, only one vendor will sell, so the ${dt('shortage','shortage')} lowers total surplus; forcing a fourth sale shrinks it too.</p>
<div data-check="l11c-total"></div>

<h2>Why equilibrium is efficient</h2>
<!-- src: MS2 (video 2.3 and slides 112-114: buyers who value most, sellers with lowest cost; "maximized total surplus"); OS35 ("Social surplus is larger at equilibrium quantity and price than it would be at any other quantity"; "impossible to produce greater consumer surplus without reducing producer surplus"; price controls transfer surplus); CED (MKT-4.A.5 "maximizes total economic surplus in the absence of market failures"). Source problem: video 2.3 and slide 112 say equilibrium maximizes both consumer and producer surplus; only the total is maximized. -->
<p>Your course textbook: "Social surplus is larger at equilibrium quantity and price than it would be at any other quantity. This demonstrates the economic efficiency of the market equilibrium."</p>
<p><b>The mechanism, unit by unit.</b></p>
<ul><li><b>Up to the ${dt('equilibrium','equilibrium')} quantity</b>, the ${dt('demand-curve','demand curve')} is above the supply curve: each unit is worth more to some buyer than it costs some seller. Trading it adds surplus. Your course: goods go to "buyers who value them most highly" and come from "sellers who can produce them at the lowest cost."</li>
<li><b>Beyond the equilibrium quantity</b>, the supply curve is above the demand curve: each extra unit costs more to make than anyone values it. Producing it would <b>subtract</b> from total surplus.</li></ul>
<p>So the equilibrium quantity is exactly where adding units stops paying. This is Lesson 5's marginal rule, MB ≥ MC, applied to a whole market: the demand curve is the marginal benefit, the supply curve the marginal cost.</p>
<p class="small muted"><b>A correction to your course.</b> Slide 112 says equilibrium "maximizes both consumer and producer surplus," and the video says "we are maximizing consumer surplus and we are maximizing the area of producer surplus." Only the <b>total</b> is maximized. A ${dt('price-ceiling','price ceiling')} below equilibrium could hand buyers more surplus and a ${dt('price-floor','price floor')} above it could hand sellers more, but both would shrink the total. Your course textbook: "at the efficient level of output, it is impossible to produce greater consumer surplus without reducing producer surplus." The AP framework puts it the same way: equilibrium "maximizes total economic surplus in the absence of market failures." (Your course's own summary slide says "maximized total surplus," which is the accurate version.)</p>
<p>"In the absence of market failures" matters: Unit 7 covers cases, like pollution, where the market's equilibrium isn't efficient.</p>
<div data-check="l11c-eff"></div>

<h2>Read the surplus areas</h2>
<!-- src: MS2; OS35. Exam skill: identifying consumer surplus, producer surplus and total surplus on a graph. -->
<p>CLEP graph questions label areas with letters and ask which is which. Anchor on the price line: consumer surplus sits above it (up to demand), producer surplus below it (down to supply), and only to the <b>left</b> of the quantity actually traded.</p>
<div data-widget="areas"></div>
<div data-check="l11c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L11TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Consumer surplus is what buyers pay."</span>What buyers pay is spending. Consumer surplus is the extra value beyond it: willingness to pay minus price.</li>
<li><span class="wrong">"Equilibrium gives buyers and sellers each their largest possible surplus."</span>Equilibrium maximizes the total. A different price could raise one side's surplus, but only by shrinking the other side's more.</li>
<li><span class="wrong">"Producer surplus is the seller's revenue."</span>It's the price minus the lowest price the seller would accept (its cost). Vendor C at $2.25 has $0.25 of surplus, not $2.25.</li>
<li><span class="wrong">"A lower price lowers consumer surplus."</span>It raises it: current buyers pay less, and new buyers join. It lowers producer surplus.</li>
<li><span class="wrong">"Producing more is always better."</span>Beyond the equilibrium quantity, extra units cost more than they're worth, so total surplus falls.</li>
<li><span class="wrong">"Consumer surplus is the same as a surplus in the market."</span>A market surplus is unsold goods (Lesson 7). Consumer surplus is buyers' gain from trading.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>Welfare economics measures well-being with surplus. The demand curve shows buyers' <b>willingness to pay</b>.</li>
<li><b>Consumer surplus</b> = willingness to pay − price: the area below demand and above the price. A lower price raises it.</li>
<li><b>Producer surplus</b> = price − the lowest acceptable price: the area above supply and below the price. A higher price raises it.</li>
<li><b>Total surplus</b> = value to buyers − cost to sellers; the price only splits it.</li>
<li>At equilibrium, total surplus is as large as possible: every unit worth more than it costs is traded and none worth less. That is ${dt('efficiency','<b>efficiency</b>')}, and it's the total, not each part, that is maximized.</li>
<li>On graphs, find the price line and the traded quantity, then read consumer surplus above the price and producer surplus below it.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Consumer surplus, producer surplus, and market efficiency" under Supply and Demand (15% to 20% of the exam). Expect graphs with lettered areas, short calculations from willingness-to-pay tables, and questions on why equilibrium is efficient.</p>
</div>`,
  deeper:`
<h3>Efficiency is not fairness</h3>
<p>Your course textbook defines efficiency as a situation where "it is impossible to improve the situation of one party without imposing a cost on another." That is a statement about the size of the total, not about who gets it. A market can be efficient while some people can't afford what they need, which is why Unit 7 discusses income distribution separately. Efficiency and fairness are different questions, and people weigh them differently.</p>
<h3>Demand and supply as a social mechanism</h3>
<p>The textbook's example: when frost hits Brazil's coffee crop, the price rises; "some people ... continue to drink coffee and pay the higher price. Others switch to tea." No commission decides who drinks coffee. The surplus framework explains why that outcome uses the remaining coffee where it is valued most.</p>`,
  links:[ {k:'Textbook',t:'3.5 Demand, Supply, and Efficiency',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/3-5-demand-supply-and-efficiency',w:'The newer edition of your course textbook\'s §3.5: surplus, efficiency and why price controls lose surplus.'},
          {k:'Video',t:'Consumer Surplus',s:'Marginal Revolution University',u:'https://learn.mru.org/lessons/consumer-surplus',w:'A short video explanation of consumer surplus and the demand curve as willingness to pay.'} ]
});
