# Microeconomics Workbook (backup and version history)

Master copy of Eli's CLEP Microeconomics study artifact.

- Live artifact: https://claude.ai/artifact/NcS17Vqfj1fYxqC93TBAki
- `index.html`: the whole study app (page source), exactly as published.
- `data/progress.json`: Eli's saved progress (lessons, quiz, review schedule, writing). Snapshot only; the live copy is in the artifact's database.
- `data/reports/`: one file per problem report from the Reports tab.
- `src/unit2/`: the Unit 2 source pieces (lessons, widgets, quiz) and the build script that merges them into `index.html`.
- `src/review/patch.py`: the Oct 28 2026 Review upgrades (skip, delete with restore, 1-3 rating, practice counts as review), applied once to `index.html`.
- `docs/unit2-build-notes.md`: Unit 2 decisions, sources, course errors found, quiz blueprint and audit results.

## How versions work
- Every commit is one dated snapshot.
- The weekly scheduled task commits a "before" snapshot, makes its changes, then commits an "after" snapshot. The diff between the two shows exactly what it changed.
- To roll back: ask Claude to republish `index.html` (and, if needed, write `data/progress.json` back) from the commit you want.

## Baseline
- First snapshot: 2026-10-14, artifact version 1791934948-4e9b, progress record version 63 (51 review items), 1 report.
