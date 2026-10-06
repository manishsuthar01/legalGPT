# LegalGPT Design System & Visual Specification (`style.md`)

*The single source of truth for the LegalGPT visual design language, design tokens, layout hierarchy, legal-specific components, and interaction patterns.*

---

## 1. Design Philosophy

LegalGPT is a **purpose-built contract intelligence and legal technology platform**. Its purpose is to help legal counsel, contract managers, and executives audit, dissect, and remediate commercial agreements with precision and confidence.

### The Core Paradigm
Traditional AI consumer applications follow an ephemeral loop:
$$\text{Prompt} \longrightarrow \text{AI Response} \longrightarrow \text{Floating Card}$$

LegalGPT operates on a rigorous evidentiary document workflow:
$$\textbf{Legal Document} \longrightarrow \textbf{Clause Extraction} \longrightarrow \textbf{Risk Analysis} \longrightarrow \textbf{Statutory Evidence} \longrightarrow \textbf{Action / Redline}$$

### Guiding Principles
* **Editorial & Precise**: Visual rhythm reflects a premier legal review journal or high-end legal workspace. Every pixel and margin conveys deliberate intent.
* **Calm & Document-Centric**: The legal contract and its clauses are the primary object of scrutiny. The interface frames and clarifies the text without competing with it.
* **Restrained & Trustworthy**: Avoid the generic "AI SaaS" tropes. No neon purple/cyan gradients, no cosmic dust or animated background blobs, no floating oversized cards with massive blurs.
* **Structured via Borders & Surface Tiers**: Contrast is achieved through subtle surface layering, fine 1px structural borders, and typographic hierarchy rather than giant dropshadows.
* **Domain-Specific Risk Semantics**: Risk indicators (Critical, High, Medium, Low) are semantic status markers that direct attention to liability—they are never used as general decorative branding colors.

---

## 2. Design Tokens

### 2.1 Color System

The LegalGPT palette is rooted in **Deep Oxford Ink, Fine Parchment, Law Slate, Charcoal, and Muted Navy**, accented with an authoritative **Warm Brass / Cognac** and strict semantic risk pigments.

#### Dark Mode (Primary Workspace Theme)
| Token | Hex | Role & Application |
|---|---|---|
| `--color-bg-canvas` | `#090B0E` | Main page canvas / deepest viewport background |
| `--color-surface-base` | `#0F1218` | Primary panel surface, sidebar, header, document containers |
| `--color-surface-elevated`| `#161B23` | Cards, active panels, popovers, dropdown menus, modals |
| `--color-surface-overlay` | `#1C222D` | Hover states on elevated surfaces, tooltips, flyouts |
| `--color-surface-inset` | `#0B0E13` | Code blocks, original contract quotes, table headers |
| `--color-surface-muted` | `#131720` | Secondary wells, disabled containers, subtle chips |
| `--color-fg-primary` | `#F1F4F8` | Primary high-contrast text, headings, clause titles |
| `--color-fg-secondary` | `#9DA8B9` | Body text, legal commentary, descriptions, labels |
| `--color-fg-muted` | `#636F83` | Metadata, timestamps, footnote disclosures, disabled text |
| `--color-border-subtle` | `#181E29` | Light section dividers, nested item borders |
| `--color-border-default` | `#222938` | Standard structural borders on cards, inputs, sidebars |
| `--color-border-strong` | `#333E53` | Hover borders, active item boundaries, table borders |
| `--color-border-focus` | `#4B72C2` | Keyboard focus ring, selected state borders |
| `--color-brand-primary` | `#2B5EA7` | Authoritative Muted Navy — primary button backgrounds, brand highlights |
| `--color-brand-primary-hover`| `#356FBF` | Hover state for primary buttons |
| `--color-brand-primary-fg`| `#FFFFFF` | Foreground on primary buttons |
| `--color-brand-accent` | `#C49B55` | Warm Legal Brass / Cognac — editorial accents, advisor callouts |

#### Light Mode (Editorial Export / Light Theme Tokens)
| Token | Hex | Role & Application |
|---|---|---|
| `--color-bg-canvas` | `#F5F6F8` | Warm stone background canvas |
| `--color-surface-base` | `#FFFFFF` | Crisp document paper, main sidebar, workspace cards |
| `--color-surface-elevated`| `#FFFFFF` | Modals, flyouts, dropdowns (elevated with subtle border) |
| `--color-surface-inset` | `#F0F2F5` | Original clause quote boxes, code blocks |
| `--color-fg-primary` | `#0E141D` | Deep Oxford ink text |
| `--color-fg-secondary` | `#4A5568` | Editorial charcoal body copy |
| `--color-fg-muted` | `#7E8B9F` | Muted captions and metadata |
| `--color-border-subtle` | `#ECEEF2` | Inner dividers |
| `--color-border-default` | `#DCE1E8` | Structural card borders |
| `--color-border-strong` | `#BAC3D1` | Active borders |
| `--color-brand-primary` | `#1E429F` | Regal Oxford Navy |

#### Semantic Risk Tokens (Strict Multi-Modal Palette)
Risk colors must never be used solely as backgrounds. They always pair an icon, text label, and bounded border/tint:
| Risk Level | Solid Hex | Soft Background (Dark) | Soft Border (Dark) | Meaning in Legal Context |
|---|---|---|---|---|
| **Critical** | `#DC2626` | `rgba(220, 38, 38, 0.10)` | `rgba(220, 38, 38, 0.28)` | Fatal legal exposure: uncapped indemnities, severe regulatory breach |
| **High** | `#E05252` | `rgba(224, 82, 82, 0.09)` | `rgba(224, 82, 82, 0.25)` | Major commercial risk: unilateral termination, broad IP assignment |
| **Medium** | `#D97706` | `rgba(217, 119, 6, 0.09)` | `rgba(217, 119, 6, 0.25)` | Ambiguous clause terms, non-standard notice windows (e.g. 90-day auto-renew) |
| **Low** | `#16A34A` | `rgba(22, 163, 74, 0.09)` | `rgba(22, 163, 74, 0.25)` | Standard protective terms, mutual confidentiality, safe carve-outs |
| **Neutral / Info** | `#3B82F6` | `rgba(59, 130, 246, 0.08)` | `rgba(59, 130, 246, 0.22)` | Informational observations, jurisdiction notes, citations |

---

## 3. Typography System

The typography creates a clear dichotomy between **system navigational metadata** and **document clause readability**.

### Font Families
* **Primary UI Font (`--font-sans`)**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `sans-serif`
* **Editorial & Clause Font (`--font-serif`)**: `Newsreader`, `Charter`, `Georgia`, `"Times New Roman"`, `serif` (used for contract reading surfaces and original clause text)
* **Monospace Code/Clause ID (`--font-mono`)**: `"JetBrains Mono"`, `Menlo`, `Monaco`, `"Courier New"`, `monospace` (used for section numbers, citations, replacement diffs, metrics)

### Typographic Scale
| Token | Size | Line Height | Weight | Letter Spacing | Purpose |
|---|---|---|---|---|---|
| `display` | 32px / 2.0rem | 1.20 | 700 (Bold) | `-0.03em` | Primary workspace titles, marketing hero |
| `h1` | 24px / 1.5rem | 1.25 | 600 (Semibold) | `-0.025em` | Page header, major document title |
| `h2` | 20px / 1.25rem | 1.30 | 600 (Semibold) | `-0.02em` | Section headers: "Executive Summary", "Identified Risks" |
| `h3` | 16px / 1.0rem | 1.40 | 600 (Semibold) | `-0.015em` | Clause title, modal title, panel header |
| `h4` | 14px / 0.875rem | 1.40 | 600 (Semibold) | `-0.01em` | Subsection titles, card group labels |
| `body-lg` | 15px / 0.9375rem | 1.60 | 400 (Regular) | `-0.005em` | Lead paragraphs in analysis summaries |
| `body` | 13px / 0.8125rem | 1.60 | 400 (Regular) | `0em` | Standard interface copy, review observations |
| `body-sm` | 12px / 0.75rem | 1.55 | 400 (Regular) | `0.005em` | Secondary descriptions, subtext |
| `legal-clause` | 13.5px / 0.844rem | 1.70 | 400 (Regular) | `0.005em` | Contract clause verbatim text (high legibility) |
| `label-caps` | 10px / 0.625rem | 1.20 | 700 (Bold) | `+0.08em` | Uppercase metadata labels: `OVERALL RISK`, `JURISDICTION` |
| `mono` | 12px / 0.75rem | 1.50 | 400 (Regular) | `0em` | Replacement contract language, clause IDs, citation chips |

---

## 4. Spacing System

A mathematical **4px/8px rhythm** controls density. Legal workspaces prioritize information density without feeling cramped.

| Token | Pixels | Usage |
|---|---|---|
| `space-1` | 4px | Micro-spacing between icon and badge label, indicator dot offset |
| `space-2` | 8px | Button gap, list item gap, pill padding (horizontal: 10px, vertical: 4px) |
| `space-3` | 12px | Compact card padding, toolbar spacing, form element gaps |
| `space-4` | 16px | Standard card padding (mobile), component stack gap, modal inner padding |
| `space-5` | 20px | Standard card padding (desktop), sidebar navigation gap |
| `space-6` | 24px | Large card padding, dashboard widget padding, section stack gap |
| `space-8` | 32px | Major section margins, workspace padding on wide screens |
| `space-12`| 48px | Empty state container vertical padding |

---

## 5. Radius System

Legal technology requires crisp, architectural lines. Bubbles and oversized circular buttons are prohibited.

| Token | Pixels | Permitted Components |
|---|---|---|
| `radius-xs` | 3px | Indicator dots, checkbox tick boxes |
| `radius-sm` | 6px | Form inputs, select dropdowns, code block tags, tabs |
| `radius-md` | 8px | Action buttons, table row highlights, chat bubbles, alert callouts |
| `radius-lg` | 12px | Workspace cards, risk cards, clause accordion containers, chat panel |
| `radius-xl` | 16px | Dialog modals, upload dropzone outer frame, demo frame |
| `radius-pill`| 9999px | Status badges, risk level tags, trend pills, avatar indicators |

---

## 6. Border System

Borders provide structural definition in LegalGPT:
* **Default Border**: `1px solid var(--color-border-default)` (`#222938`) on all cards, inputs, and section boundaries.
* **Subtle Border**: `1px solid var(--color-border-subtle)` (`#181E29`) on internal dividers, horizontal rules, table cell separators.
* **Strong Border**: `1px solid var(--color-border-strong)` (`#333E53`) on hovered cards and active panel dividers.
* **Selected / Active Border**: `1px solid var(--color-brand-primary)` (`#2B5EA7`) or `1px solid var(--color-brand-accent)` (`#C49B55`).
* **Focus Border**: `2px solid var(--color-border-focus)` (`#4B72C2`) with an offset of 2px for WCAG 2.1 AA keyboard navigation.
* **Semantic Risk Borders**: Dedicated 1px borders paired with 8% alpha backgrounds for risk severity callouts.

---

## 7. Shadow System

The UI relies on **surface luminance contrast and crisp borders** rather than diffuse floating shadows.
* `shadow-none`: `none` (default for flat document panels and cards).
* `shadow-subtle`: `0 1px 3px rgba(0, 0, 0, 0.35)` (used for buttons and dropdown popovers).
* `shadow-elevated`: `0 4px 16px rgba(0, 0, 0, 0.45)` (used for floating action buttons, command menu).
* `shadow-modal`: `0 16px 40px -8px rgba(0, 0, 0, 0.70)` (used for dialog overlays and mobile drawers).

---

## 8. Layout System

### Shell Dimensions
* **Application Shell**: Full height fixed viewport (`100dvh`), horizontal flex layout.
* **Desktop Sidebar**:
  * Expanded: `260px` width.
  * Collapsed Rail: `64px` width.
* **Top Workspace Header**: Height `56px` to `64px`, sticky, containing document name, risk badge, jurisdiction pill, action tools.
* **Document & Analysis Column**: Fluid width (`calc(100% - chatWidth)`), scrollable document area.
* **Chat Assistant Panel**:
  * Desktop: Resizable panel on right side (`min-w-[320px]`, `default: 440px`, `max-w-[720px]`).
  * Tablet / Mobile: Segmented toggle tab or drawer, switching full viewport smoothly.
* **Max Document Reading Width**: Optimal line length for legal text is 68ch to 80ch to ensure reading ergonomics.

---

## 9. Responsive Design System

The application layout adapts systematically across 4 standard screen breakpoints:

```
[Mobile: 320px - 639px]  --> Single column stacked, full-width drawers, segmented view toggle
[Tablet: 640px - 1023px] --> Collapsible sidebar rail, stacked or tabbed analysis & chat
[Desktop: 1024px - 1279px] -> Persistent sidebar, 2-column workspace (analysis + chat)
[Large Desktop: 1280px+] -> Full expanded sidebar, multi-column analysis metrics, resizable chat
```

### Detailed Breakpoint Behavior

#### 1. Navigation Shell
* **Mobile (320–639px)**: Sidebar hidden off-canvas (`-translate-x-full`). Toggled via accessible hamburger menu in TopHeader, rendering as a high-contrast modal drawer with backdrop scrim.
* **Tablet (640–1023px)**: Sidebar collapses automatically to icon-rail mode (`64px`), preserving maximum reading room for contract clauses.
* **Desktop (1024px+)**: Sidebar expands to full `260px` with tree hierarchy, collapsible via standard `PanelLeft` control.

#### 2. Contract Analysis Workspace
* **Mobile**: Single vertical stream. Tab switcher bar (`Document Analysis` vs `Ask LegalGPT`) pinned at top. Document metadata wraps into a 2x2 or stacked 3-row metric card.
* **Tablet**: Analysis and Risk cards adjust to 1-column with compact badges.
* **Desktop**: 3-column metric header (Clauses Audited, Risk Index, Governing Law), side-by-side executive summary breakdown bars, expandable clause accordion.

#### 3. Contract Viewer & Clause Redlines
* **Mobile**: Original clause and Suggested Fix stack vertically. One-click copy button floats or aligns top-right without covering text.
* **Desktop**: Clean comparison card with original text on inset surface, followed by advisor assessment and suggested replacement language with syntax-style copy button.

#### 4. Chat Assistant
* **Mobile**: Full-screen view under the `Ask LegalGPT` tab. Chat input pinned safely above mobile keyboard (`env(safe-area-inset-bottom)`).
* **Desktop**: Integrated right column with a 6px draggable resize handle. Remembers width via `localStorage`. Can be collapsed instantly with `Cmd+K` / `Ctrl+K`.

---

## 10. Responsive Implementation Rules

1. **Fluid Typography & Containers**: Never use fixed pixel widths on clause content. Containers use `min-w-0 flex-1`.
2. **Text Wrapping**: All legal copy, replacement clauses, and URLs use `break-words` and `whitespace-pre-wrap`.
3. **Touch Targets**: All buttons, tree items, and tabs have a minimum hit target of `44px` on touch devices.
4. **Zero Horizontal Overflow**: `overflow-x-hidden` on all parent shells. Only genuine comparison tables allow bounded horizontal scrolling with subtle scrollbar indicators.
5. **Dynamic Viewport Height**: Layouts use `100dvh` instead of `100vh` to avoid mobile address bar jumping on iOS Safari and Android Chrome.

---

## 11. Component Design System

Every UI component implements the unified token architecture:

### 1. Button
* **Primary**: `bg-[#2B5EA7] hover:bg-[#356FBF] text-white font-medium rounded-md px-3.5 py-2 text-xs transition-colors border border-transparent shadow-subtle`.
* **Secondary**: `bg-[#161B23] hover:bg-[#1C222D] text-[#F1F4F8] font-medium rounded-md px-3.5 py-2 text-xs border border-[#222938] transition-colors`.
* **Outline / Ghost**: `bg-transparent hover:bg-[#161B23] text-[#9DA8B9] hover:text-[#F1F4F8] rounded-md px-2.5 py-1.5 text-xs transition-colors`.
* **Danger**: `bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-md px-3 py-1.5 text-xs transition-colors`.

### 2. Segmented Tabs (Inspired by Reference Visual Rhythms)
* Container: `bg-[#0F1218] border border-[#222938] p-1 rounded-lg flex items-center gap-1`.
* Active Tab: `bg-[#1E2430] text-[#F1F4F8] font-medium text-xs px-3 py-1.5 rounded-md shadow-subtle border border-[#2D364A]`.
* Inactive Tab: `text-[#9DA8B9] hover:text-[#F1F4F8] text-xs px-3 py-1.5 rounded-md transition-colors`.

### 3. Status & Risk Badges
* Multi-modal presentation: `Icon + Text + Border + Tint`.
* `Critical`: Red dot/shield + `CRITICAL RISK` in bold tracked uppercase + border `red-500/30` + background `red-500/10`.
* `High`: Red alert triangle + `HIGH RISK` + border `rose-500/25`.
* `Medium`: Amber alert triangle + `MODERATE RISK` + border `amber-500/25`.
* `Low`: Green checkmark + `LOW RISK` + border `emerald-500/25`.

### 4. Tree Navigation Item (Inspired by Reference 3 Hierarchy)
* Clean tree hierarchy with subtle vertical connector guides (`border-l border-[#1F2533]`).
* Numeric indicator pill (e.g. `3` flagged clauses, `8` safe clauses) styled in soft pill container (`bg-[#181D27] text-[#9DA8B9] px-2 py-0.5 rounded-full text-[10px] font-mono`).
* Active item with crisp background (`bg-[#161B23] text-[#F1F4F8] border border-[#2B3547]`).

### 5. Document Ingestion Card (Upload Dropzone)
* Purpose-built document intake:
  * Jurisdiction selector at the head (US, UK, EU, IN, AU, CA) with legal flag badge.
  * Subdued 1.5px dashed border (`border-[#2A3345] hover:border-[#3D4D6B]`).
  * Ingestion timeline preview: `1. Upload → 2. Clause Vectorization → 3. Statutory Audit → 4. Redline Advisory`.
  * Distinct file format tags: `.PDF`, `.DOCX`, `.TXT` (up to 25MB).

### 6. Clause Review Block (ClauseViewer)
* Header: Clause identifier (`§ Clause 8.2 • Indemnification`), risk severity pill, expand/collapse indicator.
* Original Text Box: Paper-inset surface (`bg-[#0A0D12] border border-[#1C222D]`), styled in high-readability legal serif or crisp editorial sans.
* Reviewer Assessment: Statutory review notes, observed risk vectors, and citations to applicable law.
* Suggested Replacement: Clearly distinguished green/amber remedial box with bold "Recommended Redline" label, clean monospace text, and one-click copy button.

### 7. Contract Chat Panel
* Dedicated contract context bar showing current active document name.
* Legal prompt chips: "Explain indemnification exposures", "Check unilateral termination clauses", "Draft mutual carve-out".
* Assistant message bubbles formatted with markdown legal citations, table comparisons, and copyable draft language.

---

## 12. Legal-Specific Visual Language

| Concept | Visual Treatment | Rationale |
|---|---|---|
| **Contract** | Document container with subtle header chrome and paper-like typography | Reinforces authority and respect for original text |
| **Clause** | Sequenced block with section numbering (§), risk badge, and clear margin | Establishes clause independence and audit trail |
| **Original Language** | Muted dark-inset box with soft charcoal text | Signals raw verbatim evidence from the uploaded agreement |
| **Suggested Fix** | Crisp elevated card with warm brass/navy accents and monospace draft | Clearly distinguishes AI attorney recommendation from original terms |
| **Missing Protections** | Warning callout box with amber/red shield and "Missing Clause" tag | Highlights silent liabilities that counsel must insert |
| **Evidence & Research** | Small citation pills with gavel/book icons (`Del. Code Ann. tit. 6`) | Backs AI findings with real statutory authority |

---

## 13. Component States

Every interactive element defines 6 mandatory states:
1. **Default**: Calibrated according to surface hierarchy.
2. **Hover**: Smooth `150ms` border brighten and surface tint lift. No sudden scale jumps or bouncing elements.
3. **Focus-Visible**: Clean `2px` focus ring with `var(--color-border-focus)` (`#4B72C2`) and `2px` offset.
4. **Active / Pressed**: Subtle `1px` inner press feedback.
5. **Disabled**: `opacity-40 pointer-events-none cursor-not-allowed`.
6. **Loading**: Restrained spinner or pulse skeleton matching component shape.

---

## 14. Motion & Animation System

Animations exist strictly to provide **spatial continuity and operational feedback**.
* `duration-fast`: `150ms` (hover states, button presses, tooltips).
* `duration-normal`: `250ms` (accordion expansions, modal entrances, tab switches).
* `duration-slow`: `400ms` (sidebar drawer toggle, multi-step progress bar).
* `easing-standard`: `cubic-bezier(0.16, 1, 0.3, 1)` (smooth deceleration).
* **Accessibility**: All animations automatically collapse to instant changes when `@media (prefers-reduced-motion: reduce)` is active.

---

## 15. Do / Don't Design Rules

| DO | DON'T |
|---|---|
| **DO** use 1px fine borders and subtle surface contrast to separate panels. | **DON'T** use huge glowing drop shadows or floating glassmorphic cards. |
| **DO** treat risk colors (Critical/High/Medium/Low) strictly as semantic status indicators. | **DON'T** use red, amber, or green as the primary website brand or button color. |
| **DO** display legal clause text with generous line-height (`1.65`-`1.75`) for reading ergonomics. | **DON'T** crowd contract paragraphs into tiny, cramped cards with small line heights. |
| **DO** clearly distinguish verbatim contract text from AI-suggested redlines. | **DON'T** mix original contract text and suggested edits into a single unstyled blob. |
| **DO** structure navigation with clear document tree hierarchy and counter pills. | **DON'T** create flat, disorganized lists without counts or risk indicators. |
| **DO** provide responsive tab switching between Document Analysis and Chat on mobile. | **DON'T** squeeze multi-column layouts into unusable horizontal overflow on mobile screens. |

---

## 16. Reference Image Inspiration & Transformation

| Visual Element in Reference | Reference Principle | LegalGPT Transformation |
|---|---|---|
| **Wollo Landing Canvas** (Ref 1 & 2) | Clean canvas framing with distinct border boundary | Framed document workspace chrome with crisp 1px borders and deep ink canvas |
| **Product Overview Tree** (Ref 3) | Hierarchical tree with connector lines and counter pills | Document tree with status pills (High/Medium/Low Risk, Processing, Completed) and clause counters |
| **Stat Cards** (Ref 3) | Big numbers, circular icon backdrops, trend pill badges | Legal Intelligence Bar: Clauses Audited, Risk Score Index, Jurisdiction Compliance Gauge |
| **Segmented Control** (Ref 4) | High-contrast pill tabs (`3 days`, `1 week`, `1 month`) | Segmented Workspace Switcher: `Document Analysis` vs `Ask LegalGPT` on tablet & mobile |
| **Colors & Illustration** | Bright pink/yellow marketing illustrations | Transformed into sophisticated Oxford Navy, Charcoal Slate, Fine Parchment, and Warm Brass |

---
