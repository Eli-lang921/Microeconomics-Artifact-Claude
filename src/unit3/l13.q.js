/* ===== Lesson 13: Total Utility and Marginal Utility (Modern States video 3.1, first part; slides 2-5) =====
   Common mistakes: M1 marginal utility = total satisfaction · M2 diminishing MU means TU is falling · M3 MU = 0 means TU = 0
   M4 utils compare two people · M5 MU = TU ÷ quantity (average) · M6 negative MU just means "less than the unit before" */
const candyTbl = (withMU=false) => atable(withMU?['Candy bars','Total utility','Marginal utility']:['Candy bars','Total utility'], CANDY_TU.map((v,i)=> withMU ? [i,v,i?CANDY_TU[i]-CANDY_TU[i-1]:''] : [i,v]), { cls:'compact' });
const LEMON_TU = [0,18,32,42,48,50,50,46,40];   // made-up, used in l13-gr-tu
mc('l13-tu-def','l13','In your course, <b>total utility</b> is which of the following?',
  [`The total satisfaction a consumer gets from consuming a given quantity of a good`,`The extra satisfaction from consuming one more unit of a good`,`Total satisfaction divided by the number of units consumed`,`The total amount a consumer spends on a good`,`The satisfaction from the last unit consumed`],0,
  `<p>Your course: total utility is "the total level of satisfaction that a consumer gets from consuming a given quantity of the good." Your course textbook adds that "total utility is also the sum of the marginal utilities."</p><p>The tempting "extra satisfaction from one more unit" is <b>marginal</b> utility. "Divided by the number of units" would be an average, which the CLEP doesn't use here.</p>`);
mc('l13-mu-def','l13','<b>Marginal utility</b> is best described as which of the following?',
  [`The change in total utility from consuming one more unit`,`The total satisfaction from all the units consumed`,`Total utility divided by the quantity consumed`,`The satisfaction from the first unit consumed`,`The price paid for one more unit`],0,
  `<p>Your course: marginal utility is "the additional utility that we derive from consuming one more unit of the good." Your course textbook writes it as MU = change in total utility ÷ change in quantity.</p><p>The tempting "total satisfaction from all the units" is total utility. "Total utility divided by quantity" is an average, not the marginal (extra) amount.</p>`);
gen('l13-g-mu','l13',()=>{
  const a=pick([22,26,30]), d=pick([3,4,5]), n=5, MU=Array.from({length:n},(_,i)=>a-d*i), TU=[0]; MU.forEach(m=>TU.push(TU[TU.length-1]+m));
  const k=pick([2,3,4,5]), ans=TU[k]-TU[k-1], avg=round(TU[k]/k,2);
  return { type:'num', kind:'num', prompt:`Made-up numbers. A student's total utility from cups of coffee in a week:${atable(['Cups','Total utility (utils)'], TU.map((v,i)=>[i,v]), {cls:'compact'})}What is the <b>marginal utility</b> of cup ${k}?`, answer:ans, unit:'utils',
    explain:`<p>Marginal utility = total utility at ${k} cups − total utility at ${k-1} cups = ${TU[k]} − ${TU[k-1]} = <b>${ans} utils</b>.</p><p>The common slip is dividing: ${TU[k]} ÷ ${k} = ${fmt(avg)} is the <b>average</b> utility per cup, not what cup ${k} added. Another is answering ${TU[k]}, which is total utility.</p>` };
});
mc('l13-candy-peak','l13',`Your course's candy bar table:${candyTbl()}What is the marginal utility of the <b>6th</b> candy bar, and what does it tell you?`,
  [`0; total utility has reached its maximum`,`75; total utility is at its maximum`,`0; total utility is zero`,`5; total utility is still rising`,`−5; total utility is falling`],0,
  `<p>The 6th bar's marginal utility is 75 − 75 = <b>0</b>: it adds nothing, so total utility stops rising at its highest level, 75. Your course: marginal utility is positive while total utility rises and negative once it falls; zero is the turning point.</p><p>The tempting "75" reads total utility instead of the change. "Total utility is zero" mixes up the two: total utility is at its <b>peak</b> when marginal utility is zero.</p>`);
tf('l13-tf-dmu-tu','l13','Diminishing marginal utility means total utility is falling.',false,
  `<p>False. Diminishing marginal utility means each extra unit adds <b>less</b> than the one before, but as long as it adds something (marginal utility above zero), total utility still rises. Your course's candy bars: marginal utility falls from 25 to 5 over the first five bars while total utility rises from 25 to 75.</p>`);
lazy('l13-gr-tu','l13',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A hiker's total utility from cups of lemonade on a hot day:${tuChart(LEMON_TU, { xlab:'Cups of lemonade', ymax:60, yt:[0,20,40,50], xt:[0,2,4,5,6,7,8] })}${atable(['Cups','Total utility'], LEMON_TU.map((v,i)=>[i,v]),{cls:'compact'})}Over which range is the hiker's <b>marginal utility negative</b>?`,
  options:[`From the 7th cup on, where the total utility curve slopes down`,`From the 2nd cup on, because each cup adds less than the one before`,`Never, because total utility stays above zero`,`From the 5th to the 6th cup, where the curve flattens`,`Only for the 1st cup`], answer:0,
  explain:`<p>Marginal utility is negative when a cup <b>lowers</b> total utility: the 7th cup takes it from 50 to 46 (−4) and the 8th from 46 to 40 (−6). On the graph, that's where the curve slopes down.</p><p>The tempting "from the 2nd cup on" describes diminishing marginal utility: cups 2 to 5 add less each time (14, 10, 6, 2) but still add. Total utility above zero doesn't matter; what matters is whether it's rising or falling.</p>` }));
mc('l13-dmu-def','l13','According to your course, <b>diminishing marginal utility</b> occurs when which of the following happens?',
  [`Marginal utility declines as consumption increases`,`Total utility declines as consumption increases`,`The price of a good falls as more is bought`,`Marginal utility becomes negative`,`Total utility stops changing`],0,
  `<p>Your course's slide: diminishing marginal utility "occurs when marginal utility declines as consumption increases." Your course textbook calls it a law: "the additional utility decreases with each unit added."</p><p>The tempting "total utility declines" confuses the two measures; total utility keeps rising while marginal utility is positive. Negative marginal utility is a further stage, not the definition.</p>`);
gen('l13-g-tu','l13',()=>{
  const a=pick([18,24,30,36]), d=pick([2,3,4,6]), n=pick([3,4,5]); const MU=Array.from({length:n},(_,i)=>a-d*i); const ans=MU.reduce((x,y)=>x+y,0);
  return { type:'num', kind:'num', prompt:`Made-up numbers. The marginal utility of each slice of pizza for a hungry student is:${atable(['Slice','Marginal utility (utils)'], MU.map((m,i)=>[ordinal(i+1), m]),{cls:'compact'})}What is her <b>total utility</b> from ${n} slices?`, answer:ans, unit:'utils',
    explain:`<p>Total utility is the sum of the marginal utilities: ${MU.join(' + ')} = <b>${ans} utils</b>.</p><p>The common slip is answering ${MU[n-1]}, the marginal utility of the last slice only. That is what slice ${n} added, not the total.</p>` };
});
mc('l13-neg','l13','In your course\'s candy bar example, the 8th candy bar has a marginal utility of −10. What does that mean?',
  [`Eating the 8th bar lowers total utility by 10 utils`,`The 8th bar adds 10 fewer utils than the 7th bar did`,`Total utility after 8 bars is −10 utils`,`The 8th bar adds 10 utils`,`Total utility is at its maximum`],0,
  `<p>Negative marginal utility means the unit makes you <b>worse off</b>: total utility falls from 70 to 60. Your course: "we end up actually losing satisfaction from each additional candy bar beyond" that point.</p><p>The tempting "10 fewer than the 7th" describes the gap between two marginal utilities (−5 and −10 differ by 5, in fact). Total utility after 8 bars is still +60; it's the change that is −10.</p>`);
tf('l13-tf-utils','l13','If Ana gets 20 utils from a cup of coffee and Ben gets 10 utils, Ana enjoys the coffee twice as much as Ben.',false,
  `<p>False. Your course textbook: "you cannot make comparisons between the utils of individuals; if one person gets 20 utils from a cup of coffee and another gets 10 utils, this does not mean [that] the first person gets more enjoyment." Utils rank one person's own choices.</p>`);
mc('l13-which-table','l13','Which of the following total utility sequences, for the 1st to 4th units, shows <b>diminishing marginal utility</b> while total utility is still rising?',
  [`10, 18, 24, 28`,`10, 20, 30, 40`,`10, 22, 36, 52`,`10, 8, 6, 4`,`10, 10, 10, 10`],0,
  `<p>Find the marginal utilities by subtracting: 10, 18, 24, 28 gives 10, 8, 6, 4. Each unit adds less, but adds something, so total utility rises.</p><p>The tempting "10, 8, 6, 4" as <b>total</b> utility would mean total utility is falling (marginal utility −2 each time). 10, 20, 30, 40 has constant marginal utility (10 each); 10, 22, 36, 52 has rising marginal utility (12, 14, 16); 10, 10, 10, 10 has zero after the first.</p>`);
mc('l13-avg','l13','Made-up numbers. A student\'s total utility from 2 slices of pizza is 45 utils and from 3 slices is 60 utils. What is the marginal utility of the 3rd slice?',
  [`15 utils`,`20 utils`,`60 utils`,`45 utils`,`105 utils`],0,
  `<p>Marginal utility = 60 − 45 = <b>15 utils</b>: what the 3rd slice added.</p><p>The tempting 20 is 60 ÷ 3, the <b>average</b> utility per slice. 60 is total utility, and 105 adds the two totals.</p>`);
/* L13 more */
mc('l13-tshirt','l13',`Your course textbook\'s José gets this total utility from T-shirts:${atable(['T-shirts','1','2','3','4'],[['Total utility','22','43','63','81']],{cls:'compact'})}What is the marginal utility of his <b>4th</b> T-shirt?`,
  [`18`,`81`,`20.25`,`20`,`22`],0,
  `<p>81 − 63 = <b>18 utils</b>. The textbook: the fourth T-shirt "yields only 18 additional utils," compared with 22 for his favorite, the first.</p><p>81 is total utility; 20.25 is 81 ÷ 4, an average; 20 is the 3rd T-shirt's marginal utility (63 − 43).</p>`);
lazy('l13-gr-mu','l13',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. The bars show a runner's marginal utility from each energy bar during a long race:<div class="qg">${ubars([15,12,8,3,-2,-6], { xlab:'Energy bars', ylab:'Marginal utility (utils)', ymax:15, ymin:-6 })}</div>At how many energy bars is her <b>total utility</b> greatest?`,
  options:[`4`,`1`,`6`,`5`,`3`], answer:0,
  explain:`<p>Total utility rises with every bar whose marginal utility is positive (bars 1 to 4) and falls with every bar whose marginal utility is negative (bars 5 and 6). So it peaks after <b>4 bars</b>: 15 + 12 + 8 + 3 = 38 utils. A 5th bar would lower it to 36.</p><p>The tempting "1" picks the bar with the biggest marginal utility. That's where she gains the most from <b>one</b> bar, not where her total is highest.</p>` }));
mc('l13-zero','l13','When marginal utility is zero, total utility is which of the following?',
  [`At its maximum`,`Zero`,`Falling`,`Rising at its fastest rate`,`Negative`],0,
  `<p>Zero marginal utility means the last unit added nothing: total utility stopped rising and hasn't started falling yet. That is its peak. In your course's candy example, the 6th bar has marginal utility 0 and total utility stays at its highest, 75.</p><p>The tempting "zero" confuses the two measures: total utility is 75 there, not 0.</p>`);
tf('l13-tf-sum','l13','Total utility equals the sum of the marginal utilities of all the units consumed.',true,
  `<p>True. Your course textbook: "total utility is also the sum of the marginal utilities." Your course's candy bars: 25 + 20 + 15 + 10 = 70, the total utility from 4 bars.</p>`);
gen('l13-g-peak','l13',()=>{
  /* a ≡ 2 (mod 4), so no marginal utility is exactly 0 and the peak is unique */ const a=pick([14,18,22]), d=4, n=7; const MU=Array.from({length:n},(_,i)=>a-d*i); const pos=MU.filter(m=>m>0).length;
  const TU=[0]; MU.forEach(m=>TU.push(TU[TU.length-1]+m));
  return { type:'num', kind:'num', prompt:`Made-up numbers. A family's total utility from streaming movies on a rainy weekend:${atable(['Movies','Total utility'], TU.map((v,i)=>[i,v]),{cls:'compact'})}How many movies give the family the <b>highest</b> total utility?`, answer:pos, unit:'movies',
    explain:`<p>Find each movie's marginal utility: ${MU.map((m,i)=>`${ordinal(i+1)} ${m>0?'+':''}${m}`).join(', ')}. Total utility rises while marginal utility is positive and falls once it turns negative, so it peaks at <b>${pos} movies</b> (${TU[pos]} utils).</p><p>The common slip is stopping where marginal utility starts to shrink (after the 1st movie). Shrinking isn't the same as negative.</p>` };
});
mc('l13-movie','l13','Your course textbook\'s José gets 58 utils of total utility from 4 movies and 70 from 5. Which of the following is true about the 5th movie?',
  [`Its marginal utility is 12, so total utility is still rising`,`Its marginal utility is 70`,`Its marginal utility is 14, the average utility per movie`,`Its marginal utility is −12, so total utility is falling`,`Its marginal utility is 0`],0,
  `<p>70 − 58 = <b>12 utils</b>: positive, so his total utility still rises. The textbook calls the 5th movie "just to kill time," which is why it adds less than the first (16).</p><p>70 is total utility; 14 is 70 ÷ 5, an average.</p>`);
mc('l13-why-dmu','l13','Why does marginal utility usually diminish as a person consumes more of a good?',
  [`Each extra unit goes to a less important use than the one before`,`The price rises with each extra unit`,`Total utility falls with each extra unit`,`Later units are made with lower quality`,`Utils are measured differently for each unit`],0,
  `<p>The first unit goes to the use you value most; each later one fills a less pressing want. Your course textbook's José: his first T-shirt is his favorite (22 utils); the fourth is "something to wear when all his other clothes are in the wash" (18 utils). Your course's candy bars: by the 10th, "it just doesn't taste as good as that first or second candy bar."</p><p>The tempting "total utility falls" is backwards: total utility keeps rising while marginal utility is positive.</p>`);
tf('l13-tf-neg','l13','A negative marginal utility means the unit added less satisfaction than the unit before it.',false,
  `<p>False. Adding less than the unit before is <b>diminishing</b> marginal utility, and it can still be positive. Negative marginal utility means the unit <b>lowers</b> total utility. In your course's candy example, the 5th bar adds 5 (less than the 4th's 10, but positive); the 7th bar's −5 takes total utility from 75 down to 70.</p>`);
mc('l13-buffet','l13','At an all-you-can-eat buffet, Sam has already paid the fixed price, so another plate costs him nothing extra. If he wants the highest possible total utility, when should he stop eating?',
  [`When the next plate\'s marginal utility would be zero or negative`,`As soon as his marginal utility starts to diminish`,`After the first plate, which gives the most utility`,`When his total utility reaches zero`,`Never, because extra plates are free`],0,
  `<p>With no extra cost, each plate with positive marginal utility raises his total utility, so he keeps going until the next plate would add nothing or make him worse off. That is where total utility peaks, like the 6th candy bar in your course's example.</p><p>The tempting "as soon as marginal utility starts to diminish" would stop him early: the 2nd and 3rd plates still add satisfaction. "Never" ignores that marginal utility can turn negative.</p>`);
lazy('l13-gr-pair','l13',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. The bars show a reader's marginal utility from each new book in a series:<div class="qg">${ubars([20,15,10,5], { xlab:'Books read', ylab:'Marginal utility (utils)', ymax:20, ymin:0 })}</div>Which of the following describes her <b>total utility</b> over these four books?`,
  options:[`It rises with each book, but by less each time`,`It falls with each book`,`It stays the same`,`It rises by more with each book`,`It is zero after the fourth book`], answer:0,
  explain:`<p>Every bar is above zero, so every book raises total utility: 20, then 35, 45, 50. The bars shrink, so the rises get smaller. That is diminishing marginal utility with total utility still rising.</p><p>The tempting "it falls" reads the shrinking bars as total utility. Total utility would fall only if a bar dropped below zero.</p>` }));
mc('l13-candy-tu','l13','In your course\'s example, the first four candy bars have marginal utilities of 25, 20, 15 and 10. What is the total utility from 4 candy bars?',
  [`70`,`10`,`17.5`,`75`,`45`],0,
  `<p>25 + 20 + 15 + 10 = <b>70 utils</b>, matching your course's table.</p><p>10 is the 4th bar's marginal utility only; 17.5 is the average marginal utility; 75 is total utility after 5 bars; 45 is after 2.</p>`);
tf('l13-tf-rising','l13','If marginal utility is positive but falling, total utility is still rising.',true,
  `<p>True. Any positive marginal utility adds to the total. Falling marginal utility only means the total rises more slowly. Your course: "marginal utility is going to be positive when total utility is increasing."</p>`);
mc('l13-slope','l13',`Your course's candy bars, graphed as total utility:${tuChart(CANDY_TU, { xlab:'Candy bars eaten', ymax:90, yt:[0,25,50,75], xt:[0,2,4,6,8,10] })}On a total utility graph like this one, marginal utility is shown by which of the following?`,
  [`The slope of the total utility curve`,`The height of the total utility curve`,`The height of the curve divided by the quantity`,`The area under the total utility curve`,`The horizontal axis`],0,
  `<p>Marginal utility is the rise in total utility per extra unit, which is the curve's slope. Where the curve climbs steeply, marginal utility is large; where it's flat, marginal utility is zero; where it slopes down, marginal utility is negative.</p><p>The tempting "height" is total utility itself. Height ÷ quantity is an average.</p>`);
mc('l13-course-mu','l13',`Your course's candy bar table:${candyTbl()}How does marginal utility change from the 1st to the 5th candy bar?`,
  [`It falls from 25 to 5 but stays positive`,`It rises from 25 to 75`,`It stays at 25 for each bar`,`It rises until the 5th bar and then falls`,`It is negative for each bar`],0,
  `<p>Subtract each row from the next: 25, 20, 15, 10, 5. Marginal utility <b>falls</b> from the first bar on, while total utility rises to 75. Your course's table is the reference here, and the video itself says the first bar "gives us the biggest boost in satisfaction."</p><p>The tempting "rises until the 5th bar" echoes a slip in your course video ("marginal utility is rising up until the fifth candy bar"). It's <b>total</b> utility that rises until then; marginal utility falls the whole way. "From 25 to 75" reads the total utility column.</p>`);
mc('l13-rational','l13','In the model of rational consumer choice, consumers are assumed to make choices that do which of the following?',
  [`Maximize their total utility`,`Maximize the marginal utility of the last unit they buy`,`Match the utils other consumers get`,`Keep their total spending as low as possible`,`Stop as soon as marginal utility starts to diminish`],0,
  `<p>The AP Microeconomics framework: "In a model of rational consumer choice, consumers are assumed to make choices so as to maximize their total utility." Your course: the optimal choice is "the point where he reaches the highest level of total utility."</p><p>The tempting "maximize the marginal utility of the last unit" would mean buying only one unit, since the first usually adds the most. Stopping when marginal utility starts to diminish gives up units that still add satisfaction.</p>`);
tf('l13-tf-first','l13',`Your course's candy bar table:${candyTbl()}Because total utility keeps rising through the 5th candy bar, marginal utility must also be rising through the 5th bar.`,false,
  `<p>False. Total utility rises (25, 45, 60, 70, 75), but by less each time: marginal utility is 25, 20, 15, 10, 5. It <b>falls</b> from the first bar. Rising total utility only means marginal utility is positive. Your course's video slips here too ("marginal utility is rising up until the fifth candy bar"); the table settles it.</p>`);

/* ===== Lesson 13 quick checks ===== */
mc('l13c-util','l13','Made-up numbers. Maya says a slice of pizza gives her 30 utils and a taco gives her 18 utils. Which conclusion is valid?',
  [`Maya prefers the pizza to the taco`,`Maya enjoys pizza more than her friend, who rates it 15 utils`,`The pizza costs more than the taco`,`Maya would buy only pizza`,`Maya\'s total utility is 12 utils`],0,
  `<p>Utils rank one person's own options, so Maya prefers pizza. They can't be compared with another person's utils, and they say nothing about prices.</p>`);
mc('l13c-mu','l13','Made-up numbers. Your total utility from 1 cup of coffee is 10 utils and from 2 cups is 16 utils. What is the marginal utility of the 2nd cup?',
  [`6 utils`,`8 utils`,`16 utils`,`10 utils`,`26 utils`],0,
  `<p>16 − 10 = <b>6 utils</b>, the extra satisfaction from the 2nd cup. 8 is the average (16 ÷ 2); 16 is total utility.</p>`);
mc('l13c-zone','l13',`Your course's candy bar table:${candyTbl()}What happens to total utility when the 9th candy bar is eaten?`,
  [`It falls by 15 utils, because the 9th bar\'s marginal utility is −15`,`It rises by 45 utils`,`It stays at 75`,`It becomes negative`,`It rises by 15 utils`],0,
  `<p>Total utility goes from 60 to 45, a change of −15: that's the 9th bar's marginal utility. Negative marginal utility lowers total utility, though the total (45) is still positive.</p>`);
mc('l13c-graph','l13','On a total utility curve, what is marginal utility at the very top of the curve, where it is flat?',
  [`Zero`,`At its largest`,`Negative`,`Equal to total utility`,`Equal to the price`],0,
  `<p>Flat means the curve isn't climbing: the last unit added nothing, so marginal utility is <b>zero</b>. Before the top it's positive; after it, negative.</p>`);
mc('l13c-dmu','l13','Your first cup of coffee in the morning wakes you up; the third cup barely makes a difference. Which idea does this illustrate?',
  [`Diminishing marginal utility`,`Negative total utility`,`Increasing marginal utility`,`Total utility falling`,`Utils being compared between people`],0,
  `<p>Each extra cup adds less than the one before: <b>diminishing marginal utility</b>. Your total satisfaction still rises with the third cup; it just rises by less.</p>`);
mc('l13c-skill','l13',`Made-up numbers. A shopper's total utility from pairs of socks:${atable(['Pairs','0','1','2','3','4','5'],[['Total utility','0','8','14','18','20','19']],{cls:'compact'})}Which pair is the first one to make her total utility <b>fall</b>?`,
  [`The 5th pair`,`The 2nd pair`,`The 4th pair`,`The 3rd pair`,`None of them`],0,
  `<p>Marginal utilities: +8, +6, +4, +2, −1. The 5th pair is the first with negative marginal utility (20 → 19). Pairs 2 to 4 add less each time, but they still add.</p>`);

/* Course materials checked 2026-10-27: video 3.1 transcript (utility, TU/MU, candy bars, DMU), Module 3 slides 2-5, course textbook §6.1
   (utils, Table 6.2, law of diminishing marginal utility, "Measuring Utility with Numbers"). Source problems noted in the lesson:
   transcript says MU is "rising up until the fifth candy bar" (it falls from the first); transcript places TU's decline "after the fifth"
   and "after the sixth" (TU is 75 at 5 and 6 and falls from the 7th); slide 4's MU line reaches zero near bar 5 (table: bar 6). */
const L13TAGS = {
  'l13-tu-def':['MS3 OS61','tu','terms','M1 M5'], 'l13-mu-def':['MS3 OS61','tu','terms','M1 M5'], 'l13-g-mu':['MS3 OS61','tu','data','M5 M1'],
  'l13-candy-peak':['MS3','tu','data','M1 M3'], 'l13-tf-dmu-tu':['MS3 OS61','tu','terms','M2'], 'l13-gr-tu':['MS3','tu','graphs','M2 M6'],
  'l13-dmu-def':['MS3 OS61','tu','terms','M2 M6'], 'l13-g-tu':['OS61','tu','data','M1'], 'l13-neg':['MS3','tu','models','M6 M3'],
  'l13-tf-utils':['OS61','tu','terms','M4'], 'l13-which-table':['MS3 OS61','tu','data','M2'], 'l13-avg':['MS3 OS61','tu','data','M5 M1'],
  'l13-tshirt':['OS61','tu','data','M1 M5'], 'l13-gr-mu':['MS3','tu','graphs','M1 M2'], 'l13-zero':['MS3','tu','terms','M3'],
  'l13-tf-sum':['OS61','tu','terms','M1'], 'l13-g-peak':['MS3','tu','data','M2'], 'l13-movie':['OS61','tu','data','M1 M5'],
  'l13-why-dmu':['MS3 OS61 ELM','tu','models','M2'], 'l13-tf-neg':['MS3','tu','terms','M6'], 'l13-buffet':['MS3 CED16','tu','models','M2 M3'],
  'l13-gr-pair':['MS3 OS61','tu','graphs','M2'], 'l13-candy-tu':['MS3 OS61','tu','data','M1 M5'], 'l13-tf-rising':['MS3','tu','terms','M2'],
  'l13-slope':['MS3 OS61','tu','graphs','M1 M5'], 'l13-course-mu':['MS3','tu','data','M1 M2'], 'l13-tf-first':['MS3','tu','data','M2 M1'], 'l13-rational':['CED16 MS3','tu','terms','M1 M2 M4'],
  'l13c-util':['OS61','tu','terms','M4'], 'l13c-mu':['MS3 OS61','tu','data','M5'], 'l13c-zone':['MS3','tu','data','M6 M3'],
  'l13c-graph':['MS3','tu','graphs','M3'], 'l13c-dmu':['MS3 OS61','tu','models','M2'], 'l13c-skill':['MS3','tu','data','M2 M6']
};
u3tag(L13TAGS);

U3_CARDS.l13 = [
  ['Util','What is a util, and what can\'t it be used for?','A made-up unit of one person\'s satisfaction, used so choices can be compared with numbers. Utils rank one person\'s own options; they can\'t be compared between people.','Ana: coffee 20 utils, tea 12 utils, so she prefers coffee. Ben\'s 10 utils for coffee doesn\'t mean Ana likes it twice as much.','Never compare two people\'s utils.'],
  ['Total utility','What is total utility?','The total satisfaction from consuming a given quantity of a good. It equals the sum of the marginal utilities of all the units.','Your course\'s candy bars: 25 + 20 + 15 + 10 = 70 utils from 4 bars.','Total utility is the whole amount, not what the last unit added.'],
  ['Marginal utility','What is marginal utility, and how do you calculate it?','The extra satisfaction from one more unit: MU = change in total utility ÷ change in quantity. From a table, subtract the row above.','Candy bars: total utility 45 at 2 bars, 60 at 3 bars, so the 3rd bar\'s MU = 15.','Don\'t divide total utility by quantity; that\'s an average.'],
  ['Diminishing marginal utility','What is diminishing marginal utility, and why does it happen?','Each extra unit adds less satisfaction than the one before, because earlier units go to the uses you value most and later ones fill less important wants.','José\'s first T-shirt (his favorite) adds 22 utils; the 4th, worn when everything else is in the wash, adds 18 (your course textbook).','Total utility still rises while marginal utility is positive.'],
  ['MU positive, zero, negative','What does each sign of marginal utility do to total utility?','MU > 0: total utility rises. MU = 0: total utility is at its maximum. MU < 0: total utility falls.','Candy bars: bars 1-5 positive (TU rises to 75), bar 6 zero (TU stays 75), bars 7-10 negative (TU falls to 25).','MU = 0 means total utility is at its peak, not zero.'],
  ['Negative marginal utility','What does negative marginal utility mean?','The extra unit makes you worse off: total utility falls when you consume it.','The 8th candy bar: MU −10, total utility drops from 70 to 60.','"Less than the unit before" is diminishing MU, which can still be positive.'],
  ['TU and MU on graphs','How do the total utility and marginal utility graphs line up?','Marginal utility is the slope of the total utility curve. Where TU climbs, the MU bars are above zero; where TU is flat (its peak), MU is zero; where TU falls, MU is below zero.','Candy bars: TU peaks at bars 5-6, exactly where MU reaches 0.','The height of the TU curve is total utility, not marginal utility.'],
  ['Total from marginal','How do you get total utility from a list of marginal utilities?','Add them up, starting from the first unit.','MU 30, 24, 18: total utility from 3 units = 72.','The last marginal utility alone is not the total.'],
  ['The candy bar table','In your course\'s candy example, where does total utility peak, and why?','Total utility reaches 75 at bar 5 and stays at 75 at bar 6, whose marginal utility is 0. From bar 7 on, marginal utility is negative and total utility falls.','Bar 7: 75 → 70 (MU −5).','Your course video says MU is "rising up until the fifth candy bar"; it actually falls from the first.'],
  ['Consumers maximize total utility','What does consumer choice theory assume consumers try to do?','Make choices that maximize their total utility, given the limits they face (like a budget).','A diner who\'s already paid for a buffet keeps eating until the next plate would add nothing.','They maximize total utility, not the utility of any single unit.'],
  ['Average versus marginal','How is marginal utility different from average utility?','Marginal utility is what the last unit added (TU now − TU before). Average utility is total utility ÷ quantity. The CLEP asks about marginal.','TU 45 at 2 slices, 60 at 3: MU of the 3rd = 15; average = 20.','Dividing gives the wrong answer for a marginal question.'],
  ['Utility (from Lesson 5)','How does this unit use the idea of utility from Lesson 5?','Utility is the satisfaction from consuming a good. Lesson 5 compared extra benefit with cost; this unit measures that benefit in utils to explain how people choose and where demand curves come from.','Lesson 5\'s shrinking pizza-slice bars are marginal utility.','Utility is personal: it depends on the person\'s own tastes.']
];

Object.assign(U3_WRITE, {
  'w-l13-1':{lesson:'l13',prompt:'Use your course\'s candy bar example to explain the difference between total utility and marginal utility. How can total utility rise while marginal utility falls?',
    model:'Total utility is all the satisfaction from the candy bars eaten so far; marginal utility is the extra satisfaction from one more bar, the change in total utility. In the course example, the first bar adds 25 utils, the second 20, the third 15, so total utility goes 25, 45, 60. Marginal utility falls (diminishing marginal utility) because each bar is less enjoyable than the last, but as long as a bar adds something positive, total utility still rises, just more slowly. At the 6th bar marginal utility is 0 and total utility peaks at 75; after that, marginal utility is negative and total utility falls.',
    checklist:['Defines total utility as total satisfaction and marginal utility as the extra satisfaction from one more unit','Uses correct numbers from the candy example (for example 25, 20, 15 and totals 25, 45, 60)','Explains that positive but falling marginal utility still raises total utility','Says total utility peaks where marginal utility is 0 and falls when marginal utility is negative']},
  'w-l13-2':{lesson:'l13',prompt:'Explain why marginal utility usually diminishes, using an example from your own life. Then explain what negative marginal utility would mean in your example.',
    model:'Marginal utility diminishes because the first units go to the uses we value most, and each later unit fills a less important want. For example, the first glass of water after a run quenches real thirst; the second is nice; the fourth I drink only because it\'s there. Each adds less satisfaction than the one before, though my total satisfaction still rises. Negative marginal utility would be a glass that makes me worse off, like a sixth glass that leaves me feeling sick: drinking it would lower my total utility.',
    checklist:['Gives the reason: earlier units go to more valued uses, later ones to less valued uses','Uses a concrete personal example with units consumed one after another','Notes that total utility still rises while marginal utility is positive','Explains negative marginal utility as a unit that lowers total utility']}
});

U3_PLAN.l13 = {
  core:['l13-tu-def','l13-mu-def','l13-g-mu','l13-candy-peak','l13-tf-dmu-tu','l13-gr-tu','l13-dmu-def','l13-g-tu','l13-neg','l13-tf-utils','l13-which-table','l13-avg'],
  more:['l13-tshirt','l13-gr-mu','l13-zero','l13-tf-sum','l13-g-peak','l13-movie','l13-why-dmu','l13-tf-neg','l13-buffet','l13-gr-pair','l13-candy-tu','l13-tf-rising','l13-slope','l13-course-mu','l13-rational','l13-tf-first']
};

U3_LESSONS.push({ id:'l13', unit:3, title:'Total Utility and Marginal Utility', mins:35, src:'Modern States video 3.1 (first part) and Module 3 slides 2-5 · Course textbook (OpenStax) §6.1',
  sources:['MS3','OS61','CB','CED16','ELM'],
  oneline:'Utility is the satisfaction you get from consuming something. Total utility is all of it; marginal utility is what one more unit adds, and it usually shrinks as you consume more.',
  body:`
<p>Lesson 5 introduced ${dt('utility','utility')} and showed each extra slice of pizza adding a smaller benefit. Unit 2 then used ${dt('demand-curve','demand curves')} without asking where they come from. Unit 3 answers that question. It starts here, with how much satisfaction one person gets from a good, and ends in Lesson 15 with the demand curve itself.</p>

<h2>Utility and utils</h2>
<!-- src: MS3 (video 3.1 opening: "the level of satisfaction that they derive from consuming a given amount of a good"; slide 2); OS61 (utility definition; utils; "you cannot make comparisons between the utils of individuals"; "Measuring Utility with Numbers": only need to know which of two alternatives one prefers); CED16 (CBA-2.A.2: consumers are assumed to maximize total utility) -->
<p>Your course: when consumers make choices, "what we consider is the level of satisfaction that they derive from consuming a given amount of a good." That satisfaction is <b>utility</b>. Economists assume people choose so as to get the most total utility they can (the AP framework states this as the basic assumption of consumer choice).</p>
<p>To work with numbers, your course textbook measures utility in ${dt('util','<b>utils</b>')}, made-up units of satisfaction. A util is like a personal star rating: it tells you which of <b>your</b> options you like more.</p>
<p><b>Why that's enough:</b> the textbook points out that the key assumption is "not that utility can be measured by an outside party, but only that individuals can decide which of two alternatives they prefer." So the numbers rank choices for one person. They can't be compared between people:</p>
${FIG3.l13utils()}
<p>So what: every comparison in this unit is one person weighing their own options. That is all the theory needs.</p>
<div data-check="l13c-util"></div>

<h2>Total utility and marginal utility</h2>
<!-- src: MS3 (video 3.1 definitions: total utility "the total level of satisfaction that a consumer gets from consuming a given quantity of the good"; marginal utility "the additional utility that we derive from consuming one more unit of the good ... the change in total utility for one additional unit"); OS61 (MU = change in total utility ÷ change in quantity; "total utility is also the sum of the marginal utilities") -->
<p>Your course uses two measures:</p>
<div class="terms">${term(dt('total-utility','Total utility'),'"The total level of satisfaction that a consumer gets from consuming a given quantity of the good."')}${term(dt('marginal-utility','Marginal utility'),'"The additional utility that we derive from consuming one more unit of the good": the change in total utility from one more unit.')}</div>
<p>As a formula (your course textbook):</p>
<div class="math">Marginal utility (MU) = change in total utility ÷ change in quantity</div>
<p><b>Worked example: your course's candy bars.</b> Total utility is 25 utils after one bar and 45 after two:</p>
<div class="math">MU of the 2nd bar = (45 − 25) ÷ (2 − 1) = <b>20 utils</b></div>
<p>Run it backward and you get the other key fact: total utility is the <b>sum</b> of the marginal utilities. Each bar stacks its marginal utility on top of the total so far:</p>
${FIG3.l13stack()}
<p>Check: 25 + 20 + 15 + 10 = 70, the total after 4 bars in your course's table. Marginal is "the next one"; total is "all of them so far." Watch out for one trap: dividing total utility by quantity (70 ÷ 4 = 17.5) gives an average, which is a different number and not what the CLEP means by marginal.</p>
<div data-check="l13c-mu"></div>

<h2>The candy bar example: when total utility peaks</h2>
<!-- src: MS3 (video 3.1 candy bars: "your belly might start to hurt ... it just doesn't taste as good as that first or second candy bar"; MU positive when TU increasing, negative when TU declining; slide 3 table). Source problems: the video says "marginal utility is rising up until the fifth candy bar" (the table shows it falling from 25); it says TU "begins to decline" after the fifth and also "after the sixth" (TU is 75 at both 5 and 6 and first falls at the 7th). The lesson follows the table. -->
<p>Your course's example: think of your favorite candy bar. The first couple are great. By the 10th, "your belly might start to hurt ... and it just doesn't taste as good as that first or second candy bar."</p>
${FIG3.l13candy()}
<p>Here is your course's table, with the marginal utilities worked out:</p>
${FIG3.l13zones()}
<p><b>The rule</b> (your course): "marginal utility is going to be positive when total utility is increasing" and "marginal utility is going to be negative when total utility starts to decline." In between sits the turning point: when marginal utility is <b>zero</b>, total utility is at its <b>maximum</b>.</p>
<p><b>Why:</b> marginal utility is the amount added to the total. Add a positive number and the total grows; add zero and it stays put; add a negative number and it shrinks.</p>
<p class="small muted"><b>A note on your course video.</b> It says marginal utility "is rising up until the fifth candy bar." The table shows the opposite: marginal utility <b>falls</b> from 25 to 5 over the first five bars. It's total utility that rises until then. The video also places the decline in total utility both "after the fifth" and "after the sixth" bar; the table settles it: total utility is 75 at both 5 and 6 bars and first falls with the 7th.</p>
<div data-check="l13c-zone"></div>

<h2>Graphing total and marginal utility</h2>
<!-- src: MS3 (video 3.1 graphical perspective; slides 4-5). Source problem: slide 4 draws the MU line reaching zero near bar 5 and stopping; the table puts MU = 0 at bar 6 and negative after. The figure follows the table. OS61 (Table 6.2 José's T-shirts for the explorer). -->
<p>Your course graphs the two measures side by side. Line them up and the rule from the last section becomes a picture:</p>
${FIG3.l13graphs()}
<p>Notice: marginal utility is the <b>slope</b> of the total utility curve. A steep climb means a big marginal utility; the flat top means zero; a downhill stretch means negative. (Your course's slide draws the marginal utility line hitting zero near bar 5; by its own table that happens at bar 6.)</p>
<p>Try it with your course's candy bars, then with your course textbook's T-shirts, where marginal utility never turns negative within the table:</p>
<div data-widget="utility"></div>
<p>What to notice: in both data sets the marginal utility bars shrink from the first unit on. For candy they cross zero; for T-shirts they don't, so total utility keeps rising through all 8 shirts.</p>
<div data-check="l13c-graph"></div>

<h2>Diminishing marginal utility</h2>
<!-- src: MS3 (video 3.1 "diminishing marginal utility ... occurs when marginal utility declines as consumption increases"; "going from zero to one, gives us the biggest boost"; slide 5); OS61 (law of diminishing marginal utility; José's favorite T-shirt 22 utils, 4th "something to wear when all his other clothes are in the wash" 18 utils; 5th movie "just to kill time"); ELM (Rhoads: "The utility of additional (or marginal) units continues to decrease as we consume more and more") -->
<p>Your course: ${dt('dmu','<b>diminishing marginal utility</b>')} "occurs when marginal utility declines as consumption increases." The first candy bar, "going from zero to one, gives us the biggest boost in satisfaction"; each one after adds less. Your course textbook calls it the law of diminishing marginal utility.</p>
<p><b>Why it happens:</b> you use the first unit for whatever you want most, and each extra unit for something you want a bit less.</p>
${FIG3.l13dmu()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of a phone with a dead battery. The first 10% of charge is precious: you can call home. The next 10% lets you check messages. By 90%, another 10% just means you won't have to charge before bed. Every 10% is the same amount of electricity, but each one matters less than the one before. That's marginal utility diminishing while your total (a fuller battery) keeps rising.</p></div>
<p><b>So what:</b> diminishing marginal utility explains why people spread their money across many goods instead of spending it all on one, which is Lesson 14's topic, and it's one reason demand curves slope down (Lesson 15). Keep two ideas apart: <b>diminishing</b> means each unit adds less; <b>negative</b> means a unit makes you worse off.</p>
<div data-check="l13c-dmu"></div>

<h2>Read a utility table</h2>
<!-- src: MS3 (relationship between TU and MU). Exam skill: computing marginal utility from a total utility table and reading what it does to total utility. -->
<p>CLEP questions often give a total utility table and ask which unit maximizes total utility, or which first makes it fall. The move: subtract down the column to get each unit's marginal utility, then read its sign.</p>
<div data-widget="zonesort"></div>
<div data-check="l13c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L13TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"Marginal utility is the total satisfaction from all the units."</span>That's total utility. Marginal utility is only what the <b>last</b> unit added.</li>
<li><span class="wrong">"Diminishing marginal utility means total utility is falling."</span>Each unit adds less, but while it adds anything, the total still rises. Candy bars 1 to 5: marginal utility falls, total utility rises to 75.</li>
<li><span class="wrong">"When marginal utility is zero, total utility is zero."</span>Zero marginal utility is the top of the total utility curve: 75 utils at the 6th candy bar.</li>
<li><span class="wrong">"Utils let you compare two people's satisfaction."</span>Utils only rank one person's own choices (your course textbook's coffee example).</li>
<li><span class="wrong">"Marginal utility is total utility divided by the number of units."</span>That's the average. Marginal utility is the change: total now minus total before.</li>
<li><span class="wrong">"Negative marginal utility just means a unit added less than the one before."</span>Adding less is diminishing marginal utility. Negative means the unit <b>lowers</b> total utility.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li><b>Utility</b> is satisfaction, measured in <b>utils</b> that rank one person's own choices.</li>
<li><b>Total utility</b> is all the satisfaction so far; <b>marginal utility</b> is the change from one more unit, and total utility is the sum of the marginal utilities.</li>
<li>Marginal utility <b>positive</b>: total utility rises. <b>Zero</b>: total utility is at its maximum. <b>Negative</b>: total utility falls.</li>
<li>On a graph, marginal utility is the <b>slope</b> of the total utility curve.</li>
<li><b>Diminishing marginal utility</b>: each extra unit adds less, because it goes to a less valued use.</li>
<li>To read a table, subtract down the total utility column and look at the signs.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Total utility and marginal utility" under Theory of consumer choice (5% to 10% of the exam). Expect a total utility table with a question on marginal utility or where total utility peaks, and a definition question on diminishing marginal utility.</p>
</div>`,
  deeper:`
<h3>Water and diamonds</h3>
<p>Adam Smith puzzled over why water, which we can't live without, is cheap while diamonds, which nobody needs, are expensive. Econlib's article on marginalism (Steven E. Rhoads) explains the answer economists later found: Smith "had failed to distinguish between 'total' utility and 'marginal' utility." "The total utility or satisfaction of water exceeds that of diamonds," but we have so much water that "the last units are not" very valuable. Prices follow marginal utility, the value of one more unit, not total utility.</p>
<h3>Do people really think in utils?</h3>
<p>Your course textbook admits no store sells a "utilimometer." Its point: what matters is "only that individuals can decide which of two alternatives they prefer." Lesson 14 shows that comparing small trade-offs, one more of this and one less of that, leads to the same choice the util numbers would.</p>`,
  links:[ {k:'Textbook',t:'6.1 Consumption Choices',s:'OpenStax, Principles of Microeconomics 3e (free online)',u:'https://openstax.org/books/principles-microeconomics-3e/pages/6-1-consumption-choices',w:'The newer edition of your course textbook\'s §6.1: total and marginal utility with José\'s T-shirts and movies.'},
          {k:'Article',t:'Marginalism',s:'Econlib, Concise Encyclopedia of Economics (Steven E. Rhoads)',u:'https://www.econlib.org/library/Enc/Marginalism.html',w:'A short read on why "marginal" thinking matters, including the water-and-diamonds puzzle.'} ]
});
