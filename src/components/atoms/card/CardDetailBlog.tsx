"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/types/blog/blog";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { highlightCodeBlocks } from "@/utils/shiki-code";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface CardDetailBlogProps {
  data?: Blog;
  isLoading?: boolean;
}

export default function CardDetailBlog({
  data,
  isLoading,
}: CardDetailBlogProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (data?.content) {
      highlightCodeBlocks(data.content).then(setHtml);
    }
  }, [data?.content]);

  return (
    <div className="space-y-8">
      <div className="md:hidden flex">
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            <p>Kembali</p>
          </div>
        </Link>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <Skeleton className="h-4 w-32" />
        ) : data?.created_at ? (
          <div className="font-medium text-md text-muted-foreground">
            {format(new Date(data.created_at), "dd MMM yyyy", { locale: id })}
          </div>
        ) : null}

        {isLoading ? (
          <Skeleton className="h-8 w-3/4" />
        ) : (
          <h1 className="md:text-3xl text-xl font-semibold">{data?.title}</h1>
        )}
      </div>

      {isLoading ? (
        <Skeleton className="w-full md:h-[500px] h-64 rounded-md" />
      ) : data?.image ? (
        <Image
          src={buildFromAppURL(data.image)}
          width={1000}
          height={1000}
          className="w-full xl:max-h-[500px] lg:max-h-[400px] md:max-h-[300px] object-cover rounded-2xl"
          alt={data.title ?? "Gambar Blog"}
        />
      ) : null}

      <div className="flex flex-wrap gap-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))
          : data?.tags.map((tag) => (
              <Badge
                className="border-primary/50 md:px-4 bg-primary/10 text-primary md:text-sm rounded-full"
                key={tag.id}
              >
                #{tag.name}
              </Badge>
            ))}
      </div>

      <div className="prose dark:prose-invert text-foreground max-w-none">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}
