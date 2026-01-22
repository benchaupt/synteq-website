import type { Metadata } from 'next'
import Link from 'next/link'

import { RelatedPosts } from '@/payload/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/payload/components/PayloadRedirects'
import RichText from '@/payload/components/RichText'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

import { AnimatedButton } from '@/app/_components/animated-button'
import { BlogCarousel } from '@/app/_components/blog-carousel'
import { ShareArticle } from '@/app/(marketing)/blogs/[slug]/_components/share-article'
import { LivePreviewListener } from '@/payload/components/LivePreviewListener'
import { formatDateTime } from '@/payload/utilities/formatDateTime'
import { generateMeta } from '@/payload/utilities/generateMeta'
import type { Category, Media } from '@/payload-types'
import React from 'react'

// Enable ISR: revalidate every 60 seconds
export const revalidate = 60;

// Helper to extract URL from a media field
function getMediaUrl(media: number | Media | null | undefined): string {
    if (!media) return "";
    if (typeof media === "number") return "";
    return media.url || "";
}

// Helper to extract category title
function getCategoryTitle(category: number | Category | null | undefined): string {
    if (!category) return "";
    if (typeof category === "number") return "";
    return category.title || "";
}

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

    // Fetch recent posts for "Read more" carousel (excluding current post)
    const payload = await getPayload({ config: configPromise })
    const recentPostsResult = await payload.find({
        collection: 'posts',
        depth: 2,
        limit: 6,
        overrideAccess: false,
        sort: '-publishedAt',
        where: {
            _status: { equals: 'published' },
            slug: { not_equals: slug },
        },
    })

    const recentPosts = recentPostsResult.docs.map((p) => ({
        image: getMediaUrl(p.heroImage) || getMediaUrl(p.meta?.image),
        category: getCategoryTitle(p.categories?.[0]),
        title: p.title || '',
        description: p.meta?.description || '',
        href: `/blogs/${p.slug}`,
    }))

    return (
        <article className="pt-16 pb-16">

            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            {draft && <LivePreviewListener />}




            <section className="max-w-viewport w-full mx-auto px-5 pt-24 pb-8">
                <div className="flex flex-col items-center gap-4">
                    {/* Category & Read Time */}
                    <span className="subheading text-center">
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
                    <h1 className="heading text-center max-w-2xl">
                        {post.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-dark-foreground tracking-tight text-center max-w-2xl">
                        {post.meta?.description}
                    </p>

                    {/* Date & Share */}
                    <div className="flex items-center gap-8 flex-wrap justify-center mt-4">
                        {post.publishedAt && (
                            <span className="font-mono text-xs text-darker-accent tracking-tight uppercase">
                                <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
                            </span>
                        )}
                        <span className="w-px h-4 bg-foreground/20" />
                        <ShareArticle />
                    </div>
                </div>
            </section>





            {/* Header Image - Below header, above content */}
            {(() => {
                const heroImage = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null;
                const metaImage = post.meta?.image && typeof post.meta.image === 'object' ? post.meta.image : null;
                const image = heroImage || metaImage;

                if (image && image.url) {
                    return (
                        <section className="max-w-viewport w-full mx-auto px-5 pb-8">
                            <div className="w-full aspect-[4/3] md:aspect-[5/2] lg:aspect-[5/2] rounded-lg overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={image.alt || post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </section>
                    );
                }
                return null;
            })()}

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
                        <RichText className="max-w-[60rem]" data={post.content} enableGutter={false} />
                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <RelatedPosts
                                className="mt-12 max-w-[52rem]"
                                docs={post.relatedPosts.filter((post) => typeof post === 'object')}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Read More Carousel */}
            {recentPosts.length > 0 && (
                <section className="max-w-viewport w-full mx-auto px-5 pt-48 pb-24">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-8 lg:gap-12 mb-6 md:mb-8 lg:mb-12 px-4 md:px-6 lg:px-[25px]">
                        <h2 className="heading">Read more</h2>
                        <Link href="/blogs">
                            <AnimatedButton background="dark" size="default">
                                View all
                            </AnimatedButton>
                        </Link>
                    </div>
                    <BlogCarousel blogs={recentPosts} />
                </section>
            )}
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
