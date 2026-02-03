import { hardware, toSlug } from '@/lib/hardware-data'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export type HardwareProductBlockProps = {
  hardwareId: string
  showSpecs?: boolean
  showDescription?: boolean
  linkToProduct?: boolean
  blockType: 'hardwareProduct'
}

type Props = HardwareProductBlockProps & {
  className?: string
}

export function HardwareProductBlock({
  className,
  hardwareId,
  showSpecs = true,
  showDescription = true,
  linkToProduct = true,
}: Props) {
  const product = hardware.find((h) => h.id === hardwareId)

  if (!product) {
    return (
      <div className={className}>
        <div className="bg-background-secondary border border-white/10 rounded-xl p-6 text-center">
          <p className="text-white/50">Hardware product not found</p>
        </div>
      </div>
    )
  }

  const slug = toSlug(product.name)
  const productUrl = `/compute/${slug}`

  const content = (
    <div className="bg-background-secondary border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-colors group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 p-6 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-48 object-contain"
          />
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                {product.manufacturer}
              </p>
              <h3 className="text-2xl font-semibold text-white group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </div>
            {linkToProduct && (
              <div className="shrink-0 size-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <ArrowRight className="size-5 text-accent" />
              </div>
            )}
          </div>

          {showSpecs && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {product.specs.slice(0, 4).map((spec) => (
                <div key={spec.label} className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/50 mb-1">{spec.label}</p>
                  <p className={`font-mono font-medium ${spec.accentValue ? 'text-accent' : 'text-white'}`}>
                    {spec.value}
                    {spec.unit && <span className="text-white/50 text-sm ml-0.5">{spec.unit}</span>}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showDescription && product.descriptions[0] && (
            <p className="text-sm text-white/60 line-clamp-2">
              {product.descriptions[0].text}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  if (linkToProduct) {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <Link href={productUrl}>{content}</Link>
      </div>
    )
  }

  return (
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      {content}
    </div>
  )
}
