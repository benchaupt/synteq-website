import { hardware, toSlug, type HardwareSpec } from '@/lib/hardware-data'
import { Check, Trophy } from 'lucide-react'
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
        <div className="bg-background-secondary border border-white/10 rounded-xl p-6 text-center">
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
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      <div className="bg-background-secondary border border-white/10 rounded-xl overflow-hidden">
        {title && (
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-sm font-medium text-white/50 min-w-32">
                  Specification
                </th>
                {products.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-40">
                    <Link
                      href={`/compute/${toSlug(product.name)}`}
                      className="group inline-flex flex-col items-center gap-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 object-contain"
                      />
                      <div className="text-center">
                        <p className="text-xs font-mono text-accent uppercase tracking-wider">
                          {product.manufacturer}
                        </p>
                        <p className="font-medium text-white group-hover:text-accent transition-colors">
                          {product.name}
                        </p>
                      </div>
                      {bestProductId === product.id && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">
                          <Trophy className="size-3" />
                          Best {highlightSpec}
                        </span>
                      )}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecLabels.map((specLabel, index) => {
                // Find best value for this spec
                const bestForThisSpec = findBestForSpec(products, specLabel)

                return (
                  <tr
                    key={specLabel}
                    className={index % 2 === 0 ? 'bg-white/[0.02]' : ''}
                  >
                    <td className="p-4 text-sm text-white/70">{specLabel}</td>
                    {products.map((product) => {
                      const spec = product.specs.find((s) => s.label === specLabel)
                      const isBest = bestForThisSpec === product.id && showFullSpecs

                      return (
                        <td key={product.id} className="p-4 text-center">
                          {spec ? (
                            <span
                              className={`font-mono ${
                                spec.accentValue
                                  ? 'text-accent'
                                  : isBest
                                  ? 'text-accent font-medium'
                                  : 'text-white'
                              }`}
                            >
                              {spec.value}
                              {spec.unit && (
                                <span className="text-white/50 text-sm ml-0.5">
                                  {spec.unit}
                                </span>
                              )}
                              {isBest && (
                                <Check className="inline-block size-4 text-accent ml-1" />
                              )}
                            </span>
                          ) : (
                            <span className="text-white/30">—</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Quick links */}
        <div className="p-4 border-t border-white/10 flex flex-wrap gap-2 justify-center">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/compute/${toSlug(product.name)}`}
              className="px-4 py-2 bg-white/5 hover:bg-accent/10 text-white hover:text-accent text-sm rounded-lg transition-colors"
            >
              View {product.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
