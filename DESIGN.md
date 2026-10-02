---
version: alpha
name: Spendly Ember Ledger
description: Design system for Spendly, a calm personal finance tracker for everyday people who want to know where their money goes.

colors:
  primary: "#1D1C1A"
  on-primary: "#FAF8F4"
  secondary: "#5E5A53"
  tertiary: "#BF4318"
  on-tertiary: "#FFF8F2"
  neutral: "#FEFDFB"
  surface: "#F4F2EE"
  surface-sunken: "#ECE9E3"
  on-surface: "#1D1C1A"
  border: "#E3DFD7"
  income: "#2E6B47"
  income-tint: "#E7F0E9"
  expense-tint: "#F7E9E1"
  error: "#A8321F"
  error-tint: "#F8E6E2"
  night: "#141311"
  night-raised: "#201E1B"
  on-night: "#F1EDE6"
  night-muted: "#A8A197"
  ember-glow: "#F26A2E"

typography:
  display:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: -0.035em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.028em
  headline-md:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  title:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
  label-caps:
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.1em
  amount-xl:
    fontFamily: Geist Mono
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.04em
  amount-md:
    fontFamily: Geist Mono
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.3

rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 112px

components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  card-muted-text:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
  balance-card:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.amount-xl}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 40px
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 40px
    padding: "{spacing.md}"
  button-ghost:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: 40px
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: "{spacing.sm}"
  input-error:
    backgroundColor: "{colors.error-tint}"
    textColor: "{colors.error}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
  segmented-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
  amount-income:
    backgroundColor: "{colors.income-tint}"
    textColor: "{colors.income}"
    typography: "{typography.amount-md}"
    rounded: "{rounded.full}"
  amount-expense:
    backgroundColor: "{colors.expense-tint}"
    textColor: "{colors.on-surface}"
    typography: "{typography.amount-md}"
    rounded: "{rounded.full}"
  category-chip:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  hero-night:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    typography: "{typography.display}"
    padding: "{spacing.3xl}"
  hero-night-lede:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-muted}"
    typography: "{typography.body-lg}"
  ember-mark:
    backgroundColor: "{colors.night}"
    textColor: "{colors.ember-glow}"
    typography: "{typography.headline-lg}"
  section-heading:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.headline-md}"
  dialog:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.title}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  page-wide:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    padding: "{spacing.2xl}"
---

# Spendly Ember Ledger

## Overview

Spendly is for an everyday person who opens it right after paying for something, or once a month to see where the money went. They are not accountants. The system has to feel **calm, frank and trustworthy**, never like accounting software and never like a crypto dashboard.

The direction is **Ember Ledger**: warm paper and charcoal ink, like a well-kept pocket ledger, with one ember of colour. The ember comes from a low evening sun behind a dark wallet: the glow you get when the lights are off and you finally look at your spending. It shows up in one place in the product (the thing to do next) and one place in marketing (the hero glow).

It is split in two registers on purpose:

- **Night** for the marketing hero. A dark charcoal fold with a single ember glow and fine orbit lines. This is the one immersive gesture the brand allows.
- **Day** for the app. Light warm paper, ink text, quiet borders. People read lists of transactions here, often on a phone, so it stays light, dense and calm.

**What it gives up:** colour as decoration. No category rainbow, no gradient cards, no multi-colour charts. Hierarchy is carried by ink weight, the mono numerals and space. The app also gives up the reference's big, soft, heavily rounded phone-card look in favour of smaller radii that read as a tool, not a toy.

## Colors

The palette is warm-tinted throughout. No grey is neutral, because paper and ink never are. Every neutral leans toward the ember hue at very low chroma.

- **Ink (primary):** charcoal ink. Body text, the balance card, active navigation, the secondary button. It carries the reference's black-card weight without being pure black.
- **Ember (tertiary):** the single accent, with exactly one job: **the next action**. It colours the primary button ("Add transaction", "Start tracking"), the focus ring and the balance progress meter. It must stay under ~5% of any screen. If two ember things compete on one screen, one of them is wrong.
- **Ember glow:** a brighter, louder ember used **only on the night surface**, as the hero's light source and the wordmark dot. It never appears in the app.
- **Paper (surface) and raised paper (neutral):** the page and the cards. Cards sit one step lighter than the page, so depth comes from tone, not shadow.
- **Sunken paper:** ghost buttons, chips, the segmented control track, skeleton loaders.
- **Graphite (secondary):** muted text such as dates, helper text and descriptions.
- **Rule (border):** hairlines between rows and around cards.
- **Moss (income):** a ledger green taken from the same warm family, for income amounts and their tint. Income is also always marked with a `+` sign and an up-right arrow, so colour is never the only signal.
- **Expense tint:** expenses stay in ink with a `−` sign and a down-left arrow on a faint ember-warm tint. Spending is the normal case, so it isn't alarming red.
- **Brick (error):** form errors and destructive confirmation. Deeper and redder than ember so it can't be mistaken for the primary action.
- **Night, raised night, night text, night muted:** the marketing hero and footer band.

## Typography

**Geist** carries everything a person reads: headings, labels and body. The brief asked for a modern professional sans, and Geist's slightly squared terminals sit well next to the mono. **Geist Mono** carries every amount of money and every small uppercase label. Money is the product, so every number uses tabular figures and right-aligns, and a column of pesos lines up like a ledger. The two families differ by classification (proportional sans vs. monospace) while sharing one skeleton, so the pairing reads as a decision rather than a clash.

Weights are 400 and 600 only. 700 in Geist is heavy at the 13–15px sizes the app lives at; 600 gives enough contrast against 400.

- Display sizes track tight (−0.035em) and set nearly solid (1.02).
- Body opens up to 1.55 line-height. Mono labels are uppercase with +0.1em tracking.
- Body copy is capped at 60–70ch on marketing pages.
- Both fonts are free (SIL OFL) and loaded through the `geist` package. Fallbacks are `ui-sans-serif, system-ui` and `ui-monospace`.

## Layout

The spacing scale has a 4px base and does not leave it.

- **Marketing:** 12-column, max 1200px, left-aligned. The hero is a split diptych: statement on the left, a live product preview on the right. Sections vary in rhythm. The product walkthrough sits tight; the closing call-to-action gets the most air.
- **App (desktop, ≥1024px):** a fixed 240px left rail (wordmark, Dashboard, Transactions, Settings, account and logout) and a content column max 1080px.
- **App (tablet, 768–1023px):** the rail collapses to a 72px icon rail.
- **App (phone, <768px):** a compact top bar and a bottom tab bar with a centred ember "+" button, reachable with one thumb. Tables become stacked rows (not cards-in-cards). Summary cards stack, with balance first and full-width.
- The dashboard reads top to bottom: greeting and month switcher, balance card plus income/expense, spending overview next to recent transactions, then spending by category.

## Elevation & Depth

The system is mostly flat. Depth comes from tone (paper → raised paper → sunken) and 1px rule borders.

Only things that genuinely float get a shadow: dialogs, the mobile tab bar, the marketing nav pill and toasts. That shadow has a top-down light (`0 12px 32px -16px`) and is tinted from the ink, `rgba(29, 28, 26, 0.28)`, never neutral black. The balance card has no shadow; its weight comes from being the only ink-dark block on a light page.

On the night surface, depth comes from light rather than shadow: one radial ember glow placed off-canvas top-right (the "sun"), and hairline orbit arcs at 8–10% opacity.

## Shapes

Radius is hierarchical, and each step means something:

- 6px: inputs and small controls
- 8px: buttons
- 12px: cards and list containers
- 16px: the balance card and dialogs, the two most important containers
- full: chips, the segmented control, the "+" button, avatars and the nav pill. These are things you tap to toggle or act.

Borders are 1px in the rule colour. Focus is a 2px ember ring with a 2px paper offset; it appears instantly and is never animated. Lucide icons only, at 1.75 stroke: 16px inline and 20px in navigation.

## Components

- **Balance card:** the ink block. It shows the month balance in large mono, the label "Balance" in graphite-on-ink, and a thin meter showing expenses as a share of income. The meter's fill is the ember. Nothing else on the card is coloured.
- **Summary pair (income / expense):** raised-paper cards. Each has a 32px icon disc (moss tint with an up-right arrow for income, expense tint with a down-left arrow for expense), the label and a mono amount.
- **Transaction row:** a category icon disc, then the description (or the category if there is no description) as the title with the category and date in graphite below. The signed mono amount sits right-aligned. Hover tints the row sunken; Edit and Delete appear in a row menu, and the menu is always visible on touch screens.
- **Category spending:** horizontal bars in ink at decreasing opacity per rank, each with its label and mono amount. No legend, since every bar is labelled. The top category's bar is full ink.
- **Segmented control:** a sunken track with an ink active pill, used for All / Income / Expenses and for Expense / Income in the form.
- **Dialogs:** a raised-paper sheet with a 16px radius and a 40% ink scrim. On phones it is a bottom sheet. Focus is trapped and Esc closes it. The delete dialog uses a brick button labelled "Delete".
- **Toasts:** bottom-centre, ink with on-primary text, auto-dismissed after 4s, with no layout shift. Success copy is plain ("Transaction added"). No confetti.
- **Empty states:** a line drawing in ink at low opacity, a one-sentence heading, one helper line and one button.
- **Skeletons:** sunken-paper blocks at the real component sizes, with a slow opacity pulse that is disabled under reduced motion.

## Do's and Don'ts

- Do use ember only for the next action, the focus ring and the balance meter. Never use it for headings, icons or chart bars.
- Do show every amount in Geist Mono with tabular figures, right-aligned, with a `+` or `−` sign and an arrow icon.
- Do format money through the single currency formatter (`₱1,250.00`). Never hand-format.
- Do keep the night surface to the marketing hero, the closing CTA band and the footer. The app is always day.
- Don't introduce a second accent or a category colour palette. Distinguish categories by icon and label.
- Don't put shadows on static cards. Use the raised-paper tone and the rule border.
- Don't use pure `#FFFFFF` or `#000000` anywhere. Use raised paper and ink.
- Don't round anything past 16px except the full-pill controls listed under Shapes.
- Don't animate on scroll. The only orchestrated motion is the hero entrance; everything else is a 120–220ms state transition on transform or opacity.
- Don't use gradient text, glass panels or decorative blobs. The single ember glow in the hero is the system's one atmospheric gesture.
