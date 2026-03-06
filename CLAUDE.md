# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **IMPORTANT**: This project uses both Claude Code and Cursor AI. When updating this file (`CLAUDE.md`), you MUST also update `.cursorrules` to keep both AI agents in sync. The files should contain equivalent guidelines.

## Build & Development Commands

```bash
pnpm dev      # Start development server (localhost:3000)
pnpm build    # Production build
pnpm start    # Run production server
pnpm lint     # Run ESLint
```

Node version: v24.3.0 (specified in .nvmrc)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animation**: motion/react (Framer Motion fork)
- **CMS**: Payload CMS (Cloudflare Workers + R2 + Hyperdrive)
- **UI Primitives**: Radix UI (accordion, navigation-menu), Embla Carousel
- **Utilities**: class-variance-authority (CVA), clsx, tailwind-merge, lucide-react

## Architecture

### Folder Structure
- `app/` - Next.js App Router pages and layouts
- `app/(site)/` - Route group for all public pages (hardware, hpc, about, knowledge-hub, etc.)
- `app/_components/` - Shared reusable components
- `lib/` - Utility functions, data fetching helpers
- `payload/` - Payload CMS collections, blocks, utilities
- `public/assets/` - Static assets organized by page
- `public/icons/` - SVG icons for the Icon component
- `public/images/` - Logos, team photos, OG images

### Key Patterns

**Layout Primitives**: Use `<Container>` and `<Section>` for consistent page structure:
```typescript
// Container: 1200px max-width wrapper with responsive padding
import { Container } from "@/app/_components/container"
<Container>...</Container>
// Classes: "mx-auto w-full max-w-viewport px-5 md:px-8"

// Section: Full-bleed background with constrained inner content
import { Section } from "@/app/_components/section"
<Section background="offwhite">...</Section>
// Supports: "white" | "offwhite" | "cream" | "lava"
// "lava" variant automatically adds "text-white"
```

**Button Component**: Use `<Button>` for all interactive buttons (replaces AnimatedButton):
```typescript
import { Button } from "@/app/_components/button"
<Button variant="primary" size="md" href="/contact">Contact Us</Button>
// Variants: primary, secondary, ghost, outline
// Sizes: sm, md, lg
// With href: renders as next/link. Without: renders as <button>
```

**Logo Component**: Use `<Logo>` for consistent brand rendering:
```typescript
import { Logo } from "@/app/_components/logo"
<Logo size="md" className="text-lava" />
// Sizes: sm, md, lg, xl. Uses fill="currentColor" for parent color control
```

**Client Components**: Add `"use client"` directive only for interactive components (navigation, carousels, animations). Server components by default.

**Variant-Based Components**: Use CVA for component variants:
```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { primary: "...", secondary: "...", ghost: "...", outline: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  }
})
```

**Class Merging**: Always use the `cn()` utility from `@/lib/utils`:
```typescript
import { cn } from "@/lib/utils"
cn("base-class", conditional && "conditional-class", className)
```

**Path Aliases**: Use `@/*` for imports from root:
```typescript
import { cn } from "@/lib/utils"
import { Nav } from "@/app/_components/nav"
```

**Page Composition**: Pages are pure composition of section components — no inline JSX:
```typescript
export default function HardwarePage() {
  return (
    <>
      <PageHeader label="Hardware" title="..." body="..." />
      <Section background="offwhite">...</Section>
      <CTASection heading="..." buttonText="..." buttonHref="..." />
    </>
  );
}
```

**Figma Design Integration**: CRITICAL - When implementing designs from Figma:
- **NEVER use localhost URLs** (e.g., `http://localhost:3845/assets/...`) directly in code
- **ALWAYS download assets first** using `curl` or similar tools and save to `public/assets/{page-name}/`
- Organize assets by page name matching the route (e.g., `landing`, `hardware`, `hpc`)
- Use proper relative paths in code: `/assets/{page-name}/icon-name.svg`
- **Use descriptive file names** - NOT generic names like `frame1.svg`, `image1320.png`, `group27.svg`
  - Good: `hero-background.png`, `pricing-icon.svg`, `team-photo.jpg`, `cost-graph.svg`
  - Bad: `frame1.svg`, `image1320.png`, `vector12.svg`, `group28.svg`

### Theme & Styling

Custom CSS variables defined in `globals.css`:
- `--color-background`: #FFFFFF (white)
- `--color-foreground`: #0F1315 (dark navy — "lava")
- `--color-lava`: #0F1315 (primary dark text) with opacity variants (lava-90 through lava-50)
- `--color-slate`: #768692 (secondary text/accents) with opacity variants (slate-90 through slate-50)
- `--color-cream`: #E6E5E2 (borders, dividers, subtle backgrounds)
- `--color-offwhite`: #F8F7F6 (elevated/section backgrounds)
- `--spacing-viewport`: 1200px (max content width)

Use these variables via Tailwind: `text-lava`, `text-slate`, `bg-offwhite`, `bg-cream`, `border-cream`, `max-w-viewport`

**CRITICAL - Color Usage**:
- `text-lava` for all dark text (NEVER `#000`, `text-black`, or `text-white` on white backgrounds)
- `text-slate` for secondary/body text
- `bg-offwhite` for elevated section backgrounds
- `bg-cream` for borders and subtle dividers
- `border-cream` for all borders
- **ALWAYS use Tailwind color variables** instead of arbitrary hex values
- **If a color doesn't exist in the config**:
  - Stop and inform the user about the missing color
  - Propose adding it as a new CSS variable in `globals.css`
  - Wait for user confirmation before proceeding

**Typography Utility Classes** (defined in globals.css):
- `.title` — `text-3xl md:text-4xl lg:text-display font-bold text-lava`
- `.heading` — `text-2xl md:text-3xl lg:text-header font-bold text-lava`
- `.heading2` — `text-xl md:text-2xl lg:text-title font-semibold text-lava`
- `.heading3` — `text-lg md:text-xl text-lava`
- `.subheading` — `text-label font-semibold uppercase tracking-wide text-slate`

### Typography Guidelines

**CRITICAL - Text Size Selection**:
- **NEVER use arbitrary text sizes** (e.g., `text-[18px]`, `text-[22px]`) when a Tailwind utility class exists within 4-6px
- Prefer custom typography scale: `text-display`, `text-header`, `text-title`, `text-body-lg`, `text-body`, `text-body-sm`, `text-label`
- Also use standard Tailwind: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.

**Line Height & Letter Spacing**:
- **Avoid arbitrary `leading-*` and `tracking-*` values** whenever possible
- Use standard Tailwind utilities: `leading-tight`, `leading-normal`, `leading-relaxed`, `tracking-tight`, `tracking-normal`, `tracking-wide`
- **Prefer using `gap` utilities** for vertical spacing between text elements

**Responsive Spacing**:
- **NEVER use arbitrary margin-left/right** (e.g., `ml-[40px]`, `mr-[120px]`)
- Use responsive spacing patterns: `flex gap-4`, `grid gap-6`, `mx-4 md:mx-8 lg:mx-12`

**Width Constraints**:
- **Prefer max-width over fixed width**: `max-w-xl`, `max-w-2xl`, `max-w-viewport`
- Use fixed widths only for small UI elements (icons, avatars, badges)

**Square Elements**: ALWAYS use `size-*` instead of separate `h-*` and `w-*`

**Height Constraints**: NEVER use static heights (`h-[*]`) — prefer `min-h-*` or let content determine height

### Section Components

Available section components in `app/_components/`:
- `PageHeader` — Hero section with label, title, body, optional CTA and image
- `CTASection` — Full-width call-to-action with heading, subtext, button (background variants: lava/slate/cream/offwhite)
- `FAQSection` — Accordion-based FAQ with title and subtitle
- `LogoCarousel` — Marquee of partner/client logos with grayscale hover effect
- `SuccessStoryHighlight` — Featured case study card with metrics and image
- `StatsSection` — Animated counter stats grid
- `BlogCarousel` — Embla-based blog card carousel
- `TestimonialCarousel` — Testimonial cards carousel

### Payload CMS Collections

- **Posts** (`posts`) — Blog articles at `/knowledge-hub/blogs/[slug]`
- **SuccessStories** (`success-stories`) — Case studies at `/knowledge-hub/success-stories/[slug]`
- **PressReleases** (`press-releases`) — Press releases at `/knowledge-hub/press-releases/[slug]`

### Route Structure

```
app/(site)/
  page.tsx              — Landing page
  hardware/             — Hardware products
  hpc/                  — High-performance computing
  repair/               — Repair services
  about/                — About the company
  team/                 — Team members
  careers/              — Job listings (Rippling integration)
  contact/              — Contact form (HubSpot integration)
  client-support/       — Support portal
  privacy-policy/       — Privacy policy
  terms-of-service/     — Terms of service
  accessibility/        — Accessibility statement
  not-found.tsx         — Custom 404
  knowledge-hub/
    page.tsx            — Hub overview
    blogs/              — Blog listing + [slug] detail
    success-stories/    — Success stories listing + [slug] detail
    press-releases/     — Press releases listing + [slug] detail
```

### Animation Components

- **Marquee**: Infinite scroll (horizontal/vertical), pause on hover
- **ScrollRevealText**: Text reveal on scroll using motion/react
