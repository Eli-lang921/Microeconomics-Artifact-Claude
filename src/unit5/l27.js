/* ===== Lesson 27 figures ===== */
/* Course's Jack and Jill water duopoly (video 5.4, slides 228-233): P = 120 − Q, MC = 0, so revenue = profit. Checked by script:
   both 30 → Q 60, P $60, $1,800 each (monopoly outcome, $3,600); one 40, other 30 → Q 70, P $50, $2,000 and $1,500; both 40 → Q 80, P $40, $1,600 each.
   P = MC = 0 at Q 120 (competitive outcome). Within choices 20, 30, 40 for each, 40 is each player's best reply to every choice (dominant). */
const JJ_ROWS = [0,10,20,30,40,50,60,70,80,90,100,110,120].map(q=>({ q, p:JJ_P(q), tr:q*JJ_P(q) }));
const TB_PAY = [[[1000,1000],[200,1500]],[[1500,200],[400,400]]];          // textbook Table 10.3: rows Firm A, cols Firm B; Hold down, Increase
const AD_PAY = [[[50,30],[70,20]],[[40,40],[60,50]]];                       // made-up advertising game ($ thousands): rows Firm A, cols Firm B; Advertise, Don't

/* L27 V1: "cats in a bag": compete or collude (textbook §10.2; course slides 226-227) */
FIG5.l27cats = () => fig(flow([
  {t:'A few big firms; each one\'s profit depends on what the others do (<b>interdependence</b>).',c:'u3amb'},
  {split:[
    [{t:'<b>Collude</b>',c:'u3up'}, 'Hold down output together, as a cartel.', 'Act like one monopoly: high price, high profits.'],
    [{t:'<b>Compete</b>',c:'u3down'}, 'Each firm produces more to grab sales.', 'Price falls toward the competitive level; profits shrink.'] ]},
  {t:'Each firm is tempted to cheat on a deal, so collusion tends to break down.',c:'u3end'}
]), 'Your course textbook: oligopolists "can either scratch each other to pieces or cuddle up and get comfortable with one another. If oligopolists compete hard, they may end up acting very much like perfect competitors ... If oligopolists collude with each other, they may effectively act like a monopoly." Your course: there is a "tension between cooperation and self-interest."');

/* L27 V2: Jack and Jill's market (course slide 228, extended to 120 with the same demand) */
FIG5.l27tbl = () => fig(atable(['Gallons','Price','Total revenue (= profit)','Outcome'],
  JJ_ROWS.map(r=>[r.q, usd(r.p), usd(r.tr), r.q===60?'<b>monopoly: 30 each</b>':r.q===70?'one cheats (40 + 30)':r.q===80?'<b>both cheat: 40 each</b>':r.q===120?'competitive: P = MC = $0':'']),
  { hl:{6:{row:'u3z2'},8:{row:'u3z1'}}, cls:'compact wrap' }),
  'Your course\'s numbers (slide 228 lists 0 to 90 gallons; rows 100 to 120 follow the same demand, P = 120 − Q). With marginal cost of $0, revenue is profit. Total profit peaks at 60 gallons and $60: the monopoly outcome, $3,600. Producing more always lowers the joint total, down to $0 at 120 gallons, where the price equals marginal cost.');

/* L27 V3: who gains from cheating (course slides 229-230) */
FIG5.l27bars = () => fig(stackbars([
  {label:'Both cooperate', parts:[{v:1800,c:'var(--g1)',t:'Jack $1,800'},{v:1800,c:'var(--g2)',t:'Jill $1,800'}]},
  {label:'Jack cheats', parts:[{v:2000,c:'var(--g1)',t:'Jack $2,000'},{v:1500,c:'var(--g2)',t:'Jill $1,500'}]},
  {label:'Both cheat', parts:[{v:1600,c:'var(--g1)',t:'Jack $1,600'},{v:1600,c:'var(--g2)',t:'Jill $1,600'}]}
], { max:3600, left:104, w:380, aria:'Jack and Jill profits when both cooperate, when Jack cheats, and when both cheat' }),
  'Your course\'s numbers. Cooperating (30 gallons each) gives the largest total, $3,600. If Jack cheats by bringing 40, the price falls to $50: he gains $200 and Jill loses $300. If both cheat, the price falls to $40 and each ends with $1,600, less than if both had kept the deal.');

/* L27 V4: the course's payoff matrix (slide 233; rows and columns swapped so Jack is the row player) */
FIG5.l27mx = () => fig(pmatrix({ rowName:'Jack', colName:'Jill', rows:['Cheat','Cooperate'], cols:['Cheat','Cooperate'], pay:JJ_PAY, mark:{br:true}, hl:[[0,0]] }),
  'Your course\'s game (slide 233). Jack\'s payoff is listed first in each box; underlines mark each player\'s best reply to the other\'s choice. Whatever Jill does, Jack earns more by cheating ($1,600 beats $1,500; $2,000 beats $1,800), and the same is true for Jill. Both cheating (outlined) is the Nash equilibrium, even though both cooperating would pay each of them more.');

/* L27 V5: the original prisoner's dilemma (textbook §10.2 Table 10.2; years in prison, fewer is better) */
FIG5.l27pd = () => fig(pmatrix({ rowName:'A', colName:'B', rows:['Stay silent','Confess'], cols:['Stay silent','Confess'], pay:[[[2,2],[8,1]],[[1,8],[5,5]]], unit:'', fmtp:v=>v+(v===1?' year':' years'), hl:[[1,1]] }),
  'Your course textbook\'s prisoner\'s dilemma. Here fewer years is better. If B confesses, A gets 5 years by confessing instead of 8; if B stays silent, A gets 1 year by confessing instead of 2. So confessing is A\'s dominant strategy, and B\'s too. Both confess (outlined) and serve 5 years each, though staying silent would have meant 2.');

/* L27 V6: best replies when only one player has a dominant strategy (made-up advertising game) */
FIG5.l27ad = () => fig(pmatrix({ rowName:'A', colName:'B', rows:['Advertise','Don\'t'], cols:['Advertise','Don\'t'], pay:AD_PAY, mark:{br:true}, hl:[[0,0]], fmtp:v=>'$'+v+'k' }),
  'Made-up numbers (profits in thousands). Underlines mark best replies. A\'s best reply is Advertise whatever B does ($50k beats $40k; $70k beats $60k): a dominant strategy. B has none: it prefers Advertise if A advertises ($30k beats $20k) but Don\'t if A doesn\'t ($50k beats $40k). The only box where both choices are underlined is (Advertise, Advertise): the Nash equilibrium.');

/* ===== Lesson 27: Oligopoly and Game Theory (Modern States video 5.4; Module 5 slides 225-234) =====
   Common mistakes: M1 the Nash equilibrium is the box with the highest total payoff · M2 a dominant strategy is the choice with the single biggest payoff
   M3 cartels are stable because every member gains from the deal · M4 an oligopolist can choose its output without thinking about rivals
   M5 every game has a dominant strategy for each player · M6 cheating on a cartel moves the market toward the monopoly outcome */

mc('l27-interdep','l27','What sets oligopoly apart from the other market structures?',
  [`A few large firms, so each firm\'s best choice depends on what its rivals do`,`Many small firms selling identical goods`,`One firm with no close substitutes`,`Many firms selling slightly different products with free entry`,`Firms that are all price takers`],0,
  `<p>Your course (slide 226): "Because few sellers, the production choices of one firm will affect the outcomes of all other firms," so firms "must act strategically." Your course textbook calls this "mutual interdependence where various decisions such as output, price, advertising, and so on, depend on the decisions of the other firm(s)" (M4).</p>`);
mc('l27-cartel','l27','A group of firms with a formal agreement to hold down output and sell at the monopoly price is called',
  [`a cartel`,`a natural monopoly`,`a price taker`,`monopolistic competition`,`a dominant strategy`],0,
  `<p>Your course textbook: "A group of firms that have a formal agreement to collude to produce the monopoly output and sell at the monopoly price is called a cartel." The St. Louis Fed\'s Zaretsky: "Cartels are, essentially, multifirm monopolies." Collusion like this is illegal in the United States.</p>`);
mc('l27-monopoly','l27','In your course\'s example, Jack and Jill sell water with demand from 0 gallons at $120 down to 90 gallons at $30 (10 fewer dollars per 10 gallons) and marginal cost of $0. If they cooperate to earn the most total profit, what do they do?',
  [`Sell 60 gallons in total (30 each) at $60, earning $1,800 each`,`Sell 80 gallons in total (40 each) at $40, earning $1,600 each`,`Sell 90 gallons in total at $30`,`Sell 120 gallons at $0`,`Sell 40 gallons in total at $80, earning $1,600 each`],0,
  `<p>Total revenue (= profit, since MC = $0) peaks at 60 gallons × $60 = $3,600. Your course: "the highest possible revenue, highest possible profit is going to be at a point where they produce 60 units of water and they charge sixty dollars per unit." Split evenly, that is $1,800 each.</p><p>80 gallons is what happens when both cheat. 40 gallons at $80 earns only $3,200 in total.</p>`);
mc('l27-cheat','l27','Jack and Jill agreed to bring 30 gallons each. Jack secretly brings 40, so the market has 70 gallons and the price falls to $50. What are their profits?',
  [`Jack $2,000, Jill $1,500`,`Jack $1,800, Jill $1,800`,`Jack $1,600, Jill $1,600`,`Jack $1,500, Jill $2,000`,`Jack $2,000, Jill $2,000`],0,
  `<p>Jack: 40 × $50 = $2,000. Jill: 30 × $50 = $1,500. Your course: "for the cheater this is beneficial ... profits have risen from 1800 to 2000," while for the cooperator "they're facing a lower price of $50, so their profits have fallen." Total profit falls from $3,600 to $3,500.</p>`);
tf('l27-tf-stable','l27','Cartels tend to be stable, because every member earns more when the cartel holds output down.',false,
  `<p>False. Each member can earn even more by quietly producing more. Econlib\'s Dick: "The same profit motive that entices sellers to want to collude also creates strong and sometimes uncontrollable temptations to 'cheat' on a cartel." The St. Louis Fed notes OPEC\'s "actual production levels have almost always been greater than its target levels" since 1983 (M3).</p>`);
mc('l27-dominant','l27','What is a dominant strategy?',
  [`A choice that gives a player the best result whatever the other player does`,`The choice with the largest single payoff in the matrix`,`The choice that gives both players the most in total`,`The choice the other player is most likely to make`,`A strategy that only the larger firm can use`],0,
  `<p>Your course textbook: "the strategy an individual (or firm) will pursue regardless of the other individual\'s (or firm\'s) decision." For Jack, cheating beats cooperating if Jill cheats ($1,600 vs $1,500) and if she cooperates ($2,000 vs $1,800).</p><p>A dominant strategy needn\'t contain the biggest number in the matrix (M2).</p>`);
lazy('l27-mx-dom','l27',()=>({ type:'mc', kind:'mc',
  prompt:`Your course textbook\'s duopoly (Table 10.3). Firm A\'s profit is listed first in each box.${pmatrix({ rowName:'A', colName:'B', rows:['Hold down output','Increase output'], cols:['Hold down output','Increase output'], pay:TB_PAY })}What is each firm\'s dominant strategy, and what happens?`,
  options:[`Both increase output and earn $400 each, though holding down would pay $1,000 each`,`Both hold down output and earn $1,000 each`,`A increases and B holds down: $1,500 and $200`,`Neither firm has a dominant strategy`,`Both increase output and earn $1,500 each`], answer:0,
  explain:`<p>For A: if B holds down, increasing pays $1,500 against $1,000; if B increases, increasing pays $400 against $200. So increasing is A\'s dominant strategy, and by the same numbers B\'s. The textbook: "both firms\' dominant strategy is to increase output, in which case each will earn $400 in profits."</p><p>$1,000 each is better for both but isn\'t stable: each can gain by switching (M1).</p>` }));
mc('l27-nash','l27','Your course defines a Nash equilibrium as',
  [`an outcome where each player chooses its best strategy given the strategies all the other players have chosen`,`the outcome with the highest total payoff`,`the outcome a cartel agrees to`,`any outcome where both players cooperate`,`the outcome where one player wins and the other loses`],0,
  `<p>Your course (slide 231): "Agents that interact with one another will choose their optimal strategy given the strategies that all other agents have chosen." In the Jack and Jill game it is "Both Cheat": neither "Can't do any better regardless of what the other person does" (that is, neither can do better by switching).</p><p>It needn\'t be the best total outcome; here cooperating pays more (M1).</p>`);
lazy('l27-mx-nash','l27',()=>({ type:'mc', kind:'mc',
  prompt:`Made-up numbers (profits in thousands). Firm A\'s profit is listed first.${pmatrix({ rowName:'A', colName:'B', rows:['Advertise','Don\'t'], cols:['Advertise','Don\'t'], pay:AD_PAY, fmtp:v=>'$'+v+'k' })}Which outcome is the Nash equilibrium?`,
  options:[`A advertises, B advertises`,`A advertises, B doesn\'t`,`A doesn\'t, B advertises`,`A doesn\'t, B doesn\'t`,`There is no Nash equilibrium`], answer:0,
  explain:`<p>A\'s dominant strategy is to advertise ($50k &gt; $40k and $70k &gt; $60k). B has no dominant strategy, but knowing A advertises, B\'s best reply is to advertise too ($30k &gt; $20k). At (Advertise, Advertise) neither wants to switch: A would drop to $40k, B to $20k.</p><p>(Don\'t, Don\'t) has the largest total ($110k), but A would switch to advertising there (M1, M5).</p>` }));
tf('l27-tf-alldom','l27','In every payoff matrix, each player has a dominant strategy.',false,
  `<p>False. In this lesson\'s advertising game, Firm B\'s best choice depends on what Firm A does, so B has no dominant strategy. You can still find the Nash equilibrium by checking each player\'s best reply to the other (M5).</p>`);
mc('l27-why-cheat','l27','In the prisoner\'s dilemma, why do both players end up worse off than if they had cooperated?',
  [`Each one\'s dominant strategy is to not cooperate, and they can\'t enforce a deal to do otherwise`,`They don\'t know the payoffs`,`One player is irrational`,`Cooperation is illegal`,`They both prefer longer prison terms`],0,
  `<p>Your course textbook: "if the two prisoners had cooperated by both remaining silent, they would only have had to serve a total of four years ... If the two prisoners can work out some way of cooperating ... they will both be better off." Your course: cooperating is "collectively" best but "individually irrational – because potential to make even more by cheating!"</p>`);
gen('l27-g-cheat','l27',()=>{
  const a = pick([80,100,120,160,200]), k = pick([5,10]), q = a/4, P = a - 2*q - k, cheat = (q+k)*P, coop = q*(a-2*q);
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Two firms share a market with demand <b>P = ${a} − Q</b> and zero marginal cost. They agree to produce <b>${q}</b> units each (the monopoly output, split evenly). One firm cheats and produces <b>${q+k}</b> while the other keeps to ${q}. What is the cheater\'s profit?`, answer:cheat,
    explain:`<p>Market quantity = ${q} + ${q+k} = ${2*q+k}, so the price is ${a} − ${2*q+k} = $${P}. The cheater earns ${q+k} × $${P} = <b>${usd(cheat)}</b>, against ${usd(coop)} if it had kept the deal. The other firm\'s profit falls to ${q} × $${P} = ${usd(q*P)}.</p><p>The common wrong answer uses the old price: ${q+k} × $${a-2*q} = ${usd((q+k)*(a-2*q))}.</p>` };
});
/* L27 more */
mc('l27-why-exist','l27','Your course textbook gives several reasons oligopolies form. Which is one of them?',
  [`Economies of scale large enough that the market has room for only two or three firms, as with Boeing and Airbus`,`Free entry and exit`,`Thousands of identical small sellers`,`Government price ceilings`,`Products that cost nothing to make`],0,
  `<p>The textbook: when demand is "two or three times the quantity needed to produce at the minimum of the average cost curve," the market "would have room for only two or three oligopoly firms." Patents held by a few firms and the cost of building a brand (Coke and Pepsi) can do it too.</p>`);
mc('l27-both-cheat','l27','In your course\'s example, the price of water is $120 minus the total gallons Jack and Jill bring, and the water costs them nothing to pump. Both bring 40 gallons. What happens?',
  [`The price falls to $40 and each earns $1,600`,`The price stays at $60 and each earns $2,400`,`The price falls to $50 and each earns $2,000`,`The price falls to $0`,`Each earns $1,800`],0,
  `<p>80 gallons sell at $120 − $80 = $40, so each earns 40 × $40 = $1,600. Your course: "The oligopoly outcome tells us that they both cheat because they\'re both acting in their own self-interest."</p>`);
tf('l27-tf-cheatmono','l27','When a member of a cartel cheats by producing more, the market moves closer to the monopoly outcome.',false,
  `<p>False. The monopoly outcome is the cartel\'s deal: low output, high price. Cheating raises output and lowers the price, moving the market away from it and toward the competitive outcome. (Your course\'s video says firms "cheat so to reach the monopoly outcome"; its own numbers show cheating lowers the price from $60 to $50. It also calls the result "below the monopoly outcome": profit ends up below the monopoly level, but output ends up above it.) (M6)</p>`);
mc('l27-opec','l27','Your course textbook mentions OPEC, a group of oil-exporting countries that agree to limit output. Why is such an agreement hard to keep?',
  [`It can\'t be enforced in court, and each member gains by selling more than its quota`,`OPEC members have no market power`,`Oil is a perfectly competitive market`,`Buyers refuse to pay higher prices`,`OPEC sets prices equal to marginal cost`],0,
  `<p>The textbook: such agreements "are not legally enforceable. If Nigeria, for example, decides to start cutting prices and selling more oil, Saudi Arabia cannot sue Nigeria in court." The St. Louis Fed: OPEC\'s "actual production levels have almost always been greater than its target levels" (M3).</p>`);
mc('l27-collusion-legal','l27','Your course textbook says most collusion in the United States is "tacit." What does that mean, and why?',
  [`Firms reach an unspoken understanding rather than a written agreement, because collusion is illegal and written deals are evidence`,`Firms openly sign contracts to fix prices`,`The government sets the price for them`,`Firms compete as hard as they can`,`Firms merge into one company`],0,
  `<p>The textbook: "Because cartel agreements provide evidence of collusion, they are rare in the United States. Instead, most collusion is tacit, where firms implicitly reach an understanding that competition is bad for profits."</p>`);
mc('l27-lysine','l27','In the 1990s the world\'s lysine makers, including Archer Daniels Midland, met secretly to set how much each would sell and at what price. Your course textbook reports that',
  [`the price of lysine doubled until the FBI recorded the meetings and ADM was fined $100 million`,`the cartel lowered the price of lysine`,`the cartel was legal because it was international`,`the firms competed as perfect competitors`,`nothing happened to the price`],0,
  `<p>The textbook: "The price of lysine doubled while the cartel was in effect. Confronted by the FBI tapes, Archer Daniels Midland pled guilty in 1996 and paid a fine of $100 million." ADM\'s slogan, in its president\'s words: "Our competitors are our friends. Our customers are the enemy."</p>`);
mc('l27-repeat','l27','Your course says "cooperation is possible in repetitive games when the rules don\'t change." Why can repeating the game help?',
  [`A player who cheats today can be punished tomorrow, for example by a tit-for-tat strategy`,`Players forget the payoffs`,`The payoffs get larger each round`,`The government enforces cooperation`,`Cheating becomes impossible`],0,
  `<p>Econlib\'s Dixit and Nalebuff: "The most common path to cooperation arises from repetitions of the game. ... Punishment can be made automatic by following strategies like 'tit for tat,'" where "you cheat if and only if your rival cheated in the previous round." It only works if "cheating can be detected and punished."</p>`);
mc('l27-pdgame','l27','In your course textbook\'s prisoner\'s dilemma, each prisoner gets 2 years if both stay silent, 5 years if both confess, and 1 year (versus the other\'s 8) for confessing while the other stays silent. What happens?',
  [`Both confess and serve 5 years each`,`Both stay silent and serve 2 years each`,`One confesses and serves 1 year; the other serves 8`,`Both serve 8 years`,`They flip a coin`],0,
  `<p>Confessing is each prisoner\'s dominant strategy: 5 years beats 8 if the other confesses, and 1 year beats 2 if the other stays silent. The textbook: "both are likely to confess, and end up doing a total of 10 years of jail time between them."</p>`);
lazy('l27-mx-read','l27',()=>({ type:'mc', kind:'mc',
  prompt:`Your course\'s Jack and Jill game. Jack\'s profit is listed first.${pmatrix({ rowName:'Jack', colName:'Jill', rows:['Cheat','Cooperate'], cols:['Cheat','Cooperate'], pay:JJ_PAY })}Suppose Jack expects Jill to cooperate. What should Jack do, and why?`,
  options:[`Cheat, because he earns $2,000 instead of $1,800`,`Cooperate, because he earns $1,800 instead of $1,500`,`Cooperate, because the total is highest`,`Cheat, because he earns $1,600 instead of $1,500`,`It makes no difference to Jack`], answer:0,
  explain:`<p>If Jill cooperates, look down Jill\'s Cooperate column: Jack gets $2,000 by cheating and $1,800 by cooperating. So he cheats. If Jill cheats, he also does better by cheating ($1,600 vs $1,500): cheating is his dominant strategy.</p><p>$1,600 vs $1,500 is the comparison for when Jill cheats, the other column.</p>` }));
gen('l27-g-nash','l27',()=>{
  /* Random 2x2 game with exactly one pure Nash equilibrium; the target cell is chosen first so every cell is the answer about equally often. */
  const N=['High price','Low price'], tgt=[pick([0,1]),pick([0,1])];
  let pay, ne;
  for(let t=0;t<2000;t++){
    const r=()=>5*(4+Math.floor(Math.random()*21));      /* $20k-$120k in $5k steps */
    pay=[[[r(),r()],[r(),r()]],[[r(),r()],[r(),r()]]];
    const brX = c => pay[0][c][0]===pay[1][c][0] ? -1 : (pay[0][c][0]>pay[1][c][0]?0:1);   /* X's best row against column c */
    const brY = rw => pay[rw][0][1]===pay[rw][1][1] ? -1 : (pay[rw][0][1]>pay[rw][1][1]?0:1);
    if([0,1].some(c=>brX(c)<0) || [0,1].some(rw=>brY(rw)<0)) continue;   /* no ties */
    ne=[]; for(const rw of [0,1]) for(const c of [0,1]) if(brX(c)===rw && brY(rw)===c) ne.push([rw,c]);
    if(ne.length===1 && ne[0][0]===tgt[0] && ne[0][1]===tgt[1]) break; else ne=null;
  }
  if(!ne){ pay=[[[80,80],[45,100]],[[100,45],[55,55]]]; ne=[[1,1]]; }   /* fallback: prisoner's dilemma, both low */
  const [er,ec]=ne[0], lab=(rw,c)=>`X ${rw?'low':'high'}, Y ${c?'low':'high'}`;
  const opts=[lab(0,0),lab(0,1),lab(1,0),lab(1,1),'There is no Nash equilibrium'], ans=er*2+ec;
  const k=v=>'$'+v+'k', xr=c=>`if Y goes ${c?'low':'high'}, X earns ${k(pay[0][c][0])} with high and ${k(pay[1][c][0])} with low, so X picks ${pay[0][c][0]>pay[1][c][0]?'high':'low'}`;
  const yr=rw=>`if X goes ${rw?'low':'high'}, Y earns ${k(pay[rw][0][1])} with high and ${k(pay[rw][1][1])} with low, so Y picks ${pay[rw][0][1]>pay[rw][1][1]?'high':'low'}`;
  return { type:'mc', kind:'mc', keepOrder:true, prompt:`Made-up numbers (profits in thousands). Two gas stations each choose a high or low price. Station X\'s profit is listed first in each cell.${pmatrix({ rowName:'X', colName:'Y', rows:N, cols:N, pay, fmtp:v=>'$'+v+'k' })}Which outcome is the Nash equilibrium?`,
    options:opts, answer:ans,
    explain:`<p>Find each station\'s best reply. For X: ${xr(0)}; ${xr(1)}. For Y: ${yr(0)}; ${yr(1)}.</p><p>The only cell where each station is already making its best reply to the other is <b>${lab(er,ec)}</b> (${k(pay[er][ec][0])} for X, ${k(pay[er][ec][1])} for Y), so that is the Nash equilibrium: neither wants to switch on its own. ${(()=>{ let bt=null; [0,1].forEach(rw=>[0,1].forEach(c=>{ const v=pay[rw][c][0]+pay[rw][c][1]; if(!bt||v>bt.v) bt={rw,c,v}; })); return bt.rw===er&&bt.c===ec ? 'Here the equilibrium also happens to give the highest total profit; that isn\'t always so, as the prisoner\'s dilemma shows (M1).' : `The tempting wrong answer is ${lab(bt.rw,bt.c)}, which gives the highest total profit (${k(bt.v)}), but at least one station would gain by switching from it; a Nash equilibrium doesn\'t have to be the best joint outcome (M1).`; })()}</p>` };
},'mc');
mc('l27-identical','l27','Your course\'s slide says oligopoly firms sell "an identical good." What does your course textbook\'s list of oligopolies suggest?',
  [`Oligopolists may sell identical products (bagged ice) or differentiated ones (cars, Coke and Pepsi)`,`Oligopolists always sell identical products`,`Oligopolists never advertise`,`Oligopolists are always natural monopolies`,`Oligopolists are price takers`],0,
  `<p>The textbook\'s examples include the auto industry, cable television and air travel, and it says a few firms "need not produce differentiated products." It also describes the cost of building a brand like Coke or Pepsi as a barrier. What makes it an oligopoly is a few interdependent firms, not whether the products are identical.</p>`);
mc('l27-many','l27','Your course says that as the number of firms in an oligopoly grows, the outcome moves closer to the competitive outcome. Why?',
  [`With more firms, each worries less about its effect on the others, so cooperation is harder and each has more reason to produce more`,`More firms means higher prices`,`More firms makes a cartel easier to run`,`Each firm\'s costs rise`,`The government steps in`],0,
  `<p>Your course (slide 232): "Larger number of firms – each becomes less concerned about how they impact all other firms. More incentive to act in their own self-interest." Econlib\'s Dick adds that cartels are less likely to last where "numerous small sellers" produce.</p>`);
mc('l27-interdep2','l27','Made-up example. One of two airlines on a route is deciding whether to cut its fare. What should it think about first?',
  [`How the other airline will respond, since its own sales and profit depend on that`,`Only its own costs`,`Only the number of passengers last year`,`The fares charged on other routes`,`Nothing; it is a price taker`],0,
  `<p>In an oligopoly a firm\'s profit "depend[s] on: how much it produces [and] how much all other firms produce" (your course, slide 226). The St. Louis Fed describes airlines that cut fares and saw rivals follow "almost immediately," starting "a new price war" (M4).</p>`);
mc('l27-society','l27','When oligopolists fail to collude and compete instead, what usually happens to buyers?',
  [`They pay lower prices and buy more`,`They pay higher prices`,`Nothing changes`,`They can no longer buy the good`,`They pay the monopoly price`],0,
  `<p>Competition pushes output up and the price down, toward the competitive outcome. Econlib\'s Dixit and Nalebuff: "Collusion to keep prices high, for example, is not in society\'s interest." In the prisoner\'s dilemma the firms lose, but buyers gain.</p>`);

mc('l27-kinked','l27','Your course textbook describes oligopolists who match any rival\'s price cut but not a price increase. Why does this keep prices steady?',
  [`A firm that cuts its price gains few customers and one that raises it loses many, so none wants to change its price`,`It forces every firm to charge marginal cost`,`It makes demand perfectly elastic`,`It lets the government set prices`,`It means firms never cooperate`],0,
  `<p>The textbook\'s kinked demand curve: "if oligopolists always match price cuts by other firms in the cartel, but do not match price increases, then none of the oligopolists will have a strong incentive to change prices." It "can work like a silent form of cooperation."</p>`);
lazy('l27-mx-br','l27',()=>({ type:'mc', kind:'mc',
  prompt:`Made-up numbers (profits in thousands). Firm A\'s profit is listed first.${pmatrix({ rowName:'A', colName:'B', rows:['Advertise','Don\'t'], cols:['Advertise','Don\'t'], pay:AD_PAY, fmtp:v=>'$'+v+'k' })}If Firm A does <b>not</b> advertise, what is Firm B\'s best reply?`,
  options:[`Don\'t advertise, earning $50k instead of $40k`,`Advertise, earning $40k instead of $50k`,`Advertise, because advertising is B\'s dominant strategy`,`Don\'t advertise, earning $60k`,`It makes no difference to B`], answer:0,
  explain:`<p>Look along A\'s "Don\'t" row at B\'s payoffs: $40k if B advertises, $50k if it doesn\'t. So B\'s best reply is not to advertise. Since B\'s best reply to A advertising is to advertise ($30k &gt; $20k), B has no dominant strategy (M5). $60k is A\'s payoff in that box, not B\'s (M2).</p>` }));

/* ===== Lesson 27 quick checks ===== */
mc('l27c-inter','l27','Which market is most likely an oligopoly?',
  [`Large passenger jets, made almost entirely by two companies`,`Wheat grown by thousands of farmers`,`A town\'s only water company`,`Restaurants in a big city`,`Handmade jewelry sold by many crafters online`],0,
  `<p>Two big interdependent firms behind high barriers: Boeing and Airbus. Wheat is perfect competition, water a natural monopoly, restaurants monopolistic competition.</p>`);
mc('l27c-collude','l27','In your course\'s example, cooperating gives Jack and Jill $1,800 each. Why might it not last?',
  [`Each can earn $2,000 by secretly cheating while the other cooperates`,`Cooperating loses money`,`The price would rise above $120`,`The government sets their quantity`,`Water has no demand`],0,
  `<p>Your course: "it is also in their self-interest to try to cheat." The temptation is the extra $200 (M3).</p>`);
mc('l27c-cheat','l27','Jack and Jill agreed on 30 gallons each, but Jack brings 40 while Jill keeps to 30. With the price at $120 minus total gallons, what is Jill\'s profit?',
  [`$1,200`,`$1,500`,`$1,600`,`$1,800`,`$2,000`],1,
  `<p>70 gallons sell at $120 − $70 = $50, so Jill earns 30 × $50 = <b>$1,500</b>, down from $1,800. Jack\'s cheating gains him $200 ($2,000) and costs her $300 (M6).</p>`);
mc('l27c-dom','l27','Made-up numbers. Firm A earns $8 if it charges high and B charges high, $3 if it charges high and B charges low, $10 if it charges low and B charges high, and $5 if both charge low. Does A have a dominant strategy?',
  [`Yes: charging low, since $10 > $8 and $5 > $3`,`Yes: charging high, since $8 is the largest payoff when both charge high`,`No, it depends on B`,`Yes: charging high, since $8 > $5`,`No, because $10 is the largest number`],0,
  `<p>Compare A\'s payoffs one column at a time: B high ($10 low vs $8 high), B low ($5 low vs $3 high). Low wins both times (M2).</p>`);
mc('l27c-nash','l27','At a Nash equilibrium,',
  [`no player can do better by changing only its own choice`,`total payoffs are as large as possible`,`both players cooperate`,`each player gets the same payoff`,`the players have signed an agreement`],0,
  `<p>Each player is making its best reply to what the other is doing. It may not be the best outcome for the group (M1).</p>`);
mc('l27c-repeat','l27','Under a "tit-for-tat" strategy in a repeated game, a player',
  [`cheats only if the rival cheated in the previous round`,`always cheats`,`always cooperates`,`cheats every other round`,`copies whatever gives the highest total payoff`],0,
  `<p>Econlib\'s Dixit and Nalebuff: "you cheat if and only if your rival cheated in the previous round." The threat of punishment can keep cooperation going.</p>`);
mc('l27c-skill','l27','To find a Nash equilibrium in a 2 × 2 payoff matrix, you can',
  [`mark each player\'s best reply to each of the other\'s choices and find a box where both are marked`,`pick the box with the largest total`,`pick the box with the largest single number`,`pick the box where payoffs are equal`,`always pick the bottom-right box`],0,
  `<p>Fix one player\'s choice, find the other\'s best reply, and repeat. A box that is a best reply for both is a Nash equilibrium (M1, M5).</p>`);

/* Course materials checked 2026-10-28: video 5.4 transcript and Module 5 slides 225-234 (Jack and Jill; cooperation 1800 each; one cheats 2000/1500; both cheat 1600; Nash equilibrium definition; N/(N+1); repeated games);
   course textbook §10.2 (cats in a bag; mutual interdependence; why oligopolies exist; collusion, cartels, tacit collusion; Adam Smith; prisoner's dilemma Table 10.2; Table 10.3; lysine; OPEC; kinked demand).
   Cross-checks read: Econlib, Dixit and Nalebuff, "Prisoners' Dilemma"; Econlib, Dick, "Cartels"; St. Louis Fed, Zaretsky, "Cartels: Breaking Up Ain't Hard to Do". */
const L27TAGS = {
  'l27-interdep':['MS5 OS102','ocol','terms','M4'], 'l27-cartel':['OS102 FEDC','ocol','terms',''], 'l27-monopoly':['MS5','ocol','data',''],
  'l27-cheat':['MS5','ocol','data','M6'], 'l27-tf-stable':['ELCA FEDC','ocol','terms','M3'], 'l27-dominant':['OS102 MS5','onash','terms','M2'],
  'l27-mx-dom':['OS102','onash','data','M1 M2'], 'l27-nash':['MS5','onash','terms','M1'], 'l27-mx-nash':['MS5','onash','data','M1 M5'],
  'l27-tf-alldom':['MS5','onash','terms','M5'], 'l27-why-cheat':['OS102 MS5','ogame','models','M1'], 'l27-g-cheat':['MS5','ocol','data','M6'],
  'l27-why-exist':['OS102','ocol','models',''], 'l27-both-cheat':['MS5','ogame','data',''], 'l27-tf-cheatmono':['MS5','ocol','terms','M6'],
  'l27-opec':['OS102 FEDC','ocol','models','M3'], 'l27-collusion-legal':['OS102','ocol','terms',''], 'l27-lysine':['OS102','ocol','models','M3'],
  'l27-repeat':['MS5 ELPD','ogame','models',''], 'l27-pdgame':['OS102','ogame','data','M1'], 'l27-mx-read':['MS5','ogame','data','M2'],
  'l27-g-nash':['MS5 OS102','onash','data','M1'], 'l27-identical':['OS102 MS5','ocol','terms',''], 'l27-many':['MS5 ELCA','ocol','models',''],
  'l27-interdep2':['MS5 FEDC','ocol','models','M4'], 'l27-society':['ELPD','ogame','models',''], 'l27-kinked':['OS102','ogame','models',''], 'l27-mx-br':['MS5','onash','data','M2 M5'],
  'l27c-inter':['OS102','ocol','terms','M4'], 'l27c-collude':['MS5','ocol','models','M3'], 'l27c-cheat':['MS5','ocol','data','M6'], 'l27c-dom':['OS102','onash','data','M2'],
  'l27c-nash':['MS5','onash','terms','M1'], 'l27c-repeat':['ELPD','ogame','terms',''], 'l27c-skill':['MS5','onash','models','M1 M5']
};
u5tag(L27TAGS);

U5_CARDS.l27 = [
  ['Oligopoly','What is an oligopoly?','A market with a few large firms whose choices affect one another (mutual interdependence), behind barriers to entry.','Boeing and Airbus; your course\'s Jack and Jill.','Products may be identical or differentiated.'],
  ['Collusion and cartels','What is the difference between collusion and a cartel?','Collusion is firms acting together to hold down output and raise price; a cartel is a formal agreement to do so.','OPEC; the lysine cartel.','Both are illegal in the U.S.; most U.S. collusion is tacit.'],
  ['Monopoly outcome','What is the best outcome for oligopolists who cooperate?','Act as one monopoly: low output, P > MC, highest joint profit.','Jack and Jill: 60 gallons at $60, $1,800 each.','They must trust each other not to cheat.'],
  ['Why cartels break down','Why are cartels unstable?','Each member gains by producing more than its share while the others hold back.','Jack cheats: $2,000 vs Jill $1,500.','OPEC usually produces above target.'],
  ['Game theory','What is game theory?','The study of decisions where each player\'s payoff depends on what the others choose.','A payoff matrix lists both players\' payoffs for every pair of choices.','Read one column (or row) at a time.'],
  ['Dominant strategy','What is a dominant strategy?','A choice that is best for a player whatever the other player does.','Jack: cheat ($1,600 > $1,500 and $2,000 > $1,800).','Not the same as the biggest number in the matrix.'],
  ['Nash equilibrium','What is a Nash equilibrium?','Each player\'s choice is its best reply to the others\' choices, so no one gains by switching alone.','Jack and Jill: both cheat.','It needn\'t be the best outcome for the group.'],
  ['Prisoner\'s dilemma','What is a prisoner\'s dilemma?','A game where each player\'s dominant strategy leads to an outcome worse for both than cooperating.','Both confess: 5 years each instead of 2.','Oligopoly version: both increase output, $400 each instead of $1,000.'],
  ['No dominant strategy','How do you find a Nash equilibrium when a player has no dominant strategy?','Mark each player\'s best reply to each choice of the other; a box marked for both is a Nash equilibrium.','Advertising game: A always advertises; B\'s best reply is to advertise.','Not every player has a dominant strategy.'],
  ['Both cheat','What happens when both Jack and Jill cheat?','80 gallons sell at $40; each earns $1,600.','Less than cooperating ($1,800) but the Nash equilibrium.','Buyers gain from the lower price.'],
  ['Repeated games','How can repetition support cooperation?','A cheater can be punished in later rounds, for example by tit for tat.','Tit for tat: cheat only if the rival cheated last round.','Cheating must be detectable.'],
  ['More firms','What happens as an oligopoly gets more firms?','Cooperation gets harder and the outcome moves toward the competitive one.','Your course: each firm "less concerned about how they impact all other firms."','With many firms it looks like competition.']
];

Object.assign(U5_WRITE, {
  'w-l27-1':{lesson:'l27',prompt:'Using your course\'s Jack and Jill example, explain why the two firms end up cheating even though cooperating would pay each of them more.',
    model:'If Jack and Jill cooperate and each brings 30 gallons, the 60 gallons sell at $60 and each earns $1,800, the most they can make together. But each can do better by cheating. If Jill cooperates and Jack brings 40 gallons, the price falls to $50 and Jack earns $2,000 while Jill earns $1,500. If Jill cheats too, Jack earns $1,600 by cheating but only $1,500 by cooperating. So whatever Jill does, Jack earns more by cheating: cheating is his dominant strategy, and the same is true for Jill. Both cheat, 80 gallons sell at $40, and each earns $1,600. This is the Nash equilibrium: neither can gain by changing alone. It is a prisoner\'s dilemma, because each acting in its own interest leaves both worse off than cooperating.',
    checklist:['Gives the cooperative outcome (60 gallons, $60, $1,800 each)','Shows cheating pays whatever the other does ($2,000 > $1,800 and $1,600 > $1,500)','Names cheating as a dominant strategy and both cheating as the Nash equilibrium','Explains why this is a prisoner\'s dilemma']},
  'w-l27-2':{lesson:'l27',prompt:'Explain the difference between a dominant strategy and a Nash equilibrium, using this lesson\'s made-up advertising game as an example.',
    model:'A dominant strategy is a choice that is best for a player whatever the other player does. A Nash equilibrium is an outcome where each player\'s choice is its best reply to the other\'s choice, so neither can gain by switching alone. In the advertising game, Firm A earns more by advertising whether Firm B advertises ($50 thousand against $40 thousand) or not ($70 thousand against $60 thousand), so advertising is A\'s dominant strategy. Firm B has no dominant strategy: it should advertise if A advertises, but not if A doesn\'t. Since B can expect A to advertise, B\'s best reply is to advertise too. At (Advertise, Advertise) neither firm wants to switch, so it is the Nash equilibrium. A game can have a Nash equilibrium even when a player has no dominant strategy.',
    checklist:['Defines a dominant strategy (best whatever the other does)','Defines a Nash equilibrium (each choice a best reply; no gain from switching alone)','Shows A\'s dominant strategy and that B has none','Finds the Nash equilibrium (both advertise) using best replies']}
});

U5_PLAN.l27 = {
  core:['l27-interdep','l27-cartel','l27-monopoly','l27-cheat','l27-tf-stable','l27-dominant','l27-mx-dom','l27-nash','l27-mx-nash','l27-tf-alldom','l27-why-cheat','l27-g-cheat'],
  more:['l27-why-exist','l27-both-cheat','l27-tf-cheatmono','l27-opec','l27-collusion-legal','l27-lysine','l27-repeat','l27-pdgame','l27-mx-read','l27-g-nash','l27-identical','l27-many','l27-interdep2','l27-society','l27-kinked','l27-mx-br']
};

U5_LESSONS.push({ id:'l27', unit:5, title:'Oligopoly and Game Theory', mins:50, src:'Modern States video 5.4 and Module 5 slides 225-234 · Course textbook (OpenStax) §10.2',
  sources:['MS5','OS102','ELPD','ELCA','FEDC','CB'],
  oneline:'An oligopoly has a few interdependent firms. Together they could earn monopoly profits, but each is tempted to cheat, so cartels tend to break down. Game theory, with payoff matrices, dominant strategies and the Nash equilibrium, predicts what they will do.',
  body:`
<p>Lessons 25 and 26 had one seller. Add a second or third and something new appears: each firm\'s profit now depends on what the others do. Your course: oligopoly "has slightly more competition than a ${dt('monopoly','monopoly')} but slightly less competition than ${dt('perfect-competition','perfect competition')}."</p>

<h2>A few firms that watch each other</h2>
<!-- src: MS5 (slide 226: "Few sellers ... Because few sellers, the production choices of one firm will affect the outcomes of all other firms in the market. Firms must act strategically because profits now depend on: How much it produces; How much all other firms produce; Tension between cooperation and self-interest"); OS102 ("Oligopoly arises when a small number of large firms have all or most of the sales in an industry"; auto industry, cable television, air travel; cats in a bag; "mutual interdependence"; why oligopolies exist: patents to three firms, economies of scale (Boeing-Airbus), brand building (Coke, Pepsi); "they need not produce differentiated products"). Source problem recorded: the course says "in a monopoly market structure ... few number of firm" (means oligopoly) and "selling an identical good"; the textbook's examples include differentiated products. -->
<p>An ${dt('oligopoly','<b>oligopoly</b>')} is a market where "a small number of large firms have all or most of the sales" (your course textbook): cars, airlines, cable TV, passenger jets. The defining feature is ${dt('interdependence','<b>interdependence</b>')}. Your course: "the production choices of one firm will affect the outcomes of all other firms," so firms "must act strategically."</p>
<p><b>Why only a few firms?</b> The textbook gives three reasons: patents held by a few firms; ${dt('economies-of-scale','economies of scale')} so large that the market has room for only two or three (Boeing and Airbus); and the cost of building a brand to rival Coke or Pepsi. (Your course\'s slide says the firms sell "an identical good"; the textbook\'s examples show they can sell identical or differentiated products.)</p>
${FIG5.l27cats()}
<div data-check="l27c-inter"></div>

<h2>Collusion and cartels: Jack and Jill</h2>
<!-- src: MS5 (video 5.4: Jack and Jill "own the only water that is available in town"; MC = 0 so total revenue = profit; "the highest possible ... profit is going to be at a point where they produce 60 units of water and they charge sixty dollars per unit"; 30 each, $1,800 each; slides 227-229: "Collude to set prices or quantities produced to reach the point of highest possible profits. Cartels: groups of firms that act together and collude"); OS102 (collusion; "A group of firms that have a formal agreement to collude to produce the monopoly output and sell at the monopoly price is called a cartel"; illegal in the U.S.; tacit collusion; Adam Smith quote; lysine cartel; OPEC "not legally enforceable"); FEDC ("Cartels are, essentially, multifirm monopolies"; OPEC "actual production levels have almost always been greater than its target levels"); ELCA ("The same profit motive that entices sellers to want to collude also creates strong and sometimes uncontrollable temptations to 'cheat'") -->
<p>Firms that act together to hold down output and raise the price are practicing ${dt('collusion','<b>collusion</b>')}. A formal agreement to do it is a ${dt('cartel','<b>cartel</b>')}: "essentially, multifirm monopolies" (St. Louis Fed). Collusion is illegal in the United States, so most of it is "tacit," an unspoken understanding.</p>
<p><b>Worked example: your course\'s Jack and Jill.</b> They own the only water in town. ${dt('marginal-cost','Marginal cost')} is $0, so revenue is profit.</p>
${FIG5.l27tbl()}
<div class="math">Cooperate: 30 + 30 = 60 gallons → price $60 → each earns 30 × $60 = <b>$1,800</b> (total $3,600, the monopoly outcome)</div>
<p>Check: $3,600 is the largest number in the revenue column. Any extra water lowers the joint total.</p>
<p>Real cartels show the same pull. Your course textbook: the lysine cartel of the 1990s doubled the price of lysine until FBI tapes caught it. OPEC countries agree to limit oil output, but such agreements are "not legally enforceable."</p>
<div data-check="l27c-collude"></div>

<h2>The temptation to cheat</h2>
<!-- src: MS5 (video 5.4: "what happens if one of them cheats ... produce ten more gallons ... the price is going to be fifty dollars ... for the cheater ... profits have risen from 1800 to 2000 ... for the person that has chosen to cooperate ... profits have fallen"; "if they both produce more ... 80 gallons ... forty dollars ... sixteen hundred dollars"; slides 229-230); OS102 ("each individual oligopoly faces a private temptation to produce just a slightly higher quantity and earn slightly higher profit—while still counting on the other oligopolists to hold down their production"); FEDC (OPEC; airline fare war). Source problem recorded: the course says firms "cheat so to reach the monopoly outcome"; cheating moves output above the monopoly level. -->
<p>Your course: "it is also in their self-interest to try to cheat." Suppose Jack quietly brings 40 gallons.</p>
<div class="math">Jack cheats: 40 + 30 = 70 gallons → price $50 → Jack 40 × $50 = <b>$2,000</b>; Jill 30 × $50 = <b>$1,500</b><br>Both cheat: 40 + 40 = 80 gallons → price $40 → each 40 × $40 = <b>$1,600</b></div>
${FIG5.l27bars()}
<p><b>Why cheating spreads:</b> the cheater gains $200, but the other firm loses $300. Knowing that, neither can trust the other, and both end at $1,600. Cheating moves the market away from the monopoly outcome, toward lower prices and more output. Try it below.</p>
<div data-widget="duopoly"></div>
<p>What to notice: whatever Jill picks, Jack\'s profit is highest at 40 gallons. The same holds for Jill, so both land on 40.</p>
<div data-check="l27c-cheat"></div>

<h2>Game theory: payoff matrices and dominant strategies</h2>
<!-- src: MS5 (video 5.4: "game theory tells us that each agent is going to be basing their decisions on the strategic outcomes of what could possibly be happening based on the other decisions of what other players are doing"; slide 233 matrix; "Regardless of what the other person does – best to cheat!"); OS102 (game theory "analyzes situations in which players must make decisions and then receive payoffs based on what other players decide to do"; prisoner's dilemma Table 10.2; dominant strategy "the strategy an individual (or firm) will pursue regardless of the other individual's (or firm's) decision"; Table 10.3: both firms' dominant strategy is to increase output, $400 each vs $1,000); ELPD ("confession is the dominant strategy"; Coke and Pepsi: "cheating is each firm's dominant strategy") -->
<p>${dt('game-theory','<b>Game theory</b>')} studies choices where each player\'s payoff depends on what the others choose. A ${dt('payoff-matrix','<b>payoff matrix</b>')} lists both players\' payoffs for every pair of choices.</p>
<p class="small muted">Order note: your course\'s slides name the Nash equilibrium for Jack and Jill (slide 231) before drawing their payoff matrix (slide 233). This lesson draws the matrix first, so the equilibrium in the next section can be read straight off it.</p>
${FIG5.l27mx()}
<p><b>How to read it:</b> fix Jill\'s choice and compare Jack\'s payoffs in that column. Jill cheats: Jack gets $1,600 cheating, $1,500 cooperating. Jill cooperates: $2,000 cheating, $1,800 cooperating. Cheating wins both times, so it is Jack\'s ${dt('dominant-strategy','<b>dominant strategy</b>')}: best "regardless of the other individual\'s ... decision" (your course textbook).</p>
<p>This is a ${dt('prisoners-dilemma','<b>prisoner\'s dilemma</b>')}, named for your course textbook\'s story of two suspects questioned separately:</p>
${FIG5.l27pd()}
<p><b>Why it is a dilemma:</b> each player\'s own best move leaves both worse off. Your course: cooperating is collectively best "but individually irrational – because potential to make even more by cheating!" The textbook\'s ${dt('duopoly','duopoly')} (a two-firm oligopoly) works the same way: holding down output pays $1,000 each, but both increase output and earn $400.</p>
<div data-check="l27c-dom"></div>

<h2>Nash equilibrium</h2>
<!-- src: MS5 (slide 231: "Agents that interact with one another will choose their optimal strategy given the strategies that all other agents have chosen ... Nash Equilibrium: Both Cheat. Can't do any better regardless of what the other person does"); CB (outline 5c: dominant strategies and Nash equilibrium). Inserted material: the best-reply method for a game where only one player has a dominant strategy (made-up advertising game). -->
<p>Your course: in a ${dt('nash-equilibrium','<b>Nash equilibrium</b>')}, players "choose their optimal strategy given the strategies that all other agents have chosen." In other words, no one can do better by changing only their own choice. For Jack and Jill, it is both cheating.</p>
<div class="analogy"><div class="eyebrow">Analogy</div><p>Picture a concert crowd. If everyone sits, everyone sees fine. If you stand, you see better, so you stand; then the people behind you stand too. Soon everyone is standing and no one sees better than when all were sitting. Standing is the Nash equilibrium: given what everyone else is doing, no one gains by sitting down alone, even though all sitting would be better for everyone.</p></div>
<p><b>When only one player has a dominant strategy.</b> The CLEP can also show games where a player\'s best choice depends on the other\'s. Then mark best replies: for each choice of one player, underline the other\'s best payoff. A box underlined for both players is a Nash equilibrium.</p>
${FIG5.l27ad()}
<p><b>Worked example (made-up numbers, thousands of dollars).</b></p>
<div class="math">A\'s best reply: to B Advertise → Advertise ($50 &gt; $40); to B Don\'t → Advertise ($70 &gt; $60)<br>B\'s best reply: to A Advertise → Advertise ($30 &gt; $20); to A Don\'t → Don\'t ($50 &gt; $40)<br>Both marked only at (Advertise, Advertise) → Nash equilibrium: A $50k, B $30k</div>
<p>Check: at (Don\'t, Don\'t), the largest total ($110k), A would switch to Advertise and earn $70k, so it isn\'t an equilibrium.</p>
<div data-widget="nash"></div>
<p>What to notice: the Nash equilibrium is where both players are already making their best reply, which is often not where the total is largest.</p>
<div data-check="l27c-nash"></div>

<h2>When cooperation can last</h2>
<!-- src: MS5 (slide 234: "Cooperation is possible in repetitive games when the rules don't change"; slide 232: as the number of firms grows, "more incentive to act in their own self-interest"); ELPD ("The most common path to cooperation arises from repetitions of the game"; tit for tat; "Punishment will not work unless cheating can be detected and punished"); OS102 (kinked demand: match price cuts, not increases; "Many real-world oligopolies ... go through episodes of cooperation and competition"); ELCA (cartels less likely to last with numerous small sellers, low-cost entry, complex products) -->
<p>Your course: "Cooperation is possible in repetitive games when the rules don\'t change." If the firms meet again and again, a cheater can be punished later. Econlib\'s Dixit and Nalebuff describe "tit for tat": "you cheat if and only if your rival cheated in the previous round." That only works if cheating can be seen.</p>
<p>Cooperation gets harder as firms are added. Your course: with more firms, "each becomes less concerned about how they impact all other firms," and the result moves toward the competitive outcome. Econlib\'s Dick adds that cartels rarely last where entry is cheap or many small sellers produce.</p>
<div data-check="l27c-repeat"></div>

<h2>Find the equilibrium in a matrix</h2>
<!-- src: MS5; OS102. Exam skill: read a 2 × 2 payoff matrix one column (row) at a time, find dominant strategies, then find the Nash equilibrium by best replies. -->
<p>The CLEP gives a 2 × 2 matrix and asks for a dominant strategy or the Nash equilibrium. The routine:</p>
<div class="math">1. Fix the column player\'s choice; circle the row player\'s higher payoff. Repeat for the other column.<br>2. Fix the row player\'s choice; circle the column player\'s higher payoff. Repeat for the other row.<br>3. Same choice circled both times → dominant strategy. Box circled for both players → Nash equilibrium.</div>
<p>Compare a player\'s own payoffs only, never one player\'s number against the other\'s.</p>
<div data-check="l27c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L27TAGS mis). -->
<div class="mistakes"><p class="eyebrow">Watch out for these</p><ul>
<li><span class="wrong">"The Nash equilibrium is the box with the highest total payoff."</span>It is where each player\'s choice is a best reply. In a prisoner\'s dilemma it is worse for both than cooperating.</li>
<li><span class="wrong">"A dominant strategy is the choice with the biggest payoff in the matrix."</span>It is the choice that wins in every column (or row), whatever the other player does.</li>
<li><span class="wrong">"Cartels are stable because every member gains from the deal."</span>Each member gains even more by cheating, so cartels tend to break down.</li>
<li><span class="wrong">"An oligopolist can pick its output without thinking about rivals."</span>Its profit depends on what the others produce: interdependence.</li>
<li><span class="wrong">"Every player always has a dominant strategy."</span>Often one player\'s best choice depends on the other\'s; use best replies to find the Nash equilibrium.</li>
<li><span class="wrong">"Cheating on a cartel moves the market toward the monopoly outcome."</span>The deal is the monopoly outcome; cheating raises output and lowers the price, away from it.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>An <b>oligopoly</b> has a few large, <b>interdependent</b> firms behind ${dt('barriers-to-entry','barriers to entry')}.</li>
<li>Cooperating (<b>collusion</b>, or a formal <b>cartel</b>) gives the monopoly outcome: Jack and Jill 60 gallons at $60, $1,800 each.</li>
<li>Each firm is tempted to <b>cheat</b>: Jack $2,000 vs Jill $1,500; if both cheat, $1,600 each. Cartels like OPEC tend to break down.</li>
<li>A <b>dominant strategy</b> is best whatever the other player does; in a <b>prisoner\'s dilemma</b>, both players\' dominant strategies leave them worse off.</li>
<li>A <b>Nash equilibrium</b> is where each player\'s choice is its best reply to the other\'s; find it by marking best replies.</li>
<li><b>Repeated games</b> (tit for tat) can sustain cooperation; more firms make it harder.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Interdependence, collusion and cartels," "Game theory and strategic behavior (including payoff matrix)" and "Dominant strategies and Nash equilibrium." Expect a 2 × 2 payoff matrix asking for a dominant strategy or the Nash equilibrium, or a question on why cartels break down.</p>
</div>`,
  deeper:`
<h3>Your course\'s N ÷ (N + 1) rule</h3>
<p>Your course (slide 232) says the oligopoly outcome is N ÷ (N + 1) times the competitive outcome, where N is the number of firms. The competitive outcome is where price equals marginal cost: here $0, so 120 gallons. With 2 firms, 2/3 × 120 = 80 gallons, which matches both cheating. (The video calls the competitive outcome "90 units at a price of thirty" where "marginal revenue is equal to marginal cost"; with MC = $0 the competitive quantity is 120, and MR = MC is the monopoly point at 60. 90 gallons is what the formula gives for 3 firms: 3/4 × 120.) As N grows, N ÷ (N + 1) approaches 1 and the market approaches the competitive outcome.</p>
<h3>The kinked demand curve</h3>
<p>Your course textbook describes rivals who match any price cut but not a price increase. A firm that cuts its price gains few customers; one that raises it loses many. So no one wants to change the price, a quiet way of keeping a cartel\'s deal without a contract.</p>`,
  links:[ {k:'Textbook',t:'10.2 Oligopoly',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/10-2-oligopoly',w:'Collusion, cartels, the prisoner\'s dilemma and the kinked demand curve.'},
          {k:'Article',t:'Prisoners\' Dilemma',s:'Econlib, Concise Encyclopedia of Economics (Dixit and Nalebuff)',u:'https://www.econlib.org/library/Enc/PrisonersDilemma.html',w:'Why rivals like Coke and Pepsi fall into price wars, and how repeated play and tit for tat can keep cooperation going.'} ]
});
