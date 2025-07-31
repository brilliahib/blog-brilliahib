"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog/blog";
import { buildFromAppURL } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface CardListBlogProps {
  data?: Blog[];
  isLoading?: boolean;
}

function CardListBlogSkeleton() {
  return (
    <div className="flex flex-row gap-6">
      <div className="bg-primary/10 relative hidden aspect-video h-36 w-36 rounded-lg md:flex" />
      <Card className="border-primary/10 w-full border-2 shadow-transparent">
        <CardHeader className="flex md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-6 w-44 rounded-md" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function CardListBlog({ data, isLoading }: CardListBlogProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <CardListBlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {data?.map((blog) => (
        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block">
          <Card className="pt-0">
            <CardHeader className="px-0">
              <Image
                src={buildFromAppURL(blog.image)}
                alt={blog.title}
                width={1000}
                height={1000}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge>{blog.category.name}</Badge>
                <h1 className="font-semibold">{blog.title}</h1>
                <div className="font-medium text-sm text-muted-foreground">
                  {format(new Date(blog.created_at), "dd MMM yyyy", {
                    locale: id,
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
