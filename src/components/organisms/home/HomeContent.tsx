"use client";

import CardListBlog from "@/components/atoms/card/CardListBlog";
import CardTopBlog from "@/components/atoms/card/CardTopBlog";
import { PaginationControls } from "@/components/molecules/pagination/Pagination";
import { useGetAllBlog } from "@/http/blog/get-all-blog";
import { useState } from "react";

export default function HomeContent() {
  const [page, setPage] = useState(1);

  const { data, isPending } = useGetAllBlog({ page });
  const { data: latestBlog, isPending: isPendingLatest } = useGetAllBlog();

  return (
    <div className="flex flex-col gap-16">
      <CardTopBlog data={latestBlog?.data ?? []} isLoading={isPendingLatest} />
      <CardListBlog data={data?.data ?? []} isLoading={isPending} />
      <div className="flex items-end justify-end">
        {data?.pagination && (
          <PaginationControls
            currentPage={data.pagination.current_page}
            lastPage={data.pagination.last_page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
