/* ===== Lesson 25 figures ===== */
/* Made-up monopoly used for the exam-skill graph and two questions: demand P = 12 − Q, MR = 12 − 2Q, TC = 12 + 2Q + 0.25Q² (MC = 2 + 0.5Q; ATC = 12/Q + 2 + 0.25Q, lowest ≈ $5.46 at Q ≈ 6.93, where MC crosses it).
   Checked by script: MR = MC at Q 4 (both $4); price from demand $8; ATC at 4 = $6; profit (8 − 6) × 4 = $8; D = MC at Q 6.67, P 5.33; MR = 0 at Q 6 (price $6, largest revenue $36). */
const MG = { d:q=>12-q, mr:q=>12-2*q, mc:q=>2+0.5*q, atc:q=>12/q+2+0.25*q };
const mgLines = (o={}) => { const qs=[]; for(let q=1.2;q<=11.6;q+=0.2) qs.push(Math.round(q*10)/10);
  return [ dem([0,12],[12,0], o.dl===undefined?'D':o.dl), {a:[0,12], b:[6,0], label:o.mrl===undefined?'MR':o.mrl, c:'var(--g2)', lx:4, ly:-2},
    {pts:[[0,2],[11,7.5]], c:'var(--accent)', label:o.mcl===undefined?'MC':o.mcl, lx:4, ly:4}, {pts:qs.filter(q=>MG.atc(q)<=11.5).map(q=>[q,MG.atc(q)]).reverse(), c:'var(--muted)', label:o.atcl===undefined?'ATC':o.atcl, lx:6, ly:4, w:2} ]; };
const DB_ATC = q => DB.find(r=>r.q===q).tc / q;

/* L25 V1: barriers to entry (course slide 212; textbook §9.1 Table 9.1) */
FIG5.l25bar = () => fig(atable(['Barrier','Example'], [
  ['<b>Control of a key resource</b><br><span class="small">The firm owns most of an input others need</span>','De Beers and diamonds (course); ALCOA and bauxite in the 1930s (textbook)'],
  ['<b>Government-created (legal)</b><br><span class="small">A law gives one firm the sole right to sell</span>','A drug patent (20 years in the U.S.); copyrights; trademarks'],
  ['<b>Natural monopoly</b><br><span class="small">One firm can supply the whole market more cheaply than two or more</span>','Water pipes or electricity lines in a town (textbook)'],
  ['<b>Intimidating rivals</b> (textbook adds)<br><span class="small">Threats of sharp price cuts if anyone enters</span>','Predatory pricing: illegal under U.S. antitrust law, but hard to prove']
], { cls:'compact wrap' }),
  'Your course names three barriers to entry (slide 212); your course textbook\'s Table 9.1 adds trademarks and intimidation. Each one keeps rivals out, which is what lets a monopoly stay the only seller. Lesson 26 looks more closely at natural monopoly.');

/* L25 V2: the demand curve each kind of firm faces (textbook §9.2 Figure 9.3) */
FIG5.l25perc = () => figs([
  ['Perfect competitor: a price taker', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Firm output', ylab:'Price', aria:'A flat demand line at the market price',
    lines:[ {pts:[[0,5],[10,5]], c:'var(--accent)', label:'D = MR = P', lx:-4, ly:-6, anchor:'end'} ],
    dots:[{q:2.5,p:5,label:'sell a little',c:'var(--muted)',lx:-6,ly:18,anchor:'start'},{q:7.5,p:5,label:'or a lot',c:'var(--ink)',lx:-6,ly:18,anchor:'start'}] })],
  ['Monopoly: a price maker', sdg({ xmax:10, ymax:10, xt:[], yt:[], xlab:'Output', ylab:'Price', aria:'A downward-sloping market demand curve with a high-price point and a low-price point',
    lines:[ dem([0,9],[9,0],'D') ],
    dots:[{q:2.5,p:6.5,label:'high price, few sales',c:'var(--muted)',lx:8,ly:-6},{q:6.5,p:2.5,label:'low price, many sales',c:'var(--ink)',lx:-6,ly:-12,anchor:'end'}] })]
], 'Shapes only, after your course textbook\'s Figure 9.3. A perfectly competitive firm can sell as much as it likes at the market price, so its demand line is flat. A monopoly is the whole market, so it faces the downward-sloping market demand curve: to sell more it must charge less. Your course: "Price: determined by firm. Quantity: determined by demand."');

/* L25 V3: why MR is below price, De Beers going from 100 to 200 diamonds (course slide 215; textbook §9.2 "Clear it up") */
FIG5.l25mrw = () => fig(wfall([
  {label:'100 more at $1,600', from:0, to:160000, c:'var(--accent)'},
  {label:'first 100: $200 less each', from:160000, to:140000, c:'var(--bad)', text:'−$20,000'},
  {label:'change in revenue', from:0, to:140000, c:'var(--ink)', bold:true, text:'$140,000'}
], { max:160000, left:170, w:380, fmtv:v=>usd(v), aria:'Revenue gained from 100 more diamonds minus revenue lost on the first 100' }),
  'Your course\'s De Beers numbers. To sell 200 diamonds instead of 100, it must cut the price from $1,800 to $1,600 on every diamond. The new 100 bring in 100 × $1,600 = $160,000, but the first 100 now sell for $200 less: −$20,000. Revenue rises by $140,000, or $1,400 per extra diamond. That is the marginal revenue, and it is less than the $1,600 price.');

/* L25 V4: De Beers table (course slides 214-215) with profit added */
FIG5.l25tbl = () => fig(atable(['Qty','Price','Profit','MR','MC'],
  DB.map(r=>[r.q, usd(r.p), `<b>${usd(r.tr-r.tc)}</b>`, r.mr===null?'–':usd(r.mr), r.mc===null?'–':usd(r.mc)]),
  { hl:{2:{row:'u3z1'},3:{row:'u3z2'}}, cls:'compact u5tight' }),
  'Your course\'s De Beers table (Qty = diamonds), with profit (total revenue − total cost) in place of the revenue and cost columns. MR and MC are per diamond for each step of 100 (for example, from 200 to 300 diamonds revenue rises $100,000 and cost rises $100,000, so MR = MC = $1,000). They are equal on the step to 300 diamonds (the darker row), where the price is $1,400 and profit is $130,000. Profit is also $130,000 at 200 (lighter row), because that step adds as much cost as revenue; your course names 300.');

/* L25 V5: De Beers on a graph, the three steps (course slides 217-218; textbook §9.2 Figure 9.7) */
FIG5.l25graph = () => { const atc = DB.filter(r=>r.q).map(r=>[r.q, r.tc/r.q]);
  return fig(sdg({ xmax:580, ymax:2100, xt:[0,100,200,300,400,500], yt:[0,500,967,1400,2000], xlab:'Diamonds', ylab:'Dollars per diamond', aria:'De Beers demand, marginal revenue, marginal cost and average total cost, with a profit rectangle at 300 diamonds',
    areas:[{pts:[[0,DB_ATC(300)],[300,DB_ATC(300)],[300,1400],[0,1400]], c:'var(--accent)', o:0.3, label:[95,1160,'$130,000']}],
    lines:[ {pts:DB.map(r=>[r.q,r.p]), c:'var(--ink)', w:2.4}, {pts:DB.filter(r=>r.q).map(r=>[r.q,r.mr]), c:'var(--g2)', label:'MR', lx:6, ly:4},
      {pts:DB.filter(r=>r.q).map(r=>[r.q,r.mc]), c:'var(--accent)'}, {pts:atc, c:'var(--muted)', w:2} ],
    labels:[[508,1380,'MC','var(--accent)','start'],[508,1110,'ATC','var(--muted)','start'],[508,860,'D','var(--ink)','start']],
    vls:[{q:300,p:1400}], dots:[{q:300,p:1000,label:'A',c:'var(--g2)',lx:8,ly:16},{q:300,p:1400,label:'B',c:'var(--ink)',lx:8,ly:-8},{q:300,p:DB_ATC(300),label:'',c:'var(--muted)'}] }),
  'Your course\'s De Beers numbers, with MR and MC plotted at the end of each 100-diamond step. Step 1: MR = MC at A, so produce 300 diamonds. Step 2: go straight up to the demand curve at B: buyers will pay $1,400. Step 3: average total cost at 300 is $290,000 ÷ 300 ≈ $967 (your course rounds to $966), so profit = 300 × ($1,400 − $966.67) = $130,000.'); };

/* L25 V6: reading a monopoly graph, lettered (made-up model MG) */
FIG5.l25read = () => fig(sdg({ xmax:12, ymax:12, xt:[0,4,6,12], yt:[0,4,6,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:'Monopoly graph with demand, marginal revenue, marginal cost and average total cost; points A to E',
  lines: mgLines(), vls:[{q:4,p:8},{q:6,p:6}],
  dots:[{q:4,p:4,label:'A',c:'var(--g2)',lx:-14,ly:4},{q:4,p:8,label:'B',c:'var(--ink)',lx:8,ly:-6},{q:4,p:6,label:'C',c:'var(--muted)',lx:-14,ly:4},{q:6,p:6,label:'F',c:'var(--ink)',lx:8,ly:-6},{q:20/3,p:16/3,label:'E',c:'var(--accent)',lx:8,ly:16}] }),
  'Made-up numbers. A: MR = MC (quantity 4). B: on demand straight above A (price $8). C: on ATC at that quantity ($6). F: where MR = 0 (quantity 6, price $6): the largest total revenue, not the largest profit. E: where demand crosses MC, the efficient point (Lesson 26).');

/* ===== Lesson 25: Monopoly: Market Power and the Profit-Maximizing Price (Modern States video 5.3, first part; Module 5 slides 211-220) =====
   Common mistakes: M1 a monopoly can charge any price it likes · M2 the price is read where MR = MC · M3 for a monopoly MR equals price
   M4 a monopoly earns a profit because its price is above the MR = MC point (or above MC) · M5 monopoly profits get competed away in the long run
   M6 any firm with a big market share is a monopoly, whatever the substitutes */

mc('l25-barrier','l25','Your course names three causes of monopoly. Which list matches them?',
  [`Control of a key resource, government-created rights such as patents, and natural monopoly`,`High prices, high profits and advertising`,`Many sellers, identical products and free entry`,`Price discrimination, collusion and cartels`,`Low marginal cost, high demand and good management`],0,
  `<p>Your course (slide 212): "Barriers to Entry cause Monopoly Power": resource restrictions (De Beers), government-created monopolies (patents) and natural monopolies ("one firm can provide the good at a lower cost than two or more firms").</p><p>Many sellers, identical products and free entry describe perfect competition. Collusion and cartels belong to oligopoly (Lesson 27).</p>`);
mc('l25-patent','l25','Made-up example. A drug company spends years developing a new medicine and receives a patent on it. What kind of barrier to entry is this, and why does the government grant it?',
  [`A government-created barrier, so the company can recover its research costs before rivals copy the drug`,`A natural monopoly, because drugs have large economies of scale`,`Control of a key resource, because the company owns the factory`,`Predatory pricing, because the company will cut its price`,`Not a barrier, because other firms can sell the drug at once`],0,
  `<p>Your course: "the government grants that patent to be the only producer of that drug so that they are able to recoup their costs of the research and development." Your course textbook: a patent gives "the exclusive legal right to make, use, or sell the invention for a limited time; in the United States, exclusive patent rights last for 20 years." The College Board\'s 2024 AP exam calls a patent "a legal barrier to entry."</p>`);
tf('l25-tf-anyprice','l25','Because a monopoly is the only seller, it can charge as high a price as it likes and still sell as much as it wants.',false,
  `<p>False. The monopoly chooses its price, but buyers choose how much to buy. Your course: "they are also going to be dependent on how much they can actually sell, so they can\'t make the price infinitely high." Your course textbook: "No monopolist ... can require consumers to purchase its product" (M1).</p>`);
mc('l25-mr-why','l25','Why is a monopoly\'s marginal revenue less than its price (for every unit after the first)?',
  [`To sell one more unit it must lower the price on all the units it sells, not just the extra one`,`Because its marginal cost is rising`,`Because the government taxes its extra sales`,`Because it is a price taker`,`Because buyers pay less for each unit over time`],0,
  `<p>Your course textbook: when output rises, "First, we sell one additional unit at the new market price. Second, all the previous units, which could have been sold at the higher price, now sell for less." So MR is below the price and the MR curve lies below demand (M3).</p><p>A price taker has MR = P (Lesson 22). Rising MC is about costs, not revenue.</p>`);
gen('l25-g-mr','l25',()=>{
  let Q1, P1, d, P2, mr;
  for(;;){ Q1 = pick([3,4,5,6,8,9]); P1 = pick([40,50,60,80,100]); d = pick([2,4,5]); P2 = P1 - d; mr = P2*(Q1+1) - P1*Q1; if(mr > 0) break; }
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A monopoly can sell <b>${Q1}</b> units a week at <b>$${P1}</b> each. To sell <b>${Q1+1}</b>, it must cut its price to <b>$${P2}</b> on every unit. What is the marginal revenue of the ${ordinal(Q1+1)} unit?`, answer: mr,
    explain:`<p>Revenue at ${Q1} units: ${Q1} × $${P1} = $${P1*Q1}. At ${Q1+1} units: ${Q1+1} × $${P2} = $${P2*(Q1+1)}. MR = $${P2*(Q1+1)} − $${P1*Q1} = <b>$${mr}</b>.</p><p>Another way: the extra unit brings in $${P2}, but the first ${Q1} units each sell for $${d} less (−$${d*Q1}): $${P2} − $${d*Q1} = $${mr}. The common wrong answer is $${P2}, the new price (M3).</p>` };
});
mc('l25-debeers','l25','Your course\'s De Beers table shows, for each step of 100 diamonds, marginal revenue of $1,800, $1,400, $1,000, $600 and $200, and marginal cost of $750, $900, $1,000, $1,100 and $1,250. The prices are $1,800 (100 diamonds), $1,600 (200), $1,400 (300), $1,200 (400) and $1,000 (500). What does a profit-maximizing De Beers do?',
  [`Sells 300 diamonds at $1,400 each`,`Sells 300 diamonds at $1,000 each`,`Sells 500 diamonds at $1,000 each`,`Sells 400 diamonds at $1,200 each`,`Sells 100 diamonds at $1,800 each`],0,
  `<p>MR = MC ($1,000 = $1,000) on the step to 300 diamonds. Then the price comes from demand: buyers pay $1,400 for 300. Your course: "producing 300 units of diamonds and charging fourteen hundred dollars."</p><p>$1,000 is where MR meets MC, not the price (M2). 500 at $1,000 gives the most revenue ($500,000) but a loss. At 400, the last 100 add $600 each to revenue and $1,100 to cost.</p>`);
mc('l25-profit','l25','De Beers sells 300 diamonds at $1,400 each. Its total cost is $290,000. What is its profit?',
  [`$130,000`,`$420,000`,`$120,000`,`$400`,`$300,000`],0,
  `<p>Your course (slide 218): ATC = $290,000 ÷ 300 ≈ $966.67, and profit = Q × (P − ATC) = 300 × ($1,400 − $966.67) = <b>$130,000</b>. Check: $420,000 − $290,000.</p><p>$420,000 is revenue. $120,000 uses MC ($1,000) instead of ATC: 300 × ($1,400 − $1,000) (M4). $400 is the price minus MC per diamond.</p>`);
lazy('l25-gr-price','l25',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A monopoly\'s demand (D), marginal revenue (MR), marginal cost (MC) and average total cost (ATC):${sdg({ xmax:12, ymax:12, xt:[0,4,6,12], yt:[0,4,6,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:'Monopoly graph with MR crossing MC at 4 units',
    lines: mgLines() })}What price does the profit-maximizing monopoly charge?`,
  options:[`$8`,`$4`,`$6`,`$12`,`$5.33`], answer:0,
  explain:`<p>Step 1: MR = MC at 4 units (where they cross at $4). Step 2: go straight up to the demand curve: buyers will pay $8 for 4 units. The College Board\'s 2024 AP scoring gives the point for "showing the profit-maximizing price, P*, from the D curve at the quantity Q*."</p><p>$4 reads the price off the MR = MC crossing (M2). $6 is average total cost at 4 units. $5.33 is where demand meets MC, the efficient price (Lesson 26).</p>` }));
tf('l25-tf-longrun','l25','Like a perfectly competitive firm, a monopoly sees its economic profits competed away in the long run.',false,
  `<p>False. Your course textbook: "In a perfectly competitive market, the forces of entry would erode this profit in the long run. But a monopolist is protected by barriers to entry." It adds: "one telltale sign of a possible monopoly is when a firm earns profits year after year ... without ever seeing those profits eroded" (M5).</p>`);
mc('l25-slide219','l25','Your course\'s quick check (slide 219): for a profit-maximizing monopoly that charges the same price to all consumers, what is the relationship between price (P), marginal revenue (MR) and marginal cost (MC)?',
  [`P > MR and MR = MC`,`P = MR and MR = MC`,`P = MR and MR > MC`,`P > MR and MR > MC`,`P < MR and MR = MC`],0,
  `<p>The monopoly produces where MR = MC (profit maximization), and because MR is below demand, the price it charges is above MR. A price taker would have P = MR = MC (M3).</p>`);
gen('l25-g-profit','l25',()=>{
  const Q = pick([20,30,40,50,60,80]), P = pick([40,45,50,60,70,80]), atc = P - pick([5,8,10,12,15]), mcv = P - pick([18,20,25,28]);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A monopoly\'s marginal revenue equals its marginal cost at <b>${Q}</b> units, where both are <b>$${mcv}</b>. At ${Q} units, the demand curve shows a price of <b>$${P}</b> and average total cost is <b>$${atc}</b>. What is its profit?`, answer:(P-atc)*Q,
    explain:`<p>The monopoly makes ${Q} units and charges the demand price, $${P}. Profit = (P − ATC) × Q = ($${P} − $${atc}) × ${Q} = <b>${usd((P-atc)*Q)}</b>.</p><p>The common wrong answer uses MC instead of ATC: ($${P} − $${mcv}) × ${Q} = ${usd((P-mcv)*Q)} (M4).</p>` };
});
lazy('l25-gr-areas','l25',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. The same kind of monopoly graph, at its profit-maximizing output of 4 units and price of $8, with three areas numbered:${sdg({ xmax:12, ymax:12, xt:[0,4,12], yt:[0,6,8,12], xlab:'Quantity', ylab:'Dollars per unit', aria:'Monopoly graph with area 1 between price and ATC, area 2 below ATC, and area 3 above the price under demand',
    areas:[{pts:[[0,6],[4,6],[4,8],[0,8]], c:'var(--accent)', o:0.35, label:[2,6.8,'1']},{pts:[[0,0],[4,0],[4,6],[0,6]], c:'var(--g1)', o:0.18, label:[2,3,'2']},{pts:[[0,8],[4,8],[0,12]], c:'var(--g2)', o:0.25, label:[1.1,9.2,'3']}],
    lines: mgLines(), vls:[{q:4,p:8}] })}Which area is the monopoly\'s profit?`,
  options:[`Area 1: (P − ATC) × Q = $8`,`Area 2: ATC × Q`,`Area 3, under demand and above the price`,`Areas 1 and 2 together`,`Areas 1, 2 and 3 together`], answer:0,
  explain:`<p>Profit is the rectangle from ATC ($6) up to the price ($8), across 4 units: ($8 − $6) × 4 = $8. Your course textbook: "The larger box of total revenues minus the smaller box of total costs will equal profits."</p><p>Area 2 is total cost; areas 1 and 2 together are total revenue ($32). Area 3 is consumer surplus, which the 2024 AP readers warn must sit under demand, not under MR.</p>` }));
/* L25 more */
mc('l25-resource','l25','Your course textbook says that in the 1930s ALCOA controlled most of the supply of bauxite, a mineral needed to make aluminum. What barrier to entry is this?',
  [`Control of a key physical resource`,`A patent`,`Predatory pricing`,`A government license`,`Product differentiation`],0,
  `<p>The textbook: "other firms were simply unable to produce enough aluminum to compete." Your course\'s example of the same barrier is De Beers, which "owned somewhere north of eighty percent of all of the diamond production in the world."</p>`);
mc('l25-natural','l25','What makes an industry a natural monopoly?',
  [`Economies of scale are so large that one firm can serve the whole market at a lower average cost than two or more firms`,`The firm owns a natural resource such as land`,`The government grants the firm a patent`,`The product is sold in nature without processing`,`Demand is very large compared with the cost of one plant`],0,
  `<p>Your course: "it costs less to society to have one firm producing the good than to have more than one firm." Your course textbook: "when economies of scale are large relative to the quantity demanded in the market." Its examples are water pipes and electricity lines: "It would be costly and duplicative for a second water company to enter the market and invest in a whole second set of main water pipes."</p>`);
mc('l25-predatory','l25','Made-up example. A large airline tells a small startup that if it opens a route, the large airline will slash fares on that route until the startup goes broke. Your course textbook calls this',
  [`predatory pricing, a way of intimidating potential competitors`,`a natural monopoly`,`a patent`,`perfect competition`,`price discrimination`],0,
  `<p>The textbook: "predatory pricing, in which a firm uses the threat of sharp price cuts to discourage competition. Predatory pricing is a violation of U.S. antitrust law, but it is difficult to prove." It mentions small airlines accusing large ones of it.</p>`);
mc('l25-pricemaker','l25','Your course calls a monopoly a "price maker." What does the firm control, and what does it not?',
  [`It sets the price, but demand decides how much it sells at that price`,`It sets both price and quantity sold`,`It sets the quantity sold, and the government sets the price`,`It controls neither; the market sets both`,`It sets its costs, and buyers set the price`],0,
  `<p>Your course (slide 213): "Price: determined by firm. Quantity: determined by demand." It "still faces a downward sloping demand curve. To sell more = must lower the price" (M1).</p>`);
mc('l25-perceived','l25','How does the demand curve a monopoly faces differ from the one a perfectly competitive firm faces?',
  [`The monopoly faces the downward-sloping market demand curve; the competitive firm sees a flat line at the market price`,`Both face flat demand lines`,`Both face the downward-sloping market demand curve`,`The monopoly faces a vertical demand curve`,`The competitive firm faces a downward-sloping curve; the monopoly a flat one`],0,
  `<p>Your course textbook: "Because the monopolist is the only firm in the market, its demand curve is the same as the market demand curve, which is, unlike that for a perfectly competitive firm, downward-sloping." The 2024 AP readers list "drawing a horizontal demand curve" for a monopoly as a common error.</p>`);
tf('l25-tf-mrp','l25','For a monopoly, as for a perfectly competitive firm, marginal revenue equals the price.',false,
  `<p>False. A price taker can sell more at the same price, so MR = P. A monopoly must cut the price on every unit to sell one more, so MR is less than the price. The 2024 AP readers list "identifying the MR curve as the same as the D curve" as a common error (M3).</p>`);
mc('l25-mr-next','l25','De Beers is at 300 diamonds, selling at $1,400. To sell 400 it must cut its price to $1,200. The extra 100 diamonds cost $1,100 each to make. What is the marginal revenue per diamond, and what should De Beers do?',
  [`MR is $600, below the $1,100 MC, so it should not expand`,`MR is $1,200, above MC, so it should expand`,`MR is $1,100, equal to MC, so it doesn\'t matter`,`MR is $1,400, so it should expand`,`MR is −$200, so it should shut down`],0,
  `<p>The extra 100 bring in 100 × $1,200 = $120,000, but the first 300 now sell for $200 less: −$60,000. MR = $60,000 ÷ 100 = <b>$600</b> per diamond, matching your course\'s table. Since $600 &lt; $1,100, expanding cuts profit (from $130,000 to $80,000).</p><p>$1,200 is the new price, not MR (M3).</p>`);
tf('l25-tf-negmr','l25','A profit-maximizing monopoly with a positive marginal cost never produces where marginal revenue is negative.',true,
  `<p>True. It produces where MR = MC, and MC is positive, so MR is positive at that output. Selling a unit with negative MR would lower revenue and raise cost at the same time.</p>`);
gen('l25-g-line','l25',()=>{
  const a = pick([20,24,30,36,40,60]), b = pick([1,2]);
  const cs = []; for(let c=2;c<=a-4;c++) if((a-c)%(2*b)===0) cs.push(c);
  const c = pick(cs), Q_ = (a-c)/(2*b), P = a - b*Q_;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A monopoly faces demand <b>P = ${a} − ${b===1?'':b}Q</b>, so its marginal revenue is <b>MR = ${a} − ${2*b}Q</b> (your course textbook\'s tip: same starting point, twice as steep). Marginal cost is a constant <b>$${c}</b>. What price maximizes its profit?`, answer:P,
    explain:`<p>Set MR = MC: ${a} − ${2*b}Q = ${c}, so Q = ${a-c} ÷ ${2*b} = ${Q_}. Then read the price from <b>demand</b>: P = ${a} − ${b===1?'':b+' × '}${Q_} = <b>$${P}</b>.</p><p>The common wrong answer is $${c}, the value where MR meets MC (M2).</p>` };
});
mc('l25-market','l25','Your course textbook describes a 1947 case in which DuPont made 75% of U.S. cellophane but under 20% of all flexible packaging. Why did the Supreme Court decide it was not a monopoly?',
  [`Buyers had close substitutes (other wrapping films, papers and foils), so the market was defined more broadly`,`Its share of cellophane was too small`,`It had no barriers to entry`,`It charged low prices`,`Cellophane was patented`],0,
  `<p>The textbook: "if a firm produces a product without close substitutes, then the firm can be considered a monopoly producer in a single market. But if buyers have a range of similar ... options available from other firms, then the firm is not a monopoly." A big share alone doesn\'t make a monopoly (M6).</p>`);
lazy('l25-gr-mr','l25',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A monopoly\'s graph shows two straight downward lines, X and Y, starting from the same point:${sdg({ xmax:10, ymax:10, xt:[0,5,10], yt:[0,10], xlab:'Quantity', ylab:'Dollars per unit', aria:'Two downward lines from the same vertical intercept; Y reaches zero at 5, X at 10',
    lines:[ {a:[0,10],b:[10,0],label:'X',c:'var(--ink)',lx:-4,ly:-8,anchor:'end'}, {a:[0,10],b:[5,0],label:'Y',c:'var(--g2)',lx:6,ly:-4} ] })}Which line is marginal revenue, and why?`,
  options:[`Y: MR falls twice as fast as demand, because each extra sale lowers the price on every unit`,`X: MR is always the higher line`,`Y: MR is the supply curve`,`X: MR falls more slowly than demand`,`Neither: a monopoly\'s MR is a flat line`], answer:0,
  explain:`<p>Your course textbook\'s tip: "For a straight-line demand curve, MR and demand have the same vertical intercept. As output increases, marginal revenue decreases twice as fast as demand, so that the horizontal intercept of MR is halfway to the horizontal intercept of demand." Y hits zero at 5, halfway to X\'s 10 (M3).</p>` }));
mc('l25-steps','l25','Your course textbook describes three steps a monopoly uses. Which order is right?',
  [`Find the quantity where MR = MC; go up to demand for the price; compare price with ATC for profit`,`Pick the highest price; find the quantity; compute revenue`,`Find where demand meets MC; charge that price; compute profit`,`Find where ATC is lowest; produce there; charge ATC`,`Find where MR = 0; charge that price; compute revenue`],0,
  `<p>Step 1: "The profit-maximizing quantity will occur where MR = MC." Step 2: "A dotted line drawn straight up from the profit-maximizing quantity to the demand curve shows the profit-maximizing price." Step 3: total revenue minus total cost (P − ATC times Q) is profit.</p><p>Demand meeting MC is the efficient point (Lesson 26). MR = 0 gives the most revenue, not the most profit.</p>`);
tf('l25-tf-pmc','l25','A monopoly earns an economic profit whenever its price is above its marginal cost.',false,
  `<p>False. A profit-maximizing monopoly\'s price is always above MC, but profit depends on whether price is above <b>average total cost</b>. Your course says De Beers profits "because it is charging more than the point where marginal revenue is equal to marginal cost"; the profit actually comes from P ($1,400) being above ATC (about $967). P &gt; MC is what makes it inefficient (Lesson 26) (M4).</p>`);
mc('l25-vs-pc','l25','Compared with a perfectly competitive market facing the same demand and costs, a monopoly',
  [`sells a smaller quantity at a higher price`,`sells a larger quantity at a lower price`,`sells the same quantity at a higher price`,`sells a smaller quantity at a lower price`,`sells the same quantity at the same price`],0,
  `<p>Your course textbook: "consumers will suffer from a monopoly because a lower quantity will be sold in the market, at a higher price, than would have been the case in a perfectly competitive market." Econlib\'s Stigler: "customers buy less of the product, less is produced, and society as a whole is worse off." Lesson 26 measures that loss.</p>`);
mc('l25-revmax','l25','Made-up example. A monopoly\'s manager wants to sell the quantity that brings in the most total revenue. Where on the graph is that?',
  [`Where marginal revenue is zero`,`Where MR = MC`,`Where demand meets MC`,`Where ATC is lowest`,`Where price is highest`],0,
  `<p>Total revenue rises as long as MR is positive and falls once MR turns negative, so it peaks where MR = 0. The College Board\'s 2024 AP question asked exactly this: what if the firm "wanted to charge a price that maximized total revenue instead of maximizing profit." It would sell more, at a lower price, and earn less profit than at MR = MC.</p>`);

mc('l25-hp','l25','Your course textbook\'s HealthPill monopoly produces 4 units, where MR = MC. Its demand table says buyers pay $900 a unit for 4 units, and its average cost at 4 units is $700. What are its price and profit?',
  [`Price $900; profit $800`,`Price $600; profit −$400`,`Price $900; profit $3,600`,`Price $700; profit $0`,`Price $600; profit $1,200`],0,
  `<p>The price comes from demand at 4 units: $900. Profit = ($900 − $700) × 4 = <b>$800</b>, matching the textbook\'s Table 9.4. $600 is MR and MC at 4 units (M2); $3,600 is total revenue.</p>`);

/* ===== Lesson 25 quick checks ===== */
mc('l25c-barrier','l25','Which of these is a government-created barrier to entry?',
  [`A copyright on a best-selling novel`,`Owning most of the world\'s diamond mines`,`Having the only water pipes in town`,`Selling a better product than rivals`,`Charging a low price`],0,
  `<p>Copyrights, like patents, are legal rights granted by government. Owning the mines is resource control; the water pipes make a natural monopoly.</p>`);
mc('l25c-demand','l25','A monopoly wants to sell more units. What must it do?',
  [`Lower its price`,`Raise its price`,`Nothing; it can sell any amount at any price`,`Advertise less`,`Raise its marginal cost`],0,
  `<p>It faces the downward-sloping market demand curve. Your course: "To sell more = must lower the price."</p>`);
mc('l25c-mr','l25','Made-up numbers. A monopoly sells 10 units at $50. To sell 11 it must charge $48 on every unit. What is the marginal revenue of the 11th unit?',
  [`$28`,`$48`,`$50`,`$2`,`$528`],0,
  `<p>Revenue goes from $500 to 11 × $48 = $528, so MR = $28. Or: +$48 on the new unit, −$2 on each of the first 10 = $48 − $20. $48 is the new price (M3).</p>`);
mc('l25c-max','l25','At its current output, a monopoly\'s marginal revenue is $30 and its marginal cost is $22. To raise profit it should',
  [`produce more, lowering its price`,`produce less, raising its price`,`keep output the same`,`raise its price and its output`,`shut down`],0,
  `<p>MR &gt; MC: the next unit adds more to revenue than to cost. To sell more it must lower its price. It stops where MR = MC.</p>`);
mc('l25c-profit','l25','Made-up numbers. A monopoly produces 100 units where MR = MC = $30. Demand at 100 units is $70, and ATC is $50. Its profit is',
  [`$2,000`,`$4,000`,`$7,000`,`$5,000`,`−$2,000 (a loss)`],0,
  `<p>(P − ATC) × Q = ($70 − $50) × 100 = $2,000. $4,000 uses MC instead of ATC (M4); $7,000 is revenue.</p>`);
mc('l25c-skill','l25','On a correctly drawn monopoly graph, the profit-maximizing price is found',
  [`on the demand curve, straight above where MR crosses MC`,`where MR crosses MC`,`where demand crosses MC`,`at the bottom of ATC`,`where MR crosses the quantity axis`],0,
  `<p>Quantity from MR = MC, price from demand above it (M2). The 2024 AP readers saw students put the quantity "directly below the intersection of D and MC."</p>`);

/* Course materials checked 2026-10-28: video 5.3 transcript (first part: barriers; price maker; De Beers table; MR = MC at 300, $1,400; profit with ATC 966), Module 5 slides 211-220;
   course textbook §9.1 (natural monopoly, ALCOA, De Beers, legal monopoly, patents 20 years, trademarks, predatory pricing, Table 9.1), §9.2 (perceived demand, DuPont cellophane, three steps, MR below demand tip).
   Cross-checks read: College Board 2024 AP Microeconomics FRQ 1 chief reader report (patent = legal barrier; Q* at MR = MC, P* from D; common graph errors; revenue-maximizing price); Econlib, Stigler, "Monopoly". */
const L25TAGS = {
  'l25-barrier':['MS5 OS91','msrc','terms',''], 'l25-patent':['MS5 OS91 CBAP','msrc','models',''], 'l25-tf-anyprice':['MS5 OS92','mmax','terms','M1'],
  'l25-mr-why':['OS92','mmax','models','M3'], 'l25-g-mr':['MS5 OS92','mmax','data','M3'], 'l25-debeers':['MS5','mmax','data','M2'],
  'l25-profit':['MS5','mmax','data','M4'], 'l25-gr-price':['OS92 CBAP','mmax','graphs','M2'], 'l25-tf-longrun':['OS92','msrc','terms','M5'],
  'l25-slide219':['MS5','mmax','terms','M3'], 'l25-g-profit':['OS92','mmax','data','M4'], 'l25-gr-areas':['OS92 CBAP','mmax','graphs','M4'],
  'l25-resource':['OS91 MS5','msrc','terms',''], 'l25-natural':['MS5 OS91','msrc','terms',''], 'l25-predatory':['OS91','msrc','terms',''],
  'l25-pricemaker':['MS5','mmax','terms','M1'], 'l25-perceived':['OS92 CBAP','mmax','models','M1'], 'l25-tf-mrp':['OS92 CBAP','mmax','terms','M3'],
  'l25-mr-next':['MS5','mmax','data','M3'], 'l25-tf-negmr':['OS92','mmax','terms',''], 'l25-g-line':['OS92','mmax','data','M2'],
  'l25-market':['OS92','msrc','models','M6'], 'l25-gr-mr':['OS92','mmax','graphs','M3'], 'l25-steps':['OS92','mmax','models','M2'],
  'l25-tf-pmc':['MS5 OS92','mmax','terms','M4'], 'l25-vs-pc':['OS92 ELMO','mmax','models',''], 'l25-revmax':['CBAP','mmax','models',''], 'l25-hp':['OS92','mmax','data','M2'],
  'l25c-barrier':['OS91','msrc','terms',''], 'l25c-demand':['MS5','mmax','terms','M1'], 'l25c-mr':['OS92','mmax','data','M3'],
  'l25c-max':['MS5','mmax','models',''], 'l25c-profit':['MS5 OS92','mmax','data','M4'], 'l25c-skill':['OS92 CBAP','mmax','graphs','M2']
};
u5tag(L25TAGS);

U5_CARDS.l25 = [
  ['Monopoly','What is a monopoly?','A single seller of a good with no close substitutes, protected by barriers to entry.','De Beers in diamonds (course).','A big market share alone isn\'t enough if buyers have close substitutes.'],
  ['Three causes of monopoly','What three barriers to entry does your course name?','Control of a key resource, government-created rights (patents, copyrights), and natural monopoly.','De Beers; a drug patent; water pipes.','The textbook adds trademarks and predatory pricing.'],
  ['Patent','What does a patent do, and for how long?','Gives the inventor the sole legal right to make, use or sell the invention: 20 years in the U.S.','Lets a drug company recover its research costs.','A legal barrier to entry.'],
  ['Natural monopoly','When is an industry a natural monopoly?','When economies of scale are so large that one firm can supply the market more cheaply than two or more.','A second set of water pipes would be "costly and duplicative."','Lesson 26 covers how they are regulated.'],
  ['Price maker','What does a monopoly control?','It sets the price; demand decides how much it sells.','"Price: determined by firm. Quantity: determined by demand."','It can\'t charge any price and sell any amount.'],
  ['MR below price','Why is a monopoly\'s MR less than its price?','To sell one more unit it must lower the price on all units.','De Beers 100 → 200: +$160,000 − $20,000 = $1,400 a diamond, below the $1,600 price.','Linear demand: MR falls twice as fast.'],
  ['Monopoly quantity','How does a monopoly choose its quantity?','Where MR = MC.','De Beers: MR = MC = $1,000 at 300 diamonds.','Not where demand meets MC.'],
  ['Monopoly price','How does a monopoly choose its price?','Go straight up from the MR = MC quantity to the demand curve.','De Beers: $1,400 for 300 diamonds.','The price is not the MR = MC value ($1,000).'],
  ['Monopoly profit','How do you find a monopoly\'s profit?','(P − ATC) × Q at the MR = MC quantity.','300 × ($1,400 − $966.67) = $130,000.','Use ATC, not MC.'],
  ['P, MR and MC','What is the relationship between P, MR and MC for a single-price monopoly?','P > MR = MC.','Your course\'s quick check, slide 219.','A price taker has P = MR = MC.'],
  ['Profits last','Why can a monopoly keep earning profits in the long run?','Barriers to entry stop new firms coming in.','"A monopolist is protected by barriers to entry."','Profits year after year are a sign of monopoly.'],
  ['Revenue vs profit','Where does a monopoly earn the most total revenue?','Where MR = 0, which is a larger quantity and lower price than MR = MC.','De Beers: most revenue at 500 diamonds ($500,000), but a $25,000 loss.','Maximizing revenue isn\'t maximizing profit.']
];

Object.assign(U5_WRITE, {
  'w-l25-1':{lesson:'l25',prompt:'Explain why a monopoly\'s marginal revenue is less than its price. Use your course\'s De Beers numbers (100 diamonds at $1,800 or 200 at $1,600).',
    model:'A monopoly faces the downward-sloping market demand curve, so to sell more it must lower its price, and it lowers it on every unit, not just the extra one. For De Beers, going from 100 to 200 diamonds means cutting the price from $1,800 to $1,600. The extra 100 diamonds bring in 100 × $1,600 = $160,000, but the first 100 now sell for $200 less each, which loses $20,000. Revenue rises by only $140,000, or $1,400 per extra diamond. So marginal revenue ($1,400) is below the price ($1,600). A perfectly competitive firm doesn\'t face this, because it can sell more at the same market price, so its marginal revenue equals the price.',
    checklist:['States that the monopoly must lower the price on all units to sell more','Computes the gain from the new units ($160,000) and the loss on the old ones ($20,000)','Gets MR of $1,400 and compares it with the $1,600 price','Contrasts with a price taker, for whom MR = P']},
  'w-l25-2':{lesson:'l25',prompt:'Describe the three steps a monopoly uses to choose its quantity and price and to find its profit, using your course\'s De Beers example.',
    model:'First, the monopoly finds the quantity where marginal revenue equals marginal cost. For De Beers, MR and MC are both $1,000 on the step to 300 diamonds, so it produces 300. Second, it sets the price by going straight up from that quantity to the demand curve: buyers will pay $1,400 each for 300 diamonds. The price is not the $1,000 where MR meets MC. Third, it finds profit by comparing the price with average total cost at that quantity. Average total cost is $290,000 ÷ 300, about $966.67, so profit is ($1,400 − $966.67) × 300 = $130,000. Because barriers to entry keep rivals out, this profit can last in the long run.',
    checklist:['Step 1: quantity where MR = MC (300 diamonds)','Step 2: price read from the demand curve at that quantity ($1,400), not from MR = MC','Step 3: profit = (P − ATC) × Q = $130,000','Notes that barriers to entry let the profit last']}
});

U5_PLAN.l25 = {
  core:['l25-barrier','l25-patent','l25-tf-anyprice','l25-mr-why','l25-g-mr','l25-debeers','l25-profit','l25-gr-price','l25-tf-longrun','l25-slide219','l25-g-profit','l25-gr-areas'],
  more:['l25-resource','l25-natural','l25-predatory','l25-pricemaker','l25-perceived','l25-tf-mrp','l25-mr-next','l25-tf-negmr','l25-g-line','l25-market','l25-gr-mr','l25-steps','l25-tf-pmc','l25-vs-pc','l25-revmax','l25-hp']
};

U5_LESSONS.push({ id:'l25', unit:5, title:'Monopoly: Market Power and the Profit-Maximizing Price', mins:45, src:'Modern States video 5.3 (first part) and Module 5 slides 211-220 · Course textbook (OpenStax) §9.1-§9.2',
  sources:['MS5','OS91','OS92','CBAP','ELMO','CB'],
  oneline:'A monopoly is the only seller, protected by barriers to entry. It faces the whole downward-sloping demand curve, so its marginal revenue is below its price; it produces where MR = MC and charges what demand will pay at that quantity.',
  body:`
<p>Lesson 22 put four market structures on a line. Lessons 22 to 24 covered the competitive end. This lesson jumps to the other end: one seller. Your course: "Monopoly is one of the most extreme cases of no competition."</p>

<h2>What makes a monopoly</h2>
<!-- src: MS5 (video 5.3: "there are barriers preventing other firms from entering into the market"; resource restriction, De Beers "north of eighty percent of all of the diamond production"; government-created monopoly, patents, "so that they are able to recoup their costs of the research and development"; natural monopolies "it costs less to society to have one firm producing the good"; slide 212); OS91 (barriers to entry definition; natural vs legal monopoly; ALCOA bauxite; De Beers; patents 20 years; trademarks; predatory pricing; Table 9.1); OS92 (Clear it up "What defines the market?": DuPont cellophane 75% vs under 20%; "if a firm produces a product without close substitutes"); CBAP ("a patent, a legal barrier to entry"); ELMO ("A monopoly is an enterprise that is the only seller of a good or service"; most enduring U.S. monopolies "rest on government policies") -->
<p>A ${dt('monopoly','<b>monopoly</b>')} is the only seller of a good with no close substitutes. Something has to stop rivals from joining in, or the profits would draw them in as in Lesson 24. Those obstacles are ${dt('barriers-to-entry','<b>barriers to entry</b>')}. Your course names three.</p>
${FIG5.l25bar()}
<p>A ${dt('patent','patent')} is the clearest ${dt('legal-monopoly','legal barrier')}: your course says the government grants it so a drug company can "recoup their costs of the research and development." A ${dt('natural-monopoly','natural monopoly')} needs no law: ${dt('economies-of-scale','economies of scale')} (Lesson 19) make it cheaper for one firm to serve everyone.</p>
<p><b>Only seller of what?</b> Your course textbook\'s DuPont case: DuPont made 75% of U.S. cellophane but under 20% of all flexible wrapping. The Supreme Court said buyers had close substitutes, so it was not a monopoly. A firm is a monopoly only if buyers have no close substitutes.</p>
<div data-widget="barsort"></div>
<p>What to notice: ask what stops a rival. A law (government), an input it can\'t get (resource), or costs it can\'t match (natural monopoly).</p>
<div data-check="l25c-barrier"></div>

<h2>A price maker still faces demand</h2>
<!-- src: MS5 (video 5.3: "they have complete price control ... But remember, they are also going to be dependent on how much they can actually sell, so they can't make the price infinitely high. They set their prices based on the demand for the good"; slide 213: "Considered a Price Maker ... still faces a downward sloping demand curve ... To sell more = must lower the price ... Price: determined by firm. Quantity: determined by demand"); OS92 (Figure 9.3; "No monopolist ... can require consumers to purchase its product"); ELMO ("free to set any price it chooses and will usually set the price that yields the largest possible profit") -->
<p>Your course calls a monopoly a ${dt('price-maker','<b>price maker</b>')}: it "has complete price control." But buyers still decide how much to buy, so the firm "can\'t make the price infinitely high."</p>
${FIG5.l25perc()}
<p><b>The key difference from Lesson 22:</b> a ${dt('price-taker','price taker')} can sell more without cutting its price. A monopoly is the whole market, so every extra sale means moving down the demand curve to a lower price.</p>
<div data-check="l25c-demand"></div>

<h2>Why marginal revenue is below the price</h2>
<!-- src: MS5 (slide 215: De Beers MR 1800, 1400, 1000, 600, 200); OS92 (Clear it up: "First, we sell one additional unit at the new market price. Second, all the previous units, which could have been sold at the higher price, now sell for less ... the marginal revenue curve is below the demand curve"; tip: same vertical intercept, MR falls twice as fast); CBAP (common error: "Identifying the MR curve as the same as the D curve") -->
<p>Remember ${dt('marginal-revenue','marginal revenue')} from Lesson 21: the extra revenue from one more unit. When a monopoly cuts its price to sell more, it cuts it on every unit, not just the new one. Your course textbook: "all the previous units, which could have been sold at the higher price, now sell for less."</p>
<p><b>Worked example: De Beers going from 100 to 200 diamonds</b> (your course\'s numbers).</p>
<div class="math">Gain on the new 100: 100 × $1,600 = $160,000<br>Loss on the first 100: 100 × ($1,800 − $1,600) = −$20,000<br>Change in revenue = $140,000 → MR = $140,000 ÷ 100 = <b>$1,400</b> per diamond, below the $1,600 price</div>
${FIG5.l25mrw()}
<p>Check: revenue at 100 is $180,000 and at 200 is $320,000; the difference is $140,000. With a straight-line demand curve, your course textbook\'s tip is that MR starts at the same point as demand and falls twice as fast.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>A theater that wants to fill one more seat by dropping the ticket price has to drop it for everyone in the audience. The extra ticket brings in the new price, but every other ticket now brings in less. The theater\'s gain from that seat is smaller than its price.</p></div>
<div data-check="l25c-mr"></div>

<h2>Profit maximization: De Beers</h2>
<!-- src: MS5 (video 5.3: "Since a monopoly is also a profit-maximizing firm it's going to be interested in producing ... where marginal revenue is equal to marginal cost"; "producing 300 units of diamonds and charging fourteen hundred dollars"; slides 214-216: "If MR > MC: Increase profits by increasing Qs. If MR < MC: Increase profits by decreasing Qs"); OS92 (HealthPill: MR = MC at 4) -->
<p>A monopoly uses the same rule as every firm in Lesson 21: produce where ${dt('mr-mc','MR = MC')}. Your course\'s De Beers table:</p>
${FIG5.l25tbl()}
<p><b>Read it step by step.</b> From 100 to 200 diamonds, MR ($1,400) beats MC ($900): expand. From 200 to 300, MR = MC = $1,000. From 300 to 400, MR ($600) is below MC ($1,100): stop. So De Beers sells 300 diamonds, and the table says buyers pay $1,400 each for 300.</p>
<div data-widget="monchoose"></div>
<p>What to notice: profit peaks at 300 (tied with 200), while revenue keeps rising all the way to 500 diamonds. The most revenue is not the most profit.</p>
<div data-check="l25c-max"></div>

<h2>Price and profit on the graph: three steps</h2>
<!-- src: MS5 (video 5.3: "marginal revenue is equal to marginal cost—we'll call this point A ... They are going to set a price based on the demand which will be point B ... here at 966 is the cost per unit or the average total cost. So that this area represents the profit"; slides 217-218: "Profits = TR – TC = (P x Q) – (ATC x Q) = Q (P – ATC) ... Profits = 300 (1400 – 966) ... ATC = 290,000 / 300 = 966"); OS92 (three steps; "In a perfectly competitive market, the forces of entry would erode this profit in the long run. But a monopolist is protected by barriers to entry"; "one telltale sign of a possible monopoly"). Source problem recorded: the course says the firm is "making a profit because it is charging more than the point where marginal revenue is equal to marginal cost"; profit comes from P > ATC. 300 × (1,400 − 966) = 130,200; with ATC 966.67 it is 130,000 (the table's TR − TC). -->
<p>Your course textbook turns the table into three steps on a graph.</p>
<div class="math">Step 1: quantity where <b>MR = MC</b> (point A) → 300 diamonds<br>Step 2: go straight up to <b>demand</b> (point B) → price $1,400<br>Step 3: profit = (P − ATC) × Q = ($1,400 − $966.67) × 300 = <b>$130,000</b></div>
${FIG5.l25graph()}
<p>Check: $420,000 revenue − $290,000 cost = $130,000. (Your course rounds ATC to $966, which gives $130,200.)</p>
<p><b>Where the profit comes from:</b> your course says De Beers profits "because it is charging more than the point where marginal revenue is equal to ${dt('marginal-cost','marginal cost')}." More exactly, the profit comes from the price being above <b>${dt('average-cost','average total cost')}</b>. The price being above marginal cost is what makes a monopoly inefficient, which is Lesson 26.</p>
<p><b>Fixed costs don\'t move the choice.</b> If De Beers\' rent or other fixed cost rose, neither marginal revenue nor marginal cost would change, so MR = MC would still pick 300 diamonds at $1,400. Only profit would fall, by the amount of the rise. It is the same logic as Lesson 23: a cost you owe whatever you produce can\'t change how much to produce.</p>
<p><b>Why it lasts:</b> your course textbook: "In a perfectly competitive market, the forces of entry would erode this profit in the long run. But a monopolist is protected by barriers to entry."</p>
<div data-check="l25c-profit"></div>

<h2>Read a monopoly graph</h2>
<!-- src: OS92 (three steps); CBAP (65% of students found Q* where MR = MC and 71% showed P* "from the D curve at the quantity Q*"; common errors: "Drawing a horizontal demand curve," "Identifying the MR curve as the same as the D curve," "Omitting the MR curve," "Drawing ATC without MC passing through the minimum point of ATC," "Identifying Q* directly below the intersection of D and MC"; part (b): price that maximized total revenue). Exam skill: locate Q*, P*, ATC and profit on a four-curve monopoly graph. -->
<p>The CLEP shows a four-curve graph (D, MR, MC, ATC) and asks for the quantity, the price or the profit area. On the College Board\'s 2024 AP version of this question, about a third of students missed the quantity. The common slips: treating MR as the demand curve, and putting the quantity below where demand crosses MC.</p>
${FIG5.l25read()}
<div class="math">Quantity: where MR crosses MC (A) → 4<br>Price: on demand straight above (B) → $8<br>Profit: ($8 − ATC at C, $6) × 4 = <b>$8</b></div>
<p>Check that the graph is drawn right: MR starts where demand starts and falls twice as fast (it hits zero at 6, halfway to demand\'s 12), and MC crosses ATC at the bottom of ATC.</p>
<div data-check="l25c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L25TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"A monopoly can charge any price and sell as much as it wants."</span>It picks the price, but demand decides how much sells. To sell more it must charge less.</li>
<li><span class="wrong">"The price is where MR crosses MC."</span>That point gives the quantity. The price is on the demand curve straight above it.</li>
<li><span class="wrong">"For a monopoly, MR equals the price."</span>Selling one more unit means a lower price on every unit, so MR is below the price.</li>
<li><span class="wrong">"A monopoly profits because its price is above MC."</span>Profit needs P above <b>ATC</b>: (P − ATC) × Q. P above MC is true of every single-price monopoly, profitable or not.</li>
<li><span class="wrong">"Monopoly profits get competed away in the long run."</span>Barriers to entry keep rivals out, so the profit can last.</li>
<li><span class="wrong">"Any firm with a big share of a market is a monopoly."</span>Only if buyers have no close substitutes; DuPont\'s cellophane was one wrapping among many.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A <b>monopoly</b> is the only seller, kept that way by <b>barriers to entry</b>: a key resource (De Beers), government rights (patents, 20 years), or natural monopoly (water pipes).</li>
<li>It is a <b>price maker</b> but faces the downward-sloping market demand curve: to sell more it must lower its price.</li>
<li><b>MR is below price</b>, because a price cut applies to every unit (De Beers 100 → 200: MR $1,400 against a $1,600 price).</li>
<li>It produces where <b>MR = MC</b> and charges the <b>demand</b> price at that quantity (De Beers: 300 diamonds at $1,400). So P &gt; MR = MC.</li>
<li><b>Profit = (P − ATC) × Q</b> ($130,000 for De Beers), and barriers to entry let it last.</li>
<li>On the exam, find quantity at MR = MC, price on demand above it, and profit against ATC.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Sources of market power" and "Profit maximization" under monopoly. Expect a four-curve graph asking for the price, quantity or profit area, a question about P, MR and MC, or a question naming a barrier to entry such as a patent.</p>
</div>`,
  deeper:`
<h3>A revenue-maximizing monopoly</h3>
<p>The College Board\'s 2024 AP question asked what happens if a monopoly maximizes revenue instead of profit. Revenue peaks where MR = 0, which is a larger quantity and a lower price than MR = MC. On the lettered graph above that is point F: 6 units at $6, revenue $36, but profit falls. For De Beers, revenue peaks at 500 diamonds ($500,000), where it loses $25,000.</p>
<h3>Intellectual property and predatory pricing</h3>
<p>Your course textbook groups patents, trademarks, copyrights and trade secrets as "intellectual property." Trademarks can be renewed as long as they stay in use. It also notes that small airlines have accused larger ones of predatory pricing; in the early 2000s, ValuJet accused Delta and Frontier accused United.</p>`,
  links:[ {k:'Textbook',t:'9.2 How a Profit-Maximizing Monopoly Chooses Output and Price',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price',w:'The three steps, with the HealthPill example and why MR lies below demand.'},
          {k:'Article',t:'Monopoly',s:'Econlib, Concise Encyclopedia of Economics (George J. Stigler)',u:'https://econlib.org/library/Enc/Monopoly.html',w:'A short, readable account of where monopolies come from and why economists say they reduce society\'s income.'} ]
});
