# Microeconomics Workbook: audit log

This file lives in the GitHub repo and is the live copy (moved from the Claude Project on 2026-10-16). The weekly routine reads and updates it every run.
To approve a proposal: click the pencil icon on this file, change `[ ]` to `[x]` (apply) or `[-]` (reject), then click **Commit changes**.

## Next focus
Lesson 2

## Reports needing your input
- Card c-l2-5 (Bowed-out PPF) · Add a card that explains what "specialized" means · Question: Should I add it as described in the first proposal below? (Adding a card needs your OK.)
- Lesson 3, "Countries work the same way" · Show this with a graph; add graphs wherever the text mentions one · Question: Approve the two graph proposals below, and is there any other spot where you want a graph?
- Lesson 3 question l3-g-oc (Claude's explanation) · Give enough fraction and "Other goes Over" practice · Question: Do you want 4 new fixed problems in Lesson 3's extra practice (last proposal), or a drill that keeps giving new numbers until you get 5 right in a row?

## Pending proposals
- [x] Lesson 2 flashcards: add a new card at the end of the list, "Specialized resources": what it means that resources are better at making one good than another, with a boots-and-jackets example (your report on card c-l2-5).
- [x] Lesson 3 "Countries work the same way": add a small graph of Brazil's and the U.S.'s PPFs, wheat across and sugar cane up, so you can see Brazil's steeper line (your report on that section).
- [x] Lesson 2 "Why some PPFs are straight lines": add a small graph showing a straight PPF next to a bowed one (the text describes a picture but shows none).
- [x] Lesson 3 extra practice: add 4 new problems at the end of the list that use "Other goes Over" and "Other goes Under" with fractions (your report on l3-g-oc).
- [x] Lesson 1 "Resources for firms": list entrepreneurship as the fourth factor of production instead of "many textbooks add" it (the flashcards and questions already treat it as one of four, and so does the CLEP).

## Run history (newest first)
### 2026-10-28 · Review upgrades: skip, delete, 1-3 rating, practice counts as review (on request)
- Snapshots: before de29882, after 31b53f9 · Changes: https://github.com/Eli-lang921/microeconomics-artifact-claude/compare/de29882...31b53f9
- Live artifact version 1792786247-bda8 → 1793186535-a9d1 · Unit 3 staging (JmD52HyAjdCYJfgXoCdD6G) 1793153400-7d15 → 1793186559-74be (rebuilt from the patched live page with `src/unit3/build.py`).
- **Skip** button in review and practice sessions (questions and flashcards): not scored, left out of the session score, schedule unchanged, so a due item stays due. Disappears once you answer.
- **Delete** button in the same sessions: pick optional reasons (Too easy, Confusing, Not useful for the exam, Repetitive, Wrong or broken, Just don't like it) and add a note. The item leaves daily review, review ahead and the practice pools; it stays on its lesson page and still counts for lesson completion. New "Deleted (n)" list at the bottom of the Review tab with Restore. Saved in the progress record as `deleted`, so Claude can read what you dislike.
- **Rating 1-3** (1 worst, 3 best), optional, after answering any question and on the back of any flashcard; tap the same number to clear. Saved as `ratings`. Nothing uses it yet (future algorithm).
- **Practice counts as review:** a right answer in pick-a-unit/lesson practice, or on a lesson page, on an item due today now moves it up the ladder (1 → 3 → 7 → 21 → 60) and takes it off today's list, same as Due review. Before this, it stayed due. Items not yet due keep their dates; misses still come back tomorrow. "How the schedule works" text and the session-end message updated to match.
- Code: `src/review/patch.py` (12 exact-match patches, syntax-checked).
- Tested (Playwright, Chromium, page opened as a file with a copy of your progress): 80/80 checks on live and staging. Your record loads unchanged (132 due, 289 scheduled, same on old and new pages); skip leaves the schedule alone and keeps the item due; delete saves reasons, note and text, removes the item from due and practice, keeps it on its lesson, survives reload, and Restore brings it back; ratings save, clear and survive reload; practice moves due items up, leaves not-due items alone, and misses still reset; flashcards rate and delete; no horizontal scroll at 375 px with the delete box or rating open; light and dark checked. Not tested: the real claude.ai sync and touch devices.
- Progress record version 470 unchanged by both publishes. Reports: none handled.
- Known limit (unchanged): two devices editing within the same minute still means the newest copy wins.

### 2026-10-23 (evening) · Unit 2 visuals and 4 reports (on request)
- Snapshots: before d969441, after: this commit · Artifact version 1792778489-548b → 1792786247-bda8
- Added 30 static figures across Lessons 6-12 (schedules as curves, shifts, surplus/shortage, controls, elasticity range, Table 5.2 chart, revenue chart, income/cross-price sign lines, surplus areas, tax wedge, DWL, incidence). Source: `src/unit2/figs.js`.
- Fixed: l4-mktsoc and l4-capitalism are now typed answers checked by Claude (self-rating fallback when Claude checking is off).
- Fixed: l5-g-net deleted (Lesson 5 extra practice now 15).
- Fixed: l6-tastes now covered: the textbook's chicken and beef example added to the Tastes row of "What shifts demand."
- Progress record version 300 unchanged by the publish; Unit 1 still 60/60, Lesson 6 12/12, 4 writing answers.

### 2026-10-23 · Unit 2 added to the live workbook (on request, not the weekly routine)
- Snapshots: before 1db7387, after be2ce4e · Changes: https://github.com/Eli-lang921/microeconomics-artifact-claude/compare/1db7387...be2ce4e · Artifact version 1792714612-a048 → 1792778489-548b
- Added Lessons 6-12 (Supply and Demand) and the Unit 2 quiz (`#quiz2`, stored as `quiz2` in the progress doc). Built in a staging copy and audited by a separate agent first; findings and fixes are in `docs/unit2-build-notes.md`.
- Progress checked before and after publishing: record version 258 unchanged; all 5 Unit 1 lessons at 12/12, 163 review items (83 due), 4 writing answers, Unit 1 quiz data untouched.
- Reports: none handled in this run. 3 open in the inbox: l4-mktsoc ("make this a typed answer"), l4-capitalism ("make this typable"), and new l5-g-net ("I do not like this problem. Delete it.").

### 2026-10-16 (second run) · Focus: Lesson 1
- Snapshots: before 3ba87c2, after ec4597c · Changes: https://github.com/Eli-lang921/microeconomics-artifact-claude/compare/3ba87c2...ec4597c
- Reports: 2 fixed, 0 no change, 3 need input
- Fixed: Card c-l2-0 (PPF) now says real economies make many goods and the model uses two so they fit on a graph.
- Fixed: Card c-l2-4 question no longer asks you to "show it with numbers."
- Fixed: Lesson 1 question l1-micro stem now reads "Which of the following questions is microeconomic?" (exam style).
- Fixed: Lesson 1 latte example now says both items cost $5, so you can only buy one.
- Fixed: Number choices now always show smallest to largest in l1-shift, l3-terms and l3-terms2 (they were shuffled). Answers unchanged.
- Fixed: Lesson 3 Brazil example now says which axis makes Brazil's PPF steeper (wheat across). Without the axis the claim could be wrong. Your graph request on that section stays open.
- Proposed: 5
- Notes: Lesson 1 answer keys, numbers and graphs all checked; none were wrong. No duplicate or missing question ids. You have no edited cards, so the card fixes show for you. Outside links could not be checked this run (this environment blocks them).

### 2026-10-16 · Focus: Lesson 1 (not started)
- Snapshots: before FAILED, after not taken · Changes: none
- Reports: 0 fixed, 0 no change, 0 need input (5 open, untouched)
- Fixed: nothing. Rule "no backup, no changes" applied: artifact, database and reports were not modified.
- Proposed: 0
- Notes: Push to GitHub was refused because Cowork scheduled tasks can't attach a GitHub repo, so the job moved to a Claude Code routine with this repo attached.
