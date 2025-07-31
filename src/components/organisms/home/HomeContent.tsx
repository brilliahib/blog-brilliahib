"use client";

import CardListBlog from "@/components/atoms/card/CardListBlog";
import CardTopBlog from "@/components/atoms/card/CardTopBlog";
import { useGetAllBlog } from "@/http/blog/get-all-blog";

export default function HomeContent() {
  const { data, isPending } = useGetAllBlog();
  return (
    <div className="space-y-16">
      <CardTopBlog data={data?.data ?? []} />
      <CardListBlog data={data?.data ?? []} />
    </div>
  );
}
