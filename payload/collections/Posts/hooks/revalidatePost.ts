import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import { revalidatePath, revalidateTag } from 'next/cache';

import type { Post } from "@/payload-types";

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/knowledge-hub/blogs/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap')
      revalidateTag('posts') // Invalidate cached blog posts on homepage
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/knowledge-hub/blogs/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
      revalidateTag('posts') // Invalidate cached blog posts on homepage
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    const path = `/knowledge-hub/blogs/${doc?.slug}`

    payload.logger.info(`Revalidating deleted post at path: ${path}`)

    revalidatePath(path)
    revalidateTag('posts-sitemap')
    revalidateTag('posts') // Invalidate cached blog posts on homepage
  }

  return doc
}
