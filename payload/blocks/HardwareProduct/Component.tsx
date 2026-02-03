import { hardware, toSlug } from '@/lib/hardware-data'
import { CornerCard } from '@/app/_components/corner-card'
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
        <CornerCard className="text-center">
          <p className="text-white/50">Hardware product not found</p>
        </CornerCard>
      </div>
    )
  }

  const slug = toSlug(product.name)
  const productUrl = `/clusters?product=${slug}`

  const content = (
    <CornerCard className="!p-0 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 p-6 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-48 object-contain"
          />
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between gap-12 mb-4">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                {product.manufacturer}
              </p>
              <h3 className="text-2xl font-regular text-white group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </div>
            {linkToProduct && (
              <svg
                className="shrink-0 size-5 text-accent -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.000235885 7.36992C0.000235485 6.87117 0.404899 6.46651 0.904036 6.46612L10.3528 6.46613C11.1055 6.46613 11.4827 5.55582 10.9503 5.02341L7.48116 1.55432C7.12813 1.20129 7.12813 0.6291 7.48116 0.276071L7.49416 0.263067C7.84681 -0.0888145 8.41862 -0.0891969 8.77164 0.263832L14.8776 6.36974C15.4302 6.92243 15.4302 7.81819 14.8776 8.37088L8.77165 14.4768C8.41862 14.8298 7.84643 14.8298 7.4934 14.4768L7.4804 14.4638C7.12737 14.1107 7.12737 13.5386 7.48039 13.1855L10.9499 9.71606C11.4823 9.18364 11.1052 8.27334 10.3524 8.27334L0.904036 8.27372C0.405282 8.27372 0.000618115 7.86906 0.000618368 7.37031L0.000235885 7.36992Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </div>

          {showSpecs && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 py-4">
              {product.specs.slice(0, 4).map((spec) => (
                <div key={spec.label}>
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
    </CornerCard>
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
