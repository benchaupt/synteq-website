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




            {/* Header Image - Above title */}
            {post.meta?.image && typeof post.meta.image === 'object' && post.meta.image.url && (
                <section className="max-w-viewport w-full mx-auto px-5 pt-24 pb-6">
                    <div className="max-w-3xl mx-auto aspect-[16/9] rounded-lg overflow-hidden">
                        <img 
                            src={post.meta.image.url} 
                            alt={post.meta.image.alt || post.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </section>
            )}

            <section className={`max-w-viewport w-full mx-auto px-5 ${post.meta?.image ? 'pt-8' : 'pt-24'} pb-8`}>
                <div className="flex flex-col items-center gap-4">
                    {/* Category & Read Time */}
                    <span className="font-mono text-xs text-darker-accent tracking-tight uppercase text-center">
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
                    </span>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl text-foreground leading-tight tracking-tight text-center max-w-2xl">
                        {post.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-dark-foreground tracking-tight text-center max-w-2xl">
                        {post.meta?.description}
                    </p>

                    {/* Date & Share */}
                    <div className="flex items-center gap-6 flex-wrap justify-center mt-2">
                        {post.publishedAt && (
                            <span className="font-mono text-xs text-darker-accent tracking-tight uppercase">
                                <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
                            </span>
                        )}
                        <ShareArticle />
                    </div>
                </div>
            </section>





            {/* <PostHero post={post} /> */}



            <div className="max-w-viewport w-full mx-auto px-5 pt-8">
                <div className="flex gap-12 lg:gap-16 relative">
                    {/* Sticky Table of Contents - Left Side */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24">
                            <nav className="flex flex-col gap-4">
                                <h3 className="font-mono text-xs text-accent uppercase tracking-wider">Table of Contents</h3>
                                <div className="flex flex-col gap-2 border-l-2 border-white/10 pl-4">
                                    {/* ToC items will be dynamically generated from content headings */}
                                    <p className="text-sm text-white/50">Content navigation will appear here</p>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <RichText className="max-w-[48rem]" data={post.content} enableGutter={false} />
                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <RelatedPosts
                                className="mt-12 max-w-[52rem]"
                                docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                            />
                        )}
                    </div>
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
