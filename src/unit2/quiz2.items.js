/* ===== Unit 2 quiz: 20 items (blueprint in unit2-notes.md) =====
   Blueprint by CLEP outline topic: Equilibrium 3 · Determinants 3 · Price and quantity controls 3 · PED and its determinants 2
   PED and total revenue 2 · PES 1 · Income elasticity 1 · Cross-price elasticity 1 · Surplus and efficiency 2 · Tax incidence 1 · Deadweight loss 1.
   Graph or data items: q2-eq-1, q2-ctl-2, q2-ped-1, q2-tr-2, q2-inc, q2-xpe, q2-cs-1, q2-dwl (8).
   Every item is new (not in practice), five choices, distractors built from each lesson's Common mistakes (tag 4 = mistake ids).
   Answers, correctness and explanations appear only after the whole quiz is submitted (quiz2.render.js). */

qz2('q2-eq-1','l7',`Use the graph.${sdg({xmax:10,ymax:10,xt:[0,2,4,6,10],yt:[0,6,8,10],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,2],b:[8,10],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:8,c:'var(--muted)'}],dots:[{q:4,p:6,label:'E'}]})}If the price is $8, which of the following describes the market?`,
  [`A surplus of 4 units, so the price will tend to fall`,`A shortage of 4 units, so the price will tend to rise`,`A surplus of 6 units, so the price will tend to fall`,`A shortage of 2 units, so the price will tend to fall`,`The market is in equilibrium`],0,
  `<p>At $8, read across to each curve: quantity demanded is 2 and quantity supplied is 6. Supply exceeds demand by 4, a <b>surplus</b> (excess supply), and sellers cut prices toward the $6 equilibrium.</p><p>The tempting "shortage" is Lesson 7's M1: above the equilibrium price there's too much, not too little. "A surplus of 6" reads only the supply curve.</p>`);
qz2('q2-eq-2','l7','A popular new phone model raises demand for phone cases. At the same time, cheaper plastic lowers the cost of making them. What happens in the market for phone cases?',
  [`Quantity rises; the effect on price can\'t be determined without knowing the sizes of the shifts`,`Price and quantity both rise`,`Price falls and quantity rises`,`Price rises; the effect on quantity can\'t be determined`,`Price and quantity both stay the same, because the shifts cancel`],0,
  `<p>Demand shifts right (pushes price up, quantity up). Supply shifts right (pushes price down, quantity up). Both push quantity up, so it rises. They push price in opposite directions, so the price change is <b>indeterminate</b> without the sizes.</p><p>The tempting "both rise" ignores the supply shift (Lesson 7's M4). "The shifts cancel" assumes equal sizes.</p>`);
qz2('q2-eq-3','l7','A drought cuts the wheat harvest. What happens in the market for bread, other things equal?',
  [`Supply of bread decreases: price rises and quantity falls`,`Demand for bread decreases because bread costs more: price and quantity fall`,`Supply of bread decreases: price and quantity both fall`,`Demand for bread increases: price and quantity rise`,`Nothing, because the drought affects wheat, not bread`],0,
  `<p>Wheat is an input to bread. A higher input price raises the cost of making bread, so supply shifts left: a higher price and a smaller quantity.</p><p>The tempting "demand decreases because bread costs more" is Lesson 7's M2: the higher price moves buyers <b>along</b> the demand curve; it doesn't shift it.</p>`);

qz2('q2-det-1','l6','Which of the following would cause a <b>movement along</b> the demand curve for movie tickets, rather than a shift of it?',
  [`A rise in the price of movie tickets`,`A rise in consumers\' incomes`,`A fall in the price of streaming subscriptions`,`A popular actor starring in a new release`,`An increase in the town\'s population`],0,
  `<p>Only a change in the good's <b>own price</b> moves buyers along its demand curve (a change in quantity demanded). Every other choice is a determinant of demand (income, a related good, tastes, number of buyers) and shifts the whole curve.</p><p>This is Lesson 6's M1 and M2: own price changes quantity demanded, not demand.</p>`);
qz2('q2-det-2','l6','Incomes in a city rise. Store-brand pasta is an inferior good there. What happens to the demand for store-brand pasta?',
  [`It decreases: the demand curve shifts left`,`It increases: the demand curve shifts right`,`Quantity demanded falls, but demand doesn\'t change`,`It doesn\'t change, because pasta prices didn\'t change`,`Supply decreases`],0,
  `<p>For an <b>inferior good</b>, higher income lowers demand: people switch to brands they now prefer. The whole curve shifts left.</p><p>The tempting "it increases" is Lesson 6's M3 (more income always means more demand), which is true only for normal goods. "Quantity demanded falls" confuses a shift with a movement (M2).</p>`);
qz2('q2-det-3','l6','Rideshare companies raise their prices sharply. What happens in the market for taxi rides?',
  [`Demand for taxi rides increases, because rideshares and taxis are substitutes`,`Demand for taxi rides decreases, because rideshares and taxis are complements`,`The quantity of taxi rides demanded rises, but the demand curve for taxis doesn\'t shift`,`Demand for taxi rides doesn\'t change, because taxi fares didn\'t change`,`The supply of taxi rides decreases`],0,
  `<p>Rideshares and taxis do the same job: they're <b>substitutes</b>. When one gets pricier, some riders switch to the other, so demand for taxi rides shifts right.</p><p>"Complements" is Lesson 6's M4: related goods don't all move the same way. Because it's another good's price that changed, the taxi demand curve shifts; it isn't a movement along it (M1).</p>`);

qz2('q2-ctl-1','l8','A city sets the maximum rent for apartments below the market equilibrium rent. What is the most likely result?',
  [`A shortage: more people want apartments than landlords offer at the capped rent`,`A surplus of empty apartments`,`No change, because rents were already at equilibrium`,`The supply curve of apartments shifts right`,`Every renter in the city is better off`],0,
  `<p>A <b>binding price ceiling</b> holds the price below equilibrium: quantity demanded rises and quantity supplied falls, so there's a shortage.</p><p>Distractors: a surplus comes from a floor above equilibrium (Lesson 8's M2); controls move the market along the curves rather than shifting them (M3); and renters who can't find an apartment aren't helped (M4).</p>`);
qz2('q2-ctl-2','l8',`Made-up market for a crop:${table(['Price','$4','$5','$6','$7','$8'],[['Quantity demanded','60','50','40','30','20'],['Quantity supplied','20','30','40','50','60']])}The government sets a price floor of $7. What happens?`,
  [`A surplus of 20 units`,`A shortage of 20 units`,`A surplus of 10 units`,`A surplus of 50 units`,`Nothing, because the floor is above the equilibrium price`],0,
  `<p>Equilibrium is $6 (40 demanded, 40 supplied). The $7 floor is above it, so it binds: quantity demanded falls to 30, quantity supplied rises to 50, leaving a surplus of 50 − 30 = <b>20</b>.</p><p>"A shortage" is Lesson 8's M2. "Nothing" has the binding rule backwards: a floor binds when it's <b>above</b> equilibrium. 50 is quantity supplied, not the surplus.</p>`);
qz2('q2-ctl-3','l8','The equilibrium wage for lifeguards in a town is $18 an hour. The state sets a minimum wage of $15 an hour. What happens in the lifeguard market?',
  [`Nothing: the floor is below the equilibrium wage, so it doesn\'t bind`,`A surplus of lifeguards (unemployment) appears`,`A shortage of lifeguards appears`,`The wage falls to $15`,`Demand for lifeguards shifts left`],0,
  `<p>A price floor only matters if it's above the equilibrium. At $15, employers already pay more ($18), so the floor is <b>non-binding</b>.</p><p>The tempting "surplus of lifeguards" assumes every minimum wage causes unemployment in every job (Lesson 8's M5). "A shortage" mixes up floors and ceilings.</p>`);

qz2('q2-ped-1','l9','The price of a concert poster rises from $8 to $12, and the quantity demanded falls from 110 to 90. Using the midpoint method, what is the price elasticity of demand (absolute value), and how is demand described?',
  [`0.5, inelastic`,`2.0, elastic`,`0.36, inelastic`,`0.5, elastic`,`1.0, unit elastic`],0,
  `<p>%Δ quantity = (90 − 110) ÷ 100 = −20%. %Δ price = (12 − 8) ÷ 10 = 40%. Elasticity = 20% ÷ 40% = <b>0.5</b>, below 1, so demand is <b>inelastic</b>.</p><p>Tempting wrong answers: 2.0 divides price by quantity (upside down); 0.36 uses the starting values instead of midpoints (18.2% ÷ 50%); "0.5, elastic" is Lesson 9's M5 (elastic means above 1, not below).</p>`);
qz2('q2-ped-2','l9','Which of the following changes would make the demand for a good <b>more elastic</b>?',
  [`A close substitute becomes available at a similar price`,`The good becomes more of a necessity for buyers`,`Buyers have less time to adjust to a price change`,`The good takes up a smaller share of buyers\' budgets`,`The supply curve becomes flatter`],0,
  `<p>More and closer substitutes give buyers somewhere to go when the price rises, so quantity demanded responds more: demand becomes <b>more elastic</b>.</p><p>The other demand-side choices push the opposite way: necessities (Lesson 9's M4), less time to adjust (M6) and a smaller budget share all make demand <b>less</b> elastic. The supply curve's slope doesn't change the elasticity of demand.</p>`);

qz2('q2-tr-1','l9','A ski resort cuts its lift-ticket price by 10%, and its total ticket revenue falls. What does this tell you about demand for its tickets in this price range?',
  [`Demand is inelastic: tickets sold rose by less than 10%`,`Demand is elastic: tickets sold rose by more than 10%`,`Demand is unit elastic`,`The demand curve shifted left`,`A lower price always lowers revenue, so it tells you nothing`],0,
  `<p>Revenue = price × quantity. If a 10% price cut <b>lowers</b> revenue, the quantity sold must have risen by less than 10%: demand is <b>inelastic</b>. (With elastic demand the price cut would have raised revenue; with unit elastic demand revenue wouldn't change.)</p><p>"A lower price always lowers revenue" is Lesson 9's M3 run backwards: the direction depends on elasticity.</p>`);
qz2('q2-tr-2','l9','Made-up demand for a game download: quantity = 200 − 20 × price. The seller cuts the price from $8 to $7. What happens to total revenue, and what does that show?',
  [`It rises from $320 to $420, so demand is elastic in this price range`,`It falls from $420 to $320, so demand is inelastic in this range`,`It rises from $320 to $420, so demand is inelastic in this range`,`It stays at $320, so demand is unit elastic`,`It falls, because the price fell`],0,
  `<p>At $8: quantity 200 − 160 = 40, revenue $8 × 40 = $320. At $7: quantity 60, revenue $7 × 60 = $420. A price cut that <b>raises</b> revenue means demand is <b>elastic</b> here (high prices sit on the elastic upper part of a straight demand line).</p><p>"It falls, because the price fell" ignores the 50% jump in quantity (Lesson 9's M3).</p>`);

qz2('q2-pes','l9','Which of the following best explains why the supply of fresh strawberries is more elastic over two years than over two weeks?',
  [`Over two years, farmers can plant more fields and new growers can enter; in two weeks they can only sell what is already growing`,`Over two years, buyers find more substitutes for strawberries`,`Strawberries are a luxury in the long run`,`The supply curve gets steeper over time`,`Elasticity of supply is the same in the short run and the long run`],0,
  `<p>Price elasticity of supply depends on how easily sellers can change production. Given time, farmers expand acreage and new growers enter, so quantity supplied responds much more to price.</p><p>"Buyers find substitutes" describes demand, not supply. "The same in short and long run" is Lesson 9's M6; the curve gets <b>flatter</b> (more elastic) over time, not steeper.</p>`);

qz2('q2-inc','l10','When average incomes rise 10%, purchases of used cars fall 5%. What is the income elasticity of demand for used cars, and what kind of good are they here?',
  [`−0.5; an inferior good`,`0.5; a normal good`,`−2.0; an inferior good`,`−0.5; a low-quality good, so a normal good`,`0.5; an inferior good, because the elasticity is below 1`],0,
  `<p>Income elasticity = %Δ quantity ÷ %Δ income = −5% ÷ 10% = <b>−0.5</b>. A negative sign means buyers purchase less as income rises: an <b>inferior good</b>.</p><p>"Inferior" is about the sign, not quality (Lesson 10's M1). −2.0 divides upside down. "Below 1 means inferior" mixes up the size and the sign (M4, M5).</p>`);
qz2('q2-xpe','l10','The price of butter rises 20%, and the quantity of margarine demanded rises 10%. What is the cross-price elasticity, and how are the goods related?',
  [`+0.5; substitutes`,`−0.5; complements`,`+0.5; complements`,`+2.0; substitutes`,`About zero; unrelated`],0,
  `<p>Cross-price elasticity = %Δ quantity of margarine ÷ %Δ price of butter = 10% ÷ 20% = <b>+0.5</b>. Positive: when one gets pricier, buyers switch to the other, so they're <b>substitutes</b>.</p><p>"+0.5; complements" is Lesson 10's M2 reversed: complements have a <b>negative</b> sign. +2.0 puts the price on the top (M3).</p>`);

qz2('q2-cs-1','l11',`Use the graph. The market is in equilibrium at E.${sdg({xmax:10,ymax:10,xt:[0,4,10],yt:[0,4,6,10],lines:[{a:[0,10],b:[10,0],label:'D'},{a:[0,4],b:[10,9],label:'S',c:'var(--g1)',lx:-6,ly:14,anchor:'end'}],hl:[{p:6,c:'var(--muted)'}],dots:[{q:4,p:6,label:'E'}]})}What is the producer surplus?`,
  [`$4`,`$8`,`$12`,`$24`,`$16`],0,
  `<p>Producer surplus is the triangle above the supply curve and below the $6 price, out to the quantity of 4. Supply starts at $4, so the height is $6 − $4 = $2. Area = ½ × 4 × $2 = <b>$4</b>.</p><p>Tempting wrong answers: $8 is consumer surplus (½ × 4 × $4); $12 is total surplus; $24 is revenue ($6 × 4), Lesson 11's M3 (producer surplus = revenue); $16 forgets the ½ on consumer surplus.</p>`);
qz2('q2-cs-2','l11','Which statement about a competitive market at equilibrium, with no market failures, is correct?',
  [`Total surplus is as large as possible`,`Consumer surplus and producer surplus are each as large as possible`,`Every buyer who wants the good gets it`,`Producing more than the equilibrium quantity would raise total surplus`,`Consumer surplus equals what buyers pay`],0,
  `<p>Equilibrium maximizes <b>total</b> surplus: every unit worth more to a buyer than it costs a seller is traded, and no unit worth less.</p><p>"Each as large as possible" is Lesson 11's M2: a ceiling could raise consumer surplus, but total surplus would fall. Buyers who value the good below the price don't buy it (Lesson 7's M5). Producing more lowers total surplus (M5).</p>`);

qz2('q2-tax','l12','A city puts a tax on apartment rentals, collected from tenants with their rent. In the short run the number of apartments is fixed, while tenants can move to nearby towns. Who bears most of the tax?',
  [`Landlords, because supply is the more inelastic side`,`Tenants, because they hand the tax to the city`,`Tenants, because demand is elastic`,`They split it equally`,`Neither, because the tax is passed on to the city`],0,
  `<p>The more <b>inelastic</b> side bears more. A fixed number of apartments can't respond to price, while tenants can leave, so rents (before tax) fall and landlords absorb most of the tax.</p><p>"Tenants, because they hand the tax over" is Lesson 12's M1: who writes the check doesn't decide the burden. "Split equally" is M2.</p>`);
qz2('q2-dwl','l12','A $2 per-unit tax reduces the quantity sold in a market from 500 to 400 (straight-line demand and supply). What are the tax revenue and the deadweight loss?',
  [`Revenue $800; deadweight loss $100`,`Revenue $1,000; deadweight loss $100`,`Revenue $800; deadweight loss $200`,`Revenue $800; no deadweight loss, because the revenue funds public goods`,`Revenue $200; deadweight loss $800`],0,
  `<p>Revenue = tax × quantity with the tax = $2 × 400 = <b>$800</b>. Deadweight loss = ½ × lost units × tax = ½ × 100 × $2 = <b>$100</b>.</p><p>Tempting wrong answers: $1,000 uses the old quantity; $200 forgets the ½; "no deadweight loss" treats the revenue as making up for lost trades (Lesson 12's M3); the last choice swaps revenue and deadweight loss.</p>`);

Object.assign(Q['q2-eq-1'],{kind:'graph'}); Object.assign(Q['q2-cs-1'],{kind:'graph'});
['q2-ctl-2','q2-ped-1','q2-tr-2','q2-inc','q2-xpe','q2-dwl'].forEach(id => { Q[id].kind = 'num'; });
u2tag({
  'q2-eq-1':['MS2 OS33','eq','graphs','M1'], 'q2-eq-2':['MS2 OS33','eq','models','M4'], 'q2-eq-3':['OS33 MS2','eq','models','M2'],
  'q2-det-1':['MS2 OS31','det','terms','M1 M2'], 'q2-det-2':['MS2 OS32','det','models','M3 M2'], 'q2-det-3':['MS2 OS32','det','models','M4 M1'],
  'q2-ctl-1':['MS2 OS34','ctl','models','M2 M3 M4'], 'q2-ctl-2':['MS2 OS34','ctl','data','M2'], 'q2-ctl-3':['MS2 OS34','ctl','models','M5'],
  'q2-ped-1':['MS2 OS51','ped','data','M5'], 'q2-ped-2':['MS2 OS53','ped','models','M4 M6'],
  'q2-tr-1':['MS2 OS53','tr','models','M3'], 'q2-tr-2':['MS2 OS53','tr','data','M3'],
  'q2-pes':['MS2 OS53 CED','pes','models','M6'],
  'q2-inc':['MS2 OS54','inc','data','M1 M4 M5'], 'q2-xpe':['MS2 OS54','xpe','data','M2 M3'],
  'q2-cs-1':['MS2 OS35','cs','graphs','M3'], 'q2-cs-2':['OS35 CED','cs','models','M2 M5'],
  'q2-tax':['MS2 OS53','tax','models','M1 M2'], 'q2-dwl':['MS2 OS35','tax','data','M3']
});
