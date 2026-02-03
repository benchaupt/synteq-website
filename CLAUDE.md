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

- **Framework**: Next.js 16.1.0 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animation**: motion/react (Framer Motion fork)
- **UI Primitives**: Radix UI (accordion), Base UI, Embla Carousel
- **Utilities**: class-variance-authority (CVA), clsx, tailwind-merge

## Architecture

### Folder Structure
- `app/` - Next.js App Router pages and layouts
- `app/(marketing)/` - Route group for marketing pages (hardware, cloud)
- `app/_components/` - Shared reusable components
- `app/(marketing)/[page]/_components/` - Page-specific components
- `lib/utils.ts` - Utility functions (cn() for class merging)
- `public/assets/` - Static assets organized by page

### Key Patterns

**Component Structure**: CRITICAL - Each section/component MUST use the following wrapper structure for correct positioning:
```typescript
<section className="max-w-viewport w-full mx-auto px-5 py-32 flex flex-col">
  {/* or <div> */}
</section>
```
- `px-5` and `max-w-viewport` are REQUIRED and must NOT be changed
- `py-32` can be adjusted based on design needs (e.g., `py-24`, `py-40`)
- This ensures consistent horizontal padding and maximum width across all viewports

**Client Components**: Add `"use client"` directive for interactive components (navigation, carousels, animations).

**Variant-Based Components**: Use CVA for component variants:
```typescript
const buttonVariants = cva("base-classes", {
  variants: {
    size: { default: "...", wide: "..." },
    background: { light: "...", dark: "...", primary: "..." }
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
import { Navigation } from "@/app/_components/navigation"
```

**Figma Design Integration**: CRITICAL - When implementing designs from Figma:
- **NEVER use localhost URLs** (e.g., `http://localhost:3845/assets/...`) directly in code
- **ALWAYS download assets first** using `curl` or similar tools and save to `public/assets/{page-name}/`
- Organize assets by page name matching the route (e.g., `landing`, `hardware`, `cloud`)
- Use proper relative paths in code: `/assets/{page-name}/icon-name.svg`
- This ensures assets are available in production and not dependent on local Figma plugin server
- **Use descriptive file names** - NOT generic names like `frame1.svg`, `image1320.png`, `group27.svg`
  - ✅ Good: `hero-background.png`, `pricing-icon.svg`, `team-photo.jpg`, `cost-graph.svg`
  - ❌ Bad: `frame1.svg`, `image1320.png`, `vector12.svg`, `group28.svg`
  - Descriptive names make the codebase maintainable and help others understand what each asset is for

Example workflow:
```bash
# Download Figma asset (for landing page) - use descriptive names
curl -s "http://localhost:3845/assets/[hash].svg" -o public/assets/landing/hero-icon.svg

# Use in code
<img src="/assets/landing/hero-icon.svg" alt="" />
```

### Theme & Styling

Custom CSS variables defined in `globals.css`:
- `--color-background`: #0F1315 (dark navy)
- `--color-background-secondary`: #161C1F (elevated surfaces)
- `--color-foreground`: #F7EEEE (off-white)
- `--color-accent`: #4BDEB7 (teal)
- `--color-darker-accent`: #31D6BD (darker teal)
- `--spacing-viewport`: 1400px (max content width)

Use these variables via Tailwind: `bg-background`, `bg-background-secondary`, `text-foreground`, `text-accent`, `max-w-viewport`

**CRITICAL - Color Usage**:
- **ALWAYS use Tailwind color variables** instead of arbitrary hex values (e.g., `bg-[#161c1f]`)
- Check `globals.css` for existing color variables before using any hex color
- ✅ Good: `bg-background-secondary`, `text-accent`, `border-foreground/10`
- ❌ Bad: `bg-[#161c1f]`, `text-[#4BDEB7]`, `border-[#F7EEEE]/10`
- **If a color doesn't exist in the config**:
  - Stop and inform the user about the missing color
  - Propose adding it as a new CSS variable in `globals.css`
  - Wait for user confirmation before proceeding
  - Use a semantic name that describes the color's purpose (e.g., `background-secondary`, `accent-muted`)
- This ensures consistency, maintainability, and makes future theme changes easier

### Typography Guidelines

**CRITICAL - Text Size Selection**:
- **NEVER use arbitrary text sizes** (e.g., `text-[18px]`, `text-[22px]`) when a Tailwind utility class exists within 4-6px
- Always prefer standard Tailwind text utilities: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.
- **If no close match exists** (>6px difference), inform the user and ask for confirmation before proceeding

**Line Height & Letter Spacing**:
- **Avoid arbitrary `leading-*` and `tracking-*` values** whenever possible
- Use standard Tailwind utilities: `leading-tight`, `leading-normal`, `leading-relaxed`, `tracking-tight`, `tracking-normal`, `tracking-wide`
- **Prefer using `gap` utilities** for vertical spacing between text elements instead of adjusting line-height
- If arbitrary leading/tracking is absolutely necessary for design accuracy, it's acceptable but avoid using arbitrary pixel values - use Tailwind's default scale

**Responsive Spacing**:
- **NEVER use arbitrary margin-left/right** (e.g., `ml-[40px]`, `mr-[120px]`) for spacing elements
- Use responsive spacing patterns instead:
  - **Flexbox/Grid with `gap`**: `flex gap-4`, `grid gap-6` for consistent spacing
  - **Standard Tailwind margin scale**: `mx-4`, `mx-8`, `mx-12`, etc.
  - **Responsive variants**: `mx-4 md:mx-8 lg:mx-12` for breakpoint-specific spacing
  - **Padding for containers**: Use `px-*` utilities with responsive variants
- Arbitrary margins break responsive behavior and create fixed-width layouts that don't adapt to different screen sizes

**Width Constraints**:
- **Avoid arbitrary `w-[*]` values** - use `max-w-*` instead for responsive behavior
- **Prefer max-width over fixed width**:
  - ✅ `max-w-xl`, `max-w-2xl`, `max-w-4xl` - element shrinks on small screens
  - ✅ `max-w-viewport` - uses the custom 1400px max width (defined in globals.css)
  - ❌ `w-[600px]` - causes horizontal scroll on mobile
- Use fixed widths (`w-*`) only for:
  - Small UI elements (icons, avatars, badges)
  - Grid layouts where you need precise control: `grid-cols-[200px_1fr]`
- For responsive widths, use: `w-full`, `w-screen`, or percentage-based utilities

**Square Elements (Size Utility)**:
- **ALWAYS use `size-*`** instead of separate `h-*` and `w-*` when dimensions are equal
- ✅ `size-11`, `size-8`, `size-full` - cleaner and more maintainable
- ❌ `h-11 w-11` - redundant and verbose
- Examples: icons, avatars, square buttons, decorative elements

**Height Constraints**:
- **NEVER use static heights** (`h-[*]`) - always prefer minimum heights (`min-h-*`)
- **Default approach**:
  - ✅ `min-h-96`, `min-h-screen` - allows content to grow naturally
  - ✅ Let content determine height (no height class at all)
  - ❌ `h-[500px]` - truncates overflowing content
- **If you believe a static height is necessary**:
  - Stop and inform the user why you think it's needed
  - Wait for confirmation before proceeding
  - Consider if `min-h-*` + `flex` or `grid` can achieve the same layout
- Static heights break responsive design and cause content overflow issues on different screen sizes or when content changes

**Reference - Tailwind Text Scale**:
```
text-xs   → 12px (0.75rem)
text-sm   → 14px (0.875rem)
text-base → 16px (1rem)
text-lg   → 18px (1.125rem)
text-xl   → 20px (1.25rem)
text-2xl  → 24px (1.5rem)
text-3xl  → 30px (1.875rem)
text-4xl  → 36px (2.25rem)
text-5xl  → 48px (3rem)
text-6xl  → 60px (3.75rem)
text-7xl  → 72px (4.5rem)
text-8xl  → 96px (6rem)
text-9xl  → 128px (8rem)
```

### Animation Components

- **AnimatedButton/AnimatedCard**: Hover effects with corner animations
- **Marquee**: Infinite scroll (horizontal/vertical), pause on hover
- **ScrollRevealText**: Text reveal on scroll using motion/react
