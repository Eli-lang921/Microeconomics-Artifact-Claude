/* ===== Lesson 32 figures ===== */
/* L32 V1: marginal factor cost from the labor-cost column (slides 263-265) */
FIG6.l32mfc = () => fig(atable(['Workers','Labor cost (wage $100)','MFC = change in cost ÷ 1'],
  TO.map((r,i)=>[r.L, usd6(r.cost), i ? `$${r.cost} − $${TO[i-1].cost} = <b>$100</b>` : '–']), { cls:'compact', hl:{3:{row:'u3z2'}} }),
  'Your course\'s toaster company, $100 a day per worker. Labor cost climbs $100 at a time, so each extra worker adds $100 to cost: MFC = $100 on every row, the same as the wage. The highlighted row: going from 2 to 3 workers raises cost from $200 to $300.');

/* L32 V2: the market sets the wage; the firm takes it (slides 266 and 268; OpenStax 2e §14.1) */
FIG6.l32firm = () => figs([
  ['The labor market', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Workers in the market', ylab:'Wage', aria:'Market supply and demand for labor crossing at the market wage',
    lines:[ sup([1,1],[9,9],''), dE([1,9],[9,1],'') ], hl:[{p:5,q:5,c:'var(--g2)'}], dots:[{q:5,p:5,label:'market wage',c:'var(--ink)',lx:8,ly:4}],
    labels:[ [9.2,8.2,'S (households)',SC,'end'], [9.2,2.6,'D (firms)',DC,'end'] ] })],
  ['One firm (toaster company)', sdg({ xmax:6.5, ymax:550, xt:[0,1,2,3,4,5,6], yt:[0,100,300,500], xlab:'Workers at this firm', ylab:'Dollars per day', aria:'A horizontal wage line at 100 meeting the firm’s value of marginal product at 5 workers',
    lines:[ {pts:VMP_PTS, c:DC}, {pts:[[0,100],[6.5,100]], c:'var(--g2)'} ], labels:[ vLab(500,550), wLab(100,550,6.5,'MFC = wage $100') ], dots:[{q:5,p:100,label:'hire 5',c:'var(--ink)',lx:-8,ly:20,anchor:'end'}], vls:[{q:5,p:100}] })]
], 'First panel (made-up curves): households\' supply and firms\' demand set the market wage. Second panel (your course\'s numbers): one small firm can hire as many workers as it likes at that wage, so the wage it faces is a flat line, MFC = wage. It hires where its value of MP meets that line. Your course\'s slide 266 squeezes both onto one graph; keeping them in separate panels shows that they measure different things.');

/* L32 V3: why the market supply of labor slopes up (textbook §4.1) */
FIG6.l32why = () => fig(flow([
  'The wage rises (say nurses\' pay rises in one city).',
  {split:[[{t:'Each hour of leisure now costs more pay given up, so some people <b>work more</b>.',c:'u3up'}],[{t:'People <b>move</b> to the city for the higher pay.',c:'u3up'}],[{t:'More people <b>train</b> for the job.',c:'u3up'}]]},
  {t:'A larger quantity of labor is supplied at the higher wage: the supply curve <b>slopes up</b>.',c:'u3end'}
]), 'Your course textbook: the supply curve "models the tradeoff between supplying labor into the market or using time in leisure activities," and higher nursing pay means "more nurses will move," "more people will be willing to train," and current nurses work more. These are movements along one supply curve, because only the wage changed.');

/* L32 V4: what shifts labor supply (slide 267; textbook Table 4.3) */
FIG6.l32shifters = () => fig(atable(['What changes','Example','Labor supply'],
  [['Number of workers (population, immigration)','"Influx of workers" (course); immigration (textbook)','→ right'],
   ['Preferences or income','More income → more time off (course)','← left'],
   ['','Want to buy more goods → work more (course)','→ right'],
   ['Price of related services','Child care gets more expensive (course)','← left'],
   ['Expectations','Later retirement age, longer life expectancy, better health (course)','→ right (more people at work)'],
   ['Required education','PhD mathematicians vs math teachers (textbook)','← left (when more education is required)'],
   ['Government policies','Tougher licenses ← left; training subsidies, child care benefits → right (textbook)','either way'],
   ['The wage itself','Wage rises from $15 to $18','No shift: a move along the curve']],
  { cls:'compact wrap', hl:{7:{row:'u3z3'}} }),
  'Your course\'s slide 267 and your textbook\'s Table 4.3. Every row changes how many people want to work at each wage, so it shifts the households\' supply curve. The direction for expectations is a reading of the slide\'s list (the slide doesn\'t give one): later retirement and better health keep more people working. The shaded row is the trap: the wage itself only moves along the curve.');

/* L32 V4b: a supply shift on the graph (made-up child-care example) */
FIG6.l32supshift = () => u6shiftBig('Sl', 'Made-up curves for the child-care example. At $18 an hour (W1), fewer people offer to work once child care doubles, so supply shifts left from S1 to S2. With employers\' demand unchanged, the wage rises to W2 and fewer people are employed (E1 to E2).', '$18', 'higher');

/* L32 V5: equilibrium, surplus and shortage for nurses (textbook Table 4.1, Figure 4.2) */
FIG6.l32nurses = (mark) => fig(sdg({ xmax:47, ymax:82, xmin:18, ymin:52, xt:[20,27,34,40,45], yt:[55,60,70,75,80], xlab:'Nurses (thousands)', ylab:'Salary ($ thousands)', aria:'Supply and demand for nurses crossing at 70 thousand dollars and 34 thousand nurses',
  lines:[ {pts:NU_W.map((w,i)=>[NU_D[i],w]), c:DC, label:'D', lx:4, ly:4}, {pts:NU_W.map((w,i)=>[NU_S[i],w]), c:SC, label:'S', lx:4, ly:4} ],
  dots:[{q:34,p:70,label:'E: $70,000, 34,000',c:'var(--ink)',lx:-8,ly:-10,anchor:'end'}],
  spans: mark==='65' ? [{p:65,q1:31,q2:37,c:'var(--bad)',label:'shortage 6,000',ly:14}] : mark==='80' ? [{p:80,q1:32,q2:41,c:'var(--g2)',label:'surplus 9,000',ly:-8}]
    : [{p:75,q1:33,q2:38,c:'var(--g2)',label:'surplus 5,000',lx:52,ly:4,anchor:'start'},{p:60,q1:27,q2:40,c:'var(--bad)',label:'shortage 13,000',ly:14}] }),
  mark==='65' ? 'Your course textbook\'s nurses (Table 4.1), marked at $65,000: employers want 37,000 but only 31,000 offer to work, a shortage of 6,000.' : mark==='80' ? 'Your course textbook\'s nurses (Table 4.1), marked at $80,000: 41,000 offer to work but employers want only 32,000, a surplus of 9,000.' :
  'Your course textbook\'s nurses (Table 4.1). At $70,000 the quantities match: 34,000 nurses. At $75,000, 38,000 want to work but employers want 33,000: a surplus of 5,000, so salaries drift down. At $60,000, employers want 40,000 but only 27,000 offer: a shortage of 13,000, so salaries are bid up.');

/* L32 V6: the four-step process: technology and wages (textbook §4.1, Figure 4.3) */
FIG6.l32tech = () => figs([
  ['Low-skill labor (technology is a substitute)', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Low-skill workers', ylab:'Wage', aria:'Low-skill labor demand shifts left',
    lines:[ dE([3,9],[10,2],'D0',{c:OLD,dash:'5 4',w:2}), dE([1,9],[8,2],'D1'), sup([1,2],[8,9],'S0') ], dots:[{q:5.5,p:6.5,label:'E0',c:'var(--muted)',lx:8,ly:-4},{q:4.5,p:5.5,label:'E1',c:'var(--ink)',lx:-8,ly:12,anchor:'end'}], arrows:[{a:[6.8,4.3],b:[5,4.3]}] })],
  ['High-skill labor (technology is a complement)', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'High-skill workers', ylab:'Wage', aria:'High-skill labor demand shifts right',
    lines:[ dE([1,9],[8,2],'D0',{c:OLD,dash:'5 4',w:2}), dE([3,9],[10,2],'D1'), sup([1,2],[8,9],'S0') ], dots:[{q:4.5,p:5.5,label:'E0',c:'var(--muted)',lx:-8,ly:12,anchor:'end'},{q:5.5,p:6.5,label:'E1',c:'var(--ink)',lx:8,ly:-4}], arrows:[{a:[4.6,4.3],b:[6.4,4.3]}] })]
], 'Your course textbook\'s Figure 4.3, redrawn with made-up curves. Same technology, two labor markets. First panel: demand for low-skill workers falls, so their wage and employment fall (E0 to E1). Second panel: demand for high-skill workers rises, so their wage and employment rise.');

/* L32 V7: linkages among the factors (slide 269) */
FIG6.l32link = () => fig(flow([
  'A farm gets <b>more tractors</b> (more capital).',
  'Each farm worker can now work more land: the <b>marginal product of labor rises</b>.',
  'Each worker\'s value of MP (MP × price) rises, so <b>labor demand shifts right</b>.',
  {t:'Farm workers\' <b>wages rise</b>: a change in one factor changed another factor\'s earnings.',c:'u3end'}
]), 'Made-up example of your course\'s slide 269: "Productivity of each factor depends on the quantities of the other factors available" and "Change in the supply of any one factor can change the earnings of all of the factors." The chain runs through the marginal product of the factor whose earnings change.');

/* ===== Lesson 32: Labor Supply, Marginal Factor Cost and the Equilibrium Wage (Modern States video 6.1, last part; Module 6 slides 263-269) =====
   Common mistakes: M1 in a competitive labor market MFC is above the wage · M2 the market labor supply curve is flat · M3 a higher wage shifts labor supply
   M4 more income always means more work · M5 more workers in a market raise the wage · M6 a wage above equilibrium causes a shortage */
const SUP_CH = (ok) => ['Dr','Dl','Sr','Sl','mv'].map(k => shiftChoice(k, k===ok));

mc('l32-mfc-def','l32','Your course defines marginal factor cost (MFC) as',
  [`the additional cost the firm incurs by employing one more unit of an input`,`the wage paid to the first worker hired`,`the value of the last worker\'s output`,`total labor cost divided by the number of workers`,`the extra output from one more worker`],0,
  `<p>Your course: "The additional cost that the firm incurs to employ one more unit is called the Marginal Factor Cost," computed as (Cost2 − Cost1) ÷ (L2 − L1). The value of the last worker\'s output is the value of MP (Lesson 30), the other side of the hiring decision. Total cost ÷ workers is an average.</p>`);
mc('l32-mfc-comp','l32','A small café hires baristas in a perfectly competitive labor market at the going wage of $15 an hour. As it hires more baristas, its marginal factor cost for labor',
  [`stays at $15, equal to the wage`,`rises above $15 with each barista`,`falls below $15 with each barista`,`equals the value of the last barista\'s output, whatever the wage`,`is zero once the café has enough baristas`],0,
  `<p>In a perfectly competitive labor market the café can hire as many baristas as it wants at $15, so each one adds exactly $15 to cost. Your course: "when wages don\'t change with the number of workers employed, the Marginal Factor Cost ... is going to be equal to the wage rate." MFC rises above the wage only for a firm that must raise pay to attract more workers (M1).</p>${fig(u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:'var(--g2)',label:'MFC = wage = $15',lx:-2,ly:-5,anchor:'end'}], xlab:'Baristas hired', ylab:'Dollars', aria:'A flat MFC line at 15 dollars' }), 'Marked up: every barista adds the same $15 to cost, so MFC is a flat line at the wage.')}`);
gen('l32-g-mfc','l32',()=>{
  const rising = Math.random() < 0.5, n = 5;
  let wages, costs;
  if(rising){ const w0 = pick([8,10,12]), step = pick([1,2]); wages = Array.from({length:n},(_,i)=>w0+step*i); costs = wages.map((w,i)=>w*(i+1)); }
  else { const w = pick([12,14,15,18,20]); wages = Array(n).fill(w); costs = wages.map((x,i)=>x*(i+1)); }
  const k = pick([2,3,4,5]), ans = costs[k-1] - costs[k-2];
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A firm\'s hourly labor cost${rising?' (it must raise the wage for everyone to attract more workers)':' (it pays the same wage however many it hires)'}:${atable(['Workers','Wage','Total labor cost'], wages.map((w,i)=>[i+1,'$'+w,'$'+costs[i]]), { cls:'compact' })}What is the marginal factor cost of the <b>${ordinal(k)}</b> worker?`, answer:ans,
    explain:`<p>MFC = change in total labor cost = $${costs[k-1]} − $${costs[k-2]} = <b>$${ans}</b>.</p>${atable(['Workers','Total labor cost','MFC'], costs.map((c,i)=>[i+1,'$'+c, i?'$'+(c-costs[i-1]):'$'+c]), { cls:'compact', hl:{[k-1]:{row:'u3z2'}} })}<p>${rising?`Here MFC ($${ans}) is above the ${ordinal(k)} worker\'s wage ($${wages[k-1]}), because hiring him means paying everyone more. The slip is answering the wage.`:`With a constant wage, MFC equals the wage ($${wages[0]}), as in your course\'s toaster company. The slip is answering total cost ($${costs[k-1]}).`}</p>` };
});
lazy('l32-gr-firmsupply','l32',()=>visMC({
  prompt:`Each graph puts the wage (up) against the number of workers one firm hires (across). Which graph shows the supply of labor to a <b>single small firm</b> in a perfectly competitive labor market?`,
  choices:[
    { svg:L=>u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:SC}], xlab:'Workers at one firm', aria:'Graph '+L }), desc:'a horizontal line at one wage', ok:true },
    { svg:L=>u6mini({ lines:[{a:[1,1],b:[9,9],c:SC}], xlab:'Workers at one firm', aria:'Graph '+L }), desc:'a line sloping up' },
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:SC}], xlab:'Workers at one firm', aria:'Graph '+L }), desc:'a line sloping down' },
    { svg:L=>u6mini({ lines:[{a:[5,0.5],b:[5,9.5],c:SC}], xlab:'Workers at one firm', aria:'Graph '+L }), desc:'a vertical line' },
    { svg:L=>u6mini({ lines:[{pts:[[1,2],[3,6],[5,8],[7,6],[9,2]],c:SC}], xlab:'Workers at one firm', aria:'Graph '+L }), desc:'a hill-shaped curve' } ],
  explain: L => `<p><b>Graph ${L}</b>: a horizontal line at the market wage. The firm is too small to move the wage, so it can hire as many workers as it wants at that wage, and each one adds the wage to cost (MFC = wage).</p>${FIG6.l32firm()}<p>The upward line is the <b>market</b> supply of labor from all households (M2). A downward line is a demand curve.</p>` }));
mc('l32-why-up','l32','Why does the market supply curve of labor slope upward?',
  [`A higher wage makes leisure more costly, and draws people to move to, train for and take more of that work`,`Firms want more workers when wages are higher`,`Each extra worker adds less output`,`A higher wage lowers the price of the product`,`Workers\' marginal product rises with the wage`],0,
  `<p>Your course textbook: the supply curve "models the tradeoff between supplying labor into the market or using time in leisure activities ... The higher the wage, the more labor is willing to work and forego leisure activities." Higher nursing pay brings more people to move, train and work as nurses.</p><p>"Firms want more workers at higher wages" has demand backwards. "Each extra worker adds less" is why demand slopes down (Lesson 30).</p>`);
mc('l32-childcare','l32','Your course lists the "price of related services" as a shifter of labor supply. Made-up scenario: child care in a city becomes much more expensive. What happens to the supply of labor there?',
  [`It decreases (shifts left), because some parents choose not to work`,`It increases, because parents need more money for child care`,`It doesn\'t change, because child care is not a wage`,`The demand for labor decreases instead`,`Workers move down along the supply curve`],0,
  `<p>Your course: "Services that affect the ‘cost’ of working: child care costs. Child care more expensive: may choose to not work." Fewer people want to work at each wage, so supply shifts left. It is the workers\' side that changed, not employers\'.</p>${u6shiftBig('Sl','Marked up: supply moves from S1 to S2 (left), so the wage rises (W1 to W2) and employment falls (E1 to E2).')}`);
tf('l32-tf-income','l32','According to your course, when people have more income, the supply of labor always increases.',false,
  `<p>False. Your course: "If people have more income, they\'re gonna choose to take more time off and go on vacation, so the supply of labor decreases." Supply rises when people "prefer to buy more goods and services" and so "need to work for more income" (M4).</p>`);
mc('l32-nurses-eq','l32',`Your course textbook\'s market for nurses in one metro area:${nuTbl()}What are the equilibrium salary and number of nurses, and what happens at a salary of $75,000?`,
  [`$70,000 and 34,000 nurses; at $75,000 there is a surplus of 5,000 nurses`,`$70,000 and 34,000 nurses; at $75,000 there is a shortage of 5,000 nurses`,`$75,000 and 38,000 nurses; there is no surplus`,`$60,000 and 40,000 nurses; at $75,000 there is a surplus of 13,000`,`$80,000 and 41,000 nurses; at $75,000 there is a shortage of 5,000`],0,
  `<p>At $70,000 the quantities match: 34,000 demanded and 34,000 supplied. At $75,000, 38,000 want to work but employers want only 33,000: a <b>surplus</b> of 38,000 − 33,000 = 5,000.</p>${nuTbl(4)}<p>Calling an above-equilibrium salary a shortage is the slip (M6). At $75,000 employers have many applicants, so the textbook says salaries "will move down toward equilibrium."</p>`);
gen('l32-g-surplus','l32',()=>{
  const Ws = pick([12,14,15,16,18,20]), Qs0 = pick([300,400,500,600]), b = pick([20,25,30,40]), d = pick([20,25,30,40]);
  const k = pick([-2,-1,1,2]), W = Ws + k, Qd = Qs0 - b*k, Qs = Qs0 + d*k, gap = Math.abs(Qd - Qs), surplus = Qs > Qd;
  const rows = [-2,-1,0,1,2].map(j=>[ '$'+(Ws+j), (Qs0-b*j).toLocaleString('en-US'), (Qs0+d*j).toLocaleString('en-US') ]);
  const other = b*Math.abs(k), alt = gap===other ? gap + d : other;
  const opts = [`A ${surplus?'surplus':'shortage'} of ${gap.toLocaleString('en-US')} workers`, `A ${surplus?'shortage':'surplus'} of ${gap.toLocaleString('en-US')} workers`, `A ${surplus?'surplus':'shortage'} of ${alt.toLocaleString('en-US')} workers`, `No surplus or shortage`, `A ${surplus?'shortage':'surplus'} of ${alt.toLocaleString('en-US')} workers`];
  return { type:'mc', kind:'mc', prompt:`Made-up numbers. The market for warehouse workers in a city (workers wanted and offered at each hourly wage):${atable(['Hourly wage','Workers demanded','Workers supplied'], rows, { cls:'compact' })}If the wage were <b>$${W}</b>, what would the market have?`, options:opts, answer:0,
    explain:`<p>At $${W}, employers want ${Qd.toLocaleString('en-US')} and ${Qs.toLocaleString('en-US')} people want to work. ${surplus?`More people want jobs than there are jobs: a <b>surplus</b> of ${Qs.toLocaleString('en-US')} − ${Qd.toLocaleString('en-US')} = ${gap.toLocaleString('en-US')}. The wage is above equilibrium ($${Ws}) and would fall.`:`Employers want more workers than are available: a <b>shortage</b> of ${Qd.toLocaleString('en-US')} − ${Qs.toLocaleString('en-US')} = ${gap.toLocaleString('en-US')}. The wage is below equilibrium ($${Ws}) and would be bid up.`}</p>${atable(['Hourly wage','Workers demanded','Workers supplied'], rows, { cls:'compact', hl:{[k+2]:{row:'u3z2'},2:{row:'u3z1'}} })}<p>The shaded green row is the equilibrium, where the quantities match. Mixing up surplus and shortage is the common slip (M6): a wage above equilibrium leaves extra job seekers.</p>` };
});
lazy('l32-gr-immig','l32',()=>visMC({
  prompt:`Made-up scenario. Thousands of construction workers move to a fast-growing city looking for work, and nothing else changes. Which graph shows the effect on the city\'s market for construction labor?`,
  choices: SUP_CH('Sr'),
  explain: L => `<p><b>Graph ${L}</b>: the supply of construction labor shifts right. Your course: "Influx of workers → shifts supply curve." With demand unchanged, the wage falls and more workers are employed.</p>${u6shiftBig('Sr','The answer graph, marked up: S1 to S2 lowers the wage (W1 to W2) and raises employment (E1 to E2).')}<p>Thinking more workers raise the wage is the trap (M5): more people offering the same work, with the same demand, pushes pay down. Employers\' demand didn\'t change, so demand doesn\'t shift.</p>` }));
mc('l32-highlow','l32','Your course textbook argues that new information technology is a substitute for low-skill workers and a complement to high-skill workers. Using supply and demand, what does it predict?',
  [`Low-skill wages and employment fall; high-skill wages and employment rise`,`Both groups\' wages rise`,`Both groups\' wages fall`,`Low-skill wages rise; high-skill wages fall`,`Only labor supply changes in both markets`],0,
  `<p>The textbook\'s four steps: the technology affects demand; demand for low-skill labor shifts left (lower wage and quantity) and demand for high-skill labor shifts right (higher wage and quantity). It reports that a college graduate earned about 30% more than a comparable high school graduate in 1980 and about 60% more by 2012.</p>${FIG6.l32tech()}`);
mc('l32-linkage','l32','Made-up scenario. A farm buys more tractors, so each farm worker can work more land and produces more. According to your course\'s "linkages among the factors of production," what happens to farm workers\' earnings?',
  [`They tend to rise, because the extra capital raises workers\' marginal product and so the demand for them`,`They fall, because tractors replace all farm workers`,`They don\'t change, because tractors are capital, not labor`,`They rise, because the supply of farm workers falls`,`They fall, because the farm spent money on tractors`],0,
  `<p>Your course: "Productivity of each factor depends on the quantities of the other factors available," and a change in one factor "can change the earnings of all of the factors." Here the tractors work alongside the workers, so each worker\'s marginal product and value of MP rise, demand for them shifts right, and wages tend to rise.</p>${FIG6.l32link()}`);
/* L32 more */
mc('l32-eq-rule','l32','Your course: "Equilibrium in the Factors Market occurs when the Value of output produced by the last worker is equal to the cost of employing that worker." In a competitive labor market, this means that at equilibrium',
  [`value of the marginal product = marginal factor cost = the market wage`,`value of the marginal product is greater than the wage`,`the wage equals the value of the first worker\'s output`,`marginal factor cost is zero`,`every worker produces the same output`],0,
  `<p>Each firm hires until the last worker\'s value of MP equals what he adds to cost (MFC), and in a competitive labor market MFC is the market wage. Your course\'s slide 268: "Value MPL = MFC," and the video adds that this is "equal to the wage rate."</p>`);
tf('l32-tf-mfcwage','l32','In your course\'s toaster company, where every worker is paid $100 a day, the marginal factor cost of each worker is $100.',true,
  `<p>True. Labor cost rises $100, $200, $300 ... so each worker adds $100. Your course: "the Marginal Factor Cost, is exactly equal to our wage rate." (M1)</p>`);
mc('l32-retire','l32','Your course lists "expectations" such as retirement age and pensions as a labor supply shifter. Made-up scenario: a country raises the age at which people can collect a full pension, so many people plan to keep working longer. What happens to labor supply?',
  [`It increases (shifts right)`,`It decreases (shifts left)`,`It doesn\'t change`,`The demand for labor shifts right instead`,`It moves along the supply curve to a higher wage`],0,
  `<p>More people stay in the workforce at each wage, so supply shifts right. This direction is a reading of your course\'s slide, which lists "Retirement age/pension" under expectations without giving a direction. The textbook adds that "an aging and therefore retiring population will decrease the supply of labor," the reverse case.</p>`);
mc('l32-education-req','l32','Your course textbook: "There is a lower supply of PhD mathematicians than of high school mathematics teachers." Why?',
  [`The more education a job requires, the fewer people are qualified to supply it`,`Employers demand fewer PhD mathematicians`,`PhD mathematicians earn less`,`High school teachers\' wages are higher`,`Required education shifts the demand curve`],0,
  `<p>The textbook: "The more required education, the lower the supply." Fewer people complete the training, so fewer can offer that labor at any wage. That is a supply fact; demand is a separate question.</p>`);
mc('l32-license','l32','Your course textbook: when a government makes the qualifications for a job tougher (licenses, certificates), what happens to the supply of labor for that job?',
  [`It decreases: fewer workers qualify at any wage`,`It increases: the job becomes more attractive`,`It doesn\'t change`,`The demand for the job shifts left`,`It moves along the supply curve`],0,
  `<p>The textbook: "When these qualifications are made tougher, the number of qualified workers will decrease at any given wage." That is a leftward shift in supply, which tends to raise the wage in that job.</p>`);
mc('l32-subsidy','l32','Your course textbook: the government offers subsidies for nursing schools and nursing students. What does this do?',
  [`Shifts the supply of nurses to the right`,`Shifts the demand for nurses to the right`,`Shifts the supply of nurses to the left`,`Raises nurses\' salaries directly`,`Has no effect on the nursing market`],0,
  `<p>The textbook: "government might offer subsidies for nursing schools or nursing students. Such provisions would shift the supply curve of nurses to the right." More people can train, so more nurses are available at each salary.</p>`);
lazy('l32-gr-eq','l32',()=>({ type:'mc', kind:'graph',
  prompt:`Your course textbook\'s market for nurses (Table 4.1), salaries in thousands of dollars:${sdg({ xmax:47, ymax:82, xmin:18, ymin:52, xt:[20,27,31,34,37,40,45], yt:[55,60,65,70,75,80], xlab:'Nurses (thousands)', ylab:'Salary ($ thousands)', aria:'Supply and demand for nurses',
    lines:[ {pts:NU_W.map((w,i)=>[NU_D[i],w]), c:DC, label:'D', lx:4, ly:4}, {pts:NU_W.map((w,i)=>[NU_S[i],w]), c:SC, label:'S', lx:4, ly:4} ], hl:[{p:65,c:'var(--g2)',label:'$65,000'}] })}At a salary of $65,000, what does this market have?`,
  options:[`A shortage of 6,000 nurses`,`A surplus of 6,000 nurses`,`A shortage of 3,000 nurses`,`No shortage or surplus`,`A surplus of 37,000 nurses`], answer:0,
  explain:`<p>At $65,000, employers want 37,000 nurses (demand curve) but only 31,000 offer to work (supply curve): a <b>shortage</b> of 37,000 − 31,000 = 6,000. The salary is below the $70,000 equilibrium, so employers will bid it up.</p>${FIG6.l32nurses('65')}<p>"Surplus" reverses which side is bigger (M6). 37,000 is the quantity demanded, not a gap.</p>` }));
mc('l32-shortage','l32','Your course textbook\'s market for nurses has an equilibrium salary of $70,000. At $60,000, employers would want 40,000 nurses, but only 27,000 would want to work. If salaries were at $60,000, what would happen?',
  [`A shortage: employers would offer higher pay, and salaries would move up toward equilibrium`,`A surplus: salaries would fall further`,`Nothing: the market would stay at $60,000`,`Employers would hire 40,000 nurses at $60,000`,`The demand for nurses would shift left`],0,
  `<p>The textbook: "if the salary is below the equilibrium at, say, $60,000 ... a situation of excess demand or a shortage arises ... some employers will offer higher pay to attract the nurses." Employers want 40,000 but only 27,000 are available, so 40,000 can\'t actually be hired.</p>${FIG6.l32nurses()}`);
mc('l32-caption','l32','Your course textbook\'s Figure 4.2 caption says that at a below-equilibrium salary of $60,000, "excess demand or a surplus exists." The textbook\'s own paragraph calls it "excess demand or a shortage." Which is right?',
  [`Shortage: at $60,000 the quantity demanded (40,000) is greater than the quantity supplied (27,000)`,`Surplus: the quantity supplied is greater`,`Both: excess demand and surplus mean the same thing`,`Neither: the market is in equilibrium at $60,000`,`Surplus, because the salary is low`],0,
  `<p>Excess demand is a shortage: more nurses wanted (40,000) than available (27,000). A surplus is excess supply, which happens above equilibrium. The caption has a slip; the paragraph is correct (M6).</p>${FIG6.l32nurses()}`);
gen('l32-g-shift','l32',()=>{
  const b = pick([20,30,40,50]), d = pick([20,30,40,50]), W1 = pick([12,14,15,16,18]), Q1 = pick([400,500,600,800]), D = pick([1,2,3]), up = Math.random()<0.5;
  const s = (b+d)*D*(up?1:-1), W2 = W1 + (up?D:-D);
  const a = Q1 + b*W1, c = Q1 - d*W1;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. In a labor market, the quantity of labor demanded is <b>Qd = ${a} − ${b}W</b> and supplied is <b>Qs = ${c<0?'−'+Math.abs(c)+' + ':c+' + '}${d}W</b> (W = hourly wage). The equilibrium wage is $${W1}. Then the demand for labor ${up?'rises':'falls'} by <b>${Math.abs(s)}</b> workers at every wage. What is the new equilibrium wage?`, answer:W2,
    explain:`<div class="math">New demand: Qd = ${a+s} − ${b}W<br>Set Qd = Qs: ${a+s} − ${b}W = ${c} + ${d}W<br>${a+s-c} = ${b+d}W → W = <b>$${W2}</b></div><p>Sense check: demand ${up?'rose':'fell'}, so the wage ${up?'rose':'fell'}, from $${W1} to $${W2}. Employment ${up?'rises':'falls'} too, to ${c+d*W2}. The common slip is shifting the wage by the full ${Math.abs(s)} ÷ ${b} = ${fmt(Math.abs(s)/b)}; the supply curve absorbs part of the shift.</p>` };
});
tf('l32-tf-supplyflat','l32','The market supply curve of labor, from all households together, is a horizontal line at the market wage.',false,
  `<p>False. The <b>market</b> supply curve slopes up: a higher wage draws more people into work. The flat line at the market wage is the supply of labor to <b>one small firm</b>, which can hire all it wants at that wage. Your course\'s slide 266 shows both lines on one graph (M2).</p>${FIG6.l32firm()}`);
lazy('l32-gr-supplyleft','l32',()=>visMC({
  prompt:`Made-up scenario. In one city, the cost of child care doubles, and many parents decide to stay home rather than work. Which graph shows the effect on the city\'s labor market?`,
  choices: SUP_CH('Sl'),
  explain: L => `<p><b>Graph ${L}</b>: labor supply shifts left. Your course: "Child care more expensive: may choose to not work." Fewer people offer to work at each wage, so the wage rises and employment falls.</p>${u6shiftBig('Sl','The answer graph, marked up: S1 to S2 raises the wage (W1 to W2) and lowers employment (E1 to E2).')}<p>Employers didn\'t change how many workers they want at each wage, so demand stays put. A higher wage here is the result, not the cause (M3).</p>` }));
mc('l32-preferences','l32','According to your course, if people come to "prefer to buy more goods and services," what happens to the supply of labor?',
  [`It increases, because they need to work more for more income`,`It decreases, because they spend more time shopping`,`It doesn\'t change, because only wages affect labor supply`,`The demand for labor decreases`,`It moves down along the supply curve`],0,
  `<p>Your course: "If people prefer to buy more goods and services, well, then they need to work for more income, so the supply of labor would go up." A change in preferences shifts the curve; only the wage moves along it (M3).</p>`);
mc('l32-both','l32','Made-up scenario. In a city, the demand for software developers rises and, at the same time, more developers move there. What happens to developers\' employment and wage?',
  [`Employment rises; the wage could rise, fall or stay the same, depending on the sizes of the shifts`,`Employment rises and the wage rises`,`Employment rises and the wage falls`,`Employment falls and the wage rises`,`Both stay the same, because the shifts cancel`],0,
  `<p>Both shifts push employment up. Demand shifting right pushes the wage up; supply shifting right pushes it down, so the net wage change depends on which shift is bigger (the same two-shift rule as Lesson 7).</p>`);
mc('l32-mfc-rising','l32','Made-up scenario. A firm is the only employer in a small town. To hire a 6th worker it must raise the wage from $14 to $15 an hour for all six workers. What is its marginal factor cost of the 6th worker?',
  [`$20`,`$15`,`$14`,`$1`,`$90`],0,
  `<p>Labor cost goes from 5 × $14 = $70 to 6 × $15 = $90, so MFC = $90 − $70 = <b>$20</b>, more than the $15 wage. That only happens when hiring more means paying everyone more. In a perfectly competitive labor market the wage doesn\'t rise as one firm hires, so MFC = wage (M1). The Go deeper section calls this kind of employer a monopsony.</p>`);
mc('l32-pop','l32','Your course textbook: "Population grows when birth rates exceed death rates; this eventually increases supply of labor." If the working-age population grows and nothing else changes, what happens in the labor market?',
  [`Supply shifts right: the wage tends to fall and employment rises`,`Supply shifts right: the wage rises and employment rises`,`Demand shifts right: the wage rises`,`Supply shifts left: the wage rises`,`Nothing, until wages change`],0,
  `<p>More workers at each wage means supply shifts right. With demand unchanged, the equilibrium wage falls and more people are employed. Expecting a higher wage is the slip (M5).</p>${u6shiftBig('Sr','Marked up: supply moves from S1 to S2 (right), so the wage falls (W1 to W2) and employment rises (E1 to E2).')}`);

/* ===== Lesson 32 quick checks ===== */
mc('l32c-mfc','l32','Made-up numbers. A shop\'s labor cost is $360 a day with 3 workers and $480 with 4 workers. What is the marginal factor cost of the 4th worker?',
  [`$120`,`$480`,`$160`,`$840`,`$360`],0,
  `<p>MFC = $480 − $360 = <b>$120</b>. $480 is total cost with 4 workers and $360 with 3; $160 is $480 ÷ 3, mixing up the counts.</p>`);
lazy('l32c-firm','l32',()=>visMC({
  prompt:`A small apple orchard hires pickers in a large, competitive labor market where the going wage is $16 an hour. Each graph puts the wage up the side and the orchard\'s pickers along the bottom. Which graph shows the labor supply the orchard faces?`,
  choices:[
    { svg:L=>u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:SC}], xlab:'Its pickers', aria:'Graph '+L }), desc:'a horizontal line at the market wage', ok:true },
    { svg:L=>u6mini({ lines:[{a:[1,1],b:[9,9],c:SC}], xlab:'Its pickers', aria:'Graph '+L }), desc:'an upward-sloping line' },
    { svg:L=>u6mini({ lines:[{a:[5,0.5],b:[5,9.5],c:SC}], xlab:'Its pickers', aria:'Graph '+L }), desc:'a vertical line' },
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:SC}], xlab:'Its pickers', aria:'Graph '+L }), desc:'a downward-sloping line' },
    { svg:L=>u6mini({ lines:[{pts:[[1,2],[3,6],[5,8],[7,6],[9,2]],c:SC}], xlab:'Its pickers', aria:'Graph '+L }), desc:'a hill-shaped curve' } ],
  explain: L => `<p><b>Graph ${L}</b>: a horizontal line at $16. Like a price taker in a product market (Lesson 22), the small orchard takes the market wage as given and can hire all the pickers it wants at $16, so MFC = $16 for every picker.</p>${fig(`<div style="max-width:260px">${u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:SC,label:'S = MFC = $16',lx:-2,ly:-5,anchor:'end'}], xlab:'Its pickers', aria:'Marked-up answer graph: a flat supply line at 16 dollars' })}</div>`, 'The answer graph, marked up: one small firm faces a flat supply of labor at the market wage.')}<p>The upward-sloping line is the <b>market</b> supply; carrying it over to one small firm is the slip (M2).</p>` }));
mc('l32c-shift','l32','Which of the following shifts the supply of labor, rather than the demand?',
  [`People expect to live longer and plan to work more years`,`The price of the product workers make rises`,`New machines replace workers`,`More companies open in the industry`,`The wage rises`],0,
  `<p>Expectations about life expectancy and retirement are on your course\'s supply list. The product price, machines and number of companies shift demand; the wage is a movement along a curve.</p>`);
mc('l32c-eq','l32','Your course textbook\'s nurses: at $80,000, 32,000 nurses are demanded and 41,000 are supplied. What does the market have at that salary?',
  [`A surplus of 9,000 nurses`,`A shortage of 9,000 nurses`,`A surplus of 41,000 nurses`,`A shortage of 32,000 nurses`,`Equilibrium`],0,
  `<p>41,000 − 32,000 = 9,000 more nurses want work than employers want to hire: a surplus. Above the $70,000 equilibrium, salaries tend to fall.</p>${FIG6.l32nurses('80')}`);
mc('l32c-four','l32','Textbook four-step process. Made-up scenario: a new app lets travelers book flights themselves, replacing many travel agents. What happens to travel agents\' wage and employment?',
  [`Both fall, because demand for travel agents shifts left`,`Both rise, because demand shifts right`,`The wage rises and employment falls, because supply shifts left`,`The wage falls and employment rises, because supply shifts right`,`Neither changes`],0,
  `<p>Step 2: the app affects firms\' demand for agents. Step 3: it is a substitute, so demand shifts left. Step 4: the new equilibrium has a lower wage and fewer agents employed.</p>`);
mc('l32c-link','l32','Your course: "Change in the supply of any one factor can change the earnings of all of the factors." Made-up case: an oil field runs dry, so a drilling company has much less oil to pump. What happens to its drilling crews?',
  [`Their marginal product falls, so demand for them and their earnings tend to fall`,`Their earnings rise, because labor replaces the oil`,`Nothing, because oil is not labor`,`Their supply shifts right`,`Their marginal product rises`],0,
  `<p>Crews and oil are used together. Less oil means each crew member adds less output, so the value of MP falls, demand for crews shifts left, and earnings tend to fall.</p>`);
mc('l32c-skill','l32','Made-up scenario. A state cuts its unemployment benefits sharply, and more people start looking for work. What happens to the wage and employment in the state\'s labor market?',
  [`Supply shifts right: the wage tends to fall and employment rises`,`Demand shifts right: both rise`,`Supply shifts left: the wage rises`,`Demand shifts left: both fall`,`Nothing changes until employers react`],0,
  `<p>Your course textbook lists unemployment benefits among the "government policies that change the relative desirability of working versus not working." Cutting them makes more people want to work at each wage: supply shifts right, lowering the wage and raising employment.</p>`);

/* Course materials checked 2026-11-04: video 6.1 transcript ("the supply of the factors of production come from the household"; "The additional cost that the firm incurs to employ one more unit is called the Marginal Factor Cost";
   "when wages don't change with the number of workers employed, the Marginal Factor Cost ... is going to be equal to the wage rate"; supply shifts: number of workers, "influx of labor", income → "take more time off", "prefer to buy more goods" → work more;
   equilibrium "the Marginal Factor Cost that determines the supply of labor is equal to the value of the Marginal Product"; linkages), slides 263-269 (MFC = (Cost2 − Cost1)/(L2 − L1); slide 266 Supply by Households (upward) and MFC = Market Wage Rate (flat);
   slide 267 price of related services (child care), expectations (retirement age/pension, life expectancy, health); slide 268 "Value MPL = MFC"; slide 269 linkages); course textbook §4.1 (upward-sloping supply, leisure tradeoff; nurses Table 4.1, $70,000 and 34,000; surplus at $75,000; shortage at $60,000;
   Figure 4.2 caption slip "excess demand or a surplus"; Table 4.3 number of workers, required education, government policies; four-step process, Figure 4.3, 30% → 60%); CLEP sample question 6 (marginal factor cost in a perfectly competitive labor market is constant and equal to the market wage); OpenStax 2e §14.1-§14.2. */
const L32TAGS = {
  'l32-mfc-def':['MS6','lab','terms','M1'], 'l32-mfc-comp':['MS6 CBS','lab','models','M1'], 'l32-g-mfc':['MS6 OSE142','lab','data','M1'],
  'l32-gr-firmsupply':['MS6 OSE141','lab','graphs','M2'], 'l32-why-up':['OS41','lab','models','M3'], 'l32-childcare':['MS6','lab','models','M3 M4'],
  'l32-tf-income':['MS6','lab','terms','M4'], 'l32-nurses-eq':['OS41','lab','data','M6'], 'l32-g-surplus':['OS41','lab','data','M6'],
  'l32-gr-immig':['MS6 OS41','lab','graphs','M5 M3'], 'l32-highlow':['OS41','lab','models','M5'], 'l32-linkage':['MS6','lab','models','M5'],
  'l32-eq-rule':['MS6','lab','terms','M1'], 'l32-tf-mfcwage':['MS6','lab','terms','M1'], 'l32-retire':['MS6 OS41','lab','models','M3'],
  'l32-education-req':['OS41','lab','terms',''], 'l32-license':['OS41','lab','models','M3'], 'l32-subsidy':['OS41','lab','models','M3 M5'],
  'l32-gr-eq':['OS41','lab','graphs','M6'], 'l32-shortage':['OS41','lab','models','M6'], 'l32-caption':['OS41','lab','data','M6'],
  'l32-g-shift':['OS41','lab','data','M5'], 'l32-tf-supplyflat':['MS6 OSE141','lab','terms','M2'], 'l32-gr-supplyleft':['MS6','lab','graphs','M3'],
  'l32-preferences':['MS6','lab','terms','M3 M4'], 'l32-both':['OS41','lab','models','M5'], 'l32-mfc-rising':['OSE142 CBS','lab','data','M1'], 'l32-pop':['OS41','lab','models','M5 M3'],
  'l32c-mfc':['MS6','lab','data','M1'], 'l32c-firm':['MS6 OSE141','lab','models','M2 M1'], 'l32c-shift':['MS6','lab','terms','M3'],
  'l32c-eq':['OS41','lab','data','M6'], 'l32c-four':['OS41','lab','models','M5 M3'], 'l32c-link':['MS6','lab','models',''], 'l32c-skill':['OS41','lab','models','M5 M3']
};
u6tag(L32TAGS);

U6_CARDS.l32 = [
  ['Marginal factor cost (MFC)','What is marginal factor cost, and how do you calculate it?','The extra cost of one more unit of an input: (Cost2 − Cost1) ÷ (L2 − L1).','Toaster company: labor cost $200 → $300 for the 3rd worker, so MFC = $100.','It is about cost; the value of MP is about revenue.'],
  ['MFC in a competitive labor market','What is MFC when the wage doesn\'t change with the number hired?','It equals the wage, and stays constant as the firm hires more.','A café hiring at the going $15 wage: MFC = $15 for every barista.','MFC is above the wage only if hiring more means paying everyone more.', u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:'var(--g2)',label:'MFC = wage',lx:-2,ly:-5,anchor:'end'}], xlab:'Workers hired', ylab:'Dollars', aria:'A flat MFC line at the wage' })],
  ['Labor supply to one firm','What does the labor supply curve facing one small firm look like?','A horizontal line at the market wage: it can hire all it wants at that wage.','An orchard in a big labor market takes the $16 wage as given.','The market supply of labor still slopes up.', u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:SC,label:'MFC = wage',lx:-2,ly:-4,anchor:'end'}], xlab:'Workers at one firm', aria:'A horizontal labor supply line at the market wage' })],
  ['Market supply of labor','Why does the market supply curve of labor slope up?','A higher wage makes leisure cost more and draws people to work more, move in and train (textbook).','Higher nursing pay brings more nurses to the city.','A wage change is a move along the curve, not a shift.', u6mini({ lines:[{a:[1,1],b:[9,9],c:SC,label:'S',lx:2,ly:4}], aria:'An upward-sloping market labor supply curve' })],
  ['Labor supply shifters (course)','What shifts labor supply, according to your course?','Number of workers, preferences or income, price of related services (child care), and expectations (retirement, life expectancy, health).','Child care costs double → some parents stop working → supply shifts left.','These are workers\'-side changes, not employers\'.'],
  ['Income and labor supply','Does more income make people supply more labor?','Not necessarily. Your course: with more income people may take more time off, so supply decreases; wanting more goods makes them work more.','A raise in other income lets someone cut back to part time.','Don\'t assume more income always means more work.'],
  ['Labor supply shifters (textbook)','What else shifts labor supply, according to your textbook?','Required education (more → lower supply) and government policies (tougher licenses lower it; training subsidies and child care benefits raise it).','Subsidies for nursing schools shift the supply of nurses right.','Licensing rules move supply, not demand.'],
  ['Labor market equilibrium','Where is the equilibrium wage?','Where the quantity of labor supplied equals the quantity demanded; there each firm\'s value of MP = MFC = wage.','Textbook nurses: $70,000 and 34,000 nurses.','The firm-level and market-level conditions describe the same point.', FIG6.l32nurses()],
  ['Surplus of labor','What happens when the wage is above equilibrium?','Quantity supplied exceeds quantity demanded: a surplus (excess supply), and wages tend to fall.','Nurses at $75,000: 38,000 offered, 33,000 wanted, surplus 5,000.','Above equilibrium is a surplus, not a shortage.', FIG6.l32nurses()],
  ['Shortage of labor','What happens when the wage is below equilibrium?','Quantity demanded exceeds quantity supplied: a shortage (excess demand), and employers bid wages up.','Nurses at $60,000: 40,000 wanted, 27,000 offered, shortage 13,000.','The textbook\'s Figure 4.2 caption calls this a "surplus"; its paragraph correctly says shortage.', FIG6.l32nurses()],
  ['Technology and wage gaps','What does the textbook\'s four-step analysis predict for low- and high-skill workers?','Technology substitutes for low-skill labor (demand left: wage and jobs fall) and complements high-skill labor (demand right: both rise).','College graduates\' pay premium rose from about 30% (1980) to about 60% (2012).','Same technology, opposite effects in two labor markets.', FIG6.l32tech()],
  ['Linkages among factors','How can a change in one factor change another factor\'s earnings?','Factors are used together, so more of one (like tractors) raises the marginal product of another (farm workers), shifting its demand and raising its pay.','More capital per worker raises workers\' value of MP.','The link runs through marginal product.']
];

Object.assign(U6_WRITE, {
  'w-l32-1':{lesson:'l32',prompt:'Explain how the equilibrium wage is set in a competitive labor market, using your course textbook\'s nurses. At $70,000 a year, 34,000 nurses want to work and employers want 34,000. At $75,000, 38,000 want to work but employers want 33,000. At $60,000, 27,000 want to work but employers want 40,000. Say what would happen at $75,000 and at $60,000, and why.',
    model:'In a competitive labor market, households supply labor and employers demand it. The equilibrium wage is where the number of people who want to work equals the number employers want to hire. For the textbook\'s nurses, that is $70,000, with 34,000 nurses. At $75,000, 38,000 people want to work as nurses but employers want only 33,000, a surplus of 5,000; with many applicants per job, employers can offer less, so salaries fall back toward $70,000. At $60,000, employers want 40,000 nurses but only 27,000 want to work, a shortage of 13,000; employers compete by raising pay, so salaries rise toward $70,000. At equilibrium, each employer has hired until the last nurse\'s value equals the wage.',
    checklist:['Identifies equilibrium as where quantity supplied equals quantity demanded ($70,000, 34,000)','Correctly describes a surplus at $75,000 and that salaries fall','Correctly describes a shortage at $60,000 and that salaries rise','Uses the right roles (households supply, employers demand) or links equilibrium to value of MP = wage']},
  'w-l32-2':{lesson:'l32',prompt:'Your course lists four things that shift the supply of labor: the number of workers, preferences or income, the price of related services, and expectations. Pick two, give a concrete example of each, and explain the effect on the equilibrium wage and employment.',
    model:'An influx of workers, for example many construction workers moving to a growing city, shifts the supply of labor to the right. With demand unchanged, the equilibrium wage falls and employment rises. A rise in the price of a related service such as child care shifts supply to the left, because some parents decide working no longer pays once child care is counted. With demand unchanged, the equilibrium wage rises and employment falls. In both cases the curve shifts because something changed on the workers\' side; a change in the wage itself would only move along the supply curve.',
    checklist:['Names two of the course\'s supply shifters with a concrete example each','Gives the correct direction of each supply shift','States the effect of each shift on the equilibrium wage and employment','Distinguishes a shift from a movement along the supply curve (or explains why it is a supply, not demand, change)']}
});

U6_PLAN.l32 = {
  core:['l32-mfc-def','l32-mfc-comp','l32-g-mfc','l32-gr-firmsupply','l32-why-up','l32-childcare','l32-eq-rule','l32-nurses-eq','l32-g-surplus','l32-gr-immig','l32-highlow','l32-linkage'],
  more:['l32-tf-income','l32-tf-mfcwage','l32-retire','l32-education-req','l32-license','l32-subsidy','l32-gr-eq','l32-shortage','l32-caption','l32-g-shift','l32-tf-supplyflat','l32-gr-supplyleft','l32-preferences','l32-both','l32-mfc-rising','l32-pop']
};

U6_LESSONS.push({ id:'l32', unit:6, title:'Labor Supply, Marginal Factor Cost and the Equilibrium Wage', mins:45, src:'Modern States video 6.1 (last part) and Module 6 slides 263-269 · Course textbook (OpenStax) §4.1',
  sources:['MS6','OS41','CB','CBS','OSE141','OSE142','ELLU','OS151','OS153'],
  oneline:'Each extra worker adds the wage to a firm\'s costs (marginal factor cost); households\' supply and firms\' demand set the market wage, where the value of the last worker\'s output equals that cost, and shifts in either curve move the wage and employment.',
  body:`
<p>Lessons 30 and 31 built the employers\' side, the ${dt('labor-demand','demand for labor')}: the ${dt('vmp','value of each worker\'s output')} and what shifts it. This lesson adds the cost side of the hiring decision and the workers\' side of the market, then puts them together to find the wage.</p>

<h2>Marginal factor cost</h2>
<!-- src: MS6 (video 6.1: "The additional cost that the firm incurs to employ one more unit is called the Marginal Factor Cost. So this is reflecting the change in the total cost associated with hiring one additional worker. So when wages don't change with the number of workers employed, the Marginal Factor Cost ... is going to be equal to the wage rate"; slides 263-265: MFC = (Cost2 − Cost1)/(L2 − L1); labor cost $100 ... $600; MFC $100); CBS (sample question 6: in a perfectly competitive labor market MFC is "constant and equal to the market wage rate"); OSE142 (Table 14.5: wage 1-5, total cost 1, 4, 9, 16, 25, marginal cost of labor 1, 3, 5, 7, 9) -->
<p>Your course: "The additional cost that the firm incurs to employ one more unit is called the ${dt('mfc','<b>Marginal Factor Cost</b>')}" (MFC). Slide 263\'s formula:</p>
<div class="math">MFC = (Cost2 − Cost1) ÷ (L2 − L1) = change in labor cost ÷ change in workers</div>
${FIG6.l32mfc()}
<p><b>Why MFC equals the wage here:</b> the toaster company pays every worker the same $100 however many it hires, so each new worker adds exactly $100. Your course: "when wages don\'t change with the number of workers employed, the Marginal Factor Cost ... is going to be equal to the wage rate." A College Board sample question tests exactly this: in a perfectly competitive labor market, MFC is "constant and equal to the market wage rate."</p>
<p><b>The boundary case (made-up numbers):</b> if a firm had to raise the wage for everyone to attract one more worker, say from $14 to $15 for six workers, cost would rise from $70 to $90, an MFC of $20, above the $15 wage. That is not a competitive labor market; Go deeper explains it.</p>
<div data-check="l32c-mfc"></div>

<h2>The firm\'s labor supply and the market\'s</h2>
<!-- src: MS6 (video 6.1: "when you work at a job, you are essentially offering your labor, or supplying your labor to your employer. In exchange, he pays you a wage rate"; slide 266: an upward "Supply by Households" line and a flat "Marginal Factor Cost = Market Wage Rate" line; the transcript's wording "the supply of labor by the household is going to reflect the point where the Marginal Factor Cost is equal to the Marginal Wage Rate" mixes the two); OS41 ("The supply of labor is upward-sloping ... The supply curve models the tradeoff between supplying labor into the market or using time in leisure activities"; nurses move, train, work full time); OSE141 ("a Perfectly Competitive Labor Market as one where firms can hire all the labor they wish at the going market wage"; firms "face a horizontal supply curve for labor") -->
<p>Slide 266 draws two lines on one graph: an upward "Supply by Households" and a flat line, "Marginal Factor Cost = Market Wage Rate." They answer different questions.</p>
${FIG6.l32firm()}
<p><b>The market:</b> the ${dt('labor-supply','supply of labor')} from all households slopes up. <b>One firm:</b> in a ${dt('competitive-labor-market','perfectly competitive labor market')}, a small firm "can hire all the labor [it] wish[es] at the going market wage" (OpenStax 2e), so the supply it faces is flat at the ${dt('market-wage','market wage')}.</p>
<p><b>Watch the course\'s picture:</b> slide 266 draws the households\' upward supply curve and one firm\'s flat MFC line on the same axes, and they cross. The two lines count workers on different scales (everyone in the market versus one firm\'s staff), so the crossing is not where the firm or the market settles. MFC is a one-firm idea and doesn\'t belong on the market graph. The video\'s sentence about "the supply of labor by the household" equalling MFC runs the two together in the same way. Keep them apart, as in the two panels above.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>This is Lesson 22\'s wheat farmer, seen from the buying side. One farmer can\'t move the price of wheat, so he sells at the market price. One small café can\'t move the wage of baristas, so it hires at the market wage. ${dt('price-taker','Price taker')} in the product market, wage taker in the labor market.</p></div>
${FIG6.l32why()}
<div data-check="l32c-firm"></div>

<h2>Shifts in the supply of labor</h2>
<!-- src: MS6 (video 6.1: "First, a change in the number of workers, or the population ... an influx of labor would cause a shift in the supply curve. Another factor would be a change in preferences or income. If people have more income, they're gonna choose to take more time off and go on vacation, so the supply of labor decreases. If people prefer to buy more goods and services, well, then they need to work for more income, so the supply of labor would go up"; slide 267: price of related services, child care; expectations: retirement age/pension, life expectancy, health); OS41 (Table 4.3: number of workers (immigration, population, aging, more women working); required education; government policies (qualifications, subsidies for nursing schools, unemployment benefits, child care benefits)) -->
<p>As with demand, a change in the wage moves along the supply curve. Your course lists four things that shift it, and your textbook adds two more.</p>
${FIG6.l32shifters()}
<p><b>Why each one shifts the curve:</b> each changes how many people want to work at a given wage. An "influx of workers" adds people. More income can make people "take more time off and go on vacation, so the supply of labor decreases," but wanting more goods means "they need to work for more income." Pricier child care makes working pay less once it is counted, so some parents "may choose to not work."</p>
<p><b>Worked example (made-up numbers):</b> at $18 an hour, 5,000 people want to work in a town\'s restaurants. Child care costs double, and at the same $18 only 4,400 still want to: supply shifted left by 600 at that wage.</p>
${FIG6.l32supshift()}
<div data-check="l32c-shift"></div>

<h2>Equilibrium in the labor market</h2>
<!-- src: MS6 (video 6.1: "Where supply is equal to demand, in the market for labor, we can see that that's the equilibrium point ... the Marginal Factor Cost that determines the supply of labor is equal to the value of the Marginal Product ... and it's equal to the wage rate. So the equilibrium point helps us determine the wage rate that firms pay"; slide 268: "Equilibrium in the Factors Market occurs when the Value of output produced by the last worker is equal to the cost of employing that worker (OR) where Value MPL = MFC"); OS41 (Table 4.1; equilibrium $70,000 and 34,000; "$75,000 ... 38,000 ... 33,000 ... excess supply or a surplus"; "$60,000 ... excess demand or a shortage ... 40,000 ... 27,000"; Figure 4.2 caption slip: "At this below-equilibrium salary, excess demand or a surplus exists") -->
<p>Your course: "Where supply is equal to demand, in the market for labor ... that\'s the ${dt('equilibrium','equilibrium')} point," and there "the value that each of those workers brings to the firm is equal to the Marginal Factor Cost and it\'s equal to the wage rate."</p>
<p><b>Worked example: your course textbook\'s nurses</b> (Table 4.1).</p>
<div class="math">$70,000: demanded 34,000, supplied 34,000 → <b>equilibrium</b><br>$75,000: supplied 38,000 − demanded 33,000 = <b>surplus of 5,000</b> → salaries fall<br>$60,000: demanded 40,000 − supplied 27,000 = <b>shortage of 13,000</b> → salaries rise</div>
${FIG6.l32nurses()}
<p><b>Why the wage moves toward equilibrium:</b> with a ${dt('excess-supply','surplus')}, "employers will have an incentive to offer lower wages"; with a ${dt('shortage','shortage')}, "some employers will offer higher pay to attract the nurses." Watch one slip in the textbook: Figure 4.2\'s caption calls the $60,000 case "excess demand or a surplus," but its paragraph correctly calls it "excess demand or a shortage."</p>
<p>Shift the curves below and watch the equilibrium move.</p>
<div data-widget="labormkt"></div>
<p>What to notice: a supply shift moves the wage and employment in opposite directions; a demand shift moves them the same way.</p>
<div data-check="l32c-eq"></div>

<h2>Predicting changes: the four-step process</h2>
<!-- src: OS41 ("Technology and Wage Inequality: The Four-Step Process": Step 1 S0, D0, E0; Step 2 "affects demand for labor by firms"; Step 3 low-skill demand shifts left, high-skill demand shifts right; Step 4 lower vs higher wage and quantity; "from the 1970s to the mid-2000s, the wage gap widened ... in 1980 ... about 30% more ... by 2012 ... about 60% more"; Figure 4.3) -->
<p>Your course textbook applies Unit 2\'s four steps to labor: (1) draw the market before; (2) decide whether the event affects supply (households) or demand (firms); (3) decide the direction; (4) compare the new equilibrium with the old.</p>
<p><b>Worked example: the textbook\'s technology case.</b></p>
<div class="math">Step 2: new information technology affects firms\' <b>demand</b><br>Step 3: substitute for low-skill clerks → demand <b>left</b>; complement for high-skill managers → demand <b>right</b><br>Step 4: low-skill wage and jobs <b>fall</b>; high-skill wage and jobs <b>rise</b></div>
${FIG6.l32tech()}
<p>Check against the data: the textbook reports that a college graduate earned about 30% more than a comparable high school graduate in 1980 and about 60% more by 2012, a widening gap consistent with the prediction.</p>
<div data-check="l32c-four"></div>

<h2>Linkages among the factors</h2>
<!-- src: MS6 (video 6.1: "sometimes factors of production are used together. The productivity of each factor depends on the quantities of the other factors available. If there's a change in the supply of one of the factors, that can change the earnings of all of the other factors. When we see a change in the earnings of any of the factors, that can be found by measuring the impact of the event of the Marginal Product on that factor"; slide 269) -->
<p>Your course\'s last point: "factors of production are used together. The productivity of each factor depends on the quantities of the other factors available." So "a change in the supply of one of the factors ... can change the earnings of all of the other factors," and you find that effect by looking at how the event changes the factor\'s marginal product.</p>
${FIG6.l32link()}
<p><b>So what:</b> this ties the unit together. Lesson 31\'s "other inputs" shifter is the same idea from the employer\'s side: more of a complementary factor raises labor\'s marginal product, its value, the demand for it and finally its wage.</p>
<div data-check="l32c-link"></div>

<h2>Which curve moves, and what happens to the wage?</h2>
<!-- src: MS6 (slides 261-262, 267); OS41 (Tables 4.2-4.3; four-step process). Exam skill: classify the event as supply or demand, pick the direction, then read off the wage and employment. -->
<p>CLEP questions on labor markets usually describe one event and ask about the wage, employment or both. Ask: did it change what <b>employers</b> want (demand) or what <b>workers</b> want (supply)? Then use the rule: demand moves wage and employment the same way; supply moves them in opposite ways.</p>
<div data-widget="wagesort"></div>
<p>What to notice: once the curve and direction are right, the wage and employment answers follow automatically.</p>
<div data-check="l32c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L32TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"In a perfectly competitive labor market, MFC is above the wage."</span>The firm pays the same wage however many it hires, so MFC equals the wage and stays constant.</li>
<li><span class="wrong">"The market supply of labor is a flat line."</span>Only the supply facing one small firm is flat. The market supply from all households slopes up.</li>
<li><span class="wrong">"A higher wage shifts the labor supply curve right."</span>A wage change moves along the supply curve. Shifts come from population, preferences, child care, expectations and the like.</li>
<li><span class="wrong">"More income always makes people work more."</span>Your course: more income can mean more time off, which decreases labor supply.</li>
<li><span class="wrong">"More workers coming into a market raises the wage."</span>Supply shifts right, so with demand unchanged the wage falls and employment rises.</li>
<li><span class="wrong">"A wage above equilibrium causes a shortage of workers."</span>Above equilibrium, more people want jobs than employers want to fill: a surplus.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Marginal factor cost</b> = change in labor cost ÷ change in workers; when the wage doesn\'t change with hiring, MFC = the wage ($100 for every toaster worker).</li>
<li>The <b>market supply of labor</b> slopes up (the leisure trade-off), while a small firm in a competitive labor market faces a flat line at the market wage.</li>
<li><b>Labor supply shifts</b> with the number of workers, preferences or income, the price of related services such as child care, expectations, required education and government policies.</li>
<li><b>Equilibrium</b>: supply meets demand (nurses: $70,000, 34,000), and each firm\'s value of MP = MFC = wage; above it is a surplus, below it a shortage.</li>
<li>The <b>four-step process</b>: technology lowered low-skill demand and raised high-skill demand, widening the wage gap.</li>
<li><b>Linkages</b>: more of one factor changes others\' marginal product and so their earnings.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Labor market and firms\' hiring of labor." Remember that demand shifts move the wage and employment together, while supply shifts move them apart. Expect the College Board-style question on marginal factor cost in a perfectly competitive labor market, an event that shifts labor supply or demand with a question about the wage and employment, or a table asking for the equilibrium wage or a surplus or shortage.</p>
</div>`,
  deeper:`
<h3>Monopsony: one employer</h3>
<p>A ${dt('monopsony','monopsony')} is a single buyer, such as the only big employer in a small town. To hire more people it must raise the wage, "not just for the new worker but for all the previous hires also" (OpenStax 2e §14.2). In its Table 14.5, the wage is $1 for one worker, $2 for two, and so on up to $5 for five. Total labor cost is then $1, $4, $9, $16 and $25. So the marginal cost of labor is $1, $3, $5, $7 and $9, above the wage each time. The firm still hires where the value of MP equals that marginal cost. It then pays only the wage on the supply curve, so "under monopsony employers hire fewer workers and pay a lower wage." The CLEP outline doesn\'t name monopsony; it is here because its sample question\'s wrong answers ("greater than the market wage rate") describe it.</p>
<h3>Labor unions</h3>
<p>A ${dt('labor-union','labor union')} bargains for its members. Your course textbook (§15.1) shows a union winning a wage above equilibrium: firms then hire fewer workers than at the equilibrium wage, and more people want union jobs than there are openings. Econlib\'s Reynolds describes unions as raising "wages above competitive levels by restricting the supply of labor." The textbook adds that if union workers are more productive, the demand for their labor "could actually shift to the right," shrinking the job loss. How large these effects are in practice is debated.</p>
<h3>Immigration as a supply shift</h3>
<p>Your course textbook (§15.3) treats immigration of mostly low-skill workers as "a shift to the right in the supply of unskilled labor," which "will lead to lower wages for these jobs." It reports estimated wage effects for low-skill U.S. workers that "are not large ... perhaps in the range of decline of about 1%." It also notes forces that offset this, such as immigrants\' own spending on local goods and services. Economists and voters weigh these trade-offs differently.</p>`,
  links:[ {k:'Exam',t:'CLEP Principles of Microeconomics sample questions',s:'College Board',u:'https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf',w:'Sample question 6 asks about marginal factor cost in a perfectly competitive labor market, the exact idea in this lesson\'s first section.'},
          {k:'Textbook',t:'14.2 Wages and Employment in an Imperfectly Competitive Labor Market',s:'OpenStax, Principles of Microeconomics 2e (a newer edition)',u:'https://openstax.org/books/principles-microeconomics-2e/pages/14-2-wages-and-employment-in-an-imperfectly-competitive-labor-market',w:'Monopsony and the marginal cost of labor, for the optional Go deeper section.'},
          {k:'Article',t:'Labor Unions',s:'Econlib (Morgan O. Reynolds)',u:'https://www.econlib.org/library/Enc/LaborUnions.html',w:'An encyclopedia entry on how unions affect wages and jobs.'} ]
});

u6xv({
  'l32-mfc-def':[FIG6.l32mfc(), ''],
  'l32-why-up':[FIG6.l32why(), ''],
  'l32-tf-income':[u6shiftBig('Sl','Marked up: if more income leads people to take more time off, supply shifts left from S1 to S2.'), ''],
  'l32-linkage':['', '"Tractors replace all farm workers" treats them as a substitute. Here each worker drives a tractor and works more land, so they complement him.'],
  'l32-eq-rule':[FIG6.l32firm(), '"Value of MP is greater than the wage" describes the workers before the last one, not the stopping point.'],
  'l32-tf-mfcwage':[FIG6.l32mfc(), ''],
  'l32-retire':[u6shiftBig('Sr','Marked up: people working longer shift labor supply from S1 to S2; the wage falls and employment rises.'), '"Demand shifts right" puts a workers\' decision on the employers\' side.'],
  'l32-education-req':['', '"Employers demand fewer PhD mathematicians" is about demand. The textbook\'s point is how many people are able to supply the work.'],
  'l32-license':[u6shiftBig('Sl','Marked up: tougher licensing shifts the supply of that labor from S1 to S2; the wage rises and employment falls.'), '"The job becomes more attractive" would raise supply, but tougher rules shut out people who would otherwise do the work.'],
  'l32-subsidy':[u6shiftBig('Sr','Marked up: training subsidies shift the supply of nurses from S1 to S2; the salary falls and more nurses work.'), '"Raises nurses\' salaries directly" confuses cause and result: more nurses available tends to lower the salary (M5).'],
  'l32-preferences':[u6shiftBig('Sr','Marked up: wanting more goods shifts labor supply from S1 to S2.'), ''],
  'l32-both':[fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Developers', ylab:'Wage', aria:'Marked-up graph: demand and supply both shift right',
      lines:[ {a:[1,9],b:[8,2],c:OLD,dash:'5 4',w:2,label:'D1',lx:4,ly:4}, {a:[3,9],b:[10,2],c:DC,label:'D2',lx:-4,ly:14,anchor:'end'}, {a:[1,2],b:[8,9],c:OLD,dash:'5 4',w:2,label:'S1',lx:-4,ly:-4,anchor:'end'}, {a:[3,2],b:[10,9],c:SC,label:'S2',lx:-4,ly:-4,anchor:'end'} ],
      vls:[{q:4.5,p:5.5},{q:6.5,p:5.5}], hl:[{p:5.5,q:6.5,c:'var(--g2)'}], dots:[{q:4.5,p:5.5,label:'E1',c:'var(--muted)',lx:0,ly:-10,anchor:'middle'},{q:6.5,p:5.5,label:'E2',c:'var(--ink)',lx:0,ly:-10,anchor:'middle'}] }),
      'Marked up with made-up curves: demand and supply both shift right. Employment rises (E1 to E2). With these sizes of shift the wage ends where it started; a bigger demand shift would raise it, a bigger supply shift would lower it.'),
    '"The wage rises" is true only if the demand shift is the bigger one. "The shifts cancel" forgets that both push employment the same way.'],
  'l32-mfc-rising':[atable(['Workers','Wage','Total labor cost','MFC'],[[5,'$14','$70','–'],[6,'$15','$90','$20']],{cls:'compact',hl:{1:{row:'u3z2'}}}), '$15 is the new wage, but the firm also pays the first five workers $1 more each.'],
  'l32c-mfc':[atable(['Workers','Labor cost','MFC'],[[3,'$360','–'],[4,'$480','$120']],{cls:'compact',hl:{1:{row:'u3z2'}}}), ''],
  'l32c-shift':[u6shiftBig('Sr','Marked up: people planning to work more years shift labor supply from S1 to S2.'), ''],
  'l32c-four':[u6shiftBig('Dl','Marked up: the booking app shifts the demand for travel agents from D1 to D2; their wage and employment fall.'), 'A supply shift would mean travel agents changed their own plans; the app changed what employers need.'],
  'l32c-link':[u6shiftBig('Dl','Marked up: with less oil to pump, the demand for drilling crews shifts from D1 to D2.'), '"Labor replaces the oil" gets the link backwards: crews and oil are used together.'],
  'l32c-skill':[u6shiftBig('Sr','Marked up: more people looking for work shift labor supply from S1 to S2; the wage falls and employment rises.'), '']
});
u6cv('l32', { 'Marginal factor cost (MFC)': FIG6.l32mfc(), 'Labor supply shifters (course)': u6shift('Sl','Labor supply shifts left'), 'Labor supply shifters (textbook)': u6shift('Sr','Labor supply shifts right'),
  'Income and labor supply': u6shift('Sl','Labor supply shifts left'), 'Linkages among factors': FIG6.l32link() });
