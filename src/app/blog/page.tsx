import type { Metadata } from "next";

import { BlogTimeline, PageIntro, SectionTitle } from "@/components/sections";
import { buildTitle, portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: buildTitle("Blog"),
  description: portfolio.blog.intro,
};

export default function BlogPage() {
  return (
    <div className="mb-16">
      <PageIntro title={portfolio.blog.title} description={portfolio.blog.intro} />
      <SectionTitle>All Posts</SectionTitle>
      <BlogTimeline posts={portfolio.blog.posts} />
    </div>
  );
}
