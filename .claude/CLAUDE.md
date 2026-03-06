# Claude Code Project Rules — Synteq Digital

These rules are **mandatory**. Violations will break the build, the design system, or both. Follow them exactly.

---

## 1. Architecture Rules

### 1.1 Route Group

The ONLY public route group is `app/(site)/`. There is no `(marketing)/` group. Never create one.

### 1.2 Page Structure

Every page route under `app/(site)/` MUST have a `_components/` subdirectory for page-specific components:

```
app/(site)/hardware/
  page.tsx
  _components/
    hero-section.tsx
    product-grid.tsx
```

- Shared components live in `app/_components/`
- Page-specific components live in `app/(site)/{page}/_components/`
- NEVER put page-specific components in `app/_components/`

### 1.3 Page Composition

Pages MUST be composed from section components. No raw HTML layout in page files:

```tsx
// CORRECT
export default function HardwarePage() {
  return (
    <>
      <PageHeader label="Hardware" title="..." body="..." />
      <Section background="offwhite"><ProductGrid /></Section>
      <CTASection heading="..." buttonText="..." buttonHref="..." />
    </>
  );
}

// WRONG — raw layout JSX in page file
export default function HardwarePage() {
  return (
    <div className="max-w-viewport mx-auto px-5 py-32">
      <h1 className="text-4xl">...</h1>
      ...
    </div>
  );
}
```

### 1.4 Server Components by Default

All components are server components unless they need interactivity. Only add `"use client"` when the component uses:
- `useState`, `useEffect`, `useRef`, or other hooks
- Event handlers (`onClick`, `onChange`, etc.)
- Browser APIs (`window`, `document`)
- `motion/react` animations

### 1.5 Imports

ALWAYS use the `@/` path alias. Never use relative paths that go above the current directory:

```tsx
// CORRECT
import { cn } from "@/lib/utils"
import { Button } from "@/app/_components/button"

// WRONG
import { cn } from "../../lib/utils"
```

---

## 2. Design System Rules

### 2.1 Layout Primitives — MANDATORY

Use `<Container>` for width-constrained content and `<Section>` for full-bleed backgrounds:

```tsx
import { Container } from "@/app/_components/container"
import { Section } from "@/app/_components/section"

// Full-bleed background section
<Section background="offwhite">
  <h2>Content here is already constrained to 1200px</h2>
</Section>

// Just a width-constrained wrapper (no vertical padding)
<Container>
  <h2>Also constrained to 1200px</h2>
</Container>
```

NEVER manually write `max-w-viewport w-full mx-auto px-5` — use `<Container>` or `<Section>` instead.

### 2.2 Button Component — MANDATORY

Use `<Button>` for ALL buttons and button-like links. The old `AnimatedButton` is deleted.

```tsx
import { Button } from "@/app/_components/button"

<Button variant="primary" size="md" href="/contact">Contact Us</Button>
<Button variant="outline" size="sm" onClick={handleClick}>Click Me</Button>
```

Variants: `primary` | `secondary` | `ghost` | `outline`
Sizes: `sm` | `md` | `lg`

### 2.3 Logo Component — MANDATORY

Use `<Logo>` for all Synteq logo rendering. Never inline the SVG.

```tsx
import { Logo } from "@/app/_components/logo"
<Logo size="md" className="text-lava" />
```

---

## 3. Color Rules — STRICT

### 3.1 Available Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `lava` | `#0F1315` | Primary dark text, headings, dark backgrounds |
| `lava-90` through `lava-50` | Opacity variants | Softer dark text |
| `slate` | `#768692` | Secondary text, body copy, subtle elements |
| `slate-90` through `slate-50` | Opacity variants | Lighter secondary text |
| `cream` | `#E6E5E2` | Borders, dividers, subtle backgrounds |
| `offwhite` | `#F8F7F6` | Elevated section backgrounds |
| `background` | `#FFFFFF` | Page background (white) |
| `foreground` | `#0F1315` | Default body text (same as lava) |

### 3.2 NEVER Use These

- `text-white` on white backgrounds — use `text-lava` or `text-slate`
- `text-black` or `#000` — use `text-lava`
- `bg-[#hex]` arbitrary hex values — use token classes
- `text-accent`, `bg-accent`, `border-accent` — these tokens no longer exist
- `bg-background-secondary`, `text-dark-foreground`, `text-light-foreground` — deleted
- `text-[#ccc]` or any arbitrary gray — use `text-slate` variants

### 3.3 If a Color Is Missing

STOP. Do not use an arbitrary hex value. Instead:
1. Inform the user the color is missing
2. Propose a semantic name and add it to `globals.css` under `@theme inline`
3. Wait for approval before proceeding

---

## 4. Typography Rules — STRICT

### 4.1 Use the Type Scale

Custom scale defined in `globals.css`:
- `text-display` (4rem) — hero titles
- `text-header` (3rem) — section headings
- `text-title` (2rem) — subsection headings
- `text-body-lg` (1.25rem) — lead paragraphs
- `text-body` (1rem) — body copy
- `text-body-sm` (0.875rem) — small body
- `text-label` (0.75rem) — labels, captions

Also use standard Tailwind: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.

### 4.2 Use the Utility Classes

- `.title` — responsive display heading (bold, lava)
- `.heading` — responsive section heading (bold, lava)
- `.heading2` — responsive subsection heading (semibold, lava)
- `.heading3` — smaller heading (lava)
- `.subheading` — label-sized, semibold, uppercase, tracking-wide, slate

### 4.3 NEVER Use

- Arbitrary text sizes: `text-[18px]`, `text-[22px]` — pick the closest Tailwind/custom size
- Arbitrary leading/tracking: prefer `leading-tight`, `leading-relaxed`, `tracking-tight`, `tracking-wide`
- `font-sequel`, `font-sequel-book` — these are deleted. Use `font-sans` (DM Sans) or `font-mono` (JetBrains Mono)

---

## 5. Spacing & Layout Rules — STRICT

### 5.1 Viewport Width

`max-w-viewport` = 1200px. This is the maximum content width for all pages.

### 5.2 No Arbitrary Spacing

- NEVER use `ml-[40px]`, `mr-[120px]`, `w-[600px]`, `h-[500px]`
- Use Tailwind's spacing scale: `gap-4`, `px-8`, `py-16`, `mx-auto`
- Use `max-w-*` instead of fixed `w-[*]` for responsive behavior
- Use `min-h-*` instead of fixed `h-[*]` — let content determine height

### 5.3 Square Elements

ALWAYS use `size-*` instead of `h-* w-*` when dimensions are equal:
- `size-10` not `h-10 w-10`
- `size-6` not `h-6 w-6`

---

## 6. Component Rules

### 6.1 Class Merging

ALWAYS use `cn()` from `@/lib/utils` for conditional classes:

```tsx
import { cn } from "@/lib/utils"
cn("base-class", isActive && "active-class", className)
```

### 6.2 CVA for Variants

Use `class-variance-authority` for components with multiple visual variants:

```tsx
import { cva } from "class-variance-authority"
const variants = cva("base", { variants: { ... } })
```

### 6.3 Icons

Use `lucide-react` for UI icons. Use `<Icon>` or `<CSSIcon>` from `@/app/_components/icon` for custom SVG icons stored in `public/icons/`.

---

## 7. File & Asset Rules

### 7.1 Public Directory Structure

```
public/
  icons/           — SVG icons for Icon component
  images/
    logos/         — Synteq + partner logos
    team/          — Team headshots
    og/            — OG images per page
  assets/
    landing/       — Landing page assets
    hardware/      — Hardware page assets
    hpc/           — HPC page assets
    about/         — About page assets
    blog/          — Blog assets
    contact/       — Contact page assets
    (per-page)     — Match the route name
```

### 7.2 Asset Naming

NEVER use generic names from Figma exports:
- BAD: `frame1.svg`, `image1320.png`, `Group 20.png`, `vector12.svg`
- GOOD: `hero-background.png`, `gpu-card.svg`, `team-headshot-joe.webp`

### 7.3 No Orphan Files

If a file in `public/` is not referenced by any code, delete it. Do not leave unused assets, fonts, or SVGs.

### 7.4 Figma Integration

NEVER use localhost URLs (`http://localhost:3845/assets/...`) in code. Always download assets first:
```bash
curl -s "http://localhost:3845/assets/[hash].svg" -o public/assets/hardware/product-card.svg
```

---

## 8. Payload CMS Rules

### 8.1 Collections

| Collection | Slug | URL Pattern |
|-----------|------|-------------|
| Posts (Blog) | `posts` | `/knowledge-hub/blogs/[slug]` |
| Success Stories | `success-stories` | `/knowledge-hub/success-stories/[slug]` |
| Press Releases | `press-releases` | `/knowledge-hub/press-releases/[slug]` |

### 8.2 Data Fetching

Use the helpers in `lib/payload/`:
- `lib/payload/blogs.ts` — `getBlogs()`, `getBlogBySlug()`, `getRecentBlogs()`
- `lib/payload/success-stories.ts` — `getSuccessStories()`, `getSuccessStoryBySlug()`
- `lib/payload/press-releases.ts` — `getPressReleases()`, `getPressReleaseBySlug()`

All use `unstable_cache` with tag-based revalidation.

### 8.3 Blocks

Available richText blocks: `Banner`, `Code`, `MediaBlock`, `XEmbed`, `GitHubEmbed`

Deleted blocks (NEVER reference): `AIModel`, `HardwareProduct`, `HardwareComparison`

---

## 9. Deleted / Forbidden

These files, components, and patterns are DELETED. Never recreate or reference them:

### Components
- `AnimatedButton`, `AnimatedCard`, `CornerCard` — replaced by `Button`
- `Navigation` (`navigation.tsx`) — replaced by `Nav` (`nav.tsx`)
- `ModelPrefetch`, `SmoothScroll`, `TensorVisualization`, `ParticleQCanvas`
- `DepthImage`, `FlickeringGrid`, `ASCIIArt`, `ComparisonModal`
- `CallToAction`, `CallToActionNew` — replaced by `CTASection`

### Routes
- `/cloud`, `/clusters`, `/compute`, `/models` — deleted
- `/api/models`, `/api/admin/models`, `/api/model-logo` — deleted

### Libs
- `lib/model-cache.ts`, `lib/model-logos.ts`, `lib/hardware-data.ts` — deleted

### Payload
- `ModelManagement` global — deleted
- `AIModel`, `HardwareProduct`, `HardwareComparison` blocks — deleted

### Dependencies
- `@react-three/drei`, `@react-three/fiber`, `three`, `@types/three` — removed
- `lottie-react` — removed

### Fonts
- Sequel Sans (`.otf`, `.ttf` files) — deleted. DM Sans is the only font.

### CSS
- `--color-accent`, `--color-darker-accent`, `--color-background-secondary` — deleted
- `--color-dark`, `--color-light`, `--color-dark-foreground`, `--color-light-foreground` — deleted
- `.font-sequel`, `.font-sequel-book` — deleted

---

## 10. Build & Verification

```bash
pnpm dev      # Development server at localhost:3000
pnpm build    # Production build — must pass with zero errors
pnpm lint     # ESLint — must pass
```

After any component or page change:
1. `pnpm dev` — site loads without errors
2. Visual check at 375px (mobile) and 1440px (desktop)
3. No `text-white` on white backgrounds
4. No arbitrary hex values in className strings
5. All imports resolve (no broken `@/` paths)
