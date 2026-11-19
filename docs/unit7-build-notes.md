# Unit 7 build notes (Market Failure and the Role of Government)

Started 2026-11-19 from Eli's Unit 7 build prompt (email "Re:" 2026-11-19 07:40), the Golden Standard rubric (docs/lesson-rubric.md) and the Unit 2-6 decisions.
Base = live artifact version 1794512096-47ca, byte-identical to index.html at GitHub main 2c467c6 (sha256 05fabcd5…). Tag push was refused by the proxy, so the baseline is recorded by commit hash.
Source files: `src/unit7/` (head7.js, l33.js … l37.js, widgets7.js, quiz7.js, unit7card.js, u7.css, build.py). `python3 src/unit7/build.py BASE OUT`; every patch must match exactly once.

## Decisions (Eli, 2026-11-19)
- Go-live: GitHub backup first; publish straight to live once every gate passes; if blockers remain, stop and show him.
- Extras: keep 16 "More practice" per lesson; they join Review only via "Add to Review" (already how the live page works since Review upgrades 4).
- Textbook: Eli attached the 48 MB textbook zip directly (Drive connector caps downloads at 10 MB).
- Audits: independent reviewers, no cap on rounds.
- Rubric: not attached; the repo copy docs/lesson-rubric.md (same one Units 2-6 used).
Reused without asking (settled for Units 2-6): 12 core + 16 more per lesson; T/F items test a Common-mistakes belief; numeric explanations name the typical wrong answer; five-choice quiz, submit-then-reveal, separate pool; numeric choices smallest to largest; graph answer choices for choose-a-graph skills; explanation visuals; card pictures.

## Inputs
- Modern States: transcripts 7.1 (Externalities), 7.2 (Public Goods), 7.3 (Income Distribution); Module 7 slides (PDF pages 1-29; printed slide numbers 256-265 for 7.1, the rest unnumbered).
- No course content-mapping PDF in the zips (overview pages list modules only). Reading mapping is my inference: OS ch. 12 (§12.1-12.3), ch. 13 (§13.1, §13.3), ch. 14 (§14.1-14.5); ch. 11 for antitrust and regulation, which Modern States Module 7 does not teach.
- Official CLEP outline (clep.collegeboard.org/exam/microeconomics, opened 2026-11-19): Market Failure and the Role of Government 8%-14%: Externalities (MSB and MSC; positive; negative; remedies) · Public goods and private goods (excludability, rivalry, free-rider problem; provision of public goods) · Public policy to promote competition (antitrust policy; regulation) · Income distribution (income inequality; sources of income inequality; Lorenz curve and Gini coefficient). Sample question 7 (externalities, key B) uses MSC vs MPC wording.

## Lesson map
| Lesson | Title | Modern States | Textbook | CLEP |
|---|---|---|---|---|
| l33 | Externalities: Private and Social Costs and Benefits | video 7.1 first part, slides 256-260 | §12.1, §13.1 | MSB/MSC, positive, negative |
| l34 | Fixing Externalities: Taxes, Subsidies, Regulation and Permits | video 7.1 second part, slides 261-265 | §12.2, §12.3, §13.2 | remedies |
| l35 | Public Goods, Common Resources and the Free-Rider Problem | video 7.2, Module 7.2 slides | §13.3 | excludability, rivalry, free rider; provision |
| l36 | Antitrust Policy and Regulation | none (Module 5 slide 223 lists antitrust as a way to deal with monopoly) | §11.1-§11.4 | antitrust; regulation |
| l37 | Income Inequality, Poverty, the Lorenz Curve and the Gini Coefficient | video 7.3, Module 7.3 slides | §14.1-§14.5 | income inequality; sources; Lorenz and Gini |
L36 is inserted between the Modern States 7.2 and 7.3 material, in CLEP outline order, because Modern States has no video on it.

## Source gaps found
- 2016 textbook has no "Gini coefficient" (only the Lorenz curve, §14.4); Gini taught from FRED (World Bank series note) and BEA primer (Hood, Aug 2025).
- 2016 textbook does not mention the negative income tax; taught from Econlib (Jodie Allen).
- Textbook never says "marginal social cost/benefit"; CLEP outline and sample Q7 use the terms; FRBSF Dr. Econ gives Private + External = Social costs.
