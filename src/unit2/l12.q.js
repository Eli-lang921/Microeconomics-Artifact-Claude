/* ===== Lesson 12: Taxes: Incidence and Deadweight Loss (Modern States video 2.4) =====
   Common mistakes: M1 whoever writes the check bears the tax · M2 a tax is always split equally
   M3 tax revenue is the deadweight loss · M4 the more inelastic side pays less · M5 a tax hurts only buyers
   M6 a price ceiling or floor that helps one side has no deadweight loss */
mc('l12-wedge','l12','A $1 tax per unit is placed on a market. Which of the following describes the <b>tax wedge</b>?',
  [`The price buyers pay minus the price sellers keep, which equals the $1 tax`,`The $1 added to the equilibrium price, all paid by buyers`,`The drop in quantity caused by the tax`,`The tax revenue the government collects`,`The difference between the old and new equilibrium price`],0,
  `<p>Your course: "the tax creates a wedge between the price paid by the buyer and the price received by the seller." Tax = P<sub>B</sub> − P<sub>S</sub>. The buyer's price rises above the old equilibrium and the seller's falls below it.</p><p>The tempting "all paid by buyers" assumes the price rises by the full tax. Usually it rises by only part of it.</p>`);
mc('l12-socks','l12','In your course\'s sock market, the equilibrium is $5 a pair and 300 pairs. A $1 tax is placed on sellers, and quantity falls to 200. Your course splits the burden equally. What do buyers pay and sellers keep per pair?',
  [`Buyers pay $5.50; sellers keep $4.50`,`Buyers pay $6.00; sellers keep $5.00`,`Buyers pay $5.00; sellers keep $4.00`,`Buyers pay $5.50; sellers keep $5.50`,`Buyers pay $6.00; sellers keep $4.00`],0,
  `<p>The wedge is $1: P<sub>B</sub> − P<sub>S</sub> = $5.50 − $4.50. Buyers pay $0.50 more than $5 and sellers keep $0.50 less. (An equal split happens when demand and supply are equally elastic; that's an assumption of this example, not a rule.)</p><p>The tempting "$6.00 / $5.00" assumes sellers pass the whole tax on; "$5.00 / $4.00" assumes sellers absorb it all because the tax is "on sellers."</p>`);
mc('l12-rev','l12','In your course\'s sock example ($1 tax; quantity falls from 300 to 200), how much tax revenue does the government collect?',
  [`$200`,`$300`,`$100`,`$1,100`,`$50`],0,
  `<p>Tax revenue = tax × quantity sold <b>with</b> the tax = $1 × 200 = <b>$200</b> (your course).</p><p>Tempting wrong answers: $300 uses the old quantity, which no longer sells; $100 is the drop in quantity; $1,100 is what buyers spend ($5.50 × 200); $50 is the deadweight loss in this lesson's made-up curves.</p>`);
tf('l12-tf-who','l12','If a tax is collected from sellers, sellers bear the whole burden of the tax.',false,
  `<p>False. Your course: "it doesn't matter who pays the tax, the buyer or the seller ... they will both share the burden." Sellers who hand $1 to the government raise their price, so part of the tax lands on buyers. How much depends on elasticity, not on who writes the check.</p>`);
gen('l12-g-burden','l12',()=>{
  const pe=pick([4,5,8,10]), t=pick([1,2,3]), bs=pick([0.25,0.5,0.75]); const pb=round(pe+t*bs,2), ps=round(pb-t,2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. Before a tax, the equilibrium price is ${money(pe)}. After a ${money(t)} per-unit tax, buyers pay ${money(pb)} and sellers keep ${money(ps)}. How much of the tax, per unit, do <b>sellers</b> bear?`,
    answer:round(pe-ps,2), unit:'dollars',
    explain:`<p>Sellers' burden = old price − price they keep = ${money(pe)} − ${money(ps)} = <b>${money(pe-ps)}</b>. Buyers' burden = ${money(pb)} − ${money(pe)} = ${money(pb-pe)}. Check: ${money(pe-ps)} + ${money(pb-pe)} = ${money(t)}, the whole tax.</p><p>The common slip is answering ${money(t)} because the tax is "on sellers," or using the buyers' price instead of the old equilibrium price.</p>` };
});
mc('l12-inelastic','l12','Demand for a good is much more <b>inelastic</b> than supply. A per-unit tax is imposed. Who bears more of the tax?',
  [`Buyers, because they keep buying even at a higher price`,`Sellers, because they must send the tax to the government`,`Sellers, because inelastic demand means buyers refuse to pay more`,`They always split it equally`,`Neither; the government bears it`],0,
  `<p>Your course textbook: "If demand is more inelastic than supply, consumers bear most of the tax burden." Buyers who can't easily cut back can't escape the higher price, so sellers can pass most of the tax on. The textbook: "the tax burden falls on the most inelastic side of the market."</p><p>The tempting third choice flips the meaning of inelastic: inelastic buyers are the ones who <b>don't</b> respond much to a higher price.</p>`);
tf('l12-tf-equal','l12','A tax is always shared equally between buyers and sellers.',false,
  `<p>False. Your course's video says the tax "will be equally levied on both," and its sock example splits it 50/50, but later the same video explains that "the tax burden is going to depend on the elasticity." An equal split happens only when demand and supply are equally elastic. The more inelastic side bears more.</p>`);
mc('l12-dwl-def','l12','Which of the following is <b>deadweight loss</b>?',
  [`The total surplus lost because a market trades less than the efficient quantity`,`The tax revenue the government collects`,`The consumer surplus buyers lose from paying a higher price`,`The goods left unsold after a tax`,`The tax burden that falls on sellers`],0,
  `<p>Your course: deadweight loss is "the loss in surplus to society when there's a distortion in the market." Your course textbook: "The loss in social surplus that occurs when the economy produces at an inefficient quantity." It's the surplus from trades that would have happened but no longer do.</p><p>The tempting "tax revenue" is surplus moved to the government, not lost. Lost consumer surplus is partly revenue and partly deadweight loss.</p>`);
gen('l12-g-dwl','l12',()=>{
  const qe=pick([100,300,500]), drop=pick([20,40,50,100].filter(d=>d<qe)), t=pick([1,2,4]); const ans=0.5*t*drop;
  return { type:'num', kind:'num', prompt:`Made-up numbers, straight-line demand and supply. A ${money(t)} per-unit tax reduces the quantity sold from ${qe} to ${qe-drop}. What is the deadweight loss?`,
    answer:ans, unit:'dollars',
    explain:`<p>Deadweight loss is the triangle between the curves from the new quantity to the old one. Base: the lost units, ${qe} − ${qe-drop} = ${drop}. Height: the tax wedge, ${money(t)}.</p><p>DWL = ½ × ${drop} × ${money(t)} = <b>${money(ans)}</b>. The common slips: forgetting the ½ (${money(2*ans)}), or multiplying the tax by the new quantity, which gives tax revenue (${money(t*(qe-drop))}).</p>` };
});
lazy('l12-gr-areas','l12',()=>({ type:'mc', kind:'graph',
  prompt:`A per-unit tax of $4 opens a wedge between the price buyers pay ($7) and the price sellers keep ($3). The old equilibrium is E.${sdg({xmax:10,ymax:10,xt:[0,3,5,10],yt:[0,3,5,7,10],areas:[{pts:[[0,10],[0,7],[3,7]],c:'var(--accent-soft)',label:[0.9,7.8,'J']},{pts:[[0,7],[3,7],[3,3],[0,3]],c:'var(--surface-2)',label:[1.5,5,'K']},{pts:[[0,3],[3,3],[0,0]],c:'var(--ok-soft)',label:[0.9,2.0,'L']},{pts:[[3,7],[5,5],[3,3]],c:'var(--bad-soft)',label:[3.7,5,'M']}],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,0],b:[10,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:7,c:'var(--muted)'},{p:3,c:'var(--muted)'}],dots:[{q:5,p:5,label:'E'}]})}Which area is the <b>deadweight loss</b>?`,
  options:[`Area M`,`Area K`,`Area J`,`Areas K and M`,`Area L`], answer:0,
  explain:`<p>Deadweight loss is the triangle between the curves from the taxed quantity (3) to the old equilibrium (5): area M. Those units were worth more to buyers than they cost sellers, but the tax stops them from being traded.</p><p>K is tax revenue (tax × quantity sold), surplus moved to the government, not lost. J is consumer surplus and L producer surplus after the tax.</p>` }));
tf('l12-tf-rev','l12','The tax revenue the government collects is part of the deadweight loss.',false,
  `<p>False. Revenue is surplus <b>transferred</b> from buyers and sellers to the government, which your course says pays for "public education, national defense, infrastructure." Deadweight loss is surplus that no one gets, from trades that no longer happen. Total surplus after the tax = consumer surplus + producer surplus + revenue, and deadweight loss is what's missing.</p>`);
mc('l12-cs-ps','l12','According to your course, what happens to consumer surplus and producer surplus when a tax is imposed?',
  [`Both fall`,`Consumer surplus falls; producer surplus is unchanged`,`Producer surplus falls; consumer surplus is unchanged`,`Both rise, because of the government\'s spending`,`Consumer surplus falls and producer surplus rises`],0,
  `<p>Your course: buyers and sellers "are both a little bit worse off because the price for buyers rises and the price for sellers falls." Consumer surplus shrinks (higher price, fewer units) and producer surplus shrinks (lower price kept, fewer units).</p><p>The tempting "only consumer surplus falls" treats the tax as if it only raised the buyers' price.</p>`);
/* L12 more */
mc('l12-why','l12','If taxes create deadweight loss, why does your course say we have them?',
  [`The revenue pays for public goods, such as national defense and roads, that the market on its own wouldn\'t provide`,`Taxes increase total surplus in every market`,`Taxes have no effect on quantity`,`Taxes raise producer surplus`,`Deadweight loss is a gain to the government`],0,
  `<p>Your course: "the benefit comes from the gain in government tax revenue," which provides "public goods, goods that the market if it was left up to its own devices wouldn't provide, such as public education, national defense, infrastructure." Whether a particular tax is worth its deadweight loss is a judgment the model can inform but not settle. Unit 7 covers public goods.</p>`);
mc('l12-cig','l12','Your course textbook reports that a 10% rise in cigarette prices cuts adult smoking by about 3% (elasticity about 0.3). Supply is more elastic. Who bears most of a cigarette tax?',
  [`Smokers (buyers), because their demand is inelastic`,`Cigarette companies, because the tax is collected from them`,`Smokers and companies split it equally`,`Cigarette companies, because demand is inelastic`,`The government`],0,
  `<p>Your course textbook: cigarette taxes "are mainly passed along to consumers in the form of higher prices," because "the tax burden falls on the most inelastic side of the market." Addicted smokers keep buying, so sellers can raise prices without losing many sales.</p>`);
mc('l12-beach','l12','Your course textbook\'s example: beachfront hotels can\'t easily move or be built elsewhere, while tourists have other vacation choices. A tax on hotel rooms there falls mostly on whom?',
  [`Hotel owners, because supply is more inelastic than demand`,`Tourists, because they pay the hotel bill`,`Tourists, because demand is elastic`,`Split equally`,`No one, because quantity doesn\'t change`],0,
  `<p>The textbook: when "sellers have no alternative than to accept lower prices for their business ... The tax burden is now passed on to the sellers." Elastic demand means tourists walk away from higher prices, so the price can't rise much; the inelastic hotels absorb the tax.</p>`);
gen('l12-g-rev','l12',()=>{
  const t=pick([0.5,1,2,3]), q=pick([150,400,1200]);
  return { type:'num', kind:'num', prompt:`Made-up numbers. A ${money(t)} per-unit tax is placed on a market. Before the tax, ${q+100} units sold; after it, ${q}. Buyers now pay ${money(10+t/2)}. How much tax revenue does the government collect?`,
    answer:t*q, unit:'dollars',
    explain:`<p>Revenue = tax × quantity sold with the tax = ${money(t)} × ${q} = <b>${money(t*q)}</b>.</p><p>The common slips are using the pre-tax quantity (${money(t*(q+100))}) or the buyers' price instead of the tax (${money((10+t/2)*q)}, which is what buyers spend).</p>` };
});
lazy('l12-gr-incidence','l12',()=>({ type:'mc', kind:'graph',
  prompt:`A $3 per-unit tax is placed on this market. Before the tax, the price was $6 (point E).${sdg({xmax:8,ymax:14,xt:[0,3,4,8],yt:[0,5,8,14],lines:[{a:[1,12],b:[7,0],label:'D'},{a:[0,2],b:[8,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:8,c:'var(--muted)'},{p:5,c:'var(--muted)'}],labels:[[0.15,8.4,'buyers $8','var(--muted)','start'],[7.9,5.5,'sellers $5','var(--muted)','end']],dots:[{q:4,p:6,label:'E'}]})}Which statement is correct?`,
  options:[`Buyers bear $2 of the tax and sellers $1, because demand is more inelastic than supply`,`Sellers bear $2 and buyers $1, because sellers send the tax to the government`,`Each side bears $1.50`,`Buyers bear the full $3`,`Sellers bear $2 and buyers $1, because demand is more inelastic`], answer:0,
  explain:`<p>Buyers: $8 − $6 = $2. Sellers: $6 − $5 = $1. The steep demand curve means quantity demanded barely responds to price, so most of the tax shows up as a higher price for buyers. Your course: "if the demand curve is relatively inelastic or more inelastic than supply then the buyer has the bigger tax burden."</p><p>The last choice has the right reason but the wrong side.</p>` }));
mc('l12-ceiling','l12','Your course textbook\'s drug example: a price ceiling of $400 (below the $600 equilibrium) cuts quantity from 20,000 to 15,000. Which of the following is true?',
  [`Some producer surplus moves to consumers, and there is also deadweight loss`,`Consumers gain and no surplus is lost`,`Producers gain at consumers\' expense`,`Quantity rises, so total surplus rises`,`There is deadweight loss but no transfer`],0,
  `<p>The textbook: "the price ceiling transfers the area of surplus (V) from producers to consumers," and the drop to 15,000 creates deadweight loss "like money thrown away that benefits no one." Buyers who still get the drug pay less, but 5,000 doses worth more than their cost are no longer made.</p>`);
tf('l12-tf-ceiling','l12','A price ceiling that helps the buyers who still get the good creates no deadweight loss.',false,
  `<p>False. Your course textbook: "both price floors and price ceilings block some transactions that buyers and sellers would have been willing to make, and creates deadweight loss." A transfer to some buyers doesn't make up for the trades that no longer happen.</p>`);
mc('l12-floor','l12','Your course textbook\'s movie theaters: the equilibrium is $8 a ticket and 1,800 tickets. A price floor of $12 is set, and quantity demanded falls to 1,400. Which is true?',
  [`Some consumer surplus moves to theaters, and 400 tickets worth more than they cost are no longer sold`,`Theaters gain and total surplus rises`,`Moviegoers gain because theaters stay open`,`There is no deadweight loss because the price is higher`,`Quantity supplied falls to 1,400 because the price is higher`],0,
  `<p>The textbook: "the price floor causes the area H to be transferred from consumer to producer surplus, but also causes a deadweight loss of J + K." The 400 lost tickets are the source of the deadweight loss.</p><p>The last choice gets the floor backwards: a higher price raises quantity <b>supplied</b>; it's quantity <b>demanded</b> that falls to 1,400.</p>`);
mc('l12-quota','l12','Lesson 8\'s made-up orange market (demand Qd = 60 − 10P, supply Qs = 10P) has an equilibrium of $3 and 30. A quota limits sales to 20; buyers then pay $4, while the 20th unit costs sellers only $2. What is the deadweight loss of the quota?',
  [`$10`,`$20`,`$40`,`$5`,`$80`],0,
  `<p>Deadweight loss = ½ × lost units × the gap between buyers' value and sellers' cost at the limit = ½ × (30 − 20) × ($4 − $2) = <b>$10</b>. Quotas, like taxes, open a wedge between what buyers pay and what it costs to supply.</p><p>The tempting $20 forgets the ½.</p>`);
mc('l12-revenue-el','l12','A government wants a tax that raises a lot of revenue with little deadweight loss. Based on your course textbook, which market is the better target?',
  [`One where demand and supply are both inelastic`,`One where demand and supply are both very elastic`,`One with elastic demand and elastic supply, because quantity responds`,`It doesn\'t matter; every $1 tax raises the same revenue`,`One where many close substitutes exist`],0,
  `<p>Your course textbook: "The more elastic the demand and supply curves are, the lower the tax revenue," because buyers and sellers escape the tax by trading less. When quantity barely falls, revenue stays high and few trades are lost, so deadweight loss is small.</p><p>Whether that makes the tax fair is a separate question: inelastic goods are often necessities.</p>`);
mc('l12-dwl-why','l12','Why does a tax create deadweight loss?',
  [`Some trades that are worth more to buyers than they cost sellers stop happening because of the tax wedge`,`The government wastes the revenue`,`Buyers pay more than sellers receive, and that difference disappears`,`Sellers stop producing completely`,`The price rises by more than the tax`],0,
  `<p>Your course: deadweight loss comes from "the fact that we can't reach the equilibrium point." Between the taxed quantity and the old equilibrium, buyers value each unit above its cost, but not by enough to cover the tax too, so those units aren't traded.</p><p>The tempting third choice describes tax revenue, which doesn't disappear; it goes to the government.</p>`);
mc('l12-statutory','l12','Version 1: a $1 tax on bicycles is collected from sellers. Version 2: the same $1 tax is collected from buyers at the register. Assume nothing else differs. How do the outcomes compare?',
  [`The same: buyers pay the same total, sellers keep the same amount, and the same quantity sells`,`Buyers bear more in version 2`,`Sellers bear more in version 1`,`Quantity falls only in version 1`,`Only version 2 creates deadweight loss`],0,
  `<p>Your course's slide: "Regardless of who pays the tax (sellers or buyers) both share the tax burden." The wedge is the same $1 either way, so the split depends only on the elasticities. In version 1 the posted price rises; in version 2 the posted price falls and buyers add the tax. Both end at the same buyer price, seller price and quantity.</p>`);
mc('l12-equal-why','l12','In your course\'s sock example, buyers and sellers each bear $0.50 of the $1 tax. What does that tell you?',
  [`In this example, demand and supply are about equally elastic`,`Every tax is split equally`,`The tax was collected from both sides`,`Demand is perfectly inelastic`,`Supply is perfectly elastic`],0,
  `<p>Your course: "If we have equal elasticities in demand and supply then we're going to have an equal sharing of the tax burden." The sock example assumes that case. Change the elasticities and the split changes.</p>`);
gen('l12-g-square','l12',()=>{
  const t=pick([0.5,1,1.5,2]); const ans=50*t*t;
  return { type:'num', kind:'num', prompt:`Made-up sock curves that match your course's example: demand Q = 1,300 − 200P and supply Q = 200P − 700 (equilibrium $5 and 300). A tax of ${money(t)} per pair lowers quantity by 100 pairs for each $1 of tax, to ${300-100*t}. What is the deadweight loss?`,
    answer:ans, unit:'dollars',
    explain:`<p>Lost units: 300 − ${300-100*t} = ${100*t}. Height: the tax, ${money(t)}. DWL = ½ × ${100*t} × ${money(t)} = <b>${money(ans)}</b>.</p><p>Notice the pattern: the tax shows up in both the base and the height, so deadweight loss grows with the <b>square</b> of the tax: $0.50 → $12.50, $1 → $50, $2 → $200. Doubling the tax quadruples the loss.</p>` };
});
mc('l12-double','l12','With straight-line demand and supply, a $1 tax causes $50 of deadweight loss. If the tax rises to $2, roughly what happens to deadweight loss?',
  [`It about quadruples, to $200`,`It doubles, to $100`,`It stays $50`,`It falls, because less is sold`,`It rises by $1`],0,
  `<p>A bigger tax both blocks more trades (a wider base) and opens a taller wedge, so the deadweight-loss triangle grows in both directions. Econlib's David Henderson shows that deadweight loss is proportional to the square of the tax rate. Twice the tax gives about four times the loss.</p><p>The tempting "doubles" treats deadweight loss like revenue. Revenue doesn't even double here, since less sells.</p>`);
mc('l12-total','l12','Using this lesson\'s made-up sock curves: before the $1 tax, consumer surplus is $225 and producer surplus is $225. After it, consumer surplus is $100, producer surplus is $100 and tax revenue is $200. What is the deadweight loss?',
  [`$50`,`$250`,`$450`,`$200`,`$0`],0,
  `<p>Before: $225 + $225 = $450. After: $100 + $100 + $200 = $400. Deadweight loss = $450 − $400 = <b>$50</b>, the same as ½ × 100 lost pairs × $1.</p><p>The tempting $250 forgets to count the $200 of revenue, which isn't lost; it goes to the government.</p>`);

/* ===== Lesson 12 quick checks ===== */
mc('l12c-wedge','l12','Before a tax, coffee sells for $3.00 a cup. After a $0.40 tax, buyers pay $3.30. What do sellers keep per cup?',
  [`$2.90`,`$2.60`,`$3.00`,`$3.30`,`$3.70`],0,
  `<p>Sellers keep the buyers' price minus the tax: $3.30 − $0.40 = <b>$2.90</b>. Buyers bear $0.30 of the tax and sellers $0.10.</p>`);
mc('l12c-rev','l12','A $2 tax per concert ticket cuts sales from 10,000 to 9,000. How much revenue does it raise?',
  [`$18,000`,`$20,000`,`$2,000`,`$1,000`,`$9,000`],0,
  `<p>Tax × quantity sold with the tax: $2 × 9,000 = <b>$18,000</b>. The 1,000 tickets that are no longer sold raise nothing.</p>`);
mc('l12c-surplus','l12','After a tax, which group ends up with surplus that buyers and sellers lost?',
  [`The government, through tax revenue; the rest is deadweight loss that no one gets`,`Sellers, through higher prices`,`Buyers, through lower prices`,`No one; all of it is deadweight loss`,`The government gets all of it`],0,
  `<p>Part of what buyers and sellers lose becomes tax revenue (a transfer). The rest, from trades that no longer happen, is deadweight loss.</p>`);
mc('l12c-elastic','l12','Demand for a city\'s parking spaces is elastic (drivers can take the bus), but the number of spaces is fixed. A parking tax falls mostly on whom?',
  [`Owners of the parking spaces, because supply is perfectly inelastic`,`Drivers, because they pay at the meter`,`Drivers, because demand is elastic`,`Split equally`,`No one`],0,
  `<p>The more inelastic side bears more. A fixed number of spaces can't respond to price, while drivers can switch to the bus, so owners absorb most of the tax, like your course textbook's beachfront hotels.</p>`);
mc('l12c-dwl','l12','A tax cuts the quantity of movie tickets from 1,000 to 900, and the tax is $3 per ticket. With straight-line curves, what is the deadweight loss?',
  [`$150`,`$300`,`$2,700`,`$3,000`,`$100`],0,
  `<p>½ × (1,000 − 900) × $3 = <b>$150</b>. $300 forgets the ½; $2,700 is revenue ($3 × 900).</p>`);
mc('l12c-controls','l12','Which of the following create deadweight loss in an otherwise competitive market?',
  [`A binding price ceiling, a binding price floor, a quota and a per-unit tax`,`Only taxes`,`Only price floors`,`Only policies that hurt consumers`,`None, because surplus is just transferred`],0,
  `<p>Each one keeps the quantity below the equilibrium, so trades worth more than they cost stop happening. Your course textbook: price floors and ceilings "block some transactions that buyers and sellers would have been willing to make, and creates deadweight loss."</p>`);
mc('l12c-skill','l12','A tax graph shows demand steep and supply flat. Without numbers, what can you predict?',
  [`Buyers bear more of the tax, and quantity falls only a little`,`Sellers bear more of the tax, and quantity falls a lot`,`The tax is split equally`,`There is no deadweight loss`,`Buyers bear more, and quantity falls a lot`],0,
  `<p>Steep demand means inelastic demand: buyers keep buying, so the buyers' price rises by most of the tax and quantity barely falls. The small drop in quantity also means a small deadweight loss.</p>`);

mc('l12c-why','l12','According to your course, what is the main benefit of a tax that offsets the losses it causes buyers and sellers?',
  [`The revenue, which can pay for public goods such as roads and national defense`,`Higher consumer surplus`,`Higher producer surplus`,`A larger quantity sold`,`The deadweight loss`],0,
  `<p>Your course: "the benefit comes from the gain in government tax revenue," used for public goods the market wouldn't provide on its own. A tax lowers consumer surplus, producer surplus and the quantity sold, and deadweight loss is a cost, not a benefit.</p>`);

/* Course materials checked 2026-10-22: video 2.4 transcript, Module 2 slides 115-130, course textbook §5.3 (elasticity and tax incidence) and §3.5 (deadweight loss of controls).
   Source problems noted in the lesson: "equally levied on both" (burden depends on elasticity); slide 122 labels the seller price "Pb = $4.50" (should be Ps). */
const L12TAGS = {
  'l12-wedge':['MS2 OS53','tax','terms','M2'], 'l12-socks':['MS2','tax','data','M1 M2'], 'l12-rev':['MS2','tax','data','M3'],
  'l12-tf-who':['MS2 OS53','tax','terms','M1'], 'l12-g-burden':['MS2 OS53','tax','data','M1'], 'l12-inelastic':['OS53 MS2','tax','models','M4'],
  'l12-tf-equal':['MS2 OS53','tax','terms','M2'], 'l12-dwl-def':['MS2 OS35','tax','terms','M3'], 'l12-g-dwl':['MS2 OS35','tax','data','M3'],
  'l12-gr-areas':['MS2 OS53','tax','graphs','M3'], 'l12-tf-rev':['MS2','tax','terms','M3'], 'l12-cs-ps':['MS2','tax','models','M5'],
  'l12-why':['MS2','tax','models',''], 'l12-cig':['OS53','tax','models','M1 M4'], 'l12-beach':['OS53','tax','models','M4'],
  'l12-g-rev':['MS2','tax','data','M3'], 'l12-gr-incidence':['MS2 OS53','tax','graphs','M4'], 'l12-ceiling':['OS35','tax','models','M6'],
  'l12-tf-ceiling':['OS35','tax','terms','M6'], 'l12-floor':['OS35','tax','models','M6'], 'l12-quota':['OS35 CED','tax','data','M6'],
  'l12-revenue-el':['OS53','tax','models','M4'], 'l12-dwl-why':['MS2 OS35','tax','models','M3'], 'l12-statutory':['MS2 OS53','tax','models','M1'],
  'l12-equal-why':['MS2','tax','models','M2'], 'l12-g-square':['MS2 ELDW','tax','data','M3'], 'l12-double':['ELDW','tax','models','M3'],
  'l12-total':['MS2','tax','data','M3'],
  'l12c-wedge':['MS2 OS53','tax','data','M1'], 'l12c-rev':['MS2','tax','data','M3'], 'l12c-surplus':['MS2 OS35','tax','terms','M3'],
  'l12c-elastic':['OS53','tax','models','M4'], 'l12c-dwl':['MS2 OS35','tax','data','M3'], 'l12c-controls':['OS35 CED','tax','models','M6'], 'l12c-skill':['OS53 MS2','tax','graphs','M4'], 'l12c-why':['MS2','tax','models','M3 M5']
};
u2tag(L12TAGS);

U2_CARDS.l12 = [
  ['Tax wedge','What is the tax wedge?','The gap a per-unit tax opens between the price buyers pay (P<sub>B</sub>) and the price sellers keep (P<sub>S</sub>). Tax = P<sub>B</sub> − P<sub>S</sub>.','Socks: $5.50 − $4.50 = the $1 tax (your course).','The wedge equals the whole tax; buyers\' price rises by only part of it.'],
  ['Tax revenue','How do you calculate tax revenue?','Tax per unit × quantity sold <b>with</b> the tax.','$1 × 200 pairs of socks = $200 (your course).','Use the taxed quantity, not the old one.'],
  ['Tax incidence','What is tax incidence, and how do you measure each side\'s share?','How the burden of a tax is split. Buyers\' share = P<sub>B</sub> − old price; sellers\' share = old price − P<sub>S</sub>. The two add to the tax.','Socks: buyers $5.50 − $5 = $0.50; sellers $5 − $4.50 = $0.50.','Measure each side\'s share from the old equilibrium price, not from the other side\'s price.'],
  ['Who writes the check','Does it matter whether a tax is collected from buyers or sellers?','No. The wedge is the same either way, so the split of the burden is the same. Only elasticity decides it.','A $1 tax on bicycles gives the same prices and quantity whether the store or the shopper hands it over.','"The tax is on sellers" doesn\'t mean sellers bear it.'],
  ['Elasticity and incidence','Which side bears more of a tax?','The more inelastic side. If demand is more inelastic than supply, buyers bear more; if supply is more inelastic, sellers do. Equal elasticities split it equally.','Cigarettes (inelastic demand): mostly smokers. Beachfront hotels (inelastic supply): mostly owners (your course textbook).','Inelastic means unresponsive, so it can\'t dodge the tax.'],
  ['Effects of a tax on surplus','What happens to consumer surplus, producer surplus and total surplus when a tax is imposed?','Consumer surplus and producer surplus both fall. Part of the loss becomes tax revenue; the rest is deadweight loss, so total surplus falls.','Made-up socks: CS $225 → $100, PS $225 → $100, revenue $200, DWL $50.','Count the revenue before finding deadweight loss; revenue is moved, not lost.'],
  ['Deadweight loss','What is deadweight loss, and where is it on a graph?','The total surplus lost when a market trades less (or more) than the efficient quantity. On a tax graph: the triangle between demand and supply from the taxed quantity to the old equilibrium.','½ × 100 lost pairs × $1 tax = $50.','Tax revenue is not deadweight loss; it\'s a transfer.'],
  ['Calculating deadweight loss','How do you calculate deadweight loss with straight-line curves?','½ × (lost units) × (the wedge between buyers\' value and sellers\' cost at the new quantity, which equals the tax).','A $3 tax cuts tickets from 1,000 to 900: ½ × 100 × $3 = $150.','Don\'t forget the ½.'],
  ['Deadweight loss of controls','Do price ceilings, floors and quotas create deadweight loss?','Yes. Each blocks trades buyers and sellers would both have wanted. They also move surplus from one side to the other.','Drug ceiling $400 vs $600: surplus moves to buyers, and 5,000 lost doses create deadweight loss (your course textbook).','Helping one side doesn\'t mean no surplus is lost.'],
  ['Elasticity and tax revenue','How does elasticity affect a tax\'s revenue and deadweight loss?','The more elastic demand and supply are, the more quantity falls: less revenue and more deadweight loss. Inelastic markets raise more revenue with less deadweight loss.','Your course textbook: "The more elastic the demand and supply curves are, the lower the tax revenue."','Inelastic markets raise more revenue, but those goods are often necessities; that\'s a fairness question the model doesn\'t settle.'],
  ['Why tax?','Why do governments tax if taxes create deadweight loss?','The revenue funds public goods the market wouldn\'t provide on its own, such as national defense, roads and public education (your course). The model shows the cost; whether it\'s worth it is a judgment.','Your course: "the benefit comes from the gain in government tax revenue."','The model shows a tax\'s cost; whether the revenue is worth it is a judgment.']
];

Object.assign(U2_WRITE, {
  'w-l12-1':{lesson:'l12',prompt:'Use your course\'s sock example ($5 and 300 pairs; a $1 tax on sellers; 200 pairs after) to explain what a tax does to prices, quantity, tax revenue and total surplus.',
    model:'The tax opens a $1 wedge between what buyers pay and what sellers keep. In the course\'s example buyers pay $5.50 and sellers keep $4.50, so each side bears $0.50 even though sellers hand over the tax. The higher buyer price and lower seller price cut the quantity from 300 to 200. The government collects $1 × 200 = $200. Consumer surplus and producer surplus both fall; part of what they lose becomes the $200 of revenue, which can fund public goods. The rest is deadweight loss: the 100 pairs that buyers valued above their cost but no longer trade. So total surplus falls.',
    checklist:['Names the wedge: buyers pay $5.50, sellers keep $4.50, difference $1','Says quantity falls from 300 to 200 because of the wedge','Calculates revenue as $1 × 200 = $200','Explains that CS and PS fall, revenue is a transfer, and the lost trades are deadweight loss']},
  'w-l12-2':{lesson:'l12',prompt:'Your course\'s video says it "doesn\'t matter who pays the tax," and also that "the tax burden is going to depend on the elasticity." Explain both claims, with an example of each side bearing more.',
    model:'It doesn\'t matter who writes the check because the tax opens the same wedge between the buyer\'s price and the seller\'s price either way, so the prices and quantity end up the same. What decides the split is elasticity: the more inelastic side can\'t easily change how much it buys or sells, so it absorbs more of the tax. Cigarette demand is inelastic because smokers are addicted, so most of a cigarette tax shows up as higher prices for smokers. Beachfront hotels can\'t move or expand, so their supply is inelastic and tourists have other options; a hotel tax falls mostly on the owners. Only when the two sides are equally elastic is the burden split equally, as in the course\'s sock example.',
    checklist:['Explains that the statutory payer doesn\'t change the outcome (same wedge)','States that the more inelastic side bears more of the tax','Gives an example where buyers bear more (inelastic demand)','Gives an example where sellers bear more (inelastic supply)']}
});

U2_PLAN.l12 = {
  core:['l12-wedge','l12-socks','l12-rev','l12-tf-who','l12-g-burden','l12-inelastic','l12-tf-equal','l12-dwl-def','l12-g-dwl','l12-gr-areas','l12-tf-rev','l12-cs-ps'],
  more:['l12-why','l12-cig','l12-beach','l12-g-rev','l12-gr-incidence','l12-ceiling','l12-tf-ceiling','l12-floor','l12-quota','l12-revenue-el','l12-dwl-why','l12-statutory','l12-equal-why','l12-g-square','l12-double','l12-total']
};

U2_LESSONS.push({ id:'l12', unit:2, title:'Taxes: Incidence and Deadweight Loss', mins:45, src:'Modern States video 2.4 and Module 2 slides 115-130 · Course textbook (OpenStax) §5.3 and §3.5',
  sources:['MS2','OS53','OS35','CB','CED','ELDW'],
  oneline:'A tax drives a wedge between what buyers pay and what sellers keep. Elasticity decides who bears it, and the trades it blocks are a loss to society called deadweight loss.',
  body:`
<h2>The tax wedge</h2>
<!-- Order follows video 2.4: wedge and "doesn't matter who pays", revenue, why tax (public goods), surplus and deadweight loss, then elasticity and the burden. The price-control section (course textbook §3.5) and the graph-reading skill are additions placed after the course's material. -->
<!-- src: MS2 (video 2.4: wedge, Pb − Ps, socks $5/300, $1 tax on sellers, $5.50/$4.50, 200; slides 116-122); OS53 (excise tax wedge between Pc and Pp). Source problem: slide 122 labels the seller price "Pb = $4.50"; it should read Ps. -->
<p>Lesson 11 showed that ${dt('equilibrium','equilibrium')} makes ${dt('total-surplus','total surplus')} as large as possible. Lesson 8's price controls pushed the market away from it. A tax does the same thing in a different way: it makes the price buyers pay differ from the price sellers keep.</p>
<p>Your course: "the tax creates a wedge between the price paid by the buyer and the price received by the seller." That gap is the ${dt('tax-wedge','<b>tax wedge</b>')}:</p>
<div class="math">Tax = P<sub>B</sub> − P<sub>S</sub> &nbsp;(P<sub>B</sub> = price buyers pay, P<sub>S</sub> = price sellers keep)</div>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a toll booth on the only bridge between a farm town and a city. Farmers must now get a higher price in the city to make the trip worth it, and city buyers pay more than before. Some trips that used to be worth making no longer are. The toll is the wedge; the trips not taken are the loss.</p></div>
<p><b>Worked example: your course's sock market.</b> Before the tax: $5 a pair, 300 pairs. The government imposes a $1 tax, collected from sellers, and the quantity sold falls to 200.</p>
<div class="math">Buyers pay P<sub>B</sub> = <b>$5.50</b> (up $0.50)<br>Sellers keep P<sub>S</sub> = <b>$4.50</b> (down $0.50)<br>Wedge: $5.50 − $4.50 = <b>$1</b>, the tax</div>
${FIG.l12wedge()}
<p>Check: buyers' change plus sellers' change, $0.50 + $0.50, equals the $1 tax. (Your course's slide labels the sellers' price "P<sub>b</sub> = $4.50"; it should read P<sub>s</sub>.)</p>
<p>Your course adds right away: "it doesn't matter who pays the tax, the buyer or the seller." Here the sellers hand the $1 to the government, yet buyers still pay $0.50 of it through the higher price. Who bears how much is the last part of this lesson.</p>
<p>Why does quantity fall? At $5.50 buyers want fewer than 300 pairs (law of demand) and at $4.50 sellers offer fewer (law of supply). The market settles where they agree: 200.</p>
<div data-check="l12c-wedge"></div>

<h2>Tax revenue</h2>
<!-- src: MS2 (video 2.4: "we take the size of the tax and we multiply this by the quantity ... once we have the tax"; $200; slide 123) -->
<div class="math">Tax revenue = tax × quantity sold with the tax = $1 × 200 = <b>$200</b></div>
<p>On a graph, revenue is the rectangle between P<sub>B</sub> and P<sub>S</sub>, out to the taxed quantity. Use the <b>new</b> quantity: the 100 pairs that are no longer sold raise nothing.</p>
${FIG.l12revenue()}
<div data-check="l12c-rev"></div>

<h2>Why tax at all?</h2>
<!-- src: MS2 (video 2.4 and slide 130: revenue funds public goods: public education, national defense, roads; "Since taxes cause distortions ... they yield inefficient market outcomes. Why do we have them?"). -->
<p>Buyers now pay more and sellers keep less, so both are worse off; the next section measures by how much. Your course pauses here to ask why we tax at all: "the benefit comes from the gain in government tax revenue," which pays for ${dt('public-goods','public goods')}, "goods that the market if it was left up to its own devices wouldn't provide, such as public education, national defense, infrastructure." The supply and demand model measures a tax's cost; whether a given tax is worth that cost depends on what the revenue buys, which is a judgment the model alone can't make. Unit 7 returns to public goods.</p>
<div data-check="l12c-why"></div>

<h2>Deadweight loss</h2>
<!-- src: MS2 (video 2.4: CS falls, PS falls, revenue, "Deadweight loss is going to be the loss in surplus to society when there's a distortion in the market"; slides 124-128, 130); OS35 (deadweight loss definition, "like money thrown away that benefits no one"); ELDW (DWL proportional to t²). Made-up sock curves: D: Q = 1,300 − 200P; S: Q = 200P − 700. -->
<p>Now the cost. Your course compares the market before and after the tax: ${dt('consumer-surplus','consumer surplus')} falls, ${dt('producer-surplus','producer surplus')} falls, and the government gains revenue. What's missing is ${dt('deadweight-loss','<b>deadweight loss</b>')}: "the loss in surplus to society when there's a distortion in the market." Your course textbook calls it "like money thrown away that benefits no one."</p>
<p><b>Worked example: socks with made-up straight-line curves</b> that match your course's numbers (demand Q = 1,300 − 200P, supply Q = 200P − 700; demand reaches zero at $6.50, supply at $3.50).</p>
${table(['','Before the tax','After the $1 tax'],[['Consumer surplus','½ × 300 × ($6.50 − $5) = $225','½ × 200 × ($6.50 − $5.50) = $100'],['Producer surplus','½ × 300 × ($5 − $3.50) = $225','½ × 200 × ($4.50 − $3.50) = $100'],['Tax revenue','$0','$1 × 200 = $200'],['Total','<b>$450</b>','<b>$400</b>']])}
<div class="math">Deadweight loss = $450 − $400 = <b>$50</b><br>Check with the triangle: ½ × (300 − 200) × $1 = $50</div>
${FIG.l12areas()}
<p>Where does the $50 come from? Pairs 201 to 300 were worth more to buyers than they cost sellers, but not by more than the $1 tax, so they stop being traded. The revenue isn't lost; it moves to the government. The deadweight loss is surplus nobody gets.</p>
<div data-check="l12c-surplus,l12c-dwl"></div>

<h2>Who bears the tax</h2>
<!-- src: MS2 (video 2.4: "it doesn't matter who pays the tax"; "the tax burden is going to depend on the elasticity"; equal / demand more inelastic → buyer / supply more inelastic → seller; slide 119); OS53 ("tax incidence"; "the tax burden falls on the most inelastic side of the market"; cigarettes 0.3; beachfront hotels; "The more elastic the demand and supply curves are, the lower the tax revenue"). Source problem: the video says the tax "will be equally levied on both of them"; the burden is equal only when elasticities are equal, as the video itself explains later. -->
<p>${dt('tax-incidence','<b>Tax incidence</b>')} is how the burden of a tax is split between buyers and sellers. Two rules:</p>
<ol><li><b>Who writes the check doesn't matter.</b> Your course: "it doesn't matter who pays the tax, the buyer or the seller." A tax collected from sellers or from buyers opens the same $1 wedge, so prices and quantity end up the same.</li>
<li><b>Elasticity decides the split.</b> Your course textbook: "the tax burden falls on the most inelastic side of the market."</li></ol>
<div class="math">Buyers' burden = P<sub>B</sub> − old price &nbsp;&nbsp; Sellers' burden = old price − P<sub>S</sub></div>
<p><b>The mechanism.</b> A side that can't easily change how much it buys or sells (${dt('inelastic','inelastic')}) can't dodge the tax by trading less, so the price moves against it. A side with good alternatives (${dt('elastic','elastic')}) walks away instead, and the price can't move much against it.</p>
<ul><li><b>Inelastic demand → buyers bear more.</b> Your course textbook: a 10% rise in cigarette prices cuts adult smoking by only about 3%, so cigarette taxes "are mainly passed along to consumers in the form of higher prices."</li>
<li><b>Inelastic supply → sellers bear more.</b> The textbook's beachfront hotels can't move, while tourists have other vacation choices, so "the tax burden is now passed on to the sellers."</li>
<li><b>Equal elasticities → an equal split</b>, which is what your course's sock example assumes.</li></ul>
<p class="small muted"><b>A note on your course's wording.</b> The video first says "The tax will be equally levied on both of them so they will both share the burden of the tax," and its sock example splits the tax 50/50. Both sides usually share it, but equally only when the elasticities match; later the same video says "the tax burden is going to depend on the elasticity." On the exam, use the elasticity rule.</p>
<p>Try it. The default is your course's sock market (with made-up curves that match its numbers); switch the elasticity and move the tax:</p>
<div data-widget="taxlab"></div>
<p>Notice: with either inelastic side, quantity falls less, so the same $1 tax raises more revenue ($260 instead of $200) and causes less deadweight loss ($20 instead of $50). Your course textbook: "The more elastic the demand and supply curves are, the lower the tax revenue."</p>
<div data-check="l12c-elastic"></div>

<h2>Deadweight loss from price controls</h2>
<!-- src: OS35 (Figure 3.24: drug ceiling $600/20,000 → $400/15,000, transfer V, DWL U + W; theater floor $8/1,800 → $12/1,400, transfer H, DWL J + K; "both price floors and price ceilings block some transactions"); CED (POL-1.A: price controls and quotas create deadweight loss); Lesson 8 quota numbers. -->
<p>Any policy that holds quantity below the equilibrium creates deadweight loss, even one that helps one side.</p>
<ul><li><b>${dt('price-ceiling','Price ceiling')}.</b> Your course textbook's drug: a $400 ceiling (equilibrium $600) cuts quantity from 20,000 to 15,000. Some producer surplus moves to the buyers who still get the drug, and the 5,000 lost doses are deadweight loss.</li>
<li><b>${dt('price-floor','Price floor')}.</b> The textbook's movie theaters: a $12 floor (equilibrium $8) cuts tickets from 1,800 to 1,400. Some consumer surplus moves to theaters, and the 400 lost tickets are deadweight loss.</li>
<li><b>Quota.</b> Lesson 8's orange quota of 20 (equilibrium 30): buyers pay $4 while the 20th unit costs sellers $2. Deadweight loss = ½ × 10 × ($4 − $2) = <b>$10</b>.</li></ul>
${FIG.l12controls()}
<p>Your course textbook: price floors and ceilings "block some transactions that buyers and sellers would have been willing to make, and creates deadweight loss." That's why each side favors the control that transfers surplus to it, and why economists count the cost to everyone.</p>
<div data-check="l12c-controls"></div>

<h2>Read a tax graph</h2>
<!-- src: MS2; OS53. Exam skill: predict incidence from the slopes (steeper = more inelastic) and the facts of a market. -->
<p>CLEP questions often show a tax graph or describe a market and ask who bears more. On a graph, compare slopes at the equilibrium: the <b>steeper</b> curve is the more inelastic side and bears more. In words, ask which side has fewer alternatives.</p>
${FIG.l12incidence()}
<div data-widget="burden"></div>
<div data-check="l12c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L12TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Whoever pays the tax to the government bears it."</span>The wedge is the same whoever writes the check. Elasticity decides who bears it.</li>
<li><span class="wrong">"A tax is always split equally."</span>Only when demand and supply are equally elastic, as in your course's sock example.</li>
<li><span class="wrong">"Tax revenue is the deadweight loss."</span>Revenue is a transfer to the government. Deadweight loss is surplus nobody gets, from trades that stop happening.</li>
<li><span class="wrong">"The more inelastic side pays less, because it doesn't respond."</span>Backwards: not responding means it can't escape, so it bears more.</li>
<li><span class="wrong">"A tax only hurts buyers."</span>Buyers pay more and sellers keep less, so consumer surplus and producer surplus both fall.</li>
<li><span class="wrong">"A ceiling that helps buyers has no deadweight loss."</span>Ceilings, floors and quotas all block trades worth more than they cost; the transfer to one side doesn't make up for that.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A per-unit tax opens a <b>wedge</b>: tax = P<sub>B</sub> − P<sub>S</sub>. Buyers pay more, sellers keep less and quantity falls.</li>
<li><b>Tax revenue</b> = tax × quantity sold with the tax.</li>
<li><b>Tax incidence</b>: who writes the check doesn't matter; the more inelastic side bears more. Equal elasticities split it equally.</li>
<li>Consumer and producer surplus both fall. Part becomes revenue; the rest is <b>deadweight loss</b>, from trades that no longer happen. With straight lines, DWL = ½ × lost units × tax.</li>
<li>Price ceilings, floors and quotas also create deadweight loss, while moving surplus from one side to the other.</li>
<li>More elastic markets: less revenue and more deadweight loss for the same tax.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Tax incidence and deadweight loss" under Supply and Demand (15% to 20% of the exam). Expect graphs with a tax wedge and lettered areas, questions on who bears a tax given elasticities, and short calculations of revenue and deadweight loss.</p>
</div>`,
  deeper:`
<h3>Deadweight loss grows with the square of the tax</h3>
<p>In the sock model, a tax of t dollars cuts quantity by 100t pairs, so deadweight loss = ½ × 100t × t = 50t²: $12.50 at $0.50, $50 at $1, $200 at $2. Econlib's David Henderson makes the same point about income taxes: deadweight loss is proportional to the square of the tax rate. That's one reason economists often prefer several small taxes on a broad base to one large tax on a narrow one.</p>
<h3>Taxing a good with an elastic side</h3>
<p>Your course textbook notes a trade-off in cigarette taxes: an inelastic demand means a tax raises a lot of revenue but doesn't cut smoking much, while a tax that "discourages consumption by quite a lot" raises little revenue. A government can't get the most revenue and the biggest drop in use from the same tax; which goal matters more is a policy choice.</p>`,
  links:[ {k:'Textbook',t:'5.3 Elasticity and Pricing',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/5-3-elasticity-and-pricing',w:'The newer edition of your course textbook\'s §5.3, with the section "Elasticity and Tax Incidence" and its two-panel graph.'},
          {k:'Video',t:'Who Pays the Tax?',s:'Marginal Revolution University',u:'https://learn.mru.org/lessons/tax-burden-elasticity-affordable-care-act-health-insurance-mandate',w:'A short video on how elasticity decides who bears a tax.'},
          {k:'Article',t:'Deadweight Loss Computations',s:'David R. Henderson, Econlib',u:'https://www.econlib.org/deadweight-loss-computations/',w:'A brief worked example of why deadweight loss rises faster than the tax rate.'} ]
});
