import { Metadata } from "next";
import BlogDetailWrapper from "@/components/organisms/blog/BlogDetailWrapper";
import { generateStaticMetadata } from "@/utils/generate-metadata";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rawTitle = decodeURIComponent(params.slug).replace(/-/g, " ");
  const title = rawTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const keywords = "blog, nextjs, typescript";

  return generateStaticMetadata(title, keywords);
}

export default async function BlogPage({ params }: Props) {
  return (
    <section>
      <BlogDetailWrapper slug={params.slug} />
    </section>
  );
}
