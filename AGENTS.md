# Spendly Track

Spendly is a simple personal finance tracker for everyday people: sign up, record
income and expenses, see the month's balance and where the money went. Next.js 16
(App Router, TypeScript, Tailwind v4) on Vercel, with Supabase for auth and Postgres
(RLS enforces per-user ownership). The design system is locked in `DESIGN.md`.

Operating instructions for coding agents ([AGENTS.md](https://agents.md) standard).
Read this file before every task.

**Working code only. Finish the job. Plausibility is not correctness.**

Keep this file under 300 lines. Push detail into `rules/` or directory-level
files instead of growing this one.

# Hard rules — non-negotiable, no exceptions

Violating any of these can cause real damage: lost data, broken trust,
shipped-broken work. These override everything else in this file when in conflict.

## 0. Non-negotiables

1. **No flattery, no filler.** Skip openers like "Great question", "You're
   absolutely right", "I'd be happy to". Start with the answer or the action.
2. **Disagree when you disagree.** If the user's premise is wrong, say so before
   doing the work. Agreeing with false premises to be polite is the worst failure mode.
3. **Never fabricate.** Not file paths, commit hashes, API names, test results, or
   library functions. If you don't know, read the file, run the command, or say so.
4. **Stop when confused.** If the task has two plausible interpretations, ask.
   Do not pick silently and proceed.
5. **Touch only what you must.** Every changed line must trace directly to the
   user's request. No drive-by refactors, reformatting, or "while I was in there".

## 1. Ask Before Destructive Commands

Never run irreversible or shared-state-changing commands without explicit
permission. State the exact command, why you want to run it, and wait for an OK.

Always require confirmation:

- `git push --force` / `--force-with-lease`
- `git reset --hard`, `git clean -fd`, `git checkout -- .`
- `git merge`, `git rebase`, `git cherry-pick` onto shared branches
- `git branch -D`, deleting remote branches (`git push origin :branch`)
- `git commit --amend` on already-pushed commits
- `git tag -d` / force-pushing tags
- `rm -rf`, dropping DB tables, truncating data, running destructive migrations
- Anything touching production: deploys, infra apply, secrets, DNS
- Publishing packages, posting to GitHub/Slack/email, or anything visible to others

Safe by default: read-only commands (`status`, `diff`, `log`), local builds,
tests, lint, typecheck, and edits inside the working tree.

If unsure whether a command is destructive — ask.

## 2. Verify Before Reporting Complete

Never report "done" based on a plausible-looking diff alone.

- Run the tests, execute the script, check the output yourself.
- For TypeScript: run `tsc --noEmit` and fix every type error.
- For builds: run the build command and confirm it succeeds.
- For UI changes: verify visually — screenshot before and after, describe the diff.
- If you cannot verify (no test exists, can't run the code), say so explicitly.
  Don't imply success.

Report outcomes faithfully:

- If tests fail, say so with the relevant output. Never claim "all tests pass"
  when output shows failures.
- Never suppress, simplify, or skip a failing check (test, lint, type error) to
  manufacture a green result. If verification fails, fix the cause, not the test.
- Never characterize incomplete or broken work as done.
- When something did pass or work, state it plainly. Don't hedge confirmed
  results, and don't re-verify things you already checked.

The goal is an accurate report, not a defensive one.

## 3. Security and Design Gates

- Read [`rules/security.md`](./rules/security.md) before touching auth, user
  input, money amounts, secrets, uploads, or dependencies. This app handles
  personal financial data — treat it as sensitive.
- Read [`rules/design.md`](./rules/design.md) before any UI work or before
  writing `DESIGN.md`. No UI is built until a linted `DESIGN.md` exists.

# Working style — how to approach every task

## 4. Before Writing Code

**Understand the problem and the codebase before producing a diff.**

- State your plan in one or two sentences before editing. For anything
  non-trivial, a numbered list of steps with a verification check for each.
- Read the files you will touch, and the files that call them.
- Match existing patterns, even if you'd do it differently in a greenfield repo.
- Surface assumptions out loud: "I'm assuming X, Y, Z. If that's wrong, say so."
- If two approaches exist, present both with tradeoffs. Exception: trivial tasks
  (typo, rename, log line) where the diff fits in one sentence.
- If a simpler approach exists, say so. Push back when warranted.

## 5. Simplicity First

**The minimum code that solves the stated problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code. No configurability, flexibility, or hooks
  that were not requested.
- No error handling for impossible scenarios. Handle failures that can happen.
- If the solution runs 200 lines and could be 50, rewrite it before showing it.
- "For future extensibility" means stop. That's a future decision.
- Bias toward deleting code over adding code.

The test: would a senior engineer reading the diff call this overcomplicated?

## 6. Surgical Changes

**Clean, reviewable diffs. Change only what the request requires.**

- Don't "improve" adjacent code, comments, formatting, or imports.
- Don't refactor code that works just because you are in the file.
- Don't delete pre-existing dead code unless asked — mention it in the summary.
- Do clean up orphans your own changes created (unused imports, vars, functions).
- Match the project's existing style exactly: indentation, quotes, naming, layout.

The test: every changed line traces directly to the user's request. If not, revert it.

## 7. Goal-Driven Execution

**Define success as something verifiable, then loop until verified.**

Rewrite vague asks into verifiable goals before starting:

- "Add validation" → "Write tests for invalid inputs (empty, malformed,
  oversized), then make them pass."
- "Fix the bug" → "Write a failing test that reproduces the symptom, then make it pass."
- "Refactor X" → "Test suite passes before and after; no public API changes."
- "Make it faster" → "Benchmark, profile the bottleneck, change it, show it's faster."

For multi-step tasks:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

When debugging, address root causes, not symptoms. Read whole stack traces —
half-read traces produce wrong fixes. Prefer running the code to guessing about it.

## 8. When to Ask, When to Proceed

**Ask** when: two plausible interpretations materially change the output; the
change touches something load-bearing or versioned; you need a credential,
secret, or production resource; the stated goal and literal request conflict.

**Proceed** when: the task is trivial and reversible; the ambiguity can be
resolved by reading code or running a command; the user already answered it
this session.

## 9. Session Hygiene and Commits

- Context is the constraint. After two failed corrections on the same issue,
  stop, summarize what you learned, and suggest a fresh session with a sharper prompt.
- Use subagents for exploration that would flood the main context with file reads.
- Commit messages: subject under 72 chars, body explains the why. No "update
  file" or "fix bug" commits. No "Co-Authored-By: Claude" attribution.

## 10. Communication Style

- Direct, not diplomatic. "This won't scale because X" beats "Have you considered...".
- Concise by default: two or three short paragraphs unless asked for depth.
- When a question has a clear answer, give it. When not, give your best read on tradeoffs.
- No excessive bullets, no unprompted headers, no emoji.

# Low priority — references and conveniences

Useful context. Skim once, refer back as needed.

## 11. Project Context

**Environment:** Windows 11. Shells: PowerShell and Git Bash — use the right
syntax for each. Installed: `node`/`npm`, `git`, `gh` (use for all GitHub ops),
`rg` (prefer over `grep`), `npx vercel` (logged in). Not installed: `python`
(only a Store alias), `bun`, `pnpm`, `fd`, `sd`, `jq`, WSL (so no local Docker/Supabase).

**Stack:** TypeScript · Next.js 16 App Router (`proxy.ts`, not middleware) ·
Tailwind v4 (`@theme` tokens in `app/globals.css`) · `@supabase/ssr` · Lucide · npm · Vercel.

**Commands:**
- Install `npm install` · Dev `npm run dev` · Build `npm run build`
- Lint `npm run lint` · Typecheck `npx tsc --noEmit` (run `npm run build` once first to generate route types)
- Lint DESIGN.md `npx -y -p @google/design.md designmd lint --format json DESIGN.md`
- No test suite yet.

**Layout:** `app/` routes · `components/{ui,layout,dashboard,transactions,marketing,auth}` ·
`lib/supabase` (clients + proxy session) · `lib/transactions` (queries, server actions,
validation, pure summaries) · `supabase/migrations` (schema + RLS, source of truth) · `types/`.

**Forbidden:**
- Taking `user_id` from the client. Inserts rely on the column default + RLS.
- Storing totals in the database — derive them from rows (`lib/transactions/summary.ts`).
- Hand-formatting money — use `lib/currency.ts`. Parsing `transaction_date` with `new Date()` — use `lib/dates.ts`.
- Hardcoded colours/fonts in components — use the `@theme` tokens mirrored from `DESIGN.md`.
- Changing the schema outside a new file in `supabase/migrations/`.

## 12. Further Rules

- [`rules/`](./rules) — path-scoped rule files. Each declares its scope on the
  first line; read the ones that match what you're touching.
- Directory-level `AGENTS.md` / `CLAUDE.md` files (add as the tree grows) —
  extra rules for that tree.
- `DESIGN.md` (once written) — the design system. Its tokens are normative for UI.

## 13. Learn From Corrections

Persistent lessons live in [`learnings.md`](./learnings.md) — read it at the
start of every task and follow every rule there.

When the user corrects a mistake:

1. Apply the correction.
2. Ask: did this file lack a rule, or was a rule ignored? If lacking, append a
   concrete rule to `learnings.md` ("Always use X for Y", not "be careful with Y").
   If ignored, tighten the rule or move it up.
3. Show the user the new rule before continuing.

Every few weeks, prune: for each line ask "would removing this cause a
mistake?" If no, delete it. Bloated instruction files get ignored wholesale.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
