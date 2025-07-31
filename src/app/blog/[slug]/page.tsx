import { Metadata } from "next";
import BlogDetailWrapper from "@/components/organisms/blog/BlogDetailWrapper";
import { generateStaticMetadata } from "@/utils/generate-metadata";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: BlogPageProps): Metadata {
  const rawTitle = decodeURIComponent(params.slug).replace(/-/g, " ");
  const title = rawTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const keywords = "blog, nextjs, typescript";

  return generateStaticMetadata(title, keywords);
}

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;

  return (
    <section>
      <BlogDetailWrapper slug={slug} />
    </section>
  );
}
