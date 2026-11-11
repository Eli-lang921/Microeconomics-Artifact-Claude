/* ===== Lesson 29 figures ===== */
/* small bar chart for answer choices and flashcards (no title; neutral axes) */
function u6minibars(vals, { ymax, ymin=0, aria='Graph', xlab='Worker', ylab='Units', line=false }={}){
  ymax = ymax===undefined ? Math.max(...vals) : ymax;
  const x0=30, y0=100, pw=112, ph=88, n=vals.length, bw=pw/n, Y=v=>y0-ph*(v-ymin)/(ymax-ymin);
  let s = `<svg class="u6m" viewBox="0 0 150 128" role="img" aria-label="${esc(aria)}">`;
  [ymin, ymax].forEach(t => { s += `<text x="${x0-3}" y="${(Y(t)+3).toFixed(1)}" text-anchor="end" class="lbl" style="font-size:8px">${t}</text>`; });
  s += `<line x1="${x0}" x2="${x0+pw}" y1="${Y(Math.max(0,ymin)).toFixed(1)}" y2="${Y(Math.max(0,ymin)).toFixed(1)}" class="ax"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y0-ph}" class="ax"/>`;
  s += `<text x="${x0+pw/2}" y="${y0+23}" text-anchor="middle" class="lbl">${xlab}</text><text x="10" y="${y0-ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90 10 ${y0-ph/2})">${ylab}</text>`;
  if(line){ s += `<path d="M${vals.map((v,i)=>(x0+i*bw+bw/2).toFixed(1)+','+Y(v).toFixed(1)).join('L')}" fill="none" stroke="var(--accent)" stroke-width="2.4"/>`; vals.forEach((v,i)=>{ s+=`<circle cx="${(x0+i*bw+bw/2).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="2.6" fill="var(--accent)"/>`; }); }
  else vals.forEach((v,i)=>{ const top=Math.min(Y(v),Y(0)), h=Math.abs(Y(v)-Y(0)); s += `<rect x="${(x0+i*bw+bw*0.18).toFixed(1)}" y="${top.toFixed(1)}" width="${(bw*0.64).toFixed(1)}" height="${Math.max(h,0.8).toFixed(1)}" rx="1.5" fill="${v<0?'var(--bad)':'var(--accent)'}" opacity=".8"/>`; });
  vals.forEach((v,i)=>{ s += `<text x="${(x0+i*bw+bw/2).toFixed(1)}" y="${y0+9}" text-anchor="middle" class="lbl" style="font-size:9px">${i+1}</text>`; });
  return s + '</svg>';
}

/* L29 V1: the production function as a machine (slides 248-249: Q = f(Land, Labor, Capital); Q = 100K + 25L) */
FIG6.l29pf = () => fig(`<div class="u4io"><div class="u3step"><b>Inputs</b><br>land, labor (L), capital (K)</div><div class="u3arrow" aria-hidden="true">→</div><div class="u3step u3end"><b>Production function</b><br>Q = 100K + 25L</div><div class="u3arrow" aria-hidden="true">→</div><div class="u3step"><b>Output</b><br>Q units</div></div>
  <div class="math" style="margin-top:10px">K = 2 machines, L = 4 workers: Q = 100 × 2 + 25 × 4 = 200 + 100 = <b>300</b><br>One more worker (L = 5): Q = 200 + 125 = 325, so <b>+25</b><br>One more machine (K = 3): Q = 300 + 100 = 400, so <b>+100</b></div>`,
  'Your course\'s example production function, with made-up input amounts. Inputs go in, output comes out. Each extra worker adds 25 units and each extra machine adds 100, so more of either input means more output.');

/* L29 V2: the two markets, roles swapped (textbook ch. 4 introduction; slide 249) */
FIG6.l29two = () => fig(`<div class="u3pair">
  <div class="u3card"><p class="u3h">Product market (Units 2-5)</p><p>What is traded: goods and services, like toasters</p><p><b>Buyers (demand):</b> households</p><p><b>Sellers (supply):</b> firms</p><p>Price: the price of the good</p></div>
  <div class="u3card ok"><p class="u3h">Factor market (this unit)</p><p>What is traded: inputs, like an hour of a worker\'s time</p><p><b>Buyers (demand):</b> firms</p><p><b>Sellers (supply):</b> households</p><p>Price: the wage (for labor)</p></div></div>`,
  'The same people show up in both markets with the roles reversed. In the product market a household buys a toaster from a firm. In the factor market the same household sells its labor to a firm. Your course: demand for factors "comes from the firm" and supply "comes from the household."');

/* L29 V3: derived demand as a chain of cause and effect (slide 250; textbook §4.1) */
FIG6.l29chain = () => fig(flow([
  'Consumers want <b>more restaurant meals</b> (the product market).',
  'Restaurants sell more meals, and can charge more for them.',
  'Each restaurant wants to cook more, so it needs <b>more chefs</b> at any given wage.',
  {t:'The <b>demand for chefs</b> shifts right (the factor market).',c:'u3end'}
]), 'Your course textbook: "The demand for chefs is dependent on the demand for restaurant meals." Read it top to bottom: the change starts with what consumers buy and passes back to the jobs that make it. A fall in meal demand would run the same chain in reverse.');

/* L29 V4: before and after, two markets side by side (textbook §4.1 chefs example; made-up curves) */
FIG6.l29pair = () => figs([
  ['Market for restaurant meals', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Meals', ylab:'Price of a meal', aria:'Demand for meals shifts right',
    lines:[ dE([0,9],[8,1],'D1',{c:OLD,dash:'5 4',w:2}), dE([2,9],[10,1],'D2'), sup([0,1.5],[9,9]) ], arrows:[{a:[3.4,5.2],b:[5.2,5.2]}] })],
  ['Market for chefs', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Chefs hired', ylab:'Wage', aria:'Demand for chefs shifts right',
    lines:[ dE([0,9],[8,1],'D1',{c:OLD,dash:'5 4',w:2}), dE([2,9],[10,1],'D2'), sup([0,1.5],[9,9]) ], arrows:[{a:[3.4,5.2],b:[5.2,5.2]}] })]
], 'Made-up curves. First panel: more people want to eat out, so demand for meals shifts right. Second panel: restaurants then want more chefs at every wage, so the demand for chefs shifts right too. Notice the factor-market curve moved without any change in the chefs themselves.');

/* L29 V5: why some workers earn more (slide 251; textbook Table 4.2; Econlib, Gorman) */
FIG6.l29why = () => fig(flow([
  {split:[[{t:'Experience',c:'u3up'}],[{t:'Education and training',c:'u3up'}],[{t:'Access to the latest technology',c:'u3up'}]]},
  'The worker adds <b>more output</b> per hour: a higher marginal product of labor.',
  {t:'Employers are <b>willing to pay more</b> for that worker, because each hour is worth more to the firm.',c:'u3end'}
]), 'Your course\'s three reasons some workers are more productive (slide 251). Each one raises what the worker adds to output, and that is what an employer is paying for. Econlib\'s Gorman: "Employers typically are not willing to pay a worker more than the value of the additional product that he produces." Lesson 30 puts a dollar value on it.');

/* L29 V6: the toaster company's marginal product, computed row by row (slides 252-254) */
FIG6.l29mpl = () => fig(atable(['Workers','Output','Marginal product'],
  TO.map((r,i)=>[r.L, r.q, i ? `${r.q} − ${TO[i-1].q} = <b>${r.mp}</b>` : '–']), { cls:'compact', hl:{3:{row:'u3z2'}} }),
  'Your course\'s toaster company. Each row uses the slide\'s formula, MPL = (Q2 − Q1) ÷ (L2 − L1); workers rise one at a time, so the bottom of the fraction is 1. The highlighted row: the 3rd worker raises output from 90 to 120, so his marginal product is 30. Output keeps rising until the 6th worker, who adds nothing.');

/* L29 V7: marginal product bars beside total output (slides 254 and 260) */
FIG6.l29bars = () => figs([
  ['Marginal product of each worker', `<div class="qg">${ubars(TO.slice(1).map(r=>r.mp), { labels:['1st','2nd','3rd','4th','5th','6th'], ylab:'Extra toasters', xlab:'Worker', ymax:50, colorOf:()=> 'var(--accent)' })}</div>`],
  ['Total output', sdg({ xmax:6.3, ymax:160, xt:[0,1,2,3,4,5,6], yt:[0,50,100,150], xlab:'Workers', ylab:'Toasters a day', aria:'Total output rising more slowly and leveling off at 150',
    lines:[ {pts:TO.map(r=>[r.L,r.q]), c:'var(--g1)'} ], dots: TO.slice(1).map(r=>({q:r.L, p:r.q, c:'var(--g1)'})) })]
], 'Your course\'s toaster company. First panel: each new worker adds less than the one before, 50, 40, 30, 20, 10, then 0. Second panel: total output still climbs, just more slowly, and levels off at 150. A shrinking bar is not a shrinking total.');

/* ===== Lesson 29: Factor Markets and Derived Demand (Modern States video 6.1, first part; Module 6 slides 247-254) =====
   Common mistakes: M1 households demand labor and firms supply it · M2 labor demand doesn't depend on the product
   M3 marginal product = output ÷ workers · M4 falling marginal product means falling output · M5 derived demand applies only to labor
   M6 a change in product demand shifts labor supply */
const dTbl = (rows, unit='units') => atable(['Workers',`Output (${unit} a day)`], rows.map((q,L)=>[L,q]), { cls:'compact' });
const SHIFT_CH = (ok) => ['Dr','Dl','Sr','Sl','mv'].map(k => shiftChoice(k, k===ok));

mc('l29-derived-def','l29','Which of the following best describes the demand for labor as a "derived demand"?',
  [`A firm\'s demand for workers comes from consumers\' demand for the product the workers make`,`Workers decide how many hours to work based on the wage`,`The wage is set by the government and firms must accept it`,`Households demand jobs, and firms supply them`,`Firms hire workers mainly because labor is cheaper than capital`],0,
  `<p>Your course: firms\' demand for inputs "is derived from consumers\' demand for their product." The textbook: "the demand for labor is based on the demand for the good or service that is being produced."</p><p>"Workers decide how many hours to work" describes labor <b>supply</b>, and "households demand jobs" reverses the roles (M1). Derived demand is about where firms\' demand comes from, not about cost comparisons.</p>`);
mc('l29-roles','l29','In the labor market, who are the demanders and who are the suppliers?',
  [`Firms demand labor; households supply it`,`Households demand labor; firms supply it`,`Firms both demand and supply labor`,`The government demands labor; firms supply it`,`Firms demand labor, but its supply shifts whenever product demand changes`],0,
  `<p>Your textbook: "job seekers (individuals) are the suppliers of labor, while firms and other employers who hire labor are the demanders for labor." Your course says the same: demand for factors "comes from the firm" and supply "comes from the household."</p><p>The reversed pairing is the classic slip (M1): in the <b>product</b> market households buy, but in the factor market they sell.</p>`);
gen('l29-g-prodfn','l29',()=>{
  const a = pick([50,80,100,120]), b = pick([10,20,25,40]); let K, L; do { K = pick([1,2,3,4,5]); L = pick([2,3,4,6,8,10]); } while(K === L); const ans = a*K + b*L;
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers, in the same form as your course\'s example. A firm\'s production function is <b>Q = ${a}K + ${b}L</b>, where K is machines and L is workers. How many units does it produce with <b>${K}</b> machine${K>1?'s':''} and <b>${L}</b> workers?`, answer:ans,
    explain:`<div class="math">Q = ${a} × ${K} + ${b} × ${L} = ${a*K} + ${b*L} = <b>${ans}</b></div><p>The common slip is mixing up the numbers: ${a} × ${L} + ${b} × ${K} = ${a*L+b*K} pairs each input with the other\'s number. Each machine adds ${a} units and each worker adds ${b}. Sense check: the machines alone make ${a*K}, and the ${L} workers add ${b*L} more.</p>` };
});
mc('l29-chef','l29','Made-up scenario. Eating out becomes much more popular in a city. According to the idea of derived demand, what happens to the demand for chefs there?',
  [`It increases, because restaurants need more chefs to cook the extra meals`,`It decreases, because chefs\' wages will rise`,`It stays the same, because only the demand for meals changed`,`The supply of chefs increases instead of the demand`,`It increases only if the government raises the minimum wage`],0,
  `<p>Your course textbook: "The demand for chefs is dependent on the demand for restaurant meals." More meals demanded means restaurants want more chefs at any wage, so the demand for chefs shifts right.</p><p>"It stays the same" treats labor demand as unrelated to the product (M2). The change is on the firms\' side (demand), not the households\' side (supply).</p>`);
lazy('l29-gr-derived','l29',()=>visMC({
  prompt:`Made-up scenario. Bicycles become much more popular, so bicycle makers sell many more bikes. Which graph shows what happens in the labor market for bicycle assembly workers?`,
  choices: SHIFT_CH('Dr'),
  explain: L => `<p><b>Graph ${L}</b>: the demand for assembly workers shifts right. Bikes are the product; assemblers are the input. More bike sales mean bike makers want more workers at every wage, so the wage and the number hired both rise.</p>${u6shiftBig('Dr','The question\'s answer graph, marked up: demand moves from D1 to D2, so the equilibrium moves from E1 to E2, a higher wage (W2) and more workers.')}<p>The most tempting wrong graph is a supply shift: nothing here changes how many people want assembly jobs. A movement along the curve would need a change in the wage alone.</p>` }));
tf('l29-tf-forself','l29','Firms hire workers because they want labor for its own sake, so the demand for labor does not depend on sales of the firm\'s product.',false,
  `<p>False. Firms hire workers to make things they can sell. Your course: the demand for inputs is "linked directly to the demand by consumers for the good or service that that firm is producing." When product sales rise, firms want more workers; when sales fall, they want fewer (M2).</p>`);
mc('l29-toaster-mpl','l29',`${toIntro()}${toTbl(['q'])}What is the marginal product of the <b>3rd</b> worker?`,
  [`30 toasters`,`40 toasters`,`120 toasters`,`90 toasters`,`40 toasters per worker on average`],0,
  `<p>Marginal product = change in output ÷ change in workers = (120 − 90) ÷ (3 − 2) = <b>30 toasters</b>.</p>${toTbl(['q','mp'],{hl:3})}<p>120 is total output with 3 workers, not what the 3rd added. "40 on average" is 120 ÷ 3, output per worker (M3). 40 is the 2nd worker\'s marginal product.</p>`);
gen('l29-g-mpl','l29',()=>{
  let mps; do { const m1 = pick([30,40,50,60]); mps=[m1]; while(mps.length<5) mps.push(mps[mps.length-1] - pick([4,6,8,10])); } while(mps[4] < 2);
  const Q=[0]; mps.forEach(m=>Q.push(Q[Q.length-1]+m)); const k = pick([2,3,4,5]), ans = mps[k-1];
  const hl = {}; hl[k-1]={row:'u3z1'}; hl[k]={row:'u3z2'};
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. A bakery\'s output (loaves a day) with different numbers of workers:${dTbl(Q,'loaves')}What is the marginal product of the <b>${ordinal(k)}</b> worker?`, answer:ans,
    explain:`<p>Marginal product = (${Q[k]} − ${Q[k-1]}) ÷ (${k} − ${k-1}) = <b>${ans} loaves</b>.</p>${atable(['Workers','Output','Marginal product'], Q.map((q,L)=>[L,q,L?mps[L-1]:'–']), { cls:'compact', hl })}<p>The common slip is answering total output (${Q[k]}) or output per worker (${Q[k]} ÷ ${k} = ${fmt(Q[k]/k)}), M3. Marginal product is only what the ${ordinal(k)} worker added.</p>` };
});
tf('l29-tf-falling','l29','When each new worker adds less output than the one before, the firm\'s total output must be falling.',false,
  `<p>False. A smaller marginal product still adds to the total. Your course\'s toaster company: marginal product falls from 50 to 10, yet output rises every step, from 50 to 150. Total output falls only if a worker\'s marginal product is negative (M4).</p>`);
lazy('l29-gr-mplbars','l29',()=>visMC({
  prompt:`${toIntro()}${toTbl(['q'])}Each bar in the graphs below stands for one worker, 1st to 6th. Which graph shows the <b>marginal product</b> of each worker?`,
  choices:[
    { svg:L=>u6minibars([50,40,30,20,10,0],{ymax:150,aria:'Graph '+L}), desc:'bars of 50, 40, 30, 20, 10, 0', ok:true },
    { svg:L=>u6minibars([50,90,120,140,150,150],{ymax:150,aria:'Graph '+L}), desc:'bars of 50, 90, 120, 140, 150, 150 (total output)' },
    { svg:L=>u6minibars([0,10,20,30,40,50],{ymax:150,aria:'Graph '+L}), desc:'bars rising from 0 to 50' },
    { svg:L=>u6minibars([50,45,40,35,30,25],{ymax:150,aria:'Graph '+L}), desc:'bars of 50, 45, 40, 35, 30, 25 (output per worker)' },
    { svg:L=>u6minibars([25,25,25,25,25,25],{ymax:150,aria:'Graph '+L}), desc:'six equal bars of 25' } ],
  explain: L => `<p><b>Graph ${L}</b>. Each worker\'s marginal product is the change in output: 50, 40, 30, 20, 10 and 0.</p>${fig(`<div class="qg">${ubars([50,40,30,20,10,0], { labels:['1st','2nd','3rd','4th','5th','6th'], ylab:'Extra toasters', xlab:'Worker', ymax:50, hi:2 })}</div>`, 'The answer graph, marked up with each bar\'s value. The 3rd bar (30) is 120 − 90. The bars shrink because each worker adds less, but every bar except the last still adds to output.')}<p>The tall, rising bars are total output, not marginal product. The bars of 50, 45, 40 ... are output per worker (M3).</p>` }));
mc('l29-why-earn','l29','According to this lesson\'s marginal-product explanation, which of the following helps explain why some workers earn more than others?',
  [`They have a higher marginal product because of experience, education and training, or better technology`,`They work for firms whose products have fewer buyers`,`They supply more hours than other workers`,`Their employers have lower total revenue`,`They have a lower marginal product, so firms must pay them more`],0,
  `<p>Your course: "some workers tend to be more productive because of experience, education and training, or access to the latest technology," and differences in the marginal product of labor "help reflect and show us why some people may earn more than others." A worker who adds more output is worth more to the employer.</p><p>Fewer buyers for the product would <b>lower</b> the demand for those workers (derived demand). A lower marginal product makes a worker worth less, not more.</p>`);
mc('l29-nurses','l29','Your course textbook reports that the U.S. population is aging and expects "aging baby boomers and advances in life-saving and life-extending technologies" to raise the demand for health care. What does derived demand predict for the market for nurses?',
  [`The demand for nurses increases`,`The supply of nurses increases`,`The demand for nurses decreases, because older people work less`,`Nothing changes until nurses\' wages change`,`The supply of nurses decreases, because the demand for health care rose`],0,
  `<p>Nurses are an input into health care. More demand for health care means hospitals and clinics want more nurses at any salary, so the demand for nurses shifts right. The textbook adds the Bureau of Labor Statistics forecast: registered nursing jobs were expected to grow 19% from 2012 to 2022.</p><p>A supply change would come from how many people train and want to work as nurses (Lesson 32), not from patients\' demand. "Nothing changes until wages change" mixes up a shift with a movement along the curve.</p>`);
/* L29 more */
mc('l29-markets','l29','Which of the following is a transaction in a <b>factor</b> market?',
  [`A bakery pays a worker $120 for a day\'s work`,`A family buys a loaf of bread from a bakery`,`A student buys a used textbook from a friend`,`A shopper pays $40 for a toaster`,`A café sells coffee to an office`],0,
  `<p>A factor market trades inputs. The bakery is buying a day of labor, an input, from a household. The other choices are goods or services sold to buyers, product-market trades. Watch the roles: in the factor market the firm is the buyer (M1).</p>`);
tf('l29-tf-households','l29','Households are the suppliers in the market for labor.',true,
  `<p>True. Your course: the supply of factors of production "comes from the household," and "individual consumers, and individual households are the suppliers of labor." When you work a job, you are selling your labor to your employer (M1).</p>`);
gen('l29-g-prodchg','l29',()=>{
  const b = pick([10,20,25]), m = pick([2,3,4,5]), a = b*m, K = pick([2,3,4]), L = pick([3,4,5,6]);
  return { type:'num', kind:'num', unit:'workers', prompt:`Made-up numbers. A firm\'s production function is <b>Q = ${a}K + ${b}L</b> (K = machines, L = workers). It now uses ${K} machines and ${L} workers. How many extra workers would raise output by as much as one extra machine?`, answer:m,
    explain:`<div class="math">One more machine adds ${a} units.<br>One more worker adds ${b} units.<br>${a} ÷ ${b} = <b>${m} workers</b></div><p>The number in front of each input is what one more of it adds, as in your course\'s Q = 100K + 25L, where a machine adds 100 and a worker 25. The current ${K} machines and ${L} workers don\'t change that here, because this production function is a straight line.</p>` };
});
mc('l29-capital-derived','l29','Made-up scenario. Online shopping grows fast, and delivery companies deliver many more packages. What happens to their demand for delivery vans?',
  [`It increases, because the demand for vans is derived from the demand for deliveries`,`It decreases, because vans become more expensive`,`It is unaffected, because derived demand applies only to labor`,`The supply of vans increases instead`,`It increases only if delivery drivers\' wages fall`],0,
  `<p>Vans are capital, an input. Derived demand applies to every factor of production, not just labor (M5): more deliveries demanded means more vans and more drivers wanted. Your course lists the factors as labor, capital and natural resources.</p>`);
mc('l29-avg','l29','Made-up numbers. A shop produces 60 units with 3 workers and 72 units with 4 workers. What is the marginal product of the 4th worker?',
  [`12 units`,`18 units`,`20 units`,`72 units`,`60 units`],0,
  `<p>(72 − 60) ÷ (4 − 3) = <b>12 units</b>. 18 is 72 ÷ 4, output per worker, a different idea (M3). 20 is 60 ÷ 3. 72 is total output.</p>`);
gen('l29-g-mpl2','l29',()=>{
  let mps; do { const m1 = pick([20,25,30,40]); mps=[m1]; while(mps.length<5) mps.push(Math.max(0, mps[mps.length-1] - pick([3,5,6,8]))); } while(mps[4] < 1);
  const n = pick([3,4,5]), ans = mps.slice(0,n).reduce((x,y)=>x+y,0);
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. A workshop starts with no workers and no output. The marginal products of its 1st to 5th workers are <b>${mps.join(', ')}</b> units. What is its total output with <b>${n}</b> workers?`, answer:ans,
    explain:`<p>Total output is the running sum of the marginal products:</p>${atable(['Workers','Marginal product','Total output'], mps.map((m,i)=>[i+1, m, mps.slice(0,i+1).reduce((x,y)=>x+y,0)]), { cls:'compact', hl:{[n-1]:{row:'u3z2'}} })}<p>So with ${n} workers output is <b>${ans}</b>. The common slip is multiplying the ${ordinal(n)} worker\'s marginal product by ${n} (${mps[n-1]*n}); earlier workers added more than the last one.</p>` };
});
tf('l29-tf-zero','l29','In your course\'s toaster company, output is 150 with 5 workers and 150 with 6. The 6th worker\'s marginal product is zero, but output with 6 workers is still 150.',true,
  `<p>True. A marginal product of zero adds nothing, so output stays at 150; it doesn\'t drop to zero. Your course: "though production is still positive ... the sixth worker is no longer adding to that production." (M4)</p>`);
mc('l29-compensation','l29','In the real world, what is the full "price" of a worker to an employer?',
  [`Wages or salary plus benefits, such as health insurance`,`Only the hourly wage`,`The price of the goods the worker produces`,`The worker\'s marginal product`,`The firm\'s total revenue divided by its number of workers`],0,
  `<p>The textbook: "this ‘price’ would be total labor compensation: salary plus benefits ... benefits are a significant part (as high as 30 percent) of labor compensation."</p><p>The most tempting wrong choice is "only the hourly wage": it leaves out benefits, which can be nearly a third of what the worker costs. The others confuse the price of labor with output or revenue measures.</p>`);
mc('l29-tech-access','l29','Made-up scenario. In one region, construction firms give their carpenters new power saws; in another, carpenters with the same experience still use hand tools. Using this lesson\'s marginal-product explanation, why might carpenters in the first region end up earning more?',
  [`Access to better technology raises their marginal product, so they are worth more to employers`,`They supply fewer hours of labor`,`Hand tools make the other carpenters more productive`,`Demand for houses fell in the first region`,`Better tools lower a worker\'s marginal product`],0,
  `<p>Your course lists "access to the latest technology" as one reason some workers are more productive. More output per hour means a higher marginal product, so employers there will pay more for carpenters (Lesson 30 puts dollars on it).</p><p>Supplying fewer hours is a supply-side story, not a reason employers pay more. A fall in house demand would lower, not raise, the demand for carpenters (M2).</p>`);
mc('l29-decline','l29','Made-up scenario. Fewer people buy printed newspapers. What does derived demand predict for the market for printing-press operators?',
  [`The demand for press operators decreases`,`The demand for press operators increases`,`The supply of press operators increases`,`Nothing changes, because only the newspaper market changed`,`The wage of press operators rises`],0,
  `<p>Press operators are an input into printed newspapers. When the product\'s demand falls, publishers need fewer operators at any wage, so labor demand shifts left, which tends to lower the wage and the number hired. "Nothing changes" ignores derived demand (M2).</p>`);
tf('l29-tf-onlylabor','l29','Derived demand applies only to labor, not to other factors of production.',false,
  `<p>False. Your course: "the demand for various factors of production is going to reflect, for the firm, how many goods or services it can actually sell ..." A bakery\'s demand for ovens and flour comes from bread sales just as its demand for bakers does (M5).</p>`);
mc('l29-flow','l29','Which of the following puts the derived-demand chain in the right order?',
  [`Demand for the product rises → firms want to produce more → demand for workers rises`,`Demand for workers rises → wages rise → demand for the product rises`,`Supply of workers rises → firms produce more → demand for the product rises`,`Wages fall → demand for the product rises → demand for workers rises`,`Firms want to produce more → demand for the product rises → supply of workers rises`],0,
  `<p>Derived demand runs from the product market back to the factor market: consumers first, then firms\' output plans, then hiring. The other orders start from the labor market or from supply, which is not what "derived" means (M2).</p>`);
mc('l29-q100k','l29','Your course\'s example production function is Q = 100K + 25L, where K is capital (machines) and L is labor (workers). What does the 25 tell you?',
  [`Each extra worker adds 25 units of output`,`The firm hires 25 workers`,`Each worker is paid $25`,`Output per worker is always 25 units`,`Each extra machine adds 25 units`],0,
  `<p>In Q = 100K + 25L, raising L by 1 raises Q by 25, so each extra worker adds 25 units (and each extra machine adds 100). Your course: "If it increases the number of workers it hires, it's also going to increase its output." The 25 is a marginal product, not a wage or a head count. It is not output per worker either (M3): with machines in the formula, output ÷ workers is more than 25.</p>`);
mc('l29-firm-buyer','l29','A firm buys inputs in one market and sells output in another. Which statement is correct?',
  [`The firm is a buyer in the factor market and a seller in the product market`,`The firm is a seller in both markets`,`The firm is a buyer in the product market and a seller in the factor market`,`The firm is a buyer in both markets`,`Firms take part only in the product market`],0,
  `<p>Firms demand inputs (labor, capital, natural resources) in factor markets and supply goods in product markets. Households do the reverse: they sell labor and buy goods (M1).</p>`);
mc('l29-education','l29','Your course textbook says: "A well-trained and educated workforce causes an increase in the demand for that labor by employers." Why?',
  [`Better-trained workers are more productive, so each one is worth more to an employer`,`Educated workers supply fewer hours`,`Training lowers the price of the firm\'s product`,`Employers must hire more workers to replace those in training`,`Education raises the supply of the firm\'s product`],0,
  `<p>The textbook: "Increased levels of productivity within the workforce will cause the demand for labor to shift to the right." Training raises the marginal product of labor, which raises what each worker is worth to the firm. Lesson 31 lists this with the other things that shift labor demand.</p><p>"Educated workers supply fewer hours" is a supply story; the textbook\'s point is about employers\' demand (M6).</p>`);
lazy('l29-gr-tp','l29',()=>visMC({
  prompt:`${toIntro()}${toTbl(['q'])}Each graph plots output (up) against the number of workers (across). Which graph shows the toaster company\'s <b>total output</b>?`,
  choices:[
    { svg:L=>u6minibars([50,90,120,140,150,150],{ymax:160,line:true,aria:'Graph '+L,ylab:'Output',xlab:'Workers'}), desc:'a line rising more and more slowly, then flat at the end', ok:true },
    { svg:L=>u6minibars([25,50,75,100,125,150],{ymax:160,line:true,aria:'Graph '+L,ylab:'Output',xlab:'Workers'}), desc:'a straight line rising by the same amount each worker' },
    { svg:L=>u6minibars([10,25,45,75,110,150],{ymax:160,line:true,aria:'Graph '+L,ylab:'Output',xlab:'Workers'}), desc:'a line rising faster and faster' },
    { svg:L=>u6minibars([50,40,30,20,10,0],{ymax:160,line:true,aria:'Graph '+L,ylab:'Output',xlab:'Workers'}), desc:'a line falling from 50 to 0' },
    { svg:L=>u6minibars([150,140,120,90,50,0],{ymax:160,line:true,aria:'Graph '+L,ylab:'Output',xlab:'Workers'}), desc:'a line falling faster and faster' } ],
  explain: L => `<p><b>Graph ${L}</b>: output rises 50, 90, 120, 140, 150 and then stays at 150. Each step is smaller than the one before because each worker adds less (diminishing marginal returns, Lesson 16).</p>${fig(sdg({ xmax:6.3, ymax:160, xt:[0,1,2,3,4,5,6], yt:[0,50,100,150], xlab:'Workers', ylab:'Toasters a day', aria:'Marked-up total output',
      lines:[ {pts:TO.map(r=>[r.L,r.q]), c:'var(--g1)'} ], spans:[{q:1,p1:0,p2:50,label:'+50',lx:12},{q:3,p1:90,p2:120,label:'+30',lx:12},{q:5,p1:140,p2:150,label:'+10',lx:12,ly:-12}] }), 'The answer graph, marked up: the climb per worker shrinks (+50, +30, +10) while the total keeps rising.')}<p>The line falling from 50 to 0 is marginal product, not total output (M4).</p>` }));

/* ===== Lesson 29 quick checks ===== */
mc('l29c-pf','l29','Your course\'s production function is Q = 100K + 25L. Made-up inputs: the firm uses 3 machines (K) and 2 workers (L). What is its output?',
  [`350`,`125`,`300`,`275`,`500`],0,
  `<p>Q = 100 × 3 + 25 × 2 = 300 + 50 = <b>350</b>. 300 counts only the machines; 125 adds 100 + 25 without the input amounts; 275 swaps the inputs (100 × 2 + 25 × 3); 500 treats each worker like a machine, 100 × (3 + 2).</p>`);
mc('l29c-roles','l29','When a college student takes a part-time job at a bookstore, which role does the student play in the labor market?',
  [`Supplier of labor`,`Demander of labor`,`Seller of a product`,`Buyer of a factor of production`,`Supplier of labor, but only when bookstore sales rise`],0,
  `<p>The student sells hours of work to the bookstore, so she is a supplier of labor; the bookstore is the demander. Your textbook notes that in 2011, 52% of undergraduates worked part time.</p>`);
lazy('l29c-derived','l29',()=>visMC({
  prompt:`Made-up scenario. Many homeowners decide to put solar panels on their roofs. Which graph shows what happens in the market for solar-panel installers?`,
  choices: ['Dr','Dl','Sr','Sl','mv'].map(k => shiftChoice(k, k==='Dr')),
  explain: L => `<p><b>Graph ${L}</b>: the demand for installers shifts right. Installing panels is the service homeowners want; installers are the input. More demand for the service means installation companies want more workers at every wage. Homeowners don\'t hire directly, but their demand is passed back through the firms (derived demand).</p>${u6shiftBig('Dr','The answer graph, marked up: demand for installers moves from D1 to D2, so their wage and employment rise.')}<p>A supply shift would mean the installers themselves changed their plans (M6). Treating it as no change forgets that labor demand comes from the product (M2).</p>` }));
mc('l29c-earn','l29','Made-up scenario. A hospital pays nurse A more than nurse B for the same shift. Using this lesson\'s marginal-product explanation, which is the most likely reason?',
  [`Nurse A has more experience or training, so she adds more to the hospital\'s output`,`Nurse A works fewer hours`,`Nurse B\'s marginal product is higher`,`The hospital has fewer patients`,`Nurse A\'s pay is higher, so she must produce less than nurse B`],0,
  `<p>Your course ties pay differences to the marginal product of labor, which experience, education and training, and technology raise. A higher marginal product means a worker is worth more to the employer.</p><p>"Nurse B\'s marginal product is higher" would point the other way. "Nurse A works fewer hours" doesn\'t make her shift worth more, and "her pay is higher, so she must produce less" reverses the link: higher pay follows a higher marginal product.</p>`);
mc('l29c-mpl','l29','Your course\'s toaster company makes 140 toasters with 4 workers and 150 with 5 workers. What is the 5th worker\'s marginal product?',
  [`10 toasters`,`30 toasters`,`35 toasters`,`150 toasters`,`140 toasters`],0,
  `<p>(150 − 140) ÷ (5 − 4) = <b>10</b>. 150 is total output, 30 is 150 ÷ 5 (output per worker, M3), 35 is 140 ÷ 4, and 140 is output with 4 workers.</p>`);
mc('l29c-skill','l29','Made-up scenario. A new study convinces people to drink more milk. Which market\'s demand curve shifts because of derived demand?',
  [`The market for dairy farm workers`,`The market for milk`,`The market for orange juice`,`The supply of dairy farm workers`,`No labor market is affected`],0,
  `<p>The demand for milk itself shifts directly (that is ordinary demand, from Unit 2). The <b>derived</b> demand is for the inputs that produce milk, such as dairy farm workers. Orange juice would be a substitute good, not an input.</p>`);

/* Course materials checked 2026-11-04: video 6.1 transcript (factors "such as labor, capital, and natural resources"; production function; demand from the firm, supply from the household;
   "derived demand, because it's linked directly to the demand by consumers"; MPL and why some earn more; toaster MPL 50,40,30,20,10,0), Module 6 slides 248-254; course textbook ch. 4 introduction (demanders and suppliers;
   baby boomers, BLS 19%, 526,000 nurses), §4.1 (derived demand; chefs, pharmacists, attorneys; compensation and benefits up to 30%; Table 4.2 education and training); Econlib, Gorman ("not willing to pay a worker more than the value of the additional product");
   Federal Reserve Education ("derived from ... the demand for goods and services produced"); CLEP outline (Derived factor demand). */
const L29TAGS = {
  'l29-derived-def':['MS6 OS41','der','terms','M1 M2 M6'], 'l29-roles':['OS40 MS6','der','terms','M1 M6'], 'l29-g-prodfn':['MS6','der','data',''],
  'l29-chef':['OS41','der','models','M2 M6'], 'l29-gr-derived':['OS41 MS6','der','graphs','M2 M6'], 'l29-tf-forself':['MS6 FEDL','der','terms','M2'],
  'l29-toaster-mpl':['MS6','der','data','M3'], 'l29-g-mpl':['MS6','der','data','M3'], 'l29-tf-falling':['MS6','der','terms','M4'],
  'l29-gr-mplbars':['MS6','der','graphs','M3 M4'], 'l29-why-earn':['MS6 ELMW','der','terms','M2'], 'l29-nurses':['OS40 OS41','der','models','M2 M6'],
  'l29-markets':['OS40','der','terms','M1'], 'l29-tf-households':['MS6','der','terms','M1'], 'l29-g-prodchg':['MS6','der','data',''],
  'l29-capital-derived':['MS6','der','models','M5 M6'], 'l29-avg':['MS6','der','data','M3'], 'l29-g-mpl2':['MS6','der','data','M3'],
  'l29-tf-zero':['MS6','der','terms','M4'], 'l29-compensation':['OS41','der','terms',''], 'l29-tech-access':['MS6','der','models','M2'],
  'l29-decline':['OS41','der','models','M2 M6'], 'l29-tf-onlylabor':['MS6','der','terms','M5'], 'l29-flow':['OS41 FEDL','der','models','M2 M6'],
  'l29-q100k':['MS6','der','terms','M3'], 'l29-firm-buyer':['OS40 MS6','der','terms','M1'], 'l29-education':['OS41','der','terms','M6'], 'l29-gr-tp':['MS6','der','graphs','M4'],
  'l29c-pf':['MS6','der','data',''], 'l29c-roles':['OS40','der','terms','M1 M6'], 'l29c-derived':['OS41','der','models','M2 M6'],
  'l29c-earn':['MS6','der','models',''], 'l29c-mpl':['MS6','der','data','M3'], 'l29c-skill':['OS41','der','models','M2 M6']
};
u6tag(L29TAGS);

U6_CARDS.l29 = [
  ['Factor market','What is a factor market, and who buys and sells in it?','A market for inputs of production (labor, capital, natural resources). Firms are the buyers; households are the sellers.','A bakery hiring a baker for $120 a day is a factor-market trade.','The roles are the reverse of the product market, where households buy.'],
  ['Product market vs factor market','How do the roles of firms and households differ between the two markets?','Product market: firms sell goods, households buy. Factor market: households sell labor and other inputs, firms buy.','The same family buys a toaster (product market) and sells a day of work (factor market).','Don\'t carry the product-market roles over to labor.', FIG6.l29two()],
  ['Production function','What does a production function show?','How much output a firm gets from given amounts of inputs: Q = f(land, labor, capital).','Your course\'s Q = 100K + 25L: 2 machines and 4 workers make 300 units.','The number in front of each input is what one more of it adds in this simple example.'],
  ['Who demands and supplies labor','In the labor market, who is on each side?','Firms and other employers demand labor; households (job seekers) supply it.','A student working at a bookstore supplies labor; the bookstore demands it.','Households demand goods but supply labor.'],
  ['Derived demand','What is derived demand?','The demand for an input comes from the demand for the product it helps make.','The demand for chefs depends on the demand for restaurant meals.','It applies to every factor, not only labor: ovens, vans and land too.', u6shift('Dr','Labor demand shifts right when product demand rises')],
  ['Derived demand chain','What happens to labor demand when demand for the product rises?','Firms want to produce more, so they want more workers at every wage: labor demand shifts right.','More people eat out → restaurants want more chefs.','Start from the product market and work back to the jobs.'],
  ['Demand for labor','What does the demand curve for labor show, and which way does it slope?','How many workers employers want at each wage. It slopes down: at a lower wage they want more.','At a higher salary, some hospitals hire fewer nurses (textbook).','A change in the wage moves along the curve; it doesn\'t shift it.', u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',at:'start',lx:4,ly:2}], aria:'A labor demand curve sloping down' })],
  ['Supply of labor','What does the market supply of labor show, and which way does it slope?','How many people want to work at each wage. It slopes up: a higher wage draws more people away from leisure.','Higher nursing pay draws more people to train and work as nurses (textbook).','Households are the suppliers (Lesson 32 covers this in depth).', u6mini({ lines:[{a:[1,1],b:[9,9],c:SC,label:'S',lx:-2,ly:-3,anchor:'end'}], aria:'A labor supply curve sloping up' })],
  ['Labor compensation','What is the full "price" of labor?','Wage or salary plus benefits. Benefits can be up to 30 percent of compensation (textbook).','A $50,000 salary plus $15,000 of benefits is $65,000 of compensation.','The wage alone understates what labor costs the employer.'],
  ['Marginal product of labor (MPL)','What is the marginal product of labor, and how do you calculate it?','The extra output from one more worker: (Q2 − Q1) ÷ (L2 − L1).','Toaster company: the 3rd worker raises output from 90 to 120, an MPL of 30.','Not output per worker: 120 ÷ 3 = 40 is a different number.', u6minibars([50,40,30,20,10,0],{ymax:50,aria:'Marginal product of workers 1 to 6: 50, 40, 30, 20, 10, 0'})],
  ['Why some workers earn more','Using marginal product, why do some workers earn more than others?','They are more productive (higher marginal product) because of experience, education and training, or access to the latest technology.','A carpenter with a power saw adds more output per hour than one with hand tools.','Pay follows what a worker adds to output, not effort alone.'],
  ['Falling marginal product','When each new worker adds less output, what happens to total output?','It keeps rising, just more slowly. It falls only if a worker\'s marginal product is negative.','Toaster company: MPL 50, 40, 30, 20, 10, 0; output 50, 90, 120, 140, 150, 150.','A shrinking bar is not a shrinking total.', FIG6.l29bars()]
];

Object.assign(U6_WRITE, {
  'w-l29-1':{lesson:'l29',prompt:'Explain what "derived demand" means in your own words. Use an example of a product and a job that makes it, and say what happens to the job market when people buy more of the product.',
    model:'Derived demand means a firm\'s demand for an input comes from consumers\' demand for the product the input helps make. Firms don\'t hire workers for their own sake; they hire them to produce things they can sell. For example, the demand for chefs depends on the demand for restaurant meals. If more people eat out, restaurants sell more meals and want to cook more, so they want more chefs at every wage. The demand for chefs shifts right, which tends to raise chefs\' wages and the number hired. If people ate out less, the same chain would run in reverse and the demand for chefs would fall.',
    checklist:['Defines derived demand as input demand that comes from demand for the product','Names a specific product and the labor (or other input) that makes it','Explains the chain: more product demand → firms produce more → want more workers','States the result in the labor market (demand for labor shifts right; wage or employment rises)']},
  'w-l29-2':{lesson:'l29',prompt:'Using your course\'s toaster company (output 0, 50, 90, 120, 140, 150, 150 with 0 to 6 workers), explain what the marginal product of labor is, calculate it for two workers, and explain why total output keeps rising even though marginal product falls.',
    model:'The marginal product of labor is the extra output from adding one more worker: the change in output divided by the change in workers. For the toaster company, the 2nd worker raises output from 50 to 90, so his marginal product is 40. The 4th worker raises it from 120 to 140, so his is 20. Marginal product falls as workers are added (50, 40, 30, 20, 10, 0), but every worker up to the 5th still adds something positive, so total output keeps rising to 150. Output would fall only if a worker\'s marginal product were negative. The 6th worker adds nothing, so output stays at 150.',
    checklist:['Defines marginal product as the change in output from one more worker','Calculates two marginal products correctly from the table','Explains that a positive but smaller marginal product still raises total output','Notes that output would fall only with a negative marginal product (or explains the 6th worker\'s zero)']}
});

U6_PLAN.l29 = {
  core:['l29-derived-def','l29-roles','l29-g-prodfn','l29-chef','l29-gr-derived','l29-tf-forself','l29-toaster-mpl','l29-g-mpl','l29-tf-falling','l29-gr-mplbars','l29-why-earn','l29-nurses'],
  more:['l29-markets','l29-tf-households','l29-g-prodchg','l29-capital-derived','l29-avg','l29-g-mpl2','l29-tf-zero','l29-compensation','l29-tech-access','l29-decline','l29-tf-onlylabor','l29-flow','l29-q100k','l29-firm-buyer','l29-education','l29-gr-tp']
};

U6_LESSONS.push({ id:'l29', unit:6, title:'Factor Markets and Derived Demand', mins:35, src:'Modern States video 6.1 (first part) and Module 6 slides 247-254 · Course textbook (OpenStax) ch. 4 introduction and §4.1',
  sources:['MS6','OS40','OS41','CB','ELMW','FEDL'],
  oneline:'Firms buy labor and other inputs from households in factor markets. The demand for labor is derived from the demand for what it makes, and each worker counts by the output he adds.',
  body:`
<p>Units 2 to 5 studied ${dt('product-market','product markets')}, where firms sell goods. Lesson 4\'s circular flow had a second loop: ${dt('household','households')} selling their work to ${dt('firm','firms')}. This unit studies that loop. It reuses Lesson 16\'s ${dt('marginal-product','marginal product')} and Unit 5\'s rule that firms compare what one more unit adds to revenue and to cost.</p>

<h2>Factors of production and the production function</h2>
<!-- src: MS6 (video 6.1: "when we think about factors of production, this is reflecting inputs that are used by the firm to produce various goods or services, such as labor, capital, and natural resources"; "we can use the production function to show the relationship between the quantity of inputs and the total output"; slides 248-249: Q = f(Land, Labor, Capital); "Example: Q = 100 K + 25 L"; "If the firm increases capital (K) it will increase production (Q)") -->
<p>Your course: ${dt('factors','factors of production')} are "inputs that are used by the firm to produce various goods or services, such as ${dt('labor','labor')}, ${dt('capital','capital')}, and natural resources" (${dt('land','land')}). The ${dt('production-function','production function')} links them to output: Q = f(land, labor, capital).</p>
<p><b>Why it matters here:</b> a firm wants an input only for the output it makes. So the first question about any input is how much more output one more unit of it adds.</p>
${FIG6.l29pf()}
<p>Check: your course\'s example shows both inputs raise output: "If the firm increases capital (K) it will increase production (Q). If the firm increases labor (L) it will increase production (Q)." Real production functions usually add less and less as one input grows, as Lesson 16 showed and the toaster example below confirms.</p>
<div data-check="l29c-pf"></div>

<h2>Two markets, two roles</h2>
<!-- src: MS6 (video 6.1: "where does the demand for factors of production come from? It comes from the firm. And where does the supply of factors of production come from? Well, it comes from the household"; slide 249); OS40 ("In labor markets job seekers (individuals) are the suppliers of labor, while firms and other employers who hire labor are the demanders for labor"; 2011: 52% of undergraduates worked part time); OS41 (price of labor = "total labor compensation: salary plus benefits ... as high as 30 percent") -->
<p>A ${dt('factor-market','<b>factor market</b>')} is a market for inputs. Your course: the demand for factors "comes from the firm," and the supply "comes from the household." The textbook puts it for labor: "job seekers (individuals) are the suppliers of labor, while firms and other employers who hire labor are the demanders for labor."</p>
${FIG6.l29two()}
<p><b>Why the roles flip:</b> a household owns its time and skills, so it is the seller of labor. A firm needs that labor to make its product, so it is the buyer. The price in this market is the wage. The textbook notes the full price is ${dt('compensation','total labor compensation')}: "salary plus benefits," with benefits "as high as 30 percent."</p>
<p><b>So what:</b> in a labor graph, the ${dt('labor-demand','demand for labor')} comes from employers and slopes down, and the ${dt('labor-supply','supply of labor')} comes from workers and slopes up. Mixing up who is on which side is the most common slip in this unit.</p>
<div data-check="l29c-roles"></div>

<h2>Derived demand</h2>
<!-- src: MS6 (video 6.1: "when we think about firms demand for inputs of production, it's going to be based on what we call derived demand"; "if ... a firms good is in very high demand by consumers ... it's going to want to hire more workers and more inputs of production"; "it's linked directly to the demand by consumers for the good or service that that firm is producing"; slide 250: "Firm's demand for inputs is derived from consumers' demand for their product"); OS41 ("the demand for labor is based on the demand for the good or service that is being produced ... Therefore the demand for labor is called a 'derived demand'"; chefs, pharmacists, attorneys; automobiles); FEDL ("The demand for labor is derived from ... the demand for goods and services produced"); OS40 (baby boomers; "Aging baby boomers and advances in life-saving and life-extending technologies will increase the demand for healthcare and nursing"; BLS: registered nursing jobs +19% 2012-2022) -->
<p>Your course: the firm\'s demand for inputs is "based on what we call ${dt('derived-demand','<b>derived demand</b>')}," because "it\'s linked directly to the demand by consumers for the good or service that that firm is producing." Federal Reserve Education says the same: the demand for labor "is derived from ... the demand for goods and services produced."</p>
${FIG6.l29chain()}
<p><b>Why it happens:</b> a firm hires a worker only to sell what the worker makes. If buyers want more of the product, the firm wants to make more, and it needs more hands to do it. The textbook\'s examples: the demand for chefs depends on restaurant meals, pharmacists on prescription drugs, attorneys on legal services.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of labor demand as the shadow of product demand. You can\'t move a shadow by pushing on it; you move the object that casts it. To predict what happens to a job market, look first at what is happening to the product those workers make.</p></div>
<p><b>Worked example: your course textbook\'s nurses.</b> The textbook expects "aging baby boomers and advances in life-saving and life-extending technologies" to raise the demand for health care. Nurses produce health care, so:</p>
<div class="math">Demand for health care rises<br>→ hospitals and clinics want to treat more patients<br>→ they want more nurses at every salary<br>→ <b>the demand for nurses shifts right</b></div>
<p>Check: the textbook cites a Bureau of Labor Statistics forecast that registered nursing jobs would grow 19% from 2012 to 2022. That fits a rising demand.</p>
<p>Here is the same shift drawn in both markets, the meals market first and then the chefs\' market.</p>
${FIG6.l29pair()}
<p><b>So what:</b> on the exam, a change in a product\'s demand shifts the <b>demand</b> curve for the workers who make it, in the same direction. It applies to other inputs too: more package deliveries mean more demand for vans as well as drivers.</p>
<div data-check="l29c-derived"></div>

<h2>Why some workers earn more</h2>
<!-- src: MS6 (video 6.1: "The first is what we call the Marginal Physical Product of Labor ... it's going to show us the changes in quantity produced based on additional workers. The differences in the Marginal Physical Product of Labor are going to help reflect and show us why some people may earn more than others. So what we see is that some workers tend to be more productive because of experience, education and training, or access to the latest technology"; slide 251); OS41 (Table 4.2: "A well-trained and educated workforce causes an increase in the demand for that labor by employers"); ELMW (Gorman: "Employers typically are not willing to pay a worker more than the value of the additional product that he produces") -->
<p>Your course measures each worker by the marginal physical product of labor (MPL): "the changes in quantity produced based on additional workers." Differences in it "help reflect and show us why some people may earn more than others."</p>
${FIG6.l29why()}
<p><b>Why productivity sets pay:</b> an employer gains from a worker only what that worker adds. A worker who adds more output per hour brings in more for the firm, so firms will compete to pay more for him. Econlib\'s Gorman puts the limit: employers "typically are not willing to pay a worker more than the value of the additional product that he produces."</p>
<p><b>So what:</b> anything that raises workers\' productivity, such as training or better tools, tends to raise the demand for them. The textbook: "A well-trained and educated workforce causes an increase in the demand for that labor."</p>
<div data-check="l29c-earn"></div>

<h2>The marginal product of labor</h2>
<!-- src: MS6 (video 6.1: "how much does production increase for one additional worker?"; toaster company: "The price of toasters is $10 and each worker is paid $100"; output 0, 50, 90, 120, 140, 150, 150; MPL 50, 40, 30, 20, 10, 0; "the sixth worker does not add anything to production, though production is still positive"; slide 252: MPL = (Q2 − Q1)/(L2 − L1); slides 253-254). Course slip: the video says "150 minus 40 divided by five minus four" for the 5th worker; the table gives 150 − 140 = 10. Slide 253 labels the last row "7"; slides 254-257 use 6. -->
<p>Your course\'s question: "how much more does one worker contribute to overall production?" The answer is the marginal product of labor, from slide 252:</p>
<div class="math">MPL = (Q2 − Q1) ÷ (L2 − L1) = change in output ÷ change in workers</div>
<p><b>Worked example: your course\'s toaster company.</b> These are the same output numbers as Lesson 16\'s Firm A.</p>
${FIG6.l29mpl()}
<p>Sense check: the marginal products add back up to total output, 50 + 40 + 30 + 20 + 10 + 0 = 150. (The video reads the 5th row as "150 minus 40"; the table shows 150 − 140, which is the 10 used here.)</p>
<p>The same numbers as bars: one bar per worker for what he adds, and a line for total output.</p>
${FIG6.l29bars()}
<p><b>So what:</b> each worker adds less than the one before. Lesson 30 turns these toasters into dollars and shows this falling pattern is why a firm hires more workers only at a lower wage.</p>
<p>Add workers one at a time below and watch what each one adds.</p>
<div data-widget="toaster"></div>
<p>What to notice: the bar for the newest worker shrinks with every hire, but the output total only stops rising at the 6th worker.</p>
<div data-check="l29c-mpl"></div>

<h2>Trace it back from the product</h2>
<!-- src: OS41 (derived demand examples; Table 4.2), MS6. Exam skill: start in the product market, then decide which labor curve moves and which way. -->
<p>CLEP questions often describe a change in what consumers buy and ask about a job market. The move has three steps. (1) Name the product and the workers who make it. (2) Ask whether firms will want more or less of that product made. (3) Shift the <b>demand</b> for those workers the same way. Supply doesn\'t move unless something changes for the workers themselves.</p>
<div data-widget="dersort"></div>
<p>What to notice: every product change landed on the demand side of a labor market. Workers\' own choices (Lesson 32) are what move labor supply.</p>
<div data-check="l29c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L29TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"Households demand labor and firms supply it."</span>Reversed. Firms buy labor (demand); households sell it (supply). Only in the product market do households buy.</li>
<li><span class="wrong">"The demand for labor has nothing to do with the firm\'s product."</span>It comes straight from it: derived demand. More sales of the product mean more demand for the workers who make it.</li>
<li><span class="wrong">"Marginal product is output divided by the number of workers."</span>That is output per worker. Marginal product is what the last worker added: the change in output.</li>
<li><span class="wrong">"When marginal product falls, total output falls."</span>A smaller positive marginal product still raises output. Output falls only when a worker adds a negative amount.</li>
<li><span class="wrong">"Derived demand applies only to labor."</span>Every input is demanded for what it helps make: ovens, vans and land as well as workers.</li>
<li><span class="wrong">"When people buy more of a product, the supply of the workers who make it changes."</span>Product demand reaches the labor market through employers, so it moves labor <b>demand</b>. Supply changes only when something changes for the workers themselves.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Factors of production</b> (labor, capital, natural resources) turn into output through a production function, such as your course\'s Q = 100K + 25L.</li>
<li>In a <b>factor market</b>, firms demand inputs and households supply them, the reverse of the product market; the price of labor is the wage, or total compensation.</li>
<li><b>Derived demand</b>: a firm\'s demand for an input comes from consumers\' demand for its product, so a rise in product demand shifts labor demand right.</li>
<li>Workers with a higher <b>marginal product</b>, from experience, training or better technology, are worth more to employers and tend to earn more.</li>
<li>The <b>marginal product of labor</b> is the change in output ÷ the change in workers. For the toaster company it falls 50, 40, 30, 20, 10, 0 while output rises to 150.</li>
<li>On the exam, trace a product-market change back to the <b>demand</b> for the workers who make it.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Derived factor demand" under Factor Markets (6% to 12% of the exam). Expect a question that changes the demand for a product and asks about the workers who make it: their demand curve or their wage. Or expect one that asks what "derived demand" means.</p>
</div>`,
  deeper:`
<h3>Prices of the other factors</h3>
<p>Labor\'s price is the wage. Your course\'s slide 263 adds that a firm also "pays rent for capital." Lesson 4 matched each factor with its payment: land earns rent, capital earns interest and entrepreneurship earns profit. (The slide\'s "rent for capital" means renting a machine; the payment for owning capital is still interest.) Each of these markets runs on the same logic as labor: firms\' demand is derived from what the input helps produce.</p>
<h3>Labor measured in hours</h3>
<p>Your course textbook notes that labor can be counted "by number of workers" or "by the number of hours worked," and its price measured per year, month, week or hour. The graphs work the same way either way.</p>
<h3>Financial markets</h3>
<p>The same textbook chapter applies supply and demand to saving and borrowing (§4.2): savers supply money and borrowers demand it, and the interest rate is the price. The CLEP microeconomics outline doesn\'t list financial markets, so this unit doesn\'t test them.</p>`,
  links:[ {k:'Textbook',t:'4.1 Demand and Supply at Work in Labor Markets',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/4-1-demand-and-supply-at-work-in-labor-markets',w:'The newer edition of your course textbook\'s §4.1: derived demand, the nurses example and the shifters of labor demand and supply. Wording may differ slightly from your 2016 edition.'},
          {k:'Video',t:'The Labor Market',s:'Federal Reserve Education',u:'https://www.federalreserveeducation.org/teaching-resources/economics/labor-income/the-labor-market',w:'A short video assignment on how supply and demand set the wage, including derived demand.'} ]
});

u6xv({
  'l29-derived-def':[FIG6.l29chain(), ''], 'l29-flow':[FIG6.l29chain(), ''], 'l29-tf-forself':[FIG6.l29chain(), ''],
  'l29-markets':[FIG6.l29two(), ''], 'l29-tf-households':[FIG6.l29two(), ''], 'l29-firm-buyer':[FIG6.l29two(), ''], 'l29c-roles':[FIG6.l29two(), ''],
  'l29-tf-falling':[FIG6.l29bars(), ''], 'l29-tf-zero':[FIG6.l29bars(), ''], 'l29-avg':[FIG6.l29mpl(), ''], 'l29c-mpl':[FIG6.l29mpl(), ''],
  'l29-why-earn':[FIG6.l29why(), ''], 'l29-tech-access':[FIG6.l29why(), ''], 'l29-education':[FIG6.l29why(), ''], 'l29c-earn':[FIG6.l29why(), ''],
  'l29-q100k':[FIG6.l29pf(), ''], 'l29c-pf':[FIG6.l29pf(), ''],
  'l29-tf-onlylabor':[u6shiftBig('Dr','Marked up: more bread wanted shifts bakeries\' demand for ovens from D1 to D2, the same derived-demand logic as for workers.','P1','P2','Ovens','Price of ovens'), ''],
  'l29c-skill':[figs([['Milk (ordinary demand)', u6shift('Dr','Demand for milk shifts right','Milk','Price of milk')],['Dairy farm workers (derived demand)', u6shift('Dr','Demand for dairy farm workers shifts right')]], 'Marked up: the study shifts the demand for milk directly; the demand for dairy farm workers shifts because of it.'), ''],
  'l29-chef':[u6shiftBig('Dr','Marked up: more meals demanded moves the demand for chefs from D1 to D2, so chefs\' wage and employment rise.'), ''],
  'l29-nurses':[u6shiftBig('Dr','Marked up: the demand for nurses shifts from D1 to D2 as the demand for health care grows.'), 'The supply choices put the change on the nurses\' side. An aging population may need more care, but derived demand works through the employers who provide it (M6).'],
  'l29-decline':[u6shiftBig('Dl','Marked up: fewer newspapers demanded moves the demand for press operators from D1 to D2; their wage and employment fall.'), '"The wage rises" gets the direction backwards, and "nothing changes" treats the job market as unrelated to the product (M2).'],
  'l29-capital-derived':[u6shiftBig('Dr','Marked up: the demand for delivery vans moves from D1 to D2 as deliveries grow.','P1','P2','Delivery vans','Price of vans'), ''],
  'l29-roles':[FIG6.l29two(), 'Every wrong pairing either reverses the roles (M1) or names something that isn\'t a buyer or seller of labor.']
});
u6cv('l29', { 'Factor market': FIG6.l29two(), 'Production function': FIG6.l29pf(), 'Derived demand chain': FIG6.l29chain(), 'Why some workers earn more': FIG6.l29why(), 'Who demands and supplies labor': FIG6.l29two() });
