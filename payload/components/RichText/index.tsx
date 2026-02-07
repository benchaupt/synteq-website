import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/payload/blocks/Code/Component'
import { XEmbedBlock, XEmbedBlockProps } from '@/payload/blocks/XEmbed/Component'
import { GitHubEmbedBlock, GitHubEmbedBlockProps } from '@/payload/blocks/GitHubEmbed/Component'
import { HardwareProductBlock, HardwareProductBlockProps } from '@/payload/blocks/HardwareProduct/Component'
import { HardwareComparisonBlock, HardwareComparisonBlockProps } from '@/payload/blocks/HardwareComparison/Component'
import { AIModelBlock, AIModelBlockProps } from '@/payload/blocks/AIModel/Component'

import type {
  BannerBlock as BannerBlockProps,
  // CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/payload/blocks/Banner/Component'
import { cn } from '@/payload/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | XEmbedBlockProps
      | GitHubEmbedBlockProps
      | HardwareProductBlockProps
      | HardwareComparisonBlockProps
      | AIModelBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blogs' ? `/blogs/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[60rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    xEmbed: ({ node }) => <XEmbedBlock className="col-start-2 mb-4" {...node.fields} />,
    githubEmbed: ({ node }) => <GitHubEmbedBlock className="col-start-2 mb-4" {...node.fields} />,
    hardwareProduct: ({ node }) => <HardwareProductBlock className="col-start-2 mb-4" {...node.fields} />,
    hardwareComparison: ({ node }) => <HardwareComparisonBlock className="col-start-1 col-span-3 mb-4" {...node.fields} />,
    aiModel: ({ node }) => <AIModelBlock className="col-start-2 mb-4" {...node.fields} />,
    // cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose-sm md:prose dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
