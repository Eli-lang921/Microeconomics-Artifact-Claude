---
title: Micro CLEP Lesson Rubric (Golden Standard)
created: 2026-10-21
updated: 2026-10-22
tags: [clep, microeconomics, rubric, golden-test-case]
---

# Micro CLEP Lesson Rubric (Golden Standard)

## How to use this rubric

Every lesson and unit in the Microeconomics CLEP workbook must pass the 8 must-pass gates and score at least 85 out of 100 before it ships. Lesson 4 (Economic Systems) is the reference example, graded at the end of this doc.

**Model-agnostic by design.** Any AI model or a human can build or audit with this rubric. It names no model, tool or feature. Each rule is checkable from the lesson text, the sources and the question bank alone. Where a step needs web access, the builder either lets the model browse or pastes the sources in.

**Inputs every build needs** (paste them if the model can't fetch them):

1. The Modern States video transcript and reading for that lesson (the skeleton).
2. The matching sections of 3 to 5 cross-reference sources (see Source rules).
3. The official CLEP Principles of Microeconomics outline section the lesson covers.
4. This rubric, plus Lesson 4's text as the style example.

**Order of work:** Lesson 4 is done and is the golden reference (graded below). Build new units next, then bring Lessons 1 to 3 and 5 up to this standard.

**Precedence when sources disagree:** CLEP outline and textbook precision win over the course's wording. Note the difference in the lesson when it could cost a point on the exam.

## Must-pass gates

A lesson that fails any gate fails the audit, whatever its score. Fix the gate first, then score.

| # | Gate | Fails when |
| --- | --- | --- |
| G1 | Factual accuracy | Any definition, number, graph direction or example contradicts the CLEP outline or the textbook |
| G2 | Modern States skeleton | Topics are missing, added out of Modern States order, or the lesson doesn't cite which video and reading it follows |
| G3 | 3 to 5 cross-references | Fewer than 3 independent sources were checked, or the lesson's source line doesn't name them |
| G4 | Every question is sourced | Any quick check, practice or quiz question lacks a source tag, or tests a fact not in the lesson or its sources |
| G5 | Mechanism explained | Any concept is stated without the why (cause, chain of steps, or trade-off behind it) |
| G6 | Nothing stands alone | Any graph, table, number, widget or bolded term appears with no explanation of what it shows |
| G7 | One correct answer | Any question has two defensible answers, or a keyed answer that is wrong |
| G8 | Widget math is right | Any widget number, slope, label or shift direction is wrong when recomputed |

## Required lesson anatomy

Every lesson has these parts in this order, copied from Lesson 4's structure. Parts marked (each section) repeat inside every teaching section.

1. **Header:** title, minutes estimate, one-line summary that states the core idea in plain words, and a source line naming the Modern States video, reading and every cross-reference used.
2. **Bridge:** one or two sentences linking to the previous lesson ("Lesson 1 showed that resources are scarce...").
3. **Teaching sections,** in Modern States order. Each section contains:
    1. A heading that names the idea, not a pun.
    2. The concept in plain words, with every new term tap-to-define on first use.
    3. The mechanism: why it works, as a chain of cause and effect (see Explanation rules).
    4. At least one analogy per lesson, placed where the idea is hardest.
    5. A worked example with real or clearly labeled made-up numbers, math shown step by step.
    6. A widget, table or graph only where it shows something prose can't, always with text that says what to notice.
    7. A quick check (each section): 1 or 2 questions on that section only.
4. **Exam-skill section:** one section that practices a test move, like Lesson 4's "Which market is it?" sorter.
5. **Common mistakes box:** 4 to 6 misconceptions, each as "wrong belief" then the correction and why.
6. **Recap:** 3 to 6 numbered points, one per teaching section, plus a "How the CLEP tests this" line naming the outline topic and the typical question shape.
7. **Go deeper (optional, collapsed):** extensions not needed for the exam, clearly labeled as such.
8. **Practice set:** 6 to 8 core questions on the page, more behind "More practice".
9. **Further reading:** 1 to 3 links, each with one line on why to open it.

## Source rules

Modern States is the skeleton; 3 to 5 other sources check and fill it. The skeleton decides what is taught and in what order. Cross-references decide whether it is right and complete.

**Skeleton rules**

- Lessons follow Modern States module and video order. The 7 modules are Basic Economic Concepts, Supply and Demand, Consumer Choice, Production and Costs, Firm Behavior and Market Structure, Factor Markets, and Market Failure and the Role of Government ([Modern States](https://modernstates.org/course/principles-of-microeconomics/)).
- Use as much Modern States content as possible: its examples, numbers and terms come first. Swap in another source's example only when the Modern States one is wrong or missing.
- Every Modern States topic in the video or reading appears in the lesson. Nothing from outside the CLEP outline is added to the main body; it goes in Go deeper.

**Approved cross-references** (use at least 3 per lesson)

| Source | Use it for | Link |
| --- | --- | --- |
| College Board CLEP Principles of Microeconomics outline and sample questions | Required for every lesson: topic scope, weights, question style | [CLEP exam page](https://clep.collegeboard.org/exam/microeconomics) |
| OpenStax Principles of Microeconomics (the Modern States course textbook, 2016 edition; quote from this edition, and use the free 3e online only for links) | Definitions, worked examples, textbook precision | [OpenStax](https://openstax.org/books/principles-microeconomics/pages/preface) |
| Khan Academy AP/College Microeconomics | Second explanation, practice question styles | [Khan Academy](https://www.khanacademy.org/economics-finance-domain) |
| College Board AP Microeconomics Course and Exam Description | Learning objectives, common graph conventions | [AP CED (PDF)](https://apcentral.collegeboard.org/media/pdf/ap-microeconomics-course-and-exam-description.pdf) |
| Econlib and Federal Reserve Education | Short articles, diagrams, history (Smith, Ricardo, Hardin) | [Econlib](https://www.econlib.org/) |
| Marginal Revolution University (Cowen and Tabarrok) | Free video explanations of the same topics | [MRU course announcement](https://marginalrevolution.com/marginalrevolution/2015/01/mru-new-course-principles-of-microeconomics.html) |

**Conflict rule:** when sources disagree, the CLEP outline and OpenStax win over course wording. Note the difference in the lesson if it could change an exam answer, as Lesson 4 does with its ownership grid.

**Source tags:** every paragraph-level fact and every question carries a short tag in the code, such as `src: MS 1.4a; OS 2.1`. The lesson's source line lists every source behind those tags. A fact with no tag fails gate G4 or G1.

**Unverified material:** if the builder can't open a source, the lesson says so in its notes. A model never cites a page it did not read.

## Explanation rules

A lesson explains why, not just what: every concept needs its mechanism, and every exhibit needs words that say what it shows.

**The mechanism test.** For each concept, the lesson answers three questions in plain words:

1. **What is it?** A one-sentence definition.
2. **Why does it happen?** The cause, as a chain of steps. Lesson 4's tragedy of the commons does this: each fisher keeps the full $5 gain but pays only $0.80 of the $8 cost, so everyone overfishes.
3. **So what?** What changes on a graph, in a decision or on the exam.

A concept that stops after step 1 fails gate G5.

**Exhibit rules** (graphs, tables, data, widgets)

- **Before:** one sentence says what the exhibit is for ("Build the diagram one piece at a time").
- **After:** one or two sentences say what to notice ("Money always moves opposite to the stuff").
- Every axis, row and column is labeled with units.
- Every number in a table is either explained in the text or used in a worked example.

**Worked example rules**

- Use Modern States numbers first; otherwise label numbers "made-up numbers".
- Show each step of math on its own line, ending with the bolded answer.
- Check the answer against the concept in one sentence (Lesson 4: "Income equals spending").

**Plain-language rules**

- Sentences under about 25 words. Define every term on first use.
- No em dashes, hype words or filler.
- Flag traps directly ("Watch out for capital: in economics it means tools, not money").

## Questions and CLEP alignment

Every question must look like a CLEP question, test something the lesson taught, and trace to a named source.

**CLEP facts to align to.** The exam has about 80 questions in 90 minutes and tests four skills: understanding terms and concepts, reading and manipulating graphs, interpreting data, and applying simple models ([College Board](https://clep.collegeboard.org/exam/microeconomics)). Each lesson tags its questions with one of these four skills.

**Quick checks (each section)**

- 1 or 2 questions after every teaching section, on that section only.
- At least one per lesson applies the idea to a new scenario, not a recall of the lesson's own example (Lesson 4's orange-frost question does this).
- Shown inline, not scheduled for spaced review.

**Practice and quiz questions**

- Five choices (A to E), short "Which of the following" stems, matching College Board samples.
- Mix per lesson: at least 2 recall, 2 application, 1 graph or table, 1 calculation when the topic has numbers.
- Every wrong choice is a real misconception, not filler. At least 2 choices per question map to items in the Common mistakes box.
- The explanation says why the right answer is right and why the most tempting wrong answer is wrong.
- True/false items are allowed for practice only, never in the unit quiz.

**Source tagging**

- Each question carries a source tag (`src:`) and a CLEP outline tag (`clep: Economic systems`).
- A question may only test a fact that appears in the lesson body or its tagged source.
- Answers involving math are recomputed before shipping, and the correct-answer position is randomized unless order matters (as in Lesson 4's profit question).

## Tap-to-define, common mistakes and recap

These three features exist to catch confusion early; each has a fixed spec so every lesson looks and works the same.

**Tap-to-define terms**

- Every new economics term is tappable on its first use in each lesson. Terms from earlier lessons are tappable on first use too, with "(from Lesson N)".
- Tapping shows a short popover: a one-sentence definition, plus one example when the definition alone is abstract.
- Definitions come from one shared glossary, so a term reads the same in every lesson. Each glossary entry carries a source tag.
- Works by tap on phone and by click or keyboard on desktop; closes on a second tap or Escape.
- The static term lists (like Lesson 4's "main systems" list) stay; tap-to-define is added on top.

**Common mistakes box**

- A visually distinct box (its own color and label), not a plain term list.
- 4 to 6 entries, each written as the wrong belief in quotes, then the correction, then one clause of why.
- Each entry maps to at least one wrong answer choice in the lesson's questions.
- Sourced: from the textbook's warnings, Modern States' tips, or real misses logged in the workbook's report tab.

**Recap**

- 3 to 6 numbered points, one per teaching section, each a full sentence with its key term bolded.
- Ends with "How the CLEP tests this": the outline topic name and the 1 or 2 question shapes to expect.
- Contains nothing that wasn't taught above.

## Widget accuracy checks

A widget passes only when all four checks pass; any wrong number or shift direction fails gate G8.

| Check | What to verify | How |
| --- | --- | --- |
| Math recomputed | Every readout, slope, total and answer key | Run the widget's formulas at 3 settings (low, middle, high) and compare with hand-computed or script-computed values. Never check by eye. |
| Graph conventions | Axes (price up, quantity across), labels, curve shapes, shift directions, intersection points | Compare with the same graph in OpenStax and the CLEP or AP materials. A shift right means an increase. |
| Explained in text | A sentence before (what it's for) and after (what to notice) | Read the lesson with the widget removed; the point must still come through. |
| Edge cases tested | Sliders at min and max, wrong-answer feedback, reset, phone width (about 375 px), dark mode, keyboard use | Try each case; nothing overlaps, goes negative where it can't, or shows NaN. |

**Every widget also has:** a title, a one-line hint on how to use it, feedback that explains wrong answers, and values that match the lesson's worked example when it uses the same scenario.

**Record the check.** Each widget gets a one-line test note in the code: settings tried, expected values, date checked. The audit compares against these notes.

## Scored criteria (pass = 85 of 100)

After all 8 gates pass, score each criterion. Use the full range: half credit when the item is present but partly done, zero when it is missing.

| Criterion | Points | Full credit when | Half credit when |
| --- | --- | --- | --- |
| Mechanism depth | 20 | Every concept answers what, why and so what | Most concepts do; 1 or 2 stop at the definition |
| Source fidelity | 15 | Modern States order and examples kept; 3 to 5 sources tagged throughout | Sources named but some facts untagged |
| Question quality | 15 | CLEP format, skill-tagged mix, misconception-based distractors, full explanations | Format right but weak distractors or thin explanations |
| Quick checks | 10 | Every teaching section has one; at least one applies to a new scenario | Most sections have one |
| Worked examples | 10 | At least one per major concept, step-by-step math, sense-check line | Present but steps skipped or unchecked |
| Widgets and exhibits | 10 | All four widget checks recorded; every exhibit has before and after text | Checks partly recorded, or one exhibit unexplained |
| Tap-to-define | 5 | Every new term on first use, from the shared glossary | Key terms only |
| Common mistakes box | 5 | 4 to 6 entries, distinct box, mapped to wrong choices | Present as a plain list or unmapped |
| Recap | 5 | One point per section plus "How the CLEP tests this" | Missing the CLEP line or a section |
| Style and readability | 5 | Plain words, short sentences, analogy where hardest, no filler | Minor lapses |

**Scoring bands:** 95 to 100 is golden (a new reference example). 85 to 94 ships. 70 to 84 needs one revision pass. Below 70 needs a full revision; rebuild from the skeleton only when G1 or G5 failed.

**Audit output:** gate results (pass or fail with the line that failed), each criterion's score with a one-line reason, and the top 3 fixes ranked by points recovered.

## Unit-level rules

A unit passes when every lesson passes and the unit as a whole covers its CLEP outline topics in Modern States order.

**Unit map to the CLEP outline** (weights from [College Board](https://clep.collegeboard.org/exam/microeconomics))

| Unit (Modern States module) | CLEP weight | Main outline topics |
| --- | --- | --- |
| 1. Basic Economic Concepts | 10% to 16% | Scarcity and opportunity cost, PPC, comparative advantage, economic systems, property rights and incentives, marginal analysis |
| 2. Supply and Demand | 15% to 20% | Equilibrium, determinants, price and quantity controls, elasticity, surplus and efficiency, tax incidence and deadweight loss |
| 3. Theory of Consumer Choice | 5% to 10% | Total and marginal utility, utility maximization, demand curves, income and substitution effects |
| 4. Production and Costs | 10% to 15% | Short and long run, diminishing returns, cost curves, economies of scale, cost-minimizing inputs |
| 5. Firm Behavior and Market Structure | 23% to 33% | Profit, perfect competition, monopoly, oligopoly and game theory, monopolistic competition |
| 6. Factor Markets | 6% to 12% | Derived demand, marginal revenue product, labor market and hiring |
| 7. Market Failure and the Role of Government | 8% to 14% | Externalities, public goods, antitrust and regulation, income distribution, Lorenz curve and Gini |

**Unit rules**

1. **Coverage check:** every subtopic in that unit's outline row maps to at least one lesson section. List the map at the top of the unit.
2. **Depth follows weight:** Unit 5 gets the most lessons and questions; Unit 3 the fewest.
3. **Unit quiz:** 5-choice questions only, a separate pool from lesson questions, sized at least 2 questions per outline subtopic.
4. **Flashcards:** every glossary term introduced in the unit gets a card with front, answer, example and a common mistake.
5. **Writing prompt:** at least one per unit, with a checklist rubric.
6. **Shared glossary:** new terms are added once; later units reuse the same definitions.
7. **Cross-unit bridges:** each unit's first lesson links back to the earlier unit it builds on, as Lesson 4 previews Units 2 to 7.

## Lesson 4 graded as the reference

Lesson 4 passes all 8 gates and scores 100 of 100 on a self-audit dated 2026-10-22, after it was rebuilt from the Modern States video 1.4a transcript, Module 1 slides 26 to 33 and the course textbook §1.3 to §1.4. This grade was given by the builder, so confirm it with the Audit prompt in a fresh chat before treating it as final.

**Gates**

| Gate | Result | Why |
| --- | --- | --- |
| G1 Accuracy | Pass | Every textbook quote matches the course textbook word for word; bakery math checks ($1,500 − $1,000 − $200 − $100 = $200) |
| G2 Modern States skeleton | Pass | Sections follow video 1.4a: definition and three questions, property rights, ownership/allocation grid, circular flow. The course content map PDF was not available to confirm assigned reading pages |
| G3 Cross-references | Pass | Course textbook, CLEP outline, Federal Reserve Education, Econlib (3 entries) and tutor2u, all named and linked in the header |
| G4 Sourced questions | Pass | All 40 questions carry source, CLEP topic and skill tags |
| G5 Mechanism | Pass | Property rights, commons, systems trade-offs, prices and circular flow each explain the why |
| G6 Nothing stands alone | Pass | Every table and widget has before and after text |
| G7 One correct answer | Pass | No double-answer items found |
| G8 Widget math | Pass | All four widgets tested at 375 px and 1100 px, light and dark; results recorded in code |

**Scores**

| Criterion | Score | Reason |
| --- | --- | --- |
| Mechanism depth | 20 / 20 | Every concept answers what, why and so what |
| Source fidelity | 15 / 15 | Modern States order and wording ("what, how much, who receives"); quotes from the course edition |
| Question quality | 15 / 15 | Every multiple-choice item has 2+ distractors from the mistakes box; every explanation covers the tempting wrong answer |
| Quick checks | 10 / 10 | 8 of 8 teaching sections |
| Worked examples | 10 / 10 | Fishing lake, orange frost, bakery circle |
| Widgets and exhibits | 10 / 10 | Four checks recorded per widget |
| Tap-to-define | 5 / 5 | 20 terms from the shared glossary |
| Common mistakes box | 5 / 5 | 6 entries in a distinct box, each mapped to wrong choices |
| Recap | 5 / 5 | One point per section plus "How the CLEP tests this" |
| Style and readability | 5 / 5 | Plain words, two analogies |

**Expected results for golden testing** (any audit of Lesson 4 should find these; a missing one means the lesson or the audit drifted)

| Check | Expected |
| --- | --- |
| Section order | Definition → property rights → grid → textbook's four systems → prices → circular flow → bakery → which market |
| Quick checks | 1 or 2 after each of 8 teaching sections |
| Tap-to-define | 20 terms, all in the glossary |
| Mistakes box | 6 entries |
| Question tags | 40 of 40 tagged |
| Bakery widget at max costs | Profit −$1,000, income $1,000 |
| Circular flow direction | Goods firms → households; spending households → firms |

**Known limits**

1. Self-graded: run the Audit prompt in a fresh chat or with another model.
2. The prices section rests on tutor2u (an A-level revision site), because the course materials don't cover it.
3. Assigned reading pages are assumed to be §1.3 to §1.4 until the course content map is checked.

## Copy-paste prompts (any model)

These two prompts work in any chat model; paste this whole rubric above them, then fill the brackets.

**Build prompt**

```
You are building one lesson for a Microeconomics CLEP study workbook.

Follow the rubric above exactly. Lesson 4's text (pasted below) is the style example.

Inputs:
- Lesson: [unit number, lesson number, title]
- Modern States transcript and reading: [paste]
- CLEP outline topic(s): [paste the matching outline lines]
- Cross-reference excerpts (3 to 5 sources, each labeled): [paste or say "browse and cite"]
- Previous lesson's title and one-line summary: [paste]

Rules:
1. Use Modern States as the skeleton: its order, examples and numbers first.
2. Check every fact against at least one cross-reference. Where they disagree, the CLEP outline and the textbook win; say so in the lesson.
3. Never invent a fact, number, quote or source. If a source wasn't provided or opened, say so.
4. Follow the Required lesson anatomy in order.
5. Tag every fact and question with src: and clep: tags.
6. For each widget, write the spec, the test settings and the expected values.

Output, in this order:
A. The lesson text with tags.
B. The question bank (quick checks, core practice, more practice).
C. New glossary entries.
D. A self-audit using the Audit prompt below.
```

**Audit prompt**

```
Audit the lesson below against the rubric above. You did not write it; grade it as a strict outside reviewer.

1. Check all 8 must-pass gates. For each: Pass, Fail or Unverified, with the exact line or item that decides it. Recompute every number yourself.
2. If any gate fails, list the fixes for it first.
3. Score each of the 10 criteria using full, half or zero credit, with a one-line reason. Use the full range.
4. Give the total out of 100 and its band.
5. List the top 3 fixes ranked by points recovered.
6. List anything you could not verify and what you would need to verify it.

Lesson: [paste]
Sources provided: [paste or list]
```

**Tip for unattended audits:** run the audit with a different model, or a fresh chat, from the one that built the lesson, so the work isn't grading itself.

## Sources

- [Modern States: Principles of Microeconomics](https://modernstates.org/course/principles-of-microeconomics/) (module list)
- [College Board: CLEP Principles of Microeconomics](https://clep.collegeboard.org/exam/microeconomics) (outline, weights, skills, length)
- [OpenStax: Principles of Microeconomics](https://openstax.org/books/principles-microeconomics/pages/preface)
- [Khan Academy: Economics](https://www.khanacademy.org/economics-finance-domain)
- [College Board: AP Microeconomics Course and Exam Description](https://apcentral.collegeboard.org/media/pdf/ap-microeconomics-course-and-exam-description.pdf)
- [Marginal Revolution: MRU Principles of Microeconomics](https://marginalrevolution.com/marginalrevolution/2015/01/mru-new-course-principles-of-microeconomics.html)
