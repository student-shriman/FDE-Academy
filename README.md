# FDE Academy

A 36-week, hands-on curriculum for going from **AI Engineer → Forward Deployed Engineer / AI Architect** — turned from a spreadsheet plan into a structured, notebook-based learning system: theory, diagrams, runnable code, and hands-on labs for every sub-topic.

## What's in this repo

| Path | What it is |
|---|---|
| `fde_ai_architect_curriculum_final.xlsx` | The master curriculum: 13 phases, 36 weeks, 223 sub-topics, weekly/daily roadmaps, and a projects/deliverables tracker. This is the **source of truth** — every notebook in this repo traces back to a row in its `Master Curriculum` sheet. |
| `P0 - .../`, `P1 - .../`, ... | One directory per curriculum phase (see **Structure** below). |
| `SKILL.md` | The playbook for how these phase notebooks are built — read this before adding a new phase. |
| `images/`, `files/` (repo root) | Leftover assets from early format exploration (an LSTM-cell diagram, a sentence-similarity demo dataset) — not currently referenced by any notebook. Harmless; safe to ignore or remove. |
| `6 - Python Loops.ipynb` | The original hand-written notebook that set the format every generated notebook follows (see `SKILL.md`). |

## Structure

Each phase is its own top-level folder, numbered so it sorts correctly:

```
P0 - FDE Foundations & Engineering Baseline/
├── 01 - 0.0 FDE Role & Responsibilities/
│   ├── 01 - FDE role and responsibilities.ipynb
│   ├── 02 - FDE vs software engineering and solutions engineering.ipynb
│   ├── images/        <- diagrams referenced by this topic's notebooks
│   └── files/         <- datasets (csv/tsv/xlsx) this topic's notebooks load
├── 02 - 0.0 FDE Delivery Lifecycle/
│   └── ... (same pattern)
├── 03 - 0.1 Production Python/
├── 04 - 0.2 Backend Engineering/
└── 05 - 0.3 Engineering Standards/
```

- **Topic folders** are prefixed `01`, `02`, ... in true curriculum order (the sheet's own `0.0` / `0.1` / `0.2` IDs aren't unique enough to sort by — two P0 topics both start `0.0`).
- **Notebook files** are prefixed the same way within their topic, so they never depend on alphabetical luck (e.g. "Async Client Disconnection..." would otherwise sort before "AsyncIO...", which is backwards).
- **`images/` and `files/` live per-topic**, not globally — each topic folder is self-contained.

Every notebook mixes plain-text "banner" cells (theory, written the same way as the original `6 - Python Loops.ipynb`), diagrams embedded via markdown where they earn their place, real executable code cells (verified, not just written), a closing hands-on checklist, and common pitfalls. Full format spec: **`SKILL.md`**.

## Progress

| Phase | Topic | Status |
|---|---|---|
| P0 | FDE Foundations & Engineering Baseline | ✅ Complete (5 topics / 30 notebooks) |
| P1 | AI System Design | Not started |
| P2 | Enterprise Identity & Access | Not started |
| P3 | Enterprise Database & Data Architecture | Not started |
| P4 | Advanced RAG | Not started |
| P5 | Agentic Systems | Not started |
| P6 | AI Security | Not started |
| P7 | Cloud & Production Deployment | Not started |
| P8 | Kubernetes | Not started |
| P9 | Infrastructure as Code & DevOps | Not started |
| P10 | AI Performance Engineering | Not started |
| P11 | Observability, Reliability & Client Operations | Not started |
| P12 | AI Product & FDE Delivery Skills | Not started |

## Running the notebooks

Everything is plain Jupyter + a small set of well-known libraries — no exotic setup.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install jupyterlab numpy pandas matplotlib fastapi "uvicorn[standard]" \
            httpx websockets pydantic pydantic-settings email-validator \
            slowapi pytest

jupyter lab
```

Open any notebook and run top to bottom — the "banner" theory cells are plain text (not meant to execute; running one just does nothing harmful), and every actual code cell has been verified to run cleanly in this exact dependency set.

## Continuing the curriculum

To build out the next phase (P1 onward), don't wing the format — **read `SKILL.md` first**. It's the accumulated set of rules, conventions, and mistakes-already-made-so-you-don't-have-to from building P0, written specifically so a future Claude Code session (or a human) can reproduce the same quality without relearning it from scratch.
