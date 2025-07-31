"use client";

import CardDetailBlog from "@/components/atoms/card/CardDetailBlog";
import { useGetDetailBlog } from "@/http/blog/get-detail-blog";

interface BlogDetailWrapperProps {
  slug: string;
}

export default function BlogDetailWrapper({ slug }: BlogDetailWrapperProps) {
  const { data, isPending } = useGetDetailBlog(slug);
  return (
    <div className="pad-x md:pt-20 pt-10">
      <CardDetailBlog data={data?.data} isLoading={isPending} />
    </div>
  );
}
