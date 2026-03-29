import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/sections";
import { buildTitle, portfolio, getPostBySlug } from "@/lib/portfolio";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return portfolio.blog.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: buildTitle("Not found"),
    };
  }

  return {
    title: buildTitle(post.title),
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <ArticleBody post={post} />;
}
