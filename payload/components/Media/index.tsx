import React from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const mediaContent = isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />

  if (htmlElement === null) {
    return mediaContent
  }

  const Tag = htmlElement as React.ElementType<{ className?: string; children?: React.ReactNode }>
  return <Tag className={className}>{mediaContent}</Tag>
}
