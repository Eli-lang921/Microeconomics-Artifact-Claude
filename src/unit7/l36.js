/* ===== Lesson 36 figures ===== */
/* Your course textbook's windshield-repair market (§11.1, Table 11.1): one firm 16%, one 10%, one 8%, seven at 6%, eight at 3% (18 firms, 100%).
   Four-firm ratio = 16 + 10 + 8 + 6 = 40; HHI = 16² + 10² + 8² + 7(6²) + 8(3²) = 256 + 100 + 64 + 252 + 72 = 744. If the top two merge: CR4 = 26 + 8 + 6 + 6 = 46; HHI = 676 + 64 + 252 + 72 = 1,064 (checked by script). */
const WS = [16,10,8,6,6,6,6,6,6,6,3,3,3,3,3,3,3,3];
const cr4 = sh => [...sh].sort((a,b)=>b-a).slice(0,4).reduce((a,b)=>a+b,0);
const hhiOf = sh => sh.reduce((a,b)=>a+b*b,0);
const mergeTop2 = sh => { const s = [...sh].sort((a,b)=>b-a); return [s[0]+s[1], ...s.slice(2)]; };
/* The 1980s FTC guideline your textbook reports: under 1,000 probably approve; over 1,800 probably challenge; in between, case by case. */
const hhiZone = h => h < 1000 ? 'under 1,000: probably approved' : h > 1800 ? 'over 1,800: probably challenged' : '1,000 to 1,800: examined case by case';

/* L36 V1: why government promotes competition, as a chain (Unit 5 monopoly results; Econlib, McChesney; Module 5 slide 223) */
FIG7.l36why = () => fig(flow([
  'A firm (or a group acting together) faces little competition.',
  'It can restrict output and raise its price above marginal cost (Lesson 26).',
  `Trades that buyers value more than they cost to make don\'t happen: ${dt('deadweight-loss','<b>deadweight loss</b>')}.`,
  {t:'Government\'s tools: <b>antitrust</b> to keep markets competitive, and <b>regulation</b> where competition can\'t work (natural monopoly).',c:'u3end'}
]), 'The case for public policy toward competition, built from Unit 5. Econlib\'s Fred McChesney: economists "generally believe that monopolies and other restraints of trade are bad because they usually reduce total output."');

/* L36 V2: the main U.S. antitrust laws (textbook §11.1 Clear It Up; Econlib, McChesney) */
FIG7.l36laws = () => fig(atable(['Year','Law or event','What it did'], [
  ['1890','<b>Sherman Antitrust Act</b>','Outlawed cartels ("restraint of trade") and monopolizing, including attempts to monopolize'],
  ['1911','Standard Oil broken up','The Supreme Court upheld splitting a firm with about 90% of U.S. oil refining into 34 firms'],
  ['1914','<b>Clayton Antitrust Act</b>','Outlawed mergers that "substantially lessen competition," some price discrimination, and tied sales'],
  ['1914','Federal Trade Commission (FTC) created','To define and police unfair competition; today the FTC and the Justice Department enforce the laws'],
  ['1950','Celler-Kefauver Act','Extended the Clayton Act to vertical and conglomerate mergers']
], { cls:'u7t u7l compact wrap', hl:{0:{row:'u3z1'},2:{row:'u3z1'}} }), 'Your course textbook\'s history of antitrust law. The two highlighted laws are the ones to remember. "Trust" was the 1800s legal form for combining firms, which is why these are called antitrust laws.');

/* L36 V3: what antitrust law allows and forbids (textbook §11.2) */
FIG7.l36rules = () => fig(atable(['Practice','Under U.S. antitrust law','Why'], [
  ['Agreeing with rivals to fix prices or output, rig bids, or split up markets (a cartel)','<b>Illegal</b>','It is collusion: firms act together like one monopoly'],
  ['Having a monopoly from a better product or a patent','<b>Legal</b>','The law punishes how power is gained or used, not size alone'],
  ['Requiring dealers to sell at or above a minimum price','<b>Illegal</b>','It stops dealers from competing on price'],
  ['Exclusive dealing (a maker sells only through its own dealers)','<b>Depends</b>','Legal if it encourages competition; illegal if it shuts rivals out'],
  ['Tying (buy product A only if you also buy product B)','<b>Often challenged</b>','It can force buyers to take something they don\'t want'],
  ['Predatory pricing (cut prices to drive out a new rival, then raise them)','<b>Illegal, but hard to prove</b>','A price below average variable cost is one proposed test']
], { cls:'u7t u7l compact wrap', hl:{0:{1:'u3z2'},2:{1:'u3z2'},5:{1:'u3z2'}} }), 'Your course textbook\'s list. Notice the pattern: antitrust targets agreements and tactics that reduce competition. Being big, or being the only seller because you were better or first, is not by itself a violation.');

/* L36 V4: the windshield market, ratio and index (textbook Table 11.1 and Work It Out) */
FIG7.l36ws = () => fig(`${atable(['Firms','Share each','Shares added (CR4)','Squared shares (HHI)'], [
  ['Smooth as Glass','16%','16','16² = 256'],['Auto Glass Doctor','10%','10','10² = 100'],['Your Car Shield','8%','8','8² = 64'],['Seven firms','6% each','6 (only one of the seven counts)','7 × 36 = 252'],['Eight firms','3% each','–','8 × 9 = 72'],
  ['<b>Total</b>','100%','<b>40</b>','<b>744</b>']], { cls:'u7t compact wrap', hl:{5:{row:'u3z2'}} })}`,
  'Your course textbook\'s 18 windshield-repair firms. The four-firm ratio adds the four largest shares: 16 + 10 + 8 + 6 = 40. The HHI squares every firm\'s share and adds them all: 744. Both say this market is far from concentrated.');

/* L36 V5: same four-firm ratio, very different HHI (textbook Work It Out step 5) */
FIG7.l36same = () => figs([
  ['Five firms with 20% each', `<div class="qg">${ubars([20,20,20,20,20], { labels:['1','2','3','4','5'], ylab:'Market share (%)', xlab:'Firm', ymax:80, colorOf:()=>'var(--accent)' })}</div><p class="small" style="text-align:center">CR4 = 80 · HHI = 5 × 20² = <b>2,000</b></p>`],
  ['One firm 77%, 23 firms 1% each', `<div class="qg">${ubars([77,1,1,1,1,1], { labels:['1','2','3','4','5','…'], ylab:'Market share (%)', xlab:'Firm', ymax:80, colorOf:(v,i)=> i ? 'var(--accent)' : 'var(--bad)' })}</div><p class="small" style="text-align:center">CR4 = 80 · HHI = 77² + 23 × 1² = <b>5,952</b></p>`]
], 'Your course textbook\'s two industries. Both have a four-firm ratio of 80, but the second is close to a monopoly. Squaring makes big firms count much more, so the HHI tells them apart.');

/* L36 V6: natural monopoly choices (textbook Figure 11.3, drawn in Lesson 26; table in the caption) */
FIG7.l36nm = () => fig(FIG5.l26natBare(), 'Your course textbook\'s natural monopoly (Lesson 26). A: unregulated, 4 units at $9.30. B: split in half, each half makes 2 at an average cost of $9.75 instead of $7.75. C: price = marginal cost, 8 units at $3.50, below the $5.70 average cost, so losses. F: price = average cost, 6 units at $6.50, the usual choice.');

/* L36 V7: cost-plus vs price cap (textbook §11.3) */
FIG7.l36cap = () => fig(`<div class="u3pair">
  <div class="u3card bad"><p class="u3h">Cost-plus regulation</p><p><b>Rule:</b> price = average cost + a normal profit</p><p><b>Incentive:</b> higher costs are passed on to customers, so the firm has little reason to cut costs, and may even build too much</p></div>
  <div class="u3card ok"><p class="u3h">Price cap regulation</p><p><b>Rule:</b> regulator sets the price for the next few years, often falling slightly</p><p><b>Incentive:</b> cut costs faster than the cap and keep the extra profit; fail and take losses</p><p><b>Catch:</b> works badly if the cap is set unrealistically low or the market changes sharply</p></div></div>`,
  'Your course textbook\'s two ways to aim for point F. Both try to stop monopoly profits; they differ in what happens when the firm cuts costs. Under cost-plus, savings go to customers; under a cap, the firm keeps them for a while.');

/* L36 V8: regulatory capture as a chain (textbook §11.4) */
FIG7.l36capture = () => fig(flow([
  'A board regulates an industry\'s prices and entry.',
  'The industry suggests appointees, lobbies the board, supplies most of its information, and hires departing members.',
  'Consumers are spread out and poorly represented.',
  {t:'Regulation becomes a way for existing firms to <b>limit competition and keep prices high</b>: regulatory capture.',c:'u3end'}
]), 'Your course textbook\'s account of airline regulation before 1978. Each step is something the textbook says the airline industry did. The end result turns regulation into a shield for the firms it was meant to restrain.');

/* L36 V9: airline deregulation before and after (textbook §11.4 Clear It Up) */
FIG7.l36air = () => fig(atable(['','Regulated (Civil Aeronautics Board, 1938-1978)','After the Airline Deregulation Act (1978)'], [
  ['Fares and routes','Set by the board','Set by the airlines'],
  ['New airlines on main routes','None for 40 years','Many entered (and some failed)'],
  ['Average fares','Higher','About one-third lower over two decades'],
  ['Seats filled','About half','About two-thirds'],
  ['Passengers','Fewer','Doubled from the late 1970s to the early 2000s']
], { cls:'u7t compact wrap', hl:{2:{2:'u3z2'}} }), 'Your course textbook\'s airline example. Removing price and entry controls brought competition back. The textbook also notes the costs: bankruptcies and layoffs, and recent mergers that worry regulators again.');

/* ===== Lesson 36: Antitrust Policy and Regulation (no Modern States video; Module 5 slide 223 names the options; textbook ch. 11) =====
   Common mistakes: M1 having a monopoly is illegal in itself · M2 regulators block most mergers · M3 breaking up a natural monopoly lowers costs
   M4 regulators should make a natural monopoly charge P = MC · M5 the four-firm ratio tells the whole story (HHI adds nothing) · M6 regulation always serves consumers */
const shareTbl = (sh) => atable(['Firm','Market share'], sh.map((s,i)=>[`Firm ${'ABCDEFGHIJ'[i]||i+1}`, s+'%']), { cls:'u7t compact' });

mc('l36-why','l36','Why do economists generally support laws against monopolization and cartels?',
  [`Monopolies and cartels usually restrict output and raise prices, reducing total surplus`,`Large firms always have higher costs than small firms`,`Monopolies always lose money`,`Cartels lower prices too much`,`Competition always produces the most innovation, without exception`],0,
  `<p>Econlib\'s McChesney: economists "generally believe that monopolies and other restraints of trade are bad because they usually reduce total output." Lesson 26 showed the result: price above marginal cost and a deadweight loss. Large firms can have <b>lower</b> costs (economies of scale), which is why size alone isn\'t illegal (M1).</p>`);
mc('l36-sherman','l36','Which U.S. law, passed in 1890, outlawed cartels and monopolizing?',
  [`The Sherman Antitrust Act`,`The Clayton Antitrust Act`,`The Clean Air Act`,`The Airline Deregulation Act`,`The Celler-Kefauver Act`],0,
  `<p>The Sherman Act of 1890 outlawed every "contract, combination ... or conspiracy" in "restraint of trade" and monopolization, including attempts to monopolize (Econlib, McChesney; your textbook). The Clayton Act came in 1914.</p>`);
mc('l36-clayton','l36','The Clayton Antitrust Act of 1914 outlawed which of the following?',
  [`Mergers that would substantially lessen competition, some price discrimination, and tied sales`,`All mergers between large firms`,`Any firm with more than half of its market`,`Pollution above a maximum level`,`All price differences between customers, for any reason`],0,
  `<p>Your textbook: the Clayton Act "outlawed mergers and acquisitions (where the outcome would be to \'substantially lessen competition\' in an industry), price discrimination ... and tied sales." It doesn\'t ban all mergers (M2) or all size (M1).</p>`);
tf('l36-tf-mono','l36','Under U.S. antitrust law, it is illegal for a firm to have a monopoly, however it got one.',false,
  `<p>False. Your textbook: "Under U.S. antitrust laws, monopoly itself is not illegal." A firm with a patent, or one that wins most of a market "by producing a better product at a lower price," breaks no law. What is illegal is gaining or keeping power through anticompetitive practices (M1).</p>`);
mc('l36-cartel','l36','Made-up scenario. The three cement makers in a region secretly agree on the price each will charge. Under U.S. antitrust law, this is',
  [`Illegal price fixing`,`Legal, because each firm is still separate`,`Legal, if their prices stay below the monopoly price`,`A legal merger`,`Illegal only if one firm has a patent`],0,
  `<p>Your textbook: "it is illegal for competitors to form a cartel to collude to make pricing and output decisions, as if they were a monopoly firm"; the FTC and Justice Department "prohibit firms from agreeing to fix prices or output." Econlib\'s McChesney: "Economists remain almost unanimous in condemning all horizontal price-fixing."</p>`);
mc('l36-cr4','l36',`Your course textbook\'s market for replacing car windshields has 18 firms:${atable(['Firms','Market share'], [['Smooth as Glass','16%'],['Auto Glass Doctor','10%'],['Your Car Shield','8%'],['Seven firms','6% each'],['Eight firms','3% each']], { cls:'u7t compact' })}What is the four-firm concentration ratio?`,
  [`34`,`40`,`46`,`58`,`744`],1,
  `<p>Add the four largest shares: 16 + 10 + 8 + 6 = <b>40</b>. Only one of the seven 6% firms is among the top four.</p>${FIG7.l36ws()}<p>34 stops at three firms; 46 is the ratio after the top two firms merge; 58 adds the top seven firms instead of four (16 + 10 + 8 + 4 × 6); 744 is the HHI, a different measure (M5).</p>`);
gen('l36-g-cr4','l36',()=>{
  let sh; do { const k = pick([5,6,7]); sh = []; let left = 100; for(let i=0;i<k-1;i++){ const v = pick([4,6,8,10,12,15,18,20,25,30]); if(v < left-3){ sh.push(v); left -= v; } } sh.push(left); sh.sort((a,b)=>b-a); } while(sh.length<5 || new Set(sh).size < sh.length || sh[0] > 60);
  const ans = cr4(sh);
  return { type:'num', kind:'num', unit:'', prompt:`Made-up numbers. A market has ${sh.length} firms with these market shares:${shareTbl(sh)}What is the four-firm concentration ratio?`, answer:ans,
    explain:`<div class="math">Four largest: ${sh.slice(0,4).join(' + ')} = <b>${ans}</b></div><p>The common slips: adding every firm (always 100), or squaring the shares, which gives the HHI (${hhiOf(sh).toLocaleString('en-US')}), a different measure (M5).</p>${fig(atable(['Firm','Share','In the top four?'], sh.map((s,i)=>[`Firm ${'ABCDEFGHIJ'[i]}`, s+'%', i<4?'Yes':'No']), { cls:'u7t compact', hl:Object.fromEntries([0,1,2,3].map(i=>[i,{row:'u3z2'}])) }), 'Marked up: the four highlighted shares are the ones added.')}`
  };
});
gen('l36-g-hhi','l36',()=>{
  let sh; do { const k = pick([3,4,5,8,10]); const opts = k > 5 ? [5,8,10,12,15] : [10,15,20,25,30,40,50]; sh = []; let left = 100; for(let i=0;i<k-1;i++){ const v = pick(opts); if(v < left-5){ sh.push(v); left -= v; } } sh.push(left); sh.sort((a,b)=>b-a); } while(sh.length<3 || sh.length>10);
  const ans = hhiOf(sh);
  return { type:'num', kind:'num', unit:'', prompt:`Made-up numbers. A market has ${sh.length} firms with these market shares:${shareTbl(sh)}What is the Herfindahl-Hirschman Index (HHI)?`, answer:ans,
    explain:`<div class="math">HHI = ${sh.map(s=>s+'²').join(' + ')}<br>= ${sh.map(s=>(s*s).toLocaleString('en-US')).join(' + ')} = <b>${ans.toLocaleString('en-US')}</b></div><p>If a merger produced this HHI, the 1980s FTC guideline your textbook reports would say: ${hhiZone(ans)}. The common slip is squaring the total (100² = 10,000) or adding the shares without squaring (100).</p>${fig(`<div class="qg" style="max-width:360px">${ubars(sh, { labels:sh.map((_,i)=>String.fromCharCode(65+i)), ylab:'Market share (%)', xlab:'Firm', ymax:100, colorOf:()=>'var(--accent)' })}</div>`, `Marked up: each bar is squared and added. The biggest firm contributes ${(sh[0]*sh[0]).toLocaleString('en-US')} of the ${ans.toLocaleString('en-US')}.`)}`
  };
});
mc('l36-same80','l36','Two industries each have a four-firm concentration ratio of 80. In Industry X, five firms have 20% each. In Industry Y, one firm has 77% and 23 firms have 1% each. Which statement is correct?',
  [`Industry Y has the much higher HHI (5,952 vs 2,000), so it raises more concern about competition`,`Both industries have the same HHI, because their four-firm ratios match`,`Industry X has the higher HHI, because it has more large firms`,`Neither ratio matters, because both industries have more than four firms`,`Industry Y is perfectly competitive, because it has 24 firms`],0,
  `<p>X: 5 × 20² = 2,000. Y: 77² + 23 × 1² = 5,929 + 23 = 5,952. Your textbook: "it would be reasonable to worry more about the extent of competition in the second case—where the largest firm is nearly a monopoly." The four-firm ratio can\'t see the difference; the HHI can (M5).</p>${FIG7.l36same()}`);
/* Market-share bar chart for answer choices: every bar labeled with its share (150 × 128, neutral labels). */
function u7share(vals, aria){
  const x0=30, y0=100, pw=112, ph=80, n=vals.length, bw=pw/n, Y=v=>y0-ph*v/100;
  let s = `<svg class="u6m" viewBox="0 0 150 128" role="img" aria-label="${esc(aria)}"><line x1="${x0}" x2="${x0+pw}" y1="${y0}" y2="${y0}" class="ax"/><line x1="${x0}" x2="${x0}" y1="${y0}" y2="${y0-ph}" class="ax"/>`;
  s += `<text x="${x0+pw/2}" y="${y0+23}" text-anchor="middle" class="lbl">Firm</text><text x="10" y="${y0-ph/2}" text-anchor="middle" class="lbl" transform="rotate(-90 10 ${y0-ph/2})">Share (%)</text>`;
  vals.forEach((v,i)=>{ const x = x0+i*bw; s += `<rect x="${(x+bw*0.18).toFixed(1)}" y="${Y(v).toFixed(1)}" width="${(bw*0.64).toFixed(1)}" height="${(ph*v/100).toFixed(1)}" rx="1.5" fill="var(--accent)" opacity=".8"/><text x="${(x+bw/2).toFixed(1)}" y="${(Y(v)-3).toFixed(1)}" text-anchor="middle" class="lbl-ink" style="font-size:9.5px">${v}</text><text x="${(x+bw/2).toFixed(1)}" y="${y0+9}" text-anchor="middle" class="lbl" style="font-size:9px">${i+1}</text>`; });
  return s + '</svg>';
}
lazy('l36-gr-hhi','l36',()=>visMC({
  prompt:`Each bar chart shows the market share (in percent, printed above each bar) of every firm in a different industry; all shares add to 100%. Which industry has the <b>highest</b> Herfindahl-Hirschman Index?`,
  choices:[
    { svg:L=>u7share([80,10,10],'Graph '+L), desc:'three firms: 80, 10, 10 percent', ok:true },
    { svg:L=>u7share([50,50],'Graph '+L), desc:'two firms: 50 and 50 percent' },
    { svg:L=>u7share([40,30,20,10],'Graph '+L), desc:'four firms: 40, 30, 20, 10 percent' },
    { svg:L=>u7share([25,25,25,25],'Graph '+L), desc:'four firms: 25 percent each' },
    { svg:L=>u7share([20,20,20,20,20],'Graph '+L), desc:'five firms: 20 percent each' } ],
  explain: L => `<p><b>Graph ${L}</b>: 80² + 10² + 10² = 6,400 + 100 + 100 = <b>6,600</b>.</p>${fig(atable(['Industry','HHI'], [['80, 10, 10','6,400 + 100 + 100 = <b>6,600</b>'],['50, 50','2,500 + 2,500 = 5,000'],['40, 30, 20, 10','1,600 + 900 + 400 + 100 = 3,000'],['25 × 4','4 × 625 = 2,500'],['20 × 5','5 × 400 = 2,000']], { cls:'u7t compact', hl:{0:{row:'u3z2'}} }), 'Marked up: every industry\'s HHI. Squaring makes one dominant firm count more than two equal halves.')}<p>Two firms at 50% each (5,000) is the tempting choice: fewer firms usually means more concentration, but one 80% firm outweighs it (M5).</p>`
}));
mc('l36-natreg','l36',`Your course textbook\'s natural monopoly can be left alone or regulated:${FIG5.l26natBare()}A regulator wants the firm to cover its average cost and earn only a normal profit, without a subsidy. Which outcome should it require?`,
  [`Point F: 6 units at $6.50, where average cost meets demand`,`Point A: 4 units at $9.30, where MR = MC`,`Point C: 8 units at $3.50, where MC meets demand`,`Point B: split the firm in two, each making 2 units`,`Zero output`],0,
  `<p>At F, price equals average cost ($6.50 at 6 units), so the firm just covers its costs including a normal profit. Your textbook calls F "perhaps the most plausible option." C sets price equal to marginal cost, efficient but below the $5.70 average cost there, so the firm loses money without "an ongoing public subsidy" (M4). A is the unregulated monopoly; B raises average cost (M3).</p>`);
mc('l36-breakup','l36','Why do economists generally argue against breaking up a natural monopoly such as a local water company?',
  [`Average cost falls with output, so two smaller firms would each produce at a higher average cost`,`Natural monopolies never charge high prices`,`Breaking up firms is illegal`,`Water is a public good`,`Smaller firms always collude`],0,
  `<p>The textbook\'s point B: two half-size firms each producing 2 units have an average cost of $9.75, versus $7.75 for one firm producing 4. Your textbook: with a downward-sloping average cost curve, "two smaller firms will always have higher average costs of production than one larger firm for any quantity of total output." Imagine four sets of water pipes under one city (M3).</p>${FIG7.l36nm()}`);
mc('l36-costplus','l36','What is the main weakness of cost-plus regulation of a natural monopoly?',
  [`Because the firm can pass its costs on to customers, it has little reason to keep costs down`,`It forces the firm to charge less than average cost`,`It lets the firm earn unlimited monopoly profits`,`It sets the price for many years without looking at costs`,`It breaks the firm into smaller pieces`],0,
  `<p>The textbook: "If producers are reimbursed for their costs, plus a bit more, then at a minimum, producers have less reason to be concerned with high costs." Worse, they may have "an incentive to generate high costs." Setting a price for years ahead is price cap regulation, the alternative.</p>${FIG7.l36cap()}`);
mc('l36-capture','l36','Before 1978, the airline industry suggested appointees to its regulatory board, lobbied the board, supplied most of its information and hired departing board members. What is this called?',
  [`Regulatory capture`,`Regulation that protects consumers from high prices`,`Price cap regulation`,`A tying sale`,`Deregulation`],0,
  `<p>The textbook: "regulatory capture, in which the firms supposedly being regulated end up playing a large role in setting the regulations that they will follow." The result can be regulation that helps existing firms "reduce output, keep prices high, and limit competition," the opposite of protecting consumers (M6).</p>${FIG7.l36capture()}`);
/* L36 more */
mc('l36-standard','l36','In 1911 the U.S. Supreme Court upheld breaking up Standard Oil under the Sherman Act. About what share of U.S. oil refining had Standard Oil controlled, and into how many firms was it split?',
  [`About 90%; 34 firms`,`About 50%; 2 firms`,`About 25%; 4 firms`,`100%; 100 firms`,`About 75%; 10 firms`],0,
  `<p>The textbook: Standard Oil "had controlled about 90% of the country\'s oil refining" and was split "into 34 independent firms, including Exxon, Mobil, Amoco, and Chevron." It was an early test of the 1890 Sherman Act.</p>`);
mc('l36-ftc','l36','Which two federal agencies enforce U.S. antitrust laws today?',
  [`The Federal Trade Commission and the Department of Justice`,`The Environmental Protection Agency and the FTC`,`The Federal Reserve and the Treasury`,`The Civil Aeronautics Board and the FTC`,`The Census Bureau and the Department of Labor`],0,
  `<p>The textbook: "In the twenty-first century, the FTC and the U.S. Department of Justice continue to enforce antitrust laws." The EPA enforces environmental rules (Lesson 34); the Civil Aeronautics Board regulated airlines until deregulation.</p>`);
mc('l36-merger-def','l36','When one firm buys another firm, the deal is called',
  [`An acquisition`,`A cartel`,`A tying sale`,`Deregulation`,`Regulatory capture`],0,
  `<p>The textbook: "When one firm purchases another, it is called an acquisition." A merger is two firms combining into one; both are reviewed the same way under antitrust law.</p>`);
tf('l36-tf-mergers','l36','The U.S. government approves most proposed mergers.',true,
  `<p>True. The textbook: "The U.S. government approves most proposed mergers," and quotes the FTC: "Most mergers actually benefit competition and consumers by allowing firms to operate more efficiently." Regulators look for the minority that would "lessen competition" (M2).</p>`);
mc('l36-guide','l36','Under the 1980s FTC guidelines reported in your course textbook, how would regulators probably treat a merger that would produce an HHI of 2,400?',
  [`Probably challenge it, because the HHI would be above 1,800`,`Probably approve it, because the HHI would be under 10,000`,`Examine it case by case, because it is between 1,000 and 2,500`,`Approve it automatically, because most mergers are approved`,`Block it, because any HHI above 1,000 is illegal`],0,
  `<p>The textbook: under 1,000, "probably approve"; over 1,800, "probably challenge"; between, case by case. 2,400 is above 1,800. The textbook adds that regulators now rely less on these cutoffs and more on case-by-case evidence.</p>`);
mc('l36-merge2','l36',`In your course textbook\'s windshield market (shares 16%, 10%, 8%, seven firms at 6%, eight at 3%), the four-firm ratio is 40. What would it become if the two largest firms merged?`,
  [`26`,`40`,`42`,`46`,`52`],3,
  `<p>The merged firm has 16 + 10 = 26%. The new top four: 26 + 8 + 6 + 6 = <b>46</b>, the textbook\'s answer. It adds that this "might barely raise an eyebrow," since the top four still hold less than half the market. 40 forgets that a 6% firm moves into the top four.</p>`);
gen('l36-g-merge','l36',()=>{
  let a, b, rest; do { a = pick([10,15,20,25,30]); b = pick([10,15,20,25]); rest = 100 - a - b; } while(rest < 20 || a < b || rest % 10);
  const others = Array(rest/10).fill(10), before = [a,b,...others], after = [a+b,...others], h1 = hhiOf(before), h2 = hhiOf(after), ans = h2 - h1;
  return { type:'num', kind:'num', unit:'points', prompt:`Made-up numbers. In a market, Firm A has <b>${a}%</b>, Firm B has <b>${b}%</b>, and ${others.length} other firms have 10% each. If A and B merge, by how much does the HHI rise?`, answer:ans,
    explain:`<div class="math">Before: ${a}² + ${b}² + ${others.length} × 10² = ${(a*a).toLocaleString('en-US')} + ${(b*b).toLocaleString('en-US')} + ${others.length*100} = ${h1.toLocaleString('en-US')}<br>After: ${a+b}² + ${others.length} × 10² = ${((a+b)*(a+b)).toLocaleString('en-US')} + ${others.length*100} = ${h2.toLocaleString('en-US')}<br>Rise = <b>${ans.toLocaleString('en-US')}</b></div><p>A shortcut: the rise is always 2 × ${a} × ${b} = ${2*a*b}. The common slip is adding the two shares (${a+b}) and stopping, or forgetting to square the merged share.</p>${fig(atable(['','Before','After'], [['Merging firms', `${a}² + ${b}² = ${(a*a+b*b).toLocaleString('en-US')}`, `${a+b}² = ${((a+b)*(a+b)).toLocaleString('en-US')}`],['Other firms', `${others.length*100}`, `${others.length*100}`],['HHI', h1.toLocaleString('en-US'), `<b>${h2.toLocaleString('en-US')}</b>`]], { cls:'u7t compact', hl:{0:{row:'u3z2'}} }), `Marked up: only the merging firms\' part changes. Before: ${hhiZone(h1)}; after: ${hhiZone(h2)}.`)}`
  };
});
mc('l36-rpm','l36','Under U.S. antitrust law, which practice is illegal?',
  [`A manufacturer requiring its dealers to sell at or above a minimum price`,`A manufacturer suggesting a retail price`,`Ford selling its cars only through Ford dealers`,`A firm earning high profits from a patented invention`,`Selling season tickets to a sports team`],0,
  `<p>The textbook: a "minimum resale price maintenance agreement ... is illegal because it would restrict competition among dealers." But the maker may "suggest" prices, and exclusive dealing like Ford\'s is legal when it encourages competition between dealers. Patent profits are legal (M1); season tickets are a common, legal bundle.</p>`);
mc('l36-tying','l36','Made-up scenario. A store will sell you a popular video game only if you also buy a particular brand of headset. This is an example of',
  [`A tying sale`,`Price fixing`,`A merger`,`Predatory pricing`,`Regulatory capture`],0,
  `<p>Your textbook: "Tying sales happen when a customer is required to buy one product only if the customer also buys a second product." They are controversial because they "force consumers to purchase a product that they may not actually want."</p>`);
mc('l36-predatory','l36','Which of the following is a commonly proposed test for predatory pricing?',
  [`Selling below average variable cost, a price at which the firm should be shutting down`,`Selling below a rival\'s price`,`Selling at a price equal to marginal cost`,`Raising prices after a rival enters`,`Charging different prices to different customers`],0,
  `<p>The textbook: "A commonly proposed rule is that if a firm is selling for less than its average variable cost ... then there is evidence for predatory pricing." Simply matching a new rival\'s lower fare may just be competition, which is why such cases are hard to prove.</p>`);
mc('l36-microsoft','l36','In the U.S. government\'s antitrust case against Microsoft around 2000, what were regulators mainly concerned about?',
  [`Using its near-monopoly in operating systems to push out rivals in other software, through tying and exclusive deals`,`Microsoft having too many satisfied customers`,`Microsoft\'s prices being too low for consumers`,`Microsoft refusing to sell Windows at all`,`Microsoft merging with its main rival`],0,
  `<p>The textbook: regulators argued Microsoft tried "to use its market power in operating systems software to take over other parts of the software industry," by tying its browser to Windows and threatening computer makers. Having the near-monopoly wasn\'t itself the charge (M1). Microsoft settled in 2002.</p>`);
mc('l36-mc-loss','l36',`Your course textbook\'s natural monopoly:${FIG5.l26natBare()}If regulators require price = marginal cost (point C: 8 units at $3.50), what happens, given an average cost of $5.70 at 8 units?`,
  [`The firm loses $2.20 on every unit and goes out of business without a subsidy`,`The firm earns monopoly profits`,`The firm just covers its costs`,`The firm produces 4 units`,`Consumers pay $9.30`],0,
  `<p>$3.50 − $5.70 = −$2.20 a unit. The textbook: "Unless the regulators or the government offer the firm an ongoing public subsidy ... the firm will lose money and go out of business." Point C is efficient (P = MC) but can\'t last on its own (M4).</p>`);
mc('l36-pricecap','l36','Under price cap regulation, what happens if a natural monopoly finds ways to cut its costs faster than the cap falls?',
  [`It keeps the extra profit until the cap is reset`,`The regulator immediately lowers its price to match`,`It must pay the savings to the government`,`It loses money`,`It is broken up`],0,
  `<p>The textbook: "If the firm can find ways of reducing its costs more quickly than the price caps, it can make a high level of profits." That reward is the point: it gives "incentives for efficiency and innovation" that cost-plus lacks.</p>`);
mc('l36-airline','l36','What happened to average U.S. airfares in the two decades after the Airline Deregulation Act of 1978?',
  [`They fell by about one-third over the next two decades`,`They doubled`,`They stayed the same, because airlines kept their routes`,`They fell to zero on many routes`,`They rose because new airlines entered`],0,
  `<p>The textbook: "The greater competition from deregulation reduced airfares by about one-third over the next two decades." Planes went from about half full to two-thirds full, and passenger numbers doubled. Before 1978 the Civil Aeronautics Board allowed no new airlines on main routes for 40 years.</p>${FIG7.l36air()}`);
mc('l36-market','l36','Why does the way a "market" is defined matter for measuring concentration in antitrust cases?',
  [`A narrowly defined market makes concentration look higher; a broad one makes it look lower`,`Market definitions never affect concentration measures`,`Only global markets can be measured`,`Market shares always add to more than 100%`,`Antitrust law doesn\'t apply to defined markets`],0,
  `<p>The textbook: "A narrowly defined market will tend to make concentration appear higher, while a broadly defined market will tend to make it appear smaller." Example: Whole Foods and Wild Oats were the two largest "premium natural and organic" chains, but small among all grocery stores.</p>`);
mc('l36-vitamin','l36','In the late 1990s, an international cartel of vitamin makers was prosecuted. What did its leading firm, Hoffman-La Roche, agree to after pleading guilty?',
  [`A $500 million fine and at least four months of jail time for a top executive`,`To merge with BASF`,`To be broken into 34 firms`,`To sell vitamins only through its own dealers`,`Nothing; cartels are legal outside the United States`],0,
  `<p>The textbook: Hoffman-La Roche "pleaded guilty in May 1999 and agreed both to pay a fine of $500 million and to have at least one top executive serve four months of jail time." Cartels fixing prices and output break the Sherman Act.</p>`);
/* ===== Lesson 36 quick checks ===== */
mc('l36c-why','l36','Which of these is the main reason for public policy to promote competition?',
  [`Firms with market power tend to restrict output and charge more than marginal cost`,`Small firms always have lower costs`,`Competition guarantees every firm a profit`,`Government needs the tax revenue from fines`,`Monopolies always have higher costs than competitive firms`],0,
  `<p>Market power lets a firm raise price above marginal cost by producing less, which causes deadweight loss (Lesson 26). Natural monopolies actually have <b>lower</b> costs, which is why they are regulated rather than broken up.</p>`);
mc('l36c-law','l36','Made-up scenario, new to this lesson. Two of the three largest airlines announce a merger. Which U.S. law lets regulators block it if it would substantially lessen competition?',
  [`The Clayton Antitrust Act`,`The Clean Air Act`,`The Airline Deregulation Act`,`The Sarbanes-Oxley Act`,`No law; mergers can\'t be blocked`],0,
  `<p>The Clayton Act (1914) outlawed mergers whose effect would "substantially lessen competition." The FTC and Justice Department review large mergers before they happen and can allow, block or attach conditions.</p>`);
mc('l36c-practice','l36','Made-up scenario. Two gas stations on opposite corners agree to always charge the same price. This is',
  [`Illegal price fixing`,`Legal competition`,`A legal merger`,`Regulatory capture`,`A natural monopoly`],0,
  `<p>Agreeing with a rival on price is collusion, illegal under the Sherman Act. Matching a rival\'s price without any agreement can be ordinary competition; the agreement is what crosses the line.</p>`);
mc('l36c-hhi','l36','Made-up numbers. A market has three firms with shares of 50%, 30% and 20%. What is its HHI?',
  [`100`,`1,000`,`3,800`,`5,000`,`10,000`],2,
  `<p>50² + 30² + 20² = 2,500 + 900 + 400 = <b>3,800</b>. 100 adds without squaring; 10,000 squares the total (a monopoly\'s HHI) (M5).</p>`);
mc('l36c-reg','l36','A regulator sets a natural monopoly\'s price equal to its average cost. Compared with leaving it unregulated, which is true?',
  [`Price is lower and output higher, and the firm earns only a normal profit`,`Price and output are both lower`,`The firm loses money on every unit`,`Price is higher and output lower`,`Nothing changes`],0,
  `<p>Moving from A (4 units at $9.30) to F (6 units at $6.50) lowers price and raises output; at P = AC the firm covers its costs with a normal profit. Losses happen at P = MC (point C) (M4).</p>${FIG7.l36nm()}`);
mc('l36c-capture','l36','Made-up scenario. A state board sets taxi fares and decides how many taxi licenses exist. Taxi companies nominate most of the board\'s members, and the board has issued no new licenses in 20 years. What is the most likely result?',
  [`Regulatory capture: fares stay high and new competitors are kept out`,`Fares fall, because regulators always protect riders`,`Predatory pricing by the taxi companies`,`A natural monopoly that should be broken up`,`Price cap regulation that rewards cost cutting`],0,
  `<p>The regulated firms control the regulator, the textbook\'s definition of regulatory capture, and the result is the airline pattern before 1978: limited entry and high prices. Assuming regulation must help consumers is the trap (M6).</p>${FIG7.l36capture()}`);
mc('l36c-skill','l36','Made-up scenario. A town\'s electricity is delivered by one company over one set of wires, because a second set would double the cost. Which policy fits best?',
  [`Regulate its price, for example at average cost or with a price cap`,`Break it into several competing companies with their own wires`,`Leave it alone, because monopoly is illegal`,`Fine it for price fixing`,`Ban it from earning any profit at all`],0,
  `<p>Duplicate wires would raise average cost, the mark of a natural monopoly, so breaking it up makes things worse (M3). The standard answer is regulation of price. A normal profit is allowed; "no profit at all" would drive it out.</p>`);

/* Course and textbook materials checked 2026-11-19: Module 5 slide 223 (ways to deal with monopoly: antitrust laws, regulation, public ownership, do nothing; used in Lesson 26);
   textbook §11.1 (merger, acquisition; FTC notification; antitrust laws block mergers and break up firms; Johnson & Johnson and Pfizer; most mergers approved; FTC quotes; Sherman 1890; Standard Oil 1911,
   about 90%, 34 firms; Clayton 1914; FTC 1914; Celler-Kefauver 1950; concentration ratio, windshield Table 11.1 = 40, top-two merger = 46; HHI = 744; 2,000 vs 5,952; 1980s guidelines 1,000/1,800;
   market definition, Microsoft 14%, Whole Foods and Wild Oats), §11.2 (cartels illegal; vitamin cartel, $500 million, four months; "monopoly itself is not illegal"; restrictive practices: minimum resale price,
   exclusive dealing, tying, bundling, predatory pricing and the average variable cost rule; Microsoft case), §11.3 (natural monopoly; Figure 11.3 points A, B, C, F; cost-plus; price cap),
   §11.4 (CAB 1938-1978; Airline Deregulation Act 1978; fares down about one-third; seats half to two-thirds full; passengers doubled; regulatory capture);
   Econlib, McChesney (Sherman Act outlaws cartelization and monopolization; Clayton outlaws some price discrimination, tying and mergers that "may be substantially to lessen" competition;
   "monopolies and other restraints of trade are bad because they usually reduce total output"; "almost unanimous in condemning all horizontal price-fixing"); CLEP outline (Public policy to promote competition). */
const L36TAGS = {
  'l36-why':['ELAT OS111','anti','terms','M1'], 'l36-sherman':['OS111 ELAT','anti','terms',''], 'l36-clayton':['OS111 ELAT','anti','terms','M1 M2'], 'l36-tf-mono':['OS112','anti','terms','M1'],
  'l36-cartel':['OS112 ELAT','anti','models',''], 'l36-cr4':['OS111','anti','data','M5'], 'l36-g-cr4':['OS111','anti','data','M5'], 'l36-g-hhi':['OS111','anti','data','M5'],
  'l36-same80':['OS111','anti','data','M5'], 'l36-gr-hhi':['OS111','anti','graphs','M5'], 'l36-natreg':['OS113','reg','graphs','M3 M4'], 'l36-breakup':['OS113','reg','terms','M3'],
  'l36-costplus':['OS113','reg','terms',''], 'l36-capture':['OS114','reg','terms','M6'],
  'l36-standard':['OS111','anti','terms',''], 'l36-ftc':['OS111','anti','terms',''], 'l36-merger-def':['OS111','anti','terms',''], 'l36-tf-mergers':['OS111','anti','terms','M2'],
  'l36-guide':['OS111','anti','data','M2'], 'l36-merge2':['OS111','anti','data','M5'], 'l36-g-merge':['OS111','anti','data','M5'], 'l36-rpm':['OS112','anti','terms','M1'],
  'l36-tying':['OS112 ELAT','anti','models',''], 'l36-predatory':['OS112','anti','terms',''], 'l36-microsoft':['OS112','anti','terms','M1'], 'l36-mc-loss':['OS113','reg','graphs','M4'],
  'l36-pricecap':['OS113','reg','terms',''], 'l36-airline':['OS114','reg','data','M6'], 'l36-market':['OS111','anti','terms','M5'], 'l36-vitamin':['OS112','anti','terms',''],
  'l36c-why':['ELAT MS5S','anti','terms','M3'], 'l36c-law':['OS111','anti','models','M2'], 'l36c-practice':['OS112 ELAT','anti','models',''], 'l36c-hhi':['OS111','anti','data','M5'],
  'l36c-reg':['OS113','reg','models','M4'], 'l36c-skill':['OS113 MS5S','reg','models','M3'], 'l36c-capture':['OS114','reg','models','M6']
};
u7tag(L36TAGS);

U7_CARDS.l36 = [
  ['Antitrust laws','What are antitrust laws?','Laws that let government block mergers, break up firms and outlaw practices that reduce competition. Main U.S. laws: Sherman (1890) and Clayton (1914).','Standard Oil was split into 34 firms in 1911.','They target anticompetitive behavior, not size alone.', FIG7.l36laws()],
  ['Sherman Act (1890)','What did the Sherman Antitrust Act outlaw?','Cartels and other restraints of trade, and monopolizing or attempting to monopolize.','A secret price-fixing agreement among cement makers.','Econlib: it didn\'t define these terms, so courts filled them in.', FIG7.l36laws()],
  ['Clayton Act (1914)','What did the Clayton Act outlaw?','Mergers that substantially lessen competition, some price discrimination, and tied sales.','Regulators can block a merger of two of the three largest airlines.','It doesn\'t ban mergers in general; most are approved.', FIG7.l36laws()],
  ['Is monopoly illegal?','Is having a monopoly illegal under U.S. antitrust law?','No. Monopoly from a better product or a patent is legal; anticompetitive practices are not.','Microsoft\'s near-monopoly wasn\'t the charge; tying and exclusive deals were.','Size alone is not a violation.', FIG7.l36rules()],
  ['Price fixing (cartel)','Why is agreeing with rivals on price illegal?','It is collusion: the firms act like one monopoly, restricting output and raising prices.','The vitamin cartel: a $500 million fine and jail time.','Matching a rival\'s price without an agreement can be legal.', FIG7.l36rules()],
  ['Restrictive practices','What are restrictive practices? Name three.','Practices short of price fixing that can reduce competition: minimum resale prices, some exclusive deals, tying, predatory pricing.','A store sells a game only with a particular headset (tying).','Some exclusive deals and bundles are legal and common.', FIG7.l36rules()],
  ['Four-firm concentration ratio','How do you calculate the four-firm concentration ratio?','Add the market shares of the four largest firms.','Windshields: 16 + 10 + 8 + 6 = 40.','It ignores how the shares are split among the top four.', FIG7.l36ws()],
  ['Herfindahl-Hirschman Index (HHI)','How do you calculate the HHI, and what is its range?','Square every firm\'s market share and add them. Monopoly = 10,000; very competitive = 100 or less.','50%, 30%, 20%: 2,500 + 900 + 400 = 3,800.','Squaring weights big firms heavily.', FIG7.l36same()],
  ['HHI merger guideline (1980s)','What did the FTC\'s 1980s HHI guideline say?','Under 1,000: probably approve; over 1,800: probably challenge; in between: case by case.','A merger producing an HHI of 2,400 would probably be challenged.','Today regulators rely more on case-by-case evidence.', numline({ min:0, max:3000, regions:[[0,1000,'Approve','var(--accent-soft)'],[1000,1800,'Case by case','var(--g2-soft, #f3e3b5)'],[1800,3000,'Challenge','#f2c4c4']], points:[[2400,'2,400']], ticks:[0,1000,1800,3000] })],
  ['Regulating a natural monopoly','Which outcome do regulators usually aim for, and why not the others?','Point F: price = average cost, so the firm covers costs with a normal profit. P = MC causes losses; splitting raises average cost.','Textbook: F = 6 units at $6.50.','Don\'t break up a natural monopoly; regulate its price.', FIG7.l36nm()],
  ['Cost-plus vs price cap','How do cost-plus and price cap regulation differ?','Cost-plus: price = cost + normal profit, so little reason to cut costs. Price cap: a set price for years, so cost cuts earn extra profit.','Utilities moved to price caps in the 1980s and 1990s.','Price caps fail if set unrealistically low.', FIG7.l36cap()],
  ['Regulatory capture','What is regulatory capture?','When the regulated firms gain strong influence over their regulator, so rules protect the industry instead of consumers.','Pre-1978 airline regulation: no new airlines on main routes for 40 years.','Deregulation cut airfares by about one-third.', FIG7.l36capture()]
];

Object.assign(U7_WRITE, {
  'w-l36-1':{lesson:'l36',prompt:'Explain how the four-firm concentration ratio and the Herfindahl-Hirschman Index are calculated, and why antitrust regulators might prefer the HHI. Use this example: Industry 1 has five firms with 20% each; Industry 2 has one firm with 77% and 23 firms with 1% each. Both have a four-firm ratio of 80.',
    model:'The four-firm concentration ratio adds the market shares of the four largest firms. The HHI squares the market share of every firm and adds them up, so a monopoly scores 100² = 10,000. In your textbook\'s example, Industry 1 has five firms with 20% each, and Industry 2 has one firm with 77% and 23 firms with 1% each. Both have a four-firm ratio of 80. But the HHI of the first is 5 × 20² = 2,000, while the second is 77² + 23 × 1² = 5,952. Because squaring gives large firms much more weight, the HHI shows that the second industry is close to a monopoly while the first has several equal rivals. Regulators worry more about the second, and the HHI captures that difference while the four-firm ratio does not.',
    checklist:['Explains the four-firm ratio (sum of the four largest shares)','Explains the HHI (sum of every squared share; monopoly = 10,000)','Calculates 2,000 and 5,952 (or shows the HHIs differ) for the two industries','Explains that squaring weights big firms, so the HHI reveals a near-monopoly the ratio misses']},
  'w-l36-2':{lesson:'l36',prompt:'A natural monopoly\'s average cost falls across the whole market. Unregulated, it makes 4 units at $9.30 (average cost $7.75). Split in two, each half makes 2 units at an average cost of $9.75. At price = marginal cost it would make 8 units at $3.50, with an average cost of $5.70. At price = average cost it makes 6 units at $6.50. Economists usually favor price = average cost. Explain why regulators don\'t break the firm up or set price equal to marginal cost instead, and name one problem with regulating at average cost in practice.',
    model:'A natural monopoly has average costs that keep falling over the range of market demand, so one firm can serve the whole market more cheaply than two. Breaking it up would raise average cost: in the textbook\'s example, two half-size firms each producing 2 units have an average cost of $9.75, compared with $7.75 for one firm producing 4. Setting price equal to marginal cost (point C) gives the efficient quantity, but there the price of $3.50 is below the average cost of $5.70, so the firm loses money and would go out of business without an ongoing subsidy. Setting price equal to average cost (point F, 6 units at $6.50) lets the firm cover its costs and earn a normal profit while stopping monopoly profits. In practice, regulating this way (cost-plus) gives the firm little reason to keep costs down, since higher costs are passed on to customers, which is why some regulators use price caps instead.',
    checklist:['Explains why splitting a natural monopoly raises average cost','Explains that P = MC is below average cost, causing losses without a subsidy','Explains that P = AC covers costs with a normal profit and stops monopoly profit','Names a practical problem (weak cost incentives under cost-plus, limited information, or regulatory capture)']}
});

U7_PLAN.l36 = {
  core:['l36-why','l36-sherman','l36-clayton','l36-tf-mono','l36-cartel','l36-cr4','l36-g-cr4','l36-g-hhi','l36-same80','l36-gr-hhi','l36-natreg','l36-breakup','l36-costplus','l36-capture'],
  more:['l36-standard','l36-ftc','l36-merger-def','l36-tf-mergers','l36-guide','l36-merge2','l36-g-merge','l36-rpm','l36-tying','l36-predatory','l36-microsoft','l36-mc-loss','l36-pricecap','l36-airline','l36-market','l36-vitamin']
};

U7_LESSONS.push({ id:'l36', unit:7, title:'Antitrust Policy and Regulation', mins:40, src:'No Modern States video covers this CLEP topic; Module 5 slide 223 names the options · Course textbook (OpenStax) ch. 11 (§11.1-§11.4)',
  sources:['MS5S','OS111','OS112','OS113','OS114','CB','ELAT'],
  oneline:'Government promotes competition two ways: antitrust laws stop mergers and practices that reduce competition, and regulation sets prices where only one firm makes sense, the natural monopoly.',
  body:`
<p>Lesson 26 showed that a ${dt('monopoly','monopoly')} produces less and charges more than a competitive market, and listed your course\'s four responses (Module 5, slide 223): "Increase competition with Antitrust Laws; Regulate natural monopolies ...; Public Ownership ...; Do nothing." Lesson 27 showed firms trying to act like a monopoly through a ${dt('cartel','cartel')}. The CLEP outline calls the first two responses "Public policy to promote competition." Modern States has no video on them, so this lesson follows your course textbook\'s chapter 11. It takes the illegal practices (§11.2) before the concentration measures (§11.1) on purpose, so the tools for spotting risky mergers come right before they are used.</p>

<h2>Why promote competition?</h2>
<!-- src: MS5 (slide 223, as above); ELAT ("Economists generally believe that monopolies and other restraints of trade are bad because they usually reduce total output, and therefore the overall economic well-being for producers and consumers"); Lesson 26 (monopoly deadweight loss); OS111 (critics of the trusts: "when competition was reduced, these firms were free to charge more and make permanently higher profits"). -->
<p>Econlib\'s Fred McChesney: economists "generally believe that monopolies and other restraints of trade are bad because they usually reduce total output, and therefore the overall economic well-being for producers and consumers."</p>
${FIG7.l36why()}
<p><b>The trade-off:</b> your textbook notes that supporters of the big firms of the 1800s "argued that they could take advantage of economies of scale," while critics answered that without competition they "were free to charge more." Policy has to tell these cases apart: a big firm that is big because it is cheaper, and a firm that is big because it shut out rivals.</p>
<p><b>So what:</b> two tools follow. ${dt('antitrust','<b>Antitrust</b>')} keeps markets competitive where competition can work. <b>Regulation</b> handles markets where it can\'t, the natural monopoly.</p>
<div data-check="l36c-why"></div>

<h2>The antitrust laws</h2>
<!-- src: OS111 (Clear It Up: trusts; "the U.S. government passed the Sherman Antitrust Act in 1890 to limit the power of these trusts"; Standard Oil 1911, about 90%, 34 firms; Clayton 1914: mergers that "substantially lessen competition," price discrimination, tied sales; FTC 1914; Celler-Kefauver 1950; "the FTC and the U.S. Department of Justice continue to enforce antitrust laws"); ELAT (Sherman "outlawing cartelization ... and monopolization (including attempts to monopolize)"; "The Sherman Act defines neither the practices that constitute restraints of trade nor monopolization"); OS112 ("Under U.S. antitrust laws, monopoly itself is not illegal"). -->
<p>In the late 1800s, groups of firms were combined under a legal form called a "trust" and run "as if they were a single firm" (your textbook). Laws to limit them became antitrust laws.</p>
${FIG7.l36laws()}
<p><b>Why these rules:</b> the Sherman Act goes after the two ways to get monopoly power without being better: agreeing with rivals (a cartel) and monopolizing. The Clayton Act adds a preventive tool: stop a merger before it "substantially lessen[s] competition." Econlib notes the Sherman Act "defines neither the practices that constitute restraints of trade nor monopolization," so courts and agencies have filled in the details.</p>
<p><b>A key limit.</b> Your textbook: "Under U.S. antitrust laws, monopoly itself is not illegal." A patent holder or a firm that wins customers "by producing a better product at a lower price" breaks no law.</p>
<div data-check="l36c-law"></div>

<h2>Illegal agreements and restrictive practices</h2>
<!-- src: OS112 ("it is illegal for competitors to form a cartel to collude ... prohibit firms from agreeing to fix prices or output, rigging bids, or sharing or dividing markets"; vitamin cartel: Hoffman-La Roche, BASF, Rhone-Poulenc; $500 million fine; four months jail; restrictive practices: minimum resale price maintenance illegal, may "suggest" prices; exclusive dealing legal or illegal; tying; bundling; predatory pricing, average variable cost rule; Microsoft case, settled 2002); ELAT ("Economists remain almost unanimous in condemning all horizontal price-fixing"). -->
<p>The clearest violation is a cartel. Your textbook: the FTC and Justice Department "prohibit firms from agreeing to fix prices or output, rigging bids, or sharing or dividing markets." Its example: a 1990s vitamin cartel whose leader paid a $500 million fine, with a top executive jailed.</p>
<p>Harder cases are ${dt('restrictive-practices','<b>restrictive practices</b>')}: deals that are not outright price fixing but "might have the effect of reducing competition."</p>
${FIG7.l36rules()}
<p><b>Worked example: your course textbook\'s Microsoft case.</b> Microsoft\'s Windows had a near-monopoly. Regulators argued it used that power to win the browser market, by ${dt('tying-sale','tying')} Internet Explorer to Windows and threatening computer makers who installed a rival browser. In 2000 a court ordered a breakup; on appeal that was overturned, and in 2002 Microsoft settled by agreeing to end the practices.</p>
<p>Check: the charge was the tactics, not the near-monopoly itself, consistent with "monopoly itself is not illegal."</p>
<p><b>So what:</b> on the exam, an agreement among rivals on price or output is illegal; a big market share by itself is not. ${dt('predatory-pricing','Predatory pricing')} is illegal but hard to tell apart from ordinary competition. Your textbook (§11.2) asks of a firm that cuts its price to match a new entrant: "is this predatory pricing? Or is it just market competition at work?"</p>
<div data-check="l36c-practice"></div>

<h2>Mergers and measuring concentration</h2>
<!-- src: OS111 (merger, acquisition; FTC notification over $70.9 million (2013); allow, prohibit or allow with conditions: Johnson & Johnson had to sell six brands; "The U.S. government approves most proposed mergers"; FTC: "Most mergers actually benefit competition and consumers by allowing firms to operate more efficiently"; concentration ratio and Table 11.1; HHI Work It Out: 10,000; 100; 744; 2,000 vs 5,952; 1980s guideline: under 1,000 approve, over 1,800 challenge; market definition: Microsoft 14% of all software in 2014; globalization; Whole Foods and Wild Oats); ELAT ("the percentage of sales accounted for by the four largest firms in the industry"; merger guidelines "have deemphasized concentration"). -->
<p>A ${dt('merger','<b>merger</b>')} joins two firms into one (an acquisition is one buying the other). Large ones must be reported to the FTC, which with the Justice Department can allow, block, or allow with conditions. Your textbook stresses that "The U.S. government approves most proposed mergers," quoting the FTC: "Most mergers actually benefit competition and consumers by allowing firms to operate more efficiently."</p>
<p>To spot the risky ones, regulators measure how concentrated a market is. Two tools:</p>
<div class="math">${dt('conc-ratio','Four-firm concentration ratio')} = sum of the four largest firms\' market shares<br>${dt('hhi','Herfindahl-Hirschman Index (HHI)')} = sum of every firm\'s market share, squared</div>
<p><b>Worked example: your course textbook\'s windshield market.</b></p>
${FIG7.l36ws()}
<p>Check: an HHI of 744 is well under the old 1,000 cutoff, and a ratio of 40 means the top four hold less than half the market: competitive by either measure.</p>
<p><b>Why square?</b> Because the ratio can hide a giant. Your textbook\'s two industries both have a ratio of 80:</p>
${FIG7.l36same()}
<p>Try the textbook\'s markets below, and see what merging the two largest firms does to each measure.</p>
<div data-widget="hhi"></div>
<p>What to notice: a merger of two small firms barely moves either number, while merging the leaders jumps the HHI. The rise in the HHI is always 2 × (one share) × (the other).</p>
<p><b>So what:</b> in the 1980s the FTC probably approved mergers leaving an HHI under 1,000 and probably challenged those over 1,800. Your textbook adds that regulators now rely less on these numbers and more on evidence about actual competition, partly because how a "market" is defined changes every measure.</p>
<div data-check="l36c-hhi"></div>

<h2>Regulating natural monopolies</h2>
<!-- src: OS113 ("Most true monopolies today in the U.S. are regulated, natural monopolies"; definition; water pipes; Figure 11.3 and Table 11.3: A = 4 units at 9.3; B = 2 units each at average cost 9.75 vs 7.75 for 4; C = 8 units at 3.5, average cost 5.7, losses unless "an ongoing public subsidy"; F = 6 units at 6.5, "Perhaps the most plausible option"; cost-plus regulation; price cap regulation: "If the firm can find ways of reducing its costs more quickly than the price caps, it can make a high level of profits"; "It will not work if the price regulators set the price cap unrealistically low"). Same figure as Lesson 26 (FIG5.l26natBare). -->
<p>Your textbook: "Most true monopolies today in the U.S. are regulated, ${dt('natural-monopoly','natural monopolies')}," where average cost keeps falling across the market\'s whole demand. Lesson 26 drew the choices; here is the same picture.</p>
${FIG7.l36nm()}
<div class="math">Split it (B): average cost rises from $7.75 to $9.75 → <b>worse</b><br>Price = marginal cost (C): $3.50 < average cost $5.70 → loses $2.20 a unit → <b>needs a subsidy</b><br>Price = average cost (F): $6.50, 6 units → covers costs, normal profit → <b>the usual choice</b></div>
<p>Check: F has a lower price and more output than the unregulated monopoly at A (4 units at $9.30), so consumers gain.</p>
<p>How do regulators find F in practice? Two methods:</p>
${FIG7.l36cap()}
<p><b>So what:</b> for a natural monopoly the answer is "regulate the price," not "break it up." And how you regulate matters: ${dt('cost-plus','cost-plus')} weakens the drive to cut costs, while a ${dt('price-cap','price cap')} rewards it.</p>
<div data-check="l36c-reg"></div>

<h2>When regulation goes wrong: capture and deregulation</h2>
<!-- src: OS114 (CAB 1938-1978 "approved all fares, controlled all entry and exit"; "zero entry of new airlines on the main routes across the country for 40 years"; Airline Deregulation Act 1978; fares down "about one-third over the next two decades"; half to two-thirds full; passengers doubled; "regulatory capture, in which the firms supposedly being regulated end up playing a large role in setting the regulations that they will follow"; appointees, lobbyists, information, jobs; "a way for existing competitors to work together to reduce output, keep prices high, and limit competition"; deregulation's negatives: bankruptcies, layoffs; financial crisis and Dodd-Frank). -->
<p>Regulation can fail too. Your textbook names the main risk ${dt('regulatory-capture','<b>regulatory capture</b>')}: "the firms supposedly being regulated end up playing a large role in setting the regulations that they will follow."</p>
${FIG7.l36capture()}
<div class="analogy"><div class="eyebrow">Analogy</div><p>Regulatory capture is like letting a sports team pick the referees, train them and offer them jobs after they retire. Every call might still look official, but over time the calls drift toward the team.</p></div>
<p><b>Worked example: your course textbook\'s airlines.</b> From 1938 to 1978 the Civil Aeronautics Board set fares and routes and let no new airline onto the main routes. Then Congress deregulated.</p>
${FIG7.l36air()}
<p>Check: lower fares and fuller planes are what Unit 5 predicts when entry opens a market to competition.</p>
<div data-check="l36c-capture"></div>
<p><b>So what:</b> regulation fits natural monopolies; where competition can work, removing price and entry controls can help consumers. The textbook is balanced: deregulation also brought bankruptcies and layoffs, and the 2008 financial crisis left "many Americans ... disenchanted with deregulation, at least of financial markets."</p>

<h2>Which policy fits?</h2>
<!-- src: OS111-OS114, MS5. Exam skill: decide whether the problem is anticompetitive behavior (antitrust), a natural monopoly (regulation), or neither (legal). -->
<p>CLEP questions here ask which policy fits a situation. Ask: (1) Is there an agreement among rivals or a merger that cuts competition? Antitrust. (2) Would one firm serve the market more cheaply than several? Regulate the price. (3) Is the firm just big because it is better, or holding a patent? Usually legal.</p>
<div data-widget="polsort"></div>
<p>What to notice: the policy follows the cause of the market power, not its size.</p>
<div data-check="l36c-skill"></div>

<h2>Common mistakes</h2>
<!-- Entries in order are M1-M6 (see L36TAGS mis). -->
<div class="mistakes u6num"><p class="eyebrow">Watch out for these (M1, M2 ... in the explanations point here)</p><ul>
<li><span class="wrong">"Having a monopoly is illegal."</span>Monopoly itself is not illegal; anticompetitive agreements and tactics are.</li>
<li><span class="wrong">"Antitrust regulators block most mergers."</span>Most are approved; the FTC says most mergers help consumers through efficiency. Regulators look for the ones that cut competition.</li>
<li><span class="wrong">"Breaking up a natural monopoly lowers costs."</span>It raises average cost, because average cost falls with size over the whole market.</li>
<li><span class="wrong">"Regulators should make a natural monopoly charge price = marginal cost."</span>That is efficient but below average cost, so the firm loses money without a subsidy. Price = average cost is the usual choice.</li>
<li><span class="wrong">"The four-firm ratio tells you everything; the HHI adds nothing."</span>Two industries with the same ratio can have very different HHIs (2,000 vs 5,952), because squaring weights big firms.</li>
<li><span class="wrong">"Regulation always protects consumers."</span>Regulators can be captured by the industry, and cost-plus rules weaken the drive to cut costs.</li>
</ul></div>

<h2>Recap</h2>
<div class="callout">
<ol>
<li>Government <b>promotes competition</b> because market power restricts output and raises price above marginal cost.</li>
<li>The <b>Sherman Act</b> (1890) outlawed cartels and monopolizing; the <b>Clayton Act</b> (1914) outlawed mergers that substantially lessen competition, some price discrimination and tying; the FTC and Justice Department enforce them.</li>
<li><b>Price fixing</b> is illegal; <b>restrictive practices</b> such as tying and predatory pricing can be; monopoly itself is not.</li>
<li>Regulators measure concentration with the <b>four-firm ratio</b> (windshields: 40) and the <b>HHI</b> (744); most mergers are approved.</li>
<li><b>Natural monopolies</b> are regulated rather than split, usually at price = average cost, by cost-plus or price cap rules.</li>
<li><b>Regulatory capture</b> can turn regulation against consumers; airline deregulation cut fares by about one-third.</li>
</ol>
<p><b>How the CLEP tests this:</b> the outline lists "Antitrust policy" and "Regulation" under Public policy to promote competition (Market Failure and the Role of Government, 8% to 14% of the exam). Expect a question asking which policy fits a natural monopoly (price regulation, not a breakup), what antitrust laws prohibit, or how a regulated price compares with the monopoly outcome.</p>
</div>`,
  deeper:`
<h3>Public ownership</h3>
<p>Your course\'s slide 223 lists public ownership as a third option: government runs the natural monopoly itself, as many cities do with water. It removes the profit motive, but also the pressure to keep costs down. Lesson 26 covers it briefly; the CLEP outline names antitrust and regulation.</p>
<h3>Skeptics of antitrust</h3>
<p>Econlib\'s McChesney reports that many economists have grown more skeptical of some antitrust cases, arguing that rivals sometimes use the laws to win in court what they lost in the market. Your textbook makes a similar point: "competitors who are losing out in the market can accuse successful firms of anticompetitive restrictive practices."</p>
<h3>Vertical and conglomerate mergers</h3>
<p>A horizontal merger joins rivals; a vertical merger joins a firm with its supplier or customer; a conglomerate merger joins unrelated businesses. The Celler-Kefauver Act (1950) brought the last two under the Clayton Act.</p>`,
  links:[ {k:'Textbook',t:'11.1 Corporate Mergers',s:'OpenStax, Principles of Economics 3e (free online)',u:'https://openstax.org/books/principles-economics-3e/pages/11-1-corporate-mergers',w:'The newer edition of your course textbook\'s §11.1: antitrust history, concentration ratios and the HHI. Wording and some numbers may differ from your 2016 edition.'},
          {k:'Article',t:'Antitrust',s:'Econlib, Concise Encyclopedia of Economics (Fred S. McChesney)',u:'https://www.econlib.org/library/Enc/Antitrust.html',w:'A short history of the Sherman and Clayton Acts and the debate over how much antitrust helps consumers.'} ]
});

u7xv({
  'l36-why':[FIG7.l36why(), ''], 'l36c-why':[FIG7.l36why(), ''], 'l36-sherman':[FIG7.l36laws(), ''], 'l36-clayton':[FIG7.l36laws(), ''], 'l36-standard':[FIG7.l36laws(), ''], 'l36-ftc':[FIG7.l36laws(), ''], 'l36c-law':[FIG7.l36laws(), ''],
  'l36-tf-mono':[FIG7.l36rules(), ''], 'l36-cartel':[FIG7.l36rules(), ''], 'l36-rpm':[FIG7.l36rules(), ''], 'l36-tying':[FIG7.l36rules(), ''], 'l36-predatory':[FIG7.l36rules(), ''], 'l36c-practice':[FIG7.l36rules(), ''], 'l36-vitamin':[FIG7.l36rules(), ''], 'l36-microsoft':[FIG7.l36rules(), ''],
  'l36-merge2':[fig(atable(['','Top four shares','CR4'], [['Before','16 + 10 + 8 + 6','40'],['After the top two merge','26 + 8 + 6 + 6','<b>46</b>']], { cls:'u7t compact', hl:{1:{row:'u3z2'}} }), 'Marked up: the merged firm counts once, and another 6% firm joins the top four.'), ''],
  'l36c-hhi':[fig(`<div class="qg" style="max-width:360px">${ubars([50,30,20], { labels:['A','B','C'], ylab:'Market share (%)', xlab:'Firm', ymax:100, colorOf:()=>'var(--accent)' })}</div>`, 'Marked up: 50² + 30² + 20² = 2,500 + 900 + 400 = 3,800.'), ''],
  'l36-guide':[fig(numline({ min:0, max:3000, regions:[[0,1000,'Approve','var(--accent-soft)'],[1000,1800,'Case by case','var(--g2-soft, #f3e3b5)'],[1800,3000,'Challenge','#f2c4c4']], points:[[2400,'2,400']], ticks:[0,1000,1800,3000] }), 'Marked up: the 1980s FTC zones; 2,400 falls in the challenge zone.'), ''],
  'l36-natreg':[FIG7.l36nm(), ''], 'l36-mc-loss':[FIG7.l36nm(), ''], 'l36c-skill':[FIG7.l36nm(), ''], 'l36-pricecap':[FIG7.l36cap(), ''],
  'l36-market':[fig(`<div class="u2row"><div class="u2cell">${hbars([['Share of premium organic groceries',60,'var(--bad)'],['Share of all groceries',3,'var(--accent)']], { max:70, left:200, fmt:v=>v+'%' })}</div></div>`, 'Made-up shares for one chain: the narrow market makes it look dominant; the broad market makes it look small.'), '']
});
u7cv('l36', {});
