/* ===== Lesson 34 figures ===== */
/* Your course textbook's particulate example (§12.3, Figure 12.3): cost of cutting each successive 10 pounds of a firm's 50 pounds a year, and a $1,000 tax per 10 pounds emitted.
   Abate while the cost of the next 10 pounds is below the tax: $300, $500, $900 < $1,000 → cut 30 pounds; $1,500 > $1,000 → pay the tax on the last 20 pounds (checked by script). */
const AB_C = [300,500,900,1500,2500], AB_T = 1000;
/* Your course textbook's marketable permits (§12.3, Table 12.4), tons of lead. */
const PM = [ ['Alpha',200,100,150,'Buys 50'], ['Beta',400,200,200,'Neither'], ['Gamma',600,300,200,'Sells 100'], ['Delta',0,0,50,'Buys 50'] ];
/* Made-up numbers for "why economists prefer the tax" (slide 263's argument): Firm A can cut up to 20 tons at $200 a ton, Firm B up to 20 tons at $800 a ton.
   Goal: cut 20 tons in total. Same-rule-for-all: each cuts 10 → 10 × 200 + 10 × 800 = $10,000. Tax of $500 a ton: A cuts all 20 ($200 < $500), B cuts none ($800 > $500) → 20 × 200 = $4,000. */

/* small shift pictures for answer choices, product-market labels (reuses Unit 6's u6shift pictures with neutral axes) */
const SD7 = { Dr:'demand shifts right (D1 to D2)', Dl:'demand shifts left (D1 to D2)', Sr:'supply shifts right, or down (S1 to S2)', Sl:'supply shifts left, or up (S1 to S2)', mv:'no curve shifts; a movement along the demand curve' };
const shift7 = (k, ok) => ({ svg: L => u6shift(k, 'Graph ' + L, 'Quantity', 'Price'), desc: SD7[k], ok: !!ok });

/* L34 V1: internalizing an externality, both directions (slide 261) */
FIG7.l34int = () => fig(atable(['Problem','Tools that internalize it','Result'], [
  ['<b>Negative</b> (pollution): market ignores a cost to bystanders','Taxes or regulation that raise private cost toward social cost','Less output, less pollution'],
  ['<b>Positive</b> (education): market ignores a benefit to bystanders','Subsidies, tax breaks and regulation that raise private benefit toward social benefit','More output (more schooling)']
], { cls:'u7t compact wrap' }), 'Your course\'s slide 261 in table form. Both rows close the same gap: they make the decision maker feel the part of the cost or benefit that used to fall on someone else.');

/* L34 V2: a corrective tax equal to the external cost moves supply onto MSC (made-up lines, same as Lesson 33) */
FIG7.l34tax = () => fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity', ylab:'Price', aria:'A per-unit tax equal to the external cost shifts supply up to MSC',
  lines:[ {a:[0,9],b:[10,1],c:DC,label:'D = MSB',lx:-4,ly:-8,anchor:'end'}, {a:[0,1],b:[10,9],c:OLD,dash:'5 4',w:2,label:'S = MPC (before)',lx:-4,ly:16,anchor:'end'}, {a:[0,3],b:[7.5,9],c:'var(--bad)',label:'S + tax = MSC',lx:-4,ly:-8,anchor:'end'} ],
  arrows:[{a:[6,5.8],b:[6,7.6]}], vls:[{q:5,p:5},{q:3.75,p:6}], spans:[{q:1.2,p1:1.96,p2:3.96,label:'tax',lx:8,ly:4,anchor:'start'}],
  dots:[ {q:5,p:5,label:'Before',c:'var(--muted)',lx:8,ly:14}, {q:3.75,p:6,label:'After = optimum',c:'var(--ink)',lx:-8,ly:-8,anchor:'end'} ] }),
  'Made-up lines. A tax per unit equal to the external cost raises the firm\'s cost of every unit by that amount, so the supply curve moves up onto the MSC curve. The new equilibrium is the social optimum: less output and less pollution.');

/* L34 V3: a subsidy equal to the external benefit moves demand onto MSB (made-up lines) */
FIG7.l34sub = () => fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity of schooling', ylab:'Value of schooling', aria:'A per-unit subsidy equal to the external benefit shifts demand up to MSB',
  lines:[ {a:[0,1],b:[10,9],c:SC,label:'S = MSC',lx:-4,ly:16,anchor:'end'}, {a:[0,9],b:[10,1],c:OLD,dash:'5 4',w:2,label:'D = MPB (before)',lx:-4,ly:-8,anchor:'end'}, {a:[0,11],b:[10,3],c:'var(--g2)',label:'D + subsidy = MSB',lx:-4,ly:-8,anchor:'end'} ],
  arrows:[{a:[3,6.8],b:[3,8.4]}], vls:[{q:5,p:5},{q:6.25,p:6}],
  dots:[ {q:5,p:5,label:'Before',c:'var(--muted)',lx:-8,ly:14,anchor:'end'}, {q:6.25,p:6,label:'After = optimum',c:'var(--ink)',lx:8,ly:14} ] }),
  'Made-up lines for your course\'s education example. A subsidy per unit equal to the benefit to others raises what schooling is worth to each student by that amount, so demand moves up onto MSB. The quantity rises to the social optimum.');

/* L34 V4: command-and-control vs market-based (slides 262-263; textbook §12.2's three weaknesses, §12.3) */
FIG7.l34cmp = () => fig(`<div class="u3pair">
  <div class="u3card"><p class="u3h">Command-and-control</p><p><b>How:</b> limits on pollution, or required equipment (EPA rules)</p><p><b>Strength:</b> the textbook credits these laws with "America\'s cleaner air and water"</p><p><b>Weaknesses (textbook):</b> (1) no reward for cutting below the limit; (2) one standard for all, cheap and costly cutters alike; (3) loopholes from political compromise</p></div>
  <div class="u3card ok"><p class="u3h">Market-based</p><p><b>How:</b> corrective taxes, subsidies, tradable permits, clearer property rights</p><p><b>Strength:</b> firms that can cut cheaply cut the most, so the same cleanup costs less</p><p><b>Catch (textbook):</b> works poorly if the tax is set too low or permits barely shrink</p></div></div>`,
  'Your course\'s two kinds of policy (slides 262-264) with the textbook\'s assessment. Both can reduce pollution; the difference is who does the cutting and at what cost.');

/* L34 V5: the textbook's abatement costs against the tax (Figure 12.3) */
FIG7.l34abate = () => fig(`<div class="qg" style="max-width:420px">${u7barsTax(AB_C, AB_T, { labels:['1st 10 lb','2nd','3rd','4th','5th'], ylab:'Cost to cut ($)', xlab:'Each 10 pounds cut', ymax:2600, colorOf:(v)=> v < AB_T ? 'var(--accent)' : 'var(--bad)' })}</div>
  <div class="math">Tax: $1,000 for every 10 pounds still emitted<br>Cut while the next 10 pounds costs less than $1,000: $300, $500, $900 → <b>cut 30 pounds</b><br>The 4th 10 pounds costs $1,500 > $1,000 → pay the tax on the last <b>20 pounds</b> instead</div>`,
  'Your course textbook\'s Figure 12.3. Green bars cost less than the tax, so cutting is cheaper than paying; red bars cost more, so the firm pays the tax. Notice the costs rise: the first cuts are the cheapest.');

/* L34 V6: why the tax beats the same rule for everyone (slide 263's argument; made-up numbers) */
FIG7.l34why = () => fig(atable(['','Firm A ($200 a ton)','Firm B ($800 a ton)','Total cost'], [
  ['Same rule: each cuts 10 tons','10 tons: $2,000','10 tons: $8,000','<b>$10,000</b>'],
  ['Tax of $500 a ton emitted','20 tons: $4,000','0 tons; pays the tax','<b>$4,000</b>']
], { cls:'u7t compact wrap', hl:{1:{row:'u3z2'}} }), 'Made-up numbers for the slide\'s argument. Each firm can cut at most 20 tons. The same 20 tons get cut either way, but the tax lets the cheap cutter do all of it, saving $6,000 of real resources. (The tax Firm B pays, $500 on each ton it still emits, is a transfer to the government, not a resource used up.)');

/* L34 V7: the course's two-firm permit trade (slide 264) */
FIG7.l34trade = () => fig(flow([
  'EPA rule: two firms together may emit <b>300 tons</b> of glop a year.',
  {split:[[{t:'<b>Firm A</b> wants to emit more.',c:'u3up'}],[{t:'<b>Firm B</b> can cut cheaply.',c:'u3up'}]]},
  'Firm A pays Firm B <b>$5 million</b>; B cuts by the same amount A adds.',
  {t:'Total pollution is still <b>300 tons</b>, and both firms chose the deal, so both are better off.',c:'u3end'}
]), 'Your course\'s slide 264. Firm A, which values polluting most, pollutes more; Firm B, which can cut cheaply, cuts by the same amount. The cutting is done where it costs least, and the total doesn\'t change, so no bystander is worse off.');

/* L34 V8: the textbook's permit table (Table 12.4) */
FIG7.l34perm = () => fig(atable(['Firm','Now','Allowed','Actual','Trade'],
  PM.map(r=>[r[0], r[1], r[2], r[3], r[4]]), { cls:'u7t compact wrap', hl:{0:{4:'u3z1'},2:{4:'u3z2'},3:{4:'u3z1'}} }),
  'Your course textbook\'s Table 12.4, in tons of lead: emissions now (permits for these were given free), what the permits allow next year, actual emissions next year, and permits bought or sold. Permits shrink by half, from 1,200 tons in total to 600. Gamma cuts cheaply (600 to 200) and sells its spare 100 tons; Alpha and new firm Delta buy. Actual emissions add up to 600 tons, exactly the cap.');

/* L34 V9: Coase and property rights (textbook §12.3; Econlib, Caplan) */
FIG7.l34coase = () => fig(flow([
  'A railroad\'s sparks sometimes set a farmer\'s field on fire.',
  {split:[[{t:'If the <b>farmer</b> has the right to an unburned field, the railroad pays to prevent fires.',c:'u3up'}],[{t:'If the <b>railroad</b> has the right to run its trains, the farmer pays to protect the field.',c:'u3up'}]]},
  {t:'Either way, someone now has a reason to find the <b>cheapest fix</b> (a spark guard or a fence).',c:'u3end'}
]), 'Your course textbook\'s railroad and farmer, from Ronald Coase. The spillover is a problem because no one clearly owns the right. Once a property right is clear, the two sides can bargain to the cheapest solution.');

/* ===== Lesson 34: Fixing Externalities: Taxes, Subsidies, Regulation and Permits (video 7.1 second part; Module 7 slides 261-265) =====
   Common mistakes: M1 tax helpful activities and subsidize harmful ones · M2 the right tax is the whole price or the total damage
   M3 command-and-control is always cheaper / always better · M4 tradable permits raise total pollution · M5 a pollution tax makes every firm cut the same amount
   M6 internalizing means banning the activity */
const abTbl = (costs, unit='10 pounds') => atable([`Each ${unit} cut`,'Cost of that cut'], costs.map((c,i)=>[ordinal(i+1), usd7(c)]), { cls:'u7t compact' });

mc('l34-int-def','l34','What does it mean to "internalize" an externality?',
  [`Change incentives so that people take the external effects of their actions into account`,`Ban the activity that causes the externality`,`Move the polluting firm to another country`,`Let the market reach its equilibrium without any change`,`Make the bystanders pay the full cost of the spillover`],0,
  `<p>Your course (slide 261): internalizing means "Altering the incentives so that people take account of the external effects of their actions." A tax or subsidy does this by putting a price on the spillover. Banning it goes too far: the optimum is usually not zero (M6).</p>`);
mc('l34-tax-neg','l34','A government places a tax on each unit of a good whose production pollutes, equal to the external cost per unit. Which of the following is the most likely result?',
  [`Output falls toward the socially optimal quantity`,`Output rises toward the socially optimal quantity`,`Output falls to zero`,`Output is unchanged, because firms pay the tax out of profit`,`The external cost per unit rises`],0,
  `<p>The tax adds the external cost to the firm\'s own cost, so supply shifts up onto the marginal social cost curve. The new equilibrium is where demand meets MSC: the optimum. It cuts output to the right level, not to zero (M6).</p>`);
gen('l34-g-tax','l34',()=>{
  let a, c, e; do { a = pick([30,34,36,40,44]); c = pick([4,6,8,10]); e = pick([2,4,6,8]); } while((a-c-e) <= 4);
  const qm = (a-c)/2, qt = (a-c-e)/2, pt = a - qt;
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. A market has demand <b>P = ${a} − Q</b> and supply (marginal private cost) <b>P = ${c} + Q</b>. Each unit causes <b>$${e}</b> of external cost. The government sets a tax of <b>$${e} per unit</b> on sellers. How many units will be sold after the tax?`, answer:qt,
    explain:`<div class="math">Supply with the tax: P = ${c} + Q + ${e} = ${c+e} + Q<br>Set equal to demand: ${a} − Q = ${c+e} + Q<br>2Q = ${a-c-e}, so Q = <b>${qt}</b> units (price $${pt})</div><p>This is exactly the socially optimal quantity, because a tax equal to the external cost turns the supply curve into the MSC curve. The common slip is the pre-tax quantity, ${qm}, or subtracting the tax twice.</p>${fig(sdg({ xmax:a, ymax:a, xt:[0,qt,qm], yt:[0], xlab:'Quantity', ylab:'Price ($)', aria:'Marked-up generated tax graph',
      lines:[ {a:[0,a],b:[a,0],c:DC,label:'D',lx:-4,ly:-8,anchor:'end'}, {a:[0,c],b:[a-c,a],c:OLD,dash:'5 4',w:2,label:'S before',lx:-4,ly:16,anchor:'end'}, {a:[0,c+e],b:[a-c-e,a],c:'var(--bad)',label:'S + tax = MSC',lx:-4,ly:-8,anchor:'end'} ],
      vls:[{q:qt,p:pt},{q:qm,p:a-qm}], dots:[ {q:qm,p:a-qm,label:'Before',c:'var(--muted)',lx:8,ly:14}, {q:qt,p:pt,label:'After',c:'var(--ink)',lx:-8,ly:-8,anchor:'end'} ] }), `Marked up with these numbers: the tax moves supply up by $${e}, from ${qm} units to ${qt}.`)}`
  };
});
mc('l34-sub-pos','l34','Which government policy would move a market with a positive externality, such as vaccinations, toward the socially optimal quantity?',
  [`A subsidy to buyers equal to the external benefit per unit`,`A tax on buyers equal to the external benefit per unit`,`A price ceiling below the market price`,`A ban on the good`,`A tax on sellers equal to the external benefit per unit`],0,
  `<p>The market makes too little, so policy must raise the quantity. A subsidy adds the external benefit to what each buyer gets, moving demand up onto MSB. Your course: "subsidies on education or laws that force people to stay in school." A tax would cut the quantity further (M1).</p>`);
lazy('l34-gr-tax','l34',()=>visMC({
  prompt:`A per-unit tax is placed on the sellers of a good whose production pollutes, equal to the pollution damage per unit. Which graph shows the effect of the tax on the market?`,
  choices:[ shift7('Sl',true), shift7('Sr'), shift7('Dr'), shift7('Dl'), shift7('mv') ],
  explain: L => `<p><b>Graph ${L}</b>: supply shifts left (up). The tax raises the sellers\' cost of every unit by the tax, so at each price they offer less. Price rises and quantity falls.</p>${u6shiftBig('Sl', 'Graph '+L+' marked up: the tax moves supply from S1 up to S2 (onto marginal social cost); price rises from P1 to P2 and quantity falls.', 'P1', 'P2', 'Quantity', 'Price')}<p>A rightward supply shift would mean the tax made production cheaper, and a subsidy would do that (M1). The tax is on sellers here, so demand doesn\'t shift.</p>`
}));
mc('l34-cc-def','l34','Which of the following is an example of command-and-control regulation?',
  [`An EPA rule setting the maximum amount of a pollutant a factory may emit`,`A tax on each ton of pollution emitted`,`Permits to pollute that firms can buy and sell`,`A subsidy for each electric car sold`,`Assigning a farmer the legal right to an unburned field`],0,
  `<p>Your course (slide 262): command-and-control requires or forbids behaviors; the EPA\'s rules "include maximum levels of pollution allowed or required adoption of a particular technology." The tax, permits and subsidy are market-based tools; the property right is the Coase approach.</p>`);
mc('l34-abate','l34',`Your course textbook\'s factory emits 50 pounds of soot a year. Cutting it costs more for each further 10 pounds:${abTbl(AB_C)}The government charges a tax of <b>$1,000 for every 10 pounds</b> the factory still emits. How many pounds will the factory cut?`,
  [`10 pounds`,`20 pounds`,`30 pounds`,`40 pounds`,`50 pounds`],2,
  `<p>The factory cuts whenever cutting is cheaper than paying the tax. $300, $500 and $900 are each less than $1,000, so it cuts those 30 pounds. The 4th 10 pounds would cost $1,500, more than the $1,000 tax, so it pays the tax instead. Answer: <b>30 pounds</b>.</p>${FIG7.l34abate()}<p>"50 pounds" assumes a tax makes a firm cut everything (M6). "40 pounds" counts the $1,500 step, which costs more than the tax.</p>`);
gen('l34-g-abate','l34',()=>{
  let costs, T; do { const c1 = pick([100,150,200,250]); costs=[c1]; while(costs.length<5) costs.push(costs[costs.length-1] + pick([100,150,200,300])); T = pick([300,450,600,750,900,1100]); } while(costs.some(c=>c===T) || T<=costs[0] || T>costs[4]);
  const n = costs.filter(c=>c<T).length, ans = n*10;
  return { type:'num', kind:'num', unit:'tons', prompt:`Made-up numbers. A power plant emits 50 tons of a pollutant a year. The cost of cutting each further 10 tons is:${abTbl(costs,'10 tons')}The government charges <b>$${T.toLocaleString('en-US')} for every 10 tons</b> still emitted. How many tons will the plant cut?`, answer:ans,
    explain:`<p>Cut while the next 10 tons costs less than the $${T.toLocaleString('en-US')} tax: ${costs.map(c=>c<T?`<b>$${c.toLocaleString('en-US')}</b>`:`$${c.toLocaleString('en-US')}`).join(', ')}. The first ${n} steps are cheaper, so the plant cuts <b>${ans} tons</b> and pays the tax on the other ${50-ans}.</p>${fig(`<div class="qg" style="max-width:420px">${u7barsTax(costs, T, { labels:['1st','2nd','3rd','4th','5th'], ylab:'Cost to cut ($)', xlab:'Each 10 tons cut', colorOf:(v)=> v < T ? 'var(--accent)' : 'var(--bad)' })}</div>`, `Marked up: green steps cost less than the $${T.toLocaleString('en-US')} tax and get cut; red steps cost more, so the plant pays the tax on them.`)}<p>The common slip is counting the first step that costs <i>more</i> than the tax. A firm never pays more to cut 10 tons than it would pay in tax on them (M5).</p>`
  };
});
mc('l34-why-tax','l34','Why do many economists prefer a corrective tax on pollution to a rule requiring every firm to cut pollution by the same amount?',
  [`Firms that can cut pollution cheaply cut the most, so the same total cut costs less`,`A tax always eliminates pollution completely`,`A tax requires every firm to cut by the same amount`,`Firms with high cutting costs are forced to shut down`,`A tax doesn\'t change firms\' incentives`],0,
  `<p>Your course (slide 263): with a tax, "firms that can reduce pollution with the least cost are likely to do so (to avoid the tax) while firms that encounter high costs when reducing pollution will simply pay the tax." The cleanup goes to the cheapest cutters.</p>${FIG7.l34why()}<p>"Every firm cuts by the same amount" describes the uniform rule, not the tax (M5).</p>`);
mc('l34-permit','l34','The EPA limits two firms to 300 tons of pollution a year in total. Firm A wants to pollute more, and Firm B agrees to cut its pollution by the same amount if Firm A pays it $5 million. If the EPA allows the deal, which of the following is true?',
  [`Total pollution stays at 300 tons, and both firms are better off`,`Total pollution rises, so society is worse off`,`Total pollution falls to zero`,`Firm B is worse off, because it must pollute less`,`Firm A pays a tax to the EPA`],0,
  `<p>Your course (slide 264): "Social welfare is increased if the EPA allows this situation. Total pollution remains the same so there are no external effects. If both firms are doing this willingly, it must make them better off." Firm B chose the deal, so the $5 million is worth more to it than the cut costs (M4).</p>`);
tf('l34-tf-permits','l34','Letting firms buy and sell pollution permits increases the total amount of pollution, because polluters can buy more permits.',false,
  `<p>False. The total number of permits is fixed (capped). Trading only changes which firms do the cutting: a firm that buys one more permit is matched by a firm that sold it and cut its own pollution. The textbook\'s Table 12.4 adds up to exactly the cap (M4).</p>`);
lazy('l34-gr-sub','l34',()=>visMC({
  prompt:`To encourage more schooling, a government gives each student a payment for every year of school completed, equal to the benefit to society beyond the student\'s own. Which graph shows the effect on the market for schooling?`,
  choices:[ shift7('Dr',true), shift7('Dl'), shift7('Sl'), shift7('mv'), shift7('Sr') ],
  explain: L => `<p><b>Graph ${L}</b>: demand shifts right (up). The payment adds to what each year of school is worth to the student, so students demand more at every price.</p>${u6shiftBig('Dr', 'Graph '+L+' marked up: the payment moves demand from D1 to D2 (toward marginal social benefit); the quantity of schooling rises.', 'P1', 'P2', 'Years of school', 'Price')}<p>A supply shift would describe a payment to schools, not to students. A movement along demand would need a change in price only.</p>`
}));
mc('l34-alpha','l34',`Your course textbook\'s marketable permits for lead. Each firm is given permits for its current emissions, and next year each permit allows only half as much.${atable(['Firm','Now (tons)','Permits next year','Actual next year'], PM.map(r=>[r[0], r[1], r[2], r[3]]), { cls:'u7t compact' })}Which firm sells permits?`,
  [`Gamma`,`Alpha`,`Beta`,`Delta`,`No firm sells permits`],0,
  `<p>A firm sells permits when it emits less than its permits allow. Gamma\'s permits allow 300 tons but it emits only 200, so it sells permits for 100 tons. Alpha (150 vs 100) and Delta (50 vs 0) emit more than their permits allow, so they buy. Beta uses exactly 200.</p>${FIG7.l34perm()}<p>Picking the firm that cut the least gets it backwards: the firm that can cut cheaply cuts the most and sells.</p>`, 'mc');
/* L34 more */
tf('l34-tf-ban','l34','The best way to deal with any negative externality is to ban the activity that causes it.',false,
  `<p>False. A ban gives up all the value of the good. The aim is the quantity where marginal social benefit equals marginal social cost, which is usually above zero. Taxes, permits and regulation can reach it (M6).</p>`);
mc('l34-epa','l34','In the United States, which agency develops and enforces regulations aimed at protecting the environment?',
  [`The Environmental Protection Agency (EPA)`,`The Federal Trade Commission (FTC)`,`The Department of Justice`,`The Federal Reserve`,`The Bureau of Labor Statistics`],0,
  `<p>Your course (slide 262): "the Environmental Protection Agency (EPA) develops and enforces regulations aimed at protecting the environment." The textbook adds that the EPA was created in 1970. The FTC and Justice Department enforce antitrust laws (Lesson 36).</p>`);
mc('l34-cc-weak','l34','Which of the following is a weakness of command-and-control environmental regulation?',
  [`It gives firms no reason to cut pollution below the legal limit`,`It always lets pollution rise`,`It lets firms buy and sell the right to pollute`,`It charges firms a tax on every unit emitted`,`It has never reduced pollution in the United States`],0,
  `<p>The textbook: "command-and-control regulation offers no incentive to improve the quality of the environment beyond the standard set by a particular law." Its other weaknesses: one standard for all firms, and loopholes from politics. But it adds that these laws "have been largely responsible for America\'s cleaner air and water," so "never reduced pollution" is wrong (M3).</p>`);
gen('l34-g-uniform','l34',()=>{
  let cA, cB, k; do { cA = pick([100,150,200,250,300]); cB = pick([400,500,600,800,900]); k = pick([5,10,15,20]); } while(cB <= cA*1.5);
  const uni = k*cA + k*cB, taxc = 2*k*cA;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Firm A can cut pollution at <b>$${cA} a ton</b> (up to ${2*k} tons); Firm B at <b>$${cB} a ton</b>. The goal is to cut <b>${2*k} tons</b> in total. Under a rule requiring each firm to cut ${k} tons, what is the total cost of the cleanup?`, answer:uni,
    explain:`<div class="math">Firm A: ${k} × $${cA} = $${(k*cA).toLocaleString('en-US')}<br>Firm B: ${k} × $${cB} = $${(k*cB).toLocaleString('en-US')}<br>Total = <b>$${uni.toLocaleString('en-US')}</b></div><p>If instead a tax between $${cA} and $${cB} a ton made A do all ${2*k} tons, the same cleanup would cost ${2*k} × $${cA} = $${taxc.toLocaleString('en-US')}, saving $${(uni-taxc).toLocaleString('en-US')}. That is your course\'s reason economists prefer the tax (M3). A common slip is pricing all ${2*k} tons at one firm\'s cost.</p>${fig(atable(['','Firm A','Firm B','Total cost'], [['Same rule for all', `${k} tons, $${(k*cA).toLocaleString('en-US')}`, `${k} tons, $${(k*cB).toLocaleString('en-US')}`, `<b>$${uni.toLocaleString('en-US')}</b>`], ['Tax between the two costs', `${2*k} tons, $${taxc.toLocaleString('en-US')}`, '0 tons; pays the tax', `$${taxc.toLocaleString('en-US')}`]], { cls:'u7t compact wrap', hl:{0:{row:'u3z2'}} }), 'Marked up: the same total cut, done by the cheaper firm under the tax.')}`
  };
});
mc('l34-coase','l34','A railroad\'s sparks sometimes set a farmer\'s field on fire. According to economist Ronald Coase, what must happen before this spillover can be resolved?',
  [`Property rights must be clearly defined, so one side has a reason to pay for the cheapest fix`,`The railroad must be shut down`,`The government must buy the farm`,`The farmer must always pay`,`The railroad must always pay`],0,
  `<p>The textbook: Coase "pointed out that this issue cannot be resolved until property rights are clearly defined." Once either side has a clear legal right, the other "will seek out and pay for the least costly method of reducing the risk." Which side pays depends on who holds the right, so "always" choices are wrong.</p>`);
tf('l34-tf-subsidy-neg','l34','A good way to correct a negative externality is to subsidize the good that causes it.',false,
  `<p>False. A subsidy lowers producers\' cost or raises buyers\' benefit, so the quantity rises, and the market was already making too much. Harmful spillovers call for a tax or limits; helpful spillovers call for a subsidy (M1).</p>`);
mc('l34-patent','l34','Private firms tend to underinvest in research because others can copy their ideas. Which government policy addresses this by letting an inventor keep more of the benefit?',
  [`Granting patents, which give the inventor an exclusive right to sell the invention for a time`,`Taxing every new invention`,`Banning firms from copying any product forever`,`Setting a price ceiling on new drugs`,`Breaking up firms that do research`],0,
  `<p>The textbook (§13.2): intellectual property rights, such as patents, "give the inventor the exclusive legal right to make, use, or sell the invention for a limited time." That raises the private return toward the social return, so more research is done. The textbook also names government help with research costs and university-company partnerships.</p>`);
mc('l34-quota','l34','A government makes a polluting factory account for the social cost of its pollution, using either a tax or a quota on pollution. What do both policies do to the factory?',
  [`Raise its cost of producing, so it produces less`,`Lower its cost of producing, so it produces more`,`Raise the demand for its product`,`Leave its output unchanged`,`Pay it to keep producing the same amount`],0,
  `<p>Your course: "Either of these types of government policies are going to force the social cost to be taken into account by the firm so that their costs are rising ... The result is that the firm ends up producing less widgets." Both make polluting costly.</p>`);
mc('l34-gas','l34','Some policies work as charges on pollution even though they aren\'t called that. Which of the following acts as a charge on the air pollution that cars produce?',
  [`Taxes on gasoline`,`A subsidy for each electric car sold`,`An EPA limit on tailpipe emissions`,`A price ceiling on gasoline`,`A rule that every car carry the same filter`],0,
  `<p>The textbook: governments "impose taxes on gasoline. We can view this tax as a charge on the air pollution that cars generate." It also counts refundable bottle deposits and "pay as you throw" garbage fees. An electric-car subsidy rewards a cleaner choice rather than charging for pollution (M1), and tailpipe limits and filter rules are command-and-control (M3). A price ceiling would make driving cheaper.</p>`);
mc('l34-paythrow','l34','Some towns charge households for each bag of garbage they put out ("pay as you throw") instead of a flat fee. Compared with the flat fee, why does this reduce garbage?',
  [`Households pay more when they throw away more, so they have a reason to throw away less and recycle more`,`They ban households from throwing anything away`,`They make garbage collection free`,`They pay households to produce more garbage`,`They require every household to throw away the same amount`],0,
  `<p>The textbook: "When people have a financial incentive to put out less garbage and to increase recycling, they find ways of doing so." Charging per unit of garbage works like a pollution charge at the household level.</p>`);
mc('l34-sulfur','l34','The 1990 amendments to the Clean Air Act aimed to cut sulfur dioxide from power plants to half of 1980 levels. Which tool did they use?',
  [`Marketable permits, given free to power plants, that shrank over time`,`A ban on all coal-burning power plants`,`A fixed subsidy for each ton of sulfur dioxide emitted`,`A rule requiring every plant to install the same equipment`,`A breakup of the largest power companies`],0,
  `<p>The textbook: the law aimed to cut sulfur dioxide "to half of the 1980 levels"; the permits "were free of charge" and were "of the \'shrinkable\' type; that is, the amount of pollution allowed by a given permit declined with time."</p>`);
mc('l34-delta','l34','A city caps lead emissions with tradable permits, handed out free to the firms already operating. A new firm, Delta, wants to start up and emit 50 tons. What must it do?',
  [`Buy permits for 50 tons from a firm with spare permits`,`Get new permits free from the government`,`Pay nothing, because new firms are exempt`,`Emit without permits, since the total is unchanged`,`Shut down a rival firm`],0,
  `<p>The textbook: "Firm Delta did not even exist in the first period, so the only way it can start production is to purchase permits to emit 50 tons of lead." Under a cap, new pollution must be matched by permits bought from someone who cut.</p>`);
tf('l34-tf-cc-works','l34','Command-and-control environmental laws, such as the Clean Air Act and the Clean Water Act, have helped make U.S. air and water cleaner.',true,
  `<p>True. The textbook: these laws "have been largely responsible for America\'s cleaner air and water in recent decades." Its criticism is about cost and flexibility, not about whether they work (M3).</p>`);
mc('l34-school-law','l34','Besides subsidies, which policy would push the amount of education toward the socially optimal level?',
  [`Laws requiring people to stay in school until a given age`,`A tax on school tuition`,`A cap on the number of students`,`Tradable permits for schooling`,`Breaking up large schools`],0,
  `<p>Your course: governments "can try to do this through subsidies on education or laws that force people to stay in school until a given age." That is a command-and-control rule aimed at a positive externality.</p>`);
mc('l34-tax-size','l34','Made-up numbers. Each unit of a good causes $8 of pollution damage to others. The good sells for $40. To move the market to the socially optimal quantity, what per-unit tax should the government set?',
  [`$8`,`$32`,`$40`,`$48`,`$320`],0,
  `<p>The right corrective tax equals the external cost per unit, <b>$8</b>, so the firm\'s cost rises to the full social cost. $40 is the price; taxing the whole price overshoots (M2). $48 adds the two.</p>${fig(`<div class="u4io"><div class="u3step"><b>Firm\'s own cost</b><br>MPC</div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>Tax</b><br>$8 a unit</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MPC + $8</b><br>= MSC</div></div>`, 'Marked up: an $8 tax adds exactly the $8 of damage to every unit\'s cost; the $40 price plays no part.')}`);
mc('l34-firms-cut','l34','Made-up numbers. A pollution tax of $50 a ton applies to two firms. Firm X can cut pollution at $20 a ton; Firm Y at $90 a ton. What will each firm do?',
  [`X cuts its pollution; Y pays the tax`,`Y cuts its pollution; X pays the tax`,`Both cut by the same amount`,`Neither cuts, because both pay the tax`,`Both shut down`],0,
  `<p>A firm cuts when cutting is cheaper than the tax. X: $20 < $50, so it cuts. Y: $90 > $50, so it pays the tax. That sorting is the whole point of the tax: the cheap cutter does the cutting (M5).</p>`);
/* ===== Lesson 34 quick checks ===== */
mc('l34c-int','l34','Which tool internalizes a positive externality by raising the private benefit toward the social benefit?',
  [`A tax break or subsidy for the activity`,`A tax on the activity`,`A quota limiting the activity`,`A ban on the activity`,`A tradable permit to limit the activity`],0,
  `<p>Slide 261: for a benefit gap, "government can introduce tax breaks, subsidies, and regulation to enhance the private benefit." Taxes and quotas cut the activity, the wrong direction for a positive externality (M1).</p>`);
mc('l34c-tax','l34','Made-up numbers. A factory\'s product causes $15 of pollution damage per unit. What per-unit tax would make the factory\'s supply match the marginal social cost?',
  [`$0`,`$7.50`,`$15`,`$30`,`$150`],2,
  `<p>The tax should equal the external cost per unit, <b>$15</b>, so private cost plus tax equals social cost (M2).</p>${fig(`<div class="u4io"><div class="u3step"><b>MPC</b></div><div class="u3arrow" aria-hidden="true">+</div><div class="u3step"><b>Tax</b><br>$15</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>MPC + $15 = MSC</b></div></div>`, 'Marked up: the tax adds the $15 of damage to every unit.')}`);
mc('l34c-cc','l34','Made-up scenario, new to this lesson. A city requires every taxi to install the same exhaust filter, whatever it costs. This policy is',
  [`Command-and-control regulation`,`A corrective tax`,`A tradable permit system`,`A subsidy`,`A property rights solution`],0,
  `<p>It requires a specific technology, the textbook\'s definition of command-and-control. Its weakness: taxis that could cut fumes more cheaply some other way can\'t, and none has a reason to do better than the rule.</p>`);
mc('l34c-abate','l34','Made-up numbers. A pollution tax is $400 a ton. A firm\'s cost of cutting the next ton is $250. What will the firm do with that ton?',
  [`Cut it, because cutting costs less than the tax`,`Pay the tax, because paying is cheaper`,`Shut down`,`Pay the tax, because a firm always prefers paying to cutting`,`Nothing, because the tax doesn\'t apply`],0,
  `<p>$250 to cut vs $400 in tax: cutting saves $150. A firm keeps cutting until the next ton costs more than the tax.</p>`);
mc('l34c-permit','l34','Under a tradable permit system, which firms end up selling permits?',
  [`Firms that can cut pollution cheaply`,`Firms that find cutting pollution very costly`,`New firms entering the market`,`Firms that pollute the most`,`Every firm sells the same number`],0,
  `<p>Your course (slide 264): "Firms that could control pollution most inexpensively would do so and sell their permits, while those who encounter high costs when reducing pollution would buy additional permits."</p>`);
mc('l34c-coase','l34','Made-up scenario. A rancher\'s cattle sometimes stray into a neighbor\'s cornfield. The law gives the farmer the right to an undamaged field. Who now has a reason to pay for a fence?',
  [`The rancher, who must pay for any damage his cattle cause`,`The farmer, because the corn is his`,`The government, because the problem is an externality`,`No one, because a fence can never be worth its cost`,`Both equally, because the law must split every cost`],0,
  `<p>With the right on the farmer\'s side, the rancher bears the cost of the damage, so he has a reason to find the cheapest fix, perhaps a fence. If the law gave the rancher the right instead, the farmer would pay. Coase\'s point: once the right is clear, someone has a reason to solve it.</p>${FIG7.l34coase()}`);
mc('l34c-skill','l34','Made-up scenario. Fertilizer runoff from farms pollutes a lake, and the state wants the same total cut at the lowest cost. Which policy fits best?',
  [`A tax on each pound of runoff, or tradable runoff permits`,`A rule that every farm cut runoff by the same amount`,`A subsidy for each pound of fertilizer used`,`A price ceiling on fertilizer`,`No policy, because runoff is a positive externality`],0,
  `<p>Market-based tools let the farms that can cut cheaply do most of the cutting, so the same total cut costs less (M3). A fertilizer subsidy would add runoff (M1).</p>`);

/* Course materials checked 2026-11-19: video 7.1 transcript (internalization; "command-and-control ... direct government regulations"; "market-based policies ... a corrective tax, tax subsidies and pollution permits"; taxes or quotas; subsidies or school-leaving laws),
   Module 7 slides 261-265 (internalizing; EPA; corrective tax and why economists prefer it; tradable permits: 300 tons of glop, $5 million; key takeaways);
   course textbook §12.2 (command-and-control; EPA 1970; Clean Air Act, Clean Water Act; three weaknesses), §12.3 (pollution charges, Figure 12.3: $300/$500/$900/$1,500/$2,500 vs $1,000 → 30 pounds;
   gasoline taxes, bottle deposits, pay-as-you-throw; marketable permits, Table 12.4; 1990 Clean Air Act sulfur dioxide permits; Coase railroad and farmer), §13.2 (patents, copyright, research help);
   Econlib, Caplan (tradable pollution permits; Coase); CLEP outline (Externalities: remedies). */
const L34TAGS = {
  'l34-int-def':['MS7','rem','terms','M6'], 'l34-tax-neg':['MS7 OS121','rem','models','M6'], 'l34-g-tax':['MS7 OS121','rem','data','M2'], 'l34-sub-pos':['MS7','rem','models','M1'],
  'l34-gr-tax':['OS121 MS7','rem','graphs','M1'], 'l34-cc-def':['MS7 OS122','rem','terms','M3'], 'l34-abate':['OS123','rem','data','M5 M6'], 'l34-g-abate':['OS123','rem','data','M5'],
  'l34-why-tax':['MS7 OS123','rem','terms','M5'], 'l34-permit':['MS7','rem','models','M4'], 'l34-tf-permits':['MS7 OS123','rem','terms','M4'], 'l34-gr-sub':['MS7','rem','graphs','M1'], 'l34-alpha':['OS123','rem','data','M4'],
  'l34-tf-ban':['OS121','rem','terms','M6'], 'l34-epa':['MS7 OS122','rem','terms','M3'], 'l34-cc-weak':['OS122','rem','terms','M3'], 'l34-g-uniform':['MS7 OS123','rem','data','M3'],
  'l34-coase':['OS123 ELEX','rem','terms','M6'], 'l34-tf-subsidy-neg':['MS7','rem','terms','M1'], 'l34-patent':['OS132','rem','terms','M1'], 'l34-quota':['MS7','rem','models','M6'],
  'l34-gas':['OS123','rem','terms','M1 M3'], 'l34-paythrow':['OS123','rem','models','M5'], 'l34-sulfur':['OS123','rem','terms','M4'], 'l34-delta':['OS123','rem','data','M4'],
  'l34-tf-cc-works':['OS122','rem','terms','M3'], 'l34-school-law':['MS7','rem','terms','M1'], 'l34-tax-size':['MS7 OS121','rem','data','M2'], 'l34-firms-cut':['MS7 OS123','rem','models','M5'],
  'l34c-int':['MS7','rem','terms','M1'], 'l34c-tax':['OS121','rem','data','M2'], 'l34c-cc':['OS122 MS7','rem','models','M3'], 'l34c-abate':['OS123','rem','data','M5'],
  'l34c-permit':['MS7','rem','terms','M4'], 'l34c-skill':['MS7 OS123','rem','models','M1 M3'], 'l34c-coase':['OS123 ELEX','rem','models','M6']
};
u7tag(L34TAGS);

U7_CARDS.l34 = [
  ['Internalizing an externality','What does it mean to internalize an externality?','Altering incentives so people take the external effects of their actions into account (slide 261).','A pollution tax makes the factory pay for its smoke.','It means pricing the spillover, not banning the activity.', FIG7.l34int()],
  ['Corrective (Pigovian) tax','What is a corrective tax, and how big should it be?','A tax on a harmful activity, ideally equal to the external cost per unit, so private cost matches social cost.','$100 of pollution per refrigerator → a $100 tax per refrigerator.','Not the whole price, and not the total damage.', FIG7.l34tax()],
  ['Subsidy for a positive externality','How does a subsidy fix a positive externality?','It adds the external benefit to the private benefit, so demand moves up toward MSB and quantity rises.','Your course: subsidies on education.','Tax harmful spillovers; subsidize helpful ones.', FIG7.l34sub()],
  ['Command-and-control regulation','What is command-and-control regulation?','Rules requiring or forbidding behavior: maximum pollution levels or required technology, enforced by the EPA.','Clean Air Act limits on smokestack emissions.','It works, but gives no reward for doing better than the rule.', FIG7.l34cmp()],
  ['Weaknesses of command-and-control','What are three weaknesses of command-and-control regulation?','No incentive to beat the standard; the same rule for cheap and costly cutters; loopholes from politics.','Every taxi must install the same filter, whatever it costs.','The textbook still credits these laws with cleaner air and water.', FIG7.l34cmp()],
  ['Pollution charge','How does a firm respond to a tax per unit of pollution?','It cuts pollution while the next cut costs less than the tax, and pays the tax on the rest.','Textbook: $300, $500, $900 < $1,000 → cut 30 pounds; pay tax on 20.','Firms don\'t all cut the same amount.', FIG7.l34abate()],
  ['Why economists prefer the tax','Why do economists prefer a corrective tax to uniform rules?','Firms that can cut cheaply do the cutting; high-cost firms pay the tax. Same cleanup, lower total cost.','Made-up: same 20 tons cut for $4,000 instead of $10,000.','The tax paid is a transfer, not a resource used up.', FIG7.l34why()],
  ['Tradable pollution permits','How do tradable permits work?','The government caps total pollution with permits; firms buy and sell them. Cheap cutters sell, costly cutters buy.','Slide 264: A pays B $5 million; total stays 300 tons.','Trading doesn\'t raise total pollution; the cap fixes it.', FIG7.l34trade()],
  ['Shrinking permits','What are shrinking permits, and why use them?','Each permit allows less pollution each year, so total pollution falls while trading decides who cuts.','Table 12.4: 1,200 tons of permits shrink to 600.','New firms must buy permits from existing ones.', FIG7.l34perm()],
  ['Property rights (Coase)','What is the property rights approach to externalities?','Clearly assign who has the legal right; then the side without it pays for the cheapest fix.','Railroad sparks and a farmer\'s field: a spark guard or a fence.','Who pays depends on who holds the right.', FIG7.l34coase()],
  ['Patents and research','How do patents address a positive externality?','They give the inventor an exclusive right for a time, so the inventor keeps more of the benefit and does more research.','A drug patent lets the firm sell its new drug alone for years.','A patent creates temporary monopoly power: a trade-off.', FIG7.l33drug()],
  ['Market-based vs command-and-control','What is the key difference?','Market-based tools put a price on pollution and let firms choose how much to cut; command-and-control sets the rule directly.','Tax or permits vs an EPA emission limit.','Both can cut pollution; market-based usually does it more cheaply.', FIG7.l34why()]
];

Object.assign(U7_WRITE, {
  'w-l34-1':{lesson:'l34',prompt:'Explain why many economists prefer a corrective tax on pollution to a rule requiring every firm to cut pollution by the same amount. Use an example with two firms that have different costs of cutting pollution.',
    model:'With a tax on each ton of pollution, every firm compares the cost of cutting one more ton with the tax it would pay on it. Firms that can cut cheaply will cut a lot to avoid the tax, while firms for which cutting is very costly will pay the tax instead. Suppose Firm A can cut at $200 a ton and Firm B at $800 a ton, and the goal is to cut 20 tons. A rule making each cut 10 tons costs 10 × $200 + 10 × $800 = $10,000. A tax of $500 a ton leads A to cut all 20 tons for $4,000 while B pays the tax. The same pollution is removed for $6,000 less, because the cutting is done by whoever can do it most cheaply. A uniform rule also gives no reason to cut more than required, while a tax rewards every extra ton cut.',
    checklist:['Explains that each firm compares its cost of cutting with the tax','Says low-cost firms cut and high-cost firms pay the tax','Gives a two-firm example showing the same total cut at lower total cost','Notes a weakness of uniform rules (no incentive to beat the standard, or one size for all)']},
  'w-l34-2':{lesson:'l34',prompt:'Suppose the EPA limits two firms to 300 tons of pollution a year in total. Firm A pays Firm B $5 million to cut its pollution so A can pollute more. Explain why this trade makes society better off and how a system of tradable permits works on the same idea.',
    model:'The total pollution stays at 300 tons, so bystanders are no worse off: there is no added external effect. Both firms chose the deal, so each must gain from it. Firm A values the extra pollution allowance at more than $5 million, and Firm B can cut its pollution for less than $5 million. The cutting has moved from the firm that can cut only at high cost (A) to the firm that can cut cheaply (B), which lowers the total cost of keeping pollution at 300 tons. A tradable permit system builds this in: the government issues permits that add up to the allowed total, and firms buy and sell them. Firms that can cut cheaply cut more and sell their permits; firms with high cutting costs buy permits. The cap fixes total pollution, and trading decides who does the cutting.',
    checklist:['Notes that total pollution is unchanged, so bystanders are not harmed','Explains that a voluntary trade makes both firms better off','Explains that pollution cutting moves to the firm that can cut more cheaply','Describes permits: a fixed total, bought and sold; cheap cutters sell, costly cutters buy']}
});

U7_PLAN.l34 = {
  core:['l34-int-def','l34-tax-neg','l34-g-tax','l34-sub-pos','l34-gr-tax','l34-cc-def','l34-abate','l34-g-abate','l34-why-tax','l34-permit','l34-tf-permits','l34-gr-sub','l34-alpha'],
  more:['l34-tf-ban','l34-epa','l34-cc-weak','l34-g-uniform','l34-coase','l34-tf-subsidy-neg','l34-patent','l34-quota','l34-gas','l34-paythrow','l34-sulfur','l34-delta','l34-tf-cc-works','l34-school-law','l34-tax-size','l34-firms-cut']
};

U7_LESSONS.push({ id:'l34', unit:7, title:'Fixing Externalities: Taxes, Subsidies, Regulation and Permits', mins:40, src:'Modern States video 7.1 (second part) and Module 7 slides 261-265 · Course textbook (OpenStax) §12.2, §12.3 and §13.2',
  sources:['MS7','OS121','OS122','OS123','OS132','CB','ELEX'],
  oneline:'Government can fix an externality by making people feel its cost or benefit: taxes and permits for harmful spillovers, subsidies for helpful ones, or direct rules. Market-based tools usually reach the same goal more cheaply.',
  body:`
<p>Lesson 33 showed the problem: with an ${dt('externality','externality')}, the market weighs only private costs and benefits, so it misses the ${dt('social-optimum','socially optimal quantity')} and causes a ${dt('deadweight-loss','deadweight loss')}. Lesson 5 showed that people respond to incentives. Lesson 6 showed that a ${dt('subsidy','subsidy')} shifts supply right, and Lesson 12 that a tax per unit drives a wedge equal to its size. This lesson combines the two: change the incentive by the size of the spillover, and the market finds the right quantity on its own.</p>

<h2>Internalizing an externality</h2>
<!-- src: MS7 (slide 261: "Internalizing an externality: Altering the incentives so that people take account of the external effects of their actions. Because private costs do not account for social costs → government can impose taxes or regulation to increase private cost to match social costs ... Because private benefit does not account for social benefit → government can introduce tax breaks, subsidies, and regulation to enhance the private benefit"; video 7.1: "the internalization of an externality alters the incentives so that people can take into account the external effects of their actions"). -->
<p>Your course (slide 261): to ${dt('internalize','<b>internalize</b>')} an externality is "Altering the incentives so that people take account of the external effects of their actions." The spillover stops being external once the decision maker pays for it or is paid for it.</p>
${FIG7.l34int()}
<p><b>Why it works:</b> the market went wrong only because one piece of cost or benefit was missing from the decision. Put that piece back into the price and the same supply-and-demand forces that made the mistake now find the optimum.</p>
<p><b>So what:</b> harmful spillovers call for policies that raise private cost (taxes, limits); helpful ones call for policies that raise private benefit (subsidies, tax breaks). Mixing these up is the classic exam trap.</p>
<div data-check="l34c-int"></div>

<h2>Command-and-control regulation</h2>
<!-- src: MS7 (slide 262: "Command-and-control: Externalities can be corrected by requiring or forbidding certain behaviors. In the United States, the Environmental Protection Agency (EPA) develops and enforces regulations aimed at protecting the environment. EPA regulations include maximum levels of pollution allowed or required adoption of a particular technology to reduce emissions"; video 7.1: "command-and-control ... direct government regulations"); OS122 (definition; EPA 1970; Clean Air Act 1970; Clean Water Act 1972; "largely responsible for America's cleaner air and water"; three weaknesses: "no incentive to improve the quality of the environment beyond the standard"; "inflexible ... the same standard for all polluters"; "subject to compromises in the political process ... loopholes, and exceptions"). -->
<p>${dt('command-control','<b>Command-and-control</b>')} rules correct a spillover "by requiring or forbidding certain behaviors" (slide 262). The ${dt('epa','Environmental Protection Agency (EPA)')} sets "maximum levels of pollution allowed or required adoption of a particular technology." The textbook dates the EPA and the Clean Air Act to 1970 and the Clean Water Act to 1972.</p>
<p><b>Why it works:</b> a limit or a required filter raises the firm\'s cost of polluting, so the firm pollutes less (the next section shows a tax does the same through price). The textbook: these laws "have been largely responsible for America\'s cleaner air and water in recent decades."</p>
<p><b>Its weaknesses</b>, from the textbook: (1) once a firm meets the rule it has "zero incentive to do better"; (2) the same standard applies to firms that could cut cheaply and firms that can\'t; (3) the rules come out of politics, so they are "full of fine print, loopholes, and exceptions."</p>
${FIG7.l34cmp()}
<div data-check="l34c-cc"></div>

<h2>Corrective taxes and subsidies</h2>
<!-- src: MS7 (slide 263: "Externalities can be internalized through the use of taxes and subsidies. Corrective tax: a tax designed to induce private decision makers to take account of the social costs that arise from a negative externality"; video 7.1: "taxes or ... quotas on pollution ... force the social cost to be taken into account ... the firm ends up producing less widgets"; "subsidies on education or laws that force people to stay in school until a given age"); OS121 ("If the firm is required to pay $100 for the additional external costs of pollution each time it produces a refrigerator ... the entire supply curve shifts up by $100"). The name "Pigovian" is standard usage (after economist Arthur Pigou); not in the course materials. -->
<p>A ${dt('corrective-tax','<b>corrective tax</b>')} is, in your course\'s words, "a tax designed to induce private decision makers to take account of the social costs that arise from a negative externality." You may also meet the name "Pigovian tax," after economist Arthur Pigou; it isn\'t used in your course materials.</p>
<p><b>Why the right size is the external cost:</b> a tax of $t per unit raises the firm\'s cost of every unit by $t, so supply shifts up by $t. Set $t equal to the external cost per unit and the new supply curve <i>is</i> the ${dt('msc','marginal social cost')} curve.</p>
${FIG7.l34tax()}
<p><b>Worked example: your course textbook\'s refrigerators.</b> Each refrigerator causes $100 of pollution damage.</p>
<div class="math">Tax = external cost = $100 per refrigerator<br>Supply shifts up by $100: the "with pollution cost" column of Lesson 33\'s table<br>New equilibrium: <b>40,000 refrigerators at $700</b>, the social optimum</div>
<p>Check: this is exactly the outcome Lesson 33 found by counting the pollution cost, so the tax got the market there without the government choosing the quantity.</p>
<p>A positive externality runs the other way. A subsidy per unit equal to the external benefit raises what each buyer gets, so demand moves up onto marginal social benefit and the quantity rises. Your course\'s tools for education: "subsidies on education or laws that force people to stay in school until a given age."</p>
${FIG7.l34sub()}
<p><b>Research needs a different tool.</b> Lesson 33\'s Big Drug did too little research because others copy its ideas. Your textbook (§13.2): patents and other intellectual property rights "give the inventor the exclusive legal right to make, use, or sell the invention for a limited time." That lets the inventor keep more of the benefit, so the private return moves toward the social return. The cost: for that time the inventor has monopoly power (Lesson 25). The textbook also lists government help with research costs.</p>
<p><b>So what:</b> the ideal tax or subsidy matches the spillover per unit, not the price and not the total damage.</p>
<div data-check="l34c-tax"></div>

<h2>Why economists prefer the tax</h2>
<!-- src: MS7 (slide 263: "These taxes are preferred by economists over regulation, because firms that can reduce pollution with the least cost are likely to do so (to avoid the tax) while firms that encounter high costs when reducing pollution will simply pay the tax. Thus, this tax allows firms that face the highest cost of reducing pollution to continue to pollute while encouraging less pollution over all"); OS123 (pollution charge definition; Figure 12.3: $300, $500, $900, $1,500, $2,500 per 10 pounds; $1,000 tax → reduce by 30 pounds; "Firms that can reduce pollution cheaply and easily will do so ... whereas firms that will incur high costs ... will end up paying the pollution tax instead"; gasoline taxes; bottle deposits; pay-as-you-throw, over 7,000 communities). Two-firm numbers are made up. -->
<p>Your course textbook calls a tax on emissions a ${dt('pollution-charge','pollution charge')}. Each firm compares two prices: what it costs to cut one more unit of pollution, and the tax it pays on that unit if it doesn\'t.</p>
<p><b>Worked example: your course textbook\'s soot.</b> A small firm emits 50 pounds of soot a year. Cutting the first 10 pounds is cheap; each further 10 costs more, because "the firm can use the cheapest and easiest method to make initial reductions."</p>
${FIG7.l34abate()}
<p>Check: the firm stops exactly where the next cut ($1,500) would cost more than the tax ($1,000), so it never pays more to cut than it saves in tax.</p>
<p>Your course\'s argument (slide 263): "firms that can reduce pollution with the least cost are likely to do so (to avoid the tax) while firms that encounter high costs when reducing pollution will simply pay the tax." Here is that argument with two made-up firms.</p>
${FIG7.l34why()}
<p>Try the tax on the textbook\'s firm yourself.</p>
<div data-widget="taxlab"></div>
<p>What to notice: raise the tax and the firm cuts more, one step at a time, but only when the tax passes the cost of the next step. A tax doesn\'t order a quantity; it lets each firm find its own.</p>
<p><b>So what:</b> a tax reaches a given cleanup at the lowest total cost. The textbook adds that many policies are pollution charges in disguise: gasoline taxes, bottle deposits and "pay as you throw" garbage fees.</p>
<div data-check="l34c-abate"></div>

<h2>Tradable pollution permits</h2>
<!-- src: MS7 (slide 264: "EPA regulations restrict the amount of pollution that two firms can emit at 300 tons of glop per year. Firm A wants to increase its amount of pollution. Firm B agrees to decrease its pollution by the same amount if Firm A pays it $5 million. Social welfare is increased if the EPA allows this situation. Total pollution remains the same so there are no external effects. If both firms are doing this willingly, it must make them better off. If the EPA issued permits to pollute and then allowed firms to sell them, this would also increase social welfare. Firms that could control pollution most inexpensively would do so and sell their permits, while those who encounter high costs when reducing pollution would buy additional permits"); OS123 (marketable permits, cap-and-trade; Table 12.4 Alpha, Beta, Gamma, Delta; shrinkable permits; 1990 Clean Air Act sulfur dioxide to half of 1980 levels, permits free); ELEX ("A more efficient solution is to issue tradable 'pollution permits' that add up to the target level of emissions"). -->
<p>${dt('pollution-permit','<b>Tradable pollution permits</b>')} start from a cap. The government decides the total pollution allowed, issues permits adding up to it, and lets firms buy and sell them. Your course\'s slide 264 builds the idea from a single trade.</p>
${FIG7.l34trade()}
<p><b>Why it works:</b> a permit is worth more to a firm that can only cut at high cost than to one that can cut cheaply. So the cheap cutter sells and cuts; the costly cutter buys and keeps polluting. Econlib\'s Caplan: tradable permits that "add up to the target level of emissions" are "a more efficient solution" than a fixed rule.</p>
<p><b>Worked example: your course textbook\'s lead permits.</b> Each firm gets permits for its current emissions, and next year each permit allows only half as much.</p>
${FIG7.l34perm()}
<div class="math">Permits next year: 100 + 200 + 300 + 0 = 600 tons<br>Actual emissions: 150 + 200 + 200 + 50 = <b>600 tons</b><br>Gamma cut from 600 to 200 tons (cheap for it) and sold 100 tons of permits</div>
<p>Check: buyers (Alpha 50, Delta 50) and seller (Gamma 100) balance, so total pollution equals the cap.</p>
<p><b>So what:</b> permits fix the quantity of pollution and let the market set its price; a tax fixes the price and lets the market set the quantity. Both send the cutting to the cheapest cutters. The textbook\'s real case: the 1990 Clean Air Act amendments used shrinking permits to halve sulfur dioxide from power plants.</p>
<div data-check="l34c-permit"></div>

<h2>Property rights</h2>
<!-- src: OS123 ("Better-Defined Property Rights"; Coase (1910-2013), 1991 Nobel Prize; railroad sparks and a farmer's field; "this issue cannot be resolved until property rights are clearly defined"; "that party will seek out and pay for the least costly method of reducing the risk"); ELEX ("If transactions costs are reasonably low, then the affected parties negotiate tolerably efficient solutions"; "it does not matter whether the law sides with the railroad or the farmer"). -->
<p>Your course textbook adds a third market-based tool from economist Ronald Coase: ${dt('property-rights-ext','clearly defined property rights')}. His example is a railroad whose sparks set a farmer\'s field on fire.</p>
${FIG7.l34coase()}
<p><b>Why it works:</b> the textbook: "this issue cannot be resolved until property rights are clearly defined." Once one side holds the right, the other has a reason to "seek out and pay for the least costly method." Econlib\'s Caplan adds the condition: if bargaining is cheap, "the affected parties negotiate tolerably efficient solutions."</p>
<p><b>So what:</b> property rights work best when few parties are involved. With thousands of people breathing a factory\'s smoke, bargaining is too costly, which is why taxes, permits and rules do most of the work.</p>
<div data-check="l34c-coase"></div>

<h2>Match the problem to the tool</h2>
<!-- src: MS7 (slides 261-265), OS122, OS123. Exam skill: name the kind of spillover, then pick the policy that moves quantity in the right direction, and say whether it is command-and-control or market-based. -->
<p>CLEP "remedies" questions ask you to pick or classify a policy. The move: (1) harmful or helpful spillover? (2) Which way must quantity move? (3) Does the policy set a rule directly (command-and-control) or put a price on the spillover (market-based)?</p>
<div data-widget="remsort"></div>
<p>What to notice: taxes, subsidies and permits all work through prices; limits and required equipment work through rules. And the direction always follows the spillover: tax the harmful, subsidize the helpful.</p>
<div data-check="l34c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L34TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"Subsidize the polluter, or tax the activity that helps others."</span>Backwards. Tax harmful spillovers (to cut quantity) and subsidize helpful ones (to raise it).</li>
<li><span class="wrong">"The right corrective tax is the whole price, or the total damage."</span>It equals the external cost per unit, so private cost plus tax equals social cost.</li>
<li><span class="wrong">"Command-and-control is always the cheapest way, or it never works."</span>It has cleaned up air and water, but one rule for all makes cheap cutters and costly cutters do the same; market tools reach the same cut for less.</li>
<li><span class="wrong">"Tradable permits let total pollution rise."</span>The cap fixes the total. Trading only changes which firms do the cutting.</li>
<li><span class="wrong">"A pollution tax makes every firm cut the same amount."</span>Each firm cuts while cutting is cheaper than the tax, so low-cost firms cut a lot and high-cost firms pay the tax.</li>
<li><span class="wrong">"Internalizing an externality means banning it."</span>It means making people account for it. The goal is the optimal quantity, usually not zero.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Internalizing</b> an externality means changing incentives so people account for the spillover: raise private cost for harmful ones, raise private benefit for helpful ones.</li>
<li>A <b>corrective tax</b> equal to the external cost per unit shifts supply onto MSC (refrigerators: $100 tax → 40,000 at $700); a <b>subsidy</b> equal to the external benefit shifts demand onto MSB.</li>
<li><b>Command-and-control</b> rules (EPA limits, required technology) work but give no reward for beating the standard and treat all firms the same.</li>
<li>Economists prefer a <b>pollution tax</b> because cheap cutters cut and costly cutters pay (textbook firm: cut 30 pounds at a $1,000 tax).</li>
<li><b>Tradable permits</b> cap the total and let firms trade; cheap cutters sell. Slide 264: total stays at 300 tons.</li>
<li><b>Property rights</b> (Coase) let the parties bargain to the cheapest fix when bargaining is easy.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Remedies" under Externalities (Market Failure and the Role of Government, 8% to 14% of the exam). Expect a question asking which policy moves a market with an externality toward the optimum (a tax for a negative one, a subsidy for a positive one), or why a tax or permits cost less than a uniform rule.</p>
</div>`,
  deeper:`
<h3>Taxes or permits: which is better?</h3>
<p>Both send the cutting to the cheapest cutters. A tax fixes the price of polluting and leaves the total uncertain; permits fix the total and leave the price uncertain. Which is better depends on whether getting the amount exactly right matters more than knowing the cost. The CLEP treats them as two market-based remedies.</p>
<h3>Endangered species and incentives</h3>
<p>Your course textbook warns that badly designed rules can backfire. When finding an endangered species on private land meant losing the use of that land, some owners managed land to keep the animals away. The fix it discusses is giving owners a reason to want the species there.</p>
<h3>Other ways to encourage innovation</h3>
<p>Besides patents, the textbook (§13.2) lists government help with research costs and partnerships between universities and companies. Patents also create temporary monopoly power, which Lesson 25 covered as a barrier to entry.</p>`,
  links:[ {k:'Textbook',t:'12.3 Market-Oriented Environmental Tools',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/12-3-market-oriented-environmental-tools',w:'The newer edition of your course textbook\'s §12.3: pollution charges, marketable permits and property rights, with the same worked examples. Wording may differ slightly from your 2016 edition.'} ]
});

u7xv({
  'l34-int-def':[FIG7.l34int(), ''], 'l34c-int':[FIG7.l34int(), ''], 'l34-tax-neg':[FIG7.l34tax(), 'Output "unchanged" assumes firms absorb the tax, but the tax raises the cost of every unit, so firms supply less at each price.'],
  'l34-sub-pos':[FIG7.l34sub(), ''], 'l34-tf-subsidy-neg':[FIG7.l34tax(), ''], 'l34-cc-def':[FIG7.l34cmp(), ''], 'l34c-cc':[FIG7.l34cmp(), ''], 'l34-cc-weak':[FIG7.l34cmp(), ''], 'l34-tf-cc-works':[FIG7.l34cmp(), ''],
  'l34-why-tax':['', ''], 'l34-firms-cut':[FIG7.l34why(), ''], 'l34c-abate':[FIG7.l34abate(), ''], 'l34-permit':[FIG7.l34trade(), ''], 'l34-tf-permits':[FIG7.l34perm(), ''], 'l34c-permit':[FIG7.l34trade(), ''],
  'l34-delta':[FIG7.l34perm(), ''], 'l34-sulfur':[FIG7.l34perm(), ''], 'l34-coase':[FIG7.l34coase(), ''], 'l34-tf-ban':[FIG7.l34tax(), ''], 'l34c-tax':[FIG7.l34tax(), ''], 'l34-quota':[FIG7.l34tax(), ''],
  'l34c-skill':[FIG7.l34why(), ''], 'l34-school-law':[FIG7.l34sub(), '']
});
u7cv('l34', {});
