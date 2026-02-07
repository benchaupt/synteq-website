import { hardware, toSlug, type HardwareSpec } from '@/lib/hardware-data'
import { AnimatedCard } from '@/app/_components/animated-card'
import { Check } from 'lucide-react'
import Link from 'next/link'

export type HardwareComparisonBlockProps = {
  title?: string
  hardwareIds: string[]
  highlightSpec?: string
  showFullSpecs?: boolean
  blockType: 'hardwareComparison'
}

type Props = HardwareComparisonBlockProps & {
  className?: string
}

function parseSpecValue(spec: HardwareSpec): number {
  const num = parseFloat(spec.value)
  return isNaN(num) ? 0 : num
}

function findBestForSpec(products: typeof hardware, specLabel: string): string | null {
  // Count how many products have this spec
  const productsWithSpec = products.filter((p) => p.specs.some((s) => s.label === specLabel))

  // Only show "best" if multiple products have the spec (actual comparison)
  if (productsWithSpec.length < 2) return null

  let bestId: string | null = null
  let bestValue = -Infinity

  for (const product of products) {
    const spec = product.specs.find((s) => s.label === specLabel)
    if (spec) {
      const value = parseSpecValue(spec)
      // For TDP, lower is better
      if (specLabel === 'TDP') {
        if (bestId === null || value < bestValue) {
          bestValue = value
          bestId = product.id
        }
      } else {
        if (value > bestValue) {
          bestValue = value
          bestId = product.id
        }
      }
    }
  }

  return bestId
}

export function HardwareComparisonBlock({
  className,
  title,
  hardwareIds,
  highlightSpec = 'none',
  showFullSpecs = true,
}: Props) {
  const products = hardwareIds
    .map((id) => hardware.find((h) => h.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  if (products.length < 2) {
    return (
      <div className={className}>
        <div className="p-6 text-center">
          <p className="text-white/50">Select at least 2 hardware products to compare</p>
        </div>
      </div>
    )
  }

  // Collect all unique spec labels
  const allSpecLabels = Array.from(
    new Set(products.flatMap((p) => p.specs.map((s) => s.label)))
  )

  // Find best product for highlighted spec
  const bestProductId = highlightSpec !== 'none' ? findBestForSpec(products, highlightSpec) : null

  return (
    <div className={['not-prose flex flex-col gap-6', className].filter(Boolean).join(' ')}>
      {title && (
        <h3 className="text-xl font-semibold text-white text-center">{title}</h3>
      )}

      {/* Product Cards */}
      <div className={`grid grid-cols-1 ${products.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 md:gap-8`}>
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <AnimatedCard className="h-full" isActive disableScale disableTextColor>
              <div className="flex flex-col gap-4 items-center">
                <div className="size-24 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} className="object-contain" alt={product.name} />
                </div>
                <h3 className="font-mono text-sm md:text-base text-accent text-center">{product.name}</h3>
                {bestProductId === product.id && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
                    <Check className="size-3" />
                    Best {highlightSpec}
                  </span>
                )}
              </div>
            </AnimatedCard>
          </div>
        ))}
      </div>

      {/* Specifications Table */}
      <div className="overflow-x-auto bg-background">
        <div className="bg-background-secondary p-4 md:p-6 border-b border-white/5">
          <h3 className="subheading">Technical Specifications</h3>
        </div>

        {/* Spec Rows */}
        <div className="divide-y divide-white/5 min-w-0">
          {/* Header row with product names */}
          <div className={`grid ${products.length === 2 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-3 sm:grid-cols-4'} gap-3 md:gap-4 p-4 md:p-6 transition-colors bg-background-secondary/50`}>
            <div className="font-mono text-xs text-white/40 uppercase tracking-wider hidden sm:block">Spec</div>
            {products.map((product) => (
              <div key={product.id} className="font-mono text-xs sm:text-sm text-accent truncate">{product.name}</div>
            ))}
          </div>

          {/* Spec rows */}
          {allSpecLabels.map((specLabel) => {
            const bestForThisSpec = findBestForSpec(products, specLabel)

            return (
              <div key={specLabel} className={`grid ${products.length === 2 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-3 sm:grid-cols-4'} gap-3 md:gap-4 p-4 md:p-6 transition-colors hover:bg-white/[0.02]`}>
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider col-span-full sm:col-span-1">{specLabel}</div>
                {products.map((product) => {
                  const spec = product.specs.find((s) => s.label === specLabel)
                  const isBest = bestForThisSpec === product.id && showFullSpecs

                  return (
                    <div key={product.id} className="text-sm">
                      {spec ? (
                        <span className={spec.accentValue || isBest ? 'text-accent' : ''}>
                          {spec.value}
                          {spec.unit && <span className="text-accent ml-1">{spec.unit}</span>}
                          {isBest && <Check className="inline-block size-4 text-accent ml-1" />}
                        </span>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-6 md:gap-12 justify-center">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/clusters?product=${toSlug(product.name)}`}
            className="group relative font-mono text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2"
          >
            View {product.name}
            <svg
              className="size-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z"
                fill="currentColor"
              />
            </svg>
            <span className="absolute left-0 -bottom-1 h-px w-full bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>
        ))}
      </div>
    </div>
  )
}
