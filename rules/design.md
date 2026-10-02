Scope: any UI work, styling, design tokens, and writing or editing `DESIGN.md`.

# Design — guideline for DESIGN.md

The project is in planning. `DESIGN.md` does not exist yet. This file defines
**how** it must be produced and what it must contain — not the design itself.

## When and how

- No UI, components, or styling get built until `DESIGN.md` exists at the repo
  root and lints clean.
- Produce it with the `design-md-planner` skill
  ([source](https://github.com/ailabs-393/design-md-planner)). Don't hand-roll it.
- Mode is **greenfield**: interview first, then propose 3–4 named, referenced
  directions (never adjectives like "modern and clean"), then commit to one.
- Once `DESIGN.md` exists, its tokens are normative. UI code uses tokens only —
  no hardcoded hex, font stacks, radii, or spacing in components.
- **Skill roles:** `design-md-planner` writes `DESIGN.md`. `hallmark` (installed
  in `.agents/skills/`) builds pages/components *on top of* it — it reads
  `DESIGN.md` as the locked system and must defer to it. Don't let hallmark pick
  a catalog theme or emit its own `design.md` ("lock the system") while
  `DESIGN.md` exists. Use `hallmark audit` to review UI against slop.

## Intake questions specific to Spendly

Answer these before proposing directions:

- **Usage conditions:** quick logging on a phone after a purchase vs. reviewing
  monthly spend on desktop? This decides density and touch targets.
- **First-second feeling:** a specific adjective — e.g. "calm", "in control",
  "frank about money" — not "modern".
- **Light, dark, or both?** Don't assume both.
- **References:** 2–3 products, sites, or objects the user would defend.
- **Constraints:** accessibility target (default WCAG AA), any brand colors.

## Format (Google DESIGN.md)

- YAML frontmatter with tokens. Allowed top-level keys only: `version`, `name`,
  `description`, `omitted`, `colors`, `typography`, `rounded`, `spacing`, `components`.
- `primary` color is required. Every color token must be referenced by a component.
- Component sub-tokens are only: `backgroundColor`, `textColor`, `typography`,
  `rounded`, `padding`, `size`, `height`, `width`. Borders and shadows go in prose.
- Components use `{colors.x}` references, never literals, and always define
  `backgroundColor` + `textColor` together so contrast (AA 4.5:1) is checked.
- Sections, in this order: Overview → Colors → Typography → Layout →
  Elevation & Depth → Shapes → Components → Do's and Don'ts.
- Prose carries the argument (why), tokens carry the values. Don't restate hex in prose.

## Spendly-specific requirements

- **Numbers are the product.** Pick a typeface with tabular figures for amounts;
  right-align amounts in lists and tables.
- **Money semantics:** define income / expense / over-budget colors derived from
  the brand family, not stock green/red. Never rely on color alone — pair with
  sign, icon, or label.
- **Charts:** category colors must be defined in the system, distinguishable for
  color-blind users, and work in every supported theme.
- **Components to cover:** `page`, `button-primary` (+ hover), `button-secondary`,
  `input`, `input-error`, `card`, `chip` (categories), `amount-positive`,
  `amount-negative`, `tooltip`.

## Anti-slop rules

Every value must finish the sentence "this is what it is because ___" with
something other than "it looked good".

- No indigo/violet primary (`#6366F1`–`#9333EA`), no gradient text, no
  purple-to-cyan gradients, no slate-900 navy dark mode.
- No untouched framework palettes. No `R=G=B` greys — tint every neutral.
- No pure `#FFFFFF` background or `#000000` text.
- One accent with one job, under ~5% of the surface.
- Not Inter/Poppins/Roboto by default. Two typefaces that differ by classification.
  At most three weights, far apart (e.g. 400/700).
- Tracking varies with size; line-height moves inversely with size; body 60–75ch.
- Radius is hierarchical (or deliberately zero) — not one radius on everything.
- Depth via borders, tonal shifts, and spacing; shadows only for things that
  float (modals, menus), with a light direction and palette-derived color.
- Motion has a stated purpose, and the file says what does **not** animate.
- No emoji or icons-in-tinted-squares as feature icons.

## Done means

- `npx -y -p @google/design.md designmd lint --format json DESIGN.md` reports
  zero errors and zero warnings (or a deliberate `omitted` entry with a reason).
  Contrast warnings get fixed by changing colors, never by deleting the pair.
- The anti-slop checklist in the skill's `references/anti-slop.md` passes, or
  each hit has a stated reason.
- The Overview names the chosen direction **and what it gives up**.
- Report before/after lint counts to the user.
