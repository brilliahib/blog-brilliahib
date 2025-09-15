import { Metadata } from "next";
import BlogDetailWrapper from "@/components/organisms/blog/BlogDetailWrapper";
import { getMetadata } from "@/lib/metadata";
import { buildFromAppURL } from "@/utils/misc";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await fetch(
    `https://api-blog.brilliahib.tech/api/blogs/${slug}`
  ).then((res) => res.json());

  const keywords =
    post.data.tags?.map((tag: { name: string }) => tag.name) || [];

  return getMetadata({
    title: post.data.title,
    description:
      "A collection of my writings, where I share lessons learned, technical deep dives, and insights from my journey as a developer.",
    url: `https://blog.brilliahib.tech/blog/${slug}`,
    image: buildFromAppURL(post.data.image),
    type: "article",
    keywords,
  });
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  return (
    <section>
      <BlogDetailWrapper slug={slug} />
    </section>
  );
}
