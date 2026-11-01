/* ===== Lesson 22 figures ===== */
/* L22 V1: the spectrum of market structures (textbook ch. 7 introduction, Figure 7.2; course videos 5.2-5.5) */
FIG5.l22spec = () => fig(`<div class="u5ends"><span>More competition</span><span>Less competition</span></div><div class="u5bar" aria-hidden="true"></div>
  <div class="u5spec">
  <div class="u3card ok"><p class="u3h">Perfect competition</p><p><b>Sellers:</b> many</p><p><b>Product:</b> identical</p><p><b>Entry:</b> free</p><p><b>Control over price:</b> none (price taker)</p><p class="small">Wheat, corn</p></div>
  <div class="u3card"><p class="u3h">Monopolistic competition</p><p><b>Sellers:</b> many</p><p><b>Product:</b> similar but differentiated</p><p><b>Entry:</b> free</p><p><b>Control over price:</b> some</p><p class="small">Restaurants, clothing stores</p></div>
  <div class="u3card"><p class="u3h">Oligopoly</p><p><b>Sellers:</b> a few</p><p><b>Product:</b> identical or similar</p><p><b>Entry:</b> hard (high barriers)</p><p><b>Control over price:</b> some, and depends on rivals</p><p class="small">Boeing and Airbus; Coke and Pepsi</p></div>
  <div class="u3card no"><p class="u3h">Monopoly</p><p><b>Sellers:</b> one</p><p><b>Product:</b> no close substitutes</p><p><b>Entry:</b> blocked</p><p><b>Control over price:</b> a lot (price maker)</p><p class="small">Local water company; a patented drug</p></div></div>`,
  'The four structures this unit covers, from your course textbook\'s "spectrum of competition" and your course\'s videos 5.2 to 5.5. Read each column top to bottom: the number of sellers, how alike their products are and how hard it is to get in decide how much say each firm has over its price. Lessons 22 to 24 take the left end, Lessons 25 and 26 the right end, and Lessons 27 and 28 the middle.');

/* L22 V2: the conditions for perfect competition (course slide 194; textbook §8.1) */
FIG5.l22chars = () => fig(`<div class="u3pair">
  <div class="u3card"><p class="u3h">1. Many buyers and many sellers</p><p>Each one is tiny next to the whole market.</p></div>
  <div class="u3card"><p class="u3h">2. Identical goods</p><p>"It doesn\'t matter who the buyer buys the goods from" (your course). The textbook: "winter wheat is winter wheat."</p></div>
  <div class="u3card"><p class="u3h">3. Free entry and exit</p><p>Firms can start or stop "without any additional costs" (your course).</p></div>
  <div class="u3card"><p class="u3h">4. Full information</p><p>Your course textbook adds: buyers and sellers "have all relevant information to make rational decisions."</p></div></div>
  <div class="u3flow" style="margin-top:8px"><div class="u3step u3end">Result: "no single firm or buyer can exert any type of price control in this market." Every firm is a <b>price taker</b>.</div></div>`,
  'Your course\'s three conditions plus the textbook\'s fourth. Take away any one and firms start to gain some control over price: different products (Lesson 28), few sellers (Lesson 27), blocked entry (Lesson 25).');

/* L22 V3: the market sets the price; one firm sees a flat line (textbook Figures 8.3-8.4 and 9.3a; made-up market curves at the course's $3) */
FIG5.l22market = () => figs([
  ['The market: thousands of firms', sdg({ xmax:10, ymax:6, xt:[0,5,10], yt:[0,3,6], xlab:'Ping-pong balls (thousands)', ylab:'Price ($)', aria:'Market supply and demand crossing at a price of three dollars',
    lines:[ dem([0,6],[10,0]), sup([0,0],[10,6]) ], hl:[{p:3, q:5, label:'', c:'var(--muted)'}], dots:[{q:5,p:3,label:'$3',c:'var(--ink)'}] })],
  ['One firm (your course\'s Firm A)', sdg({ xmax:10, ymax:6, xt:[0,5,9], yt:[0,3,6], xlab:'Ping-pong balls (one firm)', ylab:'Price ($)', aria:'A horizontal line at three dollars: the demand curve facing one firm',
    lines:[ {pts:[[0,3],[10,3]], c:'var(--accent)', label:'d = MR = P', lx:-4, ly:-8, anchor:'end'} ] })]
], 'Made-up market curves at your course\'s $3 price. Supply and demand for the whole market set the price (first panel). One firm is so small that it can sell 1 ball or 9 balls at that same $3 (second panel): its demand curve is flat, "perfectly elastic" in your course textbook\'s words. Note the different quantity scales.');

/* L22 V4: the course's ping-pong table at $3, worked (slides 196-197) */
FIG5.l22pptbl = () => fig(atable(['Balls','Revenue','Total cost','Profit','MC'],
  PP_TC.map((t,q)=>[q, d2(3*q), d2(t), (3*q-t<0?'−':'')+d2(Math.abs(3*q-t)), q?d2(PP_MC[q-1]):'–']), { hl:{4:{row:'u3z1'},5:{row:'u3z2'}}, cls:'compact u5tight' }),
  'Your course\'s Firm A at $3 a ball, with profit and MC filled in. MR is $3 on every row, so it is left out. MC climbs from $0.50 to $4. They are equal at 5 balls (the darker row), where profit is $5.50. Profit is also $5.50 at 4 balls (lighter row): the 5th ball adds $3 to revenue and $3 to cost, so it changes nothing. The MR = MC rule names 5, as your course does.');

/* L22 V5: the price rises from $3 to $4 (course slides 198-200) */
FIG5.l22price4 = () => fig(sdg({ xmax:10, ymax:4.6, xt:[0,1,2,3,4,5,6,7,8,9], yt:[0,1,2,3,4], xlab:'Ping-pong balls', ylab:'Dollars per ball', aria:'Marginal cost curve crossing a three-dollar MR line at 5 balls and a four-dollar MR line at 9 balls',
  lines:[ {pts:PP_MC.map((m,i)=>[i+1,m]), c:'var(--g2)'}, {pts:[[0,3],[10,3]], c:'var(--muted)', dash:'6 4', w:2}, {pts:[[0,4],[10,4]], c:'var(--accent)'} ],
  labels:[[3.2,2.4,'MC','var(--g2)'],[1.4,2.7,'MR₁ = $3','var(--muted)'],[1.4,4.25,'MR₂ = $4','var(--accent)']],
  dots:[{q:5,p:3,label:'A',c:'var(--muted)',lx:-14,ly:-8},{q:9,p:4,label:'B',c:'var(--accent)',lx:-16,ly:16}], vls:[{q:5,p:3},{q:9,p:4}], arrows:[{a:[5.4,3.15],b:[8.6,3.85],c:'var(--ok)'}] }),
  'Your course\'s Firm A (slide 200), with marginal cost plotted at each ball. At $3 the firm produces at A, 5 balls. When the market price rises to $4, its MR line moves up and the firm slides along its MC curve to B, 9 balls. Your course: "Our marginal cost will not change because our total cost has not changed."');

/* L22 V7: before and after the price rise, side by side (course slides 197 and 199) */
FIG5.l22before = () => { const pr=(P,q)=>P*q-PP_TC[q], f=v=>(v<0?'−':'')+d2(Math.abs(v));
  return fig(atable(['Balls','MC','Profit at $3','Profit at $4'], PP_TC.map((t,q)=>[q, q?d2(PP_MC[q-1]):'–', f(pr(3,q)), f(pr(4,q))]), { hl:{5:{2:'u3hi'},9:{3:'u3hi'}}, cls:'compact' }),
  'Your course\'s numbers. The MC column is the same in both cases; only revenue changed. Outlined: where MR = MC at each price. At $4 every ball earns $1 more, so balls whose MC is between $3 and $4 (the 6th to the 9th) now pay for themselves. Profit rises from $5.50 to $12.00. (At $4 profit is also $12.00 at 8 balls: the 9th ball\'s MR equals its MC.)'); };

/* ===== Lesson 22: Perfect Competition: Price Takers (Modern States video 5.2, first part; Module 5 slides 193-200) =====
   Common mistakes: M1 a competitive firm can raise its price a little and keep customers · M2 a price taker should cut its price to sell more
   M3 a competitive firm's MR falls as it sells more · M4 when the price rises, the firm sells the same quantity at the higher price
   M5 perfect competition just means many firms · M6 the firm's demand curve is the downward-sloping market demand curve */
const ppTbl = (P) => atable(['Balls','Total cost'+(P?'':''),...(P?['Total revenue at $'+P]:[])], PP_TC.map((t,q)=>[q, d2(t), ...(P?[d2(P*q)]:[])]), { cls:'compact' });

mc('l22-chars','l22','Which of the following describes a perfectly competitive market?',
  [`Many buyers and sellers, identical products, and free entry and exit`,`Many sellers of products that differ by brand, with free entry`,`A few large sellers whose choices depend on each other`,`One seller of a product with no close substitutes`,`Many sellers, but new firms must buy a government license to enter`],0,
  `<p>Your course\'s key characteristics: "Many buyers and sellers," "Goods are identical," and "Firms can freely enter and exit the market." Together they mean no one can control the price.</p><p>Differentiated brands with free entry is monopolistic competition; a few interdependent sellers is oligopoly; one seller is monopoly. Many sellers alone isn\'t enough if products differ or entry is blocked (M5).</p>`);
mc('l22-pt-raise','l22','Your course textbook: in 2015 U.S. wheat farmers received an average price of $6.00 a bushel. What would happen to a single wheat farmer who tried to sell at $8.00?',
  [`She would sell nothing, because buyers can get identical wheat from others at $6.00`,`She would sell a little less than before at the higher price`,`Other farmers would raise their prices to match`,`The market price would rise to $8.00`,`She would earn more, because demand is downward sloping`],0,
  `<p>The textbook: a wheat grower who "attempted to sell for $8.00 per bushel, would not have found any buyers." With identical wheat and many sellers, buyers simply go elsewhere. That is what makes the farmer a price taker.</p><p>"Sell a little less" describes a firm with a downward-sloping demand curve, like a monopoly (M1, M6). One farmer is far too small to move the market price.</p>`);
mc('l22-mr-p','l22','For a firm in a perfectly competitive market, marginal revenue is',
  [`equal to the market price at every quantity`,`falling as the firm sells more`,`higher than the market price`,`zero, because the firm can\'t change the price`,`equal to average total cost`],0,
  `<p>Each extra unit sells at the same market price, so it adds exactly that price to revenue. Your course: "only under perfect competition will the marginal revenue stay constant and equal to the price."</p><p>Falling MR belongs to firms that must cut their price to sell more (M3). MR isn\'t zero: the firm can\'t change the price, but each unit still brings it in.</p>`);
mc('l22-pp3','l22',`Your course\'s Firm A sells ping-pong balls at the market price of $3:${ppTbl(3)}At what output does marginal revenue equal marginal cost?`,
  [`5 balls`,`3 balls`,`9 balls`,`6 balls`,`7 balls`],0,
  `<p>MR is $3 for every ball. Marginal cost: the 5th ball costs $9.50 − $6.50 = $3.00, equal to MR. The 6th would cost $3.25, more than $3. So MR = MC at <b>5 balls</b>, where profit is $15.00 − $9.50 = $5.50 (your course\'s answer).</p><p>9 balls is where MR = MC after the price rises to $4. 3 balls stops while the 4th ball still adds $1 of profit.</p>`);
tf('l22-tf-cut','l22','A perfectly competitive firm can sell more by cutting its price below the market price, so cutting price is a good way to raise its profit.',false,
  `<p>False. A price taker can already sell all it wants at the market price, so a price cut gains no extra sales and just throws away revenue. Your course textbook: "Why should they when they can sell all they want at the higher price?" It changes profit only by changing its quantity (M2).</p>`);
lazy('l22-gr-firm','l22',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. The demand curve facing one firm in a perfectly competitive market:${sdg({ xmax:100, ymax:10, xt:[0,20,40,60,80,100], yt:[0,5,10], xlab:'Output of this firm', ylab:'Price ($)', aria:'A horizontal demand line at five dollars for one firm',
    lines:[ {pts:[[0,5],[100,5]], c:'var(--accent)', label:'d', lx:-4, ly:-8, anchor:'end'} ] })}What does the shape of this curve tell you?`,
  options:[`The firm can sell any amount it produces at $5, but nothing above $5`,`The firm must cut its price to sell more`,`Buyers want the same amount at every price`,`The firm can set any price it likes`,`The market demand curve for this product is flat`], answer:0,
  explain:`<p>A flat line at $5 means buyers will take any quantity this firm offers at $5. Charge more and they buy identical goods from rivals. Your course textbook: the firm "faces a perfectly elastic demand curve for its product."</p><p>"Must cut its price to sell more" describes a downward-sloping demand curve (M6). The market demand curve still slopes down; only one firm\'s slice of it looks flat.</p>` }));
mc('l22-pp4','l22',`Your course\'s Firm A, when the market price of ping-pong balls rises to $4:${ppTbl(4)}Using the MR = MC rule, how many balls does it produce now?`,
  [`9 balls`,`5 balls`,`7 balls`,`6 balls`,`4 balls`],0,
  `<p>MR is now $4 a ball. Marginal costs: 6th $3.25, 7th $3.50, 8th $3.75, 9th $4.00. All are at or below $4, so MR = MC at the <b>9th ball</b>; profit is $36 − $24 = $12. Your course: "the optimal point of production ... will be when the firm produces nine ping-pong balls."</p><p>5 balls ignores the price change: the firm sells more, not the same amount, when the price rises (M4).</p>`);
gen('l22-g-profit','l22',()=>{
  const P = pick([6,8,10]), FC = pick([4,6,8,10]);
  let MC; do { MC=[pick([1,2,3])]; while(MC.length<6) MC.push(MC[MC.length-1]+pick([1,2,3])); } while(MC.includes(P) || MC.filter(m=>m<P).length<3 || MC.filter(m=>m<P).length>5);
  const TC=[FC]; MC.forEach(m=>TC.push(TC[TC.length-1]+m)); const q = MC.filter(m=>m<P).length, ans = P*q - TC[q];
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A perfectly competitive maker of wooden spoons sells at the market price of <b>$${P}</b>. Its total cost:${atable(['Spoons','Total cost'], TC.map((t,i)=>[i,'$'+t]), { cls:'compact' })}What is its profit at the profit-maximizing output? (Type a negative number for a loss.)`, answer:ans,
    explain:`<p>MR = $${P} for every spoon. Marginal costs: ${MC.map(m=>'$'+m).join(', ')}. Produce while MC is below $${P}: ${q} spoons. Profit = $${P} × ${q} − $${TC[q]} = <b>${usd(ans)}</b>.</p><p>The common slip is ${usd(P*6-TC[6])}, the profit from making all 6 spoons, or forgetting the $${FC} of fixed cost included in total cost.</p>` };
});
mc('l22-structure','l22','Which market structure has many firms selling similar but differentiated products, with free entry and exit?',
  [`Monopolistic competition`,`Perfect competition`,`Oligopoly`,`Monopoly`,`Natural monopoly`],0,
  `<p>Your course: monopolistic competition has "lots and lots of buyers and lots and lots of sellers but each seller is selling a similar but slightly differentiated good," with free entry and exit. Restaurants are the textbook\'s example.</p><p>Perfect competition needs <b>identical</b> products (M5). Oligopoly has only a few firms; monopoly and natural monopoly have one.</p>`);
tf('l22-tf-mrfall','l22','As a perfectly competitive firm sells more output, its marginal revenue falls.',false,
  `<p>False. Each extra unit sells at the same market price, so marginal revenue stays equal to the price however much the firm sells: $3 for every ping-pong ball in your course\'s table. Falling marginal revenue belongs to a firm that must cut its price to sell more, like a monopoly (M3).</p>`);
lazy('l22-gr-price','l22',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm\'s marginal cost (MC). The market price rises from P1 to P2:${sdg({ xmax:10, ymax:10, xt:[0,2,4,6,8,10], yt:[0,4,7,10], xlab:'Output (units)', ylab:'Dollars per unit', aria:'Rising marginal cost curve with two horizontal price lines, P1 at 4 and P2 at 7',
    lines:[ {pts:[1,2,3,4,5,6,7,8,9].map(q=>[q, 1+q*0.75]), c:'var(--g2)', label:'MC', lx:4, ly:4}, {pts:[[0,4],[10,4]], c:'var(--muted)', label:'P1', lx:-4, ly:14, anchor:'end', dash:'6 4', w:2}, {pts:[[0,7],[10,7]], c:'var(--accent)', label:'P2', lx:-4, ly:-6, anchor:'end'} ] })}How does the firm respond?`,
  options:[`It raises output from 4 units to 8 units, moving up its MC curve`,`It keeps output at 4 units and earns more on each`,`It cuts output, because its costs rose`,`It raises its price above P2 to earn even more`,`It raises output to 10 units, the most it can make`], answer:0,
  explain:`<p>The firm produces where P = MR = MC. With MC = 1 + 0.75Q: at P1 = $4, Q = 4; at P2 = $7, Q = 8. Your course: "If observe price change – increase to $4 – will respond by producing more."</p><p>Keeping the same output ignores that units costing between $4 and $7 now pay for themselves (M4). Its costs didn\'t change; and as a price taker it can\'t charge above P2 (M1).</p>` }));
mc('l22-whytaker','l22','Why is a perfectly competitive firm a price taker?',
  [`It is one of many sellers of an identical product, so buyers would switch to rivals if it charged more`,`The government sets the price in competitive markets`,`It has high fixed costs`,`Its marginal revenue is falling`,`It has no way of knowing what price to charge`],0,
  `<p>Your course: because there are many buyers and sellers of identical goods with free entry, "no single firm or buyer can exert any type of price control." The textbook adds that each firm is "a very small player in the overall market."</p><p>No government sets the price; supply and demand do. A price taker\'s marginal revenue is constant, not falling (M3).</p>`);
/* L22 more */
mc('l22-spectrum','l22','Which list orders the market structures from the most competition to the least?',
  [`Perfect competition, monopolistic competition, oligopoly, monopoly`,`Monopoly, oligopoly, monopolistic competition, perfect competition`,`Perfect competition, oligopoly, monopolistic competition, monopoly`,`Monopolistic competition, perfect competition, oligopoly, monopoly`,`Oligopoly, perfect competition, monopoly, monopolistic competition`],0,
  `<p>Your course textbook\'s spectrum: perfect competition at one extreme (many firms, identical products), monopoly at the other (one firm), with monopolistic competition (many firms, differentiated products) and oligopoly (few firms) between. Monopolistic competition has many firms, so it sits nearer perfect competition than oligopoly does.</p>`,'mc');
Q['l22-spectrum'].keepOrder = true;
mc('l22-info','l22','Your course lists three characteristics of perfect competition. Which fourth condition does your course textbook add?',
  [`Buyers and sellers have all relevant information to make rational decisions`,`The government regulates prices`,`Each firm advertises its brand`,`Firms produce at the lowest point of long-run average cost`,`Each firm faces a downward-sloping demand curve`],0,
  `<p>The textbook: "sellers and buyers have all relevant information to make rational decisions about the product being bought and sold." With full information, no buyer would pay more than the going price.</p><p>Producing at minimum long-run average cost is a <b>result</b> of perfect competition in the long run (Lesson 24), not one of its conditions.</p>`);
tf('l22-tf-many','l22','Any market with many sellers is perfectly competitive.',false,
  `<p>False. Perfect competition also needs identical products and free entry and exit. Thousands of restaurants sell different food, so each has some control over its price: that is monopolistic competition (M5).</p>`);
mc('l22-corn','l22','Your course textbook: U.S. corn farmers received an average price of $6.00 a bushel in 2015. Why wouldn\'t a corn farmer sell below that, say at $5.50?',
  [`She can already sell all the corn she wants at $6.00, so a lower price only loses revenue`,`Selling below the market price is illegal`,`Buyers would think her corn is worse`,`Her marginal cost is always exactly $6.00`,`A lower price would attract too many buyers for her to serve`],0,
  `<p>A price taker faces a flat demand curve at the market price: it can sell any amount at $6.00. The textbook: "A perfectly competitive firm will not sell below the equilibrium price either. Why should they when they can sell all they want at the higher price?" (M2)</p><p>Her marginal cost rises with output; it equals $6.00 only at her chosen output.</p>`);
gen('l22-g-rise','l22',()=>{
  let MC, pairs=[];
  do { MC=[pick([1,2])]; while(MC.length<8) MC.push(MC[MC.length-1]+pick([1,2]));
    pairs=[]; for(let a=MC[0]+1;a<=MC[7];a++) for(let b=a+1;b<=MC[7];b++){ if(MC.includes(a)||MC.includes(b)) continue; const qa=MC.filter(m=>m<a).length, qb=MC.filter(m=>m<b).length; if(qb>qa) pairs.push([a,b,qa,qb]); }
  } while(!pairs.length);
  const [P1,P2,q1,q2] = pick(pairs), ans = q2 - q1;
  return { type:'num', kind:'num', unit:'units', prompt:`Made-up numbers. A perfectly competitive bakery\'s marginal cost of its 1st to 8th cakes: <b>${MC.map(m=>'$'+m).join(', ')}</b>. The market price of a cake rises from <b>$${P1}</b> to <b>$${P2}</b>. By how many cakes does its profit-maximizing output rise?`, answer:ans,
    explain:`<p>The bakery makes every cake whose marginal cost is below the price. At $${P1}: ${q1} cakes. At $${P2}: ${q2} cakes. Output rises by <b>${ans}</b>.</p><p>The common slip is answering 0: a price taker doesn\'t just sell the same cakes for more, it moves up its marginal cost curve (M4).</p>` };
});
mc('l22-mcsame','l22','In your course\'s example, the price of ping-pong balls rises from $3 to $4. Which of Firm A\'s columns does <b>not</b> change?',
  [`Marginal cost`,`Total revenue`,`Marginal revenue`,`Profit`,`The profit-maximizing output`],0,
  `<p>Your course: "Our marginal cost will not change because our total cost has not changed." Only the revenue side moves: total revenue, marginal revenue (now $4), profit, and so the best output (now 9 balls).</p>`);
mc('l22-pp-profit3','l22',`Your course\'s Firm A at $3 a ball:${ppTbl(3)}What is its profit at 5 balls?`,
  [`$5.50`,`$15.00`,`$9.50`,`$3.00`,`$6.50`],0,
  `<p>Profit = total revenue − total cost = 5 × $3 − $9.50 = $15.00 − $9.50 = <b>$5.50</b>, your course\'s answer.</p><p>$15.00 is revenue and $9.50 is total cost. $3.00 is the 5th ball\'s marginal cost (and MR).</p>`);
tf('l22-tf-mreqp','l22','For a perfectly competitive firm, the demand curve it faces, its marginal revenue curve and the market price are all the same horizontal line.',true,
  `<p>True. Every unit sells at the market price, so the firm\'s demand curve is flat at that price, and each extra unit adds exactly the price to revenue. Your course textbook: "the firm\'s marginal revenue curve is the same as the firm\'s demand curve." It is not the market demand curve, which slopes down (M6).</p>`);
mc('l22-tie','l22',`Your course\'s Firm A at $3 earns $5.50 of profit at both 4 and 5 balls. Why?`,
  [`The 5th ball adds $3 to revenue and $3 to cost, so it leaves profit unchanged`,`The firm\'s fixed cost changes between 4 and 5 balls`,`Marginal revenue falls on the 5th ball`,`The slides contain an arithmetic error`,`Profit is zero at both outputs`],0,
  `<p>The 5th ball\'s marginal cost is $9.50 − $6.50 = $3.00, the same as its marginal revenue. It adds nothing either way, so profit ties. The MR = MC rule, and your course, name 5 balls (Lesson 21 explains ties).</p><p>MR stays $3 for every ball (M3), and the numbers are correct.</p>`);
lazy('l22-gr-tr','l22',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. A perfectly competitive firm\'s total revenue:${sdg({ xmax:12, ymax:60, xt:[0,2,4,6,8,10,12], yt:[0,20,40,60], xlab:'Output (units)', ylab:'Total revenue ($)', aria:'A straight total revenue line from the origin passing 40 dollars at 8 units',
    lines:[ {a:[0,0],b:[12,60],c:'var(--accent)',label:'TR',lx:-4,ly:-6,anchor:'end'} ], dots:[{q:8,p:40,label:'(8, $40)',c:'var(--ink)',lx:-8,ly:-10,anchor:'end'}] })}What is the market price of its product?`,
  options:[`$5`,`$40`,`$8`,`$0.20`,`$60`], answer:0,
  explain:`<p>For a price taker, total revenue = price × quantity, a straight line whose slope is the price. At 8 units revenue is $40, so the price is $40 ÷ 8 = <b>$5</b>; each unit adds $5 (MR = P).</p><p>$40 is total revenue, not the price. $0.20 is 8 ÷ 40, the ratio upside down.</p>` }));
mc('l22-entry','l22','In your course\'s description of perfect competition, "free entry and exit" means',
  [`firms can start or stop selling in the market without additional costs`,`the government pays firms to enter`,`buyers can enter the store without paying`,`firms must exit when they make a profit`,`only existing firms may sell`],0,
  `<p>Your course: "firms can freely enter and exit the market without any additional costs." This matters most in the long run, when entry and exit push economic profit to zero (Lesson 24).</p>`);
mc('l22-small','l22','Made-up example. One of 50,000 wheat farmers doubles her harvest. What happens to the market price of wheat?',
  [`It doesn\'t change noticeably, because her farm is tiny compared with the market`,`It halves`,`It doubles`,`It falls a lot, because supply rose`,`It rises, because she now has more market power`],0,
  `<p>Your course textbook: a perfectly competitive firm "must be a very small player in the overall market, so that it can increase or decrease output without noticeably affecting the overall quantity supplied and price." Doubling one farm barely moves total supply.</p><p>A large change in market supply, such as all farmers growing more, would lower the price; one farmer can\'t.</p>`);
lazy('l22-gr-market','l22',()=>({ type:'mc', kind:'graph',
  prompt:`Made-up numbers. In a perfectly competitive market, supply increases from S1 to S2:${sdg({ xmax:10, ymax:10, xt:[0,5,10], yt:[0,4,6,10], xlab:'Market quantity', ylab:'Price ($)', aria:'Market demand with supply shifting right, price falling from 6 to 4',
    lines:[ dem([0,10],[10,0]), oldL([0,2],[8,10],'S1'), sup([2,0],[10,8],'S2') ], dots:[{q:4,p:6,label:'',c:'var(--muted)'},{q:6,p:4,label:'',c:'var(--ink)'}], hl:[{p:6,q:4,c:'var(--muted)'},{p:4,q:6,c:'var(--accent)'}] })}What happens to one firm in this market?`,
  options:[`Its MR line falls from $6 to $4, and it produces less, moving down its MC curve`,`It keeps charging $6 because its own costs didn\'t change`,`Its marginal cost curve shifts down to $4`,`It produces more to make up for the lower price`,`Nothing, because one firm can\'t be affected by the market`], answer:0,
  explain:`<p>The market price falls from $6 to $4. A price taker must accept the new price, so its demand = MR line drops to $4 and it cuts output to where MC = $4. Units that cost between $4 and $6 no longer pay for themselves (M4).</p><p>It can\'t keep charging $6: buyers would go to rivals (M1). Its MC curve doesn\'t move; only the price line does.</p>` }));
mc('l22-ex-structure','l22','Made-up examples. Which is the best example of a monopoly?',
  [`The only company allowed to supply tap water to a town`,`Thousands of farmers growing the same variety of soybeans`,`Hundreds of restaurants, each with its own menu`,`Two companies that build nearly all large passenger jets`,`Many gas stations, each in a different location`],0,
  `<p>One seller with no close substitutes and blocked entry is a monopoly; your course textbook names water companies. Soybean farmers fit perfect competition, restaurants and gas stations monopolistic competition, and two jet makers an oligopoly.</p>`);
tf('l22-tf-price4','l22','In your course\'s example, Firm A\'s marginal cost of each ball is the same whether the market price is $3 or $4.',true,
  `<p>True. Your course: "Our marginal cost will not change because our total cost has not changed." The price changes the revenue side only. The firm responds by producing more, moving along the same MC curve (M4).</p>`);
mc('l22-why-qty','l22','According to your course, a perfectly competitive firm that wants to maximize its revenue or profit can change only',
  [`the quantity it produces`,`the price it charges`,`the market price`,`its competitors\' output`,`the number of buyers`],0,
  `<p>Your course: "for the firm to maximize revenue they can only change quantity that they produce; they cannot change the price by themselves." Price is set by the whole market. So the firm\'s single decision is how much to make, using MR = MC.</p>`);

/* ===== Lesson 22 quick checks ===== */
mc('l22c-spec','l22','Which market structure has a few large firms whose decisions depend on each other?',
  [`Oligopoly`,`Perfect competition`,`Monopolistic competition`,`Monopoly`,`Price taking`],0,
  `<p>Oligopoly: a few firms, high barriers to entry, and each firm\'s best move depends on its rivals\' moves (Lesson 27). Monopoly has one firm; the other two have many.</p>`);
mc('l22c-chars','l22','Made-up example. Which of the following would stop a market from being perfectly competitive?',
  [`Each seller\'s product is a different brand that buyers prefer`,`There are thousands of buyers`,`Firms can enter without special costs`,`Every seller sells the same product`,`Buyers know every seller\'s price`],0,
  `<p>Perfect competition needs identical products. If buyers prefer one seller\'s brand, that seller has some control over its price. The other four are conditions of perfect competition.</p>`);
mc('l22c-flat','l22','Made-up example. A perfectly competitive egg farm sells at a market price of $2 a dozen. If it produces 500 more dozen, how much does its revenue rise?',
  [`$1,000`,`$500`,`$250`,`Nothing, because the price falls`,`$2`],0,
  `<p>A price taker sells every dozen at $2: 500 × $2 = <b>$1,000</b>. Its MR is $2 per dozen. Its own extra output is too small to change the market price.</p>`);
mc('l22c-pp','l22','In your course\'s ping-pong example at $3 a ball, the 6th ball would cost $3.25 to make. Should Firm A make it?',
  [`No: it adds $3 of revenue and $3.25 of cost`,`Yes: revenue rises`,`Yes: the firm is profitable`,`No: the firm should stop at 4 balls`,`Yes: marginal cost is still low`],0,
  `<p>MR ($3) is below MC ($3.25), so the 6th ball would cut profit by $0.25. Firm A stops at 5 balls, where MR = MC.</p>`);
mc('l22c-p4','l22','In your course\'s example, the price rises from $3 to $4 and Firm A moves from point A (5 balls) to point B (9 balls). What made it produce more?',
  [`Balls costing between $3 and $4 to make now bring in more than they cost`,`Its marginal cost fell`,`It gained the power to set its price`,`Its fixed cost fell`,`Demand for its own brand rose`],0,
  `<p>The higher price raises MR to $4, so the 6th to 9th balls (MC $3.25 to $4.00) now pay. Marginal cost didn\'t change; the firm moved along it.</p>`);
mc('l22c-skill','l22','Made-up example. Many small studios teach identical beginner guitar lessons in a city, anyone can open one, and every studio charges the going rate. What market structure is this closest to?',
  [`Perfect competition`,`Monopolistic competition`,`Oligopoly`,`Monopoly`,`Natural monopoly`],0,
  `<p>Many sellers, an identical service, free entry and a going rate each studio must accept: perfect competition. If each studio\'s lessons were different in ways students cared about, it would be monopolistic competition.</p>`);

/* Course materials checked 2026-10-28: video 5.2 transcript, first part (characteristics; "no single firm or buyer can exert any type of price control"; price takers; "they can only change quantity";
   Firm A ping-pong table at $3: MR = MC = 3 at 5 balls, profit $5.50; "only under perfect competition will the marginal revenue stay constant and equal to the price"; price $4: 9 balls; "Our marginal cost will not change"; points A and B),
   Module 5 slides 193-200; course textbook ch. 7 introduction (spectrum of competition, Figure 7.2), §8.1 (conditions; price taker; wheat $6.00 / $8.00; "very small player"), §8.2 (perfectly elastic demand; MR = price);
   Econlib, Lemieux (a competitive firm faces a horizontal demand curve); CLEP outline (characteristics of market structures; perfect competition: profit maximization).
   Source problems noted: the video says "subtract total revenue from total cost" (reversed); slides compute TR − TC. Profit ties at 4/5 and 8/9 balls (MR = MC on the last step). */
const L22TAGS = {
  'l22-chars':['MS5 OS81','str','terms','M5'], 'l22-pt-raise':['OS81','pcmax','models','M1 M6'], 'l22-mr-p':['MS5 OS82','pcmax','terms','M3'],
  'l22-pp3':['MS5','pcmax','data','M4'], 'l22-tf-cut':['OS81 MS5','pcmax','terms','M2'], 'l22-gr-firm':['OS82 ELL','pcmax','graphs','M6'],
  'l22-pp4':['MS5','pcmax','data','M4'], 'l22-g-profit':['MS5 OS82','pcmax','data',''], 'l22-structure':['MS5 OS70','str','terms','M5'],
  'l22-tf-mrfall':['MS5','pcmax','terms','M3'], 'l22-gr-price':['MS5 OS82','pcmax','graphs','M4 M1'], 'l22-whytaker':['MS5 OS81','pcmax','models','M5 M3'],
  'l22-spectrum':['OS70','str','terms',''], 'l22-info':['OS81','str','terms','M5'], 'l22-tf-many':['OS81 OS101','str','terms','M5'],
  'l22-corn':['OS81','pcmax','models','M2'], 'l22-g-rise':['MS5','pcmax','data','M4'], 'l22-mcsame':['MS5','pcmax','models','M4'],
  'l22-pp-profit3':['MS5','pcmax','data',''], 'l22-tf-mreqp':['OS82','pcmax','terms','M6'], 'l22-tie':['MS5 OS82','pcmax','data','M3'],
  'l22-gr-tr':['OS82','pcmax','graphs',''], 'l22-entry':['MS5','str','terms','M5'], 'l22-small':['OS81','pcmax','models','M1'],
  'l22-gr-market':['MS5 OS82','pcmax','graphs','M4 M1'], 'l22-ex-structure':['OS70 OS91','str','models','M5'], 'l22-tf-price4':['MS5','pcmax','terms','M4'], 'l22-why-qty':['MS5','pcmax','terms','M2'],
  'l22c-spec':['OS70 MS5','str','terms',''], 'l22c-chars':['MS5 OS81','str','models','M5'], 'l22c-flat':['OS82','pcmax','data','M3'],
  'l22c-pp':['MS5','pcmax','data',''], 'l22c-p4':['MS5','pcmax','models','M4'], 'l22c-skill':['MS5 OS81','str','models','M5']
};
u5tag(L22TAGS);

U5_CARDS.l22 = [
  ['Market structure','What does market structure describe?','The conditions in an industry: how many sellers, how alike their products are, and how easy it is to enter.','The textbook\'s spectrum: perfect competition, monopolistic competition, oligopoly, monopoly.','It decides how much control a firm has over its price.'],
  ['Perfect competition','What are your course\'s three characteristics of perfect competition?','Many buyers and sellers; identical goods; free entry and exit. (The textbook adds full information.)','Wheat farming: "winter wheat is winter wheat."','Many sellers alone isn\'t enough.'],
  ['Price taker','What is a price taker?','A firm that must accept the market price; charging more loses all its sales, and charging less gains nothing.','A wheat farmer asking $8 when the market pays $6 finds no buyers.','It chooses only its quantity.'],
  ['Demand facing a competitive firm','What does the demand curve facing one perfectly competitive firm look like?','A horizontal line at the market price: perfectly elastic.','Firm A can sell 1 or 9 balls at $3.','The market demand curve still slopes down.'],
  ['MR in perfect competition','What is marginal revenue for a perfectly competitive firm?','Equal to the price at every quantity, so the MR curve is the same flat line as the firm\'s demand curve.','$3 for every ping-pong ball.','Your course: "only under perfect competition" is MR constant and equal to price.'],
  ['Profit-maximizing rule (P = MC)','How does a perfectly competitive firm choose its output?','Where MR = MC; since MR = P, that means where P = MC.','Firm A at $3: 5 balls, where MC = $3.','It can\'t change price, only quantity.'],
  ['Firm A at $3','In your course\'s example, how many balls does Firm A make at $3, and what profit does it earn?','5 balls (MR = MC = $3), profit $15.00 − $9.50 = $5.50.','Profit is also $5.50 at 4 balls: the 5th ball adds $3 to both revenue and cost.','The rule names 5.'],
  ['A price rise','What does a perfectly competitive firm do when the market price rises?','Produces more, moving up its marginal cost curve to the new P = MC point.','Firm A: $3 → $4, output 5 → 9 balls (point A to point B).','Marginal cost doesn\'t change; only the price line moves.'],
  ['Why firms are tiny','Why can one competitive firm change its output without changing the market price?','It is a very small part of the market, so its output barely moves total supply.','One of 50,000 wheat farms doubles its harvest; the price doesn\'t move.','A change in the whole market\'s supply does move the price.'],
  ['Monopolistic competition (preview)','What are the features of monopolistic competition?','Many sellers of similar but differentiated products, free entry and exit, some control over price.','Restaurants, clothing stores.','Different products, not identical ones, is what separates it from perfect competition.'],
  ['Oligopoly (preview)','What are the features of oligopoly?','A few large sellers, high barriers to entry, and decisions that depend on rivals\' choices.','Boeing and Airbus; Coke and Pepsi.','Products can be identical or similar.'],
  ['Monopoly (preview)','What are the features of monopoly?','One seller of a product with no close substitutes, protected by barriers to entry; a price maker.','A town\'s only water company; a drug under patent.','It still faces a downward-sloping demand curve.']
];

Object.assign(U5_WRITE, {
  'w-l22-1':{lesson:'l22',prompt:'Explain why a wheat farmer in a perfectly competitive market neither raises nor cuts her price, and what she does instead to maximize profit.',
    model:'Wheat is an identical product sold by thousands of farmers, and anyone can enter or leave. If one farmer raised her price above the market price, buyers would buy identical wheat from someone else, so she would sell nothing. If she cut her price, she would gain no extra sales, because she can already sell all she wants at the market price; she would just lose revenue. So she is a price taker. Her only decision is how much to grow. Each extra bushel adds the market price to revenue (MR = P), so she grows until her marginal cost rises to the price: P = MR = MC.',
    checklist:['Explains that raising the price loses all sales because of identical products and many sellers','Explains that cutting the price gains nothing because she can sell all she wants at the market price','Identifies her as a price taker with MR = price','States that she chooses quantity where P = MC']},
  'w-l22-2':{lesson:'l22',prompt:'Using your course\'s Firm A, explain what happens when the price of ping-pong balls rises from $3 to $4: what changes, what stays the same, and how many balls it produces.',
    model:'At $3, Firm A\'s marginal revenue is $3 a ball. Its marginal cost rises from $0.50 to $4, and it equals $3 at the 5th ball, so the firm makes 5 balls for a profit of $5.50. When the price rises to $4, its total revenue and marginal revenue change, but its costs, and so its marginal cost column, stay the same. Balls whose marginal cost is between $3 and $4 (the 6th to the 9th) now bring in more than they cost, so the firm expands to 9 balls, where MR = MC = $4. Profit rises to $12. On a graph, the MR line moves up from $3 to $4 and the firm moves up its MC curve from point A to point B.',
    checklist:['States the output at $3 (5 balls) using MR = MC','States that marginal cost does not change, only revenue','States the new output at $4 (9 balls) and why the extra balls are worth making','Describes the movement along the MC curve (A to B)']}
});

U5_PLAN.l22 = {
  core:['l22-chars','l22-pt-raise','l22-mr-p','l22-pp3','l22-tf-cut','l22-gr-firm','l22-pp4','l22-g-profit','l22-structure','l22-tf-mrfall','l22-gr-price','l22-whytaker'],
  more:['l22-spectrum','l22-info','l22-tf-many','l22-corn','l22-g-rise','l22-mcsame','l22-pp-profit3','l22-tf-mreqp','l22-tie','l22-gr-tr','l22-entry','l22-small','l22-gr-market','l22-ex-structure','l22-tf-price4','l22-why-qty']
};

U5_LESSONS.push({ id:'l22', unit:5, title:'Perfect Competition: Price Takers', mins:40, src:'Modern States video 5.2 (first part) and Module 5 slides 193-200 · Course textbook (OpenStax) ch. 7 introduction, §8.1-§8.2',
  sources:['MS5','OS70','OS81','OS82','CB','ELL','ELCO'],
  oneline:'In perfect competition many firms sell an identical product, so each must take the market price: marginal revenue equals price, and the firm\'s only choice is how much to make, where P = MC.',
  body:`
<p>Lesson 21 gave the rule every firm uses: produce where ${dt('marginal-revenue','marginal revenue')} = ${dt('marginal-cost','marginal cost')}. What changes from market to market is marginal revenue, and that depends on how much competition a firm faces. This lesson maps the four kinds of market, then starts with the most competitive one.</p>

<h2>Four market structures</h2>
<!-- src: OS70 (ch. 7 introduction: "Market structure is a multidimensional concept that involves how competitive the industry is. It is defined by questions such as these: How much market power does each firm in the industry possess? How similar is each firm's product to the products of other firms in the industry? How difficult is it for new firms to enter the industry?"; Figure 7.2: "At one extreme—perfect competition—many firms are all trying to sell identical products. At the other extreme—monopoly—only one firm is selling the product ... Monopolistic competition is a situation with many firms selling similar, but not identical, products. Oligopoly is a situation with few firms that sell identical or similar products"); MS5 (videos 5.3-5.5 openers: monopoly "the complete opposite extreme"; oligopoly "slightly more competition than a monopoly but slightly less competition than perfect competition"); CB (outline: Characteristics of different market structures) -->
<p>A ${dt('market-structure','<b>market structure</b>')} is the set of conditions a firm competes under. Your course textbook boils it down to a few questions: how many sellers are there, "how similar is each firm\'s product," and "how difficult is it for new firms to enter?" The answers place every market somewhere on a spectrum, from most to least competitive: perfect competition, ${dt('monopolistic-competition','monopolistic competition')}, ${dt('oligopoly','oligopoly')} and ${dt('monopoly','monopoly')} (Lessons 25 to 28 cover the last three).</p>
${FIG5.l22spec()}
<p><b>Why structure matters:</b> the more close substitutes buyers have, the less a firm can raise its price without losing them. That decides the shape of the firm\'s demand and marginal revenue, and whether its profits survive in the long run.</p>
<p><b>So what:</b> the CLEP outline lists "Characteristics of different market structures" as its own topic. Expect to name a structure from a description.</p>
<div data-check="l22c-spec"></div>

<h2>What makes a market perfectly competitive</h2>
<!-- src: MS5 (video 5.2: "Perfectly competitive markets have a few key characteristics. First, there are many buyers and sellers. Secondly ... the goods that are produced are exactly the same, so it doesn't matter who the buyer buys the goods from. And lastly, firms can freely enter and exit the market without any additional costs. Now, these characteristics are going to tell us that no single firm or buyer can exert any type of price control in this market"; slide 194); OS81 (four conditions including "sellers and buyers have all relevant information to make rational decisions"; "winter wheat is winter wheat"; agricultural markets) -->
<p>Your course gives three conditions for ${dt('perfect-competition','<b>perfect competition</b>')}: "many buyers and sellers," goods that are "exactly the same," and ${dt('free-entry','<b>free entry and exit</b>')} "without any additional costs." Your course textbook adds that buyers and sellers have full information.</p>
${FIG5.l22chars()}
<p><b>Why those conditions remove price control:</b> if every seller offers the same thing and buyers know every price, nobody pays more than the going rate. If profits appear, new sellers can join. Your course: "no single firm or buyer can exert any type of price control in this market."</p>
<p>The textbook calls perfect competition "a hypothetical extreme," but farm markets come close: "The same crops grown by different farmers are largely interchangeable."</p>
<div data-check="l22c-chars"></div>

<h2>Price takers face a flat demand curve</h2>
<!-- src: MS5 (video 5.2: "all firms and all buyers are what we call price takers ... for the firm to maximize revenue they can only change quantity that they produce; they cannot change the price by themselves"; slide 194); OS81 ("If a firm in a perfectly competitive market raises the price of its product by so much as a penny, it will lose all of its sales to competitors"; 2015 corn and wheat $6.00; "would not have found any buyers"; "Why should they when they can sell all they want at the higher price?"; "a very small player in the overall market"); OS82 ("the firm faces a perfectly elastic demand curve for its product"; "the firm's marginal revenue curve is the same as the firm's demand curve"); ELL (Lemieux: "A competitive firm faces a horizontal demand curve (given by the market price level)") -->
<p>Every firm in perfect competition is a ${dt('price-taker','<b>price taker</b>')}: it accepts the market price as given. Your course textbook: if such a firm "raises the price of its product by so much as a penny, it will lose all of its sales to competitors." Cutting the price makes no sense either: "Why should they when they can sell all they want at the higher price?"</p>
<p><b>Worked example: your course textbook\'s wheat.</b> In 2015 wheat sold for an average of $6.00 a bushel. A grower asking $8.00 "would not have found any buyers." A grower asking $5.50 would sell no more than at $6.00, just for less money.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a farmers\' market with twenty stands selling the same apples at $2 a pound. If one stand asks $2.10, shoppers walk three steps to the next stand. Cutting to $1.90 would sell no more than the stand can already sell at $2. Each stand can only decide how many apples to bring, not what they sell for. That is a flat demand curve.</p></div>
${FIG5.l22market()}
<p><b>Why the line is flat:</b> one farm is "a very small player in the overall market," so it can sell more or less "without noticeably affecting the overall quantity supplied and price." Econlib\'s Lemieux: "A competitive firm faces a horizontal demand curve (given by the market price level)."</p>
<p><b>So what:</b> your course: the firm "can only change quantity that they produce; they cannot change the price by themselves." Its whole problem is picking a quantity.</p>
<div data-check="l22c-flat"></div>

<h2>Marginal revenue equals price: your course\'s ping-pong balls</h2>
<!-- src: MS5 (video 5.2: Firm A sells ping-pong balls; output 0-9; price $3; total revenue = price × quantity; total cost "the sum of costs and variable costs" [fixed and variable]; "marginal revenue is 3 and marginal cost is 3 ... where our output is 5 units"; "Profits are five dollars and fifty cents"; "marginal revenue stays constant regardless of how much the firm is producing ... only under perfect competition will the marginal revenue stay constant and equal to the price"; slides 195-197). Source problem: the video says "we simply subtract total revenue from total cost"; profit is total revenue minus total cost, as the slides compute. -->
<p>Your course\'s Firm A sells ping-pong balls at the market price of $3. Because every ball sells for $3, each one adds exactly $3 to revenue: marginal revenue is $3 at every output. Your course: "only under perfect competition will the marginal revenue stay constant and equal to the price."</p>
<p>So for a price taker the MR = MC rule becomes <b>P = MC</b>: produce until the cost of one more unit rises to the price.</p>
<p><b>Worked example: your course\'s table.</b></p>
<div class="math">Profit = ${dt('total-revenue','total revenue')} − total cost<br>5 balls: profit = 5 × $3 − $9.50 = $15.00 − $9.50 = <b>$5.50</b><br>MC of the 5th ball = $9.50 − $6.50 = <b>$3.00</b> = MR → stop at 5<br>MC of the 6th ball = $12.75 − $9.50 = $3.25 &gt; $3 → not worth making</div>
${FIG5.l22pptbl()}
<p>Check: $5.50 is the highest profit in the table. Watch one slip in the video: it says to find profit "we simply subtract total revenue from total cost." It is the other way round, total revenue minus total cost, which is what the slides compute. The video also calls total cost "the sum of costs and variable costs"; it means fixed and variable costs.</p>
<div data-check="l22c-pp"></div>

<h2>When the market price rises to $4</h2>
<!-- src: MS5 (video 5.2: "what happens if the price increases to four dollars? ... we will have a new profit and a new marginal revenue because our total revenue has changed. Our marginal cost will not change because our total cost has not changed"; "the firm produces nine ping-pong balls and marginal revenue is 4 and marginal cost is 4"; "when the price is three dollars we are producing at point A and we are producing five units ... when the price rises to four dollars we now produce at point B"; slides 198-200) -->
<p>Now suppose the market price of ping-pong balls rises to $4. Your course: "we will have a new profit and a new marginal revenue because our total revenue has changed. Our marginal cost will not change because our total cost has not changed."</p>
${FIG5.l22before()}
<p><b>Why output rises:</b> the 6th to the 9th balls cost $3.25 to $4.00 each. At $3 they lost money; at $4 each pays for itself. So the firm expands to 9 balls, where MR = MC = $4, and profit rises to $36 − $24 = $12.</p>
${FIG5.l22price4()}
<p>Try other prices below. The firm always lands where the price line meets its marginal cost.</p>
<div data-widget="pricetaker"></div>
<p>What to notice: as you raise the price, output climbs along the MC curve. That pattern, more output at a higher price, is the firm\'s supply curve, which Lesson 23 builds.</p>
<div data-check="l22c-p4"></div>

<h2>Which market is it?</h2>
<!-- src: OS70, OS81, OS91, OS101, OS102, MS5. Exam skill: name the market structure from its characteristics. -->
<p>The CLEP often describes a market and asks which structure it is. The move: count the sellers, then ask whether the products are identical, and finally whether new firms can get in.</p>
<div data-widget="structsort"></div>
<p>What to notice: "many sellers" splits into two structures. Identical products point to perfect competition; products buyers tell apart point to monopolistic competition.</p>
<div data-check="l22c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L22TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"A competitive firm can raise its price a little and keep most of its customers."</span>Raise it "by so much as a penny" and it loses all its sales: buyers switch to identical products.</li>
<li><span class="wrong">"A price taker should cut its price to sell more."</span>It can already sell all it wants at the market price. A cut just loses revenue.</li>
<li><span class="wrong">"A competitive firm\'s marginal revenue falls as it sells more."</span>Every unit sells at the same price, so MR = price at every output ($3 for every ball).</li>
<li><span class="wrong">"When the price rises, the firm sells the same amount for more."</span>It produces more, moving up its MC curve (Firm A: 5 balls → 9 balls).</li>
<li><span class="wrong">"Perfect competition just means many firms."</span>Products must also be identical and entry free. Many restaurants with different menus are monopolistic competition.</li>
<li><span class="wrong">"The firm\'s demand curve is the market demand curve."</span>The market curve slopes down; one firm\'s demand is a flat line at the market price.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>The four <b>market structures</b> differ in the number of sellers, how alike the products are and how easy entry is; that decides each firm\'s control over price.</li>
<li><b>Perfect competition</b>: many buyers and sellers, identical goods, free entry and exit (plus full information in the textbook).</li>
<li>Each firm is a <b>price taker</b> facing a flat demand curve at the market price; it chooses only quantity.</li>
<li>For a price taker <b>MR = P</b>, so it produces where P = MC (Firm A at $3: 5 balls, profit $5.50).</li>
<li>When the <b>price rises</b>, MR rises and the firm moves up its MC curve (Firm A at $4: 9 balls, profit $12).</li>
<li>To name a structure, count the sellers, check whether products are identical, then check entry.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Characteristics of different market structures" and, under perfect competition, "Profit maximization." Expect a description to classify, a table asking for the profit-maximizing output at a given price, or a graph of a firm\'s flat demand (MR) line against its MC curve.</p>
</div>`,
  deeper:`
<h3>Is any real market perfectly competitive?</h3>
<p>Your course textbook calls perfect competition "a hypothetical extreme," a benchmark. Farm markets, "small roadside produce markets and small organic farmers" come close. Econlib\'s Kasper adds that "so-called perfect competition unrealistically assumes perfect knowledge"; real competition is a process of rivals trying new products and prices.</p>
<h3>Market demand and firm demand at once</h3>
<p>The textbook explains why the two curves differ: each competitive firm\'s demand "is a tiny slice of the entire market demand curve." The market curve slopes down because buyers as a group buy more at lower prices; no single firm can move along it by itself.</p>`,
  links:[ {k:'Textbook',t:'8.1 Perfect Competition and Why It Matters',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/8-1-perfect-competition-and-why-it-matters',w:'The conditions for perfect competition and the wheat and corn examples, in the newer edition of your course textbook.'},
          {k:'Article',t:'Toilet Paper: Increasing Marginal Cost',s:'Econlib (Pierre Lemieux, 2020)',u:'https://econlib.org/toilet-paper-increasing-marginal-cost',w:'A short real-world case: why producers make more only when the price they get rises.'} ]
});
