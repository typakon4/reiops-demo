---
name: ReiOps Midnight Command Center
theme: dark
inspiration: Metaview-style command center, adapted for ReiOps amber identity
colors:
  ink: "#000000"
  panel: "#0a0f0d"
  panel-2: "#121615"
  panel-3: "#191f1c"
  line: "rgba(255, 255, 255, 0.09)"
  line-strong: "rgba(255, 255, 255, 0.17)"
  text: "#ffffff"
  muted: "#9ca09d"
  faint: "#5e6262"
  amber: "#f6a313"
  amber-soft: "#ffd98a"
  green: "#7affb4"
  cyan: "#55d6ff"
  red: "#ff6b6b"
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: "72px-88px desktop, 36px-42px mobile"
    fontWeight: "700"
    lineHeight: "0.98 desktop, 1.02 mobile"
    letterSpacing: "-0.04em desktop, -0.03em mobile"
  headline:
    fontFamily: Space Grotesk
    fontSize: "36px-48px"
    fontWeight: "700"
    lineHeight: "1.04"
  body:
    fontFamily: Manrope
    fontSize: "16px-20px"
    fontWeight: "400"
    lineHeight: "1.6"
  label:
    fontFamily: Space Mono
    fontSize: "9px-12px"
    fontWeight: "700"
    lineHeight: "1"
    letterSpacing: "0.16em-0.24em"
  code:
    fontFamily: Space Mono
    fontSize: "12px-13px"
    fontWeight: "400"
    lineHeight: "1.55"
radii:
  buttons: "999px"
  nav: "999px"
  cards: "16px"
  product-card: "24px-28px"
  chips: "8px-12px"
spacing:
  page-max-width: "1280px"
  section-y: "80px-112px"
  card-padding: "16px-24px"
  grid-gap: "12px-16px"
---

# ReiOps Design System

## Style Summary

ReiOps should feel like a premium command center for engineering teams operating AI coding agents. The visual direction is **Midnight Command Center**: deep black backgrounds, elevated dark product surfaces, crisp white typography, muted operational copy, and a single warm amber accent for primary actions and approval states.

The style can borrow the broad feel of Metaview: centered high-confidence hero, full-bleed black canvas, rounded product cards, pill navigation, and product UI as the main visual asset. Do not copy Metaview directly. ReiOps keeps its own amber identity, agent-control positioning, and engineering operations content.

The page should look serious, precise, and product-led. It should not look like a generic AI landing page, cybersecurity vaporware, or childish cyberpunk.

## Brand Personality

- Premium B2B devtools.
- Serious, operational, and calm.
- Slightly cybernetic, but not sci-fi theatrical.
- Product-first: show real controls, traces, approvals, cost, files, tests, and GitHub workflow.
- Credible for an a16z Speedrun application: no fake traction, no fake enterprise scale, no inflated operational claims.

## Color System

### Core

- `ink #000000`: primary page background.
- `panel #0a0f0d`: recessed product panels and dark cards.
- `panel-2 #121615`: elevated cards, nav, dashboard shells.
- `panel-3 #191f1c`: hover states and secondary elevated surfaces.
- `text #ffffff`: headings and critical labels.
- `muted #9ca09d`: body text and secondary descriptions.
- `faint #5e6262`: metadata, timestamps, low-priority labels.
- `line rgba(255,255,255,0.09)`: normal border/divider.
- `line-strong rgba(255,255,255,0.17)`: stronger border for active product surfaces.

### Accents

- `amber #f6a313`: primary CTA, approval action, active warm signal.
- `amber-soft #ffd98a`: small labels, icons, glow highlights.
- `green #7affb4`: running, passing, healthy status only.
- `red #ff6b6b`: failing tests, blocked, destructive warnings.
- `cyan #55d6ff`: branch/tooling accents, secondary trace events.

Use amber as the main brand accent. Green, red, and cyan are semantic status colors, not brand colors.

## Backgrounds

Use full-bleed black as the default. Add subtle atmosphere only:

```css
background:
  radial-gradient(circle at 50% -8%, rgba(246, 163, 19, 0.20), rgba(246, 163, 19, 0.08) 18rem, transparent 42rem),
  radial-gradient(circle at 78% 28%, rgba(122, 255, 180, 0.10), transparent 32rem),
  linear-gradient(180deg, #000000 0%, #020504 44%, #000000 100%);
```

Grid lines are allowed but must be subtle:

```css
background-size: 48px 48px;
background-image:
  linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
```

Do not use generic AI orbs, colorful blobs, bokeh, or decorative SVG gradients as the primary visual.

## Typography

Use:

- `Space Grotesk` for display and headings.
- `Manrope` for body and UI text.
- `Space Mono` for timestamps, trace labels, command names, metadata, and technical tags.

Hero headline:

- Desktop: 72-88px, 700, line-height around 0.98, tracking around -0.04em.
- Mobile: 36-42px, line-height around 1.02, tracking around -0.03em.
- Keep it centered.
- Avoid text overflow on mobile. Use explicit mobile line breaks if needed.

Body copy:

- Muted gray.
- 16-20px.
- Comfortable line-height, around 1.6.
- Max width around 720px for hero copy.

Labels:

- Uppercase, monospace, small.
- Letter spacing around 0.16em-0.24em.
- Use for section eyebrows and product UI labels.

## Layout

Use a centered max-width container around 1280px.

Page structure:

1. Sticky top nav.
2. Centered hero.
3. Large product dashboard mockup.
4. Product capability cards.
5. Problem section.
6. Core capabilities.
7. Workflow section.
8. Trace demo.
9. Security/trust.
10. Prototype proof.
11. Design partner CTA.
12. Footer.

Vertical rhythm:

- Hero top padding: 64-96px.
- Section vertical padding: 80-112px.
- Card grids: 12-16px gap.
- Avoid cramped enterprise-dashboard density on the marketing page.

## Navigation

Use a sticky black nav with subtle blur.

Nav links:

- Centered pill container on desktop.
- `Product`, `Workflow`, `Approvals`, `Security`, `Prototype`.
- Text muted by default, white on hover.
- Hide nav links on mobile if space is tight.

Primary nav CTA:

- Amber filled pill.
- Text: `Join Waitlist`.
- Hide on very small screens if it creates crowding.

Do not add fake sign-in or fake app login unless there is a real app route.

## Buttons

Primary:

- Amber fill.
- Black text.
- Fully rounded pill.
- Height around 56px in hero, 44px in nav.
- Bold label.

Secondary:

- White fill.
- Black text.
- Fully rounded pill.
- Used for `Watch Demo`.

Tertiary:

- Dark translucent background.
- White or muted text.
- Rounded 8-12px.

Do not use sharp rectangular CTA buttons in this style.

## Cards

Cards are dark elevated surfaces, not flat grid boxes.

Use:

- `panel` or `panel-2` backgrounds.
- 16px radius for normal cards.
- 24-28px radius for large product mockups.
- Subtle border: `rgba(255,255,255,0.09)`.
- No heavy drop shadows. Prefer inset highlight plus dark ambient shadow.

Recommended card shadow:

```css
box-shadow:
  inset 0 1px 0 rgba(255,255,255,.04),
  0 24px 80px rgba(0,0,0,.42);
```

Product mockup glow:

```css
box-shadow:
  0 0 0 1px rgba(246,163,19,.18),
  0 32px 120px rgba(246,163,19,.10),
  0 42px 120px rgba(0,0,0,.72);
```

## Product Dashboard Mockup

The hero visual should look like a realistic command center, not an illustration.

Required dashboard elements:

- Active agent task.
- GitHub issue source.
- Live trace events.
- Approval required card.
- Cost meter.
- Files changed.
- Tests passing/failing status.

Recommended composition:

- Large rounded product shell.
- Small browser control dots in top-left.
- Workspace/repo metadata in top-right on desktop.
- Main task panel on the left.
- Approval and metrics on the right.
- On mobile, stack panels vertically and hide nonessential metadata.

Product UI should use realistic mock data only:

- `GitHub issue #128`
- `fix/login-timeout`
- `src/auth/session.ts`
- `npm test`
- `$0.61`
- `2 files changed`
- `Approval required before PR`

## Status Language

Use status colors functionally:

- Green: `Running`, `Tests passing`, healthy states.
- Amber: approval required, medium risk, active CTA.
- Red: failing tests or blocked actions.
- Cyan: branches, tool calls, trace markers.

Status dots may glow subtly, but avoid over-animation.

## Sections

### Hero

Headline:

`Operate AI agents like a real engineering team.`

Subheadline:

`ReiOps gives dev teams a command center to launch AI agents, monitor live execution, inspect traces, control costs, and approve risky actions before they touch production.`

CTA:

- Primary: `Join Design Partner Waitlist`
- Secondary: `Watch Demo`

Hero should be centered, high contrast, and product-led. The dashboard mockup should appear immediately below the hero copy on desktop and mobile.

### Capability Cards

Replace fake metrics with product capabilities:

- Live Agents
- Execution Traces
- Approval Gates
- Cost Control

Cards should be concise, dark, rounded, and product-oriented.

### Problem

Keep it direct and credible. Show why teams need an operational layer:

- No visibility.
- No control.
- No audit trail.
- No cost ownership.

### Workflow

Show a clean flow:

`Issue -> Agent branch -> Live trace -> Tests -> Human approval -> Pull request -> Review`

Use compact rounded dark cards. Avoid decorative timeline gimmicks that reduce clarity.

### Trace Demo

Show terminal-like events in a rounded dark card:

```text
[10:42] GitHub issue #128 assigned to agent
[10:43] Created branch fix/login-timeout
[10:44] Edited src/auth/session.ts
[10:45] Ran tests - 1 failing
[10:47] Applied fix
[10:49] Tests passing
[10:50] Approval required before opening PR
[10:52] Pull request #341 opened
```

Side details:

- Files changed: 2
- Commands run: npm test, npm run lint
- Cost: $0.61
- Risk: Medium
- Approval: Required before PR

### Security / Trust

Tone: operational and precise, not compliance theater.

Include:

- Approval gates before merge, deploy, secrets, or production changes.
- Audit logs for every agent action.
- BYOK for model and workspace credentials.
- Per-repo and per-agent permissions.
- Human override for dangerous actions.

### Prototype Proof

Must be honest and specific:

`Built from Rei, our internal agent operating system.`

Mention:

- Telegram-first control interface.
- Mini App dashboard.
- Git-backed workspace.
- BYOK credentials.
- Human-in-the-loop controls.
- Scheduled agent workflows.

Do not imply enterprise production usage or large-scale traction.

## Copy Rules

Do:

- Be clear, specific, and operational.
- Use engineering workflow language: issues, branches, traces, PRs, tests, approvals, credentials.
- Emphasize trust, visibility, auditability, and control.
- Say `design partners`, `prototype`, `internal operating system` where appropriate.

Do not:

- Claim fake traction.
- Claim fake enterprise deployments.
- Use `1.2B events`, `12,000 nodes`, or similar invented scale.
- Use `AI magic`, `autonomous everything`, or vague hype.
- Add fake login/sign-in.
- Use `© 2024 ReiOps Infrastructure Group`.

Footer:

`© 2026 ReiOps`

## Mobile Rules

Mobile must be manually checked.

Required:

- No horizontal page overflow.
- Hero headline must fit within viewport.
- CTA buttons should stack full-width.
- Dashboard mockup should stack vertically.
- Hide workspace metadata if it crowds the dashboard top bar.
- Tags should wrap and remain centered.
- Product card text should wrap cleanly.

Use separate mobile line breaks for hero text when needed.

## Implementation Notes For Agents

When building the page:

- Use React + Tailwind CSS.
- Single-page responsive landing page.
- No backend required.
- Use realistic mock data only.
- Prefer product UI visuals over decorative imagery.
- Keep the current ReiOps content structure unless asked otherwise.
- Use amber for brand action, green/red/cyan only for status.
- Validate desktop and mobile screenshots before finalizing.

Suggested Tailwind tokens:

```js
colors: {
  ink: "#000000",
  panel: "#0a0f0d",
  panel2: "#121615",
  panel3: "#191f1c",
  line: "rgba(255, 255, 255, 0.09)",
  line2: "rgba(255, 255, 255, 0.17)",
  warm: "#ffffff",
  muted: "#9ca09d",
  faint: "#5e6262",
  amber: "#f6a313",
  amber2: "#ffd98a",
  green: "#7affb4",
  cyan: "#55d6ff",
  red: "#ff6b6b"
}
```

## Agent Prompt Summary

Use this short prompt when passing the style to another agent:

> Build ReiOps in a Midnight Command Center style: deep black full-bleed canvas, centered high-confidence hero, pill nav and CTAs, rounded dark product cards, realistic agent-operation dashboard mockups, and ReiOps amber as the only brand accent. Borrow the broad feel of Metaview command-center UI but do not clone it. Keep the page product-led, serious, credible, and precise. Avoid generic AI orbs, fake traction, fake enterprise claims, and fake login. Mobile must have no horizontal overflow.
