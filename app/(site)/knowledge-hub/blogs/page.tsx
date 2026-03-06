import { Section } from "@/app/_components/section";
import { StyledHeading } from "@/app/_components/styled-heading";
import { getBlogs, getCategories } from "@/lib/payload/blogs";
import { BlogList } from "./_components/blog-list";

export const metadata = {
  title: "Blog | Synteq Digital",
  description:
    "Insights, guides, and updates from the Synteq Digital team.",
};

export default async function BlogsPage() {
  const [blogs, categories] = await Promise.all([
    getBlogs(1, 50),
    getCategories(),
  ]);

  const categoryNames = categories.map((c) => c.title);

  return (
    <>
      {/* Small ancillary header */}
      <Section className="pt-28 md:pt-32" innerClassName="pb-8 md:pb-12">
        <div className="flex flex-col gap-2">
          <span className="subheading">Blog</span>
          <StyledHeading as="h1" className="heading">
            {"Latest Insights."}
          </StyledHeading>
        </div>
      </Section>

      <Section innerClassName="pt-8 md:pt-12">
        <BlogList posts={blogs.docs} categories={categoryNames} />
      </Section>
    </>
  );
}
