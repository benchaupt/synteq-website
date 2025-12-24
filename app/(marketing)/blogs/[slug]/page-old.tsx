/* eslint-disable @next/next/no-img-element */
import { Footer } from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import Link from "next/link";
import { ArticlePagination } from "./_components/article-pagination";
import { ShareArticle } from "./_components/share-article";

// Dummy blog post data - will be replaced with actual data fetching later
const BLOG_POSTS = [
  {
    slug: "self-updating-llm-intro",
    category: "ENGINEERING",
    readTime: "2 MINUTES READ",
    title: "Introducing the next step towards self-updating LLM models",
    description:
      "The agent now monitors your codebase, proactively identifies new LLM model updates, and surfaces needed suggestions to your team.",
    date: "DECEMBER 8, 2025",
  },
  {
    slug: "assistant-improvements",
    category: "ENGINEERING",
    readTime: "5 MINUTES READ",
    title: "Inside our effort to improve the Synteq assistant",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis.",
    date: "DECEMBER 5, 2025",
  },
  {
    slug: "crunchbits-joining",
    category: "AGENT NATIVE DEVELOPMENT",
    readTime: "3 MINUTES READ",
    title: "Crunchbits is joining Synteq to accelerate high-performance compute solutions",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis.",
    date: "DECEMBER 1, 2025",
  },
  {
    slug: "self-updating-llm",
    category: "COMPANY",
    readTime: "4 MINUTES READ",
    title: "Introducing self-updating LLM models",
    description:
      "A data-driven look at improving the assistant, powered by ClickHouse and deeper feedback analysis.",
    date: "NOVEMBER 28, 2025",
  },
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Find the current post
  const currentIndex = BLOG_POSTS.findIndex((post) => post.slug === slug);
  const post = BLOG_POSTS[currentIndex] || BLOG_POSTS[0];

  // Get prev/next slugs for pagination
  const prevSlug = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1].slug : undefined;
  const nextSlug = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1].slug : undefined;

  return (
    <>
      <Navigation />
      <main className="flex flex-col bg-background">
        {/* Article Header */}
        <section className="max-w-viewport w-full mx-auto px-5 pt-24 pb-8">
          <div className="flex flex-col items-center gap-6">
            {/* Pagination */}
            <ArticlePagination
              currentIndex={currentIndex >= 0 ? currentIndex : 0}
              totalArticles={BLOG_POSTS.length}
              prevSlug={prevSlug}
              nextSlug={nextSlug}
            />

            {/* Category & Read Time */}
            <span className="font-mono text-lg text-darker-accent tracking-tight uppercase text-center">
              {post.category} / {post.readTime}
            </span>

            {/* Title */}
            <h1 className="text-4xl text-foreground leading-tight tracking-tight text-center max-w-2xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-dark-foreground tracking-tight text-center max-w-2xl">
              {post.description}
            </p>

            {/* Date & Share */}
            <div className="flex items-center gap-8 flex-wrap justify-center">
              <span className="font-mono text-lg text-darker-accent tracking-tight uppercase">
                {post.date}
              </span>
              <ShareArticle />
            </div>
          </div>
        </section>

        {/* Article Content - Placeholder for markdown rendering */}
        <section className="max-w-viewport w-full mx-auto px-5 py-12">
          <article className="mx-auto max-w-3xl flex flex-col gap-6">
            {/* Intro paragraph */}
            <p className="text-xl text-dark-foreground leading-relaxed tracking-tight">
              Cloudflare&apos;s latest transparency report — covering the first half of 2025 — is now live. As part of our commitment to transparency, Cloudflare publishes such reports twice a year, describing how we handle legal requests for customer information and reports of abuse of our services. Although we&apos;ve been publishing these reports for over 10 years, we&apos;ve continued to adapt our transparency reporting and our commitments to reflect Cloudflare&apos;s growth and changes as a company. Most recently, we made changes to the format of our reports to make them even more comprehensive and understandable.
            </p>

            {/* Section 1 */}
            <h3 className="text-xl text-[#d9d9d9] font-semibold tracking-tight mt-4">
              1. Detect code changes that require documentation updates
            </h3>
            <p className="text-xl text-dark-foreground leading-relaxed tracking-tight">
              Whenever you ship, no matter how big or small, the agent reviews the changed files and identifies suggestions for what needs to be updated and reflected in your docs.
            </p>

            {/* Section 2 */}
            <h3 className="text-xl text-[#d9d9d9] font-semibold tracking-tight mt-4">
              2. Surface the updates
            </h3>
            <p className="text-xl text-dark-foreground leading-relaxed tracking-tight">
              In the agent panel, you&apos;ll see exactly which PRs introduced changes that may require documentation. This means no more guessing, no more hunting information, no more asking your teammates &quot;who knows how this works?&quot;
            </p>

            {/* Image */}
            <img
              src="/assets/blog/article-content-image.png"
              alt="Documentation workflow"
              className="w-full border border-white/10 my-4"
            />

            {/* Section 3 */}
            <h3 className="text-xl text-[#d9d9d9] font-semibold tracking-tight mt-4">
              3. Generate documentation drafts
            </h3>
            <p className="text-xl text-dark-foreground leading-relaxed tracking-tight">
              With full context of your codebase and your existing documentation structure and tone, the agent creates a draft that you can iterate on, refine, and generate a PR.
            </p>
            <p className="text-xl text-dark-foreground leading-relaxed tracking-tight">
              It keeps a human in the loop while automating your workflow, so you can stay ahead and publish docs as quickly as you ship products.
            </p>
            <p className="text-xl text-dark-foreground leading-relaxed tracking-tight">
              If you&apos;re ready to explore auto-updating documentation,{" "}
              <Link href="/contact" className="underline decoration-from-font hover:text-foreground transition-colors">
                get in touch for a demo
              </Link>
              .
            </p>
          </article>
        </section>

        {/* Bottom Share */}
        <section className="max-w-viewport w-full mx-auto px-5 pb-32">
          <div className="flex justify-center">
            <div className="bg-white/5 border border-white/10 px-8 py-4">
              <ShareArticle />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
