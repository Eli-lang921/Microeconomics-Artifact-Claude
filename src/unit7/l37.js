/* ===== Lesson 37 figures ===== */
/* Your course's 2014 average incomes (Module 7.3 slides, from inequality.org): bottom 90%, top 10%, top 5%, top 1%, top 0.1%.
   Multiples of the bottom 90% average (checked by script): 8.9, 13.6, 38.1, 184.1. Course slip: the video says the top 5% "earned $440,000"; the slide says $448,489. */
const INC14 = [['Bottom 90%',33068],['Top 10%',295845],['Top 5%',448489],['Top 1%',1260508],['Top 0.1%',6087113]];
/* Your course's real weekly wages, 1979 and 2014 (video 7.3): median $733 → $791 (+7.9%); bottom 10% $383 → $379 (−1.0%). */
/* Your course textbook's quintile shares (§14.4, Table 14.6), 1980 and 2013; cumulative shares are the Lorenz points.
   Gini estimated from the five points by the trapezoid rule, G = 1 − Σ 0.2 × (Y(k−1) + Y(k)): 1980 ≈ 0.38, 2013 ≈ 0.44 (my calculation; checked by script). */
const Q80 = [4.2,10.2,16.8,24.7,44.1], Q13 = [3.2,8.4,14.4,23.0,51.0];
const cumOf = sh => sh.reduce((a,s)=>{ a.push(Math.round(((a.length?a[a.length-1]:0)+s)*10)/10); return a; }, []);
const giniQ = sh => { const Y = [0, ...cumOf(sh).map(v=>v/100)]; let s = 0; for(let i=0;i<5;i++) s += 0.2*(Y[i]+Y[i+1]); return Math.round((1-s)*1000)/1000; };

/* Lorenz chart on a 0-100 grid. sets: [{sh, label, c, dash}]; shade: shade the gap between the line of equality and the first curve (area A). */
function u7lorenz(sets, { aria='Lorenz curve', shade=false, ab=false }={}){
  const lines = [ {a:[0,0],b:[100,100],c:'var(--muted)',dash:'5 4',w:2,label:'Perfect equality',lx:-4,ly:-8,anchor:'end'} ];
  const areas = [];
  sets.forEach((s,k) => { const pts = [[0,0], ...cumOf(s.sh).map((v,i)=>[(i+1)*20, v])]; lines.push({ pts, c:s.c||'var(--accent)', dash:s.dash||'', label:s.label, lx:-6, ly: k ? 16 : -8, anchor:'end' });
    if(shade && !k) areas.push({ pts:[...pts, ...[...pts].reverse().map(([x])=>[x,x])], c:'var(--g2)', o:0.3, label: ab ? [52,40,'A'] : undefined });
    if(ab && !k) areas.push({ pts:[...pts, [100,0]], c:'var(--accent)', o:0.15, label:[78,18,'B'] }); });
  return sdg({ xmax:100, ymax:100, xt:[0,20,40,60,80,100], yt:[0,20,40,60,80,100], xlab:'Cumulative % of households (poorest first)', ylab:'Cumulative % of income', aria, lines, areas,
    dots: sets.length ? cumOf(sets[0].sh).map((v,i)=>({ q:(i+1)*20, p:v, c:sets[0].c||'var(--accent)' })) : [] });
}
/* Small Lorenz pictures for answer choices: curve y = x^k on the unit square (k = 1 is the equality line; k < 1 draws a curve above it, an impossible distractor). */
const LDESC = { 3:'a curve that bows far below the diagonal', 1.8:'a curve that bows moderately below the diagonal', 1.3:'a curve just below the diagonal', 1:'the curve lies on the diagonal', 0.6:'a curve above the diagonal' };
function u7lmini(k, aria){ const pts = [...Array(11)].map((_,i)=>[i, 10*Math.pow(i/10,k)]);
  return u6mini({ lines:[{a:[0,0],b:[10,10],c:'var(--muted)',dash:'4 3',w:1.6}, {pts, c:'var(--accent)'}], xlab:'Cum. % households', ylab:'Cum. % income', aria: aria || 'Graph' }); }
const lorChoice = (k, ok) => ({ svg: L => u7lmini(k, 'Graph ' + L), desc: LDESC[k], ok: !!ok });

/* L37 V1: poverty vs inequality (textbook §14.1 and §14.4 Clear It Up) */
FIG7.l37two = () => fig(`<div class="u3pair">
  <div class="u3card"><p class="u3h">Poverty</p><p><b>Measures:</b> how many people fall below a fixed income line (the poverty line)</p><p><b>U.S. line:</b> about three times the cost of a nutritionally adequate diet, adjusted for family size and prices (Mollie Orshansky, 1963)</p><p>If everyone\'s income rises 10%, poverty falls.</p></div>
  <div class="u3card"><p class="u3h">Income inequality</p><p><b>Measures:</b> how total income is <b>shared</b> among groups, rich to poor</p><p><b>Tools:</b> shares by group, the Lorenz curve, the Gini coefficient</p><p>If everyone\'s income rises 10%, inequality doesn\'t change.</p></div></div>`,
  'Your course textbook\'s distinction. The two can move separately: a rise in all incomes cuts poverty but leaves shares the same; a rise in only the highest incomes raises inequality but leaves the poverty count the same.');

/* L37 V2: 2014 average incomes, as multiples of the bottom 90% (Module 7.3 slides) */
FIG7.l37inc = () => fig(atable(['Group (2014)','Average income','Times the bottom 90% average'],
  INC14.map(([g,v],i)=>[g, usd7(v), i ? (Math.round(v/INC14[0][1]*10)/10)+'×' : '1×']), { cls:'compact', hl:{3:{row:'u3z2'}} }),
  'Your course\'s slides (2014 data from inequality.org). The last column divides each average by $33,068. The top 1% averaged about 38 times the bottom 90%; the top 0.1%, about 184 times. A bar chart on one scale would make the bottom 90% bar almost invisible.');

/* L37 V3: real weekly wages, 1979 vs 2014 (video 7.3) */
FIG7.l37wage = () => fig(`<div class="u2row"><div class="u2cell">${hbars([['Median worker, 1979',733,'var(--line)'],['Median worker, 2014',791,'var(--accent)'],['Bottom 10%, 1979',383,'var(--line)'],['Bottom 10%, 2014',379,'var(--bad)']], { max:900, left:160, fmt:v=>'$'+v })}</div></div>
  <div class="math">Median: ($791 − $733) ÷ $733 = <b>+7.9%</b> in 35 years<br>Bottom 10%: ($379 − $383) ÷ $383 = <b>−1.0%</b></div>`,
  'Your course\'s real (inflation-adjusted) weekly wages. "Real" means the 1979 dollars are converted to 2014 buying power, so the comparison is fair. Your course adds that the top 10%\'s real wages rose steadily over the same years.');

/* L37 V4: poverty and food insecurity, 2014 (Module 7.3 slides, from Feeding America) */
FIG7.l37pov = () => fig(`<div class="u2row"><div class="u2cell">${hbars([['All people in poverty',14.8,'var(--accent)'],['Children under 18',21.1,'var(--bad)'],['Seniors 65 and older',10,'var(--accent)'],['Food-insecure households',14,'var(--g2)'],['Households with children',19,'var(--g2)']], { max:25, left:170, fmt:v=>v+'%' })}</div></div>`,
  'Your course\'s 2014 figures: 46.7 million people (14.8%) in poverty, including 15.5 million children (21.1%) and 4.6 million seniors (10%); 48.1 million people in food-insecure households. Notice children have the highest rate, as do households with children for food insecurity (19% vs 12% for all households).');

/* L37 V5: quintile shares to cumulative shares (textbook Table 14.6) */
FIG7.l37cum = () => fig(atable(['Quintile','1980','Cum. 1980','2013','Cum. 2013'],
  ['1st','2nd','3rd','4th','5th'].map((q,i)=>[q, Q80[i]+'%', `<b>${cumOf(Q80)[i]}%</b>`, Q13[i]+'%', `<b>${cumOf(Q13)[i]}%</b>`]), { cls:'compact', hl:{1:{row:'u3z2'}} }),
  'Your course textbook\'s Table 14.6, poorest quintile (1st) to richest (5th): each quintile\'s share of income and the cumulative ("Cum.") share. Each cumulative number adds that quintile\'s share to all poorer ones: in 2013 the bottom 40% received 3.2 + 8.4 = 11.6% of income. The last row is always 100%. The cumulative columns are the points of the Lorenz curve.');

/* L37 V6: the Lorenz curves (textbook Figure 14.8) */
FIG7.l37lor = () => fig(u7lorenz([{sh:Q13,label:'2013',c:'var(--bad)'},{sh:Q80,label:'1980',c:'var(--accent)',dash:'6 3'}], { aria:'Lorenz curves for 1980 and 2013 below the line of perfect equality' }),
  'Your course textbook\'s Figure 14.8, drawn from Table 14.6. The dashed diagonal is perfect equality: the bottom 20% get 20%, the bottom 40% get 40%, and so on. The 2013 curve bows farther below it than the 1980 curve, so income became less equal. (The textbook\'s caption says 2011; its table says 2013.)');

/* L37 V7: the Gini coefficient as areas (FRED series notes; BEA primer) */
FIG7.l37gini = () => fig(u7lorenz([{sh:Q13,label:'Lorenz curve (2013)',c:'var(--bad)'}], { shade:true, ab:true, aria:'Gini coefficient: area A between the equality line and the Lorenz curve, area B below the curve' }) +
  `<div class="math">Gini coefficient = A ÷ (A + B)<br>Perfect equality: the curve is the diagonal, A = 0 → Gini = <b>0</b><br>One household gets everything: B = 0 → Gini = <b>1</b><br>Textbook 2013 quintiles: Gini ≈ <b>0.44</b> (1980: ≈ 0.38), my estimate from the five points</div>`,
  'Area A is the gap between perfect equality and the actual Lorenz curve; A + B is the whole triangle under the diagonal. FRED: the Gini index is "the area between the Lorenz curve and a hypothetical line of absolute equality, expressed as a percentage of the maximum area." A bigger gap means a bigger Gini and more inequality.');

/* L37 V8: why wages of skilled workers rose (textbook Figure 14.9; made-up lines) */
/* Lines: S0 p = q; S1 p = q − 2; D0 p = 7 − q; D1 p = 12 − q. E0 = (3.5, 3.5); E1 = (7, 5) (checked by script). */
FIG7.l37skill = () => fig(sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Quantity of high-skilled labor', ylab:'Wage', aria:'Supply and demand for high-skilled labor both shift right; wage rises',
  lines:[ {a:[1,1],b:[8,8],c:OLD,dash:'5 4',w:2,label:'S0',lx:-4,ly:-6,anchor:'end'}, {a:[3,1],b:[10,8],c:SC,label:'S1',lx:-4,ly:16,anchor:'end'}, {a:[0,7],b:[7,0],c:OLD,dash:'5 4',w:2,label:'D0',lx:-4,ly:-8,anchor:'end'}, {a:[2.5,9.5],b:[10,2],c:DC,label:'D1',lx:-4,ly:-8,anchor:'end'} ],
  vls:[{q:3.5,p:3.5},{q:7,p:5}], hl:[{p:3.5,q:3.5,c:'var(--muted)'},{p:5,q:7,c:'var(--g2)'}], labels:[[0.3,3.85,'W0','var(--muted)','start'],[0.3,5.35,'W1','var(--g2)','start']],
  dots:[ {q:3.5,p:3.5,c:'var(--muted)'}, {q:7,p:5,c:'var(--ink)'} ] }),
  'Your course textbook\'s Figure 14.9 with made-up lines. More college graduates shifted supply right (S0 to S1), which alone would lower the wage. The wage rose anyway, so demand must have shifted right by more (D0 to D1), driven by new technology and globalization. The dots mark the old and new equilibrium; the wage rises from W0 to W1.');

/* L37 V9: the sources of inequality (textbook §14.4 and §14.5; Lesson 29) */
FIG7.l37src = () => fig(atable(['Source','How it widens the gap','Course or textbook'], [
  ['Differences in skills and productivity','Workers with more education, experience or better tools have a higher marginal product and earn more','Lesson 29 (video 6.1); textbook §14.4'],
  ['Demand for skill rising faster than supply','Technology and globalization raise the demand for high-skilled workers; "winner-take-all" markets for stars','Textbook §14.4'],
  ['Changing households','More two-high-earner couples at the top and single-parent households at the bottom: about half the rise in household inequality','Textbook §14.4'],
  ['Age and choices','Earnings are low early in a career, peak in middle age and fall in retirement; people choose different work-leisure trade-offs','Textbook §14.5'],
  ['Wealth and inheritance','Wealth (assets minus debts) is more unequal than income; differences build up and can pass to children','Textbook §14.5']
], { cls:'compact wrap' }), 'The main sources your course textbook gives, plus Lesson 29\'s link between pay and marginal product. Several sources are not unfair in themselves (age, choices); others raise harder questions (unequal starting points).');

/* L37 V10: a negative income tax, worked (Econlib, Allen) */
FIG7.l37nit = () => fig(`<div class="u4io"><div class="u3step"><b>Threshold</b><br>$10,000</div><div class="u3arrow" aria-hidden="true">−</div><div class="u3step"><b>Family\'s income</b><br>$8,000</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step"><b>Gap</b><br>$2,000</div><div class="u3arrow" aria-hidden="true">×</div><div class="u3step"><b>Negative tax rate</b><br>25%</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>Payment</b><br>$500</div></div>
  <div class="math">Zero income: 25% × $10,000 = <b>$2,500</b> (the guarantee)<br>Each extra $1 earned cuts the payment by only $0.25, so the family keeps <b>$0.75</b> of it</div>`,
  'Econlib\'s example of a negative income tax: below the threshold the family receives money from the tax system instead of paying. Because the payment shrinks slowly, working more always raises total income.');

/* L37 V11: the trade-off (textbook Figure 14.10 in words) */
FIG7.l37trade = () => fig(flow([
  {split:[[{t:'More redistribution: higher taxes on high earners, bigger benefits that shrink fast as income rises',c:'u3up'}],[{t:'Some programs, like public education, can raise both equality and output',c:'u3up'}]]},
  'Big benefit cuts per dollar earned (up to $1 for $1: the poverty trap) and very high taxes weaken the reward for work and for starting firms.',
  {t:'Society chooses a point on a <b>trade-off between equality and output</b>; well-designed programs (slow phase-outs, education) soften it.',c:'u3end'}
]), 'Your course textbook\'s two views of the trade-off. The standard view: more equality costs some output. The alternative: some policies can raise both. Your course\'s own view is that current U.S. programs don\'t do enough to reduce inequality; people disagree about how much redistribution is right.');

/* ===== Lesson 37: Income Inequality, Poverty, the Lorenz Curve and the Gini Coefficient (video 7.3; Module 7.3 slides) =====
   Common mistakes: M1 poverty and inequality are the same thing · M2 a Lorenz curve farther from the diagonal means more equality
   M3 a Gini of 1 means perfect equality · M4 the Lorenz curve plots each group's own share, not the cumulative share
   M5 inequality has only one cause (only unfairness, or only effort) · M6 anti-poverty programs never affect work incentives */
const qTbl = (sh, yr='') => atable(['Quintile','Share of income'+(yr?' ('+yr+')':'')], ['First (poorest)','Second','Third','Fourth','Fifth (richest)'].map((q,i)=>[q, sh[i]+'%']), { cls:'compact' });

mc('l37-def','l37','Which of the following best describes income inequality?',
  [`The uneven distribution of income across a population, such as the gap between the rich and everyone else`,`The number of people below the poverty line`,`The difference between a worker\'s wage and the price of what he makes`,`A fall in average income`,`The gap between a country\'s exports and imports`],0,
  `<p>Your course: "Income inequality refers to the uneven distribution of income across the population. It looks at the gap between the rich and everyone else." Counting people below the poverty line measures poverty, a different idea (M1).</p>`);
mc('l37-pov','l37','Made-up scenario. Every household\'s income rises by exactly 10%. What happens to poverty and to income inequality?',
  [`Poverty falls; inequality is unchanged`,`Poverty and inequality both fall`,`Poverty is unchanged; inequality falls`,`Poverty and inequality both rise`,`Poverty rises; inequality is unchanged`],0,
  `<p>Your textbook: "a general rise in income levels over time would keep inequality the same, but reduce poverty." Everyone\'s share of total income stays the same, so inequality doesn\'t change, but some households rise above the fixed poverty line (M1).</p>${FIG7.l37two()}`);
mc('l37-data','l37',`Average incomes in the United States in 2014:${atable(['Group','Average income'], INC14.map(([g,v])=>[g, usd7(v)]), { cls:'compact' })}About how many times the bottom 90%\'s average was the top 1%\'s average?`,
  [`About 4 times`,`About 9 times`,`About 14 times`,`About 38 times`,`About 184 times`],3,
  `<p>$1,260,508 ÷ $33,068 ≈ <b>38</b>. About 9 times is the top 10%, about 14 the top 5%, and about 184 the top 0.1%.</p>${FIG7.l37inc()}`);
mc('l37-wage','l37','Between 1979 and 2014, the median U.S. worker\'s real weekly wage rose from $733 to $791, and the bottom 10%\'s fell from $383 to $379. About how much did the median real wage rise, in percent?',
  [`About −1%`,`About 1%`,`About 8%`,`About 58%`,`About 108%`],2,
  `<p>($791 − $733) ÷ $733 = $58 ÷ $733 ≈ <b>7.9%</b> over 35 years. 58% mistakes the dollar change for a percentage; −1% is the bottom 10%\'s change.</p>${FIG7.l37wage()}<p>"Real" means adjusted for inflation, so these are changes in buying power.</p>`);
mc('l37-quint','l37',`U.S. household income shares by quintile in 2013:${qTbl(Q13)}What share of all income went to the richest fifth of households?`,
  [`3.2%`,`20%`,`23.0%`,`49.0%`,`51.0%`],4,
  `<p>The fifth (richest) quintile received <b>51.0%</b>, over half of all income. Your textbook: "the top 20% of householders (the fifth quintile) received over half (51%) of all the income." 20% is what it would get with perfect equality; 49.0% is the cumulative share of the bottom 80%.</p>`);
mc('l37-cum','l37',`U.S. household income shares by quintile in 2013:${qTbl(Q13)}What point on the Lorenz curve corresponds to the bottom 40% of households?`,
  [`40% of households receive 8.4% of income`,`40% of households receive 11.6% of income`,`40% of households receive 40% of income`,`40% of households receive 26.0% of income`,`40% of households receive 14.4% of income`],1,
  `<p>The Lorenz curve uses <b>cumulative</b> shares: the bottom 40% get the first plus the second quintile, 3.2 + 8.4 = <b>11.6%</b>. 8.4% is the second quintile alone (M4); 40% would be perfect equality; 26.0% is the bottom 60%.</p>${FIG7.l37cum()}`);
gen('l37-g-cum','l37',()=>{
  let sh; do { const a = pick([2,3,4,5]), b = a + pick([3,4,5,6]), c = b + pick([4,5,6,7]), d = c + pick([6,8,10]); sh = [a,b,c,d,100-a-b-c-d]; } while(sh[4] <= sh[3] || sh[4] > 70);
  const k = pick([2,3,4]), cum = cumOf(sh), ans = cum[k-1];
  return { type:'num', kind:'num', unit:'%', prompt:`Made-up numbers. A country\'s income shares by quintile are:${qTbl(sh)}On its Lorenz curve, what cumulative percentage of income goes to the poorest <b>${k*20}%</b> of households?`, answer:ans,
    explain:`<div class="math">Bottom ${k*20}% = ${sh.slice(0,k).join(' + ')} = <b>${ans}%</b></div><p>The common slip is giving only the ${['','','second','third','fourth'][k]} quintile\'s own share, ${sh[k-1]}% (M4).</p>${fig(u7lorenz([{sh,label:'This country',c:'var(--bad)'}], { aria:'Marked-up Lorenz curve for the generated country' }), `Marked up: the point above ${k*20}% is at ${ans}%. Each point adds one more quintile\'s share.`)}`
  };
});
lazy('l37-gr-lor','l37',()=>visMC({
  prompt:`Each graph shows a country\'s Lorenz curve (solid) and the diagonal line (dashed). The horizontal axis is the cumulative percentage of households, poorest first; the vertical axis is the cumulative percentage of income. Which country has the <b>most unequal</b> distribution of income?`,
  choices:[ lorChoice(3,true), lorChoice(1.8), lorChoice(1.3), lorChoice(1), lorChoice(0.6) ],
  explain: L => `<p><b>Graph ${L}</b>: its curve bows farthest below the line of perfect equality.</p>${FIG7.l37lor()}<p>Your textbook: "a more unequal distribution of income will loop farther down and away from the 45-degree line." A curve on the diagonal is perfect equality (M2); a curve above the diagonal is impossible, since the poorest households can\'t have more than their share.</p>`
}));
mc('l37-axes','l37','What does a Lorenz curve measure on its two axes?',
  [`Cumulative percentage of households (poorest first) across the bottom; cumulative percentage of income up the side`,`Income in dollars across the bottom; number of households up the side`,`Each quintile\'s own share of income across the bottom; time up the side`,`Price across the bottom; quantity up the side`,`Wealth across the bottom; poverty rate up the side`],0,
  `<p>Your textbook: "The Lorenz curve shows the cumulative share of population on the horizontal axis and the cumulative percentage of total income received on the vertical axis." Both run from 0 to 100% (M4).</p>`);
mc('l37-gini','l37','Which of the following is true of the Gini coefficient?',
  [`It ranges from 0 (perfect equality) to 1 (one household has all the income)`,`It ranges from 0 (one household has everything) to 1 (perfect equality)`,`It equals the share of income going to the top quintile`,`A higher value means income is more equal`,`It measures the number of people in poverty`],0,
  `<p>The Bureau of Economic Analysis: the Gini "value ranges from 0 to 1, where: 0 represents perfect equality ... 1 represents perfect inequality—one person has all the income." Higher means <b>less</b> equal (M3). FRED reports it on a 0 to 100 scale.</p>`);
gen('l37-g-gini','l37',()=>{
  const tot = 5000, A = pick([1000,1500,1750,2000,2250,2500]), B = tot - A, ans = Math.round(A/tot*100)/100;
  return { type:'num', kind:'num', unit:'', prompt:`Made-up numbers. On a country\'s Lorenz diagram, the area between the line of perfect equality and the Lorenz curve (area A) is <b>${A.toLocaleString('en-US')}</b> square units, and the area below the Lorenz curve (area B) is <b>${B.toLocaleString('en-US')}</b>. What is the Gini coefficient? (Give a decimal between 0 and 1.)`, answer:ans,
    explain:`<div class="math">Gini = A ÷ (A + B) = ${A.toLocaleString('en-US')} ÷ ${tot.toLocaleString('en-US')} = <b>${ans}</b></div><p>The common slip is A ÷ B = ${(Math.round(A/B*100)/100)}, which divides by the wrong area. A + B is the whole triangle under the line of equality. On FRED\'s 0 to 100 scale this would be ${Math.round(ans*100)}.</p>${FIG7.l37gini()}`
  };
});
mc('l37-sources','l37','The supply of U.S. college graduates rose a great deal in recent decades, yet the wages of high-skilled workers also rose. Which of the following best explains this?',
  [`The demand for high-skilled labor increased even more than the supply, driven by new technology and globalization`,`The supply of high-skilled labor fell`,`The demand for high-skilled labor fell`,`The minimum wage rose`,`Higher supply always raises wages`],0,
  `<p>A rightward supply shift alone would lower the wage. The textbook: "the increase in the price of high-skilled labor must be explained by a greater demand," mainly from information technology and globalization. Lesson 32\'s supply-and-demand reasoning applies (M5).</p>${FIG7.l37skill()}`);
mc('l37-nit','l37','Under a negative income tax with a threshold of $10,000 and a negative tax rate of 25%, how much would a family with $8,000 of income receive?',
  [`$500`,`$2,000`,`$2,500`,`$6,000`,`$8,000`],0,
  `<p>Payment = 25% × ($10,000 − $8,000) = 25% × $2,000 = <b>$500</b>, Econlib\'s example. $2,500 is what a family with zero income would get; $2,000 is the gap before applying the rate.</p>${FIG7.l37nit()}`);
mc('l37-trap','l37','A program guarantees a family $18,000 a year and cuts its aid by $1,000 for every $1,000 the family earns. Why is this called a poverty trap?',
  [`Working more doesn\'t raise the family\'s total income until earnings pass $18,000, so there is little reason to work`,`The family can never receive more than $18,000`,`The aid is paid as food instead of cash`,`The family must work 2,000 hours to get any aid`,`The aid grows when the family earns more`],0,
  `<p>The textbook: "every time a poor person earns $100, the person loses $100 in government support. As a result, the person experiences no net gain for working." That is why programs like the earned income tax credit and a negative income tax phase out slowly (M6).</p>`);
/* L37 more */
mc('l37-top01','l37','In 2014, the top 0.1% of U.S. earners averaged $6,087,113 and the bottom 90% averaged $33,068. About how many times larger is the first number?',
  [`About 18 times`,`About 38 times`,`About 100 times`,`About 184 times`,`About 1,840 times`],3,
  `<p>$6,087,113 ÷ $33,068 ≈ <b>184</b>. About 38 times is the top 1%.</p>${FIG7.l37inc()}`);
mc('l37-child','l37','In 2014, 14.8% of all Americans, 21.1% of children under 18 and 10% of people 65 and older were in poverty. Which group had the highest poverty rate?',
  [`Children under 18`,`People 65 and older`,`All people taken together`,`The answer can\'t be told from these figures`,`All three groups had the same rate`],0,
  `<p>Your course: 15.5 million children, 21.1%, were in poverty, and it calls this "one of the highest poverty rates for children across the advanced economy world." Seniors were at 10%.</p>${FIG7.l37pov()}`);
mc('l37-orsh','l37','How did Mollie Orshansky define the U.S. poverty line in 1963?',
  [`The cost of a nutritionally adequate diet for a family of that size, times three`,`Half of the average income`,`The income of the poorest 10% of households`,`The minimum wage times 2,000 hours`,`The average rent for a two-bedroom apartment`],0,
  `<p>The textbook: she "found that the average family spent one-third of its income on food" and proposed "the amount needed to buy a nutritionally adequate diet, given the size of the family, multiplied by three." The line is adjusted each year for prices.</p>`);
tf('l37-tf-far','l37','A Lorenz curve that lies farther below the 45-degree line shows a more equal distribution of income.',false,
  `<p>False. The 45-degree line is perfect equality, so distance below it measures <b>inequality</b>. Your textbook: "a more unequal distribution of income will loop farther down and away from the 45-degree line" (M2).</p>`);
mc('l37-time','l37','A country\'s Lorenz curve for 2013 lies farther from the 45-degree line than its Lorenz curve for 1980. What does that show, and what happened to its Gini coefficient?',
  [`Income became less equal, so the Gini coefficient rose`,`Income became more equal, so the Gini fell`,`Income became less equal, so the Gini fell`,`Poverty rose, but inequality was unchanged`,`Nothing can be said without dollar incomes`],0,
  `<p>Farther from the line means more area between the line and the curve, so a larger Gini. Estimated from the textbook\'s five quintile points, the Gini rose from about 0.38 to about 0.44 (M2, M3).</p>${FIG7.l37lor()}`);
gen('l37-g-ginq','l37',()=>{
  const sets = [[4.2,10.2,16.8,24.7,44.1],[3.2,8.4,14.4,23.0,51.0],[5,10,15,25,45],[2,6,12,20,60],[6,12,18,24,40],[10,15,20,25,30]];
  const sh = pick(sets), cum = cumOf(sh), g = giniQ(sh), area = Math.round((1-g)*1000)/1000;
  return { type:'num', kind:'num', unit:'', prompt:`Made-up or textbook numbers. Income shares by quintile are:${qTbl(sh)}On the unit square (each axis from 0 to 1), the area under the line of equality is 0.5. Using straight lines between the Lorenz points, the area under this Lorenz curve is ${(area/2).toFixed(4)}. Estimate the Gini coefficient to two decimals.`, answer: Math.round(g*100)/100,
    explain:`<div class="math">A = 0.5 − ${(area/2).toFixed(4)} = ${((1-area)/2).toFixed(4)}<br>Gini = A ÷ 0.5 = <b>${(Math.round(g*100)/100).toFixed(2)}</b></div><p>Same rule as A ÷ (A + B): the whole area under the diagonal is A + B = 0.5. The common slip is dividing by 1 instead of 0.5, which halves the answer. Cumulative points: ${cum.join(', ')}.</p>${fig(u7lorenz([{sh,label:'Lorenz curve',c:'var(--bad)'}], { shade:true, ab:true, aria:'Marked-up Lorenz areas' }), 'Marked up: A is the shaded gap; A + B is the triangle under the diagonal.')}`
  };
});
mc('l37-house','l37','Economists estimate that changes in family structure (more two-high-earner couples and more single-parent households) explain about how much of the rise in U.S. household income inequality in recent decades?',
  [`Roughly half`,`None of it`,`All of it`,`About 5%`,`About 90%`],0,
  `<p>The textbook: these changes "account for roughly half of the rise in income inequality across households in recent decades." The other main explanation is a shift toward greater inequality of wages (M5).</p>`);
mc('l37-winner','l37','What do economists mean by "winner-take-all" labor markets?',
  [`Technology raises the global demand for the very best performers, pushing their pay far above others\'`,`Only one worker in each market gets a job`,`Unions set the same wage for everyone`,`The government chooses which workers win`,`Workers bid down each other\'s wages`],0,
  `<p>The textbook: "Winner-take-all labor markets result from changes in technology, which have increased global demand for \'stars,\'—whether the best CEO, doctor, basketball player, or actor." It is one source of wider wage gaps (M5).</p>`);
mc('l37-age','l37','Why would a society with people of many ages have some income inequality in any one year, even if lifetime earnings were similar?',
  [`People earn little early in their careers, more in middle age and less after retirement, so a population of mixed ages has some inequality`,`Equality is illegal`,`Everyone prefers the same amount of work`,`Inequality has no effect on poverty`,`Incomes never change over a lifetime`],0,
  `<p>The textbook: "most workers receive relatively low earnings in their first few jobs, higher earnings as they reach middle age, and then lower earnings after retirement." It adds that preferences differ: some choose long hours for more income (M5).</p>`);
mc('l37-wealth','l37','How does wealth differ from income?',
  [`Income is a flow received over a period; wealth is the value of all assets minus debts at a point in time`,`They are the same thing`,`Wealth is income after taxes`,`Income includes the value of a home; wealth does not`,`Wealth is always more equally distributed than income`],0,
  `<p>The textbook: "Income is a flow of money received ... wealth is the sum of the value of all assets ... all debts must be subtracted." In the U.S., wealth is <b>more</b> unequal than income, because income differences build up over time.</p>`);
mc('l37-inkind','l37','Which of the following is an in-kind transfer?',
  [`Food assistance (SNAP) used to buy groceries`,`A cash payment from the earned income tax credit`,`A higher minimum wage`,`A tax refund`,`A raise from an employer`],0,
  `<p>An in-kind transfer gives goods or services rather than cash. SNAP ("food stamps") gives a card that can be used to buy food; your textbook also describes Medicaid. The EITC is paid in money through the tax system.</p>`);
mc('l37-eitc','l37','Why do economists often favor the earned income tax credit (EITC)?',
  [`It raises the payoff to working and phases out slowly, avoiding the poverty trap`,`It pays the same amount whether or not a person works`,`It cuts benefits by $1 for every $1 earned`,`It is paid only to people with no income`,`It is a tax on low-wage workers`],0,
  `<p>The textbook: the EITC is popular "because of the way it effectively increases the payment received for work," and "is phased out slowly": in 2013, for a single parent of two, the credit fell by 21.06 cents per dollar earned above $17,530 (M6).</p>`);
gen('l37-g-nit','l37',()=>{
  const T = pick([10000,12000,15000,20000]), r = pick([25,40,50]), inc = pick([0,2000,4000,5000,6000,8000].filter(x=>x<T));
  const pay = r/100*(T-inc);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Under a negative income tax, the threshold is <b>$${T.toLocaleString('en-US')}</b> and the negative tax rate is <b>${r}%</b>. A family earns <b>$${inc.toLocaleString('en-US')}</b>. How much does it receive from the tax system?`, answer:pay,
    explain:`<div class="math">Payment = ${r}% × ($${T.toLocaleString('en-US')} − $${inc.toLocaleString('en-US')}) = ${r}% × $${(T-inc).toLocaleString('en-US')} = <b>$${pay.toLocaleString('en-US')}</b><br>Total income = $${inc.toLocaleString('en-US')} + $${pay.toLocaleString('en-US')} = $${(inc+pay).toLocaleString('en-US')}</div><p>The common slip is applying the rate to the family\'s income (${r}% × $${inc.toLocaleString('en-US')}) instead of to the gap below the threshold. Each extra dollar earned cuts the payment by only ${r} cents, so working more still pays (M6).</p>${fig(`<div class="u4io"><div class="u3step"><b>Threshold</b><br>$${T.toLocaleString('en-US')}</div><div class="u3arrow" aria-hidden="true">−</div><div class="u3step"><b>Income</b><br>$${inc.toLocaleString('en-US')}</div><div class="u3arrow" aria-hidden="true">×</div><div class="u3step"><b>Rate</b><br>${r}%</div><div class="u3arrow" aria-hidden="true">=</div><div class="u3step u3end"><b>Payment</b><br>$${pay.toLocaleString('en-US')}</div></div>`, 'Marked up with these numbers: the rate applies to the gap below the threshold.')}`
  };
});
mc('l37-prog','l37','A progressive income tax is one where',
  [`People with higher incomes pay a higher percentage of their income in tax`,`Everyone pays the same dollar amount`,`Everyone pays the same percentage`,`People with lower incomes pay a higher percentage`,`Only businesses pay tax`],0,
  `<p>Your textbook: the federal income tax "is a progressive tax system designed in such a way that the rich pay a higher percent in income taxes than the poor." It pays for many antipoverty programs, so it redistributes income too.</p>`);
mc('l37-trade','l37','What is the main concern about pushing redistribution very far?',
  [`Very high taxes and fast-shrinking benefits can weaken incentives to work and start businesses, reducing output`,`Redistribution always increases output`,`Redistribution has no effect on anyone\'s choices`,`It would make poverty rise in every case`,`It is impossible to measure inequality`],0,
  `<p>The textbook: policies "if carried to extremes, can injure incentives for economic output," and "An extremely high degree of redistribution, with very high taxes on the rich, would be likely to discourage work and entrepreneurship." It adds that some policies, like public education, may raise both equality and output (M6).</p>${FIG7.l37trade()}`);
mc('l37-minwage','l37','Using Lesson 8\'s price floor analysis, which statement about a minimum wage set above the market wage is the most accurate?',
  [`Workers who keep their jobs earn more, but if the minimum is above the market wage, fewer workers may be hired`,`A minimum wage always raises employment`,`A minimum wage has no effect if it is above the market wage`,`A minimum wage lowers pay for every worker`,`A minimum wage is an in-kind transfer`],0,
  `<p>A minimum wage above the market wage is a price floor in the labor market (Lessons 8 and 32): pay rises for those employed, but the quantity of labor demanded falls. Econlib\'s Linda Gorman stresses the job losses; how large they are is debated, which is why the policy is controversial.</p>`);
/* ===== Lesson 37 quick checks ===== */
mc('l37c-def','l37','Made-up scenario. Over a decade, incomes of the top 10% double while everyone else\'s stay the same. Which statement is true?',
  [`Income inequality rose, but the number of people below a fixed poverty line didn\'t change`,`Poverty rose and inequality fell`,`Both poverty and inequality fell`,`Neither changed`,`Inequality fell, because average income rose`],0,
  `<p>The top\'s share of income grew, so inequality rose. No one\'s income fell, so no one dropped below the poverty line (M1).</p>`);
mc('l37c-data','l37','In 2014, 46.7 million Americans (14.8% of the population) were in poverty, including 15.5 million children (21.1% of children under 18). Which statement is correct?',
  [`A larger share of children than of the whole population was in poverty`,`Most people in poverty were children`,`About 21% of all Americans were in poverty`,`Fewer than 1 million children were in poverty`,`The poverty rate for children was lower than for the population as a whole`],0,
  `<p>21.1% of children vs 14.8% of everyone: children\'s poverty rate was higher. Children were 15.5 of the 46.7 million poor, about a third, not most. 21% is the children\'s rate, not everyone\'s.</p>`);
mc('l37c-lorenz','l37',`A country\'s income shares by quintile are 5%, 10%, 15%, 25% and 45%. What cumulative share of income goes to the poorest 60% of households?`,
  [`15%`,`25%`,`30%`,`55%`,`60%`],2,
  `<p>5 + 10 + 15 = <b>30%</b>. 15% is the third quintile alone (M4); 60% would be perfect equality.</p>`);
mc('l37c-gini','l37','Made-up scenario, new to this lesson. Country P has a Gini coefficient of 0.25 and Country Q has 0.55. Which statement is true?',
  [`Income is more equally distributed in Country P`,`Income is more equally distributed in Country Q`,`Country Q has a higher poverty rate`,`Country P\'s Lorenz curve lies farther from the diagonal`,`They have the same distribution`],0,
  `<p>A lower Gini means less area between the Lorenz curve and the line of equality, so a more equal distribution (M3). The Gini says nothing directly about poverty rates (M1).</p>`);
mc('l37c-src','l37','Using Lesson 29\'s marginal-product idea, why might a worker with more training earn more?',
  [`Training raises the worker\'s marginal product, so employers are willing to pay more for each hour`,`Training always comes with a government subsidy`,`Employers must pay trained workers more by law`,`Trained workers supply fewer hours`,`Training lowers the demand for labor`],0,
  `<p>Lesson 29 (your course\'s video 6.1): workers who are "more productive because of experience, education and training, or access to the latest technology" add more output, so they are worth more to employers. Differences in productivity are one source of inequality (M5).</p>`);
mc('l37c-pol','l37','Under a negative income tax with a $10,000 threshold and a 25% rate, what does a family with zero income receive?',
  [`$0`,`$250`,`$2,500`,`$7,500`,`$10,000`],2,
  `<p>25% × ($10,000 − $0) = <b>$2,500</b>, Econlib\'s figure. $10,000 would be a full guarantee with a 100% rate, the poverty-trap design (M6).</p>`);
lazy('l37c-skill','l37',()=>visMC({
  prompt:`Each graph shows a Lorenz curve (solid) and the diagonal line (dashed). The horizontal axis is the cumulative percentage of households, poorest first; the vertical axis is the cumulative percentage of income. Which graph shows a Gini coefficient of 0?`,
  choices:[ lorChoice(1,true), lorChoice(1.3), lorChoice(1.8), lorChoice(3), lorChoice(0.6) ],
  explain: L => `<p><b>Graph ${L}</b>: the Lorenz curve lies on the line of perfect equality, so the area between them is zero and the Gini is 0.</p>${FIG7.l37gini()}<p>Any curve below the line has some area A, so a Gini above 0 (M3).</p>`
}));

/* Course materials checked 2026-11-19: video 7.3 transcript (definition; 2014 averages: bottom 90% "just over $33,000", top 10% "almost $300,000", top 5% "$440,000", top 1% "over 1 million", top 0.1% "over six million";
   top 1% share 1913-2014, lowest "roughly from 1963 to about 1983"; real weekly wages median $733 → $791, bottom 10% $383 → $379, top 10% rising; poverty 14.8%, children 21%, seniors 10%;
   food insecurity 48.1 million, 14%, 6%, 19% vs 12%; policies: "minimum wage laws, in-kind transfers, welfare and housing assistance, as well as a negative income tax. But these measures do not do enough");
   Module 7.3 slides (exact averages $33,068 / $295,845 / $448,489 / $1,260,508 / $6,087,113; 46.7 million (14.8%), 15.5 million (21.1%), 4.6 million (10%); food insecurity details; policies list).
   Course slip: video "$440,000" vs slide $448,489 for the top 5%.
   Course textbook §14.1 (poverty vs inequality; Orshansky; 2015 lines), §14.2 (poverty trap; $18,000 example), §14.3 (TANF, EITC phase-out 21.06 cents, SNAP, Medicaid), §14.4 (quintiles; Table 14.6; Lorenz curve;
   "loop farther down"; caption says 2011 while Table 14.6 says 2013; household composition "roughly half"; winner-take-all; Figure 14.9; technology and globalization), §14.5 (age and preferences; income vs wealth;
   progressive tax; ladder of opportunity; estate tax; trade-off, Figure 14.10). The 2016 textbook has no Gini coefficient: FRED series notes and BEA primer used. Econlib, Allen (negative income tax example).
   CLEP outline (Income distribution). */
const L37TAGS = {
  'l37-def':['MS7 OS141','ineq','terms','M1'], 'l37-pov':['OS144','ineq','models','M1'], 'l37-data':['MS7','ineq','data',''], 'l37-wage':['MS7','ineq','data',''],
  'l37-quint':['OS144','ineq','data','M4'], 'l37-cum':['OS144','lor','data','M4'], 'l37-g-cum':['OS144','lor','data','M4'], 'l37-gr-lor':['OS144 FREDG','lor','graphs','M2'],
  'l37-axes':['OS144','lor','terms','M4'], 'l37-gini':['BEAG FREDG','lor','terms','M3'], 'l37-g-gini':['FREDG BEAG','lor','data','M3'], 'l37-sources':['OS144','srcs','graphs','M5'],
  'l37-nit':['ELNIT MS7','ineq','data','M6'], 'l37-trap':['OS142','ineq','models','M6'],
  'l37-top01':['MS7','ineq','data',''], 'l37-child':['MS7','ineq','data',''], 'l37-orsh':['OS141','ineq','terms',''], 'l37-tf-far':['OS144','lor','terms','M2'],
  'l37-time':['OS144 FREDG','lor','graphs','M2 M3'], 'l37-g-ginq':['OS144 BEAG','lor','data','M3'], 'l37-house':['OS144','srcs','terms','M5'], 'l37-winner':['OS144','srcs','terms','M5'],
  'l37-age':['OS145','srcs','terms','M5'], 'l37-wealth':['OS145','srcs','terms',''], 'l37-inkind':['MS7 OS143','ineq','terms',''], 'l37-eitc':['OS143','ineq','terms','M6'],
  'l37-g-nit':['ELNIT','ineq','data','M6'], 'l37-prog':['OS145','ineq','terms',''], 'l37-trade':['OS145','ineq','terms','M6'], 'l37-minwage':['MS7 ELMW','ineq','models',''],
  'l37c-def':['OS144','ineq','models','M1'], 'l37c-data':['MS7','ineq','data',''], 'l37c-lorenz':['OS144','lor','data','M4'], 'l37c-gini':['BEAG FREDG','lor','models','M3'],
  'l37c-src':['MS6 OS144','srcs','models','M5'], 'l37c-pol':['ELNIT','ineq','data','M6'], 'l37c-skill':['FREDG BEAG','lor','graphs','M3']
};
u7tag(L37TAGS);

U7_CARDS.l37 = [
  ['Income inequality','What is income inequality?','The uneven distribution of income across a population: the gap between the rich and everyone else.','2014: the top 1% averaged about 38 times the bottom 90%\'s income.','Not the same as poverty.', FIG7.l37inc()],
  ['Poverty vs inequality','How do poverty and inequality differ?','Poverty counts people below a fixed income line; inequality compares how total income is shared.','A 10% rise in every income cuts poverty but leaves inequality unchanged.','They can move in different directions.', FIG7.l37two()],
  ['Poverty line','How is the U.S. poverty line set?','About three times the cost of a nutritionally adequate diet for the family\'s size (Orshansky, 1963), adjusted for prices each year.','2015: $11,790 for one person, $25,240 for a family of four (textbook).','Families then spent about a third of income on food.'],
  ['Quintiles','How are quintiles used to measure inequality?','Rank households by income, split them into five equal groups, and compare each group\'s share of total income.','2013: richest fifth 51.0%, poorest fifth 3.2%.','With perfect equality, each fifth would get 20%.'],
  ['Lorenz curve','What does a Lorenz curve plot?','Cumulative % of households (poorest first) across; cumulative % of income up. The diagonal is perfect equality.','2013: the bottom 40% received 11.6% of income.','Use cumulative shares, not each quintile\'s own share.', FIG7.l37lor()],
  ['Reading a Lorenz curve','What does a curve farther below the diagonal mean?','More inequality. The 2013 curve is farther from the line than the 1980 curve.','1980 bottom 40%: 14.4%; 2013: 11.6%.','Farther away = less equal.', u7lmini(2.2,'A Lorenz curve bowed below the diagonal')],
  ['Gini coefficient','What is the Gini coefficient and its range?','Area A (between the diagonal and the Lorenz curve) ÷ (A + B), the whole area under the diagonal. 0 = perfect equality; 1 = one household has everything.','Textbook quintiles: about 0.38 in 1980 and 0.44 in 2013 (estimate).','Higher Gini = less equal. FRED shows it 0 to 100.', FIG7.l37gini()],
  ['Sources of income inequality','Name four sources of income inequality.','Differences in skills and productivity; demand for skill rising faster than supply; changing households; age and choices; wealth and inheritance.','College graduates\' wages rose even as their numbers grew.','No single cause explains it.', FIG7.l37src()],
  ['Rising wages for skill','Why did high-skilled wages rise even as supply grew?','Demand for high-skilled labor rose faster than supply, driven by technology and globalization.','Bachelor\'s degrees rose about 90% from 1970 to 2010 (textbook), yet wages rose.','A supply increase alone would lower the wage.', FIG7.l37skill()],
  ['Negative income tax','How does a negative income tax work?','Below a threshold, a family receives a payment equal to a rate times the gap; the payment shrinks gradually as income rises.','$10,000 threshold, 25%: income $8,000 → $500; zero income → $2,500.','Apply the rate to the gap, not to income.', FIG7.l37nit()],
  ['Poverty trap','What is the poverty trap?','When aid is cut by about $1 for each $1 earned, working more doesn\'t raise total income.','A $18,000 guarantee cut $1,000 per $1,000 earned (textbook).','The EITC and a negative income tax phase out slowly to avoid it.'],
  ['Policies to reduce poverty','Name four policies aimed at reducing poverty.','Minimum wage laws, in-kind transfers, welfare and housing assistance, and a negative income tax. Textbook adds TANF, the EITC, SNAP and Medicaid.','SNAP is an in-kind transfer; the EITC is paid through the tax system.','Your course: they don\'t do enough. The textbook stresses the trade-off with work incentives.', FIG7.l37trade()]
];

Object.assign(U7_WRITE, {
  'w-l37-1':{lesson:'l37',prompt:'Using these U.S. quintile shares of income (1980: 4.2, 10.2, 16.8, 24.7, 44.1 percent; 2013: 3.2, 8.4, 14.4, 23.0, 51.0 percent), explain how to draw a Lorenz curve, what it shows about the change from 1980 to 2013, and what would happen to the Gini coefficient.',
    model:'A Lorenz curve puts the cumulative percentage of households, from poorest to richest, on the horizontal axis and the cumulative percentage of income they receive on the vertical axis. To draw it, add each quintile\'s share to all the poorer ones: in 2013 the bottom 20% got 3.2%, the bottom 40% got 3.2 + 8.4 = 11.6%, the bottom 60% got 26.0%, the bottom 80% got 49.0%, and everyone got 100%. For 1980 the points are 4.2, 14.4, 31.2, 55.9 and 100. A 45-degree line shows perfect equality. Every 2013 point is below the matching 1980 point, so the 2013 curve bows farther from the line: income became less equal, mainly because the top fifth\'s share rose from 44.1% to 51.0%. The Gini coefficient is the area between the line of equality and the Lorenz curve divided by the whole area under the line, so a curve farther from the line means a higher Gini; from these five points it rises from about 0.38 to about 0.44.',
    checklist:['Names the two axes as cumulative shares (households poorest first; income)','Shows how to build cumulative points by adding quintile shares (with at least one correct example)','Concludes that the 2013 curve is farther from the 45-degree line, so less equality','Explains that the Gini (area ratio) rises when the curve moves away from the line']},
  'w-l37-2':{lesson:'l37',prompt:'A negative income tax is one proposed way to reduce poverty. Explain how it works with a numerical example, and compare it with a program that cuts aid by one dollar for every dollar earned.',
    model:'Under a negative income tax, families with income below a threshold receive a payment from the tax system instead of paying tax. The payment equals a negative tax rate times the gap between the threshold and the family\'s income. In Econlib\'s example the threshold is $10,000 and the rate is 25%: a family earning $8,000 receives 25% × $2,000 = $500, and a family with no income receives $2,500. Because the payment falls by only 25 cents for each extra dollar earned, the family keeps 75 cents of every dollar, so working more always raises total income. A program that cuts aid by a full dollar for each dollar earned creates a poverty trap: in your textbook\'s example a family guaranteed $18,000 gains nothing from working until its earnings pass $18,000, so it has little reason to work. The trade-off is that a lower negative tax rate keeps the incentive to work but gives less to the poorest families or reaches higher up the income scale, which costs more.',
    checklist:['Explains the payment as a rate times the gap below a threshold','Works a correct numerical example','Explains that a slow phase-out keeps a reward for working','Contrasts it with the dollar-for-dollar poverty trap (and notes a trade-off)']}
});

U7_PLAN.l37 = {
  core:['l37-def','l37-pov','l37-data','l37-wage','l37-quint','l37-cum','l37-g-cum','l37-gr-lor','l37-axes','l37-gini','l37-g-gini','l37-sources','l37-nit','l37-trap'],
  more:['l37-top01','l37-child','l37-orsh','l37-tf-far','l37-time','l37-g-ginq','l37-house','l37-winner','l37-age','l37-wealth','l37-inkind','l37-eitc','l37-g-nit','l37-prog','l37-trade','l37-minwage']
};

U7_LESSONS.push({ id:'l37', unit:7, title:'Income Inequality, Poverty, the Lorenz Curve and the Gini Coefficient', mins:45, src:'Modern States video 7.3 and the Module 7.3 slides · Course textbook (OpenStax) §14.1-§14.5',
  sources:['MS7','OS141','OS142','OS143','OS144','OS145','CB','FREDG','BEAG','ELNIT'],
  oneline:'Income inequality is how unevenly income is shared. The Lorenz curve draws it and the Gini coefficient sums it up in one number; it comes from differences in skills, households, age and wealth, and policies trade some work incentive for less poverty.',
  body:`
<p>Lesson 29 explained why some workers earn more: their ${dt('marginal-product','marginal product')} is higher. Lesson 32 showed how the supply of and demand for labor set wages. This lesson steps back to the whole economy: how income ends up shared across households, how to measure it, and what policies do about it. It also closes the course: the last CLEP topic.</p>

<h2>Income inequality and poverty</h2>
<!-- src: MS7 (video 7.3: "Income inequality refers to the uneven distribution of income across the population. It looks at the gap between the rich and everyone else"; slide "Income Inequality"); OS141 ("Poverty is measured by the number of people who fall below a certain level of income—called the poverty line ... Income inequality compares the share of the total income ... received by different groups"; Orshansky 1963: diet cost × 3; 2015 lines $11,790 and $25,240); OS144 (Clear It Up: "Poverty can change even when inequality does not move at all ... It is also possible for income inequality to change without affecting the poverty rate"). -->
<p>Your course: "${dt('income-inequality','<b>Income inequality</b>')} refers to the uneven distribution of income across the population. It looks at the gap between the rich and everyone else." Your textbook separates it from poverty, which counts the people below the ${dt('poverty-line','<b>poverty line</b>')}.</p>
${FIG7.l37two()}
<p><b>Why keep them apart:</b> they answer different questions. Poverty asks whether people have enough for a basic standard of living; inequality asks how the total is divided. The textbook: "Poverty can change even when inequality does not move at all."</p>
<p><b>So what:</b> a question that changes everyone\'s income by the same percentage leaves inequality unchanged; one that changes only the top changes inequality but not the poverty count.</p>
<div data-check="l37c-def"></div>

<h2>How unequal is U.S. income?</h2>
<!-- src: MS7 (video 7.3 and Module 7.3 slides: 2014 averages, from inequality.org; "the gap between the rich and everyone else has been growing in the US"; top 1% share 1913-2014, "the lowest inequality that we experienced was in the sixties and seventies, roughly from 1963 to about 1983"; real weekly wages 1979 and 2014; poverty 2014: 46.7 million (14.8%), 15.5 million children (21.1%), 4.6 million seniors (10%); food insecurity: 48.1 million, 14% of households, 6% very low, 19% vs 12%). Course slip: the video says the top 5% "earned $440,000"; the slide says $448,489. Multiples computed by script. -->
<p>Your course shows average incomes in 2014 for five groups. Read the last column: it divides each average by the bottom 90%\'s.</p>
${FIG7.l37inc()}
<p>(The video says "$440,000" for the top 5%; the slide\'s $448,489 is used here.) Your course adds that "the gap between the rich and everyone else has been growing": the top 1%\'s share of income was lowest from about 1963 to 1983 and has risen since.</p>
<p><b>Worked example: real wages, 1979 to 2014.</b> "Real" means adjusted for inflation, so the dollars buy the same amount in both years.</p>
${FIG7.l37wage()}
<p>Check: the median rose about 8% in 35 years, a fraction of a percent a year, while the bottom 10% slipped. Your course: the top 10%\'s real wages "have steadily increased" over the same period, so the gap widened from both ends.</p>
<p>Your course\'s poverty figures for 2014:</p>
${FIG7.l37pov()}
<p><b>So what:</b> the CLEP outline lists "Income inequality" as a topic; expect a question that reads data like these, or asks what inequality means.</p>
<div data-check="l37c-data"></div>

<h2>Measuring inequality: quintiles and the Lorenz curve</h2>
<!-- src: OS144 (quintiles: "rank all households by income, from lowest to highest, and then to divide all households into five groups with equal numbers of people"; 2013 shares; "the top 20% of householders (the fifth quintile) received over half (51%)"; Lorenz curve: "shows the cumulative share of population on the horizontal axis and the cumulative percentage of total income received on the vertical axis"; "Every Lorenz curve diagram begins with a line sloping up at a 45-degree angle"; "you must change the shares of income for each specific quintile ... into cumulative income"; Table 14.6; "a more unequal distribution of income will loop farther down and away from the 45-degree line"). Textbook slip: Figure 14.8's caption says 2011 while Table 14.6 and the text say 2013. FREDG ("A Lorenz curve plots the cumulative percentages of total income received against the cumulative number of recipients, starting with the poorest individual or household"). -->
<p>Your textbook ranks households "from lowest to highest" and splits them into five equal groups, ${dt('quintile','<b>quintiles</b>')}, then compares each group\'s share of total income. With perfect equality every fifth would get 20%.</p>
<p>The ${dt('lorenz-curve','<b>Lorenz curve</b>')} turns the five shares into one picture. "The trick," the textbook says, is to turn each quintile\'s share into a <b>cumulative</b> share: the bottom 40% get the first two quintiles together, and so on.</p>
${FIG7.l37cum()}
<div class="math">Bottom 20% (2013): 3.2%<br>Bottom 40%: 3.2 + 8.4 = <b>11.6%</b><br>Bottom 60%: 11.6 + 14.4 = <b>26.0%</b><br>Bottom 80%: 26.0 + 23.0 = <b>49.0%</b><br>Everyone: 49.0 + 51.0 = <b>100%</b></div>
<p>Check: the last point is always 100%, because all households receive all the income.</p>
${FIG7.l37lor()}
<p><b>Why the bow means inequality:</b> on the diagonal, each 20% of households adds 20% of income. When the poorer groups get less than 20%, the curve rises slowly at first and has to climb steeply at the end, where the richest fifth\'s large share comes in. The bigger the top share, the deeper the bow.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture five people lined up from poorest to richest, filling a bucket with their share of a pizza as each steps up. If everyone has the same share, the bucket fills at a steady rate: the diagonal. If the first four bring crumbs and the last brings most of the pizza, the bucket barely fills, then jumps at the end. The Lorenz curve is the bucket\'s level as each person steps up.</p></div>
<p>Build the curves yourself below.</p>
<div data-widget="lorenz"></div>
<p>What to notice: every curve starts at (0, 0) and ends at (100, 100). Only the path between them changes, and the Gini grows as the curve sags.</p>
<div data-check="l37c-lorenz"></div>

<h2>The Gini coefficient</h2>
<!-- src: FREDG ("Gini index measures the extent to which the distribution of income ... deviates from a perfectly equal distribution"; "The Gini index measures the area between the Lorenz curve and a hypothetical line of absolute equality, expressed as a percentage of the maximum area under the line"; "Thus a Gini index of 0 represents perfect equality, while an index of 100 implies perfect inequality"; U.S. index 41.8 for 2024, World Bank data, viewed 2026-11-19); BEAG ("The value ranges from 0 to 1, where: 0 represents perfect equality—everyone has the same income. 1 represents perfect inequality—one person has all the income"; "the Gini coefficient is computed as twice the area between the line of equality and the Lorenz curve"; "The Lorenz curve always lies at or below this line"). The 2016 course textbook does not mention the Gini coefficient. Quintile estimates (0.38, 0.44) are my calculation. -->
<p>The ${dt('gini','<b>Gini coefficient</b>')} turns the Lorenz picture into one number. Your 2016 textbook doesn\'t cover it, so this section follows the Federal Reserve Bank of St. Louis (FRED) and the Bureau of Economic Analysis (BEA).</p>
${FIG7.l37gini()}
<p><b>Why it works:</b> area A is how far the actual curve falls short of equality; A + B is the most it could fall short. Their ratio scales the gap from 0 to 1. BEA: "0 represents perfect equality—everyone has the same income. 1 represents perfect inequality—one person has all the income." (BEA adds a shortcut: on axes from 0 to 1, A + B = ½, so Gini = 2 × A.)</p>
<p><b>Worked example: the textbook\'s quintiles.</b> Joining the five points with straight lines, the area under the 2013 curve is about 0.28 of the unit square, out of 0.5 under the diagonal.</p>
<div class="math">A = 0.5 − 0.280 = 0.220<br>Gini = A ÷ (A + B) = 0.220 ÷ 0.5 ≈ <b>0.44</b> (1980: ≈ 0.38)</div>
<p>Check: 2013\'s curve sits farther from the line than 1980\'s, and its Gini is larger. Official figures use data on every household, not five groups, so they differ from these estimates; FRED\'s World Bank series puts the U.S. at 41.8 on its 0 to 100 scale for 2024.</p>
<p><b>So what:</b> a higher Gini means less equality. On the exam, the Gini usually appears beside a Lorenz curve: the farther the curve from the diagonal, the higher the Gini.</p>
<div data-check="l37c-gini"></div>

<h2>Sources of income inequality</h2>
<!-- src: OS144 (household composition: two-earner high-earner couples; single-parent households 13.1%; "account for roughly half of the rise"; wages: "the earnings of high-skilled labor relative to low-skilled labor have increased"; winner-take-all; college/high school earnings 1.67 in 2010 vs 1.59 in 1995; bachelor's degrees 840,000 (1970) to 1,602,480 (2009-2010), about 90%; Figure 14.9; technology and globalization; "a race between forces of supply and demand"); OS145 (age: low early, higher in middle age, lower in retirement; preferences; income vs wealth; wealth more unequal); MS6 via Lesson 29 ("some workers tend to be more productive because of experience, education and training, or access to the latest technology"). -->
<p>There is no single cause. Your textbook and Lesson 29 point to several.</p>
${FIG7.l37src()}
<p><b>Worked example: your course textbook\'s skilled-labor market.</b> Bachelor\'s degrees awarded rose from 840,000 in 1970 to about 1.6 million in 2009-2010, about 90%. More supply should lower the wage, yet college graduates\' pay pulled further ahead.</p>
${FIG7.l37skill()}
<p>Check: the only way both the quantity and the wage rise is a demand shift bigger than the supply shift. The textbook calls it "a race between forces of supply and demand."</p>
<p><b>So what:</b> the CLEP outline lists "Sources of income inequality." Expect a question asking which factor contributes to inequality (education and skills, technology, household structure) or using supply and demand for skilled labor.</p>
<div data-check="l37c-src"></div>

<h2>Policies to reduce poverty and inequality</h2>
<!-- src: MS7 (video 7.3: "minimum wage laws, in-kind transfers, welfare and housing assistance, as well as a negative income tax. But these measures do not do enough to lower income inequality in the US and they don't do enough to lower poverty"; slide "Policies to Reduce Poverty ... Do not solve the larger issue of growing inequality"); OS142 (poverty trap; $18,000 guarantee, $1,000 cut per $1,000 earned); OS143 (TANF, EITC: "phased out slowly ... reduced by 21.06 cents", SNAP, Medicaid); OS145 (progressive federal income tax; trade-off between incentives and equality, Figure 14.10; public education may raise both); ELNIT (threshold $10,000, 25%, $8,000 → $500, zero → $2,500; "commonly thought to have originated with economist Milton Friedman"); ELMW (Gorman, minimum wages; Lesson 32). -->
<p>Your course lists four policies: "minimum wage laws, ${dt('in-kind','in-kind transfers')}, welfare and housing assistance, as well as a ${dt('nit','negative income tax')}." Your textbook adds the main U.S. safety-net programs: TANF (cash welfare with work requirements and time limits), the ${dt('eitc','earned income tax credit')}, SNAP (food assistance) and Medicaid, paid for largely by a ${dt('progressive-tax','progressive')} income tax.</p>
<p><b>The design problem: the poverty trap.</b> Your textbook\'s example: a program guarantees a family $18,000 and cuts aid by $1,000 for each $1,000 the family earns. Earning more then adds nothing to total income, so there is little reason to work. That is the ${dt('poverty-trap','poverty trap')}.</p>
<p><b>Worked example: a negative income tax (Econlib).</b> Milton Friedman\'s idea: below a threshold, the tax system pays you, and the payment shrinks gradually as income rises.</p>
${FIG7.l37nit()}
<p>Check: total income always rises with earnings ($8,000 earned → $8,500 total; $9,000 → $9,250), unlike the poverty trap.</p>
<p>Change the rate below to see the trade-off.</p>
<div data-widget="nit"></div>
<p>What to notice: a higher rate gives the poorest families more but lets them keep less of each dollar they earn. At 100% you get the poverty trap.</p>
<p><b>Minimum wage:</b> Lessons 8 and 32 showed a minimum wage above the market wage is a price floor in the labor market: higher pay for workers who keep their jobs, fewer jobs. How large the job loss is remains debated.</p>
${FIG7.l37trade()}
<p><b>So what:</b> your course\'s view is that these measures "do not do enough." Your textbook frames it as a trade-off between equality and the incentive to work, which well-designed programs can soften. Both are views about how much to redistribute; the CLEP asks you to know the tools and their effects.</p>
<div data-check="l37c-pol"></div>

<h2>Read the Lorenz curve</h2>
<!-- src: OS144, FREDG, BEAG. Exam skill: compare a Lorenz curve with the diagonal, then translate distance into equality and Gini. -->
<p>CLEP questions on this topic usually show one or more Lorenz curves. The move: (1) find the diagonal: that is perfect equality and a Gini of 0. (2) The curve farther below it is less equal and has the higher Gini. (3) A curve can never lie above the diagonal. For numbers, add shares to get cumulative points.</p>
<div data-widget="lorsort"></div>
<p>What to notice: anything that raises the top\'s share or lowers the bottom\'s pushes the curve away from the line and the Gini up; changes that hit everyone by the same percentage move neither.</p>
<div data-check="l37c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L37TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"Poverty and inequality are the same thing."</span>Poverty counts people below a fixed line; inequality compares shares. One can change while the other doesn\'t.</li>
<li><span class="wrong">"A Lorenz curve farther from the diagonal means more equality."</span>The diagonal is perfect equality, so the farther the curve bows away, the <b>less</b> equal.</li>
<li><span class="wrong">"A Gini coefficient of 1 means perfect equality."</span>0 is perfect equality; 1 means one household has all the income.</li>
<li><span class="wrong">"The Lorenz curve plots each quintile\'s own share."</span>It plots cumulative shares: the bottom 40%\'s point adds the first two quintiles.</li>
<li><span class="wrong">"Inequality has one cause."</span>Skills and productivity, technology and globalization, household structure, age and choices, and wealth all contribute.</li>
<li><span class="wrong">"Anti-poverty programs never affect the incentive to work."</span>Cutting aid $1 for each $1 earned creates a poverty trap; slow phase-outs (EITC, negative income tax) keep a reward for working.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Income inequality</b> is how unevenly income is shared; <b>poverty</b> counts people below a fixed line, and the two can move separately.</li>
<li>In 2014 the top 1% averaged about 38 times the bottom 90%; real median weekly wages rose only about 8% from 1979 to 2014; 14.8% of people and 21.1% of children were poor.</li>
<li>The <b>Lorenz curve</b> plots cumulative income shares against cumulative households; the farther below the diagonal, the less equal (2013 vs 1980).</li>
<li>The <b>Gini coefficient</b> = A ÷ (A + B), from 0 (perfect equality) to 1; the textbook quintiles give about 0.38 (1980) and 0.44 (2013).</li>
<li><b>Sources</b> include differences in productivity, demand for skill outrunning supply, household structure, age and wealth.</li>
<li><b>Policies</b> (minimum wage, in-kind transfers, welfare and housing aid, a negative income tax, the EITC) face a trade-off with work incentives; the poverty trap is the extreme case.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Income inequality," "Sources of income inequality" and "Lorenz curve and Gini coefficient" under Income distribution (Market Failure and the Role of Government, 8% to 14% of the exam). Expect a graph of Lorenz curves asking which is more equal or what happens to the Gini, or a question on what causes inequality.</p>
</div>`,
  deeper:`
<h3>Income, wealth and mobility</h3>
<p>Your textbook notes that a single year\'s snapshot overstates lifetime inequality, because people move up and down the income ranks over their careers. Wealth, though, is more unequal than income, since differences add up over time. The CLEP tests income measures.</p>
<h3>The ladder of opportunity and inheritance</h3>
<p>Your textbook describes policies aimed at equal starting points rather than equal outcomes: better schools and early childhood programs, college aid, retraining, and laws against discrimination. It also discusses the estate tax, which in 2015 applied only to inheritances over $5.43 million.</p>
<h3>Other measures</h3>
<p>Besides quintile shares and the Gini, economists compare the income of the top 10% with the bottom 10%, or track the top 1%\'s share, as your course\'s video does. Each gives a slightly different picture.</p>`,
  links:[ {k:'Textbook',t:'15.4 Income Inequality: Measurement and Causes',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/15-4-income-inequality-measurement-and-causes',w:'The newer edition of your course textbook\'s §14.4: quintiles, the Lorenz curve and the causes of rising inequality. Numbers are updated to later years.'},
          {k:'Data',t:'GINI Index for the United States',s:'Federal Reserve Bank of St. Louis (FRED)',u:'https://fred.stlouisfed.org/graph/?g=12BAp',w:'The U.S. Gini index over time on a 0 to 100 scale, with a short note on how it relates to the Lorenz curve.'} ]
});

u7xv({
  'l37-def':[FIG7.l37two(), ''], 'l37c-def':[FIG7.l37two(), ''], 'l37-orsh':[FIG7.l37two(), ''],
  'l37-quint':[FIG7.l37cum(), ''], 'l37c-lorenz':[fig(atable(['Quintile','Share','Cumulative'], [[1,'5%','5%'],[2,'10%','15%'],[3,'15%','<b>30%</b>'],[4,'25%','55%'],[5,'45%','100%']], { cls:'compact', hl:{2:{row:'u3z2'}} }), 'Marked up: add the first three shares for the bottom 60%.'), ''],
  'l37-axes':[FIG7.l37lor(), ''], 'l37-tf-far':[FIG7.l37lor(), ''], 'l37-gini':[FIG7.l37gini(), ''], 'l37c-gini':[FIG7.l37gini(), ''],
  'l37-child':['', ''], 'l37c-data':[FIG7.l37pov(), ''], 'l37-house':[FIG7.l37src(), ''], 'l37-winner':[FIG7.l37src(), ''], 'l37-age':[FIG7.l37src(), ''], 'l37-wealth':[FIG7.l37src(), ''], 'l37c-src':[FIG7.l37src(), ''],
  'l37-trap':[fig(atable(['Earned','Aid','Total income'], [['$0','$18,000','$18,000'],['$6,000','$12,000','$18,000'],['$12,000','$6,000','$18,000'],['$18,000','$0','$18,000']], { cls:'compact', hl:{0:{2:'u3z2'},3:{2:'u3z2'}} }), 'Marked up: your textbook\'s guarantee. Total income stays at $18,000 however much the family earns, up to $18,000.'), ''],
  'l37-eitc':[FIG7.l37trade(), ''], 'l37-inkind':['', ''], 'l37c-pol':[FIG7.l37nit(), ''], 'l37-minwage':['', ''], 'l37-prog':['', '']
});
u7cv('l37', {});
