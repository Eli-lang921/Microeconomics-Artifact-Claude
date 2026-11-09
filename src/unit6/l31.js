/* ===== Lesson 31 figures ===== */
const vmpPts = P => TO.slice(1).map(r=>[r.L, r.mp*P]);
/* a marked-up "movement along demand" picture for explanations */
function u6moveBig(note, hiW='W1', loW='W2', up=false){
  return fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity of labor', ylab:'Wage', aria:'Marked-up answer graph: a movement along one demand curve',
    lines:[ {a:LD2[0],b:LD2[1],c:DC,label:'D',lx:-4,ly:-8,anchor:'end'} ], hl:[{p:7.3,q:4.7,c:'var(--muted)'},{p:4.7,q:7.3,c:'var(--g2)'}], vls:[{q:4.7,p:7.3},{q:7.3,p:4.7}],
    dots:[{q:4.7,p:7.3,label:'A',c:'var(--muted)',lx:8,ly:-6},{q:7.3,p:4.7,label:'B',c:'var(--ink)',lx:8,ly:-6}], arrows:[up ? {a:[6.9,5.1],b:[5.1,6.9],c:'var(--g2)'} : {a:[5.1,6.9],b:[6.9,5.1],c:'var(--g2)'}],
    labels:[[0.9,7.75,hiW,up?'var(--g2)':'var(--muted)','start'],[0.9,5.15,loW,up?'var(--muted)':'var(--g2)','start']] }), note);
}

/* L31 V1: movement along versus shift (textbook §4.1) */
FIG6.l31two = () => figs([
  ['Wage changes: move along', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Workers', ylab:'Wage', aria:'One demand curve with a move from A to B as the wage falls',
    lines:[ dE([1,9],[9,1],'D') ], hl:[{p:7,q:3,c:'var(--muted)'},{p:4,q:6,c:'var(--g2)'}], dots:[{q:3,p:7,label:'A',c:'var(--muted)',lx:8,ly:-6},{q:6,p:4,label:'B',c:'var(--ink)',lx:8,ly:-6}], arrows:[{a:[3.4,6.6],b:[5.6,4.4]}] })],
  ['Something else changes: shift', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Workers', ylab:'Wage', aria:'Demand curve shifting right from D1 to D2',
    lines:[ dE([1,9],[7,3],'D1',{c:OLD,dash:'5 4',w:2}), dE([3,9],[9,3],'D2') ], hl:[{p:5,c:'var(--muted)'}], arrows:[{a:[4,5],b:[6,5]}], labels:[[1.4,5.4,'same wage','var(--muted)','start']] })]
], 'Made-up curves. First panel: only the wage changed, so the firm slides from A to B on the same curve. Second panel: something other than the wage changed (say, the product\'s price), so at the same wage the firm now wants more workers: the whole curve moves right. Your course textbook: "A change in salary will lead to a movement along labor demand ... but it will not shift those curves."');

/* L31 V2: a higher output price raises every worker's value (slide 261), worked as a table */
FIG6.l31pricetbl = () => fig(atable(['Worker (MP)','Value at $10','Value at $15','Hire at $250?'],
  TO.slice(1).map(r=>[`${r.L} (${r.mp})`, '$'+r.mp*10, '$'+r.mp*15, r.mp*10>250 ? 'Both' : r.mp*15>250 ? '<b>At $15</b>' : 'No']), { cls:'compact', hl:{3:{row:'u3z2'}} }),
  'Your course\'s toaster company with a made-up price rise from $10 to $15 and a made-up $250 wage. The marginal products don\'t change, but each worker\'s output is now worth 1.5 times as much. The highlighted 4th worker goes from $200 (not worth $250) to $300 (worth it), so the firm hires 4 instead of 3.');

/* L31 V3: the same change on the graph: D1 → D2 (slide 261) */
FIG6.l31pricegraph = (cap) => fig(sdg({ xmax:6.5, ymax:800, xt:[0,1,2,3,4,5,6], yt:[0,250,500,750], xlab:'Workers', ylab:'Dollars per day', aria:'Value of marginal product at 10 dollars and at 15 dollars, with a 250 dollar wage line',
  lines:[ {pts:vmpPts(10), c:OLD, dash:'5 4', w:2}, {pts:vmpPts(15), c:DC}, {pts:[[0,250],[6.5,250]], c:'var(--g2)'} ],
  labels:[ [5.25,95,'D1 ($10)',OLD,'start'], [2.75,640,'D2 ($15)',DC,'start'], wLab(250,800) ],
  dots:[{q:3,p:300,c:'var(--muted)',label:'3',lx:-12,ly:-8},{q:4,p:300,c:'var(--ink)',label:'4',lx:6,ly:-8}], arrows:[{a:[2.05,410],b:[2.05,560],c:'var(--ok)'}] }),
  cap || 'The table above as a graph, like your course\'s slide 261 (D.1 to D.2). Each worker\'s value rises, so the whole curve moves up and to the right. At the same $250 wage the firm now hires 4 workers instead of 3.');

/* L31 V4: technology can push either way (slide 262; textbook Table 4.2, Figure 4.3) */
FIG6.l31tech = () => figs([
  ['Typists (technology replaces them)', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Typists', ylab:'Wage', aria:'Demand for typists shifts left',
    lines:[ dE([3,9],[10,2],'D1',{c:OLD,dash:'5 4',w:2}), dE([1,9],[8,2],'D2'), sup([1,2],[9,9.5]) ], arrows:[{a:[6.4,4.7],b:[4.6,4.7]}] })],
  ['IT professionals (technology needs them)', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'IT workers', ylab:'Wage', aria:'Demand for IT professionals shifts right',
    lines:[ dE([1,9],[8,2],'D1',{c:OLD,dash:'5 4',w:2}), dE([3,9],[10,2],'D2'), sup([1,2],[9,9.5]) ], arrows:[{a:[4.4,5.5],b:[6.2,5.5]}] })]
], 'Your course textbook\'s examples, made-up curves. First panel: word processing did typists\' work, so "This shifted the demand curve for typists left." Second panel: the same software raised "the demand for information technology professionals," a rightward shift. One technology, two directions.');

/* L31 V5: your course versus your textbook on technology (slide 262; textbook Table 4.2; OpenStax 2e §14.1) */
FIG6.l31claim = () => fig(`<div class="u3pair">
  <div class="u3card no"><p class="u3h">Your course\'s slide 262</p><p>"Tech progress → workers more productive → firm needs less labor"</p><p class="small muted">True when the technology does the workers\' job, or when output can\'t grow.</p></div>
  <div class="u3card ok"><p class="u3h">Your course textbook (§4.1, Table 4.2)</p><p>"Technology changes can act as either substitutes for or complements to labor."</p><p class="small muted">A substitute lowers labor demand; a complement raises it. Higher productivity raises each worker\'s value of MP (Lesson 30), which pushes demand up.</p></div></div>`,
  'Two sources, two answers. The course\'s one-way rule leaves out the case the textbook stresses: technology that makes workers more useful raises the demand for them. On the CLEP, read which kind of technology the question describes before choosing a direction.');

/* L31 V6: other inputs used with labor (slide 262; textbook Table 4.2, call center) */
FIG6.l31inputs = () => fig(flow([
  {split:[
    [{t:'More phones and computer terminals at the call center',c:'u3up'}, 'Each salesperson has the tools to make more sales.', {t:'Demand for salespeople shifts <b>right</b>',c:'u3end'}],
    [{t:'Terminals break, or a key input becomes scarce or dearer',c:'u3down'}, 'The firm can produce less, or production is less profitable.', {t:'Demand for salespeople shifts <b>left</b>',c:'u3end'}] ]}
]), 'Your course textbook\'s call center and your course\'s slide 262. Workers use other inputs. When more of those inputs are available or they get cheaper, each worker can produce more and hiring pays more; when they become scarce or dearer, the reverse.');

/* L31 V7: everything that shifts labor demand, one table (slides 261-262; textbook Table 4.2) */
FIG6.l31table = () => fig(atable(['What changes','Example','Labor demand'],
  [['Demand for, or price of, the product','Price of toasters rises (course)','→ right'],
   ['Technology that replaces workers','Word processing and typists (textbook)','← left'],
   ['Technology that workers use','Software and IT professionals (textbook)','→ right'],
   ['Amount or price of other inputs','More phones at a call center (textbook)','→ right (fewer or dearer inputs: ← left)'],
   ['Education and training','A better-trained workforce (textbook)','→ right'],
   ['Number of companies','More firms making the product (textbook)','→ right'],
   ['Government regulations','A rule that only nurses may do a procedure (textbook)','→ right for nurses, ← left for others'],
   ['The wage itself','Wage rises from $100 to $150','No shift: a move along the curve']],
  { cls:'compact wrap', hl:{7:{row:'u3z3'}} }),
  'Your course and textbook\'s labor-demand shifters in one place. Every row except the last moves the whole curve, because it changes how much a worker is worth to the firm or how many workers firms need. The last row (shaded) is the trap: the wage itself only moves the firm along its curve.');

/* ===== Lesson 31: Shifts in the Demand for Labor (Modern States video 6.1; Module 6 slides 261-262) =====
   Common mistakes: M1 a wage change shifts labor demand · M2 technology always lowers labor demand · M3 a higher product price shifts labor supply
   M4 scarcer complementary inputs raise labor demand · M5 an increase in labor demand moves the curve left · M6 only product demand can shift labor demand */
const DEM_CH = (ok) => ['Dr','Dl','Sr','Sl','mv'].map(k => shiftChoice(k, k===ok));

mc('l31-move-shift','l31','Which of the following would <b>shift</b> a firm\'s demand curve for labor, rather than move the firm along it?',
  [`A rise in the price of the product the workers make`,`A rise in the wage the firm must pay`,`A fall in the wage the firm must pay`,`A change in the number of workers the firm hires because of a wage change`,`None; labor demand curves never shift`],0,
  `<p>The product price changes what each worker is worth (value of MP), so it shifts the curve. Your course textbook: "A change in salary will lead to a movement along labor demand ... but it will not shift those curves" (M1).</p>${FIG6.l31two()}`);
mc('l31-price','l31','Your course\'s slide 261 says that when the price of the good rises, the "Value of MPL goes up!" What happens to the firm\'s demand for labor, and why?',
  [`It shifts right: each worker\'s output is worth more at each wage`,`It shifts left: the firm sells fewer goods at the higher price`,`It doesn\'t change: only the wage can affect labor demand`,`The supply of labor shifts right instead, as jobs pay more`,`It shifts right because each worker\'s marginal product rises`],0,
  `<p>Value of MP = MP × price. A higher price raises it for every worker, so at any wage the firm wants more workers: "Price of good increases → Firm will produce more → Demand more labor." The marginal products themselves don\'t change, only their dollar value. A price change moves labor <b>demand</b>, not supply (M3).</p>${FIG6.l31pricegraph('Your course\'s toaster company with a made-up price rise from $10 to $15, like slide 261 (D.1 to D.2). Every worker\'s value rises, so the whole curve moves up and to the right. At a $250 wage the firm now hires 4 workers instead of 3.')}`);
lazy('l31-gr-price','l31',()=>visMC({
  prompt:`Made-up scenario. The market price of strawberries rises sharply. Which graph shows what happens in the labor market for strawberry pickers?`,
  choices: DEM_CH('Dr'),
  explain: L => `<p><b>Graph ${L}</b>: the demand for pickers shifts right. Each picker\'s strawberries are now worth more (value of MP = MP × a higher price), so farms want more pickers at every wage.</p>${u6shiftBig('Dr','The answer graph, marked up: D1 to D2 raises both the wage (W1 to W2) and the number of pickers hired (E1 to E2).')}<p>A supply shift would need a change on the workers\' side (M3). A movement along the curve would need only the wage to change (M1).</p>` }));
gen('l31-g-pricehire','l31',()=>{
  let mps, P1, P2, W, n1, n2;
  do { const m1 = pick([20,24,30,40]); mps=[m1]; while(mps.length<6) mps.push(Math.max(0, mps[mps.length-1] - pick([4,5,6])));
    P1 = pick([4,5,6,8]); P2 = P1 + pick([2,3,4]); W = pick([50,60,70,80,90,100,120]);
    n1 = hireAt(mps.map(m=>m*P1), W); n2 = hireAt(mps.map(m=>m*P2), W);
  } while(mps.some(m=>m*P1===W || m*P2===W) || n1 < 1 || n2 <= n1 || n2 > 5);
  const Q=[0]; mps.forEach(m=>Q.push(Q[Q.length-1]+m)); const ans = n2 - n1;
  return { type:'num', kind:'num', unit:'workers', prompt:`Made-up numbers. A competitive firm pays a wage of <b>$${W}</b> a day. Output per day:${atable(['Workers','Output (units)'], Q.map((q,L)=>[L,q]), { cls:'compact' })}The price of its product rises from <b>$${P1}</b> to <b>$${P2}</b>. How many <b>more</b> workers does it hire?`, answer:ans,
    explain:`<p>Compare each worker\'s value at both prices with the $${W} wage:</p>${atable(['Worker','MP','Value at $'+P1,'Value at $'+P2], mps.map((m,i)=>[i+1, m, '$'+m*P1, '$'+m*P2]), { cls:'compact', hl:{[n1-1]:{row:'u3z1'},[n2-1]:{row:'u3z2'}} })}<p>At $${P1} it hires ${n1}; at $${P2} it hires ${n2}. So <b>${ans} more</b>. The higher price raised every worker\'s value: the labor demand curve shifted right.</p><p>The common slip is changing the marginal products: a price change leaves output per worker the same and changes only its dollar value.</p>` };
});
mc('l31-typists','l31','Your course textbook: "word processing decreased the number of typists needed in the workplace." In that case the technology acted as',
  [`a substitute for typists, shifting the demand for typists left`,`a complement to typists, shifting the demand for typists right`,`a substitute, shifting the supply of typists left`,`a complement, causing a movement along the demand curve`,`neither, because technology affects only capital`],0,
  `<p>The textbook: "When technology acts as a substitute, it replaces the need for the number of workers ... This shifted the demand curve for typists left." It is a demand change by employers, not a change in how many people want to be typists.</p>`);
mc('l31-it','l31','Your course textbook says the spread of word processing and other software "increased the demand for information technology professionals." For IT professionals, the software was',
  [`a complement, shifting their demand curve right`,`a substitute, shifting their demand curve left`,`a substitute, shifting their supply curve right`,`a complement, shifting their supply curve left`,`irrelevant, because their wage did not change`],0,
  `<p>"Technology that acts as a complement to labor will increase the demand for certain types of labor, resulting in a rightward shift of the demand curve." Software needs people to keep it running. This is why technology doesn\'t always lower labor demand (M2).</p>`);
tf('l31-tf-tech','l31','New technology always lowers the demand for labor.',false,
  `<p>False. Your course\'s slide 262 gives one direction ("firm needs less labor"), but the textbook says technology "can act as either substitutes for or complements to labor." Word processing lowered the demand for typists and raised it for IT professionals (M2).</p>`);
lazy('l31-gr-tech','l31',()=>visMC({
  prompt:`Made-up scenario. Supermarkets install self-checkout machines that do the work cashiers used to do. Which graph shows the effect on the labor market for supermarket cashiers?`,
  choices: DEM_CH('Dl'),
  explain: L => `<p><b>Graph ${L}</b>: the machines are a substitute for cashiers, so the demand for cashiers shifts left, lowering cashiers\' wage and the number employed. This is the textbook\'s typist case.</p>${u6shiftBig('Dl','The answer graph, marked up: D1 to D2 lowers the wage (W1 to W2) and the number of cashiers (E1 to E2).')}<p>Assuming "technology always raises demand" or "always lowers it" without asking which workers it replaces is the trap (M2). Nothing changed on the workers\' side, so supply stays put.</p>` }));
mc('l31-phones','l31','Your course textbook\'s call center: each salesperson needs a telephone and a computer terminal. If the center gets more telephones and terminals, the demand for salespeople',
  [`increases, because each salesperson can now produce more sales`,`decreases, because the terminals replace salespeople`,`doesn\'t change, because only the wage matters`,`decreases, because the firm spent money on terminals`,`increases only if salespeople\'s wages fall`],0,
  `<p>The textbook: "The demand for salespersons at the call center will increase if the number of telephones and computer terminals available increases." Here the equipment works with labor (a complement), so more of it makes each worker more valuable.</p>`);
mc('l31-inputprice','l31','Made-up scenario. The price of flour rises sharply, and bakeries can\'t make bread without it. According to your course textbook, what happens to the demand for bakers?',
  [`It decreases, because production becomes less profitable`,`It increases, because bakeries need more bakers to save flour`,`It doesn\'t change, because flour isn\'t labor`,`The supply of bakers increases`,`It increases, because bread prices will rise`],0,
  `<p>The textbook: "if prices of other inputs fall, production will become more profitable and suppliers will demand more labor to increase production. The opposite is also true. Higher input prices lower demand for labor." Flour is used together with bakers, so dearer flour means less bread made and fewer bakers wanted (M4).</p>`);
mc('l31-education','l31','Your course textbook lists "education and training" as a shifter of labor demand. A better-trained workforce',
  [`raises the demand for that labor, because trained workers are more productive`,`lowers the demand for that labor, because trained workers cost more`,`raises the supply of labor but not the demand`,`moves employers along their demand curve`,`has no effect on employers`],0,
  `<p>The textbook: "A well-trained and educated workforce causes an increase in the demand for that labor by employers. Increased levels of productivity within the workforce will cause the demand for labor to shift to the right." Higher productivity means a higher value of the marginal product.</p>`);
tf('l31-tf-wageshift','l31','When the wage rate rises, a firm\'s demand curve for labor shifts to the left.',false,
  `<p>False. A wage change moves the firm up along the same curve to fewer workers. The textbook: "If the wage rate increases ... there will be a movement upward along the demand curve." (M1)</p>`);
/* L31 more */
mc('l31-companies','l31','Your course textbook: what happens to the demand for labor when more companies start producing a given product?',
  [`It increases (shifts right)`,`It decreases (shifts left)`,`It stays the same, because each company is small`,`The supply of labor decreases`,`Workers move along the demand curve`],0,
  `<p>The textbook: "An increase in the number of companies producing a given product will increase the demand for labor resulting in a shift to the right." More firms means more employers looking for those workers (M6: product demand isn\'t the only shifter).</p>`);
mc('l31-regulation','l31','Your course textbook: a government rule requires that nurses carry out certain medical procedures, and less-trained health care workers may not. Which result does it describe?',
  [`Demand for nurses shifts right; demand for less-trained workers shifts left`,`Demand for both groups shifts right`,`Supply of nurses shifts right`,`Demand for nurses shifts left`,`No change, because rules don\'t affect labor markets`],0,
  `<p>The textbook: such rules "will increase the demand for nurses. Less-trained healthcare workers would be prohibited from carrying out these procedures, and the demand for these workers will shift to the left." Regulations are another shifter besides product demand (M6).</p>`);
mc('l31-derived-fall','l31','Made-up scenario. A recession cuts the number of new cars people buy. What happens to automakers\' demand for assembly workers?',
  [`It shifts left`,`It shifts right`,`It doesn\'t change`,`The supply of assembly workers shifts left`,`Automakers move up along their demand curve`],0,
  `<p>Derived demand (Lesson 29): fewer cars demanded means fewer workers wanted at every wage. The textbook: "the more new automobiles consumers demand, the greater the number of workers automakers will need to hire," and the reverse holds too.</p>${u6shiftBig('Dl','Marked up: fewer cars demanded moves demand for assembly workers from D1 to D2; the wage falls (W1 to W2) and fewer are employed.')}`);
gen('l31-g-vmpshift','l31',()=>{
  const mp = pick([6,8,10,12,15]), P1 = pick([4,5,6,8]), P2 = P1 + pick([1,2,3,4]), ans = mp*(P2-P1);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A worker adds <b>${mp}</b> units of output a day. The product\'s price rises from <b>$${P1}</b> to <b>$${P2}</b>. By how much does the value of this worker\'s marginal product rise?`, answer:ans,
    explain:`<div class="math">Before: ${mp} × $${P1} = $${mp*P1}<br>After: ${mp} × $${P2} = $${mp*P2}<br>Rise: $${mp*P2} − $${mp*P1} = <b>$${ans}</b></div><p>His marginal product (${mp} units) didn\'t change; only its price did. Because every worker\'s value rises like this, the whole labor demand curve shifts up and to the right. The slip is answering the price rise alone ($${P2-P1}).</p>` };
});
lazy('l31-gr-read','l31',()=>({ type:'mc', kind:'graph',
  prompt:`Your course\'s toaster company with a made-up price rise from $10 to $15 and a made-up wage of $250 a day:${sdg({ xmax:6.5, ymax:800, xt:[0,1,2,3,4,5,6], yt:[0,150,250,450,600,750], xlab:'Workers', ylab:'Dollars per day', aria:'Two value of marginal product curves, D1 and D2, and a wage line',
    lines:[ {pts:vmpPts(10), c:OLD, dash:'5 4', w:2}, {pts:vmpPts(15), c:DC}, {pts:[[0,250],[6.5,250]], c:'var(--g2)'} ], labels:[ [5.25,95,'D1 ($10)',OLD,'start'], [2.75,640,'D2 ($15)',DC,'start'], wLab(250,800) ],
    dots: vmpPts(10).concat(vmpPts(15)).map(([q,p])=>({q,p,c:'var(--muted)'})) })}How many workers does the firm hire before and after the price rise?`,
  options:[`3 before, 4 after`,`3 before, 3 after`,`4 before, 5 after`,`5 before, 6 after`,`3 before, 6 after`], answer:0,
  explain:`<p>Before (D1): values $500, $400, $300, $200: three are above $250, so 3. After (D2): $750, $600, $450, $300, $150: four are above $250, so 4. The curve shifted right, so at the same wage the firm hires one more.</p>${FIG6.l31pricegraph('Your course\'s toaster company with a made-up price rise from $10 to $15, like slide 261 (D.1 to D.2). Every worker\'s value rises, so the whole curve moves up and to the right. At a $250 wage the firm now hires 4 workers instead of 3.')}<p>"6 after" counts every worker with positive output, which ignores the wage. "3 and 3" treats a price change as having no effect on hiring.</p>` }));
tf('l31-tf-pricesupply','l31','A rise in the price of the good workers produce shifts the supply of labor to the right.',false,
  `<p>False. The product price changes what workers are worth to <b>employers</b>, so it shifts labor demand. Labor supply depends on workers\' own situation, such as population, income and the cost of child care (Lesson 32) (M3).</p>`);
mc('l31-ms-scarce','l31','Your course\'s slide 262: "If other factors become scarce → firm can produce less overall → less demand for labor." Which example fits?',
  [`A steel shortage cuts a car plant\'s output, so it needs fewer workers`,`A rise in assembly workers\' wages makes the car plant hire fewer`,`More people move to town looking for jobs at the factory`,`The price of cars rises, so the plant wants to sell more`,`Assembly workers decide to retire earlier than planned`],0,
  `<p>Steel is an input used together with labor. If it can\'t be had, the plant can\'t make as many cars and doesn\'t need as many workers: labor demand shifts left (M4). A wage rise is a movement along; more people looking for jobs is supply.</p>`);
lazy('l31-direction','l31',()=>visMC({
  prompt:`"The demand for nurses increased." Each graph puts the wage up the side and the number of nurses along the bottom. Which graph shows that statement?`,
  choices: DEM_CH('Dr'),
  explain: L => `<p><b>Graph ${L}</b>: the demand curve shifts right. An increase in demand means more is wanted at each price (here, each salary). A move down the curve comes from a lower salary, which is a change in quantity demanded, not in demand (M5, M1).</p>${u6shiftBig('Dr','The answer graph, marked up: an increase in demand is the move from D1 to D2, to the right. At equilibrium the salary rises from W1 to W2.')}<p>A supply shift would describe nurses, not employers.</p>` }));
mc('l31-boomers','l31','Your course textbook expects aging baby boomers and the Affordable Care Act to raise the demand for health care. What does that do to the demand curve for nurses, and to nurses\' salaries if nothing else changes?',
  [`Demand shifts right, which tends to raise the equilibrium salary`,`Demand shifts left, which tends to lower the salary`,`Supply shifts right, which tends to lower the salary`,`Hospitals move along the demand curve, so the salary stays the same`,`Demand shifts right, which lowers the salary`],0,
  `<p>Nurses are an input into health care, so their demand is derived from it and shifts right. With supply unchanged, a rightward demand shift raises the equilibrium salary and the number of nurses employed (Lesson 32 puts supply and demand together). The textbook adds that the median nurse salary was expected to rise.</p>${u6shiftBig('Dr','Marked up: demand for nurses shifts from D1 to D2, so the salary rises (W1 to W2) and more nurses are employed (E1 to E2).')}`);
mc('l31-productivity','l31','Made-up scenario. A bakery buys a faster mixer, so each baker can make more bread per hour, and it can sell all the extra bread at the market price. What happens to its demand for bakers?',
  [`It increases: each baker\'s output, and its value, is higher`,`It decreases: the faster mixer replaces some bakers`,`It doesn\'t change, because the wage didn\'t change`,`The supply of bakers increases instead of demand`,`It decreases, because bread prices will fall`],0,
  `<p>The mixer makes bakers more productive, a complement. Value of MP = MP × price rises, so at each wage more bakers are worth hiring. The newer edition of your textbook: "marginal product depends on the capital and technology with which workers have to work." This is the case your course\'s slide 262 leaves out (M2).</p>`);
mc('l31-notshifter','l31','Which of the following does <b>not</b> shift the demand curve for factory workers?',
  [`More people in the area want factory jobs`,`The price of the factory\'s product rises`,`The factory installs robots that do the workers\' tasks`,`A new rule requires a second machine operator on every machine`,`Two more factories open nearby making the same product`],0,
  `<p>More people wanting factory jobs is a change in labor <b>supply</b> (Lesson 32). The other four change how many workers employers want at each wage: product price, a substitute technology, a regulation and the number of companies (M6).</p><p>The rule about machine operators is the tempting one, but it changes how many workers employers must hire at each wage, so it shifts demand, like the textbook\'s nurse regulation.</p>`);
tf('l31-tf-companies','l31','A decrease in the number of companies producing a product decreases the demand for the labor that makes it.',true,
  `<p>True. The textbook: "A decrease in the number of companies producing a given product will decrease the demand for labor resulting in a shift to the left."</p>`);
lazy('l31-gr-movement','l31',()=>visMC({
  prompt:`Made-up scenario. The wage that warehouses must pay forklift drivers falls, and nothing else changes. Which graph shows how the warehouses\' hiring responds?`,
  choices: DEM_CH('mv'),
  explain: L => `<p><b>Graph ${L}</b>: no curve shifts. A lower wage moves employers down along their existing demand curve to more drivers.</p>${u6moveBig('The answer graph, marked up: the wage falls from W1 to W2, and employers move from A to B on the same demand curve, hiring more drivers.')}<p>Shifting the demand curve for a wage change is the most common slip on this topic (M1).</p>` }));
gen('l31-g-shiftpick','l31',()=>{
  const SET = pick([['apples','apple pickers'],['houses','carpenters'],['pizzas','pizza cooks'],['bicycles','bicycle mechanics'],['sofas','furniture makers']]);
  const w0 = pick([14,15,16,17,18,19,20,21,22]);
  const ev = pick([
    { t:`the market price of ${SET[0]} rises`, k:'Dr', why:`each worker\'s output is worth more, so employers want more ${SET[1]} at every wage` },
    { t:`people buy far fewer ${SET[0]} than before`, k:'Dl', why:`demand for ${SET[1]} is derived from the demand for ${SET[0]}, so employers want fewer of them` },
    { t:`new machines are installed that do most of the work of ${SET[1]}`, k:'Dl', why:`the machines are a substitute for ${SET[1]}, so employers need fewer` },
    { t:`several new companies start producing ${SET[0]} in the area`, k:'Dr', why:`more companies means more employers wanting ${SET[1]}` },
    { t:`a new law requires employers to pay ${SET[1]} at least $${w0+3}, above the old wage of $${w0}, and nothing else changes`, k:'mvUp', why:`only the wage changed, so employers move up along their demand curve to fewer workers` },
    { t:`a key material used to make ${SET[0]} becomes scarce and expensive`, k:'Dl', why:`dearer inputs used alongside labor make production less profitable` }
  ]);
  return visMC({ prompt:`Made-up scenario. ${SET[1][0].toUpperCase()+SET[1].slice(1)} currently earn about <b>$${w0}</b> an hour. Then ${ev.t}. Which graph shows the effect on the labor market for ${SET[1]}?`,
    choices:(ev.k==='mvUp' ? ['Dr','Dl','Sr','mv','mvUp'] : ['Dr','Dl','Sr','Sl','mv']).map(k=>shiftChoice(k, k===ev.k)),
    explain: L => `<p><b>Graph ${L}</b>: ${SHIFT_DESC[ev.k]}, because ${ev.why}.</p>${ev.k==='mvUp' ? u6moveBig(`The answer graph, marked up with your numbers: the wage rises from $${w0} (B) to $${w0+3} (A), so employers move up the same curve and hire fewer ${SET[1]}.`, '$'+(w0+3), '$'+w0, true) : u6shiftBig(ev.k, `The answer graph, marked up with your numbers: the wage starts at $${w0} (W1) and ends ${ev.k==='Dr'?'higher':'lower'} (W2).`, '$'+w0, ev.k==='Dr'?'higher':'lower')}<p>Every change on the employers\' side moves labor <b>demand</b>; supply shifts come from the workers\' side (Lesson 32).</p>` });
});
mc('l31-robots','l31','Made-up scenario. A warehouse adds robots that carry boxes, a task its workers used to do, and also hires technicians to repair the robots. What happens to the warehouse\'s demand for box carriers and for robot technicians?',
  [`Demand for box carriers falls; demand for technicians rises`,`Both rise`,`Both fall`,`Demand for box carriers rises; demand for technicians falls`,`Neither changes; only wages change`],0,
  `<p>The robots substitute for box carriers and complement technicians, exactly like the textbook\'s typists and IT professionals. One technology can push labor demand in opposite directions for different workers (M2).</p>`);
mc('l31-ms-vs-textbook','l31','Your course\'s slide says technological progress makes workers more productive so the "firm needs less labor." Your course textbook says technology can be a substitute for or a complement to labor. Which statement is best for the CLEP?',
  [`It depends on the technology: a substitute lowers labor demand, a complement raises it`,`Technology always lowers labor demand`,`Technology always raises labor demand`,`Technology shifts labor supply, not demand`,`Technology affects only the wage, so it causes a movement along the curve`],0,
  `<p>The textbook\'s version is complete: technology that replaces a job (word processing for typists) lowers demand for those workers; technology that makes workers more useful (software for IT staff) raises it. On the CLEP, the textbook\'s fuller rule is the safe one (M2).</p>`);

/* ===== Lesson 31 quick checks ===== */
lazy('l31c-move','l31',()=>visMC({
  prompt:`Made-up scenario. A café raises the hourly wage it pays baristas, and nothing else changes. Which graph shows what happens on its labor demand graph?`,
  choices: ['Dr','Dl','Sr','mv','mvUp'].map(k => shiftChoice(k, k==='mvUp')),
  explain: L => `<p><b>Graph ${L}</b>: no curve shifts. Only the wage changed, so the café moves up along its demand curve: at a higher wage, fewer baristas are worth hiring.</p>${u6moveBig('The answer graph, marked up: the wage rises from W1 to W2, so the café moves up the same curve from B to A and hires fewer baristas.','W2','W1',true)}<p>A leftward shift is the classic slip (M1): the wage moves the café along the curve, it doesn\'t move the curve.</p>` }));
mc('l31c-price','l31','Made-up numbers. A worker adds 8 bowls a day. The price of a bowl rises from $10 to $12. What is the new value of his marginal product, and what happens to the firm\'s labor demand?',
  [`$96; labor demand shifts right`,`$80; labor demand shifts right`,`$96; labor demand shifts left`,`$16; no change in labor demand`,`$12; a movement along the curve`],0,
  `<p>8 × $12 = $96, up from $80. Every worker\'s value rises like this, so the demand curve shifts right.</p>`);
mc('l31c-tech','l31','Made-up scenario. A new X-ray machine needs a trained radiology technician to run it. For radiology technicians, the machine is',
  [`a complement, so demand for them rises`,`a substitute, so demand for them falls`,`a substitute, so demand for them rises`,`a complement, so supply of them falls`,`neither; machines affect only capital`],0,
  `<p>The machine can\'t work without the technician, so it makes technicians more valuable: a complement, which shifts their demand right.</p>`);
mc('l31c-inputs','l31','Your course textbook: "if prices of other inputs fall, production will become more profitable." Made-up case: the price of the fabric a clothing factory uses falls. What happens to its demand for sewing workers?',
  [`It increases`,`It decreases`,`It doesn\'t change`,`The supply of sewing workers increases`,`It decreases because fabric replaces workers`],0,
  `<p>Cheaper fabric makes producing clothes more profitable, so the factory wants to produce more and "suppliers will demand more labor to increase production."</p>`);
mc('l31c-other','l31','Which of these shifts the demand for labor?',
  [`Government regulations`,`The wage rate`,`The number of people looking for work`,`Workers\' preferences for leisure`,`The cost of child care`],0,
  `<p>Government regulations appear in the textbook\'s Table 4.2. The wage causes a movement along the curve; the others are labor <b>supply</b> shifters (Lesson 32).</p>`);
mc('l31c-skill','l31','Made-up scenario. A popular diet makes people eat much more fish. What happens in the market for workers on fishing boats?',
  [`Demand for fishing-boat workers shifts right`,`Supply of fishing-boat workers shifts right`,`Demand for fishing-boat workers shifts left`,`Employers move along their demand curve`,`Nothing, because people buy fish, not workers`],0,
  `<p>More fish demanded raises fish prices and output, so boats want more crew at every wage: a rightward shift in labor demand, through derived demand.</p>`);

/* Course materials checked 2026-11-04: video 6.1 transcript ("As the price of the good increases ... the demand for labor will go up. The value of the Marginal Product of Labor goes up";
   "As technology progresses, workers become more and more productive, and therefore, the firm needs less labor"; "if other factors become scarce, the firm can produce less overall, so there's gonna be less demand for labor"),
   slides 261-262 (D.1 → D.2); course textbook §4.1 (movement vs shift; derived demand, automobiles; Table 4.2: demand for output, education and training, technology as substitute or complement (typists, IT professionals),
   number of companies, government regulations (nurses), price and availability of other inputs (call center); "Higher input prices lower demand for labor"); ch. 4 introduction (baby boomers, Affordable Care Act); OpenStax 2e §14.1 ("marginal product depends on the capital and technology");
   CLEP outline (Labor market and firms' hiring of labor; Derived factor demand). */
const L31TAGS = {
  'l31-move-shift':['OS41 MS6','lab','terms','M1 M6'], 'l31-price':['MS6','der','models','M3 M1'], 'l31-gr-price':['MS6 OS41','der','graphs','M3 M1'],
  'l31-g-pricehire':['MS6','lab','data','M1'], 'l31-typists':['OS41','lab','terms','M2 M3'], 'l31-it':['OS41','lab','terms','M2 M3 M1'],
  'l31-tf-tech':['OS41 MS6','lab','terms','M2'], 'l31-gr-tech':['OS41','lab','graphs','M2 M3'], 'l31-phones':['OS41','lab','models','M4 M2'],
  'l31-inputprice':['OS41','lab','models','M4 M3'], 'l31-education':['OS41','lab','terms','M2 M1'], 'l31-tf-wageshift':['OS41','lab','terms','M1'],
  'l31-companies':['OS41','lab','terms','M6 M1'], 'l31-regulation':['OS41','lab','models','M6 M3'], 'l31-derived-fall':['OS41 FEDL','der','models','M3 M1'],
  'l31-g-vmpshift':['MS6','der','data','M3'], 'l31-gr-read':['MS6','lab','graphs','M1'], 'l31-tf-pricesupply':['MS6 OS41','der','terms','M3'],
  'l31-ms-scarce':['MS6 OS41','lab','models','M4 M1 M3'], 'l31-direction':['OS41','lab','terms','M5 M1'], 'l31-boomers':['OS40 OS41 FEDL','der','models','M5 M3 M1'],
  'l31-productivity':['OSE141 OS41','lab','models','M2 M1 M3'], 'l31-notshifter':['OS41','lab','terms','M6 M3'], 'l31-tf-companies':['OS41','lab','terms','M6'],
  'l31-gr-movement':['OS41','lab','graphs','M1 M3'], 'l31-g-shiftpick':['OS41 MS6','lab','graphs','M1 M3'], 'l31-robots':['OS41','lab','models','M2'], 'l31-ms-vs-textbook':['MS6 OS41','lab','terms','M2'],
  'l31c-move':['OS41','lab','models','M1'], 'l31c-price':['MS6','der','data','M5 M1'], 'l31c-tech':['OS41','lab','models','M2 M3'],
  'l31c-inputs':['OS41','lab','models','M4 M2'], 'l31c-other':['OS41','lab','terms','M6 M1'], 'l31c-skill':['OS41','der','models','M3 M1']
};
u6tag(L31TAGS);

U6_CARDS.l31 = [
  ['Shift vs movement (labor demand)','What changes the quantity of labor demanded, and what shifts labor demand?','The wage changes the quantity demanded (a move along the curve). Other changes, such as the product\'s price or technology, shift the whole curve.','Wage $250 → $150: toaster firm moves from 3 to 4 workers on one curve.','Don\'t shift the curve for a wage change.', u6shift('mv','A movement along one labor demand curve')],
  ['Output price','How does a higher price for the product affect labor demand?','It raises each worker\'s value of MP (MP × price), so labor demand shifts right.','Toaster price $10 → $15: 4th worker\'s value $200 → $300.','It changes labor demand, not labor supply.', u6shift('Dr','Labor demand shifts right')],
  ['Technology as a substitute','What happens to labor demand when technology replaces workers\' tasks?','Demand for those workers shifts left.','Word processing lowered the demand for typists (textbook).','Not all technology does this.', u6shift('Dl','Labor demand shifts left')],
  ['Technology as a complement','What happens to labor demand when technology makes workers more useful?','Demand for those workers shifts right.','Software raised the demand for IT professionals (textbook).','Your course\'s slide gives only the "needs less labor" direction; the textbook gives both.', u6shift('Dr','Labor demand shifts right')],
  ['Other inputs','How do other inputs affect the demand for labor?','More of the inputs workers use, or cheaper ones, raise labor demand; scarcer or dearer ones lower it.','More phones and terminals raise demand for call-center salespeople (textbook).','Ask whether the input works with labor or replaces it.'],
  ['Education and training','How does a better-trained workforce affect labor demand?','It raises it: trained workers are more productive, so employers want more of them.','Textbook Table 4.2: "Increased levels of productivity ... shift to the right."','This is a demand shift, not a supply shift.'],
  ['Number of companies','How does the number of firms affect labor demand?','More firms making a product raise the demand for its workers; fewer firms lower it.','New bakeries opening raise the demand for bakers.','It moves the market demand curve, not one firm\'s.'],
  ['Government regulations','Can regulations shift labor demand?','Yes. A rule that only nurses may do a procedure raises demand for nurses and lowers it for less-trained workers (textbook).','Hospital rules about who may give certain treatments.','Rules can push different workers\' demand in opposite directions.'],
  ['Derived demand falls','What happens to labor demand when demand for the product falls?','It shifts left: firms need fewer workers at every wage.','Fewer new cars sold → automakers want fewer assembly workers.','The wage then tends to fall, as a result, not a cause.', u6shift('Dl','Labor demand shifts left')],
  ['Increase in labor demand','What does "an increase in the demand for labor" look like on a graph?','The demand curve shifts right: more workers wanted at every wage.','More health care demand → more nurses wanted at each salary.','Right means more, not left.', u6shift('Dr','An increase in labor demand: the curve shifts right')],
  ['Value of MP after a price change','Made-up: a worker adds 8 units; price rises from $10 to $12. New value of MP?','8 × $12 = $96 (up from $80).','The marginal product stays 8; only its dollar value rises.','Don\'t change the marginal product when only the price changes.'],
  ['Course vs textbook on technology','Which rule about technology and labor demand should you use on the exam?','The textbook\'s: it depends on whether the technology is a substitute (demand falls) or a complement (demand rises).','Robots that carry boxes: fewer box carriers, more robot technicians.','Your course\'s slide gives only one direction.']
];

Object.assign(U6_WRITE, {
  'w-l31-1':{lesson:'l31',prompt:'A town\'s bakeries face two changes: the price of bread rises, and the wage bakers earn rises. Explain which change shifts the bakeries\' demand for bakers and which only moves them along it, and why.',
    model:'The rise in the price of bread shifts the demand for bakers to the right. A baker\'s value to the bakery is his marginal product times the price of bread, so a higher bread price makes every baker\'s output worth more, and at any wage the bakeries want more bakers. The rise in bakers\' wage is different: it doesn\'t change what any baker produces or what that output is worth, it only changes what the bakery has to pay. So the bakeries move up along their existing demand curve and hire fewer bakers. In short, the price of the product shifts labor demand, while the price of labor itself (the wage) moves along it.',
    checklist:['States that a higher bread price shifts labor demand right','Explains it through the value of the marginal product (MP × price)','States that a higher wage is a movement along the curve to fewer bakers','Explains why the wage doesn\'t shift the curve']},
  'w-l31-2':{lesson:'l31',prompt:'Your course says technological progress means a "firm needs less labor." Your textbook says technology can be a substitute for or a complement to labor. Explain the difference with one example of each, and say what happens to labor demand in each case.',
    model:'A technology is a substitute for labor when it does the job workers used to do. Word processing replaced much of what typists did, so the demand for typists shifted left, which tends to lower their wages and employment. A technology is a complement when workers are needed to use it or it makes them more productive. The same software raised the demand for information technology professionals who keep computer systems running, so their demand shifted right. So the course\'s one-way rule only fits substitute technologies; in general, technology can raise or lower the demand for a particular kind of labor depending on whether it replaces those workers or works alongside them.',
    checklist:['Defines a substitute technology and gives an example','Defines a complement technology and gives an example','States the direction of the labor demand shift in each case','Concludes that the effect depends on the type of technology (the course\'s rule is incomplete)']}
});

U6_PLAN.l31 = {
  core:['l31-move-shift','l31-price','l31-gr-price','l31-g-pricehire','l31-typists','l31-it','l31-tf-tech','l31-gr-tech','l31-phones','l31-inputprice','l31-education','l31-regulation'],
  more:['l31-companies','l31-tf-wageshift','l31-derived-fall','l31-g-vmpshift','l31-gr-read','l31-tf-pricesupply','l31-ms-scarce','l31-direction','l31-boomers','l31-productivity','l31-notshifter','l31-tf-companies','l31-gr-movement','l31-g-shiftpick','l31-robots','l31-ms-vs-textbook']
};

U6_LESSONS.push({ id:'l31', unit:6, title:'Shifts in the Demand for Labor', mins:35, src:'Modern States video 6.1 (shifts in demand for labor) and Module 6 slides 261-262 · Course textbook (OpenStax) §4.1',
  sources:['MS6','OS40','OS41','OSE141','CB','FEDL','ELMW'],
  oneline:'A change in the wage moves a firm along its labor demand curve; anything that changes what workers are worth to the firm (the product\'s price, technology, other inputs, training, the number of firms, regulations) shifts the whole curve.',
  body:`
<p>Lesson 30 built a firm\'s demand curve for labor from the ${dt('vmp','value of each worker\'s output')} and showed that a change in the wage moves the firm along it. This lesson asks what moves the curve itself. Each answer is a change in what a worker is worth to employers (his ${dt('marginal-product','marginal product')} times the price), or in how many workers employers need.</p>

<h2>Movement along versus shift</h2>
<!-- src: OS41 ("A change in the wage or salary will result in a change in the quantity demanded of labor ... there will be a movement upward along the demand curve"; "A change in salary will lead to a movement along labor demand or labor supply curves, but it will not shift those curves. However, other events like those outlined here will cause either the demand or the supply of labor to shift") -->
<p>The same rule as Unit 2\'s demand curve applies. Your course textbook: "A change in salary will lead to a movement along labor demand or labor supply curves, but it will not shift those curves. However, other events ... will cause either the demand or the supply of labor to shift."</p>
${FIG6.l31two()}
<p><b>Why:</b> the ${dt('labor-demand','labor demand')} curve already shows how many workers the firm wants at every wage, so a new wage just picks a different point on it. A shift means the firm wants a different number of workers <b>at the same wage</b>, which happens only when workers\' value to the firm changes.</p>
<div data-check="l31c-move"></div>

<h2>A change in the price of the output</h2>
<!-- src: FEDL ("The demand for labor is derived from or determine[d] by the demand for goods and services produced"); ELMW (Gorman); MS6 (video 6.1: "one of the first is a change in the output price. As the price of the good increases, the firm will be able to produce more, and therefore the demand for labor will go up. The value of the Marginal Product of Labor goes up, because the price has risen"; slide 261: D.1 → D.2); OS41 (Table 4.2, Demand for Output: "When the demand for the good produced (output) increases, both the output price and profitability increase. As a result, producers demand more labor") -->
<p>Your course\'s first shifter: "As the price of the good increases ... the demand for labor will go up. The value of the Marginal Product of Labor goes up, because the price has risen." This is ${dt('derived-demand','derived demand')} (Lesson 29) with numbers attached: Federal Reserve Education says the demand for labor is "derived from ... the demand for goods and services produced," and a higher price is how that demand reaches the firm. Econlib\'s Gorman explains why the price matters: employers "are not willing to pay a worker more than the value of the additional product that he produces," so when that ${dt('vmp','value')} rises, so does what they will pay.</p>
<p><b>Worked example: the toaster company</b>, made-up price rise from $10 to $15 and made-up wage of $250.</p>
${FIG6.l31pricetbl()}
<div class="math">4th worker before: 20 × $10 = $200 &lt; $250 → don\'t hire (3 workers)<br>4th worker after: 20 × $15 = $300 &gt; $250 → hire<br>5th worker after: 10 × $15 = $150 &lt; $250 → stop at <b>4 workers</b></div>
${FIG6.l31pricegraph()}
<p>Check: the marginal products (50, 40, 30 ...) didn\'t change; only their dollar value did. <b>So what:</b> anything that raises the product\'s price, such as more consumers wanting it, shifts labor demand right; a fall in the price shifts it left.</p>
<div data-check="l31c-price"></div>

<h2>Technology: substitute or complement</h2>
<!-- src: MS6 (video 6.1: "Another change associated with a shift in demand, is technological change. As technology progresses, workers become more and more productive, and therefore, the firm needs less labor. So, as jobs become automated and firms replace labor with robots or automated production, there's going to be a decrease in the demand for labor"; slide 262); OS41 (Table 4.2: "Technology changes can act as either substitutes for or complements to labor ... word processing decreased the number of typists needed ... This shifted the demand curve for typists left ... the increased use of word processing and other software has increased the demand for information technology professionals"; Figure 4.3); OSE141 ("marginal product depends on the capital and technology with which workers have to work"). Source conflict recorded: the course gives only the substitute direction. -->
<p>Your course\'s second shifter is technology: "as jobs become automated and firms replace labor with robots or automated production, there\'s going to be a decrease in the demand for labor." Your course textbook adds the other half: "Technology changes can act as either substitutes for or complements to labor."</p>
${FIG6.l31tech()}
<p><b>Why it can go either way:</b> a ${dt('tech-substitute','substitute technology')} does a worker\'s job, so employers need fewer of those workers. A ${dt('tech-complement','complement technology')} needs workers to run it or makes them more productive, which raises each worker\'s value of MP, so employers want more.</p>
${FIG6.l31claim()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of a calculator in an accounting office. For the clerks whose whole job was adding columns of numbers, it is a replacement: fewer of them are needed. For the analysts who interpret the totals, it is a power tool: each one gets more done, so they are worth more. Same machine, opposite effects, depending on whose job it does.</p></div>
<p><b>Worked example (made-up):</b> a delivery company gives drivers a routing app, and the last driver hired now delivers 12 packages an hour instead of 10. At $3 per package, his value rises from 10 × $3 = $30 to 12 × $3 = $36 an hour. At a $33 wage he was not worth hiring before and is now: the demand for drivers shifts right. Sense check: the app worked with the drivers, so it is a complement. Self-driving vans would be a substitute.</p>
<div data-check="l31c-tech"></div>

<h2>Other inputs used with labor</h2>
<!-- src: MS6 (video 6.1: "Third, the supply or cost of other factors will cause a shift in the demand ... if other factors become scarce, the firm can produce less overall, so there's gonna be less demand for labor. If one of the key factors of production, not related to labor, becomes unavailable, then the firm cannot produce that good any longer"; slide 262); OS41 (Table 4.2, Price and Availability of Other Inputs: call center; "As the amount of inputs increases, the demand for labor will increase ... if prices of other inputs fall, production will become more profitable and suppliers will demand more labor to increase production. The opposite is also true. Higher input prices lower demand for labor") -->
<p>Your course\'s third shifter: "the supply or cost of other ${dt('factors','factors')}." Workers rarely produce alone; they work with other ${dt('inputs','inputs')}. The textbook\'s call-center salesperson "needs a telephone and a computer terminal."</p>
${FIG6.l31inputs()}
<p><b>Worked example (made-up numbers):</b> each call-center salesperson makes sales worth $20. With too few terminals, the last salesperson hired shares a desk and makes 8 sales a day: 8 × $20 = $160, less than a $200 daily wage, so the center won\'t hire him. It buys more terminals, and that salesperson now makes 12 sales: 12 × $20 = $240, more than $200. At the same wage, he is now worth hiring: demand shifted right.</p>
<p><b>Why:</b> when an input used alongside labor is plentiful and cheap, each worker produces more and production is more profitable, so the firm wants more workers. When it is scarce or expensive, the firm makes less and needs fewer. The textbook: "Higher input prices lower demand for labor." Lesson 32 returns to this as "linkages among the factors."</p>
<div data-check="l31c-inputs"></div>

<h2>Education, the number of firms and regulations</h2>
<!-- src: OS41 (Table 4.2: Education and Training: "A well-trained and educated workforce causes an increase in the demand for that labor by employers. Increased levels of productivity within the workforce will cause the demand for labor to shift to the right"; Number of Companies: "An increase in the number of companies producing a given product will increase the demand for labor"; Government Regulations: "government rules may require that nurses be hired to carry out certain medical procedures. This will increase the demand for nurses. Less-trained healthcare workers would be prohibited ... and the demand for these workers will shift to the left") -->
<p>Your course textbook\'s Table 4.2 adds three more shifters. A better-trained workforce is more productive, so "the demand for labor ... shift[s] to the right." More companies making a product means more employers looking for its workers. And regulations can require certain workers: a rule that nurses must do some procedures "will increase the demand for nurses" while the demand for less-trained workers "will shift to the left."</p>
${FIG6.l31table()}
<p><b>So what:</b> every shifter works through one of two channels. Some change how much a worker adds in dollars: price, technology, other inputs, training. Others change how many firms need the work: the number of companies, regulations. The wage is not on the list.</p>
<p><b>Worked example (made-up numbers):</b> a city adds 3 new bakeries, each hiring 4 bakers at the going wage. At that same wage, employers in the city now want 12 more bakers than before: the market demand for bakers shifted right by 12 at that wage. Sense check: no baker\'s productivity changed; there are simply more employers.</p>
<div data-check="l31c-other"></div>

<h2>Shift or move, and which way?</h2>
<!-- src: OS41 (Table 4.2), MS6 (slides 261-262). Exam skill: name the change, decide whether it is the wage (move) or something else (shift), then pick the direction. -->
<p>The exam move: (1) is the change the wage itself? Then it is a movement along the curve. (2) If not, does it make workers worth more to employers, or mean more employers need them? Shift right. Worth less, or fewer needed? Shift left. Try both tools.</p>
<div data-widget="ldshift"></div>
<p>What to notice: price and productivity changes move the whole curve and change hiring at a fixed wage; the wage slider only slides the hiring point along whichever curve is showing.</p>
<div data-widget="ldsort"></div>
<p>What to notice: technology needs one extra question, "does it replace these workers or help them?", before you can pick a direction.</p>
<div data-check="l31c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L31TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"A rise in the wage shifts labor demand to the left."</span>The wage moves the firm along its curve. Only other changes shift it.</li>
<li><span class="wrong">"New technology always lowers the demand for labor."</span>Only when it replaces those workers. Technology that workers use (a complement) raises demand for them.</li>
<li><span class="wrong">"A higher price for the product shifts the supply of labor."</span>It changes what workers are worth to employers, so it shifts labor <b>demand</b>.</li>
<li><span class="wrong">"If an input used with labor gets scarce, firms hire more workers to make up for it."</span>When the input works alongside labor, less of it means less output and fewer workers wanted.</li>
<li><span class="wrong">"An increase in labor demand moves the curve to the left."</span>An increase means more workers wanted at every wage: a shift to the right.</li>
<li><span class="wrong">"Only a change in the product\'s demand can shift labor demand."</span>Technology, other inputs, training, the number of firms and regulations shift it too.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A change in the <b>wage</b> moves a firm along its labor demand curve; other changes <b>shift</b> it.</li>
<li>A higher <b>output price</b> raises every worker\'s value of MP and shifts labor demand right (toaster firm: 3 → 4 workers at $250 when the price goes from $10 to $15).</li>
<li><b>Technology</b> can be a substitute (demand falls, typists) or a complement (demand rises, IT professionals); your course\'s slide gives only the first.</li>
<li>More or cheaper <b>other inputs</b> used with labor raise labor demand; scarcer or dearer ones lower it.</li>
<li><b>Education and training</b>, more <b>companies</b> and some <b>regulations</b> also shift labor demand.</li>
<li>On the exam: wage → move; anything else → shift, in the direction of workers\' value to employers.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Derived factor demand" and "Labor market and firms\' hiring of labor." Expect a scenario (a product\'s price rises, a technology arrives, an input gets dearer) asking which way the demand for some workers shifts, or a graph showing a shift with a question about the new wage and employment.</p>
</div>`,
  deeper:`
<h3>Two forces inside a technology change</h3>
<p>This is an inference from the lesson\'s own rules, not a textbook quote. A labor-saving machine can still raise the demand for the remaining workers if it cuts costs enough that the firm sells far more output. The textbook\'s point that the overall effect depends on substitutes and complements leaves room for both forces.</p>
<h3>Technology and wage gaps</h3>
<p>Your course textbook argues that computer and communication technologies were a substitute for low-skill workers and a complement to high-skill workers, which "will raise the pay of high-skill workers but reduce the pay of low-skill workers." It reports that a college graduate earned about 30% more than a comparable high school graduate in 1980 and about 60% more by 2012. Lesson 32 works through this with the four-step process.</p>`,
  links:[ {k:'Textbook',t:'4.1 Demand and Supply at Work in Labor Markets',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/4-1-demand-and-supply-at-work-in-labor-markets',w:'Table 4.2 lists every labor-demand shifter in this lesson, with the typist and call-center examples. Newer edition; wording may differ slightly.'},
          {k:'Video',t:'The Marginal Product of Labor',s:'Marginal Revolution University',u:'https://learn.mru.org/lessons/labor-economics-marginal-product-labor',w:'A short video that derives labor demand from the marginal product of labor (page description checked; the video itself was not reviewed for this lesson).'} ]
});

u6xv({
  'l31-typists':[u6shiftBig('Dl','Marked up: word processing shifts the demand for typists from D1 to D2; their wage and employment fall.'), '"A substitute, shifting the supply of typists left" is the tempting mix-up. The machine changed what employers need, not how many people want to type.'],
  'l31-it':[u6shiftBig('Dr','Marked up: the demand for IT professionals shifts from D1 to D2; their wage and employment rise.'), 'Calling the software a substitute fits the typists, not the people who run it. One technology can replace one group and raise demand for another.'],
  'l31-tf-tech':[FIG6.l31tech(), ''],
  'l31-phones':[u6shiftBig('Dr','Marked up: more phones and terminals shift the demand for salespeople from D1 to D2.'), '"The terminals replace salespeople" treats the equipment as a substitute. Here each salesperson needs a phone and a terminal to work at all, so more equipment raises demand.'],
  'l31-inputprice':[u6shiftBig('Dl','Marked up: dearer flour shifts the demand for bakers from D1 to D2.'), 'Bread prices may rise afterwards, but that comes from the smaller output, not from more customers.'],
  'l31-education':[u6shiftBig('Dr','Marked up: a better-trained workforce shifts the demand for that labor from D1 to D2.'), '"Trained workers cost more" mixes up the wage, which moves employers along the curve, with productivity, which shifts it.'],
  'l31-tf-wageshift':[u6moveBig('Marked up: the wage rises from W1 to W2, so the firm moves up its one demand curve from B to A.','W2','W1',true), ''],
  'l31-companies':[u6shiftBig('Dr','Marked up: more companies making the product shift the demand for its workers from D1 to D2.'), '"Each company is small" is true of one firm, but together the new companies add employers to the market.'],
  'l31-regulation':[figs([['Nurses', u6shift('Dr','Demand for nurses shifts right')],['Less-trained workers', u6shift('Dl','Demand for less-trained workers shifts left')]], 'Marked up: the rule moves demand toward nurses (right) and away from less-trained workers (left).'), '"Both shift right" misses that the rule takes work away from the less-trained workers.'],
  'l31-tf-pricesupply':[u6shiftBig('Dr','Marked up: a higher product price shifts labor demand from D1 to D2; labor supply doesn\'t move.'), ''],
  'l31-ms-scarce':[u6shiftBig('Dl','Marked up: a steel shortage shifts the demand for assembly workers from D1 to D2.'), ''],
  'l31-productivity':[u6shiftBig('Dr','Marked up: the faster mixer shifts the demand for bakers from D1 to D2.'), '"The mixer replaces bakers" would make it a substitute, but the bakers run it and turn out more bread.'],
  'l31-tf-companies':[u6shiftBig('Dl','Marked up: fewer companies shift the demand for these workers from D1 to D2.'), 'Fewer companies means fewer employers, so fewer workers are wanted at every wage.'],
  'l31-robots':[FIG6.l31tech(), '"Both fall" treats every technology as a substitute (M2).'],
  'l31-ms-vs-textbook':[FIG6.l31tech(), ''],
  'l31c-price':[atable(['Price of a bowl','Bowls he adds','Value of MP'],[['$10',8,'$80'],['$12',8,'$96']],{cls:'compact',hl:{1:{row:'u3z2'}}}), '"$96; shifts left" gets the number right but the direction wrong: a higher value means more workers wanted. $80 is the old value.'],
  'l31c-tech':[u6shiftBig('Dr','Marked up: the X-ray machine shifts the demand for radiology technicians from D1 to D2.'), '"A substitute" would fit a machine that does the technician\'s job; this one needs him.'],
  'l31c-inputs':[u6shiftBig('Dr','Marked up: cheaper fabric shifts the demand for sewing workers from D1 to D2.'), '"Fabric replaces workers" mistakes a complement for a substitute: the factory needs both to make clothes.'],
  'l31c-skill':[u6shiftBig('Dr','Marked up: more fish demanded shifts the demand for fishing-boat crews from D1 to D2.'), '"Supply shifts right" puts the change on the workers\' side; the diet changed what customers buy, which reaches workers through employers.'],
  'l31c-other':[figs([['Demand shifters: employers', u6shift('Dr','Labor demand shifts')],['Supply shifters: workers', u6shift('Sr','Labor supply shifts')]], 'Regulations change how many workers employers want, so they shift demand; leisure, child care and the number of job seekers shift supply. The wage moves along both curves.'), 'Leisure preferences, child-care costs and the number of job seekers are all on the workers\' side, so they shift supply, not demand.'],
  'l31-notshifter':[figs([['Shifts demand (employers)', u6shift('Dr','Labor demand shifts')],['Shifts supply (workers)', u6shift('Sr','Labor supply shifts right')]], 'More people wanting factory jobs moves the supply curve, not employers\' demand.'), '']
});
u6cv('l31', { 'Other inputs': FIG6.l31inputs(), 'Education and training': u6shift('Dr','Labor demand shifts right'), 'Number of companies': u6shift('Dr','Labor demand shifts right'),
  'Government regulations': figs([['Nurses', u6shift('Dr','Demand for nurses shifts right')],['Less-trained workers', u6shift('Dl','Demand for less-trained workers shifts left')]], 'A rule can shift demand right for one group and left for another.'),
  'Course vs textbook on technology': FIG6.l31tech(), 'Value of MP after a price change': atable(['Price','Units he adds','Value of MP'],[['$10',8,'$80'],['$12',8,'$96']],{cls:'compact',hl:{1:{row:'u3z2'}}}) });
