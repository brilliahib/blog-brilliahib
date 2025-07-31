import { Metadata } from "next";
import BlogDetailWrapper from "@/components/organisms/blog/BlogDetailWrapper";
import { generateStaticMetadata } from "@/utils/generate-metadata";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const rawTitle = decodeURIComponent(slug).replace(/-/g, " ");
  const title = rawTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const keywords = "blog, nextjs, typescript";

  return generateStaticMetadata(title, keywords);
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  return (
    <section>
      <BlogDetailWrapper slug={slug} />
    </section>
  );
}
