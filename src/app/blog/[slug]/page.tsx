import BlogDetailWrapper from "@/components/organisms/blog/BlogDetailWrapper";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  return (
    <section>
      <BlogDetailWrapper slug={slug} />
    </section>
  );
}
