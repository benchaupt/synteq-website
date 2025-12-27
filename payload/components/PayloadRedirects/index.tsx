import type { Post } from '@/payload-types'
import type React from 'react'

import { getCachedDocument } from '@/payload/utilities/getDocument'
import { getCachedRedirects } from '@/payload/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument(collection, id)()) as Post
      const collectionPath = collection === 'posts' ? '/blogs' : `/${collection}`
      redirectUrl = `${collectionPath}/${document?.slug}`
    } else {
      const collection = redirectItem.to?.reference?.relationTo
      const collectionPath = collection === 'posts' ? '/blogs' : `/${collection}`
      redirectUrl = `${collectionPath}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
