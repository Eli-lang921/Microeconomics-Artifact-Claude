/* ===== Lesson 35 figures ===== */
/* Your course's grid (Module 7.2 slide "Types of Goods in the Economy"): rows Excludable yes/no, columns Rival in consumption yes/no. */
const GRID = { pr:['yes','yes','Private goods','Ice-cream cones, clothing'], cl:['yes','no','Club goods','Movie theaters, cable TV'], cm:['no','yes','Common resources','Fish in the ocean, the environment'], pu:['no','no','Public goods','National defense, knowledge'] };
/* Your course textbook's free-rider game (§13.3, Table 13.4): each contribution costs the contributor $4 and creates $6 of benefit, split equally between the two people. */
const PG_C = 4, PG_B = 6;

/* A 2 × 2 grid picture: rows Excludable (yes, no), columns Rival (yes, no). cells: keys of GRID to shade; labels: show names in the cells. Neutral for answer choices when labels=false. */
function u7grid(cells=[], { labels=false, aria='Grid', w=150 }={}){
  const x0=48, y0=30, cw=48, ch=40, pos = { pr:[0,0], cl:[1,0], cm:[0,1], pu:[1,1] };
  let s = `<svg class="u6m" viewBox="0 0 ${w} 124" role="img" aria-label="${esc(aria)}">`;
  s += `<text x="${x0+cw}" y="10" text-anchor="middle" class="lbl" style="font-size:9px">Rival?</text><text x="${x0+cw/2}" y="${y0-6}" text-anchor="middle" class="lbl" style="font-size:9px">Yes</text><text x="${x0+cw*1.5}" y="${y0-6}" text-anchor="middle" class="lbl" style="font-size:9px">No</text>`;
  s += `<text x="10" y="${y0+ch}" text-anchor="middle" class="lbl" style="font-size:9px" transform="rotate(-90 10 ${y0+ch})">Excludable?</text><text x="${x0-4}" y="${y0+ch/2+3}" text-anchor="end" class="lbl" style="font-size:9px">Yes</text><text x="${x0-4}" y="${y0+ch*1.5+3}" text-anchor="end" class="lbl" style="font-size:9px">No</text>`;
  Object.entries(pos).forEach(([k,[c,r]]) => { const on = cells.includes(k);
    s += `<rect x="${x0+c*cw}" y="${y0+r*ch}" width="${cw}" height="${ch}" fill="${on?'var(--g2)':'none'}" fill-opacity="${on?0.45:0}" stroke="var(--ink)" stroke-width="1.2"/>`;
    if(labels) s += `<text x="${x0+c*cw+cw/2}" y="${y0+r*ch+ch/2+3}" text-anchor="middle" class="lbl-ink" style="font-size:8.5px">${GRID[k][2].replace(' goods','').replace(' resources',' res.')}</text>`; });
  return s + '</svg>';
}
const GDESC = { pr:'the cell for excludable and rival', cl:'the cell for excludable and not rival', cm:'the cell for not excludable and rival', pu:'the cell for not excludable and not rival', two:'both cells in the not-excludable row' };
const gridChoice = (k, ok) => ({ svg: L => u7grid(k==='two' ? ['cm','pu'] : [k], { aria:'Graph ' + L }), desc: GDESC[k], ok: !!ok });

/* L35 V1: the two questions (video 7.2; textbook §13.3 pizza vs national defense) */
FIG7.l35two = () => fig(`<div class="u3pair">
  <div class="u3card"><p class="u3h">Excludable?</p><p>Can a person be <b>stopped</b> from using it, usually by charging a price?</p><p><b>Yes:</b> Larry buys a slice of pizza and can keep Lorna from eating it.</p><p><b>No:</b> national defense protects you whether or not you pay.</p></div>
  <div class="u3card"><p class="u3h">Rival in consumption?</p><p>Does one person\'s use <b>leave less</b> for others?</p><p><b>Yes:</b> if Max eats the pizza, Michelle can\'t.</p><p><b>No:</b> Max being defended doesn\'t reduce Michelle\'s defense.</p></div></div>`,
  'Your course\'s two definitions with your textbook\'s examples. Keep them apart: excludable is about whether you can keep people out; rival is about whether using it uses it up.');

/* L35 V2: the four types (course grid) */
FIG7.l35grid = () => fig(atable(['','Rival: yes','Rival: no'], [
  ['<b>Excludable: yes</b>', `<b>${GRID.pr[2]}</b><br>${GRID.pr[3]}<br><span class="small">Markets provide these well</span>`, `<b>${GRID.cl[2]}</b><br>${GRID.cl[3]}<br><span class="small">Sold with a ticket or subscription</span>`],
  ['<b>Excludable: no</b>', `<b>${GRID.cm[2]}</b><br>${GRID.cm[3]}<br><span class="small">Overused</span>`, `<b>${GRID.pu[2]}</b><br>${GRID.pu[3]}<br><span class="small">Underprovided by markets</span>`]
], { cls:'u7t compact wrap', hl:{1:{1:'u3z1',2:'u3z2'}} }), 'Your course\'s grid of the four types of goods, with its examples. The bottom row is where markets fail: no one can be kept out, so no one can be charged. Common resources get overused; public goods get underprovided.');

/* L35 V3: why no firm paves Main Street (video 7.2 and slide "Provision of Public Goods") */
FIG7.l35main = () => fig(flow([
  'Paving Main Street would help <b>every</b> business along it.',
  {split:[[{t:'<b>Can\'t exclude:</b> anyone can drive on it, so no one can be charged.',c:'u3up'}],[{t:'<b>Not rival:</b> one more car doesn\'t use up the road for the others.',c:'u3up'}]]},
  'Each business hopes the others will pay: the <b>free-rider problem</b>.',
  {t:'"Will a firm pay? NO!" The government steps in and pays with taxes.',c:'u3end'}
]), 'Your course\'s Main Street example, step by step. The road is worth more than it costs to the businesses together, but no single one can collect from the others, so it doesn\'t get built privately.');

/* L35 V4: the free-rider game (textbook Table 13.4), annotated */
FIG7.l35pd = () => fig(atable(['','Samuel contributes','Samuel doesn\'t'], [
  ['<b>Rachel contributes</b>','Each pays $4, gets $6<br><b>Rachel +$2, Samuel +$2</b>','Rachel pays $4, gets $3: <b>−$1</b><br>Samuel pays $0, gets $3: <b>+$3</b>'],
  ['<b>Rachel doesn\'t</b>','Rachel pays $0, gets $3: <b>+$3</b><br>Samuel pays $4, gets $3: <b>−$1</b>','Nothing built<br><b>$0 each</b>']
], { cls:'u7t compact wrap', hl:{0:{1:'u3z1'},1:{2:'u3z2'}} }), 'Your course textbook\'s fire-department game. Each contribution costs $4 and creates $6 of benefit, split between the two. Whatever the other does, not contributing pays $1 more ($3 vs $2, or $0 vs −$1), so both free ride and end at $0 instead of +$2 each.');

/* L35 V5: worth building, but no one buys it alone (made-up streetlight) */
FIG7.l35sum = () => fig(`<div class="u2row"><div class="u2cell">${hbars([['One household\'s value',40],['Cost of the streetlight',1500,'var(--bad)'],['All 50 households\' value',2000,'var(--accent)']], { max:2200, left:170, fmt:v=>'$'+v.toLocaleString('en-US') })}</div></div>
  <div class="math">Total value = 50 households × $40 = <b>$2,000</b> > cost $1,500 → worth building<br>But each household gets only $40 of it, far below $1,500 → no one buys it alone</div>`,
  'Made-up numbers. A public good is worth providing when everyone\'s values added together exceed its cost. The market fails because each person compares only his own small share with the whole cost, and hopes others will pay.');

/* L35 V6: the tragedy of the commons as a chain (video 7.2 pond; textbook queen conch; Lesson 4) */
FIG7.l35commons = () => fig(flow([
  'Anyone can fish in the pond: <b>not excludable</b>.',
  'Every fish caught is one fewer for others: <b>rival</b>.',
  'Each fisher keeps the whole catch but shares the cost of fewer fish with everyone.',
  {t:'Everyone fishes more than is best for the group: the pond is <b>overused</b> (the tragedy of the commons).',c:'u3end'}
]), 'Your course\'s pond and your textbook\'s Caribbean queen conch follow the same chain. Lesson 4 put numbers on it: a fisher kept a $5 gain but paid only $0.80 of the $8 cost.');

/* L35 V7: ways to manage a common resource (video 7.2; textbook §13.3) */
FIG7.l35rules = () => fig(atable(['Tool','Source','How it limits use'], [
  ['Limit the quantity taken (harvest limits)','Course and textbook','Caps the total catch directly'],
  ['Voucher system / fishing licenses','Course; textbook','Only license holders may fish'],
  ['Timing (shorter seasons)','Course; textbook','Fewer days to fish'],
  ['Ban until the population recovers','Textbook (queen conch)','Stops use when stocks are critically low']
], { cls:'u7t compact wrap' }), 'The tools your course and textbook name. Each makes the resource partly excludable or caps how much is taken. Your course adds that economists have not found a perfect solution yet.');

/* ===== Lesson 35: Public Goods, Common Resources and the Free-Rider Problem (video 7.2; Module 7.2 slides) =====
   Common mistakes: M1 a public good is anything government provides · M2 mixing up excludable and rival
   M3 common resources are public goods · M4 charging a price stops free riders of a public good · M5 club goods are public goods because many share them
   M6 if no firm provides it, people must not value it */
mc('l35-exc-def','l35','A good is called "excludable" if',
  [`A person can be prevented from using it`,`One person\'s use leaves less for others`,`It is provided by the government`,`It has no market price`,`Its use harms bystanders`],0,
  `<p>Your course: "Excludability tells us whether or not a person can be stopped from consuming the good." Usually that means charging a price. "Leaves less for others" is the definition of <b>rival</b>, the other property (M2).</p>`);
mc('l35-rival-def','l35','Which of the following goods is <b>not</b> rival in consumption?',
  [`A radio broadcast`,`A slice of pizza`,`A pair of shoes`,`A gallon of gasoline`,`A seat on a fully booked flight`],0,
  `<p>Rival means one person\'s use leaves less for others. One more listener doesn\'t reduce what anyone else hears, so a broadcast is not rival. Your textbook: radio is "nonrivalrous, since one person listening to the signal does not prevent others from listening as well." The others are used up by the person who has them.</p>`);
mc('l35-grid','l35','Fish in the ocean are rival in consumption but not excludable. Which type of good are they?',
  [`A common resource`,`A public good`,`A private good`,`A club good`,`A natural monopoly`],0,
  `<p>Rival and not excludable is a common resource, your course\'s own example. A public good is <b>not</b> rival (M3); a private good is excludable; a club good is excludable but not rival.</p>${fig(u7grid(['cm'], { labels:true, aria:'Grid with the common resources cell shaded' }), 'Marked up: the not-excludable, rival cell.')}`);
lazy('l35-gr-grid','l35',()=>visMC({
  prompt:`Each grid sorts goods by two questions: rows ask whether the good is excludable, and columns ask whether it is rival in consumption. Which shaded cell holds <b>public goods</b>?`,
  choices:[ gridChoice('pu',true), gridChoice('cm'), gridChoice('cl'), gridChoice('pr'), gridChoice('two') ],
  explain: L => `<p><b>Graph ${L}</b>: public goods are not excludable and not rival, the bottom-right cell.</p>${fig(u7grid(['pu'], { labels:true, aria:'Grid with the public goods cell shaded' }), 'Marked up: the not-excludable, not-rival cell.')}<p>The bottom-left cell (not excludable but rival) is common resources (M3). The top-right (excludable, not rival) is club goods (M5).</p>`
}));
mc('l35-pub-ex','l35','Which of the following is the best example of a public good?',
  [`National defense`,`A movie shown in a theater`,`Fish in a lake that anyone can use`,`An ice-cream cone`,`Cable TV`],0,
  `<p>National defense is not excludable (it "cannot protect everyone else and exclude you," the textbook) and not rival (Max\'s protection doesn\'t reduce Michelle\'s). The theater and cable TV are excludable club goods (M5); lake fish are a common resource (M3).</p>`);
mc('l35-free-def','l35','Which of the following describes the free-rider problem?',
  [`People who receive the benefit of a good can avoid paying for it, so each has an incentive to let others pay`,`Firms charge too much for goods that are free to produce`,`Riders on public transit don\'t pay their fares because of a ticket shortage`,`People overuse a resource because it is rival`,`A good harms people who don\'t use it`],0,
  `<p>Your course: a free rider is "a person who receives the benefit of a good but avoids paying for it." Because everyone can benefit without paying, everyone hopes someone else will pay, and too little gets paid for. Overuse of a rival resource is the commons problem, a different failure.</p>`);
mc('l35-mainst','l35','Paving the main street in a town would help every business on it. Anyone can drive on the street, and one more car doesn\'t use it up for others. Why won\'t any single business pay to pave it?',
  [`It can\'t charge the others who use the road, so it would bear the whole cost while everyone benefits`,`The road isn\'t worth its cost to the businesses`,`A road is a public good, so the law requires government to build it`,`The road is rival, so it would get used up`,`Each business could charge drivers a toll to cover its cost`],0,
  `<p>Your course: "no single firm would be willing to pay the cost of paving that road: because everyone else will be driving on that road, they can\'t charge people for driving on that road to recoup the costs." The road may well be worth its cost to all of them together (M6). No law forbids a private road (M1), and the street can\'t charge tolls because anyone can drive on it (M4).</p>`);
mc('l35-pd','l35',`Two neighbors, Rachel and Samuel, can each contribute to a local fire department. A contribution costs the contributor $4 and creates $6 of benefit, split equally between the two of them. The table shows each person\'s net gain:${atable(['','Samuel: yes','Samuel: no'], [['Rachel: yes','R +$2, S +$2','R −$1, S +$3'],['Rachel: no','R +$3, S −$1','R $0, S $0']], { cls:'u7t compact' })}If each person acts only in his or her own interest, what happens?`,
  [`Neither contributes, so each gets $0`,`Both contribute, so each gets +$2`,`Only Rachel contributes`,`Only Samuel contributes`,`They take turns contributing`],0,
  `<p>Whatever Samuel does, Rachel does better not contributing: +$3 instead of +$2 if he contributes, $0 instead of −$1 if he doesn\'t. Samuel reasons the same way. Your textbook: "When both people reason in that way, the public good never gets built." Both would be better off contributing (+$2 each), which is the dilemma.</p>${FIG7.l35pd()}`);
gen('l35-g-sum','l35',()=>{
  let N, v, C; do { N = pick([20,40,50,80,100,200]); v = pick([10,15,20,25,40,50]); C = pick([500,800,1000,1500,2000,3000]); } while(N*v <= C || v >= C);
  const ans = N*v - C;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. A town of <b>${N}</b> households could put up a fireworks show that anyone nearby can watch for free. Each household values the show at <b>$${v}</b>. The show costs <b>$${C.toLocaleString('en-US')}</b>. By how many dollars does the total value to the town exceed the cost?`, answer:ans,
    explain:`<div class="math">Total value = ${N} × $${v} = $${(N*v).toLocaleString('en-US')}<br>$${(N*v).toLocaleString('en-US')} − $${C.toLocaleString('en-US')} = <b>$${ans.toLocaleString('en-US')}</b></div><p>So the show is worth putting on. Yet no household would pay $${C.toLocaleString('en-US')} alone for a show worth $${v} to it, and since watching can\'t be stopped, each hopes others pay. The common slip is comparing one household\'s $${v} with the cost and concluding the show isn\'t worth it (M6).</p>${fig(`<div class="u2row"><div class="u2cell">${hbars([['One household\'s value',v],['Cost of the show',C,'var(--bad)'],[`All ${N} households`,N*v,'var(--accent)']], { max:Math.max(N*v,C)*1.1, left:170, fmt:x=>'$'+x.toLocaleString('en-US') })}</div></div>`, 'Marked up with these numbers: the added-up value beats the cost, but one household\'s value is tiny next to it.')}`
  };
});
mc('l35-provide','l35','Which approach best overcomes the free-rider problem in paying for a public good?',
  [`Find a way to make sure everyone contributes, such as taxes agreed through the political process`,`Charge each user a price at the door`,`Let each person decide privately whether to pay`,`Make the good rival so it can be sold`,`Stop providing public goods`],0,
  `<p>The textbook: "The key insight in paying for public goods is to find a way of assuring that everyone will make a contribution and to prevent free riders." Taxes do this "by requiring, through the law, that everyone contributes." Charging at the door doesn\'t work for a non-excludable good (M4).</p>`);
mc('l35-commons','l35','Why do common resources, such as fish in a lake open to everyone, tend to be overused?',
  [`Each user keeps the full benefit of what he takes but shares the cost of the smaller stock with everyone`,`They are not rival, so using them costs nothing`,`The government sets their price too high`,`Users are charged too much to use them`,`They are excludable, so only a few people use them`],0,
  `<p>A common resource is rival but not excludable. Each fisher keeps his whole catch, while the cost of fewer fish is spread over all. So each takes more than is best for the group. Your textbook: "no one individual has an incentive to protect that resource." Saying it is not rival confuses it with a public good (M3).</p>${FIG7.l35commons()}`);
tf('l35-tf-gov','l35','Every good that the government pays for with taxes is a public good in the economic sense.',false,
  `<p>False. Your textbook: economists\' definition of a public good "does not necessarily include all goods financed through taxes." A public good must be non-excludable and non-rival. Government also pays for some goods that are excludable or rival (M1).</p>`);
mc('l35-club','l35','Movie theaters and cable TV are examples of which type of good?',
  [`Club goods: excludable but not rival`,`Public goods: neither excludable nor rival`,`Common resources: rival but not excludable`,`Private goods: excludable and rival`,`Public goods, because many people share them`],0,
  `<p>Your course: goods "not rival in consumption but that are excludable are considered club goods." You can be kept out without a ticket or subscription, but one more viewer doesn\'t reduce what others see (up to capacity). Being shared doesn\'t make a good public (M5).</p>`);
mc('l35-conch','l35','Anyone with a small boat can dive for a shellfish in shallow Caribbean waters, and it is being overharvested. Which policies do economists typically suggest?',
  [`Fishing licenses, harvest limits and shorter fishing seasons`,`A subsidy for each conch caught`,`Removing all rules so the market sets the catch`,`A price ceiling on conch meat`,`Making conch a public good`],0,
  `<p>The textbook: "economists typically advocate simple devices like fishing licenses, harvest limits, and shorter fishing seasons," and governments have even "banned the harvest" when populations got critically low. A subsidy per catch would make overharvesting worse.</p>`);
/* L35 more */
tf('l35-tf-common-pub','l35','A common resource such as fish in the ocean is a public good, because no one can be kept from using it.',false,
  `<p>False. Public goods are non-excludable <b>and</b> non-rival. Fish are rival: a fish one person catches can\'t be caught by another. That makes them a common resource, which gets overused rather than underprovided (M3).</p>`);
mc('l35-radio','l35','Anyone with a radio can hear a conventional radio broadcast. How do commercial radio stations pay for their broadcasts?',
  [`By selling advertising`,`By charging each listener per song`,`By jamming the signal for nonpayers`,`By requiring a government license fee from listeners`,`They don\'t; radio is never provided privately`],0,
  `<p>The textbook: "Radio has found a way to collect revenue by selling advertising, which is an indirect way of \'charging\' listeners." It adds that satellite radio uses subscriptions, which makes it excludable.</p>`);
mc('l35-satellite','l35','A satellite radio company lets only paying subscribers hear its stations. Each extra subscriber doesn\'t reduce what others hear. Which type of good is satellite radio?',
  [`A club good`,`A public good`,`A common resource`,`A private good`,`A negative externality`],0,
  `<p>Nonsubscribers are kept out, so it is excludable; one more listener doesn\'t use it up, so it is not rival. That is a club good. Your textbook makes the same point: with a subscription "the product is excludable" (M5).</p>`);
mc('l35-private','l35','Ice-cream cones and clothing are examples of which type of good?',
  [`Private goods`,`Club goods`,`Public goods`,`Common resources`,`Positive externalities`],0,
  `<p>Your course: a good that is "rival in consumption and ... also excludable" is a private good. You can be charged for a cone, and once you eat it no one else can.</p>`);
mc('l35-knowledge','l35','Knowledge is often given as an example of a public good. Which pair of facts explains why?',
  [`One person using an idea doesn\'t leave less of it for others, and it is hard to stop people from using it`,`Knowledge is always provided by the government`,`Knowledge is rival but not excludable`,`Knowledge is excludable but not rival`,`Knowledge is a club good shared by many people`],0,
  `<p>Public goods are non-rival and non-excludable. Two people can use the same idea without using it up, and once an idea is out it is hard to keep others from it. Your textbook notes patents try to make new inventions excludable for a while.</p>`);
mc('l35-fireworks','l35','Economist Tyler Cowen (Econlib) says a fireworks show "may go unproduced, even if demand for the show is strong." Why?',
  [`People can watch from their windows or backyards, so the producer can\'t charge for it`,`Fireworks are rival, so they get used up`,`Fireworks are a negative externality`,`Too few people enjoy fireworks`,`The government bans private fireworks`],0,
  `<p>Cowen: "If an entrepreneur stages a fireworks show, for example, people can watch the show from their windows or backyards. Because the entrepreneur cannot charge a fee for consumption, the fireworks show may go unproduced." Strong demand doesn\'t help if no one can be made to pay (M6).</p>`);
gen('l35-g-pd','l35',()=>{
  let c, b; do { c = pick([3,4,5,6,8,10]); b = pick([6,8,10,12,14,16,18]); } while(!(b > c && b/2 < c) || b%2);
  const half = b/2, ans = half - c;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. Two neighbors can each contribute to a shared park. A contribution costs the contributor <b>$${c}</b> and creates <b>$${b}</b> of benefit, split equally between the two. If only one neighbor contributes, what is that neighbor\'s net gain? (Use a minus sign for a loss.)`, answer:ans,
    explain:`<div class="math">Benefit to the contributor = $${b} ÷ 2 = $${half}<br>Net gain = $${half} − $${c} = <b>${ans<0?'−$'+(-ans):'$'+ans}</b></div><p>The other neighbor gets $${half} for nothing. Since contributing alone loses money, each waits for the other: the free-rider problem. Yet if both contribute, each gains $${b} − $${c} = $${b-c}. The common slip is counting the whole $${b} as the contributor\'s benefit.</p>${fig(atable(['','Other contributes','Other doesn\'t'], [['You contribute',`+$${b-c}`,`${ans<0?'−$'+(-ans):'+$'+ans}`],['You don\'t',`+$${half}`,'$0']], { cls:'u7t compact', hl:{0:{2:'u3z2'}} }), 'Marked up: your payoff in each case. Not contributing beats contributing whatever the other does.')}`
  };
});
mc('l35-police','l35','Why do fire and police protection for a neighborhood work much like public goods?',
  [`Protecting some homes from fire and burglary necessarily protects the others too`,`Police and fire departments are paid for with taxes`,`Fire and police services are rival`,`Only some homes want protection`,`They can easily charge each home separately`],0,
  `<p>The textbook: "it would not be easy to provide fire and police service so that some people in a neighborhood would be protected ... while others would not be protected at all. Protecting some necessarily means protecting others, too." The reason is non-excludability, not how it is paid for (M1).</p>`);
mc('l35-park','l35','A city park is free to use, but the city charges for parking, reserved picnic areas and food. This shows that',
  [`Public goods can be provided with a mix of free public use and fees for the excludable parts`,`Parks are private goods`,`Charging fees always solves the free-rider problem`,`The park is a common resource`,`The government must charge for everything it provides`],0,
  `<p>The textbook: "Some public goods will also have a mixture of public provision at no charge along with fees for some purposes." The parts that can be fenced off (a parking space, a picnic table) can be charged for; the open park can\'t (M4).</p>`);
mc('l35-pos-ext','l35','How are public goods related to positive externalities?',
  [`Public goods have positive externalities, but not every good with positive externalities is a public good`,`They are the same thing`,`Public goods have negative externalities`,`Goods with positive externalities are always public goods`,`They are unrelated`],0,
  `<p>The textbook: "Public goods have positive externalities, like police protection or public health funding. Not all goods and services with positive externalities, however, are public goods. Investments in education have huge positive spillovers but can be provided by a private company."</p>`);
mc('l35-patent','l35','Patents can be seen as an attempt to turn new inventions into private goods. What does a patent change about an invention?',
  [`It makes the invention excludable for a time, since others need permission to use it`,`It makes the invention non-excludable, so anyone may copy it`,`It makes the invention a common resource`,`It removes the invention\'s value`,`It turns the invention into a public good`],0,
  `<p>The textbook: patents try to make new inventions "into private goods, which are excludable and rivalrous, so that no one but the inventor is allowed to use them during the length of the patent." The legal right supplies the excludability the idea lacks. (The textbook also calls patented inventions rivalrous, because only the holder may use them; the idea itself can still be used by many at once.)</p>`);
gen('l35-g-commons','l35',()=>{
  let N, k, g; do { N = pick([4,5,8,10]); k = N*pick([1,2,3]); g = pick([2,3,4,5,6,8]); } while(!(g > k/N && g < k));
  const ans = k/N;
  return { type:'num', kind:'num', unit:'dollars', prompt:`Made-up numbers. ${N} fishers share a lake that no one owns. One more day of fishing earns a fisher <b>$${g}</b> of fish. It also leaves fewer fish for later, a cost of <b>$${k}</b> in total, shared equally by all ${N} fishers. How many dollars of that cost does the fisher who fishes the extra day bear himself?`, answer:ans,
    explain:`<div class="math">His share = $${k} ÷ ${N} = <b>$${fmt(ans)}</b></div><p>He gains $${g} and bears only $${fmt(ans)}, so he fishes the extra day, even though the day costs the group $${k}, more than the $${g} it earns. Every fisher reasons the same way, so the lake is overfished: the tragedy of the commons. The common slip is answering the whole $${k}, the cost to the group.</p>${FIG7.l35commons()}`
  };
});
mc('l35-hardin','l35','Who gave the overuse of common resources the name "Tragedy of the Commons," in a 1968 article?',
  [`Ecologist Garrett Hardin`,`Economist Ronald Coase`,`Economist Milton Friedman`,`Economist Adam Smith`,`Economist Arthur Pigou`],0,
  `<p>The textbook: "ecologist Garret Hardin put the tag \'Tragedy of the Commons\' to the problem in a 1968 article in the magazine Science." (The textbook spells it "Garret"; Econlib spells it "Garrett.") Coase is the property-rights economist from Lesson 34.</p>`);
mc('l35-social','l35','Besides taxes, which of the following can reduce free riding on a local public good?',
  [`Social pressure and personal appeals, such as neighborhood associations and fundraising drives`,`Charging each person a price to use the good`,`Making everyone use the good less`,`Making the good rival`,`Raising the price of the good`],0,
  `<p>The textbook: "social pressures and personal appeals can be used, rather than the force of law, to reduce the number of free riders," such as neighborhood patrols, farmers\' irrigation projects and fundraising for charities and colleges.</p>`);
tf('l35-tf-value','l35','If no private firm is willing to provide a good, that proves people don\'t value it enough to cover its cost.',false,
  `<p>False. A public good can be worth far more than it costs to everyone together, yet no firm can collect payment because people can\'t be excluded. The market fails because of free riding, not because the good lacks value (M6).</p>`);
mc('l35-environment','l35','Clean air and clean water are often grouped with fish in the ocean as the same type of good. Why?',
  [`It is hard to keep anyone from using clean air and water, and one person\'s pollution leaves less clean air and water for others`,`It is provided by the government`,`It can be fenced off and sold`,`One person\'s use never affects anyone else`,`It is a club good shared by members`],0,
  `<p>Clean air and water are not excludable, and they are rival: pollution by one user leaves less for everyone else. That is a common resource, which is why it tends to be overused, the same logic as Lesson 33\'s negative externality (M3).</p>`);
/* ===== Lesson 35 quick checks ===== */
mc('l35c-exc','l35','Made-up scenario. A fenced swimming pool lets in only members who pay a fee. The pool is',
  [`Excludable`,`Not excludable`,`A public good`,`A common resource`,`A negative externality`],0,
  `<p>Nonmembers can be kept out, so it is excludable. Whether it is rival depends on how crowded it gets; excludability is about the fence and the fee (M2).</p>`);
mc('l35c-grid','l35','Made-up scenario, new to this lesson. Free public Wi-Fi in a city square, fast enough that extra users don\'t slow it down, open to anyone without a password. Which type of good is it?',
  [`A public good`,`A club good`,`A common resource`,`A private good`,`A natural monopoly`],0,
  `<p>No password means it isn\'t excludable; extra users don\'t slow it, so it isn\'t rival. Not excludable and not rival is a public good. If it got slower with each user, it would be a common resource (M3).</p>`);
mc('l35c-free','l35','Made-up scenario. A neighborhood asks each family to chip in for a private security patrol that will protect every house on the street. Some families refuse but still enjoy the protection. Those families are',
  [`Free riders`,`Club members`,`Monopolists`,`Paying customers`,`Victims of a negative externality`],0,
  `<p>They benefit without paying: free riders. Because the patrol protects every house, the families who refuse can\'t be excluded (M4).</p>`);
mc('l35c-provide','l35','Made-up numbers. 100 households each value a new park at $30. The park costs $2,500. Which statement is true?',
  [`The park is worth building, but no single household would pay for it alone`,`The park is not worth building, because $30 is less than $2,500`,`Each household should pay $2,500`,`The park should be built only if one household pays for it`,`The park is a private good`],0,
  `<p>Total value = 100 × $30 = $3,000, more than the $2,500 cost, so it is worth building. But each household compares its own $30 with the cost and hopes others pay (M6).</p>`);
mc('l35c-commons','l35','Anyone can fish in a local pond, and the more one person fishes, the fewer fish remain for others. Which of the following is a way to regulate this?',
  [`Regulating the quantity fished, a voucher system, or the timing of fishing`,`Subsidizing each fish caught`,`Removing all limits`,`Making fishing licenses free and unlimited`,`Taxing people who don\'t fish`],0,
  `<p>Slide "Regulating Common Resources": "Regulating quantity fished/used; Voucher system; Time of fishing." Your course adds that none has proved a perfect solution.</p>`);
lazy('l35c-skill','l35',()=>visMC({
  prompt:`Each grid sorts goods by two questions: rows ask whether the good is excludable, and columns ask whether it is rival in consumption. Which shaded cell holds goods that tend to be <b>overused</b>?`,
  choices:[ gridChoice('cm',true), gridChoice('pu'), gridChoice('pr'), gridChoice('cl'), gridChoice('two') ],
  explain: L => `<p><b>Graph ${L}</b>: common resources (not excludable, rival) get overused, because no one can be kept out and each use leaves less for others.</p>${fig(u7grid(['cm'], { labels:true, aria:'Grid with the common resources cell shaded' }), 'Marked up: the common resources cell.')}<p>Public goods (bottom right) are underprovided, not overused, because using them takes nothing from others.</p>`
}));

/* Course materials checked 2026-11-19: video 7.2 transcript (excludability and rivalry definitions; four groups; private goods (ice cream, clothing); club goods (movie theaters, cable TV);
   common resources; public goods (national defense, knowledge); free rider definition; Main Street paving; pond fishing; "voucher systems or timing of the fishing or regulating the quantity";
   "none have provided the perfect solution yet"), Module 7.2 slides (grid; Provision of Public Goods; Common Resources; Regulating Common Resources; Key Takeaways);
   course textbook §13.3 (definition "does not necessarily include all goods financed through taxes"; pizza and national defense; police and fire; public goods and positive externalities; patents;
   free rider; Rachel and Samuel, Table 13.4; key insight; radio advertising, satellite subscriptions; park fees; social pressure; queen conch; Hardin 1968; licenses, harvest limits, seasons);
   Econlib, Cowen ("nonexcludability"; fireworks; national defense); Lesson 4 lake numbers ($5 gain, $0.80 of $8). CLEP outline (Public goods and private goods). */
const L35TAGS = {
  'l35-exc-def':['MS7 OS133','exc','terms','M2'], 'l35-rival-def':['MS7 OS133','exc','terms','M2'], 'l35-grid':['MS7','exc','terms','M3'], 'l35-gr-grid':['MS7','exc','graphs','M3 M5'],
  'l35-pub-ex':['MS7 OS133','exc','terms','M3 M5'], 'l35-free-def':['MS7 ELPG','exc','terms',''], 'l35-mainst':['MS7','prov','models','M6'], 'l35-pd':['OS133','exc','data',''],
  'l35-g-sum':['ELPG MS7','prov','data','M6'], 'l35-provide':['OS133','prov','terms','M4'], 'l35-commons':['MS7 OS133 ELC','exc','models','M3'], 'l35-tf-gov':['OS133','exc','terms','M1'],
  'l35-club':['MS7','exc','terms','M5'], 'l35-conch':['OS133','prov','terms',''],
  'l35-tf-common-pub':['MS7 OS133','exc','terms','M3'], 'l35-radio':['OS133','prov','terms',''], 'l35-satellite':['OS133 MS7','exc','models','M5'], 'l35-private':['MS7','exc','terms',''],
  'l35-knowledge':['MS7 OS133','exc','terms',''], 'l35-fireworks':['ELPG','prov','models','M6'], 'l35-g-pd':['OS133','exc','data',''], 'l35-police':['OS133','exc','terms','M1'],
  'l35-park':['OS133','prov','terms','M4'], 'l35-pos-ext':['OS133','exc','terms',''], 'l35-patent':['OS133','exc','terms',''], 'l35-g-commons':['ELC OS133','exc','data','M3'],
  'l35-hardin':['OS133 ELC','exc','terms',''], 'l35-social':['OS133','prov','terms',''], 'l35-tf-value':['ELPG MS7','prov','terms','M6'], 'l35-environment':['MS7','exc','models','M3'],
  'l35c-exc':['MS7','exc','models','M2'], 'l35c-grid':['MS7 OS133','exc','models','M3'], 'l35c-free':['MS7 OS133','exc','models','M4'], 'l35c-provide':['ELPG','prov','data','M6'],
  'l35c-commons':['MS7','prov','terms',''], 'l35c-skill':['MS7 OS133','exc','graphs','M3']
};
u7tag(L35TAGS);

U7_CARDS.l35 = [
  ['Excludable','What does "excludable" mean?','A person can be prevented from using the good, usually by charging a price.','A pizza you bought; a fenced pool with a fee.','Excludable is about keeping people out, not about using it up.', FIG7.l35two()],
  ['Rival in consumption','What does "rival in consumption" mean?','One person\'s use leaves less for others.','A slice of pizza is rival; a radio broadcast is not.','Rival is about using it up, not about keeping people out.', FIG7.l35two()],
  ['Private good','What is a private good? Give two examples.','Excludable and rival.','Ice-cream cones, clothing.','Markets provide these well.', u7grid(['pr'],{labels:true,aria:'Grid with private goods shaded'})],
  ['Club good','What is a club good? Give two examples.','Excludable but not rival.','Movie theaters, cable TV.','Shared use doesn\'t make it public: nonpayers can be kept out.', u7grid(['cl'],{labels:true,aria:'Grid with club goods shaded'})],
  ['Common resource','What is a common resource? Give two examples.','Rival but not excludable. It tends to be overused.','Fish in the ocean, the environment.','Not a public good: it gets used up.', u7grid(['cm'],{labels:true,aria:'Grid with common resources shaded'})],
  ['Public good','What is a public good? Give two examples.','Neither excludable nor rival. Markets provide too little or none.','National defense, knowledge.','Not every tax-funded good is a public good.', u7grid(['pu'],{labels:true,aria:'Grid with public goods shaded'})],
  ['Four types of goods','How do the two questions sort goods into four types?','Excludable and rival: private. Excludable, not rival: club. Rival, not excludable: common resource. Neither: public good.','Pizza, cable TV, ocean fish, national defense.','Learn the grid; most questions are one cell.', FIG7.l35grid()],
  ['Free-rider problem','What is the free-rider problem?','People who benefit without paying have an incentive to let others pay, so too little is paid for.','Families who refuse to chip in for a street patrol still get protected.','Charging a price can\'t fix it when nonpayers can\'t be excluded.', FIG7.l35main()],
  ['Free riding as a prisoner\'s dilemma','Why does neither neighbor contribute in your textbook\'s fire-department game?','Each contribution costs $4 but returns only $3 to the contributor, so not contributing is better whatever the other does.','Both contributing would give each +$2; both free riding gives $0.','Self-interest leads both to the worse outcome.', FIG7.l35pd()],
  ['Provision of public goods','How are public goods usually provided?','By government, paid for with taxes, which makes everyone contribute. Sometimes by advertising or social pressure.','National defense; Main Street paving; radio funded by ads.','A public good is worth providing when everyone\'s values added up exceed its cost.', FIG7.l35sum()],
  ['Tragedy of the commons','Why are common resources overused?','Each user keeps the full gain from taking more but shares the cost of the smaller stock with everyone.','Lesson 4: a fisher keeps $5 but bears $0.80 of an $8 cost.','The fix is limiting use, not a subsidy.', FIG7.l35commons()],
  ['Managing common resources','What tools limit overuse of a common resource?','Quantity limits, vouchers or licenses, shorter seasons, and bans when stocks are critically low.','Queen conch: licenses, harvest limits, shorter seasons.','Your course: none is a perfect solution yet.', FIG7.l35rules()]
];

Object.assign(U7_WRITE, {
  'w-l35-1':{lesson:'l35',prompt:'Paving the main street in a town would help every business on it; anyone can drive on it, and one more car doesn\'t use it up. Using this example, explain what makes a good a public good and why private firms won\'t provide it. Name the problem and say how government solves it.',
    model:'A public good is non-excludable, meaning people can\'t be stopped from using it, and non-rival, meaning one person\'s use doesn\'t leave less for anyone else. A paved main street fits: anyone can drive on it, and one more car doesn\'t use it up. Paving would help every business on the street, so it may well be worth more to them together than it costs. But no single business will pay, because it can\'t charge the others who use the road, so it would bear the whole cost while everyone shares the benefit. Each business hopes someone else will pay: the free-rider problem. The government solves it by paying with taxes, which require everyone to contribute, so the road gets built.',
    checklist:['Defines a public good as non-excludable and non-rival','Applies both properties to the paved street','Explains the free-rider problem: each hopes others pay because nonpayers can\'t be excluded','Says government provides it and pays with taxes so that everyone contributes']},
  'w-l35-2':{lesson:'l35',prompt:'Compare a public good with a common resource. Both are non-excludable, so why does one get underprovided and the other overused? Use national defense and fish in the ocean as your examples.',
    model:'Both national defense (a public good) and fish in the ocean (a common resource) are non-excludable: no one can be kept from benefiting. The difference is rivalry. National defense is non-rival: protecting one more person doesn\'t reduce anyone else\'s protection. Because no one can be charged, people free ride and private firms supply too little or none, so the problem is underprovision. Fish are rival: every fish one person catches is one fewer for everyone else. Each fisher keeps the whole catch but shares the cost of the smaller stock, so everyone takes too much, and the problem is overuse. That is why public goods call for government provision, while common resources call for limits on use, such as quantity limits, licenses or shorter seasons.',
    checklist:['Says both are non-excludable','Identifies rivalry as the difference (public good non-rival, common resource rival)','Explains underprovision of the public good through free riding','Explains overuse of the common resource, and names a fitting policy for each']}
});

U7_PLAN.l35 = {
  core:['l35-exc-def','l35-rival-def','l35-grid','l35-gr-grid','l35-pub-ex','l35-free-def','l35-mainst','l35-pd','l35-g-sum','l35-provide','l35-commons','l35-tf-gov','l35-club','l35-conch'],
  more:['l35-tf-common-pub','l35-radio','l35-satellite','l35-private','l35-knowledge','l35-fireworks','l35-g-pd','l35-police','l35-park','l35-pos-ext','l35-patent','l35-g-commons','l35-hardin','l35-social','l35-tf-value','l35-environment']
};

U7_LESSONS.push({ id:'l35', unit:7, title:'Public Goods, Common Resources and the Free-Rider Problem', mins:35, src:'Modern States video 7.2 and the Module 7.2 slides · Course textbook (OpenStax) §13.3',
  sources:['MS7','OS133','CB','ELPG','ELC'],
  oneline:'Two questions sort every good: can people be kept out, and does one person\'s use leave less for others? When no one can be kept out, markets fail: public goods get too little private funding and common resources get overused.',
  body:`
<p>Lessons 33 and 34 looked at spillovers from goods that markets do sell. This lesson looks at goods markets struggle to sell at all. It builds on Lesson 4\'s overfished lake (the ${dt('commons','tragedy of the commons')}) and Lesson 27\'s ${dt('prisoners-dilemma','prisoner\'s dilemma')}, which turns out to be the free-rider problem in disguise.</p>

<h2>Two questions about any good</h2>
<!-- src: MS7 (video 7.2: "Excludability tells us whether or not a person can be stopped from consuming the good. Rival in consumption tells us whether or not one person's consumption of the good decreases the ability of someone else to also enjoy and consume that good"; slide "Types of Goods": "Excludable: A person can be prevented from using the good · Rival in Consumption: One person's use of the good diminishes other people's use of the good"); OS133 (Larry and Lorna's pizza; national defense "cannot protect everyone else and exclude you"; Max and Michelle; ELPG ("'Nonexcludability' means that the cost of keeping nonpayers from enjoying the benefits of the good or service is prohibitive"). -->
<p>Your course sorts goods with two questions. A good is ${dt('excludable','<b>excludable</b>')} if "a person can be prevented from using the good," usually by charging a price. It is ${dt('rival','<b>rival in consumption</b>')} if "one person\'s use of the good diminishes other people\'s use of the good."</p>
${FIG7.l35two()}
<p><b>Why these two matter:</b> a seller needs both to run a business easily. Excludability lets it charge; rivalry means each buyer needs his own unit. Remove excludability and the seller can\'t collect. Econlib\'s Tyler Cowen: non-excludable means "the cost of keeping nonpayers from enjoying the benefits ... is prohibitive."</p>
<div data-check="l35c-exc"></div>

<h2>Four types of goods</h2>
<!-- src: MS7 (video 7.2: four groups; "private goods ... ice cream cones or clothing"; "club goods ... movie theaters or cable TV"; "common resource"; "public goods ... national defense, knowledge"; slide grid with examples: fish in the ocean, the environment). OS133 (radio is "nonexcludable" and "nonrivalrous"; satellite radio subscriptions are excludable). -->
<p>Answering both questions sorts goods into your course\'s four groups.</p>
${FIG7.l35grid()}
<div class="math">${dt('private-good','Private good')}: excludable, rival (ice-cream cone)<br>${dt('club-good','Club good')}: excludable, not rival (cable TV)<br>${dt('common-resource','Common resource')}: not excludable, rival (fish in the ocean)<br>${dt('public-goods','Public good')}: not excludable, not rival (national defense)</div>
<p><b>Worked example:</b> radio. Once a signal is broadcast, anyone with a radio can hear it (not excludable), and one more listener takes nothing from others (not rival): a public good, your textbook says. Satellite radio can be heard only with a paid subscription, so it becomes excludable: a club good. Same music, different cell, because only excludability changed.</p>
<p><b>So what:</b> the bottom row is where markets fail. The rest of this lesson takes its two cells one at a time.</p>
<div data-check="l35c-grid"></div>

<h2>Public goods and the free-rider problem</h2>
<!-- src: MS7 (video 7.2: "because we cannot charge a price for them no firm would be willing to provide public goods into the market"; "the free rider problem where a person who receives the benefit of a good but avoids paying for it"; Main Street: "no single firm would be willing to pay the cost of paving that road"; slide "Provision of Public Goods": "Therefore à will a firm pay? NO!"); OS133 (definition "does not necessarily include all goods financed through taxes"; police and fire; free rider and prisoner's dilemma: Rachel and Samuel, $4 cost, $6 social benefit, Table 13.4; "When both people reason in that way, the public good never gets built"); ELPG (fireworks; "Each person will seek to 'free ride' by allowing others to pay for the show"). -->
<p>A ${dt('public-goods','<b>public good</b>')} is non-excludable and non-rival. Your course: "because we cannot charge a price for them no firm would be willing to provide public goods into the market." The textbook adds a warning: the economic definition "does not necessarily include all goods financed through taxes."</p>
<p>The obstacle is the ${dt('free-rider','<b>free-rider problem</b>')}. Your course defines a free rider as "a person who receives the benefit of a good but avoids paying for it." Its example is paving Main Street.</p>
${FIG7.l35main()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Think of an office birthday cake that goes around with an envelope for contributions. Everyone gets a slice whether or not they chip in, so each person is tempted to put in a little less and let others cover it. If everyone thinks that way, the envelope comes back short and next year there is no cake. A public good is that envelope on a national scale.</p></div>
<p><b>Worked example: your course textbook\'s fire department.</b> Rachel and Samuel can each contribute. A contribution costs the giver $4 and creates $6 of benefit, split evenly.</p>
${FIG7.l35pd()}
<div class="math">If Samuel contributes: Rachel gets +$2 by contributing, +$3 by not → don\'t<br>If Samuel doesn\'t: Rachel gets −$1 by contributing, $0 by not → don\'t<br>Samuel reasons the same way → <b>nobody contributes; each gets $0</b></div>
<p>Check: both contributing (+$2 each) beats both free riding ($0 each), yet self-interest leads away from it. This is Lesson 27\'s prisoner\'s dilemma. The textbook: "When both people reason in that way, the public good never gets built."</p>
<div data-check="l35c-free"></div>

<p><b>Two related ideas.</b> Your textbook: "Public goods have positive externalities," like police protection, but not every good with positive externalities is a public good: education has big spillovers yet "can be provided by a private company." And a patent is an attempt to turn a new idea into a private good: the law makes it excludable, since no one but the inventor may use it while the patent lasts.</p>

<h2>Provision of public goods</h2>
<!-- src: MS7 (video 7.2: "the government needs to step in to provide these goods ... It will be left up to the government to ensure that the right infrastructure is in place, that the roads are paved, that national defense is provided"; slide "Due to this market failure à need the government to step in to provide public goods"); OS133 ("The key insight in paying for public goods is to find a way of assuring that everyone will make a contribution and to prevent free riders ... agree to pay taxes ... requiring, through the law, that everyone contributes"; radio advertising; satellite subscriptions; park fees; social pressure); ELPG ("almost all economists are convinced that the only way to provide a sufficient level of defense is to have government do it and fund defense with taxes"; fireworks "may go unproduced, even if demand for the show is strong"). Streetlight numbers are made up. -->
<p>Your course: "the government needs to step in to provide these goods." The textbook names the trick: "find a way of assuring that everyone will make a contribution and to prevent free riders," which taxes do "by requiring, through the law, that everyone contributes." On defense, Econlib\'s Cowen reports that "almost all economists" agree government must provide it.</p>
<p><b>How to tell if a public good is worth providing:</b> add up what it is worth to everyone, then compare with its cost. Because it is non-rival, every person enjoys the same unit, so values add.</p>
${FIG7.l35sum()}
<p>Check: the streetlight passes the test ($2,000 > $1,500), yet a market would not build it, because no buyer\'s own $40 comes close to $1,500. That gap is the market failure.</p>
<p>Play with the numbers below.</p>
<div data-widget="pgcalc"></div>
<p>What to notice: the total can be far above the cost while every single household\'s value stays far below it. Only when one person values it more than the whole cost does someone buy it alone.</p>
<p><b>Not always government:</b> the textbook lists radio paid for by advertising, parks that are free but charge for parking and picnic sites, and social pressure (neighborhood patrols, fundraising drives). Each finds some way to collect from users who could otherwise free ride.</p>
<div data-check="l35c-provide"></div>

<h2>Common resources and the tragedy of the commons</h2>
<!-- src: MS7 (video 7.2: "These goods are not excludable but they are rival in consumption ... The perfect example of this is fishing in a pond ... Economists have struggled with understanding the perfect way to regulate common resources. Many have argued for systems such as voucher systems or timing of the fishing or regulating the quantity ... but none have provided the perfect solution yet"; slides "Common Resources" and "Regulating Common Resources"); OS133 (queen conch; "common resources like the conch tend to be overharvested"; Hardin 1968 "Tragedy of the Commons"; "Economists view this as a problem of property rights"; licenses, harvest limits, shorter seasons; bans); ELC (Hardin, Econlib); Lesson 4 ($5 gain, $0.80 of an $8 cost). -->
<p>A ${dt('common-resource','<b>common resource</b>')} is rival but not excludable. Ecologist Garrett Hardin named its problem the "Tragedy of the Commons" in a 1968 article in the magazine <i>Science</i> (your textbook spells it "Garret"). Your course\'s example is a pond: "There\'s a limited amount of fish in the pond and if everyone came and fished ... the more that they fished the less fish are available for everyone else."</p>
${FIG7.l35commons()}
<p><b>Why overuse, not underprovision:</b> a public good is non-rival, so free use costs no one anything; the trouble is paying for it. A common resource is rival, so each use takes something from others. Each user keeps the whole gain but shares the loss, so everyone takes too much. The textbook: "Economists view this as a problem of property rights": since nobody owns it, nobody protects it.</p>
<p>Your course admits "none have provided the perfect solution yet," but lists the tools.</p>
${FIG7.l35rules()}
<p><b>So what:</b> for a common resource, the remedy limits use (quantity, licenses, seasons); for a public good, the remedy pays for provision (taxes). Matching the remedy to the cell is a common exam move.</p>
<div data-check="l35c-commons"></div>

<h2>Which kind of good is it?</h2>
<!-- src: MS7 (grid and examples), OS133. Exam skill: answer the two questions in order, then name the cell and its typical market failure. -->
<p>CLEP questions here usually describe a good and ask its type, or ask why a market fails to provide it. Answer the two questions in order: (1) Can nonpayers be kept out? (2) Does one person\'s use leave less for others? Then name the cell, and remember its failure: public goods are underprovided; common resources are overused.</p>
<div data-widget="goodsort"></div>
<p>What to notice: "provided by government" and "shared by many" never decided the answer. Only the two questions did.</p>
<div data-check="l35c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L35TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"A public good is anything the government provides."</span>A public good is defined by being non-excludable and non-rival, not by who pays. Some tax-funded goods are neither.</li>
<li><span class="wrong">"Excludable and rival mean the same thing."</span>Excludable: can people be kept out? Rival: does use leave less for others? A cable channel is excludable but not rival.</li>
<li><span class="wrong">"Common resources are public goods, because anyone can use them."</span>Common resources are rival, so they get used up and overused. Public goods are non-rival.</li>
<li><span class="wrong">"Charging a price would stop free riders."</span>Not for a non-excludable good: there is no way to stop nonpayers, which is why taxes or other tricks are needed.</li>
<li><span class="wrong">"A movie theater is a public good because many people share it."</span>Nonpayers can be kept out, so it is a club good. Sharing isn\'t the test; excludability is.</li>
<li><span class="wrong">"If no firm will provide it, people must not value it."</span>A public good can be worth much more than it costs to everyone together; free riding stops anyone from collecting.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>A good is <b>excludable</b> if people can be prevented from using it and <b>rival</b> if one person\'s use leaves less for others.</li>
<li>The two questions give four types: <b>private goods</b> (ice cream), <b>club goods</b> (cable TV), <b>common resources</b> (ocean fish) and <b>public goods</b> (national defense).</li>
<li>Public goods face the <b>free-rider problem</b>: people benefit without paying, so no firm will pay to pave Main Street, and in the textbook\'s game neither neighbor contributes.</li>
<li>Government <b>provides public goods</b> with taxes, which make everyone contribute; a public good is worth providing when everyone\'s values added together exceed its cost.</li>
<li><b>Common resources</b> are overused (the tragedy of the commons) and are managed with quantity limits, licenses or vouchers, and shorter seasons.</li>
<li>On the exam, answer the two questions, name the cell and its failure.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Excludability, rivalry, and free-rider problem" and "Provision of public goods" under Public goods and private goods (Market Failure and the Role of Government, 8% to 14% of the exam). Expect a question that asks which good is a public good, or why private markets underprovide one, with answers built from excludability, rivalry and free riding.</p>
</div>`,
  deeper:`
<h3>Are lighthouses public goods?</h3>
<p>Lighthouses are a classic textbook example of a public good: every passing ship sees the light. Economists have argued about whether private lighthouses once collected fees at nearby ports, which would make them partly excludable. Treat a lighthouse as a public good unless a question says otherwise.</p>
<h3>Congestion</h3>
<p>Many goods are non-rival only up to a point. A road is non-rival at 3 a.m. but rival at rush hour, when each extra car slows the rest (Lesson 33\'s traffic externality). Club goods have the same limit: a theater stops being non-rival when the seats are full.</p>
<h3>Elinor Ostrom</h3>
<p>Political economist Elinor Ostrom (Nobel Prize, 2009) studied communities that manage shared fisheries, forests and pastures well through their own rules, without either private ownership or central government control. Her work is an extension beyond your course: it shows why no single solution fits every commons.</p>`,
  links:[ {k:'Textbook',t:'13.3 Public Goods',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/13-3-public-goods',w:'The newer edition of your course textbook\'s §13.3: public goods, the free-rider game and common resources. Wording may differ slightly from your 2016 edition.'},
          {k:'Article',t:'Public Goods',s:'Econlib, Concise Encyclopedia of Economics (Tyler Cowen)',u:'https://www.econlib.org/library/Enc/PublicGoods.html',w:'A short overview of non-excludability, non-rivalry and the free-rider problem, with the fireworks example.'} ]
});

u7xv({
  'l35-exc-def':[FIG7.l35two(), ''], 'l35-rival-def':[FIG7.l35two(), ''], 'l35c-exc':[FIG7.l35two(), ''],
  'l35-pub-ex':[FIG7.l35grid(), ''], 'l35-club':[FIG7.l35grid(), ''], 'l35-satellite':[FIG7.l35grid(), ''], 'l35-private':[FIG7.l35grid(), ''], 'l35-knowledge':[FIG7.l35grid(), ''], 'l35-tf-common-pub':[FIG7.l35grid(), ''], 'l35c-grid':[FIG7.l35grid(), ''],
  'l35-free-def':[FIG7.l35main(), ''], 'l35-mainst':[FIG7.l35main(), 'The road being "rival" is wrong: one more car doesn\'t use it up, which is part of why it is a public good.'], 'l35c-free':[FIG7.l35main(), ''],
  'l35-provide':[FIG7.l35sum(), ''], 'l35c-provide':[fig(`<div class="u2row"><div class="u2cell">${hbars([['One household\'s value',30],['Cost of the park',2500,'var(--bad)'],['All 100 households',3000,'var(--accent)']], { max:3300, left:170, fmt:v=>'$'+v.toLocaleString('en-US') })}</div></div>`, 'Marked up: $3,000 of total value beats the $2,500 cost; one household\'s $30 doesn\'t.'), ''],
  'l35-tf-value':[FIG7.l35sum(), ''], 'l35-fireworks':[FIG7.l35sum(), ''], 'l35-conch':[FIG7.l35rules(), ''], 'l35c-commons':[FIG7.l35rules(), ''], 'l35-hardin':[FIG7.l35commons(), ''],
  'l35-tf-gov':[FIG7.l35grid(), ''], 'l35-environment':[fig(u7grid(['cm'], { labels:true, aria:'Grid with common resources shaded' }), 'Marked up: clean air and water sit with ocean fish in the common-resource cell.'), ''], 'l35-radio':[fig(u7grid(['pu','cl'], { labels:true, aria:'Grid: public goods and club goods shaded' }), 'Marked up: broadcast radio is a public good; a subscription would move it to the club-good cell.'), ''], 'l35-police':[FIG7.l35main(), '']
});
u7cv('l35', {});
