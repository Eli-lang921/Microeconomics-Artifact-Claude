# Microeconomics Workbook: build plan

This file lives in the GitHub repo and is the live copy (moved from the Claude Project on 2026-10-16). The weekly routine reads it at the start of every run.

Artifact: https://claude.ai/artifact/NcS17Vqfj1fYxqC93TBAki (one growing page; Units 2-7 get added to it)
Course: Modern States, Principles of Microeconomics (CLEP). Source files: unit transcripts, slides, OpenStax textbook.

## Decisions (Oct 2026)
- Goal: pass CLEP and genuinely understand the material. Beginner level, every term defined.
- One artifact that grows unit by unit; Unit 1 is the pilot and template.
- Progress saved with the artifact database (per-user, private), so it syncs phone and PC when signed in. Two-device merge fix was offered and declined for now (newest copy wins).
- Each lesson: one-line summary, core section, analogy, worked example with real numbers, interactive widget(s), optional "Go deeper", outside links only when they add value (videos open in a new tab).
- Practice per lesson: 12 core questions on the page + 16 more behind a "More practice" button. Mix: 5-option exam-style multiple choice, true/false, graph questions, worked problems (some with new numbers each time).
- Question style follows College Board's official CLEP samples: five choices A-E, short "Which of the following" stems, some paired or reason-giving choices, a mix of terms, graphs, data tables and simple models. Questions are original, not copied. Number choices listed smallest to largest.
- Difficulty: match the exam, plus a slightly harder tier.
- Writing: 2-3 optional prompts per lesson, graded by Claude in the page (sample capability) against a 4-point checklist, with a model answer.
- Flashcards: 11-16 per lesson (see Flashcards below).
- Review tab: everything is spaced. Miss → back tomorrow; right first time → back in 7 days; each correct due review moves it up 1 → 3 → 7 → 21 → 60 days, then mastered. Practice anytime by lesson, mixed 10/20/all sets, flashcards, and review ahead; free practice never pushes items out, but misses always count. Unit-quiz questions are kept out of free practice so the quiz stays unseen.
- Unit quiz: 20 exam-style questions (5 choices), target 80%+ (Modern States voucher needs 75% on their final).
- "Explain this" under every lesson section, graph, question, flashcard and writing prompt (see below).
- "Report a problem" on every question, lesson, flashcard, Claude's writing grade, Claude's flashcard check and Claude's explanations (see Report inbox below).
- Clean, calm design with a progress bar.

## Explain this (built Oct 13 2026)
- Button under each lesson section (h2 in the body, h3 in Go deeper), each interactive graph (sends its current state), each question (practice, extra, quiz, review), each flashcard, and each writing prompt.
- Claude explains in plain language via the page's sample capability: core idea, everyday example with numbers, step-by-step math, why a wrong choice was tempting, exam relevance; under ~200 words. Follow-ups: "Simpler, please", "Another example", or a typed question. Answers stream in and are reused while the page stays open.
- Modes: unanswered questions and unflipped cards get "hint" mode (explains what's asked and the method, never reveals the answer). After answering: full explanation of why. Graded writing: explains the feedback.
- Code: `explainBox`, `xpPrompt` (the tutor prompt to adjust if explanations are off), `addSectionExplains`, `textOf`.
- Each tap uses a little of Eli's Claude usage.

## Flashcards (rebuilt Oct 13 2026)
- Each card: front term, a specific question, a precise answer, a concrete example (real numbers where possible), and a "Watch out" common mistake. 67 built-in cards (L1 14, L2 14, L3 11, L4 16, L5 12).
- Card ids are `c-<lesson>-<index>` and the review schedule uses them, so new built-in cards go at the END of a lesson's list; never reorder.
- Two ways to answer: Show answer (flip, then Knew it / Didn't know) or Type my answer (Claude checks it via sample: correct / partly right / not yet, what you got, what's missing; Claude's verdict pre-selects Knew it / Didn't know). The last mode used is remembered per device.
- Eli can edit any card and add his own: Flashcards page (`#cards`), "Edit this card" on any flipped card. Stored per user at `data/users/<id>/micro-workbook/cards/<cardId>` with fields `lesson, t, q, d, ex, tip, custom, at`. custom:true = his own card (id `u-...`); custom:false = his edit of a built-in (same id), which overrides it for him only; deleting that doc resets it. Signed-out changes wait in localStorage and upload on connect.
- When fixing a reported built-in card, edit CARD_LIST in the page. If Eli has his own edit of that card (a doc in `cards`), his version shows instead; mention it rather than overwriting it.

## Report inbox (built Oct 13 2026)
- Each report is its own document, separate from progress: `data/users/<id>/micro-workbook/reports/<reportId>`.
- Fields: `where` ("question:<qid>", "lesson:<lid>", "card:<cardId>", "cardgrade:<cardId>" for Claude's check of a typed flashcard answer, "grade:<writingId>" for Claude's writing grade, "explain:<target>" for a Claude explanation, where target is question:/card:/writing:/section:<lid>|<heading>/widget:<lid>|<title>), `note`, `ctx` (what was on screen: the card text, Eli's answer plus Claude's verdict, or the explanation thread), `at` (ms), `status` ("open" | "fixed" | "nochange"), `reply` (one line on what changed or why no change), `fixedAt` (ms).
- Reports made signed out or offline wait in localStorage and send when the account connects. Old items in the progress doc's `reports` array migrate automatically.
- "Reports" tab lists every report with what it's about, a link to open it, what was sent, and Claude's note. Questions, lessons and cards show a "Reported · open" or "Fixed" tag. Badge for newly handled reports.
- Fix pass (when Eli asks "fix my workbook reports"): ArtifactData list `data/users/me/micro-workbook/reports` → fix the page (questions, cards, or the prompts `gradePrompt` / `cardGradePrompt` / `xpPrompt`) and republish → for each handled report, `update` status, reply and fixedAt (pin if_version).
- A weekly audit routine (Claude Code, with this repo attached) handles open reports and logs each run in `workbook-audit-log.md`.

## Unit 1 (built)
1. Scarcity and opportunity cost (snooze widget, budget-line widget)
2. Production possibilities frontier (PPF explorer: test points, steps, shifts)
3. Comparative advantage and trade (trade lab with editable outputs and trade price)
4. Economic systems (sorting game, circular flow)
5. Marginal analysis and incentives (one-more-slice MB vs MC widget)

## Audit log
- Oct 12 2026: full audit of Unit 1 (typos, answer keys, code, phone layout). Fixed budget-line slope wording, factor payments now include profit, quiz double-scoring bug, review double-advance bug, DST-safe due dates, stricter dollar answers, 4 quiz items rewritten (graph item added, circular-flow item replaces micro/macro trivia), ~28 wording fixes. No answer keys were wrong.
- Oct 13 2026: added the report inbox and Reports tab.
- Oct 13 2026: rewrote all 67 flashcards; added typed answers checked by Claude, card editing and own cards, and reports on cards and on Claude's grading.
- Oct 13 2026: added "Explain this" everywhere, with hint mode for unanswered items.
- Oct 16 2026: weekly audit moved from a Cowork scheduled task to a Claude Code routine so it can save backups to GitHub; plan and audit log moved into the repo. Weekly run details live in `workbook-audit-log.md`.

## Useful official resources
- Free official sample questions: https://clep.collegeboard.org/clep/pdf/principles-of-microeconomics-fact-sheet.pdf
- CLEP Principles of Microeconomics Examination Guide (PDF, $10, College Board) as a later calibration check.
- Exam weighting: Basic Economic Concepts is about 10-16% of the exam; product markets (supply/demand, consumer choice, costs, market structure) are 55-70%.

## Next
- Step 4: content upgrade (more worked examples, difficulty check against official samples), then lock the format as the Unit 2 template.
- Build Unit 2 (Supply and Demand) in the same pattern.
