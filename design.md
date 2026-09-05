# Design System & Style Guide for Legal-GPT (Enigma)

A comprehensive breakdown of the design tokens, background canvas physics, hero structure, heading patterns, and the "Mac-style" demo window motif across the application.

---

## 1. Design Tokens & Color System

### Token Cheat-Sheet

| Token Name | Hex Value | CSS Variable / Tailwind | Usage |
|---|---|---|---|
| `obsidian` | `#050505` | `var(--color-obsidian)` / `bg-obsidian` | Main page background |
| `surface` | `#111111` | `var(--color-surface)` / `bg-surface` | Cards, panels, badges, elevated sections |
| `edge` | `#222222` | `var(--color-edge)` / `border-edge` | All structural borders & dividers |
| `silver` | `#999999` | `var(--color-silver)` / `text-silver` | Primary muted text, labels, descriptions |
| `muted-dim` | `#666666` | `text-[#666]` | Secondary muted copy, captions |
| `muted-subtle`| `#444444` | `text-[#444]` | Subtle helper text, inactive elements |
| `accent` | `#7c5cfc` | `var(--color-accent)` / `text-accent` | Brand purple, CTA buttons, active glows, accents |
| `risk-high` | `#ef4444` | `var(--color-risk-high)` / `text-risk-high` | High risk indicators, critical warnings |
| `risk-medium`| `#f59e0b` | `var(--color-risk-medium)` / `text-risk-medium` | Medium risk warnings, cautions |
| `risk-low` | `#22c55e` | `var(--color-risk-low)` / `text-risk-low` | Low risk indicators, safe clauses, operational status |

### Typography
- **Primary Font**: `Plus Jakarta Sans`, `Inter`, `system-ui`, `sans-serif`
- **Headings (`h1`-`h6`)**: Pure White (`#ffffff`), extrabold/bold with tight tracking (`tracking-tight`)
- **Accent Heading Pattern**: Every hero or section title highlights a critical phrase inside `<span className="text-[#7c5cfc]">` (e.g., *"Don't Sign Blindly. <span className="text-[#7c5cfc]">Scan for Risks.</span>"*, *"Built for <span className="text-[#7c5cfc]">Trust</span>"*).

### Container & Spacing
- **Container Max Width**: `1100px` (`max-w-container` / `max-w-[1100px]`)
- **Section Padding**: `py-20` to `py-28`
- **Border Radii**: `rounded-xl` (12px) for buttons/inputs, `rounded-2xl` (16px) for cards and window containers.

---

## 2. Background Design: DotGrid & Radial Glows

### Universal DotGrid Background
A fixed, full-screen interactive HTML5 canvas rendered at `z-0` behind everything in the marketing layout.
```tsx
<DotGrid
  dotSize={3.5}
  gap={24}
  baseColor="#5e478f"
  activeColor="#9d82fc"
  proximity={100}
/>
```
- **Physics & Styling**: Clearly visible, crisp purple dots across the whole grid (`baseColor: #5e478f`, `opacity: 0.6`). On hover, softly illuminates to `#9d82fc` with a subtle micro-nudge (max 1.5px).
- **Hero Radial Glow**:
```css
bg-[radial-gradient(ellipse_600px_400px_at_50%_40%,_rgba(124,92,252,0.08)_0%,_transparent_70%)]
```

---

## 3. Hero Page Structure

1. **Badge**: Pill with dot indicator (`w-2 h-2 rounded-full bg-accent animate-pulse`) + uppercase tracked text (`AI-POWERED CONTRACT AUDITOR`).
2. **Headline**: Huge (`text-5xl md:text-8xl`), extrabold, tight tracking, with the punchline wrapped in `<span className="text-[#7c5cfc]">`.
3. **Subtext**: Muted silver (`#999999`), centered, max-w-2xl, comfortable line-height (`leading-relaxed`).
4. **CTA Row**:
   - Primary: Solid purple `#7c5cfc`, white text, `hover:scale-[1.02]`, `hover:shadow-[0_0_25px_rgba(124,92,252,0.35)]`.
   - Secondary: Outline / Ghost `bg-surface border border-edge hover:border-[#333] hover:scale-[1.02]`.
5. **Technical Badges**: Feasible and explainable promises:
   - `IN-MEMORY PARSING • ZERO PERSISTENT STORAGE • MULTI-AGENT VERIFICATION • INSTANT REDLINES`

---

## 4. "Mac-Style" Window Chrome Motif

Applied to the landing page demo (`RiskDashboard`) and reusable across scanning/generation panels:
- **Title Bar**: `bg-[#111] border-b border-[#222] px-4 py-3 flex items-center justify-between`
- **Traffic Light Controls**:
  - Close: `#ef4444` (red) at 70% opacity, 12px circle
  - Minimize: `#f59e0b` (yellow) at 70% opacity, 12px circle
  - Maximize: `#22c55e` (green) at 70% opacity, 12px circle
- **Filename / Title**: Monospace font (`font-mono text-xs text-[#999]`), centered or aligned left (e.g. `commercial_lease_v2_redline.pdf`).
- **Two-Column Split Layout**:
  - **Left**: Document viewer with highlighted risk clauses (e.g. red/yellow inline highlights).
  - **Right**: Risk feed with score summary, severity badges (`⚠ High Risk`, `⚡ Medium Risk`, `✓ Low Risk`), and one-click "Auto-Fix Clause with AI" action.

---

## 5. Navigation & Layout Shell

- **Navbar**: Fixed `top-0`, starts transparent, smoothly transitions on scroll to `bg-[#050505]/80 backdrop-blur-xl border-b border-[#222]`.
- **Footer**: 3-column link structure, bottom row with copyright, and a live status indicator:
  - Pulsing green dot with `System Operational`.
- **Frosted Glass Utility**:
```css
.frosted-glass {
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #222222;
}
```

---

## 6. Motion Philosophy

- Micro-interactions on interactive cards: `hover:scale-[1.02] transition-all duration-300`
- Border glows on hover: `hover:border-[#7c5cfc]/40`
- Staggered entrances with smooth easing curve `ease: [0.16, 1, 0.3, 1]`.
