"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog/blog";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data?: Blog[];
  isLoading?: boolean;
  onCardClick?: () => void;
}

function CardListSearchBlogSkeleton() {
  return (
    <div className="flex flex-row gap-4">
      <Skeleton className="flex-shrink-0 md:w-[150px] w-[100px] h-[90px] rounded-lg" />

      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md mt-1" />
      </div>
    </div>
  );
}

export default function CardListSearchBlog({
  data,
  isLoading,
  onCardClick,
}: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardListSearchBlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">Blog tidak ditemukan.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {data.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.slug}`}
          className="group block"
          onClick={onCardClick}
        >
          <div className="flex flex-row gap-4">
            <Image
              src={buildFromAppURL(blog.image)}
              alt={blog.title}
              width={500}
              height={300}
              className="md:w-[150px] w-[100px] rounded-lg object-cover transition group-hover:opacity-80"
            />
            <div className="flex flex-col gap-2">
              <Badge className="rounded-full text-xs" variant={"secondary"}>
                {blog.category.name}
              </Badge>
              <div className="space-y-2">
                <h3 className="font-medium line-clamp-2 text-sm">
                  {blog.title}
                </h3>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(blog.created_at), "dd MMM yyyy", {
                    locale: id,
                  })}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
