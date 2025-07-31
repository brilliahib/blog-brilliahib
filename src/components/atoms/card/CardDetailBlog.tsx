"use client";

import { useEffect, useState } from "react";
import { Blog } from "@/types/blog/blog";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { highlightCodeBlocks } from "@/utils/shiki-code";

interface CardDetailBlogProps {
  data?: Blog;
}

export default function CardDetailBlog({ data }: CardDetailBlogProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (data?.content) {
      highlightCodeBlocks(data.content).then(setHtml);
    }
  }, [data?.content]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {data?.created_at && (
          <div className="font-medium text-md text-muted-foreground">
            {format(new Date(data.created_at), "dd MMM yyyy", { locale: id })}
          </div>
        )}
        <h1 className="text-3xl font-semibold">{data?.title}</h1>
      </div>

      {data?.image && (
        <Image
          src={buildFromAppURL(data.image)}
          width={1000}
          height={1000}
          className="w-full h-80 object-cover"
          alt={data.title ?? "Gambar Blog"}
        />
      )}

      <div
        className="prose prose-invert max-w-none [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
