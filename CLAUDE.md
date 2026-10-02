@AGENTS.md

# Claude Code specifics

Everything above is shared with other agents via `AGENTS.md`. Edit rules there,
not here. This section holds only what is specific to Claude Code.

## Skills

- `design-md-planner` — use it to produce `DESIGN.md` (see `rules/design.md`).
- `andrej-karpathy-skills:karpathy-guidelines` — same principles as §4–§7; no
  need to invoke it separately.

## Match the model to the task

- Mechanical, well-specified work (boilerplate, bulk edits, test scaffolding)
  can go to a cheaper/faster subagent model.
- Hard architecture, debugging, or security reasoning stays on the strongest model.
- Fan independent chunks of work out to parallel subagents when it clearly helps.
