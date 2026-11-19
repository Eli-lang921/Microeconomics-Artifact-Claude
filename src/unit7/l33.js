/* ===== Lesson 33 figures ===== */
/* Your course textbook's refrigerator market (§12.1, Table 12.2): price, quantity demanded, quantity supplied before and after the $100 pollution cost.
   Straight lines through the table: Qd = 110,000 − 100P; Qs private = 100P − 20,000; Qs social = 100P − 30,000.
   Market: $650, 45,000. With the $100 external cost: $700, 40,000. Deadweight loss = ½ × $100 × 5,000 = $250,000 (my calculation from the table's straight lines). */
const FR_P = [600,650,700,750,800,850,900], FR_D = [50,45,40,35,30,25,20], FR_SP = [40,45,50,55,60,65,70], FR_SS = [30,35,40,45,50,55,60];
/* Your course textbook's trumpet player (§12.1 Work It Out, Table 12.3): price, songs demanded, songs supplied without and with the externality cost.
   Lines through the table: demand P = 20 − 2Q; private supply P = 2Q; social supply P = 2Q + 4, so the external cost is $4 a song (my reading of the table). */
const TR_P = [20,18,15,12,10,5], TR_D = [0,1,2.5,4,5,7.5], TR_SP = [10,9,7.5,6,5,2.5], TR_SS = [8,7,5.5,4,3,0.5];
/* Your course textbook's Big Drug Company (§13.1, Table 13.1): rate of return, private and social demand for financial capital ($ millions). */
const BD_R = [2,4,6,8,10], BD_P = [72,52,38,30,26], BD_S = [84,72,62,52,44];

/* L33 V1: the three parties (textbook §12.1 concert example; video 7.1 definition) */
FIG7.l33who = () => fig(`<div class="u3pair">
  <div class="u3card"><p class="u3h">Inside the deal</p><p><b>Seller:</b> the concert producer</p><p><b>Buyer:</b> a ticket holder</p><p>Both chose the trade, and both expect to gain from it.</p></div>
  <div class="u3card bad"><p class="u3h">Outside the deal</p><p><b>Bystander:</b> you, half a mile away</p><p>You hear every concert from your porch. Nobody asked you, and nobody pays you or charges you.</p><p>That effect on you is the <b>externality</b>.</p></div></div>`,
  'Your course textbook\'s outdoor-concert example. The buyer and seller weigh their own gains and costs. The neighbor\'s gain or loss never enters their deal, which is why it is called external.');

/* L33 V2: negative vs positive, the course's two examples side by side (slides 257-260) */
FIG7.l33two = () => fig(atable(['','Negative externality','Positive externality'], [
  ['Effect on the bystander','Harmful','Beneficial'],
  ['Course example','A coal-powered factory\'s pollution','Education: a more educated population'],
  ['Who is affected','Neighbors breathe dirtier air','Everyone gets lower crime and better-informed voters'],
  ['What the market ignores','A <b>cost</b> (external cost)','A <b>benefit</b> (external benefit)'],
  ['Market result','<b>Too much</b> is produced','<b>Too little</b> is produced']
], { cls:'u7t compact wrap', hl:{3:{row:'u3z2'},4:{row:'u3z2'}} }), 'Your course\'s two examples. Read the last two rows together: the market leaves out whatever falls on bystanders, so it overproduces goods with harmful spillovers and underproduces goods with helpful ones.');

/* L33 V3: social = private + external, as a worked calculation at the market quantity (textbook Table 12.2; FRBSF Dr. Econ) */
FIG7.l33sum = () => fig(`<div class="u4io"><div class="u3step"><b>Marginal private cost</b><br>$650<br><span class="small">what the 45,000th refrigerator costs the firm</span></div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>External cost</b><br>$100<br><span class="small">pollution damage to others</span></div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>Marginal social cost</b><br>$750<br><span class="small">the full cost to society</span></div></div>
  <div class="math" style="margin-top:10px">Buyers value that refrigerator at $650 (the demand curve at 45,000).<br>Cost to society $750 − value $650 = <b>$100 lost</b> on that unit.</div>`,
  'Your course textbook\'s refrigerators at the market quantity of 45,000. Federal Reserve Bank of San Francisco: "Private Costs + External Costs = Social Costs." When the firm sees only $650, the last refrigerators cost society more than they are worth to buyers.');

/* L33 V4: the refrigerator table, annotated (textbook Table 12.2) */
FIG7.l33ftbl = () => fig(atable(['Price','Quantity demanded','Supplied (private cost only)','Supplied (with $100 pollution cost)'],
  FR_P.map((p,i)=>[usd7(p), FR_D[i]+',000', FR_SP[i]+',000', FR_SS[i]+',000']), { cls:'u7t compact', hl:{1:{row:'u3z1',2:'u3z1'},2:{row:'u3z2',3:'u3z2'}} }),
  'Your course textbook\'s Table 12.2. First highlight ($650): quantity demanded equals quantity supplied when firms ignore pollution, 45,000. Second highlight ($700): demand equals supply once each refrigerator carries its $100 pollution cost, 40,000.');

/* L33 V5: the refrigerator graph with the two supply curves and the deadweight loss (textbook Figure 12.2; triangle is my calculation) */
FIG7.l33fgraph = () => fig(sdg({ xmin:25, xmax:60, ymin:550, ymax:850, xt:[30,35,40,45,50,55], yt:[600,650,700,750,800], xlab:'Refrigerators (thousands)', ylab:'Price ($)', aria:'Refrigerator market with private and social supply',
  lines:[ {a:[25,850],b:[60,500],c:DC,label:'D',lx:-4,ly:-8,anchor:'end'}, {a:[25,450],b:[60,800],c:SC,label:'S private (MPC)',lx:-4,ly:16,anchor:'end'}, {a:[25,550],b:[55,850],c:'var(--bad)',label:'S social (MSC)',lx:-4,ly:-8,anchor:'end'} ],
  areas:[ Object.assign({ pts:[[40,700],[45,650],[45,750]] }, DWLF) ], vls:[{q:45,p:650},{q:40,p:700}], hl:[{p:650,q:45,c:'var(--muted)'},{p:700,q:40,c:'var(--g2)'}],
  dots:[ {q:45,p:650,label:'E0',c:'var(--muted)',lx:9,ly:14}, {q:40,p:700,label:'E1',c:'var(--ink)',lx:-9,ly:-8,anchor:'end'} ] }),
  'Your course textbook\'s Figure 12.2. The red supply curve sits $100 above the blue one. The market stops at E0 (45,000 at $650); counting pollution, the best point is E1 (40,000 at $700). The shaded triangle is the loss from the 5,000 extra refrigerators: ½ × $100 × 5,000 = $250,000 (computed from the table\'s straight lines).');

/* L33 V6: education, the positive externality graph (slide 260; made-up straight lines) */
FIG7.l33edu = () => fig(extGraph('pos', { xlab:'Quantity of schooling', ylab:'Value of schooling', aria:'Education: social value above private value' }),
  'Your course\'s education example drawn with made-up lines. Demand shows only what schooling is worth to each student (private value). The higher MSB line adds the benefit to everyone else. The market stops where demand meets supply; society would want the larger quantity where MSB meets supply. The shaded triangle is the value lost by stopping short.');

/* L33 V7: Big Drug's two demand schedules (textbook Table 13.1) */
FIG7.l33drug = () => fig(atable(['Rate','Private ($M)','Social ($M)','Gap'],
  BD_R.map((r,i)=>[r+'%', '$'+BD_P[i], '$'+BD_S[i], '$'+(BD_S[i]-BD_P[i])]), { cls:'u7t compact', hl:{3:{row:'u3z2'}} }),
  'Your course textbook\'s Big Drug Company deciding how much to borrow for research. At an 8% interest rate it borrows $30 million, counting only the profit it keeps. Counting the benefits that spill over to other firms and patients, society would want $52 million. The $22 million gap is research that never happens.');

/* L33 V8: both cases side by side (made-up lines, same scale) */
FIG7.l33pair = () => figs([
  ['Negative externality (pollution)', extGraph('neg', { aria:'Negative externality: MSC above supply, market quantity too high' })],
  ['Positive externality (education)', extGraph('pos', { aria:'Positive externality: MSB above demand, market quantity too low' })]
], 'Made-up lines on the same scale. First panel: the extra curve is a cost curve above supply, so the optimum is to the left of the market: too much is produced. Second panel: the extra curve is a benefit curve above demand, so the optimum is to the right: too little is produced. Either way the shaded triangle is deadweight loss.');

/* L33 V9: why the market overproduces, as a chain (video 7.1; textbook §12.1) */
FIG7.l33chain = () => fig(flow([
  'The factory pays for coal, labor and machines, but <b>not</b> for the smoke.',
  'Its supply curve reflects only that <b>private cost</b>, so it sits lower than the full cost to society.',
  'The market price is lower and the quantity higher than if the smoke were paid for.',
  {t:'Units are made whose full cost (MSC) is more than buyers value them (MSB): <b>overproduction and deadweight loss</b>.',c:'u3end'}
]), 'Read top to bottom. Every step follows from one gap: the firm decides using its own cost, while society bears the full cost. Flip "cost" to "benefit" and the same chain explains why education is underproduced.');

/* ===== Lesson 33: Externalities: Private and Social Costs and Benefits (video 7.1 first part; Module 7 slides 256-260) =====
   Common mistakes: M1 any effect of a trade is an externality · M2 a negative externality means too little is produced
   M3 MSC is below MPC with pollution · M4 a positive externality means too much is produced · M5 the optimum is zero pollution / zero output
   M6 the free-market quantity is efficient even with an externality */
const exTbl = (P, D, S, lab='units') => atable(['Price',`Quantity demanded (${lab})`,`Quantity supplied (${lab})`], P.map((p,i)=>[usd7(p), D[i], S[i]]), { cls:'u7t compact' });

mc('l33-def','l33','Which of the following is an externality?',
  [`A cost or benefit of a market trade that falls on a bystander who is not part of it and is not paid or charged for it`,`Any cost the seller pays to make a product`,`The price a buyer pays for a good`,`A tax the government collects on a good`,`The profit a firm earns from selling to foreign buyers`],0,
  `<p>An externality is "the uncompensated impact of one person\'s actions on the well-being of a bystander" (Modern States slide 257). The key words are <b>bystander</b> and <b>uncompensated</b>. The seller\'s own costs and the buyer\'s price are inside the deal, so they are not externalities (M1).</p>`);
mc('l33-classify','l33','Made-up scenario. A neighbor plants a large flower garden, and the bees it attracts pollinate the orchard next door, raising the orchard owner\'s fruit harvest. This is an example of',
  [`A positive externality`,`A negative externality`,`A public good provided by government`,`A price ceiling`,`No externality, because the gardener chose to plant`],0,
  `<p>The orchard owner gains without paying, and the gardener gets nothing for it: an uncompensated benefit to a bystander, so a positive externality. Choosing to plant doesn\'t matter; most externalities come from voluntary choices. The textbook\'s test: does the trade or action affect "a third party who is outside or \'external\' to the exchange"?</p>`);
mc('l33-msc','l33','Which of the following equals the marginal social cost of producing one more unit of a good?',
  [`Marginal private cost plus the external cost of that unit`,`Marginal private cost minus the external cost of that unit`,`The external cost alone`,`The market price of the good`,`Marginal private benefit plus the external benefit`],0,
  `<p>Social cost counts everyone: the producer\'s own cost plus the cost to bystanders. Federal Reserve Bank of San Francisco: "Private Costs + External Costs = Social Costs." "Minus" would put the social cost below the private cost (M3). The last choice is the formula for marginal social <b>benefit</b>.</p>`);
mc('l33-cbs','l33','Made-up scenario. Chemical plants in a competitive industry dump runoff into a river and pay nothing for the damage to fishing downstream. Compared with the socially optimal outcome, how do the market\'s price and quantity of chemicals differ?',
  [`The price is too low and the quantity too high, because buyers don\'t pay the cost of the runoff`,`The price is too high and the quantity too low, because the runoff raises firms\' costs`,`The price is too low and the quantity too low, because the fishing losses reduce demand`,`The price is too high and the quantity too high, because the runoff adds to total cost`,`Both are already optimal, because a competitive market is always efficient`],0,
  `<p>Firms supply along marginal private cost (MPC), which leaves out the runoff. Marginal social cost (MSC) = MPC + external cost, so the optimal supply curve is higher: it would cross demand at a <b>higher price and a lower quantity</b>. The market charges too little and makes too much.</p><p>The runoff is not a cost the firms pay, so it can\'t raise their price; "too low" quantity gets the direction backwards (M2); the last choice assumes competition fixes spillovers (M6). College Board\'s official sample question on externalities tests the same idea with a different setup.</p>`);
lazy('l33-gr-neg','l33',()=>visMC({
  prompt:`In each graph, S is the supply curve (marginal private cost), D is the demand curve (marginal private benefit), and X is a third curve. Dots and dashed lines mark quantities. Which graph shows a market with a <b>negative externality</b>, with X as the marginal social cost?`,
  choices:[ extChoice('neg',true), extChoice('negBelow'), extChoice('pos'), extChoice('posBelow'), extChoice('none') ],
  explain: L => `<p><b>Graph ${L}</b>. Marginal social cost = marginal private cost + external cost, so X must sit <b>above</b> S. The market stops where S meets D; the optimum is where the higher X meets D, at a smaller quantity.</p>${u7extBig('neg', 'Graph '+L+' marked up: X (MSC) above supply; the market quantity (5) is beyond the optimum (4), and the triangle is the deadweight loss.')}<p>A cost curve drawn below supply would mean the firm\'s own cost exceeds the full cost to society, impossible for a harmful spillover (M3). The graphs with X near demand show benefit curves.</p>`
}));
tf('l33-tf-toolittle','l33','When production causes pollution that the firm does not pay for, the free market produces too little of the good.',false,
  `<p>False. The firm ignores the pollution cost, so its costs look lower than they really are and it produces <b>too much</b>. Your course: once the government makes the firm take the social cost into account, "the firm ends up producing less widgets" (M2).</p>`);
mc('l33-fridge-q','l33',`Your course textbook\'s refrigerator market. Making each refrigerator causes $100 of pollution damage that firms do not pay for.${atable(['Price','Quantity demanded','Supplied (private cost only)','Supplied (with $100 pollution cost)'], FR_P.map((p,i)=>[usd7(p), FR_D[i]+',000', FR_SP[i]+',000', FR_SS[i]+',000']), { cls:'u7t compact' })}What are the market equilibrium and the socially optimal outcome?`,
  [`Market: 45,000 at $650; optimal: 40,000 at $700`,`Market: 40,000 at $700; optimal: 45,000 at $650`,`Market: 45,000 at $650; optimal: 50,000 at $600`,`Market: 50,000 at $700; optimal: 45,000 at $650`,`Market and optimal are both 45,000 at $650`],0,
  `<p>Market: quantity demanded equals quantity supplied (private cost only) at $650, 45,000. Optimal: quantity demanded equals quantity supplied with the pollution cost at $700, 40,000.</p>${FIG7.l33ftbl()}<p>Swapping the two reverses which curve the market uses: firms ignoring pollution supply more, not less (M2). "Both 45,000" assumes the market is efficient anyway (M6).</p>`);
gen('l33-g-opt','l33',()=>{
  let a, c, e; do { a = pick([30,32,34,36,40]); c = pick([4,6,8,10]); e = pick([2,4,6,8]); } while((a-c-e) <= 4);
  const qm = (a-c)/2, qo = (a-c-e)/2, pm = (a+c)/2, po = a - qo, dwl = 0.5*e*(qm-qo);
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. In a market, demand (marginal private benefit) is <b>P = ${a} − Q</b> and supply (marginal private cost) is <b>P = ${c} + Q</b>. Each unit also causes <b>$${e}</b> of pollution damage to neighbors. What is the socially optimal quantity?`, answer:qo,
    explain:`<div class="math">MSC = MPC + external cost = ${c} + Q + ${e} = ${c+e} + Q<br>Set MSB = MSC: ${a} − Q = ${c+e} + Q<br>2Q = ${a-c-e}, so Q = <b>${qo}</b> units</div><p>The tempting slip is answering the market quantity, where demand meets the private supply: ${a} − Q = ${c} + Q gives Q = ${qm}. That ignores the $${e} of damage (M6).</p>${fig(sdg({ xmax:a, ymax:a, xt:[0,qo,qm], yt:[0,pm,po], xlab:'Quantity', ylab:'Price ($)', aria:'Marked-up generated externality graph',
      lines:[ {a:[0,a],b:[a,0],c:DC,label:'D = MSB',lx:-4,ly:-8,anchor:'end'}, {a:[0,c],b:[a-c,a],c:SC,label:'MPC',lx:-4,ly:16,anchor:'end'}, {a:[0,c+e],b:[a-c-e,a],c:'var(--bad)',label:'MSC',lx:-4,ly:-8,anchor:'end'} ],
      areas:[ Object.assign({ pts:[[qo,po],[qm,pm],[qm,pm+e]] }, DWLF) ], vls:[{q:qo,p:po},{q:qm,p:pm}],
      dots:[ {q:qm,p:pm,label:'Market',c:'var(--muted)',lx:8,ly:14}, {q:qo,p:po,label:'Optimal',c:'var(--ink)',lx:-8,ly:-8,anchor:'end'} ] }), `Marked up with these numbers: the market makes ${qm}; the optimum is ${qo}. Deadweight loss = ½ × $${e} × ${qm-qo} = $${fmt(dwl)}.`)}`
  };
});
mc('l33-edu','l33','Education benefits the person who gets it, and also benefits others through lower crime and better-informed voters. If the market for schooling is left alone, which of the following is true?',
  [`Too little schooling is chosen, because each student weighs only his or her own benefit`,`Too much schooling is chosen, because the social benefit is below the private benefit`,`Exactly the right amount is chosen, because students pay tuition`,`Too much schooling is chosen, because government pays for some of it`,`Too little schooling is chosen, because the marginal social cost is above the marginal private cost`],0,
  `<p>Demand reflects only each student\'s private value, while marginal social benefit adds the spillover to everyone else, so MSB is above demand. The market stops short of where MSB meets supply: underproduction. Your course: the government "will want to push the market closer to the point that is socially beneficial."</p><p>"Too much" reverses the positive case (M4). The last choice describes a cost spillover, not a benefit one.</p>`);
lazy('l33-gr-pos','l33',()=>visMC({
  prompt:`In each graph, S is the supply curve (marginal private cost), D is the demand curve (marginal private benefit), and X is a third curve. Dots and dashed lines mark quantities. Which graph shows a market with a <b>positive externality</b>, with X as the marginal social benefit?`,
  choices:[ extChoice('pos',true), extChoice('posBelow'), extChoice('neg'), extChoice('negBelow'), extChoice('none') ],
  explain: L => `<p><b>Graph ${L}</b>. Marginal social benefit = marginal private benefit + the benefit to others, so X sits <b>above</b> D. The market stops where D meets S; the optimum is where X meets S, at a larger quantity.</p>${u7extBig('pos', 'Graph '+L+' marked up: X (MSB) above demand; the market quantity (5) falls short of the optimum (6), and the triangle is the value lost.')}<p>A benefit curve drawn below demand would mean society gains less than the buyer does, which is not a positive spillover (M4).</p>`
}));
gen('l33-g-dwl','l33',()=>{
  let a, c, e; do { a = pick([24,30,36,40]); c = pick([4,6,8]); e = pick([2,4,6]); } while((a-c-e) <= 4);
  const qm = (a-c)/2, qo = (a-c-e)/2, dwl = 0.5*e*(qm-qo);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A market has demand <b>P = ${a} − Q</b> and supply (marginal private cost) <b>P = ${c} + Q</b>. Each unit causes <b>$${e}</b> of external cost. The market produces where demand meets private supply, at Q = ${qm}. The socially optimal quantity is ${qo}. How large is the deadweight loss, in dollars?`, answer:dwl,
    explain:`<div class="math">The triangle runs from Q = ${qo} to Q = ${qm}, and its height at Q = ${qm} is the external cost, $${e}.<br>Area = ½ × base × height = ½ × ${qm-qo} × ${e} = <b>$${fmt(dwl)}</b></div><p>A common slip is forgetting the ½: ${qm-qo} × ${e} = ${(qm-qo)*e} is the rectangle, twice the triangle. Another is multiplying the external cost by the whole market quantity: ${e} × ${qm} = ${e*qm} is the total damage, not the deadweight loss.</p>${fig(sdg({ xmax:a, ymax:a, xt:[0,qo,qm], yt:[0], xlab:'Quantity', ylab:'Price ($)', aria:'Marked-up generated deadweight loss graph',
      lines:[ {a:[0,a],b:[a,0],c:DC,label:'D = MSB',lx:-4,ly:-8,anchor:'end'}, {a:[0,c],b:[a-c,a],c:SC,label:'MPC',lx:-4,ly:16,anchor:'end'}, {a:[0,c+e],b:[a-c-e,a],c:'var(--bad)',label:'MSC',lx:-4,ly:-8,anchor:'end'} ],
      areas:[ Object.assign({ pts:[[qo,a-qo],[qm,a-qm],[qm,a-qm+e]] }, DWLF) ], vls:[{q:qo,p:a-qo},{q:qm,p:a-qm}], spans:[{q:qm,p1:a-qm,p2:a-qm+e,label:'$'+e,lx:8,ly:4,anchor:'start'}] }), `Marked up with these numbers: base ${qm-qo} (from ${qo} to ${qm}), height $${e}; area $${fmt(dwl)}.`)}`
  };
});
mc('l33-optimum','l33','Which of the following describes the socially optimal quantity of a good whose production pollutes?',
  [`The quantity where marginal social benefit equals marginal social cost`,`Zero, because any pollution harms someone`,`The quantity where marginal private cost equals marginal private benefit`,`The largest quantity buyers are willing to purchase`,`The quantity where the external cost is largest`],0,
  `<p>Society gains from each unit worth more to buyers than its full cost. That stops where MSB = MSC. "Zero" ignores that the product is valuable: the textbook\'s refrigerators are still worth making at 40,000, just not at 45,000 (M5). MPC = MPB is the market outcome, which ignores the spillover (M6).</p>`);
mc('l33-drug','l33',`Your course textbook\'s Big Drug Company is deciding how much to borrow for research. Its research also helps other firms and patients, a spillover it can\'t charge for.${atable(['Rate of return','Private demand ($ millions)','Social demand ($ millions)'], BD_R.map((r,i)=>[r+'%','$'+BD_P[i],'$'+BD_S[i]]), { cls:'u7t compact' })}If the interest rate on borrowing is 8%, how much research will Big Drug fund, and how much would be best for society?`,
  [`$30 million; $52 million`,`$52 million; $30 million`,`$30 million; $30 million`,`$26 million; $44 million`,`$52 million; $72 million`],0,
  `<p>At 8%, the firm reads its own (private) demand: $30 million. Society\'s demand includes the spillover benefits: $52 million. The textbook: unless the company can capture the full benefit, "it will borrow less than the socially optimal level of $52 million."</p>${FIG7.l33drug()}<p>$26 and $44 million are the 10% row. Swapping the two numbers puts the private amount above the social one, which is backwards for a positive externality (M4).</p>`, 'mc');
/* L33 more */
mc('l33-spill','l33','Externalities are sometimes called "spillovers." Which of the following best explains the name?',
  [`The effect of a market exchange spills over onto people who are not part of it`,`Firms produce more than they can sell, and the extra spills into storage`,`Prices spill over from one market into another`,`Pollution always spills into rivers`,`Profits spill over to shareholders`],0,
  `<p>The textbook: "Because externalities that occur in market transactions affect other parties beyond those involved, they are sometimes called spillovers." The effect reaches past the buyer and seller to a third party (M1).</p>`);
mc('l33-trumpet','l33',`Your course textbook\'s street trumpet player plays songs on request. The music also disturbs people nearby. The table shows the market:${atable(['Price per song','Songs demanded','Songs supplied (no cost for the noise)','Songs supplied (paying the noise cost)'], TR_P.map((p,i)=>[usd7(p), TR_D[i], TR_SP[i], TR_SS[i]]), { cls:'u7t compact' })}What are the equilibrium price and quantity when the noise cost is ignored, and when it is paid?`,
  [`Ignored: $10 and 5 songs; paid: $12 and 4 songs`,`Ignored: $12 and 4 songs; paid: $10 and 5 songs`,`Ignored: $10 and 5 songs; paid: $10 and 3 songs`,`Ignored: $15 and 7.5 songs; paid: $12 and 4 songs`,`Ignored: $5 and 2.5 songs; paid: $10 and 3 songs`],0,
  `<p>Ignored: demand (5) equals supply without the noise cost (5) at $10. Paid: demand (4) equals supply with the noise cost (4) at $12. Paying for the noise raises the price and cuts the number of songs, the textbook\'s general lesson.</p>${atable(['Price','Demanded','Supplied (ignored)','Supplied (paid)'], TR_P.map((p,i)=>[usd7(p), TR_D[i], TR_SP[i], TR_SS[i]]), { cls:'u7t compact', hl:{3:{row:'u3z2',1:'u3z2',3:'u3z2'},4:{row:'u3z1',1:'u3z1',2:'u3z1'}} })}<p>"$10 and 3 songs" reads the paid supply at the old price instead of finding the new equilibrium.</p>`);
mc('l33-private-supply','l33','Which of the following best explains why the ordinary supply curve doesn\'t account for pollution?',
  [`Supply reflects only the private costs the firm pays, not the costs its pollution places on others`,`Supply reflects what buyers are willing to pay`,`Supply already includes all social costs by law`,`Firms never pay any costs for their inputs`,`Supply shows the government\'s tax revenue`],0,
  `<p>Your course: supply "reflects the private cost to the firm to provide the good or service into the market. It does not account for the social costs associated with your decisions impacting bystanders." Demand, not supply, shows willingness to pay.</p>`);
mc('l33-neighbor','l33','Made-up scenario. A bakery\'s early-morning ovens fill the street with the smell of fresh bread, which the neighbors love. Compared with the socially optimal amount, the bakery will tend to bake',
  [`Too little, because it gets no payment for the benefit to its neighbors`,`Too much, because neighbors enjoy the smell`,`Exactly the right amount, because bread has a market price`,`Too much, because the bakery ignores its costs`,`Too little, because the smell is a negative externality`],0,
  `<p>The neighbors\' enjoyment is a benefit the bakery isn\'t paid for. Like education, it is a positive externality, so the market makes too little (M4). The textbook\'s point about the concert works the same way: a fan who hears it free gains, but the producer doesn\'t count that gain.</p>`);
gen('l33-g-msc','l33',()=>{
  const mpc = pick([20,25,30,40,45,60]), ext = pick([5,8,10,12,15]);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Producing one more ton of paper costs a mill <b>$${mpc}</b> in labor, wood and energy. The chemicals it releases cause <b>$${ext}</b> of damage to people downstream, which the mill does not pay. What is the marginal social cost of that ton?`, answer:mpc+ext,
    explain:`<div class="math">MSC = MPC + external cost = $${mpc} + $${ext} = <b>$${mpc+ext}</b></div><p>A common slip is subtracting, $${mpc} − $${ext} = $${mpc-ext}, which would put the social cost below the private cost (M3). Another is answering $${ext}, the external cost alone.</p>${fig(`<div class="u4io"><div class="u3step"><b>MPC</b><br>$${mpc}</div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>External cost</b><br>$${ext}</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MSC</b><br>$${mpc+ext}</div></div>`, 'The ton\'s full cost to society: what the mill pays plus what downstream residents pay.')}`
  };
});
mc('l33-msb','l33','Made-up numbers. A flu shot is worth $30 to the person who gets it and protects others from catching the flu, a benefit to them worth $20. What is the marginal social benefit of that shot?',
  [`$10`,`$20`,`$30`,`$50`,`$600`],3,
  `<p>MSB = private benefit + external benefit = $30 + $20 = <b>$50</b>. $30 is only the private benefit (what demand shows). $10 subtracts instead of adding. $600 multiplies the two.</p>`);
tf('l33-tf-efficient','l33','If a market has a negative externality, the free-market equilibrium still maximizes total surplus for society.',false,
  `<p>False. The equilibrium maximizes surplus only when private costs and benefits equal social ones. The textbook: "If no externalities existed, the interaction of demand and supply will coordinate social costs and benefits." With pollution, the units beyond the optimum cost society more than they are worth, a deadweight loss (M6).</p>`);
mc('l33-failure','l33','Why do economists call a negative externality a "market failure"?',
  [`The market no longer accounts for all social costs, so it fails to produce the efficient quantity`,`The market fails to reach an equilibrium price`,`Firms in the market fail to earn a profit`,`Buyers fail to find the good in stores`,`The government fails to collect taxes on the good`],0,
  `<p>The textbook: "Because externalities represent a case where markets no longer consider all social costs, but only some of them, economists commonly refer to externalities as an example of market failure." The market still reaches an equilibrium; it is the wrong quantity.</p>`);
gen('l33-g-pos','l33',()=>{
  let a, c, b; do { a = pick([24,28,30,32]); c = pick([4,6,8]); b = pick([2,4,6,8]); } while((a-c) <= 4);
  const qm = (a-c)/2, qo = (a+b-c)/2;
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. Demand for vaccinations (marginal private benefit) is <b>P = ${a} − Q</b>, and supply (marginal cost) is <b>P = ${c} + Q</b>. Each vaccination also gives <b>$${b}</b> of protection to other people. What is the socially optimal quantity?`, answer:qo,
    explain:`<div class="math">MSB = MPB + external benefit = ${a} − Q + ${b} = ${a+b} − Q<br>Set MSB = MC: ${a+b} − Q = ${c} + Q<br>2Q = ${a+b-c}, so Q = <b>${qo}</b></div><p>The tempting slip is the market quantity, where private demand meets supply: Q = ${qm}. That leaves out the $${b} benefit to others (M4).</p>${fig(sdg({ xmax:a+b, ymax:a+b, xt:[0,qm,qo], yt:[0], xlab:'Vaccinations', ylab:'Price ($)', aria:'Marked-up generated positive externality graph',
      lines:[ {a:[0,c],b:[a+b-c,a+b],c:SC,label:'S = MC',lx:-4,ly:16,anchor:'end'}, {a:[0,a],b:[a,0],c:DC,label:'D = MPB',lx:-4,ly:-8,anchor:'end'}, {a:[0,a+b],b:[a+b,0],c:'var(--g2)',label:'MSB',lx:-4,ly:-8,anchor:'end'} ],
      areas:[ Object.assign({ pts:[[qm,c+qm],[qm,c+qm+b],[qo,c+qo]] }, DWLF) ], vls:[{q:qm,p:c+qm},{q:qo,p:c+qo}],
      dots:[ {q:qm,p:c+qm,label:'Market',c:'var(--muted)',lx:-8,ly:14,anchor:'end'}, {q:qo,p:c+qo,label:'Optimal',c:'var(--ink)',lx:8,ly:14} ] }), `Marked up with these numbers: the market stops at ${qm}; society\'s optimum is ${qo}.`)}`
  };
});
mc('l33-overprod','l33','Made-up scenario. In a city, each extra car on the road at rush hour slows down every other driver, but drivers don\'t pay for the delay they cause. Compared with the socially optimal amount, rush-hour driving is',
  [`Too high, because drivers ignore the delay they cause others`,`Too low, because driving creates a positive externality`,`Exactly right, because drivers pay for gasoline`,`Too low, because drivers bear all the costs of driving`,`Too high, because drivers overvalue their own time`],0,
  `<p>Each driver weighs his own cost of the trip but not the delay imposed on others, a negative externality. The marginal social cost of a trip is above the private cost, so there is too much driving at rush hour (M2). Paying for gasoline covers only the private cost.</p>`);
mc('l33-coal','l33','A coal-powered factory makes widgets, and its pollution harms nearby residents. Each widget always creates the same amount of pollution. If the government makes the factory account for the social cost of its pollution, what happens to widget production and pollution?',
  [`Fewer widgets are produced, and there is less pollution`,`More widgets are produced, and there is more pollution`,`The same number of widgets, but less pollution per widget`,`Fewer widgets are produced, but pollution is unchanged`,`More widgets are produced, and there is less pollution`],0,
  `<p>Your course: once the firm takes the social cost into account, "the firm ends up producing less widgets. With less widgets produced that\'s going to tell us that we have less pollution all else equal." Higher costs shift supply up, cutting quantity.</p>`);
mc('l33-third','l33','A new outdoor arena half a mile from your home hosts country music concerts, which you can hear from your porch for free. If you love country music, the concerts are a',
  [`Positive externality for you`,`Negative externality for you`,`Private good you have bought`,`Public good provided by government`,`Cost the concert producer must pay you`],0,
  `<p>The textbook: "If you love country music, then what amounts to a series of free concerts would be a positive externality." If you hated it, the same sound would be a negative externality. You didn\'t buy a ticket, so it isn\'t a private good you bought, and nobody pays you.</p>`);
tf('l33-tf-zero','l33','The socially optimal amount of pollution from a useful product is always zero.',false,
  `<p>False. The optimum is where marginal social benefit equals marginal social cost. Some refrigerators are worth making even after counting their pollution, so some pollution comes with the best quantity. The goal is the right amount, not none (M5).</p>`);
lazy('l33-socialsup','l33',()=>visMC({
  prompt:`Firms in a market are made to pay for the external cost of their pollution, an extra cost on every unit they produce. Demand doesn\'t change. Which graph shows what happens in their market?`,
  choices:[ shift7('Sl',true), shift7('Sr'), shift7('Dl'), shift7('Dr'), shift7('mv') ],
  explain: L => `<p><b>Graph ${L}</b>: supply shifts left (up). Your textbook: when each refrigerator must carry its $100 of pollution cost, "production becomes more costly and the entire supply curve shifts up by $100."</p>${u6shiftBig('Sl', 'Marked up: higher cost at every quantity moves supply from S1 to S2; the price rises (P1 to P2) and the quantity falls.', 'P1', 'P2', 'Quantity', 'Price')}<p>Supply shifting right would mean production got cheaper (M3). A demand shift is wrong because buyers\' willingness to pay hasn\'t changed.</p>`
}));
lazy('l33-gr-dwl','l33',()=>visMC({
  prompt:`Made-up graphs of a market with a negative externality. In each, S is supply (marginal private cost), D is demand, and X is marginal social cost. Which graph shades the <b>deadweight loss</b> from the externality?`,
  choices:[
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:-2,ly:-3,anchor:'end'},{a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4},{a:[1,3],b:[7,9],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:4,y:6},{x:5,y:5}], xlab:'Quantity', ylab:'Price', aria:'Graph '+L }).replace('</svg>', `<polygon points="${26+114*0.4},${100-88*0.6} ${26+114*0.5},${100-88*0.5} ${26+114*0.5},${100-88*0.7}" fill="var(--bad)" opacity="0.35"/></svg>`), desc:'a small triangle between X and D, from the optimum to the market quantity', ok:true },
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:-2,ly:-3,anchor:'end'},{a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4},{a:[1,3],b:[7,9],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:4,y:6},{x:5,y:5}], xlab:'Quantity', ylab:'Price', aria:'Graph '+L }).replace('</svg>', `<polygon points="${26+114*0.1},${100-88*0.9} ${26+114*0.5},${100-88*0.5} ${26+114*0.1},${100-88*0.5}" fill="var(--bad)" opacity="0.35"/></svg>`), desc:'the triangle under demand and above the market price' },
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:-2,ly:-3,anchor:'end'},{a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4},{a:[1,3],b:[7,9],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:4,y:6},{x:5,y:5}], xlab:'Quantity', ylab:'Price', aria:'Graph '+L }).replace('</svg>', `<polygon points="${26+114*0.1},${100-88*0.3} ${26+114*0.5},${100-88*0.7} ${26+114*0.5},${100-88*0.5} ${26+114*0.1},${100-88*0.1}" fill="var(--bad)" opacity="0.35"/></svg>`), desc:'the band between S and X from zero to the market quantity' },
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:-2,ly:-3,anchor:'end'},{a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4},{a:[1,3],b:[7,9],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:4,y:6},{x:5,y:5}], xlab:'Quantity', ylab:'Price', aria:'Graph '+L }).replace('</svg>', `<polygon points="${26+114*0.5},${100-88*0.5} ${26+114*0.6},${100-88*0.4} ${26+114*0.6},${100-88*0.6}" fill="var(--bad)" opacity="0.35"/></svg>`), desc:'a small triangle to the right of the market quantity' },
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:-2,ly:-3,anchor:'end'},{a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4},{a:[1,3],b:[7,9],c:'var(--bad)',label:'X',lx:2,ly:4}], vls:[{x:4,y:6},{x:5,y:5}], xlab:'Quantity', ylab:'Price', aria:'Graph '+L }).replace('</svg>', `<polygon points="${26+114*0.1},${100-88*0.1} ${26+114*0.5},${100-88*0.5} ${26+114*0.1},${100-88*0.5}" fill="var(--bad)" opacity="0.35"/></svg>`), desc:'the triangle above supply and below the market price' } ],
  explain: L => `<p><b>Graph ${L}</b>. Deadweight loss covers only the units between the optimum and the market quantity, where the full cost (X) is above what buyers value (D).</p>${u7extBig('neg', 'Graph '+L+' marked up: the deadweight loss is the triangle between X (MSC) and D, from the optimum (4) to the market quantity (5).')}<p>The band from zero is the total pollution damage, most of which comes with units worth making (M5). The other shapes are consumer or producer surplus.</p>`
}));
mc('l33-msb-msc-pos','l33','In a market with a positive externality and no government action, which is true at the market quantity?',
  [`Marginal social benefit is greater than marginal social cost`,`Marginal social benefit is less than marginal social cost`,`Marginal social benefit equals marginal social cost`,`Marginal private benefit is greater than marginal social benefit`,`Marginal private cost is greater than marginal social cost`],0,
  `<p>At the market quantity, the buyer\'s own benefit equals the cost. The spillover makes MSB higher still, so MSB > MSC: one more unit would add more to society than it costs. That is why more should be produced (M4).</p>`);
/* ===== Lesson 33 quick checks ===== */
mc('l33c-def','l33','Made-up scenario. A student who works in a quiet library is distracted by another student\'s loud phone call. The phone call is',
  [`A negative externality on the first student`,`A positive externality on the first student`,`A private good the first student bought`,`Not an externality, because no money changed hands`,`A public good`],0,
  `<p>The caller\'s choice harms a bystander who isn\'t compensated: a negative externality. Externalities don\'t need money to change hands; that is exactly why they are external.</p>`);
mc('l33c-msc','l33','Made-up numbers. A unit of steel costs a mill $50 to make, and its smoke causes $15 of harm to neighbors. What is the marginal social cost of that unit?',
  [`$15`,`$35`,`$50`,`$65`,`$750`],3,
  `<p>MSC = MPC + external cost = $50 + $15 = <b>$65</b>. $35 subtracts (M3); $50 is the private cost alone.</p>`);
mc('l33c-neg','l33','Made-up scenario, new to this lesson. A chemical plant\'s waste runs into a river used by fishing businesses downstream, and the plant pays nothing for it. Without government action, the plant\'s output is',
  [`Larger than the socially optimal amount`,`Smaller than the socially optimal amount`,`Equal to the socially optimal amount`,`Zero, because pollution is illegal`,`Larger, because the river has a positive externality`],0,
  `<p>The plant\'s marginal social cost (its own cost plus the harm downstream) is above its private cost, so the market makes more than the optimum (M2).</p>`);
mc('l33c-pos','l33','Made-up scenario. A homeowner repaints a run-down house, which raises the value of the houses next door. Without anyone stepping in, repainting in the neighborhood tends to be',
  [`Less than the socially optimal amount`,`More than the socially optimal amount`,`Exactly the socially optimal amount`,`A negative externality`,`Paid for by the neighbors`],0,
  `<p>The neighbors gain without paying, a positive externality. Each homeowner counts only his own gain, so too little repainting happens (M4).</p>`);
mc('l33c-opt','l33','Which condition defines the socially optimal quantity of a good?',
  [`Marginal social benefit equals marginal social cost`,`Marginal private benefit equals marginal private cost`,`External cost equals zero`,`Price equals the external cost`,`Marginal social benefit is as large as possible`],0,
  `<p>MSB = MSC weighs every gain and every cost, including spillovers. MPB = MPC is where the free market ends up, which matches the optimum only when there is no externality.</p>`);
lazy('l33c-skill','l33',()=>visMC({
  prompt:`Made-up scenario. Getting vaccinated protects you and also the people around you. In each graph, S is supply, D is demand (private benefit), and X is a third curve. Which graph shows this market?`,
  choices:[ extChoice('pos',true), extChoice('neg'), extChoice('posBelow'), extChoice('negBelow'), extChoice('none') ],
  explain: L => `<p><b>Graph ${L}</b>: the spillover is a benefit, so the marginal social benefit curve (X) sits above demand and the market quantity is too low.</p>${u7extBig('pos', 'Graph '+L+' marked up: X (MSB) above demand; the market stops at 5, short of the optimum at 6.')}`
}));

/* Course materials checked 2026-11-19: video 7.1 transcript (externality definition; two types; supply reflects private cost, demand private value; coal-powered widget firm;
   taxes or quotas; "the firm ends up producing less widgets"; education; "push the market closer to the point that is socially beneficial"), Module 7 slides 256-260;
   course textbook §12.1 (concert; spillovers; pollution; Table 12.2 refrigerators, $100, $650/45,000 and $700/40,000; trumpet Work It Out, Table 12.3; market failure quote)
   and §13.1 (Big Drug, Table 13.1; one-third to one-half of benefits to the inventor); FRBSF Dr. Econ ("Private Costs + External Costs = Social Costs"; "Produces or consumes
   too much"); Econlib, Caplan ("dirty air ... is overproduced"); CLEP outline (Externalities) and sample question 7 (MSC > MPC, key B). */
const L33TAGS = {
  'l33-def':['MS7 OS121','msb','terms','M1'], 'l33-classify':['OS121 MS7','pos','models','M1'], 'l33-msc':['FRBSF CBS','msb','terms','M3'],
  'l33-cbs':['CBS MS7','neg','terms','M2 M3 M6'], 'l33-gr-neg':['CBS OS121','neg','graphs','M3'], 'l33-tf-toolittle':['MS7 OS121','neg','terms','M2'],
  'l33-fridge-q':['OS121','neg','data','M2 M6'], 'l33-g-opt':['OS121 CBS','msb','data','M6'], 'l33-edu':['MS7','pos','models','M4'],
  'l33-gr-pos':['MS7 OS131','pos','graphs','M4'], 'l33-g-dwl':['OS121','neg','data','M6'], 'l33-optimum':['OS121 CB','msb','terms','M5 M6'], 'l33-drug':['OS131','pos','data','M4'],
  'l33-spill':['OS121','msb','terms','M1'], 'l33-trumpet':['OS121','neg','data','M6'], 'l33-private-supply':['MS7','msb','terms','M3'],
  'l33-neighbor':['OS121 MS7','pos','models','M4'], 'l33-g-msc':['FRBSF','msb','data','M3'], 'l33-msb':['MS7 CB','msb','data','M3'], 'l33-tf-efficient':['OS121','neg','terms','M6'],
  'l33-failure':['OS121','neg','terms','M6'], 'l33-g-pos':['MS7 CB','pos','data','M4'], 'l33-overprod':['FRBSF ELEX','neg','models','M2'], 'l33-coal':['MS7','neg','models','M2'],
  'l33-third':['OS121','pos','terms','M1'], 'l33-tf-zero':['OS121 CB','msb','terms','M5'], 'l33-socialsup':['OS121','neg','graphs','M3'],
  'l33-gr-dwl':['OS121','neg','graphs','M5'], 'l33-msb-msc-pos':['CB MS7','msb','models','M4'],
  'l33c-def':['MS7 OS121','msb','models','M1'], 'l33c-msc':['FRBSF','msb','data','M3'], 'l33c-neg':['FRBSF OS121','neg','models','M2'], 'l33c-pos':['MS7','pos','models','M4'],
  'l33c-opt':['CB CBS','msb','terms','M6'], 'l33c-skill':['MS7 CBS','pos','graphs','M4']
};
u7tag(L33TAGS);

U7_CARDS.l33 = [
  ['Externality','What is an externality?','The uncompensated effect of one person\'s actions on a bystander who is not part of the deal. Also called a spillover.','A neighbor hears every concert at a new outdoor arena without buying a ticket.','Effects on the buyer or seller themselves are not externalities.', FIG7.l33who()],
  ['Negative externality','What is a negative externality, and what does the market do?','A harmful spillover. The market produces too much, because the producer ignores the cost to others.','A coal-powered factory\'s smoke harms nearby residents.','Too much, not too little.', u7ext('neg','A cost curve above supply; market quantity too large')],
  ['Positive externality','What is a positive externality, and what does the market do?','A helpful spillover. The market produces too little, because buyers count only their own benefit.','Education lowers crime and makes for better-informed voters.','Too little, not too much.', u7ext('pos','A benefit curve above demand; market quantity too small')],
  ['Private cost vs social cost','How are private cost and social cost related?','Social cost = private cost + external cost.','Refrigerator: $650 to the firm + $100 of pollution = $750 to society.','Social cost is never below private cost when there is a harmful spillover.', FIG7.l33sum()],
  ['Marginal social cost (MSC)','What are marginal private cost (MPC) and marginal social cost (MSC)?','MPC is what one more unit costs the producer (the supply curve). MSC = MPC + that unit\'s external cost.','A ton of paper: $40 to the mill + $10 of river damage = $50.','The supply curve is the MPC curve, not the MSC curve.', `<div class="u4io"><div class="u3step"><b>MPC</b><br>$40</div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>External cost</b><br>$10</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MSC</b><br>$50</div></div>`],
  ['Marginal social benefit (MSB)','What are marginal private benefit (MPB) and marginal social benefit (MSB)?','MPB is what one more unit is worth to the buyer (the demand curve). MSB = MPB + the benefit to others.','A flu shot worth $30 to you and $20 to people you won\'t infect: MSB = $50.','The demand curve shows only the private benefit.', `<div class="u4io"><div class="u3step"><b>MPB</b><br>$30</div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>External benefit</b><br>$20</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MSB</b><br>$50</div></div>`],
  ['Socially optimal quantity','Where is the socially optimal quantity?','Where marginal social benefit equals marginal social cost.','Refrigerators: 40,000 (counting the $100 pollution cost), not the market\'s 45,000.','It is usually not zero: useful goods are worth some pollution.', FIG7.l33fgraph()],
  ['Market failure','Why is an externality called a market failure?','The market weighs only private costs and benefits, so it produces the wrong quantity and loses surplus.','The refrigerator market makes 5,000 too many.','The market still reaches an equilibrium; it is the wrong one.', FIG7.l33chain()],
  ['Deadweight loss from an externality','What does the deadweight loss from a negative externality measure?','The net loss on the extra units the market makes beyond the optimum, where MSC is above MSB.','Refrigerators: ½ × $100 × 5,000 = $250,000.','It is not the total pollution damage, which includes units worth making.', extGraph('neg',{aria:'Deadweight loss triangle between MSC and demand'})],
  ['Education (course example)','Why is education a positive externality?','It benefits the student and also society: lower crime and better voting and political outcomes.','Social value of schooling is above its private value, so the market provides too little.','The spillover is on the demand (benefit) side, not the supply side.', FIG7.l33edu()],
  ['Research and new technology','Why do private firms do too little research?','Much of the benefit spills over to other firms and users, so the inventor keeps only part of it.','Big Drug at 8%: $30 million private vs $52 million social.','Inventors get about one-third to one-half of the total benefit (textbook).', FIG7.l33drug()],
  ['Negative vs positive at a glance','How do the graphs of the two kinds differ?','Negative: an MSC curve above supply; market quantity too high. Positive: an MSB curve above demand; market quantity too low.','Pollution vs education.','Cost spillovers move the supply side; benefit spillovers move the demand side.', FIG7.l33pair()]
];

Object.assign(U7_WRITE, {
  'w-l33-1':{lesson:'l33',prompt:'A coal-powered factory\'s smoke harms people nearby, and the factory pays nothing for it. Explain why the free market produces more than the socially optimal quantity. Use the terms marginal private cost, marginal social cost and deadweight loss.',
    model:'The factory decides how much to make by comparing price with its marginal private cost: labor, coal and machines. It does not pay for the harm its smoke does, so its supply curve leaves out that external cost. The marginal social cost of each unit is the private cost plus the external cost, so it is higher than the supply curve. The market stops where demand meets the lower private supply curve, which is a larger quantity than where demand meets marginal social cost. On the extra units, the full cost to society is more than buyers value them, so society loses surplus. That loss is the deadweight loss, the triangle between the marginal social cost curve and the demand curve from the optimal quantity to the market quantity.',
    checklist:['Says the firm\'s supply reflects only marginal private cost and ignores the external cost','Defines marginal social cost as private cost plus external cost, so it is higher','Explains that the market quantity (D = MPC) is larger than the optimum (D or MSB = MSC)','Explains deadweight loss as the net loss on the extra units where MSC exceeds MSB']},
  'w-l33-2':{lesson:'l33',prompt:'Education helps the student who gets it, and it also helps society through lower crime and better-informed voters. Using education as your example, explain what a positive externality is, why the free market provides too little education, and what the gap between private and social value means on a graph.',
    model:'A positive externality is a benefit that spills over to people outside a trade without their paying for it. Education helps the student, but it also helps society: your course says a more educated population means lower crime and better voting and political outcomes. Each student decides how much schooling to get by weighing only his or her own private value. So the demand curve shows private value, and the marginal social benefit curve lies above it by the value to everyone else. The market stops where private demand meets supply, which is less schooling than where marginal social benefit meets supply. The gap means some schooling that is worth more to society than it costs never happens, a deadweight loss.',
    checklist:['Defines a positive externality as an uncompensated benefit to others','Gives the course\'s education spillovers (lower crime, better voting or political outcomes)','Explains that demand reflects private value only, so MSB lies above demand','Concludes the market quantity is below the optimum and names the lost surplus']}
});

U7_PLAN.l33 = {
  core:['l33-def','l33-classify','l33-msc','l33-cbs','l33-gr-neg','l33-tf-toolittle','l33-fridge-q','l33-g-opt','l33-edu','l33-gr-pos','l33-g-dwl','l33-optimum','l33-drug'],
  more:['l33-spill','l33-trumpet','l33-private-supply','l33-neighbor','l33-g-msc','l33-msb','l33-tf-efficient','l33-failure','l33-g-pos','l33-overprod','l33-coal','l33-third','l33-tf-zero','l33-socialsup','l33-gr-dwl','l33-msb-msc-pos']
};

U7_LESSONS.push({ id:'l33', unit:7, title:'Externalities: Private and Social Costs and Benefits', mins:40, src:'Modern States video 7.1 (first part) and Module 7 slides 256-260 · Course textbook (OpenStax) §12.1 and §13.1',
  sources:['MS7','OS121','OS131','CB','CBS','FRBSF','ELEX'],
  oneline:'When a trade helps or harms a bystander, the market ignores that spillover. It makes too much of goods with harmful spillovers and too little of goods with helpful ones.',
  body:`
<p>Lesson 11 showed that a competitive market, left alone, makes the quantity that maximizes ${dt('total-surplus','total surplus')}, and Lesson 12 measured the ${dt('deadweight-loss','deadweight loss')} when something pushes it away. That result had a hidden condition: everyone affected by the trade is the buyer or the seller. Lesson 4\'s overfished lake already broke it. This unit is about the cases where markets get the quantity wrong, a ${dt('market-failure','market failure')}, and what government can do. This lesson covers the first one.</p>

<h2>What an externality is</h2>
<!-- src: MS7 (video 7.1: "An externality is the uncomplicated [uncompensated] impact of one person's decisions on a bystander"; "a positive externality, where the uncompensated impact is beneficial to the bystander, and a negative externality, where the impact is negative for the bystander"; slide 257: "The uncompensated impact of one person's actions on the well-being of a bystander is an externality"). Course slip: the transcript reads "uncomplicated"; slide 257 says "uncompensated". OS121 ("The effect of a market exchange on a third party who is outside or 'external' to the exchange is called an externality ... sometimes called spillovers"; concert example; "If you hate country music ... negative externality. If you love country music ... positive externality"). -->
<p>Your course\'s definition (slide 257): "The uncompensated impact of one person\'s actions on the well-being of a bystander is an ${dt('externality','<b>externality</b>')}." (The video transcript says "uncomplicated"; the slide\'s "uncompensated" is the word that matters.) The textbook calls them spillovers, because the effect spills past the buyer and seller onto "a third party who is outside or \'external\' to the exchange."</p>
${FIG7.l33who()}
<p><b>Why it happens:</b> a buyer and seller each weigh their own gains and costs. Nothing in the price makes them weigh the neighbor\'s. The neighbor has, in the textbook\'s words, "no voice in their market transaction."</p>
<p>There are two kinds. A ${dt('neg-externality','<b>negative externality</b>')} harms the bystander; a ${dt('pos-externality','<b>positive externality</b>')} helps. The textbook\'s concert does either: "If you hate country music ... a negative externality. If you love country music ... a positive externality."</p>
${FIG7.l33two()}
<p><b>So what:</b> the test is always the same two questions. Is someone outside the deal affected? Is the effect unpaid? If both are yes, it is an externality, whether or not money changes hands.</p>
<div data-check="l33c-def"></div>

<h2>Private and social costs and benefits</h2>
<!-- src: MS7 (video 7.1: "the cost reflects the private cost to the firm ... It does not account for the social costs associated with your decisions impacting bystanders"; "the private value ... does not take into account the value to society as a whole"; slide 258: "supply reflects the cost to provide the good/service for the firm · Reflects only private cost · If externalities exist – also need social cost"; "demand reflects the value buyers assign ... Reflects only private value · If externalities exist – also need social benefit/value"); FRBSF ("Private Costs + External Costs = Social Costs"; "If external costs > 0, then private costs < social costs. Then society tends to: Price the good or service too low, and Produces or consumes too much"); CBS (sample Q7 uses marginal social cost vs marginal private cost); CB (outline: "Marginal social benefit and marginal social cost"). Refrigerator numbers: OS121 Table 12.2. -->
<p>Your course recalls what the two curves of Unit 2 measure (slide 258). Supply "reflects only ${dt('private-cost','private cost')}," what the firm pays. Demand "reflects only private value," what buyers get. "If externalities exist," we also need the cost and value to third parties.</p>
<p>The CLEP outline and College Board\'s sample question use four names for these, all measured one unit at a time:</p>
<div class="math">${dt('mpc','Marginal private cost (MPC)')} = what one more unit costs the producer = the supply curve<br>${dt('msc','Marginal social cost (MSC)')} = MPC + the ${dt('external-cost','external cost')} of that unit<br>${dt('mpb','Marginal private benefit (MPB)')} = what one more unit is worth to the buyer = the demand curve<br>${dt('msb','Marginal social benefit (MSB)')} = MPB + the benefit that spills over to others</div>
<p>The Federal Reserve Bank of San Francisco puts the cost side in one line: "Private Costs + External Costs = ${dt('social-cost','Social Costs')}." A harmful spillover makes MSC higher than MPC; a helpful one makes MSB higher than MPB. With no spillover, the private and social versions are the same.</p>
<p><b>Worked example: your course textbook\'s refrigerators.</b> At the market quantity, the firms\' own cost of the last refrigerator is $650, and each one causes $100 of pollution damage.</p>
${FIG7.l33sum()}
<p>Check: MSC ($750) is above MPC ($650), as it must be when the spillover is harmful.</p>
<p><b>So what:</b> once you can name these four curves, every externality graph is the same picture: one extra curve, above supply for a harmful spillover or above demand for a helpful one.</p>
<div data-check="l33c-msc"></div>

<h2>Negative externalities: pollution</h2>
<!-- src: MS7 (video 7.1: "a coal-powered manufacturing firm that's producing widgets. Pollution is a byproduct ... the firm is going to produce where supply is equal to demand ... it doesn't take into account the social costs associated with pollution ... taxes or ... quotas ... The result is that the firm ends up producing less widgets"; slide 259); OS121 (Table 12.2 and Figure 12.2: $650 and 45,000; $100 external cost; "the entire supply curve shifts up by $100"; $700 and 40,000; "a higher price, a lower quantity of production, and a lower quantity of pollution"; "economists commonly refer to externalities as an example of market failure"; "at the market output, social costs of production exceed social benefits to consumers, and the market produces too much of the product"; trumpet Table 12.3: $10 and 5 songs vs $12 and 4 songs); ELEX ("dirty air has negative externalities and so dirty air is overproduced"). Deadweight loss $250,000 is my calculation from the table's straight lines. -->
<p>Your course\'s example is a coal-powered factory making widgets, with pollution as a by-product. The firm "is going to produce where supply is equal to demand," but its supply "takes into account only the private cost to the firm ... it doesn\'t take into account the social costs associated with pollution."</p>
${FIG7.l33chain()}
<p><b>Worked example: your course textbook\'s refrigerators, with real numbers.</b> Read the table first: the third column is supply if firms ignore pollution; the fourth is supply if each refrigerator carries its $100 of damage.</p>
${FIG7.l33ftbl()}
<div class="math">Market (ignoring pollution): demand 45,000 = supply 45,000 at <b>$650</b><br>Optimal (counting pollution): demand 40,000 = supply 40,000 at <b>$700</b><br>Extra refrigerators the market makes: 45,000 − 40,000 = <b>5,000</b></div>
<p>The same numbers on a graph: the red social-supply curve sits exactly $100 above the blue private one.</p>
${FIG7.l33fgraph()}
<p>Check: counting the pollution cost raises the price and lowers the quantity, the textbook\'s result: "a higher price, a lower quantity of production, and a lower quantity of pollution." The textbook calls this a market failure because "the market produces too much of the product."</p>
<p>Try other sizes of pollution damage below and watch the gap and the triangle grow.</p>
<div data-widget="extlab"></div>
<p>What to notice: the deadweight loss grows with the square of the damage. Double the damage per refrigerator and the extra quantity doubles too, so the triangle is four times as large.</p>
<p><b>So what:</b> for a negative externality, the market quantity is too high and the price too low. Economist Bryan Caplan (Econlib): "dirty air has negative externalities and so dirty air is overproduced."</p>
<div data-check="l33c-neg"></div>

<h2>Positive externalities: education and research</h2>
<!-- src: MS7 (video 7.1: "a positive externality, such as public education ... Society benefits from having a more educated population. There are lower crime rates ... the political outcomes of an educated voter tend to be more beneficial ... the demand ... only reflects the private value of education ... Because the social value ... is greater than the private value ... the government will want to push the market closer to the point that is socially beneficial"; slide 260). Course slip: the transcript says "the voting behavior of firms is better for everyone"; slide 260 says "better-educated voters lead to a better government." OS131 (Big Drug, Table 13.1: at 8%, $30 million private vs $52 million social; "the original inventor receives one-third to one-half of the total economic benefits from innovations"). -->
<p>Your course\'s positive example is education. It helps the student, but "Society benefits from having a more educated population. There are lower crime rates," and slide 260 adds that "better-educated voters lead to a better government." (The video\'s "voting behavior of firms" is a slip; the slide says voters.)</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of a market as a meeting where only the buyer and seller get a vote. If a decision splashes paint on people standing outside the room, nobody inside counts it, so the meeting chooses too much paint-splashing. If it hands out free coffee to the people outside, nobody inside counts that either, so the meeting chooses too little coffee. An externality is just a group with no vote.</p></div>
<p><b>Why too little:</b> each student weighs only his or her own value of schooling. So demand shows private value, and marginal social benefit sits above it by the value to everyone else. The market stops where demand meets supply, short of where MSB meets supply.</p>
${FIG7.l33edu()}
<p><b>Worked example: your course textbook\'s Big Drug Company.</b> Its new drugs teach other firms how to treat illnesses, a spillover it can\'t charge for. The textbook reports studies finding that an inventor keeps only "one-third to one-half of the total economic benefits from innovations."</p>
${FIG7.l33drug()}
<div class="math">Interest rate 8%: read across that row<br>Private demand: Big Drug borrows <b>$30 million</b><br>Social demand: society would want <b>$52 million</b><br>Research lost: $52 − $30 = <b>$22 million</b></div>
<p>Check: the social number is larger in every row, as it must be when the spillover is a benefit.</p>
<p><b>So what:</b> for a positive externality, the market quantity is too low. Your course: the government "will want to push the market closer to the point that is socially beneficial." Lesson 34 shows how.</p>
<div data-check="l33c-pos"></div>

<h2>The efficient quantity and why the market misses it</h2>
<!-- src: CB (outline: "Marginal social benefit and marginal social cost"); CBS (sample Q7: "more than the socially optimum level because the marginal social cost is greater than the marginal private cost"); OS121 ("If no externalities existed, private costs would be the same as the costs to society as a whole, and private benefits would be the same as the benefits to society as a whole. Thus, if no externalities existed, the interaction of demand and supply will coordinate social costs and benefits"; "When there is market failure, the private market fails to achieve efficient output"). -->
<p>The ${dt('social-optimum','<b>socially optimal quantity</b>')} is where <b>MSB = MSC</b>. Below it, one more unit is worth more to society than it costs, so making it adds surplus. Above it, the reverse. The market instead stops where <b>MPB = MPC</b>.</p>
${FIG7.l33pair()}
<p><b>Why the two usually differ:</b> the textbook: "if no externalities existed, the interaction of demand and supply will coordinate social costs and benefits." With a spillover, one side of MSB = MSC is missing from the market\'s decision, so the market lands at the wrong quantity. Either way there is a deadweight loss: the shaded triangle of surplus that the right quantity would have kept.</p>
<p><b>So what:</b> the optimum is rarely zero. The textbook\'s refrigerators are worth making up to 40,000 even after counting pollution, so the goal is the right amount of the good, and with it the right amount of pollution.</p>
<div data-check="l33c-opt"></div>

<h2>Too much or too little?</h2>
<!-- src: CBS (sample Q7 format), OS121, MS7. Exam skill: name the spillover, decide cost or benefit, then say which way the market misses. -->
<p>CLEP externality questions follow one pattern. (1) Find the bystander. (2) Decide whether the spillover is a cost or a benefit. (3) Cost: MSC is above MPC and the market makes <b>too much</b>. Benefit: MSB is above MPB and the market makes <b>too little</b>. Watch the reasons in the answer choices, not just "more" or "less": College Board\'s sample offers both directions with right and wrong reasons.</p>
<div data-widget="extsort"></div>
<p>What to notice: every "too much" case had a cost landing on someone else, and every "too little" case had a benefit no one paid for.</p>
<div data-check="l33c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L33TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"Any cost or benefit of a trade is an externality."</span>Only effects on bystanders outside the deal, who are not paid or charged, count. The seller\'s own costs are not externalities.</li>
<li><span class="wrong">"With a negative externality, the market produces too little."</span>Too much. The producer ignores the harm, so its costs look lower than they really are and it makes more.</li>
<li><span class="wrong">"With pollution, marginal social cost is below marginal private cost."</span>Above. MSC = MPC + external cost, and the external cost is positive.</li>
<li><span class="wrong">"With a positive externality, the market produces too much."</span>Too little. Buyers count only their own benefit, so demand sits below marginal social benefit.</li>
<li><span class="wrong">"The best amount of pollution is zero."</span>The optimum is where MSB = MSC. Useful goods are worth some pollution; the aim is the right amount.</li>
<li><span class="wrong">"The free-market quantity is efficient even with an externality."</span>Only without spillovers. With one, the market leaves out part of the cost or benefit and causes a deadweight loss.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>An <b>externality</b> is the uncompensated effect of a trade on a bystander; it can be negative (harmful) or positive (helpful).</li>
<li><b>Marginal social cost</b> = marginal private cost + external cost; <b>marginal social benefit</b> = marginal private benefit + external benefit. Supply shows only private cost and demand only private benefit.</li>
<li>With a <b>negative externality</b> such as pollution, MSC is above supply and the market makes too much: refrigerators, 45,000 instead of 40,000.</li>
<li>With a <b>positive externality</b> such as education or research, MSB is above demand and the market makes too little: Big Drug, $30 million of research instead of $52 million.</li>
<li>The <b>socially optimal quantity</b> is where MSB = MSC; the market stops where MPB = MPC, and the gap is a deadweight loss.</li>
<li>On the exam, find the bystander, decide cost or benefit, then pick "too much" or "too little" with the right reason.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Marginal social benefit and marginal social cost," "Positive externalities" and "Negative externalities" under Market Failure and the Role of Government (8% to 14% of the exam). Expect a question like College Board\'s sample: "when a negative externality exists, the private market produces ..." with reasons built from MSC and MPC. Or expect a graph with a second cost or benefit curve.</p>
</div>`,
  deeper:`
<h3>Production and consumption externalities</h3>
<p>Some spillovers come from making a good (a factory\'s smoke) and some from using it (a driver\'s exhaust, a neighbor\'s loud music). The picture is the same either way: the missing cost or benefit opens a gap between the private and social curve. Textbooks sometimes draw a consumption externality on the demand side instead; the market still over- or under-produces in the same direction.</p>
<h3>"Positive" or "negative" can be a matter of wording</h3>
<p>Econlib\'s Bryan Caplan: "It is equivalent to say \'clean air has positive externalities and so clean air is underproduced\' or \'dirty air has negative externalities and so dirty air is overproduced.\'" On the exam, follow the scenario\'s own wording.</p>
<h3>How big are research spillovers?</h3>
<p>Your course textbook reports that inventors capture only a fraction of what their ideas are worth, and gives cases: Eli Whitney\'s cotton gin was widely copied, and Gordon Gould spent $100,000 on lawyers before getting a patent for the laser. The CLEP doesn\'t test these stories; they show why research spillovers are taken seriously.</p>`,
  links:[ {k:'Textbook',t:'12.1 The Economics of Pollution',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/12-1-the-economics-of-pollution',w:'The newer edition of your course textbook\'s §12.1: the concert example, the refrigerator market and the trumpet Work It Out. Wording and numbers may differ slightly from your 2016 edition.'},
          {k:'Article',t:'Externalities',s:'Econlib, Concise Encyclopedia of Economics (Bryan Caplan)',u:'https://www.econlib.org/library/Enc/Externalities.html',w:'A short, readable overview of positive and negative externalities and the debate over how big they are.'} ]
});

u7xv({
  'l33-def':[FIG7.l33who(), ''], 'l33-spill':[FIG7.l33who(), ''], 'l33-third':[FIG7.l33two(), ''], 'l33c-def':[FIG7.l33who(), ''],
  'l33-classify':[FIG7.l33two(), '"No externality, because the gardener chose to plant" mixes up voluntary actions with paid ones: the orchard owner pays nothing for the benefit (M1).'],
  'l33-msc':[FIG7.l33sum(), ''], 'l33c-msc':[fig(`<div class="u4io"><div class="u3step"><b>MPC</b><br>$50</div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>External cost</b><br>$15</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MSC</b><br>$65</div></div>`, 'The steel unit\'s full cost to society.'), ''],
  'l33-msb':[fig(`<div class="u4io"><div class="u3step"><b>Private benefit</b><br>$30</div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>External benefit</b><br>$20</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MSB</b><br>$50</div></div>`, 'The flu shot\'s full benefit: to the person who gets it plus to the people protected.'), ''],
  'l33-cbs':[fig(extGraph('neg'), 'Marked up: MSC above MPC (supply); the market quantity is beyond the optimum.'), ''],
  'l33-tf-toolittle':[fig(extGraph('neg'), 'Marked up: the market quantity is to the right of (larger than) the optimal quantity.'), ''],
  'l33-tf-efficient':[fig(extGraph('neg'), 'Marked up: the shaded triangle is the surplus the free market loses.'), ''],
  'l33-failure':[FIG7.l33chain(), ''], 'l33-coal':[FIG7.l33chain(), ''], 'l33-private-supply':[FIG7.l33sum(), ''], 
  'l33-edu':[FIG7.l33edu(), ''], 'l33-neighbor':[fig(extGraph('pos'), 'Marked up: MSB above demand; the bakery bakes less than the optimum.'), ''], 'l33c-pos':[fig(extGraph('pos'), 'Marked up: the market stops short of the optimum.'), ''],
  'l33-msb-msc-pos':[fig(extGraph('pos'), 'Marked up: at the market quantity, MSB is above the supply (MSC) curve, so more should be produced.'), ''],
  'l33-optimum':[FIG7.l33fgraph(), ''], 'l33-tf-zero':[FIG7.l33fgraph(), ''], 'l33c-opt':[FIG7.l33pair(), ''],
  'l33-overprod':[fig(extGraph('neg', { xlab:'Rush-hour car trips', ylab:'Cost per trip' }), 'Marked up: each driver\'s private cost is below the marginal social cost, so there are too many rush-hour trips.'), ''],
  'l33c-neg':[fig(extGraph('neg', { xlab:'Chemicals produced', ylab:'Price' }), 'Marked up: the plant\'s output (market) is beyond the optimum.'), ''],
  'l33-fridge-q':[FIG7.l33fgraph(), '']
});
u7cv('l33', {});
