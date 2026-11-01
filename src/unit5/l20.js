/* ===== Unit 5 lesson figures (static). Numbers come from the course (Modern States 5.1-5.5 / Module 5 slides), the course textbook,
   or made-up examples that the caption labels as made-up. Colors: revenue/profit = accent (green), explicit cost = g1 (blue),
   implicit cost = g2 (amber), loss = bad (red). ===== */

/* waterfall bars: steps [{label, from, to, c, text}] in dollars; one row each, floating between from and to */
function wfall(steps, { min=0, max, w=360, left=150, fmtv=v=>usd(v), aria='Waterfall chart' }={}){
  const rh=26, top=6, right=w-70, X=v=>left+(right-left)*(v-min)/(max-min), yb=top+steps.length*rh+2;
  let s=`<svg class="u2bars" viewBox="0 0 ${w} ${yb+22}" role="img" aria-label="${esc(aria)}">`;
  if(min<0) s+=`<line x1="${X(0).toFixed(1)}" x2="${X(0).toFixed(1)}" y1="${top}" y2="${yb}" stroke="var(--muted)" stroke-width="1.2" stroke-dasharray="3 3"/>`;
  steps.forEach((st,i)=>{ const y=top+i*rh, a=Math.min(st.from,st.to), b=Math.max(st.from,st.to);
    s+=`<text x="${left-6}" y="${y+16}" text-anchor="end" class="lbl-ink" style="font-weight:${st.bold?700:500}">${st.label}</text>`;
    s+=`<rect x="${X(a).toFixed(1)}" y="${y+5}" width="${Math.max(1,X(b)-X(a)).toFixed(1)}" height="${rh-10}" rx="3" fill="${st.c}" opacity=".85"/>`;
    s+=`<text x="${(X(b)+4).toFixed(1)}" y="${y+16}" class="lbl-ink halo">${st.text||fmtv(st.to-st.from)}</text>`; });
  s+=`<line x1="${left}" x2="${right}" y1="${yb}" y2="${yb}" class="ax"/>`;
  [0,max].forEach(v=>{ s+=`<text x="${X(v).toFixed(1)}" y="${yb+14}" text-anchor="middle" class="lbl">${fmtv(v)}</text>`; });
  return s+'</svg>';
}

/* L20 V1: the profit goal, with economic costs (course slides 181-183) */
FIG5.l20goal = () => fig(`<div class="u4io u5io">
  <div class="u3step"><b>Total revenue</b><br>price × quantity</div><div class="u3arrow" aria-hidden="true">−</div>
  <div class="u3step u3amb"><b>Total economic cost</b><br>explicit costs + implicit costs</div><div class="u3arrow" aria-hidden="true">=</div>
  <div class="u3step u3end"><b>Economic profit</b></div></div>`,
  'Your course: "All firms have one goal in mind: MAX PROFITS," either by raising total revenue or by keeping total cost down. Lesson 17 built the cost box out of fixed and variable costs. This lesson asks what belongs in it: an economist counts every cost, including the ones nobody writes a check for.');

/* L20 V2: explicit versus implicit costs (course slide 183; textbook §7.1) */
FIG5.l20costs = () => { const W_=340, H=262;
  const box=(x,y,w,h,t1,t2,c,dash)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="var(--surface-2)" stroke="${c}" stroke-width="1.6"${dash?' stroke-dasharray="5 4"':''}/><text x="${x+w/2}" y="${y+(t2?17:25)}" text-anchor="middle" class="lbl-ink">${t1}</text>${t2?`<text x="${x+w/2}" y="${y+33}" text-anchor="middle" class="lbl">${t2}</text>`:''}`;
  const arr=(x1,y1,x2,y2,c,dash)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="2"${dash?' stroke-dasharray="5 4"':''} marker-end="url(#u5ar-${c==='var(--g1)'?'b':'a'})"/>`;
  let g=`<svg class="u2bars" viewBox="0 0 ${W_} ${H}" role="img" aria-label="An owner's shop paying explicit costs out to workers, a landlord and a bank, and giving up implicit costs: a salary elsewhere, rent on her own building and interest on her savings">`;
  g+=`<defs><marker id="u5ar-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--g1)"/></marker><marker id="u5ar-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--g2)"/></marker></defs>`;
  g+=box(105,4,130,38,'The owner\'s shop','','var(--ink)');
  g+=arr(150,42,88,66,'var(--g1)'); g+=arr(190,42,252,66,'var(--g2)',true);
  g+=`<text x="85" y="84" text-anchor="middle" class="lbl-ink" style="fill:var(--g1)">Explicit costs</text><text x="85" y="99" text-anchor="middle" class="lbl" style="fill:var(--g1)">money paid out</text><text x="255" y="84" text-anchor="middle" class="lbl-ink" style="fill:var(--g2)">Implicit costs</text><text x="255" y="99" text-anchor="middle" class="lbl" style="fill:var(--g2)">value given up</text>`;
  [['Workers','wages paid'],['Landlord','rent paid'],['Bank','interest paid']].forEach(([t,u],i)=>{ g+=box(8,108+i*50,154,42,t,u,'var(--g1)'); });
  [['Job elsewhere','salary skipped'],['Her own building','rent not collected'],['Her savings','interest not earned']].forEach(([t,u],i)=>{ g+=box(178,108+i*50,154,42,t,u,'var(--g2)',true); });
  return fig(g+'</svg>', 'Illustration (no numbers). Left, solid borders: explicit costs, a check is written, money that leaves the business to pay someone. Your course calls them "financial costs"; your course textbook, "out-of-pocket costs, that is, payments that are actually made." Right, dashed borders: implicit costs, no check is written but the owner gives something up by using her own time, building and savings in the shop. Your course calls them "opportunity costs"; your course textbook, "the opportunity cost of using resources already owned by the firm." The test: does money leave the business to pay someone?'); };
/* L20 V3: Caroline's two ways to raise $300,000 (course video 5.1, slides 183-186) */
FIG5.l20caroline = () => { const W_=340, left=96, right=W_-70, rh=34, top=8, max=330000, X=v=>left+(right-left)*v/max;
  const rows=[['Choice A',300000,15000],['Choice B',310000,5000]];
  let s=`<svg class="u2bars" viewBox="0 0 ${W_} ${top+rows.length*rh+52}" role="img" aria-label="Stacked bars of explicit and implicit cost for Caroline's two choices">`;
  rows.forEach(([lab,ex,im],i)=>{ const y=top+i*rh;
    s+=`<text x="${left-6}" y="${y+18}" text-anchor="end" class="lbl-ink" style="font-weight:600">${lab}</text><rect x="${left}" y="${y+6}" width="${(X(ex)-left).toFixed(1)}" height="${rh-14}" fill="var(--g1)" opacity=".8"/><rect x="${X(ex).toFixed(1)}" y="${y+6}" width="${(X(ex+im)-X(ex)).toFixed(1)}" height="${rh-14}" fill="var(--g2)" opacity=".9"/><text x="${(X(ex+im)+4).toFixed(1)}" y="${y+18}" class="lbl-ink halo">$315,000</text>`; });
  const yb=top+rows.length*rh+2; s+=`<line x1="${left}" x2="${right}" y1="${yb}" y2="${yb}" class="ax"/>`;
  s+=`<rect x="${left}" y="${yb+12}" width="12" height="10" fill="var(--g1)" opacity=".8"/><text x="${left+16}" y="${yb+21}" class="lbl">explicit (money paid)</text><rect x="${left}" y="${yb+28}" width="12" height="10" fill="var(--g2)" opacity=".9"/><text x="${left+16}" y="${yb+37}" class="lbl">implicit (interest given up)</text>`;
  return fig(s+'</svg>', 'Your course\'s numbers. Choice A: $300,000 explicit + $15,000 implicit. Choice B: $310,000 explicit + $5,000 implicit. The blue part (what an accountant counts) differs by $10,000; the whole bar (what an economist counts) is $315,000 either way.'); };

/* L20 V5: Fred's law practice, from revenue to economic profit (textbook §7.1 Work it Out) */
FIG5.l20fred = () => fig(wfall([
  { label:'Revenue', from:0, to:200000, c:'var(--accent)', text:'$200,000', bold:true },
  { label:'− explicit costs', from:200000, to:115000, c:'var(--g1)', text:'−$85,000' },
  { label:'= accounting profit', from:0, to:115000, c:'var(--accent)', text:'$115,000', bold:true },
  { label:'− implicit cost', from:115000, to:-10000, c:'var(--g2)', text:'−$125,000' },
  { label:'= economic profit', from:0, to:-10000, c:'var(--bad)', text:'−$10,000', bold:true }
], { min:-25000, max:200000, w:360, left:118, aria:'Waterfall from Fred\'s revenue to his accounting profit and economic profit' }),
  'Your course textbook\'s Fred, who would leave a $125,000 law-firm job to open his own practice. Blue: explicit costs (office $50,000 + clerk $35,000). Amber: the $125,000 salary he gives up. Subtract only the money he pays out and he looks $115,000 ahead. Subtract the salary he gives up too and he is $10,000 behind: an economic loss. Both numbers are correct; they answer different questions.');

/* L20 V6: the accountant's lens and the economist's lens (textbook §7.1; course video 5.1) */
FIG5.l20lens = () => fig(atable(['Item (Fred, textbook)','Accountant counts it?','Economist counts it?'], [
  ['Office rent $50,000 (paid)','Yes','Yes'], ['Law clerk $35,000 (paid)','Yes','Yes'], ['Salary he gives up, $125,000','<b>No</b>','<b>Yes</b>'], ['Extra leisure hours he gives up','<b>No</b>','<b>Yes</b> (if he values them)'],
  ['Profit on $200,000 revenue','<b>$115,000</b>','<b>−$10,000</b>'] ], { hl:{2:{row:'u3z2'},3:{row:'u3z2'},4:{row:'u3z1'}}, cls:'compact wrap' }),
  'Same business, two lenses. The highlighted rows are the implicit costs: only the economist subtracts them. Your course: an accountant "would say that her cost would be only her explicit costs." The textbook: the business pays taxes on its accounting profit, but "whether or not it is economically successful depends on its economic profit."');

/* L20 V7: economic profit as a signal (CLEP outline: normal profit; textbook §10.1 and §11.3; Econlib, Thurow) */
FIG5.l20normal = () => fig(`<div class="u3split">
  <div class="u3col"><div class="u3step u3down"><b>Economic profit &lt; 0</b></div><div class="u3arrow" aria-hidden="true">↓</div><div class="u3step">Accounting profit is <b>below</b> what the owner\'s resources could earn elsewhere.</div><div class="u3arrow" aria-hidden="true">↓</div><div class="u3step">In the long run, resources <b>leave</b> (exit).</div></div>
  <div class="u3col"><div class="u3step u3amb"><b>Economic profit = 0: normal profit</b></div><div class="u3arrow" aria-hidden="true">↓</div><div class="u3step">Accounting profit <b>equals</b> the implicit costs: the owner earns exactly her next best option.</div><div class="u3arrow" aria-hidden="true">↓</div><div class="u3step u3end">No reason to <b>enter or leave</b>.</div></div>
  <div class="u3col"><div class="u3step u3up"><b>Economic profit &gt; 0</b></div><div class="u3arrow" aria-hidden="true">↓</div><div class="u3step">Accounting profit is <b>above</b> what the resources could earn elsewhere.</div><div class="u3arrow" aria-hidden="true">↓</div><div class="u3step">Other investors want in (entry).</div></div></div>`,
  'Read across the three cases. Normal profit is the middle one: a positive accounting profit that just pays the owner for her time, money and building. Econlib\'s Thurow: "When profits are above the normal level, they attract additional investment."');

/* ===== Lesson 20: Economic Profit: Explicit and Implicit Costs (Modern States video 5.1, first part; Module 5 slides 180-186) =====
   Common mistakes: M1 implicit costs aren't real costs · M2 accounting profit and economic profit are the same
   M3 zero economic profit means the owner earns nothing · M4 borrowing costs more than using your own savings
   M5 positive accounting profit means the business is a good use of resources · M6 normal profit is the industry's average profit */
const fredTbl = () => atable(['Fred\'s practice (textbook)','Per year'], [['Expected revenue','$200,000'],['Office rent (paid)','$50,000'],['Law clerk\'s salary (paid)','$35,000'],['Salary at his current firm (given up)','$125,000']], { cls:'compact wrap' });
const carTbl = () => atable(['','Choice A','Choice B'], [['Own savings used','$300,000','$100,000'],['Bank loan at 5%','$0','$200,000']], { cls:'compact' });

mc('l20-def-imp','l20','Made-up example. Dana quits a $60,000-a-year job to run her own bakery, which she opens in a building she already owns. Which of the following is an <b>implicit</b> cost of the bakery?',
  [`The $60,000 salary Dana gives up`,`The wages Dana pays her two assistants`,`The flour and butter Dana buys`,`Interest Dana pays on a loan for an oven`,`The electricity bill Dana pays each month`],0,
  `<p>An implicit cost is the opportunity cost of using something the owner already has. Dana\'s own time could earn $60,000 elsewhere; giving that up is an implicit cost. Your course textbook\'s example is the same: "working in the business while not getting a formal salary."</p><p>The wages, flour, loan interest and electricity are all paid out in money: explicit costs. The trap is thinking only paid costs are real (M1).</p>`);
gen('l20-g-acc','l20',()=>{
  const rev = pick([120,150,180,240,300])*1000, rent = pick([20,24,30,36])*1000, wages = pick([30,40,45,50,60])*1000, supplies = pick([10,12,15,18])*1000, own = pick([40,50,55,60,70])*1000;
  const ans = rev - rent - wages - supplies;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers for a year at a small print shop:${atable(['Item','Amount'],[['Revenue',usd(rev)],['Rent paid',usd(rent)],['Wages paid to staff',usd(wages)],['Paper and ink bought',usd(supplies)],['Salary the owner could earn at another job',usd(own)]],{cls:'compact wrap'})}What is the shop\'s <b>accounting</b> profit?`, answer:ans,
    explain:`<p>Accounting profit = revenue − explicit costs = ${usd(rev)} − ${usd(rent)} − ${usd(wages)} − ${usd(supplies)} = <b>${usd(ans)}</b>.</p><p>The common slip is also subtracting the owner\'s ${usd(own)} salary (giving ${usd(ans-own)}). That salary is an implicit cost: no money is paid, so an accountant leaves it out. Subtracting it gives economic profit instead (M2).</p>` };
});
gen('l20-g-econ','l20',()=>{
  const rev = pick([150,200,250,300])*1000, exp = pick([60,80,90,100,120])*1000, sal = pick([50,60,70,80,90])*1000, rentOwn = pick([10,12,15,20])*1000;
  const acc = rev - exp, ans = acc - sal - rentOwn;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Ray runs a repair shop in a garage he owns. This year:${atable(['Item','Amount'],[['Revenue',usd(rev)],['Explicit costs (parts, wages, utilities)',usd(exp)],['Salary Ray could earn as a mechanic elsewhere',usd(sal)],['Rent Ray could charge someone else for the garage',usd(rentOwn)]],{cls:'compact wrap'})}What is Ray\'s <b>economic</b> profit? (Type a negative number for a loss.)`, answer:ans,
    explain:`<p>Economic profit = revenue − explicit costs − implicit costs = ${usd(rev)} − ${usd(exp)} − ${usd(sal)} − ${usd(rentOwn)} = <b>${usd(ans)}</b>.</p><p>The common slips: stopping at accounting profit (${usd(acc)}, which leaves out the implicit costs, M2), or subtracting only the salary and forgetting the garage he could rent out (${usd(acc-sal)}). Both the salary and the garage rent are things Ray gives up.</p>` };
});
mc('l20-caroline','l20',`Your course\'s Caroline needs $300,000 to start her business. In Choice B she uses $100,000 of her savings and borrows $200,000 from a bank at 5% interest. Her savings account also pays 5%.${carTbl()}What is her <b>explicit</b> cost in Choice B?`,
  [`$310,000`,`$300,000`,`$315,000`,`$305,000`,`$10,000`],0,
  `<p>Explicit costs are money paid out: the $200,000 loan and $100,000 of savings spent on the business, plus 5% interest paid to the bank on $200,000 ($10,000). Your course: "$200,000 + $100,000 + ($200,000 × 5%) = $310,000."</p><p>$315,000 is her total economic cost (it adds the $5,000 of interest her savings no longer earn, an implicit cost). $300,000 forgets the interest paid; $10,000 is the interest alone.</p>`);
tf('l20-tf-implicit','l20','Implicit costs should be left out of a business decision because no money is actually paid for them.',false,
  `<p>False. An implicit cost is an opportunity cost: the value of the next best use of something the owner already has. If Dana runs her bakery, she really does give up the salary she could have earned. Your course counts both "explicit costs or financial costs as well as implicit costs or opportunity costs" in a firm\'s economic costs.</p>`);
mc('l20-normal','l20','A firm is earning a <b>normal profit</b>. Which of the following must be true?',
  [`Its accounting profit just equals its implicit costs, so its economic profit is zero`,`Its accounting profit is zero`,`Its economic profit is the average for its industry`,`Its total revenue is less than its explicit costs`,`Its owner would earn more by closing and taking her next best option`],0,
  `<p>Normal profit is the accounting profit that just pays the owner what her time, money and other resources could earn in their next best use. So economic profit = accounting profit − implicit costs = 0. Your course textbook: zero economic profit "means the firm\'s accounting profit is equal to what its resources could earn in their next best use."</p><p>"Accounting profit is zero" is the classic trap (M3): with zero accounting profit the owner would be earning less than her alternatives. "Average for its industry" mixes up "normal" with "typical" (M6).</p>`);
lazy('l20-gr-bars','l20',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers for a food truck\'s year:<div class="qg" style="max-width:420px">${hbars([['Revenue',90000,'var(--accent)'],['Explicit costs',70000,'var(--g1)'],['Implicit costs',30000,'var(--g2)']], { max:100000, w:380, left:120, fmt:v=>usd(v) })}</div>Which of the following is true?`,
  options:[`Accounting profit is $20,000 and economic profit is −$10,000`,`Accounting profit is −$10,000 and economic profit is $20,000`,`Both accounting and economic profit are $20,000`,`Accounting profit is $60,000 and economic profit is $20,000`,`Both are −$10,000, since all costs count for both`], answer:0,
  explain:`<p>Accounting profit = revenue − explicit costs = $90,000 − $70,000 = $20,000. Economic profit also subtracts implicit costs: $20,000 − $30,000 = −$10,000. The truck looks profitable on paper but earns less than the owner\'s next best option (M5).</p><p>Swapping the two numbers reverses the definitions. Economic profit can never be higher than accounting profit when implicit costs are positive (M2).</p>` }));
mc('l20-fred-switch','l20',`Your course textbook\'s Fred:${fredTbl()}Suppose his current firm raises his salary to <b>$140,000</b>. What is the economic profit of opening his own practice now?`,
  [`−$25,000`,`$115,000`,`−$10,000`,`−$140,000`,`$60,000`],0,
  `<p>Economic profit = $200,000 − $50,000 − $35,000 − $140,000 = <b>−$25,000</b>. The raise makes his outside option better, so the implicit cost of quitting rises and his own practice looks worse.</p><p>$115,000 is accounting profit, which ignores the salary (M2). −$10,000 uses the old $125,000 salary. The office and clerk didn\'t change, so accounting profit stays $115,000.</p>`);
tf('l20-tf-zero','l20','A firm earning zero economic profit should shut down, because its owner is earning nothing.',false,
  `<p>False. Zero economic profit is a normal profit: the accounting profit is positive and just equals what the owner\'s time and money could earn elsewhere. The owner is as well off staying as leaving, so there is no reason to close. Your course textbook: zero economic profit "is not equivalent to zero accounting profit."</p>`);
mc('l20-why-same','l20','In your course\'s example, why is Caroline\'s total <b>economic</b> cost the same ($315,000) whether she uses all her savings or borrows $200,000?',
  [`Interest she pays the bank and interest her own savings stop earning are both costs, and the rates are equal`,`Accountants and economists agree on her explicit costs`,`Borrowing has no cost, because the bank provides the money`,`Implicit costs don\'t count when a business is new`,`Her savings account pays a higher rate than the bank charges`],0,
  `<p>Every dollar she puts in costs 5% a year either way. Borrowed dollars cost 5% in interest paid (explicit). Her own dollars cost 5% in interest given up (implicit). Your course: "it doesn\'t matter if Caroline chooses A or B; she\'s faced with the same cost if you account for the opportunity cost."</p><p>The tempting idea that her own money is free is M4. The accountant\'s totals actually differ ($300,000 and $310,000) because they leave out the implicit part.</p>`);
mc('l20-selfcheck','l20','From your course textbook: a firm had sales revenue of $1 million last year. It spent $600,000 on labor, $150,000 on capital and $200,000 on materials. Its factory sits on land the firm owns that could be rented out for $30,000 a year. What was its <b>economic</b> profit?',
  [`$20,000`,`$50,000`,`−$30,000`,`$80,000`,`$0`],0,
  `<p>Accounting profit = $1,000,000 − $600,000 − $150,000 − $200,000 = $50,000. The land could earn $30,000 in rent, an implicit cost, so economic profit = $50,000 − $30,000 = <b>$20,000</b>.</p><p>$50,000 is the accounting profit (M2). $80,000 adds the land rent instead of subtracting it.</p>`);
mc('l20-raise-econ','l20','Which of the following would raise a café owner\'s <b>economic</b> profit while leaving her <b>accounting</b> profit unchanged?',
  [`The best job she could get elsewhere starts paying less`,`Her landlord cuts the café\'s rent`,`She sells more coffee at the same price`,`Her suppliers raise the price of milk`,`She hires one more paid barista`],0,
  `<p>Her outside salary is an implicit cost: it enters economic profit but not accounting profit. If that option pays less, she gives up less by running the café, so economic profit rises and accounting profit doesn\'t move.</p><p>Rent, sales, milk and a barista\'s wage are all money in or money out, so they change <b>both</b> profits by the same amount. Only implicit costs separate the two (M1, M2).</p>`);
/* L20 more */
mc('l20-def-exp','l20','Which of the following best defines an <b>explicit</b> cost?',
  [`A payment the firm actually makes, such as wages or rent`,`The value of the owner\'s time spent in the business`,`Any cost that changes with output`,`The income the owner\'s savings could have earned`,`A cost that only economists count`],0,
  `<p>Your course textbook: explicit costs "are out-of-pocket costs, that is, payments that are actually made." Your course calls them "financial costs."</p><p>The owner\'s time and forgone interest are implicit costs. A cost that changes with output is a variable cost (Lesson 17), a different way of sorting costs. Both accountants and economists count explicit costs.</p>`);
gen('l20-g-normal','l20',()=>{
  const sal = pick([40,45,50,60,70])*1000, intr = pick([2,3,4,5,6])*1000, rent = pick([6,8,10,12])*1000, ans = sal + intr + rent;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Sam runs a bike shop. By doing so he gives up a <b>${usd(sal)}</b> salary elsewhere, <b>${usd(intr)}</b> of interest his invested savings would have earned, and <b>${usd(rent)}</b> of rent he could charge for the shop space he owns. How much <b>accounting</b> profit does the shop need to earn for Sam to make exactly a normal profit?`, answer:ans,
    explain:`<p>Normal profit means economic profit is zero, so accounting profit must equal all the implicit costs: ${usd(sal)} + ${usd(intr)} + ${usd(rent)} = <b>${usd(ans)}</b>.</p><p>The common slips are using only the salary (${usd(sal)}) or answering $0, which confuses zero economic profit with zero accounting profit (M3).</p>` };
});
tf('l20-tf-econ-lower','l20','When a firm has implicit costs, its economic profit is lower than its accounting profit.',true,
  `<p>True. Economic profit = accounting profit − implicit costs. Any positive implicit cost makes economic profit the smaller number. Fred\'s accounting profit is $115,000; his economic profit is −$10,000. This is why the two profits are not the same thing (M2).</p>`);
mc('l20-carA','l20',`Your course\'s Caroline, Choice A: she takes all $300,000 out of a savings account paying 5%.${carTbl()}What is her <b>implicit</b> cost?`,
  [`$15,000`,`$300,000`,`$315,000`,`$5,000`,`$0, because she doesn\'t pay anyone interest`],0,
  `<p>Her savings would have earned 5% of $300,000 = <b>$15,000</b> a year. Taking the money out gives that up: your course calls it "foregone interest income."</p><p>$300,000 is the explicit cost of starting the business. $5,000 is her implicit cost in Choice B, where only $100,000 of savings is used. "$0" is M1.</p>`);
gen('l20-g-rate','l20',()=>{
  const need = pick([100,200,300,400])*1000, rate = pick([3,4,5,6,8]), borrow = pick([0.25,0.5,0.75])*need, own = need - borrow;
  const explicit = need + borrow*rate/100, implicit = own*rate/100, ans = explicit + implicit;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers, like your course\'s Caroline. A business needs <b>${usd(need)}</b> to start. The owner borrows <b>${usd(borrow)}</b> at ${rate}% and takes the other ${usd(own)} from savings that pay ${rate}%. What is the owner\'s total <b>economic</b> cost for the first year?`, answer:ans,
    explain:`<p>Explicit cost = ${usd(need)} spent + ${rate}% interest on the ${usd(borrow)} loan (${usd(borrow*rate/100)}) = ${usd(explicit)}. Implicit cost = ${rate}% of the ${usd(own)} savings (${usd(implicit)}). Economic cost = ${usd(explicit)} + ${usd(implicit)} = <b>${usd(ans)}</b>.</p><p>Shortcut: at equal rates, economic cost = ${usd(need)} × (1 + ${rate/100}) however the money is raised. The common slip is ${usd(explicit)}, the accountant\'s cost, which leaves out the interest the savings no longer earn (M4).</p>` };
});
mc('l20-home-store','l20','Your course textbook\'s example: an owner uses the ground floor of her own home as a retail store instead of renting it out. How should an economist treat the rent she could have earned?',
  [`As an implicit cost of the store`,`As an explicit cost of the store`,`As revenue of the store`,`As a sunk cost that should be ignored`,`It should be left out, because she owns the building`],0,
  `<p>The textbook lists "using the ground floor of a home as a retail store" as an implicit cost: the rent she gives up is the opportunity cost of using her own space. No check is written, so it isn\'t explicit.</p><p>"Leave it out because she owns it" is M1. It isn\'t sunk either: she could rent the space out next month, so the choice is still open.</p>`);
mc('l20-accountant','l20','In your course\'s Choice A, Caroline takes $300,000 from savings paying 5%. What would an <b>accountant</b> say her cost is?',
  [`$300,000, the explicit cost only`,`$315,000, explicit plus implicit costs`,`$15,000, the interest she gives up`,`$0, because she used her own money`,`$310,000, including interest on a loan`],0,
  `<p>Your course: "if you asked an accountant, an accountant would say that her cost would be only her explicit costs, the $300,000." Accountants count money paid out.</p><p>$315,000 is the economist\'s total, which adds the $15,000 of interest her savings stop earning. $310,000 is Choice B\'s explicit cost.</p>`);
tf('l20-tf-borrow','l20','Using your own savings to start a business always costs less than borrowing the money at the same interest rate.',false,
  `<p>False. Savings used in the business stop earning interest, and that lost interest is a real (implicit) cost. At the same rate, the two ways of raising money cost the same: your course\'s Caroline faces $315,000 either way. Only the accountant\'s number differs (M4).</p>`);
mc('l20-entry-signal','l20','Made-up example. Owners of car washes in a city earn accounting profits well above what their time and money could earn in their next best uses. What would you expect to happen over time?',
  [`New car washes open, because economic profits attract investment`,`Car washes close, because they earn only a normal profit`,`Nothing, because accounting profit is what matters for entry`,`Existing owners shut down to avoid taxes`,`Prices rise, because owners want more profit`],0,
  `<p>Accounting profit above the owners\' implicit costs means positive economic profit. Econlib\'s Thurow: "When profits are above the normal level, they attract additional investment, either by new firms or by existing firms." More car washes open.</p><p>"Only a normal profit" misreads the situation: normal profit would be accounting profit just equal to implicit costs (M6). Entry responds to economic, not accounting, profit.</p>`);
gen('l20-g-fred','l20',()=>{
  const rev = pick([150,180,200,220,250])*1000, office = pick([30,40,50])*1000, clerk = pick([30,35,40])*1000, sal = pick([90,100,110,125,140])*1000, ans = rev - office - clerk - sal;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers, like your course textbook\'s Fred. An accountant leaves a <b>${usd(sal)}</b> job to start her own firm. She expects revenue of <b>${usd(rev)}</b>, office rent of <b>${usd(office)}</b> and an assistant\'s salary of <b>${usd(clerk)}</b>. What is her expected <b>economic</b> profit? (Type a negative number for a loss.)`, answer:ans,
    explain:`<p>Economic profit = ${usd(rev)} − ${usd(office)} − ${usd(clerk)} − ${usd(sal)} = <b>${usd(ans)}</b>.</p><p>The common slip is ${usd(rev-office-clerk)}, the accounting profit, which leaves out the salary she gives up (M2).</p>` };
});
lazy('l20-gr-normal','l20',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. Three shop owners\' accounting profits (green) and implicit costs (amber) this year:<div class="qg" style="max-width:420px">${(()=>{ const rows=[['Ana',50000,50000],['Ben',40000,55000],['Cal',70000,45000]], W_=380, left=60, right=W_-70, rh=40, top=6, max=80000, X=v=>left+(right-left)*v/max; let s=`<svg class="u2bars" viewBox="0 0 ${W_} ${top+rows.length*rh+28}" role="img" aria-label="Paired bars of accounting profit and implicit cost for three owners">`;
    rows.forEach(([n,a,im],i)=>{ const y=top+i*rh; s+=`<text x="${left-6}" y="${y+20}" text-anchor="end" class="lbl-ink">${n}</text><rect x="${left}" y="${y+4}" width="${(X(a)-left).toFixed(1)}" height="14" fill="var(--accent)" opacity=".8"/><text x="${(X(a)+4).toFixed(1)}" y="${y+15}" class="lbl-ink halo">${usd(a)}</text><rect x="${left}" y="${y+20}" width="${(X(im)-left).toFixed(1)}" height="14" fill="var(--g2)" opacity=".9"/><text x="${(X(im)+4).toFixed(1)}" y="${y+31}" class="lbl-ink halo">${usd(im)}</text>`; });
    const yb=top+rows.length*rh; s+=`<line x1="${left}" x2="${right}" y1="${yb}" y2="${yb}" class="ax"/><rect x="${left}" y="${yb+8}" width="12" height="10" fill="var(--accent)" opacity=".8"/><text x="${left+16}" y="${yb+17}" class="lbl">accounting profit</text><rect x="${left+130}" y="${yb+8}" width="12" height="10" fill="var(--g2)" opacity=".9"/><text x="${left+146}" y="${yb+17}" class="lbl">implicit costs</text>`; return s+'</svg>'; })()}</div>Which owner is earning exactly a <b>normal profit</b>?`,
  options:[`Ana`,`Ben`,`Cal`,`All three, since each has a positive accounting profit`,`None, since none has zero accounting profit`], answer:0,
  explain:`<p>Normal profit means accounting profit just equals implicit costs, so economic profit is zero. Ana: $50,000 − $50,000 = $0. Ben: $40,000 − $55,000 = −$15,000 (an economic loss). Cal: $70,000 − $45,000 = $25,000 (an economic profit).</p><p>A positive accounting profit isn\'t enough (M5), and normal profit doesn\'t need zero accounting profit (M3).</p>` }));
mc('l20-leisure','l20','Your course textbook notes that Fred values his leisure, and his own practice would take more hours than his current job. How does this affect his decision?',
  [`It adds an implicit cost, lowering the economic profit of his own practice`,`It raises his accounting profit, since he works more`,`It has no effect, because leisure has no price`,`It lowers his explicit costs`,`It turns his economic loss into a profit`],0,
  `<p>The textbook: "the lost leisure would also be an implicit cost that would subtract from economic profits." Whatever he gives up, time included, counts.</p><p>"Leisure has no price" is M1 again: an opportunity cost needn\'t be paid in money. Leisure doesn\'t touch accounting profit, which only tracks money in and out.</p>`);
tf('l20-tf-acc-pos','l20','A firm can earn a positive accounting profit and a negative economic profit in the same year.',true,
  `<p>True. If accounting profit is smaller than the owner\'s implicit costs, economic profit is negative. Your course textbook\'s Fred: accounting profit $115,000, economic profit −$10,000. A positive accounting profit doesn\'t prove the business is the owner\'s best option (M5).</p>`);
mc('l20-tax','l20','According to your course textbook, a business pays income taxes based on its accounting profit. Why does an economist still focus on economic profit when judging whether the business is worthwhile?',
  [`Economic profit shows whether the owner\'s resources earn more here than in their next best use`,`Economic profit is always larger, so it is more encouraging`,`Accounting profit leaves out explicit costs`,`Economic profit ignores opportunity costs`,`Taxes are an implicit cost`],0,
  `<p>The textbook: "even though a business pays income taxes based on its accounting profit, whether or not it is economically successful depends on its economic profit." Only economic profit compares the business with what the owner gives up.</p><p>Economic profit is never larger when there are implicit costs (M2). Taxes are paid in money, so they are explicit.</p>`);
mc('l20-farm','l20','Made-up numbers. A farmer\'s revenue is $180,000 and her explicit costs are $120,000. She could rent her land to a neighbor for $25,000 and earn $40,000 working for another farm. What is her economic profit?',
  [`−$5,000`,`$60,000`,`$35,000`,`$20,000`,`−$65,000`],0,
  `<p>Accounting profit = $180,000 − $120,000 = $60,000. Implicit costs = $25,000 + $40,000 = $65,000. Economic profit = $60,000 − $65,000 = <b>−$5,000</b>.</p><p>$60,000 is accounting profit (M2). $35,000 and $20,000 subtract only one of the two implicit costs. −$65,000 subtracts the implicit costs from zero instead of from accounting profit.</p>`);
gen('l20-g-implicit','l20',()=>{
  const hrs = pick([20,25,30,40]), wage = pick([15,18,20,25]), weeks = 50, sav = pick([20,30,40,50])*1000, rate = pick([2,3,4,5]);
  const ans = hrs*wage*weeks + sav*rate/100;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Lee runs an online shop from home, working <b>${hrs}</b> hours a week for ${weeks} weeks a year instead of a part-time job paying <b>$${wage}</b> an hour. She also used <b>${usd(sav)}</b> of savings that were earning <b>${rate}%</b> a year to buy stock for the shop. What are her total <b>implicit</b> costs for the year?`, answer:ans,
    explain:`<p>Time: ${hrs} hours × $${wage} × ${weeks} weeks = ${usd(hrs*wage*weeks)}. Interest given up: ${rate}% × ${usd(sav)} = ${usd(sav*rate/100)}. Total implicit costs = <b>${usd(ans)}</b>.</p><p>The ${usd(sav)} itself, spent on stock, is an explicit cost; only the interest it no longer earns is implicit. Leaving out the time (answering ${usd(sav*rate/100)}) is the common slip (M1).</p>` };
});

/* ===== Lesson 20 quick checks ===== */
mc('l20c-goal','l20','According to your course, which two ways can a firm raise its profit?',
  [`Raise total revenue or lower total cost`,`Raise its price or raise its costs`,`Lower its revenue or lower its costs`,`Hire more workers or buy more machines`,`Increase fixed cost or decrease variable cost`],0,
  `<p>Profit = total revenue − total cost, so your course lists "Maximize total revenue" and "Minimize total costs." Hiring or buying more changes both sides, so it is not itself a way to raise profit.</p>`);
mc('l20c-imp','l20','Made-up example. Omar keeps working full time at his own taco stand instead of taking a $45,000 office job, and he stores supplies in his own garage instead of renting it out for $3,000 a year. Which are implicit costs?',
  [`The $45,000 salary and the $3,000 garage rent he gives up`,`Only the $45,000 salary`,`Only the tortillas and meat he buys`,`Only the stand\'s permit fee`,`None, since Omar pays no one for them`],0,
  `<p>Both are resources Omar already has (his time and his garage) whose next best use he gives up. The tortillas, meat and permit are paid for in money: explicit costs.</p>`);
mc('l20c-car','l20','In your course\'s example, what is Caroline\'s <b>total economic cost</b> in Choice A (all $300,000 from savings paying 5%)?',
  [`$315,000`,`$300,000`,`$310,000`,`$15,000`,`$330,000`],0,
  `<p>Explicit $300,000 + implicit $15,000 (5% of $300,000 she no longer earns) = <b>$315,000</b>, the same as Choice B. $300,000 is the accountant\'s cost.</p>`);
mc('l20c-acc','l20','Made-up numbers. A yoga studio has revenue of $150,000, explicit costs of $110,000 and implicit costs of $50,000. Which is correct?',
  [`Accounting profit $40,000; economic profit −$10,000`,`Accounting profit −$10,000; economic profit $40,000`,`Both profits are $40,000`,`Accounting profit $100,000; economic profit $40,000`,`Both profits are −$10,000`],0,
  `<p>Accounting: $150,000 − $110,000 = $40,000. Economic: $40,000 − $50,000 = −$10,000. Economic profit subtracts the implicit costs too.</p>`);
mc('l20c-norm','l20','Made-up example. A dentist could earn $180,000 a year working for a clinic. Her own practice earns an accounting profit of exactly $180,000, and she has no other implicit costs. What is she earning?',
  [`A normal profit: zero economic profit`,`An economic profit of $180,000`,`An economic loss of $180,000`,`Zero accounting profit`,`A profit that will attract many new dentists`],0,
  `<p>Accounting profit equals her implicit cost, so economic profit is $180,000 − $180,000 = 0: a normal profit. She does exactly as well as at the clinic, so there is no reason to leave and no special pull for others to enter.</p>`);
mc('l20c-skill','l20','Made-up numbers. A pottery studio sells $80,000 of pots. It pays $30,000 for clay and rent. The owner gives up a $35,000 salary and $2,000 of interest on savings used to buy kilns. What are its accounting and economic profits?',
  [`$50,000 accounting; $13,000 economic`,`$13,000 accounting; $50,000 economic`,`$50,000 accounting; $15,000 economic`,`$45,000 accounting; $13,000 economic`,`$13,000 accounting; $13,000 economic`],0,
  `<p>Accounting: $80,000 − $30,000 = $50,000. Implicit: $35,000 + $2,000 = $37,000. Economic: $50,000 − $37,000 = $13,000. $15,000 forgets the interest.</p>`);

/* Course materials checked 2026-10-28: video 5.1 transcript (profits = TR − TC; "explicit costs or financial costs as well as implicit costs or opportunity costs";
   Caroline: A explicit 300,000, implicit 15,000, economic 315,000, accountant 300,000; B explicit 310,000, implicit 5,000, economic 315,000, accounting 310,000),
   Module 5 slides 180-186, course textbook §7.1 (explicit/implicit definitions; home ground floor; Fred 200,000 − 85,000 = 115,000; − 125,000 = −10,000; leisure; taxes on accounting profit; self-check 1-2),
   §10.1 (zero economic profit ≠ zero accounting profit), §11.3 ("normal rate of profit"); Econlib, Thurow ("normal level", entry); CLEP outline (normal profit). */
const L20TAGS = {
  'l20-def-imp':['MS5 OS71','acc','models','M1'], 'l20-g-acc':['OS71','acc','data','M2'], 'l20-g-econ':['OS71 MS5','acc','data','M2 M1'],
  'l20-caroline':['MS5','acc','data','M4'], 'l20-tf-implicit':['MS5 OS71','acc','terms','M1'], 'l20-normal':['CB OS101 ELPR','norm','terms','M3 M6'],
  'l20-gr-bars':['OS71','acc','graphs','M5 M2'], 'l20-fred-switch':['OS71','acc','data','M2'], 'l20-tf-zero':['OS101 CB','norm','terms','M3'],
  'l20-why-same':['MS5','acc','models','M4'], 'l20-selfcheck':['OS71','acc','data','M2'], 'l20-raise-econ':['OS71','acc','models','M1 M2'],
  'l20-def-exp':['OS71 MS5','acc','terms','M1'], 'l20-g-normal':['CB OS101','norm','data','M3'], 'l20-tf-econ-lower':['OS71','acc','terms','M2'],
  'l20-carA':['MS5','acc','data','M1 M4'], 'l20-g-rate':['MS5','acc','data','M4'], 'l20-home-store':['OS71','acc','models','M1'],
  'l20-accountant':['MS5','acc','terms','M2'], 'l20-tf-borrow':['MS5','acc','terms','M4'], 'l20-entry-signal':['ELPR CB','norm','models','M6'],
  'l20-g-fred':['OS71','acc','data','M2'], 'l20-gr-normal':['CB OS101','norm','graphs','M5 M3'], 'l20-leisure':['OS71','acc','models','M1'],
  'l20-tf-acc-pos':['OS71','acc','terms','M5'], 'l20-tax':['OS71','acc','terms','M2'], 'l20-farm':['OS71','acc','data','M2'], 'l20-g-implicit':['OS71 MS5','acc','data','M1'],
  'l20c-goal':['MS5','acc','terms',''], 'l20c-imp':['MS5 OS71','acc','models','M1'], 'l20c-car':['MS5','acc','data','M4'],
  'l20c-acc':['OS71','acc','data','M2'], 'l20c-norm':['CB OS101','norm','models','M3'], 'l20c-skill':['OS71','acc','data','M1']
};
u5tag(L20TAGS);

U5_CARDS.l20 = [
  ['Explicit cost','What is an explicit cost? Give two examples.','An out-of-pocket payment the firm actually makes. Your course calls these "financial costs."','Wages paid to staff, rent paid for an office, interest paid on a loan.','Both accountants and economists count explicit costs.'],
  ['Implicit cost','What is an implicit cost? Give two examples.','The opportunity cost of using resources the owner already has, so nothing is paid but something is given up.','The salary the owner could earn elsewhere; rent the owner could charge for her own building; interest her savings could earn.','"No money is paid" doesn\'t mean "no cost."'],
  ['Accounting profit','How is accounting profit calculated?','Total revenue minus explicit costs only: dollars in minus dollars paid out.','Textbook Fred: $200,000 − $85,000 = $115,000.','Taxes are based on it, but it ignores what the owner gives up.'],
  ['Economic profit','How is economic profit calculated?','Total revenue minus explicit and implicit costs (= accounting profit − implicit costs).','Fred: $115,000 − $125,000 salary given up = −$10,000.','It is never larger than accounting profit when implicit costs are positive.'],
  ['Normal profit','What is a normal profit?','An accounting profit that just equals the owner\'s implicit costs, so economic profit is zero. The resources earn exactly what they could earn elsewhere.','A dentist who could earn $180,000 at a clinic earns $180,000 of accounting profit in her own practice.','Not zero accounting profit, and not the industry\'s average profit.'],
  ['Caroline\'s choice','Why does Caroline face the same economic cost whether she borrows or uses her savings?','Borrowed money costs interest paid (explicit); her own money costs interest given up (implicit). At the same 5% rate, both total $315,000.','A: $300,000 + $15,000. B: $310,000 + $5,000.','Only the accountant\'s numbers ($300,000 vs $310,000) differ.'],
  ['Two lenses on one business','Fred has accounting profit of $115,000 and economic profit of −$10,000. What does each number tell him?','Accounting: his practice brings in $115,000 more than he pays out. Economic: it earns $10,000 less than staying at his $125,000 job.','Textbook §7.1.','Both are correct; they answer different questions.'],
  ['Implicit cost of owner\'s time','How do you value the owner\'s time as a cost?','By what the time could earn in its next best use, such as a salary or wage elsewhere (plus leisure she values).','20 hours a week × $20 × 50 weeks = $20,000 a year.','Use the next best option, not every option.'],
  ['Zero economic profit','Is a firm earning zero economic profit losing money?','No. It is earning a normal profit: enough accounting profit to pay the owner what her resources could earn elsewhere.','Textbook: zero economic profit "is not equivalent to zero accounting profit."','There is no reason for it to close.'],
  ['Economic profit as a signal','What happens when an industry earns positive economic profits?','Other investors want in: new firms enter or existing firms expand, which competes the profits down over time.','Econlib, Thurow: profits above the normal level "attract additional investment."','Entry responds to economic profit, not accounting profit.'],
  ['Sorting a cost','What question sorts a cost into explicit or implicit?','Does money leave the business to pay someone? Yes: explicit. No, but the owner gives up the next best use of something she has: implicit.','Rent paid: explicit. Rent she could charge for her own garage: implicit.','Savings spent are explicit; the interest they no longer earn is implicit.'],
  ['Opportunity cost in business','How does Lesson 1\'s opportunity cost show up in a firm\'s costs?','As implicit costs: the value of the next best use of the owner\'s time, money and property.','Caroline\'s savings could earn 5%: $15,000 a year on $300,000.','Economic cost = explicit cost + opportunity cost of owned resources.']
];

Object.assign(U5_WRITE, {
  'w-l20-1':{lesson:'l20',prompt:'Explain, using your course\'s Caroline example, why an economist says her cost of starting the business is the same whether she uses all her savings or borrows $200,000, while an accountant gives two different numbers.',
    model:'Caroline needs $300,000. If she uses all her savings (Choice A), she pays out $300,000, an explicit cost, and gives up the 5% interest the savings would have earned, $15,000, an implicit cost. If she borrows $200,000 and uses $100,000 of savings (Choice B), she pays out $310,000 including $10,000 of interest to the bank, and gives up $5,000 of interest on her own savings. An accountant counts only the money paid out, so the costs look like $300,000 and $310,000. An economist adds the implicit costs, because her own money could have earned 5% too. Either way every dollar costs 5% a year, so her total economic cost is $315,000 in both cases.',
    checklist:['Identifies the explicit and implicit cost in each choice','Gives the economic cost of $315,000 for both choices','Explains that an accountant counts only explicit costs ($300,000 and $310,000)','Explains why: interest paid and interest given up are both costs at the same rate']},
  'w-l20-2':{lesson:'l20',prompt:'Pick a small business you could start. List at least two explicit and two implicit costs with made-up numbers, then calculate its accounting profit and economic profit for a year of made-up revenue. Say whether it earns a normal profit, more, or less.',
    model:'Suppose I start a lawn care business with made-up numbers. Revenue for the year is $40,000. Explicit costs: $6,000 for gas and repairs and $4,000 of wages to a helper, so $10,000 in total. Implicit costs: the $28,000 I could earn at my current job, and $500 of interest my $10,000 of savings would earn if I didn\'t spend them on a mower, so $28,500. Accounting profit = $40,000 − $10,000 = $30,000. Economic profit = $30,000 − $28,500 = $1,500. Because economic profit is positive, the business earns more than a normal profit: more than my next best option. If my accounting profit were exactly $28,500, I would earn a normal profit.',
    checklist:['Lists at least two explicit costs and two implicit costs, correctly sorted','Calculates accounting profit as revenue minus explicit costs','Calculates economic profit by also subtracting implicit costs','Correctly says whether it is above, equal to or below a normal profit']}
});

U5_PLAN.l20 = {
  core:['l20-def-imp','l20-g-acc','l20-g-econ','l20-caroline','l20-tf-implicit','l20-normal','l20-gr-bars','l20-fred-switch','l20-tf-zero','l20-why-same','l20-selfcheck','l20-raise-econ'],
  more:['l20-def-exp','l20-g-normal','l20-tf-econ-lower','l20-carA','l20-g-rate','l20-home-store','l20-accountant','l20-tf-borrow','l20-entry-signal','l20-g-fred','l20-gr-normal','l20-leisure','l20-tf-acc-pos','l20-tax','l20-farm','l20-g-implicit']
};

U5_LESSONS.push({ id:'l20', unit:5, title:'Economic Profit: Explicit and Implicit Costs', mins:40, src:'Modern States video 5.1 (first part) and Module 5 slides 180-186 · Course textbook (OpenStax) §7.1, with §10.1 and §11.3 on normal profit',
  sources:['MS5','OS71','OS101','OS113','CB','ELPR'],
  oneline:'Economists count every cost, including what the owner gives up by using her own time and money, so economic profit can be negative while accounting profit is positive. Zero economic profit is a normal profit.',
  body:`
<p>Unit 4 built a firm\'s costs: fixed and variable, average and marginal (Lessons 17 and 18), with ${dt('profit','profit')} = ${dt('total-revenue','total revenue')} − ${dt('total-cost','total cost')}. Unit 5 asks what a ${dt('firm','firm')} does with those costs: how much to make and what to charge, in four different kinds of market. It starts with a question Unit 4 left open: what counts as a cost?</p>

<h2>Firms aim to maximize profit</h2>
<!-- src: MS5 (video 5.1: "all firms are going to be interested in trying to maximize their profits"; "Profits are the difference between total revenue and total costs, so therefore if a firm wants to maximize profits it is going to be looking at trying to maximize total revenue as well as minimize total costs"; "we need to think about it in terms of economic costs and economic profits"; slides 181-182: TR = P × Q, TC = FC + VC); OS71 (Profit = Total Revenue − Total Cost) -->
<p>Your course opens Unit 5 with the firm\'s goal: "all firms are going to be interested in trying to maximize their profits." Profit is total revenue (price × quantity) minus total cost, so a firm has two levers: raise revenue or keep cost down.</p>
${FIG5.l20goal()}
<p><b>Why the cost box needs care:</b> your course adds that economists think "in terms of economic costs and economic profits." Lesson 1\'s ${dt('opp-cost','opportunity cost')} is the reason. Running a business uses up the owner\'s time, money and property, and each could have earned something somewhere else.</p>
<p><b>So what:</b> two people can look at the same business and disagree about its profit, because they put different things in the cost box.</p>
<div data-check="l20c-goal"></div>

<h2>Explicit and implicit costs</h2>
<!-- src: MS5 (video 5.1: "explicit costs or financial costs as well as implicit costs or opportunity costs"; slide 183); OS71 ("Explicit costs are out-of-pocket costs, that is, payments that are actually made. Wages that a firm pays its employees or rent that a firm pays for its office are explicit costs. Implicit costs ... represent the opportunity cost of using resources already owned by the firm. Often for small businesses, they are resources contributed by the owners; for example, working in the business while not getting a formal salary, or using the ground floor of a home as a retail store") -->
<p>An ${dt('explicit-cost','<b>explicit cost</b>')} is money the firm actually pays: your course calls these "financial costs." An ${dt('implicit-cost','<b>implicit cost</b>')} is an "opportunity cost": the value of using something the owner already has instead of putting it to its next best use.</p>
${FIG5.l20costs()}
<p><b>Why implicit costs are real:</b> suppose the owner works in her shop without a salary. No check is written, yet she gives up the pay she could earn at another job. Your course textbook\'s examples: "working in the business while not getting a formal salary, or using the ground floor of a home as a retail store."</p>
<p><b>So what:</b> an implicit cost is just as much a cost of the choice as rent. Leaving it out makes the business look better than it is.</p>
<div data-check="l20c-imp"></div>

<h2>Caroline\'s choice: borrow or use savings?</h2>
<!-- src: MS5 (video 5.1: Caroline can use $300,000 of savings paying 5%, or borrow $200,000 at the same rate and use $100,000 of savings; A: explicit 300,000, implicit "foregone interest income" 15,000, total economic cost 315,000, "an accountant would say that her cost would be only her explicit costs, the $300,000"; B: explicit 200,000 + 100,000 + interest 10,000 = 310,000, implicit 5,000, total economic 315,000, accounting 310,000; "for an economist they would say it doesn't matter if Caroline chooses A or B; she's faced with the same cost if you account for the opportunity cost"; slides 183-186) -->
<p>Your course\'s Caroline needs $300,000 to start a business. Her savings account pays 5%. She can take all $300,000 from savings (Choice A), or borrow $200,000 from a bank at the same 5% and use $100,000 of savings (Choice B).</p>
${carTbl()}
<p><b>Worked example: your course\'s numbers.</b></p>
<div class="math">Choice A<br>Explicit cost = <b>$300,000</b> (spent on the business)<br>Implicit cost = $300,000 × 5% = <b>$15,000</b> (interest her savings stop earning)<br>Economic cost = $300,000 + $15,000 = <b>$315,000</b></div>
<div class="math">Choice B<br>Explicit cost = $200,000 + $100,000 + ($200,000 × 5%) = <b>$310,000</b><br>Implicit cost = $100,000 × 5% = <b>$5,000</b><br>Economic cost = $310,000 + $5,000 = <b>$315,000</b></div>
${FIG5.l20caroline()}
<p>Check: an accountant, counting only money paid out, would say $300,000 for A and $310,000 for B. Your course: "it doesn\'t matter if Caroline chooses A or B; she\'s faced with the same cost if you account for the opportunity cost."</p>
<p><b>Why:</b> every dollar in the business costs her 5% a year. A borrowed dollar costs 5% in interest paid to the bank; one of her own dollars costs 5% in interest it no longer earns. Try other mixes below.</p>
<div data-widget="finance"></div>
<p>What to notice: sliding toward borrowing moves cost from the amber (implicit) part to the blue (explicit) part, but the total stays put. Only a different interest rate changes it.</p>
<div data-check="l20c-car"></div>

<h2>Accounting profit and economic profit</h2>
<!-- src: OS71 ("Accounting profit is a cash concept. It means total revenue minus explicit costs ... Economic profit is total revenue minus total cost, including both explicit and implicit costs. The difference is important because even though a business pays income taxes based on its accounting profit, whether or not it is economically successful depends on its economic profit"; Fred: revenue $200,000, office $50,000, clerk $35,000, accounting profit $115,000, salary $125,000, economic profit −$10,000; "the lost leisure would also be an implicit cost"); MS5 (video 5.1: "We're going to be talking about maximizing economic profits ... which account for both the explicit and implicit costs") -->
<p>The two kinds of cost give two kinds of profit. ${dt('accounting-profit','<b>Accounting profit</b>')} is total revenue minus explicit costs: "the difference between dollars brought in and dollars paid out." ${dt('economic-profit','<b>Economic profit</b>')} subtracts implicit costs too.</p>
<div class="math">Accounting profit = total revenue − explicit costs<br>Economic profit = total revenue − explicit costs − implicit costs = accounting profit − implicit costs</div>
<p><b>Worked example: your course textbook\'s Fred.</b> Fred earns $125,000 a year at a law firm. His own practice would bring in $200,000, with $50,000 of office rent and a $35,000 law clerk.</p>
${fredTbl()}
<div class="math">Explicit costs = $50,000 + $35,000 = $85,000<br>Accounting profit = $200,000 − $85,000 = <b>$115,000</b><br>Economic profit = $200,000 − $85,000 − $125,000 = <b>−$10,000</b></div>
${FIG5.l20fred()}
<p>Check: economic profit is lower than accounting profit by exactly the implicit cost ($115,000 − $125,000 = −$10,000). The textbook adds that if Fred values his free time and would work longer hours, that lost leisure is one more implicit cost.</p>
${FIG5.l20lens()}
<p><b>So what:</b> from here on, "profit" in this unit means economic profit. Your course: firms maximize "economic profits," which "account for both the explicit and implicit costs."</p>
<div data-check="l20c-acc"></div>

<h2>Normal profit</h2>
<!-- src: CB (CLEP outline: Profit: normal profit); OS101 ("Remember that zero economic profit is not equivalent to zero accounting profit. A zero economic profit means the firm's accounting profit is equal to what its resources could earn in their next best use"); OS113 (regulators let a natural monopoly "earn a normal rate of profit"); ELPR (Thurow: "When profits are above the normal level, they attract additional investment, either by new firms or by existing firms"; "New investment enters until profits are competed down to the same level the investment could earn elsewhere") -->
<p>When economic profit is exactly zero, the owner is earning a ${dt('normal-profit','<b>normal profit</b>')}. Your course textbook: zero economic profit "means the firm\'s accounting profit is equal to what its resources could earn in their next best use."</p>
<div class="math">Normal profit: accounting profit = implicit costs, so economic profit = 0</div>
<p><b>Worked example: Fred again.</b> His implicit cost is the $125,000 salary. A normal profit for his practice would be an accounting profit of exactly $125,000. He expects $115,000, so he falls $10,000 short. At $125,000 he would be just as well off either way; above it he would gain by switching.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of two job offers that both pay $50,000. Taking either one leaves you no worse off than the other. You "profit" $0 over your best alternative, yet you still earn a full salary. Zero economic profit works the same way: the owner still earns a healthy accounting profit, just no more than her next best option.</p></div>
${FIG5.l20normal()}
<p><b>Why it matters:</b> economic profit is a signal. Above zero, the owner\'s resources earn more here than elsewhere, which draws in other investors. Below zero, the resources would do better somewhere else. Econlib\'s Thurow: "New investment enters until profits are competed down to the same level the investment could earn elsewhere." Lessons 24 and 28 show that process.</p>
<div data-check="l20c-norm"></div>

<h2>Sort the costs, then find both profits</h2>
<!-- src: MS5, OS71. Exam skill: classify costs as explicit or implicit, then compute accounting and economic profit. -->
<p>The CLEP likes a list of a firm\'s revenues and costs with a question about one of the two profits. The move: sort each cost with one question (does money leave the business?), add up each pile, then subtract.</p>
<div data-widget="costsort"></div>
<p>What to notice: the same thing can create both kinds of cost. Savings spent on equipment are explicit; the interest those savings no longer earn is implicit.</p>
<div data-check="l20c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L20TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Implicit costs aren\'t real costs, because no money is paid."</span>They are opportunity costs: the owner really gives up the next best use of her time, money or property.</li>
<li><span class="wrong">"Accounting profit and economic profit are the same number."</span>Economic profit also subtracts implicit costs, so it is lower whenever there are any (Fred: $115,000 vs −$10,000).</li>
<li><span class="wrong">"Zero economic profit means the owner earns nothing."</span>It is a normal profit: accounting profit equal to what her resources could earn elsewhere.</li>
<li><span class="wrong">"Borrowing must cost more than using your own savings."</span>Your own money gives up interest too. At the same rate the economic cost is the same: Caroline\'s $315,000 both ways.</li>
<li><span class="wrong">"A positive accounting profit proves the business is worth running."</span>Only if it covers the implicit costs too. Fred earns $115,000 on paper but would do $10,000 better at his old job.</li>
<li><span class="wrong">"Normal profit means the average profit in the industry."</span>It means zero economic profit: just enough accounting profit to cover the owner\'s implicit costs.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>Firms aim to maximize <b>profit</b> = total revenue − total cost, and economists count economic costs.</li>
<li><b>Explicit costs</b> are money paid out; <b>implicit costs</b> are the opportunity costs of the owner\'s own resources.</li>
<li>Your course\'s <b>Caroline</b> faces an economic cost of $315,000 whether she borrows or uses savings, because both ways cost her 5% a year.</li>
<li><b>Accounting profit</b> = revenue − explicit costs; <b>economic profit</b> = accounting profit − implicit costs (Fred: $115,000 and −$10,000).</li>
<li><b>Normal profit</b> means economic profit is zero: accounting profit just covers implicit costs. Positive economic profit attracts investment.</li>
<li>On the exam, sort each cost by asking whether money leaves the business, then subtract each pile.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Accounting versus economic profits" and "Normal profit" under Profit, in Firm behavior and market structure (23% to 33% of the exam). Expect a list of revenue and costs asking for accounting or economic profit, or a question about what zero economic profit means.</p>
</div>`,
  deeper:`
<h3>Depreciation and other hidden costs</h3>
<p>Your course textbook notes that implicit costs "also allow for depreciation of goods, materials, and equipment." A delivery van the owner already has wears out each year it is used; that loss of value is a cost of running the business even though no one is paid for it.</p>
<h3>Why profits differ with risk</h3>
<p>Econlib\'s Thurow: "Some profits are a return to those who take risks," so "investors who are willing to invest in risky ventures earn more than those who invest in less risky ones." A normal profit for a risky startup is higher than for a safe one, because the owner\'s next best use of the money includes safer options.</p>
<h3>Where this goes next</h3>
<p>Lesson 21 asks how much a firm should produce to make economic profit as large as possible. Lessons 24 and 28 show how entry and exit push economic profit toward zero, the normal profit, in competitive markets.</p>`,
  links:[ {k:'Textbook',t:'7.1 Explicit and Implicit Costs, and Accounting and Economic Profit',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/7-1-explicit-and-implicit-costs-and-accounting-and-economic-profit',w:'The newer edition of your course textbook\'s section, with Fred\'s law practice worked step by step.'},
          {k:'Article',t:'Profits',s:'Econlib (Lester C. Thurow)',u:'https://econlib.org/library/Enc1/Profits.html',w:'A short encyclopedia entry on what profits are for: normal profits, risk and why high profits attract investment.'},
          {k:'Exam',t:'CLEP Principles of Microeconomics outline',s:'College Board',u:'https://clep.collegeboard.org/exam/microeconomics',w:'See "Profit" at the top of the Firm behavior and market structure section, the exam\'s largest.'} ]
});
