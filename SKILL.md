# SKILL: Building an FDE Academy Phase

This is the playbook for turning one phase of `fde_ai_architect_curriculum_final.xlsx` into the notebook structure this repo uses. It was written after actually building Phase P0 (5 topics, 30 notebooks, 16 diagrams) — every rule here exists because something broke or looked wrong the first time and had to be fixed. Follow it literally; don't rediscover these the hard way a second time.

Read `README.md` first for the high-level shape of the repo. This file is the detailed how-to.

## 0. Source of truth

Everything comes from `fde_ai_architect_curriculum_final.xlsx`, sheet `Master Curriculum`, read with `openpyxl`. Columns (from row 3 down): `Phase ID, Phase, Weeks, Topic, Sub-topic, Key details / expected understanding, Estimated total hours, Suggested daily treatment, Track`.

For the phase you're building:
1. Filter rows by `Phase ID` (e.g. `P1`).
2. Group by `Topic`, **preserving row order** — that order is the intended learning sequence, and it does not match alphabetical order.
3. Within each topic, the sub-topic rows in sheet order are your notebook order.
4. Keep the `Track` value (`Core` / `Mandatory (Addition)` / `Optional`) — mention it in the notebook's header cell.

Don't invent sub-topics or reorder them based on what "feels" more logical — the sheet order is deliberate (it's the sequencing a human curriculum designer already worked out).

## 1. Directory structure

```
P<N> - <Phase Name>/
├── <NN> - <topic curriculum ID> <Topic Name>/
│   ├── <NN> - <Sub-topic Name>.ipynb
│   ├── <NN> - <Sub-topic Name>.ipynb
│   ├── ...
│   ├── images/
│   └── files/
```

Rules:
- **Topic folder prefix** (`01`, `02`, ...) reflects true curriculum order, independent of the topic's own ID string. Two topics can legitimately share an ID prefix like `0.0` (this happened in P0: `0.0 FDE Role & Responsibilities` and `0.0 FDE Delivery Lifecycle`) — alphabetical sort would get their order wrong, so the explicit `NN -` prefix is mandatory, not decorative.
- **Notebook filename prefix** (`01 -`, `02 -`, ...) reflects sub-topic order within that topic, for the same reason — descriptive names almost never sort alphabetically the way the curriculum intends (e.g. "Async Client Disconnection..." sorts before "AsyncIO...", which is backwards from the intended order).
- **Sanitize filesystem-unsafe characters** in names, but only in the *filename* — keep the original wording in the notebook's own header cell:
  - `/` → `-` (e.g. `AsyncIO and async/await` → `AsyncIO and async-await.ipynb`)
  - `→` → `to` (e.g. `PoV → PoC → MVP → Production lifecycle` → `PoV to PoC to MVP to Production lifecycle.ipynb`)
- **`images/` and `files/` are per-topic**, not global. A notebook references its diagrams as `images/foo.png` (relative path) and any dataset as `files/bar.csv` — this only works because each topic folder is self-contained. Don't share an images/files folder across topics.
- Use `git mv` for every rename, not `rm` + recreate — preserves file history.

## 2. Notebook cell format

This mirrors the original hand-written `6 - Python Loops.ipynb` at the repo root. Two cell "modes" live inside `code`-type cells, plus real markdown cells for images/tables:

**a) Banner/note cells** (`cell_type: code`, but never meant to run): plain, unprefixed text (no leading `#`), formatted as:

```
    ############    #############   TITLE   #############   ##############   

 =>  Explanatory bullet, wrapped manually at ~90 chars.

 =>  Another bullet. Blank line between bullets.
```

These will raise a `SyntaxError` if actually executed — that's expected and correct, it matches the original sample notebook's own style. Never "fix" this by adding `#` prefixes or converting them to markdown; the whole repo is consistent on this point.

**b) Real code cells** (`cell_type: code`, meant to run): valid, executable Python. Every one of these must actually be run and verified (see §5) before being considered done — never hand-write a code cell and assume it works.

**c) Markdown cells**: used for exactly two things — embedding an image (`<img src="images/foo.png" alt="...">`) and rendering a reference table (`| col | col |` pipe tables). Not used for theory text; that stays in banner cells to match the established style.

### Per-sub-topic notebook shape, in order:

1. Header banner: title + `Phase / Topic / Week / Track` metadata + a short outline of what the notebook covers.
2. For each concept chunk, repeat: **theory banner → (diagram, if warranted, see §3) → code demo (if warranted) → explanation banner interpreting the actual output**.
3. Closing `Hands-on Lab Checklist` banner: `- [ ]`-style items, concrete and specific (not "practice more" — say exactly what to build/change).
4. Closing `Common Pitfalls` banner: real, specific failure modes — ideally ones you actually hit while building the demo code, not generic advice.

## 3. Diagrams — when, and how

Not every sub-topic needs one. Decide per sub-topic:

| Content type | Approach |
|---|---|
| Fixed mechanism/architecture (state machines, pipelines, layered architecture, an LSTM cell, a token bucket) | Static PNG, hand-laid-out with **matplotlib** (`FancyBboxPatch`, `FancyArrowPatch`, `Circle`), saved to the topic's `images/`, embedded via a markdown `<img>` cell placed right after the theory banner it illustrates, *before* the code demo. |
| Data that's literally "plot this computed thing" (vectors, a cosine curve, timing/latency data) | A **live, runnable matplotlib code cell** instead — the reader can tweak values and rerun it. Don't pre-render something the reader could just execute. |
| An enumerable reference list (12-factor list, a role-comparison table) | A **markdown table**, not a diagram. |
| Real infra (a cloud console screen, an IDE screenshot) | Cannot be generated — don't fake it. Mark the spot clearly as something the reader captures themselves during the hands-on lab. |

Workflow for every generated diagram:
1. Write the matplotlib script, save the PNG.
2. **Read the image back and actually look at it** (this repo hit real, repeated bugs this way — see below). Never assume a diagram is correct just because the script ran without error.
3. Common failure modes to check for every time:
   - Text overlapping other text or shapes (a title colliding with a legend, a label colliding with the thing below it).
   - Elements clipped at the figure edge because `xlim`/`ylim` were sized before adding the last box (check the *last* element specifically, it's the one most likely to be cut off).
   - Circles rendering as squashed ellipses because `ax.set_aspect('equal')` was omitted.
   - A caption/description you meant to draw that never actually got plotted (a variable computed in a loop but never passed to `ax.text(...)`).
4. Fix and re-render until it's actually clean — don't ship a diagram you haven't looked at.
5. If you regenerate a whole script that produces multiple images and only some of them had manual fixes applied in a separate patch, **the full script re-run will silently revert the ones you patched separately**. Re-apply those specific fixes (or fold every fix into the one canonical script) and re-check all outputs, not just the one you were focused on.

## 4. Grounding technical content with web search

Don't rely purely on training memory for anything that's likely to have moved on or where precision matters:
- Current library APIs and idioms (e.g. FastAPI's `lifespan` context manager vs. the deprecated `@app.on_event`; Pydantic v2's `pydantic_settings.BaseSettings` + `SettingsConfigDict` vs. the old v1 `class Config:` style).
- Authoritative reference lists (e.g. the twelve-factor app's exact 12 factors).
- Real-world role/domain framing (e.g. what a "Forward Deployed Engineer" actually is, grounded against how the term is used in practice, not just etymology).

Do a targeted `WebSearch` for these before writing the content, and let the result correct you if your first instinct was outdated.

## 5. Validation — every notebook, every topic, before it's "done"

Never hand a notebook over unexecuted. The process:

1. Use an **isolated venv**, not system Python (`python3 -m venv .venv-check`). Install only what that topic's code actually imports.
2. For each notebook: split cells into "runnable" (compiles as valid Python — use `compile(src, "<c>", "exec", flags=0x2000)` to allow top-level `await`, matching what Jupyter itself permits) vs. "banner" (expected to fail compilation — that's correct, not a bug).
3. **Actually execute** the runnable cells, don't just compile-check them. To emulate Jupyter's top-level-`await` support in a plain `.py` script, wrap the concatenated cell source in:
   ```python
   async def __notebook_main():
       <cell source, indented>

   if __name__ == "__main__":
       import asyncio
       asyncio.run(__notebook_main())
   ```
4. **Known false-positive failure modes of this exact harness** — if you hit these, don't "fix" the notebook; re-verify at true top-level (a plain concatenated script, no wrapping function) before concluding anything:
   - A `global` statement inside a nested function breaks, because everything is nested one level inside `__notebook_main`. Real Jupyter cells run at true top-level, so this isn't a real bug — confirm by running the same source unwrapped.
   - `ProcessPoolExecutor`/`multiprocessing` targeting a function that is now nested inside `__notebook_main` can never be pickled (nested functions are never picklable, independent of any OS). Confirm the *actual* notebook code (top-level function, in a real script with `if __name__ == "__main__":`) works before dismissing it — and if the real, underlying issue is a genuine macOS/Windows `spawn`-start-method limitation, document it as a pitfall in the notebook itself rather than hiding it.
   - A notebook with **zero** runnable code cells (pure conceptual content, e.g. a topic that's all git CLI reference text) produces an empty wrapper function body → `IndentationError`. This is expected for concept-only notebooks, not a bug.
5. Any failure that **survives** re-verification at true top-level is a real bug. Fix the actual notebook content — this repo caught and fixed two real ones this way:
   - A demo "why raw dot product misleads" that used orthogonal vectors, so the claimed effect literally didn't happen — the numbers in the printed output didn't match the claim in the prose next to it.
   - FastAPI's `TestClient` **re-raises** an unhandled server exception into the test process by default (for debuggability) rather than turning it into a 500 response — a notebook claiming "this returns a 500" needs `TestClient(app, raise_server_exceptions=False)` to actually demonstrate that.
6. Check every markdown `<img src="...">` reference actually resolves to a file on disk, repo-wide, before calling a topic done:
   ```python
   # walk all .ipynb under the phase dir, regex out src="...", os.path.isfile() each one
   ```

## 6. Git workflow

- Repo-local identity only if unset (`git config user.name` / `user.email`, no `--global`) — never touch the user's global git config.
- `git mv` for every rename (folders and files) so history follows.
- Commit messages: state what topics/sub-topics were added or changed, and call out any real bug fixed during validation (don't bury that in the diff).
- Push to `origin main` directly unless told otherwise — no force-push, ever.

## 7. Repeatable loop for the next phase

1. Pull that phase's topics + sub-topics from the sheet, in order (§0).
2. Scaffold the directory structure (§1) — topic folders numbered, each with an `images/` and `files/`.
3. For each topic: decide which sub-topics need a diagram vs. a live plot vs. a table (§3), generate all of that topic's diagrams first, and **look at every one** before moving on.
4. Write each notebook's content (§2), reusing the header-banner pattern.
5. Validate the whole topic (§5): execute, re-check anything that fails against true top-level, fix real bugs.
6. Confirm numbering/ordering is correct (§1) and no image reference is broken (§5.6).
7. Commit and push (§6).
8. Move to the next topic. Only report a phase "complete" once every topic in it has been through this full loop.
