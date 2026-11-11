/* ===== Lesson 30 figures ===== */
const VMP_PTS = TO.slice(1).map(r=>[r.L, r.vmp]);            // (1,500) ... (6,0)
/* best number of workers at wage w from a list of VMPs: hire while VMP ≥ w (ties go to the larger number, as your course does) */
const hireAt = (vmps, w) => { let n=0; vmps.forEach((v,i)=>{ if(v >= w - 1e-9 && i===n) n=i+1; }); return n; };

/* L30 V1: value of the marginal product, MP × price (slide 255) */
FIG6.l30vmp = () => fig(atable(['Workers','MP × price','Value of MP'],
  TO.slice(1).map(r=>[r.L, `${r.mp} × $10`, `<b>${usd6(r.vmp)}</b>`]), { cls:'compact', hl:{2:{row:'u3z2'}} }),
  'Your course\'s toaster company, toasters at $10. Each worker\'s extra toasters are turned into dollars. The highlighted 3rd worker adds 30 toasters, worth 30 × $10 = $300 to the firm. The values fall with each hire, just as the marginal products do.');

/* L30 V2: marginal profit of each worker, VMP − wage (slide 257) */
FIG6.l30mprof = () => fig(`<div class="qg">${ubars(TO.slice(1).map(r=>r.mprof), { labels:['1st','2nd','3rd','4th','5th','6th'], ylab:'Marginal profit ($)', xlab:'Worker', fmtv:v=>v<0?'−'+Math.abs(v):v, colorOf:v=> v>0 ? 'var(--ok)' : v<0 ? 'var(--bad)' : 'var(--g2)' })}</div>`,
  'Your course\'s toaster company: value of the marginal product minus the $100 daily wage. Green workers add profit, the 5th adds exactly $0, and the 6th would cost $100 more than he brings in. The firm keeps hiring while the bars are above zero.');

/* L30 V3: marginal revenue product with and without price-taking (slide 258; OpenStax 2e §14.1; textbook §9.2) */
FIG6.l30mrp = () => fig(`<div class="u3pair">
  <div class="u3card ok"><p class="u3h">Price taker (your course\'s toaster company)</p><p>The 3rd worker adds 30 toasters, and every toaster sells for $10, so MR = $10.</p><div class="math" style="margin:.4rem 0 0">MRP = 30 × $10 = <b>$300</b><br>Value of MP = 30 × $10 = $300<br>Same number</div></div>
  <div class="u3card no"><p class="u3h">Firm with market power (made-up bakery)</p><p>A 2nd baker raises output from 20 to 30 cakes, but to sell 30 the only bakery in town cuts its price from $12 to $10.</p><div class="math" style="margin:.4rem 0 0">Revenue: 20 × $12 = $240 → 30 × $10 = $300<br>MRP = $300 − $240 = <b>$60</b> (10 cakes × MR $6)<br>Value of MP = 10 × $10 = $100</div></div></div>`,
  'Two firms. First card: every unit sells at the same price, so marginal revenue equals the price. MRP and the value of the marginal product are then the same. Second card (made-up numbers): a firm that must cut its price to sell more gets only $60 of extra revenue from the baker. That is less than the $100 his cakes are worth at the new price.');

/* L30 V3b: MRP below MP × price for a firm with market power (made-up straight-line curves, same as l30-gr-mrpvmp) */
FIG6.l30mrpgraph = () => fig(sdg({ xmax:6.5, ymax:110, xt:[0,1,2,3,4,5,6], yt:[0,50,100], xlab:'Workers', ylab:'Dollars per day', aria:'MP times price above MP times marginal revenue, with a 50 dollar wage line',
  lines:[ {a:[1,100],b:[6,40],c:'var(--muted)',dash:'5 4',w:2}, {a:[1,80],b:[6,10],c:DC}, {pts:[[0,50],[6.5,50]],c:'var(--g2)'} ], labels:[[1.15,104,'MP × price','var(--muted)','start'],[4.75,13,'MRP',DC,'start'],[0.15,53.5,'Wage $50','var(--g2)','start']],
  dots:[{q:3.14,p:50,label:'hires ≈ 3',c:'var(--ink)',lx:-6,ly:20,anchor:'end'},{q:5.17,p:50,c:'var(--muted)'}], vls:[{q:3.14,p:50}] }),
  'Made-up curves for a firm that must cut its price to sell more. Its MRP curve lies below MP × price because marginal revenue is below the price. At a $50 wage it hires about 3 workers, where MRP meets the wage, not about 5, where MP × price would.');

/* L30 V4: the hiring rule on a graph (slide 259) */
FIG6.l30rule = () => fig(sdg({ xmax:6.5, ymax:550, xt:[0,1,2,3,4,5,6], yt:[0,100,200,300,400,500], xlab:'Workers', ylab:'Dollars per day', aria:'Value of the marginal product falling from 500 to 0, with the wage line at 100 meeting it at the 5th worker',
  lines:[ {pts:VMP_PTS, c:DC}, {pts:[[0,100],[6.5,100]], c:'var(--g2)'} ],
  dots: VMP_PTS.slice(0,5).map(([q,p])=>({q,p,c:DC})).concat([{q:5,p:100,label:'Hire 5',c:'var(--ink)',lx:-8,ly:20,anchor:'end'}]), vls:[{q:5,p:100}],
  labels:[ vLab(500,550,'Value of MP = demand'), wLab(100,550), [3.25,330,'Dot above wage: hire','var(--ok)','start'] ] }),
  'Your course\'s toaster company (slide 259 draws the same picture, though its wage line sits below its own $0 tick). Each dot is one worker\'s value of the marginal product. While a dot is above the $100 wage line, hiring that worker adds profit. The 5th worker\'s $100 just equals the wage, which is where your course says the firm stops.');

/* L30 V5: the demand curve for labor: a wage change moves along it (made-up wages, course numbers) */
FIG6.l30demand = () => fig(sdg({ xmax:6.5, ymax:550, xt:[0,1,2,3,4,5,6], yt:[0,100,200,300,400,500], xlab:'Workers hired', ylab:'Wage ($ a day)', aria:'Labor demand curve with wage 250 giving 3 workers and wage 150 giving 4',
  lines:[ {pts:VMP_PTS, c:DC} ], labels:[ vLab(500,550,'D (value of MP)'), [4.2,262,'$250: hire 3','var(--muted)','start'], [5.0,162,'$150: hire 4','var(--g2)','start'] ],
  hl:[{p:250,c:'var(--muted)'},{p:150,c:'var(--g2)'}], vls:[{q:3,p:300},{q:4,p:200}],
  dots:[{q:3,p:300,c:'var(--muted)'},{q:4,p:200,c:'var(--ink)'}],
  arrows:[{a:[3.15,285],b:[3.85,215],c:'var(--g2)'}] }),
  'Made-up wages, your course\'s toaster numbers. Workers come whole, so read the dots, not the line between them. At a $250 wage the firm hires 3 (the 3rd worker\'s dot, $300, is above the wage line; the 4th, $200, is below). If the wage falls to $150, the 4th worker is now worth hiring. The firm slides down the same curve; the curve itself doesn\'t move.');

/* L30 V6: why the curve slopes down: diminishing marginal returns (slide 260) */
FIG6.l30dmr = () => fig(flow([
  'The firm\'s capital (machines, building) is fixed in the short run.',
  'Each extra worker has less equipment to work with, so he adds <b>fewer toasters</b>: MP 50, 40, 30, 20, 10, 0.',
  'Each extra worker\'s output is worth less: value of MP <b>$500, $400, $300 ...</b>',
  {t:'The firm will hire another worker only at a <b>lower wage</b>: the labor demand curve slopes down.',c:'u3end'}
]), 'Your course\'s slide 260: "Output is increasing at a decreasing rate if firm increases only one input. Each worker adds to production, but less and less." Follow the chain down: diminishing returns in production become a downward-sloping demand for labor.');

/* L30 V7: the same rule as Unit 5, side by side */
FIG6.l30parallel = () => fig(atable(['','Unit 5: choosing output','Unit 6: choosing workers'],
  [['One more unit of','output','labor (a worker)'],['What it adds to revenue','Marginal revenue (MR)','Marginal revenue product (MRP)'],['What it adds to cost','Marginal cost (MC)',`The wage (${dt('mfc','marginal factor cost')}, Lesson 32)`],['Keep going while','MR > MC','MRP > wage'],['Stop where','MR = MC','MRP = wage']],
  { cls:'compact wrap', hl:{4:{row:'u3z2'}} }),
  'The hiring rule is Lesson 21\'s MR = MC rule seen from the input side. The firm adds a worker while he brings in more revenue than he costs and stops where the two are equal. The bottom row is the rule to remember.');

/* ===== Lesson 30: Marginal Revenue Product and the Hiring Rule (Modern States video 6.1, middle part; Module 6 slides 255-260) =====
   Common mistakes: M1 hire until marginal product is zero · M2 value of MP = total output × price · M3 stop where marginal profit is largest
   M4 a higher wage shifts labor demand left · M5 MRP always equals price × MP · M6 each worker is paid the value of what he himself produces */

mc('l30-vmp-def','l30','Which of the following is the value of the marginal product of labor?',
  [`The marginal product of labor × the price of the output`,`Total output × the price of the output`,`The wage × the number of workers`,`Total revenue ÷ the number of workers`,`The marginal product of labor ÷ the wage`],0,
  `<p>Your course: "we want to multiply the Marginal Product of Labor ... by the price of the good," which gives "a dollar figure for the contributions that the additional worker adds to the firm." For the toaster company\'s 1st worker: 50 × $10 = $500.</p><p>Total output × price is total revenue, not what one worker adds (M2). Revenue ÷ workers is an average.</p>`);
mc('l30-toaster-vmp','l30',`${toIntro()}${toTbl(['q'])}What is the value of the marginal product of the <b>4th</b> worker?`,
  [`$200`,`$1,400`,`$350`,`$20`,`$100`],0,
  `<p>The 4th worker adds 140 − 120 = 20 toasters, worth 20 × $10 = <b>$200</b>.</p>${toTbl(['q','mp','vmp'],{hl:4})}<p>$1,400 is the value of all 140 toasters (M2); $350 is that total ÷ 4 workers, an average; $20 forgets to multiply by the price; $100 is the wage.</p>`);
gen('l30-g-vmp','l30',()=>{
  let mps; do { const m1 = pick([12,15,16,20,24]); mps=[m1]; while(mps.length<5) mps.push(mps[mps.length-1] - pick([2,3,4])); } while(mps[4] < 1);
  const Q=[0]; mps.forEach(m=>Q.push(Q[Q.length-1]+m)); const P = pick([3,4,5,6,8]), k = pick([2,3,4,5]), ans = mps[k-1]*P;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A juice bar sells every smoothie at <b>$${P}</b>. Smoothies made per hour:${atable(['Workers','Smoothies an hour'], Q.map((q,L)=>[L,q]), { cls:'compact' })}What is the value of the marginal product of the <b>${ordinal(k)}</b> worker, per hour?`, answer:ans,
    explain:`<p>Marginal product = ${Q[k]} − ${Q[k-1]} = ${mps[k-1]} smoothies. Value = ${mps[k-1]} × $${P} = <b>$${ans}</b>.</p>${atable(['Workers','Smoothies','MP','Value of MP'], Q.map((q,L)=>[L, q, L?mps[L-1]:'–', L?'$'+mps[L-1]*P:'–']), { cls:'compact', hl:{[k]:{row:'u3z2'}} })}<p>The common slip is multiplying total output by the price ($${Q[k]*P}), which counts every worker\'s smoothies, not just the ${ordinal(k)}\'s (M2).</p>` };
});
gen('l30-g-hire','l30',()=>{
  let mps, P, W, vm, n;
  do { const m1 = pick([20,24,30,36]); mps=[m1]; while(mps.length<6) mps.push(Math.max(0, mps[mps.length-1] - pick([3,4,5,6])));
    P = pick([5,10,15,20]); vm = mps.map(m=>m*P); W = pick([40,60,75,90,100,120,150,200]); n = hireAt(vm, W);
  } while(vm.includes(W) || n < 1 || n > 5);
  const Q=[0]; mps.forEach(m=>Q.push(Q[Q.length-1]+m));
  return { type:'num', kind:'num', unit:'workers', prompt:`Made-up numbers. A perfectly competitive farm sells crates of peaches at <b>$${P}</b> each and can hire all the pickers it wants at <b>$${W}</b> a day. Crates picked per day:${atable(['Pickers','Crates a day'], Q.map((q,L)=>[L,q]), { cls:'compact' })}How many pickers should it hire to maximize profit?`, answer:n,
    explain:`<p>Turn each picker\'s extra crates into dollars and compare with the $${W} wage:</p>${atable(['Pickers','MP (crates)','Value of MP','Hire?'], mps.map((m,i)=>[i+1, m, '$'+vm[i], vm[i]>W?'Yes: adds $'+(vm[i]-W):'No: loses $'+(W-vm[i])]), { cls:'compact', hl:{[n-1]:{row:'u3z2'}} })}<p>Hire every picker worth more than the wage: <b>${n}</b>. The ${ordinal(n+1)} would add only $${vm[n]} but cost $${W}.</p><p>The common slip is hiring until marginal product reaches zero (M1), or comparing crates (${mps[n]}) with dollars.</p>` };
});
tf('l30-tf-mpzero','l30','To maximize profit, a firm should keep hiring until the last worker\'s marginal product is zero.',false,
  `<p>False. That maximizes output, not profit. Workers cost money. Your course\'s toaster company stops at the 5th worker, whose output is worth $100, the same as his wage. The 6th adds 0 toasters but still costs $100, a marginal profit of −$100 (M1).</p>`);
lazy('l30-gr-demand','l30',()=>visMC({
  prompt:`Each graph puts the wage (up) against the number of workers a firm wants to hire (across). Which graph shows a perfectly competitive firm\'s <b>demand for labor</b>, given that each extra worker adds less output than the one before?`,
  choices:[
    { svg:L=>u6mini({ lines:[{a:[1,9],b:[9,1],c:DC}], aria:'Graph '+L }), desc:'a line sloping down', ok:true },
    { svg:L=>u6mini({ lines:[{a:[1,1],b:[9,9],c:DC}], aria:'Graph '+L }), desc:'a line sloping up' },
    { svg:L=>u6mini({ lines:[{a:[0.5,5],b:[9.5,5],c:DC}], aria:'Graph '+L }), desc:'a horizontal line' },
    { svg:L=>u6mini({ lines:[{a:[5,0.5],b:[5,9.5],c:DC}], aria:'Graph '+L }), desc:'a vertical line' },
    { svg:L=>u6mini({ lines:[{pts:[[1,8],[3,4],[5,2.5],[7,4],[9,8]],c:DC}], aria:'Graph '+L }), desc:'a U-shaped curve' } ],
  explain: L => `<p><b>Graph ${L}</b>: the demand for labor slopes down. Each extra worker adds less output, so his output is worth less (value of MP $500, $400, $300 ... for your course\'s toaster company). The firm will hire another worker only if the wage is lower.</p>${fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity of labor', ylab:'Wage', aria:'Marked-up answer graph', lines:[ {a:[1,9],b:[9,1],c:DC} ], labels:[[1.4,9.4,'Demand for labor',DC,'start']], hl:[{p:7,q:3,c:'var(--muted)'},{p:5,q:5,c:'var(--g2)'}], vls:[{q:3,p:7},{q:5,p:5}], dots:[{q:3,p:7,label:'high wage: few',c:'var(--muted)',lx:9,ly:4},{q:5,p:5,label:'low wage: more',c:'var(--ink)',lx:9,ly:4}] }), 'The answer graph, marked up: at a lower wage more workers are worth hiring.')}<p>An upward line is the shape of the market labor <b>supply</b> curve (Lesson 32). A horizontal line is the wage a single firm faces, not its demand.</p>` }));
mc('l30-mrp-def','l30','Which of the following describes the marginal revenue product of labor (MRP)?',
  [`The extra revenue from hiring one more worker: marginal product × marginal revenue`,`The extra output from hiring one more worker`,`The wage paid to the last worker hired`,`Total revenue divided by the number of workers`,`The price of the output × total output`],0,
  `<p>MRP is the marginal product (extra units) times the marginal revenue each unit brings in. Your course: "In a competitive market where firms are price takers, the Marginal Revenue Product is going to be equal to the price times the Marginal Product of Labor because the price will reflect Marginal Revenue."</p><p>The extra output alone is the marginal product. The wage is the cost side, not the revenue side.</p>`);
gen('l30-g-mrp','l30',()=>{
  let q1, q2, p1, p2, mrp;
  do { q1 = pick([10,20,30,40]); q2 = q1 + pick([5,10]); p1 = pick([12,15,18,20]); p2 = p1 - pick([1,2,3]); mrp = q2*p2 - q1*p1; } while(mrp <= 0);
  const vmp = (q2-q1)*p2;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A town\'s only bakery (a monopoly) makes <b>${q1}</b> cakes a day with 3 bakers and <b>${q2}</b> with 4. To sell ${q1} cakes it can charge <b>$${p1}</b> each; to sell ${q2} it must cut the price to <b>$${p2}</b> on every cake. What is the marginal revenue product of the 4th baker?`, answer:mrp,
    explain:`<div class="math">Revenue with 3 bakers: ${q1} × $${p1} = $${q1*p1}<br>Revenue with 4 bakers: ${q2} × $${p2} = $${q2*p2}<br>MRP = $${q2*p2} − $${q1*p1} = <b>$${mrp}</b></div>${atable(['Bakers','Cakes','Price','Revenue'],[[3,q1,'$'+p1,'$'+q1*p1],[4,q2,'$'+p2,'$'+q2*p2]],{cls:'compact',hl:{1:{row:'u3z2'}}})}<p>The tempting answer is ${q2-q1} × $${p2} = $${vmp}, the value of the baker\'s cakes at the new price. That ignores the price cut on the other ${q1} cakes, so for a firm with market power MRP is smaller than marginal product × price (M5).</p>` };
});
mc('l30-wagechg','l30',`Your course\'s toaster company sells each toaster for $10:${toTbl(['mp','vmp'])}Made-up wages. If the daily wage falls from $250 to $150, how does the number of workers hired change?`,
  [`From 3 to 4: a movement down along the demand curve for labor`,`From 3 to 4: the demand curve for labor shifts right`,`From 4 to 3: a movement up along the demand curve`,`It stays at 5, because the 5th worker\'s value is $100`,`From 2 to 6, because a lower wage means hiring everyone`],0,
  `<p>At $250 the firm hires every worker worth more: the 3rd ($300) yes, the 4th ($200) no, so 3. At $150 the 4th ($200) is now worth hiring and the 5th ($100) isn\'t, so 4.</p>${FIG6.l30demand()}<p>Only the wage changed, so the firm moves along its demand curve; the curve doesn\'t shift (M4). A shift needs something else to change, such as the toaster price (Lesson 31).</p>`);
mc('l30-tie','l30',`${toIntro()}${toTbl(['mp','vmp','mprof'])}The 5th worker\'s output is worth $100, exactly his wage. Which of the following is true about hiring the 5th worker?`,
  [`Profit is the same with 4 or 5 workers, and it wants no more than 5`,`The firm should stop at 1 worker, where marginal profit is largest`,`The firm should hire the 6th worker, because output is still 150`,`The firm makes zero total profit with 5 workers`,`The firm should fire the 5th worker, because he adds no value`],0,
  `<p>Your course: "the firm is not going to want to hire any more than the fifth worker, and the firm will be indifferent between hiring the fourth or the fifth worker." The 5th worker adds $100 and costs $100, a marginal profit of $0, so profit is the same with 4 or 5. The rule names the 5th, where value equals the wage.</p>${toTbl(['vmp','w','mprof'],{hl:5,rows:[1,2,3,4,5,6]})}<p>Stopping at the 1st worker gives up $600 (M3). With 4 or 5 workers, the toasters\' value is still $1,000 more than the wages; only the 5th worker\'s marginal profit is zero. The 6th would lose $100.</p>`);
gen('l30-gr-hire','l30',()=>{
  const W = pick([50,150,250,350,450]), n = hireAt(TO.slice(1).map(r=>r.vmp), W);
  const g = (mark) => sdg({ xmax:6.5, ymax:550, xt:[0,1,2,3,4,5,6], yt:[0,100,200,300,400,500], xlab:'Workers', ylab:'Dollars per day', aria: mark ? 'Marked-up graph' : 'Value of the marginal product for workers 1 to 6 and a horizontal wage line',
    lines:[ {pts:VMP_PTS, c:DC}, {pts:[[0,W],[6.5,W]], c:'var(--g2)'} ], labels: mark ? [ wLab(W,550) ] : [ vLab(500,550), wLab(W,550) ],
    dots: VMP_PTS.map(([q,p])=>({q,p,c: mark && q<=n ? 'var(--ok)' : DC})).concat(mark?[{q:n,p:VMP_PTS[n-1][1],label:`Last hire: ${n}`,c:'var(--ink)',lx:8,ly:-10}]:[]), vls: mark ? [{q:n,p:VMP_PTS[n-1][1]}] : [] });
  return { type:'mc', kind:'graph', prompt:`Your course\'s toaster company: the dots show each worker\'s value of the marginal product. Made-up wage: the firm can hire all the workers it wants at <b>$${W}</b> a day.${g(false)}How many workers maximize its profit?`,
    options:['1','2','3','4','5'], answer:n-1, keepOrder:true,
    explain:`<p>Hire every worker whose dot is above the $${W} line: <b>${n}</b>. The next one is worth only $${TO[n+1].vmp}, less than the wage.</p>${fig(g(true), 'The question\'s graph, marked up: dots above the wage line are workers worth hiring; the last one is marked.')}<p>Hiring all 6 maximizes output, not profit (M1). Stopping at 1 worker ignores the others who still add profit (M3).</p>` };
}, 'graph');
mc('l30-dmr','l30','Why does a perfectly competitive firm\'s demand curve for labor slope downward?',
  [`Diminishing marginal returns: each extra worker adds less output, so his output is worth less`,`Workers become less willing to work as more are hired`,`The price of the firm\'s product falls as it hires more`,`The wage rises as the firm hires more`,`A higher wage shifts the labor demand curve left`],0,
  `<p>Your course\'s slide 260: "Each worker adds to production, but less and less." With the toaster price fixed at $10, a falling marginal product means a falling value of the marginal product ($500, $400 ...). So the firm hires more only at a lower wage.</p><p>"Workers less willing" describes supply. A price taker\'s price doesn\'t fall as it hires, and in a competitive labor market the wage doesn\'t rise with hiring (Lesson 32).</p>`);
/* L30 more */
mc('l30-mprof-def','l30','A worker\'s marginal profit is the extra profit the firm makes by hiring him. Which of the following calculates it?',
  [`the value of the marginal product minus the wage`,`the wage minus the marginal product`,`total revenue minus total cost`,`the marginal product times the wage`,`total output × price, minus the wage`],0,
  `<p>Your course: "we simply take the value of Marginal Product minus the wage and that\'ll give us the Marginal Profit." Toaster company: the 1st worker\'s $500 − $100 = $400. Total revenue minus total cost is total profit, not one worker\'s contribution. "Total output × price" is total revenue, not one worker\'s value (M2).</p>`);
gen('l30-g-mprof','l30',()=>{
  const mp = pick([8,12,15,20,25]), P = pick([4,5,6,8,10]), W = pick([40,60,80,90,100,120]), ans = mp*P - W;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A worker adds <b>${mp}</b> units of output a day, each unit sells for <b>$${P}</b>, and the daily wage is <b>$${W}</b>. What is this worker\'s marginal profit per day? (Type a negative number for a loss.)`, answer:ans,
    explain:`<div class="math">Value of MP = ${mp} × $${P} = $${mp*P}<br>Marginal profit = $${mp*P} − $${W} = <b>${usd6(ans)}</b></div><p>${ans>0?'Positive: hiring this worker raises profit.':ans<0?'Negative: this worker costs more than his output is worth, so the firm should not hire him.':'Zero: the firm is indifferent about this worker.'} The common slip is subtracting the wage from the marginal product in units (${mp} − ${W}), which mixes units and dollars.</p>` };
});
mc('l30-total-gain','l30',`${toIntro()}${toTbl(['mp','vmp','mprof'])}If the firm hires 5 workers, by how much do the toasters\' value exceed the workers\' wages?`,
  [`$1,000`,`$1,500`,`$500`,`$400`,`$0`],0,
  `${toTbl(['mp','vmp','mprof'],{hl:5,rows:[1,2,3,4,5]})}<p>Add the marginal profits: $400 + $300 + $200 + $100 + $0 = <b>$1,000</b>. Check another way: 150 toasters × $10 = $1,500 of revenue, minus 5 × $100 = $500 of wages, = $1,000.</p><p>$1,500 is revenue before wages; $500 is the wage bill; $400 is only the 1st worker\'s marginal profit (M3).</p>`);
tf('l30-tf-ownvmp','l30','Your course\'s toaster company hires all its workers at a $100 market wage, and toasters sell for $10. Each worker is paid the value of the toasters he himself adds, so the 1st worker (50 toasters) earns $500 and the 5th (10 toasters) earns $100.',false,
  `<p>False. Every worker is paid the same $100 market wage. The firm keeps hiring until the <b>last</b> worker\'s output is worth the wage, so the wage equals the value of the marginal product of the last worker hired, not of each worker. (One of your course\'s slides reads "Wage of each worker = Value of output they each produce"; its own table pays everyone $100.) (M6)</p>`);
mc('l30-price-up','l30',`${toIntro()}${toTbl(['q','mp'])}Made-up change: the wage is $250 a day, and the price of a toaster rises from $10 to $20. How many workers does the firm now hire?`,
  [`4 (it hired 3 before)`,`3, the same as before`,`6, because every worker is now profitable`,`2, because costs rose`,`5 (it hired 4 before)`],0,
  `<p>At $10 the values of MP are $500, $400, $300, $200 ...: the 3rd ($300) beats $250, the 4th ($200) doesn\'t, so 3. At $20 they double to $1,000, $800, $600, $400, $200: the 4th ($400) now beats $250, the 5th ($200) doesn\'t, so <b>4</b>.</p>${atable(['Worker','MP','Value at $10','Value at $20','vs $250'], TO.slice(1).map(r=>[r.L, r.mp, '$'+r.mp*10, '$'+r.mp*20, r.mp*20>250?'hire':'no']), { cls:'compact', hl:{3:{row:'u3z2'}} })}<p>A higher product price raises the value of every worker\'s output, which shifts the demand for labor right (Lesson 31). The 6th worker still adds nothing.</p>`);
mc('l30-monopoly-fewer','l30','Made-up comparison. Two firms have the same workers, the same marginal products and pay the same wage. One sells in a perfectly competitive market; the other is a monopoly that must cut its price to sell more. Compared with the competitive firm, the monopoly',
  [`has a lower marginal revenue product for each extra worker, so it tends to hire fewer workers`,`hires more workers, because it charges a higher price`,`hires the same number, because the marginal products are equal`,`has a higher marginal revenue product, because its price is higher`,`does not use the hiring rule at all`],0,
  `<p>A firm that must cut its price to sell more has marginal revenue below price (Lesson 25), so each worker\'s MRP = MP × MR is below MP × price. With the same wage, it reaches MRP = wage sooner and hires fewer. This fits Lesson 26: a monopoly produces less than a competitive industry (M5).</p>`);
tf('l30-tf-pricetaker','l30','For a firm that is a price taker in its product market, the marginal revenue product of labor equals the value of the marginal product (marginal product × price).',true,
  `<p>True. A price taker sells every unit at the market price, so marginal revenue equals the price. Your course: in a competitive market "MRP = P × MPL because firms are price takers and the price also reflects marginal revenue." (M5)</p>`);
gen('l30-g-maxwage','l30',()=>{
  let mps; do { const m1 = pick([10,12,15,18,20]); mps=[m1]; while(mps.length<5) mps.push(mps[mps.length-1] - pick([2,3])); } while(mps[4] < 1);
  const P = pick([5,6,8,10,12]), k = pick([2,3,4,5]), ans = mps[k-1]*P;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A car wash charges <b>$${P}</b> per car. The marginal products of its 1st to 5th workers are <b>${mps.join(', ')}</b> cars a day. What is the <b>highest</b> daily wage at which it would still be willing to hire a <b>${ordinal(k)}</b> worker?`, answer:ans,
    explain:`<p>The firm will pay up to what the worker adds: value of MP = ${mps[k-1]} × $${P} = <b>$${ans}</b>. At any wage above that, the ${ordinal(k)} worker would cost more than he brings in. Your course calls the value of MP the "firm\'s willingness to pay for labor."</p>${atable(['Worker','MP (cars)','Value of MP'], mps.map((m,i)=>[ordinal(i+1), m, '$'+m*P]), { cls:'compact', hl:{[k-1]:{row:'u3z2'}} })}<p>The common slip is using the ${ordinal(k)} worker\'s cars without the price (${mps[k-1]}), or total cars × price.</p>` };
});
lazy('l30-movement','l30',()=>visMC({
  prompt:`Made-up scenario. A warehouse firm hires at the market wage. The market wage for warehouse workers rises, and nothing else changes for the firm. Each graph shows the firm\'s demand for labor (wage up the side, workers along the bottom). Which graph shows the change?`,
  choices: ['mv','mvUp','Dr','Dl','vert'].map(k => firmChoice(k, k==='mvUp')),
  explain: L => `<p><b>Graph ${L}</b>: a movement up along the firm\'s demand curve to fewer workers. Your course textbook: "If the wage rate increases, employers will want to hire fewer employees. The quantity of labor demanded will decrease, and there will be a movement upward along the demand curve." A shift needs a change in something other than the wage (M4).</p>${u6moveBig('The answer graph, marked up: the wage rises from W1 to W2, so the firm moves up its one demand curve from B to A, to fewer workers. The curve itself stays put.','W2','W1',true)}<p>A leftward shift is the tempting picture, but the value of each worker\'s output hasn\'t changed, only his cost.</p>` }));
mc('l30-parallel','l30','The hiring rule "hire until the marginal revenue product equals the wage" is most like which rule from Unit 5?',
  [`Produce where marginal revenue equals marginal cost`,`Produce where price equals average total cost`,`Shut down when price is below average variable cost`,`Produce where total revenue is largest`,`Set price where demand is unit elastic`],0,
  `<p>Both rules ask whether one more unit (of output, or of labor) adds more to revenue than to cost, and stop where the two are equal. The worker\'s MRP is the revenue side; his wage is the cost side. "Total revenue largest" would ignore cost, like hiring until marginal product is zero (M1).</p>`);
mc('l30-vmp-vs-tr','l30',`${toIntro()}${toTbl(['q'])}A student says the value of the 5th worker\'s marginal product is 150 × $10 = $1,500. What is the mistake?`,
  [`$1,500 is the value of all 150 toasters; the 5th worker adds only 10, worth $100`,`The price should be $100, the wage`,`The student should divide by 5 to get $300`,`There is no mistake`,`The 5th worker adds 150 toasters, but they are worth $15 each`],0,
  `${toTbl(['q','mp','vmp'],{hl:5})}<p>The value of the marginal product uses the <b>change</b> in output: 150 − 140 = 10 toasters × $10 = $100. 150 × $10 is total revenue (M2), and $1,500 ÷ 5 = $300 is revenue per worker, an average.</p>`);
mc('l30-firstworker','l30',`${toIntro()}${toTbl(['mp','vmp','mprof'])}A manager says, "The 1st worker adds the most profit, $400, so we should hire only one." Why is this wrong?`,
  [`Workers 2, 3 and 4 still add profit ($300, $200, $100); profit is highest with 4 or 5 workers`,`The 1st worker\'s marginal profit is negative`,`The firm should hire 6, because output is highest`,`Marginal profit doesn\'t matter for hiring`,`The 1st worker should be paid $500`],0,
  `${toTbl(['mprof'],{hl:1})}<p>Output value minus wages is the sum of marginal profits: $400 with one worker, $1,000 with 4 or 5. Stopping where marginal profit is largest leaves $600 behind (M3). Six workers would lose $100 on the last one (M1).</p>`);
mc('l30-oe-table','l30','A newer edition of your course textbook (OpenStax 2e, Table 14.2) gives a firm whose workers have marginal products of 4, 3, 2 and 1 units, sold at $4 each. Made-up wage: $10 per worker. How many workers does the firm hire?',
  [`2`,`1`,`3`,`4`,`0`],0,
  `<p>Values of MP: 4 × $4 = $16, 3 × $4 = $12, 2 × $4 = $8, 1 × $4 = $4. The 1st ($16) and 2nd ($12) are worth more than $10; the 3rd ($8) isn\'t. So <b>2</b>. The same rule as the toaster company: hire while the value of MP is above the wage.</p>${atable(['Worker','MP','Value of MP','vs $10'],[[1,4,'$16','hire'],[2,3,'$12','hire'],[3,2,'$8','no'],[4,1,'$4','no']],{cls:'compact',hl:{1:{row:'u3z2'}}})}<p>Choosing 4 hires everyone with positive output (M1). Choosing 1 stops at the worker with the biggest gain (M3).</p>`);
lazy('l30-gr-dmr','l30',()=>visMC({
  prompt:`Each graph puts a firm\'s total output (up) against the number of workers (across), with its machines fixed. Which graph shows <b>diminishing marginal returns</b> to labor?`,
  choices:[
    { svg:L=>u6mini({ lines:[{pts:[[0,0],[2,4.5],[4,7],[6,8.5],[8,9.3],[9.5,9.6]],c:'var(--g1)'}], xlab:'Workers', ylab:'Output', aria:'Graph '+L }), desc:'rising more and more slowly (bowed, flattening)', ok:true },
    { svg:L=>u6mini({ lines:[{a:[0,0],b:[9.5,9.5],c:'var(--g1)'}], xlab:'Workers', ylab:'Output', aria:'Graph '+L }), desc:'a straight line from the origin' },
    { svg:L=>u6mini({ lines:[{pts:[[0,0],[3,0.8],[5,2.4],[7,5],[9,8.6],[9.6,9.8]],c:'var(--g1)'}], xlab:'Workers', ylab:'Output', aria:'Graph '+L }), desc:'rising faster and faster' },
    { svg:L=>u6mini({ lines:[{a:[0,9],b:[9.5,1],c:'var(--g1)'}], xlab:'Workers', ylab:'Output', aria:'Graph '+L }), desc:'a straight line falling' },
    { svg:L=>u6mini({ lines:[{a:[0,6],b:[9.5,6],c:'var(--g1)'}], xlab:'Workers', ylab:'Output', aria:'Graph '+L }), desc:'a horizontal line' } ],
  explain: L => `<p><b>Graph ${L}</b>: output rises, but each extra worker adds less, so the curve flattens. Your course: "Output is increasing at a decreasing rate if firm increases only one input."</p>${fig(sdg({ xmax:10, ymax:10, xt:[0,2,4,6,8,10], yt:[], xlab:'Workers', ylab:'Output', aria:'Marked-up answer graph', lines:[{pts:[[0,0],[2,4.5],[4,7],[6,8.5],[8,9.3],[9.5,9.6]],c:'var(--g1)'}], spans:[{q:4.3,p1:4.5,p2:7,label:'+2.5 from workers 2→4',lx:6,anchor:'start'},{q:8.3,p1:8.5,p2:9.3,label:'+0.8 from 6→8',lx:-6,ly:-14,anchor:'end'}], hl:[{p:4.5,q:2,c:'var(--muted)'},{p:7,q:4,c:'var(--muted)'},{p:8.5,q:6,c:'var(--muted)'},{p:9.3,q:8,c:'var(--muted)'}] }), 'The answer graph, marked up: the same 2 extra workers add 2.5 units of output early on but only 0.8 later.')}<p>A straight rising line would mean every worker adds the same amount (like the simple Q = 100K + 25L example). A curve rising faster and faster means increasing returns.</p>` }));
lazy('l30-gr-mrpvmp','l30',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A firm must cut its price to sell more output. The graph shows two curves for each extra worker: one is marginal product × price, the other is marginal product × marginal revenue.${sdg({ xmax:6.5, ymax:110, xt:[0,1,2,3,4,5,6], yt:[0,20,40,60,80,100], xlab:'Workers', ylab:'Dollars per day', aria:'Two downward sloping curves, X above Y', labels:[[0.15,53.5,'Wage $50','var(--g2)','start'],[1.15,104,'X','var(--g1)','start'],[1.15,64,'Y',DC,'start']],
    lines:[ {a:[1,100],b:[6,40],c:'var(--g1)'}, {a:[1,80],b:[6,10],c:DC}, {pts:[[0,50],[6.5,50]],c:'var(--g2)'} ] })}Which curve is the firm\'s marginal revenue product, and roughly where does it stop hiring?`,
  options:[`Curve Y; it hires about 3 workers, where Y meets the wage line`,`Curve X; it hires where X meets the wage line, about 5 workers`,`Curve Y; it hires 6 workers, where Y is lowest`,`Curve X; it hires 1 worker, where X is highest`,`Either curve; a firm with market power hires where price equals the wage`], answer:0,
  explain:`<p>With market power, marginal revenue is below price, so MP × MR (curve <b>Y</b>) lies below MP × price (curve X). The firm hires until MRP equals the wage: Y crosses $50 at about 3.1 workers.</p>${fig(sdg({ xmax:6.5, ymax:110, xt:[0,1,2,3,4,5,6], yt:[0,20,40,60,80,100], xlab:'Workers', ylab:'Dollars per day', aria:'Marked-up graph',
    lines:[ {a:[1,100],b:[6,40],c:'var(--muted)',dash:'5 4',w:2}, {a:[1,80],b:[6,10],c:DC}, {pts:[[0,50],[6.5,50]],c:'var(--g2)'} ], labels:[[1.15,104,'X: MP × price','var(--muted)','start'],[1.15,64,'Y: MRP',DC,'start'],[0.15,53.5,'Wage $50','var(--g2)','start']],
    dots:[{q:3.14,p:50,label:'hire ≈ 3',c:'var(--ink)',lx:10,ly:16},{q:5.17,p:50,c:'var(--muted)'}], vls:[{q:3.14,p:50}] }), 'The question\'s graph, marked up: the firm hires where curve Y (MRP) meets the $50 wage, at about 3 workers.')}<p>Using curve X would be the price-taker shortcut (M5); it gives about 5 workers, more than this firm will hire.</p>` }));
tf('l30-tf-wagevmp','l30','For a profit-maximizing firm hiring in a perfectly competitive labor market, the market wage ends up about equal to the value of the marginal product of the last worker hired.',true,
  `<p>True. The firm keeps hiring while a worker\'s value of MP is above the wage and stops when they meet. Your course: "the Demand for Labor is going to be based on the point where the wage rate is equal to the value of the Marginal Product, reflecting the fifth worker." Earlier workers add more, but all are paid the same wage (M6).</p>`);

/* ===== Lesson 30 quick checks ===== */
mc('l30c-vmp','l30','Made-up numbers. A cook adds 12 meals an hour, and each meal sells for $9. What is the value of his marginal product per hour?',
  [`$108`,`$21`,`$12`,`$9`,`$0.75`],0,
  `<p>12 × $9 = <b>$108</b>. $21 adds instead of multiplying; $12 and $9 leave out one of the two numbers.</p>`);
mc('l30c-mprof','l30','Your course\'s toaster company: the 3rd worker\'s output is worth $300, and the wage is $100. What is his marginal profit?',
  [`$200`,`$300`,`$400`,`$100`,`−$200`],0,
  `<p>$300 − $100 = <b>$200</b>, matching the course\'s table. $400 is the 1st worker\'s, and $300 forgets to subtract the wage. Marginal profit shrinks with each worker, but stopping where it is largest is a mistake (M3).</p>`);
mc('l30c-mrp','l30','Made-up numbers. A firm with market power: hiring one more worker raises output by 5 units, and the marginal revenue of those units is $6 each, while the price is $9. What is the worker\'s marginal revenue product?',
  [`$30`,`$45`,`$15`,`$54`,`$3`],0,
  `<p>MRP = MP × MR = 5 × $6 = <b>$30</b>. 5 × $9 = $45 would be correct only for a price taker, whose MR equals the price.</p>`);
mc('l30c-rule','l30','Made-up numbers. A firm can hire all the workers it wants at $80 a day. The values of the marginal product of its 1st to 5th workers are $200, $150, $110, $70 and $40. How many should it hire?',
  [`3`,`2`,`4`,`5`,`1`],0,
  `<p>Hire while value of MP is above $80: $200, $150 and $110 yes; $70 no. So <b>3</b>. Hiring 4 or 5 adds workers whose output is worth less than they cost (M1); stopping at 1 or 2 leaves profitable workers unhired (M3).</p>`);
lazy('l30c-curve','l30',()=>visMC({
  prompt:`Made-up scenario. A restaurant can hire all the dishwashers it wants at the market wage. That wage falls, and nothing else changes for the restaurant. Each graph shows the restaurant\'s demand for dishwashers (wage up the side, dishwashers along the bottom). Which graph shows what happens?`,
  choices: ['mv','mvUp','Dr','Dl','vert'].map(k => firmChoice(k, k==='mv')),
  explain: L => `<p><b>Graph ${L}</b>: the restaurant moves down along its one demand curve. At a lower wage, more dishwashers are worth more than they cost, so it hires more. Nothing that sets the value of a dishwasher\'s work changed, so the curve stays put.</p>${u6moveBig('The answer graph, marked up: the wage falls from W1 to W2, so the restaurant moves down its demand curve from A to B and hires more dishwashers.','W1','W2',false)}<p>Shifting the curve for a wage change is the common slip (M4). Moving up the curve would need a higher wage.</p>` }));
mc('l30c-dmr','l30','Your course\'s toaster company has a fixed set of machines. Its 1st to 6th workers add 50, 40, 30, 20, 10 and 0 toasters. Why does each additional worker add less output than the one before?',
  [`The firm\'s machines are fixed, so each extra worker has less to work with (diminishing marginal returns)`,`Marginal product is output divided by the number of workers`,`The price of toasters falls`,`The wage rises with each worker`,`The firm stops hiring where output peaks, so later workers add less`],0,
  `<p>With only one input increasing, "each worker adds to production, but less and less" (slide 260). Lesson 16 showed the cause is the fixed inputs, not the workers\' effort.</p>`);
mc('l30c-skill','l30','Made-up numbers. A competitive firm sells its product at $5. A 4th worker would add 14 units a day, and the daily wage is $80. Should it hire him?',
  [`No: his output is worth $70, less than the $80 wage`,`Yes: he adds 14 units`,`Yes: he adds 14 units, more than any later worker will`,`No: the firm should hire only where marginal product is zero`,`Yes: total output rises`],0,
  `<p>Value of MP = 14 × $5 = $70 &lt; $80, so hiring him would cut profit by $10. Rising output alone isn\'t a reason to hire (M1), and adding more than later workers doesn\'t make him profitable (M3).</p>`);

/* Course materials checked 2026-11-04: video 6.1 transcript (value of MPL = MPL × price, $500, $400 ...; wage $100; marginal profit = VMP − wage, $400 ... $0; "also called the Marginal Revenue Product, or the Marginal Value Product";
   "In a competitive market ... MRP = P × MPL because the price will reflect Marginal Revenue"; demand for labor where wage = VMP at the fifth worker; "indifferent between hiring the fourth or the fifth worker"), slides 255-260
   (slide 259: "Wage of each worker = Value of output they each produce" (a slip: every worker earns $100); "Value of MPL: Firm's willingness to pay for labor"); OpenStax 2e §14.1 ("Demand for Labor = MPL x P = Value of the Marginal Product of Labor"; "MPL x MR = Marginal Revenue Product";
   Table 14.2: MPL 4,3,2,1 at $4 → $16,12,8,4; "hire workers up to the point where: Wmkt = VMPL"); course textbook §4.1 (wage change = movement along the labor demand curve), §9.2 (MR below price); CLEP outline (Marginal revenue product). */
const L30TAGS = {
  'l30-vmp-def':['MS6 OSE141','mrp','terms','M2'], 'l30-toaster-vmp':['MS6','mrp','data','M2'], 'l30-g-vmp':['MS6 OSE141','mrp','data','M2'],
  'l30-g-hire':['MS6 OSE141','lab','data','M1'], 'l30-tf-mpzero':['MS6','lab','terms','M1'], 'l30-gr-demand':['MS6 OS41','lab','graphs','M4'],
  'l30-mrp-def':['MS6 OSE141 CB','mrp','terms','M5 M2'], 'l30-g-mrp':['OSE141 OS92','mrp','data','M5'], 'l30-wagechg':['MS6 OS41','lab','data','M4 M1'],
  'l30-tie':['MS6','lab','data','M3 M1'], 'l30-gr-hire':['MS6','lab','graphs','M1 M3'], 'l30-dmr':['MS6','mrp','models','M4'],
  'l30-mprof-def':['MS6','lab','terms','M2'], 'l30-g-mprof':['MS6','lab','data',''], 'l30-total-gain':['MS6','lab','data','M3 M2'],
  'l30-tf-ownvmp':['MS6','lab','terms','M6'], 'l30-price-up':['MS6','mrp','data','M1'], 'l30-monopoly-fewer':['OSE141 OS92','mrp','models','M5'],
  'l30-tf-pricetaker':['MS6 OSE141','mrp','terms','M5'], 'l30-g-maxwage':['MS6 ELMW','mrp','data','M2'], 'l30-movement':['OS41','lab','models','M4'],
  'l30-parallel':['MS6','lab','models','M1'], 'l30-vmp-vs-tr':['MS6','mrp','data','M2'], 'l30-firstworker':['MS6','lab','data','M3 M1 M6'],
  'l30-oe-table':['OSE141','lab','data','M1 M3'], 'l30-gr-dmr':['MS6','mrp','graphs',''], 'l30-gr-mrpvmp':['OSE141','mrp','graphs','M5'], 'l30-tf-wagevmp':['MS6 OSE141','lab','terms','M6'],
  'l30c-vmp':['MS6','mrp','data','M2'], 'l30c-mprof':['MS6','lab','data','M3'], 'l30c-mrp':['OSE141','mrp','data','M5'],
  'l30c-rule':['MS6','lab','data','M1 M3'], 'l30c-curve':['OS41','lab','models','M4'], 'l30c-dmr':['MS6','mrp','terms','M1'], 'l30c-skill':['MS6','lab','models','M1']
};
u6tag(L30TAGS);

U6_CARDS.l30 = [
  ['Value of the marginal product (VMP)','What is the value of the marginal product of labor?','The dollar value of one more worker\'s extra output: marginal product × price of the output.','Toaster company: the 3rd worker adds 30 toasters × $10 = $300.','Use the change in output, not total output × price.'],
  ['Marginal profit of a worker','How do you calculate a worker\'s marginal profit?','Value of the marginal product minus the wage.','Toaster company: 1st worker $500 − $100 = $400; 5th worker $100 − $100 = $0.','Keep hiring while it is positive, not only where it is largest.', `<div class="qg">${ubars(TO.slice(1).map(r=>r.mprof), { labels:['1','2','3','4','5','6'], ylab:'$', xlab:'Worker', fmtv:v=>v<0?'−'+Math.abs(v):v, colorOf:v=> v>0 ? 'var(--ok)' : v<0 ? 'var(--bad)' : 'var(--g2)' })}</div>`],
  ['Marginal revenue product (MRP)','What is the marginal revenue product of labor?','The extra revenue from one more worker: marginal product × marginal revenue.','A worker adds 5 units with MR $6 each: MRP = $30.','It equals MP × price only for a price taker.'],
  ['MRP for a price taker','When does MRP equal the value of the marginal product?','When the firm is a price taker in its product market, so marginal revenue equals the price.','Toaster company: MR = $10 = price, so MRP = VMP = $300 for the 3rd worker.','Your course uses the two names for the same thing because it assumes competition.'],
  ['MRP with market power','Why is MRP below MP × price for a monopoly?','To sell more it must cut its price on every unit, so marginal revenue is below the price.','Made-up bakery: MP 10 cakes; MRP $60 but MP × price $100.','So, at the same wage, it hires fewer workers.', FIG6.l30mrpgraph()],
  ['The hiring rule','How many workers does a profit-maximizing firm hire?','Keep hiring while a worker\'s MRP (value of MP) is above the wage; stop where they are equal.','Toaster company at $100: hire 5 (the 5th is worth $100).','Not until marginal product is zero: workers cost money.', FIG6.l30rule()],
  ['A tie at the hiring point','What happens when the last worker\'s value exactly equals the wage?','He adds $0 of profit, so the firm is indifferent; your course names that worker as the stopping point.','Toaster company: indifferent between 4 and 5 workers.','Output value minus wages is still $1,000 there; only marginal profit is zero.'],
  ['Labor demand curve','What is a competitive firm\'s demand curve for labor?','Its value of the marginal product (MRP) curve: at each wage it hires up to the worker whose value equals the wage.','Toaster company: $250 → 3 workers; $150 → 4.','The wage itself moves you along the curve; it doesn\'t shift it.', u6mini({ lines:[{a:[1,9],b:[9,1],c:DC,label:'D',lx:2,ly:-2}], aria:'A labor demand curve sloping down' })],
  ['Why labor demand slopes down','Why does a firm hire more workers only at a lower wage?','Diminishing marginal returns: with capital fixed, each extra worker adds less output, so his output is worth less.','Toaster MPs 50, 40, 30 → values $500, $400, $300.','It is not because later workers are less skilled.', FIG6.l30demand()],
  ['Wage change','What does a fall in the wage do on the labor demand graph?','A movement down along the demand curve: the firm hires more.','Toaster company: wage $250 → $150, workers 3 → 4.','A shift needs something other than the wage to change.', u6firm('mv','A movement down along one firm\'s labor demand curve')],
  ['Who gets paid what','Is each worker paid the value of what he himself produces?','No. All are paid the market wage, which equals the value of the marginal product of the last worker hired.','Toaster company: all 5 earn $100, though the 1st adds $500 of toasters.','One course slide words this loosely; its own table pays everyone $100.'],
  ['Hiring rule = MR = MC','How is the hiring rule like Unit 5\'s MR = MC rule?','Both add one more unit while it brings in more revenue than it costs: MRP vs the wage, MR vs MC.','A worker worth $300 who costs $100 is like a unit with MR $10 and MC $4.','Lesson 32 adds marginal factor cost for the cost side.']
];

Object.assign(U6_WRITE, {
  'w-l30-1':{lesson:'l30',prompt:'Using your course\'s toaster company (toasters sell for $10; workers cost $100 a day; marginal products 50, 40, 30, 20, 10, 0), explain how the firm decides how many workers to hire. Show the numbers and say why it stops where it does.',
    model:'The firm turns each worker\'s marginal product into dollars by multiplying by the $10 price: the values are $500, $400, $300, $200, $100 and $0. Each worker costs $100, so his marginal profit is his value minus $100: $400, $300, $200, $100, $0 and −$100. The firm hires every worker whose value is above the wage, because each one adds to profit. The 5th worker\'s value of $100 just equals the wage, so he adds nothing and the firm is indifferent between 4 and 5 workers; it will not hire a 6th, who would lose $100. So the firm hires up to the point where the value of the marginal product equals the wage: 5 workers.',
    checklist:['Computes the value of the marginal product (MP × $10) for the workers','Compares each value with the $100 wage (or computes marginal profit)','States the rule: hire while value of MP exceeds the wage, stop where they are equal','Names 5 workers (indifferent between 4 and 5) and explains why the 6th isn\'t hired']},
  'w-l30-2':{lesson:'l30',prompt:'Explain why a competitive firm\'s demand curve for labor slopes downward, and what happens on that graph when the wage falls. Use diminishing marginal returns in your answer.',
    model:'A firm\'s demand curve for labor is its value of the marginal product curve: at each wage it hires up to the worker whose output is worth that wage. In the short run the firm\'s capital is fixed, so each extra worker has less equipment to work with and adds less output than the one before (diminishing marginal returns). With the output price constant, each extra worker\'s output is therefore worth less, so the value of the marginal product falls as more are hired. That means the firm will hire more workers only if the wage is lower, which is why the curve slopes down. If the wage falls, the next worker becomes worth hiring, so the firm moves down along the same demand curve to more workers; the curve itself does not shift.',
    checklist:['Identifies the labor demand curve with the value of the marginal product (MRP) curve','Explains diminishing marginal returns with a fixed input','Links falling marginal product to falling value of MP, hence a downward slope','States that a lower wage is a movement down along the curve (more workers), not a shift']}
});

U6_PLAN.l30 = {
  core:['l30-vmp-def','l30-toaster-vmp','l30-g-vmp','l30-g-hire','l30-tf-mpzero','l30-gr-demand','l30-mrp-def','l30-g-mrp','l30-wagechg','l30-tie','l30-gr-hire','l30-dmr'],
  more:['l30-mprof-def','l30-g-mprof','l30-total-gain','l30-tf-ownvmp','l30-price-up','l30-monopoly-fewer','l30-tf-pricetaker','l30-g-maxwage','l30-movement','l30-parallel','l30-vmp-vs-tr','l30-firstworker','l30-oe-table','l30-gr-dmr','l30-gr-mrpvmp','l30-tf-wagevmp']
};

U6_LESSONS.push({ id:'l30', unit:6, title:'Marginal Revenue Product and the Hiring Rule', mins:40, src:'Modern States video 6.1 (middle part) and Module 6 slides 255-260 · Course textbook (OpenStax) §4.1 and §9.2',
  sources:['MS6','OS41','OS92','OSE141','CB','ELMW'],
  oneline:'A firm values each worker by the revenue his extra output brings in: marginal product × price, or × marginal revenue. It hires while that value beats the wage, and that value curve is its labor demand.',
  body:`
<p>Lesson 29 measured each worker by how many extra toasters he makes. A firm, though, pays wages in dollars. This lesson turns the extra toasters into dollars and applies Lesson 21\'s idea to the decision of how many people to hire. That idea is the ${dt('mr-mc','MR = MC rule')}: keep going while the gain beats the cost.</p>

<h2>The value of the marginal product</h2>
<!-- src: MS6 (video 6.1: "when we look at the value of the Marginal Product of Labor, we want to multiply the Marginal Product of Labor ... by the price of the good. What this is telling us, is it's giving us a dollar figure for the contributions that the additional worker adds to the firm"; $500, $400, $300, $200, $100; slide 255); OSE141 ("Demand for Labor = MPL x P = Value of the Marginal Product of Labor") -->
<p>Your course multiplies the ${dt('marginal-product','marginal product')} of labor by the price of the good, which gives "a dollar figure for the contributions that the additional worker adds to the firm." This is the ${dt('vmp','<b>value of the marginal product</b>')} (VMP).</p>
<div class="math">Value of the marginal product = marginal product of labor × price of the output</div>
<p><b>Worked example: your course\'s toaster company</b> (toasters $10, workers $100 a day).</p>
${FIG6.l30vmp()}
<p>Check: the 1st worker\'s 50 toasters × $10 = $500, the course\'s figure. <b>Why it matters:</b> the firm can now compare each worker\'s contribution with his wage, dollars with dollars.</p>
<div data-check="l30c-vmp"></div>

<h2>Comparing value with the wage: marginal profit</h2>
<!-- src: MS6 (video 6.1: "when we look at the comparison between the value that each worker contributes to the firm, and the cost of hiring that additional worker, we can calculate the Marginal Profit. So we simply take the value of Marginal Product minus the wage"; $400, $300, $200, $100, nothing; "for the fifth worker ... the value that he brings to the firm is exactly equal to the cost to the firm of hiring that fifth worker"; slides 256-257) -->
<p>Each worker also costs the firm his wage. Your course: "we simply take the value of Marginal Product minus the wage and that\'ll give us the ${dt('marginal-profit','Marginal Profit')}."</p>
<div class="math">1st worker: $500 − $100 = <b>$400</b><br>3rd worker: $300 − $100 = <b>$200</b><br>5th worker: $100 − $100 = <b>$0</b><br>6th worker: $0 − $100 = <b>−$100</b></div>
<p>As bars, one per worker: green bars add profit, and the 6th worker\'s bar falls below zero.</p>
${FIG6.l30mprof()}
<p><b>Why it decides hiring:</b> a worker with positive marginal profit raises the firm\'s total profit; one with negative marginal profit lowers it. Sense check: adding the first five, $400 + $300 + $200 + $100 + $0 = $1,000, the same as 150 toasters × $10 − 5 × $100.</p>
<div data-check="l30c-mprof"></div>

<h2>Marginal revenue product</h2>
<!-- src: MS6 (video 6.1: "In some ways, in some textbooks, this is also called the Marginal Revenue Product, or the Marginal Value Product. In a competitive market where firms are price takers, the Marginal Revenue Product is going to be equal to the price times the Marginal Product of Labor because the price will reflect Marginal Revenue"; slide 258: "In competitive markets MRP = P * MPL because firms are price takers and the price also reflects marginal revenue"); OSE141 ("The Demand for Labor = MPL x MR = Marginal Revenue Product"; firms with market power hire "up to the point where the market wage equals the marginal revenue product"); OS92 (HealthPill: MR below price); CB (outline: "Marginal revenue product") -->
<p>The CLEP outline calls this idea the ${dt('mrp','<b>marginal revenue product</b>')} (MRP): the extra revenue one more worker brings in. In general it is marginal product × ${dt('marginal-revenue','marginal revenue')}. Your course: for ${dt('price-taker','price takers')}, "the Marginal Revenue Product is going to be equal to the price times the Marginal Product of Labor because the price will reflect Marginal Revenue."</p>
<div class="math">MRP = marginal product × marginal revenue<br>Price taker: MR = price, so MRP = marginal product × price = value of the marginal product</div>
<p>The two cards compare a price taker with a firm that must cut its price to sell more.</p>
${FIG6.l30mrp()}
<p><b>Why the two can differ:</b> Lesson 25 showed that a firm with ${dt('market-power','market power')}, such as a ${dt('monopoly','monopoly')}, must cut its price to sell more. It has marginal revenue below the price. The price cut applies to every unit it sells. The newer edition of your textbook (OpenStax 2e) writes labor demand for such a firm as "MPL x MR = Marginal Revenue Product."</p>
<p>Here are the two curves for a made-up firm with market power, with a $50 wage line. Watch where each curve meets the wage.</p>
${FIG6.l30mrpgraph()}
<p><b>So what:</b> at the same wage, a firm with market power stops hiring sooner. For a price taker, which is what your course and most of this unit assume, the two names mean the same number.</p>
<div data-check="l30c-mrp"></div>

<h2>The hiring rule</h2>
<!-- src: MS6 (video 6.1: "the Demand for Labor is going to be based on the point where the wage rate is equal to the value of the Marginal Product, reflecting the fifth worker"; "At this point, remember, Marginal Profit is equal to zero"; "the firm is not going to want to hire any more than the fifth worker, and the firm will be indifferent between hiring the fourth or the fifth worker"; slide 259: "Wage = Value of MPL"; "Value of MPL: Firm's willingness to pay for labor"); OSE141 ("Given the market wage, profit maximizing firms hire workers up to the point where: Wmkt = VMPL"); ELMW (Gorman) -->
<p>Put the pieces together and you get the ${dt('hiring-rule','<b>hiring rule</b>')}. Hire every worker whose MRP (value of MP) is above the wage, and stop where the two are equal. Your course: the firm hires up to "the point where the wage rate is equal to the value of the Marginal Product, reflecting the fifth worker."</p>
${FIG6.l30rule()}
<p><b>Worked example: the toaster company at a $100 wage.</b></p>
<div class="math">Workers 1-4: value $500, $400, $300, $200, each above $100 → hire<br>Worker 5: value $100 = wage $100 → marginal profit $0<br>Worker 6: value $0 &lt; $100 → don\'t hire<br>Answer: <b>5 workers</b> (profit is the same with 4)</div>
<p>Your course: the firm "will be indifferent between hiring the fourth or the fifth worker" and doesn\'t want "any more than the fifth." When a table ties like this, the rule names the worker whose value equals the wage, as Lesson 21 named the larger output.</p>
<p>Line the rule up beside Lesson 21\'s MR = MC rule and the two match row for row.</p>
${FIG6.l30parallel()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of a farm stand owner deciding whether to hire one more teenager for Saturday. She asks one question: will this person sell enough extra produce to cover his pay? If yes, hire. When the answer becomes "just barely," stop. She doesn\'t need to know the whole season\'s numbers, only what the next person adds and costs.</p></div>
<p><b>So what:</b> slide 259 calls the value of MP the "firm\'s willingness to pay for labor." Econlib\'s Gorman says it from the other side. Employers "typically are not willing to pay a worker more than the value of the additional product that he produces." One slide line reads "Wage of each worker = Value of output they each produce," but the course\'s own table pays all five workers $100. The wage equals the value of the <b>last</b> worker\'s output, not each worker\'s.</p>
<div data-check="l30c-rule"></div>

<h2>The demand curve for labor</h2>
<!-- src: MS6 (slide 259: the "Demand by Firms" line drawn through the value-of-MPL points, with the "Market Wage Rate $100"); OS41 ("If the wage rate increases, employers will want to hire fewer employees. The quantity of labor demanded will decrease, and there will be a movement upward along the demand curve"); OSE141 -->
<p>Repeat the rule at every possible wage and you trace out the firm\'s ${dt('labor-demand','demand curve for labor')}: its value-of-MP (MRP) curve. Slide 259 labels that line "Demand by Firms."</p>
<p><b>Worked example (made-up wages):</b></p>
<div class="math">Wage $450: hire 1 (2nd worker worth $400)<br>Wage $250: hire 3 (3rd worth $300, 4th $200)<br>Wage $150: hire 4 (4th worth $200, 5th $100)</div>
${FIG6.l30demand()}
<p><b>Why it is a movement, not a shift:</b> the workers\' values didn\'t change, only the wage they are compared with. The textbook: when the wage rises, "there will be a movement upward along the demand curve." Change the toaster price and every value changes; that shifts the curve (Lesson 31).</p>
<p>Set the wage and the toaster price below and watch the hiring decision.</p>
<div data-widget="hire"></div>
<p>What to notice: moving the wage slides the hiring point along the same dots. Moving the price stretches every dot up or down, which is a shift.</p>
<div data-check="l30c-curve"></div>

<h2>Why the curve slopes down: diminishing marginal returns</h2>
<!-- src: MS6 (slide 260: "Diminishing Marginal Returns to Labor. Output is increasing at a decreasing rate if firm increases only one input. Each worker adds to production, but less and less"; MPL 50 ... 0 with the production function graph); Lesson 16 (dim-returns) -->
<p>Your course\'s slide 260: "Output is increasing at a decreasing rate if firm increases only one input. Each worker adds to production, but less and less." This is Lesson 16\'s ${dt('dim-returns','diminishing marginal returns')}.</p>
${FIG6.l30dmr()}
<p><b>So what:</b> because each worker adds less, the value of each extra worker falls, and the firm hires more only at a lower wage. A downward-sloping labor demand curve is diminishing returns in dollar form.</p>
<div data-check="l30c-dmr"></div>

<h2>How many workers? Reading the table</h2>
<!-- src: MS6; OSE141 (Table 14.2). Exam skill: convert marginal product to dollars, then compare with the wage. -->
<p>CLEP questions often give an output table, a price and a wage. The move: (1) marginal product = change in output; (2) multiply by the price (or marginal revenue); (3) hire while that value is above the wage. Fill in the table below to practice.</p>
<div data-widget="vmpfill"></div>
<p>What to notice: the cutoff comes from comparing dollars with dollars. Comparing units of output with the wage, or stopping where output peaks, gives the wrong answer.</p>
<div data-check="l30c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L30TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"Hire until the last worker\'s marginal product is zero."</span>That maximizes output. Workers cost money: stop where the value of the last worker\'s output equals the wage.</li>
<li><span class="wrong">"The value of the marginal product is total output × price."</span>That is ${dt('total-revenue','total revenue')}. Use the change in output: the 5th toaster worker adds 10 toasters, worth $100.</li>
<li><span class="wrong">"Stop at the worker with the largest marginal profit."</span>Later workers still add profit, just less. Keep hiring until marginal profit reaches zero.</li>
<li><span class="wrong">"A higher wage shifts the demand for labor to the left."</span>A wage change is a movement along the curve. Shifts come from other changes, such as the product\'s price.</li>
<li><span class="wrong">"MRP always equals marginal product × price."</span>Only for a price taker. A firm that must cut its price to sell more has MR below price, so its MRP is smaller.</li>
<li><span class="wrong">"Each worker is paid the value of what he himself produces."</span>All are paid the market wage, which equals the value of the last worker\'s output.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>The <b>value of the marginal product</b> = marginal product × price: the toaster workers are worth $500, $400, $300, $200, $100 and $0.</li>
<li>A worker\'s <b>marginal profit</b> = value of MP − wage; it is positive for the first four toaster workers and zero for the 5th.</li>
<li>The <b>marginal revenue product</b> = marginal product × marginal revenue; it equals the value of MP for a price taker and is smaller for a firm with market power.</li>
<li>The <b>hiring rule</b>: hire while MRP is above the wage and stop where they are equal (5 toaster workers at $100).</li>
<li>The firm\'s <b>demand curve for labor</b> is its MRP curve; a change in the wage moves along it.</li>
<li>It slopes down because of <b>diminishing marginal returns</b>: each extra worker adds less output. On the exam: change in output → × price (or MR) → compare with the wage.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Marginal revenue product" and "Labor market and firms\' hiring of labor" under Factor Markets. Expect a table of workers and output, with a price and a wage, asking how many workers a firm hires. Or expect a question on why labor demand slopes down, or on what MRP means.</p>
</div>`,
  deeper:`
<h3>Two names, one idea</h3>
<p>Your course says the value of the marginal product is "in some textbooks ... also called the Marginal Revenue Product, or the Marginal Value Product." Many textbooks keep the names apart: value of the marginal product for MP × price, and marginal revenue product for MP × MR. They are the same number whenever the firm sells at a fixed market price.</p>
<h3>The least-cost rule again</h3>
<p>Lesson 19 used the same marginal products another way: to make a given output at the lowest cost, a firm balances marginal product per dollar across inputs (MP of labor ÷ wage = MP of capital ÷ price of capital). The hiring rule here answers a different question: how much labor to use at all.</p>
<h3>Other inputs follow the same rule</h3>
<p>A firm rents machines up to the point where one more machine\'s extra revenue equals its rent, just as it hires workers. Your course\'s slide 263 notes that the firm "pays rent for capital or wages for workers to use them in production."</p>`,
  links:[ {k:'Textbook',t:'14.1 The Theory of Labor Markets',s:'OpenStax, Principles of Microeconomics 2e (a newer edition)',u:'https://openstax.org/books/principles-microeconomics-2e/pages/14-1-the-theory-of-labor-markets',w:'Value of the marginal product and marginal revenue product with a worked table; this chapter is not in your 2016 edition.'},
          {k:'Article',t:'Minimum Wages',s:'Econlib (Linda Gorman)',u:'https://www.econlib.org/library/Enc/MinimumWages.html',w:'A short encyclopedia entry that starts from the idea that employers won\'t pay more than the value of a worker\'s extra output.'} ]
});

u6xv({
  'l30-tf-mpzero':[FIG6.l30mprof(), ''],
  'l30c-skill':[atable(['4th worker','Units','Price','Value of MP','Wage'],[['',14,'$5','$70','$80']],{cls:'compact'}), ''],
  'l30-vmp-def':[FIG6.l30vmp(), '"The marginal product ÷ the wage" mixes the benefit with the cost; the value of MP is only the benefit side.'],
  'l30-mrp-def':[FIG6.l30mrp(), ''], 'l30-tf-pricetaker':[FIG6.l30mrp(), ''], 'l30-dmr':[FIG6.l30dmr(), ''], 'l30c-dmr':[FIG6.l30dmr(), ''],
  'l30-mprof-def':[FIG6.l30mprof(), ''], 'l30-parallel':[FIG6.l30parallel(), ''], 'l30-tf-wagevmp':[FIG6.l30rule(), ''],
  'l30-tf-ownvmp':[toTbl(['mp','vmp','w']), ''],
  'l30c-vmp':[atable(['','Meals an hour','Price','Value of MP'],[['The cook',12,'$9','$108']],{cls:'compact'}), ''],
  'l30c-mprof':[toTbl(['vmp','w','mprof'],{hl:3}), ''],
  'l30c-mrp':[atable(['','Extra units','× per unit','= dollars'],[['MRP (market power)',5,'MR $6','$30'],['MP × price',5,'$9','$45']],{cls:'compact',hl:{0:{row:'u3z2'}}}), ''],
  'l30-monopoly-fewer':[FIG6.l30mrpgraph(), 'Equal marginal products don\'t mean equal MRP: the monopoly\'s extra units bring in only MR, which is below price, so each worker is worth less to it.'],
  'l30c-rule':[atable(['Worker','Value of MP','vs $80 wage'],[[1,'$200','hire'],[2,'$150','hire'],[3,'$110','hire'],[4,'$70','no'],[5,'$40','no']],{cls:'compact',hl:{2:{row:'u3z2'}}}), ''],
  });
u6cv('l30', { 'A tie at the hiring point': FIG6.l30rule(), 'Who gets paid what': toTbl(['mp','vmp','w']), 'Value of the marginal product (VMP)': FIG6.l30vmp(), 'Marginal revenue product (MRP)': FIG6.l30mrp(), 'MRP for a price taker': FIG6.l30mrp(), 'Hiring rule = MR = MC': FIG6.l30parallel(), 'Why labor demand slopes down': FIG6.l30dmr() });
