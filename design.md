# Style Guide for Enigma (Legal-GPT)

## Color System

### Primary Palette
The project uses a dark theme centered around deep blacks and grays with purple accents for branding and semantic colors for risk indicators. [1](#0-0) 

| Color Name | Hex Value | Usage |
|------------|-----------|-------|
| `obsidian` | `#050505` | Main background color |
| `surface` | `#111111` | Card and panel backgrounds |
| `edge` | `#222222` | Borders and dividers |
| `silver` | `#999999` | Secondary text and labels |
| `accent` (purple) | `#7c5cfc` | Primary actions, highlights, branding |

### Risk/Semantic Colors
Traffic light system for contract risk assessment: [2](#0-1) 

| Risk Level | Hex Value | Usage |
|------------|-----------|-------|
| `risk.high` | `#ef4444` | High risk indicators, critical issues |
| `risk.medium` | `#f59e0b` | Medium risk warnings, caution |
| `risk.low` | `#22c55e` | Low risk, safe indicators |

## Typography

### Font Family
The primary font is **Plus Jakarta Sans** with Inter and system-ui as fallbacks. [3](#0-2) [4](#0-3) 

```css
font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
```

### Font Weights
- 400 (Regular)
- 500 (Medium)
- 600 (Semibold)
- 700 (Bold)
- 800 (Extrabold)

### Text Colors
- Headings (`h1`-`h6`): `#ffffff` (white) [5](#0-4) 
- Body text: `#999999` (silver) [6](#0-5) 
- Secondary text: `#666666`
- Muted text: `#444444`

## Backgrounds

### Main Background
The application uses a deep black background (`#050505`) with an interactive DotGrid component overlay. [7](#0-6) 

### DotGrid Background
An interactive physics-based background with the following configuration: [8](#0-7) 

- `dotSize`: 4px
- `gap`: 18px
- `baseColor`: `#3a2d5c` (purple-gray)
- `activeColor`: `#7c5cfc` (purple)
- `proximity`: 130px
- `shockRadius`: 250px
- `resistance`: 750

### Panel Backgrounds
- Standard panels: `#0a0a0a` (slightly lighter than obsidian)
- Elevated cards: `#111111` (surface)

## Layout System

### Container Width
Maximum content width is `1100px` defined as `max-w-container`. [9](#0-8) 

### Grid Systems
- **Split Panel Layout**: 2-column grid for main features (scan/generate) [10](#0-9) 
- **Feature Grid**: 3-column responsive grid for feature cards [11](#0-10) 
- **Dashboard Grid**: 12-column grid for document viewer and risk feed [12](#0-11) 

### Spacing
- Section padding: `py-20` to `py-24`
- Card padding: `p-6` to `p-10`
- Gap between elements: `gap-4` to `gap-8`

## Component Styles

### Buttons
- **Primary CTA**: Purple background (`#7c5cfc`), white text, rounded-xl, hover scale effect [13](#0-12) 
- **Secondary**: Transparent with border, hover background change
- **Hover effect**: `hover:scale-[1.02] transition-all duration-300`

### Cards
- Background: `#111111` with `border-[#222]`
- Border radius: `rounded-2xl` (16px)
- Hover state: Border color change to semantic color, subtle scale [14](#0-13) 

### Badges
- Small rounded pills with uppercase tracking
- Background: Low-opacity semantic color
- Border: Matching semantic color at 20% opacity [15](#0-14) 

### Inputs
- Background: `#0a0a0a`
- Border: `#222`
- Focus state: Border changes to purple (`#7c5cfc`) at 40% opacity [16](#0-15) 

## Utility Classes

### Frosted Glass
A utility class for glassmorphism effects: [17](#0-16) 

```css
.frosted-glass {
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #222;
}
```

### Scrollbar Styling
Custom thin scrollbars with dark theme: [18](#0-17) 

- Width: 4px
- Track: Transparent
- Thumb: `#222` (hover: `#444`)
- Border radius: 999px

### Text Selection
Selection color uses purple accent at 30% opacity: [19](#0-18) 

```css
::selection {
  background: rgba(124, 92, 252, 0.3);
  color: #fff;
}
```

## Animation Patterns

### GSAP Animations
- **Easing**: `power4.out` for most transitions [20](#0-19) 
- **Stagger**: 0.15s to 0.2s for sequential reveals
- **Duration**: 0.6s to 0.8s for entrance animations

### Scroll Animations
- **Trigger**: Elements animate when reaching 80% of viewport height (`top 80%`) [21](#0-20) 
- **Movement**: Y-axis translation (30-40px) with fade-in

### Micro-interactions
- Hover scales: `hover:scale-[1.02]`
- Border color transitions: `transition-all duration-300`
- Smooth color transitions on interactive elements

## Navigation

### Navbar
- Fixed position with backdrop blur on scroll [22](#0-21) 
- Logo: Purple square with checkmark icon
- Active state: White text with subtle background
- Mobile: Hamburger menu with full-width overlay

### Footer
- Dark background with top border
- Three-column layout (Brand, Navigation, Tech Stack) [23](#0-22) 
- Status indicator: Green dot for "System Operational"

## Notes

The design system emphasizes a professional, trustworthy aesthetic suitable for legal applications. The dark theme reduces eye strain during document review, while the purple accent (`#7c5cfc`) provides consistent branding throughout. The risk color system (red/yellow/green) follows standard conventions for immediate visual communication of contract safety levels. All interactive elements include subtle animations and hover states to enhance user experience without being distracting.

Wiki pages you might want to explore:
- [Animation Patterns (GSAP & Lenis) (manishsuthar01/enigma)](/wiki/manishsuthar01/enigma#6.2)
- [Glossary (manishsuthar01/enigma)](/wiki/manishsuthar01/enigma#8)

### Citations

**File:** client/tailwind.config.js (L9-20)
```javascript
            colors: {
                obsidian: '#050505',
                surface: '#111111',
                edge: '#222222',
                silver: '#999999',
                accent: '#1539',
                risk: {
                    high: '#ef4444',
                    medium: '#f59e0b',
                    low: '#22c55e',
                },
            },
```

**File:** client/tailwind.config.js (L21-23)
```javascript
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
            },
```

**File:** client/tailwind.config.js (L24-26)
```javascript
            maxWidth: {
                container: '1100px',
            },
```

**File:** client/index.html (L8-11)
```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
    rel="stylesheet" />
```

**File:** client/src/index.css (L3-6)
```css
::selection {
  background: rgba(124, 92, 252, 0.3);
  color: #fff;
}
```

**File:** client/src/index.css (L13-14)
```css
  background: #050505;
  color: #999;
```

**File:** client/src/index.css (L19-26)
```css
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #ffffff;
}
```

**File:** client/src/index.css (L29-50)
```css
* {
  scrollbar-width: thin;
  scrollbar-color: #222 transparent;
}

*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #222;
  border-radius: 999px;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #444;
}
```

**File:** client/src/index.css (L53-58)
```css
.frosted-glass {
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid #222;
}
```

**File:** client/src/layouts/publicLayout.jsx (L9-23)
```javascript
        <div className="min-h-screen bg-[#050505] text-[#999] flex flex-col relative">
            {/* Universal DotGrid background */}
            <div className="fixed inset-0 z-0">
                <DotGrid
                    dotSize={4}
                    gap={18}
                    baseColor="#3a2d5c"
                    activeColor="#7c5cfc"
                    proximity={130}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1}
                />
            </div>
```

**File:** client/src/pages/scanPage/ScanContract.jsx (L15-19)
```javascript
const overallBadge = {
    high: { bg: 'bg-[#ef4444]/5', border: 'border-[#ef4444]/20', text: 'text-[#ef4444]', label: '⚠ High Risk' },
    medium: { bg: 'bg-[#f59e0b]/5', border: 'border-[#f59e0b]/20', text: 'text-[#f59e0b]', label: '⚡ Medium Risk' },
    low: { bg: 'bg-[#22c55e]/5', border: 'border-[#22c55e]/20', text: 'text-[#22c55e]', label: '✓ Low Risk' },
};
```

**File:** client/src/pages/scanPage/ScanContract.jsx (L341-344)
```javascript
                <div
                    ref={panelRef}
                    className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-[#222] h-[72vh] min-h-[520px]"
                >
```

**File:** client/src/pages/homePages/WhyTrust.jsx (L59-61)
```javascript
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {features.map((feature, idx) => (
                    <div
```

**File:** client/src/pages/homePages/RiskDashboard.jsx (L10-12)
```javascript
                trigger: dashboardRef.current,
                start: "top 80%",
            }
```

**File:** client/src/pages/homePages/RiskDashboard.jsx (L45-46)
```javascript
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#0a0a0a] border border-[#222] rounded-b-2xl overflow-hidden min-h-[700px]">

```

**File:** client/src/pages/homePages/RiskDashboard.jsx (L92-93)
```javascript
                        <div className="analysis-card bg-[#111] border border-[#222] p-6 rounded-2xl hover:border-[#ef4444]/40 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
```

**File:** client/src/pages/homePages/HeroPage.jsx (L9-9)
```javascript
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
```

**File:** client/src/pages/homePages/HeroPage.jsx (L57-62)
```javascript
                <a
                    href="/generate"
                    className="flex items-center gap-2 bg-[#7c5cfc] border border-[#222] text-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-[#111] hover:border-[#333] hover:scale-[1.02] transition-all duration-300"
                >
                    Generate a Contract
                </a>
```

**File:** client/src/pages/generateContract/GenerateContract.jsx (L30-31)
```javascript
    const inputCls = 'w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#7c5cfc]/40 transition-colors';
    const labelCls = 'block text-[#666] text-[10px] font-bold uppercase tracking-widest mb-2';
```

**File:** client/src/components/Navbar.jsx (L22-25)
```javascript
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-[#222]'
            : 'bg-transparent'
            }`}>
```

**File:** client/src/components/Footer.jsx (L8-9)
```javascript
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

```
