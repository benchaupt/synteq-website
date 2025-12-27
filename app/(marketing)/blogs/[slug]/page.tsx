import type { Metadata } from 'next'

import { RelatedPosts } from '@/payload/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/payload/components/PayloadRedirects'
import RichText from '@/payload/components/RichText'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'


import { ShareArticle } from '@/app/(marketing)/blogs/[slug]/_components/share-article'
import { LivePreviewListener } from '@/payload/components/LivePreviewListener'
import { formatDateTime } from '@/payload/utilities/formatDateTime'
import { generateMeta } from '@/payload/utilities/generateMeta'
import React from 'react'

// Enable ISR: revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = posts.docs.map(({ slug }) => {
        return { slug }
    })

    return params
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function Post({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    const url = '/blogs/' + slug
    const post = await queryPostBySlug({ slug })

    if (!post) return <PayloadRedirects url={url} />

    return (
        <article className="pt-16 pb-16">

            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            {draft && <LivePreviewListener />}




            <section className="max-w-viewport w-full mx-auto px-5 pt-24 pb-8">
                <div className="flex flex-col items-center gap-6">
                    {/* Pagination */}
                    {/* <ArticlePagination
                        currentIndex={currentIndex >= 0 ? currentIndex : 0}
                        totalArticles={BLOG_POSTS.length}
                        prevSlug={prevSlug}
                        nextSlug={nextSlug}
                    /> */}

                    {/* Category & Read Time */}
                    <span className="font-mono text-lg text-darker-accent tracking-tight uppercase text-center">
                        <div className="uppercase text-sm mb-6">
                            {post.categories?.map((category, index) => {
                                if (typeof category === 'object' && category !== null) {
                                    const { title: categoryTitle } = category

                                    const titleToUse = categoryTitle || 'Untitled category'

                                    // @ts-expect-error - post.categories is not typed
                                    const isLast = index === post.categories.length - 1

                                    return (
                                        <React.Fragment key={index}>
                                            {titleToUse}
                                            {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                                        </React.Fragment>
                                    )
                                }
                                return null
                            })}
                        </div>
                    </span>

                    {/* Title */}
                    <h1 className="text-4xl text-foreground leading-tight tracking-tight text-center max-w-2xl">
                        {post.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-dark-foreground tracking-tight text-center max-w-2xl">
                        {post.meta?.description}
                    </p>

                    {/* Date & Share */}
                    <div className="flex items-center gap-8 flex-wrap justify-center">
                        {post.publishedAt && (
                            <span className="font-mono text-lg text-darker-accent tracking-tight uppercase">

                                <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
                            </span>
                        )}
                        <ShareArticle />
                    </div>
                </div>
            </section>





            {/* <PostHero post={post} /> */}



            <div className="flex flex-col items-center gap-4 pt-8">
                <div className="container">
                    <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
                    {post.relatedPosts && post.relatedPosts.length > 0 && (
                        <RelatedPosts
                            className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                            docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                        />
                    )}
                </div>
            </div>
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const post = await queryPostBySlug({ slug })

    return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'posts',
        draft,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})
